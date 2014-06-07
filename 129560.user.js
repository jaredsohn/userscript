// ==UserScript==
// @name           btGigs-SSL
// @namespace      by Upgreydd
// @description    wybor miedzy SSL a zwyklymi linkami w browse.php
// @include        http://btgigs.info/browse.php*
// @include        https://btgigs.info/browse.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==

if(GM_getValue('SSL')) {
	labelSSL = 'Wyłącz';
} else {
	labelSSL = 'Włącz';
}

if(GM_getValue('WL')) {
	labelWL = 'Wyłącz';
} else {
	labelWL = 'Włącz';
}

GM_registerMenuCommand( labelSSL+' ikony SSL', SetSSL);
GM_registerMenuCommand( labelWL+' ikony WishList', SetWL);

function SetSSL() {
	if(GM_getValue('SSL')) {
		GM_setValue('SSL',false);
	} else {
		GM_setValue('SSL',true);
	}
	location.reload();
}

function SetWL() {
	if(GM_getValue('WL')) {
		GM_setValue('WL',false);
	} else {
		GM_setValue('WL',true);
	}
	location.reload();
}

unsafeWindow.WLurl = function(id,name) {
	var dataString = 'id='+id+'&bookmark=1';  
    $.ajax({  
      type: "GET",  
      url: "details.php",  
      data: dataString,  
      success: function() {  
		alert('Dodano:  '+name);
      }  
    });  
    return false;  
}

if(GM_getValue('SSL',false)){
	$('a.index').each(function() {
		var url = $(this).attr('href');
		var sslurl = url.replace('download','download_ssl');
		$(this).parent().append("&nbsp;<a href="+sslurl+" align=\"center\" title=\"Szybko pobierz torrenta SSL\"><img align=\"middle\" border=\"0\" alt=\"Szybko pobierz torrenta SSL\" src=\"https://btgigs.info/pic/ssl.gif\" /></a>");
	});
}

if(GM_getValue('WL',false)){
	$('a.index').each(function() {
		var wurl = $(this).parent().parent().children(':nth-child(2)').children(':first-child').attr('href');
		wurl = wurl.replace('details.php?id=','');
		var name = $(this).parent().parent().children(':nth-child(2)').children(':first-child').html();
		name = name.replace('<b>','');
		name = name.replace('</b>','');
		$(this).parent().append('&nbsp;<a title="Dodaj do zakładek: '+name+'" href="javascript:WLurl(\''+wurl+'\',\''+name+'\');void(0)"><img align=\"middle\" border=\"0\" alt=\"Dodaj do zakładek\" src=\"http://btgigs.info/pic/bookmark.png\" /></a>');
	});
	
}
