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

const setCustomIcCard = () => {
  document
    .getElementById("mock-iccard-custom")
    .addEventListener("click", () => {
      window.location.href = "pages/custom.html";
    });
};

document.addEventListener("DOMContentLoaded", function () {
  const btnIdList = [
    "mock-emr",
    "mock-emr-cancel",
    "mock-iccard-current",
    "mock-iccard-cancel",
  ];
  btnIdList.forEach((id) => addClickEventToBtn(id));

  setCustomIcCard();
});
