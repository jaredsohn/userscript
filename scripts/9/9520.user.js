// ==UserScript==
// @name        6 Digg Mirrors
// @description Adds links to DuggMirror, DuggBack, Wayback Machine, Google Cache, and Coral Cache at the end of every article title.
// @include     http*://*digg.com/*
// ==/UserScript==

var duggmirroricon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB%2FHNKOAAAAFXRFWHRDcmVhdGlvbiBUaW1lAAfWBRMAKCQ2oIuYAAAAB3RJTUUH1gUTACoSHi2f8wAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAADBQTFRFAAAAmZmZqKio1tbW2NjY29vb3d3d3t7e4uLi5eXl6enp7e3t9fX19vb2%2Bvr6%2F%2F%2F%2FWS1fFAAAAAF0Uk5TAEDm2GYAAABESURBVHjaY2BQUlJkYGDQ%2F%2F8xAUienpjAIKS%2Fs1CJQU5%2FuqEjg5ygoKAhg2x5iYsjg9Lvle2CDEy%2FZpSKMTD9bA8RAwC9gRArqhXXPwAAAABJRU5ErkJggg%3D%3D";
var duggbackicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAATdJREFUeNpi/Hj7NiMzM8Pfv4xsbP9+/mT4/5+JlfU/AwOQAWIzsbHdXrjwUGrqx5s3Wbm5gdw/376db26+2NHxHyjNyMj4+f79+wcOXJ86FaiJXUTk3po1txctenvhwr8/f1iASrQLCtj4+B5s2PBs3z5BXd2H69fL+/lpZGSw8fMzAs1k5uBg5eV9d/ny3WXLfn35IufjI+noyPDv398fP5jAjvjPwMgItBhI/vv1i5mdnZGJCehYoBTD5wcPgPpOlZcvk5G5Nn36qzNn1ujq7ouIeHbgwNenTxm+PH58KDl5CgPDVkfHLw8eAJ19sqRkNgPDFnv7j3fusPz/949TQkLG3FyvtBToiB+vX6vExX1+9IiFkxNoNuMnYLAArfz7l5mL69/37yC/cnAAXQB0ETC4AAIMANyymOnyGfKiAAAAAElFTkSuQmCC";
var waybackicon		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAvSURBVHjaYlipZfAfCBiQaQYGBgzMxIADADUxItM4FaKDEaxwlbbhf2QaGwAIMACO7RsUdiuurwAAAABJRU5ErkJggg==";
var googleicon      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAiklEQVQY02MUjfmmFxPFgAuIxnz7jwNcU9BngSjae%2FbDxJUPj1z%2BxMDAYKPLlx8u72wswMDAwASRnrjyIQMDw%2BoW3XfbbfPD5SFchOGCHof2nHmPaTgTpmuEPA8LeR6GsKHSNrp8E1c%2B3Hv2A8QKG10%2BiDjUaRD7Qmsuw51GlMcYnXcE4AqSyRn3Abz4culPbiCuAAAAAElFTkSuQmCC";
var coralcacheicon  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAAgUlEQVQY042O0QnCQBQEZy0sFiEkVVxa8GxAuLOLgD3cVRKwAytYf05JkGgGFt7H8nZkG10UgBNwZE0F7j77JiIJGPlNFhGzgwOQd%2FQytrEJdjtbrs%2FORAqRZBvZBrQxby2nv5iHniqokquUgM%2FH8Hadh57HNG05rlMgFXDL0vE%2FL%2BEXVN83HSenAAAAAElFTkSuQmCC";
var dotcacheicon  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQBJREFUeNosj79LAnEAxT93fqWtJSL3iqIhqIjgwKUaxT/BuWhrbGwJXBpuaS9o9g8InFKizn6JgkNGQj/QIYzuOr17ednjTR/eg/csSUQBgy7vJW6LtEL66+T2Wctip9DwR98dRb7ioUJPXlonKGd06iqO0WtFfkv/itRc0AU6QiuWGjWb6gH+FWN9VQnfEEzDjHAPDc17Znfw77Cn+DhGn/RJEpPweGnoGNo9giIpsKD35xi6jIjNhEMF2vAEDXiGNDzACyw7luo1CqtkxRwYCKBOUhhYlDxG63XmatFoA20jB82jJaPz8bHkzlDXZe3mtZnRVkZ7ed2UEyj9CjAAKTST8XYJJ4wAAAAASUVORK5CYII=";
var background_left   = "";
var background_middle = "";
var background_right  = "";

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addIcons(node, isComment, idx) {
	var anchor, container, background_left, background_middle, background_right;

	// add container
	container = document.createElement("div");
	container.className = "sam_container";
	node.parentNode.insertBefore(container, node.nextSibling);

	// add background
	background_left = document.createElement("div");
	background_left.className = "sam_backgroundimage_left";
	container.appendChild(background_left);

	background_middle = document.createElement("div");
	background_middle.className = "sam_backgroundimage_middle";
	container.appendChild(background_middle);

	background_right = document.createElement("div");
	background_right.className = "sam_backgroundimage_right";
	container.appendChild(background_right);

	//add duggmirror cache link
	anchor = document.createElement("a");
	anchor.href = idx == null ? location.href : document.getElementById("diggs" + idx).href;
	anchor.href = anchor.href.replace(/digg\.com/, "duggmirror.com");
	anchor.title = "DuggMirror";
	anchor.className = "sam_duggmirroricon";
	background_middle.appendChild(anchor);

	//add duggback cache link
	anchor = document.createElement("a");
	anchor.href = idx == null ? location.href : document.getElementById("diggs" + idx).href;
	anchor.href = anchor.href.replace(/digg\.com/, "duggback.com");
	anchor.title = "DuggBack";
	anchor.className = "sam_duggbackicon";
	background_middle.appendChild(anchor);
	
	// add wayback machine link
	anchor = document.createElement("a");
	anchor.href = "http://web.archive.org/" + node.href;
	anchor.title = "Wayback Machine";
	anchor.className= "sam_waybackicon";
	background_middle.appendChild(anchor);

	//add google cache link
	anchor = document.createElement("a");
	anchor.href = "http://www.google.com/search?q=cache:" + node.href;
	anchor.title = "Google Cache";
	anchor.className = "sam_googleicon";
	background_middle.appendChild(anchor);
	
	//add coral cache link
	anchor = document.createElement("a");
	anchor.href = node.href;
	anchor.host += ".nyud.net:8090";
	anchor.title = "Coral Cache";
	anchor.className = "sam_coralcacheicon";
	background_middle.appendChild(anchor);
	
	//add dotcache link
	anchor = document.createElement("a");
	anchor.href = "http://www.dotcache.com/" + node.href;
	anchor.title = "DotCache";
	anchor.className = "sam_dotcacheicon";
	background_middle.appendChild(anchor);

	// add a space so it wraps nicely
	node.parentNode.insertBefore(document.createTextNode(" "), node.nextSibling);
}

addGlobalStyle("a.sam_coralcacheicon, a.sam_dotcacheicon, a.sam_duggmirroricon, a.sam_duggbackicon, a.sam_googleicon, a.sam_waybackicon { padding-left: 15px; background: center no-repeat; opacity: 0.4;}");
addGlobalStyle("a.sam_coralcacheicon { background-image: url(" + coralcacheicon + "); } ");
addGlobalStyle("a.sam_dotcacheicon { background-image: url(" + dotcacheicon + "); } ");
addGlobalStyle("a.sam_duggmirroricon  { background-image: url(" + duggmirroricon + "); }");
addGlobalStyle("a.sam_duggbackicon  { background-image: url(" + duggbackicon + "); }");
addGlobalStyle("a.sam_googleicon     { background-image: url(" + googleicon + "); }");
addGlobalStyle("a.sam_waybackicon     { background-image: url(" + waybackicon + "); }");
addGlobalStyle("a.sam_coralcacheicon:hover, a.sam_dotcacheicon:hover, a.sam_duggmirroricon:hover, a.sam_duggbackicon:hover, a.sam_googleicon:hover, a.sam_waybackicon:hover { opacity: 1.0; }");

addGlobalStyle("div.sam_container { margin-left: 1em; display:inline; white-space:nowrap; }");
addGlobalStyle("div.sam_backgroundimage_left, div.sam_backgroundimage_middle, div.sam_backgroundimage_right { display: inline; background-repeat: no-repeat; background-position: center; }");
addGlobalStyle("div.sam_backgroundimage_left { padding-bottom: 0px; padding-left: 3px; background-image:url(" +  background_left + "); }");
addGlobalStyle("div.sam_backgroundimage_middle { padding-bottom: 0px; background-image:url(" +  background_middle + "); background-repeat: repeat-x; }");
addGlobalStyle("div.sam_backgroundimage_right { padding-bottom: 0px; padding-left: 3px; background-image:url(" +  background_right + "); }");


var xpath  = "//div[@class='news-body']/h3/a[@href][1]";
var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

if(result.snapshotLength == 1) addIcons ( result.snapshotItem ( i ), true, null );
else 
{
	for ( var i = 0; i < result.snapshotLength; i++ )
	{
		addIcons ( result.snapshotItem ( i ), true, i );
	}
}

