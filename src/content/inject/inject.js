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
      const mockCurPatientData =
        ExtXFeNative.Native.buildCurrentPatientIcMockData();
      await ExtXFeNative.Native.startIcCardMockingMode(mockCurPatientData);
      break;
    case "mock-iccard-custom":
      await ExtXFeNative.Native.startIcCardMockingMode(
        customArg.customPatientData
      );
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
    console.log("content page received", event.data.eventType);
    nativeEvent(event.data.eventType);
  }
});
