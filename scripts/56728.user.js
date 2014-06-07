// ==UserScript==
// @name           Travian Battle Reports Screenshots
// @namespace      travianreports
// @description    Travian Battle Reports Screenshots
// @include        http://*.travian*.*/berichte.php?id=*
// ==/UserScript==

var report = xhtml(document.getElementById('mid'));

var newElem = document.createElement("div");
newElem.style.align="center";
newElem.id="travianreports";
document.getElementById('content').appendChild(newElem);


var newElem = document.createElement("form");
newElem.id="form";
newElem.action="http://travianreports.com/";
newElem.method="post";
newElem.target="_blank";
newElem.innerHTML='<p class="btn"><input type="image" value="" name="s1" id="btn_reply" class="dynamic_img" src="img/x.gif" alt="Ok" /></p>';
document.getElementById('travianreports').appendChild(newElem);

var newElem = document.createElement("input");
newElem.type="hidden";
newElem.name="report";
newElem.value= report;
document.getElementById('form').appendChild(newElem);

function xhtml(node) {
	if (node.nodeType == 3) {
		str = node.nodeValue;
	} else {
		var name = node.nodeName.toLowerCase();
		if (name.indexOf('/') == -1) {
			str = '<'+name;
			if (node.attributes) {
				for (var i=0;i<node.attributes.length;i++) {
					var attrName = node.attributes[i].name;
					var value = node.attributes[i].value;
					if (attrName == 'src' || attrName == 'class' || attrName == 'href' || attrName == 'id' || attrName == 'colspan' || attrName == 'cellpadding' || attrName == 'cellspacing') {
						str+=' ' + attrName + '="' +value.replace(/&/g,'&amp;') +'"';
					}
				}
			}
			str+='>';
			if (node.childNodes) {
				for (var j=0;j<node.childNodes.length;j++) {
					str += xhtml(node.childNodes[j]);
				}
			}
			str+= '</'+name+'>';
		} else {
			str = '';
		}
	}
	return str;
}