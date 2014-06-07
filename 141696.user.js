// ==UserScript==
// @name          BJ2 Float Menu 2.1
// @namespace     http://userstyles.org
// @description	  Script que deixa o Menu do BJ2 em float.
// @author        tiilopes
// @include       http://www.bj2.me/*
// @include       http://*.bj2.me/* 
// ==/UserScript==

(function () {

//Coloca swf em transparent

for (var ems = document.embeds, i = 0, em; em = ems[i]; i++) {
	em.setAttribute('wmode', 'transparent');
	var nx = em.nextSibling, pn = em.parentNode;
	pn.removeChild(em);
	pn.insertBefore(em, nx);
}

// styles

//var contentPosition = getPosition($('content'));
addStyle(' .menutopo { position:none !important; width:97% !important; z-index:1001; top: 180px} ');
//addStyle('.HeaderMain { padding: 0px 0px 35px;} ');
addStyle(' .menutopo2 { position:fixed !important;width:97% !important; z-index:1001; top:0 } ');

// Elemento por id

function $(id,root){
	return root ? root.getElementById(id) : document.getElementById(id);
}

// elemento por classe

function $$(className,root){
	if (document.getElementsByClassName) {
		return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
	} else {
		var elms = $x('//*[contains(@class,"'+className+'")]',root);
		var buffer = new Array();
		for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
		return buffer;
	}
}

// XPath

function $x(xpath,root){
	return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
}

// Addc style

function addStyle(css) {
	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
	else if (heads = document.getElementsByTagName('head')) {
		var style = document.createElement('style');
		try { style.innerHTML = css; }
		catch(x) { style.innerText = css; }
		style.type = 'text/css';
		heads[0].appendChild(style);
	}
}

}) ();
// addc jquery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// addc script e chama jquery
function main() {
  // alert('fixed top debug');
  // envia elemento para posicao
 $(window).scroll(function () {
        if ($(this).scrollTop() >= 180) {
            $("tr.menutopo").removeClass("").addClass("menutopo2") 
        } else {  
            $("tr.menutopo").removeClass("menutopo2").addClass("menutopo")
         }
});
}

// load jQuery and execute the main function
addJQuery(main);