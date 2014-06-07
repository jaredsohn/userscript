// ==UserScript==
// @name           eRepublik Russian language
// @namespace      
// @description    eRepublik Russian language
// @version        1.00a
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Главная",
	"Citizen name" : "Имя гражданина",
	"Donate" : "Пожертвования",
	"Password" : "Пароль",
	"Rank"   : "Ранг",
	"Company" : "Компания", 
	"Profile":"Профиль", 
	"Party" : "Партия", 
	"Newspaper" :"Газета",
	"Army" : "Армия",
	"Country administration" : "Правительство",
    "Organizations" : "Организации",
	"Market place" : "Рынок",
	"Monetary market" : "Валютный рынок",
	"Job market" : "Биржа труда",
    "Companies for sale" : "Призводители",
    "Get gold &amp; extras" : "Покупка золота",
	"Rankings" : "Рейтинги",
	"Social stats" : "Демография",
	"Economic stats" : "Экономические сводки",
	"Political stats" : "Политика",
	"Military stats" : "Военная статистика",
	"Tools" : "Инструментарий",
	"Forum" : "Форум",
	"News" : "Новости",
	"Invite friends" : "Пригласить друзей",
	"eRepublik Shop" : "Магазин eRepublik",
	"Career path" : "Карьера",
	"Ok, thanks, next tip" : "Ладно, спасибо, в следующая подсказка",
	"I have nothing more to say at the moment" : "Мне нечего больше сказать на данный момент",
	"Select" : "Выберай",

	"Marketplace" : "Рынок",
	"Wars" : "Войны",

// country page
	"On the Map" : "На карте",
	"Total citizens" : "Всего граждан",
	"New citizens today" : "Новые граждане за сегодня",
	"Average citizen level" : "Средний уровень жителя",
	"Online now": "Сейчас в игре",
	"Citizens" : "Граждане",
	"Who" : "Кто",
	"details" : "подробнее",
	"Society" : "Общество",
	"Economy" : "Экономика",
	"Politics" : "Политика",
	"Military" : "Военный",
	"Administration" : "Администрация",
	
// countries
	"Argentina" : "Аргентина",
	"Australia" : "Австралия",
	"Austria" : "Австрия",
	"Bosnia and Herzegovina" : "Босния и Герцеговина",
	"Brazil" : "Бразилия",
	"Bulgaria" : "Болгария",
	"China" : "Китай",
	"Croatia" : "Хорватия",
	"Canada" : "Канада",
	"Czech Republic" : "Чехия",
	"Denmark" : "Дания",
	"Estonia" : "Эстония",
	"Finland" : "Финляндия",
	"France" : "Франция",
	"Germany" : "Германия",
	"Greece" : "Греция",
	"Hungary" : "Венгрия",
	"Indonesia" : "Индонезия",
	"Ireland" : "Ирландия",
	"Israel" : "Израиль",
	"Italy" : "Италия",
	"Iran" : "Иран",
	"Japan" : "Япония",
	"Latvia" : "Латвия",
	"Lithuania" : "Литва",
	"Malaysia" : "Малазия",
	"Mexico" : "Мексика",
	"Moldavia" : "Молдавия",
	"Netherlands" : "Голландия",
	"Norway" : "Норвегия",
	"Pakistan" : "Пакистан",
	"Philippines" : "Филиппины",
	"Poland" : "Польша",
	"Portugal" : "Португалия",
	"Romania" : "Румыния",
	"Serbia" : "Сербия",
	"Singapore" : "Сингапур",
	"South Africa" : "Южная Африка",
	"South Korea" : "Южная Корея",
	"Slovakia" : "Словакия",
	"Slovenia" : "Словения",
	"Switzerland" : "Швейцария",
	"Spain" : "Испания",
	"Sweden" : "Швеция",
	"Russia" : "Россия",
	"Thailand" : "Таиланд",
	"United Kingdom" : "Великобритания",
	"Ukraine" : "Украина",
	"USA" : "США",
	"Turkey" : "Турция",
	"World" : "Мир",
// economy
	"GOLD" : "ЗОЛОТО",
	"Gold" : "Золото",
	"Treasury" : "Казначейство",
	"All accounts" : "Все счета",
	"Country trading embargoes" : "Торговое эмбарго",
	"Taxes" : "Налог",
	"food" : "еда",
	"gift" : "подарок",
	"weapon" : "оружие",
	"moving tickets" : "проездной билет",
	"grain" : "зерно",
	"diamonds" : "алмазы",
	"iron" : "железо",
	"oil"  : "нефть",
	"wood" : "дерево",
	"house" : "дом",
	"hospital" : "Больница",
	"defense system" : "ПРО",

	"Salary" : "Зарплата",
	"Minimum" : "Минимум",
	"Average" : "Среднее",

	"Gross domestic product (GDP)" : "Валовой внутренний продукт (ВВП)",
	"Monthly exports" : "Месячный экспорт",

	"Monthly imports" : "Ежемесячный импорт",
	"Inflation" : "Инфляция",
// company
	"Office" : "Офис",
	"You have already worked today." : "Вы уже работали сегодня.",
	"Come back tomorrow." : "Возвращайтесь завтра.",
	"Resign" : "Уволиться",
	"Employees" : "Сотрудники",
	"Raw materials" : "Сырье",
	"Show all employees" : "Все работники",
	"Show all donations" : "Пожертвования",
	"Go to marketplace" : "Перейти на рынок",
	"Products" : "Товары",

	"Grain" : "Зерно",
	"Food" : "Еда",
	"Gift" : "Подарки",
	"Weapon" : "Оружие",
	"Moving Tickets" : "Транспортный билет",
	"Diamonds" : "Алмазы",
	"Iron" : "Железо",
	"Oil"  : "Нефть",
	"Wood" : "Дерево",
	"House" : "Дом",
	"Hospital" : "Больница",
	"Defense System" : "ПРО",
// market
	"Quality Level" : "Уровень качества",
	"All levels" : "Все уровни",
	"Level 1" : "1-ого уровня",
	"Level 2" : "2-ого уровня",
	"Level 3" : "3-его уровня",
	"Level 4" : "4-ого уровня",
	"Level 5" : "5-ого уровня",

	"Provider" : "Продавец",
	"Quality" : "Качество",
	"Stock" : "Фондовый",
	"Buy" : "Покупка",
	"Market" : "Рынок",

	"Market offers" : "Рыночное предложение",
	"Amount" : "Количество",
	"Price" : "Цена",
	"Next" : "Следующий",
	"Prev" : "Предыдущий",
	"No products in this market" : "Нет продуктов на этом рынке",
	"Go to marketplace" : "Перейти на рынок",
	"Jobs available in this company" : "Работа в этой компании",
	"You don't have any active job offers" : "Нет активных предложений работы",
	"You didn't specify the amount of products you wish to buy" : 
		"Вы не указали объем продукции, который хотите купить",
	"You cannot trade with this country as you are at war with it" :
		"Вы не можете торговать с этой страной, так как вы ведете войну с ней",

// region
        "Heal" : "Лечить",
	"Constructions": "Конструкции",
	"Population": "Население",
	"Productivity" : "Производительность",
	"Resistance War" : "Революция",
	"Resistance War Active" : "Активные революции",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Вы не можете начать революцию в этом регионе, поскольку он уже принадлежит к ее первоначальному владельцу",
	"Medium" : "Средний",
	"High": "Высокий",
	"Neighbors" : "Соседи",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Выберите промышленность, чтобы увидеть предложения",
	"Skill Level" : "Уровня квалификации",
	"All skills" : "Навыки",
	"All" : "Все",
// politics
	"Country Administration" : "Правительство",
	"Accepted" : "Принимаемые",
	"Rejected" : "Отклонено",
  "Pending" : "Рассматриваемый",
	"Congress" : "Дума",
	"Issue Money" : "Выпуск денег",
	"Law proposals" : "Законопроект",
	"Minimum Wage" : "Мин. зарплата",
	"Mutual Protection Pact" : "Пакт по взаимной защите",
	"Peace Proposal" : "Мирное предложение",
	"President" : "Президент",
	"Yes" : "Да",
	"No" : "Нет",
	"Show all law proposals" : "Показать все законопроекты",
	"The law voting process takes 24 hours." : "Голосование состоится в течении 24 часов.",
	"Only congress members and country presidents have the right to vote." : "Только члены думы, и президент страны имеет право голоса.",
	"You are not a president or a congress member in this country." : "Вы не являетесь президентом или членом Думы в этой стране.",
// wars
	"no allies" : "нет союзников",
	"All wars" : "Все войны",
	"All resistance wars" : "Все революции",
	"All Alliances" : "Все союзы",
	"Alliances" : "Альянсы",
	"Military force" : "Военные силы",
	"Average strength" : "Средняя численность",
// army
	"You have trained today. You can train again tomorrow." : "Вы сегодня тренировались. Следующая тренировка завтра.",
	"Force" : "Силы",
	"Military rank" : "Воинские звания",
	"Military achievements" : "Военные успехи",
	"Active wars list" : "Активный список войн",
	"Sergeant" : "Сержант",
	"Corporal" : "Лейтенант",
	"Private" : "Частные",
	"Show active wars" : "Активные войны",
	"Start a resistance war" : "Начать революцию",

	"You cannot join this fight because your country is not involved in the war" : "Вы не можете присоединиться к этой борьбе, поскольку ваша страна не участвует в войне",
	"There are no resistance wars in this country." : "В данной стране нет революции.",
	"until the region can be occupied or secured" : "до тех пор, пока регион не захвачен или защищен",
	"Attackable on President's decision" : "Уязвимый по решению президента",
	"Defense Points" : "Точки защиты",
	"Go to Battlefield" : "Вступить в войну",
	"see finished battles" : "см. закончили бои",
	"Wars list" : "Список войн",
	"War" : "Война",
	"Battle history" : "История битвы",
	"Fight" : "Атака!",
	"Hero" : "Герой",
	"Started by" : "Начал",
// party
	"You are not a member of a party" : "Вы не являетесь членом партии",
	"Join a party" : "Вступить в партию",
	"Create new" : "Создать новую",
	"Join" : "Вступить",
	"See all members" : "Лист однопартийцев",
	"Donate Gold" : "Пожертвования золотом",
	"Members"  : "Члены",
	"Orientation" : "Направление",
	"Show all members" : "Показать всех членов",

	"Center" : "Централы",
	"Anarchist" : "Анархисты",
	"Accounts" : "Счета",
	"Elections" : "Выборы",
	"Election results" : "Результаты выборов",
	"Next elections" : "Следующие выборы",

	"Country Presidency" : "Президент страны",
	"Party Presidency" : "Президиум",
	"Party President" : "Глава партии",
	"See results" : "Результаты",
	"Expires tomorrow" : "Завтра истекает",

// articles
	"Report abuse" : "Пожаловаться",
	"today" : "сегодня",
	"yesterday" : "завтра",
	"one hour ago" : "час назад",
	"Unsubscribe" : "Отписаться",
	"Subscribe" : "Подписаться",
	"Article RSS" : "Статьи RSS",
	"Your comment" : "Ваш комментарий",
	"View all comments" : "Все комментарии",
	"Subscribe to comments" : "Подписаться на комментарии",
	"Unsubscribe to comments" : "Отписаться от комментариев",
	"Post a comment" : "Добавить комментарий",
// news
	"You do not have a newspaper" : "У вас нет газеты",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Газета представляет собой эффективный способ сообщить ваши новости в мире eRepublik. Подробнее о eRepublik Wiki. Создайте свою собственную газету.",
// profiles
	"Friends" : "Друзья",
	"Assets" : "Активы",
	"Press director" : "Пресс-директор",
	"Inventory" : "Инвентаризация",
	"Get Gold" : "Получить золото",
	"Career" : "Карьера",
	"Bio" : "Биография",
	"Employee" : "Работник",
	"No political activity" : "Вы не член партии",
	"Wellness" : "Здоровье",
	"Level" : "Уровень",
	"Strength" : "Сила",
	"Experience" : "Опыт работы",
	"Skills:" : "Навыки",
	"Land" : "Земледелие",
	"Manufacturing" : "Промышленность",
	"Erepublik Age" : "Возрасть в Erepublik",
	"Get Extra Storage" : "Платные услуги",
	"Party Member" : "Член партии",
	"No activity" : "Нет активности",
	"Total damage:" : "Сумма урона:",
	"Hard Worker" : "Трудоголик",
	"Work for 30 days in a row" : "Работа в течение 30 дней подряд",
	"Congress Member" : "Члены думы",
	"Country President" : "Президент",
	"Win the Presidential elections" : "За победу в президентских выборах",
	"Media Mogul" : "Медиа-Могол",
	"Reach 1000 subscribers to your newspaper" : "За привлечение 1000 подписчиков на вашу газету",
	"Battle Hero" : "Герой битвы",
	"Reach the highest total damage in one battle" : "За достижение высокого ущерба в одной битве",
	"Resistance Hero" : "Герой революции",
	"Start a resistance war and liberate that region" : "Начать революции и освободить этот регион",
	"Super Soldier" : "Супер солдат",
	"Advance 5 strength levels" : "5 уровень прочности",
	"Society Builder" : "Организатор фирмы",
	"Invite 10 people to eRepublik and help them reach level 6" : "Приглашение 10 человек на eRepublik и помочь им достичь уровня 6",
	"Check your unlocked features" : "Разблокировать особенности",
	"Achievements" : "Достижения",
	"Edit profile" : "Изменить профиль",
	"Edit Profile" : "Изменить профиль",
	"Change residence" : "Прменять место жительства",
	"Donations list" : "Список пожертвований",
	
	"Your email here" : "Ваш email",
	"Your birthday" : "День рождения",
	"Citizen Avatar" : "Аватар",
	"Change password" : "Пароль",


	"Worked 30 days in a row" : "Работал 30 дней подряд",
	"Win the Congress elections": "Победа на выборах в думу",
// fight
	"Back to battlefield" : "Вернуться на поле боя",
	"Fight Again" : "Снова сражаться",
	"Fight bonus" : "Бонус сражения",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Для того, чтобы войти в качестве организации, вам придется выйти как гражданину и снова войдите в систему с логином и паролем организации.",
	"My Organizations" : "Мой фирма",
	"Logout" : "Выход",
	"Organizations created by you:" : "Фирмы, созданные вами:",
// career-path
	"General manager" : "Главный менеджер",
	"Hard worker" : "Трудоголик",
// ranking
	"No." : "Нет.",
	"Hard worker" : "Трудоголик",
// messages
        "Inbox" : "Входящие",
	"Sent" : "Отправленные",
	"Alerts" : "Предупреждения",
	"Subscriptions" : "Подписка",
	"new article" : "новая статья",
	"Read Message" : "Читать сообщение",
	"Reply" : "Ответ",
	"From" : "От",
// flash menu
	"My places > Army" : "Армия",
	"My places > Newspaper" : "Газета",
	"My places > Organizations" : "Организации",

// menu	
	"Find out more" : "Узнать больше",
	"logout" : "выход"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 союзники";
regexps["^Active wars in (.*)$"] = "Активных войн в $1-ban";
regexps["(\\s*)Expires in (\\d*) days"] = "Истекает в $2";
regexps["^(\\d*) comments$"] = "$1 комментариев";
regexps["^(\\d*) hours ago$"] = "$1 часов назад";
regexps["^(\\d*) minutes ago$"] = "$1 минут назад";
regexps["^(\\d*) months ago$"] = "$1 месяцев назад";
regexps["^(\\d*) days ago$"] = "$1 дней назад";
regexps["^Regions \\((\\d*)\\)"] = "Регионы ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Друзья ($1)";
regexps["^(\\d*) months"] = "$1 месяцов";
regexps["^Comments(.*)"] = "Комментарии$1";


matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);