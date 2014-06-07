// ==UserScript==
// @name          Grepolis Informer RU (Chrome compatible)
// @namespace      http://userscripts.org/users/483059
// @description    Добавляет справа сведения об атаках, грузах, стройках юнитов
// @match          http://*.grepolis.*/game*
// @version        1.0.7
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==



var $;
//var log = unsafeWindow.console.log;
var log = nullLog;
var troops = true;
var movement = true;
var trade = true;

if (unsafeWindow.jQuery === undefined) {
    log("jquery is undefinde");
} else {
    log("jquery is loaded");
    $ = unsafeWindow.jQuery;
    init();
}

function nullLog(date) {}

function init() {
    //redefine renderHtml
    var f = unsafeWindow.MenuBubbleOrders.renderHtml;
    unsafeWindow.MenuBubbleOrders.renderHtml = function (data) {
        var r = f(data);
        log("renderHtml in MenuBubbleOrders");
        displayHiddenDivs();
        return r;
    }

}

function displayHiddenDivs() {
    var defaultTop = 23;
    var top = 0;
    var h = 0;
    log("troops " + troops + " movement " + movement + " trade " + trade);
    if (troops) {
        $("div#lbox_cont_troops").css("margin-top", -40).css("width", 170).css("left", "").css("right", 1).css("z-index", 1000).css("display", "block").appendTo('#menuEoni');
        h = (unsafeWindow.MenuBubbleOrders.orders_count == 0 ? 35 : unsafeWindow.MenuBubbleOrders.orders_count * 50 + 19);
        h > 389 ? top += 389 : top += h;
        top = defaultTop + top;
    } else {
        $("div#lbox_cont_troops").css("display", "none");
        top = defaultTop;
    }
    log("movement top " + top);
    if (movement) {
        $("div#lbox_cont_movement").css("top", top).css("width", 170).css("left", "").css("right", 1).css("z-index", 1000).css("display", "block").appendTo('#menuEoni');
        h = unsafeWindow.MenuBubbleMovement.commands_count == 0 ? 35 : unsafeWindow.MenuBubbleMovement.commands_count * 40 + 19;
        h > 389 ? top += 389 : top += h;
    } else {
        $("div#lbox_cont_movement").css("display", "none");
    }
    log("trade top " + top);
    if (trade) {
        $("div#lbox_cont_trade").css("top", top).css("left", "").css("width", 170).css("right", 1).css("z-index", 1000).css("display", "block").appendTo('#menuEoni');
    } else {
        $("div#lbox_cont_trade").css("display", "none");
    }
    $("a#icon_troops").unbind();
    $("a#icon_movement").unbind();
    $("a#icon_trade").unbind();
    $("a#icon_troops").bind("click", toggleMenuBubble);
    $("a#icon_movement").bind("click", toggleMenuBubble);
    $("a#icon_trade").bind("click", toggleMenuBubble);
}

function toggleMenuBubble(event) {
    log(event.currentTarget.id)
    if (event.currentTarget.id == "icon_movement") movement = !movement;
    if (event.currentTarget.id == "icon_troops") troops = !troops;
    if (event.currentTarget.id == "icon_trade") trade = !trade;
    displayHiddenDivs();
}


$('<div id="menuEoni" style="z-index:1000;position:relative;right:-7px;width:132px;font-size:85%;"></div>').appendTo('#units_sidebar');


//bbcode Unit
	//access to window object cross-browser
	var uWBB;
	if (typeof unsafeWindow === 'object'){
		uWBB = unsafeWindow;
	} else {
		uWBB = window;
	}

uWBB.bbunit = function(){
    var units = uWBB.ITowns.getTown(parseInt(uWBB.Game.townId)).units();
    var bbf="[*]";
    var bba="[*]";
    var volte=false;
    for (unit in units){
        if(units[unit]!=0){
            bbf += "[img]http://cdn.grepolis.com/images/game/units/" + unit + "_40x40.png[/img][|]";
            bba += "[center]" + units[unit] + "[/center][|]";
            volte=true;
        }
    }
    if(volte){
        bbf = bbf.substr(0, bbf.length-3);
        bba = bba.substr(0, bba.length-3);
        bbf += "[/*]";
        bba += "[/*]";
        var win = uWBB.Layout.wnd.Create(0,"BBUnit");
        win.setWidth(640);
        win.setHeight(360);
        win.setContent("Copy / paste:<br/><textarea style=\"height: 90%; width: 95%;\">[town]" + parseInt(uWBB.Game.townId) + "[/town]:\n[table]" + bbf + bba + "[/table]</textarea>");
    }
    
}


// GREPO POINTS
//License: Creative Commons
//based on the work of TilX : http://userscripts.org/users/tilx
(function () {

	//access to window object cross-browser
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	
	//get jQuery
	var $ = uW.jQuery;
	
	//add a console function
	var l;
	if (typeof uW.console === 'object' && typeof uW.console.log === 'function') {
		l = uW.console.log;
	} else {
		l = function () {
			return false;
		};
	}
	
	//cookie-based alternative for GM_*Value functions
	var value, newValueLib = function (prefix) {
		var prefix = 'tilx_' + prefix + '_';
		
		//cookie-functions by Peter-Paul Koch (http://www.quirksmode.org/js/cookies.html#script)
		var createCookie = function (name, value, days) {
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			document.cookie = name + "=" + value + expires + "; path=/";
		};
		var readCookie = function (name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1,c.length);
				}
				if (c.indexOf(nameEQ) == 0) {
					return c.substring(nameEQ.length,c.length);
				}
			}
			return undefined;
		};
		
		return {
			set: function (name, value) {
				createCookie(prefix + name, value, 365);
			}, 
			get: function (name, def){
				var ret = readCookie(prefix + name);
				if(ret !== undefined){
					return ret;
				} else {
					return def;
				}
			}
		};
	};
	
	
	//Object.create() by Douglas Crockford
	if(typeof Object.create !== 'function'){
		Object.create = function (o) {
			var F = function () {};
			F.prototype = o;
			return new F();
		};
	} 
	
	
	
	//the actual script
	var grepoPoints = (function () {
		
		
		var buildingsData = {
			'main':			[110, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82, 90, 99],
			'hide':			[60, 12, 14, 18, 20, 25, 30, 36, 43, 52],
			'storage':		[15, 2, 2, 3, 3, 4, 4, 4, 5, 6, 7, 8, 8, 10, 12, 13, 15, 16, 20, 22, 25, 28, 33, 37, 42, 48, 55, 63, 71, 81, 93, 106, 120, 138, 156],
			'farm':			[17, 2, 2, 3, 2, 4, 3, 4, 5, 5, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 17, 20, 21, 25, 27, 31, 34, 38, 43, 48, 54, 61, 67, 76, 85, 95, 106, 120, 133, 150, 167, 188, 210, 235, 264],
			'place':		[33],
			'lumber':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'stoner':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'ironer':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'market':		[108, 9, 9, 10, 11, 12, 12, 14, 15, 16, 17, 19, 20, 22, 23, 26, 27, 30, 32, 34, 37, 41, 43, 47, 51, 55, 59, 64, 69, 74],
			'docks':		[66, 7, 7, 8, 9, 9, 11, 12, 12, 15, 15, 17, 19, 21, 23, 25, 27, 31, 33, 37, 40, 44, 49, 54, 59, 65, 72, 78, 87, 95],
			'barracks':		[33, 4, 5, 4, 6, 6, 6, 8, 8, 9, 10, 12, 13, 14, 16, 17, 20, 22, 24, 28, 30, 34, 38, 42, 47, 52, 59, 65, 73, 81],
			'wall':			[34, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55],
			'academy':		[67, 8, 9, 10, 12, 12, 15, 16, 17, 20, 23, 25, 28, 31, 35, 40, 44, 49, 56, 62, 69, 78, 87, 98, 109, 122, 137, 154, 172, 193, 215, 242, 270, 304, 339, 380],
			'temple':		[216, 17, 19, 20, 22, 23, 26, 27, 30, 32, 34, 38, 40, 43, 47, 51, 55, 59, 64, 69, 75, 80, 87, 94, 102, 109, 119, 127, 138, 150],
			
			'theater':		[500],
			'lighthouse':	[500],
			'library':		[500],
			'thermal':		[500],
			'tower':		[500],
			'statue':		[500],
			'oracle':		[500],
			'trade_office':	[500]
		};
		
		var levels = Object.create(buildingsData);
		var levelsQueue = Object.create(buildingsData);

		
		var initStyle = function () {
				var style = [];
				style.push('span.tilx_points {font-size: 8px}');
				style.push('span.tilx_points_block {display:block; position:absolute;bottom:2px;right:3px;z-index:50; color:#fff;text-shadow:1px 1px 0px #000;font-size: 8px;font-weight: bold;}');
				style.push('span.tilx_points_block_main {display:block;z-index:50;color:white;text-shadow:1px 1px 0px black; font-weight: bold; font-style:italic;}');
				$('<style type="text/css">' + style.join("\n") + '</style>').appendTo('head');
		}
		
		var getUpgradeBuildingHTMLPart_old;
		
		var getUpgradeBuildingHTMLPart_new = function(building) {
			var ret = getUpgradeBuildingHTMLPart_old.apply(window, arguments),
				name = building.controller.replace(/^building_(.*)$/, '$1'),
				level = levels[name],
				levelQueue = levelsQueue[name],
				points = 0;
			if (typeof level === 'number' && typeof levelQueue === 'number') {
				for (var i = 0; i < level && typeof buildingsData[name][i] === 'number'; i += 1) {
					points += buildingsData[name][i];
				}
				ret += 'Schon ' + points + ' P ';
				if(level !== levelQueue){
					for (var i = level; i < levelQueue && typeof buildingsData[name][i] === 'number'; i += 1) {
						points += buildingsData[name][i];
					}
					ret += '(' + points + ' P mit Bauschleife) ';
				}
				for (var i = levelQueue; typeof buildingsData[name][i] === 'number'; i += 1) {
					points += buildingsData[name][i];
				}
				ret += 'von insgesamt ' + points + ' P erreicht. <br>';
				
				ret += 'Stufe ' + level; 
				if(level !== levelQueue){
					ret += ' (' + levelQueue + ' mit Bauschleife)';
				}
				ret += ' von maximal ' + buildingsData[name].length + '.';
				
				return ret;
			} else {
				return ret;
			}
		}
		
		var addPoints = (function () {
			var examineQueue = function (name, level, val) {
				$('.main_tasks_image').each(function () {
					if ($(this).css('backgroundImage').replace(/.*\/([^.]+)\.png.*/, '$1') === name) {
						$(this).append(
							'<span class="tilx_points_block_main">' + (val[level] !== undefined ? val[level] : '?') + ' P<\/span>'
						);
					level += 1;
					}
				});
				return level;
			};
			
			return function () {
				if(!$('#building_main_main').hasClass('tilx_grepoPoints')){
				
					$('#building_main_main').addClass('tilx_grepoPoints')
				
					var b, level;
				
					$.each(buildingsData, function (key, val) {
						b = $('#building_main_' + key);
						if (b.length > 0) {
							level = parseInt($('.level', b).eq(0).text(), 10);
							if (!isNaN(level)) {
								levels[key] = level;
								level = examineQueue(key, level, val);
								levelsQueue[key] = level;
								if (level < val.length) {
									$('.name.small.bold', b).append('<span class="tilx_points"> (+' + (val[level] !== undefined ? val[level] : '?') + ' P)<\/span>');
								}
								if (level - 1 >= 0) {
									$('.tear_down', b).append('<span class="tilx_points"> (-' + (val[level - 1] !== undefined ? val[level - 1] : '?') + ' P)<\/span>');
								}
							}
						} else {
							b = $('#special_building_' + key);
							if (b.length > 0) {
								levels[key] = 0;
								level = examineQueue(key, 0, val);
								levelsQueue[key] = level;
								b.append(
									'<span class="tilx_points_block">' + (val[0] !== undefined ? val[0] : '?') + ' P<\/span>'
								);
							}
						}
					});
					
					uW.buildingMousePopup();
				}
			};
		}());
		
		return function () {
			//value = newValueLib(SCRIPTNAME);
                //if (document.URL.indexOf('game/building_main') !== -1) {
				initStyle();
				
				$('*').ajaxComplete(function () {
					addPoints();
				});
				
				getUpgradeBuildingHTMLPart_old = uW.getUpgradeBuildingHTMLPart;
				uW.getUpgradeBuildingHTMLPart = getUpgradeBuildingHTMLPart_new;
				
				addPoints();			
			//}
		};
	}());
	
	grepoPoints();
}());
