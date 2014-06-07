	// ==UserScript==
	// @name        Driver.JS (low inet mode)
	// @namespace   http://spaces.ru/
	// @description Дополнение для сайта SppaceS.ru
	// @include     http://spaces.ru/*
	// @include     http://*.spaces.ru/*
	// @require		http://code.jquery.com/jquery-2.0.3.min.js
	// @version     1.1
	// @copyright   Driver, 2013
	// @grant       none
	// ==/UserScript==

	var DriverJS = 1.1;//ТЕКУЩАЯ ВЕРСИЯ

	//А ВОТ И НАСТРОЙКИ
	var settings = {
		//выключить - false, включить - true
		newScrollBar: true, 
		journalAtLeft: true,
		mailAtRight: true,
		soundNotification: true,
		autoRedirect: true
		//выключить - false, включить - true
	};
	//ОЙ, УЖЕ НАСТРОИЛИ? КАК-ТО БЫСТРО

	//НАЧИНАЕМ РАБОТАТЬ
	var checkNewVersion = function() {
		var CNV = "<div style='text-align:center;opacity:0.7;margin:0;width:100%;z-index:10000;display:none;background:#800;color:white;border:1px solid red;position:fixed;bottom:0;padding:4px' id='OutOfVersion'>ВНИМАНИЕ! Вы используете устаревшую версию Driver.JS. Самую новую версию вы всегда можете найти <a href='http://spaces.ru/forums/?f=1444674'>здесь</a>.</div>";
		$('#navi').html($('#navi').html() + CNV);
		$.ajax({
			url: "http://spaces.ru/forums/?r=14907905",
			success: checkedVersion
		});
	}

	var checkedVersion = function(data) {
		var chVer = data.match(/Driver.JS (.+?) /im);
		if (chVer[1] != DriverJS) {
			$('#OutOfVersion').css({'display': 'inline-block'});
		}
	}

	if (settings.newScrollBar) { //НЕУЖЕЛИ? СКРОЛЛ-ПАНЕЛЬ?
		var newElementUp = '<div style="border-radius: 0 100% 0 0; position: fixed; left: 0; top: 30%; height: 20%; width: 10px;background: #334; cursor: pointer" id="upButton" onMouseLeave="$(\'#upButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#upButton\').css(\'background\', \'#888\');" title="Go on top" onClick="$(\'html,body\').animate({\'scrollTop\':0},\'slow\');"></div>';
		var newElementDown = '<div style="border-radius: 0 0 100% 0; position: fixed; left: 0; bottom: 31%; height: 20%; width: 10px;background: #334; cursor: pointer" id="downButton" onMouseLeave="$(\'#downButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#downButton\').css(\'background\', \'#888\');" title="Go on top" onClick="var height=document.body.scrollHeight;$(\'html,body\').animate({\'scrollTop\':height},\'slow\');"></div>';
		$('#left_nav').html($('#left_nav').html() + newElementUp + newElementDown);
		$('#scroll_page_place').css('display', 'none');
		$('#scroll_page_toTop').css('display', 'none');
		$('#scroll_page_toBottom').css('display', 'none');
		$('#scroll_page').css('display', 'none');
	}            
	
	if (true) {
	    var f1 = $('ul').html().search("<li class=\"left_nav_stat_item overfl_hid\">");
		var f2 = $('ul').html().replace(/<li class=\"sep_bl bt0 s_title\">/im, "<Driver.JS Left><li class='sep_bl bt0 s_title'>").search(/<Driver\.JS Left>/im);
		var normalplace = $('ul').html().substring(f1, f2);
		$('ul').html($('ul').html().replace($('ul').html().substring(f1, f2), $('ul').html().substring(f1, f2) + "<hereisjournal id='journal'></hereisjournal><hereismail id='himail'></hereismail>"));
	}

	if (settings.autoRedirect) {
		  $('#previewText').each(function(i) {
		      $(this).html($(this).html().replace(/<a href="http:\/\/spaces\.ru\?(.+?)redirect=(.+?)">/gim, "<a target=\"_blank\" href=\"$2\">"));
		  });
		  $('.pad_t_a').each(function(i) {
		      $(this).html($(this).html().replace(/<a href="http:\/\/spaces\.ru\?(.+?)redirect=(.+?)">/gim, "<a target=\"_blank\" href=\"$2\">"));
		  });
		  $('.spoiler').each(function(i) {
		      $(this).html($(this).html().replace(/<a href="http:\/\/spaces\.ru\?(.+?)redirect=(.+?)">/gim, "<a target=\"_blank\" href=\"$2\">"));
		  });
	}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
				 
	if (settings.mailAtRight) {
		var oldStr = '';
		var soundNTF = '<audio src="http://test1ru.w.pw/journal.mp3" autoplay></audio>'; 
		var heyMDriver = function(data) {
		    $(data).find('img[src*="http://tsx.spaces.ru"]').each(function(i) {
		      data = data.replace($(this).parent().html(), "");  
		      data = data.replace(/<img src="http:\/\/tsx\./gim, "<xiumg");  
		    });
			var easyStr = '';
			$(data).find('small[style*="color:red"]:contains("+")').each(function (i){
				easyStr += "<div style='padding:8px;background:#afa'>" + $(this).parent().parent().parent().parent().html() + "</div>";
    			easyStr = easyStr.replace("checkbox", "hidden").replace("<div class=\"m_messgae_chb\">", "<div style=\"display:none\" class=\"m_messgae_chb\">").replace("<div class=\"m_messgae_b\">", "<div style=\"display:none\" class=\"m_messgae_b\">");
			});
			$('#himail').html(easyStr);
			if (oldStr.replace(/([0-9]+)/gim, "") != easyStr.replace(/([0-9]+)/gim, "")) {
			     $('#left_nav').html($('#left_nav').html() + soundNTF);
			}
			oldStr = easyStr;
			easyStr = '';
		}
		var refreshRightMail = function() {   
			$.ajax({
				url: '/mail/',
				success: heyMDriver
			});
			setTimeout(refreshRightMail, 2000);
		}
		setTimeout(refreshRightMail, 500);
	}
				 
	if (settings.journalAtLeft) { //ЕСЛИ ВАМ ДОРОГИ ВАШИ ГЛАЗА - НЕ СМОТРИТЕ ДАЛЬШЕ 
			//для магии    
			var oldJournal = '';
			var soundNTF = '<audio src="http://test1ru.w.pw/journal.mp3" autoplay></audio>';
			var heyDriver = function(data) {
			   var ff1 = data.search(/<div class="light_border_bottom t-bg3 overfl_hid">/gim);   
			   var ffc = data.substr(ff1); var ff2 = ffc.search(/<!-- тач -->/im) + ff1;
			   var myJournal = data.substring(ff1, ff2);
			   if (settings.soundNotification) {
				   if (oldJournal.replace(/([0-9]+)/gim, "") != myJournal.replace(/([0-9]+)/gim, "")) { $('#left_nav').html($('#left_nav').html() + soundNTF); }	   
			   }
			   oldJournal = myJournal;
			   if (myJournal != '') $('hereisjournal').html("<div style='padding:8px;background:#dde4ea'>" + myJournal + "</div>");
			   else $('hereisjournal').html(" ");
			   $('span:contains("Откл.")').css('display', 'none');
		  }
		 var refreshLeftJournal = function() {   
			$.ajax({
				url: '/journal/?jsort=2',
				success: heyDriver
			});
			setTimeout(refreshLeftJournal, 2000);
		}
		setTimeout(refreshLeftJournal, 600);
			
	}

	checkNewVersion();
	//ПАХАЛИ КАК КОНИ, ПРАВДА?