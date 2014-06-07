// ==UserScript==
// @name           Persian Imperion 007 
// @namespace      Edited by Nima Kermani 
// @description    This Script Is Farsi Translation for Persian Users of Imperion Game 
// @version        0.9.5.001
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



//Terran buildings ساختمان هاي نژاد ترن

//Resourcesمنابع
"Metal mine" : "معدن آهن",
"The metal mine produces metal. With each upgrade of the metal mine, metal production increases." : "در معدن آهن ، آهن توليد ميشود . با ارتقاء هر سطح اين معدن به توليد آهن افزوده ميشود",
"Crystal mine" : "معدن کريستال",
"The crystal mine produces crystal. With each upgrade of the crystal mine, crystal production increases." : "در معدن کريستال ، کريستال توليد ميشود . با ارتقاء هر سطح اين معدن به توليد کريستال افزوده ميشود",
"Deuterium rig" : "معدن دتريوم",
"The deuterium rig distills the very rare isotope deuterium from water. With each upgrade of the deuterium rig, production of deuterium increases." : "معدن دتريوم تقطير شده ي آب سنگين مي باشد ، با ارتقاء هر سطح معدن دتريوم به توليدات سوخت افزوده ميشود",
"Furnace" : "ذوب آهن",
"The furnace increases metal production by 5% per level." : "با ارتقاء هر سطح ذوب آهن 5% به ميزان توليد کل متال سياره شما افزوده خواهد شد",
"Crystal grinder" : "کريستال تراشي",
"The crystal worker increases crystal production by 5% per level." : "با ارتقاء هر سطح کريستال تراشي 5% به ميزان توليد کل کريستال سياره شما افزوده خواهد شد",
"The crystal grinder increases crystal production by 5% per level." : "با ارتقاء هر سطح کريستال تراشي 5% به ميزان توليد کل کريستال سياره شما افزوده خواهد شد",
"The crystal mill increases crystal production by 5% per level." : "با ارتقاء هر سطح کريستال تراشي 5% به ميزان توليد کل کريستال سياره شما افزوده خواهد شد",
"Deuterium filter" : "تصفيه خانه دتريوم",
"The deuterium filter increases deuterium production by 5% per level." : "با ارتقاء هر سطح تصفيه خانه دتريوم 5% به ميزان توليد کل دتريوم - تتريوم سياره شما افزوده خواهد شد",
"The deuterium synthesizer increases deuterium production by 5% per level." :"با ارتقاء هر سطح تصفيه خانه دتريوم 5% به ميزان توليد کل سوخت سياره شما افزوده خواهد شد ",


//Power plantsنيروگاه ها

"Solar power plant" : "نيروگاه خورشيدي",
"Solar farm" : "نيروگاه خورشيدي",
"The solar farm generates energy from the light of the sun. On desert planets, solar farms are especially efficient." : "اين ساختمان توسط نور خورشيد انرژي ايجاد ميکند",
"The solar power plant generates energy from the light of the sun. On desert planets, solar power plants are especially efficient." : "اين ساختمان توسط نور خورشيد انرژي ايجاد ميکند",
"Wind farm" : "نيروگاه بادي",
"The wind farm generates energy from wind. Ice planets are subject to especially strong winds, which leads to an increase in energy production." : "اين ساختمان توسط باد انرژي توليد مي کند . سيارات يخي در معرض باد شديدي هستند و از اين ساختمان ميزان انرژي بيشتر خواهد بود.",
"Hydropower plant" : "نيروگاه برق آبي",
"Hydro power plant" : "نيروگاه برق آبي",
"The hydropower plant generates energy from flowing water. Aquatic planets with their large amount of precipitation are especially suited for hydropower plants." : "اين نيروگاه از آبهاي روان انرژي و برق توليد مي کند ، براي سياره هاي آبي توصيه ميشود .",
"Fusion power plant" : "نيروگاه فيوژني",
"The fusion power plant generates energy from the fusion of deuterium to helium. With each upgrade, the fusion power plant increases its deuterium capacity." : "اين نيروگاه از همجوشي دتريوم و هليوم برق توليد مي کند ، به اين ترتيب کـه از ميزان توليد دتريوم شما کم شده و تبديل به انرژي ميشود، چقدر سطح ساختمان بيشتر باشد از اين همجوشي مقدار انرژي بيشتري استخراج ميشودهر ",
"The Titan fusion power plant generates energy from the fusion of tritium to helium. With each upgrade, the fusion power plant increases its tritium capacity." : "اين نيروگاه براي تيتان ها ، تتريوم و هليوم را با همجوشي تبديل به انرژي مي کند. هرچقدر سطح ساختمان بيشتر باشد از اين همجوشي مقدار انرژي بيشتري استخراج ميشود.",
"AEC" : " نيروگاه انرژي",
"This monument is thought to be the relic of an alien civilization. The AEC (Alien Energy Chamber) acts as an initial source of energy for each home world." : "گمان مي رود که اين مقبره يک يادگاري از تمدن بيگانگان است ، انرژي فرازميني با قدرت بالا ايجاد مي کند ، اين نيروگاه را مي توان به عنوان اولين منبع دسترسي به انرژي استفاده کرد.",


//Stockyardsانبارها 

"Metal stockyard" : "انبار آهن",
"The metal stockyard stocks metal. Each upgrade of the stockyard increases the storage capacity for metal." : "در اينجا متال (آهن) ذخيره ميشود ، با ارتقاء هر سطح ميزان ظرفيت انبار بيشتر ميشود.",
"Crystal stockyard" : "انبار کريستال",
"The crystal stockyard stocks crystal. Each upgrade of the stockyard increases the storage capacity for crystal." : "در اينجا کريستال ذخيره ميشود ، با ارتقاء هر سطح ميزان ظرفيت انبار بيشتر ميشود.",
"Deuterium stockyard" : "انبار سوخت",
"The deuterium stockyard stocks deuterium. Each upgrade of the stockyard increases the deuterium stockyard capacity." : "در اينجا دتـريوم ذخيره ميشود ، با ارتقاء هر سطح ميزان ظرفيت انبار بيشتر ميشود.",


//Military buildingsساختمان هاي جنگي

"Shipyard" : "کارخانه سازنده جنگده هاي نظامي",
"Ship yard" : "کارخانه سازنده جنگده هاي نظامي",
"The ship yard serves to build military vessels. Each upgrade decreases construction time for ships." : "در اين ساختمان نيرو هاي نظامي ساخته مي شوند. با ارتقاي اين ساختمان زمان ساخت كاهش مي يابد.",
"Arms factory" : "کارخانه ساخت نيروهاي دفاعي",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.) " : "در اين ساختمان ، پدافند ها و سيستم هاي دفاعي ساخته ميشود. بعد از هر حمله تعدادي از اين نيرو ها با توجه به سطح اين کارخانه به صورت اتوماتيك تعمير مي شوند. تعداد نيرو هايي كه تعمير مي شوند بين 30% تا 80% كل تعداد مي باشد",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.)" : "در اين ساختمان ، پدافند ها و سيستم هاي دفاعي ساخته ميشود. بعد از هر حمله تعدادي از اين نيرو ها با توجه به سطح اين کارخانه به صورت اتوماتيك تعمير مي شوند. تعداد نيرو هايي كه تعمير مي شوند بين 30% تا 80% كل تعداد مي باشد",
"Rocket silo" : "محل انباشت موشک",
"The rocket silo builds and stores defense and attack missiles. Each upgrade increases storage capacity for missiles and decreases missile construction time." : "در اين ساختمان موشك هاي تدافعي و تهاجمي ساخته و انبار مي شوند. با هر ارتقا ظرفيت ذخيره ي موشك ها افزايش مي يابد. موشك هاي تهاجمي سيستم هاي دفاعي دشمن را نابود مي مي كنند. طوري كه ديگر تعمير نمي شوند. موشك هاي دفاعي مي توانند موشك هاي تهاجمي دشمن را قبل از رسيدن به سياره نابود كنند.",
"Fleet base" : "اردوگاه",
"The fleet base provides an overview of all fleets deployed, arriving and present. From here, all fleet movements are governed." : "تمام نيرو ها را مي توان از اين ساختمان كنترل كرد و حمله ها نيز از اينجا صورت مي گيرند.",

"Impulse Scanner" : "کاوشگر ماهواره اي",
"Impulse scanner" : "کاوشگر ماهواره اي",
"The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 10 fields." :"اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگهاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد. با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است",
"The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 20 fields." :"اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگهاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد. با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است",
"Hangar" : "پناهگاه نيروها",
"The hangar allows part of the fleet to be hidden and thus safe from possible attacks. Each upgrade of the hangar allows you to protect more ships." : "در اين ساختمان مي توان نيرو ها را مخفي كرد تا از حمله ها در امان باشند. اين نيروها در دفاع حمله نمي کنند.",



//Civilian buildingsساختمان هاي غير نظامي 

"Research facility" : "مرکز پژوهش و تحقيقات",
"The research facility serves to discover knowledge. Each upgrade of the building increases the generation speed of research points and thus quickens research." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",
"Embassy" : "سفارت خانه",
"The embassy is necessary to join leagues, or to found your own once the building reaches level 3. An embassy also protects you from invasions!" : "سفارت خانه براي پيوستن به ليگ ها يا بنا نهادن يك ليگ لازم است. براي ساخت ليگ بايد سفارت خانه سطح 3 يا بيشتر داشته باشيد . همچنين سفارت سياره را در برابر تصرف دشمن محافظت مي كند. تا زماني كه يك سفارت در سياره اي باشد نمي توان آن را تصرف كرد.",
"Building yard" : "ساختمان اصلي",
"The building yard decreases construction time for buildings. At level 10, it also harbors the function to pull buildings down." : "اين ساختمان زمان ساخت ساختمان هاي ديگر را كاهش مي دهد. در سطح 10 شما مي توانيد ساختمان هايي كه ديگر از آن ها استفاده نمي كنيد را تخريب كنيد. اين ساختمان براي بيشتر ساختمان هاي ديگر پيش نياز است.",

"Recycling yard" : "ساختمان بازيافت",
"The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris." : "با ساخت اين ساختمان مي توانيد نيرو هايي كه از آن ها استفاده نمي كنيد را بازيافت كنيد و به منابع تبديل كنيد. همچنين اين ساختمان به طور اتوماتيك نيرو هايي كه در جنگ نابود شده اند و ساختمان هايي كه خراب مي كنيد را بازيافت مي كند.",
"Resource cache" : "مخفيگاه منابع",
"The resource cache protects a certain amount of the planet's resources from being raided." : "با ساختن اين مخفيگاه مي توان مقداري از منابع را مخفي كرد تا از غارت دشمن در امان باشد.",
"Trade center" : "مرکز تجارت",
"The trade center serves to send out resources and to publish and accept trade offers. With each upgrade of the trade center, more traders become available." : "با اين ساختمان مي توان منابع را توسط بازرگانان منتقل كرد يا منابع را براي تجارت در بازار قرار داد. با ارتقاي اين ساختمان تعداد بازرگانان افزايش مي يابد.",
"Colonization Center" : "مرکز استعمار",
"Colonization center" : "مرکز استعمار",
"The colonization center allows you to build drop ships to colonize and invade other planets." : "در مرکز استعمار شما مي توانيد فضاپيماي مهاجر بسازيد که براي گرفتن سياره هاي ديگر استفاده ميشود.",
"Civilian shipyard" : "کارخانه ساخت فضاپيماهاي غيرنظامي",
"The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships." : "در اين ساختمان نيرو هاي غير نظامي ساخته مي شوند.با ارتقاي اين ساختمان زمان ساخت نيرو ها كاهش مي يابد.",
"کارخانه ربات سازي" : "Robot factory(?????)",
"The robot factory decreases construction time for ships, missiles and defense systems." : "اين ساختمان زمان ساخت تمام نيرو ها، موشك ها و سيستم هاي دفاعي را كاهش مي دهد.",
"The robot factory decreases construction time for ships and defense systems." : "اين ساختمان زمان ساخت تمام نيرو ها، موشك ها و سيستم هاي دفاعي را كاهش مي دهد.",


//Titan buildings(ساختمان هاي نژاد تيتان)



//Resourcesمنابع

"Tritium rigs" : "چاه تريتيوم",
"Tritium filter" : "تصفيه خانه تريتيوم",
"The tritium synthesizer increases tritium production by 5%." : "با ارتقاء هر سطح تصفيه خانه تريتيوم 5% به ميزان توليد کل تريتيوم - تتريوم سياره شما افزوده خواهد شد",


//Stockyards(انبارها)

"Metal stockyard" : "انبار متال",
"Crystal stockyard" : "انبار کريستال",
"Tritium stockyard" : "انبار تريتيوم",
"The tritium stockyard stocks tritium. Each upgrade of the stockyard increases the tritium stockyard capacity." : "در اينجا تريتيوم ذخيره ميشود ، با ارتقاء هر سطح ميزان ظرفيت انبار بيشتر ميشود.",
"Subspace cache" : "انبار فرعي",
"The subspace cache in theory allows unlimited storage of the resources metal, crystal and tritium, depending on the amount of available energy." : "در انبار فرعي مي توانيد نامحدود از هر منبع ذخيره داشته باشيد.",
"Energy accumulator" : "مخزن انرژي",
"The energy accumulator stores unneeded energy and emits it as needed. It can also transform energy into resources. With each upgrade of the energy accumulator, the energy storage capacity increases." : "در اين ساختمان مي توان انرژي را ذخيره كرد و در مواقع لزوم از آن استفاده كرد. همچنين با استفاده از اين ساختمان مي توان انرژي را با نسبتي خاص به منابع تبديل كرد. با ارتقاي اين ساختمان ظرفيت انرژي آن بيشتر مي شود.",

//Military buildings(ساختمان هاي نظامي)

"Shield generator" : "سپر محافظ",
"The shield generator generates a planetary protective shield surrounding the entire planet. As long as the shield lasts, the planet is safe from hostile fleets and missiles." : "اين ساختمان يك پوشش محافظ در اطراف سياره بوجود مي آورد. نيرو ها و موشك هاي دشمن بايد اول اين سپر محافظ را از بين  ببرند و سپس با نيرو هاي روي سياره مواجه شوند. با ارتقاي اين ساختمان قدرت اين سپر دفاعي بيشتر مي شود.",
"Scan link system" : "سيستم کاوشگر",
"The Titan Scan Link System serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Scan Link System, the scan radius increases by 1 field, the maximum range is 10 fields." : "اين ساختمان نيرو هايي كه در سياره ها يا شهاب سنگ هاي اطراف مستقر هستند را شناسايي مي كند و در نقشه نشان مي دهد.با ارتقاي ساختمان فاصله هاي دورتر اسكن مي شوند. حداكثر فاصله ي اسكن 20 فيلد در سطح 20 است.",
"Jammer" : "ساختمان ايجاد اختلال",
"The jammer interferes with signals emitted by espionage units. According to your wishes, you can adjust whether the amount of resources, the number of fleets and the levels of your buildings appear higher or lower than they really are." : "با ساخت اين ساختمان نيرو هاي جاسوسي دشمن به اشتباه مي افتند و گزارش اشتباه مي دهند. با ارتقاي اين ساختمان ميزان خطاي نيرو هاي جاسوسي دشمن بيشتر مي شود. ",
"Transportal" : "ساختمان حمل و نقل آني",
"The transportal allows you to transport ships between two portals. Each upgrade of the transportal allows larger types of vessel to jump through." : "نيرو هاي خودي مي توانند با استفاده از اين ساختمان بصورت آني بين دو سياره جابجا شوند. (در هر دو سياره بايد Transportal وجود داشته باشد.) با ارتقاي اين ساختمان انرژي مصرفي آن كمتر مي شود.",
"Stealth generator" : "پناهگاه نيروها",
"The stealth generator allows you to cloak a part of your fleet and protect it from possible fights. With each upgrade of the stealth generator you can hide more ships." : "در اين ساختمان مي توان نيرو ها را مخفي كرد تا از حمله ها در امان باشند.نيرو هايي كه در پناهگاه هستند در دفاع شركت نمي كنند.با هر ارتقا ظرفيت بيشتر مي شود. ",
"Dimensional modulator" : "منتقل کننده سياره",


//Civilian buildings(غيرنظامي)

"Research lab" : "مرکز پژوهش و تحقيقات",
"Research labs serve to research new science - the key to new technology and successful expansion. All laboratories are connected and work together; with each upgrade, these facilities increase their speed in generating research points." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",
"Teleporter" : "مرکز تجارت",
"Teleporting resources is an exclusively Titan technology. They use the teleporter for trade and transportation. Goods appear at their target location within seconds. After that, the energy cells need to recharge." : "از اين ساختمان براي انتقال منابع استفاده مي شود. منابع در عرض چند لحظه در مقصد ظاهر مي شوند. سپس سلول هاي انرژي بايد شارژ شوند.توجه: وقتي شما با تله پورتر منابع مي فرستيد 20% منابع از بين مي روند. براي اين كه منابع كمتري هدر روند بايد از مركز تحقيقات تله پورتر را ارتقا دهيد.",
"Robot factory" : "کارخانه روبات سازي",
"Resource cache" : "مخفيگاه منابع",
"Transmitter" : "مرکز تامين انرژي",
"The transmitter is responsible for supplying energy to the Titan fleet. All transmitters send to a common energy pool, which can be used by all ships belonging to a single player, regardless of their actual location." : "اين ساختمان انرژي لازم براي نيرو ها را تامين مي كند.",


//Xen buildingsساختمانهاي نژاد


//Power plantsنيروگاه ها

"Photosynthesis power plant" : "نيروگاه فتوسنتزي",
"The photosynthesis power plant uses biochemical processes to generate energy from the light of the sun. On desert planets, photosynthesis power plants are especially efficient." : "نيروگاه فتوسنتزي با استفاده از فرآيند بيوشيميايي براي توليد انرژي از نور خورشيد مي باشد.سيارات کويري مناسب براي اين نيروگاهند",
"Thermal power plant" : "Thermal power plant(?????)",
"The thermal power plant generates energy from the heat of the lower planetary crust. On volcanic planets, thermal power plants are especially efficient." : "نيروگاه حرارتي از حرارت زير پوسته ي سياره براي توليد انرژي استفاده مي کند.در سياره هاي آتشفشانــي استفاده از اين نيروگاه مناسبتر است.",


//Stockyardsانبارها

"General stockyard" : "انبار کلي",
"The general stockyard stocks metal and crystal. Each upgrade of the stockyard increases the storage capacity for metal and crystal." : "انبار عمومي مخصوص متال و کريستال مي باشد ، با ارتقاء هر سطح اين انبار ظرفيت ذخيره سازي کريستال و متال افزايش داده خواهد شد.",


//Military buildingsساختمان هاي نظامي

"Bioreactor" : "راکتور زيستي",
"Inside the bioreactor, Zeks, the base for all units, hatch from their eggs. Each upgrade of the bioreactor decreases the time until further Zek eggs hatch." : "زک ها در داخل اين رآکتورها متولد ميشوند ، با ارتقاي اين ساختمان زمان توليد زک ها کاهش مي يابد.",
"Small ship yard" : "کارخانه ساخت نيروهاي سبک",
"The small ship yard serves to produce both military and civilian light units." : "در اين ساختمان نيرو هاي سبك نظامي و غير نظامي ساخته مي شوند.با ارتقاي ساختمان زمان ساخت اين نيرو ها كاهش مي يابد. ",
"Large ship yard" : "کارخانه ساخت نيروهاي سنگين",
"The large ship yard serves to produce both military and civilian heavy units." : "در اين ساختمان نيرو هاي سنگين نظامي و غير نظامي ساخته مي شوند. با ارتقاي ساختمان ، مدت زمان ساخت نيروها کاهش مي بايد.",
"Zek cave" : "پناهگاه زک",
"The Zek cave protects Zeks from attacks and the Terran bionic blast. As long as there is still room inside the Zek cave, Zeks will automatically congregate there." : "اين ساختمان از زک ها در برابر حملات محافظت مي کند.",
"Brain" : "مغز.. مرکز کنترل زکن ها",
"The Brain controls your Zekkon spies. With each upgrade of the building, more Zekkon fleets can be controlled." : "مرکز کنترل با زکُن ها در ارتباط است و آنها را در جاسوسي ها هدايت مي كند.با هر ارتقا تعداد زکُن هايي كه مرکز کنترل مي تواند تحت كنترل داشته باشد افزايش مي يابد. ",


//Civilian buildingsساختمان هاي غير نظامي 

"Development center" : "مرکز پژوهش و تحقيقات",
"The development center serves to discover knowledge. Each upgrade of the building increases the generation speed of resarch points and thus quickens research." : "در مركز تحقيقات مي توان علوم جديد را تحقيق كرد. براي اين كار نياز به امتياز تحقيق داريد. با استفاده از امتياز تحقيق مي توان علوم جديد را تحقيق كرد يا كارايي ساختمان ها و نيرو ها را افزايش داد. با ارتقاي اين ساختمان از امتياز تحقيق بيشتري برخوردار مي شويد.",

//Other باقي اصطلاحات

//All
"Welcome" : "خوش آمديد :",
"Go TO" : "برو به :",
"OK" : "تاييد :",
"Building" : "ساختمان :",
"Duration:" : "مدت زمان ::",
"Finished:" : "اتمام:",
"Details" : "جزئيات",
"Selection" : "گزينه ها",
"Rank" : "رتبه :",
"Species" : "نژاد",
"League" : "اتحاد",
"Planets" : "سياره ها",
"Points" : "امتياز",
"Age" : "سن :",
"Sex" : "جنسيت :",
"Location" : "موقعيت :",
"Planet" : "سياره",
"Coordinates" : "مختصات",
"per hour" : "توليد در هر ساعت",
"Player" : "بازيکن :",
"Leagues" : "اتحادها :",
"Def" : "دفاع",
"Fights" : "حملات",
"Support" : "</a><a href='http://u1.imperion.org/support/index'>پشتيباني</a>",
"Answers" : "</a><a href='http://answers.imperion.org/'>سوال و جواب</a>",
"Rules" : "</a><a href='http://u1.imperion.org/start/tosIngame/'>قوانين</a>",
"Board" : "</a><a href='http://forum.imperion.org/'>اسکريپت و فارسي توسط  نيما کرماني - فروم</a>",
"Terms and conditions" : "</a><a href='http://u1.imperion.org/start/tosIngame/'>ضوابط و شرايط</a>",
"Imprint" : "</a><a href='http://u1.imperion.org/start/imprintIngame/'>تماس با ما</a>",
"Incoming fleets" : "نيروهاي در حال بازگشت",
"Outgoing fleets" : "نيروهاي در حال حمله",
"Deploy fleet" : "ارسال نيرو",
"Combat simulator" : "شبيه ساز نبرد",
"Annexation" : "مستعمره ها",
"Fleets on this planet" : "نيروهاي اين سياره",
"Fetch home" : "برگشت همه به خانه",
"Fetch a part home" : "برگشت تعدادي به خانه",
"Annexation information" : "اطلاعات استعمار",
"Owner:" : "مالک:",
"Planetary information" : "اطلاعات کلي سياره",
"Inhabitants:" : "تعداد سکنه:",
"Resource deposits:" : "توضيحات منابع",
"Metal fields:" : "تعداد معدن آهن:",
"Crystal fields:" : "تعداد معدن کريستال:",
"Deuterium fields:" : "تعداد معدن سوخت:",

"Climatic efficiency" : "ميزان سودمندي",
"Solar power:" : "نيروي خورشيدي:",
"Wind power:" : "نيروي بادي:",
"Hydropower:" : "نيروي برق آبي:",
"Thermal power:" : "نيروي حرارتي:",
"Production" : "توليد",
"High" : "زياد",
"Medium" : "متوسط",
"Low" : "کم",
"per hour" : "در ساعت",
"Reports:" : "گزارش ها:",
"League:" : "اتحاد:",
"Direct trade" : "تجارت مستقيم",
"buy" : "خريد",
"sell" : "فروش",
"send" : "ارسال",
"Flight duration" : "مدت زمان پرواز",
"Quick selection" : "انتخاب سريع",
"Fly twice" : "دوبار پرواز",
"Galaxy" : "کهکشان",
"Metal" : "آهن",
"Crystal" : "کريستال",
"Deuterium" : "سوخت",
"Tritium" : "سوخت",
"Offer" : "پرداخت",
"Search" : "جستجو",
"Time of Transport" : "مدت زمان انتقال",
"Outgoing merchants" : "بازرگانان در حال رفتن",
"Incoming merchants" : "بازرگانان در حال آمدن",
"Returning merchants" : "بازرگانان درحال برگشتن",
"Number" : "تعداد",
"To" : "به",
"Resources" : "منابع",
"Offer:" : "پرداخت:",
"Search:" : "جستجو:",
"Maximum transport time:" : "حداکثر مدت فرآيند تجارت:",
"Offer visible only to my league:" : "قابل نمايش فقط براي اعضاي اتحادم:",
"Place" : "گماردن پيشنهاد",
"unimportant" : "مهم نيست",
"1 hour" : "يک ساعت",
"'Engineering' is conducing to build up your planet's infrastructure." : " پژوهش درمورد دانش  زيرساخت و ارتقاي سازه هاي سياره از اين قسمت انجام ميگيرد.",
"'Planetary defense' is conducing to develop and build defensive weapon systems." : "پژوهش در مورد دانش ساخت نيروهاي متمرکز دفاعي در اين قسمت انجام ميگيرد.",
"'Military space flight' allows you to build warships and enhance their attributes." : "پژوهش در مورد دانش ساخت نيروهاي نظامي سياره در اين قسمت انجام ميگيرد.",
"'Civilian space flight' allows you to build civilian space ships and enhance their attributes." : "پژوهش در مورد دانش ساخت فضاپيماهاي غيرنظامي سياره در اين قسمت انجام ميگيرد.",
"'Energy technology' enables you to develop new power plants and raise their efficiency." : "پژوهش در مورد دانش توليد انرژي سياره و افزايش بهره وري از آنها در اين قسمت انجام ميگيرد.",




   





"Miscelleaneous" : "متفرقه",
"Archive" : "آرشيو",
"Subject:" : "موضوع",
"Date" : "تاريخ",
"Inbox" : "صندوق پيامهاي دريافتي",
"Write message" : "نوشتن پيام جديد",
"Sent box" : "صندوق پيامهاي ارسال شده",
"Sender:" : "ارسال کننده :",
"Time" : "زمان",
"Research" : "تحقيق",
"Level" : "سطح",
"Cost" : "هزينه",
"Action" : "اجرا",
"Welcome " : "خوش آمديد",
"Logout" : "خروج",
"Plus" : "پلاس",
"Production" : "ميزان توليدات",
"© 2009 Travian Games GmbH" : "© 2009 Travian Games GmbH",
//"Terms and conditions" : "ٍFarsi By Nima Kermani Terms and conditions",
"Production of annexed planets" : "توليد سياره هاي مستعمره",
"Own Planets" : "فهرست سياره هاي خودي",
"Consumption" : "ميزان مصرفي",
"Yield" : "بازده مفيد",
"UPGRADE TO" : "ارتقاء به سطح :",
"Capacity" : "ظرفيت",
"Full on" : "پر مي شود  در",
"at" : " در ",
"Stationed fleet on other planets" : " لشکريان مستقر در سيارات ديگر ",
"Level" : " سطح ",
"Production" : " توليد ",
"Total" : " مجموع ",
"Build" : "ساخت",
"Not available" : "هنوز به بهره برداري نرسيده",
"Overview" : "بررسي",
"Upgrade impossible: Insufficient resources. Resources sufficient on" : "ارتقاء به دليل کمبود منابع ممکن نيست ، منابع کافي در :",
"Energy" : "انرژي",
"Energy consumption" : "مصرف انرژي",
"All" : "همه",




//Research Lab آکادمي

"Engineering" : "مهندسي ",
"Building lots" : "مکان ساخت  ساختمان جديد",
"Building stability" : "استحکام ساختمان",
"Geologic exploration" : "اکتشافات معادن",
"Storage capacity" : "ظرفيت ذخيره سازي",
"Teleportation" : "منتقل کننده",

"Planetary Defense" : "ناوگان دفاعي سيارات",
"Repair quota" : " ظرفيت و قدرت بازسازي",
"Concealment capacity" : "ظرفيت پنهان سازي", 	
"Shield technology" : "فناوري سپر نژاد تيتان",

"Blueprint: Flak battery" : "ضد هوايي الکترومغناطيسي",
"Blueprint: Puls laser" : "ضدهوايي پالس ليزري",
"Blueprint: Gauss gun" : "اسلحه ميدان مغناطيسي",
"Blueprint:Interval artillery" : "توپخانه دوربرد",
"Blueprint: Tachyon emitter" : "ضدهوايي ساتع کننده نوري)",
"Blueprint: Interceptor Missile 1" : "موشک پرتاب شونده 1 ",
"Blueprint: Interceptor Missile 2" : "موشک پرتاب شونده 2",
"Blueprint: Bionic Missile" : " موشک بيولوژيک ",

"Blueprint: Sporok" : "توپخانه اسپوروک",
"Blueprint: Acidor" : "توپخانه اسيدي",
"Blueprint: Kalmanar" : "توپخانه گره اي",
"Blueprint: Zuikon" : "توپخانه تله اي",
"Blueprint: Paratec" : "توپخانه موج ساز",

"Blueprint: Injector" : "سيستم انژکتوري",
"Blueprint: Nanoblade" : "سيستم نانو",
"Blueprint: Boson accelerator" : "هيگز شتابدهنده",
"Blueprint: Masterblaster" : "انفجار انرژي",
"Blueprint: Disruptor" : "سيستم سياه چاله",

"Military Space Flight" : "ناوگان هاي نظامي",
"Propulsion technology" : "فناوري سرعت نيروها",
"Fuel consumption" : "مصرف سوخت", 	
"Cargo capacity" : "ظرفيت حمل بار", 	
"Tank capacity" : "ظرفيت باک سوخت", 	

"Blueprint: Fighter" : "جنگنده",
"Blueprint: Battleship" : "فضاپيماي جنگي",
"Blueprint: Destroyer" : "ويرانگر",
"Blueprint: Heavy Cruiser" : "رزمناو سنگين",
"Blueprint: Pulsar" : "فرستنده موج مغناطيسي",
"Blueprint: Bomber" : "بمب افکن",
"Blueprint: Attack Missile 1" : "موشک تهاجمي 1",
"Blueprint: Attack Missile 2" : "موشك تهاجمي 2",
"Blueprint: Attack Missile 3" : "موشك تهاجمي 3",
"Blueprint: Attack Missile 4" : "موشك تهاجمي 4",
"Blueprint: Bionic Blast" : "انفجار بيولوژيک",

"Blueprint: Xnair" : "ژن اير",
"Blueprint: Mylon" : "مايلون",
"Blueprint: Maxtron" : "مکسترون",
"Blueprint: Mother ship" : "فضاپيماي مادر",
"Blueprint: Suikon" : "سويکون",
"Blueprint: Macid" : "ماسيد",

"Blueprint: Scout" : "جنگنده",
"Blueprint: Delphi" : "جنگنده دلفي",
"Blueprint: Corsair" : "جنگنده ناشناس",
"Blueprint: Terminator" : "نابودگر",
"Blueprint: Carrier" : "جنگنده غول پيکر",
"Blueprint: Protektor" : "محافظ",
"Blueprint: Phoenix" : " بمب افکن نژاد تيتان",


"Civilian Space Flight" : "فضاپيماهاي غير نظامي",
"Recycling" : "بازيافت",
"Wormhole physics" : "فن آوري سياه چاله",
"Expansion studies" : "افزاينده دانش",
"Trade" : "تجارت", 	
"Espionage" : "جاسوسي", 	

"Blueprint: Probe" : "جاسوس",
"Blueprint: Tanker" : "تانکر",
"Blueprint: Small transporter" : "حامل کوچک",
"Blueprint: Large Recycler" : "بازيافت گر بزرگ",
"Blueprint: Recycler" : "بازيافت گر",
"Blueprint: Drop ship" : "فضاپيماي مهاجر",

"Blueprint: Zek" : "زِک",
"Blueprint: Zekkon" : "زِکُن",
"Blueprint: Psikon" : "پسيکُن",
"Blueprint: Octopon" : "اکتپُن",

"Blueprint: Observer" : "جاسوس",
"Blueprint: Large transporter" : "حامل بزرگ",

"Energy technology" : "فن آوري انرژي",
"AEC energy" : "AEC انرژي",    	
"Fusion power" : "انرژي فيوژني",
"Solar power" : "انرژي خورشيدي",
"Hydropower" : "انرژي برق آبي",
"Wind power" : "انرژي باد",
"Thermal power" : "انرژي حرارتي",
"Qi-Unit Utilization" : "Qi واحد بهره برداري از امتياز",






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