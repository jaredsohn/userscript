// ==UserScript==
// @name             work_2_hour
// @namespace        work_2_hour_ns
// @description      Скрывает кнопку работы 1 час =)
// @include          http://*ganjawars.ru/object.php?id=*
// @version          1.0
// @author           pestO
// ==/UserScript==


//ищем ввод циферок
var p=document.getElementsByName( 'tricky' )[1];
//Добавляем обработчик на нажатие клавиш
if (p.addEventListener)  // FF и другие
        p.addEventListener('keypress', allow_oly_numb_esc,false);
else
	if (htmlElement.attachEvent)  // специально для MSIE 
			htmlElement.attachEvent('keypress',allow_oly_numb_esc);
//Скрываем "1час"
p.parentNode.getElementsByTagName( 'input' )[3].style.display = 'none';
//Добавляем метку посика для "2часа"
p.parentNode.getElementsByTagName( 'input' )[4].id = 'work_2_hours';


//функция обработки нажатия клавиш в окне ввода цифр
function allow_oly_numb_esc(event)
{
	/*
	8 backsapce
	9 TAB
	27 Esc
	39 стрелка ->
	37 стрелка  <-
	46 delete
	48-57 числа 0-9
	*/
	var kods = [ 8, 9, 27, 39, 37, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
	var is_del=true;
	var kod=event.keyCode;
	//alert(kod);
	//И проверим нажатие Enter
	if(kod==13)
		{
		document.getElementById("work_2_hours").click();	
		}
	//Оставляем Ctrl и Alt
	//чтобы работали вырезать/копировать/вставить
	if (event.ctrlKey || event.altKey )
		return true;
	//Пробегаем по разрешенным знакам
	for( var i=0;i<kods.length;i++)
		if(kods[i]==kod)
			{
			is_del=false;
			break;
			}
	//Смотрим что получилось
	if(is_del)	
		{
		event.stopPropagation();
		event.preventDefault();//запрет на дальнейшее распространение
		return false;//возвращаем false
		}
	return true;

}