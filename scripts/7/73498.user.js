// ==UserScript==
// @name           Kaskus Spoiler Alert
// @namespace      http://userscripts.org/scripts/show/73498
// @description    add a warning message when a spoiler contains hidden link
// @include        */showthread.php*
// @include        */showpost.php*
// @include        */group.php*
// @include        *.kaskus.*/thread/*
// @include        *.kaskus.*/post/*
// @include        *.kaskus.*/show_post/*
// @version        2.6
// @author         arifhn
// ==/UserScript==
/**
 * 
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 * 
 * Changelog:
 * ==========
 * 
 * 2.6
 * - fix new kaskus
 * - add setting key into greasemonkey/tampermonkey menu
 * 
 * 2.5
 * - fix button width on kaskus beta
 *  
 * 2.4
 * - support livebeta.kaskus.us
 * 
 * 2.3
 * - change shortcut for setting, now use Ctrl+Alt+S
 * - fix update notification
 * 
 * 2.2
 * - add settings for enable/disable link preview
 * - add close button to popup box
 * 
 * 2.1 fix bug on Firefox 3.6.x
 * 
 * 2.0
 * - rewrite source code
 * - support Firefox 6 - support IDWS
 * 
 * 1.20
 * add button 'Show All' at top & bottom thread. 
 * This button can show/hide all spoiler in current page
 * 
 * 1.19
 *  - add browser support Firefox 5.x
 *  - add html tag id (now easy to identify html tag created by KSA)
 * 
 * 1.18
 * fix bug: hidden link not detected if bbcode contains space/text between
 * URL and SPOILER, sample bbcode:
 * [URL=http://www.foo.com/#] extra space
 * [SPOILER=bar]lol[/SPOILER][/URL]
 * thanks to tuxie.forte
 * 
 * 1.17
 * add new feature: preview URL (title + original link)
 * 
 * 1.16
 * add browser support Firefox 4.x
 * 
 * 1.15
 * - support any standard vbulletin forum (tested on kaskus.us, indoforum.org)
 * - change all warning messages to english - add script update notification
 * 
 * 1.14
 * support google chrome
 * 
 * 1.13
 * add http://www.kaskus.us/group.php* to @include and
 * change the script to support it
 * 
 * 1.12
 * fix bug: link alert (too sensitive, now only check domain name)
 * 
 * 1.11
 * - scroll page to closed spoiler after 'Hide All' clicked
 * - hide button Show/Hide All if post contains 1 spoiler
 * - add new feature: fake link alert (show info if link text not equal to
 *   link url)
 * 
 * 1.10
 * add http://www.kaskus.us/showpost.php* to @include,
 * thanks to hermawanadhis
 * 
 * 1.9
 * revert back to 1.7 design with two button ('Show All' and 'Show') and
 * remove the popup menu
 * 
 * 1.8
 * - move 'Show All' and 'Show Children' button into popup menu
 * - fixed bug: button label 'Show'/'Hide'
 * 
 * 1.7
 * - change button 'Show All' -> 'Show Children' (open/close child spoiler)
 * - add button 'Show All' (open/close all spoilers)
 * 
 * 1.6
 * add button 'Show All' to open/close all child spoiler
 * 
 * 1.5
 * exclude kaskus smiley from picture counter
 * 
 * 1.4
 * add new feature: show how many picture and spoiler inside spoiler
 * 
 * 1.3
 * rewrite link detection thanks to "p1nk3d_books"
 * 
 * 1.2
 * fixed bug, hidden link not detected if font color changed thanks to
 * "p1nk3d_books"
 * 
 * 1.1
 * remove link from spoiler and show the hidden link thanks to "firo sXe"
 * (kaskusid 650045)
 * 
 * 1.0
 * first release
 * 
 */
(function() {
	var script = {
			srcurl : 'http://userscripts.org/scripts/source/73498.user.js',
			version : '2.6',
			metaurl : 'http://userscripts.org/scripts/source/73498.meta.js',

			checkUpdate : function() {
				// 12 hour = (12 hour * 60 * 60 * 1000 ms)
				var interval = 1000 * 60 * 60 * 12;
				var lastCheck = parseInt(script.getValue("KASKUS_SPA_LAST_CHECK", "0"));
				if (lastCheck + interval <= new Date().getTime()) {
					GM_xmlhttpRequest( {
						method : 'GET',
						url : script.metaurl,
						onload : function(response) {
							if (response.status == 200) {
								var onlineVersion = response.responseText
								.match(/@version(?:[^\d]+)([\d\.]+)/)[1];
								if (parseFloat(onlineVersion) > parseFloat(script.version)) {
									var c = confirm("Kaskus Spoiler Alert released a new version "
											+ onlineVersion
											+ ", do you want to update?");
									if (c) {
										window.location.href = script.srcurl;
									}
								}
							}
							script.putValue("KASKUS_SPA_LAST_CHECK", new Date()
							.getTime()
							+ "");
						}
					});
				}
			},


			putValue: function(key, value) {
				if(typeof window.localStorage != 'undefined') {
					localStorage[key] = value;
				}else {
					GM_setValue(key, value);
				}
			},

			getValue: function(key, defValue) {
				if(typeof window.localStorage != 'undefined') {
					ret = localStorage[key];
					if(ret == null) {
						ret = defValue;
					}
					return ret;
				}else {
					return GM_getValue(key, defValue);
				}
				return defValue;
			}
	};

	// returns true if string contains s
	String.prototype.contains = function(s) {
		return (this.indexOf(s) != -1);
	};

	// returns true if string starts with s
	String.prototype.startsWith = function(s) {
		return (this.substring(0, s.length) == s);
	};

	String.prototype.escapeHTML = function() {
		return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g,
		"&gt;");
	};
	/*
	 * // dont run in frames, prevents detection and misuse of unsafewindow try {
	 * var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;
	 * if(unsafeWindow.frameElement != null) return; } catch(e) {}
	 */

	// setup images array
	var imgs = {
			btShowAll : 'data:image/gif;base64,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',
			btHideAll : 'data:image/gif;base64,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'
	};

	var URL = {
			// Returns the filename component of the path
			// + original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
			// * example 1: basename('/www/site/home.htm', '.htm'); // * returns 1:
			// 'home'
			// * example 2: basename('ecra.php?p=1');
			filename : function(path) {
				var suffix = null;
				var tailcut = "\\?";

				var b = path.replace(/^.*[\/\\]/g, '');
				if (typeof (suffix) == 'string'
					&& b.substr(b.length - suffix.length) == suffix)
					b = b.substr(0, b.length - suffix.length);
				if (typeof (tailcut) == 'string')
					b = b.replace(new RegExp(tailcut + ".*$", "g"), '');
				return b;
			},
			domain : function(url) {
				var m = url.match(/(http:\/\/[^?\/]+)/);
				if (m) {
					return m[1];
				}
				return null;
			}
	};

	function getCurrentYPos() {
		if (document.body && document.body.scrollTop)
			return document.body.scrollTop;
		if (document.documentElement && document.documentElement.scrollTop)
			return document.documentElement.scrollTop;
		if (window.pageYOffset)
			return window.pageYOffset;
		return 0;
	}

	function click(elm) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, true);
		elm.dispatchEvent(evt);
	}

	// Utility function for mouseout listener
	function isChildOf(parent, child) {
		if (child != null) {
			while (child.parentNode) {
				if ((child = child.parentNode) == parent) {
					return true;
				}
			}
		}
		return false;
	}

	function getElement(q, root, single) {
		if (root && typeof root == 'string') {
			root = $(root, null, true);
			if (!root) {
				return null;
			}
		}
		root = root || document;
		if (q[0] == '#') {
			return root.getElementById(q.substr(1));
		} else if (q[0] == '/' || (q[0] == '.' && q[1] == '/')) {
			if (single) {
				return document.evaluate(q, root, null,
						XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			} else {
				var i, r = [], x = document.evaluate(q, root, null,
						XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
				while ((i = x.iterateNext()))
					r.push(i);
				return r;
			}
		} else if (q[0] == '.') {
			return root.getElementsByClassName(q.substr(1));
		}
		return root.getElementsByTagName(q);
	}

	function VBLink(el, parent, idx) {
		this.id = 'KSA-link-' + parent.id + '-' + idx;
		this.element = el;
		this.vbPost = parent;

		this.noPreviewURL = function() {
			var configLinkPreview = script.getValue("KSA_LINK_PREVIEW", "true");
			if(configLinkPreview == 'false') {
				return true;
			}
			var is_ff = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			if (!is_ff) { // disable preview URL on browser other than firefox
				return true;
			}
			var url = this.element.href;
			var blacklist = new Array('/\.exe$/', '/\.rar$/', '/\.7z$/',
					'/\.mp3$/', '/\.zip$/',
			'/^http:\/\/report.kaskusnetworks.com\/index\.php\/laporhansip/');
			for ( var i = 0; i < blacklist.length; ++i) {
				var p = new RegExp(blacklist[i]);
				if (p.test(url)) {
					return true;
				}
			}
			var pid = this.vbPost.id.match(/([0-9]+)/)[1];
			if (url.contains(pid)) {
				return true;
			}
			if (url.contains('/member.php?')) {
				return true;
			}
			if (this.element.innerHTML
					.contains('http://static.kaskus.us/images/buttons/viewpost.gif')) {
				return true;
			}
			return false;
		};

		this.showPreview = function(event) {
			if (event.pageX || event.pageY) {
				posx = event.pageX;
				posy = event.pageY;
			} else if (event.clientX || e.clientY) {
				posx = event.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
				posy = event.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
			}
			var top = (posy + 20) + 'px';
			var left = (posx - 50) + 'px';
			if (!this.contentTitle) {
				GM_xmlhttpRequest( {
					vbLink : this,
					method : 'GET',
					url : this.element.href,
					onerror : function(rsp) {
						this.vbLink.contentTitle = 'Error';
						this.vbLink.contentURL = 'Invalid or blocked URL';
						VBPage.showPopup(left, top, this.vbLink.contentTitle,
								this.vbLink.contentURL + '<br/><br/><font color="red">Now you can enable/disable this feature (press Ctrl+Alt+S for setting)</font>');
					},
					onload : function(rsp) {
						if (rsp.status == 200) {
							this.vbLink.contentTitle = rsp.finalUrl;
							this.vbLink.contentURL = rsp.finalUrl;
							var patt = new RegExp("<title>([^<]*)</title>", "i");
							var title = patt.exec(rsp.responseText);
							if (title) {
								this.vbLink.contentTitle = title[1];
							}
						} else {
							this.vbLink.contentTitle = 'Error';
							this.vbLink.contentURL = 'Invalid or blocked URL';
						}
						VBPage.showPopup(left, top, this.vbLink.contentTitle,
								this.vbLink.contentURL + '<br/><br/><font color="red">Now you can enable/disable this feature (press Ctrl+Alt+S for setting)</font>');
					}
				});
			} else {
				VBPage.showPopup(left, top, this.contentTitle, this.contentURL + '<br/><br/><font color="red">Now you can enable/disable this feature (press Ctrl+Alt+S for setting)</font>');
			}
		};

		this.hidePreview = function(event) {
			var a = this.element;
			var current_mouse_target = null;
			if (event.toElement) {
				current_mouse_target = event.toElement;
			} else if (event.relatedTarget) {
				current_mouse_target = event.relatedTarget;
			}
			// Code inside this if is executed when leaving the link and it's
			// children, for good
			if (a != current_mouse_target
					&& !isChildOf(a, current_mouse_target)) {
				VBPage.hidePopup();
			}
		};

		this.setupKSA = function(index) {
			var btn = getElement('.//input[@type="button" and @value="Show"]',
					this.element);
			if (btn.length > 0) { // kalau ada button 'Show' berarti spoiler
				// jebakan
				// move children element of the link to its parent node
				var achildren = this.element.childNodes;
				var n = achildren.length;
				for ( var k = 0; k < n; ++k) {
					this.element.parentNode.insertBefore(achildren[0],
							this.element);
				}
				// change link title to another text
				this.element.innerHTML = '&nbsp;&nbsp;Hidden Link >> ' + this.element.href
				.escapeHTML();
				this.element.style.color = 'red';
				this.element.style.textDecoration = 'none';
				this.element.id = this.id + '-trap';
				btn[0].parentNode.appendChild(this.element);
			} else {
				// cek link jebakan
				var patt = new RegExp("^\s*http:\/\/[^?\/]+", "i");
				this.title = patt.exec(this.element.innerHTML.trim());
				this.url = patt.exec(this.element.href);
				// kalo innerHTML starts with http dan gak sama dgn href
				if (this.title && this.url
						&& this.title.toString() != this.url.toString()) {
					// buat info link jebakan
					var info = document.createElement('span');
					info.id = this.id + '-info';
					info.className = 'smallfont';
					info.style.color = 'red';
					info.innerHTML = '&nbsp;&nbsp;Original Link >> ' + this.element.href;
					if (this.element.nextSibling) {
						this.element.parentNode.insertBefore(info,
								this.element.nextSibling); // add info to page
					} else {
						this.element.parentNode.appendChild(info);
					}
				}
				if (!this.noPreviewURL()) {
					this.element.vbLink = this;
					this.element.setAttribute('linkid', this.id);
					this.element.addEventListener('mouseover', function(event) {
						if (this.vbLink) {
							this.vbLink.showPreview(event);
						} else {
							VBPage.getLink(this.getAttribute('linkid'))
							.showPreview(event);
						}
					}, false);
					this.element.addEventListener('mouseout', function(event) {
						if (this.vbLink) {
							this.vbLink.hidePreview(event);
						} else {
							VBPage.getLink(this.getAttribute('linkid'))
							.hidePreview(event);
						}
					}, false);
				}
			}
		};
	}

	function VBSpoiler(el, parent, idx) {
		if (parent != 'none') {
			this.id = 'KSA-spoiler-' + parent.id + '-' + idx;
			el.id = 'KSA-spoiler-' + parent.id + '-' + idx;
		}
		this.element = el;
		this.vbPost = parent;
		this.content = getElement(
				'.//div//div[starts-with(@style,"display:")]', el, true);

		// check wether this is top spoiler in current post
		this.isTopSpoiler = function() {
			return null;// this.vbPost != 'none';
		};

		// +++++++++++++++++++++++++++++++++++++++++++++++++++ KSA functions

		this.showClick = function(str) {
			if (str == 'Show') {
				this.btShow.value = 'Hide';
				this.btShowAll.value = 'Hide All';
				this.content.style.display = '';
			} else {
				this.btShow.value = 'Show';
				this.btShowAll.value = 'Show All';
				this.content.style.display = 'none';
			}
			var bt = getElement('.//input[@type="button"]', this.element);
			for ( var i = 0; i < bt.length; ++i) {
				if (bt[i].value == str && bt[i] != this.btShow
						&& bt[i] != this.btShowAll) {
					click(bt[i]);
				}
			}
			/*
			 * if(str.contains('Hide') && this.isTopSpoiler) {
			 * this.element.scrollIntoView(true); }
			 */
		};

		this.setupKSA = function() {
			this.innerSpoilers = getElement(
					'.//div[contains(@id,"KSA-spoiler-")]', this.element).length;

			// get button Show
			this.btShow = getElement(
					'.//input[@type="button" and @value="Show"]', this.element,
					true);
			this.btShow.vbSpoiler = this;
			this.btShow.setAttribute('spoilerid', this.id);
			this.btShow.removeAttribute('onclick');
			this.btShow.setAttribute('style', 'margin: 2px; font-size: 10px; padding: 2px; width: 60px !important');
			this.btShow.addEventListener('click', function() {
				if (this.vbSpoiler) {
					this.vbSpoiler.showClick(this.value);
				} else {
					VBPage.getSpoiler(this.getAttribute('spoilerid'))
					.showClick(this.value);
				}
			}, true);

			// add button Show All
			this.btShowAll = document.createElement('input');
			this.btShowAll.value = "Show All";
			this.btShowAll.type = 'button';
			this.btShowAll.title = 'Show/Hide all spoilers';
			this.btShowAll.setAttribute('style', 'margin: 2px; font-size: 10px; padding: 2px; width: 60px !important');
			this.btShowAll.vbPost = this.vbPost;
			this.btShowAll.setAttribute('postid', this.vbPost.id);
			this.btShowAll.addEventListener('click', function() {
				if (this.vbPost) {
					// substring to remove 'All'
					this.vbPost.showAllClick(this.value.substring(0, 4));
				} else {
					VBPage.getPost(this.getAttribute('postid')).showAllClick(
							this.value.substring(0, 4));
				}
			}, true);
			this.btShow.parentNode.insertBefore(this.btShowAll, this.btShow);

			var infoMsg = '';
			// cek jumlah gambar dalam spoiler
			var imgs = getElement('.//img', this.element);
			if (imgs.length > 0) {
				var maxSize = 0;
				var idx = -1;
				var totalGambar = 0;
				for ( var k = 0; k < imgs.length; ++k) {
					if (imgs[k].src
							.indexOf('http://static.kaskus.us/images/smilies') == -1) { // ignore
						// kaskus
						// smiley
						var size = imgs[k].width * imgs[k].height;
						if (size > 3000) { // ignore icon < 50x50
							if (maxSize < size) {
								maxSize = size;
								idx = k;
							}
							++totalGambar;
						}
					}
				}
				if (totalGambar > 0) {
					infoMsg = totalGambar + ' pics inside (max: '
					+ imgs[idx].width + 'x' + imgs[idx].height + ') ';
				}
			}
			if (this.innerSpoilers > 0) {
				if (infoMsg.length > 0) {
					infoMsg += ', ';
				}
				infoMsg += this.innerSpoilers + ' spoiler(s)';
			}
			// tampilkan info
			if (infoMsg.length > 0) {
				var info = document.createElement('span');
				info.id = this.id + '-info';
				info.className = 'smallfont';
				info.style.color = 'darkblue';
				info.innerHTML = infoMsg;
				var anchor = getElement('.//div[@class="alt2"]', this.element,
						true);

				this.element.insertBefore(info, anchor);
			}
		};
	}

	function VBPost(el) {
		this.id = el.id;
		this.element = el;

		// return all spoilers in this post
		this.getSpoilers = function() {
			var ret = [];
			var el = getElement(
					'.//div[contains(@style,"margin")]//input[@type="button" and @value="Show"]',
					this.element);
			for ( var i = 0; i < el.length; ++i) {
				var sp = el[i].parentNode.parentNode;
				ret.push(new VBSpoiler(sp, this, i));
			}
			return ret;
		};

		this.getSpoiler = function(id) {
			for ( var i = 0; i < this.spoilers.length; ++i) {
				if (this.spoilers[i].id == id) {
					return this.spoilers[i];
				}
			}
		};

		this.getLinks = function() {
			var ret = [];
			var el = getElement('.//a', this.element);
			for ( var i = 0; i < el.length; ++i) {
				var l = el[i];
				ret.push(new VBLink(l, this, i));
			}
			return ret;
		};

		this.getLink = function(id) {
			for ( var i = 0; i < this.links.length; ++i) {
				if (this.links[i].id == id) {
					return this.links[i];
				}
			}
		};

		this.showAllClick = function(str) {
			for ( var i = 0; i < this.spoilers.length; ++i) {
				this.spoilers[i].showClick(str);
			}
			/*
			 * if(str.contains('Hide')) { this.element.scrollIntoView(true); }
			 */
		};

		this.setupKSA = function() {
			this.spoilers = this.getSpoilers();
			for ( var i = 0; i < this.spoilers.length; ++i) {
				this.spoilers[i].setupKSA(i);
			}
			if (this.spoilers.length == 1) {
				// hide btn 'show all' if there is only 1 spoiler
				this.spoilers[0].btShowAll.style.display = 'none';
			}
			this.links = this.getLinks();
			for ( var i = 0; i < this.links.length; ++i) {
				this.links[i].setupKSA(i);
			}
		};
	}

	// VBulletin page
	var VBPage = {
			getPosts : function() {
				var ret = [];

				if (URL.filename(location.href) == 'group.php') {
					var el = getElement('.//*[starts-with(@id,"gmessage_text")]');
					for ( var i = 0; i < el.length; ++i) {
						ret.push(new VBPost(el[i]));
					}
				} else {
					var el = getElement('.//*[starts-with(@id,"post")]');
					var pattern = new RegExp('^post_?[0-9a-f]+$'); // match post1234abc or
					// post_1234
					for ( var i = 0; i < el.length; ++i) {
						if (pattern.test(el[i].id)) {
							ret.push(new VBPost(el[i]));
						}
					}
				}
				return ret;
			},

			getPost : function(id) {
				for ( var i = 0; i < this.posts.length; ++i) {
					if (this.posts[i].id == id) {
						return this.posts[i];
					}
				}
			},

			getSpoiler : function(id) {
				var ids = id.split('-');
				return this.getPost(ids[2]).getSpoiler(id);
			},

			getLink : function(id) {
				var ids = id.split('-');
				return this.getPost(ids[2]).getLink(id);
			},

			showPopup : function(x, y, title, content) {
				this.popup.style.top = y;
				this.popup.style.left = x;
				this.popup.innerHTML = '<table cellspacing="1" width="350px"><tr><td class="thead"><b>'
					+ title
					+ '</b><div style="float:right"><a id="ksaClosePopup">x</a></div></td></tr><tr><td class="vbmenu_option vbmenu_option_alink">'
					+ content + '</td></tr></table>';
				this.popup.style.display = '';

				getElement('#ksaClosePopup').addEventListener('click', function() {
					VBPage.hidePopup();
				}, true);
			},

			hidePopup : function() {
				this.popup.style.display = 'none';
			},

			showAllClick : function(str) {
				for ( var i = 0; i < this.posts.length; ++i) {
					this.posts[i].showAllClick(str);
				}
				for ( var i = 0; i < this.imgShowAll.length; ++i) {
					if (str == 'Show') {
						this.imgShowAll[i].setAttribute('ksa-action', 'Hide');
						this.imgShowAll[i].src = imgs.btHideAll;
					} else {
						this.imgShowAll[i].setAttribute('ksa-action', 'Show');
						this.imgShowAll[i].src = imgs.btShowAll;
					}
				}
			},

			popupSettings : function() {
				var top = (parseInt(getCurrentYPos()) + (document.documentElement.clientHeight/2) - 100) + 'px';
				var left = parseInt( Math.round((document.documentElement.clientWidth/2) - 200) ) + 'px';
				var configLinkPreview = script.getValue("KSA_LINK_PREVIEW", 'true') == 'true'?'checked':'';
				VBPage.showPopup(left, top, "KSA Setting", '<input name="KSA_LINK_PREVIEW" type="checkbox" class="ksa_settings" '+configLinkPreview+'>Show Link Preview<br/><br/><font color="red">*refresh page after change settings</font>');
				var el = getElement('.ksa_settings');
				for(var i = 0; i < el.length; ++i) {
					el[i].addEventListener('click', function() {
						script.putValue(this.getAttribute('name'), this.checked);
					}, true);
				}
			},

			onKeyDown : function(event) {
				// Ctrl+Alt+S
				if (event.ctrlKey && event.altKey && event.keyCode == 83) {
					VBPage.popupSettings();
				}
			},

			setupKSA : function() {
				this.posts = this.getPosts();
				for ( var i = 0; i < this.posts.length; ++i) {
					this.posts[i].setupKSA();
				}

				this.popup = document.createElement('div');
				this.popup.setAttribute('class', 'vbmenu_popup');
				this.popup.style.display = 'none';
				this.popup.style.position = 'absolute';
				this.popup.style.top = '50px';
				this.popup.style.left = '50px';
				this.popup.style.backgroundColor = '#eeeeee';
				getElement('body')[0].appendChild(this.popup);

				// add button show all at top and bottom thread
				this.imgShowAll = [];
				var anchor = getElement('.//img[@alt="Reply" and @title="Reply"]');
				for ( var i = 0; i < anchor.length; ++i) {
					var showAll = document.createElement('img');
					showAll.setAttribute('ksa-action', 'Show');
					showAll.src = imgs.btShowAll;
					showAll.addEventListener('click', function() {
						var act = this.getAttribute('ksa-action');
						VBPage.showAllClick(act);
					}, false);
					this.imgShowAll.push(showAll);
					anchor[i].parentNode.parentNode.appendChild(showAll);
				}

				// add keyboard listener
				window.addEventListener('keydown', function(e) {
					VBPage.onKeyDown(e);
				}, true);
				
				if(GM_registerMenuCommand != 'undefined') {
					GM_registerMenuCommand("KSA Setting", VBPage.popupSettings);
				}
			}
	};

	script.checkUpdate();
	VBPage.setupKSA();
})();
