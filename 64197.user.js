// ==UserScript==
// @name           Google Reader Plus Favicon
// @description    Adds favicons to feeds and entries
// @author         LudoO (http://www.pitaso.com)
// @version        2.1.0
// @namespace      http://userscripts.org/scripts/show/64197
// @include        htt*://www.google.*/reader/view*
// ==/UserScript==

/*
Version Firefox of Google Reader plus Chrome extension :
https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg

TODO: cleanup domains (using checkbox on menuitem)
 
 Based on the great script of Yamamaya :  Google Reader Favicon ++ v4.0.3
 http://userscripts.org/scripts/show/40120
 
 */

if (!JSON) {
	var JSON = {
		stringify : function(o) {
			return uneval(o);
		},
		parse : function(t) {
			return eval(t);
		}
	};
};

(function() {

	//clearCache();
	//clearDomains();

	var GOOGLE_READER_INFO = JSON.parse(GM_getValue('googleReaderInformation')) || {};
	var FAVICON = GOOGLE_READER_INFO.icon || (GOOGLE_READER_INFO.icon = {});
	// var FAVICON_URL = ['http://getfavicon.appspot.com/http://', ''];
	var protocol = document.location.protocol;
	var FAVICON_URL = [ protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed&domain=', '' ];
	var FAVICON_DEFAULT_IMG = protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed';

	var RSS = getAlls('id("sub-tree-item-0-main")/ul/li/ul/li').length;
	var FOLDER = getAlls('id("sub-tree-item-0-main")/ul/li').length;
	var RSS_NUMBERS = GOOGLE_READER_INFO.rss || null;
	var FOLDER_NUMBERS = GOOGLE_READER_INFO.dirs || null;

	var EXCEPTIONS = {};

	var googleReader = {

		setdomain : function(a) {
			var domains = "" + GM_getValue("domains", '');
			if (domains.indexOf(a.domain) < 0) {
				var ds = domains.split(",");
				ds.push(a.domain);
				domains = ds.join(",").replace(/^,+/, '').replace(/,+/g, ',');
				GM_setValue("domains", domains);
				// go update single icon
				this.extractFavicon( {
					url : 'http://'+a.domain,
					title : a.title,
					FAVICON : a.FAVICON
				});
			}
		},

		parseXml : function(xml, FAVICON_URL) {
			var FAVICON = {};
			var me = this;
			Array.forEach(xml.getElementsByTagName('outline'), function(outline) {
				if (!outline.hasAttribute('htmlUrl')) {
					return;
				}
				var title = outline.getAttribute('title');
				var url = outline.getAttribute('htmlUrl');
				var favicon;
				url = url.split(/\/|\?/)[2];
				me.setFavicon(title, FAVICON_URL.join(url), url, FAVICON);

				if (EXCEPTIONS[url]) {
					me.extractFavicon( {
						url : 'http://' + url,
						title : title,
						FAVICON : FAVICON
					});
				}
			});
			return FAVICON;
		},

		setFavicon : function(title, icon, url, FAVICON) {
			var t = title;
			if (t.length > 24) {
				t = t.substr(0, 21) + '...';
			}
			if (FAVICON) {
				FAVICON[t] = {
					icon : icon,
					url : url,
					title : title
				};
			}
		},

		loadicons : function(a) {
			var FAVICON_URL = a.FAVICON_URL;
			// var domains = GM_getValue("domains");
			var domains = a.domains;
			if (domains && domains.length > 0) {
				var doms = domains.split(',');
				EXCEPTIONS = {};
				for ( var i = 0; i < doms.length; i++) {
					if (doms[i] && ("" + doms[i]).length > 0) {
						EXCEPTIONS[doms[i]] = true;
						GM_log('manual icon : ' + doms[i]);
					}
				}
			}
			var xhr = new XMLHttpRequest();
			var me = this;
			xhr.open(a.method || 'get', a.url, true);
			xhr.onload = function() {
				var xml = xhr.responseXML;
				me.iconsloaded.call(me, xml);
			};
			xhr.send( {});
		},
		iconsloaded : function(xml) {
			FAVICON = this.parseXml(xml, FAVICON_URL);
			this.addFavicon();
			setValue();
		},

		extractFavicon : function(a) {
			var me = this;
			var url = a.url;
			var title = a.title;
			GM_xmlhttpRequest( {
				method : 'GET',
				url : url,
				onload : function(r) {
					var html = r.responseText;
					var icon = me.parseFavicon(html, url);
					me.setFavicon(title, icon, url, FAVICON);
					me.updateFavicon(url, title, icon);
					setValue();
				}
			});
		},

		parseFavicon : function(html, url) {
			var icon, link;
			var relink = /<LINK[^>]*?REL=["'](SHORTCUT\W+)?ICON["'][^>]*?>/i;
			var rehref = /href=["'](.*?)["']/i;
			var m = relink.exec(html);
			if (m) {
				link = m[0];
				m = rehref.exec(link);
				if (m) {
					icon = m[1];
				}
			}
			if (!icon) {
				icon = url + "/favicon.ico";
			}
			var re = new RegExp("^http:", "i");
			if (!re.test(icon)) {
				icon = url + '/' + icon;
			}
			return icon;
		},
		setPreferences : function(a) {
			GM_setValue('domains', a.domains);
		},

		init : function() {
			this.prefs = {
				domains : GM_getValue('domains', false)
			};
			if (RSS_NUMBERS === null || FOLDER_NUMBERS === null || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) {
				this.noCacheAddFavicon();
			} else {
				this.addFavicon();
			}

			this.addBaseCss();
			this.addListViewCss();
			// this.showButton();
			this.attachMenu();

			GOOGLE_READER_INFO.rss = RSS;
			GOOGLE_READER_INFO.dirs = FOLDER;
			setValue();
		},
		noCacheAddFavicon : function() {
			this.loadicons( {
				method : 'get',
				url : protocol + '//www.google.com/reader/subscriptions/export',
				FAVICON_URL : FAVICON_URL,
				domains : this.prefs.domains
			});
		},
		updateFavicon : function(url, title, icon) {
			var match = ellipsis(title);
			var tree = document.getElementById('sub-tree');
			getAlls(".//img[@title='" + match + "']", tree).forEach(function(img) {
				img.src = icon;
			});
		},
		addFavicon : function() {
			entryFaviconNoDOMNodeInserted();
			this.entryFavicon();
			this.sideBarFavicon();

			function entryFaviconNoDOMNodeInserted() {
				getAlls('.//span[@class="entry-source-title"] | .//a[@class="entry-source-title"]').forEach(
						function(title) {
							var match = ellipsis(title.textContent);
							var icon = document.createElement('img');
							icon.className = 'entry-favicon grf-favicon grf-entry-title';
							icon.title = match;

							if (FAVICON.hasOwnProperty(match)) {
								icon.src = FAVICON[match].icon;
							} else {
								icon.src = FAVICON_DEFAULT_IMG;
							}

							if (title.tagName !== 'SPAN') {
								title = title.parentNode.parentNode.getElementsByTagName('a')[0];
							}

							title.parentNode.insertBefore(icon, title);
							// add on first child
							// title.parentNode.insertBefore(icon,title.parentNode.firstChild);

							icon.removeEventListener('error', revertFavicon, false);
							icon.addEventListener('error', revertFavicon, false);
						});
			}
		},
		entryFavicon : function() {
			document.addEventListener('DOMNodeInserted', function(e) {
				var target = e.target;
				entry(target);
				sideBar(target);
			}, false);

			function entry(target) {
				if (/^entry\s/i.test(target.className) && target.tagName === 'DIV') {
					var point, match;
					var icon = document.createElement('img');
					icon.className = 'entry-favicon grf-favicon grf-entry';

					if (target.firstChild.className === 'collapsed') { // ?????
						// .//span[contains(@class,'entry-source-title')]
						point = target.getElementsByTagName('span')[0];
						match = point.textContent;
					} else {// ???? .//span[@class='entry-source-title-parent'],
						// ??, ??????
						point = target.getElementsByClassName('entry-title-link')[0]
								|| target.getElementsByClassName('comment-entry-title')[0];
						var title = target.getElementsByClassName('entry-source-title')[0];
						match = title.textContent;
					}
					match = ellipsis(match);
					icon.title = match;

					if (target.getAttribute('color') === null) {
						target.setAttribute('color', match.replace(/"/g, ''));
					}

					if (FAVICON.hasOwnProperty(match)) {
						icon.src = FAVICON[match].icon;
					} else { // popular items | recommended sources
						var fs = target.getElementsByClassName('entry-original')[0]
								|| target.getElementsByClassName('entry-title-link')[0];
						if (fs) {
							fs = FAVICON_URL.join(fs.href.split(/\/|\?/)[2]);
							icon.src = fs;
						} else {
							icon.src = FAVICON_DEFAULT_IMG;
						}
					}

					if (point.parentNode.className == "entry-title") {
						// add on first child
						point.parentNode.insertBefore(icon, point.parentNode.firstChild);
					} else {
						point.parentNode.insertBefore(icon, point);
					}

					icon.removeEventListener('error', revertFavicon, false);
					icon.addEventListener('error', revertFavicon, false);
				}
			}

			function sideBar(target) {
				if (target.nodeName.toLowerCase() === 'li' && target.className.match(/^folder/)) {
					googleReader.sideBarFavicon();
				}
			}

		},
		sideBarFavicon : function() {
			getAlls('id("sub-tree")//span[contains(@class,"sub-icon")]').forEach(function(e) {
				if (e.parentNode.firstChild.nodeName.toLowerCase() === 'img') {
					return;
				}
				var title = e.nextSibling;
				var match = ellipsis(title.firstChild.textContent);
				title.style.paddingLeft = '7px';
				var icon = document.createElement('img');
				icon.className = 'grf-favicon grf-sidebar';
				icon.title = match;
				e.parentNode.insertBefore(icon, e);
				e.parentNode.removeChild(e);

				if (FAVICON.hasOwnProperty(match)) {
					icon.src = FAVICON[match].icon;
				} else {
					icon.src = FAVICON_DEFAULT_IMG;
				}
				icon.removeEventListener('error', revertFavicon, false);
				icon.addEventListener('error', revertFavicon, false);
			});
		},
		addBaseCss : function() {
			GM_addStyle("img.entry-favicon{ width:16px !important; height:16px !important; border:none !important; margin-right:5px}.collapsed img.entry-favicon{ position:absolute !important; top:3px !important; left:1.6em !important; margin-right:0px !important; vertical-align:baseline !important}#entries.list .collapsed .entry-main .entry-source-title{ left:3.25em !important; width:9em !important}#sub-tree a img{ width:16px; height:16px; border:none; vertical-align:middle}#entries.list .collapsed .entry-secondary{ margin:0 8.5em 0 14em !important}#entries.single-source .collapsed .entry-source-title{ display:block !important}.colorful-view-content{ color:#EEE !important}.colorful-view-base-top-shadow{ background-color:#999 !important; border-bottom-color:#888 !important}.colorful-view-inner-box{ background-color:#777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888 !important}.colorful-view-base-pos{ background-color:#777 !important; border-color:#888 !important}");
		},
		addListViewCss : function() {
			GM_addStyle("#entries.list .read .collapsed{opacity:0.6}#entries.list .entry .collapsed:hover{background:#C2CFF1}#entries.list .read .collapsed:hover{opacity:1.0;background:#C2CFF1}");
		},
		showButton : function() {
			var insert = document.getElementById('stream-prefs-menu');
			var div = document.createElement('div');
			var divStyle = div.style;
			divStyle.marginLeft = '0.5em';
			div.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-button-tight viewer-buttons';
			div.setAttribute('tabindex', '0');
			div.setAttribute('role', 'wairole:button');
			div.innerHTML = '<div class="goog-button-base-outer-box goog-inline-block"><div class="goog-button-base-inner-box goog-inline-block"><div class="goog-button-base-pos"><div class="goog-button-base-top-shadow">&nbsp;</div><div class="goog-button-base-content"><div class="goog-button-body">Preferences</div></div></div></div></div>';
			insert.parentNode.insertBefore(div, insert.nextSibling);
			var me = this;
			div.addEventListener('click', function(e) {
				me.myport.postMessage( {
					message : "openprefs"
				});
			}, false);
		},
		attachMenu : function() {
			var me = this;
			document.body.addEventListener('DOMNodeInserted', function(e) {
				var target = e.target;
				if (!target.grfm && target.className && target.className.indexOf("goog-menu") >= 0) {
					target.grfm = "1";
					target.addEventListener('DOMNodeInserted', function(e) {
						var node = e.target;
						if (target.grfm !== "2") {
							setTimeout(function() {
								me.showMenuItem(target, me);
							}, 500);
							target.grfm = "2";
						}
					}, false);
				}
			}, false);
		},
		showMenuItem : function(menu, scope) {
			if (!menu) {
				return;
			}
			var seps = menu.getElementsByClassName('goog-menuseparator');
			if (seps && seps.length > 0) {
				var sep = seps[0];
				var div = document.createElement('div');
				div.className = 'goog-menuitem goog-option grf-menuitem';
				div.innerHTML = '<div class="goog-menuitem-content">Manual favicon</div>';
				sep.parentNode.insertBefore(div, sep.nextSibling);
				var separator = document.createElement('div');
				separator.className = 'goog-menuseparator';
				div.parentNode.insertBefore(separator, div.nextSibling);
				var me = this;
				div.addEventListener('click', function(e) {
					var node = document.getElementsByClassName('menu-open')[0];
					var img = node.firstChild;// grf-favicon
						// grf-sidebar
						var title;
						if (img.tagName === "IMG") {
							title = img.title;
						} else {
							// img not there, used 2nd span.name/@title
							title = img.nextSibling.title;
						}
						var f = FAVICON[title];
						if (f) {
							me.setdomain( {
								domain : f.url,
								title : title,
								FAVICON : FAVICON
							});
							// googleReader.updateFavicon(f.url, title, f.icon);
							alert('Site "' + f.url + '" added');
							// ->iconget
						} else {
							alert('Cannot found favicon for "' + title + '"');
						}
						// hide menu
						menu.blur();
						node.focus();
					}, false);
				div.addEventListener('mouseover', function(e) {
					e.target.parentNode.className += ' goog-menuitem-highlight';
				}, false);
				div.addEventListener('mouseout', function(e) {
					e.target.parentNode.className = e.target.parentNode.className.replace('goog-menuitem-highlight', '');
				}, false);
			}
		}
	};

	googleReader.init();

	function revertFavicon(event) {
		this.src = FAVICON_DEFAULT_IMG;
	}

	function setValue() {
		// GM_setValue('googleReaderInformation', uneval(GOOGLE_READER_INFO));
		GOOGLE_READER_INFO.icon = FAVICON;
		GM_setValue('googleReaderInformation', JSON.stringify(GOOGLE_READER_INFO));
	}
	function clearDomains() {
		GM_setValue('domains', '');
	}
	function clearCache() {
		GM_setValue('googleReaderInformation', '');
	}
	function ellipsis(text) {
		var match = text;
		if (match.length > 24) {
			match = match.substr(0, 21) + '...';
		}
		return match;
	}
	function getAlls(exp, ctx) {
		var xp = (ctx && ctx.ownerDocument || document).evaluate(exp, ctx || document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null), r = [];
		for ( var i = 0; i < xp.snapshotLength; ++i) {
			r.push(xp.snapshotItem(i));
		}
		return r;
	}

})();
