// ==UserScript==
// @name           Український Лепрозорій
// @author         http://leprosorium.ru/users/21007
// @namespace      http://mova.leprosorium.ru/
// @description    Перекладає Лепрозорій на українську мову
// @include        http://mova.leprosorium.ru/*
// ==/UserScript==

	//http://javascript.about.com/library/bldom08.htm
	if (!document.getElementsByClassName){
		document.getElementsByClassName = function(cl) {
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
		}; 
	}
	
	function $defined(obj){
		return (obj != undefined)
	}	
	//-
	function $(id) {
		var obj = window.document.getElementById(id)
		if (obj != undefined) {
			return obj
		} else {
			return false
		}
	}
	function $class(name,base) {
		base = base || document;
		return base.getElementsByClassName(name)
	}
	
	function $classFirst(name,base) {
		var res = $class(name,base)
		if (res[0]){
			return res[0]
		}else {
			return false
		}
	}
	
	$classFirst('sublepro_header_settings_button').innerHTML = 'налаштування та інформація';
	
	for each(hentry in $class('p')) {
		if(hentry.innerHTML.search(/Написала/) == -1) {
			hentry.innerHTML = hentry.innerHTML.replace(/Написал/, "Написав");
		}
		hentry.innerHTML = hentry.innerHTML.replace(/сегодня/, "сьогодні");
		hentry.innerHTML = hentry.innerHTML.replace(/вчера/, "вчора");
		hentry.innerHTML = hentry.innerHTML.replace(/комментариев/, "коментарів");
		hentry.innerHTML = hentry.innerHTML.replace(/комментария/, "коментаря");
		hentry.innerHTML = hentry.innerHTML.replace(/комментировать/, "коментувати");
		hentry.innerHTML = hentry.innerHTML.replace(/комментарий/, "коментарій");
		hentry.innerHTML = hentry.innerHTML.replace(/новых/, "нових");
		hentry.innerHTML = hentry.innerHTML.replace(/в ([0-9])/, "о $1");
		hentry.innerHTML = hentry.innerHTML.replace(/ответить/, "відповісти");
		hentry.innerHTML = hentry.innerHTML.replace(/новый/, "новий");
		hentry.innerHTML = hentry.innerHTML.replace(/в мои вещи/, "до моїх речей");
		hentry.innerHTML = hentry.innerHTML.replace(/в избранное/, "в обране");
	}
	
	greetingsArray = new Array('Слава Україні, $1!','Героям Слава, $1!', 'Україна наша мати — не вкраде, не буде мати, $1!', 'Зїж ще цього смачного сала, та випий пива, $1!', 'Дякуй богу, що ти не москаль, $1!', 'Разом нас багато, нас не подолати, $1!', 'Ще не вмерла Україна, $1!', 'Пий львівське пиво, бо воно є добре, $1');
	$('greetings').innerHTML = $('greetings').innerHTML.replace(/.*(<a href="http:\/\/leprosorium.ru\/users\/[0-9]+">.*<\/a>)[a-zA-ZА-Яа-я\-\.,!?ёЁэЭ]*/i,greetingsArray[Math.floor(Math.random()*greetingsArray.length)]);
	
	$('things').innerHTML = $('things').innerHTML.replace(/(<a href="http:\/\/leprosorium.ru\/my\/"><span><em>)мои вещи ([0-9]*)(<\/em><\/span><\/a>|)/,"$1 мої речі $2$3");
	$('things').innerHTML = $('things').innerHTML.replace(/(<a href="http:\/\/leprosorium.ru\/my\/"><span><em>)мои вещи(<\/em><\/span><\/a>|)/,"$1 мої речі$2");
	$('favorites').innerHTML = $('favorites').innerHTML.replace(/избpанное/,"обране");
	$('stat').innerHTML = $('stat').innerHTML.replace(/(<p><nobr>)Сейчас нас(<\/nobr> <a href="http:\/\/leprosorium.ru\/users\/" class="nobr blue">.+ )человек(<\/a><\/p>)/,"$1 Зараз нас $2 чоловік $3");
	$('parlament').innerHTML = $('parlament').innerHTML.replace(/Правление/,"Верховна Рада");
	$('private').innerHTML = $('private').innerHTML.replace(/<p>Все <a href="\/asylum\/">ждут<\/a> новый пост!<\/p>/,"<p>Всі <a href=\"/asylum/\">чекають</a> нову тему!</p>");
	$('domains_unread').innerHTML = $('domains_unread').innerHTML.replace(/Блоги Империи/,"Блоги Імперії");
	if($defined($('back').innerHTML)) $('back').innerHTML = $('back').innerHTML.replace(/Назад на заглавную/,"Повернутись на головну");
	if($defined($('reply_form_pic_show').innerHTML)) $('reply_form_pic_show').innerHTML = $('reply_form_pic_show').innerHTML.replace(/я, пожалуй, приложу картинку/,"я, мабуть додам зображення");
	if($defined($('reply_form_pic_hide').innerHTML)) $('reply_form_pic_hide').innerHTML = $('reply_form_pic_hide').innerHTML.replace(/впрочем, без картинки тоже ничего/,"взагалі-то, і без зображення нормально");
	if($defined($('reply_link_default').innerHTML)) $('reply_link_default').innerHTML = $('reply_link_default').innerHTML.replace(/Я, пожалуй, напишу комментарий/,"Я, мабуть напишу коментар");
	if($defined($classFirst('category').innerHTML)) {
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/голосов/,"голосів");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/([0-9]+) из ([0-9]+) комментариев/,"$1 з $2 коментарів");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/Вы смотрите комментарии/,"Ви дивитесь комментарі");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/от (.*) и выше/,"від $1 та вище");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/Все комментарии/,"Всі коментарі");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/все/,"всі");
		$classFirst('category').innerHTML = $classFirst('category').innerHTML.replace(/новые/,"нові");
	}
	if($defined($('total_pages').innerHTML)) { 
		$('total_pages').innerHTML = $('total_pages').innerHTML.replace(/страница/,"сторінка");
		$('total_pages').innerHTML = $('total_pages').innerHTML.replace(/страницы/,"сторінки");
		$('total_pages').innerHTML = $('total_pages').innerHTML.replace(/страниц/,"сторінок");
	}
	$classFirst('right').innerHTML = $classFirst('right').innerHTML.replace(/О Лепрозории/,"Про лепрозорій");
	$classFirst('right').innerHTML = $classFirst('right').innerHTML.replace(/Конституция/,"Конституція");
	$classFirst('right').innerHTML = $classFirst('right').innerHTML.replace(/Лепросклад/,"Лепросклад");