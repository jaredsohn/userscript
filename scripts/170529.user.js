// ==UserScript==
// @name           Ikariam Imperator parsian test
// @namespace      aubergineanodyne
// @description    Overview tables for Ikariam 0.5.0+ desktop versions in the style of Ikariam Empire Board or Ikariam ExMachina.  Rule your empire with ease!
// @author         AubergineAnodyne 
//
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @include        http://s*.ikariam.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        http://userscripts.org/scripts/version/132337/564583.user.js
//
// @version        0.27
//
// @history        0.27 Fixed pillage of crystal not showing up.
// @history        0.26 Fixed colonization init-for-pirating implementation.
// @history        0.26 Fixed display of garrison table headers in Chrome.
// @history        0.25 Added espionage overview (FarmList reimplementation).
// @history        0.25 Removed "upgrade hover box" that shows only time for buildings that have already reached their max level.
// @history        0.25 Added option to initialize colonization missions for pirate raiding.
// @history        0.24 Added option to prevent destruction of non-mobile colonies (any town with a palace or governors residence).
// @history        0.24 Added option to show owner name next to city name on city view.
// @history        0.24 Added prompt to have script completely demolish building when downgrading by one level.
// @history        0.24 Added Hungarian translation (by Toroco).
// @history        0.24 Updated for Ikariam changes in 5.3.2.
// @history        0.23 Added support for Pirate Fortress (v0.5.3 new building).
// @history        0.23 Added Spanish translation (by Rada974).
// @history        0.23 Added French translation (by H?©liOGraph).
// @history        0.22 Added debug setting to reset all data to default.
// @history        0.22 Fixed column separators on military overview table (misaligned by 1).
// @history        0.22 Fixed labels on links to barracks and shipyard in military overview table.
// @history        0.22 Changed building tooltip to show costs for next level when upgrading.
// @history        0.21 Updated German translation (from Cherry).
// @history        0.21 Fixed a bug preventing mine links from working.
// @history        0.20 Updated Polish translation (from pitmm).
// @history        0.20 Added Bosnian translation (from Scavenger).
// @history        0.20 Added debug panel.
// @history        0.19 Made a couple tweaks to alert functionality for Chrome.
// @history        0.18 Added desktop alert functionality for building upgrades and transport/deploy army,navy/pillage missions.
// @history        0.17 Added quick loading buttons for transports and donations (basically the x500 payloads script).
// @history        0.17 Updated German translation.
// @history        0.17 Added Polish translation (by pitmm).
// @history        0.17 Fixed a bug that incoming trade/pillage mission resources did not show up in overview.
// @history        0.16 Switched to new version of dependent scripts.
// @history        0.15 Fixed translation of settings not being applied.
// @history        0.15 Updated German translation.
// @history        0.14 Reworked impelentation of auto daily bonus form submit for Chrome.
// @history        0.13 Fix for Chrome (hopefully).
// @history        0.12 Added support for localization (and German translation from Cherry).
// @history        0.12 Added option to automatically submit daily bonus form.
// @history        0.12 Added features to hide various minor parts of the interface (chat, friends list, facebook button, ads).
// @history        0.12 Show loading pillage missions in incoming transport.
// @history        0.11 Small tweak to work with TamperMonkey in Google Chrome.
// @history        0.10 Initial version.
// ==/UserScript==

$.extend(String.prototype, {
  format: function() {
    var pattern = /%s/g
    
    return function format() {
      var args = arguments;
      var itemIndex = 0;
      var str = this.replace(pattern, function replacer(match, key) {
        return args[itemIndex++];
      });
      return str;
    }
  }(),
  format2: function() {
      var pattern = /%{([a-zA-Z_0-9]+)}/g
      
      return function format2(args) {
        var str = this.replace(pattern, function replacer(match, key) {
          return args[key];
        });
        return str;
      }
  }(),
});

var Imperator = function Imperator() {
  var localizations = {
	en: {
      misc: {
        resource_overview: 'بازبینی منابع',
        buildings_overview: 'بازبینی ساختمان ها',
        military_overview: 'بازبینی نظامی ',
        espionage_overview: 'بازبینی جاسوسی', 
      
        upkeep: "هزینه نگهداری و تعمیر",
        growth: "رشد",
        trade_good: "معامله خوب است",
        CITY_NAME: "شهر",
        action_points: "امتیازها حرکت",
        actions: "حرکات",
        research: "تحقیق",
        building_spots: "ساختمان سازی",

        constructing: "درحال ساخت ",
        summary: "خلاصه:",
        
        population: "جمعیت",
        population_growth: "رشد",
        
        resources: 'منابع',
        buildings: 'ساختمان ها',
        military: 'نظامی',
        espionage: 'جاسوسی',
        
        resource_overview: 'بازبینی منابع ',
        buildings_overview: 'ساختمان بررسی اجمالی',
        military_overview: 'بازبینی نظامی ',
        
        resource_cost: 'هزینه',
        next_level_cost: 'هزینه سطح بعدی ',
        missing: 'گم شده',
        
        full: 'کامل شده',
        time_to_full: 'تا پر شدن',
        time_to_empty: 'تا خالی شدن ',
        
        maximum_capacity: 'ظرفیت',
        safe_capacity: "امنیت",
        employed: 'استخدام شده',
        
        satisfaction: "رضایت",
        tavern_wine_serving_level: 'سطح میخانه',
        cultural_goods: 'محصولات فرهنگی',
       
        
		units: 'واحد',
        training: 'آموزش',
        deploying: 'استقرار ',
        plundering: 'غارت',
        
        in_transit: "حمل و نقل",
        none: 'هیچ',
      },
      tweaks: {
        transport_minus_500: '-',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',
        
        transport_minus_500_text: 'حذف 500 کالا',
        transport_plus_500_text: 'اضافه کردن 500 کالا ',
        transport_plus_1000_text: 'اضافه کردن 1000 کالا ',
        transport_plus_5000_text: 'اضافه کردن 5000 کالا ',
        
        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',
        
        donate_plus_1000_text: 'اضافه کردن 1000 چوب برای اهدای ',
        donate_plus_10000_text: 'اضافه کردن 10000 چوب برای اهدای ',
        donate_plus_100000_text: 'اضافه کردن 100000 چوب برای  اهدای',
        
        completely_demolish_building_prompt: 'آیا شما می خواهید این ساختمان را به طور کامل تخریب کنید؟',
        destroy_non_mobile_colony_prompt: 
            'این قابلیت در "Ikariam Imperator" مسدود شده است!اگر شما واقعا به این کار اسرار دارید ' +
            'و می خواهید شهر را خراب کنید به تنظیمات این اسکریپ مراجعه کنید  ' +
            '"Ikariam Imperator" options.',
      },
      actions: {
		deploy_army: 'استقرار ارتش',
        deploy_navy: 'استقرار نیروی دریایی',
        transport_goods: 'محصولات حمل و نقل',
        to_town_hall: 'برای سالن شهر',
        to_city_view: 'شهر',
        to_island_view: 'جزیره',
        to_barracks: 'به سربازخانه',
        to_shipyard: 'به کارخانه ی کشتی سازی',
        spy_mission: 'ماموریت جاسوسی',
        blockade: 'محاصره',
        pillage: 'غارت',
        occupy: 'اشغال',
        send_spy: 'ارسال جاسوسی',
        view_high_score: 'نمایش امتیاز',
        view_alliance_page: 'صفحه نمایش اتحاد ',
      },
      resources: {
		wood: 'چوب',
        wine: 'انگور',
        marble: 'مرمر',
        glass: 'کریستال',
        sulfur: 'گوگرد',
      },
      buildings: {
        townHall: 'تالار شهر ',
        palace: 'قصر',
        palaceColony: 'فرماندار \' اقامت ',
        tavern: 'میخانه',
        museum: 'موزه',
        academy: 'آکادمی',
        workshop: 'کارگاه',
        temple: 'معبد',
        embassy: 'سفارت',
        warehouse: 'انبار',
        dump: 'تخلیه',
        port: 'بندر معاملاتی',
        branchOffice: 'اخبار',
        wall: 'دیوار',
        safehouse: 'مخفیگاه',
        barracks: 'سربازخانه',
        shipyard: 'کشتی سازی',
        pirateFortress: 'قلعه دزدان دریایی ',
        forester: 'جنگلبان',
        carpentering: 'نجاری',
        winegrower: 'افزاینده انگور',
        vineyard: 'اب انگور مطبوع',
        stonemason: 'سنگ تراش',
        architect: 'معمار',
        glassblowing: 'شیشه گر',
        optician: 'عدسی ساز',
        alchemist: 'افزاینده گوگرد ',
        fireworker: 'کاهنده گوگرد',
      },
      units: {
        phalanx: 'نیزه دار',
        steamgiant: 'غول بخار',
        spearman: ' سرباز مسلح',
        swordsman: ' شمشیرزن',
        slinger: 'سنگ انداز',
        archer: ' کماندار',
        marksman: '  تفنگدار کارابین ',
        ram: 'دژکوب',
        catapult: ' منجنیق',
        mortar: ' بمب بوم',
        gyrocopter: 'هلی کوپتر',
        bombardier: ' بالون بمب انداز ',
        cook: 'آشپز',
        medic: 'دکتر',
        
        ship_ram: ' کشتی دژکوب',
        ship_flamethrower: 'کشتی آتش',
        ship_steamboat: ' کشتی بخار',
        ship_ballista: 'کشتی Ballista',
        ship_catapult: ' کشتی منجنیق ',
        ship_mortar: 'ملات کشتی',
        ship_submarine: ' قایق غواصی',
        ship_paddlespeedship: '  سریع السیر',
        ship_ballooncarrier: 'بالون',
        ship_tender: ' مناقصه',
        ship_rocketship: ' زیردریایی ',
      },
      alerts: {
		building_upgrade_complete: ' ارتقاء ساختمان کامل شد ',
		building_upgrade_complete_text: '%{building} در %{city} به سطح %{level} ارتقا یافت ',

        mission_update: 'بروز رسانی ماموریت ',
        
        loading: 'بارگیری %{type} در %{city} به پایان رسید',
        en_route: '%{type} وارد %{city} شد ',
        returning: '%{type} به %{city} برگشت',
                     
        deployarmy: 'استقرار ارتش',
        deploynavy: ' استقرار نیروی دریایی',
        plunder: ' غارت',
        transport: 'کشتی های تجاری',

      },
      espionage: {
		player:'بازیکن',
        townhall_level:' سطح سالن شهر',
        wall_level:' سطح دیوار',
        travel_time:' "زمان سفر"',
        resources_lootable:'توانایی غارت',
        resources_looted:'غارت',
        combats:'مبارزه',
        military_score:' امتیاز نظامی',
        location:'مکان',
        view_island:' نمایش جزیره ',
        occupied_by:'اشغال شده توسط',
        blockaded_by:'محاصره',
        time_since:' زمان از آنجایی ',
        remove_target:': حذف هدف قرار دادن',
      },
      settings: {
      	general: 'عمومی',
        language: 'زبان',
      
        overviews: 'مروری بر',
        
        tweaks: ' "موارد دلخواه"',
        auto_accept_daily_bonus: '  فرم پاداش روزانه به صورت خودکار ارسال شود ',
        hide_ads: 'مخفی کردن تبلیغات',
        hide_facebook: 'مخفی کردن دکمه فیس بوک',
        hide_friends_bar: 'مخفی کردن نوار دوستان',
        hide_chat: 'مخفی کردن چت',
        transport_buttons: 'اضافه کردن دکمه های حمل و نقل  :  -500و +500 و +1کیلو +5کیلو',
        donation_buttons: ' اضافه کردن دکمه  اهدا: +1 کیلو +10 کیلو +100 کیلو ',
        show_city_owners: ' نمایش نام مالک شهر در کنار نام شهری (نمای جزیره)ا ',
        prevent_accidental_colony_destruction: ' "جلوگیری از تخریب مستعمرات غیر موبایل',
        initialize_colonization_missions_for_pirate_raiding: 'مقداردهی اولیه ماموریت های تاسیس شهر جدید با تنظیم چوب و سنگ موردنیاز برای ساخت قلعه دزدان دریایی سطح 1  و استفاده از حداکثر سرعت با تنظیم حداقل ظرفیت کشتی ها',
                
        alerts: 'هشدارهای',
        do_test: 'تست',
        test_desktop_alert: ' تست اطلاع رسانی دسکتاپ',
        test_desktop_alert_title: ' "آزمون اطلاع رسانی "',
        test_desktop_alert_text: ' "اطلاع رسانی موفق! برای خارج شدن کلیک کنید . ',
		desktop_alerts_not_supported: 
			'هشدار ها در دسکتاپ توسط مرورگر شما پشتیبانی نمی شود. شما می توانید نسخه رومیزی HTML را دانلود کنید' +
            ' افزونه هشدار از طریق فایرفاکس در آدرس: ' +
			'(https://addons.mozilla.org/en-us/firefox/addon/html-notifications/) ' + 
			'یا مرورگرتان را به  کروم تغییر دهید (www.google.com/chrome/).',
             
        building_completion_alert_desktop: ' نمایش هشدار برای: کامل شدن ارتقاء ساختمان ',
        transport_loaded_alert_desktop: ' نمایش هشدار برای:  بارگیری ماموریت حمل و نقل  ',
        transport_arrived_alert_desktop: ' نمایش هشدار برای:  ورود ماموریت حمل و نقل ',
        transport_returned_alert_desktop: ' نمایش هشدار برای: بازگشت از ماموریت حمل و نقل ',
        deploy_army_loaded_alert_desktop: ' نمایش هشدار برای : کامل شدن بارگیری ارتش ',
        deploy_army_arrived_alert_desktop: ' نمایش هشدار برای : رسیدن ارتش به مقصد',
        deploy_army_returned_alert_desktop: ' نمایش هشدار برای : بازگشت ارتش ',
        deploy_navy_arrived_alert_desktop: ' نمایش هشدار برای:  رسیدن نیروی دریایی به مقصد',
        deploy_navy_returned_alert_desktop: ' نمایش هشدار برای : بازگشت نیروی دریایی ',
        pillage_loaded_alert_desktop: ' نمایش هشدار برای:  بارگیری ارتش برای غارت  ',
        pillage_arrived_alert_desktop: ' نمایش هشدار برای:  رسیدن به مقصد برای غارت ',
        pillage_returned_alert_desktop: ' نمایش هشدار برای:  بازگشت از غارت ',
        
        debug: 'اشکال زدایی',
      },
    },

    en1: {
      misc: {
        resource_overview: 'Resource Overview',
        buildings_overview: 'Buildings Overview',
        military_overview: 'Military Overview',
        espionage_overview: 'Espionage Overview',
      
        upkeep: "Upkeep",
        growth: "Growth",
        trade_good: "Trade Good",
        city_name: "City",
        action_points: "Action Points",
        actions: "Actions",
        research: "Research",
        building_spots: "Building Spots",

        constructing: "Constructing",
        summary: "Summary:",
        
        population: "Population",
        population_growth: "Growth",
        
        resources: 'Resources',
        buildings: 'Buildings',
        military: 'Military',
        espionage: 'Espionage',
        
        resource_overview: 'Resources Overview',
        buildings_overview: 'Buildings Overview',
        military_overview: 'Military Overview',
        
        resource_cost: 'Cost',
        next_level_cost: 'Next Level Cost',
        missing: 'Missing',
        
        full: 'Full',
        time_to_full: 'To Full',
        time_to_empty: 'To Empty',
        
        maximum_capacity: 'Capacity',
        safe_capacity: 'Safe',
        employed: 'Employed',
        
        satisfaction: 'Satisfaction',
        tavern_wine_serving_level: 'Tavern Level',
        cultural_goods: 'Cultural Goods',
        
        units: 'Units',
        training: 'Training',
        deploying: 'Deploying',
        plundering: 'Plundering',
        
        in_transit: 'Transporting',
        none: 'None',
      },
      tweaks: {
        transport_minus_500: '-',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',
        
        transport_minus_500_text: 'Remove 500 goods',
        transport_plus_500_text: 'Add 500 goods',
        transport_plus_1000_text: 'Add 1000 goods',
        transport_plus_5000_text: 'Add 5000 goods',
        
        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',
        
        donate_plus_1000_text: 'Add 1000 wood to donation',
        donate_plus_10000_text: 'Add 10000 wood to donation',
        donate_plus_100000_text: 'Add 100000 wood to donation',
        
        completely_demolish_building_prompt: 'Do you want to completely demolish this building?',
        destroy_non_mobile_colony_prompt: 
            'Demolition of non-mobile colony blocked by "Ikariam Imperator"!  If you really ' +
            'want to demolish this town, first turn off the protection option in ' +
            '"Ikariam Imperator" options.',
      },
      actions: {
        deploy_army: 'Deploy Army',
        deploy_navy: 'Deploy Navy',
        transport_goods: 'Transport Goods',
        to_town_hall: 'To Town Hall',
        to_city_view: 'View City',
        to_island_view: 'View Island',
        to_barracks: 'To Barracks',
        to_shipyard: 'To Shipyard',
        spy_mission: 'Spy Mission',
        blockade: 'Blockade',
        pillage: 'Pillage',
        occupy: 'Occupy',
        send_spy: 'Send Spy',
        view_high_score: 'View Score',
        view_alliance_page: 'View Alliance Page',
      },
      resources: {
        wood: 'Wood',
        wine: 'Wine',
        marble: 'Marble',
        glass: 'Crystal',
        sulfur: 'Sulfur',
      },
      buildings: {
        townHall: 'Town Hall',
        palace: 'Palace',
        palaceColony: 'Governor\'s Residence',
        tavern: 'Tavern',
        museum: 'Museum',
        academy: 'Academy',
        workshop: 'Workshop',
        temple: 'Temple',
        embassy: 'Embassy',
        warehouse: 'Warehouse',
        dump: 'Dump',
        port: 'Trading Port',
        branchOffice: 'Trading Post',
        wall: 'Wall',
        safehouse: 'Hideout',
        barracks: 'Barracks',
        shipyard: 'Shipyard',
        pirateFortress: 'Pirate Fortress',
        forester: 'Forester',
        carpentering: 'Carpenter',
        winegrower: 'Winegrower',
        vineyard: 'Wine Press',
        stonemason: 'Stonemason',
        architect: 'Architect',
        glassblowing: 'Glassblower',
        optician: 'Optician',
        alchemist: 'Alchemist\'s Tower',
        fireworker: 'Firework Test Area',
      },
      units: {
        phalanx: 'Hoplite',
        steamgiant: 'Steam Giant',
        spearman: 'Spearman',
        swordsman: 'Swordsman',
        slinger: 'Slinger',
        archer: 'Archer',
        marksman: 'Sulphur Carabineer',
        ram: 'Ram',
        catapult: 'Catapult',
        mortar: 'Mortar',
        gyrocopter: 'Gyrocopter',
        bombardier: 'Balloon-Bombadier',
        cook: 'Cook',
        medic: 'Doctor',
        
        ship_ram: 'Ram Ship', 
        ship_flamethrower: 'Fire Ship',
        ship_steamboat: 'Steam Ram', 
        ship_ballista: 'Ballista Ship', 
        ship_catapult: 'Catapult Ship', 
        ship_mortar: 'Mortar Ship', 
        ship_submarine: 'Diving Boat',
        ship_paddlespeedship: 'Paddle Speedboat',
        ship_ballooncarrier: 'Balloon Carrier',
        ship_tender: 'Tender',
        ship_rocketship: 'Rocker Ship',
      },
      alerts: {
        building_upgrade_complete: 'Building upgrade complete',
        building_upgrade_complete_text: '%{building} in %{city} upgraded to level %{level}',
        
        mission_update: 'Mission update',
        
        loading: '%{type} has finished loading in %{city}',
        en_route: '%{type} has arrived in %{city}',
        returning: '%{type} has returned to %{city}',
        
        deployarmy: 'Army deployment',
        deploynavy: 'Navy deployment',
        plunder: 'Pillage',
        transport: 'Transport',
      },
      espionage: {
        player: 'Player',
        townhall_level: 'Town Hall Level',
        wall_level: 'Wall Level',
        travel_time: 'Travel Time',
        resources_lootable: 'Lootable',
        resources_looted: 'Looted',
        combats: 'Combats',
        military_score: 'Military Score',
        location: 'Location',
        view_island: 'View Island',
        occupied_by: 'Occupied by',
        blockaded_by: 'Blockaded by',
        time_since: 'Time Since',
        remove_target: 'Remove Target',
      },
      settings: {
        general: 'General',
        language: 'Language',
      
        overviews: 'Overviews',
        
        tweaks: 'Tweaks',
        auto_accept_daily_bonus: 'Automatically submit daily bonus form',
        hide_ads: 'Hide ads',
        hide_facebook: 'Hide facebook button',
        hide_friends_bar: 'Hide friends bar',
        hide_chat: 'Hide chat',
        transport_buttons: 'Add transport buttons: -500, +500, +1k, +5k',
        donation_buttons: 'Add donation buttons: +1k, +10k, +100k',
        show_city_owners: 'Show city owner next to city name (island view)',
        prevent_accidental_colony_destruction: 'Prevent destruction of non-mobile colonies',
        initialize_colonization_missions_for_pirate_raiding: 
            'Initialize colonization missions with wood and marble to build level 1 pirate fortress and use max draft speed',
        
        alerts: 'Alerts',
        do_test: 'Test',
        test_desktop_alert: 'Test desktop notification',
        test_desktop_alert_title: 'Test notification',
        test_desktop_alert_text: 'Successful notification!  Click to dismiss.',
        desktop_alerts_not_supported: 
             'Desktop alerts not supported by your browser.  You can try the HTML Desktop' + 
             'Notification extension for Firefox ' + 
             '(https://addons.mozilla.org/en-us/firefox/addon/html-notifications/) ' + 
             'or switching to Chrome (www.google.com/chrome/).',
             
        building_completion_alert_desktop: 'Desktop notification: building upgrade complete',
        transport_loaded_alert_desktop: 'Desktop notification: transport mission loaded',
        transport_arrived_alert_desktop: 'Desktop notification: transport mission arrived',
        transport_returned_alert_desktop: 'Desktop notification: transport mission returned',
        deploy_army_loaded_alert_desktop: 'Desktop notification: deploy army loaded',
        deploy_army_arrived_alert_desktop: 'Desktop notification: deploy army arrived',
        deploy_army_returned_alert_desktop: 'Desktop notification: deploy army returned',
        deploy_navy_arrived_alert_desktop: 'Desktop notification: deploy navy arrived',
        deploy_navy_returned_alert_desktop: 'Desktop notification: deploy navy returned',
        pillage_loaded_alert_desktop: 'Desktop notification: pillage loaded',
        pillage_arrived_alert_desktop: 'Desktop notification: pillage arrived',
        pillage_returned_alert_desktop: 'Desktop notification: pillage returned',
        
        debug: 'Debug',
      },
    },

    de: {
      misc: {
        upkeep: "Unterhalt",
        growth: "Wachstum",
        trade_good: "Handelsgüter",
        city_name: "Stadt",
        action_points: "Aktionspunkte",
        actions: "Aktionen",
        research: "Forschung",
        building_spots: "freie Baupl?tze",

        constructing: "im Bau befindlich",
        summary: "Summe:",

        population: "Bev?lkerung",
        population_growth: "Wachstum",

        resources: 'Ressourcen',
        buildings: 'Geb?ude',
        military: 'Milit?r',

        resource_overview: 'Ressourcenübersicht',
        buildings_overview: 'Geb?udeübersicht',
        military_overview: 'Milit?rübersicht',

        resource_cost: 'Kosten',
        next_level_cost: 'Kosten n?chstes Level',
        missing: 'fehlt',

        full: 'voll',
        time_to_full: 'bis voll',
        time_to_empty: 'bis leer',

        maximum_capacity: 'Kapazit?t',
        safe_capacity: 'Sicher',
        employed: 'Forscher',

        satisfaction: 'Zufriedenheit',
        tavern_wine_serving_level: 'Tavernen Level',
        cultural_goods: 'Kulturgüter',

        units: 'Einheiten',
        training: 'Ausbildung',
        deploying: 'im Einsatz',
        plundering: 'Plünderung',

        in_transit: 'Transport',
      },
      tweaks: {
        transport_minus_500: '-',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',

        transport_minus_500_text: 'Entferne 500 Waren',
        transport_plus_500_text: 'Addiere 500 Waren',
        transport_plus_1000_text: 'Addiere 1000 Waren',
        transport_plus_5000_text: 'Addiere 5000 Waren',

        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',

        donate_plus_1000_text: 'Addiere 1000 Holz zur Spende',
        donate_plus_10000_text: 'Addiere 10000 Holz zur Spende',
        donate_plus_100000_text: 'Addiere 100000 Holz zur Spende',

      },
      actions: {
        deploy_army: 'Armee hier her verlegen',
        deploy_navy: 'Kriegsschiffe hier her verlegen',
        transport_goods: 'Waren hier her transportieren',
        to_town_hall: 'gehe ins Rathaus',
        to_city_view: 'zeige Stadtansicht',
        to_barracks: 'gehe zur Kaserne',
        to_shipyard: 'gehe zur Werft',
      },
      resources: {
        wood: 'Holz',
        wine: 'Wein',
        marble: 'Mamor',
        glass: 'Kristall',
        sulfur: 'Schwefel',
      },
      buildings: {
        townHall: 'Rathaus',
        palace: 'Palast',
        palaceColony: 'Stadthaltersitz',
        tavern: 'Taverne',
        museum: 'Museum',
        academy: 'Akademie',
        workshop: 'Erfinderwerkstatt',
        temple: 'Tempel',
        embassy: 'Botschaft',
        warehouse: 'Lagerhaus',
        dump: 'Halde',
        port: 'Handelshafen',
        branchOffice: 'Kontor',
        wall: 'Mauer',
        safehouse: 'Versteck',
        barracks: 'Kaserne',
        shipyard: 'Kriegswerft',
        forester: 'Forsthaus',
        carpentering: 'Zimmerei',
        winegrower: 'Winzerei',
        vineyard: 'Taverne',
        stonemason: 'Steinmetz',
        architect: 'Architekt',
        glassblowing: 'Glasbl?ser',
        optician: 'Optiker',
        alchemist: 'Alchimistenturm',
        fireworker: 'Feuerwerksplatz',  
      },
      units: {
        phalanx: 'Hoplit',
        steamgiant: 'Dampfgigant',
        spearman: 'Speertr?ger',
        swordsman: 'Schwertk?mpfer',
        slinger: 'Steinschleuderer',
        archer: 'Bogenschütze',
        marksman: 'Schwefelbüchsenschütze',
        ram: 'Rammbock',
        catapult: 'Katapult',
        mortar: 'M?rser',
        gyrocopter: 'Gyrocopter',
        bombardier: 'Balloon-Bombadier',
        cook: 'Koch',
        medic: 'Doktor',

        ship_ram: 'Rammschiff', 
        ship_flamethrower: 'Feuerschiff',
        ship_steamboat: 'Dampframme', 
        ship_ballista: 'Ballistaschiff', 
        ship_catapult: 'Katapultschiff', 
        ship_mortar: 'M?rserschiff', 
        ship_submarine: 'Tauchboot',
        ship_paddlespeedship: 'Schaufelschnellboot',
        ship_ballooncarrier: 'Ballontr?ger',
        ship_tender: 'Tender',
        ship_rocketship: 'Raketenschiff',
      },
      alerts: {
        building_upgrade_complete: 'Geb?udeausbau abgeschlossen',
        building_upgrade_complete_text: '%{building} in %{city} ausgebaut auf Stufe %{level}',

        mission_update: 'Mission update',

        loading: '%{type} ist fertig mit beladen in %{city}',
        en_route: '%{type} ist angekommen in %{city}',
        returning: '%{type} ist zurück gekommen nach %{city}',

        deployarmy: 'Armeeauftr?ge',
        deploynavy: 'Flottenauftr?ge',
        plunder: 'Plündern',
        transport: 'Transport',

      },
      settings: {
        general: 'Allgemein',
        language: 'Sprache',
      
        overviews: 'Ubersichten',
        
        tweaks: 'Sonstiges',
        auto_accept_daily_bonus: 'Automatisches senden des t?glichen Login-Bonus',
        hide_ads: 'Werbung ausblenden',
        hide_facebook: 'Facbookbutton ausblenden',
        hide_friends_bar: 'Freundesliste ausblenden',
        hide_chat: 'Chat ausblenden',
        transport_buttons: 'Aanzeige Transport Buttons: -500, +500, +1k, +5k',
        donation_buttons: 'Anzeige Spende Buttons: +1k, +10k, +100k',

        alerts: 'Alarm',
        do_test: 'Test',
        test_desktop_alert: 'Test Desktop Benachrichtigung',
        test_desktop_alert_title: 'Test Benachrichtigung',
        test_desktop_alert_text: 'Test erfogreich!  Klicke hier zum beenden.',
        desktop_alerts_not_supported:
             'Desktop Alarm wird von deinem Browser nicht unterstützt. Versuche HTML Desktop' +
             'Benachrichtigungserweiterung für Firefox ' +
             '(https://addons.mozilla.org/de/firefox/addon/html-notifications/) ' +
             'oder wechsle zu Chrome (www.google.com/chrome/).',

       building_completion_alert_desktop: 'Benachrichtigung: Geb?udeausbau abgeschlossen',
       transport_loaded_alert_desktop: 'Benachrichtigung: Transport Mission beladen',
       transport_arrived_alert_desktop: 'Benachrichtigung: Transport Mission angekommen',
       transport_returned_alert_desktop: 'Benachrichtigung: Transport Mission zurück gekommen',
       deploy_army_loaded_alert_desktop: 'Benachrichtigung: eingesetzte Armee beladen',
       deploy_army_arrived_alert_desktop: 'Benachrichtigung: eingesetzte Armee angekommen',
       deploy_army_returned_alert_desktop: 'Benachrichtigung: eingesetzte Armee zurück gekommen',
       deploy_navy_arrived_alert_desktop: 'Benachrichtigung: eingesetzte Flotte angekommen',
       deploy_navy_returned_alert_desktop: 'Benachrichtigung: eingesetzte Flotte zurück gekommen',
       pillage_loaded_alert_desktop: 'Benachrichtigung: Plündergut beladen',
       pillage_arrived_alert_desktop: 'Benachrichtigung: Plündergut angekommen',
       pillage_returned_alert_desktop: 'Benachrichtigung: Plündergut zurück gekommen',

       debug: 'Debug',
      },
    },
    es: {
      misc: {
        resource_overview: 'Tabla de recursos',
        buildings_overview: 'Tabla de edificios',
        military_overview: 'Tabla Militar',

        upkeep: "Mantenimiento",
        growth: "Crecimiento",
        trade_good: "Bien de Lujo",
        city_name: "Ciudad",
        action_points: "Puntos de accion",
        actions: "Accion",
        research: "Investigacion",
        building_spots: "Lugares disponibles",
        constructing: "Construyendo",
        summary: "Resumen:",

        population: "Poblacion",
        population_growth: "Crecimiento",

        resources: 'Recursos',
        buildings: 'Edificios',
        military: 'Militar',

        resource_overview: 'Resumen de recursos',
        buildings_overview: 'Resumen de edificios',
        military_overview: 'Resumen Militar',

        resource_cost: 'Costos',
        next_level_cost: 'Costos Proximo nivel',
        missing: 'Faltante',

        full: 'Lleno',
        time_to_full: 'Tiempo para llenar',
        time_to_empty: 'Tiempo para vaciar',

        maximum_capacity: 'Capacidad',
        safe_capacity: 'Seguro',
        employed: 'Empleado',

        satisfaction: 'Satisfaccion',
        tavern_wine_serving_level: 'Vino servido',
        cultural_goods: 'Bienes Culturales',

        units: 'Unidades',
        training: 'Entrenando',
        deploying: 'Desplegando',
        plundering: 'Saqueando',

        in_transit: 'En transito',
      },
      tweaks: {
        transport_minus_500: '-500',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',
        transport_minus_500_text: 'reduce 500',
        transport_plus_500_text: 'Aumenta 500',
        transport_plus_1000_text: 'Aumenta 1000',
        transport_plus_5000_text: 'Aumenta 5000',
        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',
        donate_plus_1000_text: 'Aumenta 1000',
        donate_plus_10000_text: 'Aumenta 10000',
        donate_plus_100000_text: 'Aumenta 100000',
        },
        actions: {
        deploy_army: 'Desplegar Tropas',
        deploy_navy: 'Despplegar Flotas',
        transport_goods: 'Transportar Bienes',
        to_town_hall: 'ir a la intendencia',
        to_city_view: 'ver ciudad',
        to_barracks: 'ir al cuartel',
        to_shipyard: 'ir al astillero',
      },
      resources: {
        wood: 'Madera',
        wine: 'Vino',
        marble: 'Marmol',
        glass: 'Cristal',
        sulfur: 'Azufre',
      },
      buildings: {
        townHall: 'Intendencia',
        palace: 'Palacio',
        palaceColony: 'Residencia del Gobernador',
        tavern: 'Taberna',
        museum: 'Museo',
        academy: 'Academia',
        workshop: 'Taller de mejoras',
        temple: 'Templo',
        embassy: 'Embajada',
        warehouse: 'Deposito',
        dump: 'Vertedero',
        port: 'Puerto',
        branchOffice: 'Tienda',
        wall: 'Muralla',
        safehouse: 'Escondite',
        barracks: 'Cuartel',
        shipyard: 'Astillero',
        forester: 'Caba?±a del guardabosques',
        carpentering: 'Carpinteria',
        winegrower: 'Vinicultor',
        vineyard: 'Prensa de Vino',
        stonemason: 'Cantero',
        architect: 'Oficina del arquitecto',
        glassblowing: 'Soplador de Vidrio',
        optician: 'Optica',
        alchemist: 'Alquimista',
        fireworker: 'Zona de pruebas pirotecnicas',
      },
      units: {
        phalanx: 'Hoplita',
        steamgiant: 'Gigante a vapor',
        spearman: 'Lancero',
        swordsman: 'Espadachin',
        slinger: 'Hondero',
        archer: 'Arquero',
        marksman: 'Fusilero',
        ram: 'Ariete',
        catapult: 'Catapulta',
        mortar: 'Mortero',
        gyrocopter: 'Gyrocoptero',
        bombardier: 'Bombardero',
        cook: 'Cocinero',
        medic: 'Medico',
        ship_ram: 'Barco Espolon',
        ship_flamethrower: 'Barco Lanzallamas',
        ship_steamboat: 'Barco Espolon a vapor',
        ship_ballista: 'Barco Ballesta',
        ship_catapult: 'Barco Catapulta',
        ship_mortar: 'Barco mortero',
        ship_submarine: 'Submarino',
        ship_paddlespeedship: 'Lancha de palas',
        ship_ballooncarrier: 'Porta-Globos',
        ship_tender: 'Barco de mantenimiento',
        ship_rocketship: 'Barco lanza-misiles',
      },
      alerts: {
        building_upgrade_complete: 'Expansion de edificio completa',
        building_upgrade_complete_text: '%{building} nivel %{level} completado(a) en%{city}',
        mission_update: 'Actualizar Mision',
        loading: 'Carga %{type} completa en %{city}',
        en_route: '%{type} en camino a %{city}',
        returning: '%{type} retornando desde %{city}',
        deployarmy: 'Desplegando tropas',
        deploynavy: 'Desplegando Flotas',
        plunder: 'Saquear',
        transport: 'Transportar',
      },
      settings: {
        general: 'Optciones generales',
        language: 'Idioma',
        overviews: 'Tablas',
        tweaks: 'Ajustes',
        auto_accept_daily_bonus: 'Aceptar automaticamente el bono diario',
        hide_ads: 'Ocultar Publicidad',
        hide_facebook: 'Ocultar Facebook',
        hide_friends_bar: 'Ocultar barra de amigos',
        hide_chat: 'Ocultar chat',
        transport_buttons: 'Botones de transporte: -500, +500, +1k, +5k',
        donation_buttons: 'Botones para donaciones: +1k, +10k, +100k',
        alerts: 'Alertas',
        do_test: 'Probar',
        test_desktop_alert: 'Notificacion en el escritorio',
        test_desktop_alert_title: 'Titulo de la notificacion',
        test_desktop_alert_text: 'Mensaje de la notificacion.',
        building_completion_alert_desktop: 'Alerta: Ampliacion de edificio completa',
        transport_loaded_alert_desktop: 'Alerta: Carga completa',
        transport_arrived_alert_desktop: 'Alerta: Transporte arrib?³',
        transport_returned_alert_desktop: 'Alerta: trasnsporte volvi?³',
        deploy_army_loaded_alert_desktop: 'Alerta: Carga de Tropas completa',
        deploy_army_arrived_alert_desktop: 'Alerta: Tropas desplegadas',
        deploy_army_returned_alert_desktop: 'Alerta: Retorno de tropas',
        deploy_navy_arrived_alert_desktop: 'Alerta: Flotas desplegadas',
        deploy_navy_returned_alert_desktop: 'Alerta: Retorno de Flotas',
        pillage_loaded_alert_desktop: 'Alerta: Cargando saqueo',
        pillage_arrived_alert_desktop: 'Alerta: Saqueo en curso',
        pillage_returned_alert_desktop: 'Alerta: Retorno del saqueo',
        debug: 'Debug',
      },
    },
    fr: {
      misc: {
        resource_overview: 'Vue générale des Ressources',
        buildings_overview: 'Vue générale des Bâtiments',
        military_overview: 'Vue générale des Troupes',

        upkeep: "Entretien",
        growth: "Croissance",
        trade_good: "Trade Good",
        city_name: "Cité",
        action_points: "Points d'Action",
        actions: "Actions",
        research: "Recherche",
        building_spots: "Emplacement de Construction",

        constructing: "En cours de construction",
        summary: "Résumé:",

        population: "Population",
        population_growth: "Croissance",

        resources: 'Ressources',
        buildings: 'Bâtiments',
        military: 'Armée',

        resource_overview: 'Vue générale des Ressources',
        buildings_overview: 'Vue générale des Bâtiments',
        military_overview: 'Vue générale des Troupes',

        resource_cost: 'Coût',
        next_level_cost: 'Coût du prochain niveau',
        missing: 'Manquant',

        full: 'Plein',
        time_to_full: 'Jusqu\'au maximum',
        time_to_empty: 'Jusqu\'au minimum',

        maximum_capacity: 'Capacité',
        safe_capacity: 'Sécurisé',
        employed: 'Utilisé',

        satisfaction: 'Satisfaction',
        tavern_wine_serving_level: 'Niveau de la Taverne',
        cultural_goods: 'Biens Culturels',

        units: 'Unités',
        training: 'Formation',
        deploying: 'Déploiement',
        plundering: 'Pillage',

        in_transit: 'En transit',
      },
      tweaks: {
        transport_minus_500: '-',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',

        transport_minus_500_text: 'Enlever 500 unités',
        transport_plus_500_text: 'Ajouter 500 unités',
        transport_plus_1000_text: 'Ajouter 1000 unités',
        transport_plus_5000_text: 'Ajouter 5000 unités',

        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',

        donate_plus_1000_text: 'Ajouter 1000 unités de bois en donation',
        donate_plus_10000_text: 'Ajouter 10000 unités de bois en donation',
        donate_plus_100000_text: 'Ajouter 100000 unités de bois en donation',
      },
      actions: {
        deploy_army: 'Déployer Troupes',
        deploy_navy: 'Déployer Flottes',
        transport_goods: 'Transporter des Marchandises',
        to_town_hall: 'Montrer l\'Hôtel de Ville',
        to_city_view: 'Montrer la Ville',
        to_barracks: 'Montrer la Caserne',
        to_shipyard: 'Montrer le Chantier Naval',
      },
      resources: {
        wood: 'Bois',
        wine: 'Vin',
        marble: 'Marbre',
        glass: 'Cristal',
        sulfur: 'Souffre',
      },
      buildings: {
        townHall: 'Hôtel de Ville',
        palace: 'Palais',
        palaceColony: 'Résidence du Gouverneur',
        tavern: 'Taverne',
        museum: 'Musée',
        academy: 'Académie',
        workshop: 'Atelier',
        temple: 'Temple',
        embassy: 'Ambassade',
        warehouse: 'Entrepôt',
        dump: 'Dépôt',
        port: 'Port commercial',
        branchOffice: 'Comptoir',
        wall: 'Mur d\'enceinte',
        safehouse: 'Cachette',
        barracks: 'Caserne',
        shipyard: 'Chantier naval',
        forester: 'Maison Forestière',
        carpentering: 'Menuisier',
        winegrower: 'Pressoir à vin',
        vineyard: 'Cave à vin',
        stonemason: 'Tailleur de pierres',
        architect: 'Bureau de l\'architecte',
        glassblowing: 'Verrier',
        optician: 'Opticien',
        alchemist: 'Tour des alchimistes',
        fireworker: 'Zone de test des artificiers',
      },
      units: {
        phalanx: 'Phalange',
        steamgiant: 'Géant à vapeur',
        spearman: 'Lancier',
        swordsman: 'Epéiste',
        slinger: 'Lance-pierre',
        archer: 'Archer',
        marksman: 'Tireur d`élite',
        ram: 'Bélier',
        catapult: 'Catapulte',
        mortar: 'Mortier',
        gyrocopter: 'Gyrocoptère',
        bombardier: 'Bombardier',
        cook: 'Cuisinier',
        medic: 'Médecin',

        ship_ram: 'Bateau bélier',
        ship_flamethrower: 'Lance-flammes',
        ship_steamboat: 'Bélier à vapeur',
        ship_ballista: 'Bateau Baliste',
        ship_catapult: 'Bateau à catapulte',
        ship_mortar: 'Bateau à mortier',
        ship_submarine: 'Bateau de plongée',
        ship_paddlespeedship: 'Bateau de soutien',
        ship_ballooncarrier: 'Porte-ballons',
        ship_tender: 'Bateau rapide à aubes',
        ship_rocketship: 'Bateau lance-missiles',
      },
      alerts: {
        building_upgrade_complete: 'Expansion du bâtiment terminée',
        building_upgrade_complete_text: '%{building} niveau %{level} terminé(e) à%{city}',

        mission_update: 'Mission mise à jour',

        loading: 'Chargement de %{type} terminé à %{city}',
        en_route: '%{type} sont arrivés à %{city}',
        returning: '%{type} sont retournés à %{city}',

        deployarmy: 'Déploiement de l’Armée',
        deploynavy: 'Déploiement de la Flotte',
        plunder: 'Pillage',
        transport: 'Transport',
      },
      settings: {
        general: 'Options générales',
        language: 'Language',

        overviews: 'Vues',

        tweaks: 'Tweaks',
        auto_accept_daily_bonus: 'Soumettre automatiquement sous forme de bonus quotidien',
        hide_ads: 'Masquer les publicités',
        hide_facebook: 'Masquer le bouton Facebook',
        hide_friends_bar: 'Masquer la barre de contact',
        hide_chat: 'Masquer le chat',
        transport_buttons: 'Ajouter boutons de transport: -500, +500, +1k, +5k',
        donation_buttons: 'Ajouter boutons de donation: +1k, +10k, +100k',

        alerts: 'Alertes',
        do_test: 'Test',
        test_desktop_alert: 'Tester la notification bureau',
        test_desktop_alert_title: 'Tester le titre de la notification',
        test_desktop_alert_text: 'Notification Réussie ! Cliquez pour fermer.',
        desktop_alerts_not_supported: 'Les alertes ne sont pas supportées par votre navigateur. Vous pouvez essayer d\'intégrer l\'add-on HTML-Desktop-Notifications' + 'Notification extension for Firefox ' + '(https://addons.mozilla.org/en-us/firefox/addon/...) ' + 'ou passer à Chrome (www.google.com/chrome/).',

        building_completion_alert_desktop: 'Notification: Expansion du Bâtiment terminée',
        transport_loaded_alert_desktop: 'Notification: Chargement terminé',
        transport_arrived_alert_desktop: 'Notification: Transport terminé',
        transport_returned_alert_desktop: 'Notification: Retour terminé',
        deploy_army_loaded_alert_desktop: 'Notification: Chargement de Troupes terminé',
        deploy_army_arrived_alert_desktop: 'Notification: Troupes déployées',
        deploy_army_returned_alert_desktop: 'Notification: Retour des Troupes',
        deploy_navy_arrived_alert_desktop: 'Notification: Flottes déployées',
        deploy_navy_returned_alert_desktop: 'Notification: Retour des Flottes',
        pillage_loaded_alert_desktop: 'Notification: Chargement pillage',
        pillage_arrived_alert_desktop: 'Notification: Pillage en cours',
        pillage_returned_alert_desktop: 'Notification: Retour du pillage',

        debug: 'Debug',
      },
    },
    hu: {
      misc: {
        resource_overview: 'Nyersanyagok list?ja',
        buildings_overview: 'Epületek list?ja',
        military_overview: 'Egységek list?ja',

        upkeep: "Fenntart?si k?ltség",
        growth: "N?vekedés",
        trade_good: "Nyersanyagok küldése",
        city_name: "V?ros",
        action_points: "M?veleti pontok",
        actions: "M?veletek",
        research: "Kutat?s",
        building_spots: "Ep?tési helyek",

        constructing: "Ep?tés",
        summary: "?sszegzés:",

        population: "Népesség",
        population_growth: "Népesség n?vekedés",

        resources: 'Nyersanyagok',
        buildings: 'Epületek',
        military: 'Egységek',

        resource_overview: 'Nyersanyagok list?ja',
        buildings_overview: 'Epületek list?ja',
        military_overview: 'Egységek list?ja',

        resource_cost: 'Nyersanyag szükséglet',
        next_level_cost: 'K?vetkez?s szinthez szükséges',
        missing: 'Hi?nyzik',

        full: 'Tele',
        time_to_full: 'Tele',
        time_to_empty: 'Ures',

        maximum_capacity: 'Kapacit?s',
        safe_capacity: 'Védett',
        employed: 'Tud?sok',

        satisfaction: 'Elégedettség',
        tavern_wine_serving_level: 'Fogad? szintje',
        cultural_goods: 'Kultur?lis egyezmény',

        units: 'Egységek',
        training: 'Képzés',
        deploying: 'Csapat mozg?s',
        plundering: 'Foszt?s',

        in_transit: 'Sz?ll?t?s',
      },
      tweaks: {
        transport_minus_500: '-',
        transport_plus_500: '+500',
        transport_plus_1000: '+1k',
        transport_plus_5000: '+5k',

        transport_minus_500_text: 'Elvesz 500 nyersanyagot',
        transport_plus_500_text: 'Hozz?ad 500 nyersanyagot',
        transport_plus_1000_text: 'Hozz?ad 1000 nyersanyagot',
        transport_plus_5000_text: 'Hozz?ad 5000 nyersanyagot',

        donate_plus_1000: '+1k',
        donate_plus_10000: '+10k',
        donate_plus_100000: '+100k',

        donate_plus_1000_text: '1000 f?t adom?nyoz',
        donate_plus_10000_text: '10000 f?t adom?nyoz',
        donate_plus_100000_text: '100000 f?t adom?nyoz',
      },
      actions: {
        deploy_army: 'Katon?k küldése',
        deploy_navy: 'Haj?k küldése',
        transport_goods: 'Nyersanyagok sz?ll?t?sa',
        to_town_hall: 'Ugr?s v?rosh?z?hoz',
        to_city_view: 'Ugr?s a v?roshoz',
        to_barracks: 'Ugr?s a barakkhoz',
        to_shipyard: 'Ugr?s a haj?gy?rhoz',
      },
      resources: {
        wood: 'Fa',
        wine: 'Bor',
        marble: 'M?rv?ny',
        glass: 'Krist?ly',
        sulfur: 'Kén',
      },
      buildings: {
        townHall: 'V?rosh?za',
        palace: 'Palota',
        palaceColony: 'Helytart? székhelye',
        tavern: 'Fogad?',
        museum: 'M?zeum',
        academy: 'Akadémia',
        workshop: 'M?hely',
        temple: 'Templom',
        embassy: 'Nagyk?vetség',
        warehouse: 'Rakt?r',
        dump: 'Dep?',
        port: 'Kereskedelmi kik?t?',
        branchOffice: 'Keresked? poszt',
        wall: 'Fal',
        safehouse: 'Rejtekhely',
        barracks: 'Barakk',
        shipyard: 'Haj?gy?r',
        pirateFortress: 'Kal?z er?d',
        forester: 'Erdész',
        carpentering: '?csmester',
        winegrower: 'Bortermel?',
        vineyard: 'Sz?l?prés',
        stonemason: 'K?m?ves',
        architect: 'Ep?tész irod?ja',
        glassblowing: 'Uvegf?v?',
        optician: 'Optikus',
        alchemist: 'Alkimista torony',
        fireworker: 'T?zszerész',
      },
      units: {
        phalanx: 'Hoplita',
        steamgiant: 'G?z?ri?s',
        spearman: 'D?rd?s',
        swordsman: 'Kardforgat?',
        slinger: 'Paritty?s',
        archer: '?j?sz',
        marksman: 'Kén Karabélyos',
        ram: 'Falt?r? Kos',
        catapult: 'Katapult',
        mortar: '?gy?',
        gyrocopter: 'Gyrokopter',
        bombardier: 'Ballonos-Bomb?z?',
        cook: 'Séf',
        medic: 'Felcser',

        ship_ram: 'T?r?-haj?',
        ship_flamethrower: 'L?nghaj?',
        ship_steamboat: 'G?zkos',
        ship_ballista: 'Balliszta Haj?',
        ship_catapult: 'Katapult Haj?',
        ship_mortar: '?gy? Haj?',
        ship_submarine: 'B?v?rhaj?',
        ship_paddlespeedship: 'Lap?tkerekes Gyorshaj?',
        ship_ballooncarrier: 'Léghaj? hordoz?',
        ship_tender: '?sz? b?zis',
        ship_rocketship: 'Rakét?s Haj?',
      },
      alerts: {
        building_upgrade_complete: 'Az épület fejlesztése befejez?d?tt',
        building_upgrade_complete_text: 'A(z) %{building}, %{city}-ban/ben fejlesztve lett a(z) %{level}. szintre.',

        mission_update: 'Küldetés Lista',

        loading: '%{type} befejezte a rakod?st itt: %{city}',
        en_route: '%{type} megérkezett ide: %{city}',
        returning: '%{type} visszatért ide: %{city}',

        deployarmy: 'Sereg küldés',
        deploynavy: 'Haj? küldés',
        plunder: 'Foszt?s',
        transport: 'Sz?ll?t?s',
      },
      settings: {
        general: '?ltal?nos',
        language: 'Nyelv v?laszt?s',

        overviews: 'List?k',

        tweaks: 'Egyéb',
        auto_accept_daily_bonus: 'Automatikus napi b?nusz elfogad?s',
        hide_ads: 'H?rdetések elrejtése',
        hide_facebook: 'Facebook gomb elrejtése',
        hide_friends_bar: 'Bar?tlista elrejtése',
        hide_chat: 'Chat elrejtése',
        transport_buttons: 'Sz?ll?t?si gombok hozz?ad?sa: -500, +500, +1k, +5k',
        donation_buttons: 'Adom?nyoz?s gombok hozz?ad?sa: +1k, +10k, +100k',

        alerts: 'Riaszt?sok',
        do_test: 'Teszt',
        test_desktop_alert: 'Ertes?tés tesztelése',
        test_desktop_alert_title: 'Teszt értes?tés',
        test_desktop_alert_text: 'Sikeres értes?tés! Kattincs a bez?r?shoz.',
        desktop_alerts_not_supported: 'Az értes?téseket nem t?mogatja a b?ngész?d. Pr?b?ld a HTML Desktop ' + 'Notification extension for Firefox ' + '(https://addons.mozilla.org/en-us/firefox/addon/...) ' + 'vagy telep?tsd a Chrome-ot (www.google.com/chrome/).',

        building_completion_alert_desktop: 'Ertes?tés: Epület fejlesztés elkészült',
        transport_loaded_alert_desktop: 'Ertes?tés: Keresked? haj?k rakod?sa befejez?d?tt',
        transport_arrived_alert_desktop: 'Ertes?tés: Keresked? haj?k megérkeztek',
        transport_returned_alert_desktop: 'Ertes?tés: Keresked? haj?k visszatértek',
        deploy_army_loaded_alert_desktop: 'Ertes?tés: Egységeid elindultak',
        deploy_army_arrived_alert_desktop: 'Ertes?tés: Egységeid megérkeztek',
        deploy_army_returned_alert_desktop: 'Ertes?tés: Egységeid visszatértek',
        deploy_navy_arrived_alert_desktop: 'Ertes?tés: A haj?id megérkeztek',
        deploy_navy_returned_alert_desktop: 'Ertes?tés: A haj?id visszatértek',
        pillage_loaded_alert_desktop: 'Ertes?tés: A fosztogat?k elindultak',
        pillage_arrived_alert_desktop: 'Ertes?tés: A fosztogat?s elkezd?d?tt',
        pillage_returned_alert_desktop: 'Ertes?tés: A fosztogat?k visszatértek',

        debug: 'Debug',
      },
    },
    pl: {
      misc: {
        resource_overview: 'Podglad - Zasoby',
        buildings_overview: 'Podglad - Budynki',
        military_overview: 'Podglad - Wojsko',
      
        upkeep: "Utrzymanie",
        growth: "Wzrost",
        trade_good: "Handel",
        city_name: "Miasto",
        action_points: "Punkty Akcji",
        actions: "Akcja",
        research: "Badania",
        building_spots: "Miejsca pod Budowe",

        constructing: "Budowa",
        summary: "Razem:",
        
        population: "Populacja",
        population_growth: "Przyrost",
        
        resources: 'Zasoby',
        buildings: 'Budynki',
        military: 'Wojsko',
        
        resource_overview: 'Podglad: Zasoby',
        buildings_overview: 'Podglad: Budynki',
        military_overview: 'Podglad: Wojsko',
        
        resource_cost: 'Koszt',
        missing: 'Zagubiony',
        
        full: 'Pelno',
        time_to_full: 'Pelno za',
        time_to_empty: 'Pusto za',
        
        maximum_capacity: 'Pojemnosc',
        safe_capacity: 'Bezpieczne',
        employed: 'Zatrudnieni',
        
        satisfaction: 'Zadowolenie',
        tavern_wine_serving_level: 'Poziom Tawerny',
        cultural_goods: 'Dobra Kulturowe',
        
        units: 'Jednostki',
        training: 'Szkolenie',
        deploying: 'Deploying',
        plundering: 'Pladrowanie',
        
        in_transit: 'Transport',
      },
      actions: {
        deploy_army: 'Wyslij Armie',
        deploy_navy: 'Wyslij Flote',
        transport_goods: 'Transport Surowc?w',
        to_town_hall: 'Ratusz',
        to_city_view: 'Podglad Miasta',
      },
      resources: {
        wood: 'Drewno',
        wine: 'Wino',
        marble: 'Marmur',
        glass: 'Krysztal',
        sulfur: 'Siarka',
      },
      buildings: {
        townHall: 'Ratusz',
        palace: 'Palac',
        palaceColony: 'Rezydencja Gubernatora',
        tavern: 'Tawerna',
        museum: 'Muzeum',
        academy: 'Akademia',
        workshop: 'Warsztat',
        temple: 'Swiatynia',
        embassy: 'Ambasada',
        warehouse: 'Magazyn',
        dump: 'Skladowisko',
        port: 'Port',
        branchOffice: 'Bazar',
        wall: 'Mur',
        safehouse: 'Kryj?wka',
        barracks: 'Koszary',
        shipyard: 'Stocznia',
        forester: 'Lesnicz?wka',
        carpentering: 'Ciesla',
        winegrower: 'Winnica',
        vineyard: 'Tlocznia Win',
        stonemason: 'Kamieniarz',
        architect: 'Architekt',
        glassblowing: 'Huta Szkla',
        optician: 'Optyk',
        alchemist: 'Alchemik',
        fireworker: 'Pirotechnik',
      },
      units: {
        phalanx: 'Hoplita',
        steamgiant: 'Gigant Parowy',
        spearman: 'Oszczepnik',
        swordsman: 'Wojownik',
        slinger: 'Procarz',
        archer: 'Lucznik',
        marksman: 'Strzelec',
        ram: 'Taran',
        catapult: 'Katapulta',
        mortar: 'Mozdzierz',
        gyrocopter: 'Zyrokopter',
        bombardier: 'Balonowy Bombardier',
        cook: 'Kucharz',
        medic: 'Medyk',
        
        ship_ram: 'Taran', 
        ship_flamethrower: 'Miotacz Ognia',
        ship_steamboat: 'Taran Parowy', 
        ship_ballista: 'Balista', 
        ship_catapult: 'Okret z Katapulta', 
        ship_mortar: 'Okret z Mozdzierzem', 
        ship_submarine: 'Okret Podwodny',
        ship_paddlespeedship: 'Smigacz z Napedem Kolowym',
        ship_ballooncarrier: 'Balonowiec',
        ship_tender: 'Statek Pomocniczy',
        ship_rocketship: 'Krazownik Rakietowy',
      },
      settings: {
        general: 'Og?lne',
        language: 'Jezyk',
      
        overviews: 'Podglad',
        
        tweaks: 'Ustawienia',
        auto_accept_daily_bonus: 'Automatyczne zatwierdzenie dziennego bonusa',
        hide_ads: 'Ukryj dodatki',
        hide_facebook: 'Ukryj guzik facebook',
        hide_friends_bar: 'Ukryj list? przyjaci?l',
        hide_chat: 'Ukryj czat',
        transport_buttons: 'Dodaj przyciski za?adunku: -500, +500, +1k, +5k',
        donation_buttons: 'Dodaj przyciski wp?at: +1k, +10k, +100k',
        
        alerts: 'Powiadomienia',
        do_test: 'Test',
        test_desktop_alert: 'Testuj powiadomienia',
        test_desktop_alert_title: 'Test powiadomienia',
        test_desktop_alert_text: 'Test zako?czony powodzeniem!  Kliknij aby wyj??',
        desktop_alerts_not_supported: 
             'Twoja przegl?darka nie obs?uguje powiadomie?.  ' + 
             'Zainstaluj powiadomienia dla Firefox ' + 
             '(https://addons.mozilla.org/en-us/firefox/addon/html-notifications/) ' + 
             'albo przejd? na Chrome (www.google.com/chrome/).',
             
        building_completion_alert_desktop: 'Powiadomienie o uko?czeniu modernizacji budynku',
        transport_loaded_alert_desktop: 'Powiadomienie o zako?czeniu za?adunku towar?w',
        transport_arrived_alert_desktop: 'Powiadomienie o przybyciu statk?w handlowych',
        transport_returned_alert_desktop: 'Powiadomienie o powrocie statk?w handlowych',
        deploy_army_loaded_alert_desktop: 'Powiadomienie o za?adowaniu wojsk',
        deploy_army_arrived_alert_desktop: 'Powiadomienie o przybyciu wojsk',
        deploy_army_returned_alert_desktop: 'Powiadomienie o powrocie wojsk',
        deploy_navy_arrived_alert_desktop: 'Powiadomienie o dop?yni?ciu okr?t?w wojennych',
        deploy_navy_returned_alert_desktop: 'Powiadomienie o powrocie okr?t?w wojennych',
        pillage_loaded_alert_desktop: 'Powiadomienie o grabie?y',
        pillage_arrived_alert_desktop: 'Powiadomienie o rozpocz?ciu grabie?y',
        pillage_returned_alert_desktop: 'Powiadomienie o powrocie z grabie?y',
      },
    },
  };
  var localizer = new IkaTools.Intl.Localizer(localizations);
  
  function addStyles() {
    GM_addStyle('\
      /*-------------------------main board ----------------------*/ \
\
      .imperator_overview { \
        //width: 990px; \
        //margin: 0 auto; \
        //padding: 15px 0; \
      } \
\
      .imperator_overview.ltr, \
      .imperator_overview.ltr * { \
        direction: ltr; \
      } \
\
      .imperator_overview.rtl, \
      .imperator_overview.rtl * { \
        direction: rtl; \
      } \
\
      /*************************************************************/ \
      /* Generic */ \
\
      .nowrap { \
        white-space: nowrap; \
      } \
\
      /*************************************************************/ \
      /* Main overview table formatting */ \
\
      .imperator_overview table.overview { \
        width: 851px !important; \
        margin-bottom: 3px; \
        background-color: #FAF3D7 \
        border-collapse: collapse; \
        border: 1px solid #E4B873; \
        color: #542C0F; \
\
        height: auto; \
        line-height: 12px; \
        font-size: 11px; \
        min-width: 10px; \
        vertical-align: top; \
        text-align: right; \
\
        cursor:default; \
        overflow-x: scroll; \
      } \
\
      .imperator_overview a, \
      .imperator_overview p { \
        line-height: 12px; \
        font-size: 11px; \
      } \
\
      .imperator_overview table.overview tbody tr { \
        min-height: 22px; \
        height: 22px; \
      } \
\
      .imperator_overview table.overview colgroup { \
        border-left: 2px solid #DEC285; \
        border-right: 2px solid #DEC285; \
      } \
\
      .imperator_overview table.overview td { \
        padding: 1px 2px; \
        min-width: 11px; \
      } \
\
      .imperator_overview table.overview tbody td { \
        vertical-align: top; \
      } \
\
      .imperator_overview table.overview col { \
        border-left: 1px dashed #ECCF8E; \
        border-right: 1px dashed #ECCF8E; \
        min-width: 20px; \
      } \
\
      .imperator_overview table.overview col { \
        border-left: 1px dashed #ECCF8E; \
        border-right: 1px dashed #ECCF8E; \
        min-width: 20px; \
      } \
\
      .imperator_overview table.overview col.city_name { \
        border-left: none; \
        text-align: left; \
        width: 95px; \
      } \
\
      .imperator_overview table.overview td.city_name { \
        text-align: left; \
      } \
\
      .imperator_overview table.overview col.city_tradegood { \
        border-right: none; \
        width: 20px; \
      } \
\
      .imperator_overview table.overview td.city_tradegood img { \
        height: 12pt; \
      } \
\
      .imperator_overview table.overview thead { \
        background: #F8E7B3 url(skin/input/button.png) repeat-x scroll 0 bottom; \
      } \
\
      .imperator_overview table.overview tfoot {  \
        background: #E7C680 url(skin/input/button.png) repeat-x scroll 0 0; \
        border-top: 2px solid #CB9B6A; \
        vertical-align: top; \
      } \
\
      .imperator_overview table.overview tbody tr { \
        border-top: 1px solid #ECCF8E; \
      } \
\
      .imperator_overview table.overview tbody tr:nth-child(odd) { \
        background-color: #FAEEC0; \
      } \
\
      .imperator_overview table.overview td.city_name, \
      .imperator_overview table.overview th.city_name { \
        width: 95px; \
        max-width: 95px; \
        overflow: hidden; \
      } \
\
      .imperator_overview table.overview tbody tr.current { \
        background-color: #FAE0BB; \
      } \
\
      .imperator_overview table.overview tbody tr:hover { \
        background-color: #FAF7EB; \
        border:1px solid #CB9B6A; \
      } \
\
      .imperator_overview table.overview tfoot tr {  \
      } \
\
      .imperator_overview table.overview th { \
        height: 22px; \
        width: auto; \
        padding: 1px; \
        padding-bottom: 2px; \
        padding-left: 3px; \
        text-align: center; \
        font-weight: bold; \
      } \
\
      .imperator_overview table.overview th.city_name, \
      .imperator_overview table.overview td.city_name { \
        overflow: hidden; \
      } \
\
      .imperator_overview table.overview td.totals_sigma_cell:after { \
        content: url("skin/layout/sigma.png"); \
      } \
\
      /**************************************************************/ \
      /* Tool tip formatting */ \
\
      .tool_tip_container { \
        background-color: #FAF3D7; \
        border: 1px solid #CB9B6A; \
        font-size: 11px; \
        position: absolute; \
        text-align: left; \
        z-index: 110000; \
        white-space: nowrap; \
      } \
\
      .tool_tip_container * { \
        padding: 2px 3px; \
      } \
\
      .tool_tip_container thead,  \
      .imperator_tool_tip_title { \
        background: #F8E7B3 url("skin/input/button.png") repeat-x scroll 0 bottom; \
        white-space: nowrap; \
        border-bottom: 1px solid #CB9B6A; \
      } \
\
      .tool_tip_container tfoot { \
        background: #E7C680 url("skin/input/button.png") repeat-x scroll 0 0; \
        border-top: 1px solid #CB9B6A; \
      } \
\
      table.building_upgrade_costs { \
        width: 100%; \
      } \
\
      table.building_upgrade_costs td *, \
      table.lootable_resources td *, \
      table.target_military_garrison tfoot td *, \
      table.combat_looted td * { \
        padding: 0px 2px; \
      } \
\
      table.espionage_combats > tbody > tr:nth-child(even), \
      table.travel_time tr:nth-child(even) { \
        background-color: #FAEEC0; \
      } \
\
      table.building_upgrade_costs td.resource_icon img, \
      table.building_upgrade_costs td.resource_missing img, \
      table.lootable_resources td.resource_icon img, \
      table.combat_looted td.resource_icon img { \
        height: 11px; \
      } \
\
      table.resource_use_tool_tip, \
      table.lootable_resources tbody td.resource_lootable, \
      table.target_military_garrison tbody td { \
        text-align: right; \
      } \
\
      table.resource_use_tool_tip col { \
        border-left: 1px dashed #ECCF8E; \
        border-right: 1px dashed #ECCF8E; \
      } \
       \
      table.resource_use_tool_tip col:first-of-type { \
        border-left: none; \
      } \
\
      table.resource_use_tool_tip col:last-of-type { \
        border-right: none; \
      } \
\
      table.building_upgrade_costs td.resource_missing { \
        color: #AA0303; \
        text-align: right; \
      } \
\
      table.building_upgrade_costs td.resource_cost { \
        text-align: right; \
      } \
\
      table.resources_in_transit_tool_tip img, \
      table.resource_use_tool_tip img { \
        padding: 0px 0px; \
        padding-top: 1px; \
      } \
\
      table.resources_in_transit_tool_tip .resource_count, \
      table.training_units_tool_tip .training_count, \
      table.deploying_units_tool_tip .deploying_count  \
      table.plundering_units_tool_tip .plundering_count{ \
        text-align: right; \
      } \
\
      div.combat_type_blockade, \
      div.combat_type_plunder { \
        max-width: 25px; \
        width: 25px; \
        height: 15px; \
        max-height: 15px; \
        background-size: 25px auto; \
        background-position: left top; \
        background-repeat: no-repeat; \
        background-position: 0px 0px; \
      } \
      div.combat_type_blockade { \
        background-image: url("skin/actions/blockade.jpg"); \
      } \
      div.combat_type_plunder { \
        background-image: url("skin/actions/plunder.jpg"); \
      } \
\
      /**************************************************************/ \
      /* Resource table specific formatting */ \
\
      #ImperatorOverviewResourceTable .resource_consumption, \
      #ImperatorOverviewResourceTable .resource_consumption a { \
        font-size: 9px; \
      } \
\
      #ImperatorOverviewResourceTable .resources_transporting { \
        font-size: 9px; \
        line-height: 10px; \
        color: #4455EB; \
      } \
\
      #ImperatorOverviewResourceTable .is_under_safe_limit:before { \
        content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEFJREFUeNpi/P//PwMIhOrzQhhAsPriZ0YQzYQugcxnQhaE6YABxhA9HhRdyICJAQ/AayzxOtFdzYRuFLIVAAEGANwqFwuukYKqAAAAAElFTkSuQmCC"); \
        float: left; \
      } \
\
      #ImperatorOverviewResourceTable .resource_current { \
        white-space: nowrap; \
      } \
\
      #ImperatorOverviewResourceTable td.research, \
      #ImperatorOverviewResourceTable td.population, \
      #ImperatorOverviewResourceTable td.population_growth { \
        text-align: center;; \
      } \
\
      #ImperatorOverviewResourceTable td.population_growth_icon img { \
        width: 18px; \
      } \
\
      #ImperatorOverviewResourceTable a.transport_goods, \
      #ImperatorOverviewResourceTable a.to_town_hall, \
      #ImperatorOverviewBuildingsTable a.transport_goods, \
      #ImperatorOverviewBuildingsTable a.to_city_view, \
      #ImperatorOverviewMilitaryTable a.deploy_army, \
      #ImperatorOverviewMilitaryTable a.deploy_navy, \
      #ImperatorOverviewMilitaryTable a.to_barracks, \
      #ImperatorOverviewMilitaryTable a.to_shipyard, \
      #ImperatorOverviewEspionageTable a.spy_mission, \
      #ImperatorOverviewEspionageTable a.pillage_mission, \
      #ImperatorOverviewEspionageTable a.blockade_mission, \
      #ImperatorOverviewEspionageTable a.occupy_mission, \
      #ImperatorOverviewEspionageTable a.send_spy_mission, \
      #ImperatorOverviewEspionageTable a.remove_espionage_target { \
       \
        max-width: 25px; \
        width: 25px; \
        height: 17px; \
        display: inline-block; \
        background-size: 25px auto; \
        background-position: left top; \
        background-repeat: no-repeat; \
        background-position: 0px 0px; \
      } \
\
      #ImperatorOverviewResourceTable a.transport_goods, \
      #ImperatorOverviewBuildingsTable a.transport_goods { \
        background-image: url("skin/actions/transport.jpg"); \
        margin-left: 2px; \
      } \
\
      #ImperatorOverviewResourceTable a.to_town_hall, \
      #ImperatorOverviewBuildingsTable a.to_city_view { \
        background-image: url("skin/layout/icon-city2.png"); \
      } \
\
      #ImperatorOverviewResourceTable a.transport_goods:hover, \
      #ImperatorOverviewBuildingsTable a.transport_goods:hover, \
      #ImperatorOverviewMilitaryTable a.deploy_navy:hover, \
      #ImperatorOverviewMilitaryTable a.deploy_army:hover, \
      #ImperatorOverviewEspionageTable a.pillage_mission:hover, \
      #ImperatorOverviewEspionageTable a.blockade_mission:hover, \
      #ImperatorOverviewEspionageTable a.occupy_mission:hover, \
      #ImperatorOverviewEspionageTable a.send_spy_mission:hover { \
        background-position: 0px -17px; \
      } \
\
      #ImperatorOverviewResourceTable tr.current a.transport_goods, \
      #ImperatorOverviewBuildingsTable tr.current a.transport_goods, \
      #ImperatorOverviewMilitaryTable tr.current a.deploy_navy, \
      #ImperatorOverviewMilitaryTable tr.current a.deploy_army { \
        background-position: 0px -34px; \
      } \
\
      #ImperatorOverviewResourceTable.city_type_deployedCities a.transport_goods, \
      #ImperatorOverviewResourceTable.city_type_occupiedCities a.transport_goods, \
      #ImperatorOverviewBuildingsTable.city_type_deployedCities a.transport_goods, \
      #ImperatorOverviewBuildingsTable.city_type_occupiedCities a.transport_goods { \
        background-position: 0px -34px; \
      } \
\
      .imperator_overview table.overview td.actions { \
        text-align: left; \
      } \
\
      #ImperatorOverviewResourceTable th.actions, \
      #ImperatorOverviewBuildingsTable th.actions, \
      #ImperatorOverviewBuildingsTable td.actions, \
      #ImperatorOverviewMilitaryTable th.actions { \
        width: 52px !important; \
        max-width: 52px !important; \
        min-width: 52px !important; \
      }  \
\
      /************************************************************/ \
      /* Percent bars and warning indications */ \
       \
      .imperator_overview .percent_bar { \
        border-radius: 2px; \
        height: 3px; \
        background-color: !transparent; \
        border: 1px solid #B07D56; \
        overflow: hidden; \
        min-width: 45px; \
        margin-top: 1px; \
      } \
\
      .imperator_overview .percent_bar .percent_bar_active {  \
        height: 100%; \
        border-top-left-radius: 2px; \
        border-bottom-left-radius: 2px; \
        background-color: #481010; \
      } \
\
      .imperator_overview .percent_bar.expiration_forseeable .percent_bar_active { \
        background-color: #7F1D1A; \
      } \
\
      .imperator_overview .percent_bar.expiration_soon .percent_bar_active {  \
        background-color: #B42521; \
      } \
\
      .imperator_overview .percent_bar.expiration_imminent .percent_bar_active, \
      .imperator_overview .percent_bar.expiration_now .percent_bar_active {  \
        background-color: #FF0000; \
      } \
\
      .imperator_overview .percent_bar.percent_bar_desire_filled.percent_bar_filled \
         .percent_bar_active { \
        background-color: #285E28; \
      } \
\
      .imperator_overview .expiration_now, \
      .imperator_overview .expiration_imminent { \
        font-weight: bold; \
        color: red; \
      } \
\
      .imperator_overview .expiration_soon { \
        font-weight: bold; \
        color: #B42521; \
      } \
\
      .imperator_overview .expiration_forseeable { \
        color: #8F1D1A; \
      } \
\
      .imperator_overview .imperator_warning { \
        color: red; \
      } \
\
      /***************************************************************/ \
      /* Buildings table specific formatting */ \
\
      #ImperatorOverviewBuildingsTable tbody td{ \
        vertical-align: middle; \
      } \
\
      #ImperatorOverviewBuildingsTable th {  \
        max-width: 15px; \
        width: 15px; \
        overflow: hidden;  \
        cursor: default; \
        height: 36px; \
      } \
\
      #ImperatorOverviewBuildingsTable td {  \
        width: 15px; \
      } \
      #ImperatorOverviewBuildingsTable th.building[colspan="2"] { max-width: 20px; } \
      #ImperatorOverviewBuildingsTable th.building[colspan="3"] { max-width: 35px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="4"] { max-width: 45px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="5"] { max-width: 55px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="6"] { max-width: 65px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="7"] { max-width: 75px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="8"] { max-width: 85px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="9"] { max-width: 95px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="10"] { max-width: 100px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="11"] { max-width: 105px;} \
      #ImperatorOverviewBuildingsTable th.building[colspan="12"] { max-width: 110px;} \
\
\
      #ImperatorOverviewBuildingsTable td.building_upgrading a { \
        font-weight: bold; \
        color: green; \
      } \
\
      #ImperatorOverviewBuildingsTable col.building.building_additional { \
        border-left: none; \
      } \
\
      #ImperatorOverviewBuildingsTable col.building { \
        border-right: none; \
      } \
\
      /**************************************************************/ \
      /* Military table specific formatting */ \
\
      #ImperatorOverviewMilitaryTable thead { \
        height: 36px; \
        cursor: default; \
      } \
\
      #ImperatorOverviewMilitaryTable th { \
        overflow: hidden; \
        max-width: 23px; \
      } \
\
      #ImperatorOverviewMilitaryTable a.deploy_army { \
        background-image: url("skin/actions/move_army.jpg"); \
      } \
\
      #ImperatorOverviewMilitaryTable a.deploy_navy { \
        background-image: url("skin/actions/move_fleet.jpg"); \
        margin-left: 2px; \
      } \
\
      #ImperatorOverviewMilitaryTable a.to_barracks { \
        background-image:url("skin/img/city/barracks_l.png"); \
        background-size: 30px auto; \
        background-position: bottom left; \
      } \
\
      #ImperatorOverviewMilitaryTable a.to_shipyard { \
        background-image:url("skin/img/city/shipyard_l.png"); \
      } \
\
      #ImperatorOverviewMilitaryTable a.to_barracks+a.to_shipyard { \
        margin-left: 2px; \
      } \
\
      #ImperatorOverviewMilitaryTable .military_training { \
        font-size: 9px; \
        line-height: 10px; \
        color: green; \
      } \
\
      #ImperatorOverviewMilitaryTable .military_deploying { \
        font-size: 9px; \
        line-height: 10px; \
        color: #4455EB; \
      } \
\
      #ImperatorOverviewMilitaryTable .military_plundering { \
        font-size: 9px; \
        line-height: 10px; \
        color: #8302A3; \
      } \
      /**************************************************************/ \
      /* Espionage table specific formatting */ \
\
      #ImperatorOverviewEspionageTable td.city_tradegood { \
        width: auto; \
        min-width: 50px; \
        text-align: left; \
      } \
      #ImperatorOverviewEspionageTable td.actions { \
        min-width: 160px; \
      } \
      #ImperatorOverviewEspionageTable a.spy_mission { \
        /*background-image: url("skin/friends/citymenu.png"); \
        background-position: 0px -129px; */\
        background-image: url("skin/layout/icon-mission.png"); \
      } \
      #ImperatorOverviewEspionageTable a.pillage_mission { \
        background-image: url("skin/actions/plunder.jpg"); \
        margin-left: 2px; \
      } \
      #ImperatorOverviewEspionageTable a.blockade_mission { \
        background-image: url("skin/actions/blockade.jpg"); \
        margin-left: 2px; \
      } \
      #ImperatorOverviewEspionageTable a.occupy_mission { \
        background-image: url("skin/actions/occupy.jpg"); \
        margin-left: 2px; \
      } \
      #ImperatorOverviewEspionageTable a.send_spy_mission { \
        background-image: url("skin/actions/espionage.jpg"); \
        margin-left: 2px; \
      } \
      #ImperatorOverviewEspionageTable a.remove_espionage_target { \
        background-image: url("skin/actions/defend.jpg"); \
        background-position: 0px -34px; \
        margin-left: 2px; \
      } \
      #ImperatorOverviewEspionageTable a.player_state_inactive { \
        color: grey; \
      } \
      #ImperatorOverviewEspionageTable a.player_state_vacation { \
        color: green; \
      } \
      #ImperatorOverviewEspionageTable tbody td { \
        vertical-align: middle; \
      } \
      #ImperatorOverviewEspionageTable td.player, \
      #ImperatorOverviewEspionageTable td.location { \
        text-align: left; \
      } \
      .espionage_blockader, \
      .espionage_occupier { \
        margin-left: 1pt; \
        margin-right: 1pt; \
      } \
      .target_military_garrison thead th { \
        height: 36px; \
        cursor: default; \
      } \
      .target_military_garrison th { \
        overflow: hidden; \
        max-width: 23px; \
      } \
      .target_military_garrison th.military { \
        background-size: auto 33px; \
      } \
      .target_military_garrison th.military_phalanx { \
        background-image:url("skin/characters/military/x60_y60/y60_phalanx_faceright.png"); \
      } \
      .target_military_garrison th.military_steamgiant { \
        background-image:url("skin/characters/military/x60_y60/y60_steamgiant_faceright.png"); \
      } \
      .target_military_garrison th.military_spearman { \
        background-image:url("skin/characters/military/x60_y60/y60_spearman_faceright.png"); \
      } \
      .target_military_garrison th.military_swordsman { \
        background-image:url("skin/characters/military/x60_y60/y60_swordsman_faceright.png"); \
      } \
      .target_military_garrison th.military_slinger { \
        background-image:url("skin/characters/military/x60_y60/y60_slinger_faceright.png"); \
      } \
      .target_military_garrison th.military_archer { \
        background-image:url("skin/characters/military/x60_y60/y60_archer_faceright.png"); \
      } \
      .target_military_garrison th.military_marksman { \
        background-image:url("skin/characters/military/x60_y60/y60_marksman_faceright.png"); \
      } \
      .target_military_garrison th.military_ram { \
        background-image:url("skin/characters/military/x60_y60/y60_ram_faceright.png"); \
        background-size: auto 18px; \
      } \
      .target_military_garrison th.military_catapult { \
        background-image:url("skin/characters/military/x60_y60/y60_catapult_faceright.png"); \
        background-size: auto 23px; \
      } \
      .target_military_garrison th.military_mortar { \
        background-image:url("skin/characters/military/x60_y60/y60_mortar_faceright.png"); \
        background-size: auto 22px; \
      } \
      .target_military_garrison th.military_gyrocopter { \
        background-image:url("skin/characters/military/x60_y60/y60_gyrocopter_faceright.png"); \
        background-size: auto 21px; \
      } \
      .target_military_garrison th.military_bombardier { \
        background-image:url("skin/characters/military/x60_y60/y60_bombardier_faceright.png"); \
      } \
      .target_military_garrison th.military_cook { \
        background-image:url("skin/characters/military/x60_y60/y60_cook_faceright.png"); \
      } \
      .target_military_garrison th.military_medic { \
        background-image:url("skin/characters/military/x60_y60/y60_medic_faceright.png"); \
      } \
      .target_military_garrison th.military_ship_flamethrower { \
        background-image:url("skin/characters/fleet/60x60/ship_flamethrower_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_steamboat { \
        background-image:url("skin/characters/fleet/60x60/ship_steamboat_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_ram { \
        background-image:url("skin/characters/fleet/60x60/ship_ram_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_ballista { \
        background-image:url("skin/characters/fleet/60x60/ship_ballista_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_catapult { \
        background-image:url("skin/characters/fleet/60x60/ship_catapult_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_mortar { \
        background-image:url("skin/characters/fleet/60x60/ship_mortar_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_submarine { \
        background-image:url("skin/characters/fleet/60x60/ship_submarine_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_paddlespeedship { \
        background-image:url("skin/characters/fleet/60x60/ship_paddlespeedship_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_ballooncarrier { \
        background-image:url("skin/characters/fleet/60x60/ship_ballooncarrier_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_tender { \
        background-image:url("skin/characters/fleet/60x60/ship_tender_faceright.png"); \
        background-size: 33px auto; \
      } \
      .target_military_garrison th.military_ship_rocketship { \
        background-image:url("skin/characters/fleet/60x60/ship_rocketship_faceright.png"); \
        background-size: 33px auto; \
      } \
\
      /*****************************************************************/ \
      /* Image styling for table headers */ \
\
      #ImperatorOverviewBuildingsTable th.building, \
      #ImperatorOverviewMilitaryTable th.military, \
      .imperator_overview table.overview th.action_points, \
      #ImperatorOverviewResourceTable th.population, \
      #ImperatorOverviewResourceTable th.population_growth, \
      #ImperatorOverviewResourceTable th.research, \
      #ImperatorOverviewResourceTable th.resource, \
      #ImperatorOverviewEspionageTable th.location, \
      #ImperatorOverviewEspionageTable th.travel_time, \
      #ImperatorOverviewEspionageTable th.townhall_level, \
      #ImperatorOverviewEspionageTable th.wall_level, \
      #ImperatorOverviewEspionageTable th.resources_lootable, \
      #ImperatorOverviewEspionageTable th.combats, \
      #ImperatorOverviewEspionageTable th.military_score, \
      .target_military_garrison th.military \
       { \
        -webkit-user-select: none; \
        -khtml-user-select: none; \
        -moz-user-select: none; \
        -o-user-select: none; \
        user-select: none; \
        cursor: default; \
        color: transparent; \
        background-repeat: no-repeat; \
        background-attachment: center; \
        background-position: center; \
      } \
\
      .imperator_overview table.overview td.action_points, \
      .imperator_overview table.overview th.action_points { \
        max-width: 20px; \
        width: 20px; \
        overflow: hidden; \
      } \
\
      .imperator_overview table.overview th.action_points { \
        background-image:url("skin/resources/icon_actionpoints.png"); \
        max-width: 20px; \
      } \
      .imperator_overview table.overview td.action_points { \
        max-width: 20px; \
      } \
       \
      #ImperatorOverviewResourceTable th.population { \
        background-image:url("skin/resources/icon_population.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.population_growth { \
        background-image:url("skin/icons/growth_positive.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.research { \
        background-image:url("skin/layout/bulb-on.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.resource_wood { \
        background-image:url("skin/resources/icon_wood.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.resource_wine { \
        background-image:url("skin/resources/icon_wine.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.resource_marble { \
        background-image:url("skin/resources/icon_marble.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.resource_crystal { \
        background-image:url("skin/resources/icon_crystal.png"); \
      } \
       \
      #ImperatorOverviewResourceTable th.resource_sulfur { \
        background-image:url("skin/resources/icon_sulfur.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building { \
        background-size: 55px; \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_spots { \
        background-image:url("skin/img/city/flag_red.png"); \
        background-size: 25px; \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_townHall { \
        background-image:url("skin/img/city/townhall_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_palace { \
        background-image:url("skin/img/city/palace_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_palaceColony { \
        background-image:url("skin/img/city/palaceColony_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_tavern { \
        background-image:url("skin/img/city/taverne_r.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_museum { \
        background-image:url("skin/img/city/museum_r.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_academy { \
        background-image:url("skin/img/city/academy_l.png"); \
      }       \
\
      #ImperatorOverviewBuildingsTable th.building_workshop { \
        background-image:url("skin/img/city/workshop_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_temple { \
        background-image:url("skin/img/city/temple_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_embassy { \
        background-image:url("skin/img/city/embassy_l.png"); \
      }  \
\
      #ImperatorOverviewBuildingsTable th.building_warehouse { \
        background-image:url("skin/img/city/warehouse_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_dump { \
        background-image:url("skin/img/city/dump_l.png"); \
      }  \
\
      #ImperatorOverviewBuildingsTable th.building_branchOffice { \
        background-image:url("skin/img/city/branchoffice_l.png"); \
      }  \
\
      #ImperatorOverviewBuildingsTable th.building_port { \
        background-image:url("skin/img/city/port_l.png"); \
      }  \
\
      #ImperatorOverviewBuildingsTable th.building_wall { \
        background-image:url("skin/img/city/wall.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_safehouse { \
        background-image:url("skin/img/city/safehouse_l.png"); \
        background-size: 65px; \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_barracks { \
        background-image:url("skin/img/city/barracks_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_shipyard { \
        background-image:url("skin/img/city/shipyard_l.png"); \
        background-size: 45px; \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_pirateFortress { \
        background-image:url("skin/img/city/pirateFortress_l.png"); \
        background-size: 45px; \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_forester { \
        background-image:url("skin/img/city/forester_l.png"); \
      }       \
\
      #ImperatorOverviewBuildingsTable th.building_carpentering { \
        background-image:url("skin/img/city/carpentering_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_winegrower { \
        background-image:url("skin/img/city/winegrower_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_vineyard { \
        background-image:url("skin/img/city/vineyard_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_stonemason { \
        background-image:url("skin/img/city/stonemason_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_architect { \
        background-image:url("skin/img/city/architect_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_glassblowing { \
        background-image:url("skin/img/city/glassblowing_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_optician { \
        background-image:url("skin/img/city/optician_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_alchemist { \
        background-image:url("skin/img/city/alchemist_l.png"); \
      } \
\
      #ImperatorOverviewBuildingsTable th.building_fireworker { \
        background-image:url("skin/img/city/fireworker_l.png"); \
      } \
\
      #ImperatorOverviewMilitaryTable th.military { \
        background-size: auto 33px; \
      } \
\
      #ImperatorOverviewMilitaryTable th.military_phalanx { \
        background-image:url("skin/characters/military/x60_y60/y60_phalanx_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_steamgiant { \
        background-image:url("skin/characters/military/x60_y60/y60_steamgiant_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_spearman { \
        background-image:url("skin/characters/military/x60_y60/y60_spearman_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_swordsman { \
        background-image:url("skin/characters/military/x60_y60/y60_swordsman_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_slinger { \
        background-image:url("skin/characters/military/x60_y60/y60_slinger_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_archer { \
        background-image:url("skin/characters/military/x60_y60/y60_archer_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_marksman { \
        background-image:url("skin/characters/military/x60_y60/y60_marksman_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_ram { \
        background-image:url("skin/characters/military/x60_y60/y60_ram_faceright.png"); \
        background-size: auto 18px; \
      } \
      #ImperatorOverviewMilitaryTable th.military_catapult { \
        background-image:url("skin/characters/military/x60_y60/y60_catapult_faceright.png"); \
        background-size: auto 23px; \
      } \
      #ImperatorOverviewMilitaryTable th.military_mortar { \
        background-image:url("skin/characters/military/x60_y60/y60_mortar_faceright.png"); \
        background-size: auto 22px; \
      } \
      #ImperatorOverviewMilitaryTable th.military_gyrocopter { \
        background-image:url("skin/characters/military/x60_y60/y60_gyrocopter_faceright.png"); \
        background-size: auto 21px; \
      } \
      #ImperatorOverviewMilitaryTable th.military_bombardier { \
        background-image:url("skin/characters/military/x60_y60/y60_bombardier_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_cook { \
        background-image:url("skin/characters/military/x60_y60/y60_cook_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_medic { \
        background-image:url("skin/characters/military/x60_y60/y60_medic_faceright.png"); \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_flamethrower { \
        background-image:url("skin/characters/fleet/60x60/ship_flamethrower_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_steamboat { \
        background-image:url("skin/characters/fleet/60x60/ship_steamboat_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_ram { \
        background-image:url("skin/characters/fleet/60x60/ship_ram_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_ballista { \
        background-image:url("skin/characters/fleet/60x60/ship_ballista_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_catapult { \
        background-image:url("skin/characters/fleet/60x60/ship_catapult_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_mortar { \
        background-image:url("skin/characters/fleet/60x60/ship_mortar_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_submarine { \
        background-image:url("skin/characters/fleet/60x60/ship_submarine_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_paddlespeedship { \
        background-image:url("skin/characters/fleet/60x60/ship_paddlespeedship_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_ballooncarrier { \
        background-image:url("skin/characters/fleet/60x60/ship_ballooncarrier_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_tender { \
        background-image:url("skin/characters/fleet/60x60/ship_tender_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewMilitaryTable th.military_ship_rocketship { \
        background-image:url("skin/characters/fleet/60x60/ship_rocketship_faceright.png"); \
        background-size: 33px auto; \
      } \
      #ImperatorOverviewEspionageTable th.location { \
        background-image: url("skin/layout/icon-island.png"); \
      } \
      #ImperatorOverviewEspionageTable th.travel_time { \
        background-image: url("skin/resources/icon_time.png"); \
      } \
      #ImperatorOverviewEspionageTable th.townhall_level { \
        background-image:url("skin/img/city/townhall_l.png"); \
        background-size: auto 100%; \
      } \
      #ImperatorOverviewEspionageTable th.wall_level { \
        background-image:url("skin/img/city/wall.png"); \
        background-size: auto 100%; \
      } \
      #ImperatorOverviewEspionageTable th.resources_lootable { \
        background-image: url("skin/characters/fleet/40x40/ship_transport_r_40x40.png"); \
        background-size: auto 100%; \
      } \
      #ImperatorOverviewEspionageTable th.combats { \
        background-image: url("skin/minimized/plunder.png"); \
        background-size: auto 120%; \
      } \
      #ImperatorOverviewEspionageTable th.military_score { \
        background-image: url("skin/characters/military/x60_y60/y60_phalanx_faceright.png"); \
        background-size: auto 100%; \
      } \
\
      /********************** Settings dialog *************************/ \
      #options .tabmenu .tab { \
        width: auto; \
      } \
'
    );
  }
  
  var settings = new IkaTools.Settings.Settings('ImperatorSettings');
  
  var localizedLanguage = settings.choice(
      'language',
      '',
      { 
        'Automatic': '',
        'English': 'en',
        'Bosnian': 'ba',
        'Spanish': 'es',
        'French': 'fr',
        'German': 'de',
        'Hungarian': 'hu',
        'Polish': 'pl',
      },
      localizer.delayedLocalize('settings','language'));
  
  var showResourceOverview = settings.boolean(
      'show_resource_overview',
      true,
      localizer.delayedLocalize('misc','resource_overview'));
  var showBuildingsOverview = settings.boolean(
      'show_buildings_overview',
      true,
      localizer.delayedLocalize('misc','buildings_overview'));
  var showMilitaryOverview = settings.boolean(
      'show_military_overview',
      true,
      localizer.delayedLocalize('misc','military_overview'));
  var showEspionageOverview = settings.boolean(
      'show_espionage_overview',
      true,
      localizer.delayedLocalize('misc','espionage_overview'));
      
  
  var autoAcceptDailyBonus = settings.boolean(
      'auto_accept_daily_bonus',
      true,
      localizer.delayedLocalize('settings','auto_accept_daily_bonus'));
  var hideAds = settings.boolean(
      'hide_ads',
      true,
      localizer.delayedLocalize('settings','hide_ads'));
  var hideFacebook = settings.boolean(
      'hide_facebook',
      true,
      localizer.delayedLocalize('settings','hide_facebook'));
  var hideFriendsBar = settings.boolean(
      'hide_friends_bar',
      false,
      localizer.delayedLocalize('settings','hide_friends_bar'));
  var hideChat = settings.boolean(
      'hide_chat',
      false,
      localizer.delayedLocalize('settings','hide_chat'));
  var transportButtons = settings.boolean(
      'transport_buttons',
      true,
      localizer.delayedLocalize('settings','transport_buttons'));
  var donationButtons = settings.boolean(
      'donation_buttons',
      true,
      localizer.delayedLocalize('settings','donation_buttons'));
  var showCityOwners = settings.boolean(
      'show_city_owners',
      false,
      localizer.delayedLocalize('settings', 'show_city_owners'));
  var preventAccidentalColonyDestruction = settings.boolean(
      'prevent_accidental_colony_destruction',
      true,
      localizer.delayedLocalize('settings', 'prevent_accidental_colony_destruction'));
  var initializeColonizationMissionsForPirateRaiding = settings.boolean(
      'initialize_colonization_missions_for_pirate_raiding',
      false,
      localizer.delayedLocalize('settings', 'initialize_colonization_missions_for_pirate_raiding'));
      
  var testDesktopAlert = settings.html(
      function desktopAlertHtml() { 
        return '<a id="DesktopAlertTest" class="button">%s</a>'.format(
            localizer.localize('settings','do_test'));
      },
      function desktopAlertPostRender() {
        function showTestDesktopAlert() {
          if (window.webkitNotifications) {
            if (window.webkitNotifications.checkPermission() == 0) { // PERMISSION_ALLOWED
              var notification = window.webkitNotifications.createNotification(
                  'http://' + document.domain + '/skin/layout/advisors/general_alert.png', 
                  localizer.localize('settings','test_desktop_alert_title'),
                  localizer.localize('settings','test_desktop_alert_text'));
              notification.onclick = IkaTools.Logging.debuggable(
                  'Imperator.testDesktopAlert.dismiss',
                  function closeNotification() {
                    notification.cancel();
                  });
              notification.show();
              return true;
            }
          } else {
            alert(localizer.localize('settings','desktop_alerts_not_supported'));
          }
          return false;
        }
        $('#DesktopAlertTest').click(IkaTools.Logging.debuggable(
            'Imperator.testDesktopAlert',
            function testDesktopAlert() {
              if (!showTestDesktopAlert()) {
                window.webkitNotifications.requestPermission(
                   IkaTools.Logging.debuggable(
                       'Imperator.testDesktopAlert.requestPermission',
                       showTestDesktopAlert));
              }
            }));
      },
      localizer.delayedLocalize('settings','test_desktop_alert'));
  
  var buildingCompletionAlert_Desktop = settings.boolean(
      'building_completion_alert_desktop',
      false,
      localizer.delayedLocalize('settings','building_completion_alert_desktop'));
  var transportMissionLoaded_Desktop = settings.boolean(
      'transport_loaded_alert_desktop',
      false,
      localizer.delayedLocalize('settings','transport_loaded_alert_desktop'));
  var transportMissionArrived_Desktop = settings.boolean(
      'transport_arrived_alert_desktop',
      false,
      localizer.delayedLocalize('settings','transport_arrived_alert_desktop'));
  var transportMissionReturned_Desktop = settings.boolean(
      'transport_returned_alert_desktop',
      false,
      localizer.delayedLocalize('settings','transport_returned_alert_desktop'));
  var deployArmyLoaded_Desktop = settings.boolean(
      'deploy_army_loaded_alert_desktop',
      false,
      localizer.delayedLocalize('settings','deploy_army_loaded_alert_desktop'));
  var deployArmyArrived_Desktop = settings.boolean(
      'deploy_army_arrived_alert_desktop',
      false,
      localizer.delayedLocalize('settings','deploy_army_arrived_alert_desktop'));
  var deployArmyReturned_Desktop = settings.boolean(
      'deploy_army_returned_alert_desktop',
      false,
      localizer.delayedLocalize('settings','deploy_army_returned_alert_desktop'));
  var deployNavyArrived_Desktop = settings.boolean(
      'deploy_navy_arrived_alert_desktop',
      false,
      localizer.delayedLocalize('settings','deploy_navy_arrived_alert_desktop'));
  var deployNavyReturned_Desktop = settings.boolean(
      'deploy_navy_returned_alert_desktop',
      false,
      localizer.delayedLocalize('settings','deploy_navy_returned_alert_desktop'));
  var pillageLoaded_Desktop = settings.boolean(
      'pillage_loaded_alert_desktop',
      false,
      localizer.delayedLocalize('settings','pillage_loaded_alert_desktop'));
  var pillageArrived_Desktop = settings.boolean(
      'pillage_arrived_alert_desktop',
      false,
      localizer.delayedLocalize('settings','pillage_arrived_alert_desktop'));
  var pillageReturned_Desktop = settings.boolean(
      'pillage_returned_alert_desktop',
      false,
      localizer.delayedLocalize('settings','pillage_returned_alert_desktop'));
  var ignoredHostileMissions = settings.text(
      'ignored_hostile_missions',
      '[]',
      localizer.delayedLocalize('settings', 'ignored_hostile_missions'));
      
      
  var debugSetting = settings.html(
      function debugHtml() {
        return '<input id="EmpireDataDebug" type="text" style="width:100%"/>';
      },
      function debugPostRender() {
        $('#EmpireDataDebug').val(IkaTools.EmpireData.getDebugString());
      },
      IkaTools.Utils.fixedFunction('Empire data'));
  var resetData = settings.html(
      function resetDataHtml() {
        return '<a id="ResetImperatorData" class="button">Reset</a>';
      },
      function resetDataPostRender() {
        $('#ResetImperatorData').click(function resetDataClicked() {
          IkaTools.EmpireData.resetData();
          window.location.reload();
        });
      },
      IkaTools.Utils.fixedFunction('Reset data'));
  var espionageDebugSetting = settings.html(
      function debugHtml() {
        return '<input id="EspionageDataDebug" type="text" style="width:100%"/>';
      },
      function debugPostRender() {
        $('#EspionageDataDebug').val(IkaTools.EmpireData.Espionage.getDebugString());
      },
      IkaTools.Utils.fixedFunction('Espionage data'));
  var resetEspionageData = settings.html(
      function resetDataHtml() {
        return '<a id="ResetEspionageData" class="button">Reset Espionage</a>';
      },
      function resetDataPostRender() {
        $('#ResetEspionageData').click(function resetDataClicked() {
          IkaTools.EmpireData.Espionage.resetData();
          window.location.reload();
        });
      },
      IkaTools.Utils.fixedFunction('Reset espionage data'));
  var exceptionLogSetting = settings.html(
      function exceptionLogHtml() {
        return '<input id="ExceptionLog" type="text" style="width:100%"/>';
      },
      function exceptionLogPostRender() {
        $('#ExceptionLog').val(JSON.stringify(IkaTools.Logging.getExceptionLog()));
      },
      IkaTools.Utils.fixedFunction('Errors'));

  function addSettingsLink() {
    var settingsWindow = new IkaTools.UI.SettingsWindow(
      'ImperatorSettings',
      'Imperator',
      settings, 
      [new IkaTools.UI.SettingsWindow.Group(localizer.localize('settings','general'),
          [localizedLanguage]),
       new IkaTools.UI.SettingsWindow.Group(localizer.localize('settings','overviews'),
          [showResourceOverview, showBuildingsOverview, showMilitaryOverview,
           showEspionageOverview]),
       new IkaTools.UI.SettingsWindow.Group(localizer.localize('settings','tweaks'),
          [autoAcceptDailyBonus, hideAds, hideFacebook, hideFriendsBar, hideChat,
           transportButtons, donationButtons, showCityOwners,
           preventAccidentalColonyDestruction, initializeColonizationMissionsForPirateRaiding
           ]),
       new IkaTools.UI.SettingsWindow.Group(localizer.localize('settings','alerts'),
          [testDesktopAlert, buildingCompletionAlert_Desktop,
           transportMissionLoaded_Desktop, transportMissionArrived_Desktop,
           transportMissionReturned_Desktop, deployArmyLoaded_Desktop,
           deployArmyArrived_Desktop, deployArmyReturned_Desktop,
           deployNavyArrived_Desktop, deployNavyReturned_Desktop,
           pillageLoaded_Desktop, pillageArrived_Desktop, pillageReturned_Desktop,
           /*ignoredHostileMissions*/]),
       new IkaTools.UI.SettingsWindow.Group(localizer.localize('settings','debug'),
           [debugSetting, resetData, espionageDebugSetting, resetEspionageData, 
            exceptionLogSetting]),
      ]);
    settingsWindow.registerSavedSettingsHandler(function reloadOnSavedSettings() {
      window.location.reload();
    });
    settingsWindow.addAsScriptOptionsLink();
  }
  
  function Updateable(container, permanent, ids) {
    this.container = container;
    this.ids = $.makeArray(ids);
    this.elements = [];
    if (!this.ids.length) {
      this.ids[0] = IkaTools.Utils.nextId("updateable_");
    }
    this.permanent = permanent;
    this.events = {};
  }

  $.extend(Updateable.prototype, {
    getElement: function getElement(index) {
      var element = this.elements[index];
      if (!element || !element.length) {
        element = $(document.getElementById(this.ids[index]));
        this.elements[index] = element;
      }
      return element;
    },
    getElements: function getElements() {
      for (var i = 0; i < this.ids.length; i++) {
        this.getElement(i);
      }
      return this.elements;
    },
    destroy: function destroy() {
      return this.container.destroy(this);
    },
    getId: function getId(index) {
      return this.ids[index];
    },
    getIdentifier: function getIdentifier() {
      return this.ids.join(',');
    },
    isPermanent: function isPermanent() {
      return this.permanent;
    },
    registerUpdate: function registerUpdate(eventName, f) {
      this.events[eventName] = f;
      return this;
    },
    updateForEvent: function updateForEvent(eventName) {
      var f = this.events[eventName];
      if (f) {
        f.apply(this, this.getElements());
      }
    },
    registerTickerUpdate: function registerTickerUpdate(f) {
      return this.registerUpdate('ticker', f);
    },
    registerFastTickerUpdate: function registerFastTickerUpdate(f) {
      return this.registerUpdate('fastTicker', f);
    },
  });
  
  function Updateables(name) {
    this.name = name;
    this.active = false;
    this.undispatchedEvents = {};
    this.updateables = {};
  }
  
  $.extend(Updateables.prototype, {
    create: function create() {
      var updateable = new Updateable(this, false, arguments);
      this.updateables[updateable.getIdentifier()] = updateable;
      return updateable;
    },
    createPermanent: function createPermanent() {
      var updateable = new Updateable(this, true, arguments)
      this.updateables[updateable.getIdentifier()] = updateable;
      return updateable;
    },
    destroy: function destroy(updateable) {
      delete this.updateables[updateable.getIdentifier()];
    },
    activate: function activate() {
      $.each(this.updateables, function (key, updateable) {
        updateable.getElements();
      });
      if (!this.tickerEvent) {
        this.tickerEvent = setInterval(IkaTools.Logging.debuggable(
            { label: 'Imperator.Updateable.tickerUpdate[' +  this.name + ']', },
            this.updateForEvent.bind(this, 'ticker')),
          4000);
      }
      if (!this.fastTickerEvent) {
        this.fastTickerEvent = setInterval(IkaTools.Logging.debuggable(
            {label: 'Imperator.Updateable.fastTickerUpdate[' +  this.name + ']', },
            this.updateForEvent.bind(this, 'fastTicker')),
          1000);
      }
      this.active = true;
      $.each(this.undispatchedEvents, this.updateForEvent.bind(this));
      this.undispatchedEvents = {};
    },
    deactivate: function deactivate() {
      this.active = false;
      if (this.tickerEvent) {
        clearInterval(this.tickerEvent);
        delete this.tickerEvent;
      }
      if (this.fastTickerEvent) {
        clearInterval(this.fastTickerEvent);
        delete this.fastTickerEvent;
      }
    },
    updateForEvent: function updateForEvent(eventName) {
      if (this.active) {
        $.each(this.updateables, function(id, updateable) {
          updateable.updateForEvent(eventName);
        });
      } else {
        this.undispatchedEvents[eventName] = true;
      }
    },
    clear: function clear() {
      var that = this;
      $.each(this.updateables, function(id, updateable) {
        if (!updateable.isPermanent()) {
          delete that.updateables[id];
        }
      });
      this.undispatchedEvents = {};
    },
  });
  
  var clickHandler = function() {
    var idToHandlerMap = {};

    return {
      register: function register(id, f) {
        idToHandlerMap[id] = f;
      },
      dispatch: function(element) {
        var handler = idToHandlerMap[element.id];
        if (handler) {
          handler();
          return true;
        } else {
          IkaTools.Logging.debug("No registered handler for ", element.id, element);
          return false;
        }
      },
    }
  }();
  
  $('#container').on('click.imperator_link_handler', '.imperator_link', 
      IkaTools.Logging.debuggable('Imperator.overview.imperator_link.clicked', 
          function(e) { 
            if (clickHandler.dispatch(e.currentTarget)) {
              e.preventDefault();
            }
          }));

  function Link(id) {
    this.id = id;
  }

  $.extend(Link.prototype, {
    getId: function getId() {
      return this.id;
    },
    toFunction: function toFunction(f, predicate) {
      clickHandler.register(this.id, function() {
        if (!predicate || predicate()) {
          f();
        }
      });
      return this;
    },
    toCitysIslandView: function toCitysIslandView(city, view, params, predicate) {
      clickHandler.register(this.id, function() {
        if (!predicate || predicate()) {
          IkaTools.View.goToCitysIslandView(city, view, params);
        }
      });
      return this;
    },
    /*toIslandView: function toIslandView(islandId, view, params, predicate) {
      clickHandler.register(this.id,
        function() {
          if (!predicate || predicate()) {
            IkaTools.View.goToIslandView(
                IkaTools.View.getCurrentCity(), islandId, view, params);
          }
        });
      return this;
    },*/
    toLocalView: function toLocalView(view, params, predicate) {
      clickHandler.register(this.id, function() {
        if (!predicate || predicate()) {
          IkaTools.View.goToLocalView(view, params);
        }
      });
      return this;
    },
    toCityView: function toCityView(city, view, params, predicate) {
      clickHandler.register(this.id, function() {
         if (!predicate || predicate()) {
           IkaTools.View.goToCityView(city, view, params);
         }
       });
      return this;
    },
    toCityActivation: function toCityActivation(city, predicate) {
      clickHandler.register(this.id, function() {
        if (!predicate || predicate(this)) {
          IkaTools.View.activateCity(city);
        }
      });
      return this;
    },
    toIkariamPage: function toIkariamPage(params, anchor, predicate) {
      clickHandler.register(this.id, function() {
        if (!predicate || predicate(this)) {
          IkaTools.View.goToIkariamFullPage(params, anchor);
        }
      });
      return this;
    },
  });
  
  var toolTips = new IkaTools.UI.ToolTipHandler(
       'imperator_tool_tip', $('<div class="tool_tip_container"/>'));
  toolTips.startHandling($('body'));
  
  function overviewTables() {
    function Tab(name, tabText, tabContentHolder, tabContentId, init, renderer) {
      this.updateables = new Updateables(name);
      
      var render = renderer.bind(this);
      this.mainUpdateable = this.updateables.createPermanent(tabContentId);
      this.mainUpdateable.registerUpdate('redraw', function(element) {
        element.removeClass(
            'city_type_ownCity city_type_deployedCities city_type_occupiedCities');
        element.addClass('city_type_' + IkaTools.View.getCurrentCity().getType());
        element.html(render());
      });
      this.mainUpdateable.registerUpdate('cityChanged', function updateTabTableType(table) {
        table.removeClass(
            'city_type_ownCity city_type_deployedCities city_type_occupiedCities');
        table.addClass('city_type_' + IkaTools.View.getCurrentCity().getType());
      });

      this.isActive = false;
      this.needsRedraw = true;
      //this.render = renderer;

      var tab = this;
      this.initFirstTime = IkaTools.Utils.thunk(function() {
        IkaTools.View.registerIkariamAjaxResponseCallback(function tab_CityChanged() {
          tab.updateables.updateForEvent('cityChanged');
        });
        init.call(tab);
      });

      this.tab = new IkaTools.UI.TabPane.Tab(
          $('<b>%s</b>'.format(tabText)), 
          tabContentHolder,
          { 
            activatedCallback: function() {
              this.isActive = true;
              this.maybeRedraw();
              this.initFirstTime();
              this.updateables.activate();
            }.bind(this),
            deactivatedCallback: function() {
              this.isActive = false;
              this.updateables.deactivate();
            }.bind(this),
          });
    }

    $.extend(Tab.prototype, {
      maybeRedraw: function maybeRedraw(redraw) {
        this.needsRedraw = this.needsRedraw || redraw;
        if (this.isActive && this.needsRedraw) {
          this.updateables.clear();
          this.mainUpdateable.updateForEvent('redraw');
          this.needsRedraw = false;
        }
      },
      getTab: function getTab() {
        return this.tab;
      }
    });
    
    function makeCityNameCells(table, city, excludeTradeGood) {
      var cityLink = new Link('CityLink_%s_%s'.format(table, city.getId()))
          .toCityActivation(city);
      return ('%s' +
              '<td class="city_name">' +
                '<a class="imperator_link" id="%s" href="javascript:void(0)">%s</a>' + 
              '</td>').format(
                  (excludeTradeGood ? '' : ('<td class="city_tradegood imperator_link ">' +
                                              '<img src="skin/resources/icon_%s.png">' + 
                                            '</td>').format(city.getTradeGoodType())),
                   cityLink.getId(),
                   city.getName());
    }
    
    function makeCityNameColGroup(extraCols, excludeTradeGood) {
      return ('<colgroup class="city_name">' + 
                '%s' + 
                '<col class="city_name">' + 
                '%s' +
              '</colgroup>').format(
                  excludeTradeGood ? '' : '<col class="city_tradegood">',
                  extraCols || '');
    }
  
    function makeCityNameHeaderCells(excludeTradeGood) {
      return '<th class="city_name" colspan="%s">%s</th>'.format(
          excludeTradeGood ? '1' : '2',
          localizer.localize('misc','city_name'));
    }
    
    function makeResourceTab() {
      function makeResourceUseTableRow(displaySign, usePerHour, usePerDay, usePerWeek) {
        return makeResourceUseTableRowRaw(
            displaySign,
            IkaTools.Intl.formatInteger(usePerHour),
            IkaTools.Intl.formatInteger(usePerDay || 
                usePerHour * IkaTools.Constants.Time.HOURS_PER_DAY),
            IkaTools.Intl.formatInteger(usePerWeek || 
                usePerHour * IkaTools.Constants.Time.HOURS_PER_WEEK));
      }
      
      function makeResourceUseTableRowRaw(displaySign, usePerHour, usePerDay, usePerWeek) {
        return '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>'.format(
            displaySign, usePerHour, usePerDay, usePerWeek);
      }
      
      function makeResourceUseToolTip(icon, rows, footerRows) {
        return ('<table class="resource_use_tool_tip">' + 
                  '<colgroup><col/><col/><col/><col/></colgroup>' +
                  '<thead>' + 
                    '<tr>' + 
                      '<th><img src="%s" height="12"/></th>' + 
                      '<th>%s</th>' + 
                      '<th>%s</th>' + 
                      '<th>%s</th>' + 
                    '</tr>' + 
                  '</thead>' + 
                  '<tbody>%s</tbody>' +
                  '<tfoot>%s</tfoot>' +
                '</table>').format(
                    icon,
                    IkaTools.Intl.localizer.localize('timeunits','long','hour'),
                    IkaTools.Intl.localizer.localize('timeunits','long','day'),
                    IkaTools.Intl.localizer.localize('timeunits','long','week'),
                    rows.join(''),
                    footerRows ? footerRows.join('') : '')
      }
      
      function makeTableContent() {
        var updateables = this.updateables;
        var civData = IkaTools.EmpireData.getCivilizationData();
        
        function getResourceData(resource) {
          var current = resource.getCurrent();
          var capacity = resource.getCapacity();

          var millisUntilFull = Math.ceil(resource.getTimeUntilFull());
          var millisUntilEmpty = Math.ceil(resource.getTimeUntilEmpty());

          var fullClass = '';
          if (millisUntilFull < 1 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            fullClass = 'expiration_now';
          } else if (millisUntilFull <= 6 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            fullClass = 'expiration_imminent';
          } else if (millisUntilFull <= 24 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            fullClass = 'expiration_soon';
          } else if (millisUntilFull <= 48 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            fullClass = 'expiration_forseeable';
          }

          var emptyClass = '';
          if (millisUntilEmpty < 1 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            emptyClass = 'expiration_now';
          } else if (millisUntilEmpty <= 6 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            emptyClass = 'expiration_imminent';
          } else if (millisUntilEmpty <= 24 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            emptyClass = 'expiration_soon';
          } else if (millisUntilEmpty <= 48 * IkaTools.Constants.Time.MILLIS_PER_HOUR) {
            emptyClass = 'expiration_forseeable';
          }
          
          return {
            current: current,
            max: capacity.maximum,
            percent: current / capacity.maximum * 100,
            safe: capacity.safe,
            fullClass: fullClass,
            emptyClass: emptyClass,
          };
        }
        
        function makeResourceCells(movements, city, resourceName) {
          var resource = city.getResource(resourceName);
          var cityId = city.getId();
          
          var currentUpdateable = updateables.create(
              IkaTools.Utils.nextId('resource_current_'),
              IkaTools.Utils.nextId('resource_current_percent_bar_'),
              IkaTools.Utils.nextId('resource_current_percent_bar_active_'));
              
          var resourceLink = new Link('Resource_%s_%s'.format(city.getId(), resourceName));
  
          if (resourceName == IkaTools.Constants.Resources.WOOD) {
            resourceLink.toCitysIslandView(
                city, IkaTools.Constants.View.RESOURCE, { type: 'resource' });
          } else if (resourceName == city.getTradeGoodType()) {
            resourceLink.toCitysIslandView(
                city, IkaTools.Constants.View.TRADE_GOOD, 
                { type: IkaTools.Constants.TradeGoodOrdinals[city.getTradeGoodType()] });
          }
          
          var data = getResourceData(resource);
          
          var inTransit = 0;
          
          function isCountableMovement(movement) {
            if (movement.getResource(resourceName) > 0) {
              if (movement.getMission() == IkaTools.Constants.Movements.Mission.PLUNDER) {
                return movement.getOriginCityId() == cityId;
              }
              if (movement.getStage() == IkaTools.Constants.Movements.Stage.LOADING ||
                  movement.getStage() == IkaTools.Constants.Movements.Stage.EN_ROUTE) {
                return movement.getTargetCityId() == cityId;
              }
              if (movement.getStage() == IkaTools.Constants.Movements.Stage.RETURNING) {
                return movement.getOriginCityId() == cityId;
              }
            }
            return false;
          } 
          
          $.each(movements, function totalMovements(index, movement) {
            var mission = movement.getMission();
            var stage = movement.getStage();
            if (isCountableMovement(movement)) {
              inTransit += movement.getResource(resourceName) || 0;
            }
          });
          
          var inTransitDivId = 'ResourcesInTransit_%s_%s'.format(city.getId(), resourceName);
          if (inTransit) {
            toolTips.registerRefreshable(inTransitDivId, function() {
              return ('<table class="resources_in_transit_tool_tip">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>' + 
                              '<img src="skin/resources/icon_%s.png" height="12"/>' + 
                            '</th>' + 
                            '<th>%s</th>' +
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>%s</tbody>' + 
                      '</table').format(
                  resourceName,
                  localizer.localize('misc','in_transit'),
                  $.map(movements, function makeResourcesInTransitRow(movement) {
                    var count = movement.getResource(resourceName);
                    if (isCountableMovement(movement)) {
                      return '<tr><td class="resource_count">%s</td><td>%s</td></tr>'.format(
                          IkaTools.Intl.formatInteger(count, true),
                          IkaTools.Intl.formatRemainingTime(
                              movement.getArrivalTime() - IkaTools.View.gameTimeNow()));
                    } else {
                      return '';
                    }
                  }).join(''));
            });
          } else {
            toolTips.deregister(inTransitDivId);
          }
          
          toolTips.registerRefreshable(currentUpdateable.getId(1), function() {
            var timeToFull = resource.getTimeUntilFull();
            var timeToEmpty = resource.getTimeUntilEmpty();
            
            var timeRow = '';
            if (isFinite(timeToFull)) {
              timeRow = '<tr><td>%s:</td><td>%s</td>'.format(
                  localizer.localize('misc','time_to_full'),
                  IkaTools.Intl.formatRemainingTime(timeToFull, 
                      localizer.localize('misc','full')));
            } else if (isFinite(timeToEmpty)) {
              timeRow = '<tr><td>%s:</td><td>%s</td>'.format(
                  localizer.localize('misc','time_to_empty'),
                  IkaTools.Intl.formatRemainingTime(timeToEmpty, 
                      localizer.localize('misc','empty')));
            }
            
            var capacity = city.getResourceCapacity();
            return ('<table>' + 
                      '<colgroup><col/><col/></colgroup>' + 
                      '<tbody>' + 
                        '<tr><td>%s:</td><td>%s</td></tr>' + 
                        '<tr><td>%s:</td><td>%s</td></tr>' + 
                        '%s' + 
                      '<tbody>' + 
                    '<table>').format(
                        localizer.localize('misc','maximum_capacity'),
                        IkaTools.Intl.formatInteger(data.max),
                        localizer.localize('misc','safe_capacity'),
                        IkaTools.Intl.formatInteger(data.safe),
                        timeRow);
          });

          var currentContent = '?';
          if (data.current) {
            currentContent = (
                '<div id="%s" class="resource_current %s %s">%s</div>' + 
                '<div id="%s" class="resources_transporting imperator_tool_tip">%s</div>' + 
                '<div id="%s" class="percent_bar imperator_tool_tip %s">' + 
                  '<div id="%s" class="percent_bar_active" style="width: %s%;" />' +
                '</div>').format(
                     currentUpdateable.getId(0),
                     data.emptyClass,
                     data.current <= data.safe ? 'is_under_safe_limit' : '',
                     IkaTools.Intl.formatInteger(data.current),
                     inTransitDivId,
                     inTransit ? IkaTools.Intl.formatInteger(inTransit, true)
                               : '-',
                     currentUpdateable.getId(1),
                     data.fullClass,
                     currentUpdateable.getId(2),
                     data.percent);

            currentUpdateable.registerTickerUpdate(function(amount, percentBar, activeBar) {
              var data = getResourceData(resource);
              if (data.current <= data.safe) {
                amount.addClass('is_under_safe_limit');
              } else {
                amount.removeClass('is_under_safe_limit');
              }
              amount.html(IkaTools.Intl.formatInteger(data.current));
              amount.removeClass(
                  'expiration_now expiration_imminent expiration_soon expiration_forseeable');
              amount.addClass(data.emptyClass);
              percentBar.removeClass(
                  'expiration_now expiration_imminent expiration_soon expiration_forseeable');
              percentBar.addClass(data.fullClass);
              activeBar.css('width', '%s%'.format(data.percent));
            });
          }
  
          var productionContent = '&nbsp;';
          var production = resource.getProduction();
          if (production !== undefined) {
            var productionPerHour = production * IkaTools.Constants.Time.SECONDS_PER_HOUR;
            productionContent = IkaTools.Intl.formatInteger(productionPerHour, true);
            toolTips.registerSimple(resourceLink.getId(), 
                makeResourceUseToolTip('skin/resources/icon_%s.png'.format(resourceName),
                    [makeResourceUseTableRow('+', productionPerHour)]));
          }

          
          var consumptionContent = '';
          var consumption = resource.getConsumption();
          var tavernLink = new Link('WineConsumptionTavern_%s'.format(city.getId()));
          var tavern = city.getBuildingByType(IkaTools.Constants.Buildings.TAVERN);
          if (tavern) {
            tavernLink.toCityView(city, IkaTools.Constants.Buildings.TAVERN,
                { position: tavern.getPosition(), cityId: city.getId() });
          }
          if (tavern && consumption !== undefined) {
            var consumptionPerHour = 
                Math.round(consumption * IkaTools.Constants.Time.SECONDS_PER_HOUR);
            toolTips.registerSimple(tavernLink.getId(), 
                makeResourceUseToolTip('skin/resources/icon_%s.png'.format(resourceName),
                    [makeResourceUseTableRow('-', consumptionPerHour)]));
            consumptionContent = 
                ('<a id="%s" class="imperator_link imperator_tool_tip" ' + 
                    'href="javascript:void(0);">%s</a>').format(
                     tavernLink.getId(),
                     IkaTools.Intl.formatInteger(-consumptionPerHour, true));
          }              
          
          return ('<td class="resource resource_%s">%s</td>' +
                  '<td class="resource resource_%s resource_change">' + 
                    '<div class="resource_production">' +
                      '<a id="%s" class="imperator_link imperator_tool_tip" ' + 
                         'href="javascript:void(0);">%s</a>' + 
                    '</div>' +  
                    '<div class="resource_consumption">%s</div>' +  
                  '</td>').format(
               resourceName,
               currentContent,
               resourceName,
               resourceLink.getId(),
               productionContent,
               consumptionContent);
        }
        
        function makeResearchCell(city) {
          var scientists = city.getScientists();
          var academy = city.getBuildingByType('academy');
          
          if (academy) {
            var research = city.getResearch();
            var link = new Link('ResearchTableAcademy_%s'.format(city.getId()))
                .toCityView(city, IkaTools.Constants.Buildings.ACADEMY,
                     { position: academy.getPosition(), cityId: city.getId() });
            var maxScientists = IkaTools.Constants.BuildingData[
                IkaTools.Constants.Buildings.ACADEMY].maxScientists[academy.getLevel()];
            var percent = scientists / maxScientists * 100;
            var percentBarId = IkaTools.Utils.nextId('research_percent_bar');
            
            toolTips.registerSimple(link.getId(),
                makeResourceUseToolTip('skin/layout/bulb-on.png',
                    [makeResourceUseTableRow('+', research)]));
            toolTips.registerSimple(percentBarId,
                ('<table><tbody>' +
                   '<tr><td>%s:</td><td>%s</td></tr>' + 
                   '<tr><td>%s:</td><td>%s</td></tr>' +
                 '</tbody></table>').format(
                     localizer.localize('misc','employed'),
                     scientists, 
                     localizer.localize('misc','maximum_capacity'),
                     maxScientists));
                
            return ('<td class="research">' + 
                      '<div>' +
                        '<a id="%s" href="javascript:void(0)" ' + 
                           'class="imperator_link imperator_tool_tip">%s</a>' + 
                      '</div>' + 
                      '<div id ="%s" class="percent_bar imperator_tool_tip percent_bar_desire_filled %s">' + 
                        '<div class="percent_bar_active" style="width: %s%;" />' +
                      '</div>' + 
                    '</td>').format(
                        link.getId(),
                        IkaTools.Intl.formatInteger(research, true),
                        percentBarId,
                        percent == 100 ? 'percent_bar_filled' : '',
                        percent);
          }
          
          return '<td class="research"></td>';
        }
        
        function getPopulationData(city) {
          var populationData = city.getPopulationData();
          var icon = 'neutral';
          if (populationData.happiness < -50) {
            icon = 'outraged';
          } else if (populationData.happiness < -.50) {
            icon = 'sad';
          } else if (populationData.happiness > 300) {
            icon = 'ecstatic';
          } else if (populationData.happiness > 50) {
            icon = 'happy';
          }
          var percent = populationData.population / populationData.max * 100;
          return $.extend({
            icon: "skin/smilies/%s_x25.png".format(icon),
            percent: percent,
            percentClass: percent == 100 ? 'percent_bar_filled' : '',
            happinessClass: percent == 100 && populationData.happiness >= 60 
                && city.getTavernWineLevel() > 0
                ? 'imperator_warning' : '',
          }, populationData);
        }
        
        function makePopulationCells(city) {
          var populationData = getPopulationData(city);
          if (!populationData.population) {
            return ('<td class="population">%s</td>' + 
                    '<td class="population_growth_icon"></td>' + 
                    '<td class="population_growth"/>').format(
                IkaTools.Intl.formatInteger(populationData.population));
          }
          
          var updateable = updateables.create(
              IkaTools.Utils.nextId('population_current_'),
              IkaTools.Utils.nextId('population_current_percent_bar_'),
              IkaTools.Utils.nextId('population_current_percent_bar_active_'),
              IkaTools.Utils.nextId('population_growth_icon_'),
              IkaTools.Utils.nextId('population_growth_'));
              
          updateable.registerTickerUpdate(
              function(population, percentBar, activeBar, icon, growth) {
                var populationData = getPopulationData(city);
                population.html(IkaTools.Intl.formatInteger(
                    Math.floor(populationData.population)));
                percentBar.removeClass('percent_bar_filled');
                percentBar.addClass(populationData.percentClass);
                activeBar.css('width', '%s%'.format(populationData.percent));
                icon.attr('src', populationData.icon);
                growth.removeClass('imperator_warning');
                growth.addClass(populationData.happinessClass);
                growth.html(
                    IkaTools.Intl.formatDecimal(populationData.growth, 2, true));
              });
              
          toolTips.registerRefreshable(updateable.getId(3), function() {
            var data = city.getPopulationData();
            var tavern = city.getBuildingByType(IkaTools.Constants.Buildings.TAVERN);
            var museum = city.getBuildingByType(IkaTools.Constants.Buildings.MUSEUM);
            
            var culturalGoods = city.getCulturalGoods();
            var tavernWineLevel = city.getTavernWineLevel();
            
            return ('<table>' + 
                      '<tbody>' + 
                        '<tr><td>%s:</td><td>%s</td></tr>' +
                        '<tr><td>%s:</td><td>%s/%s</td></tr>' +
                        '<tr><td>%s:</td><td>%s/%s</td></tr>' +
                      '<tbody>' + 
                    '</table>').format(
                        localizer.localize('misc','satisfaction'),
                        IkaTools.Intl.formatInteger(data.happiness, true),
                        localizer.localize('misc','cultural_goods'),
                        IkaTools.Intl.formatInteger(culturalGoods),
                        IkaTools.Intl.formatInteger(museum ? museum.getLevel() : 0),
                        localizer.localize('misc','tavern_wine_serving_level'),
                        IkaTools.Intl.formatInteger(tavernWineLevel),
                        IkaTools.Intl.formatInteger(tavern ? tavern.getLevel() : 0));                        
          });
              
          toolTips.registerRefreshable(updateable.getId(4), function() {
            var data = city.getPopulationData();
            function growthIn(hours) {
              var growth = data.happiness * ( 1 - Math.pow(Math.E, -hours / 50));
              if (growth + data.population > data.max) {
                growth = data.max - data.population;
              }
              return growth;
            }

            return makeResourceUseToolTip(
                data.happiness >= 0 ? 'skin/icons/growth_positive.png'
                                    : 'skin/icons/growth_negative.png',
                [makeResourceUseTableRowRaw(data.happiness >= 0 ? '+' : '-', 
                    IkaTools.Intl.formatDecimal(growthIn(1), 2), 
                    IkaTools.Intl.formatDecimal(growthIn(24), 2), 
                    IkaTools.Intl.formatDecimal(growthIn(168), 2))]);
          });
              
          toolTips.registerRefreshable(updateable.getId(1), function() {          
            var data = city.getPopulationData();
            var timeToFull = Number.POSITIVE_INFINITY;
            
            if (data.population == data.max) {
              timeToFull = 0;
            } else if (data.population + data.happiness > data.max) {
              var finalHappiness = data.population + data.happiness - data.max;
              timeToFull = (Math.log(data.happiness) - Math.log(finalHappiness)) *
                  50 * IkaTools.Constants.Time.MILLIS_PER_HOUR;
            }
            
            return ('<table>' + 
                      '<tbody>' + 
                        '<tr><td>%s:</td><td>%s</td></tr>' + 
                        '<tr><td>%s:</td><td>%s</td></tr>' + 
                      '<tbody>' + 
                    '<table>').format(
                        localizer.localize('misc','maximum_capacity'),
                        IkaTools.Intl.formatInteger(data.max),
                        localizer.localize('misc','time_to_full'),
                        IkaTools.Intl.formatRemainingTime(timeToFull, 
                            localizer.localize('misc','full')));
          });
          
          return ('<td class="population">' + 
                    '<div id="%s">%s</div>' + 
                    '<div id="%s" ' +
                         'class="percent_bar percent_bar_desire_filled imperator_tool_tip %s">' + 
                      '<div id="%s"class="percent_bar_active" style="width: %s%;" />' +
                    '</div>' + 
                  '</td>' + 
                  '<td class="population_growth_icon nowrap">' +
                    '<img id="%s" class="imperator_tool_tip" src="%s" />' +
                  '</td>'+
                  '<td class="population_growth %s">' +
                    '<span id="%s" class="imperator_tool_tip">%s</span>' +
                  '</td>'
                  ).format(
                      updateable.getId(0),
                      IkaTools.Intl.formatInteger(Math.floor(populationData.population)),
                      updateable.getId(1),
                      populationData.percentClass,
                      updateable.getId(2),
                      populationData.percent,
                      updateable.getId(3),
                      populationData.icon,
                      populationData.happinessClass,
                      updateable.getId(4),
                      IkaTools.Intl.formatDecimal(populationData.growth, 2, true));
        }
        
        function makeRow(movements, city) {
          var transportLink = new Link('TransportGoods_%s'.format(city.getId())).toLocalView(
              IkaTools.Constants.View.TRANSPORT, 
              { 
                templateView: IkaTools.Constants.View.CITY_DETAIL, 
                destinationCityId: city.getId(),
              },
              function() {
                var go = !IkaTools.View.isActiveCity(city) && 
                    IkaTools.View.getCurrentCity().isOwn();
                if (go) {
                  openResourcesTabOnTransportClose = true;
                }
                return go;
              });
          var cityLink = new Link('ResourceTabToTownHall_%s'.format(city.getId()))
              .toCityView(city, IkaTools.Constants.View.TOWN_HALL,
                  { position: 0, cityId: city.getId() });
              
  
          var rowUpdateable = updateables.create('ResourceTableRow_%s'.format(city.getId()))
              .registerUpdate('cityChanged', 
                  function(element) {
                    if (IkaTools.View.isActiveCity(city)) {
                      element.addClass('current');
                    } else {
                      element.removeClass('current');
                    }
                  });
              
          return ('<tr id="%s" class="%s">' + 
                  '%s' + 
                  '<td class="action_points">%s</td>' + 
                  '<td class="actions">' +
                    '<a id="%s" class="imperator_link to_town_hall" ' +
                       'title="%s" href="javascript:void(0);"/>' +
                    '<a id="%s" class="imperator_link transport_goods" ' + 
                       'title="%s" href="javascript:void(0);"/>' +
                  '</td>' + 
                  '%s' + 
                  '%s' + 
                  '%s%s%s%s%s' + 
                  '</tr>'
              ).format(
                  rowUpdateable.getId(0),
                  IkaTools.View.isActiveCity(city) ? 'current' : '',
                  makeCityNameCells('resources', city),
                  IkaTools.Intl.formatInteger(city.getActionPoints()),
                  cityLink.getId(),
                  localizer.localize('actions','to_town_hall'),
                  transportLink.getId(),
                  localizer.localize('actions','transport_goods'),
                  makePopulationCells(city),
                  makeResearchCell(city),
                  makeResourceCells(movements, city, IkaTools.Constants.Resources.WOOD),
                  makeResourceCells(movements, city, IkaTools.Constants.Resources.WINE),
                  makeResourceCells(movements, city, IkaTools.Constants.Resources.MARBLE),
                  makeResourceCells(movements, city, IkaTools.Constants.Resources.GLASS),
                  makeResourceCells(movements, city, IkaTools.Constants.Resources.SULFUR));
        }
  
        function makeTotalsRow(cities) {
          function makeResourceCells(cities, resourceName) {
            var currentUpdateable =
                updateables.create(IkaTools.Utils.nextId('resource_current_total'));
  
            function makeCurrentContent() {
              var total = 0;
  
              $.each(cities, function(index, city) {
                var resource = city.getResource(resourceName);
                total += resource.getCurrent() || 0;
              });
              return IkaTools.Intl.formatInteger(total);
            }
            
            currentUpdateable.registerTickerUpdate(function(element) {
              element.html(makeCurrentContent());
            });
            
            var production = 0;
            var consumption = 0;

            $.each(cities, function(index, city) {
              var resource = city.getResource(resourceName);
              production += resource.getProduction() || 0;
              consumption += resource.getConsumption() || 0;
            });
            
            var rows = [makeResourceUseTableRow('+', 
                production * IkaTools.Constants.Time.SECONDS_PER_HOUR)];
            var footer = null;
            if (consumption) {
              rows.push(makeResourceUseTableRow('-',
                  consumption * IkaTools.Constants.Time.SECONDS_PER_HOUR));
              footer = [makeResourceUseTableRow('&sum;',
                  (production - consumption) * IkaTools.Constants.Time.SECONDS_PER_HOUR)];
            }
            
            toolTips.registerSimple('ResourceProductionTotal_' + resourceName, 
                makeResourceUseToolTip(
                    'skin/resources/icon_%s.png'.format(resourceName), rows, footer));
  
            return ('<td><span id="%s">%s</span></td>' + 
                    '<td id="ResourceProductionTotal_%s" class="imperator_tool_tip">' +
                      '<div class="resource_production">%s</div>' + 
                      '<div class="resource_consumption">%s</div>' +
                    '</td>').format(
                       currentUpdateable.getId(0), 
                       makeCurrentContent(),
                       resourceName,
                       IkaTools.Intl.formatInteger(
                           production * IkaTools.Constants.Time.SECONDS_PER_HOUR, true),
                       consumption ? IkaTools.Intl.formatInteger(
                           -consumption * IkaTools.Constants.Time.SECONDS_PER_HOUR) : '');
          }
          
          function makeResearchCell(cities) {
            var total = 0;
            var culturalGoods = 0;
            var isDemocracy = IkaTools.Constants.Government.DEMOCRACY ==
                IkaTools.EmpireData.getCivilizationData().getGovernment();

            $.each(cities, function(index, city) {
              total += city.getResearch() || 0;
              if (isDemocracy) {
                culturalGoods += city.getCulturalGoods();
              }
            });
            
            var rows = [makeResourceUseTableRow('+', total)];
            var footer = undefined;
            if (isDemocracy) {
              rows.push(makeResourceUseTableRow(
                  '<img src="skin/museum/icon32_culturalgood.png" height="10"/>', culturalGoods));
              footer = [makeResourceUseTableRow('&sum;', total + culturalGoods)];
            }
            
            toolTips.registerSimple('ResearchTotal',
                makeResourceUseToolTip(
                    'skin/layout/bulb-on.png', rows, footer));
            
            return ('<td id="ResearchTotal" class="research imperator_tool_tip">%s</td>')
                .format(IkaTools.Intl.formatInteger(total + culturalGoods, true));
          }
          
          function makePopulationCells(cities) {
            function getData() {
              var population = 0;
              var growth = 0;
              
              $.each(cities, function(index, city) {
                var populationData = city.getPopulationData();
                population += populationData.population || 0;
                growth += populationData.growth;
              });
              return {
                population: population,
                growth: growth,
              }
            }
            
            var updateable = updateables.create('population_total', 'population_growth_total');
                
            updateable.registerTickerUpdate(function(populationCell, growthCell) {
              var data = getData();
              populationCell.html(IkaTools.Intl.formatInteger(data.population));
              growthCell.html(IkaTools.Intl.formatDecimal(data.growth, 2, true));
            });
            
            var data = getData();
            return ('<td id="%s" class="population">%s</td>' + 
                    '<td/>' +
                    '<td id="%s" class="population_growth">%s</td>').format(
                        updateable.getId(0),
                        IkaTools.Intl.formatInteger(data.population),
                        updateable.getId(1),
                        IkaTools.Intl.formatDecimal(data.growth, 2, true));
          }
          
          return ('<tr><td colspan="4" class="totals_sigma_cell"/>' + 
                  '%s%s%s%s%s%s%s</tr>').format(
                     makePopulationCells(cities),
                     makeResearchCell(cities),
                     makeResourceCells(cities, IkaTools.Constants.Resources.WOOD),
                     makeResourceCells(cities, IkaTools.Constants.Resources.WINE),
                     makeResourceCells(cities, IkaTools.Constants.Resources.MARBLE),
                     makeResourceCells(cities, IkaTools.Constants.Resources.GLASS),
                     makeResourceCells(cities, IkaTools.Constants.Resources.SULFUR));
        }
        
        function makeResourceColGroup(resource) {
          return ('<colgroup class="resource resource_%s">' +
                    '<col class="resource_on_hand resource_%s"/>' + 
                    '<col class="resource_use resource_%s"/>' + 
                  '</colgroup>').format(
                      resource, resource, resource);
        }
        
        function makeCols() {
          return ('%s' +
                  '<colgroup class="actions">' + 
                    '<col class="actions"/>' + 
                  '</colgroup>' +
                  '<colgroup class="population">' + 
                    '<col class="population"/>' + 
                    '<col class="population_growth_icon"/>' + 
                    '<col class="population_growth"/>' + 
                  '</colgroup>' +
                  '<colgroup class="research">' + 
                    '<col class="research"/>' + 
                  '</colgroup>' +
                  //'<colgroup class="financial">' + 
                  //  '<col class="financial"/>' + 
                  //'</colgroup>' +
                  '%s%s%s%s%s')
                  .format(makeCityNameColGroup('<col class="action_points">'),
                          makeResourceColGroup('wood'),
                          makeResourceColGroup('wine'),
                          makeResourceColGroup('marble'),
                          makeResourceColGroup('crystal'),
                          makeResourceColGroup('sulfur'));
        }
        
        function makeTableHead() {
          toolTips.registerSimple('ResourcePopulationHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('misc','population')));
          toolTips.registerSimple('ResourcePopulationGrowthHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('misc','population_growth')));
          toolTips.registerSimple('ResourceResearchHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('misc','research')));
          toolTips.registerSimple('ResourceTableActionPoints',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('misc','action_points')));
          toolTips.registerSimple('ResourceWoodHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('resources','wood')));
          toolTips.registerSimple('ResourceWineHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('resources','wine')));
          toolTips.registerSimple('ResourceMarbleHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('resources','marble')));
          toolTips.registerSimple('ResourceCrystalHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('resources','glass')));
          toolTips.registerSimple('ResourceSulfurHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('resources','sulfur')));
          return ('<thead>' +
                  '<tr>%s' +
                    '<th id="ResourceTableActionPoints" ' + 
                        'class="action_points imperator_tool_tip">%s</th>' +
                    '<th class="actions">%s</th>' +
                    '<th colspan="1" id="ResourcePopulationHeader" ' +
                        'class="population imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourcePopulationGrowthHeader" ' +
                        'class="population_growth imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="ResourceResearchHeader" ' + 
                        'class="research imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourceWoodHeader" ' + 
                        'class="resource resource_wood imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourceWineHeader" ' + 
                        'class="resource resource_wine imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourceMarbleHeader" ' + 
                        'class="resource resource_marble imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourceCrystalHeader" ' + 
                        'class="resource resource_crystal imperator_tool_tip">%s</th>' +
                    '<th colspan="2" id="ResourceSulfurHeader" ' + 
                        'class="resource resource_sulfur imperator_tool_tip">%s</th>' +
                  '</tr>' + 
                 '</thead>').format(
                     makeCityNameHeaderCells(),
                     localizer.localize('misc','action_points'),
                     localizer.localize('misc','actions'),
                     localizer.localize('misc','population'),
                     localizer.localize('misc','population_growth'),
                     localizer.localize('misc','research'),
                     localizer.localize('resources','wood'),
                     localizer.localize('resources','wine'),
                     localizer.localize('resources','marble'),
                     localizer.localize('resources','glass'),
                     localizer.localize('resources','sulfur'));
                     
        }
        
        var cities = IkaTools.EmpireData.getOwnCities();
        var movements = IkaTools.EmpireData.getCivilizationData().getMovements();
        return '%s%s<tbody>%s</tbody><tfoot>%s</tfoot>'.format(
            makeCols(),
            makeTableHead(),
            $.map(cities, makeRow.bind(null, movements)).join(''),
            makeTotalsRow(cities));
      }
      
      var tab = new Tab('resources', localizer.localize('misc','resources'), $(
          '<div class="imperator_overview">' +
            '<table class="overview" id="ImperatorOverviewResourceTable"/>' +
          '</div>'),
          'ImperatorOverviewResourceTable',
          function() {
            IkaTools.EmpireData.registerResourcesChangedHandler(function(changes) {
              tab.maybeRedraw(true);
            });
            IkaTools.EmpireData.registerBuildingsChangedHandler(function(changes) {
              var redraw = false;
              $.each(changes, function(index, change) {
                var type = change.building.getType();
                if (type == IkaTools.Constants.Buildings.TAVERN ||
                    type == IkaTools.Constants.Buildings.MUSEUM ||
                    type == IkaTools.Constants.Buildings.ACADEMY ||
                    type == IkaTools.Constants.Buildings.TOWN_HALL) {
                  redraw = true;
                }
              });
              tab.maybeRedraw(redraw);
            });
            IkaTools.EmpireData.registerCivilizationDataChangedHandler(function(changes) {
              tab.maybeRedraw(true);
            });
            IkaTools.EmpireData.registerMovementsChangedHandler(function(changes) {
              var redraw = false;
              $.each(changes, function(index, change) {
                var mission = change.movement.mission;
                if (mission == IkaTools.Constants.Movements.Mission.TRANSPORT || 
                    mission == IkaTools.Constants.Movements.Mission.PLUNDER) {
                  redraw = true;
                }
              });
              tab.maybeRedraw(redraw);
            });
          },
          makeTableContent);
  
      return tab.getTab();
    }
    
    function makeBuildingsTab() {    
      var BUILDING_ORDER = [
        { name: 'growth', 
          buildings: [IkaTools.Constants.Buildings.TOWN_HALL,
                      IkaTools.Constants.Buildings.PALACE,
                      IkaTools.Constants.Buildings.GOVERNORS_RESIDENCE,
                      IkaTools.Constants.Buildings.TAVERN,
                      IkaTools.Constants.Buildings.MUSEUM] },
        { name: 'research', 
          buildings: [IkaTools.Constants.Buildings.ACADEMY,
                      IkaTools.Constants.Buildings.WORKSHOP,
                      IkaTools.Constants.Buildings.TEMPLE] },
        { name: 'diplomacy', 
          buildings: [IkaTools.Constants.Buildings.EMBASSY] },
        { name: 'trading', 
          buildings: [IkaTools.Constants.Buildings.WAREHOUSE,
                      IkaTools.Constants.Buildings.DUMP,
                      IkaTools.Constants.Buildings.TRADING_PORT,
                      IkaTools.Constants.Buildings.TRADING_POST] },
        { name: 'military',
          buildings: [IkaTools.Constants.Buildings.WALL,
                      IkaTools.Constants.Buildings.HIDEOUT,
                      IkaTools.Constants.Buildings.BARRACKS,
                      IkaTools.Constants.Buildings.SHIPYARD,
                      IkaTools.Constants.Buildings.PIRATE_FORTRESS] },
        { name: 'wood', 
          buildings: [IkaTools.Constants.Buildings.FORESTER,
                      IkaTools.Constants.Buildings.CARPENTER] },
        { name: 'wine', 
          buildings: [IkaTools.Constants.Buildings.WINERY,
                      IkaTools.Constants.Buildings.WINE_PRESS] },
        { name: 'marble', 
          buildings: [IkaTools.Constants.Buildings.STONEMASON,
                      IkaTools.Constants.Buildings.ARCHITECT] },
        { name: 'crystal', 
          buildings: [IkaTools.Constants.Buildings.GLASSBLOWER,
                      IkaTools.Constants.Buildings.OPTICIAN] },
        { name: 'sulfur', 
          buildings: [IkaTools.Constants.Buildings.ALCHEMISTS_TOWER,
                      IkaTools.Constants.Buildings.FIREWORK_TEST_AREA] },
      ];
  
      function makeTableContent() {
        var updateables = this.updateables;
        
        var empireBuildingCounts = {};
  
        $.each(IkaTools.EmpireData.getOwnCities(), function(index, city) {
          var cityBuildingCounts = {};
          $.each(city.getBuildings(), function(index, building) {
            if (!building.isEmpty()) {
              cityBuildingCounts[building.getType()] =
                  (cityBuildingCounts[building.getType()] || 0) + 1;
            }
          });
          $.each(cityBuildingCounts, function(key, value) {
            empireBuildingCounts[key] = Math.max(
                empireBuildingCounts[key] || 0, cityBuildingCounts[key]);
          });
        });
  
        function makeCols(type) {
          var count = empireBuildingCounts[type];
          if (count) {
            var html = '<col class="building building_%s"/>'.format(type);
            for (var i = 1; i < count; i++) {
              html += '<col class="building building_additional building_%s"/>'.format(type);
            }
            return html;
          } else {
            return '';
          }
        }
  
        function makeColGroup(info) {
          var group = $.map(info.buildings, makeCols).join('');
          return !group ? '' :
              '<colgroup class="buildings buildings_%s">%s</colgroup>'.format(
                  info.name, group);
        }
  
        function makeTableHeaderCells(type) {
          var count = empireBuildingCounts[type];
          var displayName = localizer.localize('buildings', type);
          var toolTip = toolTips.registerSimple('ImperatorBuildingHeader_' + type, 
              $('<div class="nowrap">%s</div>'.format(displayName)));
          return !count ? '' :
              ('<th class="building building_%s imperator_tool_tip" ' +
                  'id="ImperatorBuildingHeader_%s" colspan="%s">%s</td>').format(
                   type, 
                   type,
                   count, 
                   displayName);
        }
  
        function makeTableHeadContent() {
          var displayName = localizer.localize('misc','building_spots');
          toolTips.registerSimple('ImperatorBuildingHeaderBuildingSpots',
              '<div class="nowrap">%s</div>'.format(displayName));
          return ('%s' + 
                  '<th class="actions">%s</th>' +
                  '<th class="building building_spots imperator_tool_tip" ' +
                         'id="ImperatorBuildingHeaderBuildingSpots">%s</th>' + 
                  '%s').format(
              makeCityNameHeaderCells(),
              localizer.localize('misc','actions'),
              displayName,
              $.map(BUILDING_ORDER, function(info) {
                return $.map(info.buildings, makeTableHeaderCells);
              }).join(''));
        }
  
        function makeTableCell(city, building) {
          var link = new Link('Building_%s_%s'.format(city.getId(), building.getPosition()))
              .toCityView(city, building.getType(),
                  { position: building.getPosition(), cityId: city.getId() });
          var isUpgrading = building.isUpgrading();
          var toolTip = '';
          if (!isUpgrading && building.isMaxLevel()) {
            toolTips.deregister(link.getId());
          } else if (!building.isMaxLevel()) {
            toolTips.registerRefreshable(link.getId(), function() {
              function makeCostRow(resource) {
                var required = costs[resource];
                if (!required) {
                  return '';
                }

                var onHand = city.getResource(resource).getCurrent();

                return ('<tr>' + 
                          '<td class="resource_icon">' + 
                            '<img src="skin/resources/icon_%s.png">' + 
                          '</td>' +
                          '<td class="resource_cost">%s</td>' + 
                          '<td class="resource_missing">%s</td>' + 
                        '</tr>').format(
                            resource,
                            IkaTools.Intl.formatInteger(required),
                            onHand >= required 
                                ? '<img src="skin/interface/check_mark_17px.png"/>' 
                                : IkaTools.Intl.formatInteger(onHand - required, true));
              }
              
              var upgradingHtml = '';
              if (isUpgrading) {
                upgradingHtml = ('<div class="imperator_tool_tip_title">%s</div>' +
                                 '<div class="nowrap">%s (%s)</div>').format(
                                     localizer.localize('misc','constructing'),
                                     IkaTools.Intl.formatRemainingTime(
                                         building.getRemainingUpgradeTime()),
                                     IkaTools.Intl.formatAbsoluteTime(
                                         building.getCompletionTime()));
              }
                
              var costs = building.getUpgradeCosts();
                
              return ('%s<table class="building_upgrade_costs">' +
                        '<thead class="imperator_tool_tip_title">' + 
                          '<tr><th colspan="3">%s</th></tr>' +
                        '</thead>' +
                        '<tbody>' + 
                          '%s%s%s%s%s' + 
                        '</tbody>' +
                        '<tfoot>' +
                          '<tr>' +
                            '<td class="resource_icon">' + 
                              '<img src="skin/resources/icon_time.png"/>' + 
                            '</td>' + 
                            '<td class="nowrap" colspan="2">%s</td>' + 
                          '</tr>' + 
                        '</tfoot>' + 
                      '<table>')
                  .format(
                      upgradingHtml,
                      isUpgrading ? 
                          localizer.localize('misc','next_level_cost') :
                          localizer.localize('misc','resource_cost'),
                      makeCostRow(IkaTools.Constants.Resources.WOOD),
                      makeCostRow(IkaTools.Constants.Resources.WINE),
                      makeCostRow(IkaTools.Constants.Resources.MARBLE),
                      makeCostRow(IkaTools.Constants.Resources.GLASS),
                      makeCostRow(IkaTools.Constants.Resources.SULFUR),
                      IkaTools.Intl.formatRemainingTime(costs.time));
            });
          }
          return ('<td class="%s">%s' + 
                   '<a id="%s" class="imperator_link imperator_tool_tip" ' + 
                       'href="javascript:void(0);">' + 
                     '%s%s' + 
                   '</a>' +
                 '</td>').format(
              isUpgrading ? 'building_upgrading' : '',
              toolTip,
              link.getId(), 
              building.getLevel(), 
              isUpgrading ? ('&raquo;' + (building.getLevel() + 1)) : '');
        }
  
        function makeTableCells(city, type) {
          var count = empireBuildingCounts[type];
          var html = '';
          if (count) {
            var buildings = city.getBuildingsByType(type);
            for (var i = 0; i < count; i++) {
              if (i < buildings.length) {
                html += makeTableCell(city, buildings[i]);
              } else {
                html += '<td/>';
              }
            }
          }
          return html;
        }
  
        function makeRow(city) {
          var buildingSpots = city.getBuildingsByType('').length;
          var rowUpdateable = updateables.create('BuildingsTableRow_%s'.format(city.getId()))
              .registerUpdate('cityChanged',
                  function(element) {
                    if (IkaTools.View.isActiveCity(city)) {
                      element.addClass('current');
                    } else {
                      element.removeClass('current');
                    }
                  });
          var cityLink = new Link('BuildingTabToCity_%s'.format(city.getId()))
              .toCityView(city, undefined, { },
                  function() {
                    makePopup().close();
                    return true;
                  });
          var transportLink = new Link('BuildingTabTransportGoods_%s'.format(city.getId()))
              .toLocalView(
                    IkaTools.Constants.View.TRANSPORT, 
                    { 
                      templateView: IkaTools.Constants.View.CITY_DETAIL, 
                      destinationCityId: city.getId(),
                    },
                    function() {
                      var go = !IkaTools.View.isActiveCity(city) && 
                          IkaTools.View.getCurrentCity().isOwn();
                      if (go) {
                        openBuildingsTabOnTransportClose = true;
                      }
                      return go;
                    });
              
          return ('<tr id="%s" class="%s">%s' + 
                    '<td class="actions">' + 
                      '<a id="%s" class="imperator_link to_city_view" ' +
                          'title="%s" href="javascript:void(0);"/>' +
                      '<a id="%s" class="imperator_link transport_goods" ' + 
                          'title="%s" href="javascript:void(0);"/>' +
                    '</td>' +
                    '<td class="building building_spots">%s</td>' + 
                    '%s' +
                  '</tr>').format(
                      rowUpdateable.getId(0),
                      (IkaTools.View.isActiveCity(city) ? 'current' : ''),
                      makeCityNameCells('buildings', city), 
                      cityLink.getId(),
                      localizer.localize('actions','to_city_view'),
                      transportLink.getId(),
                      localizer.localize('actions','transport_goods'),
                      buildingSpots > 0 ? buildingSpots : '',
                      $.map(BUILDING_ORDER, function(info) {
                        return $.map(info.buildings, makeTableCells.bind(null, city));
                      }).join(''));
        }
  
        return ('%s<colgroup class="actions"><col class="actions"/></colgroup>' +
                '%s<thead>%s</thead><tbody>%s</tbody>').format(
                   makeCityNameColGroup('<col class="building building_spots">'),
                   $.map(BUILDING_ORDER, makeColGroup).join(''),
                   makeTableHeadContent(),
                   $.map(IkaTools.EmpireData.getOwnCities(), makeRow).join(''));
      }
      
      var tab = new Tab('buildings', localizer.localize('misc','buildings'), $(
          '<div class="imperator_overview">' +
            '<table class="overview" id="ImperatorOverviewBuildingsTable"/>' +
          '</div>'),
          'ImperatorOverviewBuildingsTable',
          function() {
            IkaTools.EmpireData.registerBuildingsChangedHandler(function(changes) {
              tab.maybeRedraw(true);
            });
          },
          makeTableContent);
  
      return tab.getTab();
    }

    var UNIT_ORDER = [
      { name: 'army_front_line', 
        units: [IkaTools.Constants.Military.HOPLITE, 
                IkaTools.Constants.Military.STEAM_GIANT]},
      { name: 'army_flank', 
        units: [IkaTools.Constants.Military.SPEARMAN,
                IkaTools.Constants.Military.SWORDSMAN]},
      { name: 'army_ranged', 
        units: [IkaTools.Constants.Military.SLINGER,
                IkaTools.Constants.Military.ARCHER,
                IkaTools.Constants.Military.GUNNER]},
      { name: 'army_seige', 
        units: [IkaTools.Constants.Military.BATTERING_RAM,
                IkaTools.Constants.Military.CATAPULT,
                IkaTools.Constants.Military.MORTAR]},
      { name: 'army_flying',
        units: [IkaTools.Constants.Military.GYROCOPTER,
                IkaTools.Constants.Military.BALLOON_BOMBADIER]},
      { name: 'army_support', 
        units: [IkaTools.Constants.Military.COOK,
                IkaTools.Constants.Military.DOCTOR]},
      { name: 'navy_front_line', 
        units: [IkaTools.Constants.Military.FLAME_THROWER,
                IkaTools.Constants.Military.STEAM_RAM]},
      { name: 'navy_flank', 
        units: [IkaTools.Constants.Military.RAM_SHIP]},
      { name: 'navy_ranged',
        units: [IkaTools.Constants.Military.BALLISTA_SHIP,
                IkaTools.Constants.Military.CATAPULT_SHIP,
                IkaTools.Constants.Military.MORTAR_SHIP]},
      { name: 'navy_seige', 
        units: [IkaTools.Constants.Military.SUBMARINE,
                IkaTools.Constants.Military.ROCKET_SHIP]},
      { name: 'navy_flying', 
        units: [IkaTools.Constants.Military.PADDLE_SPEED_SHIP,
                IkaTools.Constants.Military.BALLOON_CARRIER]},
      { name: 'navy_support', 
        units: [IkaTools.Constants.Military.TENDER]}
    ];
      
    function makeMilitaryTab() {
      function makeTableContent() {
        var cities = IkaTools.EmpireData.getCities();
        
        var updateables = this.updateables;
        var empireHasTroopType = {};
  
        $.each(cities, function(index, city) {
          $.each(city.getMilitary().getPresent().getCounts(), function(unit, count) {
            if (count) {
              empireHasTroopType[unit] = true;
            }
          });
          $.each(city.getMilitary().getTrainingBatches(), function(index, batch) {
            $.each(batch.getUnits().getCounts(), function(unit, count) {
              if (count) {
                empireHasTroopType[unit] = true;
              }
            });
          });
        });
        $.each(IkaTools.EmpireData.getCivilizationData().getMovements(), 
            function(index, movement) {
              $.each(movement.getUnits().getCounts(), function(unit, count) {
                if (count) {
                  empireHasTroopType[unit] = true;
                }
              });
            });
  
        function makeCol(type) {
          return !empireHasTroopType[type] ? '' :
             '<col class="military military_%s"/>'.format(type);
        }
  
        function makeColGroup(info) {
          var group = $.map(info.units, makeCol).join('');
          return !group ? '' :
              '<colgroup class="military military_%s">%s</colgroup>'.format(
                  info.name, group);
        }
  
        function makeTableHeaderCell(type) {
          var displayName = localizer.localize('units', type);
          var toolTip = toolTips.registerSimple('ImperatorMilitaryHeader_' + type,
              '<div class="nowrap">%s</div>'.format(displayName));
          return !empireHasTroopType[type] ? '' :
              ('<th class="military military_%s imperator_tool_tip" ' +
                  'id="ImperatorMilitaryHeader_%s">%s</td>').format(
                   type, 
                   type, 
                   displayName);
        }
  
        function makeTableHeadContent() {
          toolTips.registerSimple('MilitaryTableActionPoints',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('misc','action_points')));
          return ('%s<th id="MilitaryTableActionPoints" ' + 
                         'class="action_points imperator_tool_tip">%s</th>' + 
                  '<th class="actions">%s</th>%s').format(
              makeCityNameHeaderCells(true),
              localizer.localize('misc','action_points'),
              localizer.localize('misc','actions'),
              $.map(UNIT_ORDER, function(info) {
                return $.map(info.units, makeTableHeaderCell);
              }).join(''));
        }
  
        function makeTableCell(city, military, movements, type) {
          var cityId = city.getId();
          var count = military.getPresent().getCount(type);

          function isDeploymentCountableMovement(movement) {
            if (movement.getUnits().getCount(type) > 0) {
              var mission = movement.getMission();
              var stage = movement.getStage();
              if (mission == IkaTools.Constants.Movements.Mission.DEPLOY_ARMY ||
                  mission == IkaTools.Constants.Movements.Mission.DEPLOY_NAVY) {
                if (stage == IkaTools.Constants.Movements.Stage.LOADING ||
                    stage == IkaTools.Constants.Movements.Stage.EN_ROUTE) {
                  return movement.getTargetCityId() == cityId;
                }
                if (stage == IkaTools.Constants.Movements.Stage.RETURNING) {
                  return movement.getOriginCityId() == cityId;
                }
              }
            }
            return false;
          }
          
          function isPlunderCountableMovement(movement) {
            if (movement.getUnits().getCount(type) > 0) {
              var mission = movement.getMission();
              if (mission == IkaTools.Constants.Movements.Mission.PLUNDER) {
                return movement.getOriginCityId() == cityId;
              }
            }
            return false;
          }
          
          var trainingBatches = military.getTrainingBatches();
          var trainingCount = 0;
          $.each(trainingBatches, function countTraining(index, batch) {
            trainingCount += batch.getUnits().getCount(type) || 0;
          });

          var hasIncomingDeployments = false;
          $.each(movements, function isIncomingDeployment(index, movement) {
            var mission = movement.getMission();
            var stage = movement.getStage();
            if (mission == IkaTools.Constants.Movements.Mission.DEPLOY_ARMY ||
                mission == IkaTools.Constants.Movements.Mission.DEPLOY_NAVY) {
              if (stage == IkaTools.Constants.Movements.Stage.LOADING ||
                  stage == IkaTools.Constants.Movements.Stage.EN_ROUTE) {
                hasIncomingDeployments = true;
              }
              if (stage == IkaTools.Constants.Movements.Stage.RETURNING) {
                hasIncomingDeployments = true;
              }
            }
          });          
          var deployingCount = 0;
          $.each(movements, function countDeploying(index, movement) {
            if (isDeploymentCountableMovement(movement)) {
              deployingCount += movement.getUnits().getCount(type) || 0;
            }
          });
          
          var plunderingCount = 0;
          $.each(movements, function countPlundering(index, movement) {
            if (isPlunderCountableMovement(movement)) {
              plunderingCount += movement.getUnits().getCount(type) || 0;
            }
          });
          
          var trainingDivId = 'MilitaryTraining_%s_%s'.format(city.getId(), type);
          if (trainingCount) {
            var isArmy = IkaTools.Constants.UnitData[type].isArmy;
            toolTips.registerRefreshable(trainingDivId, function() {
              return ('<table class="training_units_tool_tip">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>' + 
                              '<img src="skin/characters/%s%s_faceright.png" ' +
                                   '%s="15" />' + 
                            '</th>' + 
                            '<th>%s</th>' +
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>%s</tbody>' + 
                      '</table').format(
                  isArmy ? 'military/x60_y60/y60_' : 'fleet/60x60/',
                  type,
                  isArmy ? 'height' : 'width',
                  localizer.localize('misc','training'),
                  $.map(trainingBatches, function makeTrainingToolTipRow(batch) {
                    var count = batch.getUnits().getCount(type);
                    if (count) {
                      return '<tr><td class="training_count">%s</td><td>%s</td></tr>'.format(
                          IkaTools.Intl.formatInteger(count, true),
                          IkaTools.Intl.formatRemainingTime(
                              batch.getCompletionTime() - IkaTools.View.gameTimeNow()));
                    } else {
                      return '';
                    }
                  }).join(''));
            });
          } else {
            toolTips.deregister(trainingDivId);
          }
          
          var deployingDivId = 'MilitaryDeployment_%s_%s'.format(city.getId(), type);
          if (deployingCount) {
            var isArmy = IkaTools.Constants.UnitData[type].isArmy;
            toolTips.registerRefreshable(deployingDivId, function() {
              return ('<table class="deploying_units_tool_tip">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>' + 
                              '<img src="skin/characters/%s%s_faceright.png" ' +
                                   '%s="15" />' + 
                            '</th>' + 
                            '<th>%s</th>' +
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>%s</tbody>' + 
                      '</table').format(
                  isArmy ? 'military/x60_y60/y60_' : 'fleet/60x60/',
                  type,
                  isArmy ? 'height' : 'width',
                  localizer.localize('misc','deploying'),
                  $.map(movements, function makeDeployingToolTipRow(movement) {
                    var count = movement.getUnits().getCount(type);
                    if (isDeploymentCountableMovement(movement)) {
                      return '<tr><td class="deploying_count">%s</td><td>%s</td></tr>'.format(
                          IkaTools.Intl.formatInteger(count, true),
                          IkaTools.Intl.formatRemainingTime(
                              movement.getArrivalTime() - IkaTools.View.gameTimeNow()));
                    } else {
                      return '';
                    }
                  }).join(''));
            });
          } else {
            toolTips.deregister(deployingDivId);
          }
          
          var plunderingDivId = 'MilitaryPludering_%s_%s'.format(city.getId(), type);
          if (plunderingCount) {
            var isArmy = IkaTools.Constants.UnitData[type].isArmy;
            toolTips.registerRefreshable(plunderingDivId, function() {
              return ('<table class="plundering_units_tool_tip">' + 
                        '<thead>' + 
                          '<tr>' + 
                            '<th>' + 
                              '<img src="skin/characters/%s%s_faceright.png" ' +
                                   '%s="15" />' + 
                            '</th>' + 
                            '<th>%s</th>' +
                          '</tr>' + 
                        '</thead>' + 
                        '<tbody>%s</tbody>' + 
                      '</table').format(
                  isArmy ? 'military/x60_y60/y60_' : 'fleet/60x60/',
                  type,
                  isArmy ? 'height' : 'width',
                  localizer.localize('misc','plundering'),
                  $.map(movements, function makeDeployingToolTipRow(movement) {
                    var count = movement.getUnits().getCount(type);
                    if (isPlunderCountableMovement(movement)) {
                      return '<tr><td class="plundering_count">%s</td><td>%s</td></tr>'.format(
                          IkaTools.Intl.formatInteger(count, true),
                          IkaTools.Intl.formatRemainingTime(
                              movement.getArrivalTime() - IkaTools.View.gameTimeNow()));
                    } else {
                      return '';
                    }
                  }).join(''));
            });
          } else {
            toolTips.deregister(plunderingDivId);
          }
          
          return !empireHasTroopType[type] ? '' : 
              ('<td class="military military_%s">' + 
                 '<div>%s</div>' + 
                 '<div id="%s" class="military_training imperator_tool_tip">%s</div>' + 
                 '<div id="%s" class="military_deploying imperator_tool_tip">%s</div>' +
                 '<div id="%s" class="military_plundering imperator_tool_tip">%s</div>' +
               '</td>').format(
                  type, 
                  count ? IkaTools.Intl.formatInteger(count) : '&nbsp;',
                  trainingDivId,
                  trainingCount ? IkaTools.Intl.formatInteger(trainingCount, true) 
                                : (trainingBatches.length ? '&nbsp;' : ''),
                  deployingDivId,
                  deployingCount ? IkaTools.Intl.formatInteger(deployingCount, true) 
                                 : (hasIncomingDeployments ? '&nbsp;' : ''),
                  plunderingDivId,
                  plunderingCount ? 
                      IkaTools.Intl.formatInteger(plunderingCount, true) : '');
        }
        
        function makeActionsCell(city) {
          var deployTroopsLink = new Link('DeployArmy_%s'.format(city.getId())).toLocalView(
              IkaTools.Constants.View.DEPLOY, 
              { 
                templateView: IkaTools.Constants.View.CITY_DETAIL,
                destinationCityId: city.getId(),
                deploymentType: 'army',
              },
              function() {
                var go = !IkaTools.View.isActiveCity(city);
                if (go) {
                  openMilitaryTabOnDeploymentClose = true;
                }
                return go;
              });
          var deployNavyLink = new Link('DeployNavy_%s'.format(city.getId())).toLocalView(
              IkaTools.Constants.View.DEPLOY,
              { 
                templateView: IkaTools.Constants.View.CITY_DETAIL,
                destinationCityId: city.getId(),
                deploymentType: 'fleet',
              },
              function() {
                var go = !IkaTools.View.isActiveCity(city);
                if (go) {
                  openMilitaryTabOnDeploymentClose = true;
                }
                return go;
              });
              
          var barracksLinkHtml = ''
          var shipyardLinkHtml = '';
          
          var barracks = city.getBuildingByType(IkaTools.Constants.Buildings.BARRACKS);
          var shipyard = city.getBuildingByType(IkaTools.Constants.Buildings.SHIPYARD);
          
          if (city.isOwn() && barracks) {
            var barracksLink = new Link('MilitaryBarracks_%s'.format(city.getId()))
                .toCityView(city, IkaTools.Constants.View.BARRACKS, 
                    { position: barracks.getPosition(), cityId: city.getId() });
            barracksLinkHtml = ('<a id="%s" class="imperator_link to_barracks" ' + 
                                'title="%s" href="javascript:void(0);"></a>').format(
                                    barracksLink.getId(),
                                    localizer.localize('actions','to_barracks'));
          }
          
          if (city.isOwn() && shipyard) {
            var shipyardLink = new Link('MilitaryShipyard_%s'.format(city.getId()))

                .toCityView(city, IkaTools.Constants.View.SHIPYARD, 
                    { position: shipyard.getPosition(), cityId: city.getId() });
            shipyardLinkHtml = ('<a id="%s" class="imperator_link to_shipyard" ' + 
                                'title="%s" href="javascript:void(0);"></a>').format(
                                    shipyardLink.getId(),
                                    localizer.localize('actions','to_shipyard'));
          }
          return ('<td class="actions">' + 
                    '<a id="%s" class="imperator_link deploy_army" ' + 
                       'title="%s" href="javascript:void(0);"></a>' +
                    '<a id="%s" class="imperator_link deploy_navy" ' +
                       'title="%s" href="javascript:void(0);"></a>' + 
                    '%s%s' +
                  '</td>').format(
                      deployTroopsLink.getId(),
                      localizer.localize('actions','deploy_army'),
                      deployNavyLink.getId(),
                      localizer.localize('actions','deploy_navy'),
                      barracksLinkHtml,
                      shipyardLinkHtml);
        }
  
        function makeRow(movements, city) {
          var rowUpdateable = updateables.create('MilitaryTableRow_%s'.format(city.getId()))
              .registerUpdate('cityChanged', 
                  function(element) {
                    if (IkaTools.View.isActiveCity(city)) {
                      element.addClass('current');
                    } else {
                      element.removeClass('current');
                    }
                  });
          
          return ('<tr id="%s" class="%s">' + 
                    '%s' +
                    '<td class="action_points">%s</td>' +
                    '%s' +
                    '%s' + 

                  '</tr>')
              .format(
                  rowUpdateable.getId(0),
                  (IkaTools.View.isActiveCity(city) ? 'current' : ''),
                  makeCityNameCells('military', city, true), 
                  IkaTools.Intl.formatInteger(city.getActionPoints()),
                  makeActionsCell(city),
                  $.map(UNIT_ORDER, function(info) {
                    return $.map(info.units, makeTableCell.bind(
                        null, city, city.getMilitary(), movements));
                  }).join(''));
        }
        
        function makeSummaryCell(type) {
          if (!empireHasTroopType[type]) {
            return '';
          }
          var count = 0;
          $.each(cities, function(index, city) {
            count += city.getMilitary().getPresent().getCount(type) || 0;
          });
          return '<td>%s</td>'.format(IkaTools.Intl.formatInteger(count));
        }
        
        function makeSummaryRow(cities) {
          return '<tr><td colspan="3" class="totals_sigma_cell"/>%s</tr>'.format(
              $.map(UNIT_ORDER, function(info) {
                return $.map(info.units, makeSummaryCell);
              }).join(''));
        }
  
        return '%s%s%s<thead>%s</thead><tbody>%s</tbody><tfoot>%s</tfoot>'.format(
            makeCityNameColGroup('<col class="action_points">', true),
            '<colgroup class="actions"><col class="actions"/></colgroup>',
            $.map(UNIT_ORDER, makeColGroup).join(''),
            makeTableHeadContent(),
            $.map(cities, makeRow.bind(
                null, IkaTools.EmpireData.getCivilizationData().getMovements())).join(''),
            makeSummaryRow(cities));
      }
      
      var tab = new Tab('military', localizer.localize('misc','military'), $(
          '<div class="imperator_overview">' +
            '<table class="overview" id="ImperatorOverviewMilitaryTable"/>' +
          '</div>'),
          'ImperatorOverviewMilitaryTable',
          function() {
            IkaTools.EmpireData.registerMilitaryChangedHandler(function(changes) {
              tab.maybeRedraw(true);
            });
            IkaTools.EmpireData.registerResourcesChangedHandler(function(changes) {
              var redraw = false;
              $.each(changes, function(index, change) {
                if (change.type == IkaTools.Constants.Resources.ACTION_POINTS) {
                  redraw = true;
                }
              });
              tab.maybeRedraw(redraw);
            });
            IkaTools.EmpireData.registerMovementsChangedHandler(function(changes) {
              var redraw = false;
              $.each(changes, function(index, change) {
                var mission = change.movement.getMission();
                if (mission == IkaTools.Constants.Movements.Mission.DEPLOY_ARMY ||
                    mission == IkaTools.Constants.Movements.Mission.DEPLOY_NAVY || 
                    mission == IkaTools.Constants.Movements.Mission.PLUNDER) {
                  redraw = true;
                }
              });
              tab.maybeRedraw(redraw);
            });
          },
          makeTableContent);
     
      return tab.getTab();
    }

    function makeEspionageTab() {
      function makeTableContent() {
        var updateables = this.updateables;

        function renderTarget(target) {
          var player = target.getPlayer();
          var alliance = player.getAlliance();

          // TODO: Add predicate when no spies.
          var cityLink = new Link('EspionageCityLink_%s'.format(target.getId()))
              .toIkariamPage({ view: IkaTools.Constants.BaseView.CITY, cityId: target.getId() });
          var cityLinkHtml = ('<a id="%s" class="imperator_link espionage_to_city_view player_state_%s" ' + 
                              'title="%s" href="javascript:void(0);">%s</a>').format(
                                  cityLink.getId(),
                                  player.getState(),
                                  localizer.localize('actions','to_city_view'),
                                  target.getName());
          var occupierHtml = '';
          if (target.getOccupier()) {
            occupierHtml = ('<img id="EspionageOccupier_%s" ' + 
                            '     class="espionage_occupier imperator_tool_tip" ' + 
                            '     src="skin/img/island/soldat_red.png" />').format(
                                target.getId());
            toolTips.registerSimple('EspionageOccupier_%s'.format(target.getId()),
                '<div class="nowrap">%s %s</div>'.format(
                    localizer.localize('espionage','occupied_by'), target.getOccupier().getName()));
          }

          var blockaderHtml = '';
          if (target.getBlockader()) {
            blockaderHtml = ('<img id="EspionageBlockader_%s" ' + 
                            '     class="espionage_blockader imperator_tool_tip" ' + 
                            '     src="skin/img/island/schiff_red.png" />').format(
                                target.getId());
            toolTips.registerSimple('EspionageBlockader_%s'.format(target.getId()),
                '<div class="nowrap">%s %s</div>'.format(
                    localizer.localize('espionage','blockaded_by'), target.getBlockader().getName()));
          }                  

          var allianceLinkHtml = '';
          if (alliance) {
            var allianceLink = new Link('EspionageAllianceLink_%s'.format(target.getId()))
                .toLocalView(IkaTools.Constants.View.ALLIANCE_PAGE, { allyId: alliance.getId()});
            var allianceLinkHtml = ('[<a id="%s" class="imperator_link" ' + 
                                    'title="%s" href="javascript:void(0);">%s</a>]').format(
                                        allianceLink.getId(),
                                        localizer.localize('actions','view_alliance_page'),
                                        alliance.getName());
          }
          var playerLink = new Link('EspionagePlayerLink_%s'.format(target.getId()))
              .toLocalView(IkaTools.Constants.View.HIGH_SCORE, { searchUser: player.getName() });
          var playerLinkHtml = ('<a id="%s" class="imperator_link player_state_%s" ' + 
                                'title="%s" href="javascript:void(0);">%s</a> %s').format(
                                    playerLink.getId(),
                                    player.getState(),
                                    localizer.localize('actions','view_high_score'),
                                    player.getName(),
                                    allianceLinkHtml);
                                    
          var islandLink = new Link('EspionageIslandLink_%s'.format(target.getId()))
              .toIkariamPage({ view: IkaTools.Constants.BaseView.ISLAND, cityId: target.getId() });
          var islandLinkHtml = ('<a id="%s" class="imperator_link espionage_to_island_view" ' + 
                                'title="%s" href="javascript:void(0);">[%s:%s]</a>').format(
                                   islandLink.getId(),
                                   localizer.localize('actions','to_island_view'),
                                   target.getIslandCoordinates()[0], target.getIslandCoordinates()[1]);

          var spyActionLink = new Link('EspionageSpyActionLink_%s'.format(target.getId()))
              .toIkariamPage(
                  { view : IkaTools.Constants.BaseView.CITY, cityId: target.getId() },
                  IkaTools.View.makeIkariamLoadLocalPageAnchor(
                      { view: IkaTools.Constants.View.SPY_MISSION, targetCityId: target.getId() }));
          var spyActionLinkHtml = ('<a id="%s" class="imperator_link spy_mission" ' +
                                   'title="%s" href="javascript:void(0);"></a>').format(
                                       spyActionLink.getId(),
                                       localizer.localize('actions','spy_mission'));
                                       
          var pillageLink = new Link('EspionagePillageLink_%s'.format(target.getId()))
              .toIkariamPage(
                  { view: IkaTools.Constants.BaseView.ISLAND, cityId: target.getId() },
                  IkaTools.View.makeIkariamLoadLocalPageAnchor(
                      { view: IkaTools.Constants.View.PILLAGE, destinationCityId: target.getId() }, true));
          var pillageLinkHtml = ('<a id="%s" class="imperator_link pillage_mission" ' +
                                 'title="%s" href="javascript:void(0);"></a>').format(
                                     pillageLink.getId(),
                                     localizer.localize('actions','pillage'));
                                       
          var blockadeLink = new Link('EspionageBlockageLink_%s'.format(target.getId()))
              .toIkariamPage(
                  { view: IkaTools.Constants.BaseView.ISLAND, cityId: target.getId() },
                  IkaTools.View.makeIkariamLoadLocalPageAnchor(
                      { view: IkaTools.Constants.View.BLOCKADE, destinationCityId: target.getId() }, true));
          var blockadeLinkHtml = ('<a id="%s" class="imperator_link blockade_mission" ' +
                                  'title="%s" href="javascript:void(0);"></a>').format(
                                      blockadeLink.getId(),
                                      localizer.localize('actions','blockade'));

          var sendSpyLink = new Link('EspionageSendSpyLink_%s'.format(target.getId()))
              .toLocalView(IkaTools.Constants.View.SEND_SPY, 
                  { isMission: 1, destinationCityId: target.getId() });
          var sendSpyLinkHtml = ('<a id="%s" class="imperator_link send_spy_mission" ' +
                                 'title="%s" href="javascript:void(0);"></a>').format(
                                      sendSpyLink.getId(),
                                      localizer.localize('actions','send_spy'));

          var occupyLink = new Link('EspionageOccupyLink_%s'.format(target.getId()))
              .toIkariamPage(
                  { view: IkaTools.Constants.BaseView.ISLAND, cityId: target.getId() },
                  IkaTools.View.makeIkariamLoadLocalPageAnchor(
                      { view: IkaTools.Constants.View.OCCUPY, destinationCityId: target.getId() }, true));
          var occupyLinkHtml = ('<a id="%s" class="imperator_link occupy_mission" ' +
                                'title="%s" href="javascript:void(0);"></a>').format(
                                    occupyLink.getId(),
                                    localizer.localize('actions','occupy'));
          var removeTargetLink = new Link('EspionageRemoveTarget_%s'.format(target.getId()))
              .toFunction(function removeTarget() {
                target.remove();
              });
          var removeTargetHtml = ('<a id="%s" class="imperator_link remove_espionage_target" ' +
                                  'title="%s" href="javascript:void(0);"></a>').format(
                                      removeTargetLink.getId(),
                                      localizer.localize('espionage','remove_target'));

          function renderTravelTime(city) {
            return IkaTools.Intl.formatRemainingTime(
                  IkaTools.EmpireData.calculateTravelTime(
                      city.getIslandCoordinates(), target.getIslandCoordinates(), null, 1), 
                  false, 3);
          }

          var travelTimeUpdateable = updateables.create('EspionageTravelTime_%s'.format(target.getId()));
          travelTimeUpdateable.registerUpdate('cityChanged', 
            function updateTravelTimeOnCityChange(travelTime) {
              travelTime.html(renderTravelTime(IkaTools.View.getCurrentCity()));
            });

          function makeTravelTimeTable() {
            var cities = IkaTools.EmpireData.getCities();
            cities.sort(function(city1, city2) {
              return IkaTools.EmpireData.calculateTravelTime(
                  city1.getIslandCoordinates(), target.getIslandCoordinates()) - 
                  IkaTools.EmpireData.calculateTravelTime(
                      city2.getIslandCoordinates(), target.getIslandCoordinates());
            });
            return ('<table class="travel_time">' +
                      '<thead><tr><td>%s</td><td>%s</td></tr></head>' + 
                      '<tbody>%s</tbody>' + 
                    '</table>').format(
                        localizer.localize('misc','city_name'),
                        localizer.localize('espionage','travel_time'),
                        $.map(cities, function(city) {
                          if (city.isOwn()) {
                            return '<tr><td>%s</td><td>%s</td></tr>'.format(
                                city.getName(),
                                renderTravelTime(city));
                          } else {
                            return '';
                          }
                        }).join(''));
          }
          
          toolTips.register('EspionageTravelTime_%s'.format(target.getId()), 
              makeTravelTimeTable);
          

          var lootableResources = NaN;
          if (target.hasResourceInfo()) {
            lootableResources = 
                target.getLootableResources(IkaTools.Constants.Resources.WOOD) +
                target.getLootableResources(IkaTools.Constants.Resources.WINE) +
                target.getLootableResources(IkaTools.Constants.Resources.MARBLE) +
                target.getLootableResources(IkaTools.Constants.Resources.GLASS) +
                target.getLootableResources(IkaTools.Constants.Resources.SULFUR);
                
            function makeResourceTable() {
              function makeLootableRow(resource) {
                return ('<tr>' + 
                          '<td class="resource_icon">' + 
                            '<img src="skin/resources/icon_%s.png">' + 
                          '</td>' +
                          '<td class="resource_lootable">%s</td>' + 
                        '</tr>').format(
                            resource,
                            IkaTools.Intl.formatInteger(target.getLootableResources(resource)));
              }
              
              return ('<table class="lootable_resources">' +
                      '<thead class="imperator_tool_tip_title">' + 
                        '<tr><th colspan="2">%s</th></tr>' +
                      '</thead>' +
                      '<tbody>' + 
                        '%s%s%s%s%s' + 
                      '</tbody>' +
                      '<tfoot>' +
                        '<tr>' + 
                          '<td><img src="skin/layout/icon-status-small.png" height="11"/></td>' +
                          '<td>%s</td>' + 
                        '</tr>' +
                      '</tfoot>' +
                    '<table>')
                          .format(
                              localizer.localize('espionage', 'resources_lootable'),
                              makeLootableRow(IkaTools.Constants.Resources.WOOD),
                              makeLootableRow(IkaTools.Constants.Resources.WINE),
                              makeLootableRow(IkaTools.Constants.Resources.MARBLE),
                              makeLootableRow(IkaTools.Constants.Resources.GLASS),
                              makeLootableRow(IkaTools.Constants.Resources.SULFUR),
                              IkaTools.Intl.formatRemainingTime(
                                  IkaTools.View.gameTimeNow() - target.getResourcesSpyTime()));
            }
            
            toolTips.register('EspionageLootableResources_%s'.format(target.getId()), 
                makeResourceTable);
          } else {
            toolTips.deregister('EspionageLootableResources_%s'.format(target.getId()));
          }

          if (target.hasMilitaryInfo()) {
            var military = target.getMilitary();
            var otherMilitary = target.getOtherMilitary();
            
            function makeGarrisonTableHeaderCell(type) {
              var displayName = localizer.localize('units', type);
              return (military.getCount(type) || otherMilitary.getCount(type)) ? 
                  ('<th class="military military_%s">%s</th>').format(type, displayName) : 
                  '';
            }

            function makeGarrisonTableBodyCell(type) {
              var count = military.getCount(type);
              var otherCount = otherMilitary.getCount(type);
              if (!(count || otherCount)) {
                return '';
              }
              var countDisplay = '';
              if (count) {
                countDisplay = IkaTools.Intl.formatInteger(count);
              }
              if (otherCount) {
                countDisplay = '%s (%s)'.format(
                    countDisplay, IkaTools.Intl.formatInteger(otherCount));
              }
              return '<td>%s</td>'.format(countDisplay);
            }
          
            function makeGarrisonTable() {
              var header = $.map(UNIT_ORDER, function(info) {
                            return $.map(info.units, makeGarrisonTableHeaderCell);
                          }).join('') || '<th>%s</th>'.format(localizer.localize('misc','none'));
              return ('<table class="target_military_garrison">' +
                        '<thead><tr>%s</tr></thead>' + 
                        '<tbody><tr>%s</tr></tbody>' + 
                        '<tfoot>' +
                          '<tr>' + 
                            '<td colspan="100"><img src="skin/layout/icon-status-small.png"/ height="11">%s</td>' +
                          '</tr>' +
                        '</tfoot>' +
                      '</table>').format(
                          header,
                          $.map(UNIT_ORDER, function(info) {
                            return $.map(info.units, makeGarrisonTableBodyCell);
                          }).join(''),
                          IkaTools.Intl.formatRemainingTime(
                              IkaTools.View.gameTimeNow() - target.getMilitarySpyTime()));
            }

            toolTips.register('EspionageMilitaryReport_%s'.format(target.getId()),
                makeGarrisonTable);
          } else {
            toolTips.deregister('EspionageMilitaryReport_%s'.format(target.getId()));
          }

          var combats = target.getCombats(7 * IkaTools.Constants.Time.MILLIS_PER_DAY);
          if (combats.length) {
            function makeCombatsTable() {
              function makeLootedRow(combat, resource) {
                var looted = combat.getLooted(resource);
                if (looted) {
                  return ('<tr>' + 
                            '<td class="resource_icon">' + 
                              '<img src="skin/resources/icon_%s.png">' + 
                            '</td>' +
                            '<td class="resource_looted">%s</td>' + 
                          '</tr>').format(
                              resource,
                              IkaTools.Intl.formatInteger(looted));
                } else {
                  return '';
                }
              }
              
              function makeCombatRow(combat) {
                return ('<tr>' + 
                          '<td>' + 
                            '<div class="combat_type_%s"/>' +
                          '</td>' +
                          '<td>%s</td>' + 
                          '<td><table class="combat_looted"><tbody>%s%s%s%s%s</tbody></table></td>' + 
                        '</tr>').format(
                            combat.getType(),
                            IkaTools.Intl.formatRemainingTime(
                                IkaTools.View.gameTimeNow() - combat.getTime()),
                            makeLootedRow(combat, IkaTools.Constants.Resources.WOOD),
                            makeLootedRow(combat, IkaTools.Constants.Resources.WINE),
                            makeLootedRow(combat, IkaTools.Constants.Resources.MARBLE),
                            makeLootedRow(combat, IkaTools.Constants.Resources.GLASS),
                            makeLootedRow(combat, IkaTools.Constants.Resources.SULFUR));
              }
              
              return ('<table class="espionage_combats">' +
                        '<thead>' +
                          '<tr>' + 
                            '<th></th>' + 
                            '<th>%s</th>' + 
                            '<th>%s</th>' +
                          '</tr>' +  
                        '</thead>' +
                        '<tbody>' + 
                          '%s' + 
                        '</tbody>' +
                      '<table>').format(
                          localizer.localize('espionage','time_since'),
                          localizer.localize('espionage','resources_looted'),
                          $.map(combats, makeCombatRow).join(''));
            }
            toolTips.register('EspionageMilitaryActions_%s'.format(target.getId()), 
                makeCombatsTable);
          } else {
            toolTips.deregister('EspionageMilitaryActions_%s'.format(target.getId()));
          }
                                       
          return ('<tr>' + 
                    '<td class="city_tradegood"><img src="skin/resources/icon_%s.png"/>%s%s</td>' + 
                    '<td class="city_name nowrap">%s</td>' + 
                    '<td class="player nowrap">%s</td>' + 
                    '<td class="location">%s</td>' + 
                    '<td class="actions">%s%s%s%s%s%s</td>' + 
                    '<td id="%s" class="travel_time  imperator_tool_tip">%s</td>' + 
                    '<td class="townhall_level">%s</td>' + 
                    '<td class="wall_level">%s</td>' + 
                    '<td id="EspionageLootableResources_%s" class="resources_lootable imperator_tool_tip">%s</td>' + 
                    '<td id="EspionageMilitaryActions_%s" class="combats imperator_tool_tip">%s</td>' + 
                    '<td id="EspionageMilitaryReport_%s" class="military_score imperator_tool_tip">%s</td>' + 
                  '</tr>').format(
                      target.getTradeGoodType(),
                      occupierHtml, blockaderHtml, cityLinkHtml,
                      playerLinkHtml, 
                      islandLinkHtml,
                      spyActionLinkHtml, pillageLinkHtml, blockadeLinkHtml, occupyLinkHtml, sendSpyLinkHtml, removeTargetHtml,
                      travelTimeUpdateable.getId(0), 
                      IkaTools.Intl.formatRemainingTime(
                          IkaTools.EmpireData.calculateTravelTime(
                              IkaTools.View.getCurrentCity().getIslandCoordinates(), target.getIslandCoordinates(), null, 1), 
                          false, 3),
                      IkaTools.Intl.formatInteger(target.getTownLevel()),
                      IkaTools.Intl.formatInteger(target.getWallLevel()),
                      target.getId(), 
                      IkaTools.Intl.formatInteger(Math.ceil(
                          lootableResources / IkaTools.Constants.GamePlay.RESOURCES_PER_TRANSPORT)), 
                      target.getId(), combats.length ? IkaTools.Intl.formatInteger(combats.length) : '-',
                      target.getId(), IkaTools.Intl.formatInteger(player.getMilitaryScore()));
        }
      
        function makeTableHead() {
          toolTips.registerSimple('EspionageLocationHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','location')));
          toolTips.registerSimple('EspionageTravelTimeHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','travel_time')));
          toolTips.registerSimple('EspionageTownHallLevelHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','townhall_level')));
          toolTips.registerSimple('EspionageWallLevelHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','wall_level')));
          toolTips.registerSimple('EspionageResourcesLootableHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','resources_lootable')));
          toolTips.registerSimple('EspionageCombatsHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','combats')));
          toolTips.registerSimple('EspionageMilitaryScoreHeader',
              '<div class="nowrap">%s</div>'.format(
                  localizer.localize('espionage','military_score')));
          return ('<thead>' +
                  '<tr>' +
                    '%s' + 
                    '<th colspan="1" id="EspionagePlayerHeader" ' +
                        'class="player imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageLocationHeader" ' + 
                        'class="location imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageActionsHeader" ' + 
                        'class="actions imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageTravelTimeHeader" ' + 
                        'class="travel_time imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageTownHallLevelHeader" ' +
                        'class="townhall_level imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageWallLevelHeader" ' + 
                        'class="wall_level imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageResourcesLootableHeader" ' + 
                        'class="resources_lootable imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageCombatsHeader" ' + 
                        'class="combats imperator_tool_tip">%s</th>' +
                    '<th colspan="1" id="EspionageMilitaryScoreHeader" ' + 
                        'class="military_score imperator_tool_tip">%s</th>' +
                  '</tr>' + 
                 '</thead>').format(
                     makeCityNameHeaderCells(),
                     localizer.localize('espionage','player'),
                     localizer.localize('espionage','location'),
                     localizer.localize('misc','actions'),
                     localizer.localize('espionage','travel_time'),
                     localizer.localize('espionage','townhall_level'),
                     localizer.localize('espionage','wall_level'),
                     localizer.localize('espionage','resources_lootable'),
                     localizer.localize('espionage','combats'), 
                     localizer.localize('espionage','military_score'));
        }
        var targets = IkaTools.EmpireData.Espionage.getTargets();
        
        return '%s<tbody>%s</tbody>'.format(
            makeTableHead(),
            $.map(targets, renderTarget).join(''));
      }
      
      var tab = new Tab('espionage', localizer.localize('misc','espionage'), $(
          '<div class="imperator_overview">' +
            '<table class="overview" id="ImperatorOverviewEspionageTable"/>' +
          '</div>'),
          'ImperatorOverviewEspionageTable',
          function() {
            IkaTools.EmpireData.Espionage.registerEspionageChangedHandler(function(changes) {
              tab.maybeRedraw(true);
            });
          },
          makeTableContent);
     
      return tab.getTab();
    }
    
    var openResourcesTabOnTransportClose = false;
    var openBuildingsTabOnTransportClose = false;
    var openMilitaryTabOnDeploymentClose = false;
  
    var makePopup = IkaTools.Utils.thunk(function makePopup() {
      var resourceTab = makeResourceTab();
      var buildingsTab = makeBuildingsTab();
      var militaryTab = makeMilitaryTab();
      var espionageTab = makeEspionageTab();
      
      var tabPane = new IkaTools.UI.TabPane(
          [resourceTab, buildingsTab, militaryTab, espionageTab],
          {
            tabActivatedCallback: function() {
              IkaTools.UI.resizePopup();
            },
          });
  
      var popup = new IkaTools.UI.PopupWindow(
        'cityBuildings',
        $('<div>Imperator Overview</div>'),
        tabPane.getContainer(),
        { oversized:true,
          deactivatedCallback: function() {
            resourceTab.deactivated();
            buildingsTab.deactivated();
            militaryTab.deactivated();
            espionageTab.deactivated();
          },
        }
      );
      
      function displayResources() {
        popup.display(true);
        resourceTab.activate();
      }
      function displayBuildings() {
        popup.display(true);
        buildingsTab.activate();
      }
      function displayMilitary() {
        popup.display(true);
        militaryTab.activate();
      }
      function displayEspionage() {
        popup.display(true);
        espionageTab.activate();
      }
      
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function resetReopenTabVars(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, 
                function lookForChangeView(index, name, data) {
                  if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                    var view = data[0];
                    if (view == IkaTools.Constants.View.CITY_DETAIL) {
                      if (openResourcesTabOnTransportClose) {                        
                        popup.display(true);
                        resourceTab.activate();
                      }
                      if (openBuildingsTabOnTransportClose) {
                        popup.display(true);
                        buildingsTab.activate();
                      }
                      if (openMilitaryTabOnDeploymentClose) {
                        popup.display(true);
                        militaryTab.activate();
                      }
                    }
                    if (view != IkaTools.Constants.View.TRANSPORT) {
                      openResourcesTabOnTransportClose = false;
                      openBuildingsTabOnTransportClose = false;
                    }
                    if (view != IkaTools.Constants.View.DEPLOY) {
                      openMilitaryTabOnDeploymentClose = false;
                    }
                  }
                });
          });
  
      return {
        displayResources: displayResources,
        displayBuildings: displayBuildings,
        displayMilitary: displayMilitary,
        displayEspionage: displayEspionage,
        close: popup.close.bind(popup),
      };
    });
    
    var leftMenuResourceContent = 
        $(('<li>' + 
            '<div class="image" ' + 
                 'style="background-image: url(\'/skin/layout/btn_world.jpg\'); ' +
                 'background-position: -27px -1px;">' + 
            '</div>' +
            '<div class="name"><span class="namebox">%s</span></div>' + 
          '</li>').format(localizer.localize('misc','resource_overview')));
    var leftMenuBuildingsContent = 
        $(('<li>' + 
           '<div class="image" ' + 
                'style="background-image: url(\'/skin/layout/btn_city.png\'); ' +
                'background-position: -22px -1px;">' + 
           '</div>' +
           '<div class="name"><span class="namebox">%s</span></div>' + 
         '</li>').format(localizer.localize('misc','buildings_overview')));
    var leftMenuArmyContent = 
        $(('<li>' + 
            '<div class="image" ' + 
                 'style="background-image: url(\'skin/characters/military/x40_y40/y40_phalanx_faceright.png\'); ' +
                 'background-position: 0px -4px;">' + 
            '</div>' +
            '<div class="name"><span class="namebox">%s</span></div>' + 
          '</li>').format(localizer.localize('misc','military_overview')));
    var leftMenuEspionageContent = 
        $(('<li>' + 
            '<div class="image" ' + 
                 'style="background-image: url(\'/skin/characters/military/120x100/spy_120x100.png\'); ' +
                 'background-position: 1px 3px;' +
                 'background-repeat: no-repeat;' + 
                 'background-size: 100% auto;">' + 
            '</div>' +
            '<div class="name"><span class="namebox">%s</span></div>' + 
          '</li>').format(localizer.localize('misc','espionage_overview')));
          
    menuItems = [];
    if (showResourceOverview.isEnabled()) {
      menuItems.push(new IkaTools.UI.LeftMenu.Item(leftMenuResourceContent));
    }
    if (showBuildingsOverview.isEnabled()) {
      menuItems.push(new IkaTools.UI.LeftMenu.Item(leftMenuBuildingsContent));
    }
    if (showMilitaryOverview.isEnabled()) {
      menuItems.push(new IkaTools.UI.LeftMenu.Item(leftMenuArmyContent));
    }
    if (showEspionageOverview.isEnabled()) {
      menuItems.push(new IkaTools.UI.LeftMenu.Item(leftMenuEspionageContent));
    }
  
    var leftMenu = new IkaTools.UI.LeftMenu(menuItems, { atTop: true });
    leftMenu.display();
  
    return function overviewReady() {
      if (showResourceOverview.isEnabled()) {
        leftMenuResourceContent.mousedown(IkaTools.Logging.debuggable(
          { label: 'Imperator.overview.showResourceTable.mousedown', 
            alwaysTime: true, profile: true },
          function() {
            makePopup().displayResources();
          }));
      }
      if (showBuildingsOverview.isEnabled()) {
        leftMenuBuildingsContent.mousedown(IkaTools.Logging.debuggable(
            { label: 'Imperator.overview.showBuildingsTable.mousedown', 
              alwaysTime: true, profile: true },
            function() {
              makePopup().displayBuildings();
            }));
      }
      if (showMilitaryOverview.isEnabled()) {
        leftMenuArmyContent.mousedown(IkaTools.Logging.debuggable(
            { label: 'Imperator.overview.showMilitaryTable.mousedown',
              alwaysTime: true, profile: true },
            function() {
              makePopup().displayMilitary();
            }));
      }
      if (showEspionageOverview.isEnabled()) {
        IkaTools.EmpireData.Espionage.startTracking();
        leftMenuEspionageContent.mousedown(IkaTools.Logging.debuggable(
            { label: 'Imperator.overview.showEspionageTable.mousedown',
              alwaysTime: true, profile: true},
            function() {
              makePopup().displayEspionage();
            }));
      }
    };
  }
  
  function registerLoggingEventHandlers() {  
    IkaTools.EmpireData.registerResourcesChangedHandler(function(changes) {
      IkaTools.Logging.debug('Resources changed: ', changes);
    });
    IkaTools.EmpireData.registerBuildingsChangedHandler(function(changes) {
      IkaTools.Logging.debug('Buildings changed: ', changes);
    });
    IkaTools.EmpireData.registerMilitaryChangedHandler(function(changes) {
      IkaTools.Logging.debug('Military changed: ', changes);
    });
    IkaTools.EmpireData.registerCivilizationDataChangedHandler(function(changes) {
      IkaTools.Logging.debug('CivilizationData changed: ', changes);
    });
    IkaTools.EmpireData.registerMovementsChangedHandler(function(changes) {
      IkaTools.Logging.debug('Movements changed: ', changes);
    });
    IkaTools.EmpireData.Espionage.registerEspionageChangedHandler(function(changes) {
      IkaTools.Logging.debug('Espionage changed: ', changes);
    });
  }

  function fireFakeKeyboardEvent(input) {
    // fake event so Ikariam handlers update related sliders and stuff
    var e = document.createEvent("KeyboardEvent");
    if (e.initKeyboardEvent) {
      e.initKeyboardEvent(
          'keyup', true, true, window, false, false, false, false, 13, 0);
    } else {
      e.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
    }
    input.dispatchEvent(e);
  }
  
  function initQuickGoodsButtons() {    
    function createButton(input, textName, increment) {
      var button = $('<a class="button" title="%s">%s</a>'.format(
          localizer.localize('tweaks',textName + '_text'),
          localizer.localize('tweaks',textName)));
      button.click(IkaTools.Logging.debuggable(
          'Imperator.quickGoodsSelectIncrement[' + increment + ']',
          function incrementSelectedGoods() {
            var current = parseInt(input.val()) || 0;
            var newValue = 
                Math.ceil((current + (increment > 0 ? 1 : -1)) / increment) * increment;
            input.val(newValue);
            fireFakeKeyboardEvent(input.get(0));
          }));
      return button;
    }
    
    function addChangeGoodsButtons(input) {
      var span = $('<span class="quick_goods_select"/>');
      var minus500Button = createButton(input, 'transport_minus_500', -500);
      var plus500Button = createButton(input, 'transport_plus_500', 500);
      var plus1000Button = createButton(input, 'transport_plus_1000', 1000);
      var plus5000Button = createButton(input, 'transport_plus_5000', 5000);
      span.append(minus500Button, plus500Button, plus1000Button, plus5000Button);
      
      input.after(span);
    }
    
    var stylesToAdd = 
        '.quick_goods_select a, .quick_goods_select a:active {' + 
          'margin: 3px; padding: 1px 3px; font-size: 10px; font-weight:normal;' + 
        '}' +
        '#transport .quick_goods_select {' + 
          'position: absolute;' + 
          'top: 6px;' + 
          'left: 468px;' + 
        '}' +
        '.quick_goods_select {' +
          '-webkit-user-select: none;' +
          '-khtml-user-select: none;' +
          '-moz-user-select: none;' +
          '-o-user-select: none;' + 
          'user-select: none;' +
        '}';
    
    if (transportButtons.isEnabled()) {
      stylesToAdd += 
          '#mission ul.resourceAssign { width: 640px; }' + 
          '#mission .resourceAssign li { padding:0px; background-position:0 center;}' +
          '#mission .resourceAssign .sliderinput { margin:0 0 0 30px; width:400px;}' +
          '#mission .resourceAssign input.textfield {' + 
            'position:relative;top:-26px;margin-left:-5px;' + 
          '}';
          
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function addTransportButtons(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, 
                function lookForChangeView(index, name, data) {
                  if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                    var view = data[0];
                    if (view == IkaTools.Constants.View.TRANSPORT || 
                        view == IkaTools.Constants.View.COLONIZE) {
                      $('#transportForm ul.resourceAssign li input').each(
                          function(index, node) {
                            addChangeGoodsButtons($(node));
                          });
                    } else if (view == IkaTools.Constants.View.TAKE_OFFER) {
                      $('#transportForm td.input input').each(
                          function(index, node) {
                            addChangeGoodsButtons($(node));
                          });
                    } else if (view == IkaTools.Constants.View.BRANCH_OFFICE) {
                      $('#branchOffice form[name=formkontor] tr input').filter(':even').each(
                          function(index, node) {
                            addChangeGoodsButtons($(node));
                          });
                    }
                  }
                });    
          }, true);
    }
    
    if (donationButtons.isEnabled()) {
      stylesToAdd += 
          '#donateForm input.textfield {' + 
            'margin-bottom: 6px;' + 
          '}';
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function addTransportButtons(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, 
                function lookForChangeView(index, name, data) {
                  if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                    var view = data[0];
                    if (view == IkaTools.Constants.View.RESOURCE ||
                        view == IkaTools.Constants.View.TRADE_GOOD ) {
                      var input = $('#donateForm input.textfield');
                      
                      var span = $('<span class="quick_goods_select"/>');
                      var plus1kButton = createButton(input, 'donate_plus_1000', 1000);
                      var plus10kButton = createButton(input, 'donate_plus_10000', 10000);
                      var plus100kButton = createButton(input, 'donate_plus_100000', 100000);
                      span.append(plus1kButton, plus10kButton, plus100kButton);
                      
                      input.after(span);
                    }
                  }
                });
          }, true);
    }
        
    return stylesToAdd;
  }
  
  function initBuildingDemolitionHandler() {
    var activeDemolitionInfo = null;
    
    IkaTools.View.registerIkariamAjaxResponseCallback(
        IkaTools.Utils.forEachIkariamAjaxResponseFunction(
            function demolitionHandler(index, name, value) {
              if (name == IkaTools.Constants.IkariamAjaxResponseType.ADD_WINDOW &&
                  value[0] == 'buildings_demolition') {
                var demolitionButton = $('#buildings_demolition a.button');
                var hrefMatch = demolitionButton.attr('href').match(
                    /function=demolishBuilding&level=(\d+)&cityId=(\d+)&position=(\d+)/);
                var level = parseInt(hrefMatch[1]);
                var cityId = parseInt(hrefMatch[2]);
                var position = parseInt(hrefMatch[3]);
                
                if (activeDemolitionInfo && 
                    activeDemolitionInfo.level == level && 
                    activeDemolitionInfo.cityId == cityId && 
                    activeDemolitionInfo.position == position) {
                  activeDemolitionInfo.level = level - 1;
                  demolitionButton[0].click();
                } else {
                  if (confirm(localizer.localize('tweaks', 'completely_demolish_building_prompt'))) {
                    if (level > 1) {
                      activeDemolitionInfo = { level: level - 1, cityId: cityId, position: position };
                      demolitionButton[0].click();
                    } else {
                      activeDemolitionInfo = null;
                    }
                  }
                }
              } else if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                var demolitionButton = $('#buildingUpgrade .downgrade .action_btn');
                if (demolitionButton.length > 0) {
                  var hrefMatch = demolitionButton.attr('href').match(
                      /view=buildings_demolition&cityId=(\d+)&position=(\d+)&level=(\d+)/);
                  if (hrefMatch) {
                    var level = parseInt(hrefMatch[3]);
                    var cityId = parseInt(hrefMatch[1]);
                    var position = parseInt(hrefMatch[2]);
                    
                    if (activeDemolitionInfo && 
                        activeDemolitionInfo.level == level && 
                        activeDemolitionInfo.cityId == cityId && 
                        activeDemolitionInfo.position == position) { 
                      demolitionButton[0].click();
                    }
                  }
                }
              }
            }));
  }
  
  function initTweaks() {
    if (autoAcceptDailyBonus.isEnabled()) {
      function submitDailyActivityBonus() {
        $('#dailyActivityBonus form').submit();
      }
      if (IkaTools.Utils.isChrome()) {
        // Who knows why you would send back a page that then immediately turns around
        // and queries the server it came from.  But then, you are not an Ikariam developer.
        // In all likelihood you posess at least a single brain cell (a sufficient but 
        // not necessary condition).
        // In any case, the fact is that in Chrome this starts an ajax call before we 
        // have had a chance to hook in any of the ajax handler overrides in developer
        // tools.  So to counteract the stupid things Ikariam developers did we have to 
        // do this the bruteforce way.
        setTimeout(submitDailyActivityBonus, 500);
        setTimeout(submitDailyActivityBonus, 1000);
        setTimeout(submitDailyActivityBonus, 2000);
        setTimeout(submitDailyActivityBonus, 5000);
      } else {
        IkaTools.View.registerIkariamAjaxResponseCallback(
            IkaTools.Utils.forEachIkariamAjaxResponseFunction(
                function findDailyBonusWindow(index, name, value) {
                  if (name == IkaTools.Constants.IkariamAjaxResponseType.ADD_WINDOW &&
                      value[0] == 'dailyActivityBonus') {
                    submitDailyActivityBonus();
                  }
                }));
      }
    }
    
    var addedStyles = '';
    
    if (hideAds.isEnabled()) {
      addedStyles += '.ad_banner { display: none; } ';
    }
    if (hideFacebook.isEnabled()) {
      addedStyles += '#facebook_button * { display: none !important; } ';
    }
    if (hideFriendsBar.isEnabled()) {
      addedStyles += '#js_viewFriends { display: none; } ';
    }
    if (hideChat.isEnabled()) {
      addedStyles += '#js_viewChat { display: none; } ';
    }
    
    addedStyles += initQuickGoodsButtons();
    
    initBuildingDemolitionHandler();
    
    if (showCityOwners.isEnabled() && IkaTools.View.viewIsIsland()) {
      function doLabelCities(data) {
        for (var i = 0; i < 17; i++) {
          var cityData = data.cities[i];
          if (cityData.type != 'buildplace') {
            $('#js_cityLocation' + i + 'TitleText').append(' (' + cityData.ownerName + ')');
          }
        }
      }

      addedStyles += '#island .city .scroll_img .center { overflow: hidden; width: 175px; } ' +
                     '#island .city .scroll_img .after { left: 175px; } ';
        
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function labelCityOwners(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
              if (name == IkaTools.Constants.IkariamAjaxResponseType.UPDATE_BACKGROUND_DATA) {
                doLabelCities(data);
              } else if (name == IkaTools.Constants.IkariamAjaxResponseType.UPDATE_GLOBAL_DATA) {
                doLabelCities(data['backgroundData'] || data[11]);
              }
            });
          }, true);
    }

    if (preventAccidentalColonyDestruction.isEnabled()) {
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function preventAccidentalColonyDestruction(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
              if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                if (data[0] == IkaTools.Constants.View.ABOLISH_CITY) {
                  var cityId = parseInt($('#abolishCity input[name=cityId]').val());
                  var city = IkaTools.EmpireData.getCity(cityId);
                  var palace = city.getBuildingByType(IkaTools.Constants.Buildings.PALACE);
                  var governorsResidence = city.getBuildingByType(
                      IkaTools.Constants.Buildings.GOVERNORS_RESIDENCE);
                  if (palace || governorsResidence) {
                    unsafeWindow.ikariam.TemplateView.destroyTemplateView();
                    alert(localizer.localize('tweaks', 'destroy_non_mobile_colony_prompt'));
                  }
                }
              }
            });
          }, true);
    }

    if (initializeColonizationMissionsForPirateRaiding.isEnabled()) {
      IkaTools.View.registerIkariamAjaxResponseCallback(
          function initializeColonizationMissionsForPirateRaiding(response) {
            IkaTools.Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
              if (name == IkaTools.Constants.IkariamAjaxResponseType.CHANGE_VIEW) {
                if (data[0] == IkaTools.Constants.View.COLONIZE) {
                  var woodInput = $('#textfield_wood');
                  var marbleInput = $('#textfield_marble');
                  var civData = IkaTools.EmpireData.getCivilizationData();
        
                  var multiplier = 1.0;
                  multiplier -= civData.hasResearched(
                      IkaTools.Constants.Research.Economy.PULLEY) ? .02 : 0;
                  multiplier -= civData.hasResearched(
                      IkaTools.Constants.Research.Economy.GEOMETRY) ? .04 : 0;
                  multiplier -= civData.hasResearched(
                      IkaTools.Constants.Research.Economy.SPIRIT_LEVEL) ? .08 : 0;

                  woodInput.val(Math.ceil(multiplier * 
                      IkaTools.Constants.BuildingData[IkaTools.Constants.Buildings.PIRATE_FORTRESS].wood[0]) - 250);
                  marbleInput.val(Math.ceil(multiplier * 
                      IkaTools.Constants.BuildingData[IkaTools.Constants.Buildings.PIRATE_FORTRESS].marble[0]));

                  // Have to give time for Ikariam javascript that processes the click
                  // to be registered.
                  setTimeout(function() {$('#slider_capacity_min').get(0).click();}, 0);
                }
              }
            });
          }, true);
    }
    
    GM_addStyle(addedStyles);
  }
  
  function initAlerts() {
    function showDesktopNotification(icon, title, text, audio) {
      if (window.webkitNotifications && 
          window.webkitNotifications.checkPermission() == 0) {
        if (audio) {
          var audioNode = $('<audio autoplay="autoplay" loop="loop"><source src="http://soundjax.com/reddo/67560%5Ealarma.mp3" type="audio/mp3" />');
          $('body').append(audioNode);
        }
        var notification = window.webkitNotifications.createNotification(icon, title, text);
        notification.onclick = IkaTools.Logging.debuggable(
            'Imperarator.buildingCompletionAlert.desktopAlertClicked',
            function buildingDesktopAlertClicked() {
              notification.cancel();
              window.focus();
            });
        notification.onclose = IkaTools.Logging.debuggable(
            'Imperator.buildingCompletionAlert.desktopAlertClosed',
            function buildingDesktopAlertClosed() {
              if (audio) {
                audioNode.remove();
              }
            });
        notification.show();
      }
    }
    
    if (buildingCompletionAlert_Desktop.isEnabled()) {
      IkaTools.EmpireData.registerBuildingsChangedHandler(
          function alertBuildingCompletion(changes) {
            $.each(changes, function forEachBuildingChange(index, change) {
              if (change.type == IkaTools.Constants.BuildingEventType.UPGRADE_COMPLETE) {
                showDesktopNotification(
                    'http://' + IkaTools.View.getDomain() + '/' + 
                        IkaTools.Constants.BuildingData[change.building.getType()].icon,
                    localizer.localize('alerts','building_upgrade_complete'),
                    localizer.localize('alerts','building_upgrade_complete_text').format2(
                        { 
                          building: localizer.localize('buildings', change.building.getType()),
                          city: change.city.getName(),
                          level: IkaTools.Intl.formatInteger(change.building.getLevel())
                        }));
              }
            });
          });
    }
    
    var missionAlerts = {
      'transport:loading': transportMissionLoaded_Desktop.isEnabled(),
      'transport:en_route': transportMissionArrived_Desktop.isEnabled(),
      'transport:returning': transportMissionReturned_Desktop.isEnabled(),
      'deployarmy:loading': deployArmyLoaded_Desktop.isEnabled(),
      'deployarmy:en_route': deployArmyArrived_Desktop.isEnabled(),
      'deployarmy:returning': deployArmyReturned_Desktop.isEnabled(),
      'deploynavy:loading': false,
      'deploynavy:en_route': deployNavyArrived_Desktop.isEnabled(),
      'deploynavy:returning': deployNavyReturned_Desktop.isEnabled(),
      'plunder:loading': pillageLoaded_Desktop.isEnabled(),
      'plunder:en_route': pillageArrived_Desktop.isEnabled(),
      'plunder:returning': pillageReturned_Desktop.isEnabled(),
    }
    
    IkaTools.EmpireData.registerMovementsChangedHandler(function alertMissions(changes) {
      $.each(changes, function forEachMissionChange(index, change) {
        if (change.type == IkaTools.Constants.Movements.EventType.STAGE_CHANGED || 
            change.type == IkaTools.Constants.Movements.EventType.COMPLETED) {
          var mission = change.movement.getMission();
          var stage = change.previousStage;
          var cityName = IkaTools.Intl.localizer.localize('formatting','unknown');
          if (stage == IkaTools.Constants.Movements.Stage.EN_ROUTE) {
            var city = change.movement.getTargetCity();
            if (city) {
              cityName = city.getName();
            }
          } else {
            var city = change.movement.getOriginCity();
            if (city) {
              cityName = city.getName();
            }
          }
          if (missionAlerts[mission + ':' + stage]) {
            showDesktopNotification(
              'http://' + IkaTools.View.getDomain() + '/' + 
                  IkaTools.Constants.Movements.MissionData[mission].icon,
              localizer.localize('alerts','mission_update'),
              localizer.localize('alerts', stage).format2({
                type: localizer.localize('alerts', mission),
                city: cityName,
              }));
          }
        }
      });
    });

/*    var underAttack = $('#advMilitary a').eq(0).hasClass('normalalert');
    console.log("Under attack at start: ", underAttack, $('#advMilitary a').eq(0));
    var lastMovementUpdateTime = 0;
    var parsedIgnoredHostileMissions = JSON.parse(ignoredHostileMissions.getValue());
    
    IkaTools.View.registerIkariamAjaxResponseCallback(
      function enhancedMilitaryAdvisor(response) {
        IkaTools.Utils.iterateIkariamAjaxResponse(response, function(index, name, data) {
          if (name == IkaTools.Constants.IkariamAjaxResponseType.UPDATE_GLOBAL_DATA) {
            //console.log('DATA:::::', data['headerData']['advisors']['military']);
            if (data.headerData.advisors.military.cssclass.indexOf('normalalert') >= 0) {
              //console.log('Under attack');
              if (!underAttack) {
                showDesktopNotification('http://' + document.domain + '/skin/layout/advisors/general_alert.png', 
                    'Under attack', 'New attack detected', true);
                underAttack = true;
              } else {
                function onMovementUpdate(response) {
                  var movements = IkaTools.EmpireData.getCivilizationData().getMovements();
                  var foundUnignoredHostile = false;

                  $.each(movements, function(index, movement) {
                    //console.log('Movement:', movement, parsedIgnoredHostileMissions.indexOf(movement.getId()));
                    if (movement.isHostile() && parsedIgnoredHostileMissions.indexOf(movement.getId()) < 0) {
                      foundUnignoredHostile = true;
                    }
                  });
                  if (foundUnignoredHostile) {
                    showDesktopNotification('http://' + document.domain + '/skin/layout/advisors/general_alert.png', 
                        'Under attack 2', 'New attack detected 2', true);
                  } else {
                    //console.log('Only normal attacks');
                    var advMilitaryNode = $('#advMilitary a').eq(0);
                    advMilitaryNode.removeClass('normalalert');
                    advMilitaryNode.addClass('probablysafealert');
                  }
                }
                
                IkaTools.EmpireData.updateMovements(onMovementUpdate);
              }
            } else {
              underAttack = false;
            }
          }
        });
      }, true);*/
    GM_addStyle('#advisors #advMilitary a.probablysafealert { background-image: url(http://www.clker.com/cliparts/3/7/6/d/1256186461796715642question-mark-icon.svg); background-size: 90px 90px; background-repeat:no-repeat;}');
  }
  
  function configureLocalization() {
    var language = localizedLanguage.getValue();
    if (!language) {
      var hostParts = document.location.host.split('\.');
      language = hostParts[hostParts.length - 1];
      if (language == "com" && hostParts.length == 4) {
        //for example: http://s1.en.ikariam.com
        language = hostParts[1];
      }
          
      if ((language == 'com') || (language == 'org') || (language == 'net')) {
        language = 'en';
      }
      if ((language == 've') || (language == 'mx') || (language == 'ar') ||
          (language == 'co') || (language == 'cl')) {
        language = 'es';
      }
    }
    
    if (language) {
      localizer.setPreferredLanguage(language);
      IkaTools.Intl.localizer.setPreferredLanguage(language);
    }
  }

  function initPirating() {
  }
  
  function init() {
    configureLocalization();
    
    IkaTools.Logging.setAndSaveOptionsFromPageAnchor();
    
    addStyles();
    
    overviewTablesReady = overviewTables();
    
    $(document).ready(function() {
      var readyAction = IkaTools.Logging.debuggable(
        {label: "Imperator.documentReady", group: true, alwaysTime: true, swallowException: true}, 
        function imperatorDocumentReady() {
          registerLoggingEventHandlers();
          initTweaks();
          initAlerts();
          initPirating();
          IkaTools.initialize();
          overviewTablesReady();
          addSettingsLink();
        });

      if (IkaTools.Utils.isChrome()) {
        // In Chrome sometimes we randomly execute before the ikariam "on-ready" scripts
        // which won't work because the stuff IkaTools.init needs will not be in the 
        // javascript objects.  Move this setup to the end of the line.
        setTimeout(readyAction, 500);
      } else {
        readyAction();
      }
    });
  }
  
  return {
    init: init,
  }
}();

IkaTools.Logging.debuggable( {label: "Imperator.init", group: true, alwaysTime: true, swallowException: true}, 
                            Imperator.init)();

//IkaTools.EmpireData.resetData();
unsafeWindow.IkaTools = IkaTools;
/*unsafeWindow.realConsole = console;
$(document).ready(function() {
  //unsafeWindow.console = console;
});
//unsafeWindow.$ = $;*/
