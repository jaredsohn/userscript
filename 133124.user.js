// ==UserScript==
// @name           VKFeedFilter
// @namespace      Vk
// @description    Vk feed music filter
// @include        http://vk.com/feed
// @include        http://vk.com/feed?*
// @include        http://vk.com/feed#
// @grant		   none
// ==/UserScript==
//

//константа в которой мы храним кол-во достаточное для подгрузки песен
var SONG_ON_PAGE = 100;

//проверим что всё окружение подходит для работы с нашим скриптом

//раз мы решили умирать громко как юниксвей нам велит, то при отсутствии
//аудиоплеера умрем с криками отчаяния

if ('undefined' === typeof(console)) {
	console = {};
}

if ('undefined' === typeof(console.log)) {
	console.log = alert;
}

if ('undefined' === typeof(unsafeWindow)) {
	console.log('unsafeWindow undefined!');
}

if ('undefined' === typeof(stManager)) {
	stManager = unsafeWindow.stManager;
}
if ('undefined' === typeof(stManager)) {
	console.log('stManager undefined!');
	return;
}

if ('undefined' === typeof(stManager.add)) {
	console.log('stManager.add undefined!');
	return;
}

if ('undefined' === typeof(XMLHttpRequest)) {
	console.log('XMLHttpRequest is undefined');
	return;
}

if ('undefined' === typeof(XMLHttpRequest.prototype)) {
	console.log('XMLHttpRequest.prototype is undefined');
	return;
}

if ('undefined' === typeof(document)) {
	console.log('document undefined!');
	return;
}

if ('undefined' === typeof(document.getElementsByClassName)) {
	console.log('getElementsByClassName undefined!');
	return;
}

if ('undefined' !== typeof(unsafeWindow.XMLHttpRequest)) {
	XMLHttpRequest = unsafeWindow.XMLHttpRequest;
}

if ('undefined' === typeof(unsafeWindow.XMLHttpRequest)) {
	console.log('XMLHttpRequest undefined');
	return;
}

//итак начнем с того что в новой версии мы должны для начала получить плеер
//допустим мы его получили
stManager.add(['audioplayer.js', 'audioplayer.css'], function() {});

//ставим перехватчик на подгрузку страничек во вконтактике 
//текст честно заимствован с stackoverflow
if(XMLHttpRequest.prototype){
	(function(open) {
		XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
			var r=this;
			this.addEventListener("load", function() {
				intercept(url);
			}, false);
			open.call(this, method, url, async, user, pass);
		};
	})(XMLHttpRequest.prototype.open);	
}


//функция получает на вход ид дивов с музыкой и генерирует из них плейлист после
//чего обновляет его и даёт возможность послушать себя
function main(audio_paragraphs) {

	if ('undefined' === typeof(audioPlayer)) {
		audioPlayer = unsafeWindow.audioPlayer
	}

	if ('undefined' === typeof(audioPlayer)) {
		console.log('audioPlayer undefined');
		return;
	}

	if ('undefined' === typeof(audioPlayer.getSongInfoFromDOM)) {
		console.log('audioPlayer.getSongInfoFromDOM undefined');
		return;
	}

	if ('undefined' === typeof(audioPlayer.genPlaylist)) {
		console.log('audioPlayer.genPlaylist is undefined');
		return;
	}

	if ('undefined' === typeof(audioPlayer.setPadPlaylist)) {
		console.log('audioPlayer.setPadPlaylist is undefined');
		return;
	}

	if ('undefined' === typeof(updGlobalPlayer)) {
		updGlobalPlayer = unsafeWindow.updGlobalPlayer;
	}

	if ('undefined' === typeof(updGlobalPlayer)) {
		console.log('updGlobalPlayer is undefined');
	}

	if (0 === audio_paragraphs.length) {
		console.log('audio_paragraphs is empty!');
		return;
	}

	var audio_ids = [];
	for (var i = 0; i < audio_paragraphs.length; i = i + 1) {
		audio_ids.push(audio_paragraphs[i].id.replace('audio',''));
	}

	//убираем неизвестно откуда взявшийся глобал
	var index_of_global = audio_ids.indexOf('_global');
	if (-1 !== index_of_global) {
		audio_ids.splice(index_of_global, 1);
	}

	if (0 === audio_ids.length) {
		console.log('audio_ids is empty!');
		return;
	}

	//после этого берем и создаем плейлист пропустив каждую песенку через каток для
	//получения дополнительной информации о песни
	var songs = [];
	for (var i = 0; i < audio_ids.length; i = i + 1) {
		songs.push(audioPlayer.getSongInfoFromDOM(audio_ids[i]));
	}

	if (0 === songs.length) {
		console.log('songs is empty!');
		return;
	}

	//добавляем всё в плейлист и делаем его видимым для пользователя
	//нажимаем кнопку запуск

	//встроенная функция контактовского плеера позволяющая сгенерировать из
	//массива объектов песен готовый плейлист, как я подозреваю после этого он
	//помещается в window.audioPlaylist
	//второй аргумент, это насильное копирование в главный плейлист
	//сгенерированного плейлиста
	audioPlayer.genPlaylist(songs, true);

	var playlist = window.audioPlaylist;

	if ('undefined' === typeof(playlist)) {
		playlist = unsafeWindow.audioPlaylist;
	}

	if ('undefined' === typeof(playlist)) {
		console.log('window.audioPlaylist undefined');
		return;
	}

	//встроенная функция контактовского плеера которая автоматом выставляет
	//виндовый плейлист в выпадающий список плеера в аргументах сам плейлист
	audioPlayer.setPadPlaylist(playlist);

	//обновляем глобальный плеер для вывода наших песен и возможности всё это
	//сыграть
	updGlobalPlayer();
}

//функция служит для перехватывания ajax запроса в url передается тот url
//по которому происходил запрос и функция выполняется после загрузки самого
//запроса
function intercept(url) {

	//первое что мы должны сделать собрать песенок на 100 штук, допустим этого будет
	//достаточно на первое время, для этого получаем текущую пачку
	//если её меньше чем надо выводим сообщение о том что подгружаем еще из прошлого

	if (url == '/al_feed.php?queue') {

		if ('undefined' === typeof(feed)) {
			feed = wrappedJSObject.feed;
		}

		if ('undefined' === typeof(feed)) {
			console.log('feed is undefined');
			return;
		}

		if ('undefined' === typeof(feed.showMore)) {
			console.log('feed showMore is undefined');
			return;
		}

		var audio_paragraphs = document.getElementsByClassName('audio');

		if (SONG_ON_PAGE > audio_paragraphs.length) {
			feed.showMore();
		}

	}
	//здесь мы поймали наш запрос на дополнительные посты вызванный из
	//feed.showMore() после этого мы проверяем что мы можем уже создать готовый
	//плейлист и начать его играть
	if (url == '/al_feed.php?sm_news') {
		audio_paragraphs = document.getElementsByClassName('audio');
		if (SONG_ON_PAGE > audio_paragraphs.length) {
			feed.showMore();
			return;
		}
		//запускаем генерацию плейлиста по полученным аудиокускам
		main(audio_paragraphs);
	}
}