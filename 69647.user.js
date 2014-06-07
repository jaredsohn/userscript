// ==UserScript==
// @name             sind_var
// @namespace        sind_var_ns
// @description      Фильтрация своего синдиката в синдикатных боях =)
// @include          http://*ganjawars.ru/wargroup.php?war=attacks*
// @version          1.0
// @author           pestO
// ==/UserScript==


//Тут можно поменять номер синдиката =)
var sind_id = '5055'


//Ищем место куда тыкаем checkbox
var find = document.getElementsByTagName( 'a' );
for (var i = 0; i < find.length; i++)
	if(find[i].href.indexOf('/wargroup.php?war=attacks') > -1)
	if(find[i].firstChild.nodeValue.indexOf('Обновить') > -1)
		{
		//Создание элемента
		var p=document.createElement('input')
		p.id = 'sind_filter'
		p.setAttribute('TYPE','checkbox')
		//Считываем из куков да/нет
		if(getCookie('is_sind')=='true')
			p.checked=true;
		//Обработчик включения/Выключения
		p.addEventListener("click", sind_get, false)
		find[i].parentNode.insertBefore(p,find[i]);
		//вызываем 
		sind_get();
		break;
		}


//Обработчик включения/Выключения	
function sind_get()
{
	//Поиск checkbox-а
	var q = document.getElementById ( 'sind_filter' );
	//Сразу сохраняем изменение
	setCookie('is_sind',q.checked,'','','','')
	//if(q.checked==false)
	var tmp=0;
	//Поиск первой строчки таблицы 
	//Старт		t/o		Описание	Кол-во	Ограничения	и т.д.
	var find1 = document.getElementsByClassName( 'wbt' );
	for (var i = 0; i < find1.length; i++ )
		{
		tmp=find1[i];
		if(tmp.getElementsByTagName( 'b' )[0].firstChild.nodeValue == 'Старт')
			{
			//Нашёлся родимая
			tmp = tmp.parentNode.parentNode
			break;
			}
		}
	//Берем все строки таблицы нападений
	find1  = tmp.getElementsByTagName( 'tr' );
	for (var i = 1; i < find1.length; i++ )
		{
		//Если выключен checkbox
		if(q.checked==false)
				//Показываем все строки
				find1[i].style.display = ''
		else{//Иначе смотрим НАШ ли синдикат
			tmp=find1[i].getElementsByClassName( 'wbt' )[4].getElementsByTagName( 'a' )
			var len=tmp.length
			//Если синдиктов вообещ нет
			if(len==0)
				//скрываем
				find1[i].style.display = 'none'
			else
				{
				//Если синды есть
				for(var j = 0; j < len; j++)
					//НАШ синд показываем
					if(tmp[j].href.indexOf('/s'+'yndicate.p'+'hp?i'+'d='+'5'+'0'+'5'+'5') > -1)
						{
						find1[i].style.display = ''
						//рас уж это он то выходим
						j=len
						}
					else
						find1[i].style.display = 'none'
				}
			}
		}
}


function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
	var i=10;
}
function getCookie(name) {
try
{
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
				}
			setStr = unescape(cookie.substring(offset, end));
			}
		}
	if(setStr == null) return 'false'
	return setStr;
}
catch(err) { return 'false' }
}
