// ==UserScript==
// @name           Undertexter.se Direct SRT download
// @author		   kannibal
// @namespace      http://rub.nu/gm
// @description    This script adds a link at undertexter.se that will directly download the SRT file without need to unzip it
// @include        http://*undertexter.se*
// ==/UserScript==

tbodys = document.getElementsByTagName('td');
var latest = 0;

for(i=0;i<tbodys.length;i++)
{
	var inner = tbodys[i].innerHTML;
	if(inner.match(/fil.php\?id=/) && tbodys[latest].innerHTML.length > inner.length)
	{
		latest = i;
	}
	


}
if(getURLParam('id') > 0) {
var td = document.createElement('td');

var style =document.createAttribute("style");
style.nodeValue="border-bottom: 1px solid rgb(153, 153, 153); padding: 0px 5px;";
td.setAttributeNode(style);

var nowrap =document.createAttribute("nowrap");
nowrap.nodeValue="nowrap";
td.setAttributeNode(nowrap);




var a = document.createElement('a');
href =document.createAttribute("href");
href.nodeValue="http://rub.nu/gm/?id="+getURLParam('id');
a.setAttributeNode(href);

var b = document.createElement('b');

var font1 = document.createElement('font');
color =document.createAttribute("color");
color.nodeValue="#ff6600";
font1.setAttributeNode(color);

var font2 = document.createElement('font');
color =document.createAttribute("color");
color.nodeValue="#555555";
font2.setAttributeNode(color);

var l = document.createTextNode("L");
var adda = document.createTextNode("adda ner SRT");

font1.appendChild(l);
font2.appendChild(adda);
b.appendChild(font1);
b.appendChild(font2);
a.appendChild(b);
td.appendChild(a);



tdLeft = document.createElement('td');
tdRight = document.createElement('td');

imgLeft = document.createElement('img');
src =document.createAttribute("src");
src.nodeValue="bilder/cell-left.gif";
imgLeft.setAttributeNode(src);

imgRight = document.createElement('img');
src =document.createAttribute("src");
src.nodeValue="bilder/cell-right.gif";
imgRight.setAttributeNode(src);

tdLeft.appendChild(imgLeft);
tdRight.appendChild(imgRight);

tbodys[latest].parentNode.appendChild(tdLeft);
tbodys[latest].parentNode.appendChild(td);
tbodys[latest].parentNode.appendChild(tdRight);


}


function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("&") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("&")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}





