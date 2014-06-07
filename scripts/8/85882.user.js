// ==UserScript==
// @name           Persian Imperion - ایمپریون فارسی By ImperionForum.Com - V1.00 
// @namespace      edited by Morteza  - ImperionForum.Com
// @description    This Script Only For Persian User , translate English To Persian . Morteza [ImperionForum.com Admin] & SHAHAB(شهاب)
// @version        1.00
// @include        http://*.imperion.*/
// @include        http://u1.imperion.org/*
// @include        http://speed.imperion.org/*
// @include        http://u1.imperion.net/*
// ==/UserScript==
//Styles
var cssStyle = "";
cssStyle += "body{font-family:tahoma;}"; 
cssStyle += "h1{font-family:tahoma;font-size:190%;}"; 
cssStyle += ".p1 label{float:right;}"; 
cssStyle += "#ltbw0{right:284px;}"; 
GM_addStyle(cssStyle);


var strings = {

//"" : "",



//Terran buildings ساختمان ترن

//Resourcesمنابع
"Metal mine" : "(معدن متال (آهن",
"The metal mine produces metal. With each upgrade of the metal mine, metal production increases." : "در معدن آهن ، آهن تولید میشود . با ارتقاء هر سطح این معدن به تولید آهن افزوده میشود",
"Crystal mine" : "معدن کریستال",
"The crystal mine produces crystal. With each upgrade of the crystal mine, crystal production increases." : "در معدن کریستال ، کریستال تولید میشود . با ارتقاء هر سطح این معدن به تولید کریستال افزوده میشود",
"Deuterium rig" : "معدن دتریوم",
"The deuterium rig distills the very rare isotope deuterium from water. With each upgrade of the deuterium rig, production of deuterium increases." : "معدن دتریوم مقطر شده ی آب سنگین می باشد ، با ارتقاء هر سطح معدن دتریوم به تولیدات دتریوم افزوده میشود",
"Furnace" : "ذوب آهن",
"The furnace increases metal production by 5% per level." : "با ارتقاء هر سطح ذوب آهن 5% به میزان تولید کل متال سیاره شما افزوده خواهد شد",
"Crystal grinder" : "کریستال تراشی",
"The crystal worker increases crystal production by 5% per level." : "با ارتقاء هر سطح کریستال تراشی 5% به میزان تولید کل کریستال سیاره شما افزوده خواهد شد",
"The crystal grinder increases crystal production by 5% per level." : "با ارتقاء هر سطح کریستال تراشی 5% به میزان تولید کل کریستال سیاره شما افزوده خواهد شد",
"The crystal mill increases crystal production by 5% per level." : "با ارتقاء هر سطح کریستال تراشی 5% به میزان تولید کل کریستال سیاره شما افزوده خواهد شد",
"Deuterium filter" : "تصفیه خانه دتریوم",
"The deuterium filter increases deuterium production by 5% per level." : "با ارتقاء هر سطح تصفیه خانه دتریوم 5% به میزان تولید کل دتریوم - تتریوم سیاره شما افزوده خواهد شد",
"The deuterium synthesizer increases deuterium production by 5% per level." :"با ارتقاء هر سطح تصفیه خانه دتریوم 5% به میزان تولید کل دتریوم - تتریوم سیاره شما افزوده خواهد شد ",


//Power plantsنیروگاه ها

"Solar power plant" : "نیروگاه خورشیدی",
"Solar farm" : "نیروگاه خورشیدی",
"The solar farm generates energy from the light of the sun. On desert planets, solar farms are especially efficient." : "این ساختمان توسط نور خورشید انرژی ایجاد میکند",
"The solar power plant generates energy from the light of the sun. On desert planets, solar power plants are especially efficient." : "این ساختمان توسط نور خورشید انرژی ایجاد میکند",
"Wind farm" : "نیروگاه بادی",
"The wind farm generates energy from wind. Ice planets are subject to especially strong winds, which leads to an increase in energy production." : "این ساختمان توسط باد انرژی تولید می کند . سیارات یخی در معرض باد شدیدی هستند و از این ساختمان میزان انرژی بیشتر خواهد بود.",
"Hydropower plant" : "نیروگاه برق آبی",
"Hydro power plant" : "نیروگاه برق آبی",
"The hydropower plant generates energy from flowing water. Aquatic planets with their large amount of precipitation are especially suited for hydropower plants." : "این نیروگاه از آبهای روان انرژی و برق تولید می کند ، برای سیاره های آبی توصیه میشود .",
"Fusion power plant" : "نیروگاه فیوژنی",
"The fusion power plant generates energy from the fusion of deuterium to helium. With each upgrade, the fusion power plant increases its deuterium capacity." : "این نیروگاه از همجوشی دتریوم و هلیوم برق تولید می کند ، به این ترتیب کـه از میزان تولید دتریوم شما کم شده و تبدیل به انرژی میشود، چقدر سطح ساختمان بیشتر باشد از این همجوشی مقدار انرژی بیشتری استخراج میشودهر ",
"The Titan fusion power plant generates energy from the fusion of tritium to helium. With each upgrade, the fusion power plant increases its tritium capacity." : "این نیروگاه برای تیتان ها ، تتریوم و هلیوم را با همجوشی تبدیل به انرژی می کند. هرچقدر سطح ساختمان بیشتر باشد از این همجوشی مقدار انرژی بیشتری استخراج میشود.",
"AEC" : "AEC نیروگاه",
"This monument is thought to be the relic of an alien civilization. The AEC (Alien Energy Chamber) acts as an initial source of energy for each home world." : "این نیروگاه بسیار مهم ، کـه در سیاره مرکزی هر اکانت ساخته شده است ، انرژی فرازمینی با قدرت بالا ایجاد می کند ، این نیروگاه را می توان به عنوان اولین منبع دسترسی به انرژی استفاده کرد.",


//Stockyardsانبار

"Metal stockyard" : "انبار متال",
"The metal stockyard stocks metal. Each upgrade of the stockyard increases the storage capacity for metal." : "در اینجا متال (آهن) ذخیره میشود ، با ارتقاء هر سطح میزان ظرفیت انبار بیشتر میشود.",
"Crystal stockyard" : "انبار کریستال",
"The crystal stockyard stocks crystal. Each upgrade of the stockyard increases the storage capacity for crystal." : "در اینجا کریستال ذخیره میشود ، با ارتقاء هر سطح میزان ظرفیت انبار بیشتر میشود.",
"Deuterium stockyard" : "انبار دتریوم",
"The deuterium stockyard stocks deuterium. Each upgrade of the stockyard increases the deuterium stockyard capacity." : "در اینجا دتـریوم ذخیره میشود ، با ارتقاء هر سطح میزان ظرفیت انبار بیشتر میشود.",


//Military buildingsساختمان های جنگی

"Shipyard" : "کارخانه ساخت جنگده های نظامی",
"Ship yard" : "کارخانه ساخت جنگده های نظامی",
"The ship yard serves to build military vessels. Each upgrade decreases construction time for ships." : "در اين ساختمان نيرو هاي نظامي ساخته مي شوند. با ارتقاي اين ساختمان زمان ساخت كاهش مي يابد.",
"Arms factory" : "کارخانه اسلحه سازی",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.) " : "در این ساختمان ، پدافند ها و سیستم های دفاعی ساخته میشود. بعد از هر حمله تعدادي از اين نيرو ها با توجه به سطح این کارخانه به صورت اتوماتيك تعمير مي شوند. تعداد نيرو هايي كه تعمير مي شوند بين 30% تا 80% كل تعداد مي باشد",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.)" : "در این ساختمان ، پدافند ها و سیستم های دفاعی ساخته میشود. بعد از هر حمله تعدادي از اين نيرو ها با توجه به سطح این کارخانه به صورت اتوماتيك تعمير مي شوند. تعداد نيرو هايي كه تعمير مي شوند بين 30% تا 80% كل تعداد مي باشد",
"Rocket silo" : "سیلوی موشک",
"The rocket silo builds and stores defense and attack missiles. Each upgrade increases storage capacity for missiles and decreases missile construction time." : "در اين ساختمان موشك هاي تدافعي و تهاجمي ساخته و انبار مي شوند. با هر ارتقا ظرفيت ذخيره ي موشك ها افزايش مي يابد. موشك هاي تهاجمي سيستم هاي دفاعي دشمن را نابود مي مي كنند. طوري كه ديگر تعمير نمي شوند. موشك هاي دفاعي مي توانند موشك هاي تهاجمي دشمن را قبل از رسيدن به سياره نابود كنند.",
"Fleet base" : "پایگاه ناوگان",
"The fleet base provides an overview of all fleets deployed, arriving and present. From here, all fleet movements are governed." : "تمام نيرو ها را مي توان از اين ساختمان كنترل كرد و حمله ها نيز از اينجا صورت مي گيرند.",

"Impulse Scanner" : "کاوشگر ماهواره ای",
"Impulse scanner" : "کاوشگر ماهواره ای",
"The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 10 fields." :"اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگهاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد. با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است",
"The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 20 fields." :"اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگهاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد. با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است",
"Hangar" : "پناهگاه نیروها",
"The hangar allows part of the fleet to be hidden and thus safe from possible attacks. Each upgrade of the hangar allows you to protect more ships." : "در اين ساختمان مي توان نيرو ها را مخفي كرد تا از حمله ها در امان باشند. این نیروها در دفاع حمله نمی کنند.",



//Civilian buildingsساختمان های غیر نظامی 

"Research facility" : "مرکز پژوهش و تحقیقات",
"The research facility serves to discover knowledge. Each upgrade of the building increases the generation speed of research points and thus quickens research." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",
"Embassy" : "سفارت خانه",
"The embassy is necessary to join leagues, or to found your own once the building reaches level 3. An embassy also protects you from invasions!" : "سفارت خانه براي پيوستن به ليگ ها يا بنا نهادن يك ليگ لازم است. برای ساخت لیگ باید سفارت خانه سطح 3 یا بیشتر داشته باشید . همچنين سفارت سياره را در برابر تصرف دشمن محافظت مي كند. تا زماني كه يك سفارت در سياره اي باشد نمي توان آن را تصرف كرد.",
"Building yard" : "ساختمان اصلی",
"The building yard decreases construction time for buildings. At level 10, it also harbors the function to pull buildings down." : "اين ساختمان زمان ساخت ساختمان هاي ديگر را كاهش مي دهد. در سطح 10 شما مي توانيد ساختمان هايي كه ديگر از آن ها استفاده نمي كنيد را تخريب كنيد. اين ساختمان براي بيشتر ساختمان هاي ديگر پيش نياز است.",

"Recycling yard" : "ساختمان بازیافت",
"The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris." : "با ساخت اين ساختمان مي توانيد نيرو هايي كه از آن ها استفاده نمي كنيد را بازيافت كنيد و به منابع تبديل كنيد. همچنين اين ساختمان به طور اتوماتيك نيرو هايي كه در جنگ نابود شده اند و ساختمان هايي كه خراب مي كنيد را بازيافت مي كند.",
"Resource cache" : "مخفیگاه منابع",
"The resource cache protects a certain amount of the planet's resources from being raided." : "با ساختن این مخفيگاه مي توان مقداري از منابع را مخفي كرد تا از غارت دشمن در امان باشد.",
"Trade center" : "مرکز تجارت",
"The trade center serves to send out resources and to publish and accept trade offers. With each upgrade of the trade center, more traders become available." : "با اين ساختمان مي توان منابع را توسط بازرگانان منتقل كرد يا منابع را براي تجارت در بازار قرار داد. با ارتقاي اين ساختمان تعداد بازرگانان افزايش مي يابد.",
"Colonization Center" : "مرکز استعمار",
"Colonization center" : "مرکز استعمار",
"The colonization center allows you to build drop ships to colonize and invade other planets." : "در مرکز استعمار شما می توانید فضاپیمای مهاجر بسازید که برای گرفتن سیاره های دیگر استفاده میشود.",
"Civilian shipyard" : "کارخانه ساخت فضاپیماهای غیرنظامی",
"The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships." : "در اين ساختمان نيرو هاي غير نظامي ساخته مي شوند.با ارتقاي اين ساختمان زمان ساخت نيرو ها كاهش مي يابد.",
"کارخانه ربات سازی" : "Robot factory（機器人工廠）",
"The robot factory decreases construction time for ships, missiles and defense systems." : "اين ساختمان زمان ساخت تمام نيرو ها، موشك ها و سيستم هاي دفاعي را كاهش مي دهد.",
"The robot factory decreases construction time for ships and defense systems." : "اين ساختمان زمان ساخت تمام نيرو ها، موشك ها و سيستم هاي دفاعي را كاهش مي دهد.",


//Titan buildings（ساختمان تیتان）



//Resourcesمنابع

"Tritium rigs" : "چاه تريتيوم",
"Tritium filter" : "تصفیه خانه تریتیوم",
"The tritium synthesizer increases tritium production by 5%." : "با ارتقاء هر سطح تصفیه خانه تریتیوم 5% به میزان تولید کل تریتیوم - تتریوم سیاره شما افزوده خواهد شد",


//Stockyards（انبار）

"Metal stockyard" : "انبار متال",
"Crystal stockyard" : "انبار کریستال",
"Tritium stockyard" : "انبار تريتيوم",
"The tritium stockyard stocks tritium. Each upgrade of the stockyard increases the tritium stockyard capacity." : "در اینجا تريتيوم ذخیره میشود ، با ارتقاء هر سطح میزان ظرفیت انبار بیشتر میشود.",
"Subspace cache" : "انبار فرعی",
"The subspace cache in theory allows unlimited storage of the resources metal, crystal and tritium, depending on the amount of available energy." : "در انبار فرعی می توانید نامحدود از هر منبع ذخیره داشته باشید.",
"Energy accumulator" : "مخزن انرژی",
"The energy accumulator stores unneeded energy and emits it as needed. It can also transform energy into resources. With each upgrade of the energy accumulator, the energy storage capacity increases." : "در اين ساختمان مي توان انرژي را ذخيره كرد و در مواقع لزوم از آن استفاده كرد. همچنين با استفاده از اين ساختمان مي توان انرژي را با نسبتي خاص به منابع تبديل كرد. با ارتقاي اين ساختمان ظرفيت انرژي آن بيشتر مي شود.",

//Military buildings（ساختمان های نظامی）

"Shield generator" : "سپر محافظ",
"The shield generator generates a planetary protective shield surrounding the entire planet. As long as the shield lasts, the planet is safe from hostile fleets and missiles." : "اين ساختمان يك پوشش محافظ در اطراف سياره بوجود مي آورد. نيرو ها و موشك هاي دشمن بايد اول اين سپر محافظ را از بين  ببرند و سپس با نيرو هاي روي سياره مواجه شوند. با ارتقاي اين ساختمان قدرت اين سپر دفاعي بيشتر مي شود.",
"Scan link system" : "سیستم کاوشگر",
"The Titan Scan Link System serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Scan Link System, the scan radius increases by 1 field, the maximum range is 10 fields." : "اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگ هاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد.با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است.",
"Jammer" : "ساختمان ایجاد اختلال",
"The jammer interferes with signals emitted by espionage units. According to your wishes, you can adjust whether the amount of resources, the number of fleets and the levels of your buildings appear higher or lower than they really are." : "با ساخت اين ساختمان نيرو هاي جاسوسي دشمن به اشتباه مي افتند و گزارش اشتباه مي دهند. با ارتقاي اين ساختمان ميزان خطاي نيرو هاي جاسوسي دشمن بيشتر مي شود. ",
"Transportal" : "ساختمان حمل و نقل آنی",
"The transportal allows you to transport ships between two portals. Each upgrade of the transportal allows larger types of vessel to jump through." : "نيرو هاي خودي مي توانند با استفاده از اين ساختمان بصورت آني بين دو سياره جابجا شوند. (در هر دو سياره بايد Transportal وجود داشته باشد.) با ارتقاي اين ساختمان انرژي مصرفي آن كمتر مي شود.",
"Stealth generator" : "پناهگاه نیروها",
"The stealth generator allows you to cloak a part of your fleet and protect it from possible fights. With each upgrade of the stealth generator you can hide more ships." : "در اين ساختمان مي توان نيرو ها را مخفي كرد تا از حمله ها در امان باشند.نيرو هايي كه در پناهگاه هستند در دفاع شركت نمي كنند.با هر ارتقا ظرفيت بيشتر مي شود. ",
"Dimensional modulator" : "منتقل کننده سیاره",


//Civilian buildings（غیرنظامی）

"Research lab" : "مرکز پژوهش و تحقیقات",
"Research labs serve to research new science - the key to new technology and successful expansion. All laboratories are connected and work together; with each upgrade, these facilities increase their speed in generating research points." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",
"Teleporter" : "مرکز تجارت",
"Teleporting resources is an exclusively Titan technology. They use the teleporter for trade and transportation. Goods appear at their target location within seconds. After that, the energy cells need to recharge." : "از اين ساختمان براي انتقال منابع استفاده مي شود. منابع در عرض چند لحظه در مقصد ظاهر مي شوند. سپس سلول هاي انرژي بايد شارژ شوند.توجه: وقتي شما با تله پورتر منابع مي فرستيد 20% منابع از بين مي روند. براي اين كه منابع كمتري هدر روند بايد از مركز تحقيقات تله پورتر را ارتقا دهيد.",
"Robot factory" : "کارخانه روبات سازی",
"Resource cache" : "مخفیگاه منابع",
"Transmitter" : "مرکز تامین انرژی",
"The transmitter is responsible for supplying energy to the Titan fleet. All transmitters send to a common energy pool, which can be used by all ships belonging to a single player, regardless of their actual location." : "اين ساختمان انرژي لازم براي نيرو ها را تامين مي كند.",


//Xen buildings（ژن）


//Power plants（نیروگاه）

"Photosynthesis power plant" : "نیروگاه فتوسنتزی",
"The photosynthesis power plant uses biochemical processes to generate energy from the light of the sun. On desert planets, photosynthesis power plants are especially efficient." : "نیروگاه فتوسنتزی با استفاده از فرآیند بیوشیمیایی برای تولید انرژی از نور خورشید می باشد.سیارات کویری مناسب برای این نیروگاهند",
"Thermal power plant" : "Thermal power plant（火力發電廠）",
"The thermal power plant generates energy from the heat of the lower planetary crust. On volcanic planets, thermal power plants are especially efficient." : "نیروگاه حرارتی از حرارت زیر پوسته ی سیاره برای تولید انرژی استفاده می کند.در سیاره های آتشفشانــی استفاده از این نیروگاه مناسبتر است.",


//Stockyards（انبارها）

"General stockyard" : "انبار کلی",
"The general stockyard stocks metal and crystal. Each upgrade of the stockyard increases the storage capacity for metal and crystal." : "انبار عمومی مخصوص متال و کریستال می باشد ، با ارتقاء هر سطح این انبار ظرفیت ذخیره سازی کریستال و متال افزایش داده خواهد شد.",


//Military buildings（نظامی）

"Bioreactor" : "راکتور زیستی",
"Inside the bioreactor, Zeks, the base for all units, hatch from their eggs. Each upgrade of the bioreactor decreases the time until further Zek eggs hatch." : "زک ها در داخل بیو راکتورمتولد میشوند ، با ارتقای این ساختمان زمان تولید زک ها کاهش می یابد.",
"Small ship yard" : "کارخانه ساخت نیروهای سبک",
"The small ship yard serves to produce both military and civilian light units." : "در اين ساختمان نيرو هاي سبك نظامي و غير نظامي ساخته مي شوند.با ارتقاي ساختمان زمان ساخت اين نيرو ها كاهش مي يابد. ",
"Large ship yard" : "کارخانه ساخت نیروهای سنگین",
"The large ship yard serves to produce both military and civilian heavy units." : "در اين ساختمان نيرو هاي سنگين نظامي و غير نظامي ساخته مي شوند. با ارتقای ساختمان ، مدت زمان ساخت نیروها کاهش می باید.",
"Zek cave" : "پناهگاه زک",
"The Zek cave protects Zeks from attacks and the Terran bionic blast. As long as there is still room inside the Zek cave, Zeks will automatically congregate there." : "این ساختمان از زک ها در برابر حملات محافظت می کند.",
"Brain" : "مرکز کنترل زکن ها",
"The Brain controls your Zekkon spies. With each upgrade of the building, more Zekkon fleets can be controlled." : "مرکز کنترل با زکُن ها در ارتباط است و آنها را در جاسوسي ها هدايت مي كند.با هر ارتقا تعداد زکُن هايي كه مرکز کنترل مي تواند تحت كنترل داشته باشد افزايش مي يابد. ",


//Civilian buildings（غیرنظامی）

"Development center" : "مرکز پژوهش و تحقیقات",
"The development center serves to discover knowledge. Each upgrade of the building increases the generation speed of resarch points and thus quickens research." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",

//all（همه）

//All
"Building" : "ساختمان :",
"Duration:" : "مدت زمان ::",
"Finished:" : "اتمام:",
"Details" : "جزئیات",
"Selection" : "گزینه ها",
"Rank" : "امتیاز :",
"Species" : "نژاد",
"League" : "لیگ",
"Planets" : "سیاره ها",
"Points" : "امتیاز",
"Age" : "سن :",
"Sex" : "جنسيت :",
"Location" : "موقعيت :",
"Planet" : "سياره",
"Coordinates" : "مختصات",
"per hour" : "تولید در هر ساعت",
"Player" : "بازیکن :",
"Leagues" : "لیگها :",
"Def" : "دفاع",
"Fights" : "حمله عادی",
"Support" : "</a><a href='http://ImperionForum.com'>پشتیبانی</a>",
"Answers" : "</a><a href='http://ImperionForum.com'>سوال و جواب</a>",
"Rules" : "</a><a href='http://imperionforum.com/index.php?/topic/86-%D9%82%D9%88%D8%A7%D9%86%DB%8C%D9%86-im/'>پشتیبانی</a>",
"Board" : "</a><a href='http://imperionforum.com/'>اسکریپت و فارسی توسط مرتضی و شهاب  - فروم</a>",
"Deploy fleet" : "ارسال نیرو",
"Combat simulator" : "شبیه ساز نبرد",
"Annexation" : "مستعمره ها",
"Fleets on this planet" : "نیروهای این سیاره",
"Fetch home" : "برگشت همه به خانه",
"Fetch a part home" : "برگشت تعدادی به خانه",
"Annexation information" : "اطلاعات استعمار",
"Owner:" : "مالک:",
"Planetary information" : "اطلاعات کلی سیاره",
"Inhabitants:" : "تعداد سکنه:",
"Resource deposits:" : "توضیحات منابع",
"Metal fields:" : "تعداد معدن متال:",
"Crystal fields:" : "تعداد معدن کریستال:",
"Deuterium fields:" : "تعداد معدن دتریوم:",

"Climatic efficiency" : "میزان سودمندی",
"Solar power:" : "نیروی خورشیدی:",
"Wind power:" : "نیروی بادی:",
"Hydropower:" : "نیروی برق آبی:",
"Thermal power:" : "نیروی حرارتی:",
"Production" : "تولید",
"High" : "بالا",
"Medium" : "متوسط",
"Low" : "پائین",
"per hour" : "در ساعت",
"Reports:" : "کزارش ها:",
"League:" : "لیگ:",
"Direct trade" : "تجارت مستقیم",
"buy" : "خرید",
"sell" : "فروش",
"send" : "ارسال",
"Flight duration" : "مدت زمان پرواز",
"Quick selection" : "انتخاب سریع",
"Fly twice" : "دوبار پرواز",
"Galaxy" : "کهکشان",
"Metal" : "متال",
"Crystal" : "کریستال",
"Deuterium" : "دتریوم",
"Tritium" : "تتریوم",
"Offer" : "پرداخت",
"Search" : "جستجو",
"Time of Transport" : "مدت زمان انتقال",
"Outgoing merchants" : "بازرگانان در حال رفت",
"Incoming merchants" : "بازرگانان در حال آمدن",
"Returning merchants" : "بازرگانان درحال برگشت",
"Number" : "تعداد",
"To" : "به",
"Resources" : "منابع",
"Offer:" : "پرداخت:",
"Search:" : "جستجو:",
"Maximum transport time:" : "حداکثر مدت تجارت:",
"Offer visible only to my league:" : "قابل نمایش فقط برای اعضای لیگم:",
"Place" : "گماردن پیشنهاد",
"unimportant" : "مهم نیست",
"1 hour" : "یک ساعت",
"'Engineering' is conducing to build up your planet's infrastructure." : " پژوهش درمورد دانش  زیرساخت و ارتقای سازه های سیاره از این قسمت انجام میگیرد.",
"'Planetary defense' is conducing to develop and build defensive weapon systems." : "پژوهش در مورد دانش ساخت پدافندهای دفاعی در این قسمت انجام میگیرد.",
"'Military space flight' allows you to build warships and enhance their attributes." : "پژوهش در مورد دانش ساخت نیروهای نظامی سیاره در این قسمت انجام میگیرد.",
"'Civilian space flight' allows you to build civilian space ships and enhance their attributes." : "پژوهش در مورد دانش ساخت فضاپیماهای غیرنظامی سیاره در این قسمت انجام میگیرد.",
"'Energy technology' enables you to develop new power plants and raise their efficiency." : "پژوهش در مورد دانش تولید انرژی سیاره و افزایش بهره وری از آنها در این قسمت انجام میگیرد.",




   





"Miscelleaneous" : "دیگر",
"Archive" : "ذخیره",
"Subject:" : "موضوع",
"Date" : "تاریخ",
"Inbox" : "صندوق پیام",
"Write message" : "نوشتن پیام جدید",
"Sent box" : "پیام های ارسال شده",
"Sender:" : "ارسال کننده :",
"Time" : "زمان",
"Research" : "تحقیق",
"Level" : "سطح",
"Cost" : "هزینه",
"Action" : "عملیات",
"Welcome " : "خوش آمدید",
"Logout" : "خروج-Imperionforum.com کاری از",
"Plus" : "ImperionForum.Com پلاس فقط با",
"Production" : "ميزان تولیدات",
"© 2009 Travian Games GmbH" : "© 2009 Travian Games GmbH",
//"Terms and conditions" : "ٍFarsi By Shahab & Morteza Terms and conditions",
"Production of annexed planets" : "تولید سیاره های مستعمره",
"Own Planets" : "فهرست سياره ها",
"Consumption" : "ميزان مصرفی",
"Yield" : "بازده مفید",
"UPGRADE TO" : "ارتقاء به سطح :",
"Capacity" : "ظرفیت",
"Full on" : "تکمیل در",
"at" : " در ",
"Stationed fleet on other planets" : " نیروهای مستفر در سیارات دیگر ",
"Level" : " سطح ",
"Production" : " تولید ",
"Total" : " مجموع ",
"Build" : "ساخت",
"Not available" : "غیرفعال",
"Overview" : "بررسی",
"Upgrade impossible: Insufficient resources. Resources sufficient on" : "ارتقاء به دلیل کمبود منابع ممکن نیست ، منابع کافی در :",
"Energy" : "انرژی",
"Energy consumption" : "مصرف انرژی",
"All" : "همه",




//pAjoohesh

"Engineering" : "مهندسی ",
"Building lots" : "جایگاه ساختمان",
"Building stability" : "دوام ساختمان",
"Geologic exploration" : "اکتشافات زمین شناسی",
"Storage capacity" : "ظرفیت ذخیره سازی",
"Teleportation" : "تله پورتر",

"Planetary Defense" : "ناوگان دفاعی سیارات",
"Repair quota" : " ظرفیت و قدرت تعمیر",
"Concealment capacity" : "ظرفیت پنهان سازی", 	
"Shield technology" : "فناوری سپر تیتان",

"Blueprint: Flak battery" : "ضد هوایی الکترومغناطیسی",
"Blueprint: Puls laser" : "ضدهوایی پالس لیزری",
"Blueprint: Gauss gun" : "اصلحه میدان مغناطیسی",
"Blueprint:Interval artillery" : "توپخانه دوربرد",
"Blueprint: Tachyon emitter" : "ضدهوای صاتع کننده نوری)",
"Blueprint: Interceptor Missile 1" : "موشک پرتاب شونده 1",
"Blueprint: Interceptor Missile 2" : "موشک پرتاب شونده 2",
"Blueprint: Bionic Missile" : " موشک بایونیکی",

"Blueprint: Sporok" : "توپخانه اسپوروک",
"Blueprint: Acidor" : "توپخانه اسیدی",
"Blueprint: Kalmanar" : "توپخانه گره ای",
"Blueprint: Zuikon" : "توپخانه تله ای",
"Blueprint: Paratec" : "توپخانه موج ساز",

"Blueprint: Injector" : "سیستم انژکتوری",
"Blueprint: Nanoblade" : "سیستم نانو",
"Blueprint: Boson accelerator" : "هیگز شتابدهنده",
"Blueprint: Masterblaster" : "انفجار انرژی",
"Blueprint: Disruptor" : "سیستم سیاه چاله",

"Military Space Flight" : "ناوگان های نظامی",
"Propulsion technology" : "فناوری سرعت نیروها",
"Fuel consumption" : "مصرف سوخت", 	
"Cargo capacity" : "ظرفیت حمل بار", 	
"Tank capacity" : "ظرفیت باک سوخت", 	

"Blueprint: Fighter" : "جنگنده",
"Blueprint: Battleship" : "فضاپیمای جنگی",
"Blueprint: Destroyer" : "ویرانگر",
"Blueprint: Heavy Cruiser" : "رزمناو سنگین",
"Blueprint: Pulsar" : "پولسار",
"Blueprint: Bomber" : "بمب افکن",
"Blueprint: Attack Missile 1" : "موشک تهاجمی 1",
"Blueprint: Attack Missile 2" : "موشك تهاجمي 2",
"Blueprint: Attack Missile 3" : "موشك تهاجمي 3",
"Blueprint: Attack Missile 4" : "موشك تهاجمي 4",
"Blueprint: Bionic Blast" : "انفجار بايونيكي",

"Blueprint: Xnair" : "ژن ایر",
"Blueprint: Mylon" : "مایلون",
"Blueprint: Maxtron" : "مکسترون",
"Blueprint: Mother ship" : "فضاپیمای مادر",
"Blueprint: Suikon" : "سوییکون",
"Blueprint: Macid" : "مسید",

"Blueprint: Scout" : "جنگنده",
"Blueprint: Delphi" : "جنگنده دلفی",
"Blueprint: Corsair" : "جنگنده ناشناس",
"Blueprint: Terminator" : "نابودگر",
"Blueprint: Carrier" : "جنگنده غول پیکر",
"Blueprint: Protektor" : "محافظ",
"Blueprint: Phoenix" : "بمب افکن",


"Civilian Space Flight" : "فضاپیماهای غیر نظامی",
"Recycling" : "بازیافت",
"Wormhole physics" : "سیاه چاله",
"Expansion studies" : "دانش گسترش",
"Trade" : "تجارت", 	
"Espionage" : "جاسوسی", 	

"Blueprint: Probe" : "جاسوس",
"Blueprint: Tanker" : "تانکر",
"Blueprint: Small transporter" : "حامل کوچک",
"Blueprint: Large Recycler" : "بازیافت گر بزرگ",
"Blueprint: Recycler" : "بازیافت گر",
"Blueprint: Drop ship" : "فضاپیمای مهاجر",

"Blueprint: Zek" : "زِک",
"Blueprint: Zekkon" : "زِکُن",
"Blueprint: Psikon" : "پسیکُن",
"Blueprint: Octopon" : "اکتپُن",

"Blueprint: Observer" : "جاسوس",
"Blueprint: Large transporter" : "حامل بزرگ",

"Energy technology" : "فناوری انرژی",
"AEC energy" : "AEC انرژی",    	
"Fusion power" : "انرژی فیوژنی",
"Solar power" : "انرژی خورشیدی",
"Hydropower" : "انرژی برق آبی",
"Wind power" : "انرژی باد",
"Thermal power" : "انرژی حرارتی",
"Qi-Unit Utilization" : "Qi واحد بهره برداری",






};


trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


var regexps = {};

//regexps["XXXX"] = "XXXX";

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

