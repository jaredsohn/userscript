// ==UserScript==
// @name			General Rating For Ikariam
// @description		General Rating For Ikariam
// @include			http://s*.ikariam.*/*
// @version 0.4
// @history 0.4 Изменена быстрота появления рейтинга
// @history 0.3 Изменен поиск игрока в топ-листе
// @history 0.2 Добавлена поддержка Unicode в названиях городов
// @history 0.1 Первый выпуск
// ==/UserScript==

var xmlhttp;
var defstring = '0';
var deftown = '0';
var hrefpattern = /http\:\/\/s([0-9]+)\.ikariam\.ru/;
var server = hrefpattern.exec(location.href);
var server = server[1];

function generalpoints() {
	if(document.getElementById('infocontainer')) {
		array = document.getElementById('infocontainer').getElementsByTagName('ul')[0];
		if (array == undefined) {
		setTimeout(generalpoints, 100);
		} else {
		generalpoints2();
		}
	} else {
	}
}
		
function generalpoints2() {
		var pattern1 = /\<li class=\"owner\"\>[\W\w\s]+\<\/span\>([А-Яа-я\w\s\&\;\-\ё\_]+)\<a/;
		var array1 = pattern1.exec(document.getElementById('information').innerHTML);
		if(array1 == undefined) {
		var pattern11 = /\<li class=\"owner\"\>[\W\w\s]+\<\/span\>([А-Яа-я\w\s\&\;\-\ё\_]+)\<\/li\>([\s]+)\<li class=\"name\"/;
		var array11 = pattern11.exec(document.getElementById('information').innerHTML);
		string = array11[1];
		} else {
		string = array1[1];
		}
		string = trim(string);
		string = trim2(string);
		var pattern111 = /\<li class=\"name\"\>[\W\w\s]+\<\/span\>([А-Яа-я\W\w\s\&\;\-\_]+)\<\/li\>([\s]+)\<li class=\"citylevel\"/;
		var array111 = pattern111.exec(document.getElementById('information').innerHTML);
		town = array111[1];
		if ((string == defstring) && (town == deftown)) {
		setTimeout(generalpoints2, 50);	
		} else {
			
			var li = document.createElement('li');
			li.setAttribute("id", "generalrating");
			li.setAttribute("style", "height:12px");
			li.innerHTML = '<span class="textLabel" style="width:80px;float:left;">Генералы:</span><span id="ratingnumber"></span>';
			target = document.getElementById('infocontainer').getElementsByTagName('ul')[0].getElementsByTagName('li')[4];
			document.getElementById('infocontainer').getElementsByTagName('ul')[0].insertBefore(li, target);
			
		generalpoints3();
		}
}
			
function generalpoints3() {
var defstring2 = string;
var deftown2 = town;

GM_xmlhttpRequest({
method: 'POST',
url: 'http://s'+server+'.ikariam.ru/index.php?view=highscore&highscoreType=army_score_main&searchUser='+string,
headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
        			'Cookie': document.cookie,
					},
onload: function(response) {
	if(response.status == 200){
		var pattern2 = /\<td class=\"name\"\>([А-Яа-я\w\s\&\;\-\ё\_]+)\<\/td\>[\s]+\<td class=\"allytag\"\>\<a class=\"allyLink\" href=\"\?view=allyPage\&oldView=highscore\&allyId=[0-9]+\"\>[A-Za-z0-9А-Яа-я\ё\-\<\_]+\/a\>\<\/td\>[\s]+\<td class=\"score\"\>([0-9,]+)\<\/td\>/g;
		while ((array2 = pattern2.exec(response.responseText)) != null) {
			if(array2[1] == string) {

			var rating = array2[2];	
			}
			pattern2.lastIndex;
		}
		if ((string == defstring2) && (town == deftown2)) {

		if(document.getElementById('ratingnumber')) {
		document.getElementById('ratingnumber').innerHTML = rating;
		}
		defstring = string;
		deftown = town;
		}
		setTimeout(generalpoints2, 100);
	}
}
});
}



function trim(string){
return string.replace(/\s+$/, ''); 
}

function trim2(string){
return string.replace(/\&nbsp\;/, ' '); 
}

generalpoints();

// by shotgunx 28.01.10