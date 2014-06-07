// ==UserScript==
// @name           Find Player Details (by Eleria) modifie
// @namespace      -
// @description    Busca jugadores detalladamente en el resultado mostrara
// @include        http://*.ogame.*/game/index.php?*page=*
// @version        2.4.4.1
// @require        http://userscripts.org:8080/scripts/source/118453.user.js
// @updateURL      http://userscripts.org:8080/scripts/source/136116.meta.js
// @downloadURL   http://userscripts.org:8080/scripts/scripts/source/136116.user.js
// ==/UserScript==

oGameVersionCheck('Find Player Details (by Eleria)','5.7.0.99','http://userscripts.org/scripts/show/136116');

(function(){
	var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
	var $ = unsafe.jQuery;
	if ( !$ ) return;

	var ogameUniverse = $('meta[name=ogame-universe]').attr('content'),
		ogamePlayerId = $('meta[name=ogame-player-id]').attr('content'),
		temp;
		
	ogameUniverse = ((ogameUniverse)?ogameUniverse.toString():'');
	ogamePlayerId = ((ogamePlayerId)?ogamePlayerId.toString():'0');

	$.get('http://' + ogameUniverse + '/api/universe.xml', function(uniData){
		var updateTimestamp = parseInt($(uniData).find('universe').first().attr('timestamp'),10) * 1000;
		
		$(document).ajaxSuccess(function(e,xhr,settings){
			// ogame search	
			
			if (settings.url.indexOf('http://' + ogameUniverse + '/game/index.php?page=search') != -1 && settings.type == 'POST') {
				
				var method = $('.ajaxContent').parent().find('.ui-tabs-active a').attr('id');
				
				if (method == '2') { // 2 = player, 4 = ally, 3 = planetnames
					$('#messagebox').css('overflow','auto');
					$('.ajaxContent').width(757).css('overflow','auto').find('tr').slice(1,-2).each(function(){
						var $resultRow = $(this).clone();
						var playerId = ogamePlayerId;
						if ($resultRow.find('td.action').children().size() > 0) {
							resultList = /to=(\d+)\&/.exec($resultRow.find('td.action').first().html());
							playerId = resultList[1];
							
						}
						var url = 'http://' + ogameUniverse + '/api/playerData.xml?id=' + playerId;
						$resultRow.find('td.position').css('margin-right','5px').empty();
						$resultRow.find('td.home').empty();
						
						$.get(url, function(data){
							var updateTimestampPlayer = parseInt($(data).find('playerData').first().attr('timestamp'),10) * 1000;
							var xmlTxt = 'OGame-API: ';
							var uT = updateTimestamp;
							if (updateTimestampPlayer > updateTimestamp) {
								uT = updateTimestampPlayer;
								xmlTxt += 'playerData.xml';
							} else {
								xmlTxt += 'universe.xml';
							}
							xmlTxt += '<br/>';
							var update = new Date(uT);
							var nowTimestamp = new Date().getTime();
							var difference = (nowTimestamp - uT);
							
							$('<span/>').css({'display':'block','text-align':'right','font-style':'italic'}).attr('title',update.getDate() + '.' + (update.getMonth() + 1) + '.' + update.getFullYear() + ' ' + update.getHours() + ':' + update.getMinutes() + ':' + update.getSeconds()).html(xmlTxt + 'update ' + formatTime(difference) + ' ago').appendTo($resultRow.find('td.position'));
							
							var coordsList = new Array();
							var planets = new Array();
							var xml = uniData;
							var selector = 'planet[player="' + playerId + '"]';
							if (updateTimestampPlayer > updateTimestamp) {
								xml = data;
								selector = 'planet';
							}
							$(xml).find(selector).each(function(i){
								var coords = $(this).attr('coords');
								var name = $(this).attr('name');
								
								var temp = /(\d+):(\d+):(\d+)/.exec(coords);
								var coordsPrepared = getCoordsPrepared(coords);
								var link = 'http://' + ogameUniverse + '/game/index.php?page=galaxy&galaxy=' + temp[1] + '&system=' + temp[2] + '&planet=' + temp[3];
								var moon = false;
								if ($(this).find('moon').size() > 0) moon = true;
								var home = false;
								if (i == 0) home = true;
								
								coordsList.push(coordsPrepared);
								planets[coordsPrepared] = {
									coords: coords,
									name: name,
									url: link,
									moon: moon,
									home: home
								};
							});
							
							coordsList.sort();
							
							var $home = $resultRow.find('td.home');
							var $coords = $resultRow.find('td.position');
							$('<br/>').appendTo($home);
							for (var t = 0; t < coordsList.length; t++) {
								$('<br/>').appendTo($home);
								if (t > 0) $('<br/>').appendTo($coords);
								
								var homeText = $('<span/>').html(planets[coordsList[t]].name).appendTo($home);
								if (planets[coordsList[t]].home) homeText.css('font-weight','bold');
								
								var text = '[' + planets[coordsList[t]].coords + ']';
								$('<a/>').attr('href',planets[coordsList[t]].url).attr('target','_parent').html(text).appendTo($coords).hover(function(){
									$(this).css('text-decoration','underline');
								},function(){
									$(this).css('text-decoration','none');
								});
								if (planets[coordsList[t]].moon) {
									$('<span/>').css('white-space','nowrap').html(' + M').appendTo($coords);
								}
							}
							
							var $highscore = $resultRow.find('td.highscore').width(150).css('text-align','left');
							
							var playerAttributes = [
								findAttributes($(data),0),		// points
								findAttributes($(data),1),		// economy
								findAttributes($(data),2),		// research
								findAttributes($(data),3),		// military points
								findAttributes($(data),4),		// military lost
								findAttributes($(data),5),		// military built
								findAttributes($(data),6),		// military destroyed
								findAttributes($(data),7)		// honour points
							];
							
							// points
							if ($highscore.find('a:eq(0)').length > 0) {
								temp = 'Points: ' + addThousandSeparator((playerAttributes[0].score)?playerAttributes[0].score.toString():'0') + ' (#' + $highscore.find('a:eq(0)').html().trim() + ')';
								$highscore.find('a:eq(0)').css('white-space','nowrap').html(temp);
							} else {
								(createSpanForHighscore('Points',playerAttributes[0].score,playerAttributes[0].rank)).appendTo($highscore);
							}
							
							var elems = [
								$('<br/>'),
								(createSpanForHighscore('Economy',playerAttributes[1].score,playerAttributes[1].rank)),
								$('<br/>'),
								(createSpanForHighscore('Research',playerAttributes[2].score,playerAttributes[2].rank)),
								$('<br/>'),
								$('<span/>').css({'white-space':'nowrap','font-weight':'bold'}).html('Military:'),
								$('<br/>'),
								(createSpanForHighscore('Points',playerAttributes[3].score,playerAttributes[3].rank)),
								$('<br/>'),
								$('<span/>').css('white-space','nowrap').html('Ships: ' + addThousandSeparator(playerAttributes[3].ships)),
								$('<br/>'),
								(createSpanForHighscore('Lost',playerAttributes[4].score,playerAttributes[4].rank)),
								$('<br/>'),
								(createSpanForHighscore('Built',playerAttributes[5].score,playerAttributes[5].rank)),
								$('<br/>'),
								(createSpanForHighscore('Destroyed',playerAttributes[6].score,playerAttributes[6].rank)),
								$('<br/>'),
								(createSpanForHighscore('Honour points',playerAttributes[7].score,playerAttributes[7].rank)),
								
							];
							$(elems).each(function(){
								$highscore.append($(this));
							});
						});
						
						
						// ----------------------
						// show/hide details
						// ----------------------
						var arrowDown = $(Arrow.htmlTag).css({
							width: Arrow.width,
							height: Arrow.height,
							background: Arrow.background,
							cursor:'pointer',
							backgroundPosition:Arrow.backgroundPosition.down
						});
						var arrowUp = arrowDown.clone().css({backgroundPosition:Arrow.backgroundPosition.up});
						
						if ($(this).find('td.no').size() > 0) {
							arrowDown.appendTo($(this).find('td.no').empty());
							arrowUp.appendTo($resultRow.find('td.no').empty());
						} else {
							var css = {
								'float':'left',
								'margin-right':'6px'
							};
							arrowDown.prependTo($(this).find('td.userName')).css(css);
							arrowUp.prependTo($resultRow.find('td.userName')).css(css);
						}
						
						$resultRow.insertBefore($(this)).hide();
						
						arrowDown.hover(function(){
							$(this).css({backgroundPosition:Arrow.backgroundPosition.downHover});
						}, function(){
							$(this).css({backgroundPosition:Arrow.backgroundPosition.down});
						}).click(function(){
							$(this).parent().parent().hide().prev().show();
						});
						
						arrowUp.hover(function(){
							$(this).css({backgroundPosition:Arrow.backgroundPosition.upHover});
						}, function(){
							$(this).css({backgroundPosition:Arrow.backgroundPosition.up});
						}).click(function(){
							$(this).parent().parent().hide().next().show();
						});
					});
				}
			}
		});
	});

	var Arrow = {
		htmlTag: '<div/>',
		width: '20px',
		height: '18px',
		background: 'url("http://gf2.geo.gfsrv.net/cdn71/fc7a8ede3499a0b19ea17613ff0cb1.gif") no-repeat scroll left top transparent',
		backgroundPosition: {
			down: 		'0 0',
			downHover: 	'-20px 0',
			up: 		'0 -18px',
			upHover: 	'-20px -18px'
		}
	};

	function findAttributes($data,type) {
		var result = {
			score: $data.find('position[type=' + type + ']').attr('score'),
			rank: $data.find('position[type=' + type + ']').text()
		};
		if (!isNaN(type) && type == 3) {
			result.ships = $data.find('position[type=' + type + ']').attr('ships');
			result.ships = ((result.ships)?result.ships.toString():'0');
		}
		return result;
	}

	function createSpanForHighscore(label,score,rank) {
		var temp = ((label)?label.toString():'') + ': ' + addThousandSeparator((score)?score.toString():'0') + ' (#' + ((rank)?rank.toString():'') + ')';
		return $('<span/>').css('white-space','nowrap').html(temp);
	}

	function addThousandSeparator(value) {
		var parts = /([+-]*)([\d]+)([\.,\d]*)/.exec((value) ? value.toString() : '');
		value = parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('');
		return parts[1] + value + parts[3];
	}

	function getCoordsPrepared(coords) {
		// parse coordinates into integer (zb.: 1:54:3 --> 001054003)
		var temp = /(\d+)\D*(\d*)\D*(\d*)/.exec((coords) ? coords.toString() : '');
		return ('000' + temp[1]).slice(-3) + ('000' + temp[2]).slice(-3) + ('000' + temp[3]).slice(-3);
	}

	function formatTime(value) {
		value = (isNaN(value) ? 0 : value);
		
		var days = Math.floor(value / (1000*60*60*24));
		var hours = Math.floor((value / (1000*60*60)) - (days*24));
		var minutes = Math.floor((value / (1000*60)) - (hours*60 + days*24*60));
		var seconds = Math.floor((value / (1000)) - (minutes*60 + hours*60*60 + days*24*60*60));

		var newTime = '';
		if (days > 0) newTime += days + 'd ';
		if (hours > 0 || days > 0) newTime += hours + 'h ';
		if (minutes > 0 || hours > 0 || days > 0) newTime += minutes + 'm ';
		newTime += seconds + 's ';
		return newTime;
	}
})();