// ==UserScript==
// @name            HKG Gold Finger
// @author	    C.Y.Fung
// @include         http://*.hkgolden.com/ProfilePage.aspx?userid=*
// @copyright	    C.Y.Fung
// ==/UserScript==


/*




如果你禁左install之後睇到呢段野, 請先裝 https://addons.mozilla.org/zh-TW/firefox/addon/greasemonkey/





*/
(function(){
var pid=setInterval(function(){

if(!document.body)return;
clearInterval(pid)
if(!document.querySelector)return;
if(document.querySelector('#ctl00_ContentPlaceHolder1_tc_Profile a[href*="imember_changepw.aspx"]')){var beerN=document.querySelector('#ctl00_ContentPlaceHolder1_tc_Profile_tb0_lb_beer').lastChild;beerN.nodeValue=beerN.nodeValue.replace(/\d+/,'999');var clownN=document.querySelector('#ctl00_ContentPlaceHolder1_tc_Profile_tb0_lb_clown').lastChild;clownN.nodeValue=clownN.nodeValue.replace(/\d+/,'0')}

},100)
})()