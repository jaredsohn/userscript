// ==UserScript==
// @name			获取网页图片
// @version			0.9
// @author			Guang_Yang
// @include			*
// ==/UserScript==
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Collect all IMAGES!</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
var x=document.getElementsByTagName("img");
var opened = window.open("");
var i=0,n=x.length;
var str="<html><head><title>Images</title></head><body>";
for (i=0;i<n;i++){
str=str+x[i].alt+"<br><img src=\""+x[i].src+"\" alt=\""+x[i].alt+"\"><br><hr />";
}
str+="</body></html>";
opened.document.write(str);
}