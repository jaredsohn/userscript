// ==UserScript==
// @name           Display Hidden Form Fields
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    unhide fileds
// @include        *maplewood*
// ==/UserScript==

	   var snapHidden = document.evaluate("//input[@type='hidden'][@name='txtWeight']",
		   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var elmHidden = snapHidden.snapshotItem(i);
		   //elmHidden.style.MozOutline = '1px dashed #666';
		   elmHidden.type = 'text';
	//	   elmHidden.title = 'Hidden field "' +
	//		   (elmHidden.name || elmHidden.id) + '"';
	   }
////document.forms['frmEditMbk'].elements['txtWeight'].type = "text";
//var inp=document.forms['frmEditMbk'].elements['txtWeight']
//inp.type = "text";
//var x=3
//if (x=2){
//	alert(1);
//}
//
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function removeId(obj){
 var elmDeleted = document.getElementById(obj);
	elmDeleted.parentNode.removeChild(elmDeleted);

}
function removeClass(obj){
	var p = document.getElementsByClassName(obj);
	for (var i=p.length; --i>=0;) {
	    p[i].parentNode.removeChild(p[i]);
	}
}
document['getElementsByRegex'] = function(pattern){
   var arrElements = [];   // to accumulate matching elements
   var re = new RegExp(pattern);   // the regex to match with

   function findRecursively(aNode) { // recursive function to traverse DOM
      if (!aNode)
          return;
      if (aNode.id !== undefined && aNode.id.search(re) != -1)
          arrElements.push(aNode);  // FOUND ONE!
      for (var idx in aNode.childNodes) // search children...
          findRecursively(aNode.childNodes[idx]);
   };

   findRecursively(document); // initiate recursive matching
   return arrElements; // return matching elements
};
removeId("CELL3");
removeId("CELL2");
addGlobalStyle('#CELL4,#CELL5,#CELL6,#CELL7,#CELL8,#CELL9 { text-transform:uppercase !important; background:#EEF4F7 !important;border: 2px solid #765942 !important;border-radius: 10px !important;}');
addGlobalStyle("*[id*='txtComment']{background:#EEF4F7 !important; overflow:hidden !important; border: 2px solid #765942 !important;border-radius: 10px !important;height: 7.3em !important;width: 40em !important;}");
