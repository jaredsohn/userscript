// ==UserScript==
// @name           еРепублик на Македонски јазик
// @description    Превод на еРепублик, базиран на српскиот превод од
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Почетна",
	"Donate" : "Донација",
	"May" : "Мај",
	"June" : "Јун",
	"July" : "Јул",
	"Day" : "Ден",
	"of the New World" : " од новиот свет",
	"Rank"   : "Ранг",
	"Company" : "Фирма", 
	"Profile":"Профил", 
	"Party" : "Партија", 
	"Newspaper" :"Весник",
	"Army" : "Војска",
	"Country administration" : "Државна Администрација",
        "Organizations" : "Организации",
	"Market" : "Пазар",
	"Monetary market" : "Монетарен пазар",
	"Job market" : "Понуда за работа",
        "Companies for sale" : "Фирми на продажба",
        "Get gold &amp; extras" : "Купи злато и останато",
	"Rankings" : "Рангирања",
	"Social stats" : "Социјални статистики",
	"Economic stats" : "Економски статистки",
	"Political stats" : "Политички статистики",
	"Military stats" : "Воени статистики",
	"Tools" : "Алатки",
	"Forum" : "Форум",
	"News" : "Вести",
	"Invite friends" : "Покани пријатели",
	"eRepublik Shop" : "eRepublik Shop",
	"Career path" : "Кариера",
	"Ok, thanks, next tip" : "Во ред, фала, следен совет ",
	"I have nothing more to say at the moment" : "Моментално, немам ништо да кажам",
	"Select" : "Одбери",
        "Latest events" : "Последни случувања",
		"News" : "Вести",
        "More events" : "Повеќе случувања",
        "More news" : "Повеќе вести",
		"more news" : "повеќе вести",
	"Marketplace" : "Пазар",
	"Wars" : "Војни",
        "My Places" : "Мој профил",
        "Info" : "Инфо",
        "Community" : "Заедница",
        "Day of the new world" : "Ден од новиот свет",
        "National" : "Национални",
        "International" : "Меѓународни",
		"Latest Events" : "Последни случувања",
        "Shouts" : "Изјави",
        "Shout something" : "Изјави нешто",
        "Shout" : "Изјави",
        "Official" : "Службени",
        "Everyone" : "Сите",
        "Latest" : "Последни",
        "Search citizen" : "Барај жител",
	"Shout" : "Изјава",
	"Latest" : "Последни",
	"one minute ago" : "Пред една минута",
	"for 10 shouts/day and more" : "10 изјави на ден и повеќе",
	"No more shouts for today" : "Нема повеќе изјави за денес ",
	"Top Rated" : "Најдобри",

// country page
	"On the Map" : "На мапа",
	"Total citizens" : "Број на жители",
	"New citizens today" : "Нови жители денес",
	"Average citizen level" : "Просечно ниво на жители",
	"Online now": "Моментално вклучени",
	"Citizens" : "Жители",
	"Who" : "Кои",
	"details" : "Детали",
	"Society" : "Општество",
	"Economy" : "Економија",
	"Politics" : "Политика",
	"Military" : "Војска",
	"Administration" : "Администрација",
	
// countries
	"Argentina" : "Аргентина",
	"Australia" : "Австралија",
	"Austria" : "Австрија",
	"Bosnia and Herzegovina" : "Босна и Херцеговина",
	"Brazil" : "Бразил",
	"Bulgaria" : "Бугарија",
	"China" : "Кина",
	"Croatia" : "Хрватска",
	"Canada" : "Канада",
	"Czech Republic" : "Република Чешка",
	"Denmark" : "Данска",
	"Estonia" : "Естонија",
	"Finland" : "Финска",
	"France" : "Франција",
	"Germany" : "Германија",
	"Greece" : "грција",
	"Hungary" : "Унгарија",
	"Indonesia" : "Индонезија",
	"Ireland" : "Ирска",
	"Israel" : "Израел",
	"Italy" : "Италија",
	"Iran" : "Иран",
	"Japan" : "Јапонија",
	"Latvia" : "Летонија",
	"Lithuania" : "Литванија",
	"Malaysia" : "Малезија",
	"Mexico" : "Мексико",
	"Moldavia" : "Молдавија",
	"Netherlands" : "Холандија",
	"Norway" : "Норвешка",
	"Pakistan" : "Пакистан",
	"Philippines" : "Филипини",
	"Poland" : "Полска",
	"Portugal" : "Португалија",
	"Romania" : "Романија",
	"Serbia" : "Србија",
	"Singapore" : "Сингапур",
	"South Africa" : "Јужноафриканска Република",
	"South Korea" : "Јужна Кореа",
	"Slovakia" : "Словачка",
	"Slovenia" : "Словенија",
	"Switzerland" : "Швајцарија",
	"Spain" : "Шпанија",
	"Sweden" : "Шведска",
	"Russia" : "Русија",
	"Thailand" : "Тајланд",
	"United Kingdom" : "Велика Британија",
	"Ukraine" : "Украина",
	"USA" : "САД",
	"Turkey" : "Турција",
	"World" : "Свет",
// economy
	"GOLD" : "ЗЛАТО",
	"Gold" : "Злато",
	"Treasury" : "Државна благајна",
	"All accounts" : "Сите сметки",
	"Country trading embargoes" : "Трговски ембаргоа",
	"Taxes" : "Даноци",
	"food" : "храна",
	"gift" : "подарок",
	"weapon" : "оружје",
	"moving tickets" : "авионски карти",
	"grain" : "жито",
	"diamonds" : "дијаманти",
	"iron" : "железо",
	"oil"  : "nafta",
	"wood" : "дрво",
	"house" : "куќа",
	"hospital" : "болница",
	"defense system" : "одбранбен систем",
	"Defense system" : "Одбранбен систем",


	"Salary" : "Плата",
	"Minimum" : "Минимум",
	"Average" : "Просек",

	"Gross domestic product (GDP)" : "Бруто домашен производ (БДП)",
	"Monthly exports" : "Месечен извоз",
	"Monthly imports" : "Месечен увоз",
	"Inflation" : "Инфлација",
// company
	"Office" : "Канцеларија",
	"You have already worked today." : "Имаш работено денес.",
	"Come back tomorrow." : "Врати се утре.",
	"Resign" : "Дај отказ",
	"Employees" : "Вработени",
	"Raw materials" : "Суровини",
	"Show all employees" : "Прикажи ги вработените",
	"Show all donations" : "Прикажи ги сите донации",
	"Go to marketplace" : "Посети пазар",
	"Products" : "Производи",
	"Jobs available in this company" : "Слободни работни места во оваа фирма",
	"You do not have any active job offers" : "Немате ни една работна понуда",
	"The company offers no products in this market" : "нема понуди",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Price with taxes" : "Цена со данок",
	"Company Page" : "Страница на фирмата",
	"Today" : "Денес",
	"Yesterday" : "Вчера",
	"All employees" : "Сите вработени",
	"Skill" : "Умешност",
	"Daily salary" : "Плата",
	"Last presence" : "Последна присутност",
	"Minimum country wage" : "Минималец",

	"Grain" : "Жито",
	"Food" : "Храна",
	"Gift" : "Подароци",
	"Weapon" : "Оружје",
	"Moving Tickets" : "Авионски Карти",
	"Diamonds" : "Дијаманти",
	"Iron" : "Железо",
	"Oil"  : "Нафта",
	"Wood" : "Дрво",
	"House" : "Куќа",
	"Hospital" : "Болница",
	"Defense System" : "Одбанбен систем",
// market
	"Quality Level" : "Ниво на квалитет",
	"All levels" : "Сите нивоа",
	"Level 1" : "Ниво 1",
	"Level 2" : "Ниво 2",
	"Level 3" : "Ниво 3",
	"Level 4" : "Ниво 4",
	"Level 5" : "Ниво 5",

	"Provider" : "Набљудувач",
	"Quality" : "Квалитет",
	"Stock" : "Залиха",
	"Buy" : "Купи",
	"Market" : "Пазар",

	"Market offers" : "Понуди",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Next" : "Следна",
	"Prev" : "Предходна",
	"No products in this market" : "Нема понуди",
	"Go to marketplace" : "Посети пазар",
	"Jobs available in this company" : "Слободни работни места",
	"You don't have any active job offers" : "Нема слободни места",
	"You didn't specify the amount of products you wish to buy" : 
		"Не наведовте количина на производите кои сакате да ги купите",
	"You cannot trade with this country as you are at war with it" :
		"Не можете да тргувате со земјата со која војувате",

// region
	"Citizens" : "Жители",
	"Country - Society" : "Држава - Општество",
        "Heal" : "Излечи",
	"Constructions": "Градежништво",
	"Population": "Популација",
	"Productivity" : "Продуктивност",
	"Resistance War" : "Револуција",
	"Resistance War Active" : "Активна револуција",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Не можеш да започнеш револуција затоа што регионот припаѓа на матичната држава",
	"Medium" : "Средно",
	"High": "Високо",
	"Neighbors" : "Соседи",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Избери тип на индустрија за да ги видиш понудите",
	"Skill Level" : "Ниво на умешност",
	"All skills" : "Сите умешности",
	"All" : "Сите",
// politics
	"Country Administration" : "Државна администрација",
	"Accepted" : "Прифатено",
	"Rejected" : "Одбиено",
  "Pending" : "Гласањето е во тек",
	"Congress" : "Собрание",
	"Issue Money" : "Печати пари",
	"Law proposals" : "Предложи закон",
	"Minimum Wage" : "Минималец",
	"Mutual Protection Pact" : "Пакт за меѓусебна заштита",
	"Peace Proposal" : "Предлог за мировен договор",
	"President" : "Председател",
	"Yes" : "Да",
	"No" : "Не",
	"Show all law proposals" : "Прикажи ги сите предлози на закони",
	"The law voting process takes 24 hours." : "Гласањето трае 24 часа.",
	"Only congress members and country presidents have the right to vote." : "Само претседатели и пратеници можат да гласаат.",
	"You are not a president or a congress member in this country." : "Не си претседател ниту пратеник во оваа држава.",
// wars
	"no allies" : "Без сојузницу",
	"All wars" : "Сите војни",
	"All resistance wars" : "Сите револуции",
	"All Alliances" : "Сите сојузници",
	"Alliances" : "Сојузници",
	"Military force" : "Воена сила",
	"Average strength" : "Просечна сила",
	"War > Battlefield" : "Војна > Битка",
	"Basic damage" : "Основна штета",
	"Weapon quality" : "Квалитет на оружјето",
	"Wellness" : "Здравје",
	"Rank" : "Чин",
	"Total damage" : "Вкупна штета",
	
// army
	"You have trained today. You can train again tomorrow." : "Имаш тренирано денеска, врати се утре.",
	"Force" : "Сила",
	"Military rank" : "Чин",
	"Military achievements" : "Воени успеси",
	"Active wars list" : "Листа на активни војни",
	"Sergeant" : "Водник",
	"Corporal" : "Десетар",
	"Private" : "Доброволец",
	"Show active wars" : "Прикажи ги активните војни",
	"Start a Resistance War" : "Започни револуција",
	"You do not have the necessary amount of Gold to start a resistance war." : "Немаш доволно злато за да започнеш револуција.",
	"You cannot join this fight because your country is not involved in the war" : "Не можеш да се бориш затоа што твојата Држава не е вмешана.",
	"There are no resistance wars in this country." : "Нема револуции во оваа држава.",
	"until the region can be occupied or secured" : "Додека регионот не биде окупиран или зачуван",
	"Attackable on President's decision" : "Нападливо на претседателска одлука",
	"Defense Points" : "Одбранбени поени",
	"Go to Battlefield" : "Посети ја битката",
	"see finished battles" : "Прегледај ги завршените битки",
	"Wars list" : "Листа на војни",
	"War" : "Војна",
	"Battle history" : "Историја на битката",
	"Fight" : "Бори се",
	"Hero" : "Херој",
	"Started by" : "Започнато од ",
	"started by" : "ZЗапочнато од",
	"Fight for resistance" : "Бори се за отпорот",
	"Fight for defenders" : "Бори се за бранителите",
// party
	"Get more" : "Останато",
	"Country presidency" : "Претседател",
	"Winner" : "Победник",
	"Next election in" : "Следни избори ",
	"Next elections in" : "Следни избори ",
	"No candidate proposed" : "Нема предложени кандидати",
	"candidates" : "Кандидати",
	"Candidate" : "Кандидати",
	"days" : "Денови",
	"GOLD" : "Злато",
	"Show results" : "Прикажи резултати",
	"Show candidate list" : "Прикажи ја листата на кандидати",
	"Show candidates list" : "Прикажи ја листата на кадидати",
	"You are not a member of a party" : "Не си член на партија",
	"Join a party" : "Зачлени се во партијата",
	"Create new" : "Основај нова",
	"congress members" : "Пратеници",
	"of Congress" : "Парламент",
	"Show proposed members of congress" : "Прикажи ги предложените кандидати за пратеници",
	"Run for congress" : "Кандидирај се за пратеник",
	"Join" : "Зачлени се",
	"See all members" : "Прикажи ги сите членови",
	"Donate Gold" : "Донирај злато",
	"Members"  : "Членови",
	"Orientation" : "Ориентација",
	"Show all members" : "Прикажи ги сите членови",

	"Center" : "Цетралисти",
	"Anarchist" : "Анархисти",
	"Accounts" : "Сметки",
	"Elections" : "Избори",
	"Election results" : "Резултати од изборите",
	"Next elections" : "Следни избори",

	"Country Presidency" : "Претседател",
	"Party presidency" : "Претседателство на партија",
	"Party President" : "Претседател на партија",
	"See results" : "Види ги резултатите",
	"Expires tomorrow" : "Истекува утре",

// articles
	"Report abuse" : "Пријави злоупотреба",
	"today" : "денес",
	"yesterday" : "вчера",
	"one hour ago" : "Пред еден час",
	"Unsubscribe" : "Поништи ја претплатата",
	"Subscribe" : "Претплати се",
	"Article RSS" : "RSS статија",
	"Your comment" : "Твој коментар",
	"View all comments" : "Прикажи ги сите коментари",
	"Subscribe to comments" : "Претплати се за коментари",
	"Unsubscribe to comments" : "Поништи претплата за коментари",
	"Post a comment" : "Остави коментар",
// news
	"You do not have a newspaper" : "Не поседуваш весник",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Весниците се ефикасен начин за конмуницирање во еРепублик. Прочитај побеќе на еРепублик Вики. Издади свој весник.",
// profiles
	"Friends" : "Пријатели",
	"Fights" : "Борби",
	"National Rank" : "Национален ранг",
	"Forfeit Points" : "Казнени поени",
	"ShareThis" : "Сподели",
	"Shout something:" : "Изјави нешто:",
	"Assets" : "Имовина",
	"Press director" : "Главен уредник",
	"Inventory" : "Залихи",
	"Get Gold" : "Купи злато",
	"Career" : "Кариера",
	"Bio" : "Био",
	"Employee" : "Вработен",
	"No political activity" : "Без политички активности",
	"Wellness" : "Здравје",
	"Level" : "Ниво",
	"Strength" : "Сила",
	"Experience" : "Искусво",
	"Skills:" : "Умешност",
	"Land" : "Земја",
	"Manufacturing" : "Мануфактура",
	"Erepublik Age" : "Роденден",
	"Get Extra Storage" : "Купи додатни места за залихи",
	"Party Member" : "Член на партија",
	"No activity" : "Без активности",
	"Total damage:" : "Вкупна штета:",
	"Hard Worker" : "Вреден работник",
	"Work for 30 days in a row" : "Работи 30 дена по ред",
	"Congress Member" : "Пратеник",
	"Country President" : "Претседател",
	"Win the Presidential elections" : "Победил на претседателски избори",
	"Media Mogul" : "Медиумско влијание",
	"Reach 1000 subscribers to your newspaper" : "Достигни 1000 претплатника",
	"Battle Hero" : "Херој",
	"Reach the highest total damage in one battle" : "Нанеси најголема штета во битката",
	"Resistance Hero" : "Херој на отпорот",
	"Start a resistance war and liberate that region" : "Започни револуција и ослободи го регионот",
	"Super Soldier" : "Супер војник",
	"Advanced 5 strength levels" : "Напреднал 5 нивоа на сила",
	"Society Builder" : "Градител на општество",
	"Invite 10 people to eRepublik and help them reach level 6" : "Покани 10 пријатели и помогни им да достигнат 6-то ниво",
	"Check your unlocked features" : "Провери ги отклучените можности",
	"Achievements" : "Успеси",
	"Edit profile" : "Уреди профил",
	"Edit Profile" : "Уреди профил",
	"Change residence" : "Пресели се",
	"Donations list" : "Листа на донации",
	
	"Your email here" : "Твој e-mail",
	"Your birthday" : "Роденден",
	"Citizen Avatar" : "Аватар",
	"Change password" : "Промени лозинка",


	"Worked 30 days in a row" : "30 дена работа по ред",
	"Win the Congress elections": "Победи на изборите за пратеник",
// fight
	"Back to battlefield" : "Врати се во битката",
	"Fight Again" : "Бори се повторно",
	"Fight bonus" : "Бонус",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "За да се најавиш како организација, прво мораш да се одјавиш и да се најавиш со името и лозинката на организацијата.",
	"My Organizations" : "Мои организации",
	"Logout" : "Одјави се",
	"Organizations created by you:" : "Твои организации:",
	"You have not created any organization yet." : "Сеуште немаш организација.",
// career-path
	"General manager" : "Менаџер",
	"Hard worker" : "Вреден работник",
// ranking
	"No." : "Број",
	"Hard worker" : "Вреден работник",
// messages
        "Inbox" : "Примени",
	"Sent" : "Пратени",
	"Alerts" : "Известувања",
	"Subscriptions" : "Претплати",
	"new article" : "Нова статија",
	"Write article" : "Напиши статија",
	"Edit newspaper details" : "Уреди дедали на весникот",
	"Edit" : "Уреди",
	"Delete" : "Избриши",
	"Read Message" : "Прочитај",
	"Reply" : "Одговори",
	"From" : "Од",
	"Back" : "Врати се",
	"Picture" : "Слика",
	"only JPG files allowed" : "Само .jpg тип е дозволен",
	"Publish" : "Објави",
// flash menu
	"My places > Army" : "Војска",
	"My places > Newspaper" : "Весник",
	"My places > Organizations" : "Организации",

// menu	
	"Find out more" : "Информирај се",
	"logout" : "Одјави се"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 сојузници\\i";
regexps["^Active wars in (.*)$"] = "Активни војни $1";
regexps["(\\s*)Expires in (\\d*) days"] = "истекува за $2 денови";
regexps["^(\\d*) comments$"] = "$1 коментари";
regexps["^(\\d*) hours ago$"] = "$1 часови предходно";
regexps["^(\\d*) minutes ago$"] = "$1 минути предходно";
regexps["^(\\d*) days ago$"] = "$1 денови предходно";
regexps["^Regions \\((\\d*)\\)"] = "Региони ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Пријатели ($1)";
regexps["^(\\d*) months"] = "$1 Месеци";
regexps["^Comments(.*)"] = "Коментари $1";


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
