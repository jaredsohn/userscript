/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name            XOL DOG UT NickNamer
// @author          Jerone UserScript Productions
// @namespace       http://userscripts.org/users/31497
// @homepage        http://userscripts.org/scripts/show/33341
// @description     Looks for your nickname on XOL DOG UT rankings and remembers your previous stats.
// @description     XOL DOG UT NickNamer v2.3 RC2
// @copyright       2007 - 2010 Jerone
// @version         v2.3 RC2
// @versiontext     Added support for Chrome.
// @browser         Firefox 3.6 with GreaseMonkey 0.8 and Chrome 9 with Blank Canvas Script Handler 0.0.17 and Opera 10.7.
// @require         http://userscripts.org/scripts/source/90232.user.js
// @require         http://userscripts.org/scripts/source/90251.user.js
// @require         http://userscripts.org/scripts/source/88932.user.js
// @include         http://www.rork.nl/ut/index.php?action=xdstats*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////
// ToC:
// - Copyrights
// - History
// - Todo
// - Note
// - User Settings
// - User Script
// - Statistics
////////////////////////////////////////////////////////////////////////////
THIS  SCRIPT  IS  PROVIDED BY THE AUTHOR `AS IS' AND ANY EXPRESS OR IMPLIED
WARRANTIES,  INCLUDING, BUT  NOT  LIMITED  TO, THE  IMPLIED  WARRANTIES  OF
MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO
EVENT  SHALL  THE  AUTHOR  BE  LIABLE  FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;  LOSS OF USE, DATA, OR PROFITS;
OR BUSINESS INTERRUPTION) HOWEVER  CAUSED  AND  ON  ANY THEORY OF LIABILITY,
WHETHER  IN  CONTRACT, STRICT  LIABILITY, OR  TORT  (INCLUDING NEGLIGENCE OR
OTHERWISE)  ARISING  IN  ANY  WAY  OUT  OF  THE  USE OF THIS SCRIPT, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
////////////////////////////////////////////////////////////////////////////
History:
[+] = added; [-] = removed; [/] = fixed; [*] = updated;
08-09-2008 10:00 [v1 Alpha]:
   [+] initial release;
08-09-2008 17:00 [v1.1 Beta]:
   [/] fixed bug in condition;
   [+] added option hide right bar;
12-09-2008 22:30 [v1.2 Beta]:
   [*] used site hide option for right bar;
   [+] added fix for site hider;
   [+] added link for your own stats;
   [*] updated search method;
   [+] whole line now colored;
12-09-2008 22:45 [v1.2.1 Beta]:
   [*] cleaned up code;
15-09-2008 01:15 [v1.2.2 Beta]:
   [+] added option to auto refresh every 5 minutes passed the hour;
01-10-2008 23:00 [v1.3 Alpha]:
   [+] added previous stats;
   [*] removed global load event;
03-10-2008 01:00 [v1.3.1 Alpha]:
   [/] fixed small bug with calculating minutes;
21-11-2008 21:00 [v1.3.2 Beta];
   [/] fixed small bug in framework check;
10-01-2009 19:30 [v1.4 Beta]:
   [*] updated framework;
11-11-2010 13:30 [v2.0 Alpha]:
   [*] complete rewrite;
   [+] added jQuery framework;
   [+] added nickname storage;
   [-] removed US Framework;
   [-] removed sidebar hidder;
11-11-2010 18:00 [v2.1 Beta]:
   [+] added support for Chrome;
   [/] fixed unknown method toSource in Chrome;
13-11-2010 21:15 [v2.2 RC1]:
   [+] added alternative to @require;
   [+] added previous stats in attribute title;
   [/] fixed colors for ranking desc/asc;
   [/] fixed second check for nickName;
14-11-2010 19:00 [v2.3 RC2]:
   [+] added support for Opera;
////////////////////////////////////////////////////////////////////////////
// Todo:
// - options window;
// - XB;
////////////////////////////////////////////////////////////////////////////
// Note:
// - ;
/*//////////////////////////////////////////////////////////////////////////



//*** USER SETTINGS ***//
var nickName	= "";		// [String] your nickname;
var hourRefresh	= true;		// [Boolean] auto refresh every 10 minutes passed the hour;



//*** USER SCRIPT ***//
(function(win, doc, undefined) {

	var $,
		head = doc.getElementsByTagName("head")[0];
		_unsafeWindow = typeof(unsafeWindow)!=="undefined" ? unsafeWindow : window,
		error = false,
		errorCheck1 = function(){return !(window.jQuery || _unsafeWindow.jQuery);},
		errorCheck2 = function(){return !((window.JSON && window.JSON.stringify && window.JSON.parse) || (_unsafeWindow.JSON && _unsafeWindow.JSON.stringify && _unsafeWindow.JSON.parse));},
		errorCheck3 = function(){return !(typeof(GM_getValue)!=="undefined" && typeof(GM_setValue)!=="undefined");};
	if(errorCheck1()){
		error = true;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = "http://userscripts.org/scripts/source/90232.user.js";
		head.appendChild(script);
	}
	if(errorCheck2()){
		error = true;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = "http://userscripts.org/scripts/source/90251.user.js";
		head.appendChild(script);
	}
	if(errorCheck3()){
		error = true;
		var script = doc.createElement("script");
		script.type = "text/javascript";
		script.src = "http://userscripts.org/scripts/source/88932.user.js";
		head.appendChild(script);
	}
	if(error){
		var checker = win.setInterval(function() {
			if(!errorCheck1() && !errorCheck2() && !errorCheck3()){
				win.clearInterval(checker);
				$ = window.jQuery || _unsafeWindow.jQuery;
				try{
					$(function(){
						hijack(XDUNN.init, XDUNN);
					});
				} catch(e){((_unsafeWindow && _unsafeWindow.console) || window.console).log("error", e);}
			}
		}, 100);
		win.setTimeout(function(){
			if(errorCheck1() || errorCheck2() || errorCheck3()){
				win.clearInterval(checker);
				win.alert("Something went wrong with importing a script!\nPlease uninstall this script and download it again.\nIf this error persists, please contact the owner.");
				return;
			}
		}, 10000);
		function hijack(fn, that, args){
			win.setTimeout(function(){
				fn.apply(that || this, args || []);
		}, 0);	}
	} else {
		$ = jQuery;
		$(function(){
			XDUNN.init();
		});
	}

	var XDUNN = {
		init: function(){
			nickName = nickName || GM_getValue("XDUNN.nick.name", nickName);
			if(!nickName){
				if(!(nickName = win.prompt("There was no nickname specified!\nPlease specify one and it will be storred in this browser:"))){
					return;
				}
				GM_setValue("XDUNN.nick.name", nickName);
			}
			this.addMyStats();
			this.highLightName();
			this.hourRefresh();
			this.calcNewRank();
		},
		addMyStats: function(){
			$(".mirrortab_back").append(
				$("<a/>").attr({
					href: "http://www.rork.nl/ut/index.php?action=xdstats&player=" + nickName,
					target: "_parent"
				}).html("&nbsp;&nbsp; My stats (" + nickName + ")")
			);
		},
		highLightName: function(){
			$(".windowbg a").filter(function(){
				return $(this).text()===nickName;
			}).wrap("<strong/>");
		},
		hourRefresh: function(){
			if(hourRefresh){
				var timer = (new Date().setHours((new Date().getHours()), 10, 0, 0) - new Date().getTime());
				win.setTimeout(function(){
					location.href = location.href;  // reload;
				}, timer>0 ? timer : (timer + (60*60*1000)));  // ##:10
			}
		},
		calcNewRank: function(){
			function getValue(){
				var val = $.trim($(this).text());
				return (/^\d+$/.test(val)) ? parseInt(val, 10) : val;
			}
			function getTime(time){
				var split = time.toString().split(/[hm]/gi);
				if(split.length>1){
					var multi = /h/.test(time) ? 60*1000 : 1000;
					return (parseInt(split[0], 10)*60*multi) + (parseInt(split[1], 10)*multi);
				}
				return time;
			}
			function setTime(time){
				if(time>(60*60*1000)){
					var timeHour = Math.floor(time/(60*60*1000)),
						timeMinute = (time-((60*60*1000)*timeHour))/(60*1000);
					if(timeMinute<10){
						timeMinute = "0" + timeMinute.toString();
					}
					return timeHour.toString() + ":" + timeMinute.toString();
				} else {
					time = time / 60 / 1000;
					if(time<10){
						return "0:0" + time.toString();
					} else {
						return "0:" + time.toString();
			}	}	}
			function emptyArr(l){
				var rtrn = [], i = 0;
				for(; i<l; i++){
					rtrn.push(0);
				}
				return rtrn;
			}
			function checker(arr, stats){
				$.each(arr, function(timeLine, items){
					if(items){
						stats.n3w[timeLine] = $.makeArray(items.clone().map(getValue));
						this.each(function(index, value){
							var n3w = stats.n3w[timeLine][index] || 0,
								old = stats.old[timeLine][index] || 0,
								dif = n3w - old,
								toggleColors = index===0 || index===11 || index===12 || index===15;
							if(n3w!==old){
								if(/[hm]/gi.test(n3w) || /[hm]/gi.test(old)){
									n3w = getTime(n3w);
									old = getTime(old);
									dif = setTime(n3w - old);
								}
								$(value).prepend(
									$("<span/>", {
										css: { "color": n3w>old && !toggleColors ? "green" : "red" },
										text: "(" + (n3w>old ? "+" : "") + dif + ") ",
										title: "Previously stored: " + old
			})	);	}	});	}	});	}

			if(win.location.search==="?action=xdstats"){  // overview page;
				var thisMonth = $(".windowbg2 td.windowbg:nth-child(1) table.bordercolor:nth-child(1) .windowbg a").filter(function(){
						return $(this).text()===nickName;
					}).first().parents("tr").first().find("td").filter(function(){
						return $(this).text()!==nickName;
					}),
					overall   = $(".windowbg2 td.windowbg:nth-child(1) table.bordercolor:nth-child(3) .windowbg a").filter(function(){
						return $(this).text()===nickName;
					}).first().parents("tr").first().find("td").filter(function(){
						return $(this).text()!==nickName;
					}),
					stats_main = {
						old: JSON.parse(GM_getValue("XDUNN.stats.main", JSON.stringify([emptyArr(3), emptyArr(3)]))),
						n3w: JSON.parse(GM_getValue("XDUNN.stats.main", JSON.stringify([emptyArr(3), emptyArr(3)])))
					},
					arr = [thisMonth, overall];
				checker(arr, stats_main);
				GM_setValue("XDUNN.stats.main", JSON.stringify(stats_main.n3w));
			} else if(/month/.test(win.location.href) || /total/.test(win.location.href)){  // montly & total page;
				var inList = $(".windowbg a,.windowbg strong a").filter(function(){
						return $(this).text()===nickName;
					}).first().parents("tr").first().find("td").filter(function(){
						return $(this).text()!==nickName;
					}),
					stats_month_total = {
						old: JSON.parse(GM_getValue("XDUNN.stats.month.total", JSON.stringify([emptyArr(3), emptyArr(3)]))),
						n3w: JSON.parse(GM_getValue("XDUNN.stats.month.total", JSON.stringify([emptyArr(3), emptyArr(3)])))
					},
					arr = [inList, inList];
				arr[/month/.test(win.location.href) ? 1 : 0] = false;
				checker(arr, stats_month_total);
				GM_setValue("XDUNN.stats.month.total", JSON.stringify(stats_month_total.n3w));
			} else if(win.location.href.indexOf("player=" + nickName)!==-1 
			|| (/pid=\d/.test(win.location.href) && $(".windowbg2>a, .windowbg2>strong>a").filter(function(){return $(this).text()===nickName;}).length>0)){  // player page;
				var thisMonth = $(".windowbg2 tr:nth-child(2) .windowbg table.bordercolor:nth-child(1) td.windowbg2:nth-child(2)"),
					overall   = $(".windowbg2 tr:nth-child(2) .windowbg table.bordercolor:nth-child(1) td.windowbg2:nth-child(3)"),
					stats_player = {
						old: JSON.parse(GM_getValue("XDUNN.stats.player", JSON.stringify([emptyArr(16), emptyArr(16)]))),
						n3w: []
					},
					arr = [thisMonth, overall];
				checker(arr, stats_player);
				GM_setValue("XDUNN.stats.player", JSON.stringify(stats_player.n3w));
			}
		}
	};

})(this, document);



//*** STATISTICS ***//
// Chars (exclude spaces): 9.528
// Chars (include spaces): 11.373
// Chars (Chinese): 0
// Words: 1.146
// Lines: 307