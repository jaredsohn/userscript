// ==UserScript==
// @name           Ikariam Spy Helper
// @version        0.08
// @namespace      spy_helper
// @description    Small script, under construction
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle   
// @grant          GM_listValues
// @grant          GM_deleteValue
// @include        http://s*.ikariam.gameforge.*/index.php*
// @exclude        http://board.*.ikariam.com*
// @exclude        http://*.ikariam.*/board
// 
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

GM_addStyle('#spy_button {display: inline-block; vertical-align: middle; cursor: pointer; width: 16px; height: 16px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU1M0FFN0EzODQzMzExRTBCNUQxOUU1MEJDNDdDMzgwIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU1M0FFN0EyODQzMzExRTBCNUQxOUU1MEJDNDdDMzgwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzMgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ1dWlkOkFDMUYyRTgzMzI0QURGMTFBQUI4QzUzOTBEODVCNUIzIiBzdFJlZjpkb2N1bWVudElEPSJ1dWlkOkM5RDM0OTY2NEEzQ0REMTFCMDhBQkJCQ0ZGMTcyMTU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Zpi/FwAAAulJREFUeNqcU91LU3EYfs44++iwra2T4phU1ITEtaXOXdQmqBFFqQklejHYhdEfYFfdeNmFF0UXsqsSuxENLRMK/CphWlMijCxcI5EtZaI7rc19OU/v79Tyvvfw8PJ+PM95z3t+P66jowPMOI6DSqVSkz9FYRVBJOgIWcIOISzL8vrBwUGBvMIZGxsDj0MzU6HF7XZfbCazWq0OalaEo9Hoytzc3GwoFApS3wwhUSLxf5vMRqPxpt/v9/EG3jO6NMoNPxiG7qQO6Uga3Y3djtbm1nP1ZENDQ+ZkMvmMXqaIqEhATbjkI0vsJ7z+x35ucG0Qu8d2YXVYERWi6H/Tj7b7bZxUlLxdXV0+1s94JYHTLpfLK+tkT99sH4xnjag4UwF7nR37+/uobahFWVUZJEFCT6AHnACP0+n0Mp4iQE3VHo+n6fWnV1x5TTlMognicRG78V3k83lEvkZgsVgQWQAkTsLE+wnO7W5oYjxFoFgslpHZp75NI5ulhauA7R/byPzKKBMkd5KIrEZw5Q79GA3wfOkFRFG0M56yRGoSGDGlSsGgNigiOoMO/BEe6XQaNqdN2bZMj63OhuR6kiYrMHGhJJDjOBUy3zMIhoOoqK5AIpZALpVD5flKRD9GodVrYbaasfVlCxbeAnYMGK+0g52NjY3VdhcdKEpJMQlCuQC1Rq1MwzyLWZ7V2+tvIBbbXGW80g5Wp6amg1drr8tHNSZk4/Q50RQ0okYRYJ7FLM/ql53X5Pn5t0HGK02wtrgYXJS2foYCt5/ApDWjsFNAOpxW/gLzLGZ5Vmd9odC7RcZTBKipkMvlXg4MPBzPbueWR+5Oyr2t91BpPqHcAOZZPNI7KWfi2eVA4NE462c85Q7ZbH+2vLe3V06H41ZjY8uFzk5fg8NRV1U67ysrH8IjI0+X5udnFujCjQqCEGf5cDh8KJBKpUDKGhqthoRclLIQ9KxE2CTiMs/zn7VabV6v1+OfQOlq/q/9FmAAzqWSPRRbhKoAAAAASUVORK5CYII=)}');
GM_addStyle('.spy_w_content #spy_w_islands {padding: 1px 0 0 1px;border: 1px solid #5B0606;margin: 10px auto;}');
GM_addStyle('.spy_w_content .spy_island_box {float: left;cursor: pointer;width: 10px;height: 10px;border: 1px solid #000;margin: 0 1px 1px 0;background-color: #44d;}');
GM_addStyle('.spy_w_content .spy_island_box.current {border-color: #f00}');
GM_addStyle('.spy_w_content .spy_island_box.wine {background-color: #771414}');
GM_addStyle('.spy_w_content .spy_island_box.stone {background-color: #999}');
GM_addStyle('.spy_w_content .spy_island_box.crystal {background-color: #11F5B5}');
GM_addStyle('.spy_w_content .spy_island_box.sulphur {background-color: #E6AF01}');
GM_addStyle('.spy_w_content .spy_island_box.empty {background-color: #000}');
GM_addStyle('.spy_cleaner {clear: both;}');

GM_addStyle('.spy_i_flow_icon {position: absolute; width: 16px; height: 16px; cursor: pointer; border: 1px solid #000;}');

GM_addStyle('.spy_i_flag1 {background-color: #00ff00;}');
GM_addStyle('.spy_i_flag2 {background-color: #ff0000;}');
GM_addStyle('.spy_i_flag3 {background-color: #ffff00;}');
GM_addStyle('.spy_i_flag4 {background-color: #ffffff;}');
GM_addStyle('.spy_i_flag5 {background-color: #669e07;}');
GM_addStyle('.spy_i_flag6 {background-color: #DF9BF0;}');
GM_addStyle('.spy_i_flag7 {background-color: #efa500;}');
GM_addStyle('.spy_i_flag8 {background-color: #9e9e9e;}');
GM_addStyle('.spy_i_flag9 {background-color: #006600;}');
GM_addStyle('.spy_i_flag10 {background-color: #ff00ff;}');
GM_addStyle('.spy_i_flag11 {background-color: #815800;}');
GM_addStyle('.spy_i_flag12 {background-color: #000000;}');
GM_addStyle('.spy_i_flag13 {background-color: #00ffff;}');
GM_addStyle('.spy_i_flag14 {background-color: #0085ff;}');
GM_addStyle('.spy_i_flag15 {background-color: #0000ff;}');
GM_addStyle('.spy_i_log_icon {position: absolute; width: 16px; height: 16px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMElEQVR4AQXAu2tdZQAA8N93zpf7bK9JKqioq4NgXDqoSHCpCI5qLQVFiOAmbk6u0n/AMaNmkFAK4tDSsSji4BDrItpUpVxv8b4f557HJwG++u7ecK/fG9RNqrdlpWoa801lUVT+Gj3u3X8w+iGP8W1MAAAi7F/o9t99/aCTZ8F0sTGarf07nRqON2LGeLF+bVu6NVkXb2ENABlUdRIQNOLOjn67Zb/X8dTuBU8OLnrlhWd98MbBYWcn3sUuAERo6iQhpaS7EzT9XFV35Hmy35vqtPZcPTyw2FSv3vzx/q0Hw/8+xDlEqCUBIQtyDLotvXauKiqaPWcPH/vn0ciLz+87e3jp8Hw4OcVliFDVjU2d9HMAAABO7v0KgKYNEGGzKYQQvHc6NCtqURIEmVxZbcXUpcjBJy9z95ffAURYrFe6O5lv33kaNQJghUvgfDgDQAAQYb5pBEzWtaYqxZBbp5XL42f8vPfIaLLr09sz8uj4Sk8AQIStgCRsJ2ips6BsSrPtBlSQR5DnpJQARCCnWnHzOfm1DbCdywOQKo6v9ECdkgYAGYQQgLIAqYMYqYG64ej23NGdlYCAgIAIZVkBGbB7/SPLLz6jm4FS7fjNiyA1AEAGi1VBCJoSGJ+cgnm7Daqi8vH3Y0d3VrIIAAS4fuNk8fXn7/cBAGA4n1rNKgBw7cY3Z3gJIvz025/Lq1+e5EU2qNVLBj1hufLEtmthJeRbg1amKJPpctv/4+/RGuB/vWn7I+M9M2IAAAAASUVORK5CYII=);}');
GM_addStyle('.spy_i_log_delete {display: inline-block;width: 16px;height: 16px;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXUlEQVR42u2SwQoAIAhD88vVLy8KBlaS0i1oJwP3piGVg0Skmpq8HjqZrWl9uwCbGAmwKYGZs/6iqgMyAdJuM8W2QmYKpLt/0AG9ASCv/oAnANd3AEjmAlFT1BypAV+PnRH5YehvAAAAAElFTkSuQmCC"); margin: 0 5px; vertical-align: sub;}');
GM_addStyle('#spy_i_color_holder {position: absolute; width: 64px; height: 64px; display: none; border: 1px solid #000; z-index: 9999}');
GM_addStyle('#spy_i_color_holder .cell {float: left; width: 16px; height: 16px; cursor: pointer;}');

(function($) {
	var SpyWorldRadar = {
		init: function(){
			var html = '<a id="spy_button"></a>';
			$(html).insertAfter('#js_islandBread');

			this.initHandlers();
		},

		initHandlers: function(){
			var self = this;
			$(document).on('click', '#spy_button', function(){
				if ($('#worldScan').size() > 0)
					unsafeWindow.ikariam.getPopupController().closePopup('worldScan');
				else {
					var html = '<div class="spy_w_content" id="spy_w_content" align="center">Scan radius: <input type="text" size="2" value="4" id="spy_radius" class="textfield"> <a class="button" id="spy_do_scan">Scan</a></div>';
					var content = new unsafeWindow.Array(html, 0, 'Close');
					var location = self.getCurrentLocation();

					unsafeWindow.ikariam.getPopupController().createPopup(
						'worldScan', 
						'Current island: '+location.x +':'+location.y, 
						content, 
						0
					);
				}
			});
			$(document).on('click', '#spy_do_scan', function(){
				self.resetScanWindow();

				var scan_size = parseInt($('#spy_radius').val());
				if (scan_size < 1)
					return;

				self.scan(scan_size);
			});
			$(document).on('click', '.spy_island_box', function(){
				var id = parseInt($(this).attr('data-id'));
				if (id > 0) {
					document.location.href = '/index.php?view=island&islandId=' + id;
				}
			});
		},
			
		getCurrentLocation: function(){
			return {
				x: unsafeWindow.ikariam.backgroundView.screen.currMapX,
				y: unsafeWindow.ikariam.backgroundView.screen.currMapY
			};
		},

		scan: function(radius) {
			var html, x, y, add_class, cur_x = unsafeWindow.ikariam.backgroundView.screen.currMapX,
				cur_y = unsafeWindow.ikariam.backgroundView.screen.currMapY,
				min_x = cur_x - radius, max_x = cur_x + radius,
				min_y = cur_y - radius, max_y = cur_y + radius;

			html = '<div id="spy_w_islands">';

			for (y = min_y; y <= max_y; ++y) {
				for (x = min_x; x <= max_x; ++x) {
					add_class = (x==cur_x && y==cur_y) ? ' current' : '';
					html += '<div class="spy_island_box'+add_class+'" id="spy_cell_'+x+'_'+y+'"></div>';
				}
				html += '<div class="spy_cleaner"></div>';
			}

			html += '</div>';

			$('#spy_w_content').append(html);
			$('#spy_w_islands').css('width', ((radius*2+1)*13) + 'px');

			$.post('/index.php?action=WorldMap&function=getJSONArea&x_min='+min_x+'&x_max='+max_x+'&y_min='+min_y+'&y_max='+max_y, function(data){
				if (!data.data) {
					alert('Scan failed. Error #1');
					return;
				}

				var nx, ny, itm, new_class;

				for (nx in data.data) {
					for (ny in data.data[nx]) {
						//Format: 
						//0 = id 
						//1 = name
						//2 = resource type ()
						//3 = wonder type
						//4 = ? 
						//5 = island type
						//6 = ? 
						//7 = towns
						//8,9 = ?
						itm = data.data[nx][ny];
						new_class = 'empty';
						switch (itm[2]) {
							case '1':
								new_class = 'wine';
								break;
							case '2':
								new_class = 'stone';
								break;
							case '3':
								new_class = 'crystal';
								break;
							case '4':
								new_class = 'sulphur';
								break;
						} 

						var title = 'Resource: ' + SpyUtils.capitaliseFirstLetter(new_class) + '\n';
						title += 'Travel time: ' + SpyWorldRadar.calcPilageTime(cur_x, cur_y, nx, ny) + '\n';
						title += 'Towns: ' + itm[7];
						
						if (itm[7] == '0')
							new_class = 'empty';

						$('#spy_cell_'+nx+'_'+ny)
							.addClass(new_class)
							.attr('data-id', itm[0])
							.attr('title', title);
					}
				}
			}, 'json');

		},

		resetScanWindow: function(){
			$('#spy_w_islands').remove();
		},

		calcPilageTime: function(from_x, from_y, to_x, to_y){
			var sec = parseInt(Math.sqrt(Math.pow(from_x - to_x, 2) + Math.pow(from_y - to_y, 2)) * 1200);
			var hours = parseInt(sec / 3600);
			var minutes = parseInt((sec - hours*3600) / 60);
			var time = '';

			sec = sec % 60;

			if (hours > 0)
				time += hours + 'h ';
			if (minutes > 0)
				time += minutes + 'm ';
			if (sec > 0)
				time += sec + 's';

			return time;
		}
	};

	var SpyIsland = {
		color_select_city: 0,
		color_city_box: null,
			
		init: function(){
			var playerId = unsafeWindow.ikariam.model.avatarId;
			var i, cities = unsafeWindow.ikariam.backgroundView.screen.data.cities;
			
			unsafeWindow.ajax.Responder.realChangeHtml = unsafeWindow.ajax.Responder.changeHTML;
			unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView){
				unsafeWindow.ajax.Responder.realChangeHtml(params, replaceView);
				
				if (params[0] == 'cityDetails')
					SpyIsland.showSavedReports();
			};
			
			//Create color-select window
			var $color_pick = $('<div id="spy_i_color_holder">');
			for (i=0; i<16; ++i) {
				$color_pick.append('<div class="cell spy_i_flag'+i+'" data-color="'+i+'"></div>');
			}
			$('#cities').append($color_pick);
			
			//Mark cities
			for (i in cities) {
				if (cities[i].type == 'city' && cities[i].ownerId != playerId) {
                    var $cityelem = $('#cityLocation' + i), left = parseInt($cityelem.css('left')), top = parseInt($cityelem.css('top'));
					left += $cityelem.width();
					
					//Flag
					var $elem = $('<div>');
					var city_info = SpyUtils.getCityInfo(cities[i].id);
					$elem
						.addClass('spy_i_flow_icon')
						.addClass('spy_i_flag'+city_info.flag)
						.css({
							top: top,
							left: left
						})
						.attr('data-id', cities[i].id)
						.attr('data-flag', city_info.flag);
					
					$('#cities').append($elem);
					
					//Log
					if (city_info.logs > 0) {
						$elem = $('<div>');
						$elem
							.addClass('spy_i_log_icon')
							.css({
								top: (top + 20),
								left: left
							})
							.attr('data-id', cities[i].id);
						$('#cities').append($elem);
					}
				}
			}
			
			$('.spy_i_flow_icon').click(function(){
				var $this = $(this), city_id = $this.attr('data-id');
				if (city_id == SpyIsland.color_select_city) {
					$color_pick.hide();
					SpyIsland.color_select_city = 0;
				} else {
					var left = $this.css('left'), top = parseInt($this.css('top'));
					$color_pick.css({
						top: top + 18,
						left: left
					}).show();
					SpyIsland.color_select_city = city_id;
					SpyIsland.color_city_box = $this;
				}
			});
			
			$('#spy_i_color_holder .cell').click(function(){
				var color = $(this).attr('data-color'), info = SpyUtils.getCityInfo(SpyIsland.color_select_city);

				SpyIsland.color_city_box.removeClass('spy_i_flag'+info.flag);
				info.flag = color;
				SpyIsland.color_city_box.addClass('spy_i_flag'+info.flag);
				SpyUtils.updateCityInfo(SpyIsland.color_select_city, info);
				
				SpyIsland.color_city_box.click();
			});
			
			$(document).on('click', '.spy_i_log_link', function(){
				var id = $(this).attr('data-id');
				var info = SpyUtils.getValue(id);
				
				$('#spy_i_report_view').remove();
				
				unsafeWindow.ikariam.getPopupController().createPopup(
					'genericPopup', 
					'Report from ' + info.time, 
					new unsafeWindow.Array(info.html, 0, 'Close'), 
					0
				);
					
				return false;
			});
			
			$(document).on('click', '.spy_i_log_delete', function(){
				var id = $(this).attr('data-id');
				var info = SpyUtils.getValue(id);
				var city_info = SpyUtils.getCityInfo(info.city);
				
				city_info.logs--;
				SpyUtils.updateCityInfo(info.city, city_info);
				
				GM_deleteValue(id);
				$('#sl_'+id).remove();
			});
		},
			
		showSavedReports: function() {
			var tmp_data = SpyUtils.parseUrlParams($('div.cityLocation.city.selected > a.link_img').attr('href'));
			
			var html = '<li class="accordionItem">' + 
				'<a class="accordionTitle active">List of logs<span class="indicator"></span></a>' +
				'<div class="accordionContent"><div class="dynamic">' +
				'<ul>';
			
			var i, found = 0, info, keys = GM_listValues();
			for (i=0; i<keys.length; ++i) {
				if (keys[i].substr(0, 7) != 'message')
					continue;
				
				info = SpyUtils.getValue(keys[i]);
				if (info.city == tmp_data.cityId) {
					found++;
					html += '<li id="sl_'+keys[i]+'">' + 
						'<a data-id="'+keys[i]+'" class="spy_i_log_delete"></a>' +
						'<a href="#" data-id="'+keys[i]+'" class="spy_i_log_link">'+info.time+'</a>' + 
						'</li>';
				}
			}
			
			html += '</ul></div><div></li>';
			
			if (found)
				$('#sidebarWidget').append(html);
		}
	};
	
	var SpyTown = {
		init: function(){
			unsafeWindow.ajax.Responder.realChangeHtml = unsafeWindow.ajax.Responder.changeHTML;
			unsafeWindow.ajax.Responder.changeHTML = function(params, replaceView){
				unsafeWindow.ajax.Responder.realChangeHtml(params, replaceView);
				
				if (params[0] == 'safehouse')
					SpyTown.handleSafeAjax();
			};
			
			$(document).on('click', '.spy_t_report_save', function(){
				var $tr = $(this).parents('tr.report').prev('tr');
				var reportId = $tr.attr('id');
				var url = $tr.find('td.targetCity a').attr('href');
				var params = SpyUtils.parseUrlParams(url);
				
				var data = SpyUtils.getValue(reportId);
				if (!data) {
					var html = $(this).parents('table.record').clone();
					html.find('tr').last().remove();
					data = {
						time: $tr.children('td.date').text(),
						city: params.selectCity,
						html: '<table>' + html.html() + '</table>'
					};
					SpyUtils.saveValue(reportId, data);
					
					var city_info = SpyUtils.getCityInfo(params.selectCity);
					city_info.logs++;
					SpyUtils.updateCityInfo(params.selectCity, city_info);
				}
				
				$(this).parent('div.spyhelperSave').html('Saved');
				return false;
			});
		},
			
		handleSafeAjax: function() {
			var html = '<a class="button spy_t_report_save" href="#">Save</a>';
			$('div.archiveButton')
				.html(html)
				.addClass('spyhelperSave')
				.removeClass('archiveButton')
				.parent().show();
		}
	};
	
	var SpyUtils = {
		capitaliseFirstLetter: function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
			
		parseUrlParams: function(url) {
			var pos = url.indexOf('?'), params = {};
			
			if (pos > -1) {
				var i, tmp2, tmp = url.substr(pos + 1).split('&');
				for (i=0; i<tmp.length; ++i) {
					tmp2 = tmp[i].split('=');
					params[tmp2[0]] = tmp2[1];
				}
			}
			
			return params;
		},
			
		getCityInfo: function(id) {
			var key = 'city_flag'+id, data = SpyUtils.getValue(key);
			if (!data) {
				data = {
					flag: 0,
					logs: 0
				};
				SpyUtils.saveValue(key, data);
			}
			
			return data;
		},
			
		updateCityInfo: function(id, info) {
			var city_info = this.getCityInfo(id);
			
			for (var i in info) {
				city_info[i] = info[i];
			}
			SpyUtils.saveValue('city_flag'+id, city_info);
			
			return city_info;
		},
		
		saveValue: function(key, value) {
			if (!SpyUtils.isChrome()) {
				value = JSON.stringify(value);
			}
			GM_setValue(key, value);
		},
		
		getValue: function(key) {
			var value = GM_getValue(key);
			if (value && !SpyUtils.isChrome()) {
				value = JSON.parse(value);
			}
			return value;
		},
		
		isChrome: function() {
		  return (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);
		}
	};
	
	$(function(){
		var mode = null;
		
		switch (unsafeWindow.ikariam.backgroundView.id) {
			case 'worldmap_iso':
				mode = SpyWorldRadar;
				break;
			case 'island':
				mode = SpyIsland;
				break;
				
			case 'city':
				mode = SpyTown;
				break;
		}
		
		if (mode !== null)
			mode.init();
	});
})(jQuery);