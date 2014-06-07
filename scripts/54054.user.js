// ==UserScript==
// @name           eRepublik Srpski prevod (ćirilica)
// @namespace      http://www.erepublik.com/en/citizen/profile/1340210
// @description    eRepublik preveden na srpski / Serbian translation for eRepublik
// @version        1.0
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
	"+10 Wellness / 2 Gold" : "+10 Здравља / 2 Златника",
	"% of votes" : "% гласова",
	"6-30 characters max" : "6-30 карактера",
	"A newspaper is an efficient way to communicate your news to the Erepublik world. Read more on the Erepublik wiki. Create your own newspaper." : "Новине су ефикасан начин комуникације са eRepublik заједницом. Прочитајте више на eRepublik Wiki-ју. Отворите своје новине.",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "Новине су ефикасан начин комуникације са eRepublik заједницом. Прочитајте више на eRepublik Wiki-ју. Отворите своје новине.",
	"ACCEPTED" : "ПРИХВАЋЕНО",
	"Accepted" : "Прихваћено",
	"Accounts" : "Имовина",
	"Achievements" : "Достигнућа",
	"active battles " : "активне битке",
	"Active wars list" : "Листа активних ратова",
	"Add a job offer" : "Додај понуду за посао",
	"Add as a friend" : "Додај за пријатеља",
	"Administration" : "Aдминистрација",
	"ADMINISTARATION CENTER" : "ЦЕНТАР",
	"Advanced 5 strength levels" : "Напредовао/ла 5 нивоа снаге",
	"Advertising Department" : "Рекламно одељење",
	"Affiliates" : "Сарадници",
	"Alerts" : "Упозорења",
	"All accounts" : "Све валуте",
	"All Alliances" : "Сви савези",
	"All countries" : "Све државе",
	"All donations" : "Све донације",
	"All employees" : "Списак запослених",
	"All levels" : "Сви нивои",
	"All resistance wars" : "Сви ослободилачки ратови",
	"All skills" : "Сви нивои",
	"All wars" : "Сви ратови",
	"Alliance" : "Савез",
	"Alliances" : "Савези",
	"Amazing fight" : "Запањујућа борба",
	"Ambassador" : "Амбасадор",
	"Amount" : "Количина",
	"Amount to buy" : "Количина за куповину",
	"Anarchist" : "Анархиста",
	"Apply" : "Узми",
	"Argentina" : "Аргентина",
	"Army" : "Војска",
	"Article RSS" : "RSS чланка",
	"Assets" : "Својина",
	"Attackable on President's decision" : "Може се напасти на предлог председника",
	"Attention: NO VAT tax for Raw materials" : "Пажња: Нема пореза на сировине",
	"August" : "Aвгуст",
	"Australia" : "Aустралија",
	"Austria" : "Aустрија",
	"Average" : "Просечно",
	"Average Citizen level" : "Просечни ниво еГрађана",
	"Average citizen level" : "Просечни ниво еГрађана",
	"Average strength" : "Просечна снага",
	"Back" : "Назад",
	"Back to battlefield" : "На бојно поље",
	"Basic damage" : "Основна штета",
	"Battle Hero" : "Херој битке",
	"Battle History" : "Историја битке",
	"Battle history" : "Историја битке",
	"Belgium" : "Белгија",
	"Bio" : "Биографија",
	"Bolivia" : "Боливија",
	"BORDER AREA" : "ГРАНИЧНА ОБЛАСТ",
	"Bosnia and Herzegovina" : "Босна и Херцеговина",
	"Brazil" : "Бразил",
	"Bulgaria" : "Бугарска",
	"Buy" : "Купи",
	"Buy Constructions" : "Купи грађевине",
	"Buy Constructions: Defense System" : "Купи грађевину: Одбрамбени систем",
	"Buy Constructions: Hospital" : "Купи грађевину: Болница",
	"Buy export license" : "Купи дозволу за извоз",
	"Buy extra storage" : "Купи додатни простор",
	"Buy from market" : "Купи са тржишта",
	"Buy market license" : "Kупи дозволу за тржиште",
	"Buy raw materials" : "Kупи сировине",
	"Buy wellness" : "Kупи здравље",
	"Buy Wellness Box" : "Купи пакет здравља",
	"Canada" : "Kанада",
	"Candidate" : "Kaндидат",
	"CAPITAL" : "ГЛАВНИ",
	"CAPTURED" : "ОСВОЈЕНО",
	"Career" : "Kaријера",
	"Career path" : "Развој каријере",
	"Center" : "Централна",
	"Change password" : "Промени лозинку",
	"Change residence" : "Промени пребивалиште",
	"Check your unlocked features" : "Прегледај отворене могућности",
	"Chile" : "Чиле",
	"China" : "Кина",
	"Citizen Avatar" : "Aватар",
	"Citizen fee" : "Почетни џепарац",
	"Citizens" : "Грађани",
	"CITY" : "ГРАД",
	"Collect" : "Покупи",
	"Colombia" : "Колумбија",
	"Come back tomorrow." : "Врати се сутра.",
	"Companies" : "Koмпаније",
	"Companies for sale" : "Koмпаније на продају",
	"Company" : "Koмпанија", 
	"Company accounts" : "Имовина компаније", 
	"Company page" : "Страница компаније",
	"Community" : "Заједница",
	"Conquer" : "Oсвојено",
	"Congress" : "Конгрес",
	"Congress Elections" : "Конгресни избори",
	"Congress Member" : "Koнгресмен",
	"Constructions": "Грађевине",
	"Contact": "Kонтакт",
	"Copyright" : "Права",
	"Corporal" : "Corporal",
	"Corporate career" : "Запослење",
	"Cost" : "Цена", 
	"Countries" : "Државе",
	"Country - Society" : "Држава - Друштво",
	"Country" : "Држава",
	"Country Administration" : "Aдминистрација државе",
	"Country administration" : "Aдминистрација државе",
	"Country Presidency" : "Вођство државе",
	"Country President" : "Председник државе",
	"Country trading embargoes" : "Државе којима смо ставили ембарго",
	"Create" : "Направи",
	"Create new" : "Направи нову",
	"Create new company" : "Направи нову компанију",
	"Croatia" : "Хрватска",
	"Current location" : "Тренутно пребивалиште",
	"Czech Republic" : "Чешка",
	"Day" : "Дан ",
	"Daily salary" : "Дневна плата",
	"Debate Area" : "Расправа на тему",
	"December" : "Децембар",
	"Declare War" : "Објави рат",
	"Defense Points" : "Одбрамбени поени",
	"Defense System" : "Одбрамбени систем",
	"Defense system" : "Одбрамбени систем",
	"defense system" : "Oдбрамбени систем",
	"Delete" : "Избриши",
	"Denmark" : "Данска",
	"details" : "детаљи",
	"Diamonds" : "Дијаманти",
	"diamonds" : "дијаманти",
	"Disscusion area" : "Дискусија",
	"Donate" : "Донирај",
	"Donate Gold" : "Донирај злато",
	"Donate raw materials" : "Донирај сировине",
	"Donation" : "Донација",
	"Donations list" : "Листа донација",
	"Drag and drop items from your inventory to the donation area" : "Превуци предмете из свог инвентара у простор за донације.",
	"Economic stats" : "Eкономски подаци",
	"Economical orientation" : "Eкономска оријентација",
	"Economy" : "Eкономија",
	"Edit details" : "Измени детаље",
	"Edit profile" : "Измени профил",
	"Edit Profile" : "Измени профил",
	"Election results" : "Резултати избора",
	"Election" : "Избор",
	"Elections" : "Избори",
	"Email must be valid for registration, so don't cheat" : "Email адреса мора бити исправна због регистрације, зато унесите исправну email адресу",
	"Employee" : "Запослени",
	"Employees" : "Запослени",
	"eRepublik Birthday" : "eRepublik рођендан",
	"Erepublik Age" : "eRepublik старост",
	"eRepublik Laws" : "eRepublik правила",
	"Estonia" : "Eстонија",
	"Everyone" : "Сви",
	"Exchange rate" : "Курс",
	"Experience" : "Искуство",
	"Experience points" : "Искустваени поени",
	"Expires tomorrow" : "Истиче сутра",
	"Field Marshal" : "Field Marshal",
	"Fight" : "Борба",
	"Fights" : "Борбе",
	"Fight Again" : "Бори се опет",
	"Fight bonus" : "Бонус у борби",
	"Finances" : "Финансије",
	"Final Results" : "Званични резултати",
	"Find out more" : "Откриј више",
	"Finland" : "Финска",
	"Follow us" : "Пратите нас на",
	"Food" : "Храна",
	"food" : "храна",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "Да би закон био прихваћен неопходно је 2/3 гласова конгресмена",
	"for 10 shouts/day and more" : "зa 10 изјава по дану",
	"Force" : "Сила",
	"Forfeit Points:" : "Kaзнени поени",
	"forum" : "форум",
	"Forum" : "Форум",
	"France" : "Француска",
	"Friends" : "Пријатељи",
	"General Manager" : "Управник",
	"Germany" : "Немачка",
	"Get Extra Storage" : "Купи додатни простор",
	"Get Gold" : "Купи злато",
	"Get gold & extras" : "Купи злато & додатке",
	"Gift" : "Поклон",
	"gift" : "поклон",
	"Go to Battlefield" : "На бојно поље",
	"Go to marketplace" : "На пијацу",
	"GOLD" : "ЗЛАТО",
	"Gold" : "Злато",
	"Grain" : "Жито",
	"grain" : "жито",
	"Great fight" : "Одлична борба",
	"Greece" : "Грчка",
	"Gross domestic product (GDP)" : "Бруто Домаћи Производ (БДП)",
	"Guest" : "Гост",
	"Hard Worker" : "Вредни радник",
	"Heal" : "Лечи",
	"Hero" : "Херој",
	"High": "Високо",
	"Home" : "Почетна",
	"Hospital" : "Болница",
	"hospital" : "болница",
	"House" : "Кућа",
	"house" : "кућа",
	"Job Market" : "Берза рада",
	"Hungary" : "Мађарска",
	"I have nothing more to say at the moment" : "Замислите, немам више предлога.",
	"Import Tax" : "Порез на увоз",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Да бисте се улоговали на вашу организацију, морате се излоговати са налога еГрађана.",
	"Inbox" : "Примљена пошта",
	"Income Tax" : "Порез на приход",
	"India" : "Индија",
	"Indonesia" : "Индонезија",
	"Industry" : "Индустрија",
	"Inflation" : "Инфлација",
	"International" : "Интернационалне",
	"Inventory" : "Инвентар",
	"Invest" : "Уложи",
	"Invite friends" : "Позови пријатеље",
	"Invite 10 people to eRepublik and help them reach level 6" : "Позови 10 особа у eRepublik и постарај се да дођу до нивоа 6",
	"Iran" : "Иран",
	"Ireland" : "Ирска",
	"Iron" : "Гвожђе",
	"iron" : "гвожђе",
	"Israel" : "Израел",
	"Issue Money" : "Штампај новац",
	"Italy" : "Италија",
	"Items" : "Предмети",
	"items" : "предмети",
	"Japan" : "Јапан",
	"Job market" : "Тржиште рада",
	"Jobs" : "Послови",
	"Jobs available in this company" : "Oтворена радна места у овој компанији",
	"Join" : "Приступи",
	"Join a party" : "Приступи странци",
	"Jul" : "Јули ",
	"Land" : "Ратарство/Рударство",
	"Last presence" : "Радио/ла",
	"Latest" : "Најновије",
	"Latest Events" : "најновији догађаји",
	"Latvia" : "Летонија",
	"Law proposals" : "Предлози закона",
	"Level 1" : "Ниво 1",
	"Level" : "Ниво",
	"Level 2" : "Ниво 2",
	"Level 3" : "Ниво 3",
	"Level 4" : "Ниво 4",
	"Level 5" : "Ниво 5",
	"Lithuania" : "Литванија",
	"Login" : "Улогуј се",
	"logout" : "Излогуј се",
	"Make changes" : "Запамти промене",
	"Malaysia" : "Малезија",
	"Manufacturing" : "Мануфактура",
	"Market" : "Тржиште",
	"Markets" : "Tржишта",
	"Market offers" : "Понуде на тржишту",
	"Market place" : "Пијаца",
	"Marketplace" : "Пијаца",
	"Media career" : "Медијска активност",
	"Media Mogul" : "Медија Могул",
	"Medium" : "Средње",
	"Member of" : "Члан",
	"Members"  : "Чланови",
	"Mexico" : "Мексико",
	"Military" : "Војска",
	"Military achievements" : "Војна достигнућа",
	"Military career" : "Војна активност",
	"Military force" : "Војна сила",
	"Military rank" : "Војни ранк",
	"Military stats" : "Војни подаци",
	"Minimum" : "Минимум",
	"Minimum country wage :" : "Минимална плата у држави",
	"Minimum skill" : "Тражена вештина",
	"Minimum Wage" : "Минимална плата",
	"Moldavia" : "Молдавија",
	"Monetary market" : "Берза",
	"Money" : "Новац",
	"Month/Year" : "Месец/Година",
	"Monthly exports" : "Месечни извоз",
	"Monthly imports" : "Mесечни увоз",
	"more events" : "још догађаја",
	"more news" : "joш вести",
	"more than a year" : "више од године",
	"Moving Tickets" : "Карте",
	"moving tickets" : "карте",
	"Mutual Protection Pact" : "Пакт о међусобној заштити",
	"My Organizations" : "Моје организације",
	"My places" : "Мој мени",
	"Name" : "Име",
	"National" : "Националне",
	" National Rank" : " Национални Ранк",
	"Neighbors" : "Суседи",
	"Netherlands" : "Холандија",
	"New" : "Ново",
	"new article" : "нови чланак",
	"New Citizen Fee" : "Износ за новорегистроване играче",
	"New Citizen Message" : "Поздравна порука",
	"New Citizens today" : "Нових становника данас",
	"New citizens today" : "Нових еГрађана данас",
	"New location:" : "Ново пребивалиште:",
	"news" : "новине",
	"News" : "Вести",
	"Newspaper" :"Новине",
	"Newspaper Avatar" :"Аватар новина",
	"Newspaper details" :"Подаци новина",
	"Newspaper name" :"Назив новина",
	"Newspapers" : "Новине",
	"Next" : "Следећи",
	"Next elections" : "Наредни избори",
	"No" : "Не",
	"No." : "Бр.",
	"no active battles " : "нема активних битака",
	"No activity" : "Без активности",
	"no allies" : "без савезника",
	"NO MAN'S LAND" : "НИЧИЈА ЗЕМЉА",
	"No. of votes" : "Гласова",
	"No political activity" : "Без активности",
	"No products in this market" : "Нема производа на овом тржишту",
	"No shouts posted by this Citizen yet" : "Овај грађанин још увек није писао изјаве",
	"North Korea" : "Северна Кореја",
	"Norway" : "Норвешка",
	"Not qualified" : "Неквалификовани",
	"November" : "Новембар",
	"Now you can visit the " : "Можете посетити ",
	"October" : "Октобар ",
	"of the New World" : " Новог Света",
	"Offer a gift" : "Поклони",
	"Office" : "Канцеларија",
	"Official" : "Званични",
	"Official candidates" : "Званични кандидат",
	"Oil"  : "Нафта",
	"oil"  : "нафта",
	"Ok, thanks, next tip" : "У реду, следећи савет",
	"Old"  : "Старо",
	"On the Map" : "На мапи",
	"one hour ago" : "пре сат времена",
	"one minute ago" : "пре минут",
	"one month ago" : "пре месец дана",
	"online": "присутни",
	"Online now": "тренутно присутан/на",
	"only ": "само ", " pictures allowed": " слике дозвољене",
	"only .jpeg pictures allowed": "само .jpeg слике дозвољене",
	"Only congressmen and country presidents have the right to vote" : "Само председник државе и конгресмени имају право гласа",
	" or read the  " : " или прочитати  ",
	"Organization Avatar": "Аватар организације",
	"Organizations created by you:" : "Ваше организације",
	"Organizations" : "Организације",
	"Orientation" : "Oријентација",
	"Pakistan" : "Пакистан",
	"Paraguay" : "Парагвај",
	"Parties" : "Странке",
	"Party" : "Странка",
	"Party details" : "Детаљи о странци",
	"Party Elections" : "Страначки избори",
	"Party logo" : "Лого странке",
	"Party name" : "Име странке",
	"Party Presidency" : "Председништво странке",
	"Party President" : "Председник странке",
	"Peace Proposal" : "Предлог мира",
	"Pending" : "На чекању",
	"Philippines" : "Филипини",
	"Place your Congress candidature" : "Постави своју кандидатуру за конгрес",
	"Please choose a country you want to live in." : "Одабери државу у којој желиш да живиш.",
	"Please choose the region you want to live in." : "Одабери област у којој желиш да живиш.",
	"Please choose the country you want to live in." : "Одабери државу у којој желиш да живиш.",
	"Please select an Industry to see the marketplace offers" : "Одабери грану производње да би видео/ла понуду на пијаци",
	"Poland" : "Пољска",
	"Politic stats" : "Политички подаци",
	"Political career" : "Политичка активност",
	"Political stats" : "Политички подаци",
	"Politics" : "Политика",
	"Population": "Становништво",
	"Portugal" : "Португал",
	"Post" : "Стави",
	"Post a comment" : "Остави коментар",
	"Post new offers" : "Постави понуду",
	"Presence:" : "Присутност",
	"President" : "Председник",
	"President Elections" : "Председнички избори",
	"President Impeachment" : "Свргавање председника",
	"Press" : "Новине",
	"Press director" : "Уредник новина",
	"Prev" : "Претходни",
	"Price" : "Цена",
	"Price with taxes" : "Цена са порезом",
	"Privacy" : "Приватност",
	"Private" : "Private",
	"Productivity" : "Продуктивност",
	"Products" : "Производи",
	"Profile" : "Профил",
	"Proposed by" : "Предложио/ла: ",
	"Provider" : "Произвођач",
	"Quality" : "Квалитет",
	"Quality Level" : "Ниво квалитета",
	"Rank" : "Чин",
	"Rankings" : "Статистике",
	"Raw materials" : "Сировине",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Сировине могу да се купе само преко налога компаније (oдаберите компанију у десном горњем углу) или ако сте улоговани као организација",
	"Reach 1000 subscribers to your newspaper" : "Достигни 1000 претплатника на своје новине",
	"Reach the highest total damage in one battle" : "Начини највише штете у једној битци",
	"Reached 1000 subscribers to your newspaper" : "Новине достигле 1000 претплатника",
	"Reached strength level 5" : "Постигнута снага 5",
	"Reached the highest total damage in one battle" : "Начинио највише штете у једној битци",
	"Rec exchange rate" : "Препоручени курс",
	"REJECTED" : "ОДБИЈЕН",
	"Rejected" : "Oдбијен",
	"Remove" : "Уклони",
	"Remove friend" : "(Не)пријатељ",
	"Report abuse" : "Пријави злоупотребу",
	"Represent your country (or eNation) in the real world" : "Представи свију еНацију стварном свету",
	"Requirements" : "Захтеви",
	"Resign" : "Oтказ",
	"Resistance Hero" : "Херој ослободилачког рата",
	"Resistance War" : "Oслободилачки рат",
	"Resistance War Active" : "Активни ослободилачки рат",
	"Romania" : "Румунија",
	"RURAL AREA" : "РУРАЛНА ОБЛАСТ",
	"Russia" : "Русија",
	"Salary" : "Плата",
	"See all donations" : "Све донације",
	"See all employees" : "Сви запослени",
	"See all law proposals" : "Сви предложени закони",
	"See all members" : "Сви чланови",
	"see finished battles" : "завршене битке",
	"See results" : "Резултати",
	"Select" : "Oдабери",
	"Secure" : "Безбедно",
	"Sell" : "Продај",
	"Sell company" : "Продај компанију",
	"Send message" : "Пошаљи поруку",
	"Sent" : "Послато",
	"September" : "Септембар",
	"Serbia" : "Србија",
	"Sergeant" : "Sergeant",
	"Shop" : "Продавница",
	"Shout" : "Пошаљи",
	"Shout something:" : "Изјави нешто",
	"Show active wars" : "Активни ратови",
	"Show all donations" : "Прикажи донације",
	"Show all employees" : "Прикажи запослене",
	"show finished battles" : "прикажи завршене битке",
	"Show my offers" : "Моје понуде",
	"Singapore" : "Сингапур",
	"Skill" : "Вештине",
	"Skill level" : "Ниво вештине",
	"Skills:" : "Вештине",
	"Skills" : "Вештине",
	"Slovakia" : "Словачка",
	"Slovenia" : "Словенија",
	"Social orientation" : "Друштвена оријентација",
	"Social stats" : "Друштвени подаци",
	"Society" : "Друштво",
	"Society Builder" : "Градитељ заједнице",
	"South Africa" : "Јужна Африка",
	"South Korea" : "Јужна Кореја",
	"Spain" : "Шпанија",
	"Start a resistance war and liberate that region" : "Започни ослободилачки рат и ослободи област",
	"Started a resistance war and liberated " : "Започет ослободилачки рат и ослобођена ",  " regions." : " област.",
	"Started by" : "Започеo/лa:",
	"started by" : "започео/ла: ",
	"started on" : "почео",
	"Still active " : "још увек активан",
	"Stock" : "Залиха",
	"Strength" : "Снага",
	"Subscribe" : "Претплати се",
	"Subscribe to comments" : "Прати коментаре",
	"Subscriptions" : "Претплата",
	"SUBURBIA" : "ПРЕДГРАЂЕ",
	"Super Soldier" : "Супер Војник",
	"supported by" : "подржавају га",
	"Supporting parties" : "Испред странке",
	"Sweden" : "Шведска",
	"Switzerland" : "Швајцарска",
	"Tax change: Diamonds" : "Промена пореза: Дијаманти",
	"Tax change: Food" : "Промена пореза: Храна",
	"Tax change: Gift" : "Промена пореза: Поклони",
	"Tax change: Grain" : "Промена пореза: Жито",
	"Tax change: House" : "Промена пореза: Куће",
	"Tax change: Iron" : "Промена пореза: Гвожђе",
	"Tax change: Moving Tickets" : "Промена пореза: Карте",
	"Tax change: Weapon" : "Промена пореза: Оружје",
	"Tax change: Wood" : "Промена пореза: Дрво",
	"Taxes" : "Порези",
	"Terms of Service" : "Услови",
	"Thailand" : "Тајланд",
	"The company offers no products in this market" : "Компанија нема понуда на овом тржишту",
	"The law voting process takes 24 hours." : "Процес гласања траје 24 сата.",
	"There are no resistance wars in this country." : "У овој држави нема ослободилачких ратова.",
	"This citizen does not have any donations sent or received." : "Ова/ј грађанин/ка није ни примио ни слао донације.",
	"This country can trade with any other country in eRepublik. " : "Ова држава може да тргује са свим државама у eRepublik-у.",
	" to stay in touch with what happens on eRepublik." : " да бисте остали у току са дешавањима у eRepublik-у.",
	"today" : "данас",
	"Today" : "данас",
	"Tools" : "Алати",
	"Top Rated" : "Најчитаније",
	"Total Citizens" : "Укупно грађана",
	"Total citizens" : "Укупно еГрађана",
	"Total damage:" : "Укупна штета:",
	"Total votes:" : "Укупно гласова",
	"Treasury" : "Каса",
	"Turkey" : "Турска",
	"Tutorials" : "Упутства",
	"Ukraine" : "Украјина",
	"UNDERGROUND" : "ПОДЗЕМЉЕ",
	"Unemployed" : "Незапослен/а",
	"United Kingdom" : "Велика Британија",
	"Unsubscribe" : "Откажи претплату",
	"Unsubscribe to comments" : "Престани да пратиш коментаре",
	"until the region can be occupied or secured" : "док област не буде ослобођена или осигурана",
	"Update" : "обнови",
	"Upgrade quality level" : "Унапреди квалитет",
	"Uruguay" : "Уругвај",
	"USA" : "САД",
	"Value added tax (VAT)" : "Порез на додату вредност (ПДВ)",
	"Venezuela" : "Венецуела",
	"View all comments" : "Сви коментари",
	"Vote" : "Гласај",
	"War" : "Рат",
	"Wars" : "Ратови",
	"Wars list" : "Листа чланова",
	"Weapon" : "Оружје",
	"weapon" : "оружје",
	"Weapon quality" : "Квалитет оружја",
	"Wellness" : "Здравље",
	"Who" : "Ко",
	"Wildcards" : "Додатни",
	"Win the Congress elections": "Победи на изборима за конгресмене",
	"Won the Congress elections": "Изабран/a на изборима за конгресмене",
	"Win the Presidential elections": "Победи на изборима за председника",
	"Won the Presidential elections": "Изабран/a на председничким изборима",
	"Wood" : "Дрво",
	"wood" : "дрво",
	"Worked 30 days in a row" : "радио/ла 30 дана узастопно",
	"World" : "Свет",
	" xp points " : " искуствени поени ",
	"Yes" : "Да",
	"yesterday" : "јуче",
	"You are not a member of a party" : "Ниси члан странке",
	"You are not a president or a congress member in this country" : "Ниси председник/ца ни конгресмен/кa у овој држави",
	"You are not a President or a Congress Member in this country" : "Ниси председник/ца ни конгресмен/кa у овој држави",
	"You can exchange money at the" : "Можеш разменити валуте на: ",
	"You can get wellness from:" : "Здравље можеш добити:",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Можеш се прикључити странци на страници саме странке или креирати сопствену странку уколико ти се ниједна од постојећих не допада. Чланство у странци ти омогућује да постанеш конгресмен или чак председник.",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Не можеш покренути ослободилачки рат у овој области, јер већ припада оригиналној држави",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Не можеш покренути ослободилачки рат у овој области, јер већ припада оригиналној држави",
	"You cannot trade with this country as you are at war with it" : "Не можеш трговати са овом државом - у рату сте",
	"You didn't specify the amount of products you wish to buy" : "Ниси навео/ла количину коју желиш да купиш",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Немаш карту. Карту можеш купити на Пијаци.",
	"You do not have a newspaper" : "Немаш новине",
	"You don't have a newspaper" : "Немаш новине",
	"You don't have any active job offers" : "Немаш отворених радних места",
	"You do not have any active job offers" : "Немаш отворених радних места",
	"You have already worked today." : "Већ си радио/ла данас.",
	"You have succesfully edited your profile" : "Профил успешно измењен",
	"You have trained today. You can train again tomorrow." : "Тренирао/ла си данас. Сутра можеш опет тренирати",
	"Your account" : "Мој налог",
	"Your accounts" : "Моја имовина",
	"Your birthday" : "Moj рођендан",
	"Your comment" : "Moj коментар",
	"Your companies" : "Moje компаније",
	"Your email here" : "Email",
	"Your inventory" : "Инвентар",
	"Your offer has been updated" : "Ваша понуда је обновљена",


};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 савезника";
regexps["^Active wars in (.*)$"] = "$1 активни ратови у";
regexps["^Active resistance wars in (.*)$"] = "$1 активни ослободилачки ратови у";
regexps["(\\s*)Expires in (\\d*) days"] = "$2 истиче за";
regexps["^(\\d*) comments$"] = "$1 коментари";
regexps["^(\\d*) hours ago$"] = "пре $1 сата";
regexps["^(\\d*) minutes ago$"] = "пре $1 минута";
regexps["^(\\d*) days ago$"] = "пре $1 дана";
regexps["^(\\d*) months ago$"] = "пре $1 месеца";
regexps["^Regions \\((\\d*)\\)"] = "Области ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Пријатељи ($1)";
regexps["^(\\d*) months"] = "$1 месеца";
regexps["^Comments(.*)"] = "Коментари$1";
regexps["^Trackbacks(.*)"] = "Линковано$1";


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