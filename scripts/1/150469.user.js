// ==UserScript==
// @name        ExtabitProofOfConcept
// @namespace   proofofconcept
// @description Reduce waiting time from 30 to 3 seconds at Extabit. Just a proof of concept.
// @include     http://extabit.com/file/*
// @include     http://*.extabit.com/file/*
// @run-at      document-start
// @version     2012-10-14
// ==/UserScript==

// This is just a proof of concept that javascript code of a web page can be modified before it is executed.
// Privoxy is an alternative to greasemonkey but does not work with https.
// Tested with firefox 16.0.1 and greasemonkey 1.4.

GM_log("Proof of concept: Modify the javascript source of a web page before it runs.");


// true if <script> code shall run
var globalRunJavascript = false;

// append modified javascript after current <script> element
function appendJavascriptElement(scriptElement) {

  var generatedScriptElement = document.createElement('script');
  generatedScriptElement.type = 'text/javascript';

  // modify the javascript source of the script
  generatedScriptElement.innerHTML = scriptElement.textContent.replace(/time: '30'/g, "time: '3'");

  // alert('generated: ' + generatedScriptElement.innerHTML);
  // alert(scriptElement.parentNode.innerHTML);

  // the next script event is our own modified javascript - run it
  globalRunJavascript = true;

  // insert after current javascript
  scriptElement.parentNode.insertBefore(generatedScriptElement, scriptElement.nextSibling);
}


// is called every time a <script> element is found
function replaceJavascript(event) {

  // let the modified javascript run
  if (globalRunJavascript) {
    globalRunJavascript = false;
    return;
  }

  // skip external javascript
  if (!event.target.textContent) {
    return;
  }

  if (event.target.textContent.indexOf("time:") != -1) {

    // disable original javascript event
    event.preventDefault();
    event.stopPropagation();

    // alert(event.target.textContent);
    appendJavascriptElement(event.target);
    return;
  }
}

// calls replaceJavascript function for every script in the web page
window.addEventListener('beforescriptexecute', function(event) {
  replaceJavascript(event);
}, true);
