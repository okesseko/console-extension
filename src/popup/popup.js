const sendEventToContentScript = (eventType) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { eventType }, (response) => {
      console.log(`eventType: ${eventType}: ${response}`);
    });
  });
};

const addClickEventToBtn = (btnId) => {
  document
    .getElementById(btnId)
    .addEventListener("click", () => sendEventToContentScript(btnId));
};

document.addEventListener("DOMContentLoaded", function () {
  const btnIdList = [
    "mock-emr",
    "mock-emr-cancel",
    "mock-iccard-current",
    "mock-iccard-custom",
    "mock-iccard-cancel",
  ];
  btnIdList.forEach((id) => addClickEventToBtn(id));
});
