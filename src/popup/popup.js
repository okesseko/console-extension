const sendEventToContentScript = (eventType, customArg = {}) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { eventType, customArg },
      (response) => {
        console.log(`eventType: ${eventType}: ${response}`);
      }
    );
  });
};

const addBtnEvent = () => {
  const btnIdList = [
    "mock-emr",
    "mock-emr-cancel",
    "mock-iccard-current",
    "mock-iccard-cancel",
  ];

  const addClickEventToBtn = (btnId) => {
    document
      .getElementById(btnId)
      .addEventListener("click", () => sendEventToContentScript(btnId));
  };

  btnIdList.forEach((id) => addClickEventToBtn(id));
};

const setCustomIcCard = (params) => {
  document
    .getElementById("mock-iccard-custom")
    .addEventListener("click", () => {
      window.location.href = params
        ? `pages/custom.html?${params}`
        : "pages/custom.html";
    });
};
const sendCustomIcCard = (params) => {
  const customArg = {};
  for (const [key, value] of params.entries()) {
    if (key !== "from") {
      customArg[key] = value;
    }
  }
  sendEventToContentScript("mock-iccard-custom", customArg);
};

const addedEventByUrl = () => {
  const url = new URLSearchParams(window.location.search);
  const urlFrom = url.get("from");

  switch (urlFrom) {
    case "custom":
      setCustomIcCard();
      sendCustomIcCard(url);
    default:
      setCustomIcCard();
      break;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  console.log(window.location.href);
  addedEventByUrl();
  addBtnEvent();
});
