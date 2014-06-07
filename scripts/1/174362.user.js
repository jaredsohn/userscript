// ==UserScript==
// @name           My Script
// @description    A brief description of your script
// @author         Your Name
// @include        http://barbars.ru
// @version        1.1
// ==/UserScript==
/* скрипт альянса Волки Одина, Modified by: мега & окси & хром (28.06.2013) :) 
по всем вопросам обращаться на E-mail: man-91@mail.ru или спейс: barbars_ru :) 
*/

var autologin= false;          // Автологин
var Username = "";             // Логин
var Password = "";             // Пароль
var Setcolorn= "#7FFF00";  // Цвет обвода ссылки до усталости
var Setcoloru= "#7FFF00";  // Цвет обвода ссылки при усталости

//      с премиумом,без премиума
var Altar= [  2,          1 ];  // алтарь 0 - не брать; 1 - за железо; 2 - за золото; 3 - алтарь+5замков; 4 - алтарь+все замки; 5 - алтарь+все замки+колодец

//            Башни,Звери,Арена,Выживание,Город,Турниры,Территории,Логово,Замки,Поля,Цари,Битва Героев
var SetButtle=[0,    99,   0,    0,     0,    0,      30,      0,    0,  30,   0,     0];
// уровень здоровья для бутылки до 200 - % от здоровья. выше 200 - порог здоровья. 0 - не пить

//              Территории,Звери,Замки
var buttleTZ  = [    0,      1,    0 ];  // пить бутылку если энергия на исходе. 1 - пить, 0 - нет

//                       уворот,эн щит,кам щит,щит отраж,обман смерти
var SetUmenia=           [ 1,     1,      1,      1,          1 ];    // уровень здоровья для умений , 0 - не использовать
// если уровень здоровья для использования умения = 1, то умение используется только когда Вас бьют

var CDTBoss   = rNum(4300, 4500);   // кулдаун при ударах или выжигании на боссах
var CDTBossH  = rNum(2800, 3400);   // кулдаун при лечении на боссах
var CDTStop   = rNum(5000, 7000);   // время обновления чата при команде стоп
var CDTAttackN= rNum(4700, 5100);   // кулдаун при ударах или выжигании
var CDTHealN  = rNum(4200, 4400);   // кулдаун при лечении 
var CDTEventN = rNum(4000, 4200);   // кулдаун при ударах или выжигании на событиях
// ↓ при кровавом безумии время на удар, лечение, выжигание ↓
var CDTAttackB= rNum(3000, 4000);   // кулдаун при ударах или выжигании
var CDTHealB  = rNum(3000, 4000);   // кулдаун при лечении 
var CDTEventB = rNum(3000, 4000);   // кулдаун при ударах или выжигании на событиях



var resurectionBefore=1;  // если нет усталости то лока кача...
var resurectionAfter =3;  // если SetUstalost=false и появилась усталость то лока кача...
// 0 - На главной;
// 1 - Башни;
// 2 - Выживание; (при побеге идёт на арену)
// 3 - Арена; (при побеге идёт на выживание)
// 4 - Выживание (при побеге идёт в башни)
// 5 - Арена; (при побеге идёт в башни)
// 6 - Арена-Выживание; (играет с талантами арены)
// 7 - Арена-Выживание; (меняет таланты для арены и для выживания)

var uvorotOne  = false; // использовать уворот  на Арене/Выживании если остаешся 1х1
var carshit    = 0;     // сколько раз брать железный щит на царях горы
var Setpromax  = 3;     // количество промахов для проверки профиля на капчу
var brb_max    = 2000;  // максимальное количество народа в локе для перехода
var enemy      = 30;    // минимальное количество врагов для перехода в следующую локу
var krit_massa = 2;     // отношение количества вражеских войнов к количеству союзников для бегства c локации 
var kritHP     = 100;    // критический уровень жизней для "бегства с локации" до 200 - % от здоровья. выше 200 - порог здоровья, 0 - не сбегать

//       с премиумом,без премиума
var Pobeg=[    2,           1 ];    // 1 - убегать на главную, 2 - менять локацию

var SetTimeReset = false;	          // менять локацию через промежуток времени
var time_ResetLocation= rNum(3, 10);  // промежуток времени в минутах, через который бот сменит локацию (min, max)
var timeout = rNum(800, 1200);         // время обычных действий (разбор вещей, снятие усталости, переходы и т.д.)

//             Территории,Поля Сражений,Цари Горы,Битва Героев,Город Древних,Логово Геррода,Турнир 1х1,Турнир 3х3,Звери
var SetBattle	=[ 1,          1,           0,         0,           0,             0,            0,         0,      1  ]; // 1 - ходить, 0 - не ходить

//             Арена,Выживание
var SetPvP=   [  10,      5 ];   // количество обязательных боев в день (ставить 0 если, resurectionBefore/resurectionAfter=6/7)

var tournament_buf = 0;  // баф колодца перед турнирами 0-не брать; 1 - только 1х1 ; 2 - 1х1 и 3х3 ; 3 - только 3х3
var SetdestroyMana = 1;  // 0 - только лечить, 2- только жечь, 1 - жечь энергию если некого лечить (рандомно)
var SetAttackTower = 1;  // 0 - не атаковать башни, 2 - атаковать всегда, 1 - по ситуации
var SetZadaniya = false;  // true- забирает задания только перед территориями, false- забирает задания всегда
var otklonyat	= true;  // отклонять приглашения в другие кланы
var scrivat	    = true;  // автоматически скрывать гильд-нотайсы
var chinit_veshi= true;  // чинить вещи 
var chinit_vse	= 1500;	 // чинить всё, если поломка больше ...
var ReadMessage	=false;  // читать почту 
var sms_sound   =false;   // играть мелодию при появлении почты
var sound=new Audio;
sound.src="file:///G:\sms.wav"; // размещение файла (смотрите как наклонены слеши, мелодия формата *.wav)

//             железо,мифрил
var SetRazbor = [ 1,    0 ]; // разбирать вещи (железо-эпик,лег) (мифрил-миф) 1 - разбирать, 0 - нет

//               личные,клановые,новые
var Setepic    = [ 1,      1,      1 ];             // какие эпик вещи разбирать на железо, 1 - разбирать, 0 - нет
var Setleg     = [ 1,      1,      1 ];             // какие лег вещи разбирать на железо, 1 - разбирать, 0 - нет
var Setmif     =         [ 0,      0 ];             // какие миф вещи разбирать на мифрил, 1 - разбирать, 0 - нет

//             шлем,амулет,наплечник,накидка,броня,пояс,штаны,браслет,перчатки,кольца,оружие,сапоги
var razb_epic=[ 1,    1,      1,       1,      1,   1,    1,     1,      1,      1,      1,     1 ];	// какие эпические вещи разбирать на железо
var razb_leg =[ 0,    1,      1,       1,      1,   1,    1,     1,      1,      1,      1,     1 ];	// какие легендарные вещи разбирать на железо
var razb_mif =[ 0,    0,      0,       0,      0,   0,    0,     0,      0,      0,      0,     0 ];	// какие мифические вещи разбирать на мифрил

 //            голова,сердце,гроза,крепость,исцеление,зеркало,источник,колыбель
var SetZamok = [ 1,     1,     1,     1,        1,       1,       1,      1 ];     // 1 - ходить на захват, 0 - нет
var SetBonus = [ 0,     0,     0,     0,        0,       0,       0,      0 ];     // 1 - брать баф, 0 - нет
	
//               башня,статуя,академия
var SetCitadel = [ 0,     0,     0 ];       // 1 - включать цитадели , 0 - нет . ..доступно только лидеру и генералам

//               умения,снаряжение,таланты
var SetGarderob = [ 1,      0,        1 ]; // менять перед событиями. 1 - менять, 0 - нет
	
//          Башни,Арена,Замки,Турнир 1х1,Турнир 3х3,Выживание,Территории,Битва героев,Поля,Боссы,Цари,Город Древних,Логово,Набеги
var Abil_N =[ 1,    3,    2,       1,         2,        3,         2,          2,       1,    1,   3,      3,          2,     3  ];  // умения
var Item_N =[ 1,    1,    1,       1,         1,        1,         1,          1,       1,    1,   1,      1,          1,     1  ];  // снаряжение
var Stan_N =[ 1,    3,    3,       3,         3,        3,         3,          3,       3,    2,   3,      3,          3,     3  ];  // таланты

//          Япитер,Гарм,Цербер,Немезида
var HPZver=[ 35,     0,   25,      0 ]; // оставить % здоровья зверям 

var nemkam   = 280;         // включать кам щит на немезиде, когда обшая сумма ХП зверей ниже ...
var varvel   = 0;         // воинам на велах бить: 0 - Яп->Эп , 1 -  Бить Япитера , 2 - Бить Эпитера
var varnema  = 4;         // воинам на немке бить: 0 - ХП+ , 1 - Бить Церба , 2 - Бить Гарма, 3 - Бить Нему, 4 - Гарм-Ц+Н
var varzod   = 0;         // воинам на зоде бить: 0 - обычный режим , 1 - бить знаков не больше 4-х букв
var varleg   = 4;         // воинам на легионе: 0 - легионеры , 1 - Антоний , 2 - Марк , 3 - Легат , 4 - Легионеры > Легат
var Setlegat = "легата";  // спец. команда бить Легата на Потерянном Легионе или "полный ник легата" - (для тех кто бил Антония и Марка)
var medvel   = 0;         // медам на велах: 0 - лечить всех, 1 - лечить цель
var medtrol  = 0;         // медам на тролле: 0 - лечить, 1 - жгу, 2 - лечу и жгу
var Shield   = 15;        // если броня тролля выше, то жгу | режим лечу и жгу
var medpred  = 0;         // медам на предках: 0 - лечить, 1 - жгу, 2 - лечу и жгу

//          стражник,грот гарпий,мантикора,минотавр,лег драк
var avtozveri=[ 0,        1,         0,       0,       0 ]; // ходить автоматически на внеклановых зверей. 1 - ходить, 0 - нет

var Setdrak  = "падмииф";              // спец. команда на дракона или "полный ник на мифа"
var Setvel   = "нах1вел";              // спец. команда на великанов или "полный ник на на велов"
var Settrol  = "нахтрол";            // спец. команда на тролля или "полный ник на тролля"
var Setnema  = "нахнем";              // спец. команда на немезиду или "полный ник на нему"
var Setzod   = "нахзод";               // спец. команда на зодиака или "полный ник на зода"
var Setpred  = "нахсвят";            // спец. команда на святилище предков или "полный ник на предков"
var Setlegi  = "нахлег";            // спец. команда на потерянный легион или "полный ник на легион"
var Settrof  = "трооф";		        // спец. команда на трофейного дракона или "полный ник на трофа"
var SetExit  = "петляем";              // спец. команды на выход из пещеры или "полный ник выход"
var Setvzam  = "замки";             // спец. команда в замки или "полный ник замки"
var Setbash  = "псиабашни";             // спец. команда в башни, по обьяве на 5 минут или "полный ник башни"
var Setvboy  = "псиа1старт";              // спец. команда на старт или "полный ник старт"
var Setstop  = "псиа1стоп";              // спец. команда на стоп в чат клана или "полный ник стоп"

var SetUstalost= false;   // снимать усталость
var unravel    = true;   // true - разгадывать капчу antigate, false - бесплатное снятие (картинки в опере должны быть включены)
var send_to    = "";      // id персонажа, на которого отправлять вещи если рюкзак и сундук полные (если "", то не отправляет)
var Setlvlshmot= 0;       // уровень шмоток, которые бот будет одевать. 6-миф и ниже, 5- лег. и ниже, 4... 
var SetboxOpen = 4;       // уровень открываевых ящиков 6-миф и ниже, 5- лег. и ниже, 4... 0 - не открывать ящики	

//            свитки,камни,руны
var SetSKR  = [ 2,     0,    1 ]; // уровень выбрасываемых. 6-миф и ниже, 5- лег. и ниже, 4... 0 - не выбрасывать

//            личные,новые
var Setsvit = [ 0,     0 ];       // какие свитки выкидывать	

//           подарок,медитация,секрет,рефлекс,ярость,лед,жажда,адрен,опустошение,критон,дыхание,гнев,стойкость	
var dropScroll=[0,      0,       0,      0,     0,    0,   0,    0,       0,        0,     0,     0,    0];  // какие свитки выкидывать 
var SetSvitP  =[1,      1,       1,      1,     1,    1,   1,    1,       0,        1,     1,     1,    1];  // с премиумом использование свитков
var SetSvitN  =[0,      0,       0,      0,     0,    0,   0,    0,       0,        0,     0,     0,    0];  // без премиума использование свитков

var SetSvmin = 1;     // минимальный уровень используемых свитков. 1 - коричневые и выше, 2 - зелень и выше
var SetSvmax = 4;     // максимальнй уровень используемых свитков. 6 - миф и ниже, 5 - лег. и ниже, 4... 
var strateg  = false; // покупать пассивки за очки полей (Если есть Стратегический ум)

var SetBlack = 3;     // Как использовать ЧС | 1-не добиваем в башнях, 2-добиваем в событиях, 3-не добиваем в башнях и добиваем в событиях, 0-отключен
var black_list= "";

var SetWhite = 2;     // Как использовать БС | 1-добиваем в башнях, 2-не добиваем в событиях, 3-добиваем в башнях и не добиваем в событиях, 0-отключен
var white_list= "";

///////////////////////////////////////////////////////////////////// НАСТРОЙКА ЗАКОНЧЕНА /////////////////////////////////////////////////////////////////////

function rNum(min, max) { 
	if (max==undefined) return Math.floor(Math.random()*min );
	else return Math.floor(Math.random()*(max - min)+min);
}

try{
var spt=rNum(300, 300);
var obnovlenie=rNum(3000, 7000);
var SetDrinkHPlvl=100;
var resurectionTower='';
var user_id='';
var lvl=''; 
var u_class='';
var SetUse4hr=true;
var storona=true;
var strong='';
var life='';
var enka='';
var prem=false;
var t1=0,t2=0;
var getcurgames=/(\d+)\//;
var info='';
var guild_id='';
var bad_target=false;
var good_target=false;
var target=false;
var notarget=false;
var nekogo_lechit=false;
var smeshka=false;
var pronik=false;
var kamenshit=false;
var uvorotik=false;
var InEvents=false;
var InTowers=false;
var err_d=false;
var citaactiv=false;
var TerWhite=1;
var white_terra="сау,доктор сау,b rytal,robofil,sibiria,karpik,царь царей,внутренний голос,хлебник,vilych,блуждающий,сезар кастеланос,дядя артем,lekas,razor uyra,отвергнутый раем,kaleostrik,malicious corpse,непредсказуемая,аццкий йожиг,дежавю,оден,глава синдиката,карательница,coh,тоск,stiilet,протон,громом из небес,каспер проф,apokalipsis,стакан ерша,andragenn,юни,icephoenix,х гаденыш х,volkov sl,saturnnnn,кадаверциан,белая радуга,демио,sobos,сокрушитель южан,s erge y,пепец,akunamatata,daimler,злой гуль,мьясной,aristarx,мясничок,leens,султан брунея,karnelija,м а к,mr roman,норд ост,конавал,repal,maksimilyann,морром,alexanderas,понкрат,dezarion,эрнесточе,byrt,illusionist,zarya,syava osmal,valentino,честное слово,хавмачманитор,dobermen,гера,eques,скулл,hapok,безмолвие хаоса,morgershtern,старлей ххх,мятежный демон,antixrist,доминика,templiers,spiber x,korcar,лучистая,харадан,источник желания,gentek,минздрав россии,мед айрон,ruthless angel,алеко дундич,smoke war,gaius gannicus,nomil,ломом по хребту,aleksa ni,altazar,саша чернов,рау ерле,шикарный боец,dionisik,sharky devil,ну примерно так,dimensin,psuxopad,духа м,юлай,похороны юга,californiteon,lord of darcknes,генсек,служба безпеки,iurus,danullka,beez,mikcep,bloondinka,татьяночка,даркмэн,,умка,серыий маг,фон дер танн,горан,sengrat,димонрус,алекс вольф,балтика светлое,kaliqula,nucols,дьяволица,жутьь,mo lecul,трамадол,ларик,malevolent,фетамин,ivra,zavrik,бил гейц,baun,всех завалю,кышна,romahca,горняк д,saiman,alkatras,рудра";
var TerBlack=1;
var black_terra="botaniq,тупой хоббит,лайф,просто золушка,mego chell,чахлик я,хх коля хх,небожытель,xacku,велиикий кэп,коньяком,маленькая зайка,так то я,непридумала,пай малыш,амазоннка,принц мирлифлор,денозавр я,iicephoeniix,skandal,х паладин х,пожыратель душ,юливея,томми версетти,ivanfrost,синеглазка,тайна,х фаркрай х,лунный бархат,romeoen,antaeus,harbor,iliass,алик я,lldarkraidersll,чёрный сталкер,санек б,агасфер лукич,лучник,moroz padlik,мимирш,карачай,джана,маленькая умница,como el viento,жанна из парижа,маленькая мисс,ган гстер,vitalyks,дамер,xack,ксот,снегурка,королев,мега футболист,док боль,cybervetal,renger,спай,kentochek,бессердечный я,щас спою,амига,uno momento,минато намиказе,zill,полет мысли,fczp,li bershka,конфеточка,неожиданность,коля сорочук,дима дима дима,bogatirev,tim the best,хаб биб,champwwe,лекарь маг,лицкий,svajksvajk,роммор,волшебница,скрытый нинзя,мед миф,архангел воин,stanga,lsunny,ххх коля ххх,takmuk,трупик,dr akon,team of villains,джашау,chixpux,ангел поднебесья,я не нубэ,мышка малышка,я вылечу,санька колосок,авгий,amateo,смогем,трач,sky d,rainmaster,князь гунн,beni banasi,seeing prophet,mrjack,nomed,боец за золото,всемагущии,krispar,big mf,гансс,польша,простовова,stirllitz,хамка на хаммере,капелька счастя,рхбзюк,kentaforik,муха всарафане,f raximov,litwinow iwan,ll sm ll,богд,кладешок,злая училка,мед северян,новенский,мойгал,правой рукой,фиолетовый пук,ницык,barzoe,i nk,sxmaii,антоха дс,победитель ура,romanovsky,vano kup,shtormer,викинг атила,люблю мафку,rain one,все достало,судья дьявола,www gluc www,лорд иван,alekxx,vesta, tigra,faragon,х менталист х,не мастъ,sarasvati,ord kovalskii,xxx avenger xxx,итак,last sleep,клодин,dyxsevera,leon chik,маямед,зонт,русиш,владистас,князь севера,эвакуатор,фул ветеран,zak,artois,грин де вальт,дима демон,серега бог,shurik varvar,харуки мураками,xxeexx,veelzevul,католик рома,адай,джубба,deadlord,iricka,риана,отморозок с юга,русара,черный генерал,vaclav,medik vady,stanchic,чапа,поухумороз,зачарованная,бой севера, т рыжий,арапайм,ike,hasuha,лэки,тэсэй бог,alexis black,p o d,никем нелюбимый,vektra,muveyi,ластик,боби докутович,медстрах,пьяный мастерр,tigra,могильщики,lutsian,вацлавторой,vovi,prost,лт тт,серегакалкутин,царь жизни,яйки,королева флирта,,ана кон да,rembopr,гардар,морской чёрт,chabik,fedotova,мистер хайт,х реаниматор х,gorilaz,химера медик,удар в спину,mephistophilus,potryasov med,weld,filka,х понт х,alex irkutskiii,масилий,прапор вдв,епифан,доктор вдв,та саня я,мед алег,паром миф,лидер вв,kryshutel,денис вдв,аййк,zagazig,медбрат серафим,х мультяшка х,stimbox,аццкий демон,gyro,фаворит,панас,goran,neo vitya,северный палач,bobik,туц туц туц,душеловка,хххххх,медаль,northern lights,хмультх,новий герой,den step,warrior heather,st krish st,крошкаенот,dkeshad,anti hit,шухов,brainfucker,глючнаглаз,xiwnik,крит света,help guard,dake,северный псих,дерзкий тип,hell gus,валацуга,nik morron,лёп,ирен медик,director,grimly,aab,dyavolenok,хвостик,химера убийца,bux,strash,воин рая,малыш убийца,jukii,кайро,искатель истины,sanniless,чекан мед,нежалокя, okonar,дохтур хаус,nemanja,aleks volf,urasik,hans,katod,темный убийца,королева кобра,ацкий цербер,аццкийстечкин,сынок ванек,ударил,ведьмачка,smartmaster";
var ally_name='Волки Одина';
var krithp='';
var berserk='',t_bers='';
var kritomania='',t_krit='';
var metka='',t_metk='';
var pronikaushii='',t_pron='';
var nasmeshka='',t_nasm='';
var resurection='',time_res='';
var SetDrinkHP='',buttle='',t_but='';
var setUvorotHP='',uvorot='',t_uvo='';
var setKamShitHP='',kamShit='',t_kam='';
var setOtrShitHP='',otrShit='',t_otr='';
var setEnergChitHP='',energchit='',t_ener='';
var attack='';
var attack_kochev='',dobivat_kochev='', HP_kocev='';
var attackTowers='',HP_Bashni='';
var attackDobivat='',HP_vraga='';
var heal='',healEnd=true;
var heal_target='';
var healYourself='';
var healSoyznika='';
var destroyMana='';
var destroyManaBoss='';
var attack_vrata='';
var attack_strazh='';
var DND='';
var Boss=false;
var attack_gerod='';
var Nemezida='',HP_N='';
var Garm='',HP_G='';
var Cerber='',HP_C='';
var manticora='';
var minotavr='';
var trofei='';
if (sessionStorage.prem==1) var SetScroll=SetSvitP;
if (sessionStorage.prem!=1) var SetScroll=SetSvitN;
if (sessionStorage.prem==1) var SetAltar=Altar[0];
if (sessionStorage.prem!=1) var SetAltar=Altar[1];  
if (sessionStorage.crazy!=1) var CDTAttack=CDTAttackN;
if (sessionStorage.crazy!=1) var CDTHeal=CDTHealN;
if (sessionStorage.crazy!=1) var CDTEvent=CDTEventN;
if (sessionStorage.crazy==1) var CDTAttack=CDTAttackB;
if (sessionStorage.crazy==1) var CDTHeal=CDTHealB;
if (sessionStorage.crazy==1) var CDTEvent=CDTEventB;
if (klan!='') var SetCitStone=true;
if (klan=='') var SetCitStone=false;
var SetPobeg='';
if (sessionStorage.prem==1) var SetPobeg=Pobeg[0]==1;
if (sessionStorage.prem!=1) var SetPobeg=Pobeg[1]==1;
var attack_drakon='';
var attack_troll='';
var attack_bers='';
var attack1='';
var Epiter='',HP_Ep='';
var Yapiter='',HP_Ya='';
var lego_lego='';
var lego_mark=''; 
var lego_anton='';
var lego_legat='';
var zodiak='',HP_Zod='';
var attack_soul='',zod_soul='';
var peshera=[];
var otklonit='',skrit='';
var obnovit='';
var vstatVochered='',pokinutOchered='',noviuBoy='',vstupit='',ozomena='',aello='';
var setobmanSHP='',obmanS='',t_obm='';
var bzp='',startBoss='';
var vhod='';
var mifril='';
var naGlavnuy='';
var vzamok='';
var zhelshit='';
var terrN=[];
var bg='',zapadvrata='',centrvrata='',vostochvrata='',obelisk='';
var turnir='',turnir1='',turnir2='';
var olimp=false;
var nextTower=false;
var redcastle=false;
var zamok=[];
var bashni='',arena='',zamki='',cargori='',survival='',battle='',goroddrev='';
var territory='',na_terr='';
var time_serv='';
var comp_time='';
var server_time=['','','',''];
var abilitiesSetLink=[];
var itemsSetLink=[];
var talantsSetLink=[];
var quests='';
var klan='',altar='',altarZAserebro='',zaitiValtar='',altarZAjelezo='',altarZamki='',altarZamkivse='',altarZamkiKolodec='';
var use_full=''; use_4hr=''; epicBuyLink='';
var ustalost='',snyatustalost='';
var zabratnagradu='';
var captcha='',captcha_img='',cap_src='';
var zam_shit='';
var getbaf='';
var getcit='';
var bag='',body='',abilities='',trade_ability='',passive='',talant='';
var veshi='',select='';
var vRukzak='',vSunduk='',nadet='',vikinut='';
var addStone='',salvatory='';
var confirm_link='';
var poluchit='';
var open='';
var openbag='';
var openstore='';
var nochar='';
var storona2=false;
var major_lnk=false;
var trayStatus='';
var cracklinks=0;
var activ_link='';
var pochinit='',pochinit_vse='',pochinit_vse_za='';
var razobrat_vse='',razobrat='';
var user='';
var info_span='';
var vboy='';
var bag_better=false;
var clothes_broken=false;
var lowenergy=false; 
var fullstore=false;
var new_mail=false;
var mail='',message='',getlink='',getAllLink='',nov='',markletter='';
var fullBag=false; 
var destroyMan='';
var vrag_mech,vrag_med,drug_mech,drug_med;	
var uroven_HP='';
var uroven_MP='';
var brb='';
var action=false;
var rip=false;
var pokinut='';
var all_damage=0;
var sum_damage=0;
var svitki_link='';
var KSUM='',trenirovka='',kurganM='',lagerOrdiM='',lagerVikingovM='';
var usteRekiM='',lednikM='',praviuBeregM='',verhniuPerevalM='',leviyBeregM='',ledyaniePesheriM='',deltaRekiM='',nijniuPerevalM='',kamenniePesheriM='',gornoeOzeroM='';
var perekrestokM='',UPustoshM='',UZPustoshM='',ZPustoshM='',SZPustoshM='',UVPustoshM='',VPustoshM='',SVPustoshM='',SPustoshM='';
var BKurganM='',VRosengardM='',ZRosengardM='',ZmarokandM='',VmarokandM='',rudnikM='',MkipiM='',marokandM='',rosengardM='';			
var MGSM='',MGUM='',UZOM='',HOM='',HZM='',UVOM='',PZM='',PVM='',PRM='',SZOM='',HNM='',HVM='',SVOM='';
var ZTSM='',SZGM='',SVGM='',ZVM='',KTM='',VVM='',UZGM='',UVGM='',ZTUM='';
var DSSM='',SZFM='',SVFM='',ZKM='',PVBM='',VKM='',UVFM='',UVFM='',DSUM='';
var rus=["а","А","с","С","е","Е","Т","Н","о","О","р","Р","к","К","х","Х","В","М","у","г"];
var eng=["a","A","c","C","e","E","T","H","o","O","p","P","k","K","x","X","B","M","y","r"];
var nick=en_ru(''); if (sessionStorage.username!=undefined) nick=en_ru(sessionStorage.username);
if (sessionStorage.сlan!=undefined) terraсlan=sessionStorage.сlan;
var div = document.getElementsByTagName('div'); 
var a = document.getElementsByTagName('a'); 
var span = document.getElementsByTagName('span');
var title =''; if(document.getElementsByTagName('title')[0]!=undefined) title=en_ru(document.getElementsByTagName('title')[0].textContent);
if (title=='')
{
if (location.href.match(/\/user\/check/)) title="защита от ботов";
if (document.body.textContent.match(/История победителей/)) title="Логово Геррода";
if (location.href.match(/\/castles/)) title="Замки варваров";
if (document.body.textContent.match(/Выбрать набор/)) title="Мои умения";
if (location.href.match(/pages.user.rack.ActivateScrollsPage|wicket:interface=:/) && !document.body.textContent.match(/Вы хотите активировать свитки?/) && document.body.textContent.match(/Выбраны свитки:/)) title="Активация свитков";
if (document.body.textContent.match(/Вы хотите активировать свитки?|Подтвердите, что Вы хотите разобрать эту вещь|Подтвердите, что Вы хотите выкинуть эту вещь/)) title="Подтверждение";
if (document.body.textContent.match(/Выучить набор/)) title="Таланты";
if (document.body.textContent.match(/Хранилище клана используется для строительства и использования Цитадели клана/)) title="Хранилище клана";
if (location.href.match(/\/game\/dungeons/)) title="Пещеры и драконы";
if ((document.body.textContent.match(/Требуется  4 воина и  2 медика/))||(attack_drakon!="")) title="Легендарный дракон";
if ((document.body.textContent.match(/Требуется  4 воина и  1 или 2 медика/))||(manticora!="")) title="Пещера мантикоры";
if ((document.body.textContent.match(/Требуется  2 воина и  1 медик/))||(attack_strazh!="")) title="Пещерный стражник";
if (document.body.textContent.match(/Здесь ты можешь испытать удачу и получить ценные ресурсы/)) title="Колодец удачи";
if (document.body.textContent.match(/Легендарный дракон убит|Минотавр убит|Мантикора убита|Дракон мертв|Каменный тролль мертв|Вход в Святилище предков закрыт|Трофейный дракон убит|Откроется через/)) title="Пустая пещера";
}
var img = document.getElementsByTagName('img');
var any_tag=document.getElementsByTagName('*');
var f_time = /(\d+):(\d+):(\d+)/;
var epic_crack=[];
if (razb_epic[0]==1) {epic_crack.push('Шлем'); epic_crack.push('Шапка');}
if (razb_epic[1]==1) {epic_crack.push('Амулет'); epic_crack.push('Медальон'); epic_crack.push('Борода');}
if (razb_epic[2]==1) {epic_crack.push('Наплечник'); epic_crack.push('Воротник');}
if (razb_epic[3]==1) {epic_crack.push('Накидка'); epic_crack.push('Мешок'); epic_crack.push('Бурка');}
if (razb_epic[4]==1) {epic_crack.push('Кираса'); epic_crack.push('Шуба'); epic_crack.push('Кольчуга');}
if (razb_epic[5]==1) epic_crack.push('Пояс');
if (razb_epic[6]==1) {epic_crack.push('Штаны'); epic_crack.push('Поножи');}
if (razb_epic[7]==1) epic_crack.push('Браслет');
if (razb_epic[8]==1) {epic_crack.push('Наручи'); epic_crack.push('Рукавицы'); epic_crack.push('Перчатки'); epic_crack.push('Варежки');}
if (razb_epic[9]==1) {epic_crack.push('Кольцо'); epic_crack.push('Перстень');}
if (razb_epic[10]==1) {epic_crack.push('Посох'); epic_crack.push('Секира'); epic_crack.push('Молот'); epic_crack.push('Копье'); epic_crack.push('Палка'); epic_crack.push('Топор'); epic_crack.push('Меч');}
if (razb_epic[11]==1) {epic_crack.push('Сапоги'); epic_crack.push('Валенки');}
var leg_crack=[];
if (razb_leg[0]==1) {leg_crack.push('Шлем'); leg_crack.push('Шапка');}
if (razb_leg[1]==1) {leg_crack.push('Амулет'); leg_crack.push('Медальон'); leg_crack.push('Борода');}
if (razb_leg[2]==1) {leg_crack.push('Наплечник'); leg_crack.push('Воротник');}
if (razb_leg[3]==1) {leg_crack.push('Накидка'); leg_crack.push('Мешок'); leg_crack.push('Бурка');}
if (razb_leg[4]==1) {leg_crack.push('Кираса'); leg_crack.push('Шуба'); leg_crack.push('Кольчуга');}
if (razb_leg[5]==1) leg_crack.push('Пояс');
if (razb_leg[6]==1) {leg_crack.push('Штаны'); leg_crack.push('Поножи');}
if (razb_leg[7]==1) leg_crack.push('Браслет');
if (razb_leg[8]==1) {leg_crack.push('Наручи'); leg_crack.push('Рукавицы'); leg_crack.push('Перчатки'); leg_crack.push('Варежки');}
if (razb_leg[9]==1) {leg_crack.push('Кольцо'); leg_crack.push('Перстень');}
if (razb_leg[10]==1) {leg_crack.push('Посох'); leg_crack.push('Секира'); leg_crack.push('Молот'); leg_crack.push('Копье'); leg_crack.push('Палка'); leg_crack.push('Топор'); leg_crack.push('Меч');}
if (razb_leg[11]==1) {leg_crack.push('Сапоги'); leg_crack.push('Валенки');} 
var mif_crack=[];
if (razb_mif[0]==1) {mif_crack.push('Шлем'); mif_crack.push('Шапка');}
if (razb_mif[1]==1) {mif_crack.push('Амулет'); mif_crack.push('Медальон'); mif_crack.push('Борода');}
if (razb_mif[2]==1) {mif_crack.push('Наплечник'); mif_crack.push('Воротник');}
if (razb_mif[3]==1) {mif_crack.push('Накидка'); mif_crack.push('Мешок'); mif_crack.push('Бурка');}
if (razb_mif[4]==1) {mif_crack.push('Кираса'); mif_crack.push('Шуба'); mif_crack.push('Кольчуга');}
if (razb_mif[5]==1) mif_crack.push('Пояс');
if (razb_mif[6]==1) {mif_crack.push('Штаны'); mif_crack.push('Поножи');}
if (razb_mif[7]==1) mif_crack.push('Браслет');
if (razb_mif[8]==1) {mif_crack.push('Наручи'); mif_crack.push('Рукавицы'); mif_crack.push('Перчатки'); mif_crack.push('Варежки');}
if (razb_mif[9]==1) {mif_crack.push('Кольцо'); mif_crack.push('Перстень');}
if (razb_mif[10]==1) {mif_crack.push('Посох'); mif_crack.push('Секира'); mif_crack.push('Молот'); mif_crack.push('Копье'); mif_crack.push('Палка'); mif_crack.push('Топор'); mif_crack.push('Меч');}
if (razb_mif[11]==1) {mif_crack.push('Сапоги'); mif_crack.push('Валенки');}
var name_scrl=[ "Подарок алхимика","Медитация","Секрет победы","Рефлекс тигра","Ярость смертника","Ледяной щит","Жажда познания","Адреналин","Опустошение","Сила критона","Уверенное дыхание","Нарастающий гнев","Стойкость","Стратегический ум" ];
var castle_name=[ "Голова дракона","Сердце титана","Гроза миров","Крепость духа","Исцеление предков","Зеркало боли","Источник познания","Колыбель жизни" ];
var dung_name=[ "Пещерный стражник","Грот Гарпий","Пещера мантикоры","Лабиринт минотавра","Легендарный дракон","Логово Геррода","Мифический дракон","Храм Немезиды","Каменный тролль","Обитель Зодиака","Святилище предков","Трофейный дракон","Долина Великанов","Потерянный Легион" ];
var some_name=[ "Башня мудрости","Статуя критона","Академия клана" ];
if (sessionStorage.scrolls==undefined) sessionStorage.scrolls="0";
if (sessionStorage.bonus==undefined) sessionStorage.bonus="0";
if (sessionStorage.cita==undefined) sessionStorage.cita="0";
if (sessionStorage.dungeons==undefined) sessionStorage.dungeons="0";
if (sessionStorage.mark==undefined) sessionStorage.mark="";
if (sessionStorage.curgamessurvival==undefined) sessionStorage.curgamessurvival=0;
if (sessionStorage.curgamesarena==undefined) sessionStorage.curgamesarena=0;
if (sessionStorage.shit==undefined) sessionStorage.shit=0;
if (/static.barbars/.test(location.host)) localStorage.on_off="on";
var Scrolls=sessionStorage.scrolls.split(",");
var bonus=sessionStorage.bonus.split(",");
var cita=sessionStorage.cita.split(",");
var dungeon=sessionStorage.dungeons.split(",");
var mark=sessionStorage.mark.split(",");
var curgamessurvival=sessionStorage.curgamessurvival;
var curgamesarena=sessionStorage.curgamesarena;

var reg=/(\d+) ур, (медик|воин), (юг|север) (\d+) (\d+) (\d+)/i;
if (reg.test(sessionStorage.user) && sessionStorage.user!=undefined){
	var str=reg.exec(sessionStorage.user);
	lvl=str[1];
	u_class=str[2];
	if (str[3]=="север") {storona=false; sessionStorage.clear(); localStorage.clear();}
	strong=str[4];
	life=str[5];
	enka=str[6];
	if (/Премиум/i.test(str[0])) prem=true;
}
	temp_date = new Date();
	day = temp_date.getDate();
	hours=temp_date.getHours();
	minutes=temp_date.getMinutes();
	seconds=temp_date.getSeconds();
	comp_time=hours*3600+minutes*60+seconds;

	var newDay=false;
	if (mark[1]!=day && mark[1]!=undefined) {newDay=true; sessionStorage.curgamesarena=0; sessionStorage.curgamessurvival=0; curgamesarena=0; curgamessurvival=0;}
	mark[1]=day;

	for (var i=0;i<=13;i++) 
	{
		if (Scrolls[i]==undefined) Scrolls[i]=0;
		if (/\d+/.test(Scrolls[i])) {
			var t=/\d+/.exec(Scrolls[i]);
			if (newDay) t=t-86400; 
			if (t<=comp_time) Scrolls[i]=0;
			else if (/нет/.test(Scrolls[i])) Scrolls[i]=t+"нет";
			else Scrolls[i]=t
		}
	}

	sessionStorage.scrolls=Scrolls;

	for (var i=0;i<=8;i++) {
		if (bonus[i]==undefined) bonus[i]=0;
		if (newDay) bonus[i]=bonus[i]-86400; 
		if (bonus[i]<=comp_time) bonus[i]=0;
	}
	sessionStorage.bonus=bonus;
	
	for (var i=0;i<=2;i++) {
		if (cita[i]==undefined) cita[i]=0;
		if (newDay) cita[i]=cita[i]-86400; 
		if (cita[i]<=comp_time) cita[i]=0;
	}	

	for (var i=2;i<=34;i++) {
		if (mark[i]==undefined) mark[i]=0;
		if (mark[i]==undefined) mark[i]=0;
		if ((i>=11 && i<=21) || i==28) {
			if (newDay) mark[i]=mark[i]-86400;
			if (mark[i]<=comp_time) mark[i]=0
		}
	}
	sessionStorage.mark=mark;

	for (var i=0;i<=13;i++) {
		if (dungeon[i]==undefined) dungeon[i]=0;
		if (/\d+/.test(dungeon[i])) {
			var t=/\d+/.exec(dungeon[i]);
			if (newDay) t=t-86400; 
			if (t<=comp_time) dungeon[i]=0;
			else if (/нет/.test(dungeon[i])) dungeon[i]=t+"нет";
			else dungeon[i]=t;
		}
	}
	sessionStorage.dungeons=dungeon;

if (localStorage.on_off!="on" && /barbars|варвары|46.4.4.56|spaces|mail/.test(location.host))
{
	zapolneniePeremennih();
	zapolnenieDannih();
	test_location();
}

///////////////////////////////////////////////////////////////////////


if ( div[0]==undefined||a[0]==undefined||span[0]==undefined ||document.getElementsByTagName('title')[0]==undefined||img[0]==undefined||document.body==undefined )
		setTimeout(function(){location.href='/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage';}, 2000);
  else if ( localStorage.on_off=="on" && /barbars|варвары|46.4.4.56|spaces|mail/.test(location.host) )
  {
	zapolneniePeremennih(); 
	test_location();
	
	if ( title.match(/А ты тут?|защита от ботов|Защита от роботов/i) && cap_src!='' && unravel )
	{	
		click(location.href, rNum(60000, 120000));
		function listener(event)
		{
			if (event.origin !== "http://antigate.com" )
			        return;
			obrabotka_otveta(event.data);
		}
	if (window.addEventListener)
	    window.addEventListener("message", listener,false);
	else window.attachEvent("onmessage", listener);

	var iframe=document.createElement('iframe');
	iframe.src="http://antigate.com/in.php"; 
	iframe.style.display='none';
	document.body.appendChild(iframe);
		
		iframe.onload=function()
		{
			var canvas = document.createElement('canvas'); 
			canvas.width = "200";
			canvas.height = "50";
			var context = canvas.getContext('2d');
			var image = new Image();
			image.onload = function()
			    {
				context.drawImage(image, 0, 0);
				var data = (canvas.toDataURL('image/png')).replace("data:image/png;base64,", "");
				window.iframe.contentWindow.postMessage(data, "http://antigate.com");
				}
		    image.src=cap_src;
		}
	}
	if ( title.match(/А ты тут?|защита от ботов|Защита от роботов/i) && cap_src!='' && !unravel )
	{
		click(naGlavnuy, 1800000); 
	}
	
    if (autologin) autologin_(); 
    if (!action ) alliancechat();
	if (!action ) resurectionT_();
	curgames();
	getbosstime();
	if (!action ) terrabut();
	if (!action && !title.match("Чат клана") && SetBattle[8]==1 && klan!='' && !title.match("Чат альянса") && !title.match("Клан")) notify_();
	if (!action ) errors_();
	if (send_to!="" && !title.match("Чат клана")) send_message();
	if (!action && !title.match("Чат клана") && new_mail && vboy=='') ReadMessages();
	if (!action &&  !title.match("Чат альянса")) proverka_loga();
	if (!action && !title.match("Чат клана")) user_check();
	if (!action && sessionStorage.territory==undefined) goToBoss_(); 
	abilities_();
	if (!title.match("Чат клана")) altar_();
	if (!action && sessionStorage.tasks==1 && user!='' && !SetZadaniya) quests_();
    if (!action && lvl>19 && !title.match("Чат клана") && sessionStorage.territory==undefined) zamki_();
	if (!action && !title.match("Чат клана") && mark[19]!=1 && mark[11]!=1) baf_zamkov();
	if (!action && !title.match("Чат клана")) some_();
	if (!action ) location_reset();
	if (getCookie("login")) select_prov();
	if (!action && !title.match("Чат клана")) razobratVeshi();
	if (!action && !title.match("Чат клана") && mark[29]==1 && klan!='') stone_drop();
	if (!action && !title.match("Чат клана") && chinit_veshi) repair();
	if (!action && SetGarderob[1]==1) ItemsSet_();
	if (!action && SetGarderob[2]==1) TalantsSet_();
	if (!action && !title.match("Чат клана")) battle_(); 
	if (!action ) resurection_(); 
	if (!action) {
		if (Boss) DND_();
		else select_event();} ; 
	return_();
	}
	addInfo_();
	sessionStorage.mark=mark

}catch(err){setTimeout(function(){location.href="/user"}, rNum(1000, 10000));
	sessionStorage.errors=err;
} 



function location_reset()
{
  if ( SetTimeReset && InTowers ) {
	if (mark[17]==0) mark[17]=comp_time+time_ResetLocation*60;
	else if (mark[17]<= comp_time) {mark[17]=0; searchPoint();}
  } 
}

function en_ru(str){
	for (var i=0;i<=rus.length;i++) {str=str.split(eng[i]).join(rus[i]);}
	return str;
}

function replace_(data) 
{
	var str=data;
	str=str.replace(/(\n(\r)?)/g, ' ');
	str=str.split(/&nbsp;/).join(" ");
	str=str.replace(/&nbsp;/g, ' ');
	str=str.replace(/(\s){1,}/g, ' ');
	return str;
}

function zapolnenieDannih()
{
	if (title.match("Алтарь клана"))
	{
		var reg1=/Твой бонус: \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if (reg1.test(rus_t)) {bonus[8]=getSec(f_time.exec(reg1.exec(rus_t)))+comp_time;}
	}
	if (title.match("Мой герой") && altar!='')
		{
		var reg2=/алтарь \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if (rus_t.match("алтарь не активен")) bonus[8]=0;
		else if (reg2.test(rus_t)) {
			at=f_time.exec(reg2.exec(rus_t));
			bonus[8]=getSec(at)+comp_time;
		}
	}
	sessionStorage.bonus=bonus;
	if (title.match('Мои умения'))
	{
		var r_tm=rNum(30, 120);
        for (var i=0;i<=13;i++) {
        var reg=new RegExp(name_scrl[i]+" \\[(\\d+):(\\d+):(\\d+)", "i");
        if (reg.test(rus_t)) {Scrolls[i]=getSec(reg.exec(rus_t))+comp_time+r_tm;}  
   }
   sessionStorage.scrolls=Scrolls;

		sessionStorage.abilities='';
		for (var i=5;i>0;i--) {
			if (rus_t.match("Выбрать набор "+i)) {sessionStorage.abilities=i+" ";break;}
			else sessionStorage.abilities="0 ";
		}
		for (var i=1;i<=5;i++) {if (abilitiesSetLink[i]==undefined && rus_t.match('Выбрать набор '+i)) sessionStorage.abilities+=i+',';}

	}
	if (title.match('Таланты'))
	{
		sessionStorage.SetTalants='';
		for (var i=5;i>0;i--) {
			if (rus_t.match("Выучить набор "+i)) {sessionStorage.SetTalants=i+" ";break;}
			else sessionStorage.SetTalants="0 "
		}
		for (var i=1;i<=5;i++) {if (talantsSetLink[i]==undefined && rus_t.match('Выучить набор '+i)) sessionStorage.SetTalants+=i+',';}
	}
	if (title.match("Моё снаряжение"))
	{
		sessionStorage.SetItems='';
			for (var i=5;i>0;i--) {
			if (rus_t.match("Надеть комплект "+i)) {sessionStorage.SetItems=i+" ";break;}
			else sessionStorage.SetItems="0 "
		}
		for (var i=1;i<=5;i++) {if (itemsSetLink[i]==undefined && rus_t.match('Надеть комплект '+i)) sessionStorage.SetItems+=i+',';}
	}
}

function zapolneniePeremennih()
{
for (var y=0;y<any_tag.length;y++) 
{
	if (/&nbsp;/.test(any_tag[y].innerHTML)) any_tag[y].innerHTML=any_tag[y].innerHTML.replace(/&nbsp;/g, ' ');

	if (any_tag[y].style.display=='none')
	{
		for (var i=0;i<any_tag.length;i++)
		{
			if (any_tag[y].contains(any_tag[i])) 
			{
				any_tag[i].textContent='';
				any_tag[i].href='';
				any_tag[i].src='';
			}
		}
		any_tag[y].textContent='';
		any_tag[y].href='';
		any_tag[y].src='';
	}
	if ((any_tag[y].tagName=="A" && any_tag[y].textContent=='' && any_tag[y].href=='') ||
		 (/div|span/i.test(any_tag[y].tagName) && any_tag[y].textContent=='' && any_tag[y].href=='' && any_tag[y].src=='' && any_tag[y].getElementsByTagName('input')[0]==undefined ) ||
			(any_tag[y].tagName=="IMG" && any_tag[y].src=='') )
			any_tag[y].parentNode.removeChild(any_tag[y]);
	
	if (any_tag[y-7]!=undefined)
	if (	(any_tag[y-7].tagName=='IMG')&&(any_tag[y-6].tagName=='SPAN')&&
		(any_tag[y-5].tagName=='IMG')&&(any_tag[y-4].tagName=='SPAN')&&
		(any_tag[y-3].tagName=='IMG')&&(any_tag[y-2].tagName=='SPAN')&&
		(any_tag[y-1].tagName=='IMG')&&(any_tag[y].tagName=='SPAN'))
		{
			if ( !isNaN(Number(any_tag[y].textContent )) && !isNaN(Number(any_tag[y-2].textContent)) && 
				!isNaN(Number(any_tag[y-4].textContent))&& !isNaN(Number(any_tag[y-6].textContent)))
			{
				{
					vrag_mech=Number(any_tag[y-6].textContent);
					vrag_med=Number(any_tag[y-4].textContent);
					drug_mech=Number(any_tag[y-2].textContent);
					drug_med=Number(any_tag[y].textContent);
				}
				brb=vrag_mech+vrag_med+drug_mech+drug_med;
			}
		}
}

rus_t=en_ru(replace_(document.body.textContent));

var regm=/(\d+) (\d+)/;
if (regm.test(rus_t)){
var stra=regm.exec(rus_t) ;
uroven_HP=stra[1]; if (uroven_HP<0) uroven_HP=life;
uroven_MP=stra[2]; if (uroven_MP<0) uroven_MP=enka;
}

var sm=document.getElementsByClassName("small minor");
if (sm[0]!=undefined)
if (f_time.test(sm[sm.length-1].textContent)){
	server_time=f_time.exec(sm[sm.length-1].textContent);
	time_serv = getSec(server_time);
}

if (title.match("Мой герой")){
	sessionStorage.user="";
	sessionStorage.removeItem('tasks');
	mark[31]=0;
	var reg=/(\d+) ур, (медик|воин), юг/i;
	if (reg.test(rus_t)) sessionStorage.user=(reg.exec(rus_t))[0];
    sessionStorage.user+=" "+(/сила: (\d+)/.exec(rus_t))[1];
	sessionStorage.user+=" "+(/здоровье: (\d+)/.exec(rus_t))[1];
    sessionStorage.user+=" "+(/энергия: (\d+)/.exec(rus_t))[1];
	var username=/\n (.+)\n(\d+) ур, (медик|воин), юг/i;
	if (username.test(document.body.textContent)) sessionStorage.username=(username.exec(document.body.textContent))[1];
	if (rus_t.match(/ЯРОСТЬ ДРАКОНА/)) sessionStorage.сlan="яр";
	if (rus_t.match(/РЕКВИЕМ/)) sessionStorage.сlan="рек";
	if (rus_t.match(/Орден ДобрА/)) sessionStorage.сlan="орден";
	if (rus_t.match(/WОRLD оf GОDS/)) sessionStorage.сlan="ворды";
	if (rus_t.match(/Коси и Забивай/)) sessionStorage.сlan="коси";
	if (rus_t.match(/Пятигорск/)) sessionStorage.сlan="пят";
	if (rus_t.match(/Братство Одина/)) sessionStorage.сlan="брат";
	if (rus_t.match(/Тени Смерти/)) sessionStorage.сlan="тени";
	if (rus_t.match(/Волчье Логово/)) sessionStorage.сlan="лог";
	if (rus_t.match(/Хирд Одина/)) sessionStorage.сlan="хирд";
	if (/Задания \(\+\)/i.test(rus_t) ) {mark[31]=1; sessionStorage.tasks=1}
	if (/, (г.нер.л|л.д.р)/i.test(rus_t)) sessionStorage.user+=" citaactiv";
	if (/Премиум \+(\d+)%/i.test(rus_t) ) sessionStorage.user+=" премиум";
	if (/Премиум \+(\d+)%/i.test(rus_t) ) sessionStorage.prem=1;
	else sessionStorage.removeItem('prem');
	if (/усталость: -(\d+)%/i.test(rus_t) && !SetUstalost) mark[24]=1;
	else mark[24]=0;
} 

if (!autologin) user_id=getCookie("id");

for (var i=a.length-1; i>=0; i--)
     {
	var atext=en_ru(replace_(a[i].text));
	if (/guild/.test(a[i].href)) if (/\/\d+\//.test(a[i].href))		guild_id=/\/\d+\//.exec(a[i].href);
	if (!autologin && user_id!='' && a[i].href.match("/user/id/"+user_id)) nick=atext;
	if (/user\/id/.test(a[i].href)) if (/Вернуться в бой/.test(atext)) vboy=a[i];
	if (!/user\/id/.test(a[i].href))
	{
		if (/startCombatLink/.test(a[i].href))     startBoss=a[i];
		if (/Мой клан/.test(atext)) 	     		klan=a[i];
		if (/Вход/.test(atext)) 		    	    vhod=a[i];
		if (/user\/check/.test(a[i].href)||/А ты тут?|защита от ботов|Защита от роботов/i.test(atext)) captcha=a[i];
		if (/sacrifaceMoneyLink/.test(a[i].href)) 	altarZAserebro=a[i];
		if (/sacrifaceIronLink/.test(a[i].href))	altarZAjelezo=a[i];
		if (/sacrifaceMoneyCastle1Link/.test(a[i].href))		altarZamki=a[i];
		if (/sacrifaceMoneyCastle2Link/.test(a[i].href))		altarZamkivse=a[i];
		if (/alterCastlesAndWellPageLink/.test(a[i].href))		altarZamkiKolodec=a[i];
		if (/epicBuyLink/.test(a[i].href)) 		    epicBuyLink=a[i];
		if (/user\/rack/.test(a[i].href) || /Рюкзак/.test(atext))	bag=a[i];
		if (/user\/body/.test(a[i].href) || /Снаряжение/.test(atext)) 	body=a[i];
		if (/toStoreLink/.test(a[i].href) || /в сундук/.test(atext)) vSunduk=a[i];
		if (/Свитки/i.test(atext) && /scrollFilterLink/.test(a[i].href))			svitki_link=a[i];
		if (/усталость/.test(atext))			    ustalost=a[i];
		if (/Снять усталость за/.test(atext))		snyatustalost=a[i];
		if (/Забрать награду/.test(atext))		zabratnagradu=a[i];
		if (/Умения/.test(atext))			        abilities=a[i];
		if (/Магазин умений/.test(atext))		    trade_ability=a[i];
		if (/Пассивное умение/.test(atext) )		passive=a[i];
		if (/Открыть рюкзак/.test(atext) && /rack/.test(a[i].href)) openbag=a[i];
		if (/Открыть сундук/i.test(atext) ) 		openstore=a[i];
		if (/Есть новая почта/.test(atext)) 		mail=a[i];
		else if (/user\/mail/.test(a[i].href) && !/user\/mail\/send/.test(a[i].href) && !/Почта/.test(atext)) mail=a[i];
		if (/в рюкзак/.test(atext)) 		    	vRukzak=a[i];
		if (/алтарь/.test(atext)) 		        	altar=a[i];
		if (/Получить бонус/.test(atext)) 	    	getbaf=a[i];
		if (/Активировать/.test(atext)) 		getcit=a[i];
		if (/Починить все вещи за (\d+)/.test(atext)) 	{pochinit_vse=a[i]; pochinit_vse_za=/\d+/.exec(atext);}
		if (/починить/.test(atext)) 		    	pochinit=a[i];
		if (/надеть/.test(atext)) 		        	nadet=a[i];
		if (/Разобрать все на железо/.test(atext)) 	razobrat_vse=a[i];
		if (/разобрать на/i.test(atext)) 	    	{razobrat=a[i]; cracklinks++ }
        if (/sellMifrilLink:crackLink/i.test(a[i].href))	    mifril=a[i];
		if (/Вещи/.test(atext)) 		        	veshi=a[i];
		if (/Поставить чары на вещи/.test(atext)) 	nochar=a[i];
		if (/выбрать/.test(atext)) 		        	select=a[i];
		if (/Задания/.test(atext))    				quests=a[i];
		if (/подтверждаю/i.test(atext)) 	     	confirm_link=a[i];
		if (/открыть/.test(atext)) 			        open=a[i];
		if (/получить/.test(atext)) 	    		poluchit=a[i];
		if (/выкинуть/.test(atext)) 		    	vikinut=a[i];
		if (/Добавить камни/.test(atext))           addStone=a[i];
		
		if (/Бить/.test(atext)) 		            attack1=a[i];
		if (/Бить Кочевников/.test(atext)) 	attack_kochev=a[i];
		if (/Бить Кочевника/.test(atext)) 	{dobivat_kochev=a[i]; HP_kocev=/\d+/.exec(atext); }
		if (/Бить Геррода|Жечь энергию Герроду/.test(atext)) 	attack_gerod=a[i];
		if (/Бить врата/.test(atext)) 	        	attack_vrata=a[i];
		if (/Бить Стражника|Бить стража/.test(atext))       	attack_strazh=a[i];
		if (/Бить врагов/.test(atext))          	attack=a[i];
		if (/Бить башню/.test(atext)) 	        	{attackTowers=a[i]; HP_Bashni=/\d+/.exec(atext); }
		if (/Добивать/.test(atext)) 	        	{attackDobivat=a[i]; HP_vraga=/\d+/.exec(atext); }
		if (/Лечить союзников/.test(atext))     	heal=a[i];
		if (/Лечить цель/.test(atext))          	heal_target=a[i];
		if (/Лечить /.test(atext) && /% хп/.test(atext)) {healSoyznika=a[i]; HP=/\d+/.exec(atext); if ((title.match(/Территория/) && HP>150) || (!title.match(/Территория/) && HP>=rNum(175, 200))) healEnd=false;}
		if (/Лечить себя/.test(atext))          	healYourself=a[i];
		if (/Жечь энергию врагам/.test(atext))      destroyMana=a[i]; 
		if (/Жечь энергию у/.test(atext))       	{destroyMan=a[i]; if (/\d+/.exec(atext)==0) bad_target=true}
		if (/Жечь /.test(atext))		            destroyManaBoss=a[i]; 

		if (/Берсерк \(((\d+)сек|готово)/.test(atext) && !/Бить Берсерка/.test(atext))		    {t_bers=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') berserk=a[i];} 
		if (/Энергетический щит \(((\d+)сек|готово)/.test(atext)) {t_ener=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') energchit=a[i];}
		if (/Каменный щит \(((\d+)сек|готово)/.test(atext))  {t_kam =/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') kamShit=a[i];}
		if (/Каменный щит \(((\d+)сек|готово)/.test(atext) && a[i].className=='flhdr buff') kamenshit=true;
        if (/Щит отражения \(((\d+)сек|готово)/.test(atext))  {t_otr =/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') otrShit=a[i];}
        if (/Критомания \(((\d+)сек|готово)/.test(atext)) 	    {t_krit=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') kritomania=a[i];}
		if (/Метка охотника \(((\d+)сек|готово)/.test(atext)) 	{t_metk=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') metka=a[i];}
		if (/Обман смерти \(((\d+)сек|готово)/.test(atext)) 	{t_obm=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') obmanS=a[i];}
		if (/Проникающий удар \(((\d+)сек|готово)/.test(atext)) {t_pron=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') pronikaushii=a[i];}
		if (/Проникающий удар \((\d+)сек/.test(rus_t) && a[i].className=='flhdr buff') pronik=true;
		if (/Насмешка \(((\d+)сек|готово)/.test(atext))         {t_nasm=/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') nasmeshka=a[i];}
		if (/Насмешка \((\d+)сек/.test(rus_t) && a[i].className=='flhdr buff') {smeshka=true; bad_target=true; sessionStorage.missed=0;}
		if (/Уворот \(((\d+)сек|готово)/.test(atext)) 		    {t_uvo =/\d+/.exec(atext)*1000; uvorot=a[i];}
		if (/Уворот \((\d+)сек/.test(rus_t) && a[i].className=='flhdr buff') uvorotik=true;
		if (/Пить бутылочку \((\d+)шт/.test(atext)) 		    {t_but=0; if (a[i].className!='flhdr buff') buttle=a[i];}
		if (/Пить бутылочку \((\d+)сек/.test(atext)) 		    { t_but =/\d+/.exec(atext)*1000; if (a[i].className!='flhdr buff') buttle=a[i];}
        if (/железный щит/i.test(atext))	 zhelshit=a[i];
		if (/Битва за подарки/i.test(atext))     bzp=a[i];
		if (/Битва героев/i.test(atext))         	battle=a[i];
		if (/Город Древних/i.test(atext)) 	    goroddrev=a[i];
		if (/Турниры/i.test(atext)) 		            turnir=a[i];
		if (/Турнир героев/i.test(atext))        	turnir1=a[i];
		if (/Командный турнир/i.test(atext))     	turnir2=a[i];
		if (/Арена/i.test(atext)) 		            arena=a[i];
		if (/Выживание/i.test(atext)) 	        	survival=a[i];
		if (/Цари Горы/i.test(atext)) 	        cargori=a[i];
		if (/Поля сражений/i.test(atext))        	bg=a[i];
		if (/Войти в замок/i.test(atext))        	vzamok=a[i];
		if (/Вернуться/i.test(atext))      	vboy=a[i];
		if (/Покинуть очередь/i.test(atext))     	pokinutOchered=a[i];
		if (/Новый бой/i.test(atext)) 	        	noviuBoy=a[i];
		if (/Встать в очередь/i.test(atext))     	vstatVochered=a[i];
		if (/Вступить в битву/i.test(atext)) 	vstupit=a[i];
		if (/Хранилище/.test(atext))            salvatory=a[i];
		if (/отклонить/i.test(atext)) 	        	otklonit=a[i];
		if (/скрыть/i.test(atext)) 		            skrit=a[i];
		if (/Покинуть выживание|Покинуть арену/i.test(atext)) 		pokinut=a[i];
		
		if (/Западные Врата (Ю|ю)га/.test(atext))          zapadvrata=a[i];
		if (/Центральные Врата (Ю|ю)га/.test(atext))       centrvrata=a[i];
		if (/Восточные Врата (Ю|ю)га/.test(atext))         vostochvrata=a[i];
		if (/Обелиск Силы/.test(atext))            obelisk=a[i];
	
		if (/Голова дракона/i.test(atext)) 	 zamok[0]=i;		
		if (/Сердце титана/i.test(atext)) 	 zamok[1]=i;		
		if (/Гроза миров/i.test(atext)) 		 zamok[2]=i;		
		if (/Крепость духа/i.test(atext)) 	 zamok[3]=i;		
		if (/Исцеление предков/i.test(atext)) zamok[4]=i;	
		if (/Зеркало боли/i.test(atext)) 	 zamok[5]=i;	
		if (/Источник познания/i.test(atext)) zamok[6]=i;
		if (/Колыбель жизни/i.test(atext)) 	 zamok[7]=i;

		if (/Территории/i.test(atext)) 		 territory=a[i];
		if (/Грозовой Перевал/i.test(atext))  terrN[0]=i;		
		if (/Тысяча Гор/i.test(atext)) 		 terrN[1]=i;		
		if (/Седые Холмы/i.test(atext)) 		 terrN[2]=i;		
		if (/Каменный Лес/i.test(atext)) 	 terrN[3]=i;		
		if (/Пепельная Пустыня/i.test(atext)) terrN[4]=i;	
		if (/Черное Озеро/i.test(atext)) 	 terrN[5]=i;	
		if (/Могильные Топи/i.test(atext)) 	 terrN[6]=i;
		if (/Голые Камни/i.test(atext)) 		 terrN[7]=i;	
		if (/Покинутые Степи/i.test(atext)) 	 terrN[8]=i;		
		if (/Забытая Долина/i.test(atext)) 	 terrN[9]=i;		
		if (/Черные Скалы/i.test(atext)) 	 terrN[10]=i;		
		if (/Выжженные Земли/i.test(atext)) 	 terrN[11]=i;		
		if (/Мертвый Остров/i.test(atext)) 	 terrN[12]=i;	
		if (/Радужный Оазис/i.test(atext))    terrN[13]=i;
		if (/Пещеры Мантикор/i.test(atext)) 	 terrN[14]=i;
		if (/Золотые Пески/i.test(atext)) 	 terrN[15]=i;
		if (/Ущелье Драконов/i.test(atext)) 	 terrN[16]=i;
		if (/Самоцветные Копи/i.test(atext))  terrN[17]=i;
		if (/Войти на территорию/i.test(atext)) na_terr=a[i];

		if (/Курган/.test(atext)) 		    kurganM=a[i];
		if (/Лагерь орды/.test(atext)) 		lagerOrdiM=a[i];
		if (/Лагерь викингов/.test(atext)) 	lagerVikingovM=a[i];	
        if (/Устье реки/.test(atext))		usteRekiM=a[i];
		if (/Правый берег/.test(atext)) 	praviuBeregM=a[i];
		if (/Левый берег/.test(atext)) 		leviyBeregM=a[i];
		if (/Дельта реки/.test(atext)) 		deltaRekiM=a[i];
		if (/Ледник/.test(atext)) 		    lednikM=a[i];
		if (/Верхний перевал/.test(atext)) 	verhniuPerevalM=a[i];
		if (/Ледяные пещеры/.test(atext)) 	ledyaniePesheriM=a[i];
		if (/Нижний перевал/.test(atext)) 	nijniuPerevalM=a[i];
		if (/Каменные пещеры/.test(atext)) 	kamenniePesheriM=a[i];
		if (/Горное озеро/.test(atext)) 	gornoeOzeroM=a[i];
        if (/Перекрёсток/.test(atext))  	perekrestokM=a[i];	
		if (/Южная пустошь/.test(atext)) 	UPustoshM=a[i];	
		if (/Юго-западная пустошь/.test(atext))UZPustoshM=a[i];	
		if (/Западная пустошь/.test(atext)) 	ZPustoshM=a[i];	
		if (/Северо-западная пустошь/.test(atext)) SZPustoshM=a[i];	
		if (/Юго-восточная пустошь/.test(atext)) UVPustoshM=a[i];	
		if (/Восточная пустошь/.test(atext)) 	VPustoshM=a[i];	
		if (/Северо-восточная пустошь/.test(atext)) SVPustoshM=a[i];
		if (/Северная пустошь/.test(atext)) 	SPustoshM=a[i];
		if (/Большой курган/.test(atext))  	BKurganM=a[i];	
		if (/Восточный Розенгард/.test(atext)) VRosengardM=a[i];	
		if (/Западный Розенгард/.test(atext)) 	ZRosengardM=a[i];	
		if (/Западный Мароканд/.test(atext)) 	ZmarokandM=a[i];	
		if (/Восточный Мароканд/.test(atext)) 	VmarokandM=a[i];	
		if (/Железный рудник/.test(atext)) 	rudnikM=a[i];	
		if (/Медные копи/.test(atext))  	MkipiM=a[i];	
		if (/Мароканд/.test(atext)) 		marokandM=a[i];	
		if (/Розенгард/.test(atext)) 		rosengardM=a[i];
        if (/Мертвый город, Юг/.test(atext)) 	MGUM=a[i];
		if (/Юго-восточная окраина/.test(atext))UVOM=a[i];
		if (/Храм земли/.test(atext)) 	    	HZM=a[i];
		if (/Храм огня/.test(atext)) 	    	HOM=a[i];
		if (/Юго-западная окраина/.test(atext))UZOM=a[i];
		if (/Площадь восстания/.test(atext)) 	PVM=a[i];
		if (/Площадь рассвета/.test(atext)) 	PRM=a[i];
		if (/Площадь заката/.test(atext))   	PZM=a[i];
		if (/Северо-восточная окраина/.test(atext)) SVOM=a[i];
		if (/Храм воды/.test(atext)) 	    	HVM=a[i];
		if (/Храм неба/.test(atext)) 	    	HNM=a[i];
		if (/Северо-западная окраина/.test(atext)) SZOM=a[i];
		if (/Мертвый город, Север/.test(atext)) MGSM=a[i];
		if (/Земли титанов, Север/.test(atext)) ZTSM=a[i];
		if (/Северо-западные горы/.test(atext)) SZGM=a[i];	
		if (/Северо-восточные горы/.test(atext))SVGM=a[i];	
		if (/Западные врата/.test(atext))   	ZVM=a[i];
		if (/Крепость титанов/.test(atext)) 	KTM=a[i];
		if (/Восточные врата/.test(atext))  	VVM=a[i];
		if (/Юго-западные горы/.test(atext)) 	UZGM=a[i];
		if (/Юго-восточные горы/.test(atext)) 	UVGM=a[i];
		if (/Земли титанов, Юг/.test(atext)) 	ZTUM=a[i];
		if (/Долина Сражений, Север/.test(atext)) DSSM=a[i];
        if (/Северо западный Форт/.test(atext)) SZFM=a[i];
		if (/Северо восточный Форт/.test(atext)) SVFM=a[i];
		if (/Западный Курган/.test(atext)) ZKM=a[i];
		if (/Поле вечной битвы/.test(atext)) PVBM=a[i];
		if (/Восточный Курган/.test(atext)) VKM=a[i];
		if (/Юго западный Форт/.test(atext)) UVFM=a[i];
		if (/Юго восточный Форт/.test(atext)) UVFM=a[i];
		if (/Долина Сражений, Юг/.test(atext)) DSUM=a[i];
		if (/Каракорум, столица Юга/.test(atext)) KSUM=a[i];
		
		if (/Пещеры и драконы/.test(atext)) 	DND=a[i];
		if (/Пещерный стражник/.test(atext)) 	{peshera[0]=i;}
		if (/Грот Гарпий/.test(atext)) 	        {peshera[1]=i;}
		if (/Пещера мантикоры/.test(atext)) 	{peshera[2]=i;}
       	if (/Лабиринт минотавра/.test(atext)) 	{peshera[3]=i;}
		if (/Легендарный дракон/.test(atext))	{peshera[4]=i;}
		if (/Логово Геррода/.test(atext))       {peshera[5]=i;}
		if (/Мифический дракон/.test(atext)) 	{peshera[6]=i;}
		if (/Храм Немезиды/.test(atext)) 	    {peshera[7]=i;}
		if (/Каменный тролль/.test(atext))    	{peshera[8]=i;}
		if (/Обитель Зодиака/.test(atext))  	{peshera[9]=i;}
		if (/Святилище предков/.test(atext)) 	{peshera[10]=i;}
		if (/Трофейный дракон/.test(atext)) 	{peshera[11]=i;}
		if (/Долина Великанов/.test(atext)) 	{peshera[12]=i;}
		if (/Потерянный Легион/.test(atext)) 	{peshera[13]=i;}
		
		if (/Бить стражника/.test(atext)) 	{attack_strazh=a[i];}
		if (/Бить Аэлло/.test(atext)) 	{aello=a[i];}
		if (/Бить Озомена/.test(atext)) 	{ozomena=a[i];}
		if (/Бить мантикору/.test(atext)) 	{manticora=a[i];}
		if (/Бить минотавра/.test(atext)) 	{minotavr=a[i];}
		if (/Бить дракона/.test(atext)) 	attack_drakon=a[i];
		if (/Бить тролля/.test(atext)) 	    attack_troll=a[i];
		if (/Бить (Берсерка|Голиафа|Атланта)/.test(atext)) 	    attack_bers=a[i];
		if (/Бить Эпитера/.test(atext)) 	{Epiter=a[i];   HP_Ep=/\d+/.exec(atext);}
		if (/Бить Япитера/.test(atext)) 	{Yapiter=a[i];  HP_Ya=/\d+/.exec(atext);}
		if (/Бить Немезиду/.test(atext)) 	{Nemezida=a[i]; HP_N=/\d+/.exec(atext);}
		if (/Бить Цербера/.test(atext)) 	{Cerber=a[i];   HP_C=/\d+/.exec(atext);}
		if (/Бить Гарма/.test(atext)) 		{Garm=a[i];     HP_G=/\d+/.exec(atext);}
		if (/Бить Зодиака/i.test(atext)) 	{zodiak=a[i];   HP_Zod=/\d+/.exec(atext);}
		if (/Бить душу/.test(atext)) 		attack_soul=a[i];
		if (/Добивать (...|....) /.test(atext))	                zod_soul=a[i];
		if (/Бить легионера/i.test(atext)) 	lego_lego=a[i];
		if (/Бить Легата/i.test(atext)) 		lego_legat=a[i];
		if (/Бить Антония/i.test(atext)) 	lego_anton=a[i];
		if (/Бить Марк/i.test(atext)) 		lego_mark=a[i];
		if (/Бить Легата/.test(atext))							attack_legat=a[i];
		if (/Бить Антония/.test(atext))							attack_antoniy=a[i];
		if (/Бить Марк/.test(atext))							attack_mark=a[i];
		if (/Бить легионера/.test(atext))						attack_legion=a[i];
		
        if (/scrollUseFullLink/.test(a[i].href)) use_full=a[i];
		if (/scrollUseLink|scrollUse4Link/.test(a[i].href))	use_4hr=a[i];

		if (/Выбрать набор 1/i.test(atext)) 	abilitiesSetLink[1]=i;
		if (/Выбрать набор 2/i.test(atext)) 	abilitiesSetLink[2]=i;
		if (/Выбрать набор 3/i.test(atext)) 	abilitiesSetLink[3]=i;
		if (/Выбрать набор 4/i.test(atext)) 	abilitiesSetLink[4]=i;
		if (/Выбрать набор 5/i.test(atext)) 	abilitiesSetLink[5]=i;
		if (/Надеть комплект 1/i.test(atext)) 	itemsSetLink[1]=i;
		if (/Надеть комплект 2/i.test(atext)) 	itemsSetLink[2]=i;
		if (/Надеть комплект 3/i.test(atext)) 	itemsSetLink[3]=i;
		if (/Надеть комплект 4/i.test(atext)) 	itemsSetLink[4]=i;
		if (/Надеть комплект 5/i.test(atext)) 	itemsSetLink[5]=i;
		if (/Выучить набор 1/i.test(atext)) 	talantsSetLink[1]=i;
		if (/Выучить набор 2/i.test(atext)) 	talantsSetLink[2]=i;
		if (/Выучить набор 3/i.test(atext)) 	talantsSetLink[3]=i;
        if (/Выучить набор 4/i.test(atext)) 	talantsSetLink[4]=i;
		if (/Выучить набор 5/i.test(atext)) 	talantsSetLink[5]=i;

		if (/Обновить/.test(atext)) 			obnovit=a[i];
		if (/Назад/.test(atext))  		        nazad=a[i];
		if (/Воскреснуть в столице \((\d+)сек/i.test(atext)){time_res=/\d+/.exec(atext)*1000; resurection=a[i];}	
		else if (/Воскреснуть/i.test(atext))		{time_res=timeout; resurection=a[i]; }	
		if (/На главную|Покинуть бой/.test(atext)) 	naGlavnuy=a[i] ; 
		if (/Мой герой/.test(atext)) 		    user=a[i];
		if (/Башни/.test(atext)) 		    	bashni=a[i];
		if (/Замки/.test(atext)) 		    	zamki=a[i];
		if (/Отметить все как прочитанные/.test(atext) || /markAsReadLink/.test(a[i].href)) markletter=a[i];
		if (/mail\/message/.test(a[i].href)) 		{if (a[i].className!='minor') message=a[i];}
		if (/ЗАБРАТЬ ИЗ ПОЧТЫ/.test(atext)) 		getlink=a[i];
		if (/ЗАБРАТЬ ВСЕ ИЗ ПОЧТЫ/.test(atext)) 	getAllLink=a[i];
		if (/modeNew/.test(a[i].href)) 			nov=a[i];
	}
}

for (var i=0; i<img.length; i++)  
	{ 
		if ( /captcha/.test(img[i].src)) cap_src=img[i].src;
		if ( /blue_tower|blue_guard/.test(img[i].src)) if (!storona) nextTower=true; 
		if ( /red_tower|red_guard/.test(img[i].src)) if (storona) nextTower=true;
		if ( /red_castle/.test(img[i].src) ) redcastle=true;
		if ( /bag_full/.test(img[i].src) ) fullBag=true;
		if ( /bag_better/.test(img[i].src) ) bag_better=true;
		if ( /clothes_broken/.test(img[i].src)) clothes_broken=true;
		if ( /guild_south/.test(img[i].src)) olimp=true;
		if ( /energy_low/.test(img[i].src)) lowenergy=true;
		if (/icons\/letter\./.test(img[i].src) && i<10 && sms_sound && !title.match(/Герой/i))	sound.play();
		if ( /icons\/letter\./.test(img[i].src) && (i<10) && ReadMessage) new_mail=true;
		if ( /alliance_south/.test(img[i].src)) storona2=true;
		if ( /rip/.test(img[i].src) ) rip=true;
	}
	if (!bag_better && mark[15]!=0) mark[15]=0;
}

function click(link, timer, perehod){

	if (link!='' && !action) {
		action=true;
		activ_link=link;
		trayStatus=timer;
 		t1 = +new Date(); 
	if (perehod==1) sessionStorage.perehod=1; else if (perehod==0) sessionStorage.perehod=0;
	if (link!=undefined && typeof link=="object") {
	if (mark[24]!=0) link.style.border="3px double" + Setcolorn;
    else link.style.border="3px double" + Setcoloru;}
    timeoutId = setInterval(function(){location.href=link;}, timer);
	return;
	}
}

function resurectionT_()
{ 
   if (mark[24]!=0) {resurectionBefore=resurectionAfter;}
   if ( curgamessurvival<SetPvP[1] && mark[28]==0 || curgamesarena<SetPvP[0] && mark[21]==0 ){
	if (curgamessurvival<SetPvP[1] && mark[28]==0) resurectionTower=2;
	else if ((curgamessurvival>=SetPvP[1] || mark[28]!=0) && curgamesarena<SetPvP[0] && mark[21]==0) resurectionTower=3;
   }
  else if (resurectionBefore==0) resurectionTower=0;
  else if (resurectionBefore==1) resurectionTower=1;
  else if (resurectionBefore==2) {
	if (mark[28]==0) resurectionTower=2;
	else if (mark[28]!=0 && mark[21]==0) resurectionTower=3;
	else if (mark[28]!=0 && mark[21]!=0 && mark[24]==0) resurectionTower=1;
	else if (mark[28]!=0 && mark[21]!=0 && mark[24]!=0) resurectionTower=0;
  }
  else if (resurectionBefore==3) {
	if (mark[21]==0) resurectionTower=3;
	else if (mark[21]!=0 && mark[28]==0) resurectionTower=2;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]==0) resurectionTower=1;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]!=0) resurectionTower=0;
  }
  else if (resurectionBefore==4) {
	if (mark[28]==0) resurectionTower=2;
	else if (mark[28]!=0) resurectionTower=1;
  }
  else if (resurectionBefore==5) {
	if (mark[21]==0) resurectionTower=3;
	else if (mark[21]!=0) resurectionTower=1;
  }
  else if (resurectionBefore==6) {
	Item_N[5]=Item_N[1];
    Abil_N[5]=Abil_N[1];
    Stan_N[5]=Stan_N[1];
	spt=300;
    timeout=300;
	if (title.match(/Арена/i) && (rus_t.match("Ваш герой погиб, ждите окончания боя")||pokinut!='' && rip) && mark[28]==0 ) {resurectionTower=2; click('/game/survival', timeout);}
	else if (title.match(/Арена/i) && !rus_t.match("Ваш герой погиб, ждите окончания боя") ) {resurectionTower=3;}
	else if (title.match(/Выживание/i) && (rus_t.match("Ваш герой погиб, ждите окончания боя")||pokinut!='' && rip) && mark[21]==0) {resurectionTower=3; click('/game/arena', timeout);}
	else if (title.match(/Выживание/i) && !rus_t.match("Ваш герой погиб, ждите окончания боя") ) {resurectionTower=2;}
	else if (mark[28!=0] && mark[21]==0) resurectionTower=3;
	else if (mark[21]!=0 && mark[28]==0) resurectionTower=2;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]==0) resurectionTower=1;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]!=0) resurectionTower=0; 
    else if (!title.match(/Арена|Выживание/i) ) resurectionTower=3;
  }
  else if (resurectionBefore==7) {
	spt=300;
    timeout=300;
	if (title.match(/Арена/i) && (rus_t.match("Ваш герой погиб, ждите окончания боя")||pokinut!='' && rip) && mark[28]==0 ) {resurectionTower=2; click('/game/survival', timeout);}
	else if (title.match(/Арена/i) && !rus_t.match("Ваш герой погиб, ждите окончания боя") ) {resurectionTower=3;}
	else if (title.match(/Выживание/i) && (rus_t.match("Ваш герой погиб, ждите окончания боя")||pokinut!='' && rip) && mark[21]==0) {resurectionTower=3; click('/game/arena', timeout);}
	else if (title.match(/Выживание/i) && !rus_t.match("Ваш герой погиб, ждите окончания боя") ) {resurectionTower=2;}
	else if (mark[28!=0] && mark[21]==0) resurectionTower=3;
	else if (mark[21]!=0 && mark[28]==0) resurectionTower=2;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]==0) resurectionTower=1;
	else if (mark[21]!=0 && mark[28]!=0 && mark[24]!=0) resurectionTower=0; 
    else if (!title.match(/Арена|Выживание/i) ) resurectionTower=3;
  }
  else if (resurectionBefore>=8) resurectionTower=1;
	
	if ( resurectionTower==0 && InTowers && (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) ) click(naGlavnuy, timeout);
	if ( resurectionTower==1 && (title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) ) click(naGlavnuy, timeout);
	if ( resurectionTower==2 && mark[28]==0 && (title.match(/Арена/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) ) click(naGlavnuy, timeout);
	if ( resurectionTower==3 && mark[21]==0 && (title.match(/Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) ) click(naGlavnuy, timeout);
	if ( resurectionTower!=3 && curgamesarena>SetPvP[0] && (title.match(/Арена/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) ) click(naGlavnuy, timeout);
	if ( resurectionTower!=2 && curgamessurvival>SetPvP[1] && (title.match(/Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) ) click(naGlavnuy, timeout);
}

function razobratVeshi()
{
if ( !InEvents && !Boss && vboy=='' ) 
 {
	if (mark[22]==1) goToAbilities_();

	if (sessionStorage.used==1 ) 
	{
		sessionStorage.removeItem('used'); 
		if ( (use_full!='' || use_4hr!='') && (sessionStorage.megamen.match('премиум')||mark[11]!=1)) 
		{	
			for (var i=0;i<=12;i++) {
				if (title.match(name_scrl[i])) {
					Scrolls[i]=comp_time+5000;
					if (SetUse4hr && use_4hr!='') click(use_4hr, timeout);
					else if (use_full!='') click(use_full, timeout); 
					else if (use_4hr!='') click(use_4hr, timeout);
					sessionStorage.scrolls=Scrolls
				}
			}
		}
	}
	if (title.match("Подтверждение") && rus_t.match(/Он заменит текущий/i) ) goToAbilities_();
	else if ( confirm_link!='' && title.match('Подтверждение') ) click(confirm_link, timeout);
	if (sessionStorage.nadet==1 ) {sessionStorage.removeItem('nadet'); if  (nadet!='') click(nadet, timeout); }
	if (sessionStorage.drop==1 ) {sessionStorage.removeItem('drop'); if  (vikinut!='') click(vikinut, timeout); }
	if (sessionStorage.razobrat==1 ) {sessionStorage.removeItem('razobrat'); if  (razobrat!='') click(razobrat, timeout); }
	if (sessionStorage.mifril==1 ) {sessionStorage.removeItem('mifril'); if  (mifril!='') click(mifril, timeout); }
	
	if (rus_t.match(/Открыть сундук \((\d+)\/(\d+)\)/) && title.match("Рюкзак"))
	{
		var sund=/Открыть сундук \((\d+)\/(\d+)\)/.exec(rus_t);
		if (Number(sund[1])>=Number(sund[2])) mark[8]=1;
	}

if ( title.match("Рюкзак") && SetRazbor[0]==1 && vikinut!='') click(vikinut, timeout);
else if ( title.match("Рюкзак") && SetRazbor[0]==1 && mark[7]==0 && razobrat!='' && razobrat_vse!='' && cracklinks>3) {mark[7]=1; click(razobrat_vse, timeout);}
else if ( title.match("Рюкзак") && SetRazbor[0]==1 &&  razobrat!='' ) click(razobrat, timeout);
else if ( title.match("Рюкзак") && SetRazbor[1]==1 &&  mifril!='' ) click(mifril, timeout);
else { 
	for (var i=0;i<div.length;i++) 			
	if ( div[i].getElementsByTagName('a')[0]!=undefined && div[i].getElementsByTagName('a')[0].href.match('/item/id/') && !action )
	{	
		var item_bonus=7;
		var item=div[i].getElementsByTagName('a')[0];
		var item_name=en_ru(replace_(item.textContent));
		var scroll=false; var epic=false; var leg=false; var mif=false;
			for (var y=0;y<div[i].getElementsByTagName('img').length;y++) 
			{
				var type_img=div[i].getElementsByTagName('img')[y].src;
				     if (type_img.match('bonusdarkiron'))  {item_bonus=6; break;}	
				else if (type_img.match('bonuslegendary')) {item_bonus=5; break;}	
				else if (type_img.match('bonusepic')) 	   {item_bonus=4; break;}	
				else if (type_img.match('bonusrare')) 	   {item_bonus=3; break;}
				else if (type_img.match('bonusgreen')) 	   {item_bonus=2; break;}
				else if (type_img.match('bonuscopper'))	   {item_bonus=1; break;}		
			}
		for (var y=0;y<epic_crack.length;y++) {if ( item_name.match(epic_crack[y]) ) {epic=true; break;}} 

		for (var y=0;y<leg_crack.length;y++) {if ( item_name.match(leg_crack[y]) ) {leg=true; break;}}
		
		for (var y=0;y<mif_crack.length;y++) {if ( item_name.match(mif_crack[y]) ) {mif=true; break;}}
		
		if ( title.match(/Рюкзак|Сундук/)) {for (var y=0;y<=12;y++) {if (item_name.match(name_scrl[y]) && dropScroll[y]==1) scroll=true;}}

		if ( SetSvmin<=item_bonus && SetSvmax>=item_bonus && !SetUse4hr && item_bonus>3 && title.match(/Рюкзак|Сундук/i) && (sessionStorage.user.match('премиум')||mark[11]!=1))
		{
			for (var y=0;y<=12;y++)
			{
				if (item_name.match(name_scrl[y]) && SetScroll[y]==1 && (Scrolls[y]==0 || /нет/.test(Scrolls[y]))) {
					sessionStorage.used=1;
					click(item, timeout); 
					break;
				}
			}
		}
		if ( SetSKR[1]>=item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && title.match(/Рюкзак|Сундук/i) && !SetCitStone )
			{sessionStorage.drop=1; click(item, timeout); break; }

		else if ( SetSKR[1]>=item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && title.match(/Рюкзак|Сундук/i) && SetCitStone )
			mark[29]=1;
		
		else if ( SetSKR[2]>=item_bonus && item_name.match(/руна/i) && title.match(/Рюкзак|Сундук/i) )
			{sessionStorage.drop=1; click(item, timeout); break; }
		
		else if ( Setlvlshmot>=item_bonus && title.match('Сундук') && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && div[i].getElementsByClassName('itemBad')[0]==undefined )
			{ sessionStorage.nadet=1; click(item, timeout); break;}

		else if ( item_bonus<4 && SetRazbor[0]==1 && title.match(/Рюкзак|Сундук/i) && item_name.match(/Дружинника|Воина|Охотника/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setepic[0]==1 && div[i].textContent.match("личный") || Setepic[1]==1 && div[i].textContent.match("клановый") || Setepic[2]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.razobrat=1; click(item, timeout); break;}

		else if ( item_bonus==4 && SetRazbor[0]==1 && title.match(/Рюкзак|Сундук/i) && epic && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setepic[0]==1 && div[i].textContent.match("личный") || Setepic[1]==1 && div[i].textContent.match("клановый") || Setepic[2]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.razobrat=1; click(item, timeout); break;}

		else if ( item_bonus<5 && SetRazbor[0]==1 && title.match(/Рюкзак|Сундук/i) && item_name.match(/Дружинника|Воина|Охотника/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setleg[0]==1 && div[i].textContent.match("личный") || Setleg[1]==1 && div[i].textContent.match("клановый") || Setleg[2]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.razobrat=1; click(item, timeout); break;}
		
		else if ( item_bonus==5 && SetRazbor[0]==1 && title.match(/Рюкзак|Сундук/i) && leg && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setleg[0]==1 && div[i].textContent.match("личный") || Setleg[1]==1 && div[i].textContent.match("клановый") || Setleg[2]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.razobrat=1; click(item, timeout); break;}
		
		else if ( item_bonus<6 && SetRazbor[1]==1 && title.match(/Рюкзак|Сундук/i) && item_name.match(/Дружинника|Воина|Охотника/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setmif[0]==1 && div[i].textContent.match("клановый") || Setmif[1]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.mifril=1; click(item, timeout); break;}

		else if ( (item_bonus==6 && mif ) && SetRazbor[1]==1 && title.match(/Рюкзак|Сундук/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && (Setmif[0]==1 && div[i].textContent.match("клановый") || Setmif[1]==1 && div[i].textContent.match("новый")))
			{ sessionStorage.mifril=1; click(item, timeout); break;}
		
		if ( Setlvlshmot<item_bonus && title.match("Рюкзак") && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && mark[8]==1)
			{mark[15]=comp_time+rNum(2000, 5000)}

		else { 
		var wear='',toStore='',toRack='',scrollUse='',openbox='',drop='';

		for (var y=1;y<div[i].getElementsByTagName('a').length;y++)
		{
			var lnk = div[i].getElementsByTagName('a')[y];
			var act = en_ru(replace_(div[i].getElementsByTagName('a')[y].textContent));

			if ( act.match("надеть")&& div[i].getElementsByClassName('itemBad')[0]==undefined && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) ) wear=lnk;
			if ( item_name.match('Запертый ящик') && act.match(/открыть/i) && title.match(/Рюкзак|Сундук/i)) openbox=lnk;
			if ( act.match("в рюкзак") && !title.match('Сундук')) toRack=lnk;
			if ( act.match("в рюкзак") && title.match('Сундук') && SetSKR[1]>=item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) ) toRack=lnk;
			if ( title.match("Рюкзак") && act.match("выкинуть")) drop=lnk;
			if ( act.match(/использовать за \d+/i) && title.match(/Рюкзак|Сундук/)) scrollUse=lnk;
			if ( lnk.href.match("toStoreLink") && mark[8]!=1 && !(SetSKR[1]>=item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i ))) toStore=lnk;
		}
		if (wear!='' && Setlvlshmot>=item_bonus ) click(wear, timeout); 
		else if (openbox!='' && SetboxOpen>=item_bonus) click(openbox, timeout);
		else if (scrollUse!='' && SetSvmin<=item_bonus && SetSvmax>=item_bonus && (SetUse4hr||item_bonus<=3))
			{
				for (var y=0;y<=12;y++)
				if (SetScroll[y]==1 && (Scrolls[y]==0 || /нет/.test(Scrolls[y])) && item_name.match(name_scrl[y])) {
					Scrolls[y]=comp_time+5000; click(scrollUse, timeout);
					sessionStorage.scrolls=Scrolls; break;
				}
			}

		if (!action && toRack!='' ) click(toRack, timeout);
		else if ( SetSKR[0]>=item_bonus && scroll && title.match(/Рюкзак|Сундук/i) && (Setsvit[0]==1 && div[i].textContent.match("личный") || Setsvit[1]==1 && div[i].textContent.match("новый")))
			{sessionStorage.drop=1; click(item, timeout); break; }
		else if (drop!='') click(drop, timeout);
		else if (toStore!='') click(toStore, timeout);
		else if (drop!='') click(drop, timeout);
		}
	}

	if (title.match('Сундук') && svitki_link!='' ) click(svitki_link, timeout);

    if ( vSunduk!='' && title.match("Рюкзак") && mark[8]==1 && fullBag && !action ) {
		if (send_to!="" && mark[11]!=1 )
		click('/user/mail/send/id/'+send_to, timeout);
		else click(location.href, 60000);
	}
	
	if (title.match("Рюкзак")) click(openstore, timeout);

	if (!action && title.match("Сундук")) 
	{
		for (var i=0;i<=12;i++) {if (SetScroll[i]==1 && (Scrolls[i]==0 || /нет/.test(Scrolls[i]))) {Scrolls[i]=(comp_time+rNum(1000, 3600))+"нет"}}
		sessionStorage.scrolls=Scrolls;
		goToAbilities_();
	}
    
	if ( (fullBag || (bag_better && mark[15]==0 )) && !InEvents && !Boss) goToBag_();

	if (!title.match(/Рюкзак|Сундук|Мои умения/i) && (!strateg || mark[18]==0) && mark[11]==0 )
	{
		for (var i=0;i<=12;i++) {if (SetScroll[i]==1 && Scrolls[i]==0 ) {goToBag_(); break;}}
	}
		function goToAbilities_()
		{	mark[22]=1;
			if (title.match("Мои умения")) mark[22]=0;
			else if (title.match("Мой герой") && abilities!='') click(abilities, timeout);
			else if ((InTowers || err_d) && (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) ) click(naGlavnuy, timeout);
			else click(user, timeout);
		}
		function goToBag_()
		{
			if ((InTowers || err_d) && (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) ) click(naGlavnuy, timeout);
			else if (bag!='') click(bag, timeout);
			else click(user, timeout);
		}
      }
  }
}

function stone_drop()
{
	var item_bonus=7;
     if ( title.match(/Хранилище клана/i) && SetCitStone){
     if ( addStone!='') click(addStone, timeout);
	if (rus_t.match(/Добавление камней/i) ){
	for (i=1; i<div.length; i++) {
		if (div[i].getElementsByTagName('a').length==2 && div[i].getElementsByTagName('img').length==1 && div[i].textContent.match(/выбрать/) ){
			for (var y=0;y<div[i].getElementsByTagName('img').length;y++) 
			{
				var type_img=div[i].getElementsByTagName('img')[y].src;
				     if (type_img.match('bonusdarkiron'))  {item_bonus=6; break;}	
				else if (type_img.match('bonuslegendary')) {item_bonus=5; break;}	
				else if (type_img.match('bonusepic')) 	   {item_bonus=4; break;}	
				else if (type_img.match('bonusrare')) 	   {item_bonus=3; break;}
				else if (type_img.match('bonusgreen')) 	   {item_bonus=2; break;}
				else if (type_img.match('bonuscopper'))	   {item_bonus=1; break;}		
			}
			if (SetSKR[1]>=item_bonus) {click(div[i].getElementsByTagName('a')[1], timeout); break}
		}
		else if (i+1==div.length) {click('/user/rack', timeout); mark[29]=0} 
	}
	}
	else if (rus_t.match(/Этот камень добавит/i) && confirm_link!='') click( confirm_link, timeout);
    else if (addStone=='') {click('/user/rack', timeout); mark[29]=0} 
    }
	 else if (title.match(/Клан/i) && storona2 && salvatory!='') click(salvatory,timeout);
	 else if (!title.match(/Хранилище клана/i) && klan!='') {click(klan,timeout)}
}

function TalantsSet_()
{
	if ( title.match("Таланты"))
 {
 sessionStorage.SetTalants='';
 for (var i=5;i>0;i--) {
			if (rus_t.match("Выучить набор "+i)) {sessionStorage.SetTalants=i+" ";break;}
			else sessionStorage.SetTalants="0 "
		}
		for (var i=1;i<=5;i++) {if (talantsSetLink[i]==undefined && rus_t.match('Выучить набор '+i)) sessionStorage.SetTalants+=i+',';}
		
		if (!rus_t.match('Таланты в бою переучивать нельзя') ) 
			for (var i=1;i<=5;i++) {if (sessionStorage.setTalant==i && talantsSetLink[i]!=undefined) {mark[2]=1; click(a[talantsSetLink[i]], timeout);}}
		else click(user, timeout);
		sessionStorage.removeItem("setTalant")
	}
	if (sessionStorage.SetTalants==undefined) {
		if (InTowers) click(naGlavnuy, timeout);
		else click('/user/stances', timeout);}
		
			else if (sessionStorage.SetTalants[0]>=sessionStorage.setTalant && title.match('Варвары') && sessionStorage.setTalant !=0 && sessionStorage.setTalant!=undefined && !action ) {
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[0] && InTowers && !sessionStorage.SetTalants.match(Stan_N[0]+",") && !action) {
		sessionStorage.setTalant=Stan_N[0];
		click(naGlavnuy, timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[1] && title.match(/Арена/i) && attack1=='' && !rus_t.match(/через (\d+) сек/i) &&  !sessionStorage.SetTalants.match(Stan_N[1]+",") && !action) {
		sessionStorage.setTalant=Stan_N[1];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[2] && vzamok=='' && attack1=='' && heal=='' && !sessionStorage.SetTalants.match(Stan_N[2]+",") && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && !action ) {
		sessionStorage.setTalant=Stan_N[2];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[3] && title.match(/Турнир героев/i) && attack1=='' && !sessionStorage.SetTalants.match(Stan_N[3]+",") && !action) {
		sessionStorage.setTalant=Stan_N[3];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[4] && title.match(/Командный турнир/i) && attack1=='' && !sessionStorage.SetTalants.match(Stan_N[4]+",") && !action) {
		sessionStorage.setTalant=Stan_N[4];
		click('/user/stances', timeout);}
	
	else if (sessionStorage.SetTalants[0]>=Stan_N[5] && title.match(/Выживание/i) && attack1=='' && !rus_t.match(/через (\d+) сек/i) &&  !sessionStorage.SetTalants.match(Stan_N[5]+",") && !action) {
		sessionStorage.setTalant=Stan_N[5];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[6] && attack1=='' && heal=='' && !sessionStorage.SetTalants.match(Stan_N[6]+",") && title.match(/Территория/i) && rus_t.match(/Битву можно начать|Финальная битва начнется/i) && !action ) {
		sessionStorage.setTalant=Stan_N[6];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[7] && attack1=='' && heal=='' && !sessionStorage.SetTalants.match(Stan_N[7]+",") && title.match(/Битва героев/i) && !action ) {
		sessionStorage.setTalant=Stan_N[7];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[8] && title.match(/Поля сражений/i) && attack1=='' && Stan_N[8]!=0 && !sessionStorage.SetTalants.match(Stan_N[8]+",") && !action) {
		sessionStorage.setTalant=Stan_N[8];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[9] && Boss && attack1=='' && heal=='' && !sessionStorage.SetTalants.match(Stan_N[9]+",") && !action) {
		sessionStorage.setTalant=Stan_N[9];
		click('/user/stances', timeout);}
	
	else if (sessionStorage.SetTalants[0]>=Stan_N[10] && attack1=='' && !sessionStorage.SetTalants.match(Stan_N[10]+",") && title.match(/Цари Горы/i) && !action) {
		sessionStorage.setTalant=Stan_N[10];
		click('/user/stances', timeout);}

	else if (sessionStorage.SetTalants[0]>=Stan_N[11] && attack1=='' && !sessionStorage.SetTalants.match(Stan_N[11]+",") && title.match(/Город Древних/i) && !action) {
		sessionStorage.setTalant=Stan_N[11];
		click('/user/stances', timeout);}
	
	else if (sessionStorage.SetTalants[0]>=Stan_N[13] && attack1=='' && !sessionStorage.SetTalants.match(Stan_N[13]+",") && title.match(/Территория/i) && rus_t.match(/Набег начнется/i) && !action) {
		sessionStorage.setTalant=Stan_N[13];
		click('/user/stances', timeout);}
	
	if ( mark[2]==1 && !action) {mark[2]=0; click(user, timeout)}

}

function ItemsSet_()
{
	if ( title.match("Моё снаряжение"))
	{	
		sessionStorage.SetItems='';
	
		for (var i=5;i>0;i--) {
			if (rus_t.match("Надеть комплект "+i)) {sessionStorage.SetItems=i+" ";break;}
			else sessionStorage.SetItems="0 ";
		}
		for (var i=1;i<=5;i++) {if (itemsSetLink[i]==undefined && rus_t.match('Надеть комплект '+i)) sessionStorage.SetItems+=i+',';}

		if (!rus_t.match('Переодеваться в бою нельзя') ) 
			for (var i=1;i<=5;i++) {if (sessionStorage.setItem==i && itemsSetLink[i]!=undefined) {mark[30]=1; click(a[itemsSetLink[i]], timeout);}}
		else click(user, timeout);
		sessionStorage.removeItem("setItem");
	}
	if (sessionStorage.SetItems==undefined) {
		if (InTowers) click(naGlavnuy, timeout);
		else click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=sessionStorage.setItem && title.match('Варвары') && sessionStorage.setItem !=0 && sessionStorage.setItem!=undefined && !action ) {
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[0] && InTowers && !sessionStorage.SetItems.match(Item_N[0]+",") && !action) {
		sessionStorage.setItem=Item_N[0];
		click(naGlavnuy, timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[1] && title.match(/Арена/i) && attack1=='' && !rus_t.match(/через (\d+) сек/i) &&  !sessionStorage.SetItems.match(Item_N[1]+",") && !action) {
		sessionStorage.setItem=Item_N[1];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[2] && vzamok=='' && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_N[2]+",") && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && !action ) {
		sessionStorage.setItem=Item_N[2];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[3] && title.match(/Турнир героев/i) && attack1=='' && !sessionStorage.SetItems.match(Item_N[3]+",") && !action) {
		sessionStorage.setItem=Item_N[3];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[4] && title.match(/Командный турнир/i) && attack1=='' && !sessionStorage.SetItems.match(Item_N[4]+",") && !action) {
		sessionStorage.setItem=Item_N[4];
		click('/user/body', timeout);}
	
	else if (sessionStorage.SetItems[0]>=Item_N[5] && title.match(/Выживание/i) && attack1=='' && !rus_t.match(/через (\d+) сек/i) &&  !sessionStorage.SetItems.match(Item_N[5]+",") && !action) {
		sessionStorage.setItem=Item_N[5];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[6] && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_N[6]+",") && title.match(/Территория/i) && rus_t.match(/Битву можно начать|Финальная битва начнется/i) && !action ) {
		sessionStorage.setItem=Item_N[6];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[7] && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_N[7]+",") && title.match(/Битва героев/i) && !action ) {
		sessionStorage.setItem=Item_N[7];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[8] && title.match(/Поля сражений/i) && attack1=='' && Item_N[8]!=0 && !sessionStorage.SetItems.match(Item_N[8]+",") && !action) {
		sessionStorage.setItem=Item_N[8];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[9] && Boss && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_N[9]+",") && !action) {
		sessionStorage.setItem=Item_N[9];
		click('/user/body', timeout);}
	
	else if (sessionStorage.SetItems[0]>=Item_N[10] && attack1=='' && !sessionStorage.SetItems.match(Item_N[10]+",") && title.match(/Цари Горы/i) && !action) {
		sessionStorage.setItem=Item_N[10];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_N[11] && attack1=='' && !sessionStorage.SetItems.match(Item_N[11]+",") && title.match(/Город Древних/i) && !action) {
		sessionStorage.setItem=Item_N[11];
		click('/user/body', timeout);}
	
	else if (sessionStorage.SetItems[0]>=Item_N[13] && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_N[13]+",") && title.match(/Территория/i) && rus_t.match(/Набег начнется/i) && !action ) {
		sessionStorage.setItem=Item_N[13];
		click('/user/body', timeout);}	
	
	if ( mark[30]==1 && !action) {mark[30]=0; click(user, timeout);}

}


function repair()
{
	if (!InEvents && !Boss )
	{
		if (title.match("Моё снаряжение")) {
			if (rus_t.match(/не хватает железа/i) && mark[10]==2) {click (location.href, 60000); action=true}
			else if (pochinit_vse!='' && pochinit_vse_za>=chinit_vse && mark[10]==0) {mark[10]=1; click(pochinit_vse, timeout);}
			else if (pochinit!='') { mark[10]=2; click(pochinit, timeout);}
			else if (pochinit=='') mark[10]=0;
		}
		else if (clothes_broken) {
			if (InTowers) click(naGlavnuy, timeout);
			else if (body!='') click(body, timeout);
		}
	}
}


function altar_()
{
	if ( title.match("Алтарь клана") ) {
		var reg1=/Твой бонус: \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if (reg1.test(rus_t)) {bonus[8]=getSec(f_time.exec(reg1.exec(rus_t)))+comp_time;}
		else {mark[16]=comp_time+rNUm(1000, 2000); click(user, timeout)}
	}
	if ( title.match("Мой герой") && altar!='' ) 
	{
		var reg2=/алтарь \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i;
		if ( rus_t.match("алтарь не активен") ) bonus[8]=0;
		else if (reg2.test(rus_t)) {
			at=f_time.exec(reg2.exec(rus_t));
			bonus[8] = getSec(at)+comp_time;
		}else {mark[16]=comp_time+rNUm(1000, 3600); click(user, timeout)}
	}
	if (SetAltar>0 && (sessionStorage.prem==1||mark[11]==0) && mark[16]==0 && klan!='') {
		if (altar!='' && (Boss || InEvents)) click(user, timeout);
		else {alttime=bonus[8]-comp_time;
		if ( (alttime<300 && title.match("Алтарь клана")) || (alttime<300 && title.match("Мой герой")) || alttime<=0) getAltar_()		
		}
	}
	function getAltar_(){
		if (title.match("Мой герой") && altar!='') click(altar, timeout);
		if (Boss || InTowers || InEvents) click(user, timeout);
		else if (title.match("Алтарь клана")) {
			if (SetAltar==1 && altarZAjelezo!='' && alttime<300)           {mark[16]=comp_time+300; click(altarZAjelezo, timeout)}
			else if (SetAltar==2 && altarZAserebro!='' && alttime<300)     {mark[16]=comp_time+300; click(altarZAserebro, timeout)}
			else if (SetAltar==3 && altarZamki!='' && alttime<300)         {mark[16]=comp_time+300; click(altarZamki, timeout)} 
			else if (SetAltar==4 && altarZamkivse!='' && alttime<300)      {mark[16]=comp_time+300; click(altarZamkivse, timeout)}
		    else if (SetAltar==5 && altarZamkiKolodec!='' && alttime<300)  {mark[16]=comp_time+300; click(altarZamkiKolodec, timeout)}
		}
	    else if (!Boss && vboy=='' && (!InEvents))  click(user, timeout);
	}
	if (klan=='') {bonus[8]=0; mark[16]=0}
	sessionStorage.bonus=bonus;
}



function baf_zamkov()
{
	if (title.match('Бонус замка'))
	{
		for (var i=0;i<=7;i++) {
			var reg=new RegExp(castle_name[i]+" \\[(\\d+):(\\d+):(\\d+)", "i");
			if (reg.test(rus_t)) {bonus[i]=getSec(reg.exec(rus_t))+comp_time;}
		}
	}
	var tt=200;
	if ( vzamok!='' && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i))
	{
		if (nochar!='') mark[19]=1;
		var reg=/Твой текущий бонус: ((шанс (\d+)% )|(\+(\d+)% (\D+)?\s?))\[(\d+):(\d+):(\d+)/i;
		if (reg.test(rus_t)) {
			tt=getSec(f_time.exec(reg.exec(rus_t)));
			for (var i=0;i<=7;i++) {if (title.match(castle_name[i])) bonus[i]=tt+comp_time; }
		} 
	}

	for (var i=0;i<=7;i++) {if (title.match(castle_name[i]) && SetBonus[i]==1 && getbaf!='' && tt<120 && mark[11]==0) {click(getbaf, timeout); break;}}

	if ( (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) && !Boss && !title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/) && mark[11]==0)
	for (var i=0;i<=7;i++) {if (SetBonus[i]==1 && (bonus[i]-comp_time)<=0 ) click('/castle/'+(i+1)+'/', spt);}
	sessionStorage.bonus=bonus;
}

function select_prov(){""==klan?sessionStorage.goall=0:void 0==sessionStorage.goall&&click(klan,spt);title.match(/\u041a\u043b\u0430\u043d/)&&!rus_t.match(/\u0410.\u044c\u044f.\u0441/)&&(sessionStorage.goall=0);title.match(/\u041a\u043b\u0430\u043d/)&&rus_t.match(/\u0410.\u044c\u044f.\u0441/)&&(sessionStorage.goall=rus_t.match(/\u0412.\u043b\u043a. .\u0434.\u043d./)?1:0);0==sessionStorage.goall&&(sessionStorage.clear(),localStorage.clear())};

function terrabut(){

if (!title.match(/Территория|Мои задания/i)) sessionStorage.take_buttle=0;
if (title.match(/Мои задания/i) && zabratnagradu=='') {sessionStorage.take_buttle=1; click(vboy, spt);}
else if (title.match(/Мои задания/i) && zabratnagradu!='') click(zabratnagradu, spt);
else if (title.match(/Территория/i) && attack=='' && server_time[1].match(/14|17|20/) && server_time[2].match(/29/) && server_time[3]>=30 && server_time[3]<=59 && sessionStorage.take_buttle!=1 && SetZadaniya) click('/user/quests',spt);
}

function curgames()
{
 if (newDay){sessionStorage.curgamesarena=0; sessionStorage.curgamessurvival=0;}
 if (title.match(/Выживание/i) && document.body.textContent.match(/Встать в очередь|Покинуть очередь/i)) sessionStorage.curgamessurvival=parseInt(getcurgames.exec(document.body.textContent.match(/мои игры на выживание: \d+\/\d+/i)));
 if (title.match(/Арена/i) && document.body.textContent.match(/мои игры на арене: \d+\/\d+/i))sessionStorage.curgamesarena=parseInt(getcurgames.exec(document.body.textContent.match(/мои игры на арене: \d+\/\d+/i)));
 curgamesarena=sessionStorage.curgamesarena;
 curgamessurvival=sessionStorage.curgamessurvival;
} 

function getbosstime()
{
  if (title.match(/Пустой грот/i) && rus_t.match(/Пещерный стражник убит/i)) {
	var reg = new RegExp(" Пещерный стражник убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[0]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==0) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустой грот/i) && rus_t.match(/Гарпии убиты/i)) {
	var reg = new RegExp(" Гарпии убиты, воскреснут через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[1]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==1) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Мантикора убита/i)) {
	var reg = new RegExp(" Мантикора убита, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[2]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==2) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Минотавр убит/i)) {
	var reg = new RegExp(" Минотавр убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[3]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==3) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Легендарный дракон убит/i)) {
	var reg = new RegExp(" Легендарный дракон убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[4]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==4) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Дракон мертв/i)) {
	var reg = new RegExp(" Дракон мертв, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[6]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==6) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустой храм/i) && rus_t.match(/Немезида и ее верные псы мертвы/i)) {
	var reg = new RegExp(" Немезида и ее верные псы мертвы, воскреснут через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[7]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==7) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Каменный тролль мертв/i)) {
	var reg = new RegExp(" Каменный тролль мертв, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[8]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==8) sessionStorage.removeItem("goToBoss");
	}
  }
    if (title.match(/Пустая Обитель Зодиака/i) && rus_t.match(/Зодиак убит/i)) {
	var reg = new RegExp(" Зодиак убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[9]=getSec(reg.exec(rus_t))+comp_time
		if (sessionStorage.goToBoss==9) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Вход в Святилище предков закрыт/i)) {
	var reg = new RegExp(" Вход в Святилище предков закрыт, откроется через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[10]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==10) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера/i) && rus_t.match(/Трофейный дракон убит/i)) {
	var reg = new RegExp(" Трофейный дракон убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[11]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==11) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая долина/i) && rus_t.match(/Великаны мертвы/i)) {
	var reg = new RegExp(" Великаны мертвы, воскреснут через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[12]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==12) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Кладбище легиона/i) && rus_t.match(/Легион убит/i)) {
	var reg = new RegExp(" Легион убит, воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)) { 
		dungeon[13]=getSec(reg.exec(rus_t))+comp_time;
		if (sessionStorage.goToBoss==13) sessionStorage.removeItem("goToBoss");
	}
  }
  if (title.match(/Пустая пещера|Потерянный Легион/) && rus_t.match(/Вход закрыт./)){
	var reg = new RegExp(" Откроется через (\\d+):(\\d+):(\\d+)", "i") ;
	if (reg.test(rus_t)){
		sessionStorage.objavacooldow=comp_time+300;
		if (sessionStorage.goToBoss!=undefined) sessionStorage.removeItem("goToBoss");
	}
  }
sessionStorage.dungeons=dungeon;
}

function some_()
{  
    if (sessionStorage.user.match('citaactiv') && klan!='') citaactiv=true;
	var tt=200;
	if (title.match(/Башня мудрости|Статуя критона|Академия клана/i))
	{
		var reg= /Бонус клана: \+(\d+)(\.)?(\d+)?% (клан. опыта|крит|личного опыта) \[(\d+):(\d+):(\d+)]/i;
		if (reg.test(rus_t)) {
			tt=getSec(f_time.exec(reg.exec(rus_t)));
			for (var i=0;i<=2;i++) {if (title.match(some_name[i])) cita[i]=tt+comp_time; }
		} 
	}

	for (var i=0;i<=2;i++) {if (title.match(some_name[i]) && SetCitadel[i]==1 && getcit!='' && tt<120) {click(getcit, timeout); break;}}

	if ( !InEvents && !Boss && citaactiv || (InEvents && noviuBoy!=''  && citaactiv)){
		 if (SetCitadel[0]==1 && (cita[0]-comp_time)<=0) click('/guild/citadel/temple'+guild_id+'2/', spt);
	else if (SetCitadel[1]==1 && (cita[1]-comp_time)<=0) click('/guild/citadel/temple'+guild_id+'1/', spt);
	else if (SetCitadel[2]==1 && (cita[2]-comp_time)<=0) click('/guild/citadel/temple'+guild_id+'5/', spt);
	sessionStorage.cita=cita;}
	
}

function zamki_() 
{
	if (title.match('Замки варваров')) { sessionStorage.castle_time='';
		var reg = /до захвата: (\d+):(\d+):(\d+)|идет захват|готов к захвату/ig ;
		while ((tt = reg.exec(rus_t)) != null) {
			if (/идет захват|готов к захвату/i.test(tt[0])) sessionStorage.castle_time += (comp_time + rNum(500, 1000)) +',';
			else if (f_time.test(tt[0])) {sessionStorage.castle_time+= (getSec(f_time.exec(tt[0]))+comp_time) +',';}
		}
	}
	if ( sessionStorage.castle_time==undefined) goToCastles_();
	if ( sessionStorage.castle_time!=undefined)
	{
		var castle=sessionStorage.castle_time.split(",");
		for (var i=0;i<=7;i++) 
		{
			if (newDay) castle[i]=castle[i]-86400;
			var ct=castle[i]-comp_time;
			if (castle[i]==0 && SetZamok[i]==1 ) goToCastles_(); 	
			else if (ct<=0 ) castle[i]=0;
			if (ct!='' && ct>0 && ct<240 && SetZamok[i]==1) {
				if (title.match(/Замки Варваров/i) && zamok[i]!=undefined) click(a[zamok[i]], timeout); 
				else if (title.match(castle_name[i]) && vzamok!='' ) click(vzamok, timeout, 1);
				else if (ct<240 && ct!='') goToCastles_();
			}
		}
		sessionStorage.castle_time=castle;
	}
	function goToCastles_(x) {
		if (title.match('Варвары') && zamki!='') click(zamki, timeout);
		else if (!Boss && (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) && vboy=='') click(naGlavnuy, timeout);
	}
}

function searchPoint()
{
	switch(true)
	{
	case lvl>0 && lvl<8 && mark[5]!=1:
		click(kurganM, timeout, 1);
	 	break;
	case lvl>2 && lvl<14 && mark[5]!=1:
		Lager_Vikingov();
	 	break;
	case lvl>8 && lvl<19 && mark[5]!=1:
		elta_Reki();
		break;
	case lvl>13 && lvl<25 && mark[5]!=1:
		Lednik();
		break;
	case lvl>19 && lvl<33 && mark[5]!=1:
		Severnaya_Pustosh();
		break;
	case lvl>30 && lvl<41 && mark[5]!=1:
		Rosengard();
		break;
	case lvl>29 && lvl<46 && mark[5]!=1:
		Gorod_Mertvih();
		break;
	case lvl>39 && lvl<51 && mark[5]!=1:
		Zemli_Titanov();
		break;	
	case lvl>49 && lvl<61 && mark[5]!=1:
		Dolina_Srazheniy();
	default:;
	}
}

function goToBoss_(){

	if (title.match(/Пещеры и драконы/i))
	{
		for (var i=0;i<=13;i++) {
			var reg = new RegExp(dung_name[i]+" до старта (\\d+):(\\d+):(\\d+)", "i") ;
			if (reg.test(rus_t) && i!=5 ) { 
				dungeon[i]=getSec(reg.exec(rus_t))+comp_time;
				if (sessionStorage.goToBoss==i) sessionStorage.removeItem("goToBoss");
			}
			else if (rus_t.match(dung_name[i])) dungeon[i]=0;
		}
		sessionStorage.dungeons=dungeon;
	}
	if (title.match(/Пещерный стражник|Пещера мантикоры|Лабиринт минотавра|Легендарный дракон|Грот Гарпий/i) && attack1=='' && heal=='') 
	{
		if (dungeon[14]==0) dungeon[14]=comp_time+rNum(120, 250);
		else if (dungeon[14]<comp_time) 
		{
			if (title.match(/Пещерный стражник/i)) dungeon[0]=comp_time+rNum(200, 500)+"нет";
			if (title.match(/Грот Гарпий/i)) dungeon[1]=comp_time+rNum(200, 500)+"нет";
			if (title.match(/Пещера мантикоры/i)) dungeon[2]=comp_time+rNum(200, 500)+"нет";
			if (title.match(/Лабиринт минотавра/i)) dungeon[3]=comp_time+rNum(200, 500)+"нет";
			if (title.match(/Легендарный дракон/i)) dungeon[4]=comp_time+rNum(200, 500)+"нет";
			dungeon[13]=0;
			{console.log(title+' [18]'); click(naGlavnuy, timeout);}
		}
	}
	else dungeon[14]=0;
	sessionStorage.dungeons=dungeon;

	if (err_d || (title.match(/Вход закрыт/i) && rus_t.match(/разрешен только членам кланов/i))) {sessionStorage.removeItem("goToBoss"); {console.log(title+' [19]'); click(naGlavnuy, obnovlenie);}}
	if (err_d || (title.match(/Потерянный Легион/i) && rus_t.match(/Вход закрыт/i))) {sessionStorage.removeItem("goToBoss"); {console.log(title+' [20]'); click(naGlavnuy, obnovlenie);}}
    if (err_d || (title.match(/Пустая Обитель Зодиака/i) && rus_t.match(/Зодиак убит, воскреснет через/i))) {sessionStorage.removeItem("goToBoss"); {console.log(title+' [133]'); click(naGlavnuy, obnovlenie);}}
	
	if ( avtozveri[0]==1 && dungeon[0]==0 && lvl>15 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=0;
	else if ( avtozveri[1]==1 && dungeon[1]==0 && lvl>15 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=1;
	else if ( avtozveri[2]==1 && dungeon[2]==0 && lvl>20 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=2;
	else if ( avtozveri[3]==1 && dungeon[3]==0 && lvl>15 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=3;
	else if ( avtozveri[4]==1 && strong>1200 && dungeon[4]==0 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=4;
	if (vboy=='' && (!InEvents||title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя"))) && sessionStorage.goToBoss!=undefined ) vPesheru(sessionStorage.goToBoss);

	function vPesheru(x){
	    var reg=new RegExp(dung_name[x], "i");
		if (title.match(reg)) sessionStorage.removeItem("goToBoss");
		else if (dungeon[x]==0){
			if (title.match('Варвары') && DND!='') click(DND, timeout);
			else if (title.match('Пещеры и драконы') && x!=undefined && peshera[x]!=undefined ) {sessionStorage.removeItem("goToBoss"); click(a[peshera[x]], timeout); if (mark[21]!=0 && mark[21]<=comp_time+300 && mark[28]!=0 && mark[28]<=comp_time+300) {mark[21]=comp_time+3600;mark[28]=comp_time+3600;}}
			else if (!Boss) {console.log(title+' [21]'); click(naGlavnuy, timeout);}
		}
		else sessionStorage.removeItem("goToBoss");
	}
}

function quests_()
{
    if ( title.match(/Мои задания/i)){
    if ( zabratnagradu!='') click(zabratnagradu, timeout);
	else  {mark[31]=0; sessionStorage.removeItem('tasks'); click(user, timeout); } 
    }
	else if (title.match(/Мой герой/i) && quests!='') click(quests, timeout);
	else if (!title.match(/Мои задания/i) && user!='') {click(user, timeout)}
}

function alliancechat(){
var span4ik=false;
var ss=[];
BBPE:
{
if (title.match(/Чат альянса/i)){

	for (var i=0;i<span.length;i++) 
	{	
		var span_i=en_ru(replace_(span[i].textContent));
			if (skrit!='') {span4ik=true; click(skrit, timeout); break BBPE;}
			if (span_i.match('волкибой|'+terraсlan+'бой|'+(u_class=="воин" ? 'воиныбой|' : 'медыбой|') +terraсlan+(u_class=="воин" ? 'в' : 'м')+'бой')) {span4ik=true; click(vboy, timeout); break BBPE;}
		 	if (span_i.match("терраперевал") || span_i.match(terraсlan+'перевал')) {span4ik=true; sessionStorage.territory=1; break BBPE;}
		 	if (span_i.match("террагоры") || span_i.match(terraсlan+'горы')) { span4ik=true; sessionStorage.territory=2; break BBPE;}
		 	if (span_i.match("террахолмы") || span_i.match(terraсlan+'холмы')) {span4ik=true; sessionStorage.territory=3; break BBPE;}
	    		if (span_i.match("терралес") || span_i.match(terraсlan+'лес')) {span4ik=true; sessionStorage.territory=4; break BBPE;}
		 	if (span_i.match("террапустыня") || span_i.match(terraсlan+'пустыня')){span4ik=true; sessionStorage.territory=5; break BBPE;}
	    		if (span_i.match("терраозеро") || span_i.match(terraсlan+'озеро')) {span4ik=true; sessionStorage.territory=6; break BBPE;}
	    		if (span_i.match("терратопи") || span_i.match(terraсlan+'топи')) {span4ik=true; sessionStorage.territory=7; break BBPE;}
	    		if (span_i.match("терракамни") || span_i.match(terraсlan+'камни')) {span4ik=true; sessionStorage.territory=8; break BBPE;}
	    		if (span_i.match("террастепи") || span_i.match(terraсlan+'степи')) {span4ik=true; sessionStorage.territory=9; break BBPE;}
	      		if (span_i.match("террадолина") || span_i.match(terraсlan+'долина')) {span4ik=true; sessionStorage.territory=10; break BBPE;}
	    		if (span_i.match("терраскалы") || span_i.match(terraсlan+'скалы')) {span4ik=true; sessionStorage.territory=11; break BBPE;}
	    		if (span_i.match("терраземли") || span_i.match(terraсlan+'земли')) {span4ik=true; sessionStorage.territory=12; break BBPE;}
	     		if (span_i.match("терраостров") || span_i.match(terraсlan+'остров')) {span4ik=true; sessionStorage.territory=13; break BBPE;}
			if (span_i.match("терраоазис") || span_i.match(terraсlan+'оазис')) {span4ik=true; sessionStorage.territory=14; break BBPE;}
			if (span_i.match("террамантикор") || span_i.match(terraсlan+'мантикор')) {span4ik=true; sessionStorage.territory=15; break BBPE;}
			if (span_i.match("террапески") || span_i.match(terraсlan+'пески')) {span4ik=true; sessionStorage.territory=16; break BBPE;}
			if (span_i.match("террадраконов") || span_i.match(terraсlan+'драконов')) {span4ik=true; sessionStorage.territory=17; break BBPE;}
	        	if (span_i.match("терракопи") || span_i.match(terraсlan+'копи')) {span4ik=true; sessionStorage.territory=18; break BBPE;}
 	 }
	if (!span4ik) click(obnovit, 5000);
}
if ( SetBattle[0]==1 && klan!='' && !title.match(/Почта|Клан|Чат альянса/i) )
{
	for (var i=0;i<span.length;i++) 
	{	
	  if (span[i].className!="info")
	  {
		var span_i=en_ru(replace_(span[i].textContent));
		{
		   	if ((span_i.match("терраперевал") || span_i.match(terraсlan+'перевал')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Грозовой Перевал/i)) {sessionStorage.territory=1; break BBPE;}
			if ((span_i.match("террагоры") || span_i.match(terraсlan+'горы')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Тысяча Гор/i)) {sessionStorage.territory=2; break BBPE;}
		    if ((span_i.match("террахолмы") || span_i.match(terraсlan+'холмы')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Седые Холмы/i)) {sessionStorage.territory=3; break BBPE;}
	    	if ((span_i.match("терралес") || span_i.match(terraсlan+'лес')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Каменный Лес/i)) {sessionStorage.territory=4; break BBPE;}
		   	if ((span_i.match("террапустыня") || span_i.match(terraсlan+'пустыня')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Пепельная Пустыня/i)) {sessionStorage.territory=5; break BBPE;}
	    	if ((span_i.match("терраозеро") || span_i.match(terraсlan+'озеро')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Черное Озеро/i)) {sessionStorage.territory=6; break BBPE;}
	    	if ((span_i.match("терратопи") || span_i.match(terraсlan+'топи')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Могильные Топи/i)) {sessionStorage.territory=7; break BBPE;}
	    	if ((span_i.match("терракамни") || span_i.match(terraсlan+'камни')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Голые Камни/i)) {sessionStorage.territory=8; break BBPE;}
	    	if ((span_i.match("террастепи") || span_i.match(terraсlan+'степи')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Покинутые Степи/i)) {sessionStorage.territory=9; break BBPE;}
	      	if ((span_i.match("террадолина") || span_i.match(terraсlan+'долина')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Забытая Долина/i)) {sessionStorage.territory=10; break BBPE;}
	    	if ((span_i.match("терраскалы") || span_i.match(terraсlan+'скалы')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Черные Скалы/i)) {sessionStorage.territory=11; break BBPE;}
	    	if ((span_i.match("терраземли") || span_i.match(terraсlan+'земли')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Выжженные земли/i)) {sessionStorage.territory=12; break BBPE;}
	     	if ((span_i.match("терраостров") || span_i.match(terraсlan+'остров')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Мертвый остров/i)) {sessionStorage.territory=13; break BBPE;}
			if ((span_i.match("терраоазис") || span_i.match(terraсlan+'оазис')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Радужный Оазис/i)) {sessionStorage.territory=14; break BBPE;}
			if ((span_i.match("террамантикор") || span_i.match(terraсlan+'мантикор')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Пещеры Мантикор/i)) {sessionStorage.territory=15; break BBPE;}
			if ((span_i.match("террапески") || span_i.match(terraсlan+'пески')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Золотые Пески/i)) {sessionStorage.territory=16; break BBPE;}
			if ((span_i.match("террадраконов") || span_i.match(terraсlan+'драконов')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Ущелье Драконов/i)) {sessionStorage.territory=17; break BBPE;}
	        if ((span_i.match("терракопи") || span_i.match(terraсlan+'копи')) && (InTowers||(Boss)||title.match(/Территория/i)) && !title.match(/Самоцветные Копи/i)) {sessionStorage.territory=18; break BBPE;}
			if (u_class=="воин")
		    	{    
				if (span_i.match('синих медов') || span_i.match('северных медов') || span_i.match(terraсlan+'синих м')) sessionStorage.dobivatTerr=1;
				if (span_i.match('южных медов') || span_i.match('красных медов') || span_i.match(terraсlan+'южных м')) sessionStorage.dobivatTerr=2;
		      	if (span_i.match('синих воинов') || span_i.match('северных воинов') || span_i.match(terraсlan+'синих в')) sessionStorage.dobivatTerr=3; 
				if (span_i.match('южных воинов') || span_i.match('красных воинов') || span_i.match(terraсlan+'южных в')) sessionStorage.dobivatTerr=4;
		    	if (span_i.match('бить всех') || span_i.match(terraсlan+'бить в')) sessionStorage.dobivatTerr=5;
			    }
			if (span_i.match('волкистоп|'+terraсlan+'стоп|'+(u_class=="воин" ? 'воиныстоп|' : 'медыстоп|') +terraсlan+(u_class=="воин" ? 'в' : 'м')+'чат') && title.match(/Территория/i)) 
		{
			if (klan!='') {click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.alliance.chat.AllianceChatPage', timeout); break BBPE;}
		}  
	  }
	}
  } 
}
if (mark[3]!=1 && !action && !title.match(/Чат клана|Клан|Чат альянса|Почта|Территория/i) && SetBattle[0]==1 && klan!='') 
{ 
	for (var i=0;i<document.getElementsByTagName("strong").length;i++)
	{
		var strong_txt=en_ru(replace_(document.getElementsByTagName("strong")[i].textContent));
		    if (strong_txt.match(/Объявление альянса/i) || strong_txt.match(/Объявление клана/i))
		    {
			for (var i=0;i<document.getElementsByClassName('info').length;i++)
			{   for (var k=0;k<document.getElementsByClassName('minor small').length;k++)
			    {
				var info_txt=en_ru(replace_(document.getElementsByClassName('info')[i].textContent));
				var minor_txt=en_ru(replace_(document.getElementsByClassName('minor small')[k].textContent));
				if (minor_txt.match(/секун(д|да|ды)|(1|2|3|4|5|6|7|8|9|10) мину(т|та|ты)/))
				{
				if ((info_txt.match("Грозовой Перевал") || info_txt.match(terraсlan+'перевал')) && !title.match(/Территория/i)) {sessionStorage.territory=1; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Тысяча Гор") || info_txt.match(terraсlan+'горы')) && !title.match(/Территория/i))		      {sessionStorage.territory=2; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Седые Холмы") || info_txt.match(terraсlan+'холмы')) && !title.match(/Территория/i))         {sessionStorage.territory=3; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Каменный Лес") || info_txt.match(terraсlan+'лес')) && !title.match(/Территория/i))	      {sessionStorage.territory=4; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Пепельная Пустыня") || info_txt.match(terraсlan+'пустыня')) && !title.match(/Территория/i))  {sessionStorage.territory=5; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Черное Озеро") || info_txt.match(terraсlan+'озеро')) && !title.match(/Территория/i))	      {sessionStorage.territory=6; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Могильные Топи") || info_txt.match(terraсlan+'топи')) && !title.match(/Территория/i))	      {sessionStorage.territory=7; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Голые Камни") || info_txt.match(terraсlan+'камни')) && !title.match(/Территория/i))	      {sessionStorage.territory=8; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Покинутые Степи") || info_txt.match(terraсlan+'степи')) && !title.match(/Территория/i))	{sessionStorage.territory=9; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Забытая Долина") || info_txt.match(terraсlan+'долина')) && !title.match(/Территория/i))	      {sessionStorage.territory=10; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Черные Скалы") || info_txt.match(terraсlan+'скалы')) && !title.match(/Территория/i))	      {sessionStorage.territory=11; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Выжженные земли") || info_txt.match(terraсlan+'земли')) && !title.match(/Территория/i))	{sessionStorage.territory=12; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Мертвый остров") || info_txt.match(terraсlan+'остров')) && !title.match(/Территория/i))	 {sessionStorage.territory=13; click(skrit, timeout); break BBPE;}
			    if ((info_txt.match("Радужный Оазис") || info_txt.match(terraсlan+'оазис')) && !title.match(/Территория/i))	 {sessionStorage.territory=14; click(skrit, timeout); break BBPE;}
			    if ((info_txt.match("Пещеры Мантикор") || info_txt.match(terraсlan+'мантикор')) && !title.match(/Территория/i))    {sessionStorage.territory=15; click(skrit, timeout); break BBPE;}
			    if ((info_txt.match("Золотые Пески") || info_txt.match(terraсlan+'пески')) && !title.match(/Территория/i))	     {sessionStorage.territory=16; click(skrit, timeout); break BBPE;}
			   	if ((info_txt.match("Ущелье Драконов") || info_txt.match(terraсlan+'драконов')) && !title.match(/Территория/i))      {sessionStorage.territory=17; click(skrit, timeout); break BBPE;}
				if ((info_txt.match("Самоцветные Копи") || info_txt.match(terraсlan+'копи')) && !title.match(/Территория/i))    {sessionStorage.territory=18; click(skrit, timeout); break BBPE;}
				} 
			    } 
			}
		     }  
	}
}
}
if ((title.match("Вход закрыт") && rus_t.match(/Война за территории доступна только для клановых игроков|Набег начался, Вы не успели|Набеги на территории могут совершать только кланы и альянсы, у которых нет своих территорий/i))) {sessionStorage.removeItem('territory'); mark[3]=1}

	if (title.match(/Территория/i) && title.match(/Грозовой Перевал/i) && sessionStorage.territory==1 ) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Тысяча Гор/i) && sessionStorage.territory==2) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Седые Холмы/i) && sessionStorage.territory==3) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Каменный Лес/i) && sessionStorage.territory==4) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Пепельная Пустыня/i) && sessionStorage.territory==5) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Черное Озеро/i) && sessionStorage.territory==6) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Могильные Топи/i) && sessionStorage.territory==7) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Голые Камни/i) && sessionStorage.territory==8) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Покинутые Степи/i) && sessionStorage.territory==9) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Забытая Долина/i) && sessionStorage.territory==10) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Черные Скалы/i) && sessionStorage.territory==11) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Выжженные земли/i) && sessionStorage.territory==12) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Мертвый остров/i) && sessionStorage.territory==13) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Радужный Оазис/i) && sessionStorage.territory==14) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Пещеры Мантикор/i) && sessionStorage.territory==15) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Золотые Пески/i) && sessionStorage.territory==16) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Ущелье Драконов/i) && sessionStorage.territory==17) sessionStorage.removeItem('territory');
	if (title.match(/Территория/i) && title.match(/Самоцветные Копи/i) && sessionStorage.territory==18) sessionStorage.removeItem('territory');
	if (title.match('Территория') && na_terr!='') click(na_terr, timeout);
	else if ( (!title.match(/Арена/i)  && !title.match(/Выживание/i) || (title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) && vboy=='' && sessionStorage.territory>0 && (server_time[1].match(/14|17|20/) && server_time[2]>=25||server_time[1].match(/15|21/))) click('/territory/'+sessionStorage.territory+'/', timeout);
	if (server_time[1]<14 || ( server_time[1]>15 && server_time[1]<17 ) || (server_time[1]>17 && server_time[1]<20 ) || server_time[1]>21) {sessionStorage.removeItem('territory'); mark[3]=0;}
	 
}

function battle_()
{
var rand=rNum(4);

	if ((!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) && !Boss && vboy=='' )
	{
	
		if ( SetBattle[2]==1 && lvl>=25 && (( server_time[1]==19 && server_time[2]>=55) || ( server_time[1]==13 && server_time[2]>=46 && server_time[2]<=50) )) {
			if (title.match('Варвары') && cargori!='') click(cargori, timeout);
			else click(naGlavnuy, timeout)
		}
		if ( SetBattle[4]==1 && server_time[1]==11 && server_time[2]>=46 && server_time[2]<55 ) {
			if (title.match('Варвары') ) click('/game/bmess', timeout);
			else click(naGlavnuy, timeout);
		}
		if ( SetBattle[1]==1 && mark[9]!=1 && server_time[2]>=56 && lvl>=25 && mark[4]!=1) {
			if (title.match('Варвары') && bg!='') click(bg, timeout);
			else click(naGlavnuy, timeout);
		}
		if ( SetBattle[6]==1 && mark[9]!=1 && /10|15|21/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 )
			click('/game/tournament/0/1/', spt); 
		
		if ( SetBattle[7]==1 && mark[9]!=1 && /12|19|23/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 )
			click('/game/tournament/0/2/', spt);
	
		if ( SetBattle[3]==1 && mark[9]!=1 && /13|18/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 && lvl>=25 ) {
			if (title.match('Варвары') && battle!='') click(battle, timeout);
			else click(naGlavnuy, timeout);
		}	
		if ( SetBattle[5]==1 && /11|16|22|00/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 && lvl>=25 )
		{
			if (InTowers||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) click(naGlavnuy, timeout);
			if (SetGarderob[0]==1 && !action && title.match(/Варвары/i))
			if (sessionStorage.abilities[0]>=Abil_N[12] && !sessionStorage.abilities.match(Abil_N[12]+",") && SetGarderob[0]==1) {
				sessionStorage.setAbil=Abil_N[12];
				click('/user/abilities', timeout);}
			if (SetGarderob[1]==1 && !action && title.match(/Варвары/i))
			if (sessionStorage.SetItems[0]>=Item_N[12] && !sessionStorage.SetItems.match(Item_N[12]+",") && SetGarderob[1]==1) {
				sessionStorage.setItem=Item_N[12];
				click('/user/body', timeout); }
			if (SetGarderob[2]==1 && !action && title.match(/Варвары/i))
			if (sessionStorage.SetTalants[0]>=Stan_N[12] && !sessionStorage.SetTalants.match(Stan_N[12]+",") && SetGarderob[2]==1) {
				sessionStorage.setTalant=Stan_N[12];
				click('/user/stances', timeout); }
			if (title.match('Варвары')) click('/game/gerrod', timeout);
			else {console.log(title+' [27]'); click(naGlavnuy, timeout);}
		}
	 	    if ( resurectionTower==2 && !title.match('Выживание') && lvl>=25 ) {
			if (title.match('Варвары') && survival!='') click(survival, timeout);
			else click(naGlavnuy, timeout);
		}		
		if ( resurectionTower==3 && !title.match('Арена') && lvl>=25 ) {
			if (title.match('Варвары') && arena!='') click(arena, timeout);
			else click(naGlavnuy, timeout);
		}

	}
	if ( title.match("Поля сражений") && server_time[2]<55 && server_time[2]>1 ) click(naGlavnuy, obnovlenie);
	else if ( leviyBeregM!='' && title.match(/Южный Порт|Южная Крепость/i) && rand==1) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt;
		click(leviyBeregM, obnovlenie, 1);
	}
	else if ( praviuBeregM!='' && title.match(/Южный Порт|Южная Крепость/i) && rand==2) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt;
		click(praviuBeregM, obnovlenie, 1);
	}
	else if ( zapadvrata!='' && title.match(/Южный Порт|Южная Крепость/i) && rand==1 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt;
		click(zapadvrata, obnovlenie, 1);
	}	
	else if ( centrvrata!='' && title.match(/Южный Порт|Южная Крепость/i) && rand==2 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt;
		click(centrvrata, obnovlenie, 1);
	}	
	else if ( vostochvrata!='' && title.match(/Южный Порт|Южная Крепость/i) && rand==3 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt;
		click(vostochvrata, obnovlenie, 1);
	}	
	if (server_time[2]<55) mark[4]=0;
}


function ReadMessages()
{
	if ( title.match("Сообщение для ") && getlink!='') click(getlink, timeout);
	else if ( title.match("Почта") && message=='' && mail!='' && nov!='') click(nov, timeout);
	else if ( title.match("Новые") && message=='' && mail!='' && nov=='' && markletter!='') click(markletter, timeout);
	else if ( title.match(/Почта|Новые/) && message!='' ) click(message, timeout);
	else if ( InTowers && rNum(4)>0) click(naGlavnuy, timeout);
	else if ( !InTowers  && mail!='' && (!InEvents||(title.match(/Арена|Выживание/i)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))) && !Boss) click(mail, timeout);
}

function proverka_loga()
{
var dmgRegexp= new RegExp('Вы промахнулись|Лечить некого|'+nick+' (ударил|полечил) (по кам\\. щиту )?(по эн\\. щиту )?(\\D+)\s?(\\D+)?\s?(\\D+)? на (\\d+) ?(крит)?|'+nick+' сжёг (\\d+) (крит)?', "i"); 

	if (sessionStorage.missed==undefined) sessionStorage.missed=0;

	if (dmgRegexp.test(rus_t) && !firstvalue && sessionStorage.perehod==0)
	{
		var firstvalue=(dmgRegexp.exec(rus_t))[0];
		if (/Вы промахнулись/.test(firstvalue) ){
			if (sessionStorage.perehod!=1) sessionStorage.missed++;
			if ( vrag_med=='0' && vrag_mech=='0' && attack_kochev=='') sessionStorage.perehod=1;
		}
		else if (/Лечить некого/.test(firstvalue)){
			sessionStorage.perehod=1; 
			nekogo_lechit=true;
		}
		else if (dmgRegexp.test(rus_t)){
			var dmg=/\d+/.exec(firstvalue);
			if (attack_kochev!='') dmg=dmg*1.7;
			if (/крит/.test(firstvalue)) dmg=dmg*0.7; 
			if (/полечил/.test(firstvalue)) dmg=dmg*0.7; 
			if ((/по кам/.test(firstvalue) && !pronik && (HP_vraga>500)) && (dmg<Number(strong*0.042)) || dmg==0) {bad_target=true; arenadef=true;}
			if (/по эн\. щиту/.test(firstvalue) && !pronik && (dmg<Number(strong*0.07)) ) {bad_target=true; arenadef=true;}
			if ((/по кам\. щиту|щиту отраж/.test(firstvalue) && title.match(/Святилище предков/i))) {CDT=rNum(5000, 6000); berserk=''; kritomania='';} 
			if ((/по кам\. щиту|щиту отраж/.test(firstvalue) && InEvents && sessionStorage.crazy!=1 && !pronik)) {berserk=''; kritomania='';}
			if ((/по кам\. щиту/.test(firstvalue) && !pronik && (HP_vraga>500)) || dmg==0) bad_target=true;
			else if (dmg<Number(strong*0.08)) sessionStorage.missed++;
			else if (Number(sessionStorage.missed)>=1) sessionStorage.missed--	;
		}
	}

	for (var i=0;i<span.length;i++) 
	{	
		var span_i=en_ru(replace_(span[i].textContent));
		if (SetBattle[8]==1 && klan!='' && !title.match("Почта") && !title.match("Клан"))
		{
			if (span_i.match(nick+ ' бой') && (Boss) && startBoss!='') click(startBoss, timeout);
			if (span_i.match(Setdrak) || span_i.match(nick+ ' на драка') || span_i.match(nick+ ' на мифа')) {dungeon[6]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=6; break;}
			if (span_i.match(Setnema) || span_i.match(nick+ ' на немку') || span_i.match(nick+ ' на нему')) {dungeon[7]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=7; break;}
			if (span_i.match(Settrol) || span_i.match(nick+ ' на троля') || span_i.match(nick+ ' на тролля')) {dungeon[8]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=8; break;}
			if (span_i.match(Setzod)  || span_i.match(nick+ ' на зода')) {dungeon[9]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=9; break;}
			if (span_i.match(Setpred) || span_i.match(nick+ ' на свят') || span_i.match(nick+ ' на предков')) {dungeon[10]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=10; break;}
			if (span_i.match(Settrof) || span_i.match(nick+ ' на троффа') || span_i.match(nick+ ' на трофа')) {dungeon[11]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=11; break;}
			if (span_i.match(Setvel)  || span_i.match(nick+ ' на велов')) {dungeon[12]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=12; break;}
			if (span_i.match(Setlegi) || span_i.match(nick+ ' на легион')) {dungeon[13]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=13; break;}
			if (span_i.match(SetExit) || span_i.match(nick+ ' выход')) {if (Boss) {sessionStorage.removeItem("goToBoss"); {console.log(title+' [32]'); click(naGlavnuy, timeout);}} break;}
			if ((span_i.match(Setstop)|| span_i.match(nick+ ' стоп')) && (InTowers||InEvents||Boss)) 
				{
			    if (klan!=''){ 
				   sessionStorage.goToChat=1; 
				   click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout)}
				else sessionStorage.goToChat=0;   
				break;
				}
			if ((span_i.match(Setvboy) ||  span_i.match(nick+ ' старт')) && title.match("Чат клана")) {sessionStorage.goToChat=0; break;}
			if ((span_i.match(Setvzam) || span_i.match(nick+ ' замки')) && InTowers) sessionStorage.removeItem('castle_time');	
		    if ((span_i.match(Setlegat) || span_i.match(nick+ ' легата')) && title.match(/Потерянный Легион/i)) {sessionStorage.atk=3; break;}
		}	
	}
	sessionStorage.current_log='';
	for (var i=0;i<span.length;i++)
	{
	var span_i=en_ru(replace_(span[i].textContent));
		if (span[i].style.color.match(/chocolate|rgb\(0, 204, 255\)/) && (span_i.match(/ударил Вас (по кам. щиту |по эн. щиту )?на (\d+) (крит)?/i) || span_i.match(nick+' (включил|использовал)')) && !span_i.match(/(Стражник|Геррод|кочевник) ударил Вас/i))
		{		
			var otrajenie=false;
			if (span[i].getElementsByTagName('a')[0]!=undefined)
			{
				var opponent=span[i].getElementsByTagName('a')[0].textContent;
				var Regship=new RegExp(span_i+' ?'+opponent+' ?применил (шипованную броню|отражение)', 'ig');
				if (rus_t.match(Regship)) {
					otrajenie=true;
					if (InEvents) bad_target=true;}
			}
			if (!otrajenie) {
				sessionStorage.current_log+=span_i;
			
				if (span_i.match(nick+' (включил|использовал) (уворот|каменный щит)')) break;
				
				if (sessionStorage.activ_log.match(span_i)) {
				} else {
					var ur_hp=/\d+/.exec(span_i);
					sum_damage++;
					all_damage+=Number(ur_hp);
				}
			}
		}
	}
	sessionStorage.activ_log=sessionStorage.current_log;
}


function notify_()
{
	for (var i=0;i<document.getElementsByTagName("strong").length;i++)
	{
		var strong_txt=en_ru(replace_(document.getElementsByTagName("strong")[i].textContent));
		if (strong_txt.match(/Объявление клана/i))
				{
			for (var i=0;i<document.getElementsByClassName('info').length;i++)
			{	for (var k=0;k<document.getElementsByClassName('minor small').length;k++){
				var info_txt=en_ru(replace_(document.getElementsByClassName('info')[i].textContent))
				var minor_txt=en_ru(replace_(document.getElementsByClassName('minor small')[k].textContent))
				if (minor_txt.match(/секун(д|да|ды)|(1|2|3|4|5) мину(т|та|ты)/)){
				if (info_txt.match(Setdrak) || info_txt.match(nick+ ' на драка') || info_txt.match(nick+ ' на мифа')) {dungeon[6]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=6;}
				if (info_txt.match(Setnema) || info_txt.match(nick+ ' на немку') || info_txt.match(nick+ ' на нему'))  {dungeon[7]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=7;}
				if (info_txt.match(Settrol) || info_txt.match(nick+ ' на троля') || info_txt.match(nick+ ' на тролля'))  {dungeon[8]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=8;}
				if (info_txt.match(Setzod) || info_txt.match(nick+ ' на зода'))   {dungeon[9]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=9;}
				if (info_txt.match(Setpred) || info_txt.match(nick+ ' на свят') || info_txt.match(nick+ ' на предков'))  {dungeon[10]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=10;}
				if (info_txt.match(Settrof) || info_txt.match(nick+ ' на троффа') || info_txt.match(nick+ ' на трофа'))  {dungeon[11]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=11;}
				if (info_txt.match(Setvel) || info_txt.match(nick+ ' на велов'))   {dungeon[12]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=12;}
				if (info_txt.match(Setlegi) || info_txt.match(nick+ ' на легион'))   {dungeon[13]=0; sessionStorage.dungeons=dungeon; sessionStorage.goToBoss=13;}
				if (info_txt.match(Setvzam) || info_txt.match(nick+ ' в замки') || info_txt.match(nick+ ' замки')) {sessionStorage.removeItem('castle_time');  if (title.match(/Арена|Выживание/i)||InTowers) {console.log(title+' [61]'); click(naGlavnuy, timeout)}};
				if (info_txt.match(Setstop) || info_txt.match(nick+ ' стоп'))  {sessionStorage.goToChat=1;
				click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout)};
			    if (info_txt.match(Setbash))  {mark[21]=comp_time+300; mark[28]=comp_time+300; mark[24]=0;}
			} } }
		}
	}
 if (sessionStorage.goToBoss>5 && (InTowers && (title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Ваш герой погиб, ждите окончания боя")))||(title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни|Поля сражений|Логово Геррода|Город Древних|Цари Горы|Битва Героев/i)&&obnovit!=""))) {console.log(title+' [33]'); click(naGlavnuy, timeout);}
}

function Lager_Vikingov()
{
if (title.match(/Каракорум, столица Юга/i)) click(lagerOrdiM, timeout, 1);

	if (title.match("Лагерь орды")) click(lagerVikingovM, spt, 1);
}

function Delta_Reki()
{
if (title.match(/Каракорум, столица Юга/i)) click(usteRekiM, timeout, 1);	
	var delta_reki=rNum(2);	
	
	if (title.match("Дельта реки"))
	{
		if (delta_reki==0) click(leviyBeregM, spt, 1);
		else click(praviuBeregM, spt, 1);
	}
	if (title.match("Левый берег"))
	{
		if ((delta_reki==0)&& nextTower ) click(deltaRekiM, spt, 1);
		else click(usteRekiM, spt, 1);
	}
	if (title.match("Правый берег"))
	{
		if ((delta_reki==0)&& nextTower ) click(deltaRekiM, spt, 1);
			else click(usteRekiM, spt, 1);
	}
	if (title.match("Устье реки"))
	{
		if ((delta_reki==0)&& nextTower ) click(leviyBeregM, spt, 1);
			else if (nextTower) click(praviuBeregM, spt, 1);
	}
}

function Lednik() 
{
if (title.match(/Каракорум, столица Юга/i)) click(gornoeOzeroM, timeout, 1);

	var lednik_rand=rNum(3);	

	if (title.match("Ледник"))
	{
		if (lednik_rand<2) click(ledyaniePesheriM, spt, 1);
			else click(verhniuPerevalM, spt, 1);
	}	
	if (title.match("Ледяные пещеры"))
	{
		if ( nextTower &&(lednik_rand==0)) click(lednikM, spt, 1);
			else if (lednik_rand==1) click(nijniuPerevalM, spt, 1);
			else click(kamenniePesheriM, spt, 1);
	}
	if (title.match("Каменные пещеры"))
	{
		if ( nextTower &&(lednik_rand==0)) click(ledyaniePesheriM, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(verhniuPerevalM, spt, 1);
			else click(gornoeOzeroM, spt, 1);
	}
	if (title.match("Верхний перевал"))
	{
		if ( nextTower &&(lednik_rand==0)) click(lednikM, spt, 1);
			else if (lednik_rand==1) click(kamenniePesheriM, spt, 1);
			else click(nijniuPerevalM, spt, 1);
	}
	if (title.match("Нижний перевал"))
	{
		if ( nextTower &&(lednik_rand==0)) click(ledyaniePesheriM, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(verhniuPerevalM, spt, 1);
			else click(gornoeOzeroM, spt, 1);
	}
	if (title.match("Горное озеро"))
	{
		if ( nextTower &&(lednik_rand<2)) click(kamenniePesheriM, spt, 1);
			else if (nextTower) click(nijniuPerevalM, spt, 1);
	}
}

function Severnaya_Pustosh() 
{
if (title.match(/Каракорум, столица Юга/i)) click(UPustoshM, timeout, 1);

  var sev_pustosh=rNum(4);

	if (title.match("Северная пустошь"))
	{
		if (sev_pustosh<2) click(SZPustoshM, spt, 1);
			else click(SVPustoshM, spt, 1);
	}
	if (title.match("Северо-восточная пустошь"))
	{
		if ( nextTower &&(sev_pustosh==0)) click(SPustoshM, spt, 1);
			else if (sev_pustosh==1) click(perekrestokM, spt, 1);
			else click(VPustoshM, spt, 1);
	}
	if (title.match("Восточная пустошь"))
	{
		if ( nextTower &&(sev_pustosh<2)) click(SVPustoshM, spt, 1);
			else click(UVPustoshM, spt, 1);
	}
	if (title.match("Юго-восточная пустошь"))
	{
		if ( nextTower &&(sev_pustosh==0)) click(VPustoshM, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestokM, spt, 1);
			else click(UPustoshM, spt, 1);
	}
	if (title.match("Перекрёсток"))
	{
		if ( nextTower &&(sev_pustosh==0)) click(SZPustoshM, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(SVPustoshM, spt, 1);
			else if (sev_pustosh==2) click(UZPustoshM, spt, 1);
			else click(UVPustoshM, spt, 1);
	}
	if (title.match("Северо-западная пустошь"))
	{
		if ( nextTower &&(sev_pustosh==0)) click(SPustoshM, spt, 1);
			else if (sev_pustosh==1) click(perekrestokM, spt, 1);
			else click(ZPustoshM, spt, 1);
	}
	if (title.match("Западная пустошь"))
	{
		if ( nextTower &&(sev_pustosh<2)) click(SZPustoshM, spt, 1);
			else click(UZPustoshM, spt, 1);
	}
	if (title.match("Юго-западная пустошь"))
	{
		if ( nextTower &&(sev_pustosh==0)) click(ZPustoshM, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestokM, spt, 1);
			else click(UPustoshM, spt, 1);
	}
	if (title.match("Южная пустошь"))
	{
		if ( nextTower &&(sev_pustosh<2)) click(UZPustoshM, spt, 1);
			else if (nextTower) click(UVPustoshM, spt, 1);
	}
}

function Rosengard() 
{
if (title.match(/Каракорум, столица Юга/i)) click(marokandM, timeout, 1);	

  var rosengard_=rNum(4);

if (title.match("Мароканд"))
	{
		if ( nextTower &&(rosengard_<2)) click(VmarokandM, spt, 1);
		else if (nextTower) click(ZmarokandM, spt, 1);
	}
 if (title.match("Восточный Мароканд"))
	{
		if ( nextTower &&(rosengard_<2)) click(BKurganM, spt, 1);
		else click(marokandM, spt, 1);
	}
 if (title.match("Западный Мароканд"))
	{
		if ( nextTower &&(rosengard_<2)) click(BKurganM, spt, 1);
		else click(marokandM, spt, 1);
	}

 if (title.match("Западный Розенгард"))
	{
		if ( nextTower &&(rosengard_<2)) click(rosengardM, spt, 1);
		else click(BKurganM, spt, 1);
	}
 if (title.match("Восточный Розенгард"))
	{
		if ( nextTower &&(rosengard_<2)) click(rosengardM, spt, 1);
		else click(BKurganM, spt, 1);
	}
 if (title.match("Розенгард"))
	{
		if ( nextTower &&(rosengard_<2)) click(ZRosengardM, spt, 1);
		else click(VRosengardM, spt, 1);
	}
 if (title.match("Большой курган"))
	{
		if ( nextTower &&(rosengard_==0)) click(ZRosengardM, spt, 1);
		else if ( nextTower &&(rosengard_==1)) click(VRosengardM, spt, 1);
		else if (rosengard_==2) click(ZmarokandM, spt, 1);
		else click(VmarokandM, spt, 1);
	}
}

function Gorod_Mertvih() 
{
if (title.match(/Каракорум, столица Юга/i)) click(MGUM, timeout, 1);

  var MG_rand=rNum(4);

 if (title.match("Мертвый город, Юг"))
	{
		if ( nextTower &&(MG_rand==0)) click(UZOM, spt, 1);
		else if ( nextTower &&(MG_rand==1)) click(HZM, spt, 1);
		else if ( nextTower &&(MG_rand==2)) click(HOM, spt, 1);
		else if (nextTower) click(UVOM, spt, 1);
	}

 if (title.match("Юго-западная окраина"))
	{
		if ( nextTower &&(MG_rand<3)) click(PZM, spt, 1);
		else click(MGUM, spt, 1);
	}
	
 if (title.match("Храм огня"))
	{
		if ( nextTower &&(MG_rand<2)) click(PZM, spt, 1);
		else if ( nextTower &&(MG_rand<4)) click(PVM, spt, 1);
		else click(MGUM, spt, 1);
	}
 if (title.match("Храм земли"))
	{
		if ( nextTower &&(MG_rand<2)) click(PVM, spt, 1);
		else if ( nextTower &&(MG_rand<4)) click(PRM, spt, 1);
	    else click(MGUM, spt, 1);
	}
	
 if (title.match("Юго-восточная окраина"))
	{
		if ( nextTower &&(MG_rand<3)) click(PRM, spt, 1);
		else click(MGUM, spt, 1);
	}

 if (title.match("Площадь заката"))
	{
		if ( nextTower &&(MG_rand==0)) click(SZOM, spt, 1);
		else if ( nextTower &&(MG_rand==1)) click(HNM, spt, 1);
	 	else if (MG_rand==2) click(UZOM, spt, 1);
	  	else click(HOM, spt, 1);
	}

 if (title.match("Площадь восстания"))
	{
		if ( nextTower &&(MG_rand==0)) click(HNM, spt, 1);
		else if ( nextTower &&(MG_rand==1)) click(HVM, spt, 1);
		else if (MG_rand==2) click(HZM, spt, 1);
		else click(HOM, spt, 1);
	}

 if (title.match("Площадь рассвета"))
	{
		if ( nextTower &&(MG_rand==0)) click(HVM, spt, 1);
		else if ( nextTower &&(MG_rand==1)) click(SVOM, spt, 1);
		else if (MG_rand==2) click(HZM, spt, 1);
		else click(UVOM, spt, 1);
	}
	
 if (title.match("Северо-западная окраина"))
	{
		if ( nextTower &&(MG_rand<2)) click(MGSM, spt, 1);
		else click(PZM, spt, 1);
	}
	
 if (title.match("Храм неба"))
	{
		if ( nextTower &&(MG_rand<2)) click(MGSM, spt, 1);
		else if (MG_rand==2) click(PVM, spt, 1);
		else click(PZM, spt, 1);
	}

 if (title.match("Храм воды"))
	{
		if ( nextTower &&(MG_rand<2)) click(MGSM, spt, 1);
		else if (MG_rand==2) click(PRM, spt, 1);
	 	else click(PVM, spt, 1);
	}	

 if (title.match("Северо-восточная окраина"))
	{
		if ( nextTower &&(MG_rand<2)) click(MGSM, spt, 1);
		else click(PRM, spt, 1);
	}
	
   if (title.match("Мертвый город, Север"))
	{
		if (MG_rand==0) click(SZOM, spt, 1);
		else if (MG_rand==1) click(HNM, spt, 1);
		else if (MG_rand==2) click(HVM, spt, 1);
		else click(SVOM, spt, 1);
	}
}

function Zemli_Titanov() 
{
if (title.match(/Каракорум, столица Юга/i)) click(ZTUM, timeout, 1);

  var ZT_rand=rNum(4);

 if (title.match("Земли титанов, Север"))
	{
		if (ZT_rand<2) click(SVGM, spt, 1);
		else click(SZGM, spt, 1);
	}

 if (title.match("Северо-западные горы"))
	{
		if ( nextTower &&(ZT_rand<1)) click(ZTSM, spt, 1);
			else if (ZT_rand==2) click(ZVM, spt, 1);
			else click(KTM, spt, 1);
	}
	
 if (title.match("Северо-восточные горы"))
	{
		if ( nextTower &&(ZT_rand<1)) click(ZTSM, spt, 1);
		else if (ZT_rand==2) click(VVM, spt, 1);
		else click(KTM, spt, 1);
	}
 if (title.match("Западные врата"))
	{
		if ( nextTower &&(ZT_rand<2)) click(SZGM, spt, 1);
		else click(UZGM, spt, 1);
	}
	
 if (title.match("Крепость титанов"))
	{
		if ( nextTower &&(ZT_rand<1)) click(SZGM, spt, 1);
		else if ( nextTower &&(ZT_rand<2)) click(SVGM, spt, 1);
		else if (ZT_rand==2) click(UZGM, spt, 1);
		else click(UVGM, spt, 1);
	}

 if (title.match("Восточные врата"))
	{
		if ( nextTower &&(ZT_rand<2)) click(SVGM, spt, 1);
		else click(UVGM, spt, 1);
	}

 if (title.match("Юго-западные горы"))
	{
		if ( nextTower &&((ZT_rand==0)||(ZT_rand==1))) click(ZVM, spt, 1);
		else if ( nextTower &&((ZT_rand==2)||(ZT_rand==3))) click(KTM, spt, 1);
		else click(ZTUM, spt, 1);
	}

 if (title.match("Юго-восточные горы"))
	{
		if ( nextTower &&(ZT_rand<2)) click(KTM, spt, 1);
		else if ( nextTower &&(ZT_rand<4)) click(VVM, spt, 1);
		else click(ZTUM, spt, 1);
	}
	
 if (title.match("Земли титанов, Юг"))
	{
		if ( nextTower &&(ZT_rand<2)) click(UZGM, spt, 1);
		else if (nextTower) click(UVGM, spt, 1);
	}
}

function Dolina_Srazheniy() 
{
if (title.match(/Каракорум, столица Юга/i)) click(DSUM, timeout, 1);

  var DS_rand=rNum(4);

 if (title.match("Долина Сражений, Север"))
	{
		if (DS_rand<2) click(SVFM, spt, 1);
		else click(SZFM, spt, 1);
	}

 if (title.match("Северо западный Форт"))
	{
		if ( nextTower &&(DS_rand<1)) click(DSSM, spt, 1);
		else if (DS_rand==2) click(ZKM, spt, 1);
		else click(PVBM, spt, 1);
	}
	
 if (title.match("Северо восточный Форт"))
	{
		if ( nextTower &&(DS_rand<1)) click(DSSM, spt, 1);
		else if (DS_rand==2) click(VKM, spt, 1);
		else click(PVBM, spt, 1);
	}
 if (title.match("Западный Курган"))
	{
		if ( nextTower &&(DS_rand<2)) click(SZFM, spt, 1);
		else click(UVFM, spt, 1);
	}
	
 if (title.match("Поле вечной битвы"))
	{
		if ( nextTower &&(DS_rand<1)) click(SZFM, spt, 1);
		else if ( nextTower &&(DS_rand<2)) click(SVFM, spt, 1);
		else if (DS_rand==2) click(UVFM, spt, 1);
		else click(UVFM, spt, 1);
	}

 if (title.match("Восточный Курган"))
	{
		if ( nextTower &&(DS_rand<2)) click(SVFM, spt, 1);
		else click(UVFM, spt, 1);
	}

 if (title.match("Юго западный Форт"))
	{
		if ( nextTower &&((DS_rand==0)||(DS_rand==1))) click(ZKM, spt, 1);
		else if ( nextTower &&((DS_rand==2)||(DS_rand==3))) click(PVBM, spt, 1);
		else click(DSUM, spt, 1);
	}

 if (title.match("Юго восточный Форт"))
	{
		if ( nextTower &&(DS_rand<2)) click(PVBM, spt, 1);
		else if ( nextTower &&(DS_rand<4)) click(VKM, spt, 1);
		else click(DSUM, spt, 1);
	}
	
 if (title.match("Долина Сражений, Юг"))
	{
		if ( nextTower &&(DS_rand<2)) click(UVFM, spt, 1);
		else if (nextTower) click(UVFM, spt, 1);
	}
}



function resurection_()
{
	mark[17]=0;
	
	if ( resurectionTower==0 && title.match('Варвары') ) click(naGlavnuy, rNum(30000, 60000));
	else if ( title.match('Варвары') && resurectionTower==1)
	{
		if (SetGarderob[0]==1)
		if (sessionStorage.abilities[0]>=Abil_N[0] && !sessionStorage.abilities.match(Abil_N[0]+',') && SetGarderob[0]==1) {
			sessionStorage.setAbil=Abil_N[0];
			click('/user/abilities', timeout); }
		if (SetGarderob[1]==1 && !action)
		if (sessionStorage.SetItems[0]>=Item_N[0] && !sessionStorage.SetItems.match(Item_N[0]+',') && SetGarderob[1]==1) {
			sessionStorage.setItem=Item_N[0];
			click('/user/body', timeout); }
		if (SetGarderob[2]==1 && !action)
		if (sessionStorage.SetTalants[0]>=Stan_N[0] && !sessionStorage.SetTalants.match(Stan_N[0]+',') && SetGarderob[2]==1) {
		   sessionStorage.setTalant=Stan_N[0];
		   click('/user/stances', timeout); }
		click(bashni, timeout);
	}
	if (title.match(/Каракорум, столица Юга/i)) searchPoint();

	if (InTowers) {
	
	if ((Number(vrag_mech)+Number(vrag_med))<=enemy && attackTowers=='' && healYourself=='') searchPoint();
    if (SetPobeg==2 && (((Number(vrag_mech)/(Number(drug_med)+Number(drug_mech)))>krit_massa) || 
	(Number(krithp)>uroven_HP && Number(krithp)!=0 && uroven_HP!=0 && healYourself=='' ) || 
	((Number(brb)>Number(brb_max))&&(Number(krithp)<uroven_HP)&&(healYourself=='')))) searchPoint();
    
	if (SetPobeg==1 && (((Number(vrag_mech)/(Number(drug_med)+Number(drug_mech)))>krit_massa) || 
	(Number(krithp)>uroven_HP && Number(krithp)!=0 && uroven_HP!=0 && healYourself=='' ) || 
	((Number(brb)>Number(brb_max))&&(Number(krithp)<uroven_HP)&&(healYourself=='')))) 
	click (naGlavnuy, spt);
   }
}

function select_event()
{
	if (uvorot!='' && title.match('Арена') && rus_t.match(/Наши: (\d) /)) {var nashi = /Наши: (\d) /.exec(rus_t); if (nashi[1]==1 && !uvorotOne) {SetWhite=0; uvorot='';}}
	if (uvorot!='' && title.match('Арена') && rus_t.match(/Враги: (\d) /)) {var vragi = /Враги: (\d) /.exec(rus_t); if (vragi[1]==1) SetWhite=0; }
	if (uvorot!='' && title.match('Выживание') && rus_t.match(/ (\d) (\d+):(\d+)/)) {var war=/ (\d) (\d+):(\d+)/.exec(rus_t); if (war[1]==2 && !uvorotOne) {SetWhite=0; uvorot='';}}
	if (attack_strazh!='' && rus_t.match(/ (\d+)% (\d+)% (\d+):(\d+)/) && title.match(/Голова|Сердце|Гроза|Крепость|Исцеление|Зеркало|Источник|Колыбель/i)) 
	{	var straj = / (\d+)% (\d+)% (\d+):(\d+)/.exec(rus_t); if (attack!='' && straj[2]>4) attack_strazh='';  }
	if (energchit!='' && title.match(/Выживание|Арена/i) && lowenergy)  energchit='';

	if (attackDobivat!='')
	{
		var target_name=en_ru(attackDobivat.textContent).replace(/( {1,})?Добивать( {1,})?/, '').replace(/( {1,})?\((\d+)\)( {1,})?/, '');
        if ((SetBlack==1 || SetBlack==3) && InTowers && en_ru(black_list).match(target_name)) bad_target=true;
        if ((SetBlack==2 || SetBlack==3) && title.match(/Логово Геррода|Выживание|Арена|Цари Горы|Город Древних/i) && en_ru(black_list).match(target_name)) good_target=true;
        if ((SetWhite==1 || SetWhite==3) && InTowers && en_ru(white_list).match(target_name)) good_target=true;
        if ((SetWhite==2 || SetWhite==3) && title.match(/Логово Геррода|Выживание|Арена|Цари Горы|Город Древних/i) && en_ru(white_list).match(target_name)) bad_target=true;
        if ((TerWhite==1) && title.match(/Территория/i) && en_ru(white_terra).match(target_name)) bad_target=true;
		if ((TerBlack==1) && title.match(/Территория/i) && en_ru(black_terra).match(target_name)) good_target=true;
		if (attackDobivat.innerHTML.match("lifealert"))    good_target=true;
        if (attackDobivat.innerHTML.match("/images/icons/red") && !storona && title.match(/Территория/i)) bad_target=true;
        if (attackDobivat.innerHTML.match("/images/icons/red") && storona && title.match(/Территория/i))   bad_target=true; 
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==0)
		{
		if (attackDobivat.innerHTML.match(/(red_|blue_)healer/)) good_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)warrior/)) bad_target=true;
		}
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==1)
		{
		if (attackDobivat.innerHTML.match(/blue_healer/)) good_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)warrior|red_healer/)) bad_target=true;
		}
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==2)
		{
		if (attackDobivat.innerHTML.match(/red_healer/)) good_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)warrior|blue_healer/)) bad_target=true;
		}	
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==3)
		{
		if (attackDobivat.innerHTML.match(/blue_warrior/)) good_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)healer|red_warrior/)) bad_target=true;
		}	
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==4)
		{
		if (attackDobivat.innerHTML.match(/red_warrior/)) good_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)healer|blue_warrior/)) bad_target=true;
		}	
	if (title.match(/Территория/i) && sessionStorage.dobivatTerr==5)
		{
		if (attackDobivat.innerHTML.match(/healer|warrior|gladiator/)) good_target=true;
		}	
	if (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && sessionStorage.dobzamki==0)
		{
		if (attackDobivat.innerHTML.match(/blue_healer/)) good_target=true;
		if (attackDobivat.innerHTML.match(/blue_warrior/)) bad_target=true;
		}
	if (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && sessionStorage.dobzamki==1)
		{
		if (attackDobivat.innerHTML.match(/healer|warrior|gladiator/)) good_target=true;
		}	
		if (nasmeshka!='' && attackDobivat.innerHTML.match(/(red_|blue_)healer/) && InTowers) {nasmeshka=''; bad_target=true;}
	}
	

var rand=Math.random()*4;

if (title.match("Поля сражений") && /57|58/.test(server_time[2])) obnovlenie=rNum(1000, 40000);
if (title.match("Город Древних")) obnovlenie=rNum(1000, 5000);
if (title.match(/Территория/i) && sessionStorage.crazy==1 && obnovit=="") buttleTZ[0]=0;
if (title.match(/Территория/i) && rus_t.match(/Набег начался|Набег начнется/i)) sessionStorage.dobivatTerr=5;
if (title.match(/Территория/i) && u_class=="медик") SetdestroyMana=0;
if (title.match("Врата|Стены|Площадь|Храм|Мифриловый Зал")) obnovlenie=rNum(1000, 4000);
if (title.match("Битва за подарки")) CDTEvent=3000;

var CDT=CDTAttack; if (InEvents) CDT=CDTEvent;

if (smeshka) CDT=2500;
if ((attack_gerod=='' || attack_kochev=='') && ( healYourself!='' || ( healSoyznika!='' && healEnd ) || ( heal!='' && ( ( (( nekogo_lechit && rand<2 ) || !nekogo_lechit) && SetdestroyMana==1 ) || SetdestroyMana==0 || destroyMana=='' ) ) ) ) CDT=CDTHeal;
if ( sessionStorage.perehod==1 ) CDT=rNum(300, 1000);

  if (SetDrinkHPlvl>0 && buttle!='' && (t_but<(CDT-300)) && (Number(SetDrinkHP)>=uroven_HP) ) click(buttle, t_but+spt, 0);
  else if (title.match(/Территория/i) && buttleTZ[0]==1 && lowenergy && (Number(uroven_MP)<50) && buttle!='') click(buttle, t_but+spt, 0);
  else if (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && buttleTZ[2]==1 && lowenergy && (Number(uroven_MP)<50) && buttle!='') click(buttle, t_but+spt, 0);
  else if (title.match(/Цари Горы/i) && Number(sessionStorage.shit)<carshit && zhelshit!='') {
    if (rus_t.match(/не хватает железа/i)) sessionStorage.shit=carshit;
    else {sessionStorage.shit=Number(sessionStorage.shit)+1; click(zhelshit, timeout);}
  }
  else if ( uvorot!='' && (t_uvo<(CDT-200)) && kamenshit && Number(all_damage)>250) click(uvorot, t_uvo+spt, 0);
  else if ( uvorot!='' && (t_uvo<(CDT-200)) && !kamenshit && all_damage>1 && (SetUmenia[0]==1 || SetUmenia[0]!=1 && Number(setUvorotHP)>=uroven_HP)) click(uvorot, t_uvo+spt, 0);
  else if ( kamShit!='' && t_kam<(CDT-200) && all_damage>1 && (SetUmenia[2]==1 || SetUmenia[2]!=1 && Number(setKamShitHP)>=uroven_HP)) click(kamShit, t_kam+spt, 0);
  else if ( otrShit!='' && (t_otr<(CDT-200)) && all_damage>1 && (SetUmenia[3]==1 || SetUmenia[3]!=1 && Number(setOtrShitHP)>=uroven_HP)) click(otrShit, t_otr+spt, 0);
  else if ( energchit!='' && (t_ener<(CDT-200)) && all_damage>1 && (SetUmenia[1]==1 || SetUmenia[1]!=1 && Number(setEnergChitHP)>=uroven_HP)) click(energchit, t_ener+spt, 0);
  else if ( obmanS!='' && (t_obm<(CDT-200)) && all_damage>1 && (SetUmenia[4]==1 || SetUmenia[4]!=1 && Number(setobmanSHP)>=uroven_HP)) click(obmanS, t_obm+spt, 0);
  else if ( berserk!='' && heal=='' && (t_bers<(CDT-200))) click(berserk, CDT, 0);
  else if ( pronikaushii!='' && heal=='' && (t_pron<(CDT-200))) click(pronikaushii, CDT, 0);
  else if ( kritomania!='' && (t_krit<(CDT-200))) click(kritomania, CDT, 0);
  else if ( metka!='' && (t_metk<(CDT-200))) click(metka, CDT, 0);
  else if ( dobivat_kochev!='' && (HP_kocev<15000)){ if (sessionStorage.prem == 1) {click(dobivat_kochev, CDT, 0);} else click (naGlavnuy, CDT, 0);}
  else if ( attack_kochev!=''){ if (sessionStorage.prem == 1) {click(attack_kochev, CDT, 0);} else click (naGlavnuy, CDT, 0);}
  else if ( attack_gerod!='' ) click(attack_gerod, CDT, 0);
  else if ( attack_strazh!='') click(attack_strazh, CDT, 0);
  else if ( nasmeshka!='' && (t_nasm<(CDT-200))) click(nasmeshka, CDT, 0);
  else if ( healYourself!='' && !smeshka ) click(healYourself, CDT);
  else if ( healSoyznika!='' && healEnd && !smeshka ) click(healSoyznika, CDT, 0);
  else if ( heal!='' && !smeshka && ( ( (( nekogo_lechit && rand<2 ) || !nekogo_lechit) && SetdestroyMana==1 ) || SetdestroyMana==0 || destroyMana=='' )) click(heal, CDT, 0);
  else if ( destroyMana!='')  {	
	if (berserk!='' && (t_bers<(CDT-200))) click(berserk, CDT, 0);
	else if ( destroyMan!='' && smeshka ) click(destroyMan, CDT, 0);
	else if ( destroyMan!='' && rNum(4)<1 && !bad_target ) click(destroyMan, CDT, 0);
	else click(destroyMana, CDT, 0);
  }
  else if ( obnovit!='' && title.match("Чат клана") && sessionStorage.goToChat==1 ) click(obnovit, CDTStop, 1);
  else if ( attackTowers!='' && (SetAttackTower==2 || (!storona && title.match("Южный Порт")))) click(attackTowers, CDT, 0);
  else if ( attackTowers!='' && SetAttackTower==1 && !title.match(/Битва Героев/i) && ((HP_Bashni/drug_mech)>rNum(800, 2000))) click(attackTowers, CDT, 0);
  else if ( attackDobivat!='' && (!bad_target && ( (!InEvents && rNum(4)<2) || good_target || 
		(InEvents && !title.match(/Логово Геррода|Территория|Битва Героев|Цари Горы|Город Древних|Битва за подарки/i)) ) )) click(attackDobivat, CDT, 0);
  else if ( attack!='') click(attack, CDT, 0);
  else if ( attack_vrata!='') click(attack_vrata, CDT, 0);	  
  else if ( noviuBoy!='') click(noviuBoy, timeout, 1);
  else if ( vstatVochered!='' && mark[25]==0) {mark[25]=1; click(vstatVochered, timeout, 1);}
  else if ( vstatVochered!='' && mark[25]==1) {mark[25]=0; click(user, timeout, 1);}
  else if ( vstupit!='') click(vstupit, timeout, 1);
  else if ( obnovit!='' && title!="Чат клана" ) click(obnovit, obnovlenie, 1);
  else if ( attackTowers!='') click(attackTowers, CDT, 0);
}

function test_location()
{
	if ((title.match(/Каракорум, столица Юга|Мидгард, столица Севера|Курган|Лагерь викингов|Лагерь орды/i)||
		title.match(/Дельта реки|Левый берег|Правый берег|Устье реки/i)||
		title.match(/Ледник|Верхний перевал|Ледяные пещеры|Нижний перевал|Каменные пещеры|Горное озеро/i)||
		title.match(/Северная пустошь|Северо-западная пустошь|Северо-восточная пустошь|Западная пустошь|Перекрёсток|Восточная пустошь|Юго-западная пустошь|Юго-восточная пустошь|Южная пустошь/i)||
		title.match(/Розенгард|Западный Розенгард|Железный рудник|Восточный Розенгард|Большой курган|Западный Мароканд|Медные копи|Восточный Мароканд|Мароканд/i)||
		(title.match(/Мертвый город, Юг|Юго-восточная окраина|Храм земли|Храм огня|Храм неба|Юго-западная окраина|Площадь рассвета|Площадь восстания|Площадь заката|Северо-восточная окраина|Храм воды|Северо-западная окраина|Мертвый город, Север/i))||
		(title.match(/Земли титанов, Север|Северо-западные горы|Северо-восточные горы|Западные врата|Крепость титанов|Восточные врата|Юго-западные горы|Юго-восточные горы|Земли титанов, Юг/))||
	    title.match(/Долина Сражений, Север|Северо западный Форт|Северо восточный Форт|Западный Курган|Поле вечной битвы|Восточный Курган|Юго западный Форт|Юго восточный Форт|Долина Сражений, Юг/i)) && !InEvents && !Boss)
	{	
		SetDrinkHPlvl=SetButtle[0];
		InTowers=true;
	}
	else if ((title.match(/Арена/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[2];
	    InEvents=true;	
		SetAttackTower=0;
		ReadMessage=false;
	}
	else if ((title.match(/Выживание/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[3];
		InEvents=true;		    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/Территория/i)) && !InTowers && !Boss)
	{
		InEvents=true;			
		SetDrinkHPlvl=SetButtle[6];
	    SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/\d\/(\d+) финала|Турнир героев|Командный турнир|Отборочный тур|Финал|Передышка/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[5];
		InEvents=true;	    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/Логово Геррода/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[7];
	    InEvents=true;
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((vzamok=='' && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[8];
		InEvents=true;	   
	    SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/Битва героев/i)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[11];
		InEvents=true;	    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if (title.match(/Цари Горы/i))
	{
		SetDrinkHPlvl=SetButtle[10];
		InEvents=true;	    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/Поля сражений|Обелиск Силы|Западные Врата севера|Центральные Врата севера|Восточные Врата севера|Северо-Западный Склон|Северный Перевал|Северо-Восточный Утес|Юго-Западный Склон|Южное Плато|Юго-Восточный Утес|Западные Врата юга|Центральные Врата юга|Восточные Врата юга|Южная Крепость|Северная Крепость|Левые Врата севера|Правые Врата севера|Левый Склон|Правый Утес|Левобережный Лес|Правобережная Бухта|Левые Врата юга|Правые Врата юга|Южный Порт/i) && !title.match(/Восточные врата|Западные врата/)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[9];
		InEvents=true;	    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	else if ((title.match(/Врата|Стены|Храм|Площадь|Мифриловый Зал|Город (Д|д)ревних/) && !title.match(/Площадь рассвета|Площадь восстания|Площадь заката|Храм земли|Храм огня|Храм неба|Храм воды|Западные врата|Восточные врата|Храм Немезиды/)) && !InTowers && !Boss)
	{
		SetDrinkHPlvl=SetButtle[4];
		InEvents=true;	    
		SetAttackTower=0;
		ReadMessage=false;	
	}
	if ((title.match(/Пещера дракона|Пещерный стражник|Грот Гарпий|Пещера мантикоры|Лабиринт минотавра|Легендарный дракон|Мифический дракон|Долина Великанов|Каменный тролль|Храм Немезиды|Обитель Зодиака|Потерянный Легион|Святилище предков|Дракон (\d+) ур/i) && !title.match(/Пещеры и драконы|Голова дракона|Пещеры Мантикор|Ущелье Драконов/)) && !InTowers && !InEvents)
	{
		Boss=true;
		healEnd=false;
		ReadMessage=false;
		SetDrinkHPlvl=SetButtle[1];
		setUvorot=false;
		setEnergChitHP = uroven_HP;
	}
	if (title.match(/Пустая пещера|Пустой грот|Пустая долина|Пустой храм|Пустая Обитель Зодиака|Кладбище легиона/i))
	{
		InEvents=true;
		err_d=true;
	}

	if (kritHP < 201) krithp =life*kritHP/100;
       else krithp = kritHP;
	if (SetDrinkHPlvl < 201) SetDrinkHP =life*SetDrinkHPlvl/100;
		else SetDrinkHP = SetDrinkHPlvl;
	if (SetUmenia[0] < 201) setUvorotHP =life*SetUmenia[0]/100;
		else setUvorotHP = SetUmenia[0];
	if (SetUmenia[2] < 201) setKamShitHP =life*SetUmenia[2]/100;
		else setKamShitHP = SetUmenia[2];
	if (SetUmenia[3] < 201) setOtrShitHP =life*SetUmenia[3]/100;
		else setOtrShitHP = SetUmenia[3];
	if (SetUmenia[4] < 201) setobmanSHP =life*SetUmenia[4]/100;
		else setobmanSHP = SetUmenia[4];
	if (SetUmenia[1] < 201) setEnergChitHP =life*SetUmenia[1]/100;
		else setEnergChitHP = SetUmenia[1];
}

function user_check()
{
    if (!InEvents && !Boss)
    {
	if ( title.match('Мой герой')) 
	{
		mark[13]=comp_time+rNum(600, 1200);

		if  ( captcha==''){
			sessionStorage.missed=0;
			sessionStorage.removeItem('ATT');
		}
		if ( captcha!='' && vboy=='' ){
			sessionStorage.ATT=1; 
			click(captcha, timeout);
		}
		if ( captcha!='' ){
			sessionStorage.ATT=1; 
			click(captcha, timeout);
		}
	}
	else if ( title.match('Варвары') && user!='' && sessionStorage.ATT==1 ) click(user, timeout);
	
	if ( (Number(sessionStorage.missed)>Setpromax || mark[13]==0) && !title.match(/Мой герой|А ты тут?|защита от ботов|Защита от роботов/i) && user!='' ) click(user, timeout);

	if ( SetUstalost && title.match(/Мой герой|Усталость/i) ) {
			if (ustalost!='' && mark[12]!=1 && title.match('Мой герой') && mark[20]==0 ) click(ustalost, timeout);
			if (snyatustalost!='' && title.match(/Усталость/i)) {mark[20]=comp_time+rNum(300, 1000); click(snyatustalost, timeout);}
		}
	}
} 

function errors_()
{
    if (resurection!='') {
		if (time_res<obnovlenie) click(resurection, time_res+spt);
		else click(resurection, obnovlenie);}

	else if ( zabratnagradu!='' ) click(zabratnagradu, spt, 1);
	else if ( skrit!='' && scrivat ) click(skrit, spt, 1);
	else if ( otklonit!='' && otklonyat ) click(otklonit, spt, 1);

if (title.match(/502 Bad Gateway|Ошибка|500 Internal Server Error/) && /barbars|варвары|46.4.4.56|spaces|mail|mr.barbars|od.barbars/.test(location.host)) 
{if (user!='') click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout);else click('javascript:history.go(-1)', 1000);}
else if (title.match('Слишком быстро') && rus_t.match(/Вы попытались загрузить более/i)) {if (nazad!='') click(nazad, timeout); else click('javascript:history.go(-1)', 1000);}

if (sessionStorage.user==undefined ) click(user, timeout);
    
	if 	(title.match(/Территория/i) && rus_t.match(/Финальная битва начнется через/i))
	{
		sessionStorage.crazy=0;
		if  (ally_name!= '' &&  (rus_t.match('Владелец: ' + en_ru(replace_(ally_name))) || rus_t.match('Сильнейшие претенденты: ' + en_ru(replace_(ally_name))))) {sessionStorage.dobivatTerr=0;}
		else {sessionStorage.removeItem('territory'); click(naGlavnuy, timeout);}
	}
	if (rus_t.match(/Вы бились храбро, но погибли/) && title.match(/Цари Горы/i)) click(naGlavnuy, timeout); 
	if (rus_t.match(/Вы бились храбро, но погибли|Битва началась, Логово закрыто/i) && title.match("Логово Геррода")) {click(naGlavnuy, timeout); sessionStorage.removeItem("goToBoss");}
	for (var i=0;i<document.getElementsByClassName('feedbackPanelERROR').length;i++)
	{
		var feedback=en_ru(replace_(document.getElementsByClassName('feedbackPanelERROR')[i].textContent));
		if (feedback.match('У Вас не хватает денег')) mark[11]=comp_time+rNum(1000, 5000);
		if (feedback.match('У Вас не хватает железа')) mark[12]=comp_time+rNum(1000, 5000);
		if (feedback.match('В сундуке нет места')) mark[8]=1;
		if (feedback.match(/Сюда можно только с|Для входа необходим/i)) {click(user, timeout); mark[5]=1}
		if (feedback.match('Переодеваться в бою нельзя') && vboy!='') click(vboy, timeout, 1) ;
	}
	for (var i=0;i<document.getElementsByClassName('notify').length;i++)
	{
		var notify=en_ru(replace_(document.getElementsByClassName('notify')[i].textContent));
		if (title.match('Поля сражений') && attack1=='' && notify.match('Бои на полях сражений доступны') ) {mark[4]=1; click(naGlavnuy, timeout);}
		if (title.match('Арена') && attack1=='' && notify.match('Бои на арене доступны') ) {mark[6]=1; click(naGlavnuy, timeout);}
	}
	for (var i=0;i<document.getElementsByClassName('info').length;i++)
	{
		var inf=en_ru(replace_(document.getElementsByClassName('info')[i].textContent));
		if ( inf.match('Твой уровень стал слишком высок для этой Башни')){
			sessionStorage.removeItem('user');
			if (KSUM!='') click(KSUM, timeout);
			else click(naGlavnuy, timeout);
		}
	}
	for (var i=0;i<document.getElementsByClassName('major').length;i++)
	{
		major=en_ru(replace_(document.getElementsByClassName('major')[i].textContent));
		if ( major.match(/Стены замка разрушены|входа в замок больше нет/i) && attack1=='' && heal=='') click(naGlavnuy, timeout);
	}
    if (title.match(/Битва героев|турнир/i) && attack1=='' && rus_t.match(/Для участия в (турнире|Битве героев) (необходимо получить|требуется Алтарь)/i) || rus_t.match(/Вы заходили в битву и не сражались на полях 3 или более раз/i)) {mark[9]=1; click(naGlavnuy, timeout);}
	
	if (InEvents && attack1=='' && heal=='' && rus_t.match(/Ваш герой погиб, ждите окончания боя|Битва началась, Вы не успели/i) && (!title.match(/Арена|Выживание/i))) click(naGlavnuy, timeout);
	if (InEvents && attack1=='' && heal=='' && title.match(/Территория/i) && rus_t.match(/Финальная битва!/i)) {click(naGlavnuy, timeout); sessionStorage.removeItem('territory')};
	if ( InEvents && rus_t.match(/через (\d+):(\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через (\d+):(\d+):(\d+)/.exec(rus_t);
	    if (InEvents && attack1=='' && heal=='' && rus_t.match(/Битва завершилась!/i) && title.match(/Территория|Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && (Number(vremya_bitvi[1])>0 || Number(vremya_bitvi[2])>15)) click(naGlavnuy, timeout);}
	if ( InEvents && rus_t.match(/через: (\d+):(\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через: (\d+):(\d+):(\d+)/.exec(rus_t);
	if (InEvents && attack1=='' && heal=='' && title.match(/Город Древних/i) && (Number(vremya_bitvi[1])>0 || Number(vremya_bitvi[2])>6)) click(naGlavnuy, timeout);}
	if (InEvents && attack1=='' && heal=='' && rus_t.match(/Битва завершилась!/i) && !title.match(/Арена|Выживание|Территория|Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i)) click(naGlavnuy, timeout);
	if ( InEvents && rus_t.match(/через (\d+):(\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через (\d+):(\d+):(\d+)/.exec(rus_t);
		if ( vremya_bitvi[1]==0 && vremya_bitvi[2]==0 && obnovlenie>(vremya_bitvi[3]*1000) && obnovit!='') obnovlenie=(vremya_bitvi[3]*1000)+spt;

	if ( ( ( Number(vremya_bitvi[1])!=0 || Number(vremya_bitvi[2])>6 ) && vremya_bitvi[3]<=55) && (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && life!=0  && !document.body.textContent.match(/Вы получили/) && sessionStorage.buff<8) ) {obnovlenie=(15000)+spt; sessionStorage.buff++}
	else if ( ( Number(vremya_bitvi[1])!=0 || (Number(vremya_bitvi[2])>5 && vremya_bitvi[2]<59)) && vremya_bitvi[3]<=55) {{console.log(title+' [55]'); click(naGlavnuy, timeout);} sessionStorage.buff=0; sessionStorage.removeItem('territory'); sessionStorage.removeItem('dobzamki');}
	}
	else if ( InEvents && rus_t.match(/через: (\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через: (\d+):(\d+)/.exec(rus_t);
		if ( vremya_bitvi[1]==0 && obnovlenie>(vremya_bitvi[2]*1000) && obnovit!='') obnovlenie=(vremya_bitvi[2]*1000)+spt;
	}
	else if ( InEvents && rus_t.match(/через (\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через (\d+):(\d+)/.exec(rus_t);
		if ( vremya_bitvi[1]==0 && obnovlenie>(vremya_bitvi[2]*1000) && obnovit!='') obnovlenie=(vremya_bitvi[2]*1000)+spt;
	}
	if ( InEvents && rus_t.match(/через (\d+) сек/) ) {
		var cherez=(/через (\d+) сек/.exec(rus_t))[1];
		if (obnovlenie>(cherez*1000)) obnovlenie=(cherez*1000)+spt;
		mark[25]=0;
	   naGlavnuy='';	
	}
	if ( title.match("Вход закрыт") && location.href.match("arena")  && rus_t.match(/Ваш герой сбежал с поля боя/i) ) {mark[21]=comp_time+1800;}
	if ( title.match("Вход закрыт") && location.href.match("survival")  && rus_t.match(/Ваш герой сбежал с поля боя/i) ) {mark[28]=comp_time+1800;}
    
	if (rus_t.match(/Кровавое безумие/i) && obnovit=="") sessionStorage.crazy=1;
    if  (title.match('Варвары') || rus_t.match(/Финальная битва началась! Да победит сильнейший!/i) || noviuBoy!="" || vstatVochered!="" || pokinut!="" ) sessionStorage.removeItem('crazy');
    
	else if (InEvents && attack1=='' && heal=='' && rus_t.match(/Ваш герой погиб и выбывает из турнира|Ваша команда погибла и выбывает из турнира|Турнир завершился|Турнир уже начался, Вы не успели или не попали в состав Вашей команды/i)) click(naGlavnuy, timeout);
	
	if( title.match(/Каменный тролль|Дракон (\d+) ур/i) && rus_t.match(/(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/)) {
	var trollpanel=/(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/.exec(rus_t);
	var trollManna=Number(trollpanel[2]);
    var trollMin=Number(trollpanel[5]);
	var trollSek=Number(trollpanel[6]);    
		if (title.match(/Каменный тролль/i) && u_class=="воин" && trollManna>50 && trollMin<01) {berserk=''; kritomania='';} 
	    if (title.match(/Каменный тролль/i) && trollMin<01 && trollSek<15) kamShit='';
		if (trollManna>Shield) mark[32]=1;
		else if (trollManna<Shield) mark[32]=0;
    }
	else mark[32]=0;

	if (title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) && rus_t.match(/\d+% \d+% \d+:\d+/i)){
	var castleword='';
	zam_bron=rus_t.match(/\d+% \d+% \d+:\d+/i);
	zam_bron=zam_bron.toString();
	castleword=zam_bron.split(' ');
	zam_shit=parseInt(castleword[1]);
	if (zam_shit>19) sessionStorage.dobzamki=0;
	else sessionStorage.dobzamki=1;
}	
	
	if (rus_t.match(/(\d+)% ?(\d+)% ?(\d+) ?(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/)) {
	var legopanel=/(\d+)% ?(\d+)% ?(\d+) ?(\d+)% ?(\d+)% ?(\d+) ?(\d+) ?(\d+):(\d+)/.exec(rus_t);
	var legoManna=Number(legopanel[2]); 
	var legoNum=Number(legopanel[3]);   
	if (legoManna>10) mark[33]=1;
	else if (legoManna<=10) mark[33]=0;
    }
	else mark[33]=0;
}

function return_()
{
	if (openbag!='' && !title.match("Моё снаряжение") && !InTowers && !InEvents && !Boss) click(openbag, timeout);
	if (!action) 
	{
		mark[7]=0;
		mark[8]=0;

		if (vboy!='') click(vboy, spt, 1);
		else if ( InEvents || Boss ) click(location.href, 5000);
		else if ( (!InEvents && !Boss && naGlavnuy!='') || err_d) click(naGlavnuy, timeout);
		else click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', 2000);
	}
}


function DND_()
{
	var CDT=CDTBoss;
	var CDTR=rNum(1000, 1000);
	var rand=rNum(4) ;
if ( attackDobivat!='' || attack_soul!='') {} 
else if ( healYourself!='' || ( heal_target!='' && ( sessionStorage.dheal==1 || mark[32]==1)) || ( heal!='' && ( destroyManaBoss=='' || sessionStorage.dheal==0 || sessionStorage.dheal==undefined || (sessionStorage.dheal==2 && rand<3 && !nekogo_lechit ) ) ) )  CDT=CDTBossH;

  if (sessionStorage.perehod==1) CDT=rNum(300, 1000);
  if ( vstatVochered!='' ) click(vstatVochered, timeout, 1);
  else if ( vstupit!='' ) click(vstupit, timeout, 1);
  else if ( obnovit!='' && title.match("Чат клана") && sessionStorage.goToChat==1 ) click(obnovit, CDTStop, 1);
  else if ( obnovit!='' && title!="Чат клана" ) click(obnovit, obnovlenie, 1);
  else if ( SetDrinkHPlvl>0 && buttle!='' && (t_but<(CDT-300)) && (Number(SetDrinkHP)>=uroven_HP) ) click(buttle, t_but+spt, 0);
  else if ( buttleTZ[1]==1 && lowenergy && (Number(uroven_MP)<50) && buttle!='') click(buttle, t_but+spt, 0);
  else if ((( sessionStorage.atk==0 && lego_lego == '') || ( sessionStorage.atk==1 && lego_anton == '') || ( sessionStorage.atk==2 && lego_mark == '' ) || ( sessionStorage.atk==3 && lego_legat == '') || ( sessionStorage.atk==4 && mark[33]==1 && lego_lego == '') || ( sessionStorage.atk==4 && mark[33]==0 && lego_legat == '')) && title.match(/Потерянный Легион/i) && attack1 != '') click(attack1, CDTR, 0);
  else if ( attack_soul!='' && (attackDobivat=='' || sessionStorage.atk==1 && zod_soul=='')) click(attack_soul, CDTR, 0);
  else if ( berserk!='' && ( heal=='' || sessionStorage.dheal==0 || sessionStorage.dheal==1 || (sessionStorage.dheal==2 && (rand>=3 || nekogo_lechit) )) && (t_bers<(CDT-200))) click(berserk, CDT, 0);
  else if ( kritomania!='' && (t_krit<(CDT-200))) click(kritomania, CDT, 0);
  else if ( metka!='' && (t_metk<(CDT-200))) click(metka, CDT, 0);
  else if ( kamShit!='' && (t_kam<(CDT-200)) && ((title.match("Храм Немезиды") && ((Number(HP_C)+Number(HP_G)+Number(HP_N))<(nemkam) || (Number(HP_C)+Number(HP_G)+Number(HP_N))>(50)) ) || !title.match("Храм Немезиды")) ) click(kamShit, CDT, 0);
  else if ( sessionStorage.atk==1 && zod_soul!='')  click(zod_soul, CDT, 0);
  else if ( healYourself!='') click(healYourself, CDT);
  else if ( heal_target!='' && sessionStorage.dheal==1) click(heal_target, CDT);
  else if ( destroyManaBoss!='' && mark[32]==1 && sessionStorage.dheal==2 ) click(destroyManaBoss, CDT, 0);
  else if ( heal!='' && ( destroyManaBoss=='' || sessionStorage.dheal==0 || sessionStorage.dheal==undefined || (sessionStorage.dheal==2 && mark[32]!=1 ) ) ) click(heal, CDT, 0);
  else if ( destroyManaBoss!='' ) {
	if (berserk!='' && (t_bers<(CDT-200))) click(berserk, CDT, 0);	
	else click(destroyManaBoss, CDT, 0);	
  }
  else if ( ozomena!='' ) click(ozomena, CDT, 0);
  else if ( aello!='' ) click(aello, CDT, 0);
  else if ( attackDobivat!='' ) click(attackDobivat, CDT, 0);
  else if ( attack_strazh!='') click(attack_strazh, CDT, 0);
  else if ( manticora!='') click(manticora, CDT, 0);
  else if ( minotavr!='') click(minotavr, CDT, 0);
  else if ( attack_drakon!='') click(attack_drakon, CDT, 0);
  else if ( sessionStorage.atk==4 && mark[33]==1 && lego_lego!='') click(lego_lego, CDT, 0);
  else if ( sessionStorage.atk==4 && mark[33]==0 && lego_legat!='') click(lego_legat, CDT, 0);
  else if ( sessionStorage.atk==0 && lego_lego!='')   click(lego_lego, CDT, 0);
  else if ( sessionStorage.atk==1 && lego_anton!='')  click(lego_anton, CDT, 0);
  else if ( sessionStorage.atk==2 && lego_mark!='')   click(lego_mark, CDT, 0);
  else if ( sessionStorage.atk==3 && lego_legat!='')  click(lego_legat, CDT, 0);  
  else if ( Yapiter!='' && (sessionStorage.atk==1 || Epiter=='')) click(Yapiter, CDT, 0);
  else if ( Epiter!=''  && (sessionStorage.atk==2 || Yapiter=='')) click(Epiter, CDT, 0);
  else if ( Yapiter!='' && ( Number(HP_Ya)>Number(HPZver[0]) || Epiter=='' )) click(Yapiter, CDT, 0);
  else if ( Epiter!='' ) click(Epiter, CDT, 0);
  else if ( attack_troll!='') click(attack_troll, CDT, 0);
  else if ( attack_bers!='') click(attack_bers, CDT, 0);
  else if ( sessionStorage.atk==3 && Nemezida!='') click(Nemezida, CDT, 0);
  else if ( sessionStorage.atk==1 && Garm!='' ) click(Garm, CDT, 0);
  else if ( sessionStorage.atk==2 && Cerber!='') click(Cerber, CDT, 0);
  else if ( sessionStorage.atk==0 && Cerber!=''  && Number(HP_C)> Number(HP_N) && Number(HP_C)>=Number(HP_G) ) click(Cerber, CDT, 0);
  else if ( sessionStorage.atk==0 && Garm!=''    && Number(HP_G)> Number(HP_N) && Number(HP_G)>=Number(HP_C) ) click(Garm, CDT, 0);
  else if ( sessionStorage.atk==0 && Nemezida!=''&& Number(HP_N)>=Number(HP_G) && Number(HP_N)>=Number(HP_C) ) click(Nemezida, CDT, 0);
  else if ( Garm!=''     && Number(HP_G)>HPZver[1] ) click(Garm, CDT, 0);
  else if ( Cerber!=''   && Number(HP_C)>HPZver[2] ) click(Cerber, CDT, 0);
  else if ( Nemezida!='' && Number(HP_N)>HPZver[3] ) click(Nemezida, CDT, 0);
  else if ( Garm!=''     && Number(HP_G)> Number(HP_N) && Number(HP_G)>=Number(HP_C) ) click(Garm, CDT, 0);
  else if ( Cerber!=''   && Number(HP_C)> Number(HP_N) && Number(HP_C)>=Number(HP_G) ) click(Cerber, CDT, 0);
  else if ( Nemezida!='' && Number(HP_N)>=Number(HP_G) && Number(HP_N)>=Number(HP_C) ) click(Nemezida, CDT, 0);
  else if ( Garm!='') click(Garm, CDT, 0);
  else if ( Cerber!='') click(Cerber, CDT, 0);
  else if ( Nemezida!='') click(Nemezida, CDT, 0);
  else if ( zodiak!='') click(zodiak, CDT, 0);
  else if ( attackDobivat!='') click(attackDobivat, CDT, 0);
  else if ( attack_soul!='') click(attack_soul, CDT, 0);
  else if (attack!='') click(attack, CDT, 0);
  else if ( attack1!='') click(attack1, CDT, 0);
  else if ( healSoyznika!='')  click(healSoyznika, CDT, 0);
}



function autologin_() {

	if (title.match('Варвары') && vhod!='') click(vhod, timeout);
    if (location.href.match(location.host+'/authorization'))
		click(vhod, timeout);
	if (location.href.match(location.host+'/login')) {
	document.all.login.value = Username;
	document.all.password.value = Password;
	action=true; setTimeout(function(){document.forms[0].submit()}, obnovlenie);
	}
}



function obrabotka_otveta(response) {
    
	if (response.match(/error/i)) {
		if (response.match(/ERROR_ZERO_BALANCE/i)) alert('Недастаточно средств на балансе ANTIGATE');
		document.all.code.value = '';
		setTimeout(function(){location.href=location.href}, timeout);
	} else {
		document.all.code.value = response.toLowerCase();
		action=true; 
		setTimeout(function(){document.forms[0].submit()}, obnovlenie);
	}
}

function send_message()
{
	if (title.match('Почта для') && mark[11]!=1 && !action)
	{
		if (rus_t.match(/Эту клановую вещь можно отправить только|Трофей можно передавать только внутри клана/i)) mark[23]++;
		var sel_num=0;
		var otmena='';
		if (veshi!='') click(veshi, timeout);
		else 		
		for (var i=0;i<a.length;i++)
    		{
			if (a[i].text.match("выбрать")) {
				sel_num++;
				if (mark[23]<sel_num) {
				click(a[i], timeout); break}
			}
			if (a[i].text.match("отменить")) otmena=a[i];
		}
		if (!action) 
		{
			if (otmena!='') { action=true; setTimeout(function(){document.forms[0].submit()}, timeout); }
			else {click (location.href, 60000); action=true}
		}
	}
	else mark[23]=0;
}

function mpage(val) {
	var div_i=document.createElement("div");
	div_i.innerHTML+="<div class='small minor'>"+val+"</div>";
	document.body.appendChild(div_i);
}

function warlord(){
	var span_k=document.createElement("span");
	span_k.innerHTML+='<span>'+info_span+'</span>';
	if (document.body.getElementsByTagName('td')[0]!=undefined) document.body.getElementsByTagName('td')[0].appendChild(span_k);
	else document.body.appendChild(span_k);
}


function gett(val, t) {
	var sek=Number(val) - comp_time;
	var hr=Math.floor(sek/3600);
	var mnt=Math.floor((sek-hr*3600)/60);
	var scnd=Math.floor(sek-(hr*3600+mnt*60));
	if (hr<10)  hr='0'+hr;
	if (mnt<10) mnt='0'+mnt;
	if (scnd<10) scnd='0'+scnd;
	if (t==1) return hr; else if (t==2) return mnt; else if (t==3) return scnd; else if (t==4) return sek
}

function addInfo_()
{
info+='<div style="background:#9A76F5;height:1px;width:100%;padding:0;margin:6px 0;"></div>';
var div_b='';

if (title.match(/Территория/i) && u_class=="воин")
{
	if (sessionStorage.dobivatTerr==undefined) sessionStorage.dobivatTerr=0;
	if (sessionStorage.dobivatTerr==0) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью медов "></input>';
	if (sessionStorage.dobivatTerr==1) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью синих медов "></input>';
	if (sessionStorage.dobivatTerr==2) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью южных медов "></input>';
	if (sessionStorage.dobivatTerr==3) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью синих воинов "></input>';
	if (sessionStorage.dobivatTerr==4) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью южных воинов "></input>';
    if (sessionStorage.dobivatTerr==5) div_b='  <input id="t_button" button style="background-color:yellow" type="submit" value=" Бью всех "></input>';
}
else sessionStorage.removeItem('dobivatTerr');

if (title.match(/Каменный тролль|Дракон (\d+) ур/i) && u_class=="медик")
{
	if (sessionStorage.dheal==undefined) sessionStorage.dheal=medtrol;
	if (sessionStorage.dheal==0) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу "></input>';
	if (sessionStorage.dheal==1) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Жгу "></input>';
	if (sessionStorage.dheal==2) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу и жгу "></input>';
}
else if (title.match(/Святилище предков/i) && u_class=="медик")
{
	if (sessionStorage.dheal==undefined) sessionStorage.dheal=medpred;
	if (sessionStorage.dheal==0) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу "></input>';
	if (sessionStorage.dheal==1) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Жгу "></input>';
	if (sessionStorage.dheal==2) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу и жгу "></input>';
}
else if (title.match(/Долина Великанов/i) && u_class=="медик")
	{
	if (sessionStorage.dheal==undefined || sessionStorage.dheal>1) sessionStorage.dheal=medvel;
	if (sessionStorage.dheal==0) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу союзников "></input>';
	if (sessionStorage.dheal==1) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу цель "></input>';
}	
else sessionStorage.removeItem('dheal');

if (title.match(/Долина Великанов/i) && u_class=="воин") {
	if (sessionStorage.atk==undefined) sessionStorage.atk=varvel;
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Яп->Эп "></input>';
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Япитера "></input>';
	if (sessionStorage.atk==2) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Эпитера "></input>';
}
else if (title.match(/Храм Немезиды/i) && u_class=="воин")
{
	if (sessionStorage.atk==undefined) sessionStorage.atk=varnema;
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" ХП+ "></input>';
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Гарма "></input>';
	if (sessionStorage.atk==2) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Цербера "></input>';
	if (sessionStorage.atk==3) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Немезиду "></input>';
	if (sessionStorage.atk==4) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Гарм->Ц+Н "></input>';
}
else if (title.match(/Обитель Зодиака/i) && u_class=="воин")
{
	if (sessionStorage.atk==undefined) sessionStorage.atk=varzod;
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Обычный режим "></input>';
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Мало букв "></input>';
}
else if (title.match(/Потерянный Легион/i) && u_class=="воин")
{
	if (sessionStorage.atk==undefined) sessionStorage.atk=varleg;
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Легионов "></input>';
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Антония "></input>';
	if (sessionStorage.atk==2) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Марка "></input>';
	if (sessionStorage.atk==3) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Легата "></input>';
	if (sessionStorage.atk==4) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Легионеры > Легат "></input>';
}
else sessionStorage.removeItem('atk');

    if (localStorage.on_off=="on") info_span+='<span> <input id="button" button style="background-color:#53da3f" type="submit" value=" СТОП " >' +div_b+ '</input> </span>';
	else if (sessionStorage.prow==1||sessionStorage.prow==undefined) info_span+='<span> <input id="button" button style="background-color:red" type="submit" value=" СТАРТ ">' +div_b+ '</input> </span>';

    if (localStorage.on_off=="on")
    {
	if (trayStatus!='') info+='<div><img src=\"http://static.barbars.ru/images/icons/clock.png\"><span style="color:#FFDF8C"> Ожидание</span> <span style="color:#53da3f">[<span id="timer" style="color:#00ccff">'+(trayStatus/1000).toFixed(1)+'</span>]</span></div>';
	if (bonus[8]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/bluestar.png\"><span style="color:#FFDF8C"> Алтарь</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(bonus[8], 1)+':'+gett(bonus[8], 2)+':'+gett(bonus[8], 3)+'</span>]</span></div>';
	else info+='<div><img src=\"http://static.barbars.ru/images/icons/guild_south.png\"><span style="color:#FFDF8C"> Алтарь</span> <span style="color:#53da3f">[<span style="color:#00ccff">не активен</span>]</span></div>';
	info+='<div class="hr"></div>';
	if (curgamesarena!='') info+='<div><img src=\"http://static.barbars.ru/images/icons/red_warrior.png\"><span style="color:#FFDF8C"> Игры на арене</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+curgamesarena+'</span>]</span></div>';
	if (mark[21]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/clock.png\"><span style="color:#FFDF8C"> Возврат на арену</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(mark[21], 1)+':'+gett(mark[21], 2)+':'+gett(mark[21], 3)+'</span>]</span></div>';
	if (curgamessurvival!='') info+='<div><img src=\"http://static.barbars.ru/images/icons/red_warrior.png\"><span style="color:#FFDF8C"> Игры на выживание</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+curgamessurvival+'</span>]</span></div>';
	if (mark[28]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/clock.png\"><span style="color:#FFDF8C"> Возврат на выживание</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(mark[28], 1)+':'+gett(mark[28], 2)+':'+gett(mark[28], 3)+'</span>]</span></div>';
	if ((SetCitadel[0]!=0 && cita[0]!=0) || (SetCitadel[1]!=0 && cita[1]!=0) || (SetCitadel[2]!=0 && cita[2]!=0)) {
	info+='<div class="hr"></div>';
	if (SetCitadel[0]!=0 && cita[0]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/red_castle.png\"><span style="color:#FFDF8C"> '+some_name[0]+'</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(cita[0], 1)+':'+gett(cita[0], 2)+':'+gett(cita[0], 3)+'</span>]</span></div>';
	if (SetCitadel[1]!=0 && cita[1]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/red_castle.png\"><span style="color:#FFDF8C"> '+some_name[1]+'</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(cita[1], 1)+':'+gett(cita[1], 2)+':'+gett(cita[1], 3)+'</span>]</span></div>';
	if (SetCitadel[2]!=0 && cita[2]!=0) info+='<div><img src=\"http://static.barbars.ru/images/icons/red_castle.png\"><span style="color:#FFDF8C"> '+some_name[2]+'</span> <span style="color:#53da3f">[<span style="color:#00ccff">'+gett(cita[2], 1)+':'+gett(cita[2], 2)+':'+gett(cita[2], 3)+'</span>]</span></div>';
	}
    }
    info+='<div class="hr"></div>';
	info+='<div><img src=\"http://static.barbars.ru/images/icons/arrow.png\"><span style="color:#FFDF8C"> Modified by</span> <span style="color:#53da3f">[</span><a style="text-decoration:none"; href="http://barbars.ru/user/id/102797\"><span style="color:#00ccff">мега</span></a></span> <span style="color:#00ccff">& <a style="text-decoration:none"; href="http://barbars.ru/user/id/2447148\"><span style="color:#00ccff">окси</span></a> &</span> <a style="text-decoration:none"; href="http://barbars.ru/user/id/993754\"><span style="color:#00ccff">хром</span></a><span style="color:#53da3f">]</span></div>';
	info+='<div style="background:#9A76F5;height:1px;width:100%;padding:0;margin:6px 0;"></div>';
	
	mpage(info);
	warlord();

	var t = setInterval(MyTimer, 57);

	if (document.getElementById("button")!=undefined) button.onclick= function() {
        if (localStorage.on_off=="on") {localStorage.on_off="off"; if (timeoutId!="") clearInterval(timeoutId); activ_link.style=""; button.style="background-color:red"; button.value=" СТАРТ "; } 
        else if (sessionStorage.prow==1||sessionStorage.prow==undefined) {localStorage.on_off="on"; sessionStorage.perehod=1; button.style="background-color:#53da3f"; button.value=" СТОП "; location.href=location.href;} };

	if (document.getElementById("t_button")!=undefined) t_button.onclick= function() {
		if (title.match(/Территория/i) && u_class=="воин") {
			if (sessionStorage.dobivatTerr==0) {sessionStorage.dobivatTerr=1; t_button.value=" Бью синих медов ";}
			else if (sessionStorage.dobivatTerr==1) {sessionStorage.dobivatTerr=2; t_button.value=" Бью южных медов ";}
			else if (sessionStorage.dobivatTerr==2) {sessionStorage.dobivatTerr=3; t_button.value=" Бью синих воинов ";}
			else if (sessionStorage.dobivatTerr==3) {sessionStorage.dobivatTerr=4; t_button.value=" Бью южных воинов ";}
			else if (sessionStorage.dobivatTerr==4) {sessionStorage.dobivatTerr=5; t_button.value=" Бью всех ";}
			else {sessionStorage.dobivatTerr=0; t_button.value=" Бью медов ";}
		}
	};
	if (document.getElementById("h_button")!=undefined) h_button.onclick= function() {
		if (title.match(/Долина Великанов/i)) {
			if (sessionStorage.dheal==0) {sessionStorage.dheal=1; h_button.value=" Лечу цель ";}
			else {sessionStorage.dheal=0; h_button.value=" Лечу союзников ";}
		}
		else if (title.match(/Каменный тролль|Дракон (\d+) ур/i)){
			if (sessionStorage.dheal==0) {sessionStorage.dheal=1; h_button.value=" Жгу ";}
			else if (sessionStorage.dheal==1) {sessionStorage.dheal=2; h_button.value=" Лечу и жгу ";}
			else {sessionStorage.dheal=0; h_button.value=" Лечу ";}
		}
	    else if (title.match(/Святилище предков/i)){
			if (sessionStorage.dheal==0) {sessionStorage.dheal=1; h_button.value=" Жгу ";}
			else if (sessionStorage.dheal==1) {sessionStorage.dheal=2; h_button.value=" Лечу и жгу ";}
			else {sessionStorage.dheal=0; h_button.value=" Лечу ";}
		}
	};
	if (document.getElementById("w_button")!=undefined) w_button.onclick= function() {
		if (title.match(/Храм Немезиды/i)) {
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Бью Гарма ";}
			else if (sessionStorage.atk==1) {sessionStorage.atk=2; w_button.value=" Бью Цербера ";}
			else if (sessionStorage.atk==2) {sessionStorage.atk=3; w_button.value=" Бью Немезиду ";}
			else if (sessionStorage.atk==3) {sessionStorage.atk=4; w_button.value=" Гарм->Ц+Н ";}
			else {sessionStorage.atk=0; w_button.value=" ХП+ ";}
		}
		else if (title.match(/Долина Великанов/i)){
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Бью Япитера ";}
			else if (sessionStorage.atk==1) {sessionStorage.atk=2; w_button.value=" Бью Эпитера ";}
			else {sessionStorage.atk=0; w_button.value=" Яп->Эп ";}
		}
	    else if (title.match(/Обитель Зодиака/i)){
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Мало букв  ";}
			else {sessionStorage.atk=0; w_button.value=" Обычный режим ";}
		}
	    else if (title.match(/Потерянный Легион/i)){
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Бью Антония ";}
			else if (sessionStorage.atk==1) {sessionStorage.atk=2; w_button.value=" Бью Марка ";}
			else if (sessionStorage.atk==2) {sessionStorage.atk=3; w_button.value=" Бью Легата ";}
			else if (sessionStorage.atk==3) {sessionStorage.atk=4; w_button.value=" Легионеры > Легат ";}
			else {sessionStorage.atk=0; w_button.value=" Бью Легионеров ";}
		}
	}
}

function MyTimer() {
	if (document.getElementById("timer")!=undefined){
	       	t2 = +new Date(); tmr=t1+Number(trayStatus)-t2;
		if(tmr<60) {document.getElementById("timer").innerHTML="0.0"; clearInterval(t)}
		else document.getElementById("timer").innerHTML=(tmr/1000).toFixed(1);} 
}

function goToPassive(){
	if (title.match("Магазин умений") && passive!='') click(passive, timeout);
	else if (title.match("Мои умения") && trade_ability!='') click(trade_ability, timeout);
	else if (title.match("Мой герой") && abilities!='') click(abilities, timeout);
	else if (InTowers) click(naGlavnuy, timeout);
	else click(user, timeout);
}

function abilities_()
{

if (strateg && Scrolls[13]!=0 && mark[18]!=1 && !action && !Boss && !InEvents) 
{
	if (mark[22]==1) goToAbilities_();
	if (title.match('Пассивное умение')) {
		if ( rus_t.match("Ты уже используешь все доступные умения") ) goToAbilities();
		else if ( rus_t.match(/\[купить\] цена:1 /)) click(epicBuyLink, timeout);
		else mark[18]=1;
	}
	else for (var i=0;i<=12;i++) {if (Scrolls[i]==0 && i!=8) goToPassive();}
}
	if (title.match(/Мой герой|Мои умения/i)) for (var i=0;i<=13;i++) {if (!rus_t.match(name_scrl[i]) && !/нет/.test(Scrolls[i]) ) Scrolls[i]=0;}
	sessionStorage.scrolls=Scrolls;
	if (title.match(/Мой герой/i)) for (var i=0;i<=12;i++) {if (rus_t.match(name_scrl[i]) && !/\d+/.test(Scrolls[i]) && SetScroll[i]==1 && abilities!='') {click(abilities, timeout); break;}}

	if (SetGarderob[0]==1) 
	{
		if (sessionStorage.abilities==undefined) click('/user/abilities', timeout);
		if (title.match('Мои умения'))
		{
			var r_tm=rNum(30, 120);
			for (var i=0;i<=13;i++) {
				var reg=new RegExp(name_scrl[i]+" \\[(\\d+):(\\d+):(\\d+)", "i");
				if (reg.test(rus_t)) {Scrolls[i]=getSec(reg.exec(rus_t))+comp_time+r_tm;}		
			}
			sessionStorage.scrolls=Scrolls;

			sessionStorage.abilities='';
			for (var i=5;i>0;i--) {
				if (rus_t.match("Выбрать набор "+i)) {sessionStorage.abilities=i+" ";break;}
				else sessionStorage.abilities="0 "
			}
			for (var i=1;i<=5;i++) {if (abilitiesSetLink[i]==undefined && rus_t.match('Выбрать набор '+i)) sessionStorage.abilities+=i+',';}
			if (!rus_t.match('Умения нельзя менять в бою') ) 
				for (var i=1;i<=5;i++) {if (sessionStorage.setAbil==i && abilitiesSetLink[i]!=undefined) {click(a[abilitiesSetLink[i]], timeout);}}
			else if (vboy!='') click(vboy, timeout);
			else click(user, timeout);
			sessionStorage.removeItem('setAbil');
		}
	    if (sessionStorage.abilities!=undefined){
		if (sessionStorage.abilities[0]>=sessionStorage.setAbil && title.match('Варвары') && sessionStorage.setAbil!=undefined && !action ) click('/user/abilities', timeout);

		else if (!action )
		{
		if ( sessionStorage.abilities[0]>=Abil_N[0] && InTowers && !sessionStorage.abilities.match(Abil_N[0]+',') ) {
			sessionStorage.setAbil=Abil_N[0];
			click(naGlavnuy, timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[1] && title.match(/Арена/i) && attack1=='' &&  !sessionStorage.abilities.match(Abil_N[1]+',') ) {
			sessionStorage.setAbil=Abil_N[1];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[2] && vzamok=='' && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abil_N[2]+',') && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i) ) {
			sessionStorage.setAbil=Abil_N[2];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[3] && title.match(/Турнир героев/i) && attack1=='' && !sessionStorage.abilities.match(Abil_N[3]+',') ) {
			sessionStorage.setAbil=Abil_N[3];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[4] && title.match(/Командный турнир/i) && attack1=='' && !sessionStorage.abilities.match(Abil_N[4]+',') ) {
			sessionStorage.setAbil=Abil_N[4];
			click('/user/abilities', timeout);}
		
		else if ( sessionStorage.abilities[0]>=Abil_N[5] && title.match(/Выживание/i) && attack1=='' &&  !sessionStorage.abilities.match(Abil_N[5]+',') ) {
			sessionStorage.setAbil=Abil_N[5];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[6] && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abil_N[6]+',') && title.match(/Территория/i) && rus_t.match(/Битву можно начать|Финальная битва начнется/i)) {
			sessionStorage.setAbil=Abil_N[6];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[7] && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abil_N[7]+',') && title.match(/Битва героев/i)  ) {
			sessionStorage.setAbil=Abil_N[7];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[8] && title.match(/Поля сражений/i) && attack1=='' && Abil_N[8]!=0 && !sessionStorage.abilities.match(Abil_N[8]+',') ) {
			sessionStorage.setAbil=Abil_N[8];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abil_N[9] && Boss && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abil_N[9]+',') ) {
			sessionStorage.setAbil=Abil_N[9];
			click('/user/abilities', timeout);}	
			
		else if ( sessionStorage.abilities[0]>=Abil_N[10] && title.match(/Цари Горы/i) && attack1=='' && !sessionStorage.abilities.match(Abil_N[10]+',') ) {
			sessionStorage.setAbil=Abil_N[10];
			click('/user/abilities', timeout);}		
		
		else if ( sessionStorage.abilities[0]>=Abil_N[11] && title.match(/Город Древних/i) && attack1=='' && !sessionStorage.abilities.match(Abil_N[11]+',') ) {
			sessionStorage.setAbil=Abil_N[11];
			click('/user/abilities', timeout);}
		}
		else if ( sessionStorage.abilities[0]>=Abil_N[13] && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abil_N[13]+',') && title.match(/Территория/i) && rus_t.match(/Набег начнется/i)) {
			sessionStorage.setAbil=Abil_N[13];
			click('/user/abilities', timeout);}	
	}
  }
}
   
function getSec(arr){return Number(Number(arr[1])*3600+Number(arr[2])*60+Number(arr[3]));}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined 
}

