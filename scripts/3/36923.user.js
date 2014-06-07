// LeproSearcher advanced user script
// version 1.4
// Copyright (c) 2008-2009, babka_sotona
// Design by random2
// Released under the GPL license
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LeproSearcher advanced
// @namespace     http://leprosorium.ru/*
// @description   Встраивает Leprosearch в интерфейс Лепры. Простой поиск - добавочная иконка к лепровской строке поиска. Расширенный поиск - дополнительная ссылка под строкой поиска.
// @include       http://*.leprosorium.ru/*
// @include       http://leprosorium.ru/*
// ==/UserScript==

// Find search bar
var search = document.getElementById('search_value'); 

// Create and append search image
var simg = document.createElement('img');
simg.setAttribute('id','leprofind');
simg.setAttribute('src','http://leprosearch.ru/favicon.ico');
simg.setAttribute('align','absmiddle');
search.parentNode.insertBefore(simg, search.nextSibling);

// Find "super poesk" <a> tag
var sstxt = getElementsByClass( "nobr", document, "a");
sstxt = sstxt[1];

// Create and append super leprofind text
var stxt = document.createElement('a');
stxt.setAttribute('id','superleprofind');
stxt.setAttribute('href','#');
//stxt.setAttribute('onclick','showSuperSearch()');
stxt.innerHTML = 'супер лепросерч';
stxt.addEventListener("click", showSuperSearch, false); 
sstxt.parentNode.insertBefore(stxt, sstxt);

// Create and append delimitter
var brtxt = document.createElement('span');
brtxt.innerHTML = ' | ';
sstxt.parentNode.insertBefore(brtxt, sstxt);

// Add event listener to search field
document.getElementById('search_value').addEventListener('focus', checkLs, false);

function leprocloser(){
	var d = document.body;
	var olddiv = document.getElementById('searchRes');
	d.removeChild(olddiv);
}
embedFunction(leprocloser);

function checkLs(){
	var url = 'http://leprosearch.ru/';
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) { 
			if(response.status == 200){		
				if(response.responseText.search("не так просто")>0){
					// If user is not logged on
					// set icon opacity 50%
					document.getElementById('leprofind').setAttribute('style', 'opacity:.5');
					// remove icon search event listeners
					document.getElementById('leprofind').removeEventListener('click', leprofinder, true);
					document.getElementById('leprofind').removeEventListener('click', leproweb, true);
					// add notify event listener
					document.getElementById('leprofind').addEventListener('click', leproreg, true);
					// Remove event listener for superleprofind text and href attribute
					document.getElementById('superleprofind').setAttribute('onclick','');
				}else{
					// If user is loggen on
					// set icon opacity 100%
					document.getElementById('leprofind').setAttribute('style', 'opacity:1');
					// remove icon notifier event listener
					document.getElementById('leprofind').removeEventListener('click', leproreg, true);
					document.getElementById('leprofind').removeEventListener('click', leproweb, true);
					// add icon search event listener
					document.getElementById('leprofind').addEventListener('click', leprofinder, true);
					// add text event listener and href attribute
					document.getElementById('superleprofind').setAttribute('onclick','showSuperSearch()');
				}
			}else{
				//alert("Не удалось соединиться с лепросерчем. Попробуйте еще раз?");
				document.getElementById('leprofind').setAttribute('style', 'opacity:.5');
				
				document.getElementById('leprofind').removeEventListener('click', leprofinder, true);
				document.getElementById('leprofind').removeEventListener('click', leproreg, true);
				
				document.getElementById('leprofind').addEventListener('click', leproweb, true);
			}
		}
	});
};

// notify about login/reg
function leproreg(){
	alert("Вы не залогинены или не зарегистрированны на лепросерче! Я отказываюсь так работать.");
}

// notify about web problems
function leproweb(){
	alert("Не удалось соединиться с лепросерчем. Попробуйте еще раз?");
}

// do simple search
function leprofinder() {
	var sres = document.getElementById('searchRes');
	if(sres){ leprocloser(); };

	var searchVal = document.getElementById('search_value').value; 
	var url = 'http://leprosearch.ru/index.php?query='+searchVal; 
	
	var cldiv = document.createElement('div');
	cldiv.setAttribute('id','loadRes');
	cldiv.setAttribute('style','position: absolute; width: 50px; height: 50px; left: 500px; top: 100px; border: 1px solid #000; padding: 10px; background-color: #fff; z-index:100');
	cldiv.innerHTML = '<span style="float: left;"><img src="http://codezen.ru/playground/panda.gif"></span>';
	document.body.appendChild(cldiv);
	
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) { parseFind(response); }
	});
}

// do advanced search
function adv_leprofinder() {
	// search query
	var searchVal = document.getElementById("super_query").value;
	// if precise search is on
	searchVal += "&precise=" + document.getElementById("super_precise").checked == true?'on':''; 
	// search by author
	searchVal += "&author=" + document.getElementById("super_author").value;
	// id range
	searchVal += "&imin=" + document.getElementById("super_imin").value;
	searchVal += "&imax=" + document.getElementById("super_imax").value;
	// which posts to search
	var wh = document.getElementById("super_which_all").checked == true?'':document.getElementById("super_which_gold").checked == true?'gold':document.getElementById("super_which_normal").checked == true?'normal':'';
	searchVal += "&which=" + wh;
	// rating range
	searchVal += "&rmin=" + document.getElementById("super_rmin").value;
	searchVal += "&rmax=" + document.getElementById("super_rmax").value;
	// comments count range
	searchVal +="&cmin=" + document.getElementById("super_cmin").value;
	searchVal +="&cmax=" + document.getElementById("super_cmax").value;
	// date range
	searchVal +="&dmin=" + document.getElementById("super_dmin").value;
	searchVal +="&dmax=" + document.getElementById("super_dmax").value;
	// day of week
	var day = document.getElementById("super_day_all").checked == true?'':document.getElementById("super_day_1").checked == true?'1':document.getElementById("super_day_2").checked == true?'2':document.getElementById("super_day_3").checked == true?'3':document.getElementById("super_day_4").checked == true?'4':document.getElementById("super_day_5").checked == true?'5':document.getElementById("super_day_6").checked == true?'6':document.getElementById("super_day_7").checked == true?'7':'';
	searchVal +="&day=" + day;
	// if there was image
	searchVal +="&was_img=" + ( document.getElementById("super_was_img").checked == true?'on':'' );
	// if there was lj link
	searchVal +="&was_lj=" + ( document.getElementById("super_was_lj").checked == true?'on':'' );
	// if there was youtube link
	searchVal +="&was_yt=" + ( document.getElementById("super_was_yt").checked == true?'on':'' );
	// if there was profile link
	searchVal +="&was_pro=" + ( document.getElementById("super_was_pro").checked == true?'on':'' );
	// if there was gray stuff
	searchVal +="&was_gray=" + ( document.getElementById("super_was_gray").checked == true?'on':'' );
	// if there was post link
	searchVal +="&was_post=" + ( document.getElementById("super_was_post").checked == true?'on':'' );
	// if there was blue stuff
	searchVal +="&was_blue=" + ( document.getElementById("super_was_blue").checked == true?'on':'' );
	// where to search 
	var sites = document.getElementById("super_sites_all").checked == true?'all':document.getElementById("super_sites_main").checked == true?'main':document.getElementById("super_sites_subs").checked == true?'subs':'';
	searchVal +="&sites=" + sites;
	// omgwtf from n1313
	searchVal +="&a=b";
	
	var url = 'http://leprosearch.ru/index.php?query='+searchVal; 
	// alert(url);
	
	var sres = document.getElementById('searchRes');
	if(sres){ leprocloser(); };
	
	var cldiv = document.createElement('div');
	cldiv.setAttribute('id','loadRes');
	cldiv.setAttribute('style','position: absolute; width: 50px; height: 50px; left: 500px; top: 100px; border: 1px solid #000; padding: 10px; background-color: #fff; z-index:100');
	cldiv.innerHTML = '<span style="float: left;"><img src="http://codezen.ru/playground/panda.gif"></span>';
	document.body.appendChild(cldiv);
	
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) { parseFind(response); }
	});
}

function parseFind(response) {
	// Clean loader
	var d = document.body;
	var olddiv = document.getElementById('loadRes');
	d.removeChild(olddiv);
	
	// Clean old search div
	var d = document.body;
	var olddiv = document.getElementById('searchRes');
	if (olddiv) d.removeChild(olddiv);
	
	if(response.status == 200){		
		var responseText = response.responseText;
		responseText = responseText.replace(/\n/g, "");
		responseText = responseText.replace(/\r/g, "");
		responseText = responseText.replace(/wasstars/g, "");
		//alert (responseText);
		var r = new RegExp(/<ol.*?>(.*?)<\/ol>/g);
		var res = r.exec(responseText);
		if(res != null){	
			var res = res[0].replace(/<\/p>\s+\t+<p class="s">/g, "<br/>");
			var maindiv = document.createElement('div');
			maindiv.setAttribute('id','searchRes');
			maindiv.setAttribute('style','border: 0px none; padding: 0px; overflow: none; position: absolute; width: 60%; height: 80%; left: 250px; z-index: 1497; top: 100px; background-color: lightgray;');
				//'<h1>result div</h1>';
			document.body.appendChild(maindiv);
		
			var newdiv = document.createElement('div');
			newdiv.setAttribute('id','searchResSub');
			newdiv.setAttribute('style','border: 0px none; padding: 10px; overflow: auto; position: absolute; font-size: 70%; width: 100%; height: 100%; left: 0px; z-index: 1498; top: 0px; background-color: lightgray;');
			newdiv.innerHTML = res;
				//'<h1>result div</h1>';
			document.getElementById('searchRes').appendChild(newdiv);
	
			var cldiv = document.createElement('div');
			cldiv.setAttribute('id','closeRes');
			cldiv.setAttribute('style','position: absolute; width: 100%; align: right; top: 0px; right:0px; text-align: right; z-index: 1500;');
			cldiv.innerHTML = '<div style="border: 0px none;" id="closeRes"><small><a href="#" onclick="leprocloser(); return false" style="text-decoration: none;">[x]</a></small></div>';
			document.getElementById('searchRes').appendChild(cldiv);
		}else{
			if(responseText.search("не найдено")<0)
				alert("Возможно вы незалогинены?");
			else
				alert("Ничего не найдено!");
		}	
	}else{
		alert("Не удалось соединиться с лепросерчем. Попробуйте еще раз?");
	}
};

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

/**
 * SuperSearch function
 **/

function showSuperSearch (){
	// Clean old search div
	var d = document.body;
	var olddiv = document.getElementById('searchRes');
	if (olddiv) d.removeChild(olddiv);

	// Create main div
	var maindiv = document.createElement('div');
	maindiv.setAttribute('id','searchRes');
	maindiv.setAttribute('style','border: 0px none; padding: 0px; overflow: none; position: absolute; width: 60%; height: 80%; left: 250px; z-index: 1497; top: 100px; background-color: lightgray;');
	document.body.appendChild(maindiv);
	
	// Create new search content div
	var newdiv = document.createElement('div');
	newdiv.setAttribute('id','searchResSub');
	newdiv.setAttribute('style','border: 0px none; padding: 10px; overflow: auto; position: absolute; font-size: 70%; width: 100%; height: 100%; left: 0px; z-index: 1498; top: 0px; background-color: lightgray;');
	// --------------------------------------------------------
	newdiv.innerHTML = '<table><tr><td>Поисковый запрос</td><td><input id="super_query" size="60" type="text" /></td></tr><tr><td>Поиск точного совпадения</td><td><label><input type="checkbox" id="super_precise" />Да</label></td></tr></table>';
	
	newdiv.innerHTML += '<br/>';
	
	newdiv.innerHTML += '<table><tr><td>Юзернейм автора</td><td><input id="super_author" size="30" type="text" /></td></tr><tr><td>Порядковый номер автора</td><td><table><tr><td>От</td><td><input type="text" id="super_imin" size="5"/></td><td>до</td><td><input type="text" id="super_imax" size="5"/></td></tr></table></td></tr></table>';
	
	newdiv.innerHTML += '<br/>';
	
	newdiv.innerHTML += '<table><tr><td>Статус постов</td><td><input type="radio" name="which" id="super_which_all" value="" checked="checked" />все подряд<input type="radio" name="which" id="super_which_gold" value="gold" />только золотые и "серебряные" посты<input name="which" type="radio" id="super_which_normal" value="normal" />только простые (не золотые) посты</td></tr><tr><td>Рейтинг постов</td><td><table><tr><td>От</td><td><input type="text" name="rmin" size="5" id="super_rmin"/></td><td>до</td><td><input type="text" name="rmax" size="5" id="super_rmax"/></td></tr></table></td></tr><tr><td>Количество комментариев</td><td><table><tr><td>От</td><td><input type="text" name="cmin" size="5" id="super_cmin"/></td><td>до</td><td><input type="text" name="cmax" size="5" id="super_cmax"/></td></tr></table></td></tr><tr><td>Дата написания</td><td><table><tr><td>От</td><td><input type="text" name="dmin" size="10" id="super_dmin"/></td><td>до</td><td><input type="text" name="dmax" size="10" id="super_dmax"/></td></tr></table></td></tr><tr><td>День написания</td><td><label><input type="radio" id="super_day_all" name="day" value="" checked="checked"/> Любой</label><p>или только</p><input type="radio" id="super_day_1" name="day" value="1"/> Пн<input type="radio" name="day" id="super_day_2" value="2"/> Вт<input type="radio" name="day" id="super_day_3" value="3"/> Ср<input type="radio" name="day" id="super_day_4" value="4"/> Чт<input type="radio" name="day" id="super_day_5" value="5"/> Пт<input type="radio" name="day" id="super_day_6" value="6"/> Сб<input type="radio" name="day" id="super_day_7" value="7"/> Вс</td></tr></table>';
	
	newdiv.innerHTML += '<br/>';
	
	newdiv.innerHTML += '<table><tr><td>Странные подробности</td><td><p>Там точно была...</p><table><tr><td><input type="checkbox" name="was_img" id="super_was_img" /> какая-то картинка!</td><td><input type="checkbox" id="super_was_lj" /> упоминание ЖЖ, господи прости!</td></tr><tr><td><input type="checkbox" id="super_was_yt" /> ролик с ютуба!</td><td><input type="checkbox" id="super_was_pro" /> ссылка на чей-то профиль!</td></tr><tr><td><input type="checkbox" id="super_was_gray" /> серая фигня!</td><td><input type="checkbox" id="super_was_post" /> ссылка на какой-то пост!</td></tr><tr><td><input type="checkbox" id="super_was_blue" /> синяя фигня!</td></tr></table></td></tr></table>';
	
	newdiv.innerHTML += '<br/>';
	
	newdiv.innerHTML += '<table><tr><td>Область поиска</td><td><input type="radio" name="sites" value="all" checked="checked" id="super_sites_all" /> Везде <input type="radio" name="sites" id="super_sites_main" value="main"/> Только Большой Лепрозорий <input type="radio" name="sites" id="super_sites_subs" value="subs"/> Только подлепры</td></tr></table>';
	
	newdiv.innerHTML += '<br/><input id="doSuperSearch" value=" &nbsp; Yarrr! &nbsp; " type="submit" />';
	
	//---------------------------------------------------------------
	document.getElementById('searchRes').appendChild(newdiv);
	
	// Create close div
	var cldiv = document.createElement('div');
	cldiv.setAttribute('id','closeRes');
	cldiv.setAttribute('style','position: absolute; width: 100%; align: right; top: 0px; right:0px; text-align: right; z-index: 1500;');
	cldiv.innerHTML = '<div style="border: 0px none;" id="closeRes"><small><a href="#" onclick="leprocloser(); return false" style="text-decoration: none;">[x]</a></small></div>';
	document.getElementById('searchRes').appendChild(cldiv);
	
	// hijack click function
	var button = document.getElementById("doSuperSearch");
	button.addEventListener("click", adv_leprofinder, false); 
}
//embedFunction(showSuperSearch);

/** 
 * Misc functions
 **/
function getElementsByClass( searchClass, domNode, tagName) {
	if (domNode == null) domNode = document;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}