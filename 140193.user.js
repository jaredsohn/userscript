// ==UserScript==
// @name          Redirect Bypasser
// @namespace     http://www.moonlight21.com
// @description   Identifies redirected URLs and allows you to visit the target link directly, avoiding unwanted redirects...
// @version       1.7 2013-09-07T17:00-03:00
// @author        Moises Lima <mozlima[]hotmail.com>
// @include       *
// ==/UserScript==

/** Copyright 2013 Moises Lima
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function () {
	"use strict";
	
	var opts = {
		language : "auto",
		keyToActivate : "", /* altKey, ctrlKey, metaKey, shiftKey */
		highlightLink : true,
		openInNewPage : true,
		menuShowDelay : 300,
		menuHideDelay : 300,
		menuOpacity : 0.5,
		menuOpacityHover : 1,
		menuShadowDepth : 2,
		iconAutoBackgroundColor : true,
		iconBackgroundColor : "#4887e4",
		iconBackgroundColorHover : "#000",
		iconSize : 22,
		tooltipFontSize : 16,
		tooltipColor : "#FFFFFF",
		tooltipBackgroundColor : "#000000",
		tooltipShowIcon : true,
		allowedProtocols : "http,https,ftp,mms,rtsp,ed2k,magnet",
		useDeobfuscator : true,
		getFromTagText : true,
		getFromAttributes : true,
		getFromPlugins : true,
		maxCaptureRecursion : 5,
		watchNodeInserted : true,
		watchAttrModified : true,
		excludedAttr : "href,style,codebase,pluginspage"
	}
	
	var icons = [
		[/\.(jpg|jpeg?|gif|png|bmp|ico|svg|svgz)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJPSURBVFiF7ZcxaBNhGIbf7/+vSUyTNk1aTXKLi0KKGBShdNOhpajYdrHSKoJTa9BCqQ1VF0HI4lJitQ4qxSAWBwliDWZRB0HQQnEodOlQtYHSGNoo1Xp3Lomc4e56sRey5J3uvu97eR/+/7vhqCv22Y4qilUzvAZQAwAAQf1ys6+56dBe+31GOFKJMFnBYmr++6l4KvdDE6BVtHUywvFKhAMAI+w+1uo8EU/lnmoCEMGmok0rCnJWBBPBwwgdhWeHuidoW4Bveen62cnMvBUAiYg/7HPzDq1e1ZfQUoBExB9ORPzhcjy6V1COpof8oZYGPkWENgCYjYrvV9elwfN3MwvbeS05AZ+bjxXDAYAIbT43HzPj3THAeLfXzRl6S+ucoXe82+uuOEAsmd1QFCyV1hUFS7FkdqPiAADwS1LumalpydQSPhjcs8/n4l35TfndwO3Mx9J+z62vUzPDgQWXnV0EgPxP+U7fxMobSwCeXwneEDhFAcDr4piNiotreWng3GTmk3quEGgqVC3DK0iOBkeK4UURYX+zm6efXA60lxumJd0TEDg5bcK/4Sp5Gp3sxeNL/s7+eOZDsRgSbexqj/eAy8EOyjLym1vy8sij1bn/Aqi300kAjQZeZ1M9fzYzHOh31NFhgdNRRmgH4Pk7YOd4OOT/Ist4WTYA53TGiLygloZdLG00QIDIGS7o9XV3gADRBIBZ6eYYfQWShQAAwLcF2PqtLDvqyNCwU0myktUFOD2x8jo5GrzGGYUqFD43/Xb9lbpGtV+zGkC1Af4AlYWZ1aIt7JQAAAAASUVORK5CYII="],
		[/\.(mp3|wav|wma|ra|mid|m3u|asx|ogg)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFySURBVFiF7ZY9SwNBFEXv0yCiWIZAEFFEMLWNheBPELGytLWx00KsFNFgbSEIfvwOG8HOMpWFVhEVwSJNiOKxyKys0WTXye6myW1m5+3M3LN3XrFSX311KWAFOAGsVwC7NLXus38gAYZBN5aBqV4CjEq6AIayBsiFnhcknf2nH5JMINCqpIMsAYIEHkK1TWAtK4AggSNJ+6H6MTCXJUDDzLYl7bj5sKTLqH5I8goakmRme5K2XK0kaTJtgO8EgoKZlSXduuls2gA/Egjp0I2FtAF+JeBUdeN1rwBqku7M7D5tgD+vwMwqkhajNieZwHvrCzN7yhKg9QpiKRe9pCmgKGlaza5G0qOkN1fzBohjPAOcAx90Vsnn/I4JAAVJN5LyMc7ySiCqB05jmnsDtBUwHxF5WK/AmI9PpwSKMc+oS1oys5oPQFsBeeA54stfgOVEjVsgJoAroBYyrQMVYAMY6dYj9s8jMO7WV83ss1vjvgJ9AZv5/ehLyrTSAAAAAElFTkSuQmCC"],
		[/\.(mov|mpg|avi|wmv|mpe|mpeg|rm|ram|rmvb|mp4|asf|flv|m4v)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAH/SURBVFiF5Zc/aBRBFIe/u6hcYSFBQshgEbEIYiMqqJWQFDdFkjaNpcZKEJspFMTmprDWRkhjZeNBwLELETRa5UiRIuaPEAfCEbARu4iFb2GYuyG3u4Fb8AePfbPz9r2Pmbnbt7Vm6wfDVH2o1asAcCocOKPOAeN94n5p63PvleQbCawuV6+tP+oBABaAV8AWsCf3bgOfgWZeAOAA6AKbMr4KjAGTwHdIb8GStr6prW8CuwUKh3of5FqLJ6t1BgLdd0ZlS34JOJT9LKI5Z9SU+FcGBbgATIh/BpgGfhYEGANGxT8dT6a24Km2vqGtbwAbBQtneh3kWo4nUysQawd4U6D4k+MCUgAzzqiG+ONAR1v/LG91Z5QBrjujsmen4pgUwLTYSeiaWF+lzsBL4JbYt5IA74JcH+PJ1Arsa+u/ADijfpcE6Aa5en5JKYCLzqg74p8tCTAR5Do/KMA9sUzbJQBmxfoqBfABWBX/YYniAF+Btvh3gcuDAKxq6y2AM2qhJEAnyHUzBqjsy6jljGoF44MSNRadUYt5AeKGZDQ4yXlUB/bpbUiOBVgK9q0D3ABWCgDAv4bkgeRqA/Mx4VA1aEOyDjwvkP8tJ9SQdLX17URsUs6oP1S9IansGYgbkjL/A7kakk/Ao+ieRT4iCugxUAOOxF7I9TALqP33X8d/AZ3Zl2Wvj2ZBAAAAAElFTkSuQmCC"],
		[/\.(torrent|zip|rar|tar|tgz|gz|bz2|tbz2|gzip|z|sit|dmg|cab|7z|lzh|pkg)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADbSURBVFiF7ZYxEoMgEEWfmdzCi3iEcJU0ab1BaNN4FRtPYh1qL5CZpHALRwQxIUOzv0Rhn8tjpLrcn5TMqWh1BQDORyf0bf2OPTfWVUfWK94BBVAABVAABVAABajWd8K+ra/Agy/uCjt5ATdjXbcc9DogLxhgylh8Asy6+CaAQAxAA4wZio9AI2t6CTpgrBsFYnNiYgYpHvyQqITGuol5O7zWJaRjbnt0Kz0JQzkg56ZsoSQfw0Q5g7L9DCAQMTmjsmUBEIgtOXdlywYgEEs5k2QLJVnCf6X4v+ADBiVPS0yaJBoAAAAASUVORK5CYII="],
		[/\.pdf$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJtSURBVFiFxdZPiJdFHMfx10aaabZaJCyzmCdRDwaB4Km6KD1khw7C+idBCDsEQp7GOgr2IAgS0aEMEioShFhRpkMXz/5BSENDZDEfdgkSo21XV3M9zLPsA/LL/fPb329O84/5vOfznfnO9Lz92W3dLM90Vb0dACmGvhTDuq4ApBgO4yYuphi2dBQgxdCPj7EES7GtowDYhAeNdl+nAe5istFe1WmA83i+0X65owBFWY1iuNE12WruggDU5Rc8quv3uwHwPf6p6/3dALjTqK9IMcz6IM4XYDV6Gu1DnQZ4F8txT05I76cYNnYS4B3Zgf8wiufwbUcAUgyrsULe/RFckq/i2hTD7gUHwBbTV/AH7MMEluHzFEPvQgO8V4v9UZTVjaKsruM4xuv+n1MMi562yLNzUU4x9OANecffNYY+xW6sxGsYTDF8iasYKsrqiWw5Vwc2yfF+gFON/lH8iDH5ndhaA17DeIrhcophTXOhOTmA7XgBI0VZ/ZZieBE7ZQdCDfevHIpe+aw8xAbZuaH5AgzI7g2nGM7KB3Iq3sNyih7HATk/TNZaYzjbXGjWACmG9aaf3tflPDCKr3C8KKvLjbkn8UENPIa9RVn91VyvZ6bf8hTDSziIj7BYjv8lHMNgUVYTs90MM3QgxTCAr2U7p6zcUZTV6bmIzhggxfAKTqAw/eF4hP3tEOd/rmGKYZv85S5wDl/I8T5TlNU37RCnhQMphs34Sd7th3JiOYw/sadd4i0BcLQem8AneBUjeLMoq7/bCdAqBLfkqzVZi/+KjUVZ/d5OcVo7sAtvyT+eC0VZXWm38FSZcR5YqPIYBhamZEHX1dcAAAAASUVORK5CYII="],
		[/\.(txt|rtf|readme|xls|xlt|doc|dot|rtf|pps|odt)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACCSURBVFiF7ZehDYAwEEVfCVt0EAwD0Hkw3YAa5mEBDMxB5wADCQEsnOD/5ERr/mvzzLmmW7BMYdouAKC8XgzRr28WhpTd+Wz+A08AI1DtM1oAtCHlOaQ8A60FwKe5SQj0Q/THy3sLgBqY3i4+IgkloSSUhJJQEkpCSWguodNu+HuADUJiPnMu4QyjAAAAAElFTkSuQmCC"],
		[/\.(js|css)$/, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE5SURBVFiF7ZdBbsJADEXfjLove26DhFSWlbgAEofgBuUQoO4rpC6RaMVpyh4uMNNFAiWKM/E4VNnEq8Tj+D95YmvGvbz90Kf5XtUHgAEAeNIG7ldjB8yB82x9+mqImQIBOM7Wp6jJq6rAfjX2ELYQPyAeSiFBPB4gfkPYFt88AKAU34Bb3LmDEDr6e3QLCBsNRDJAFo/vwFEI35VrWRCNi83ifintb+Hzy1wIcaFFXCr/FSLkQtScVnErRMXRVdwCcXsp+ry7uBLC1QCAyaPE2yF4lQCerUIGu0gAn5Y+TplmjtySW/s4X7w6RyqJLX1sEK/8U7WkXSFyW1lMaIWwzJHGZNo+vhM3zZFkSRN9PBfCTXOkdU9lCM7pXPoh5rQXk7LsE8C3HMlGwE57JFMD/Jf1fioeAAaAX1LDCCoXcrBcAAAAAElFTkSuQmCC"],
		[/\.(exe|pif|lnk|scr|msi|vb|vbs|vba|wsh|ref|cmd|bat|reg|app|sh|bin|ini)$/i, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKaSURBVFiFxZdBSFRBGMd/KwsGFnWxy3iTIPBoVwky2J3wYkFghw5eQgi8aEyEsbmJQyDePHoQJCjaUzAKQYjnPSZBtCfnFp0MhEQ6+D2cXd/sW9t9+ocH3/y//3zff+e9N2+2UF7e5zLR181kZ9S4M6p0KQacUc+BL8CWM+rZhRpwRl0FXgdUVbiLMQDMAoPBeFC4/A04o24AcympOcnlawCYB5JGDbkQbj5XA86omzQvdUWuBLOiyccA8BIYkHgP2JRrT7gB0fTegDNqCJgJqAVt/bG2/hhYCPgZ0fbWgDTpl7iura85o0rOqHFtfQ2oS66/xVBbFDrZip1Rw8B3oCiUBq4BH2R8Txo7GR8Bt7X1P7Nqd7oCb4Lmu9r6LWAkyN8VblfGRZmTiUwDzqgRYCqgXrWRh7kpmdudAaAa6La19bsxoeS2g9rVrgw4o+4AkwHV7tenaSalxv8ZAN4GcU1bX48qBaKpRWp0bsAZNQYk3/rWdz0LCzIHoCS1zmcAWAriTW39XlTZAtFuRmplG3BGlYHE9V+a9/sEO0H8LSVfkbkAY7GTU2wFwvu2rq1vtAq09V+B+0BZW/8xJd8A1gMqdRXOGHBGPQRGZXhI5FVyRhWA68CRxGmoSg2AUakdN+CM6gMWA2pNW+8jxZeAT5ycC9+lCWTuWkAtSo90A8ATTrfYA2A50hzgaRBPRVUnNQ4kHpEeZw04o4o0P2yr2vpfbQq/D+KNmEhqrAZURXo1GwCmgWGJfwMrbZoDvODkIXxE9g65IjWRHtNJolBe3scZdQX4ASQHiTrwOaPoeTHB6cO9D9zS1h8mS/EgaI4IR8kPQ8BjYCO5BX9ybBaDh+BE5IyaANp+uXqIHdnIOjuS5Ymu/h33Av8A/u7AphlkRyIAAAAASUVORK5CYII="],
		[/.?/, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHwSURBVFiF7dc9aBRRFAXgb41tMK2OIGgRsBKrhESxER2ENIKFSZNCQSGgNg724rNRRFBsZdMINooMaKGQIBF/SGVsDBY+rZRIQEWJscgIcd2f2RjZwr3NDPedc9/hzJ13ZyoHL7zVydjQ0d27ArCx0UKeJcvruVEaYqVevuMOdAU07IEmsYjb6McgPuBxsbYPve0Ua9eBGRzGgWLzbziUhjiShjiCXQXmnwi4inHcxGY8xFAa4pNfgDTEeQwX2HUVMIPTuI4XOIezaYjPaoFpiEsFtpQTZXpgEaMYwlb0pyH+aEZIQ1zKs2QUs1r0RBkHqoW1z7EJ9/Is6W9FKjjVVrgyDkwV1884jz6M51kyiASfkGEuDbF2tE7hRLPiZRyYhjTE5TTEK7iIu9iLHdiN+3iTZ0lfPe7fCvgt0hC/Yn+dpR58zLPkRp4lR8rWKyNguE7uSwNsBcdRzbNkZwNu2wL21MldwlwTzqk0xJcNuG0LGMuzZPvqRBrid5zEQgPOu4Izth4CejGZZ0lPjYhHOFODXcAtvMakEnOhbBMO4HKtCH92+TUcxbGC0zLaeQsmMF3zOLasun+KO4WoibJF2x3HA5jNs6Rq5ZB5hfdWpuI8HmhzHK/le6DXyulWe8JtW0Otzn8RdQVUuv+G/72AnzMSgnvD1mPkAAAAAElFTkSuQmCC"]
	];
	
	var rbStyle, rbDiv, rbTooltip, cTarget, eTarget, allowedProtocols, timer, pX, pY;
	var REGEXPS = {};
	var disposed = true;
	var extOrder = "\
		.mov.mpg.avi.wmv.mpe.mpeg.rm.ram.rmvb.mp4.asf.flv.m4v.swf\
		.mp3.wav.wma.ra.mid.m3u.asx.ogg\
		.torrent.zip.rar.tar.tgz.gz.bz2.tbz2.gzip.7z.lzh.pkg\
		.exe.pif.lnk.scr.msi.vb.vbs.vba.wsh.ref.cmd.bat.reg.app.sh.bin.ini\
		.pdf\
		.jpg.jpe.jpeg.gif.png.bmp.ico.svg.svgz\
		.txt.rtf.readme.xls.doc.rtf.ppt.pps.odt\
	";
	var observer = new MutationObserver(function(ms) {
		for (var i = 0; i < ms.length; i++) {
			if (ms[i].type == "attributes") {
				eventHandler(ms[i].target);
			} else {
				for (var j = 0; j < ms[i].addedNodes.length; j++) {
					eventHandler(ms[i].addedNodes[j]);
				}
			}
		}
	});
	
	function reverse(s) {
		return s.split("").reverse().join("");
	}
	
	function hexEncode(s) {
		var h = "0123456789ABCDEF";
		var	r = "";
		for (var i = 0, n; i < s.length; i++) {
			n = s.charCodeAt(i);
			r += h.charAt(n >> 4) + h.charAt(n & 0xF);
		}
		return r;
	}
	
	function hexDecode(s) {
		var r = "";
		for (var i = 0; i < s.length; i += 2) {
			r += String.fromCharCode(parseInt(s.substr(i, 2), 16));
		}
		return r;
	}
	
	function findPos(el) {
		var r = el.getBoundingClientRect();
		return { x: r.left + window.pageXOffset - window.document.documentElement.clientLeft, y: r.top  + window.pageYOffset  - window.document.documentElement.clientTop };
	}
	
	function getColor(a) {
		var d = Math.round((320 / icons.length) * a[0]);
		var s = a[1].join("");
		var f = [s.charCodeAt(0), s.charCodeAt(parseInt(s.length/2, 10) || 0), s.charCodeAt(s.length-1)].sort(function(a, b) { return a - b; });
		var h =  Math.round(((f[1] - f[0]) / (f[2] - f[0]) ) * 300) - d;
		var c = Math.round((40 / icons.length) * a[0]) || 1;
		return "hsl(" + (h < 0 ? ~h : h) + "," + (35 + c) + "%," + (48 - parseInt(c / 3, 10)) + "%)";
	}
	
	function fixURL(u) {
		var rp = RegExp("^(" + allowedProtocols + ")%(25|3A)", "i");
		var c = 5;
		
		if (!REGEXPS.STARTSWITH_ALLOWEDPROTOCOL.test(u)) {
			var m = u.match(/^(?:(:)|(\/\/)|(\/))/);
			u = (m? (m[1]? "http" : (m[2]? "http:" : (m[3]? "http:/" : "" ) ) ) : "http://" ) + u;
		}
		
		try {
			while (c-- && rp.test(u)) {
				u = decodeURIComponent(u);
			}
			
			u = u.replace(/[^?]+\??/, function(s) {
				return decodeURIComponent(s.replace(/%25/g, "%"));
			})
		
		} catch(err) {
			//alert("RedirectBypasser error:\nURL: " + u + "\nError: " + err);
			console.log("RedirectBypasser error:URL: %s Error: %s", u, err);
		}
		return u;
	}
	
	function grabURL(url, link, links, mcr /*maxCaptureRecursion*/) {
		mcr = (typeof mcr != "undefined" ? mcr : 40);
		
		if (link.recursionDone || link.recursion >= mcr) {
			return;
		}
		
		url.replace(RegExp("([?=&])www\\d{0,3}[.]|(\\?|\\/|[^?&=]+=|%[a-f0-9]{2})(?:" + allowedProtocols + ")(?:%(?:[^%]*3A)|:)", "i"), function() {
			if (link.recursion >= mcr) {
				return;
			}
			
			var offset = arguments[arguments.length - 2];
			var p1 = arguments[1] || arguments[2];
			var k = p1, u, i;
			
			if (/^[%?\/=]/.test(p1)) {
				u = url.substring(offset + p1.length);
				
				if (p1 == "?" && u.indexOf("&") > 1) {
					u = u.substring(0, u.search(RegExp("&(?!amp;)", "i")));
				}
				
				if (p1.indexOf("%") === 0) {
					i = u.search(RegExp(((p1.toLowerCase() == "%3d")? "%26" : p1) + "|&(?!amp;)", "i"));
					u = u.substring(0, (i > -1 ? i : url.length));
					k = url.substring(0, offset).split((p1.toLowerCase() == "%3d")? "%26" : p1).pop();
				}
			} else {
				i = url.indexOf("&", offset + p1.length);
				u = url.substring(offset + p1.length, (i > -1 ? i : url.length));
			}
			
			var nu = url.substring(url.indexOf(u) + u.length);
			if (REGEXPS.CONTAINS_ALLOWEDPROTOCOL_MIDDLE.test(nu)) {
				grabURL(nu, link, links, mcr);
			}
			
			k = unescape(k);
			
			var kt = k.match(/([^?&\/]+)(?:=[^&=]*)$/);
			if (kt && kt[1]) {
				k = kt[1];
			}
			
			u = fixURL(u);
			
			if (!links.hasOwnProperty(u)) {
				links[u] = {url:u, info:(link.info||[]).concat(k), recursionDone:false, urlFixed:true};
				link.recursion = (link.recursion || 0) + 1;
				
				if (REGEXPS.CONTAINS_ALLOWEDPROTOCOL_MIDDLE.test(u)) {
					grabURL(u, {
						info: links[u].info.slice(0),
						recursionDone: links[u].recursionDone,
						url: u,
						urlFixed: links[u].urlFixed
					}, links, link.recursion);
				}
			}
		});
		
		link.recursionDone = true;
	}
	
	function grabRaw(url, link, links, preFunc, posFunc) {
		if (url) {
			if (Array.isArray(url)) {
				for (var i = 0; i < url.length; i++) {
					grabRaw(url[i], link, links, preFunc, posFunc);
				}
			} else {
				var arg = [url, link, links];
				
				if (preFunc) {
					preFunc.call(preFunc, arg);
				}
				
				var a = arg[0].match(REGEXPS.MATCH_URLS);
				
				if (a) {
					for (var i = 0; i < a.length; i++) {
						arg = [a[i], link, links];
						
						if (!posFunc || !posFunc.call(posFunc, arg)) {
							arg[0] = fixURL(arg[0]);
							
							if (!(arg[0] in links)) {
								links[arg[0]] = {url:arg[0], info:(link.info||[]).slice(0), urlFixed:true};
							}
						}
					}
				}
			}
		}
	}
	
	//FIXME:
	function grabAtts(el, links) {
		var p = (el.nodeName == "PARAM");
		var q = "";
		
		for (var i = 0, o; o = el.attributes[i]; i++) {
			if (!REGEXPS.IS_EXCLUDED_ATTR.test(o.name)) {
				if (o.name == "flashvars" || (p && o.name == "value" && el.getAttribute("name") == "flashvars")) {
					grabURL(o.value, {url:o.value, info:["@flashvars"]}, links);
				} else {
					grabRaw(o.value, {info:[(p? el.getAttribute("name") : "@" + o.name)]}, links);
				}
			}
			
			if (el.nodeName == "EMBED") {
				q += o.name + "=" + o.value + "&";
			}
		}
		
		if (el.nodeName == "OBJECT" || el.nodeName == "EMBED") {
			var u = "";
			var a = document.createElement("a");
			a.href = el.baseURI;
			
			if (el.nodeName == "EMBED") {
				a.href = el.src;
				a.search += "&" + q;
			} else if (el.nodeName == "OBJECT") {
				var els = el.getElementsByTagName("param");
				a.href = (el.getAttribute("data") || "") || (el.getAttribute("movie") || "") || ((el.querySelector("param[name='movie']") || {}).value || "");
				
				for (var i = 0, o; o = els[i]; i++) {
					a.search += o.name + "=" + o.value + "&";
					grabAtts(o, links);
				}
			}
			
			links[a.href] = {url:a.href, recursionDone:false, info:["#Plugin"], urlFixed:true};
		}
		

	}
	
	function grabReverse(url, links) {
		if (REGEXPS.CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL.test(url)) {
			if (url.indexOf("javascript:") === 0) {
				grabRaw(reverse(url), {info:["#Javascript", "#Reverse"]}, links);
			}
			
			url = url.substr(url.indexOf("?") + 1);
			var r = reverse(url).split("?");
			if (r.length > 2) {
				r.shift();
			}

			url = r.join("?").replace(/\/([^\/?]*)=[^&?=]*/, "/$1").replace(/=([^?&]*)=([^&]*)/g, "=$1");

			if (REGEXPS.STARTSWITH_ALLOWEDPROTOCOL.test(url)) {
				links[url] = {url:url, info:["#Reverse"]};
			} else {
				r = url.split(/^([^=]+)=/g);
				if (r.length > 1) {
					links[r[2]] = {url:r[2], info:["#Reverse", r[1]]};
				}
			}
		}
	}
	
	function grabText(text, links) {
		grabRaw(text, {info:["#Text"]}, links, null, function(a) {
			return a[0].indexOf("...") > -1;
		});
	}
	
	function grabBase64(url, links) {
		grabRaw(url.match(REGEXPS.MATCH_BASE64ENCODED), {info:["#Base64"]}, links, function(a) {
			a[0] = window.atob(a[0]);
		});
	}
	
	function grabHex(url, links) {
		grabRaw(url.match(new RegExp(REGEXPS.CONTAINS_HEXENCODED_ALLOWEDPROTOCOL.source, "gi")), {info:["#Hex"]}, links, function(a) {
			a[0] = hexDecode(a[0]);
		});
	}
	
	function addDiv() {
		rbDiv = document.createElement('div');
		rbDiv.id = "rb-div";
		
		rbStyle = document.createElement('style');
		rbStyle.setAttribute("type", "text/css");
		rbStyle.textContent = "\
			#rb-div {z-index:20000000!;position:absolute!;background-color:transparent!;opacity:@menuOpacity@!;box-shadow:0px 0px @menuShadowDepth@px #000, 0px 0px @menuShadowDepth@px #fff!;}\
			#rb-div:hover{opacity:@menuOpacityHover@!;}\
			#rb-div *{border:none!;}\
			#rb-div a{cursor:pointer!;text-decoration:none!;background-color:@iconBackgroundColor@;float:left!;display:inline-block!;width:@iconSize@px!;height:@iconSize@px!;background-size:contain!;background-position:center!;background-repeat:no-repeat!;}\
			#rb-div a:hover{background-color:@iconBackgroundColorHover@!;}\
			#rb-tooltip{visibility:hidden;z-index:30000000!;font-size:@tooltipFontSize@px!;text-align:left!;position:absolute!;background-color:@tooltipBackgroundColor@!;color:@tooltipColor@!;padding:2px!;min-width:50px!;max-width:600px!;white-space:nowrap!;text-overflow: ellipsis!;overflow:hidden!;}\
			#rb-tooltip b{font-size:100%!;}\
			#rb-tooltip div{max-width:90em!;text-overflow:ellipsis!;overflow:hidden;font:Menu!;font-size:100%!;padding-left:1.5em!;background-repeat: no-repeat!;background-size: contain!;}\
			#rb-tooltip div:last-child{font-weight:bold!;font-size:120%!;}\
			#rb-tooltip-href{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHwSURBVFiF7dc9aBRRFAXgb41tMK2OIGgRsBKrhESxER2ENIKFSZNCQSGgNg724rNRRFBsZdMINooMaKGQIBF/SGVsDBY+rZRIQEWJscgIcd2f2RjZwr3NDPedc9/hzJ13ZyoHL7zVydjQ0d27ArCx0UKeJcvruVEaYqVevuMOdAU07IEmsYjb6McgPuBxsbYPve0Ua9eBGRzGgWLzbziUhjiShjiCXQXmnwi4inHcxGY8xFAa4pNfgDTEeQwX2HUVMIPTuI4XOIezaYjPaoFpiEsFtpQTZXpgEaMYwlb0pyH+aEZIQ1zKs2QUs1r0RBkHqoW1z7EJ9/Is6W9FKjjVVrgyDkwV1884jz6M51kyiASfkGEuDbF2tE7hRLPiZRyYhjTE5TTEK7iIu9iLHdiN+3iTZ0lfPe7fCvgt0hC/Yn+dpR58zLPkRp4lR8rWKyNguE7uSwNsBcdRzbNkZwNu2wL21MldwlwTzqk0xJcNuG0LGMuzZPvqRBrid5zEQgPOu4Izth4CejGZZ0lPjYhHOFODXcAtvMakEnOhbBMO4HKtCH92+TUcxbGC0zLaeQsmMF3zOLasun+KO4WoibJF2x3HA5jNs6Rq5ZB5hfdWpuI8HmhzHK/le6DXyulWe8JtW0Otzn8RdQVUuv+G/72AnzMSgnvD1mPkAAAAAElFTkSuQmCC')!;}\
			#rb-tooltip-href[data-rb-href^='https']{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAJMSURBVFiF7ZZNSFRRFMd/570ZnVLDMk0nIouCskWkErQIF22yJoq+aBVCEpT0sWjatWqRToQSiRFEmz6hAi1aBEVZIEVIy4GgRfpmGihRRGty5t4278loPnljygTN2bx7zv3f8//Be/e+KzsvDRrkMHJqngcA8GW7oCcc3Goa0iBCvUAdUKyhH80HpXnX1jP07E30h/baT7x+hF3HKhatXu6PiHByNp2GF2M/VdOhjnjMS19P5t3ngpury/3vZzBPAJ8zCwI7igPGx6fnV+6dF4AHZ6oqCnzyEqixS8NKc3wsqaobW61gY6u1fmRcrUgr9gOfbE2ZafD4STjY8NcAJQGjFSi107fjSb1ld5t182B7fMDRHLka/xaKWN3WUKpOa245dZ8p1y4eLvPPGaAnHNwmwlE7jSdG0qED7bEvbvrmG4mxXW1WM/DKLtXUrgmcnTOA35QOQADSinBT19fR2fROJCd0C/ALwBAu3D9dVZ41wO2WylKg3k77QhHrnhdzgH1XYlGtuW6nRUUBqcsaYMliY6Mz1prXXs2dUJreSRORGjedK4BpyIYMgGi2AKm0nlwjsMlNN+UgunuqctnSIvOhna4FVtnjfsDT+8/sDWy3n6N2D9KKzlDEeuSIphzFPlMKgJn2bm2W5tOjxOkrQnfmRM5/RnmAPEAeYAqAUqRyCtD5fPg7kFxgz0JXAPsyOcDChrgCAGhwvXDMRyil+zLzP67lyQl9otAvEYF1QBnTiOcY48Cg0tzZcznWmznh+Vq+UPFvbcP/EuA3xoqtLr8mPo0AAAAASUVORK5CYII=')!;}\
			#rb-tooltip-href[data-rb-href^='mms'],\
			#rb-tooltip-href[data-rb-href^='rtsp']{background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIiSURBVFiFxZfPahRBEMZ/K6IHhRh3kWiJp0Q85KLsRVTEm03OOXlTJIp41Yp61fQLCEqIJ/UNpH0AhRWTePG/ghBsRTQKkosi6mFnoJ3M7M7OzDrfZejq7vq+qeqeqmkcn3tPndhQK3uWAKcy5lR2VEXiVMadyva0uUYyBU5lJ/AMGAFuApeN9d8KEo8CV4EZ4Ccgxvqv4ZqNKft+AVvoRucsMO1UZoEFY/2fnMQN4BQwB7Qi8w9gc3LtuhQY6z8DB4FOZGoB80DHqbRzkLejvfMBeQc4Zqz/mFy/LgWJtzgJ2MDR78jxpWQooxxfA04HL/YFUOBWVvQyBQSOwzzGjleBWWAhGsfhbgZCc52ftEPYAtJCPQ6cA/YFttfRc29gewlcB96m+Fgx1j/PFOBUdgMvgK29VJfEYWP9w3iQPISTQyYHOBIO0q5hjCvAUh9nsdi1PutGgbtpE70ELBnr7/dxnAtOZSxrbuBa4FT2RDejEhQpRgeAN05lxqmULmZFHTSBG8CiUzlUh4AY+4EHTuW2U9lVh4AYJ4BXTuWiU9lUhwDoXkkLPHUqU3UIKIQqBazRrXyTxvp7eTf1+hANgjvABWP9h0E3lhXwBDgfFpdBUTQFq8AZoF2GHIpFYBmYKNqolhZgrF+pgjiPgKNOZVtFPCN5BYSNo1ZEnsQ/zWnyED4Cvg+JGLo/J49DQ1pT2gQmhiTgnbH+U08B/xu114K/QvmcbYXDmJQAAAAASUVORK5CYII=')!;}\
			a[rb-highlight], a[rb-highlight] img, area[rb-highlight]{box-shadow:0px 0px 5px black, 0px 0px 5px white!;}\
		".replace(/@([^@]+)@/g, function(str, k) {
			return opts[k];
		}).replace(/!;/g, " !important;");
		
		rbTooltip = rbDiv.appendChild(document.createElement('div'));
		rbTooltip.id = "rb-tooltip";
		
		var rbTooltipHost = rbTooltip.appendChild(document.createElement('div'));
		var rbTooltipHref = rbTooltip.appendChild(document.createElement('div'));
		var rbTooltipMethod = rbTooltip.appendChild(document.createElement('div'));
		
		rbTooltipHref.id = "rb-tooltip-href";
		
		rbDiv.addEventListener('mouseover', function(ev) {
			disposed = false;
			if (ev.target.nodeName == "A") {
				var el = ev.target;
				if (opts.tooltipShowIcon) {
					rbTooltipHost.style.backgroundImage ="url(http://" + el.hostname + "/favicon.ico)";
				}
				
				rbTooltipHost.textContent = el.hostname;
				//FIXME: algorithm
				rbTooltipHref.textContent = ((el.href.length < 80)? el.href : el.host + "/" + el.pathname.slice(-40) + "..." + el.search.slice(40) );
				rbTooltipHref.setAttribute("data-rb-href", el.href);
				rbTooltipMethod.textContent = el.getAttribute("data-rb-tooltip");
				
				var pos = findPos(el);
				var left = el.offsetLeft - ((pos.x + el.offsetLeft + rbTooltip.offsetWidth > window.innerWidth)? rbTooltip.offsetWidth - el.offsetWidth  : 0 );
				left =  (left + rbDiv.offsetLeft > 1)? left : -rbDiv.offsetLeft;
				
				rbTooltip.style.top = ((pos.y - window.pageYOffset < rbDiv.offsetHeight + rbTooltip.offsetHeight)? rbDiv.offsetHeight : ~(rbTooltip.offsetHeight + -1)) + "px";
				rbTooltip.style.left =  left + "px";
				rbTooltip.style.visibility = "visible";
			}
		}, false);
	}
	
	function showShortcuts() {
		if (disposed) {
			return;
		}
		
		var links = {};
		var url = cTarget.href || cTarget.src || cTarget.data || "";
		var isPlugin = (cTarget.nodeName == "EMBED" || cTarget.nodeName == "OBJECT");
		var hasBt = false;
		var cn = rbDiv.childNodes.length;
		
		while(--cn) {
			rbDiv.removeChild(rbDiv.childNodes[cn]);
		}
		
		if (url) {
			if (opts.useDeobfuscator) {
				grabReverse(url, links);
				if (cTarget.protocol == "javascript:") {
					grabRaw(url.match(REGEXPS.MATCH_URLS), {info:["#Javascript"]}, links);
				}
				grabBase64(url, links);
				grabHex(url, links);
			}
			
			grabURL(url, {url:url}, links);
		}
		
		if (opts.getFromAttributes || isPlugin && opts.getFromPlugins) {
			grabAtts(cTarget, links);
		}
		
		if (opts.getFromTagText) {
			grabText(cTarget.textContent, links);
		}
		
		if (opts.maxCaptureRecursion) {
			Object.keys(links).forEach(function(k) {
				grabURL(links[k].url, links[k], links, opts.maxCaptureRecursion);
			})
		}
		
		Object.keys(links).sort(function(a, b) {
			var m2 = links[b].url.match(/\.([^\.\/?#]+)(?:[\?#]|$)/); //\.([^\/?#]+)(?:[\?#]|$)
			var m1 = m2 ? links[a].url.match(/\.([^\.\/?#]+)(?:[\?#]|$)/) : null;
			m2 = m2? extOrder.indexOf(m2[1]) : -1;
			m1 = m1 && m2 > -1 ? extOrder.indexOf(m1[1]) : -1;
			return ((m2 ==-1) ? -1 : ((m1 == -1) ? 1 : m1 - m2));	
			
		}).forEach(function(k) {
			if (links[k].url) {
				var link = links[k];
				link.url = (link.urlFixed) ? link.url : fixURL(link.url);
				
				if (REGEXPS.STARTSWITH_ALLOWEDPROTOCOL.test(link.url)) {
					var bt = document.createElement("a");
					bt.href = link.url;
					
					if (/javascript|data/i.test(bt.protocol) || (!isPlugin && bt.href == url) || (bt.href == window.location.href)) {
						return;
					}
					
					var info = (Array.isArray(link.info)? link.info.reverse() : []);
					hasBt = true;
					bt.setAttribute("data-rb-tooltip", info.join(" \u2022 "));
					bt.setAttribute("target", (opts.openInNewPage ? "_blank" : "_top"));
					
					icons.some(function(k, i) {
						if (k[0].test(bt.pathname)) {
							bt.style.setProperty("background-image", "url(" + k[1] + ")", "important");
							if (opts.iconAutoBackgroundColor) {
								bt.style.backgroundColor = getColor([i, info]);
							}
							return true;
						}
					});
					rbDiv.appendChild(bt);
				}
			}
		})
		
		if (hasBt) {
			(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(rbStyle);
			document.documentElement.insertBefore(rbDiv, document.documentElement.firstChild);
			
			var y = parseInt(rbDiv.style.top, 10) || 0;
			var x = parseInt(rbDiv.style.left, 10) || 0;
			var same = window.document.elementFromPoint(x - window.pageXOffset + window.document.documentElement.clientLeft, y  - window.pageYOffset  + window.document.documentElement.clientTop) == eTarget;
			var pos;
			
			if (isPlugin || eTarget.offsetHeight < 50) {
				pos = findPos(eTarget);
				y = ((pos.y - window.pageYOffset < rbDiv.offsetHeight) ? pos.y + eTarget.offsetHeight : (pos.y - rbDiv.offsetHeight));
				y =  (y + rbDiv.offsetHeight < window.document.documentElement.offsetHeight)? y : pos.y;
			} else if (!same) {
				y = ((pY - window.pageYOffset < rbDiv.offsetHeight) ? pY : (pY - rbDiv.offsetHeight));
			}
			
			if (isPlugin) {
				x = pos.x;
			} else if (!same) {
				x = pX + (((window.innerWidth - pX) < (rbDiv.offsetWidth * 2)) ? (pX - rbDiv.offsetWidth < 0)? -pX :-rbDiv.offsetWidth : 5);
			}
			
			rbDiv.style.top = y + "px";
			rbDiv.style.left = x + "px";
			
			if (opts.highlightLink) {
				cTarget.setAttribute("rb-highlight","");
			}
			
			rbDiv.style.visibility = "visible";
		}
	}
	
	function initShortcuts(ev, el) {
		if (opts.keyToActivate && !ev[opts.keyToActivate]) {
			return;
		}
		
		disposed = false;
		el = el || ev.currentTarget;
		eTarget = ev.target;
		
		if (el == cTarget) {
			return;
		}
		
		if (!rbDiv) {
			addDiv();
		}
		
		destroyShortcuts();
		cTarget = el;
		document.addEventListener("mousemove", documentOnMousemove, false);
		document.addEventListener("mouseout", hideShortcuts, false);
		timer = setTimeout(showShortcuts, opts.menuShowDelay);
	}
	
	function destroyShortcuts(f) {
		document.removeEventListener("mousemove", documentOnMousemove, false);
		document.removeEventListener("mouseout", hideShortcuts, false);
		clearTimeout(timer);
		
		if (rbDiv && rbDiv.parentNode) {
			rbDiv.style.visibility = "hidden";
			rbTooltip.style.visibility = "hidden";
			rbDiv.parentNode.removeChild(rbDiv);
			rbStyle.parentNode.removeChild(rbStyle);
		}
		
		if (cTarget) {
			cTarget.removeAttribute("rb-highlight");
			cTarget = null;
		}
		
		if (f) {
			rbDiv = rbStyle = rbTooltip = null;
		}
	}
	
	function hideShortcuts(ev) {
		if (rbTooltip) {
			rbTooltip.style.visibility = "hidden";
		}
		
		if (ev.type == "mouseout" && ev.toElement == cTarget) {
			return;
		}
		
		disposed = true;
		
		setTimeout(function() {
			if (disposed) {
				destroyShortcuts(true);
			}
		}, opts.menuHideDelay);
	}
	
	function documentOnMousemove(ev) {
		pX = ev.pageX;
		pY = ev.pageY;
	}
	
	function containsRedirect(el) {
		var u = el.href || el.src || el.data || "";
		if (u) {
			if (REGEXPS.CONTAINS_ALLOWEDPROTOCOL_MIDDLE.test(u)) {
				return true;
			}
			
			if (opts.useDeobfuscator) {
				if ((el.protocol == "javascript:") && REGEXPS.CONTAINS_ALLOWEDPROTOCOL.test(u)) {
					return true;
				}
				
				if (REGEXPS.CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL.test(u) || REGEXPS.CONTAINS_BASE64ENCODED.test(u) || REGEXPS.CONTAINS_HEXENCODED_ALLOWEDPROTOCOL.test(u)) {
					return true;
				}
			}
		}
		
		if (opts.getFromPlugins && (el.nodeName == "EMBED" || el.nodeName == "OBJECT")) {
			return true;
		}

		if (opts.getFromTagText && REGEXPS.CONTAINS_ALLOWEDPROTOCOL.test(el.textContent)) {
			return true;
		}
		
		if (opts.getFromAttributes) {
			var a = el.attributes;
			for (var i = 0, o; o = a[i]; i++) {
				if (!(REGEXPS.IS_EXCLUDED_ATTR.test(o.name)) && REGEXPS.CONTAINS_ALLOWEDPROTOCOL.test(o.value)) {
					return true;
				}
			}
		}
		
		return false;
	}
	
	function addEventToLink(el) {
		if (containsRedirect(el)) {
			el.addEventListener("mousemove", initShortcuts, false);
		} else if (opts.watchAttrModified) {
			observer.observe(el, { subtree: false , attributes: true, childList: false, characterData: false});
		}
	}
	
	function eventHandler(el) {
		if ((rbDiv && (el == rbDiv || rbDiv.compareDocumentPosition(el) & 16)) || el == cTarget) {
			return;
		}
		
		var n = el.nodeName;
		
		if (n == "A" || n == "AREA" || (opts.getFromPlugins && (n == "EMBED" || n == "OBJECT"))) {
			addEventToLink(el);
		} else if (el.querySelectorAll) {
			var els = el.querySelectorAll("area,a" + ((opts.getFromPlugins)? ",embed,object" : ""));
			for (var i = 0; i < els.length; i++) {
				addEventToLink(els[i]);
			}
		}
	}
	
	function start(data) {
		if (data && typeof data == "object") {
			Object.keys(data).forEach(function(k) {
				if (k in opts) {
					opts[k] = opts[k].constructor(data[k]);
				}
			})
		}
		
		allowedProtocols = opts.allowedProtocols.replace(/(\s+)?,(\s+)?/g, "|");
		REGEXPS = {
			/*MATCH_URLS : new RegExp("\\b((?:" + allowedProtocols + ":/?/?|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:\'\".,<>?«»“”‘’]))", "gi"),*/
			MATCH_URLS : new RegExp("\\b(?:(?:" + allowedProtocols + ")(:|(?:%(?:[^%]*25)?3A))|www\\.|ftp\\.)(?:\\([-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.]*\\)|[-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.])*(?:\\([-A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$?!:,.]*\\)|[A-Z0-9+&@#/%=~_\\u00B1-\\uFFFF|$])", "gi"),
			STARTSWITH_ALLOWEDPROTOCOL : new RegExp("^(" + allowedProtocols + ")(:|(?:%(?:[^%]*25)?3A))", "i"),
			CONTAINS_ALLOWEDPROTOCOL : new RegExp("(" + allowedProtocols + ")(:|(?:%(?:[^%]*25)?3A))", "i"),
			CONTAINS_ALLOWEDPROTOCOL_MIDDLE : new RegExp("[^^](" + allowedProtocols + ")(:|(?:%(?:[^%]*25)?3A))|[^/]/?www\d{0,3}[.]", "i"),/*FIXME*/
			CONTAINS_REVERSEENCODED_ALLOWEDPROTOCOL : new RegExp("(:|\\x253A)(" + reverse(allowedProtocols) + ")", "i"),
			CONTAINS_BASE64ENCODED : /[A-Z]{2}[a-z]{2}/, /*FIXME*/
			MATCH_BASE64ENCODED : /(?=[^=\/]*[A-Za-z0-9+\/][A-Z]*[A-Z][a-z])(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{4})(?:[=]{2})?/g, /*FIXME*/
			CONTAINS_HEXENCODED_ALLOWEDPROTOCOL : new RegExp("(" + allowedProtocols.replace(/\w+/g, function(s) { return hexEncode(s + ":"); }) + ")[^=?&]*", "i"),
			IS_EXCLUDED_ATTR : new RegExp("^(" + opts.excludedAttr.replace(/(\s+)?,(\s+)?/g, "|") + ")$", "i")
		}
		
		destroyShortcuts(true);
		observer.disconnect();
		
		if (window.document.readyState == "loading" || window.document.readyState == "uninitialized") {
			window.addEventListener("DOMContentLoaded", function(e) {
				eventHandler(e.target.body);
				if (opts.watchNodeInserted) {
					observer.observe(window.document.body, { subtree: true , attributes: false, childList: true, characterData: false});
				}
			}, false);
		} else {
			eventHandler(window.document.body);
			if (opts.watchNodeInserted) {
				observer.observe(window.document.body, { subtree: true , attributes: false, childList: true, characterData: false});
			}
		}
	}
	
	if (window.chrome && chrome.storage) {
		chrome.storage.onChanged.addListener(function(o) { 
			if (o.opts && typeof o.opts.newValue == "object") {
				start(o.opts.newValue);
			}
		});
		
		chrome.storage.local.get("opts", function(o) { 
			start(o.opts);
		})
	} else if (typeof onRedirectBypasserConfigChange == "function" && typeof redirectBypasserGetOpts == "function") {
		onRedirectBypasserConfigChange(function(e) {
			start(redirectBypasserGetOpts());
		});
		
		start(redirectBypasserGetOpts());
	} else {
		start();
	}
	

})();