// ==UserScript==
// @name           QuickVocsStart_CodeVersion
// @namespace      fnx
// @include        http://klavogonki.ru/vocs/*
// @author         Fenex
// @author-page    http://klavogonki.ru/profile/82885/
// @version        2.9
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
function userCode() {
	var button_link = new Array();
	for(i=0;i<4;i++) {
		button_link[i] = new Object();
	}
	
	//*************************************************************************************************//
	//                       Ниже описываются настройки ссылок, их можно править:                      //
	//   ------      ------      ------      ------      ------      ------      ------      ------    //
	//name - то, что будет отображаться на странице;                                                   //
	//type [practice, private, normal] - тип заезда [одиночный, заезд с друзьями, открытый];           //
	//level_from [1,2,3,4,5,6,7,8,9] - огнаничение на вход "снизу", [1 - новички, ..., 9 - экстракиберы];//
	//level_to [1,2,3,4,5,6,7,8,9] - огнаничение на вход "сверзу", [1 - новички, ..., 9 - экстракиберы]; //
	//timeout [1, 2, ..., 180] - таймаут, в секундах;                                                  //
	//qual - [true, false] - режим игры [квалификация, стандартный режим];                             //
	//enabled [true, false] - включение дополнительны кнопок [включить, отключить].                    //
	//*************************************************************************************************//
	
	//главная кнопка, включена всегда.
	button_link[0].name = "одиночный, 5 сек";
	button_link[0].type = "practice";
	button_link[0].level_from = "1";
	button_link[0].level_to = "9";
	button_link[0].timeout = "5"
	button_link[0].qual = false;
		
	//дополнительные кнопки;
	//для включения "enabled = true;"
	
	//Кнопка номер раз.	
	button_link[1].enabled = true;
	button_link[1].name = "открытый, 10 сек";
	button_link[1].type = "normal";
	button_link[1].level_from = "1";
	button_link[1].level_to = "9";
	button_link[1].timeout = "10"
	button_link[1].qual = false;
	
	//Кнопка номер два.
	button_link[2].enabled = true;
	button_link[2].name = "открытый, 20 сек";
	button_link[2].type = "normal";
	button_link[2].level_from = "1";
	button_link[2].level_to = "9";
	button_link[2].timeout = "20"
	button_link[2].qual = false;
	
	//Кнопка номер три.
	button_link[3].enabled = true;
	button_link[3].name = "дружеский, 10 сек";
	button_link[3].type = "private";
	button_link[3].level_from = "1";
	button_link[3].level_to = "9";
	button_link[3].timeout = "10"
	button_link[3].qual = false;
	
	//А дальше, клавогонщик, замри!!!
	
	//----------------------------------------------------------------//
	//            Дальше код не трогать, а то сломаете...             //
	//----------------------------------------------------------------//
	
	return button_link;
}

function init_QuickScript() {
	if(!(/^http:\/\/klavogonki.ru\/vocs\/\d+/.test(location.href)))
		return;
	var f = true;
	var txt = "";
	var elem = document.getElementsByClassName('user-title')[0].getElementsByClassName('remove')[0];
	if(!elem)
		return;
	elem.parentNode.setAttribute('class', 'links');
	var vocid = location.href.match(/\d+/);
	var m = userCode();
	for(i=0;i<4;i++)
		m[i].qual = m[i].qual ? "&qual=1" : "";
	var href = "http://klavogonki.ru/create/?gametype=voc&voc="+vocid+"&type="+m[0].type+"&level_from="+m[0].level_from+"&level_to="+m[0].level_to+"&timeout="+m[0].timeout+m[0].qual+"&submit=Начать";
	var e = document.createElement('a');
	e.setAttribute('href', href);
	e.innerHTML = '<span>'+m[0].name+'</span>';
	elem.parentNode.insertBefore(e, elem.nextSibling);
	for(i=1;i<4;i++) {
		if(!m[i].enabled)
			continue;
		f = false;
		txt += "<a href='http://klavogonki.ru/create/?gametype=voc&voc="+vocid+"&type="+m[i].type+"&level_from="+m[i].level_from+"&level_to="+m[i].level_to+"&timeout="+m[i].timeout+m[i].qual+"&submit=Начать'><span>"+m[i].name+"</span></a>";
	}
	if(f)
		return;
	e = document.createElement('td');
	e.setAttribute('class', 'links');
	e.setAttribute('id', 'td_QSUS');
	e.innerHTML = txt;
	elem.parentNode.parentNode.insertBefore(e, elem.parentNode.nextSibling);
	
	var s = document.createElement('style');
	s.innerHTML = '.user-title .links a{margin: 7px 0px 0px 12px !important;}';
	document.body.appendChild(s);
}
init_QuickScript();