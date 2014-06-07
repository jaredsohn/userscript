// ==UserScript==
// @name           Source Forge Download Other Mirrors
// @namespace      http://www.e3tar.ir
// @description    Redirect Primary Link Download From Sourceforge.Net To Other Link
// @include        http://sourceforge.net/projects/*/download*
// @include        http://www.sourceforge.net/projects/*/download*
// @include        http://sourceforge.net/projects/*
// @include        http://www.sourceforge.net/projects/*
// @include        https://sourceforge.net/projects/*
// @include        https://www.sourceforge.net/projects/*
// @version        1.1
// ==/UserScript==

function getElementsByClassName(oElm, strTagName, strClassName){
	var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	//var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for(var i=0; i<arrElements.length; i++){
		oElement = arrElements[i];
	    if(oRegExp.test(oElement.className)){
			return(oElement);
	    }
	}
}

(function () {
	var links=getElementsByClassName(document,'a','direct-download');
	var miror=links.href;
	var tmp=miror.match(/mirror=[A-Za-z0-9]*/i)[0];
	var m=tmp.replace(/mirror=/,"");
//	var base=miror.match(/[^&]*/i);
//	var diff=miror.match(/[^=]*/i);
//	var m=miror.substr(diff[0].length+1,base[0].length-diff[0].length-1);
	var pos=location.href;
	pos=pos.replace(/sourceforge.net\/projects/i,m+".dl.sf.net/project")
		.replace(/\/files\//i,"/")
		.replace(/\/download[?a-zA-Z0-9\/_=]*/i,"");
	location.replace(pos);
})();