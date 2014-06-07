// ==UserScript==
// @name           Login Password Reminder
// @namespace      http://userscripts.org/users/cobalt
// @include        http://*hostmonster.com*
// @include        https://*hostmonster.com*
// @description    On the login page, it gives you a (user defined) reminder to what their password is.
// ==/UserScript==

var hint = '';

function getElementsByClassName(class, tag)
{
if(!tag)
	tag = "*";
var returner = new Array();
var eles = document.getElementsByTagName(tag);
for(i=0;i<eles.length;i++)
{
ele = eles[i];
if(ele.className==class)
{
returner[returner.length] = ele;
}
}
return returner;
}

if(!hint||hint=='')
{
hint = 'define this on the top of the script!';
}

var es = getElementsByClassName("wrapper_main", "div");
es = es[0];

if(es)
{
var div = document.createElement("div");
div.innerHTML = "password: " + hint;
div.style.color = "#FF0000";


var befored = es.getElementsByTagName("table");
befored = befored[0];

es.insertBefore(div, befored);
}


