// ==UserScript==
// @name 	Ikariam: Island_Control
// @author 	Phate
// @version	4.02
// @description	A script for Ikariam v0.4.0 that colors leechers 
// @include		http://s*.ikariam.*/*
// @exclude		http://board.ikariam.*/*
// @require 	http://www.betawarriors.com/bin/gm/57756user.js
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require     http://flot.googlecode.com/svn/trunk/jquery.flot.js
//
// @history	4.02 Hack script 57756.
// @history	4.01 Edit code increase performace.
// @history	4.01 Updated spanish, dutch and polish traslation.
// @history	4.00 Added and updated the text. I ask your help for the translation in your language.
// @history	4.00 In the resort, you can create the message to send in the agora.
// @history	4.00 In the historical graph by moving the mouse over the name in the legend you can view the details of donations.
// @history	4.00 FixBug: When a resource is in the upgrade, the script always returns the message to visit the island.
// @history	4.00 FixBug: Error in the tooltip for the calculation of all donations in the island.
// @history	4.00 FixBug: Error in color the table rows.
// @history	4.00 FixBug: Failed to calculate the new shares to upgrade the resource.
// @history	3.63 FixBug: Display all warker and level in table.
// @history	3.62 FixBug: Display all cities in table.
// @history	3.61 Island view: the player's name is the name of the alliance. you put your mouse over it, and flash all the cities of the same alliance.
// @history	3.61 Changed the code to speed up the script.
// @history	3.61 Update Ukrainian, Arabic and Russian translation.
// @history	3.60 Change realtime trends of donations. You can save data every five days for a maximum of 5 steps (WIP).
// @history	3.60 Added historical trends of donations. stores up to 10 steps. The player can save the donations with the appropriate button (WIP).
// @history	3.60 Rewrote a lot of code with jquery.
// @history	3.50 Added link to the agora in the sawmill and luxury goods.
// @history	3.50 Added link to the Agora in the icon 'view island'.
// @history	3.50 In page 'options' you can now select whether to display links resources or links temple and agora.
// @history	3.50 Added realtime trends of donations with 6 points, when the buffer is full saves every 10 days.
// @history	3.50 Added reset button to set the island in default conditions. Reset clears the data trend.
// @history	3.50 Improved the code to hide the introduction of table donations.
// @history	3.50 The info resources, if the calculation for the next level increases the shares more than 5,000, the script under the symbol ">" notice that the shares calculated is not sufficient for the upgrade.
// @history	3.50 Added Hungarian translation, Bulgarian, Danish and Ukrainian.
// @history	3.50 BugFix, putting a zero quota, no more calculating statistics.
// ==/UserScript==
ScriptUpdater.check(52047, '4.02');

var lversion = '4.02';
const lineColor = [	"rgb(237,194,64)","rgb(175,216,248)","rgb(203,75,75)","rgb(77,167,77)","rgb(148,64,237)",
					"rgb(189,155,51)","rgb(140,172,198)","rgb(162,60,60)","rgb(61,133,61)","rgb(118,51,189)",
					"rgb(255,232,76)","rgb(210,255,255)","rgb(243,90,90)","rgb(92,200,92)","rgb(177,76,255)",
					"rgb(142,116,38)","rgb(105,129,148)","rgb(121,45,45)","rgb(46,100,46)","rgb(88,38,142)"];	
const ltyp = ['ar','bg','de','dk','en','es','fr','gr','hu','it','nl','pl','ru','ua']
const langs = 
{ 	//LANGUAGES
	ar:
	{ // Arabic traslate by Samerramez
		infotext: "اللاعبين اللذين يكتب عندهم جيد جدا اللذين يستخدمون الموارد الجزيرة يجب أن تساهم في تنميتها التبرع وفقا لمواد البناء "+
			"عدد العملل وحجم المدينة. مشاركة التبرع يمكن ان تكون " +
			"لكل منشرة والمورد الآخر المتوفر على الجزيرة.",
		infotxt1: "على كل لاعب يجب اتباع هذه الصيغة لتناسب مستوى التبرعات:",
		infotxt2: "التبرع = (Qw * عدد العمال) + (Qt * مستوى دار البلدية)",
		infotxt3: "Qw",
		infotxt4: " = مشاركة على عدد العمال | ",
		infotxt5: "Qm",
		infotxt6: " = مشاركة على حسب مستوى دار البلدية",
		infotxt7: "اسطورة:",
		info1ico: "جيد جدا!",
		info2ico: "مصاص دماء, لكن متبقي 10% ليكون متبرع بالقدر المطلوب.",
		info3ico: "بخيل جدا.",
		scorewrk: "نشر على عدد العمال",
		scorelvl: "نشر على مستوى دار البلدية",
		chkboxvl: " تقدير كل لاعب في التبرعات في الجزيرة",
		stat1: "من أجل الوصول الى المستوى التالي",
		stat2: "المتبقي",
		stat31: "والتبرعات التي تفتقر إلى ما يكفي من اللاعبين نشط.",
		stat32: "وأنها تخدم أيضا التبرعات التي تفتقر إلى لاعبين في وضع اجازة .",
		stat33: "ومن الضروري لزيادة مستوى التبرعات.",
		stat33wrk: " لكل عامل. ",
		stat33lvl: " لكل مستوى دار بلدية",
		statupgrd1: " المستوى",
		statupgrd2: "تحت البناء.",
		statinfo1: "في الجزيرة يوجد",
		statinfo2: "المدن وعلى مستوى متوسط من دار البلدية",
		statinfo3: "على كل اللاعبين تبرعوا ",
		statinfo4: " وهم ",
		statinfo5: "العمال. ",
		alertisland: "انت يجب عليك زيارة الجزيرة. \n في هذه الخالة اللاعبين الخاملين واللاعبين في وضع العطلة سوف يختفون.",
		dateisland: " تحديث الجزيرة: ",
		alertres1: "انت يجب عليك زيارة ",
		alertres2: "وبهذه الطريقة سيكون من الممكن إجراء تقييم عام للتبرعات من الجزيرة.",
		tradegood: " منشرة الخشب",
		resource: " المورد الأخر المتوفر على الجزيرة",
		dateresource: " تحديث ",
		errortxt: "Island_Control يوجد بعض الأخطاء.\n\n",
		errortxt1: " \n\n هل تريد ارسال الخطأ الى مالك السكريبت ?",
		optiontxt1: "اظهار اسم اللاعب في الجزيرة: ",
		optiontxt2: "اظهار رابط مع الأيقونات للوصول الى مختصرات الجزيرة: ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "اختيار اللغة",
		rtd_intro: ["المتبرع "," في "," الأيام"],
		his_title: "الرسم البياني",
		his_head:['Date','Donation','∆D'],
		trend_th: "k",
		month: ["1","2","3","4","5","6","7","8","9","10","11","12"],
		msgAgora: "كتابة رسالة الى AGORA",
		msg_share: 'Add shares',
		msg_info: 'إضافة إحصائية',
		msg_ply: 'اللاعبين',
		msg_ply1: 'الكل',
		msg_ply2: 'دين واجب الدفع',
		msg_ply3: 'ائتمان',
		msg_ply4: 'بدون',
		msg_compile: ' جمع',
		msg_subject: 'الموضوع',
		msg_message: 'الرسالة',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	bg:
	{ // Bulgarian translation by Muhomor
		infotext: "Играчите, които добиват ресурси на острова, трябва да помогнат за развитието му, като дарят строителен материал в зависимост от "+
			"броя работници и големината на градовете. Вноски по даренията може да бъдат задавани "+
			" за депозита във всяка дъскорезница и мина за луксозен ресурс.",
		infotxt1: "Строителния материал, който всеки играч следва да дари, се изчислява по следната формула:",
		infotxt2: "Дарение = (Qw * работник) + (Qt * ниво на кметство)",
		infotxt3: "Qw",
		infotxt4: " = вноска за всеки работник | ",
		infotxt5: "Qm",
		infotxt6: " = вноска за всяко ниво на кметство",
		infotxt7: "Легенда :",
		info1ico: "Отлично!",
		info2ico: "Пиявица, но остават само 10% да бъдат дарени.",
		info3ico: "Истинска пиявица.",
		scorewrk: "Вноска за работник",
		scorelvl: "Вноска за ниво на кметството",
		chkboxvl: " Пресметни всички дарения на острова за играча",
		stat1: "За да се вдигне още едно ниво",
		stat2: "остават",
		stat31: "и даренията, които следва да внесат активните играчи, са достатъчни.",
		stat32: "в които са включени и вноските за играчите във ваканционен режим.",
		stat33: "и трябва да се повишат вноските.",
		stat33wrk: " за всеки работник. ",
		stat33lvl: " за всяко ниво на кметство",
		statupgrd1: " Нивото",
		statupgrd2: "се вдига.",
		statinfo1: "На острова има",
		statinfo2: "града, като средното ниво на кметство е",
		statinfo3: "Играчите са дарили общо ",
		statinfo4: " и в момента има",
		statinfo5: "работници. ",
		alertisland: "Идете на островната карта. \ n Така ще бъдат отчетени неактивните и играчите във ваканционен режим.",
		dateisland: " Ъпдейт на острова: ",
		alertres1: "Посетете ",
		alertres2: "Така ще могат да бъдат направени общите изчисления за даренията на острова.",
		tradegood: " дъскорезницата",
		resource: " находището за луксозен ресурс",
		dateresource: " Ъпдейт ",
		errortxt: "Възникна грешка.",
		errortxt1: " \n\n Бихте ли доклад за тази грешка на автора?",
		optiontxt1: "Покажи името на играча на островната карта: ",
		optiontxt2: "Избор на език:",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Select language",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add the statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compile',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	de:
	{ // German traslate by HNO2  
		infotext: "Die Spieler, die die Rohstoffe der Insel benutzen sollten zu der Entwicklung der Insel beitragen indem sie gem&auml;&szlig; der Anzahl  "+  
			"ihrer Arbeiter und der Gr&ouml;&szlig;e ihrer Stadt Baumaterial spenden. Die Spenden k&ouml;nnen f&uuml;r jedes S&auml;gewerk" +  
			" und  Luxusrohstoffelager einzeln eingestellt werden.",  
		infotxt1: "Wie viel jeder Spieler spenden sollte wird wie folgt berechnet:",  
		infotxt2: "Spenden = (Qw * Arbeiter) + (Qt * Level deines Rathauses)",  
		infotxt3: "Qw",  
		infotxt4: " = Spende f&uuml;r jeden Arbeiter | ",  
		infotxt5: "Qm",  
		infotxt6: " = Spende f&uuml;r jedes Level deines Rathauses",  
		infotxt7: "Legende:",  
		info1ico: "Sehr gut!",  
		info2ico: "Ganz OK.",  
		info3ico: "Richtiger Blutsauger.",  
		scorewrk: "Spende f&uuml;r Arbeiter",  
		scorelvl: "Spende f&uuml;r das Level deines Rathauses",  
		chkboxvl: " Beurteile die Spenden aller Spieler auf der Insel",  
		stat1:  "Um Stufe ",  
		stat2:  "zu erreichen verbleiben",  
		stat31: "und die Spenden der Aktiven Spieler sind genug.",  
		stat32: "und Sie decken auch die fehlenden Spende der Spieler im Urlaubsmodus.",  
		stat33: "und die Bereitschaft zu Spenden sollte vergr&ouml;&szlig;ert werden.",  
		stat33wrk: " f&uuml;r jeden Arbeiter. ",  
		stat33lvl: " f&uuml;r jedes Level deines Rathauses",  
		statupgrd1: " Die Stufe",  
		statupgrd2: "wird aufgebaut.",  
		statinfo1: "Auf der Insel gibt es",  
		statinfo2: "St&auml;dte und die durchschnittliche  Stufe des Rathauses ist",  
		statinfo3: "Alle Spieler zusammen haben ",  
		statinfo4: " gespendet und ",  
		statinfo5: "Arbeiter arbeiten. ",  
		alertisland: "Du solltest besser die Insel besuchen. \n In this way inactive and vacation mode players will be visible.",  
		dateisland: " Letztes Update Insel: ",  
		alertres1: "Du solltest besser die Insel besuchen ",  
		alertres2: "Auf diese Weise ist es Möglich eine ",  
		tradegood: " Das S&auml;gewerk",  
		resource: " Das Luxusgutdepo",  
		dateresource: " Letztes Update ",  
		errortxt: "Island_Control hat einen Fehler erzeugt.\n\n",  
		errortxt1: " \n\n Willst du den Fehler dem Entwickler melden ?",  
		optiontxt1: "Zeige die Spielernamen auf der Inselansicht: ",  
		optiontxt2: "Zeige Links zu den Rohstoffen über den Inselicon: ",  
		optiontxt3: "Zeige die Temple- und Agoraicons bei der Inselansicht:",  
		optiontxt: "W&auml;hle eine Sprache",  
		rtd_intro:  ["Spendete "," in "," Tagen"],  
		his_title:  "Vergangene Spende",
		his_head:['Date','Donation','∆D'],		
		trend_th:   "k",
		month: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"],
		msgAgora: "Erstelle eine Nachricht für die AGORA",  
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add statistic',  
		msg_ply: 'Spieler',  
		msg_ply1: 'Alle',  
		msg_ply2: 'Debt',  
		msg_ply3: 'Credit',  
		msg_ply4: 'Kein',  
		msg_compile: 'Compile',  
		msg_subject: 'Betreff',  
		msg_message: 'Nachricht',  
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']  
	},  
	dk:
	{ // Danish Translation by lovebug
		infotext: "Spillere, der udnytter ressourcerne på øen vil nu til at donere byggematerialer,"+
			"afhængigt af antallet af arbejdstagere og byens størrelse, de har."+
			"Det bidrag, som denne skal betales til et savværk og mit sæt.",
		infotxt1: "Bidraget for hver spiller, afhænger af følgende formel:",
		infotxt2: "Donation = (Qa * arbejdstager) + (Qs * Hall niveau)",
		infotxt3: "Qa",
		infotxt4: " er det bidrag per arbejdstager og ",
		infotxt5: "Qs",
		infotxt6: " bidrag niveau af Hall",
		infotxt7: "Legend",
		info1ico: "Excellent!",
		info2ico: "spekulant, men kun 10% skal doneres",
		info3ico: "Extreme profitmagere",
		scorewrk: "Bidrag pr arbejdstager",
		scorelvl: "Bidrag et rådhus niveau",
		chkboxvl: "Treasure afgivelse af alle spillere på øen",
		stat1: "For niveau",
		stat2: "er",
		stat31: "kræves. Ressourcerne af de manglende spillere er aktive nok for dette.",
		stat32: "kræves. Disse give råvarer af spillere manglede i ferie-mode ..",
		stat33: "kræves. Det er nødvendigt at øge bidragene.",
		stat33wrk: "for alle arbejdstagere, og",
		stat33lvl: "et rådhus niveau.",
		statupgrd1: "Level",
		statupgrd2: "er under opbygning.",
		statinfo1: "På øen",
		statinfo2: "byer med en gennemsnitlig størrelse på byen",
		statinfo3: "Sammen vil de spillere ",
		statinfo4: "vandt, og der",
		statinfo5: "arbejdstagere.",
		alertisland: "Du skal have vist øen. \ n Denne måde spillerne synligt inaktive og ferie-mode.",
		dateisland: " Island Update:",
		alertres1: "Du skal først",
		alertres2: "På denne måde er det muligt at estimere øen til at give gaver.",
		tradegood: " savværk besøg",
		resource: " Den luksusvarer ressource anmodninger",
		dateresource: " Update ",
		errortxt: "Island_Control har en fejl.",
		errortxt1: " \n\n Vil du rapporterer denne fejl til forfatteren?",
		optiontxt1: "Giv spillere navne på øen kort",
		optiontxt2: 'Giv genveje til de varer på" Island View "-knappen:',
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Vælg sprog",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sept","Okt","Nov","Dec"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add the statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compile',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	en:
	{ // English traslate Fingers
		infotext: "The players who use the resource of the island should contribute to its development donating building material according to "+
			"the number of workers and the size of the cities. The donation shares can be set " +
			"for every saw mill and luxury resource deposit.  By changing the values for workers and Town Hall levels, this will calculate if the amounts enterend will be enough.  If they are not, the numbers listed below will balance the equation so the resource will upgrade if all island members meet the donation levels entered.",
		infotxt1: "The contribution that every player should donate is regulated by the following formula:",
		infotxt2: "Donation = (Qw * worker) + (Qt * level of the town hall)",
		infotxt3: "Qw",
		infotxt4: " = Share by every worker | ",
		infotxt5: "Qm",
		infotxt6: " = Share by every level of the town hall",
		infotxt7: "Legend:",
		info1ico: "Above Their Share",
		info2ico: "Under Their Share by 10%.",
		info3ico: "True Bloodsucker.",
		scorewrk: "Share by worker",
		scorelvl: "Share by level of the town hall",
		chkboxvl: " Estimate all player's donations in the island",
		stat1:	"In order to reach level",
		stat2:	", this resource needs",
		stat31:	"more donated.  If everone donates the above amounts, this will be enough to upgrade.",
		stat32:	"more.  They serve also the donations lacking the players in vacation mode.",
		stat33: "more.  It is necessary to increase the donation shares to the amounts shown below.",
		stat33wrk: " donated for every worker. ",
		stat33lvl: " donated for every level of the Town Hall",
		statupgrd1: " The resource is being upgraded to level",
		statupgrd2: ", and will be done soon.",
		statinfo1: "On this island there are",
		statinfo2: "cities.  The average level of the Town Hall is",
		statinfo3: "All players have donated a total of ",
		statinfo4: ".  There are",
		statinfo5: "workers. ",
		alertisland: "You'd better visit the island. \n In this way inactive and vacation mode players will be visible.",
		dateisland: " Update Island: ",
		alertres1: "You'd better visit ",
		alertres2: "In this way it will be possible to make a general evaluation of the donations of the island.",
		tradegood: " the saw mill",
		resource: " the luxury resource deposit",
		dateresource: " Update ",
		errortxt: "Island_Control has generated an error.\n\n",
		errortxt1: " \n\n You want to signal the error to the author?",
		optiontxt1: "Show player's name in the island view: ",
		optiontxt2: "Show links to the resources over 'Island View': ",
		optiontxt3: "Shows icons for the temple and agora over 'Island View':",
		optiontxt: "Select language",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compute',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	es:
	{ // Spanish traslate by Rohcodom
		infotext: "Los jugadores que usan los recursos de la isla deberían contribuir a su crecimiento donando material de construcción de acuerdo a "+
			"la cantidad de trabajadores y al tamaño de sus ciudades. Las donaciones pueden ser configuradas para cada " +
			"aserradero y cada cantera de bienes de lujo.",
		infotxt1: "La contribución que cada jugador debe donar está regulada por la siguiente fórmula:",
		infotxt2:"Donación = (Qw * trabajador) + (Qt * nivel de la intendencia)",
		infotxt3:"Qw",
		infotxt4:" = Porción por cada trabajador | ",
		infotxt5:"Qt",
		infotxt6:" = Porción por cada nivel de la intendencia",
		infotxt7:"Simbología:",
		info1ico: "¡Muy bien!",
		info2ico: "Sanguijuela, pero está a 10% de hacer lo correcto.",
		info3ico: "Sanguijuela total",
		scorewrk: "Porción por trabajador",
		scorelvl: "Porción por nivel de intendencia",
		chkboxvl: " Tomar en cuenta las donaciones globales de los jugadores en la isla",
		stat1:  "A fin de alcanzar el nivel",
		stat2:  "faltan",
		stat31: "y los valores de las porciones actuales son los correctos.",
		stat32: "y también se consideran las donaciones de los jugadores en modo vacaciones.",
		stat33: "y es necesario incrementar los valores de las porciones actuales:",
		stat33wrk: " por cada trabajador. ",
		stat33lvl: " por cada nivel de la intendencia",
		statupgrd1: " El nivel",
		statupgrd2: " está en construcción.",
		statinfo1: "En la isla hay",
		statinfo2: "ciudades y el nivel promedio de las intendencias es",
		statinfo3: "En total, los jugadores han donado ",
		statinfo4: " y tienen",
		statinfo5: "trabajadores. ",
		alertisland: "Es mejor que visites la isla.\n De esta forma, los jugadores inactivos y en modo vacaciones serán tomados en cuenta.",
		dateisland: " Actualización de la isla: ",
		alertres1: "Es mejor que visites ",
		alertres2: "de esta forma, será posible hacer una evaluación general de las donaciones en la isla.",
		tradegood: " el aserradero",
		resource: " la cantera de bienes de lujo",
		dateresource: " Actualizado ",
		errortxt:"Island_Control ha generado un error.\n\n",
		errortxt1:" \n\n ¿Deseas informar del error al autor?",
		optiontxt1: "Mostrar el nombre del jugador en la vista de la isla: ",
		optiontxt2: "Mostrar enlaces a los recursos en el icono de la isla: ",
		optiontxt3: 'Mostrar los íconos del templo y el ágora en "Mostrar isla":',
		optiontxt: "Elegir idioma",
		rtd_intro:  ["Donado "," en "," días"],
		his_title:  "Historial de Donación",
		his_head:['Fecha','Donación','?D'],
		trend_th:   "k",
		month: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
		msgAgora: "Creando mensaje para la Ágora",
		msg_share: 'Agregar donaciones',
		msg_info: 'Agregar estadísticas',
		msg_ply: 'Jugadores',
		msg_ply1: 'Todo',
		msg_ply2: 'Faltante',
		msg_ply3: 'Sobrante',
		msg_ply4: 'Nada',
		msg_compile: 'Compilar',
		msg_subject: 'Encabezado',
		msg_message: 'Mensaje',
		msg_yes:'Crear nuevo mensaje',
		msg_cancel:'Regresar',
		msg_chr:' Caracteres',
		msg_sh: "Donación ",
		msg_allDon:"En la isla se evalúan las donaciones de todos los jugadores.",
		msg_hdPly:['Faltantes',' y ','Sobrantes',' de los jugadores:']
	},
	fr:
	{ // Francais traduit par BorisLeHachoir
		infotext: "Les joueurs qui utilisent les ressources de l'île devraient contribuer à son développement par un don de matériaux de construction en fonction "+
			"du nombre de travailleurs et de la taille des villes. Les dons peuvent être configurés "+
			"pour chaque scierie et chaque tas de produits de luxe.",
		infotxt1: "La contribution de chaque joueur est régulée par la formule suivante :",
		infotxt2:"Donation = (Qw * travailleur) + (Qt * niveau de la ville)",
		infotxt3:"Qw",
		infotxt4:" = Partager par chaque travailleur | ",
		infotxt5:"Qm",
		infotxt6:" = partager par chaque ville",
		infotxt7:"Légende :",
		info1ico: "Très bien !",
		info2ico: "Radin, mais seulement 10% des ressources peuvent être données.",
		info3ico: "Gros radin.",
		scorewrk: "Donné pour chaque travailleurs",
		scorelvl: "Donné pour chaque niveau de ville ville",
		chkboxvl: "Estimer tous les dons de joueur dans l'île",
		stat1:	"Afin d'atteindre le niveau",
		stat2:	"il reste",
		stat31:	"et les dons sont suffisants.",
		stat32:	"and they serve also the donations lacking the players in vacation mode.",
		stat33: "et il est nécessaire d'ajouter les dons suivants.",
		stat33wrk: " pour chaque travailleur. ",
		stat33lvl: " tout niveau de ville",
		statupgrd1: " Le niveau",
		statupgrd2: "est en construction.",
		statinfo1: "Sur l'île, il y a",
		statinfo2: "villes et le niveau moyen des villes est de",
		statinfo3: "Les joueurs ont donné sur le tas ",
		statinfo4: " et il y a ",
		statinfo5: "travailleurs. ",
		alertisland: "Tu ferais mieux de visiter l'ile, pour que les joueurs inactifs mode vacances seront visibles.",
		dateisland: " Mise a jour de l'ile ",
		alertres1: "Tu ferais mieux de visiter ",
		alertres2: " dans le but de faire une évaluation générale de la donation de l'île.",
		tradegood: " la scierie",
		resource: " le dépot des ressources de luxe.",
		dateresource: " Mise à jour ",
		errortxt: "Island_Control a généré une erreur.\n\n",
		errortxt1: " \n\n Voulez-vous signaler cette erreur à l'auteur?",
		optiontxt1: "Afficher le nom du joueur sur l'île: ",
		optiontxt2: "Afficher les liens vers les ressources sur l'icône pour l'île: ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Choisir la langue",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["Jan","Fev","Mars","Avr","Mai","Juin","Juil","Août","Sept","Oct","Nov","Dec"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add the statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compile',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	gr:
	{ // Greek traslation by RadioActive
		infotext: "Οι παίκτες που χρησιμοποιούν τον πόρο του νησιού θα πρέπει να συμβάλλουν στην ανάπτυξή του δωρίζοντας οικοδομικό υλικό σύμφωνα με τον "+
			"αριθμό των εργαζομένων και το μέγεθος των δημαρχείων. Τα μερίδια δωρεών μπορούν να ρυθμιστούν " +
			"για κάθε πριονιστήριο και πόρο αγαθών πολυτελείας.",
		infotxt1: "Η συμβολή του κάθε παίκτη προκύπτει από τον παρακάτω τύπο:",
		infotxt2:"Δωρεά = (Qw * εργάτες) + (Qt * επίπεδο δημαρχείου)",
		infotxt3:"Qw",
		infotxt4:" = Μερίδιο από κάθε εργάτη | ",
		infotxt5:"Qm",
		infotxt6:" = Μερίδιο από κάθε επίπεδο δημαρχείου",
		infotxt7:"Υπόδειγμα:",
		info1ico: "Πολύ καλά!",
		info2ico: "Μέτρια, μόνο το 10% παραμένει για να ολοκληρωθεί η δωρεά.",
		info3ico: "Φύρα.",
		scorewrk: "Μερίδιο εργάτη",
		scorelvl: "Μερίδιο επιπέδου δημαρχείου",
		chkboxvl: " Εκτίμηση συνολικών δωρεών στο νησί",
		stat1:	"Για το επίπεδο",
		stat2:	"υπολείπονται",
		stat31:	"και οι δωρεές που πρέπει να πραγματοποιηθούν από τους ενεργούς παίκτες είναι αρκετές.",
		stat32:	"και εξυπηρετούν επίσης τις δωρεές των παικτών που είναι σε κατάσταση διακοπών.",
		stat33: "και είναι απαραίτητο να αυξηθούν τα μερίδια των δωρεών.",
		stat33wrk: " για κάθε εργάτη. ",
		stat33lvl: " για κάθε επίπεδο του δημαρχείου",
		statupgrd1: " Το επίπεδο",
		statupgrd2: "είναι υπό κατασκευή.",
		statinfo1: "Στο νησί υπάρχουν",
		statinfo2: "πόλεις και το μέσο επίπεδο των δημαρχείων είναι",
		statinfo3: "Συνολικά οι παίκτες έχουν δωρίσει ",
		statinfo4: " και υπάρχουν",
		statinfo5: "εργάτες. ",
		alertisland: "Προτείνεται να δείτε το νησί. \n Έτσι, ανενεργοί παίκτες και παίκτες σε κατάσταση διακοπών θα είναι ορατοί.",
		dateisland: " Τελευταία ενημέρωση νησιού: ",
		alertres1: "Προτείνεται να δείτε ",
		alertres2: "Έτσι, θα είναι δυνατή μια γενική εκτίμηση των δωρεών στο νησί.",
		tradegood: " το Πριονιστήριο",
		resource: " τον πόρο αγαθού πολυτελείας",
		dateresource: " Ενημέρωση ",
		errortxt: "Το Island_Control έχει δημιουργήσει ένα σφάλμα.\n\n",
		errortxt1:" \n\n You want to signal the error to the author?",
		optiontxt1: "Προβολή ονόματος παικτών στην Προβολή Νησιού: ",
		optiontxt2: "Προβολή συντομεύσεων για τους πόρους επάνω στο εικονίδιο 'Το Νησί μου': ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Επιλογή γλώσσας",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["01","02","03","04","05","06","07","08","09","10","11","12"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add the statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compile',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	hu:
	{ // Magyar fordítás: Sracz66
		infotext: "A sziget erőforrásait használó játékosoknak adományozással kell hozzájárulniuk azok fejlődéséhez, "+ 
			"a városháza szintjüknek és a dolgozóik számának megfelelően. Az adakozás mértéke egyénileg"+
			"állítható minden fűrésztelepen és bányában.",
		infotxt1: "A minden játékostól elvárt adomány a következő egyenlettel kiszámítható:",
		infotxt2: "Adomány = (Qm * munkás) + (Qv * városháza szint)",
		infotxt5: "Qm",
		infotxt4: "	= munkások száma | ",
		infotxt5: "Qm",
		infotxt6: "= városháza szintjei",
		infotxt7: "Jelmagyarázat:",
		info1ico: "Kiváló!",
		info2ico: "Élősködő, de csak legfeljebb 10% hiányzik a szükséges adományból.",
		info3ico: "Igazi pióca!",
		scorewrk: "Részesedés a munkások miatt",
		scorelvl: "Részesedés városháza miatt szintenként",
		chkboxvl: " Az összes adakozást kiértékelni",
		stat1:	"A következő (",
		stat2:	") szint eléréséhez szükséges további ",
		stat31:	"Az adakozáshoz szükséges aktív játékos elegendő.",
		stat32:	"Az adakozásból néhány vakáció módban lévő játékos hiányzik",
		stat33: "Az adakozás mértékét növelni kell",
		stat33wrk: " -ra minden dolgozó után és ",
		stat33lvl: " -ra minden városház szint után.",
		statupgrd1: " Szint",
		statupgrd2: "építés alatt.",
		statinfo1: "A szigeten található",
		statinfo2: "város és az átlagos városház szint",
		statinfo3: "A játékosok összesen adtak ",
		statinfo4: " és van",
		statinfo5: " munkás.",
		alertisland: "Nézd meg a szigetet!. \n Ez után láthatóak lesznek a vakáció módban lévő és az inaktív játékosok.",
		dateisland: " Sziget frissítése: ",
		alertres1: "Nézd meg!",
		alertres2: "Így átfogó értékelést lehet készíteni a sziget adományairól.",
		tradegood: " a fűrésztelep",
		resource: " a luxus bánya",
		dateresource: " Frissítés ",
		errortxt: "Island_Control hibát észlelt.",
		errortxt1:" \n\n Szeretne jelentse ezt a hibát, hogy a szerző?",
		optiontxt1: "Játékos nevek mutatása a sziget nézetben: ",
		optiontxt2: "Bányák linkjeinek mutatása a sziget ikon felett: ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Nyelv választás",
		rtd_intro: 	["Donated "," in "," days"],
		his_title: 	"Historic Donation",
		his_head:['Date','Donation','∆D'],
		trend_th:	"k",
		month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
		msgAgora: "Creating message for AGORA",
		msg_share: 'Add shares',
		msg_info: 'Add the statistics',
		msg_ply: 'Players',
		msg_ply1: 'All',
		msg_ply2: 'Debt',
		msg_ply3: 'Credit',
		msg_ply4: 'None',
		msg_compile: 'Compile',
		msg_subject: 'Subject',
		msg_message: 'Message',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
		},
	it:
	{ // Italian texts by myself
		infotext: "I giocatori che sfruttano le risorse dell'isola devono contribuire al suo sviluppo donando legname in base "+
			"ai lavoratori e alla grandezza delle citt&agrave;. Le quote di donazione si possono impostare per " +
			"ogni falegnameria e bene di lusso.",
		infotxt1: "Il contributo che ogni giocatore deve donare &egrave; regolato dalla seguente formula:",
		infotxt2:"Donazione = (Ql * Lavoratori) + (Qm * LivelloMunicipio)",
		infotxt3:"Ql",
		infotxt4:" = quota per ogni lavoratore | ",
		infotxt5:"Qm",
		infotxt6:" = quota per ogni livello del municipio",
		infotxt7:"Legenda:",
		info1ico: "Ha donato legna a sufficenza",
		info2ico: "Sfruttatore, ma gli resta solo il 10% da donare.",
		info3ico: "Sfrutta le donazioni altrui",
		scorewrk: "Quota lavoratori",
		scorelvl: "Quota livello Municipio",
		chkboxvl: " Valutare tutte le donazioni fatte nell'isola dai giocatori",
		stat1:	"Per raggiungere il livello",
		stat2:	"mancano",
		stat31:	"e bastano le donazioni mancanti dei giocatori attivi.",
		stat32:	"e servono anche le donazioni mancanti dei giocatori in vacanza.",
		stat33: "ed &eacute; necessario aumentare le quote di donazione.",
		stat33wrk: " per ogni lavoratore. ",
		stat33lvl: " per ogni livello del municipio.",
		statupgrd1: " Il livello",
		statupgrd2: "&egrave in costruzione.",
		statinfo1: "Nell'isola esistono",
		statinfo2: "citt&agrave; e il livello medio del municipio &eacute;",
		statinfo3: "I giocatori hanno donato in totale",
		statinfo4: " e ci sono",
		statinfo5: "lavoratori. ",
		alertisland: "Si consiglia di visitare l'isola.\n In questo modo saranno visibili i giocatori in vacanza e inattivi.",
		dateisland: " Agg. Isola: ",
		alertres1: "Si consiglia di visitare ",
		alertres2: "In questo modo sara possibile fare una valutazione complessiva delle donazioni.",
		tradegood: " la Falegnameria",
		resource: " il Bene di lusso",
		dateresource:" Agg. ",
		errortxt:"Island_Control ha generato un errore.\n\n",
		errortxt1:" \n\n Vuoi segnalare l'errore all'autore?",
		optiontxt1:"Visualizza i nomi dei giocatori nell'isola: ",
		optiontxt2:"Visualizza i link delle risorse nell'icona 'Mostra isola': ",
		optiontxt3:"Visualizza i link del tempio e dell'agorà nell'icona 'Mostra isola': ",
		optiontxt:"Seleziona la lingua",
		rtd_intro:["Donato "," in "," giorni"],
		his_title:"Storico Donazioni",
		his_head:['Data','Donazione','∆D'],
		trend_th:"k",
		month: ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
		msgAgora: "Creazione messaggio per AGORA",
		msg_share:'Aggiungi le Quote.',
		msg_info:'Aggiungi le statistiche.',
		msg_ply:'Giocatori',
		msg_ply1:'Tutti',
		msg_ply2:'Debitori',
		msg_ply3:'Creditori',
		msg_ply4:'Nessuno',
		msg_compile: 'Compila',
		msg_subject: 'Oggetto:',
		msg_message: 'Messaggio:',
		msg_yes:'Crea un nuovo post',
		msg_cancel:'Indietro',
		msg_chr:' Caratteri',
		msg_sh: "Quote ",
		msg_allDon:"Nell'isola vengono valutate tutte le donazioni del giocatore.",
		msg_hdPly:['Debiti',' e ','Crediti',' dei giocatori:']
	},
	nl:
	{ // Dutch translation
		infotext:"Spelers die grondstoffen ontginnen van het eiland zullen hier bouwmateriaalmoeten doneren, "+
			"afhankelijk van het aantal arbeiders en de stadsgrootte die ze hebben. " +
			"De bijdrage die hiervoor afgedragen dient te worden kan per zagerij en mijn ingesteld worden.",
		infotxt1:"De bijdrage per speler hangt af van de volgende formule:",
		infotxt2:"Donatie = (Qa * arbeider) + (Qs * stadhuis level)",
		infotxt3:"Qa",
		infotxt4:" is de bijdrage per arbeider en ",
		infotxt5:"Qs",
		infotxt6:" de bijdrage per stadhuis level",
		infotxt7:"Legenda:",
		info1ico:"Uitstekend!",
		info2ico:"Profiteur, maar slechts 10% moet nog gedoneerd worden",
		info3ico:"Extreme profiteurs",
		scorewrk:"Bijdrage per arbeider",
		scorelvl:"Bijdrage per stadhuis level",
		chkboxvl:"Schat de donaties van alle spelers op het eiland",
		stat1: "Voor level",
		stat2: "is nog",
		stat31: "nodig. De ontbrekende grondstoffen van de actieve spelers zijn daarvoor genoeg.",
		stat32: "nodig. Deze voorzien ook de ontbrekende grondstoffen van spelers in vakantie modus..",
		stat33: "nodig. Het is noodzakelijk om de bijdrages te verhogen.",
		stat33wrk: " voor iedere arbeider en ",
		stat33lvl: " per stadhuis level.",
		statupgrd1: " Level",
		statupgrd2: "is in aanbouw.",
		statinfo1: "Op het eiland zijn",
		statinfo2: "steden met een gemiddelde stadsgrootte van",
		statinfo3: "Alles bij elkaar hebben de spelers ",
		statinfo4: " gedoneerd en zijn er",
		statinfo5: "arbeiders. ",
		alertisland: "Je moet eerst het eiland getoond hebben. \n Op deze manier zijn de inactieve en vakantie modus spelers zichtbaar.",
		dateisland: " Eiland update: ",
		alertres1: "Je moet eerst de ",
		alertres2: "Op deze manier is het mogelijk om een schatting van de eilanddonaties te maken.",
		tradegood: " zagerij bezoeken",
		resource: " de luxe goederen bron bezoeken",
		dateresource: " Update ",
		errortxt: "Island_Control heeft een fout geconstateerd.\n\n",
		errortxt1:" \n\n You want to signal the error to the author?",
		optiontxt1: "Geef spelersnamen weer op de eilandkaart: ",
		optiontxt2: "Geef snelkoppelingen weer naar de goederen bij de 'Toon eiland' knop: ",
		optiontxt3: "Toont de iconen van de tempel en agora 'Toon eiland':",
		optiontxt: "Kies taal",
		rtd_intro: ["Heeft "," gedoneerd in "," dagen"],
		his_title: "Vroegere Donaties",
		his_head:['Date','Donation','∆D'],
		trend_th: "K",
		month: ["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
		msgAgora: "Creëren boodschap voor AGORA",
		msg_share: 'Voeg aandelen toe',
		msg_info: 'Voeg de statistieken toe',
		msg_ply: 'Spelers',
		msg_ply1: 'Iedereen',
		msg_ply2: 'Te weinig gedoneerd',
		msg_ply3: 'Voldoende gedoneerd',
		msg_ply4: 'Niemand',
		msg_compile: 'Compile',
		msg_subject: 'Onderwerp',
		msg_message: 'Bericht',
		msg_yes:'Creëren nieuw bericht',
		msg_cancel:'Terug',
		msg_chr:' Karakters',
		msg_sh: "Aandeel ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Te weinig',' en ','te veel',' voor iedere speler:']
	}, 
	pl:
	{ // Na Polski przetłumaczył Qasq & JOHNY_IKA
		infotext:"Gracze korzystający z wyspowych dóbr powinni składać datki na ich rozbudowę "+  
			"w zależności od ilości robotników oraz poziomu ratusza. Datki należy składać na każde z dóbr z osobna tj: " +  
			"na każdy tartak i kopalnię/winnicę.",  
		infotxt1: "Wysokość wpłat jest wyznaczana na podstawie formuły:",  
		infotxt2:"Wys. Wpłaty = (Qw * pracownik) + (Qm * poziom ratusza)",  
		infotxt3:"Qw",  
		infotxt4:" = Współczynnik wydobycia na pracownika | ",  
		infotxt5:"Qm",  
		infotxt6:" = Współczynnik wydobycia na poziom ratusza",  
		infotxt7:"Legenda:",  
		info1ico: "Wyśmienicie!",  
		info2ico: "Krwiopijca, brakuje 10% wpłaty.",  
		info3ico: "Prawdziwa pijawa.",  
		scorewrk: "Wydobycie na pracownika",  
		scorelvl: "Wydobycie na poziom ratusza",  
		chkboxvl: " Szacowana suma datków wszystkich graczy",  
		stat1:    "Potrzeba do rozbudowy na kolejny poziom",  
		stat2:    "brakuje",  
		stat31:    "i suma wpłat jest adekwatna do ilości aktywnych graczy.",  
		stat32:    "i suma wpłat pokrywa także braki związane z obecnością urlopowiczów.",  
		stat33: "i jest koniecznym zwiększyć wpłaty.",  
		stat33wrk: " na każdego pracownika. ",  
		stat33lvl: " na każdy poziom ratusza",  
		statupgrd1: " Poziom",  
		statupgrd2: "jest ruzbudowywany/a.",  
		statinfo1: "Na wyspie są",  
		statinfo2: "Miasta i średni poziom ratuszy to",  
		statinfo3: "W sumie sponsorzy przeznaczyli ",  
		statinfo4: " i są jeszcze",  
		statinfo5: "pracownicy/ków. ",  
		alertisland: "Lepiej odwiedź wyspę. \n Dzięki temu idlerzy oraz urlopowicze zostaną uwzględnieni na liście.",  
		dateisland: " Zaktualizuj dane Wyspy: ",  
		alertres1: "Lepiej odwiedź ",  
		alertres2: "Tym sposobem zbierzesz podstawowe informacje na temat graczy i ich wpłat.",  
		tradegood: " tartak",  
		resource: " miejsce składowania/wydobycia surowca luksusowego",  
		dateresource: " Aktualizacja ",  
		errortxt: "Island_Control otrzymał kod błędu.\n\n",  
		errortxt1:" \n\n Chcesz przeslac raport do autora?",  
		optiontxt1: "Pokaż imiona graczy: ",  
		optiontxt2: "Wyświetl przydatne linki/skróty do tartaku i kopalń obok nazwy Wyspy: ",  
		optiontxt3: "Pokazuj Cuda i Agory w 'widoku wyspy':",  
		optiontxt: "Wybierz język",  
		rtd_intro:     ["Wsparli "," w ciągu "," dni"],  
		his_title:     "Historia datków",
		his_head:['Data','Datek','∆D'],
		trend_th:    "k",
		month: ["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"],
		msgAgora: "Tworzenie wiadomości do Agory",  
		msg_share: 'Dodaj udziały', 
		msg_info: 'Dodaj statystyki',  
		msg_ply: 'Gracze',  
		msg_ply1: 'Wszyscy',  
		msg_ply2: 'Dług',  
		msg_ply3: 'Kredyt',  
		msg_ply4: 'Żaden',  
		msg_compile: 'Sporządź',  
		msg_subject: 'Temat',  
		msg_message: 'Wiadomość',  
		msg_yes:'Stwórz nowy post',
		msg_cancel:'Wstecz',
		msg_chr:' Znaków',
		msg_sh: "Udział ",
		msg_allDon:"Szacowana suma datków wszystkich graczy.",
		msg_hdPly:['Długi',' i ','Kredyty',' graczy:']
	},
	ru:
	{ // Russian translate by Disfated
		infotext:"Игроки добывающие ресурсы этого острова должны участвовать в разработке месторождений острова через пожертвования стройматериала в соответсвии с количеством рабочих, добывающих ресурсы, и размером городов.",
		infotxt1:"Размеры пожертвований, которые должен вносить каждый игрок, определяются по следующей формуле:",
		infotxt2:"Пожертвование = (Qw ? ЧислоРабочих) + (Qt ? УроверьРатуши)",
		infotxt3:"Qw",
		infotxt4:" – Взнос за каждого рабочего",
		infotxt5:"Qt",
		infotxt6:" – Взнос за каждый уровень ратуши",
		infotxt7:"Обозначения:",
		info1ico:"Пример для подражания!",
		info2ico:"Халявщик (задолжал не более 10%)",
		info3ico:"Паразитирующий дармоед",
		scorewrk:"Взнос за каждого рабочего",
		scorelvl:"Взнос за каждый уровень ратуши",
		chkboxvl:" Расчитывать взносы в общем по острову",
		stat1:"Для следующего уровня месторождения (",
		stat2:") необходимо ",
		stat31:"Текущая общая задолженность по взносам активных игроков достаточна для этого.",
		stat32:"Текущая общая задолженность по взносам всех игроков, включая неактивных, достаточна для этого.",
		stat33:"Необходимо увеличить размеры пожертвований до уровня:",
		stat33wrk:" за каждого рабочего.",
		stat33lvl:" за каждый уровень ратуши.",
		statupgrd1:" В процессе улучшения до уровня ",
		statupgrd2:"!",
		statinfo1:"На острове расположено ",
		statinfo2:" городов со средним уровнем ратуши ",
		statinfo3:"На данном месторождение за все время было пожертвовано ",
		statinfo4:", на нем занято ",
		statinfo5:"рабочих.",
		alertisland:"Для отображения неактивных игроков и игроков находящихся в режиме отпуска необходимо зайти на страницу острова.",
		dateisland:" Актуальность Остров: ",
		alertres1:"Для того, чтобы расчитать взносы на всем острове необходимо зайти на страницу",
		alertres2:"",
		tradegood:" лесопилки этого острова",
		resource:" добычи дополнительного ресурса этого острова",
		dateresource:" Актуальность ",
		errortxt:"Во время выполнения скрипта Island_Control произошла ошибка.\n\n",
		errortxt1:" \n\n Хотите сообщить автору об ошибке? ?",
		optiontxt1:"Показывать имена игроков на карте острова: ",
		optiontxt2:"Показывать ссылки на месторождения над изображением острова: ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt:"Выбрать язык",
		rtd_intro: 	["Пожертвования "," за "," дня(ей)"],
		his_title: 	"История Пожертвований",
		trend_th:	"k",
		month: ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"],
		msgAgora: "Создание сообщения для Форума",
		msg_share: 'Add shares',
		msg_info: 'Добавить статистику',
		msg_ply: 'Игрок',
		msg_ply1: 'Все',
		msg_ply2: 'Долг',
		msg_ply3: 'Переплата',
		msg_ply4: 'Ничего',
		msg_compile: 'Создать',
		msg_subject: 'Тема',
		msg_message: 'Сообщение',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
	ua:
	{ // Ukrainian traslate by feelimon
		infotext: "Гравці, які добувають ресурси на цьому острові, повинні спиряти розвитку шахт пожертвуванням будівельних матеріалів відповідно до "+
			"кількості робітників і рівня Ратуш. Розмір вкладень може бути встановлений " +
			"для кожної лісопилки і карєру.",
		infotxt1: "Вкладення, які повинен зробити кожен гравець, регулюються наступною формулою:",
		infotxt2: "Пожертвування = (Qw * Число робітників) + (Qt * рівень Ратуші)",
		infotxt3: "Qw",
		infotxt4: " = Внесок за кожного робочого | ",
		infotxt5: "Qm",
		infotxt6: " = Внесок за кожен рівень Ратуші",
		infotxt7: "Позначення:",
		info1ico: "Дуже добре!",
		info2ico: "Халявщик. Заборгував не більше 10%",
		info3ico: "Справжній дармоїд.",
		scorewrk: "Внесок за кожного робочого",
		scorelvl: "Внесок за кожен рівень Ратуші",
		chkboxvl: " Розрахувати внески взагальному по острову",
		stat1:	"Для наступного рівня родовища",
		stat2:	"необхідно",
		stat31:	"і поточна загальна заборгованість по внесках активних гравців достатня для цього.",
		stat32:	"і поточна загальна заборгованість по внесках всіх гравців, включаючи неактивних, достатня для цього.",
		stat33: "і необхідно збільшити розміри пожертвувань до:",
		stat33wrk: " за кожного робочого. ",
		stat33lvl: " за кожен рівень Ратуші",
		statupgrd1: " У процесі покращення до рівня",
		statupgrd2: "!",
		statinfo1: "На острові розташовано",
		statinfo2: "міст із середнім рівнем Ратуші",
		statinfo3: "За увесь час було пожертвувано ",
		statinfo4: ", на ньому зайнято",
		statinfo5: "робітників. ",
		alertisland: "Для відображення неактивних гравців і гравців, що знаходяться в режимі відпустки необхідно зайти на сторінку острова. ",
		dateisland: " Актуальніть даних острова: ",
		alertres1: "Вам краще ",
		alertres2: "Таким чином можливо зробити загальну оцінку пожертвувань острова",
		tradegood: " лісопилка",
		resource: " карєр",
		dateresource: " Актуальність ",
		errortxt: "Island_Control викликав помилку.\n\n",
		errortxt1: " \n\n Чи не хочете повідомити автору?",
		optiontxt1: "Показувати імена гравців на карті острова: ",
		optiontxt2: "Показувати посилання на родовища над зображенням острова: ",
		optiontxt3: "Shows the icons of the temple and agora 'island view':",
		optiontxt: "Обрати мову",
		rtd_intro: 	["Пожертвувано "," за "," дні(в)"],
		his_title: 	"Історія пожертв",
		his_head:['Date','Donation','∆D'],
		trend_th:	"тис.",
		month: ["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру"],
		msgAgora: "Створити повідомлення для Агори",
		msg_share: 'Add shares',
		msg_info: 'Додати статистику',
		msg_ply: 'Гравці',
		msg_ply1: 'Всі',
		msg_ply2: 'Борг',
		msg_ply3: 'Переплата',
		msg_ply4: 'Нічого',
		msg_compile: 'Створити',
		msg_subject: 'Тема',
		msg_message: 'Повідомлення',
		msg_yes:'Create new post',
		msg_cancel:'Back',
		msg_chr:' Chars',
		msg_sh: "Share ",
		msg_allDon:"In the island are evaluated all player's donations.",
		msg_hdPly:['Debits',' and ','Credits',' of the players:']
	},
}

var opt, page, url, lang, idisle, islePar, rtdPar, hisPar, tb;

$(window).ready(function() 
{ 
try
{
	page = $('body:first').attr('id');
	getOpt();
	url = String(window.location).split('?')[0];
	addlinkResource()		// add link of the resources on the icon island view
		
	if (page != 'tradegood' && page != 'resource' && page != 'island' && page != 'islandBoard' && page != 'options') return;
	lang = getLanguage();
		
	if (page == 'tradegood' || page == 'resource')// Check if you are at a resource deposit
	{
		idisle = parseInt($('#breadcrumbs a.island').attr('href').split('id=')[1])	// id island
		islePar = getParam(false);	// load parameter of the island
					
		var imgw = "<img src='skin/resources/icon_wood.gif' height='15' width='20'>"	// wood image				
		$('#resourceUsers').before(""+
			"<div id='island_control' class='contentBox'>"+
				"<h3 class='header'>"+
					"<a id='IS_Agora' href='"+ url +"?view=islandBoard&id="+ idisle +"'><img src='skin/board/icon_forum.gif'></a>"+
					"<div id='IS_msgAgora'><img src='/skin/interface/icon_message_write.gif'></div>"+
					"<a href='http://userscripts.org/scripts/show/52047' target='_blank'>Island_Control v "+ lversion +"</a>"+
					"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
					"<input id='IS_reset' class='button' value='Reset' type='button'>"+
					"<div id='infoButton'></div>"+
				"</h3>"+
				"<div class='content'>"+
					"<table>"+
					  "<tbody>"+
						"<tr name='hideText'>"+
							"<td id='hideInfo' colspan='3'>"+ lang.infotext +"<br /><br />"+
								"<center>"+ lang.infotxt1 +"<br />"+
								"<b>"+ lang.infotxt2 +"</b><br />"+
								"<b>"+ lang.infotxt3 +"</b>"+ lang.infotxt4 +"<b>"+ lang.infotxt5 +"</b>"+ lang.infotxt6 +"<br /><br />"+
								lang.infotxt7 +"</center>"+
							"</td>"+
						"</tr>"+
						"<tr>"+
							"<td width='33%'><center><img src='/skin/smilies/ecstatic_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='/skin/smilies/happy_x32.gif' /></center></td>"+
							"<td width='33%'><center><img src='/skin/smilies/outraged_x32.gif' /></center></td>"+
						"</tr>"+
						"<tr name='hideText'>"+
							"<td style='color: green;'><center>"+ lang.info1ico +"</center></td>"+
							"<td style='color: orange;'><center>"+ lang.info2ico +"</center></td>"+
							"<td style='color: red;'><center>"+ lang.info3ico +"</center></td>"+
						"</tr>"+
							"<table cellpadding='0' cellspacing='0'>"+
								"<tr>"+
									"<th>"+ lang.scorewrk +"</th>"+
									"<td><input id='wrkShare' type='text' size='4' value="+ islePar[page].wrk +" /> " + imgw + "</td>"+
									"<td></td>"+
									"<th>"+ lang.scorelvl +"</th>"+										
									"<td><input id='lvlShare' type='text' size='6' value="+ islePar[page].lvl +" /> " + imgw + "</td>"+
								"</tr>"+
							"</table>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><center><input type='checkbox' id='allDonation'><b>"+ lang.chkboxvl +"</b></center></td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><center>_____________________________________________________</center></td>"+						
						"</tr>"+
						"<tr>"+
							"<td colspan='3'><div id='leecherInfo'></div></center></td>"+
						"</tr>"+
					  "<tbody>"+
					"</table>"+
				"</div>"+
				"<div class='footer'></div>" +
			"</div>");
		// Style button
		$('#IS_Agora').css({'position':'absolute','left':'8px','top':'8px'});
		$('#IS_Agora img').css({'position':'relative','width':'20px','height':'20px'});
		$('#IS_msgAgora').css({'position':'absolute','left':'34px','top':'8px'})
			.hover(function(){$(this).css('cursor','pointer')},function(){$(this).css('cursor','auto')});
		$('#IS_reset').css({'position':'absolute','right':'33px','top':'-4px','width':'50px','height':'24px','padding':'0px 0px 3px','font-size':'10px'});
		$('#infoButton').css({'position':'absolute','right':'5px','top':'8px','width':'18px','height':'18px','border':'1px solid #e4b873'})
			.hover(function(){$(this).css('cursor','pointer')},function(){$(this).css('cursor','auto')});
		$('#infoButton img').css({'position':'absolute','width':'10px','height':'10px','left':'4px','top':'5px'});
		
		doLeecherChecker(false);
		// add event
		$('div#island_control :text').css('text-align','right')
			.bind('keyup',function()	//share text
			{
				var share = parseInt($(this).val().replace(/\D/g,''));
				if (isNaN(share)) share = 0;
				$(this).val(share);
					
				if ($(this).attr('id') == 'wrkShare') islePar[page].wrk = share;
				else islePar[page].lvl = share;
					
				doLeecherChecker(true);	
			});
		$('#allDonation').bind('change',function()
			{
				islePar.allDon = $(this).attr('checked');	// store selection of 'all donation'
				var othpage =(page == 'tradegood')? 'resource':'tradegood';	//other island's resource 	
				if (islePar[othpage].date == "@" && islePar.allDon)
				{		
					islePar.allDon = false;
					$(this).attr('checked',false);
					var namemsg =(page == 'tradegood')? lang.tradegood : lang.resource;	// search other island's resource 
					alert(lang.alertres1 + namemsg + ". \n "+ lang.alertres2);
				}
				doLeecherChecker(true);
			});
		$('#infoButton').bind('click',function(){infoHide(true)});
		$('#IS_msgAgora').bind('click',function(){msgAgora()});
		$('#IS_reset').bind('click',function()
			{
				islePar = getParam(true); 			//reset island param
				rtdPar = getDataTrend(true,'rtd'); 	//reset real trend item
				location.replace(url +'?view=island&id='+ idisle);
			});
		$('#allDonation').attr('checked',islePar.allDon);	// controll state of chekbox
		infoHide(false);									// init button hide/show introduction leecher
		// load real time trend
		loadRtd()
		// add event for display real time trend
		var maxDonate = $('#resourceUsers.contentBox').attr('value');
		$('tr.avatar').each(function(id) {$(this).bind('mouseover',function(){openRtdWindow (tb[id].name,maxDonate,id)})});	
		// view history button
		$('<img id="bHisView" src="/skin/icons/income_positive.gif">').
			appendTo('#resourceUsers > h3:first-child').
			css({"background-color":"#fcf1d2","position":"absolute","width":"16px","top":"8px","left":"5px","border":"2px outset"}).
			bind('click',function(){openHistoryWindow();});
		$('img#bHisView:hover').css('cursor','pointer');
		// window view history
		$('#resourceUsers').before('<div id="HisView" class="contentBox"></div>');
		//Add event for save Island parameter
		$(window).unload(function(){saveIsleParPlayer()});
	}
	else if (page == 'island')	// Search in the island, player inactive or in vacation
	{	
		if ($('#cityLocation0').length <= 0) return		// exit for error page
		// check my cities in island
		var myisle = false;
		if ($('div.ownCityImg').length >0) myisle=true;
		if (myisle == false && opt.namePly == false) return; // exit if island isn't yours and you don't want show player's name
			
		if (opt.namePly)	// add name player
		{
			$("ul#cities li.cityLocation:not(:has(div.claim))").each(function()
			{
				var ply = $.trim($(this).find('li.owner').text().split(': ')[1]);
				var ally = $.trim($(this).find('li.ally').eq(0).text().split(': ')[1]);
					
				var allyCls = (ally == '-')? "" : ally.replace(' ','');
				ally = (ally == '-')? '' : ' ('+ ally +')';
				// check state of player
				var classPly="";
				if ($(this).find('span.inactivity').length > 0)	classPly="inactivity"
				else if ($(this).find('span.vacation').length > 0) classPly="vacation"
				//Add name and alley of pleyer
				$(this).find('span.textLabel:has(span.before)').append(
					"<span class='textLabel' style='top:20px; font-size:9px !important'>"+
					"<span class='"+ allyCls +"'>"+
						"<span class='before'></span>"+
						"<span class='"+ classPly +"'>"+ ply + ally +"</span>"+
						"<span class='after'></span>"+
					"</span>"+
					"</span>");
				if (ally!='')
				{
					$(this).find('span.'+ allyCls).hover(
						function(){$('span.'+ $(this).attr('class')).css({'text-decoration':'blink','background-color': "yellow"})},
						function(){$('span.'+ $(this).attr('class')).css({'text-decoration':'none','background-color':'transparent'})});
				}
			});	
		}
		
		if (myisle) // reset old item of inactive and vacation player
		{
			idisle= $('#changeCityForm input:last').val()	// id island
			// load parameter of the island
			islePar = getParam(false);
			islePar.island.inactive = [];
			islePar.island.vacation = [];
			islePar.island.date = setDate();
			//Find inactive player
			$("ul#cities li.cityLocation:has(span.inactivity)").each(function()
			{
				ply = $.trim($(this).find('li.owner').text().split(': ')[1]);
				if ($.inArray(ply,islePar.island.inactive)<0) islePar.island.inactive.push(ply);
			});
			//Find vacation player
			$("ul#cities li.cityLocation:has(span.vacation)").each(function()
			{
				ply = $.trim($(this).find('li.owner').text().split(': ')[1]);
				if ($.inArray(ply,islePar.island.vacation) <0) islePar.island.vacation.push(ply);
			});
			// Save Island Parameter
			localStorage.setItem(idisle + "_isle",uneval(islePar));
		}	
	}
	else if (page == 'islandBoard' && $('#newMessage').length>0)
	{
		if (localStorage.getItem('ISC_agora_Sub') != null)
		{
			$('#subject').val(localStorage.getItem('ISC_agora_Sub'));
			localStorage.removeItem('ISC_agora_Sub');	//erase subject
			$('#message').val(localStorage.getItem('ISC_agora_Msg'));
			localStorage.removeItem('ISC_agora_Msg');	//erase message
		}
	}
	else if (page == 'options')
	{		
		$('#mainview').append(
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<a href='http://userscripts.org/scripts/show/52047' target='_blank'>Island_Control v "+ lversion +"</a>"+
					"<span style='font-size:10px;'>  by <a href='http://userscripts.org/users/95943' target='_blank'>Phate72</a></span>"+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='Island_firsttxt'>"+ lang.optiontxt1 +"</th>" +
								"<td><input type='checkbox' id='optionNamePlayer'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='Island_secondtxt'>"+ lang.optiontxt2 +"</th>" +
								"<td><input type='checkbox' id='optionLinkResource'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='Island_thirdtxt'>"+ lang.optiontxt3 +"</th>" +
								"<td><input type='checkbox' id='optionLinkTemple'></td>"+
							"</tr>" +							
							"<tr>" +
								"<th>Debug</th>" +
								"<td><input type='checkbox' id='Island_Control_debug'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='Islandlanguage'>"+ lang.optiontxt +"</th>" +
								"<td><select id='Island_selectLanguage'></select></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>" +
                "<div class='footer'></div>" +
            "</div>");
		// add language in Select element
		var savelang = opt.lang;
		var selLang = document.getElementById('Island_selectLanguage');
		for (var l=0; l < ltyp.length; l++)
		{
			 var selOpt = false;
			 if (ltyp[l] == savelang){selOpt = true;}
			 selLang.add(new Option(ltyp[l], ltyp[l],false,selOpt),null)
		}		
		// controll state of chekbox, add event
		$('#optionNamePlayer').attr('checked',opt.namePly).bind('change',function()	{opt.namePly = this.checked; setOpt()});
		$('#optionLinkResource').attr('checked',opt.lResource).bind('change',function(){opt.lResource = this.checked; setOpt(); addlinkResource(url)});
		$('#optionLinkTemple').attr('checked',opt.lTemple).bind('change',function(){opt.lTemple = this.checked; setOpt(); addlinkResource(url)});
		$('#Island_Control_debug').attr('checked',opt.debug).bind('change',function(){opt.debug = this.checked; setOpt()});
		$('#Island_selectLanguage').attr('value',opt.lang).bind('change',function(){changeLanguage(this.value)});
	}
}
catch(er) 	{infoError("Main ",er)}
})

/** ----------------------*/  
/**   Resources library   */
/** ----------------------*/
function doLeecherChecker(recall)	// Colors players in the donation list accroding to their leeching
{ 
try
{
	var imgw = "<img src='skin/resources/icon_wood.gif' height='10' width='15'>"	// wood image	
	if (recall == false)		// when table recall, not delete
	{
		var cities=$('#resourceUsers tbody tr').length		// city number
		$('td.ownerName').each(function(index)	// check deleted line
		{
			if ($(this).html() == '&nbsp;') // City belongs to previous player
			{
				$(this).parent().attr('name','ISC_Delete');
				$(this).parent().find('td').attr('name','ISC_Delete');
			}
			else	$(this).attr('value',$(this).text());	//name for real time trend
		});
		$('td.cityName').each(function()	// check warker
		{
			if ($(this).attr('name') == 'ISC_Delete')
				$(this).parent().prevAll('tr[name!=ISC_Delete]:first').find('td.cityName').append('<div>'+ $(this).text()+'</div>');
			else $(this).html('<div>' +$(this).text()+'</div>');
		});
		$('td.cityWorkers').each(function()	// check warker
		{
			if ($(this).attr('name') == 'ISC_Delete')
				$(this).parent().prevAll('tr[name!=ISC_Delete]:first').find('td.cityWorkers').append($('<div>'+ $(this).text()+'</div>'));
			else $(this).html('<div>' +$(this).text()+'</div>');
		});
		$('td.cityLevel').each(function()	// check level city
		{
			if ($(this).attr('name') == 'ISC_Delete')
				$(this).parent().prevAll('tr[name!=ISC_Delete]:first').find('td.cityLevel').append($('<div>'+ $(this).text()+'</div>'));
			else $(this).html('<div>' +$(this).text()+'</div>');
		});
		$('#resourceUsers tbody tr[name=ISC_Delete]').remove()	//delete row
		$('#resourceUsers thead th').eq(4).attr('colspan','2');	//format Header
		$('td.ownerDonation').after('<td class="ownerLeecher"></td>')
		// class rows
		$('#resourceUsers tbody tr').filter(':odd').attr('class','avatar').end().filter(':even').attr('class','alt avatar');
		// css style cells
		$('td.ownerLeecher').css({'font-size':'10px','text-align':'right'})
		$('td.ownerDonation img').css({'width':'15px','height':'10px'})
		
		// Add line for date of the script
		var ikMain = ($('#setWorkers').length<=0)? $('#resourceUsers'): $('#setWorkers');	// if node setworkers don't exist
		ikMain.before($("<span id='dateIsland'></span><span id='dateResource'></span>").css('font-size','10px'));
		// caption of resource
		islePar[page].typ = $('#mainview h1:first').text();
	}
	
	// Add date store donation of other resource
	var othpage = (page == 'tradegood')? 'resource':'tradegood';	// set other island's resource 
	if (islePar.allDon && islePar[othpage].date != "@")	$("#dateResource").html("&nbsp;&nbsp;-&nbsp;&nbsp;"+ 
									lang.dateresource + islePar[othpage].typ + ": " + islePar[othpage].date);
	else 
	{
		$("#dateResource").html('');	// cancel date of other resource
		islePar.allDon = false;
	}	
	// Get info of the player - totLevel townHall + totWarker + totDonated
	var maxDonate=0, donTot =0;	//value donation
	var wrkTot =0, lvlTot =0;	//total warker and city level
		
	if (recall == false)		// when table recall, not insert new HTML
	{
		tb=[];
		$('td.ownerName').each(function(id)
		{
			tb.push({name: $(this).text()});
			$(this).attr('value',$(this).text());
		});
		$('td.ownerDonation').each(function(id)
		{
			tb[id].don = toInt($(this).text());
			if (tb[id].don > maxDonate) maxDonate = tb[id].don;
			donTot += tb[id].don;
		});
		$('td.cityWorkers').each(function(id)
		{
			var warker =0;
			$(this).find('div').each(function(){warker += $(this).text().replace(/\D/g,'') *1});
			tb[id].wrk = warker;
			wrkTot += warker;
		});
		$('td.cityLevel').each(function(id)
		{
			var lvl =0;
			$(this).find('div').each(function(){lvl += $(this).text().replace(/\D/g,'') *1});
			tb[id].lvl = lvl;
			lvlTot += lvl;
		});
			
		//Add html Info node
		if ( $('#resUpgrade div.nextLevel').length <= 0 ) 	// Deposit not upgrade
		{	
			// Check wood donated											// Check wood for next level
			var woodMis = toInt($('#resUpgrade li.wood').eq(0).text().split(": ")[1]) - toInt($('#resUpgrade li.wood').eq(1).text().split(": ")[1]);		// necessary wood for next level
			var levelUp = parseInt($('#resUpgrade div.buildingLevel').text().split(": ")[1])+1;
			var txtMis = '<span value="stat1">'+ lang.stat1 +'</span> <span value=" ' + levelUp + ' "><b>' + levelUp + '</b></span> '+ 
				'<span value="stat2">'+ lang.stat2 +'</span> <span value=" ' + replaceNum(woodMis) + ' "><b>'+ replaceNum(woodMis) +'</b></span> '+ imgw + ' ';
		}
		else												// deposit is upgrading
		{
			woodMis=0;
			levelUp = parseInt($('#resUpgrade div.nextLevel').text().split(": ")[1]);
			txtMis = '<span value="statupgrd1">'+ lang.statupgrd1 +'</span> <span value=" ' + levelUp + ' "><b>' + levelUp + '</b></span> <span value="statupgrd1">'+ lang.statupgrd2 +'</span>'
		}
		
		$('#leecherInfo').html("<p><center>"+ lang.statinfo1 +" <b>" + cities + "</b> "+ lang.statinfo2 +" <b>" + parseInt(lvlTot/cities) +
			"</b>. "+ lang.statinfo3 +" <b>"+ replaceNum(donTot) +"</b> " + imgw + lang.statinfo4 +" <b>" + 
			replaceNum(wrkTot) + "</b> "+ lang.statinfo5 +"<span id='Stat_msgAgora'>"+ txtMis +"<span id='calcInfo' value="+ woodMis +"></span></span></center></p>");
	}
	var donVlec = 0, donAlec = 0	// total negative donation
	$(tb).each(function(id)
	{
		// calculate and store leecher's player
		var score = ((islePar[page].wrk * this.wrk) +(islePar[page].lvl * this.lvl));	// Calcolate how player must donate
		tb[id].leec = tb[id].don - score;
		// get other donation in tradegood or resource
		var othDon = (islePar.allDon && !isNaN(islePar[othpage].player[this.name]))? islePar[othpage].player[this.name]: 0;
		//Add value leecher
		var don = this.don + othDon - score;
		// if recall control, not color inactive or vacation player
		if ($.inArray(this.name,islePar.island.inactive)<0 && $.inArray(this.name,islePar.island.vacation)<0)
			{
				// color row
				$('#resourceUsers tbody tr').eq(id).css('color',function()	
				{
					if ( don >= 0 ) return "green";
					else if ( don >= (0-(score * 0.10))) return "orange";
					return 'red';	
				});
			}
		else if ($.inArray(this.name,islePar.island.inactive)<0) this.I = true;
		else if ($.inArray(this.name,islePar.island.vacation)<0) this.V = true;
		var html = replaceNum(don);
		if (islePar.allDon)	//tooltip all donation
		{
			color1 = ((this.don - score) < 0)? 'red':'green';
			color2 = (othDon < 0)? 'red':'green';	
			//Add tooltip for every donation in resources
			$('td.ownerLeecher').eq(id).addClass('tooltip');
			html += "<span>"+ 
						"<div style='color:"+ color1 +"'>" + islePar[page].typ + " = " + replaceNum(this.don - score) + "</div>"+
						"<div style='color:"+ color2 +"'>" + islePar[othpage].typ + " = " + replaceNum(othDon) + "</div>"+ 
					"</span>";
		}
		// Add difference donated
		$('td.ownerLeecher').eq(id).html(html);
		// value for Info donation
		if (this.V)	donVlec += getNegValue(don)
		else if (this.I != true) donAlec += getNegValue(don)
	});
	//style tooltip all donation
	$('td.tooltip span').css({'display':'none','position':'absolute','width':'150px','padding':'2px 3px','margin-left':'1px','background':'#ffffff','border':'1px solid #cccccc','color':'#6c6c6c'});
	$('td.tooltip').hover(function (){$(this).find('span').css('display','inline')},function (){$(this).find('span').css('display','none')});
	// Calculate Statistic for Info node
	woodMis= $('#calcInfo').attr('value')*1;
	if (woodMis>0)
	{
		var txtCalc='';
		if ((woodMis + donAlec) <= 0) txtCalc = '<span value="stat31">'+ lang.stat31 +'</span>';					// only donated wood of active player 
		else if ((woodMis + donAlec + donVlec) <= 0) txtCalc = '<span value="stat32">'+ lang.stat32 +'</span>';		// donated wood of the player active and vacation  
		else if (islePar[page].wrk > 0 || islePar[page].lvl > 0)	// calculate new score for next level, if yuor shares value > 0
		{
			var nwSwrk = islePar[page].wrk;
			var nwSlvl = islePar[page].lvl;
			var K =(islePar[page].wrk > 0)? islePar[page].lvl / islePar[page].wrk :0;// factor lvl/wrk score
			var txtgrt ="";
			var index =0;
			do		// Search new share for deposit Upgrading
			{
				var nwdon = 0;
				if (islePar[page].wrk > 0) 
				{
					nwSwrk += 10;
					nwSlvl = Math.round(nwSwrk * K);
				}
				else	nwSlvl += 10
				//predict new donation
				$(tb).each(function()
				{
					if(this.I != true)
					{
						var score = (nwSwrk * this.wrk) +(nwSlvl * this.lvl);
						var othDon = (islePar.allDon)? islePar[othpage].player[this.name]: 0;
						nwdon += getNegValue(this.don + othDon - score);
					}
				});
				if (index >= 100)
					{
						txtgrt = "> ";
						break;	// exit loop
					}
				index++;
			} while ((woodMis + nwdon) >= 0); 
				
			txtCalc = '<span class="msgAg_ret" value="stat33">'+ lang.stat33 +'</span><br />'+
					'<span value="'+ txtgrt + replaceNum(nwSwrk) +'"><b>' + txtgrt + replaceNum(nwSwrk) + '</b></span> ' + imgw + '<span class="msgAg_ret" value="stat33wrk">'+ lang.stat33wrk +'</span>'+
					'<span value="'+ txtgrt + replaceNum(nwSlvl) +'"><b>' + txtgrt + replaceNum(nwSlvl) + "</b></span> " + imgw + '<span value="stat33lvl">'+ lang.stat33lvl +'</span>';
		}
		$('#calcInfo').html(txtCalc);
	}
	if (recall) return;	// if recall not replace inactive or vacation player and real time trend event
	
	islePar[page].date = setDate();		// Save date of player's donation
	// add scale for display real time trend
	$('#resourceUsers.contentBox').eq(0).attr('value',maxDonate)
		
	if (islePar.island.date == '@') // exit if you don't visit island view
	{
		alert(lang.alertisland);
		return;
	}
	// add Date of player's activity
	$("#dateIsland").text(lang.dateisland + islePar.island.date)	
	// Search inactive or vacation Cities
	$(islePar.island.inactive).each(function(id,name) {$('#resourceUsers tbody tr:has(td.ownerName[value='+ name +'])').css('color','gray').find('td.ownerName').append(' (i)')});
	$(islePar.island.vacation).each(function(id,name) {$('#resourceUsers tbody tr:has(td.ownerName[value='+ name +'])').css('color','royalblue').find('td.ownerName').append(' (v)')});	
}
catch(er) 				
	{infoError("function doLeecherChecker ",er)}
}

function infoHide(chg)	//hide or show info leecher
{ 
try
{	
	if (chg) opt.info = !(opt.info);
		
	if (opt.info) 	//show
	{
		$('#infoButton').html("<img src='skin/layout/up-arrow.gif' alt='-'>");
		$('#island_control tr[name=hideText]').show();
	}
	else 		//hide
	{
		$('#infoButton').html("<img src='skin/layout/down-arrow.gif' alt='+'>");
		$('#island_control tr[name=hideText]').hide();
	}
	if (chg) setOpt()	//save option
}
catch(er) 				
	{infoError("function infoHide ",er)}
}

/** ------------------*/  
/**   Trend library   */
/** ------------------*/
function getDataTrend(reset,suf)	// get item for trend
{
	var Par = eval(localStorage.getItem(idisle + suf));	// Load item trend
		
	if (Par == null || reset == true) 	// Init parameter
	{
		Par={};
		Par['resource'] = {};
		Par['tradegood'] = {};
		localStorage.setItem(idisle + suf,uneval(Par));
	}
	return Par;
}

function lastDate(aryTr)				// search last date in array trend
{ 
try
{
	var lstDt=0;
	$.each(aryTr, function(key, val) 
	{
		var itemData= this.data[this.data.length-1][0];
		if (lstDt < itemData){lstDt= itemData;}
	});
	return lstDt
}
catch(er) 				
	{
		getDataTrend(true,"rtd");		// provvisorio per cancellare vecchi salvataggi v3.50
		//infoError("function lastDate ",er)
	}
}

function saveTrend(typ,nItem)		// add item
{ 
try
{
	var today = (new Date()).getTime();	// save date and time
	aryTr= getDataTrend(false,typ);
		
	// check number of item
	var delItem = false;
	$.each(aryTr[page], function(key, val)
	{
		if(val.data.length > nItem) 
		{
			delItem=true;
			return false;
		}
	});
	
	// delete old value
	if (delItem)
	{
		$.each(aryTr[page], function(key, val)
		{
			if(val.data.length > 1) {val.data.pop();}
			else	{aryTr[page].key.remove()}
		});
	}
		
	var listPly = new Array()
	$('#resourceUsers tbody tr td.ownerName').each(function()	//player list
	{
		var ply = $(this).attr('value')
		listPly.push(ply);
		if (aryTr[page][ply] == null)	//inizialize array real time trend
		{
			aryTr[page][ply]={};
			aryTr[page][ply]['label']= ply;
			aryTr[page][ply]['data']=[];
		}
	});
	$('#resourceUsers tbody tr td.ownerDonation').each(function(id)//save donation
	{
		aryTr[page][listPly[id]]['data'].push([today,$(this).text().replace(/\D/g,'') *1]);
	});
	localStorage.setItem(idisle + typ,uneval(aryTr));
}
catch(er) 				
	{infoError("function saveTrend ",er)}
}

/** HISTORY TREND */
function openHistoryWindow()		// open windows history trend
{ 
try
{	
	$("#HisView").hide()
	var Hy = getDataTrend(false,"his");		// load history
		
	// button close
	var imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHhMGNvoXRmMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC/klEQVQ4y52UT2gcVRzHPzv7Zncnu5u4ybJNTaTdNpFiTKynIP6pVov02ArVgx4siKDkWloRvRRsvXjw1ByCGApepMVLewjx1IOHgphSLXFdJaZJJvsnM7s7OzPvzWwPE2ajEUF/l/f7vvfj+/v/Ep+9Wu4VSkX+lzRN9GdmOPXG24ixQ+O8OXeWYGftv/NUHnJ7tQOAAEit/4xdWWUwnwYg8CTJtB7rSqrIWBcAMd7IT6M0v0/0e2WDZrVJSmgA+CoE2If33gH4T9ixLgDaHYnjBzh+wN37W9zbajGczTM7UcDICFb/tFhZr5NN6zw3UWKsZACgASKUfaJOJwJWS5I9MMb8V+cwq5t8/ME8B4cMCgdLzN/6ELO6yY2rN5kcz+H4QZSmpsekeL7CbPh4sse9BxWWFpcplUeZu3AG21W898lZABYuf4fndtmou1it3UhCSc9rRBEFQUBaT9DuKk5NP861hTscefoQ069Mc/n4YbKFPNevfku3YzGQiQruyR6B04lrFFfOkz0A2l3FS0eHufLRdczqJtlCnqXFZW7evs9EaYjR4mBsu1c0gAEjanvOiLzV2g6zM8colUcBmHnhKcaHBI4fooskUkUZ7COyLAepAuqWx9aOi+0q3rp4mk6z1a/Xp+dYerCNueOii+RfogqDICKyWzaeH9C0O6ys17n0xbtkC3m+uXKLawt3WPl+hSPPHuX9889z9w+TtuPTdvz9EW3bih1HUncVcxfOUCqPsrS4zA8//cLxscf48vMbmNVNXnvnJCdenuJX08LxQ2q1/kAmvj7/Yq/dNGlst2i5ikanBUA2rVPM5UgJDdtVbFkWTTdBIdNj8sAIvgqZmp2iITKcPP06IhV4aF0XgHLRoFw0sN0g9jSYSe6eI2QEuOqfF1gAhEaGpNSo1qK50IWGVCEjuRTVWjc2zmcErgrjt1gCH9F2Jcs/rjFkDGDvWU6A3+y/ud/FPelSqYNeWGPwyUm0lIFIHB7nxMgwlhf+698j5f6cPNHv3CNf4GI524GZjwAAAABJRU5ErkJggg==";
	$("#HisView").html(''+
		'<h3 class="header">'+ 
			lang.his_title +'<img id="closeHis" src="'+ imgClose +'">'+
		'</h3>'+
		'<div class="content">'+
			'<div id="ISC_HisGraph" style="width:550px; height:350px; margin:5px"></div>'+
			'<div id="choises"></div>'+
			'<input id="HisReset" class="button" value="Reset" type="button">'+
			'<input id="HisSave" style="left:65px;" class="button" value="Save" type="button">'+
		'</div>'+
		"<div class='footer'></div>");
	//Add style
	$('#HisView img#closeHis').css({'position':'absolute','right':'4px','top':'9px'})
		.hover(function(){$(this).css('cursor','pointer')},function(){$(this).css('cursor','auto')});
	$('#HisView input').css('margin','10px');
	$('#ISC_legend').css({'position':'absolute','left':'-180px','top':'20px'});
	$('#ISC_legend table').css('width','100px');
	$('#choises').css({'position':'absolute','left':'560px','top':'5px'});
	//Add event
	$('#closeHis').bind('click',function(){$("#HisView").slideUp ('slow');$('img#bHisView').show('slow');});
	$('#HisReset').bind('click',function(){getDataTrend(true,"his");Hy = getDataTrend(false,"his"); $("#HisView").html=""; openHistoryWindow();});
	if ( (lastDate(Hy[page]) + (24*60*60*1000) ) < (new Date).getTime())	// save donations once a day
	{
		$('#HisSave').bind('click',function()
		{
			saveTrend('his',10);
			openHistoryWindow()
		});
	}
	else	$('#HisSave').hide();
	$('img#bHisView').hide('slow');

	var i = 0;
	$.each(Hy[page], function(key, val){val.color=lineColor[i]; i++;});
		
	// insert checkboxes 
	var c = 0;
	$.each(Hy[page], function(key, val) {			
		$("#choises").append('<div style="margin:3px;">'+
			'<span style=" border: 1px solid rgb(204, 204, 204); padding: 1px;">'+
				'<span style=" padding:0px 7px 0px 7px; background-color:'+ lineColor[c] +';"></span>'+
				'<span style="position:relative; top:2px;">'+
					'<input style=" margin:1px 1px 1px 3px;"   type="checkbox" name="' + key +'" checked="checked" id="id' + key + '">'+
				'</span>'+
			'</span>'+
			'<label style="margin:0px 0px 0px 3px;;font-size: 10px; color: rgb(84, 84, 84);" for="id' + key + '">'+ val.label + '</label></div>');
			c++;
		});
	
	$("#choises > div > span  > span > input").bind('click',function()
	{
		Hy = getDataTrend(false,"his");
		var i = 0;
		$.each(Hy[page], function(key, val){val.color=lineColor[i]; i++;});
		plotHistory(Hy[page]);
	});
	$("#HisView").slideDown ('slow');
	plotHistory(Hy[page]);
	
}
catch(er) 				
	{infoError("function openHistoryWindow ",er)}
}

function plotHistory(datasets) 		// plot history trend
{ 
try
{
	// save actual donation
	var date=(new Date()).getTime()	
	var dList = $('td.ownerName');
	for ( var j = 0; j < dList.length; j++)
	{
		var nPly = dList.eq(j).attr('value');
		if (datasets[nPly] != null)
		{
			var donated =toInt($('td.ownerDonation').eq(j).text());
			datasets[nPly].data.push([date,donated]);
		}
	}
	// chiose selected Item
	var data = [];	
	$("#choises").find("input:checked").each(function () 
	{
		var key = $(this).attr("name");
		if (key && datasets[key])data.push(datasets[key]);
		var html='<table class="ISC_dataTrend">'+
					'<thead>'+
					'<tr>'+
						'<th colspan="3">'+ key +'</th>'+
					'</tr><tr>'+
						'<th>'+ lang.his_head[0] +'</th>'+
						'<th>'+ lang.his_head[1] +'</th>'+
						'<th>'+ lang.his_head[2] +'</th>'+
					'</tr>'+
					'</thead>'+
					'<tbody>';
		for (var j=0; j< datasets[key].data.length; j++)
		{
			var diff = '';
			if (j>0) {diff = datasets[key].data[j][1] - datasets[key].data[j-1][1]}
			
			var dt = new Date(datasets[key].data[j][0]);
			
			dateItem = dt.getDate() +'.'+ (dt.getMonth()+1)+'<sup style="font-size:8px">'+ dt.getHours()+":"+ dt.getMinutes()+'</sup>'
			
			html +=	'<tr>'+
						'<td>'+ dateItem +'</td>'+
						'<td>'+ replaceNum(Math.round(datasets[key].data[j][1]/1000)) + lang.trend_th +'</td>'+
						'<td>'+ replaceNum(Math.round(diff/1000)) + lang.trend_th +'</td>'+
					'</tr>';
		}
		html +='</tbody></table>'
		$(this).parent().parent().parent().append(html)
			.bind('mouseenter', function(){$(this).find('table.ISC_dataTrend').show()})
			.bind('mouseleave', function(){$(this).find('table.ISC_dataTrend').hide()});
	});
	
	$('table.ISC_dataTrend').hide().css({'position':'absolute','left':'30px','width':'auto','border':'1px solid black','z-index':'6000'});
		
	var options ={ 
		series: {	lines: { show:true, steps:true},
					points: { show: true, radius:1 }
				},
		grid: 	{ 	hoverable: true,
					clickable: true,
					mouseActiveRadius: 10
				},
		legend: {	show: false },
		xaxis:	{	mode: "time",
					timeformat: "%d %b",
					minTickSize: [1,'day']
				},
		yaxis:	{	min: 0,
					tickFormatter:  function suffixFormatter(val, axis) 
						{
							if (val >= 1000)
							return (val / 1000).toFixed(axis.tickDecimals) + " k";
							else
							return val.toFixed(axis.tickDecimals) + "";
						},
				}
		}
	options.xaxis.monthNames = lang.month;
			
	var plot = $.plot($('#ISC_HisGraph'), data, options);
/**	$('#ISC_HisGraph').bind('plotclick', function(event, pos, item) { alert('Works')});

	$('#ISC_HisGraph').bind('plotpan', function(event, plot) {alert('Works pan')});

	var previousPoint = null;
	$('#ISC_HisGraph').bind("plothover", function(event, pos, item) 
	{
		if (item) 
		{	
			if (previousPoint != item.datapoint) 
			{
				previousPoint = item.datapoint;
				alert('works hover');
			}
		}
	}); 
*/	
}
catch(er) 				
	{infoError("function plotHistory ",er)}
} 

/** REAL TIME TREND */
function loadRtd()					// add node for real time trend and check item
{
try
{
	var imgClose = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHhMGNvoXRmMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC/klEQVQ4y52UT2gcVRzHPzv7Zncnu5u4ybJNTaTdNpFiTKynIP6pVov02ArVgx4siKDkWloRvRRsvXjw1ByCGApepMVLewjx1IOHgphSLXFdJaZJJvsnM7s7OzPvzWwPE2ajEUF/l/f7vvfj+/v/Ep+9Wu4VSkX+lzRN9GdmOPXG24ixQ+O8OXeWYGftv/NUHnJ7tQOAAEit/4xdWWUwnwYg8CTJtB7rSqrIWBcAMd7IT6M0v0/0e2WDZrVJSmgA+CoE2If33gH4T9ixLgDaHYnjBzh+wN37W9zbajGczTM7UcDICFb/tFhZr5NN6zw3UWKsZACgASKUfaJOJwJWS5I9MMb8V+cwq5t8/ME8B4cMCgdLzN/6ELO6yY2rN5kcz+H4QZSmpsekeL7CbPh4sse9BxWWFpcplUeZu3AG21W898lZABYuf4fndtmou1it3UhCSc9rRBEFQUBaT9DuKk5NP861hTscefoQ069Mc/n4YbKFPNevfku3YzGQiQruyR6B04lrFFfOkz0A2l3FS0eHufLRdczqJtlCnqXFZW7evs9EaYjR4mBsu1c0gAEjanvOiLzV2g6zM8colUcBmHnhKcaHBI4fooskUkUZ7COyLAepAuqWx9aOi+0q3rp4mk6z1a/Xp+dYerCNueOii+RfogqDICKyWzaeH9C0O6ys17n0xbtkC3m+uXKLawt3WPl+hSPPHuX9889z9w+TtuPTdvz9EW3bih1HUncVcxfOUCqPsrS4zA8//cLxscf48vMbmNVNXnvnJCdenuJX08LxQ2q1/kAmvj7/Yq/dNGlst2i5ikanBUA2rVPM5UgJDdtVbFkWTTdBIdNj8sAIvgqZmp2iITKcPP06IhV4aF0XgHLRoFw0sN0g9jSYSe6eI2QEuOqfF1gAhEaGpNSo1qK50IWGVCEjuRTVWjc2zmcErgrjt1gCH9F2Jcs/rjFkDGDvWU6A3+y/ud/FPelSqYNeWGPwyUm0lIFIHB7nxMgwlhf+698j5f6cPNHv3CNf4GI524GZjwAAAABJRU5ErkJggg==";
	
	$("<div id='ISC_rtd'>"+
		"<img id='closeRtd' src='"+ imgClose +"'>"+
		"<h3 id='ISC_rtdHeader' class='header'>"+
		"</h3>"+
		
		"<p id='ISC_infoRtd' style='text-align:center; height:20px'></p>"+
		"<div id='ISC_rtdgraph' style='height:200px; width:218px; margin:5px'></div>"+
		"<div class='footer'></div>"+
	  "</div>").appendTo('#resUpgrade').hide();
	//Add style  
	$('img#closeRtd').css({'position':'absolute','right':'6px'})
		.hover(function(){$(this).css('cursor','pointer')},function(){$(this).css('cursor','auto')});
	//Add event
	$('img#closeRtd').bind('click',function() {$('#ISC_rtd').fadeOut('slow')});
		
	// realtime trend donation
	rtdPar= getDataTrend(false,'rtd');
		
	//	save donation
	var today = new Date();	// save date and not time
	var lstData = lastDate(rtdPar[page]);
	if (today-lstData > (5*24*60*60*1000) )
	{		
		saveTrend('rtd',5);
		rtdPar= getDataTrend(false,'rtd');
	}
}
catch(er) 	{infoError("function loadRtd ",er)}
}
	
function openRtdWindow (name,scale,paint)	// plot real time trend
{
try
{
	// title header
	$('#ISC_rtdHeader').text(name);
	
	var data = [];
	rtdPar= getDataTrend(false,'rtd');
	if (name && rtdPar[page][name])
	{
		// save actual donation
		var date=(new Date()).getTime()
		$(tb).each(function()
		{
			if (this.name == name)
			{
				//Add actual value
				var donated =this.don;
				rtdPar[page][name].data.push([date,this.don]);
				//Calculate time and donation
				var incDon =  Math.round((this.don - rtdPar[page][name].data[0][1])/1000);
				var incDay = Math.ceil((date - rtdPar[page][name].data[0][0])/(1000*60*60*24));
				$('p#ISC_infoRtd').html(lang.rtd_intro[0]+  
						" <span style='font-weight: bold'>"+ incDon + lang.trend_th +"</span>"+
						lang.rtd_intro[1]+
						" <span style='font-weight: bold'>"+ incDay +"</span>"+
						lang.rtd_intro[2]);
				return false;
			}
		});
		data.push(rtdPar[page][name]);
		data[0].color = lineColor[paint];
	}
	var options = { 
		series: {	lines: { show: true, steps: true, fill: true },
					points: { show: true, radius:1 }
				},
		grid: 	{ 	show: true,
					hoverable: true,
					clickable: true 
				},
		legend: {	show: true,
					position: 'nw',
					backgroundOpacity:0.3
				},
		xaxis:	{	mode: "time",
					timeformat: "%0d %b",
					minTickSize: [1,'day']
				},
		yaxis:	{	min: 0,
					tickFormatter:  function suffixFormatter(val, axis) 
						{
							if (val >= 1000)
							return (val / 1000).toFixed(axis.tickDecimals) + " k";
							else
							return val.toFixed(axis.tickDecimals) + "";
						},
				}
	}
	options.yaxis.max = parseInt(scale)+parseInt(scale*.02);
	options.xaxis.monthNames = lang.month;
	$('#ISC_rtd').fadeIn('slow');
	$.plot($("#ISC_rtdgraph"), data, options);
}
catch(er) 	{infoError("function openRtdWindow ",er)}
}

/** ----------------------*/  
/**   Msg Agora library   */
/** ----------------------*/
function msgAgora()				// window for message in Agora'
{ 
try
{
	Ywin = parseInt((window.screen.height -400)/8*2);
	Xwin = parseInt((window.screen.width- 680)/2);
		
	$('body:first').append(
		'<div id="island_msg" class="contentBox">'+
			'<h3 class="header">'+ lang.msgAgora +'</h3>'+
			'<div class="msgAgora">'+
				'<input checked type="checkbox" id="ISC_stat_msg"><label class="ISC_after"> '+ lang.msg_info +'</label> '+
				'<input checked type="checkbox" id="ISC_share_msg"><label class="ISC_after"> '+ lang.msg_share +'</label><br/><br/>'+
				'<label><b>'+ lang.msg_ply +'</b></label><br/>'+
				'<input checked type="radio" name="ISC_typPly" value=0><label class="ISC_after">'+ lang.msg_ply1 +'</label>'+
				'<input type="radio" name="ISC_typPly" value=1><label class="ISC_after">'+ lang.msg_ply2 +'</label>'+
				'<input type="radio" name="ISC_typPly" value=2><label class="ISC_after">'+ lang.msg_ply3 +'</label>'+
				'<input type="radio" name="ISC_typPly" value=3><label class="ISC_after">'+ lang.msg_ply4 +'</label><br/>'+
				'<label></label><br/>'+
				'<label>'+ lang.optiontxt +'</label><select id="Agora_selectLanguage"></select><span id="alertLangAgora" style="color:red"></span><br/>'+
				'<input class="button" id="msgAg_compile" value="'+ lang.msg_compile +'" type="button"><br/>'+
			'</div>'+
			'<form id="newMessage" method="post" action="index.php">'+
                    '<div class="postMessage">'+
                        '<input type="hidden" name="action" value="IslandScreen" />'+
                        '<input type="hidden" name="function" value="postNewMessage" />'+
                        '<input type="hidden" name="actionRequest" value="84311e2de97d935e728acad472fe9186" />'+
                        '<input type="hidden" name="id" value="'+ idisle +'" />'+
                        '<input type="hidden" name="islandId" value="'+ idisle +'" />'+
                        '<label for="subject">'+ lang.msg_subject +'</label><br/>'+
                        '<input class="textfield" id="subject" type="text" name="subject" value="Island_Control" maxlength="50" /><br/>'+
                        '<label for="message">'+ lang.msg_message +'</label><br/>'+
                        '<textarea name="message" id="message"></textarea><br/>'+
                        '<span><span id="msg_chr">1000</span>'+ lang.msg_chr +'</span><br/>'+
                        '<div>'+
                            '<input class="button" id="sendMsg" type="button" value="'+ lang.msg_yes +'" />'+
                            '<input class="button" id="msgAg_cancel" type="button" value="'+ lang.msg_cancel +'"/>'+
                        '</div>'+
                    '</div>'+
            '</form>'+
			'<div class="footer"></div>'+
		'</div>');
	$('#msg_chr').attr('rel',$('#msg_chr').css('color'));
	// add language in Select element
	var langAg = String(window.location).split('.')[1];
	var selLangAg = document.getElementById('Agora_selectLanguage');
	for (var l=0; l < ltyp.length; l++)	selLangAg.add(new Option(ltyp[l], ltyp[l],false,false),null);
	lAg = getLangAgora(langAg);
	$('#Agora_selectLanguage').change(function(){lAg = getLangAgora($(this).val())});
	$('#msgAg_cancel').bind('click',function() {$('#island_msg').remove()});
	$('#msgAg_compile').bind('click',function(){compile_msgArora(lAg)});
	$('#message').bind('keyup',function(){checkChr($(this).val().length)}); //$('#msg_chr').text(1000 - $(this).val().length)
	$('#sendMsg').bind('click',function(){send_msgAgora()});
	// Style of the window Message Agora
	$('#island_msg').css({'position':'absolute','top':Ywin +'px','left': Xwin +'px','z-index':'1999','width':'680px','height':'400px','background-image':'url(/skin/layout/bg_contentBox01.gif)','margin-bottom':'10px'});
	$('#island_msg  h3.header{background-image:url(/skin/layout/bg_contentBox01h_header.gif);background-repeat:no-repeat;height:20px;line-height:20px;padding:10px 6px 0px 6px;color:#7e4a21;font-weight:bold;text-align:center}');
	$('#island_msg div.msgAgora').css({'position':'relative','width':'670px','height':'100px','margin':'5px'});
	$('#island_msg div.msgAgora label.ISC_after').css('margin','0px 50px 0px 5px');
	$('#island_msg #newMessage').css({'text-align':'left','margin':'0px 20px 0px 20px'});
	$('#island_msg #newMessage div.postMessage div:last').css({'position':'relative','top':'-10px','height':'25px','text-align':'center'});
	$('#island_msg #newMessage div.postMessage div:last input').css({'margin':'0px 20px 0px 20px'});
	$('#island_msg textarea').css({'width':'635px','height':'160px'});
}
catch(er)
	{infoError("function msgAgora",er)}
}

function compile_msgArora(lAg)
{ 
try
{
	var txtmsg ="";
	$('#message').val(txtmsg)
	// Add statistic
	if($('#ISC_stat_msg:checked').val())
	{
		txtmsg += islePar[page].typ +":"+ String.fromCharCode('10')
		$('#Stat_msgAgora span[id!=calcInfo]').each(function()
		{
			var item = $(this).attr('value');
			txtmsg += (item.indexOf('stat')>=0)? lAg[item]: item;
			if ($(this).attr('class') == 'msgAg_ret') txtmsg += String.fromCharCode('10');
		});
		txtmsg += String.fromCharCode('10') + String.fromCharCode('10');
		// convert special chr Html
		txtmsg = txtmsg.replace(/\&agrave;/g,'à');	txtmsg = txtmsg.replace(/\&aacute;/g,'á');
		txtmsg = txtmsg.replace(/\&acirc;/g,'â');	txtmsg = txtmsg.replace(/\&atilde;/g,'ã');
		txtmsg = txtmsg.replace(/\&auml;/g,'ä');	txtmsg = txtmsg.replace(/\&aring;/g,'å');
		txtmsg = txtmsg.replace(/\&ccedil;/g,'ç');	txtmsg = txtmsg.replace(/\&aacute;/g,'á');
		txtmsg = txtmsg.replace(/\&eacute;/g,'é');	txtmsg = txtmsg.replace(/\&egrave;/g,'è');
		txtmsg = txtmsg.replace(/\&aacute;/g,'á');	txtmsg = txtmsg.replace(/\&ecirc;/g,'ê');
		txtmsg = txtmsg.replace(/\&euml;/g,'ë');	txtmsg = txtmsg.replace(/\&igrave;/g,'ì');
		txtmsg = txtmsg.replace(/\&iacute;/g,'í');	txtmsg = txtmsg.replace(/\&icirc;/g,'î');
		txtmsg = txtmsg.replace(/\&iuml;/g,'ï');	txtmsg = txtmsg.replace(/\&eth;/g,'ð');
		txtmsg = txtmsg.replace(/\&ntilde;/g,'ñ');	txtmsg = txtmsg.replace(/\&ograve;/g,'ò');
		txtmsg = txtmsg.replace(/\&oacute;/g,'ó');	txtmsg = txtmsg.replace(/\&ocirc;/g,'ô');
		txtmsg = txtmsg.replace(/\&otilde;/g,'õ');	txtmsg = txtmsg.replace(/\&ouml;/g,'ö');
		txtmsg = txtmsg.replace(/\&ugrave;/g,'ù');	txtmsg = txtmsg.replace(/\&uacute;/g,'ú');
		txtmsg = txtmsg.replace(/\&ucirc;/g,'û');	txtmsg = txtmsg.replace(/\&uuml;/g,'ü');
		txtmsg = txtmsg.replace(/\&yacute;/g,'ý');	txtmsg = txtmsg.replace(/\&thorn;/g,'þ');
		txtmsg = txtmsg.replace(/\&yuml;/g,'ÿ');
	}
	// Add share
	var othpage = (page == 'tradegood')? 'resource':'tradegood';	// set other island's resource
	if($('#ISC_share_msg:checked').val())
	{
		txtmsg += lAg.msg_sh + islePar[page].typ +":"+ String.fromCharCode('10')+
			 String.fromCharCode('9') + islePar[page].wrk + lAg.stat33wrk + String.fromCharCode('10')+
			 String.fromCharCode('9') + islePar[page].lvl + lAg.stat33lvl + String.fromCharCode('10');
		if(islePar.allDon)
		{
			
			txtmsg += lAg.msg_sh + islePar[othpage].typ +":"+ String.fromCharCode('10')+
				String.fromCharCode('9') + islePar[othpage].wrk + lAg.stat33wrk + String.fromCharCode('10')+
				String.fromCharCode('9') + islePar[othpage].lvl + lAg.stat33lvl + String.fromCharCode('10')+
				lAg.msg_allDon + String.fromCharCode('10');
		}
		txtmsg += String.fromCharCode('10');
	}
	// Add list of player	
	
	var typPly = $('#island_msg input[name=ISC_typPly]:checked').attr('value');	// type of player add in message
	if (typPly !='3')
	{
		var maxlen =0;
		listAg = {name:[],diff:[]};
		$('#resourceUsers tbody td.ownerLeecher').each(function()	//player list
		{
			var num = parseInt($(this).text());
			if (typPly =='0' || (typPly =='1' && num<0) || (typPly =='2' && num>=0) )
			{
				listAg.diff.push($(this).text());
				var nam = $(this).prevAll('td.ownerName:first').text();
				if (maxlen < nam.length) maxlen = nam.length;
				listAg.name.push(nam);
			}
		});
			
		if (typPly =='1' || typPly =='0') txtmsg += lAg.msg_hdPly[0];
		if (typPly =='0') txtmsg += lAg.msg_hdPly[1];
		if (typPly =='2' || typPly =='0') txtmsg += lAg.msg_hdPly[2];
		txtmsg += lAg.msg_hdPly[3] + String.fromCharCode('10');
		$(listAg.name).each(function(id)
		{
			for (var j= listAg.name[id].length; j<= maxlen; j++) {listAg.name[id] += " "}
			if(islePar.allDon)
			{
				listAg.diff[id] = listAg.diff[id].replace(islePar[page].typ,String.fromCharCode('9') + islePar[page].typ);
				listAg.diff[id] = listAg.diff[id].replace(islePar[othpage].typ,String.fromCharCode('9') + islePar[othpage].typ);
			}
			txtmsg += listAg.name[id] + String.fromCharCode('9') +"-> "+  listAg.diff[id] + String.fromCharCode('10');
		});
	}
	$('#message').val(txtmsg);
	checkChr(txtmsg.length);	
	//$('#msg_chr').text(1000 - txtmsg.length);
}
catch(er)
				{infoError("function compile_msgArora",er)}
}

function send_msgAgora()			//send message in Agora
{ 
try
{
	localStorage.setItem('ISC_agora_Sub',$('#subject').val());
	localStorage.setItem('ISC_agora_Msg',$('#message').val());
	// load message page
	location.replace(url +'?view=islandBoard&id='+ idisle +'&show=1');
}
catch(er1) 				
	{infoError("function send_msgAgora",er)}
}

function checkChr(nChr)			//change color number of char
{ 
try
{
	$('#msg_chr').text(1000 - nChr);
	if (nChr > 1000) $('#msg_chr').css('color','red')
	else if ($('#msg_chr').css('color') =='red')	$('#msg_chr').css('color',$('#msg_chr').attr('rel'));
}
catch(er1) 				
	{infoError("function checkChr",er)}
}

/** --------------------------*/  
/**   Miscellaneous library   */
/** --------------------------*/
function getOpt()	// get option parameter
{	
	opt = eval(localStorage.getItem('opt'));	//opt = eval(GM_getValue('opt'));	// Load item trend
	if (opt == null) 	// Init parameter
	{
		opt={};
		opt.namePly = true;
		opt.lResource = true;
		opt.lTemple = true;
		opt.info = true;
		opt.debug = true;
		opt.lang = navigator.language;
			
		setOpt()
	}
}

function setOpt() 		// save option parameter
{
	localStorage.setItem("opt",uneval(opt));
}

function getParam(reset)	// get parameter of the island
{
	var Par = eval(localStorage.getItem(idisle + "_isle"));	//var Par = eval(GM_getValue(idisle + "_isle"));
	if (Par == null || reset==true) 	// Init parameter
	{
		Par={};
		Par['resource'] = {};
		Par['tradegood'] = {};
		Par['island'] = {};
		
		// Resource
		Par['resource']['wrk'] = 10;
		Par['resource']['lvl'] = 100;
		Par['resource']['date'] = '@';
		Par['resource']['typ'] = '@';
		// Tradegood
		Par['tradegood']['wrk'] = 10;
		Par['tradegood']['lvl'] = 100;
		Par['tradegood']['date'] = '@';
		Par['tradegood']['typ'] = '@';
		// Island
		Par['allDon'] = false;
		Par['island']['date'] = '@';
		Par['island']['inactive'] = {};
		Par['island']['vacation'] = {};
	}
	return Par;
}

function saveIsleParPlayer()
{
	islePar[page].player = {};	// delete old value
	$(tb).each(function()
	{			
		if (this.name != null) islePar[page].player[this.name] = this.leec	// How player  donated in this resource
	});
	//save parameter
	localStorage.setItem(idisle + "_isle",uneval(islePar));
}

function setDate() 			// register today date
{
	var d = new Date();
	return (d.toDateString()).split(" ")[2] + " " + (d.toDateString()).split(" ")[1] + " " + (d.toDateString()).split(" ")[3];	// format gg mmm yyyy
}

function changeLanguage(newLang)	// change language of the script
{	
	opt.lang=newLang;
	setOpt()
	lang = getLanguage();
		
	$('#Islandlanguage').text(lang.optiontxt);
	$('#Island_firsttxt').text(lang.optiontxt1);
	$('#Island_secondtxt').text(lang.optiontxt2);
	$('#Island_thirdtxt').text(lang.optiontxt3);
	
}

function getLanguage()				// load language script 
{ 
try
{
	if (typeof(langs[opt.lang]) == 'undefined') 
	{
		alert("Island_Control. The language is not supported. The script sets the default language (en). In the options page you can change it.");
		opt.lang ='en';
		setOpt()
	}
	return langs[opt.lang];
}
catch(er)
				{infoError("function getLanguage",er)}
}

function getLangAgora(typ)				// load language for Message in Agora
{ 
try
{
	if (typeof(langs[typ]) == 'undefined')
	{
		typ='en';
	}
	var alertMsg ='';
	if(String(window.location).split('.')[1] != typ) alertMsg ='You did not set a world language.';
	$('#alertLangAgora').text(alertMsg)
	$('#Agora_selectLanguage option:contains('+ typ +')').attr('selected',true);
	
	return langs[typ];
}
catch(er)
				{infoError("function getLanguage",er)}
}

function infoError(name,er)			//with error open script page
{ 
try
{
	if (opt.debug == false) return; // exit if you don't want debug script
	
	if(confirm(lang.errortxt + name + " " +  er + lang.errortxt1))
	{
		window.open("http://userscripts.org/scripts/show/52047");
	}
}
catch(er1) 				
	{confirm(er1);}
}

function addlinkResource()
{ 
try
{
	if ($('#cityNav').length <=0 ){return;}	// exit for error
	var mainNode = $('#cityNav li.viewIsland') 	//document.getElementById('cityNav').getElementsByTagName('a')[3].parentNode;
		
	if (page == 'options')	// delete node in option page
	{
		if ($('#wood_Island').length>0){$('#wood_Island').remove()}
		if ($('#tradegood_Island').length>0){$('#tradegood_Island').remove()}
		if ($('#temple_Island').length>0){$('#temple_Island').remove()}
		if ($('#agora_Island').length>0){$('#agora_Island').remove()}
	}
		
	if ( opt.lResource==false && opt.lTemple==false) return;
		
	var idislandview = parseInt(mainNode.find('a').attr('href').split('id=')[1]);
	if (isNaN(idislandview)) {return} 						// exit for error
		
	if (opt.lResource)	// show link resources 
	{				
		var scriptRsc = document.getElementsByTagName('script');
		for(var j=0 ; j< scriptRsc.length; j++)
		{ 
			if (scriptRsc[j].innerHTML.indexOf('tradegoodCounter') >= 0)
				{var tradegood = scriptRsc[j].innerHTML.split('tradegoodCounter')[1].split('value_')[1].split('"')[0];}
		}
		if (tradegood==null) {tradegood = "gold"}
		
		// add icon of saw mill
		$('<img id="wood_Island" src="skin/resources/icon_wood.gif">').appendTo(mainNode).click(
			function() {location.replace(url +'?view=resource&type=resource&id='+ idislandview);}
			);
		// add icon of tradegood
		$('<img id="tradegood_Island" src="skin/resources/icon_'+ tradegood +'.gif">').appendTo(mainNode).click(
			function(){location.replace(url +'?view=tradegood&type=tradegood&id='+ idislandview);}
			);
		// wood style
		$('img#wood_Island').css({'position':'absolute','left':'2px','top':'2px','height':'14px','width':'17px'})
			.hover(	function(){ $(this).css({'left':'0px','top':'0px','height':'18px','width':'21px'})},
					function(){ $(this).css({'left':'2px','top':'2px','height':'14px','width':'17px'})});
		// tradegood style
		$('img#tradegood_Island').css({'position':'absolute','left':'64px','top':'2px','height':'14px','width':'17px'})
			.hover(	function(){ $(this).css({'left':'62px','top':'0px','height':'18px','width':'21px'})},
					function(){ $(this).css({'left':'64px','top':'2px','height':'14px','width':'17px'})});
	}	
	if (opt.lTemple)	// show link temple 
	{	

		// add icon of temple
		$('<img id="temple_Island" src="skin/buildings/y100/temple.gif">').appendTo(mainNode).click(
			function() {location.replace(url +'?view=wonder&id='+ idislandview)}
			);
		// add icon of agora
		$('<img id="agora_Island" src="skin/board/icon_forum.gif">').appendTo(mainNode).click(
			function(){location.replace(url +'?view=islandBoard&id='+ idislandview)}
			);			
		// temple style
		$('img#temple_Island').css({'position':'absolute','left':'45px','top':'-18px','height':'23px','width':'28px'})
			.hover(	function(){ $(this).css({'left':'43px','top':'-21px','height':'25px','width':'32px'})},
					function(){ $(this).css({'left':'45px','top':'-18px','height':'23px','width':'28px'})});
		// agora style
		$('img#agora_Island').css({'position':'absolute','left':'19px','top':'-18px','height':'23px','width':'23px'})
			.hover(	function(){ $(this).css({'left':'17px','top':'-21px','height':'25px','width':'25px'})},
					function(){ $(this).css({'left':'19px','top':'-18px','height':'23px','width':'23px'})});
	}
}
catch(er) 	{infoError("function addlinkResource ",er)}
}

/** -------------------------*/  
/**   Conversion Library     */
/** -------------------------*/ 
function toInt(string)			// Parses a string of format 123,456 to an int in format 123456
{
	var num = string.replace(/[^\d^-]/g,'') *1;
	return num
}

function getNum_Txt(string)		// convert srting in number
{
	var temp = string.split(' '); 
	var num = 0;
	
	for( var x = 0; x <= temp.length ; x++)
	{
		if(!isNaN(parseInt(temp[x]))) 
		{
			num = parseInt(temp[x]);
			return num;
		}
	}
	return num;
}

function replaceNum(num) 		// Parses an int of format 123456 to an string in format 123,456 
{
	// unit separator
	var kUnt =(unsafeWindow.LocalizationStrings != null)? unsafeWindow.LocalizationStrings['thousandSeperator']:',';
	var sign=(num < 0)? '-':'';
	var string = String(Math.abs(num));
	for ( j=string.length-3 ; j > 0; j = j-3)
		{string = string.substring(0 , j) + kUnt + string.substring(j , string.length)}
	return sign + string;
}

function getNegValue(num)		// get only negative value
{
	if (num < 0) return num; 
	return 0;				
}

/**
// Changelog:
//	4.00 	Nella risorsa è possibile compilare il messaggio da inviare all'agorà, per poi spedirlo.
//			Nel grafico storico spostando il mouse sopra il nome nella legenda puoi visualizzare i dati delle donazioni.
//			FixBug: Quando una Risorsa è in upgrade, lo script restituisce sempre il messaggio di visitare l'isola.
//			FixBug: Errore nel tooltip per calcolo di tutte le donazioni nell'isola.
//			FixBug: Errore nel colorare le righe della tabella.
//			FixBug: Errore nel calcolare le quote per upgradare la risorsa.
//	3.61	Nella vista isola oltre al nome del giocatore viene visualizzata l'allenaza. Al passaggio del mouse sul nome lampeggeranno tute le città che appartengono all'alleanza.
//			Migliorato lo script per velocizzarne il caricamento.
//			Aggiornato alcune lingue.
//
//	3.6		Completamente cambiato il realtime trend delle donazioni. il giocatore può salvare la situazione giocatori ogni 5 giorni per un massimo di 5 salvataggi. WIP
//			Aggiunto finestra trend storico. 10 salvataggi a discrezione dei giocatori. WIP
//			Riscritto molto codice con jquery.
//
//	3.5		Aggiunto link su tabella risorse per costruzione messaggio per agorà. WIP
//			Aggiunto link su tabella risorse per trend storico. WIP
//			Aggiunto link su tabella risorse per accedere all'agorà.
//			Aggiunto link su mostra isola per accedere all'agorà.
//			Nelle opzioni adesso è possibile selezionare se visualizzare i link risorse o i link tempio e agorà.
//			Aggiunto trend donazioni con 6 punti, a buffer pieno salva ogni 10gg.
//			Aggiunto pulsante di reset per riportare l'isola nelle condizioni di default. Cancella anche dati del trend.
//			Migliorato il codice per nascondere l'introduzione della tabella donazioni.
//			Nelle info risorse, se il calcolo delle quote per raggiungere il prossimo livello aumenta più di 5.000,
//				lo script informa con il simbolo ">" che le quote calcolate non sono sufficenti per l'upgrade.
//			Aggiunte traduzioni Ungherese, Bulgaro, Danese e Ucraino.
//			BugFix; mettendo a zero una delle quote , non calcolava più le statistiche.
//			Modificato salvataggio opzioni.
//
//	3.41	Traduzione in Greco
//			BugFix: per errore nella pagina vista isola la funzione myIsland restituiva a sua volta un errore.
//
//	3.4		Aggiornamento dello script con userscripts.org.
//			Migliorato il codice per il salvataggio dati e la struttura dello script.
//
//	3.3.5	Inserita lingua francese.
//			BugFix: errore sull'isola in caso di errore nella pagina.
//
//	3.3.4	Migliorato la ricerca della risorsa di lusso dell'isola per il link.
//			Rivisto nelle statistiche il calcolo delle quote per ragiiungere il prossimo livello.
//			BugFix: Nel caso si inserissero in entrambe le quote il valore zero, lo script si bloccava.
//			Inserito nuovo link per il tempio vicino all'icona Mostra Isola.
//			Compatibile con la versione 0.3.2 di Ikariam.
//
//	3.3.3	BugFix: lo script non aggiornava i giocatori inattivi o in vacanza se non si visualizzavano i nomi dei giocatori nell'isola.
//			Inserita nuova function myIsland per la ricerca delle proprie isole.
//			Migliorato il codice per la ricerca dell'ID isola.
//			BugFix: Nelle Quote per inserimento valori non numerici o 0, non eseguiva i calcoli correttamente.
//			BugFix: Quando un player ha piu' di una citta' sbagliava i calcoli delle donazioni.
//			BugFix: Errore su funzione MyIsland e Main per messaggio di errore su visualizzazzione Isola.
//
//	3.3.2	Fix testi in spagnolo.
//
//	3.3.1	Aggiunto link diretto alle risorse dell'isola nell'icona della visualizzazione isola.
//			Modificato il controllo dell'update. Adesso avviene 1 volta al giorno e avvisa l'utente tramite messaggio in tutte le pagine.
//			Inserita la possibilita di evitare il debug.
//			BugFix: Corretto l'errata visualizzazione del nome del player quando la citta e occupata.
//			Aggiunta lingua spagnola, polacca e russa.
//
//	3.3		Nuova funzione che visualizza il nome dei giocatori nella visuale dell'isola.
//			Nella pagina opzioni e possibile scegliere se visualizzare o no i nomi dei giocatori nell'isola.
//			Bugfix: se nel riepilogo eventi recenti si cliccava su una citta lo script restituiva un errore.
//			Bugfix: corretto errore di testo nella lingua italiana.
//			Il controllo di versioni recenti adesso avviene solo nella pagina delle opzioni.
//			Modificato pulsante che nasconde info nella tabbella donazioni.
//
//	3.2.1	ID non piu disponibili nella versione finale di Ikariam 0.3.1, adesso per salvare i dati si usa il nome del player.
//			BugFix: selezionando una citta diversa da quella presente nell'isola, entrando nelle risorse generava un errore.
//				In questo caso la data di aggiornamento non viene messa sopra la selezione dei lavoratori ma sopra le info dello script.
//			Aggiunto linguaggio Italiano e Inglese by paul93.
//			Aggiunto richiesta controllo versione script.
//
//	3.2		Possibilita di valutare le donazioni complessive nell'isola con un flag in pagina resource o tradegood.
//				Il chekbox non fa altro che sommare le donazione dele due risorse dell'isola e dare un valutazione 
//				totale delle donazioni del player in essa.
//			Inserita nella tabella in alto a sx, la data dell'ultima visita all'altra risorsa dell'isola.
//
//	3.1.1	Aggiornato script per la versione su testserver di Ikariam v0.3.1
//			Modificato e snellito il salvataggio dei player inattivi e in vacanza.
//			Per salvare i dati dell'isola si usano gli ID e non piu il nome del player.
//			BugFix errata interpretazione dell'ampliamento di Falegnameria, Miniera, Vigna, o cava.
//			Modifiche dei testi.
//			Inserito pulsante per nascondere o visualizzare le informazioni iniziali.
//			Inserita nella tabella in alto a sx, la data dell'ultima visita all'isola
//			Migliorato la visualizzazione dei dati donazione e differenza legno. Adesso sono in colonna per bene.
//
//	3.1 	Prima stesura
*/

