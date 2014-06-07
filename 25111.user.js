// ==UserScript==
// @name           digg auto bury daily mail
// @namespace      digg
// @description    buries daily mail articles automaticly
// @include        http://*.digg.com/*/*
// @include        http://digg.com/*/*
// ==/UserScript==

window.addEventListener("load", function(e) {

if(document.getElementById('title').innerHTML.search(/dailymail\.co\.uk/i) != -1
&& document.getElementById('burytool1')) {
  if(confirm('Daily Mail Article spotted, bury it?') == true) {
    var bury = document.getElementById('burytool1').getElementsByTagName('a')[0].href;
    // document.getElementById('c-rply-body0').value='auto buried for daily mail (http://userscripts.org/scripts/show/25111)';
    // document.getElementById('c-rply-submit-btn0').click();
    document.body.innerHTML += '<input id="auto-bury" type="submit" onclick="'+bury+';" />';
    document.getElementById('auto-bury').click();
  }
}

}, false);