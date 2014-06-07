// ==UserScript==
// @name        Hiszilla PimpMyIcon
// @namespace   hiszilla
// @description Färbt das Hiszilla Icon je nach Zuordnung des Tickets
// @include     https://hiszilla.his.de/hiszilla/show_bug.cgi?*
// @resource	zust	http://malte-kastner.de/icon/favicon_zust.ico
// @resource	zust_ok	http://malte-kastner.de/icon/favicon_zust_ok.ico
// @resource	zust_cancel	http://malte-kastner.de/icon/favicon_zust_cancel.ico
// @resource	default_ok	http://malte-kastner.de/icon/favicon_default_ok.ico
// @resource	default_cancel	http://malte-kastner.de/icon/favicon_default_cancel.ico
// @resource	cc	http://malte-kastner.de/icon/favicon_cc.ico
// @resource	cc_ok	http://malte-kastner.de/icon/favicon_cc_ok.ico
// @resource	cc_cancel	http://malte-kastner.de/icon/favicon_cc_cancel.ico
// @version     1.1
// ==/UserScript==
var $ = unsafeWindow.jQuery;
docContent = $(document.body).html();
emailPattern = /email1=(.*?)%40/;
email = docContent.match(emailPattern);
email = email[1];
//alert(email);
var newIcon = 'default';

// Zuständig?
var zustPattern = new RegExp('bz_assignee_edit_container[^>]*>[\\s\\S]*?<span><span class\=\"vcard\"><a class\=\"email\" href\=\"mailto\:' + email,"g");
var ccPattern = /<td>[^<]+Benutzer[\s\S]*?einschließlich[\s\S]*?Ihnen/g;
if(docContent.match(zustPattern)){
	newIcon = 'zust';
}
// CC?
else if(docContent.match(ccPattern)){
	newIcon = 'cc';
}

// Ticket erledigt?
var ticketOkPattern = /<td>ERLEDIGT/g;
var ticketCanacelPattern = /<td>GESCHLOSSEN/g;
if(docContent.match(ticketOkPattern)){
	newIcon += '_ok';
}
// Ticket geschlossen?
else if(docContent.match(ticketCanacelPattern)){
	newIcon += '_cancel';
} 

// Icon setzen
if(newIcon != 'default'){
	//alert(newIcon);
	$('link[href="images/favicon.ico"]').remove();
	//iconURL = GM_getResourceURL(newIcon);

	var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'http://malte-kastner.de/icon/favicon_'+newIcon+'.ico';
//'decodeURIComponent(GM_getResourceURL(newIcon));
    document.getElementsByTagName('head')[0].appendChild(link);


	//alert(iconURL);
	//$('head').append('<link href="'+iconURL+'" rel="shortcut icon">'); 

}


// Title anpassen
var curTitle = $('head title').html();
var ticketType = '#';
var keys = new Array("2011", "2012", "2013", "ES", "hispro", "hochschule", "PA", "SAF", "security", "Task", "tracking", "Zertifizierung");
var shorterKeys = new Array("'11", "'12", "'13", "ES", "hp", "hs", "PA", "SAF", "se", "Ta", "tr", "Ze");


for (var i = 0; i < keys.length; i++) {
	//ticketType = $('#keywords').html().match(/\w*/);
	//alert($('#keywords').html() + " - " + ticketType);
	if($('#keywords').val().contains(keys[i])){
		ticketType = shorterKeys[i] + " ";
		break;
	}
}


var noOfficialKeys = new Array("AH", "Bug");
for (var i = 0; i < noOfficialKeys.length; i++) {
	var curKey = noOfficialKeys[i];
	if(curTitle.contains(" " + curKey + ":")){
		ticketType = curKey.toLowerCase() + " ";
	}
}

$('head title').html(curTitle.replace(/^Anfrage /g, ticketType));