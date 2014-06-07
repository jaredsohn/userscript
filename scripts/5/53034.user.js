// ==UserScript==
// @name           Best Items by Storan (the West.ru)
// @namespace      the-west.ru
// @description    Выбор лучших вещей для работы.
// @include        *.the-west.*
// @exclude        *www.the-west.*
// ==/UserScript==

// Version 0.1 prebeta
// спасибо чехам (Chezh The West Help Group) и вестстату (The West Stats & Tools), за код скриптов и инфу о вещах
// (c) Kolesnikov Alexander, aka Storan in West

bi_code="";

bi_code+="\
res = '';\
var SpisokRabot ={};\
SpisokRabot[1] = {rus_name:'Выпас свиней', name:'swine', malus:1, navyki:{tough:1,endurance:1,leadership:1,animal:2}};\
SpisokRabot[2] = {rus_name:'Присмотр за полем', name:'scarecrow', malus:0, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}};\
SpisokRabot[3] = {rus_name:'Расклейка плакатов', name:'wanted', malus:0, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}};\
SpisokRabot[4] = {rus_name:'Сбор табака', name:'tabacco', malus:0, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}};\
SpisokRabot[5] = {rus_name:'Сбор хлопка', name:'cotton', malus:1, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}};\
SpisokRabot[6] = {rus_name:'Сбор сахарного тростника', name:'sugar', malus:3, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}};\
SpisokRabot[7] = {rus_name:'Рыбалка', name:'angle', malus:2, navyki:{hide:1,swim:3,repair:1}};\
SpisokRabot[8] = {rus_name:'Жатва', name:'cereal', malus:10, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}};\
SpisokRabot[9] = {rus_name:'Сбор ягод', name:'berry', malus:15, navyki:{tough:2,hide:1,finger_dexterity:2}};\
SpisokRabot[10] = {rus_name:'Выпас овец', name:'sheeps', malus:11, navyki:{tough:1,endurance:1,leadership:1,animal:2}};\
SpisokRabot[11] = {rus_name:'Продажа прессы', name:'newspaper', malus:8, navyki:{ride:2,trade:2,appearance:1}};\
SpisokRabot[12] = {rus_name:'Сенокос', name:'cut', malus:21, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}};\
SpisokRabot[13] = {rus_name:'Помол зерна', name:'grinding', malus:24, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}};\
SpisokRabot[14] = {rus_name:'Сбор кукурузы', name:'corn', malus:22, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}};\
SpisokRabot[15] = {rus_name:'Сбор фасоли', name:'beans', malus:22, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}};\
SpisokRabot[16] = {rus_name:'Охрана форта', name:'fort_guard', malus:24, navyki:{reflex:1,shot:1,leadership:1,appearance:2}};\
SpisokRabot[17] = {rus_name:'Дубление кожи', name:'tanning', malus:39, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}};\
SpisokRabot[18] = {rus_name:'Поиск золота', name:'digging', malus:30, navyki:{tough:1,reflex:1,swim:1,trade:2}};\
SpisokRabot[19] = {rus_name:'Захоронение', name:'grave', malus:75, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}};\
SpisokRabot[20] = {rus_name:'Охота на индейку', name:'turkey', malus:42, navyki:{reflex:1,hide:2,shot:1,pitfall:1}};\
SpisokRabot[21] = {rus_name:'Строительство железной дороги', name:'rail', malus:44, navyki:{build:2,endurance:1,repair:1,leadership:1}};\
SpisokRabot[22] = {rus_name:'Выпас коров', name:'cow', malus:38, navyki:{ride:2,reflex:1,tactic:1,animal:1}};\
SpisokRabot[23] = {rus_name:'Ремонт забора', name:'fence', malus:35, navyki:{finger_dexterity:1,repair:2,animal:2}};\
SpisokRabot[24] = {rus_name:'Лесопилка', name:'saw', malus:63, navyki:{reflex:2,finger_dexterity:2,trade:1}};\
SpisokRabot[25] = {rus_name:'Выработка камня', name:'stone', malus:52, navyki:{punch:3,endurance:1,reflex:1}};\
SpisokRabot[26] = {rus_name:'Спрямление русла', name:'straighten', malus:84, navyki:{build:1,swim:3,tactic:1}};\
SpisokRabot[27] = {rus_name:'Лесоповал', name:'wood', malus:47, navyki:{punch:2,endurance:1,reflex:1,appearance:1}};\
SpisokRabot[28] = {rus_name:'Орошение', name:'irrigation', malus:44, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}};\
SpisokRabot[29] = {rus_name:'Клеймение скота', name:'brand', malus:49, navyki:{ride:1,reflex:1,pitfall:1,animal:2}};\
SpisokRabot[30] = {rus_name:'Ограждение пастбища', name:'wire', malus:57, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}};\
SpisokRabot[31] = {rus_name:'Прорыв плотины', name:'dam', malus:53, navyki:{swim:2,tactic:2,animal:1}};\
SpisokRabot[32] = {rus_name:'Добыча самоцветов', name:'gems', malus:74, navyki:{swim:2,finger_dexterity:1,trade:2}};\
SpisokRabot[33] = {rus_name:'Разметка приисков', name:'claim', malus:56, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}};\
SpisokRabot[34] = {rus_name:'Ремонт повозок', name:'chuck_wagon', malus:133, navyki:{ride:1,repair:2,leadership:1,trade:1}};\
SpisokRabot[35] = {rus_name:'Объезд лошадей', name:'break_in', malus:71, navyki:{ride:2,reflex:1,pitfall:1,animal:1}};\
SpisokRabot[36] = {rus_name:'Торговля', name:'trade', malus:84, navyki:{pitfall:1,trade:2,appearance:2}};\
SpisokRabot[37] = {rus_name:'Прокладка телеграфной линии', name:'mast', malus:74, navyki:{build:2,punch:1,swim:1,repair:1}};\
SpisokRabot[38] = {rus_name:'Рытьё колодца', name:'spring', malus:102, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}};\
SpisokRabot[39] = {rus_name:'Охота на бобра', name:'beaver', malus:119, navyki:{hide:2,pitfall:3}};\
SpisokRabot[40] = {rus_name:'Добыча угля', name:'coal', malus:85, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}};\
SpisokRabot[41] = {rus_name:'Типография', name:'print', malus:82, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}};\
SpisokRabot[42] = {rus_name:'Рыбная ловля', name:'fishing', malus:90, navyki:{swim:2,pitfall:2,leadership:1}};\
SpisokRabot[43] = {rus_name:'Строительство вокзала', name:'trainstation', malus:112, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}};\
SpisokRabot[44] = {rus_name:'Строительство ветряной мельницы', name:'windmeel', malus:163, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}};\
SpisokRabot[45] = {rus_name:'Рекогносцировка', name:'explore', malus:111, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}};\
SpisokRabot[46] = {rus_name:'Сплав леса', name:'float', malus:137, navyki:{reflex:1,swim:3,tactic:1}};\
SpisokRabot[47] = {rus_name:'Строительство моста', name:'bridge', malus:107, navyki:{build:1,endurance:1,swim:2,repair:1}};\
SpisokRabot[48] = {rus_name:'Отлов лошадей', name:'springe', malus:134, navyki:{endurance:1,ride:2,animal:2}};\
SpisokRabot[49] = {rus_name:'Изготовление гробов', name:'coffin', malus:118, navyki:{build:1,reflex:1,repair:2,appearance:1}};\
SpisokRabot[50] = {rus_name:'Доставка амуниции', name:'dynamite', malus:144, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}};\
SpisokRabot[51] = {rus_name:'Охота на койотов', name:'coyote', malus:140, navyki:{endurance:2,shot:1,pitfall:1,hide:1}};\
SpisokRabot[52] = {rus_name:'Охота на бизона', name:'buffalo', malus:178, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}};\
SpisokRabot[53] = {rus_name:'Возведение укреплений', name:'fort', malus:224, navyki:{build:1,pitfall:1,repair:1,leadership:2}};\
SpisokRabot[54] = {rus_name:'Торговля с индейцами', name:'indians', malus:223, navyki:{pitfall:1,trade:2,appearance:2}};\
SpisokRabot[55] = {rus_name:'Вырубка леса', name:'clearing', malus:178, navyki:{punch:2,reflex:1,leadership:1,tactic:1}};\
SpisokRabot[56] = {rus_name:'Добыча серебра', name:'silver', malus:193, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}};\
SpisokRabot[57] = {rus_name:'Охрана дилижанса', name:'diligence_guard', malus:403, navyki:{ride:1,shot:1,repair:1,leadership:2}};\
SpisokRabot[58] = {rus_name:'Охота на волков', name:'wolf', malus:207, navyki:{hide:2,pitfall:2,animal:1}};\
SpisokRabot[59] = {rus_name:'Охрана каравана', name:'track', malus:212, navyki:{hide:2,leadership:2,tactic:1}};\
SpisokRabot[60] = {rus_name:'Конокрадство', name:'ox', malus:237, navyki:{reflex:1,hide:1,pitfall:2,animal:1}};\
SpisokRabot[61] = {rus_name:'Охрана тюрьмы', name:'guard', malus:221, navyki:{punch:1,reflex:1,shot:1,appearance:2}};\
SpisokRabot[62] = {rus_name:'Миссионерство', name:'bible', malus:235, navyki:{tough:1,ride:1,trade:1,appearance:2}};\
SpisokRabot[63] = {rus_name:'Пони-экспресс', name:'ponyexpress', malus:225, navyki:{endurance:1,ride:2,shot:1,animal:1}};\
SpisokRabot[64] = {rus_name:'Торговля оружием с индейцами', name:'weapons', malus:257, navyki:{hide:1,shot:1,repair:1,trade:2}};\
SpisokRabot[65] = {rus_name:'Мародёрство', name:'dead', malus:265, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}};\
SpisokRabot[66] = {rus_name:'Охота на гризли', name:'grizzly', malus:280, navyki:{hide:1,shot:1,pitfall:2,animal:1}};\
SpisokRabot[67] = {rus_name:'Добыча нефти', name:'oil', malus:294, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}};\
SpisokRabot[68] = {rus_name:'Поиски клада', name:'treasure_hunting', malus:293, navyki:{hide:2,repair:2,tactic:1}};\
SpisokRabot[69] = {rus_name:'Служба в армии', name:'army', malus:298, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}};\
SpisokRabot[70] = {rus_name:'Мелкое воровство', name:'steal', malus:371, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}};\
SpisokRabot[71] = {rus_name:'Служба наёмником', name:'mercenary', malus:331, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}};\
SpisokRabot[72] = {rus_name:'Преследование бандитов', name:'bandits', malus:384, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}};\
SpisokRabot[73] = {rus_name:'Нападение на повозку', name:'aggression', malus:421, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}};\
SpisokRabot[74] = {rus_name:'Нападение на дилижанс', name:'diligence_aggression', malus:475, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}};\
SpisokRabot[75] = {rus_name:'Охота за преступниками', name:'bounty', malus:425, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}};\
SpisokRabot[76] = {rus_name:'Перевозка заключённых', name:'captured', malus:437, navyki:{endurance:1,reflex:1,hide:1,tactic:2}};\
SpisokRabot[77] = {rus_name:'Нападение на поезд', name:'train', malus:505, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}};\
SpisokRabot[78] = {rus_name:'Кража со взломом', name:'burglary', malus:517, navyki:{endurance:1,hide:2,tactic:1,trade:1}};\
SpisokRabot[79] = {rus_name:'Знахарство', name:'quackery', malus:315, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}};\
SpisokRabot[80] = {rus_name:'Парламентёрство', name:'peace', malus:366, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}};\
SpisokRabot[82] = {rus_name:'Речные перевозки', name:'ship', malus:347, navyki:{punch:1,swim:2,leadership:2}};\
SpisokRabot[83] = {rus_name:'Контрабанда', name:'smuggle', malus:410, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}};\
SpisokRabot[84] = {rus_name:'Строительство ранчо', name:'ranch', malus:220, navyki:{build:2,endurance:1,ride:1,animal:1}};\
SpisokRabot[85] = {rus_name:'Добыча железа', name:'iron', malus:176, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}};\
SpisokRabot[86] = {rus_name:'Сбор агавы', name:'agave', malus:152, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}};\
SpisokRabot[87] = {rus_name:'Сбор помидоров', name:'tomato', malus:42, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}};\
SpisokRabot[88] = {rus_name:'Набивка подков', name:'horseshoe', malus:92, navyki:{punch:1,ride:2,animal:2}};\
SpisokRabot[90] = {rus_name:'Тушение пожара', name:'fire', malus:228, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}};\
SpisokRabot[91] = {rus_name:'Сбор апельсинов', name:'orange', malus:66, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}};\
SpisokRabot[92] = {rus_name:'Чистка хлева', name:'muck_out', malus:7, navyki:{tough:1,ride:1,repair:1,animal:2}};\
SpisokRabot[93] = {rus_name:'Чистка обуви', name:'shoes', malus:0, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}};\
SpisokRabot[101] = {rus_name:'Городское строительство', name:'b_city', malus:0, navyki:{build:3,repair:1,leadership:1}};\
SpisokRabot[111] = {rus_name:'Передвижение', name:'moving', malus:0, navyki:{ride:1}};\
SpisokRabot[121] = {rus_name:'Стр. vs стр. атака', name:'sh_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,appearance:1}};\
SpisokRabot[122] = {rus_name:'Рук. vs стр. атака', name:'me_vs_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,appearance:1}};\
SpisokRabot[123] = {rus_name:'Стр. vs стр. защита', name:'sh_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tactic:1}};\
SpisokRabot[124] = {rus_name:'Рук. vs стр. защита', name:'me_vs_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tactic:1}};\
SpisokRabot[125] = {rus_name:'Стр. vs рук. атака', name:'sh_vs_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,appearance:1}};\
SpisokRabot[126] = {rus_name:'Рук. vs рук. атака', name:'me_vs_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,appearance:1}};\
SpisokRabot[127] = {rus_name:'Стр. vs рук. защита', name:'sh_vs_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,tactic:1}};\
SpisokRabot[128] = {rus_name:'Рук. vs рук. защита', name:'me_vs_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,tactic:1}};\
SpisokRabot[129] = {rus_name:'Стр. vs все защита', name:'sh_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1}};\
SpisokRabot[130] = {rus_name:'Рук. vs все защита', name:'me_vs_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1}};\
SpisokRabot[131] = {rus_name:'Стр. vs2 стр. атака', name:'sh_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,appearance:1,health:1}};\
SpisokRabot[132] = {rus_name:'Рук. vs2 стр. атака', name:'me_vs2_sh_at', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,appearance:1,health:1}};\
SpisokRabot[133] = {rus_name:'Стр. vs2 стр. защита', name:'sh_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,shot:1,reflex:1,tactic:1,health:1}};\
SpisokRabot[134] = {rus_name:'Рук. vs2 стр. защита', name:'me_vs2_sh_de', malus:0, navyki:{aim:1,dodge:1,punch:1,reflex:1,tactic:1,health:1}};\
SpisokRabot[135] = {rus_name:'Стр. vs2 рук. атака', name:'sh_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,appearance:1,health:1}};\
SpisokRabot[136] = {rus_name:'Рук. vs2 рук. атака', name:'me_vs2_me_at', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,appearance:1,health:1}};\
SpisokRabot[137] = {rus_name:'Стр. vs2 рук. защита', name:'sh_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,shot:1,tough:1,tactic:1,health:1}};\
SpisokRabot[138] = {rus_name:'Рук. vs2 рук. защита', name:'me_vs2_me_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:1,tactic:1,health:1}};\
SpisokRabot[139] = {rus_name:'Стр. vs2 все защита', name:'sh_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1,health:1}};\
SpisokRabot[140] = {rus_name:'Рук. vs2 все защита', name:'me_vs2_al_de', malus:0, navyki:{aim:1,dodge:1,punch:1,tough:0.5,reflex:0.5,tactic:1,health:1}};\
";

/*
*/

bi_code+= "\
    var komplekty={max_item:null,set_farmer:null, set_mexican:null, set_indian:null, set_quackery:null, set_pilgrim_male:null, set_pilgrim_female:null, set_gentleman:null, set_dancer:null};\
    var index_name= new Array ('max_item','set_farmer','set_mexican','set_indian','set_quackery','set_pilgrim_male','set_pilgrim_female','set_gentleman','set_dancer');\
    \
    komplekty.max_item={};\
    komplekty.max_item[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[2] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[3] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[4] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[5] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[6] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.max_item[7] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    \
    komplekty.set_farmer={};\
    komplekty.set_farmer[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_farmer[2] = {obj:{bonus:{attributes:{flexibility:1,strength:1},skills:null},speed:null},raboty:new Array()};\
    komplekty.set_farmer[2].raboty[8]=10;komplekty.set_farmer[2].raboty[12]=10;komplekty.set_farmer[2].raboty[13]=10;\
    komplekty.set_farmer[3] = {obj:{bonus:{attributes:{flexibility:1,strength:1,dexterity:1,charisma:1},skills:null},speed:null},raboty:new Array()};\
    komplekty.set_farmer[3].raboty[8]=10;komplekty.set_farmer[3].raboty[12]=10;komplekty.set_farmer[3].raboty[13]=10;\
    komplekty.set_farmer[3].raboty[88]=20;komplekty.set_farmer[3].raboty[30]=20;komplekty.set_farmer[3].raboty[22]=20;\
    komplekty.set_farmer[4] = {obj:{bonus:{attributes:{flexibility:2,strength:2,dexterity:2,charisma:2},skills:null},speed:null},raboty:new Array()};\
    komplekty.set_farmer[4].raboty[8]=10;komplekty.set_farmer[4].raboty[12]=10;komplekty.set_farmer[4].raboty[13]=10;\
    komplekty.set_farmer[4].raboty[88]=20;komplekty.set_farmer[4].raboty[30]=20;komplekty.set_farmer[4].raboty[22]=20;\
    komplekty.set_farmer[4].raboty[48]=40;komplekty.set_farmer[4].raboty[84]=40;komplekty.set_farmer[4].raboty[44]=40;\
    komplekty.set_farmer[5] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_farmer[6] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    \
    komplekty.set_indian={};\
    komplekty.set_indian[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_indian[2] = {obj:{bonus:{attributes:{flexibility:2},skills:{hide:8}},speed:0.8696},raboty:new Array()};\
    komplekty.set_indian[2].raboty[51]=30;\
    komplekty.set_indian[3] = {obj:{bonus:{attributes:{flexibility:5},skills:{hide:8,swim:8}},speed:0.7692},raboty:new Array()};\
    komplekty.set_indian[3].raboty[51]=30;komplekty.set_indian[3].raboty[52]=40;\
    komplekty.set_indian[4] = {obj:{bonus:{attributes:{flexibility:8},skills:{hide:8,swim:8,pitfall:8}},speed:0.6944},raboty:new Array()};\
    komplekty.set_indian[4].raboty[51]=30;komplekty.set_indian[4].raboty[52]=40;komplekty.set_indian[4].raboty[58]=50;\
    komplekty.set_indian[5] = {obj:{bonus:{attributes:{flexibility:12},skills:{hide:8,swim:8,pitfall:8,animal:8}},speed:0.625},raboty:new Array()};\
    komplekty.set_indian[5].raboty[51]=30;komplekty.set_indian[5].raboty[52]=40;komplekty.set_indian[5].raboty[58]=50;;komplekty.set_indian[5].raboty[66]=60;\
    komplekty.set_indian[6] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    \
    komplekty.set_mexican={};\
    komplekty.set_mexican[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_mexican[2] = {obj:{bonus:{attributes:{strength:1},skills:null},speed:0.8929},raboty:new Array()};\
    komplekty.set_mexican[3] = {obj:{bonus:{attributes:{strength:2},skills:null},speed:0.8065},raboty:new Array()};\
    komplekty.set_mexican[3].raboty[86]=60;\
    komplekty.set_mexican[4] = {obj:{bonus:{attributes:{strength:4},skills:null},speed:0.7353},raboty:new Array()};\
    komplekty.set_mexican[4].raboty[86]=60;komplekty.set_mexican[4].raboty[67]=70;\
    komplekty.set_mexican[5] = {obj:{bonus:{attributes:{strength:6},skills:null},speed:0.6757},raboty:new Array()};\
    komplekty.set_mexican[5].raboty[86]=60;komplekty.set_mexican[5].raboty[67]=70;komplekty.set_mexican[5].raboty[83]=80;\
    komplekty.set_mexican[6] = {obj:{bonus:{attributes:{strength:9},skills:null},speed:0.625},raboty:new Array()};\
    komplekty.set_mexican[6].raboty[86]=60;komplekty.set_mexican[6].raboty[67]=70;komplekty.set_mexican[6].raboty[83]=80;komplekty.set_mexican[6].raboty[50]=90;\
    \
    komplekty.set_quackery={};\
    komplekty.set_quackery[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_quackery[2] = {obj:{bonus:{attributes:{dexterity:1},skills:{endurance:5,trade:5}},speed:null},raboty:new Array()};\
    komplekty.set_quackery[2].raboty[79]=30;\
    komplekty.set_quackery[3] = {obj:{bonus:{attributes:{dexterity:2},skills:{endurance:10,trade:10}},speed:null},raboty:new Array()};\
    komplekty.set_quackery[3].raboty[79]=60;\
    komplekty.set_quackery[4] = {obj:{bonus:{attributes:{dexterity:4},skills:{endurance:15,trade:15}},speed:null},raboty:new Array()};\
    komplekty.set_quackery[4].raboty[79]=90;\
    komplekty.set_quackery[5] = {obj:{bonus:{attributes:{dexterity:6},skills:{endurance:20,trade:20}},speed:null},raboty:new Array()};\
    komplekty.set_quackery[5].raboty[79]=120;\
    komplekty.set_quackery[6] = {obj:{bonus:{attributes:{dexterity:9},skills:{endurance:20,trade:20,reflex:18,tough:18,aim:18,shot:18}},speed:null},raboty:new Array()};\
    komplekty.set_quackery[6].raboty[79]=120;\
    \
    komplekty.set_pilgrim_male={};\
    komplekty.set_pilgrim_male[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_male[2] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_male[2].raboty[101]=5;\
    komplekty.set_pilgrim_male[3] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_male[3].raboty[101]=15;\
    komplekty.set_pilgrim_male[4] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_male[4].raboty[101]=30;\
    komplekty.set_pilgrim_male[5] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_male[5].raboty[101]=50;komplekty.set_pilgrim_male[5].raboty[62]=150;\
    komplekty.set_pilgrim_male[6] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    \
    komplekty.set_pilgrim_female={};\
    komplekty.set_pilgrim_female[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_female[2] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_female[2].raboty[101]=5;\
    komplekty.set_pilgrim_female[3] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_female[3].raboty[101]=15;\
    komplekty.set_pilgrim_female[4] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_female[4].raboty[101]=30;\
    komplekty.set_pilgrim_female[5] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_pilgrim_female[5].raboty[101]=50;komplekty.set_pilgrim_female[5].raboty[62]=150;\
    komplekty.set_pilgrim_female[6] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    \
    komplekty.set_gentleman={};\
    komplekty.set_gentleman[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_gentleman[2] = {obj:{bonus:{attributes:{charisma:1},skills:{appearance:8}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_gentleman[2].raboty[i]=5};komplekty.set_gentleman[2].raboty[101]=5;\
    komplekty.set_gentleman[3] = {obj:{bonus:{attributes:{charisma:3},skills:{appearance:8,leadership:8}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_gentleman[3].raboty[i]=15};komplekty.set_gentleman[3].raboty[101]=15;\
    komplekty.set_gentleman[4] = {obj:{bonus:{attributes:{charisma:6},skills:{appearance:8,leadership:8,trade:8}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_gentleman[4].raboty[i]=30};komplekty.set_gentleman[4].raboty[101]=30;\
    komplekty.set_gentleman[5] = {obj:{bonus:{attributes:{charisma:10},skills:{appearance:16,leadership:8,trade:8}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_gentleman[5].raboty[i]=50};komplekty.set_gentleman[5].raboty[101]=50;\
    \
    komplekty.set_dancer={};\
    komplekty.set_dancer[1] = {obj:{bonus:{attributes:null,skills:null},speed:null},raboty:new Array()};\
    komplekty.set_dancer[2] = {obj:{bonus:{attributes:{charisma:2},skills:{appearance:10}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_dancer[2].raboty[i]=10};komplekty.set_dancer[2].raboty[101]=10;\
    komplekty.set_dancer[3] = {obj:{bonus:{attributes:{charisma:5},skills:{appearance:10,animal:10}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_dancer[3].raboty[i]=25};komplekty.set_dancer[3].raboty[101]=25;\
    komplekty.set_dancer[4] = {obj:{bonus:{attributes:{charisma:9},skills:{appearance:10,animal:10,finger_dexterity:10}},speed:null},raboty:new Array()};\
    for (i=1;i<94;++i) {komplekty.set_dancer[4].raboty[i]=45};komplekty.set_dancer[4].raboty[101]=45;\
";


bi_code+= "\
    sila=new Array ('build','punch','tough','endurance','health');\
    lovkost=new Array ('ride','reflex','dodge','hide','swim');\
    snorovka=new Array ('aim','shot','pitfall','finger_dexterity','repair');\
    sharm=new Array ('leadership','tactic','trade','animal','appearance');\
";

bi_code+= " \
function summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut) \
{\
    var s=0;\
    if (vesch.obj.bonus.skills){\
    for (rr in navyki)\
    {   \
        if (vesch.obj.bonus.skills[navyki[rr]])\
        {   s+=vesch.obj.bonus.skills[navyki[rr]] * rabota.navyki[navyki[rr]];}\
    }}\
    if (vesch.obj.bonus.attributes){\
    for (vv in kharakteristiki)\
    {   \
        if (vesch.obj.bonus.attributes[kharakteristiki[vv]])\
        {   s+=vesch.obj.bonus.attributes[kharakteristiki[vv]] * atribut[kharakteristiki[vv]];}\
    }}\
    return s;\
}\
";

bi_code+= " \
function veschi_dlja_raboty(val) \
{\
    var rabota=SpisokRabot[val];\
    if ((val==777) || !val || !rabota)\
    {   var inv_best_item = document.getElementById('inv_best_item');\
        if (inv_best_item) {inv_best_item.innerHTML=''}\
        var menu_best_item = document.getElementById('menu_best_item');\
        if (menu_best_item) {menu_best_item.innerHTML=''}\
        var menu2_best_item = document.getElementById('menu2_best_item');\
        if (menu2_best_item) {menu2_best_item.innerHTML=''}\
        return;\
    }\
    var inv = document.getElementById('window_inventory_content');\
    if (!inv) return;\
    bagazh = Bag.getInstance().items;\
    pers = Character;\
    var navyki={};\
    var kharakteristiki={};\
    ww=0;\
    for (ii in rabota.navyki)\
    {   navyki[++ww]=ii}\
    var atribut={strength:0,flexibility:0,dexterity:0,charisma:0};\
    for (ii in rabota.navyki)\
    {\
        for (ss in sila)\
        {   if (sila[ss]==ii)\
            {   atribut.strength+=rabota.navyki[ii]}}\
        for (ll in lovkost)\
        {   if (lovkost[ll]==ii)\
            {   atribut.flexibility+=rabota.navyki[ii]}}\
        for (nn in snorovka)\
        {   if (snorovka[nn]==ii)\
            {   atribut.dexterity+=rabota.navyki[ii]}}\
        for (cc in sharm)\
        {   if (sharm[cc]==ii)\
            {   atribut.charisma+=rabota.navyki[ii]}}\
    }\
    ww=0;\
    for (gg in atribut)\
    {   kharakteristiki[++ww]=gg}\
    var slot_right ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_head  ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_body  ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_foot  ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_neck  ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_animal={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var slot_yield ={max_item:{bon:0,cur:null},set_farmer:{bon:0,cur:null},set_mexican:{bon:0,cur:null},set_indian:{bon:0,cur:null},set_quackery:{bon:0,cur:null},set_pilgrim_male:{bon:0,cur:null},set_pilgrim_female:{bon:0,cur:null},set_gentleman:{bon:0,cur:null},set_dancer:{bon:0,cur:null}};\
    var sprinter={speed:1.0,cur:null};\
    \
    vesch=Wear.wear.right_arm;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_right.max_item.bon)\
        {   slot_right.max_item.bon=s;slot_right.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_right[vesch.obj.set.key].bon=s;slot_right[vesch.obj.set.key].cur=-1;}\
    }\
    vesch=Wear.wear.head;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_head.max_item.bon)\
        {   slot_head.max_item.bon=s;slot_head.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_head[vesch.obj.set.key].bon=s;slot_head[vesch.obj.set.key].cur=-1;}\
    }\
    vesch=Wear.wear.body;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_body.max_item.bon)\
        {   slot_body.max_item.bon=s;slot_body.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_body[vesch.obj.set.key].bon=s;slot_body[vesch.obj.set.key].cur=-1;}\
    }\
    vesch=Wear.wear.foot;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_foot.max_item.bon)\
        {   slot_foot.max_item.bon=s;slot_foot.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_foot[vesch.obj.set.key].bon=s;slot_foot[vesch.obj.set.key].cur=-1;}\
    }\
    vesch=Wear.wear.neck;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_neck.max_item.bon)\
        {   slot_neck.max_item.bon=s;slot_neck.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_neck[vesch.obj.set.key].bon=s;slot_neck[vesch.obj.set.key].cur=-1;}\
    }\
    vesch=Wear.wear.animal;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_animal.max_item.bon)\
        {   slot_animal.max_item.bon=s;slot_animal.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_animal[vesch.obj.set.key].bon=s;slot_animal[vesch.obj.set.key].cur=-1;}\
        if (vesch.obj.speed&&(vesch.obj.speed<sprinter.speed)) {sprinter.speed=vesch.obj.speed;sprinter.cur=-1;}\
    }\
    vesch=Wear.wear.yield;\
    if (vesch)\
    {   s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
        if (s>slot_yield.max_item.bon)\
        {   slot_yield.max_item.bon=s;slot_yield.max_item.cur=-1}\
        if (null != vesch.obj.set)\
        {   slot_yield[vesch.obj.set.key].bon=s;slot_yield[vesch.obj.set.key].cur=-1;}\
    }\
    \
    \
    var uroven=pers.level;\
    for (v in bagazh)\
    {   vesch=bagazh[v];\
        if ((vesch.characterClass==null)||(vesch.characterClass==pers.characterClass)) {\
        if ((vesch.characterSex==null)||(vesch.characterSex==pers.characterSex)) {\
        \
         switch (vesch.get_type()) \
        {   case 'right_arm':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.right_arm+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_right.max_item.bon)\
                {   slot_right.max_item.bon=s;slot_right.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_right[vesch.obj.set.key].bon=s;slot_right[vesch.obj.set.key].cur=v;}\
            }\
            break;\
            case 'head':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.head+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_head.max_item.bon)\
                {   slot_head.max_item.bon=s;slot_head.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_head[vesch.obj.set.key].bon=s;slot_head[vesch.obj.set.key].cur=v}\
            }\
            break;\
            case 'body':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.body+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_body.max_item.bon)\
                {   slot_body.max_item.bon=s;slot_body.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_body[vesch.obj.set.key].bon=s;slot_body[vesch.obj.set.key].cur=v;}\
            }\
            break;\
            case 'foot':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.foot+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_foot.max_item.bon)\
                {   slot_foot.max_item.bon=s;slot_foot.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_foot[vesch.obj.set.key].bon=s;slot_foot[vesch.obj.set.key].cur=v;}\
            }\
            break;\
            case 'neck':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.neck+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_neck.max_item.bon)\
                {   slot_neck.max_item.bon=s;slot_neck.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_neck[vesch.obj.set.key].bon=s;slot_neck[vesch.obj.set.key].cur=v;}\
            }\
            break;\
            case 'animal':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.animal+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_animal.max_item.bon)\
                {   slot_animal.max_item.bon=s;slot_animal.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_animal[vesch.obj.set.key].bon=s;slot_animal[vesch.obj.set.key].cur=v;}\
                if (vesch.obj.speed&&(vesch.obj.speed<sprinter.speed)) {sprinter.speed=vesch.obj.speed;sprinter.cur=v;}\
            }\
            break;\
            case 'yield':\
            if (vesch.obj.level <= pers.itemLevelRequirementDecrease.yield+uroven)\
            {   \
                s=summa_ochkov(navyki, kharakteristiki, vesch, rabota, atribut);\
                if (s>slot_yield.max_item.bon)\
                {   slot_yield.max_item.bon=s;slot_yield.max_item.cur=v}\
                if (null != vesch.obj.set)\
                {   slot_yield[vesch.obj.set.key].bon=s;slot_yield[vesch.obj.set.key].cur=v;}\
            }\
            break;\
        }\
                       }}\
    }\
    \
    ivybor={right:null,head:null,body:null,foot:null,neck:null,animal:null,yield:null};\
    vybor={right:null,head:null,body:null,foot:null,neck:null,animal:null,yield:null,ochki:0,komplekty:0};\
    perebor=0;\
    predmety={max_item:0,set_farmer:0,set_mexican:0,set_indian:0,set_quackery:0,set_pilgrim_male:0,set_pilgrim_female:0,set_gentleman:0,set_dancer:0};\
    if (val==111)\
    {slot_animal.max_item.bon=0;slot_animal.max_item.cur=sprinter.cur;\
    svoj_bonus=pers.skills.ride;\
    svoja_skorost=pers.default_speed;\
    for (iright=0;iright<4;++iright)\
    {   if((iright==0)||(slot_right[index_name[iright]].cur)){\
        perebor+=slot_right[index_name[iright]].bon;\
        predmety[index_name[iright]]+=1;\
        for (ianimal=0;ianimal<4;++ianimal)\
        {   if((ianimal==0)||(slot_animal[index_name[ianimal]].cur)){\
            perebor+=slot_animal[index_name[ianimal]].bon;\
            predmety[index_name[ianimal]]+=1;\
            for (iyield=0;iyield<4;++iyield)\
            {   if((iyield==0)||(slot_yield[index_name[iyield]].cur)){\
                perebor+=slot_yield[index_name[iyield]].bon;\
                predmety[index_name[iyield]]+=1;\
                for (ineck=0;ineck<4;++ineck)\
                {   if((ineck==0)||(slot_neck[index_name[ineck]].cur)){\
                    perebor+=slot_neck[index_name[ineck]].bon;\
                    predmety[index_name[ineck]]+=1;\
                    for (ihead=0;ihead<4;++ihead)\
                    {   if((ihead==0)||(slot_head[index_name[ihead]].cur)){\
                        perebor+=slot_head[index_name[ihead]].bon;\
                        predmety[index_name[ihead]]+=1;\
                        for (ibody=0;ibody<4;++ibody)\
                        {   if((ibody==0)||(slot_body[index_name[ibody]].cur)){\
                            perebor+=slot_body[index_name[ibody]].bon;\
                            predmety[index_name[ibody]]+=1;\
                            for (ifoot=0;ifoot<4;++ifoot)\
                            {   if((ifoot==0)||(slot_foot[index_name[ifoot]].cur)){\
                                perebor+=slot_foot[index_name[ifoot]].bon;\
                                predmety[index_name[ifoot]]+=1;\
                                bonus_ot_komplektov=0;\
                                skorost_ot_komplektov=1.0;\
                                for (ipredmet=1;ipredmet<9;++ipredmet)\
                                {   if(predmety[index_name[ipredmet]]>1)\
                                    {   \
                                        ha_ha=komplekty[index_name[ipredmet]][predmety[index_name[ipredmet]]];\
                                        s=summa_ochkov(navyki, kharakteristiki, ha_ha, rabota, atribut);\
                                        bonus_ot_komplektov+=s;\
                                        if (ha_ha.obj.speed)    skorost_ot_komplektov *= ha_ha.obj.speed;\
                                    }\
                                }\
                                skor1=1.0;\
                                if(slot_animal[index_name[ianimal]].cur)\
                                {   skor1=(slot_animal[index_name[ianimal]].cur==-1)?Wear.wear.animal.obj.speed:bagazh[slot_animal[index_name[ianimal]].cur].obj.speed;\
                                }\
                                skor_full=(skor1<1.0)?(100.0/skor1)+perebor+bonus_ot_komplektov+svoj_bonus:1.0;\
                                skor_full /= skorost_ot_komplektov;\
                                skor_full /= svoja_skorost;\
                                if (skor_full>vybor.ochki)\
                                {   ivybor.right=iright;\
                                    ivybor.head=ihead;\
                                    ivybor.body=ibody;\
                                    ivybor.foot=ifoot;\
                                    ivybor.neck=ineck;\
                                    ivybor.animal=ianimal;\
                                    ivybor.yield=iyield;\
                                    vybor.ochki=skor_full;\
                                    vybor.komplekty=bonus_ot_komplektov;\
                                }\
                                perebor-=slot_foot[index_name[ifoot]].bon;\
                                predmety[index_name[ifoot]]-=1;\
                                }\
                            }\
                            perebor-=slot_body[index_name[ibody]].bon;\
                            predmety[index_name[ibody]]-=1;\
                            }\
                        }\
                        perebor-=slot_head[index_name[ihead]].bon;\
                        predmety[index_name[ihead]]-=1;\
                        }\
                    }\
                    perebor-=slot_neck[index_name[ineck]].bon;\
                    predmety[index_name[ineck]]-=1;\
                    }\
                }\
                perebor-=slot_yield[index_name[iyield]].bon;\
                predmety[index_name[iyield]]-=1;\
                }\
            }\
            perebor-=slot_animal[index_name[ianimal]].bon;\
            predmety[index_name[ianimal]]-=1;\
            }\
        }\
        perebor-=slot_right[index_name[iright]].bon;\
        predmety[index_name[iright]]-=1;\
        }    \
    }\
        \
    }\
    else    {\
    for (iright=0;iright<9;++iright)\
    {   if((iright==0)||(slot_right[index_name[iright]].cur)){\
        perebor+=slot_right[index_name[iright]].bon;\
        predmety[index_name[iright]]+=1;\
        for (ianimal=0;ianimal<9;++ianimal)\
        {   if((ianimal==0)||(slot_animal[index_name[ianimal]].cur)){\
            perebor+=slot_animal[index_name[ianimal]].bon;\
            predmety[index_name[ianimal]]+=1;\
            for (iyield=0;iyield<9;++iyield)\
            {   if((iyield==0)||(slot_yield[index_name[iyield]].cur)){\
                perebor+=slot_yield[index_name[iyield]].bon;\
                predmety[index_name[iyield]]+=1;\
                for (ineck=0;ineck<9;++ineck)\
                {   if((ineck==0)||(slot_neck[index_name[ineck]].cur)){\
                    perebor+=slot_neck[index_name[ineck]].bon;\
                    predmety[index_name[ineck]]+=1;\
                    for (ihead=0;ihead<9;++ihead)\
                    {   if((ihead==0)||(slot_head[index_name[ihead]].cur)){\
                        perebor+=slot_head[index_name[ihead]].bon;\
                        predmety[index_name[ihead]]+=1;\
                        for (ibody=0;ibody<9;++ibody)\
                        {   if((ibody==0)||(slot_body[index_name[ibody]].cur)){\
                            perebor+=slot_body[index_name[ibody]].bon;\
                            predmety[index_name[ibody]]+=1;\
                            for (ifoot=0;ifoot<9;++ifoot)\
                            {   if((ifoot==0)||(slot_foot[index_name[ifoot]].cur)){\
                                perebor+=slot_foot[index_name[ifoot]].bon;\
                                predmety[index_name[ifoot]]+=1;\
                                bonus_ot_komplektov=0;\
                                for (ipredmet=1;ipredmet<9;++ipredmet)\
                                {   if(predmety[index_name[ipredmet]]>1)\
                                    {   \
                                        ha_ha=komplekty[index_name[ipredmet]][predmety[index_name[ipredmet]]];\
                                        s=summa_ochkov(navyki, kharakteristiki, ha_ha, rabota, atribut);\
                                        if (ha_ha.raboty[val]) s+= ha_ha.raboty[val];\
                                        bonus_ot_komplektov+=s;\
                                    }\
                                }\
                                if (perebor+bonus_ot_komplektov>vybor.ochki)\
                                {   ivybor.right=iright;\
                                    ivybor.head=ihead;\
                                    ivybor.body=ibody;\
                                    ivybor.foot=ifoot;\
                                    ivybor.neck=ineck;\
                                    ivybor.animal=ianimal;\
                                    ivybor.yield=iyield;\
                                    vybor.ochki=perebor+bonus_ot_komplektov;\
                                    vybor.komplekty=bonus_ot_komplektov;\
                                }\
                                perebor-=slot_foot[index_name[ifoot]].bon;\
                                predmety[index_name[ifoot]]-=1;\
                                }\
                            }\
                            perebor-=slot_body[index_name[ibody]].bon;\
                            predmety[index_name[ibody]]-=1;\
                            }\
                        }\
                        perebor-=slot_head[index_name[ihead]].bon;\
                        predmety[index_name[ihead]]-=1;\
                        }\
                    }\
                    perebor-=slot_neck[index_name[ineck]].bon;\
                    predmety[index_name[ineck]]-=1;\
                    }\
                }\
                perebor-=slot_yield[index_name[iyield]].bon;\
                predmety[index_name[iyield]]-=1;\
                }\
            }\
            perebor-=slot_animal[index_name[ianimal]].bon;\
            predmety[index_name[ianimal]]-=1;\
            }\
        }\
        perebor-=slot_right[index_name[iright]].bon;\
        predmety[index_name[iright]]-=1;\
        }    \
    }}\
    \
    vybor.right=slot_right[index_name[ivybor.right]].cur;\
    vybor.head=slot_head[index_name[ivybor.head]].cur;\
    vybor.body=slot_body[index_name[ivybor.body]].cur;\
    vybor.foot=slot_foot[index_name[ivybor.foot]].cur;\
    vybor.neck=slot_neck[index_name[ivybor.neck]].cur;\
    vybor.animal=slot_animal[index_name[ivybor.animal]].cur;\
    vybor.yield=slot_yield[index_name[ivybor.yield]].cur;\
    \
    var i_bag = document.getElementById('bag');\
    var inv_best_item = document.getElementById('inv_best_item');\
	if (!inv_best_item)\
	{\
		inv_best_item = document.createElement('div');\
		inv_best_item.setAttribute('id','inv_best_item');\
		i_bag.parentNode.insertBefore(inv_best_item, i_bag);\
	}\
    var menu_best_item = document.getElementById('menu_best_item');\
    if (!menu_best_item) {\
    	menu_best_item = document.createElement('li');\
    	menu_best_item.setAttribute('id','menu_best_item');\
        var menu_set = document.getElementById('menu_settings');\
    	menu_set.parentNode.insertBefore(menu_best_item, menu_set.nextSibling);\
    }\
    var menu2_best_item = document.getElementById('menu2_best_item');\
    if (!menu2_best_item) {\
    	menu2_best_item = document.createElement('li');\
    	menu2_best_item.setAttribute('id','menu2_best_item');\
        var menu_du = document.getElementById('menu_duel');\
    	menu_du.parentNode.insertBefore(menu2_best_item, menu_du.nextSibling);\
    }\
	var htm='';var htm2='';var htm3='';\
    if (val==111)\
    {\
    htm+='<strong>Общий бонус&nbsp;скорости:&nbsp;'+Math.round(vybor.ochki)+'%</strong>&nbsp;';\
    }\
    else{\
    htm+='<strong>Бонус&nbsp;экипировки:&nbsp;+'+vybor.ochki+'</strong>&nbsp;(';\
    htm+='вещи&nbsp;+' + (vybor.ochki-vybor.komplekty) + ';&nbsp;наборы:&nbsp;+' + vybor.komplekty + ')<br />';\
    var navyki_persa = {obj:{bonus:{attributes:null,skills:null},speed:null}};\
    navyki_persa.obj.bonus.skills=pers.skills;\
    svoj_bonus=summa_ochkov(navyki, kharakteristiki, navyki_persa, rabota, atribut);\
    itogo=0;\
    itogo+=svoj_bonus+vybor.ochki;\
    if (val<100) {itogo=parseInt(pers.taskPointModifier.job*itogo,0)}\
    if (val==101) {itogo=parseInt(pers.taskPointModifier.build*itogo,0)}\
    htm+='<span>Бонус&nbsp;навыков:&nbsp;<strong>+' +svoj_bonus+ ';&nbsp;Итоговый&nbsp;бонус:&nbsp;+' +itogo+ '</strong></span><br />';\
    if (val<=100)   {\
        htm+='<span> Сложность&nbsp;работы:<strong>' + rabota.malus + '&nbsp;</strong>&nbsp;</span>';\
        balans=vybor.ochki+svoj_bonus-rabota.malus;\
        if (balans>0)\
        {   htm+='<span><strong><font color=\"green\">Работа&nbsp;доступна,&nbsp;очки:&nbsp;</font>'+balans+'</strong></span><br />';\
        }\
        else    {\
            balans = -balans;\
            htm+='<span><strong><font color=\"red\">Для работы&nbsp;не&nbsp;хватает:&nbsp;</font>'+balans+'</strong></span><br />';\
        }\
    }}\
    \
    htm2='<div style=\"font-size:xx-small;font-weight:bold;color:White;background-color:;\">';\
    htm2+='<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';\
    htm3='<div style=\"font-size:xx-small;font-weight:bold;color:White;background-color:;\">';\
    htm3+='<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">';\
	var ci=0;\
	if (vybor.neck) {\
	    ++ci;\
	    htm3+='<tr><td><img src=\"';\
        htm3+= (vybor.neck==-1)?Wear.wear.neck.obj.image_mini:bagazh[vybor.neck].obj.image_mini;\
	    htm3+='\" class=\"bag_item\" /></td></tr>';\
        htm3+= '<tr><td>&laquo;';\
        htm3+= (vybor.neck==-1)?Wear.wear.neck.obj.name:bagazh[vybor.neck].obj.name;\
        htm3+= '&raquo;</td></tr>';\
    }\
	if (vybor.right) {\
	    ++ci;\
	    htm3+='<tr><td><img src=\"';\
	    htm3+=(vybor.right==-1)?Wear.wear.right_arm.obj.image_mini:bagazh[vybor.right].obj.image_mini;\
	    htm3+='\" class=\"bag_item\" /></td></tr>';\
        htm3+= '<tr><td>&laquo;';\
        htm3+= (vybor.right==-1)?Wear.wear.right_arm.obj.name:bagazh[vybor.right].obj.name;\
        htm3+= '&raquo;</td></tr>';\
	}\
	if (vybor.yield) {\
	    ++ci;\
	    htm3+='<tr><td><img src=\"';\
        htm3+= (vybor.yield==-1)?Wear.wear.yield.obj.image_mini:bagazh[vybor.yield].obj.image_mini;\
	    htm3+='\" class=\"bag_item\" /></td></tr>';\
        htm3+= '<tr><td>&laquo;';\
        htm3+= (vybor.yield==-1)?Wear.wear.yield.obj.name:bagazh[vybor.yield].obj.name;\
        htm3+= '&raquo;</td></tr>';\
    }\
	if (vybor.head) {\
	    ++ci;\
	    htm2+='<tr><td><img src=\"';\
        htm2+= (vybor.head==-1)?Wear.wear.head.obj.image_mini:bagazh[vybor.head].obj.image_mini;\
	    htm2+='\" class=\"bag_item\" /></td></tr>';\
        htm2+= '<tr><td>&laquo;';\
        htm2+= (vybor.head==-1)?Wear.wear.head.obj.name:bagazh[vybor.head].obj.name;\
        htm2+= '&raquo;</td></tr>';\
	}\
	if (vybor.body) {\
	    ++ci;\
	    htm2+='<tr><td><img src=\"';\
        htm2+= (vybor.body==-1)?Wear.wear.body.obj.image_mini:bagazh[vybor.body].obj.image_mini;\
	    htm2+='\" class=\"bag_item\" /></td></tr>';\
        htm2+= '<tr><td>&laquo;';\
        htm2+= (vybor.body==-1)?Wear.wear.body.obj.name:bagazh[vybor.body].obj.name;\
        htm2+= '&raquo;</td></tr>';\
    }\
	if (vybor.foot){\
	    ++ci;\
	    htm2+='<tr><td><img src=\"';\
        htm2+= (vybor.foot==-1)?Wear.wear.foot.obj.image_mini:bagazh[vybor.foot].obj.image_mini;\
	    htm2+='\" class=\"bag_item\" /></td></tr>';\
        htm2+= '<tr><td>&laquo;';\
        htm2+= (vybor.foot==-1)?Wear.wear.foot.obj.name:bagazh[vybor.foot].obj.name;\
        htm2+= '&raquo;</td></tr>';\
    }\
	if (vybor.animal) {\
	    ++ci;\
	    htm2+='<tr><td><img src=\"';\
        htm2+= (vybor.animal==-1)?Wear.wear.animal.obj.image_mini:bagazh[vybor.animal].obj.image_mini;\
	    htm2+='\" class=\"bag_item\" /></td></tr>';\
        htm2+= '<tr><td>&laquo;';\
        htm2+= (vybor.animal==-1)?Wear.wear.animal.obj.name:bagazh[vybor.animal].obj.name;\
        htm2+= '&raquo;</td></tr>';\
    }\
    htm+='<hr>';\
    htm2+='</table></div>';\
    htm3+='</table></div>';\
    \
	inv_best_item.innerHTML=htm;\
	menu_best_item.innerHTML=htm2;\
	menu2_best_item.innerHTML=htm3;\
    \
    return;\
}\
";


var bi_body, bi_script;
bi_body = document.getElementsByTagName('body')[0];
if (bi_body) {
bi_script = document.createElement('script');
bi_script.type = 'text/javascript';
bi_script.innerHTML = bi_code;
bi_body.appendChild(bi_script);
};

var best_item = document.createElement("li");
best_item.id="best_item";
bi_html='';
bi_html = '<select id=\"vybor_raboty\" width=\"8\"  onchange=\"javascript:veschi_dlja_raboty(value)\">\n';
bi_html+= '<option value=\"0\">\&mdash;Открыть багаж, выбрать работу&mdash;</option>\n';
bi_html+= '<option value=\"777\">\&mdash; Для обнуления &mdash;</option>\n';
bi_html+= '<option value=\"53\">53.	Возведение укреплений</option>\n';
bi_html+= '<option value=\"22\">22.	Выпас коров</option>	\n';
bi_html+= '<option value=\"10\">10.	Выпас овец</option>\n';
bi_html+= '<option value=\"1\">1.	Выпас свиней</option>\n';
bi_html+= '<option value=\"25\">25.	Выработка камня</option>\n';
bi_html+= '<option value=\"55\">55.	Вырубка леса</option>\n';
bi_html+= '<option value=\"85\">85.	Добыча железа</option>\n';
bi_html+= '<option value=\"67\">67.	Добыча нефти</option>\n';
bi_html+= '<option value=\"32\">32.	Добыча самоцветов</option>\n';
bi_html+= '<option value=\"56\">56.	Добыча серебра</option>\n';
bi_html+= '<option value=\"40\">40.	Добыча угля</option>\n';
bi_html+= '<option value=\"50\">50.	Доставка амуниции</option>\n';
bi_html+= '<option value=\"17\">17.	Дубление кожи</option>\n';
bi_html+= '<option value=\"8\">8.	Жатва</option>\n';
bi_html+= '<option value=\"19\">19.	Захоронение</option>\n';
bi_html+= '<option value=\"79\">79.	Знахарство</option>\n';
bi_html+= '<option value=\"49\">49.	Изготовление гробов</option>\n';
bi_html+= '<option value=\"29\">29.	Клеймение скота</option>\n';
bi_html+= '<option value=\"60\">60.	Конокрадство</option>\n';
bi_html+= '<option value=\"83\">83.	Контрабанда</option>\n';
bi_html+= '<option value=\"78\">78.	Кража со взломом</option>\n';
bi_html+= '<option value=\"24\">24.	Лесопилка</option>\n';
bi_html+= '<option value=\"27\">27.	Лесоповал</option>\n';
bi_html+= '<option value=\"65\">65.	Мародёрство</option>\n';
bi_html+= '<option value=\"70\">70.	Мелкое воровство</option>\n';
bi_html+= '<option value=\"62\">62.	Миссионерство</option>\n';
bi_html+= '<option value=\"88\">88.	Набивка подков</option>\n';
bi_html+= '<option value=\"74\">74.	Нападение на дилижанс</option>\n';
bi_html+= '<option value=\"73\">73.	Нападение на повозку</option>\n';
bi_html+= '<option value=\"77\">77.	Нападение на поезд</option>\n';
bi_html+= '<option value=\"35\">35.	Объезд лошадей</option>\n';
bi_html+= '<option value=\"30\">30.	Ограждение пастбища</option>\n';
bi_html+= '<option value=\"28\">28.	Орошение</option>\n';
bi_html+= '<option value=\"48\">48.	Отлов лошадей</option>\n';
bi_html+= '<option value=\"75\">75.	Охота за преступниками</option>\n';
bi_html+= '<option value=\"52\">52.	Охота на бизона</option>\n';
bi_html+= '<option value=\"39\">39.	Охота на бобра</option>\n';
bi_html+= '<option value=\"58\">58.	Охота на волков</option>\n';
bi_html+= '<option value=\"66\">66.	Охота на гризли</option>\n';
bi_html+= '<option value=\"20\">20.	Охота на индейку</option>\n';
bi_html+= '<option value=\"51\">51.	Охота на койотов</option>\n';
bi_html+= '<option value=\"57\">57.	Охрана дилижанса</option>\n';
bi_html+= '<option value=\"59\">59.	Охрана каравана</option>\n';
bi_html+= '<option value=\"61\">61.	Охрана тюрьмы</option>\n';
bi_html+= '<option value=\"16\">16.	Охрана форта</option>\n';
bi_html+= '<option value=\"80\">80.	Парламентёрство</option>\n';
bi_html+= '<option value=\"76\">76.	Перевозка заключённых</option>\n';
bi_html+= '<option value=\"18\">18.	Поиск золота</option>\n';
bi_html+= '<option value=\"68\">68.	Поиски клада</option>\n';
bi_html+= '<option value=\"13\">13.	Помол зерна</option>\n';
bi_html+= '<option value=\"63\">63.	Пони-экспресс</option>\n';
bi_html+= '<option value=\"72\">72.	Преследование бандитов</option>\n';
bi_html+= '<option value=\"2\">2.	Присмотр за полем</option>\n';
bi_html+= '<option value=\"11\">11.	Продажа прессы</option>\n';
bi_html+= '<option value=\"37\">37.	Прокладка телеграфной линии</option>\n';
bi_html+= '<option value=\"31\">31.	Прорыв плотины</option>\n';
bi_html+= '<option value=\"33\">33.	Разметка приисков</option>\n';
bi_html+= '<option value=\"3\">3.	Расклейка плакатов</option>\n';
bi_html+= '<option value=\"45\">45.	Рекогносцировка</option>\n';
bi_html+= '<option value=\"23\">23.	Ремонт забора</option>\n';
bi_html+= '<option value=\"34\">34.	Ремонт повозок</option>\n';
bi_html+= '<option value=\"82\">82.	Речные перевозки</option>\n';
bi_html+= '<option value=\"7\">7.	Рыбалка</option>\n';
bi_html+= '<option value=\"42\">42.	Рыбная ловля</option>\n';
bi_html+= '<option value=\"38\">38.	Рытьё колодца</option>\n';
bi_html+= '<option value=\"86\">86.	Сбор агавы</option>\n';
bi_html+= '<option value=\"91\">91.	Сбор апельсинов</option>\n';
bi_html+= '<option value=\"14\">14.	Сбор кукурузы</option>\n';
bi_html+= '<option value=\"87\">87.	Сбор помидоров</option>\n';
bi_html+= '<option value=\"6\">6.	Сбор сахарного тростника</option>\n';
bi_html+= '<option value=\"4\">4.	Сбор табака</option>\n';
bi_html+= '<option value=\"15\">15.	Сбор фасоли</option>\n';
bi_html+= '<option value=\"5\">5.	Сбор хлопка</option>\n';
bi_html+= '<option value=\"9\">9.	Сбор ягод</option>\n';
bi_html+= '<option value=\"12\">12.	Сенокос</option>\n';
bi_html+= '<option value=\"69\">69.	Служба в армии</option>\n';
bi_html+= '<option value=\"71\">71.	Служба наёмником</option>\n';
bi_html+= '<option value=\"46\">46.	Сплав леса</option>\n';
bi_html+= '<option value=\"26\">26.	Спрямление русла</option>\n';
bi_html+= '<option value=\"44\">44.	Строительство ветряной мельницы</option>\n';
bi_html+= '<option value=\"43\">43.	Строительство вокзала</option>\n';
bi_html+= '<option value=\"21\">21.	Строительство железной дороги</option>\n';
bi_html+= '<option value=\"47\">47.	Строительство моста</option>\n';
bi_html+= '<option value=\"84\">84.	Строительство ранчо</option>\n';
bi_html+= '<option value=\"41\">41.	Типография</option>\n';
bi_html+= '<option value=\"36\">36.	Торговля</option>\n';
bi_html+= '<option value=\"64\">64.	Торговля оружием с индейцами</option>\n';
bi_html+= '<option value=\"54\">54.	Торговля с индейцами</option>\n';
bi_html+= '<option value=\"90\">90.	Тушение пожара</option>\n';
bi_html+= '<option value=\"93\">93.	Чистка обуви</option>\n';
bi_html+= '<option value=\"92\">92.	Чистка хлева</option>\n';
bi_html+= '<option value=\"101\">101.	Городское строительство</option>\n';
bi_html+= '<option value=\"111\">111.	Передвижение</option>\n';
bi_html+= '<option value=\"121\">121.	Стр. vs стр. атака</option>\n';
bi_html+= '<option value=\"122\">122.	Рук. vs стр. атака</option>\n';
bi_html+= '<option value=\"123\">123.	Стр. vs стр. защита</option>\n';
bi_html+= '<option value=\"124\">124.	Рук. vs стр. защита</option>\n';
bi_html+= '<option value=\"125\">125.	Стр. vs рук. атака</option>\n';
bi_html+= '<option value=\"126\">126.	Рук. vs рук. атака</option>\n';
bi_html+= '<option value=\"127\">127.	Стр. vs рук. защита</option>\n';
bi_html+= '<option value=\"128\">128.	Рук. vs рук. защита</option>\n';
bi_html+= '<option value=\"129\">129.	Стр. vs все защита</option>\n';
bi_html+= '<option value=\"130\">130.	Рук. vs все защита</option>\n';
bi_html+= '<option value=\"131\">131.	Стр. vs2 стр. атака</option>\n';
bi_html+= '<option value=\"132\">132.	Рук. vs2 стр. атака</option>\n';
bi_html+= '<option value=\"133\">133.	Стр. vs2 стр. защита</option>\n';
bi_html+= '<option value=\"134\">134.	Рук. vs2 стр. защита</option>\n';
bi_html+= '<option value=\"135\">135.	Стр. vs2 рук. атака</option>\n';
bi_html+= '<option value=\"136\">136.	Рук. vs2 рук. атака</option>\n';
bi_html+= '<option value=\"137\">137.	Стр. vs2 рук. защита</option>\n';
bi_html+= '<option value=\"138\">138.	Рук. vs2 рук. защита</option>\n';
bi_html+= '<option value=\"139\">139.	Стр. vs2 все защита</option>\n';
bi_html+= '<option value=\"140\">140.	Рук. vs2 все защита</option>\n';
bi_html+= '</select>';

best_item.innerHTML=bi_html;

var menu_character = document.getElementById('menu_character');
if (menu_character) {
    menu_character.parentNode.insertBefore(best_item, menu_character);
}
// ================================ WORK LISTBOX COORDINATES  =====================
best_item.style.position = 'absolute';
best_item.style.left = '370px';
best_item.style.top = '55px';