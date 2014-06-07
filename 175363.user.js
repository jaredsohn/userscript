// ==UserScript==
// @name        one2xs
// @namespace   vandenberge.one2xs
// @description One2xs Script
// @include     http://www.one2xs.com/*
// @include     http://one2xs.com/*
// @require     http://www.one2xs.com/includes/jquery.js
// @require     http://www.one2xs.com/includes/jquery-ui.js
// @require     http://www.one2xs.com/includes/one2xs-js-undep.js
// @resource    jQueryUICSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.20/themes/ui-lightness/jquery-ui.css
// @version     2
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant	GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// ==/UserScript==

String.prototype.replaceAll = function(find, replace) {
	var str = this;
	return str.replace(new RegExp(find, 'g'), replace);
};

function log(message)
{
	GM_log("one2xs 2.0 (v2): " + message);
}

function getSetting(key)
{
	return GM_getValue("setting_" + key, null);
}

function setSetting(key, value)
{
	GM_setValue("setting_" + key, value);
}

function setDefaultSettings()
{
	setSetting("showTenLast", true);
	setSetting("showAdvs", false);
	setSetting("showCookieMessage", false);
	setSetting("changeLogo", true);
}

function saveSettings()
{
	log("Saving settings...");

	last10 = $('#one2xs20-settings-10last').val();
	adv = $('#one2xs20-settings-adv').val();
	cookie = $('#one2xs20-settings-cookie').val();
	logo = $('#one2xs20-settings-logo').val();

	setSetting("showTenLast", last10 == "1" ? true : false);
	setSetting("showAdvs", adv == "1" ? true : false);
	setSetting("showCookieMessage", cookie == "1" ? true : false);
	setSetting("changeLogo", logo == "1" ? true : false);

	window.location.reload();
}

function showSettings()
{
	settingshtml = '<b>Instellingen</b><br>' +
			'<br>Ik wil de 10 laatste topics waar ik gereageerd in heb op iedere pagina zien:<br>' +
			'<select id="one2xs20-settings-10last"><option value="0">Nee</option><option value="1"' + (getSetting("showTenLast") == true ? ' selected' : '') + '>Ja</option></select> (<a href="#" id="one2xs20-settings-resetLastTenDimensions">Reset dimensies</a>)<br>' +
			'<br>Ik wil meldingen over mijn advertentietegoed zien:<br>' +
			'<select id="one2xs20-settings-adv"><option value="0">Nee</option><option value="1"' + (getSetting("showAdvs") == true ? ' selected' : '') + '>Ja</option></select><br>' +
			'<br>Ik wil de cookiemelding zien:<br>' +
			'<select id="one2xs20-settings-cookie"><option value="0">Nee</option><option value="1"' + (getSetting("showCookieMessage") == true ? ' selected' : '') + '>Ja</option></select>' +
			'<br>' +
			'<br>Vervang het logo in de header door het one2xs 2.0 logo:<br>' +
			'<select id="one2xs20-settings-logo"><option value="0">Nee</option><option value="1"' + (getSetting("changeLogo") == true ? ' selected' : '') + '>Ja</option></select>' +
			'<br><br>' +
			'<input type="button" value="Opslaan" id="one2xs20-settings-save">';

	setoverlaytext(settingshtml);

	$('#one2xs20-settings-resetLastTenDimensions').click(function()
	{
		resetLastTenDimensions();
	});

	$('#one2xs20-settings-save').click(function()
	{
		saveSettings();
	});
}

function removeQuicklink(name)
{
	if (confirm("Ben je zeker dat je '" + name + "' wilt verwijderen?"))
	{
		setSetting("quicklink_" + name, false);
		
		window.location.reload();
	}
}

function goToQuicklink(name)
{
	URL = getSetting("quicklink_" + name);
	
	$('body').fadeOut('fast', function()
	{
		window.location = URL;
	});
}

function showQuicklinkAddScreen()
{
	loc = unsafeWindow.location.toString().replace("#", "");
	
	setoverlaytext('<b>Voeg quicklink toe</b><br>Deze quicklink verwijst naar: ' + loc + '<br><br>Naam: <input type="text" id="one2xs20-quicklinks-add-name"><br><br><input type="button" value="Voeg toe" id="one2xs20-quicklinks-add-btn">');

	$('#one2xs20-quicklinks-add-btn').click(function()
	{
		name = $('#one2xs20-quicklinks-add-name').val();

		addQuicklink(name, loc);
	});
}

function addQuicklink(name, URL)
{
	setSetting("quicklink_" + name, URL);

	window.location.reload();
}

function resetLastTenDimensions()
{
	log("RESETTING COORDS");

	setSetting("last10_X", false);
	setSetting("last10_Y", false);
	setSetting("last10_W", false);
	setSetting("last10_H", false);

	window.location.reload();
}

function bigMessage(title, msg)
{
	document.title = title;

	GM_addStyle("#container { background: none; } body { background: url('http://one2xs.com/img/bg.gif') repeat-x scroll 0% 0% #D5D5D5; } #footer, #footer-forum { display: none; }");

	$('#container').html("<div style='padding:10px'>" + msg + "</div>");
}

$(document).ready(function()
{
	var newCSS = GM_getResourceText("jQueryUICSS");
	GM_addStyle(newCSS);

	log("Checking...");

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://raoul.s2.one2xs.com/one2xs20/stop.txt",
		onload: function(response) {
			if (response.responseText.trim() == "1")
			{
				bigMessage("one2xs 2.0", "one2xs 2.0 werd gestopt, schakel one2xs 2.0 uit vanuit het Greasemonkey controlepaneel.");
			}
			else
			{
				checkForWelcome();
			}
		},
		onerror: function(response) {

		}
	});
});

function checkForWelcome()
{
	if (GM_getValue("welcomeMessage", false) == false)
	{
		log("Showing welcome message");

		setDefaultSettings();

		bigMessage('Welkom bij one2xs.com', '<b>Welkom!</b><br><br>one2xs 2.0 is succesvol geinstalleerd.<br><br>Veel plezier!<br><br><a href="http://one2xs.com">Ga naar One2xs</a>');

		GM_setValue("welcomeMessage", true);
	}
	else
	{
		init();
	}
}

function init()
{
	log("Started!");

	// Reset logo

	if (getSetting("changeLogo") == true)
	{
		$('#logo').css('background-image', 'url(http://raoul.s2.one2xs.com/one2xs20/20logo.png)');
	}

	// Disable nieuwe adv

	if (getSetting("showAdvs") == false)
	{
		log("Removing ads info");

		if ($('.nieuweadvs').html() != null)
		{
			$.get('/?advtegoed=del', function(dat)
			{
				$('.nieuweadvs').remove();
			});
		}
	}

	// Disable cookie melding

	if (getSetting("showCookieMessage") == false)
	{
		log("Removing cookie message");

		if ($('#top_info_tekst').html() != null)
		{
			if ($('#top_info_tekst').html().indexOf('cookies') != -1)
			{
				GM_log("Disabling cookie melding");

				okURL = $('#top_info_tekst').find('a')[1];

				$.get(okURL, function(dat)
				{
					$('#top_info').remove();
				});
			}
		}
	}

	// Add style for sidebar

	GM_addStyle("#one2xs20_sidebar { position: fixed; margin-left: -360px; margin-top: 68px; width: 310px; }");

	$('#logo').append('<div id="one2xs20_sidebar"></div>');

	// Add laatste 10 topics

	if (getSetting("showTenLast") == true)
	{
		radius = '-webkit-border-bottom-right-radius: 3px; -webkit-border-bottom-left-radius: 5px; -moz-border-radius-bottomright: 3px; -moz-border-radius-bottomleft: 5px; border-bottom-right-radius: 3px; border-bottom-left-radius: 5px;';

		GM_addStyle("#one2xs20_last10 a { padding: 0; display: inline; } #one2xs20_last10 table { width: 50%; }");
		GM_addStyle("#one2xs20_last10 #drag { cursor: move; height: 27px; overflow: hidden; background: url(http://raoul.s2.one2xs.com/one2xs20/orangepattern.png) repeat-x; padding: 5px; color: #FFF; font-weight:bold; " + radius + " }");
		GM_addStyle("#one2xs20_last10_progressbar { width: 0%; background: #E79B0B; height: 6px; }");

		$('#logo').append('<div style="position: fixed; overflow: hidden; background: #FFF; margin-left: -360px; margin-top: 68px; border: 1px solid #E79B0B; width: 310px;" id="one2xs20_last10"><div id="drag">Laatste 10 topics waarop je gereageerd hebt</div><div id="one2xs20_last10_progressbar"></div><div style="padding:5px"><div id="one2xs20_last10_urls"></div></div></div>');

		if (getSetting("last10_X") != null && getSetting("last10_X") != false)
		{
			$('#one2xs20_last10').css('left', getSetting("last10_X"));
		}

		if (getSetting("last10_Y") != null && getSetting("last10_Y") != false)
		{
			$('#one2xs20_last10').css('top', getSetting("last10_Y"));
		}

		if (getSetting("last10_W") != null && getSetting("last10_W") != false)
		{
			$('#one2xs20_last10').css('width', getSetting("last10_W"));
		}

		if (getSetting("last10_H") != null && getSetting("last10_H") != false)
		{
			$('#one2xs20_last10').css('height', getSetting("last10_H"));
		}

		$('#one2xs20_last10').draggable({
			handle: "#drag",
			stop: function()
			{
				log($(this).css('left') + ', ' + $(this).css('top'));

				setSetting("last10_X", $(this).css('left'));
				setSetting("last10_Y", $(this).css('top'));
			}
		});

		$('#one2xs20_last10').resizable({
			minWidth: 307,
			stop: function()
			{
				setSetting("last10_W", $(this).css('width'));
				setSetting("last10_H", $(this).css('height'));
			}
		});

		$('.ui-resizable-se').css('background-image', 'url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.20/themes/ui-lightness/images/ui-icons_222222_256x240.png)');

		if (GM_getValue("cacheLast10", false) != false)
		{
			$("#one2xs20_last10_urls").html(GM_getValue("cacheLast10"));
		}

		getLast10 = function()
		{
			$.get('/', function(dat)
			{
				$("#one2xs20_last10_urls").html("");

				// Loop trough nodes
				nodes = $(dat).find("ul#arrangableNodes");

				found = false;

				$(nodes).find("li").each(function(i, ele)
				{
					found = true;

					eleHTML = $(ele).html();

					if (eleHTML.substring(0, 52) == "<h1>Laatste 10 topics waarin je gereageerd hebt</h1>")
					{
						parsed = eleHTML.replaceAll("<h1>Laatste 10 topics waarin je gereageerd hebt</h1>", "").replaceAll('forum/', 'http://one2xs.com/forum/').replaceAll('<tbody>', '').replaceAll('</tbody>', '');

						GM_setValue("cacheLast10", parsed);

						$("#one2xs20_last10_urls").html(parsed);

						$("#one2xs20_last10_urls").delay(200).fadeIn('fast');

						$("#one2xs20_last10_progressbar").animate({
							width: '100%'
						}, 14000, function() {
							$("#one2xs20_last10_urls").fadeOut('fast');
							$("#one2xs20_last10_progressbar").animate({
								width: '0%'
							}, 500);
						});
					}
				});

				if (found == false)
				{
					$("#one2xs20_last10").remove();
				}
			});
		};

		getLast10();

		setInterval(getLast10, 15000);
	}

	// Remove google search

	$('#top-bar #zoek').remove();

	// Init menu

	$("#top-bar ul li").each(function(i, domEle)
	{
		aEle = $($(domEle).find("a"));
		title = aEle.html();

		if (title == "Info" || title == "Linkpartners" || title == "Verdienen" || title == "Adverteren")
		{
			domEle.remove();
		}
	});

	$('#top-bar ul').append('<li id="one2xs20-settings"><a title="2.0 Instellingen" href="#">2.0 Instellingen</a></li>');

	$('li#one2xs20-settings').click(function()
	{
		showSettings();
	});

	// Add fastlinks

	GM_addStyle("#one2xs20-menu-quicklinks { width: 160px; text-align: right; } #one2xs20-menu-quicklinks-input { margin-top: 10px; }");

	$("#top-bar ul").css("width", "100%");
	$('#top-bar ul').append('<li style="float:right; background: none;" id="one2xs20-menu-quicklinks-add"><a href="#">+</a></li>');
	$('#top-bar ul').append('<li style="float:right" id="one2xs20-menu-quicklinks-delete"><a href="#">-</a></li>');
	$('#top-bar ul').append('<li style="float:right" id="one2xs20-menu-quicklinks-go"><a href="#">GO</a></li>');
	$('#top-bar ul').append('<li style="float:right; overflow: hidden;" id="one2xs20-menu-quicklinks"><select id="one2xs20-menu-quicklinks-input"></select></li>');

	var vals = [];
	hasQuicklink = false;
	for each (var val in GM_listValues()) {
		vals.push(GM_getValue(val));
		
		name = val;
		value = GM_getValue(val);
		
		// setting_quicklink_<NAME>
		
		if (name.substring(0,18) == "setting_quicklink_" && value != null && value != false)
		{
			hasQuicklink = true;
			$('#one2xs20-menu-quicklinks-input').append('<option value="'+name.substring(18)+'">' + name.substring(18) + '</option>');
		}
	}
	
	if (hasQuicklink == false)
	{
		$('#one2xs20-menu-quicklinks-go').remove();
		$('#one2xs20-menu-quicklinks').remove();
		$('#one2xs20-menu-quicklinks-delete').remove();
	}

	$('#one2xs20-menu-quicklinks-go').click(function()
	{
		goToQuicklink($('#one2xs20-menu-quicklinks-input').val());
	});
	
	$('#one2xs20-menu-quicklinks-delete').click(function()
	{
		removeQuicklink($('#one2xs20-menu-quicklinks-input').val());
	});

	$('#one2xs20-menu-quicklinks-add').click(function()
	{
		showQuicklinkAddScreen();
	});

	log("Done!");
}

$(window).blur(function()
{
	log("Blur detected");

	unsafeWindow.topicwindowfocus = true;
	unsafeWindow.windowfocus = true;
	unsafeWindow.ignoreFocus = true;
});