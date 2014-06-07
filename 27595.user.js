// ==UserScript==
// @name           li_music_hack
// @version        0.2
// @namespace      li_music_hack
// @description    li_music_hack
// @include        *
// @author         Nexis
// ==/UserScript==

/**
*	Да в коментариях маты. А нехуй читать корявый джавасрипт-код)
*/

var xmlText;
var li_songs = new Array();


var mjupl4li = document.getElementById('mjupl4li');
if(!mjupl4li) return;

//Находим родительский бокс, в который будем заталкивать ссылки
if( mjupl4li ){
	var mju_box = mjupl4li.parentNode;
}

//Особая флешовая магия для выдирания ссылки на плейлист из списков флеш-переменных
if( mjupl4li ){
	var param_flash_variables = document.getElementsByName('flashvars'); //находим тег <param> с именем flashvars
	var flash_variables = param_flash_variables[0].attributes.getNamedItem('value'); //выбираем что нужен нам оттуда только аттрибут value
	
	//alert(param_flash_variables[0].attributes.getNamedItem('value').value); //эта херня чисто отладки

	//есть чо? тогда выдираем оттуда ссылку на плейлист
	if (flash_variables) {
		var flash_values = flash_variables.value;
		if (flash_values) {
			var playlist_match = flash_values.match(/playlist=([^(\&|$)]*)/);
			if (playlist_match!=null) {
				playlist = playlist_match[1];
				//alert(playlist);
			}
      		}
    	}
}

if( playlist && mjupl4li ) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.liveinternet.ru' + playlist,
		headers: {
			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey Nexis',
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		onload: function (responseDetails){
			if(responseDetails.status == 200) //если ответ от сервера положительный, то поехали вперед)
			{
				//Отпидарасим текст, как бе под стандартный XML-ответ, тем самым наебав парсер.
				xmlText = "<?xml version='1.0' standalone='yes'?>\n<songs>\n"+responseDetails.responseText+"</songs>";

				//какая-то мало-понятная ботва, вызывающая стандартный xml-парсер.
				var parser=new DOMParser();
				var xmlDoc=parser.parseFromString(xmlText,"application/xml");

				//Тут мы обращаем внимание на каждую запись о композиции.
				var songs = xmlDoc.getElementsByTagName('song');
				
				//А есть чо? Ну если есть погнали раздербанивать атрибуты тегов на переменные.
				for(var i=0;i<songs.length;i++) {
					var song = songs[i];
					var songArtist = song.getAttribute('artist');
					var songTitle = song.getAttribute('title');
					var songFile = song.getAttribute('file');
					var songSid = song.getAttribute('songid');
					var songJid = song.getAttribute('journalid');

					//создаем подмассив
					li_songs[i] = new Array();
					li_songs[i]['artist'] = songArtist;
					li_songs[i]['title'] = songTitle;
					li_songs[i]['file'] = songFile;
					li_songs[i]['songid'] = songSid;
					li_songs[i]['journalid'] = songJid;
//					alert('#: '+i+'\nArtist: '+songArtist+'\nTitle: '+songTitle+'\nURLele: '+songFile+'\nID: '+songSid+'\nusername: '+songJid);
				}

				mju_box.innerHTML=mju_box.innerHTML+'<br>'; //хуйнём полосочку, чтобы раздельно ссылке от плеера были.
				
				//а теперь сунем все найденные сылке внутрь ДИВа с плеером
				for(var i=0;i<songs.length;i++) {
					mju_box.innerHTML = mju_box.innerHTML +
					"<br><br>"+(i+1)+". <a style='align:left; padding:4px' href="+li_songs[i]['file']+" title="+li_songs[i]['songid']+">"+li_songs[i]['title']+"</a>";
				}
				//Да, блеять, я знаю что можно было все через 1 цикл сделать. Но работает ведь?)
			}
			else
			{	
				alert('Error: \n'+responseDetails.status+'\n'+responseDetails.responseText); //если чо косяк, оно выдаст окошко с косяком.
			}
		}
	});
};