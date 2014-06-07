// ==UserScript==
// @include			http://dirty.ru/comments*
// @include			http://www.dirty.ru/comments*
// @name OldSchool Dirty.ru
// ==/UserScript==

(function(scriptStorage) {

function $event(el, events) {
	for(var key in events)
		el.addEventListener(key, events[key], false);
}

function doScript() {
document.body.innerHTML=document.body.innerHTML.replace(/shrinked/g,"");
if(location.href.match('sort')) return;

var thread_count=0;
var i;
var list=document.body.getElementsByTagName('div');
for ( i=0;i<list.length;i++)
	if((list[i].className.match(/comment indent_0.*/))) thread_count++;//считаем количество веток

MultiArray = new Array(thread_count);//инициализируем двумерный массив
for (i=0; i<thread_count; i++)
MultiArray[i]=new Array(2);


var i_com=-1;

for ( i=0;i<list.length;i++){
	if((list[i].className.match(/comment indent.*/))){
			if((list[i].className.match(/comment indent_0.*/)))
		{	i_com++;
			MultiArray[i_com][0]=list[i].innerHTML.match(/<\/a>, \d\d\.\d\d\.\d\d\d\d . \d\d\.\d\d\s+/);//тут будет время создания ветки
			MultiArray[i_com][1]='';
		}
		
		MultiArray[i_com][1]+='<div id="'+list[i].id+'"class="'+list[i].className+'">'+list[i].innerHTML+'</div>';
		}
	}
			
MultiArray.sort();
	
var p='';
		for (k=0;k<thread_count;k++)
			p+=MultiArray[k][1];
		document.getElementById("js-commentsHolder").innerHTML=p;
}

if(window.opera) $event(document, {'DOMContentLoaded': doScript});
else doScript();
})(window.opera ? window.opera.scriptStorage : null);