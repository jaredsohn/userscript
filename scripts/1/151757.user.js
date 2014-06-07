scr_meta=<><![CDATA[
// ==UserScript==

// @name		Open Galaxy [OGame]
// @namespace		localhost
// @description		Open Galaxy Network - OGame public database Greasemonkey & Tampermonkey script
// @include		http://*.ogame.*game/index.php?page=*
// @copyright		2010-2013, Nate River, Asiman
// @license		GNU GPL
// @version 		2.5
// @author 		Nate River, Asiman
// @homepage 		http://galaxy.ddns.us
// @icon		http://galaxy.ddns.us/plugin_files/x2psearch.png

// @resource		ImgPassed		http://galaxy.ddns.us/plugin_files/x2pass.png
// @resource		ImgPassed_		http://galaxy.ddns.us/plugin_files/x2pass_.png
// @resource		ImgFailed		http://galaxy.ddns.us/plugin_files/x2fail.png
// @resource		ImgFailed_		http://galaxy.ddns.us/plugin_files/x2fail_.png
// @resource		ImgWarning		http://galaxy.ddns.us/plugin_files/x2warn.png
// @resource		ImgWarning_		http://galaxy.ddns.us/plugin_files/x2warn_.png
// @resource		ImgInProgress		http://galaxy.ddns.us/plugin_files/x2proc.png
// @resource		ImgInProgress_		http://galaxy.ddns.us/plugin_files/x2proc_.png
// @resource		ImgPlayerSearch		http://galaxy.ddns.us/plugin_files/x2psearch.png
// @resource 		ImgPlayerSearch_	http://galaxy.ddns.us/plugin_files/x2psearch_.png
// @resource		ImgPlayerStatistics	http://galaxy.ddns.us/plugin_files/x2pstats.png
// @resource 		ImgPlayerStatistics_	http://galaxy.ddns.us/plugin_files/x2pstats_.png
// @resource		ImgAllianceSearch	http://galaxy.ddns.us/plugin_files/x2asearch.png
// @resource 		ImgAllianceSearch_	http://galaxy.ddns.us/plugin_files/x2asearch_.png
// @resource		ImgAllianceMoonsSearch	http://galaxy.ddns.us/plugin_files/x2asearch2.png
// @resource 		ImgAllianceMoonsSearch_	http://galaxy.ddns.us/plugin_files/x2asearch2_.png

// ==/UserScript==
]]></>.toString();
// Global variables

var document = unsafeWindow.document;
var localStorage = unsafeWindow.localStorage;
var $ = unsafeWindow.$;
var scriptSettings =
	{
		'server' : 'http://galaxy.ddns.us',
		'id' : '70418',
		'time_update' : '1',
		'userscripts_redirect' : 'http://userscripts.org/scripts/show/70418',
		'version' : ReplaceSpaces('2.5'),
		'visited_timeout' : 2,
		'changed_timeout' : 2 * 24,
		'delay_timeout' : 7 * 24,
		'delay_size' : 5
	};
var images =
	{
		'ImgPlayerSearch' : GM_getResourceURL('ImgPlayerSearch'),
		'ImgPlayerSearch' : GM_getResourceURL('ImgPlayerSearch'),
		'ImgPlayerSearch_' : GM_getResourceURL('ImgPlayerSearch_'),
		'ImgPlayerStatistics' : GM_getResourceURL('ImgPlayerStatistics'),
		'ImgPlayerStatistics_' : GM_getResourceURL('ImgPlayerStatistics_'),
		'ImgAllianceSearch' : GM_getResourceURL('ImgAllianceSearch'),
		'ImgAllianceSearch_' : GM_getResourceURL('ImgAllianceSearch_'),
		'ImgAllianceMoonsSearch' : GM_getResourceURL('ImgAllianceMoonsSearch'),
		'ImgAllianceMoonsSearch_' : GM_getResourceURL('ImgAllianceMoonsSearch_')
	};
var Pages =
	{
		Unknown : { Value: 0, Name: "unknown" },
		Galaxy : { Value: 1, Name: "galaxy" },
		Highscore : { Value: 2, Name: "highscore" },
		Messages : { Value: 3, Name: "messages" },
		GalaxyContent : { Value: 4, Name: "galaxyContent" }
	};
var informer = new Informer();
var messenger = new GalaxyMessenger();

(function() // Main
{
var AnotherAutoUpdater = {
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/' + scriptSettings['id'] + '.meta.js',
	  onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) )
	GM_setValue('updated_'+this.id, 'off');
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated_'+this.id, this.time+'');
      top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated_'+this.id, 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated_'+this.id, this.time+'');
      }
    } else {
      if(response) alert('No updates available for ' + scriptSettings['time_update']);
      GM_setValue('updated_'+this.id, this.time+'');
    }
  },
  check: function() {
    if (GM_getValue('updated_'+this.id, 0) == "off")
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    else {
      if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
        GM_setValue('updated_'+this.id, this.time+'');
        this.call();
      }
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
    }
  }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') AnotherAutoUpdater.check();
	try
	{
		myName = Trim($('#playerName span.textBeefy').text());

		messenger.Init();

		InitUnsafeWindow();

		if ((CheckUrl() == Pages.Galaxy) || (CheckUrl() == Pages.Highscore))
		{
			ClearLocalStorage_();
			GalaxyAjaxSpy();
			HighscoreAjaxSpy();
			informer.Init();
			informer.SetState('warning');
			informer.SetMsg(ReplaceSpaces('Open Galaxy started'), 'lime');
		}

		if (CheckUrl() == Pages.Highscore)
		{
			HighscoreSpy();
		}

		if (CheckUrl() == Pages.Messages)
		{
			MessageSpy();
		}
	}
	catch(e)
	{
		alert(e.message);
	}
})();

(function() // Register Greasemonkey commands
{
	GM_registerMenuCommand('Open Galaxy: clear localStorage', ClearLocalStorage);
	GM_registerMenuCommand('Open Galaxy: show localStorage', ShowLocalStorage);
})();

function GalaxyAjaxSpy()
{
	$('#galaxyContent').ajaxSuccess(function(e, xhr, settings)
		{
			if (settings.url.indexOf(Pages.GalaxyContent.Name) == -1) return;

			DumpGalaxy();
            AddPlayerSpyLink();
            AddAllianceSpyLink();
		});
}

function HighscoreAjaxSpy()
{
	$("#stat_list_content").ajaxSuccess(function(e, xhr, settings)
		{
			HighscoreSpy();
		});
}

function MessageSpy()
{
	$("#messages").ajaxSuccess(function(e, xhr, settings)
	{
		var div = $('div.note');

		if (div.html().search(new RegExp('(.*\[[0-9]{1}:[0-9]{1,3}:[0-9]{1,2}\]){2}.*: [0-9]{1,3} %')) != -1)
		{
			var coordinates = $('div.note a:first').html().replace('[', '').replace(']', '').split(':');
			var cache = ReadLocalStorage('OpenGalaxy.SpyAssist.' + GameId() + '.' + coordinates[0] + ':' + coordinates[1] + ':' + coordinates[2]);

			if (cache)
			{
				MessageSpyShowData(cache, true);

				return;
			}

			setTimeout(
				function() {
					GM_xmlhttpRequest(
					{
						method: "POST",
						url: scriptSettings['server'] + '/xss2.php',
						data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + 5 + '&x=' + coordinates[0] + '&y=' + coordinates[1]+ '&z=' + coordinates[2],
						headers:
						{
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(response)
						{
							var responseText = response.responseText;

							if (!responseText || (responseText == '-1') || (responseText.indexOf('err:') != -1)) return;

							MessageSpyShowData(responseText, false);
							WriteLocalStorage('OpenGalaxy.SpyAssist.' + GameId() + '.' + coordinates[0] + ':' + coordinates[1] + ':' + coordinates[2], responseText, 7 * 24);
						}
					});
				},
			0);
		}
	});
}

function MessageSpyShowData(responseText, bCache)
{
	responseData = responseText.split('|');

	if (responseData[0] == 0) sColorP = "#444444"; else sColorP = "#ffffff";
	if (responseData[2] == 0) sColorF = "#444444"; else sColorF = "lime";

	if (bCache) sColor = 'yellow'; else sColor = 'lime'

	var sMsg = '<font color="#ffffff">Spy</font><font color="' + sColor + '">Assist</font> - <font color="red">' + responseData[4] + '</font>: <font color="' + sColorP + '">#' + responseData[1] + ' (' + responseData[0] + ')</font> / <font color="' + sColorF + '">#' + responseData[3] + ' (' + responseData[2] + '</font>)';
	var id = 'rcv_pspy';

	$('#' + id).remove();

	var div = $('div.note');
	var objMessage = $('<br /><br /><table id="' + id + '" style="display: none"><tr><td width="40">'
		+ '<a href="' + scriptSettings['userscripts_redirect'] + '" target="_blank">'
		+ CreateBlinkedImage('',
						images['ImgPlayerSearch'],
						images['ImgPlayerSearch_'],
						32,
						'Open Galaxy',
						'Open Galaxy',
						''
		)
		+ '</a>'
		+ '</td><td>'
		+ sMsg + '</td></tr></table>');

	div.append(objMessage);
	$('#' + id).show('slow');
}

function AddPlayerSpyLink()
{
	var items = $('div[id*="player"]');
	var base = document.location.href.split('?')[0];

	for (var i = 1; i < items.length; i++)
	{
		try
		{
			var playerName = items.eq(i).find('h1').find('span').text();
			var link = document.createElement('li');

			link.innerHTML = '<table><tr><td>'
					+ CreateBlinkedImage('',
									images['ImgPlayerSearch'],
									images['ImgPlayerSearch_'],
									32,
									'Find planets and moons',
									'Open Galaxy Search',
									'GetPlayerCoordinates(\'' + playerName + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode)'
					)
					+ '</td><td>'
					+ CreateBlinkedImage('',
									images['ImgPlayerStatistics'],
									images['ImgPlayerStatistics_'],
									20,
									'StatX',
									'Open Galaxy StatX',
									'GetPlayerStatistics(\'' + playerName + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0])'
					)
					+ '</td></tr></table>';

			items.eq(i).find('ul').append('<li>&nbsp;</li>');
			items.eq(i).find('ul').append(link);

			cache = ReadLocalStorage('OpenGalaxy.CoordX.' + GameId() + '.' + playerName);

			if (cache)
			{
				var cacheArray = cache.split('|');
				var list = $('<li class="coordx_cache"></li>').get(0);

				list.innerHTML += 'Coord<font color="yellow">X</font>:<br />';

				for (var j = 0; j < cacheArray.length; j++)
				{
					arrSplit = cacheArray[j].split(":");

					if (arrSplit[3] == '1') moon = '<font color="red">&nbsp;[&#9679;]</font>'; else moon = '';

					list.innerHTML += '<a target="_parent" style="text-decoration: none" href="' + base + '?page=' + Pages.Galaxy.Name + '&galaxy=' + arrSplit[0] + '&system=' + arrSplit[1] + '&position=' + arrSplit[2] + '">[' + arrSplit[0] + ':'+ arrSplit[1] + ':' + arrSplit[2] + ']' + moon + '</a><br />';
				}

				items.eq(i).find('ul').append(list);
			}

			cache = ReadLocalStorage('OpenGalaxy.StatX.' + GameId() + '.' + playerName);

			if (cache)
			{
				var cacheArray = cache.split('|');

				if (cacheArray[0] == 0) sColorP = "#444444"; else sColorP = "white";
				if (cacheArray[2] == 0) sColorF = "#444444"; else sColorF = "yellow";

				var list = $('<li class="statx_cache"></li>').get(0);

				list.innerHTML += 'Stat<font color="yellow">X</font>:<br /><font color="' + sColorP + '">#' + cacheArray[1] + ' (' + cacheArray[0] + ')</font> / <font color="' + sColorF + '">#' + cacheArray[3] + ' (' + cacheArray[2] + ')</font>';

				items.eq(i).find('ul').find('li').eq(0).after(list);
			}
		}
		catch(e)
		{
			alert(e.message);
		}
	}
}

function AddAllianceSpyLink()
{
	items = $('div[id*="alliance"]');
	coordinates = GetCurrentGalaxySystem().split(':');
	var base = document.location.href.split('?')[0];

	for (var i = 0; i < items.length; i++) {
		try {
			var allianceId = items.eq(i).attr('id').split('alliance')[1];
			var allianceName = Trim($('span[rel="alliance' + allianceId + '"]').text());

			link = document.createElement('li');
				link.innerHTML = '<table><tr><td>'
					+ CreateBlinkedImage('',
						images['ImgAllianceSearch'],
						images['ImgAllianceSearch_'],
						32,
						'Find planets (+/- 30 systems)',
						'Open Galaxy Search',
						'GetNearbyAllianceCoordinates(\'' + allianceName + '\', \'' + coordinates[0] + '\', \'' + coordinates[1] + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode, 2)'
					)
				+ '</td><td>'
					+ CreateBlinkedImage('',
						images['ImgAllianceMoonsSearch'],
						images['ImgAllianceMoonsSearch_'],
						20,
						'Find moons (+/- 60 systems)',
						'Open Galaxy Search',
						'GetNearbyAllianceCoordinates(\'' + allianceName + '\', \'' + coordinates[0] + '\', \'' + coordinates[1] + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode, 3)'
					)
				+ '</td></tr></table>';

			items.eq(i).find('ul').append('<li>&nbsp;</li>');
			items.eq(i).find('ul').append(link);

			cache = ReadLocalStorage('OpenGalaxy.CoordX2.' + GameId() + '.' + allianceName);

			if (cache)
			{
				var cacheArray = cache.split('|');
				var list = $('<li class="coordx2_cache"></li>').get(0);

				list.innerHTML += 'Coord<font color="yellow">X</font>:<br />';

				for (var j = 0; j < cacheArray.length; j++)
				{
					arrSplit = cacheArray[j].split(':');
					if (arrSplit[3] == '1') moon = '<font color="red">&nbsp;[&#9679;]</font>'; else moon = '';
					playerName = '<font color="#ffffff">&nbsp;' + ReplaceSpaces(arrSplit[4]) + '</font>';
					list.innerHTML += '<a target="_parent" style="text-decoration: none" href="' + base + '?page=' + Pages.Galaxy.Name + '&galaxy=' + arrSplit[0] + '&system=' + arrSplit[1] + '&position=' + arrSplit[2] + '">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + moon + playerName + '</a><br />';
				}

				items.eq(i).find('ul').append(list);
			}
		}
		catch(e)
		{
			alert(e.message);
		}
	}
}

function HighscoreSpy() {
	var higscoreTarget = $('#player').attr('class').indexOf('active') != -1 ? 'player' : '';
	var higscoreType = $('#points').attr('class').indexOf('active') != -1 ? 'points' : $('#fleet').attr('class').indexOf('active') != -1 ? 'fleet' : '';

	if ((higscoreTarget == 'player') && ((higscoreType == 'fleet') || (higscoreType == 'points')))
	{
		var positionlItems = $('td.position');
		var nameItems = $('td.name');
		var scoreItems = $('td.score');

		var positions = new Array();
		var names = new Array();
		var scores = new Array();

		for (var i = 1; i < positionlItems.length; i++)
		{
			positions.push(Trim(positionlItems.eq(i).html()));
			names.push(Trim(nameItems.eq(i).find('span.playername').html()));
			scores.push(Trim(scoreItems.eq(i).html()).replace('.', ''));
		}

		informer.SetState('inprogress');

		setTimeout(
			function()
			{
				GM_xmlhttpRequest(
				{
					method: 'POST',
					url: scriptSettings['server'] + '/xss4.php',
					data: 'xss=1' +
						'&sname=' + myName +
						'&url=' + SliceUrlAndEscapeAmpersants()+
						'&cmd=updstats' +
						'&who=' + higscoreTarget +
						'&type=' + higscoreType +
						'&positions=' + positions.join('|') +
						'&names=' + names.join('|') +
						'&scores=' + ReplaceAll(scores.join('|'), '.', '')
						,
					headers:
					{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response)
					{
						var responseText = response.responseText;

						if (!responseText) return;

						informer.SetState(responseText == "Ok" ? 'passed' : 'failed');
					}
				});
			},
		0);
	}
}

function Informer()
{
	this.imagePassed = GM_getResourceURL('ImgPassed');
	this.imageFailed = GM_getResourceURL('ImgFailed');
	this.imageWarning = GM_getResourceURL('ImgWarning');
	this.imageInProgress = GM_getResourceURL('ImgInProgress');
	this.imagePassed_ = GM_getResourceURL('ImgPassed_');
	this.imageFailed_ = GM_getResourceURL('ImgFailed_');
	this.imageWarning_ = GM_getResourceURL('ImgWarning_');
	this.imageInProgress_ = GM_getResourceURL('ImgInProgress_');
	this.imageHref = scriptSettings['userscripts_redirect'];
	this.imageTitle = 'Script page';

	this.Init = function()
	{
		var div = $('<div id="informer_ui" style="position: absolute; width: 400px; height: 48px; z-index: 9999; left: 4px; top: 4px"></div>')
			.html('<a id="informer_link" href="' + this.imageHref + '" target="_blank">'
				+ CreateBlinkedImage('informer_img',
								this.imageWarning,
								this.imageWarning_,
								32,
								this.imageTitle,
								'Open Galaxy',
								''
				)
				+ '</a>').appendTo('body');
	}

	this.SetState = function(sState, sColor)
	{
		switch(sState)
		{
			case 'passed':		image = this.imagePassed; image_ = this.imagePassed_; break;
			case 'failed':		image = this.imageFailed; image_ = this.imageFailed_; break;
			case 'warning':		image = this.imageWarning; image_ = this.imageWarning_; break;
			case 'inprogress':	image = this.imageInProgress; image_ = this.imageInProgress_; break;
			default: return;
		}

		$('#informer_img').attr('src', image).attr('rel', image_);
	}

	this.SetMsg = function(sMsg, sColor)
	{
		$('#fleetstatusrow').attr('class', '').html('<table width="100%"><tr><td style="text-align: left;"><font color="' + sColor + '">&nbsp;&nbsp;' + sMsg + '</font></td><td style="text-align: right;"><font color="#6F9FC8">' + ReplaceSpaces('Open Galaxy v' + scriptSettings['version'] + ' (c) Nate River, Asiman ') + '[&nbsp;<a href="' + scriptSettings['userscripts_redirect'] + '" target="_blank" style="text-decoration: none"><font color="lime">update</font></a>&nbsp;]</font>&nbsp;&nbsp;</td></tr></table>');
	}
}

function GalaxyMessenger()
{
	this.updateTimeoutMilliSeconds = 5000;
	this.rowsCount = 20;
	this.windowId = 'GalaxyMessenger';
	this.iconId = 'GalaxyMessengerIcon';

	this.localStoragePrefix = 'OpenGalaxy.Messenger.' + GameId() ;
	this.timerKey = this.localStoragePrefix  + '.Timer';
	this.lastMessageIdKey = this.localStoragePrefix  + '.LastMessageId';
	this.dataKey = this.localStoragePrefix  + '.Data';
	this.closedKey = this.localStoragePrefix  + '.Closed';
	this.positionKey = this.localStoragePrefix  + '.Position';

	this.Init = function(show)
	{
		var position = this.GetPosition();

		position = position ? position : { x : 4, y : 40 };

        var rows = '';

		for (var i = 0; i < this.rowsCount; i++)
		{
			rows += '<tr style="color: #ffffff; height: 21px;">\
				<td style="width: 22%; overflow: hidden;"><span id="p_' + i + '" style="font-size: 8pt; display: inline-block;"></span></td>\
				<td style="width: 05%; text-align: center;"><span id="s_' + i + '" style="font-size: 8pt;"></span></td>\
				<td style="width: 73%;"><span id="m_' + i + '" style="font-size: 8pt; display: inline-block;"></span></td></tr>';
		}

		var table = '<table style="width: 100%; table-layout: fixed; overflow: hidden; white-space: nowrap;">' + rows + '</table>';
        var header = '<table style="width: 100%;"><tr><td style="width: 100%; text-align: center;"><span>Galaxy messenger</span></td><td aling="center" style="padding: 0px 4px;"><a href="JavaScript: messenger.Hide();"><img style="margin-top: 4px" src="http://galaxy.ddns.us/plugin_files/messenger_close.png"></a></td></tr></table>';
		var input = '<table style="width: 100%;"><tr><td style="width: 100%;"><center><input type="text" style="width: 260px;" onKeyUp="messenger.PostMessage(event, this);"></center></input></td></tr></table>';
		var body = '<table style="width: 100%; border-collapse: collapse;">\
			<tr><td style="height: 20px; background-image: url(http://galaxy.ddns.us/plugin_files/messenger_header.png); vertical-align: center;">' + header + '</td></tr>\
			<tr><td style="vertical-align: top; background-image: url(http://galaxy.ddns.us/plugin_files/messenger_body.png); padding: 4px 4px;">' + table + '</td></tr>\
			<tr><td style="height: 30px; vertical-align: top; background-image: url(http://galaxy.ddns.us/plugin_files/messenger_bottom.png);">' + input + '</td></tr>\</table>';
		var html = '<div id="' + this.windowId + '" class="ui-widget-content t_ContentContainer" style="display: none; position: absolute; z-index: 99999; width: 280px; left: ' + position.x + 'px; top: ' + position.y + 'px;">' + body + '</div>';

		$(html).appendTo('body');

		$(function()
		{
			$('#' + messenger.windowId).draggable(
			{
				cursor: "move",
				stop: function(event, ui)
				{
					WriteLocalStorage(messenger.positionKey, ui.position.left + ':' + ui.position.top);
				}
			});
		});

		$(function() { $('#' + messenger.windowId).draggable(); });

		this.InitIcon();
		this.ShowMessagesFromLocalStorage();

		if (this.IsClosed())
		{
			$('#' + this.iconId).show();
		}
		else
		{
			$('#' + this.windowId).show(show);
		}

		this.AutoUpdate();
	}

	this.InitIcon = function()
	{
		var image = CreateBlinkedImage('',
						'http://galaxy.ddns.us/plugin_files/messenger_icon.png',
						'http://galaxy.ddns.us/plugin_files/messenger_icon_.png',
						32,
						'GalaxyMessanger',
						'GalaxyMessanger',
						'');
		var div = $('<div id="' + this.iconId + '" style="display: none; position: absolute; width: 400px; height: 48px; z-index: 9999; left: 4px; top: 40px"></div>')
			.html('<a href="JavaScript: messenger.Show();">' + image + '</a>');

		div.appendTo('body');
	}

	this.Show = function()
	{
		WriteLocalStorage(this.closedKey, 0);

		$('#' + this.iconId).hide();
		$('#' + this.windowId).show('slow');
	}

	this.Hide = function()
	{
		WriteLocalStorage(this.closedKey, 1);

		$('#' + this.windowId).hide('slow', function() { $('#' + messenger.iconId).show(); });
	}

	this.IsClosed = function()
	{
		return ReadLocalStorage(this.closedKey) == '1';
	}

	this.GetPosition = function()
	{
		var value = ReadLocalStorage(this.positionKey);

		if (!value) return;

		var position = value.split(':');

		return { x : position[0], y : position[1] };
	}

    this.Update = function(force)
	{
		if (!force)
		{
			var timer = ReadLocalStorage(this.timerKey);

			if (timer)
			{
				if (Date.now() - timer < this.updateTimeoutMilliSeconds) return;
			}
		}

		WriteLocalStorage(this.timerKey, Date.now());

		var id = ReadLocalStorage(this.lastMessageIdKey);

		id = id ? id : 0;

        setTimeout(
			function()
            {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: scriptSettings['server'] + '/xss6.php',
					data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + 1  + '&id=' + id,
					headers:
					{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response)
					{
						var responseText = response.responseText;

                        if (!responseText) return;

                        var rows = responseText.split('\n');

                        for (var i = 0; i < rows.length; i++)
                        {
                            var data = rows[i].split('\t');
							var id = data[0];
                            var player = data[1];
                            var message = data[2];

                            WriteLocalStorage(messenger.lastMessageIdKey, id, 7 * 24);

                            messenger.AddMessageToLocalStorage(player, message);
                        }

						messenger.ShowMessagesFromLocalStorage();
					}
				});
			},
		0);
    }

    this.AutoUpdate = function()
	{
		if (this.IsClosed()) return;

		this.Update(false);

        setTimeout(function() { messenger.AutoUpdate(); }, this.updateTimeoutMilliSeconds);
    }

    this.PostMessage = function(event, sender)
	{
		if (!event || !sender) return;
		if (event.keyCode != 13) return;
		if (!sender.value) return;

		var player = myName;
		var message = sender.value;

		sender.value = '';

		if (!player || !message) return;

		var sizeLimit = 100;

		if (message.length > sizeLimit)
		{
			if (!confirm('Message will be truncated to ' + sizeLimit + ' characters. Don\'t you mind?')) return;
		}

		player = encodeURIComponent(player.slice(0, sizeLimit));
		message = encodeURIComponent(message.slice(0, sizeLimit));

		player = this.AddStatusTag(player);

        setTimeout(
			function()
            {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: scriptSettings['server'] + '/xss6.php',
					data: 'xss=1&sname=' + player + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + 2 + '&message=' + message,
					headers:
					{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response)
					{
						var responseText = response.responseText;

						if (responseText != 'Ok') return;

                        messenger.Update(true);
                    }
				});
			},
		0);
    }

	this.AddStatusTag = function(player)
	{
		var playerNameElement = $('#playerName');

		var isBandit1 = playerNameElement.find('span[class*=rank_bandit1]').length;
		var isBandit2 = playerNameElement.find('span[class*=rank_bandit2]').length;
		var isBandit3 = playerNameElement.find('span[class*=rank_bandit3]').length;

		var isStarLord1 = playerNameElement.find('span[class*=rank_starlord1]').length;
		var isStarLord2 = playerNameElement.find('span[class*=rank_starlord2]').length;
		var isStarLord3 = playerNameElement.find('span[class*=rank_starlord3]').length;

		player += isBandit1 ? '#B1' : '';
		player += isBandit2 ? '#B2' : '';
		player += isBandit3 ? '#B3' : '';

		player += isStarLord1 ? '#L1' : '';
		player += isStarLord2 ? '#L2' : '';
		player += isStarLord3 ? '#L3' : '';

		return player;
	}

    this.AddMessageToLocalStorage = function(player, message)
	{
		var	rows = this.ReadRowsFromLocalStorage();
		var row = JSON.stringify([player, message]);

		rows.push(row);

		while (rows.length > this.rowsCount)
		{
			rows.shift();
		}

		this.WrireRowsToLocalStorage(rows);
    }

	this.ShowMessagesFromLocalStorage = function()
	{
		var	rows = this.ReadRowsFromLocalStorage();

		for (var i = 0; i < rows.length; i++)
		{
			var row = JSON.parse(rows[i]);
			var player = row[0];
			var message = row[1];

			var playerElement = $('#p_' + i);
			var spaceElement = $('#s_' + i);
			var messageElement = $('#m_' + i);

			playerElement.text(player);
			spaceElement.text(':');
			messageElement.text(message);

			this.InsertTitles(playerElement, messageElement, player, message);
			this.InsertExternalLink(messageElement);
			this.InsertGalaxyLinks(messageElement);
			this.AddStatusIcon(playerElement);
			this.ColorizeElement(playerElement);
			this.ColorizeElement(messageElement);
			this.InsertSmiles(messageElement);
		}
	}

	this.InsertTitles = function(playerElement, messageElement, player, message)
	{
		playerElement.attr('title', player);
		messageElement.attr('title', message);
	}

	this.InsertExternalLink = function(messageElement)
	{
		var externalLink = '<a href="$1" style="text-decoration: none;" target="_blank">$3</a>';

		messageElement.html(messageElement.html().replace(/((http|ftp|https):\/\/([\w-]+(\.[\w-]+)+)([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-]))+?/, externalLink));
	}

	this.InsertGalaxyLinks = function(messageElement)
	{
		var galaxyLink = '<a href="http://' + GameId() + '/game/index.php?page=galaxy&galaxy=$2&system=$3&position=$4" style="text-decoration: none;">$1</a>';

		messageElement.html(messageElement.html().replace(/(\[(\d{1}):(\d{1,3}):(\d{1,2})\])/, galaxyLink));
	}

	this.AddStatusIcon = function(playerElement)
	{
		var colorRegEx = /#[B,L]{1}[1-3]{1}/;
		var result = playerElement.html().match(colorRegEx);

		if (result)
		{
			playerElement.attr('title', playerElement.attr('title').replace(colorRegEx, ''));
			playerElement.html(playerElement.html().replace(colorRegEx, ''));

			var image = scriptSettings['server'] + '/plugin_files/player_statuses.png';
			var delta = 0;

			if (result[0] == '#B1') delta = -0;
			if (result[0] == '#B2') delta = -15;
			if (result[0] == '#B3') delta = -30;

			if (result[0] == '#L1') delta = -45;
			if (result[0] == '#L2') delta = -60;
			if (result[0] == '#L3') delta = -75;

			playerElement.html('<div style="height: 15px; width: 15px; margin: -4px 2px; background: url(' + image + '); background-position: ' + delta + 'px; display: inline-block;"></div>' + playerElement.html());
		}
	}

	this.ColorizeElement = function(element)
	{
		var colorRegEx = /#[A-Za-z0-9]{6}/;
		var result = element.html().match(colorRegEx);

		if (result)
		{
			element.attr('title', element.attr('title').replace(colorRegEx, ''));
			element.html(element.html().replace(colorRegEx, ''));
			element.html('<span style="color: ' + result[0] + '; display: inline-block;">' + element.html() + '<span>');
		}
	}

	this.InsertSmiles = function(messageElement)
	{
	    var delta = '-29';
		var smiles = // http://factoryjoe.com/projects/emoticons/
			{
				'Evil grin' : { Values: [']:)', '>:)', '(grin)'], x: 0, y: delta * 16 },
				'Smile' : { Values: [':)', ':=)', ':-)'], x: 0, y: 0 },
				'Sad Smile' : { Values: [':(', ':=(', ':-('], x: 0, y: delta },
                'Big Smile' : { Values: [':D', ':=D', ':-D', ':d', ':=d', ':-d'], x: 0, y: delta * 2 },
                'Cool' : { Values: ['8)', '8=)', '8-)', 'B)', 'B=)', 'B-)', '(cool)'], x: 0, y: delta * 3 },
                'Wink' : { Values: [';)', ';=)', ';-)'], x: 0, y: delta * 5 },
                'Wonder' : { Values: [':o', ':=o', ':-o', ':O', ':=O', ':-O'], x: 0, y: delta * 4 },
                'Crying' : { Values: [';(', ';-(', ';=('], x: 0, y: delta * 6 },
                'Sweating' : { Values: ['(sweat)', '(:|'], x: 0, y: delta * 7 },
                'Speechless' : { Values: [':|', ':=|', ':-|'], x: 0, y: delta * 8 },
                'Kiss' : { Values: [':*', ':=*', ':-*'], x: 0, y: delta * 9 },
                'Tongue Out' : { Values: [':P', ':=P', ':-P', ':p', ':=p', ':-p'], x: 0, y: delta * 10 },
                'Blush' : { Values: ['(blush)', ':$', ':-$', ':=$', ':">'], x: 0, y: delta * 11 },
                'Wondering' : { Values: [':^)'], x: 0, y: delta * 12 },
                'Sleepy' : { Values: ['|-)', 'I-)', 'I=)', '(snooze)'], x: 0, y: delta * 13 },
                'Dull' : { Values: ['|(', '|-(', '|=('], x: 0, y: delta * 14 },
                'In love' : { Values: ['(inlove)'], x: 0, y: delta * 15 },
                'Talking' : { Values: ['(talk)'], x: 0, y: delta * 17 },
                'Yawn' : { Values: ['(yawn)', '|-()'], x: 0, y: delta * 18 },
                'Puke' : { Values: ['(puke)', ':&', ':-&', ':=&'], x: 0, y: delta * 19 },
                'Doh!' : { Values: ['(doh)'], x: 0, y: delta * 20 },
                'Angry' : { Values: [':@', ':-@', ':=@', 'x(', 'x-(', 'x=(', 'X(', 'X-(', 'X=('], x: 0, y: delta * 21 },
                'It wasn\'t me' : { Values: ['(wasntme)'], x: 0, y: delta * 23 },
                'Party!!!' : { Values: ['(party)'], x: 0, y: delta * 25 },
                'Worried' : { Values: [':S', ':-S', ':=S', ':s', ':-s', ':=s'], x: 0, y: delta * 28 },
                'Mmm...' : { Values: ['(mm)'], x: 0, y: delta * 29 },
                'Nerd' : { Values: ['8-|', 'B-|', '8|', 'B|', '8=|', 'B=|', '(nerd)'], x: 0, y: delta * 32 },
                'Lips Sealed' : { Values: [':x', ':-x', ':X', ':-X', ':#', ':-#', ':=x', ':=X', ':=#'], x: 0, y: delta * 34 },
                'Hi' : { Values: ['(hi)'], x: 0, y: delta * 35 },
                'Call' : { Values: ['(call)'], x: 0, y: delta * 36 },
                'Devil' : { Values: ['(devil)'], x: 0, y: delta * 37 },
                'Angel' : { Values: ['(angel)'], x: 0, y: delta * 38 },
                'Envy' : { Values: ['(envy)'], x: 0, y: delta * 40 },
                'Wait' : { Values: ['(wait)'], x: 0, y: delta * 43 },
                'Bear' : { Values: ['(bear)', '(hug)'], x: 0, y: delta * 44 },
                'Make-up' : { Values: ['(makeup)', '(kate)'], x: 0, y: delta * 46 },
                'Covered Laugh' : { Values: ['(giggle)', '(chuckle)'], x: 0, y: delta * 47 },
                'Clapping Hands' : { Values: ['(clap)'], x: 0, y: delta * 48 },
                'Thinking' : { Values: ['(think)', ':?', ':-?', ':=?'], x: 0, y: delta * 49 },
                'Bow' : { Values: ['(bow)'], x: 0, y: delta * 50 },
                'Rolling on the floor laughing' : { Values: ['(rofl)'], x: 0, y: delta * 51 },
                'Whew' : { Values: ['(whew)'], x: 0, y: delta * 52 },
                'Happy' : { Values: ['(happy)'], x: 0, y: delta * 53 },
                'Smirking' : { Values: ['(smirk)'], x: 0, y: delta * 54 },
                'Nodding' : { Values: ['(nod)'], x: 0, y: delta * 55 },
                'Shaking' : { Values: ['(shake)'], x: 0, y: delta * 56 },
                'Punch' : { Values: ['(punch)'], x: 0, y: delta * 57 },
                'Emo' : { Values: ['(emo)'], x: 0, y: delta * 58 },
                'Yes' : { Values: ['(y)', '(Y)', '(ok)'], x: 0, y: delta * 59 },
                'No' : { Values: ['(n)', '(N)'], x: 0, y: delta * 60 },
                'Shaking Hands' : { Values: ['(handshake)'], x: 0, y: delta * 61 },
                'Skype' : { Values: ['(skype)', '(ss)'], x: 0, y: delta * 62 },
                'Heart' : { Values: ['(h)', '(H)', '(l)', '(L)'], x: 0, y: delta * 63 },
                'Broken heart' : { Values: ['(u)', '(U)'], x: 0, y: delta * 64 },
                'Mail' : { Values: ['(e)', '(m)'], x: 0, y: delta * 65 },
                'Flower' : { Values: ['(f)', '(F)'], x: 0, y: delta * 66 },
                'Rain' : { Values: ['(rain)', '(london)', '(st)'], x: 0, y: delta * 67 },
                'Sun' : { Values: ['(sun)'], x: 0, y: delta * 68 },
                'Time' : { Values: ['(o)', '(O)', '(time)'], x: -29, y: 0 },
                'Music' : { Values: ['(music)'], x: -29, y: delta },
                'Movie' : { Values: ['(~)', '(film)', '(movie)'], x: -29, y: delta * 2 },
                'Phone' : { Values: ['(mp)', '(ph)'], x: -29, y: delta * 3 },
                'Coffee' : { Values: ['(coffee)'], x: -29, y: delta * 4 },
                'Pizza' : { Values: ['(pizza)', '(pi)'], x: -29, y: delta * 5 },
                'Cash' : { Values: ['(cash)', '(mo)', '($)'], x: -29, y: delta * 6 },
                'Muscle' : { Values: ['(muscle)', '(flex)'], x: -29, y: delta * 7 },
                'Cake' : { Values: ['(^)', '(cake)'], x: -29, y: delta * 8 },
                'Beer' : { Values: ['(beer)'], x: -29, y: delta * 9 },
                'Drink' : { Values: ['(d)', '(D)'], x: -29, y: delta * 10 },
                'Dance' : { Values: ['(dance)', '\o/', '\:D/', '\:d/'], x: -29, y: delta * 11 },
                'Ninja' : { Values: ['(ninja)'], x: -29, y: delta * 12 },
                'Star' : { Values: ['(*)'], x: -29, y: delta * 13 },
                'Mooning' : { Values: ['(mooning)'], x: -29, y: delta * 14 },
                'Finger' : { Values: ['(finger)'], x: -29, y: delta * 15 },
                'Bandit' : { Values: ['(bandit)'], x: -29, y: delta * 16 },
                'Drunk' : { Values: ['(drunk)'], x: -29, y: delta * 17 },
                'Smoking' : { Values: ['(smoking)', '(smoke)', '(ci)'], x: -29, y: delta * 18 },
                'Toivo' : { Values: ['(toivo)'], x: -29, y: delta * 19 },
                'Rock' : { Values: ['(rock)'], x: -29, y: delta * 20 },
                'Headbang' : { Values: ['(headbang)', '(banghead)'], x: -29, y: delta * 21 },
                'Bug' : { Values: ['(bug)'], x: -29, y: delta * 22 },
                'Fubar' : { Values: ['(fubar)'], x: -29, y: delta * 23 },
                'Poolparty' : { Values: ['(poolparty)'], x: -29, y: delta * 24 },
                'Swearing' : { Values: ['(swear)'], x: -29, y: delta * 25 },
                'TMI' : { Values: ['(tmi)'], x: -29, y: delta * 26 },
                'Heidy' : { Values: ['(heidy)'], x: -29, y: delta * 27 },
                'MySpace' : { Values: ['(MySpace)'], x: -29, y: delta * 28 },
                'Malthe' : { Values: ['(malthe)'], x: -29, y: delta * 29 },
                'Tauri' : { Values: ['(tauri)'], x: -29, y: delta * 30 },
                'Priidu' : { Values: ['(priidu)'], x: -29, y: delta * 31 }
            };
		var emoticons = scriptSettings['server'] + '/plugin_files/emoticons.png';

		for (var i in smiles)
		{
			var image = '</span><span style="width: 19px; height: 19px; display: inline-block; margin: -4px 2px; background: url(' + emoticons + ') no-repeat; background-position: ' + smiles[i].x + 'px ' + smiles[i].y + 'px !important;"></span>';

			for (var j = 0; j < smiles[i].Values.length; j++)
			{
				messageElement.html(ReplaceAll(messageElement.html(), smiles[i].Values[j], image));
			}
		}
	}

	this.ReadRowsFromLocalStorage = function(messageElement)
	{
		var data = ReadLocalStorage(this.dataKey);
		var	rows = data ? JSON.parse(data) : [];

		return rows;
	}

	this.WrireRowsToLocalStorage = function(rows)
	{
		WriteLocalStorage(this.dataKey, JSON.stringify(rows));
	}
}

function DumpGalaxy(forceUpdate)
{
	if (!(galaxyRows = IsGalaxyEmpty()))
		if (!(galaxyRows = ParseGalaxy())) return false;

	var data = dataString = '', galaxySystem = galaxyRows[0].newCoordinate.split(':')[0] + '' + galaxyRows[0].newCoordinate.split(':')[1];
	for (var i = 0; i < galaxyRows.length; i++) {
		data += galaxyRows[i].ToString();
		dataString += galaxyRows[i].GetHash();
	}

	if (!forceUpdate)
	{
		if (!IsChangedSystem(galaxySystem, dataString)) return true;
		if (!(data = DelayedUpload(galaxySystem, data))) return true;
	}

	informer.SetState('inprogress');
	informer.SetMsg(ReplaceSpaces('[' + galaxySystem + ':0] updating...'), 'lime');

	setTimeout(
		function() {
			GM_xmlhttpRequest({
				method: 'POST',
				url: scriptSettings['server'] + '/xss1.php',
				data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + "&cmd=7&galaxy=" + data,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(response) {
					var responseText = response.responseText;
					if (responseText == "Ok") {
						informer.SetState('passed');
						//informer.SetMsg('[' + galaxySystem.substr(0, 1) + ':' + galaxySystem.substr(1) + ':0]' + ReplaceSpaces(' updated'), 'lime');
						informer.SetMsg(ReplaceSpaces('Data upload succeeded'), 'lime');
					}
					else {
						if (responseText.indexOf('err:') != -1) {
							informer.SetState('failed');
							informer.SetMsg(ReplaceSpaces('Data upload (' + scriptSettings['delay_size'] + ' systems): ' + responseText.split('err:')[1]), '#ff0000');
						}
						else {
							informer.SetState('failed');
							if (responseText)
								informer.SetMsg(ReplaceSpaces('Data upload (' + scriptSettings['delay_size'] + ' systems): ' + 'Server response is unexpected'), '#ff0000');
							else
								informer.SetMsg(ReplaceSpaces('Data upload (' + scriptSettings['delay_size'] + ' systems): ' + 'Server response is empty'), '#ff0000');
						}
					}
				}
			});
		},
	0);

	return true;
}

function GalaxyRow()
{
	this.newCoordinate = '';
	this.moon = '';
	this.playerName = '';
	this.playerRank = '';
	this.allyTag = '';
	this.allyRank = '';

	this.ToString = function()
	{
		var str;

		if (this.playerRank == '-') this.playerRank = 0;

		str = this.newCoordinate + '\t';
		str += this.moon + '\t';
		str += this.playerName + '\t';
		str += this.playerRank + '\t';
		str += this.allyTag + '\t';
		str += this.allyRank;
		str += '\n';

		return str;
	}

	this.GetHash = function()
	{
		var str;

		str = this.newCoordinate + '\t';
		str += this.moon + '\t';
		str += this.playerName + '\t';
		str += this.allyTag;
		str += '\n';

		return str;
	}
}

function IsGalaxyEmpty()
{
	var items = $('div[id="player"]');

	if (items.length == 15)
	{
		var galaxySystem = GetCurrentGalaxySystem();
		var galaxyRows = new Array();

		for (var i = 1; i <= 15; i++)
		{
			var galaxyRow = new GalaxyRow();

			galaxyRow.newCoordinate = galaxySystem + ':' + i;
			galaxyRows.push(galaxyRow);
		}

		return galaxyRows;
	}
	else return false;
}

function ParseGalaxy()
{
	try
	{
		var galaxyRows = new Array();
		var rows = $('tr.row');
		var galaxySystem = GetCurrentGalaxySystem();

		for (var i = 0; i < rows.length; i++) {
			var galaxyRow = new GalaxyRow();

			var objItem = rows.eq(i).find('td.position');
			if (objItem.length == 1) galaxyRow.newCoordinate = galaxySystem.split(':')[0]  + ':' + galaxySystem.split(':')[1]  + ':' + objItem.html();
			else throw 'Can not determine coordinates';

			var objItem = rows.eq(i).find('td.moon');
			if (objItem.length == 1) if (objItem.children().length != 0) galaxyRow.moon = 1;

			var objItem = rows.eq(i).find('td.playername').find('a[rel*="player"]');
			if (objItem.length == 0) // It is player himself
			{
				galaxyRow.playerName = myName;
				galaxyRow.playerRank = $('#bar').find('a[href*="highscore"]').parent().text().split('(')[1].split(')')[0];
			}
			else
			{
				var playerId = objItem.eq(0).attr('rel').replace('player', '');
				if (playerId != 0) {
					galaxyRow.playerName = objItem.find('span').text();

					var link = $('a[href$="searchRelId=' + playerId + '"]');
					galaxyRow.playerRank = link.length == 0 ? 0 : link.eq(0).text();
				}
			}

			var objItem = rows.eq(i).find('td.allytag').find('span:first');
			if (objItem.length == 1) galaxyRow.allyTag = Trim(objItem.clone().children().remove().end().text());

			var objItem = rows.eq(i).find('td.allytag').find('li.rank');
			if (objItem.length == 1) galaxyRow.allyRank = objItem.find('a').text();

			galaxyRows.push(galaxyRow);
		}

		return galaxyRows;
	}
    catch(e)
	{
		alert(e.message);
	}
}

function GetCurrentGalaxySystem()
{
	var key = 'span[id="pos-planet"]';

	if ($(key).length == 0)
	{
		var sLink = $('a.planetMoveIcons').eq(0).attr('onClick');

		if (!sLink) sLink = $('a.planetMoveIcons').eq(0).attr('href');

		var sGalaxy = parseInt(sLink.split('galaxy=')[1].split('&amp;')[0]);
		var sSystem = parseInt(sLink.split('system=')[1].split('&amp;')[0]);

		return sGalaxy + ':' + sSystem;
	}
	else
	{
		var coordinatess = $(key).eq(0).html().replace('[', '').replace(']', '');

		if (coordinatess == null) return;

		var coordinates = coordinatess.split(':');

		return coordinates[0] + ':' + coordinates[1];
	}
}

// System functions

function CheckUrl()
{
	var regExp = "http://.*\.ogame\..*/game/index.php\\?page=";

	if (document.location.href.search(new RegExp(regExp + Pages.Galaxy.Name)) != -1) return Pages.Galaxy;
	if (document.location.href.search(new RegExp(regExp + Pages.Highscore.Name)) != -1) return Pages.Highscore;
	if (document.location.href.search(new RegExp(regExp + Pages.Messages.Name)) != -1) return Pages.Messages;

	return Pages.Unknown;
}

function Trim(string)
{
	var sPattern = "\\S+.+\\S+";
	var objResult = (new RegExp(sPattern)).exec(string);

	return (objResult) ? objResult[0] : string;
}

function ReplaceAll(string, sS1, sS2)
{
	return string.split(sS1).join(sS2);
}

function SliceUrlAndEscapeAmpersants()
{
	return ReplaceAll(document.location.href.slice(0, 80), '&', '[amp]');
}

function ReplaceSpaces(string)
{
	return ReplaceAll(string, ' ', '&nbsp;');
}

function CreateBlinkedImage(id, image, image_, iWidth, sTitle, sAlt, sOnlick)
{
	return '<img id="' + id + '" src="' + image + '" rel="' + image_ + '" width="' + iWidth + '" title="' + sTitle + '" ' + CreateImgSwitcher() + ' alt="' + sAlt + '" onclick="' + sOnlick + '" style="cursor: pointer">';
}

function CreateImgSwitcher()
{
	return 'onmouseover=\'sTmp=$(this).attr("src"); $(this).attr("src", $(this).attr("rel")); $(this).attr("rel", sTmp);\' onmouseout=\'sTmp=$(this).attr("src"); $(this).attr("src", $(this).attr("rel")); $(this).attr("rel", sTmp);\'';
}

function GameId()
{
	var uni = document.location.href.split('/game/')[0].replace('http://', '');

	if (!uni) throw { message: "Can not determine game id", code: -1 }

	return uni;
}

function IsNotVisitedSystem()
{
	var temp = GetCurrentGalaxySystem().split(':');
	var coordinates = GetCurrentGalaxySystem().replace(':', '');
	var key = 'OpenGalaxy.Visited.' + GameId() + '.' + coordinates;

	if (ReadLocalStorage(key))
	{
		informer.SetState('passed');
		informer.SetMsg('[' + temp[0] + ':' + temp[1] + ReplaceSpaces(':0] was recently updated'), 'yellow');

		return false;
	}
	else
	{
		WriteLocalStorage(key, '1', scriptSettings['visited_timeout']);

		return true;
	}
}

function IsChangedSystem(galaxySystem, dataString) {
	var key = 'OpenGalaxy.SystemMD5.' + GameId() + '.' + galaxySystem;

	if (ReadLocalStorage(key) == MD5(dataString))
	{
		informer.SetState('passed');
		informer.SetMsg('[' + galaxySystem.substr(0, 1) + ':' + galaxySystem.substr(1) + ReplaceSpaces(':0] was not changed since last update ') + CreateManualGalaxyUpdateLink(), 'yellow');

		return false;
	}
	else
	{
		WriteLocalStorage(key, MD5(dataString), scriptSettings['changed_timeout'])

		return true;
	}
}

function CreateManualGalaxyUpdateLink()
{
	return '<a href="JavaScript: DumpGalaxy(true);" style="text-decoration: none" title="Manual update"><font color="lime">^</fond></a>';
}

function DelayedUpload(galaxySystem, data)
{
	var key = 'OpenGalaxy.DelayedUpload.' + GameId(), buffer = '';

	if (scriptSettings['delay_size'] <= 1) return data;

	if (buffer = ReadLocalStorage(key))
	{
		if (buffer.split('\n').length >= ((scriptSettings['delay_size'] - 1) * 15)) {
			WriteLocalStorage(key, 0, 0);
			return buffer + data;
		}
		else
		{
			WriteLocalStorage(key, buffer + data, scriptSettings['delay_timeout']);
		}
	}
	else
	{
		WriteLocalStorage(key, data, scriptSettings['delay_timeout'])
	}

	informer.SetState('passed');
	informer.SetMsg('[' + galaxySystem.substr(0, 1) + ':' + galaxySystem.substr(1) + ReplaceSpaces(':0] delayed (grouping by ' + scriptSettings['delay_size'] + ') ') + CreateManualGalaxyUpdateLink(), 'yellow');

	return false;
}

function ResizeTooltip()
{
	$('.t_Tooltip.t_visible').height('640');
}

// Local storage

function WriteLocalStorage(key, value, iStoreH)
{
	iStoreH = iStoreH ? iStoreH : 7 * 24;

	localStorage.setItem(key, value + '&store:' + ((new Date()).getTime() + iStoreH * 3600 * 1000));
}

function ReadLocalStorage(key)
{
	value = localStorage.getItem(key);

    if (!value) return false;

    valueArray = value.split('&store:');

    if (valueArray[1] < (new Date()).getTime())
    {
		localStorage.removeItem(key)
		return false;
	}

	return valueArray[0];
}

function ClearLocalStorage_()
{
	if (Math.random() >= 0.01) return false;

    for (var i = 0; i < localStorage.length; i++)
	{
		value = localStorage[localStorage[i]];

		if (value.split('&store:')[1] < (new Date()).getTime()) localStorage.removeItem(localStorage[i]);
	}

	return true;
}

function ClearLocalStorage()
{
	localStorage.clear();

	alert('Local storage cleared');
}

function ShowLocalStorage()
{
	result = '';

    for (var i = 0; i < localStorage.length; i++)
    {
        result += localStorage.key(i) + ' => ' + localStorage.getItem(localStorage.key(i)) + '\n';
    }

	alert(result);
}

// unsafeWindow

function InitUnsafeWindow()
{
	unsafeWindow.messenger = messenger;

	unsafeWindow.DumpGalaxy = function(forceUpdate)
	{
		DumpGalaxy(forceUpdate);
	}

	unsafeWindow.GetPlayerCoordinates = function(playerName, appendTo)
	{
		if (!playerName) return;

		var base = document.location.href.split('?')[0];

		setTimeout(
			function() {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: scriptSettings['server'] + '/xss2.php',
					data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + 1 + '&pname=' + playerName,
					headers:
					{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response) {
						var responseText = response.responseText;
						$(appendTo).parent().find('li.coordx_cache').eq(0).remove();
						var id = 'rcv_pdata';
						$('#' + id).remove();
						var list = $('<li id="' + id + '" style="display: none"></li>').get(0);
						if (!responseText) list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Unspecified error</font>';
						else {
							if (responseText == '-1') list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Nothing found</font>';
							else {
								if (responseText.indexOf('err:') != -1)
									list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">' + responseText.split('err:')[1] + '</font>';
								else {
									list.innerHTML += 'Coord<font color="lime">X</font>:<br />'
									coordinates = responseText.split('|');
									for (var i = 0; i < coordinates.length; i++) {
										arrSplit = coordinates[i].split(":");
										if (arrSplit[3] == '1') moon = '<font color="red">&nbsp;[&#9679;]</font>'; else moon = '';
										list.innerHTML += '<a target="_parent" style="text-decoration: none" href="' + base + '?page=' + Pages.Galaxy.Name + '&galaxy=' + arrSplit[0] + '&system=' + arrSplit[1] + '&position=' + arrSplit[2] + '">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + moon + '</a><br />';
										WriteLocalStorage('OpenGalaxy.CoordX.' + GameId() + '.' + playerName, responseText, 7 * 24);
									}
								}
							}
						}
						appendTo.appendChild(list);
						ResizeTooltip();
						$('#' + id).show('slow');
					}
				});
			},
		0);
	}

	unsafeWindow.GetPlayerStatistics = function(playerName, appendTo)
	{
		if (!playerName) return;

		setTimeout(
			function() {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: scriptSettings['server'] + '/xss2.php',
					data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + 4 + '&pname=' + playerName,
					headers:
					{
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response) {
						var responseText = response.responseText;
						$(appendTo).parent().find('li.statx_cache').eq(0).remove();
						var id = 'rcv_pstats';
						$('#' + id).remove();
						var list = $('<li id="' + id + '" style="display: none"></li>').get(0);
						if (!responseText) list.innerHTML += 'Stat<font color="red">X</font>:<br /><font color="red">Unspecified error</font>';
						else {
							if (responseText == '-1') list.innerHTML += 'Stat<font color="red">X</font>: <font color="red">Nothing found</font>';
							else {
								if (responseText.indexOf('err:') != -1)
									list.innerHTML += 'Stat<font color="red">X</font>: <font color="red">' + responseText.split('err:')[1] + '</font>';
								else {
									responseData = responseText.split('|');

									if (responseData[0] == 0)
									{
										responseData[0] = '?';
										responseData[1] = '?';
										sColorP = "#888888";
									}
									else sColorP = "#ffffff";

									if (responseData[2] == 0)
									{
										responseData[2] = '?';
										responseData[3] = '?';
										sColorF = "#888888";
									}
									else sColorF = "lime";

									list.innerHTML += 'Stat<font color="lime">X</font>:<br /><font color="' + sColorP + '">#' + responseData[1] + ' (' + responseData[0] + ')</font> / <font color="' + sColorF + '">#' + responseData[3] + ' (' + responseData[2] + ')</font>';
									WriteLocalStorage('OpenGalaxy.StatX.' + GameId() + '.' + playerName, responseText, 7 * 24);
								}
							}
						}
						$(appendTo).after(list);
						ResizeTooltip();
						$('#' + id).show('slow');
					}
				});
			},
		0);
	}

	unsafeWindow.GetNearbyAllianceCoordinates = function(allianceName, sX, sY, appendTo, iCmd)
	{
		if (!(allianceName && sX && sY && appendTo)) return;

		var base = document.location.href.split('?')[0];

		setTimeout(
			function() {
				GM_xmlhttpRequest({
					method: 'POST',
					url: scriptSettings['server'] + '/xss2.php',
					data: 'xss=1&sname=' + myName + '&url=' + SliceUrlAndEscapeAmpersants() + '&cmd=' + iCmd + '&aname=' + allianceName + '&x=' + sX + '&y=' + sY,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(response) {
						var responseText = response.responseText;
						$(appendTo).parent().find('li.coordx2_cache').eq(0).remove();
						var id = 'rcv_adata';
						$('#' + id).remove();
						var list = $('<li id="' + id + '" style="display: none"></li>').get(0);
						if (!responseText) list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Unspecified error</font>';
						else {
							if (responseText == '-1') list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Nothing found</font>';
							else {
								if (responseText.indexOf('err:') != -1)
									list.innerHTML += 'Coord<font color="red">X</font>: <font color="red">' + responseText.split('err:')[1] + '</font>';
								else {
									list.innerHTML += 'Coord<font color="lime">X</font>:<br />';
									coordinates = responseText.split('|');
									for (var i = 0; i < coordinates.length; i++) {
										arrSplit = coordinates[i].split(":");
										if (arrSplit[3] == '1') moon = '<font color="red">&nbsp;[&#9679;]</font>'; else moon = '';
										playerName = '<font color="#ffffff">&nbsp;' + ReplaceSpaces(arrSplit[4]) + '</font>';
										list.innerHTML += '<a target="_parent" style="text-decoration: none" href="' + base + '?page=' + Pages.Galaxy.Name + '&galaxy=' + arrSplit[0] + '&system=' + arrSplit[1] + '&position=' + arrSplit[2] + '">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + moon + playerName + '</a><br />';
									}
									WriteLocalStorage('OpenGalaxy.CoordX2.' + GameId() + '.' + allianceName, responseText, 7 * 24);
								}
							}
						}
						appendTo.appendChild(list);
						ResizeTooltip();
						$('#' + id).show('slow');
					}
				});
			},
		0);
	}
}

/**
*
*  MD5 (Message-Digest Algorithm)
*  http://www.webtoolkit.info/
*
**/

var MD5=function(string){function RotateLeft(lValue,iShiftBits){return(lValue<<iShiftBits)|(lValue>>>(32-iShiftBits))}function AddUnsigned(lX,lY){var lX4,lY4,lX8,lY8,lResult;lX8=(lX&0x80000000);lY8=(lY&0x80000000);lX4=(lX&0x40000000);lY4=(lY&0x40000000);lResult=(lX&0x3FFFFFFF)+(lY&0x3FFFFFFF);if(lX4&lY4){return(lResult^0x80000000^lX8^lY8)}if(lX4|lY4){if(lResult&0x40000000){return(lResult^0xC0000000^lX8^lY8)}else{return(lResult^0x40000000^lX8^lY8)}}else{return(lResult^lX8^lY8)}}function F(x,y,z){return(x&y)|((~x)&z)}function G(x,y,z){return(x&z)|(y&(~z))}function H(x,y,z){return(x^y^z)}function I(x,y,z){return(y^(x|(~z)))}function FF(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(F(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function GG(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(G(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function HH(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(H(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function II(a,b,c,d,x,s,ac){a=AddUnsigned(a,AddUnsigned(AddUnsigned(I(b,c,d),x),ac));return AddUnsigned(RotateLeft(a,s),b)};function ConvertToWordArray(string){var lWordCount;var lMessageLength=string.length;var lNumberOfWords_temp1=lMessageLength+8;var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1%64))/64;var lNumberOfWords=(lNumberOfWords_temp2+1)*16;var lWordArray=Array(lNumberOfWords-1);var lBytePosition=0;var lByteCount=0;while(lByteCount<lMessageLength){lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=(lWordArray[lWordCount]|(string.charCodeAt(lByteCount)<<lBytePosition));lByteCount++}lWordCount=(lByteCount-(lByteCount%4))/4;lBytePosition=(lByteCount%4)*8;lWordArray[lWordCount]=lWordArray[lWordCount]|(0x80<<lBytePosition);lWordArray[lNumberOfWords-2]=lMessageLength<<3;lWordArray[lNumberOfWords-1]=lMessageLength>>>29;return lWordArray};function WordToHex(lValue){var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;for(lCount=0;lCount<=3;lCount++){lByte=(lValue>>>(lCount*8))&255;WordToHexValue_temp="0"+lByte.toString(16);WordToHexValue=WordToHexValue+WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2)}return WordToHexValue};function Utf8Encode(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128)}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128)}}return utftext};var x=Array();var k,AA,BB,CC,DD,a,b,c,d;var S11=7,S12=12,S13=17,S14=22;var S21=5,S22=9,S23=14,S24=20;var S31=4,S32=11,S33=16,S34=23;var S41=6,S42=10,S43=15,S44=21;string=Utf8Encode(string);x=ConvertToWordArray(string);a=0x67452301;b=0xEFCDAB89;c=0x98BADCFE;d=0x10325476;for(k=0;k<x.length;k+=16){AA=a;BB=b;CC=c;DD=d;a=FF(a,b,c,d,x[k+0],S11,0xD76AA478);d=FF(d,a,b,c,x[k+1],S12,0xE8C7B756);c=FF(c,d,a,b,x[k+2],S13,0x242070DB);b=FF(b,c,d,a,x[k+3],S14,0xC1BDCEEE);a=FF(a,b,c,d,x[k+4],S11,0xF57C0FAF);d=FF(d,a,b,c,x[k+5],S12,0x4787C62A);c=FF(c,d,a,b,x[k+6],S13,0xA8304613);b=FF(b,c,d,a,x[k+7],S14,0xFD469501);a=FF(a,b,c,d,x[k+8],S11,0x698098D8);d=FF(d,a,b,c,x[k+9],S12,0x8B44F7AF);c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);a=FF(a,b,c,d,x[k+12],S11,0x6B901122);d=FF(d,a,b,c,x[k+13],S12,0xFD987193);c=FF(c,d,a,b,x[k+14],S13,0xA679438E);b=FF(b,c,d,a,x[k+15],S14,0x49B40821);a=GG(a,b,c,d,x[k+1],S21,0xF61E2562);d=GG(d,a,b,c,x[k+6],S22,0xC040B340);c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);b=GG(b,c,d,a,x[k+0],S24,0xE9B6C7AA);a=GG(a,b,c,d,x[k+5],S21,0xD62F105D);d=GG(d,a,b,c,x[k+10],S22,0x2441453);c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);b=GG(b,c,d,a,x[k+4],S24,0xE7D3FBC8);a=GG(a,b,c,d,x[k+9],S21,0x21E1CDE6);d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);c=GG(c,d,a,b,x[k+3],S23,0xF4D50D87);b=GG(b,c,d,a,x[k+8],S24,0x455A14ED);a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);d=GG(d,a,b,c,x[k+2],S22,0xFCEFA3F8);c=GG(c,d,a,b,x[k+7],S23,0x676F02D9);b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);a=HH(a,b,c,d,x[k+5],S31,0xFFFA3942);d=HH(d,a,b,c,x[k+8],S32,0x8771F681);c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);a=HH(a,b,c,d,x[k+1],S31,0xA4BEEA44);d=HH(d,a,b,c,x[k+4],S32,0x4BDECFA9);c=HH(c,d,a,b,x[k+7],S33,0xF6BB4B60);b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);d=HH(d,a,b,c,x[k+0],S32,0xEAA127FA);c=HH(c,d,a,b,x[k+3],S33,0xD4EF3085);b=HH(b,c,d,a,x[k+6],S34,0x4881D05);a=HH(a,b,c,d,x[k+9],S31,0xD9D4D039);d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);b=HH(b,c,d,a,x[k+2],S34,0xC4AC5665);a=II(a,b,c,d,x[k+0],S41,0xF4292244);d=II(d,a,b,c,x[k+7],S42,0x432AFF97);c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);b=II(b,c,d,a,x[k+5],S44,0xFC93A039);a=II(a,b,c,d,x[k+12],S41,0x655B59C3);d=II(d,a,b,c,x[k+3],S42,0x8F0CCC92);c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);b=II(b,c,d,a,x[k+1],S44,0x85845DD1);a=II(a,b,c,d,x[k+8],S41,0x6FA87E4F);d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);c=II(c,d,a,b,x[k+6],S43,0xA3014314);b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);a=II(a,b,c,d,x[k+4],S41,0xF7537E82);d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);c=II(c,d,a,b,x[k+2],S43,0x2AD7D2BB);b=II(b,c,d,a,x[k+9],S44,0xEB86D391);a=AddUnsigned(a,AA);b=AddUnsigned(b,BB);c=AddUnsigned(c,CC);d=AddUnsigned(d,DD)}var temp=WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);return temp.toLowerCase()}