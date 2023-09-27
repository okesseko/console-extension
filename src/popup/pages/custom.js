const backToMainPage = () => {
  history.back();
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
    backToMainPage();
  });
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("backBtn").addEventListener("click", () => {
    backToMainPage();
  });
  setCustomIcCardForm();
});
