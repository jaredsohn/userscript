// ==UserScript==
// @name			4chan Expand Images On Click Fixed
// @namespace		4chanExpandImagesOnClickFix
// @description		Expand Images on Click like the 4chan extension, works with threadupdater and backwash, also brings controls to resize all images on the page at once. Works with warosu and foolz archives.
// @version			2.2.5
// @updateURL	    http://userscripts.org/scripts/source/184679.user.js
// @include			http://boards.4chan.org/*
// @include			https://boards.4chan.org/*
// @include			http://fuuka.warosu.org/*
// @include			http://archive.installgentoo.net/*
// @include			http://oldarchive.foolz.us/*
// @include			http://archive.foolz.us/*
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return (localStorage[key] || def);
	};
	this.GM_setValue=function (key,value) {
		return (localStorage[key] = value);
	};
}

(function() {
	var maxWidth = GM_getValue("maxWidth", "90%"),
		maxHeight = GM_getValue("maxHeight", "90%"),
		showControls = GM_getValue("showControls", "true"),
	
		images = {}, inserting = false, maxAllButton, minAllButton;
	
	function getElementByClassName(el, className) {
		var i;
		for (i = 0; i < el.childNodes.length; i += 1) {
			if (el.childNodes[i].className === className) {
				return el.childNodes[i];
			}
		}
		return false;
	}
	
	function setSize(imgObj, state) {
		var el = imgObj.el, postEl, child,
			result, sib, calcSize;
		
		if (!imgObj.resizedEl) { imgObj.resizedEl = getElementByClassName(imgObj.el.parentNode, "fullImage") ;}
		
		imgObj.state = state;

		if (state === 0) {
			el.style.display = "inline";
			if (imgObj.resizedEl) {
				imgObj.resizedEl.style.display = "none";
				postEl = el.parentNode.parentNode;
				if (postEl.className === "post op") {
					for (child in postEl.childNodes) {
						if (postEl.childNodes[child].className === "file") {
							inserting = true;
							postEl.childNodes[child].appendChild(el.parentNode);
							inserting = false;
							break;
						}
					}
				} else {
					if (!document.getElementById("boardNavDesktop") && !document.getElementById("main") && el.parentNode.previousSibling.nodeName.toLowerCase() === "#text") {
						el.style.display = "block";
						sib = el.parentNode.previousSibling;
						while (sib && sib.previousSibling.nodeName.toLowerCase() !== "a") {
							sib = sib.previousSibling;
						}
						inserting = true;
						if (sib) { el.parentNode.parentNode.insertBefore(el.parentNode, sib); }
						inserting = false;
					}
				}
				
			}
		} else {
			el.style.display = "none";
			postEl = el.parentNode.parentNode.parentNode;
			if (imgObj.resizedEl) {
				imgObj.resizedEl.style.display = "inline";
				if (!document.getElementById("boardNavDesktop") && el.parentNode.previousSibling.nodeName.toLowerCase() === "#text") {
					imgObj.resizedEl.style.display = "block";
				}
			} else {
				imgObj.resizedEl = document.createElement("img");
				// warosu fix
				result = /http:\/\/(fuuka\.warosu\.org|archive\.installgentoo\.net)\/([a-zA-Z0-9]+)\/image_redirect\/([a-zA-Z0-9]+\.[a-zA-Z0-9]+)/.exec(imgObj.imgLink);
				console.log("result" + result)
				if (result) {
					imgObj.resizedEl.setAttribute("src", "http://i.4cdn.org/"+result[2]+"/src/"+result[3]);
				} else {
					imgObj.resizedEl.setAttribute("src", imgObj.imgLink);
				}
				if (postEl && postEl.className === "post op") {
					imgObj.resizedEl.setAttribute("style", "margin:3px 20px 0;");
				} else {
					imgObj.resizedEl.setAttribute("style", "margin:3px 20px 0 0;");
				}
				imgObj.resizedEl.setAttribute("class", "fullImage");
				imgObj.el.parentNode.appendChild(imgObj.resizedEl);
			}
			
			if (state === 1) {
				calcSize = function(size, cmp) {
					var cS,
						result = /^\s*([0-9]+)\s*(%|px)*\s*$/.exec(size);
					if (result) {
						cS = parseInt(result[1], 10);
						if (cS !== "NaN" && cS !== 0) {
							if (result[2] === "%") {
								cS = (cmp / 100 * cS)+"px";
							} else if (result[2] === "px" || !result[2]) {
								cS = cS + "px";
							}
						}
					}
					return (cS || 0);
				};
				imgObj.resizedEl.style.maxWidth = calcSize(maxWidth, window.innerWidth);
				imgObj.resizedEl.style.maxHeight = calcSize(maxHeight, window.innerHeight);
			} else if (state === 2) {
				imgObj.resizedEl.style.maxWidth = null;
				imgObj.resizedEl.style.maxHeight = null;
			}
			if (postEl && postEl.className === "post op") {
				inserting = true;
				postEl.insertBefore(el.parentNode, postEl.lastElementChild);
				inserting = false;
			} else {
				if (!document.getElementById("boardNavDesktop") && el.parentNode.nextSibling && el.parentNode.nextSibling.nodeName.toLowerCase() !== "blockquote") {
					imgObj.resizedEl.style.display = "block";
					sib = el.parentNode.nextSibling;
					do { 
						sib = sib.nextSibling;
					} while (sib && sib.nodeName.toLowerCase() !== "blockquote");
					inserting = true;
					if (sib) { el.parentNode.parentNode.insertBefore(el.parentNode, sib); }
					inserting = false;
				}
			}
		}
	}
	
	function toggleFunction(e) {
		var imgObj = this;
		if (imgObj) {
			if (imgObj.state === 0) {
				setSize(imgObj, 1);
			} else if (imgObj.state === 1) {
				if (imgObj.resizedEl && imgObj.resizedEl.style.display !== "none" && 
				imgObj.resizedEl.naturalWidth === imgObj.resizedEl.width && imgObj.resizedEl.naturalHeight === imgObj.resizedEl.height) {
					setSize(imgObj, 0);
				} else {
					setSize(imgObj, 2);
				}
			} else {
				setSize(imgObj, 0);
			}
		}
		e.currentTarget.blur();
		e.preventDefault();
		e.stopImmediatePropagation();
		return false;
	}

	function initExpandImages(container) {
		var img = container.getElementsByTagName("img"),
			i, imgObj, parentNode, threadId, postId, idstr, tmp, j, fuckfoolz = !!document.getElementById('main');
			
		for (i = 0; i < img.length; i += 1) {
			// ignore resized images we inserted ourselves
			parentNode = img[i].parentNode;
			if (parentNode.nodeName.toLowerCase() === "a" &&
				(parentNode.href.indexOf("i.4cdn.org") !== -1 || parentNode.href.indexOf(".foolz.us/") !== -1 || parentNode.href.indexOf("/image_redirect/") !== -1 ) &&
				img[i].className !== "fullImage") {

				idstr = "";
				tmp = parentNode;
				while(tmp && tmp.className !== "thread" && tmp.id !== "postform" && tmp.id !== "main" && tmp.tagName.toLowerCase() !== "html") {
					if ((tmp.id.indexOf("p") === 0 && tmp.id.indexOf("pc") === -1) || tmp.id.indexOf("m") === 0 || (fuckfoolz && /^[0-9]+$/.test(tmp.id))) {
						if (fuckfoolz) { idstr += tmp.id; }
						else { idstr += tmp.id.substr(1); }
						idstr += "-";
					}
					tmp = tmp.parentNode;
				}
				if (tmp && tmp.className === "thread") {threadId = tmp.id.substr(1);}
				idstr = (threadId ? threadId+"-" : "") +idstr.substr(0, idstr.length-1);

				imgObj = images[idstr] || {"state": 0};
				imgObj.el = img[i];
				imgObj.thumbLink = img[i].src;
				imgObj.imgLink = parentNode.href;
				imgObj.width = img[i].width;
				imgObj.height = img[i].height;
				imgObj.resizedEl = null;

				images[idstr] = imgObj;
				
				parentNode.addEventListener("click", toggleFunction.bind(imgObj));
				
				// reset state if post was updated
				setSize(imgObj, imgObj.state);
			}
		}
	}
	
	function buildControls() {
		var doAll = function(mode) {
				var imgObj;
				for (imgObj in images) {
					if (images.hasOwnProperty(imgObj)) {
						setSize(images[imgObj], mode);
					}
				}
			};
		if (!maxAllButton && !minAllButton) {
			maxAllButton = document.createElement("button");
			maxAllButton.setAttribute("style", "position:fixed;top:30px;left:0;line-height:0;border:0;padding-bottom:3px;width:16px; height:16px;background:#cccccc;border-radius:3px 3px 0 0");
			maxAllButton.innerHTML = "+";
			maxAllButton.addEventListener("click", function() { doAll(1); });
			minAllButton = document.createElement("button");
			minAllButton.setAttribute("style", "position:fixed;top:46px;left:0;line-height:0;border:0;padding-bottom:3px;width:16px; height:16px;background:#cccccc;border-radius:0 0 3px 3px");
			minAllButton.innerHTML = "&ndash;";
			minAllButton.addEventListener("click", function() { doAll(0); });
			document.body.appendChild(maxAllButton);
			document.body.appendChild(minAllButton);
		} else{
			maxAllButton.style.display = "block"; minAllButton.style.display = "block";
		}
	}
	
	function buildOptions() {
		var sbc, tmp, tmp2, frag = document.createDocumentFragment(), sa, ce, ac;
			
		sbc = document.getElementById("settingsBoxContent");
		if (sbc) {
			sa = function(el, attr, s) { for (var i in attr) { if (attr.hasOwnProperty(i)) { el[i] = attr[i]; } } if(s) {el.style.cssText = s; } return el; };
			ce = function(el, attr, s) { return sa(document.createElement(el), attr, s); };
			ct = function(txt) { return document.createTextNode(txt); };
			ac = function(el) { frag.appendChild(el); };

			ac(ce("label", {"textContent": "Expand Images"}));
			ac(ce("br"));
			tmp = ce("label");
			tmp.appendChild(tmp2 = ce("input", {"type": "checkbox", "checked": (showControls === "true" ? "checked" : "")}));
			tmp.appendChild(ct(" Show Controls"));
			tmp2.addEventListener("change", function(e) { 
				GM_setValue("showControls", this.checked.toString());
				if (this.checked) {buildControls();} else {maxAllButton.style.display = "none"; minAllButton.style.display = "none";}
			});
			ac(tmp);
			ac(ce("br"));
			tmp = ce("label");
			tmp.appendChild(tmp2 = ce("input", {"value": maxHeight}, "width:30px;"));
			tmp.appendChild(ct(" max height"));
			tmp2.addEventListener("input", function(e) { GM_setValue("maxHeight", maxHeight = this.value); });
			ac(tmp);
			ac(ce("br"));
			tmp = ce("label");
			tmp.appendChild(tmp2 = ce("input", {"value": maxWidth}, "width:30px;"));
			tmp.appendChild(ct(" max width"));
			tmp2.addEventListener("input", function(e) { GM_setValue("maxWidth", maxWidth = this.value); });
			ac(tmp);
			ac(ce("hr"));
			
			sbc.insertBefore(frag, sbc.childNodes[sbc.childNodes.length-1]);
		}
	}

	function init() {
		var postForm;
		
		if (showControls === "true") { buildControls(); }

		GM_addStyle("img:-moz-broken{-moz-force-broken-image-icon:1;width:24px;height:24px;padding-bottom:20px;} .opContainer .postInfo {display:block!important;}");
		buildOptions();
		
		//	4chan || warosu || foolz
		postForm = document.getElementsByName('delform')[0] || document.getElementById('postform') || getElementByClassName(document.getElementsByTagName("div")[1], "content") ||	 document.getElementById('main');

		// run
		initExpandImages(postForm);
		
		// run again after thread was updated
		document.addEventListener('DOMNodeInserted', function(e) {
			if (!inserting && (e.target.className.indexOf("postContainer") !== -1 || e.target.className.indexOf("post") !== -1 || e.target.className.indexOf("thread") !== -1 || e.target.nodeName.toLowerCase() === "a" || e.target.nodeName.toLowerCase() === "table")) {
				console.log("target found")
				initExpandImages(e.target);
			}
		});
	}
	
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
	
}());