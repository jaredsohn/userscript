// ==UserScript==
// @name           еРепублика на Српском језику
// @description    Превод на еРепублика
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Почетна",
	"Donate" : "Донирај",
	"May" : "Мај",
	"June" : "Јуни",
	"July" : "Јули",
	"Day" : "Дан ",
	"Day " : "Дан ",
	"of the New World" : " од новог света",
	"Rank"   : "Ранг",
	"Company" : "Фирма", 
	"Profile" : "Профил", 
	"Party" : "Партија", 
	"Newspaper" : "Новине",
	"Army" : "Војска",
	"Country administration" : "Држава",
        "Organizations" : "Организација",
        "Advertising Department" : "Рекламирање",
	"Market" : "Маркет",
	"Monetary market" : "Мењачница",
	"Job market" : "Берза послова",
        "Companies for sale" : "Фирме на продају",
        "Get Gold &amp Extras" : "Купи злато и остало",
	"Rankings" : "Рангирања",
	"Social stats" : "Социјална статистика",
	"Economic stats" : "Економска статистка",
	"Political stats" : "Политичка статистика",
	"Military stats" : "Војна статистика",
	"Tutorials" : "Туторијали",
	"Tools" : "Алати",
	"Forum" : "Форум",
	"News" : "Вести",
	"Invite friends" : "Позови пријатеље",
	"eRepublik Shop" : "eRepublik продавница",
	"Career path" : "Каријера",
	"Ok, thanks, next tip" : "Уреду, хвала, сведећи",
	"I have nothing more to say at the moment" : "Немам ништа рећи тренутно.",
	"Select" : "Одабери",
	"Top rated news" : "Најчитаније вести",
	"Latest news" : "Последње вести",
        "Latest events" : "Последни настани",
		"News" : "Вести",
        "More events" : "још новости",
        "more events" : "још новости",
        "More news" : "још вести",
		"more news" : "још вести",
	"Marketplace" : "Маркет",
	"Wars" : "Ратови",
        "My Places" : "Моја места",
        "Info" : "Инфо",
        "Community" : "Заједница",
        "Day of the new world" : "Дан од новог света",
        "National" : "Национални",
        "International" : "Међународни",
		"Latest Events" : "Последње новости",
        "Shouts" : "Изјавe",
        "Shout" : "Изјави",
        "Official" : "Службени",
        "Everyone" : "Сви",
        "Latest" : "Последњи",
        "Search citizen" : "Тражи играча",
	"Shout" : "Изјава",
	"Latest" : "Последњи",
	"one minute ago" : "пре један минут",
	" for 10 shouts/day and more" : "",
	"for 10 shouts/day and more" : "",
	"No more shouts for today" : "Нема више изјава за данас ",
	"Top rated" : "Најчитанији",
	"Go to next page" : "Иди на следећу страницу",
	"Experience points" : "XP",
	"Name" : "Име",
	"Companies" : "Фирме",
	"Newspapers" : "Новине",
	"Countries" : "Државе",
	"Parties" : "Партије",


// country page
	"On the Map" : "Мапа",
	"Total citizens" : "Број становника",
	"New citizens today" : "Нових становника данас",
	"Average citizen level" : "Просечан ниво",
	"Online now": "Тренутно онлајн",
	"Citizen fee" : "Приступница за нове играче",
	"Citizens" : "Становништво",
	"Who" : "Који",
	"details" : "Детаљи",
	"Society" : "Уопштено",
	"Economy" : "Економија",
	"Politics" : "Политика",
	"Military" : "Војска",
	"Administration" : "Администрација",
	
// countries
	"Argentina" : "Аргентина",
	"Australia" : "Аустралија",
	"Austria" : "Аустрија",
	"Belgium" : "Белгија",
	"Bolivia" : "Боливија",
	"Bosnia and Herzegovina" : "Босна и Херцеговина",
	"Brazil" : "Бразил",
	"Bulgaria" : "Бугарска",
	"Chile" : "Чиле",
	"China" : "Кина",
	"Colombia" : "Колумбија",
	"Croatia" : "Хрватска",
	"Canada" : "Канада",
	"Czech Republic" : "Република Чешка",
	"Denmark" : "Данска",
	"Estonia" : "Естонија",
	"Finland" : "Финска",
	"France" : "Француска",
	"Germany" : "Немачка",
	"Greece" : "Грчка",
	"Hungary" : "Мађарска",
	"India" : "Индија",
	"Indonesia" : "Индонезија",
	"Ireland" : "Ирска",
	"Israel" : "Израел",
	"Italy" : "Италија",
	"Iran" : "Иран",
	"Japan" : "Јапан",
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
	"Poland" : "Пољска",
	"Portugal" : "Португалија",
	"Romania" : "Румунија",
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
	"Ukraine" : "Украјина",
	"Uruguay" : "Уругвај",
	"USA" : "САД",
	"Turkey" : "Турска",
	"Venezuela" : "Венецуела",
	"World" : "Свет",
	"All countries" : "Све државе",
// economy
	"GOLD" : "ЗЛАТО",
	"Gold" : "Злато",
	"Treasury" : "Државна благајна",
	"All accounts" : "Сви рачуни",
	"Country trading embargoes" : "Трговински ембарго",
	"This country can trade with any other country in eRepublik." : "Ова држава може да тргује са свим осталим државама на еРепублици.",
	"Income Tax" : "Порез на приход",
	"Import Tax" : "Порез на увоз",
	"VAT" : "ДДВ",
	"Taxes" : "Порези",
	"food" : "храна",
	"gift" : "поклони",
	"weapon" : "оружје",
	"moving tickets" : "авионске карте",
	"grain" : "жито",
	"diamonds" : "дијаманти",
	"iron" : "гвожђе",
	"oil"  : "нафта",
	"wood" : "дрва",
	"house" : "куће",
	"hospital" : "болница",
	"defense system" : "одбрамбени систем",
	"Defense system" : "Одбрамбени систем",


	"Salary" : "Плата",
	"Minimum" : "Минимална",
	"Average" : "Просечна",

	"Gross domestic product (GDP)" : "Бруто домаћи производ (БДП)",
	"Monthly exports" : "Месечни извоз",
	"Monthly imports" : "Месечни увоз",
	"Inflation" : "Инфлација",
// company
	"Office" : "Канцеларија",
	"You have already worked today." : "Данас си радио.",
	"Come back tomorrow." : "Врати се сутра.",
	"Resign" : "Дај отказ",
	"Employees" : "Радници",
	"Raw materials" : "Сировине",
	"Show all employees" : "Сви радници",
	"Show all donations" : "Прикажи све донације",
	"Go to marketplace" : "Посети маркет",
	"Products" : "Производи",
	"The company cannot trade with this country due to a trade embargo." : "Не можете трговати са овом државом зато што постоји трговински ембарго.",
	"Jobs available in this company" : "Слободна радна места у овој фирми",
	"Minimum Skill" : "Минималан ниво",
	"You do not have any active job offers" : "Немате ниједну понуду за посао",
	"Apply" : "Пријави се",
	"The company offers no products in this market" : "Фирма не нуди производе у маркету",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Price with taxes" : "Цена са порезом",
	"Company page" : "Страна фирме",
	"Today" : "Данас",
	"Yesterday" : "Сутра",
	"All employees" : "Сви радници",
	"Skill" : "Скил",
	"Daily salary" : "Плата",
	"Last presence" : "Последње присуство",
	"Minimum country wage :" : "Минималац : ",

	"Grain" : "Жито",
	"Food" : "Храна",
	"Gift" : "Поклони",
	"Weapon" : "Оружје",
	"Moving Tickets" : "Авионске карте",
	"Diamonds" : "Дијаманти",
	"Iron" : "Гвожђе",
	"Oil"  : "Нафта",
	"Wood" : "Дрва",
	"House" : "Куће",
	"Hospital" : "Болница",
	"Defense System" : "Одбранбен систем",
	"All industries" : "Све индустрије",
	"Country" : "Држава",
	"Create new company" : "Направи нову компанију",


// market
	"Quality Level" : "Квалитет",
	"All levels" : "Сви нивои",
	"Level 1" : "Ниво 1",
	"Level 2" : "Ниво 2",
	"Level 3" : "Ниво 3",
	"Level 4" : "Ниво 4",
	"Level 5" : "Ниво 5",

	"Provider" : "Нуди",
	"Quality" : "Квалитет",
	"Stock" : "Залиха",
	"Buy" : "Купи",
	"Market" : "Маркет",

	"Market offers" : "Понуде",
	"Amount" : "Количина",
	"Price" : "Цена",
	"Next" : "Следеће",
	"Prev" : "Назад",
	"No products in this market" : "Нема понуда у овом маркету",
	"Go to marketplace" : "Посети маркет",
	"Jobs available in this company" : "Слободна радна места у овој компанији",
	"You don't have any active job offers" : "Нема слободних радних места",
	"You didn't specify the amount of products you wish to buy" : 
		"Нисте навели количуну производа који желите да купите",
	"You cannot trade with this country as you are at war with it" :
		"Не можете да тргујете са државом против које сте у рату",


// job market
	"Industry" : "Индустрија",
	"Minimum skill" : "Скил",


// region
	"Citizens" : "Становништво",
	"Country - Society" : "Држава - Уопштено",
        "Heal" : "Излечи се",
	"Constructions": "Грађевине",
	"Population": "Популација",
	"Productivity" : "Продуктивност",
	"Resistance War" : "Револуција",
	"Resistance War Active" : "Активна револуција",
	"You can't start a resistance war in this region because it already belongs to its original owner  country" : "Не можеш да започнеш револуцију зато што регион припада матичној држави",
	"Medium" : "Средње",
	"High": "Високо",
	"Neighbors" : "Суседи",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Избери индустрију за коју желиш да видиш понуде",
	"Skill Level" : "Скил",
	"All skills" : "Сви скилови",
	"All" : "Све",
// politics
	"Country Administration" : "Државна администрација",
	"Accepted" : "Изгласано",
	"Rejected" : "Одбијено",
	"Pending" : "Гласа се",
	"Congress" : "Народна скупштина",
	"Issue Money" : "Додели новац",
	"Law proposals" : "Предлог-закона",
	"Minimum Wage" : "Минималац",
	"Mutual Protection Pact" : "Договор о међусобној заштити",
	"Alliance" : "Савез",
	"New Citizen Fee" : "Приступница за нове становнике",
	"Peace Proposal" : "Предлог мировног споразума",
	"President" : "Председник",
	"Yes" : "Да",
	"No" : "Не",
	"Show all law proposals" : "Прикажи све предлог-законе",
	"The law voting process takes 24 hours." : "Гласање траје 24 часа.",
	"Only congress members and country presidents have the right to vote." : "Право гласа имају само председиник државе и народни посланици.",
	"You are not a president or a congress member in this country." : "Ниси председник нити посланик у овој држави.",
// wars
	"no allies" : "нема савезника",
	"All wars" : "Сви ратови",
	"Active resistance wars in " : "Активни ратови у",
	"All resistance wars" : "Све револуције",
	"All Alliances" : "Сви савезници",
	"Alliances" : "Савези",
	"Military force" : "Војна сила",
	"Average strength" : "Просечна сила",
	"War > Battlefield" : "Рат > Битка",
	"Basic damage" : "Основна штета",
	"Weapon quality" : "Квалитет оружја",
	"Wellness" : "Здравље",
	"Rank" : "Чин",
	"Total damage" : "Укупна штета",
	
// army
	"You have trained today. You can train again tomorrow." : "Данас си тренирао. Врати се сутра.",
	"Force" : "Сила",
	"Military rank" : "Војни чин",
	"Military achievements" : "Војни успеси",
	"Active wars list" : "Листа активних ратова",
	"Field Marshall" : "Фелдмаршал",
	"General" : "Генерал",
	"Colonel" : "Пуковник",
	"Captain" : "Капетан",
	"Lieutenant" : "Поручник",
	"Sergeant" : "Водник",
	"Corporal" : "Десетар",
	"Private" : "Војник",
	"Show active wars" : "Прикажи активне ратове",
	"Start a Resistance War" : "Започни револуција",
	"You do not have the necessary amount of Gold to start a resistance war." : "Немаш довољно злата да започнеш револуцију.",
	"You cannot join this fight because your country is not involved in the war" : "Не можеш да се бориш зато што твоја држава не учествује у рату.",
	"There are no resistance wars in this country." : "Нема револуција у овој држави.",
	"until the region can be occupied or secured" : "све док регион не буде окупиран или сачуван",
	"Attackable on President's decision" : "Може бити нападнут са одлуком председника",
	"Defense Points" : "Одбрамбени поени",
	"Go to Battlefield" : "Бори се овде",
	"started on" : "започета на",
	"see finished battles" : "листа завршених битака",
	"show finished battles" : "прикажи завршене битке",
	"fights" : " битке",
	"Still active" : "Још увек активне",
	"Wars list" : "Листа ратова",
	"War" : "Рат",
	"Battle history" : "Историја битке",
	"Fight" : "Бори се",
	"Hero" : "Херој",
	"Started by" : "Започета од ",
	"started by" : "започета од ",
	"active battles" : "активне битке",
	"Fight for resistance" : "Бори се за отпор",
	"Fight for defenders" : "Бори се за браниоце",
// party
	"Get more" : "Још",
	"Country presidency" : "Председник државе",
	"Winner" : "Победник",
	"Next election in" : "Следећи избори за",
	"Next elections in" : "Следећи избори за",
	"No candidate proposed" : "Нема пријављених кандидата",
	"candidates" : "кандидати",
	"Candidate" : "Кандидат",
	"days" : "дана",
	"GOLD" : "злато",
	"Show results" : "Прикажи резултате",
	"Show candidate list" : "Прикажи листу кандидата",
	"Show candidates list" : "Прикажи листу кандидата",
	"You are not a member of a party" : "Ниси члан партије",
	"Join a party" : "Учлани се",
	"You can join a party from it's presentation page or you can create your own party if you cannot  find the right one for you. Being a member of a party could give you the chance to become a Congress Member  or even the President." : "Можеш да се учланиш у неку партију преко њене странице или да  оснујеш нову партију. Чланство у партији може да ти омогући да будеш посланик или Председник.",
	"Create new" : "Основај нову",
	"congress members" : "Народни посланици",
	"of Congress" : "Парламент",
	"Show proposed members of congress" : "Прикажи предложене кандидате за посланике",
	"Run for congress" : "Кандидуј се за посланика",
	"Join" : "Учлани се",
	"See all members" : "Прикажи све чланове",
	"Donate Gold" : "Донирај злато",
	"Members"  : "Чланови",
	"Orientation" : "Оријентација",
	"Show all members" : "Прикажи све чланове",

	"Center" : "Центар",
	"Anarchist" : "Анархисти",
	"Accounts" : "Рачуни",
	"Elections" : "Избори",
	"Election results" : "Резултати избора",
	"Next elections" : "Следећи избори",

	"Country Presidency" : "Председник државе",
	"Party presidency" : "Председник партије",
	"Party President" : "Председник партије",
	"See results" : "Види резултате",
	"Expires tomorrow" : "Истиче сутра",
	"No. of votes" : "Број гласова",
	"% of votes" : "% од гласова",
	"No data available yet" : "Нема доступних података",
	"Total votes" : "Укупно гласова: ",
	"Presence" : "Присуство: ",
	"Election" : "Избори",
	"Presidential elections" : "Председнички",
	"Congressional elections" : "Парламентарни",
	"Party elections" : "Партијски",
	"Month/Year" : "Месец/година",


// articles
	"Report abuse" : "Пријави злоупотребу",
	"today" : "данес",
	"yesterday" : "сутра",
	"one hour ago" : "пре један сат",
	"Unsubscribe" : "Поништи претплату",
	"Subscribe" : "Претплати се",
	"Article RSS" : "RSS-ови",
	"Your comment" : "Твој коментар",
	"View all comments" : "Прикажи све коментаре",
	"Subscribe to comments" : "Претплати се на коментаре",
	"Unsubscribe to comments" : "Поништи претплату за коментаре",
	"Post a comment" : "Остави коментар",


// news
	"You do not have a newspaper" : "Немаш ниједан чланак",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the  eRepublik Wiki. Create your own newspaper." : "Новине су ефикасан начин за комуницирају на еРепублик свету. Прочитај више на еРепублика Вики. Направи своје новине.",


// profiles
	"Send message" : "Пошаљи поруку",
	"Remove friend" : "Обриши пријатеља",
	"Offer a gift" : "Пошаљи поклон",
	"Friends" : "Пријатељи",
	"Fights" : "Борбе",
	"National Rank" : "Национални ранг",
	"Forfeit Points" : "Казнени поени",
	"ShareThis" : "Подели",
	"Assets" : "Посед",
	"Press director" : "Главни уредник",
	"Inventory" : "Залихе",
	"Get Gold" : "Купи злато",
	"Career" : "Каријера",
	"Bio" : "Биографија",
	"Employee" : "Ради у",
	"No political activity" : "Није члан партије",
	"Wellness" : "Здравље",
	"Level" : "Ниво",
	"xp points" : "поени",
	"Strength" : "Сила",
	"Experience" : "Искуство",
	"Skills" : "Скил",
	"Land" : "Ленд",
	"Manufacturing" : "Мануфактуринг",
	"eRepublik Birthday" : "Дан учлањења",
	"Get Extra Storage" : "Још простора",
	"Party Member" : "Член партије",
	"No activity" : "Нема новине",
	"Total damage:" : "Укупна штета:",
	"Hard Worker" : "Вредан радник",
	"Work for 30 days in a row" : "Посао за 30 дана за редом",
	"Congress Member" : "Народни посланик",
	"Country President" : "Председник државе",
	"Win the Presidential elections" : "Победник на председничким изборима",
	"Media Mogul" : "Медији",
	"Reach 1000 subscribers to your newspaper" : "Укупно 1000 претплата на твоје новине",
	"Battle Hero" : "Херој",
	"Reach the highest total damage in one battle" : "Нанеси највећу штету у битци",
	"Resistance Hero" : "Херој отпора",
	"Start a resistance war and liberate that region" : "Започни револуцију и ослободи регион",
	"Super Soldier" : "Супер војник",
	"Advanced 5 strength levels" : "Напредан ниво јачине 5",
	"Society Builder" : "Градитељ",
	"Invite 10 people to eRepublik and help them reach level 6" : "Позови 10 пријатеља и помози им да достигну ниво 6",
	"Check your unlocked features" : "Види откључане могућности",
	"Get Wellness" : "Купи здравље",
	"Achievements" : "Достигнућа",
	"Edit profile" : "Уреди профил",
	"Edit Profile" : "Уреди профил",
	"Change residence" : "Пресели се",
	"Donations list" : "Листа донација",
	
	"Your email here" : "Твој e-mail",
	"Your birthday" : "Датум рођења",
	"Citizen Avatar" : "Аватар",
	"Change password" : "Промени лозинку",

	"Worked 30 days in a row" : "Радио си 30 дана за редом",
	"Win the Congress elections": "Победа на изборима за посланике",
// fight
	"Back to battlefield" : "Врати се у битку",
	"Fight Again" : "Бори се још једном",
	"Fight bonus" : "Бонус",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in  again with your organization username and password." : "Да се пријавиш као организација, прво мораш да се  одјавиш и да се пријавиш са именом и лозинком организације.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version,  please send us a message using the Contact form (category: Others) so that we can officially change it to an  organization." : "",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake  accounts and will be banned." : "",
	"My Organizations" : "Моје организације",
	"Logout" : "Одјави се",
	"Organizations created by you:" : "Твоје организације:",
	"You have not created any organization yet." : "Немате ниједну организацију.",


// career-path
	"General manager" : "Менаџер",
	"Hard worker" : "Вредан радник",


// ranking
	"No." : "Број",
	"Hard worker" : "Вредан радник",


// messages
        "Inbox" : "Примљене",
	"Sent" : "Послате",
	"Alerts" : "Извештаји",
	"Subscriptions" : "Претплате",
	"new article" : "Нов чланак",
	"Write article" : "Напиши чланак",
	"Edit newspaper details" : "Уреди детаље новина",
	"Edit" : "Уреди",
	"Delete" : "Избриши",
	"Read Message" : "Прочитај",
	"Reply" : "Одговори",
	"From" : "Од",
	"Back" : "Врати се",
	"Picture" : "Слика",
	"only JPG files allowed" : "Дозвољене су само JPG слике",
	"Publish" : "Објави",
	"of" : " од ",
	"Select all" : "Означи све",
	"Select All" : "Означи све",
	"Delete" : "Избриши",
	"Older" : "Старије",
	"Newer" : "Новије",
	"After 5 days the alerts are automatically deleted" : "После 5 дана све поруке ће бити аутоматски обрисане",
	"Unsubscribe" : "Откажи претплату",
	"Weekly news" : "Недељне вести",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in  eRepublik" : "Недељне поруке најбоље оцењених вести, активни ратови, војни догађаји и топ пет земаља еРепублике",
	"show example" : "пример",
	"Turn OFF" : "Искључи",
	"Turn ON" : "Уклучи",


// flash menu
	"My places > Army" : "Војска",
	"My places > Party" : "Партија",
	"My places > Newspaper" : "Новине",
	"My places > Organizations" : "Организације",
	"My places > Advertising Department" : "Рекламирање",
	"Create party" : "Оснуј партију",
	"Monetary Market" : "Мењачница",
	"Company market" : "Фирме на продају",
	"Create company" : "Оснуј компанију",
	"Top Citizens" : "Најбољи играчи",
	"Compose message" : "Нова порука",
	"Shout something" : "Изјави нешто",


// compose message
	"To" : "До: ",
	"Subject" : "Наслов",
	"Message" : "Порака",
	"Send" : "Пошаљи",


// new company
	"Company details" : "Детаљи фирме",
	"Company name" : "Име фирме",
	"Company logo" : "Лого фирме",
	"Disscusion area" : "Област дискусије",
	"Create" : "Оснуј",
	"Choose industry" : "Одбери индустрију",
	"Please choose the industry" : "Одбери индустрију.",


// monetary market
	"Exchange rate" : "Курс",
	"Amount to buy" : "Количина",
	"Rec exchange rate" : "Препоручен курс",
	"Sell" : "Продај",
	"Show my offers" : "Моје понуде",
	"Post new offer" : "Нова понуда",

// partija
	"Your account" : "Твој рачун: ",
	"Requirements" : "Захтеви",
	"Cost" : "Цена",
	"Party details" : "Детаљи за партију",
	"Party name" : "Име партије",
	"Economical orientation" : "Економска орјентација",
	"Social orientation" : "Социјална орјентација",
	"Party logo" : "Лого партије",
	"Disscusion area " : "Област за дискусију",
	"Create" : "Оснуј партију",
	"6-30 characters max" : "од 6 до 30 знакова",
	"Please choose your party`s economical orientation" : "Одберите економску ориентацију партије",
	"Please choose your party`s social orientation" : "Одберите социјалну ориентацију партије",
	"Far-left" : "Радикална левица",
	"Center-left" : "Лево од центра",
	"Center" : "Центар",
	"Center-right" : "Десно од центра",
	"Far-right" : "Радикална десница",
	"Totalitarian" : "Тоталитарна",
	"Authoritarian" : "Ауторитативна",
	"Libertarian" : "Либерална",
	"Anarchist" : "Анархистичка",


// invitations
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Добићеш по 5 златника за сваког пријатеља ког позовеш и помогнеш му да достигне ниво 6. ",
	"Your personal invitation link" : "Твој лични линк за позивнице",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that  register using your personal link will get you 5 Gold when they reach level 6." : "Користи свој линк на форумима, блоговима, програмима за четовање или пошаљи га преко email-а.",
	"Send email invite" : "Пошаљи позивницу email-ом",
	"Your name:" : "Твоје име: ",
	"Your friend's email:" : "Email пријатеља: ",
	"Use commas to separate multiple email addresses" : "Користите зарезе да бисте одвојили вишеструке адресе ",
	"Invites status" : "Статус позивнице",
	"View the status of your invites and bonuses" : "Види статус твојих позивница и бонусе",
	"Track invites" : "Види позиве",
	"Send invitation" : "Пошаљи позив",
	"Add from address book" : "Додај у адресар",
	"Add from adressbook" : "Додај у адресар",
	"Yahoo username" : "Корисничко име на Yahoo",
	"Yahoo password" : "Лозинка на Yahoo",
	"GMail username" : "Корисничко име на GMail",
	"GMail password" : "Лозинка на GMail",
	"MSN username" : "Корисничко име на MSN",
	"MSN password" : "Лозинка на MSN",
	"AOL username" : "Корисничко име на AOL",
	"AOL password" : "Лозинка на AOL",
	"Get contacts" : "Додај за пријатеља",
	"* Your username and password will not be stored on this server." : "* Корисничко име и лозинка од email сервиса неће бити сачувани на овом серверу.",
	"Privacy" : "Полиса за приватност",
	"Close" : "Затвори",


// menu	
	"Find out more" : "Сазнај више",
	"logout" : "Одјава",


// tools
	"Badges" : "Беџеви",
	"Size:" : "Димензије:",
	"Code:" : "Код:",
	"Vectorial logo is available in the" : "Векторски лого је доступан за ",
	"Press" : "Печат",
	"section" : "",
	"Latest shouts" : "Последње изјаве",
	"Latest alliances" : "Последњи савези",
	"Latest wars" : "Последњи ратови",
	"Latest military events" : "Последњи војни догађаји",


// dolno meni
	"Blog" : "Блог",
	"Shop" : "Продавница",
	"Contact" : "Контакт",
	"Jobs" : "Радна места",
	"Affiliates" : "Партнери",
	"eRepublik Laws" : "Закони на еРепублика",


// extras
	"from" : "од",
	"2 Gold" : "2 злато",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to  buy additional features within eRepublik." : "Злато у еРепублика је главна референтна валута за све виртуелне локалне валуте и користи се за додатне могућности у игри.",
	"Select amount" : "Одбери количину",
	"Payments can be done in USD as well." : "Уплату можете извршити и у америчким доларима.",
	"is a fictional currency used only in the eRepublik World." : " је измишљена валута која се користи само у овом виртуелном свету.",
	"I have read and agree with the" : " Прочитао сам и слажем се с тим ",
	"You must read and agree with the Terms of service in order to complete your order." : "Да би примили вашу поруџбину морате да се сложите са правилима кориштења.",
	"Terms of Service" : "Правила кориштења",
	"Go to eRepublik" : "Врати се на еРепублик"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 савезници ";
regexps["^Active wars in (.*)$"] = "Активни ратови у $1";
regexps["^Active resistance wars in (.*)$"] = "Активне револуције у $1";
regexps["(\\s*)Expires in (\\d*) days"] = "истиче за $2 дана";
regexps["^(\\d*) comments$"] = "$1 коментар";
regexps["^(\\d*) hours ago$"] = "пре $1 сати";
regexps["^(\\d*) minutes ago$"] = "пре $1 минута";
regexps["^(\\d*) days ago$"] = "пре $1 дана";
regexps["^Regions \\((\\d*)\\)"] = "Региони ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Пријатељи ($1)";
regexps["^(\\d*) months"] = "$1 месеци";
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
    "span":"", "select":"", "option":"", "input":"", "a":"", "h2":"", "th":"", "td":"", "p":"", "strong":"",  "div":"", "embed":""
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
addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul  li#menu5 a, #logo a { background-image: url(http://h.imagehost.org/0952/erep_menu.png); }');
addGlobalStyle('.btnGetExtraStorage { font-size: 10px; }');



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(3000, translateWholePage)
}, false);