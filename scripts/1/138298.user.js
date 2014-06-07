// ==UserScript==
// @id             ImageShack_Cheater
// @name           ImageShack Cheater
// @version        1.1
// @namespace      ischeat
// @author         Gabriel Nahmias
// @description    After you upload, gives you a link to your image and removes the elements ImageShack places in your way to try and make you join their site.
// @include        http://imageshack.us/*
// @include        http://imageshack.us/*
// @include        http://*.imageshack.us/*
// @run-at         document-start
// ==/UserScript==

// ImageShack is using jQuery UI, so let's take advantage of this.

//$("<div title=""");

function remove(iTime) {
	
	setTimeout('$(".ui-dialog-content").dialog("close");' +
			   '$("head").append("<link href=\'http://code.jquery.com/ui/1.7.3/themes/ui-lightness/jquery-ui.css\' rel=\'stylesheet\' type=\'text/css\'");' +
			   '$("<div title=\'Crap Removed\'>' + 
					'<label for=\'imagelink\' style=\'font-weight: bold;\'>Here is a link to your image:</label>' +
					'<br /><br /><a id=\'imagelink\' href=\'" + $("div.listbox:eq(1) input").val() + "\' target=\'_blank\'>" + $("div.listbox:eq(1) input").val() + "' +
					'<br /><br /><img src=\'" + $("div.listbox:eq(1) input").val() + "\' style=\'max-height: 200px; max-width: 260px;\' /></a>' +
				  '</div>").dialog({height:260});' +
			   '', iTime);
	
}

// Pretty stupid way of making sure no matter when (virtually) the thing loads to remove it.

for (var i = 3000; i <= 21000; i += 2000)
	remove(i);