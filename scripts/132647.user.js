// ==UserScript==
// @name           Clean MATLAB Doc page
// @namespace      http://userscripts.org/users/fiva
// @description    Cleans MATLAB TechDoc pages from enormously wide header
// @include        http://www.mathworks.com/help/*
// @include        http://www.mathworks.ch/help/*
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

function hideDiv(divID) {
	var div = document.getElementById(divID);
	if (div) { 
    	// div.style.display = "none"; // Hides it
    	div.parentNode.removeChild(div); // Removes it entirely
	}
}

hideDiv("globaltop2");
hideDiv("nextgen_banner");
hideDiv("navbar");
//hideDiv("breadcrumbtable");

addCss ( ".frameless_toc_header { top: 23px  ! important; }" );
addCss ( ".frameless_contents { top: 48px  ! important; }" );
addCss ( ".doc_wrapper { top: 100px ! important; }" );

addCss ( ".frameless_contents { position: absolute  ! important; }" );
addCss ( ".frameless_contents { height: 90%  ! important; }" );
addCss ( ".doc_wrapper { position: absolute  ! important; }" );
addCss ( ".doc_wrapper { height: 80%  ! important; }" );
