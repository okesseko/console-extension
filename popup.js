document.addEventListener("DOMContentLoaded", function () {
  const injectButton = document.getElementById("injectButton");

  injectButton.addEventListener("click", function () {
    const codeToInject = "const a = 1;";
    chrome.devtools.inspectedWindow.eval(
      codeToInject,
      function (result, isException) {
        if (isException) {
          console.error("Error injecting code:", result);
        } else {
          console.log("Code injected successfully:", result);
        }
      }
    );
  });
});
