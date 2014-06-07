// ==UserScript==
// @name           eRepublik Belarussian Translation
// @namespace      Belarussian Translation
// @author         AlexeyWB
// @description    eRepublik Беларуская
// @version        0.998
// @match          http://*.erepublik.com/*
// @include        http://*.erepublik.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==

	var location = document.location.toString();
	var lang = document.location.pathname.substr(1,2);
	var host = document.location.hostname.split('.')[0];

/* [function] $.exact('string'); http://blog.darkthread.net/post-2009-01-24-jquery-custom-selector.aspx  */
	$.extend($.expr[":"], { exact: function(a, i, m) { return (a.textContent || a.innerText || jQuery(a).text() || '').toLowerCase() == m[3].toLowerCase(); } });


if ($("body").attr("id")=="error"){
	
$("div.errtxt > p").replaceText("Occasionally there are a couple of things which we need to check or to implement in order make your experience in eRepublik more pleasant.","На жаль, у нас узніклі праблемы. Мы старанна працуем над іх вырашэннем.");
} else if ($("body").attr("id")!=="homepage_out"){
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// Common strings
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		$('strong#foodText').css('font-family','Arial,Arial');
		// header
		$('div#header > div#logo > a').css('background-image','url(\"http://www.erepublik.com/images/parts/map-erepublik-logged.png\")')
		$("a.ambient_toggler > span").text("Паказаць / схаваць фон");
		//$("input#search_field.field").attr("value","Пошук грамадзян");
		$("span.eday").replaceText("Day","").replaceText(" of the New World","-й дзень Новага Свету");
		// common catalog
		$(".facebook_like").css("display","none");
				$('#menuText ul li#menu2 a span').text('Мае спадарства');
		$('#menuText ul li#menu3 a span').text('Бітвы');
		$('#menuText ul li#menu4 a span').text('Рынак');
		$('#menuText ul li#menu5 a span').text('Супольнасць');
		$('#menuText ul li#menu6 a span').text('Золата і бонусы');
		$('#menuText ul li#menu1 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu2 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu3 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu4 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu5 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText ul li#menu6 a').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/menu_erepublik.png\")');
		$('#menuText > ul > li#menu2').append('<ul>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/myCompanies\" targe="_self">Мае спадарства</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/training-grounds\" targe="_self">Трэніровачныя пляцоўкі</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/inventory\" targe="_self">Сховішча</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/economy/advanced-buildings\" targe="_self">Іншыя будынкі</a></li>'+
			'</ul>'
		);
		$('#menuText > ul > li#menu3').append('<ul>' +
			'<li><a href=\"http://www.erepublik.com/en/military/campaigns/\" target="_self">Бітвы</a></li>' +
			'<li><a href=\"http://www.erepublik.com/en/newspaper/ebelarus-battle-orders-244148/1/\" target="_self">Загады Мін Абароны</a></li>' +
			'<li><a href=\"http://egov4you.info/" target="_blank">egov4you.info - Пульс</a></li>');
		$("#menuText > ul > li#menu4 > ul > li > a:contains('Marketplace')").text('Рынак');
		$("#menuText > ul > li#menu4 > ul > li > a:contains('Monetary')").text('Валютны Рынак');
		$("#menuText > ul > li#menu4 > ul > li > a:contains('Job')").text('Цэнтр занятасці');
		$("#menuText > ul > li#menu4 > ul > li > a:contains('Companies for sale')").text('Кампаніі на продаж');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('World map')").text('Мапа свету');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('My party')").text('Мая партыя');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('Elections')").text('Выбарчы камітэт');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('Military unit')").text('Вайсковае падраздзяленне');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('Invite friends')").text('Запрасіць сяброў');
		$("#menuText > ul > li#menu5 > ul > li > a:contains('Badges')").text('Рэкламныя банэры');
		$('#menuText > ul > li#menu5 > ul').prepend('<li><a href=\"http://www.erepublik.com/en/news/latest/all\" target="_self">Апошнія навіны</a></li>'+
		'<li><a href=\"http://www.erepublik.com/en/country-administration/Belarus/1\" target="_self">Законы Беларусі</a></li>');
		$('#orderContainer.boxes.order_of_day > div').css('background-image','url(\"http://dl.dropbox.com/u/68604040/EREP/boxes_v2.png\")');
		$('#menuText > ul > li#menu5 > ul').append(
			'<li><a href=\"http://www.erepublik.com/en/newspaper/mininfo-ebelarus-today-244353/1/" target="_blank">Міністэрства Інфармацыі</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/belarus-support-243755/1/" target="_blank">Міністэрства Дэмаграфії</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/belarus-financial-times-244764/1/" target="_blank">Міністэрства Фінансаў</a></li>'+
			'<li><a href=\"http://www.erepublik.com/en/newspaper/mofa-belarus-243187/1/" target="_blank">Міністэрства замежных спраў</a></li>');
		// sidebar
		var Explevel = $('#experienceTooltip > strong').eq(0).text();
		var Exppoint = $('#experienceTooltip > strong').eq(1).text();
		var Nextlevel = $('#experienceTooltip > strong').eq(2).text();
		var healLimit = $('#eatFoodTooltip big.tooltip_health_limit').text();
		$('#wellnessTooltip').html('<img class="tip" alt="" src="http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png">'+'• Праца, трэніроўкі і ўдзел у бітвах зніжае ўзровень здароўя'+'<br>'+'• Прадукты, бальніцы і энергетычныя батончыкі здольны палепшыць яго стан');
		$('#experienceTooltip').html('<img src=\"http://www.erepublik.com/images/modules/sidebar/yellow_arrow_tip.png\" class=\"tip\" alt=\"\" />'+
			'Узровень вопыту: <strong> '+Explevel+'</strong><br />Цяперашні вопыт: <strong>'+Exppoint+'</strong><br />Наступны ўзровень: <strong>'+Nextlevel+'</strong><br />');
		$('#eatFoodTooltip > p:eq(0)').text('Спажывайце ежу са Сховішчау для аднаўлення здароўя.');
		$('#eatFoodTooltip > p:eq(1)').html('Вы можаце аднавіць <big>'+healLimit+'</big>');
		$('#eatFoodTooltip > small').replaceText('100 more recoverable Health in','Наступныя 100 хп Вы зможаце аднавіць праз')
		$('#sidebar_missions > .content > b:first').text('Спіс актыўных місій:');
		$('strong#foodText').text('Есці');
		// others
		$('a.logout').text('Выйсці');
		$('a.prev').text('Назад');
		$('a.next').text('Уперад');
		// footer
		$('#footer > p > a:eq(0)').text('Бібліятэка');
		$('#footer > p > a:eq(1)').text('Блог');
		$('#footer > p > a:eq(2)').text('СМІ пра нас');
		$('#footer > p > a:eq(3)').text('Сувязь з адмінамі');
		$('#footer > p > a:eq(4)').text('Вакансії');
		$('#footer > p > a:eq(5)').text('Умовы прадастаўлення паслуг');
		$('#footer > p > a:eq(6)').text('Політыка канфідэнціальнасці');
		$('#footer > p > a:eq(7)').text('Супрацоўніцтва');
		$('#footer > p > a:eq(8)').text('Правіла гульні');
	

		//$('#footer > p > a:eq(9)').text('Правіла гульні');
	
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
	// www.erepublik.com
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	if (host==='www') {
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/	
		// www.erepublik.com/en
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if ((location=="http://www.erepublik.com/"+lang) || (location.indexOf("?viewPost=")!==-1)) {
			$('h1').css('font-family','Arial,Arial');
			$('#daily_pop > h2').css('font-family','Arial,Arial');
			$('#daily_pop > h3').css('font-family','Arial,Arial');
			// daily order
			$('#orderContainer > h1').text('Штодзённы загад');
			$('#orderContainer.boxes.order_of_day > div').css('background-image','url(\"http://www.erepublik.com/images/modules/homepage/boxes_v2.png?1321873581\")');
			$('#orderContainer > div > strong').text($('#orderContainer > div > strong').text().replace('Fight for','Біцца за ').replace(' in ',' у ')+'. Забіта варожых салдат:');
			$('#orderContainer > div > a.blue_beauty').text('Да Бітвы');
			$('#orderContainer > div > a.green_beauty').text('Узнагарода');
			$(".wcontent h3").text("Штодзённы загад выканан");
			$(".wcontent a").text("Атрымаць узнагароду");
			$(".wcontent #result_salary small").text("Розных частак РПГ");
			$(".wcontent #result_products small").text("Батончык");
			$(".wcontent .building").attr("src","https://dl.dropbox.com/u/68604040/EREP/daily_order.png")
			// daily task
			$('.column > .boxes.daily_tasks > h1').text('Штодзённыя дзеянні');
			$('.column > .boxes.daily_tasks > div > strong').text('Працуйце і трэніруйцеся');
			$('.column > .boxes.daily_tasks > div > a.blue_beauty').text('Мае месцы').attr("title","Мае месцы");
			$('.column > .boxes.daily_tasks > div > a.green_beauty').text('Узнагарода');
			// daily task pop-box
			$('#daily_pop > h3').text('Штодзённыя дзеянні');
			$('#daily_pop > h2').text('Уражлівае дасягненне!');
			$('#daily_pop small:eq(0)').text('сілы');
			$('#daily_pop small:eq(1)').text('вопыту');
			$('#daily_pop > a').text('та');
			// battle list
			$('#homepage_feed .column > h1.noborder:eq(0)').text('Галоўныя падзеі');
			$("#battle_listing > h4:exact('Campaign of the day')").text('Бітва дня');
			$("#battle_listing > h4:contains('Allies')").text('Бітвы за саюзнікаў');
			$("#battle_listing > h4:contains('Campaigns')").text('Актуальныя Бітвы '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns',' ').text());
			$("#battle_listing span:exact('Fight')").text('Да Бітвы');
			$('#battle_listing .rest > a:eq(0)').text('Ваенныя кампаніі');
			$('#battle_listing .rest > a:eq(1)').text('Апошнія падзеі');
			$('#battle_listing > ul.resistance_war').find('a#fundRW_btn > span').text('Дапамагчы');
			$('#battle_listing > ul.resistance_war').find('.info > small').text('Паўстанне ў');
			// top news
			$('#homepage_feed .column > h1.noborder:eq(1)').text('Навіны прэсы');
			$('.media_widget > a.more_news').text('Больш навін');
			$('.media_widget .mini_news_categories span').text('Рубрыкі:');
			// citizen feed
			$('#wall_master > h1').text('Навіны');
			$("li#show_friends_feed > a").text("Сябры");
			$('#citizen_feed form#wall_post > textarea#shout').text('Напішыце што-небудзь');
			$('#citizen_feed a.report').text('Паскардзіцца');
			$('#citizen_feed a.post_button > b').text('Адправіць');
			$('#citizen_feed a.previous_comments').text('Папярэднія каментарыі');
			$("#citizen_feed a[trigger='reply']").text('Каментаваць');
			$("#citizen_feed a[trigger='post_like']").text('Падтрымліваю');
			$("#citizen_feed a[trigger='post_unlike']").text('Не Падтрымліваю');
			$("#citizen_feed span[trigger='add_comment']").text('Адправіць');
			$('#citizen_feed textarea.comment_reply_post').text('Каментаваць');
			$('#citizen_feed div.fake_input').text('Напішыце што-небудзь');
			$('#citizen_feed').find("div.vote_bar em:contains('voted this.')").each( function() {
				$(this).find('b.personal').text('Ви, ');
				$(this).replaceText('and','та').replaceText('voted this.','падтрымаў (лі) гэта');});
			$('#citizen_feed > .previous_posts > a > span').text('Папярэднія запісы');
			// news list
			$('#news.box > .title > h1:first').text('Прэса');
			$('#articles > div > a.mbutton:eq(0) > span').text('Першыя крокі ў гульне');
			$('#articles > div > a.mbutton:eq(1) > span').text('Ваенныя загады');
			$('#articles > div > a.mbutton:eq(2) > span').text('Аналіз ваенных падзей');
			$('#articles > div > a.mbutton:eq(3) > span').text('Палітычныя дэбаты');
			$('#articles > div > a.mbutton:eq(4) > span').text('Эканоміка і фінансы');
			$('#articles > div > a.mbutton:eq(5) > span').text('Грамадства');
			$('#articles > div > a.mbutton:eq(6) > span').text('Газеты, на якія вы падпісаны');
		};
		 // 任務清單
	function missionstats() {
		//$(".mission_pop h3 b:contains('Society builder')").text('社交達人');
		$(".mission_pop .content > em:contains('You can be really powerful only by having your friends near you.')").text('Сапраўдная сіла ў субратаў');
		$(".mission_pop .requirements .req_content li:eq(0) strong:contains('Get the Society Builder Achievement.')").text('Атрымай медаль Ботовода');
		$(".mission_pop .requirements .req_content li:eq(0) small:contains('Invite 10 people to eRepublik and help them reach level 10.')").text('Запрасі 10 сябраў і дапамажы ім дасягнуць 10-га ўзроўню. За стварэнне некалькіх акаўнтаў забаніць усе.');

    //$(".mission_pop h3 b:contains('Training Day')").text('開始訓練');
    $(".mission_pop .content > em:contains('Strength is important, train every day to increase it')").text('Сіла вельмі важна. Трэніруйся кожны дзень');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Train for the first time')").text('Треніруйся першы раз');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Click the Train button from your Training Grounds')").text('Націсніце кнопку Трэніравацца ў трэніровачных пляцоўках');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('My training grounds')").text('Трэніровачныя пляцоўкі');

    //$(".mission_pop h3 b:contains('First Steps in Battle')").text('初入戰場');
    $(".mission_pop .content > em:contains('Increase your military rank by fighting on the battlefield')").text('Павышай свае воінскае званне удзельнічаючы ў бітвах');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Click the Fight button on the battlefield')").text('Націсніце кнопку агонь у адной з бітваў');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('Go to Military campaigns')").text('Перайсці да Бітваў');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Achieve the military rank of Private')").text('Заслужы званне Private');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Restore 100 health in one day')").text('Аднаві 100 здароўя за адзін дзень');

   //$(".mission_pop h3 b:contains('A Future Hero')").text('未來英雄');
    $(".mission_pop .content > em:contains('Fight until you defeat your enemies to help your country')").text('Змагайся да смерці ворагаў тваёй краіны');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Defeat 5 enemies')").text('Спраўся з 5 ворагамі');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Go to a battle and click the Fight button until you defeat the enemy')").text('Выбяры бітву і табунуй агонь пакуль не пераадолееш 5 праціўнікаў');

    //$(".mission_pop h3 b:contains('First Paycheck')").text('第一份薪水');
    $(".mission_pop .content > em:contains('Work day after day to increase your wealth')").text('Працуй кожны дзень, каб прымножыць ўласнае багацце');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Get a job')").text('Уладкуйся на працу');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Go to My places and click Get a job')").text('Зайдзі ў Мае спадарства і націсні Уладкавацца на працу');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('My places')").text('Мае спадарства');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Work')").text('Працаваць');

    //$(".mission_pop h3 b:contains('Daily Task')").text('每日任務');
    $(".mission_pop .content > em:contains('Dedicated players get rewards every day')").text('Настойлівыя гульцы атрымліваюць ўзнагароджанне кожны дзень');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Complete the Daily task')").text('Выканай Штодзенныя дзеянні');

    //$(".mission_pop h3 b:contains('Leveling Up')").text('等級提升');
    $(".mission_pop .content > em:contains('Fighting is a good way of earning experience points and advancing to a higher level')").text('Удзел у бітвах - лепшы спосаб атрымліваць балы вопыту і паднімаць ўзровень');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Reach Level 5')").text('Дасягнуць ўзроўня 5');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Work, train and fight every day to have a higher level')").text('Працуй, трэніруйся і бейся кожны дзень для павышэння ўзроўню');

      //$(".mission_pop h3 b:contains('A Better Place to Live in')").text('封建時代');
    $(".mission_pop .content > em:contains('Having a high quality Town Center helps you fight more every day')").text('Чым больш узровень Гарадской ратушы, тым больш ты зможаш ваяваць кожны дзень');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Upgrade Town Center to Level 2')").text('Падымі ўзровень Гарадской ратушы да ўзроўню 2');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Go to your Health Buildings and click on Upgrade Town Center')").text('Зайдзі ў Иншыя будынкі і націсні Палепшыць гарадскую ратушу');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('My health expansions')").text('Іншыя будынкі');

    //$(".mission_pop h3 b:contains('Join the Army')").text('加入軍團');
    $(".mission_pop .content > em:contains('The army is about being united and fighting where your country needs you')").text('Войска яднае ў барацьбе за тваю краіну');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Join a military unit')").text('Паступі ў Ваеннае Падраздзяленне');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Go to the Military unit page to choose your military unit')").text('Зайдзі на старонку Вайсковае падраздзяленне для выбару MU (Military Unit)');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('See recommended Military Units')").text('Паглядзець рэкамендаваныя Падраздзяленні');

    //$(".mission_pop h3 b:contains('Full Membership')").text('正式成員');
    $(".mission_pop .content > em:contains('Defeating enemies will help you become a full member')").text('Пераадоленне ворагаў дазволіць табе стаць паўнапраўным членам MU');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Acquire full membership in your military unit')").text('Стань паўнапраўным чальцом MU');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Complete the recruit's orders to become a full member')").text('Выканай заданне для навабранцаў');

    //$(".mission_pop h3 b:contains('Every Day Job')").text('每天上工');
    $(".mission_pop .content > em:contains('Work and train every day so that your country can rely on you!')").text('Працуй і трэніруйся кожны дзень, каб твая краіна магла на цябе пакласціся');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Work for 2 days')").text('Працуй 2 дні');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Train for 2 days')").text('Треніруйся 2 дні');
    $(".mission_pop .requirements .req_content li:eq(1) a:contains('My training grounds')").text('Трэніровачныя пляцоўкі');

    //$(".mission_pop h3 b:contains('Refill your Inventory')").text('補充庫存');
    $(".mission_pop .content > em:contains('Need more products? Go to the marketplace!')").text('Патрэбны тавары? Адпраўляйся на Рынак');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Buy 10 food')").text('Купі 10 адзінак ежы');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Buy Food from the marketplace')").text('Купі 10 адзінак ежы на Рынку');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('Go to Marketplace')").text('Рынак');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Buy 5 weapons')").text('Купі 5 адзінак зброі');
    $(".mission_pop .requirements .req_content li:eq(1) small:contains('Buy Weapons from the marketplace')").text('Купі 5 адзінак зброі на Рынку');
    $(".mission_pop .requirements .req_content li:eq(1) a:contains('Go to Marketplace')").text('Рынак');

    //$(".mission_pop h3 b:contains('Complete your Orders')").text('完成目標');
    $(".mission_pop .content > em:contains('The army is about being united and fight where the country needs you.')").text('Войска яднае ў барацьбе за тваю краіну');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Complete Daily Order')").text('Выканай Штодзенны загад');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Defeat 25 enemies in the Daily Order battle to receive a reward')").text('Спраўся з 25 ворагамі ў бітве, што стаіць у Штодзённым загадзе, каб Атрымаць узнагароду');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Restore 300 health in one day')").text('Аднаві 300 здароўя за адзін дзень');

    //$(".mission_pop h3 b:contains('Rank Up')").text('軍階提升');
    $(".mission_pop .content > em:contains('Fight every day to increase your rank')").text('Ваюйце кожны дзень, каб павысіць Ваша званне');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Achieve the military rank of Sergeant')").text('Набудзьце званне Sergeant');

    //$(".mission_pop h3 b:contains('Strength Up')").text('力量提升');
    $(".mission_pop .content > em:contains('The stronger you are, the higher your damage will be')").text('Чым ты мацней, тым мацней ўдар');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Reach 50 strength')").text('Натренируй 50 сілы');

    //$(".mission_pop h3 b:contains('Start Production')").text('開始生產');
    $(".mission_pop .content > em:contains('Work in your companies to produce stock so that you can fight more.')").text('Work in your companies to produce stock so that you can fight more');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Work in your own companies')").text('Працюйте на власних підприємствах');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Choose to work as manager in your companies and start production')").text('Choose to work as manager in your companies and start production');

    //$(".mission_pop h3 b:contains('First Weapon Factory')").text('第一間武器工廠');
    $(".mission_pop .content > em:contains('It's easier to take down enemies when having weapons rather than fighting with your bare hands.')").text('Ворага лягчэй адолець са зброяй, чым пустымі рукамі');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Have 1 Weapons Factory')").text('Купіць зброярню');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Once you have a Weapons Factory you can start producing Weapons')").text('Як толькі Вы купіце зброярню, Вы зможаце вырабляць зброю');
    $(".mission_pop .requirements .req_content li:eq(0) a:contains('Go to Build menu')").text('Пабудаваць');

   //$(".mission_pop h3 b:contains('A better place to live (II)')").text('城堡時代');
    $(".mission_pop .content > em:contains('Have a high quality Town center. It helps you fight more every day')").text('Have a high quality Town center. It helps you fight more every day');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Upgrade your Town center to level 3')").text('Upgrade your Town center to level 3');

    //$(".mission_pop h3 b:contains('True Patriot')").text('愛國者');
    $(".mission_pop .content > em:contains('The time has come! Face your biggest opponent and help your country prevail.')").text('The time has come! Face your biggest opponent and help your country prevail');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Have 20 Weapons')").text('Have 20 Weapons');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Defeat 30 enemies in a war against your Natural Enemy.')").text('Defeat 30 enemies in a war against your Natural Enemy');

    //$(".mission_pop h3 b:contains('Work with your friends (I)')").text('幫你的好友工作part 1');
    $(".mission_pop .content > em:contains('Work with your friends for a better productivity.')").text('Work with your friends for a better productivity');
    $(".mission_pop .requirements .req_content li:eq(0) strong:contains('Post a job offer and hire a citizen')").text('Post a job offer and hire a citizen');
    $(".mission_pop .requirements .req_content li:eq(0) small:contains('Select the Manage employees button from your companies page.')").text('Select the Manage employees button from your companies page');
    $(".mission_pop .requirements .req_content li:eq(1) strong:contains('Pay one salary to another citizen')").text('Pay one salary to another citizen');
    $(".mission_pop .requirements .req_content li:eq(1) small:contains('Check the salaries in your country and your offer.')").text('Check the salaries in your country and your offer');

	window.setTimeout(missionstats, 500);
};
		
		if (document.location.toString().indexOf("/company/create")!==-1) {
			// economy.erepublik.com/en/company/create
			$('h1').css('font-family','Arial,Arial');
			$('h3').css('font-family','Arial,Arial');
			// create company
			$('h1:first').text('Заснаваць');
			$('.create_building > h3:first').text('Выберыце тып');
			$(".create_links > a[title='Food Raw Materials'] > span").text('Зерне');
			$(".create_links > a[title='Weapon Raw Materials'] > span").text('Жалеза');
			$(".create_links > a[title='Factories'] > span").text('Фабрыкі');
			$(".create_links > a[title='Storage'] > span").text('Сховішча');
			$(".create_links > a[title='Training grounds'] > span").text('Трэніровачныя пляцоўкі');
			$('.create_building > h3#second_title').text('Выберыце будынак');
			$('ul.buildings > li.food:eq(0) > a > strong').text('Зернева ферма');
			$('ul.buildings > li.food:eq(1) > a > strong').text('Фруктовы сад');
			$('ul.buildings > li.food:eq(2) > a > strong').text('рыбацкі домік');
			$('ul.buildings > li.food:eq(3) > a > strong').text('Кароўнік');
			$('ul.buildings > li.food:eq(4) > a > strong').text('Паляўнічы домік');
			$('ul.buildings > li.weapon:eq(0) > a > strong').text('Жалезная шахта');
			$('ul.buildings > li.weapon:eq(1) > a > strong').text('Нафтавая свідравіна');
			$('ul.buildings > li.weapon:eq(2) > a > strong').text('Алюмініевая шахта');
			$('ul.buildings > li.weapon:eq(3) > a > strong').text('Шахта салетры');
			$('ul.buildings > li.weapon:eq(4) > a > strong').text('Каўчукавая плантацыя');
			$("ul.buildings > li.factories > a > strong:contains('Food')").text('Пякарня');
			$("ul.buildings > li.factories > a > strong:contains('Weapons')").text('Фабрыка зброї');
			$("ul.buildings > li.storage > a > strong:contains('Normal')").text('Звычайнае Сховішча');
			$("ul.buildings > li.storage > a > strong:contains('Large')").text('Велікае Сховішча');
			$('ul.buildings > li.train:eq(0) > a > strong').text('Басейн');	
			$('ul.buildings > li.train:eq(1) > a > strong').text('Перакладзіна');
			$('ul.buildings > li.train:eq(2) > a > strong').text('Стрэльбішча');
			$('ul.buildings > li.train:eq(3) > a > strong').text('Палігон');
			$('ul.buildings > li.train > .train_cost').replaceText('train','трэн.');
			$('form#companyCreateForm a#construct > span').text('Будаваць');
		};
		if (document.location.toString().indexOf("/market/")!==-1) {
			
			$('h1').css('font-family','Arial,Arial');
			$('h4').css('font-family','Arial,Arial');
			// market
			$("#marketplace > h1:contains('Marketplace')").text('Рынак');
			$("#filters_expanded > h4:contains('Select product')").text('Выберыце тавар');
			$(".product_selector > ul > li > a[title='Food'] > strong").text('Ежа');
			$(".product_selector > ul > li > a[title='Weapons'] > strong").text('Зброя');
			$(".product_selector > ul > li > a[title='House'] > strong").text('Будынкі');
			$(".product_selector > ul > li > a[title='Moving Tickets'] > strong").text('Квіткі');
			$(".product_selector > ul > li > a[title='Food Raw Materials'] > strong").text('Зерне');
			$(".product_selector > ul > li > a[title='Weapon Raw Materials'] > strong").text('Жалеза');
			$(".product_selector > ul > li > a[title='Hospital'] > strong").text('Шпіталі');
			$(".product_selector > ul > li > a[title='Defense System'] > strong").text('Сістэмы абароны');
			$(".product_selector > ul > li.last > a > strong").text('Прадпрыемствы');
			$("#filters_expanded > #minReq > h4:contains('Select quality')").text('Выберыце якасць');
			$("#filters_summary > .sactual > .sattr > small:exact('Health restore')").text('Аднаўленне здароўя');
			$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('Магутнасць');
			$("#filters_summary > .sactual > .sattr > small:exact('Durability')").text('К-ць выстралаў');
			$("#filters_summary > .sactual > .sattr > small:exact('Health')").text('Здароўе');
			$("#filters_summary > .sactual > .sattr > small:exact('Moving Distance')").text('Адлегласць паездкі');
			$("#filters_summary > .sactual > .sattr > small:exact('Uses/Player')").text("Колькасць раз / кожны гулец");
			$("#filters_summary > .sactual > .sattr > small:exact('Defense Budget')").text("Моц");
			$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ use')").text('/ за раз');
			$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ day')").text('/ дзень');
			$("#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact(' uses')").text(' раз');
			$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("use(s)")').text('раз');
			$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("day(s)")').text('днів');
			$('#filters_summary > .sactual > .sattr > div > span.solid.moving_distance > strong:exact("zone(s)")').text('зоны');
			$("#filters_summary > .sactual > .schange > a > span:contains('Change')").text('змяніць');
			$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Product')").text('Прадукт');
			$('#marketplace > table > thead > tr.m_mainh > th.m_provider').text('Прадавец');
			$('#marketplace > table > thead > tr.m_mainh > th.m_stock').text('На Сховішча');
			$("#marketplace > table > thead > tr.m_mainh > th.m_price > a[title='Price']").text('Кошт');
			$('#marketplace > table > thead > tr.m_mainh > th.m_quantity').text('К-сць');
			$('#marketplace > table > tbody > tr > td.m_buy > a > span').text('Купіць');
			$("table.info_message > tbody > tr > td:contains('There are no market offers matching you search.')").text('Прапановы па запыце адсутнічаюць.');
			};
		if (document.location.toString().indexOf("/economy/job-market/")!==-1) {
				// economy.erepublik.com/en/market/job/
				// job market
				$("#job_market > h1:contains('Job market')").text("Цэнтр занятасці");
				$("table.info_message > tbody > tr > td:contains('You already work for ')").replaceText('You already work for ','Вы ўжо працуеце на ').replaceText('. To apply for this job you have to quit your current job.',". Каб ўладкавацца на новае прадпрыемства, Вам неабходна звольніцца з папярэдняга.");
				$('#job_market > table > thead > tr.jm_mainh > th.jm_company').text('Наймальнік');
				$('#job_market > table > thead > tr.jm_mainh > th.jm_industry').text(' ');
				$('#job_market > table > thead > tr.jm_mainh > th.jm_salary > a').text('Плата');
				$('#job_market > table > thead > tr > th.jm_apply > a > span').text('Уладкавацца');
			//};
		};
		
			if (location.indexOf("/company/sell/")!==-1) {
				// company sell
				$('.sell_company > h2:first').text('Продаж або закрыццё прадпрыемства');
				$('.sell_company > .disolve_company > h2:first').text('Закрыццё прадпрыемства');
				$('.sell_company > .disolve_company > table > tbody > tr > td > p').replaceText('You can dissolve your company for','Вы можаце зачыніць прадпрыемства па');
				$(".sell_company > .disolve_company > table > tbody > tr > td > a[title='Dissolve company'] > span").text('Зачыніць прадпрыемства');
				$("table.info_message > tbody > tr > td:contains('Raw Material buildings cannot be sold.')").text('Сыравінныя пидприемтсва не могуць быць прададзеныя.')
				$("table.info_message > tbody > tr > td:contains('This building cannot be sold nor dissolved.')").text('Прадпрыемства не можа быць прададзена або закрыта.')
				//$("table.info_message > tbody > tr > td:contains('Dissolving a company will empty')").text('????????????????, ???????????????.')
				$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").replaceText('This company can be put on sale starting with','Прадпрыемства можа быць пастаўлена на продаж пасля').replaceText('of the New World, at',' ').replaceText("(10 days since it was created or bought).","10 дзён з часу заснавання або куплі");
			};
		//};
		if (location.indexOf("/messages")!==-1){
			$('#topratedtab > a > span').text('Лісты');
			$('ul.tabs > li:eq(1) > a > span').text('Паведамленне');
			
		};



		if (location.indexOf("/economy")!==-1){
			//! www.erepublik.com/en/economy*
			// Economy
			$(".top_tabs > li > a.companies").attr("original-title","Кампаніі");
			$(".top_tabs > li > a.training_grounds").attr("original-title","Трэніровачныя пляцоўкі");
			$(".top_tabs > li > a.storage").attr("original-title","Сховішча");
			$(".top_tabs > li > a.health_buildings").attr("original-title","Іншыя будынкі");	
			//! www.erepublik.com/en/economy/myCompanies
			// My Companies
			if (location.indexOf("/myCompanies")!==-1) {
				//! www.erepublik.com/en/economy/myCompanies
				// My Companies
				$('h1').css('font-family','Arial,Arial');
				$(".close").each(function(index) {
				  $(this).attr("title","Закрыць акно");
				  $(this).text("Закрыць");
				});
				// employer
				$(".employer > h4").text('Наймальнік');
				$(".required_health > em").text("Здароўе");
				$(".employer_salary > em:contains('Gross Salary')").text("Плата");
				$(".employer_salary > em:contains('Tax')").text("Падатак");
				$("a#work.green_enlarged > span").text("Працювати");
				$(".resign").text("Звільнитися").attr("title","Вызваліцца");
				// popup windows
				$("#work_results a[title='Show details'] > span:eq(0)").text('Дэталі');
				$("#work_results a[title='Show details'] > span:eq(1)").text('Дэталі');
				$('#work_results .wdetails_bar > #national_bonus > div:first > small').text('Бонус ад рэсурсаў краіны');
				$('#work_results .wdetails_bar > .list.stats > div:first > small').text('Вынікі працы');
				$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Days worked in a row']").attr('title','Адпрацавана дзён');
				$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Experience points']").attr('title','Балаў вопыту');
				$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Health loss']").attr('title','Выдаткавана здароўя');
				$("#work_results .wdetails_bar > .list.stats > div:last > div[title='Raw materials used']").attr('title','Ужыта сыравіны');
				$('#work_results .fixer h1').text("Вынікі працы");
				$('#work_results .details_holder ul > li:eq(0)').attr("title","Засталося працаваць дзён, каб атрымаць медаль добрасумленных работнікаў");	
				$('#work_results .details_holder ul > li:eq(1)').attr("title","Адпрацавана дзён запар");
				$('#work_results .details_holder ul > li:eq(2)').attr("title","Атрымана балаў вопыту");
				$('#work_results .details_holder ul > li:eq(3)').attr("title","Выдаткавана здароўя");	
				$('#work_results .salary_tooltip h4').text("Дэталі аб заробках");
				$('#work_results .salary_tooltip ul > li:eq(0)').text("Плата");
				$('#work_results .salary_tooltip ul > li:eq(1)').text("Падатак");
				$(".area > h4").replaceText("My companies","Мае кампаніі");
				$('.manager_dashboard .list > div.area > h4') .find("a:contains('How to manage your companies')") .replaceText('How to manage your companies','Як кіраваць сваімі кампаніямі?');
				$('.tutorial_pop h1') .replaceText('Learn how to manage your companies','Як кіраваць? (націсніце)');
				$('.tutorial_pop') .live("click",function(){
					$('h2 > span#tut_subtitle') .replaceText('Choose the companies in which you want to work as a manager','Выберыце прадпрыемствы, у якіх Вы хочаце працаваць самастойна.') .replaceText('Check how many of your employees came to work so far','Калі ласка, праверце, колькі наёмных работнікаў ужо адпрацавала.') .replaceText('Assign them to your companies','Размяркуйце іх працу паміж прадпрыемствамі.') .replaceText(" When you are happy with your management decisions,","Скончыўшы, націсніце ").replaceText('start production!','Пачаць вытворчасць!');
					$('small > span') .replaceText("Don't worry about your current health. If necessary, you will be eating food automatically. Just make sure you have enough food in inventory and enough health left to recover.",'Ежа выкарыстоўваецца аўтаматычна, калі яна ёсць у Вас у сховішчы.');
					$('small > span') .replaceText("The employees come to work and get their salary paid, but they are not producing anything until you decide where to use them.",'Наёмныя работнікі ўжо не працуюць у пэўным прадпрыемстве. Яны аддаюць Вам сваю працу і атрымліваюць за гэта зарплату. На якіх прадпрыемствах выкарыстоўваць іх працу, Вы вырашаеце самі.');
					$('small > span') .replaceText("Each company can support a limited number of employees. Upgrading companies or building better raw materials companies will increase the number of employees you can hire and assign.",'Колькасць супрацоўнікаў, якія могуць адпрацаваць на пэўным прадпрыемстве, залежаць ад яго узроўню.');
					$('small > span') .replaceText("You can start production as many times you want during a day as long as you still have unassigned employees or companies you didn't work in as a manager yet. However, it will be easier for you to start production only once a day.",'Вы можаце пачынаць вытворчасць мноства разоў у суткі. Пры ўмове, што яшчэ засталіся месцы дзе адпрацавалі работнікі або Вы самі.');
					$('.main > span') .text('Далей');
				});
				$('.solid_pop .inner .message > div.text > h4.food_warning') .replaceText('Not enough food to eat in order to recover health','Недастаткова ежы ў сховішчы');
				$('.solid_pop .inner .message > div.text > h4.health_warning') .replaceText('Health limit exceeded','Здароўе яшчэ не аднавілася');
				$('.solid_pop .inner .message > div.text > h4.storage_warning') .replaceText('Storage limit exceeded','Недастаткова месца ў сховішчы');
				$('.solid_pop .inner .message > div.text > h4.works_warning') .replaceText('Too many employees assigned','Занадта шмат працаўнікоў размешчаны');
				$('.solid_pop .inner .message > div.text > h4.raw_warning') .replaceText('Not enough raw materials','Недастаткова сыравіны');
				$('.solid_pop .inner .message > div.text > h4.food_raw_warning') .replaceText('Not enough food raw materials','Недастаткова зерня');
				$('.solid_pop .inner .message > div.text > h4.weapon_raw_warning') .replaceText('Not enough weapon raw materials','Недастаткова жалеза');
				$('.solid_pop .inner .message > div.text > h4.money_warning') .replaceText('Not enough money to pay your salary','Недастаткова грошаў для зарплаты');
				$('.solid_pop .inner .message > div.text > h4.work_limit_warning') .replaceText('Your employer cannot receive any more employees today','Ваш Наймальник ўжо не можа прыняць Вашу працу сёння');
				$('.solid_pop .inner .message > div.text > h4.nothing_selected') .replaceText("No employees or work as manager assigned, nothing to produce",'Ніхто не прызначаны на працу.');
				$('.solid_pop a.raw_warning span').text('Купіць на рынку');
				$('.solid_pop a.food_raw_warning span').text('Купіць на рынку');
				$('.solid_pop a.weapon_raw_warning span').text('Купіць на рынку');
				$('.solid_pop a.storage_warning span').text('Палепшыць Сховішча');
				$('.solid_pop a.food_warning span').replaceText('Buy from market','Купіць на рынку');
				$('.solid_pop .action span') .replaceText('Cancel','Адмяніць');
				$('#energy_bar_pop .solid_pop h4').text("Батончыкі выкарыстоўваць для аднаўлення здароўя");
				$('#energy_bar_pop a#consume_energy span').text("Пачаць вытворчасць");
				$('#production_results h1').text("Вынікі:");
				$('#production_results .details_holder strong:first').text("Бонусы");
				$('#production_results .details_holder strong.production_stats').text("Вынік");
				$('#production_results .details_holder ul:eq(1) > li:eq(0)').attr("title","Засталося працаваць дзён, каб атрымаць медаль добрасумленных работнікаў");
				$('#production_results .details_holder ul:eq(1) > li:eq(1)').attr("title","Адпрацавана дзён запар");
				$('#production_results .details_holder ul:eq(1) > li:eq(2)').attr("title","Атрымана балаў вопыту");
				$('#production_results .details_holder ul:eq(1) > li:eq(3)').attr("title","Выдаткавана здароўя");
				$('#production_results .details_holder ul:eq(1) > li:eq(4)').attr("title","Назначана работнікаў");
				$('#production_results .details_holder ul:eq(1) > li:eq(5)').attr("title","Выдаткавана зерна");
				$('#production_results .details_holder ul:eq(1) > li:eq(6)').attr("title","Выдаткавана жалеза");
				$('#production_results .details_holder ul:eq(1) > li:eq(13)').attr("title","Выдаткавана пажыўных Батончыкаў");
				$('.hard_worker p').replaceText("You have","Трэба адпрацаваць яшчэ ").replaceText("left to work to get the Hardworker medal","каб атрымаць медаль добрасумленных работнікаў");
				$('.hard_worker p span').replaceText("days","дзён, ");
				$('a.more_details').attr("title","Паказаць Дэталі");
				$('a.more_details span').text("Паказаць Дэталі");
				$('.manager_dashboard .green_enlarged span') .replaceText('Start production','Пачаць вытворчасць');
				$('.manager_dashboard .list .area .green_enlarged') .attr('title','Пачаць вытворчасць');
				$(".warning_notice").text("Не хапае грошаў, каб заплаціць работнікам за адзін дзень.");
				$(".c1 > strong").text("Кампаніі");
				$(".c2 > strong").text("Праціўнікі");
				$(".c3 > strong").text("Працаваць");
				$(".heading > .c4 > strong").text("Рэсурсы");
				$(".heading > .c5 > strong").text("Вынік");
				$(".grey_plastic.left_pos").attr("title","Заснаваць кампанію");
				$(".grey_plastic.mid").attr("title","Прадаць/Знішчыць кампанію");
				$(".grey_plastic.right_pos").attr("title","Палепшыць / пагоршыць кампаніі");
				$(".c2 > a").attr("title","Кіраваць работнікамі");
				$(".c4 > a").attr("title","Купіць на рынку");
				$(".employees_available > em").text("Назначана работнікаў");
				$(".raw_materials > em").text("Рэсурсы");
				$("#start_production > span").text("Пачаць вытворчасць");
			} else if (location.indexOf("/training-grounds")!==-1){
				//! www.erepublik.com/en/economy/training-grounds
				// Training grounds
				$("h4").text("Трэніровачныя пляцоўкі");
				$(".c1 > strong").text("Пляцоўкі");
				$(".grey_plastic.left_pos").attr("title","Пабудаваць новыя Пляцоўкі");
				$(".grey_plastic.right_pos").attr("title","Палепшыць Пляцоўкі");
				$(".heading > .c2 > strong").text("Трэніравацца");
				$(".heading > .c3 > strong").text("Цана");
				$(".heading > .c4 > strong").text("Атрымаеш сілы");
				$("strong.raw_production:contains('Free')").text("Бясплатна");
				$(".required_health > em").text("Здароўе");
				$(".required_health > strong").attr("title","Неабходна здароўя");
				$(".gold_cost > em").text("Золата");
				$(".gold_cost > strong").attr("title","Неабходна золата");
				$("a#start_train.green_enlarged").html("<span>Трэніравацца</span>").attr("title","Трэніравацца");
				// poopup
				$(".solid_pop > a").attr("title","Закрыць акно").text("Закрыць");
				$("#train_results .fixer > h1").text("Вынікі трэніроўкі");
				$("#train_results .fixer > .inner > .details_holder > div > strong").text("Статыстыка");
				$("#train_results .fixer > .inner > .details_holder > div > p").text("Бонус натуральнага ворага і бонус сябраў больш не дзейнічаюць");
				$("#train_results .fixer > .inner > .hard_worker > p").replaceText("You need an additional","Неабходна яшчэ ").replaceText("to get the Super Soldier Medal.",", каб атрымаць медаль Салдата.");
				$("#train_results .fixer > .inner > .hard_worker > p > span").replaceText("strength points","сілы");
				$("#train_results .fixer > .inner > a").text("Дэталі").attr("Паказаць Дэталі");
				$("#train_results .fixer > .inner > .details_holder > div > ul > li:eq(0)").attr("title","Зараз сілы");
				$("#train_results .fixer > .inner > .details_holder > div > ul > li:eq(1)").attr("title","Вопыт");
				$("#train_results .fixer > .inner > .details_holder > div > ul > li:eq(2)").attr("title","Выдаткавана здароўя");
				$("#train_results .fixer > .inner > .details_holder > div > ul > li:eq(3)").attr("title","Выдаткавана золата");
				$("#train_results .fixer > .inner > .details_holder > div > ul > li:eq(10)").attr("title","Патрачана Батончыкаў");
			} else if (location.indexOf("/inventory")!==-1) {
				//! www.erepublik.com/en/economy/inventory
				// Storage
				$('#inventory_overview span').css('font-family','Arial,Arial');
				$('#inventory_overview > a > strong').css('font-family','Arial,Arial');
				// storage
				$('.area.storage > h4').replaceText("Storage",'Сховішча');
				$('.area.storage > h4 > a').attr("title","Додати Сховішча");
				$('#inventory_overview > h2:first > img.storage_tooltip').attr('title','Калі Вы жадаеце павялічыць ёмістасць, пабудуйце дадатковыя сховішчы.');
				$('#inventory_overview > .items_holder > h4:eq(0)').text('Тавар');
				$('#inventory_overview > .items_holder > h4:eq(1)').text('Сыравіна');
				$('#inventory_overview > .items_holder > h4:eq(2)').text('Скласці РПГ');
				$('#inventory_overview > .items_holder > h4:eq(3)').text('Ракета');
				$("ul.product_list > li:[industry='1'] > img").each(function() {$(this).attr("title","Спажыванне ежы аднаўляе ваша здароўе")});
				$("ul.product_list > li:[industry='2'] > img").each(function() {$(this).attr("title","Выкарыстанне зброі павялічвае нанесеныя вамі пашкоджанні")});
				$(".item_mask > ul > li:eq(0) > img").attr("title","Сыравіна, неабходная для вырабу ежы");//should work, but it doesn't! wtf?
				$(".item_mask > ul > li:eq(1) > img").attr("title","Сыравіна, неабходная для вырабу зброї");//should work, but it doesn't! wtf?
				$(".collection_list > ul > li:[title='Barrel']").attr('title','Труба');
				$(".collection_list > ul > li:[title='Scope']").attr('title','Прыцэл');
				$(".collection_list > ul > li:[title='M6A3 Rocket']").attr('title','Ракета');
				$(".collection_list > ul > li:[title='Trigger Kit']").attr('title','Спускавы модуль');
				$(".collection_list > ul > li:[title='Stock']").attr('title','Прыклад');
				$('.collection_list > a.assemble > span').text('Скласці').attr('title','Скласці');
				// bazooka
				$('.collection_list > .bazooka > .details > strong').html('РПГ'+
					'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="Вы можаце знайсці гэтыя Дэталі на поле або атрымаць ва ўзнагароду за выкананне сутачнага загаду.">');
				$('.collection_list > .bazooka > .details > small').text('Адзін выстрал - адзін труп');
				$('.collection_list > .bazooka > .details > p:eq(0)').attr('title','К-сць выстралаў');
				$('.collection_list > .bazooka > .details > p:eq(1)').attr('title','Пашкоджанні');
				$('.collection_list > .bazooka > .details > p:eq(1) > span').text('10000 за выстрал');
				// rocket
				$('.collection_list > .rockets > .details > strong').html('Ракета'+
					'<img src="http://www.erepublik.com/images/modules/storage/info.png" alt="" class="storage_tooltip" original-title="Вы можаце вырабіць толькі адну ракету ў дзень. Захоўваць можна толькі адну ракету, таму, калі ў вашым сховішчы ёсць ракета, вам неабходна яе выкарыстоўваць перад вырабам новай.">');
				$('.collection_list > .rockets > .details > small').text('Дае дадатковае пашкоджанне');
				$('.collection_list > .rockets > .details > p:eq(0)').attr('title','К-сць выстралаў');
				$('.collection_list > .rockets > .details > p:eq(1)').attr('title','Пашкоджанні');
				$('.collection_list > .rockets > .details > p:eq(1) > span').text('250,000 за выстрал');
				// control module
				$('#inventory_overview > a.inventory_sell > strong').text('Прадаць');
				$('#inventory_overview > a.inventory_sell > small').text('Продаж тавараў на рынку');
				$('#inventory_overview > a.inventory_buy > strong').text('Купіць');
				$('#inventory_overview > a.inventory_buy > small').text('Купіць рэчы на рынку');
				$('#sell_offers th.offers_product > strong').text('Тавар');
				$('#sell_offers th.offers_quantity > strong').text('К-сць');
				$('#sell_offers th.offers_price > .relative > strong#converted').text('Цана');
				$('#sell_offers th.offers_market > .relative > strong').text('Рынак');
				$('#sell_offers th.offers_market > .relative > small > a#buy_license').text('Купіць ліцэнзію');
				$('#sell_offers th.offers_action > a > span').text('Прадаць');
				$('#sell_offers a.delete_offer').attr('title','Адмяніць');
				$('.buy_market_shell > a#buy_market_license > span').text('Купіць дазвол на гандаль');
				$('.buy_market_shell > a#select_buy_license_country > span#buy_license_country_name').text('Выберыце краіну');	
			} else if (location.indexOf("/advanced-buildings")!==-1) {
				$(".area.health_buildings > h4").text("Іншыя будынкі");
				$(".heading > .c1 > strong").text("Будынкі");
				$(".heading > .c2 > strong").text("Бонус");
				$(".heading > .area_controls.c1 > div > a.grey_plastic").attr("title","Пабудаваць");
				$(".heading > .area_controls.c1 > div > a.grey_plastic.right_pos").attr("title","Палепшыць");
				$(".required_health.min.c2 > em").text("Максімум здароўя");
			} else if (location.indexOf("/manage-employees")!==-1){
				//Companies > Manage employees 
				$('.manager_dashboard .list h4') .replaceText('My Companies » Manage employees','Кіраваць наёмнымі работнікамі');
				$('.manager_dashboard .list .area.employees .active_offers .c12 strong > span') .replaceText('No','Няма');
				$('.manager_dashboard .list .area.employees .active_offers .c12 strong') .replaceText('active job offers','актыўных прапаноў') .replaceText('active job offer','актыўныя прапановы');
				$('.manager_dashboard .list .area.employees .bottom_details > .employees > em') .text('Работнік');
				$('.manager_dashboard .list .area.employees .bottom_details > .work_presence > em') .text('актыўныя прапановы');
				$('.manager_dashboard .list .area.employees .bottom_details > .total_dues > em') .text('Усяго зарабатнай платы');
				$('.heading .c1 strong').text('Работнікі');
				$('.heading .c2 strong').text('7 рабочых дзён прысутнасці');
				$('.heading .c3 strong').text('Плата');
			}
		};
		if (location.indexOf("/main/rankings-")!==-1){
			//! http://www.erepublik.com/en/main/rankings-*
			$(".ranking_filters > li:eq(0) > a > span").text("Грамадзяне");
			$(".ranking_filters > li:eq(1) > a > span").text("Партыі");
			$(".ranking_filters > li:eq(2) > a > span").text("Газеты");
			$(".ranking_filters > li:eq(3) > a > span").text("Краіны");
			$(".ranking_filters > li:eq(4) > a > span").text("МЮ");
			$(".ranking_filters > li:eq(5) > a > span").text("Лепшыя байцы");
			$("th:contains('Country')").text("Краіна");
			$("th:contains('Name')").text("Назва");
			if (location.indexOf("citizens")!==-1) {
				$(".info > h1").text("Лепшы грамадзянін");
				$("th:contains('Name')").text("Імя");				
				$("th:contains('Experience points')").text("Вопыт");
			} else if (location.indexOf("parties")!==-1) {
				$(".info > h1").text("Лепшыя партыі");
				$("th:contains('Members')").text("Чальцы");
			} else if (location.indexOf("newspapers")!==-1) {
				$(".info > h1").text("Лепшыя газеты");
				$("th:contains('Subscribers')").text("Падпісчыкаў");
				$(".info_message tbody tr td").text("Вы не маеце ўласнай газеты. Стварыце газету, каб убачыць Дэталі.");
			} else if (location.indexOf("countries")!==-1) {
				$(".info > h1").text("Лепшыя краіны");
				$("th:contains('Population')").text("К-сць насельніцтва");
			} else if (location.indexOf("military")!==-1) {
				$(".info > h1").text("Лепшыя МЮ");
				$("th:contains('Opponents')").text("Пераможана ворагаў");
			} else if (location.indexOf("damage")!==-1) {
				$(".info > h1").text("Лепшыя байцы");
				$("th:contains('Name')").text("Імя");
				$("th:contains('Country')").text("Краіна");
				$("th:contains('Total')").text("Агульны дамаг");
				$(".simple_sub li a").replaceText("Yesterday","Учора");
				$(".simple_sub li a").replaceText("days ago","дзён таму");
				$(".simple_sub li a:contains('5')").replaceText("days ago","дзён таму");
				$(".info_message tbody tr td").html("100 лепшых байцоў абнаўляюцца штодня каля 01:30 па часе eRepublik. <br> Враховування для бла-бла-бла доперевести(!).")
			};
		};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 個人 www.erepublik.com/en/main/citizen
		//          www.erepublik.com/en/economy/donate-items/
		//          www.erepublik.com/en/economy/donate-money/
		//   - 通貨 www.erepublik.com/en/economy/citizen-accounts/
		//   - 友達 www.erepublik.com/en/main/citizen-friends/
		//   - 移動 www.erepublik.com/en/citizen/change-residence
		//   - 暗証番号 www.erepublik.com/en/citizen/change-password
		//   - 編集 www.erepublik.com/en/citizen/edit/profile
		// 国籍 www.erepublik.com/en/citizenship
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if ((location.indexOf("/citizen")!==-1) || (location.indexOf("/economy/donate-")!==-1)) {
			$('h3').css('font-family','Arial,Arial');
			// layout menu
			$('.citizen_profile_header.auth > .citizen_edit > a > span').html('<img src="http://www.erepublik.com/images/modules/citizenprofile/edit.png">Правіць профіль');
			$('.citizen_profile_header.auth > .citizen_menu > li:eq(0) > a').text('Сябры');
			$('.citizen_profile_header.auth > .citizen_menu > li:eq(1) > a').text('Запрошаныя Сябры');
			//$('.citizen_profile_header.auth > .citizen_menu > li:eq(2) > a').text('Сховішча');
			$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Dead citizen')").replaceText('Dead citizen','Мёртвы гулец');
			$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Temporary banned')").replaceText('Temporary banned','Часова заблакаваны');
			$(".citizen_profile_header.auth > .citizen_state > div.is > span:contains('Permanent banned')").replaceText('Permanent banned','Заблакаваны назаўсёды');
			$('.citizen_profile_header.auth > .citizen_actions > a.action_friend.tip').attr('title','Дадаць у Сябры');
			$('.citizen_profile_header.auth > .citizen_actions > a.action_friend_remove.tip').attr('title','Выдаліць з Сябраў');
			$('.citizen_profile_header.auth > .citizen_actions > a.action_message.tip').attr('title','Напісаць ліст');
			$('.citizen_profile_header.auth > .citizen_actions > a.action_donate.tip').attr('title','Адправіць');
			$('.citizen_profile_header.auth > .citizen_status > div > small').text('Узровень вопыту');
			// profile sidebar
			$('.citizen_sidebar > div > small:eq(0)').html('Знаходзіцца ў: <a href="http://www.erepublik.com/en/citizen/change-residence" title="">(змяніць)</a>');
			$('.citizen_sidebar > div > small:eq(1)').html('Грамадзянства <a href="http://www.erepublik.com/en/citizenship" title="">(змяніць)</a>');
			$('.citizen_sidebar > div > .citizen_second > small:eq(0)').text('Дата нараджэння');
			$('.citizen_sidebar > div > .citizen_second > small:eq(1) > a').replaceText('National rank','Нацыянальны ранг:');
			$('.citizen_sidebar > .citizen_activity > div.place:eq(0) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_political_activity.png">Безпартыйны');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_member.png">Член');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Party President')").html('<img src="http://www.erepublik.com/images/modules/_icons/party_president.png">Прэзідэнт партыі');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Congress Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/congress_member.png">Член Кангрэсу');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > h3:contains('Country President')").html('<img src="http://www.erepublik.com/images/modules/_icons/country_president.png">Прэзідэнт краіны');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-left Wing')").text('Ультраправая');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-left Wing')").text('Левацэнтрыская');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center Wing')").text('Центрыская');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Center-right Wing')").text('Правацэнтрыская');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(0) > div > span > small:contains('Far-right Wing')").text('Ультраправая');
			$('.citizen_sidebar > .citizen_activity > div.place:eq(1) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_mu.png">Ніякай дзейнасці');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Recruit')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Рэкрут');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Member')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Баец');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Captain')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Капітан');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('2nd Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">Намеснік галоўнага');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(1) > h3:contains('Commander')").html('<img src="http://www.erepublik.com/images/modules/_icons/mu.png">галоўнакамандуючы');
			if ($('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity > a').length==1) {
				$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png"><a href="http://www.erepublik.com/en/create-newspaper">Заснаваць газету</a>');
			} else {
				$('.citizen_sidebar > .citizen_activity > div.place:eq(2) > h3.noactivity').html('<img src="http://www.erepublik.com/images/modules/_icons/no_media_activity.png">Газета адсутнічае');};
			$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Press director')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png">Рэдактар газеты');
			$(".citizen_sidebar > .citizen_activity > div.place:eq(2) > h3:contains('Create newspaper')").html('<img src="http://www.erepublik.com/images/modules/_icons/press_director.png"><a href="/en/create-newspaper">Заснаваць газету</a>');
			$('.citizen_sidebar > .citizen_activity > h4.friends_title').replaceText('Friends','Сябры ');
			$('.citizen_sidebar > .citizen_activity > a.view_friends').text('Паказаць');
			// profile content
			var cizName = $(".citizen_profile_header > h2").text();
			$('.citizen_content > .my_land_profile > p > strong').text(cizName+' прамысловасці:');
			$('.citizen_content > .my_land_profile > p').replaceText('buildings','будынка');
			$('.citizen_content > .my_land_profile > a > span').text("ісці");
			$('.citizen_content > h3.mbot2:eq(0)').html('Коратка пра сябе');
			$('.citizen_content > h3.mbot2:eq(1)').html('Дасягнення');
			// achievment
			$("ul#achievment > li:eq(0) > .hinter > span > p:eq(0) > strong").text("Добрасумленны работнік");
			$("ul#achievment > li:eq(0) > .hinter > span > p:eq(1)").text("Адпрацаваць 30 дзён запар");
			$("ul#achievment > li:eq(1) > .hinter > span > p:eq(0) > strong").text("Член Кангрэсу");
			$("ul#achievment > li:eq(1) > .hinter > span > p:eq(1)").text("Перамога на выбарах у Кангрэс");
			$("ul#achievment > li:eq(2) > .hinter > span > p:eq(0) > strong").text("Прэзідэнт");
			$("ul#achievment > li:eq(2) > .hinter > span > p:eq(1)").text("Перамога на Прэзідэнтских выбарах");
			$("ul#achievment > li:eq(3) > .hinter > span > p:eq(0) > strong").text("Прэмія ім.Васіля Быкава");
			$("ul#achievment > li:eq(3) > .hinter > span > p:eq(1)").text("1000 гульцоў падпісаліся на газету");
			$("ul#achievment > li:eq(4) > .hinter > span > p:eq(0) > strong").text("Герой Бітвы (БХ)");
			$("ul#achievment > li:eq(4) > .hinter > span > p:eq(1)").text("Нанесена больш за ўсіх пашкоджанняў у адным раўндзе");
			$("ul#achievment > li:eq(5) > .hinter > span > p:eq(0) > strong").text("Герой Кампаніі");
			$("ul#achievment > li:eq(5) > .hinter > span > p:eq(1)").text("Нанесена больш пашкоджанняў ў адной бітве");
			$("ul#achievment > li:eq(6) > .hinter > span > p:eq(0) > strong").text("Герой паўстання");
			$("ul#achievment > li:eq(6) > .hinter > span > p:eq(1)").text("Пачні паўстанне, якое скончыцца вызваленнем рэгіёну");
			$("ul#achievment > li:eq(7) > .hinter > span > p:eq(0) > strong").text("медаль Салдата (СС)");
			$("ul#achievment > li:eq(7) > .hinter > span > p:eq(1)").text("Натрэніруй 250 сілы");
			$("ul#achievment > li:eq(8) > .hinter > span > p:eq(0) > strong").text("Ботавод");
			$("ul#achievment > li:eq(8) > .hinter > span > p:eq(1)").text("Запрасі 10 гульцоў і дапамажы ім дасягнуць 10 ўзроўню");
			$("ul#achievment > li:eq(9) > .hinter > span > p:eq(0) > strong").text("Наёмнік");
			$("ul#achievment > li:eq(9) > .hinter > span > p:eq(1)").text("Забі 25 ворагаў за кожную з прадстаўленых ніжэй з 50-ці краін");
			$("ul#achievment > li:eq(10) > .hinter > span > p:eq(0) > strong").text("Найлепшы воін");
			$("ul#achievment > li:eq(10) > .hinter > span > p:contains('Have one of the highes')").replaceText('Have one of the highest daily influences in eRepublik for 30 different days','Набярыце найбольшуя колькасць Пашкоджанняў за суткі сярод усіх гульцоў на працягу 30 дзён');
			$("ul#achievment > li:eq(11) > .hinter > span > p:eq(0) > strong").text("Сапраўдны патрыёт");
			$("ul#achievment > li:eq(11) > .hinter > span > p:eq(1)").replaceText('Reach','Нанесці').replaceText('damage while fighting for','Пашкоджанні ў битве за ').replaceText('and prove you are a true patriot','і дакажыце, што Вы сапраўдны патрыёт').replaceText('Fought for the country of citizenship','Змагайцеся за краіну Вашага грамадзянства');
			$("ul#achievment > li:eq(11) > .hinter > span > p:eq(1) > small").text("Ваш цяперашні паказчык Вы можаце прагледзець унізе ў Сапраўдны патрыёт");
			// military skill
			$(".citizen_content > h3:contains('Military Attributes')").html('<br><br><br><br><br>Ваенныя навыкі');
			$('.citizen_content > .citizen_military:eq(0) > strong:first').text('Сіла');
			$('.citizen_content > .citizen_military:eq(0) > div > small:first').replaceText('Super Soldier:','Супер Салдат:');
			$('.citizen_content > .citizen_military:eq(1) > strong:first').text('Званне');
			$('.citizen_content > .citizen_military:eq(1) > div > small:first').text('Ваенны вопыт:');
			$(".citizen_content > .citizen_military > .stat > small:contains('Achieved while')").replaceText('Achieved while successfully defending','Набыты пры паспяховай абароне').replaceText('against','ад').replaceText(' on ',' ').replaceText('Achieved while trying to conquer','Набыты пры спробе захапіць').replaceText('from','у').replaceText('Achieved while successfully conquering','Набыты, калі паспяхова захоплена');
if ($('.citizen_content h3:eq(4)').find('True Patriot history')) {
        $('.citizen_content h3:eq(4)').replaceText('True Patriot history','Сапраўдны патрыёт');
        $(".citizen_content h3:contains('True Patriot')").html('Сапраўдны патрыёт<img class="tips" alt="" style="position:relative;bottom:-2px;right:-2px;" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" original-title="Сумарныя Пашкоджанні за краіну Вашага грамадзянства">');
	$('.citizen_content > .citizen_military:eq(2) > strong:first').text('Пашкоджанні');
        $(".citizen_content > .citizen_military:eq(2) > div > small:contains('Progress:')").text('Набыта')
        $(".citizen_content > .citizen_military:eq(3) > div > small:contains('Progress:')").text('У суме')
        $("#content > div.citizen_content > div.stat > strong:contains('Reach level 15 to enable your True Patriot progress')").text('Дасягнуць 15-га ўзроўню, каб пачаць адлік для Сапраўднага патрыёта');

	$(".citizen_content > h3:contains('Top damage in a campaign')") .html('Наібольшыя Пашкоджанні ў адной бітве<img class="tips" alt="" style="position:relative;bottom:-2px;right:-2px;" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" original-title="Залічваецца пасля завяршэння кампаніі">');
	$('.citizen_content > .citizen_military:eq(3) > strong:first').text('Пашкоджанні');
	$('.citizen_content > .citizen_military:eq(4) > strong:first').text('Пашкоджанні');
} else {

        //True Patriot
        $(".citizen_content h3:contains('True Patriot')").html('Сапраўдны патрыёт<img class="tips" alt="" style="position:relative;bottom:-2px;right:-2px;" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" original-title="Сумарныя Пашкоджанні за краіну Вашага грамадзянства">');
	$('.citizen_content > .citizen_military:eq(2) > strong:first').text('Пашкоджанні');
        $(".citizen_content > .citizen_military:eq(2) > div > small:contains('Progress:')").text('Накопичено')
        $("#content > div.citizen_content > div.stat > strong:contains('Reach level 15 to enable your True Patriot progress')").text('Дасягнуць 15-га ўзроўню, каб пачаць адлік для Сапраўднага патрыёта');
        // Top damage
	$(".citizen_content > h3:contains('Top damage in a campaign')") .html('Наібольшыя Пашкоджанні ў адной бітве<img class="tips" alt="" style="position:relative;bottom:-2px;right:-2px;" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" original-title="Залічваецца пасля завяршэння кампаніі">');
	$('.citizen_content > .citizen_military:eq(3) > strong:first').text('Пашкоджанні');
        $("#content > div.citizen_content > div.stat > strong:contains('Reach level 15 to enable your top damage in a campaign')").text('Дасягнуць 15-га ўзроўню, каб пачаць адлік для Сапраўднага патрыёта');
};
			if (location.indexOf("/economy/")!==-1) {
				if (location.indexOf("/donate-")!==-1) {
					// donate tab
					$('.citizen_content > div > h2.special.padded').replaceText('Donate','Адправіць');
					$('.citizen_content > div > h2.special.padded > img#donate_tip').attr('title','Можна дарыць толькі ежу, зброю, грошы і квіткі.');
					$('.citizen_content > div > ul.tabs > li#topratedtab > a > span').text('Тавары');
					$('.citizen_content > div > ul.tabs > li#latesttab > a > span').text('Валюта');
					$(".citizen_content > div > .donate_form > table > tbody > tr > th:contains('Your storage')").text('Ваша Сховішча');
					$(".citizen_content > div > table > tbody > tr > th:contains('Your account')").text('Вашы сродкі');
					$(".citizen_content input[value='Donate']").attr('value','Аддаць');
	//			} else if (location.indexOf("/citizen-accounts/")!==-1) {
				} else {
					// account money tab
					$(".citizen_content > a.fluid_blue_light_small > span:contains('Exchange currencies')").text('Абмен');
					$("table.info_message > tbody > tr > td:exact('Local currency accounts with a value less than 1 are not displayed.')").text('Замежныя валюты ў колькасці, менш за 1, не адлюстроўваюцца.');
					$('div#allaccounts > div:first > a.f_light_blue_small > span').text('Купіць Золата');
				};
			} else if (location.indexOf("/citizen-friends/")!==-1) {
				// friend tab
				$("table.warning_message > tbody > tr > td:contains('Only your first 2000 friends will see your wall posts.')").text('Толькі першыя 2000 сябраў будуць бачыць вашыя паведамленні (Шаўты).');
				$("table.success_message > tbody > tr > td:contains('Your friendship request has been sent.')").text('Запыт на сяброўства адпраўлены.');
				$('div#friends_tab_content div.dead').text('Мёртвы');
			} else if (location.indexOf("/change-residence")!==-1) {
				// change-residence tab
				$("table.warning_message > tbody > tr > td:exact('You can now change location without using a moving ticket.')").text('Зараз, Вы можаце пераехаць куды захочаце, не выкарыстоўваючы квіткі.');
				$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','Балы папярэджанняў');
				$('.citizen_content > h2.special').text('Змена месцазнаходжання');
				$('.citizen_content > .current_location > h4').text('Цяперашняе месцазнаходжанне');
				$('.citizen_content > form > .new_location > h4').text('Новае месцазнаходжанне');
				$('.citizen_content > form > .new_location > #selects > small:eq(0)').replaceText('Moving distance:','　Адлегласць:　');
				$('.citizen_content > form > .new_location > #selects > small:eq(1)').replaceText('Travelling cost:','　Кошт:　');
				$('.citizen_content > form > a#move > span').text('Пераехаць');
			} else if (location.indexOf("/change-password")!==-1) {
				// change password tab
				$('.citizen_sidebar > div > .citizen_second > small:eq(2)').replaceText('Forfeit points','Балы папярэджанняў');
				$('.citizen_content > .holder > h2.special.borderedsep').text('Змена пароля');
				$("form.changepassword span.fieldname.goleft:contains('Current password')").text('Цяперашні пароль');
				$('form.changepassword span#error_for_citizen_password_twin.twin-small').text('Введзіце цяперашні пароль.')
				$("form.changepassword span.fieldname.goleft:exact('New password')").text('Новы пароль');
				$("form.changepassword span.fieldname.goleft:exact('New password again')").text('Введзіце новы пароль яшчэ раз');
				$('form.changepassword > div > input.arrowbutton').attr('value','Змяніць');
			} else if (location.indexOf("/edit/profile")!==-1) {
				// editor tab
				$('.citizen_content > .holder > h2.special.borderedsep').text('Змена персанальнай інфармацыі');
				$("form.editprofile span.fieldname.goleft:contains('Your description')").text('Інфармацыя пра Вас');
				$("form.editprofile span.fieldname.goleft:contains('Citizen Avatar')").text('Фота на пашпарт');
				$('form.editprofile span#error_for_citizen_file_twin.twin-small').html('Падтрымліваюцца фарматы: <strong>.jpeg</strong> ');
				$("form.editprofile span.fieldname.goleft:contains('Your birthday')").text('Твой дзень нараджэння');
				$("form.editprofile span.fieldname.goleft:contains('Your email here')").text('Ваша электронная пошта');
				$('form.editprofile span#error_for_citizen_email_twin.twin-small').text('Электронная пошта спатрэбіцца для аднаўлення Вашага акаўнта, таму увядзіце дакладна.');
				$("form.editprofile span.fieldname.goleft:contains('Your password')").text('Ваш пароль');
				$('form.editprofile span#error_for_password_twin.twin-small').text('Введіть Ваш цяперашні пароль, каб змены ўступілі ў дзеянне.');
				$('form.editprofile > .largepadded > input.arrowbutton').attr('value','Змяніць');
				$('.citizen_content > div > a.dotted.change_password').text('Змена пароля');
				$('form.editprofile > .nowrap > span.fieldname').html('Увядзіце код бяспекі<img class="tips" alt="" style="position:relative;bottom:-1px;right:-10px;" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" original-title="Калі ласка, увядзіце чатырохзначны код бяспекі. Калі вы не выкарыстоўваеце гэтую магчымасць, у выпадку ўзнікнення праблем або калі Вы нічога не страціце, каманда Ерепаблик здымае з сябе любую за гэта адказнасць, а страты не будуць кампенсаваныя">');
                		$('form.editprofile > .nowrap > span:eq(2)').text('Калі вы ўвядзеце код бяспекі няправільна 5 разоў запар, Вашы дзеянні будуць блакавацца. У гэтым выпадку, адпраўце зварот да адміністрацыі і Вам будзе аказана дапамога.');
			};
		};
		if (location.indexOf("/citizenship")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			// citizenship request
			$('h1:first').text('Эміграцыя на чужыну');
			$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a congress member')").text('Ты не зможаш змяніць сваёй краіне, пакуль ты член Кангрэсу.');
			$("table.info_message > tbody > tr > td:contains('You are not be able to request a new citizenship while being a party member')").text('Ты не зможаш змяніць сваёй краіне, пакуль ты член партыії.');
		};
		//! www.erepublik.com/en/exchange
		// Exchange
		if (location.indexOf("/exchange")!==-1) {
			//! www.erepublik.com/en/exchange
			// Exchange
			$('h1').css('font-family','Arial,Arial');
			$("h1:contains('Monetary market')").text('Валютны Рынак');
			//exchange_bar
			$("#sell_flag > span").text('Купіць:');
			$("a#change_currency.lighty.icon").attr("title","Абмяняць месцамі");
			$("#buy_flag > span").text('Прадаць:');
			$(".bar_actions > a:eq(0)").text("Дадаць прапанову").attr("title","Дадаць новую прапанову абмену");
			$(".bar_actions > a:eq(1)").text("Мае прапановы").attr("title","Паказаць Мае прапановы");
			$(".bar_actions > a:eq(2)").text("Усе прапановы");
			//exchange_offers
			$(".exchange_offers > thead > tr > th:[colspan='4']").text("Усе прапановы");
			$(".exchange_offers > thead > tr > th:contains('Citizen')").text("Хто");
			$(".exchange_offers > thead > tr > th:contains('Amount')").text("Колькі");
			$(".exchange_offers > thead > tr > th:contains('Rate')").text("Курс");
			$(".exchange_offers > thead > tr > th:contains('Buy')").text("Купіць");
			$(".ex_buy > button").each( function (){
				$(this).replaceText("Buy","Беру!");
				$(this).replaceText("Delete","Выдаліць");
				$(this).replaceText("Save","Запісаць");
			});
			//create_form
			$(".create_form > strong").replaceText("Amount","К-сць");
			$(".create_form > .rate_title").text("Курс");
			$("a#post_offer.blue_action").text("Запісаць");
			$("div.box").text("Вы яшчэ не стварылі ні адной абменнай прапановы");
		};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 戦争 www.erepublik.com/en/wars/
		//   - リスト www.erepublik.com/en/wars/show/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/wars/")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			$('h2').css('font-family','Arial,Arial');
			// war
			$('h1:first').text('Битва');
			$('#war_type_filter > div > .core > div > h2.goleft.big:first').text('Выберыце тып Бітвы');
			$('#war_type_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_war.gif" class="flag" alt="">Бітва');
			$('#war_type_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_resistancewar.gif" class="flag" alt="">Паўстання');
			$('#war_type_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allwars.gif" class="flag" alt=""Всі');
			$('#war_status_filter > div > .core > div > h2.goleft.big:first').text('Выбраць краіны ў стане вайны');
			$('#war_status_filter > div > .core > ul:eq(0) > li > a').html('<img src="/images/parts/icon_warlist_active.gif" class="flag" alt="">Працягваецца');
			$('#war_status_filter > div > .core > ul:eq(1) > li > a').html('<img src="/images/parts/icon_warlist_inactive.gif" class="flag" alt="">Закончана');
			$('#war_status_filter > div > .core > ul:eq(2) > li > a').html('<img src="/images/parts/icon_warlist_allstates.gif" class="flag" alt="">Усе');
			$('#war_country_filter > div > .core > div > h2.goleft.big:first').text('Выбраць краіну');
			$.each( $(".warholder > .attacker > .nameholder:contains('Resistance Force')"), function() {
				$(this).html($(this).replaceText('Resistance Force of ','Паўстанцы').text()+'<span id="CHT">Паўстанцы</span>');});
			$('.nameholder > #CHT').css('font-family','Arial,Arial');
			$('.warholder > .attacker > a').replaceText('allies',' саюзнікі').replaceText('no ','Адсутнічаюць');;
			$('.warholder > .defender > a').replaceText('allies',' саюзнікі').replaceText('no ','Адсутнічаюць');;
			$('.warholder > .middle > a.details').text('Падрабязна');
			if (location.indexOf("/wars/show/")!==-1) {
				// choose war and battlefiled
				var rCoun = document.title.toString().split("|")[1].split(" vs ")[0];
				$('.war_list_header > .country.left_side > div > h3.resistance').css('width','160px');
				$(".war_list_header > .country.left_side > div > h3:contains('Resistance Force')").html(rCoun+' <span id="CHT">Паўстанцы</span>');
				$('.war_list_header > .country.left_side > div > h3 > #CHT').css('font-family','Arial,Arial');
				$('.war_list_header > .country > div > a').replaceText('allies','саюзнікі ').replaceText('no ','Адсутнічаюць ');
				$('.war_list_header > .vs > small').replaceText('Still active','Вайна працягваецца');
				$('.listing > a.reversed > span').replaceText('Join','Далучыцца да');
				$(".listing > a.join[title='Join Resistance'] > span").text('Далучыцца да паўстання');
				$(".listing > a.join[title='Join'] > span").text('Прыняць удзел');
				$('.listing > small').replaceText('started on','Актыўныя Бітвы: ');
				$(".listing.done > small:contains('Conquered by')").replaceText('Conquered by','Захапілі:');
				$(".listing.done > small:contains('Secured by')").replaceText('Secured by','Абаранілі:');
				$("table.info_message > tbody > tr > td:contains('This war is no longer active.')").text('Гэта бітва ўжо скончана.');
				$("table.warning_message > tbody > tr > td:contains('is about to attack.')").replaceText('is about to attack.','напалі.');
			};
		};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 戰場/バトル
		//   - 戰場 www.erepublik.com/en/military/battlefield/
		//   - バトル www.erepublik.com/en/military/campaigns
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/military/")!==-1) {
			if (location.indexOf("/military/battlefield/")!==-1) {
				$('#pvp_header > .battle_hero.left_side').attr('title','Герой Бітвы');
				$('#pvp_header > .domination > .domibar > #left_points').attr('title','Ваша старана');
				$('#pvp_header > .domination > .domibar > #right_points').attr('title','Варожа старана');
				$('#pvp_header > .battle_hero.right_side').attr('title','Герой Бітвы');
				$("#pvp_header > .country > div > h3:contains('Resistance Force')").replaceText('Resistance Force of',' Паўстанцы ');
				$('#pvp_header > .country > div > a').replaceText('allies',' саюзнікі ').replaceText('no ','Адсутнічаюць');
				$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage').attr('title','Сума пашкоджання за цяперашні раўнд');
				$('#pvp_battle_area > table.damage_aligner > tbody > tr > td > #total_damage > small').text('Агульныя Пашкоджанні');
				$('#pvp_battle_area > .player.left_side > a#change_weapon').attr('title','Змяніць зброю');
	//			$('#pvp_actions > .action_holder > a#heal_btn').attr('title','Есці Батончык');
				$('#pvp_actions > .action_holder > a#fight_btn').text('АГОНЬ!');
				$('#pvp_actions > .action_holder > a#fight_btn').attr('title','АГОНЬ!');
				$('#pvp > a#go_stats.battle_stats_button').attr('title','Статыстыка');
				$('#pvp > a.help_button').attr('title','Даведка');
				$('.battle_stats > .top > h3:first').text('Статыстыка Бітвы');
				$('.battle_stats > .repeat > .content > .lister > .head > .one').text('Воін');
				$('.battle_stats > .repeat > .content > .lister > .head > .two').text('Ахвяры');
				$('.battle_stats > .repeat > .content > .lister > .head > .three').text('Пашкоджанні');
				//Campaign details
                $('.campaign_toggler').html('<img alt="" src="http://www.erepublik.com/images/modules/pvp/small_globe.png">КОШТ');
                $('.console_holder > h3').text('КОШТ');
                $('.console_holder > .big_campaign_points > p').text('Агульныя балы дзяржавы');
                $('.console_holder > .campaign_details > .heading > strong.cz1').text('БАЛы');
                $('.console_holder > .campaign_details > .heading > strong.cz2').text('ПЕРЕВАГА');
                $('.console_holder > .campaign_details > .heading > strong.cz3').text('ДЫВІЗІЁН');
                $('.console_holder > .campaign_details > .info > p').html('83 бала неабходна для перамогі <a id="simple_info" href="javascript:;">Падрабязна</a>');
                $('.console_holder > .campaign_details > .more_info > strong').text('Неабходна 1800 ачкоў перавагі для атрымання балаў');
                $('.console_holder > .campaign_details > .more_info > p:eq(0)').html('<b>1 бал</b>   для Дивізіёну І');
                $('.console_holder > .campaign_details > .more_info > p:eq(1)').html('<b>2 бали</b>  для Дивізіёну ІІ');
                $('.console_holder > .campaign_details > .more_info > p:eq(2)').html('<b>3 бали</b>  для Дивізіёну ІІІ');
                $('.console_holder > .campaign_details > .more_info > p:eq(3)').html('<b>4 бали</b>  для Дивізіёну ІV');
				// defeated-pop-box
				$('#enemy_defeated > .heading > h2').text('забіта ворагаў');
				$('#enemy_defeated > .content > div:eq(0) > strong').text('Пашкоджанні');
				$('#enemy_defeated > .content > div#natural_enemy_bonus > strong').text('Бонус крэўнага ворага');
				$('#enemy_defeated > .content > div:eq(2) > strong').text('Ваенны вопыт');
				$('#enemy_defeated > .content > div:eq(3) > strong').text('Вопыт');
				$('#enemy_defeated > a#add_damage_btn').text('Забіць яшчэ');
				// rank-up-pop-box
				$('#rank_up > .heading > p').text('Віншуем, Ваша званне павышаецца да');
				$('#rank_up > .content > div:eq(0) > strong').text('Узнагарода');
				$('#rank_up > .content > div:eq(1) > strong').text('+1 энэргітычны Батончык');
				$('#rank_up > a#add_rank_btn').text('Атрымаць узнагароду');
				// other-box
				$('#battle_loader > a.green_go').replaceText('Next battle','Наступны раўнд');
				$('#battle_end > a.green_go').text('Паглядзець іншыя Бітвы');
				$('#collection_complete.bazooka_pop > strong').text('Гэй, ды ты сабраў лому на РПГ!');
				$("#collection_complete.bazooka_pop > a[title='Build your Bazooka!']").text('Скласці');
				$("#timer > div > strong:contains('Are you')").text('Не заснуў?');
				$("#timer > div > a > span:contains('still here')").text('Я тут...тут...хрРР...ХРРР');
				// change location
				$('#options_box > p.info').text('Вам трэба пераехаць у адну з краін для ўдзелу ў бітве. Зрабіць гэта зараз?');
				$('#options_box > a#change_location.fluid_blue_dark > span').text('Так, вядома!');
				$('#options_box > a#nope.plain').text('янычар.');
			} else if (location.indexOf("/military/campaigns")!==-1) {
				$('h1').css('font-family','Arial,Arial');
				// Military campaigns list
				$('h1:first').text('Бітвы');
				$("#battle_listing > h4:exact('Campaign of the day')").text('Бітва дня');
				$("#battle_listing > h4:contains('Campaigns')").text('Бітвы, у якіх удзельнічае '+$("#battle_listing > h4:contains('Campaigns')").replaceText('Campaigns',' ').text());
				$("#battle_listing > p.campaigns_header.allies.toggled:contains('Allies')").html('<span class="arrow"></span>Бітвы союзнікаў');
				$("#battle_listing > p.campaigns_header.allbattles.toggled:contains('All')").html('<span class="arrow"></span>Усе Бітвы');
				$('#battle_listing a.victory_flag').text('Перамога');
				$("#battle_listing span:contains('Fight')").text('Прыняць удзел');
				$("#battle_listing span:contains('Victory')").text('Перамога　');
			};
		};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 新聞 www.erepublik.com/en/news
		// 熱門 www.erepublik.com/en/news/rated/all/
		// 即時 www.erepublik.com/en/news/latest/all/
		// 訂閱 www.erepublik.com/en/news/subscriptions
		// 國際 www.erepublik.com/en/news/international
		// 事件 www.erepublik.com/en/news/military
		//   - 文章 www.erepublik.com/en/article/
		//   - 報紙 www.erepublik.com/en/newspaper/
		//   - 創立 www.erepublik.com/en/create-newspaper
		//   - 編輯 www.erepublik.com/en/edit-newspaper/
		//   - 修文 www.erepublik.com/en/edit-article/
		//   - 寫文 www.erepublik.com/en/write-article
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/news/")!==-1) {
			$('body#media h1').css('font-family','Arial,Arial');
			$('body#media h2').css('font-family','Arial,Arial');
			// news area
			$("h1:first:exact(' News')").text('Навіны');
			$("h1:first:exact('First steps in eRepublik News')").text('Першыя крокі ў гульне');
			$("h1:first:exact('Battle orders News')").text('Ваенныя загады');
			$("h1:first:exact('Warfare analysis News')").text('Аналіз ваенных падзей');
			$("h1:first:exact('Political debates and analysis News')").text('Палітычныя дэбаты');
			$("h1:first:exact('Financial business News')").text('Эканоміка і фінансы');
			$("h1:first:exact('Social interactions and entertainment News')").text('Навіны грамадства');
			$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(0) > a').attr('title','Новыя інструкцыі і адукацыя');
			$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(1) > a').attr('title','Паведамленне ваеннага камандавання');
			$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(2) > a').attr('title','Стратэгічны аналіз');
			 $('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(3) > a').attr('title','Палітычныя абмеркаванні і іх аналіз');
			$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(4) > a').attr('title','Эканамічны фокус');
			$('#filters > .rightfilters > .core > ul.new_s_filters > li:eq(5) > a').attr('title','Сацыяльныя забавы');			
			$('#filters > .rightfilters > .core > .your_subs').html('</br>Вы ў цяперашні час падпісаны на <strong>'+$("#filters > .rightfilters > .core > .your_subs > strong").text()+'</strong> газет<a href="javascript:;" class="fluid_blue_dark" onclick="$j(\'.asubs\').toggle();" title=""><span>Змяніць</span></a>');
			$('#filters > .rightfilters > .asubs > .acontrols > a.aselectall').text('Выбраць усе');
			$('#filters > .rightfilters > .asubs > .acontrols > a#unsubscribeAction > span').text('Адпісацца');
			$('#domain_selector_holder > div > .core > div > div > h2.goleft.big:first').text('Калі ласка, Выберыце тып навін');
			$('#domain_selector_holder > div > .core > ul > .last:eq(0)').html('<a href=\"/en/news/rated/all/Ukraine/1\"><img class="icon" src="/images/parts/icon_media_toprated.gif" alt="Icon_media_toprated"> Лепшыя</a>');
			$('#domain_selector_holder > div > .core > ul > .last:eq(1)').html('<a href=\"/en/news/latest/all/Ukraine/1\"><img class="icon" src="/images/parts/icon_media_latest.gif" alt="Icon_media_latest"> Апошнія навіны</a>');
			$('#domain_selector_holder > div > .core > ul > .last:eq(2)').html('<a href=\"http://www.erepublik.com/en/news/military\"><img class="icon" src="/images/parts/icon_media_military.gif" alt="Icon_media_military"> Апошнія падзеі</a>');
			$('#domain_selector_holder > div > .core > ul > .last:eq(3)').html('<a href=\"http://www.erepublik.com/en/news/international\"><img class="icon" src="/images/parts/icon_media_international.gif" alt="Icon_media_international"> Міжнародныя Навіны</a>');
			$('#domain_selector_holder > div > .core > ul > .last:eq(4)').html('<a href=\"http://www.erepublik.com/en/news/subscriptions\"><img class="icon" src="/images/parts/icon_media_subscriptions.gif" alt="Icon_media_subscriptions">Падпісаныя газеты</a>');
			$('#country_holder > div > .core > div > div > h2.goleft.big:first').text('Калі ласка, абярыце краіну');
			// catalog link
			$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> Першыя крокі ў гульне');
			$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> Ваенныя загады');
			$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> Аналіз ваенных падзей');
			$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> Палітычныя дэбаты');
			$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> Эканоміка і фінансы');
			$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> Навіны грамадства');
		} else if ((location.indexOf("/article/")!==-1) || (location.indexOf("/newspaper/")!==-1)) {
			// newspaper, article
			$('body#newspaper > #container > #content > h2.new_spaper_section').text('пра гэта піша газета');
			$('.profilemenu > li > a.houdini.subscribeToNewspaper').text('Падпісацца');
			$('.profilemenu > li > a.houdini.unsubscribeFromNewspaper').text('Адпісацца');
			$(".profilemenu > li > a:exact('Write article')").text('Напісаць артыкул');
			$(".profilemenu > li > a:exact('Edit newspaper details')").text('Змяніць дэталі газеты');		
			// catalog link
			$("a:contains('First steps in eRepublik')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_1.png"> Першыя крокі ў гульне');
			$("a:contains('Battle orders')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_2.png"> Ваенныя загады');
			$("a:contains('Warfare analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_3.png"> Аналіз ваенных падзей');
			$("a:contains('Political debates and analysis')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_4.png"> Палітычныя дэбаты');
			$("a:contains('Financial business')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> Эканоміка і фінансы');
			$("a:contains('Social interactions and entertainment')").html('<img src="http://www.erepublik.com/images/modules/news/icons/cat_5.png"> Навіны грамадства');
			// other link
			$('a#comments_button_on > span').replaceText('Comments','Каментарыі');
			$('#subscribe_comments > form > .submitpost-start > .submitpost-core > p.padded').text('Ваша паведамленне');
			$("#subscribe_comments > form > .submitpost-start > .submitpost-core > input.submit[name='commit']").attr('value','Дадаць паведамленне');
			$('a.report.new_spaper').text('Скаргі гэтай газеты');
			$('a.report.articlereport').text('Паведаміць аб гэтым артыкуле');
			$('a.shower.report.commentswitch').text('Паскардзіцца на каментарыi');
			$('a.report.onz.commentcontent').text('Паскардзіцца');
			$('span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core').text('Рэдактар');
			$('span.vroundbtnh25_red-start > span.vroundbtnh25_red-end > a.vroundbtnh25_red-core').text('Х');
		} else if (location.indexOf("/create-newspaper")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			$('h2').css('font-family','Arial,Arial');
			$('.fieldname').css('font-family','Arial,Arial');
			// create newspaper
			$('.holder > h1:first').text('Стварэння газеты');
			$('.holder > a.wikiicon.largepadded').text('Дадатковая дапамога');
			$('.accountinfo.largepadded > .accountdisplay > span.rightpadded:first').text('Вашы грашовыя сродкі');
			$(".holder > h2:first:contains('Requirements')").text('патрабаванні');
			$(".holder > .smallhoderleft.goleft > p:contains('Level')").text('Узровень');
			$(".holder > .smallhoderleft.goleft > p:contains('Cost')").text('Кошт');
			$('.holder > .smallholderright.goleft > a.btnGetGold').text('Купіць Золата');
			$(".holder > h2.section:contains('Newspaper details')").text('Дэталі газеты');
			$('form.companydetails > p.largepadded:eq(0) > span.fieldname').text('Назва газеты');
			$('form.companydetails > p.largepadded:eq(0) > span#error_for_newspaper_name_twin').text('Калі ласка, увядзіце ад 6 да 25 знакаў');
			$('form.companydetails > p.largepadded:eq(1) > span.fieldname').text('Лагатып газеты');
			$('form.companydetails > p.largepadded:eq(1) > span.goleft > span#error_for_newspaper_image_twin').text('Дазволена толькі JPG-фармат.');
			$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','Стаць журналістам');
		} else if (location.indexOf("/edit-newspaper/")!==-1) {
			$('.fieldname').css('font-family','Arial,Arial');
			// edit newspaper
			$(".profilemenu > li > a:exact('Write article')").text('Напісаць артыкул');
			$(".profilemenu > li > a:exact('Edit newspaper details')").text('Змяніць Дэталі газеты');
			$('.accountinfo > .accountdisplay > span.rightpadded').text('Вашы грашовыя сродкі');
			$("form.companydetails > .largepadded > .fieldname:contains('Newspaper name')").text('Назва газеты');
			$('form.companydetails > .largepadded > span#error_for_newspaper_name_twin').text('Калі ласка, увядзіце ад 6 да 25 знакаў.');
			$("form.companydetails > .largepadded > .fieldname:contains('Description')").text('Апісанне');
			$("form.companydetails > .largepadded > .fieldname:contains('Location')").text('Месцазнаходжанне');
			$('form.companydetails > .largepadded > span#error_for_country_list_twin').text('Змяненне размяшчэння ўладальніка магчыма толькі для газеты ў сваёй краіне.');
			$("form.companydetails > .largepadded > .fieldname:contains('Newspaper logo')").text('Лагатып газеты');
			$('form.companydetails > .largepadded > span.goleft > span#error_for_newspaper_image_twin').text('Дазволена толькі JPG-фармат.');
			$("form.companydetails > .largepadded > .fieldname:contains('Cost')").text('Кошт');
			$('form.companydetails > .largepadded > span.accountdisplay > a.btnGetGold').text('Купіць Золата');
			$("form.companydetails > .buttonalign > input.arrowbutton[name='commit']").attr('value','Унесці змены');
		} else if ((location.indexOf("/edit-article/")!==-1) ||(location.indexOf("/write-article")!==-1)) {
			$('h2').css('font-family','Arial,Arial');
			$('.smallpadded').css('font-family','Arial,Arial');
			// edit, write article
			$(".profilemenu > li > a:exact('Write article')").text('Напісаць артыкул');
			$(".profilemenu > li > a:exact('Edit newspaper details')").text('Змяніць Дэталі газеты');
			$(".holder > .bordersep > h2.goleft:contains('Edit')").text('Змяніць артыкул');
			$(".holder > .bordersep > h2.goleft:contains('Write article')").text('Напісаць артыкул');
			$(".holder > .bordersep > a.btn-arrow-left.goright:exact('Back')").text('Назад');
			$("form.writearticle > .inputholder > .smallpadded:contains('Title')").text('Назва');
			$('form.writearticle > .inputholder > span#error_for_article_name_twin').text('Калі ласка, увядзіце ад 1 да 80 знакаў.');
			$("form.writearticle > .inputholder > .smallpadded:contains('Article')").text('Артыкул');
			$("table.info_message > tbody > tr > td:contains('By choosing a category which')").text('Выбярыце катэгорыю для Вашага артыкула, каб патэнцыяльныя чытачы хутчэй знайшлі цікавую ім інфармацыю.');
			$("form.writearticle > .inputholder > div.smallpadded:contains('Category')").text('Катэгорыя');
			$("form.writearticle > .inputholder > select#article_category > option[value='0']").text('Выберыце');
			$("form.writearticle > .inputholder > select#article_category > option[value='1']").text('- Новыя інструкцыі і адукацыя');
			$("form.writearticle > .inputholder > select#article_category > option[value='2']").text('- Паведамлення ваеннага камандавання');
			$("form.writearticle > .inputholder > select#article_category > option[value='3']").text('- Стратегічны аналіз');
			$("form.writearticle > .inputholder > select#article_category > option[value='4']").text('- Палітычныя абмеркаванні і іх аналіз');
			$("form.writearticle > .inputholder > select#article_category > option[value='5']").text('- Эканамічны фокус');
			$("form.writearticle > .inputholder > select#article_category > option[value='6']").text('- Сацыяльныя забавы');
			$("form.writearticle > div > input.arrowbutton[value='Publish']").attr('value','У друк!');
			$("form.writearticle > div > input.arrowbutton[value='Edit']").attr('value','Змяніць');
		};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 政党 www.erepublik.com/en/party/
		// 成員名單 www.erepublik.com/en/party-members/
		// 主席名單 www.erepublik.com/en/party-candidates/
		// 議員名單 www.erepublik.com/en/propose-congressman/
		// 總統名單 www.erepublik.com/en/presidential-candidates/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/party/")!==-1) {
                        $('h2').css('font-family','Arial,Arial');
                        // party
                        $("h2.section:contains('Info')").text('Інформацыя');
                        $(".infoholder > .largepadded > span.field:exact('Members')").text('Удзельнікі');
                        $(".infoholder > .largepadded > span.field:exact('Orientation')").text('Напрамкі');
                        $(".infoholder > .largepadded > span.goleft:contains('Center')").replaceText('Center','Цэнтрыская ').replaceText('-left','лева').replaceText('-right','права');
			$(".infoholder > .largepadded > span.goleft:contains('Far')").replaceText('Far','Крайне ').replaceText('-left','лева').replaceText('-right','права');
			$('.infoholder > .largepadded > span.goleft').replaceText('Libertarian','Ліберасты').replaceText('Totalitarian','Таталітарная').replaceText('Authoritarian','Аўтарытарная').replaceText('Anarchist','Анархісты');
                        $("h2.section:contains('Elections')").text('Выбары');
                        $('.indent > .bordersep:eq(0) > h2.section').html('<img title="Абіраецца членамі партыі 15-га чысла кожнага месяца." class="icon padded tooltip" src="/images/parts/icon_position_politics_partypresident.gif" alt="Icon_position_politics_partypresident">Прэзідэнт партыі');
                        $(".infoholder > p.smallholder:contains('Party President')").text('Прэзідэнт партыі');
                        var pp_1 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(0)").text();
                        var pp_2 = $(".indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first > .special:eq(1)").text();
                        $('.indent > .bordersep:eq(0) > .subindent > .infoholder:eq(0) > p:first').html('Наступныя выбары праз <span class="special">'+pp_1+'</span>. <span class="special">'+pp_2+'</span> кандыдат(-аў).');
                        $('.indent > .bordersep:eq(1) > h2.section').html('<img title="Абіраецца мясцовымі жыхарамі 25-га чысла кожнага месяца." class="icon padded tooltip" src="/images/parts/icon_position_politics_congressman.gif" alt="Icon_position_politics_congressman">Кангрэс');
                        var cm_1 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p > span.special:first').text();
                        var cm_2 = $('.indent > .bordersep:eq(1) > .subindent > .infoholder > p > span.special:first').text();
                        $('.indent > .bordersep:eq(1) > .subindent > .infoholder > .field > p:first').html('Зараз <span class="special">'+cm_1+'</span> гульцоў ад гэтай Партыі члены Кангрэса');
                        $('.indent > .bordersep:eq(1) > .subindent > .infoholder > p:first').html(' што складае <span class="special">'+cm_2+'</span> ад агульнай колькасці.');
                        if ($('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').length==1) {
                                var cm_3 = $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p > span.special:first').text();
                                $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('Наступныя выбары праз <span class="special">'+cm_3+'</span>.');
                        } else {
                                $('.indent > .bordersep:eq(2) > .subindent > .infoholder > p:first').html('Праглядзець кандыдатаў.');
                        };
                        $('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > h2:first').text('Выбары, выбары, кандыдаты - ... А яно табе сапраўды патрэбна?');
                        $('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > .holder').replaceText('Do you agree to represent your party in the congress election in','Ці згодныя Вы, ад імя сваёй партыі прыняць удзел у выбарах').replaceText('?',' ў Кангрэс?');
                        $('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.padded:first').text('Калі ласка, запоўніце ў ніжняй частцы акна вашыя палітычныя погляды, каб растлумачыць выбаршчыкам, чаму яны павінны за Вас галасаваць.');
                        $('.indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.largepadded > span:last').html('Можа прымацаваць знешнюю вэб-старонку або артыкул з Вашай газеты.');
                        $(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Agree']").attr('value','Балатавацца');
                        $(".indent > .bordersep:eq(2) > .subindent > #candidate_for_congress_template > form > p.goright > span > span > input[value='Cancel']").attr('value','Перадумаў');
                        $('.indent > h2.section').html('<img title="Абіраецца грамадзянамі краіны 5 чысла кожнага месяца." class="icon padded tooltip" src="/images/parts/icon_position_politics_president.gif" alt="Icon_position_politics_president">Прэзідэнт краіны');
                        $(".indent > .subindent:eq(0) > .bordersep > .infoholder > p.smallholder:contains('Winner')").text('Пераможац');
                        var cp_1 = $('.indent > .subindent:eq(1) > .infoholder > p:first > span.special:first').text();
                        $('.indent > .subindent:eq(1) > .infoholder > p:first').html('Ннаступныя прэзідэнцкія выбары праз <span class="special">'+cp_1+'</span>.');
                        $(".indent > .subindent:eq(2) > .infoholder > p.smallholder:contains('No candidate proposed')").text('Кандыдатаў яшчэ не прапанавана.');
                        // control buttons
                        $('a.report.party').text('Паскардзіцца');
                        $(".action a:exact('Show all members')").text('Паказаць усіх членаў');
                        $(".action a:exact('Show results')").text('Вынікі');
                        $(".action a:exact('Show candidate list')").text('Спіс кандиыатаў');
                        $(".action a:exact('Show candidates list')").text("Спіс кандыдатаў");
                        $(".action a:exact('Show proposed Congress candidates')").text('Спис кандыдатаў');
                        $(".action a:contains('Join party')").text('Далучыцца');
                        $(".action a:contains('Resign')").text('Пакінуць');
                        $(".action a:exact('Run for congress')").text('Балатавацца');
                        $(".action a:exact('Retire')").text('Адказацца');
                        $(".action a:exact('Candidate')").text('Балатавацца');
                        $(".action a:exact('Vote')").text("Галасаваць");
			$(".action a:exact('Propose candidate')").text("Прапанаваць кандыдата");
			$(".action a:exact('Run for presidency')").text("Балатавацца ў прэзідэнты");
                } else if ((location.indexOf("/party-members/")!==-1) || (location.indexOf("/party-candidates/")!==-1)) {
                        $('h2').css('font-family','Arial,Arial');
                        $('p.smallholder').css('font-family','Arial,Arial');
                        // party members, candidates list
                        $("h2.biggersection:contains('Party members')").text('Члены партыі');
                        $("h2.biggersection:contains('Party candidates')").text('Кандыдаты');
                        $(".indent > .bordersep > p.smallholder:contains('Party Member')").replaceText('Party Member','Член партыі');
                        $(".indent > .bordersep > p.smallholder:contains('Congress Member')").replaceText('Congress Member','Кангрэсмэн');
                        $(".indent > .bordersep > p.smallholder:contains('Party President')").replaceText('Party President','Прэзідэнт партыі');
                        $('.holder > .indent').replaceText('No candidates applied yet','Яшчэ ні адзін кандыдат не падаў заяўку.');
                        $('.holder > a.btn-arrow-left.goright').text('Назад да старонкі партыі');
                        $('a.report.party').text('Паскардзіцца');
                } else if (location.indexOf("/propose-congressman/")!==-1) {
                        $('h2').css('font-family','Arial,Arial');
                        // party congressman list
                        $("h2.biggersection:contains('Congress member candidates')").text('Кандыдаты ў Кангрэс ад партыі');
                        $('.infoalert > p:eq(0)').html('<strong>1.</strong> Члены палітычных партый могуць падаць заяўку на ўдзел у выбарчай гонцы з 16-га Па 23-е чысло кожнага месяца.');
                        $('.infoalert > p:eq(1)').html('<strong>2.</strong> 24-га чысла кожнага месяца, старшыня Партыі сцвярджае канчатковы спіс кандыдатаў.');
                        $('.infoalert > p:eq(2)').html('<strong>3.</strong> Кожная палітычная партыя, у кожным рэгіёне можа прызначыць пяцярых членаў кандыдатамі ў Кангрэс.');
                        $("select#region_list > option[value='0']").text('Выбраць рэгіён');
                        $('.holder > .candidates > .list-title').replaceText('Official candidates','Афіцыйныя кандыдаты');
                        $('.holder > a.btn-arrow-left.goright').text('Назад да старонкі партыі');
                        $('a.report.party').text('Паскардзіцца');
                } else if (location.indexOf("/presidential-candidates/")!==-1) {
                        $('h1').css('font-family','Arial,Arial');
                        $('h2').css('font-family','Arial,Arial');
                        $('th').css('font-family','Arial,Arial');
                        // president candidates list
                        $('body#elections h1:first').text('Спіс кандыдатаў у Прэзідэнты');
        //              $(".bordersep > h2:exact('Country')").text("Калі ласка, выбярыце краіну");
                        $('table.elections > tbody > tr:first > th:eq(0)').text('Кандыдат');
                        $('table.elections > tbody > tr:first > th:eq(1)').text('Падтрымка палітычных партый');
                        $('table.elections > tbody > tr:first > th:eq(2)').text('Нацыянальныя цэлі');
                        $('table.elections > tbody > tr > td.of_goals > .goal_setter > .nogoals > small').text('Кандыдат нічога не абяцае');
                        $("table.info_message > tbody > tr > td:contains('No candidates applied yet')").text('Кандыдатаў яшчэ няма. Дзіўна.');
				};
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		//選舉中心 www.erepublik.com/en/elections/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("elections")!==-1) {
                        $('h1').css('font-family','Arial,Arial');
                        $('h2').css('font-family','Arial,Arial');
                        $('th').css('font-family','Arial,Arial');
                        // elections
                        $('body#elections h1:first').text('Выбарчы камітэт');
                        $("#filters > .rightfilters > .core > .info > p.smallpadded > strong:exact('Next elections')").text('Наступныя выбары:');
                        $("#filters > .rightfilters > .core > .info > p:last > strong:contains('Country President')").text('Прэзідэнт краіны');
                        $("#filters > .rightfilters > .core > .info > p:last > strong:contains('Party President')").text('Прэзідэнт партыі');
                        $("#filters > .rightfilters > .core > .info > p:last > strong:contains('Congress')").text('Кангрэс');
                        $("#country_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('Краіна');
                        $("#region_filters > .extended-menus > .core > .bordersep > h2:contains('Country')").text('Краіна');
                        $("#region_filters > .extended-menus > .core > ul:first > li:first > a[id='0__All regions']").text('Усе рэгіёны');
                        $("#election_filters > .extended-menus > .core > .bordersep > h2:contains('Election')").text('Выбярыце тып выбараў');
                        $('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#president').text('Прэзідэнт краіны');
                        $('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#congress').text('Кангрэс');
                        $('#election_filters > .extended-menus > .core > ul.election_ul > li.last > table > tbody > tr > td > a#party').text('Прэзідэнт партыі');
                        $("#party_filters > .extended-menus > .core > .bordersep > h2:contains('Parties')").text('Будь ласка, виберіть політичну партію');
                        $("#dateSelect_filters > .extended-menus > .core > .bordersep > h2:contains('Month/Year')").text('Выбраць дату');
                        $("body#elections h2.special:contains('Official Results')").text('Афіцыйныя Вынікі');
                        $("h3:contains('Intermediate results')").text("Прамежкавыя Вынікі");
                        $(".release_countdown > p").html("Выбарчы камітэт правярае галасы, каб пераканацца ў сумленнасці выбараў.<br><br>Дзякуй за разуменне!");
                        $(".release_countdown > .countdown_clock > small").text("Афіцыйныя Вынікі будуць абвешчаны праз:")
                        // president
                        $(".vote_box > .vote_box_layer > .vote_box_info > h4:contains('Goals')").text('Цілі');
                        $('.vote_box > .vote_block > p').replaceText('votes','галасоў');
                        $(".vote_totals > p > span:contains('Total votes')").replaceText('Total votes:','Прагаласавала');
                        if ((location.indexOf("congress-elections")!==-1) || (location.indexOf("party-electionds")!==-1)){
                                // congress
                                $("table.electiondetails th:contains('Official candidates')").replaceText('Official candidates','Афіцыйныя кандыдаты');
                                $("table.electiondetails th:contains('Wildcards')").replaceText('Wildcards','Кандыдаты, якія атрымалі найбольшую колькасць галасоў з тых, якія не прайшлі па квоце на рэгіён');
                                $("table.electiondetails th:contains('Not qualified')").replaceText('Not qualified','Не праходзяць');
                                $("table.electiondetails th:contains('Member of')").text('Партыя');
                                $("table.electiondetails th:contains('No. of votes')").text('Галасы');
                                $("table.electiondetails span.smalldotted:exact('Presentation')").text('Прэзентацыя');
                                $("table.electiondetails span.smalldotted:exact('No presentation')").text('Без прэзентацыі');
                                // party
                                $("table.elections th:exact('No.')").text('Нумар');
                                $("table.elections th:contains('Candidate')").text('Кандыдат');
                                $("table.elections th:contains('No. of votes')").text('К-сць галасоу');
                                $("table.elections th:contains('% of votes')").text('% галасоу');
                                $("table.elections a:exact('Vote')").text('Галасаваць');
                                // others
                                $("#messagealert.infoicon > p:exact('No data available yet')").text("На дадзены момант інфармацыя адсутнічае. Схадзі пагуляй ў мяч");
                                var v_num = $('p.regular > span#number_of_votes').text();
                                $('p.regular').html('Усяго галасоў: <span class="special rightpadded" id="number_of_votes">' +v_num+ '</span>');
                        };
                };
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 軍團 www.erepublik.com/en/main/group-home/
		// 創立 www.erepublik.com/en/main/group-create/
		// 首頁 www.erepublik.com/en/main/group-show/
		// 列表 www.erepublik.com/en/main/group-list/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/group-")!==-1) {
			$('h1').css('font-family','Arial,Arial');
			if (location.indexOf("/group-home/")!==-1) {
				// group-home
				$('body#military_units h1:first').text('Вайсковае падраздзяленне');
				$("table.info_message > tbody > tr > td > strong:contains('You are not a soldier of any Military Unit')").parent().html(
					'<strong>Вы не яўляецеся чальцом ні аднаго ваеннага падраздзялення </strong> Вы можаце далучыцца да існуючага або стварыць уласнае.<br>Далучайцеся да войска, каб ісці за братамі і біць разам на поле бою.<br><a class="wicked" href="http://wiki.erepublik.com/index.php/Military_unit" target="_blank">Больш інфармацыі</a>');
				$('#military_units_home > .create_military_unit > table > tbody > tr > td > a > span').text('Заснаваць падраздзяленне');
				$('#military_units_home > .join_military_unit > h3:first').text('Адправіць заяўку на ўступленне ў падраздзяленне');
			} else if (location.indexOf("/group-create/")!==-1) {
				$('body#create h1:first').text('Заснаванне падраздзялення');
				$("table.warning_message > tbody > tr > td:contains('The Military Unit will be located in')").text('Штаб-кватэра адраздзялення будзе ўстаноўлена ў краіне Вашага грамадзянства. Звярніце ўвагу, што ў будучыні Вы не зможаце гэта змяніць, толькі сімволіку і апісанне.')
				$('#create_military_unit > .holder.create_company > h2:first').text('Умовы для паступлення');
				$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(0) > div').replaceText('Funding Fee','Кошт рэгістрацы');
				$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(1) > div').replaceText('Military Rank','Воінскае званне');
				$('#create_military_unit > .holder.create_company > .container_blue_border > .requirements > .req:eq(2) > div').replaceText('Experience Level','Узровень вопыту');
			} else if ((location.indexOf("/group-show/")!==-1) || (location.indexOf("/group-list/")!==-1)) {
				$('h3').css('font-family','Arial,Arial');
				// group-show, group-list
				$('#military_group_header > .header_content > h2:first > big').replaceText('Members','байцоў');
				$("#military_group_header > .header_content > .details > strong:contains('Location:')").text('Размяшчэнне:');
				$("#military_group_header > .header_content > .details > strong:contains('Commander:')").text('Галоўнакамандуючы:');
				$('#military_group_header > .header_content > .details > a.big_action.join > strong').text('Скласці прысягу');
				$("#military_group_header > .header_content > .details > a.simple > strong:contains('Resign')").text('Выйсці');
				$("#military_group_header > .header_content > .details > a:contains('View rank')").text('Рэйтынг');
				$("#military_group_header > .header_content > .details > a.backmu").text('Вярнуцца');
				$("#group_right_column > .leader > h3:first:contains('Commander')").text('Галоўнакамандуючы');
				$("#group_right_column > .leader > h3:last:exact('Regiment Captain')").text('Капітан');
				$("#group_right_column > .leader > h3:last:exact('No Captain')").text('Капітан абраны');
				$('#group_right_column > .members > h3:first').replaceText('Members','Байцы');
				$('#group_right_column > .members > a.show_all').text('Паглядзець усіх');
				$('#orderContainer > h3').replaceText('Order of the day','Дзённы загад');
				$('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text($('#orderContainer > .requirements.fight > ul.req_content > li.condition0 > .details > strong').text().replace('Fight for','Боріться за')+'. Забіта ворагаў:');
				$('#group_orders > h3:first').text('Заданні для навабранцаў');
				$('#group_orders > p:first').text('Выканайце гэтыя ўмовы, каб прайсці пасвячэнне ў ваяры.');
				$('#group_orders > .requirements > ul.req_content > li:eq(0) > .details > strong').text('Званне: Sergeant');
				$('#group_orders > .requirements > ul.req_content > li:eq(1) > .details > strong').text('ЗПераадолець 25 ворагаў');
				$('#group_orders > .requirements > ul.req_content > li:eq(2) > .details > strong').text('Прыміце ўдзел у пяці розных бітвах за краіну Вашага грамадзянства або яе саюзнікаў');
				$("#group_feeds > h3:first").text('Сцяг падраздзялення');
				//$('#group_feeds > #citizen_feed > .shouter > form#wall_post > textarea#shout.expand').text('和軍團的朋友們說些有趣的東西吧');
				$('#group_feeds > #citizen_feed > .shouter > form#wall_post > span.controls > a.post_button > b').text('分享');
				$("#group_feeds > #citizen_feed a[trigger='reply']").text('Адказаць');
				$("#group_feeds > #citizen_feed span[trigger='add_comment']").text('Каментаваць');
				$("#group_feeds > #citizen_feed div.fake_input").text('паведамленні');
	//			$("#group_feeds > #citizen_feed a[target='reportpopup']").text('Паскардзіцца');
				$("table.info_message > tbody > tr > td:contains('You must be a member of')").text('Вы павінны далучыцца да гэтага падраздзялення, каб глядзець яго сцяну.');
				$("table.error_message > tbody > tr > td:contains('Sorry, you need to have the same citizenship')").text('Выбачайце, у Вас павінна быць такое ж грамадзянства.');
				if (location.indexOf("/group-list/")!==-1) {
					//group-list
					$('#members_holder > h3').text('Спіс байцоў падраздзялення');
				};
			};
		};
		$("#show_facebook_feed").css("display","none");
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// www.erepublik.com/en/main/country/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if ((location.indexOf("/country")!==-1) || (location.indexOf("/law/")!==-1)) {
			$('#filters > a.btn-filters-select.goleft').text('Краіна');
			$('#profileholder > p > a.vroundbtnh25-start:eq(0) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('Паглядзець на курыцу');
			$('#profileholder > p > a.vroundbtnh25-start:eq(1) > span.vroundbtnh25-end > span.vroundbtnh25-core_large').text('Паказаць на карце свету');
			$(".extended-menus > .core > .bordersep > h2.goleft.big:contains('Country')").text('Выберыце краіну');
			$('ul.ftabs > li:eq(0) > a > span').text('Соцыум');
			$('ul.ftabs > li:eq(1) > a > span').text('Эканоміка');
			$('ul.ftabs > li:eq(2) > a > span').text('Палітыка');
			$('ul.ftabs > li:eq(3) > a > span').text('Войны');
			$('ul.ftabs > li:eq(4) > a > span').text('Законы');
			$('ul.ftabs > li:eq(5) > a > span').text('管理中心');
			$("h2:exact('Current national goals')").text("Цэлі");
			$("a:exact('check current status')").text("Праверыць");
			$("p.general-text:contains('The elected president has not set any national goals for this month.')").text("Абраны Прэзидэнт быў занадта гультаяваты, каб выставіць мэты.");
			$("h2:exact('Monuments achieved')").text("Атрыманыя манументы");
			if (location.indexOf("/country/society/")!==-1) {
				// society
				$("h2:exact('Citizens')").text("Насельніцтва");
				$("span.fakeheight:eq(0)").text("Колькасць");
				$("span.fakeheight:eq(1)").text("Сёння зарэгістравана");
				$("span.fakeheight:eq(2)").text("Прэтэндэнты");
				$("span.fakeheight:eq(3)").text("Сярэдні ўзровень грамадзян");
				$("span.fakeheight:eq(4)").text("Цяпер у гульні");
				$("span.fakeheight:eq(5)").text("Мінімальная Плата");
				$("a.blue_arrow_small > span ").text("Агляд");
				$("a.details-small").text("Дэталі");
				$('#content > h2:eq(1)').replaceText('Regions','Рэгіёны');
 				$('table.regions > tbody > tr > td > span > span.icon-capital').text('Сталіца');
				
			};
			if (location.indexOf("/country/economy/")!==-1) {
				// economy
				$("h2:exact('Country resources')").text("Рэсурсы");
				$("h2:exact('Treasury')").text("Казна");
				$("h2:exact('Trade embargoes')").text("Гандлёвыя эмбарга");
				$("td:contains('This country can trade with any other country in eRepublik.')").text("гандлёвыя эмбарга адсутнічаюць.");
				$("h2:exact('Taxes')").text("Падаткі");
				$(".resource_list > thead > tr > th:eq(0)").text("Рэсурс");
				$(".resource_list > thead > tr > th:eq(1)").text("Месцазнаходжання");
				$("td > small:exact('Not available')").text("Цю-цю");
				$("ul.profilemenu > li > a").text("НацБанк");		
			
				$(".resource_list > tbody > tr > td > span:exact('Fish')").text("Рыба");
				$(".resource_list > tbody > tr > td > span:exact('Grain')").text("Зерне");
				$(".resource_list > tbody > tr > td > span:exact('Fruits')").text("Фрукты");
				$(".resource_list > tbody > tr > td > span:exact('Cattle')").text("Каровы");
				$(".resource_list > tbody > tr > td > span:exact('Deer')").text("Алені");
				$(".resource_list > tbody > tr > td > span:exact('Iron')").text("Сталь");
				$(".resource_list > tbody > tr > td > span:exact('Saltpeter')").text("Соль");
				$(".resource_list > tbody > tr > td > span:exact('Aluminum')").text("Алюміній");
				$(".resource_list > tbody > tr > td > span:exact('Oil')").text("Нафта");
				$(".resource_list > tbody > tr > td > span:exact('Rubber')").text("Гума");
				
				$("th:exact('Income Tax')").text("падаходны падатак");
				$("th:exact('Import Tax')").text("імпартная пошліна");
				$("th:exact('VAT')").text("ПДВ");
				$("span.fakeheight:exact('Food')").text("Ежа");

 				$("span.fakeheight:exact('Weapons')").text("Зброя");

        $("span.fakeheight:exact('House')").text("Будынки");

        $("span.fakeheight:exact('Moving Tickets')").text("Квіткі");

        $("span.fakeheight:exact('Food Raw Material')").text("Зерне");

        $("span.fakeheight:exact('Weapon Raw Material')").text("Жалеза");

       $("span.fakeheight:exact('Hospital')").text("Шпиталі");

        $("span.fakeheight:exact('Defense System')").text("абарончыя сістэмы");

$("h2:exact('Salary')").text("Мінімальная ЗП");
				$("span.fakeheight:exact('Minimum')").text("Мінімальная");
				$("span.fakeheight:exact('Average')").text("Сярэдняя");
				$("h2:exact('Info')").text("Дэталі");
				$("h2:exact('Revenues')").text("Паступленні");
			};
			//政治選舉
			if (location.indexOf("/country/politics/")!==-1) {
				$("h2:exact('President')").text("Прэзідэнт");
				$("h2:exact('Congress')").text("Кангрэс");
				$("span.vroundbtnh25-core:contains('Election results')").text("Вынікі выбараў");
				$("span.vroundbtnh25-core:contains('Next elections')").text("Наступныя выбары");
			};
			//軍事資訊
			if (location.indexOf("/country/military/")!==-1) {
				$("table.info_message > tbody > tr > td").text("Грамадзяне гэтай краіны будуць забяспечаны 10% бонусам на пашкоджанні ў ваеннай кампаніі супраць крэўнага ворага.");
				$(".nameholder:contains('No current Natural Enemy')").text("Крэўныя ворагі адсутнічаюць. Сумна")
				$("td:contains('There are no resistance wars in this country.')").text("Паустанні адсутнічаюць.")
				var Our = $("div#profileholder > h1").text();
				$("h2.section:eq(0)").text("Ворагі");
				$("h2.section:eq(1)").html('Паветраны ўдар');
				$("h2.section:eq(2)").html(Our+' ўдзельнічае ў вайне');
				$("h2.section:eq(3)").html(Our+' прымае ўдзел у паўстанні');
				$("h2.section:eq(4)").text("саюзнікі");
				
				$("a.vroundbtnh25-core:contains('details')").text("Дэталі");
				$("a.vroundbtnh25-core:contains('All wars')").text("Усе войны");
				$("a.vroundbtnh25-core:contains('All resistance wars')").text("Усе паўстанні");
				$("a.vroundbtnh25-core:contains('All Alliances')").text("Усе саюзы");
			};
			//管理中心
			if (document.location.toString().indexOf("/country-administration/")!==-1) {
		$("span:exact('You are not a president or a congress member in this country.')").text('Вы не яўляецеся Прэзідэнтам, або членам Кангрэса ў гэтай Краіне');
		$(".adminaction > .goleft > span.goleft:contains('Hello, Congress Member')").text('Дзень добры, папільшчык!');
		$(".adminaction > .goleft > span.vround-redbtn-h20-start > span.vround-redbtn-h20-end > form > .vround-redbtn-h20-core:contains('Resign')").text('Змяніць');
		$(".adminaction > .goright:contains('Your proposals')").replaceText('Your proposals','Вашы прапановы');
		$(".adminaction span > input").attr('value','Прапанаваць закон');
		$(".holder > h2.section:contains('Law proposals')").text('Усе законы');
		//Law proposals
                $("table.laws > tbody > tr > td > a:contains('Alliance')").text('Саюз МПП');
                $("table.laws > tbody > tr > td > a:contains('President Impeachment')").text('Расстраляць Прэзідэнта');
                $("table.laws > tbody > tr > td > a:contains('Donate')").text('Грошы на оргу');
                $("table.laws > tbody > tr > td > a:contains('Natural Enemy')").text('Кроўны вораг');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Weapons')").text('Падатак: Зброя');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Food')").text('Падатак: Ежа');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Iron')").text('Падатак: Жалеза');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Grain')").text('Падатак: Зерне');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Hospital')").text('Падатак: Шпіталі');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Moving Tickets')").text('Падатак: Квіткі');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: Defense System')").text('Падатак: Абарончыя сістэмы');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes: House')").text('Падатак: Будынкі');
                $("table.laws > tbody > tr > td > a:contains('VAT & Import Taxes:')").text('Падатак: імпарт');
                $("table.laws > tbody > tr > td > a:contains('New Citizen Message')").text('Паведамленне для новага грамадзяніна');
                $("table.laws > tbody > tr > td > a:contains('Income Tax')").text('Падатак на прыбытак');
                $("table.laws > tbody > tr > td > a:contains('Peace Proposal')").text('Прапанова міру');
                $("table.laws > tbody > tr > td > a:contains('New Citizen Fee')").text('Плата новаму гульцу');
                $("table.laws > tbody > tr > td > a:contains('Buy Constructions')").text('Купіць збудаванні');
                $("table.laws > tbody > tr > td > a:contains('Issue Money')").text('Надрукаваць грошы');
                $("table.laws > tbody > tr > td > a:contains('Minimum Wage')").text('Мінімальная ЗП');
                $("table.laws > tbody > tr > td > a:contains('Trading Embargo')").text('Гандлёвае эмбарга');
                //congressman
                $(".adminaction > #laws span > a:contains('New Citizen Fee')").text('Плата новаму гульцу');
		$(".adminaction > #laws span > a:exact('Donate')").text('Грошы на оргу');
		$(".adminaction > #laws span > a:exact('Issue Money')").text('Надрукуваць грошы');
		$(".adminaction > #laws span > a:contains('VAT & Import Taxes')").text('ПДВ і падаткі на імпарт');
		$(".adminaction > #laws span > a:contains('Income Tax')").text('Падатак на прыбытак');
		$(".adminaction > #laws span > a:exact('Minimum Wage')").text('Мінімальная ЗП');
		$(".adminaction > #laws span > a:exact('President Impeachment')").text('Расстраляць Прэзідэнта');
		$(".adminaction > #laws span > a:contains('Provide citizenship')").text('Прадастаўленне грамадзянства');
		$(".adminaction > #laws span > a:exact('Natural Enemy')").text('Кроўны вораг');
		//others
		$("a:contains('Tax change')").replaceText('Tax change:','Змена падаткаў: ');
		$("table.laws.largepadded > tbody > tr > td > span.vroundbtnh25-start > span.vroundbtnh25-end > a.vroundbtnh25-core:contains('details')").text('Дэталі');
		$("table.laws.largepadded > tbody > tr > td:exact('Pending')").replaceText('Pending','Працягваецца');
		$("table.laws.largepadded > tbody > tr > td:exact('Accepted')").replaceText('Accepted','Прынята');
		$("table.laws.largepadded > tbody > tr > td:exact('Rejected')").replaceText('Rejected','Адказана');
	} else if (document.location.toString().indexOf("/law/")!==-1) {
                $('body#country > #container > #content > a').text('Адміністрацыя');
                $('.report.thelaw').text('Паскардзіцца');
                $('.holder:eq(1) > .indent > .lawtimer > p').text('Галасаванне доўжыцца 24 гадзіны');
                $(".holder:eq(1) > .indent > .lawtimer > span:exact('Approved')").text('Прынята');
                $(".holder:eq(1) > .indent > .lawtimer > span:exact('Rejected')").text('Адказана');
                $('.holder:eq(3) > .indent > p > a').text('Паглядзець іншыя законапраекты');
		$('h2').css('font-family','втф');
		$('.holder > .indent > .bordersep.special').css('font-family','втф2');
                $('.holder:eq(2) > .indent > #info > p').replaceText('Only congress members and country presidents have the right to vote.','Толькі Прэзидэнт і члены Кангрэсу маюць права галасаваць').replaceText('For this law to be considered accepted it needs 66% of the Congress votes.','Для прыняцця гэтага закона неабходна 66% галасоў кангрэсменаў');
		// law proposals
		$(".holder > .indent > .bordersep.special:contains('Law proposals')").text('Законапраэкт');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Donate')").text('Вывад грошаў з казны');
		$('.holder:eq(1) > .indent > .goleft > p.largepadded').replaceText('Proposed by','Аўтар:').replaceText(',',', Прапанавана:');
		$(".holder:eq(1) > .indent > p.largepadded:contains('Do you agree to transfer')").replaceText('Do you agree to transfer','Ці згодны Вы перавесці').replaceText('from the country accounts to','з казны да');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Alliance')").text('Саюз');
                $(".holder:eq(1) > .indent > p.largepadded:contains('protection pact with')").replaceText('President of','Прэзідэнт').replaceText('proposed a mutual protection pact with','запрапанаваў Пакт аб узаемнай абароне з');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('President Impeachment')").text('Імпічмент Прэзідэнту');
                $(".holder:eq(1) > .indent > p.largepadded:contains('the current president of')").replaceText('Do you want the current president of','Вы хочаце, каб цяперашні Прэзидэнт').replaceText('to end this office','пайшоў к чорту');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Natural Enemy')").text('Кроўны вораг');
                $(".holder:eq(1) > .indent > p.largepadded:contains('has been proposed as Natural Enemy')").replaceText('has been proposed as Natural Enemy','быў прапанаваны як кроўны вораг');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('New Citizen Fee')").text('Плата новаму гульцу');
                $(".holder:eq(1) > .indent > p.largepadded:contains('Citizen fee change')").replaceText('Citizen fee change from','Змяніць плату новаму гульцу з').replaceText('to','на');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Issue Money')").text('Друк грошаў');
                $(".holder:eq(1) > .indent > p.largepadded:contains('proposal to issue')").replaceText('Do you agree with the proposal to issue','Цi згодны Вы надрукаваць').replaceText('for','за');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Defense System')").text('Падатак: Абарончыя сістэмы');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Food')").text('Падатак: Ежа');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Weapons')").text('Падатак: Зброя');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Iron')").text('Падатак: Жалеза');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Grain')").text('Падатак: Зерне');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Hospital')").text('Падатак: Шпіталі');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: Moving Tickets')").text('Падатак: Квіткі');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: House')").text('Падатак: Будынкі');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('VAT & Import Taxes: ')").text('Падаткі');
              	$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Minimum Wage')").text('Мінімальная ЗП');
                $(".holder:eq(1) > .indent > p.largepadded:contains('return to a peace')").replaceText('The President of','Прэзідэнт').replaceText('demanded a sum of','жадае').replaceText('from your National Treasury in return to a peace treaty with','з Вашай казны ўзамен на падпісанне мірнага пагаднення');
                $('.holder:eq(1) > .indent > p.largepadded > i').text('Вы згодны?');
		//$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Buy Constructions')").text('國家建設');
                //$(".holder:eq(1) > .indent > p.largepadded:contains('should buy a')").replaceText('Do you agree that','你是否同意讓').replaceText('should buy a','買一個').replaceText('Hospital','醫院').replaceText('Defense System','防禦設施').replaceText('of quality','品質等級').replaceText('from','從').replaceText('at the price of','花費').replaceText('for','建設在');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Trading Embargo')").text('Тарговае эмбарга');
                $(".holder:eq(1) > .indent > p.largepadded:contains('stop the trade')").replaceText('President of','Прэзідэнт').replaceText('proposes to stop the trade with','зпрапанаваў спыніць гандаль з');
		$(".holder:eq(1) > .indent > .goleft > h2.special:first:contains('Income Tax')").text('Падатак на прыбытак');
                $(".holder:eq(1) > .indent > p.largepadded:contains('Income tax change')").replaceText('Income tax change from','Змена падатку на прыбытак з').replaceText('to','на');
		
		};
		;
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		// 檢舉 www.erepublik.com/en/tickets/report/
		//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
		if (location.indexOf("/tickets/report/")!==-1) {
			$('h3').css('font-family','Arial,Arial');
			$('div').css('font-family','Arial,Arial');
			// report ticket
			$('body.reportAbuseBody > a.btn-arrow-left-small').text('Адмяніць');
			$('body.reportAbuseBody > h3').replaceText('Report ','Паскардзіцца на ').replaceText('a newspaper','газету').replaceText('an article','артыкул').replaceText('a comment','каментарыі').replaceText('a wall post','шаўт').replaceText('a wall comment','каментарый да шаўту').replaceText('a party','партыю');
			$('form.reportAbuse > div:first').html('Вы збіраецеся Паскардзіцца на парушэння згодна з <a target="_blank" href="/en/laws">Правіл гульні</a> та <a target="_blank" href="/en/terms-and-conditions">Умоў прадастаўлення паслуг </ a>.</ Br> Усе скаргі канфідэнцыйныя.')
			$("form.reportAbuse > .reportLabel:contains('Reason for the report')").text('Прычына:');
			$("form.reportAbuse > select#report_reason > option[value='6']").text('Вульгарнасць');
			$("form.reportAbuse > select#report_reason > option[value='7']").text('Знявага');
			$("form.reportAbuse > select#report_reason > option[value='8']").text('Беларусафобія');
			$("form.reportAbuse > select#report_reason > option[value='9']").text('Гулец паказвае грудзі');
			$("form.reportAbuse > select#report_reason > option[value='10']").text('Спам');
			$("form.reportAbuse > select#report_reason > option[value='11']").text('Рэклама');
			$("form.reportAbuse > select#report_reason > option[value='16']").text('Тролінг');
			$("form.reportAbuse > .reportMessage:contains('By submitting this report')").html('Прадстаўляючы гэтую скаргу, Вы пацвярджаеце, што паўторныя непраўдзівыя скаргі могуць прывесці да дысцыплінарных мер, якія будуць прынятыя супраць вашага акаўнта.</br> ')
			$("form.reportAbuse > .reportLabel:contains('Language in which the reported content is written')").text('Мова:');
			$("form.reportAbuse > div:last > input[value='Report']").attr('value','Паскардзіцца');
		};
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	// 'economy.erepublik.com
	//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/
	//} else if (host==='economy') {
		//if (location.indexOf("/market")!==-1) {
			// economy.erepublik.com/en/market/
		
		
		if (document.location.toString().indexOf("/market/")!==-1) {
			
			$('h1').css('font-family','Arial,Arial');
			$('h4').css('font-family','Arial,Arial');
			// market
			$("#marketplace > h1:contains('Marketplace')").text('Рынак');
			$("#filters_expanded > h4:contains('Select product')").text('Выберыце тавар');
			$(".product_selector > ul > li > a[title='Food'] > strong").text('Ежа');
			$(".product_selector > ul > li > a[title='Weapons'] > strong").text('Зброя');
			$(".product_selector > ul > li > a[title='House'] > strong").text('Будынкі');
			$(".product_selector > ul > li > a[title='Moving Tickets'] > strong").text('Квіткі');
			$(".product_selector > ul > li > a[title='Food Raw Materials'] > strong").text('Зерне');
			$(".product_selector > ul > li > a[title='Weapon Raw Materials'] > strong").text('Жалеза');
			$(".product_selector > ul > li > a[title='Hospital'] > strong").text('Шпіталі');
			$(".product_selector > ul > li > a[title='Defense System'] > strong").text('Сістэмы абароны');
			$(".product_selector > ul > li.last > a > strong").text('Прадпрыемствы');
			$("#filters_expanded > #minReq > h4:contains('Select quality')").text('Выберыце якасць');
			$("#filters_summary > .sactual > .sattr > small:exact('Health restore')").text('Аднаўленне здароўя');
			$("#filters_summary > .sactual > .sattr > small:exact('Fire Power')").text('Магутнасць');
			$("#filters_summary > .sactual > .sattr > small:exact('Durability')").text('К-сць выстралаў');
			$("#filters_summary > .sactual > .sattr > small:exact('Health')").text('Здароўе');
			$("#filters_summary > .sactual > .sattr > small:exact('Moving Distance')").text('Адлегласць паездкі');
			$("#filters_summary > .sactual > .sattr > small:exact('Uses/Player')").text("Колькасць раз / кожны гулец");
			$("#filters_summary > .sactual > .sattr > small:exact('Defense Budget')").text("Моц");
			$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ use')").text('/ за раз');
			$("#filters_summary > .sactual > .sattr > div > span.solid.health > strong:exact('/ day')").text('/ дзень');
			$("#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact(' uses')").text(' разоў');
			$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("use(s)")').text('раз(оў)');
			$('#filters_summary > .sactual > .sattr > div > span.solid.durability > strong:exact("day(s)")').text('дзён');
			$('#filters_summary > .sactual > .sattr > div > span.solid.moving_distance > strong:exact("zone(s)")').text('зоны');
			$("#filters_summary > .sactual > .schange > a > span:contains('Change')").text('Змяніць');
			$("#marketplace > table > thead > tr.m_mainh > th.m_product:contains('Product')").text('Прадукт');
			$('#marketplace > table > thead > tr.m_mainh > th.m_provider').text('Прадавец');
			$('#marketplace > table > thead > tr.m_mainh > th.m_stock').text('На Сховішча');
			$("#marketplace > table > thead > tr.m_mainh > th.m_price > a[title='Price']").text('Цана');
			$('#marketplace > table > thead > tr.m_mainh > th.m_quantity').text('К-сць');
			$('#marketplace > table > tbody > tr > td.m_buy > a > span').text('Купіць');
			$("table.info_message > tbody > tr > td:contains('There are no market offers matching you search.')").text('Прапановы па Вашым запыце адсутнічаюць.');
			};
				
			 
			//if (document.location.toString().indexOf("/economy/job-market/")!==-1) {
				// economy.erepublik.com/en/market/job/
				// job market
				//$("#job_market > h1:contains('Job market')").text("Цэнтр занятасці");
				//$("table.info_message > tbody > tr > td:contains('You already work for ')").replaceText('You already work for ','Вы ўжо  працуеце на ').replaceText('. To apply for this job you have to quit your current job.',". Каб ўладкавацца на новае прадпрыемства, Вам неабходна звольніцца з папярэдняга.");
				//$('#job_market > table > thead > tr.jm_mainh > th.jm_company').text('Наймальнік');
				//$('#job_market > table > thead > tr.jm_mainh > th.jm_industry').text(' ');
				//$('#job_market > table > thead > tr.jm_mainh > th.jm_salary > a').text('Плата');
				//$('#job_market > table > thead > tr > th.jm_apply > a > span').text('Уладкавацца');
			//};
		};
		if (location.indexOf("/company/create")!==-1) {
			// economy.erepublik.com/en/company/create
			$('h1').css('font-family','Arial,Arial');
			$('h3').css('font-family','Arial,Arial');
			// create company
			$('h1:first').text('Заснаваць');
			$('.create_building > h3:first').text('Выберыце тып');
			$(".create_links > a[title='Food Raw Materials'] > span").text('Зерне');
			$(".create_links > a[title='Weapon Raw Materials'] > span").text('Жалеза');
			$(".create_links > a[title='Factories'] > span").text('Фабрыкі');
			$(".create_links > a[title='Storage'] > span").text('Сховішча');
			$(".create_links > a[title='Training grounds'] > span").text('Трэніровачныя пляцоўкі');
			$('.create_building > h3#second_title').text('Выберыце будынак');
			$('ul.buildings > li.food:eq(0) > a > strong').text('Зерневая ферма');
			$('ul.buildings > li.food:eq(1) > a > strong').text('Фруктовы сад');
			$('ul.buildings > li.food:eq(2) > a > strong').text('Рыбацкі домік');
			$('ul.buildings > li.food:eq(3) > a > strong').text('Кароўнік');
			$('ul.buildings > li.food:eq(4) > a > strong').text('Паляўнічы домік');
			$('ul.buildings > li.weapon:eq(0) > a > strong').text('Жалезная шахта');
			$('ul.buildings > li.weapon:eq(1) > a > strong').text('Нафтавая свідравіна');
			$('ul.buildings > li.weapon:eq(2) > a > strong').text('Алюмініевая шахта');
			$('ul.buildings > li.weapon:eq(3) > a > strong').text('Шахта салетры');
			$('ul.buildings > li.weapon:eq(4) > a > strong').text('Каучукавая плантацыя');
			$("ul.buildings > li.factories > a > strong:contains('Food')").text('Пякарня');
			$("ul.buildings > li.factories > a > strong:contains('Weapons')").text('Фабрыка зброі');
			$("ul.buildings > li.storage > a > strong:contains('Normal')").text('Звычайнае Сховішча');
			$("ul.buildings > li.storage > a > strong:contains('Large')").text('Велікае Сховішча');
			$('ul.buildings > li.train:eq(0) > a > strong').text('Басейн');	
			$('ul.buildings > li.train:eq(1) > a > strong').text('Перакладзіна');
			$('ul.buildings > li.train:eq(2) > a > strong').text('Стрэльбішча');
			$('ul.buildings > li.train:eq(3) > a > strong').text('Палігон');
			$('ul.buildings > li.train > .train_cost').replaceText('train','трэн.');
			$('form#companyCreateForm a#construct > span').text('Будаваць');
		} else {
			$('h2').css('font-family','Arial,Arial');
			$('h4').css('font-family','Arial,Arial');
			// company profile
			$('#companyOptions > .content_part > .left_part > ul > li > a.edit').html('<img src="http://www.erepublik.com/images/modules/_icons/company_edit_details.png" alt=""> ????');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Sell company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_sell.png" alt=""> ????');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Company profile')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_profile.png" alt=""> ????');
			$("#companyOptions > .content_part > .left_part > ul > li > a:contains('Migrate company')").html('<img src="http://www.erepublik.com/images/modules/_icons/company_migrate.png" alt=""> ??????');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food raw material stock')").text('??????');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapon raw material stock')").text('??????');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total food stock')").text('????');
			$("#company_info_panel > .elements > .product_stock > h2:contains('Total weapons stock')").text('????');
			$("#company_info_panel > .elements > .product_stock > .stats > p:contains('This data is confidential.')").text('????????.');
			$('#company_info_panel > .elements > .finances > h2:first').text('????');
			$('#company_info_panel > .elements > .raw_materials > h2:first').text('????');
			$("#company_info_panel > .elements > .raw_materials > .stats > p:contains('This data is confidential.')").text('????????.');
			$('#company_info_panel > .elements > .raw_materials > .stats > p').replaceText('raw material req. per ','????, ???????').replaceText('food','??.').replaceText('weapon','??.');
			$('#company_info_panel > .manage_panel > .storage_actions > table > tbody > tr > td > a > span').text('??????');
			$('#company_info_panel > .manage_panel > .finances_actions > table > tbody > tr > td > a > span').text('??????');
			$('#company_info_panel > .manage_panel > .raw_materials_actions > tbody > tr > td > a > span').text('??????');
			$('#production_status > table.stats > tbody > tr > td > .employee > big > span:last').text('??');
			$('#production_status > table.stats > tbody > tr > td > .employee > .recommended_employees > a.manage_link').text('????');
			$("table.info_message > tbody > tr > td:contains('You can view your market licences and sell products directly from your')").html('???????????? <a href="http://www.erepublik.com/en/economy/inventory" rel="noreferrer">??</a> ????.');
			$("table.error_message > tbody > tr > td:contains('This company name is already used by another Erpk entity. Please choose another one.')").text('????????????, ???????????.');
			if (location.indexOf("/company/sell/")!==-1) {
				// company sell
				$('.sell_company > h2:first').text('Продаж або закрыццё прадпрыемства');
				$('.sell_company > .disolve_company > h2:first').text('Закрыццё прадпрыемства');
				$('.sell_company > .disolve_company > table > tbody > tr > td > p').replaceText('You can dissolve your company for','Вы можаце Закрыць прадпрыемства за');
				$(".sell_company > .disolve_company > table > tbody > tr > td > a[title='Dissolve company'] > span").text('Закрыць прадпрыемства');
				$("table.info_message > tbody > tr > td:contains('Raw Material buildings cannot be sold.')").text('Сыравінныя прадпрыемствы не могуць быць прададзены.')
				$("table.info_message > tbody > tr > td:contains('This building cannot be sold nor dissolved.')").text('Прадпрыемства не можа быць прададзена або закрыта.')
				//$("table.info_message > tbody > tr > td:contains('Dissolving a company will empty')").text('????????????????, ???????????????.')
				$("table.info_message > tbody > tr > td:contains('This company can be put on sale starting with')").replaceText('This company can be put on sale starting with','Прадпрыемства можа быць пастаўлена на продаж пасля').replaceText('of the New World, at',' ').replaceText("(10 days since it was created or bought).","10 дзён з часу заснавання або куплі");
			};
		};
		if (location.indexOf("/messages")!==-1){
			$('#topratedtab > a > span').text('Лісты');
			$('ul.tabs > li:eq(1) > a > span').text('Паведамленні');
			
		};
	};
window.setTimeout(missionstats, 500);

};