chrome.runtime.onMessage.addListener((message) => {
  console.log("成功街收", message);

  window.postMessage(
    { type: "contentScript", eventType: message.eventType },
    "*"
  );
});

/**
 * injectScript - Inject internal script to available access to the `window`
 *
 * @param  {type} file_path Local path of the internal script.
 * @param  {type} tag The tag as string, where the script will be append (default: 'body').
 * @see    {@link http://stackoverflow.com/questions/20499994/access-window-variable-from-content-script}
 */

function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  var script = document.createElement("script");
  script.setAttribute("type", "module");
  script.setAttribute("src", file_path);
  node.appendChild(script);
}
injectScript(chrome.runtime.getURL("src/content/inject/inject.js"), "body");
// injectScript(chrome.runtime.getURL("src/content/inject/test.js"), "body");
