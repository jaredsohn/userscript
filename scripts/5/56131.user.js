// ==UserScript==
// @name           Smaller iGoogle
// @namespace      Wouttonio
// @description    Removes unneeded igoogle content, to make it more efficient and smaller.
// @include        *google.*/ig*
// @include        *google.*.*/ig*
// @version        0.9.5
// ==/UserScript==

function removeModbox(elementz){
	var ps = document.getElementsByClassName(elementz);
	var marginz = "2px";
	for(var i = 0; i < ps.length; i++ ) {
	      if(ps[i]);
	      	ps[i].style.marginTop = marginz;
					ps[i].style.marginLeft = marginz;
					ps[i].style.marginRight = marginz;
					ps[i].style.marginBottom = marginz;
	      }
}

function removeModboxin(elementz){
	var ps = document.getElementsByClassName(elementz);
	var marginz = "0px";
	for(var i = 0; i < ps.length; i++ ) {
	      if(ps[i]);
					ps[i].style.paddingTop = '0px';
					ps[i].style.paddingLeft = '0px';
					ps[i].style.paddingRight = '0px';
					ps[i].style.paddingBottom = '0px';
					ps[i].style.marginTop = marginz;
					ps[i].style.marginLeft = marginz;
					ps[i].style.marginRight = marginz;
					ps[i].style.marginBottom = marginz;
	      }
}

function removeEle(elementz){
	var toRemove = document.getElementById(elementz);
	if (toRemove) {
	    toRemove.parentNode.removeChild(toRemove);
	}
}

function removePad(elementz) {
	var top = document.getElementById(elementz);
	if(top){
		top.style.paddingTop = '0px';
		top.style.paddingLeft = '0px';
		top.style.paddingRight = '0px';
		top.style.paddingBottom = '0px';
	}
}


function removeMar(elementz) {
	var top = document.getElementById(elementz);
	if(top){
		top.style.marginTop = '0px';
		top.style.marginLeft = '0px';
		top.style.marginRight = '0px';
		top.style.marginBottom = '0px';
	}
}

 function ChangeCSSRule(xElement,xValue) {  
         var strCSS = 'cssRules';  
 if(document.all) {  
            strCSS = 'rules';  
         }  
         document.styleSheets[0][strCSS][0].style[xElement] = xValue;  
       }

function finalEdit() { 
	removeEle("footerwrap");
	removeEle("col1");
	removeEle("addstuff");
	removeEle("new_user_demo");
	removeEle("tabs");
	removeEle("signInBox");
	removePad("nhdrwrapsizer");
	removePad("gsea");
	removePad("modules");
	removeMar("nhdrwrapsizer");
	removeMar("gsea");
	removeMar("t_1");
	removeMar("nhdrwrap")
	removeModbox("modbox");
	removeModbox("yui-b");
	removeModboxin("modboxin");
	document.getElementById('nhdrwrapsizer').style.height = "auto";
	
	document.getElementById('signInBox').style.display = "none";
	
	
	
	//.talk_container,
	
	/*
	(function() {
	var css = " #tab_chat, .talk_roster, #talk_roster, .gtn-roster-iframe-id, .roster_parent{ display: none !important; }";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	})();
	*/
}
window.onload = finalEdit();