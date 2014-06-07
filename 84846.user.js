// ==UserScript==
// @name           Change Title of any site
// @version        1.0 Date: 19/08/2010
// @author         Prashant
// @profile        manjifera@gmail.ocm
// @scripturl      
// @Siteurl       http://www.chat32.com/
// @namespace      Change title of any site!
// @include        *
// ==/UserScript==
 
function cttl()
{
document.title = "Google";
call_time();
}
function call_time(){
setInterval(cttl,5000);
}

document.body.onload = call_time();
