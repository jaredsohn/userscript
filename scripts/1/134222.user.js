
﻿// ==UserScript==
// @name barbars.ru bot v10
// @namespace http://doromones.clan.su/
// @author doromones doromones@gmail.com
// @version 10
// @source http:
// @description Отличный бот, новые локи, выполнение команд с чата, и многое другое
// @include http://br.spaces.ru/*
// @include http://*barbars.ru/*
// @exclude http://*waplog.net.ru/*
// ==/UserScript==







// ==Userscript==

var autologin= false;  // использовать автологин

 var Username=""; // Ваш логин
 var Password=""; // Пароль

var SetAltar       = 0;	   // 0 - не брать; 1 - за железо; 2 - за золото; 3 - алтарь+5замков; 4 - алтарь+все замки;
var SetDrinkButtle = false  // пить бутылки в башнях | true/false
var SetDrinkHPlvl  = 37	   // уровень здоровья для использования бутылки (% от Вашего здоровья)
var setUvorotHPlvl = 1     // уровень здоровья для использования уворота (% от Вашего здоровья)
var setEnShitHPlvl = 60     // уровень здоровья для энергетического щита (% от Вашего здоровья)
var setKamShitHPlvl= 1    // уровень здоровья для использования каменного щита (% от Вашего здоровья)
var setOtrShitHPlvl= 1     // уровень здоровья для использования щита отражения (% от Вашего здоровья) 
				// если уровень здоровья для использования умения = 1, то умение используется только когда Вас бьют

var CDTAttack= rNum(4200, 5700); // кулдаун при ударах или выжигании (min, max)
var CDTHeal  = rNum(3500, 4700); // кулдаун при лечении 
var CDTBoss  = rNum(3800, 6550); // кулдаун при ударах или выжигании (на боссах )
var CDTEvent = rNum(2900, 4500); // кулдаун при ударах или выжигании (на событиях)
var CDTBossH = rNum(3000, 3500); // кулдаун при лечении (на боссах
var CDTStop  = rNum(5000, 10000) // время обновления чата при команде стоп

var resurectionTower=''; //не трогать
if (sessionStorage.ustalya!=1) resurectionTower=0; //если нет усталости то лока кача..
if (sessionStorage.ustalya==1) resurectionTower=10; // если SetUstalost=false и появилась усталость то лока кача..
// 0 - Курган; 1 - Лагерь викингов/орды; 2 - Дельта реки/устье реки; 3 - Ледник/горное озеро; 4 - Пустошь; 
			// 5 - Розенгард/марроканд; 6 - МГ; 7 - ЗТ; 8 - Долина сражений; 9 - Выживание; 10 - Арена; 11 - На главной

var ustresTower	= 2;	// при появлении усталости сменить локу кача. 0 - не сменить; 1 - Выживание; 2 - Арена	
var brb_max    = 2000; // максимальное количество народа в локе для перехода
var enemy      = 2;    // минимальное количество врагов для перехода в следующую локу
var krit_massa = 2;    // отношение количества вражеских войнов к количеству союзников для бегства c локации 
var SetPobeg      = true; // убегать на главную в башнях (true)/ простой переход в башнях при крит хп (false)
var kritHP     = 50;   // критический уровень жизней для осуществления "бегства" с локации,  (% от вашего здоровья)
			  // если стоит 0, то бегство с локации не работает 
var SetTimeReset = true;	   // менять локацию через промежуток времени | true/false
var time_ResetLocation= rNum(3, 10);  // промежуток времени в минутах, через который бот сменит локацию (min, max)
var timeout = rNum(300, 700); // время обычных действий (разбор вещей, снятие усталости, переходы и т.д.)

var SetTerritory= true;   // ходить на территории | true/false
var BattleGround= true;   // ходить на поля | true/false
var SetCari     = true;   // ходить на цари горы
var SetBattle	= true;   // ходить на битву героев
var SetLogovo	= true;  // ходить в логово
var tournament	= 0;      // 0 - не ходить на турнир ; 1 - только 1х1 ; 2 - 1х1 и 2х2 ; 3 - только 2х2

var SetdestroyMana = 1;  // 0 - только лечить, 2- только жечь, 1 - жечь энергию если некого лечить (рандомно)
var SetAttackTower = 2;  // 0 - не атаковать башни, 2 - атаковать всегда, 1 - по ситуации
var otklonyat	= true;  // отклонять приглашения в другие кланы? если не хотите отклонять, вместо true поставьте false
var scrivat	    = true;  // автоматически скрывать гильд-нотайсы, вместо true поставьте false
var ReadMessage	= false; // читать почту 
var SetRazbor   = false;  // разбирать вещи
var chinit_veshi= true;  // чинить вещи 
var chinit_vse	= 1000;	 // чинить всё, если поломка больше ...
					
var razbirat_epic=[ 1,1,1,1,1,1,1,1,1,1,1,1 ]	// какие эпические вещи бот будет разбирать (1-разбирать, 0-нет)
	// шлем, амулет, наплечник, накидка, броня, пояс, штаны, браслет, перчатки, кольца, оружие, сапоги	

var SetZamok = [ 1,1,1,1,1,1,1,1 ]     // 1 - ходить на захват, 0 - нет
var SetBonus = [ 0,0,0,0,0,0,0,0 ]     // 1 - брать баф, 0 - нет
	// замки по порядку: голова, сердце, гроза, крепость, исцеление, зеркало, источник, колыбель
	
var SetCitadel = [ 0,0,0 ]          // 1 - включать цитадели , 0 - нет .. ДОСТУПНО ТОЛЬКО ПЕРСАМ мегамэн И марена
   // цитадели по порядку: башня, статуя, академия
	
var addinfo=true //информация цитадели на странице
	
var SetAbilities=false;	 // менять умения перед событиями
var SetItem 	=false	 // менять снаряжение перед событиями
	// Башни, Арена, Замки, Турниры, Выживание, Территории, Битва героев, Поля сражений, Боссы, Логово, Цари горы
var Abilities_N = [ 1,2,2,3,2,2,2,3,1,2,2 ]  // какие наборы умений использовать
var Item_Set_N  = [ 1,2,2,2,3,2,2,1,1,2,2 ]  // какие комплекты снаряжения использовать

var vartrol  = 0    //  медам на троле: 0 - лечить, 1 - жгу, 2 - лечу и жгу
var varnema  = 3    // воинам на немке бить: 0 - ХП+ , 1 - Бить Гарма , 2 - Бить Церба, 3 - Бить Нему, 4 - Гарм-Ц+Н
var HP_Yap   = 28;  // оставить % хп Япитеру
var Set_HP_G = 0;   // оставить % хп Гарму
var Set_HP_C = 7;   // оставить % хп Церберу
var Set_HP_N = 7;   // оставить % хп Немке
var nemkam   = 7;   // включать кам щит на немезиде, когда обшая сумма ХП зверей ниже ...
var SetManticora =false;	 // ходить на мантикору	
var SetIronDragon=false;  // ходить на лег драка

var Set_chat = true ;			// выполнять спец. команды
var Setdrak  = "дракон";  // спец. команда на драка 
var Setvel   = "велы";  // спец. команда на велов
var Settrol  = "тролль"; // спец. команда на троля
var Setnema  = "нема";  // спец. команда на нему
var Setzod   = "зодиак";   // спец. команда на зода
var Setpred  = "святилище";		// спец. команда на святилище предков
var SetExit  = "выход"      // спец. команды на выход из пещеры
var Setstop  = "стоп";         // спец. команда на стоп
var Setbash  = "старт";        // спец. команда на старт
var Setvzam  = "замки";   // спец. команда в замки
var SetSbros = "сброс" // сброс территорий

var SetUstalost	= false	  // снимать усталость true/false
var SetTireMaxt = "23:59" // не снимать усталость после "час:минуты" по серверу
var SetTireMint = "00:00" // не снимать усталость до "час:минуты" по серверу
var unravel     = true;	  // true - разгадывать капчу, false - нет (картинки в опере должны быть включены)
var ATTsound    = false;  // мелодия при появлении АТТ | true/false
var sound = new Audio; 
sound.src= "file:///C:/attsound.wav";	// путь к мелодии при АТТ в формате WAV ! (играет если unravel=false)

var send_to    = ""   // id персонажа, на которого отправлять вещи если рюкзак и сундук полные (если "", то не отправляет)
var Setlvlshmot= 1;  // уровень шмоток, которые бот будет одевать. 6-миф и ниже, 5- лег. и ниже, 4... 
var SetboxOpen = 4;  // уровень открываевых ящиков 6-миф и ниже, 5- лег. и ниже, 4... 0 - не открывать ящики	
var SetdropSt  = 4;  // уровень выбрасываемых камней 6-миф и ниже, 5- лег. и ниже, 4... 0 - не выбрасывать камни

	// подарок,медитация,секрет,рефлекс,ярость,лед,жажда,адрен,опустошение,критон,дыхание,гнев,стойкость	
var dropScroll = [1,0,1,1,1,1,1,1,0,1,1,1,1]	// какие свитки бот будет выбрасывать при разборе вещей. 1-выбрасывать
var SetScroll  = [0,0,0,0,0,0,0,0,0,0,0,0,0]	// 1-использовать, 0 - нет
var SetUse4hr  = true				// true - активировать свитки на 4 часа, false - активировать полностью
var SetdropSv  = 4; 				// уровень выбрасываемых свитков 6-миф и ниже, 5- лег. и ниже, 4... 

var SetSvmin = 1;    // минимальный уровень используемых свитков. 1 - коричневые и выше, 2 - зелень и выше
var SetSvmax = 4;    // максимальнй уровень используемых свитков. 6 - миф и ниже, 5 - лег. и ниже, 4... 
var strateg  = false; // покупать пассивки за очки полей (Если есть Стратегический ум)

                        // черный список ( те, кого не бьем в башнях)
var SetBlack = 0;      // Как использовать ЧС | 1-не добиваем в башнях, 2-добиваем в событиях, 3-не добиваем в башнях и добиваем в событиях, 0-отключен чс
                       // черный список
var black_list= ""

var SetWhite = 1;      // Как использовать БС | 1-добиваем в башнях, 2-не добиваем в событиях, 3-добиваем в башнях и не добиваем в событиях, 0-отключен бс
                       // белый список
var white_list= "ghost dragon, itochy, slot, шилик, mega black, передозик, грустный волк, сабзиро, местный фраер, warlokc, trusov, black vs wolf, мед лечитель, сер макарон, ледяной доктор, kryl, наташа ч, серый, лисёнок сабзиро, карлеоне, bultazavr, цири, азулон, nemiroff, viiruss, викинг атила, тихая нежность, капризуля "
//////////////// НАСТРОЙКА ЗАКОНЧЕНА /////////////////////////

try{

var spt=rNum(500, 1300)	
var obnovlenie=rNum(3000, 7000)

var user_id='';
var lvl='';
var u_class=''
var storona=true;
var strong='';
var life=''
var prem=false
var t1=0,t2=0;
var info=''
var i_test='265'

  var bad_target=false
  var good_target=false
  var damage=false
  var target=false
  var notarget=false
  var nekogo_lechit=false;
  var smeshka=false;
  var pronik=false;
  var InEvents=false;
  var InTowers=false;
  var err_d=false
  var vdolinu=false
  var citaactiv=false

  var krithp=''
  var berserk='',t_bers='';
  var kritomania='',t_krit='';
  var pronikaushii='',t_pron=''
  var nasmeshka='',t_nasm=''
  var resurection='',time_res='';
  var SetDrinkHP='',buttle='',t_but='';
  var setUvorotHP='',uvorot='',t_uvo='';
  var setKamShitHP='',kamShit='',t_kam='';
  var setOtrShitHP='',otrShit='',t_otr=''
  var setEnergChitHP='',energchit='',t_ener='';

  var attack='';
  var attackTowers='',HP_Bashni='';
  var attackDobivat='',HP_vraga='';
  var heal='',healEnd=true;
  var heal_target=''
  var healYourself='';
  var healSoyznika='';
  var destroyMana='';
  var destroyManaBoss='';
  var attack_vrata='';
  var attack_strazh='';
  var attack_czar='';
  var DND='';
  var Boss=false;
  var attack_gerod='';
  var attack_kochev='';
  var Nemezida='',HP_N='';
  var Garm='',HP_G='';
  var Cerber='',HP_C='';
  var manticora='';
  var trofei='';
  var attack_drakon='';
  var attack_troll='';	
  var attack_bers='';	
  var attack1='';
  var Epiter='',HP_Ep='';
  var Yapiter='',HP_Ya='';
  var ushelie='',straznik='',dolina='';
  var zodiak='',HP_Zod=''
  var attack_soul='';
  var peshera=[]

  var otklonit='',skrit='';
  var obnovit='';
  var vstatVochered='',pokinutOchered='',noviuBoy='';
  var vhod='';
  var naGlavnuy='';
  var vzamok='';
  var terrN=[]
  var bg='';
  var turnir='',turnir1='',turnir2='';
  var nextTower=false;
  var zamok=[]
  var bashni='',arena='',zamki='',cargori='',survival='',battle='';
  var territory='',na_terr='';
  var vhodvigru='';
  var time_serv='';
  var comp_time='';
  var server_time=['','','',''];
  var abilitiesSetLink=[]
  var itemsSetLink=[]
  var klan='',altar='',zaitiValtar='',altarZAserebro='',altarZAjelezo='',altarZamki='',altarZamkivse='';
  var use_full=''; use_4hr=''; epicBuyLink='';
  var ustalost='',snyatustalost='';
  var captcha='',captcha_img='',cap_src='';
  var getbaf='';
  var getcit='';
  var bag='',body='',abilities='',trade_ability='',passive=''
  var veshi='',select='';
  var vRukzak='',vSunduk='',nadet='',vikinut='';
  var confirm_link='';
  var poluchit='';
  var open='';
  var openbag='';
  var openstore='';
  var nochar='';
  var major_lnk=false;
  var trayStatus='';
  var cracklinks=0;
  var activ_link='';
  var pochinit='',pochinit_vse='',pochinit_vse_za='';
  var razobrat_vse='',razobrat='';
  var user='';
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
  var brb='';
  var action=false;
  var rip = false;
  var pokinut ='';

var svitki_link=''

var KSU='',MSS='',trenirovka='',kurgan='',lagerOrdi='',lagerVikingov='';
var usteReki='',lednik='',praviuBereg='',verhniuPereval='',leviyBereg='',ledyaniePesheri='',deltaReki='',nijniuPereval='',kamenniePesheri='',gornoeOzero='';
var perekrestok='',UPustosh='',UZPustosh='',ZPustosh='',SZPustosh='',UVPustosh='',VPustosh='',SVPustosh='',SPustosh='';
var BKurgan='',VRosengard='',ZRosengard='',Zmarokand='',Vmarokand='',rudnik='',Mkipi='',marokand='',rosengard='';			
var MGS='',MGU='',UZO='',HO='',HZ='',UVO='',PZ='',PV='',PR='',SZO='',HN='',HV='',SVO='';
var ZTS='',SZG='',SVG='',ZV='',KT='',VV='',UZG='',UVG='',ZTU='';
var DSS='',SZF='',SVF='',ZK='',PVB='',VK='',UZF='',UVF='',DSU='';
var OBS='', ZVrataSevera='', CVrataSevera='', VVrataSevera='', SZSklon='', SPereval='', SVUtes='', UZSklon='', UPlato='', UVUtes='', ZVrataUga='', CVrataUga='', VVrataUga='';
//////////////////////////////////////////////////////////////////////

var rus=["а","А","с","С","е","Е","Т","Н","о","О","р","Р","к","К","х","Х","В","М","у","и","д","т","г"]
var eng=["a","A","c","C","e","E","T","H","o","O","p","P","k","K","x","X","B","M","y","u","g","m","r"] 

var nick=en_ru(Username)
var div = document.getElementsByTagName('div'); 
var a = document.getElementsByTagName('a'); 
var span = document.getElementsByTagName('span');
var title =''; if(document.getElementsByTagName('title')[0]!=undefined) title=en_ru(document.getElementsByTagName('title')[0].textContent);
var img = document.getElementsByTagName('img');
var any_tag=document.getElementsByTagName('*');
//document.querySelectorAll
var f_time = /(\d+):(\d+):(\d+)/;

var epic_crack = new Array()
if (razbirat_epic[0]==1) epic_crack.push('Шлем')
if (razbirat_epic[1]==1) epic_crack.push('Амулет')
if (razbirat_epic[2]==1) epic_crack.push('Наплечник')
if (razbirat_epic[3]==1) {epic_crack.push('Накидка'); epic_crack.push('Бурка')}
if (razbirat_epic[4]==1) {epic_crack.push('Кираса'); epic_crack.push('Кольчуга')}
if (razbirat_epic[5]==1) epic_crack.push('Пояс')
if (razbirat_epic[6]==1) {epic_crack.push('Штаны'); epic_crack.push('Поножи')}
if (razbirat_epic[7]==1) epic_crack.push('Браслет')
if (razbirat_epic[8]==1) {epic_crack.push('Наручи'); epic_crack.push('Перчатки')}
if (razbirat_epic[9]==1) epic_crack.push('Кольцо')
if (razbirat_epic[10]==1) {epic_crack.push('Посох'); epic_crack.push('Молот'); epic_crack.push('Копье'); epic_crack.push('Топор');}
if (razbirat_epic[11]==1) epic_crack.push('Сапоги')


var name_scrl=[ "Подарок алхимика","Медитация","Секрет победы","Рефлекс тигра","Ярость смертника","Ледяной щит","Жажда познания","Адреналин","Опустошение","Сила критона","Уверенное дыхание","Нарастающий гнев","Стойкость","Стратегический ум" ]
var castle_name= [ "Голова дракона","Сердце титана","Гроза миров","Крепость духа","Исцеление предков","Зеркало боли","Источник познания","Колыбель жизни" ]
var dung_name= [ "Пещерный стражник","Пещера мантикоры","Легендарный дракон","Логово Геррода","Мифический дракон","Храм Немезиды","Каменный тролль","Обитель Зодиака","Трофейный дракон","Долина Великанов","Святилище предков" ]
var some_name= [ "Башня мудрости","Статуя критона","Академия клана" ]

if (sessionStorage.scrolls==undefined) sessionStorage.scrolls="0"
if (sessionStorage.bonus==undefined) sessionStorage.bonus="0"
if (sessionStorage.cita==undefined) sessionStorage.cita="0"
if (sessionStorage.dungeons==undefined) sessionStorage.dungeons="0"
if (sessionStorage.mark==undefined) sessionStorage.mark=""
if (/static.barbars/.test(location.host)) sessionStorage.on_off="on";

var Scrolls=sessionStorage.scrolls.split(",")
var bonus=sessionStorage.bonus.split(",")
var cita=sessionStorage.cita.split(",")
var dungeon=sessionStorage.dungeons.split(",")
var mark=sessionStorage.mark.split(",")

var reg=/(\d+) ур, (медик|воин), (юг|север) (\d+) (\d+)/
if (reg.test(sessionStorage.user) && sessionStorage.user!=undefined){
	var str=reg.exec(sessionStorage.user) 
	lvl=str[1]
	u_class=str[2]
	if (str[3]=="север") storona=false
	strong=str[4]
	life=str[5]
	if (/Премиум/.test(str[0])) prem=true
}
	temp_date = new Date();
	day = temp_date.getDate();
	hours=temp_date.getHours();
	minutes=temp_date.getMinutes();
	seconds=temp_date.getSeconds();
	comp_time=hours*3600+minutes*60+seconds;

	var newDay=false
	if (mark[1]!=day && mark[1]!=undefined) newDay=true
	mark[1]=day;

	for (var i=0;i<=13;i++) 
	{
		if (Scrolls[i]==undefined) Scrolls[i]=0
		if (/\d+/.test(Scrolls[i])) {
			var t=/\d+/.exec(Scrolls[i])
			if (newDay) t=t-86400; 
			if (t<=comp_time) Scrolls[i]=0
			else if (/нет/.test(Scrolls[i])) Scrolls[i]=t+"нет"
			else Scrolls[i]=t
		}
	}

	sessionStorage.scrolls=Scrolls

	for (var i=0;i<=8;i++) {
		if (bonus[i]==undefined) bonus[i]=0
		if (newDay) bonus[i]=bonus[i]-86400; 
		if (bonus[i]<=comp_time) bonus[i]=0;
	}
	sessionStorage.bonus=bonus
	
	for (var i=0;i<=2;i++) {
		if (cita[i]==undefined) cita[i]=0
		if (newDay) cita[i]=cita[i]-86400; 
		if (cita[i]<=comp_time) cita[i]=0;
	}	

	for (var i=2;i<=24;i++) {
		if (mark[i]==undefined) mark[i]=0
		if (mark[i]==undefined) mark[i]=0
		if (i>=11 && i<=20) {
			if (newDay) mark[i]=mark[i]-86400;
			if (mark[i]<=comp_time) mark[i]=0
		}
	}
	sessionStorage.mark=mark

	for (var i=0;i<=10;i++) {
		if (dungeon[i]==undefined) dungeon[i]=0
		if (/\d+/.test(dungeon[i])) {
			var t=/\d+/.exec(dungeon[i])
			if (newDay) t=t-86400; 
			if (t<=comp_time) dungeon[i]=0
			else if (/нет/.test(dungeon[i])) dungeon[i]=t+"нет"
			else dungeon[i]=t
		}
	}
	sessionStorage.dungeons=dungeon



///////////////////////////////////////////////////////////////////////


if ( div[0]==undefined||a[0]==undefined||span[0]==undefined ||document.getElementsByTagName('title')[0]==undefined||img[0]==undefined||document.body==undefined )
		setTimeout(function(){location.href='/user';}, 5000);
  else if ( sessionStorage.on_off=="on" && /barbars|варвары|46.4.4.56|b.spaces/.test(location.host) )
  {
	zapolneniePeremennih(); 
	test_location();
	
	if ( title.match("А ты тут?") && cap_src!='' && unravel )
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
			image.src=cap_src;
			image.onload = function()
				{
				context.drawImage(image, 0, 0);
				var data = (canvas.toDataURL('image/png')).replace("data:image/png;base64,", "")
				window.iframe.contentWindow.postMessage(data, "http://antigate.com");
				mpage('Распознавание капчи');
 				}
			mpage(cap_src);
		}
	}

	if (autologin) autologin_(); 
	if (!action && !title.match("Чат клана") && SetTerritory && klan!='') territory_();
	if (!action) errors_();
	if (send_to!="" && !title.match("Чат клана")) send_message();
	if (!action && !title.match("Чат клана") && new_mail && vboy=='') ReadMessages();
	if (!action) proverka_loga();
	if (!action ) goToBoss_(); 
	if (!action && !title.match("Чат клана")) user_check();
	abilities_();
	if (!title.match("Чат клана")) altar_();
	if (!action && lvl>19 && !title.match("Чат клана")) zamki_();
	if (!action && !title.match("Чат клана") && mark[19]!=1 && mark[11]!=1) baf_zamkov();
	if (!action && !title.match("Чат клана")) some_();
	if (!action) location_reset();
	if (!action && !title.match("Чат клана")) razobratVeshi();
	if (!action && !title.match("Чат клана") && chinit_veshi) repair();
	if (!action && SetItem) ItemsSet_();
	if (!action && !title.match("Чат клана")) battle_(); 
	if (!action) resurection_(); 
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
	var str=data
	str=str.replace(/(\n(\r)?)/g, ' ')
	str=str.split(/&nbsp;/).join(" ");
	str=str.replace(/&nbsp;/g, ' ')
	str=str.replace(/(\s){1,}/g, ' ')
	return str
}


function zapolneniePeremennih()
{

for (var y=0;y<any_tag.length;y++) 
{
	if (/&nbsp;/.test(any_tag[y].innerHTML)) any_tag[y].innerHTML=any_tag[y].innerHTML.replace(/&nbsp;/g, ' ')

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
				if (!storona)
				{
					drug_mech=Number(any_tag[y-6].textContent);
					drug_med=Number(any_tag[y-4].textContent);
					vrag_mech=Number(any_tag[y-2].textContent);
					vrag_med=Number(any_tag[y].textContent);
				} else {
					vrag_mech=Number(any_tag[y-6].textContent);
					vrag_med=Number(any_tag[y-4].textContent);
					drug_mech=Number(any_tag[y-2].textContent);
					drug_med=Number(any_tag[y].textContent);
				}
				brb=vrag_mech+vrag_med+drug_mech+drug_med;
			}
		}
}
//mpage(vrag_mech+' '+vrag_med+' '+drug_mech+' '+drug_med)


rus_t=en_ru(replace_(document.body.textContent))

uroven_HP=/\d+/.exec(rus_t); if (uroven_HP<0) uroven_HP=life

var sm=document.getElementsByClassName("small minor")
if (sm[0]!=undefined)
if (f_time.test(sm[sm.length-1].textContent)){
	server_time=f_time.exec(sm[sm.length-1].textContent);
	time_serv = getSec(server_time)
}

if (title.match("Мой герой")){
	sessionStorage.user=""
	var reg=/(\d+) ур, (медик|воин), (юг|север)/i
	if (reg.test(rus_t)) sessionStorage.user=(reg.exec(rus_t))[0];

	sessionStorage.user+=" "+(/сила: (\d+)/.exec(rus_t))[1];
	sessionStorage.user+=" "+(/здоровье: (\d+)/.exec(rus_t))[1]

	if (/Премиум \+(\d+)%/i.test(rus_t) ) sessionStorage.user+=" премиум"
	if (/усталость: -(\d+)%/i.test(rus_t) && !SetUstalost) sessionStorage.ustalya=1;
	else sessionStorage.removeItem('ustalya');
	
    }
	
if (!autologin) user_id=getCookie("id")

for (var i=a.length-1; i>=0; i--)
     {
	var atext=en_ru(replace_(a[i].text))
	if (!autologin && user_id!='' && a[i].href.match("/user/id/"+user_id)) nick=atext;
	if (!/user\/id/.test(a[i].href))
	{
		if (/Вход в игру/.test(atext)) 		    	vhodvigru=a[i];
		if (/Мой клан/.test(atext)) 	     		klan=a[i];
		if (/Вход/.test(atext)) 		    	    vhod=a[i];
		if (/user\/check/.test(a[i].href)||/А ты тут?/.test(atext)) captcha=a[i];
		if (/sacrifaceMoneyLink/.test(a[i].href)) 	altarZAserebro=a[i];
		if (/sacrifaceIronLink/.test(a[i].href))	altarZAjelezo=a[i];
		if (/sacrifaceMoneyCastle1Link/.test(a[i].href))		altarZamki=a[i];
		if (/sacrifaceMoneyCastle2Link/.test(a[i].href))		altarZamkivse=a[i];
		if (/epicBuyLink/.test(a[i].href)) 		    epicBuyLink=a[i];
		if (/user\/rack/.test(a[i].href) || /Рюкзак/.test(atext))	bag=a[i];
		if (/user\/body/.test(a[i].href) || /Снаряжение/.test(atext)) 	body=a[i];
		if (/toStoreLink/.test(a[i].href) || /в сундук/.test(atext)) vSunduk=a[i];
		if (/Свитки/i.test(atext) && /scrollFilterLink/.test(a[i].href))			svitki_link=a[i];
		if (/усталость/.test(atext))			    ustalost=a[i];
		if (/Снять усталость за/.test(atext))		snyatustalost=a[i];
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

		if (/Вещи/.test(atext)) 		        	veshi=a[i];
		if (/Поставить чары на вещи/.test(atext)) 	nochar=a[i];
		if (/выбрать/.test(atext)) 		        	select=a[i];
		if (/подтверждаю/i.test(atext)) 	     	confirm_link=a[i];
		if (/открыть/.test(atext)) 			        open=a[i];
		if (/получить/.test(atext)) 	    		poluchit=a[i];
		if (/выкинуть/.test(atext)) 		    	vikinut=a[i];

		if (/Бить/.test(atext)) 		            attack1=a[i];
		if (/Бить Геррода|Жечь энергию Герроду/.test(atext)) 	attack_gerod=a[i];
		if (/Бить Кочевников|Жечь энергию Кочевникам/.test(atext)) 	attack_kochev=a[i];
		if (/Бить врата/.test(atext)) 	        	attack_vrata=a[i];
		if (/Бить Стражника/.test(atext))       	attack_strazh=a[i];
		if (/Бить царей/.test(atext))       	    attack_czar=a[i];
		if (/Бить врагов/.test(atext))          	attack=a[i];
		if (/Бить башню/.test(atext)) 	        	{attackTowers=a[i]; HP_Bashni=/\d+/.exec(atext); }
		if (/Добивать/.test(atext)) 	        	{attackDobivat=a[i]; HP_vraga=/\d+/.exec(atext); }
		if (/Лечить союзников/.test(atext))     	heal=a[i];
		if (/Лечить цель/.test(atext))          	heal_target=a[i];
		if (/Лечить /.test(atext) && /% хп/.test(atext)) {healSoyznika=a[i]; HP=/\d+/.exec(atext); if (HP>=rNum(175, 200)) healEnd=false;}
		if (/Лечить себя/.test(atext))          	healYourself=a[i];
		if (/Жечь энергию врагам/.test(atext))      destroyMana=a[i]; 
		if (/Жечь энергию у/.test(atext))       	{destroyMan=a[i]; if (/\d+/.exec(atext)==0) bad_target=true}
		if (/Жечь /.test(atext))		            destroyManaBoss=a[i]; 

		if (/Берсерк \(((\d+)сек|готово)/.test(atext) && !/Бить Берсерка/.test(atext))		    {t_bers=/\d+/.exec(atext)*1000; if (a[i].className!='buff') berserk=a[i];} 
		if (/Энергетический щит \(((\d+)сек|готово)/.test(atext)) {t_ener=/\d+/.exec(atext)*1000; if (a[i].className!='buff') energchit=a[i];}
		if (/Щит отражения \(((\d+)сек|готово)/.test(atext)) 	{t_otr =/\d+/.exec(atext)*1000; if (a[i].className!='buff') Shit_otr=a[i];}
		if (/Каменный щит \(((\d+)сек|готово)/.test(atext)) 	{t_kam =/\d+/.exec(atext)*1000; if (a[i].className!='buff') kamShit=a[i];}
		if (/Щит отражения \(((\d+)сек|готово)/.test(atext)) 	{t_otr =/\d+/.exec(atext)*1000; if (a[i].className!='buff') otrShit=a[i];}
		if (/Критомания \(((\d+)сек|готово)/.test(atext)) 	    {t_krit=/\d+/.exec(atext)*1000; if (a[i].className!='buff') kritomania=a[i];}
		if (/Проникающий удар \(((\d+)сек|готово)/.test(atext)) {t_pron=/\d+/.exec(atext)*1000; if (a[i].className!='buff') pronikaushii=a[i];}
		if (/Проникающий удар \((\d+)сек/.test(rus_t) && a[i].className=='buff') pronik=true;
		if (/Насмешка \(((\d+)сек|готово)/.test(atext))         {t_nasm=/\d+/.exec(atext)*1000; if (a[i].className!='buff') nasmeshka=a[i];}
		if (/Насмешка \((\d+)сек/.test(rus_t) && a[i].className=='buff') {smeshka=true; bad_target=true; sessionStorage.missed=0;}
		if (/Уворот \(((\d+)сек|готово)/.test(atext)) 		    {t_uvo =/\d+/.exec(atext)*1000; uvorot=a[i];}
		if (/Пить бутылочку \((\d+)шт/.test(atext)) 		    {t_but=0; if (a[i].className!='buff') buttle=a[i];}
		if (/Пить бутылочку \((\d+)сек/.test(atext)) 		    { t_but =/\d+/.exec(atext)*1000; if (a[i].className!='buff') buttle=a[i];}

		if (/Битва героев/.test(atext)) 	battle=a[i];
		if (/Турниры/.test(atext)) 		turnir=a[i];
		if (/Турнир героев/.test(atext)) 	turnir1=a[i];
		if (/Командный турнир/.test(atext)) 	turnir2=a[i];
		if (/Арена/.test(atext)) 		arena=a[i];
		if (/Выживание/.test(atext)) 		survival=a[i];
		if (/Поля сражений/.test(atext)) 	bg=a[i];
		if (/Войти в замок/.test(atext)) 	vzamok=a[i];
		if (/Вернуться в бой/.test(atext)) 	vboy=a[i];
		if (/Покинуть очередь/.test(atext)) 	pokinutOchered=a[i];
		if (/Новый бой/.test(atext)) 		noviuBoy=a[i];
		if (/Встать в очередь/.test(atext)) 	vstatVochered=a[i];
		if (/отклонить/i.test(atext)) 		otklonit=a[i];
		if (/скрыть/.test(atext)) 		skrit=a[i];
		if (/Покинуть выживание|Покинуть арену/.test(atext)) 		pokinut=a[i];

		if (/Бонус замка/.test(atext)) 		bonusZ=a[i];	
		if (/Голова дракона/.test(atext)) 	zamok[0]=i;		
		if (/Сердце титана/.test(atext)) 	zamok[1]=i;		
		if (/Гроза миров/.test(atext)) 		zamok[2]=i;		
		if (/Крепость духа/.test(atext)) 	zamok[3]=i;		
		if (/Исцеление предков/.test(atext)) 	zamok[4]=i;	
		if (/Зеркало боли/.test(atext)) 	zamok[5]=i;	
		if (/Источник познания/.test(atext)) 	zamok[6]=i;
		if (/Колыбель жизни/.test(atext)) 	zamok[7]=i;
// Штурм крепости
        if (/Западные Врата Севера/.test(atext)) ZVrataSevera=a[i];
		if (/Центральные Врата Севера/.test(atext)) CVrataSevera=a[i];
		if (/Восточные Врата Севера/.test(atext)) VVrataSevera=a[i];
		if (/Северо-Западный Склон/.test(atext)) SZSklon=a[i];
		if (/Северный Перевал/.test(atext)) SPereval=a[i];
		if (/Северо-Восточный Утес/.test(atext)) SVUtes=a[i];
		if (/Юго-Западный Склон/.test(atext)) UZSklon=a[i];
		if (/Южное Плато/.test(atext)) UPlato=a[i];
		if (/Юго-Восточный Утес/.test(atext)) UVUtes=a[i];
		if (/Западные Врата Юга/.test(atext)) ZVrataUga=a[i];
		if (/Центральные Врата Юга/.test(atext)) CVrataUga=a[i];
		if (/Восточные Врата Юга/.test(atext)) VVrataUga=a[i];
		if (/Обелиск Силы/.test(atext)) OBS=a[i];
// Территории
		if (/Территории/.test(atext)) 		 territory=a[i];
		if (/Грозовой Перевал/.test(atext))  terrN[0]=i;		
		if (/Тысяча Гор/.test(atext)) 		 terrN[1]=i;		
		if (/Седые Холмы/.test(atext)) 		 terrN[2]=i;		
		if (/Каменный Лес/.test(atext)) 	 terrN[3]=i;		
		if (/Пепельная Пустыня/.test(atext)) terrN[4]=i;	
		if (/Черное Озеро/.test(atext)) 	 terrN[5]=i;	
		if (/Могильные Топи/.test(atext)) 	 terrN[6]=i;
		if (/Голые Камни/.test(atext)) 		 terrN[7]=i;	
		if (/Покинутые Степи/.test(atext)) 	 terrN[8]=i;		
		if (/Забытая Долина/.test(atext)) 	 terrN[9]=i;		
		if (/Черные Скалы/.test(atext)) 	 terrN[10]=i;		
		if (/Выжженные земли/.test(atext)) 	 terrN[11]=i;		
		if (/Мертвый остров/.test(atext)) 	 terrN[12]=i;	
		
		if (/Войти на территорию/.test(atext)) na_terr=a[i];

		if (/Курган/.test(atext)) 		    kurgan=a[i];
		if (/Лагерь орды/.test(atext)) 		lagerOrdi=a[i];
		if (/Лагерь викингов/.test(atext)) 	lagerVikingov=a[i];	

		if (/Устье реки/.test(atext))		usteReki=a[i];
		if (/Правый берег/.test(atext)) 	praviuBereg=a[i];
		if (/Левый берег/.test(atext)) 		leviyBereg=a[i];
		if (/Дельта реки/.test(atext)) 		deltaReki=a[i];
		if (/Ледник/.test(atext)) 		    lednik=a[i];
		if (/Верхний перевал/.test(atext)) 	verhniuPereval=a[i];
		if (/Ледяные пещеры/.test(atext)) 	ledyaniePesheri=a[i];
		if (/Нижний перевал/.test(atext)) 	nijniuPereval=a[i];
		if (/Каменные пещеры/.test(atext)) 	kamenniePesheri=a[i];
		if (/Горное озеро/.test(atext)) 	gornoeOzero=a[i];

		if (/Перекрёсток/.test(atext))  	perekrestok=a[i];	
		if (/Южная пустошь/.test(atext)) 	UPustosh=a[i];	
		if (/Юго-западная пустошь/.test(atext))UZPustosh=a[i];	
		if (/Западная пустошь/.test(atext)) 	ZPustosh=a[i];	
		if (/Северо-западная пустошь/.test(atext)) SZPustosh=a[i];	
		if (/Юго-восточная пустошь/.test(atext)) UVPustosh=a[i];	
		if (/Восточная пустошь/.test(atext)) 	VPustosh=a[i];	
		if (/Северо-восточная пустошь/.test(atext)) SVPustosh=a[i];
		if (/Северная пустошь/.test(atext)) 	SPustosh=a[i];
		if (/Большой курган/.test(atext))  	BKurgan=a[i];	
		if (/Восточный Розенгард/.test(atext)) VRosengard=a[i];	
		if (/Западный Розенгард/.test(atext)) 	ZRosengard=a[i];	
		if (/Западный Мароканд/.test(atext)) 	Zmarokand=a[i];	
		if (/Восточный Мароканд/.test(atext)) 	Vmarokand=a[i];	
		if (/Железный рудник/.test(atext)) 	rudnik=a[i];	
		if (/Медные копи/.test(atext))  	Mkipi=a[i];	
		if (/Мароканд/.test(atext)) 		marokand=a[i];	
		if (/Розенгард/.test(atext)) 		rosengard=a[i];

		if (/Мертвый город, Юг/.test(atext)) 	MGU=a[i];
		if (/Юго-восточная окраина/.test(atext))UVO=a[i];
		if (/Храм земли/.test(atext)) 	    	HZ=a[i];
		if (/Храм огня/.test(atext)) 	    	HO=a[i];
		if (/Юго-западная окраина/.test(atext))UZO=a[i];
		if (/Площадь восстания/.test(atext)) 	PV=a[i];
		if (/Площадь рассвета/.test(atext)) 	PR=a[i];
		if (/Площадь заката/.test(atext))   	PZ=a[i];
		if (/Северо-восточная окраина/.test(atext)) SVO=a[i];
		if (/Храм воды/.test(atext)) 	    	HV=a[i];
		if (/Храм неба/.test(atext)) 	    	HN=a[i];
		if (/Северо-западная окраина/.test(atext)) SZO=a[i];
		if (/Мертвый город, Север/.test(atext)) MGS=a[i];
		if (/Земли титанов, Север/.test(atext)) ZTS=a[i];
		if (/Северо-западные горы/.test(atext)) SZG=a[i];	
		if (/Северо-восточные горы/.test(atext))SVG=a[i];	
		if (/Западные врата/.test(atext))   	ZV=a[i];
		if (/Крепость титанов/.test(atext)) 	KT=a[i];
		if (/Восточные врата/.test(atext))  	VV=a[i];
		if (/Юго-западные горы/.test(atext)) 	UZG=a[i];
		if (/Юго-восточные горы/.test(atext)) 	UVG=a[i];
		if (/Земли титанов, Юг/.test(atext)) 	ZTU=a[i];
		if (/Каракорум, столица Юга/.test(atext)) KSU=a[i];
		if (/Мидгард, столица Севера/.test(atext)) MSS=a[i];
//  Долина Сражений
		if (/Долина Сражений, Север/.test(atext)) DSS=a[i];
		if (/Северо западный Форт/.test(atext)) SZF=a[i];	
		if (/Северо восточный Форт/.test(atext))SVF=a[i];	
		if (/Западный Курган/.test(atext))   	ZK=a[i];
		if (/Поле вечной битвы/.test(atext)) 	PVB=a[i];
		if (/Восточный Курган/.test(atext))  	VK=a[i];
		if (/Юго западный Форт/.test(atext)) 	UZF=a[i];
		if (/Юго восточный Форт/.test(atext)) 	UVF=a[i];
		if (/Долина Сражений, Юг/.test(atext)) 	DSU=a[i];	
		
		// БОССЫ 
		if (/Пещеры и драконы/.test(atext)) 	DND=a[i];
		if (/Пещерный стражник/.test(atext)) 	{peshera[0]=i;}
		if (/Пещера мантикоры/.test(atext)) 	{peshera[1]=i;}
		if (/Легендарный дракон/.test(atext))	{peshera[2]=i;}
		if (/Логово Геррода/.test(atext)) 	    {peshera[3]=i;}
		if (/Мифический дракон/.test(atext)) 	{peshera[4]=i;}
		if (/Храм Немезиды/.test(atext)) 	    {peshera[5]=i;}
		if (/Каменный тролль/.test(atext))    	{peshera[6]=i;}
		if (/Обитель Зодиака/.test(atext))  	{peshera[7]=i;}
		if (/Трофейный дракон/.test(atext)) 	{peshera[8]=i;}
		if (/Долина Великанов/.test(atext)) 	{peshera[9]=i; dolina=a[i]}
		if (/Святилище предков/.test(atext)) 	{peshera[10]=i;}

		if (/Бить стражника/.test(atext)) 	{attack_strazh=a[i];}
		if (/Бить мантикору/.test(atext)) 	{manticora=a[i];}
		if (/Бить дракона/.test(atext)) 	attack_drakon=a[i];
		if (/Бить тролля/.test(atext)) 	    attack_troll=a[i];
		if (/Бить (Берсерка|Голиафа|Атланта)/.test(atext)) 	    attack_bers=a[i];
		if (/Бить Эпитера/.test(atext)) 	{Epiter=a[i];   HP_Ep=/\d+/.exec(atext);}
		if (/Бить Япитера/.test(atext)) 	{Yapiter=a[i];  HP_Ya=/\d+/.exec(atext);}
		if (/Бить Немезиду/.test(atext)) 	{Nemezida=a[i]; HP_N=/\d+/.exec(atext);}
		if (/Бить Гарма/.test(atext)) 		{Garm=a[i];     HP_G=/\d+/.exec(atext);}
		if (/Бить Цербера/.test(atext)) 	{Cerber=a[i];   HP_C=/\d+/.exec(atext);}
		if (/Бить Зодиака/i.test(atext)) 	{zodiak=a[i];   HP_Zod=/\d+/.exec(atext);}
		if (/Бить душу/.test(atext)) 		attack_soul=a[i];
		if (/Ущелье (Я|Э)питера/.test(atext)) 	ushelie=a[i];
		if (/Стражник/.test(atext)) 		straznik=a[i];

		if (/scrollUseFullLink|scrollUseLink/.test(a[i].href)) use_full=a[i];
		if (/scrollUse4Link/.test(a[i].href))	use_4hr=a[i];

		if (/Выбрать набор 1/.test(atext)) 	abilitiesSetLink[1]=i;
		if (/Выбрать набор 2/.test(atext)) 	abilitiesSetLink[2]=i;
		if (/Выбрать набор 3/.test(atext)) 	abilitiesSetLink[3]=i;
		if (/Надеть комплект 1/.test(atext)) 	itemsSetLink[1]=i;
		if (/Надеть комплект 2/.test(atext)) 	itemsSetLink[2]=i;
		if (/Надеть комплект 3/.test(atext)) 	itemsSetLink[3]=i;

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
		if ( /bag_full/.test(img[i].src) ) fullBag=true;
		if ( /bag_better/.test(img[i].src) ) bag_better=true;
		if ( /clothes_broken/.test(img[i].src)) clothes_broken=true;
		if ( /energy_low/.test(img[i].src)) lowenergy=true;
		if ( /icons\/letter\./.test(img[i].src) && (i<10) && ReadMessage) new_mail=true; 
		if ( /rip/.test(img[i].src) ) rip=true;
	}
	if (!bag_better && mark[15]!=0) mark[15]=0;
}


function click(link, timer, perehod){

	if (link!='' && !action) {
		action=true;
		activ_link=link;
		trayStatus=timer
 		t1 = +new Date(); 
	if (perehod==1) sessionStorage.perehod=1; else if (perehod==0) sessionStorage.perehod=0;
	if (link!=undefined) link.style="border: 2px solid #53da3f";
	timeoutId = setInterval(function(){location.href=link;}, timer);
	return;
	}
}



function razobratVeshi()
{

if ( !InEvents && !Boss && vboy=='' ) 
 {
	if (mark[22]==1) goToAbilities_()

	if (sessionStorage.used==1 ) 
	{
		sessionStorage.removeItem('used'); 
		if ( (use_full!='' || use_4hr!='') && (sessionStorage.user.match('премиум')||mark[11]!=1)) 
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
	if ( sessionStorage.drop==1 ) {sessionStorage.removeItem('drop'); if  (vikinut!='') click(vikinut, timeout); }
	if (sessionStorage.razobrat==1 ) {sessionStorage.removeItem('razobrat'); if  (razobrat!='') click(razobrat, timeout); }
	
	if (rus_t.match(/Открыть сундук \((\d+)\/(\d+)\)/) && title.match("Рюкзак"))
	{
		var sund=/Открыть сундук \((\d+)\/(\d+)\)/.exec(rus_t)
		if (Number(sund[1])>=Number(sund[2])) mark[8]=1;
	}

if ( title.match("Рюкзак") && SetRazbor && vikinut!='') click(vikinut, timeout);
else if ( title.match("Рюкзак") && SetRazbor && mark[7]==0 && razobrat!='' && razobrat_vse!='' && cracklinks>3) {mark[7]=1; click(razobrat_vse, timeout);}
else if ( title.match("Рюкзак") && SetRazbor &&  razobrat!='' ) click(razobrat, timeout);
else { 
	for (var i=0;i<div.length;i++) 			
	if ( div[i].getElementsByTagName('a')[0]!=undefined && div[i].getElementsByTagName('a')[0].href.match('/item/id/') && !action )
	{	
		var item_bonus=7
		var item=div[i].getElementsByTagName('a')[0]
		var item_name=en_ru(replace_(item.textContent))
		var scroll=false; var epic=false
			for (var y=0;y<div[i].getElementsByTagName('img').length;y++) 
			{
				var type_img=div[i].getElementsByTagName('img')[y].src
				     if (type_img.match('bonusdarkiron'))  {item_bonus=6; break;}	
				else if (type_img.match('bonuslegendary')) {item_bonus=5; break;}	
				else if (type_img.match('bonusepic')) 	   {item_bonus=4; break;}	
				else if (type_img.match('bonusrare')) 	   {item_bonus=3; break;}
				else if (type_img.match('bonusgreen')) 	   {item_bonus=2; break;}
				else if (type_img.match('bonuscopper'))	   {item_bonus=1; break;}		
			}
		for (var y=0;y<epic_crack.length;y++) {if ( item_name.match(epic_crack[y]) ) {epic=true; break;}} 

		if ( title.match(/Рюкзак|Сундук/)) {for (var y=0;y<=12;y++) {if (item_name.match(name_scrl[y]) && dropScroll[y]==1) scroll=true;}}

		if ( SetSvmin<=item_bonus && SetSvmax>=item_bonus && !SetUse4hr && item_bonus>3 && title.match(/Рюкзак|Сундук/) && (sessionStorage.user.match('премиум')||mark[11]!=1))
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
		if ( SetdropSt>=item_bonus && item_name.match(/Изумруд|Обсидиан|Сапфир|Корунд|Оникс/i) && title.match(/Рюкзак|Сундук/) )
			{sessionStorage.drop=1; click(item, timeout); break; }

		else if ( Setlvlshmot>=item_bonus && title.match('Сундук') && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && div[i].getElementsByClassName('itemBad')[0]==undefined )
			{ sessionStorage.nadet=1; click(item, timeout); break;}

		else if ( item_bonus<4 && SetRazbor && title.match(/Рюкзак|Сундук/) && item_name.match(/Ветерана|Дружинника|Воина|Охотника/i) && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i))
			{ sessionStorage.razobrat=1; click(item, timeout); break;}

		else if ( item_bonus==4 && SetRazbor && title.match(/Рюкзак|Сундук/) && epic && !div[i].textContent.match(/Лучше \(\+(\d+)\)/i) )
			{ sessionStorage.razobrat=1; click(item, timeout); break;}

		if ( Setlvlshmot<item_bonus && title.match("Рюкзак") && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) && mark[8]==1)
			{mark[15]=comp_time+rNum(2000, 5000)}

		else { 
		var wear='',toStore='',toRack='',scrollUse='',openbox='',drop='';

		for (var y=1;y<div[i].getElementsByTagName('a').length;y++)
		{
			var lnk = div[i].getElementsByTagName('a')[y]
			var act = en_ru(replace_(div[i].getElementsByTagName('a')[y].textContent))

			if ( act.match("надеть")&& div[i].getElementsByClassName('itemBad')[0]==undefined && div[i].textContent.match(/Лучше \(\+(\d+)\)/i) ) wear=lnk
			if ( item_name.match('Запертый ящик') && act.match(/открыть/i) && title.match(/Рюкзак|Сундук/)) openbox=lnk
			if ( act.match("в рюкзак") && !title.match('Сундук')) toRack=lnk
			if ( title.match("Рюкзак") && act.match("выкинуть")) drop=lnk
			if ( act.match(/использовать за \d+/i) && title.match(/Рюкзак|Сундук/)) scrollUse=lnk
			if ( lnk.href.match("toStoreLink") && mark[8]!=1 ) toStore=lnk
		}
		if (wear!='' && Setlvlshmot>=item_bonus ) click(wear, timeout); 
		else if (openbox!='' && SetboxOpen>=item_bonus) click(openbox, timeout)
		else if (scrollUse!='' && SetSvmin<=item_bonus && SetSvmax>=item_bonus && (SetUse4hr||item_bonus<=3))
			{
				for (var y=0;y<=12;y++)
				if (SetScroll[y]==1 && (Scrolls[y]==0 || /нет/.test(Scrolls[y])) && item_name.match(name_scrl[y])) {
					Scrolls[y]=comp_time+5000; click(lnk, timeout);
					sessionStorage.scrolls=Scrolls; break;
				}
			}

		if (!action && toRack!='' ) click(toRack, timeout)
		else if ( SetdropSv>=item_bonus && scroll && title.match(/Рюкзак|Сундук/) )
			{sessionStorage.drop=1; click(item, timeout); break; }
		else if (drop!='') click(drop, timeout)
		else if (toStore!='') click(toStore, timeout)
		else if (drop!='') click(drop, timeout)
		}
	}

	if (title.match('Сундук') && svitki_link!='' ) click(svitki_link, timeout)

	if ( vSunduk!='' && title.match("Рюкзак") && mark[8]==1 && fullBag && !action ) {
		if (send_to!="" && mark[11]!=1 )
		click('/user/mail/send/id/'+send_to, timeout);
		else click(naGlavnuy, timeout)
	}
	if (title.match("Рюкзак")) click(openstore, timeout)

	if (!action && title.match("Сундук")) 
	{
		for (var i=0;i<=12;i++) {if (SetScroll[i]==1 && (Scrolls[i]==0 || /нет/.test(Scrolls[i]))) {Scrolls[i]=(comp_time+rNum(1000, 3600))+"нет"}}
		sessionStorage.scrolls=Scrolls
		goToAbilities_()
	}

	if ( (fullBag || (bag_better && mark[15]==0 )) && !InEvents && !Boss) goToBag_();

	if (!title.match(/Рюкзак|Сундук|Мои умения/i) && (!strateg || mark[18]==0) && (sessionStorage.user.match('премиум')||mark[11]==0) )
	{
		for (var i=0;i<=12;i++) {if (SetScroll[i]==1 && Scrolls[i]==0 ) {goToBag_(); break;}}
	}
		function goToAbilities_()
		{	mark[22]=1
			if (title.match("Мои умения")) mark[22]=0;
			else if (title.match("Мой герой") && abilities!='') click(abilities, timeout)
			else if ((InTowers || err_d) && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) ) click(naGlavnuy, timeout)
			else click(user, timeout)
		}
		function goToBag_()
		{
			if ((InTowers || err_d) && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) ) click(naGlavnuy, timeout)
			else if (bag!='') click(bag, timeout)
			else click(user, timeout)
		}
      }
  }
}

function ItemsSet_()
{
	if ( title.match("Моё снаряжение"))
	{	
		sessionStorage.SetItems=''
	
		for (var i=3;i>0;i--) {
			if (rus_t.match("Надеть комплект "+i)) {sessionStorage.SetItems=i+" ";break;}
			else sessionStorage.SetItems="0 "
		}
		for (var i=1;i<=3;i++) {if (itemsSetLink[i]==undefined && rus_t.match('Надеть комплект '+i)) sessionStorage.SetItems+=i+',';}

		if (!rus_t.match('Переодеваться в бою нельзя') ) 
			for (var i=1;i<=3;i++) {if (sessionStorage.setItem==i && itemsSetLink[i]!=undefined) {mark[2]=1; click(a[itemsSetLink[i]], timeout);}}
		else click(user, timeout)
		sessionStorage.removeItem("setItem")
	}
	if (sessionStorage.SetItems==undefined) {
		if (InTowers) click(naGlavnuy, timeout)
		else click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=sessionStorage.setItem && title.match('Варвары') && sessionStorage.setItem !=0 && sessionStorage.setItem!=undefined && !action ) {
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[0] && InTowers && !sessionStorage.SetItems.match(Item_Set_N[0]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[0];
		click(naGlavnuy, timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[1] && title.match('Арена') && attack1=='' && !rus_t.match(/через (\d+) сек/) &&  !sessionStorage.SetItems.match(Item_Set_N[1]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[1];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[2] && vzamok=='' && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_Set_N[2]+",") && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/) && !action ) {
		sessionStorage.setItem=Item_Set_N[2];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[3] && title.match(/Турнир героев|Командный турнир/) && attack1=='' && !sessionStorage.SetItems.match(Item_Set_N[3]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[3];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[4] && title.match('Выживание') && attack1=='' && !rus_t.match(/через (\d+) сек/) &&  !sessionStorage.SetItems.match(Item_Set_N[4]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[4];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[5] && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_Set_N[5]+",") && title.match('Территория') && !action ) {
		sessionStorage.setItem=Item_Set_N[5];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[6] && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_Set_N[6]+",") && title.match('Битва героев') && !action ) {
		sessionStorage.setItem=Item_Set_N[6];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[7] && title.match('Поля сражений') && attack1=='' && Item_Set_N[7]!=0 && !sessionStorage.SetItems.match(Item_Set_N[7]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[7];
		click('/user/body', timeout);}

	else if (sessionStorage.SetItems[0]>=Item_Set_N[8] && Boss && attack1=='' && heal=='' && !sessionStorage.SetItems.match(Item_Set_N[8]+",") && !action) {
		sessionStorage.setItem=Item_Set_N[8];
		click('/user/body', timeout);}
	
	else if (sessionStorage.SetItems[0]>=Item_Set_N[10] && attack1=='' && !sessionStorage.SetItems.match(Item_Set_N[10]+",") && title.match(/Цари (Г|г)оры/) && !action) {
		sessionStorage.setItem=Item_Set_N[10];
		click('/user/body', timeout);}

	if ( mark[2]==1 && !action) {mark[2]=0; click(user, timeout)}

	function goToBody_(x){
		if (x!=undefined && title.match("Моё снаряжение")) {
			if (sessionStorage.SetItems[0]>=x) {}
		}
		else if (title.match("Мой герой") && body!='') click(body, timeout)
		else if (InTowers) click(naGlavnuy, timeout)
		else click(naGlavnuy, timeout)
	}
}


function repair()
{
	if (!InEvents && !Boss )
	{
		if (title.match("Моё снаряжение")) {
			if (rus_t.match(/не хватает железа/i) && mark[10]==2) {alert("Не хватает железа"); action=true}
			else if (pochinit_vse!='' && pochinit_vse_za>=chinit_vse && mark[10]==0) {mark[10]=1; click(pochinit_vse, timeout);}
			else if (pochinit!='') { mark[10]=2; click(pochinit, timeout);}
			else if (pochinit=='') mark[10]=0
		}
		else if (clothes_broken) {
			if (InTowers) click(naGlavnuy, timeout)
			else if (body!='') click(body, timeout)
		}
	}
}


function altar_()
{
	if ( title.match("Алтарь клана") ) {
		var reg1=/Твой бонус: \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i
		if (reg1.test(rus_t)) {bonus[8]=getSec(f_time.exec(reg1.exec(rus_t)))+comp_time;}
		else {mark[16]=comp_time+rNUm(1000, 3600); click(naGlavnuy, timeout)}
	}
	if ( title.match("Мой герой") && altar!='' ) 
	{
		var reg2=/алтарь \+(\d+)(\.)?(\d+)?% \[(\d+):(\d+):(\d+)/i
		if ( rus_t.match("алтарь не активен") ) bonus[8]=0;
		else if (reg2.test(rus_t)) {
			at=f_time.exec(reg2.exec(rus_t));
			bonus[8] = getSec(at)+comp_time
		}else {mark[16]=comp_time+rNUm(1000, 3600); click(naGlavnuy, timeout)}
	}
	if (SetAltar>0 && (sessionStorage.user.match('премиум')||mark[11]==0) && mark[16]==0 && klan!='') {
		if (altar!='' && (Boss || InEvents)) click(altar, timeout)
		else {alttime=bonus[8]-comp_time
		if ( (alttime<300 && title.match("Алтарь клана")) || (alttime<100 && title.match("Мой герой")) || alttime<=0) getAltar_()		
		}
	}
	function getAltar_(){
		if (title.match("Мой герой") && altar!='') click(altar, timeout)
		else if (InTowers) click(user, timeout)
		else if (title.match("Алтарь клана")) {
			if (SetAltar==1 && altarZAjelezo!='' && alttime<300)       {mark[16]=comp_time+300; click(altarZAjelezo, timeout)}
			else if (SetAltar==2 && altarZAserebro!='' && alttime<300) {mark[16]=comp_time+300; click(altarZAserebro, timeout)}
			else if (SetAltar==3 && altarZamki!='' && alttime<300)     {mark[16]=comp_time+300; click(altarZamki, timeout)} 
			else if (SetAltar==4 && altarZamkivse!='' && alttime<300)  {mark[16]=comp_time+300; click(altarZamkivse, timeout)}
		}
		else if (!Boss && vboy=='' && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) )  click(user, timeout)
	}
	if (klan=='') {bonus[8]=0; mark[16]=0}
	sessionStorage.bonus=bonus
}




function baf_zamkov()
{
	if (title.match('Бонус замка'))
	{
		for (var i=0;i<=7;i++) {
			var reg=new RegExp(castle_name[i]+" \\[(\\d+):(\\d+):(\\d+)", "i")
			if (reg.test(rus_t)) {bonus[i]=getSec(reg.exec(rus_t))+comp_time;}
		}
	}
	var tt=200;
	if ( vzamok!='' && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i))
	{
		if (nochar!='') mark[19]=1;
		var reg=/Твой текущий бонус: ((шанс (\d+)% )|(\+(\d+)% (\D+)?\s?))\[(\d+):(\d+):(\d+)/i
		if (reg.test(rus_t)) {
			tt=getSec(f_time.exec(reg.exec(rus_t)));
			for (var i=0;i<=7;i++) {if (title.match(castle_name[i])) bonus[i]=tt+comp_time; }
		} 
	}

	for (var i=0;i<=7;i++) {if (title.match(castle_name[i]) && SetBonus[i]==1 && getbaf!='' && tt<120 && mark[11]==0) {click(getbaf, timeout); break;}}

	if ( (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) && !Boss && !title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/) && mark[11]==0)
	for (var i=0;i<=7;i++) {if (SetBonus[i]==1 && (bonus[i]-comp_time)<=0 ) click('/castle/'+(i+1)+'/', spt);}
	sessionStorage.bonus=bonus
}

function some_()
{  
  if (nick==rus_t.match(/ме.ам.н|м.ре.а/)) citaactiv=true
	var tt=200;
	if (title.match(/Башня мудрости|Статуя критона|Академия клана/i))
	{
		var reg= /Бонус клана: \+(\d+)(\.)?(\d+)?% (клан. опыта|крит|личного опыта) \[(\d+):(\d+):(\d+)]/i
		if (reg.test(rus_t)) {
			tt=getSec(f_time.exec(reg.exec(rus_t)));
			for (var i=0;i<=2;i++) {if (title.match(some_name[i])) cita[i]=tt+comp_time; }
		} 
	}

	for (var i=0;i<=2;i++) {if (title.match(some_name[i]) && SetCitadel[i]==1 && getcit!='' && tt<120) {click(getcit, timeout); break;}}

	if ( !InEvents && !Boss && citaactiv || (InEvents && noviuBoy!=''  && citaactiv))
	     if ( SetCitadel[0]==1 && (cita[0]-comp_time)<=0 ) click('/guild/citadel/temple/'+i_test+'/2/', spt);
	else if ( SetCitadel[1]==1 && (cita[1]-comp_time)<=0 ) click('/guild/citadel/temple/'+i_test+'/1/', spt);
	else if ( SetCitadel[2]==1 && (cita[2]-comp_time)<=0 ) click('/guild/citadel/temple/'+i_test+'/5/', spt);	
	sessionStorage.cita=cita
	
}

function zamki_() 
{
	if (title.match('Замки варваров')) { sessionStorage.castle_time=''
		var reg = /до захвата: (\d+):(\d+):(\d+)|идет захват|готов к захвату/ig ;
		while ((tt = reg.exec(rus_t)) != null) {
			if (/идет захват|готов к захвату/i.test(tt[0])) sessionStorage.castle_time += (comp_time + rNum(9500, 10000)) +',';
			else if (f_time.test(tt[0])) {sessionStorage.castle_time+= (getSec(f_time.exec(tt[0]))+comp_time) +',';}
		}
	}
	if ( sessionStorage.castle_time==undefined) goToCastles_()
	if ( sessionStorage.castle_time!=undefined)
	{
		var castle=sessionStorage.castle_time.split(",")
		for (var i=0;i<=7;i++) 
		{
			if (newDay) castle[i]=castle[i]-86400;
			var ct=castle[i]-comp_time
			if (castle[i]==0 && SetZamok[i]==1 ) goToCastles_(); 	
			else if (ct<=0 ) castle[i]=0;
			if (ct!='' && ct>0 && ct<240 && SetZamok[i]==1) {
				if (title.match(/Замки Варваров/i) && zamok[i]!=undefined) click(a[zamok[i]], timeout); 
				else if (title.match(castle_name[i]) && vzamok!='' ) click(vzamok, timeout, 1);
				else if (ct<240 && ct!='') goToCastles_()
			}
		}
		sessionStorage.castle_time=castle
	}
	function goToCastles_(x) {
		if (title.match('Варвары') && zamki!='') click(zamki, timeout)
		else if (!Boss && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) && vboy=='') click(naGlavnuy, timeout);
	}
}




function goToBoss_(){

	if (title.match(/Пещеры и драконы/i))
	{
		for (var i=0;i<=9;i++) {
			var reg = new RegExp(dung_name[i]+" воскреснет через (\\d+):(\\d+):(\\d+)", "i") ;
			if (reg.test(rus_t) && i!=3 ) { 
				dungeon[i]=getSec(reg.exec(rus_t))+comp_time
				if (sessionStorage.goToBoss==i) sessionStorage.removeItem("goToBoss");
			}
			else if (rus_t.match(dung_name[i])) dungeon[i]=0;
			else mpage("Пещеры")
		}
		sessionStorage.dungeons=dungeon
	}
	if (title.match(/Пещера мантикоры|Легендарный дракон/i) && attack1=='' && heal=='') 
	{
		if (dungeon[11]==0) dungeon[11]=comp_time+rNum(120, 250)
		else if (dungeon[11]<comp_time) 
		{
			if (title.match(/Пещера мантикоры/i)) dungeon[1]=comp_time+rNum(200, 500)+"нет";		
			if (title.match(/Легендарный дракон/i)) dungeon[2]=comp_time+rNum(200, 500)+"нет";
			dungeon[11]=0
			click(naGlavnuy, timeout)
		}
	}
	else dungeon[11]=0
	sessionStorage.dungeons=dungeon

	if (err_d || (title.match(/Вход закрыт/i) && rus_t.match(/разрешен только членам кланов/i))) {sessionStorage.removeItem("goToBoss"); click(naGlavnuy, obnovlenie);}

	if ( SetIronDragon && strong>1200 && dungeon[2]==0 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=2
	else if ( SetManticora && dungeon[1]==0 && lvl>20 && sessionStorage.goToBoss==undefined ) sessionStorage.goToBoss=1

	if (vboy=='' &&  (!InEvents || vdolinu) && sessionStorage.goToBoss!=undefined ) vPesheru(sessionStorage.goToBoss)

	function vPesheru(x){
		var reg=new RegExp(dung_name[x], "i")
		if (title.match(reg)) sessionStorage.removeItem("goToBoss");
		else if (dungeon[x]==0) {
			if (x==9) {
				if (title.match('Варвары')) click(bashni, timeout)
				else if (title.match('столица') && ushelie!='') click(ushelie, timeout)
				else if (title.match(/Ущелье (Я|Э)питера/) && straznik!='' && nextTower) click(straznik, spt, 1)
				else if (title.match(/Ущелье (Я|Э)питера/) && attackTowers!='') click(attackTowers, CDTAttack, 1)
				else if (title.match('Стражник') && attack_strazh!='') click(attack_strazh, CDTAttack, 1)
				else if (title.match('Стражник') && dolina!='' && attack_strazh=='' && nextTower ) {sessionStorage.removeItem("goToBoss"); click(dolina, spt)}
				else if (rus_t.match("Вход в Долину Великанов")) sessionStorage.removeItem("goToBoss");
				else if (!title.match(/Стражник|Ущелье (Япитера|Эпитера)|столица|Варвары/i) && !Boss) click(naGlavnuy, timeout)
			}
			else if (title.match('Варвары') && DND!='') click(DND, timeout)
			else if (title.match('Пещеры и драконы') && x!=undefined && peshera[x]!=undefined ) {sessionStorage.removeItem("goToBoss"); click(a[peshera[x]], timeout);}
			else if (!Boss) click(naGlavnuy, timeout)
		}
		else sessionStorage.removeItem("goToBoss");
	}
}



function territory_()
{
	if (mark[3]!=1) 
	for (var i=0;i<document.getElementsByTagName("strong").length;i++)
	{
		var strong_txt=en_ru(replace_(document.getElementsByTagName("strong")[i].textContent))
		if (strong_txt.match(/Объявление (клана|альянса)/i)) 
		{
			if ((strong_txt.match(/Объявление альянса/i) && sessionStorage.territory==undefined) || strong_txt.match(/Объявление клана/i))
			for (var i=0;i<document.getElementsByClassName('info').length;i++)
			{
				var info_txt=en_ru(replace_(document.getElementsByClassName('info')[i].textContent))
				if (info_txt.match(Setdrak))  {sessionStorage.goToBoss=4; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(Setnema)) {sessionStorage.goToBoss=5; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(Settrol)) {sessionStorage.goToBoss=6; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(Setzod)) {sessionStorage.goToBoss=7; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(Setvel)) {sessionStorage.goToBoss=9; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(Setpred)) {sessionStorage.goToBoss=10; if (title.match(/Арена|Выживание/)) click(naGlavnuy, timeout)};
				if (info_txt.match(/перевал/i))		{sessionStorage.territory=1; if (title.match(/Арена|Выживание/)) click('/territory/1/', timeout)};
				if (info_txt.match(/горы/i))		{sessionStorage.territory=2; if (title.match(/Арена|Выживание/)) click('/territory/2/', timeout)};
				if (info_txt.match(/холм/i))		{sessionStorage.territory=3; if (title.match(/Арена|Выживание/)) click('/territory/3', timeout)};
				if (info_txt.match(/лес/i))		{sessionStorage.territory=4; if (title.match(/Арена|Выживание/)) click('/territory/4', timeout)};
				if (info_txt.match(/пустын/i))		{sessionStorage.territory=5; if (title.match(/Арена|Выживание/)) click('/territory/5', timeout)};
				if (info_txt.match(/озер/i))		{sessionStorage.territory=6; if (title.match(/Арена|Выживание/)) click('/territory/6', timeout)};
				if (info_txt.match(/топ(и|ь|ей)/i))	{sessionStorage.territory=7; if (title.match(/Арена|Выживание/)) click('/territory/7', timeout)};
				if (info_txt.match(/камн(и|eй)/i))	{sessionStorage.territory=8; if (title.match(/Арена|Выживание/)) click('/territory/8', timeout)};
				if (info_txt.match(/степ(и|ь|eй)/i))	{sessionStorage.territory=9; if (title.match(/Арена|Выживание/)) click('/territory/9', timeout)};
				if (info_txt.match(/долин(а|ы|у|е)/i))	{sessionStorage.territory=10; if (title.match(/Арена|Выживание/)) click('/territory/10', timeout)};
				if (info_txt.match(/скал/i))		{sessionStorage.territory=11; if (title.match(/Арена|Выживание/)) click('/territory/11', timeout)};
				if (info_txt.match(/земли|земель/i))	{sessionStorage.territory=12; if (title.match(/Арена|Выживание/)) click('/territory/12', timeout)};
				if (info_txt.match(/остров/i))		{sessionStorage.territory=13; if (title.match(/Арена|Выживание/)) click('/territory/13', timeout)};
				if (info_txt.match(Setstop) && (InTowers||InEvents||Boss)) 
					{
					if (klan!=''){ 
				   sessionStorage.goToChat=1; 
				   click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout)}
					else sessionStorage.goToChat=0;   
					}
				if (info_txt.match(SetSbros)) {sessionStorage.removeItem('territory'); mark[3]=1}
			}
		}
	}
	if ((title.match("Вход закрыт") && rus_t.match(/Война за территории доступна только для клановых игроков|Набег начался, Вы не успели/i))||rus_t.match("Финальная битва!")) {sessionStorage.removeItem('territory'); mark[3]=1}

	if (title.match('Территория') && na_terr!='') click(na_terr, timeout)
		else if ( !Boss && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) && vboy=='' && sessionStorage.territory!=undefined && server_time[1].match(/14|17|20/) && server_time[2]>=27 && server_time[2]<=59 ) 
			click('/territory/'+sessionStorage.territory+'/')

	if (server_time[1]<14 || ( server_time[1]>14 && server_time[1]<17 ) || (server_time[1]>17 && server_time[1]<20 ) || server_time[1]>20) {sessionStorage.removeItem('territory'); mark[3]=0;}
}

function battle_()
{
var rand=rNum(4)

	if ( (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) && !Boss && vboy=='' )
	{
		if ( SetCari && lvl>=25 && server_time[1]==19 && server_time[2]>=56) {
			if (title.match('Варвары') && cargori!='') click(cargori, timeout)
			else click(naGlavnuy, timeout)
		}	
		if ( BattleGround  && server_time[2]>=56 && lvl>=25 && mark[4]!=1) {
			if (title.match('Варвары') && bg!='') click(bg, timeout)
			else click(naGlavnuy, timeout)
		}
		if ((tournament==1 || tournament==2) && mark[9]!=1 && /10|15|21/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 )
			click('/game/tournament/0/1/', spt); 
		
		if ((tournament==2 || tournament==3) && mark[9]!=1 && /12|19|23/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 )
			click('/game/tournament/0/2/', spt);
	
		if ( SetBattle && mark[9]!=1 && /13|18/.test(server_time[1]) && server_time[2]>=25 && server_time[2]<30 ) {
			if (title.match('Варвары') ) click('/game/battle', timeout)
			else click(naGlavnuy, timeout)
		}
		if ( SetLogovo && /11|16|22|00/.test(server_time[1]) && server_time[2]>=26 && server_time[2]<30 && lvl>=25 )
		{
			if (InTowers||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) click(naGlavnuy, timeout)
			if (SetAbilities && !action)
			if (sessionStorage.abilities[0]>=Abilities_N[9] && !sessionStorage.abilities.match(Abilities_N[9]+",") && SetAbilities) {
				sessionStorage.setAbil=Abilities_N[9];
				click('/user/abilities', timeout); }
			if (SetItem && !action)
			if (sessionStorage.SetItems[0]>=Item_Set_N[9] && !sessionStorage.SetItems.match(Item_Set_N[9]+",") && SetItem) {
				sessionStorage.setItem=Item_Set_N[9];
				click('/user/body', timeout); }
			if (!action) sessionStorage.goToBoss=3
		}
		if ( resurectionTower==9 && !title.match(/Арена|Выживание/) && lvl>=25 ) {
			if (title.match('Варвары') && survival!='') click(survival, timeout)
			else click(naGlavnuy, timeout)
		}		
		if ( resurectionTower==10 && !title.match(/Арена|Выживание/) && lvl>=25 ) {
			if (title.match('Варвары') && arena!='') click(arena, timeout)
			else click(naGlavnuy, timeout)
		}

	}
	if ( title.match("Поля сражений") && (server_time[2]<55) && (server_time[3]>3) ) click(naGlavnuy, obnovlenie);
	else if ( leviyBereg!='' && title.match(/Южный Порт|Северная Крепость/) && ( rand==1 || rand==2 ) ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(leviyBereg, obnovlenie, 1);
	}
	else if ( praviuBereg!='' && title.match(/Южный Порт|Северная Крепость/) ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(praviuBereg, obnovlenie, 1);
	}
	//OBS='', ZVrataSevera='', CVrataSevera='', VVrataSevera='', SZSklon='', SPereval='', SVUtes='', UZSklon='', UPlato='', UVUtes='', ZVrataUga='', CVrataUga='', VVrataUga='';
	else if ( OBS!='' && title.match(/Южный Порт|Северная Крепость/) && rand==1 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(OBS, obnovlenie, 1);
	}
	else if ( ZVrataSevera!='' && title.match(/Южный Порт|Северная Крепость/) && rand==2 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(ZVrataSevera, obnovlenie, 1);
	}
	else if ( CVrataSevera!='' && title.match(/Южный Порт|Северная Крепость/) && rand==3 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(CVrataSevera, obnovlenie, 1);
	}
	else if ( VVrataSevera!='' && title.match(/Южный Порт|Северная Крепость/) && rand==4 ) {
		if (!rus_t.match(/через (\d+) сек/)) obnovlenie=spt
		click(VVrataSevera, obnovlenie, 1);
	}
	if (server_time[2]<55) mark[4]=0
}


function ReadMessages()
{
	if ( title.match("Сообщение для ") && getlink!='') click(getlink, timeout);
	else if ( title.match("Почта") && message=='' && mail!='' && nov!='') click(nov, timeout);
	else if ( title.match("Новые") && message=='' && mail!='' && nov=='' && markletter!='') click(markletter, timeout);
	else if ( title.match(/Почта|Новые/) && message!='' ) click(message, timeout);
	else if ( InTowers && rNum(4)>0) click(naGlavnuy, timeout);
	else if ( !InTowers  && mail!='' && (!InEvents||(title.match(/Арена|Выживание/)&&pokinutOchered==""&&(noviuBoy!=""||vstatVochered!=""||rus_t.match("Вы погибли, ждите окончания боя")))) && !Boss) click(mail, timeout);
}

function proverka_loga()
{

var dmgRegexp= new RegExp('Вы промахнулись|Лечить некого|'+nick+' (ударил|полечил) (\\D+)\s?(\\D+)?\s?(\\D+)? (по кам. щиту )?на (\\d+) (крит)?|'+nick+' сжёг (\\d+) (крит)?', "i"); 

	if (sessionStorage.missed==undefined) sessionStorage.missed=0;

	if (dmgRegexp.test(rus_t) && !firstvalue && sessionStorage.perehod==0)
	{
		var firstvalue=(dmgRegexp.exec(rus_t))[0]
		if (/Вы промахнулись/.test(firstvalue) ){
			if (sessionStorage.perehod!=1) sessionStorage.missed++
			if ( vrag_med=='0' && vrag_mech=='0' ) sessionStorage.perehod=1;
		}
		else if (/Лечить некого/.test(firstvalue)){
			sessionStorage.perehod=1; 
			nekogo_lechit=true;
		}
		else if (dmgRegexp.test(rus_t)){
			var dmg=/\d+/.exec(firstvalue);
			if (/крит/.test(firstvalue)) dmg=dmg*0.7; 
			if (/полечил/.test(firstvalue)) dmg=dmg*0.7; 
			if ((/по кам/.test(firstvalue) && !pronik && (HP_vraga>500)) || dmg==0) bad_target=true;
			if (/по эн. щиту/.test(firstvalue) && !pronik && (dmg<Number(strong*0.07)) ) bad_target=true;
			else if (dmg<Number(strong*0.08)) sessionStorage.missed++
			else if (Number(sessionStorage.missed)>=1) sessionStorage.missed--	
		}
	}

	for (var i=0;i<span.length;i++) 
	{	
		var span_i=en_ru(replace_(span[i].textContent))
		if (Set_chat && klan!='' && !title.match("Почта") )
		{
			if (span_i.match(Setdrak) && InTowers ) sessionStorage.goToBoss=4;
			if (span_i.match(Setnema) && InTowers ) sessionStorage.goToBoss=5;
			if (span_i.match(Settrol) && InTowers ) sessionStorage.goToBoss=6;
			if (span_i.match(Setzod) && InTowers ) sessionStorage.goToBoss=7;
			if (span_i.match(Setvel) && InTowers ) sessionStorage.goToBoss=9;
			if (span_i.match(Setpred) && InTowers ) sessionStorage.goToBoss=10;
			if (span_i.match(SetExit) && Boss ) {sessionStorage.removeItem("goToBoss"); click(naGlavnuy, timeout)}
			if (span_i.match(Setstop) && (InTowers||InEvents||Boss)) 
				{
			    if (klan!=''){ 
				   sessionStorage.goToChat=1; 
				   click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout)}
				else sessionStorage.goToChat=0;   
				}
			if (span_i.match(Setbash) && title.match("Чат клана")) sessionStorage.goToChat=0;
			if (span_i.match(Setvzam) && InTowers) sessionStorage.removeItem('castle_time');
		}
			if (klan!='' && !title.match("Почта") )
		{
			if (span_i.match("Тысяча Гор") && (InTowers||title.match(/Территория/i)) && !title.match(/Тысяча Гор/i)) click('/territory/2/', timeout)
		    if (span_i.match("Пепельная Пустыня") && (InTowers||title.match(/Территория/i)) && !title.match(/Пепельная Пустыня/i)) click('/territory/5/', timeout)
		    if (span_i.match("Седые Холмы") && (InTowers||title.match(/Территория/i)) && !title.match(/Седые Холмы/i)) click('/territory/3/', timeout)
		   	if (span_i.match("Грозовой Перевал") && (InTowers||title.match(/Территория/i)) && !title.match(/Грозовой Перевал/i)) click('/territory/1/', timeout)
	    	if (span_i.match("Черное Озеро") && (InTowers||title.match(/Территория/i)) && !title.match(/Черное Озеро/i)) click('/territory/6/', timeout)
	    	if (span_i.match("Могильные Топи") && (InTowers||title.match(/Территория/i)) && !title.match(/Могильные Топи/i)) click('/territory/7/', timeout)
	    	if (span_i.match("Покинутые Степи") && (InTowers||title.match(/Территория/i)) && !title.match(/Покинутые Степи/i)) click('/territory/9/', timeout)
	    	if (span_i.match("Голые Камни") && (InTowers||title.match(/Территория/i)) && !title.match(/Голые Камни/i)) click('/territory/8/', timeout)
	    	if (span_i.match("Каменный Лес") && (InTowers||title.match(/Территория/i)) && !title.match(/Каменный Лес/i)) click('/territory/4/', timeout)
	      	if (span_i.match("Забытая Долина") && (InTowers||title.match(/Территория/i)) && !title.match(/Забытая Долина/i)) click('/territory/10/', timeout)
	    	if (span_i.match("Черные Скалы") && (InTowers||title.match(/Территория/i)) && !title.match(/Черные Скалы/i)) click('/territory/11/', timeout)
	    	if (span_i.match("Выжженные земли") && (InTowers||title.match(/Территория/i)) && !title.match(/Выжженные земли/i)) click('/territory/12/', timeout)
	     	if (span_i.match("Мертвый остров") && (InTowers||title.match(/Территория/i)) && !title.match(/Мертвый остров/i)) click('/territory/13/', timeout)

	    }	
	
		if (span[i].style.color.match('chocolate') && span_i.match(/ударил Вас (по кам. щиту |по эн. щиту )?на (\d+) (крит)?/i) && !span_i.match(/(Стражник|Геррод) ударил Вас/i)) 
		{
			if (sessionStorage.lasttimeDMG==undefined) sessionStorage.lasttimeDMG=comp_time
			var otrajenie=false
			if (span[i].getElementsByTagName('a')[0]!=undefined) 
			{
				var opponent=span[i].getElementsByTagName('a')[0].textContent
				var Regship= new RegExp(span_i+' ?'+opponent+' ?применил (шипованную броню|отражение)', 'ig')
				if (rus_t.match(Regship)) {
					otrajenie=true;
					if (InEvents) bad_target=true }
			}
			if (!otrajenie) {
				if (sessionStorage.lastDMG!=span_i) {sessionStorage.lastDMG=span_i; sessionStorage.lasttimeDMG=comp_time;damage=true;}
				else if ((comp_time-sessionStorage.lasttimeDMG)<15) damage=true;
				break;
			}
		}
	}
}




function searchPoint()
{
	switch(true)
	{
	case lvl>0 && lvl<8 && resurectionTower==0 && mark[5]!=1:
		click(kurgan, timeout, 1);
	 	break;
	case lvl>2 && lvl<14 && resurectionTower==1 && mark[5]!=1:
		search_point_Lager_Vikingov();
	 	break;
	case lvl>8 && lvl<19 && resurectionTower==2 && mark[5]!=1:
		search_point_Delta_Reki();
		break;
	case lvl>13 && lvl<25 && resurectionTower==3 && mark[5]!=1:
		search_point_Lednik();
		break;
	case lvl>19 && lvl<33 && resurectionTower==4 && mark[5]!=1:
		search_point_Severnaya_Pustosh();
		break;
	case lvl>30 && lvl<41 && resurectionTower==5 && mark[5]!=1:
		search_point_Rosengard();
		break;
	case lvl>29 && lvl<46 && resurectionTower==6 && mark[5]!=1:
		search_point_GorodMertvih();
		break;
	case lvl>39 && lvl<51 && resurectionTower==7 && mark[5]!=1:
		search_point_ZT();
		break;
	case lvl>49 && lvl<56 && resurectionTower==8 && mark[5]!=1:
		search_point_DS();
		break;
	case lvl>0 && lvl<8:
		click(kurgan, timeout, 1);
	 	break;
	case lvl>2 && lvl<14:
		search_point_Lager_Vikingov();
	 	break;
	case lvl>8 && lvl<19:
		search_point_Delta_Reki();
		break;
	case lvl>13 && lvl<25:
		search_point_Lednik();
		break;
	case lvl>19 && lvl<33:
		search_point_Severnaya_Pustosh();
		break;
	case lvl>30 && lvl<41:
		search_point_Rosengard();
		break;
	case lvl>39 && lvl<46:
		search_point_GorodMertvih();
		break;
	case lvl>44 && lvl<51:
		search_point_ZT();
		break;	
	case lvl>50 && lvl<56:
		search_point_DS();
		break;
	default:;
	}
}

function search_point_Lager_Vikingov()
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(lagerOrdi, timeout, 1); click(lagerVikingov, timeout, 1);}

	if (title.match("Лагерь викингов")) click(lagerOrdi, spt, 1);
	if (title.match("Лагерь орды")) click(lagerVikingov, spt, 1);
}

function search_point_Delta_Reki()
{
if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(usteReki, timeout, 1); click(deltaReki, timeout, 1);}	
	var delta_reki=rNum(2);	
	
	if (title.match("Дельта реки"))
	{
		if (!storona) {
			if ((delta_reki==0)&& nextTower ) click(leviyBereg, spt, 1);
			else if (nextTower) click(praviuBereg, spt, 1);
		} else {
			if (delta_reki==0) click(leviyBereg, spt, 1);
			else click(praviuBereg, spt, 1);
		}
	}
	if (title.match("Левый берег"))
	{
		if (!storona) {
			if ((delta_reki==0)&& nextTower ) click(usteReki, spt, 1);
			else click(deltaReki, spt, 1);				
		} else {
			if ((delta_reki==0)&& nextTower ) click(deltaReki, spt, 1);
			else click(usteReki, spt, 1);
		}
	}
	if (title.match("Правый берег"))
	{
		if (!storona) {
			if ((delta_reki==0)&& nextTower ) click(usteReki, spt, 1);
			else click(deltaReki, spt, 1);				
		} else {
			if ((delta_reki==0)&& nextTower ) click(deltaReki, spt, 1);
			else click(usteReki, spt, 1);
		}
	}
	if (title.match("Устье реки"))
	{
		if (!storona) {
			if (delta_reki==0) click(leviyBereg, spt, 1);
			else click(praviuBereg, spt, 1);
		} else {
			if ((delta_reki==0)&& nextTower ) click(leviyBereg, spt, 1);
			else if (nextTower) click(praviuBereg, spt, 1);
		}
	}
}

function search_point_Lednik() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(gornoeOzero, timeout, 1); click(lednik, timeout, 1);}

	var lednik_rand=rNum(3);	

	if (title.match("Ледник"))
	{
		if (!storona) {
			if ( nextTower &&(lednik_rand<2)) click(ledyaniePesheri, spt, 1);
			else if (nextTower) click(verhniuPereval, spt, 1);
		} else {
			if (lednik_rand<2) click(ledyaniePesheri, spt, 1);
			else click(verhniuPereval, spt, 1);
		}
	}	
	if (title.match("Ледяные пещеры"))
	{
		if (!storona) {
			if ( nextTower &&(lednik_rand<1)) click(kamenniePesheri, spt, 1);
			else if ( nextTower &&(lednik_rand<3)) click(nijniuPereval, spt, 1);
			else click(lednik, spt, 1);
		} else {			
			if ( nextTower &&(lednik_rand==0)) click(lednik, spt, 1);
			else if (lednik_rand==1) click(nijniuPereval, spt, 1);
			else click(kamenniePesheri, spt, 1);
		}
	}
	if (title.match("Каменные пещеры"))
	{
		if (!storona) {
			if (lednik_rand==0) click(ledyaniePesheri, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(gornoeOzero, spt, 1);
			else click(verhniuPereval, spt, 1);
		} else {
			if ( nextTower &&(lednik_rand==0)) click(ledyaniePesheri, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(verhniuPereval, spt, 1);
			else click(gornoeOzero, spt, 1);
		}
	}
	if (title.match("Верхний перевал"))
	{
		if (!storona) {
			if ( nextTower &&(lednik_rand==0)) click(nijniuPereval, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(kamenniePesheri, spt, 1);
			else click(lednik, spt, 1);
		} else {
			if ( nextTower &&(lednik_rand==0)) click(lednik, spt, 1);
			else if (lednik_rand==1) click(kamenniePesheri, spt, 1);
			else click(nijniuPereval, spt, 1);
		}	
	}
	if (title.match("Нижний перевал"))
	{
		if (!storona) {
			if ( nextTower &&(lednik_rand==0)) click(gornoeOzero, spt, 1);
			else if (lednik_rand==1) click(verhniuPereval, spt, 1);
			else click(ledyaniePesheri, spt, 1);
		} else {
			if ( nextTower &&(lednik_rand==0)) click(ledyaniePesheri, spt, 1);
			else if ( nextTower &&(lednik_rand==1)) click(verhniuPereval, spt, 1);
			else click(gornoeOzero, spt, 1);
		}
	}
	if (title.match("Горное озеро"))
	{
		if (!storona) {
			if (lednik_rand<2) click(kamenniePesheri, spt, 1);
			else click(nijniuPereval, spt, 1);
		} else {
			if ( nextTower &&(lednik_rand<2)) click(kamenniePesheri, spt, 1);
			else if (nextTower) click(nijniuPereval, spt, 1);
		}
	}
}

function search_point_Severnaya_Pustosh() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(UPustosh, timeout, 1); click(SPustosh, timeout, 1);}

  var sev_pustosh=rNum(4);

	if (title.match("Северная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh<2)) click(SZPustosh, spt, 1);
			else if (nextTower) click(SVPustosh, spt, 1);
		} else {
			if (sev_pustosh<2) click(SZPustosh, spt, 1);
			else click(SVPustosh, spt, 1);
		}
	}
	if (title.match("Северо-восточная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh==0)) click(VPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestok, spt, 1);
			else click(SPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh==0)) click(SPustosh, spt, 1);
			else if (sev_pustosh==1) click(perekrestok, spt, 1);
			else click(VPustosh, spt, 1);
		}
	}
	if (title.match("Восточная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh<2)) click(UVPustosh, spt, 1);
			else click(SVPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh<2)) click(SVPustosh, spt, 1);
			else click(UVPustosh, spt, 1);
		}
	}
	if (title.match("Юго-восточная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh==0)) click(UPustosh, spt, 1);
			else if (sev_pustosh==1) click(perekrestok, spt, 1);
			else click(VPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh==0)) click(VPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestok, spt, 1);
			else click(UPustosh, spt, 1);
		}
	}
	if (title.match("Перекрёсток"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh==0)) click(UVPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(UZPustosh, spt, 1);
			else if (sev_pustosh==2) click(SVPustosh, spt, 1);
			else click(SZPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh==0)) click(SZPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(SVPustosh, spt, 1);
			else if (sev_pustosh==2) click(UZPustosh, spt, 1);
			else click(UVPustosh, spt, 1);
		}
	}
	if (title.match("Северо-западная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh==0)) click(ZPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestok, spt, 1);
			else click(SPustosh, spt, 1);		
		} else {
			if ( nextTower &&(sev_pustosh==0)) click(SPustosh, spt, 1);
			else if (sev_pustosh==1) click(perekrestok, spt, 1);
			else click(ZPustosh, spt, 1);
		}
	}
	if (title.match("Западная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh<2)) click(UZPustosh, spt, 1);
			else click(SZPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh<2)) click(SZPustosh, spt, 1);
			else click(UZPustosh, spt, 1);
		}
	}
	if (title.match("Юго-западная пустошь"))
	{
		if (!storona) {
			if ( nextTower &&(sev_pustosh==0)) click(UPustosh, spt, 1);
			else if (sev_pustosh==2) click(perekrestok, spt, 1);
			else click(ZPustosh, spt, 1);

		} else {
			if ( nextTower &&(sev_pustosh==0)) click(ZPustosh, spt, 1);
			else if ( nextTower &&(sev_pustosh==1)) click(perekrestok, spt, 1);
			else click(UPustosh, spt, 1);
		}
	}
	if (title.match("Южная пустошь"))
	{
		if (!storona) {
			if (sev_pustosh<2) click(UZPustosh, spt, 1);
			else click(UVPustosh, spt, 1);
		} else {
			if ( nextTower &&(sev_pustosh<2)) click(UZPustosh, spt, 1);
			else if (nextTower) click(UVPustosh, spt, 1);
		}
	}
}

function search_point_Rosengard() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(marokand, timeout, 1); click(rosengard, timeout, 1);}	

  var rosengard_=rNum(4);

if (title.match("Мароканд"))
	{
		if (!storona) {
			if (rosengard_<2) click(Vmarokand, spt, 1);
			else click(Zmarokand, spt, 1);
		} else {
			if ( nextTower &&(rosengard_<2)) click(Vmarokand, spt, 1);
			else if (nextTower) click(Zmarokand, spt, 1);
		}	
	}
 if (title.match("Восточный Мароканд"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_<2)) click(marokand, spt, 1);
			else click(BKurgan, spt, 1);			
		} else {
			if ( nextTower &&(rosengard_<2)) click(BKurgan, spt, 1);
			else click(marokand, spt, 1);
		}
	}
 if (title.match("Западный Мароканд"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_<2)) click(marokand, spt, 1);
			else click(BKurgan, spt, 1);
		} else {
			if ( nextTower &&(rosengard_<2)) click(BKurgan, spt, 1);
			else click(marokand, spt, 1);
		}
	}

 if (title.match("Западный Розенгард"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_<2)) click(BKurgan, spt, 1);
			else click(rosengard, spt, 1);
		} else {
			if ( nextTower &&(rosengard_<2)) click(rosengard, spt, 1);
			else click(BKurgan, spt, 1);
		}
	}
 if (title.match("Восточный Розенгард"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_<2)) click(BKurgan, spt, 1);
			else click(rosengard, spt, 1);
		} else {
			if ( nextTower &&(rosengard_<2)) click(rosengard, spt, 1);
			else click(BKurgan, spt, 1);
		}
	}
 if (title.match("Розенгард"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_<2)) click(ZRosengard, spt, 1);
			else if (nextTower) click(VRosengard, spt, 1);
		} else {
			if ( nextTower &&(rosengard_<2)) click(ZRosengard, spt, 1);
			else click(VRosengard, spt, 1);
		}
	}
 if (title.match("Большой курган"))
	{
		if (!storona) {
			if ( nextTower &&(rosengard_==0)) click(Zmarokand, spt, 1);
			else if ( nextTower &&(rosengard_==1)) click(Vmarokand, spt, 1);
			else if (rosengard_==2) click(ZRosengard, spt, 1);
			else click(VRosengard, spt, 1);

		} else {
			if ( nextTower &&(rosengard_==0)) click(ZRosengard, spt, 1);
			else if ( nextTower &&(rosengard_==1)) click(VRosengard, spt, 1);
			else if (rosengard_==2) click(Zmarokand, spt, 1);
			else click(Vmarokand, spt, 1);
		}
	}
}

function search_point_GorodMertvih() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(MGU, timeout, 1); click(MGS, timeout, 1);}

  var MG_rand=rNum(4);

 if (title.match("Мертвый город, Юг"))
	{
		if (!storona) {
			if (MG_rand==0) click(UZO, spt, 1);
			else if (MG_rand==1) click(HZ, spt, 1);
			else if (MG_rand==2) click(HO, spt, 1);
			else click(UVO, spt, 1);
		} else {

			if ( nextTower &&(MG_rand==0)) click(UZO, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(HZ, spt, 1);
			else if ( nextTower &&(MG_rand==2)) click(HO, spt, 1);
			else if (nextTower) click(UVO, spt, 1);
		}
	}

 if (title.match("Юго-западная окраина"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand<3)) click(MGU, spt, 1);
			else click(PZ, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<3)) click(PZ, spt, 1);
			else click(MGU, spt, 1);
		}
	}
	
 if (title.match("Храм огня"))
	{
		if (!storona) {
			if (MG_rand<2) click(PZ, spt, 1);
			else if ( nextTower &&(MG_rand<4)) click(MGU, spt, 1);
			else click(PV, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(PZ, spt, 1);
			else if ( nextTower &&(MG_rand<4)) click(PV, spt, 1);
			else click(MGU, spt, 1);
		}
	}
 if (title.match("Храм земли"))
	{
		if (!storona) {
			if (MG_rand<2) click(PV, spt, 1);
			else if ( nextTower &&(MG_rand<4)) click(MGU, spt, 1);
	    		else click(PR, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(PV, spt, 1);
			else if ( nextTower &&(MG_rand<4)) click(PR, spt, 1);
	    		else click(MGU, spt, 1);
		}
	}
	
 if (title.match("Юго-восточная окраина"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand<3)) click(MGU, spt, 1);
			else click(PR, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<3)) click(PR, spt, 1);
			else click(MGU, spt, 1);
		}
	}

 if (title.match("Площадь заката"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand==0)) click(UZO, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(HO, spt, 1);
	 		else if (MG_rand==2) click(SZO, spt, 1);
	  		else click(HN, spt, 1);
		} else {
			if ( nextTower &&(MG_rand==0)) click(SZO, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(HN, spt, 1);
	 		else if (MG_rand==2) click(UZO, spt, 1);
	  		else click(HO, spt, 1);
		}
	}

 if (title.match("Площадь восстания"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand==0)) click(HZ, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(HO, spt, 1);
			else if (MG_rand==2) click(HN, spt, 1);
			else click(HV, spt, 1);
		} else {
			if ( nextTower &&(MG_rand==0)) click(HN, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(HV, spt, 1);
			else if (MG_rand==2) click(HZ, spt, 1);
			else click(HO, spt, 1);
		}
	}

 if (title.match("Площадь рассвета"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand==0)) click(HZ, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(UVO, spt, 1);
			else if (MG_rand==2) click(HV, spt, 1);
			else click(SVO, spt, 1);
		} else {
			if ( nextTower &&(MG_rand==0)) click(HV, spt, 1);
			else if ( nextTower &&(MG_rand==1)) click(SVO, spt, 1);
			else if (MG_rand==2) click(HZ, spt, 1);
			else click(UVO, spt, 1);
		}
	}
	
 if (title.match("Северо-западная окраина"))
	{
		if (!storona) {	
			if ( nextTower &&(MG_rand<2)) click(PZ, spt, 1);
			else click(MGS, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(MGS, spt, 1);
			else click(PZ, spt, 1);
		}
	}
	
 if (title.match("Храм неба"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand<2)) click(PZ, spt, 1);
			else if ( nextTower && (MG_rand==2)) click(PV, spt, 1);
			else click(MGS, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(MGS, spt, 1);
			else if (MG_rand==2) click(PV, spt, 1);
			else click(PZ, spt, 1);
		}
	}

 if (title.match("Храм воды"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand<2)) click(PV, spt, 1);
			else if ( nextTower &&(MG_rand==2)) click(PR, spt, 1);
	 		else click(MGS, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(MGS, spt, 1);
			else if (MG_rand==2) click(PR, spt, 1);
	 		else click(PV, spt, 1);
		}
	}	

 if (title.match("Северо-восточная окраина"))
	{
		if (!storona) {
			if ( nextTower &&(MG_rand<2)) click(PR, spt, 1);
			else click(MGS, spt, 1);
		} else {
			if ( nextTower &&(MG_rand<2)) click(MGS, spt, 1);
			else click(PR, spt, 1);
		}
	}
	
   if (title.match("Мертвый город, Север"))
	{
		if ( !storona && nextTower ) {
			if (MG_rand<1) click(SZO, spt, 1);
			else if (MG_rand<2) click(HN, spt, 1);
			else if (MG_rand==2) click(HV, spt, 1);
			else click(SVO, spt, 1);
		} else {
			if (MG_rand==0) click(SZO, spt, 1);
			else if (MG_rand==1) click(HN, spt, 1);
			else if (MG_rand==2) click(HV, spt, 1);
			else click(SVO, spt, 1);
		}
	}
}

function search_point_ZT() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(ZTU, timeout, 1); click(ZTS, timeout, 1);}

  var ZT_rand=rNum(4);

 if (title.match("Земли титанов, Север"))
	{
		if (!storona) {
			if (ZT_rand<2) click(SZG, spt, 1);
			else click(SVG, spt, 1);
		} else {
			if (ZT_rand<2) click(SVG, spt, 1);
			else click(SZG, spt, 1);
		}
	}

 if (title.match("Северо-западные горы"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<1)) click(KT, spt, 1);
			else if ( nextTower &&(ZT_rand==2)) click(ZV, spt, 1);
			else click(ZTS, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<1)) click(ZTS, spt, 1);
			else if (ZT_rand==2) click(ZV, spt, 1);
			else click(KT, spt, 1);
		}
	}
	
 if (title.match("Северо-восточные горы"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<1)) click(KT, spt, 1);
			else if ( nextTower &&(ZT_rand==2)) click(VV, spt, 1);
			else click(ZTS, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<1)) click(ZTS, spt, 1);
			else if (ZT_rand==2) click(VV, spt, 1);
			else click(KT, spt, 1);
		}
	}
 if (title.match("Западные врата"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<2)) click(UZG, spt, 1);
			else click(SZG, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<2)) click(SZG, spt, 1);
			else click(UZG, spt, 1);
		}
	}
	
 if (title.match("Крепость титанов"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<1)) click(UZG, spt, 1);
			else if ( nextTower &&(ZT_rand==1)) click(UVG, spt, 1);
			else if (ZT_rand==2) click(SZG, spt, 1);
			else click(SVG, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<1)) click(SZG, spt, 1);
			else if ( nextTower &&(ZT_rand<2)) click(SVG, spt, 1);
			else if (ZT_rand==2) click(UZG, spt, 1);
			else click(UVG, spt, 1);
		}
	}

 if (title.match("Восточные врата"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<2)) click(UVG, spt, 1);
			else click(SVG, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<2)) click(SVG, spt, 1);
			else click(UVG, spt, 1);
		}
	}

 if (title.match("Юго-западные горы"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<2)) click(ZTU, spt, 1);
			else if ((ZT_rand==2)||(ZT_rand==3)) click(KT, spt, 1);
			else click(ZV, spt, 1);
		} else {
			if ( nextTower &&((ZT_rand==0)||(ZT_rand==1))) click(ZV, spt, 1);
			else if ( nextTower &&((ZT_rand==2)||(ZT_rand==3))) click(KT, spt, 1);
			else click(ZTU, spt, 1);
		}
	}

 if (title.match("Юго-восточные горы"))
	{
		if (!storona) {
			if ( nextTower && (ZT_rand<2)) click(ZTU, spt, 1);
			else if (ZT_rand<4) click(VV, spt, 1);
			else click(KT, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<2)) click(KT, spt, 1);
			else if ( nextTower &&(ZT_rand<4)) click(VV, spt, 1);
			else click(ZTU, spt, 1);
		}
	}
	
 if (title.match("Земли титанов, Юг"))
	{
		if (!storona) {
			if ( nextTower &&(ZT_rand<2)) click(UVG, spt, 1);
			else if (nextTower) click(UZG, spt, 1);
		} else {
			if ( nextTower &&(ZT_rand<2)) click(UZG, spt, 1);
			else if (nextTower) click(UVG, spt, 1);
		}
	}
}

function search_point_DS() 
{

if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) {click(DSU, timeout, 1); click(DSS, timeout, 1);}

  var DS_rand=rNum(4);

 if (title.match("Долина Сражений, Север"))
	{
		if (!storona) {
			if (DS_rand<2) click(SZF, spt, 1);
			else click(SVF, spt, 1);
		} else {
			if (DS_rand<2) click(SVF, spt, 1);
			else click(SZF, spt, 1);
		}
	}

 if (title.match("Северо западный Форт"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<1)) click(PVB, spt, 1);
			else if ( nextTower &&(DS_rand==2)) click(ZK, spt, 1);
			else click(DSS, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<1)) click(DSS, spt, 1);
			else if (DS_rand==2) click(ZK, spt, 1);
			else click(PVB, spt, 1);
		}
	}
	
 if (title.match("Северо восточный Форт"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<1)) click(PVB, spt, 1);
			else if ( nextTower &&(DS_rand==2)) click(VK, spt, 1);
			else click(DSS, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<1)) click(DSS, spt, 1);
			else if (DS_rand==2) click(VK, spt, 1);
			else click(PVB, spt, 1);
		}
	}
 if (title.match("Западный Курган"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<2)) click(UZF, spt, 1);
			else click(SZF, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<2)) click(SZF, spt, 1);
			else click(UZF, spt, 1);
		}
	}
	
 if (title.match("Поле вечной битвы"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<1)) click(UZF, spt, 1);
			else if ( nextTower &&(DS_rand==1)) click(UVF, spt, 1);
			else if (DS_rand==2) click(SZF, spt, 1);
			else click(SVG, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<1)) click(SZF, spt, 1);
			else if ( nextTower &&(DS_rand<2)) click(SVF, spt, 1);
			else if (DS_rand==2) click(UZF, spt, 1);
			else click(UVF, spt, 1);
		}
	}

 if (title.match("Восточный Курган"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<2)) click(UVF, spt, 1);
			else click(SVG, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<2)) click(SVG, spt, 1);
			else click(UVF, spt, 1);
		}
	}

 if (title.match("Юго западный Форт"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<2)) click(DSU, spt, 1);
			else if ((DS_rand==2)||(DS_rand==3)) click(PVB, spt, 1);
			else click(ZK, spt, 1);
		} else {
			if ( nextTower &&((DS_rand==0)||(DS_rand==1))) click(ZK, spt, 1);
			else if ( nextTower &&((DS_rand==2)||(DS_rand==3))) click(PVB, spt, 1);
			else click(DSU, spt, 1);
		}
	}

 if (title.match("Юго восточный Форт"))
	{
		if (!storona) {
			if ( nextTower && (DS_rand<2)) click(DSU, spt, 1);
			else if (DS_rand<4) click(VK, spt, 1);
			else click(PVB, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<2)) click(PVB, spt, 1);
			else if ( nextTower &&(DS_rand<4)) click(VK, spt, 1);
			else click(DSU, spt, 1);
		}
	}
	
 if (title.match("Долина Сражений, Юг"))
	{
		if (!storona) {
			if ( nextTower &&(DS_rand<2)) click(UVF, spt, 1);
			else if (nextTower) click(UZF, spt, 1);
		} else {
			if ( nextTower &&(DS_rand<2)) click(UZF, spt, 1);
			else if (nextTower) click(UVF, spt, 1);
		}
	}
}

function resurection_()
{
	mark[17]=0
	
	if ( resurectionTower==11 && title.match('Варвары') ) click(naGlavnuy, rNum(30000, 60000));
	else if ( title.match('Варвары') && resurectionTower>=0 && resurectionTower<=11)
	{
		if (SetAbilities)
		if (sessionStorage.abilities[0]>=Abilities_N[0] && !sessionStorage.abilities.match(Abilities_N[0]+',') && SetAbilities) {
			sessionStorage.setAbil=Abilities_N[0];
			click('/user/abilities', timeout); }
		if (SetItem && !action)
		if (sessionStorage.SetItems[0]>=Item_Set_N[0] && !sessionStorage.SetItems.match(Item_Set_N[0]+',') && SetItem) {
			sessionStorage.setItem=Item_Set_N[0];
			click('/user/body', timeout); }
		click(bashni, timeout);
	}
	if (title.match(/Каракорум, столица Юга|Мидгард, столица Севера/)) searchPoint()

	if (InTowers) {
		if (!SetPobeg &&((Number(vrag_mech)/(Number(drug_med)+Number(drug_mech)))>krit_massa) ||
			((Number(krithp)>uroven_HP) && Number(krithp)!=0 && uroven_HP!=0 && healYourself=='' ) ||
			(((Number(vrag_mech)+Number(vrag_med))<=enemy)&&(attackTowers=='')&&(healYourself==''))	||
			((Number(brb)>Number(brb_max))&&(Number(krithp)<uroven_HP)&&(healYourself=='')	))

			searchPoint();
		if (SetPobeg &&	(((Number(vrag_mech)/(Number(drug_med)+Number(drug_mech)))>krit_massa) ||
			((Number(krithp)>uroven_HP) && Number(krithp)!=0 && uroven_HP!=0 && healYourself=='' ) ||
			(((Number(vrag_mech)+Number(vrag_med))<=enemy)&&(attackTowers=='')&&(healYourself==''))	||
			((Number(brb)>Number(brb_max))&&(Number(krithp)<uroven_HP)&&(healYourself=='')	))  )

			click(naGlavnuy, spt)
	}
	if ( title.match(/Арена|Выживание/)&& rus_t.match(/Вы погибли, ждите окончания боя/i) && resurectionTower<=8) 
	click(naGlavnuy, timeout)
}


function select_event()
{
	if (uvorot!='' && title.match('Арена') && rus_t.match(/Наши: (\d) /)) {var nashi = /Наши: (\d) /.exec(rus_t); if (nashi[1]==1) {SetWhite=0; uvorot='';}}
	if (uvorot!='' && title.match('Арена') && rus_t.match(/Враги: (\d) /)) {var vragi = /Враги: (\d) /.exec(rus_t); if (vragi[1]==1) SetWhite=0; }
	if (uvorot!='' && title.match('Выживание') && rus_t.match(/ (\d) (\d+):(\d+)/)) {var war = / (\d) (\d+):(\d+)/.exec(rus_t); if (war[1]==2) {SetWhite=0; uvorot='';}}
	if (attack_strazh!='' && rus_t.match(/ (\d+)% (\d+)% (\d+):(\d+)/) && title.match(/Голова|Сердце|Гроза|Крепость|Исцеление|Зеркало|Источник|Колыбель/i)) 
	{	var straj = / (\d+)% (\d+)% (\d+):(\d+)/.exec(rus_t); if (attack!='' && straj[2]>4) attack_strazh='';  }
	if (energchit!='' && title.match(/Выживание|Арена/) && lowenergy)  energchit='';

	if (attackDobivat!='')
	{
		var target_name=attackDobivat.textContent.replace(/( {1,})?Добивать( {1,})?/, '').replace(/( {1,})?\((\d+)\)( {1,})?/, '')
		if (title.match('Битва героев') && rus_t.match('Цель: '+target_name) ) target=true;
		if (title.match('Битва героев') && rus_t.match('Цель: -')) notarget=true;
		if ((SetBlack==1 || SetBlack==3) && InTowers && black_list.match(target_name)) bad_target=true;
		if ((SetBlack==2 || SetBlack==3) && title.match(/Логово Геррода|Выживание|Арена|Цари (Г|г)оры/) && black_list.match(target_name)) good_target=true;
		if ((SetWhite==1 || SetWhite==3) && InTowers && white_list.match(target_name)) good_target=true;
		if ((SetWhite==2 || SetWhite==3) && title.match(/Логово Геррода|Выживание|Арена|Цари (Г|г)оры/) && white_list.match(target_name)) bad_target=true;
		if (attackDobivat.innerHTML.match("lifealert"))    good_target=true;
		if (attackDobivat.innerHTML.match("/images/icons/blue") && !storona && title.match(/Территория/)) bad_target=true;
		if (attackDobivat.innerHTML.match("/images/icons/red") && storona && title.match(/Территория/))   bad_target=true;
		if (attackDobivat.innerHTML.match(/(red_|blue_)healer/) && title.match(/Территория/)) good_target=true;
		if (nasmeshka!='' && attackDobivat.innerHTML.match(/(red_|blue_)healer/) && InTowers) {nasmeshka=''; bad_target=true;}
	}
	
if (resurectionTower==12)
	 {if (title.match(/Выживание/) && rus_t.match(/Вы погибли, ждите окончания боя/)) {mark[25]=1; click(naGlavnuy, timeout) };
	 if ( title.match(/Арена/) && rus_t.match(/Вы погибли, ждите окончания боя/)) { mark[23]=1; click(naGlavnuy, timeout) };
	 if (rus_t.match(/Ваш герой сбежал с поля боя. Вход на арену временно закрыт./)) { mark[25]=0; mark[23]=1; mark[24]=1; mark[26]=1; click(naGlavnuy, timeout)};
	 if (rus_t.match(/Ваш герой сбежал с поля боя. Вход на выживание временно закрыт./)) { mark[25]=1; mark[23]=0; mark[24]=1; mark[27]=1; click(naGlavnuy, timeout)};
	 if (pokinut !='' && rip && title.match(/Выживание/) ) {mark[25]=1; click(naGlavnuy, timeout) };
	  if (pokinut !='' && rip && title.match(/Арена/) ) {mark[23]=1; click(naGlavnuy, timeout) };
	 if (InTowers && rus_t.match(/Вы получили/)) { mark[24]=1; click(naGlavnuy, timeout)};
	 if (title.match(/Варвары/)  && mark[24]==0 )  click(bashni, timeout);
	 if (mark[25]==0 && mark[24]==1 && mark[23]==0 && title.match(/Варвары/))   click(arena, timeout);
	 if (mark[25]==1 && mark[24]==1 && mark[23]==0 && title.match(/Варвары/))   click(arena, timeout);
	 if (mark[26]==1 && mark[27]==1 && title.match(/Варвары/))  {mark[26]=0 ; mark[27]=0; mark[24]=0; click(bashni, timeout)};
	 if ( title.match(/Арена/) && mark[25]==1 && mark[24]==1) { mark[24]=0; mark[25]=0};
     if ( mark[24]==1 && mark[23]==1 && mark[25]==0 && title.match(/Варвары/))  click(survival, timeout);
	 if (title.match(/Выживание/) && mark[24]==1 && mark[23]==1) { mark[24]=0; mark[23]=0};
	 
	 }

	 if (resurectionTower==13)
	 {if (title.match(/Выживание/) && rus_t.match(/Вы погибли, ждите окончания боя/)) {mark[25]=1; click(naGlavnuy, timeout) };
	 if (pokinut !='' && rip && title.match(/Выживание/) ) {mark[25]=1; click(naGlavnuy, timeout) };
	 if (InTowers && rus_t.match(/Вы получили/)) { mark[24]=1; click(naGlavnuy, timeout)};
	 if (title.match(/Варвары/)  && mark[24]==0 )  click(bashni, timeout);
	 if (rus_t.match(/Ваш герой сбежал с поля боя. Вход на выживание временно закрыт./)) { mark[25]=1; mark[24]=0; click(naGlavnuy, timeout)};
	 if ( mark[24]==1 && title.match(/Варвары/))  click(survival, timeout);
	 if (title.match(/Выживание/) && mark[24]==1 )  mark[24]=0;
	 
	 }
var rand=Math.random()*4;

if (title.match("Поля сражений") && /57|58/.test(server_time[2])) obnovlenie=rNum(1000, 40000);

var CDT=CDTAttack; if (InEvents) CDT=CDTEvent

if (smeshka) CDT=2500
if (attack_gerod=='' && ( healYourself!='' || ( healSoyznika!='' && healEnd ) || ( heal!='' && ( ( (( nekogo_lechit && rand<2 ) || !nekogo_lechit) && SetdestroyMana==1 ) || SetdestroyMana==0 || destroyMana=='' ) ) ) ) CDT=CDTHeal;
if (attack_kochev=='' && ( healYourself!='' || ( healSoyznika!='' && healEnd ) || ( heal!='' && ( ( (( nekogo_lechit && rand<2 ) || !nekogo_lechit) && SetdestroyMana==1 ) || SetdestroyMana==0 || destroyMana=='' ) ) ) ) CDT=CDTHeal;

if ( sessionStorage.perehod==1 ) CDT=rNum(300, 1000)

  if ( SetDrinkButtle && buttle!='' && (t_but<(CDT-300)) && (Number(SetDrinkHP)>=uroven_HP) ) click(buttle, t_but+spt, 0);
  else if ( uvorot!='' && (t_uvo<(CDT-200)) && ((damage && setUvorotHPlvl==1) || ( setUvorotHPlvl!=1 && Number(setUvorotHP)>=uroven_HP)) ) click(uvorot, t_uvo+spt, 0);
  else if ( kamShit!='' && (t_kam<(CDT-200)) && ((damage && setKamShitHPlvl==1) || ( setKamShitHPlvl!=1 && Number(setKamShitHP)>=uroven_HP))) click(kamShit, t_kam+spt, 0);
  else if ( otrShit!='' && (t_otr<(CDT-200)) && ((damage && setOtrShitHPlvl==1) || ( setOtrShitHPlvl!=1 && Number(setOtrShitHP)>=uroven_HP))) click(otrShit, t_otr+spt, 0);
  else if ( energchit!='' && (t_ener<(CDT-200)) && ((damage && setEnShitHPlvl==1) || ( setEnShitHPlvl!=1 && Number(setEnergChitHP)>=uroven_HP))) click(energchit, t_ener+spt, 0);
  else if ( berserk!='' && heal=='' && (t_bers<(CDT-200))) click(berserk, CDT, 0);
  else if ( pronikaushii!='' && heal=='' && (t_pron<(CDT-200))) click(pronikaushii, CDT, 0);
  else if ( kritomania!='' && (t_krit<(CDT-200))) click(kritomania, CDT, 0);
  else if ( attack_gerod!='' ) click(attack_gerod, CDT, 0);
  else if ( attack_kochev!='' ) click(attack_kochev, CDT, 0);
  else if ( attack_strazh!='') click(attack_strazh, CDT, 0);
  else if ( nasmeshka!='' && (t_nasm<(CDT-200)) && (Number(vrag_mech)>Number(drug_med)) ) click(nasmeshka, CDT, 0);
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
  else if ( attackDobivat!='' && target ) click(attackDobivat, CDT, 0);
  else if ( attack!='' && title.match('Битва героев') && !target && !notarget) click(attack, CDT, 0);
  else if ( attackTowers!='' && (SetAttackTower==2 || (storona && title.match("Северная Крепость")) || (!storona && title.match("Южный Порт")) ) ) click(attackTowers, CDT, 0);
  else if ( attackTowers!='' && SetAttackTower==1 && !title.match('Битва героев') && ((HP_Bashni/drug_mech)>rNum(800, 2000))) click(attackTowers, CDT, 0);
  else if ( attackDobivat!='' && (!bad_target && ( (!InEvents && rNum(4)<2) || good_target || 
		(InEvents && !title.match(/Логово Геррода|Территория|Битва героев|Цари (Г|г)оры/)) ) )) click(attackDobivat, CDT, 0);
  else if ( attack!='') click(attack, CDT, 0);
  else if ( attack_czar!='') click(attack_czar, CDT, 0);
  else if ( attack_vrata!='') click(attack_vrata, CDT, 0);	  
  else if ( noviuBoy!='') click(noviuBoy, timeout, 1);
  else if ( vstatVochered!='') click(vstatVochered, timeout, 1);
  else if ( obnovit!='' && title!="Чат клана" ) click(obnovit, obnovlenie, 1);
  else if ( attackTowers!='') click(attackTowers, CDT, 0);
}

function test_location()
{
	krithp		=life*kritHP/100
	SetDrinkHP	=life*SetDrinkHPlvl/100;
	setUvorotHP	=life*setUvorotHPlvl/100;
	setKamShitHP	=life*setKamShitHPlvl/100;
	setOtrShitHP	=life*setOtrShitHPlvl/100;
	setEnergChitHP	=life*setEnShitHPlvl/100;

	if (	title.match(/Каракорум, столица Юга|Курган|Лагерь викингов|Лагерь орды/)||
		title.match(/Дельта реки|Левый берег|Правый берег|Устье реки/)||
		title.match(/Ледник|Верхний перевал|Ледяные пещеры|Нижний перевал|Каменные пещеры|Горное озеро/)||
		title.match(/Северная пустошь|Северо-западная пустошь|Северо-восточная пустошь|Западная пустошь|Перекрёсток|Восточная пустошь|Юго-западная пустошь|Юго-восточная пустошь|Южная пустошь/)||
		title.match(/Розенгард|Западный Розенгард|Железный рудник|Восточный Розенгард|Большой курган|Западный Мароканд|Медные копи|Восточный Мароканд|Мароканд/)||
		title.match(/Мертвый город, Юг|Юго-восточная окраина|Храм земли|Храм огня|Храм неба|Юго-западная окраина|Площадь рассвета|Площадь восстания|Площадь заката|Северо-восточная окраина|Храм воды|Северо-западная окраина|Мертвый город, Север/)||
		title.match(/Земли титанов, Север|Северо-западные горы|Северо-восточные горы|Западные врата|Крепость титанов|Восточные врата|Юго-западные горы|Юго-восточные горы|Земли титанов, Юг/)||
		title.match(/Долина Сражений, Север|Северо западный Форт|Северо восточный Форт|Западный Курган|Поле вечной битвы|Восточный Курган|Юго западный Форт|Юго восточный Форт|Долина Сражений, Юг/))
	
		InTowers=true;
	
	if (	title.match(/Арена|Выживание|Территория|Логово Геррода|Цари (Г|г)оры/i)||
		title.match(/Поля сражений|Северная Крепость|Левые Врата севера|Правые Врата севера|Левый Склон|Правый Утес|Левобережный Лес|Правобережная Бухта|Левые Врата юга|Правые Врата юга|Южный Порт/i)||
		title.match(/Поля сражений|Обелиск Силы|Северная Крепость|Западные Врата севера|Центральные Врата севера|Восточные Врата севера|Северо-Западный Склон|Северный Перевал|Северо-Восточный Утес|Юго-Западный Склон|Южное Плато|Юго-Восточный Утес|Западные Врата юга|Центральные Врата юга|Восточные Врата юга|Южный Порт/i)||
		(vzamok=='' && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/i))||
		title.match(/\d\/(\d+) финала|Передышка|Турнир героев|Командный турнир|Отборочный тур|Битва героев|Финал/i) )
	{
		InEvents=true;
		SetAttackTower=0;
		ReadMessage=false;
		SetDrinkButtle=true;
		if ( pokinut !='' && /14|20/.test(server_time[1]) && server_time[2]>=25 && server_time[2]<50 && title.match(/Выживание|Арена/)) click(naGlavnuy, timeout);
		if (rus_t.match(/В. ..л.сь храбро, но по..бл./) && title.match(/Цари Горы/)) click(naGlavnuy, timeout)
	}
	if (title.match(/Пещера дракона|Пещерный стражник|Пещера мантикоры|Легендарный дракон|Мифический дракон|Долина Великанов|Каменный тролль|Храм Немезиды|Обитель Зодиака|Святилище предков|Дракон (\d+) ур/i) && !title.match(/Пещеры и драконы|Голова дракона/i))
	{
		Boss=true;
		healEnd=false;
		ReadMessage=false;
		setUvorot=false;
		setEnergChitHP = uroven_HP
	}
	if (title.match(/Пустая пещера|Пустой грот|Пустая долина|Пустой храм|Пустая Обитель Зодиака/i))
	{
		InEvents=true;
		err_d=true
	}
	if (title.match(/Стражник|Ущелье (Я|Э)питера/i)) {InEvents=true; vdolinu=true; }
	
	if ( resurectionTower>=9 && resurectionTower<11 &&  title.match(/Вход закрыт/)&& rus_t.match(/Ваш герой сбежал с поля боя. Вход на выживание временно закрыт./i))
	click('/game/arena', timeout)
	if ( resurectionTower>=9 && resurectionTower<11  && title.match(/Вход закрыт/)&& rus_t.match(/Ваш герой сбежал с поля боя. Вход на арену временно закрыт./i))
	click('/game/survival', timeout)
}

function user_check()
{
    if ((!InEvents || title.match(/Арена|Выживание/)) && !Boss)
    {
	if ( title.match('Мой герой')) 
	{
		mark[13]=comp_time+rNum(600, 1200)

		if  ( captcha==''){
			sessionStorage.missed=0
			sessionStorage.removeItem('ATT');
		}
		if ( captcha!='' && vboy=='' && unravel ){
			sessionStorage.ATT=1; 
			click(captcha, timeout);
		}
		if ( captcha!='' ){
			sessionStorage.ATT=1; 
			click('/user/check', timeout);
		}
	}
	else if ( ATTsound && !unravel && title.match('Варвары') && sessionStorage.ATT==1 ) 
	{
		sound.play();
		action=true
	}
	else if ( unravel && title.match('Варвары') && user!='' && sessionStorage.ATT==1 ) click(user, timeout);
	else if ( !ATTsound && !unravel && sessionStorage.ATT==1 ) {alert('а ты тут?');action=true}
	else if ( title.match("А ты тут?") && cap_src=='' ) sound.play();

	if ( (Number(sessionStorage.missed)>3 || mark[13]==0) && !title.match(/Мой герой|А ты тут?/) && user!='' ) click(user, timeout);

	if ( SetUstalost && title.match(/Мой герой|Усталость/i) && /(\d+):(\d+)/.test(SetTireMaxt) && /(\d+):(\d+)/.test(SetTireMint) ) {
		var tMax=/(\d+):(\d+)/.exec(SetTireMaxt); var uttMax= tMax[1]*3600+tMax[2]*60; 
		var tMin=/(\d+):(\d+)/.exec(SetTireMint); var uttMin= tMin[1]*3600+tMin[2]*60;
		if (uttMax>=time_serv && uttMin<=time_serv) {
			if (ustalost!='' && mark[12]!=1 && title.match('Мой герой') && mark[20]==0 ) click(ustalost, timeout)
			if (snyatustalost!='' && title.match(/Усталость/i)) {mark[20]=comp_time+rNum(300, 1000); click(snyatustalost, timeout);}
		}
	}
    }
} 

function errors_()
{
	if (resurection!='') {
		if (time_res<obnovlenie) click(resurection, time_res+spt);
		else click(resurection, obnovlenie);}

	if ( skrit!='' && scrivat ) click(skrit, spt, 1);
	if ( otklonit!='' && otklonyat ) click(otklonit, spt, 1);

if (title.match(/502 Bad Gateway|Ошибка/) && /barbars|варвары|46.4.4.56|b.spaces/.test(location.host)) 
{if (user!='') click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', timeout);else click('javascript:history.go(-1)', 1000);}
else if (title.match('Слишком быстро') && rus_t.match(/Вы попытались загрузить более/i)) {if (nazad!='') click(nazad, timeout); else click('javascript:history.go(-1)', 1000);}

if (sessionStorage.user==undefined ) click(user, timeout);

	if (rus_t.match(/Вы бились храбро, но погибли/) && title.match(/Цари (Г|г)оры/)) click(naGlavnuy, timeout); 
	if (rus_t.match(/Вы бились храбро, но погибли|Битва началась, Логово закрыто/) && title.match("Логово Геррода")) {click(naGlavnuy, timeout); sessionStorage.removeItem("goToBoss");}
	for (var i=0;i<document.getElementsByClassName('feedbackPanelERROR').length;i++)
	{
		var feedback=en_ru(replace_(document.getElementsByClassName('feedbackPanelERROR')[i].textContent))
		if (feedback.match('У Вас не хватает денег')) mark[11]=comp_time+rNum(1000, 5000)
		if (feedback.match('У Вас не хватает железа')) mark[12]=comp_time+rNum(1000, 5000)
		if (feedback.match('В сундуке нет места')) mark[8]=1;
		if (feedback.match(/Сюда можно только с|Для входа необходим/)) {click(user, timeout); mark[5]=1}
		if (feedback.match('Переодеваться в бою нельзя') && vboy!='') click(vboy, timeout, 1) 
	}
	for (var i=0;i<document.getElementsByClassName('notify').length;i++)
	{
		var notify=en_ru(replace_(document.getElementsByClassName('notify')[i].textContent))
		if (title.match('Поля сражений') && attack1=='' && notify.match('Бои на полях сражений доступны') ) {mark[4]=1; click(naGlavnuy, timeout);}
		if (title.match('Арена') && attack1=='' && notify.match('Бои на арене доступны') ) {mark[6]=1; click(naGlavnuy, timeout);}
	}
	for (var i=0;i<document.getElementsByClassName('info').length;i++)
	{
		var inf=en_ru(replace_(document.getElementsByClassName('info')[i].textContent))
		if ( inf.match('Твой уровень стал слишком высок для этой Башни')){
			sessionStorage.removeItem('user')
			if (KSU!='') click(KSU, timeout)
			else if (MSS!='') click(MSS, timeout)
			else click(naGlavnuy, timeout)
		}
	}
	for (var i=0;i<document.getElementsByClassName('major').length;i++)
	{
		major=en_ru(replace_(document.getElementsByClassName('major')[i].textContent))
		if ( major.match(/Стены замка разрушены|входа в замок больше нет/) && attack1=='' && heal=='') click(naGlavnuy, timeout)
	}
    if (title.match(/Битва героев|турнир/i) && attack1=='' && rus_t.match(/Для участия в (турнире|Битве героев) необходимо получить/i)) {mark[9]=1; click(naGlavnuy, timeout);}
	if (InEvents && attack1=='' && heal=='' && rus_t.match(/Вы погибли, ждите окончания боя|Битва завершилась|Битва началась, Вы не успели/i) && !title.match(/Арена|Выживание/i)) click(naGlavnuy, timeout);
	if ( InEvents && rus_t.match(/через (\d+):(\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через (\d+):(\d+):(\d+)/.exec(rus_t);
		if ( vremya_bitvi[1]==0 && vremya_bitvi[2]==0 && obnovlenie>(vremya_bitvi[3]*1000) && obnovit!='') obnovlenie=(vremya_bitvi[3]*1000)+spt;

		if ( ( Number(vremya_bitvi[1])!=0 || Number(vremya_bitvi[2])>6 ) && vremya_bitvi[3]<=55) click(naGlavnuy, timeout);
	}
	else if ( InEvents && rus_t.match(/через: (\d+):(\d+)/) && attack1=='' && heal=='' )
	{
		var vremya_bitvi=/через: (\d+):(\d+)/.exec(rus_t);
		if ( vremya_bitvi[1]==0 && obnovlenie>(vremya_bitvi[2]*1000) && obnovit!='') obnovlenie=(vremya_bitvi[2]*1000)+spt;
	}
	if ( InEvents && rus_t.match(/через (\d+) сек/) ) {
		var cherez=(/через (\d+) сек/.exec(rus_t))[1]
		if (obnovlenie>(cherez*1000)) obnovlenie=(cherez*1000)+spt;
	}

	else if (InEvents && attack1=='' && heal=='' && rus_t.match(/Вы погибли и выбываете из турнира|Ваша команда погибла и выбывает из турнира|Турнир завершился/)) click(naGlavnuy, timeout);

}

function return_()
{
	if (openbag!='' && !title.match("Моё снаряжение") && !InTowers && !InEvents && !Boss) click(openbag, timeout);
	if (!action) 
	{
		mark[7]=0
		mark[8]=0

		if (vboy!='') click(vboy, spt, 1);
		else if ( InEvents || Boss ) click(location.href, 5000);
		else if ( (!InEvents && !Boss && naGlavnuy!='') || err_d || vdolinu) click(naGlavnuy, timeout);
		else click('/?wicket:bookmarkablePage=:com.overmobile.combats.wicket.pages.guild.chat.GuildChatPage', 2000);
	}
}


function DND_()
{
	var CDT=CDTBoss
	var rand=rNum(4) 

if ( attackDobivat!='' || attack_soul!='') {} 
else if ( healYourself!='' || ( heal_target!='' && sessionStorage.dheal==1) || ( heal!='' && ( destroyManaBoss=='' || sessionStorage.dheal==0 || sessionStorage.dheal==undefined || (sessionStorage.dheal==2 && rand<3 && !nekogo_lechit ) ) ) )  CDT=CDTBossH;

  if (sessionStorage.perehod==1) CDT=rNum(300, 1000)

  if ( vstatVochered!='' ) click(vstatVochered, timeout, 1);
  else if ( obnovit!='' && title.match("Чат клана") && sessionStorage.goToChat==1 ) click(obnovit, CDTStop, 1);
  else if ( obnovit!='' && title!="Чат клана" ) click(obnovit, obnovlenie, 1);
  else if ( berserk!='' && ( heal=='' || sessionStorage.dheal==1 || (sessionStorage.dheal==2 && (rand>=3 || nekogo_lechit) )) && (t_bers<(CDT-200))) click(berserk, CDT, 0);
  else if ( kritomania!='' && (t_krit<(CDT-200))) click(kritomania, CDT, 0);
  else if ( kamShit!='' && (t_kam<(CDT-200)) && ((title.match("Храм Немезиды") && (Number(HP_C)+Number(HP_G)+Number(HP_N))<(nemkam)) || !title.match("Храм Немезиды")) ) click(kamShit, CDT, 0);
  else if ( attack_soul!='' && attackDobivat=='') click(attack_soul, CDT, 0);
  else if ( healYourself!='') click(healYourself, CDT);
  else if ( heal_target!='' && sessionStorage.dheal==1) click(heal_target, CDT)
  else if ( heal!='' && ( destroyManaBoss=='' || sessionStorage.dheal==0 || sessionStorage.dheal==undefined || (sessionStorage.dheal==2 && rand<3 && !nekogo_lechit ) ) ) click(heal, CDT, 0);
  else if ( destroyManaBoss!='' ) {	
	if (berserk!='' && (t_bers<(CDT-200))) click(berserk, CDT, 0);	
	else click(destroyManaBoss, CDT, 0);	
  }
  else if ( attackDobivat!='' ) click(attackDobivat, CDT, 0);
  else if ( attack_strazh!='') click(attack_strazh, CDT, 0);
  else if ( manticora!='') click(manticora, CDT, 0);
  else if ( attack_drakon!='') click(attack_drakon, CDT, 0);
  else if ( Yapiter!='' && (sessionStorage.atk==1 || Epiter=='') ) click(Yapiter, CDT, 0);
  else if ( Epiter!=''  && (sessionStorage.atk==2 || Yapiter=='') ) click(Epiter, CDT, 0);
  else if ( Yapiter!='' && ( Number(HP_Ya)>Number(HP_Yap) || Epiter=='' )) click(Yapiter, CDT, 0);
  else if ( Epiter!='' ) click(Epiter, CDT, 0);
  else if ( attack_troll!='') click(attack_troll, CDT, 0);
  else if ( attack_bers!='') click(attack_bers, CDT, 0);
  else if ( sessionStorage.atk==3 && Nemezida!='') click(Nemezida, CDT, 0);
  else if ( sessionStorage.atk==1 && Garm!='' ) click(Garm, CDT, 0);
  else if ( sessionStorage.atk==2 && Cerber!='') click(Cerber, CDT, 0);
  else if ( sessionStorage.atk==0 && Cerber!=''  && Number(HP_C)> Number(HP_N) && Number(HP_C)>=Number(HP_G) ) click(Cerber, CDT, 0);
  else if ( sessionStorage.atk==0 && Garm!=''    && Number(HP_G)> Number(HP_N) && Number(HP_G)>=Number(HP_C) ) click(Garm, CDT, 0);
  else if ( sessionStorage.atk==0 && Nemezida!=''&& Number(HP_N)>=Number(HP_G) && Number(HP_N)>=Number(HP_C) ) click(Nemezida, CDT, 0);
  else if ( Garm!=''     && Number(HP_G)>Set_HP_G ) click(Garm, CDT, 0);
  else if ( Cerber!=''   && Number(HP_C)>Set_HP_C ) click(Cerber, CDT, 0);
  else if ( Nemezida!='' && Number(HP_N)>Set_HP_N ) click(Nemezida, CDT, 0);
  else if ( Garm!=''     && Number(HP_G)> Number(HP_N) && Number(HP_G)>=Number(HP_C) ) click(Garm, CDT, 0);
  else if ( Cerber!=''   && Number(HP_C)> Number(HP_N) && Number(HP_C)>=Number(HP_G) ) click(Cerber, CDT, 0);
  else if ( Nemezida!='' && Number(HP_N)>=Number(HP_G) && Number(HP_N)>=Number(HP_C) ) click(Nemezida, CDT, 0);
  else if ( Garm!='') click(Garm, CDT, 0);
  else if ( Cerber!='') click(Cerber, CDT, 0);
  else if ( Nemezida!='') click(Nemezida, CDT, 0);
  else if ( zodiak!='') click(zodiak, CDT, 0);
  else if ( attackDobivat!='') click(attackDobivat, CDT, 0);
  else if ( attack_soul!='') click(attack_soul, CDT, 0);
  else if ( attack1!='') click(attack1, CDT, 0);
  else if ( healSoyznika!='')  click(healSoyznika, CDT, 0);
}



function autologin_() {

	if (title.match('Варвары') && vhod!='') click(vhod, timeout)

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
		if (response.match(/ERROR_ZERO_BALANCE/)) alert('Недастаточно средств на балансе ANTIGATE')
		mpage(response);
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
		if (rus_t.match(/Эту клановую вещь можно отправить только|Трофей можно передавать только внутри клана/)) mark[21]++
		var sel_num=0
		var otmena=''
		if (veshi!='') click(veshi, timeout);
		else 		
		for (var i=0;i<a.length;i++)
    		{
			if (a[i].text.match("выбрать")) {
				sel_num++
				if (mark[21]<sel_num) {
				click(a[i], timeout); break}
			}
			if (a[i].text.match("отменить")) otmena=a[i]
		}
		if (!action) 
		{
			if (otmena!='') { action=true; setTimeout(function(){document.forms[0].submit()}, timeout); }
			else {alert('полный');action=true;}
		}
	}
	else mark[21]=0
}

function mpage(val) {
	var div_i=document.createElement("div")
	div_i.innerHTML+="<div class='small minor'>"+val+"</div>"
	document.body.appendChild(div_i)
}


function gett(val, t) {
	var sek=Number(val) - comp_time;
	var hr=Math.floor(sek/3600)
	var mnt=Math.floor((sek-hr*3600)/60)
	var scnd=Math.floor(sek-(hr*3600+mnt*60))
	if (hr<10)  hr='0'+hr;
	if (mnt<10) mnt='0'+mnt;
	if (scnd<10) scnd='0'+scnd;
	if (t==1) return hr; else if (t==2) return mnt; else if (t==3) return scnd; else if (t==4) return sek
}

function rNum(min, max) { 
	if (max==undefined) return Math.floor(Math.random()*min )
	else return Math.floor(Math.random()*(max - min)+min);
}

function addInfo_()
{

info+='<div class="hr"></div>'

var div_b=''

if (title.match(/Каменный тролль|Дракон (\d+) ур/i) && u_class=="медик")
{
	if (sessionStorage.dheal==undefined) sessionStorage.dheal=vartrol
	if (sessionStorage.dheal==0) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу "></input>'
	if (sessionStorage.dheal==1) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Жгу "></input>'
	if (sessionStorage.dheal==2) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу и жгу "></input>'
}
else if (title.match(/Долина Великанов/i) && u_class=="медик" && !rus_t.match(/Долина Великанов находится в Ущелье/))
	{
	if (sessionStorage.dheal==undefined || sessionStorage.dheal>1) sessionStorage.dheal=0
	if (sessionStorage.dheal==0) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу союзников "></input>'
	if (sessionStorage.dheal==1) div_b='  <input id="h_button" button style="background-color:yellow" type="submit" value=" Лечу цель "></input>'
}	
else sessionStorage.removeItem('dheal')

if (title.match(/Долина Великанов/i) && u_class=="воин" && !rus_t.match(/Долина Великанов находится в Ущелье/)) {
	if (sessionStorage.atk==undefined) sessionStorage.atk=0
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Яп->Эп "></input>'
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Япитера "></input>'
	if (sessionStorage.atk==2) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Эпитера "></input>'
}
else if (title.match(/Храм Немезиды/i) && u_class=="воин")
{
	if (sessionStorage.atk==undefined) sessionStorage.atk=varnema
	if (sessionStorage.atk==0) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" ХП+ "></input>'
	if (sessionStorage.atk==1) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Гарма "></input>'
	if (sessionStorage.atk==2) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Цербера "></input>'
	if (sessionStorage.atk==3) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Бью Немезиду "></input>'
	if (sessionStorage.atk==4) div_b='  <input id="w_button" button style="background-color:yellow" type="submit" value=" Гарм->Ц+Н "></input>'
}
else sessionStorage.removeItem('atk')

	if (sessionStorage.on_off=="on") info+='<div> <input id="button" button style="background-color:#53daaa" type="submit" value=" Стоп " >' +div_b+ '</input> </div>'
	else if (sessionStorage.prow==1||sessionStorage.prow==undefined) info+='<div> <input id="button" button style="background-color:red" type="submit" value=" Старт ">' +div_b+ '</input> </div>'

    if (sessionStorage.on_off=="on")
    {
	info+='<div class="hr"></div>';
	if (trayStatus!='') info+='<div>- <span style="color:#00ccff"><u>Ожидание</u></span> [<span id="timer" style="color:#53daaa">'+(trayStatus/1000).toFixed(1)+'</span>] сек</div>'
	if (bonus[8]!=0) info+='<div>- <span style="color:#FFDF8C"><u>алтарь</u></span> ['+gett(bonus[8], 1)+':'+gett(bonus[8], 2)+':'+gett(bonus[8], 3)+']</div>'
	else info+='<div>- <span style="color:#FFDF8C"><u>алтарь</u></span> не активен</div>'
		
	if ( addinfo && citaactiv && ((SetCitadel[0]!=0 && cita[0]!=0) || (SetCitadel[1]!=0 && cita[1]!=0) || (SetCitadel[2]!=0 && cita[2]!=0)) ) {
		info+='<div class="hr"></div>';
		
	if (SetCitadel[0]!=0 && cita[0]!=0) info+='<div>- <span style="color:#FFDF8C"><u>Башня мудрости</u></span> ['+gett(cita[0], 1)+':'+gett(cita[0], 2)+':'+gett(cita[0], 3)+']</div>'
	if (SetCitadel[1]!=0 && cita[1]!=0) info+='<div>- <span style="color:#FFDF8C"><u>Статуя критона</u></span> ['+gett(cita[1], 1)+':'+gett(cita[1], 2)+':'+gett(cita[1], 3)+']</div>'
	if (SetCitadel[2]!=0 && cita[2]!=0) info+='<div>- <span style="color:#FFDF8C"><u>Академия клана</u></span> ['+gett(cita[2], 1)+':'+gett(cita[2], 2)+':'+gett(cita[2], 3)+']</div>'
	//info+='<div> Промахи : '+sessionStorage.missed+'</div>'
    }
	
	else if ( addinfo && (SetCitadel[0]!=0 || SetCitadel[1]!=0 || SetCitadel[2]!=0) ) {
	info+='<div class="hr"></div>';
	info+='<div>Цитадель могут активировать только <span style="color:#FFDF8C">мегамэн</span> или <span style="color:#FFDF8C">марена</span></div>'
	info+='<div><span style="color:#DD6666">Пожалуйста отключите активацию цитаделей в настройках</span></div>'}
	}
	if (1==1) info+='<div>- <span style="color:#00ccff">Modified by <br> Diktator Studio & Alliance Studio </span></div>'
    

	mpage(info)

	var t = setInterval(MyTimer, 57);

	if (document.getElementById("button")!=undefined) button.onclick= function() {
		if (sessionStorage.on_off=="on") {sessionStorage.on_off="off"; if (timeoutId!="") clearInterval(timeoutId); sound.pause(); activ_link.style=""; button.value=" Старт "; }	
		else if (sessionStorage.prow==1||sessionStorage.prow==undefined) {sessionStorage.on_off="on";sessionStorage.perehod=1; button.value=" Стоп "; location.href=location.href;} }

	if (document.getElementById("h_button")!=undefined) h_button.onclick= function() {clearInterval
		if (title.match(/Долина Великанов/i) && !rus_t.match(/Долина Великанов находится в Ущелье/)) {
			if (sessionStorage.dheal==0) {sessionStorage.dheal=1; h_button.value=" Лечу цель ";}
			else {sessionStorage.dheal=0; h_button.value=" Лечу союзников ";}
		}
		else if (title.match(/Каменный тролль|Дракон (\d+) ур/i)){
			if (sessionStorage.dheal==0) {sessionStorage.dheal=1; h_button.value=" Жгу ";}
			else if (sessionStorage.dheal==1) {sessionStorage.dheal=2; h_button.value=" Лечу и жгу ";}
			else {sessionStorage.dheal=0; h_button.value=" Лечу ";}
		}
	}
	if (document.getElementById("w_button")!=undefined) w_button.onclick= function() {
		if (title.match(/Храм Немезиды/i)) {
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Бью Гарма ";}
			else if (sessionStorage.atk==1) {sessionStorage.atk=2; w_button.value=" Бью Цербера ";}
			else if (sessionStorage.atk==2) {sessionStorage.atk=3; w_button.value=" Бью Немезиду ";}
			else if (sessionStorage.atk==3) {sessionStorage.atk=4; w_button.value=" Гарм->Ц+Н ";}
			else {sessionStorage.atk=0; w_button.value=" ХП+ ";}
		}
		else if (title.match(/Долина Великанов/i) && !rus_t.match(/Долина Великанов находится в Ущелье/)){
			if (sessionStorage.atk==0) {sessionStorage.atk=1; w_button.value=" Бью Япитера ";}
			else if (sessionStorage.atk==1) {sessionStorage.atk=2; w_button.value=" Бью Эпитера ";}
			else {sessionStorage.atk=0; w_button.value=" Яп->Эп ";}
		}
	}
}

function MyTimer() {//clearTimeout
	if (document.getElementById("timer")!=undefined){
	       	t2 = +new Date(); tmr=t1+Number(trayStatus)-t2;
		if(tmr<60) {document.getElementById("timer").innerHTML="0.0"; clearInterval(t)}
		else document.getElementById("timer").innerHTML=(tmr/1000).toFixed(1);} 
}

function goToPassive(){
	if (title.match("Магазин умений") && passive!='') click(passive, timeout)
	else if (title.match("Мои умения") && trade_ability!='') click(trade_ability, timeout)
	else if (title.match("Мой герой") && abilities!='') click(abilities, timeout)
	else if (InTowers) click(naGlavnuy, timeout)
	else click(user, timeout)
}

function abilities_()
{

if (strateg && Scrolls[13]!=0 && mark[18]!=1 && !action && !Boss && !InEvents) 
{
	if (mark[22]==1) goToAbilities_()
	if (title.match('Пассивное умение')) {
		if ( rus_t.match("Ты уже используешь все доступные умения") ) goToAbilities();
		else if ( rus_t.match(/\[купить\] цена:1 /)) click(epicBuyLink, timeout);
		else mark[18]=1
	}
	else for (var i=0;i<=12;i++) {if (Scrolls[i]==0 && i!=8) goToPassive();}
}
	if (title.match(/Мой герой|Мои умения/)) for (var i=0;i<=13;i++) {if (!rus_t.match(name_scrl[i]) && !/нет/.test(Scrolls[i]) ) Scrolls[i]=0;}
	sessionStorage.scrolls=Scrolls
	if (title.match(/Мой герой/)) for (var i=0;i<=12;i++) {if (rus_t.match(name_scrl[i]) && !/\d+/.test(Scrolls[i]) && SetScroll[i]==1 && abilities!='') {click(abilities, timeout); break;}}

	if (SetAbilities) 
	{
		if (sessionStorage.abilities==undefined) click('/user/abilities', timeout);
		if (title.match('Мои умения'))
		{
			var r_tm=rNum(30, 120)
			for (var i=0;i<=13;i++) {
				var reg=new RegExp(name_scrl[i]+" \\[(\\d+):(\\d+):(\\d+)", "i")
				if (reg.test(rus_t)) {Scrolls[i]=getSec(reg.exec(rus_t))+comp_time+r_tm;}		
			}
			sessionStorage.scrolls=Scrolls

			sessionStorage.abilities=''
			for (var i=3;i>0;i--) {
				if (rus_t.match("Выбрать набор "+i)) {sessionStorage.abilities=i+" ";break;}
				else sessionStorage.abilities="0 "
			}
			for (var i=1;i<=3;i++) {if (abilitiesSetLink[i]==undefined && rus_t.match('Выбрать набор '+i)) sessionStorage.abilities+=i+',';}
			if (!rus_t.match('Умения нельзя менять в бою') ) 
				for (var i=1;i<=3;i++) {if (sessionStorage.setAbil==i && abilitiesSetLink[i]!=undefined) {click(a[abilitiesSetLink[i]], timeout);}}
			else if (vboy!='') click(vboy, timeout)
			else click(user, timeout)
			sessionStorage.removeItem('setAbil');
		}
	
		if (sessionStorage.abilities[0]>=sessionStorage.setAbil && title.match('Варвары') && sessionStorage.setAbil!=undefined && !action ) click('/user/abilities', timeout);

		else if (!action )
		{
		if ( sessionStorage.abilities[0]>=Abilities_N[0] && InTowers && !sessionStorage.abilities.match(Abilities_N[0]+',') ) {
			sessionStorage.setAbil=Abilities_N[0];
			click(naGlavnuy, timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[1] && title.match('Арена') && attack1=='' &&  !sessionStorage.abilities.match(Abilities_N[1]+',') ) {
			sessionStorage.setAbil=Abilities_N[1];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[2] && vzamok=='' && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abilities_N[2]+',') && title.match(/Голова дракона|Сердце титана|Гроза миров|Крепость духа|Исцеление предков|Зеркало боли|Источник познания|Колыбель жизни/) ) {
			sessionStorage.setAbil=Abilities_N[2];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[3] && title.match(/Турнир героев|Командный турнир/) && attack1=='' && !sessionStorage.abilities.match(Abilities_N[3]+',') ) {
			sessionStorage.setAbil=Abilities_N[3];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[4] && title.match('Выживание') && attack1=='' &&  !sessionStorage.abilities.match(Abilities_N[4]+',') ) {
			sessionStorage.setAbil=Abilities_N[4];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[5] && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abilities_N[5]+',') && title.match('Территория') ) {
			sessionStorage.setAbil=Abilities_N[5];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[6] && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abilities_N[6]+',') && title.match('Битва героев')  ) {
			sessionStorage.setAbil=Abilities_N[6];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[7] && title.match('Поля сражений') && attack1=='' && Abilities_N[7]!=0 && !sessionStorage.abilities.match(Abilities_N[7]+',') ) {
			sessionStorage.setAbil=Abilities_N[7];
			click('/user/abilities', timeout);}

		else if ( sessionStorage.abilities[0]>=Abilities_N[8] && Boss && attack1=='' && heal=='' && !sessionStorage.abilities.match(Abilities_N[8]+',') ) {
			sessionStorage.setAbil=Abilities_N[8];
			click('/user/abilities', timeout);}	
			
		else if ( sessionStorage.abilities[0]>=Abilities_N[10] && title.match(/Цари (Г|г)оры/) && attack1=='' && !sessionStorage.abilities.match(Abilities_N[10]+',') ) {
			sessionStorage.setAbil=Abilities_N[10];
			click('/user/abilities', timeout);}		
		}
	}
	
}

function testAbility(x){
	if ( sessionStorage.abilities[x]>=Abilities_N[x] && !sessionStorage.abilities.match(Abilities_N[x]+',') ) return true; else return false;
}

function getSec(arr){return Number(Number(arr[1])*3600+Number(arr[2])*60+Number(arr[3]));}


function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : undefined 
}
