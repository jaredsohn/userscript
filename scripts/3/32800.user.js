// ==UserScript==
// @name           igronet_forum (beta 3)
// @namespace      http://igronet.ru/forum/*
// @description    Бета-скрипт для игронет-форума. 14.09.2008 (с использованием Platypus'a)
// @include        http://igronet.ru/forum/*

//Дебаговое сообщение - скрипт установился и работает
//alert ('igronet script is working');

function do_platypus_script() {

addGlobalStyle('.tfoot { display:none ! important; }');
addGlobalStyle('.header { display:none ! important; }');
addGlobalStyle('.tborder_icons { display:none ! important; }');
addGlobalStyle('.scr_inc {font:8pt Verdana bold; margin-left:4px; color:#000; border-left:1px #777 solid}');
addGlobalStyle('#collapseobj_forumrules { display:none ! important; }');

//найдем все элементы с атрибутом title 
var allElements, thisElement;
allElements = document.evaluate(
    '//*[@title]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allElements.snapshotLength; i++) {
    thisElement = allElements.snapshotItem(i);
    switch (thisElement.nodeName.toUpperCase()) {
        case 'IMG':
			if (thisElement.title == 'Convex' || thisElement.title == 'УралWeb'){
			thisElement.parentNode.removeChild(thisElement);
			}
			
		var boldEl, phref, ahref;
			spanINC = document.createElement("span");
			text1 = thisElement.title;
			j = text1.split(" ");
			if (j[0]=="Вложений:") {
			newText = document.createTextNode(" " + (j[1]));
			spanINC.className = 'scr_inc';
			spanINC.appendChild(newText);
		    thisElement.parentNode.appendChild(spanINC);
			}
			if (j[0]=="Аватар") {
			z = thisElement.parentNode.href.split("=");
			ahref = document.createElement("a");
			phref = document.createElement("p");
			ahref.setAttribute('href',"http://igronet.ru/forum/member.php?u="+(z[1]));
			phref.setAttribute('style',"font:8pt verdana, geneva, lucida, 'lucida grande', arial, helvetica, sans-serif; color:#000; padding:0; margin-top:5px; margin-bottom:-5px;");
			atext = document.createTextNode("Профиль");
			phref.appendChild(atext);
			ahref.appendChild(phref);
			thisElement.parentNode.appendChild(ahref);
		}	
        break;
    }
}
//найдем все элементы с тегом <img> и атрибутом id
var allImgs, thisImg;
allImgs = document.evaluate(
    '//img[@id]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allImgs.snapshotLength; i++) {
    thisImg = allImgs.snapshotItem(i);
    switch (thisImg.nodeName.toUpperCase()) {
	default:
	text = thisImg.id;
	j = text.split("_");
	if (j[0]=="collapseimg") {
	altText = document.createTextNode('Hide/Show');
    thisImg.parentNode.replaceChild(altText, thisImg);
	}
	}
    
}

smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/TABLE[2]/TBODY[1]/TR[1]/TD[1]/CENTER[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/TABLE[2]/TBODY[1]/TR[2]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/TABLE[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[10]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[1]/DIV[1]/DIV[11]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/FORM[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);

};
window.addEventListener("load", function() { do_platypus_script() }, false);
/*var gplatypusBundle = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
var mystrings = gplatypusBundle.createBundle("chrome://platypus/locale/platypusCore.properties");
var platypusplatypuscouldntfi1 = mystrings.GetStringFromName("platypusplatypuscouldntfi1");
var platypusthisusuallyhappens = mystrings.GetStringFromName("platypusthisusuallyhappens");*/

function smart_remove(doc, node) {
    if (node.parentNode.childNodes.length == 1) {
smart_remove(doc, node.parentNode);
    } else {
remove_it(doc, node);
    };
};

function remove_it(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};

//добавляем стиль через эту функцию
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




// ==/UserScript==