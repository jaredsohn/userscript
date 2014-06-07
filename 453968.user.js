// ==UserScript==
// @name		SJ Fav (Serienjunkies Favoriten)
// @namespace	NoXPhasma
// @include		http://serienjunkies.org/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version		1.0.11
// @date		2014-04-08
// @description	Setze Favoriten zu deinen Lieblingsserien in einer dynamischen Favoritenliste.
// @icon		http://justpic.info/images3/3245/sjfav.png
// @grant       none
// ==/UserScript==

// ---------- Cookie Functions -----------------------------------------------------------------------------------------
//
function setCookie(name,value,days)
{
    if (days)
    {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function getCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) { setCookie(name,"",-1); }
//
// ---------- Cookie Functions -----------------------------------------------------------------------------------------

// ---------- Script --------------------------------------------------------------------------------------------------
//
var defbgimg	= 'http://justpic.info/images3/d631/sjfav_def.png';
var ownlogo		= 'http://justpic.info/images3/3245/sjfav.png';
var entries 	= getCookie('sl_list_entries');
var state		= getCookie('sl_list_state');
var obj			= eval('('+entries+')');
var url			= $(location).attr('href');
var urlsplit	= url.split('/');
var postop		= getCookie('sl_list_top');
var posleft		= getCookie('sl_list_left');
var drag		= getCookie('sl_drag');
var sorting		= getCookie('sl_sort');
var delfav		= getCookie('sl_del');
if (postop == undefined) {postop = '30';}
if (postop > 1000)  {postop = '30';}
if (posleft == undefined) {posleft = '30';}
if (drag == undefined) {drag = '1';}
if (sorting == undefined) {sorting = '1';}
if (delfav == undefined || delfav == '0') {var delfavclass = ''; delfav = '0';var remtitle = 'Favorit löschen';}
if (delfav == '1') {var delfavclass = ' remitemoff'; var remtitle = '';}
var bodywidth	= $('body').css('width');
if (posleft > window.innerWidth) { posleft = window.innerWidth-250; }

$(function()
{
	// ----- Add HTML -----
	//
	$('head').append('<style type="text/css">'
		+'#serienliste{font-family:sans-serif;padding:0px;position:fixed;top:'+postop+'px;left:'+posleft+'px;width:250px;z-index:10000}'
		+'#openclose,#sl_title,#add_item,.sl_entry{box-shadow:0px 0px 4px #000}'
		+'#openclose,#add_item{width:30px}'
		+'#openclose,#add_item,#sl_title{text-align:center;font-size:14px;height:20px;padding:4px 0 1px;text-shadow:1px 1px 0px #f0f0f0;background:-moz-linear-gradient(top,rgba(234,234,234,.9),rgba(204,204,204,.9));background:-webkit-linear-gradient(top,#eaeaea,#cccccc)}'
		+'#openclose:hover,#add_item:hover{background:-moz-linear-gradient(top,rgba(224,224,224,.9),rgba(192,192,192,.9));background:-webkit-linear-gradient(top,#e0e0e0,#c0c0c0)}'
		+'#openclose,.remitem{cursor:pointer}'
		+'#openclose,#sl_title{float:left}'
		+'#openclose{border-radius:5px 0 0 0}'
		+'#add_item{color:#aaa;border-radius:0 5px 0 0;float:right}'
		+'#sl_title{margin-left:5px;cursor:move;width:sl_title_width}'
		+'#sl_itemlist{width:250px;margin:0px;padding:0px;list-style-type:none}'
		+'#sl_itemlist .sl_entry{width:250px;border-radius:0 5px 5px 0;text-align:left;height:30px;margin-top:9px;background:rgba(0,0,0,.5)}'
		+'#sl_itemlist span{border-radius:0 0 3px 0;text-transform:capitalize;font-size:11px;padding:1px 3px;white-space:nowrap;color:#fff;background:rgba(0,0,0,.5);position:relative;top:-1px}'
		+'#sl_itemlist a{background-position:0px -1px;overflow:hidden;float:left;background-size:cover;display:block;width:240px;height:30px;}'
		+'#sl_itemlist a:hover{text-decoration:none}'
		+'#sl_itemlist .remitem{border-radius:0 5px 5px 0;float:right;width:10px;height:30px;background:rgba(255,0,51,.3)}'
		+'#sl_itemlist .remitem:hover{background:rgba(255,0,51,.7)}'
		+'#sl_itemlist .remitemoff{display:none !important;background:none !important}'
		+'#show_info{border-radius:0 0 0 5px;font-family:sans-serif;font-size:11px;color:#fff;width:250px;text-align:left;padding:5px;position:fixed;top:220px;right:-260px;background:rgba(0,0,0,.7);z-index:9999}'
		+'#homelink{cursor:pointer;width:30px;height:30px;background:#aaa url('+ownlogo+');background-size:cover;float:right}'
		+'#show_info ul{list-style-type:none;margin:0 0 0 6px;padding:0px;}'
		+'.triggeranleitung{font-weight:bold;margin:3px 0 0;font-weight:bold;cursor:pointer}'
		+'#addoninfo{margin:-5px 0 -25px -30px;color:#fff;font-size:20px;padding:5px 0 0 10px;height:25px;width:15px;cursor:pointer;background:rgba(0,0,0,.7);border-radius:15px 0 0 15px;}'
		+'#addoninfo:hover,#show_info span:hover,.triggeranleitung:hover{color:#ACCD8A}'
		+'.triggeranleitung span{position:relative;top:1px;font-weight:normal}'
		+'.sl_check{position:relative;top:3px}'
		+'#anleitung{padding:0 2px;line-height:13px;display:none;text-align:justify}'
		+'#anleitung div{margin:5px 0 5px -6px;padding:3px;border-radius:3px;background:rgba(255,255,255,.05)}'
	+'</style>');
	
	$('body').prepend('<div id="serienliste">'
		+'<div id="sl_head">'
			+'<div id="openclose" title="Liste ein/ausklappen">&Delta;</div>'
			+'<div id="sl_title">Favoriten</div>'
			+'<div id="add_item">+</div>'
			+'<div style="clear:both"></div>'
		+'</div>'
		+'<div id="sl_itemlist" style="display:'+state+'">'
		+'</div>'
	+'</div>');
	
	$('body').prepend('<div id="show_info">'
		+'<div id="homelink" title="Script Seite besuchen"></div>' 
		+'<div id="addoninfo" title="SJ Fav Optionen">?</div>'
		+'<ul>'
			+'<li><b>Optionen</b></li>'
			+'<li><input class="sl_check" id="check_drag" type="checkbox"> Bewegliche Favoritenliste</li>'
			+'<li><input class="sl_check" id="check_sort" type="checkbox"> Favoriten sortierung</li>'
			+'<li><input class="sl_check" id="check_width" type="checkbox"> Schmalere Leiste verwenden</li>'
			+'<li><input class="sl_check" id="check_delete" type="checkbox"> Löschen von Favoriten verhindern</li>'
			+'<li><input class="sl_check" id="check_reset" type="checkbox"> Position zurücksetzen</li>'
			+'<li class="triggeranleitung">Anleitung <span>&nabla;</span></li>'
			+'<li>'
				+'<div id="anleitung">'
					+'<div>Die Favoritenliste kann per Drag & Drop frei bewegt werden, dazu den Titel mit der Maus greifen.</div>'
					+'<div>Neue Favoriten können durch ein klick auf das <b>+</b> hinzugefügt werden, dies ist nur möglich wenn man sich gerade eine Serie anzeigen lässt.</div>'
					+'<div>Die einzelnen Favoriteneinträge können per Drag & Drop sortiert werden.</div>'
					+'<div>Um vorhandene Favoriten zu löschen, einfach den roten Bereich am rechten Rand des Favoriten anklicken.</div>'
					+'<div>Die Favoriten können mit einem klick auf das Dreieck Ein-/Ausgeblendet werden.</div>'
				+'</div>'
			+'</li>'
		+'</ul>'
	+'</div>');
	//
	// ----- Add HTML -----
	
	// ----- List Options -----
	//
	$('#show_info span,.triggeranleitung').click(function()
	{
		$('#anleitung').slideToggle('slow');
	});
	
	$(window).resize(function() {
		getposleft = $('#serienliste').css('left');
		if (getposleft > window.innerWidth)
		{
			newposleft = window.innerWidth-250;
			$('#serienliste').css('left',newposleft+'px');
		}
		if (posleft < $('body').css('width')) {
			$('#serienliste').css('left',posleft+'px');
		}
	});

	$('#check_drag').click(function()
	{
		if ($(this).is(':checked') == true)
		{
			$('#serienliste').draggable('option','disabled',false);
			setCookie('sl_drag','1',900);
			$('#sl_title').css('cursor','move');
		}
		else
		{
			$('#serienliste').draggable('option','disabled',true);
			setCookie('sl_drag','0',900);
			$('#sl_title').css('cursor','auto');
		}
	});
	
	if (sorting == 0) {
		$('#sl_itemlist').sortable('option','disabled',true);
	}
	if (sorting == 1) {
		$('#check_sort').attr('checked', true);
	}
	$('#check_sort').click(function()
	{
		if ($(this).is(':checked') == true)
		{
			$('#sl_itemlist').sortable('option','disabled',false);
			setCookie('sl_sort','1',900);
		}
		else
		{
			$('#sl_itemlist').sortable('option','disabled',true);
			setCookie('sl_sort','0',900);
		}
	});
	
	$('#check_width').click(function()
	{
		if ($(this).is(':checked') == true)
		{
			setCookie('sl_width','1',900);
			$('#serienliste,#sl_itemlist,.sl_entry').css('width','200px');
			$('#sl_itemlist a').css('width','190px');
			$('#sl_title').css('width','130px');
		}
		else
		{
			setCookie('sl_width','0',900);
			$('#serienliste,#sl_itemlist,.sl_entry').css('width','250px');
			$('#sl_itemlist a').css('width','240px');
			$('#sl_title').css('width','180px');
		}
	});

	if (delfav == 1) {
		$('#check_delete').attr('checked', true);
		$('#sl_itemlist .remitem').addClass('remitemoff');
	}
	
	$('#check_delete').click(function()
	{
		if ($(this).is(':checked') == true)
		{
			setCookie('sl_del','1',900);
			delfav = 1;
			$('#sl_itemlist .remitem').addClass('remitemoff');
			$('#sl_itemlist .remitem').attr('title','');
			delfavclass = ' remitemoff';
		}
		else
		{
			setCookie('sl_del','0',900);
			delfav = 0;
			$('#sl_itemlist .remitem').removeClass('remitemoff');
			$('#sl_itemlist .remitem').attr('title','Favorit löschen');
			delfavclass = '';
		}
	});
	
	$('#check_reset').click(function()
	{
		if ($(this).is(':checked') == true)
		{
			deleteCookie('sl_list_top');
			deleteCookie('sl_list_left');
			$('#serienliste').css({'top':'30px','left':'30px'});
			$($(this)).attr('checked', false);
		}
	});
	
	if ($('#sl_itemlist').css('display') == 'none') { $('#openclose').html('&nabla;'); }
	
	$('#openclose').click(function()
	{
		$('#sl_itemlist').slideToggle('slow', function ()
		{
			var getstate = $(this).css('display');
			if (getstate == 'none') { setCookie('sl_list_state','none',900); $('#openclose').html('&nabla;'); }
			else { setCookie('sl_list_state','block',900); $('#openclose').html('&Delta;'); }
		});
	});
	
	if (urlsplit[3] != '' && urlsplit[3].indexOf('?') == -1 && urlsplit[3] != 'search' && urlsplit[3] != 'die-neusten' && urlsplit[3] != 'hilfe')
	{
		$('#add_item').attr('title','Eintrag hinzufügen').css({'color':'#29303B','cursor':'pointer'});
	}
	
	$('#homelink').click(function() { window.open('http://userscripts.org/scripts/show/453968','_blank'); });
	
	$('.sl_check').focus(function() { this.blur();	});
	//
	// ----- List Options -----
	
	// ----- List Functions -----
	//
	function addtoList(entry)
	{
		if(entry != undefined)
		{
			var maxCount = entry.entries.length;
			for (var i = 0; i <= maxCount; i++)
			{
				if (entry.entries[i] == null) {}
				else if (i < maxCount)
				{
					if (entry.entries[i].img == undefined) { var bgimg = defbgimg; }
					else { var bgimg = entry.entries[i].img; }
					$('#sl_itemlist').append('<div class="sl_entry">'
						+'<a href="'+entry.entries[i].link+'" style="background-image:url('+bgimg+');background-position:0px -3px;">'
							+'<span class="sl_title">'+entry.entries[i].title+'</span>'
						+'</a>'
						+'<div class="remitem'+delfavclass+'" title="'+remtitle+'" id="'+i+'"></div>'
					+'</div>');
				}
			}
		}
		else
		{
			$('#sl_itemlist').append('<div class="sl_entry">'
				+'<a href="http://serienjunkies.org">'
					+'<span class="sl_title">Noch keine Favoriten vorhanden</span>'
				+'</a>'
			+'</div>');
		}
		checkWidth();
	}
	
	$('#add_item').click(function()
	{
		if (urlsplit[3] != '' && urlsplit[3].indexOf('?') == -1 && urlsplit[3] != 'search' && urlsplit[3] != 'die-neusten' && urlsplit[3] != 'hilfe')
		{
			var urlcount = urlsplit.length-2;
			var serientitel = urlsplit[urlcount]
			serientitel = serientitel.replace(/' - '/g,'');
			serientitel = serientitel.replace(/-/g,' ');
			serientitel = serientitel.replace(/season/g,'| season');
			serientitel = serientitel.replace(/staffel/g,'| staffel');
			
			killFormat = new Array('tv film','hdtv','720p','ituneshd','dvdrip','xvidhr','xvid','1080p','1080i','h264','bluray','blu ray','bd50','bd25','dvd5','dvdr','dvd9','pdtv',' dtv',' atv',' rip','satrip',' sat',' web',' dl',' complete','divx','x264',' avc','/','  ');
			$.each(killFormat, function(key, value) {
				serientitel = serientitel.replace(value,'');
			});

			var image	= $('.post-content p img').first().attr('src');
			
			if (serientitel != '' && image != '' && url != '')
			{
				loadcockie	= getCookie('sl_list_entries');
				var loadobj	= eval('('+loadcockie+')');
				if(loadcockie == 'undefined' || loadcockie == undefined)
				{
					var newobj = {'entries':[{'title':serientitel,'link':url,'img':image},]};
					setCookie('sl_list_entries',JSON.stringify(newobj),900);
					$('#sl_itemlist').html('');
					addtoList(newobj);
				}
				else
				{
					loadobj.entries.push({'title':serientitel,'link':url,'img':image});
					setCookie('sl_list_entries',JSON.stringify(loadobj),900);
					$('#sl_itemlist').html('');
					addtoList(loadobj);
				}
			}
		}
	});
	
	function clearJSON(json)
	{			
		var maxCount = json.entries.length;
		var newJson;
		for (var i = 0; i <= maxCount; i++)
		{
			if (json.entries[i] != null)
			{
				if(newJson == null)
				{
					newJson = {'entries':[{'title':json.entries[i].title,'link':json.entries[i].link,'img':json.entries[i].img},]};
				}
				else
				{
					newJson.entries.push({'title':json.entries[i].title,'link':json.entries[i].link,'img':json.entries[i].img});
				}
			}
		}
		return newJson;
	}
	
	function updateOrder()
	{
		var newcount = 0;
		var newJson;
		$('.sl_entry').each(function(index)
		{
			var u_title	= $(this).find('span').html();
			var u_link	= $(this).find('a').attr('href');
			var u_img	= $(this).find('a').css('background-image').replace(/url\(/gi,'').replace(/\)/gi,'').replace(/"/gi,'');
			if (newcount == 0) {
				newJson = {'entries':[{'title':u_title,'link':u_link,'img':u_img},]};
			}
			else {
				newJson.entries.push({'title':u_title,'link':u_link,'img':u_img});
			}
			newcount++;
		});
		setCookie('sl_list_entries',JSON.stringify(newJson),900);
		$('#sl_itemlist .sl_entry a').attr('href', '');
		$('#sl_itemlist').html('');
		addtoList(newJson);
	}

	$('#sl_itemlist').on('click', '.remitem', function()
	{
		if (delfav == 0) {
			var getID		= $(this).attr('id');
			var loadcockie	= getCookie('sl_list_entries');
			var loadobj		= eval('('+loadcockie+')');
			delete loadobj.entries[getID];
			loadobj			= clearJSON(loadobj);
			setCookie('sl_list_entries',JSON.stringify(loadobj),900);
			$('#sl_itemlist').html('');
			addtoList(loadobj);
		}
	});
	
	function checkWidth() {
		var listwidth	= getCookie('sl_width');
		if (listwidth == 1) {
			$('#check_width').attr('checked', true);
			$('#serienliste,#sl_itemlist,.sl_entry').css('width','200px');
			$('#sl_itemlist a').css('width','190px');
			$('#sl_title').css('width','130px');
		}
		else {
			$('#check_width').attr('checked', false);
			$('#serienliste,#sl_itemlist,.sl_entry').css('width','250px');
			$('#sl_itemlist a').css('width','240px');
			$('#sl_title').css('width','180px');	
		}
	}
	
	$('#addoninfo').click(function() {
		var getRight = $('#show_info').css('right');
		if (getRight == '-260px') {
			$('#show_info').animate({right: '0px'},1000);
		}
		else {
			$('#show_info').animate({right: '-260px'},1000);
		}
	});
	
	$('#serienliste').draggable(
	{
		handle:'#sl_title',
		containment: 'window',
		stop: function(event, ui)
		{
			var Stoppos = $(this).position();
			setCookie('sl_list_top',Stoppos.top,900);
			setCookie('sl_list_left',Stoppos.left,900);
		}
	});
	
	if (drag == 1) {
		$('#check_drag').attr('checked', true);
		$('#sl_title').css('cursor','move');
	}
	else{
		$('#serienliste').draggable('option','disabled',true);
		$('#sl_title').css('cursor','auto');
	}
	
	$('#sl_itemlist').sortable(
	{
		appendTo: '.sl_entry',
		delay: 150,
		update: function(event, ui)
		{
            updateOrder();
        }
	});
	//
	// ----- List Functions -----
	addtoList(obj);
	
});
//
// ---------- Script --------------------------------------------------------------------------------------------------
