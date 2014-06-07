// ==UserScript==
// @name           videogamesplus2gamefaqs
// @namespace      gamefaqs
// @description    Videogamesplus.ca link to gamefaqs
// @include        http://www.videogamesplus.ca/product_info.php*
// ==/UserScript==

function getElementsByClass(klass, elName)
{
  container = document;
  var all = container.getElementsByTagName(elName);
  var arr = [];
  for(var k=0;k<all.length;k++)
  {
    var elm = all[k];
    if (elm.className == klass) {
      arr[arr.length] = elm;
      break;
    }
  }
  return arr;
}

var pageHeader = getElementsByClass( "pageHeading", "td");
if (pageHeader.length)
{
  var ph = pageHeader[0];

  var link = document.createElement("a");
  var href = "http://www.gamefaqs.com/search/index.html?platform=0&game=";
  var name=ph.firstChild.nodeValue;
  link.setAttribute('href',  href+name);
  link.appendChild(document.createTextNode(name));
  ph.replaceChild(link, ph.firstChild)
}
