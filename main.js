chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

const biliVideoUrl = "https://www.bilibili.com/video";

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(biliVideoUrl)) {
    const prevState = await chrome.action.getBadgeText({
      tabId: tab.id,
    });
    const nextState = prevState === "ON" ? "OFF" : "ON";
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });

    if (nextState === "ON") {
      await chrome.scripting.insertCSS({
        files: ["hide-video.css"],
        target: { tabId: tab.id },
      });
    } else if (nextState === "OFF") {
      await chrome.scripting.removeCSS({
        files: ["hide-video.css"],
        target: { tabId: tab.id },
      });
    }
  }
});
