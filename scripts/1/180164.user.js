// ==UserScript==
// @name        DobrijZmej RSI Russian [funding-goals]
// @namespace   https://robertsspaceindustries.com/
// @description Руссификация главной страницы сайта игры Star Citizen
// @include     https://robertsspaceindustries.com/*
// @version     1
// @grant       none
// ==/UserScript==
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

      // список стреч-голов
   if(window.location.toString().toLowerCase().indexOf('/funding-goals') >= 0){
      $("#stretchgoals div:first h1:first").html("ЦЕЛИ ФИНАНСИРОВАНИЯ");
      $("#stretchgoals div:first p:first").html("Здесь вы можете следить за развитием! Star Citizen намеревается стать первой игрой класса ААА, созданной на деньги фанатов, а не крупного издателя. Все деньги, которые жертвуются Star Citizen идут непосредственно на нужды разработки игры.");
      $("#stretchgoals div:first p:nth(1)").html("Достижение каждой из целей открывает всё больше новых функций в игре, наград для существующих бекеров, поскольку мы пытаемся воплотить в жизнь нашу мечту.");
      $(".current-row div:first h2:first").html("ТЕКУЩАЯ ЦЕЛЬ");
      $(".progress-row div:first h2:first").html("СОБРАНО");
      $(".items-row .left h2:first").html("ОТКРЫВАЕТ");
      if($(".items-row .right li:first").html().indexOf('Public Transportation System') >= 0){
         //$((".items-row .right li:first")).html($(".items-row .right li:first").html().replace("Salvage Mechanic: Salvage isn’t an aside: it’s a career, with its own mechanic, story tie-ins and universe-shaping endgames. Search the galaxy for a host of valuable and interesting secrets using both the flight and <span clas=\"caps\">FPS</span> components. Discover the secrets of the ancient Hadesians, locate valuable components and cargo… or go down in history the first to make contact an entirely new alien race!", "Механика сальважинга: Сальважинг это не отдельная часть - это карьера, со своей собственной механикой, сюжетными вставками и изменениями вселенной в финале. Найдите в галактике множество ценных и интересных секретов, используя как полёт, так и путешествия от первого лица. Откройте для себя секреты древней расы Hadesians, находите ценные модули и грузы... или войдите в историю как тот, кто первый вступил в контакт с совершенно новой инопланетной расой!"));
         $((".items-row .right li:first")).html("<strong>Система общественного транспорта</strong> - Нужно попасть из одного места в другое, да вот корабля нет? Не беда – мы создаем систему галактического сообщения. В Star Citizen вы сможете путешествовать от системы к системе и даже перевозить корабли (например, в случае необходимости перегнать его в другой ангар). Согласно этой целевой планке, мы расширим возможности указанной системы: космические лайнеры, грузовики-дальнобойщики, чартерные рейсы и пригодные к полетам челноки!");
      };

      if($(".items-row .right li:first").html().indexOf('Enhanced Alpha') >= 0){
         $((".items-row .right li:first")).html("<b>Улучшенный Альфа-тест</b> - Мы направим дополнительные деньги на улучшение наших начальных планов программы альфа-теста игры Star Citizen. До этого мы планировали запустить сервера в Северной Америке, и уже после этого заниматься расширением нашей сети в Европе и Австралии, чтобы получить отзывы об игре со всего мира. Но эти дополнительные деньги позволят нам создать более широкую инфраструктуру на начальном, раннем этапе тестирования, и купить больше серверов по всему миру. Кроме того, когда эта цель будет достигнута, мы увеличим количество доступных альфа-слотов, а значит больше пилотов смогут присоединиться к нам на этапе альфа теста, а у нас будет больше информации о том впечатлении, которое произвела игра на вас во время путешествия по миру Star Citizen. Что, в свою очередь, окажет нам большую помощь во время балансировки и настройки игры Star Citizen!");
      };

      $(".in-progress .current .date").html("СЕЙЧАС");
      $(".last .last .date").html("ЦЕЛЬ");

         // список всех выполненных целей
      $(".campaign-start-box .amount").html("СТАРТ СБОРОВ");
      //alert($(".stretchgoal-list .left-section h2").html());
      $(".stretchgoal-list .left-section h2").each(function(i,elem){
         $(elem).html($(elem).html().replace("ACCOMPLISHED", "ДОСТИГНУТО"));
         $(elem).html($(elem).html().replace("IN PROGRESS", "В ПРОЦЕССЕ"));
         $(elem).html($(elem).html().replace("LOCKED", "ЗАБЛОКИРОВАНО"));
      });

      $(".stretchgoal-list .goal:nth(0) .right .stripes ul li:nth(0)").html("Регулярные обновления сообщества.");
      $(".stretchgoal-list .goal:nth(0) .right .stripes ul li:nth(1)").html("Мультиплеерная часть боев станет доступна на стадии альфа.");
      $(".stretchgoal-list .goal:nth(0) .right .stripes ul li:nth(2)").html("Одиночная компания Squadron 42 будет состоять из 30 миссий.");

      $(".stretchgoal-list .goal:nth(1) .right .stripes ul li:nth(0)").html("Новый корабль в игре: Anvil Gladiator (авианосный бомбардировщик-торпедоносец).");

      $(".stretchgoal-list .goal:nth(2) .right .stripes ul li:nth(0)").html("Большее количество обновлений для сообщества на сайте RSI.");
      $(".stretchgoal-list .goal:nth(2) .right .stripes ul li:nth(1)").html("Одиночная компания Squadron 42 будет состоять из 35 миссий.");
      $(".stretchgoal-list .goal:nth(2) .right .stripes ul li:nth(2)").html("Граждане игры с соответствующими пакетами получат доступ к вселенной Star Citizen, состоящей из 40 звёздных систем, для игры online, после релиза.");

      $(".stretchgoal-list .goal:nth(3) .right .stripes ul li:nth(0)").html("Новый корабль в игре: MISC Starfarer (танкер).");

      $(".stretchgoal-list .goal:nth(4) .right .stripes ul li:nth(0)").html("Украшения для кокпита - превратите свой кокпит в родной дом, с попощью персональных декораций, удивите ваших друзей фигурками, фотографиями, динозаврами, скелетами, картинами, плакатами и многими другими интересными штуками!");
      $(".stretchgoal-list .goal:nth(4) .right .stripes ul li:nth(1)").html("Абордаж кораблей - узнайте подробности о том, как в Star Citizen планируется реализовать операции по абордажу.");

      $(".stretchgoal-list .goal:nth(5) .right .stripes ul li:nth(0)").html("Новый корабль в игре: Aegis Retaliator (гиперпространственный тяжелый бомбардировщик).");

      $((".stretchgoal-list .goal:nth(6) .right .stripes ul li:nth(0)")).html($((".stretchgoal-list .goal:nth(6) .right .stripes ul li:nth(0)")).html().replace("A new star system will be added to the game for every $100,000 pledged, with descriptions posted to the Comm-Link.", "За каждые 100,000 долларов будет добавлена новая звёздная система, описания которых будут опубликованы в разделе новостей на сайте."));
      $(".stretchgoal-list .goal:nth(6) .right .stripes > ul > li:nth(1)").html('На сайте RSI будут размещаться ежемесячные веб-трансляции команды разработчиков в выпусках "Ангара Вингмэна".');
      $(".stretchgoal-list .goal:nth(6) .right .stripes > ul > li:nth(2)").html('Профессиональные инструменты для моддинга в игре предоставляются бесплатно.');
      $(".stretchgoal-list .goal:nth(6) .right .stripes > ul > li:nth(3)").html('Одиночная компания Squadron 42 будет состоять из 45 миссий.');
      $(".stretchgoal-list .goal:nth(6) .right .stripes > ul > li:nth(4)").html('При релизе игры будут доступны 50 звёдных систем, и новый корабль в игре: Drake Interplateary Cutlass.');

      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(0)").html("При старте игры будет доступно 60 звёздных систем.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(1)").html("Крупнейший класс кораблей, крейсер, станет игровым.");
      //$(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(-2)").html("Открыты все цели, объявленные во время комании на Kickstarter:");
      $((".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2)")).html($((".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2)")).html().replace("All Kickstarter goals unlocked", "Открыты все цели, объявленные во время комании на Kickstarter:"));
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(0)").html("Все бекеры, поддержавшие игру до 29 октября 2012, начнут играть в Star Citizen с Ремонтным Ботом 1 класса в их гаражах.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(1)").html("Всем бекерам, поддержавшим игру до 8 ноября 2012, будет выдано 500 дополнительных кредитов.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(2)").html("Расширенная поддержка контроллеров симуляторов полёта: Flight Chairs, несколько мониторов, Track-IR, МФД (мультифункциональные дисплеи) и многое другое после релиза.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(3)").html("Новые корабли в игре: Idris класса корвет, Origin M50, Drake Interplanetary Caterpillar.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(4)").html("В Star Citizen добавлены два новых базовых типа объектов: Торговый пост Вандуул и спрятанные астероиды контрабандистов.");
      $(".stretchgoal-list .goal:nth(7) .right .stripes ul li:nth(2) ul li:nth(5)").html("В Star Citizen добавлена новая расса: Kr’Thak.");

      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(0)").html("Расширенные варианты абордажа: рукопашный бой, тяжёлое оружие, симуляция невесомости, игровой интерфейс скафандра и бои в открытом космосе.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(1)").html("Расширенные настройки кораблей.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(2)").html("Создание приложений для планшетов, которые позволят выполнять сопутствующие функции, как то: проверка инвентаря, комиссий или поиск миссий и чтение новостной ленты.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(3)").html("Ежемесячные встречи с Крисом Робертсом через трансляцию на сайте.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(4)").html("В озвучке Squadron 42 примут участие актёры, полюбившиеся игрокам по серии игр Wing Commander. А сюжет расширен до 50 миссий.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(5)").html("При релизе игры будут доступны 70 звёздных систем.");
      $(".stretchgoal-list .goal:nth(8) .right .stripes ul li:nth(6)").html("В Star Citizen добавлен ещё один базовый тип. Не хотите ли изучить реликт чужих?");

      $(".stretchgoal-list .goal:nth(9) .right .stripes ul li:nth(0)").html("Профессиональный захват движений для роликов одиночной компании Squadron 42.");
      $(".stretchgoal-list .goal:nth(9) .right .stripes ul li:nth(1)").html('Эксклюзивный скин на корабль "Рекордсмен" и 1000 кредитов всем оригинал-пледжерам.');
      $(".stretchgoal-list .goal:nth(9) .right .stripes ul li:nth(2)").html('Новый корабль в игре: Bengal Carrier (авианосец класса "Бенгал").');

      $(".stretchgoal-list .goal:nth(10) .right .stripes ul li:nth(0)").html("При запуске Star Citizen будут доступны 100 звёздных систем.");
      $(".stretchgoal-list .goal:nth(10) .right .stripes ul li:nth(1)").html("Авианосец Bengal будет доступен как игровой корабль во вселенной игры.");
      $(".stretchgoal-list .goal:nth(10) .right .stripes ul li:nth(2)").html("Полная оркестровая озвучка музыкальных тем в Star Citizen / Squadron 42.");
      $(".stretchgoal-list .goal:nth(10) .right .stripes ul li:nth(3)").html('Первый диск с дополнительными миссиями к одиночной компании Squadron 42 "В тылу врага" будет доступен бесплатно тем оригиналам и ветеранам, которые поддержали проект до 6 миллионов долларов.');

      $(".stretchgoal-list .goal:nth(11) .right .stripes ul li:nth(0)").html('Все бекеры, которые поддержали проект до 28 и июня 2013 года, получат в свой ангар скафандры RSI 2 класса производства Robert Spice Industries.');

      $(".stretchgoal-list .goal:nth(12) .right .stripes ul li:nth(0)").html('Организация собственной MoCap-студии по захвату движений для анимации НПС в Squadron 42 и Star Citizen.');

      $(".stretchgoal-list .goal:nth(13) .right .stripes ul li:nth(0)").html('Вытащить Вингмэна из подвала! Осуществить переезд CIG в Остине в большее помещение, которое будет способствовать расширению разработки. Больше комнат - это больше мест для работников, которые будут заниматься разработкой игры.');

      $(".stretchgoal-list .goal:nth(14) .right .stripes ul li:nth(0)").html('Создание профессиональной звуковой студии. Озвучка Star Citizen будет проходить не в офисе CIG, а на профессиональном оборудовании, что позволит нам создать потрясающие звуковы эффекты, и озвучить игру талантами Голивуда!');
      $(".stretchgoal-list .goal:nth(14) .right .stripes ul li:nth(1)").html('Модуль ангара будет поддерживать Oculus Rift.');

      $(".stretchgoal-list .goal:nth(15) .right .stripes ul li:nth(0)").html('Новый класс кораблей в игре: Фрегат.');
      $(".stretchgoal-list .goal:nth(15) .right .stripes ul li:nth(1)").html('Командно-контрольный центр - модуль для крупного корабля, позволяющий оснатить ваш корвет или эсминец системой стратегического управления боем и передачи команд.');

      $(".stretchgoal-list .goal:nth(16) .right .stripes ul li:nth(0)").html('Режим гибернации: для исследователей внешних границ мы добавим возможность сохранения и возобновления игры прямо в открытом космосе. Для этого будет необходимо выключить энергосистемы корабля, лечь в постель, и воспользоваться меню выхода из игры, пока вы не сможете продолжить своё путешествие.');
      $(".stretchgoal-list .goal:nth(16) .right .stripes ul li:nth(1)").html('Полнометражный документальный фильм профессионального качества "За кулисами SC".');
      $(".stretchgoal-list .goal:nth(16) .right .stripes ul li:nth(2)").html('Четвертая локация - город на планете Земля! Где он будет? Лондон? Берлин?');

      $(".stretchgoal-list .goal:nth(17) .right .stripes ul li:nth(0)").html('Новый корабль в игре: escort carrier (эскортный авианосец).');
      $(".stretchgoal-list .goal:nth(17) .right .stripes ul li:nth(1)").html('Дополнительное 42-страничное руководство, которое проведет игроков через процесс настройки и разгона своих систем корабля!');

      $(".stretchgoal-list .goal:nth(18) .right .stripes ul li:nth(0)").html('Арена смерти: новое воплощение симулятора тренировок из Wing Commander будет доступен пилотам для проверки собственных сил в сражениях с друзьями или незнакомцами в симуляторе. Получите массу боевого опыта без ризска повредить или потерять свой корабль! Возможность совершать ставки на бои по всей вселенной.');
      $(".stretchgoal-list .goal:nth(18) .right .stripes ul li:nth(1)").html('Лазерный пистолет для каждого, кто купил себе пледж до достижения этой суммы. Держите свой корабль в безопасности с лазерным пистолетом на борту.');

      $(".stretchgoal-list .goal:nth(19) .right .stripes ul li:nth(0)").html('Каждому поддержавшему Star Citizen до 17 миллионов будет выдан комплект для апгрейда энергоустановки.');
      $(".stretchgoal-list .goal:nth(19) .right .stripes ul li:nth(1)").html('Новый корабль в игре: Battlecruiser (линейный крейсер).');

      $(".stretchgoal-list .goal:nth(20) .right .stripes ul li:nth(0)").html('Эксклюзивная звёздная система для бекеров. Только те игроки, которые поддержали игру до релиза, смогут начать игру в этой локации, однако после релиза координаты этой системы могут быть загружены в компьютер любого игрока для прыжка.');

      $(".stretchgoal-list .goal:nth(21) .right .stripes ul li:nth(0)").html('Узнай своего врага, благодаря стильному справочнику наподобие Jane’s Fighting Ships, доступного бесплатно всем пледжерам.');
      $(".stretchgoal-list .goal:nth(21) .right .stripes ul li:nth(1)").html('Управление космическими станциями - Игроки будут состязаться за возможность владеть и управлять ограниченным числом космических станций по всей галактике.');
      $(".stretchgoal-list .goal:nth(21) .right .stripes ul li:nth(2)").html('Раздел RSI Museum станет обновляться ежемесячно, каждый раз представляя новые возможности игры!');

      $(".stretchgoal-list .goal:nth(22) .right .stripes ul li:nth(0)").html('Бои от первого лица на некоторых планетах, где правит беззаконие. Не только сражения на космических станциях и платформах… участвуйте в боях на поверхности!');

      $(".stretchgoal-list .goal:nth(23) .right .stripes ul li:nth(0)").html('Механика сальважинга: Сальважинг это не отдельная часть - это карьера, со своей собственной механикой, сюжетными вставками и изменениями вселенной в финале. Найдите в галактике множество ценных и интересных секретов, используя как полёт, так и путешествия от первого лица. Откройте для себя секреты древней расы Hadesians, находите ценные модули и грузы... или войдите в историю как тот, кто первый вступил в контакт с совершенно новой инопланетной расой!');

      $(".stretchgoal-list .goal:nth(24) .right .stripes ul li:nth(0)").html('<strong>Система захвата лиц.</strong> Мы изучили технологию, позволяющую с помощью нескольких камер захватить реальные головы и внедрить их в игру. Она позволит команде намного легче создавать многообразие реалистичных персонажей. Кроме того, технология достаточно мобильна, что позволит нам привозить ее на специальные мероприятия и захватывать там лица избранных поклонников! Узнать подробности об этой системе вы можете тут - <a href="http://ir-ltd.net/">Infinite-Realities</a>.');

      $(".stretchgoal-list .goal:nth(25) .right .stripes ul li:nth(0)").html('<strong>Лёгкий разведчик Xi’an!</strong> Получен доступ к разведчику Khartu, легкому атакующему судну вооруженных сил Xi’an! В отличие от кораблей, созданных руками человека, Khartu не обладают привычным основным движителем. Вместо него здесь представлен массив из маневровых движителей, работающих в связке. Такой подход к дизайну дает кораблю непревзойденную подвижность. Пилоты UEE проклинают Khartu и нарекли его "Кварком", поскольку, включив все свои движители, он становится похож на искру, рассекающую пространство. Aopoa (корпорация Xi’an) также производит экспортную модель Khartu-al, для продажи гражданским лицам UEE в роли специального разведчика/исследователя. Маневренность экспортной модели ни в чем не уступает оригиналу, а разница кроется лишь в адаптации панелей под человеческую физиологию и более скудном вооружении. (Проектировщик: Aopoa)');

      $(".stretchgoal-list .goal:nth(26) .right .stripes ul li:nth(0)").html('<strong>Система общественного транспорта</strong> - Нужно попасть из одного места в другое, да вот корабля нет? Не беда – мы создаем систему галактического сообщения. В Star Citizen вы сможете путешествовать от системы к системе и даже перевозить корабли (например, в случае необходимости перегнать его в другой ангар). Согласно этой целевой планке, мы расширим возможности указанной системы: космические лайнеры, грузовики-дальнобойщики, чартерные рейсы и пригодные к полетам челноки!');

      $(".stretchgoal-list .goal:nth(27) .right .stripes ul li:nth(0)").html('<b>Улучшенный Альфа-тест</b> - Мы направим дополнительные деньги на улучшение наших начальных планов программы альфа-теста игры Star Citizen. До этого мы планировали запустить сервера в Северной Америке, и уже после этого заниматься расширением нашей сети в Европе и Австралии, чтобы получить отзывы об игре со всего мира. Но эти дополнительные деньги позволят нам создать более широкую инфраструктуру на начальном, раннем этапе тестирования, и купить больше серверов по всему миру. Кроме того, когда эта цель будет достигнута, мы увеличим количество доступных альфа-слотов, а значит больше пилотов смогут присоединиться к нам на этапе альфа теста, а у нас будет больше информации о том впечатлении, которое произвела игра на вас во время путешествия по миру Star Citizen. Что, в свою очередь, окажет нам большую помощь во время балансировки и настройки игры Star Citizen!');


   }