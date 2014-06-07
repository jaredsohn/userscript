// ==UserScript==
// @name			eBiteFight CSS Layout-Hacks and Keyboard Shortcuts
// @description		Assigns keyboard shortcuts to game functions and clean platform with custom CSS/jQuery. First version: 2012-10-06
// @namespace		eaposztrof
// @version			2.5
// @date			2013-11-21
// @author			eaposztrof
// @include			http://*.bitefight.gameforge.com*
// @require			http://code.jquery.com/jquery-1.10.2.min.js
// @resource        CUSTOM_CSS http://icode4beer.com/files/e_bf-customs.css
// @grant       	GM_getValue
// @grant       	GM_setValue
// @grant			GM_getResourceText
// @grant			GM_addStyle
// @grant   		GM_registerMenuCommand
// ==/UserScript==

// user configurations
var myNameIs  = GM_getValue ("myNameIs",  "");
var myProfileIDIs  = GM_getValue ("myProfileIDIs",  "");

if ( ! myNameIs && ! myProfileIDIs) {
    myNameIs  = prompt (
        'my Name is not set for ' + location.hostname + '. Please enter Your name used in the game',
        ''
    );
    GM_setValue ("myNameIs", myNameIs);
    myProfileIDIs  = prompt (
        'my Profile ID is not set for ' + location.hostname + '. Please copy the numbers from the end of Your profile URL',
        ''
    );
    GM_setValue ("myProfileIDIs", myProfileIDIs);
}

// global vars
var theHref = document.location.href;

// function to add custom stylesheets
var cssTxt  = GM_getResourceText("CUSTOM_CSS");
GM_addStyle (cssTxt);

// bad requests by invalid tokens redirecting back immediatelly
if(document.title=="400 Bad Request" || document.title=="404 Not Found"){
	history.go(-1);
	document.close();
	throw new this;
}

function h(sc,msg,desc) {
	msg_str='<span title="'+desc+'"><strong>['+sc+']</strong>'+' - '+msg+'</span>';
	$('#id_'+sc).remove();	$('#infopanel #shortcuts').append('<li id="id_'+sc+'">'+msg_str+'</li>');}

function xalert(msg) { // debug
	$('#buddyTrigger').html(msg);
}

function GM_set(key, value) {
	GM_setValue(key, encodeURI(value));
}

function GM_get(key) {
	var value = GM_getValue(key);
	$('#history').html(value);
	return (value && value.length) ? decodeURI(value) : '';
}

function smoothScrollTo(element) {    thisTop = $($(element).parent()).offset().top;
    $("html, body").stop().animate({
        scrollTop: thisTop + "px"
    }, {
        duration: 600
    });
    //    $(element).prepend(thisTop);
    return false;
};

(function ()
{
	this.$ = this.jQuery = jQuery.noConflict(true);

	// The following "if" is not really necessary but with it this script will work for Opera too
	var unsafe = window;
	try
	{
		unsafe = unsafeWindow
	}
	catch (e)
	{
	}
	var $ = unsafe.$;
	if (! $)
		return;
	function badTarget (e)
	{
		var targ;
		if (! e)
			var e = window.event;
		if (e.target)
			targ = e.target;
		else if (e.srcElement)
			targ = e.srcElement;
		if (targ.nodeType == 3) // defeat Safari bug
			targ = targ.parentNode;
		if ((targ.nodeName == "INPUT") || (targ.nodeName == "TEXTAREA"))
			return true;
		return false;
	}

	var dataIn=$('#infobar div.gold').html();
	var dataPrep2Split=dataIn.replace(/<img(.*)>/g,';');
	var dataSplit=dataPrep2Split.split(';');
	var myData2Int=parseInt(dataSplit[18].replace('.',''));
//	var myfval=dataSplit[26];
	var goldHtml = $('.gold').html();
	var myfval_full = goldHtml.substr(goldHtml).split('    &nbsp;&nbsp;')[6];
	var myfval = myfval_full.substr(myfval_full.length - 10).split(';')[1];
	var mylevel_full = goldHtml.substr(goldHtml).split('    &nbsp;&nbsp;')[5];
	var mylevel = mylevel_full.substr(mylevel_full.length - 8).split(';')[1];

	if(myData2Int<=10000) {
		$('#player,#robberyProfil').find('button.btn').attr('disabled', true).prepend(myData2Int+' ').css({'background-color':'#222'});
		var putBack=dataIn.replace(dataSplit[18],'<span class="newmessage">'+dataSplit[18]+'</span>');
		$('#infobar div.gold').html(putBack);
	}

	if (theHref.indexOf ("/robbery/index") > -1 && document.referrer.indexOf("/profile/player") > -1 && document.referrer.indexOf("/profile/player/"+myProfileIDIs) == -1 || theHref.indexOf ("/profile/player") > -1 && document.referrer.indexOf("/report/fightreport") > -1 || theHref.indexOf ("/robbery/index") > -1 ){
		document.evaluate("//button[@type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();
	}

	if (theHref.indexOf ("/robbery/index") > -1 && document.referrer.indexOf("/profile/player") > -1 && document.referrer.indexOf("/profile/player/"+myProfileIDIs) == -1 ){		$('title').text('███████████████████████████████████');
		document.close();
		throw new this;
	}

	var zindex=300;
	$ ('#tabs,#accordion,#infobar,#ServerNews').click(function() {		$(this).css('z-index', zindex++ );	});
	$ ('td').parent().click(function() {
		$(this).toggleClass('bgred');
	});

	$ ('#playerStatistic').children('.wrap-left').children('.wrap-content').children('table').find('tr:nth-child(2)').css({"color": "red", "font-weight": 'bold'});
	$ ('#playerStatistic').children('.wrap-left').children('.wrap-content').children('table').find('tr:nth-child(6)').css({"color": "#C6A400", "font-weight": 'bold'});
	$ ('#player').find('.char-desc').parent().parent().hide();
	$ ('#player').find('button.btn').css({"background-color": "red"});

	var title = window.location.pathname;
//	if(title.indexOf('playerHunt') != -1) {	if(title.indexOf('fightreport') != -1) {

		// compare fight result in title and page
		$('#reportResult').children('.wrap-left').children('.wrap-content').children('p').each(function() {
			var report=$(this).html();

			no1 = report.split(':')[1].match(/[\d]+/);
			no2 = report.split(':')[2];
			attacker = $('#reportResult h3:nth(0)').text().match(/[\w]+/ig)[1];
			title = title.replace('playerHunt'," ("+no1+" :"+no2);
			title = title.replace('/report',(attacker == myNameIs ? "✔" : attacker));
			title = title.replace('fightreport',$('*:contains("Manája ennek")').parent().children('p').text()); // localize
//			$('#reportResult h2').html(title);
			report=report.replace('sebzést okoztak (','sebzést okoztak (<span style="color:#fff;font-weight:bold"> '); // localize
			report=report.replace(')!','</span> )!');
			$(this).html(report);
		});

		// global variable of opponent fightvalue
		var opfval_dom=$('#fighter_details_defender table:nth-child(1) tbody tr:nth-child(4) td:nth-child(2)');
		var opfval = parseInt(opfval_dom.text().replace('.',''));

		// alert when opponent fightvalue higher, lower or out of attack range
		if(opfval>parseInt(myfval,10)+(myfval*.25) || opfval<parseInt(myfval,10)-(myfval*.20)){
			opfval_dom.html('<span style="color:#f00">'+opfval_dom.html()+'&rArr;</span>');
		} else if (opfval>myfval){
			opfval_dom.html('<span style="color:#fff">&uArr;'+opfval_dom.html()+'</span>');
		} else if(opfval<=myfval){
			opfval_dom.html('<span style="color:#ccc">&dArr;'+opfval_dom.html()+'</span>');
		}
	}

	$('title').text(title);

	if (theHref.indexOf ("city/index") > -1){
		var i = 1;
		$('#addBuddy').find('.table-wrap table tr td').children('a').prepend(function(){
			i++;
			return i+': ';
		});
	}

	if (theHref.indexOf ("/user/highscore") > -1){
		$('#highscore table td img').attr('src', function(i, val) {
			if(val=='/img/symbols/race1small.gif'){				level=$(this).parent().parent().children('td:nth-child(4)').text();				fightvalue=parseInt($(this).parent().parent().children('td:nth-child(6)').text().replace('.',''));
				opfval_percent=level-Math.round(fightvalue)/10;
				fval25=parseInt(myfval,10)+(myfval*.25);
				fval20=parseInt(myfval,10)-(myfval*.20);
				if(opfval_percent>0){
					$(this).parent().parent().children('td:nth-child(3)').css({'border-color':'red'});
				}
				if(fightvalue<myfval){
					$(this).parent().parent().children('td:nth-child(3)').children('a').css({'color':'#ccc'});
				}
				if(fightvalue>fval25 || fightvalue<fval20){					$(this).parent().parent().css({'color':'#555'});					$(this).parent().parent().children('td').children('a').css({'color':'#555'});
				}
                $('#buddyTrigger').html(fval20+"&lt;"+myfval+"&lt;"+fval25); // status
//				$(this).parent().text(fightvalue>myfval);
//				$(this).parent().text(parseInt(myfval,10)+(myfval*.25)); // debug
			}
		});
	}

	$('#container').append('<div id="infopanel" class=""> <ul id="shortcuts"></ul> &nbsp;</div>');

	if (theHref.indexOf ("/profile/index") > -1 || theHref.indexOf ("/report/fightreport") > -1 ) {
		$('#infopanel').append('<textarea id="counter" class="scroll" accesskey="c" rows="1" />');
		$('#tabs ul li a').each(function(){			$(this).prepend('<span class="shortcut">['+$(this).attr('href').match(/\d/)[0]+'] </span>');		});
	}

	if (theHref.indexOf ("/profile/index") > -1 ) {		// price on skill's inactive upgrade button
		$('.triggerTooltip img[src="/img/symbols/iconplus_inactiv.png"]').attr('alt',function(){			this_price=$(this).parent().next();
			this_price.remove();
			return this_price.text().match(/[\d.]+/);
		});
		// price on skill's active upgrade button
		$('.triggerTooltip img[src="/img/symbols/iconplus.png"]').attr('alt',function(){			this_price=$(this).parent().parent().next();
			this_price.remove();
			return this_price.text().match(/[\d.]+/);
		});
	}

	$ (document).keydown (function (e)
	{
		if ( ((theHref.indexOf ("/user/login") >= 0) ||
        (theHref.indexOf ("/user/lostpw") >= 0) ||
        (theHref.indexOf ("/user/register") >= 0) ||
        (theHref.indexOf ("/user/search") >= 0) ||
        (theHref.indexOf ("/profile/player/") >= 0) ||
        (theHref.indexOf ("/buddy/buddyrequest/") >= 0) ||
        (theHref.indexOf ("/clan/create") >= 0) ||
        (theHref.indexOf ("/clan/memberrights") >= 0) ||
        (theHref.indexOf ("/change/description") >= 0) ||
        (theHref.indexOf ("/change/homepage") >= 0) ||
        (theHref.indexOf ("/change/clantag") >= 0) ||
        (theHref.indexOf ("/change/clanname") >= 0) ||
        (theHref.indexOf ("/profile/index") >= 0) ||
        (theHref.indexOf ("/msg/index") >= 0) ||
        (theHref.indexOf ("/msg/folders") >= 0) ||
        (theHref.indexOf ("/city/shop") >= 0) ||
        (theHref.indexOf ("/city/market") >= 0) ||
        (theHref.indexOf ("/city/counterfeiter") >= 0) ||
        (theHref.indexOf ("/robbery/index") >= 0) ||
        (theHref.indexOf ("/clan/index") >= 0) ||
        (theHref.indexOf ("/buddy/show") >= 0) ||
        (theHref.indexOf ("/user/notes") >= 0) ||
        (theHref.indexOf ("/user/settings") >= 0) ||
        (theHref.indexOf ("/user/search") >= 0) ||
        (theHref.indexOf ("/msg/read") >= 0) ||
        (theHref.indexOf ("msg/read/?folder=0") >= 0) ||
        (theHref.indexOf ("/msg/clanmail")) >= 0) && badTarget (e) )
			return;
		switch (e.keyCode)
		{
			case 79:	// "o" Обзор
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='profile/index']").attr ("href");
				return false;
				break;

			case 69:	// "e" Обзор
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='msg/index']").attr ("href").replace ("index", "read");
				if (theHref.indexOf ("/city/shop/potions") > -1){					var button=$('a.btn').attr('href');
//		document.evaluate("//button[@type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();

				}
				return false;
				break;

			case 77:	// "m" Рынок и Сообщения
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "market");
				else
					window.location = $ ("a[href*='msg/index']").attr ("href");
				return false;
				break;

			case 72:	// "h" Храм и Тайник
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "church");
				else
					window.location = $ ("a[href*='hideout/index']").attr ("href");
				return false;
				break;

			case 67:	// "c" Библиотека и Город
				if (e.ctrlKey || e.shiftKey)
					break;

				if (e.altKey)
					$('#counter').focus().select();

				return false;
				break;

			case 88:	// "x"
				if (e.altKey) {
					setTimeout(function() {
					}, 0);
				if($('#history').length>0){					if($('#history').text().length>0){						setTimeout(function() {
							get_value=GM_get('asd');							$(this).html(get_value);							alert(get);
						}, 0);
					}
					$('#history').toggle();
				} else {
					setTimeout(function() {
						history_content = GM_get('asd');
						$('body').append('<div id="history" style="bottom: 1em;max-height: 195px;overflow: auto;padding: 0 2em;position: fixed;right: 1em;">'+history_content+'</div>');
						alert(history_content);
					}, 0);
				}

				}

				if (e.ctrlKey)
					break;
// alert(GM_getValue('qwe'));
//					$('#history').remove()
					//.html($('#history').html()+'<br><a href="#">asd</a>');
//	asd
				return false;
				break;

			case 83:	// "s" Миссии
				if (e.altKey){
					setTimeout(function() {
						GM_set('asd',GM_get('asd')+"\n"+theHref);
						alert(GM_get('asd'));
					}, 0);

				}

				if (theHref.indexOf ("/robbery/index") > -1) {
					h('A','ACTIVATE this item!','evaluate the activated .btn');	// helptext

					$("div.tdi select").val(2);
					document.evaluate("//input[@name='optionsearch' and @type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();
                }
//              Bónusz sebzés használt hányada = saját erő / (saját erő + ellenfél kitartása) x 100
				if (theHref.indexOf ("/report/fightreport") > -1){
					var attacker = $('#fighter_details_attacker');
					var def = $('#fighter_details_defender');
					var attacker_head = attacker.find('h3:nth-child(1)');
					var def_head = def.find('h3');
					var apower = attacker.children('table:nth-child(2)').children('tbody').children('tr:nth-child(1)').find('.fontsmall').text().replace(/['(')]/,'').replace(/[')')]/,'');
					var dpersist = def.children('table:nth-child(2)').children('tbody').children('tr:nth-child(4)').find('.fontsmall').text().replace(/['(')]/,'').replace(/[')')]/,'');
					var def_persistence = attacker.children('table:nth-child(2)').children('tbody').children('tr:nth-child(1)').find('.fontsmall').text().replace(/['(')]/,'').replace(/[')')]/,'');
					$(attacker_head).append(apower/(apower+dpersist)*100);

				}
				if (theHref.indexOf ("/profile/index") > -1) {
					num=parseInt($('#counter').val());
					prev_item='.scroll:nth('+num+')';

					$('#counter').val(num+1+'. item to activate');

					num=parseInt($('#counter').val());
					this_item='.scroll:nth('+num+')';

					smoothScrollTo(this_item);

					$(prev_item).parent().parent().removeClass('bgred');
					$(prev_item).parent().find('a.btn').removeClass('activate');
					$(this_item).parent().parent().addClass('bgred');
					$(this_item).parent().find('a.btn').addClass('activate');
                }
                return false;
				break;

			case 82:	// "r" Охота
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='robbery/index']").attr ("href");
				return false;
				break;

			case 80:	// "p" Настройки и Клан
				if (e.ctrlKey || e.altKey)
					break;
				if (theHref.indexOf ("/profile/index") > -1){					h('S','NEXT highlighted!','.activate .btn of next highlighted items');	// helptext
					h('D','PREW highlighted!','.activate .btn of previous highlighted items');	// helptext
					$('.ui-accordion-content').addClass('ui-accordion-content-active').show();
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var ipthis=thisdom.replace('Erő','<span class="strength_inactive scroll">Erő</span>'); // localize
							$(this).html(ipthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var apthis=thisdom.replace('Erő','<span class="strength_active">Erő</span>'); // localize
							$(this).html(apthis);
							delete window.thisdom;
					});
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var isthis=thisdom.replace('sebzés','<span class="strength_inactive scroll">sebzés</span>'); // localize
							$(this).html(isthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var asthis=thisdom.replace('sebzés','<span class="strength_active">sebzés</span>'); // localize
							$(this).html(asthis);
							delete window.thisdom;
					});
                }
				$('#counter').val(1);
				return false;
				break;


			case 66:	// "b" Контакты
				if (e.ctrlKey || e.altKey)
					break;
				if (theHref.indexOf ("/profile/index") > -1) {
					$('.ui-accordion-content:nth(2)').addClass('ui-accordion-content-active').show();
					$('.ui-accordion-content:nth(2) .inactive').each(function() {
						var thisdom=$(this).html();
						var ibthis=thisdom.replace('Mennyiség','<span class="scroll">Mennyiség</span>'); // localize
							$(this).html(ibthis);
							delete window.thisdom;
					});
					$('#counter').val(1);
                }
				return false;
				break;

			case 78:	// "n" Новости и Блокнот
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='main/news']").attr ("href");
				else
					window.location = $ ("a[href*='user/notes']").attr ("href");
				return false;
				break;

			case 84:	// "t" ТОП-лист и Таверна
				if (e.ctrlKey || e.altKey)
					break;

					if (theHref.indexOf ("/report/fightreport/") > -1){
			//			report_t=$('#reportResult .wrap-content h2:nth(0)').text().match(/[\d]+/g); // digits of #reportResult
						report_t=$('#reportResult .wrap-content h2:nth(0)').text().match(/[0-9].+/g);
						report_d=$('#reportResult .wrap-content.wrap-right.clearfix > p').text().match(/[\d]+/g); // digits of #reportResult
						name_a=$('#fighter_details_attacker table td h3 a').text().replace(/\[(.*)\]/,'');
						details_l=$('#fighter_details_attacker .rbg:nth(1)').text();
						details_a=$('#fighter_details_attacker .rbg:nth(3)').text().replace(/\./,'');
						skills=$('#fighter_details_attacker .fontsmall').text().match(/\d+/g);

						if ($('#fightround_details').is(":hidden")&&$('#kicks_stat').length<1){
							$('#fightround_details_header').click();
							smoothScrollTo('#fightround_details_contents');
							$('#counter').val(function(){
								return report_t+"\t"+report_d[0]+"\t"+report_d[2]+"\t"+name_a+"\t"+details_l+"\t"+details_a+"\t"+skills[0]+"\t"+skills[1]+"\t"+skills[2]+"\t"+skills[3]+"\t"+skills[4];
							});
						} else if ($('#fightround_details').is(":visible")&&$('#kicks_stat').length<1){
							$('#show_all_round_details').click();
							var kicks_arr=[];
							var kicks_arr_int=[];
							var kicks=$("#fightround_details_contents .table-wrap div:not([class='tooltip'])").children('table').children('tbody').children('tr:nth-child(2)').children('td:nth-child(2)');
							$.each(kicks, function( key, value ) {
								kicks_arr.push($(this).text());
								kicks_arr_int.push(parseInt($(this).text().replace(/[^\d\.]+/,'')));
							});
							var kicks= '<div id="kicks_stat">';
							var kicks_length=kicks_arr.length;
							var kicks_int_length=kicks_arr_int.length;
							var myk=0;
							var opk=0;
							for (var i = 0; i < kicks_int_length; i++) {
									tclass=((i % 2)? opk=opk+kicks_arr_int[i] : myk=myk+kicks_arr_int[i]);
								}
							kicks=kicks+'<div class="head even">'+myk+' ('+$('#fighter_details_attacker h3 a[href^="/profile"]').text()+')</div>';
							kicks=kicks+'<div class="head odd">'+opk+' ('+$('#fighter_details_defender h3 a[href^="/profile"]').text()+')</div>';
							$('#fightround_details').prepend(function(){								for (var i = 0; i < kicks_length; i++) {									tclass=((i % 2)? 'odd' : 'even');
									kicks=kicks+"<div class="+tclass+">"+kicks_arr[i]+"</div>";
								}
								kicks=kicks+"</div>";								return kicks;
							});
							$('#counter').val($('#counter').val()+"\t"+myk+"-"+opk);
						} else if ($('#kicks_stat').is(":visible")) {							name_d=$('#fighter_details_defender table td h3 a').text().replace(/\[(.*)\]/,'');
							details_dl=$('#fighter_details_defender .rbg:nth(1)').text();
							details_dt=$('#fighter_details_defender .rbg:nth(3)').text().replace(/\./,'');
							details_d=details_dt.match(/\d+/g);
							skills_d=$('#fighter_details_defender .fontsmall').text().match(/\d+/g);
							$('#counter').val(function(){
								return $(this).val()+"\n"+report_t+"\t"+report_d[0]+"\t"+report_d[2]+"\t"+name_d+"\t"+details_dl+"\t"+details_d+"\t"+skills_d[0]+"\t"+skills_d[1]+"\t"+skills_d[2]+"\t"+skills_d[3]+"\t"+skills_d[4];
							});
							$('#counter').focus().select();
						}
					}

                if (theHref.indexOf ("/city/shop") > -1){
					$('input.inputblack[name="lvlTo"]').val(mylevel);
					$('form[name="filterForm"]').submit();
                }

				return false;
				break;

			case 71:	// "g" Кладбище и Пещера
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "graveyard");
				else
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "grotte");
				return false;
				break;

			case 73:	// "i" Начало истории
				if (e.ctrlKey || e.altKey)
				    break;
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "shop/potions");
				return false;
				break;

			case 81:	// "q" Миссии
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index");
                if (theHref.indexOf ("/robbery/index") > -1){
					document.evaluate("//input[@name='optionsearch' and @type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();
                }
                return false;
				break;

			case 65:	// "a" Миссии
                if (theHref.indexOf ("/robbery/index") > -1 || theHref.indexOf ("/profile/player") > -1){
					document.evaluate("//button[@type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("city/church") > -1){
					document.evaluate("//input[@type='submit' and contains(@class, 'btn')]", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/report/fightreport/") > -1){
					document.evaluate("//a[contains(@href, '/profile/player/')][not(contains(@href, '/profile/player/800854'))]", document, null, 9, null).singleNodeValue.click();
                }
				if (theHref.indexOf ("/profile/index") > -1) {
					if ($('a.btn').hasClass('activate')){
						document.evaluate("//a[contains(@class, 'activate')]", document, null, 9, null).singleNodeValue.click();
					}

					// items's level highlight
					item=$('#items .ui-accordion-content table tr td:nth-child(2)');
					item.each(function() {
						var thisdom=$(this).html();
						var ipthis_level=thisdom.match(/Szint: (\d)+/g);	// todo: localize
						var ipthis_level_ints=ipthis_level[0].match(/\d+/g)[0];
						switch (ipthis_level_ints.length){
							case 1:
								bgcolor='#'+ipthis_level_ints+'aaaaa';
								color='#'+ipthis_level_ints+'fffff';
							break
							case 2:
								bgcolor='#'+ipthis_level_ints*10+'aaa';
								color='#'+ipthis_level_ints+'ffff';
							break
							case 3:
								bgcolor='#'+ipthis_level_ints+'aaa';
								color='#'+ipthis_level_ints+'fff';
							break
							case 4:
								bgcolor='#'+ipthis_level_ints+'aa';
								color='#'+ipthis_level_ints+'ff';
						}
//						var ipthis_level_int=ipthis_level[0].match(/\d\d/g)[0];
						var levelstat = parseInt(mylevel)-parseInt(ipthis_level_ints);
						var ipthis=thisdom.replace(ipthis_level,'<span class="levels" style="background-color:'+bgcolor+';color:'+color+'">'+ipthis_level+' | <b>'+levelstat+'</b>/<sub>'+mylevel+'</sub></span></span>'); // localize
							$(this).html(ipthis);
							delete window.thisdom;
					});
				}
                return false;
				break;

			case 87:	// "w" Начать клановый чат и Отправить общее сообщение клану
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("clan/index", "shoutbox");
				else
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("clan/index", "msg/clanmail");
				return false;
				break;

			case 68:	// "d" Посмотреть пожертвования клану
				if (e.ctrlKey || e.altKey)
					break;
				if (theHref.indexOf ("/profile/index") > -1) {
					h('A','ACTIVATE this item!','evaluate the activated .btn');	// helptext

					num=parseInt($('#counter').val());
					prev_item='.scroll:nth('+num+')';

					$('#counter').val(num-1+". item to activate");

					num=parseInt($('#counter').val());
					this_item='.scroll:nth('+num+')';

					smoothScrollTo(this_item);

					$(prev_item).parent().parent().removeClass('bgred');
					$(prev_item).parent().find('a.btn').removeClass('activate');
					$(this_item).parent().parent().addClass('bgred');
					$(this_item).parent().find('a.btn').addClass('activate');
                }
				return false;
				break;

			case 48:	// "0" Миссии
				if (e.ctrlKey || e.altKey)
					break;
					window.location = $ ("a[href*='profile/index']").attr ("href").replace ("index", "index");
				return false;
				break;

			case 49:	// "1" Миссии
				if (e.ctrlKey || e.altKey)
					break;
				if (e.shiftKey)
                if (theHref.indexOf ("/profile/index") < -1){
					window.location = $ ("a[href*='msg/index']").attr ("href");
				}
				else
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "index");
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/shop']").attr ("href").replace ("index", "index");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/weapons/']").attr ("href");
                }
                if (theHref.indexOf ("/msg/index") > -1){
					window.location = $ ("a[href*='msg/read/?folder=0']").attr ("href");
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/1");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Könnyű").click ();
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-1']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "voodoo");
                }
				return false;
				break;

			case 50:	// "2" Миссии
				if (e.ctrlKey || e.altKey)
					window.location = $ ("a[href*='city/index']").attr ("href");
					else
				if (e.shiftKey)
					window.location = "/city/missions";
				else
                if (theHref.indexOf ("/profile/index") < -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "index");
				}
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/shop']").attr ("href").replace ("index", "index");
                }
                if (theHref.indexOf ("/msg/index") > -1){
					window.location = $ ("a[href*='msg/read/?folder=100']").attr ("href");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/potions/']").attr ("href");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Normál").click ();
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-2']", document, null, 9, null).singleNodeValue.click();
                }
				return false;
				break;

			case 51:	// "3"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/helmets/']").attr ("href");
                }
                if ((theHref.indexOf ("/city/grotte") > -1) || (theHref.indexOf ("/grotte") > -1)) {
                    $ ("input[name=difficulty]").val ("Nehéz").click ();
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/3");
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-3']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "graveyard");
                }
				return false;
				break;

			case 52:	// "4"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/armor/']").attr ("href");
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/4");
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-4']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "taverne");
                }
				return false;
				break;

			case 53:	// "5"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/stuff/']").attr ("href");
                }
                if (theHref.indexOf ("/robbery/index") > -1) {
					window.location = $ ("a[href*='robbery/index']").attr ("href").replace ("index", "index/humanhunt/5");
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-5']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "grotte");
                }
				return false;
				break;

			case 54:	// "6"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/gloves/']").attr ("href");
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-6']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "market");
                }
				return false;
				break;

			case 55:	// "7"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/shoes/']").attr ("href");
                }
                if (theHref.indexOf ("/profile/index") > -1){
					document.evaluate("//a[@href='#tabs-7']", document, null, 9, null).singleNodeValue.click();
                }
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "counterfeiter");
                }
				return false;
				break;

			case 56:	// "8"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "church");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/shields/']").attr ("href");
                }
				return false;
				break;

			case 57:	// "9"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/city/index") > -1){
					window.location = $ ("a[href*='city/index']").attr ("href").replace ("index", "arena");
                }
                if (theHref.indexOf ("/city/shop") > -1){
					window.location = $ ("a[href*='/totems/']").attr ("href");
                }
				return false;
				break;

			case 86:	// "v"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("/profile/index") > -1){
					h('S','NEXT highlighted!','.activate .btn of next highlighted items');	// helptext
					h('D','PREW highlighted!','.activate .btn of previous highlighted items');	// helptext

					$('.ui-accordion-content').addClass('ui-accordion-content-active').show();
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var ilthis=thisdom.replace('Életerő','<span class="defence_inactive scroll">Életerő</span>'); // localize
							$(this).html(ilthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var althis=thisdom.replace('Életerő','<span class="defence_active">Életerő</span>'); // localize
							$(this).html(althis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var avthis=thisdom.replace('Védelem','<span class="defence_active">Védelem</span>'); // localize
							$(this).html(avthis);
							delete window.thisdom;
					});
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var ivthis=thisdom.replace('Védelem','<span class="defence_inactive scroll">Védelem</span>'); // localize
							$(this).html(ivthis);
							delete window.thisdom;
					});
                }
				$('#counter').val(1);
				return false;
				break;

			case 75:	// "k"
                if (theHref.indexOf ("/profile/index") > -1){					h('S','NEXT highlighted!','.activate .btn of next highlighted items');	// helptext
					h('D','PREW highlighted!','.activate .btn of previous highlighted items');	// helptext

					$('.ui-accordion-content').addClass('ui-accordion-content-active').show();
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var ikthis=thisdom.replace('Kitartás','<span class="endurance_inactive scroll">Kitartás</span>'); // localize
							$(this).html(ikthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var akthis=thisdom.replace('Kitartás','<span class="endurance_active">Kitartás</span>'); // localize
							$(this).html(akthis);
							delete window.thisdom;
					});
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var irthis=thisdom.replace('Regeneráció','<span class="endurance_inactive scroll">Regeneráció</span>'); // localize
							$(this).html(irthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var arthis=thisdom.replace('Regeneráció','<span class="endurance_active">Regeneráció</span>'); // localize
							$(this).html(arthis);
							delete window.thisdom;
					});

                } else {					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("index", "memberlist");                }
				if (e.altKey)
					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("index", "memberlist");

				$('#counter').val(1);

//				return false;
				break;

			case 85:	// "u"
				if (e.ctrlKey || e.altKey)
					break;
                if (theHref.indexOf ("msg/clanmail") > -1){                	var checkBoxes = $('input[type=checkbox]');
					checkBoxes.attr("checked", !checkBoxes.attr("checked"));
                }
                if (theHref.indexOf ("/profile/index") > -1){
					$('.ui-accordion-content').addClass('ui-accordion-content-active').show();
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var ikthis=thisdom.replace('Ügyesség','<span class="ugyesseg_inactive scroll">Ügyesség</span>'); // localize
							$(this).html(ikthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var akthis=thisdom.replace('Ügyesség','<span class="ugyesseg_active">Ügyesség</span>'); // localize
							$(this).html(akthis);
							delete window.thisdom;
					});
					$('.inactive').each(function() {
						var thisdom=$(this).html();
						var irthis=thisdom.replace('találat esélye','<span class="ugyesseg_inactive scroll">találat esélye</span>'); // localize
							$(this).html(irthis);
							delete window.thisdom;
					});
					$('.active').each(function() {
						var thisdom=$(this).html();
						var arthis=thisdom.replace('találat esélye','<span class="ugyesseg_active">találat esélye</span>'); // localize
							$(this).html(arthis);
							delete window.thisdom;
					});

                } else {
//					window.location = $ ("a[href*='clan/index']").attr ("href").replace ("index", "memberlist");
                }

				$('#counter').val(1);

				return false;
				break;

		}
		return true;
	});

	if (theHref.indexOf ("/city/shop") > -1){
		var i = 0;
		$('#shopMenu a').prepend(function(){
			i++;
			return i+': ';
		});
		this_shop_url_array = theHref.split('/');
		this_shop = this_shop_url_array[this_shop_url_array.length-2];
		$('#shopMenu a[href*="shop/'+this_shop+'"]').css({'text-decoration':'underline'})
	}

	if (theHref.indexOf ("/city/missions") > -1){
		$('p').each(function() {
		var thisdom=$(this).html();
			pvpthis=thisdom.replace('Nyerj PvP csatákat','<span class="strength_active" style="display:block;">Nyerj PvP csatákat</span>'); // localize
			$(this).html(pvpthis);
			delete window.thisdom;
		});
		$('p').each(function() {
		var thisdom=$(this).html();
			manthis=thisdom.replace('Szerezz mana-t','<span class="endurance_active" style="display:block;">Szerezz mana-t</span>'); // localize
			$(this).html(manthis);
			delete window.thisdom;
		});
	}

	// help session

	var msg = [];

	// show shortcut help
	if (theHref.indexOf ("/robbery/index") > -1){
		h('A','ATTACK!','submit the active form');	// helptext
	}
	if (theHref.indexOf ("city/church") > -1){
		h('A','HEAL!','submit the active form');	// helptext
	}
	if (theHref.indexOf ("/report/fightreport/") > -1){
		h('A','ATTACK this opponent!','submit the active form');	// helptext
	}
	if (theHref.indexOf ("/profile/index") > -1) {
		h('A','HIGHLIGHT item\'s level!','add span.levels to each item\'s level info');	// helptext
		h('0','JUMP here!');	// helptext
		h('p','highlight <span class="strength_inactive">Strength</span> items');	// helptext
		h('k','highlight <span class="endurance_inactive">Endurance</span> items');	// helptext
		h('v','highlight <span class="defence_inactive">Defence</span> items');	// helptext
	}
	if (theHref.indexOf ("/msg/read") > -1) {
		h('E','JUMP here!');	// helptext
	}
	if (theHref.indexOf ("/msg/clanmail") > -1){
		h('W','JUMP here','this location');
		h('U','TOGGLE checkboxes');
	}
	if (theHref.indexOf ("/city/missions") > -1) {
		h('Shift+2','JUMP here!');	// helptext
	}

$('#infopanel,#shortcuts,#shortcuts li,#shortcuts li span').click(function(){
	$(this).children('li').slideToggle();
});

	$('#accordion table tr td').dblclick(function(e){		var node = $(this).clone(true).html().replace(/<br>/g,'	').replace(/\+/g,'	').replace(/Mennyiség: /g,'').replace(/Visszavásárlási ár: /g,'').replace(/Követelmények: játékos szintje: /g,'').replace(/Helyezd ezt használatba/g,'').replace(/  /g,'');  // localize
		$('#buddyTrigger').append('<div style="display:none" id="temp">'+node+'</div>');
		var node2 = $('#buddyTrigger #temp').text();
		$('#buddyTrigger #counter').val('');
		$('#buddyTrigger #counter').val(node2);
	});
}
//
) ();