// ==UserScript==
// @name           Show UKAGAKA Ghost Reccomend
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    show the post of UKAGAKA ghost's recommend
// @version        1.7.0
// @include        http://sirefaso.appspot.com/*
// ==/UserScript==
(function() {
	var callbackfunction = function(r) {
		const HEART = ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
		,"bWFnZVJlYWR5ccllPAAAAg1JREFUeNqkkr1y00AQx1cnOSiJZRlFTib+KGAMFLikTMMrQIGZofNL"
		,"pGPoaHkAOgoX5AGg4QGgS+KZTMJXLJsBHA+SYyeWdHfsri0YJjEUaEbSnf77++9q9wytNfzPZdHj"
		,"XfP+dmKIViLENdrnlPqY0+r5nfbO03/pxtsH97bPhfl4s9GwHd8HqicaDODr3t65reQTAkj3bzfs"
		,"Vc9j/fRkAMNOh3WLnAn2qjWIgy4HeJUqve2T3d0WGRDslstw1j1m3cFYpcEedfZbViKM605pneF0"
		,"FKGg8VZQnAXVAfcZHEch6wkKy+slGCLLPaBGyiRhkdZxGEGqj8HxfFCYc0JwGM7iKD6egql/NzGM"
		,"p9OrVj4PajKmrIhoSNFE/QjZYFYV8JqGZhZcSOKY+FAIKV8PewGYaz5IFCXBlAl/QxKoNH9X2Vop"
		,"WFrz4PRLH4RUr8RWe6c5DAJ2tPwSByk2mN3pvIJ0vs9tbEAaJzDu92Gr/fKh4B6k6bNvH96DiWM0"
		,"CoVLs1JjhevCEiaJPn9ihlgjO4lvHjW1W6mAf/MWjANsGv6/nDeVjEy3CCu1GoSHhzDB8u++aBvE"
		,"iexI0oew14PvBwdwpVwD4RQ4q/wFVy/Af1SQXVRJHuderN+AUbdLI4FlhKOjowvwpQaZySqaFOp1"
		,"Ht9oAbzQIDNZ2Szz0T1bAP/VIDPJ+rMo5qcAAwDMD3U4UBuvvwAAAABJRU5ErkJggg=="].join("");
		const STAR = ["data:image/png;base64,"
		,"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"
		,"bWFnZVJlYWR5ccllPAAAAhBJREFUeNqkU8FLFHEU/maUGtNlhnGTFWeZ2RQPtSFe6hAVZNvWRZQu"
		,"5iXoVnTrZuShg39BBHnwJCIohFBCrB22bqZSHjZxN1u3nVlaaNstzI1Wx/dmhtrAEcQHj99v3nzf"
		,"996b90Z4N9sJPyuXvjzmU1HDo34Y8QByuwDhATvfDy1A9ihy9uYJdgF4eCgBynieMp9qUcJokcMU"
		,"Ebo4th+2sY4k09FD4Dt0mvqZ/nhb+BxgA/rp/ng2NbdcLuXvUmCC3n+g71JhnpAYPzZE2Z40NEqt"
		,"zUoH2o2LqG6XoHXGIIlZR6C6ayCfSUBqUlHIvsXWDxM7teo3G/Z9rmCVvBaJDnAmtxwiYXsZ+PkK"
		,"2AWk5ji6okNOXItcQy49j/TqZI25IpWSIqULmffTudzavENAcQyoEJkh/Mx3a8wRsDaTTP5OnCvM"
		,"Fb05f6LAjfTK5C/rcxIIjrhEdhb5Qx4agZVN4uPSs9+EHWDyf1PwKrluphf+kdl3vJbIzY0FOuwY"
		,"Yd/4jfGy3NrtEkSDVG8BKnmD4YgFQ72gnRj03QOaRm9AMVyB4DAKRQuFrxbQNuzEpKaTjNL33QPP"
		,"QsclFZvrL5Cncqtbxecc3FibGdT0qwjIEQdzkEC0aC5Sr4nX1Os96nXdW7LuTGrqaYce63OXra7q"
		,"+r+xUsqXqdI5RdVu+6z4S2rzkqxqgb8Ctm3jKLYnwAAlEM53VOoSlgAAAABJRU5ErkJggg=="].join("");
		var isTwitter = typeof r[0].keyword === "undefined" ? true : false;
		var isHaiku = !isTwitter;
		var pre = isTwitter ? "twitter" : "haiku";
		var d = document;
		var uka = d.createElement("div");
		uka.id = pre + "_js_osusume_ukagaka";
		var maindiv = d.getElementById("content");
		if (maindiv) {
			maindiv.appendChild(uka);
		}
		else {
			return;
		}
		var setRec = function(res, isFirst){
			var css = "";
			for (var j = 0, jl = res.length; j < jl; j++) {
				var count = 0;
				var ghostId = res[j].id;
				var escapedtitle = res[j].querySelector(".entry-title > a").textContent.replace(/[.^$[\]*+?|()]/g, function($0){
					return "\\" + $0;
				});
				var reg = isTwitter ? new RegExp("^【きょうの伺か】［" + escapedtitle + "(］|｜)") : new RegExp("^きょうの伺か=［" + escapedtitle + "(］|｜)");
				for (var i = 0, il = r.length; i < il; i++) {
					if (!reg.test(r[i].text)) 
						continue;
					var ukadiv = d.createElement("div");
					ukadiv.className = "js_osusume_ukagaka_div js_osusume_ukagaka_" + ghostId;
					uka.appendChild(ukadiv);
					var ukaimage = d.createElement("div");
					ukaimage.className = pre + "_js_osusume_ukagaka_image";
					ukaimage.style.backgroundImage = "url(" + r[i].user.profile_image_url + ")";
					ukadiv.appendChild(ukaimage);
					var ukacontent = d.createElement("div");
					ukacontent.className = "js_osusume_ukagaka_content";
					ukadiv.appendChild(ukacontent);
					var ukacontentp = d.createElement("p");
					ukacontentp.textContent = r[i].text;
					ukacontent.appendChild(ukacontentp);
					if (uka.getElementsByClassName("js_osusume_ukagaka_" + ghostId).length < 2) {
						css += ["#" + ghostId + ":hover ~ #" + pre + "_js_osusume_ukagaka > .js_osusume_ukagaka_" + ghostId + " {\n", "\tdisplay: block;\n", "}\n"].join("");
					}
					// for bug of webkit
					if (window.getMatchedCSSRules) {
						var showComment = function(elm){
							return function(){
								elm.style.display = "block";
							};
						};
						var hideComment = function(elm){
							return function(){
								elm.style.display = "none";
							};
						};
						d.getElementById(ghostId).addEventListener("mouseover", showComment(ukadiv), false);
						d.getElementById(ghostId).addEventListener("mouseout", hideComment(ukadiv), false);
					}
					count++;
				}
				if (count > 0) {
					var s = d.createElement("span");
					s.className = pre + "_rec";
					d.querySelector("#" + ghostId + " > .entry-title").appendChild(s);
					css += ["#" + ghostId + " > .entry-title > ." + pre + "_rec {\n", "\twidth: " + (16 * count) + "px;\n", "}\n"].join("");
				}
			};
			if (isFirst) {
				css += [".entry-title > ." + pre + "_rec {\n", "\tdisplay: inline-block;\n", "\tmargin-left: 8px;\n", "\theight: 16px;\n", "\tbackground-image: url(" + (isTwitter ? STAR : HEART) + ");\n", "\tbackground-repeat: repeat-x;\n", "}\n"].join("");
			}
			if (css) {
				var addCSS = function(cssStr){
					var sheet = document.createElement('style');
					sheet.type = 'text/css';
					var _root = document.getElementsByTagName('head')[0] || document.documentElement;
					sheet.textContent = cssStr;
					return _root.appendChild(sheet).sheet;
				};
				var sheet = addCSS(css);
			}
		};
		var entries = maindiv.getElementsByClassName("ghost");
		setRec(entries, true);
		d.body.addEventListener("AutoPagerize_DOMNodeInserted", function(evt){
			var node = evt.target;
			var requestURL = evt.newValue;
			var parentNode = evt.relatedNode;

			setRec(node, false);
		}, false);
	};

	// Callback
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.charset = "UTF-8";
	var t = document.createTextNode("var my_ns = { callback: " + callbackfunction.toString() + " }");
	s.appendChild(t);
	document.body.appendChild(s);

	// Twitter (@osusume_ukagaka)
	var s = document.createElement("script");
	s.src = "http://api.twitter.com/1/statuses/user_timeline.json?count=200&screen_name=osusume_ukagaka&callback=my_ns.callback";
	s.charset = 'UTF-8';
	document.body.appendChild(s);
	
	// はてなハイク
	var s = document.createElement("script");
	s.src = "http://h.hatena.ne.jp/api/statuses/keyword_timeline/%E3%81%8D%E3%82%87%E3%81%86%E3%81%AE%E4%BC%BA%E3%81%8B.json?count=200&callback=my_ns.callback";
	s.charset = 'UTF-8';
	document.body.appendChild(s);
	
	/**
	 * スタイルシート適用
	 * 
	 * @see http://gist.github.com/52682
	 * @param {String} css
	 * @return {Object} sheet
	 */
	var addCSS = function(css){
		if (document.createStyleSheet) { // for IE
			var sheet = document.createStyleSheet();
			sheet.cssText = css;
			return sheet;
		} else {
			var sheet = document.createElement('style');
			sheet.type = 'text/css';
			var _root = document.getElementsByTagName('head')[0] || document.documentElement;
			sheet.textContent = css;
			return _root.appendChild(sheet).sheet;
		}
	};
	var sheet = addCSS("\
#twitter_js_osusume_ukagaka {\n\
	position: fixed;\n\
	top: 5px;\n\
	left: 10px;\n\
}\n\
#haiku_js_osusume_ukagaka {\n\
	position: fixed;\n\
	top: 5px;\n\
	right: 10px;\n\
}\n\
.js_osusume_ukagaka_div {\n\
	width: 360px;\n\
	height: 80px;\n\
	margin-top: 5px;\n\
	background-color: #000;\n\
	-o-border-radius: 10px;\n\
	-moz-border-radius: 10px;\n\
	-webkit-border-radius: 10px;\n\
	border-radius: 10px;\n\
	opacity: 0.7;\n\
	display: none;\n\
}\n\
.twitter_js_osusume_ukagaka_image {\n\
	width: 48px;\n\
	height: 48px;\n\
	margin: 10px 5px auto 10px;\n\
	background-repeat: no-repeat;\n\
	float: left;\n\
}\n\
.haiku_js_osusume_ukagaka_image {\n\
	width: 64px;\n\
	height: 64px;\n\
	margin: 10px 5px auto 10px;\n\
	background-repeat: no-repeat;\n\
	float: left;\n\
}\n\
.js_osusume_ukagaka_content {\n\
	color: #fff;\n\
	font-family: 'Lucida Grande', sans-serif;\n\
	font-size: 12px;\n\
	line-height: normal;\n\
	padding: 10px 10px 0px 0px;\n\
	text-align: left;\n\
}\n\
.js_osusume_ukagaka_content:after {\n\
	content: '';\n\
	clear: left;\n\
	visibility: hidden;\n\
}\n");
})();
