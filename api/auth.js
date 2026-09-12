const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

export default function handler(req, res) {
  const origin = `https://${req.headers.host}`;
  const redirectUri = `${origin}/api/callback`;

  const authUrl = new URL(GITHUB_AUTH_URL);
  authUrl.searchParams.set("client_id", process.env.GITHUB_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", "repo,user");

  res.writeHead(302, { Location: authUrl.toString() });
  res.end();
}
