// ==UserScript==
// @name        Gameminer.ru Translation
// @namespace   Gameminer.ru Translation
// @description Gameminer.ru Translation
// @include     http://gameminer.ru/*
// @include     http://www.gameminer.ru/*
// @version     1.0.0 BETA
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/cowboy/jquery-replacetext/master/jquery.ba-replacetext.min.js
// ==/UserScript==


//Main Navigation
$("a.header__menu-item:contains('Форум')").replaceText('Форум','Forums');
$("a.header__menu-item:contains('Сообщения')").replaceText('Сообщения','Messages');
$("a.header__menu-item:contains('Раздачи')").replaceText('Раздачи','Giveaways');
$("a.header__menu-item:contains('Профиль')").replaceText('Профиль','Account');
$("a.header__menu-item:contains('Поддержка')").replaceText('Поддержка','Help');
$("a.header__menu-item:contains('Выйти')").replaceText('Выйти','Logout');

//Page footer
$("li:contains('Пользователей:')").replaceText('Пользователей:','Members:');
$("li:contains('Завершено раздач:')").replaceText('Завершено раздач:','Received Gifts:');
$("li:contains('Сумма выигрышей:')").replaceText('Сумма выигрышей:','Received Gifts Valued at:');
$("li:contains('Мы в сети')").replaceText('Мы в сети','Follow Us');
$("a:contains('О нас')").replaceText('О нас','About Us');
$("a:contains('Как это работает?')").replaceText('Как это работает?','How it works?');
$("a:contains('Напишите нам')").replaceText('Напишите нам','Feedback');
$("a:contains('Правила пользования')").replaceText('Правила пользования','Rules');
$("a:contains('FAQ')").replaceText('FAQ','FAQ');
$("li:contains('Мы в сети')").replaceText('Мы в сети','Follow Us');
$("a:contains('Вконтакте')").replaceText('Вконтакте','Vkontaktje');
$("a:contains('Facebook')").replaceText('Facebook','Facebook');
$("a:contains('Twitter')").replaceText('Twitter','Twitter');
$("a:contains('Steam')").replaceText('Steam','Steam');
$("li:contains('Мы принимаем')").replaceText('Мы принимаем','Payments We Accept');
$("a:contains('Инструкции по оплате')").replaceText('Инструкции по оплате','Payment Instructions');


// Account page
$("a:contains('Достижения')").replaceText('Достижения','Achievements');
$("a:contains('Настройки')").replaceText('Настройки','Settings');
$("a:contains('Инвайты')").replaceText('Инвайты','Invites');
$("a:contains('Покупки')").replaceText('Покупки','Payments');
$("p:contains('Дата регистрации:')").replaceText('Дата регистрации:','Member Since:');
$("p:contains('Уровень:')").replaceText('Уровень:','Member Level:');
$("p:contains('Профиль в Steam:')").replaceText('Профиль в Steam:','Steam Profile:');
$("p:contains('Участий в раздачах:')").replaceText('Участий в раздачах:','Giveaways Entered:');
$("p:contains('Выигранных раздач:')").replaceText('Выигранных раздач:','Giveaways Won:');
$("p:contains('Созданных раздач:')").replaceText('Созданных раздач:','Giveaways Created:');
$("p:contains('Сумма раздач:')").replaceText('Сумма раздач:','Contribution Value:');
$("p:contains('Опыт:')").replaceText('Опыт:','Experience:');
$("p:contains('Максимум угля:')").replaceText('Максимум угля:','Coal Limit:');
$("p:contains('Угля в час:')").replaceText('Угля в час:','Coal per hour:');
$("p:contains('Инвайтов в сутки:')").replaceText('Инвайтов в сутки:','Invites per day:');
$("p:contains('Поднятие темы на торговом форуме:')").replaceText('Поднятие темы на торговом форуме:','Create topic in trading forum:');
$("p:contains('раз в')").replaceText('раз в','one per');
$("p:contains('минут')").replaceText('минут','minutes');
$("h2.achievement-title:contains('Достижения')").replaceText('Достижения','Achievements');

//Home page
$("a:contains('Создать раздачу')").replaceText('Создать раздачу','Create Giveaway');
$("span:contains('Получите уголь, золото и опыт в награду')").replaceText('Получите уголь, золото и опыт в награду','Get coal, gold and experience points');
$("div.dashboard__user > a.dashboard__user-invite:contains('Пригласить друга')").replaceText('Пригласить друга','Invite friends');
$("p:contains('Автор:')").replaceText('Автор:','Author:');
$("p:contains('Участники:')").replaceText('Участники:','Participants:');
$("p:contains('Стоимость:')").replaceText('Стоимость:','Cost:');
$("div.dashboard__money-body > div > span:contains('золото')").replaceText('золото','gold');
$("div.dashboard__money-body > div > span:contains('золота')").replaceText('золота','gold');
$("div.dashboard__money-body > div > span:contains('угля')").replaceText('угля','coals');
$("div.dashboard__money-body > div > span:contains('уголь')").replaceText('уголь','coal');
$("span.g-white:contains('золото')").replaceText('золото','gold');
$("span.g-white:contains('золота')").replaceText('золота','gold');
$("span.g-white:contains('угля')").replaceText('угля','coals');
$("span.g-white:contains('уголь')").replaceText('уголь','coal');
$("span.giveaway__timeleft-text:contains('осталось')").replaceText('осталось','Time left:');
$("span.giveaway__timeleft:contains('часов')").replaceText('часов','hours');
$("span.giveaway__timeleft:contains('часа')").replaceText('часа','hours');
$("span.giveaway__timeleft:contains('час')").replaceText('час','hours');
$("span.giveaway__timeleft:contains('минуты')").replaceText('минуты','minutes');
$("span.giveaway__timeleft:contains('минутa')").replaceText('минутa','minute');
$("span.giveaway__timeleft:contains('минут')").replaceText('минут','minutes');
$("span.giveaway__timeleft:contains('день')").replaceText('день','day');
$("span.giveaway__timeleft:contains('дня')").replaceText('дня','days');
$("div.dashboard__money-body > div > span:contains('часов')").replaceText('часов','hours');
$("div.dashboard__money-body > div > span:contains('часа')").replaceText('часа','hours');
$("div.dashboard__money-body > div > span:contains('час')").replaceText('час','hours');
$("div.dashboard__money-body > div > span:contains('минуты')").replaceText('минуты','minutes');
$("div.dashboard__money-body > div > span:contains('минутa')").replaceText('минутa','minute');
$("div.dashboard__money-body > div > span:contains('минут')").replaceText('минут','minutes');
$("div.dashboard__money-body > div > span:contains('день')").replaceText('день','day');
$("div.dashboard__money-body > div > span:contains('дня')").replaceText('дня','days');
$("div.dashboard__money-body > div > span:contains('через')").replaceText('через','in');
$("p:contains('Победитель:')").replaceText('Победитель:','Winner:');
$("h1:contains('Последние завершенные раздачи')").replaceText('Последние завершенные раздачи','Latest finished giveaways');
$("h1:contains('Обычные раздачи')").replaceText('Обычные раздачи','Normal giveaways');
$("h1 > span:contains('Золотые')").replaceText('Золотые','Golden');
$("h1:contains('раздачи')").replaceText('раздачи','giveaways');
$("a:contains('Все завершенные раздачи')").replaceText('Все завершенные раздачи','All finished giveaways');
$("h1:contains('Топ раздающих за неделю')").replaceText('Топ раздающих за неделю','Top gifters this week');
$("h1:contains('Топ раздающих')").replaceText('Топ раздающих','Top gifters');
$("div:contains('игры')").replaceText('игры','games');
$("div:contains('игр')").replaceText('игр','games');
$("div.giveaway__action:contains('Недостаточно золота')").replaceText('Недостаточно золота','Not enough gold');
$("div.giveaway__action:contains('Недостаточно угля')").replaceText('Недостаточно угля','Not enough coal');
$("div.giveaway__action:contains('Уже участвуете')").replaceText('Уже участвуете','Already entered');
$("input[value='Участвовать']").attr('value','Enter giveaway');
$("th:contains('Обсуждения')").replaceText('Обсуждения','Discussions');
$("th:contains('Торговля')").replaceText('Торговля','Trade');
$("th:contains('Темы')").replaceText('Темы','Topics');
$("th:contains('Сообщения')").replaceText('Сообщения','Posts');
$("a:contains('Обменник')").replaceText('Обменник','Exchange');
$("a:contains('Получить')").replaceText('Получить','Buy more');

// Messages page
$("h1:contains('Сообщения')").replaceText('Сообщения','Messages');
$("th:contains('Тема')").replaceText('Тема','Topic');
$("th:contains('От кого')").replaceText('От кого','From');
$("div.giveaway-comments-pages:contains('Показаны')").replaceText('Показаны','Displaying');
$("div.giveaway-comments-pages:contains(' - ')").replaceText(' - ',' of ');
$("div.giveaway-comments-pages:contains('сообщений')").replaceText('сообщений','messages');
$("div.container > div.page > table.table > tbody.messages__messages > tr > td.valign-middle > a:contains('Вы получили новое достижение!')").replaceText('Вы получили новое достижение!','You have just been awarded an Achievement!');
$("div.container > div.page > div.page-header > h1:contains:contains('Вы получили новое достижение!')").replaceText('Вы получили новое достижение!','You have just been awarded an Achievement!');
$("div.container > div.page > table.table > tbody.messages__messages > tr > td.valign-middle > a:contains('Вы получили бонус за приглашенного друга')").replaceText('Вы получили бонус за приглашенного друга','You got bonus for inviting your friend');
$("div.container > div.page > div.page-header > h1:contains('Вы получили бонус за приглашенного друга')").replaceText('Вы получили бонус за приглашенного друга','You got bonus for inviting your friend');
$("div.container > div.page > table.table > tbody.messages__messages > tr > td.valign-middle > a:contains('Раздача')").replaceText('Раздача','Giveaway for');
$("div.container > div.page > table.table > tbody.messages__messages > tr > td.valign-middle > a:contains('окончена')").replaceText('окончена','has ended!');

// Achievements page
$("h1:contains('Достижения')").replaceText('Достижения','Achievements');

// Invites page
$("h1:contains('Инвайты')").replaceText('Инвайты','Invites');

$("p:contains('Раз в сутки здесь генерируются приглашения, которые вы можете раздавать своим друзьям и просто знакомым.')").replaceText('Раз в сутки здесь генерируются приглашения, которые вы можете раздавать своим друзьям и просто знакомым.','Invitates are distributed once a day, give them to your friends.');
$("p:contains('Если вы пригласили друга, а у него на его Steam аккаунте сумма купленных игр превосходит')").replaceText('Если вы пригласили друга, а у него на его Steam аккаунте сумма купленных игр превосходит','If you invite a friend, and he has Steam account with games whose value exceeds');
$("p:contains('то за такого друга вы получите')").replaceText('то за такого друга вы получите','then for such a friend you get');
$("p:contains('золото. Имейте в виду, что если у вашего друга закрытый профиль, то мы не сможем посчитать сумму его игр и выдать вам золото.')").replaceText('золото. Имейте в виду, что если у вашего друга закрытый профиль, то мы не сможем посчитать сумму его игр и выдать вам золото.','gold. Keep in mind that if your friend has private profile, we can not calculate the sum of his games and give you gold.');
$("th:contains('Код')").replaceText('Код','Code');
$("th:contains('Истекает через')").replaceText('Истекает через','Expires In');
$("th:contains('Статус')").replaceText('Статус','Status');
$("td:contains('день')").replaceText('день','day');
$("td:contains('часа')").replaceText('часа','hours');
$("td:contains('Доступен')").replaceText('Доступен','Available');
$("td:contains('Приглашен')").replaceText('Приглашен','Invited:');

// Help page
$("a:contains('Создать тему')").replaceText('Создать тему','Create Topic');
$("a:contains('Следующая')").replaceText('Следующая','Next');

// Help page
$("a:contains('Создать тему')").replaceText('Создать тему','Create Topic');
$("a:contains('Следующая')").replaceText('Следующая','Next');

// Change these messages to suit your needs.
$(".giveaway-add-comment").attr("id", "id-add-comment");
$(".btn").attr("name", "submit_comment");

$("body").append("<style>.giveaway-coal {display: inline-block;background-color: #c1c1c1;padding: 4px 10px 4px;margin-bottom: 0;font-size: 14px;line-height: 18px;color: #333333;text-align: center;text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);vertical-align: middle;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);*margin-left: .3em;}.giveaway-entered {display: inline-block;padding: 4px 10px 4px;margin-bottom: 0;font-size: 14px;line-height: 18px;color: #fff;text-align: center;text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);vertical-align: middle;-webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;-webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);-moz-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);*margin-left: .3em;background-color: #365aa4;background-image: -moz-linear-gradient(top, #3350a5, #3a66a2);background-image: -ms-linear-gradient(top, #3350a5, #3a66a2);background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#3350a5), to(#3a66a2));background-image: -webkit-linear-gradient(top, #3350a5, #3a66a2);background-image: -o-linear-gradient(top, #3350a5, #3a66a2);background-image: linear-gradient(top, #3350a5, #3a66a2);background-repeat: repeat-x;filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffc10f', endColorstr='#3350a5', GradientType=0);border-color: #3a66a2 #3a66a2 #234879;border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);}</style>");

var oen = "<span class=\"giveaway-entered\">Already entered</span>";
var oco = "<span class=\"giveaway-coal\">Not enough coal</span>";
var ogo = "<span class=\"giveaway-coal\">Not enough gold</span>";
document.body.innerHTML = document.body.innerHTML.replace(new RegExp("Already entered","gm"),oen).replace(new RegExp("Not enough coal","gm"),oco).replace(new RegExp("Not enough gold","gm"),ogo);

var thanks = ["Спасибо", "Спасибо тебе", "Спасибо за раздачу", "Спасибо раздающему и всем удачи", "Спс огромное", "Спс"];
var punc = ["", ".", "!"];

// Stop suiting your needs here.
var cf = document.getElementById("id-add-comment");
if (cf) {
	cf = cf.getElementsByTagName("form")[0];
    
	var postBody = cf.elements.data;
    
	var thx = document.createElement("input");
	thx.type = "submit";
	thx.value = "Спасибо";
	thx.name = "submit_thnx";
	thx.className = "btn btn-golden";
	thx.addEventListener("click", function(ev) {
		postBody.value = thanks[Math.floor(Math.random() * thanks.length)] + punc[Math.floor(Math.random() * punc.length)];
        
		// this is stupid
		var s = document.createElement("input");
		s.type = "hidden";
		s.name = "submit_comment";
		s.value = "Добавить";
		cf.appendChild(s);
	});
    
	var p = cf.elements.submit_comment.parentNode;
	p.appendChild(document.createTextNode(" "));
	p.appendChild(thx);
}