const oldReddit = "https://coornhert.sharepoint.com/SitePages/123.aspx"

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    /*
    if (details.url.match(/^https?:\/\/(www.)*reddit.com\/poll/)) {
      return
    }
    */

    return {redirectUrl: oldReddit}
  },
  {
    urls: [
      "https://coornhert.sharepoint.com/",
      "https://coornhert.sharepoint.com/sites/portal"
    ],
    types: ["main_frame"]
  },
  ["blocking"]
)
