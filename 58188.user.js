// ==UserScript==
// @name           eRepublik Bulgarian translation
// @description    eRepublik Bulgarian translation
// @include        http://www*.erepublik.com/*
// @include        http://www*.erepublik.com/en/news/rated/1/my
// @include        http://economy.erepublik.com/*
// @include	       http://eads.erepublik.com/advertise

// ==/UserScript==

//===============================================================================
//						- Weekly Auto-Update Check -
//===============================================================================
// CheckForUpdate() will verify if the time has come to look if an update is available.
// CheckVersion() will verify if this script version is the latest available.
//===============================================================================
var script_title = "eRepublik Bulgarian translation"
var source_location = "http://userscripts.org/scripts/source/50428.user.js";
var current_version = "1.1.3";
var latest_version = " ";
var gm_updateparam = "videofocus_lastupdatecheck";
var lastupdatecheck = GM_getValue(gm_updateparam, "never");

// a google document is used to store the latest version number (If the version in that file does not match the current_version variable, an update will be triggered)
var version_holder = "http://docs.google.com/View?docID=dzr9nqd_07c4nj4d2&revision=_latest";

//Add a command to the menu in case someone wants to manually check for an update.
GM_registerMenuCommand("VF->Force Update", CheckVersion);

//Initiate the download of the new script version.
function GetNewVersion() { window.location = source_location; }

//Verify if it's time to update
function CheckForUpdate()
{	
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds

	if(lastupdatecheck != "never")
	{
		today = today.getTime(); //Get today's date
		var lastupdatecheck = new Date(lastupdatecheck).getTime();
		var interval = (today - lastupdatecheck) / one_day; //Find out how much days have passed		

		//If a week has passed since the last update check, check if a new version is available
		if(interval >= 7)			
			CheckVersion();
	}
	else
		CheckVersion();
}

//Make sure we don't already have the latest version
function CheckVersion()
{
	GM_xmlhttpRequest({
		    method: 'GET',
		    url: version_holder,
		    headers: {'Content-type':'application/x-www-form-urlencoded'},		    
		    onload: function(responseDetails)
			{
				var line = String(responseDetails.responseText.match(/version=[0-9].[0-9]?[0-9,a-z,A-Z].[0-9]?[0-9,a-z,A-Z]/));				
				
				if(line != null)
				{
					var strSplit = new Array();
					strSplit = line.split('=');					
					latest_version = strSplit[1];

					if(latest_version == null)
					{
						alert("An error occured, latest version undefined.\r\nTry again later.");
						//CheckVersion();
					}
					else
					{
						if(current_version != latest_version)
						{
							if(confirm("A more recent version of " + script_title + " (" + latest_version + ") has been found.\r\nWould you like to get it now?"))
								GetNewVersion();
							else
								AskForReminder();
						} 
						else if(current_version == latest_version)
							alert("You have the latest version of " + script_title + ".");
					}
				}
				else
				{
					alert("Could not locate the version holder file.\r\nThis should be reported to the script author.\r\nThank you!");
					SkipWeeklyUpdateCheck();
				}
					
		    }
		});
}

//Ask the user to be reminded in 24 hours or only next week.
function AskForReminder()
{
	if(confirm("Would you like to be reminded in 24 hours ?\r\n(Cancel to be reminded next week only)"))
	{
		var today = new Date();
		today = today.getTime();		
		var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
		var sda_ms = today - sixdays_ms;		
		var sixdaysago = new Date(sda_ms)

		//Since we check for updates after 7 days, just make it seem like the last check was 6 days ago.
		GM_setValue(gm_updateparam, String(sixdaysago));
	}
	else
		SkipWeeklyUpdateCheck();
}

//Set the next update check in seven days
function SkipWeeklyUpdateCheck()
{
	var today = new Date();
	//As if we've just updated the script, the next check will only be next week.
	GM_setValue(gm_updateparam, String(today));
}
//===============================================================================
//						- Weekly Auto-Update Check -
//===============================================================================



var strings = {
//
	"eRepublik is an online multiplayer strategy game" : "eRepublik е стратегическа онлайн мултиплеър игра",
	"Find out more" : "Научи още",
	"Become a citizen" : "Стани гражданин",
	"Enter the new world" : "Влез в новият свят",
	"Citizen name" : "Гражданско име",
	"Password" : "Парола",
	"Forgot password?" : "Забравена парола?",
	"Remember me" : "Запомни ме",
	"login" : "Влез",
	"Login" : "Влез",
	"logout" : "Излез",
	"Logout" : "Излез",
	"Remember me" : "Запомни ме",
	"Not a citizen yet?" : "Още не си гражданин?",
	"Take the tour" : "Разгледай наоколо",
	"Join now" : "Играй сега",
	"It's free" : "Безплатно е",
	"Guest" : "Гост",
	"citizens" : "граждани",
	"What's happening in eRepublik?" : "Какво става в  eRepublik?",
	"Forum discussions" : "Форум дискусии",
	"Top countries in eRepublik" : "Топ страни в eRepublik",
	"top countries in eRepublik" : "топ страни в eRepublik",
	
// tour
	"What is eRepublik?" : "Какво е eRepublik?",
	"eRepublik is about changing the course of history in a huge virtual society. As a citizen in this New World of 221,658 you have the power to make a difference and fulfill your economic, political or military goals like never possible before." : "eRepublik este in schimbare despre cursul istoriei, intr-o societate imens virtuale. In calitate de cetatean, in aceasta noua lume a 221658 aveti puterea de a face o diferenta si indeplini dvs. economice, obiectivele politice sau militare, ca niciodata posibil inainte.",
	"It's 100% free and only takes a minute or two" : "",
	"Think you can do better?" : "Мислиш , че ще се справиш по-добре?",
	"Fight for your country" : "Бий се за страната си.",
	
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",


// Home
	"Friends" : "Приятели",
	"Official" : "Официални",
	"Everyone" : "Всички",
	"one month ago" : "преди един месец",
	"2 months ago" : "преди два месеца",
	"News" : "Новини",
	"Top rated" : "Топ 5",
	"Latest" : "Последни",
        "Latest Events" : "Последни събития",
        "National" : "Национални",
	"International" : "Международни",
	"more news" : "още новини",
	"more events" : "още събития",

// news/rated/1/my
        "Top rated news" : "Най-високо оценени",
     
// search
	"No." : "Nr.",
	"Name" : "Име",
	"Country" : "Държава",
	"Experience points" : "Exp. точки",

// menu
	"Profile" : "Профил",
	"Company" : "Компания",
	"Army" : "Армия",
	"Party" : "Партия",
	"Newspaper" : "Вестник",
	"Country administration" : "Държавно управление",
	"Organizations" : "Организации",
	"Advertising Department" : "Реклами",
	
	"Marketplace" : "Пазар",
	"Monetary market" : "Валутен пазар",
	"Job market" : "Обяви за работа",
	"Companies for sale" : "Компании за продажба",
	"Get Gold & Extras" : "Купи Злато & Екстри",

	"Rankings" : "Класиране",
	"Social stats" : "Социална статистика",
	"Economic stats" : "Икономическа",
	"Political stats" : "Политическа",
	"Military stats" : "Военна",
	"Tutorials" : "Уроци",
	"Tools" : "Инструменти",
	"Forum" : "Форум",
	"News" : "Новини",
	"Invite friends" : "Покани приятели",
	"Elections" : "Избори",
	"eRepublik Shop" : "eRepublik Магазин",
	"Career path" : "Кариера",
	"World Map" : "Карта на еСвета",

	"Day" : "Ден ",
	"of the New World" : " от новият Свят",
	"You should work today" : "Трябва да работиш днес",
	"It will help you increase both your skill and savings." : "Ще ти помогне много.",
	"You should train today" : "Трябва да тренираш днес",
	"Find a job" : "Намери си работа",
	"Your strength can make you a hero on the battlefield." : "Твоята Сила може да те направи Герой на бойното поле.",
	"You are in the right place at the right time to take advantage of your opportunities. " : "Ти си на правилното място, за да се възползваш от възможностите ти.",

// citizen/profile
	"edit profile" : "Редактирай профил",

	"Dead citizen " : "Починал гражданин",
	"Citizen permanently suspended for reaching 5 forfeit points." : "Перманентно отстранен гражданин заради достигане на 5 наказателни точки.",
	"Citizen temporarily suspended for racism, extremism, trolling, flaming or pornography." : "Временно отстранен гражданин заради расизъм, порнография, спам или друго.",
	"Citizen temporarily suspended for insults." : "Бременно отстранен гражданин заради обиди.",
	"Organization temporarily suspended for flaming." : "Organiza?ie temporar suspendata pentru inflacarare.",
	"Organization permanently suspended for using system exploits." : "Organiza?ie suspendata permanent pentru utilizarea sistemelor de exploatare.",
	"Citizen permanently suspended for properties obtained through an illegal or unjust method." : "Ceta?ean suspendat permanent pentru proprietati obtinute printr-o metoda ilegal sau injusta.",
	"Citizen permanently suspended for creating or administrating multiple citizen accounts." : "Ceta?ean suspendat permanent pentru crearea sau administrarea de conturi multiple",
	"Citizen permanently suspended for using system exploits." : "Ceta?ean suspendat permanent pentru utilizarea sistemelor de exploatare",
	"Location" : "Местоположение",
	"Citizenship" : "Гражданство",
	"National Rank" : "Национален Ранг",
	"Forfeit points" : "Наказ. точки",
	"Change" : "Премести се",
	"You cannot move in this country because it is involved in a war with your country" : "Не можеш да се преместиш в тази страна, защото е заблечена във война с твоята.",

	"Accounts" : "Акаунти",
	"Get Gold" : "Купи Злато",
	"all donations" : "Дарителски лист",
	"show less" : "скрий ",
	"Inventory" : "Инвентар",
	"Get Extra Storage" : "Доп. място",

	"Career" : "Кариера",
	"Bio" : "Биография",

	"Achievements" : "Постижения",
	"Hard Worker" : "Усърден работник",
	"Work for 30 days in a row" : "Работи 30 дена под ред",
	"Worked 30 days in a row" : "Работил 30 дена под ред",
	"Congress Member" : "Депутат",
	"Win the Congress elections" : "Спечели на парламентарните избори",
	"Won the Congress elections" : "Спечелил на парламентарните избори",
	"Country President" : "Президент",
	"Won the Presidential elections" : "Спечелил на президентските избори",
	"Win the Presidential elections" : "Спечели на президентските избори",
	"Media Mogul" : "Медиен магнат",
	"Reached 1000 subscribers to your newspaper" : "Събрал 1000 абоната към вестника си",
	"Reach 1000 subscribers to your newspaper" : "Събери 1000 абоната към твоят вестник",
	"Battle Hero" : "Военен герой",
	"Reached the highest total damage in one battle" : "Направил най-много щета в една битка",
	"Reach the highest total damage in one battle" : "Направете най-много щета в една битка",
	"Resistance Hero" : "Освободителен герой",
	"Started a resistance war and liberate that region" : "Стартирал Освободителна война и освободил региона",
	"Start a resistance war and liberate that region" : "Стартирайте Освободителна война и освободете този регион",
	"Started a resistance war and liberated" : "Стартирал Освободителна война и освободил",
	"regions." : " региони.",
	"Super Soldier" : "Супер Войник",
	"Advanced 5 strength levels" : "На всеки 5 нива сила - получавате по един медал",
	"Advance 5 strength levels" : "На всеки 5 нива сила - получавате по един медал",
	"Society Builder" : "Социален строител",
	"Invited 10 people to eRepublik and helped them reach level 6" : "Поканил повече от 10 човека в еРепублик и им помогнал да достигнат 6 левъл",
	"Invite 10 people to eRepublik and help them reach level 6" : "Покани повече от 10 човека в еРепублик и им помогни да достигнат 6 левъл",

	"Employee" : "Работник",
	"Unemployed" : "Безработен",
	"Party Member" : "Партиен член",
	"No political activity" : "Неактивен",
	"No activity" : "Неактивен",
	"Press director" : "Автор на вестник",
	"Private" : "Редник",
	"Corporal" : "Ефрейтор",
	"Sergeant" : "Сержант",
	"Lieutenant" : "Лейтенант",
	"Captain" : "Капитан",
	"Colonel" : "Полковник",
        "General" : "Генерал",
        "Field Marshal" : "Фелдмаршал",
	"Fights" : "Битки",
	"Total Damage:" : "Обща щета:",

	"Wellness" : "Здраве",
	"Get Wellness" : "Купи Здраве",
	"Level" : "Ниво",
	"Check your unlocked features" : "Виж отключените неща",
	"Skills" : "Скилове",
	"Manufacturing" : "Промишленост",
	"Land" : "Производство",
	"The skill of gathering raw materials like grains, iron, wood, diamonds, and oil." : "Умение за добив на суровини като зърно, желязо, диаманти, дърво и петрол.",
	"Constructions" : "Конструкция",
	"Strength" : "Сила",
	"eRepublik Birthday" : "eRepublik Рожден ден",

	"Send message" : "ЛС",
	"Add as a friend" : "Добави в приятели",
	"Your friendship request has been sent." : "Вашата покана за приятелство беше изпратена.",
	"Remove friend" : "Махни от приятели",
	"Friendship was successfully canceled" : "Приятелството беше успешно отказано.",
	"Offer a gift" : "Изпрати подарък",
	"You do not own any gifts." : "Ти не притежаваш подаръци.",
	"Donate" : "Дари",
	"report abuse" : "Нередност",

	"No shouts posted by this citizen yet" : "Този гражданин не е викал все още",
	"one month ago" : "преди един месец",
	"2 months ago" : "преди 2 месеца",
	"3 months ago" : "преди 3 месеца",
	"yesterday" : "вчера",
	"2 days ago" : "преди 2 дена",

// citizen/edit/profile
	"Edit Profile" : "Редактирай профил",
	"Your email here" : "Вашият Email",
	"Email must be valid for registration, so do not cheat" : "Трябва да е валиден за регистрацията",
	"Your birthday" : "Вашият рожден ден",
	"Month" : "Месец",
	"January" : "Януари",
	"February" : "Февруари",
	"March" : "Март",
	"April" : "Април",
	"May" : "Май",
	"June" : "Юни",
	"July" : "Юли",
	"August" : "Август",
	"September" : "Септември",
	"October" : "Октомври",
	"November" : "Ноември",
	"December" : "Декември",
	"Citizen Avatar" : "Аватар",
	"only .jpeg pictures allowed" : "Позволени са само .JPG",
	"Make changes" : "Запази промяните",
	"Change password" : "Смяна на парола",

// citizen/change-password
	"Current password" : "Сегашна парола",
	"New password" : "Нова парола",
	"New password again" : "Нова парола пак",

// citizen/change-residence
	"Change residence" : "Смяна на местожителство",
	"Current location" : "В момента се намирате",
	"New location:" : "Новo местоположение",
	"Please select a country" : "Моля изберете страна",
	"Please choose the country you want to live in" : "Моля изберете държавата в която искате да живеете",
	"Please choose a country you want to live in." : "Моля изберете държава в която искате да живеете",
	"Please choose the region you want to live in" : "Моля изберете региона в който искате да живеете",
	"Move" : "Премести",
	"You have successfully moved to" : "Успешно се преместихте в ",
	"Do you wish to apply for citizenship in your new country?" : "Искате ли да кандидатствате за гражданство в новата държава?",
	"Apply for citizenship" :"Кандидатствай",
	"No, thanks" : "Не, благодаря",
	
// citizenship
	"This message will be displayed to the members of Congress who will be able to accept or deny your citizenship request." : "Това съобщения ще се показва на депутатите който одобряват или отхвърлят искането за Гражданство.",
	"Please type in a short description why you are applying for citizenship" : "Va rugam sa scrieti intr-o scurta descriere de ce dori?i sa aplica?i pentru cetatenie",
	"Or, cancel request." : "Или отмени.",
	"You have 500 characters left" : "Имаш още 500 символа",
	"Congratulations, your citizenship application in Moldavia has been accepted! You now have the right to vote, join a political party and run in elections." : "",

// countries
	"All countries" : "Всички страни",
	"Argentina" : "Аржентина",
	"Australia" : "Австралия",
	"Austria" : "Австрия",
	"Bosnia and Herzegovina" : "Босна и Херцеговина",
	"Brazil" : "Бразилия",
	"Bulgaria" : "България",
        "Bolivia" : "Боливия",
	"China" : "Китай",
	"Croatia" : "Хърватия",
	"Canada" : "Канада",
        "Chile" : "Чили",
	"Czech Republic" : "Чехия",
	"Denmark" : "Дания",
	"Estonia" : "Естония",
	"Finland" : "Финландия",
	"France" : "Франция",
	"Germany" : "Германия",
	"Greece" : "Гърция",
	"Hungary" : "Унгария",
	"India" : "Индия",
        "Indonesia" : "Индонезия",
	"Ireland" : "Ирландия",
	"Israel" : "Израел",
	"Italy" : "Италия",
	"Iran" : "Иран",
        "Japan" : "Япония",
	"Latvia" : "Латвия",
	"Lithuania" : "Литва",
	"Malaysia" : "Малайзия",
	"Mexico" : "Мексико",
	"Moldavia" : "Молдова",
	"Netherlands" : "Холандия",
	"Norway" : "Норвегия",
	"Pakistan" : "Пакистан",
	"Philippines" : "Филипини",
	"Poland" : "Полша",
	"Portugal" : "Португалия",
        "Peru" : "Перу",
        "Paraguay" : "Парагвай",
	"Romania" : "Румъния",
	"Serbia" : "Сърбия",
	"Singapore" : "Сингапур",
	"South Africa" : "Южна Африка",
	"South Korea" : "Южна Корея",
	"Slovakia" : "Словакия",
	"Slovenia" : "Словения",
	"Switzerland" : "Швейцария",
	"Spain" : "Испания",
	"Sweden" : "Швеция",
	"Russia" : "Русия",
	"Thailand" : "Тайланд",
	"United Kingdom" : "Великобритания",
	"Ukraine" : "Украйна",
	"Uruguay" : "Уругвай",
        "USA" : "САЩ",
        "Venezuela" : "Венецуела",
	"Turkey" : "Турция",
	"Belgium" : "Белгия",
	"Colombia" : "Колумбия",
	"North Korea" : "Северна Корея",
	"World" : "Свят",

// donate/items
	"Items" : "Итеми",
	"Money" : "Пари",
	"Drag and drop items from your inventory to the donation area" : "Хвани и премести продукти до дарителската зона." ,
	"Your inventory" : "Вашият инвентар",
	"Donation" : "Дарение",	
	"Donate" : "Дари",	
	"Your account" : "Вашият акаунт",
	"You do not have enough money in your account to make this donation." : "Недостатъчно пари в акаунта ви,за да дарите.",
	"All donations" : "Всички дарения",
	"GOLD" : "ЗЛАТО",

// donate/list
	"From" : "От",
        "То" : "До",
	"Gold" : " Злато",

// organization
	"Assets" : "Активен",
	"General Manager" : "Главен Мениджър",

// my-places/company
	"Your companies" : "Вашите компании",
	"details" : "детайли",
	"Buy from market" : "Купи от пазар",
	"Create new" : "Направи нова",
	"Own a company" : "Собствена компания",
	"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "Avand propria companie, aceasta poate fi o sursa majora de avere, dar mai intai va trebui sa va asigura?i ca ave?i suficien?i bani pentru a plati salariile angaja?ilor, astfel incat sa nu da?i faliment.",
	"Create company" : "Създай компания",

// company
	"Edit details" : "Редактирай",
	"Sell company" : "Продай компания",
	"Office" : "Офис",
	"You have not worked today." : "Не си работил днес.",
	"You have already worked today." : "Вече си работил днес.",
	"Come back tomorrow." : "Ела пак утре.",
	"Work" : "Работи",
	"Resign" : "Напусни",
	"The salary cannot be lower then the amount agreed until three days pass." : "Заплатата не може да бъде намалявана първите три дена.",
	"You cannot resign from your job until" : "Не може да напуснетете работата си преди ",
	"Finances" : "Финанси",	
	"Employees" : "Работници",
	"Show all employees" : "Покажи всички",
	"Products" : "Продукти",
	"Stock" : "Запас",
	"Upgrade quality level" : "Ъпгрейд на качеството",
	"Raw materials" : "Суровини",
        "Market offers" : "Оферти на пазара",
	"Amount" : "Колич.",
	"Price" : "Цена",
	"Jobs available in this company" : "Свободни работни места ",
	"Donate raw materials" : "Дари ресурси",
	"Buy raw materials" : "Купи ресурси",
	"Price with taxes" : "Цена с ДДС",
	"The company cannot trade with this country due to a trade embargo." : "Компанията не може да търгува с тази държава, защото има търговско ембарго",
	"The company offers no products in this market" : "Компанията няма продукти на този пазар.",
	"Go to marketplace" : "Отиди на пазара",
	"Buy market license" : "Купи лиценз",
	"Add a job offer" : "Добави оферта",
	"You do not have any active job offers" : "Вие нямате свободни работни места",
	"Your offer was removed" : "Офертата ви беше премахната.",
	"Your offer has been updated" : "Офертата ви е ъпдейтната",
	"Minimum Skill" : "Минимум скил",
	"Daily salary" : "Заплата",
	"Mo" : "ПО",
	"Tu" : "ВТ",
	"We" : "СР",
	"Th" : "ЧЕТ",
	"Fr" : "ПЕТ",
	"Sa" : "СЪБ",
	"Su" : "НЕД",
	"Employees details" : "Детайли",
	"Salary " : "Заплата ",
	"Update " : "Ъпдейтни ",
	"Remove " : "Премахни ",

// do_work
	"Total productivity" : "Общо произведено",
	"Basic productivity" : "Основно",
	"Work Bonus" : "Бонус",
	"Land skill" : "Calificare",
	"Back to company" : "Обратно към компанията",

// edit-company
	"Company page" : "Към компанията",
	"Edit company details" : "Промени информацията за компанията",
	"Company account" : "Акаунт на компанията",
	"Company name" : "Име на компанията",
	"Company logo" : "Лого на компанията",
	"Disscusion area" : "Дискусионна зона",
	"Cost" : "Струва",
	"Gold" : "Злато",

// create-company
	"Company details" : "Детайли на компанията",

// sell-company
	"Sell company" : "Продай",
	"Selling Price" : "Цена",
	"Gold" : "  Злато",
	"Enter a price between 1 - 5000 Gold" : "Въведете цена между 1-5000 Злато",
	"Set on sale" : "Пусни в продажба",

// companies-for-sale
	"Company market" : "Пазар за компаний",
	"Create new company" : "Създай нова компания",
	"Industry" : "Индустрия",
	"Quality" : "Качество",

// company-finances
	"Your accounts" : "Вашите акаунти",
	"Company accounts" : "Акаунти на компанията",
	"Invest" : "Инвестирай",
	"Collect" : "Изтегли",
	"You can exchange money at the" : "Може да обмените пари в ",
	
// balance
	"Account balance" : "Баланс на акаунта",
	"Account:" : "Акаунт: ",
	"Incomes" : "Доходи",
	"Finances" : "Финанси",
	"Expenses" : "Разходи",
	"Week" : "Седмица ",
	"Cash reserves:" : "Парични резерви: ",
	"Product sales:" : "Продажби: ",
	"Investments:" : "Инвестиции: ",
	"Monetary market exchange:" : "Валутен пазар: ",
	"Salaries:" : "Заплати: ",
	"Raw materials:" : "Суровини: ",
	"Collect profit:" : "Общо: ",
	"Taxes:" : "Такси: ",
	"- VAT:" : "ДДС: ",
	"- Income taxes:" : "Данъци върху печалбата: ",
	"- Import taxes:" : "Данък внос: ",
	"Profit/loss: " : "Печалба / загуба: ",
	"GOLD " : "Злато ",
	"QL downgrade:" : "Свали качество: ",
	"QL upgrade:" : "Ъпгрей на качество: ",
	
// company-finances/sales
	"There were no sales within the selected week" : "Нищо не е било продадено тази седмица",
	"Sold products" : "Продадени продукти",
	"Price:" : "Цена:",
	"Gross" : "Бруто",
	"Income:" : "Доход:",
	"Sales history" : "История на продажбата",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	
// company-employees
	"All employees" : "Всички работници",
	"Skill" : "Скил",
	"Wellness" : "Живот",
	"Last presence" : "Последна поява",
	"Daily salary" : "Заплата",
	"Minimum country wage :" : "Минимална заплата в страната:",
	"Update" : "Актуализирай",
	"Fire" : "Уволни",
	"Yesterday" : "Вчера",
	"Today" : "Днес",

// company-upgrade
	"Quality level" : "Ниво на качество",
	"Upgrade quality level" : "Ъпдейт на нивото на качеството",
	"Gold" : " ЗЛАТО",
	"Upgrade" : "Ъпдейт",
	"Downgrade quality level" : "Diminuiaza calitatea",
	"Receive" : "Recuperare",
	"Downgrade" : "Mic?oreaza",

// buy-licence
	"Buy export license" : "Купи лиценз за износ",
	"Company account" : "Contul companiei",
	"Country" : "Страна",
	"Buy" : "Купи",
	"Gold" : " Злато",

// my-places/army
	"My places > Army" : "Армия",
	"Army" : "Армия",
	"You have trained today. You can train again tomorrow." : "Ти си тренирал днес,тренирай пак утре.",
	"You have not trained today" : "Ти не си тренирал днес.",	
	"Train" : "Тренирай",
	"Strength" : "Сила",
	"Military rank" : "Военен ранк",
	"Military achievements" : "Военни постижения",
	"Hero" : "Герой",
	"Show active wars" : "Покажи активните битки",
	"Start a resistance war" : "Започни възстание",
	"You do not have the necessary amount of Gold to start a resistance war." : "Нямаш достатъчно злато за да започнеш възстание.",
	"Damage" : "Щета",

// my-places/train
	"Strength gained" : "Придобита сила", 
	"Training" : "Тренировка",
	"Train bonus" : "Бонус",
	"Active wars list" : "Активни битки",
	"Back to army" : "Назад към Армия",
	"Experience" : "Експириенс",

// wars
	"Wars" : "Войни",
	"War types" : "Тип войни",
	"Conquest wars" : "Завоевателна война",
	"Resistance wars" : "Освободителна война",
	"All wars" : "Всички войни",
	"War status" : "Статус",
	"Active wars" : "Активни войни",
	"Ended wars" : "Завършени войни",
	"Countries involved" : "Участващи страни",
	"no allies" : "Без алианс",
	"started by" : "започната от ",
	"details" : "детайли",
	"1 active battles" : "1 активна битка",
	"2 active battles" : "2 активни битки",
	"no active battles" : "Няма активни битки",

// wars/show
	"War" : "Война",
	"Wars list" : "Лист с войни",
	"show finished battles" : "покажи свършените битки",
	"There are no active battles in this war" : "Няма активни битки в тази война",
	"show active battles" : "покажи активни битки",
        "fights" : " БОЙ",
	"until the region can be occupied or secured" : "преди региона да бъде окупиран или защитен",
	"Battle history" : "История на битката",
	"You cannot join this fight because your country is not involved in the war" : "Не можеш да участваш в битката, защото твоята страна не участва в битката.",
	"Secure" : "Защити",
	"Conquer" : "Завладей",
	"Fight" : "БОЙ",
	"started on" : "започна от ",
	"Defense Points" : "Защитни точки",
	"Go to Battlefield" : "Отиди на бойното поле",
	"You can get wellness from:" : "Може да се излекувате в: ",
	"War > Battlefield" : "Бойно поле",

//battles/fight
	"Total damage" : "Обща щета",
	"Good fight, Private!" : "Добра битка, Редник!",
	"Good fight, Corporal!" : "Добра битка, Ефрейторе!",
	"Good fight, Sergeant!" : "Добра битка, Сержант!",
	"Good fight, Lieutenant!" : "Добра битка, Лейтенант!",
	"Good fight, Captain!" : "Добра битка, Капитане!",
	"Good fight, Colonel!" : "Добра битка, Полковник!",
	"Good fight, General!" : "Добра битка, Генерале!",
	"Good fight, Field Marshal!" : "Добра битка, Фелдмаршал!",
        "Great fight, Private!" : "Чудесна битка, Редник!",
	"Great fight, Corporal!" : "Чудесна битка, Ефрейторе!",
	"Great fight, Sergeant!" : "Чудесна битка, Сержант!",
	"Great fight, Lieutenant!" : "Чудесна битка, Лейтенант!",
	"Great fight, Captain!" : "Чудесна битка, Капитане!",
	"Great fight, Colonel!" : "Чудесна битка, Полковник!",
	"Great fight, General!" : "Чудесна битка, Генерале!",
	"Great fight, Field Marshal!" : "Чудесна битка, Фелдмаршал!",
        "Impressive fight, Private!" : "Впечатляваща битка, Редник!",
	"Impressive fight, Corporal!" : "Впечатляваща битка, Ефрейтпре!",
	"Impressive fight, Sergeant!" : "Впечатляваща битка, Сержант!",
	"Impressive fight, Lieutenant!" : "Впечатляваща битка, Лейтенант!",
	"Impressive fight, Captain!" : "Впечатляваща битка, Капитане!",
	"Impressive fight, Colonel!" : "Впечатляваща битка, Полковник!",
	"Impressive fight, General!" : "Впечатляваща битка, Генерале!",
	"Impressive fight, Field Marshal!" : "Впечатляваща битка, Фелдмаршал!",
        "Legendary fight, Private!" : "Легендарна битка, Редник!",
	"Legendary fight, Corporal!" : "Легендарна битка, Ефрейторе!",
	"Legendary fight, Sergeant!" : "Легендарна битка, Сержант!",
	"Legendary fight, Lieutenant!" : "Легендарна битка, Лейтенант!",
	"Legendary fight, Captain!" : "Легендарна битка, Капитане!",
	"Legendary fight, Colonel!" : "Легендарна битка, Полковник!",
	"Legendary fight, General!" : "Легендарна битка, Генерале!",
	"Legendary fight, Field Marshal!" : "Легендарна битка, Фелдмаршал!",
	"Basic damage" : "Осн. щета",
	"Fight bonus" : "Боен бонус",
	"Weapon quality" : " Качество на оръжието",
	"Wellness" : "Здраве",
	"Rank" : "Ранк",
	"Back to battlefield" : "Върни се на бойното поле",
	"Buy Wellness Box" : " Купи Здраве",
	"Fight Again" : "Бий се пак",
	"Fight for resistance" : "Бий се за съпротивата",
	"Fight for defenders" : "Бий се за защитата",	

// battles/show
	"Organizations cannot participate in a battle." : "Организациите не могат да участват в битки.",


// party
	"Info" : "Информация",
	"Members" : "Членове",
	"Orientation" : "Ориентация",
	"Center, Libertarian" : "Централна, Либерална",
	"Center-left, Libertarian" : "Централна-левица, Либерална",
	"Center-right, Libertarian" : "Централна-десница, Либерална",
	"Far-left, Libertarian" : "Левица, Либерална",
	"Far-right, Libertarian" : "Десница, Либерална",
	"Center, Anarchist" : "Централна, Анархистична",
	"Center-left, Anarchist" : "Централна-левица, Анархистична",
	"Center-right, Anarchist" : "Централна-десница, Анархистична",
	"Far-left, Anarchist" : "Левица, Анархистична",
	"Far-right, Anarchist" : "Десница, Анархистична",
	"Center, Authoritarian" : "Централна, Авторитарни",
	"Center-left, Authoritarian" : "Централна-левица, Авторитарни",
	"Center-right, Authoritarian" : "Централна-десница, Авторитарни",
	"Far-left, Authoritarian" : "Левица, Авторитарни",
	"Far-right, Authoritarian" : "Десница, Авторитарни",
	"Center, Totalitarian" : "Централна, Тоталитарни",
	"Center-left, Totalitarian" : "Централна-левица, Тоталитарни",
	"Center-right, Totalitarian" : "Централна-десница, Тоталитарни",
	"Far-left, Totalitarian" : "Левица, Тоталитарни",
	"Far-right, Totalitarian" : "Десница, Тоталитарни",
	"Show all members" : "Покажи всички",
	"Resign" : "Напусни",
	"Accounts" : "Акаунти",
	"Donate Gold" : "Дари Злато",
	"Show all donations" : "Дарителски лист",
	"Elections" : "Избори",
	"Party presidency" : "Партийно председателство",
	"Party President" : "Партиен президент",
	"Show results" : "Покажи резултатите",
	"Show candidate list" : "Покажи кандидатският лист",
	"Show candidates list" : "Покажи кандидатският лист",
	"Candidate" : "Кандитатирай се",
	"Next election in " : "Следващите избори са след ",
	"Next elections in" : "Следващите избори са след ",
	"days" : "дни",
	"candidates" : "кандидати",
	"Congress" : "Парламент",
	"congress members" : "Парламентарни членa",
	"of Congress" : " от Парламента",
	"Show proposed members" : "Arata membrii propu?i",
	"of congress" : "pentru congres",
	"Run for congress" : "Влез в парламента",
	"Country presidency" : "Президент",
	"Winner" : "Победител",
	"Our next candidate" : "Следващият ни кандидат",
	"No candidate proposed" : "Няма предложен",
	"Join" : "Присъедини се",
	"You are not a member of a party" : "Nu sunteti membru al unui partid",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Aveti posibilitatea sa va alaturati unui partid sau puteti crea propriul partid daca nu gase?ti unul potrivit. Fiind un membru al unui partid pute?i sa deveni?i parlamentar sau chiar presedinte.",
	"Join a party" : "Присъединете се към партия",
	"Join party" : "Влез в партия",
	"Run for Congress" : "Кандидатирай се за конгрес",
	"Do you agree to represent your party in the congress election in Northern Basarabia?" : "Sunteti de acord sa reprezinta?i partidul in alegerile pentru Parlament in Basarabia de Nord?",
	"Provide a link to your presentation where you explain why citizens should vote for you in the congressional elections" : "Oferiti un link-ul prezentarii, in cazul in care vre?i sa explica?i ceta?enilor de ce ar trebui sa te voteze la alegerile pentru Parlament",
	"Resign candidacy" : "Свали кандидатура",
	"Edit presentation" : "Редактирай презентация",
	"Edit the link to your presentation where you explain why citizens should vote for you in the Congress elections" : "Editeaza link-ul prezentarii, in cazul in care vre?i sa explica?i ceta?enilor de ce ar trebui sa te voteze la alegerile pentru Parlament",
	"Agree" : "Съгласен",
	"Cancel" : "Откажи",
	"" : "",
	"" : "",
	"" : "",
	"" : "",

// party-members
	"Party page" : "Страница на партия",
	"Party members" : "Членове на партия",
	"Party Member" : "Член на партия",
	"Successfuly transfered 10 item(s) to" : "Успешно прехвърляне на 10 предмета на",

// donate-party
	"Donate" : "Дари",
	"Your account" : "Вашият акаунт",
	"Gold" : " Злато",

// list-party-donations
	"All donations" : "Всички дарения",
	"From" : "От",
	"Gold" : " Злато",
	"Back" : "Назад",

// elections
	"Elections" : "Избори",
	"Next elections" : "Следващи избори",
	"Congress" : "Парламент",
	"No." : "Nr.",
	"Candidate" : "Кандидати",
	"No. of votes" : "Брой гласове",
	"% of votes" : "% гласове",
	"Total votes:" : "Общо гласове:",
	"Presence:" : "Процент:",
	"Election" : "Избори",
	"Presidential elections" : "Президентски избори",
	"Congressional elections" : "Конгресменски избори",
	"Party elections" : "Партийни избори",
	"Parties" : "Партии",
	"Country" : "Държава",
	"Final Results" : "Финални резултати",
	"Member of" : "член на",
	"Presentation" : "Презентация",
        "No presentation" : "Без презентация",
	"supported by 2 parties" : "подкрепен от 2 партий",
	"supported by 3 parties" : "подкрепен от 3 партий",
	"supported by 4 parties" : "подкрепен от 4 партий",
	"supported by 5 parties" : "подкрепен от 5 партий",
	"supported by 6 parties" : "подкрепен от 6 партий",
	"supported by 7 parties" : "подкрепен от 7 партий",
	"supported by 8 parties" : "подкрепен от 8 партий",
	"supported by 9 parties" : "подкрепен от 9 партий",
	"supported by 10 parties" : "подкрепен от 10 партий",
	"All regions" : "Всички региони",
	"No information available" : "Няма информация все още",
	"No data available yet" : "Няма данни все още",

// party-candidates
	"Party candidates" : "Candida?i pentru func?ia de Pre?edinte al partidului",
	"No candidates applied yet" : "Все още няма кандидати",

// propose-congressman
	"Congress member candidates" : "Candida?i pentru func?ia de Parlamentar",
	"Party members can apply for congressional candidature each month between the 16th and 23rd." : " Membrii de partid i?i pot depune candidatura in intervalul 16-23 ale lunii.",
	"Party president should decide the final list each month on the 24th" : " Pre?edintele partidului va decide lista candida?ilor eligibili in data de 24 ale lunii.",
	"Each party can propose a maximum number of 1 candidate per region." : " Fiecare partid poate propune un singur candidat pentru fiecare regiune care face parte din tara.",
	
// presidential-candidates
	"Presidential candidates" : "Candida?i pentru pre?eden?ie",
	"Candidate" : "Кандидатирай се",
	"Supporting parties" : "подкрепящи партии",

// my-places/newspaper
	"My places > Newspaper" : "Вестник",
	"Newspapers" : "Вестници",
	"You do not have a newspaper" : "Вие нямате вестник",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Un ziar este un mod eficient de a comunica o ?tire in eRepublik. Crea?i-va propriul ziar.",
	"Create new" : "Създай вестник",

// create-newspaper
	"Create newspaper" : "Създай вестник",
	"Requirements" : "Изисквания",
	"Newspaper details" : "Детайли на вестника",
	"Newspaper name" : "Име",
	"6-30 characters max" : "макс. символи 6-30",
	"Newspaper Avatar" : "Аватар на вестника",
	"only JPG files allowed" : "Позволени са само .JPG",

// newspaper
	"Write article" : "Напиши статия",
	"Edit newspaper details" : "Редакт. Вестник",
	"Edit" : "Редакт.",
	"Delete" : "Изтрий",
	"read more" : "виж още",
	"ShareThis" : "СподелиТова",
	"Report abuse" : "Нередност",

// write-article
	"Title" : "Заглавие",
	"Article" : "Статия",
	"Picture" : "Снимка",
	"Publish" : "Публикувай",
	"1-80 characters max" : "макс. символи 1-80",

// edit-newspaper
	"6-25 characters max" : "maxim 6-25 cuvinte",
	"Change the location of your newspaper" : "Schimba ?ara in care publica acest ziar.",
	"Newspaper logo" : "Sigla ziar",
	"Send a message to us via the" : "Trimite un mesaj catre ",
	"if you want to transfer your newspaper to another organization or citizen, please understand that it may take a few days" : " daca dori?i sa transfera?i ziarul catre o alta organiza?ie sau un alt ceta?ean. Opera?iunea va dura cateva zile.",

// messages/inbox
	"Inbox" : "Получени",
	"Delete" : "Изтрий",

// messages/outbox
	"Sent" : "Изпратени",
	"Sent messages" : "Изпратени съобщения",

// messages/alerts
	"Alerts" : "Аларми",

// messages/subscribes
	"Subscriptions" : "Абонаменти",
	"new article" : "нова статия",
	"Select all" : "Избери всички",
	"Unsubscribe" : "Отабонирай се",
	"Newer" : "Нова",
	"Older" : "Стара",
	"Weekly news" : "Седмични новини",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik" : "Saptamanal va vor fi prezentate: ?tirile de top, Razboaiele active, Evenimentele militare ?i primele 5 ?ari din eRepublik. ",
	"show example" : "arata exemplu",
	"Turn ON" : "ВКЛЮЧИ",
	"Turn OFF" : "ИЗКЛЮЧИ",
	"one hour ago" : "преди 1 час",

// article
	"Unsubscribe" : "От абонирай се",
	"Subscribe" : "Абонирай се",
	"Vote" : "Глас",
	"View all comments" : "Всички коментари",
	"Subscribe to comments" : "Абонирай се за коментарите",
	"Unsubscribe to comments" : "От абонирай се за коментарите",
        "Your comment" : "Вашият коментар",
	"Post a comment" : "Пусни коментар",

	//country
	"Rank" : "Ранк",
	"Society" : "Социална",
	"Economy" : "Икономическа",
	"Politics" : "Политическа",
	"Military" : "Военна",
	"Administration" : "Администрация",
	"On the Map" : "На картата",
	"Total citizens" : "Общо граждани",
	"New citizens today" : "Нови граждани днес",
	"Citizenship requests" : "Заявки за гражданство",
	"View requests" : "Виж заявки",
	"Average citizen level" : "Средно гражданско ниво",
	"Online now": "Онлайн сега",
	"Citizens" : "Граждани",
	"Who" : "Кой",
	"Citizen fee" : "Taxa ceta?ean nou",

// citizenship/applications
	"Citizenship applications" : "Aplica?ie pentru acordarea ceta?eniei",
	"Pending" : "Examinare",
	"Approved" : "Приета",
	"Citizen" : "Гражданин",
	"Details" : "Детайли",
	"Resident since:" : "Rezident la data de: ",
	"Expires:" : "Изтича: ",
	"Approved on" : "Приета на:",
	"Approved by" : "Приета от:",
	"There are no pending citizenship applications." : "Nu sunt in curs cereri de cetatenie",
	"There aren't any approved citizenship applications." : "Nu exista nici o cerere aprobata de cetatenie.",

//country/economy
	"Treasury" : "Хазна",
	"All accounts" : "Всички акаунти",
	"GOLD" : " ЗЛАТО",
	"Gold" : " Злато",
	"Country trading embargoes" : "Държавно ембарго",
	"This country can trade with any other country in eRepublik." : "Aceasta ?ara poate face comer? cu orice alta ?ara din eRepublik.",
	"Import Tax" : "Taxa importuri",
	"Income Tax" : "Taxa venituri",
	"VAT" : "ДДС",
	"Taxes" : "Taxe",
	"food" : "храна",
	"Food" : "Храна",
	"gift" : "подарък",
	"Gift" : "Подарък",
	"weapon" : "оръжие",
	"Weapon" : "Оръжие",
	"moving tickets" : "билети",
	"Moving tickets" : "Билети",
	"Moving Tickets" : "Билети",
	"grain" : "жито",
	"Grain" : "Жито",
	"diamonds" : "диаманти",
	"Diamonds" : "Диаманти",
	"iron" : "желязо",
	"Iron" : "Желязо",
	"oil"  : "нефт",
	"Oil"  : "Нефт",
	"wood" : "дърво",
	"Wood" : "Дърво",
	"house" : "къща",
	"House" : "Къща",
	"hospital" : "болница",
	"Hospital" : "Болница",
	"defense system" : "система за защита",
	"Defense system" : "Система за защита",
	"Defense System" : "Система за защита",
	"Salary" : "Заплата",
	"Minimum" : "Минимум",
	"Average" : "Средна",
	"Productivity" : "Productivitate",
	"Gross domestic product (GDP)" : "Produsul intern brut (PIB)",
	"Monthly exports" : "Exporturi lunare",
	"Monthly imports" : "Importuri lunare",
	"Inflation" : "Инфлация",

// region
	"Country - Society" : "Tara - Societate",
        "Heal" : "Лечение",
	"You received 50 wellness from hospital." : "В болницата ви изклекуваха със 50.",
	"You received 40 wellness from hospital." : "В болницата ви изклекуваха със 40.",
	"You received 30 wellness from hospital." : "В болницата ви изклекуваха със 30.",
	"You received 20 wellness from hospital." : "В болницата ви изклекуваха със 20.",
	"You received 10 wellness from hospital." : "В болницата ви изклекуваха със 10.",
	"Constructions": "Конструкции",
	"Population": "Popula?ie",
	"Citizens" : " Граждани",
	"Productivity" : "Productivitate",
	"Resistance War" : "Razboi de rezisten?a",
	"Resistance War Active" : "Razboi de rezisten?a activ",
	"Start a Resistance War" : "Porne?te un razboi de rezisten?a",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Nu se poate porni un razboi de rezisten?a, in aceasta regiune, pentru ca deja apar?ine ?arii sale originale.",
	"Medium" : "Nivel Mediu",
	"High": "Nivel Ridicat",
	"Neighbors" : "Съседи",
	
	"Vidin" : "Видин",
	"Macedonia" : "Македония",
        "Sofia" : "София",
        "Burgas" : "Бургас",
        "Varna" : "Варна",
	"Ruse" : "Русе",
	"Plovdiv" : "Пловдив",
	"Southern Basarabia" : "Basarabia de Sud",

// country/politics
	"President" : "Президент",
	"Election results" : "Резултати",

// country/military
	"There are no resistance wars in this country." : "Nu exista razboaie de rezisten?a in aceasta ?ara.",
	"All resistance wars" : "Toate razboaiele de rezisten?a",
	"Alliances" : "Alian?e",
	"All Alliances" : "Toate Alian?ele",
	"Military force" : "For?a militara",
	"Average strength" : "Media for?ei militare",

//country-administration
	"You are not a president or a congress member in this country." : "Nu e?ti Parlamentar sau Pre?edinte in aceasta ?ara",
	"Hello, Mr. President" : "Искате ли чай, Г-н Президент?",
	"Propose a law" : "Предложи закон",
	"Message to new citizens" : "Съобщение до новите граждани",
	"Buy buildings" : "Купи сгради",
	"Declare war" : "Обяви война",
	"Trading Embargoes" : "Embargou comercial",
	"Propose" : "Propune",
	"Debate location (optional)" : "Dezbatere publica (op?ional)",
	"Please select a country" : "Te rog selecteaza o ?ara",
	"Law proposals" : "Предложения",
	"Accepted" : "Приет",
	"Rejected" : "Отхвърлен",
	"Pending" : "Examinare",
	"Tax change: Food" : "Данъчни промени: Храна",
	"Tax change: Grain" : "Данъчни промени: Жито",
	"Tax change: Gift" : "Данъчни промени: Подарък",
	"Tax change: Weapon" : "Данъчни промени: Оръжие",
	"Tax change: House" : "Данъчни промени: Къща",
	"Tax change: Wood" : "Данъчни промени: Дърво",
	"Tax change: Oil" : "Данъчни промени: Нефт",
	"Tax change: Hospital" : "Данъчни промени: Болница",
	"Tax change: Iron" : "Данъчни промени: Желязо",
	"Tax change: Diamonds" : "Данъчни промени: Диамант",
	"Tax change: Defense System" : "Данъчни промени: Sistem de aparare",
	"Tax change: Moving Tickets" : "Данъчни промени: Билет",
	"President Impeachment" : "Сваляне на президента",
	"New Citizen Message" : "Mesaj pentru noii ceta?eni",
	"Alliance" : "Алианс",
	"Buy Constructions" : "Купи конструкции",
	"New Citizen Fee" : "Bonus pentru noii ceta?eni",
	"Issue Money" : "Обмяна на пари",
	"Law proposals" : "Propunere de lege",
	"Minimum Wage" : "Минимална Заплата",
	"Mutual Protection Pact" : "Pact de non-agresiune",
	"Peace Proposal" : "Покана за Мир",

// law
	"Country Administration" : "Държавна администрация",
	"Proposed by" : "Предложено от ",
	"Debate Area" : "Дебати",
	"Yes" : "ДА",
	"No" : "НЕ",
	"REJECTED" : "ОТКАЗАН",
	"ACCEPTED" : "ПРИЕТ",
	"PENDING" : "ПРЕДСТОЯЩ",
	"The law voting process takes 24 hours." : "Гласуването на закона отнема 24 часа.",
	"Only congress members and country presidents have the right to vote." : "Numai membrii Parlamentului ?i Pre?edintele au drept de vot.",
	"For this law to be considered accepted it needs 66% of the Congress votes." : "Pentru a fi acceptata aceasta lege, trebuie sa voteze pozitiv 66% din votan?i.",
	"Show all law proposals" : "Vezi toate propunerile",
	"Buy Constructions: Hospital" : "Cumpara construc?ie: Spital",
	"Buy Constructions: Defense System" : "Cumpara construc?ie: Sistem de aparare",
	"New" : "Ново",
	"Old" : "Старо ",
	"Value added tax (VAT)" : "Данък Добавена Стойност (ДДС)",
	"Import Tax" : "ДДС ВНОС",
	"Income Tax" : "Данък на Общ Доход",
	"hours ago" : "часа преди",
        "minutes ago" : "минути преди",

// my-places/organizations
	"My places > Organizations" : "Организации",
	"My Organizations" : "Моите Организации",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Pentru a intra pe contul organiza?iei, trebuie sa ie?iti din contul dvs. de cetatean ?i sa va conecta?i pe contul organiza?iei dumneavoastre.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization." : "In cazul in care contul dvs. reprezinta o organiza?ie (SO), creat in versiune beta eRepublik, va rugam sa ne trimite?i un mesaj folosind formularul de contact (categoria: Altele), astfel incat sa il putem schimba oficial intr-o organiza?ie",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned." : "Dupa 5 decembrie 2008 toate SO ce nu sunt transferate in organiza?ii vor fi considerate conturi false ?i vor fi interzise.",
	"Logout" : "Изход",
	"Organizations created by you:" : "Organiza?ii create de tine:",

// organization/register
	"Organization details" : "Детайли на организацията",
	"Organization name" : "Име на организация ",
	"Your email address:" : "Имейл:",
	"Password" : "Парола",
	"Retype password" : "Въведи парола пак",
	"eRepublik region" : "Регион",
	"Organization logo" : "Лого",
	"Complete the challenge:" : "Довърши",

// market
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Materia prima poate fi cumparata de compania sau de organiza?ia cu domiciliul in ?ara de desfacere a materiei prime.",
	"Quality Level" : "Качество",
	"All levels" : "Всички нива",
	"Level 1" : "Ниво 1",
	"Level 2" : "Ниво 2",
	"Level 3" : "Ниво 3",
	"Level 4" : "Ниво 4",
	"Level 5" : "Ниво 5",
	"Market" : "Пазар",
	"Provider" : "Провайдер",
	"Quality" : "Качество",
	"Stock" : "Стока",
	"Buy" : "Купи",
	"You specified an incorrect amount of products you wish to buy." : "Ai specificat o suma incorecta de produse pe care dori?i sa le cumpara?i.",
	"Not enough money in your account." : "Недостатъчно пари във вашият акаунт.",
	"No products in this market" : "Nu exista produse pe aceasta pia?a",
	"Purchase Currency" : "Купи валута",
	"Please select an Industry to see the marketplace offers" : "Моля изберете индустрия",

// exchange
	"GOLD" : " ЗЛАТО",
	"Sell" : "Продай",
	"Monetary Market" : "Валутен пазар",
	"Show my offers" : "Моите оферти",
	"Post new offer" : "Нова оферта",
	"You haven't posted any currency exchange offer yet." : "Nu ai postat nici o oferta de schimb.",
	"Provider" : "Producator",
	"Amount" : "Количество",
	"Exchange rate" : "Rata de schimb",
	"Amount to buy" : "Cantitate de cumparat",
	"Rec exchange rate" : "Rata de schimb recomandata",

// career-path
	"A taste of what you can do in eRepublik" : "Ce pute?i face in eRepublik func?ie de nivelul experien?ei acumulate",
	"Unlock Features" : "Отключи",
	"Continue" : "Продължи",

// human-resources
	"Minimum skill" : "Мин. скил",
	"Apply" : "Приеми",
	"Skill level" : "Nivel indemanare",
	"All skills" : "Всички скилове",
	"You are already an employee. To get this job please quit your current job." : "Sunte?i deja angajat. Pentru a aplica pentru acest loc de munca, trebuie sa demisiona?i de la actualul loc de munca.",
	"There are no job offers matching the selected criteria." : "Nu s-a gasit nici un loc de munca dupa criteriul selectat",
	
// get-gold/gold
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : "AURUL este principalul punct de referinta pentru toate monedele din eRepublik ?i este utilizat pentru a cumpara facilita?i suplimentare in eRepublik.",
	"Select amount" : "Selecta?i suma",
	"You can buy Gold only once every 7 days, in order to avoid Gold inflation. " : "Pute?i cumpara aur numai o data la fiecare 7 zile, pentru a evita infla?ia.",
	"Therefore, be sure to get the appropriate pack to suite your needs for a whole week." : " De aceea, asigura?i-va ca suma dorita de dumneavoastra va ajunge pentru o saptamana intreaga.",
	"You can buy Gold only once every 7 days, in order to avoid Gold inflation. Therefore, be sure to get the appropriate pack to suite your needs for a whole week." : "AS",
	"from" : "pentru",
	"Buy now" : "Cumpara acum",
	"Go to eRepublik" : "Spre eRepublik",
	"Payments can be done in USD as well." : "Plata se poate face in dolari SUA, de asemenea.",
	"I have read and agree with the" : "Am citit si sunt de acord cu",
	"Terms of Service" : "Termenii serviciului",
	"You must read and agree with the Terms of service in order to complete your order." : "Trebuie sa cititi si sa fiti de acord cu termenii serviciului oferit inainte de a finaliza comanda.",

// invite-friends	
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Вие ще получите 5 Злато за всеки поканен от Вас гражданин , който достигне 6 левъл.",
	"Your personal invitation link" : "Legatura pentru invitatie",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that register using your personal link will get you 5 Gold when they reach level 6." : "Posteaza aceast link pe forumuri, bloguri, messenger sau trimite-l prin e-mail. Cand persoanele care se inregistreaza folosind link-ul ?i ajung la nivelul 6, dumneavoasta ve?i primi automat ca bonus 5 AUR.",
	"Send email invite" : "Trimite invitatie prin mail",
	"Due to the high number of abusers, we've limited the number of email invitations to 2,000. However, this limit doesn't apply to the personal invitation link, please feel free to use it instead." : "Avand in vedere numarul mare de abuzuri, ne-am limitat numarul de invita?ii la 2000/e-mail. Cu toate acestea, aceasta limita nu se aplica la invita?ia prin link-ul personal, va rugam sa nu ezita?i sa-l utiliza?i.",
	"Your name:" : "Вашето име",
	"Add contacts:" : "Добави контакти",
	"Add from address book" : "Добави от адресната книга",
	"Invitations left:" : "Останали покани: ",
	"Send invitation" : "Изпрати покана ",
	"Invites status" : "Статус на поканите",
	"View the status of your invites and bonuses" : "Vizualiza?i starea invita?iilor ?i a bonusurilor",
	"Track invites" : "Проследи поканите",
	"" : "",

// invites/-1/created_at/1
	"If an invite has not been received, you may want to consider the following:" : "In cazul in care o invita?ie nu a fost primita, ar trebui sa lua?i in considerare urmatoarele:",
	"Track Invites" : "Проследи покани",
	"All invites" : "Всички покани",
	"Accepted invites" : "Приети покани",
	"Pending invites" : "Неприети покани",
	"Not yet a citizen" : "Все още не е гражданин",
	"Status" : "Статус",
	"Invites" : "Покани",
	"Date sent" : "Дата на изпращане",
	"Experience level" : "Ниво на експириенс",
	"Provide them with your personal invitation link, you can send it by email/messenger or other method" : "Поканете ги чрез вашият персонален линк , може да го изпратите чрез имеил/месенджър или друг метод",
	"Make sure your friend checks their spam folder" : "Подсигурете се , че вашите приятели ще погледнат и папка СПАМ",
	"If you’ve sent an invitation to a Yahoo! email address, please note that we are currently experiencing difficulties with Yahoo! email delivery" : "In cazul re?elei de mail Yahoo s-a observat ca pot apare probleme in livrarea email-ului",
	
// rss_menu
	"Badges" : "Емблеми",
	"Size" : "Размер",
	
// ambassador-program/
	"Translation and proofing of copy" : "Traducerea si proofing de copie",
	
// advertise
	"Advertise" : "Рекламирай",
	"1. Create your ad" : "Създай своята реклама.",
	"Easily create your ad - no design or coding skills needed." : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",
	"" : "",

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 приятели ";
regexps["^(\\d*) Citizens$"] = "$1 граждани ";
regexps["^Active wars in (.*)$"] = "Активни битки в $1";
regexps["^Active resistance wars in (.*)$"] = "Razboaie de rezisten?a active in $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Expira in $2 zile";
regexps["^(\\d*) comments$"] = "$1 коментара";
regexps["^(\\d*) hours ago$"] = "преди $1 часа";
regexps["^(\\d*) minutes ago$"] = "преди $1 минути";
regexps["^(\\d*) days ago$"] = "преди $1 дена";
regexps["^Regions \\((\\d*)\\)"] = "Региони ($1)";
regexps["^show all accounts \\((\\d*)\\)"] = "Покажи всички акаунти ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Приятели ($1)";
regexps["^(\\d*) months ago"] = "преди $1 месеца";
regexps["^Comments(.*)"] = "Коментари $1";
regexps["^Salary(.*)"] = "Заплата $1";
regexps["^(\\d*) candidates$"] = "$1 кандидата";
regexps["^(\\d*) days$"] = "$1 дена";
regexps["^(\\d*) GOLD$"] = "$1 ЗЛАТО";
regexps["^(\\d*) Gold$"] = "$1 Злато";
regexps["^Official candidates(.*)"] = "Официални кандидати $1";
regexps["^Wildcards(.*)"] = "Candida?ii de rezerva $1";
regexps["^Not qualified(.*)"] = "Nu s-au calificat $1";
regexps["^show all accounts(.*)"] = "Покажи всички акаунти $1";
regexps["^(\\d*) RURAL AREA$"] = "$1 SATE";
regexps["^Week(.*)"] = "Седмица $1";
regexps["^Profit/loss: (.*)"] = "Profit/Pierderi: $1";


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