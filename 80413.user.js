// ==UserScript==
// @name           Pridelands.ru - Polski do Rosyjskiego Transliteracja (Transkrypcja) + Tłumaczenie menu BETA
// @namespace      http://userscripts.org/scripts/show/68624
// @description    Skrypt przeznaczony dla strony pridelands.ru Transliteruje alfabet rosyjski do polskiego oraz tłumaczy menu (wersja alfa)
// @include        http://pridelands.ru/*
// @include        http://www.pridelands.ru/*
// @include        http://www.yiff.ru/gbook.php*
// @include        http://yiff.ru/gbook.php*
// @include        http://forum.nala.ru/*
// @include        http://www.forum.nala.ru/*
// @include        http://snowlands.ru/*
// @exclude        http://snowlands.ru/en/*
http://snowlands.ru/
// ==/UserScript==

//tłumaczenie menu, orginal script by JoeSimmons - http://userscripts.org/scripts/show/41369 License: http://creativecommons.org/licenses/by-nc-nd/3.0/us/
var words = {
'Главная' : 'Strona Główna',
'Новости' : 'Nowości',
'сайта' : 'świata',
'История' : 'Historia',
'Персонажи' : 'Postacie',
'Pumbaa' : 'Pumba',
'Scar' : 'Skaza',
'Ахади' : 'Ahadi',
'Картинки' : 'Obrazy',
'Большие' : 'Duże',
'Мой' : 'Mój',
'Из фильма' : 'Z filmu',
'Взрослые' : 'Dorosłe',
'Как' : 'Jak',
'рисовать' : 'rysować',
'Львов' : 'Lwów',
'Тигров' : 'Tygrysów',
'Гепарды' : 'Gepardy',
'Леопарды' : 'Leopardy',
'Ягуаров' : 'Jaguarów',
'Ирбисов' : 'Irbisów',
'Рысей' : 'Rysiów',
'Видео' : 'Filmy',
'Трейлеры' : 'Trailery',
'Вырезанные' : 'Wycięte sceny',
'Разное' : 'Różne',
'Звуки' : 'Dźwięki',
'Музыка' : 'Muzyka',
'(Разные)' : '(Multilang)',
'Ремиксы' : 'Remiksy',
'Игры' : 'Gry',
'Стафф' : 'Stuff',
'Скачать' : 'Pobierz',
'Книги' : 'Książki',
'Плюшки' : 'Pluszaki',
'Самодельный' : 'Samodzielne',
'Обои' : 'Tapety',
'Книги' : 'Książki',
'Книжки' : 'Książki',
'Паззлы' : 'Puzzle',
'Дикие' : 'Dzikie',
'кошки' : 'koty',
'Лев' : 'Lew',
'Тигр' : 'Tygrys',
'Гепард' : 'Gepard',
'Леопард' : 'Leopard',
'Рысь' : 'Ryś',
'Другие' : 'Inne',
'Библиотека' : 'Biblioteka',
'Рассказы' : 'Historie',
'Юмор' : 'Humor',
'Эссе' : 'Eseje',
'Хроники' : 'Kroniki',
'Стихи' : 'Poezja',
'Не по TLK' : 'Nie o TLK',
'Опубликовать' : 'Opublikuj',
'Словарик' : 'Słownik',
'Фэн-клуб' : 'Fanklub',
'Список фэнов' : 'Spis fanów',
'Мэйл листы' : 'Mail lista',
'Тусовки' : 'Paczka',
'Прошедшие' : 'Przeszłość',
'Гостевая книга' : 'Księga gości',
'Ссылки' : 'Linki',
'Добавить' : 'Dodaj',
'Поиск' : 'Szukaj',
'Результаты' : 'Rezultaty',
'Копирайты':'Prawa autorskie',
'ть' : 'ć'};
//'сь' : 'ś', (?) - sprawdzić przy następnej wersji
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}

//transliteracja, original script by Couchy http://userscripts.org/scripts/show/68624 License: None (?)


transliterate_rus1 = true;

transliterate_rus2 = true;

var SUC_script_num = 68624;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'BPT') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var obstring = 'var transliterations = {';
if(transliterate_rus1 == true)
	{
	obstring +=	'A:"A", a:"a", Б:"B", б:"b", В:"W", в:"w", Г:"G", г:"g", Ґ:"G", ґ:"g", Д:"D", д:"d", Е:"Ie", е:"ie", Є:"Je", є:"je", Ж:"Ż",'
	+		'Ї:"Ji", ї:"ji", з:"z", Ѕ:"Dz", ѕ:"dz", И:"I", и:"i", І:"I", і:"i", Й:"J", й:"j", К:"K", к:"k", Ќ:"C", ќ:"c",'
	+		'Л:"L", л:"l", Љ:"Li", љ:"li", Н:"N", н:"n", Њ:"Ń", њ:"ń", О:"O", о:"o", П:"P", п:"p", Р:"R", р:"r", С:"S", с:"s", Т:"T", т:"t",'
	+		'Ћ:"Ć", ћ:"ć", ж:"ż", Ѓ:"Gy", ѓ:"gy", Ђ:"Dzi", ђ:"dzi", З:"Z", Ј:"J", ј:"j", М:"M", м:"m", У:"u", у:"u", Ў:"U", ў:"u",'
	+		'Џ:"Dż", џ:"dż", Ф:"F", ф:"f", Х:"Ch", х:"ch", Ц:"C", ц:"c", Ч:"Cz", ч:"cz", Ш:"Sz", ш:"sz", Щ:"Szcz", Ъ:"’", ъ:"’", Ы:"Y", ы:"y", ь:"’",';
	}

if(transliterate_rus2 == true)	
	{	
	obstring +=	'Ь:"’", Э:"E", э:"e", Ю:"Ju", ю:"ju", Я:"Ja", я:"ja", щ:"szcz",'
	+		'Ё:"Ie", ё:"ie" ,';
	}

obstring += '};';
eval(obstring);

function defined(v)
	{
	return v != undefined;
	}

function translate(text)
	{
	if(!defined(text) || !text.match) 
		return undefined;
	
	text = text.replace(/^\s*/, "").replace(/\s*$/, "");

	if(text == "")
		return undefined;

	var translation = "";

	for(var i = 0; i < text.length; i++)
		{
		rus1 = text.charAt(i);

		transliteration = transliterations[rus1];

		if(defined(transliteration))
			translation += transliteration;

		else
			translation += rus1;
		}
	
	return translation;
	}

function translateTree(a)
	{
	var items = document.evaluate("descendant::*", a, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for(var i = 0; i < items.snapshotLength; i++)
		{
		var e = items.snapshotItem(i);
		
		for(var j = 0; j < e.childNodes.length; j++)
			{
			var elem = e.childNodes[j];

			if(elem.nodeType == 3)
				{
				var text = translate(elem.wholeText);
				if(defined(text))
					elem.replaceWholeText(text);
				} 

			else
				{
				var text = translate(elem.value);
				if(defined(text))
					elem.value = text;
				}
			}
		}
	}

translateTree(document.body);