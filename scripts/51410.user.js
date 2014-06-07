// ==UserScript==
// @name           eRepublik_UA
// @description    eRepublik Ukrainian translation
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Головна",
	"Donate" : "Передати",
	"May" : "Травень",
	"June" : "Червень",
	"July" : "Липень",
	"Day" : "Серпень",
	"of the New World" : " Нового світу ",
	"Rank"   : "Ранг",
	"Company" : "Компанія", 
	"Profile":"Профіль", 
	"Party" : "Партія", 
	"Newspaper" :"Газета",
	"Army" : "Армія",
	"Country administration" : "Адміністрація країни",
        "Organizations" : "Організації",
	"Market" : "Ринок",
	"Monetary market" : "Грошовий ринок",
	"Job market" : "Ринок робочої сили",
        "Companies for sale" : "Компанії на продаж",
        "Get gold &amp; extras" : "Придбати золото та інше",
	"Rankings" : "Рейтинги",
	"Social stats" : "Соціальна статистика",
	"Economic stats" : "Економічна статистика",
	"Political stats" : "Політична статистика",
	"Military stats" : "Військова статистика",
	"Tools" : "Інструменти",
	"Forum" : "Форум",
	"News" : "Новини",
	"Invite friends" : "Запроси друзів",
	"eRepublik Shop" : "Магазин еРеспубліки",
	"Career path" : "Кар'єрне зростання",
	"Ok, thanks, next tip" : "Дякую, наступна порада",
	"I have nothing more to say at the moment" : "Зараз мені більше нема чого сказати",
	"Select" : "Обрати",
        "Latest events" : "Останні події",
		"News" : "Новини",
        "More events" : "Більше подій",
        "More news" : "Більше новин",
		"more news" : "більше новин",
	"Marketplace" : "Ринок",
	"Wars" : "Війни",
        "My Places" : "До себе",
        "Info" : "Інформація",
        "Community" : "Суспільство",
        "Day of the new world" : "День Нового Світу",
        "National" : "Національний",
        "International" : "Міжнародний",
		"Latest Events" : "Останні події",
        "Shouts" : "Вигуки",
        "Shout something" : "Вигукни",
        "Shout" : "Вигук",
        "Official" : "Офіційно",
        "Everyone" : "Всім",
        "Lates" : "Останні",
        "Search citizen" : "Пошук громадянина",
	"Shout" : "Вигук",
	"Latest" : "Останні",
	"one minute ago" : "одну хвилину тому",
	"for 10 shouts/day and more" : "за 10 вигуків на день і більше",
	"No more shouts for today" : "На сьогодні досить вигуків",
	"Top Rated" : "Топові",

// country page
	"On the Map" : "На мапі",
	"Total citizens" : "Всього громадян",
	"New citizens today" : "Нових громадян сьогодні",
	"Average citizen level" : "Середній рівень громадян",
	"Online now": "Онлайн зараз",
	"Citizens" : "Громадян",
	"Who" : "Хто",
	"details" : "Деталі",
	"Society" : "Суспільство",
	"Economy" : "Економіка",
	"Politics" : "Політика",
	"Military" : "Військовий стан",
	"Administration" : "Адміністрація",
	
// countries
	"Argentina" : "Аргентина",
	"Australia" : "Австралія",
	"Austria" : "Австрія",
	"Bosnia and Herzegovina" : "Боснія-Герцеговина",
	"Brazil" : "Бразилія",
	"Bulgaria" : "Болгарія",
	"China" : "Китай",
	"Croatia" : "Хорватія",
	"Canada" : "Канада",
	"Czech Republic" : "Чехія",
	"Denmark" : "Данія",
	"Estonia" : "Естонія",
	"Finland" : "Фінляндія",
	"France" : "Франція",
	"Germany" : "Німеччина",
	"Greece" : "Греція",
	"Hungary" : "Угорщина",
	"Indonesia" : "Індонезія",
	"Ireland" : "Ірландія",
	"Israel" : "Ізраїль",
	"Italy" : "Італія",
	"Iran" : "Іран",
	"Japan" : "Японія",
	"Latvia" : "Латвія",
	"Lithuania" : "Литва",
	"Malaysia" : "Малайзія",
	"Mexico" : "Мексика",
	"Moldavia" : "Молдавія",
	"Netherlands" : "Голландія",
	"Norway" : "Норвегія",
	"Pakistan" : "Пакистан",
	"Philippines" : "Філіппіни",
	"Poland" : "Польща",
	"Portugal" : "Португалія",
	"Romania" : "Румунія",
	"Serbia" : "Сербія",
	"Singapore" : "Сінгапур",
	"South Africa" : "Південна Африка",
	"South Korea" : "Південна Корея",
	"Slovakia" : "Словаччина",
	"Slovenia" : "Словенія",
	"Switzerland" : "Швейцарія",
	"Spain" : "Іспанія",
	"Sweden" : "Швеція",
	"Russia" : "Росія",
	"Thailand" : "Таїланд",
	"United Kingdom" : "С.К. Великобританії та Пн. Ірландії",
	"Ukraine" : "Україна",
	"USA" : "Сполучені Штати Америки",
	"Turkey" : "Туреччина",
	"World" : "Світ",
// economy
	"GOLD" : "ЗОЛОТО",
	"Gold" : "Золото",
	"Treasury" : "Скарбниця",
	"All accounts" : "Усі рахунки",
	"Country trading embargoes" : "Країни, щодо яких введене ембарго",
	"Taxes" : "Податки",
	"food" : "їжа",
	"gift" : "подарунок",
	"weapon" : "зброя",
	"moving tickets" : "квитки",
	"grain" : "зерно",
	"diamonds" : "алмази",
	"iron" : "залізо",
	"oil"  : "нафта",
	"wood" : "деревина",
	"house" : "будинок",
	"hospital" : "лікарня",
	"defense system" : "оборонна система",
	"Defense system" : "Оборонна система",


	"Salary" : "Зарплата",
	"Minimum" : "Мінімальна",
	"Average" : "Середня",

	"Gross domestic product (GDP)" : "Валовий національний продукт (ВНП)",
	"Monthly exports" : "Місячний обсяг експорту",
	"Monthly imports" : "Місячний обсяг Імпрорту",
	"Inflation" : "Інфляція",
// company
	"Office" : "Офіс",
	"You have already worked today." : "Ви вже працювали сьогодні.",
	"Come back tomorrow." : "Поверніться завтра.",
	"Resign" : "Звільнитись",
	"Employees" : "Працівники",
	"Raw materials" : "Сировина",
	"Show all employees" : "Показати усіх працівників",
	"Show all donations" : "Показати усі переводи",
	"Go to marketplace" : "Перейти на ринок",
	"Products" : "Продукти",
	"Jobs available in this company" : "Вакансії компанії",
	"You do not have any active job offers" : "Для вам немає жодних вакансій",
	"The company offers no products in this market" : "Компанія не виробляє для ринку жодних товарів",
	"Amount" : "Сума",
	"Price" : "Ціна",
	"Price with taxes" : "Оподаткована ціна",
	"Company Page" : "Сторінка компанії",
	"Today" : "Сьогодні",
	"Yesterday" : "Учора",
	"All employees" : "Усі працівники",
	"Skill" : "Навички",
	"Daily salary" : "Зарплата на день",
	"Last presence" : "Остання присутність",
	"Minimum country wage" : "Мінімальна зарплата в країні",

	"Grain" : "Зерно",
	"Food" : "Їжа",
	"Gift" : "Подарунок",
	"Weapon" : "Зброя",
	"Moving Tickets" : "Квитки",
	"Diamonds" : "Алмази",
	"Iron" : "Залізо",
	"Oil"  : "Нафта",
	"Wood" : "Деревина",
	"House" : "Будинок",
	"Hospital" : "Лікарня",
	"Defense System" : "Оборонна система",
// market
	"Quality Level" : "Рівень якості",
	"All levels" : "Всі рівні",
	"Level 1" : "Рівень 1",
	"Level 2" : "Рівень 2",
	"Level 3" : "Рівень 3",
	"Level 4" : "Рівень 4",
	"Level 5" : "Рівень 5",

	"Provider" : "Виробник",
	"Quality" : "Якість",
	"Stock" : "Кількість",
	"Buy" : "Придбати",
	"Market" : "Ринок",
	"Market offers" : "Пропозиції на ринку",
	"Amount" : "Сума",
	"Price" : "Ціна",
	"Next" : "Далі",
	"Prev" : "Назад",
	"No products in this market" : "Немає продукції на ринку",
	"Go to marketplace" : "Перейти на ринок",
	"Jobs available in this company" : "Вакансії компанії",
	"You don't have any active job offers" : "Для вас немає вакансій",
	"You didn't specify the amount of products you wish to buy" : 
		"Ви не вказали кількість продукції, яку ви хочете придбати",
	"You cannot trade with this country as you are at war with it" :
		"Ви не можете торгувати з країною, яка перебуває в стані війни з вашою країною",

// region
	"Citizens" : "Громадяни",
	"Country - Society" : "Країна - суспільство",
        "Heal" : "Лікуватись",
	"Constructions": "Будівлі",
	"Population": "Населення",
	"Productivity" : "Продуктивність",
	"Resistance War" : "Визвольна війна",
	"Resistance War Active" : "Активна визвольна війна",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Ви не можете розпочати визвольну війту, тому що регіон під суверенітетом власної країни",
	"Medium" : "Середній",
	"High": "Високий",
	"Neighbors" : "Сусіди",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Оберіть галузь для перегляду пропозиції на ринку",
	"Skill Level" : "Рівень навичок",
	"All skills" : "Усі рівні",
	"All" : "Усі",
// politics
	"Country Administration" : "Адміністрація країни",
	"Accepted" : "Прийнято",
	"Rejected" : "Відхилено",
  "Pending" : "В процесі",
	"Congress" : "Парламент",
	"Issue Money" : "Надати кошти",
	"Law proposals" : "Законодавчі ініціативи",
	"Minimum Wage" : "Мінімальна зарплата",
	"Mutual Protection Pact" : "Пакт взаємодопомоги",
	"Peace Proposal" : "Пропозиція укладення миру",
	"President" : "Президент",
	"Yes" : "За",
	"No" : "Проти",
	"Show all law proposals" : "Показати усі ініціативи",
	"The law voting process takes 24 hours." : "Процес голосування триває 24 години.",
	"Only congress members and country presidents have the right to vote." : "Лише члени Парламенту можуть голосувати.",
	"You are not a president or a congress member in this country." : "Ви не є президентом чи членом Парламенту країни.",
// wars
	"no allies" : "нема союзників",
	"All wars" : "Усі війни",
	"All resistance wars" : "Усі визвольні війни",
	"All Alliances" : "Усі союзи",
	"Alliances" : "Союзи",
	"Military force" : "Військові сили",
	"Average strength" : "Середній рівень сили",
	"War > Battlefield" : "Війна > Поле бою",
	"Basic damage" : "Базова шкода",
	"Weapon quality" : "Рівень зброї",
	"Wellness" : "Здоров'я",
	"Rank" : "Ранг",
	"Total damage" : "Загальна шкода",
	
// army
	"You have trained today. You can train again tomorrow." : "Ви сьогодні тренувались. Завтра можете повернутись та тренуватись знову.",
	"Force" : "Сила",
	"Military rank" : "Військовий ранг",
	"Military achievements" : "Військові досягнення",
	"Active wars list" : "Список діючих воєн",
	"Sergeant" : "Сержант",
	"Corporal" : "Капрал",
	"Private" : "Рядовий",
	"Show active wars" : "Показати діючі війни",
	"Start a Resistance War" : "Розпочати визвольну війну",
	"You do not have the necessary amount of Gold to start a resistance war." : "Вам не вистачає Золота для того щоб розпочати Визвольну війну",
	"You cannot join this fight because your country is not involved in the war" : "Ви не можете брати участь в цій битві оскільки ваша країна не бере участі у війні",
	"There are no resistance wars in this country." : "Немає Визвольних війн.",
	"until the region can be occupied or secured" : "доки регіон буде завойований чи зачищений",
	"Attackable on President's decision" : "Може бути атакований за рішенням Президента",
	"Defense Points" : "Очки захисту",
	"Go to Battlefield" : "Перейти на поле бою",
	"see finished battles" : "Переглянути закінчені битви",
	"Wars list" : "Список війн",
	"War" : "Війна",
	"Battle history" : "Історія битви",
	"Fight" : "Битва",
	"Hero" : "Герой",
	"Started by" : "Почав ",
	"started by" : "почав ",
	"Fight for resistance" : "Битись за визволителів",
	"Fight for defenders" : "Битись за оборонців",
// party
	"Get more" : "Більше",
	"Country presidency" : "Президентство",
	"Winner" : "Переможець",
	"Next election in" : "Наступні вибочи через ",
	"Next elections in" : "Наступні вибочи через ",
	"No candidate proposed" : "Немає висунутих кандидатів",
	"candidates" : "кандидати",
	"Candidate" : "Кандидат",
	"days" : "днів",
	"GOLD" : "ЗОЛОТО",
	"Show results" : "Показати результати",
	"Show candidate list" : "Показати список кандидатів",
	"Show candidates list" : "Показати список кандидатів",
	"You are not a member of a party" : "Ви не є членом партії",
	"Join a party" : "Вступити до партії",
	"Create new" : "Створити нову",
	"congress members" : "члени Парламенту",
	"of Congress" : " Парламенту",
	"Show proposed members of congress" : "Показати висунуті кандидатури до Парламенту",
	"Run for congress" : "Висунутись до Парламенту",
	"Join" : "Приєднатись",
	"See all members" : "Показати усіх членів",
	"Donate Gold" : "Пожертвувати Золото",
	"Members"  : "Члени",
	"Orientation" : "Орієнтація",
	"Show all members" : "Показати усіх членів",

	"Center" : "Центристи",
	"Anarchist" : "Анархісти",
	"Accounts" : "Рахунки",
	"Elections" : "Вибори",
	"Election results" : "Результати виборів",
	"Next elections" : "Наступні вибори",

	"Country Presidency" : "Президент Країни",
	"Party presidency" : "Голова партії",
	"Party President" : "Голова партії",
	"See results" : "Подивитись результат",
	"Expires tomorrow" : "Закінчується завтра",

// articles
	"Report abuse" : "Доповісти про образу",
	"today" : "СЬогодні",
	"yesterday" : "Учора",
	"one hour ago" : "Одну годину тому",
	"Unsubscribe" : "Відмовитись від підписки",
	"Subscribe" : "Підписатись",
	"Article RSS" : "Стаття RSS",
	"Your comment" : "Ваш коментар",
	"View all comments" : "Подивитись усі коментарі",
	"Subscribe to comments" : "Підписатись на коментарі",
	"Unsubscribe to comments" : "Відмовитись від підписки на коментарі",
	"Post a comment" : "Додати коментар",
// news
	"You do not have a newspaper" : "У вас немає власної газети",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Газета є ефективним засобом комунікації та донесення новин у еРеспубліці. Читайте більше у Wiki. Створіть власну газету.",
// profiles
	"Friends" : "Друзі",
	"Fights" : "Битви",
	"National Rank" : "Національний рейтинг",
	"Forfeit Points" : "Штрафні очки",
	"ShareThis" : "Поділитись цим",
	"Shout something:" : "Вигукни щось:",
	"Assets" : "Активи",
	"Press director" : "Шеф-редактор",
	"Inventory" : "Інвентар",
	"Get Gold" : "Отримай Золото",
	"Career" : "Кар'єра",
	"Bio" : "Біографія",
	"Employee" : "Працівник",
	"No political activity" : "Неполітична активність",
	"Wellness" : "Здоров'я",
	"Level" : "Рівень",
	"Strength" : "Сила",
	"Experience" : "Досвід",
	"Skills:" : "Навички",
	"Land" : "Земля",
	"Manufacturing" : "Виробництво",
	"Erepublik Age" : "Вік у еРеспубліці",
	"Get Extra Storage" : "Отримай більше місця",
	"Party Member" : "Член партії",
	"No activity" : "Неактивний",
	"Total damage:" : "Загальна шкода:",
	"Hard Worker" : "Сумлінний працівник",
	"Work for 30 days in a row" : "Відпрацюй 30 днів підряд",
	"Congress Member" : "Член Парламенту",
	"Country President" : "Президент країни",
	"Win the Presidential elections" : "Виграй Президентські вибори",
	"Media Mogul" : "Медіа-магнат",
	"Reach 1000 subscribers to your newspaper" : "Досягни 1000 підписчиків твоєї газети",
	"Battle Hero" : "Військовий герой",
	"Reach the highest total damage in one battle" : "Завдай найбільшої загальної шкоди у битві",
	"Resistance Hero" : "Герой Визвольної війни",
	"Start a resistance war and liberate that region" : "Почни Визвольну війну та визволи регіон",
	"Super Soldier" : "Супер солдат",
	"Advanced 5 strength levels" : "Досягнув 5 рівнів сили",
	"Society Builder" : "Суспільний творець",
	"Invite 10 people to eRepublik and help them reach level 6" : "Запроси 10 осіб до еРеспубліки та допоможи їм досягнути 6 рівня.",
	"Check your unlocked features" : "Переглянути не/доступні опції",
	"Achievements" : "Досягнення",
	"Edit profile" : "Редагувати профіль",
	"Edit Profile" : "Редагувати профіль",
	"Change residence" : "Змінити місце проживання",
	"Donations list" : "Список переводів",
	
	"Your email here" : "Ваш e-mail",
	"Your birthday" : "Ваш день народження",
	"Citizen Avatar" : "Аватара громадянина",
	"Change password" : "Змінити пароль",


	"Worked 30 days in a row" : "Працював 30 днів підряд",
	"Win the Congress elections": "Виграв вибори до Парламенту",
// fight
	"Back to battlefield" : "Назад до поля бою",
	"Fight Again" : "Битись ще раз",
	"Fight bonus" : "Бонус за бій",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Щоб увійти в акаунт організації ви повинні вийти з аканту громадянина та увійти під іменем та паролем оргнізації.",
	"My Organizations" : "Моя органзація",
	"Logout" : "Вийти",
	"Organizations created by you:" : "Створені вами організації:",
	"You have not created any organization yet." : "Ви не створили жодної організації.",
// career-path
	"General manager" : "Генеральний директор",
	"Hard worker" : "Сумлінний працівник",
// ranking
	"No." : "Номер",
	"Hard worker" : "Сумлінний працівник",
// messages
        "Inbox" : "Вхідні",
	"Sent" : "Відправлені",
	"Alerts" : "Повідомлення",
	"Subscriptions" : "Підписки",
	"new article" : "Нова стаття",
	"Write article" : "Написати статтю",
	"Edit newspaper details" : "Змінити дані газети",
	"Edit" : "Редагувати",
	"Delete" : "Видалити",
	"Read Message" : "Читати повідомлення",
	"Reply" : "Відповісти",
	"From" : "Від",
	"Back" : "Назад",
	"Picture" : "Зображення",
	"only JPG files allowed" : "Лише файли JPG",
	"Publish" : "Опублікувати",
// flash menu
	"My places > Army" : "До Армії",
	"My places > Newspaper" : "Моя Газета",
	"My places > Organizations" : "Моя Організація",

// menu	
	"Find out more" : "Дізнатись більше",
	"logout" : "Вийти"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 союзники\\i";
regexps["^Active wars in (.*)$"] = "Діючі війни $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Закінчиться за $2 днів";
regexps["^(\\d*) comments$"] = "$1 коментарі";
regexps["^(\\d*) hours ago$"] = "$1 годин тому";
regexps["^(\\d*) minutes ago$"] = "$1 хвилин тому";
regexps["^(\\d*) days ago$"] = "$1 днів тому";
regexps["^Regions \\((\\d*)\\)"] = "Регіони ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Друзі ($1)";
regexps["^(\\d*) months"] = "$1 місяців";
regexps["^Comments(.*)"] = "Коментарі $1";


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