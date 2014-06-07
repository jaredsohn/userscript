// ==UserScript==
// @name           Tube8 Porn Video Downloader
// @version        1.0 Date: 23/04/2010
// @author         Prashant
// @profile        manjifera@gmail.ocm
// @scripturl      
// @Siteurl       http://www.chat32.com/
// @namespace      Downloads Porn Videos from tube8.com site
// @include        http://www.tube8.com*
// ==/UserScript==
 
function tb_8()
{

var d = document.body.innerHTML; var trm_lnk = d.split("videourl=\""); var new_ary_lnk = trm_lnk[1]; var trm_sec = new_ary_lnk.split('"');var fnl = decodeURI(trm_sec[0]);//alert(fnl);
document.getElementById("num_voters").innerHTML  = "<a href='"+fnl+"' target='_blank'><h1 styel='text-decoration:blink'>Download this videos</h1></a>";

}

document.body.onload = tb_8(); // 
