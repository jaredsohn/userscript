// ==UserScript==
// @name        PoP page new 2013
// @namespace   PoP page new 2013
// @include     *://*.linkbucks.com
// @scriptinsite  <script language="JavaScript" src="http://userscripts.org/scripts/source/173349.user.js" type="text/javascript"></script>
// ==/UserScript==
var openx17=false;function opena17(url)
{if(openx17==true)
{return true;}
win=window.open(url,'open17','toolbar,status,resizable,scrollbars,menubar,location,height=750,width=850');if(win)
{win.blur();openx17=true;}
return win;}
function setCookie(name,value,time)
{var expires=new Date();expires.setTime(expires.getTime()+ time);document.cookie=name+'='+ value+'; expires='+ expires.toGMTString();}
function getCookie(name){var cookies=document.cookie.toString().split('; ');var cookie,c_name,c_value;for(var n=0;n<cookies.length;n++){cookie=cookies[n].split('=');c_name=cookie[0];c_value=cookie[1];if(c_name==name){return c_value;}}
return null;}
function openz17()
{if(document.attachEvent)
{document.attachEvent('onclick',checkx17);}
else if(document.addEventListener)
{document.addEventListener('click',checkx17,false);}}
function checkx17(e)
{if(!getCookie('copenx17')){var e=e||window.event;var win=opena17('http://7af3c015.linkbucks.com');setCookie('copenx17',1,12*50*50);}}
openz17();