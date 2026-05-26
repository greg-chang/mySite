export function getDefaultSwipePreference() {
  if (typeof navigator === "undefined") return true;

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const isApplePlatform =
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("mac os") ||
    userAgent.includes("iphone") ||
    userAgent.includes("ipad");

  return isApplePlatform;
}
