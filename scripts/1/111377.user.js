// ==UserScript==
// @name             Regeneration [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Более подробная информация о выздоровлении персонажа.
// @include          http://www.ganjawars.ru/me/*
// @version          1.0
// @author           W_or_M (редакция sp3ctr3)
// ==/UserScript==

(function() {

// НАСТРОЙКИ
//-----------------------------------    
var sound80  = 2;  // звуковое оповещение при 80%, для отключения 0
var sound100 = 1;  // звуковое оповещение при 100%, для отключения 0
var color    = 'blue'; // цвет надписи, формат - #XXXXXX (X - от 0 до F)
//-----------------------------------

var state;

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

function playSound(soundId) {
    
    // создаем контейнер, если еще не создан
    if (root.document.getElementById('flashcontent') == null) {
        
        var div = root.document.createElement('div');
        div.id = 'flashcontent';
        root.document.body.appendChild(div);
        
    }

    root.document.getElementById('flashcontent').innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ soundId +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';
    
}

// установка состояния
function setState(stateId) {
    
    state = stateId;
    setCookie('regen_state', stateId, 0, '/');
    
}

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// мы на главной
if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
    
    // ищем "здоровье"
    var b = root.document.getElementsByTagName('b');
    for (var i = 0, l = b.length; i < l; i++) {
        
        // нашли
        if (b[i].innerHTML == 'Здоровье:' && b[i].parentNode.tagName == 'FONT') {
            
            var node = b[i].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
            
            break;
            
        }
        
    }
    
    
    if (node != 'undefined') {
        
        state = getCookie('regen_state')
        
        // выздоровление
        var p = root.document.createElement('p');
        p.id = 'regen_hp';
        p.style.margin = 0;
        p.style.padding = 0;
        p.style.color = color;
        //p.setAttribute('style', 'margin: 0;padding: 0;color: '+ color +';');
        p.innerHTML = ' &nbsp;» <span style="font-weight: bold">Выздоровление:</span> <span id="regen_hp_percent"></span>';
        node.parentNode.insertBefore(p, node);
        
        var regenHp = root.document.getElementById('regen_hp');
        
        root.hpupdate = function(flag) {
            
            var obj = root.document.getElementById('regen_hp_percent');
            
            // старая функция
            root.hp_current_h = root.hp_current_h + root.hp_speed_h;
            var rnd = root.hp_speed_h > 1 ? 1 : 10;
            if (root.hp_current_h > root.hp_max_h) root.hp_current_h = root.hp_max_h;
            var res = Math.round(root.hp_current_h * rnd) / rnd;
            root.document.getElementById('hpdiv').innerHTML = res;
            
            // текущее хп в процентах
            var hpPercent = (root.hp_current_h / root.hp_max_h) * 100;
            hpPercent = hpPercent >= 100 ? 100 : hpPercent;
            
            obj.innerHTML = Math.floor(hpPercent) +'%';
            
            // время
            if (hpPercent < 80) {
                
                var sec = Math.floor(((root.hp_max_h * 0.8) - root.hp_current_h) / root.hp_speed_h);
                var date = new Date(sec * 1000);
                var split = ':';
                if(date.getSeconds() < 10) split = ':0';
                hpleft = (root.hp_max_h * 0.8 - root.hp_current_h).toFixed(1);
                
                obj.innerHTML += ', <span style="font-weight: bold">'+ ((date.getHours() - 3) > 0 ? date.getHours() - 3 + ':' : '') + date.getMinutes() + split + date.getSeconds()  + '</span> (до 80%)';
                
            }
            
            if (hpPercent < 88) {
                
                var sec = Math.floor(((root.hp_max_h * 0.88) - root.hp_current_h) / root.hp_speed_h);
                var date = new Date(sec * 1000);
                var split = ':';
                if(date.getSeconds() < 10) split = ':0';
                
                obj.innerHTML += ', <span style="font-weight: bold">'+ ((date.getHours() - 3) > 0 ? date.getHours() - 3 + ':' : '') + date.getMinutes() +split+ date.getSeconds()  + '</span> (до 88%)';

                 if(hpPercent < 80)
                                  {
                                  obj.innerHTML += '<br>&nbsp;» ' + hpleft + ' до ' + (root.hp_max_h * 0.8).toFixed(1); 
                                  }
                
            }
            
            if (hpPercent < 88 && hpPercent  >= 80 && (state == 0 || state == null)) {
                
                setState(1);
                
            }
            
            if (hpPercent >= 88 && state == 3) {
                
                setState(2);
                
            }
            
            
            // состояния
            // 0 - пустое
            // 1 - получили 80%
            // 2 - получили 88%
            // 3 - получили 80%, но еще не получили 88%
            // 4 - финиш
            if (state == null && state == 0) {
                
                
                
            } else if (state == 1 && sound80 > 0) {
                
                playSound(sound80);
                setState(3);
                
            } else if (state == 2 && sound100 > 0) {
                
                playSound(sound100);
                setState(4);
                
            } else if (state >= 3 && hpPercent < 88) {
                
                state = hpPercent < 80 ? 0 : 3;
                setState(state);
                
            }
            
            if (!flag) {
                
                root.setTimeout('hpupdate()', 1000);
                
            }
            
        }
        
        root.hpupdate(true);
        
    }
    
}

})();