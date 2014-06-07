// ==UserScript==
// @name       Redirect Test
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Pebis
// @match      http://*/*
// @copyright  2012+, Sum
// @run-at document-start
// ==/UserScript==

redirectToPage("https://docs.google.com/forms/d/1coHAGqUX9yi5YMO5RNu2zKp9LCz2t9JsTCvSFxZbOyM/formResponse", "https://docs.google.com/forms/d/1coHAGqUX9yi5YMO5RNu2zKp9LCz2t9JsTCvSFxZbOyM/viewform");

function redirectToPage(page1, page2){
if(window.location.href.indexOf(page1) != -1){
    window.location.href = page2;
}
}