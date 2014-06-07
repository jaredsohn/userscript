// ==UserScript==
// @name           O-GO userJS
// @namespace      http://o-go.ru/catalog/102946
// @description    Improver for o-go.ru
// @include        http://o-go.ru/*
// @include        http://www.o-go.ru/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function OGO()
{
	// Находим нужную таблицу
    var tbody = document.getElementById('comment_text').getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    var row = document.createElement("TR");
    tbody.appendChild(row);
	
	row.height	= 24;
	row.width	= 524;

    // Создаем ячейки в вышесозданной строке
    // и добавляем тх
    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");
	var td3 = document.createElement("TD");
	var td4 = document.createElement("TD");
	var td5 = document.createElement("TD");
	var td6 = document.createElement("TD");

    td6.colSpan = "5";
	td5.width = 30;
	
	row.appendChild(td1);
    row.appendChild(td2);
	row.appendChild(td3);
	row.appendChild(td4);
	row.appendChild(td5);
	row.appendChild(td6);
	
	
	var ku3mi41 = '[align=center][size=5][font=Georgia][color = #000000]Название/Title[/color][/font][/size][/align]\\n[center][color=#777777][size=2][font=Tahoma]Здесь должен быть слоган фильма[/font][/size][/color][/center]\\n\\n[table][tr][td width=400][img]http://o-go.ru/screen2/022011/15022011214905409.jpg[/img][/td][td]\\n\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Год выпуска:[/color] [color = #587AB0]%Year%[/color]\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Страна:[/color] [color = #587AB0]%Country%[/color]\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Жанр: [/color] [color = #587AB0]%Genres%[/color]\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Продолжительность: [/color] [img]http://o-go.ru/screen2/082010/0608201024854324.png[/img] [color = #587AB0]%Duration%[/color]\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Перевод: [/color] [color = #587AB0]%Translation%[/color]\\n\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] Режиссер: [/color] [color = #CC3330]%Directors%[/color]\\n[img]http://o-go.ru/screen2/062010/14062010110355329.gif[/img][size=2][font=Georgia][color = #000000] В ролях: [/color] %Actors%\\n\\n[size=2][font=Georgia][color = #000000] [img]http://o-go.ru/screen2/022011/12022011214036490.png[/img] Мировая премьера: [/color] [color = #587AB0]%WorldPremiere%[/color]\\n[size=2][font=Georgia][color = #000000] [img]http://o-go.ru/screen2/022011/12022011213839226.png[/img] Релиз на DVD: [/color] [color = #587AB0]%DVDPremiere%[/color]\\n[size=2][font=Georgia][color = #000000] [img]http://o-go.ru/screen2/022011/12022011213959447.png[/img] Релиз на Blu-ray: [/color] [color = #587AB0]%BDPremiere%[/color]\\n\\n[center][url=%KPPage%][img]http://o-go.ru/screen2/022011/12022011220520246.png[/img][/url]: [size=4][font=Georgia][color = #000000]%KPRate%[/color][/font][/size] [img]http://o-go.ru/screen2/022011/12022011220031352.png[/img]: [size=4][font=Georgia] [color = #000000]%IMDBRate%[/color][/font][/size][/center]\\n\\n[center][b][url=http://www.kinopoisk.ru/level/38/][color = #000000]MPAA[/color][/url][/b]: [url=%MPAALink%][color = #000000]%MPAARating%[/color][/url] - [color = #000000]%MPAADesc%[/color][/center]\\n[hr]\\n[img]http://o-go.ru/screen2/082010/12082010173235164.png[/img][color = #000000][b]Качество: [/b]%Quality%[/color]\\n[img]http://o-go.ru/screen2/082010/12082010173235164.png[/img][color = #000000][b]Формат: [/b]%Format%[/color]\\n[img]http://o-go.ru/screen2/082010/12082010173235164.png[/img][color = #000000][b]Источник: [/b]%Source%[/color]\\n\\n[color = #000000]%VideoInfo%[/color]\\n[color = #000000]%AudioInfo%[/color]\\n[color = #000000]%SubtitlesInfo%[/color]\\n[/td][/tr][/table]\\n[b]Дополнительная информация[/b]%AddInfo%\\n\\n[color = #000000][img]http://o-go.ru/screen2/112009/2211200922572389.gif[/img][b]Описание: [/b]\\n%Description%[/color]\\n[spo=[font=Tahoma][color = #000000][img]http://o-go.ru/screen2/022011/1202201123003310.png[/img] Знаете ли Вы, что...[/color]][list]%DoYouKnowThings%[/list][/spo][spo=[font=Tahoma][color = #000000][img]http://o-go.ru/screen2/082009/1408200920365281.png[/img] Скриншоты[/color]]\\n[center][img]http://o-go.ru/screen2/022011/15022011214902352.jpg[/img]\\n\\n[img]http://o-go.ru/screen2/022011/15022011214902352.jpg[/img]\\n\\n[img]http://o-go.ru/screen2/022011/15022011214902352.jpg[/img][/center][/spo]\\n'
    // Наполняем ячейки
    td1.innerHTML = '<ul class="magic"><li class="magic"><a class="magic" onclick="return false;" href="#"><img src="screen2/022011/15022011203517218.png" border="0" alt="magic" align="absmiddle" /></a><ul><li><a onclick="InsertResult(\''+ku3mi41+'\',\'\',\'info\');return false;" class="thumbnail" href="#">Ku3mi41 style<span><img src="screen2/022011/15022011213229397.jpg" width="250" height="222" /></span></a></li></ul></li></ul>';
    td2.innerHTML = '<a href="#" onclick="insertSimple(\'left\',\'info\');return false;"><img src="screen2/022011/15022011185232303.png" border="0" alt="left" align="absmiddle" /></a>';
    td3.innerHTML = '<a href="#" onclick="insertSimple(\'center\',\'info\');return false;"><img src="screen2/022011/15022011185224358.png" border="0" alt="center" align="absmiddle" /></a>';
	td4.innerHTML = '<a href="#" onclick="insertSimple(\'right\',\'info\');return false;"><img src="screen2/022011/1502201118523829.png" border="0" alt="right" align="absmiddle" /></a>';
	td6.innerHTML = '<select id="myfont" onchange="insertfont()"><option style=\'font-family: "Arial"\'>Arial</option><option style=\'font-family: "Arial Black"\'>Arial Black</option><option style=\'font-family: "Arial Narrow"\'>Arial Narrow</option><option style=\'font-family: "Book Antiqua"\'>Book Antiqua</option><option style=\'font-family: "Century Gothic"\'>Century Gothic</option><option style=\'font-family: "Comic Sans MS"\'>Comic Sans MS</option><option style=\'font-family: "Courier New"\'>Courier New</option><option style=\'font-family: "Franklin Gothic Medium"\'>Franklin Gothic Medium</option><option style=\'font-family: "Garamond"\'>Garamond</option><option style=\'font-family: "Georgia"\'>Georgia</option><option style=\'font-family: "Impact"\'>Impact</option><option style=\'font-family: "Lucida Console"\'>Lucida Console</option><option style=\'font-family: "Lucida Sans Unicode"\'>Lucida Sans Unicode</option><option style=\'font-family: "Microsoft Sans Serif"\'>Microsoft Sans Serif</option><option style=\'font-family: "Palatino Linotype"\'>Palatino Linotype</option><option style=\'font-family: "Tahoma"\'>Tahoma</option><option style=\'font-family: "Times New Roman"\'>Times New Roman</option><option style=\'font-family: "Trebuchet MS"\'>Trebuchet MS</option><option style=\'font-family: "Verdana"\'>Verdana</option></select>';
	td5.innerHTML = '<select id="mysize" onchange="insertsize()"><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option></select>';
	
	//Шаблоны
	
	//стиль для выпадающего меню
	addGlobalStyle( "ul { margin: 0; 	padding: 0; list-style: none; width: 150px;border-bottom: 1px solid #ccc;}"+
					"ul li { position: relative; }"+
					"li ul { position: absolute; left: 25px; top: 0; display: none; }"+
					"ul li a { display: block; text-decoration: none; color: #777; background: #fff; padding: 5px; 	border: 1px solid #ccc; border-bottom: 0; }"+
					"* html ul li { float: left; height: 1%; }"+
					"* html ul li a { height: 1%; }"+
					"ul li a:hover { color: #E2144A; background: #f9f9f9; }"+
					"li ul li a { padding: 2px 5px; }"+
					"li:hover ul, li.over ul { display: block; }"+
					".magic, .magic:hover {width:20px; background: none; margin:none; border:none;z-index:0;}");
	//стиль для всплывающей подсказки
	addGlobalStyle( ".thumbnail{ position: relative; z-index: 0; }"+
					".thumbnail:hover{ background-color: transparent; z-index: 50; }"+
					".thumbnail span{ position: absolute; background-color: #ffffff; padding: 5px; left: -1000px; border: 1px dashed gray; visibility: hidden; color: black; text-decoration: none; }"+
					".thumbnail span img{ border-width: 0; padding: 2px; }"+
					".thumbnail:hover span{ visibility: visible; top: 0; left: 100px; }");	
}

function insertfont() 
{
	var x=document.getElementById("myfont");
	InsertResult('[font="'+x.options[x.selectedIndex].text+'"]', '[/font]', 'info'); 
}

function insertsize() 
{
	var y=document.getElementById("mysize");
	InsertResult('[size="'+y.options[y.selectedIndex].text+'"]', '[/size]', 'info'); 
}

window.addEventListener('load', OGO, true);	// запуск функции