scr_meta=<><![CDATA[
// ==UserScript==
// @name           SiCoMM
// @description    Sistema de Comunicacion Militar de eMexico - created by ISpencer
// @namespace      http://www.erepublik.com/en/citizen/profile/2962492
// @namespace      You must not edit/publish this file without author's con-sentiment
// @include        http://www.erepublik.com/*/battlefield/*
// ==/UserScript==
]]></>.toString();

function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) {
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}

var citizen = getElementsByClassName(document, 'citizen_name')[0].innerHTML;
var irc_div = document.createElement("div");

irc_div.id = "div_irc"; 

var main_link = document.createElement("a");

main_link.href =  "http://userscripts.org/scripts/source/86051.user.js";
main_link.target= "_blank";
main_link.innerHTML= "SiCoMM - Sistema de Comunicacion Militar de eMexico - Click para actualizar"
main_link.fontsize= 20;
main_link.fontcolor="#6E6E6E";
irc_div.appendChild(main_link);

var after_original_content = document.getElementById("content");
after_original_content.insertBefore(irc_div, after_original_content.lastChild);
var iframe = document.createElement("iframe");
var IrcFrameSource="http://qchat.rizon.net/?nick="+citizen+"&channels=%23canal_oficial_mexico";
iframe.src = IrcFrameSource;
iframe.style.width="100%";
iframe.style.height="100%";
var divIrcFrame = document.createElement("div");
divIrcFrame.style.width="685px";
divIrcFrame.style.height="500px";
divIrcFrame.appendChild(iframe);
after_original_content.insertBefore(divIrcFrame,after_original_content.lastChild);
document.getElementById("div_irc").style.fontSize = "25";
