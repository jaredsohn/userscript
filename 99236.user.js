// ==UserScript==
// @name           New twitter preview extender
// @namespace      ntpext
// @description    Extend preview supports in new twitter / 新デザインのTwitterにプレビュー可能サイトを追加
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @author         Vilart
// @version        20121210-001
// @grant		   GM_xmlhttpRequest
// ==/UserScript==

(function(){
	// fly Twitter
	var flyTwitter = false;
	if (document.getElementById("doc")) flyTwitter = true;

	// Chrome用
	var isChromeExtension = function() { return (typeof chrome == 'object') && (typeof chrome.extension == 'object') }

	// Greasemonkey用
	var isGreasemonkey = (typeof GM_xmlhttpRequest == "function") && (!isChromeExtension()) && (!window.opera);

	// Twitterネイティブに機能を追加するためのスクリプト
	var twitterReady = function(callback, afterReady, data) {
		var uniqueId, correctId;

		var func = function() {
			var interval;
			var loopTimer = 200;
			var intervalFunc = function() {
				var ok = false;
				if (window.phx) {
			 	    if (callback()) {
			 	    	var custom = 0;
			 	    	ok = true;
			 	    }
				}
				if (!ok) interval = setTimeout(intervalFunc, loopTimer);
		 	}
			interval = setTimeout(intervalFunc, loopTimer);
		}
		var funcStr = func.toString().replace(/callback\(\)/, "callback(" + JSON.stringify(data) + ")");

		if (afterReady) {
			uniqueId = Math.floor(Math.random() * 2147483647);
			correctId = Math.floor(Math.random() * 2147483647);
			
			var lockerName = "_x_gm_twready_locker_" + uniqueId;
			var openerName = "_x_gm_twready_opener_" + correctId;

			var locker = document.createElement("div");
			locker.setAttribute("id", lockerName);
			locker.setAttribute("style", "display:none;");
			document.body.appendChild(locker);
			
			locker.addEventListener("DOMNodeInserted", function(e) {
				var isErase = false;
				for (var i = 0; i < locker.childNodes.length; i++) {
					if (locker.childNodes[i].id == openerName) { isErase = true; break; }
				}
				if (isErase) {
					document.body.removeChild(locker);
					afterReady();
				}
			}, false);

			funcStr = funcStr.replace(/var custom = 0;/, 'var e=document.createElement("span");e.setAttribute("id","'+openerName+'");document.getElementById("'+lockerName+'").appendChild(e);');
		}

		var callbackStr = callback.toString();
		if (window.opera) callbackStr = callbackStr.replace(/</g, "&lt;").replace(/>/g, "&gt;");

		var script = document.createElement("script");
		script.innerHTML = "(function(){var callback="+callbackStr+";("+funcStr+")();})();";
		document.body.appendChild(script);
	}

	// XSXHR 使用サイト用処理
	var getXSXHR = function(element, args) {
		args._element = element;

		if (args._beforeload) args._beforeload(args);
		if (args._url) {
			var _mt = args._method ? args._method.toUpperCase() : "GET";
			var _hds = args._headers ? args._headers : {};
			if (_mt == "POST") {
				_hds["Content-type"] = "application/x-www-form-urlencoded";
			}
			
			var _pst = null;
			if (args._posts) {
				_pst = "";
				for(var p in args._posts) {
					_pst += p + "=" + args._posts[p] + "&";
				}
				_pst = _pst.slice(0, -1);
			}
			
			GM_xmlhttpRequest({
				method: _mt,
				url: args._url,
				headers: args._headers,
				data: _pst,
				onload: function(e) {
					args._text = e.responseText;
					args._loaded(args);
				}
			});
		} else {
			args._loaded(args);
		}
	}
	
	var unescapeHTML = function(stt) {
		var div = document.createElement('div');
		div.innerHTML = stt
		return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
	}

	var makeCallbackEvent = function(targetElement, dataObject) {
		var event = document.createEvent("MessageEvent");
		event.initMessageEvent("GM_NTPE_Callback", true, false, JSON.stringify(dataObject), "", "", null);
		targetElement.dispatchEvent(event);
	}

	// XSXHR サイト
	var xsxhrs = {
		twitpaint: {
			attributes: { "data-id": "id" },
			url: function(attributes) { return "http://twitpaint.com/" + attributes.id; },
			loaded: function(data) {
				var m = data._text.match(/\'flashvars\'\s*\,\s*\'img(?:rul|url)=(.+?)[\&\']/);
				if (m) makeCallbackEvent(data._element, { src: m[1] });
			}
		},
		drawtwit: {
			attributes: { "data-id": "id" },
			url: function(attributes) { return "http://drawtwit.com/" + attributes.id; },
			loaded: function(data) {
				var m = data._text.match(/\"(http:\/\/drawtwit\.com\/.+?)\".*?class=\"[\w\s]?pic[\w\s]?\"/);
				if (m) makeCallbackEvent(data._element, { src: m[1] });
			}
		},
		eventjot: {
			attributes: { "data-href": "href" },
			url: function(attributes) { return attributes.href; },
			loaded: function(data) {
				var m = data._text.match(/<img[\s\S]*?src=\"(http:\/\/eventjot\.com\/images\/\d+\/\d+\/\d+\/original\.(?:jpe?g|png|gif))\"[\s\S]*?>/);
				if (m) makeCallbackEvent(data._element, { src: m[1] });
			}
		},
		movapic: {
			attributes: { "data-href": "href" },
			url: function(attributes) { return attributes.href; },
			loaded: function(data) {
				var m = data._text.match(/<img[\s\S]*?src=\"(http:\/\/image\.movapic\.com\/pic\/m_\w+\.(?:jpe?g|png|gif))\"[\s\S]*?>/);
				if (m) makeCallbackEvent(data._element, { src: m[1] });
			}
		}
	}

	twitterReady(function(preData){
		if (!phx.mediaType) return false;

		var setCallbackEvent = function(targetElement, callbackFunction) {
			if(targetElement instanceof jQuery) targetElement = targetElement.get(0);

			targetElement.addEventListener("GM_NTPE_Callback", function(e) {
				var data = JSON.parse(e.data);
				data.element = targetElement;

				callbackFunction(data);
			}, false);
		}

		// SWFObject を仕込む
		$("head").append('<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>');

		var Mustache = {
			to_html: function(a,b) {
				var c = a.replace(/\{{2,}/g, "{").replace(/\}{2,}/g, "}");
				return phx.util.supplant(c,b);
			}
		}

		// ニコニコ動画
		phx.mediaType("ニコニコ動画", {
			icon: "video",
			domain: "http://www.nicovideo.jp",

			matchers: {
				tinyUrl: /^#{protocol}?nico.ms\/(([sn]m|fz|so)?\d+)/,
				standardUrl : /^#{optional_protocol}?nicovideo\.jp\/watch\/((?:[sn]m|fz|so)?\d+)/g
			},

			process: function(finished, options) {
				this.data.attribution_icon = "http://uni.res.nimg.jp/img/favicon.ico";
	            if (this.url.match(this.constructor.matchers.tinyUrl) || this.url.match(this.constructor.matchers.standardUrl)) {
                    this.data.id = RegExp.$1;
	                this.data.width = (options && options.maxwidth) || 390;
	                this.data.height = this.calcHeight(this.data.width);

					var ajaxURL = "http://ext.nicovideo.jp/thumb_watch/" + this.data.id;
					reqObject = { w: this.data.width, h: this.data.height }

					var that = this;

	                $.ajax({
	                    url: ajaxURL,
	                    dataType: "jsonp",
	                    data: reqObject,
	                    jsonp: "cb",
	                    success : function (resp) {
	                    	that.data.playerObj = resp;
	                    	finished();
	                    }
	                });
	            }
			},
			
			render: function(dom) {
	            var dt = this.data;

	        	dt.uniqueId = "nv-uid-" + Math.floor(Math.random() * 2147483647);
				var t = '<div class="gm_previewextender nicovideo" id="{{uniqueId}}"></div>';
	            $(dom).append(Mustache.to_html(t, dt));

	            dt.playerObj.write(dt.uniqueId);
			}
		});

		// ニコニコ静画
		phx.mediaType("ニコニコ静画", {
			icon: "photo",
			domain: "http://seiga.nicovideo.jp",

			matchers: {
				tinyUrl: /^#{protocol}?nico.ms\/im(\d+)/,
				standardUrl : /^#{protocol}?seiga\.nicovideo\.jp\/seiga\/im(\d+)/g
			},

			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
	            if (this.url.match(this.constructor.matchers.tinyUrl) || this.url.match(this.constructor.matchers.standardUrl)) {
	            	this.data.id = RegExp.$1;
					this.data.src = "http://seiga.nicovideo.jp/image/source?id=" + this.data.id;
					this.data.href = this.url;
					this.data.name = this.constructor._name;
                    finished();
	            }
			},
			
			render: function(dom) {
				var t = '<div class="gm_previewextender nicoseiga"><a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{src}}" /></a></div>';
	            $(dom).append(Mustache.to_html(t, this.data));
			}
		});

		// 携帯百景
		phx.mediaType("携帯百景", {
			icon: "photo",
			domain: "http://movapic.com",

			matchers: {
		        standardPhoto: /^#{protocol}?movapic\.com\/pic\/(\w+)/g,
		        directlink: /^#{protocol}?image\.movapic\.com\/pic\/[sm]_(\w+)\.(?:jpe?g|png|gif)/g,
		        permalink: preData.isGM ? /^#{protocol}?movapic\.com\/\w+\/pic\/(\d+)/g : /(?!)/
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = "http://assets.movapic.com/image/parts/favicon.gif";
				this.data.href = this.url.replace(/\/$/, "");
				this.data.name = this.constructor._name;

				if (this.url.match(this.constructor.matchers.permalink)) {
					this.data.src = undefined;
					finished();
				} else if (this.url.match(this.constructor.matchers.standardPhoto)) {
			    	this.data.formats = ["jpeg", "png", "gif", "jpg"];
					this.data.src = "http://image.movapic.com/pic/m_" + RegExp.$1 + ".jpeg";
					finished();
				} else if (this.url.match(this.constructor.matchers.directlink)) {
					this.data.src = this.data.href;
					finished();
				}
			},
			
			render: function(dom) {
				if (this.data.src) {
					var hl = '<div class="gm_previewextender movapic"><a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{src}}"/></a></div>';

					if (this.data.formats) {
			        	this.data.firstFormat = this.data.formats[0];
			        	this.data.formatsString = "['"+this.data.formats.join("','")+"']";

						hl = '<div class="gm_previewextender movapic"><a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{src}}" onerror="var _s=\'{{src}}\'.replace(/\\.(jpe?g|png|gif)$/g, \'\');var fs={{formatsString}};var nt=fs.length;for(var i=0;i<fs.length;i++){if (this.src.match(new RegExp(fs[i]+\'$\'))) { nt=i+1; } } if (nt<fs.length) { this.src=_s+\'.\'+fs[nt]; }"/></a></div>';
					}

	        	    $(dom).append(Mustache.to_html(hl, this.data));

				} else {
					$(dom).append(Mustache.to_html(
						'<div class="gm_previewextender unchecked movapic" data-href="{{href}}" style="display:none;"></div>'
					, this.data));

					var this_data = this.data;
					setCallbackEvent($(dom).find(".gm_previewextender"), function(data) {
						this_data.thumbnail = data.src;

						$(data.element)
							.attr("style", "")
							.html(Mustache.to_html(
								'<a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{thumbnail}}"/></a>'
								,this_data));
					});
				}
			}
		});

		// はてなフォトライフ
		phx.mediaType("はてなフォトライフ", {
			icon: "photo",
			domain: "http://f.hatena.ne.jp",

			matchers: {
		        standardPhoto: /^#{protocol}?f\.hatena\.ne\.jp\/([\w\-]+)\/(\d+)/g,
		        directLinkPhoto: /^#{protocol}?img\.f\.hatena\.ne\.jp\/images\/fotolife\/[\w\-]\/([\w\-]+)\/\d+\/(\d+)(?:_original)?\.(jpe?g|png|gif)/g
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";

				var pBool = false;
		        if (this.url.match(this.constructor.matchers.standardPhoto)) {
			    	this.data.id = RegExp.$1;
			    	this.data.dates = RegExp.$2;
			    	this.data.formats = ["jpg", "png", "jpeg", "gif"];
			    	pBool = true;
			    }
		        if (this.url.match(this.constructor.matchers.directLinkPhoto)) {
			    	this.data.id = RegExp.$1;
			    	this.data.dates = RegExp.$2;
			    	this.data.formats = [RegExp.$3];
			    	pBool = true;
		        }
		        if (pBool) {
					this.data.name = this.constructor._name;
					this.data.src = "http://img.f.hatena.ne.jp/images/fotolife/" + this.data.id.substr(0,1) + "/" + this.data.id + "/" + this.data.dates.substr(0,8) + "/" + this.data.dates;
					this.data.href = this.url;
			        finished();
				}
			},
			
			render: function(dom) {
	        	this.data.firstFormat = this.data.formats[0];
	        	this.data.formatsString = "['"+this.data.formats.join("','")+"']";

        	    var t = '<div class="gm_previewextender hatenafotolife"><a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{src}}.{{firstFormat}}" onerror="var _s=\'{{src}}\';var fs={{formatsString}};var nt=fs.length;for(var i=0;i<fs.length;i++){if (this.src.match(new RegExp(fs[i]+\'$\'))) { nt=i+1; } } if (nt<fs.length) { this.src=_s+\'.\'+fs[nt]; }"/></a></div>';
        	    $(dom).append(Mustache.to_html(t, this.data));
			}
		});

		// Instagram (暫定)
		phx.mediaType("Instagram (by Preview Extender)", {
			icon: "photo",
			domain: "http://instagram.com",

			matchers: {
				standardUrl : /^#{protocol}?(?:instagram\.com|instagr\.am)\/p\/(\w+)\/?/g
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
				if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.name = "Instagram";
					this.data.src = this.url;
					this.data.photoId = RegExp.$1
					finished();
				}
			},
			
			render: function(dom) {
				var t = '<div class="gm_previewextender instagram"><a class="inline-media-image" data-inline-type="{{name}}" href="{{src}}" target="_blank"><img src="http://instagr.am/p/{{photoId}}/media/?size=l" /></a></div>';
				$(dom).append(Mustache.to_html(t, this.data));
			}
		});

		// Gyazo
		phx.mediaType("Gyazo", {
			icon: "photo",
			domain: "http://gyazo.com",

			matchers: {
				standardUrl : /^(?:(#{protocol}?(?:cache.)?gyazo\.com\/\w+)(?:\.(\w{3,4}))?)/g
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
				if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.name = this.constructor._name;
					this.data.src = this.url;
			    	this.data.urlbody = RegExp.$1
			    	this.data.formats = (RegExp.$2) ? [RegExp.$2] : ["png", "jpg", "jpeg", "gif"];
					finished();
				}
			},
			
			render: function(dom) {
	        	this.data.firstFormat = this.data.formats[0];
	        	this.data.formatsString = "['"+this.data.formats.join("','")+"']";

        	    var t = '<div class="gm_previewextender gyazo"><a class="inline-media-image" data-inline-type="{{name}}" href="{{src}}" target="_blank"><img src="{{urlbody}}.{{firstFormat}}" onerror="var _s=\'{{urlbody}}\';var fs={{formatsString}};var nt=fs.length;for(var i=0;i<fs.length;i++){if (this.src.match(new RegExp(fs[i]+\'$\'))) { nt=i+1; } } if (nt<fs.length) { this.src=_s+\'.\'+fs[nt]; }"/></a></div>';
	            $(dom).append(Mustache.to_html(t, this.data));
			}
		});

		// ついっぷるフォト
		phx.mediaType("ついっぷるフォト", {
			icon: "photo",
			domain: "http://p.twipple.jp",

			matchers: {
				standardUrl : /^#{protocol}?p\.twipple\.jp\/(\w+)/g,
				directUrl: /^#{protocol}?p\.twipple\.jp\/data\/.+\.(?:jpg|jpeg)/g,
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
				this.data.name = this.constructor._name;

	            if (this.url.match(this.constructor.matchers.directUrl)) {
					this.data.photoId = RegExp.$1;
					this.data.src = this.url;
					this.data.thumb = this.data.src;
					finished();
				} else if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.photoId = RegExp.$1;
					this.data.src = this.url;
					this.data.thumb = "http://p.twipple.jp/show/large/" + this.data.photoId;
					finished();
				} 
			},
			
			render: function(dom) {
				var t = '<div class="gm_previewextender twipplePhoto"><a class="inline-media-image" data-inline-type="{{name}}" href="{{src}}" target="_blank"><img src="{{thumb}}"/></a></div>';
	            $(dom).append(Mustache.to_html(t, this.data));
			}
		});

		// yubitter
		phx.mediaType("yubitter", {
			label: "yubitter",
			icon: "photo",
			domain: "http://p.ybt.jp",

			matchers: {
				standardUrl : /^#{protocol}?(?:p\.ybt\.jp|yubitter-photo\.[\w\.]+amazonaws\.com)\/(\w+)\/(\w+)\.(?:jpe?g|png|gif)/g,
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = "http://yubitter.com/favicon.ico";
	            if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.name = this.constructor._name;
					this.data.userId = RegExp.$1;
					this.data.photoId = RegExp.$2;
					this.data.src = this.url;
					finished();
				}
			},
			
			render: function(dom) {
				var t = '<div class="gm_previewextender yubitter"><a class="inline-media-image" data-inline-type="{{name}}" href="{{src}}" target="_blank"><img src="{{src}}"/></a></div>';
	            $(dom).append(Mustache.to_html(t, this.data));
			}
		});

		/////////////////////// 以下Chrome/Opera環境未対応
		if (!preData.isGM) return true;

		// TwitPaint
		phx.mediaType("TwitPaint", {
			icon: "photo",
			domain: "http://twitpaint.com",

			matchers: {
				standardUrl: /^#{protocol}?twitpaint\.com\/(\w+)/ig
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
	            if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.id = RegExp.$1;
					this.data.name = this.constructor._name;
					this.data.href = this.url;
					finished();
				}
			},
			
			render: function(dom) {
				$(dom).append(Mustache.to_html(
					'<div class="gm_previewextender unchecked twitpaint" data-id="{{id}}" style="display:none;"></div>'
				, this.data));
				
				var this_data = this.data;
				setCallbackEvent($(dom).find(".gm_previewextender"), function(data) {
					this_data.thumbnail = data.src;

					$(data.element)
						.attr("style", "")
						.html(Mustache.to_html(
							'<a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{thumbnail}}"/></a>'
							,this_data));
				});
			}
		});

		// drawTwit
		phx.mediaType("DrawTwit", {
			label: "drawTwit",
			icon: "photo",
			domain: "http://drawtwit.com",

			matchers: {
				standardUrl: /^#{protocol}?drawtwit\.com\/(\w+)/ig
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = this.constructor.domain + "/favicon.ico";
	            if (this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.id = RegExp.$1;
					this.data.name = this.constructor._name;
					this.data.href = this.url;
					finished();
				}
			},
			
			render: function(dom) {
				$(dom).append(Mustache.to_html(
					'<div class="gm_previewextender unchecked drawtwit" data-id="{{id}}" style="display:none;"></div>'
				, this.data));

				var this_data = this.data;
				setCallbackEvent($(dom).find(".gm_previewextender"), function(data) {
					this_data.thumbnail = data.src;

					$(data.element)
						.attr("style", "")
						.html(Mustache.to_html(
							'<a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{thumbnail}}"/></a>'
							,this_data));
				});
			}
		});

		// EventJot
		phx.mediaType("EventJot", {
			icon: "photo",
			domain: "http://eventjot.com",

			matchers: {
				standardUrl: /^#{optional_protocol}?eventjot\.com\/(\w+)\/(\w+)/ig,
				tinyUrl: /^#{protocol}?evn\.tj\/(\w+)\/(\w+)/ig
			},
			
			process: function(finished, options) {
				this.data.attribution_icon = "http://eventjot.com/timages/common/favicon.ico";
	            if (this.url.match(this.constructor.matchers.tinyUrl) || this.url.match(this.constructor.matchers.standardUrl)) {
					this.data.eventId = RegExp.$1;
					this.data.photoId = RegExp.$2;
					this.data.name = this.constructor._name;
					this.data.href = this.url;
					finished();
				}
			},
			
			render: function(dom) {
				$(dom).append(Mustache.to_html(
					'<div class="gm_previewextender unchecked eventjot" data-href="{{href}}" style="display:none;"></div>'
				, this.data));

				var this_data = this.data;
				setCallbackEvent($(dom).find(".gm_previewextender"), function(data) {
					this_data.thumbnail = data.src;

					$(data.element)
						.attr("style", "")
						.html(Mustache.to_html(
							'<a class="inline-media-image" data-inline-type="{{name}}" href="{{href}}" target="_blank"><img src="{{thumbnail}}"/></a>'
							,this_data));
				});
			}
		});

		return true;



	}, function() {

		// XSXHRが必要なサイト向け処理
		if (!isGreasemonkey) return false;
		
		document.body.addEventListener("DOMNodeInserted", function(e) {
			var nlToArray = function(nodelist) {
				if(nodelist instanceof Object) return Array.prototype.slice.call(nodelist);

				var r = [], i = 0, l = nodelist.length;
				for(;i < l; i++) r[i] = nodelist[i];
				return r;
			}
			var x = nlToArray(e.relatedNode.getElementsByClassName("gm_previewextender unchecked"));

			for (var i = 0; i < x.length; i++) {
				var elm = x[i];
				elm.className = elm.className.replace(/ ?unchecked/, "");

				for (var cName in xsxhrs) {
					if (elm.className.indexOf(cName, 0) > -1) {
						var eventargs = {};
						for (var attName in xsxhrs[cName].attributes)
							eventargs[xsxhrs[cName].attributes[attName]] = elm.getAttribute(attName);

						if (xsxhrs[cName].method) eventargs._method = xsxhrs[cName].method;
						if (xsxhrs[cName].headers) eventargs._headers = xsxhrs[cName].headers;
						if (xsxhrs[cName].posts) eventargs._posts = xsxhrs[cName].posts(eventargs);
						if (typeof xsxhrs[cName].url == "function") eventargs._url = xsxhrs[cName].url(eventargs);
						eventargs._loaded = xsxhrs[cName].loaded;
						eventargs._beforeload = xsxhrs[cName].beforeload;
						setTimeout(function() { getXSXHR(elm, eventargs); }, 10);
					}
				}
			}
		}, false);

	}, {
		isGM: isGreasemonkey
	});
	
})();