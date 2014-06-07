// ==UserScript==
// @name           eRepublik Ukraine
// @description    Українська локалізація гри eRepublik
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Головна",
	"Donate" : "Передати",
	"May" : "Травень",
	"June" : "Червень",
	"July" : "Липень",
	"Day" : "День",
	"Day " : "День ",
	"days" : "днів",
	"days " : "днів ",
	"of the New World" : " нового світу",
	"Rank"   : "Рейтинг",
	"Company" : "Компанія", 
	"Profile" : "Профіль", 
	"Party" : "Партія", 
	"Newspaper" : "Газета",
	"Army" : "Армія",
	"Country administration" : "Державна адміністрація",
        "Organizations" : "Організації",
        "Advertising Department" : "Відділ реклами",
	"Market" : "Ринок",
	"Monetary market" : "Валютний ринок",
	"Job market" : "Відділ працевлаштування",
        "Companies for sale" : "Компанії на продаж",
        "Get Gold &amp; Extras" : "Придбати додатковий GOLD",
	"Rankings" : "Рейтинги",
	"Social stats" : "Соціальна статистика",
	"Economic stats" : "Економічна статистика",
	"Political stats" : "Політична статистика",
	"Military stats" : "Військова статистика",
	"Tutorials" : "Навчання",
	"Tools" : "Додатки",
	"Forum" : "Форум",
	"News" : "Новини",
	"Invite friends" : "Запроси друзів",
	"eRepublik Shop" : "eRepublik магазин",
	"Career path" : "Карєрний ріст",
	"Ok, thanks, next tip" : "Добре, дякую, наступну пораду",
	"I have nothing more to say at the moment" : "Більше не маю чого сказати",
	"Select" : "Вибрати",
	"Top rated news" : "ТОП новини",
	"Latest news" : "Останні новини",
        "Latest events" : "Останні події",
		"News" : "Новини",
        "More events" : "Більше подій",
        "more events" : "більше подій",
        "More news" : "Більше новин",
		"more news" : "більше новин",
	"Marketplace" : "Ринок",
	"Wars" : "Війни",
        "My Places" : "Моя сторінка",
        "Info" : "Інформація",
        "Community" : "Спільнота",
        "Day of the new world" : "День нового світу",
        "National" : "Національні",
        "International" : "Міжнародні",
		"Latest Events" : "Останні події",
        "Shouts" : "Схвалень",
        "Shout" : "Схвалити",
        "Official" : "Офіційний",
        "Everyone" : "Кожному",
        "Latest" : "Останні",
        "Search citizen" : "Шукати громадянина",
	"Shout" : "Схвалити",
	"Latest" : "Останні",
	"one minute ago" : "хвилину тому",
	" for 10 shouts/day and more" : " для 10 схвалень в день і більше",
	"for 10 shouts/day and more" : "для 10 схвалень в день і більше",
	"No more shouts for today" : "Жодного схвалення сьогодні",
	"Top rated" : "Найпопулярніші",
	"Go to next page" : "На наступну сторінку",
	"Experience points" : "Очки досвіду",
	"Name" : "Назва",
	"Companies" : "Компанії",
	"Newspapers" : "Газети",
	"Countries" : "Держави",
	"Parties" : "Партії",


// country page
	"On the Map" : "На мапі",
	"Total citizens" : "Загалом громадян",
	"New citizens today" : "Нових громадян сьогодні",
	"Average citizen level" : "Середній рівень громадян",
	"Online now": "Онлайн",
	"Citizen fee" : "Вартість громадянина",
	"Citizens" : "Громадян",
	"Who" : "Хто",
	"details" : "деталі",
	"Society" : "Соціум",
	"Economy" : "Економіка",
	"Politics" : "Політика",
	"Military" : "Військова справа",
	"Administration" : "Адміністрація",
	
// countries
	"Argentina" : "Аргентина",
	"Australia" : "Австралія",
	"Austria" : "Австрія",
	"Belgium" : "Бельгія",
	"Bolivia" : "Болівія",
	"Bosnia and Herzegovina" : "Боснія і Герцоговина",
	"Brazil" : "Бразилія",
	"Bulgaria" : "Болгарія",
	"Chile" : "Чилі",
	"China" : "Китай",
	"Colombia" : "Колумбія",
	"Croatia" : "Хорватія",
	"Canada" : "Канада",
	"Czech Republic" : "Чеська Республіка",
	"Denmark" : "Данія",
	"Estonia" : "Естонія",
	"Finland" : "Фінляндія",
	"France" : "Франція",
	"Germany" : "Німеччина",
	"Greece" : "Греція",
	"Hungary" : "Угорщина",
	"India" : "Індія",
	"Indonesia" : "Індонезія",
	"Ireland" : "Ірландія",
	"Israel" : "Жиди",
	"Italy" : "Італія",
	"Iran" : "Іран",
	"Japan" : "Японія",
	"Latvia" : "Латвія",
	"Lithuania" : "Литва",
	"Malaysia" : "Малазія",
	"Mexico" : "Мексика",
	"Moldavia" : "Українська Молдавія",
	"Netherlands" : "Голандія",
	"North Korea" : "Північна Корея",
	"Norway" : "Норвегія",
	"Pakistan" : "Пакистан",
	"Paraguay" : "Парагвай",
	"Peru" : "Перу",
	"Philippines" : "Філіпіни",
	"Poland" : "Ляхи",
	"Portugal" : "Португалія",
	"Romania" : "Цигани",
	"Serbia" : "Сербія",
	"Singapore" : "Сінгапур",
	"South Africa" : "Південна Африка",
	"South Korea" : "Південна Корея",
	"Slovakia" : "Словакія",
	"Slovenia" : "Словенія",
	"Switzerland" : "Швейцарія",
	"Spain" : "Іспанія",
	"Sweden" : "Швеція",
	"Russia" : "Москалі",
	"Thailand" : "Тайланд",
	"United Kingdom" : "Великобританія",
	"Ukraine" : "Ненька Україна",
	"Uruguay" : "Уругвай",
	"USA" : "США",
	"Turkey" : "Туреччина",
	"Venezuela" : "Венесуела",
	"World" : "Світ",
	"All countries" : "Всі держави",
// economy
	"GOLD" : "GOLD",
	"Gold" : "Gold",
	"Treasury" : "Цінності",
	"All accounts" : "Всі держави",
	"Country trading embargoes" : "Ембарго з країнами",
	"This country can trade with any other country in eRepublik." : "Ця країна може торгувати з усіма державами",
	"Income Tax" : "Податок від прибутку",
	"Import Tax" : "Податок від імпорту",
	"VAT" : "ПДВ",
	"Taxes" : "Податки",
	"food" : "їжа",
	"gift" : "подарунки",
	"weapon" : "зброя",
	"moving tickets" : "квитки",
	"grain" : "зерно",
	"diamonds" : "діаманти",
	"iron" : "залізо",
	"oil"  : "нафта",
	"wood" : "дерево",
	"house" : "будинки",
	"hospital" : "лікарні",
	"defense system" : "оборонні системи",
	"Defense system" : "Оборонні системи",


	"Salary" : "Зарплата",
	"Minimum" : "Мінімум",
	"Average" : "Середня",

	"Gross domestic product (GDP)" : "Валовий внутрішній продукт (ВВП)",
	"Monthly exports" : "Місячний експорт",
	"Monthly imports" : "Місячний імпорт",
	"Inflation" : "Інфляція",
// company
	"Office" : "Офіс",
	"You have already worked today." : "Ви вже сьогодні працювали",
	"Come back tomorrow." : "Повертайтесь завтра.",
	"Resign" : "Звільнитися",
	"Employees" : "Працівники",
	"Raw materials" : "Сировина",
	"Show all employees" : "Показати всіх працівників",
	"Show all donations" : "Показати всі пожертви",
	"Go to marketplace" : "Перейти до ринку",
	"Products" : "Продукція",
	"The company cannot trade with this country due to a trade embargo." : "Компанія не можу торгувати з цією країною, допоки триває ембарго.",
	"Jobs available in this company" : "Наявні вакансії в компанії",
	"Minimum Skill" : "Мінімальний навичок",
	"You do not have any active job offers" : "У вас немає вакансій",
	"Apply" : "Підтвердити",
	"The company offers no products in this market" : "Компанія не продає продукцію на цьому ринку",
	"Amount" : "Кількість",
	"Price" : "Ціна",
	"Price with taxes" : "Ціна з податками",
	"Company page" : "Сторінка компанії",
	"Today" : "Сьогодні",
	"Yesterday" : "Вчора",
	"All employees" : "Всі працівники",
	"Skill" : "Навички",
	"Daily salary" : "Денний заробіток",
	"Last presence" : "Останні відвідини",
	"Minimum country wage :" : "Мінімальна зарплата : ",

	"Grain" : "Зерно",
	"Food" : "Їжа",
	"Gift" : "Подарунки",
	"Weapon" : "Зброя",
	"Moving Tickets" : "Квитки",
	"Diamonds" : "Діаманти",
	"Iron" : "Залізо",
	"Oil"  : "Нафта",
	"Wood" : "Дерево",
	"House" : "Будинки",
	"Hospital" : "Лікарні",
	"Defense System" : "Оборонні системи",
	"All industries" : "Всі галузі",
	"Country" : "Держава",
	"Create new company" : "Створити нову компанію",


// market
	"Quality Level" : "Рівень продукції",
	"All levels" : "Всі рівні",
	"Level 1" : "Рівень 1",
	"Level 2" : "Рівень 2",
	"Level 3" : "Рівень 3",
	"Level 4" : "Рівень 4",
	"Level 5" : "Рівень 5",

	"Provider" : "Постачальник",
	"Quality" : "Рівень",
	"Stock" : "Кількість",
	"Buy" : "Купити",
	"Market" : "Ринок",

	"Market offers" : "Ринкова пропозиція",
	"Amount" : "Кількість",
	"Price" : "Ціна",
	"Next" : "Наступний",
	"Prev" : "Попередній",
	"No products in this market" : "Продукція на цьому ринку відсутня",
	"Go to marketplace" : "Перейти до ринку",
	"Jobs available in this company" : "Наявні вакансії в компанії",
	"You don't have any active job offers" : "У вас немає вакансій",
	"You didn't specify the amount of products you wish to buy" : 
		"Ви не вказали кількість продукції, яку ви хочете купити",
	"You cannot trade with this country as you are at war with it" :
		"Ви не можете торгувати з цією державою під час війни",


// job market
	"Industry" : "Галузь",
	"Minimum skill" : "Мінімальний навичок",


// region
	"Citizens" : "Громадяни",
	"Country - Society" : "Держава - Суспільство",
        "Heal" : "Полікуватися",
	"Constructions": "Споруди",
	"Population": "Населення",
	"Productivity" : "Продуктивність",
	"Resistance War" : "Повстання",
	"Resistance War Active" : "Активні повстання",
	"You can't start a resistance war in this region because it already belongs to its original owner  country" : "Ви не можете розпочати повстання в цьому регіоні, так як цей регіон історично належить цій державі",
	"Medium" : "Середній",
	"High": "Високий",
	"Neighbors" : "Сусіди",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Виберіть галузь, щоб переглянути пропозиції на ринку",
	"Skill Level" : "Рівень навички",
	"All skills" : "Всі навички",
	"All" : "Всі",
// politics
	"Country Administration" : "Державна адміністрація",
	"Accepted" : "Прийняті",
	"Rejected" : "Відхилені",
	"Pending" : "В очікуванні",
	"Congress" : "Конгрес",
	"Issue Money" : "Друк грошей",
	"Law proposals" : "Законопроекти",
	"Minimum Wage" : "Мінімальна заробітня плата",
	"Mutual Protection Pact" : "Договір обопільного ненападу (MPP)",
	"Alliance" : "Альянс",
	"New Citizen Fee" : "Оплата нового громадянина",
	"Peace Proposal" : "Пропозиції миру",
	"President" : "Президент",
	"Yes" : "Так",
	"No" : "Ні",
	"Show all law proposals" : "Показати всі законопроекти на голосуванні",
	"The law voting process takes 24 hours." : "Голосування за законопроект триває 24 години.",
	"Only congress members and country presidents have the right to vote." : "Tільки учасники конгресу та президент держави можуть голосувати.",
	"You are not a president or a congress member in this country." : "Ви не є президентом чи учасником конгресу в цій державі.",
// wars
	"no allies" : "немає альянсів",
	"All wars" : "Всі війни",
	"Active resistance wars in " : "Активні повстання у ",
	"All resistance wars" : "Всі повстання",
	"All Alliances" : "Всі альянси",
	"Alliances" : "Альянси",
	"Military force" : "Військова сила",
	"Average strength" : "Середня сила",
	"War > Battlefield" : "Війна > Поле бою",
	"Basic damage" : "Базове пошкодження",
	"Weapon quality" : "Рівень зброї",
	"Wellness" : "Здоровя",
	"Rank" : "Звання",
	"Total damage" : "Загальне пошкодження",
	
// army
	"You have trained today. You can train again tomorrow." : "Ви тренувалися сьогодні. Наступне тренування зможете провести завтра.",
	"Force" : "Сила",
	"Military rank" : "Військове звання",
	"Military achievements" : "Військове досягнення",
	"Active wars list" : "Список активних війн",
	"Field Marshall" : "Фельдмаршал",
	"General" : "Генерал",
	"Colonel" : "Полковник",
	"Captain" : "Капітан",
	"Lieutenant" : "Лейтенант",
	"Sergeant" : "Сержант",
	"Corporal" : "Капрал",
	"Private" : "Рядовий",
	"Show active wars" : "Показати активні війни",
	"Start a Resistance War" : "Розпочати повстання",
	"You do not have the necessary amount of Gold to start a resistance war." : "Ви не маєте достатньої кількості золота, щоб розпочати повстання.",
	"You cannot join this fight because your country is not involved in the war" : "Ви не можете взяти участь в цій битві, так як ваша країна не причетна до цієї війни",
	"There are no resistance wars in this country." : "В цій державі немає повстань.",
	"until the region can be occupied or secured" : "допоки регіон буде захоплено чи відбито",
	"Attackable on President's decision" : "Вразливою на рішення президента",
	"Defense Points" : "Пункти оборони",
	"Go to Battlefield" : "Перейти до поля бою",
	"started on" : "початок ",
	"see finished battles" : "дивитися завершені битви",
	"show finished battles" : "показати завершені битви",
	"fights" : "удари",
	"Still active" : "Залишатися активним",
	"Wars list" : "Список битв",
	"War" : "Війна",
	"Battle history" : "Історія битви",
	"Fight" : "Битва",
	"Hero" : "Герой",
	"Started by" : "Розпочата ",
	"started by" : "розпочата ",
	"active battles" : "активні битви",
	//"Fight for resistance" : "",
	//"Fight for defenders" : "",
// party
	"All donations": "Всі пожертви",
	"Get more" : "Отримати більше",
	"Country presidency" : "Президент держави",
	"Winner" : "Переможець",
	"Next election in" : "Наступні вибори",
	"Next elections in" : "Наступні вибори",
	"No candidate proposed" : "Жодного кандидата",
	"candidates" : "кандидати",
	"Candidate" : "Кандидат",
	"days" : "днів",
	//"GOLD" : "GOLD",
	"Show results" : "Показати результат",
	"Show candidate list" : "Показати список кандидатів",
	"Show candidates list" : "Показати список кандидатів",
	"You are not a member of a party" : "Ви не є членом партії",
	"Join a party" : "Приєднатися до партії",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Ви можете приєднатися до партії на особистій сторінці партії або ж ви можете створити власну партію, якщо всі інші вам не підходять. Будучи членом партії ви можете стати конгресменом чи навіть президентом держави.",
	"Create new" : "Створити нову",
	"congress members" : "учасники конгресу",
	"of Congress" : "Конгресу",
	"Show proposed members of congress" : "Показати пропоновані кандидатури до конгресу",
	"Run for congress" : "Балотуватися в конгрес",
	"Join" : "Приєднатися",
	"See all members" : "Показати всіх учасників",
	"Donate Gold" : "Пожертвувати GOLD",
	"Members"  : "Учасники",
	"Orientation" : "Ідеологія",
	"Show all members" : "Показати всіх учасників",

	"Center" : "Центристи",
	"Anarchist" : "Анархісти",
	"Accounts" : "Екаунти",
	"Elections" : "Вибори",
	"Election results" : "Результати виборів",
	"Next elections" : "Наступні вибори",

	"Country Presidency" : "Президент держави",
	"Party presidency" : "Партійне керівництво",
	"Party President" : "Президент партії",
	"See results" : "Переглянути результат",
	"Expires tomorrow" : "Закінчується завтра",
	"No. of votes" : "Кількість голосів",
	"% of votes" : "% голосів",
	"No data available yet" : "Даних наразі немає",
	"Total votes" : "Загалом голосів: ",
	"Presence" : "Явка: ",
	"Election" : "Вибори",
	"Presidential elections" : "Вибори президента",
	"Congressional elections" : "Вибори конгресу",
	"Party elections" : "Партійні вибори",
	"Month/Year" : "Місяць/Рік",
/*

// articles
	"Report abuse" : "Поскаржитися",
	"today" : "сьогодні",
	"yesterday" : "вчора",
	"one hour ago" : "годину тому",
	"Unsubscribe" : "Відписатися",
	"Subscribe" : "Підписатися",
	"Article RSS" : "RSS-стрічкаИ",
	"Your comment" : "Ваш коментар",
	"View all comments" : "Всі коментарі",
	"Subscribe to comments" : "Підписатися на коментарі",
	"Unsubscribe to comments" : "Відписатися від коментарів",
	"Post a comment" : "Додати коментар",


// news
	"You do not have a newspaper" : "У вас немає газети",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the  eRepublik Wiki. Create your own newspaper." : "Газета це ефективний шлях для донесення своєї думки до громади eRepublik. Більше про це читайте у офіційній  eRepublik Wiki. Створіть свою власну газету.",


// profiles
	"Send message" : "Надіслати повідомлення",
	"Remove friend" : "Видалити з друзів",
	"Offer a gift" : "Надіслати подарунок",
	"Friends" : "Друзі",
	"Fights" : "Битви",
	"National Rank" : "Національний ранг",
	"Forfeit Points" : "Бали порушень",
	"ShareThis" : "Поширити це",
	"Assets" : "Активи",
	"Press director" : "Головний редактор",
	"Inventory" : "Інвентар",
	"Get Gold" : "Отримати GOLD",
	"Career" : "Карєра",
	"Bio" : "Біографія",
	"Employee" : "Місце роботи",
	"No political activity" : "Відсутня політична активність",
	"Wellness" : "Здоровя",
	"Level" : "Рівень",
	"xp points" : "пунктів досвіду",
	"Strength" : "Сила",
	"Experience" : "Досвід",
	"Skills" : "Навички",
	"Land" : "Видобування",
	"Manufacturing" : "Переробка",
	"eRepublik Birthday" : "День Народження",
	"Get Extra Storage" : "Отримати додаткове місце для зберігання інвентаря",
	"Party Member" : "Член партії",
	"No activity" : "Активність відсутня",
	"Total damage:" : "Загальне пошкодження:",
	"Hard Worker" : "Трудар",
	"Work for 30 days in a row" : "Працюй 30 днів підряд",
	"Congress Member" : "Представник конгресу",
	"Country President" : "Президент держави",
	"Win the Presidential elections" : "Виграй вибори президента",
	"Media Mogul" : "Медіа-магнат",
	"Reach 1000 subscribers to your newspaper" : "Отримай 1000 читачів своєї газети",
	"Battle Hero" : "Герой битви",
	"Reach the highest total damage in one battle" : "Завдай найбільше пошкоджень в бою",
	"Resistance Hero" : "Герой-повстанець",
	"Start a resistance war and liberate that region" : "Підніми повстання і звільни регіон",
	"Super Soldier" : "Супер-солдат",
	"Advanced 5 strength levels" : "Здобудь 5 рівнів сили",
	"Society Builder" : "Соціальний працівник",
	"Invite 10 people to eRepublik and help them reach level 6" : "Запроси 10 людей в гру і допоможи їм досягнути 6 рівня",
	"Check your unlocked features" : "Перевір можливі функції для розблокування",
	"Get Wellness" : "Отримати здоровя",
	"Achievements" : "Досягнення",
	"Edit profile" : "Редагувати профіль",
	"Edit Profile" : "Редагувати профіль",
	"Change residence" : "Змінити місце проживання",
	"Donations list" : "Список пожертв",
	
	"Your email here" : "Ваш e-mail",
	"Your birthday" : "Ваш День Народження",
	"Citizen Avatar" : "Аватарка громадянина",
	"Change password" : "Змінити пароль",

	"Worked 30 days in a row" : "Попрацюй 30 днів підряд",
	"Win the Congress elections": "Виграй вибори до конгресу",
// fight
	"Back to battlefield" : "Повернутися на поле бою",
	"Fight Again" : "Ще один удар",
	"Fight bonus" : "Бонуси бою",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in  again with your organization username and password." : "Щоб зайти в екаунт організації потрібно вийти з екаунту вашого громадянина і зайти ще раз в гру, використовуючи логін та пароль вашої організації.",
	"If your citizen account represents an organization (SO) created in the eRepublik beta version,  please send us a message using the Contact form (category: Others) so that we can officially change it to an  organization." : "",
	"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake  accounts and will be banned." : "",
	"My Organizations" : "Моя організація",
	"Logout" : "Вийти",
	"Organizations created by you:" : "Створені вами організації:",
	"You have not created any organization yet." : "Ви ще не створили жодної організації.",


// career-path
	"General manager" : "Генеральний директор",
	"Hard worker" : "Трудівник",


// ranking
	"No." : "Номер",
	"Hard worker" : "Трудівник",


// messages
        "Inbox" : "Вхідні",
	"Sent" : "Надіслані",
	"Alerts" : "Повідомлення",
	"Subscriptions" : "Підписки",
	"new article" : "нова стаття",
	"Write article" : "Написати статтю",
	"Edit newspaper details" : "Редагувати профіль газети",
	"Edit" : "Редагувати",
	"Delete" : "Видалити",
	"Read Message" : "Читати повідомлення",
	"Reply" : "Відповісти",
	"From" : "Від",
	"Back" : "Назад",
	"Picture" : "Картинка",
	"only JPG files allowed" : "тільки файли з роширенням JPG",
	"Publish" : "Публікації",
	"of" : " ",
	"Select all" : "Вибрати всі",
	"Select All" : "Вибрати всі",
	"Delete" : "Видалити",
	"Older" : "Старіші",
	"Newer" : "Новіші",
	"After 5 days the alerts are automatically deleted" : "Після 5 днів повідомлення видаляються автоматично",
	"Unsubscribe" : "Відписатися",
	"Weekly news" : "Тижневі новини",
	"Weekly mail presenting the top rated news, active wars, military events and top five countries in  eRepublik" : "Тижневі листи містять ТОП-новини, активні битви, військові події та ТОП-5 країн в  eRepublik",
	"show example" : "показати приклад",
	"Turn OFF" : "Вимкнути",
	"Turn ON" : "Увімкнути",


// flash menu
	"My places > Army" : "Моя сторінка > Армія",
	"My places > Party" : "Моя сторінка > Партія",
	"My places > Newspaper" : "Моя сторінка > Газета",
	"My places > Organizations" : "Моя сторінка > Організація",
	"My places > Advertising Department" : "Моя сторінка > Відділ реклами",
	"Create party" : "Створити партію",
	"Monetary Market" : "Валютний ринок",
	"Company market" : "Компанії на продаж",
	"Create company" : "Створити компанію",
	"Top Citizens" : "ТОП громадян",
	"Compose message" : "Написати повідомлення",
	"Shout something" : "Скажи щось",


// compose message
	"To" : "До: ",
	"Subject" : "Тема",
	"Message" : "Повідомлення",
	"Send" : "Надіслати",


// new company
	"Company details" : "Профіль компанії",
	"Company name" : "Назва компанії",
	"Company logo" : "Логотип компанії",
	"Disscusion area" : "Сторінка обговорення",
	"Create" : "Створити",
	"Choose industry" : "Вибрати галузь",
	"Please choose the industry" : "Виберіть будь ласка галузь.",


// monetary market
	"Exchange rate" : "Курс обміну",
	"Amount to buy" : "Купити на суму",
	"Rec exchange rate" : "Рекомендований курс обміну",
	"Sell" : "Продати",
	"Show my offers" : "Показати мої пропозиції",
	"Post new offer" : "Додати нову пропозицію",

// partija
	"Your account" : "Ваш екаунт: ",
	"Requirements" : "Потреби",
	"Cost" : "Вартість",
	"Party details" : "Деталі партії",
	"Party name" : "Назва партії",
	"Economical orientation" : "Економічна орієнтація",
	"Social orientation" : "Соціальна орієнтація",
	"Party logo" : "Логотип партії",
	"Disscusion area " : "Сторінка дискусій",
	"Create" : "Створити",
	"6-30 characters max" : "Від 6 до 30 знаків максимум",
	"Please choose your party`s economical orientation" : "Виберіть будь ласка економічну орієнтацію для вашої партії",
	"Please choose your party`s social orientation" : "Виберіть будь ласка соціальну орієнтацію для вашої партії",
	"Far-left" : "Ліворадикальна",
	"Center-left" : "Лівоцентристська",
	"Center" : "Центристська",
	"Center-right" : "Правоцентристська",
	"Far-right" : "Праворадикальна",
	"Totalitarian" : "Тоталітарна",
	"Authoritarian" : "Авторитарна",
	"Libertarian" : "Ліберальна",
	"Anarchist" : "Анархістська",


// invitations
	"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "Ви отримаєте 5 GOLD за кожного запрошеного гравця, який досягне 6 рівня. ",
	"Your personal invitation link" : "Ваш особистий лінк для запрошення нових гравців",
	"Post this link on forums, blogs, messenger status or send it by yourself via email. People that  register using your personal link will get you 5 Gold when they reach level 6." : "Розміщуйте цей лінк на форумах, блогах, у ваших статусах або ж надсилайте його через e-mail своїм друзям. Гравці, які зареєструються через цей лінк, принесуть вам 5 GOLD, коли досягнуть 6 рівня.",
	"Send email invite" : "Надіслати запрошення через e-mail",
	"Your name:" : "Ваше імя: ",
	"Your friend's email:" : "E-mail вашого товариша: ",
	"Use commas to separate multiple email addresses" : "Використовуйте коми для розділення кількох адрес ",
	"Invites status" : "Статус запрошення",
	"View the status of your invites and bonuses" : "Переглянути статуси ваших запрошень та бонусів",
	"Track invites" : "Переглянути запрошення",
	"Send invitation" : "Надіслати запрошення",
	"Add from address book" : "Додати з книги адрес",
	"Add from adressbook" : "Додати з книги адрес",
	"Yahoo username" : "Ваш нік в Yahoo",
	"Yahoo password" : "Ваш пароль в Yahoo",
	"GMail username" : "Ваш нік в GMail",
	"GMail password" : "Ваш пароль в GMail",
	"MSN username" : "Ваш нік в MSN",
	"MSN password" : "Ваш пароль в MSN",
	"AOL username" : "Ваш нік в AOL",
	"AOL password" : "Ваш пароль в AOL",
	"Get contacts" : "Отримати контакти",
	"* Your username and password will not be stored on this server." : "* Ваш логін та ваш пароль не зберігатимуться на ціьому сервері.",
	"Privacy" : "Конфіденційність",
	"Close" : "Закрити",


// menu	
	"Find out more" : "Знайти більше",
	"logout" : "вийти",


// tools
	"Badges" : "Банери",
	"Size:" : "Розмір:",
	"Code:" : "Код:",
	"Vectorial logo is available in the" : "Векторний логотип доступний у ",
	"Press" : "розділі для Преси",
	"section" : "",
	"Latest shouts" : "Останнє повідомлення",
	"Latest alliances" : "Останній альянс",
	"Latest wars" : "Остання війна",
	"Latest military events" : "Остання військова подія",


// dolno meni
	"Blog" : "Блог",
	"Shop" : "Крамниця",
	"Contact" : "Контакти",
	"Jobs" : "Робота",
	"Affiliates" : "Філії",
	"eRepublik Laws" : "Закони eRepublik",


// extras
	"from" : "від",
	"2 Gold" : "2 GOLD",
	"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to  buy additional features within eRepublik." : "ERepublik GOLD є основою для всіх місцевих віртуальних валют і може використовується для того, щоб придбати додаткові можливості в грі.",
	"Select amount" : "Виберіть суму",
	"Payments can be done in USD as well." : "Оплатити можна в доларах США.",
	"is a fictional currency used only in the eRepublik World." : " є віртуальною валютою, яка використовується виключно в грі eRepublik.",
	"I have read and agree with the" : "Я прочитав і я згідний з ",
	"You must read and agree with the Terms of service in order to complete your order." : "Ви повинні прочитати і погодитись з правилами, перед тим як зробити замовлення.",
	"Terms of Service" : "Правила",
	"Go to eRepublik" : "Повернутися до eRepublik"*/
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
//regexps["^(\\d*) allies(\\s*)$"] = "$1 ";
regexps["^Active wars in (.*)$"] = "Активні війни у $1";
//regexps["^Active resistance wars in (.*)$"] = "$1";
regexps["(\\s*)Expires in (\\d*) days"] = "Закінчується через: $2 днів";
//regexps["^(\\d*) days$"] = "$1 днів";
regexps["^(\\d*) comments$"] = "$1 коментарів";
regexps["^(\\d*) hour ago$"] = "$1 годину тому";
regexps["^(\\d*) hours ago$"] = "$1 годин тому";
regexps["^(\\d*) minutes ago$"] = "$1 хвилин тому";
regexps["^(\\d*) days ago$"] = "$1 днів тому";
regexps["^Regions \\((\\d*)\\)"] = "Регіони ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Друзі ($1)";
regexps["^(\\d*) months"] = "$1 місяців";
regexps["^Comments(.*)"] = "Коментарів $1";


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
addGlobalStyle('#menu ul li#menu1 a, #menu ul li#menu2 a, #menu ul li#menu3 a, #menu ul li#menu4 a, #menu ul  li#menu5 a, #logo a { background-image: url(http://img33.imageshack.us/img33/5638/maperepubliklogged.png); }');
addGlobalStyle('.btnGetExtraStorage { font-size: 10px; }');



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(3000, translateWholePage)
}, false);