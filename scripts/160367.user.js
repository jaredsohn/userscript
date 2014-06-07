// ==UserScript==
// @name           [GW] Sind Online Statement
// @description    Сортировка бойцов синдиката в онлайне по значку, расширенная информация по каждому и сортировка основы по боевому уровню.
// @include        http://www.ganjawars.ru/syndicate.php?id=*&page=online
// @version        1.6
// @author         z0man
// ==/UserScript==

(function() {

var sound_end = 1; // номер звука после сканирования всех бойцов
var color_rent = '#B22222'; // цвет аренды
var color_imen = '#FF9900'; // цвет именных
var time_out = 3001; // интервал в мсек: "скрипты которые показывают какую-то дополнительную информацию и при этом обращаются к серверу реже раза в 3-5 секунд - разрешены."© Ilia Sprite (adm)

var Opera = navigator.appName.indexOf('pera') >= 0;
var request = new XMLHttpRequest();
var answer_page = new String();
var url_pers = '';
var weapons_table = new Array();
var weapons_str = new Array();

// сортировка
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

	// ищем таблицу с онлайном
	var tmp_tr = root.document.getElementsByTagName('tr');
	
	for (i = 0; i < tmp_tr.length; i++) {
		
		// нашли
		if (/(\d+) бойцов онлайн/.test(tmp_tr[i].textContent)) {
			
			var pers_online = /(\d+)/.exec(tmp_tr[i].textContent);
			pers_online = pers_online[1];
			
			// есть бойцы?
			if (pers_online != 0) {
				
				// для %
				var time_all = pers_online * time_out;
				var percent = 0;
				var step = 100/pers_online;
				var percent_int = step;
				
				// критерий сортировки
				var sind_id = /^http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)/.exec(location.href);
				sind_id = sind_id[1];
				var sind_pic = 'http://images.ganjawars.ru/img/synds/' + sind_id + '.gif';
				
				// добавляем 'Сортировка по значку'
				var a = root.document.getElementsByTagName('a');
				for (j = 0; j < a.length; j++) {
					
					if (a[j].textContent == 'Протокол боёв') { var log_wars = a[j] }
					
				}
				
				var sind_state = root.document.createElement('span');
				sind_state.setAttribute('id', 'button_state');
				sind_state.innerHTML = ' | <span style = "cursor: pointer;">Сортировка по значку</span>';
				log_wars.parentNode.insertBefore(sind_state, log_wars.nextSibling);
				
				// вешаем и обрабтываем клик
				root.document.getElementById('button_state').onclick = function() {
					
					// здесь удивил FF
					if (Opera) { tr_first = 1 } else { tr_first = 2 }
					if (Opera) { tr_last = tmp_tr[i].parentNode.childNodes.length } else { tr_last = tmp_tr[i].parentNode.childNodes.length - 1 }
					
					result = sort1();
					
					tmp_tr[i].parentNode.childNodes[0].innerHTML = '<td colspan="5" class="wb" align="center" bgcolor="#d0eed0"><b>' + tmp_tr[i].parentNode.childNodes[0].textContent + '</b>' + ' (' + result + ' co значком)' + '</td>';
					
					sind_state.innerHTML = ' | <span style = "cursor: pointer;">Состояние бойцов</span>';
					sind_state.onclick = function() {
						
						var title_test = title_change();
						if (title_test == undefined) { root.document.title = '0%' }
						
					}
					
				}
				
			}
			
			// нет бойцов
			break;
			
		}
		
	}
	
// состояние бойцов
function info(tr_first) {
	
	url_pers = /info\.php\?id=(\d+)/.exec(tmp_tr[i].parentNode.childNodes[tr_first].innerHTML);
	url_pers = 'http://www.ganjawars.ru/' + url_pers[0];
	
	REQ(url_pers, 'GET', null, false, function (req) { answer_page = req.responseText });
	var span = root.document.createElement('span');
	span.innerHTML = answer_page;
	
	// здоровье
	tmp = span.getElementsByTagName('td');
	for (j = 0; j < tmp.length; j++) {
		
		if (/(\d*)\s\/\s(\d*)/.test(tmp[j].textContent)) {
			
			var re = new RegExp('(\d*)\s\D\s(\d*)', 'ig');
			var res = re.exec(tmp[j].innerHTML);
			var xp = Math.round(RegExp.$1 / RegExp.$2 * 100);
			
			break;
			
		}
		
	}
	
	// боевой уровень
	tmp = span.getElementsByTagName('td');
	for (j = 0; j < tmp.length; j++) {
		
		if (/Боевой:/.test(tmp[j].textContent)) {
			
			var lvl = parseInt(tmp[j+2].textContent);
			
			break;
			
		}
		
	}
	
	// синдикатный уровень
	tmp = span.getElementsByTagName('td');
	for (j = 0; j < tmp.length; j++) {
		
		if (/Основной синдикат:/.test(tmp[j].textContent)) {
			
			var lvl_sind = /\[\s(\d+)\s\(/.exec(tmp[j].textContent);
			lvl_sind = '[' + lvl_sind[1] + ']';
			
			break;
			
		} else { lvl_sind = '' }
		
	}
	
	// район
	tmp = span.getElementsByTagName('b');
	for (j = 0; j < tmp.length; j++) {
		
		if (/Район:/.test(tmp[j].textContent)) {
			
			var sector = '<nobr><a href=' + tmp[j].nextSibling.nextSibling.href + ' style="color: #004400; text-decoration: none;" target="blank">&nbsp;'+tmp[j].nextSibling.nextSibling.textContent+'&nbsp;</a></nobr>';
			
			break;
			
		}
		
	}
	
	// вооружение
	tmp = span.getElementsByTagName('td');
	for (j = 0; j < tmp.length; j++) {
		
		if (/Вооружение/.test(tmp[j].textContent)) {
		
			weapons_table[tr_first] = root.document.createElement('div');
			weapons_table[tr_first].innerHTML = tmp[j+1].innerHTML;
			weapons_table[tr_first].innerHTML = '<table cellspacing="3" cellpadding="5" border="1"><tr><td>' + weapons_table[tr_first].innerHTML + '</td></tr></table>';
			weapons_table[tr_first].style.visibility = 'hidden';
			weapons_table[tr_first].style.top = '0';
			weapons_table[tr_first].style.left = '0';
			weapons_table[tr_first].style.position = 'absolute';
			weapons_table[tr_first].style.zIndex = 1001;
			weapons_table[tr_first].style.padding = '0px';
			weapons_table[tr_first].style.backgroundColor = '#f5fff5';
			
			// совсем голые лесом
			if (weapons_table[tr_first].textContent != 0) {
			
				root.document.body.appendChild(weapons_table[tr_first]);
				tooltip(tr_first);
				
			}
			
			break;
			
		}
		
	}
	
	// именное
	var weapons_l_r = '';
	
	if (Opera) { weapons_str = weapons_table[tr_first].innerHTML.split('<BR>') } else { weapons_str = weapons_table[tr_first].innerHTML.split('<br>') }
	for (q = 0; q < weapons_str.length; q++) {
		
		if (weapons_str[q].indexOf('рука') >= 0) {
			
			var re = new RegExp('<b>(.*)<\/b>', 'i');
			var weapons_l_r_tmp = re.exec(weapons_str[q]);
			weapons_l_r += weapons_l_r_tmp[1];
			
		}
		
	}
	
	var status_new = root.document.createElement('span');
	status_new.innerHTML = '<td width=80%><table border=0 cellPadding=0 cellSpacing=0><tr><td width=30 align=right><nobr>[' + lvl +  ']</nobr></td><td align=right width=35><nobr>' + lvl_sind + '</nobr></td><td align=right width=45 style=color:' + status_color(weapons_l_r) + '><nobr>' + xp + '%</nobr></td><td><nobr>&nbsp;&nbsp;' + sector + '</nobr></td></tr></table></td>';
	tmp_tr[i].parentNode.childNodes[tr_first].childNodes[3].innerHTML = status_new.innerHTML;
	
}

function next_func() {
	
	sind_state.innerHTML = ' | <span style = "cursor: pointer;">Упорядочить основу</span>';
	
	sind_state.onclick = function() {
	
		// сортировка по боевому уровню среди значков
		if (Opera) { tr_first = 1 } else { tr_first = 2 }
		tr_last = tr_first + result;
		for (c1 = tr_first; c1 < tr_last; c1++) {
			
			tmp_c1 = /(\d+)/.exec(tmp_tr[i].parentNode.childNodes[c1].childNodes[3].textContent);
			tmp_c1 = tmp_c1[0];
			
			for (c2 = tr_first; c2 < tr_last; c2++) {
				
				tmp_c2 = /(\d+)/.exec(tmp_tr[i].parentNode.childNodes[c2].childNodes[3].textContent);
				tmp_c2 = tmp_c2[0];
				
				if (tmp_c2 <= tmp_c1) {
					
					tmp_tr[i].parentNode.childNodes[c2].parentNode.insertBefore(tmp_tr[i].parentNode.childNodes[c1], tmp_tr[i].parentNode.childNodes[c2]);
					break;
				
				}
			
			}
		
		}
		
		sind_state.innerHTML = '<span style = "cursor: pointer;"></span>';
		
	}
	
	play_s(sound_end);
	
}

function title_change() {
	
	root.document.title = percent + '%';
	
	if (percent == Math.round(percent_int) && (tr_last - tr_first > 0)) { info(tr_first); percent_int += step; tr_first++; }
	if (percent < 100) { percent++;	setTimeout(function(){title_change()}, time_all/100); }
	else { next_func() }
	
}

function sort1() {

var result = 0;
	
	for (c1 = tr_first; c1 < tr_last; c1++) {
		
		// кол-во со значками в result
		if (tmp_tr[i].parentNode.childNodes[c1].innerHTML.indexOf(sind_pic) != -1) { result++ }
		
		for (c2 = tr_first; c2 < tr_last; c2++) {
			
			if (tmp_tr[i].parentNode.childNodes[c2].innerHTML.indexOf(sind_pic) == -1) {
				
				// обмен
				tmp_tr[i].parentNode.childNodes[c2].parentNode.insertBefore(tmp_tr[i].parentNode.childNodes[c1], tmp_tr[i].parentNode.childNodes[c2]);
				break;
				
			}
			
		}
		
	}

return(result);
	
}

function status_color(weapons_l_r) {

// предположим, что у всех именной ствол длинною с дальность
var result = color_imen;

var guns_rent_all = 'Heavy Minigun,SIG MG-50,Colt M4 Extreme,LR-300 5.56,Blaser Light,Blaser 93,Blaser Tactical';
var guns_rent = guns_rent_all.split(',');

// гос. стволы (182 гос. ствола на 7-летие игры)
var guns_gos_all = 'Авторучка Бонда,Ruger BeerCat 22lr,Пистолет ТТ,Desert Eagle .50,Пистолет 9мм,Schmeisser MKb42,АК-74,M-16,Enfield L1A1,АКС,HK-53,SG 541,XM8,Steyr AUG,TRW LMR,SIG-550,STG-44,M14,SAR-5.56,CZ SA Vz.58,Винтовка G3,FARA 83,G3-AA,Beretta ARX-160,CIS SR-88,FN-FAL,M-82 Valmet,Винтовка FS2000,FN SCAR Mk.16,Bofors AK-5,Bushmaster M17s,HK 417,Vektor R4,L96 A1,Vapensmia 149-F1,CZ 527 Varmint,Винтовка M40,Police Rifle,Mauser M-86,Remington 700 VTR,PSG-1,SSG 550,M-76,СВД,OM50 Nemesis,SSG 2000,B-94,SSG 3000 Black,Falcon,FR-F2,M-24 Light,Savage 10FP,Steyr IWS-2007,Savage 100FP,Tikka T3 Tactical,CZ 700 M1,Bora JNG-90,ПП Узи,Calico M960,LF-57,UMP,GG-95,M-4 Спектр,MAS-38,ПП Каштан,Suomi M-1931,Ingram M6,Colt 633,Walther MPL,FMK-3,ПП Вихрь,S.A.F,Steyr Mpi 81,Agram 2000,ПП-19 Бизон,ПП Кедр,Colt m636,FN-Minimi,Lewis MG,Type 95 MG,Пулемёт FN MAG,Брен L4,LSW L-86,M16A2 Heavy Gun,Пулемёт MG-3,Rising Sun T62,AR70/84 "Beretta",Печенег,M249 SAW,пулемет ZB 53,НСВ,Type 67 HMG,АRM "Галил",SIG MG 710,M-60,Vickers MG Light,VZ-59 Heavy Gun,HK MG-36,M-61 Volcano,AAT m.52,XM-312,MG-45 Sturm,Дробовик Hunter,Remington 870,Nova Tactical,M-37,ТОЗ-194,Jackhammer,SPAS 12,Страйкер,Сайга,Рысь,Neostead,XM-26 LSS,HAWK 97,Benelli M4,Liberator mk3,РПГ,Гранатомёт,GRG-48,PAW-20,РПГ-У,РПГ-16 "Гром",АГС-30,ГМ-94,GL-06 40mm,HK GMG,Рогатка,SAW Airsoft MG,Пейнтбольный маркер,Картофелемёт #2,АН-94,Винтовка F2000,FN FNC,HK416,Гроза-1,KA-90,АБ-762 Тайга,XCR 5.56,ТКБ-517,AK-103,HK G36,HK G41,SG-552 SWAT,Амели,HK-21 Wiper,РПК,ПКМ,Colt M16 LMG,АА-52 Attaque,HK MG-43,ПССГ,FN BRG-17 Spitfire,ПКМС 7,62,MiniGun 7.62,MG-50,Ultimax HMG,Barret M99,BFG-50,Tactical M-600,PGM Mini-Hecate .338,TEI M89-SR,Barrett M107,ВССК "Выхлоп",RT-20 Silent Shot,Barret XM500,Parker-Hale M-85,Steyr Scout Tactical,RPA Rangemaster,MP-5,Beretta M12,Scorpion,Kinetics CPW,P-90,ПП-90М1,HK MP-7,TDI Kriss V2,Mossberg 590,Вепрь-12,MAG-7,USAS-12,USAS-15';
var guns_gos = guns_gos_all.split(',');

	// не именное, мож аренда?
	for (f = 0; f < guns_rent.length; f++) {
		
		if (weapons_l_r.indexOf(guns_rent[f]) >= 0) {
			
			result = color_rent;
			return(result);
		}
		
	}
	
	// мож тогда арт или гос пушка?
	for (f = 0; f < guns_gos.length; f++) {
		
		if (weapons_l_r.indexOf(guns_gos[f]) >= 0) {
			
			result = '#004400';
			return(result);
		}
		
	}
	
	// а может быть корова?
	if (weapons_l_r.length == 0) {
	
		result = '#004400';
		return(result);
	
	}

return(result);

}

function tooltip(tr_first) {

tmp_tr[i].parentNode.childNodes[tr_first].childNodes[1].onmouseover = function(e) { weapons_table[tr_first].style.visibility = 'hidden' }

tmp_tr[i].parentNode.childNodes[tr_first].childNodes[1].onmouseout = function(e) { weapons_table[tr_first].style.visibility = 'hidden' }

tmp_tr[i].parentNode.childNodes[tr_first].childNodes[1].onmousemove = function(e) {

	oCanvas = document.getElementsByTagName((document.compatMode && document.compatMode == "CSS1Compat") ? "HTML" : "BODY")[0];
	x = window.event ? event.clientX + oCanvas.scrollLeft : e.pageX;
	y = window.event ? event.clientY + oCanvas.scrollTop : e.pageY;	
	
	w_width = oCanvas.clientWidth ? oCanvas.clientWidth + oCanvas.scrollLeft : window.innerWidth + window.pageXOffset;
	w_height = window.innerHeight ? window.innerHeight + window.pageYOffset : oCanvas.clientHeight + oCanvas.scrollTop; 
	
	c_height = document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
	
	t_width = weapons_table[tr_first].offsetWidth;
	t_height = weapons_table[tr_first].offsetHeight;
	
	weapons_table[tr_first].style.left = x + "px";
	weapons_table[tr_first].style.top =  y - 10 - t_height + "px";
	
	if (x + t_width > w_width) weapons_table[tr_first].style.left = w_width - t_width + "px";
	if (y - t_height < w_height - c_height) weapons_table[tr_first].style.top = y + 10 + "px";
	if (y - t_height > w_height) weapons_table[tr_first].style.top = w_height - t_height + "px";
	
	weapons_table[tr_first].style.visibility = 'visible';
	
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