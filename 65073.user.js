// ==UserScript==
// @name				Media Tree
// @namespace		http://www.simplesolutionweb.com
// @description	Builds a tree containing the media in a page
// @version			0.1.5
// @include			*
// @exclude			http://www.google.com*
// @exclude			http://images.google.*/imgres*
// @exclude			http://images.google.*/imghp*
// @exclude			http://*myspace.com*
// @exclude			http://*facebook.com*
// @exclude			http://*experienceproject.com*
// @exclude			http://*rapidshare.com*
// @exclude			https://*
// @exclude			http://*/mediaTree/*
// ==/UserScript==

// Media Tree
// Copyright (c) 2009-2010, Josh Merritt
// Released under the Creative Commons: Attribution, Share Alike, and Noncommercial
// http://creativecommons.org

// Features
// - Shows all images contained in a page as thumbnails, click thumbnails to show full image
// - Attempts to find images that are not directly linked to, but are part of another page
// - Works with Google Images
// - Allows adding of images to collections for later viewing

// Changes

// 0.1.1 2009-11-28
// - Added features list and TODO list

// 0.1.2 2009-11-29
// - Change "SHOW MEDIA TREE BROWSER" button to an image button
// - Allow moving of the media tree button
// - The first time you run the tool make a pop up message that points to the media tree button telling users how to start the tool

// 0.1.3 2010-01-01
// - Do not load tree data on google images
// - Consistent button style
// - You should be able to click an image before all images are loaded
// - Limit the number of text links followed to 5 (this was causing the thumbnails to take to long to load.

// 0.1.4 2010-01-10
// - Show "folders", a preview view of links with more than one image
// - if an image doesn't load after 5 seconds, display instead a link to that image (or perhaps show the page in an iframe)

// 0.1.5 2010-01-11
// - Fixed: Sometimes large images (that are clickable links) are not showing
// - Navigation (Find links that link to "Next" or "Previous" and show them as navigation)

// 0.1.6 2010-03-03
// - Decreased "firstRunText" display time to 1 second

// TODO
// - Ability to pull images from js code
// - Hide "Get Greasemonkey Script" (on the mediaTree page)
// - Show video / swf thumbnails too
// - Do not show media tree in small iFrame

window.setTimeout(function() {

//var downloaderURL = "http://localhost/Simple%20Solution/mediaTree/"; //DEV
var downloaderURL = "http://www.simplesolutionweb.com/mediaTree/";


var downloaderURLBase = downloaderURL;
var setting = Object();
setting.firstRun = GM_getValue("firstRun", 0);
setting.minSizeW = GM_getValue("minSizeW", 300);
setting.minSizeH = GM_getValue("minSizeH", 300);
var minSize = setting.minSizeW * setting.minSizeH;
var minImages = 5;
setting.maxSubFolders = GM_getValue("maxSubFolders", 20);
setting.maxResults = GM_getValue("maxResults", 500);
setting.maxTextLinks = 10;

setting.display = GM_getValue("display", 0);


subfolders = 0;

var noSubfolders = ["images.google.com"];

for (var i = 0; i < noSubfolders.length; i ++) {
	if (window.location.href.substr(7, noSubfolders[i].length) == noSubfolders[i]) {
		setting.maxSubFolders = 0;
	}
}

var inIframe = (document.body.clientWidth * document.body.clientWidth) < 150000;

var baseURL = getBaseURL(window.location.href);

downloaderURL += "?base=" + escape(baseURL);


if (!inIframe) { 

var tagTypes = ["a", "img", "embed"];

var media = Array();

var thisPageTitle = document.getElementsByTagName("title");
thisPageTitle = thisPageTitle[0] ? thisPageTitle[0].innerHTML : "";
var thisPageURL = window.location.href;

media = getPageMedia(document);

var checkLinks = Array();
var downloadable = Array();

var settingsDiv = document.createElement('div');
setStyleAttributes(settingsDiv, "display:none;z-index:100002;background-color:#DDDDDD;border:1px solid #CCCCCC;padding:16px;overflow:auto;position:absolute;top:64px;color:#000000;");

var settingsNames = ["minSizeW", "minSizeH", "maxSubFolders", "maxResults"];
var settingsTypes = ["number", "number", "number", "number"];
var settingsLabels = ["Minimum Image Size: ", " x ", " &nbsp;&nbsp;&nbsp; Max Subfolders:", " &nbsp;&nbsp;&nbsp; Maximum Image Results:"];

for (var i = 0; i < settingsNames.length; i ++) {

	var tmp = document.createElement('div');
	setStyleAttributes(tmp, "float:left;")
	tmp.innerHTML = settingsLabels[i];
	settingsDiv.appendChild(tmp);

	var tmp = document.createElement('input');
	setStyleAttributes(tmp, "float:left;");
	tmp.type = "text";
	tmp.id = "MT_set_" + settingsNames[i];
	tmp.size = 4;
	tmp.value = setting[settingsNames[i]];
	settingsDiv.appendChild(tmp);
}

var tmp = document.createElement('input');
setStyleAttributes(tmp, "float:left;margin-left:16px;");
tmp.type = "button";
tmp.value = "UPDATE SETTINGS";
tmp.addEventListener('click', function() {
	for (var i = 0; i < settingsNames.length; i ++) {
		switch (settingsTypes[i]) {
			case "number":
			GM_setValue(settingsNames[i], setting[settingsNames[i]] = Number(document.getElementById("MT_set_" + settingsNames[i]).value));
			break;
			default:
			GM_setValue(settingsNames[i], setting[settingsNames[i]] = document.getElementById("MT_set_" + settingsNames[i]).value);
			break;
		}
	}
	hideSettingsEdit();
}, true);
settingsDiv.appendChild(tmp);

var tmp = document.createElement('input');
setStyleAttributes(tmp, "float:left;margin-left:16px;");
tmp.type = "button";
tmp.value = "CLOSE SETTINGS";
tmp.addEventListener('click', function() {
	hideSettingsEdit();
}, true);
settingsDiv.appendChild(tmp);

document.body.appendChild(settingsDiv);



var tmp = document.createElement('div');
var showButStart = 0;

setStyleAttributes(tmp, "width:149px;height:32px;z-index:100000;position:absolute;top:0px;");
tmp.id = "showBut";
tmp.style.background = "url('" + downloaderURLBase + "images/show-but.gif')";

var tmp2 = document.createElement('div');
setStyleAttributes(tmp2, "cursor:move;width:34px;height:32px;z-index:100000;float:left;");
tmp2.title = "MOVE THIS BUTTON";
tmp2.addEventListener('mousedown', function(e) { MoveButton(1, e); } , true);
tmp2.addEventListener('mouseup', function() { MoveButton(0); } , true);
tmp.appendChild(tmp2);

var mouseX = 0;
var mouseY = 0;

document.body.addEventListener('mousemove', function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;

	if (showButStart) {
		document.getElementById('showBut').style.left = (mouseX - showButStart) + "px";
	}
} , true);

function MoveButton(v, e) {
	if (v) {
		e.cancelBubble = true;
		e.preventDefault();
		var pos = getDPos(document.getElementById('showBut'));
		showButStart = mouseX - pos[0];
	} else {
		showButStart = 0;
	}
}

var tmp2 = document.createElement('div');
setStyleAttributes(tmp2, "cursor:pointer;width:115px;height:32px;z-index:100000;float:left;");
tmp2.title = "SHOW MEDIA TREE BROWSER";
tmp2.addEventListener('click', function() { MTStatus(1); } , true);
tmp.appendChild(tmp2);

document.body.appendChild(tmp);

if (setting.firstRun == 0) {
	var firstRunText = document.createElement('img');
	firstRunText.id = 'firstRunText';
	var pos = getDPos(tmp);
	setStyleAttributes(firstRunText, "z-index:100000;position:absolute;top:32px;left:" + (pos[0] + 68) + "px;");
	firstRunText.src = downloaderURLBase + "images/new.png";
	document.body.appendChild(firstRunText);
	setInterval("document.getElementById('firstRunText').style.visibility='hidden';", 1000);
	GM_getValue("firstRun", 1);
}

var loadTreeData = (baseURL.indexOf("google.com") == -1);

var mainDiv = document.createElement('div');

setStyleAttributes(mainDiv, "display:none;z-index:100000;background-color:#DDDDDD;border:1px solid #CCCCCC;padding:16px;overflow:auto;position:absolute;top:32px;color:#000000;");

var tmp = document.createElement('div');
setStyleAttributes(tmp, "width:820px;height:1px;");
mainDiv.appendChild(tmp);

var tmp = document.createElement('div');
setStyleAttributes(tmp, "position:absolute;top:8px;right:16px;cursor:pointer;");
tmp.innerHTML = "<img src=\"" + downloaderURLBase + "images/logo-small.png\" />";
tmp.addEventListener('click', function() { window.location.href = downloaderURL; } , true);
mainDiv.appendChild(tmp);

if (loadTreeData) {
	var progressDiv = document.createElement('div');

	setStyleAttributes(progressDiv, "display:none;clear:both;background-color:#CCCCCC;border:1px solid #999999;width:600px;height:20px");

	var progressDivInner = document.createElement('div');
	setStyleAttributes(progressDivInner, "background-color:#0000FF;border:1px solid #0000CC;width:0%;height:18px;overflow:hidden;");
	progressDiv.appendChild(progressDivInner);

	var progressDivText = document.createElement('div');
	setStyleAttributes(progressDivText, "position:relative;bottom:18px;width:100%;height:18px;overflow:hidden;text-align:center;color:#FFFFFF;font-weight:bold;");
	progressDiv.appendChild(progressDivText);

	mainDiv.appendChild(progressDiv);
}

var mediaTreeForm = document.createElement('form');
mediaTreeForm.action = downloaderURL;
mediaTreeForm.method = "post";
mediaTreeForm.target = "_blank";

var headerInfo = document.createElement('div');
setStyleAttributes(headerInfo, "vertical-align:top;text-align:left;clear:both;padding:8px;margin-bottom:24px;width:100%;");

var buttonStyle = "color:#000000;font-size:12px;font-weight:normal;text-decoration:none;border:1px solid #666666;background-image:url('" + downloaderURLBase + "images/but-bg.gif');";

var mediaTreeClose = document.createElement('input');
mediaTreeClose.addEventListener('click', function() { MTStatus(0); }, true);
setStyleAttributes(mediaTreeClose, "clear:both;margin-left:16px;" + buttonStyle);
mediaTreeClose.value = "X";
mediaTreeClose.type = "button";
headerInfo.appendChild(mediaTreeClose);

var tmp = document.createElement('input');

tmp.type = "hidden";
tmp.name = "page_title";
tmp.value = escape(thisPageTitle);
headerInfo.appendChild(tmp);

tmp.type = "hidden";
tmp.name = "page_url";
tmp.value = escape(thisPageURL);
headerInfo.appendChild(tmp);

var tmp = document.createElement('input');
setStyleAttributes(tmp, "margin-left:16px;" + buttonStyle);
tmp.type = "button";
tmp.value = "CHECK ALL";
tmp.addEventListener('click', function() { checkAll(1); } , true);
headerInfo.appendChild(tmp);

var tmp = document.createElement('input');
setStyleAttributes(tmp, "margin-left:16px;" + buttonStyle);
tmp.type = "button";
tmp.value = "UNCHECK ALL";
tmp.addEventListener('click', function() { checkAll(0); } , true);
headerInfo.appendChild(tmp);

var tmp = document.createElement('input');
setStyleAttributes(tmp, "margin-left:16px;" + buttonStyle);
tmp.type = "submit";
tmp.name = "collect_checked";
tmp.value = "ADD CHECKED TO COLLECTION";
headerInfo.appendChild(tmp);

/*var tmp = document.createElement('input');
setStyleAttributes(tmp, "margin-left:16px;" + buttonStyle));
tmp.type = "submit";
tmp.name = "download_checked";
tmp.value = "DOWNLOAD CHECKED (.zip)";
headerInfo.appendChild(tmp);*/

var tmp = document.createElement('input');
setStyleAttributes(tmp, "margin-left:16px;" + buttonStyle);
tmp.type = "button";
tmp.value = "SETTINGS...";
tmp.addEventListener('click', function() { showSettingsEdit(this); } , true);
headerInfo.appendChild(tmp);

var downloadFiles = document.createElement('input');
downloadFiles.type = "hidden";
downloadFiles.name = "f";
downloadFiles.value = "";
headerInfo.appendChild(downloadFiles);

var downloadInfo = document.createElement('div');
headerInfo.appendChild(downloadInfo);

mediaTreeForm.appendChild(headerInfo);

mainDiv.appendChild(mediaTreeForm);

var navBar = document.createElement('div');
setStyleAttributes(navBar, "clear:both;text-align:center;");
mainDiv.appendChild(navBar);

var textLinks = 0;

var navLinks = Array();

for (var i = 0; i < media.length; i++) {
	if (media[i]) {
		media[i].num = i;

		if (media[i].label && media[i].label.toLowerCase().indexOf("first") != -1) {
			addNavLink("&lt;&lt; FIRST",media[i].url);
		}

		if (media[i].label && media[i].label.toLowerCase().indexOf("prev") != -1) {
			addNavLink("&lt; PREVIOUS",media[i].url);
		}

		if (media[i].label && media[i].label.toLowerCase().indexOf("next") != -1) {
			addNavLink("NEXT &gt;",media[i].url);
		}

		if (media[i].label && media[i].label.toLowerCase().indexOf("last") != -1) {
			addNavLink("LAST &gt;&gt;",media[i].url);
		}

		if (media[i].type == "link") {
			if (media[i].thumb) {
				checkLinks[checkLinks.length] = media[i];
			} else {
				textLinks ++;
				if (textLinks < setting.maxTextLinks) { checkLinks[checkLinks.length] = media[i]; }
			}
		}
		if (media[i].type == "image") {
			downloadable[downloadable.length] = media[i].url + "|" + media[i].thumb;
			addMediaThumb(media[i]);
		}
	}
}

if (media.length) {	
	mainDiv.style.display = setting.display ? "block" : "none";

	for (var i = 0; i < navLinks.length; i ++) {
		var tmp = document.createElement('a');

		tmp.innerHTML = navLinks[i].label;
		tmp.href = navLinks[i].url;
		tmp.style.padding = "0px 12px 0px 12px";
		navBar.appendChild(tmp);
	}

	var startTS = Math.round(new Date().getTime() / 1000);

	document.body.appendChild(mainDiv);

	var previewDiv = document.createElement('div');

	previewDiv.addEventListener('click', function() { hidePreview(); } , true);
	setStyleAttributes(previewDiv, "display:none;z-index:100001;background-color:#DDDDDD;border:1px solid #CCCCCC;padding:16px;overflow:auto;position:absolute;top:64px");

	var previewImage = document.createElement('img');
	previewImage.id = "previewImage";

	previewDiv.appendChild(previewImage);

	var previewImageLoading = document.createElement('div');
	previewImageLoading.id = "previewImageLoading";
	setStyleAttributes(previewImageLoading, "text-align:center;display:none;background-color:#FFFFFF;border:1px solid #CCCCCC;padding:24px;");
	previewImageLoading.innerHTML = "<img src=\"" + downloaderURLBase +"images/loading.gif\" /><br />Loading...";
	previewDiv.appendChild(previewImageLoading);

	var tmp = document.createElement('div');
	setStyleAttributes(tmp, "text-align:center;color:#000000;");
	tmp.innerHTML = "CLOSE";

	previewDiv.appendChild(tmp);

	previewImage.addEventListener('load',  function (e) {
		previewImage.style.display = "block";
		previewImageLoading.style.display = "none";
		previewDiv.style.left = Math.round((document.body.clientWidth / 2) - (previewDiv.offsetWidth / 2)) + "px";
	}, true);

	document.body.appendChild(previewDiv);

	var numCheckLinks = checkLinks.length;
	var parser = new DOMParser();

	var xhr = null;
	var loadingData = 0;
	var checkLinksTimer = null;
	var thisMedia = null;
	
	if (setting.display && loadTreeData) {
		updateProgressBar("Loading Tree Data", 1 - (checkLinks.length / numCheckLinks));
		checkExtLinks();
	} else {
		renderThumbs();
	}
}

}// END if (!inIframe) { 

function checkExtLinks() {
	if (!checkLinks.length) { return; }
	checkLinksTimer = setInterval(function() {
	if (checkLinks.length) {
		//if (Math.round(new Date().getTime() / 1000) < startTS + 2) { loadingData = false; }
		if (loadingData == 2) {
			loadingData = 0;
		} else if (!loadingData) {
			loadingData = 1; startTS = Math.round(new Date().getTime() / 1000);
			thisLink = checkLinks.shift();
			if (media[thisLink.num]) {
				updateProgressBar("Loading Tree Data", 1 - (checkLinks.length / numCheckLinks));

				GM_xmlhttpRequest({
					m:thisLink,
					method: 'GET',
					url: thisLink.url,
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml,text/html',
					},
					onload: function(responseDetails) {
					
						if (responseDetails.status == 200) {
							
							if (this.m.type != "null") {

								var tD = document.createElement('div');
								tD.innerHTML = responseDetails.responseText;

								if (tD) {
									var titleTag = tD.getElementsByTagName("title");
									titleTag = titleTag[0] ? titleTag[0].innerHTML : false;
					
									//GM_log(getBaseURL(this.m.url));

									var tmp = new Array();
									tmp = getMedia(tmp, tD.getElementsByTagName("*"), true, false, getBaseURL(this.m.url)); 

									delete tD;

									var numImages = 0;
									var numImagesOrThumbs = 0;
									var imageID = 0;
									var dbg = "";
									for (var i = 0; i < tmp.length; i++) {
										if (((tmp[i].w && (tmp[i].w * tmp[i].h > minSize)) && tmp[i].type == "image")) {
											numImages ++;
											imageID = i; 
										}
										numImagesOrThumbs += (tmp[i].type == "image" && (tmp[i].w * tmp[i].h < minSize)) ? 1 : 0;
									}
									//GM_log(this.m.url + "  numImages = " + numImages + "  tmp[imageID].url = " + tmp[imageID].url);
									if (numImages == 1 && tmp[imageID].url) {
										if (mediaURLDoesNotExist(tmp[imageID].url)) {
											updateProgressBar("Image Found - " + tmp[imageID].url, 1 - (checkLinks.length / numCheckLinks), true);
											this.m.url = tmp[imageID].url;
											this.m.type = "image";
											this.m.img_link = this.m.url;

											if (!document.getElementById("mediaTree" + this.m.num)) {
												addMediaThumb(this.m);
											}

											downloadable[downloadable.length] = tmp[imageID].url + "|" + this.m.thumb;
											document.getElementById("MT_dl" + this.m.num).value = escape(tmp[imageID].url);
										}
							
									} else if (numImagesOrThumbs > 1) {
										//GM_log("SUBFOLDER   numImages:" + numImages + "   numImagesOrThumbs:" + numImagesOrThumbs + "  " + dbg);
										this.m.type = "subfolder";
										this.m.childData = tmp;
										if (!document.getElementById("mediaTree" + this.m.num)) {
											addMediaThumb(this.m);
										}
										var d = document.getElementById("mediaTree" + this.m.num);
										removeChildNodes(d);
										var num2 = 0;
										var imageFound = false;
										for (var i = 0; i < tmp.length; i ++) {
											if (tmp[i].type == "image" && ((tmp[i].w && (tmp[i].w * tmp[i].h < minSize)) || !tmp[i].w)) {

												imageFound = true;

												var dD = document.createElement('div');
												setStyleAttributes(dD, "font-size:70%;width:65px;height:52px;margin:2px;background-color:#EEEEEE;text-align:center;float:left");

												var iD = document.createElement('img');		

												iD.src = tmp[i].thumb ? tmp[i].thumb : tmp[i].url;

												setStyleAttributes(iD, "max-width:63px;max-height:50px;padding:0px;border:none;");
												dD.appendChild(iD);

												d.appendChild(dD);

												num2 ++;

												if (num2 == 9) break;
											}
										}
										
										if (imageFound && subfolders < setting.maxSubFolders) { //Images found in subfolder
											if (titleTag) {
												var dD = document.createElement('div');
												setStyleAttributes(dD, "clear:left;text-align:center;font-size:13px;font-weight:bold;width:200px;color:#999999");
												dD.innerHTML = titleTag;
												d.appendChild(dD);
											}

											var dD = document.createElement('div');
											setStyleAttributes(dD, "clear:left;text-align:center;font-size:11px;word-wrap:break-word;width:200px;color:#0000FF;text-decoration:underline;");
											dD.innerHTML = this.m.url;
											d.appendChild(dD);

											d.style.cursor = "pointer";
											d.addEventListener('click',  function (e) {
												window.location.href = media[Number(this.id.substr(9))].url;
											}, true);
											subfolders ++;
										} else {
											removeMedia(this.m.num);
										}	
									}
								}
							}
						
						} else { //Didn't load properly
							removeMedia(this.m.num);
						}
						loadingData = 2;
					}
				});
			}
		}	
	
	} else {
		clearInterval(checkLinksTimer);
		hideProgressBar();
		renderThumbs();			
	}
}, 250);
}

function updateProgressBar(text, v, ifNotHidden) {
	if (ifNotHidden && progressDiv.style.display == "none") return;
	if (text) { progressDivText.innerHTML = text; }
	progressDivInner.style.width = Math.round(v * 100) + "%";
	progressDiv.style.display = "block";
}

function hideProgressBar() {
	progressDiv.style.display = "none";
}

function renderThumbs() {
	for (var i = 0; i < media.length; i++) {
		if (media[i]) {
			if ((media[i].type == "image" || media[i].thumb) && document.getElementById("mediaTree" + i)) {
				var d = document.getElementById("mediaTree" + i);
				var imgD = document.getElementById("mediaTreeIMG" + i);
				if (media[i].url) {
					if (media[i].type == "subfolder") {
						d.style.cursor = "pointer";
						d.addEventListener('click',  function (e) {
							window.location.href = media[Number(this.id.substr(9))].url;
						}, true);

						/*var tmp = document.createElement('img');
						tmp.src = "";
						tmp.style.position = "relative";
						tmp.style.right = "16px";
						tmp.style.bottom = "16px";

						d.appendChild(tmp);*/

					} else if (media[i].type == "image") {	
						imgD.style.cursor = "pointer";
						imgD.addEventListener('click',  function (e) {
								showPreview(media[Number(this.id.substr(12))].url);
						}, true); 				
					}
				}
			}
		}
	}

	if (downloadable.length ) {
		updateDownloadDiv();


		GM_xmlhttpRequest({
			method:'POST',
			url: downloaderURL + "&no_zip=1",
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: 'f='+ escape(downloadable.join(",")) + "&page_url=" + escape(thisPageURL) + "&page_title=" + escape(thisPageTitle),
			onload: function(responseDetails) {
				//alert(responseDetails.responseText);
			}
		});
	}
}

function addMediaThumb(m) {
	var i = m.num;

	var nD = document.createElement('div');
	setStyleAttributes(nD, "width:216px;height:216px;background-color:#FFFFFF;border:1px solid #CCCCCC;text-align:center;padding:4px;margin:4px;float:left;overflow:hidden;");

	nD.id = "mediaTree" + i;

	if (m.type == "image") {
		var iD = document.createElement('img');

		iD.id = "mediaTreeIMG" + i;

		iD.src = m.thumb ? m.thumb : getThumb(m.url);

		addLoadingBox(i, nD, "image");

		iD.addEventListener('error',  function (e) {
			removeLoadingBox(Number(this.id.substr(12)));
			removeMedia(Number(this.id.substr(12)));
		}, true);

		iD.addEventListener('load',  function (e) {
			removeLoadingBox(Number(this.id.substr(12)));
			var m = media[Number(this.id.substr(12))];
			if (!m.thumb) {		
				checkMedia(Number(this.id.substr(12)));
			}
			if (document.getElementById("mediaTree" + Number(this.id.substr(12)))) {
				var d = document.getElementById("mediaTree" + Number(this.id.substr(12)));
				var dD = document.createElement('div');
				setStyleAttributes(dD, "font-size:11px;width:200px;color:#000000");
				dD.innerHTML = (m.img_link ? "<a href=\"" + m.img_link + "\">" + m.img_link.substr(0,60) + "</a>" : "") + (m.text ? "<br />" + m.text : "");
				d.appendChild(dD);
			}
		}, true);				

		iD.style.cursor = "pointer";
		iD.addEventListener('click',  function (e) {
				showPreview(media[Number(this.id.substr(12))].url);
		}, true); 

		setStyleAttributes(iD, "max-width:200px;max-height:180px;padding:0px;border:none;");

		nD.appendChild(iD);

		var tmp = document.createElement('br');
		nD.appendChild(tmp);

		var tmp = document.createElement('input');
		tmp.type = "checkbox";
		tmp.style.clear = "both";
		tmp.id = tmp.name = "MT_dl" + i;
		tmp.value = escape(m.url);
		nD.appendChild(tmp);

	} else {
		addLoadingBox(i, nD, "folder");
	}
	//var tmp = document.createTextNode('');
	//nD.appendChild(tmp);

	mediaTreeForm.appendChild(nD);
};

function getThumb(url) { //TODO: Create a thumbnailed version
	return url;	
};

function addLoadingBox(num,  container, type) {
	var nD = document.createElement('div');
	nD.id = "MT_loadBox" + num;
	setStyleAttributes(nD, "position:absolute;text-align:center;width:200px;height:200px;padding:8px;overflow:hidden;background-color:#FFFFFF;opacity:0.5;");
	nD.innerHTML = "<img src=\"" + downloaderURLBase +"images/loading.gif\" style=\"padding-top:50px;\"/><br />Loading " + type + "...";
	
	container.appendChild(nD);
};

function removeLoadingBox(num) {
	document.getElementById('mediaTree' + num).removeChild(document.getElementById("MT_loadBox" + num));
};

function checkMedia(num) {
	if (!media[num] || media[num].type == "link") return;
	var dIMG = document.getElementById('mediaTreeIMG' + num);
	var size = dIMG.naturalWidth * dIMG.naturalHeight;
	if (dIMG.naturalWidth && size <= minSize) {
		removeMedia(num);
	}
};

function removeMedia(num) {
	if (!media[num]) { return }
	if (document.getElementById('mediaTree' + num)) { mediaTreeForm.removeChild(document.getElementById('mediaTree' + num)); }

	for (var j = 0; j < downloadable.length; j++) {
		var n = downloadable[j].split("|").shift();
		if (media[num].url == n) {
			downloadable.splice(j, 1); break;
		}
	}
	media[num].type = "null";

	updateDownloadDiv();
}

var previewTimeout = null;
function showPreview(url) {
	previewImageLoading.innerHTML = "<img src=\"" + downloaderURLBase +"images/loading.gif\" /><br />Loading...";
	previewDiv.style.display = "block";
	previewDiv.style.top = Math.max(document.documentElement.scrollTop, document.body.scrollTop) + "px";
	previewImage.style.display = "none";
	previewImageLoading.style.display = "block";
	previewImage.src = url;
	if (previewTimeout) { clearTimeout(previewTimeout); previewTimeout = null; }
	previewTimeout = setTimeout("document.getElementById('previewImageLoading').innerHTML = 'Image could not be loaded.<br /><a href=\"" + previewImage.src + "\" target=\"_blank\">" + previewImage.src + "</a>'", 5000);
}

function previewTimeout() {
	;
}

function hidePreview(url) {
	previewDiv.style.display = "none";
}

function getPageMedia(d, noSubLevel) {
	var media = new Array();
	if (noSubLevel) {
		media = getMedia(media, d.getElementsByTagName("*"), noSubLevel);
	} else {
		for (var i = 0; i < tagTypes.length; i++) {
			media = getMedia(media, d.getElementsByTagName(tagTypes[i]), noSubLevel);
		}
	}
	return media;
}

function getMedia(media, elements, noSubLevel, allSizes, useBaseURL) {
	var url = "";
	for (var i = 0; i < elements.length; i ++) {

		var d = elements[i];

		if (d.src && (m = parseMediaUrl(d, d.src, noSubLevel, false, false, useBaseURL))) {
			if (d.style.width) { m.w = pxToNum(d.style.width); }
			if (d.width) { m.w = Number(d.width); }
			if (d.style.height) { m.h = pxToNum(d.style.height); }
			if (d.height) { m.h = Number(d.height); }
			if (m.w && !m.h) m.h = m.w;
			if (m.h && !m.w) m.w = m.h;

			if ((!(m.w && (m.w * m.h < minSize)) || (allSizes && m.w)) && mediaDoesNotExist(m, media, noSubLevel)) { media[media.length] = m; }
		}
	
		if (d.href && (m = parseMediaUrl(d, d.href, noSubLevel, noSubLevel ? i : false, noSubLevel ? elements : false, useBaseURL))) {
			if (mediaDoesNotExist(m, media, noSubLevel)) { media[media.length] = m; }
		}
		if (media.length > setting.maxResults) {
			return media;
		}

	}
	return media;
}


function parseMediaUrl(d, url, noSubLevel, thisElement, elements, useBaseURL) {
	m = parseMediaUrlInner(d, url, noSubLevel, thisElement, elements, useBaseURL);
	var p = -1;
	if (m && !noSubLevel && m.url.substr(0, 24) == "http://images.google.com" && (p = m.url.indexOf("imgurl=")) != -1) {
		var orig_url = m.img_link = m.url;
		m.url = m.url.substr(p + 7);
		if ((p = m.url.indexOf("&")) != -1) {
			m.url = m.url.substr(0, p);
		}

		p = orig_url.indexOf("imgrefurl=")
		m.img_link = m.img_link.substr(p + 10);
		if ((p = m.img_link.indexOf("&")) != -1) {
			m.img_link = m.img_link.substr(0, p);
		}

		m.type = "image";
	}
	return m;
}

function parseMediaUrlInner(d, url, noSizeCheck, thisElement, elements, useBaseURL) {
	var ext = url.split(".").pop().toLowerCase();

	if (d.tagName == "A" && (elements || d.childNodes)) {
		var rv = new Object();
		rv.url = addBaseToUrl(url, useBaseURL);
		rv.label = d.title ? d.title : d.innerHTML;
		rv.type = "link";


		if (elements) {
			for (var i = thisElement + 1; i < elements.length; i ++) {
				if (elements[i].tagName == "A") break;
				if (elements[i].tagName == "IMG") {
					var thisExt = elements[i].src.split(".").pop().toLowerCase();
					rv.thumb = addBaseToUrl(elements[i].src, useBaseURL);
					if ((ext == "jpg" || ext == "jpeg") && (thisExt == "jpg" || thisExt == "jpeg" || thisExt == "gif" || thisExt == "png" || thisExt == "svg")) {				
						rv.type = "image";
						return rv;
					}
				}
			}
		} else {
			for (var i = 0; i < d.childNodes.length; i ++) {
				if (d.childNodes[i].tagName == "IMG") {
					var thisExt = d.childNodes[i].src.split(".").pop().toLowerCase();
					rv.thumb = addBaseToUrl(d.childNodes[i].src, useBaseURL);
					if ((ext == "jpg" || ext == "jpeg") && (thisExt == "jpg" || thisExt == "jpeg" || thisExt == "gif" || thisExt == "png" || thisExt == "svg")) {	
						rv.type = "image";
						return rv;
					}
					break;
				}
			}
		}
		return rv;
	}

	if (ext == "jpg" || ext == "jpeg" || ext == "gif" || ext == "png" || ext == "svg") { //Image
		var size = d.naturalWidth * d.naturalHeight;
		if (noSizeCheck || size > minSize || !d.offsetWidth) {
			var rv = new Object();
			rv.url = addBaseToUrl(url, useBaseURL);
			rv.type = "image";
			return rv;
		}
	}
	return false;
};

function mediaDoesNotExist(m, newMedia, noSubLevel) {
	if (newMedia) {
		for (var i = 0; i < newMedia.length; i++) {
			if (newMedia[i]) {
				if (newMedia[i].url == m.url || (newMedia[i].thumb && newMedia[i].thumb == m.thumb)) return false;
			}
		}
	}
	if (noSubLevel) return true;
	for (var i = 0; i < media.length; i++) {
		if (media[i]) {
			if (media[i].url == m.url || (media[i].thumb && media[i].thumb == m.thumb)) return false;
		}
	}
	return true;
};

function mediaURLDoesNotExist(url) {
	for (var i = 0; i < media.length; i++) {
		if (media[i]) {
			if (media[i].url == url) return false;
		}
	}
	return true;
};

function checkAll(v) {
	for (var i = 0; i < media.length; i++) {
		if (document.getElementById("MT_dl" + i)) {
			document.getElementById("MT_dl" + i).checked = v ? true : false;
		}
	}
};

function updateDownloadDiv() {
	downloadInfo.innerHTML = downloadable.length + " downloadable images on this page.";
	downloadFiles.value = escape(downloadable.join(","));
};

function addBaseToUrl(url, useBaseURL) {
	if (useBaseURL && url.substr(baseURL.length) == baseURL) { url = url.substr(baseURL.length); }

	if (!useBaseURL) { var useBaseURL = baseURL; }
	if (url.substr(0, 7) == "http://") { return url; }

	var e = url.split("/");

	if (e[0] == "") { e.shift(); var b = useBaseURL.split("/"); return "http://" + b[2] + "/" + parseDotDot(e.join("/")); }

	return useBaseURL + parseDotDot(url);
};

function parseDotDot(path) {
	path = path.split("/");

	var keepGoing = true;
	while (keepGoing) {
		keepGoing = false;
		for (var i = 0; i < path.length; i ++) {
			if (path[i] == ".") {
				path.splice(i, 1);
				keepGoing = true;
				break;
			}
			if (path[i] == "..") {
				path.splice(i - 1, 2);
				keepGoing = true;
				break;
			}
		}
	}
	return path.join("/");
};

function getBaseURL(url) {
	url = url.split("?").shift();

	var e = url.split("/");
	
	//is the last element a page name?
	if (e[e.length - 1].indexOf(".") != -1 || e[e.length - 1] == "") {
		e.pop();		
	}
	return e.join("/") + "/";
}

function showSettingsEdit(d) {
	settingsDiv.style.display = "block";
}

function hideSettingsEdit() {
	settingsDiv.style.display = "none";
}

function MTStatus(v) { 
	GM_setValue("display", v);
	if (v) {
		mainDiv.style.display = "block";
		checkExtLinks();
	} else {
		mainDiv.style.display = "none";
		clearInterval(checkLinksTimer);
	}
};


function iframeDocument(d) {
	if (d.contentDocument) {
		return d.contentDocument;
	} else if (d.contentWindow && d.contentWindow.document) {
		return d.contentWindow.document;
	}
	return false;
};

function removeChildNodes(d) {
	if (!d) return;
	while (d.childNodes.length) {
		d.removeChild(d.childNodes[0]);
	}
};

function setStyleAttributes(d, attr) {
	attr = attr.split(";");
	for (var i = 0; i < attr.length; i++) {
		if (attr[i] != "") {
			var t = attr[i].split(":");
			for (var k = 2; k < t.length; k ++) { t[1] += ":" + t[k]; }
			var varName = t[0].split("-");
			for (var j = 1; j < varName.length; j++) {
				var f = varName[j].charAt(0).toUpperCase();
				varName[j] = f + varName[j].substr(1, varName[j].length - 1);
			}
			varName = varName.join("");
			if (varName == "float") {
				d.style.cssFloat = t[1];
				d.style.styleFloat = t[1];
			} else {
				d.style[varName] = t[1];
			}
		}
	}
};

function debugObject(n, ob) {
	if (typeof(ob) == "object") {
		var txt = Array();
		for (var i in ob) {
			txt[txt.length] = i + "=" + ob[i];
		}
		GM_log(n + " (" + typeof(ob) + " [" + ob.length + "]): " + ob + " = " + txt.join("   "));
	}
	GM_log(n + " (" + typeof(ob) + " [" + ob.length + "]): " + ob);
}

function getTree(d, level) {
	if (!d.childNodes) { debugObject("NO CHILD NODES", d); return ""; }
	if (!level) var level = 0;
	rv = "";
	for (var i = 0; i < d.childNodes.length; i ++) {
		for (var j = 0; j < level; j ++) { rv += "   "; }
		rv += d.childNodes[i].tagName;
		if (d.childNodes[i].childNodes.length) {
			rv += getTree(d.childNodes[i].childNodes, level + 1);
		}
	}
	if (level = 0) alert(rv);
}

function getDPos(d, noScrollOffset) { 
	var nTop = 0;
	var nLeft = 0;
	if (d) {
		do {
			nLeft += d.offsetLeft - (d.scrollLeft && !noScrollOffset ? d.scrollLeft : 0);
			nTop += d.offsetTop - (d.scrollTop && !noScrollOffset ? d.scrollTop : 0);
			d = d.offsetParent;
		} while(d)
	}
	return [nLeft, nTop];
};

function pxToNum(px) {
	if (isNaN(Number(px.substring(0, px.length - 2)))) return 0;
	return Number(px.substring(0, px.length - 2));
};

function addNavLink(label,url) {
	for (var i = 0; i < navLinks.length; i++) {
		if (navLinks[i].label == label) return;
	}
	navLinks[navLinks.length] = {label:label,url:url};
}

}, 50);
