// ==UserScript==
// @name           NZBs.org SAB Local Only
// @namespace      nzbsSabLocal
// @description    NZBs.org sab integration for localhost installs
// @include        http://*nzbs.org/*
// ==/UserScript==

///////////////////////////// Settings ////////////////////////////

		var sabHost = 'INSERT SAB INSTALLATION IP HERE';
		var sabApiKey  = 'INSTALL SAB API KEY HERE';
		var nzbsApiKey = 'INSERT NZB API KEY HERE';

///////////////////////////////////////////////////////////////////

$ = unsafeWindow.$;
$('.icon_sab').unbind();

//$('.icon_sab').click(function(e){$(this).unbind('.icon_sab')});

$('.icon_sab').click(function(e){
		var button = $(this);
		if (button.hasClass('icon_sab_clicked')) return false;
		if (button.hasClass('clicked-pill')) return false;

		button.children().addClass('icon_clicked');
		button.fadeTo('fast', 0.5);

		var guid = button.parent().parent().attr('id').substring(4);
		var nzburl = sabHost + "/sabnzbd/api?mode=addurl&name=http://beta.nzbs.org/getnzb/" + guid + nzbsApiKey + "&apikey=" + sabApiKey;

		$.post(nzburl, function(resp){
			button.children().removeClass('icon_clicked').addClass('icon_complete');
			button.removeClass('icon_clicked').addClass('icon_complete').addClass('icon_sab_clicked');
			button.fadeTo('fast', 1).addClass('clicked-pill').attr('title','Added to my Sabnzbd');
		});
	});