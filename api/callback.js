const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

export default async function handler(req, res) {
  const origin = `https://${req.headers.host}`;
  const code = req.query.code;

  if (!code) {
    res.status(400).send("Missing code");
    return;
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${origin}/api/callback`,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error || !tokenData.access_token) {
    res.status(400).send(`GitHub OAuth error: ${tokenData.error_description || "unknown"}`);
    return;
  }

  const payload = JSON.stringify({ token: tokenData.access_token, provider: "github" });

  const html = `<!doctype html><html><body><script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage('authorization:github:success:${payload.replace(/'/g, "\\'")}', e.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script></body></html>`;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
