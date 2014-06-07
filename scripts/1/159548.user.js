// ==UserScript==
// @id             www.zaycev.net-2b388b50-b253-4d38-a4b3-3720d119f830@script
// @name           zaycev search sorter
// @version 2.0.2
// @history 2.0.2 Новые пути для ссылок на jquery и тайнисорт.
// @history 2.0.1 Ссылки на jquery и тайнисорт, теперь на гитхабе.
// @history 2.0.0 Новая система версий скрипта, добавил возврат старого поиска, вместо идиотского от mail.ru 
// @history        1.2 Теперь соритровка по дате работает правильно.
// @history        1.1 Добавил работу не только на странице поиска.
// @history        1.0 Релиз сортировщика.
// @namespace      http://userscripts.org/scripts/show/159548
// @author         Black_Sunlight
// @include        http://www.zaycev.net/*
// @include        http://www.zaycev.net/
// @include        http://zaycev.net/*
// @include        http://zaycev.net/
// @require	   https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @require	   https://raw.github.com/Black-Sunlight/lib-files/master/jquery.tinysort.min.js
// @run-at         document-end
// ==/UserScript==
var sort = {
a:{
	Asc:[],
	clicked:0,
	iLnH:'',
	$Tb:$('.audio-track-list>table>tbody'),
	$Td:$('.audio-track-list>table>tbody>tr>td'),
	$The:$('.audio-track-list>table>thead'),
	$Th:$('.audio-track-list>table>thead>tr>th'),
},
begin:function(){
	sort.a.$Tb.css({position:'relative',height:sort.a.$Tb.height(),display:'block'});
	sort.a.$Td.css({minWidth:'60px'});
	$('.audio-track-list>table>tbody>tr>td:first-child').css({minWidth:'535px'});
	sort.a.$The.css({position:'relative',height:sort.a.$The.height(),display:'block'});
	sort.a.$Th.css({minWidth:'60px'});
	$('.audio-track-list>table>thead>tr>th:first-child').css({minWidth:'535px'});	
	$('.audio-track-list>table>tbody>tr').each(function(i,el){
		var iY = $(el).position().top;
		$.data(el,'h',iY);
		if (i===1) iLnH = iY;
	})
	$('.audio-track-list>table>tbody>tr>td').each(function(){
	if($(this).hasClass('date')){var innertext=$(this).text().split('.');
	var abbrtxt=innertext[2]+innertext[1]+innertext[0]}
		$(this).attr('abbr',abbrtxt?abbrtxt:$(this).text())
	})
	$('.audio-track-list>table>thead>tr>th').each(function(i){
	if($(this).hasClass('track'))$(this).text('Наименование')
		/*$(this).append('<span id="what'+i+'" style="font:15px/0.1 Arial"></span>');
		$(this).click(function(){if(sort.a.clicked==0){$('span[id^="what"]').text('');$('#what'+i).text('↑');sort.a.clicked=1} else {$('span[id^="what"]').text('');$('#what'+i).text('↓');sort.a.clicked=0}sort.go(i)})*/
		$(this).click(function(){sort.go(i)})
	})
},
go:function(nr) {
	sort.a.Asc[nr] = sort.a.Asc[nr]=='desc'?'asc':'desc';
	$('.audio-track-list>table>tbody>tr').tsort('td:eq('+nr+')[abbr]',{order:sort.a.Asc[nr],attr:'abbr'}).each(function(i,el){
	var $El = $(el);
	var iFr = $.data(el,'h');
	var iTo = i*iLnH;
	$El.css({position:'absolute',top:iFr}).animate({top:iTo},500);
});
}
}

var search={
query:{ 
params:["place","tag", "order"]
},

back:function(){

var self=this;
var searchbox=document.getElementById('search-form-box').querySelector('form')
searchbox.setAttribute('action','/search.html')
var hinp=searchbox.querySelectorAll('input[type="hidden"]')
searchbox.querySelector('input[name="q"]').setAttribute('name','query_search')
for (var i=0;i<hinp.length;i++){
hinp[i].name=self.query.params[i]
hinp[i].value=''
}
var hi=document.createElement('input')
hi.setAttribute('type','hidden')
hi.setAttribute('name','attempt')
hi.setAttribute('value','1')
self.insertAfter(searchbox, hi,hinp[hinp.length-1])
},
insertAfter:function(parent, node, referenceNode) {
    parent.insertBefore(node, referenceNode.nextSibling);
}

}


$(document).ready(function(){
sort.begin()
search.back()
});