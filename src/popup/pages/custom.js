const formItemIds = [
  "GetRegisterBasic-errorCode",
  "GetRegisterBasic-personalId",
  "GetSeqNumber256N1-errorCode",
  "GetTreatNumNoIcCard-errorCode",
];

const addBackToMainPageEvent = () => {
  document.getElementById("backBtn").addEventListener("click", () => {
    history.back();
  });
};

const setCustomIcCardForm = () => {
  const customIcCardForm = document.getElementById("custom-iccard-form");
  customIcCardForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchParams = formItemIds.reduce((prev, id) => {
      const itemEle = document.getElementById(id);
      let params = "";
      if (itemEle.value) {
        params = `&${id}=${itemEle.value}`;
      }

      return prev + params;
    }, "from=custom");

    window.location.href = `../popup.html?${searchParams}`;
  });
};

const setItemValueFromUrl = () => {
  const url = new URLSearchParams(window.location.search);
  formItemIds.forEach((id) => {
    const value = url.get(id);
    if (value) {
      const itemEle = document.getElementById(id);
      itemEle.value = value;
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  addBackToMainPageEvent();
  setCustomIcCardForm();
  setItemValueFromUrl();
});
