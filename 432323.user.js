// ==UserScript==
// @name           Post Generator
// @description    Generate a post with a given IMDB id
// @version        0.66
// @author         kemege
// @namespace      kemege
// @include        http://pt.vm.fudan.edu.cn/index.php?action=post*
// @icon           http://pt.vm.fudan.edu.cn/favicon.ico
// ==/UserScript==

function defineFunction(func) {
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.appendChild(document.createTextNode(func.toString()));
	document.body.appendChild(script);
}

function defineVariable(variable, value) {
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.appendChild(document.createTextNode('var '+variable+' = '+value+';'));
	document.body.appendChild(script);
}

function translateGenre(genres) {
	genreAll = {
		'action' : '动作',
		'adventure' : '冒险',
		'animation' : '动画',
		'biography' : '传记',
		'comedy' : '喜剧',
		'crime' : '犯罪',
		'documentary' : '纪录片',
		'drama' : '剧情',
		'family' : '家庭',
		'fantasy' : '奇幻',
		'filmnoir' : '黑色电影',
		'history' : '历史',
		'horror' : '恐怖',
		'independent' : '独立电影',
		'music' : '音乐',
		'musical' : '音乐剧',
		'mystery' : '悬疑',
		'romance' : '爱情',
		'sci-fi' : '科幻',
		'short' : '短片',
		'sport' : '运动',
		'thriller' : '惊悚',
		'tvminiseries' : '迷你剧',
		'war' : '战争',
		'western' : '西部',
	};
	genreList = genres.split(', ');
	genreNew = [];
	for (var genre in genreList) {
		if (genreAll[genreList[genre].toLowerCase()]!=undefined) {
			genreNew.push(genreAll[genreList[genre].toLowerCase()]);
		} else {
			genreNew.push(genreList[genre]);
		}
	}
	return genreNew.join('/');
}

function parseTemplate(template) {
	return template.replace(/__(\w+?)__/g, function(match, key) {
		if (dataArray[key]!=undefined) {
			return dataArray[key];
		} else {
			return match;
		};
	});
}

function parseOMDB(data) {
	if (data['Response']=="False") {
		alert('未能从API中获得对应的IMDB条目！');
		return false;
	};
	imdbID = data['imdbID'];
	for (var key in data) {
		dataArray[key.toLowerCase()] = data[key];
	};
	dataArray['genre'] = translateGenre(dataArray['genre']);
	dataArray['time'] = new Date();
	dataArray['today'] = dataArray['time'].getFullYear() + '' + (dataArray['time'].getMonth()<9?'0'+(dataArray['time'].getMonth()+1):dataArray['time'].getMonth()+1) + '' + dataArray['time'].getDate();
	dataArray['year'] = dataArray['year'].slice(0,4); // Only get the first four digits for year
	// try to parse Douban for more information
	if (parseInt(doubanID)>0) {
		var script = document.createElement('script');
		script.setAttribute('src','http://api.douban.com/v2/movie/subject/'+doubanID+'?callback=parseDouban');
		script.setAttribute('type','text/javascript');
		document.body.appendChild(script);
	} else {
		var script = document.createElement('script');
		script.setAttribute('src','http://api.douban.com/v2/movie/search?&count=5&callback=searchDouban&q='+dataArray['title']);
		script.setAttribute('type','text/javascript');
		document.body.appendChild(script);
	};
}

function searchDouban(data) {
	if (data['total']>1) {
		// prompt for selection
		var dialog = document.createElement('div');
		dialog.style = 'display:none;';
		dialog.setAttribute('title', '请选择最匹配的豆瓣条目');
		dialog.id = 'promptDouban';
		document.body.appendChild(dialog);
		dialog.innerHTML = '';
		for (var i in data['subjects']) {
			dialog.innerHTML += '<button class="selectDouban" douban="'+data['subjects'][i]['id']+'">'+data['subjects'][i]['original_title']+'/'+data['subjects'][i]['title']+'</button><br/>';
		};
		dialog.innerHTML += '<button id="skipDouban">不，这些都不匹配</button><br/>';
		dialog.innerHTML = '<center>' + dialog.innerHTML + '</center>';
		$('.selectDouban').button().click(function() {
			// fetch data for selected Douban ID
			var script = document.createElement('script');
			script.setAttribute('src','http://api.douban.com/v2/movie/subject/'+$(this).attr('douban')+'?callback=parseDouban');
			script.setAttribute('type','text/javascript');
			document.body.appendChild(script);
			$('#promptDouban').dialog('close');
		});
		$('#skipDouban').button().click(function() {
			$('#promptDouban').dialog('close');
			fillForm();
		});
		$('#promptDouban').dialog({
			width: 600
		});
	} else if (data['total']>0) {
		var script = document.createElement('script');
		script.setAttribute('src','http://api.douban.com/v2/movie/subject/'+data['subjects'][0]['id']+'?callback=parseDouban');
		script.setAttribute('type','text/javascript');
		document.body.appendChild(script);
	} else {
		fillForm();
	};
}

function parseDouban(data) {
	doubanID = data['id'];
	dataArray['translated_title'] = data['title'];
	dataArray['plot'] = data['summary'];
	dataArray['alias'] = data['aka'].join('/');
	dataArray['country'] = data['countries'].join('/');
	if (data['casts'].length>0) {
		dataArray['actors_list'] = [];
		for (var cast in data['casts']) {
			dataArray['actors_list'].push(data['casts'][cast]['name']);
		}
		dataArray['actors'] = dataArray['actors_list'].join('/');
	};
	if (data['directors'].length>0) {
		dataArray['directors_list'] = [];
		for (var director in data['directors']) {
			dataArray['directors_list'].push(data['directors'][director]['name']);
		}
		dataArray['director'] = dataArray['directors_list'].join('/');
	};
	fillForm();
}

function fillForm() {
	var textTitle = document.querySelector('input.input_text[name=subject]');
	var textMessage = document.querySelector('textarea.editor[name=message]');
	var textIMDB = document.querySelector('input#imdb[name=imdb]');
	var textDouban = document.querySelector('input#douban[name=douban]');

	var templateMessage;
	if ($('input[name="type"]:checked', '#selectType').val()=='movie') {
		// movie template
		templateMessage = '[attachthumb=1]\n◎译　　　名: __translated_title__\n◎片　　　名: __title__\n◎别　　　名: __alias__\n◎年　　　代: __year__\n◎国　　　家: __country__\n◎类　　　别: __genre__\n◎语　　　言: __language__\n◎IMDB　评分: __imdbrating__/10.0 from __imdbvotes__ users (__today__)\n◎IMDB　链接: [url]http://www.imdb.com/title/__imdbid__/[/url]\n◎导　　　演: __director__\n◎主　　　演: __actors__\n\n◎简　　　介:\n　　__plot__';
	} else {
		// drama template
		templateMessage = '[attachthumb=1]\n◎译　　　名: __translated_title__\n◎片　　　名: __title__\n◎别　　　名: __alias__\n◎首　　　播: \n◎国　　　家: __country__\n◎类　　　别: __genre__\n◎语　　　言: __language__\n◎IMDB　评分: __imdbrating__/10.0 from __imdbvotes__ users (__today__)\n◎IMDB　链接: [url]http://www.imdb.com/title/__imdbid__/[/url]\n◎导　　　演: __director__\n◎集　　　数: \n◎电　视　台: \n◎编　　　剧: __writer__\n◎主　　　演: __actors__\n\n◎简　　　介:\n　　__plot__';
	};
	var templateTitle = '__title__ / __translated_title__ (__year__)';
	textTitle.value = parseTemplate(templateTitle);
	if(imdbID != undefined) textIMDB.value = imdbID;
	if(doubanID != undefined) textDouban.value = doubanID;
	textMessage.value = parseTemplate(templateMessage);
	// append IMDB and Douban links for correction
	var IMDBLink = ' IMDB链接 : ' + (imdbID?('<a target="_blank" href="'+'http://www.imdb.com/title/' + imdbID+'">'+'http://www.imdb.com/title/' + imdbID+'</a>'):'无');
	IMDBLink += ' 豆瓣链接 : ' + (doubanID?('<a target="_blank" href="'+'http://movie.douban.com/subject/' + doubanID+'">'+'http://movie.douban.com/subject/' + doubanID+'</a>'):'无');
	$('#generateWithIMDB').html($('#generateWithIMDB').html() + '<br/>' + IMDBLink);
}


// Register some functions and variables in the global scope
defineFunction(parseTemplate);
defineFunction(searchDouban);
defineFunction(parseOMDB);
defineFunction(parseDouban);
defineFunction(fillForm);
defineFunction(translateGenre);
defineVariable('dataArray', '{}');
defineVariable('imdbID', 'undefined');
defineVariable('doubanID', 'undefined');
// Add a textbox and a button for triggering
var description = document.createElement('dt');
description.innerHTML = '根据IMDB ID生成介绍贴';
var form = document.createElement('dd');
form.id = 'generateWithIMDB';
var textbox = document.createElement('input');
textbox.type = 'text';
textbox.setAttribute('placeholder', 'IMDB ID，如tt1234567')
textbox.id = 'textIMDB';
var doubanTextbox = document.createElement('input');
doubanTextbox.type = 'text';
doubanTextbox.setAttribute('placeholder', '豆瓣ID，如1234567')
doubanTextbox.id = 'textDouban';
var select = document.createElement('span');
select.id = 'selectType';
select.innerHTML = '<input type="radio" value="movie" id="movie" name="type" checked="checked"/><label for="movie">电影</label><input type="radio" value="drama" id="drama" name="type"/><label for="drama">美剧</label>';
var buttonGo = document.createElement('input');
buttonGo.type = 'button';
buttonGo.id = 'searchOMDB';
buttonGo.value = '生成';
buttonGo.style = 'margin-left:5px;padding: 3px 5px;';
buttonGo.onclick = function () {
	var textbox = document.querySelector('input#textIMDB');
	var doubanTextbox = document.querySelector('input#textDouban');
	defineVariable('doubanID', "'"+doubanTextbox.value+"'");
	defineVariable('imdbID', "'"+textbox.value+"'");
	imdbID = textbox.value;
	imdbID = /tt\d+/.exec(imdbID) ? /tt\d+/.exec(imdbID) : '';
	var script = document.createElement('script');
	script.setAttribute('src','http://www.omdbapi.com/?plot=full&callback=parseOMDB&i=' + imdbID);
	script.setAttribute('type','text/javascript');
	document.body.appendChild(script);
}
form.appendChild(textbox);
form.appendChild(doubanTextbox);
form.appendChild(select);
form.appendChild(buttonGo);
var messageIcon = document.querySelector('dl#post_header');
messageIcon.appendChild(description);
messageIcon.appendChild(form);
// defineFunction('$(document).ready(function() {$("#selectType").buttonset();$("input#searchOMDB").button()});');