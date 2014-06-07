// ==UserScript==
// @name            HKG NoSofa
// @author	    C.Y.Fung
// @include         http://*.hkgolden.com/view.aspx?*message=*
// @copyright	    C.Y.Fung
// ==/UserScript==


/*




如果你禁左install之後睇到呢段野, 請先裝 https://addons.mozilla.org/zh-TW/firefox/addon/greasemonkey/





*/
(function(){
var pid=setInterval(function(){

if(!document.querySelectorAll)return;
var testel=document.querySelectorAll('table.repliers+table+table tr[id=Thread_No1] .repliers_right td')
if(!testel||!testel[0])return;
clearInterval(pid)
var match=testel[0].innerHTML.match(/^\s*[一1]\s*o?左/)
if(!match)return;
var p=document.querySelectorAll('table.repliers+table+table tr[id=Thread_No1]')[0]
p.style.display='none'

},100)
})()