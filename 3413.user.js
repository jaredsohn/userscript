// ==UserScript==
// @name         Thumbs only gallery browser
// @description  Thumbs only, strip the rest
// @author
// @namespace
// @include      *
// ==/UserScript==

// Version 5, 2008-04-13

var vars = {
	minImgSize: 50,
	bannerRatio: 1.8,
	reqImageLinks: 5,
	reqVideoLinks: 2,
	reqGalleryLinks: 25,
	imageLinks: [],
  videoLinks: [],
  galleryLinks: [],
  pageType: "",
	collectedGalleries: GM_getValue("collectedGalleries", "").replace(/http:\/\//g, ""),
	scaleThumbs: GM_getValue("scaleThumbs", true),
	scaleSize: GM_getValue("scaleSize", 150),
	hideVisitedGalleries: GM_getValue("hideVisitedGalleries", false),
	filterNestedUrls: GM_getValue("filterNestedUrls", true),
	modifyLinks: GM_getValue("modifyLinks", true),
	modifyAllLinks: GM_getValue("modifyAllLinks", true),
	linkFiltering: GM_getValue("linkFiltering", false),
	filterExpression: GM_getValue("filterExpression", "unwanted"),
	filterRegExp: new RegExp(GM_getValue("filterExpression", "unwanted"), "i"),
	slideShowInterval: 5000,
	slideShowTimeout: null,
	currentSlide: 0
}

function init() {
	xpathExec("//a//img", handleLinkedImages);
	if (vars.imageLinks.length >= vars.reqImageLinks)	vars.pageType = "Images";
	else if (vars.videoLinks.length >= vars.reqVideoLinks) vars.pageType = "Video's";
	else if (vars.galleryLinks.length >= vars.reqGalleryLinks) vars.pageType = "Gallery";
	if (vars.pageType != "") reRenderBody();
}

function handleLinkedImages(img) {
	var a = img.parentNode;
	while (a && a.nodeName != "A") a = a.parentNode;
	if (!a) return;
	if (vars.linkFiltering && a.href.match(vars.filterRegExp)) return;

	if (a.href.match(/\.jpe?g$/i))
		vars.imageLinks.push(createCleanImageLink(a, img));
	else if (a.href.match(/\.(mpe?g|wmv|asf|avi)$/i) && isThumb(img))
		vars.videoLinks.push(createCleanImageLink(a, img));
	else if (img.src.match(/\.jpe?g$/i) && isThumb(img))
		vars.galleryLinks.push(createCleanImageLink(a, img));
}

function createCleanImageLink(a, img) {
	var clA = document.createElement("a");
	if (vars.modifyAllLinks) a.href = unNestUrl(a.href);
	clA.href = a.href;
	setLinkTypeClass(clA);
	clA.setAttribute("onclick", "return false");
	var clImg = document.createElement("img");
	clImg.src = img.src;
	clA.appendChild(clImg);
	return clA;
}

function setLinkTypeClass(a) {
	if (a.host == document.location.host) {
		a.className = "int";
		a.title = unescape(a.pathname + a.search);
	}
	else {
		a.className = "ext";
		a.title = a.host;
	}
}

function reRenderBody() {
	for (i = document.body.attributes.length - 1; i >= 0; i--)
		document.body.removeAttribute(document.body.attributes[i].nodeName);

	var title = dotTrim(document.title, 50);
	xpathExec("/html/head", function(head) { head.innerHTML = ""; });
	setMainCSS();
	document.title = vars.pageType +" - "+ title;
	document.body.innerHTML = "<h1>"+ document.title +"</h1>";
	document.body.className = vars.pageType;

	if (vars.pageType == "Images") {
		document.body.innerHTML += "<div id='help'>Space: start/stop slideshow</div>";
		setImagesCSS();
		renderThumbs(vars.imageLinks);
		preloadFullImg(getNextSlide());
		document.addEventListener("keypress", imagesKeypress, false);
	}
	else if (vars.pageType == "Video's") {
		renderThumbs(vars.videoLinks);
	}
	else if (vars.pageType == "Gallery") {
		setGalleryCSS();
		renderGalleryOptions();
		renderThumbs(vars.galleryLinks);
	}
}

function renderThumbs(thumbsArr) {
	var div = document.getElementById("thumbs");
	if (div) document.body.removeChild(div);
	div = document.createElement("div");
	div.id = "thumbs";
	var ul = document.createElement("ul");
	var li;
	for (var i = 0, a; a = thumbsArr[i]; i++) {
		if (vars.linkFiltering && a.href.match(vars.filterRegExp)) continue;
		if (vars.scaleThumbs) scaleImg(a.firstChild, vars.scaleSize, vars.scaleSize);
		li = document.createElement("li");
		li.appendChild(a);
		ul.appendChild(li);
		if (vars.pageType == "Images") a.addEventListener("click", imagesThumbClick, false);
		else if (vars.pageType == "Video's") a.addEventListener("click", function(e) { document.location.href = e.currentTarget.href; }, false);
		else if (vars.pageType == "Gallery") a.addEventListener("click", galleryThumbClick, false);
	}
	div.appendChild(ul);
	document.body.appendChild(div);
}

function renderGalleryOptions() {
	var form = document.createElement("form");

	var fs = createFieldset("Gallery collection", "colFs");
	form.appendChild(fs);

	var colDiv = document.createElement("div");
	fs.appendChild(colDiv);
	colDiv.id = "colDiv";
	fillColList(colDiv);

	fs.appendChild(createButton("Delete selected", function(e) {
		if (confirm("Delete selected galleries?")) updateColList(colDiv);
	}, "d"));
	fs.appendChild(createButton("Add current", function(e) {
		addToColList(colDiv, document.location.href);
	}, "a"));
	fs.appendChild(createButton("Visit random", visitRandomCollected, "r"));

	fs = createFieldset("Settings", "setFs");
	form.appendChild(fs);

	fs.appendChild(createCheckBox("Scale thumbnails down to:", "scaleThumbs", function(){
		renderThumbs(vars.galleryLinks);
	}));
	fs.appendChild(createInput("", "scaleSize", scaleSizeChange, 3, "indent", "pixels"));
	fs.appendChild(document.createElement("hr"));

	fs.appendChild(createCheckBox("Hide visited galleries", "hideVisitedGalleries", function(){
		GM_addStyle("body.Gallery #thumbs a:visited { display: "+ (vars.hideVisitedGalleries ? "none" : "inline") +" }");
	}));
	fs.appendChild(document.createElement("hr"));

	fs.appendChild(createCheckBox("Try to use URL nested in link", "filterNestedUrls"));
	fs.appendChild(createCheckBox("Modify link on click", "modifyLinks", null, "indent"));
	fs.appendChild(createCheckBox("Modify <em>all</em> links on page load", "modifyAllLinks", null, "indent"));
	fs.appendChild(createButton("Modify all now", function(e) {
		xpathExec("//div[@id='thumbs']//a", function(a) {
		  a.href = unNestUrl(a.href);
		  setLinkTypeClass(a);
		});
	}, "m"));
	fs.appendChild(document.createElement("hr"));

	fs.appendChild(createCheckBox("Remove links matching expression:", "linkFiltering", function() {
		renderThumbs(vars.galleryLinks);
	}));
	fs.appendChild(createInput("", "filterExpression", function(e) {
		try {
			vars.filterRegExp = new RegExp(e.currentTarget.value, "i");
			GM_setValue("filterExpression", e.currentTarget.value);
			renderThumbs(vars.galleryLinks);
		}
		catch (ex) {
			alert("Invalid expression!");
		}
	}, null, "indent"));

	document.body.insertBefore(form, document.body.firstChild);

	setInterval(function(){ form.style.top = document.body.scrollTop +"px" }, 1000);
}

function createFieldset(label, id) {
	var fs = document.createElement("fieldset");
	fs.id = id;
	fs.innerHTML = "<legend>"+ label +"</legend>";
	return fs;
}

function createButton(label, clickFunc, accesskey) {
	var button = document.createElement("button");
	if (accesskey) {
		label = label.replace(new RegExp("("+accesskey+")", "i"), "<u>$1</u>");
		button.accesskey = accesskey;
	}
	button.innerHTML = label;
	button.type = "button";
	button.addEventListener("click", clickFunc, false);
	return button;
}

function createCheckBox(label, varsName, clickFunc, className) {
	var checkbox = document.createElement("label");
	checkbox.innerHTML = "<input type=checkbox>"+ label;
	checkbox.className = className;
	if (vars[varsName]) checkbox.firstChild.checked = "checked";
	checkbox.firstChild.addEventListener("click", function(e) {
		vars[varsName] = !vars[varsName];
		GM_setValue(varsName, vars[varsName]);
		if (vars[varsName]) e.currentTarget.checked = "checked";
		else e.currentTarget.removeAttribute("checked");
		if (clickFunc) clickFunc(e);
	}, false);
	return checkbox;
}

function createInput(label, varsName, changeFunc, size, className, dimension) {
	inputbox = document.createElement("label");
	if (size) size = "size="+ size;
	else size = "";
	if (!dimension) dimension = "";
	inputbox.innerHTML = label +"<input type=text "+ size +" value="+ vars[varsName] +">"+ dimension;
	inputbox.className = className;
	inputbox.firstChild.addEventListener("change", changeFunc, false);
	return inputbox;
}

function imagesThumbClick(e) {
	showFullImg(e.currentTarget);
}

function imagesKeypress(e) {
	if (e.keyCode == 0 && e.charCode == 32) toggleSlideShow();
}

function toggleSlideShow() {
	if (vars.slideShowTimeout != null) slideShowStop();
	else setSlide(getNextSlide(true));
}

function slideShowStop() {
	clearTimeout(vars.slideShowTimeout);
	if (vars.currentSlide > 0) vars.currentSlide--;
	vars.slideShowTimeout = null;
	preloadFullImg(getNextSlide());
}

function getNextSlide(updateCurrent) {
	var nextSlide = vars.currentSlide + 1;
	if (nextSlide > document.getElementById("thumbs").firstChild.childNodes.length)
		nextSlide = 1;
	if (updateCurrent) vars.currentSlide = nextSlide;
	return xpathExec("//div[@id='thumbs']//li["+ nextSlide +"]/a", function(a) { return a; });
}

function setSlide(a) {
	showFullImg(a);
	preloadFullImg(getNextSlide());
	vars.slideShowTimeout = setTimeout(setSlide, vars.slideShowInterval, getNextSlide(true));
}

function showFullImg(a) {
	var div = document.getElementById("thumbs");
	div.style.opacity = 0.3;
	forceUrlVisited(a.href);
	var fullImg = document.createElement("img");
	fullImg.id = "fullImg";
	fullImg.style.display = "none";
	fullImg.src = a.href;
	fullImg.addEventListener("click", function(){
		document.body.removeChild(fullImg);
		div.style.opacity = 1;
		slideShowStop();
	}, false);
	scaleImg(fullImg, document.body.parentNode.offsetWidth, document.body.parentNode.offsetHeight);
	displayFullImg(fullImg);
	xpathExec("//img[@id='fullImg']", function(img) { document.body.removeChild(img); });
	document.body.appendChild(fullImg);
}

function preloadFullImg(a) {
	xpathExec("//img[@id='preload']", function(img) { document.body.removeChild(img); });
	var fullImg = document.createElement("img");
	fullImg.id = "preload";
	fullImg.style.display = "none";
	fullImg.src = a.href;
	document.body.appendChild(fullImg);
}

function galleryThumbClick(e) {
	if (vars.filterNestedUrls) {
		if (vars.modifyLinks) {
			e.currentTarget.href = unNestUrl(e.currentTarget.href);
			setLinkTypeClass(e.currentTarget);
			GM_openInTab(e.currentTarget.href);
		}
		else GM_openInTab(unNestUrl(e.currentTarget.href));
	}
	else GM_openInTab(e.currentTarget.href);
}

function forceUrlVisited(url) {
	xpathExec("//iframe", function(iframe) { document.body.removeChild(iframe);	});
	var iframe = document.createElement("iframe");
	iframe.src = url;
	document.body.appendChild(iframe);
}

function scaleSizeChange(e) {
	vars.scaleSize = parseInt(e.currentTarget.value, 10);
	GM_setValue("scaleSize", vars.scaleSize);
	renderThumbs(vars.galleryLinks);
}

function scaleImg(img, toWidth, toHeight) {
	if (img.complete) {
		if (img.naturalWidth >= img.naturalHeight && (img.naturalHeight * (toWidth / img.naturalWidth)) <= toHeight) {
			img.style.height = (img.naturalHeight * (toWidth / img.naturalWidth)) +"px";
			img.style.width = toWidth + "px";
		}
		else {
			img.style.width = (img.naturalWidth * (toHeight / img.naturalHeight)) +"px";
			img.style.height = toHeight +"px";
		}
	}
	else {
		img.style.width = toWidth +"px";
		img.style.height = toHeight +"px";
		setTimeout(scaleImg, 100, img, toWidth, toHeight);
	}
}

function displayFullImg(img) {
	if (img.complete) {
		img.style.left = ((document.body.parentNode.offsetWidth - parseInt(img.style.width, 10)) / 2) + "px";
		img.style.top = ((document.body.parentNode.offsetHeight - parseInt(img.style.height, 10)) / 2) + "px";
		img.style.display = "block";
	}
	else setTimeout(displayFullImg, 100, img);
}

function fillColList(colDiv) {
	var arr = vars.collectedGalleries.replace(/^\||\|$/g, "").split("|");
	arr.sort();
	var newCol = "";
	for (var i = 0, url; url = arr[i]; i++) {
		if (url != "") {
			newCol += "<label><input type=checkbox value="+ url;
			if ("http://"+ url == document.location.href) {
				document.body.className += " known";
				newCol += " checked";
			}
			newCol += "> <a href=http://"+ url +">"+ url +"</a></label>";
		}
	}
	colDiv.innerHTML = newCol;
}

function updateColList(colDiv) {
	var arr = [];
	xpathExec("//div[@id='colDiv']/label/input", function(check) {
		if (!check.checked) arr.push(check.value);
	});
	if (arr.length > 0) vars.collectedGalleries = arr.join("|");
	else vars.collectedGalleries = "";
	GM_setValue("collectedGalleries", vars.collectedGalleries);
	document.body.className = document.body.className.replace(" known", "");
	fillColList(colDiv);
}

function addToColList(colDiv, url) {
	url = url.replace(/http:\/\//, "")
	if (vars.collectedGalleries.indexOf(url) == -1) {
		vars.collectedGalleries += "|"+ url;
		GM_setValue("collectedGalleries", vars.collectedGalleries);
		fillColList(colDiv);
	}
}

function visitRandomCollected() {
	var arr = vars.collectedGalleries.replace(/^\||\|$/g, "").split("|");
	if (arr.length > 1) {
		var url;
		do {
			url = arr[Math.ceil(arr.length * Math.random())];
		}
		while (url == document.location.href);
		document.location.href = "http://"+ url;
	}
}

function xpathExec(xpath, func) {
	var result = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < result.snapshotLength; i++) {
		if (result.snapshotLength == 1) return func(result.snapshotItem(i), arguments[2], arguments[3]);
		else func(result.snapshotItem(i), arguments[2], arguments[3]);
	}
}

function unNestUrl(url) {
	if (url.match(/^.+http/i)) {
 		url = url.replace(/^.+(http[^&\?]+).*/i, "$1");
	 	return unescape(url);
 	}
 	return url;
}

function isThumb(img) {
	return (
		img.width > vars.minImgSize && img.height > vars.minImgSize &&
		img.width / img.height < vars.bannerRatio &&
		img.height / img.width < vars.bannerRatio
	);
}

function dotTrim(str, len) {
	return str.substr(0, len) + ((str.length > len) ? "..." : "");
}

function setMainCSS() {
	GM_addStyle(
		"html, body { min-height: 100% } "+
	  "* { margin: 0; padding: 0; } "+
	  "body { padding: 3px 10px; } "+
	  "body, input, button { font-size: 11px; font-family: 'Verdana' } "+
	  "h1 { font-size: 15px; }"+
 	  "form { padding: 10px; background: #fee; }"+
	  "img { border-width: 2px; } "+
		"a { color: #00e; } a:visited { color: #551a8b; } a:active { #e00; }"+
	  "a:visited img { opacity: 0.4; }"+
	  ".Gallery a.int img { border-color: #900; }"+
	  ".Gallery a.ext img { border-color: #090; }"+
	  "#thumbs li { margin: 0 2px 2px 0; display: inline; list-style-type: none; } "
	);
}

function setImagesCSS() {
	GM_addStyle(
		"body { background: #000; color: #444; }"+
	  "#fullImg { position: absolute; top: 0; left: 0; border: 0; background: #333; cursor: pointer; }"+
	  "#help { position: absolute; right: 5px; bottom: 5px; }"+
	  "iframe { position: absolute; top: -99px; left: 0; width: 1px; height: 1px; }"
	);
}

function setGalleryCSS() {
	GM_addStyle(
		"body { background: #ddd; }"+
	  "body.known { background: #ffb; }"+
	  "form { top: 0; left: -718px; position: absolute; border: #f00 solid; border-width: 2px 10px 2px 2px; z-index: 2 }"+
	  "form:hover, form:focus { left: 0; }"+
	  "fieldset { height: 200px; -moz-border-radius: 8px; border: 1px solid #aaa; padding: 10px; }"+
		"legend { padding: 0 4px; }"+
	  "label { display: block; cursor: pointer; line-height: 18px; }"+
	  "button { margin: 2px 2px 0 0; }"+
	  ".indent { margin-left: 17px; }"+
	  ".indent.double { margin-left: 34px; }"+
	  "input[type='checkbox'] { width: 12px; height: 12px; margin: 0 3px 0 0; }"+
	  "input[type='text'] { width: 100%; margin: 0 3px 0 0; padding: 1px; border: 1px solid #aaa; }"+
	  "input[type='text'][size] { width: auto; }"+
	  "fieldset hr { height: 6px; display: block; border: 0; margin: 0; }"+
	  "#colFs { width: 400px; margin-right: 10px; float: left; }"+
	  "#setFs { width: 240px; float: left; }"+
	  "#colDiv { height: 154px; white-space: nowrap; overflow: auto; border: 1px solid #aaa; padding: 2px 4px; background: #fff; }"
	);
}

init();

GM_registerMenuCommand("Visit random collected thumb gallery", visitRandomCollected);
