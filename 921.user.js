// ==UserScript==
// @name        Slashdot - add mirrors
// @namespace   http://www.cs.uni-magdeburg.de/~vlaube/Projekte/GreaseMonkey/
// @description Adds links to Coral (http://www.coralcdn.org/), MirrorDot (http://www.mirrordot.com/) and the Google Cache (http://www.google.com/) to every link in the articles and comments
// @include     http://slashdot.org/*
// @include     http://*.slashdot.org/*
// ==/UserScript==

/*
	PROBLEMS:
		wraps after links (visibility:hidden/visible) [now]
			OR
		some links jump if you touch them (display:none/block)
		
		conflicts with slimbody
*/

var coralcacheicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEWSURBVBiVbZAxS0JxAMR/zycKRVE9SCKiKIdAHGqIcnCwVTOcBEe/Qx+iORycpVFajByihqdigwjWVESUUhIU/KmUGq7lVUQd/Ja744azJAEsANvAmgfAmccBcGNJ2hx8DMrFVnHcvXVp3DWwfTaxuRjx+Tj5lbwJ2IGMJame3E9uVC4r/KdcNEcpU2r4ANM1XQAsYNmBxYmfopcZJGV7pqxOf1pmaElCEnp686l9P6v+y4kkZZGGVWnyu/CXJUk68kPQgQjgMryG52N4vQD/GIxEwElFsUeZQtK6NHh4f9xTzQnqFH7R2UpJUuVrPyCp2isU1E4kVA+F1AyHdZ5OyzSbknRoeYcDzAA7wCoQ9rwroAXsfgIdia0pCy1RlwAAAABJRU5ErkJggg==";
var mirrordoticon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACGSURBVBiVjZAxDsMgFEOdqnfI3kOkW/dsHIazkb1i6cARiFjDIfK6kAiYsGTJkv+Xv78AVTRAKjS1p24w2hCwIQDE2nuqxet7HLdunBIRAU7A54zPmZMbETACkg2BxTl8zizONbqckR4axWj0BDR7722TJP3WVZKmy+hb7595vtruffTQw/++Y9bFbtqJvgAAAABJRU5ErkJggg==";
var googleicon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACzSURBVBiVYxSN+fZfLyaKgSAQjfn2nxC4pqD/nwWm4fvPfwy1s+8xbDn2loGbg4nByViQITNQmkFJipOBgYGBgQmmcO6WZwxPXv9kWNGozbCtR59BRYaLoWTqXUyrbTLP/r/16CtOq5kYcAAhz8MMQp6H4Xy4wnBnMYbaOfcZLtz+wvDy3S+G9gxlBgcjQbhCuGeSfaQYHjz/wRBRfxXumZ5sZdKDh9F5R8B/QmE9OeM+AwCkQpisMtX1uwAAAABJRU5ErkJggg==";
var networkmirroricon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs%2B9AAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABiSURBVBiVhdGxEYAgEETRGxuwEYvRBqyDTIykEzK1F%2BnnmwjjwI5u%2BOdFdwYY7QzwdTCAfo70c8zdA2z7VVpneks4koUzlSBhjSRUSMMHuXH4hhm56Qcq1MAXWhspDu7VE26kNYBvyCO2EQAAAABJRU5ErkJggg%3D%3D";

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function getLeft(element) {
	var left = element.offsetLeft;
	var parent = element.offsetParent;
	
	while(parent) {
		left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	
	return left;
}

function getTop(element) {
	var top = element.offsetTop;
	var parent = element.offsetParent;
	
	while(parent) {
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	
	return top;
}

function addIcons(node, isComment) {
	// add container
	container = document.createElement("div");
	container.className = "sam_container";
	node.parentNode.insertBefore(container, node.nextSibling);

	// put the link in the container too
	container.appendChild(node);
	
	popup = document.createElement("div");
	popup.className = "sam_popup";
	container.appendChild(popup);

	container.addEventListener("mousemove", function(e) {
		var link = this.firstChild;
		var popup = this.firstChild.nextSibling;

		if(e.target.className)
			return false;

		var linkheight = link.offsetHeight;
		var mouseoffset = e.pageY-getTop(e.target);
		var top = Math.ceil(mouseoffset/linkheight)*linkheight;
		
		if(top == 0)
			top=linkheight;

		popup.style.top = top+"px";
		popup.style.left = e.pageX-getLeft(e.target)-(popup.offsetWidth/2)+"px";
		//GM_log(getLeft(e.target));
	}, false);

	// links in comments are not cached by mirrordot or networkmirror
	if(!isComment) {
		//add mirrordot link
		anchor = document.createElement("a");
		anchor.href = "http://www.mirrordot.com/find-mirror.html?" + node.href;
		anchor.title = "MirrorDot - Solving the Slashdot Effect";
		anchor.className = "sam_icon sam_mirrordot";
		anchor.appendChild(document.createTextNode("MirrorDot"));
		popup.appendChild(anchor);
		popup.appendChild(document.createElement("br"));

/*
		### probably added in the future ###
		//add networkmirror link
		anchor = document.createElement("a");
		anchor.href = "http://www.networkmirror.com/" + some_page_that_redirects_to_the_mirror;
		anchor.title = "Network Mirror - In Case of Slashdotting, Break Mirror";
		anchor.className = "sam_icon sam_networkmirror";
		anchor.appendChild(document.createTextNode("Network Mirror"));
		popup.appendChild(anchor);
		popup.appendChild(document.createElement("br"));
*/
	}
	
	//add coral cache link
	anchor = document.createElement("a");
	anchor.href = node.href;
	anchor.host += ".nyud.net:8090";
	anchor.title = "Coral - The NYU Distribution Network";
	anchor.className = "sam_icon sam_coralcache";
	anchor.appendChild(document.createTextNode("CoralCache"));
	popup.appendChild(anchor);
	popup.appendChild(document.createElement("br"));
	
	//add google cache link
	anchor = document.createElement("a");
	anchor.href = "http://www.google.com/search?q=cache:" + node.href;
	anchor.title = "Google Cache";
	anchor.className = "sam_icon sam_google";
	anchor.appendChild(document.createTextNode("GoogleCache"));
	popup.appendChild(anchor);
	popup.appendChild(document.createElement("br"));
}

addGlobalStyle("a.sam_icon { padding-left: 15px; background: left no-repeat !important; }");
addGlobalStyle("a.sam_icon:hover { opacity: 0.5; }");

addGlobalStyle("a.sam_coralcache    { background-image: url(" + coralcacheicon + ") !important; }");
addGlobalStyle("a.sam_mirrordot     { background-image: url(" + mirrordoticon + ") !important; }");
addGlobalStyle("a.sam_google        { background-image: url(" + googleicon + ") !important; }");
addGlobalStyle("a.sam_networkmirror { background-image: url(" + networkmirroricon + ") !important; }");

addGlobalStyle("div.sam_container { display:inline; position:relative;}");
addGlobalStyle("div.sam_popup { z-index:99; border: 1px solid black; position:absolute; background: lightGrey; -moz-border-radius:4px; padding:2px; left:0px; top:1.1em; display:block; width:8em; visibility:hidden; }");
addGlobalStyle("div.sam_container:hover>div.sam_popup { display:block; visibility:visible; }");


// articles
var xpath="//div[contains(@class,'article')]/div[@class='body']/descendant::a[starts-with(@href,'http://') or starts-with(@href,'https://')]";
var result = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0; i<result.snapshotLength; i++) {
	addIcons(result.snapshotItem(i), false);
}

// comments
xpath="//div[@class='commentBody']/descendant::a[starts-with(@href,'http://') or starts-with(@href,'https://')]";
result = document.evaluate(xpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for(var i=0; i<result.snapshotLength; i++) {
	addIcons(result.snapshotItem(i), true);
}
