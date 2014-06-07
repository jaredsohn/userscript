// ==UserScript==
// @name           [GW] One2One Wake Up
// @description    Звук, всё вооружение, бонусы, здоровье, фактические умелки вызвавшего на одиночный бой. Opera 10.10 & Firefox 3.0.
// @include        http://www.ganjawars.ru/warlist.php*
// @version        1.4
// @author         z0man
// ==/UserScript==

(function(){

var sound_end = 30; // Номер звука. Чтобы выключить установите в 0
var xp_color = 'firebrick'; // Цвет здоровья и умелок (если виртуальные больше)

var Opera = navigator.appName.indexOf('pera') >= 0;
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
var request = new XMLHttpRequest();
var answer_page = new String();
var url_pers = '';

var a = root.document.getElementsByTagName('a');
for (j = 0; j < a.length; j++) {
	
	if (a[j].href.indexOf('http://www.ganjawars.ru/warlist.php?war=armed&do=5') >= 0) {
		
		// ---------------------- первый бок ----------------
		url_pers = /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(a[j-1].href);
		url_pers = url_pers[0];
		if (url_pers == null) { alert('Обратитесь к разработчику'); break; }
		
		REQ(url_pers, 'GET', null, false, function (req) { answer_page = req.responseText });
		var span = root.document.createElement('span');
		span.innerHTML = answer_page;
		
		// здоровье
		tmp = span.getElementsByTagName('td');
		for (i = 0; i < tmp.length; i++) {
			
			if (/(\d*)\s\/\s(\d*)/.test(tmp[i].textContent)) {
				
				var xp = /(\d*)\s\/\s(\d*)/.exec(tmp[i].textContent);
				xp = xp[0];
				var xp_tag = root.document.createElement('span');
				xp_tag.innerHTML = '<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">&nbsp;[' + xp + ']</font><font  style = "color: #003300; font-weight: normal;"></font>';
				xp_tag.innerHTML = xp_tag.innerHTML.replace(/\s\/\s/g, '/');
				
				break;
				
			}
		
		}
		
		// боевой уровень
		tmp = span.getElementsByTagName('td');
		for (i = 0; i < tmp.length; i++) {
			
			if (/Боевой:/.test(tmp[i].textContent)) {
				var lvl_add = root.document.createElement('span');
				var lvl = parseInt(tmp[i+2].textContent);
				lvl_add.innerHTML = '<font  style = "text-decoration: none; font-weight: normal;">&nbsp;[' + lvl + ']</font>';
				
				break;
				
			}
		
		}
		
		// бонусы
		tmp = span.getElementsByTagName('tr');
		for (i = 0; i < tmp.length; i++) {
		
			if (/Профессионализм/.test(tmp[i].textContent)) {
			
				var bonus = root.document.createElement('span');
				if (Opera) {
					
					bonus.innerHTML = tmp[i].nextSibling.childNodes[1].innerHTML;
					var bonus_tmp = new Array();
					bonus_tmp = bonus.innerHTML.split('<TR>');
					bonus.innerHTML = '';

					for (k = 1; k < bonus_tmp.length; k++) {
						
						bonus_tmp[k] = bonus_tmp[k].substring(0, bonus_tmp[k].length-5);
						bonus.innerHTML += bonus_tmp[k];
						
					}
					
					bonus.innerHTML = '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="font-size: 10px;">' + bonus.innerHTML + '</td></tr></tbody></table>';
					bonus.innerHTML = bonus.innerHTML.replace(/<\/B>/ig, '<\/B> ');
					
				}
				else {
					
					bonus.innerHTML = tmp[i].nextSibling.nextSibling.childNodes[1].nextSibling.nextSibling.innerHTML;
					var bonus_tmp = new Array();
					bonus_tmp = bonus.innerHTML.split('<tr>');
					bonus.innerHTML = '';
					
					for (k = 1; k < bonus_tmp.length; k++) {
						
						bonus_tmp[k] = bonus_tmp[k].substring(0, bonus_tmp[k].length-5);
						bonus.innerHTML += bonus_tmp[k] + ' ';
						
					}
					
					bonus.innerHTML = '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="font-size: 10px;">' + bonus.innerHTML + '</td></tr></tbody></table>';
					
				}
				
				break;
				
			}
			
		}
		
		// вооружение
		tmp = span.getElementsByTagName('td');
		for (i = 0; i < tmp.length; i++) {
			
			if (/Вооружение/.test(tmp[i].textContent)) {
			
				var weapons = root.document.createElement('span');
				weapons.innerHTML = '<br><br>' + tmp[i+1].innerHTML;
				
				break;
				
			}
			
		}
		
		// расчёт умелок
		li = root.document.getElementsByTagName('li');
		for (i = 0; i < li.length; i++) {
			
			// левая
			if (li[i].textContent.indexOf('Левая рука:') >= 0) {
				
				start_u = li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).lastIndexOf('(');
				end_u = li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).length;
				o_u = parseInt(li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).substring(start_u+1, end_u-1));
				v_u = lvl - 18;
				
				s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + v_u + '</font>)';
				
				if (lvl >= 19 && lvl <= 35 && v_u > o_u) {
					var u_u_1 = v_u;
					s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + u_u_1 + '</font>)';
				}
				if (lvl >= 36 && o_u < 18) {
					var u_u_2 = 18;
					s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + u_u_2 + '</font>)';
				}
				
				if (Opera) { weapons.innerHTML = weapons.innerHTML.replace(/Левая рука:.*?<\/B>/g, s_tmp) }
				else { weapons.innerHTML = weapons.innerHTML.replace(/Левая рука:.*?<\/b>/g, s_tmp) }
		
			}
			
			// правая
			if (li[i].textContent.indexOf('Правая рука:') >= 0) {
				
				start_u = li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).lastIndexOf('(');
				end_u = li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).length;
				o_u = parseInt(li[i].innerHTML.substring(0, (li[i].innerHTML.length) - 4).substring(start_u+1, end_u-1));
				v_u = lvl - 18;
				
				s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + v_u + '</font>)'; 
				
				if (lvl >= 19 && lvl <= 35 && v_u > o_u) {
					var u_u_1 = v_u;
					s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + u_u_1 + '</font>)'; 
				}
				if (lvl >= 36 && o_u < 18) {
					
					var u_u_2 = 18;
					s_tmp = li[i].innerHTML.substring(0, start_u-1) + '&nbsp;(<font  style = "color:' + xp_color + '; text-decoration: none; font-weight: normal;">' + u_u_2 + '</font>)';
				}
				
				if (Opera) { weapons.innerHTML = weapons.innerHTML.replace(/Правая рука:.*?<\/B>/g, s_tmp) }
				else { weapons.innerHTML = weapons.innerHTML.replace(/Правая рука:.*?<\/b>/g, s_tmp) }
				
			}
			
		}
		
		if (Opera) { a_tmp = a[j-1].parentNode.parentNode.innerHTML.split('<BR>') }
		else { a_tmp = a[j-1].parentNode.parentNode.innerHTML.split('<br>'); }
		
		a[j-1].parentNode.parentNode.innerHTML = a_tmp[0] + weapons.innerHTML + '<br>' + bonus.innerHTML + '<hr>';
		a[j-1].parentNode.insertBefore(lvl_add, a[j-1].nextSibling);
		a[j-1].parentNode.insertBefore(xp_tag, a[j-1].nextSibling.nextSibling);
		
		play_s(sound_end);
		
		break;
		
	}
	
}

function REQ(url, method, param, async, onsuccess, onfailure) {

	request.open(method, url, async);
	request.send(param);
	
	if (request.readyState == 4 && request.status == 200 && typeof onsuccess != 'undefined') onsuccess(request);
	
	else if (request.readyState == 4 && request.status != 200 && typeof onfailure != 'undefined') onfailure(request);
	
}

function play_s(sound_id) {

    if (root.document.getElementById('flashcontent') == null) {
        
        var div = root.document.createElement('div');
        div.id = 'flashcontent';
        root.document.body.appendChild(div);
        
    }

    root.document.getElementById('flashcontent').innerHTML = '<embed height="1" width="1" flashvars="soundPath=/sounds/'+ sound_id +'.mp3" allowscriptaccess="always" quality="high" bgcolor="#F5fff5" name="gr_server" id="gr_server" src="http://images.ganjawars.ru/i/play.swf" type="application/x-shockwave-flash"/>';
    
}
})();