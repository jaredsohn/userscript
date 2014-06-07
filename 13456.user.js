// ==UserScript==
// @name           CheckboxToMessages
// @namespace      travian
// @description    Adds a checbox for checked all at messages
// @include        http://s*.travian.*/berichte.php*
// @include        http://s*.travian.*/nachrichten.php*
// ==/UserScript==

function elem(tag,content) { var ret = document.createElement(tag);  ret.innerHTML = content;  return ret;}
function find(xpath,xpres) {
  var ret = document.evaluate(xpath,document,null,xpres,null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE, XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

function checkAll(d) {
	for(i=1;i<11;i++) {
		try {
		 var n = "n"+i;
		 find("//input[@name='"+n+"']",XPFirst).checked=d.checked?true:false;		
		}catch(ex){}
	}	
}

 var boxSubmit = find("//input[@name='del']|//input[@name='delmsg']",XPFirst);
 if (boxSubmit) {
 	var newBox = elem('input','');
 	newBox.type='checkbox';
 	newBox.addEventListener("click", function(){checkAll(this);}, 0);
 	var insertedElement = boxSubmit.parentNode.insertBefore(newBox, boxSubmit)
 }
	