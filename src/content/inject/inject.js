const mockCurrentPatient = () => {
  const encounter = {};
  Object.keys(XHISDataStore.Encounter).forEach((key) => {
    encounter[key] = XHISDataStore.Encounter[key]?.data?.value;
  });
  const mockCurPatientData = ExtXFeNative.Native.buildCurrentPatientIcMockData({
    encounter,
    Practitioner: {},
  });
  return mockCurPatientData;
};

const nativeEvent = async (eventType, customArg) => {
  switch (eventType) {
    case "mock-emr":
      const mockEMRData = {
        "Get Legacy Module Version": { version: "23.09.11.178609" },
        "OPD - Save Med EMR": {
          emr: { returnCode: 0, returnMsg: "電子病歷轉送成功" },
        },
      };
      await window.ExtXFeNative.Native.startExternalFormMockingMode(
        mockEMRData,
        "PBNI",
        "opd"
      );
      break;
    case "mock-emr-cancel":
      await window.ExtXFeNative.Native.stopExternalFormMockingMode();
      break;
    case "mock-iccard-current":
      await ExtXFeNative.Native.startIcCardMockingMode(mockCurrentPatient());
      break;
    case "mock-iccard-custom":
      const mockCurPatientData = mockCurrentPatient();
      for (const [key, value] of Object.entries(customArg)) {
        switch (key) {
          case "GetRegisterBasic-errorCode":
            mockCurPatientData["A02"].errorCode = Number(value);
            break;
          case "GetRegisterBasic-personalId":
            mockCurPatientData["A02"].data.personalId = value;
            break;
          case "GetSeqNumber256N1-errorCode":
            mockCurPatientData["A53"].errorCode = Number(value);
            break;
          case "GetTreatNumNoIcCard-errorCode":
            mockCurPatientData["A54"].errorCode = Number(value);
            break;
        }
      }

      await ExtXFeNative.Native.startIcCardMockingMode(mockCurPatientData);
      break;
    case "mock-iccard-cancel":
      await window.ExtXFeNative.Native.stopIcCardMockingMode();
      break;

    default:
      console.log(`${eventType} , this event didn't support`);
  }
};

window.addEventListener("message", (event) => {
  // We only accept messages from ourselves
  if (event.source !== window) {
    return;
  }

  if (event.data.type && event.data.type === "contentScript") {
    nativeEvent(event.data.eventType, event.data.customArg);
  }
});
