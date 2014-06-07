// ==UserScript==
// @name           PPM 2 Numeric Grades - Extended
// @namespace      equimanthorn
// @match          http://*.popmundo.com/*
// @version        4.8.1
// @description    Numeric values and all the cool stuff
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @downloadURL    https://userscripts.org/scripts/source/135906.user.js
// @updateURL      https://userscripts.org/scripts/source/135906.meta.js
// ==/UserScript==
// ==UserScript==
// @name        Numeric Grades
// @namespace   popmundo
// @include     http://*.popmundo.com/*
// @grant       GM_log
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_openInTab
// @grant       GM_xmlhttpRequest
// @version     4.8.1
// ==/UserScript==

/*
x = name && name[1]

	TO DO LIST

*/
var NG = {
	utils: {
		toArray: function (t) {
			var arr = []; for (var i = 0; i < t.length; i++) arr.push(t[i]); return arr;
		},
		injectCSS: function (css) {
			if (css.length < 1) return;
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node);
			}
		}
	},
	features: {
	/*	name: {
			fn: function => main function
			options: {
				enabled => on/off. generates checkbox on UI
				text => UI menu item text
				tab => UI menu tab
				selected => selected from optionList. generatex select on UI
				path => REGEX match for document.location.pathname
				help => help url
			},
			optionList: {
				item: { name: "dropdown name", ... }
				item:
			}
		}*/
		progressBars: {
			fn: function (c) {
				if (!c) c = document;
				var b = c.querySelectorAll(".blueProgressBar, .greenProgressBar, .progressBar");
				for (var i=b.length;i--;)
					a = b[i], e=!0==/(%{0,1}[\d]+%{0,1})/i.test(a.title) ? a.title.match(/(%{0,1}[\d]+%{0,1})/i)[1] : a.title,a.firstChild ? (a.firstChild.textContent=e+"\u00a0",a.firstChild.align="right",a.firstChild.style.lineHeight="9px",a.firstChild.style.fontSize="10px",a.firstChild.style.color= "#000"):(a.textContent=e,a.style.color="#000");
				b = c.getElementsByClassName("plusMinusBar");
				for (var i=b.length;i--;)
					(a=b[i])&&0<a.getElementsByClassName("PPM2_Numeric_Grades").length||(e=document.createElement("div"),e.textContent=a.title.match(/(-*[\d]+%)/i)[1],e.style.color="#000",e.style.lineHeight="8px",e.style.fontSize="9px",e.style.fontWeight="normal",e.style.fontFamily="Tahoma, Geneva, sans-serif",e.style.display="inline",e.style.position="absolute",e.style.width="0px",e.className="PPM2_Numeric_Grades", 0<a.getElementsByClassName("neg").length?a.childNodes[0].firstChild.appendChild(e):0<a.getElementsByClassName("pos").length?a.childNodes[1].firstChild.appendChild(e):(a.childNodes[1].firstChild.appendChild(e),a.childNodes[1].firstChild.style.width="0%"));
				return!0
			},
			options: {
				enabled: true,
				text: "Numeric Progress Bars",
				tab: "main",
				help: 'http://s3.amazonaws.com/uso_ss/20748/large.png?1363553739'
			}
		},
		numericGrades: {
			fn: function () {
				NG.utils.injectCSS('a.PPM2_Numeric_Grades + span { display: inline-block; margin-left: 5px; padding: 0 5px; border: 5px; font-weight: bold; border-radius: 10px; text-shadow: none; }');
				this.ng();
			},
			ng: function (c) {
				c||(c=document);
				var b = c.href ? Array(c) : c.querySelectorAll('a[href*="Help/Scoring/"]');
				for (var i=b.length;i--;) {
					var a = b[i];
					if (!a.classList.contains("PPM2_Numeric_Grades") && a.href.indexOf('Help/Scoring/')>-1) {
						var e = a.href.match(/\/Help\/Scoring\/(\d+)/i)[1]-1,
						h = NG.features.numericGrades.optionList[NG.features.numericGrades.options.selected][e],
						j = document.createElement("span");
						j.style.color = h[1];
						j.style.backgroundColor = h[0];
						j.textContent = " "+e;
						a.className = "PPM2_Numeric_Grades";
						a.parentNode.insertBefore(j, a.nextSibling)
					}
				}
			},
			options: {
				enabled: true,
				text: "Numeric Grades",
				selected: "rain",
				tab: "main",
				help: "http://s3.amazonaws.com/uso_ss/20751/large.png?1363553875"
			},
			optionList: {
				grad: {
					name: "Gradient", 0: ["rgb(245,245,245)", "rgb(0,0,0)"], 1: ["rgb(236,236,236)", "rgb(0,0,0)"], 2: ["rgb(226,226,226)", "rgb(0,0,0)"], 3: ["rgb(217,217,217)", "rgb(0,0,0)"], 4: ["rgb(207,207,207)", "rgb(0,0,0)"], 5: ["rgb(198,198,198)", "rgb(0,0,0)"], 6: ["rgb(188,188,188)", "rgb(0,0,0)"], 7: ["rgb(179,179,179)", "rgb(0,0,0)"], 8: ["rgb(170,170,170)", "rgb(0,0,0)"], 9: ["rgb(160,160,160)", "rgb(0,0,0)"], 10: ["rgb(151,151,151)", "rgb(0,0,0)"], 11: ["rgb(141,141,141)", "rgb(255,255,255)"], 12: ["rgb(132,132,132)", "rgb(255,255,255)"], 13: ["rgb(122,122,122)", "rgb(255,255,255)"], 14: ["rgb(113,113,113)", "rgb(255,255,255)"], 15: ["rgb(103,103,103)", "rgb(255,255,255)"], 16: ["rgb(94,94,94)", "rgb(255,255,255)"], 17: ["rgb(85,85,85)", "rgb(255,255,255)"], 18: ["rgb(75,75,75)", "rgb(255,255,255)"], 19: ["rgb(66,66,66)", "rgb(255,255,255)"], 20: ["rgb(56,56,56)", "rgb(255,255,255)"], 21: ["rgb(47,47,47)", "rgb(255,255,255)"], 22: ["rgb(37,37,37)", "rgb(255,255,255)"], 23: ["rgb(28,28,28)", "rgb(255,255,255)"], 24: ["rgb(18,18,18)", "rgb(255,255,255)"], 25: ["rgb(9,9,9)", "rgb(255,255,255)"], 26: ["rgb(0,0,0)", "rgb(255,255,255)"]
				},
				rain: {
					name: "Rainbow", 0: ["#ff0000", "rgb(255,255,255)"], 1: ["#ff0036", "rgb(255,255,255)"], 2: ["#ff006c", "rgb(255,255,255)"], 3: ["#ff00a2", "rgb(255,255,255)"], 4: ["#ff00d8", "rgb(255,255,255)"], 5: ["#f000ff", "rgb(255,255,255)"], 6: ["#ba00ff", "rgb(255,255,255)"], 7: ["#8400ff", "rgb(255,255,255)"], 8: ["#4e00ff", "rgb(255,255,255)"], 9: ["#1900ff", "rgb(255,255,255)"], 10: ["#001dff", "rgb(255,255,255)"], 11: ["#0053ff", "rgb(255,255,255)"], 12: ["#0089ff", "rgb(255,255,255)"], 13: ["#00bfff", "rgb(255,255,255)"], 14: ["#00f5ff", "rgb(0,0,0)"], 15: ["#00ffd3", "rgb(0,0,0)"], 16: ["#00ff9d", "rgb(0,0,0)"], 17: ["#00ff67", "rgb(0,0,0)"], 18: ["#00ff31", "rgb(0,0,0)"], 19: ["#05ff00", "rgb(0,0,0)"], 20: ["#3bff00", "rgb(0,0,0)"], 21: ["#71ff00", "rgb(0,0,0)"], 22: ["#a7ff00", "rgb(0,0,0)"], 23: ["#ddff00", "rgb(0,0,0)"], 24: ["#ffeb00", "rgb(0,0,0)"], 25: ["#ffb500", "rgb(0,0,0)"], 26: ["#ff8000", "rgb(0,0,0)"]
				}
			}
		},
		tabs: {
			fn: function () {
				//var notes = document.querySelectorAll("#notifications li a:nth-of-type(1)");
				var notes = document.querySelectorAll("div#top-menu-notifications-list div.notification-item > a:nth-of-type(2)");
				if (document.location.hash) {
					for (var hash = document.location.hash.replace("#",""), i=0; i < notes.length; i++) {
						if ((notes[i].onclick) && (-1<String(notes[i].onclick).indexOf(hash))) {
							notes[i].click();
							break;
						}
					}
				}
				for (var i = 0; i < notes.length; i++) {
					if (!/["'](.*)["']/gi.test(notes[i].onclick)) continue;
					NG.features.tabs.process(notes[i]);
				}
			},
			process: function (e) {
				if (!e) return
				e.addEventListener("mousedown",NG.features.tabs.clickHandler,!0);
				e.addEventListener("click",NG.features.tabs.clickHandler,!0);
				e.href = "#"+String(e.onclick).match(/["'](.*)["']/gi)[0].replace(/["']/g,"");
			},
			clickHandler: function (c) {
				if (1==c.which&&(c.ctrlKey||c.shiftKey)||2==c.which) {
					c.stopPropagation();
					c.preventDefault();
					c.cancelBubble=!1;
					this.removeEventListener("mousedown",NG.features.tabs.clickHandler,!0);
					this.removeEventListener("click",NG.features.tabs.clickHandler,!0);
					this.focus();
					var c = JSON.stringify({
						ts: new Date().getTime(),
						arg: String(this.onclick).match(/\(this, (.*)\)/i)[1].replace(/[\'"]/g,"")
					},null),
					b = document.location.protocol+"//"+document.location.hostname+"/WebServices/A/Open.asmx/ClickNotification",
					d = new XMLHttpRequest;
					GM_log(c);
					this.parentNode.parentNode.removeChild(this.parentNode);
					1>document.querySelectorAll("#notifications ul li").length&&(document.getElementById("notifications").className="hidden");
					d.onreadystatechange = function() {
						if (4==d.readyState && 200==d.status){
							var a=document.createElement("div");
							a.innerHTML = d.responseText.replace(/<script(.|\s)*?\/script>/ig,"");
							ret = document.location.protocol+"//"+document.location.hostname+"/"+a.innerHTML.match(/\/(.*)\\"/)[1];
							GM_openInTab?GM_openInTab(ret):window.open(ret)
						}
					};
					d.open("POST",b,!0);
					d.setRequestHeader("Content-type","application/json;charset=utf-8");
					d.setRequestHeader("Content-length",c.length);
					d.send(c);
					this.parentNode.parentNode.removeChild(this.parentNode);
					return!1
				}
			},
			options: {
				enabled: true,
				text: "Notifications in seperate tabs",
				tab: "main",
				help: "http://s3.amazonaws.com/uso_ss/20753/large.png?1363554044"
			}
		},
		/*active: {
			fn: function () {
				var c=document.getElementById("sidemenu").getElementsByTagName("a"),b=document.location.href;
				if(b.match(/\w+(?:$|\/\d+)/i)==(c[0]?c[0].href.match(/(\w+)(?:$|\/\d+)/i)[1]:!1))return c[0].parentNode.style.backgroundColor="#FFF",!0;
				for(i=c.length;	i--;)
					if (b == c[i].href)
						return c[i].parentNode.style.backgroundColor="#FFF",!0
			},
			options: {
				enabled: true,
				text: "Highlight active page on side menu",
				tab: "extras"
			}
		},*/
		hideText: {
			fn: function () {
				if(!(0<document.location.pathname.indexOf("/Thread/"))){
					var b;
					b=-1<navigator.userAgent.toLowerCase().indexOf("firefox")?"-moz":"-webkit";
					var d=document.getElementById("content").getElementsByTagName("p");
					for (var i=d.length-1;0<=i;i--)
						!(1<d[i].childNodes.length)&&"ctl00_cphLeftColumn_ctl00_divNoteFromManagement"!=d[i].parentNode.id&&"ctl00_cphLeftColumn_ctl00_divBlog"!=d[i].parentNode.id&&(6>d[i].parentNode.childNodes.length?0===d[i].parentNode.childNodes[1].tagName.indexOf("H")&& 2>d[i].offsetHeight/parseInt(window.getComputedStyle(d[i],"").lineHeight):2>=d[i].offsetHeight/parseInt(window.getComputedStyle(d[i],"").lineHeight,10)||(d[i].setAttribute("style",b+"-transition: max-height 0.5s;"),d[i].style.maxHeight="20px",d[i].style.overflow="hidden",d[i].style.cursor="pointer",d[i].style.marginBottom="2px",d[i].style.borderBottom="dotted 1px",d[i].addEventListener("click",NG.features.hideText.clickHandler,!0)));
				}
			},
			clickHandler: function (a) {
					a = a.target;
					"P"==a.tagName?0<window.getSelection().toString().length&&a==window.getSelection().getRangeAt(0).startContainer.parentNode||("20px"==a.style.maxHeight?(a.style.maxHeight="999px",a.style.borderBottom="none",a.style.marginBottom="15px"):(a.style.maxHeight="20px",a.style.borderBottom="dotted 1px",a.style.marginBottom="2px")):0==a.tagName.indexOf("H")&&(a=a.parentNode.getElementsByTagName("P"),1>a.length||(a=a[0],"7px"==a.style.maxHeight?(a.style.maxHeight="999px",a.style.borderBottom="none"): (a.style.maxHeight="7px",a.style.borderBottom="dotted 1px")))
			},
			options: {
				enabled: false,
				text: "Collapse long text",
				tab: 'extras'
			}
		},
		images: {
			fn: function () {
				function c(a,c){
					try{
						for(var b = document.querySelector(a);"transparent"==window.getComputedStyle(b,"").backgroundColor;)
							b = b.parentNode;
						b = window.getComputedStyle(b,"").backgroundColor
					}
					catch(d){
						b = "rgb(238, 238, 238)"
					}
					null!==c&&(b=b.toString().replace("rgb","rgba").replace(/\)$/,", "+c+")"));
					return b
				}
				var b = document.querySelectorAll("#content .gameimage")
				for (var i=b.length;i--;) {
					if(!(-1<b[i].className.indexOf("entityLogo"))){
						document.getElementById("content").style.position= "relative";
						document.getElementById("content").style.zIndex="1";
						document.getElementById("wrapper").style.overflow="hidden";
						document.getElementById("statusbar").style.zIndex="2";
						document.getElementById("notifications").style.zIndex="2";
						var a = '.content:before {\
							position:absolute;\
							left:0;\
							top:0;\
							width:100%;\
							height:260px;\
							z-index:-1;\
							content: "";\
							opacity: .3;\
							background:'+window.getComputedStyle(b[i],"").backgroundImage+" no-repeat transparent;\
							background-size: auto;\
							}\
							table.data tr.even td {\
							 background: none repeat scroll 0 0 "+ c("table.data tr.even td",0.7)+" !important;\
							}\
							table.data tr.odd td {\
							 background: none repeat scroll 0 0 "+c(".box",0.7)+" !important;\
							}\
							.content div.box {\
							 background: none repeat scroll 0 0 "+c(".box",0.5)+" !important;\
							}\
						";
						b[i].parentNode.removeChild(b[i]);
						var e=document.getElementsByTagName("head");
						if (0<e.length) {
							var h=document.createElement("style");
							h.type="text/css";
							h.appendChild(document.createTextNode(a));
							e[0].appendChild(h)
						}
					}
				}
			},
			options: {
				enabled: false,
				text: "Move big images to background",
				tab: "extras"
			}
		},
		update: {
			fn: function () {
				if (NG.features.update.options.updateAvailable) {
					NG.features.update.notify();
				}
				else if (parseInt(+new Date().valueOf()-NG.features.update.options.lastCheck) > 604800000) { // 1 week
					GM_xmlhttpRequest({
						method: 'GET',
						url: NG.features.update.options.updateUrl,
						onload: function (res) {
							NG.options.set('update','lastCheck',new Date().valueOf());
							var remoteVersion = res.responseText.match(/\/\/\s+@version\s+([\d\.]+)$/mi);
							if (!remoteVersion) {
								GM_log('Error parsing remote file!');
								return;
							}
							if (remoteVersion[1] > NG.version) {
								NG.options.set('update','updateAvailable',true);
								NG.features.update.notify();
							}
						}
					});
				}
			},
			notify: function () {
				var aClose = document.createElement('div');
				aClose.textContent = 'Numeric Grades Update Available';
				aClose.classList.add('notification-success');
				aClose.onclick = function (t) {
					NG.options.set('update','updateAvailable',false);
					GM_openInTab(NG.features.update.options.url);
					t.target.parentNode.removeChild(t.target);
					if (document.querySelectorAll('#notifications > div').length < 1) {
						document.getElementById('notifications').classList.add('hidden');
						document.getElementById('notifications').style.display = 'none';
					}
				};
				var nots = document.getElementById('notifications');
				nots.appendChild(aClose);
				nots.classList.remove('hidden');
				nots.style.display = 'block';
			},
			options: {
				enabled: true,
				text: "Auto update",
				tab: "extras",
				url: "http://userscripts.org/scripts/source/135906.user.js",
				updateUrl: "http://userscripts.org/scripts/source/135906.meta.js",
				site: 'http://userscripts.org/scripts/show/135906',
				lastCheck: 0,
				updateAvailable: false
			}
		},
		seconds: {
			fn: function () {
				unsafeWindow._ptrn = NG.features.seconds.optionList[NG.features.seconds.options.selected].set;
				if (unsafeWindow.updateGameClock) setTimeout( function () { unsafeWindow.updateGameClock(); }, 0);
			},
			options: {
				enabled: true,
				text: "Show seconds in game clock",
				tab: "extras",
				selected: "AMPM"
			},
			optionList: {
				AMPM: {
					name: "AM-PM",
					set: "h:mm:ss tt"
				},
				24: {
					name: "24 Hour Clock",
					set: "HH:mm:ss"
				}
			}
		}
	},
	options: {
		set: function (module, option, value) {
			if (!module || !option || value == null) return false;
			var data = NG.options.load(); // because I don't want to save default values
			NG.features[module].options[option] = value;
			if (!data[module]) data[module] = {};
			data[module][option] = value;
			NG.options.save(data);
			return true;
		},
		get: function (module, option) {
		},
		save: function (data) {
			if (!data) return undefined;
			GM_setValue('numeric_grades_options', JSON.stringify(data));
			return true;
			/*for (i in data) {
				for (j in data[i])
					alert(i+'.options.'+j+' = '+data[i][j])
			}*/
		},
		load: function () {
			var data = GM_getValue('numeric_grades_options','{}');
			if (data.length < 1) data = '{}';
			data = JSON.parse(data);
			for (i in data) {
				for (j in data[i]) {
					if (NG.features[i]) NG.features[i].options[j] = data[i][j];
					//alert(i+'.options.'+ j + ' = ' + data[i][j])
				}
			}
			return data;
		}
	},
	UI: {
		beaker: function () {
			var c = document.createElement("A");
			c.className = "icon";
			c.title = "Numeric Grades";
			c.id = "ppm_numeric_grades";
			c.style.cursor = "pointer";
			var b = document.createElement("img");
			b.src = "/Static/Icons/beaker.png";
			b.id = "ppm_numeric_grades_menu";
			c.appendChild(b);
			// try 'more shortcuts' first and if it fails switch to regular shortcuts
			b = document.getElementById('ctl00_ucCharacterBar_divMoreShortcuts');
			if (!b) {
				b = document.getElementById('character-tools-shortcuts');
			}
			if (!b) return; // we must be logged out from the game
			b.appendChild(c);
			document.getElementById("ppm_numeric_grades_menu").addEventListener("click", NG.UI.userInterface,!0);
		},
		userInterface: function () {
			if (document.getElementById("ppm_numeric_grades_options")) return;
			document.querySelector('body').classList.remove('ng_options_recover');
			document.querySelector('body').classList.add('ng_options_disabled');
			NG.utils.injectCSS("#ppm_numeric_grades_options {\n\tcursor: auto;\n\tposition: fixed;\n\tcolor: #111;\n\tfont-family: Tahoma !important;\n\tfont-size: 16px !important;\n\twidth: 100%;\n\theight: 100%;\n\ttop: 0;\n\tleft: 0;\n\tbackground: rgba(0, 0, 0, 0.3);\n}\n#ppm_numeric_grades_options_container {\n\tz-index:2;\n\tposition: fixed;\n\tleft: 50%;\n\ttop: 50%;\n\tmargin-left: -250px;\n\tmargin-top: -230px;\n\twidth: 500px;\n\theight: 440px;\n\tbackground: none repeat scroll 0% 0% #6D7F8C;\n\tborder: 1px solid #222222;\n\tbox-shadow: 2px 4px 2px rgba(0, 0, 0, 0.65);\n\tpadding: 10px;\n}\n#ppm_numeric_grades_options_titlebar {\n\tbackground-color: #333;\n\tcolor: #FFF;\n\tmargin: -10px -10px 10px -10px;\n\tpadding: 0 10px;\n\tborder-bottom: 1px solid #222;\n\tcursor: default;\n}\n#ppm_numeric_grades_options_close {\n\tfont-size: 14px;\n\tposition: absolute;\n\tright: 10px;\n\tbottom: 8px;\n\tcursor: pointer;\n\tmargin: 0 0 0 0;\n\tcolor: #222;\n\tbackground-color: #A33;\n\tpadding: 6px 40px;\n\tfont-weight: bold;\n\tborder: 1px solid #000;\n\tborder-radius: 2px;\n\t-webkit-transition: background-color 0.3s;\n\t-moz-transition: background-color 0.3s;\n\ttransition: background-color 0.3s;\n}\n#ppm_numeric_grades_options_close:hover {\n\tbackground-color: #E66;\n\tcolor: #222;\n\tborder: 1px solid #33647D;\n}\n.ppm_numeric_grades_tab {\n\tfloat: left;\n}\n.ppm_numeric_grades_tab > label {\n\tbackground: none repeat none 0% 0% #FFF;\n\tborder: 1px solid #222;\n\tcolor: #222;\n\tfont-weight: normal;\n\tpadding: 5px 10px;\n\tposition: relative;\n\tleft: 0px;\n\tcursor: pointer;\n\tdisplay: block;\n\tborder-radius: 10px 10px 0 0;\n\twidth: 60px;\n\ttext-transform: capitalize;\n\ttext-align: center;\n\tletter-spacing: 0.1em;\n\t-webkit-transition: border-color 0.5s, color 0.5s;\n\t-moz-transition: border-color 0.5s, color 0.5s;\n\ttransition: border-color 0.5s, color 0.5s;\n}\n.ppm_numeric_grades_tab > label:hover {\n\tborder: 1px solid #333;\n\ttext-decoration: underline;\n\tcolor: #222;\n}\n.ppm_numeric_grades_tab [type=radio] {\n\tdisplay: none;\n}\n#ppm_numeric_grades_options_container [type=radio]:checked ~ label {\n\tcolor: #222;\n\ttext-shadow: 0px 1px 2px #555 !important;\n\tbackground: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAJJklEQVRogW3aXZWsuhYF4DjIwAIWYgELWCgLWMACFrAQC1jAAha4D3W+nNl17sMe3V0FyfqZa66ZlV3O86zrutZ1XeuyLHWapjrPc32ep87zXLdtq8/z1HVd633f9TiO2lqrx3HU67rqcRx1WZa6bVt937dO01Tf96299/r5fMa/3vtYe9u2uq5r3batTtNU13WtrbXae6/rutZ938e67FiWZeyTP8/zrNd11cKg1lq9rmtssq5rPY5jGFJKGY723uvzPPW+7zrPcz2Oox7HMX7ftq3e9133fa+fz6ee51nv+x5rn+c5nNv3vV7XNRxb17VO0zT2Zey2bfU4jvHONE11mqbxXbnvu07TVP20qCid51nnea7zPI/f7/uun8+nttZqa20Yx8nruup5nvV5nhHVbduGg+d51n3fxz7zPP/JIOdkUKaP46jruo4sebeUUkvvvW7bVj+fzzCetz6773tsVEoZ6fesxXvvI0v3fQ9IPs9Tr+saWYAAjgnKvu91WZZ6HMcf4xPOvfcRCGXRWvs6wliRs4AscEq99N7/fCfqpZT6+XxG/YCfNe3xPM+AjXV6739ged/3gPe+7wNO67r+CcjIiofSsOu6BtTmeR7Rz2JUT/M8j6K/rmvAMKEDflmD13UN49XMsiy1lDKcP89zZE62Wmuj+MGq9/515PP5DHzDKyMZ1FobEPGyZ+d5rtM0DXjk5ulAKWUYLppYbp7nQQxg4+/neUZW2Lbve33ft67rWt/3rYWRUshQqW2tDQaywXEco2jBQCAUPlzDcTKZukjmeZ6nttbqsix13/dRt0lCvue8tZZl+TrCoGQIfeV5nuGkLHEOVs/zrO/7jjVkTqGCBSaapmk4Br6ttT/9Ri0kZNly3/ewc9/3b30qQs5YcFmWwVZekMrrukbmUDB+x2SKWn9KWl2W5Y+RoCIoHJbNhBXIecbPwnhpglfds5QyGh0Yve87YMNQTfK6rvq+7yhGxvfea+99OJod/n3fQbnbtv2BKOb6tQWLyXzJDq4GOCLaIiyasIpBfA9667oOJZCR04OywK0l0qWUUWPe+XUiUfI8zzcj0pQwgVUwyoLU5DCTTTLq2WdoJBlgwH3fI3v2QwAM1qPUrl6m5qCg915La62+7zsMxQJSrNGlqGRg4l2z852fqccYo8EqdrDVV1AxO57n+Y8gFYjREOHcpvCnc/pdLYmATekqmFbYGqMNM5PY8DcA+74P6reGQFMNMookBgQVoOjDpyguyzKYg8EWpQQ0xtRhICuisuQ5qpVkB6XsSd6TNTDjZAaowLOiItoYaQHZ0ahkTq0wGhw01JQ82ZMESC2mOkhZk+STR4b3fcee0zR9WYuRYJPUyjGG/b9GqWPr5glBzsI4OCluwWGo9RW2+pWlFIwp54uNFW6e+EQrFSe9BIaMQOOeEV00rVtn1y6l/MG7fuJ7tQKe9uKckriuqxYeoVbFmydGDKIYEwLpSDJesh74WYfkSOiBWaqAZDWfK4FUzOOoiyIVukUVm+IVFYbRWJTBL96tAQLqRKRFO6W5I0U2zTyzE4+IA5JKUmhunDI8BR6cvu87HEWDqU4xUwo8NXKe5zgKYJ0MImomcWRYr1PTaU/R+uFd9HKKkUfepFiZoq08Bzr6j2xmA00ZhMU4h7odgTGrzzOj7CuKDAvx1k9NUpbgGueDRjKKgxAYqCmG2c9a1gY1mRMgvetXGUPJ8zzfYldc8AuzIiAiKRI1ODyfuix7CMxreFiNVkIKHMi+Zu8UlMglG+4YPuRoBV5/BaGIio5IZIPiGHWqz2T0RRo5pOGgosZoLBnPYOS8a9u2L7TgFIQysnDuJThPMtBEFTxaTOUrOznssK8mSOWqnZRCyIAjmu44IWbTYWh2eMZgHw7bBEwwjEMQg73PUSJSTYGNZohkwPhXcLI3lcT7vrUwUgQ0w4RAzpYcwsDN3xpfHo91ceftHDjkuSQHF7Lk/JJ9DoSpCs30PM9/G2IO0HImVUoZRYa7QTAnjpzLz/QA2U2aTzkPTghAZhz2SBmokQWM1lr7QivTh5917ey4WbTo1Tlbf8kpiojKjOJW0HmY41AO0RNivjM3ADvkVBxoFLTMaJS/c14RTRkNSpoYme9z0dZAUSqpAaaCQJhms0y1IGBouLX2rRHQSNqDx181nJIk51EW9p7U5xUCygZZR1/k4vM82qb6RkY5GzOiKjm5yEZjIQ0I3eVpTrZSEzEInhlO/OngeZZIBsv1/S2A1vCsRrosy7ePpAZifMoUsPH5/5u2gKY1GJrDbx0f8+T1QjLjr0LI84nPUDBnCozmtC+1FJGGEGA+9VP2kN/Bd14WqRPG/WY7rwERCjtkPE+XamoMsTUZolHUsAzK1eXhEjmkXAEvz+WhS4GTOOhWtJNOqYHfke6YLP5DRt4tDjymJP7x2MJ5dvi9dPEMBqSfclJvQzVi+sLQJBXZ+u30eXmaDbH3/mWt34m4CCSfa4I5ZcnOq3YUIeM8RynkEEKjRBjZIJEFZnJeyXuYXKuIag6fndKym+o1ZAlqBbmctKgXgUAm9kC3ZE0yHecUM/uQUDrhved5vlMURpACaiINIRIzczJgg7w0ymJnSMIPbH7XzPVSCqW2U1uge11XLSKft7Y51/VC3kXIWs5mSY0khRzlmMoIUgpIQUE0jgFYMBsyGNp/HJNFEmYVJIdycoHZUnOJvjoQdZHDMJ5Fq7mXz1LTJbHkVUXeKnv+PM9/T4gigrFSsnAEPpMIGAKaeVOb82T1k2f7vMiRZQHyTk72zdXyInZ8Tsjl5aV+Iu02+O3e4+D/j7N5CZSzWhDNwUU+n7M0dpDwOTRUZ5ou1rrv+9vZU8twIh1BAChWkTFAdPKGKaW6TfN4C7KoOx1NAZpzNWejnEsLfkkcSnUOzTQc0sD3mIV0V4gKPOdb9pA9aiHPH3mcMMjIIZz31bRgj5FpjvvJapHFIpmBPLam/E4ZLpIy4eo6Z8IyI+vgqhXk2Z/T0JBkoAZLpgcV50Qx/3tTXnvhfBvlVBK2x+ntn7VyHJsaKweDIC7ymCpbBGmDaJZl+dZI6iJ4zwEY3GILcyhRJeBy2J3D6nxPVP8zPPgH+3nm+R2ZUgaYDrRba/V/AeS557cZ758AAAAASUVORK5CYII=') repeat scroll 0 0  #AEC8CF;\n\tborder: 1px solid #33647D;\n\tborder-bottom: 1px solid #AEC8CF;\n\tz-index: 4;\n}\n.ppm_numeric_grades_content {\n\tposition: absolute;\n\ttop: 64px;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tpadding: 20px;\n\tmargin: 0 10px 50px;\n\toverflow: hidden;\n\tborder: 1px solid #33647D;\n\tbackground: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAJJklEQVRogW3aXZWsuhYF4DjIwAIWYgELWCgLWMACFrAQC1jAAha4D3W+nNl17sMe3V0FyfqZa66ZlV3O86zrutZ1XeuyLHWapjrPc32ep87zXLdtq8/z1HVd633f9TiO2lqrx3HU67rqcRx1WZa6bVt937dO01Tf96299/r5fMa/3vtYe9u2uq5r3batTtNU13WtrbXae6/rutZ938e67FiWZeyTP8/zrNd11cKg1lq9rmtssq5rPY5jGFJKGY723uvzPPW+7zrPcz2Oox7HMX7ftq3e9133fa+fz6ee51nv+x5rn+c5nNv3vV7XNRxb17VO0zT2Zey2bfU4jvHONE11mqbxXbnvu07TVP20qCid51nnea7zPI/f7/uun8+nttZqa20Yx8nruup5nvV5nhHVbduGg+d51n3fxz7zPP/JIOdkUKaP46jruo4sebeUUkvvvW7bVj+fzzCetz6773tsVEoZ6fesxXvvI0v3fQ9IPs9Tr+saWYAAjgnKvu91WZZ6HMcf4xPOvfcRCGXRWvs6wliRs4AscEq99N7/fCfqpZT6+XxG/YCfNe3xPM+AjXV6739ged/3gPe+7wNO67r+CcjIiofSsOu6BtTmeR7Rz2JUT/M8j6K/rmvAMKEDflmD13UN49XMsiy1lDKcP89zZE62Wmuj+MGq9/515PP5DHzDKyMZ1FobEPGyZ+d5rtM0DXjk5ulAKWUYLppYbp7nQQxg4+/neUZW2Lbve33ft67rWt/3rYWRUshQqW2tDQaywXEco2jBQCAUPlzDcTKZukjmeZ6nttbqsix13/dRt0lCvue8tZZl+TrCoGQIfeV5nuGkLHEOVs/zrO/7jjVkTqGCBSaapmk4Br6ttT/9Ri0kZNly3/ewc9/3b30qQs5YcFmWwVZekMrrukbmUDB+x2SKWn9KWl2W5Y+RoCIoHJbNhBXIecbPwnhpglfds5QyGh0Yve87YMNQTfK6rvq+7yhGxvfea+99OJod/n3fQbnbtv2BKOb6tQWLyXzJDq4GOCLaIiyasIpBfA9667oOJZCR04OywK0l0qWUUWPe+XUiUfI8zzcj0pQwgVUwyoLU5DCTTTLq2WdoJBlgwH3fI3v2QwAM1qPUrl6m5qCg915La62+7zsMxQJSrNGlqGRg4l2z852fqccYo8EqdrDVV1AxO57n+Y8gFYjREOHcpvCnc/pdLYmATekqmFbYGqMNM5PY8DcA+74P6reGQFMNMookBgQVoOjDpyguyzKYg8EWpQQ0xtRhICuisuQ5qpVkB6XsSd6TNTDjZAaowLOiItoYaQHZ0ahkTq0wGhw01JQ82ZMESC2mOkhZk+STR4b3fcee0zR9WYuRYJPUyjGG/b9GqWPr5glBzsI4OCluwWGo9RW2+pWlFIwp54uNFW6e+EQrFSe9BIaMQOOeEV00rVtn1y6l/MG7fuJ7tQKe9uKckriuqxYeoVbFmydGDKIYEwLpSDJesh74WYfkSOiBWaqAZDWfK4FUzOOoiyIVukUVm+IVFYbRWJTBL96tAQLqRKRFO6W5I0U2zTyzE4+IA5JKUmhunDI8BR6cvu87HEWDqU4xUwo8NXKe5zgKYJ0MImomcWRYr1PTaU/R+uFd9HKKkUfepFiZoq08Bzr6j2xmA00ZhMU4h7odgTGrzzOj7CuKDAvx1k9NUpbgGueDRjKKgxAYqCmG2c9a1gY1mRMgvetXGUPJ8zzfYldc8AuzIiAiKRI1ODyfuix7CMxreFiNVkIKHMi+Zu8UlMglG+4YPuRoBV5/BaGIio5IZIPiGHWqz2T0RRo5pOGgosZoLBnPYOS8a9u2L7TgFIQysnDuJThPMtBEFTxaTOUrOznssK8mSOWqnZRCyIAjmu44IWbTYWh2eMZgHw7bBEwwjEMQg73PUSJSTYGNZohkwPhXcLI3lcT7vrUwUgQ0w4RAzpYcwsDN3xpfHo91ceftHDjkuSQHF7Lk/JJ9DoSpCs30PM9/G2IO0HImVUoZRYa7QTAnjpzLz/QA2U2aTzkPTghAZhz2SBmokQWM1lr7QivTh5917ey4WbTo1Tlbf8kpiojKjOJW0HmY41AO0RNivjM3ADvkVBxoFLTMaJS/c14RTRkNSpoYme9z0dZAUSqpAaaCQJhms0y1IGBouLX2rRHQSNqDx181nJIk51EW9p7U5xUCygZZR1/k4vM82qb6RkY5GzOiKjm5yEZjIQ0I3eVpTrZSEzEInhlO/OngeZZIBsv1/S2A1vCsRrosy7ePpAZifMoUsPH5/5u2gKY1GJrDbx0f8+T1QjLjr0LI84nPUDBnCozmtC+1FJGGEGA+9VP2kN/Bd14WqRPG/WY7rwERCjtkPE+XamoMsTUZolHUsAzK1eXhEjmkXAEvz+WhS4GTOOhWtJNOqYHfke6YLP5DRt4tDjymJP7x2MJ5dvi9dPEMBqSfclJvQzVi+sLQJBXZ+u30eXmaDbH3/mWt34m4CCSfa4I5ZcnOq3YUIeM8RynkEEKjRBjZIJEFZnJeyXuYXKuIag6fndKym+o1ZAlqBbmctKgXgUAm9kC3ZE0yHecUM/uQUDrhved5vlMURpACaiINIRIzczJgg7w0ymJnSMIPbH7XzPVSCqW2U1uge11XLSKft7Y51/VC3kXIWs5mSY0khRzlmMoIUgpIQUE0jgFYMBsyGNp/HJNFEmYVJIdycoHZUnOJvjoQdZHDMJ5Fq7mXz1LTJbHkVUXeKnv+PM9/T4gigrFSsnAEPpMIGAKaeVOb82T1k2f7vMiRZQHyTk72zdXyInZ8Tsjl5aV+Iu02+O3e4+D/j7N5CZSzWhDNwUU+n7M0dpDwOTRUZ5ou1rrv+9vZU8twIh1BAChWkTFAdPKGKaW6TfN4C7KoOx1NAZpzNWejnEsLfkkcSnUOzTQc0sD3mIV0V4gKPOdb9pA9aiHPH3mcMMjIIZz31bRgj5FpjvvJapHFIpmBPLam/E4ZLpIy4eo6Z8IyI+vgqhXk2Z/T0JBkoAZLpgcV50Qx/3tTXnvhfBvlVBK2x+ntn7VyHJsaKweDIC7ymCpbBGmDaJZl+dZI6iJ4zwEY3GILcyhRJeBy2J3D6nxPVP8zPPgH+3nm+R2ZUgaYDrRba/V/AeS557cZ758AAAAASUVORK5CYII=') repeat scroll 0 0  #AEC8CF;\n\ttext-align: center;\n}\n.ppm_numeric_grades_content > * {\n\t-wekbit-transition: opacity 1.0s;\n\t-moz-transition: opacity 1.0s;\n\ttransition: opacity 1.0s;\n\topacity: 0;\n}\n.ppm_numeric_grades_content a {\n\tfont-weight: bold;\n\ttext-decoration: none;\n\tcolor: #33647D;\n\tfloat: none !important;\n\tletter-spacing: 0.1em;\n}\n.ppm_numeric_grades_content a:hover {\n\ttext-decoration: underline;\n}\n.ppm_numeric_grades_content select {\n\tborder: 1px solid #33647D;\n\tfont-size: 16px !important;\n\theight: 25px;\n\twidth: 90% !important;\n\tborder-radius: 5px;\n\tmargin: 10px 0px 0px !important;\n\tbackground: -moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0 transparent;\n\tbackground: -webkit-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0 transparent;\n}\n.ppm_numeric_grades_content > div {\n\tborder: 1px solid #666;\n\tborder-radius: 5px;\n\tmargin-bottom: 5px;\n\tpadding: 10px;\n\tbackground: #AEC8CF;\n\tposition: relative;\n}\n#ppm_numeric_grades_options_container [type=radio]:checked ~ label ~ .ppm_numeric_grades_content {\n\tz-index: 3;\n}\n#ppm_numeric_grades_options_container [type=radio]:checked ~ label ~ .ppm_numeric_grades_content > * {\n\topacity: 3;\n}\n.ppm_numeric_grades_content > label {\n\tfloat: left;\n}\n#ppm_numeric_grades_options_container input[type='checkbox'] {\n\topacity: 0;\n\tfloat: none;\n\tdisplay: none;\n\twidth: 18px;\n}\n#ppm_numeric_grades_options_container input[type='checkbox'] + label {\n\tcursor: pointer;\n\ttext-shadow: 0 0 1px #9A9A9A;\n}\n#ppm_numeric_grades_options_container input[type='checkbox'] + label:before {\n\tcontent: '\u2610';\n\tfont-size: 16px;\n\tcolor: #000000;\n\ttext-shadow: 0 0 1px #666;\n\tpadding-right: 5px;\n}\n#ppm_numeric_grades_options_container input[type='checkbox']:checked + label:before {\n\tcontent: '\u2611';\n}\n.ng_help {\n\tbackground-color: #FFFFFF;\n\tborder-radius: 100%;\n\tpadding: 0 4px;\n\tposition: absolute;\n\tright: 3px;\n\ttop: 2px;\n\tborder: 1px solid #000000;\n\tfont-size: 12px;\n}\nbody.ng_options_disabled {\n\tperspective: 800px;\n\tperspective-origin: 50% 50%;\n\toverflow: hidden;\n}\nbody.ng_options_disabled form#aspnetForm {\n\tanimation: andrew 0.5s 1 forwards;\n\ttransform-origin: 0 50%;\n\ttransition: all 0.5s ease;\n\tpointer-events: none;\n}\nbody.ng_options_recover form#aspnetForm {\n\tanimation: recover 0.5s 1 forwards;\n}\n#ppm_numeric_grades_options_container {\n\tanimation: main 0.5s ease 0s 1 forwards;\n\ttransform-origin: 0 50%;\n\ttransition: all 0.5s ease;\n}\n@keyframes main {\n\t0% { opacity: 0.3; transform: rotateX(90deg); }\n\t50% { opacity: 0.3; transform: rotateX(45deg); }\n\t100% { }\n}\n@keyframes andrew {\n\t0% { transform: translateY(-15%) rotateX(0deg); }\n\t50% {\ttransform: translateY(-15%) rotateX(15deg); }\n\t100% { opacity: 0.2; transform: translate(5%, -15%) rotateX(15deg) scale(0.9); }\n}\n@keyframes recover {\n\t100% { }\n\t99% { opacity: 0.2; transform: translate(0%) rotateX(0deg); transform-origin: 0 50%; transition: all 0.3s ease; pointer-events: none; }\n\t0% { opacity: 0.2; transform: translate(5%, -15%) rotateX(15deg) scale(0.9); transform-origin: 0 50%; transition: all 0.3s ease; pointer-events: none; }\n}");
			var main = document.createElement('DIV'),
			titlebar = document.createElement('DIV'),
			container = document.createElement('DIV'),
			close = document.createElement('DIV');
			
			main.id = 'ppm_numeric_grades_options';
			container.id = 'ppm_numeric_grades_options_container';
			titlebar.id = 'ppm_numeric_grades_options_titlebar';
			titlebar.textContent = 'Numeric Grades';
			close.id = 'ppm_numeric_grades_options_close';
			close.textContent = 'Close';
			container.appendChild(titlebar);
			container.appendChild(close);
			
			// for generating checkboxes and selects for features
			for (i in NG.features) {
				if (!NG.features[i].options || !NG.features[i].options.tab) {
					continue;
				}
				var tab, contenter, c = document.createElement('div');
				if (container.querySelector('#ng_tab_'+NG.features[i].options.tab) == null) {
					// create new tab
					tab = document.createElement('DIV'),
					contenter = document.createElement('DIV');
					var tabControl = document.createElement('input'),
					label = document.createElement('label');
					tabControl.type = "radio";
					tabControl.id = 'ng_tab_'+NG.features[i].options.tab;
					tabControl.name = 'ng_tab';
					tab.appendChild(tabControl);
					label.textContent = NG.features[i].options.tab;
					label.setAttribute("for",'ng_tab_'+NG.features[i].options.tab);
					tab.appendChild(label);
					tab.className = 'ppm_numeric_grades_tab';
					contenter.className = 'ppm_numeric_grades_content';
					tab.appendChild(contenter);
					container.appendChild(tab);
				}
				else {
					// find existing tab
					contenter = container.querySelector('#ng_tab_'+NG.features[i].options.tab+' ~ .ppm_numeric_grades_content')
				}
				if (NG.features[i].options.enabled != undefined && NG.features[i].options.text) {
					// create a checkbox
					var ck = document.createElement('input'),
					label = document.createElement("label");
					ck.type = 'checkbox';
					ck.id = "ng_"+i;
					NG.features[i].options.enabled && (ck.checked = "checked");
					c.appendChild(ck);
					label.setAttribute("for","ng_"+i);
					label.textContent = NG.features[i].options.text;
					c.appendChild(label);
				}
				if (NG.features[i].options.selected != undefined && NG.features[i].optionList) {
					// create a dropdown
					var sel = document.createElement('select');
					sel.id = "ng_"+i+"_sel";
					for (j in NG.features[i].optionList) {
						var op = document.createElement('option');
						op.value = j;
						op.textContent = NG.features[i].optionList[j].name;
						(NG.features[i].options.selected == j) && (op.selected = true);
						sel.appendChild(op);
					}
					c.appendChild(sel);
				}
				if (c.childNodes.length > 0) {
					// help link if only module has an UI item
					if (NG.features[i].options.help) {
						// create help link
						var h = document.createElement('a');
						h.href = NG.features[i].options.help; // add url check here
						h.className = 'ng_help';
						h.target = "_blank";
						h.textContent = '?';
						c.appendChild(h);
					}
					contenter.appendChild(c);
				}
			}
			// inserting about tab
			var aboutTab = document.createElement('div'),
			about = document.createElement('div'),
			radio = document.createElement('input'),
			radioLabel = document.createElement('label');
			radio.type = 'radio';
			radio.id = 'ng_about';
			radio.name = 'ng_tab';
			radioLabel.setAttribute('for','ng_about');
			radioLabel.textContent = 'about';
			aboutTab.className = 'ppm_numeric_grades_tab';
			about.className = 'ppm_numeric_grades_content';
			about.innerHTML = '<br/><br/><br/>Popmundo Numeric Grades '+NG.version+'<br/><br/>by<br/><br/><a href="/World/Popmundo.aspx/Character/206394">Feeney Danielson</a><br/><br/><br/><br/><a href="'+NG.features.update.options.site+'" target="_blank">Visit Script\'s Website</a>';
			aboutTab.appendChild(radio);
			aboutTab.appendChild(radioLabel);
			aboutTab.appendChild(about);
			container.appendChild(aboutTab);
			// about tab complete
			// select the active tab aka version control
			container.querySelector('.ppm_numeric_grades_tab').firstChild.checked = true;
			main.appendChild(container);
			document.querySelector('body').appendChild(main);
			main.addEventListener('click',NG.UI.UIClickHandler,true);
			main.addEventListener('change',NG.UI.UIClickHandler,true);
		},
		UIClickHandler: function (e) {
			if ((e.type == 'click') && (e.target.id == 'ppm_numeric_grades_options_close')) {
				document.querySelector('body').removeChild(document.getElementById("ppm_numeric_grades_options"));
				document.querySelector('body').classList.remove('ng_options_disabled');
				document.querySelector('body').classList.add('ng_options_recover');
				setTimeout(function () { document.querySelector('body').classList.remove('ng_options_recover') }, 500);
			}
			if ((e.type == 'click') && (e.target.tagName == 'INPUT') && (e.target.type == "checkbox")) {
				var l = e.target.id.match(/ng_(\w+)/)[1];
				NG.options.set(l, 'enabled', e.target.checked);
			}
			else if ((e.type == 'change') && (e.target.tagName == 'SELECT')) {
				var l = e.target.id.match(/ng_(\w+)_sel/)[1];
				NG.options.set(l, 'selected', e.target[e.target.selectedIndex].value);
			}
		}
	},
	init: function () {
		NG.options.load(); // load preferences
		NG.UI.beaker(); // insert menu button to statusbar
		for (i in NG.features) {
			if ((NG.features[i].options.enabled) && (typeof(NG.features[i].fn) === "function")) {
				if (NG.features[i].options.path != undefined) {
					if (document.location.pathname.match(NG.features[i].options.path) != null) {
						NG.features[i].fn();
					}
				}
				else {
					NG.features[i].fn();
				}
			}
		} // launch .features

		if (NG.features.numericGrades.options.enabled || NG.features.progressBars.options.enabled) {
			// ! do something for dynamic initiation of listening dependent functions !
			var Observer = window.MutationObserver || window.WebKitMutationObserver;
			var observer = new Observer(function(records) {
				NG.utils.toArray(records).forEach(function(record) {
					if (record.addedNodes) {
						NG.utils.toArray(record.addedNodes).forEach(function(node) {
							if (!node.tagName) return
							if (NG.features.progressBars.options.enabled) NG.features.progressBars.fn(node)
							if (NG.features.numericGrades.options.enabled) NG.features.numericGrades.ng(node)
							if (NG.features.tabs.options.enabled && node.querySelector('.notification-item')) NG.features.tabs.fn()
							return;
						})
					}
				});
			});
			observer.observe(document.body, { childList: true, subtree: true });
		}
	},
	version: "4.8.1"
}
NG.init();