// ==UserScript==
// @name           Dailymotion - Direct Links
// @namespace      http://userscripts.org/users/436161
// @description    Creates links so you can easily access the video urls for any quality.
// @version        2.18
// @grant          GM_xmlhttpRequest
// @match          http://www.dailymotion.com/*
// @match          https://www.dailymotion.com/*
// ==/UserScript==

(function() {
	"use strict";
	
	if (!/^https?:\/\/www\.dailymotion\.com\/middle\?/.test(window.location.href)) {
		insertMenusOverPreviews();
		if (/^https?:\/\/www\.dailymotion\.com\/video\//.test(window.location.href)) {
			insertMenuUnderVideo();
		}
		observeDynamics();
	}

	function insertMenusOverPreviews(/* optional */ subtree) {
		if (subtree == null) {
			subtree = document;
		}
		var videoPreviews = getElements(subtree, ".dmpi_video_preview, .sd_video_previewtwig");
		if (videoPreviews.length > 0) {
			for (var i = 0; i < videoPreviews.length; i++) {
				var menu = createMenuForPreview(videoPreviews[i]);
				if (menu) {
					videoPreviews[i].appendChild(menu);
				}
			}
		} else if (subtree === document) {
			// Previews are loaded asynchronously
			// Try to find them again in a second
			window.setTimeout(insertMenusOverPreviews, 1000);
		}
	}

	function insertMenuUnderVideo(/* optional */ subtree) {
		var menu, player, tools, script, title, links;
		if (!subtree) {
			subtree = document;
		}
		tools = getElement(subtree, ".pl_video_tabs ul");
		if (!tools) {
			// The place where we want to put the tab does not exist
			if (getElement(subtree, "#player_page_tabs_ph")) {
				unsafeWindow.PubSub.subscribe("dm:tabs_initialized", function onTabsInitialized() {
					unsafeWindow.document.stopObserving("dm:tabs_initialized", onTabsInitialized);
					insertMenuUnderVideo(subtree);
				});
			} else {
				insertMenuUnderVideo__old(subtree);
			}
			return;
		}
		title = getElement(subtree, "meta[itemprop=name]");
		if (title) {
			title = title.getAttribute("content");
		}
		menu = createMenuForPlayer(tools, title, links);
		tools.parentNode.appendChild(menu);
		var nextSibling = getElement(tools, ".tab_report");
		tools.insertBefore(createElement("LI", {
			attr: {
				"class": "pull-start mrg-end"
			},
			children: [
				createElement("A", {
					attr: {
						id: "tab_links",
						"class": "foreground2 video_title_on_hover",
						href: ""
					},
					children: ["Links"]
				})
			]
		}), nextSibling);
	}

	function insertMenuUnderVideo__old(/* optional */ subtree) {
		var menu, player, tools, script, title, links;
		if (!subtree) {
			subtree = document;
		}
		tools = getElement(subtree, ".dmpi_video_tools, .sd_video_tools");
		if (!tools) {
			// The place where we want to put the button does not exist
			return;
		}
		title = tools.getAttribute("data-videotitle");
		menu = createMenuForPlayer__old(tools, title, links);
		var nextSibling = tools.lastChild;
		while (nextSibling && nextSibling.firstChild && nextSibling.firstChild.id !== "addto") {
			nextSibling = nextSibling.previousSibling;
		}
		if (nextSibling) {
			nextSibling = nextSibling.nextSibling;
		} else {
			nextSibling = tools.firstChild;
		}
		tools.insertBefore(menu, nextSibling);
		for (var i = 0; i < tools.childNodes.length - 1; i++) {
			tools.childNodes[i].className = "";
		}
		tools.childNodes[i].className = " last";
		var socialButtons = getElement(subtree, ".sd_video_socialbuttons");
		if (socialButtons) {
			socialButtons.style.width = "auto";
		}
	}

	var observer;
	function observeDynamics() {
		var MutationObserver = 
			window.MutationObserver ||
			window.MozMutationObserver ||
			window.WebKitMutationObserver;
		if (!MutationObserver) {
			return;
		}
		observer = new MutationObserver(onMutation);
		var feedPagelists = getElements(".sd_homefeed_column");
		for (var i = 0; i < feedPagelists.length; i++) {
			observePagelist(feedPagelists[i]);
			var pages = getElements(feedPagelists[i], ".sd_homefeed_page");
			for (var j = 0; j < pages.length; j++) {
				observePage(pages[j]);
			}
		}
		var mediaPagelists = getElements(".sd_homemedia_pagelist");
		for (var i = 0; i < mediaPagelists.length; i++) {
			observePagelist(mediaPagelists[i]);
		}
		var lists = getElements(".dmpi_video_relatedlist, .sd_video_relatedlist");
		for (var i = 0; i < lists.length; i++) {
			observeLazyList(lists[i].parentNode);
		}
		var leftBox = getElement(".column.left_box");
		if (leftBox) {
			observer.observe(leftBox, {childList: true});
		}
	}
	function observePagelist(list) {
		observer.observe(list, {childList: true});
	}
	function observePage(page) {
		var homefeeds = getElements(page, ".sd_homefeed_block");
		for (var i = 0; i < homefeeds.length; i++) {
			observer.observe(homefeeds[i], {childList: true});
		}
	}
	function observeLazyList(list) {
		observer.observe(list, {childList: true});
	}
	function onMutation(mutations) {
		mutations.forEach(function(m) {
			var target = m.target;
			var c = target.classList;
			if (c.contains("sd_homefeed_column")) {
				var nodes = m.addedNodes;
				if (nodes) {
					for (var i = 0; i < nodes.length; i++) {
						if (nodes[i].classList) {
							if (nodes[i].classList.contains("sd_homefeed_page")) {
								insertMenusOverPreviews(nodes[i]);
								observePage(nodes[i]);
							}
						} 
					}
				}
			} else if (c.contains("sd_homemedia_pagelist")) {
				var nodes = m.addedNodes;
				if (nodes) {
					for (var i = 0; i < nodes.length; i++) {
						if (nodes[i].classList) {
							if (nodes[i].classList.contains("sd_homemedia_page")) {
								insertMenusOverPreviews(nodes[i]);
							}
						} 
					}
				}
			} else if (c.contains("sd_homefeed_block")) {
				var nodes = m.addedNodes;
				if (nodes) {
					for (var i = 0; i < nodes.length; i++) {
						if (nodes[i].classList && nodes[i].classList.contains("player_and_tools")) {
							insertMenuUnderVideo(target);
							break;
						}
					}
				}
			} else if (c.contains("left_box")) {
				var nodes = m.addedNodes;
				if (nodes) {
					for (var i = 0; i < nodes.length; i++) {
						if (nodes[i].id === "player_tools") {
							insertMenuUnderVideo(target);
							break;
						}
					}
				}
			} else {
				var nodes = m.addedNodes;
				if (nodes) {
					for (var i = 0; i < nodes.length; i++) {
						var previews = getElements(nodes[i], ".dmpi_video_preview, .sd_video_previewtwig");
						for (var j = 0; j < previews.length; j++) {
							var menu = createMenuForPreview(previews[j]);
							if (menu) {
								previews[j].appendChild(menu);
							}
						}
					}
				}
			}
		});
	}

	function createMenuForPlayer(tools, title, links) {
		var opened = false, loaded = !!(links && links.length), loading = false, container, dropdown;
		var menu = createElement("DIV", {
			attr: {
				id: "tab_links_content",
				"class": "pl_video_tablinks tab_content clearfix",
				style: "display: none;"
			}
		}, [
			"if you can see this something went wrong with the link insertion"
		]);
		function clear() {
			while (menu.lastChild) {
				menu.removeChild(menu.lastChild);
			}
		}
		function insertLinks(links) {
			if (links) {
				try {
					clear();
					for (var i = 0; i < links.length; i++) {
						var icon = getIcon(links[i].quality);
						menu.appendChild(createElement("A", {
							attr: {
								title: links[i].quality,
								href: links[i].url
							}, 
							children: [
								createElement("SPAN", {
									style: {
										backgroundImage: "url(" + icon.data + ")",
										width: icon.width + "px",
										height: icon.height + "px",
										cssFloat: "left"
									}
								}),
								title
							],
							style: {
								color: "#666666",
								display: "block",
								clear: "left"
							}
						}));
					}
				} catch(e) {
					showError(e);
				}
			}
		}
		function showError(message) {
			loaded = true;
			clear();
			menu.appendChild(createElement("DIV.error_msg", {
				children: [String(message)]
			}));
		}
		function showInfo(message) {
			clear();
			menu.appendChild(createElement("DIV", {
				children: [String(message)]
			}));
		}
		function setOpened() {
			if (!opened) {
				try{
					opened = true;
					if (tools.parentNode.classList.contains("player_and_tools") || tools.parentNode.classList.contains("player_tools")) {
						// dynamically embedded player
						var player = getElement(tools.parentNode, "embed, object");
						if (!player) {
							player = getElement(tools.parentNode.parentNode, "embed, object");
						}
						if (player) {
							links = extractMediaLinks(player);
							if (links && links.length) {
								loaded = true;
								insertLinks(links);
							}
						}
						if (!loaded) {
							var link = getElement(tools.parentNode, "a.video_title[href]") || getElement(tools.parentNode.parentNode, "a.video_title[href]") || getElement(tools.parentNode.parentNode, ".sd_video_title > a[href]");
							if (!link) {
								showError("cannot find player or link");
								return;
							}
							loadLinks(link.href);
						}
					} else {
						var videoMeta = getElement("meta[property='og:video']");
						if (!videoMeta) {
							showError("cannot find player or link");
							return;
						}
						var url = videoMeta.content;
						var host = /:\/\/(.*?)\//.exec(url)[1];
						if (host === "www.dailymotion.com") {
							url = window.location.href;
						} else if (host === "embed.5min.com") {
							var width = parseInt(getElement("meta[property='og:video:width']").content);
							var height = parseInt(getElement("meta[property='og:video:height']").content);
						} else {
							showError("not supported");
							return;
						}
						loadLinks(url, width, height);
					}
				} catch (e) {
					showError(e);
				}
			}
		}
		function loadLinks(url, width, height) {
			loading = true;
			showInfo("Loading..");
			downloadMediaLinks(url, function(title, links, error) {
				loading = false;
				loaded = true;
				if (error) {
					showError(error);
				} else {
					insertLinks(links);
				}
			}, width, height);
		}
		if (loaded) {
			insertLinks(links);
		} else {
			unsafeWindow.PubSub.subscribe("dm:tabs_select", function onTabsSelect(a) {
				if (a === "tab_links") {
					unsafeWindow.PubSub.unsubscribe("dm:tabs_select", onTabsSelect);
					setOpened(true);
				}
			});
		}
		return menu;
	}

	function createMenuForPlayer__old(tools, title, links) {
		var open = false, loaded = !!(links && links.length), loading = false, button, icon, container, dropdown;
		var menu = createElement("LI", {children: [
			button = createElement("BUTTON.icn_right button", {
				children: [
					"Links",
					createElement("SPAN.icn_wrap", {
						children: [icon = createElement("SPAN.icn icon_select")]
					})
				]
			}),
			container = createElement("DIV", {
				style: {
					display: "none",
					zIndex: 30,
					position: "relative"
				},
				children: [
					dropdown = createElement("DIV.dmco_html dmco_select foreground2 light_border background", {
						style: {
							position: "absolute",
							top: "-1px",
							left: 0,
							marginRight: 0,
							padding: "8px 0 4px",
							border: "1px solid #DDDDDD",
							webkitBoxShadow: "rgba(0,0,0,0.3) 0 1px 2px",
							mozBoxShadow: "rgba(0,0,0,0.3) 0 1px"
						}
					})
				]
			})
		]});
		function clear() {
			while (dropdown.lastChild) {
				dropdown.removeChild(dropdown.lastChild);
			}
		}
		function insertLinks(links) {
			if (links) {
				clear();
				for (var i = 0; i < links.length; i++) {
					var icon = getIcon(links[i].quality);
					dropdown.appendChild(createElement("A", {
						attr: {
							title: links[i].quality,
							href: links[i].url
						}, 
						children: [
							createElement("SPAN", {
								style: {
									backgroundImage: "url(" + icon.data + ")",
									width: icon.width + "px",
									height: icon.height + "px"
								}
							}),
							title
						],
						style: {
							color: "#666666"
						}
					}));
				}
				if (!links.length) {
					dropdown.appendChild(createElement("SPAN", ["no links found"]));
				}
			}
		}
		function showError(message) {
			loaded = true;
			clear();
			dropdown.appendChild(createElement("DIV.error_msg", {
				children: [String(message)]
			}));
			icon.className = "icn icon_select";
			if (open) {
				container.style.display = "block";
			}
		}
		function setOpen(value) {
			if (value !== open) {
				open = value;
				if (open) {
					getElements(tools, "li > div").forEach(function(e) {
						e.style.display = "none";
					});
					if (loaded) {
						container.style.display = "block";
					} else if (!loading) {
						if (tools.parentNode.classList.contains("player_and_tools") || tools.parentNode.classList.contains("player_tools")) {
							// dynamically embedded player
							var player = getElement(tools.parentNode, "embed, object");
							if (!player) {
								player = getElement(tools.parentNode.parentNode, "embed, object");
							}
							if (player) {
								links = extractMediaLinks(player);
								if (links && links.length) {
									loaded = true;
									insertLinks(links);
									container.style.display = "block";
								}
							}
							if (!loaded) {
								var link = getElement(tools.parentNode.parentNode, ".sd_video_title > a");
								if (!link) {
									showError("cannot find player or link");
									return;
								}
								loadLinks(link.href);
							}
						} else {
							var videoMeta = getElement("meta[property='og:video']");
							if (!videoMeta) {
								showError("cannot find player or link");
								return;
							}
							var url = videoMeta.content;
							var host = /:\/\/(.*?)\//.exec(url)[1];
							if (host === "www.dailymotion.com") {
								url = window.location.href;
							} else if (host === "embed.5min.com") {
								var width = parseInt(getElement("meta[property='og:video:width']").content);
								var height = parseInt(getElement("meta[property='og:video:height']").content);
							} else {
								showError("not supported");
								return;
							}
							loadLinks(url, width, height);
						}
					}
				} else {
					container.style.display = "none";
				}
			}
		}
		function loadLinks(url, width, height) {
			loading = true;
			icon.className = "icn icon_loading";
			downloadMediaLinks(url, function(title, links, error) {
				loading = false;
				loaded = true;
				if (error) {
					showError(error);
				} else {
					insertLinks(links);
					icon.className = "icn icon_select";
					if (open) {
						container.style.display = "block";
					}
				}
			}, width, height);
		}
		if (loaded) insertLinks(links);
		button.addEventListener("click", function() {
			setOpen(!open);
		}, false);
		getElements(tools, "button[id]").forEach(function(e) {
			e.addEventListener("click", function() {
				setOpen(false);
			}, false);
		});
		return menu;
	}
	
	function createMenuForPreview(videoPreview) {
		var previewLink = getElement(videoPreview, "A[HREF]");
		if (!previewLink) {
			previewLink = videoPreview.parentNode;
			if (!previewLink || !previewLink.href) {
				return null;
			}
		}
		var href = previewLink.href;
		var links, menu = createElement("UL", {
			style: {
				position: "absolute",
				top: "4px", left: "4px",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				color: "white",
				fontSize: "9px",
				padding: "1px 2px",
				boxShadow: "0 0 1px #DDDDDD",
				borderRadius: "2px",
				mozBorderRadius: "2px",
				webkitBorderRadius: "2px",
				textAlign: "left"
			},
			children: [
				links = createElement("LI", {
					style: {cursor: "pointer"}, 
					children: ["links"]
				})
			]
		});
		links.addEventListener("mouseover", function() {
			links.style.textDecoration = "underline";
		}, false);
		links.addEventListener("mouseout", function() {
			links.style.textDecoration = "none";
		}, false);
		links.addEventListener("click", function(e) {
			e.preventDefault();
			menu.removeChild(links);
			var loading = createElement("SPAN", ["loading"]);
			menu.appendChild(loading);
			downloadMediaLinks(href, function(title, links, error) {
				menu.removeChild(loading);
				if (error) {
					menu.appendChild(createElement("LI", {
						style: {color: "white"}, 
						children: [error]
					}));
				} else {
					for (var i = 0; i < links.length; i++) {
						menu.appendChild(function(quality, url) {
							var icon = getSmallIcon(quality);
							return createElement("A", {
								style: {
									backgroundColor: "transparent",
									display: "inline",
									cssFloat: "none"
								},
								attr: {
									title: quality,
									href: url
								}, 
								children: [
									createElement("LI", {
										children: [
											createElement("SPAN", {
												style: {
													backgroundImage: "url(" + icon.data + ")",
													display: "inline-block",
													width: icon.width + "px",
													height: icon.height + "px"
												}
											}),
											createElement("SPAN", {style: {display: "none"}, children: [title]})
										],
										onmouseover: function(e) {
											this.style.backgroundColor = "rgba(255,255,255,0.25)";
										},
										onmouseout: function(e) {
											this.style.backgroundColor = "";
										}
									})
								]
							});
						}(links[i].quality, links[i].url));
					}
					if (!links.length) {
						menu.appendChild(createElement("SPAN", ["no links found"]));
					}
				}
			});
		}, false);
		return menu;
	}

	function downloadMediaLinks(url, callback, width, height) {
		if (/^https?:\/\/www\.dailymotion\.com\//.test(url)) {
			var m = /^https?:\/\/www\.dailymotion\.com\/video\/([0-9a-z]+)/i.exec(url);
			if (!m) {
				callback(null, null, "cannot parse url " + url);
				return;
			}
			var videoId = m[1];
			xmlhttpRequest({
				method: "GET",
				url: url.slice(0, url.indexOf(':')) + "://www.dailymotion.com/embed/video/" + videoId,
				onload: function(response) {
					try {
						var m, title = "video", html = response.responseText;
						if (m = /<title>(.*?)<\/title>/.exec(html)) {
							title = decodeHTMLEntities(m[1]);
						}
						var medialinks = extractMediaLinks(html);
					} catch (e) {
						callback(title, medialinks, e);
						return;
					}
					callback(title, medialinks, null);
				},
				onerror: function() {
					callback(null, null, "error");
				}
			});
		} else try {
			if (/^https?:\/\/embed\.5min\.com\//.test(url)) {
				xmlhttpRequest({
					method: "HEAD",
					url: url,
					onload: function(response) {
						var links = [];
						var location = /(?:^|[\r\n])Location: (.*?)[\r\n]/.exec(response.responseHeaders);
						if (location) {
							location = location[1];
						} else {
							location = response.finalUrl;
						}
						var params = parseParams(splitAt(location, location.indexOf("?") + 1)[1]);
						/*var videoUrl = splitAt(params.videoUrl, params.videoUrl.lastIndexOf("."));
						var renditions = params.activeRenditions;
						var qualities = [["SD", 480, 360], ["HQ", 640, 480], ["720", 1280, 720], ["1080", 1920, 1080]];
						for (var i = 0; i < qualities.length; i++) {
							if ((renditions & (1 << i)) !== 0) {
								links.push({
									url: videoUrl[0] + "_" + (1 << i) + videoUrl[1],
									quality: qualities[i][0],
									width: qualities[i][1],
									height: qualities[i][2]
								});
							}
						}*/
						links.push({
							url: params.videoUrl,
							quality: qualityNameFromSize(width, height),
							width: width,
							height: height
						});
						callback(params.videoTitle, links, null);
					},
					onerror: function() {
						callback(null, null, "error");
					}
				});
			} else {
				callback(null, null, "not supported");
			}
		} catch (exception) {
			callback(null, null, "error");
		}
	}

	function xmlhttpRequest(params) {
		setTimeout(function() {
			GM_xmlhttpRequest(params);
		}, 0);
	}
	
	function extractMediaLinks(arg) {
		var linkRegex = /^https?:\/\/www\.dailymotion\.com\/cdn\/(.*?)-(\d+)x(\d+)\/video\/.*?\.(.*?)\?auth=([-0-9a-z]+)$/i;
		var linkRegex2 = /"(https?:\\?\/\\?\/www\.dailymotion\.com\\?\/cdn\\?\/[^"]*?-\d+x\d+\\?\/video\\?\/[^"]*?\.[^"]*?\?auth=[-0-9a-z]+)"/gi;
		var sequence;
		if (typeof arg === "string") {
			var m = /"sequence":"(.*?)"/.exec(arg);
			if (m) sequence = m[1];
		} else if (arg instanceof HTMLEmbedElement || arg instanceof HTMLObjectElement) {
			var vars = arg.getAttribute("flashvars");
			if (!vars) {
				vars = arg.querySelector("param[name=flashvars]");
				if (vars) {
					vars = vars.value;
				}
			}
			if (vars) {
				vars = vars.split("&");
				for (var i = 0; i < vars.length; i++) {
					if (startsWith(vars[i], "sequence=")) {
						sequence = vars[i].substring("sequence=".length);
						break;
					}
				}
			}
		}
		var matches = [];
		if (sequence) {
			sequence = JSON.parse(unescape(sequence));
			if (sequence.sequence) {
				sequence = sequence.sequence;
			}
			var root = sequence[0];
			/*if (sequence.name === "root") {
				root = sequence;
			} else {
				root = getByName(sequence, "root");
			}*/
			var background = getByName(root.layerList, "background");
			var main = getByName(background.sequenceList, "main");
			var video = getByName(main.layerList, "video");
			var param = video.param;
			for (var key in param) {
				if (param.hasOwnProperty(key)) {
					var url = param[key];
					if (m = linkRegex.exec(url)) {
						matches.push(m);
					}
				}
			}
		} else if (typeof arg === "string") {
			while (m = linkRegex2.exec(arg)) {
				matches.push(linkRegex.exec(m[1].replace(/\\(.)/g, "$1")));
			}
		}
		var links = [];
		for (var i = 0; i < matches.length; i++) {
			if (m = matches[i]) {
				var link = {
					url: m[0],
					codec: m[1],
					width: parseInt(m[2]),
					height: parseInt(m[3]),
					ext: m[4],
					auth: m[5]
				};
				link.quality = qualityNameFromSize(link.width, link.height);
				links.push(link);
			}
		}
		links.sort(function(a, b) {
			if (a.width == b.width && a.height == b.height) {
				return 0;
			} else if (a.width > b.width || a.width == b.width && a.height > b.height) {
				return 1;
			} else {
				return -1;
			}
		});
		return links;
	}

	function qualityNameFromSize(width, height) {
		var quality;
		if (width === 512 && height === 384) {
			quality = "SD";
		} else if (width === 848 && height === 480) {
			quality = "HQ";
		} else if (width === 1280 && height === 720) {
			quality = "720";
		} else if (width === 1920 && height === 1080) {
			quality = "1080";
		} else {
			quality = width + "x" + height;
		}
		return quality;
	}
	
	// Array helpers
	
	function getByName(array, name) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] && array[i].name === name) {
				return array[i];
			}
		}
	}
	
	// String helpers
	
	function decodeHTMLEntities(text) {
		return createElement("SPAN", {
			props: {innerHTML: text}
		}).childNodes[0].nodeValue;
	}
	
	function startsWith(text, prefix) {
		return text.lastIndexOf(prefix, 0) === 0;
	}

	function splitAt(text, pos) {
		return [
			text.substring(0, pos),
			text.substring(pos)
		];
	}

	function parseParams(text) {
		var params = {};
		text.split("&").forEach(function(e) {
			e = e.split("=", 2);
			params[e[0]] = decodeURIComponent(e[1].replace(/\+/g, " "));
		});
		return params;
	}
	
	// DOM helpers
	
	function getElement(/* optional */ subtree, query) {
		if (!query) {
			query = subtree;
			subtree = document;
		}
		return subtree.querySelector(query);
	}
	
	function getElements(/* optional */ subtree, query) {
		if (!query) {
			query = subtree;
			subtree = document;
		}
		return Array.prototype.slice.call(subtree.querySelectorAll(query), 0);
	}
	
	function createElement(def, /* optional */ opt) {
		var node;
		if (def.indexOf(".") !== -1) {
			node = document.createElement(def.substring(0, def.indexOf(".")));
			node.className = def.substring(def.indexOf(".") + 1);
		} else {
			node = document.createElement(def);
		}
		if (!opt) return node;
		if (opt.style) {
			var style = opt.style;
			for (var key in style) {
				if (style.hasOwnProperty(key)) {
					node.style[key] = style[key];
				}
			}
		}
		if (opt.attr) {
			var attr = opt.attr;
			for (var key in attr) {
				if (attr.hasOwnProperty(key)) {
					node.setAttribute(key, attr[key]);
				}
			}
		}
		if (opt.props) {
			var props = opt.props;
			for (var key in props) {
				if (props.hasOwnProperty(key)) {
					node[key] = props[key];
				}
			}
		}
		if (opt.children) {
			var children = opt.children;
			for (var i = 0; i < children.length; i++) {
				if (typeof children[i] === "string") {
					node.appendChild(document.createTextNode(children[i]));
				} else {
					node.appendChild(children[i]);
				}
			}
		}
		for (var key in opt) {
			if (opt.hasOwnProperty(key) && key.substring(0, 2) === "on") {
				node.addEventListener(key.substring(2), opt[key], false);
			}
		}
		return node;
	}

	// Image Helpers
	var icons;
	function getIcon(quality) {
		if (!icons) {
			icons = {};
		}
		if (!icons[quality]) {
			var width = 46;
			var height = 16;
			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, width, height);
			ctx.textBaseline = "middle";
			ctx.textAlign="center";
			ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
			ctx.strokeText(quality, width/2, height/2);
			icons[quality] = {
				width: width,
				height: height,
				data: canvas.toDataURL("image/png")
			};
		}
		return icons[quality];
	}

	var smallIcons;
	function getSmallIcon(quality) {
		if (!smallIcons) {
			smallIcons = {};
		}
		if (!smallIcons[quality]) {
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			var width = ctx.measureText(quality).width + 4;
			var height = 10;
			canvas.width = width;
			canvas.height = height;
			ctx.clearRect(0, 0, width, height);
			ctx.textBaseline = "middle";
			ctx.textAlign="left";
			ctx.strokeStyle = "white";
			ctx.font = "8px Arial normal,sans-serif";
			ctx.strokeText(quality, 0, 7);
			smallIcons[quality] = {
				width: width,
				height: height,
				data: canvas.toDataURL("image/png")
			};
		}
		return smallIcons[quality];
	}
}());