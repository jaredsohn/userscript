// ==UserScript==
// @name           Empire Board Update Manager
// @namespace      holyschmidt
// @include        http://s*.ikariam.*/*
// @require        http://www.betawarriors.com/bin/gm/jquerymin.js
// @require        http://www.betawarriors.com/bin/gm/jquery.idle-timer.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://www.betawarriors.com/bin/gm/62718user.js 
// @require        http://userscripts.org/scripts/source/60774.user.js
// @exclude        http://board.ikariam.*/
// @version        0.09
//
// @history        0.09 Force update buttons created.  Also can "pause" auto-refresh through any of these links.
// @history        0.08 Added 30 second + 60 second delay options.
// @history        0.07 Fix for city selection issue. Smarter about when city selection changes are made.
// @history        0.06 Adding settings window, and ability to adjust navigation delay.
// @history        0.05 Updated script to change city selection appropriately before navigating to next desired link.
// @history        0.04 Integrated script as a formal add-on to the Empire Board, using ARexx API.
// @history        0.03 Added support for additional pages.
// @history        0.02 Added timeout feature.
//
// ==/UserScript==

ScriptUpdater.check(75377, "0.09");

Config.scriptName = "Empire Board Update Manager";
Config.tabs = {
	"General":{
		html:'<p>Empire Board Update Manager configuration settings.</p>',
		fields:{
			navigationDelay:{
				type:'select',
				label:'Navigation Delay',
				options:{ "1s":1, "2s":2, "3s":3, "5s":5, "10s":10, "30s":30, "60s":60, },
				text:'how long until visiting next link?',
				value:5,
			},
		}
	},
};
Config.Data = {
	get:function(key, def)
	{
		return GM_getValue(document.domain + '.' + key, def);
	},
	set:function(key, val)
	{
		GM_setValue(document.domain + '.' + key, val);
	},
};

// Add-on designed as EmpireBoard child object registered with ARexx 
EmpireBoard.UpdateManagerAddon =
{
	// Require for ARexx 
	_Parent:                                null,
	EmpireBoardRequiredVersion:             180,
	AddOnName:                              'Empire Board Update Manager',
	
	// Addon optional metas for ARexx 
	Version:                                '0.09',
	HomePage:                               'http://userscripts.org/scripts/show/75377',
	ScriptURL:                              'http://userscripts.org/scripts/show/75377',
	UserScriptsID:                          75377
};

// Constructor method require for ARexx
// May return true  or false (if failed)
EmpireBoard.UpdateManagerAddon.Init = function()
{
	// Create options link.
	IkaTools.addOptionsLink(Config.scriptName);

	// Add custom styling.
	GM_addStyle(
		'#EmpireBoard .Table { position:relative; } ' +
		'#EmpireBoard .Table img.updateImage { position:absolute; top:7px; left:7px; height:15px; width:15px; cursor:pointer; } '
	);

	// Add update button(s).
	EmpireBoard.UpdateManagerAddon.AddImages();

	setTimeout(EmpireBoard.UpdateManagerAddon.Update, Math.random() * 1000 + Config.get('navigationDelay') * 500);
	setTimeout(EmpireBoard.UpdateManagerAddon.Go, Math.random() * 1000 + Config.get('navigationDelay') * 1000);
	return true;
};

EmpireBoard.UpdateManagerAddon.AddImages = function()
{
	$('#EmpireBoard div.Table').each(function() {
		var tableId = $(this).attr('id');
		var tableImage = '';
		switch (tableId) {
			case 'EmpireBoardBuildings':
			case 'EmpireBoardResources':
			case 'EmpireBoardArmy':	
				tableImage = Config.Data.get('UpdateEmpireTable', '') == tableId
					? EmpireBoard.UpdateManagerAddon.Images.play
					: EmpireBoard.UpdateManagerAddon.Images.refresh;
			break;
		}
		if (tableImage != '') {
			$('th.city_name', this).append('<img class="updateImage" src="' + tableImage + '"/>');
		}
	});

	$('img.updateImage')
	.bind('click', function() {
		var tableId = $(this).parents('div.Table').attr('id');
		EmpireBoard.UpdateManagerAddon.ToggleUpdate(tableId);
	})
	.bind('dblclick', function() {
		Config.Data.set('UpdateEmpireTable', '');
		Config.Data.set('UpdateEmpireTableLink', -1);
		$('#EmpireBoard img.updateImage').each(function() {
			$(this).attr('src', EmpireBoard.UpdateManagerAddon.Images.refresh);
		});
	});
}

// Manager update function.
EmpireBoard.UpdateManagerAddon.Go = function()
{
	var attn = $('#EmpireBoard div.Table sup.Red')[0]; 
	if (attn != null && attn.innerHTML == '!')
	{
		var linkObj = $(attn).prev()[0];
		if (linkObj != null)
		{
			// If a table is set for force-update, make sure the play button is active.
			if (Config.Data.get('UpdateEmpireTable', '') != '')
			{
				// Make sure the client wants to navigate away.
				var table = $(linkObj).parents('div.Table').attr('id');
				if ($('#' + table + ' img.updateImage').attr('src') != EmpireBoard.UpdateManagerAddon.Images.play)
				{
					return;
				}
			}

			var onclickObj = $(linkObj).parent().html().match(/var s = document.getElementById\('citySelect'\); .+s.form.submit\(\);/);
			if (onclickObj != null)
			{ 	
				// This (should) be the link to simply change the selected town.  The onlick attribute 
				// contains the necessary javascript to do this.
				Evaluate.go(onclickObj.join(''));
			}
			else if (linkObj.href != null)
			{
				// If the current city selection does not match the link requested, do some magic to
				// fix that.
				if ($(linkObj).parents('tr').attr('class') != 'current')
				{ 
					// Update the id of the target, so we can find it below.
					$(linkObj).attr('id', 'UpdateManagerNextLink');

					// The "click" event can only be initiated from within the scope of the page itself, not within
					// a GreaseMonkey script.  There might be a better way to do this.  Suggestions are welcome.
					Evaluate.go('\
						var obj = document.getElementById("UpdateManagerNextLink");\
						if (obj != null)\
						{\
							if (document.createEvent)\
							{\
								var evObj = document.createEvent("MouseEvents");\
								evObj.initEvent("click", true, false);\
								obj.dispatchEvent(evObj);\
							}\
							else\
							if (document.createEventObject)\
							{\
								obj.fireEvent("onclick");\
							}\
						}'
					);
				}

				// Update last page visited and manually goto url.
				document.location = linkObj.href;
			}
		}
	}
};

EmpireBoard.UpdateManagerAddon.Update = function()
{
	var table = Config.Data.get('UpdateEmpireTable', '');
	if (table != '')
	{
		if ($('#' + table + ' img.updateImage').attr('src') == EmpireBoard.UpdateManagerAddon.Images.play)
		{
			var nextLink = Config.Data.get('UpdateEmpireTableLink', -1);
			if (nextLink != -1)
			{
				while(nextLink < $('#EmpireBoard #' + table + ' a').size() 
					&& !EmpireBoard.UpdateManagerAddon.LinkSupported($('#EmpireBoard #' + table + ' a:eq(' + nextLink + ')')))
				{
					nextLink = nextLink + 1;
				}

				if (nextLink < $('#EmpireBoard #' + table + ' a').size())
				{
					// Setup next link.
					Config.Data.set('UpdateEmpireTableLink', nextLink + 1);

					// Add attention link to appropriate link.
					$('#EmpireBoard #' + table + ' a:eq(' + nextLink + ')').after(
						'<sup class=Red title="Require attention">!</sup>'
					);

					// Fire off event to handle link update.
					setTimeout(EmpireBoard.UpdateManagerAddon.Go, Math.random() * 1000);
				}
				else
				{
					// Links done.
					Config.Data.set('UpdateEmpireTable', '');
					Config.Data.set('UpdateEmpireTableLink', -1);
					$('#EmpireBoard img.updateImage').attr('src', EmpireBoard.UpdateManagerAddon.Images.refresh);
				}
			}
		}
	}
};

EmpireBoard.UpdateManagerAddon.LinkSupported = function(linkObj)
{
	if (linkObj != null)
	{
		var url = $(linkObj).attr('href');
		if (url.match(/index.php?cityId=/) || url.match(/view=transport/) || url.match(/view=deployment/) || url.match(/view=worldmap_iso/))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	return false;
}

EmpireBoard.UpdateManagerAddon.ToggleUpdate = function(tableId)
{
	if (Config.Data.get('UpdateEmpireTable', '') == tableId && Config.Data.get('UpdateEmpireTableLink', -1) >= 0)
	{
		// Is it currently paused?
		var imageSrc = $('#' + tableId + ' img.updateImage').attr('src');
		if (imageSrc == EmpireBoard.UpdateManagerAddon.Images.refresh || imageSrc == EmpireBoard.UpdateManagerAddon.Images.play)
		{
			// Refresh --> Pause
			$('#' + tableId + ' img.updateImage').attr('src', EmpireBoard.UpdateManagerAddon.Images.pause);
		}
		else
		if (imageSrc == EmpireBoard.UpdateManagerAddon.Images.pause)
		{
			// Pause --> Play
			$('#' + tableId + ' img.updateImage').attr('src', EmpireBoard.UpdateManagerAddon.Images.play);

			// Fire off event.
			EmpireBoard.UpdateManagerAddon.Update();
		}
	}
	else
	{
		// Update the refresh button(s).
		$('#EmpireBoard img.updateImage').attr('src', EmpireBoard.UpdateManagerAddon.Images.refresh);
		$('#' + tableId + ' img.updateImage').attr('src', EmpireBoard.UpdateManagerAddon.Images.pause);

		// Initiate refresh by setting up first link index.
		Config.Data.set('UpdateEmpireTable', tableId);
		Config.Data.set('UpdateEmpireTableLink', 0);
	}
};

EmpireBoard.UpdateManagerAddon.Images = {
	"play" : 'data:image/png;base64,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',
	"pause" : 'data:image/png;base64,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',
	"refresh" : 'data:image/png;base64,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',
};

// Evaluator used to initiate javascript from within the scope of the page itself.
Evaluate = {
	go:function(source) {
		// Check for function input.
		if ('function' == typeof source) {
			// Execute this function with no arguments, by adding parentheses.
			// One set around the function, required for valid syntax, and a
			// second empty set calls the surrounded function.
			source = '(' + source + ')();'
		}

		// Create a script node holding this  source code.
		var script = document.createElement('script');
		script.setAttribute("type", "application/javascript");
		script.textContent = source;

		// Insert the script node into the page, so it will run, and immediately
		// remove it to clean up.
		document.body.appendChild(script);
		document.body.removeChild(script);
	}
};

// Register with the Empire Board.
EmpireBoard.ARexx.RegisterAddOn(EmpireBoard.UpdateManagerAddon);


