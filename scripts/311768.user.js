// ==UserScript==
// @id             vk.com-7af28330-d5e1-4496-806c-38a99cf0e28d@scriptish
// @name           Переводчик диалогов ВКонтакте 
// @version        1.0
// @namespace      http://userscripts.org/users/Kilowatt
// @author         Kilowatt
// @description    Автоматический перевод входящих и исходящих сообщений на сайте ВКонтакте в разделе "Диалоги". Сервис перевода - Google Translate.
// @grant		GM_xmlhttpRequest
// @include        https://vk.com/im*
// @include        https://vk.com/al_im*
// @include        http://vk.com/im*
// @include        http://vk.com/al_im*
// @match		https://vk.com/im*
// @match		https://vk.com/al_im*
// @match		http://vk.com/im*
// @match		http://vk.com/al_im*
// @run-at         document-end
// ==/UserScript==

var MyLang;
function translateText(phrase, callback, reverse) {
	document.getElementById('GoogleTranslateSelect').style.background = "url(https://vk.com/images/upload.gif)";
	GM_xmlhttpRequest( {
		method: 'GET',
		url: (reverse ? 
			"http://translate.google.ru/translate_a/t?client=t&sl=auto&tl="+MyLang+"&q=" + phrase 
			: "http://translate.google.ru/translate_a/t?client=t&sl="+MyLang+"&tl="+document.getElementById('GoogleTranslateSelect').value+"&q="+phrase
			),
		onload: (function() {
			var _callback = callback;
			return function(data) {
				document.getElementById('GoogleTranslateSelect').style.background = "transparent";
				var response = JSON.parse(data.responseText.replace(/(,)+/g,",").replace(/\[,/g,"["));
				var translationArray = response[0];
				var translationText = "";
				for (var i in translationArray)
					translationText += translationArray[i][0];
				//console.log(translationText);
				_callback(translationText);
			}
		})(),
		onerror: function(e) {
			console.log(e);
		}
	} );
}

function TranslateHandler() {
    if (document.getElementById('GoogleTranslateCheckbox').checked)
		translateText(unsafeWindow.Emoji.editableVal(unsafeWindow.IM.getTxt()), function(response) {
			unsafeWindow.IM.getTxt().innerHTML = response; // TODO: превратить все unicode-смайлики в HTML
			unsafeWindow.IM.send();
		});
	else
		unsafeWindow.IM.send();
}

// вешаем переводчика на ентер в поле ввода
unsafeWindow.removeEvent(unsafeWindow.IM.getTxt(), 'keydown');
unsafeWindow.IM.getTxt().addEventListener("keydown", function(ev){
   if (ev.keyCode == 10 || ev.keyCode == 13 && !(ev.ctrlKey || ev.metaKey && browser.mac)) {
        TranslateHandler();
    }
});

// вешаем переводчика на кнопку "отправить"
document.getElementById('im_send').onclick = function(){
	TranslateHandler();
};

// Обработчик входящего сообщения
unsafeWindow.IM.getTable(unsafeWindow.cur.peer).addEventListener('DOMNodeInserted', function(e){
	if (document.getElementById('GoogleTranslateCheckbox').checked && e.relatedNode.tagName == "TR" && e.relatedNode.className.indexOf('im_in')>-1) {
		var msg_text = e.relatedNode.getElementsByClassName('im_msg_text')[0];
		if (msg_text != undefined) translateText(msg_text.textContent, function(response){
			msg_text.textContent = response;
		}, true);
	}
});

// Построение панельки переводчика (внизу справа)
var GoogleTranslateDiv = document.createElement('div');
GoogleTranslateDiv.style.position = "fixed";
GoogleTranslateDiv.style.bottom = 0;
GoogleTranslateDiv.style.right = 0;
GoogleTranslateDiv.style.background = "white";
GoogleTranslateDiv.style.border = "1px solid blue";
GoogleTranslateDiv.innerHTML = '<select id="GoogleTranslateSelect" style="background: transparent;">'+
	'<option value="af">Afrikaans</option>'+
	'<option value="sq">Albanian</option>'+
	'<option value="ar">Arabic</option>'+
	'<option value="az">Azerbaijani</option>'+
	'<option value="eu">Basque</option>'+
	'<option value="bn">Bengali</option>'+
	'<option value="be">Belarusian</option>'+
	'<option value="bg">Bulgarian</option>'+
	'<option value="ca">Catalan</option>'+
	'<option value="zh-CN">Simpl. Chinese</option>'+
	'<option value="zh-TW">Trad. Chinese</option>'+
	'<option value="hr">Croatian</option>'+
	'<option value="cs">Czech</option>'+
	'<option value="da">Danish</option>'+
	'<option value="nl">Dutch</option>'+
	'<option value="en" selected>English</option>'+
	'<option value="eo">Esperanto</option>'+
	'<option value="et">Estonian</option>'+
	'<option value="tl">Filipino</option>'+
	'<option value="fi">Finnish</option>'+
	'<option value="fr">French</option>'+
	'<option value="gl">Galician</option>'+
	'<option value="ka">Georgian</option>'+
	'<option value="de">German</option>'+
	'<option value="el">Greek</option>'+
	'<option value="gu">Gujarati</option>'+
	'<option value="ht">Сreole Haitian</option>'+
	'<option value="iw">Hebrew</option>'+
	'<option value="hi">Hindi</option>'+
	'<option value="hu">Hungarian</option>'+
	'<option value="is">Icelandic</option>'+
	'<option value="id">Indonesian</option>'+
	'<option value="ga">Irish</option>'+
	'<option value="it">Italian</option>'+
	'<option value="ja">Japanese</option>'+
	'<option value="kn">Kannada</option>'+
	'<option value="ko">Korean</option>'+
	'<option value="la">Latin</option>'+
	'<option value="lv">Latvian</option>'+
	'<option value="lt">Lithuanian</option>'+
	'<option value="mk">Macedonian</option>'+
	'<option value="ms">Malay</option>'+
	'<option value="mt">Maltese</option>'+
	'<option value="no">Norwegian</option>'+
	'<option value="fa">Persian</option>'+
	'<option value="pl">Polish</option>'+
	'<option value="pt">Portuguese</option>'+
	'<option value="ro">Romanian</option>'+
	'<option value="ru">Russian</option>'+
	'<option value="sr">Serbian</option>'+
	'<option value="sk">Slovak</option>'+
	'<option value="sl">Slovenian</option>'+
	'<option value="es">Spanish</option>'+
	'<option value="sw">Swahili</option>'+
	'<option value="sv">Swedish</option>'+
	'<option value="ta">Tamil</option>'+
	'<option value="te">Telugu</option>'+
	'<option value="th">Thai</option>'+
	'<option value="tr">Turkish</option>'+
	'<option value="uk">Ukrainian</option>'+
	'<option value="ur">Urdu</option>'+
	'<option value="vi">Vietnamese</option>'+
	'<option value="cy">Welsh</option>'+
	'<option value="yi">Yiddish</option>'+
'</select><br/>'+
'<input type="checkbox" id="GoogleTranslateCheckbox">Translate</input>';

document.body.appendChild(GoogleTranslateDiv);

// определение моего языка (MyLang)
var VkLanguages = [];
VkLanguages[3] = 'en';
VkLanguages[0] = 'ru';
VkLanguages[1] = 'uk';
VkLanguages[4] = 'es';
VkLanguages[12] = 'pt';
VkLanguages[73] = 'pt';
VkLanguages[6] = 'de';
VkLanguages[16] = 'fr';
VkLanguages[7] = 'it';
VkLanguages[61] = 'nl';
VkLanguages[57] = 'az';
VkLanguages[18] = 'zh-CN';
VkLanguages[80] = 'Монгол'; //???
VkLanguages[15] = 'pl';
VkLanguages[10] = 'Magyar'; //???
VkLanguages[64] = 'da';
VkLanguages[60] = 'sv';
VkLanguages[55] = 'no';
VkLanguages[53] = 'sl';
VkLanguages[71] = 'sk';
VkLanguages[9] = 'hr';
VkLanguages[11] = 'sr';
VkLanguages[72] = 'Bosanski';
VkLanguages[8] = 'bg';
VkLanguages[5] = 'Suomi';
VkLanguages[22] = 'Eesti';
VkLanguages[56] = 'lv';
VkLanguages[19] = 'lt';
VkLanguages[14] = 'el';
VkLanguages[59] = 'Shqip';
VkLanguages[54] = 'ro';
VkLanguages[21] = 'cs';
VkLanguages[17] = '한국어';
VkLanguages[20] = '日本語';
VkLanguages[98] = 'العربية';
VkLanguages[74] = 'فارسی';
VkLanguages[85] = 'اردو';
VkLanguages[90] = 'پنجابی';
VkLanguages[76] = 'हिन्दी';
VkLanguages[83] = 'नेपाली';
VkLanguages[78] = 'বাংলা';
VkLanguages[94] = 'ಕನ್ನಡ';
VkLanguages[77] = 'සිංහල';
VkLanguages[69] = 'id';
VkLanguages[79] = 'te';
VkLanguages[68] = 'ภาษาไทย';
VkLanguages[119] = '臺灣話';
VkLanguages[81] = 'ဗမာစာ';
VkLanguages[75] = 'Tiếng Việt';
VkLanguages[99] = 'עברית';
VkLanguages[95] = 'Kiswahili';
VkLanguages[97] = 'ru';
VkLanguages[87] = 'ru';
VkLanguages[66] = 'Moldovenească';
VkLanguages[114] = 'be';
VkLanguages[2] = 'be';
VkLanguages[82] = 'tr';
VkLanguages[63] = 'ქართული';
VkLanguages[58] = 'Հայերեն';
VkLanguages[65] = 'O‘zbek';
VkLanguages[62] = 'Türkmen';
VkLanguages[70] = 'Тоҷикӣ';
VkLanguages[50] = 'ru';
VkLanguages[91] = 'Ирон';
VkLanguages[102] = 'ru';
VkLanguages[101] = 'ru';
VkLanguages[107] = 'ru';
VkLanguages[108] = 'ru';
VkLanguages[110] = 'ГIалгIай мотт';
VkLanguages[52] = 'ru';
VkLanguages[344] = 'ru';
VkLanguages[555] = 'eo';
for (i in unsafeWindow.StaticFiles)
	if (i.indexOf('lang')==0) MyLang = VkLanguages[i.split('_')[0].split('lang')[1]];