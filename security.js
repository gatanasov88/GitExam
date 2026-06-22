function isSafeRedirect(url) {
  // Fix: only allow relative, same-origin redirects
  return typeof url === "string" && url.startsWith("/") && !url.startsWith("//");
}

module.exports = { isSafeRedirect };
