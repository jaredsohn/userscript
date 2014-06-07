// ==UserScript==
// @name          LeproNamesAndPages
// @namespace     ACTPOHABT (8110), Omen (12643), Vizzy (27480)
// @description   Заменяет скучное "Лепрозорий / Убежище" на номер страницы или юзернэйм.
// @include		 http://*.leprosorium.ru/*
// @include		 http://leprosorium.ru/*

// ==/UserScript==



var currentTitle = '', newtitle='', page, url=document.URL, wannabetitle, karma, username, usernumber, length_title=50, pots, i, j=0; indexNum = 0; indices = new Array(); // Переменные

function sortindices(a,b)   //этим методом мы потом отсортируем индексы
{
	return a - b;
}

if (document.title.length < 10) {
	currentTitle = ' / ' + document.title;
}

if (/^http:\/\/(\w+\.)?leprosorium\.ru\/users\/\w+(\/)?/.test(document.URL)) //страничка с чьим-то профайлом
{
	username=document.URL.match(/^http:\/\/(\w+\.)?leprosorium\.ru\/users\/(\w+)(\/)?/)[2] // Грузим имярек
	
	if(/^http:\/\/(\w+\.)?leprosorium\.ru\/users\/\w+(\/)?$/.test(document.URL))
	{
		//    karma = document.getElementsByClassName('rating')[0].childNodes[0].innerHTML;
		usernumber = document.getElementsByClassName('vote')[0].getAttribute('uid');
		//    newtitle = wannabetitle + ' (' + usernumber + '), его карма: ' + karma;
		wannabetitle = username + ' (' + usernumber + ')';
		newtitle = wannabetitle;
		
	}
	else
	{
		wannabetitle = 'Про ' + username;
		newtitle = wannabetitle;
	}
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/pages\/1(\/)?$/.test(document.URL))||(/^http:\/\/(www\.)?leprosorium\.ru(\/)?$/.test(document.URL)))  //страничка с главной
{
	newtitle='Глагне';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/democracy(\/)?$/.test(document.URL))) //Белый дом
{
	newtitle='Белый дом';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/elections\/president(\/)?$/.test(document.URL))) //Выборы
{
	newtitle='Выборы';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/fraud\/(\w+)?(\/)?$/.test(document.URL))) //Магазин и все, что в нем есть
{
	newtitle='Фрод';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/underground(\/)?$/.test(document.URL))) //Страница со списком подлепр
{
	newtitle='Блоги';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/users(\/)?$/.test(document.URL))) //Страница с информацией о юзерах
{
	newtitle='Люди';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/users\/\?username=(\w+)?\&firstname=(\w+)?\&lastname=(\w+)?\&icq=(\d+)?\&(x=\d+\&y=\d+)?$/.test(document.URL))) //Страница поиска людей
{
	
	userstring=document.URL.match(/^http:\/\/(\w+\.)?leprosorium\.ru\/users\/\?username=(\w+)?\&firstname=(\w+)?\&lastname=(\w+)?\&icq=(\d+)?\&(x=\d+\&y=\d+)?$/);
	
	wannabetitle = "Ищем ";
	
	try {
		username = userstring[2];
		if(username.length > 0){
			wannabetitle += username + " ";
		}
	}
	catch(err){}

	try {
		firstname = userstring[3];
		if(firstname.length > 0){
			wannabetitle += firstname + " ";
		}
	} catch(err){}

	try {
		lastname = userstring[4];
		if(lastname.length > 0){
			wannabetitle += lastname + " ";
		}
	} catch(err){}

	try{
		icq = userstring[5];
		if(icq.length > 0){
			wannabetitle += icq;
		}
	}catch(err){}
	
	newtitle = wannabetitle;
}

if(/^http:\/\/(\w+\.)?leprosorium\.ru\/pages\/\d+(\/)?$/.test(document.URL)) // страничка Лепры, но не главная
{
	page = document.URL.match(/^http:\/\/(\w+\.)?leprosorium\.ru\/pages\/(\d+)$/)[2];
	newtitle=page + '-я страница';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my(\/)?$/.test(document.URL)))  //страничка с моими вещами
{
	newtitle=document.getElementById('things').childNodes[0].childNodes[0].childNodes[0].innerHTML;
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/socialism(\/)?$/.test(document.URL)))  //страничка с социализмом
{
	newtitle='Социализм';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/favourites(\/)?$/.test(document.URL)))  //страничка с favourites
{
	newtitle='Избранное';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/details(\/)?$/.test(document.URL)))  //страничка с details
{
	newtitle='Детали';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/settings(\/)?$/.test(document.URL)))
{
	newtitle = 'Настройки';
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/inbox(\/)?$/.test(document.URL)))  //страничка с Инбоксом
{
	newtitle='инбокс '+document.getElementById('inbox').childNodes[0].childNodes[0].childNodes[0].innerHTML
}

if((/^http:\/\/(\w+\.)?leprosorium\.ru\/asylum(\/)?$/.test(document.URL))) //Страничка для нового поста
{
	newtitle='Новый пост';
}

if (/^http:\/\/(\w+\.)?leprosorium\.ru\/mod\/\d+(\/)?$/.test(document.URL))
{
	newtitle = 'Правим ' + document.title.toLowerCase();
}

if ((/^http:\/\/(\w+\.)?leprosorium\.ru\/comments\/\d+/.test(document.URL)) || (/^http:\/\/(\w+\.)?leprosorium\.ru\/my\/inbox\/\d+/.test(document.URL))) //страничка с постом 
{
	pots=document.getElementsByClassName('dt'); // Грузим пост
	if (pots[j].textContent.length==0) // Проверка на пустой пост (одна картинка например) 
	{
		while (pots[j].textContent.length==0) 
		{
			j++; // Как бы говорим взять первый коментарий, потому что в посте ничерта нет
			//      alert(pots[j].textContent.length);
		}
		newtitle=pots[j].textContent.toLowerCase();
	} 
	else //отлично, пост не пустой
	{
		if (pots[j].innerHTML.indexOf('<b>') != -1 && pots[j].innerHTML.indexOf('<b>') < 5) //попробуем взять заголовки, заданные тегом <b>
		{
			newtitle=pots[j].childNodes[0].innerHTML.toLowerCase();
		}
		else if (pots[j].innerHTML.indexOf('<br>') != -1 && pots[j].innerHTML.indexOf('<br>') < length_title)
		{	
			newtitle=pots[j].innerHTML.split('<br>')[0].toLowerCase();
		}
		else
		{
			newtitle=pots[j].textContent.toLowerCase(); //если их нет, то просто возьмем, что есть
		}
	}
}


if(newtitle != '') {

	//Сейчас мы будем добавлять индексы разных знаков препинания
	if (newtitle.indexOf(".") != -1 && newtitle.indexOf(".") < 70)
	{
		indices[indexNum] = newtitle.indexOf(".");
		indexNum++;
	}

	if (newtitle.indexOf("!") != -1 && newtitle.indexOf("!") < 70)
	{
		indices[indexNum] = newtitle.indexOf("!") + 1;
		indexNum++;
	}

	if (newtitle.indexOf("?") != -1 && newtitle.indexOf("?") < 70)
	{
		indices[indexNum] = newtitle.indexOf("?") + 1;
		indexNum++;
	}

	if (newtitle.indexOf("…") != -1 && newtitle.indexOf("…") < 70)
	{
		indices[indexNum] = newtitle.indexOf("…") + 1;
		indexNum++;
	}

	indices.sort(sortindices);    //тут мы эти индексы отсортируем

	if(indexNum > 0)        //тут мы обрежем по эти самые индексы
	{
		newtitle = newtitle.substring(0,indices[0]);
	}
	else if (indexNum == 0 && newtitle.length > length_title) //или просто обрежем
	{
		newtitle = newtitle.substring(0, length_title) + '...';
	}

	document.title = newtitle + currentTitle;        //Вот и все!
}