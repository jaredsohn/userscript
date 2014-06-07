// ==UserScript==
// @name           Megapolisbot
// @namespace      Megapolisbot
// @description    Megapolisbot
// @include        http://88.212.222.164/city_server_vk_prod/assets/app.html
// @include        http://*vk*app1858070*
// @resource spin1 http://i56.tinypic.com/25k0eab.gif
// old black spinner http://i54.tinypic.com/f5g7a.gif
// ==/UserScript==

// статический глобальный массив названий объектов
var itemarray = [{"as_description":"Жилой комплекс \"Акация\"","as_item_name":"acacia_house","as_id":10154,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Акация\"","as_item_name":"acacia_house_real","as_id":10155,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Система контроля и управления доступом","as_item_name":"access_control_system","as_id":10992,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Афинский Акрополь","as_item_name":"acropolis","as_id":11234,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Афинский Акрополь","as_item_name":"acropolis_real","as_id":11235,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"АЭС-2","as_item_name":"advanced_atomic_power","as_id":10720,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"АЭС-2","as_item_name":"advanced_atomic_power_real","as_id":10721,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Завод высокоточной техники","as_item_name":"advanced_military_plant","as_id":11530,"as_buy_as_gift":null,"as_shop_department":"sea_naval_station"},{"as_description":"Укрепленная водонапорная башня","as_item_name":"advanced_water_tower1_was","as_id":11020,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Укрепленная водонапорная башня","as_item_name":"advanced_water_tower1_was_real","as_id":11021,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Современная водонапорная башня","as_item_name":"advanced_water_tower2_was","as_id":11022,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Современная водонапорная башня","as_item_name":"advanced_water_tower2_was_real","as_id":11023,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Аэратор","as_item_name":"aerator","as_id":10956,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Авиашоу","as_item_name":"aeroshow","as_id":10552,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Система аэрозольного орошения","as_item_name":"aerosol_irrigation_system","as_id":10524,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Аэротакси","as_item_name":"aerotaxi","as_id":10551,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Авиационный двигатель","as_item_name":"air_engine","as_id":11463,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система воздушной дозаправки","as_item_name":"air_refueling_system","as_id":11461,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Авиационная часть","as_item_name":"airbase_buildsite","as_id":10468,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авиационная часть","as_item_name":"airbase_buildsite_real","as_id":10469,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авиационная часть","as_item_name":"airbase_buildsite_real_level","as_id":10470,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авиационная часть","as_item_name":"airbase_place","as_id":10832,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Авиационная часть","as_item_name":"airbase_stage1","as_id":10471,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авиационная часть","as_item_name":"airbase_stage2","as_id":10472,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авиационная часть","as_item_name":"airbase_stage3","as_id":10473,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"airbase_stage4","as_id":10474,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"airbase_stage5","as_id":10475,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"airbase_stage6","as_id":10476,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"airbase_stage7","as_id":10477,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"airbase_stage8","as_id":10478,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Авианосцы","as_item_name":"aircraft_carrier","as_id":10571,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Стелла с самолетом","as_item_name":"aircraft_stella","as_id":10286,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Стелла с самолетом","as_item_name":"aircraft_stella_real","as_id":10287,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Турбины для самолетов","as_item_name":"aircraft_turbines","as_id":10537,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Почтовые авиаперевозки","as_item_name":"airmail_transport","as_id":10549,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Аэропорт","as_item_name":"airport_place","as_id":10820,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Аэропорт","as_item_name":"airport_stage1_level1","as_id":10418,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэропорт","as_item_name":"airport_stage1_level1_real","as_id":10419,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэропорт","as_item_name":"airport_stage1_level1_real_level2","as_id":10421,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэропорт","as_item_name":"airport_stage1_level1_real_level","as_id":10420,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэровокзал","as_item_name":"airport_stage1_level2","as_id":10422,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэровокзал","as_item_name":"airport_stage1_level3","as_id":10423,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэровокзал","as_item_name":"airport_stage2_level1","as_id":10424,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэродром","as_item_name":"airport_stage2_level2","as_id":10425,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэродром","as_item_name":"airport_stage2_level3","as_id":10426,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Аэродром","as_item_name":"airport_stage3_level1","as_id":10427,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Взлетно-посадочная полоса","as_item_name":"airport_stage3_level2","as_id":10428,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Взлетно-посадочная полоса","as_item_name":"airport_stage3_level3","as_id":10429,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Взлетно-посадочная полоса","as_item_name":"airport_stage4_level1","as_id":10430,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пассажирский терминал","as_item_name":"airport_stage4_level2","as_id":10433,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пассажирский терминал","as_item_name":"airport_stage4_level3","as_id":10434,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пассажирский терминал","as_item_name":"airport_stage5_level1","as_id":10435,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Диспетчерская вышка","as_item_name":"airport_stage5_level2","as_id":10436,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Диспетчерская вышка","as_item_name":"airport_stage5_level3","as_id":10437,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Диспетчерская вышка","as_item_name":"airport_stage6_level1","as_id":10438,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Соревнования по парашютному спорту","as_item_name":"airsport_competition","as_id":10550,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Алюминиевый профиль","as_item_name":"aluminum_profile","as_id":11442,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Амфитеатр","as_item_name":"amphitheater","as_id":10346,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Усилители сигнала","as_item_name":"amplifier","as_id":10970,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Парк развлечений","as_item_name":"amusement_park","as_id":10382,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Парк развлечений","as_item_name":"amusement_park_real","as_id":10383,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Якорь","as_item_name":"anchor","as_id":10979,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Акваоборудование","as_item_name":"aqua_equipment","as_id":12103,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Беседка","as_item_name":"arbor","as_id":10276,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Триумфальная арка","as_item_name":"arc_de_triomphe","as_id":11205,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Триумфальная арка","as_item_name":"arc_de_triomphe_real","as_id":11206,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Археологические раскопки","as_item_name":"archaeological_excavations","as_id":10591,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Площадка воздушных шаров","as_item_name":"area_baloon","as_id":10279,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Броня","as_item_name":"armor","as_id":11439,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Транспортировка бронетехники","as_item_name":"armor_transport","as_id":10574,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Бронежилеты","as_item_name":"armor_vests","as_id":11438,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Танковая часть","as_item_name":"armoured_military_base","as_id":11521,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство танковой части, уровень 1","as_item_name":"armoured_military_base_buildsite","as_id":11516,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство танковой части, уровень 1","as_item_name":"armoured_military_base_buildsite_real","as_id":11517,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство танковой части, уровень 1","as_item_name":"armoured_military_base_buildsite_real_level","as_id":11518,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Танковая часть","as_item_name":"armoured_military_base_place","as_id":10826,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство танковой части, уровень 2","as_item_name":"armoured_military_base_stage1","as_id":11519,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство танковой части, уровень 3","as_item_name":"armoured_military_base_stage2","as_id":11520,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Художественная галерея","as_item_name":"art_gallery","as_id":10325,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Художественная галерея","as_item_name":"art_gallery_new_real","as_id":12330,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Художественная галерея","as_item_name":"art_gallery_real","as_id":10330,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_east_buildsite","as_id":10492,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_east_buildsite_real","as_id":10493,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_east_buildsite_real_level","as_id":10494,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_east_buildsite_stage1","as_id":10495,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_east_buildsite_stage2","as_id":10496,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Расширенная артезианская скважина","as_item_name":"artesian_well_east_buildsite_stage3","as_id":10497,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_east_place","as_id":10836,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_west_buildsite","as_id":10498,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_west_buildsite_real","as_id":10499,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство артезианской скважины","as_item_name":"artesian_well_west_buildsite_real_level","as_id":11901,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_west_buildsite_stage1","as_id":11902,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_west_buildsite_stage2","as_id":11903,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Расширенная артезианская скважина","as_item_name":"artesian_well_west_buildsite_stage3","as_id":11904,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Артезианская скважина","as_item_name":"artesian_well_west_place","as_id":10837,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Музей артиллерии","as_item_name":"artillery_museum","as_id":10391,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Музей артиллерии","as_item_name":"artillery_museum_new_real","as_id":12335,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Музей артиллерии","as_item_name":"artillery_museum_real","as_id":10392,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Асфальт","as_item_name":"asphalt","as_id":10990,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Радиоактивные превращения ядер","as_item_name":"atomic_nuclei_transformation","as_id":10539,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"АЭС","as_item_name":"atomic_power","as_id":10704,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"АЭС","as_item_name":"atomic_power_real","as_id":10707,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Заработная плата","as_item_name":"auto","as_id":11706,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Автоматический шлагбаум","as_item_name":"automatic_barrier","as_id":11447,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Системы автоматического пожаротушения","as_item_name":"automatic_fire","as_id":10916,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Автоматический нефтесборщик","as_item_name":"automatic_skimmer","as_id":10972,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Авиатопливо","as_item_name":"aviation_fuel","as_id":10538,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Жилой комплекс \"Вавилон\"","as_item_name":"babylon_house","as_id":10160,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Вавилон\"","as_item_name":"babylon_house_real","as_id":10161,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Бахрейнский ВТЦ","as_item_name":"bahrain_wtc_real","as_id":11297,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Банк","as_item_name":"bank","as_id":11253,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Банк Китая","as_item_name":"bank_of_china","as_id":11221,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Банк Китая","as_item_name":"bank_of_china_real","as_id":11222,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Банковские операции","as_item_name":"bank_operations","as_id":10566,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Банк","as_item_name":"bank_real","as_id":11254,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Детектор купюр","as_item_name":"banknote_detector","as_id":11495,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство бейсбольной арены","as_item_name":"baseball_arena_buildsite","as_id":11874,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство бейсбольной арены","as_item_name":"baseball_arena_buildsite_real","as_id":11875,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство бейсбольной арены","as_item_name":"baseball_arena_stage1","as_id":11876,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бейсбольная арена","as_item_name":"baseball_arena_stage2","as_id":11877,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бейсбольные биты","as_item_name":"baseball_bats","as_id":11496,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Собор Святого Марка","as_item_name":"basilica","as_id":12309,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Собор Святого Марка","as_item_name":"basilica_real","as_id":12310,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Баскетбольная площадка","as_item_name":"basketball_court","as_id":10301,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Пляж, 1 уровень","as_item_name":"beach","as_id":10228,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Место под пляж","as_item_name":"beach_buildsite","as_id":10227,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Место под пляж","as_item_name":"beach_buildsite_real","as_id":10229,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пляж","as_item_name":"beach_place","as_id":10802,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Пляж, 2 уровень","as_item_name":"beach_stage1","as_id":11511,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пляж, 3 уровень","as_item_name":"beach_stage2","as_id":11512,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Салон красоты","as_item_name":"beauty_salon","as_id":10397,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Салон красоты","as_item_name":"beauty_salon_new_real","as_id":12338,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Салон красоты","as_item_name":"beauty_salon_real","as_id":10398,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Загородный отель","as_item_name":"bed_and_breakfast","as_id":10122,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Мебель для спальни","as_item_name":"bedroom_furniture","as_id":10512,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Ленточная пила","as_item_name":"belt_saw","as_id":11473,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Биг Бен","as_item_name":"big_ben","as_id":11247,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Биг Бен","as_item_name":"big_ben_real","as_id":11248,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Двухэтажный кирпичный дом","as_item_name":"big_brick_house","as_id":10126,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Большой семейный дом","as_item_name":"big_family_home","as_id":10112,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Большой дом в японском стиле","as_item_name":"big_japan_house","as_id":10125,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Супермаркет","as_item_name":"big_mart","as_id":10329,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Макаронная фабрика BIGBON","as_item_name":"bigbon_factory","as_id":10479,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Мотоцикл","as_item_name":"bike","as_id":12100,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Байк-клуб","as_item_name":"bike_club","as_id":11294,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Мотоциклы","as_item_name":"bikes","as_id":10516,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Бильярдная","as_item_name":"billiard_room","as_id":11292,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бильярдная","as_item_name":"billiard_room_real","as_id":11293,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Битум","as_item_name":"bitumen","as_id":11429,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Хозтовары","as_item_name":"blamco_inc","as_id":10402,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Блок учета нефти","as_item_name":"block_oil","as_id":10941,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Деревянный дом","as_item_name":"blue_bungalow","as_id":10107,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Синий коттедж","as_item_name":"blue_cottage","as_id":10103,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Цветочная клумба","as_item_name":"blue_flower_patch","as_id":10202,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Синий новогодний шар","as_item_name":"blue_new_year_ball","as_id":10945,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Книжный магазин","as_item_name":"books_shop","as_id":10316,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Насосы для скважины","as_item_name":"boreholes_pump","as_id":10908,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мост","as_item_name":"bounds","as_id":10823,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Букет \"Вечная Тайна\"","as_item_name":"bouquet1","as_id":11301,"as_buy_as_gift":true,"as_shop_department":"bouquets"},{"as_description":"Букет \"Океан Любви\"","as_item_name":"bouquet2","as_id":11302,"as_buy_as_gift":true,"as_shop_department":"bouquets"},{"as_description":"Букет \"Жажда Любви\"","as_item_name":"bouquet3","as_id":11303,"as_buy_as_gift":true,"as_shop_department":"bouquets"},{"as_description":"Букет \"Любящее Сердце\"","as_item_name":"bouquet4","as_id":11304,"as_buy_as_gift":true,"as_shop_department":"bouquets"},{"as_description":"Боулинг","as_item_name":"bowling","as_id":10319,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Скобы","as_item_name":"bracket","as_id":12115,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Бразильский мрамор","as_item_name":"brazilian_marble","as_id":10928,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Бетонные блоки","as_item_name":"brick","as_id":10901,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Кирпичный дом","as_item_name":"brick_house","as_id":10116,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Кирпичи","as_item_name":"bricks","as_id":11498,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мост","as_item_name":"bridge","as_id":10224,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Каркас моста","as_item_name":"bridge_buildsite","as_id":10223,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Каркас моста","as_item_name":"bridge_buildsite_real","as_id":10225,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Мост","as_item_name":"bridge_place","as_id":10801,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Бристоль\"","as_item_name":"bristol_house","as_id":10172,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Бристоль\"","as_item_name":"bristol_house_real","as_id":10173,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Деревянный дом","as_item_name":"brown_bungalow","as_id":10115,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Лопасти для турбины","as_item_name":"bucket","as_id":11487,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Бунгало","as_item_name":"bungalow_new","as_id":10150,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Бунгало Сиена","as_item_name":"bungalow_siena","as_id":10149,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Бургерная","as_item_name":"burger_joint","as_id":10303,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бурдж-Халифа","as_item_name":"burj_khalifa","as_id":11225,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бурдж-Халифа","as_item_name":"burj_khalifa_real","as_id":11226,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Буррито","as_item_name":"burrito_shop","as_id":10312,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Автобусы","as_item_name":"buses","as_id":10531,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Бизнес-центр","as_item_name":"business_center","as_id":10361,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бизнес-центр","as_item_name":"business_center_real","as_id":10362,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Аренда Бизнес-центра","as_item_name":"business_center_rent","as_id":10565,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Жилой дом бизнес класса","as_item_name":"business_class_residential_building","as_id":10121,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Деловые костюмы","as_item_name":"business_suits","as_id":10503,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Магазин шоколада","as_item_name":"cake_shop","as_id":10336,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Кинокамера","as_item_name":"camera","as_id":12145,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Капитолий","as_item_name":"capitol","as_id":12315,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Капитолий","as_item_name":"capitol_real","as_id":12316,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Автомойка","as_item_name":"car_wash","as_id":11261,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Автомойка","as_item_name":"car_wash_real","as_id":11262,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Янтарная карамель","as_item_name":"caramel","as_id":10557,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Грузовой контейнер","as_item_name":"cargo_container","as_id":12130,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Грузовые весы","as_item_name":"cargo_scales","as_id":12131,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Карусель","as_item_name":"carousel","as_id":10251,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Карусель 'Два сердца'","as_item_name":"carousel_dsv","as_id":10275,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Перевозки двигателей для ракет-носителей","as_item_name":"carriage_engines_for_missiles","as_id":10594,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Корпусная мебель","as_item_name":"case_furniture","as_id":10582,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Казино","as_item_name":"casino","as_id":10347,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Казино","as_item_name":"casino_real","as_id":10349,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Цемент","as_item_name":"cement","as_id":11469,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Централ Плаза","as_item_name":"central_plaza","as_id":11269,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Централ Плаза","as_item_name":"central_plaza_real","as_id":11270,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Центральный вокзал","as_item_name":"central_station","as_id":11942,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Грузовой терминал","as_item_name":"central_station_east_place","as_id":10848,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство грузового терминала","as_item_name":"central_station_east_stage1_level1","as_id":11949,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство грузового терминала","as_item_name":"central_station_east_stage1_level1_real1","as_id":11972,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство грузового терминала","as_item_name":"central_station_east_stage1_level1_real2","as_id":11973,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство грузового терминала","as_item_name":"central_station_east_stage1_level2","as_id":11950,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство грузового терминала","as_item_name":"central_station_east_stage1_level3","as_id":11951,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Грузовой терминал","as_item_name":"central_station_east_stage2_level1","as_id":11952,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство диспетчерской вышки","as_item_name":"central_station_east_stage2_level2","as_id":11953,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство диспетчерской вышки, 3 этап","as_item_name":"central_station_east_stage2_level3","as_id":11954,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Центральный вокзал","as_item_name":"central_station_place","as_id":10846,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство центрального вокзала","as_item_name":"central_station_stage1","as_id":11939,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство центрального вокзала","as_item_name":"central_station_stage1_real1","as_id":11968,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство центрального вокзала","as_item_name":"central_station_stage1_real2","as_id":11969,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство центрального вокзала","as_item_name":"central_station_stage2","as_id":11940,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Центральный вокзал","as_item_name":"central_station_stage3","as_id":11941,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Сборочный конвейер","as_item_name":"central_station_west_place","as_id":10847,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство сборочного конвейера","as_item_name":"central_station_west_stage1_level1","as_id":11943,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство сборочного конвейера","as_item_name":"central_station_west_stage1_level1_real1","as_id":11970,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство сборочного конвейера","as_item_name":"central_station_west_stage1_level1_real2","as_id":11971,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство сборочного конвейера","as_item_name":"central_station_west_stage1_level2","as_id":11944,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство сборочного конвейера","as_item_name":"central_station_west_stage1_level3","as_id":11945,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Сборочный конвейер","as_item_name":"central_station_west_stage2_level1","as_id":11946,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство здания управления","as_item_name":"central_station_west_stage2_level2","as_id":11947,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство здания управления","as_item_name":"central_station_west_stage2_level3","as_id":11948,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Система централизации перевозок","as_item_name":"centralized_traffic_system","as_id":12135,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Шампанское","as_item_name":"champagne","as_id":10954,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Чартерные рейсы","as_item_name":"charter","as_id":10560,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Парк с шахматами","as_item_name":"chess_park","as_id":11534,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк с шахматами","as_item_name":"chess_park_real","as_id":11535,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Древесно-стружечные плиты","as_item_name":"chipboard","as_id":10581,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Чипсы","as_item_name":"chips","as_id":10519,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Противооткатный башмак","as_item_name":"chock","as_id":12121,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Елочные шары","as_item_name":"christmas_balls","as_id":10946,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree","as_id":10943,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree_buildsite","as_id":10377,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree_buildsite_real","as_id":10378,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree_stage1","as_id":10379,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree_stage2","as_id":10380,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Новогодняя елка","as_item_name":"christmas_tree_stage3","as_id":10381,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Рождественский венок","as_item_name":"christmas_wreath","as_id":10949,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Крайслер-билдинг","as_item_name":"chrysler_building","as_id":11290,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Крайслер-билдинг","as_item_name":"chrysler_building_real","as_id":11291,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Храм Христа Спасителя","as_item_name":"church","as_id":10357,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Храм Христа Спасителя","as_item_name":"church_real","as_id":10358,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Циркулярная пила","as_item_name":"circular_saw","as_id":10984,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Цирковой манеж","as_item_name":"circus_arena","as_id":11491,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство цирка","as_item_name":"circus_buildsite","as_id":11854,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство цирка","as_item_name":"circus_buildsite_real","as_id":11855,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Цирковое оборудование","as_item_name":"circus_equipment","as_id":11492,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство цирка","as_item_name":"circus_stage1","as_id":11856,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Цирк","as_item_name":"circus_stage2","as_id":11857,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Расширение 11x11","as_item_name":"city2_expand11_real","as_id":10628,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 13x13","as_item_name":"city2_expand13_real","as_id":10629,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 15x15","as_item_name":"city2_expand15_real","as_id":10630,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 17x17","as_item_name":"city2_expand17_real","as_id":10631,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 19x19","as_item_name":"city2_expand19_real","as_id":10632,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 21x21","as_item_name":"city2_expand21_real","as_id":10633,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 23x23","as_item_name":"city2_expand23_real","as_id":10634,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 25x25","as_item_name":"city2_expand25_real","as_id":10635,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 27x27","as_item_name":"city2_expand27_real","as_id":10636,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 29x29","as_item_name":"city2_expand29_real","as_id":10637,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 31x31","as_item_name":"city2_expand31_real","as_id":10638,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 33x33","as_item_name":"city2_expand33_real","as_id":10639,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 35x35","as_item_name":"city2_expand35_real","as_id":10640,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 37x37","as_item_name":"city2_expand37_real","as_id":10641,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 39x39","as_item_name":"city2_expand39_real","as_id":10642,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 41x41","as_item_name":"city2_expand41_real","as_id":10643,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 9x9","as_item_name":"city2_expand9_real","as_id":10627,"as_buy_as_gift":false,"as_shop_department":"expand"},{"as_description":"1 000 в фонд заработной платы","as_item_name":"city_automate1000","as_id":11105,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"100 в фонд заработной платы","as_item_name":"city_automate100","as_id":11102,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"2 500 в фонд заработной платы","as_item_name":"city_automate2500","as_id":11106,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"250 в фонд заработной платы","as_item_name":"city_automate250","as_id":11103,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"30 в фонд заработной платы","as_item_name":"city_automate30","as_id":11101,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"5 000 в фонд заработной платы","as_item_name":"city_automate5000","as_id":11107,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"500 в фонд заработной платы","as_item_name":"city_automate500","as_id":11104,"as_buy_as_gift":true,"as_shop_department":"automation"},{"as_description":"Офисы Сити-Центр","as_item_name":"city_centre_offices","as_id":11275,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Офисы Сити-Центр","as_item_name":"city_centre_offices_real","as_id":11276,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"","as_item_name":"city_expand11_invites","as_id":10601,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 11x11","as_item_name":"city_expand11_real","as_id":10602,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand13_invites","as_id":10603,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 13x13","as_item_name":"city_expand13_real","as_id":10604,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand15_invites","as_id":10605,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 15x15","as_item_name":"city_expand15_real","as_id":10606,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand17_invites","as_id":10607,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 17x17","as_item_name":"city_expand17_level","as_id":11601,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 17x17","as_item_name":"city_expand17_real","as_id":10608,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand19_invites","as_id":10609,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 19x19","as_item_name":"city_expand19_real","as_id":10610,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand21_invites","as_id":10611,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 21x21","as_item_name":"city_expand21_real","as_id":10612,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand23_invites","as_id":10613,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 23x23","as_item_name":"city_expand23_level","as_id":11602,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 23x23","as_item_name":"city_expand23_real","as_id":10614,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand25_invites","as_id":10615,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 25x25","as_item_name":"city_expand25_real","as_id":10616,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand27_invites","as_id":10617,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 27x27","as_item_name":"city_expand27_real","as_id":10618,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"","as_item_name":"city_expand29_invites","as_id":10620,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Расширение 29x29","as_item_name":"city_expand29_real","as_id":10619,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 31x31","as_item_name":"city_expand31_level","as_id":11603,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 31x31","as_item_name":"city_expand31_real","as_id":10621,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 33x33","as_item_name":"city_expand33_real","as_id":10622,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 35x35","as_item_name":"city_expand35_real","as_id":10623,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 37x37","as_item_name":"city_expand37_real","as_id":10624,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 39x39","as_item_name":"city_expand39_real","as_id":10625,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Расширение 41x41","as_item_name":"city_expand41_real","as_id":10626,"as_buy_as_gift":true,"as_shop_department":"expand"},{"as_description":"Мэрия","as_item_name":"city_hall","as_id":10351,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Мэрия","as_item_name":"city_hall_new_real","as_id":12327,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Мэрия","as_item_name":"city_hall_real","as_id":10352,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Глиняные кирпичи","as_item_name":"clay_bricks","as_id":11412,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Чистящие жидкости для дома","as_item_name":"cleaning_fluids","as_id":10513,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Скалодром","as_item_name":"climbing_wall","as_id":11265,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Скалодром","as_item_name":"climbing_wall_new_real","as_id":12347,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Скалодром","as_item_name":"climbing_wall_real","as_id":11266,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Парк с часами","as_item_name":"clock_park","as_id":11532,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк с часами","as_item_name":"clock_park_real","as_id":11533,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Кафетерий","as_item_name":"coffee_house","as_id":10305,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Монета","as_item_name":"coins","as_id":11701,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Колледж","as_item_name":"college","as_id":11257,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Колледж","as_item_name":"college_new_real","as_id":12337,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Колледж","as_item_name":"college_real","as_id":11258,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Колизей","as_item_name":"colosseum","as_id":11219,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Колизей","as_item_name":"colosseum_real","as_id":11220,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Колонна","as_item_name":"column","as_id":12113,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Перевозки бизнес класса","as_item_name":"comfortable_transportation","as_id":11808,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Каток","as_item_name":"compactor","as_id":11433,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Компрессорная установка","as_item_name":"compressor","as_id":10935,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Компьютерная техника","as_item_name":"computer_tech","as_id":10535,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Бетонные плиты","as_item_name":"concrete_plates","as_id":10996,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Бетонные кольца","as_item_name":"concrete_ring","as_id":10912,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Раствор бетона","as_item_name":"concrete_solution","as_id":10920,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система кондиционирования","as_item_name":"condition_system","as_id":10925,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Кондоминиум","as_item_name":"condo","as_id":10120,"as_buy_as_gift":false,"as_shop_department":"houses"},{"as_description":"Кондоминиум","as_item_name":"condo_real","as_id":10114,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Контактные рельсы","as_item_name":"conductor_rails","as_id":11426,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Кондитерские изделия","as_item_name":"confectionery","as_id":10506,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Жилой комплекс \"Континент\"","as_item_name":"continent_house","as_id":10162,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Континент\"","as_item_name":"continent_house_real","as_id":10163,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Блок управления","as_item_name":"control_block","as_id":13007,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Пульты управления","as_item_name":"control_panel","as_id":10913,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сборочный конвейер","as_item_name":"conveyor","as_id":10403,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Сборочный конвейер","as_item_name":"conveyor_real","as_id":10404,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Кораллы","as_item_name":"corals","as_id":12104,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Паб","as_item_name":"corner_pub","as_id":10328,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство корриды","as_item_name":"corrida_buildsite","as_id":12201,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство корриды","as_item_name":"corrida_buildsite_new_real","as_id":12341,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство корриды","as_item_name":"corrida_buildsite_real","as_id":12202,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Коррида","as_item_name":"corrida_stage1","as_id":12203,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Коттедж Альбион","as_item_name":"cottage_albion","as_id":10145,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Коттедж Альбион","as_item_name":"cottage_albion_real","as_id":10146,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Коттедж Атлас","as_item_name":"cottage_atlas","as_id":10144,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Коттедж Босфор","as_item_name":"cottage_bosfor","as_id":10147,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Коттедж Марика","as_item_name":"cottage_marika","as_id":10148,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сцепное устройство","as_item_name":"coupling","as_id":12126,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Окружной суд","as_item_name":"court_house","as_id":10355,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Окружной суд","as_item_name":"court_house_real","as_id":10356,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Закрытая парковка","as_item_name":"covered_parking","as_id":10335,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Закрытая парковка","as_item_name":"covered_parking_new","as_id":12349,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Кран для спуска яхт","as_item_name":"crane_for_launching","as_id":10981,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сумасшедшая лапша","as_item_name":"crazy_noodles","as_id":10577,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Статуя купидона","as_item_name":"cupidon","as_id":10273,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Поребрик","as_item_name":"curb","as_id":11431,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Пятизвездочная гостиница","as_item_name":"curve_house","as_id":10111,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Открытый велотрек","as_item_name":"cycle_track","as_id":12301,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Открытый велотрек","as_item_name":"cycle_track_real","as_id":12302,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Система дезинфекции","as_item_name":"decontamination_system","as_id":10957,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Умягчители воды","as_item_name":"demineralizers","as_id":10958,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Департамент археологии","as_item_name":"department_of_archaeology_buildsite","as_id":11895,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Департамент археологии","as_item_name":"department_of_archaeology_buildsite_real","as_id":11896,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Департамент археологии","as_item_name":"department_of_archaeology_stage1","as_id":11897,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Глубинный сканер","as_item_name":"depth_scanner","as_id":11449,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Разведывательная вышка","as_item_name":"derrick","as_id":10242,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Разведывательная вышка","as_item_name":"derrick_buildsite","as_id":10239,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Разведывательная вышка","as_item_name":"derrick_buildsite_real","as_id":10240,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Разведывательная вышка","as_item_name":"derrick_buildsite_real_level","as_id":10241,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Проект \"Разведывательная вышка\"","as_item_name":"derrick_place","as_id":10806,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство станции опреснения","as_item_name":"desalination_plant_buildsite","as_id":11840,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство станции опреснения","as_item_name":"desalination_plant_buildsite_real","as_id":11841,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство станции опреснения","as_item_name":"desalination_plant_buildsite_real_level2","as_id":11843,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство станции опреснения","as_item_name":"desalination_plant_buildsite_real_level","as_id":11842,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция опреснения воды","as_item_name":"desalination_plant_place","as_id":10839,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство станции опреснения","as_item_name":"desalination_plant_stage1","as_id":11844,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция опреснения, 1 модуль","as_item_name":"desalination_plant_stage2","as_id":11845,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция опреснения, 2 модуля","as_item_name":"desalination_plant_stage3","as_id":11846,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция опреснения, 3 модуля","as_item_name":"desalination_plant_stage4","as_id":11847,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Мост","as_item_name":"desert","as_id":10810,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Дизель-генератор","as_item_name":"diesel_generator","as_id":10936,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Улётный обед с мясом","as_item_name":"dinner_with_meat","as_id":10580,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Открытие пещерных рисунков","as_item_name":"discovery_of_cave_painting","as_id":10589,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Посуда","as_item_name":"dishes","as_id":10511,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Дельфин","as_item_name":"dolphin","as_id":11468,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство дельфинария","as_item_name":"dolphinarium_buildsite","as_id":11536,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство дельфинария","as_item_name":"dolphinarium_buildsite_real","as_id":11537,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство дельфинария","as_item_name":"dolphinarium_stage1","as_id":11538,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Дельфинарий","as_item_name":"dolphinarium_stage2","as_id":11539,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Двери на фотоэлементах","as_item_name":"doors_photocell","as_id":12142,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Блок дозирования","as_item_name":"dosing_unit","as_id":10967,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Парк с драконом","as_item_name":"dragon_park","as_id":12405,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк с драконом","as_item_name":"dragon_park_real","as_id":12406,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Водоотводные устройства","as_item_name":"drainage_device","as_id":12117,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Жилой комплекс \"Мечта\"","as_item_name":"dream_house","as_id":10156,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Мечта\"","as_item_name":"dream_house_real","as_id":10157,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Буры для скважины","as_item_name":"drill","as_id":10910,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Бурильщик","as_item_name":"driller","as_id":12012,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Буровое долото","as_item_name":"drilling_bit","as_id":10937,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Видео игры на DVD","as_item_name":"dvd_video_games","as_id":10504,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Эйфелева башня","as_item_name":"eiffel_tower","as_id":10363,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Эйфелева башня","as_item_name":"eiffel_tower_real","as_id":10364,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Система катапультирования","as_item_name":"ejection_system","as_id":11450,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Электрокары","as_item_name":"electric_cars","as_id":10530,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Элемент противодымной защиты","as_item_name":"element_of_the_smoke_protection","as_id":13009,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Скоростные лифты","as_item_name":"elevator","as_id":10922,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Элитный жилой комплекс \"Каскад\"","as_item_name":"elite_house_cascad","as_id":10139,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Элитный небоскреб","as_item_name":"elite_skyscraper","as_id":12317,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Элитный небоскреб","as_item_name":"elite_skyscraper_real","as_id":12318,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Эмпайр-стейт-билдинг","as_item_name":"empire_state_building","as_id":11207,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Эмпайр-стейт-билдинг","as_item_name":"empire_state_building_real","as_id":11208,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Моторное масло","as_item_name":"engine_oil","as_id":12102,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Оборудование для фотосъемки","as_item_name":"equipment_for_photography","as_id":13008,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Оборудование для исследований","as_item_name":"equipment_for_research","as_id":12110,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Оборудование для реставрации","as_item_name":"equipment_for_restoration","as_id":12107,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Эскалаторы","as_item_name":"escalator","as_id":11421,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Башня Эврика","as_item_name":"eureka_tower","as_id":12321,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Башня Эврика","as_item_name":"eureka_tower_real","as_id":12322,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Эксклюзивная мебель","as_item_name":"exclusive_furniture","as_id":10584,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Система выхлопа","as_item_name":"exhaust_system","as_id":11479,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Exp","as_item_name":"exp","as_id":11700,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Вытяжка","as_item_name":"extract","as_id":12119,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Скейт-площадка","as_item_name":"extreme_place","as_id":11211,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Скейт-площадка","as_item_name":"extreme_place_new_real","as_id":12331,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Скейт-площадка","as_item_name":"extreme_place_real","as_id":11212,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Плиты облицовки","as_item_name":"facing_plates","as_id":11411,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Автоцентр","as_item_name":"factory_car_center","as_id":10409,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Автоцентр","as_item_name":"factory_car_center_real","as_id":10410,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Экспериментальная теплица","as_item_name":"factory_farm","as_id":10405,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Экспериментальная теплица","as_item_name":"factory_farm_real","as_id":10406,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Исследовательский центр","as_item_name":"factory_research_center","as_id":10407,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Исследовательский центр","as_item_name":"factory_research_center_real","as_id":10408,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Рынок","as_item_name":"farmers_market","as_id":10311,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Удобрения для огорода","as_item_name":"fertilizers","as_id":10518,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Волокнистые полуфабрикаты","as_item_name":"fiber_by_products","as_id":10546,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Аэродромные световые указатели","as_item_name":"field_columns","as_id":10995,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Фильтры","as_item_name":"filter","as_id":10940,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Пожарная станция","as_item_name":"fire_station","as_id":10310,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Пожарная станция","as_item_name":"fire_station_new_real","as_id":12342,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Пожарная станция","as_item_name":"fire_station_real","as_id":10323,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Пожарная машина","as_item_name":"fire_track","as_id":10952,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Большой пруд","as_item_name":"fish_pond","as_id":10221,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Большой пруд","as_item_name":"fish_pond_real","as_id":10222,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Спортивные тренажеры","as_item_name":"fitness_equipment","as_id":10999,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Слесарь котельной","as_item_name":"fitter_boiler","as_id":12009,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Крепежи","as_item_name":"fixture","as_id":10931,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Флагшток","as_item_name":"flagpole","as_id":10977,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сигнальная ракетница","as_item_name":"flare_pistol","as_id":10965,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Импульсные лампы","as_item_name":"flashlights","as_id":11452,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Гибкие шланги","as_item_name":"flexible_pipes","as_id":10975,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Футбольный стадион","as_item_name":"football_stadium","as_id":10343,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Футбольный стадион","as_item_name":"football_stadium_new_real","as_id":12328,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Футбольный стадион","as_item_name":"football_stadium_real","as_id":10344,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Мост","as_item_name":"forest","as_id":10811,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Фонтан Авзония","as_item_name":"fountain_ausonius_real","as_id":10288,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Фонтан со статуей","as_item_name":"fountain","as_id":10214,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан со слоном","as_item_name":"fountain_elephant","as_id":11852,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан со слоном","as_item_name":"fountain_elephant_real","as_id":11853,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Фонтан Фарбер","as_item_name":"fountain_farber","as_id":11864,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан Фарбер","as_item_name":"fountain_farber_real","as_id":11865,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Фонтан Гранде","as_item_name":"fountain_grande","as_id":11862,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан Гранде","as_item_name":"fountain_grande_real","as_id":11863,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Фонтан со статуей","as_item_name":"fountain_real","as_id":10220,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Фонтан Токио","as_item_name":"fountain_tokyo","as_id":11848,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан Токио","as_item_name":"fountain_tokyo_real","as_id":11849,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Железная дорога","as_item_name":"free_railroad","as_id":11958,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Железнодорожный тоннель","as_item_name":"free_railroad_tunnel1","as_id":11974,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"free_railroad_tunnel2","as_id":11975,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"free_railroad_tunnel3","as_id":11976,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Дорога","as_item_name":"free_road","as_id":10003,"as_buy_as_gift":null,"as_shop_department":"roads"},{"as_description":"Свежие овощи","as_item_name":"fresh_vegetables","as_id":10501,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Фруктовый парк","as_item_name":"fruit_park","as_id":11884,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фруктовый парк","as_item_name":"fruit_park_real","as_id":11885,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Заправочная станция","as_item_name":"fuel_station","as_id":10980,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мебель из ценных пород дерева","as_item_name":"furniture","as_id":10927,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мебель","as_item_name":"furniture_contract","as_id":10548,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Мебельная фабрика","as_item_name":"furniture_factory","as_id":11825,"as_buy_as_gift":null,"as_shop_department":"furniture"},{"as_description":"Мебельная фабрика","as_item_name":"furniture_factory_real","as_id":11826,"as_buy_as_gift":null,"as_shop_department":"furniture"},{"as_description":"Модернизированная мебельная фабрика","as_item_name":"furniture_factory_stage2","as_id":11827,"as_buy_as_gift":null,"as_shop_department":"furniture"},{"as_description":"Жилой комплекс \"Галеон\"","as_item_name":"galleon_house","as_id":10174,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Галеон\"","as_item_name":"galleon_house_real","as_id":10175,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Емкости для газа","as_item_name":"gas_capacity","as_id":10934,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Газовый фильтр","as_item_name":"gas_filter","as_id":11477,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Противогазы","as_item_name":"gas_masks","as_id":11437,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Расширенная газовая электростанция","as_item_name":"gas_power_station","as_id":10491,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство газовой электростанции","as_item_name":"gas_power_station_buildsite","as_id":10486,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство газовой электростанции","as_item_name":"gas_power_station_buildsite_real","as_id":10487,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство газовой электростанции","as_item_name":"gas_power_station_buildsite_real_level","as_id":10488,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Газовая электростанция","as_item_name":"gas_power_station_buildsite_stage1","as_id":10489,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Газовая электростанция","as_item_name":"gas_power_station_buildsite_stage2","as_id":10490,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Газовое месторождение","as_item_name":"gas_power_station_place2","as_id":10834,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Газовое месторождение","as_item_name":"gas_power_station_place3","as_id":10835,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Газовое месторождение","as_item_name":"gas_power_station_place","as_id":10833,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Гидравлический якорь","as_item_name":"gas_sand_anchor","as_id":11481,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Заправка","as_item_name":"gas_station","as_id":10307,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Газлифт","as_item_name":"gaslift","as_id":10246,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Газлифт","as_item_name":"gaslift_buildsite","as_id":10245,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Проект \"Газлифт\"","as_item_name":"gaslift_place","as_id":10812,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Шасси для самолета","as_item_name":"gear","as_id":11448,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Геолог","as_item_name":"geologist","as_id":12013,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Геотекстиль","as_item_name":"geotextiles","as_id":12118,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Стекло","as_item_name":"glass","as_id":10921,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"","as_item_name":"gold","as_id":11703,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сусальное золото","as_item_name":"gold_leaf","as_id":10926,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мячи для гольфа","as_item_name":"golf_balls","as_id":11471,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Гольф-кар","as_item_name":"golf_car","as_id":11472,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство Гольф-клуба","as_item_name":"golf_club_buildsite","as_id":11821,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство Гольф-клуба","as_item_name":"golf_club_buildsite_real","as_id":11822,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство Гольф-клуба","as_item_name":"golf_club_stage1","as_id":11823,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Гольф-клуб","as_item_name":"golf_club_stage2","as_id":11824,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Правительственные заседания","as_item_name":"government_proceedings","as_id":10563,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Установка ГЛОНАСС","as_item_name":"gps_systems","as_id":10532,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Зерновой кофе","as_item_name":"grain_coffee","as_id":10502,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Жилой комплекс \"Грани\"","as_item_name":"grain_house","as_id":10170,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Грани\"","as_item_name":"grain_house_real","as_id":10171,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Гранитные плиты","as_item_name":"granite_plates","as_id":11410,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Большой парк","as_item_name":"great_park","as_id":11866,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Большой парк","as_item_name":"great_park_real","as_id":11867,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Деревянный дом","as_item_name":"green_bungalow","as_id":10109,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Зеленый коттедж","as_item_name":"green_cottage","as_id":10104,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Цветочная клумба","as_item_name":"green_flower_patch","as_id":10203,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Зеленый новогодний шар","as_item_name":"green_new_year_ball","as_id":10944,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Продуктовые тележки","as_item_name":"grocery_carts","as_id":11493,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Защитное ограждение","as_item_name":"guardrails","as_id":12139,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сигнальные флажки","as_item_name":"hand_flags","as_id":10962,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Начальник газовой станции","as_item_name":"head_gas_station","as_id":12010,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сквер с сердцем","as_item_name":"heart_park","as_id":10274,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Нагревательный элемент","as_item_name":"heating_element","as_id":11488,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Вертолетная площадка","as_item_name":"heliport","as_id":10923,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Шлем","as_item_name":"helm","as_id":12101,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Элитные квартиры","as_item_name":"high_rise_apartment","as_id":10128,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Элитные квартиры","as_item_name":"high_rise_apartment_real","as_id":10130,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Забор под напряжением","as_item_name":"high_voltage_fence","as_id":11436,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Перевозки экспресс класса","as_item_name":"highspeed_transportation","as_id":11807,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Статуя","as_item_name":"historic_statue","as_id":10209,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Исторический музей","as_item_name":"historical_museum","as_id":11273,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Исторический музей","as_item_name":"historical_museum_real","as_id":11274,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Хоккейный набор","as_item_name":"hockey_set","as_id":10948,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Поликлиника","as_item_name":"hospital","as_id":10314,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Поликлиника","as_item_name":"hospital_new_real","as_id":12343,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Поликлиника","as_item_name":"hospital_real","as_id":10332,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Отель","as_item_name":"hotel","as_id":10106,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Отель \"Континенталь\"","as_item_name":"hotel_continent","as_id":10138,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Отель \"Континенталь\"","as_item_name":"hotel_continent_real","as_id":10142,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Отель \"Континенталь\"","as_item_name":"hotel_continent_real_level","as_id":10143,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Отель \"Ренессанс\"","as_item_name":"hotel_renaissance","as_id":10176,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Отель \"Ренессанс\"","as_item_name":"hotel_renaissance_real","as_id":10177,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"ГЭС","as_item_name":"hps_buildsite","as_id":10708,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС","as_item_name":"hps_buildsite_real","as_id":10709,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС","as_item_name":"hps_buildsite_real_level","as_id":10710,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС, 1 гидроагрегат","as_item_name":"hps_hydroelectric1","as_id":10714,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС, 2 гидроагрегата","as_item_name":"hps_hydroelectric2","as_id":10715,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС, 3 гидроагрегата","as_item_name":"hps_hydroelectric3","as_id":10716,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС, 4 гидроагрегата","as_item_name":"hps_hydroelectric4","as_id":10717,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС, 5 гидроагрегатов","as_item_name":"hps_hydroelectric5","as_id":10718,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС","as_item_name":"hps_stage1","as_id":10711,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС","as_item_name":"hps_stage2","as_id":10712,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"ГЭС","as_item_name":"hps_stage3","as_id":10713,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Перевозки класса люкс","as_item_name":"hs_comfort_transportation","as_id":11809,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Гидрогенераторы","as_item_name":"hydraulic_generator","as_id":10918,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Гидротурбины","as_item_name":"hydraulic_turbine","as_id":10917,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Гидравлическая система","as_item_name":"hydraulics","as_id":11459,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"ГЭС","as_item_name":"hydroelectric_power_station_place","as_id":10804,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Гигрограф","as_item_name":"hygrograph","as_id":12108,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство гипермаркета","as_item_name":"hypermarket_buildsite","as_id":11868,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство гипермаркета","as_item_name":"hypermarket_buildsite_real","as_id":11869,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство гипермаркета","as_item_name":"hypermarket_stage1","as_id":11870,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Гипермаркет","as_item_name":"hypermarket_stage2","as_id":11871,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство ледовой арены","as_item_name":"ice_arena_buildsite","as_id":11878,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство ледовой арены","as_item_name":"ice_arena_buildsite_real","as_id":11879,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство ледовой арены","as_item_name":"ice_arena_stage1","as_id":11880,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Ледовая арена","as_item_name":"ice_arena_stage2","as_id":11881,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Повозка с мороженым","as_item_name":"ice_cream_cart","as_id":11858,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Повозка с мороженым","as_item_name":"ice_cream_cart_real","as_id":11859,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Ледяная горка","as_item_name":"ice_run","as_id":10254,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Идентификационная система","as_item_name":"iff","as_id":11407,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Иглу","as_item_name":"igloo","as_id":10253,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"iMeg","as_item_name":"imeg","as_id":10955,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Улучшенная водонапорная башня","as_item_name":"improved_water_tower_was","as_id":11002,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Улучшенная водонапорная башня","as_item_name":"improved_water_tower_was_od","as_id":11009,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Улучшенная водонапорная башня","as_item_name":"improved_water_tower_was_real","as_id":11003,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Пиломатериалы","as_item_name":"industrial_wood","as_id":10543,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Информационное табло","as_item_name":"information_board","as_id":11423,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Межконтинентальные авиаперевозки","as_item_name":"intercontinental_air_freight","as_id":10559,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Международный финансовый центр","as_item_name":"international_finance_center_real","as_id":11277,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Международные пассажирские перевозки","as_item_name":"international_passenger_traffic","as_id":10593,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Инвестиционные операции","as_item_name":"investments","as_id":10567,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Приглашенные","as_item_name":"invitees","as_id":11704,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Ионитный фильтр","as_item_name":"ion_filter","as_id":10959,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Храм Исэ","as_item_name":"ise_shrine","as_id":11238,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Храм Исэ","as_item_name":"ise_shrine_real","as_id":11239,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Островной Отель","as_item_name":"island_hotel_buildsite","as_id":10231,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_buildsite_real","as_id":10232,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_buildsite_real_level","as_id":10233,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_complete","as_id":10238,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной отель","as_item_name":"island_hotel_place","as_id":10805,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Островной Отель","as_item_name":"island_hotel_stage2","as_id":10234,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_stage3","as_id":10235,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_stage4","as_id":10236,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Островной Отель","as_item_name":"island_hotel_stage5","as_id":10237,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Вилла в стиле барокко","as_item_name":"italian_villa","as_id":10129,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Вилла в стиле барокко","as_item_name":"italian_villa_real","as_id":10131,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Станок-качалка","as_item_name":"jack","as_id":10933,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Антирадар","as_item_name":"jammer","as_id":11440,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Дом в японском стиле","as_item_name":"japan_house","as_id":10123,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сакура","as_item_name":"japanese_cherry","as_id":10215,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Сакура","as_item_name":"japanese_cherry_real","as_id":10210,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Пруд в японском стиле","as_item_name":"japanese_pond","as_id":10217,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Пруд в японском стиле","as_item_name":"japanese_pond_real","as_id":10219,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Ювелирные украшения","as_item_name":"jewelry","as_id":10514,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Башня Джона Хэнкока","as_item_name":"john_hancock_tower","as_id":11236,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Башня Джона Хэнкока","as_item_name":"john_hancock_tower_real","as_id":11237,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство Карнакского храма","as_item_name":"karnak_temple_buildsite","as_id":11910,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Карнакского храма","as_item_name":"karnak_temple_buildsite_real","as_id":11911,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Карнакского храма","as_item_name":"karnak_temple_buildsite_real_level","as_id":11912,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Карнакский храм","as_item_name":"karnak_temple_place","as_id":10842,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство Карнакского храма","as_item_name":"karnak_temple_stage1","as_id":11913,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Карнакский храм","as_item_name":"karnak_temple_stage2","as_id":11914,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Электрические чайники","as_item_name":"kettles","as_id":10505,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Большой корейский дом","as_item_name":"ko_house_big","as_id":10153,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Средний корейский дом","as_item_name":"ko_house_mid","as_id":10152,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Малый корейский дом","as_item_name":"ko_house_small","as_id":10151,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Кремль","as_item_name":"kremlin","as_id":10384,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Кремль","as_item_name":"kremlin_real","as_id":10385,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Многоквартирный дом","as_item_name":"large_apartment","as_id":10118,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Улучшенная станция метро","as_item_name":"large_metro","as_id":11805,"as_buy_as_gift":null,"as_shop_department":"metro"},{"as_description":"Большое депо","as_item_name":"large_subway_depot","as_id":11816,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"LED освещение","as_item_name":"led_lights","as_id":11445,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Уровень","as_item_name":"level","as_id":11702,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Спасательный круг","as_item_name":"lifebuoy","as_id":10978,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Маяк","as_item_name":"lighthouse","as_id":10262,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство маяка, 1 уровень","as_item_name":"lighthouse_buildsite","as_id":10258,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство маяка, 1 уровень","as_item_name":"lighthouse_buildsite_real","as_id":10259,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство маяка, 1 уровень","as_item_name":"lighthouse_buildsite_real_level","as_id":10260,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Маяк","as_item_name":"lighthouse_place","as_id":10815,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Лампа для маяка","as_item_name":"lighthouse_projector","as_id":10963,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство маяка, 2 уровень","as_item_name":"lighthouse_stage1","as_id":10261,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Известняк","as_item_name":"limestone","as_id":12112,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Литературный скверик","as_item_name":"literary_garden","as_id":10218,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Подземная станция метро","as_item_name":"little_metro","as_id":11801,"as_buy_as_gift":null,"as_shop_department":"metro"},{"as_description":"Подземная станция метро","as_item_name":"little_metro_real","as_id":11802,"as_buy_as_gift":null,"as_shop_department":"metro"},{"as_description":"Малое депо","as_item_name":"little_subway_depot","as_id":11814,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Живой лабиринт","as_item_name":"living_labyrinth","as_id":12403,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Живой лабиринт","as_item_name":"living_labyrinth_real","as_id":12404,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Ресторан лобстеров","as_item_name":"lobster","as_id":10337,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Паровоз","as_item_name":"locomotive","as_id":10256,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Большой деревянный дом","as_item_name":"log_cabin","as_id":10110,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Деревянный дом","as_item_name":"log_hut","as_id":10101,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Смазочный материал","as_item_name":"lubricating_stuff","as_id":11474,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Камеры хранения","as_item_name":"luggage","as_id":12127,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Оборудование досмотра багажа","as_item_name":"luggage_examination_equipment","as_id":11405,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система обработки багажа","as_item_name":"luggage_processing_system","as_id":11404,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Оборудование для лесозаготовки","as_item_name":"lumber_harvesting_equipment","as_id":10547,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Жилой дом класса \"Люкс\"","as_item_name":"luxury_apartment_building","as_id":10133,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой дом класса \"Люкс\"","as_item_name":"luxury_apartment_building_real","as_id":10137,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Экодом \"Тропик\"","as_item_name":"luxury_house2","as_id":10136,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Люксовый дом","as_item_name":"luxury_house","as_id":10134,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Станки для лесозаготовки","as_item_name":"machine_harvesting","as_id":10985,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Все для дома","as_item_name":"machine_shop","as_id":10401,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Манометр","as_item_name":"manometr","as_id":12122,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Особняк","as_item_name":"mansion","as_id":10119,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Особняк","as_item_name":"mansion_level","as_id":10127,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Корпус морской пехоты","as_item_name":"marine_corps","as_id":11526,"as_buy_as_gift":null,"as_shop_department":"naval_station"},{"as_description":"Корпус морской пехоты","as_item_name":"marine_corps_real","as_id":11527,"as_buy_as_gift":null,"as_shop_department":"naval_station"},{"as_description":"Тренировка морской пехоты","as_item_name":"marine_corps_training","as_id":10568,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Пюре быстрого приготовления\n\"Давай сделаем это по-быстрому\"","as_item_name":"mashed_potatoes","as_id":10578,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Маска","as_item_name":"mask","as_id":10951,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Матримандир","as_item_name":"matrimandir","as_id":10375,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Матримандир","as_item_name":"matrimandir_real","as_id":10376,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Системы измерения и контроля","as_item_name":"measurement_system","as_id":10960,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Cлесарь","as_item_name":"mechanic","as_id":12011,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Медикаменты","as_item_name":"medicines","as_id":10509,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Мембрана","as_item_name":"membrane","as_id":11489,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Металлическое ограждение","as_item_name":"metal_fencing","as_id":11434,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Металлодетектор","as_item_name":"metals_detector","as_id":10991,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Микрочипы","as_item_name":"microchips","as_id":10527,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Наземная станция метро","as_item_name":"middle_metro","as_id":11803,"as_buy_as_gift":null,"as_shop_department":"metro"},{"as_description":"Наземная станция метро","as_item_name":"middle_metro_real","as_id":11804,"as_buy_as_gift":null,"as_shop_department":"metro"},{"as_description":"Среднее депо","as_item_name":"middle_subway_depot","as_id":11815,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Миньон Плаза","as_item_name":"mignon_plaza","as_id":12319,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Миньон Плаза","as_item_name":"mignon_plaza_real","as_id":12320,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Военная база","as_item_name":"military_base","as_id":10285,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство военной базы, 1 уровень","as_item_name":"military_base_buildsite","as_id":10280,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство военной базы, 1 уровень","as_item_name":"military_base_buildsite_real","as_id":10281,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство военной базы, 1 уровень","as_item_name":"military_base_buildsite_real_level","as_id":10282,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Военная база","as_item_name":"military_base_place","as_id":10819,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство военной базы, уровень 2","as_item_name":"military_base_stage1","as_id":10283,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство военной базы, уровень 3","as_item_name":"military_base_stage2","as_id":10284,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Разрешение на постройку военной базы","as_item_name":"military_construction_permission","as_id":13006,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Завод военной техники","as_item_name":"military_plant","as_id":11528,"as_buy_as_gift":null,"as_shop_department":"sea_naval_station"},{"as_description":"Завод военной техники","as_item_name":"military_plant_real","as_id":11529,"as_buy_as_gift":null,"as_shop_department":"sea_naval_station"},{"as_description":"Зеркала","as_item_name":"mirror","as_id":11400,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Системы видеонаблюдения","as_item_name":"monitoring_systems","as_id":10987,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Монумент Пасьон","as_item_name":"monument_pason","as_id":11850,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Монумент Пасьон","as_item_name":"monument_pason_real","as_id":11851,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Мечеть","as_item_name":"mosque","as_id":10371,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Мечеть","as_item_name":"mosque_real","as_id":10372,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Соревнование по мотоболу","as_item_name":"motoball_competition","as_id":10585,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Первенство по мотокроссу","as_item_name":"motocross_championship","as_id":10588,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Чемпионат по мотофристайлу","as_item_name":"motofreestyle_championship","as_id":10587,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Строительство мототрассы","as_item_name":"mototrail_buildsite","as_id":11905,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство мототрассы","as_item_name":"mototrail_buildsite_real","as_id":11906,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство мототрассы","as_item_name":"mototrail_buildsite_real_level","as_id":11907,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Мототрасса","as_item_name":"mototrail_place","as_id":10840,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство мототрассы","as_item_name":"mototrail_stage1","as_id":11908,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Мототрасса","as_item_name":"mototrail_stage2","as_id":11909,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Выступления по мототриалу","as_item_name":"mototrial_actions","as_id":10586,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Мост","as_item_name":"mountains","as_id":10808,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство киностудии","as_item_name":"movie_studio_buildsite","as_id":11987,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство киностудии","as_item_name":"movie_studio_buildsite_real","as_id":11988,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство киностудии","as_item_name":"movie_studio_stage1","as_id":11989,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Киностудия","as_item_name":"movie_studio_stage2","as_id":11990,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Кинотеатр","as_item_name":"movie_theatre","as_id":10306,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Билет в кино","as_item_name":"movie_ticket","as_id":13001,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Офис Microsoft","as_item_name":"ms_building","as_id":13201,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Буровые насосы","as_item_name":"mud_pump","as_id":10929,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мулета","as_item_name":"muleta","as_id":12138,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мультидисплей","as_item_name":"multidisplay","as_id":11408,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Музей Древнего Египта","as_item_name":"museum_of_ancient_egypt_buildsite","as_id":11888,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Музей Древнего Египта","as_item_name":"museum_of_ancient_egypt_buildsite_real","as_id":11889,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Музей Древнего Египта","as_item_name":"museum_of_ancient_egypt_stage1","as_id":11890,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Музей археологии","as_item_name":"museum_of_archaeology","as_id":11255,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Музей археологии","as_item_name":"museum_of_archaeology_real","as_id":11256,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Нанотрубки","as_item_name":"nanotubes","as_id":10526,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Навигационное оборудование","as_item_name":"nav_equipment","as_id":11406,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Морское дизельное топливо","as_item_name":"naval_fuel","as_id":11451,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Военно-морская база","as_item_name":"naval_station_buildsite","as_id":10446,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Военно-морская база","as_item_name":"naval_station_buildsite_real","as_id":10447,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Военно-морская база","as_item_name":"naval_station_buildsite_real_level","as_id":10448,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Военно-морская база","as_item_name":"naval_station_place","as_id":10830,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"База ВМФ","as_item_name":"naval_station_stage1","as_id":10449,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"База ВМФ","as_item_name":"naval_station_stage2","as_id":10450,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Верфь крейсеров","as_item_name":"naval_station_stage3","as_id":10451,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Верфь крейсеров","as_item_name":"naval_station_stage4","as_id":10452,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Крейсер","as_item_name":"naval_station_stage5","as_id":10453,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Крейсер","as_item_name":"naval_station_stage6","as_id":10454,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Крейсер","as_item_name":"naval_station_stage7","as_id":10455,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Крейсер","as_item_name":"naval_station_stage8","as_id":10456,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Навигационные спутники","as_item_name":"navigation_satellites","as_id":10528,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Неоновая лампа","as_item_name":"neon_lights","as_id":13004,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Замок Нойшванштайн","as_item_name":"neuschwanstein_castle","as_id":11249,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Замок Нойшванштайн","as_item_name":"neuschwanstein_castle_real","as_id":11250,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Казино","as_item_name":"new_casino","as_id":11202,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Казино","as_item_name":"new_casino_new_real","as_id":12339,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Казино","as_item_name":"new_casino_real","as_id":11203,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Реакторы на быстрых нейтронах","as_item_name":"new_fast_reactors","as_id":10542,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Испытания новых удобрений","as_item_name":"new_fertilizers","as_id":10521,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Обсерватория","as_item_name":"new_observatory","as_id":10393,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Обсерватория","as_item_name":"new_observatory_real","as_id":10394,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Аптека","as_item_name":"new_pharmacy","as_id":10395,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Аптека","as_item_name":"new_pharmacy_real","as_id":10396,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Ночной клуб","as_item_name":"night_club","as_id":11217,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Ночной клуб","as_item_name":"night_club_real","as_id":11218,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Приборы ночного видения","as_item_name":"night_vision_devices","as_id":10988,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Нина Тауэр","as_item_name":"nina_tower","as_id":11271,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Нина Тауэр","as_item_name":"nina_tower_real","as_id":11272,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Бесконтактные 3D сканеры","as_item_name":"non_contact_scanners","as_id":12109,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Лапша в Пачке","as_item_name":"noodles_in_pack","as_id":10579,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Мост","as_item_name":"north_bridge","as_id":11525,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство моста","as_item_name":"north_bridge_buildsite","as_id":11522,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство моста","as_item_name":"north_bridge_buildsite_real","as_id":11523,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство моста","as_item_name":"north_bridge_buildsite_real_level","as_id":11524,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Мост","as_item_name":"north_bridge_place","as_id":10827,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Ноутбуки","as_item_name":"notebooks","as_id":10520,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Нотр-Дам де Пари","as_item_name":"notr_dam_de_pari","as_id":11232,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Нотр-Дам де Пари","as_item_name":"notr_dam_de_pari_real","as_id":11233,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Жилой комплекс \"Новус\"","as_item_name":"novous_house","as_id":10166,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Новус\"","as_item_name":"novous_house_real","as_id":10167,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Изучение технологий диагностики","as_item_name":"nuclear_medicine","as_id":10540,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Обсерватория","as_item_name":"observatory","as_id":10359,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Обсерватория","as_item_name":"observatory_real","as_id":10360,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство океанариума","as_item_name":"oceanarium_buildsite","as_id":11891,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство океанариума","as_item_name":"oceanarium_buildsite_real","as_id":11892,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство океанариума","as_item_name":"oceanarium_stage1","as_id":11893,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Океанариум","as_item_name":"oceanarium_stage2","as_id":11894,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Оборудование для нефтедобычи","as_item_name":"oil_equipment","as_id":10536,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Установка налива нефти","as_item_name":"oil_loader","as_id":10973,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Нефтепровод","as_item_name":"oil_pipeline","as_id":10248,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтепровод","as_item_name":"oil_pipeline_buildsite","as_id":10247,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Проект \"Нефтепровод\"","as_item_name":"oil_pipeline_place","as_id":10813,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Нефтеприемные устройства","as_item_name":"oil_receiving_device","as_id":10974,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Нефтехранилище","as_item_name":"oil_storage","as_id":10244,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтехранилище","as_item_name":"oil_storage_buildsite","as_id":10243,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Проект \"Нефтехранилище\"","as_item_name":"oil_storage_place","as_id":10807,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Нефтяной вентиль","as_item_name":"oil_valve","as_id":10942,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Центр ядерной медицины","as_item_name":"oncologic_center","as_id":10388,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Центр ядерной медицины","as_item_name":"oncologic_center_new_real","as_id":12333,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Центр ядерной медицины","as_item_name":"oncologic_center_real","as_id":11204,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Оператор газовой станции","as_item_name":"operator_gas_station","as_id":12008,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Цветочная клумба","as_item_name":"orange_flower_patch","as_id":10230,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Оранжерея","as_item_name":"orangery","as_id":11201,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Плиты перекрытий","as_item_name":"overlap_plates","as_id":11435,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Эстакада","as_item_name":"overpass_in_place","as_id":10828,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Эстакада","as_item_name":"overpass_out_place","as_id":10829,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Кислородные баллоны","as_item_name":"oxygen_tanks","as_id":11441,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Озонатор","as_item_name":"ozonier","as_id":10961,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Упаковочное оборудование","as_item_name":"packing_equipment","as_id":12125,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Колодки","as_item_name":"pads","as_id":12128,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Краска","as_item_name":"paint","as_id":10994,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Пейнтбольная площадка","as_item_name":"paintball_field","as_id":11298,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Пейнтбольная площадка","as_item_name":"paintball_field_real","as_id":11299,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Пальмы","as_item_name":"palm1","as_id":10263,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Пальмы","as_item_name":"palm1_real","as_id":10264,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Пальмовая роща","as_item_name":"palm2","as_id":10265,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Пальмовая роща","as_item_name":"palm2_real","as_id":10266,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Пальмы","as_item_name":"palms","as_id":11417,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Упаковка бумаги","as_item_name":"paper_pack","as_id":13003,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Пляжные зонты","as_item_name":"parasol","as_id":10906,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Парк \"Гулливер\"","as_item_name":"park_gulliver","as_id":11898,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк \"Гулливер\"","as_item_name":"park_gulliver_real","as_id":11899,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Парк песчаных фигур","as_item_name":"park_sand_figures","as_id":11872,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк песчаных фигур","as_item_name":"park_sand_figures_real","as_id":11873,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Парк с гротом","as_item_name":"park_with_a_grotto","as_id":12401,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк с гротом","as_item_name":"park_with_a_grotto_real","as_id":12402,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Парк с батутом","as_item_name":"park_with_a_trampoline","as_id":11886,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк с батутом","as_item_name":"park_with_a_trampoline_real","as_id":11887,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Парковка","as_item_name":"parking","as_id":10002,"as_buy_as_gift":null,"as_shop_department":"roads"},{"as_description":"Паркетное покрытие","as_item_name":"parquet_surface","as_id":10583,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Пассажирский трап","as_item_name":"passanger_ramp","as_id":11403,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сиденья для пассажиров","as_item_name":"passenger_seats","as_id":12136,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Патрулирование воздушного пространства","as_item_name":"patrol_airspace","as_id":10575,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Морской воздушный патруль","as_item_name":"patrol_maritime_air_space","as_id":10572,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Патрулирование морских границ","as_item_name":"patrol_maritime_borders","as_id":10569,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Павильон Хянвонджон","as_item_name":"pavilion_hyanvondzhon","as_id":11542,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Павильон Хянвонджон","as_item_name":"pavilion_hyanvondzhon_real","as_id":11543,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Павильон Кёнхору","as_item_name":"pavilion_kenhoru","as_id":11544,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Павильон Кёнхору","as_item_name":"pavilion_kenhoru_real","as_id":11545,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Заводной арахис","as_item_name":"peanuts","as_id":10555,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Небоскреб Речная Жемчужина","as_item_name":"pearl_river_tower","as_id":11228,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Небоскреб Речная Жемчужина","as_item_name":"pearl_river_tower_real","as_id":11229,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Жилой комплекс \"Пегас\"","as_item_name":"pegasus_house","as_id":10164,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Пегас\"","as_item_name":"pegasus_house_real","as_id":10165,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Инвентарь для выступлений","as_item_name":"performance_gear","as_id":11467,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Салон духов","as_item_name":"perfume_salon_new_real","as_id":12340,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Салон духов","as_item_name":"perfume_salon_real","as_id":10399,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Зоомагазин","as_item_name":"pet_store","as_id":10313,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Хлопушка","as_item_name":"petard","as_id":11501,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Перевозка нефтепродуктов","as_item_name":"petroleum_products_transportation","as_id":10597,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Башни Петронас","as_item_name":"petronas_towers","as_id":10369,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Башни Петронас","as_item_name":"petronas_towers_real","as_id":10370,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Сокровища фараонов","as_item_name":"pharaon_treasure","as_id":11414,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Аптека","as_item_name":"pharmacy","as_id":10386,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Аптека","as_item_name":"pharmacy_real","as_id":10387,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Шоколадный батончик Picnic","as_item_name":"picnic","as_id":10558,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Фабрика настроения Picnic","as_item_name":"picnic_factory","as_id":10432,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Фонтан","as_item_name":"picnic_fountain","as_id":11502,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Сваи","as_item_name":"pile","as_id":10919,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Тренировка военных летчиков","as_item_name":"pilots_training","as_id":10573,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Пиццерия","as_item_name":"pizzeria","as_id":10309,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Плазменные панели","as_item_name":"plasma_panels","as_id":10517,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Пластиковые сиденья","as_item_name":"plastic_seat","as_id":11497,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Платформы","as_item_name":"platforms","as_id":12124,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Детская площадка","as_item_name":"playground","as_id":11882,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Детская площадка","as_item_name":"playground_real","as_id":11883,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Полицейское управление","as_item_name":"police_department","as_id":11213,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Полицейское управление","as_item_name":"police_department_real","as_id":11214,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Полицейский участок","as_item_name":"police_station","as_id":10308,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Полицейский участок","as_item_name":"police_station_real","as_id":11240,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Пенополиуретан","as_item_name":"polyurethane","as_id":10938,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Древопласты","as_item_name":"polywood","as_id":10544,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Попкорн","as_item_name":"popcorn","as_id":10507,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Население","as_item_name":"population","as_id":11705,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство порта, уровень 1","as_item_name":"port_buildsite","as_id":10411,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство порта, уровень 1","as_item_name":"port_buildsite_real","as_id":11016,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство порта, уровень 1","as_item_name":"port_buildsite_real_level","as_id":11017,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Порт","as_item_name":"port_place","as_id":10816,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство порта, уровень 2","as_item_name":"port_stage1","as_id":11018,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Порт","as_item_name":"port_stage2","as_id":11019,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Фонтан Посейдон","as_item_name":"poseidon","as_id":11828,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Фонтан Посейдон","as_item_name":"poseidon_real","as_id":11829,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Почтовое отделение","as_item_name":"post_office","as_id":11251,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Почтовое отделение","as_item_name":"post_office_real","as_id":11252,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Перевозки силовых трансформаторов","as_item_name":"power_transformers_transportation","as_id":10595,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Грунтовка для днища","as_item_name":"primer","as_id":10983,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Чертеж","as_item_name":"project","as_id":11430,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Проектор","as_item_name":"projector","as_id":12143,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Цветочная клумба","as_item_name":"purple_flower_patch","as_id":10205,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Пирамида","as_item_name":"pyramid","as_id":11509,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_buildsite","as_id":11503,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_buildsite_real","as_id":11504,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_buildsite_real_level2","as_id":11506,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_buildsite_real_level","as_id":11505,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Пирамида","as_item_name":"pyramid_place","as_id":10821,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_stage1","as_id":11507,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство Пирамиды","as_item_name":"pyramid_stage2","as_id":11508,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Магазин Мини-Маркет","as_item_name":"qmart","as_id":10302,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Теннисная ракетка","as_item_name":"racket","as_id":13002,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Радарные антенны","as_item_name":"radar_antenna","as_id":10969,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система радиолокации","as_item_name":"radar_ranging_system","as_id":11462,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Радиорубка","as_item_name":"radio_room","as_id":10964,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Радиостанция","as_item_name":"radio_station","as_id":10326,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Радиостанция","as_item_name":"radio_station_new_real","as_id":12325,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Радиостанция","as_item_name":"radio_station_real","as_id":10331,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Препараты с радиоизотопами","as_item_name":"radioisotopes_preparations","as_id":10541,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Железная дорога","as_item_name":"railroad","as_id":12205,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Железная дорога","as_item_name":"railroad_buildsite","as_id":12204,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железная дорога","as_item_name":"railroad_buildsite_moved","as_id":11977,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железная дорога","as_item_name":"railroad_moved","as_id":11978,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Железнодорожный тоннель","as_item_name":"railroad_tunnel1","as_id":11917,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel1_stage1","as_id":11915,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel1_stage2","as_id":11916,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"railroad_tunnel2","as_id":11957,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel2_stage1","as_id":11955,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel2_stage2","as_id":11956,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"railroad_tunnel3","as_id":11961,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel3_stage1","as_id":11959,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel3_stage2","as_id":11960,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"railroad_tunnel4","as_id":11964,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel4_stage1","as_id":11962,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel4_stage2","as_id":11963,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Железнодорожный тоннель","as_item_name":"railroad_tunnel5","as_id":11967,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel5_stage1","as_id":11965,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство железнодорожного тоннеля","as_item_name":"railroad_tunnel5_stage2","as_id":11966,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Рельсы","as_item_name":"rails","as_id":11419,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Скрепления для рельсов","as_item_name":"rails_fasteners","as_id":12120,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Красный шар","as_item_name":"red_ball","as_id":10255,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Красный коттедж","as_item_name":"red_cottage","as_id":10102,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Цветочная клумба","as_item_name":"red_flower_patch","as_id":10201,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"ЗАГС","as_item_name":"registry_office","as_id":10389,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"ЗАГС","as_item_name":"registry_office_real","as_id":10390,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Мониторинг воздушной среды","as_item_name":"remote_sensing","as_id":10553,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Спасательный катер","as_item_name":"rescue_vessel","as_id":11458,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Резервуар","as_item_name":"reservoir","as_id":10968,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Таунхаус","as_item_name":"residential_house","as_id":10140,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Таунхаус","as_item_name":"residential_house_real","as_id":10141,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Популярность","as_item_name":"respect","as_id":11707,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Отель \"Седьмое Небо\"","as_item_name":"rich_hotel","as_id":10132,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Отель \"Седьмое Небо\"","as_item_name":"rich_hotel_real","as_id":10135,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Мост","as_item_name":"river","as_id":10809,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Насосы речные","as_item_name":"river_pump","as_id":10907,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Жилой комплекс \"Ривьера\"","as_item_name":"rivera_house","as_id":10168,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Ривьера\"","as_item_name":"rivera_house_real","as_id":10169,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Дорога","as_item_name":"road","as_id":10001,"as_buy_as_gift":null,"as_shop_department":"roads"},{"as_description":"Дорожная развязка","as_item_name":"road_junction","as_id":11515,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство дорожной развязки","as_item_name":"road_junction_buildsite","as_id":11510,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство дорожной развязки","as_item_name":"road_junction_buildsite_real","as_id":11513,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство дорожной развязки","as_item_name":"road_junction_buildsite_real_level","as_id":11514,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Дорожная развязка","as_item_name":"road_junction_place","as_id":10825,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Дорожные знаки","as_item_name":"road_signs","as_id":11432,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сырая нефть","as_item_name":"rock_tar","as_id":10534,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Центр Рокфеллера","as_item_name":"rockefeller_center","as_id":12304,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Центр Рокфеллера","as_item_name":"rockefeller_center_real","as_id":12305,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Перевозка ракетоносителей","as_item_name":"rocket_booster_transport","as_id":10554,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Рулонный газон","as_item_name":"roll_lawn","as_id":11470,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Роликовые коньки","as_item_name":"roller_skates","as_id":10950,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Раскатчик скважин","as_item_name":"roller_wells","as_id":11484,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Римский Пантеон","as_item_name":"roman_pantheon","as_id":11241,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Римский Пантеон","as_item_name":"roman_pantheon_real","as_id":11242,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Тросы","as_item_name":"rope","as_id":10902,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"АЭС-2","as_item_name":"ros_atom_power","as_id":10719,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Наладчик оборудования","as_item_name":"rr_adjuster_hardware","as_id":12024,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Проводник","as_item_name":"rr_conductor","as_id":12015,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Диспетчер","as_item_name":"rr_dispatcher","as_id":12017,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Инженер","as_item_name":"rr_engineer","as_id":12020,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Страховой агент","as_item_name":"rr_insurance_agent","as_id":12021,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Машинист","as_item_name":"rr_machinist","as_id":12025,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Управляющий","as_item_name":"rr_manager","as_id":12016,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Слесарь","as_item_name":"rr_mechanic","as_id":12026,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Грузчик","as_item_name":"rr_porter","as_id":12018,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Проектировщик","as_item_name":"rr_projector","as_id":12023,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Радиотехник","as_item_name":"rr_radioman","as_id":12022,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Путеец","as_item_name":"rr_railroader","as_id":12014,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сигнальные огни","as_item_name":"rr_signal_lights","as_id":12137,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Техник","as_item_name":"rr_technician","as_id":12019,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Рюмочная","as_item_name":"rumochnaya","as_id":10348,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Осветительное оборудование","as_item_name":"runway_equipment","as_id":10998,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Огни высокой интенсивности","as_item_name":"runway_lights","as_id":10997,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Салон спортивных автомобилей","as_item_name":"salon_sports_cars","as_id":12311,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Салон спортивных автомобилей","as_item_name":"salon_sports_cars_real","as_id":12312,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Песок","as_item_name":"sand","as_id":10904,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Песчаник","as_item_name":"sandstone","as_id":12111,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Саркофаги","as_item_name":"sarcophagus","as_id":11413,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система спутниковой связи","as_item_name":"satellite_comm_system","as_id":10989,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Спутниковая антенна","as_item_name":"satellite_dish","as_id":11443,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Сосисочная","as_item_name":"sausage","as_id":10338,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Лесопилка","as_item_name":"sawmill","as_id":10417,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Строительство лесопилки, уровень 1","as_item_name":"sawmill_buildsite","as_id":10413,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки","as_item_name":"sawmill_buildsite_new","as_id":10480,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки, уровень 1","as_item_name":"sawmill_buildsite_real","as_id":10414,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки, уровень 1","as_item_name":"sawmill_buildsite_real_level","as_id":10415,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки","as_item_name":"sawmill_buildsite_real_level_new","as_id":10482,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки","as_item_name":"sawmill_buildsite_real_new","as_id":10481,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Директор завода","as_item_name":"sawmill_director","as_id":12003,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Столяр","as_item_name":"sawmill_doorman","as_id":12006,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Замерщик","as_item_name":"sawmill_gager","as_id":12005,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сборщик мебели","as_item_name":"sawmill_integrator","as_id":12004,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Деревообрабатывающий завод","as_item_name":"sawmill_large","as_id":10485,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Автоматизированная лесопилка","as_item_name":"sawmill_middle","as_id":10484,"as_buy_as_gift":null,"as_shop_department":"special"},{"as_description":"Оператор пилорамы","as_item_name":"sawmill_operator","as_id":12007,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Место под лесопилку","as_item_name":"sawmill_place","as_id":10818,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство лесопилки","as_item_name":"sawmill_staff_buildsite","as_id":10483,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство лесопилки, уровень 2","as_item_name":"sawmill_stage1","as_id":10416,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Радиолокатор","as_item_name":"scan_radar","as_id":11454,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Школа","as_item_name":"school","as_id":10317,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Скутер","as_item_name":"scooter","as_id":10953,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Винт","as_item_name":"screw","as_id":11453,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Винтовая помпа","as_item_name":"screw_pump","as_id":10971,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Мост","as_item_name":"sea_back","as_id":10841,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Мост","as_item_name":"sea_front","as_id":10824,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"База стратегического назначения","as_item_name":"sea_naval_station_buildsite","as_id":10457,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"База стратегического назначения","as_item_name":"sea_naval_station_buildsite_real","as_id":10458,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"База стратегического назначения","as_item_name":"sea_naval_station_buildsite_real_level","as_id":10459,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Военно-морская база","as_item_name":"sea_naval_station_place","as_id":10831,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Док субмарин","as_item_name":"sea_naval_station_stage1","as_id":10460,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Док субмарин","as_item_name":"sea_naval_station_stage2","as_id":10461,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Верфь авианосцев","as_item_name":"sea_naval_station_stage3","as_id":10462,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Верфь авианосцев","as_item_name":"sea_naval_station_stage4","as_id":10463,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"sea_naval_station_stage5","as_id":10464,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"sea_naval_station_stage6","as_id":10465,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"sea_naval_station_stage7","as_id":10466,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Истребитель","as_item_name":"sea_naval_station_stage8","as_id":10467,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Башня Уиллис","as_item_name":"sears_tower","as_id":11215,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Башня Уиллис","as_item_name":"sears_tower_real","as_id":11216,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Завод сверхсекретных разработок","as_item_name":"secret_military_plant","as_id":11531,"as_buy_as_gift":null,"as_shop_department":"sea_naval_station"},{"as_description":"Охранник","as_item_name":"security","as_id":12002,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Сепаратор","as_item_name":"separator","as_id":11490,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Шанхайский финансовый центр","as_item_name":"shanhai_finance_center_real","as_id":11278,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Сигнальные лампы","as_item_name":"signal_lights","as_id":11446,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Истребители шестого поколения","as_item_name":"six_gen_fighter","as_id":10576,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Коньки","as_item_name":"skates","as_id":11499,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Горнолыжный подъемник","as_item_name":"ski_lift","as_id":12141,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство искусственного лыжного склона","as_item_name":"ski_slope_buildsite","as_id":11979,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство искусственного лыжного склона","as_item_name":"ski_slope_buildsite_real","as_id":11980,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство искусственного лыжного склона","as_item_name":"ski_slope_stage1","as_id":11981,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Искусственный лыжный склон","as_item_name":"ski_slope_stage2","as_id":11982,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Скиммеры","as_item_name":"skimmer","as_id":12146,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Обшивка вагонов","as_item_name":"skin_car","as_id":12129,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Небоскреб","as_item_name":"skyscraper","as_id":10339,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Небоскреб","as_item_name":"skyscraper_new_real","as_id":12345,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Небоскреб","as_item_name":"skyscraper_real","as_id":10341,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Сани","as_item_name":"sledge","as_id":10250,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Шпалы","as_item_name":"sleeper","as_id":12116,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Дом с бассейном на крыше","as_item_name":"small_apartment","as_id":10117,"as_buy_as_gift":false,"as_shop_department":"houses"},{"as_description":"Дом с бассейном на крыше","as_item_name":"small_apartment_real","as_id":10113,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Маленький японский дом","as_item_name":"small_japan_house","as_id":10124,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Офисное здание","as_item_name":"small_office_building","as_id":10304,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Офисное здание","as_item_name":"small_office_building_new_real","as_id":12323,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Офисное здание","as_item_name":"small_office_building_real","as_id":10321,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Снежный шар","as_item_name":"snow_ball","as_id":10947,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Снежный заяц","as_item_name":"snow_bunny","as_id":10249,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Снежная крепость","as_item_name":"snow_fortress","as_id":10257,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Генератор снега","as_item_name":"snow_generator","as_id":12140,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Снеговик","as_item_name":"snowman","as_id":10252,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Софит","as_item_name":"soffit","as_id":12144,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Технология очистки почвы бактериями","as_item_name":"soil_cleaning_technology_with_bacterias","as_id":10523,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Солнечные батареи","as_item_name":"solar_cells","as_id":10515,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Солнечная электростанция","as_item_name":"solar_power","as_id":10702,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Солнечная электростанция","as_item_name":"solar_power_real","as_id":10705,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Изоляционные материалы","as_item_name":"soundproof_materials","as_id":11424,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство музея космонавтики","as_item_name":"space_museum_buildsite","as_id":11983,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство музея космонавтики","as_item_name":"space_museum_buildsite_real","as_id":11984,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство музея космонавтики","as_item_name":"space_museum_stage1","as_id":11985,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Музей космонавтики","as_item_name":"space_museum_stage2","as_id":11986,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спиральная башня","as_item_name":"spiral_tower","as_id":12313,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спиральная башня","as_item_name":"spiral_tower_real","as_id":12314,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Спорткары","as_item_name":"sport_cars","as_id":10529,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex","as_id":10294,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_garnier","as_id":10298,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс Гарньер","as_item_name":"sport_complex_garnier_stage1","as_id":10295,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс Гарньер","as_item_name":"sport_complex_garnier_stage2","as_id":10296,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс Гарньер","as_item_name":"sport_complex_garnier_stage3","as_id":10297,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_stage1","as_id":10289,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_stage1_real","as_id":10290,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_stage2","as_id":10291,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_stage3","as_id":10292,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спортивный комплекс","as_item_name":"sport_complex_stage4","as_id":10293,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Спорттовары","as_item_name":"sport_shoes","as_id":10508,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Трамплины","as_item_name":"springboard","as_id":11402,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"SQ-Сити","as_item_name":"sq_city_buildsite","as_id":10439,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"SQ-Сити","as_item_name":"sq_city_buildsite_real","as_id":10440,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Комплекс Хитон","as_item_name":"sq_city_stage1","as_id":10441,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Башня Сити Центр","as_item_name":"sq_city_stage2","as_id":10442,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Башни Унигард","as_item_name":"sq_city_stage3","as_id":10443,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Башня Мирабелла","as_item_name":"sq_city_stage4","as_id":10444,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Комплекс Атриум","as_item_name":"sq_city_stage5","as_id":10445,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Селекция квадратных арбузов","as_item_name":"square_watermelons","as_id":10522,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"НИЯУ","as_item_name":"srnu_factory","as_id":10412,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"НИЯУ","as_item_name":"srnu_factory_real","as_id":10431,"as_buy_as_gift":null,"as_shop_department":"city_factories"},{"as_description":"Собор Василия Блаженного","as_item_name":"st_basils_cathedral","as_id":10373,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Собор Василия Блаженного","as_item_name":"st_basils_cathedral_real","as_id":10374,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Статуя льва","as_item_name":"statue_of_a_lion","as_id":11830,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Статуя льва","as_item_name":"statue_of_a_lion_real","as_id":11831,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Статуя Христа-Искупителя","as_item_name":"statue_of_christ","as_id":12303,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Статуя Христа-Искупителя","as_item_name":"statue_of_christ_real","as_id":12306,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Статуя Свободы","as_item_name":"statue_of_liberty","as_id":10367,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Статуя Свободы","as_item_name":"statue_of_liberty_real","as_id":10368,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Испытания самолетов-невидимок","as_item_name":"stealth_aircraft_tests","as_id":10561,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Стелс пластины","as_item_name":"stealth_plating","as_id":11455,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Листы стали","as_item_name":"steel","as_id":10930,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Железные балки","as_item_name":"steel_girder","as_id":10903,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Арматура","as_item_name":"steel_reinforcing","as_id":10993,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Подруливающие устройства","as_item_name":"steering_device","as_id":10982,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Каменные блоки","as_item_name":"stone_blocks","as_id":11409,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Стоунхендж","as_item_name":"stonehenge","as_id":10365,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Стоунхендж","as_item_name":"stonehenge_real","as_id":10366,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Кладовщик","as_item_name":"storekeeper","as_id":12001,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Тензометр","as_item_name":"strainmeter","as_id":11475,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Изучение древних артефактов","as_item_name":"study_of_ancient_artifacts","as_id":10592,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Изучение древней письменности","as_item_name":"study_of_ancient_writing","as_id":10590,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Субмарины","as_item_name":"submarines","as_id":10570,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Суборбитальные космические полеты","as_item_name":"suborbital_flight","as_id":10562,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Пригородные пассажирские перевозки","as_item_name":"suburban_passanger_transportation","as_id":10598,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Строительство депо","as_item_name":"subway_depot_buildsite","as_id":11810,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство депо","as_item_name":"subway_depot_buildsite_real","as_id":11811,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство депо","as_item_name":"subway_depot_buildsite_real_level2","as_id":11813,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство депо","as_item_name":"subway_depot_buildsite_real_level","as_id":11812,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Депо метрополитена","as_item_name":"subway_depot_place","as_id":10822,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Солнечный парк","as_item_name":"sun_park","as_id":11546,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Солнечный парк","as_item_name":"sun_park_real","as_id":11547,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Лежаки","as_item_name":"sunbed","as_id":10905,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Суперскоростные пассажирские перевозки","as_item_name":"superfast_passenger_transportation","as_id":10596,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Радиолокатор обнаружения","as_item_name":"surveillance_radar","as_id":11460,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Суши бар","as_item_name":"sushi_bar","as_id":10315,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Суши бар","as_item_name":"sushi_bar_new_real","as_id":12334,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Суши бар","as_item_name":"sushi_bar_real","as_id":10333,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Бассейн","as_item_name":"swimming_pool","as_id":10318,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Бассейн","as_item_name":"swimming_pool_new_real","as_id":12344,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Бассейн","as_item_name":"swimming_pool_real","as_id":10324,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Системы экстренной остановки","as_item_name":"system_emergency_stop","as_id":10914,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система аварийного слива нефти","as_item_name":"system_plum_oil","as_id":10939,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система подкачки газа","as_item_name":"system_swap_gas","as_id":11480,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Тайбэй 101","as_item_name":"taipei","as_id":11243,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Тайбэй 101","as_item_name":"taipei_real","as_id":11244,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Тадж-Махал","as_item_name":"taj_mahal","as_id":11263,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Тадж-Махал","as_item_name":"taj_mahal_real","as_id":11264,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Налоговая","as_item_name":"tax_collector","as_id":10353,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Налоговая","as_item_name":"tax_collector_new_real","as_id":12324,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Налоговая","as_item_name":"tax_collector_real","as_id":10354,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Тавр","as_item_name":"tee","as_id":11476,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система телеметрии","as_item_name":"telemetry_system","as_id":12134,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Тельфер","as_item_name":"telpher","as_id":10932,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Теннисный корт","as_item_name":"tennis_court","as_id":10320,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Теннисный корт","as_item_name":"tennis_court_new_real","as_id":12326,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Теннисный корт","as_item_name":"tennis_court_real","as_id":10322,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Палатка с шарами","as_item_name":"tent_with_balls","as_id":11860,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Палатка с шарами","as_item_name":"tent_with_balls_real","as_id":11861,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Камера испытаний","as_item_name":"test_chamber","as_id":11464,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Текстиль","as_item_name":"textile","as_id":10533,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Тайский ресторан","as_item_name":"thai_restaurant","as_id":11259,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Тайский ресторан","as_item_name":"thai_restaurant_real","as_id":11260,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Театр","as_item_name":"theater","as_id":11209,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Театр","as_item_name":"theater_real","as_id":11210,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Термоупаковщик","as_item_name":"thermal_packer","as_id":11494,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"ТЭЦ","as_item_name":"thermal_power","as_id":10703,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"ТЭЦ","as_item_name":"thermal_power_real","as_id":10706,"as_buy_as_gift":true,"as_shop_department":"power"},{"as_description":"Терморегулятор","as_item_name":"thermostat","as_id":11466,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Билеты","as_item_name":"tickets","as_id":11428,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство приливной электростанции","as_item_name":"tidal_power_station_buildsite","as_id":11832,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство приливной электростанции","as_item_name":"tidal_power_station_buildsite_real","as_id":11833,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство приливной электростанции","as_item_name":"tidal_power_station_buildsite_real_level2","as_id":11835,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство приливной электростанции","as_item_name":"tidal_power_station_buildsite_real_level","as_id":11834,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Приливная электростанция","as_item_name":"tidal_power_station_place","as_id":10838,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство приливной электростанции","as_item_name":"tidal_power_station_stage1","as_id":11836,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Приливная ЭС, 1 гидротурбогенератор","as_item_name":"tidal_power_station_stage2","as_id":11837,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Приливная ЭС, 2 гидротурбогенератора","as_item_name":"tidal_power_station_stage3","as_id":11838,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Приливная ЭС, 3 гидротурбогенератора","as_item_name":"tidal_power_station_stage4","as_id":11839,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Плитка","as_item_name":"tile","as_id":10924,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Автопокрышки","as_item_name":"tires","as_id":10510,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Торпеды","as_item_name":"torpedoes","as_id":11456,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Турникеты","as_item_name":"tourniquet","as_id":11422,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Полотенца","as_item_name":"towels","as_id":11416,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Пизанская башня","as_item_name":"tower_of_pisa","as_id":11227,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Торговля на бирже","as_item_name":"trading","as_id":10564,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Светофоры","as_item_name":"traffic_light","as_id":11420,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Восточная ЖД станция","as_item_name":"train_east_station_place","as_id":10845,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство восточной ЖД станции","as_item_name":"train_east_station_stage1","as_id":11932,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство восточной ЖД станции","as_item_name":"train_east_station_stage1_real","as_id":11933,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство восточной ЖД станции","as_item_name":"train_east_station_stage1_real_level","as_id":11934,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство восточной ЖД станции","as_item_name":"train_east_station_stage2","as_id":11935,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Восточная ЖД станция","as_item_name":"train_east_station_stage3","as_id":11936,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Восточная ЖД станция","as_item_name":"train_east_station_stage4","as_id":11937,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Восточная ЖД станция","as_item_name":"train_east_station_stage5","as_id":11938,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтеналивная станция","as_item_name":"train_oil_loading_station_place","as_id":10843,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство нефтеналивной станции","as_item_name":"train_oil_loading_station_stage1","as_id":11918,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство нефтеналивной станции","as_item_name":"train_oil_loading_station_stage1_real","as_id":11919,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство нефтеналивной станции","as_item_name":"train_oil_loading_station_stage1_real_level","as_id":11920,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство нефтеналивной станции","as_item_name":"train_oil_loading_station_stage2","as_id":11921,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтеналивная станция","as_item_name":"train_oil_loading_station_stage3","as_id":11922,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтеналивная станция","as_item_name":"train_oil_loading_station_stage4","as_id":11923,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Нефтеналивная станция","as_item_name":"train_oil_loading_station_stage5","as_id":11924,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Малая ЖД станция","as_item_name":"train_station_small_place","as_id":10844,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство малой ЖД станции","as_item_name":"train_station_small_stage1","as_id":11925,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство малой ЖД станции","as_item_name":"train_station_small_stage1_real","as_id":11926,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство малой ЖД станции","as_item_name":"train_station_small_stage1_real_level","as_id":11927,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство малой ЖД станции","as_item_name":"train_station_small_stage2","as_id":11928,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Малая ЖД станция","as_item_name":"train_station_small_stage3","as_id":11929,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Малая ЖД станция","as_item_name":"train_station_small_stage4","as_id":11930,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Малая ЖД станция","as_item_name":"train_station_small_stage5","as_id":11931,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Система слежения за поездами","as_item_name":"trains_tracking_system","as_id":12133,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Трансформаторы","as_item_name":"transformator","as_id":10915,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Передающее устройство","as_item_name":"transmission_unit","as_id":12132,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Перевозки эконом класса","as_item_name":"transportation","as_id":11806,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Ленточный конвейер","as_item_name":"transporter","as_id":10986,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Дуб","as_item_name":"tree_oak","as_id":10208,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Дубовая аллея","as_item_name":"tree_oak_row","as_id":10216,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Тополь","as_item_name":"tree_poplar","as_id":10207,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Трубы","as_item_name":"tube","as_id":10911,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Тюбинговое кольцо","as_item_name":"tubing_ring","as_id":11425,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Тоннель любви","as_item_name":"tunnel_love","as_id":10277,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Тоннель любви","as_item_name":"tunnel_love_real","as_id":10278,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Турбореактивный двигатель","as_item_name":"turbo_jet_engine","as_id":10525,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Небоскреб Закрученный Торс","as_item_name":"turning_torso","as_id":11230,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Небоскреб Закрученный Торс","as_item_name":"turning_torso_real","as_id":11231,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Телебашня","as_item_name":"tv_tower","as_id":10340,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Телебашня","as_item_name":"tv_tower_new_real","as_id":12346,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Телебашня","as_item_name":"tv_tower_real","as_id":10342,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Подземные резервуары","as_item_name":"underground_tanks","as_id":12123,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Университет","as_item_name":"university","as_id":11245,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Университет","as_item_name":"university_real","as_id":11246,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Волейбольные мячи","as_item_name":"valleyball_ball","as_id":11415,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Клапан","as_item_name":"valve","as_id":11478,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Ваза","as_item_name":"vase","as_id":12114,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Парк чудес","as_item_name":"vender_park","as_id":11540,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Парк чудес","as_item_name":"vender_park_real","as_id":11541,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Вентиляционные киоски","as_item_name":"ventilation_booth","as_id":11427,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Система вентиляции","as_item_name":"ventilation_system","as_id":11444,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Волейбольная площадка","as_item_name":"volleyball_court","as_id":11295,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Волейбольная площадка","as_item_name":"volleyball_court_real","as_id":11296,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Регулятор напряжения","as_item_name":"voltage_regulator","as_id":11485,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Хрустящие вафли","as_item_name":"waffles","as_id":10556,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Склад","as_item_name":"warehouse","as_id":11820,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство склада","as_item_name":"warehouse_buildsite","as_id":11817,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство склада","as_item_name":"warehouse_buildsite_new_real","as_id":12329,"as_buy_as_gift":false,"as_shop_department":"leisures"},{"as_description":"Строительство склада","as_item_name":"warehouse_buildsite_real","as_id":11818,"as_buy_as_gift":false,"as_shop_department":"leisures"},{"as_description":"Склад","as_item_name":"warehouse_staff_buildsite","as_id":11819,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Система циркуляции воды","as_item_name":"water_circulation_system","as_id":11465,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Строительство водного комплекса","as_item_name":"water_complex_buildsite","as_id":11991,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Строительство водного комплекса","as_item_name":"water_complex_buildsite_real","as_id":11992,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Строительство водного комплекса","as_item_name":"water_complex_stage1","as_id":11993,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Водный комплекс","as_item_name":"water_complex_stage2","as_id":11994,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Водоподъемное оборудование","as_item_name":"water_lifting_equipment","as_id":11483,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Насосы для подачи воды","as_item_name":"water_pump","as_id":10909,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Скутеры","as_item_name":"water_scooter","as_id":11418,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Аквапарк","as_item_name":"water_slide_pool","as_id":10327,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Аквапарк","as_item_name":"water_slide_pool_new_real","as_id":12336,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Аквапарк","as_item_name":"water_slide_pool_real","as_id":10334,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Станция водоснабжения","as_item_name":"water_system_buildsite","as_id":11004,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция водоснабжения","as_item_name":"water_system_buildsite_real","as_id":11005,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция водоснабжения","as_item_name":"water_system_place","as_id":10803,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Система водоснабжения, уровень 1","as_item_name":"water_system_stage1","as_id":11006,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Система водоснабжения, уровень 2","as_item_name":"water_system_stage2","as_id":11007,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Система водоснабжения, уровень 3","as_item_name":"water_system_stage3","as_id":11008,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Водный термометр","as_item_name":"water_thermometer","as_id":13005,"as_buy_as_gift":null,"as_shop_department":"materials"},{"as_description":"Водонапорная башня","as_item_name":"water_tower","as_id":10212,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Водонапорная башня","as_item_name":"water_tower_real","as_id":10226,"as_buy_as_gift":true,"as_shop_department":"terrains"},{"as_description":"Водонапорная башня","as_item_name":"water_tower_was","as_id":11001,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Гидроизоляция","as_item_name":"waterproofing","as_id":11482,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Волногасители","as_item_name":"wave_absorber","as_id":12147,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Метеорологический зонд","as_item_name":"weather_balloon","as_id":10966,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Погодный радар","as_item_name":"weather_radar","as_id":11457,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Вестминстерское аббатство","as_item_name":"westminster_abbey","as_id":11267,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Вестминстерское аббатство","as_item_name":"westminster_abbey_real","as_id":11268,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Штурвал","as_item_name":"wheel","as_id":10976,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Ветряк","as_item_name":"wind_power","as_id":10701,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Обмотка генератора","as_item_name":"winding","as_id":11486,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Ветреный парк","as_item_name":"windy_park","as_id":10211,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Древесно-топливные гранулы","as_item_name":"wood_pellets","as_id":10545,"as_buy_as_gift":null,"as_shop_department":"contracts"},{"as_description":"Роща","as_item_name":"wooded_grove","as_id":10206,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Зеленый парк","as_item_name":"woodland_park","as_id":10213,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Борцовские ковры","as_item_name":"wrestling_mat","as_id":11401,"as_buy_as_gift":true,"as_shop_department":"materials"},{"as_description":"Станция водоподготовки","as_item_name":"wwtp_buildsite","as_id":11010,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция водоподготовки","as_item_name":"wwtp_buildsite_real","as_id":11011,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Станция водоподготовки","as_item_name":"wwtp_place","as_id":10814,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Станция водоподготовки, уровень 1","as_item_name":"wwtp_stage1","as_id":11012,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Станция водоподготовки, уровень 2","as_item_name":"wwtp_stage2","as_id":11013,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Станция водоподготовки, уровень 3","as_item_name":"wwtp_stage3","as_id":11014,"as_buy_as_gift":null,"as_shop_department":"power"},{"as_description":"Яхт-клуб","as_item_name":"yacht_club","as_id":10272,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Строительство яхт-клуба, 1 уровень","as_item_name":"yacht_club_buildsite","as_id":10267,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство яхт-клуба, 1 уровень","as_item_name":"yacht_club_buildsite_real","as_id":10268,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство яхт-клуба, 1 уровень","as_item_name":"yacht_club_buildsite_real_level","as_id":10269,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Яхт клуб","as_item_name":"yacht_club_place","as_id":10817,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Строительство яхт-клуба, уровень 2","as_item_name":"yacht_club_stage1","as_id":10270,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Строительство яхт-клуба, уровень 3","as_item_name":"yacht_club_stage2","as_id":10271,"as_buy_as_gift":null,"as_shop_department":"buildsite"},{"as_description":"Деревянный дом","as_item_name":"yellow_bungalow","as_id":10108,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Желтый коттедж","as_item_name":"yellow_cottage","as_id":10105,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Цветочная клумба","as_item_name":"yellow_flower_patch","as_id":10204,"as_buy_as_gift":null,"as_shop_department":"terrains"},{"as_description":"Юксам Билдинг","as_item_name":"yuksam_building","as_id":11223,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Юксам Билдинг","as_item_name":"yuksam_building_real","as_id":11224,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Жилой комплекс \"Зодиак\"","as_item_name":"zodiac_house","as_id":10158,"as_buy_as_gift":null,"as_shop_department":"houses"},{"as_description":"Жилой комплекс \"Зодиак\"","as_item_name":"zodiac_house_real","as_id":10159,"as_buy_as_gift":true,"as_shop_department":"houses"},{"as_description":"Зоопарк","as_item_name":"zoo","as_id":10345,"as_buy_as_gift":null,"as_shop_department":"leisures"},{"as_description":"Зоопарк","as_item_name":"zoo_new_real","as_id":12332,"as_buy_as_gift":true,"as_shop_department":"leisures"},{"as_description":"Зоопарк","as_item_name":"zoo_real","as_id":10350,"as_buy_as_gift":true,"as_shop_department":"leisures"}] ;
//"
var quanarray = [{"as_description":null,"as_item_name":null,"as_id":11530,"as_buy_as_gift":null,"as_materials_quantity_obj":{"access_control_system":5,"radar_antenna":5,"test_chamber":10}},{"as_description":null,"as_item_name":null,"as_id":10468,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulics":10,"steel_girder":10,"brick":10,"high_voltage_fence":10}},{"as_description":null,"as_item_name":null,"as_id":10469,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulics":10,"steel_girder":10,"brick":10,"high_voltage_fence":10}},{"as_description":null,"as_item_name":null,"as_id":10470,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulics":10,"steel_girder":10,"brick":10,"high_voltage_fence":10}},{"as_description":null,"as_item_name":null,"as_id":10471,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":10,"concrete_plates":10,"surveillance_radar":10,"tube":10}},{"as_description":null,"as_item_name":null,"as_id":10472,"as_buy_as_gift":null,"as_materials_quantity_obj":{"asphalt":10,"air_refueling_system":10,"radar_ranging_system":10,"bitumen":10}},{"as_description":null,"as_item_name":null,"as_id":10473,"as_buy_as_gift":null,"as_materials_quantity_obj":{"air_engine":5,"ejection_system":5,"gear":5}},{"as_description":null,"as_item_name":null,"as_id":10474,"as_buy_as_gift":null,"as_materials_quantity_obj":{"air_engine":5,"ejection_system":5,"gear":5}},{"as_description":null,"as_item_name":null,"as_id":10475,"as_buy_as_gift":null,"as_materials_quantity_obj":{"air_engine":5,"ejection_system":5,"gear":5}},{"as_description":null,"as_item_name":null,"as_id":10476,"as_buy_as_gift":null,"as_materials_quantity_obj":{"air_engine":5,"ejection_system":5,"gear":5}},{"as_description":null,"as_item_name":null,"as_id":10477,"as_buy_as_gift":null,"as_materials_quantity_obj":{"air_engine":5,"ejection_system":5,"gear":5}},{"as_description":null,"as_item_name":null,"as_id":10478,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10418,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":15,"concrete_solution":10,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10419,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":15,"concrete_solution":10,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10421,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":15,"concrete_solution":10,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10420,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":15,"concrete_solution":10,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10422,"as_buy_as_gift":null,"as_materials_quantity_obj":{"condition_system":5,"asphalt":10,"tube":10,"glass":5}},{"as_description":null,"as_item_name":null,"as_id":10423,"as_buy_as_gift":null,"as_materials_quantity_obj":{"access_control_system":15,"monitoring_systems":10,"metals_detector":15}},{"as_description":null,"as_item_name":null,"as_id":10424,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"concrete_solution":15,"sand":10}},{"as_description":null,"as_item_name":null,"as_id":10425,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":10,"tube":15,"steel_reinforcing":15}},{"as_description":null,"as_item_name":null,"as_id":10426,"as_buy_as_gift":null,"as_materials_quantity_obj":{"field_columns":10,"heliport":3,"paint":15}},{"as_description":null,"as_item_name":null,"as_id":10427,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"concrete_solution":15,"sand":10}},{"as_description":null,"as_item_name":null,"as_id":10428,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":15,"concrete_solution":10,"tube":15}},{"as_description":null,"as_item_name":null,"as_id":10429,"as_buy_as_gift":null,"as_materials_quantity_obj":{"runway_equipment":10,"runway_lights":15,"paint":15}},{"as_description":null,"as_item_name":null,"as_id":10430,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"transporter":10,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10433,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":12,"condition_system":4,"passanger_ramp":10}},{"as_description":null,"as_item_name":null,"as_id":10434,"as_buy_as_gift":null,"as_materials_quantity_obj":{"luggage_processing_system":15,"luggage_examination_equipment":10,"automatic_fire":5}},{"as_description":null,"as_item_name":null,"as_id":10435,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":20,"brick":20}},{"as_description":null,"as_item_name":null,"as_id":10436,"as_buy_as_gift":null,"as_materials_quantity_obj":{"nav_equipment":10,"condition_system":3,"glass":10}},{"as_description":null,"as_item_name":null,"as_id":10437,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":20,"radar_antenna":10,"iff":10}},{"as_description":null,"as_item_name":null,"as_id":10438,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11516,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel":5,"high_voltage_fence":10,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11517,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel":5,"high_voltage_fence":10,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11518,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel":5,"high_voltage_fence":10,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11519,"as_buy_as_gift":null,"as_materials_quantity_obj":{"armor":10,"steel_girder":10,"tube":10,"jammer":10}},{"as_description":null,"as_item_name":null,"as_id":11520,"as_buy_as_gift":null,"as_materials_quantity_obj":{"oxygen_tanks":10,"satellite_comm_system":3,"monitoring_systems":3,"gas_masks":10,"armor_vests":10,"diesel_generator":2}},{"as_description":null,"as_item_name":null,"as_id":10492,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":10493,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":10494,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":10495,"as_buy_as_gift":null,"as_materials_quantity_obj":{"geologist":1,"driller":1,"mechanic":1}},{"as_description":null,"as_item_name":null,"as_id":10496,"as_buy_as_gift":null,"as_materials_quantity_obj":{"gas_sand_anchor":10,"filter":5,"reservoir":5,"aerator":5,"decontamination_system":5,"waterproofing":10}},{"as_description":null,"as_item_name":null,"as_id":10497,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10498,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":10499,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":11901,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":5,"tube":5,"roller_wells":10,"water_pump":5,"water_lifting_equipment":10,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":11902,"as_buy_as_gift":null,"as_materials_quantity_obj":{"geologist":1,"driller":1,"mechanic":1}},{"as_description":null,"as_item_name":null,"as_id":11903,"as_buy_as_gift":null,"as_materials_quantity_obj":{"gas_sand_anchor":10,"filter":5,"reservoir":5,"aerator":5,"decontamination_system":5,"waterproofing":10}},{"as_description":null,"as_item_name":null,"as_id":11904,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11874,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"concrete_solution":5,"concrete_plates":5,"brick":5,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11875,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"concrete_solution":5,"concrete_plates":5,"brick":5,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11876,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":5,"cement":5,"plastic_seat":10,"baseball_bats":10,"glass":5,"paint":5}},{"as_description":null,"as_item_name":null,"as_id":11877,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10228,"as_buy_as_gift":null,"as_materials_quantity_obj":{"valleyball_ball":10,"tile":10,"lifebuoy":5,"glass":5,"towels":10}},{"as_description":null,"as_item_name":null,"as_id":10227,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":3,"parasol":5,"sunbed":5}},{"as_description":null,"as_item_name":null,"as_id":10229,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":3,"parasol":5,"sunbed":5}},{"as_description":null,"as_item_name":null,"as_id":11511,"as_buy_as_gift":null,"as_materials_quantity_obj":{"water_scooter":10,"condition_system":1,"palms":10,"sand":5,"pile":6,"sunbed":6}},{"as_description":null,"as_item_name":null,"as_id":10223,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rope":6,"steel_girder":2,"brick":4}},{"as_description":null,"as_item_name":null,"as_id":10225,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rope":6,"steel_girder":2,"brick":4}},{"as_description":null,"as_item_name":null,"as_id":11949,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"cargo_scales":10,"aluminum_profile":10,"bricks":10}},{"as_description":null,"as_item_name":null,"as_id":11972,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"cargo_scales":10,"aluminum_profile":10,"bricks":10}},{"as_description":null,"as_item_name":null,"as_id":11973,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"cargo_scales":10,"aluminum_profile":10,"bricks":10}},{"as_description":null,"as_item_name":null,"as_id":11950,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"cement":10,"steel_reinforcing":10,"cargo_container":10}},{"as_description":null,"as_item_name":null,"as_id":11951,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_porter":1,"rr_dispatcher":1}},{"as_description":null,"as_item_name":null,"as_id":11952,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"transmission_unit":10,"sand":10}},{"as_description":null,"as_item_name":null,"as_id":11953,"as_buy_as_gift":null,"as_materials_quantity_obj":{"trains_tracking_system":10,"scan_radar":10,"amplifier":10}},{"as_description":null,"as_item_name":null,"as_id":11954,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11939,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"concrete_plates":10,"rr_signal_lights":10,"sand":10,"brick":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11968,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"concrete_plates":10,"rr_signal_lights":10,"sand":10,"brick":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11969,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"concrete_plates":10,"rr_signal_lights":10,"sand":10,"brick":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11940,"as_buy_as_gift":null,"as_materials_quantity_obj":{"information_board":10,"escalator":10,"monitoring_systems":10,"glass":10,"steel_reinforcing":10,"passenger_seats":10}},{"as_description":null,"as_item_name":null,"as_id":11941,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_manager":1,"rr_conductor":1,"rr_railroader":1}},{"as_description":null,"as_item_name":null,"as_id":11943,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":10,"steel_girder":10,"skin_car":10,"steel":10}},{"as_description":null,"as_item_name":null,"as_id":11970,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":10,"steel_girder":10,"skin_car":10,"steel":10}},{"as_description":null,"as_item_name":null,"as_id":11971,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":10,"steel_girder":10,"skin_car":10,"steel":10}},{"as_description":null,"as_item_name":null,"as_id":11944,"as_buy_as_gift":null,"as_materials_quantity_obj":{"pads":10,"diesel_generator":10,"steel_reinforcing":10,"paint":10}},{"as_description":null,"as_item_name":null,"as_id":11945,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_engineer":1,"rr_technician":1}},{"as_description":null,"as_item_name":null,"as_id":11946,"as_buy_as_gift":null,"as_materials_quantity_obj":{"centralized_traffic_system":10,"soundproof_materials":10,"sand":10}},{"as_description":null,"as_item_name":null,"as_id":11947,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"access_control_system":10,"telemetry_system":10}},{"as_description":null,"as_item_name":null,"as_id":11948,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10377,"as_buy_as_gift":null,"as_materials_quantity_obj":{"christmas_balls":3,"hockey_set":3,"snow_ball":3,"christmas_tree":4,"green_new_year_ball":4,"blue_new_year_ball":3}},{"as_description":null,"as_item_name":null,"as_id":10378,"as_buy_as_gift":null,"as_materials_quantity_obj":{"christmas_balls":3,"hockey_set":3,"snow_ball":3,"christmas_tree":4,"green_new_year_ball":4,"blue_new_year_ball":3}},{"as_description":null,"as_item_name":null,"as_id":10379,"as_buy_as_gift":null,"as_materials_quantity_obj":{"christmas_balls":7,"hockey_set":7,"mask":6,"roller_skates":6,"snow_ball":7,"christmas_wreath":7}},{"as_description":null,"as_item_name":null,"as_id":10380,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fire_track":13,"mask":14,"roller_skates":14,"champagne":13,"imeg":13,"scooter":13}},{"as_description":null,"as_item_name":null,"as_id":11854,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":5,"steel_girder":5,"concrete_plates":5,"concrete_solution":5,"brick":5,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11855,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":5,"steel_girder":5,"concrete_plates":5,"concrete_solution":5,"brick":5,"steel_reinforcing":5}},{"as_description":null,"as_item_name":null,"as_id":11856,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tube":5,"glass":5,"circus_equipment":10,"led_lights":5,"circus_arena":10,"mirror":5}},{"as_description":null,"as_item_name":null,"as_id":11857,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":12201,"as_buy_as_gift":null,"as_materials_quantity_obj":{"muleta":10,"plastic_seat":10,"bricks":10,"guardrails":10}},{"as_description":null,"as_item_name":null,"as_id":12341,"as_buy_as_gift":null,"as_materials_quantity_obj":{"muleta":10,"plastic_seat":10,"bricks":10,"guardrails":10}},{"as_description":null,"as_item_name":null,"as_id":12202,"as_buy_as_gift":null,"as_materials_quantity_obj":{"muleta":10,"plastic_seat":10,"bricks":10,"guardrails":10}},{"as_description":null,"as_item_name":null,"as_id":12203,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11895,"as_buy_as_gift":null,"as_materials_quantity_obj":{"equipment_for_research":5,"bricks":5,"non_contact_scanners":5}},{"as_description":null,"as_item_name":null,"as_id":11896,"as_buy_as_gift":null,"as_materials_quantity_obj":{"equipment_for_research":5,"bricks":5,"non_contact_scanners":5}},{"as_description":null,"as_item_name":null,"as_id":11897,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10242,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10239,"as_buy_as_gift":null,"as_materials_quantity_obj":{"mud_pump":5,"tube":16,"transformator":3,"drill":2}},{"as_description":null,"as_item_name":null,"as_id":10240,"as_buy_as_gift":null,"as_materials_quantity_obj":{"mud_pump":5,"tube":16,"transformator":3,"drill":2}},{"as_description":null,"as_item_name":null,"as_id":10241,"as_buy_as_gift":null,"as_materials_quantity_obj":{"mud_pump":5,"tube":16,"transformator":3,"drill":2}},{"as_description":null,"as_item_name":null,"as_id":11840,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"steel":5,"tube":5,"flexible_pipes":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11841,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"steel":5,"tube":5,"flexible_pipes":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11843,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"steel":5,"tube":5,"flexible_pipes":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11842,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"steel":5,"tube":5,"flexible_pipes":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11844,"as_buy_as_gift":null,"as_materials_quantity_obj":{"reservoir":5,"demineralizers":5,"separator":5,"water_pump":5,"heating_element":10,"decontamination_system":5,"membrane":5}},{"as_description":null,"as_item_name":null,"as_id":11845,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw_pump":5,"filter":5,"separator":5,"membrane":5}},{"as_description":null,"as_item_name":null,"as_id":11846,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw_pump":5,"filter":5,"separator":5,"membrane":5}},{"as_description":null,"as_item_name":null,"as_id":11847,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11536,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"thermostat":10,"brick":5,"glass":5,"tube":5,"water_circulation_system":10}},{"as_description":null,"as_item_name":null,"as_id":11537,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"thermostat":10,"brick":5,"glass":5,"tube":5,"water_circulation_system":10}},{"as_description":null,"as_item_name":null,"as_id":11538,"as_buy_as_gift":null,"as_materials_quantity_obj":{"performance_gear":10,"filter":5,"demineralizers":5,"dolphin":10,"flexible_pipes":5,"ventilation_system":5}},{"as_description":null,"as_item_name":null,"as_id":11539,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11974,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11975,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11976,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11825,"as_buy_as_gift":null,"as_materials_quantity_obj":{"brick":5,"tube":5,"glass":5,"tee":5}},{"as_description":null,"as_item_name":null,"as_id":11826,"as_buy_as_gift":null,"as_materials_quantity_obj":{"brick":5,"tube":5,"glass":5,"tee":5}},{"as_description":null,"as_item_name":null,"as_id":10491,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10486,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"steel_girder":5,"valve":10,"brick":5,"steel_reinforcing":5,"gas_filter":10}},{"as_description":null,"as_item_name":null,"as_id":10487,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"steel_girder":5,"valve":10,"brick":5,"steel_reinforcing":5,"gas_filter":10}},{"as_description":null,"as_item_name":null,"as_id":10488,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"steel_girder":5,"valve":10,"brick":5,"steel_reinforcing":5,"gas_filter":10}},{"as_description":null,"as_item_name":null,"as_id":10489,"as_buy_as_gift":null,"as_materials_quantity_obj":{"operator_gas_station":1,"fitter_boiler":1,"head_gas_station":1}},{"as_description":null,"as_item_name":null,"as_id":10490,"as_buy_as_gift":null,"as_materials_quantity_obj":{"system_swap_gas":10,"steel":5,"exhaust_system":10,"tube":5,"flexible_pipes":5,"signal_lights":5}},{"as_description":null,"as_item_name":null,"as_id":10246,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10245,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drilling_bit":7,"gas_capacity":3,"compressor":3,"tube":10,"diesel_generator":3}},{"as_description":null,"as_item_name":null,"as_id":11821,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"roll_lawn":10,"brick":5,"glass":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11822,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"roll_lawn":10,"brick":5,"glass":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11823,"as_buy_as_gift":null,"as_materials_quantity_obj":{"golf_balls":10,"golf_car":10,"sand":5}},{"as_description":null,"as_item_name":null,"as_id":11824,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10708,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10709,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10710,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":15,"brick":15}},{"as_description":null,"as_item_name":null,"as_id":10714,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulic_turbine":1,"hydraulic_generator":1}},{"as_description":null,"as_item_name":null,"as_id":10715,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulic_turbine":1,"hydraulic_generator":1}},{"as_description":null,"as_item_name":null,"as_id":10716,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulic_turbine":1,"hydraulic_generator":1}},{"as_description":null,"as_item_name":null,"as_id":10717,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulic_turbine":1,"hydraulic_generator":1}},{"as_description":null,"as_item_name":null,"as_id":10718,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10711,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":15,"brick":10,"tube":10}},{"as_description":null,"as_item_name":null,"as_id":10712,"as_buy_as_gift":null,"as_materials_quantity_obj":{"system_emergency_stop":5,"control_panel":1,"transformator":5,"automatic_fire":1}},{"as_description":null,"as_item_name":null,"as_id":10713,"as_buy_as_gift":null,"as_materials_quantity_obj":{"hydraulic_turbine":1,"hydraulic_generator":1}},{"as_description":null,"as_item_name":null,"as_id":11868,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"grocery_carts":5,"brick":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11869,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"grocery_carts":5,"brick":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11870,"as_buy_as_gift":null,"as_materials_quantity_obj":{"banknote_detector":5,"thermal_packer":5,"monitoring_systems":5,"glass":5,"ventilation_system":5}},{"as_description":null,"as_item_name":null,"as_id":11871,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11878,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":5,"bricks":10}},{"as_description":null,"as_item_name":null,"as_id":11879,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":5,"bricks":10}},{"as_description":null,"as_item_name":null,"as_id":11880,"as_buy_as_gift":null,"as_materials_quantity_obj":{"skates":10,"tube":10,"glass":10}},{"as_description":null,"as_item_name":null,"as_id":11881,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10231,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10232,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10233,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10238,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10234,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"steel_girder":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10235,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"brick":5,"glass":5}},{"as_description":null,"as_item_name":null,"as_id":10236,"as_buy_as_gift":null,"as_materials_quantity_obj":{"condition_system":1,"tile":7,"elevator":2,"glass":3,"heliport":1}},{"as_description":null,"as_item_name":null,"as_id":10237,"as_buy_as_gift":null,"as_materials_quantity_obj":{"brazilian_marble":1,"furniture":2,"gold_leaf":3}},{"as_description":null,"as_item_name":null,"as_id":11910,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sandstone":10,"stone_blocks":5,"sand":5,"clay_bricks":5,"granite_plates":5,"limestone":10}},{"as_description":null,"as_item_name":null,"as_id":11911,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sandstone":10,"stone_blocks":5,"sand":5,"clay_bricks":5,"granite_plates":5,"limestone":10}},{"as_description":null,"as_item_name":null,"as_id":11912,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sandstone":10,"stone_blocks":5,"sand":5,"clay_bricks":5,"granite_plates":5,"limestone":10}},{"as_description":null,"as_item_name":null,"as_id":11913,"as_buy_as_gift":null,"as_materials_quantity_obj":{"column":10,"tile":10,"facing_plates":10,"granite_plates":5,"vase":10}},{"as_description":null,"as_item_name":null,"as_id":11805,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11816,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10258,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":6,"sand":2,"brick":7,"diesel_generator":1,"pile":6}},{"as_description":null,"as_item_name":null,"as_id":10259,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":6,"sand":2,"brick":7,"diesel_generator":1,"pile":6}},{"as_description":null,"as_item_name":null,"as_id":10260,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":6,"sand":2,"brick":7,"diesel_generator":1,"pile":6}},{"as_description":null,"as_item_name":null,"as_id":10261,"as_buy_as_gift":null,"as_materials_quantity_obj":{"radio_room":1,"lighthouse_projector":1,"weather_balloon":1,"hand_flags":15,"flare_pistol":8}},{"as_description":null,"as_item_name":null,"as_id":11814,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"information_board":10,"escalator":10,"monitoring_systems":10,"tube":10,"tourniquet":10}},{"as_description":null,"as_item_name":null,"as_id":11803,"as_buy_as_gift":null,"as_materials_quantity_obj":{"monitoring_systems":5,"glass":5,"tickets":10}},{"as_description":null,"as_item_name":null,"as_id":11804,"as_buy_as_gift":null,"as_materials_quantity_obj":{"monitoring_systems":5,"glass":5,"tickets":10}},{"as_description":null,"as_item_name":null,"as_id":11815,"as_buy_as_gift":null,"as_materials_quantity_obj":{"ventilation_booth":10,"conductor_rails":10,"soundproof_materials":10,"tubing_ring":10,"glass":10,"steel_reinforcing":10}},{"as_description":null,"as_item_name":null,"as_id":10280,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":4,"steel_girder":8,"sand":5,"brick":8}},{"as_description":null,"as_item_name":null,"as_id":10281,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":4,"steel_girder":8,"sand":5,"brick":8}},{"as_description":null,"as_item_name":null,"as_id":10282,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":4,"steel_girder":8,"sand":5,"brick":8}},{"as_description":null,"as_item_name":null,"as_id":10283,"as_buy_as_gift":null,"as_materials_quantity_obj":{"radar_antenna":5,"steel":10,"flare_pistol":10}},{"as_description":null,"as_item_name":null,"as_id":10284,"as_buy_as_gift":null,"as_materials_quantity_obj":{"satellite_comm_system":5,"night_vision_devices":10,"monitoring_systems":10}},{"as_description":null,"as_item_name":null,"as_id":11528,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stealth_plating":10,"scan_radar":5,"high_voltage_fence":5}},{"as_description":null,"as_item_name":null,"as_id":11529,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stealth_plating":10,"scan_radar":5,"high_voltage_fence":5}},{"as_description":null,"as_item_name":null,"as_id":11905,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":5,"aluminum_profile":5,"sand":10,"glass":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11906,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":5,"aluminum_profile":5,"sand":10,"glass":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11907,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"steel_girder":5,"aluminum_profile":5,"sand":10,"glass":5,"tube":5}},{"as_description":null,"as_item_name":null,"as_id":11908,"as_buy_as_gift":null,"as_materials_quantity_obj":{"bike":10,"engine_oil":10,"glass":5,"plastic_seat":5,"helm":10,"paint":5}},{"as_description":null,"as_item_name":null,"as_id":11987,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel_girder":10,"aluminum_profile":10,"soffit":10}},{"as_description":null,"as_item_name":null,"as_id":11988,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel_girder":10,"aluminum_profile":10,"soffit":10}},{"as_description":null,"as_item_name":null,"as_id":11989,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":10,"camera":10,"steel_reinforcing":10,"mirror":10,"paint":10}},{"as_description":null,"as_item_name":null,"as_id":11990,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11888,"as_buy_as_gift":null,"as_materials_quantity_obj":{"equipment_for_restoration":5,"bricks":5,"hygrograph":5}},{"as_description":null,"as_item_name":null,"as_id":11889,"as_buy_as_gift":null,"as_materials_quantity_obj":{"equipment_for_restoration":5,"bricks":5,"hygrograph":5}},{"as_description":null,"as_item_name":null,"as_id":11890,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10446,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"brick":10,"automatic_barrier":10}},{"as_description":null,"as_item_name":null,"as_id":10447,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"brick":10,"automatic_barrier":10}},{"as_description":null,"as_item_name":null,"as_id":10448,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"brick":10,"automatic_barrier":10}},{"as_description":null,"as_item_name":null,"as_id":10449,"as_buy_as_gift":null,"as_materials_quantity_obj":{"naval_fuel":15,"steel":15,"tube":15}},{"as_description":null,"as_item_name":null,"as_id":10450,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"flashlights":10,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10451,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rescue_vessel":15,"primer":15,"flare_pistol":15}},{"as_description":null,"as_item_name":null,"as_id":10452,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw":5,"satellite_comm_system":5,"lifebuoy":5}},{"as_description":null,"as_item_name":null,"as_id":10453,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw":5,"satellite_comm_system":5,"lifebuoy":5}},{"as_description":null,"as_item_name":null,"as_id":10454,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw":5,"satellite_comm_system":5,"lifebuoy":5}},{"as_description":null,"as_item_name":null,"as_id":10455,"as_buy_as_gift":null,"as_materials_quantity_obj":{"screw":5,"satellite_comm_system":5,"lifebuoy":5}},{"as_description":null,"as_item_name":null,"as_id":10456,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11522,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rope":5,"overlap_plates":10,"steel_girder":5,"asphalt":5,"metal_fencing":10,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11523,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rope":5,"overlap_plates":10,"steel_girder":5,"asphalt":5,"metal_fencing":10,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11524,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rope":5,"overlap_plates":10,"steel_girder":5,"asphalt":5,"metal_fencing":10,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11891,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":5,"brick":5,"tube":5,"water_pump":5,"bricks":5}},{"as_description":null,"as_item_name":null,"as_id":11892,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":5,"brick":5,"tube":5,"water_pump":5,"bricks":5}},{"as_description":null,"as_item_name":null,"as_id":11893,"as_buy_as_gift":null,"as_materials_quantity_obj":{"aqua_equipment":10,"thermostat":5,"corals":10,"glass":5,"water_circulation_system":5,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":11894,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10248,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10247,"as_buy_as_gift":null,"as_materials_quantity_obj":{"oil_valve":1,"block_oil":1,"filter":2,"system_plum_oil":1,"tube":6,"polyurethane":6}},{"as_description":null,"as_item_name":null,"as_id":10244,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10243,"as_buy_as_gift":null,"as_materials_quantity_obj":{"jack":1,"telpher":2,"fixture":5,"steel":10,"tube":4}},{"as_description":null,"as_item_name":null,"as_id":10411,"as_buy_as_gift":null,"as_materials_quantity_obj":{"dosing_unit":2,"radar_antenna":5,"reservoir":6,"amplifier":5}},{"as_description":null,"as_item_name":null,"as_id":11016,"as_buy_as_gift":null,"as_materials_quantity_obj":{"dosing_unit":2,"radar_antenna":5,"reservoir":6,"amplifier":5}},{"as_description":null,"as_item_name":null,"as_id":11017,"as_buy_as_gift":null,"as_materials_quantity_obj":{"dosing_unit":2,"radar_antenna":5,"reservoir":6,"amplifier":5}},{"as_description":null,"as_item_name":null,"as_id":11018,"as_buy_as_gift":null,"as_materials_quantity_obj":{"oil_loader":2,"automatic_skimmer":2,"screw_pump":4,"oil_receiving_device":5,"flexible_pipes":8}},{"as_description":null,"as_item_name":null,"as_id":11503,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stone_blocks":10,"facing_plates":10,"granite_plates":10}},{"as_description":null,"as_item_name":null,"as_id":11504,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stone_blocks":10,"facing_plates":10,"granite_plates":10}},{"as_description":null,"as_item_name":null,"as_id":11506,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stone_blocks":10,"facing_plates":10,"granite_plates":10}},{"as_description":null,"as_item_name":null,"as_id":11505,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stone_blocks":10,"facing_plates":10,"granite_plates":10}},{"as_description":null,"as_item_name":null,"as_id":11507,"as_buy_as_gift":null,"as_materials_quantity_obj":{"stone_blocks":15,"sarcophagus":10,"clay_bricks":15}},{"as_description":null,"as_item_name":null,"as_id":11508,"as_buy_as_gift":null,"as_materials_quantity_obj":{"pharaon_treasure":10,"sarcophagus":10,"clay_bricks":20}},{"as_description":null,"as_item_name":null,"as_id":12204,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rails":3,"bracket":3,"sleeper":3}},{"as_description":null,"as_item_name":null,"as_id":11977,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rails":3,"bracket":3,"sleeper":3}},{"as_description":null,"as_item_name":null,"as_id":11917,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11915,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"brick":5,"geotextiles":10}},{"as_description":null,"as_item_name":null,"as_id":11916,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drainage_device":10,"glass":10,"polyurethane":5}},{"as_description":null,"as_item_name":null,"as_id":11957,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11955,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"brick":5,"geotextiles":10}},{"as_description":null,"as_item_name":null,"as_id":11956,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drainage_device":10,"glass":10,"polyurethane":5}},{"as_description":null,"as_item_name":null,"as_id":11961,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11959,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"brick":5,"geotextiles":10}},{"as_description":null,"as_item_name":null,"as_id":11960,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drainage_device":10,"glass":10,"polyurethane":5}},{"as_description":null,"as_item_name":null,"as_id":11964,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11962,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"brick":5,"geotextiles":10}},{"as_description":null,"as_item_name":null,"as_id":11963,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drainage_device":10,"glass":10,"polyurethane":5}},{"as_description":null,"as_item_name":null,"as_id":11967,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11965,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":5,"brick":5,"geotextiles":10}},{"as_description":null,"as_item_name":null,"as_id":11966,"as_buy_as_gift":null,"as_materials_quantity_obj":{"drainage_device":10,"glass":10,"polyurethane":5}},{"as_description":null,"as_item_name":null,"as_id":11510,"as_buy_as_gift":null,"as_materials_quantity_obj":{"curb":10,"asphalt":10,"road_signs":10,"project":10,"bitumen":10,"compactor":10}},{"as_description":null,"as_item_name":null,"as_id":11513,"as_buy_as_gift":null,"as_materials_quantity_obj":{"curb":10,"asphalt":10,"road_signs":10,"project":10,"bitumen":10,"compactor":10}},{"as_description":null,"as_item_name":null,"as_id":11514,"as_buy_as_gift":null,"as_materials_quantity_obj":{"curb":10,"asphalt":10,"road_signs":10,"project":10,"bitumen":10,"compactor":10}},{"as_description":null,"as_item_name":null,"as_id":10417,"as_buy_as_gift":null,"as_materials_quantity_obj":{"belt_saw":10,"circular_saw":5,"lubricating_stuff":10,"machine_harvesting":5}},{"as_description":null,"as_item_name":null,"as_id":10413,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"diesel_generator":2}},{"as_description":null,"as_item_name":null,"as_id":10480,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"circular_saw":14,"transporter":3,"diesel_generator":2,"machine_harvesting":5}},{"as_description":null,"as_item_name":null,"as_id":10414,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"diesel_generator":2}},{"as_description":null,"as_item_name":null,"as_id":10415,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"diesel_generator":2}},{"as_description":null,"as_item_name":null,"as_id":10482,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"circular_saw":14,"transporter":3,"diesel_generator":2,"machine_harvesting":5}},{"as_description":null,"as_item_name":null,"as_id":10481,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":2,"fixture":10,"circular_saw":14,"transporter":3,"diesel_generator":2,"machine_harvesting":5}},{"as_description":null,"as_item_name":null,"as_id":10485,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10484,"as_buy_as_gift":null,"as_materials_quantity_obj":{"fixture":5,"cement":5,"tube":5,"steel_reinforcing":5,"strainmeter":10}},{"as_description":null,"as_item_name":null,"as_id":10483,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sawmill_gager":1,"sawmill_integrator":1,"sawmill_doorman":1,"sawmill_operator":1,"sawmill_director":1}},{"as_description":null,"as_item_name":null,"as_id":10416,"as_buy_as_gift":null,"as_materials_quantity_obj":{"circular_saw":14,"transporter":3,"machine_harvesting":5}},{"as_description":null,"as_item_name":null,"as_id":10457,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"depth_scanner":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10458,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"depth_scanner":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10459,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"depth_scanner":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10460,"as_buy_as_gift":null,"as_materials_quantity_obj":{"oxygen_tanks":15,"torpedoes":15,"flexible_pipes":15}},{"as_description":null,"as_item_name":null,"as_id":10461,"as_buy_as_gift":null,"as_materials_quantity_obj":{"armor":10,"fixture":10,"weather_radar":10}},{"as_description":null,"as_item_name":null,"as_id":10462,"as_buy_as_gift":null,"as_materials_quantity_obj":{"radar_antenna":15,"runway_equipment":15,"gear":15}},{"as_description":null,"as_item_name":null,"as_id":10463,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":5,"ejection_system":5,"iff":5}},{"as_description":null,"as_item_name":null,"as_id":10464,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":5,"ejection_system":5,"iff":5}},{"as_description":null,"as_item_name":null,"as_id":10465,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":5,"ejection_system":5,"iff":5}},{"as_description":null,"as_item_name":null,"as_id":10466,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":5,"ejection_system":5,"iff":5}},{"as_description":null,"as_item_name":null,"as_id":10467,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11531,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11979,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":10,"snow_generator":5,"steel_reinforcing":10}},{"as_description":null,"as_item_name":null,"as_id":11980,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"cement":10,"snow_generator":5,"steel_reinforcing":10}},{"as_description":null,"as_item_name":null,"as_id":11981,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"glass":10,"ski_lift":10,"ventilation_system":10}},{"as_description":null,"as_item_name":null,"as_id":11982,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11983,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel_girder":10,"doors_photocell":10,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":11984,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"steel_girder":10,"doors_photocell":10,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":11985,"as_buy_as_gift":null,"as_materials_quantity_obj":{"runway_equipment":10,"monitoring_systems":10,"projector":10,"glass":10,"ventilation_system":10}},{"as_description":null,"as_item_name":null,"as_id":11986,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10294,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10298,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":10295,"as_buy_as_gift":null,"as_materials_quantity_obj":{"brick":10,"glass":10,"mirror":10}},{"as_description":null,"as_item_name":null,"as_id":10296,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"wrestling_mat":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10297,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tube":20,"water_pump":5,"springboard":5}},{"as_description":null,"as_item_name":null,"as_id":10289,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"brick":10,"fitness_equipment":5}},{"as_description":null,"as_item_name":null,"as_id":10290,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"brick":10,"fitness_equipment":5}},{"as_description":null,"as_item_name":null,"as_id":10291,"as_buy_as_gift":null,"as_materials_quantity_obj":{"brick":10,"glass":10,"mirror":10}},{"as_description":null,"as_item_name":null,"as_id":10292,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":10,"wrestling_mat":10,"brick":10}},{"as_description":null,"as_item_name":null,"as_id":10293,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tube":20,"water_pump":5,"springboard":5}},{"as_description":null,"as_item_name":null,"as_id":10439,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"escalator":5,"aluminum_profile":10,"monitoring_systems":5,"glass":5,"ventilation_system":10}},{"as_description":null,"as_item_name":null,"as_id":10440,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"escalator":5,"aluminum_profile":10,"monitoring_systems":5,"glass":5,"ventilation_system":10}},{"as_description":null,"as_item_name":null,"as_id":10441,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"concrete_plates":5,"monitoring_systems":5,"glass":5,"led_lights":10,"signal_lights":10}},{"as_description":null,"as_item_name":null,"as_id":10442,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_solution":5,"concrete_plates":5,"satellite_dish":10,"tube":5,"glass":5,"signal_lights":10}},{"as_description":null,"as_item_name":null,"as_id":10443,"as_buy_as_gift":null,"as_materials_quantity_obj":{"escalator":5,"aluminum_profile":10,"monitoring_systems":5,"metals_detector":5,"glass":5,"led_lights":10}},{"as_description":null,"as_item_name":null,"as_id":10444,"as_buy_as_gift":null,"as_materials_quantity_obj":{"access_control_system":5,"tile":5,"satellite_dish":10,"glass":5,"steel_reinforcing":5,"ventilation_system":10}},{"as_description":null,"as_item_name":null,"as_id":10445,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11810,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"concrete_solution":5,"rails":10,"brick":5,"pile":5,"traffic_light":10}},{"as_description":null,"as_item_name":null,"as_id":11811,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"concrete_solution":5,"rails":10,"brick":5,"pile":5,"traffic_light":10}},{"as_description":null,"as_item_name":null,"as_id":11813,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"concrete_solution":5,"rails":10,"brick":5,"pile":5,"traffic_light":10}},{"as_description":null,"as_item_name":null,"as_id":11812,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_plates":5,"concrete_solution":5,"rails":10,"brick":5,"pile":5,"traffic_light":10}},{"as_description":null,"as_item_name":null,"as_id":11832,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"aluminum_profile":5,"steel":5,"tube":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11833,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"aluminum_profile":5,"steel":5,"tube":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11835,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"aluminum_profile":5,"steel":5,"tube":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11834,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":5,"aluminum_profile":5,"steel":5,"tube":5,"steel_reinforcing":5,"pile":5}},{"as_description":null,"as_item_name":null,"as_id":11836,"as_buy_as_gift":null,"as_materials_quantity_obj":{"voltage_regulator":10,"multidisplay":5,"bucket":5,"aluminum_profile":5,"winding":5,"steel":5,"valve":5}},{"as_description":null,"as_item_name":null,"as_id":11837,"as_buy_as_gift":null,"as_materials_quantity_obj":{"bucket":5,"winding":5,"tube":5,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":11838,"as_buy_as_gift":null,"as_materials_quantity_obj":{"bucket":5,"winding":5,"tube":5,"flexible_pipes":5}},{"as_description":null,"as_item_name":null,"as_id":11839,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11932,"as_buy_as_gift":null,"as_materials_quantity_obj":{"overlap_plates":10,"steel_girder":10,"sand":10,"rails_fasteners":10}},{"as_description":null,"as_item_name":null,"as_id":11933,"as_buy_as_gift":null,"as_materials_quantity_obj":{"overlap_plates":10,"steel_girder":10,"sand":10,"rails_fasteners":10}},{"as_description":null,"as_item_name":null,"as_id":11934,"as_buy_as_gift":null,"as_materials_quantity_obj":{"overlap_plates":10,"steel_girder":10,"sand":10,"rails_fasteners":10}},{"as_description":null,"as_item_name":null,"as_id":11935,"as_buy_as_gift":null,"as_materials_quantity_obj":{"glass":10,"bricks":10,"steel_reinforcing":10,"chock":10}},{"as_description":null,"as_item_name":null,"as_id":11936,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_machinist":1,"rr_mechanic":1}},{"as_description":null,"as_item_name":null,"as_id":11937,"as_buy_as_gift":null,"as_materials_quantity_obj":{"condition_system":10,"extract":10,"tourniquet":10}},{"as_description":null,"as_item_name":null,"as_id":11938,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11918,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":10,"steel":10,"platforms":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11919,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":10,"steel":10,"platforms":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11920,"as_buy_as_gift":null,"as_materials_quantity_obj":{"telpher":10,"steel":10,"platforms":10,"tee":10}},{"as_description":null,"as_item_name":null,"as_id":11921,"as_buy_as_gift":null,"as_materials_quantity_obj":{"oil_loader":10,"manometr":10,"oil_valve":10,"block_oil":10}},{"as_description":null,"as_item_name":null,"as_id":11922,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_adjuster_hardware":1,"rr_projector":1}},{"as_description":null,"as_item_name":null,"as_id":11923,"as_buy_as_gift":null,"as_materials_quantity_obj":{"control_panel":10,"underground_tanks":10,"compressor":10}},{"as_description":null,"as_item_name":null,"as_id":11924,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11925,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rails":10,"steel_girder":10,"cement":10,"coupling":10}},{"as_description":null,"as_item_name":null,"as_id":11926,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rails":10,"steel_girder":10,"cement":10,"coupling":10}},{"as_description":null,"as_item_name":null,"as_id":11927,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rails":10,"steel_girder":10,"cement":10,"coupling":10}},{"as_description":null,"as_item_name":null,"as_id":11928,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tile":10,"glass":10,"packing_equipment":10,"led_lights":10}},{"as_description":null,"as_item_name":null,"as_id":11929,"as_buy_as_gift":null,"as_materials_quantity_obj":{"rr_insurance_agent":1,"rr_radioman":1}},{"as_description":null,"as_item_name":null,"as_id":11930,"as_buy_as_gift":null,"as_materials_quantity_obj":{"multidisplay":10,"luggage":10,"metals_detector":10}},{"as_description":null,"as_item_name":null,"as_id":11931,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11820,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11817,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":10,"brick":5,"glass":5}},{"as_description":null,"as_item_name":null,"as_id":12329,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":10,"brick":5,"glass":5}},{"as_description":null,"as_item_name":null,"as_id":11818,"as_buy_as_gift":null,"as_materials_quantity_obj":{"cement":10,"brick":5,"glass":5}},{"as_description":null,"as_item_name":null,"as_id":11819,"as_buy_as_gift":null,"as_materials_quantity_obj":{"security":1,"storekeeper":1}},{"as_description":null,"as_item_name":null,"as_id":11991,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"aluminum_profile":10,"glass":10,"skimmer":10}},{"as_description":null,"as_item_name":null,"as_id":11992,"as_buy_as_gift":null,"as_materials_quantity_obj":{"steel_girder":10,"aluminum_profile":10,"glass":10,"skimmer":10}},{"as_description":null,"as_item_name":null,"as_id":11993,"as_buy_as_gift":null,"as_materials_quantity_obj":{"wave_absorber":10,"aqua_equipment":10,"plastic_seat":10,"guardrails":10,"ventilation_system":5}},{"as_description":null,"as_item_name":null,"as_id":11994,"as_buy_as_gift":null,"as_materials_quantity_obj":{}},{"as_description":null,"as_item_name":null,"as_id":11004,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tube":3,"water_pump":1,"river_pump":1}},{"as_description":null,"as_item_name":null,"as_id":11005,"as_buy_as_gift":null,"as_materials_quantity_obj":{"tube":3,"water_pump":1,"river_pump":1}},{"as_description":null,"as_item_name":null,"as_id":11006,"as_buy_as_gift":null,"as_materials_quantity_obj":{"boreholes_pump":1,"tube":5,"drill":1,"water_pump":1}},{"as_description":null,"as_item_name":null,"as_id":11007,"as_buy_as_gift":null,"as_materials_quantity_obj":{"water_pump":2}},{"as_description":null,"as_item_name":null,"as_id":11010,"as_buy_as_gift":null,"as_materials_quantity_obj":{"filter":5,"demineralizers":3,"tube":5,"river_pump":2,"decontamination_system":3}},{"as_description":null,"as_item_name":null,"as_id":11011,"as_buy_as_gift":null,"as_materials_quantity_obj":{"filter":5,"demineralizers":3,"tube":5,"river_pump":2,"decontamination_system":3}},{"as_description":null,"as_item_name":null,"as_id":11012,"as_buy_as_gift":null,"as_materials_quantity_obj":{"ozonier":5,"filter":5,"tube":5,"water_pump":5,"aerator":5}},{"as_description":null,"as_item_name":null,"as_id":11013,"as_buy_as_gift":null,"as_materials_quantity_obj":{"concrete_ring":10,"compressor":2,"tube":10,"ion_filter":2,"measurement_system":1}},{"as_description":null,"as_item_name":null,"as_id":10267,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"brick":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10268,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"brick":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10269,"as_buy_as_gift":null,"as_materials_quantity_obj":{"sand":5,"brick":5,"pile":10}},{"as_description":null,"as_item_name":null,"as_id":10270,"as_buy_as_gift":null,"as_materials_quantity_obj":{"crane_for_launching":2,"fuel_station":2,"steering_device":7,"primer":10}},{"as_description":null,"as_item_name":null,"as_id":10271,"as_buy_as_gift":null,"as_materials_quantity_obj":{"anchor":5,"lifebuoy":10,"flagpole":5,"wheel":5}}] ;
//"
var quest_array = [{"as_goals":[{"klass":"coins","count":100000,"type":"user","initial":0}],"as_name":"Бизнесмен","as_item_name":"badge_collect_coins1","as_id":10005},{"as_goals":[{"klass":"coins","count":500000,"type":"user","initial":100000}],"as_name":"Продвинутый бизнесмен","as_item_name":"badge_collect_coins2","as_id":10006,"asreq":[{"klass":"id","count":10005,"type":"parent"}]},{"as_goals":[{"klass":"coins","count":1000000,"type":"user","initial":500000}],"as_name":"Умелый бизнесмен","as_item_name":"badge_collect_coins3","as_id":10007,"asreq":[{"klass":"id","count":10006,"type":"parent"}]},{"as_goals":[{"klass":"coins","count":5000000,"type":"user","initial":1000000}],"as_name":"Опытный бизнесмен","as_item_name":"badge_collect_coins4","as_id":10008,"asreq":[{"klass":"id","count":10007,"type":"parent"}]},{"as_goals":[{"klass":"field_size","count":17,"type":"user","initial":0}],"as_name":"Градоначальник","as_item_name":"badge_field_size1","as_id":10029},{"as_goals":[{"klass":"field_size","count":25,"type":"user","initial":17}],"as_name":"Продвинутый градоначальник","as_item_name":"badge_field_size2","as_id":10030,"asreq":[{"klass":"id","count":10029,"type":"parent"}]},{"as_goals":[{"klass":"field_size","count":33,"type":"user","initial":25}],"as_name":"Умелый градоначальник","as_item_name":"badge_field_size3","as_id":10031,"asreq":[{"klass":"id","count":10030,"type":"parent"}]},{"as_goals":[{"klass":"field_size","count":41,"type":"user","initial":33}],"as_name":"Опытный градоначальник","as_item_name":"badge_field_size4","as_id":10032,"asreq":[{"klass":"id","count":10031,"type":"parent"}]},{"as_goals":[{"klass":"friends_count","count":10,"type":"user","initial":0}],"as_name":"Настоящий друг","as_item_name":"badge_friend_count1","as_id":10000},{"as_goals":[{"klass":"friends_count","count":25,"type":"user","initial":10}],"as_name":"Лучший друг","as_item_name":"badge_friend_count2","as_id":10001,"asreq":[{"klass":"id","count":10000,"type":"parent"}]},{"as_goals":[{"klass":"friends_count","count":50,"type":"user","initial":25}],"as_name":"Верный друг","as_item_name":"badge_friend_count3","as_id":10002,"asreq":[{"klass":"id","count":10001,"type":"parent"}]},{"as_goals":[{"klass":"friends_count","count":100,"type":"user","initial":50}],"as_name":"Истинный друг","as_item_name":"badge_friend_count4","as_id":10004,"asreq":[{"klass":"id","count":10002,"type":"parent"}]},{"as_goals":[{"klass":"population","count":100000,"type":"user","initial":0}],"as_name":"Демограф","as_item_name":"badge_population1","as_id":10013},{"as_goals":[{"klass":"population","count":500000,"type":"user","initial":100000}],"as_name":"Продвинутый демограф","as_item_name":"badge_population2","as_id":10014,"asreq":[{"klass":"id","count":10013,"type":"parent"}]},{"as_goals":[{"klass":"population","count":1000000,"type":"user","initial":500000}],"as_name":"Умелый демограф","as_item_name":"badge_population3","as_id":10015,"asreq":[{"klass":"id","count":10014,"type":"parent"}]},{"as_goals":[{"klass":"population","count":2000000,"type":"user","initial":1000000}],"as_name":"Опытный демограф","as_item_name":"badge_population4","as_id":10016,"asreq":[{"klass":"id","count":10015,"type":"parent"}]},{"as_goals":[{"klass":"power","count":500,"type":"user","initial":0}],"as_name":"Инженер-энергетик","as_item_name":"badge_power1","as_id":10025},{"as_goals":[{"klass":"power","count":2000,"type":"user","initial":500}],"as_name":"Продвинутый инженер-энергетик","as_item_name":"badge_power2","as_id":10026,"asreq":[{"klass":"id","count":10025,"type":"parent"}]},{"as_goals":[{"klass":"power","count":5000,"type":"user","initial":2000}],"as_name":"Умелый инженер-энергетик","as_item_name":"badge_power3","as_id":10027,"asreq":[{"klass":"id","count":10026,"type":"parent"}]},{"as_goals":[{"klass":"power","count":10000,"type":"user","initial":5000}],"as_name":"Опытный инженер-энергетик","as_item_name":"badge_power4","as_id":10028,"asreq":[{"klass":"id","count":10027,"type":"parent"}]},{"as_goals":[{"klass":"spent_coins","count":500000,"type":"user","initial":0}],"as_name":"Инвестор","as_item_name":"badge_spent_coins1","as_id":10009},{"as_goals":[{"klass":"spent_coins","count":3000000,"type":"user","initial":500000}],"as_name":"Продвинутый инвестор","as_item_name":"badge_spent_coins2","as_id":10010,"asreq":[{"klass":"id","count":10009,"type":"parent"}]},{"as_goals":[{"klass":"spent_coins","count":10000000,"type":"user","initial":3000000}],"as_name":"Умелый инвестор","as_item_name":"badge_spent_coins3","as_id":10011,"asreq":[{"klass":"id","count":10010,"type":"parent"}]},{"as_goals":[{"klass":"spent_coins","count":30000000,"type":"user","initial":10000000}],"as_name":"Опытный инвестор","as_item_name":"badge_spent_coins4","as_id":10012,"asreq":[{"klass":"id","count":10011,"type":"parent"}]},{"as_goals":[{"klass":"tax_collect","action":"count","count":50000,"type":"user","initial":0}],"as_name":"Налоговый инспектор","as_item_name":"badge_tax_collect1","as_id":10017},{"as_goals":[{"klass":"tax_collect","action":"count","count":150000,"type":"user","initial":50000}],"as_name":"Продвинутый налоговый инспектор","as_item_name":"badge_tax_collect2","as_id":10018,"asreq":[{"klass":"id","count":10017,"type":"parent"}]},{"as_goals":[{"klass":"tax_collect","action":"count","count":500000,"type":"user","initial":150000}],"as_name":"Умелый налоговый инспектор","as_item_name":"badge_tax_collect3","as_id":10019,"asreq":[{"klass":"id","count":10018,"type":"parent"}]},{"as_goals":[{"klass":"tax_collect","action":"count","count":1000000,"type":"user","initial":500000}],"as_name":"Опытный налоговый инспектор","as_item_name":"badge_tax_collect4","as_id":10020,"asreq":[{"klass":"id","count":10019,"type":"parent"}]},{"as_goals":[{"klass":"water","count":200,"type":"user","initial":0}],"as_name":"Инженер-гидролог","as_item_name":"badge_water1","as_id":10021},{"as_goals":[{"klass":"water","count":700,"type":"user","initial":200}],"as_name":"Продвинутый инженер-гидролог","as_item_name":"badge_water2","as_id":10022,"asreq":[{"klass":"id","count":10021,"type":"parent"}]},{"as_goals":[{"klass":"water","count":1500,"type":"user","initial":700}],"as_name":"Умелый инженер-гидролог","as_item_name":"badge_water3","as_id":10023,"asreq":[{"klass":"id","count":10022,"type":"parent"}]},{"as_goals":[{"klass":"water","count":4000,"type":"user","initial":1500}],"as_name":"Опытный инженер-гидролог","as_item_name":"badge_water4","as_id":10024,"asreq":[{"klass":"id","count":10023,"type":"parent"}]}] ;
//"
var version = 1 , auth_key , viewer_id , fp_ver = 10 , user_id , rand = Math.random() , session_key = "null" ;
var SIG_KEY = "abe1cda90be6a1e283e29f9d4cd9dab6" ;
var xmlanswer, xmlDoc, wishlist_gift="";
var timer, timeleft1=0, timemax1=0,timetotal1=0, run1;
var check5act, check1act, check2act, check3act, check4act;
var setting_id = Array(); build_id_g = Array() ; sync_id_g = Array();
var textareaelem, lacklist, lacktake=0;
var modern_wishlist=[],newmodern_wishlist=[]  ;

function get_quest_desc_by_id(a){
for(var i=0;i<quest_array.length;i++)
	if ( quest_array[i].as_id == a)
		return quest_array[i].as_name;
return -1;
}

function get_quest_klass_by_id(a){
for(var i=0;i<quest_array.length;i++)
	if ( quest_array[i].as_id == a)
		return quest_array[i].as_goals[0].klass;
return -1;
}

function get_quest_expect_by_id(a){
for(var i=0;i<quest_array.length;i++)
	if ( quest_array[i].as_id == a)
		return quest_array[i].as_goals[0].count;
return -1;
}


function getdost(n){
var mySel = document.getElementById('dostcombo');
var cap1 = mySel.options[mySel.selectedIndex].text;
var second_user_id = Array(), askitem_id = Array() ;
var a = Array();
var content ='\n';
val1 = $('#area1').val();
var friends_length=0, gifts_length=0, asks_length=0, j;

var item_id = parseInt( document.getElementById('dostcombo').value );

//a[friends_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : item_id , 'command' : 'sell_gift' , 'exp' : 0 , 'quantity' : 1 };
a[friends_length++]= { 'user_id' : user_id , 'ago' : 1 , 'command' : 'quest_inc_counter'  , 'quest_id' : item_id , 'expecting' : get_quest_expect_by_id(item_id) , 'count' : get_quest_expect_by_id(item_id) , 'counter' : 0 , 'exp' : 0 , 'with_stats' : false , 'roll_counter' : 0 };

		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 1 , auth_key : auth_key , serv_ver : 0 },
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});


$('#area1').val( val1 + 'Получили достижение '+ cap1 + '.\n' );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;


$('#dostcombo :selected').remove(); 

	return false;

}


function filldost(){
	$('#dostcombo').empty();
	mydost_length = 0;
	var $xml = $( xmlanswer );
	var  $mydost = $xml.find( 'quests' );

	$mydost.children().each(function(){
		if ( $(this).attr('completed') !="true" )  //&& $(this).attr('counters') 
if ( get_quest_desc_by_id($(this).attr('id')) != -1 )
			$('#dostcombo').append('<option value="'+$(this).attr('id')+'">'+get_quest_desc_by_id($(this).attr('id'))+'</option>');

	});

}

function askgiftnew(){
var a=[];
newmodern_wishlist=[];
for(qq=0,i=0; qq<lacklist.length-1 && newmodern_wishlist.length!=5 ; qq++){
	if($('#_'+lacklist[qq].name).attr('checked'))
		newmodern_wishlist[i++]=lacklist[qq].item_num;
	};


for (i=0; i<modern_wishlist.length; i++)
			a[i]= { 'user_id' : user_id , 'ago' : Math.abs(eval(i-11)) , 'item_id' : eval(modern_wishlist[i]) , 
				'command' : 'remove_from_wish_list' , 'exp' : 0 };


for (j=i; i<j+newmodern_wishlist.length; i++)
			a[i]= { 'user_id' : user_id , 'ago' : Math.abs(eval(i-11)) , 'item_id' : eval(newmodern_wishlist[i-j]) ,
				 'command' : 'add_to_wish_list' , 'exp' : 0 };


//GM_log( JSON.stringify(a));
//GM_log( JSON.stringify(newmodern_wishlist)); 


		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 6 , auth_key : auth_key },
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

$("#askgift2").hide(); 
}


function toolupdatestats(){
sig = calcSig();
var timestamp = new Date().getTime();
var toolanswer;

		$.ajaxSetup({async:false});
$('#myFrame').remove();
$('<iframe id="myFrame" name="myFrame" style="width: 800px; border:0px; height:70px">').attr('src', 'http://widgets.rubar.ru/widgets/megapolis/ajax.php?method=get_toolbar_info&sig='+sig+'&mid='+user_id+'&r='+timestamp).appendTo('#cross') ;
		$.ajaxSetup({async:true});
}

function toolgetbonus(){
sig = calcSig();
var timestamp = new Date().getTime();
var toolanswer;
		$.ajaxSetup({async:false});
$('#myFrame').remove();
$('<iframe id="myFrame" name="myFrame" style="width: 800px; border:0px; height:70px">').attr('src', 'http://widgets.rubar.ru/widgets/megapolis/ajax.php?method=check_toolbar_bonus&sig='+sig+'&mid='+user_id+'&r='+timestamp).appendTo('#cross') ;
		$.ajaxSetup({async:true});
}

function sendwishlist() {
var mylacklist=[];

for ( i = 0; i < ( (lacklist.length < 5 ) ? lacklist.length : 5 ) ; i++ ) {
	z=Math.floor(Math.random()*lacklist.length);
	if(eval(lacklist[z].lack) !=0 ) {
		mylacklist.push( lacklist[z].item_num ) ;
			if(z==lacklist.length-1)
				lacklist.pop(); else
					lacklist[z]=lacklist.pop();
	} else i--;
};


var item_id = Array(), second_user_id = Array(), askitem_id = Array() ;
var a = Array();
var content ='\n';
var $xml = $( xmlanswer ), val1, $friends = $xml.find( 'friends' );
val1 = $('#area1').val();
var friends_length=0, gifts_length=0, asks_length=0, j;

for (i=0; i<mylacklist.length; i++) {
	$friends.children().each(function() // было each 
		{
			a[friends_length]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : eval(mylacklist[i]) , 'command' : 'ask_friends' , 'friends_ids' : $(this).attr('id') , 'exp' : 0 };
		});
		friends_length++;
};

GM_log( JSON.stringify(a));

		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 6 , auth_key : auth_key },
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

mylistdesc="";
for (i=0;i< mylacklist.length; i++ ){
	mylistdesc+=find_item_desc_by_name(find_item_name_by_id(mylacklist[i]))+", ";
};

$('#area1').val( val1 + 'У всех друзей попросили в подарок '+ mylistdesc + '.\n' );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;




}

function renew_gifts() {
	$('#combo4').empty();
	var build=document.getElementById('combo3').value ;
	var val1="Требуемые подарки:\n";

	for(var i=0;i<sync_id_g.length;i++){
//	GM_log(build+' , '+sync_id_g[i].build_id+' , '+sync_id_g[i].desc+' , '+sync_id_g[i].lack);
		if(build==sync_id_g[i].build_id && sync_id_g[i].lack != 0 ){
			val1+=sync_id_g[i].desc + ': вложено ' + sync_id_g[i].item_count + ', нужно еще ' + sync_id_g[i].lack+'.\n';
		};
	};

//	GM_log('setting_id: '+JSON.stringify(setting_id));

	for(var i=0;i<setting_id.length;i++){
//		GM_log('build:'+build+', setting_id[i]: '+JSON.stringify(setting_id[i]));

		if(build==setting_id[i].build_id){
			$('#combo4').append('<option value="'+setting_id[i].gift_id+'">'+setting_id[i].desc+'</option>');
		};
	};
$('#area3').val(val1);
}



function sellgift() {

var mySel = document.getElementById('combo5');
var cap1 = mySel.options[mySel.selectedIndex].text;

if (!confirm("Вы уверенны, что хотите продать подарок "+cap1+"?"))
	return false;

var second_user_id = Array(), askitem_id = Array() ;
var a = Array();
var content ='\n';
val1 = $('#area1').val();
var friends_length=0, gifts_length=0, asks_length=0, j;

var item_id = parseInt( document.getElementById('combo5').value );

a[friends_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : item_id , 'command' : 'sell_gift' , 'exp' : 0 , 'quantity' : 1 };


		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 6 , auth_key : auth_key , serv_ver : 0 },
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});


$('#area1').val( val1 + 'Продали подарок '+ cap1 + '.\n' );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;


$('#combo5 :selected').remove(); 

	return false;
}


function apply_gift(){
//alert("apply gift");

var mySel = document.getElementById('combo4');
var cap1 = mySel.options[mySel.selectedIndex].text;

var a = Array();
var content ='\n';
val1 = $('#area1').val();


var gift_id = parseInt( document.getElementById('combo4').value );
var klass = get_item_name_by_desc(cap1);
//var item_id = get_item_building_by_desc(cap1);

var item_id = $("#combo3").val();
GM_log("item_id: " + item_id);
//var item_id = get_item_building_by_gift_id(gift_id);


/*GM_log( JSON.stringify( [{			"klass" : klass , 
				"gift_id" : gift_id , 
				"item_id" : item_id  ,  
				"user_id" : user_id , 
				"session_key" : session_key , 
				"rand" : rand , 
				"version" : 2 , 
				"auth_key" : auth_key , 
				"serv_ver" : 0 ,
				"command" : "apply_gift" ,
				"serv_ver" : 0 
}] ));
*/
		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/process",
			data: {
				klass : klass , 
				gift_id : gift_id , 
				item_id : item_id  ,  
				user_id : user_id , 
				session_key : session_key , 
				rand : rand , 
				version : 2 , 
				auth_key : auth_key , 
				serv_ver : 0 ,
				command : "apply_gift" ,
				serv_ver : 0 
			},
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});


$('#area1').val( val1 + 'Применили подарок '+ cap1 + '.\n' );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;


$('#combo4 :selected').remove(); 

	return false;


}





function getstroyka(){
getxmlall();
var $xml = $( xmlanswer );

var item_id = Array() , gifts_length=0;
item_id=[]; setting_id = [] ;
var  $gifts = $xml.find( 'received' );
	$gifts.children().each(function(){
		item_id[gifts_length] = { 'gift_id' : $(this).attr('id') , 'gift_num' :  find_item_id_by_name($(this)[0].nodeName) , 'gift_name' :  $(this)[0].nodeName , 'gift_desc' :  find_item_desc_by_name($(this)[0].nodeName) , 'quantity' : $(this).attr('quantity') } ;
		gifts_length++;
	});

//GM_log(JSON.stringify(item_id));

var  $my_builds = $xml.find( 'field' );
var build_id = Array() , sync_id= Array(), build_length=0,sync_length=0;
build_id=[]; sync_id=[]; 
$('#combo3').empty();
$('#combo4').empty();

	$my_builds.children().each(function(){
//		content=content+ ' nodename:' + $(this)[0].nodeName + ', id: ' + $(this).attr('id') + '\n';
	if ( ( $(this).attr('state')== "2" && $(this).attr('input_fill') 
			|| $(this)[0].nodeName.indexOf('ice_arena')!=-1 
			|| $(this)[0].nodeName.indexOf('central_station')!=-1 
			|| $(this)[0].nodeName.indexOf('circus')!=-1 
			|| $(this)[0].nodeName.indexOf('karnak_temple')!=-1 
			|| $(this)[0].nodeName.indexOf('train_east_station_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('train_station_small_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('train_oil_loading_station_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('railroad_tunnel1_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('railroad_tunnel2_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('railroad_tunnel3_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('railroad_tunnel4_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('railroad_tunnel5_stage')!=-1 
			|| $(this)[0].nodeName.indexOf('furniture_factory')!=-1 && $(this).attr('output_fill') != "25000" 
			|| $(this)[0].nodeName.indexOf('road_junction')!=-1 && $(this).attr('output_fill') != "50000" 
			|| $(this)[0].nodeName.indexOf('pyramid')!=-1 && $(this).attr('output_fill') != "140000" && $(this).attr('state') != "6" 
			|| $(this)[0].nodeName.indexOf('north_bridge')!=-1  && $(this).attr('output_fill') != "40000" 
			|| $(this)[0].nodeName.indexOf('naval_station')!=-1 && $(this).attr('state') == "2" 
			|| $(this)[0].nodeName.indexOf('secret_military_plant')!=-1 && $(this).attr('output_fill') != "40000" 
			|| $(this)[0].nodeName.indexOf('military_plant')!=-1 && $(this).attr('state') == "2" && $(this)[0].nodeName.indexOf('secret_military_plant') == -1
			|| $(this)[0].nodeName.indexOf('sq_city')!=-1 && $(this)[0].nodeName.indexOf('sq_city_stage5')==-1 && ( $(this).attr('state') == "2" || $(this).attr('state') == "3" ) 
			|| $(this)[0].nodeName.indexOf('sawmill')!=-1        && $(this)[0].nodeName.indexOf('sawmill_large') == -1 && ( $(this).attr('state') == "2" || $(this).attr('state') == "3"  )
			|| $(this)[0].nodeName.indexOf('buildsite')!=-1	    &&($(this).attr('state') == "2" || $(this).attr('state') == "3"  )
			|| $(this)[0].nodeName.indexOf('airbase')!=-1       && $(this)[0].nodeName.indexOf('airbase_stage8') == -1 &&($(this).attr('state') == "2" || $(this).attr('state') == "3"  )
			|| $(this)[0].nodeName.indexOf('dolphinarium')!=-1  && $(this)[0].nodeName.indexOf('dolphinarium_stage2') == -1
			|| $(this)[0].nodeName.indexOf('warehouse')!=-1     && $(this).attr('state') == "2" && $(this).attr('output_fill') != "6" 
			|| $(this)[0].nodeName.indexOf('golf_club')!=-1 && $(this)[0].nodeName.indexOf('golf_club_stage2') == -1 && $(this).attr('state') == "2" 
			|| $(this)[0].nodeName.indexOf('desalination_plant')!=-1       && $(this).attr('state') == "2" 
			|| $(this)[0].nodeName.indexOf('airport')!=-1 && $(this)[0].nodeName.indexOf('airport_stage6_level1') == -1 && ( $(this).attr('state') == "2" || $(this).attr('state') == "3"  )
			|| $(this)[0].nodeName.indexOf('middle_metro')!=-1  
       			|| $(this)[0].nodeName.indexOf('subway')!=-1        && $(this).attr('output_fill')
			|| $(this)[0].nodeName.indexOf('beach')!=-1         && $(this).attr('output_fill') != "75000" 
			|| $(this)[0].nodeName.indexOf('armoured_military_base')!=-1  ) && $(this).attr('output_fill') != "90000" 
			&& $(this)[0].nodeName.indexOf('city_hall')==-1
			){
		var fillarray = Array();
		var reqarray = Array();
		var reqarray1 = Array();

if ( !( $(this).attr('input_fill') === undefined ) )
		fillarray=$(this).attr('input_fill').split(',');
	else fillarray = "0:0";

		reqarray1 = find_req_name_by_id(find_item_id_by_name($(this)[0].nodeName)); //.split(',');
		reqarray = JSON.stringify(reqarray1);
		reqarray = reqarray.substring(0, reqarray.length-1);
		reqarray = reqarray.substring(1, reqarray.length);
		reqarray = reqarray.split(',');
		for( var zz=0 ; zz<reqarray.length ; zz++ ){
			var split2 = reqarray[zz].split(':');
		split2[0] = split2[0].substring(0, split2[0].length-1);
		split2[0] = split2[0].substring(1, split2[0].length);


		var notfound1=1;
		for( var qq=0 ; qq<fillarray.length ; qq++ ){
			var split1 = fillarray[qq].split(':');

			if( find_item_id_by_name(split2[0])==split1[0] && eval(split2[1]) == eval(split1[1]) ) 
				notfound1=2;
			if( find_item_id_by_name(split2[0])==split1[0] && eval(split2[1]) > eval(split1[1]+'-1') ){
			var notfound1=0;
			sync_id[sync_length++]={"build_id" : $(this).attr('id') , "item_num" : split1[0] , 'desc' : find_item_desc_by_name(split2[0]) , 
				'name' : split2[0]  , "item_count" : split1[1] , "lack" : eval(eval(split2[1])-eval(split1[1])) };
					};


		};
if(notfound1==1)	sync_id[sync_length++]={"build_id" : $(this).attr('id') , "item_num" : find_item_id_by_name(split2[0]) , 'desc' : find_item_desc_by_name(split2[0]) , 
				'name' : split2[0]  , "item_count" : 0 , "lack" : eval(split2[1]) };

		};



		build_id[build_length] = { 'id': $(this).attr('id') , 'name' : $(this)[0].nodeName , 'desc' : find_item_desc_by_name($(this)[0].nodeName) , 'input_fill' :  fillarray };
		$('#combo3').append('<option value="'+$(this).attr('id')+'">'+build_id[build_length++].desc+'</option>');
	};
	});

GM_log('build_id: '+JSON.stringify(build_id));
build_id_g = build_id;
GM_log('sync_id: '+JSON.stringify(sync_id));
sync_id_g = sync_id;

lacklist = [{ 'name' : 'brick' , 'lack' : 0 , 'item_num' : '10901' , 'desc' : 'Бетонные блоки' }];
for(qq=0; qq<sync_id.length;qq++){
var qz=-1,isfound=-1;
do {qz++; if ( lacklist[qz].name == sync_id[qq].name ) isfound=qz; }  while ( qz<lacklist.length-1 ) ;
		if( isfound==-1 && sync_id[qq].lack != 0 && sync_id[qq].lack != undefined ) 
			lacklist.push( { 'name' : sync_id[qq].name , 'lack' : sync_id[qq].lack  , 'item_num' : sync_id[qq].item_num , 'desc' : sync_id[qq].desc } );
				else if( isfound!=-1) lacklist[isfound].lack=lacklist[isfound].lack+sync_id[qq].lack; 
};
lacklist.sort(sort_lack);

//$('#tableg > tbody').html('<tr style="font-size:8px;"><td>Сколько еще нужно</td><td></td><td>Название</td></tr>');
$('#tableg > tbody').html('');
for(qq=0; qq<lacklist.length; qq++){
	$("#tableg > tbody").append('<tr><td style="text-align:right">'+lacklist[qq].lack+'</td><td style="text-align:right"><input type="checkbox" name="_'+lacklist[qq].name+'" id="_'+lacklist[qq].name+'" value="'+lacklist[qq].item_num+'"><td>'+lacklist[qq].desc+'</td></td></tr>');
}

GM_log('lacklist: '+JSON.stringify(lacklist));


var $xml = $( xmlanswer );
var  $country = $xml.find( 'country' );
modern_wishlist = $country.attr( 'wish_list' ).split(',');
GM_log('wish_list: '+JSON.stringify(modern_wishlist));
for(qz=0; qz<modern_wishlist.length; qz++){
	for(qq=0; qq<lacklist.length-1 ; qq++){
		if(lacklist[qq].item_num==modern_wishlist[qz]){
			$('#_'+lacklist[qq].name).attr('checked', true);
			qq=lacklist.length-2;
			};
	};
};
//setting_id=[];
for(var qq=0;qq<build_id.length;qq++){
	for(var yy=0;yy<sync_id.length;yy++){
		for(var zz=0;zz<item_id.length;zz++){
			if ( item_id[zz].gift_num == sync_id[yy].item_num && sync_id[yy].build_id == build_id[qq].id && sync_id[yy].lack != 0 ) 
				setting_id.push({ "build_id" : build_id[qq].id , "item_num" : item_id[zz].gift_num , "gift_id" : item_id[zz].gift_id , "desc" : item_id[zz].gift_desc , "name" : item_id[zz].gift_name  });
		};

	};
};
GM_log('setting_id: '+JSON.stringify(setting_id));


var opt1="";
var buildlist=find_all_stroyka();
for (var it1=0; it1<build_length;it1++)
	opt1+='<option value="'+build_id[it1]+'">'+build_id[it1].name+'</option>';
$('#gift_block').css('visibility', 'visible');
$('#gift_block2').css('visibility', 'visible');
renew_gifts();
}

settax = function() {
	a = $( "#slider1" ).slider( "value" ) ;
	$(xmlanswer).find('tax_collector_real').each(function(){
		b =  $(this).attr('id') ;
	});

		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: { cached: [{ command : 'change_tax' , ago : 1 , new_tax : a , item_id : b , user_id : user_id }] , user_id : user_id , session_key : session_key , rand : rand , version : 3 , auth_key : auth_key },
			dataType: "xml",
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});


}

checkwish = function() {
var wishlist_giftlength=0;
		$.ajaxSetup({async:false});
	if( wishlist_gift!="" ) $.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : wishlist_gift , user_id : user_id , session_key : session_key , rand : rand , version : 9 , auth_key : auth_key },
			dataType: "xml",
//			success: function(xml){ xmlanswer = xml; }
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

wishlist_giftlength= wishlist_gift.length ;
if( wishlist_gift!="" ) getxmlall();
val1 = $('#area1').val();	
$('#area1').val( val1 + 'Отправлено подарков по вишлистам: '+ wishlist_giftlength + '.\n' );
//val1 = $('#area2').val();	
//$('#area2').val( 'Отправлено подарков по вишлистам: '+ wishlist_giftlength + '.\n' + val1 );
//		textareaelem = document.getElementById('area2');
//		textareaelem.scrollTop = textareaelem.scrollHeight;
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

//$("#sendgift1").hide(); 
//$("#checkwish1").hide(); 

}

function unique_gifts(arr) {  
     var ret = [arr[0]] , q = 1;  
     for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate  
         if (arr[i-1].gift_name !== arr[i].gift_name) {  
		ret.push(arr[i]);  
		var len = eval ( ret.length - 2) ;
		ret[len].quantity=q;
		q = 1 ;
         }  else q++ ;
     }  

//final loop end
	var len = eval ( ret.length - 1) ;
	ret[len].quantity=q;

     return ret;  
//	a=unique_gifts(a);
 }  


function get_item_name_by_desc(a){
for(var i=0;i<sync_id_g.length;i++)
	if ( sync_id_g[i].desc == a)
		return sync_id_g[i].name;
return -1;
}



function get_item_building_by_gift_id(a){
for(var i=0;i<setting_id.length;i++)
	if ( setting_id[i].gift_id == a){
		var x = setting_id[i].build_id;
		setting_id[i].build_id=-1;
		return x;
	}
return -1;
}



function find_item_desc_by_name(a){
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_item_name == a)
		return itemarray[i].as_description;
return -1;
}

function find_item_id_by_name(a){
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_item_name == a)
		return itemarray[i].as_id;
return -1;
}

function find_item_name_by_id(a){
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_id == a)
		return itemarray[i].as_item_name;
return -1;
}

function find_req_name_by_id(a){
for(var i=0;i<quanarray.length;i++){
	if ( quanarray[i].as_id == a)
		return (quanarray[i].as_materials_quantity_obj);

};
return -1;
}


function get_id_of_max_quantity(wishlist,itemid){
var i, j, cur_quan=0 , cur_id, getquan=0;
for(i=0;i<wishlist.length;i++){
	for(j=0;j<itemid.length;j++){
		if ( itemid[j].gift_num == idd)
			getquan = itemid[j].quantity;
	};
	if(cur_quan<getquan){
		cur_quan=getquan;
		cur_id=wishlist[i];
	};
};
console.log(cur_id);
return cur_id;
}


function find_all_materials(){
var items = Array();
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_shop_department == "materials" )
		items.push ( { id:itemarray[i].as_id, desc:itemarray[i].as_description });
return 	items.sort(sort_gifts1);
}


function is_can_take(a){
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_item_name == a)
		if (       itemarray[i].as_shop_department == "terrains" 
			|| itemarray[i].as_shop_department == "metro" 
			|| itemarray[i].as_shop_department == "power" 
			|| itemarray[i].as_shop_department == "buildsite"
			|| itemarray[i].as_item_name == "warehouse"
			|| itemarray[i].as_item_name == "secret_military_plant"
			|| itemarray[i].as_item_name == "city_hall"
		)
			return 0; else return 1;
return -1;
}



function find_all_stroyka(){
var items = Array();
for(var i=0;i<itemarray.length;i++)
	if ( itemarray[i].as_shop_department == "buildsite" )
		items.push ( { id:itemarray[i].as_id, desc:itemarray[i].as_description });
return items;
}


function sort_gifts(a,b){
		return (a.gift_desc < b.gift_desc) ? -1 : 1;
}

function sort_lack(a,b){
		return (eval(a.lack) > eval(b.lack)) ? -1 : 1;
}


function sort_gifts1(a,b){
		return (a.desc < b.desc) ? -1 : 1;
}

function sort_friends_by_wishlist(a,b){
		return (a.wish_list.length < b.wish_list.length) ? -1 : 1;
} 


function sort_quantity(a,b){
//reverse math sort, biggest first
		return (eval(a.quantity) > eval(b.quantity)) ? -1 : 1;
}


function megaitem () {
	this.as_buildsite = null;
	this.as_description = null;
	this.as_consumes_name_ary = null;
	this.as_materials_quantity_obj = null;
	this.as_item_name = null;
	this.as_id = 0;
	this.as_consumes_ary = null;
}


function calctax(mx, tax){
	var a;
switch (eval(tax))
{
case -15:
  a = 7;
  break;
case -10:
  a = 5;
  break;
case -5:
  a = 2;
  break;
case 0:
  a = 0;
  break;
case 5:
  a = -2;
  break;
case 10:
  a = -5;
  break;
case 15:
  a = -7;
  break;
};
return Math.floor ( eval ( mx + " * ( 100 + " + a + " ) / 100 " ) ) ;
}


checkgift = function() {

var wishlist_id = Array(), wishlist_id_sorted = Array(), item_id = Array(), item_id2 = Array(), item_id3 = Array(), item_id4 = Array(), second_user_id = Array();
var a = Array();
var content ='\n';
var $xml = $( xmlanswer ), val1, $friends = $xml.find( 'friends' );	
val1 = $('#area2').val();	
var friends_length=0, gifts_length=0, gifts_length2=0,wishlist_length=0;
var j;
	$friends.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ', have_gift: ' + $(this).attr('have_gift') + '\n';
if ( $(this).attr('have_gift') == 'false' )
	second_user_id[friends_length++]=$(this).attr('id');
	});                                                    
//$('#area1').val( val1 + content);	
content ='\n';
val1 = $('#area2').val();	
var sum1="";


var  $wishlist = $xml.find( 'friends' );
	$wishlist.children().each(function(){
	if ( $(this).attr('have_gift') == 'false' && $(this).attr('wish_list') ) 
		if ( $(this).attr('wish_list') != "" )
			wishlist_id[wishlist_length++] = { 'friend_id' : $(this).attr('id') , 'wish_list' :  $(this).attr('wish_list').split(',') } ;

	});
wishlist_id_sorted = wishlist_id.sort(sort_friends_by_wishlist); 
//sum1+=JSON.stringify(wishlist_id_sorted);


var  $gifts = $xml.find( 'available' );
	$gifts.children().each(function(){
//		content=content+ ' nodename:' + $(this)[0].nodeName + ', id: ' + $(this).attr('id') + '\n';
		item_id[gifts_length++] = { 'gift_id' : $(this).attr('id') , 'gift_num' :  find_item_id_by_name($(this)[0].nodeName) , 'gift_name' :  $(this)[0].nodeName , 'gift_desc' :  find_item_desc_by_name($(this)[0].nodeName) , 'quantity' : $(this).attr('quantity') } ;
//		sum1+= '\n' + gifts_length + ' , ' + item_id[gifts_length-1]['gift_id'] + ' , ' + item_id[gifts_length-1]['gift_name'] + ' , ' + item_id[gifts_length-1]['quantity'] ;
	});
//$('#area1').val( val1 + content);	


var  $gifts2 = $xml.find( 'received' );
	$gifts2.children().each(function(){
//		content=content+ ' nodename:' + $(this)[0].nodeName + ', id: ' + $(this).attr('id') + '\n';
		item_id2[gifts_length2] = { 'gift_id' : $(this).attr('id') , 'gift_num' :  find_item_id_by_name($(this)[0].nodeName) , 'gift_name' :  $(this)[0].nodeName , 'gift_desc' :  find_item_desc_by_name($(this)[0].nodeName) , 'quantity' : $(this).attr('quantity') } ;
		item_id3[gifts_length2] = { 'gift_id' : $(this).attr('id') , 'gift_num' :  find_item_id_by_name($(this)[0].nodeName) , 'gift_name' :  $(this)[0].nodeName , 'gift_desc' :  find_item_desc_by_name($(this)[0].nodeName) , 'quantity' : $(this).attr('quantity') } ;
		gifts_length2++;
//		sum1+= '\n' + gifts_length2 + ' , ' + item_id2[gifts_length2-1]['gift_id'] + ' , ' + item_id2[gifts_length2-1]['gift_name'] + ' , ' + item_id2[gifts_length2-1]['quantity'] ;
	});

//$('#area1').val( val1 + content);	

	item_id =item_id.sort(sort_quantity); 
	item_id2=item_id2.sort(sort_gifts); 
	item_id3=item_id3.sort(sort_gifts); 
if (item_id3.length > 1 )
	item_id4=unique_gifts(item_id3);

sum1+="Подарки, которые я могу подарить (отсортированно по количеству):";
for (var ii =0 ; ii< item_id.length; ii++){
//		sum1+= '\n' + eval(ii+1) + ' , ' + item_id[ii]['gift_id'] + ' , ' + item_id[ii]['gift_num'] + ' , ' + item_id[ii]['gift_name'] + ' , ' + item_id[ii]['gift_desc'] + ' , ' + item_id[ii]['quantity'] ;
		sum1+= '\n' + eval(ii+1) + ' , ' + item_id[ii]['gift_desc'] + ' , ' + item_id[ii]['quantity'] ;
};

//sum1+="\n \n gifts received \n";
for (var ii =0 ; ii< item_id2.length; ii++){
//		sum1+= '\n' + eval(ii+1) + ' , ' + item_id2[ii]['gift_id'] + ' , ' + item_id2[ii]['gift_name'] + ' , ' + item_id2[ii]['quantity'] ;
};

sum1+="\n\nПолученные в подарок (отсортировано по алфавиту):";
for (var ii =0 ; ii< item_id4.length; ii++){
//		sum1+= '\n' + eval(ii+1) + ' , ' + item_id4[ii]['gift_id'] + ' , ' + item_id4[ii]['gift_num'] + ' , ' + item_id4[ii]['gift_name'] + ' , ' + item_id4[ii]['gift_desc'] + ' , ' + item_id4[ii]['quantity'] ;
		sum1+= '\n' + eval(ii+1) + ' , ' + item_id4[ii]['gift_desc'] + ' , ' + item_id4[ii]['quantity'] ;
};

$('#combo5').empty();
for (var ii =0 ; ii < item_id2.length; ii++){
		$('#combo5').append('<option value="'+item_id2[ii]['gift_id']+'">'+item_id2[ii]['gift_desc']+'</option>');
};




var gift_send = Array(), giftmax=0, i, gift_send_length=0, ind1=0, ind2=0 ,getgift_id=0;

for(i=0;i<wishlist_id_sorted.length;i++){
var k, j, cur_quan=0 , cur_id="", getquan=0;
//JSON.stringify(item_id);
for(k=0;k<wishlist_id_sorted[i].wish_list.length;k++){
	for(j=0;j<item_id.length;j++){
		if ( item_id[j].gift_num == wishlist_id_sorted[i].wish_list[k]){
			getquan = item_id[j].quantity;
			getgift_id=item_id[j].gift_id;
			ind1=j;
		};
	};
	if(cur_quan<getquan){
		cur_quan=getquan;
		cur_id=wishlist_id_sorted[i].wish_list[k];
		ind2=ind1;
	};
};

if(item_id.length>1)
	if(item_id[ind2].quantity>0) item_id[ind2].quantity=item_id[ind2].quantity-1;
	item_id =item_id.sort(sort_quantity); 
if(item_id.length>1)
	if(item_id[ind2].quantity>0)giftmax=cur_id;
	GM_log(wishlist_id_sorted[i].friend_id +", "+ giftmax);
	if(cur_id!="")
		gift_send[gift_send_length++]= { 'user_id' : user_id, 'item_id' : getgift_id, 'second_user_id' : wishlist_id_sorted[i].friend_id, 'exp' : 0, 'command' : 'send_gift', 'ago' : 1 };
	cur_id="";
	getgift_id="";
	ind1=0;
	ind2=0;
	
};

wishlist_gift=gift_send;
//sum1+="\n\n"+JSON.stringify(gift_send);
sum1="Можно подарить подарков по вишлисту: "+gift_send_length+'.\n\n'+sum1;
var val1 = $('#area1').val();	
if(!run1)$('#area1').val( val1 + "Можно подарить подарков по вишлисту: "+gift_send_length+'.\n' );
//for (var ii =0 ; ii< item_id.length; ii++){
//		sum1+= '\n' + eval(ii+1) + ' , ' + item_id[ii]['gift_id'] + ' , ' + item_id[ii]['gift_num'] + ' , ' + item_id[ii]['gift_name'] + ' , ' + item_id[ii]['gift_desc'] + ' , ' + item_id[ii]['quantity'] ;
//};



$('#area2').val( sum1 );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

}



checkhabar = function() {
var item_id = Array(), coins_array = Array(), askitem_id = Array() ;
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $coins = $xml.find( 'field' );
val1 = $('#area1').val();
var coins_length=0, gifts_length=0, asks_length=0, j;
var item_id=parseInt($('#askid').val());
var str;
	$coins.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ' state:' + $(this).attr('state')  + '\n';
		str=$(this)[0].nodeName;
		if ($(this).attr('state') == '2' && $(this).attr('output_fill')   && is_can_take(str)
//			str.indexOf('historic')==-1 && str.indexOf('patch')==-1  && str.indexOf('wooded_grove')==-1   
//&& str.indexOf('tree')==-1 && str.indexOf('sawmill')==-1 && str.indexOf('yacht_club')==-1 && str.indexOf('military_base')==-1 && str.indexOf('lighthouse')==-1 && str.indexOf('city_hall')==-1 && str.indexOf('literary_garden')==-1 && str.indexOf('fountain')==-1 && str.indexOf('port_')==-1 && str.indexOf('wwtp_stage')==-1 && str.indexOf('beach')==-1 && str.indexOf('bridge')==-1 && str.indexOf('water')==-1 && str.indexOf('hydroelectric')==-1 
//&& str.indexOf('island')==-1  && str.indexOf('ros_atom')==-1 && str.indexOf('sledge')==-1 && str.indexOf('woodland_park')==-1 
//&& str.indexOf('snow_bunny')==-1 && str.indexOf('japanese_')==-1 
) {  //&& $(this).attr('process_end')
			a[coins_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : $(this).attr('id') , 'command' : 'pick'  , 'exp' : 0 };
//GM_log("terrain: str "+str+" , "+is_can_take(str)+" , "+JSON.stringify(a[coins_length-1]));
		};
	});

if(!run1)$('#area1').val( val1 + 'Зданий с готовым населением: '+coins_length + ' (неточно). \n' );


var item_id = Array(), coins_array = Array(), askitem_id = Array() ;
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $coins = $xml.find( 'field' );
val1 = $('#area1').val();
var coins_length=0, gifts_length=0, asks_length=0, j;
var item_id=parseInt($('#askid').val());
	$coins.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ' state:' + $(this).attr('state')  + '\n';
		if ($(this).attr('state') == '5')
			a[coins_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : $(this).attr('id') , 'command' : 'clean'  , 'exp' : 0 };
	});

if(!run1)$('#area1').val( val1 + 'Зданий с готовыми монетами: '+coins_length + '.\n' );


var item_id = Array(), second_user_id = Array();
var a = Array();
var content ='\n';
var $xml = $( xmlanswer ), val1, $friends = $xml.find( 'friends' );	
val1 = $('#area1').val();	
var friends_length=0, gifts_length=0;
var j;
	$friends.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ', have_gift: ' + $(this).attr('have_gift') + '\n';
if ( $(this).attr('have_gift') == 'false' )
	second_user_id[friends_length++]=$(this).attr('id');
	});                                                    
//$('#area1').val( val1 + content);	
content ='\n';
val1 = $('#area1').val();	
var  $gifts = $xml.find( 'available' );
	$gifts.children().each(function(){
//		content=content+ ' nodename:' + $(this)[0].nodeName + ', id: ' + $(this).attr('id') + '\n';
		item_id[gifts_length++]=$(this).attr('id');
	});                                                    
//$('#area1').val( val1 + content);	

var i = friends_length>gifts_length?gifts_length:friends_length;
for(j=0; j<i; j++){
	a[j]= { 'user_id' : user_id, 'item_id' : item_id[j], 'second_user_id' : second_user_id[j], 'exp' : 0, 'command' : 'send_gift', 'ago' : 1 };
//	alert(j+' , ' +a[j]['item_id']+ ' , ' + a[j]['second_user_id']);
	};

if(!run1)$('#area1').val( val1 + 'Можно отправить подарков: '+ j + '.\n' );
	return false;


}





getpeople = function() {

var item_id = Array(), coins_array = Array(), askitem_id = Array() ;
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $coins = $xml.find( 'field' );
val1 = $('#area1').val();
var coins_length=0, gifts_length=0, asks_length=0, j;
var item_id=parseInt($('#askid').val());
var str;
	$coins.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ' state:' + $(this).attr('state')  + '\n';
		str=$(this)[0].nodeName;
		if ($(this).attr('state') == '2' && $(this).attr('output_fill') && is_can_take(str)
//&& str.indexOf('tree')==-1  && 	str.indexOf('historic')==-1 && str.indexOf('patch')==-1  && str.indexOf('wooded_grove')==-1   
//&& str.indexOf('sawmill')==-1 && str.indexOf('yacht_club')==-1 && str.indexOf('military_base')==-1 && str.indexOf('lighthouse')==-1 && str.indexOf('city_hall')==-1 && str.indexOf('literary_garden')==-1 && str.indexOf('fountain')==-1 && str.indexOf('port_')==-1 && str.indexOf('wwtp_stage')==-1 && str.indexOf('beach')==-1 && str.indexOf('bridge')==-1 && str.indexOf('water')==-1 && str.indexOf('hydroelectric')==-1 
//&& str.indexOf('island')==-1  && str.indexOf('ros_atom')==-1 && str.indexOf('sledge')==-1 && str.indexOf('woodland_park')==-1 
//&& str.indexOf('snow_bunny')==-1 && str.indexOf('japanese_cherry')==-1 
) {  //&& $(this).attr('process_end')
			a[coins_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : $(this).attr('id') , 'command' : 'pick'  , 'exp' : 0 };
		};
	});

		$.ajaxSetup({async:false});
if( coins_length!=0 ) $.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 3 , auth_key : auth_key },
			dataType: "xml",
//			success: function(xml){ xmlanswer = xml; }
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide();}

		});
		$.ajaxSetup({async:true});

$('#area1').val( val1 + 'Обработано зданий с населением: '+coins_length + ' (неточно). \n' );
$("#getpeople1").hide(); 
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

	return false;

}




getcoins = function() {

var item_id = Array(), coins_array = Array(), askitem_id = Array() ;
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $coins = $xml.find( 'field' );
val1 = $('#area1').val();
var coins_length=0, gifts_length=0, asks_length=0, j;
var item_id=parseInt($('#askid').val());
	$coins.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ' state:' + $(this).attr('state')  + '\n';
		if ($(this).attr('state') == '5'){
			a[coins_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : $(this).attr('id') , 'command' : 'clean'  , 'exp' : 0 };
//			a[coins_length++]= { 'user_id' : user_id , 'ago' : 1 , 'command' : 'quest_inc_counter'  , 'quest_id' : 10018 , 'expecting' : 600000 , 'count' : 999999 , 'exp' : 0 };
}
	});

		$.ajaxSetup({async:false});
if( coins_length!=0 ) $.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 23 , auth_key : auth_key },
			dataType: "xml",
//			success: function(xml){ xmlanswer = xml; }
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

$('#area1').val( val1 + 'Обработано зданий с монетами: '+coins_length + '.\n' );
$("#getcoins1").hide(); 

		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

	return false;

}


sendask = function() {

var item_id = Array(), second_user_id = Array(), askitem_id = Array() ;
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $friends = $xml.find( 'friends' );
val1 = $('#area1').val();
var friends_length=0, gifts_length=0, asks_length=0, j;
var item_id = parseInt( document.getElementById('combo1').value );
	$friends.children().each(function() // было each 
{
//		content=content+ ' id:' + $(this).attr('id') + '\n';
//		second_user_id[friends_length++]=$(this).attr('id');
a[friends_length++]= { 'user_id' : user_id , 'ago' : 1 , 'item_id' : item_id , 'command' : 'ask_friends' , 'friends_ids' : $(this).attr('id') , 'exp' : 0 };
	});
//$('#area1').val( val1 + content);


		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 6 , auth_key : auth_key },
			dataType: "xml",
//			success: function(xml){ xmlanswer = xml; }
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

var mySel = document.getElementById('combo1');
var cap1 = mySel.options[mySel.selectedIndex].text;
$('#area1').val( val1 + 'У всех друзей попросили в подарок '+ cap1 + '.\n' );
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

	return false;
}


sendgift = function() {
var item_id = Array(), second_user_id = Array();
var a = Array();

var content ='\n';
var $xml = $( xmlanswer ), val1, $friends = $xml.find( 'friends' );	
val1 = $('#area1').val();	
var friends_length=0, gifts_length=0;
var j;
	$friends.children().each(function(){
//		content=content+ ' id:' + $(this).attr('id') + ', have_gift: ' + $(this).attr('have_gift') + '\n';
if ( $(this).attr('have_gift') == 'false' )
	second_user_id[friends_length++]=$(this).attr('id');
	});                                                    
//$('#area1').val( val1 + content);	

content ='\n';
var  $gifts = $xml.find( 'available' );
	$gifts.children().each(function(){
//		content=content+ ' nodename:' + $(this)[0].nodeName + ', id: ' + $(this).attr('id') + '\n';
		item_id[gifts_length++]=$(this).attr('id');
	});                                                    
//$('#area1').val( val1 + content);	

var i = friends_length>gifts_length?gifts_length:friends_length;
for(j=0; j<i; j++){
	a[j]= { 'user_id' : user_id, 'item_id' : item_id[j], 'second_user_id' : second_user_id[j], 'exp' : 0, 'command' : 'send_gift', 'ago' : 1 };
//	alert(j+' , ' +a[j]['item_id']+ ' , ' + a[j]['second_user_id']);
	};


		$.ajaxSetup({async:false});
	if( i!=0 ) $.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/check_and_perform",
			data: {cached : a , user_id : user_id , session_key : session_key , rand : rand , version : 9 , auth_key : auth_key },
			dataType: "xml",
//			success: function(xml){ xmlanswer = xml; }
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});

getxmlall();
checkgift();
val1 = $('#area1').val();	
$('#area1').val( val1 + 'Отправлено подарков: '+ j + '.\n' );

//$("#sendgift1").hide(); 
//$("#checkwish1").hide(); 
		textareaelem = document.getElementById('area1');
		textareaelem.scrollTop = textareaelem.scrollHeight;

	return false;
}

function Match(text, pattern){
	var m = text.match(pattern);
	if (m == null) 
		return null;
	return m[1];
}

function gup( name, res )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( res );
  if( results == null )
    return "";
  else
    return results[1];
}


getxmlall = function() {
		var getHTML,myurl;
		$.ajaxSetup({async:false});
		$.ajax({
			type: "post",
			url: "http://88.212.222.164/city_server_vk_prod/get_user_stat",
			data: {version:1, auth_key: auth_key, fp_ver: fp_ver,  
				friends: 1, user_id: user_id , user_sex: 2, 
				rand: rand, session_key: session_key, first_request: true },
			dataType: "xml",
			success: function(xml){ xmlanswer = xml; } ,
			beforeSend: function()	{ $("#ajax-spinner").show(); $("#ajax-spinner2").show(); },
			complete: function()	{ $("#ajax-spinner").hide(); $("#ajax-spinner2").hide(); }

		});
		$.ajaxSetup({async:true});
var $xml = $( xmlanswer );
var  $country = $xml.find( 'country' );
//alert ( $country.attr( 'owner_id' ) );
var content = 'Мегаполис id: ' + $country.attr( 'owner_id' ) + ', затрачено всего монет: ' + $country.attr( 'spent_coins' ) + 
', уважения всего: ' +  $country.attr( 'respect' ) + ', уровень уважения: ' +  $country.attr( 'respect_level' ) + 
 ', текущий уровень: ' + $country.attr( 'level' ) + ', текущий опыт: ' +  $country.attr( 'exp' ) +  ', мегабаксов: ' + $country.attr( 'gold' ) +  
', монет: ' + $country.attr( 'coins' ) + 
 ', текущее население: ' + $country.attr( 'population' ) +  ', лимит населения: ' + $country.attr( 'max_population' ) +  ', налоги: ' + 
$country.attr( 'tax' ) + '.\n'+ 'Лимит населения с учетом налогов: ' + calctax ( $country.attr( 'max_population' ) , $country.attr( 'tax' ) ) + '.\n' + 
'Осталось населения до лимита: ' + eval ( calctax ( $country.attr( 'max_population' ) , $country.attr( 'tax' ) ) - $country.attr( 'population' ) ) + '.\n' ;

var val1 = $('#area1').val();	
if(!run1)
	$('#area1').val(val1 + '\n' + content);	
var textareaelem = document.getElementById('area1');
textareaelem.scrollTop = textareaelem.scrollHeight;

	checkhabar();
	checkgift();
$("#checkwish1").show(); 
$("#sendgift1").show(); 
$("#getcoins1").show(); 
$("#sendask1").show(); 
$("#getpeople1").show(); 
$("#askgift2").show(); 
$("#dost").show(); 

var nalog = $country.attr( 'tax' ) ;
$( "#slider1" ).slider( "value" , nalog ) ;
$( "#amount1" ).val( nalog );


filldost();
//tax_collector = $('#combo1 option[value=10901]').attr('selected', 'selected');
	return false;

}


//<input type="text" id="askid" value=""><br/>
   function appendcontrol() {

var items1 = Array();
var opt="";
items1 = find_all_materials();
for (var it1=0; it1<items1.length;it1++)
	opt+='<option value="'+items1[it1].id+'">'+items1[it1].desc+'</option>';

var opt1;

// Мне нужно <select name="combo1" id="combo1" style="width : 200"> \
var qwe4 = '<p style="text-align:center;margin-top:0px"> </p> \
<div id="gift_block" style="visibility:hidden"> <p style="line-height:32px;border-style: solid;padding: 10px;border-width:thin">К объекту \
<select name="combo3" id="combo3" style="width : 200"></select><br/> \
<span style="line-height:12px">применить* <select name="combo4" id="combo4" style="width : 200"></select></br> \
<span style="font-size:8px">* Если пусто, то у вас нет подходящих объектов для этой стройки. После каждого применения рекомендуется нажимать на кнопку "Обновить данные о стройках и подарках"</span></span></br> \
<button id="apply1">Применить выбранный подарок на объект</button></p> \
<p style="border-style: solid;padding: 10px;border-width:thin"> \
<textarea id="area3" wrap="hard" readonly="yes" cols=60 rows=4 style="font-size:12px"></textarea> \
</p> \
Тут можно отредактировать свой вишлист. Чтобы сохранить изменения нажмите "Попросить выбранные подарки" внизу. \
<div style="height:200px; border:solid 1px;overflow-y:auto; text-align:left;"> \
<table border="0" id="tableg" cellpadding="0" CELLSPACING="0"><tbody></tbody></table> \
</div> \
<span style="font-size:8px">* Число слева - показывает сколько каждого типа подарков вам суммарно требуется на данный момент для всех строек. Отсортировано по убыванию потребности. Галочки показывают какие подарки сейчас у вас в вишлистах. Выбирайте не более 5 подарков за раз. Если вы выберите больше, то засчитаются только первые 5.</span> \
<br/><button id="askgift2">Попросить выбранные подарки</button> \
</div> \
\
';

	var qwe3='<div style="display:none; top:20px; z-index:9999; position:absolute; left:17px" id="ajax-spinner3"><img src="' + GM_getResourceURL("spin1") + '" /></div> \
<p style="text-align:center;margin-top:0px"><table><tr><td style="text-align:right; width:360px;">'+qwe4+'</td><td><button id="get2">Обновить данные о стройках и подарках</button></br><div id="gift_block2" style="visibility:hidden"> \
<p style="line-height:32px;border-style: solid;padding: 10px;border-width:thin"><textarea id="area2" wrap="hard" readonly="yes" cols=49 rows=11 style="border: 0pt none ;font-size:14px"></textarea></p> \
<p style="border-style: solid;padding: 10px;border-width:thin"> \
Здесь вы можете продать полученные подарки. Помните, что один подарок может пригодиться в нескольких местах.</br></br> \
<select name="combo5" id="combo5" style="width : 200"></select> \
<button id="sellgift1">Продать подарок</button></p> \
<div style="line-height:32px;border-style: solid;padding: 10px;border-width:thin"><div id="slider1"></div><span style="font-size:8px">* Перемещайте бегунок, чтобы установить новые налоги.</span><br/>Налоги в вашем мегаполисе: <input id="amount1" style="border:0;width:20px;text-align: right;"/>% <button id="settax1">Выставить налоги</button></div></div></td></tr></table> \
<div style="display:none; position:absolute; top:120px; left:17px" id="ajax-spinner2"><img src="' + GM_getResourceURL("spin1") + '" /></div> \
</p> \
';

	var qwe1='<p style="text-align:center;margin-top:0px"><textarea id="area1" wrap="hard" readonly="yes" cols=90 rows=14 style="font-size:14px">Начните работу с кнопки "Получить данные."\n</textarea> \
<div style="display:none; position:absolute; top:50px; left:17px" id="ajax-spinner"><img src="' + GM_getResourceURL("spin1") + '" /></div></p> \
<button id="get1">Получить данные</button> \
<button style="display:none" id="getcoins1">Собрать монеты</button> \
<button style="display:none" id="getpeople1">Собрать население</button><br/><br/> \
<button style="display:none" id="checkwish1">Отправить подарки друзьям по вишлисту</button> \
<button style="display:none" id="sendgift1">Раздать всем подарки наугад*</button></br> \
<span style="font-size:8px">* Имейте ввиду, раздавая подарки наугад вы можете быстро исчерпать свои подарки на отдачу. Дарите лучше подарки по вишлисту.</span> \
<style> \
#toolbar0{padding:10px 0px; padding-top: 0px;}#toolbar0{margin-bottom:10px;}#toolbar1{padding:10px 4px;} \
#toolbar1{margin-bottom:10px;}#toolbar2{padding:10px 4px;} \
#toolbar2{margin-bottom:10px;line-height:41px;}#textarea1{margin-top:10px;}#textarea2{margin-top:10px;} .ui-widget{font-size: 0.8em;}</style> \
';







	var qwe2 = '<div id="myid"  style="z-index:99999;display:none" title="Мегаполисбот v0.85"><div id="tabs"> \
	<ul> \
		<li><a href="#tabs-1">Общее</a></li> \
		<li><a href="#tabs-2">Подарки</a></li> \
		<li><a href="#tabs-3">Автомат</a></li> \
		<li><a href="#tabs-4">Контракты</a></li> \
		<li><a href="#tabs-5">Тулбар</a></li> \
		<li><a href="#tabs-6">Достижения</a></li> \
		<li><a href="#tabs-7">About</a></li> \
	</ul> \
	<div id="tabs-1">' + qwe1 + '</div> \
	<div id="tabs-2">' + qwe3 + '</div> \
	<div id="tabs-3"><p>Вы можете доверить боту совершать работу за вас. По таймеру, пока открыта эта страница, будут выполняться выбранные вами действия. Отчет о проделываемой работе вы можете посмотреть на первой вкладке.</p> \
<p style="line-height:42px;border-style: solid;padding: 10px;border-width:thin"> \
'+
//   <button id="check5" />нет</button>Просить по 5 случайных нужных подарков у друзей<br/> \
 ' <button id="check1" />нет</button>Собирать население<br/> \
   <button id="check2" />да</button>Собирать налоги<br/> \
   <button id="check3" />да</button>Дарить подарки по вишлистам друзей по мере появления нужных подарков<br/> \
   <button id="check4" />нет</button>Дарить наугад подарки, которые не потребовались в вишлистах (не рекомендуем, подарки не будут накапливаться)<br/> \
И выполнять действия бот будет раз в <select name="combo2" id="combo2"> \
<option value="660">11 мин.(опасно могут заблокировать)</option> \
<option value="1205">20 мин.</option> \
<option selected value="1805">30 мин.</option> \
<option value="2410">40 мин.</option> \
<option value="3605">1 час</option> \
<option value="14420">4 часа(созревает парк развлечений)</option> \
</select> \
</p><p><button id="start1" >Запустить</button><span id="start1note"></span><span id="sec1note"></span> \
</p></div> \
	<div id="tabs-4">Это вкладка управления контрактами, но мы пока тут ничего не делали. Давайте оттестируем то, что уже у нас есть. \
	Было бы здорово, если бы вы оставляли свои советы <a href="http://userscripts.org/scripts/show/97904">на страничке.</a></div> \
	<div id="tabs-5">Наши друзья из Мегаполиса попросили добавить функциональность их громоздкого тулбара к нам в скрипт. Конечно, он не сравнится с нашим легковесным замечательным ботом, но мы все равно благодарны им за помощь и поддержку.<br/> \
Пока мы не сделали обработку ответа, поэтому читать ответ немного неудобно. Мы попробуем вам объяснить: leisure - это здания с налогами, house - здания с населением, factory - фабрики, ready/total - сколько готово/всего, next_bonus - сколько секунд до следующего бонуса.<br/ > \
Все что делает их тулбар - это показывает суммарные данные о зданиях, налогах и фабриках и позволяет собрать бонус, когда подходит время. Наш бот позволяет делать всё то же самое и в самом тулбаре отпадает необходимость. В следующих выпусках мы улучшим отображение и поставим его на таймер, ждите. \
<br/><br/><br/> \
<button id="tool1" >Обновить статистику</button><button id="tool2" >Получить бонус</button> <div id="cross" ></div> \
</div> \
	<div id="tabs-6"><p>В данный момент функция не доделана и мы её пока отключили. В будущем тут можно будет набить достижения не прикладывая никаких усилий.</p> \
<div id="dost"><select name="dostcombo" id="dostcombo"></select>' +
//<button id="dost9" >Получить достижение</button>
 '<br/><span style="font-size:8px">* Чтобы увидеть поздравления с достижением обновите саму игру. За раз можно повысить достижение каждого типа только на один шаг. \
Чтобы получить следующие достижения нажмите Обновить данные на первой или второй вкладке, после чего вернитесь сюда. \
</span> \
</div> \
</div> \
	<div id="tabs-7"><p>Этот бот посвящен замечательной игре <a href="http://vkontakte.ru/app1858070">"Мегаполис"</a> Вконтакте. Нам не понравилось то, \
что там надо совершать много рутинных однотипных действий, таких как сбор населения и налогов. Этот бот делает эти вещи, и еще кое что другое за вас. \
Первым делом нажмите "Получить данные", без этого ничего не заработает. "Собрать все население" работает упрощено, оно путает некоторые объекты типа \
вишни или дерева, по мере обнаружения таких объектов мы добавляем их в список исключений. Функция "отправить все подарки" отправляет <u><b>не все</b></u> \
подарки за раз, если одного предмета у вас несколько экземпляров. Поэтому надо нажимать кнопку "Подарить подарки" несколько раз, до тех пор, пока не появится \
надпись "отправлено подарков: 0". Попросить можно за одно нажатие только один подарок, зато у всех сразу, причем надо выбрать наименование этого \
подарка, иначе пока никак. Из-за особенностей игры мы не можем брать список требуемых подарков на лету. Так что мы сделали выпадающий список подарков \
для вас. Функция "Подарить подарки по вишлистам" старается распределить максимум подарков по друзьям с учетом популярности предметов. Если вам кажется, \
что население не "убирается", проверьте достигнут ли лимит населения. Переходите к боту только по ссылке со страницы игры. Скачать последнюю версию бота \
и задать вопросы вы можете на <a href="http://userscripts.org/scripts/show/97904">официальной странице поддержки скрипта.</a></p> \
  		</div> \
	</div> \
		<a href="http://userscripts.org/scripts/source/97904.user.js"><img src="http://megapolisbot.ucoz.ru/_ld/0/1_megaupdate1.png" /></a><br/>(у вас обновление от 18.09.2011, v0.85)</div>';	
//<div style="display:none" id="ajax-spinner"><img src="http://www.rian.ru/i/ajax-loader.gif" /></div>
	var divTag = document.createElement("div");
	divTag.innerHTML = qwe2;
	document.body.appendChild(divTag);
	$( "#myid" ).dialog({ minWidth: 900, minHeight: 550 });
	$( "#tabs" ).tabs();
	$( "#get1" ).button() .click(getxmlall);
//	$( "#checkgift1" ).button() .click(checkgift);
	$( "#checkwish1" ).button() .click(checkwish);
	$( "#sendgift1" ).button() .click(sendgift);
	$( "#getcoins1" ).button() .click(getcoins);
	$( "#sendask1" ).button() .click(sendask);
	$( "#getpeople1" ).button() .click(getpeople);
	$( "#get2" ).button() .click(getstroyka);
	$( "#apply1" ).button() .click(apply_gift);
	$( "#sellgift1" ).button() .click(sellgift);
	$( "#check6" ).button() .click(sendwishlist);
	$( "#tool1" ).button() .click(toolupdatestats);
	$( "#tool2" ).button() .click(toolgetbonus);
	$( "#askgift2" ).button() .click(askgiftnew);
	$( "#dost9" ).button().click(getdost);



$("#start1note").text("Автомат остановлен. ");


/*	$( "#check5" ).button().click(function() {
			var options;
			if ( $( this ).text() === "нет" ) {
				options = {
					label: "да"}
			} else {
				options = {
					label: "нет"}
			}
			$( this ).button( "option", options );
});*/
	$( "#check1" ).button().click(function() {
			var options;
			if ( $( this ).text() === "нет" ) {
				options = {
					label: "да"}
			} else {
				options = {
					label: "нет"}
			}
			$( this ).button( "option", options );
});
	$( "#check2" ).button().click(function() {
			var options;
			if ( $( this ).text() === "нет" ) {
				options = {
					label: "да"}
			} else {
				options = {
					label: "нет"}
			}
			$( this ).button( "option", options );
});
	$( "#check3" ).button().click(function() {
			var options;
			if ( $( this ).text() === "нет" ) {
				options = {
					label: "да"}
			} else {
				options = {
					label: "нет"}
			}
			$( this ).button( "option", options );
});
	$( "#check4" ).button().click(function() {
			var options;
			if ( $( this ).text() === "нет" ) {
				options = {
					label: "да"}
			} else {
				options = {
					label: "нет"}
			}
			$( this ).button( "option", options );
});


$( "#slider1" ).slider({ min: -15 , max: 15 , step: 5 ,
				slide: function( event, ui ) {
					$( "#amount1" ).val( ui.value );
				}});
$( "#amount1" ).val( $( "#slider1" ).slider( "value" ) );
$( "#settax1" ).button() .click(settax);

	$( "#start1" ).button() .click(function() {
			var options;
			if ( $( this ).text() === "Запустить" ) {
		
				if ( $( "#check5" ).text() === "нет" ) check5act=0; else check5act=1;
				if ( $( "#check1" ).text() === "нет" ) check1act=0; else check1act=1;
				if ( $( "#check2" ).text() === "нет" ) check2act=0; else check2act=1;
				if ( $( "#check3" ).text() === "нет" ) check3act=0; else check3act=1;
				if ( $( "#check4" ).text() === "нет" ) check4act=0; else check4act=1;
				if ( check1act + check2act + check3act + check4act + check5act == 0 ){
					alert('Ошибка: включите хотя бы одно действие автомата.'); return false
				};
				options = {
					label: "Остановить"};
				$( "#check5" ).button( "option", "disabled", true );
				$( "#check1" ).button( "option", "disabled", true );
				$( "#check2" ).button( "option", "disabled", true );
				$( "#check3" ).button( "option", "disabled", true );
				$( "#check4" ).button( "option", "disabled", true );
				$("#combo2").attr('disabled', 'disabled');
				$("#start1note").html(' Автомат запущен и выполняется ');
			val1 = $('#area1').val();	
			$('#area1').val( val1 + getdate1()+ '. Автомат запущен.\n' );
			textareaelem = document.getElementById('area1');
			textareaelem.scrollTop = textareaelem.scrollHeight;


			timeleft1=0;
			timetotal1=0;
			timemax1=parseInt( document.getElementById('combo2').value );
			timer = setInterval(sec_do, 1000);
			run1=1;
			} else {
				options = {
					label: "Запустить"};
				$( "#check5" ).button( "option", "disabled", false );
				$( "#check1" ).button( "option", "disabled", false );
				$( "#check2" ).button( "option", "disabled", false );
				$( "#check3" ).button( "option", "disabled", false );
				$( "#check4" ).button( "option", "disabled", false );
				$("#combo2").removeAttr('disabled');
				$("#start1note").text("Автомат остановлен. ");
			val1 = $('#area1').val();	
			$('#area1').val( val1 + '\n' + getdate1()+ '. Автомат остановлен.\n' );
			textareaelem = document.getElementById('area1');
			textareaelem.scrollTop = textareaelem.scrollHeight;

                        run1=0;
			clearInterval(timer);
			}
			$( this ).button( "option", options );
});



$("#reload1").hide(); 
    }


function getdate1() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	if (minutes < 10)minutes = "0" + minutes;
	var sec = currentTime.getSeconds();
	return(hours + ":" + minutes + ":"+sec);
}

function sec_do() {
	if(timeleft1==timemax1){
		timeleft1=0;
		val1 = $('#area1').val();	
		$('#area1').val( val1 + '\n' +getdate1()+ '. Событие автомата.\n' );
		getstroyka();// обновить данные
//		getxmlall(); // обновить данные
		if(check5act) sendwishlist(); // просить подарки
		if(check1act) getpeople(); // население
		if(check2act) getcoins(); // налоги
		if(check3act) checkwish(); // вишлисты
		if(check4act) sendgift(); // наугад
	} else {
		$("#sec1note").text(display_ct() + ', следующий сбор через ' + display_ct1());
		timeleft1++;
		timetotal1++;
	};
}

function display_ct() {
// Calculate the number of days left
var days=Math.floor(timetotal1 / 86400);
// After deducting the days calculate the number of hours left
var hours = Math.floor((timetotal1 - (days * 86400 ))/3600)
// After days and hours , how many minutes are left
var minutes = Math.floor((timetotal1 - (days * 86400 ) - (hours *3600 ))/60)
// Finally how many seconds left after removing days, hours and minutes.
var secs = Math.floor((timetotal1 - (days * 86400 ) - (hours *3600 ) - (minutes*60)))
return (hours + " часов, " + minutes + " минут, " + secs + " секунд.");
}

function display_ct1() {
// Calculate the number of days left
var days=Math.floor((timemax1-timeleft1) / 86400);
// After deducting the days calculate the number of hours left
var hours = Math.floor(((timemax1-timeleft1) - (days * 86400 ))/3600)
// After days and hours , how many minutes are left
var minutes = Math.floor(((timemax1-timeleft1) - (days * 86400 ) - (hours *3600 ))/60)
// Finally how many seconds left after removing days, hours and minutes.
var secs = Math.floor(((timemax1-timeleft1) - (days * 86400 ) - (hours *3600 ) - (minutes*60)))
return (minutes + " минут, " + secs + " секунд.");
}

if ( document.location.href == 'http://88.212.222.164/city_server_vk_prod/assets/app.html' ) {

document.head.innerHTML='<meta content="text/html; charset=utf-8" http-equiv="content-type" /><meta 1 />';
var delobj = ["VK","banner_object_id","deconcept","easyXDM","fastXDM","flash_object_id",
"FlashObject","SWFObject","banner_app","flash_app","getQueryParamValue","get_parameters",
"jsonApplyBanners_city_prod","on_init","swf_object","update_support_button_on_mm", 
"_gaq"  , "_gat" , "_page_loading_start" , "gaGlobal" ,
"update_support_button_on_vk","vk_call_method","vk_init_api","vk_onConnectionInit","jQuery","$j","$",
"adv_banner_object_id","swfobject", "embed_for_opera" ,"get_parameters_hash", "obj_to_uri", "sq_embed_swf_object","sqlog", "vk_window_fix_needed" ] ;

for (x in delobj) { ;
	unsafeWindow[delobj[x]] = undefined ;
	delete (unsafeWindow[delobj[x]] ) ;
};

};

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {

            var GM_Head2 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ2 = document.createElement('link');
            GM_JQ2.href= 'http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/redmond/jquery-ui.css';
            GM_JQ2.type = 'text/css';
	    GM_JQ2.rel = 'stylesheet';
            GM_JQ2.async = true;
            GM_Head2.insertBefore(GM_JQ2, GM_Head2.firstChild);


            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);


            var GM_Head1 = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ1 = document.createElement('script');
            GM_JQ1.src = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js';
            GM_JQ1.type = 'text/javascript';
            GM_JQ1.async = true;
            GM_Head1.insertBefore(GM_JQ1, GM_Head1.firstChild);


        }
	    GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 1000);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }


    function letsJQuery() {
	var divTag1 = document.createElement("div");
	divTag1.innerHTML = '<div style="z-index:9999; -moz-border-radius:0 0 30% 0%; text-align:center;font-size:28px; \
			position:absolute; width:500px; height:40px; top: 0px; left:0px;background-color:#000"> \
			<a href="http://88.212.222.164/city_server_vk_prod/assets/app.html" target="_blank">Твой графитовый Мегаполисбот</a></div>';

if ( document.location.href != 'http://88.212.222.164/city_server_vk_prod/assets/app.html' ) {
//			myurl = Match(document.body.innerHTML, /var iframe_url = "(.+)"/);
//			alert(JSON.stringify(unsafeWindow.params));
//			user_id    = gup ('viewer_id' , myurl);
//			auth_key   = gup ('auth_key' , myurl);
			user_id    = unsafeWindow.params.viewer_id;
			auth_key   = unsafeWindow.params.auth_key;
			GM_setValue ('user_id' , user_id);
			GM_setValue ('auth_key' , auth_key);
			document.body.appendChild(divTag1);
		}else {
			user_id = GM_getValue ('user_id');
			auth_key = GM_getValue ('auth_key');
			document.body.innerHTML='<input type="button" style="font-size:18px" value="Упс, Мегаполисбот не запустился, нажмите, чтобы попробовать еще раз." name="reload1" id="reload1" onClick="window.location.reload()">';
			document.title = "Вконтакте Мегаполисбот"; 
			document.bgColor='black';
			appendcontrol();
		var onchange1 = document.getElementById('combo3');
			onchange1.addEventListener("change", renew_gifts, true);
};
}

/* ******************************************** MD5 ************************* */ 
function serializeObj( obj )
{
var returnVal;
if(obj != undefined){
switch(obj.constructor)
{
case Array:
var vArr="[";
for(var i=0;i<obj.length;i++)
{
if(i>0) vArr += ",";
vArr += serializeObj(obj[i]);
}
vArr += "]";
return vArr;
case String:
returnVal = escape("'" + obj + "'");
return returnVal;
case Number:
returnVal = isFinite(obj) ? obj.toString() : null;
return returnVal;
case Date:
returnVal = "#" + obj + "#";
return returnVal;
default:
if(typeof obj == "object"){
var vobj=[];
for(attr in obj)
{
if(typeof obj[attr] != "function")
{
vobj.push('"' + attr + '":' + serializeObj(obj[attr]));
}
}
if(vobj.length >0)
return "{" + vobj.join(",") + "}";
else
return "{}";
}
else
{
return obj.toString();
}
}
}
return null;
} 
/******************************************/
var md5 = function (string) {
function RotateLeft(lValue, iShiftBits) {
return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
}
function AddUnsigned(lX,lY) {
var lX4,lY4,lX8,lY8,lResult;
lX8 = (lX & 0x80000000);
lY8 = (lY & 0x80000000);
lX4 = (lX & 0x40000000);
lY4 = (lY & 0x40000000);
lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
if (lX4 & lY4) {
return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
}
if (lX4 | lY4) {
if (lResult & 0x40000000) {
return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
} else {
return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
}
} else {
return (lResult ^ lX8 ^ lY8);
}
}
function F(x,y,z) { return (x & y) | ((~x) & z); }
function G(x,y,z) { return (x & z) | (y & (~z)); }
function H(x,y,z) { return (x ^ y ^ z); }
function I(x,y,z) { return (y ^ (x | (~z))); }
function FF(a,b,c,d,x,s,ac) {
a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
return AddUnsigned(RotateLeft(a, s), b);
};
function GG(a,b,c,d,x,s,ac) {
a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
return AddUnsigned(RotateLeft(a, s), b);
};
function HH(a,b,c,d,x,s,ac) {
a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
return AddUnsigned(RotateLeft(a, s), b);
};
function II(a,b,c,d,x,s,ac) {
a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
return AddUnsigned(RotateLeft(a, s), b);
};
function ConvertToWordArray(string) {
var lWordCount;
var lMessageLength = string.length;
var lNumberOfWords_temp1=lMessageLength + 8;
var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
var lWordArray=Array(lNumberOfWords-1);
var lBytePosition = 0;
var lByteCount = 0;
while ( lByteCount < lMessageLength ) {
lWordCount = (lByteCount-(lByteCount % 4))/4;
lBytePosition = (lByteCount % 4)*8;
lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
lByteCount++;
}
lWordCount = (lByteCount-(lByteCount % 4))/4;
lBytePosition = (lByteCount % 4)*8;
lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
lWordArray[lNumberOfWords-2] = lMessageLength<<3;
lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
return lWordArray;
};
function WordToHex(lValue) {
var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
for (lCount = 0;lCount<=3;lCount++) {
lByte = (lValue>>>(lCount*8)) & 255;
WordToHexValue_temp = "0" + lByte.toString(16);
WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
}
return WordToHexValue;
};
function Utf8Encode(string) {
string = string.replace(/\r\n/g,"\n");
var utftext = "";
for (var n = 0; n < string.length; n++) {
var c = string.charCodeAt(n);
if (c < 128) {
utftext += String.fromCharCode(c);
}
else if((c > 127) && (c < 2048)) {
utftext += String.fromCharCode((c >> 6) | 192);
utftext += String.fromCharCode((c & 63) | 128);
}
else {
utftext += String.fromCharCode((c >> 12) | 224);
utftext += String.fromCharCode(((c >> 6) & 63) | 128);
utftext += String.fromCharCode((c & 63) | 128);
}
}
return utftext;
};
var x=Array();
var k,AA,BB,CC,DD,a,b,c,d;
var S11=7, S12=12, S13=17, S14=22;
var S21=5, S22=9 , S23=14, S24=20;
var S31=4, S32=11, S33=16, S34=23;
var S41=6, S42=10, S43=15, S44=21;
string = Utf8Encode(string);
x = ConvertToWordArray(string);
a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
for (k=0;k<x.length;k+=16) {
AA=a; BB=b; CC=c; DD=d;
a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
d=GG(d,a,b,c,x[k+10],S22,0x2441453);
c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
a=II(a,b,c,d,x[k+0], S41,0xF4292244);
d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
c=II(c,d,a,b,x[k+6], S43,0xA3014314);
b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
a=AddUnsigned(a,AA);
b=AddUnsigned(b,BB);
c=AddUnsigned(c,CC);
d=AddUnsigned(d,DD);
}
var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
return temp.toLowerCase();
}
/* ******************************************************************************************************* */

function calcSig()
{
return md5( user_id + '_' + SIG_KEY );
} 
