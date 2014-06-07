// ==UserScript==
// @name	Digg.com Alternate Mirrors (Comment Page Only)
// @namespace	http://www.sernerdalot.com
// @description	Adds mirror links from Coral, DotCache, DuggBack, Google Cache, Rorr.im and the Wayback Machine to every article on Digg.com.
// @version	1.0.1
// @date		2009-2-10
// @creator	mikec20
// @include	http://digg.com/*
// @include	http://*.digg.com/*
// ==/UserScript==


/** Binary Icons **/

var iconCC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAgUlEQVQY042O0QnCQBQEZy0sFiEkVVxa8GxAuLOLgD3cVRKwAytYf05JkGgGFt7H8nZkG10UgBNwZE0F7j77JiIJGPlNFhGzgwOQd%2FQytrEJdjtbrs%2FORAqRZBvZBrQxby2nv5iHniqokquUgM%2FH8Hadh57HNG05rlMgFXDL0vE%2FL%2BEXVN83HSenAAAAAElFTkSuQmCC";
var iconDC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNosj79LAnEAxT93fqWtJSL3iqIhqIjgwKUaxT/BuWhrbGwJXBpuaS9o9g8InFKizn6JgkNGQj/QIYzuOr17ednjTR/eg/csSUQBgy7vJW6LtEL66+T2Wctip9DwR98dRb7ioUJPXlonKGd06iqO0WtFfkv/itRc0AU6QiuWGjWb6gH+FWN9VQnfEEzDjHAPDc17Znfw77Cn+DhGn/RJEpPweGnoGNo9giIpsKD35xi6jIjNhEMF2vAEDXiGNDzACyw7luo1CqtkxRwYCKBOUhhYlDxG63XmatFoA20jB82jJaPz8bHkzlDXZe3mtZnRVkZ7ed2UEyj9CjAAKTST8XYJJ4wAAAAASUVORK5CYII=";
var iconDB = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATdJREFUeNpi/Hj7NiMzM8Pfv4xsbP9+/mT4/5+JlfU/AwOQAWIzsbHdXrjwUGrqx5s3Wbm5gdw/376db26+2NHxHyjNyMj4+f79+wcOXJ86FaiJXUTk3po1txctenvhwr8/f1iASrQLCtj4+B5s2PBs3z5BXd2H69fL+/lpZGSw8fMzAs1k5uBg5eV9d/ny3WXLfn35IufjI+noyPDv398fP5jAjvjPwMgItBhI/vv1i5mdnZGJCehYoBTD5wcPgPpOlZcvk5G5Nn36qzNn1ujq7ouIeHbgwNenTxm+PH58KDl5CgPDVkfHLw8eAJ19sqRkNgPDFnv7j3fusPz/949TQkLG3FyvtBToiB+vX6vExX1+9IiFkxNoNuMnYLAArfz7l5mL69/37yC/cnAAXQB0ETC4AAIMANyymOnyGfKiAAAAAElFTkSuQmCC";
var iconGC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAiklEQVQY02MUjfmmFxPFgAuIxnz7jwNcU9BngSjae%2FbDxJUPj1z%2BxMDAYKPLlx8u72wswMDAwASRnrjyIQMDw%2BoW3XfbbfPD5SFchOGCHof2nHmPaTgTpmuEPA8LeR6GsKHSNrp8E1c%2B3Hv2A8QKG10%2BiDjUaRD7Qmsuw51GlMcYnXcE4AqSyRn3Abz4culPbiCuAAAAAElFTkSuQmCC";
var iconRI = "data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOG2/kjNhP55z4r+dObC/jz///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A157+YK42/smZAP//mQD//5kA//+ZAP//uFD+ruK6/kT///8A////AP///wD///8A////AP///wD///8A1Jb+Z5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//4rr+RP///wD///8A////AP///wD///8A+/j+BpkA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//7hQ/q7///8A////AP///wD///8A////ANWY/mWZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//4bb+SP///wD///8A////AP///wC6VP6rmQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//8t+/oH///8A////AP///wD///8AulT+q5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA///IeP6H////AP///wD///8A////AM6G/niZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//4LT+Sv///wD///8A////AP///wD27P4SmQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD///38/gH///8A////AP///wD///8A////AMt+/oGZAP//mQD//5kA//+ZAP//mQD//5kA//+ZAP//mQD//9OS/mv///8A////AP///wD///8A////AP///wD///8Az4r+dJkA//+ZAP//mQD//5kA//+ZAP//mQD//9SW/mf///8A////AP///wD///8A////AP///wD///8A////AP///wD58v4M1Jb+Z71c/qPBZv6Z2aL+XPv4/gb///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAP//AAD//wAA+B8AAPAPAADgBwAA4AcAAMADAADAAwAA4AcAAOAHAADgDwAA+B8AAP5/AAD//wAA//8AAA==";
var iconWM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAvSURBVHjaYlipZfAfCBiQaQYGBgzMxIADADUxItM4FaKDEaxwlbbhf2QaGwAIMACO7RsUdiuurwAAAABJRU5ErkJggg==";

var headTag = document.getElementsByTagName('head')[0];

function addGlobalStyle(css) {
	if(headTag) {
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		headTag.appendChild(style);
	}
}

/* For pages with a single article. */

function addContainer() {
	// The container to hold the mirror links.
	var container = document.createElement("div");
	container.className = "tool";
	
	//var detailsPath  = "//div[@class='news-details']/dl/dt[1]";
	var detailsPath  = "//div[@class='news-details']/a";
	var details = document.evaluate(detailsPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var refElement = details.snapshotItem(0);
	
	refElement.parentNode.insertBefore(container, refElement.parentNode.firstChild);
	
	addMirrors(container);
}

/* For pages with more than one article. */

function addContainers(id) {
	
	// The container to hold the mirror links.
	var container = document.createElement("div");
	container.className = "tool";
	
	var refElement = refElements.snapshotItem(id);
	refElement.parentNode.insertBefore(container, refElement.parentNode.firstChild);
	
	addMirrors(container, id);
}

function addMirrors(container, id) {
	
	// The container for the actual links.
	var links = document.createElement("div");
	container.appendChild(links);
	
	var single = (id == null);
	
	title = (single) ? title.snapshotItem(0) : titles.snapshotItem(id);
	
	links.className = "sbp_links";
	
	// The Coral Cache link.
	link = document.createElement("a");
	link.href = title.href;
	link.host += ".nyud.net:8080";
	link.target = title.target;
	link.title = "Coral - The NYU Distribution Network";
	link.className = "sbp_iconCC";
	links.appendChild(link);
	
	// The DotCache link.
	link = document.createElement("a");
	link.href = "http://www.dotcache.com/" + title.href;
	link.target = title.target;
	link.title = "DotCache";
	link.className= "sbp_iconDC";
	links.appendChild(link);
	
	// The DuggBack link.
	var link = document.createElement("a");
	link.href = (single) ? location.href : document.getElementById("diggs" + id).href;
	link.href = link.href.replace(/digg\.com/, "duggback.com");
	link.target = title.target;
	link.title = "DuggBack";
	link.className = "sbp_iconDB";
	links.appendChild(link);
	
	// The Google Cache link.
	link = document.createElement("a");
	link.href = "http://www.google.com/search?q=cache:" + title.href;
	link.target = title.target;
	link.title = "Google Cache";
	link.className = "sbp_iconGC";
	links.appendChild(link);
	
	// The Rorr.im link.
	var link = document.createElement("a");
	link.href = (single) ? location.href : document.getElementById("diggs" + id).href;
	link.href = link.href.replace(/digg\.com/, "rorr.im/digg\.com");
	link.target = title.target;
	link.title = "Rorr.im";
	link.className = "sbp_iconRI";
	links.appendChild(link);
	
	// The Wayback Machine link.
	link = document.createElement("a");
	link.href = "http://web.archive.org/web/*/" + title.href;
	link.target = title.target;
	link.title = "Wayback Machine";
	link.className= "sbp_iconWM";
	links.appendChild(link);
}

/** CSS for everything **/

addGlobalStyle("div.sbp_links {margin-left: -5px; margin-top: 1px;}");

addGlobalStyle("a.sbp_iconCC, a.sbp_iconDC, a.sbp_iconDB, a.sbp_iconGC, a.sbp_iconRI, a.sbp_iconWM {opacity: 0.5; padding-left: 15px; background: center no-repeat;}");

addGlobalStyle("a.sbp_iconCC {background-image: url(" + iconCC + ");}");
addGlobalStyle("a.sbp_iconDC {background-image: url(" + iconDC + ");}");
addGlobalStyle("a.sbp_iconDB {background-image: url(" + iconDB + ");}");
addGlobalStyle("a.sbp_iconGC {background-image: url(" + iconGC + ");}");
addGlobalStyle("a.sbp_iconRI {background-image: url(" + iconRI + ");}");
addGlobalStyle("a.sbp_iconWM {background-image: url(" + iconWM + ");}");

addGlobalStyle("a.sbp_iconCC:hover, a.sbp_iconDC:hover, a.sbp_iconDB:hover, a.sbp_iconGC:hover, a.sbp_iconRI:hover, a.sbp_iconWM:hover {opacity: 0.95;}");


/** Find articles and reference elements **/

var titlePath  = "//div[@class='news-body']/h1/a[@href][1]";
var titlesPath  = "//div[@class='news-body']/h3/a[@href][1]";
var refElementPath = "//a[@class='tool comments']";
var title = document.evaluate(titlePath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var refElements = document.evaluate(refElementPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (title.snapshotLength === 1) {
	addContainer();
} /** else {
	var titles = document.evaluate(titlesPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (titles.snapshotLength > 1) {
		for(var i = 0; i < titles.snapshotLength; i++)	{
			addContainers(i);
		}
	}
} **/
///

