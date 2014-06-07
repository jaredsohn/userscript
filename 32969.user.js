// ==UserScript==
// @name           HabraTidy
// @namespace      yason.info/habr
// @description    Corrects some of the most common Russian spelling/grammar mistakes on Habrahabr.ru. Based on Jonathan Buchanan's RllmukTidy script.
// @include        http://habrahabr.ru/*
// @include        http://*.habrahabr.ru/*
// ==/UserScript==

//Grammar correction rules are created by YasonBy in 2008. 
//Any published derivated work must acknowledge this.
//For personal non-commercial use — do whatever you want :)
//
//Правила коррекции ошибок составил YasonBy в 2008 году.
//При их использовании/публикации ссылка на автора обязательна.
//Для личного некоммерческого использования — делайте что хотите :)

var textnodes = document.evaluate(
    "//div[@class='content']//text() | //*[@class='entry-content']//text() | //*[@class='entry-title']//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

if (textnodes.snapshotLength > 0)
{	//Нашли топик/комментарии, попытаемся их почистить

    var ciReplacements, csReplacements, nonWorciReplacements, regex, key, node, s;

	const whitespace = "[\\s!@#$$%\\^&\\*\\(\\)\\-_=+\\\\\\|,\\./\"'\\?\\[\\]<>\\{\\}\\~…«»]"; //пунктуация и пробелы (для определения границ слов)
	const wBeg = "("+whitespace+"|^)"; //граница слова или начало строки
	const wEnd = "(?="+whitespace+"|$)"; //граница слова или конец строки

	//Массив правил, независящих от регистра букв 
	//Число после каждого правила — это количество ошибок такого типа на Хабре
	ciReplacements = new Array();
	
	//Массив правил, чувствительных к регистру букв
	//В списке приводятся без отступов (для заметности)
	csReplacements = new Array();
	
	//======== Сотый раз в первый класс
	ciReplacements["(ж|ш)ы"] = "$1и"; //жы-щы пишем через и
	ciReplacements["(ч|щ)я"] = "$1а"; //чя-щя — через а
	ciReplacements["(ч|щ)ю"] = "$1у"; //чю-щю — через у
	
	
	//======== Распространённые ошибки
	ciReplacements["(так|вс[ёе])\\s?таки"+wEnd] = "$1-таки"; //5000
csReplacements[wBeg+"(?:(?:щ|сч)[ая][сз]?|с(?!ейчас)[еи]?й?час)"+wEnd] = "$1сейчас"; //4274
csReplacements[wBeg+"(?:(?:Щ|Сч)[ая][сз]?|C(?!ейчас)[еи]?й?час)"+wEnd] = "$1Cейчас"; //-
	ciReplacements[wBeg+"(а)\\sтак\\sже"+wEnd] = "$1$2 также" //3150
	ciReplacements[wBeg+"(н[еи])(знаю|хочу|могу|может|знает|знал|вижу|буду|хватало|хватает|так)"+wEnd] = "$1$2 $3" //3024
	ciReplacements[wBeg+"(ч[ёе]|[чк]то|когда|куда|откуда|как(?:ой|ого|ому|им|ом|ая|ую|ие|их|им|ими)?|[чк]ем|кого|чего|ком|где|наконец)\\s?то"+wEnd] = "$1$2-то"; //2905
	ciReplacements[wBeg+"(ф)лэш"] = "$1$2леш"; //2840
	ciReplacements[wBeg+"(в)ря[дт]\\s?л[ие]"+wEnd] = "$1$2ряд ли"; //2410
	ciReplacements[wBeg+"(н)е прав"+wEnd] = "$1$2еправ"; //2360 //пробел бывает нужен довольно редко
	ciReplacements[wBeg+"(хот[яь]|если|когда|куда|откуда|как(?:ой|ого|ому|им|ом|ая|ую|ие|их|им|ими)?|[чк]ем|кого|чего|ком|где)бы"+wEnd] = "$1$2 бы"; //2410
	ciReplacements[wBeg+"(в)о\\s?общем"+wEnd] = "$1$2общем"; //1934
	ciReplacements[wBeg+"(не(?!правильн))?\\s?(п)рав[ие]льн"] = "$1$2$3равильн"; //1850
	ciReplacements["\\sка"+wEnd] = "-ка"; //~1800
	ciReplacements[wBeg+"(н[ие])был([оа])?"+wEnd] = "$1$2 был$3"; //1691
	ciReplacements[wBeg+"(в)\\sотличии от"+wEnd] = "$1$2 отличие от"; //1640
	ciReplacements[wBeg+"(к)(?!оммент)[оа]мм?ент"] = "$1$2оммент"; //1628
	ciReplacements[wBeg+"(т)оесть"+wEnd] = "$1$2о есть"; //1590
	ciReplacements[wBeg+"(ч[ёе]|[чк]то|когда|куда|откуда|как(?:ой|ого|ому|им|ом|ая|ую|ие|их|им|ими)?|[чк]ем|кого|чего|ком|где)(?!-нибудь)(?:-|\\s)?н[ие]?(?:бу)?[тд]ь"+wEnd] = "$1$2-нибудь"; //1500
	ciReplacements[wBeg+"(Н)е смотря на"+wEnd] = "$1$2есмотря на"; //1500
csReplacements[wBeg+"(?:ч[ёео]|шт?о)"+wEnd] = "$1что"; //1160
csReplacements[wBeg+"(?:Ч[ёео]|Шт?о)"+wEnd] = "$1Что"; //-
	ciReplacements["(к)ажеться"+wEnd] = "$1ажется"; //887
	ciReplacements[wBeg+"(в)серавно"+wEnd] = "$1$2сё равно"; //674
	ciReplacements[wBeg+"(х)очеться"+wEnd] = "$1$2очется"; //657
	ciReplacements[wBeg+"(п)о(моему|твоему|разному)"+wEnd] = "$1$2о-$3"; //619
	ciReplacements["(ч)есно"+wEnd] = "$1естно"; //600
	ciReplacements[wBeg+"(н)ич[еёо]"+wEnd] = "$1$2ичего"; //583
	ciReplacements[wBeg+"(п)ридти"+wEnd] = "$1$2рийти"; //546
	ciReplacements[wBeg+"(к)эш"+wEnd] = "$1$2еш"; //536
	ciReplacements[wBeg+"(м)ож"+wEnd] = "$1$2ожет"; //537
	ciReplacements[wBeg+"(к)(?!стати)\\s?стат[еи]"+wEnd] = "$1$2стати"; //490
	ciReplacements[wBeg+"(по)?пробыва((?:ть|л)(?:ся)?)"+wEnd] = "$1$2пробова$3"; //471
	ciReplacements[wBeg+"(н)ич[еёо]"+wEnd] = "$1$2ичего" //445
	ciReplacements[wBeg+"(п)рийд(у|и|[её]т)"+wEnd] = "$1$2рид$3" //415
	ciReplacements[wBeg+"(к)олличеств"] = "$1$2оличеств"; //408
	ciReplacements[wBeg+"(ч)ере(?!счур)[зс]\\s?чур"] = "$1$2ересчур"; //322
	ciReplacements[wBeg+"(п)еар"] = "$1$2иар"; //322
csReplacements[wBeg+"[еи](?!щё)(?:сч|щ|ш|шш)[оёе]"+wEnd] = "$1ещё"; //300
csReplacements[wBeg+"[ЕИ](?!щё)(?:сч|щ|ш|шш)[оёе]"+wEnd] = "$1Ещё"; //-
	ciReplacements[wBeg+"(и)звен([ияе])"] = "$1$2звин$3"; //297
csReplacements[wBeg+"(по)[\\-\\s](лучше|больше|хуже|раньше)"+wEnd] = "$1$2$3"; //296 //но не "ПО", поэтому чувствительно к регистру
csReplacements[wBeg+"(По)[\\-\\s](лучше|больше|хуже|раньше)"+wEnd] = "$1$2$3"; //-
	ciReplacements[wBeg+"(и)нтерестн"] = "$1$2нтересн"; //284
	ciReplacements["([а-яА-Я])\\s?нибудь"+wEnd] = "$1-нибудь"; //274
csReplacements[wBeg+"сдесья?"+wEnd] = "$1здесь"; //266
csReplacements[wBeg+"Сдесья?"+wEnd] = "$1Здесь"; //-
	ciReplacements[wBeg+"(н)енадо"+wEnd] = "$1$2е надо"; //266
	ciReplacements[wBeg+"(л)иш"+wEnd] = "$1$2ишь"; //241
	ciReplacements[wBeg+"(м)ожна"+wEnd] = "$1$2ожно"; //241
	ciReplacements[wBeg+"(п)рий?д[её]ться"+wEnd] = "$1$2ридётся"; //237
	ciReplacements[wBeg+"(д)линн([аыеу])"+wEnd] = "$1$2лин$3"; //237 //"длинной" не подходит
	ciReplacements[wBeg+"(в) кратце"+wEnd] = "$1$2кратце"; //234
	ciReplacements[wBeg+"(т)рол([иеья])"] = "$1$2ролл$3"; //200
	ciReplacements[wBeg+"(п)(?!ожалуйста)[оа]жалу?й?ст[ао]"+wEnd] = "$1$2ожалуйста"; //200
csReplacements[wBeg+"ет(о|от|ого|ому|им|ом)?"+wEnd] = "$1эт$2"; //196
csReplacements[wBeg+"Ет(о|от|ого|ому|им|ом)?"+wEnd] = "$1Эт$2"; //-
	ciReplacements[wBeg+"(с)импотич(ная|ной|ный|ного|ному|ным|ном|ные|ных|ными|но)"+wEnd] = "$1$2импатич$3"; //195
	ciReplacements[wBeg+"(?!дрес)дд?ресс?"+wEnd] = "$1$2дрес"; //160
	ciReplacements[wBeg+"(?:(н)[еи])?(\\s?п)р[ие]емлим"+wEnd] = "$1$2$3риемлем"; //157
	ciReplacements[wBeg+"(т)олко"+wEnd] = "$1$2олько"; //150
	ciReplacements[wBeg+"(т)емболее"+wEnd] = "$1$2ем более"; //149
	ciReplacements["(в)идет"+wEnd] = "$1идит"; //147
	ciReplacements[wBeg+"(п)роэкт"] = "$1$2роект"; //145
	ciReplacements[wBeg+"(д)виж[её]к"+wEnd] = "$1$2вижок"; //144
	ciReplacements[wBeg+"(м)нога"+wEnd] = "$1$2ного"; //130
	ciReplacements[wBeg+"(н)е ужели"+wEnd] = "$1$2еужели"; //127
	ciReplacements[wBeg+"(г)аразд"] = "$1$2оразд"; //122
	ciReplacements[wBeg+"(п)редлога"] = "$1$2редлага"; //116
	ciReplacements[wBeg+"(в)о\\s?первых"+wEnd] = "$1$2о-первых"; //111
	ciReplacements[wBeg+"(р)екомменд"] = "$1$2екоменд"; //110
	ciReplacements[wBeg+"(з)(?!дравствуй)дра(?:в?ствуй|сь)(те)?"] = "$1$2дравствуй$3"; //100
	ciReplacements[wBeg+"(н)а подобие"+wEnd] = "$1$2аподобие"; //100 //может быть корректным, но ошибок куча
csReplacements[wBeg+"здела(ть|ем|ешь|ете|ют) "+wEnd] = "$1сдела$2"; //100
csReplacements[wBeg+"Здела(ть|ем|ешь|ете|ют) "+wEnd] = "$1Сдела$2"; //-
	ciReplacements[wBeg+"(б)удующ"] = "$1$2удущ"; //128
	ciReplacements[wBeg+"(к)оординальн"] = "$1$2ардинальн"; //150
//Ошибки из этой категории, встречающиеся менее 100 раз, не приводятся из-за соображений производительности

	//======== Падонкофф прочь
csReplacements[wBeg+"в\\s?рот\\s?мне\\s?ноги"+wEnd] = "$1ого"; //887
csReplacements[wBeg+"В\\s?рот\\s?мне\\s?ноги"+wEnd] = "$1Ого"; //-
	ciReplacements[wBeg+"(а)(?!втор)(?:фф?|в)т[ао]р"] = "$1$2втор"; //557
	ciReplacements[wBeg+"(м)оск(?!\\.)(а|у|ом)?"+wEnd] = "$1$2озг$3"; //460 //"моске" — это часто опечатка от "Москве", "моск." — сокр. от "Москв*"
	ciReplacements[wBeg+"(п)ревед"+wEnd] = "$1$2ривет"; //450
	ciReplacements[wBeg+"(б)(?!укв)ук[ао]?[фв]"+wEnd] = "$1$2укв"; //385
	ciReplacements[wBeg+"(да){2,}"+wEnd] = "$1$2"; //344 //сжимает "дадада" до одного "да" 
csReplacements[wBeg+"йа"+wEnd] = "$1я"; //319
csReplacements[wBeg+"Й[Аа]"+wEnd] = "$1Я"; //-
csReplacements[wBeg+"ога"+wEnd] = "$1ага"; //261
csReplacements[wBeg+"Ога"+wEnd] = "$1Ага"; //-
csReplacements[wBeg+"бу[\\s\\-]?(?:г[ао][\\s\\-]?)+"+wEnd] = "$1ха-ха";//236
csReplacements[wBeg+"Бу[\\s\\-]?(?:г[ао][\\s\\-]?)+"+wEnd] = "$1Ха-ха";//-
	ciReplacements[wBeg+"ы{2,}"+wEnd] = ""; //>200 //Удаляет многочисленные "ы" вместе со след. символом
	ciReplacements[wBeg+"(п)ятниц{1,2}[оО]"+wEnd] = "$1$2ятница"; //168
	ciReplacements[wBeg+"(н)[ие]\\s?[ао]сили"] = "$1$2е осили"; //167 
	ciReplacements[wBeg+"(а)ццк(и|ий|ого|ому|им|ом|о|им|их|ие)"+wEnd] = "$1$2дск$3"; //143
csReplacements[wBeg+"(?:фигасе|[хк]уясе)"+wEnd] = "$1ничего себе"; //122
csReplacements[wBeg+"(?:Фигасе|[ХК]уясе)"+wEnd] = "$1Ничего себе"; //-
csReplacements[wBeg+"д[оа]л[бп][оа][её][бп]"] = "$1кретин"; //80
csReplacements[wBeg+"Д[оа]л[бп][оа][её][бп]"] = "$1Кретин"; //-
	ciReplacements[wBeg+"(п)еш[иы]"+wEnd] = "$1$2иши"; //57
	ciReplacements["!(?:[!1]|[оа]дин)+"] = "!"; //Заменяет выражения типа "!!11один" на один воскл. знак
csReplacements[wBeg+"аши[пб]"] = "$1ошиб";
csReplacements[wBeg+"Аши[пб]"] = "$1Ошиб";
	ciReplacements[wBeg+"(р)иальн[ое]"] = "$1$2еально"; //25
	
	//======== Сленг и бранности
csReplacements[wBeg+"по(?:фи[гк]:[хк]уй)"+wEnd] = "$1всё равно"; //1560
csReplacements[wBeg+"По(?:фи[гк]:[хк]уй)"+wEnd] = "$1Всё равно"; //-
	ciReplacements[wBeg+"(г)авн"] = "$1$2овн"; //797
csReplacements[wBeg+"п[ие][сз][дт]?е(?:ц|тс)"+wEnd] = "$1каюк"; //750
csReplacements[wBeg+"П[ие][сз][дт]?е(?:ц|тс)"+wEnd] = "$1Каюк"; //-
csReplacements[wBeg+"хе?з"+wEnd] = "$1не знаю"; //688
csReplacements[wBeg+"Хе?з"+wEnd] = "$1Не знаю"; //-
csReplacements[wBeg+"на\\s?[хк]уй"+wEnd] = "$1прочь"; //626
csReplacements[wBeg+"На\\s?[хк]уй"+wEnd] = "$1Прочь"; //-
csReplacements[wBeg+"(?:бля[дт]?ь?|хуй)"+wEnd] = "$1[кю]"; //592
csReplacements[wBeg+"(?:Бля[дт]?ь?|Хуй)"+wEnd] = "$1[Кю]"; //-
	//ciReplacements[wBeg+"(г)[еи]мм?ор"] = "$1$2емморрой"; //626 //неясно на что менять
csReplacements[wBeg+"муда[гк]"] = "$1чудак"; //533
csReplacements[wBeg+"Муда[гк]"] = "$1Чудак"; //-
csReplacements[wBeg+"заебал"] = "$1утомил"; //290
csReplacements[wBeg+"Заебал"] = "$1Утомил"; //-
csReplacements[wBeg+"[оа][хк]уе"] = "$1очуме"; //132
csReplacements[wBeg+"[ОА][хк]уе"] = "$1Очуме"; //-
	ciReplacements[wBeg+"(н)и\\s?[хк]уя"+wEnd] = "$1$2ичуть"; //129
csReplacements[wBeg+"на[хк]уя"+wEnd] = "$1зачем"; //68
csReplacements[wBeg+"На[хк]уя"+wEnd] = "$1Зачем"; //-
	ciReplacements[wBeg+"(н)е[хк]уй"+wEnd] = "$1$2езачем"; //43
csReplacements[wBeg+"[хк]у[её]во"+wEnd] = "$1плохо"; //40
csReplacements[wBeg+"[ХК]у[её]во"+wEnd] = "$1Плохо"; //-
csReplacements[wBeg+"(?:[хк]у(?:ета|йня)|чуш)"+wEnd] = "$1чушь"; //39
csReplacements[wBeg+"(?:[ХК]у(?:ета|йня)|Чуш)"+wEnd] = "$1Чушь"; //-
csReplacements[wBeg+"[хк]у[её]вый"+wEnd] = "$1плохой"; //34
csReplacements[wBeg+"[ХК]у[её]вый"+wEnd] = "$1Плохой"; //-
	
	//======== Прочее
	ciReplacements[wBeg+"(к)ол-в(о|а|у|ом|е|ам|ами|ах)?"+wEnd] = "$1$2оличеств$3"; //2551
csReplacements[wBeg+"дык"+wEnd] = "$1так"; //2190
csReplacements[wBeg+"Дык"+wEnd] = "$1Так"; //-
	ciReplacements[wBeg+"(т)раффик"] = "$1$2рафик"; //1110
	ciReplacements[wBeg+"айти"+wEnd] = "$1IT"; //480
	ciReplacements[wBeg+"(с)[еэ]нь?кс?"+wEnd] = "$1$2пасибо"; //271
	ciReplacements["([^(?:^фл|^к|^фин|^х|^клав)])([ие])ш(ся)?"+wEnd] = "$1$2шь$3"; //сложно посчитать, но много
	ciReplacements["(у|ю)ться"+wEnd] = "$1тся"; //сложно посчитать, но много
	ciReplacements["([ая])еться"+wEnd] = "$1ется"; //сложно посчитать, но много

	//======== Редкие, но напрягающие
	ciReplacements[wBeg+"(т)ысячь"] = "$1$2ысяч"; //88
	ciReplacements[wBeg+"(ч)ерезвычайн"] = "$1$2резвычайн"; //80
	ciReplacements[wBeg+"(б)езплатн"] = "$1$2есплатн"; //68
	ciReplacements[wBeg+"(с)деланно"+wEnd] = "$1$2делано"; //67
	ciReplacements[wBeg+"(д)ефакто"+wEnd] = "$1$2е-факто"; //61
	ciReplacements[wBeg+"(в)роди"+wEnd] = "$1$2роде"; //58
	ciReplacements[wBeg+"(т)орент"] = "$1$2оррент"; //57
	ciReplacements[wBeg+"(к)(?!онечно)[ао]не[чш](?:н[ао]|ь)?"+wEnd] = "$1$2онечно"; //57
	ciReplacements[wBeg+"(з)а частую"+wEnd] = "$1$2ачастую"; //54 //может быть корректным, но ошибок куча
	ciReplacements[wBeg+"(н)епойму"+wEnd] = "$1$2е пойму"; //44
	ciReplacements[wBeg+"(е)сле"+wEnd] = "$1$2сли"; //41
	ciReplacements["(и)нтерприт"] = "$1нтерпрет"; //41
	ciReplacements[wBeg+"(п)ошол"+wEnd] = "$1$2ошёл"; //31
	ciReplacements["([а-яА-Я])либо"+wEnd] = "$1-либо"; //31
	ciReplacements[wBeg+"(в)\\sсуе"+wEnd] = "$1$2суе"; //33
	ciReplacements[wBeg+"(ж)остк[ао]"] = "$1$2ёстко"; //32
	ciReplacements[wBeg+"(ч)[ёе]рт[ие]"+wEnd] = "$1$2ёрт-те"; //31
	ciReplacements[wBeg+"(п)одрят"+wEnd] = "$1$2одряд"; //31
csReplacements[wBeg+"фф?се"+wEnd] = "$1все"; //31
csReplacements[wBeg+"Фф?се"+wEnd] = "$1Все"; //-
	ciReplacements[wBeg+"(ч)ерезмерн"] = "$1$2резмерн"; //25
	ciReplacements[wBeg+"(н)е\\sудачн"] = "$1$2еудачн"; //23
	ciReplacements["(.?)-та"+wEnd] = "$1-то"; //20
	ciReplacements[wBeg+"(п)рич[ое]м"+wEnd] = "$1$2ричём"; //10

	ciRegex = {};
	csRegex = {};
	for (key in ciReplacements)
		ciRegex[key] = new RegExp(key, "ig");
	for (key in csReplacements)
		csRegex[key] = new RegExp(key, "g");

	//Применяем каждое правило к каждому заголовку, топику и комментарию
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		s = node.data;
		for (key in ciReplacements)
			s = s.replace(ciRegex[key], ciReplacements[key]);
		for (key in csReplacements)
			s = s.replace(csRegex[key], csReplacements[key]);
		node.data = s;
	}
}