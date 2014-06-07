// ==UserScript==
// @name        DobrijZmej RSI Russian [main]
// @namespace   https://robertsspaceindustries.com/
// @description Руссификация главной страницы сайта игры Star Citizen
// @include     https://robertsspaceindustries.com/*
// @version     1
// @grant       none
// ==/UserScript==

   var timerId = 0;
   var login_timerId = 0;
   var news_timerId = 0;

$.fn.zmejReplace = function(strFrom, strTo){
   if($(this).size()){
      return($(this).html($(this).html().replace(strFrom, strTo)));
   }
}


   $("*").each(function(i,elem){
      if($(elem).css("font-family").toLowerCase().indexOf('electrolize') >= 0){
         $(elem).css("font-family", "Verdana,Arial,Tahoma");
      }
   });

      // кнопки главного меню
   $("a[class~='navgroup'][href='/about-rsi'] span").html("О САЙТЕ");
   $("a[class~='navgroup'][href='/comm-link'] span").html("НОВОСТИ");
   $("a[class~='navgroup'][href='https://forums.robertsspaceindustries.com'] span").html("СООБЩЕСТВО");
   $("a[class~='navgroup'][href='/pledge'] span").html("ПОКУПКИ");
   $("a[class~='navgroup'][href='/account/settings'] span").html("КАБИНЕТ");

   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/about-rsi'] span").html("О САЙТЕ");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/comm-link'] span").html("НОВОСТИ");
   $("a[class~='navgroup'][href='/'] span").html("СООБЩЕСТВО");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/pledge'] span").html("ПОКУПКИ");
   $("a[class~='navgroup'][href='https://robertsspaceindustries.com/account/settings'] span").html("КАБИНЕТ");

      // подменю "О сайте"
   $("a[class~='subnav-link'][href='/about-rsi']").html("<span class='block trans-02s abs-overlay'></span>О КОМПАНИИ");
   $("a[class~='subnav-link'][href='/press']").html("<span class='block trans-02s abs-overlay'></span>В ПРЕССЕ");
   $("a[class~='subnav-link'][href='/funding-goals']").html("<span class='block trans-02s abs-overlay'></span>ЦЕЛИ ФИНАНСИРОВАНИЯ");
   //$("a[class~='subnav-link'][href='']").html("<span class='block trans-02s abs-overlay'></span>КОМАНДА")

   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/about-rsi']").html("<span class='block trans-02s abs-overlay'></span>О КОМПАНИИ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/press']").html("<span class='block trans-02s abs-overlay'></span>В ПРЕССЕ");
   $("a[class~='subnav-link'][href='https://robertsspaceindustries.com/funding-goals']").html("<span class='block trans-02s abs-overlay'></span>ЦЕЛИ ФИНАНСИРОВАНИЯ");

      // подменю "Новости"
   $("a[class~='subnav-link'][href='/comm-link']").html("<span class='block trans-02s abs-overlay'></span>ВСЕ");
   $("a[class~='subnav-link'][href='/comm-link/transmission']").html("<span class='block trans-02s abs-overlay'></span>ТРАНСЛЯЦИИ");
   $("a[class~='subnav-link'][href='/comm-link/citizens']").html("<span class='block trans-02s abs-overlay'></span>ОТ ГРАЖДАН");
   $("a[class~='subnav-link'][href='/comm-link/engineering']").html("<span class='block trans-02s abs-overlay'></span>ОТ ИНЖЕНЕРОВ");
   //$("a[class~='subnav-link'][href='/comm-link/spectrum-dispatch']").html("<span class='block trans-02s abs-overlay'></span>")

      // подменю "Сообщество"
   $("a[class~='subnav-link'][href='https://forums.robertsspaceindustries.com']").html("<span class='block trans-02s abs-overlay'></span>ФОРУМ");
   $("a[class~='subnav-link'][href='/community/chat']").html("<span class='block trans-02s abs-overlay'></span>ЧАТ");
   $("a[class~='subnav-link'][href='/contest/the-next-great-starship']").html("<span class='block trans-02s abs-overlay'></span>ВЕЛИКОЛЕПНЫЙ КОСМОЛЁТ");

      // подменю "Покупки"
   $("a[class~='subnav-link'][href='/pledge']").html("<span class='block trans-02s abs-overlay'></span>ПЛЕДЖИ");

      // подменю "Star Citizen"
   $("a[class~='subnav-link'][href='/about-the-game']").html("<span class='block trans-02s abs-overlay'></span>ОБ ИГРЕ");
   $("a[class~='subnav-link'][href='/ship-specs']").html("<span class='block trans-02s abs-overlay'></span>ПАРАМЕТРЫ КОРАБЛЕЙ");
   $("a[class~='subnav-link'][href='/hangar-module']").html("<span class='block trans-02s abs-overlay'></span>МОДУЛЬ АНГАРА");

      // подменю "Кабинет"
   $("a[class~='subnav-link'][href='/account/settings']").html("<span class='block trans-02s abs-overlay'></span>НАСТРОЙКИ");
   $("a[class~='subnav-link'][href='/account/pledges']").html("<span class='block trans-02s abs-overlay'></span>МОЙ АНГАР");
   $("a[class~='subnav-link'][href='/account/billing']").html("<span class='block trans-02s abs-overlay'></span>БИЛИНГ И ПОДПИСКИ");
   $("a[class~='subnav-link'][class~='signout'][href='']").html("<span class='block trans-02s abs-overlay'></span>ВЫЙТИ");
   //$("div.myrsi-subnav-ident span.credits:nth(0)").html($("div.myrsi-subnav-ident span.credits:nth(0)").html().replace("STORE CREDITS", "ДЛЯ ПЛЕДЖЕЙ"));


   function setNews(){
      // спсиок новостей на главной --------------------------------------------------------------------------------------------------------
      clearTimeout(news_timerId);

   $("a[class~='trans-03s'][href='/comm-link/transmission/13293-Galactic-Guide-Hangar-Manufacturers']").html("Галактическое руководство: Производители ангаров");
   $("div[rel='13293'] div.text p:nth(1)").html("Узнайте больше о компаниях, которые создают ангары в Star Citizen!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13293-Galactic-Guide-Hangar-Manufacturers'] div.title").html("Галактическое руководство: Производители ангаров");
   $("a[class~='hub-block'][href='/comm-link/transmission/13293-Galactic-Guide-Hangar-Manufacturers'] div.body p").html("Узнайте больше о компаниях, которые создают ангары в Star Citizen!");

   $("a[class~='trans-03s'][href='/comm-link/transmission/13278-Galactic-Guide-Kilian-System']").html("Обзор галактики: Система Килиан");
   $("div[rel='13278'] div.text p:nth(1)").html("Узнайте больше о военной базе ОЗИ, где планируются все операции.");
   $("a[class~='hub-block'][href='/comm-link/transmission/13278-Galactic-Guide-Kilian-System'] div.title").html("Обзор галактики: Система Килиан");
   $("a[class~='hub-block'][href='/comm-link/transmission/13278-Galactic-Guide-Kilian-System'] div.body p").html("Узнайте больше о военной базе ОЗИ, где планируются все операции.");

   $("a[class~='trans-03s'][href='/comm-link/transmission/13276-Hangar-Patch-And-Caterpillar-Sale']").html("Патч ангара и продажи Caterpillar");
   $("div[rel='13276'] div.text p:nth(1)").html('Мы выпустили патч для модуля "Ангар".');
   $("a[class~='hub-block'][href='/comm-link/transmission/13276-Hangar-Patch-And-Caterpillar-Sale'] div.title").html("Патч ангара и продажи Caterpillar");
   $("a[class~='hub-block'][href='/comm-link/transmission/13276-Hangar-Patch-And-Caterpillar-Sale'] div.body p").html('Мы выпустили патч для модуля "Ангар".');

   $("a[class~='trans-03s'][href='/comm-link/transmission/13271-A-Look-Inside-The-Pirate-Ships']").html("Взгляд на пиратский корабль изнутри");
   $("div[rel='13271'] div.text p:nth(1)").html("Интерьеры кораблей, которые разрабатываются для Drake Interplanetary Cutlass и Caterpillar!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13271-A-Look-Inside-The-Pirate-Ships'] div.title").html("Взгляд на пиратский корабль изнутри");
   $("a[class~='hub-block'][href='/comm-link/transmission/13271-A-Look-Inside-The-Pirate-Ships'] div.body p").html("Интерьеры кораблей, которые разрабатываются <BR />для Drake Interplanetary Cutlass и Caterpillar!");

   $("a[class~='trans-03s'][href='/comm-link/transmission/13280-AMD-Livestream-And-Press-Roundup']").html("Трансляция AMD и обзор прессы");
   $("div[rel='13280'] div.text p:nth(1)").html("Крис Робертс завтра будет в прямом эфире!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13280-AMD-Livestream-And-Press-Roundup'] div.title").html("Трансляция AMD и обзор прессы");
   $("a[class~='hub-block'][href='/comm-link/transmission/13280-AMD-Livestream-And-Press-Roundup'] div.body p").html("Крис Робертс завтра будет в прямом эфире!");

   $("a[class~='trans-03s'][href='/comm-link/transmission/13284-Letter-From-The-Chairman-20-Million']").html("Письмо от председателя: 20 миллионов!");
   $("div[rel='13284'] div.text p:nth(1)").html("Фаны Star Citizen достигли очередного рекорда финансирования...");
   $("a[class~='hub-block'][href='/comm-link/transmission/13284-Letter-From-The-Chairman-20-Million'] div.title").html("Письмо от председателя: 20 миллионов!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13284-Letter-From-The-Chairman-20-Million'] div.body p").html("Фаны Star Citizen достигли очередного рекорда финансирования...");

   $("a[class~='trans-03s'][href='/comm-link/transmission/13288-Multiple-Package-Clarification']").html("Разъяснения о мультипакетах");
   $("div[rel='13288'] div.text p:nth(1)").html("Как отреагирует Star Citizen, если я куплю несколько стартовых пакетов?");
   $("a[class~='hub-block'][href='/comm-link/transmission/13288-Multiple-Package-Clarification'] div.title").html("Разъяснения о мультипакетах");
   $("a[class~='hub-block'][href='/comm-link/transmission/13288-Multiple-Package-Clarification'] div.body p").html("Как отреагирует Star Citizen, если я куплю несколько стартовых пакетов?");


   $("a[class~='trans-03s'][href='/comm-link/transmission/13324-Letter-From-The-Chairman-23-Million']").html("Письмо от председателя: 23 миллиона!");
   $("div[rel='13324'] div.text p:nth(1)").html("Вкладчики Star Citizen преодолели очередной рекорд сборов!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13324-Letter-From-The-Chairman-23-Million'] div.title").html("Письмо от председателя: 23 миллиона!");
   $("a[class~='hub-block'][href='/comm-link/transmission/13324-Letter-From-The-Chairman-23-Million'] div.body p").html("Вкладчики Star Citizen преодолели очередной рекорд сборов!");

      // спсиок новостей на главной ---- КАПСУЛА ВРЕМЕНИ -----------------------------------------------------------------------------------
   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12664-2075-The-Stars-Get-A-Little-Closer']").html("2075: Звёзды становятся чуть ближе");
   $("div[rel='12664'] div.text p:nth(1)").html("Утро 3 мая 2075 года началось как обычно. Ребекка Чайлдресс раскрашивала, сидя за обеденным столом, пока мама смотрела утренние новости.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12664-2075-The-Stars-Get-A-Little-Closer'] div.title").html("2075: Звёзды становятся чуть ближе");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12664-2075-The-Stars-Get-A-Little-Closer'] div.body p").html("Утро 3 мая 2075 года началось как обычно. Ребекка Чайлдресс раскрашивала, сидя за обеденным столом, пока мама смотрела утренние новости.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12668-2113-When-Do-We-Go-Too-Far']").html("2113: Когда мы выйдем за грань?");
   $("div[rel='12668'] div.text p:nth(1)").html("Редакционный архив United Times. Опубликовано: 21 августа 2113 года. НАЧАЛО ФАЙЛА...");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12668-2113-When-Do-We-Go-Too-Far'] div.title").html("2113: Когда мы выйдем за грань?");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12668-2113-When-Do-We-Go-Too-Far'] div.body p").html("Редакционный архив United Times. Опубликовано: 21 августа 2113 года. НАЧАЛО ФАЙЛА...");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12670-2120-Give-These-People-Air']").html("2120: Подарите людям воздух");
   $("div[rel='12670'] div.text p:nth(1)").html("Спустя годы моделирования и тестов, правительства со всего мира объединили свои знания и ресурсы в попытке первого планетарного преобразования. Тестовый объект: Марс.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12670-2120-Give-These-People-Air'] div.title").html("2120: Подарите людям воздух");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12670-2120-Give-These-People-Air'] div.body p:nth(0)").html("Спустя годы моделирования и тестов, правительства со всего мира объединили свои знания и ресурсы в попытке первого планетарного преобразования.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12670-2120-Give-These-People-Air'] div.body p:nth(1)").html("Тестовый объект: Марс.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12672-2125-A-Dark-Day']").html("2125: День скорби");
   $("div[rel='12672'] div.text p:nth(1)").html("Сегодня чёрный день. В описаниях о стремлении развивать человечество, учебники истории обычно прославляют смелых мужчин и женщин, достигающих успеха.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12672-2125-A-Dark-Day'] div.title").html("2125: День скорби");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12672-2125-A-Dark-Day'] div.body p:nth(0)").html("Сегодня чёрный день. В описаниях о стремлении развивать человечество, учебники истории обычно прославляют смелых мужчин и женщин, достигающих успеха.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12674-2140-A-Ship-In-Every-Garage']").html("2140: Корабль в каждом гараже");
   $("div[rel='12674'] div.text p:nth(1)").html("Не смотря на то, что наша солнечная система стала более доступной, благодаря созданию Квантового двигателя RSI, путешествия по ней всё ещё остаются прерогативой правительств, растущих флотов корпораций и миллиардеров.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12674-2140-A-Ship-In-Every-Garage'] div.title").html("2140: Корабль в каждом гараже");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12674-2140-A-Ship-In-Every-Garage'] div.body p:nth(0)").html("Не смотря на то, что наша солнечная система стала более доступной, благодаря созданию Квантового двигателя RSI, путешествия по ней всё ещё остаются прерогативой правительств, растущих флотов корпораций и миллиардеров.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12675-2157-Blue-Skies-On-Mars']").html("2157: Голубое небо Марса");
   $("div[rel='12675'] div.text p:nth(1)").html("Спустя почти сорок лет проб и ошибок, атмосфера Марса официально признана кислородосодержащей. Всем тем, кто пережил Великую Трагедию Марса 25-го, будет открыт мемориал после официального заявления, главным докладчиком которого выступит Сенатор Стефен Нгуен.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12675-2157-Blue-Skies-On-Mars'] div.title").html("2157: Голубое небо Марса");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12675-2157-Blue-Skies-On-Mars'] div.body p:nth(0)").html("Спустя почти сорок лет проб и ошибок, атмосфера Марса официально признана кислородосодержащей. Всем тем, кто пережил Великую Трагедию Марса 25-го, будет открыт мемориал после официального заявления, главным докладчиком которого выступит Сенатор Стефен Нгуен.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12676-2214-The-March-Of-Progress']").html("2214: Марш прогресса");
   $("div[rel='12676'] div.text p:nth(1)").html("Когда RSI сообщили о создании двигателя следующего поколения на основе синтеза, то в области космических путешествий открылись новые, захватывающие перспективы, однако не все восприняли это с энтузиазмом.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12676-2214-The-March-Of-Progress'] div.title").html("2214: Марш прогресса");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12676-2214-The-March-Of-Progress'] div.body p:nth(0)").html("Когда RSI сообщили о создании двигателя следующего поколения на основе синтеза, то в области космических путешествий открылись новые, захватывающие перспективы, однако не все восприняли это с энтузиазмом.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12680-2232-The-First-Push']").html("2232: Первый рывок");
   $("div[rel='12680'] div.text p:nth(1)").html("Артемида была воплощением мечты. Когда было опубликовано заявление о том, что корабль строится с целью полёта к ближайшей, потенциально обитаемой, планете, общественность встрепенулась.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12680-2232-The-First-Push'] div.title").html("2232: Первый рывок");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12680-2232-The-First-Push'] div.body p:nth(0)").html("Артемида была воплощением мечты. Когда было опубликовано заявление о том, что корабль строится с целью полёта к ближайшей, потенциально обитаемой, планете, общественность встрепенулась.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12682-2262-The-Neso-Triangle']").html("2262: Треугольник Несо");
   $("div[rel='12682'] div.text p:nth(1)").html("Космос становится оживлённым местом. Все типы кораблей - федеральные, коммерческие и частные занимаются изучением границ Солнечной системы.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12682-2262-The-Neso-Triangle'] div.title").html("2262: Треугольник Несо");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12682-2262-The-Neso-Triangle'] div.body p:nth(0)").html("Космос становится оживлённым местом. Все типы кораблей - федеральные, коммерческие и частные занимаются изучением границ Солнечной системы.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man']").html("2271: Один маленький прыжок для человека");
   $("div[rel='12685'] div.text p:nth(1)").html('Обзор фильма "Прыгун"<BR />США/Цвет/123мин<BR />Кевин Лазарус');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man'] div.title").html("2271: Один маленький прыжок для человека");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man'] div.body p:nth(0)").html('Обзор фильма "Прыгун"');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man'] div.body p:nth(1)").html('США/Цвет/123мин');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man'] div.body p:nth(2)").html('Обзор фильма "Прыгун"<BR />США/Цвет/123мин<BR />Кевин Лазарус');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12687-2380-Together-We-Rise']").html("2380: Вместе мы победим");
   $("div[rel='12687'] div.text p:nth(1)").html("Человечество развивалось со всеми удобствами.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12687-2380-Together-We-Rise'] div.title").html("2380: Вместе мы победим");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12687-2380-Together-We-Rise'] div.body p:nth(0)").html("Человечество развивалось со всеми удобствами.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12690-2438-Hello']").html("2438: Привет");
   $("div[rel='12690'] div.text p:nth(1)").html("Из архива United Times<BR />Впервые издано: 12 января 2438<BR />Шелли Филд");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12690-2438-Hello'] div.title").html("2438: Привет");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12690-2438-Hello'] div.body p:nth(0)").html("Из архива United Times");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12690-2438-Hello'] div.body p:nth(1)").html("Впервые издано: 12 января 2438");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12690-2438-Hello'] div.body p:nth(2)").html("Шелли Филд");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12691-2460-Breathe-Free']").html("2460: Дышите свободно");
   $("div[rel='12691'] div.text p:nth(1)").html("Земля перенаселена.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12691-2460-Breathe-Free'] div.title").html("2460: Дышите свободно");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12691-2460-Breathe-Free'] div.body p:nth(0)").html("Земля перенаселена.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12692-2516-A-Better-Earth']").html("2516: Новая Земля");
   $("div[rel='12692'] div.text p:nth(1)").html("К 2516-му году ОНЗ расширился до 12-ти систем. Пока что прыжковые точки позволяли достичь крайних систем довольно быстро, но Земля начала ощущать себя очень далеко.");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12692-2516-A-Better-Earth'] div.title").html("2516: Новая Земля");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12692-2516-A-Better-Earth'] div.body p:nth(0)").html("К 2516-му году ОНЗ расширился до 12-ти систем. Пока что прыжковые точки позволяли достичь крайних систем довольно быстро, но Земля начала ощущать себя очень далеко.");

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12695-2523-The-Three-Pillars']").html("2523: Три столпа");
   $("div[rel='12695'] div.text p:nth(1)").html('Добро пожаловать на программу "Актуальные вопросы" на канале "Spectrum". Наши гости: политический аналитик Кайл Блек, писательница Шелди Чен и футурист Бен Феллер. Приходит время для ещё одной... НОВОСТИ!');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12695-2523-The-Three-Pillars'] div.title").html("2523: Три столпа");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12695-2523-The-Three-Pillars'] div.body p:nth(0)").html('Добро пожаловать на программу "Актуальные вопросы" на канале "Spectrum". Наши гости: политический аналитик Кайл Блек, писательница Шелди Чен и футурист Бен Феллер. Приходит время для ещё одной... НОВОСТИ!');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12697-2530-The-Galaxy-Gets-Bigger']").html("2530: Галактика расширяется");
   $("div[rel='12697'] div.text p:nth(1)").html('Это было очень похоже на золотую лихорадку, охотники за планетами отчаянно старались закрепить за собой права на неисследованные миры. Большая часть соблюдала Федеральный Протокол, но не все.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12697-2530-The-Galaxy-Gets-Bigger'] div.title").html("2530: Галактика расширяется");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12697-2530-The-Galaxy-Gets-Bigger'] div.body p:nth(0)").html('Это было очень похоже на золотую лихорадку, охотники за планетами отчаянно старались закрепить за собой права на неисследованные миры. Большая часть соблюдала Федеральный Протокол, но не все.');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12700-2541-Awfully-Crowded-In-My-Sky']").html("2541: В небе становится тесно");
   $("div[rel='12700'] div.text p:nth(1)").html('После установки довольно прохладных отношений с Зи’Ан в восточном регионе недалеко от Терры, западные системы Земли сохраняли единство. Однако, это продолжалось не долго.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12700-2541-Awfully-Crowded-In-My-Sky'] div.title").html("2541: В небе становится тесно");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12700-2541-Awfully-Crowded-In-My-Sky'] div.body p:nth(0)").html('После установки довольно прохладных отношений с Зи’Ан в восточном регионе недалеко от Терры, западные системы Земли сохраняли единство. Однако, это продолжалось не долго.');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12702-2546-A-Leader-Rises']").html("2546: Появление лидера");
   $("div[rel='12702'] div.text p:nth(1)").html('Алиса Джамали опаздывала. Она уснула, пока работала над домашним заданием по химии, а сейчас на бегу диктовала своё мульти-научное задание по пути в класс.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12702-2546-A-Leader-Rises'] div.title").html("2546: Появление лидера");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12702-2546-A-Leader-Rises'] div.body p:nth(0)").html('Алиса Джамали опаздывала. Она уснула, пока работала над домашним заданием по химии, а сейчас на бегу диктовала своё мульти-научное задание по пути в класс.');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire']").html("2610: Слёзы огня");
   $("div[rel='12705'] div.text p:nth(1)").html('Национальная галерея Бентли');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.title").html("2610: Слёзы огня");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.body p:nth(0)").html('Национальная галерея Бентли');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.body p:nth(1)").html('Информация Self-Tour Painting');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.body p:nth(2)").html('Произведение: «Слёзы огня»');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.body p:nth(3)").html('Автор: Аарон Фринг');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.body p:nth(4)").html('Год создания: 2610');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty']").html("2638: Призыв к независимости");
   $("div[rel='12706'] div.text p:nth(1)").html('Terra Gazette – выпуск от 12.03.38');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty'] div.title").html("2638: Призыв к независимости");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty'] div.body p:nth(0)").html('Terra Gazette – выпуск от 12.03.38');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty'] div.body p:nth(1)").html('Губернатор Терры пишет проект закона о независимости');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty'] div.body p:nth(2)").html('Виола Филлер');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12707-2681-Scorched-Earth']").html("2681: Выжженная земля");
   $("div[rel='12707'] div.text p:nth(1)").html('На западе, в системе Орион, потеряна связь с небольшим поселением третьего мира. Прежде, чем кто-нибудь попытался с ними связаться, прошло несколько недель. И когда им удалось это сделать, то они увидели лишь город, наполненный пеплом. Агенты Защитника были немедленно отправлены для расследования.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12707-2681-Scorched-Earth'] div.title").html("2681: Выжженная земля");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12707-2681-Scorched-Earth'] div.body p:nth(0)").html('На западе, в системе Орион, потеряна связь с небольшим поселением третьего мира. Прежде, чем кто-нибудь попытался с ними связаться, прошло несколько недель. И когда им удалось это сделать, то они увидели лишь город, наполненный пеплом. Агенты Защитника были немедленно отправлены для расследования.');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12710-2758-Not-In-Nottingham']").html("2758: Не в Ноттингеме");
   $("div[rel='12710'] div.text p:nth(1)").html('Граждане Боро думали, что они готовы ко всему. Орбитальная защита, глубокие сканеры и автоматические блокираторы были готовы к действию. Со всем этим они чувствовали себя в безопасности. Но когда нападает банда Вандуул, этого недостаточно.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12710-2758-Not-In-Nottingham'] div.title").html("2758: Не в Ноттингеме");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12710-2758-Not-In-Nottingham'] div.body p:nth(0)").html('Граждане Боро думали, что они готовы ко всему. Орбитальная защита, глубокие сканеры и автоматические блокираторы были готовы к действию. Со всем этим они чувствовали себя в безопасности. Но когда нападает банда Вандуул, этого недостаточно.');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12712-2789-A-Cold-War-Thaws']").html("2789: Оттепель в холодной войне");
   $("div[rel='12712'] div.text p:nth(1)").html('33-й флот ОЗИ, Крыло C, SS LightHammer');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12712-2789-A-Cold-War-Thaws'] div.title").html("2789: Оттепель в холодной войне");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12712-2789-A-Cold-War-Thaws'] div.body p:nth(0)").html('33-й флот ОЗИ, Крыло C, SS LightHammer');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12712-2789-A-Cold-War-Thaws'] div.body p:nth(1)").html('29 мая 2789 года');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12715-2792-The-Tide-Rises']").html("2792: Волна накатывает");
   $("div[rel='12715'] div.text p:nth(1)").html('ДЕНЬ ПЕРВЫЙ, ЧАС ПЕРВЫЙ');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12715-2792-The-Tide-Rises'] div.title").html("2792: Волна накатывает");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12715-2792-The-Tide-Rises'] div.body p:nth(0)").html('ДЕНЬ ПЕРВЫЙ, ЧАС ПЕРВЫЙ');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12715-2792-The-Tide-Rises'] div.body p:nth(1)").html('Вечерние новости SSN/CAtv');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12717-2795-A-Kinder-Gentler-Human']").html("2795: Человек добрый и нежный");
   $("div[rel='12717'] div.text p:nth(1)").html('Закон справедливости');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12717-2795-A-Kinder-Gentler-Human'] div.title").html("2795: Человек добрый и нежный");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12717-2795-A-Kinder-Gentler-Human'] div.body p:nth(0)").html('Закон справедливости');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12720-2800-The-Neutral-Zone']").html("2800: Нейтральная зона");
   $("div[rel='12720'] div.text p:nth(1)").html('На рассвете XXIX века, новоизбранный Император Маршал Леон, пригласил представителей Империи Зи’Ан, Протектората Бану, а также  делегацию Теваринов на торжественное празднование на орбитальной платформе...');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12720-2800-The-Neutral-Zone'] div.title").html("2800: Нейтральная зона");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12720-2800-The-Neutral-Zone'] div.body p:nth(0)").html('На рассвете XXIX века, новоизбранный Император Маршал Леон, пригласил представителей Империи Зи’Ан, Протектората Бану, а также  делегацию Теваринов на торжественное празднование на орбитальной платформе...');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus']").html("2872: Созерцание Сизифа");
   $("div[rel='12721'] div.text p:nth(1)").html('Архив нового объединённого NewsOrg');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus'] div.title").html("2872: Созерцание Сизифа");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus'] div.body p:nth(0)").html('Архив нового объединённого NewsOrg');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus'] div.body p:nth(1)").html('Опубликовано: 5 марта 2872 года');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus'] div.body p:nth(2)").html('«Синтетический мир»');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit']").html("2920: Денежная яма");
   $("div[rel='12722'] div.text p:nth(1)").html('Архив Terra Gazette');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.title").html("2920: Денежная яма");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.body p:nth(0)").html('Архив Terra Gazette');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.body p:nth(1)").html('Впервые опубликовано: 38 мая 2920 года');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.body p:nth(2)").html('РАЗДЕЛ РЕДАКЦИИ');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.body p:nth(2)").html('«Финансовая прыжковая точка»');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12725-2928-Campaign-Promises']").html("2928: Предвыборные обещания");
   $("div[rel='12725'] div.text p:nth(1)").html('Кому: Подкомитет ОЗИ по утверждению кандидатур Предвыборная агитация Келоса Костигана Время: 30 секунд Коммерческий тип: A/V/NPS РОЛИК НАЧИНАЕТСЯ. Картинка и голос за кадром:');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12725-2928-Campaign-Promises'] div.title").html("2928: Предвыборные обещания");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12725-2928-Campaign-Promises'] div.body p:nth(0)").html('Кому: Подкомитет ОЗИ по утверждению кандидатур Предвыборная агитация Келоса Костигана Время: 30 секунд Коммерческий тип: A/V/NPS РОЛИК НАЧИНАЕТСЯ. Картинка и голос за кадром:');

   $("a[class~='trans-03s'][href='/comm-link/spectrum-dispatch/12727-2934-A-Dreamer-Dreams']").html("2934: Мечты мечтателя");
   $("div[rel='12727'] div.text p:nth(1)").html('На этой неделе я читал «Горящее небо». Книга действительно отличная. Она рассказывает об удивительной Эскадрилье 42. События разворачиваются в 2910 году, когда корабли Вандуул напали на их авианосец. В роли главного персонажа - сержант Терренс Нолан. Он родом из маленького городка на Элизии, похожего на городок моего кузена.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12727-2934-A-Dreamer-Dreams'] div.title").html("2934: Мечты мечтателя");
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12727-2934-A-Dreamer-Dreams'] div.body p:nth(0)").html('На этой неделе я читал «Горящее небо». Книга действительно отличная. Она рассказывает об удивительной Эскадрилье 42. События разворачиваются в 2910 году, когда корабли Вандуул напали на их авианосец. В роли главного персонажа - сержант Терренс Нолан. Он родом из маленького городка на Элизии, похожего на городок моего кузена.');

   $("div[rel='12729'] div.text p:nth(1)").html('Сегодняшний день.');
   $("a[class~='hub-block'][href='/comm-link/spectrum-dispatch/12729-2942'] div.body h3:nth(0)").html('Сегодняшний день.');

//   alert($("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12664-2075-The-Stars-Get-A-Little-Closer'] div.title:nth(0)").html());
      // карусель Капсулы времени
   if($("div.channel-banner a.holobtn[href='/comm-link?series=time-capsule']").size()){
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12664-2075-The-Stars-Get-A-Little-Closer'] div.title").html('2075: Звёзды немного ближе');

      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12668-2113-When-Do-We-Go-Too-Far'] div.title").html('2113: Когда мы выйдем за грань?');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12670-2120-Give-These-People-Air'] div.title").html('2120: Подарите людям воздух');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12672-2125-A-Dark-Day'] div.title").html('2125: День скорби');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12674-2140-A-Ship-In-Every-Garage'] div.title").html('2140: Корабль в каждом гараже');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12675-2157-Blue-Skies-On-Mars'] div.title").html('2157: Голубое небо Марса');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12676-2214-The-March-Of-Progress'] div.title").html('2214: Марш прогресса');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12680-2232-The-First-Push'] div.title").html('2232: Первый рывок');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12682-2262-The-Neso-Triangle'] div.title").html('2262: Треугольник Несо');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12685-2271-One-Small-Jump-For-Man'] div.title").html('2271: Один маленький прыжок для человека');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12687-2380-Together-We-Rise'] div.title").html('2380: Вместе мы победим');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12690-2438-Hello'] div.title").html('2438: Привет');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12691-2460-Breathe-Free'] div.title").html('2460: Дышите свободно');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12692-2516-A-Better-Earth'] div.title").html('2516: Новая Земля');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12695-2523-The-Three-Pillars'] div.title").html('2523: Три столпа');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12697-2530-The-Galaxy-Gets-Bigger'] div.title").html('2530: Галактика расширяется');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12700-2541-Awfully-Crowded-In-My-Sky'] div.title").html('2541: В небе становится тесно');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12702-2546-A-Leader-Rises'] div.title").html('2546: Появление лидера');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12705-2610-Tears-Of-Fire'] div.title").html('2610: Слёзы огня');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12706-2638-A-Call-For-Sovereignty'] div.title").html('2638: Призыв к независимости');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12707-2681-Scorched-Earth'] div.title").html('2681: Выжженная земля');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12710-2758-Not-In-Nottingham'] div.title").html('2758: Не в Ноттингеме');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12712-2789-A-Cold-War-Thaws'] div.title").html('2789: Оттепель в холодной войне');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12715-2792-The-Tide-Rises'] div.title").html('2792: Волна накатывает');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12717-2795-A-Kinder-Gentler-Human'] div.title").html('2795: Человек добрый и нежный');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12720-2800-The-Neutral-Zone'] div.title").html('2800: Нейтральная зона');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12721-2872-Behold-Sisyphus'] div.title").html('2872: Созерцание Сизифа');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12722-2920-The-Money-Pit'] div.title").html('2920: Денежная яма');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12725-2928-Campaign-Promises'] div.title").html('2928: Предвыборные обещания');
      $("a.series-carousel-item[href='/comm-link/spectrum-dispatch/12727-2934-A-Dreamer-Dreams'] div.title").html('2934: Мечты мечтателя');
     }


   }


      // главная страница, раздел финансирования
   if(window.location.toString().toLowerCase() == 'https://robertsspaceindustries.com/'){
      $("div.funds-raised div.label:nth(0)").html('СОБРАНО');
      $("div.fans.number-block div.label").html('ГРАЖДАН');
      $(".number-counter div.digits span.append").html('&nbsp; свободно');
      $("a.with-connector span.holobtn-top").html('Бронировать Альфа-слот');
      $(("#crowdfunding-stats div.header h1:nth(0)")).html($(("#crowdfunding-stats div.header h1:nth(0)")).html().replace("NEXT STRETCHGOAL", "СЛЕДУЮЩАЯ ЦЕЛЬ"));
      $(("#crowdfunding-stats div.header h1:nth(1)")).html($(("#crowdfunding-stats div.header h1:nth(1)")).html().replace("Crowdfunding Timeline", "Прогресс пожертвований"));
      $(("#crowdfunding-stats div.progress")).html($(("#crowdfunding-stats div.progress")).html().replace("PROGRESS:", "ПРОГРЕСС:"));
      $("#crowdfunding-stats div.auto-refresh span:nth(0)").html('ОБНОВЛЕНИЕ:');
      $("#crowdfunding-stats div.auto-refresh span:nth(1)").html('Нет');
      $("#crowdfunding-stats div.auto-refresh span:nth(2)").html('Да');
      $("#crowdfunding-stats div.timeline a.trans-03s:nth(0)").html('Часы');
      $("#crowdfunding-stats div.timeline a.trans-03s:nth(1)").html('Дни');
      $("#crowdfunding-stats div.timeline a.trans-03s:nth(2)").html('Недели');
      $("#crowdfunding-stats div.timeline a.trans-03s:nth(3)").html('Месяцы');
      $(("#commlink-holder div.header h1.page-title")).html($(("#commlink-holder div.header h1.page-title")).html().replace("Latest COMM-LINK", "ПОСЛЕДНИЕ НОВОСТИ"));
   }

      // досье гражданина
   if(window.location.toString().toLowerCase().indexOf('robertsspaceindustries.com/citizens/') >= 0){
      $("h1.page-title").zmejReplace('CITIZEN DOSSIER', 'ДОСЬЕ ГРАЖДАНИНА');
      $("div#account-profile div.top-section p").zmejReplace('UEE CITIZEN RECORD #', 'ГРАЖДАНИН ОЗИ, ЗАПИСЬ №');
      $("div#account-profile div.content-section span.enlisted").zmejReplace('Enlisted', 'Вступил');
      $("div#account-profile div.row:nth(1) label").zmejReplace('BIO', 'БИОГРАФИЯ');
      $("div#account-profile div.row:nth(2) label").zmejReplace('WEBSITE', 'САЙТ');
      $("div#account-profile div.row:nth(3) label").zmejReplace('LOCATION', 'ОБИТАНИЕ');
      $("div#account-profile div.row:nth(4) label").zmejReplace('FLUENCY', 'ЯЗЫКИ');
   }

function calcFound(){
      var strTemp = $("div.funds-raised div.digits:nth(0)").html();
      strTemp = strTemp.substring(strTemp.indexOf(',')+1, 1000).replace(",", "");
      strTemp = (1000000-parseInt(strTemp))+'';
      if(parseInt(strTemp) > 999){
         strTemp = strTemp.substring(0, strTemp.length-3) + ',' + strTemp.substring(strTemp.length-3, 1000);
      }
      strTemp = '<span style="opacity:0.5">-'+strTemp+"</span>";
      $("div.funds-raised div.digits:nth(0)").html($("div.funds-raised div.digits:nth(0)").html()+'<br />'+strTemp);
      $(".number-counter div.digits span.append").html('&nbsp; свободно');
      $(".number-counter div.digits span.append").css("font-family", "Tahoma");
      clearTimeout(timerId);
}


   //alert($("a[href='/about-rsi'] span").html());
   //alert('Injected!');
   if(window.location.toString().toLowerCase() == 'https://robertsspaceindustries.com/'){
         // рассчитаем остаток до очередного пледжа
      calcFound();
         // встроим перехватчик события
      //$('div.funds-raised').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
      $('div.number-counter').bind('DOMNodeInserted', function(event) {
         clearTimeout(timerId);
         timerId = setTimeout(calcFound, 300);
      });
 

/*  $("div.funds-raised").ajaxComplete(function(){
         // код выполняется каждый раз после загрузки аякса
      //alert('!');
   });*/

   }

      // Окно логина
   function transLogin(){
      if($('div#signin h2:nth(0)').size()){
         //alert($('div#signin h2:nth(0)').html());
         $('div#signin h2:nth(0)').zmejReplace('SIGN INTO RSI', 'ВОЙТИ НА RSI');
         $('div#signin label:nth(1)').zmejReplace('Password', 'Пароль');
         $('div#signin label:nth(2)').zmejReplace('Remember me?', 'Запомнить?');
         $('div#signin div.checkbox-slider span.choice-1').zmejReplace('No', 'Нет');
         $('div#signin div.checkbox-slider span.choice-2').zmejReplace('Yes', 'Да');
         $("div#signin span.submit-wrapper input.trans-02s").val("Войти");
         $('a.js-go-to-signin').zmejReplace('Sign In', 'Вход');
         $('a.js-go-to-recovery').zmejReplace('Account Recovery', 'Напомнить пароль');
         $('a.js-go-to-enlist').zmejReplace('Enlist Now', 'Регистрация');
         $('div#signin div.explanation-message').zmejReplace('You need to connect to RSI in order to use the selected resource. If you don\'t already have an account use the ENLIST link to join the community.', 'Вам необходимо войти под своей учётной записью на RSI, чтобы воспользоваться ресурсом. Если у Вас ещё нет учётной записи, нажмите на кнопку "Регистрация", чтобы присоединиться к сообществу.');
         $('div#signin div.success-message').html('<strong>Успешно!</strong> Теперь Вы авторизованы на RSI!');
         $('div#signin div.error-message').html('<strong>Ошибка входа.</strong> Вы ввели неверные данные, или такой учётной записи не существует, или она ещё не активирована.');

         $('div#recovery h2:nth(0)').zmejReplace('ACCOUNT RECOVERY', 'ВОССТАНОВЛЕНИЕ ПАРОЛЯ');
         $('div#recovery div.clearfix p.head:nth(0)').html('Введите в поле адрес e-mail, с которым связана Ваша учётная запись в RSI и нажмите на кнопку "Отправить". После этого мы вышлем Вам дальнейшие инструкции.');
         $('div#recovery div.clearfix label:nth(0)').html('Введите Ваш адрес e-mail');
         $("div#recovery div.clearfix span.submit-wrapper input").val("Отправить");
         $('div#recovery div.clearfix p.f-right:nth(0)').html('Если Вам необходима дополнительная помощь для входа в Вашу учётную запись RSI, пожалуйста свяжитесь с нами по адресу <a href="mailto:support@cloudimperiumgames.com">support@cloudimperiumgames.com</a>');
         $('div#recovery div.error-message').zmejReplace('Please enter a valid email.', 'Пожалуйста, введите корректный email.');
         $('div.modal-success p.modal-text').zmejReplace('Success!', 'Успешно!');
         $('div.modal-success p.modal-text').zmejReplace(' We\'ve sent a recovery email to ', ' Мы отправили инструкции на адрес ');
         $('div.modal-success p.modal-text').zmejReplace('. Check your inbox!', '. Проверьте свой почтовый ящик!');

         $('div#enlist h2:nth(0)').zmejReplace('ENLIST', 'РЕГИСТРАЦИЯ');
            // логин
         $('div#enlist div.row:nth(0) div.message-wrapper div.msg p').zmejReplace('Your “Login ID“ is a unique and private field that will only be used to sign into your account and identify your account with Customer Support.', 'Поле "Login ID" является уникальным и приватным, и используется только для входа в Вашу учётную запись, или идентификации в процессе общения со службой поддержки.');
         $('div#enlist div.row:nth(0) div.message-wrapper div.msg-error p').zmejReplace('Login ID is too short', 'Login ID слишком короткий');
         $('div#enlist div.row:nth(0) div.message-wrapper div.msg-good p').zmejReplace('Login ID looks good...we\'ll check availability once you migrate.', 'Login ID на вид заполнен правильно, мы проверим его доступность во время регистрации.');
            // пароль
         $('div#enlist div.row:nth(1) label:nth(0)').zmejReplace('Password', 'Пароль');
         $('div#enlist div.row:nth(1) label:nth(1)').zmejReplace('Confirm Password', 'Подтвердите Пароль');
         $('div#enlist div.row:nth(1) div.message-wrapper div.msg p').zmejReplace('Along with your Login ID, your password will be required to sign into the RSI mainframe. Please ensure that your password meets the strength criteria.', 'Как и поле "Login ID", пароль требуется для входа в пространство сервисов RSI. Пожалуйста убедитесь, что введённый Вами пароль соответствует критериям безопастности.');
         $('div#enlist div.row:nth(1) div.message-wrapper div.msg-error p').zmejReplace('Minimum of 8 characters.', 'Минимум 8 символов.');
         $('div#enlist div.row:nth(1) div.message-wrapper div.msg-error p').zmejReplace('Passwords must match.', 'Пароли не совпадают.');
         $('div#enlist div.row:nth(1) div.message-wrapper div.msg-good p').zmejReplace('Your password implements RSI Level ', 'Ваш пароль соответствует уровню ');
         $('div#enlist div.row:nth(1) div.message-wrapper div.msg-good p').zmejReplace(' compliance:', ' системы безопастности RSI:');
            // мыло
         $('div#enlist div.row:nth(2) label:nth(0)').zmejReplace('Email Address', 'Адрес Email');
         $('div#enlist div.row:nth(2) label:nth(1)').zmejReplace('Confirm Email Address', 'Подтвердите Адрес Email');
         $('div#enlist div.row:nth(2) div.message-wrapper div.msg p').zmejReplace('Your email address is required to verify your account and will be used for notifications and to contact Customer Support.', 'Указание адреса e-mail требуется для проверки Вашей учётной записи, и кроме того он может быть использован для оповешения о новостях проекта и связи со службой поддержки.');
         $('div#enlist div.row:nth(2) div.message-wrapper div.msg-error p').zmejReplace('Please enter a valid email.', 'Пожалуйста, введите корректный email.');
         $('div#enlist div.row:nth(2) div.message-wrapper div.msg-error p').zmejReplace('Emails must match.', 'Адреса не совпадают.');
         $('div#enlist div.row:nth(2) div.message-wrapper div.msg-error p').zmejReplace('Your email address is already taken.', 'Для этого email уже существует учётная запись.');
         $('div#enlist div.row:nth(2) div.message-wrapper div.msg-good p').zmejReplace('Your email address looks good!', 'У вас отличный адрес e-mail!');
            // Моникер
         $('div#enlist div.row:nth(3) label:nth(0)').zmejReplace('Community Monicker', 'Прозвище в сообществе');
         $('div#enlist div.row:nth(3) div.message-wrapper div.msg p').zmejReplace('Your “Community Moniker“ is your public display name. This is what other citizens will identify you with.', 'Ваше "прозвище в сообществе" - это имя, показываемое для всех. То имя, по которому другие граждане сообщества смогут Вас узнать.');
         $('div#enlist div.row:nth(3) div.message-wrapper div.msg-error p').zmejReplace('Community Monicker must be different from Login ID', 'Прозвище в сообществе должно отличаться от Login ID');
         $('div#enlist div.row:nth(3) div.message-wrapper div.msg-good p').zmejReplace('Welcome aboard, ', 'Добро пожаловать на борт, ');
            // хэндл
         $('div#enlist div.row:nth(4) label:nth(0)').zmejReplace('Handle', 'Хэндл');
         $('div#enlist div.row:nth(4) div.message-wrapper div.msg p').html('Ваш "Хэндл" это то, как можно записать Ваше имя в адресной строке браузера.');
         $('div#enlist div.row:nth(4) div.message-wrapper div.msg-error p').zmejReplace('Handle must be different from Login ID', 'Хэндл должен отличаться от Login ID');
         $('div#enlist div.row:nth(4) div.message-wrapper div.msg-error p').zmejReplace('This Handle is already taken.', 'Такой хэндл уже занят.');
         $('div#enlist div.row:nth(4) div.message-wrapper div.msg-good p').zmejReplace('Nice handle ', 'Отличный хэндл, ');
            // дата рождения
         $('div#enlist div.row:nth(5) label:nth(0)').zmejReplace('Birthdate:', 'Дата рождения');
         $('div#enlist div.row:nth(5) div.message-wrapper div.msg p').zmejReplace('You must be of legal age to enlist with RSI. We would also like to wish you happy birthday when the time comes around!', 'Для регистрации на портале RSI Вы должны быть совершеннолетним. Кроме того, мы сможем поздравить Вас с днём рождения, когда этот день настанет.');
         $("div#enlist div.row:nth(5) a.selectlist span").each(function(i,elem){
            $(elem).zmejReplace('Month', 'Месяц'); 
            $(elem).zmejReplace('Day', 'День'); 
            $(elem).zmejReplace('Year', 'Год'); 
         });
         $('div#enlist div.row:nth(5) div.message-wrapper div.msg-error p').zmejReplace('Sorry, we can\'t accept anyone under 13 for enlistment.', 'Извините, Вы должны быть старше 13-ти лет для регистрации.');
         $('div#enlist div.row:nth(5) div.message-wrapper div.msg-good p').zmejReplace('A bit young, but we’ve had fleet commanders who were as young as you.', 'Довольно молоды, но мы встречались с командующими, которые управляли флотами и в более раннем возрасте.');

         $('div#enlist div.row:nth(6) p.terms').zmejReplace('I have read and agree to the ', 'Я прочёл и согласен с ');
         $('div#enlist div.row:nth(6) p.terms').zmejReplace('Terms of Service', 'Лицензионным соглашением');

         $("div#enlist div.row:nth(7) span.submit-wrapper input").val("Присоединиться");

      }
      clearTimeout(login_timerId);
   }

   if((window.location.toString().toLowerCase() == 'https://robertsspaceindustries.com/') ||
      (window.location.toString().toLowerCase().indexOf('https://robertsspaceindustries.com/connect') >= 0)){
      //alert($('.lightbox').html());
         // переведём окно логина
      transLogin();
         // встроим перехватчик события
      $('body').bind('DOMNodeInserted', function(event) {
         //alert($(event.target).html());
         clearTimeout(login_timerId);
         login_timerId = setTimeout(transLogin, 500);
      });
   }

        // встроим перехватчик события на ленту новостей
      $('body').bind('DOMNodeInserted', function(event) {
         //alert($(event.target).html());
         //console.log($(event.target).html());
         //console.log(news_timerId);
         //alert(news_timerId);
         clearTimeout(news_timerId);
         news_timerId = setTimeout(setNews, 500);
      });
 
   