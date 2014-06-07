// ==UserScript==
// @name           HF Script - Prefix color editor
// @description   Adjust thread prefix color
// @copyright      theone2013
// @namespace  theone
// @version          1.1.7
// @include          http://*.hackforums.net/*
// @include          https://*.hackforums.net/*
// @grant             GM_addStyle
// ==/UserScript==

//Set color
if(window.location.href.toString().indexOf("forumdisplay.php")!=-1)  // just on forumdisplay.php
{
    var prefixcolor = getCookie("prefixcolor");
    if (prefixcolor != null)
        GM_addStyle(".prefix { color:" + prefixcolor + ";}");
}
//Edit menu
if(window.location.href.toString().indexOf("usercp.php?action=options")!=-1)
{
    var prefixcolor = getCookie("prefixcolor");
    if (prefixcolor == null)
        prefixcolor = "#CC66FF"; // standard color!
    var firstBlock = document.getElementById('invisible').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    newHTML = "<fieldset class=\"trow2\"><legend><strong>Prefix Color</strong> - Made by <a href='http://www.hackforums.net/member.php?action=profile&uid=101521'>The-One</a> </legend><table cellspacing=\"0\" cellpadding=\"2\"><tbody><tr><td valign=\"top\" width=\"1\"><td><span class=\"smalltext\"><label>Prefix color of thread prefixes:</label></span></td>";
    newHTML = newHTML + "<td><input type=\"text\" name=\"prefixcolortxt\" id=\"prefixcolortxt\" class=\"textbox\" value=" + prefixcolor +"><input type=\"button\" onclick=\"javascript:window.location.href = window.location.href + '&prefix=' + document.getElementById('prefixcolortxt').value;\" value=\"Submit\"></td></tr></tbody></table></fieldset><br>";
    tempHTML = newHTML + firstBlock.innerHTML;
    firstBlock.innerHTML = tempHTML;
}

//We got a new color to set -> set cookie nd redirect user
if(window.location.href.toString().indexOf("usercp.php?action=options&prefix=")!=-1)
{
    var href =  window.location.href.toString();
    var color = href.substr(href.indexOf('#'));
    setCookie("prefixcolor", color);
    window.location.href = href.substring(0,href.indexOf("&"));
}
function setCookie(c_name,value)
{
    var d1 = new Date (),
        d2 = new Date ( d1 );
    d2.setFullYear ( d1.getFullYear() + 1 );
    var c_value=escape(value) + ("; expires="+d2.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}