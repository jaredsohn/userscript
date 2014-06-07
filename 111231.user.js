// ==UserScript==
// @name           Wykopowy podglądacz
// @namespace      MacDada
// @description    Kliknij link do obrazka lub filmu YouTube, a zobaczysz podgląd bezpośrednio na stronie komentarzy
// @version        0.2.1
// @include        http://www.wykop.pl/link/*
// @include        http://www.wykop.pl/wpis/*
// ==/UserScript==

/**
 * Hack: 
 * - pod ff ładuje JQuery z okna, 
 * - pod Chrome JQuery jest już załadowane przez Tampermonkey…
 */
if ('undefined' == typeof $) {
	$ = unsafeWindow.$;
}

/**
 * Główny obiekt skryptu.
 */
var dwp = {
	// Czy logować do konsoli bzdury testowe?
	debug: false,
	
	// Aktualizacje:
	checkUpdates: true,
	updatesPeriod: 86400000, // (24h*60m*60s*1000ms)
	userscriptsorg_id: 111231,
	
	// Przewijania po wyjściu z lightboxa:
	pageYOffset: false,
	
	// 3, 2, 1… START!
	init: function() {
		dwp.init_logging();
		dwp.log("Odpalanie Wykopowego Podglądacza…");
		dwp.init_updates();
		dwp.init_menu();
		dwp.init_kinds();
		dwp.log("Aktywny rodzaj podglądu: "+dwp.kind());
		dwp.log("Odpalono Wykopowego Podglądacza ;)");
	}
};



dwp.kind = function(val) {
	if (undefined === val) {
		if (undefined === GM_getValue('dwpkind')) {
			dwp.kind('lightbox');
			return 'lightbox';
		} else {
			return GM_getValue('dwpkind');
		}
	} else if (val in { insert: '', lightbox: '', clouds: ''}) {
		GM_setValue('dwpkind', val);
		dwp.log('Ustawiono rodzaj Podglądacza: '+val);
		return this;
	} else {
		throw 'Nieprawidłowy rodzaj podglądu.';
	}
};


dwp.show_image = function(e) {
	e.preventDefault();
	dwp.log('kliknięto otwarcie obrazka');
	
	var url = $(this).attr('href');
	var url_visible = (url.length > 50)
					? url.substr(0, 50)+'…'
					: url;
					
	dwp.pageYOffset = window.pageYOffset;
	
	$('#dwp_lightbox_innerbox').css('margin-top', dwp.pageYOffset+20+'px');
	$("#dwp_lightbox").fadeIn();
	
	$("#dwp_lightbox_content").html('<a href="'+url+'">'+url_visible+'</a>');
	$("#dwp_lightbox_content").prepend('<img style="max-width:900px;" src="'+url+'" alt="obrazek" /><br />');
}

dwp.show_youtube = function(e) {
	e.preventDefault();
	dwp.log('kliknięto otwarcie youtube');
	
	var url = $(this).attr('href');
	var yt_video_id = (/\?v=(.*?)\s*$/m.exec(url))[1];
	
	dwp.log('YouTube Video ID: '+yt_video_id);
	
	$("#dwp_lightbox_content").html('<iframe type="text/html" width="800" height="485" src="http://www.youtube.com/embed/'+yt_video_id+'?wmode=opaque" frameborder="0"></iframe><br />');
	$("#dwp_lightbox_content").append('<a href="'+url+'">'+url+'</a>');
	$('#dwp_lightbox_innerbox').css('margin-top', window.pageYOffset+20+'px');
	$("#dwp_lightbox").fadeIn();
}

dwp.show_youtu_be = function(e) {
	e.preventDefault();
	dwp.log('kliknięto otwarcie youtu.be');
	
	var url = $(this).attr('href');
	var yt_video_id = (/youtu.be\/(.*?)\s*$/m.exec(url))[1];
	
	dwp.log('YouTube Video ID: '+yt_video_id);
	
	$("#dwp_lightbox_content").html('<iframe type="text/html" width="800" height="485" src="http://www.youtube.com/embed/'+yt_video_id+'?wmode=opaque" frameborder="0"></iframe><br />');
	$("#dwp_lightbox_content").append('<a href="'+url+'">'+url+'</a>');
	$('#dwp_lightbox_innerbox').css('margin-top', window.pageYOffset+20+'px');
	$("#dwp_lightbox").fadeIn();
}


dwp.hide = function(e) {
	e.preventDefault();
	dwp.log('kliknięto zamknięcie');
}


/**
 * Logowanie danych do konsoli FireBuga.
 */
dwp.init_logging = function() {
	if (dwp.debug) {
		// Funkcja logująca:
		dwp.log = unsafeWindow.console.log;
		
		// Przydatne do debugowania w konsoli:
		unsafeWindow.dwp = dwp;
	} else {
		dwp.log = function(){};
	}
}


/**
 * Mechanizm aktualizacji skryptu.
 * Źródło: http://userscripts.org/scripts/show/20145 – TNANKS! :)
 */
dwp.init_updates = function() {
	try {
		function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('dwp_last_update', '0')) + dwp.updatesPeriod <= (new Date().getTime()))){if(dwp.debug){dwp.log("Sprawdzanie aktualizacji…")}try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+dwp.userscriptsorg_id+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){
			
			var local_version, remote_version, rt, script_name;
			rt=resp.responseText;
			
			GM_setValue('dwp_last_update', new Date().getTime()+'');
			
			local_version = GM_getValue('dwp_current_version', '-1');
			remote_version = /@version\s*(.*?)\s*$/m.exec(rt)[1];
		
			dwp.log('Wersja lokalna: '+local_version);
			dwp.log('Wersja najnowsza: '+remote_version);
			
			if (local_version!=-1) {
				script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
				GM_setValue('SUC_target_script_name', script_name);
				if (parseFloat(remote_version) > parseFloat(local_version)) {
					if (confirm('Znaleziono aktualizację „Wykopowego Podglądacza”.\n\n\tWersja najnowsza: '+remote_version+'\n\tTwoja wersja: '+local_version+'\n\nCzy chcesz przejść do strony skryptu, żeby zainstalować nowa wersję?\nJeśli teraz zrezygnujesz, nie będziesz o to pytany ponownie.')) {
						GM_openInTab('http://userscripts.org/scripts/show/'+dwp.userscriptsorg_id);
					} else {
						GM_setValue('dwp_current_version', remote_version+'');
					}
				} else if (forced) {
						alert('Nie znaleziono aktualizacji Wykopowego Podglądacza."');
				}
			} else {
				// skrypt dopiero co wgrany, zapisujemy wersję z serwera:
				GM_setValue('dwp_current_version', remote_version+'');
			}
		}});}catch (err){if (forced)alert('Wystapił błąd podczas aktualizacji skryptu:\n'+err); else dwp.log(err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});if(dwp.checkUpdates){updateCheck(false);}
	} catch (err) {
		dwp.log(err);
	}
}


dwp.init_menu = function() {
	// styl dla menu
	GM_addStyle('#dwp_menu_box{ position:fixed; top:200px; left:-105px; } #dwp_menu_content{ width:80px; height:60px; float:left; border:1px solid grey; padding-left:20px; background-color:white; text-align:left; } #dwp_menu_content ul{ margin-left:-10px; } #dwp_menu_content a { font-size:14px; text-decoration:none; } #dwp_menu_content a.active{ font-weight: bold; } #dwp_menu_box_button { float:left; padding-left:5px; font-size:12px; font-weight:bold; font-family:Times; cursor:pointer; }');

	// struktura menu
	$('<div id="dwp_menu_box"><div id="dwp_menu_content"><ul><li><a href="#dwp_lightbox" class="' + (('lightbox' === dwp.kind()) ? 'active' : '') + '">Lightbox</a></li><li><a href="#dwp_dymki"  class="' + (('clouds' === dwp.kind()) ? 'active' : '') + '">Dymki</a></li><li><a href="#dwp_pod_linkiem" class="' + (('insert' === dwp.kind()) ? 'active' : '') + '">Pod linkiem</a></li></ul></div><div id="dwp_menu_box_button" class="closed">M<br />E<br />N<br />U</div></div>').appendTo('body');
	
	// otwieranie menu
	$(".closed#dwp_menu_box_button").live("click", function(){
		$("#dwp_menu_box").stop(true, false).animate({left: "0"}, "medium");
		$("#dwp_menu_box_button").removeClass("closed");
		$("#dwp_menu_box_button").addClass("opened");		
	});

	// zamykanie menu
	$(".opened#dwp_menu_box_button").live("click", function(){
		$("#dwp_menu_box").stop(true, false).animate({left: "-105"}, "medium");
		$("#dwp_menu_box_button").removeClass("opened");
		$("#dwp_menu_box_button").addClass("closed");
	});
	
	// przełączanie rodzaju Podglądacza
	$("#dwp_menu_box li a").click(function(e){
		e.preventDefault(); 
		//$("#dwp_menu_box li a").removeClass("active"); 
		//$(this).addClass("active");
		
		// ustawiam odpowiedni rodzaj podglądacza:
		switch ($(this).attr('href')) {
			case '#dwp_lightbox': dwp.kind('lightbox'); break;
			case '#dwp_dymki': alert('Opcja dostępna już wkrótce ;)'); /*dwp.kind('clouds');*/ break;
			case '#dwp_pod_linkiem': alert('Opcja dostępna już wkrótce ;)'); /*dwp.kind('insert');*/ break;
			default: throw 'Nieprawidłowy rodzaj Podglądacza: '+$(this).attr('href');
		}
	});
} // eo dwp.init_menu()


/**
 * Inicjalizuje wszystkie rodzaje podglądaczy.
 */
dwp.init_kinds = function() {

	dwp.init_lightbox_kind();

	$('a[href="http://wstaw.org/m/2011/08/22/Screen_shot_2011-08-22_at_11.32.08_PM.png"]').attr('id', 'dupa');

	// ustawiam pokazywanie Podglądacza dla obrazków i filmów:
	$(".comment p a[href$='.jpg'], .comment p a[href$='.gif'], .comment p a[href$='.png']").click(dwp.show_image);
	
	$(".comment p a[href*='youtube.com/watch?v=']").click(dwp.show_youtube);
	$(".comment p a[href*='youtu.be/']").click(dwp.show_youtu_be);
	
	$(".dwp_close_button").click(dwp.hide);
}


dwp.init_lightbox_kind = function() {

	/**
	 * Tworzę podstawową strukturę lightboxa
	 */
	$('<div id="dwp_lightbox" style="display: none; position: absolute; top: 0; left: 0; width: 100%; overflow: hidden"></div>').prependTo("body");
	
	$('<div id="dwp_lightbox_overlay" style="top: 0; left: 0; width: 100%; height: 100%; position: fixed; z-index: 1000; opacity: 0.7; background-color: black;">&nbsp</div>').appendTo("#dwp_lightbox");
	
	$('<div id="dwp_lightbox_outerbox" style="position: relative; float: left; left: 50%;"></div>').appendTo("#dwp_lightbox");
	
	$('<div id="dwp_lightbox_innerbox" style="position: relative; float: left; left: -50%; z-index: 1001; margin-top: 30px; margin-bottom: 50px; box-shadow: 0px 0px 50px #000; border-radius: 10px; background-color:black;"></div>').appendTo("#dwp_lightbox_outerbox");
	
	$('<div id="dwp_lightbox_content" style="display: inline-block; position: relative; padding: 10px;">content</div>').appendTo("#dwp_lightbox_innerbox");
	
	
	/**
	 * Zamykanie okienka
	 */
	$("#dwp_lightbox_overlay").click(function(){
		$("#dwp_lightbox").fadeOut();
		
		if (dwp.pageYOffset) {
			window.scrollTo(0, dwp.pageYOffset);
			dwp.pageYOffset = false;
		}
	}); 

}



/**
 * Odpalam Podglądacza :)
 */
try {
	dwp.init();
} catch (err) {
	dwp.log(err);
}




/*
// znajduje linki do obrazków:
$(".comment p a[href$=.jpg], .comment p a[href$=.gif], .comment p a[href$=.png]").click(function(e){
	e.preventDefault();
	
	// laduje je pod nimi:
	$('<img src="' + $(this).attr('href') + '" style="max-width: 400px; display: none;" />')
		.insertAfter($(this))
		.fadeIn("slow")
		.bind("click", function(e){
			// usuwam obrazek po kliknieciu na niego:
			$(this).fadeOut("fast").remove();
		});
});
*/