// ==UserScript==
// @name          Kontakt Music Downloader
// @namespace     http://userscripts.org/scripts/show/37912
// @description   Kontakt Music Downloader and search optimizer. Добавляет кнопку для загрузки отдельного трэка с ВКонтакте и оптимизирует результаты поиска. Также добавляет возможность скачать все несколько трэков одновременно (при поиске музыки). Написал Панасенко Илья, студент ДНУ, группа ПМ-06-1 в рамках курса "Основы Интернет"
// @include       *
// ==/UserScript==


(function() {


function addFunctionDownloadAll() {
	var bd=document.getElementsByTagName('body')[0];
	var func="<script type='text/javascript'>";
	func+="function downloadAll() {";
	func+="var bd=document.getElementsByTagName('body')[0];";
	func+="bd.innerHTML+=\"<iframe id=\'file_download\' width=\'0\' height=\'0\' scrolling=\'no\' frameborder=\'0\' src=\'http://localhost/1.mp3\'></iframe>\";";
	func+="}";
	func+="</script>";
	alert(func);
	bd.innerHTML = func + bd.innerHTML;
}

function AvkFillGroup() {
	alert("fgfdgf");
}


function audio() {
	
	var firstBar="";
	
	var bar = document.getElementById("audioBar");
	var changeSearchResult = true;
	
	var barWall;
	var i=0;
	var delcook=true;
	
	while (barWall = document.getElementsByTagName('table')[i]) {
		if (barWall.className=="wallpost") {
			var imgWall;
			var td;
			var j=0;
			var f=false;
			while (td = barWall.getElementsByTagName('td')[j]) {
				var c=0;
				while (imgWall = td.getElementsByTagName('img')[c]) {
					if (imgWall.className=="playimg") {
						var tdInner = td.getElementsByTagName('td')[0];
						var script = td.innerHTML.split('onclick="')[1].split('"')[0];
						script = script.substring(script.indexOf('(') + 1, script.indexOf(')'));
						
						var params = script.split(',');
						var server = params[1];
						var user = params[2];
						while (user.length < 5) user = '0' + user;
						var fname = params[3];
						fname = fname.substring(1, fname.length - 1); // remove '
			
						fname = 'http://cs' + server + '.vkontakte.ru/u' + user + '/audio/' + fname + '.mp3';
						
						tdInner.style.width = '48px';
						
						tdInner.innerHTML+=
							'&nbsp;<a href= "'+ fname+ '"><img src= "http://vkopt.nm.ru/save2.gif"></a>';
						
						f=true;
						break;
					}
					c++;
				}
				if (f) {
					break;
				} else {
					j++;
				}
			}
		}
		i++;
	}
	
	var showCB=true;
	
	if (bar) {
		bar= document.getElementById("audios");
		firstBar=bar;
		
		changeSearchResult = false;
	} else {
		bar = document.getElementById("audios");
		firstBar=bar;
		if (bar) {
			bar = bar.firstChild;
			showCB=false;
			if (bar) bar = bar.nextSibling; // <div class="bOpen">
			if (bar) bar = bar.nextSibling;
			if (bar) bar = bar.nextSibling; // <div class="c">
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div class="whenOpen">
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div class="fSub clearFix">
			if (bar) bar = bar.nextSibling;
			if (bar) bar = bar.nextSibling; // <div class="flexBox clearFix"
		} else {
			bar = document.getElementById("bigResult");
			firstBar=bar;
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div>
			if (bar) bar = bar.firstChild;
			if (bar) bar = bar.nextSibling; // <div style="padding:20px" >
		}
	}
	
	if (bar) {
		
		
		var row = bar.firstChild;
		
		if (row) row = row.nextSibling;
		
		var songs=new Array();
		var songPaths=new Array();
		
		while (row && (row.className == 'audioRow')) {
			
			var td = row.getElementsByTagName('td')[0];
			
			var nexttd = row.getElementsByTagName('td')[1];
			var b = nexttd.getElementsByTagName('b')[0];
			var span = nexttd.getElementsByTagName('span')[0];
			var duration = row.getElementsByTagName('div')[1];
			
			var song = b.innerHTML + " - " + span.innerHTML + " - " + duration.innerHTML;
			var originalSong = song;
			song = song.split('.').join('').split(' ').join('').split(',').join('').split('(').join('').split(')').join('').split('[').join('').split(']').join('').split(':').join('').split('\'').join('').split('^').join('').toLowerCase();
			var f = true;
			
			for (i=0; i < songs.length; i++) {
				if (song==songs[i]) {
					f=false;
				}
			}
			if (f==true) {
				songs[songs.length]=song;
			
				// Generate URL
				var script = td.innerHTML.split('onclick="')[1].split('"')[0];
				script = script.substring(script.indexOf('(') + 1, script.indexOf(')'));
				var params = script.split(',');
				var server = params[1];
				var user = params[2];
				while (user.length < 5) user = '0' + user;
				var fname = params[3];
				fname = fname.substring(1, fname.length - 1); // remove '
			
				fname = 'http://cs' + server + '.vkontakte.ru/u' + user + '/audio/' + fname + '.mp3';
				songPaths[songPaths.length]=fname;
				
				// Add link
				td.style.width = '70px';
				if (showCB) {
					td.innerHTML = 
						"<input type='checkbox' name='song" + 
						songs.length + "' value='" + "^" + fname + "' checked>" + 
						td.innerHTML;
				}
				td.innerHTML+=
					'<a href= "'+ fname+ '"><img src= "http://vkopt.nm.ru/save2.gif"></a>';
			} else {
				row.innerHTML='';
			}
			row = row.nextSibling;
			if (row) row = row.nextSibling;
			
		}
		
		if (changeSearchResult) {
			var summary = document.getElementById("bigSummary");
			summary = summary.firstChild;
			summary = summary.nextSibling;
			var oldsummary = summary.innerHTML.split(' ')[1];
			summary.innerHTML = 
				"<div class='summary'>Найдено " + 
				oldsummary + 
				" аудиозаписей. После фильтрации на странице показано " + 
				songs.length + 
				' аудиозаписей ' +
				'</div>';
			
			
		}
		
		if (showCB) {
		var searchText=document.getElementById('quickquery');
		firstBar.innerHTML = 
			"<form action='http://science-jokes.110mb.com/vkontakte.php' method='GET'>" + 
				firstBar.innerHTML +
				"<input type='hidden' name='songsCount' value='" + songs.length + "'>" +
				"<input type='hidden' name='searchText' value='" + searchText.value + "'>" +
				"<input type='hidden' name='redirectUrl' value='" + location.href + "'>" +
				"<input type='submit' name='act' value='Скачать выделенное'>" +
			"</form>";
		}
		
	}
	
	
	
}

	var splitter =	location.href.split('/');

	var host =	splitter[2].split('.').reverse()[1];

	var page =	splitter.reverse()[0];
	var video = page.split('video')[1];
	
	
	
	if (host == 'vkontakte' && !video) {
		audio();
	}
	

})();