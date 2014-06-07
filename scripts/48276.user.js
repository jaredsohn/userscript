// ==UserScript==
// @name           wstream
// @namespace      bash.org.ru
// @description    Script add discussion link to bash.org.ru quotes
// @include        http://bash.org.ru/*
// ==/UserScript==
var href = document.location.href;
var href_type;
if ((href.indexOf("/random") > -1)||(href.indexOf("/best") > -1)||(href.indexOf("/byrating") > -1)||(href.indexOf("/quote") > -1)||(href.length == 19) || (href.indexOf("/index") > -1) || (href.indexOf("bash.org.ru/?text") > -1)) href_type = "0";
else {
  if ((href.indexOf("/abyssbest") > -1)||(href.indexOf("/abysstop") > -1)) href_type = "1";
  else {
    if (href.indexOf("/abyss") > -1) href_type = "2";
    else {
      if (href.indexOf("/comics") > -1) href_type = "3";
    }
  }
}
var fDiv = document.createElement('div');
fDiv.setAttribute("style", "display:none; visibility:hidden;", 0);
var sForm = document.createElement('form');
sForm.setAttribute("action", "http://bashwords.ru/index.php", 0);
sForm.setAttribute("method", "post", 0);
sForm.setAttribute("target", "_blank", 0);
sForm.setAttribute("name", "send_quote", 0);
var qText = document.createElement('input');
qText.setAttribute("type", "text", 0);
qText.setAttribute("name", "quote", 0);
var pText = document.createElement('input');
pText.setAttribute("type", "text", 0);
pText.setAttribute("name", "pos", 0);
var tText = document.createElement('input');
tText.setAttribute("type", "text", 0);
tText.setAttribute("name", "text", 0);
sForm.appendChild(qText);
sForm.appendChild(pText);
sForm.appendChild(tText);
fDiv.appendChild(sForm);
nBody = document.getElementsByTagName("body");
nBody[0].appendChild(fDiv);
switch (href_type)
{
  case "0":
    var nodeList = document.getElementsByTagName("div");
    for (var i = 0; i < nodeList.length; i++) {
      if (nodeList[i].className == "q") {
        if (nodeList[i].hasChildNodes()) {
	  var innerDivs = nodeList[i].getElementsByTagName("div");
          if(innerDivs[0].className == "vote")
          {
            var innerLinks = innerDivs[0].getElementsByTagName("a");
            var qNum = new Array();
            for(var j = 0; j < innerLinks.length; j++) {
              if(innerLinks[j].hasChildNodes())
              {
                qNum[j] = innerLinks[j].lastChild.nodeValue;
              }
            }
            var text = "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c";
            var nLink = document.createElement('a');
            var qText = escape(innerDivs[innerDivs.length - 1].innerHTML);
            nLink.setAttribute("href", "javascript:f=document.forms['send_quote'];f.elements['pos'].value='q';f.elements['quote'].value='" + qNum[0] + "';f.elements['text'].value='" + qText + "';f.submit();", 0);
            nLink.appendChild(document.createTextNode(text));
            innerDivs[0].appendChild(nLink);
          }	
        }
      }
    } 
  break;
  case "1":
    var nodeList = document.getElementsByTagName("div");
    for (var i = 0; i < nodeList.length; i++) {
      if (nodeList[i].className == "q") {
        if (nodeList[i].hasChildNodes()) {
          var innerDivs = nodeList[i].getElementsByTagName("div");
          if(innerDivs[0].className == "vote")
          {
            var innerLinks = innerDivs[0].getElementsByTagName("b");
            var qNum = new Array();
            for(var j = 0; j < innerLinks.length; j++) {
              if(innerLinks[j].hasChildNodes())
              {
                qNum[j] = innerLinks[j].lastChild.nodeValue;
              }
            }
            if(qNum[0] != null)
            {
              var text = "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c";
              var nLink = document.createElement('a');
              var qText = escape(innerDivs[innerDivs.length - 1].innerHTML);
              var pos;
              if(href.indexOf("/abyssbest") > -1) pos = "ab"; else pos = "at";
              nLink.setAttribute("href", "javascript:f=document.forms['send_quote'];f.elements['pos'].value='" + pos + "';f.elements['quote'].value='" + qNum[0].replace(':', '') + "';f.elements['text'].value='" + qText + "';f.submit();", 0);
              nLink.appendChild(document.createTextNode(text));
              innerDivs[0].appendChild(nLink);
            }
          }	
        }
      }
    } 
  break;
  case "2":
    var nodeList = document.getElementsByTagName("div");
    for (var i = 6; i < nodeList.length; i++) {
      if (nodeList[i].className == "q") {
        if (nodeList[i].hasChildNodes()) {
          var innerDivs = nodeList[i].getElementsByTagName("div");
          if(innerDivs[0].className == "vote")
          {
            var allHTML = innerDivs[0].innerHTML;
            var sstart = allHTML.indexOf(" ");
            var qNum = allHTML.substr(0, sstart-1);
            var text = "\u041e\u0431\u0441\u0443\u0434\u0438\u0442\u044c";
            var nLink = document.createElement('a');
            var qText = escape(innerDivs[innerDivs.length - 1].innerHTML);
            nLink.setAttribute("href", "javascript:f=document.forms['send_quote'];f.elements['pos'].value='a';f.elements['quote'].value='" + qNum + "';f.elements['text'].value='" + qText + "';f.submit();", 0);
            nLink.appendChild(document.createTextNode(text));
            innerDivs[0].appendChild(nLink);
          }	
        }
      }
    } 
  break;
}
