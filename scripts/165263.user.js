// ==UserScript==
// @name UzHack
// @description UzHack - решение тренингов uztest.ru
// @author distress147
// @namespace http://uzhack.blogspot.com
// @homepage http://uzhack.blogspot.com
// @icon https://dl.dropboxusercontent.com/u/65727683/favicon.ico
// @license WTFPL2
// @version 2.0
// @include http://uztest.ru/exercise*
// @include http://uztest.ru/exercise
// @updateURL https://dl.dropboxusercontent.com/u/65727683/UPDATE/uzhack.user.js
// @downloadURL https://dl.dropboxusercontent.com/u/65727683/UPDATE/uzhack.user.js
// @run-at document-end
// ==/UserScript==

	var u  = [],tb;
	
	var str = document.images[0].src;
	var sname = str.split('/')[5];
if(str.split('/')[3]=='Data'){
	
    var url = 'https://dl.dropboxusercontent.com/u/65727683/UzHack/' + sname + '.js';
    var html_doc = document.getElementsByTagName('head').item(0);
    js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', url);
    html_doc.appendChild(js);

	
	var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.right = '1%';
	div.style.bottom = '1%';
	div.style.background = 'white';
	div.style.border = ' 3px solid #dddddd';
	div.style.padding = '30px';
    div.name = 'div';
    div.id= 'div';
    div.draggable = true;
	document.body.appendChild(div);
    div.innerHTML = '<center><a href="http://uzhack.blogspot.com" target="_blank" >UzHack</a><br><br>Правильное решение для этой задачи:<br><br><img id=\'imh\'  src="https://dl.dropboxusercontent.com/u/65727683/%27trenings/loading.gif"/></center>';
     
    $.ajax({
    url:'https://dl.dropboxusercontent.com/u/65727683/UzHack/' + sname + '.js',
    type:'HEAD',
    error:
        function(){
        
          
            div.innerHTML = '<center><a href="http://uzhack.blogspot.com" target="_blank" >UzHack</a><br><br>Этого тренинга нет в базе UzHack.</center>';
    
        },
    success:
        function(){
				
        }
});
	
	
}