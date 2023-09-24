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

const setCustomIcCardForm = () => {
  const customIcCardForm = document.getElementById("custom-iccard-form");
  customIcCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const GetRegisterBasicErrorCode = document.getElementById(
      "GetRegisterBasic-errorCode"
    );
    const GetRegisterBasicPersonalId = document.getElementById(
      "GetRegisterBasic-personalId"
    );
    const GetSeqNumber256N1ErrorCode = document.getElementById(
      "GetSeqNumber256N1-errorCode"
    );
    const GetTreatNumNoIcCardErrorCode = document.getElementById(
      "GetTreatNumNoIcCard-errorCode"
    );

    console.log(
      GetRegisterBasicErrorCode.value,
      GetRegisterBasicPersonalId.value,
      GetSeqNumber256N1ErrorCode.value,
      GetTreatNumNoIcCardErrorCode.value
    );
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const btnIdList = [
    "mock-emr",
    "mock-emr-cancel",
    "mock-iccard-current",
    // "mock-iccard-custom",
    "mock-iccard-cancel",
  ];
  btnIdList.forEach((id) => addClickEventToBtn(id));

  setCustomIcCardForm();
});
