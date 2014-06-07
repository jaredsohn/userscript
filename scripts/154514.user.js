// ==UserScript==
// @name         Tieba Acfun Video / 贴吧插入 Acfun 动画
// @namespace    http://jixun.org/
// @version      1.0
// @description  Load Acfun player at Baidu Tieba.
// @include      *://tieba.com/*
// @include      *://tieba.baidu.com/*
// @copyright    2012+, Jixun
// @grant        GM_addStyle
// ==/UserScript==
(function () {
    try { var $ = unsafeWindow.$; var jQuery = unsafeWindow.jQuery; /* Load jQuery. */ }
    catch (e) { return; /* Not on the correct page, exit.. */ }
	try {
		var d    = document;
		var body = d.getElementsByTagName ('body')[0];
		/*
		 *  Notification box
		 *    -- Display log etc.
		 *         -- From: acfun.tv
		 */
		var notificationCSS = '/* Notification box CSS */';
		var notification    = d.createElement("div");
		notificationCSS += "#notify  { position: fixed; left: 16px; bottom: 32px; width: auto; text-align: left; z-index: 10; background-color: rgba(0, 0, 0, 0.9); margin: 0; padding: 0; border-radius: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); }";
		notificationCSS += "#notify .item { width: auto; min-height: 16px; height: auto!important; line-height: 16px; font-size: 14px; font-weight: bold; display: block; position: relative; color: white; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); padding: 0 4px; margin: 8px 4px; border-left: 4px solid #C00; z-index: 9998; word-wrap: break-word; -webkit-transition: opacity 5s ease-in; -moz-transition: opacity 5s ease-in; -o-transition: opacity 5s ease-in; }";
		GM_addStyle(notificationCSS);
		notification.id = "notify";
		body.appendChild (notification);
		function removeElement (elementNode) { try { elementNode.parentNode.removeChild (elementNode); } catch (e) { /* Do nothing */ } }
		function fade_out (Ele) { Ele.style.opacity = 0; setTimeout( function () { removeElement (Ele); } , 5100); }
		function AddLog (Code, Delay) {
			if (Delay == undefined) { Delay = 500; /* 500 ms delay. */ } 
			var p = d.createElement("p");
			p.className = 'item';
			p.innerHTML = Code.replace(/\n/g, '<br />');
			p.addEventListener('click', function () { fade_out (this) }, true);
			notification.appendChild (p);
			if (Delay >= 0) { setTimeout (function () { fade_out (p) }, Delay); }
		}
		// execAll: http://stackoverflow.com/questions/520611/how-can-i-match-multiple-occurrences-with-a-regex-in-javascript-similar-to-phps
		RegExp.prototype.execAll = function(string) {
			var match = null; var matches = new Array();
			while (match = this.exec(string)) {
				var matchArray = [];
				for (i in match) {
					if (parseInt(i) == i) {
						matchArray.push(match[i]);
					}
				}
				matches.push(matchArray);
			}
			return matches;
		}
		$('div.d_post_content').each (function () {
			var vidPat = /#acfun#(ac|)([\d]+)(#(p|)([\d]+)|)/ig;
			var afVid = (new RegExp(vidPat).execAll (this.textContent)||['','']);
			for (var i = 0; i < afVid.length; ++i) {
				var vidAc =  afVid[i][2];
				var vidPr = (afVid[i][5] === undefined ? '' : '_' + afVid[i][5].Tostring());
				this.innerHTML = this.innerHTML.replace (vidPat, '<embed height="452" width="544" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="http://static.acfun.tv/player/ACFlashPlayer.out.swf" \
	flashvars="type=page&amp;url=http://www.acfun.tv/v/ac' + vidAc + vidPr +'" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed>');
			};
		});
	} catch (e) {
		Addlog ('Error: <br />' + e);
	}
})();