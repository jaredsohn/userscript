// ==UserScript==
// @name        JavascriptOverwrite
// @namespace   proofofconcept
// @include     http://example.com/pof
// @run-at      document-start
// @version     2012-10-14
// ==/UserScript==

GM_log("Modify the javascript source of a web page before it runs.");

// counter for the <script> elements of a web page
var globalScriptIndex = 0;

// true if <script> code shall run
var globalRunJavascript = false;


// main function to modify javascript code in certain <script> elements
//
// NOTE: globalScriptIndex is a multiple of 2 for this function
//  globalScriptIndex == 0 is the first <script>
//  globalScriptIndex == 2 is the second <script> and so on

function modifiyJavascript(javascriptCode) {

  // change 1 to 2 in the first script
  if (globalScriptIndex == 0) {
    return javascriptCode.replace(/1/g, "2");
  }

  // change "external script" to "injected code" in the second script
  if (globalScriptIndex == 2) {
    return javascriptCode.replace(/external script/, "injected code");
  }

  // change 4 to 5 in the third script
  if (globalScriptIndex == 4) {
    return javascriptCode.replace(/4/, "5");
  }

  // default action:
  return javascriptCode;
}


function appendJavascriptElement(javascriptCode) {
  var scriptElement = document.getElementsByTagName('script')[globalScriptIndex];
  if (!scriptElement) {
//    alert(globalScriptIndex + ' does not exist');
    return;
  }

  var generatedScriptElement = document.createElement('script');
  generatedScriptElement.type = 'text/javascript';

  // modify the javascript source of the external script
  generatedScriptElement.innerHTML = modifiyJavascript(javascriptCode);

//  alert(globalScriptIndex + '. script: ' + generatedScriptElement.innerHTML);

  globalScriptIndex++;

  // the next script event is our own modified javascript - run it
  globalRunJavascript = true;

  // insert after current javascript
  scriptElement.parentNode.insertBefore(generatedScriptElement, scriptElement.nextSibling);
}

function replaceJavascript(event) {

  // skip the javascript that is inserted by greasemonkey
  if (globalRunJavascript) {
    globalScriptIndex++;
    globalRunJavascript = false;
    return;
  }

  // disable original javascript event
  event.preventDefault();
  event.stopPropagation();

  // check for external javascript
  externalSource = event.target.src;
  if ((externalSource) && (externalSource != '')) {

    // load the external javascript source code synchronous (might block a while)
    var response = GM_xmlhttpRequest({
      method: "GET",
      synchronous: true,
      url: externalSource,
    });

    if (response.status == 200) {
      // alert('response ' + response.responseText);
      appendJavascriptElement(response.responseText);
    } else {
      globalScriptIndex++;
    }

    return;
  }

  // check inline javascript
  var scriptElement = document.getElementsByTagName('script')[globalScriptIndex];
  if (!scriptElement) {
    return;
  }

  appendJavascriptElement(scriptElement.innerHTML);
}

// calls replaceJavascript function for every script in the web page
window.addEventListener('beforescriptexecute', function(event) {
  replaceJavascript(event);
}, true);


// displays only the <head> section, document.body does not yet exist:
//  alert('first ' + document.getElementsByTagName('html')[0].innerHTML);
