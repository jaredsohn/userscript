// ==UserScript==
// @name           Battlelog: Show platoon members on servers (FIXED)
// @namespace      ocbaker
// @description    Makes an extra button on the bottom left menu that shows players online and playing from your platoons.
// @include        http://battlelog.battlefield.com/bf3/*
// @include        battlelog.battlefield.com/bf3/*
// @match          http://battlelog.battlefield.com/bf3/*
// @version        1.2
// ==/UserScript==

/* Credit To: olemartinorg
 * Original Script: http://userscripts.org/scripts/show/116875
*/

var addPlatoonButton = function () {

	// Don't ask. Without this, the chats in your com-center will disappear on page load until you resize the browser. It's not needed in FF though..
	$("#comcenter-chats").css('width', 'auto');

	$(".comcenter-info").append('\
	<surf:container id="comcenter-taskbar-platoons">\
		<div class="comcenter-icon-notifications-container">\
			<div id="comcenter-icon-platoons" class="comcenter-taskbar-icon-holder comcenter-interact-party" style="float: none; margin-left: 15px; margin-top: 9px;" title="">\
			</div>\
		</div>\
	</surf:container>\
	\
	<div class="comcenter-divider-left"></div>\
	\
	<div id="comcenter-platoons" class="comcenter-preview-area " style="display: none;">\
		<div id="comcenter-platoons-close" class="comcenter-notification-title comcenter-notification-notification-title">\
			<span id="platoons-title">Platoons</span>\
			<div class="comcenter-contract">&nbsp;</div>\
			<div class="base-clear"></div>\
		</div>\
		<div class="comcenter-notification-content">\
<div class="comcenter-notifications-moreinfo" id="platoons-goplatoonpage" style="display:none;text-align:left;padding-left:10px;">\
				<a id="platoons-goplatoonpage-link" href="javascript:void(0);">Go to Platoon Page</a>\
			</div>\
			<div class="comcenter-notification-list" style="max-height: 500px; overflow-y: auto;">\
				<surf:container id="comcenter-platoon-list">\
				</surf:container>\
			</div>\
			<div class="comcenter-notifications-moreinfo" id="platoons-goback" style="display:none;">\
				<a id="platoons-goback-link" href="javascript:void(0);">Go back</a>\
			</div>\
			<div class="comcenter-notifications-bottom"></div>\
		</div>\
	</div>');

	$('#comcenter-platoons').css({
	    'background': '#FDFDFD',
		'border-color': '#AAAAAA',
		'border-style': 'solid',
		'border-width': '1px 1px 0',
    	'bottom': '40px',
		'left': '104px',
		'position': 'absolute',
		'width': '250px',
		'z-index': '1000',
	});

	$('#comcenter-icon-platoons').hover( function () {
		$(this).css('cursor', 'pointer');
	}, function () {
		$(this).css('cursor', '');
	});

	var fillPlatoon = function () {
		var id = $(this).attr('id').replace('p-', '').replace('-link', '');
		var data = $('#platoon-'+id).data('platoon-data');
		$('#platoons-title').text(data.context.platoon.name);
                $('#platoons-goplatoonpage-link').attr('href','/bf3/platoon/'+data.context.platoon.id+'/');
                
		$('#platoons-goback').show();
                $('#platoons-goplatoonpage').show();
		$('#comcenter-platoon-list').empty();
		var servers = {};
		$.each(data.context.platoon.members, function (index, player) {
			if (player.user.presence.isOnline &&
				player.user.presence.isPlaying &&
				player.user.presence.serverGuid){
				var guid = player.user.presence.serverGuid;
				if ( guid in servers ){
					servers[guid].push(player);
				}else{
					servers[guid] = [player];
				}
			}
		});

		var servers2 = [];
		$.each(servers, function (key, value) {
			servers2.push(value);
		});
		function sortServers(a,b){
			return b.length - a.length;
		}
		servers2 = servers2.sort(sortServers);

		if (servers2.length == 0){
			$('#comcenter-platoon-list').append('<div class="comcenter-notification">There are no members from this platoon playing right now.</div>');
			return;
		}

		$.each(servers2, function (index, playerlist) {
			var guid = playerlist[0].user.presence.serverGuid;
			var url = '/bf3/servers/show/'+guid+'/comcenter-platoons-by-olemartinorg/';

			var players = 'players';
			if (playerlist.length == 1){
				players = 'player';
			}
			$('#comcenter-platoon-list').append('\
			<surf:container id="server-'+guid+'" class="bubble-title">\
				<div class="comcenter-notification">\
					<div class="battlereport-minicard battlereport-minicard-anchor">\
						<div class="battlereport-minicard-map" style="width:62px;height:42px;">\
							<img alt="mapimg" src="http://battlelog-cdn.battlefield.com/public/base/shared/loading16x16.gif" title="Map name" style="display:block;margin:auto;padding-top:10px;">\
						</div>\
						<div class="battlereport-minicard-body">\
							<div class="battlereport-minicard-body-title serverguide-cell-name" style="line-height:none;width:auto;">Unknown server</div>\
							<div class="battlereport-minicard-body-info">\
								?/? players\
							</div>\
							<div class="battlereport-minicard-body-ago">\
								'+playerlist.length+' '+players+' from platoon\
							</div>\
						</div>\
						<div class="base-clear"></div>\
						<a class="battlereport-minicard-link" href="'+url+'"></a>\
					</div>\
				</div>\
			</surf:container>');
			
			var battlebubble = "";
			$.each(playerlist, function (index, player) {
				battlebubble += player.user.username;
				if (index == playerlist.length-2){
					battlebubble += ' and ';
				}else if (index != playerlist.length-1){
					battlebubble += ', ';
				}
			});
			var isare = 'are';
			if (playerlist.length == 1){
				isare = 'is';
			}
			$('#server-'+guid).attr('data-battlebubble', battlebubble + ' '+isare+' playing on this server.');

			$.ajax({
				url: url,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-AjaxNavigation', '1');
				},
				success: function (data) {
					var guid = data.context.server.guid;
					var haspassword = "";
					if (data.context.server.hasPassword == true) {
						haspassword = '<div class="serverguide-hasPassword" style="margin-top:0px;margin-right:5px;"></div>';
					}
					$('#server-'+guid).find('img').first().attr('src', 'http://battlelog-cdn.battlefield.com/public/base/bf3/map_images/62x42/'+data.context.server.map.toLowerCase()+'.jpg');
					$('#server-'+guid).find('img').first().attr('style', '');
					$('#server-'+guid).find('.battlereport-minicard-body-title').first().html(haspassword+data.context.server.name);
					$('#server-'+guid).find('.battlereport-minicard-body-info').first().text(data.context.server.numPlayers + '/' + data.context.server.maxPlayers + " players");
				},
			});
		});
		return false;
	};
	
	var fillPlatoons = function () {
		// Filling with your platoons (from dropdown menu)
                $('#platoons-goback').hide();
                $('#platoons-goplatoonpage').hide();
		$('#comcenter-platoon-list').empty();
		$('#platoons-title').html('Platoons');
                
		$('#base-dropdown-menu-your-platoons').children().slice(1).each(function () {
			var href = $(this).find('a').first().attr('href');
			var id = href.replace('/bf3/platoon/', '').replace('/', '');
			var name = $(this).find('span').first().html();
			var image = $(this).find('img').first().attr('src').replace('emblems/26', 'emblems/60');
			$('#comcenter-platoon-list').append('\
				<surf:container id="platoon-'+id+'">\
					<div class="comcenter-notification">\
						<div class="battlereport-minicard battlereport-minicard-anchor" style="height:auto;">\
							<div class="battlereport-minicard-map" style="width:60px;height:60px;">\
								<img alt="platoonimg" src="http://battlelog-cdn.battlefield.com/public/base/shared/loading16x16.gif" style="display:block;margin:auto;padding-top:10px;">\
							</div>\
							<div class="battlereport-minicard-body">\
								<div class="battlereport-minicard-body-title">'+name+'</div>\
								<div class="battlereport-minicard-body-info">\
									<span id="p-'+id+'-info">? playing, ? online</span>\
								</div>\
								<div class="battlereport-minicard-body-ago">\
									<span id="p-'+id+'-members">? members, ? fans</span>\
								</div>\
							</div>\
							<div class="base-clear"></div>\
							<a class="battlereport-minicard-link" id="p-'+id+'-link"></a>\
						</div>\
					</div>\
				</surf:container>');
			$('#p-'+id+'-link').click(fillPlatoon);
			// Filling number of members and players
			$.ajax({
				url: href,
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-AjaxNavigation', '1');
				},
				success: function (data) {
					var id = data.context.platoon.id;
                                        $('#platoon-'+id).find('img').first().attr('src', $('#base-dropdown-menu-your-platoons_'+id).find('img').first().attr('src').replace('/26/','/60/')).attr('style', '');
					//$('#platoon-'+id).find('img').first().attr('src', 'http://static.cdn.ea.com/battlelog/prod/emblems/60/301/'+id+'.jpeg').attr('style', '');
					$('#platoon-'+id).data('platoon-data', data);
					$('#p-'+id+'-members').html(
						data.context.platoon.memberCounter+' members, '+data.context.platoon.fanCounter+' fans'
					);
					var playing = 0;
					var online = 0;
                                        //debugger;
					$.each(data.context.platoon.members, function (index, player) {
						if (player.user.presence.isOnline &&
							player.user.presence.isPlaying &&
							player.user.presence.serverGuid){
							playing++;
						}else if (player.user.presence.isOnline){
							online++;
						}
					});
					$('#p-'+id+'-info').html(playing+' playing, '+online+' online');
				}
			});
		});
	};

	$('#platoons-goback-link').click( function () {
		fillPlatoons();
	});

	$('#comcenter-taskbar-platoons').click( function () {
		$('#comcenter-platoons').toggle();
		if ($('#comcenter-platoons').css('display') == 'block'){
			fillPlatoons();
		}
	});

	$('#comcenter-platoons-close').click( function () {
		$('#comcenter-platoons').hide();
	});
};

function jQueryCallback(callback) {
	var script = document.createElement("script");
	script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}

window.addEventListener('load', function () {
	jQueryCallback(addPlatoonButton);
}, false);
