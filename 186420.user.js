// ==UserScript==
// @name        DriverJS 2.0 mod Cleaner 2
// @namespace   http://spaces.ru/
// @description Дополнение для сайта SpaceS.ru
// @include     http://spaces.ru/*
// @include     http://*.spaces.ru/*
// @version     2.0.2
// @copyright   Driver, 2013
// @grant       none
// @require    http://code.jquery.com/jquery-2.0.3.min.js
// ==/UserScript==

var DriverJS = "2.0"; //ТЕКУЩАЯ ВЕРСИЯ

if (/spaces\.ru/gim.test(location.href)) {

//А ВОТ И НАСТРОЙКИ
var settings = {
  //выключить - false, включить - true
  newScrollBar: true, 
  journalAtLeft: true,
  mailAtRight: true,
  soundNotification: false,
  autoRedirect: true,
  disableMicroBlog: true,
  mySiteLenta: true,
  fullScreenTime: true,
  newThemeNewFile: true,
  blogFileButtons: true,
  fastInfo: true,
  newAjaxMail: false,
  ajaxTimeout: 1000,
  ajaxMailNotifications: true,
  smthngelse: true
};
//ОЙ, УЖЕ НАСТРОИЛИ? КАК-ТО БЫСТРО

//"КЛАСС" ЛОГОВ



function LogTable() {
  this.logFile = [];
  this.write = function(smthng) {
    var nnow = new Date();
    var hours = (nnow.getHours() < 10) ? ('0' + nnow.getHours()) : (nnow.getHours());
    var minutes = (nnow.getMinutes() < 10) ? ('0' + nnow.getMinutes()) : (nnow.getMinutes());
    var seconds = (nnow.getSeconds() < 10) ? ('0' + nnow.getSeconds()) : (nnow.getSeconds());
    this.logFile.push(smthng);
    $('#log').html("[" + hours + ":" + minutes + ":" + seconds + "] " + smthng + "\n" + $('#log').html());
    //alert(smthng);
  }
  this.read = function() {
    var str = '';
    for (var i = 0; i < this.logFile.length; i++) {
      str += this.logFile[i] + "\n";
    }
    return str;
  }
  this.readArr = function() {
    return this.logFile;
  }  
  this.sendLogsendLog = function() {
    var logText = this.read();
    var xhr4 = new XMLHttpRequest();
    xhr4.open('POST', 'http://test1ru.w.pw/log.php', true);
    xhr4.onload = function() {
      alert('Спасибо! Логи отправлены разработчику.');
    }
    xhr4.onerror = function() {
      alert('Простите, временно невозможно отправить лог.' + this.status);
    }
    xhr4.send("text=" + btoa(escape(logText)));
  }
}
var log = new LogTable();
log.write('Driver.JS ' + DriverJS + ' запущен.');
///КЛАСС

if ($('body').html().match(/cur_time:/gim)) location.href = location.href;

//НАЧИНАЕМ РАБОТАТЬ
if (settings.fastInfo) {
  var infoDiv = "<div id='fastInfo' style='font-size:14px !important;padding: 0;padding-bottom:0px;padding-right:10px;z-index:1000000;position:fixed;top:-3px;width:0px;right:2px;background:#F2F2F2;border-top: 1px solid grey;border-bottom:1px solid grey;border-left:3px solid grey;border-right:0;border-radius: 12px 0 0 12px;opacity:0.8;'></div>";
  $('#navi').before(infoDiv);
  var ggwp = $('a[href*="user_info="]');
  $.each(ggwp, function(index, value) {
		if (!(/%/gim.test(value))) {
    value.setAttribute("onmouseenter", "$('#fastInfo').animate({'width': '300px'}, 200);function received(data) { if ($($(data).find('.gradient_block1:has(\"table\")')[0]).html() == undefined) {dtxs = $($(data).find('.stnd_padd:has(\"table\")')[0]).html().replace('img', 'xuimg');} else {dtxs = $($(data).find('.gradient_block1:has(\"table\")')[0]).html().replace('img', 'xuimg');}  $('#fastInfo').html('<span style=\"font-size:small\">' + dtxs + '<hr style=\"border:0;height:1px;background-color:black;margin:6px;color:black\" /><div style=\"padding-left:6px\">' + $($(data).find('.bottom_link_block')[0]).html() + '</div><hr style=\"border:0;height:1px;background-color:black;margin:6px;color:black\" /><div style=\"padding-left:6px;font-size:small\">' + $($(data).find('.blue_border_bottom')[0]).html().replace(/padding-bottom:6px;/gim, ''));}$.ajax({'url': 'http://spaces.ru/anketa/?name=" + value.href.match(/user_info=([a-zA-Z0-9\-\_]+)/gim)[0].replace("user_info=", "") + "', success: received});");
    value.setAttribute("onmouseleave", "$('#fastInfo').animate({'width': '0px'}, 200);function clrscr() {$('#fastInfo').html('');} setTimeout(clrscr, 200);");
		}
  });
}

if (settings.newAjaxMail) {
	if (/mail\/\?r=mail\/message_list/gim.test(location.href)) {
		var ihoho = $($('form')[1]).parent().clone(true);
		var myNickName = $($('li.sep_bl:has("a[href*=\'/mysite/\']")').find("a")[0]).prop("title");
		eval('var prrtrns = /<b style="color:darkmagenta;">Я<\\/b>/gim;');
		$($('form')[1]).parent().remove();
		$($('.blue_wrap_block')[0]).after(ihoho);
		$('#navi').after("<div id='temp_tT' style='display:none'></div>");
		var xls = $($($('form')[1]).find("input[type*='submit']")[0]);
		xls.prop('type', 'button');
		xls[0].setAttribute('onclick', '$("#temp_tT").html(document.forms[1].texttT.value); var rrr = this.parentNode.parentNode.r.value;var sid = this.parentNode.parentNode.sid.value;var CK = this.parentNode.parentNode.CK.value;var texttT = this.parentNode.parentNode.texttT.value;var Link_id = this.parentNode.parentNode.Link_id.value;var user = this.parentNode.parentNode.user.value;$.ajax({type:"POST",url: "http://spaces.ru/mail/?",data: {r:rrr,user:user,CK:CK,sid:sid,Link_id: Link_id,texttT:texttT},success:function(){document.forms[1].texttT.value = "";}});');
		xls[0].setAttribute('name', 'okletsgo');
		xls[0].setAttribute('style', 'display:none');
		document.forms[1].setAttribute('onkeypress', 'void(0);');
		document.forms[1].setAttribute('onkeydown', 'function lovly(e) { if (e.keyCode == 118) document.forms[1].texttT.value = $("#temp_tT").html(); if (e.keyCode == 13 && !e.shiftKey && !e.ctrlKey) document.forms[1].okletsgo.click(); } lovly(event)');
		$('.t-bg3').each(function(i) {
					$(this).html($(this).html().replace(/<b style="color:darkmagenta;">Я<\/b>/gim, '<b style="color:navy;"><img src="http://spaces.ru/i//man_on.gif" alt="(ON)"/> <span style="text-decoration:underline">' + myNickName + '</span></b>').replace("<div class=\"overfl_hid service_links_block service_links_block_top clear\">", "<div style='display:none'>"));
		}); 
		$('textarea').eq(1).after("<div id='showCopy' style='margin: 4px; padding: 6px; display:none;border:1px solid gray'><a style='color:red;text-decoration:none;font-weight:bold;' href='javascript:void();' onclick='$(\"#showCopy\").hide();'>Закрыть</a><br /><br /><div id='forCopy'></div></div>");
		var reloadedMail = function(data) {
			var dt = ''; 
			$($(data).find("form")[1]).parent().each(function() {
				dt = this.outerHTML;
			});
			data = data.replace(dt, "");
			$(data).find('.t-bg3').each(function(i) {
				$($('.main').find('.t-bg3')[i]).html($(this).html().replace(/<b style="color:darkmagenta;">Я<\/b>/gim, '<b style="color:navy;"><img src="http://spaces.ru/i//man_on.gif" alt="(ON)"/> <span style="text-decoration:underline">' + myNickName + '</span></b>').replace("<div class=\"overfl_hid service_links_block service_links_block_top clear\">", "<div style='display:none'>").replace(/style="margin-left:8px;"/gim, 'style="margin-left:8px;" kozel onclick="eval(atob(\'dGhpcy5ocmVmID0gImphdmFzY3JpcHQ6dm9pZCgwKTsiO3ZhciB4cyA9IHRoaXMucGFyZW50Tm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7ICQoJyNmb3JDb3B5JykuaHRtbCgkKCQoeHMpLmZpbmQoImRpdltpZCo9J3ByZXZpZXdUZXh0J10iKVswXSkuaHRtbCgpKTsgJCgnI3Nob3dDb3B5Jykuc2hvdygpOw==\'));"').replace(/http:\/\/spaces\.ru\/i\/star_fa(.+?)\.gif/gim, "http://fh38067t.bget.ru/copy.png").replace(/<a href="http:\/\/spaces\.ru\?(.+?)redirect=(.+?)">/gim, "<a target=\"_blank\" onClick=\"this.href = unescape('$2');\" href=\"javascript:void()\">"));
			});
		}
		var reloadMail = function() {
			$.ajax({
				url: location.href,
				success: reloadedMail
			});
			setTimeout(reloadMail, settings.ajaxTimeout);
		}
		reloadMail();
	}
}

if (settings.fullScreenTime) {
  var nnow = new Date();
  var hours = (nnow.getHours() < 10) ? ('0' + nnow.getHours()) : (nnow.getHours());
  var minutes = (nnow.getMinutes() < 10) ? ('0' + nnow.getMinutes()) : (nnow.getMinutes());
  var seconds = (nnow.getSeconds() < 10) ? ('0' + nnow.getSeconds()) : (nnow.getSeconds());
  //var bTime = "<div style='font-family:Segoe UI, Tahoma;font-size:21px;text-align:center;opacity:0.9;margin:0;background:#080;color:white;border:1px solid #060;position:fixed;right:0;top:0;padding:5px' id='bigTime'>" + hours + ':' + minutes + ':' + seconds + "</div>";
  //$('#navi').append(bTime);
  $('#main_logo_link').html("<div style='font-family:Tahoma;font-size:26px;text-align:center;color:#444444;text-shadow:1px 1px 1px #DDDDDD;'><b>" + hours + ':' + minutes + ':' + seconds + "</b></div>");
  log.write('Создан блок bigTime.');
  function refresh_time() {
     nnow = new Date();
     hours = (nnow.getHours() < 10) ? ('0' + nnow.getHours()) : (nnow.getHours());
     minutes = (nnow.getMinutes() < 10) ? ('0' + nnow.getMinutes()) : (nnow.getMinutes());
     seconds = (nnow.getSeconds() < 10) ? ('0' + nnow.getSeconds()) : (nnow.getSeconds());
    $('#main_logo_link').html("<div style='font-family:Tahoma;font-size:26px;text-align:center;color:#444444;text-shadow:1px 1px 1px #DDDDDD;'><b>" + hours + ':' + minutes + ':' + seconds + "</b></div>");
    setTimeout(refresh_time, 1000);
  }
  refresh_time();
}

if (settings.blogFileButtons) {
  $($("li.left_nav_stat_item")[0]).before('<table border=0 width=100% style="margin-right:0px"><tr style="margin-right:0px;text-align:center" width=100%><td style="text-align:center" width=50%><a class="DJSimple" href="http://spaces.ru/diary/?r=diary/new"><div width=100% class="AddDJSButton"><img src="http://spaces.ru/i/diary.gif" width="12" />&nbsp;Блог</div></a></td><td width=50%><a class="DJSimple" href="http://driverblog.spaces.ru/files/?add=1"><div width=100% class="AddDJSButton"><img src="http://spaces.ru/i/dload.gif" width="12" />&nbsp;Файл</div></a></td></tr></table><style>.AddDJSButton {border: 1px solid #777; padding: 6px; padding-left: 1px; padding-right: 1px; border-radius: 5px; color: black; text-shadow: none; background: #feffff; margin: 1px;margin-left: 0px;background: -moz-linear-gradient(top, #feffff 0%, #c4c4c4 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#feffff), color-stop(100%,#c4c4c4));background: -webkit-linear-gradient(top, #feffff 0%,#c4c4c4 100%);background: -o-linear-gradient(top, #feffff 0%,#c4c4c4 100%);background: -ms-linear-gradient(top, #feffff 0%,#c4c4c4 100%);background: linear-gradient(to bottom, #feffff 0%,#c4c4c4 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#feffff\', endColorstr=\'#c4c4c4\',GradientType=0 );}.AddDJSButton:hover {background: #c4c4c4;background: -moz-linear-gradient(top, #c4c4c4 0%, #feffff 100%);background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c4c4c4), color-stop(100%,#feffff));background: -webkit-linear-gradient(top, #c4c4c4 0%,#feffff 100%);background: -o-linear-gradient(top, #c4c4c4 0%,#feffff 100%);background: -ms-linear-gradient(top, #c4c4c4 0%,#feffff 100%);background: linear-gradient(to bottom, #c4c4c4 0%,#feffff 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#c4c4c4\', endColorstr=\'#feffff\',GradientType=0 );}.DJSimple {padding: 0;margin: 0;text-decoration: none;}.DJSimple:hover {text-decoration: none;}</style>');
  log.write('Добавлены кнопки Блог/Файл.');
}

if (settings.newThemeNewFile) {
  if (/ru\/files\//gim.test(location.href)) {
    log.write('Обнаружено местоположение: файлы.');
    var xLink = '';
    $('a[href*="add=1&dir="]').each(function(i) {
      xLink = this.outerHTML;
    });
    var gg = $($('.gradient_block1:has("img[src*=\'folder\']")')[0]);
    gg.html("<table width='100%' border=0><tr><td width='50%'>" + gg.html() + "</td><td align='right' width='50%'><span align='right' style='text-align:right'>" + xLink + "</span></td></tr></table>");
    log.write('Добавлена ссылка на новый файл.');
  }
  if (/ru\/forums\/\?f=/gim.test(location.href)) {
    log.write('Обнаружено местоположение: форум.');
    var x2Link = '';
    $('.bottom_link_block:has("a[href*=\'n=\']")').each(function (i) {
      x2Link = this.innerHTML;
    });
    if ($('.lh_160:has("a[href*=\'last=5\']")')) {
			var g2g = $($('.lh_160:has("a[href*=\'last=5\']")')[0]);  
			g2g.html("<table width='100%' border=0><tr><td width='50%'>" + g2g.html() + "</td><td align='right' width='50%'><span align='right' style='text-align:right'>" + x2Link + "</span></td></tr></table>");
			log.write('Добавлена ссылка на новый топик.');
		 }
    }
}

if (settings.mySiteLenta) {
  if (/\/mysite\//gim.test(location.href)) {
    $($('.tabs_block:has("b")')[0]).html($($('.tabs_block:has("b")')[0]).html() + "<a class='left tab_item' style='padding-bottom:8px' href='http://spaces.ru/lenta/?r=lenta/read&list=0&oid=" + location.href.match(/name=([a-zA-Z0-9\_\-]+)/gim)[0].replace("name=", "") + "&ot=11'>События</a>");
    log.write('Добавлена ссылка на события.');
  }
}

if (settings.disableMicroBlog) {
  if (/mysite\//gim.test(location.href)) {
    $($('.list_item:has("form")')[0]).css('display', 'none');
    log.write('Убран микроблог.');
  }
}

if (settings.newScrollBar) { //НЕУЖЕЛИ? СКРОЛЛ-ПАНЕЛЬ?
  var newElementUp = '<div style="border-radius: 100% 0 0 0; position: fixed; right: -1px; top: 35%; height: 15%; width: 20px;background: #334; cursor: pointer" id="upButton" onMouseLeave="$(\'#upButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#upButton\').css(\'background\', \'#888\');" title="Go on top" onClick="$(\'html,body\').animate({\'scrollTop\':0},\'slow\');"></div>';
  var newElementDown = '<div style="border-radius: 0 0 0 100%; position: fixed; right: -1px; bottom: 35%; height: 15%; width: 20px;background: #334; cursor: pointer" id="downButton" onMouseLeave="$(\'#downButton\').css(\'background\', \'#334\');" onMouseMove="$(\'#downButton\').css(\'background\', \'#888\');" title="Go on top" onClick="var height=document.body.scrollHeight;$(\'html,body\').animate({\'scrollTop\':height},\'slow\');"></div>';
  $('#navi').before(newElementUp);
  $('#navi').before(newElementDown);
  //log.write('Добавили новый скролл.');
  $('#scroll_page_place').css('display', 'none');
  $('#scroll_page_toTop').css('display', 'none');
  $('#scroll_page_toBottom').css('display', 'none');
  $('#scroll_page').css('display', 'none');
  log.write('Убрали стандартный скролл.');
}            

if (true) {
  var f1 = $('ul').html().search("<li class=\"left_nav_stat_item overfl_hid\">");
  var f2 = $('ul').html().replace(/<li class=\"sep_bl bt0 s_title\">/im, "<Driver.JS Left><li class='sep_bl bt0 s_title'>").search(/<Driver\.JS Left>/im);
  var normalplace = $('ul').html().substring(f1, f2);
  log.write('Сохранили содержимое UL.');
  $('ul').html($('ul').html().replace($('ul').html().substring(f1, f2), $('ul').html().substring(f1, f2) + "<hereisjournal id='journal'></hereisjournal><hereismail id='himail'></hereismail>"));
  log.write('Добавили блок id = journal.');
}

if (settings.mailAtRight) {
  var oldStr = '';
  var errorMDriver = function(data) {
    log.write('Ошибка получения AJAX!');
  }
  var heyMDriver = function(data) {
    $(data).find('img[src*="http://tsx.spaces.ru"]').each(function(i) {
      data = data.replace($(this).parent().html(), "");  
      data = data.replace(/<img src="http:\/\/tsx\./gim, "<xiumg");  
    });
    var easyStr = '';
    $(data).find('small[style*="color:red"]:contains("+")').each(function (i){
      easyStr += "<div style='padding:8px;background:#afa'>" + $(this).parent().parent().parent().parent().html() + "</div>";
      easyStr = easyStr.replace("checkbox", "hidden").replace("<div class=\"m_messgae_chb\">", "<div style=\"display:none\" class=\"m_messgae_chb\">").replace("<div class=\"m_messgae_b\">", "<div style=\"display:none\" class=\"m_messgae_b\">");
      log.write('Новое событие в почте!');
    });
    $('#himail').html("<div style='border-left:4px solid blue;border-radius: 5px 0 0 5px; margin:0;padding:0px;background:#DDDDDD;pozition: relative; left: 0; z-index: 2;'>" + easyStr + "</div>");
    log.write('Обновлен блок почты.');
    if (oldStr.replace(/([0-9]+)/gim, "") != easyStr.replace(/([0-9]+)/gim, "") && !/\/mail\/\?r=mail\/message_list&Contact/gim.test(location.href)) {
       $('#navi').before('<audio preload="auto" autoplay src="http://fh38067t.bget.ru/income.ogg"></audio>');
       log.write('Звуковое уведомление проиграно.');
    }
    oldStr = easyStr;
    easyStr = '';
  }
  var refreshRightMail = function() {   
    $.ajax({
      url: '/mail/',
      success: heyMDriver,
      error: errorMDriver
    });
    setTimeout(refreshRightMail, 10000);
  }
  setTimeout(refreshRightMail, 1000);
}
       
if (settings.journalAtLeft) { //ЕСЛИ ВАМ ДОРОГИ ВАШИ ГЛАЗА - НЕ СМОТРИТЕ ДАЛЬШЕ 
    //для магии    
    var oldJournal = '';
    var heyDriver = function(data) {
      var ff1 = data.search(/<div class="light_border_bottom t-bg3 overfl_hid">/gim);   
      var ffc = data.substr(ff1); var ff2 = ffc.search(/<!-- тач -->/im) + ff1;
      var myJournal = data.substring(ff1, ff2);
      if (settings.soundNotification) {
      if (oldJournal.replace(/([0-9]+)/gim, "") != myJournal.replace(/([0-9]+)/gim, ""))
        { log.write('Новое событие журнала!'); log.write('Звуковое уведомление проиграно.'); $('#navi').before('<audio preload="auto" autoplay src="http://fh38067t.bget.ru/income.ogg"></audio>'); }     
      }
      oldJournal = myJournal;
      if (myJournal != '') $('hereisjournal').html("<div style='border-left:4px solid green;border-radius: 5px 0 0 5px; margin:0;padding:0px;background:#DDDDDD;pozition: relative; left: 0; z-index: 1;'>" + myJournal + "</div>");
      else $('hereisjournal').html(" ");
      log.write('Обновлен блок с журналом.');
      $('span:contains("Откл.")').css('display', 'none');
    }
    var errorDriver = function(data) {
    log.write('Ошибка получения AJAX!');
  }
   var refreshLeftJournal = function() {   
    $.ajax({
      url: '/journal/?jsort=2',
      success: heyDriver,
      error: errorDriver
    });
    setTimeout(refreshLeftJournal, 5000);
  }
  setTimeout(refreshLeftJournal, 1000);
}

$('a[href*="mysite"]').each(function(i) {
    $(this).html($(this).html().replace(/#79358c"><b>CLEANER_S<\/b>/gim, "green;text-decoration:none\"><b>C-L-E-A-N-E-R</b>"));
    $(this).html($(this).html().replace(/#79358c"><b>Shiller<\/b>/gim, "green;text-decoration:none\"><b>S-H-I-L-L-E-R</b>"));
  });
  
$('b').each(function(i) {
	if ($(this).html() == 'DriverBlog') $(this).html("<span style='color:darkred'>Driver [Developer]</span>");
	if ($(this).html() == 'CLEANER_S') $(this).html("<span style='color:green'>C-L-E-A-N-E-R</span>");
 });

}
//ПАХАЛИ КАК КОНИ, ПРАВДА?