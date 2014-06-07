// ==UserScript==
// @name           (Custom) DC Divine Items and Stuffed Cans of Asparagus
// @namespace      http://userscripts.org/users/26909
// @description    Puts your Divine Items and Stuffed Cans of Asparagus into your Display Case
// @include        http://*kingdomofloathing.com/*managecollection.php*
// @include        http://127.0.0.1:*/*managecollection.php*
// ==/UserScript==

function docval(path,node){
	return document.evaluate(path,node,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}

function getElementByXPathNode(path,node){
	tmp = docval(path,node);
	if(tmp.snapshotLength==0){return null;}else{return tmp.snapshotItem(0);}
}

function getElementsByXPathNode(path,node){
	tmpa = [];
	tmp = docval(path,node);
	if(tmp.snapshotLength==0){
		return null;
	}else{
		for(var i = 0; i < tmp.snapshotLength; i++) tmpa.push(tmp.snapshotItem(i));
		return tmpa;
	}
}

function getElementByXPath(path){return getElementByXPathNode(path,document);}
function getElementsByXPath(path){return getElementsByXPathNode(path,document);}

function elem(name, attrs, style, text) {
    var e = document.createElement(name);
    if(attrs){
        for(key in attrs){
			switch(key){
				case 'class': e.className = attrs[key]; break;
				case 'id': e.id = attrs[key]; break;
				default: e.setAttribute(key, attrs[key]);
			}
        }
    }
    if(style) {
        for(key in style)e.style[key]=style[key];
    }
    if(text)e.appendChild(document.createTextNode(text));
    return e;
}

switch(window.location.pathname){
	case "/managecollection.php":
		f=document.forms.namedItem("addgoodies");

		if(x=getElementsByXPath('//form[@name="addgoodies"]//option[(starts-with(.,"divine ") or @value="1189")]')){
			y=Math.min(x.length,10);
			for(i=0;i<y;i++){
				f.appendChild(elem("input",{"type":"hidden","value":x[i].value,"name":"whichitem"+(i+2)}));
				f.appendChild(elem("input",{"type":"hidden","name":"howmany"+(i+2)}));
			}
			setTimeout("document.forms.namedItem('addgoodies').submit()",1000);
		}
		break;
}
