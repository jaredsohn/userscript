// ==UserScript==
// @name             SMS [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Обновление главной страницы каждые 30 сек. Звуковое оповещение при получении нового письма.
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

// звук файл
var sound_id = 10;

// время обновления в сек
// ВНИМАНИЕ! ставя значение меньше 30 сек вы действуете на свой страх и риск
var timeout = 30;

// максимальное число оповещений
var sms_counter = 100;


var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// куки
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
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
	return(setStr);
}

// раз мы на главной то обновляем с интервалом в 30 сек
if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
    
    root.setInterval(function() { root.location = root.location; }, timeout * 1000);

}

// устанавливем счетчик
if (getCookie('sms_counter') == null) {
    
    setCookie('sms_counter', 0, 0, '/');
    
}

// пришло новое письмо
var img = root.document.getElementsByTagName('img');
for (var i = 0, l = img.length; i < l; i++) {
    
    if (img[i].src == 'http://images.ganjawars.ru/i/sms.gif' && img[i].parentNode.tagName == 'A') {
        
        var new_counter = parseInt(getCookie('sms_counter')) + 1;
        
        setCookie('sms_counter', new_counter, 0, '/');
        
        // если находимся на странице писем обнуляем счетчик
        if (root.document.location.href.indexOf('http://www.ganjawars.ru/sms.php') >= 0) {
            
            setCookie('sms_counter', 0, 0, '/');
            
        }
        
        // меняем титл
        root.document.title = '[ NEW SMS ]' + root.document.title;
        
        if (getCookie('sms_counter') >= 1 && getCookie('sms_counter') <= sms_counter) {
                        
            // создаем контейнер, если еще не создан
            if (root.document.getElementById('flashcontent') == null) {
                
                var div = root.document.createElement('div');
                div.id = 'flashcontent';
                root.document.body.appendChild(div);
                
            }
            
            root.document.getElementById('flashcontent').innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ sound_id +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';
            
        }
        
    }
    
}

})();