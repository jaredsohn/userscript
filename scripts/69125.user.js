// ==UserScript==
// @name           haaretz ajax talkbacks
// @namespace      http://shmulik.zekar.co.cc/haaretz
// @include        http://www.haaretz.co.il/*
// @author         shmulik - sking.me@gmail.com
// @license        Creative Commons Attribution-NonCommercial-NoDerivs
// @description    open the talkbacks on the same page instead of new windows
// ==/UserScript==
//@changelog: ff4 support

var z

if (typeof unsafeWindow != 'undefined') //firefox
  z = unsafeWindow.document.getElementsByTagName("td");
else //chrome
  z = document.getElementsByTagName("td");

for (var i = 0 ; i < z.length ; i++)
{
  if (z[i].id=="myTD")
  {
    z[i].firstChild.removeAttribute("onclick");
    z[i].firstChild.setAttribute("href2", z[i].firstChild.href);
    z[i].firstChild.href = "javascript:";
    z[i].firstChild.addEventListener("click",o ,false);
  }
}


function o(event)
{
  GM_xmlhttpRequest({
    method: "GET",
    url: event.target.getAttribute("href2"),
    overrideMimeType:"text/html; charset=windows-1255",
    headers: {
      "User-Agent": navigator.userAgent
    },
    onload: function(response) {
      var t = response.responseText;
      t=t.substring(t.indexOf('<table bgcolor="#ffffff" width="100%" height="200"><tr><td valign="top" align="right" class="t13">')+98);
      t=t.substring(0,t.indexOf('</td>'));
      var y = document.createElement("td");
      y.innerHTML = t;
      y.setAttribute("colspan","7");
      y.setAttribute("style","padding-right:3em;background:#ac7");
      var x = document.createElement("tr");
      x.appendChild(y);
      event.target.parentNode.parentNode.parentNode.insertBefore(x,event.target.parentNode.parentNode.nextSibling);
      event.target.removeEventListener("click",o ,false);
      event.target.addEventListener("click",tNext ,false);
      }
    }
  )
  return (false);
}


function tNext(e)
{
  var t = e.target.parentNode.parentNode.nextSibling;
  if (t.style.display=="none")
    t.style.display="";
  else
    t.style.display="none";
  return false;
}