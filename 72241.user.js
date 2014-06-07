// ==UserScript==
// @name           Ikariam Message Utilities
// @namespace      holyschmidt
// @description    A few nifty features added to help messaging within the game.
// @include        http://s*.ikariam.*/index.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://www.betawarriors.com/bin/gm/57377user.js
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @version        0.03
//
// @history        0.03 Updated for game domain changes.
// @history        0.02 Added "Answer All" button.
//
// ==/UserScript==

ScriptUpdater.check(72241, "0.03")

Messages = {
	init:function() 
	{
		// Add Style(s).
		GM_addStyle("\
			#BusyMask { \
				position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; \
			}\
		");

		// Create Listener(s).
		switch ($('body').attr('id'))
		{
		case 'diplomacyAdvisorAlly':
			Messages.save('ally', $("a[href*='allyId=']").attr('href').match(/allyId=[0-9]*/).join('').replace('allyId=',''));
		break;
		case 'diplomacyAdvisor':
			Messages.addButtons();
			Messages.listen();
		break;
		}
	},
	addButtons:function()
	{
		var ally = Messages.restore('ally', false);
		if (ally) {
			$('tr.text td.reply').each(function() {
				$('span:eq(0)', this).each(function() {
					if ($("a[title='Answer All']", this).size() == 0) {
						var url = $('a:get(0)', this).attr('href').replace(/receiverId=[0-9]*/, 'allyId=' + ally) + '&msgType=51';
						$(this).append('<a class="button" href="' + url + '" title="Answer All">Answer All</a>');
					}
				});
			});
		}
	},
	listen:function()
	{
		// Only attach a listener to the "next 10" link.
		if ($('#messages td.paginator a').size() == 4 || $('#messages td.paginator img')[0].src.match(/btn_max/))
		{
			$('#messages td.paginator a:last').each(function() {
				$(this).attr('title', 'Retrieve Messages');
				$(this).click(function() {
					Messages.get(this.href);
					return false;
				});
			});
		}
	},
	get:function(url)
	{
		// Add Mask, to prevent unwanted interaction.
		var busyBg = document.createElement('div');							
		busyBg.id = "BusyMask";
		busyBg.style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
		document.body.appendChild(busyBg);

		// Retrieve Message(s).
		IkaTools.getRemoteDocument(url, function(root) 
		{
			// Tack on each message to the end of the list.
			$('#messages tr.entry, #messages tr.text', root).each(function() {
				$('#messages td.paginator').parent().before(this);
			});
			$('#messages td.paginator').html($('#messages td.paginator', root).html());

			// Re-establish listener(s).
			Messages.listen();

			// Create "Answer All" buttons for those that are new.
			Messages.addButtons();

			// Remove Mask.
			document.body.removeChild(document.getElementById('BusyMask'));
		});
	},
	save:function(key, value)
	{ 
		GM_setValue(getServerDomain() + '.' + getServerWorld() + key, value);
	},
	restore:function(key, def)
	{
		return GM_getValue(getServerDomain() + '.' + getServerWorld() + key, def);
	}
}

Messages.init(); 
