//
//
// ==UserScript==
// @name          Dirty Tags
// @namespace   http://dirty.ru/
// @description   Helps to tag the posts on the dirty.ru
// @author	crea7or
// @include       http://dirty.ru/comments/*
// @include       http://www.dirty.ru/comments/*
// @require http://sizzlemctwizzle.com/updater.php?id=81371&days=7
// @version        1.0.5
// ==/UserScript==
//


	var vTagsArray=["fapfapfap","Автомобили","Архитектура","Аудио","Аферы","Боевые искусства","Большой dirty","Британские ученые","Вавилонская библиотека","Видео","Вирусняк","ВОВ","Военное дело","Гаджеты","Грузия","Дизайн","Дискавери","Доблестная милиция","Достопримечательности ближних стран","Достопримечательности мира","Драма","ЖЗЛ","Живопись","Законы","Игры","Интересные сайты","Интересные факты","Интернет","Искусство","Исторические курьезы","История","Карнавал интеллектуалов","Кинематограф","Коллективный пост","Копирайты и пиратство","Коррупция","Криминал","Кулинария","Маркобесие","Медицина","Музыка","Научпоп","Некропост","Нямка","Образование","Очумелые ручки","Полезные сайты","Политика других стран","Политика России","Политика Украины","Прибалтика","Психология","Разоблачение","Ретро","Скандалы интриги расследования","Скрипты","Слава богу родился","Случаи","Софт","Спорт","Срач","США","Таланты","Теория заговора","Техника","Трагедии","Транспорт","Туризм","Украина","Утки","Физика","Фишкинет","Фото","Фотографы","Футбол","Экономика"];
	var vTagsDiv = document.querySelector('div.b-i-tags_comments_page');
	var vTagsUserName = '';
	if ( vTagsDiv )
	{
		vTagsDiv.setAttribute('style', 'padding-top: 10px' );
		
		var vTagsDd = document.querySelector('div.dd');
		if ( vTagsDd )
		{ 
			var vTagsListA = vTagsDd.querySelectorAll('a');
			for ( n =0; n < vTagsListA.length; n++ )
			{
				if ( vTagsListA[n].href.search('user') >= 0 )
				{
					vTagsUserName = vTagsListA[n].text + " - молодец!";
				}
			} 
		}


		var newdiv = document.createElement('div');
		var divIdName = 'js-tags-script-predefines';
		newdiv.setAttribute('id',divIdName);
		newdiv.setAttribute('style', 'font-size: 11px;');

		vTagsArray.push( vTagsUserName );

		for ( i = 0; i < vTagsArray.length; i++ )
		{
			newdiv.innerHTML += "<a href=\"#\" onclick=\"$('js-new_tag_input').value = '" + vTagsArray[i] + "'; tagsHandler.submitTag(); return false;\"><nobr>" + vTagsArray[i] + "</nobr></a>";
			if (( vTagsArray.length - 1 ) != i )
			{
				newdiv.innerHTML += " , ";
			}			
		}
		
		newdiv.innerHTML += "<br><br>";



		vTagsDiv.appendChild(newdiv);

	}

	// regexp based on http://leprosorium.ru/users/antyrat script
	var vTagPattern = /([^\s,:\.\>\<][\wаА-б???#&\s\-\т?\.\!\?]+)(\[x\]|\s\[x\]|\s\[б?]|\[б?])+/gi;
	var vTagReplacement = "$1 [<a href=\"#\" onclick=\"if ( this.innerHTML == 'x' ) { this.innerHTML = '-'; $('js-new_tag_input').value = '$1'; tagsHandler.submitTag(); } else { this.innerHTML = 'x' ; tagsHandler.deleteTag( $('js-tags_private'), '$1'); }  return false;\" title=\"$1\" style=\"color: red;\">x</a>]";

	var vTagComments = document.getElementsByClassName('c_body');
	var vTagsXPos;
	var vTagStr;
	for(var i=0; i < vTagComments.length; i++)
	{
			vTagStr = vTagComments[i].innerHTML;
			vTagsXPos = vTagStr.indexOf('[x]');
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[X]');
			}
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[б?');
			}
			if ( vTagsXPos < 0 ) 
			{
				vTagsXPos = vTagStr.indexOf('[аЅ]');
			}	
			if ( vTagsXPos > 0 ) 
			{	
				vTagComments[i].innerHTML = vTagStr.replace(vTagPattern, vTagReplacement);
			}
	}
