// ==UserScript==
// @author         Александарр & P.Overdrive
// @name           еРепублика на македонски јазик
// @description    Превод на еРепублика на македонски јазик (базиран на унгарската верзија)
// @include        http://www.erepublik.com/*
// @version        1.2b
// ==/UserScript==

var strings = {


// Мои работи
        

	"Location" : "Локација",
	"Citizenship" : "Држављанство",
	"National Rank" : "Национален ранг",
	"Forfeit points" : "Казнени поени",
	"monetary donations" : "Парични донации",
	"item donations" : "Донирани предмети",
	"edit profile" : "Измени профил",
	"show less" : "помалку",
	"Slajder" : "Слајдер",
	"online"  : " Вклучен/а",
	"Get Gold &amp; Extras" : "Купи злато",
	"food!" : "храна!",
	"Macedonia" : "Македонија",
	"Java" : "Јава",
	"" : "",
// menu
	"Home" : "Почетна",
	"Donate" : "Донација",
	"Day" : "Ден ",
	"Day " : "Ден ",
	"of the New World" : " од Новиот свет",
	"Rank"   : "Ранг",
	"Company" : "Фирма", 
	"Profile" : "Профил", 
	"Party" : "Партија", 
	"Newspaper" : "Весник",
	"Army" : "Војска",
	"Country administration" : "Држава",
    "Organizations" : "Организации",
    	"Advertising Department" : "Рекламирање",
	"Market" : "Пазар",
	"Monetary market" : "Монетарен пазар",
	"Job market" : "Пазар на трудот",
    "Companies for sale" : "Пазар на компании",
        "Get Gold &amp Extras" : "Купи злато и останато",
	"Rankings" : "Рангирања",
	"Social stats" : "Социјални статистики",
	"Economic stats" : "Економски статистики",
	"Political stats" : "Политички статистики",
	"Military stats" : "Воени статистики",
		"Tutorials" : "Лекции",
	"Tools" : "Алатки",
	"Forum" : "Форум",
	"Invite friends" : "Поканете пријател",
	"eRepublik Shop" : "eRepublik продавница",
	"Career path" : "Кариера",
	"Ok, thanks, next tip" : "Во ред, фала, следен совет",
	"I have nothing more to say at the moment" : "Немам друг совет во моментов.",
	"Select" : "Одбери",
	"Top rated news" : "Најдобри вести",
	"Latest news" : "Последни вести",
        "Latest events" : "Последни настани",
        "More events" : "Повеќе настани",
        "more events" : "повеќе настани",
        "More news" : "Повеќе вести",
		"more news" : "повеќе вести",
	"Marketplace" : "Пазар",
	"Wars" : "Војни",
        "My Places" : "Мои места",
        "Info" : "Инфо",
        "Community" : "Заедница",
        "Day of the new world" : "Ден од Новиот свет",
        "National" : "Национални",
        "International" : "Меѓународни",
		"Latest Events" : "Последни настани",
        "Shouts" : "Изјави",
        "Shout" : "Изјави",
        "Official" : "Службени",
        "Everyone" : "Сите",
        "Latest" : "Последни",
	"one minute ago" : "пред една минута",
	"No more shouts for today" : "Нема повеќе изјави за денес ",
	"Shout something:" : "Изјави нешто:",
	"Top rated" : "Најдобри",
	"Go to next page" : "Следна страница",
	"Experience points" : "XP",
	"Name" : "Име",
	"Companies" : "Компании",
	"Newspapers" : "Весници",
	"Countries" : "Држави",
	"Parties" : "Партии",


// country page
	"On the Map" : "На мапа",
	"Total citizens" : "Број на жители",
	"New citizens today" : "Нови жители денес",
	"Average citizen level" : "Просечно ниво на жители",
	"Online now": "Моментално вклучени",
	"Citizen fee" : "Пристапница за нови жители",
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
	"Belgium" : "Белгија",
	"Bolivia" : "Боливија",
	"Bosnia and Herzegovina" : "Босна и Херцеговина",
	"Brazil" : "Бразил",
	"Bulgaria" : "Бугарија",
	"Chile" : "Чиле",
	"China" : "Кина",
	"Colombia" : "Колумбија",
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
	"India" : "Индија",
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
	"North Korea" : "Северна Кореја",
	"Norway" : "Норвешка",
	"Pakistan" : "Пакистан",
	"Paraguay" : "Парагвај",
	"Peru" : "Перу",
	"Philippines" : "Филипини",
	"Poland" : "Полска",
	"Portugal" : "Португалија",
	"Romania" : "Романија",
	"Serbia" : "Србија",
	"Singapore" : "Сингапур",
	"South Africa" : "Јужноафричка Република",
	"South Korea" : "Јужна Кореја",
	"Slovakia" : "Словачка",
	"Slovenia" : "Словенија",
	"Switzerland" : "Швајцарија",
	"Spain" : "Шпанија",
	"Sweden" : "Шведска",
	"Russia" : "Русија",
	"Thailand" : "Тајланд",
	"United Kingdom" : "Велика Британија",
	"Ukraine" : "Украина",
	"Uruguay" : "Уругвај",
	"USA" : "САД",
	"Turkey" : "Турција",
	"Venezuela" : "Венецуела",
	"World" : "Свет",
	"All countries" : "Сите држави",


// economy
	"GOLD" : " Злато",
	"Gold" : " Злато",
	"Treasury" : "Државна благајна",
	"All accounts" : "Сите сметки",
	"Country trading embargoes" : "Трговски ембаргоа",
	"This country can trade with any other country in eRepublik." : "Оваа држава може да тргува со сите  останати држави во еРепублика.",
	"Income Tax" : "Данок на приход",
	"Import Tax" : "Данок на увоз",
	"VAT" : "ДДВ",
	
	"Taxes" : "Даноци",
	"food" : "храна",
	"gift" : "подароци",
	"weapon" : "оружје",
	"moving tickets" : "авионски карти",
	"grain" : "жито",
	"diamonds" : "дијаманти",
	"iron" : "железо",
	"oil"  : "нафта",
	"wood" : "дрва",
	"house" : "куќи",
	"hospital" : "болница",
	"defense system" : "одбранбен систем",
	"Defense system" : "Одбранбен систем",

	"Salary" : "Плата",
	"Minimum" : "Минимална",
	"Average" : "Просечна",

	"Gross domestic product (GDP)" : "Бруто домашен производ (БДП)",
	"Monthly exports" : "Месечен извоз",
	"Monthly imports" : "Месечен увоз",
	"Inflation" : "Инфлација",


// company
	"Office" : "Канцеларија",
	"You have already worked today." : "Имате работено денес.",
	"Come back tomorrow." : "Вратете се утре.",
	"Resign" : "Дај отказ",
	"Employees" : "Вработени",
	"Raw materials" : "Суровини",
	"Show all employees" : "Листа на вработени",
	"Show all donations" : "Листа на донации",
	"Go to marketplace" : "Посети пазар",
	"Products" : "Производи",
	"The company cannot trade with this country due to a trade embargo." : "Не може да се тргува со оваа  држава поради постоење на трговско ембарго.",
	"FreJobs available in this company" : "Слободни работни места во оваа фирма",
	"Minimum Skill" : "Минимално ниво",
	"You do not have any active job offers" : "Нема слободни работни места",
	"Apply" : "Пријави се",
	"The company offers no products in this market" : "Фирмата не нуди ништо на овој пазар",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Price with taxes" : "Цена со данок",
	"Company page" : "Страна на фирмата",
	"Today" : "Денес",
	"Yesterday" : "Вчера",
	"Skill" : "Вештина",
	"Daily salary" : "Плата",
	"Last presence" : "Последно присуство",
	"Minimum country wage :" : "Минималец : ",

	"Grain" : "Жито",
	"Food" : "Храна",
	"Gift" : "Подароци",
	"Weapon" : "Оружје",
	"Moving Tickets" : "Авионски карти",
	"Diamonds" : "Дијаманти",
	"Iron" : "Железо",
	"Oil"  : "Нафта",
	"Wood" : "Дрва",
	"House" : "Куќи",
	"Hospital" : "Болница",
	"Defense System" : "Одбранбен систем",
	"All industries" : "Сите гранки",
	"Country" : "Држава",
	"Create new company" : "Основај нова фирма",


// market
	"Quality Level" : "Ниво на квалитет",
	"All levels" : "Сите нивоа",
	"Level 1" : "1-во ниво",
	"Level 2" : "2-ро ниво",
	"Level 3" : "3-то ниво",
	"Level 4" : "4-то ниво",
	"Level 5" : "5-то ниво",

	"Provider" : "Понудувач",
	"Quality" : "Квалитет",
	"Stock" : "Залиха",
	"Market" : "Пазар",

	"Market offers" : "Понуди",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Next" : "Следна",
	"Prev" : "Назад",
	"No products in this market" : "Нема понуди",
	"Go to marketplace" : "Посети пазар",
	"Jobs available in this company" : "Слободни работни места",
	"You don't have any active job offers" : "Нема слободни места",
	"You didn't specify the amount of products you wish to buy" : 
		"Не наведовте количина за производите кои сакате да ги купите",
	"You cannot trade with this country as you are at war with it" :
		"Не можете да тргувате со држава против која војувате",


// job market
	"Industry" : "Индустрија",
	"Minimum skill" : "Вештина",


// region
	"Citizens" : "Жители",
	"Country - Society" : "Држава - Општество",
        "Heal" : "Лечи се",
	"Constructions": "Градежништво",
	"Population": "Популација",
	"Productivity" : "Продуктивност",
	"Resistance War" : "Револуција",
	"Resistance War Active" : "Активна револуција",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Не можете да започнете револуција затоа што регионот веќе припаѓа на матичната држава",
	"Medium" : "Средно",
	"High": "Високо",
	"Neighbors" : "Соседи",
	
	
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Изберете тип на индустрија за да ги видите понудите",
	"Skill Level" : "Ниво на вештина",
	"All skills" : "Сите вештини",
	"All" : "Сите",


// politics
	"New" : "Нов",
	"Old" : "Стар",
	"Value added tax (VAT)" : "Данок на додадена вредност (ДДВ)",
	"Tax change:" : "Промена на данок: ",
	"Country Administration" : "Државна администрација",
	"Accepted" : "Изгласан",
	"ACCEPTED" : "ИЗГЛАСАН",
	"Rejected" : "Одбиен",
	"REJECTED" : "ОДБИЕН",
	"Pending" : "Се гласа",
	"Congress" : "Собрание",
	"Issue Money" : "Печатење пари",
	"Law proposals" : "Предлог-закони",
	"Minimum Wage" : "Минималец",
	"Mutual Protection Pact" : "Пакт за меѓусебна заштита",
	"Alliance" : "Сојуз",
	"New Citizen Fee" : "Пристапница за нови жители",
	"Peace Proposal" : "Предлог за мировен договор",
	"President" : "Претседател",
	"Yes" : "Да",
	"No" : "Не",
	"Show all law proposals" : "Прикажи ги сите предлог-закони",
	"The law voting process takes 24 hours." : "Гласањето трае 24 часа.",
	"Only congress members and country presidents have the right to vote." : "Право на глас имаат само Претседателот и пратениците.",
	"You are not a president or a congress member in this country." : "Не сте ни Претседател ни пратеник во оваа држава.",
	
	
// wars
	"no allies" : "без сојузници",
	"All wars" : "Сите војни",
	"Active resistance wars in " : "Активни востанија во ",
	"All resistance wars" : "Сите револуции",
	"All Alliances" : "Сите сојузници",
	"Alliances" : "Сојузи",
	"Military force" : "Воена сила",
	"Average strength" : "Просечна сила",
	"War > Battlefield" : "Војна > Битка",
	"Basic damage" : "Основна штета",
	"Weapon quality" : "Квалитет на оружјето",
	"Wellness" : "Здравје",
	"Rank" : "Чин",
	"Total damage" : "Вкупна штета",
	

// army
	"You have trained today. You can train again tomorrow." : "Имате тренирано денес, вратете се утре.",
	"Force" : "Сила",
	"Military rank" : "Воен чин",
	"Military achievements" : "Воени успеси",
	"Active wars list" : "Листа на активни војни",
	"Field Marshal" : "Фелдмаршал",
	"General" : "Генерал",
	"Colonel" : "Полковник",
	"Captain" : "Капетан",
	"Lieutenant" : "Поручник",
	"Sergeant" : "Водник",
	"Corporal" : "Десетар",
	"Private" : "Војник",
	"Show active wars" : "Листа на активни војни",
	"Start a Resistance War" : "Започни револуција",
	"You do not have the necessary amount of Gold to start a resistance war." : "Немате доволно злато за  да започнете револуција.",
	"You cannot join this fight because your country is not involved in the war" : "Не можете да се борите затоа што Вашата држава не е вмешана.",
	"There are no resistance wars in this country." : "Нема револуции во оваа држава.",
	"until the region can be occupied or secured" : "додека регионот не биде окупиран или зачуван",
	"Attackable on President's decision" : "Може да биде нападнат со одлука на Претседателот",
	"Defense Points" : "Одбранбени поени",
	"Go to Battlefield" : "Бори се тука",
	"started on" : "започната на",
	"see finished battles" : "листа на завршени битки",
	"show finished battles" : "листа на завршени битки",
	"show active battles" : "листа на активни битки",
	"Damage" : "Штета",
	"fights" : " битки",
	"Still active" : "Сеуште активни",
	"Wars list" : "Листа на војни",
	"War" : "Војна",
	"Battle history" : "Историја на битката",
	"Fight" : "Бори се",
	"Hero" : "Херој",
	"Started by" : "Започната од ",
	"started by" : "започната од ",
	"active battles" : "активни битки",
	"Fight for resistance" : "Бори се за отпорот",
	"Fight for defenders" : "Бори се за бранителите",


// party
	"Get more" : "Останато",
	"Country presidency" : "Претседател",
	"Winner" : "Победник",
	"Next election in" : "Следни избори за",
	"Next elections in" : "Следни избори за",
	"No candidate proposed" : "Нема предложени кандидати",
	"candidates" : "кандидати",
	"Candidate" : "Кандидат",
	"days" : "денови",
	"GOLD" : " Злато",
	"Show results" : "Прикажи резултати",
	"Show candidate list" : "Прикажи ја листата на кандидати",
	"Show candidates list" : "Прикажи ја листата на кадидати",
	"You are not a member of a party" : "Не сте член на партија",
	"Join a party" : "Зачлени се",
	"You can join a party from it's presentation page or you can create your own party if you cannot  find the right one for you. Being a member of a party could give you the chance to become a Congress Member  or even the President." : "Можете да се зачлените во некоја партија преку нејзината страница или можете да  основате нова партија. Членувањето во партија може да Ви даде можност да станете пратеник или Претседател.",
	"Create new" : "Основај нов/а",
	"congress members" : "пратеници",
	"of Congress" : "Парламент",
	"Show proposed members of congress" : "Прикажи ги предложените кандидати за пратеници",
	"Run for congress" : "Кандидирај се за пратеник",
	"Join" : "Зачлени се",
	"See all members" : "Прикажи ги сите членови",
	"Donate Gold" : "Донирај злато",
	"Members"  : "Членови",
	"Orientation" : "Ориентација",
	"Show all members" : "Прикажи ги сите членови",

	"Center" : "Центар",
	"Anarchist" : "Анархисти",
	"Accounts" : "Сметки",
	"Elections" : "Избори",
	"Election results" : "Резултати од изборите",
	"Next elections" : "Следни избори",

	"Country Presidency" : "Претседател на држава",
	"Party presidency" : "Претседателство на партија",
	"Party President" : "Претседател на партија",
	"See results" : "Види ги резултатите",
	"Expires tomorrow" : "Истекува утре",
	"No. of votes" : "Број на гласови",
	"% of votes" : "% од гласовите",
	"No data available yet" : "Сеуште нема податоци",
	"Total votes" : "Вкупно гласови: ",
	"Presence" : "Присуство: ",
	"Election" : "Тип на избори",
	"Presidential elections" : "Претседателски",
	"Congressional elections" : "Парламентарни",
	"Party elections" : "Партиски",
	"Month/Year" : "Месец/година",


// articles
	"Report abuse" : "Пријави злоупотреба",
	"today" : "денес",
	"yesterday" : "вчера",
	"one hour ago" : "пред еден час",
	"Unsubscribe" : "Поништи ја претплатата",
	"Subscribe" : "Претплати се",
	"Article RSS" : "RSS статија",
	"Your comment" : "Твој коментар",
	"View all comments" : "Прикажи ги сите коментари",
	"Subscribe to comments" : "Претплати се на коментари",
	"Unsubscribe to comments" : "Поништи претплата за коментари",
	"Post a comment" : "Остави коментар",


// news
	"You do not have a newspaper" : "Не поседувате весник",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the  eRepublik Wiki. Create your own newspaper." : "Весниците се ефикасен начин за комуницирање во еРепублика.  Прочитајте повеќе на еРепублика Вики. Отворете свој весник.",


// profiles
	"Send message" : "Испрати порака",
	"Remove friend" : "Отстрани од пријатели",
	"Offer a gift" : "Понуди подарок",
	"Friends" : "Пријатели",
	"Fights" : "Борби",
	"ShareThis" : "Сподели",
	"Assets" : "Посед",
	"Press director" : "Главен уредник",
	"Inventory" : "Залихи",
	"Get Gold" : "Купи злато",
	"Career" : "Кариера",
	"Bio" : "Биографија",
	"Employee" : "Вработен/а во",
	"No political activity" : "Нема партија",
	"Wellness" : "Здравје",
	"Level" : "Ниво",
	" xp points " : "поени",
	"Strength" : "Сила",
	"Experience" : "Искуство",
	"Skills" : "Вештини",
	"Land" : "Земјоделство",
	"Manufacturing" : "Производство",
	"eRepublik Birthday" : "Ден на зачленување",
	"Get Extra Storage" : "Повеќе простор",
	"Party Member" : "Член на партија",
	"No activity" : "Нема весник",
	"Total damage:" : "Вкупна штета:",
	"Hard Worker" : "Вреден работник",
	"Congress Member" : "Пратеник",
	"Win the Congress elections": "Победете на изборите за пратеник",
	"Won the Congress elections": "Сте победиле на изборите за пратеник",
	"Country President" : "Претседател",
	"Win the Presidential elections" : "Победете на Претседателските избори",
	"Won the Presidential elections" : "Сте победиле на Претседателските избори",
	"Media Mogul" : "Медиумско влијание",
	"Battle Hero" : "Херој",
	"Reach the highest total damage in one battle" : "Нанесете најголема штета во битка",
	"Reached the highest total damage in one battle" : "Сте нанеле најголема штета во битка",
	"Resistance Hero" : "Херој на отпорот",
	"Start a resistance war and liberate that region" : "Започнете револуција и ослободете го регионот",
	"Super Soldier" : "Супер војник",
	"Society Builder" : "Градител на општество",
	"Check your unlocked features" : "Види ги отклучените можности",
	"Get Wellness" : "Купи здравје",
	"Achievements" : "Достигнувања",
	"Edit profile" : "Уреди профил",
	"Edit Profile" : "Уреди профил",
	"Change residence" : "Пресели се",
	"Donations list" : "Листа на донации",
	
	"Your email here" : "Ваш e-mail",
	"Your birthday" : "Роденден",
	"Citizen Avatar" : "Аватар",
	"Change password" : "Промени лозинка",


// fight
	"Back to battlefield" : "Врати се во битката",
	"Fight Again" : "Бори се повторно",
	"Fight bonus" : "Бонус",


// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in  again with your organization username and password." : "За да се најавите како организација, прво морате да се одјавите и да се најавите со името и лозинката на организацијата.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version,  please send us a message using the Contact form (category: Others) so that we can officially change it to an  organization." : "",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake  accounts and will be banned." : "",
	"My Organizations" : "Мои организации",
	"Logout" : "Одјави се",
	"Organizations created by you:" : "Ваши организации:",
	"You have not created any organization yet." : "Сеуште немате создадено организација.",


// career-path
	"General manager" : "Сопственик",
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
	"Edit newspaper details" : "Уреди детали на весникот",
	"Edit" : "Уреди",
	"Read Message" : "Прочитај",
	"Reply" : "Одговори",
	"From" : "Од",
	"Back" : "Врати се",
	"Picture" : "Слика",
	"only .jpeg pictures allowed" : "Само .jpeg тип е дозволен",
	"only JPG files allowed" : "Дозволени се само JPG слики",
	"Publish" : "Објави",
	"of" : " од ",
	"Select all" : "Означи ги сите",
	"Select All" : "Означи ги сите",
	"Older" : "Постари",
	"Newer" : "Понови",
	"After 5 days the alerts are automatically deleted" : "Известувањата се бришат автоматски по 5  дена",
	"Unsubscribe" : "Откажи претплата",
	"Weekly news" : "Неделни вести",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in  eRepublik" : "Неделна порака која ги покажува најдобрите вести, активни војни, воени случувања и петте  најсилни држави во еРепублика. ",
	"show example" : "пример",
	"Turn OFF" : "Исклучи",
	"Turn ON" : "Вклучи",


// flash menu
	"My places > Army" : "Војска",
	"My places > Party" : "Партија",
	"My places > Newspaper" : "Весник",
	"My places > Organizations" : "Организации",
	"My places > Advertising Department" : "Рекламирање",
	"Create party" : "Основај партија",
	"Monetary Market" : "Монетарен пазар",
	"Company market" : "Фирми на продажба",
	"Create company" : "Основај фирма",
	"Top Citizens" : "Најмоќни жители",
	"Compose message" : "Состави порака",


// from the regexps
	"You can get wellness from: " : "Можете да добиете здравје од: ",
	"Started a resistance war and liberated" : "Сте започнале востание и сте ослободиле ",


// compose message
	"To" : "До: ",
	"Subject" : "Наслов",
	"Message" : "Порака",
	"Send" : "Испрати",


// new company
	"Company details" : "Детали за фирмата",
	"Company name" : "Име на фирмата",
	"Company logo" : "Лого на фирмата",
	"Disscusion area" : "Област за дискусии",
	"Create" : "Основај",
	"Choose industry" : "Одбери индустриска гранка",
	"Please choose the industry" : "Одбери индустриска гранка.",


// monetary market
	"Exchange rate" : "Курс",
	"Amount to buy" : "Количина",
	"Rec exchange rate" : "Препорачан курс",
	"Sell" : "Продај",
	"Show my offers" : "Мои понуди",
	"Post new offer" : "Нова понуда",

// partija
	"Your account" : "Биланс: ",
	"Requirements" : "Побарувања",
	"Cost" : "Цена",
	"Party details" : "Детали за партијата",
	"Party name" : "Име на партијата",
	"Economical orientation" : "Економска ориентација",
	"Social orientation" : "Социјална ориентација",
	"Party logo" : "Лого на партијата",
	"Disscusion area " : "Област за дискусии",
	"Create" : "Основај партија",
	"6-30 characters max" : "од 6 до 30 знаци",
	"Please choose your party`s economical orientation" : "Одберете економска ориентација на партијата",
	"Please choose your party`s social orientation" : "Одберете социјална ориентација на партијата",
	"Far-left" : "Радикална левица",
	"Center-left" : "Лево од центарот",
	"Center" : "Центар",
	"Center-right" : "Десно од центарот",
	"Far-right" : "Радикална десница",
	"Totalitarian" : "Тоталитарна",
	"Authoritarian" : "Авторитативна",
	"Libertarian" : "Либерална",
	"Anarchist" : "Анархистичка",


// invitations
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Ќе добиете по 5  злато за секој жител кој ќе го поканите и ќе стигне до 6-то ниво.",
	"Your personal invitation link" : "Ваш личен линк за покана",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "Користете го овој линк на форуми, блогови, програми за четување или праќајте го преку email.",
	"Send email invite" : "Пратете покана на email",
	"Your name:" : "Вашето име: ",
	"Your friend's email:" : "Email на пријателот: ",
	"Use commas to separate multiple email addresses" : "Користете запирки за да одвоите повеќе email  адреси",
	"Invites status" : "Состојба на поканите",
	"View the status of your invites and bonuses" : "Видете ја состојбата на Вашите покани и  бонуси/награди",
	"Track invites" : "Види состојба",
	"Add from address book" : "Додај од адресар",
	"Add from adressbook" : "Додај од адресар",
	"Yahoo username" : "Корисничко име на Yahoo",
	"Yahoo password" : "Лозинка на Yahoo",
	"GMail username" : "Корисничко име на GMail",
	"GMail password" : "Лозинка на GMail",
	"MSN username" : "Корисничко име на MSN",
	"MSN password" : "Лозинка на MSN",
	"AOL username" : "Корисничко име на AOL",
	"AOL password" : "Лозинка на AOL",
	"Get contacts" : "Додај ги пријателите",
	"* Your username and password will not be stored on this server." : "* Корисничкото име и лозинката  од email сервисот нема да бидат зачувани на овој сервер.",
	"Privacy" : "Полиса за приватност",
	"Close" : "Затвори",


// menu	
	"Find out more" : "Дознај повеќе",
	"logout" : "Одјава",


// tools
	"Badges" : "Беџови",
	"Size:" : "Димензии:",
	"Code:" : "Код:",
	"Vectorial logo is available in the" : "Лого во векторски формат има во делот за ",
	"Press" : "Печат",
	"section" : "",
	"Latest shouts" : "Последни изјави",
	"Latest alliances" : "Последни сојузи",
	"Latest wars" : "Последни војни",
	"Latest military events" : "Последни воени настани",


// dolno meni
	"Blog" : "Блог",
	"Shop" : "Продавница",
	"Contact" : "Контакт",
	"Jobs" : "Работни места",
	"Affiliates" : "Партнери",
	"eRepublik Laws" : "Закони на еРепублика",


// extras
	"from" : "од",
	"2 Gold" : "2 Злато",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to  buy additional features within eRepublik." : "Златото во еРепублика е главна референтна точка за сите  виртуелни локални валути и се користи за купување на додатни можности во играта.",
	"Select amount" : "Количина",
	"Payments can be done in USD as well." : "Уплатите можат да се вршат и во американски долари.",
	"is a fictional currency used only in the eRepublik World." : " е измислена валута која се користи  само во овој виртуелен свет.",
	"I have read and agree with the" : " Ги прочитав и се согласувам со следните ",
	"You must read and agree with the Terms of service in order to complete your order." : "За да ја  прифатиме Вашата нарачка мора да ги прочитате и да се согласите со правилата за користење.",
	"Terms of Service" : "Правила",
	"Go to eRepublik" : "Врати се на еРепублика"
};





trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};




var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 сојузници ";
regexps["^Active wars in (.*)$"] = "Активни војни во $1";
regexps["^Active resistance wars in (.*)$"] = "Активни востанија во $1";
regexps["(\\s*)Expires in (\\d*) days"] = "истекува за $2 денови";
regexps["^(\\d*) comments$"] = "$1 коментари";
regexps["^(\\d*) hours ago$"] = "пред $1 часа";
regexps["^(\\d*) minutes ago$"] = "пред $1 минути";
regexps["^(\\d*) days ago$"] = "пред $1 денови";
regexps["^Regions \\((\\d*)\\)"] = "Региони ($1)";
regexps["^Regions \\((\\d*)\\)"] = "Региони ($1)";
regexps["^show all accounts \\((\\d*)\\)"] = "Сите девизи ($1)";
regexps["^(\\d*) months"] = "$1 месеци";
regexps["^Comments(.*)"] = "Коментари $1";
regexps["xp points"] = "поени";

regexps["^You worked (\\d*) days in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "Имате работено $1 денови по ред. Ви остануваат уште $2 денови за да добиете медал за 'Вреден работник'.";
regexps["^You worked( +)one day in a row\\.You have (\\d+) moe days until you receive a 'Hard Worker' Medal"] = "Имате работено само еден ден. Ви остануваат уште $2 денови за да добиете медал за 'Вреден работник'.";
regexps["^Next election in (\\d*) day\\."] = "Наредни избори за $1 денови.";
regexps["^Amount to buy$"] = "Количина";
regexps["Day (\\d+) of the New World"] = "Ден $1 од Новиот свет";
regexps["^All employees \\((\\d*)\\)"] = "Сите вработени ($1)";
regexps["Presence:  (\\d*)\\.(\\d*)%"] = "Излезеност: $1.$2";
regexps["^(\\d+) candidate(s)?$"] = "$1 кандидат(и)";
regexps["^(\\d+) citizen(s)?$"] = "$1 жител(и)";
regexps["^You cannot resign from your job until (.*)"] = "Не можете да дадете отказ се` до $1";
regexps["^Proposed by (.*), (.*) hours ago"] = "Предложен од $1 пред $2 часа";
regexps["^Tax change:(.*)"] = "Промена на данок: $1";
regexps["^Successfuly transfered (.*) item\\(s\\) to (.*)\\."] = "Префрливте $1 предмети на $2.";
regexps["^You have successfuly offered a quality (\\d+) gift\\."] = "Префрливте подарок со квалитет $1.";
regexps["You have successfully donated (.*)\\. This amount will appear shortly in the citizen/organization account\\."] = "Дониравте $1. Оваа сума наскоро ќе се појави во сметката на одбраниот жител или организација.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. Now you have the possibility to (.*)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Честитки, стигнавте до $2 ниво! За да стигнете до $4 ниво потребни Ви се $5 XP.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Честитки, стигнавте до $2 ниво! За да стигнете до $3 ниво потребни Ви се $4 XP.";
regexps["Congratulations, you(r)? have reached experience level (\\d+) and you have received as a reward (\\d+) Gold\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Честитки, стигнавте до $2 ниво и како награда добивте $3 злато! За да стигнете до $4 ниво потребни Ви се $5 XP.";
regexps["^( *)The General Manager of"] = "Сопственикот на ";
regexps["has modified your salary from (.*) to (.*)\\.( *)$"] = "Ви ја промени платата од $1 на $2.";
regexps["We are sorry to inform you that the General Manager of (.*) has decided to fire you! But don't worry, you can get a new job or you can even buy a company\\."] = "Мораме да Ве известиме дека, за жал, сопственикот на $1 реши да Ве отпушти. Но, не грижете се - може да побарате нова работа или да отворите Ваша фирма.";
regexps["There is no more food in your inventory\\. Without food to eat your Citizen loses (\\d+) wellness each day until he dies\\. To avoid death by starvation we advise you to buy food from the (.*)"] = "Немате храна во залиха. Без храна Вашиот жител губи по $1 здравје секој ден се` додека не умре. За да ја избегнете оваа ситуација Ве советуваме да купите храна од $2";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "Купивте $1 производ(и) за $3.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. Your current wellness is (.*)"] = "Не можете да се борите затоа што мора да имате најмалку $1 здравје, додека во моментов имате само $2.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\."] = "Не можете да се борите затоа што мора да имате најмалку $1 здравје.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. You can get wellness from (.*)"] = "Не можете да се борите затоа што мора да имате најмалку $1 здравје. Повеќе здравје може да добиете од ";
regexps["(\\d+) Citizens"] = "$1 жители";
regexps["You received (\\d+) wellness from hospital\\."] = "Со лечење во болницата добивте $1 здравје.";
regexps["You need at least (\\d+) Experience Points to join this fight"] = "Потребни Ви се најмалку $1 XP за да се борите";
regexps["President of (.*) has proposed an alliance with (.*)"] = "Претседателот на $1 понуди склучување на сојуз со $2.";
regexps["President of (.*) proposed an alliance with (.*)"] = "Претседателот на $1 понуди склучување на сојуз со $2.";
regexps["Citizen fee change from (.*) to (.*)"] = "Промена на пристапницата за нови жители од $1 на $2.";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "Дали се согласувате со префрлањето на $1 од државната благајна на $2?";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "Дали се согласувате со предлогот за печатење на $1 по цена од $2 Злато?";
regexps["Do you agree that (.*) should buy a (.*) of quality (\\d+) from (.*) company at the price of (.*) for (.*)\\?"] = "Дали се согласувате со предлогот $1 да купи $2 со квалитет $3 за регионот $6 од фирмата $4 по цена од $5?";
regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?"] = "Дали се согласувате со новата поздравна порака?";
regexps["The President of (.*) offered a sum of (.*) Gold to your National Treasury in return to a peace treaty with (.*)\\. <br><br>"] = "Претседателот на $1 понуди $2 Злато во замена за мировен договор со $3. <br><br>";
regexps["You have received (\\d+) gift of quality (\\d+) from"] = "Добивте $1 подарок со квалитет $2 од ";
regexps["\\. Your wellness has been increased with (\\d+)\\."] = ". Вашето здравје се зголеми за $1.";
regexps["(.*) has accepted your friendship request"] = "$1 ја прифати Вашата покана за пријателство";
regexps["supported by (\\d+) parties"] = "поддржан од $1 партии";
regexps["(\\d+)-(\\d+) characters max"] = "од $1 до $2 знаци";
regexps[" has transfered (\\d+) product(s)? to your inventory\\. Check your"] = " Ви префрли $1 производи. Проверете ги Вашите ";
regexps[" has transfered (.*) to your account\\."] = " Ви префрли $1.";
regexps["(\\d+) active battles"] = "$1 активни битки";
regexps["eRepublik is about changing the course of history in a huge virtual society\\. As a citizen in this New World of (.*) you have the power to make a difference and fulfill your economic, political or military goals like never possible before\\."] = "Целта на еРепублика е менување на текот на историјата во рамките на едно огромно виртуелно општество. Како жител на овој Нов свет Вие ја имате моќта да ги исполните Вашите економски, политички или воени цели како никогаш досега.";
regexps["Lead your citizens to prosperity as a country president or control the market as a rich company manager\\. With over (\\d+) countries, (.*) businesses, and varied country resources, your strategy and know-how can take you to the top\\."] = "Водете ги Вашите жители до благосостојба како нивен Претседател или контролирајте го пазарот како богат сопственик на компании. Со повеќе од $1 држави, $2 компании и разни ресурси, Вашата стратегија и знаење може да Ве одведат до врвот.";
regexps["Become influential with the power of your words, win others over with your ideas, or interview celebrities - the choice is yours. By starting your own newspaper and networking with your fellow citizens the impact of your voice is up to you."] = "Стекнете влијание со помош на силата на Вашите зборови, придобијте ги останатите жители со Вашите идеи или интервјуирајте познати личности - Ваш избор. Влијанието на Вашиот збор зависи само од Вас - ширете го преку создавање на интересен весник и стекнување нови пријатели.";
regexps["Diplomacy helps, but when it comes to war you will need to get a weapon and defend your country's borders - or expand them\\. From showing your patriotism to being a mercenary, the future of the New World is in your hands\\."] = "Дипломатијата помага, но во случај на војна треба да земете оружје во рака и да ги браните (или проширите) границите на Вашата држава. Од покажување патриотизам, па се` до станување платеник - иднината на Новиот свет е во Ваши раце.";
regexps["Work for (\\d+) days in a row"] = "Работете $1 денови по ред";
regexps["Worked (\\d+) days in a row"] = "Сте работеле $1 денови по ред";
regexps["Advance (\\d+) strength levels"] = "Напреднете $1 нивоа на сила";
regexps["Advanced (\\d+) strength levels"] = "Сте напреднале $1 нивоа на сила";
regexps["Reach (\\d+) subscribers to your newspaper"] = "Соберете $1 претплатници на Вашиот весник";
regexps["Reached (\\d+) subscribers to your newspaper"] = "Сте собрале $1 претплатници на Вашиот весник";
regexps["Invite (\\d+) people to eRepublik and help them reach level (\\d+)"] = "Поканете $1 пријатели и помогнете им да достигнат $2. ниво";
regexps["Invited (\\d+) people to eRepublik and helped them reach level (\\d+)"] = "Сте поканиле $1 пријатели и сте им помогнале да стигнат до $2. ниво";
regexps["wants to add you to (her|his) friends list\\. Will you accept\\?"] = "сака да Ве додаде како пријател. Дали прифаќате?";
regexps["Sorry, you need to reach experience level (\\d) in order to send invitations\\."] = "Треба да стигнете до $1 ниво за да можете да праќате покани на пријатели.";
regexps["The President of (.*) demanded a sum of (.*) Gold from your National Treasury in return to a peace treaty with (.*)\\."] = "Претседателот на $1 бара $2 Злато од нашата државна благајна во замена за мировен договор со $3.";
regexps["The President of (.*) demanded a sum of demand (.*) from your National Treasury in return to a peace treaty with (.*)\\."] = "Претседателот на $1 бара $2 злато од нашата државна благајна во замена за мировен договор со $3.";
regexps["(P|p)roposed by"] = "Предложен од:";
regexps["(T|t)oday"] = "денес";
regexps["(Y|y)esterday"] = "вчера";
regexps["Alliance"] = "Сојуз";
regexps["Buy (c|C)onstructions"] = "Купување на објект";
regexps["Trading Embargo"] = "Трговско ембарго";
regexps["President of (.*) proposes to stop the trade with (.*)"] = "Претседателот на $1 предлага трговско ембарго кон $2";
regexps["(.*) regions"] = "$1 региони";

// kopchinja
regexps["Apply"] = "Пријави се";
regexps["Buy"] = "Купи";
regexps["Delete"] = "Бриши";
regexps["Join party"] = "Стани член";
regexps["Search citizen"] = "Барај жител";
regexps["Make changes"] = "Изврши ги промените";
regexps["Move"] = "Пресели се";
regexps["Add as a friend"] = "Додај како пријател";
regexps["Send invitation"] = "Испрати покана";
regexps["Get Gold (&|&amp) Extras"] = "Купи злато";

// razno
regexps["Email must be valid for registration, so do not cheat"] = "Email адресата мора да биде валидна";
regexps["only <strong>(.*)</strong> pictures allowed"] = "дозволени се само <strong>$1</strong> слики";
regexps["Current location"] = "Сегашна локација";
regexps["Moving ticket"] = "Авионска карта";
regexps["New location:"] = "Нова локација";
regexps["Please select a country"] = "Одберете држава";
regexps["Please choose a country you want to live in."] = "Одберете ја државата во која сакате да се преселите";
regexps["Please choose the country you want to live in"] = "Одберете ја државата во која сакате да се преселите";
regexps["Select your eRepublik region."] = "Одберете го регионот во кој сакате да се преселите";
regexps["Please choose the region you want to live in"] = "Одберете го регионот во кој сакате да се преселите";
regexps["All donations"] = "Сите донации";
regexps["Items"] = "Предмети";
regexps["for 10 shouts/day and more"] = "";
regexps["General Manager"] = "Сопственик";
regexps["News"] = "Вести";




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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"", "option":"", "select":"",
// 2009.04.28. via_mala added
    "i":"", "b":"", "em":"", "font":"", "h1":"", "li":"", "label":""
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
};


translateDomNode = function(rootNode)  {
  var node = undefined;
  var translation = undefined;
  for (var tagName in allTrans) {
    var tags = rootNode.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      // if ( node.tagName == "INPUT" && node.type == "button" )
      if ( node.tagName.toLowerCase () == "input" && node.type.toLowerCase () == "button" ) {
        translation = translateWithRegexp(node.value);
        if (translation!==undefined) {
          node.value = translation;
        }
      } else if (node.childNodes.length==1) {
        translation = translateWithRegexp(node.innerHTML);
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
};

var blockEvent = false;

translateWholePage = function(e) {
  blockEvent = true;
  translateDomNode(document);
  blockEvent = false;
};

translateNode = function (e) {
  if ( blockEvent ) {
    return;
  }
  blockEvent = true;
  var node = e.relatedNode;
  var translate = translateWithRegexp(node.innerHTML);
  if (translate !== undefined) {
     node.innerHTML = translate;
     blockEvent = false;
     return;
  }
  translateDomNode(node);
  blockEvent = false;
};




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('tbody, .dotted, .core { font-size: 12px ! important; }');
addGlobalStyle('.quarterhead { font-size: 11px ! important; }');
addGlobalStyle('.x { font-size: 24px ! important; }');
addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul  li#menu5 a, #logo a { background-image: url(http://www.karagocev.net/stuff/erep_menu.png); }');
addGlobalStyle('.btnGetExtraStorage { font-size: 10px; }');



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
}, false);



