// ==UserScript==
// @name           Punkty za budynki
// @author         Wszechmogący
// @version        1.0
// @include        http://*.grepolis.*/game*
// @description    Skrypt pokazuje ile punktów dostaniemy za dany poziom budynku.
// ==/UserScript==

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
			'hide':			[21, 6, 8, 11, 14, 18, 23, 30, 39, 51],
			'storage':		[15, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17, 20, 22, 25, 29, 33, 38, 43, 49, 56, 64, 73, 83],
			'farm':			[17, 2, 2, 3, 3, 3, 4, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55, 62, 69, 77, 87, 97, 109, 122, 136, 153],
			'place':		[33],
			'lumber':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'stoner':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'ironer':		[22, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 10, 11, 12, 13, 15, 16, 18, 20, 22, 24, 26, 29, 32, 35, 38, 42, 46, 51, 56, 62, 68, 75, 82],
			'market':		[108, 9, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 22, 24, 26, 28, 30, 32, 35, 38, 41, 44, 47, 51, 55, 60, 64, 70, 75],
			'docks':		[66, 7, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 49, 54, 60, 66, 72, 80, 88, 96],
			'barracks':		[33, 4, 4, 5, 5, 6, 7, 7, 8, 9, 10, 11, 13, 14, 16, 17, 19, 22, 24, 27, 30, 33, 37, 42, 46, 52, 58, 64, 72, 80],
			'wall':			[34, 4, 5, 5, 6, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55],
			'academy':		[67, 8, 9, 10, 11, 13, 14, 16, 18, 20, 22, 25, 28, 31, 35, 39, 44, 49, 55, 62, 69, 77, 87, 97, 109, 122, 136, 153, 171, 192],
			'temple':		[216, 17, 19, 20, 22, 24, 25, 27, 30, 32, 35, 37, 40, 44, 48, 51, 55, 59, 64, 69, 78, 81, 87, 94, 102],
			
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
				style.push('span.tilx_points {font-size: 7px}');
				style.push('span.tilx_points_block {display:block; position:absolute;bottom:2px;right:3px;z-index:5; color:#fff;text-shadow:1px 1px 0px #000;font-size: 10px;font-weight: bold;}');
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
				ret += 'Aktualnie ' + points + ' P';
				if(level !== levelQueue){
					for (var i = level; i < levelQueue && typeof buildingsData[name][i] === 'number'; i += 1) {
						points += buildingsData[name][i];
					}
					ret += ' (' + points + ' P po wybudowaniu)';
				}
				for (var i = levelQueue; typeof buildingsData[name][i] === 'number'; i += 1) {
					points += buildingsData[name][i];
				}
				ret += ', maksymalnie ' + points + ' P. <br>';
				
				ret += 'Poziom ' + level; 
				if(level !== levelQueue){
					ret += ' (' + levelQueue + ' po wybudowaniu)';
				}
				ret += ', maksymalnie ' + buildingsData[name].length + '.';
				
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
							'<span class="tilx_points_block">' + (val[level] !== undefined ? val[level] : '?') + ' P<\/span>'
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
									$('.build:not(.tear_down), .build_grey:not(.tear_down)', b).append('<span class="tilx_points"> (' + (val[level] !== undefined ? val[level] : '?') + ' P)<\/span>');
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

			if (document.URL.indexOf('game/building_main') !== -1) {
				initStyle();
				
				$('*').ajaxComplete(function () {
					addPoints();
				});
				
				getUpgradeBuildingHTMLPart_old = uW.getUpgradeBuildingHTMLPart;
				uW.getUpgradeBuildingHTMLPart = getUpgradeBuildingHTMLPart_new;
				
				addPoints();			
			}
		};
	}());
	
	grepoPoints();
}());