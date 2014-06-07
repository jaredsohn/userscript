// ==UserScript==
// @name           23hq.com Number of photos setting
// @namespace      www.23hq.com
// @include        http://*.23hq.com/*/a/settings
// ==/UserScript==

var default_value = 23;

var container = document.getElementById('content');
var myhtml = '<div class="wide-visual-form">';
myhtml += '<div class="visual-form-container">';
myhtml += '<div class="visual-form">';

myhtml += '<h3>Set the number of photos on your frontpage</h3>';
myhtml += '<div style="padding:10px">';
myhtml += '<input type="text" value=' + default_value + ' name="gm_numberofphotos" id="gm_numberofphotos" style="width:50px;margin:0 10px 0 0">';
myhtml += '<a href="#" onClick=\'window.location.href="http://www.23hq.com/23/redirect/a/pagesize?pagesize=" + document.getElementById("gm_numberofphotos").value;\' id="gm_numberofphotos_submit">Set number of photos</a>';
myhtml += '<br/>(You will be redirected to your frontpage after clicking)';

myhtml += '</div>';
myhtml += '</div>';
myhtml += '</div>';
myhtml += '</div>';
container.innerHTML += myhtml;