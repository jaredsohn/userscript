// ==UserScript==
// @name           Force Submit
// @namespace      Credits to iampradip
// @description    Submit forms which you can't submit with submit buttons or when timers/ads are forced.
// @include        *
// @version        1.0.0
// ==/UserScript==

// you know how to use @include and @exclude

function addCSS(css){
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
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
}

function init(){
	if(document.forms.length>0){
		var strColorTransitionValue="color 200ms";
		var strBoxShadowTransitionValue="box-shadow 300ms";
		var strTransitionValue=strColorTransitionValue+", background-"+strColorTransitionValue+", "+strBoxShadowTransitionValue+", -webkit-"+strBoxShadowTransitionValue;
		var strTransition="transition: "+strTransitionValue+";-moz-transition: "+strTransitionValue+";-webkit-transition: "+strTransitionValue+";-o-transition: "+strTransitionValue;
		var strBoxShadow="0px 0px 0";
		var strHoverBoxShadow="0px 0px 3px #808080";
		addCSS("form .force-submit-link{display:none;z-index:10000;border:1px solid #808080;position:relative;text-decoration:none !important;cursor:default;background-color:#E8E8E8;color:#808080;font-weight:normal;padding:3px 8px;"+strTransition+"}"+
			"form .force-submit-start{border-radius:5px 0 0 5px;}"+
			"form .force-submit-end{border-radius:0 5px 5px 0;border-left:0}"+
			"form .force-submit-middle{border-left:0;}"+
			"form:hover .force-submit-link{display:inline;color:#000000;box-shadow: "+strBoxShadow+";-webkit-box-shadow: "+strBoxShadow+"}"+
			"form .force-submit-link:hover{background:#ffffff;text-decoration:none !important;box-shadow: "+strHoverBoxShadow+";-webkit-box-shadow: "+strHoverBoxShadow+"}");
	}
	for(var i=0;i<document.forms.length;i++){
		var aSubmit=document.createElement("a");
		aSubmit.className="force-submit-link force-submit-start";
		aSubmit.title="Click to forcely submit this form.";
		aSubmit.innerHTML="Submit";
		aSubmit.addEventListener("click",function (){
			this.parentNode.submit();
		},false);
		document.forms[i].insertBefore(aSubmit,document.forms[i].firstChild);
		
		var aInfo=document.createElement("a");
		aInfo.className="force-submit-link force-submit-middle";
		aInfo.title="Click for all values associated with this form.";
		aInfo.innerHTML="Info";
		aInfo.addEventListener("click",function (){
			var strValues="Form: "+this.parentNode.name+"\nAction: "+this.parentNode.action+"\nMethod: "+this.parentNode.method+"\n";
			var els=this.parentNode.elements;
			for(var i=0;i<els.length;i++){
				strValues+="\n\""+els[i].name+"\" = \""+els[i].value+"\"";
			}
			alert(strValues);
		},false);
		document.forms[i].insertBefore(aInfo, aSubmit.nextSibling);
		
		var aFSClose=document.createElement("a");
		aFSClose.className="force-submit-link force-submit-end";
		aFSClose.title="Close";
		aFSClose.innerHTML="X";
		aFSClose.addEventListener("click", function (){
			this.parentNode.removeChild(this.previousSibling);
			this.parentNode.removeChild(this.previousSibling);
			this.parentNode.removeChild(this);
		},false);
		document.forms[i].insertBefore(aFSClose, aInfo.nextSibling);
	}
}

init();