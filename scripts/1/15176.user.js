// ==UserScript==
// @name           my one
// @namespace      http://www.one.lv/
// @description    one-script
// @include        http://c*.one.lv/navigate*
// @include        http://email.one.lv/
// ==/UserScript==
function get_all(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName (a_tag);
	var res = new Array;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			res.push(q[i]);
		}
	}
	return res;
}

function get_all_relaxed(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName (a_tag);
	var res = new Array;
	for (var i = 0; q[i]; i++) {
		if (q[i].className.indexOf(a_class) == 0) {
			res.push(q[i]);
		}
	}
	return res;
}

//optimized
function get_first(a_parent, a_tag, a_class) {
	var q = a_parent.getElementsByTagName(a_tag);
	var ret;
	for (var i = 0; q[i]; i++) {
		if (q[i].className == a_class) {
			ret = q[i];
			break;
		}
	}
	return ret;
}

//sdio
function get_one(xpath, node){
        return document.evaluate(
                xpath,
                node,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null ).singleNodeValue;
}

function hideElement(elem) {
	elem.style.display='none';
}

var node = get_one("/html/body/script", document);
if (node) node.parentNode.removeChild(node);

var nodeRel = get_one("//link[@rel='stylesheet']", document);
if (nodeRel.href.indexOf("/portal/res/default/main5.css")>1)
    nodeRel.href="http://www.one.lv/getTheme?id=229376&v=52&key=CSS";

var badLabel = [ "midLabelPresent150", "midLabelPresent151", "midLabelPresent152", "midLabelPresent153" ];
for (var i = 0; badLabel[i]; i++) {
	var bads = get_all(document, "div", badLabel[i]);
	bads.forEach(hideElement);
}

var vips = get_all(document, "div", "labelVIP");
vips.forEach(hideElement);

function movePresent(present) {
	present.style.top='5px';
	present.style.left='';
	present.style.right='-35px';
}

var presents = get_all_relaxed(document, "div", "midLabelPresent");
presents.forEach(movePresent);