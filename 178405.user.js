// ==UserScript==
// @name       		Leprosorium - Voting for post in My Things Page
// @namespace  		http://uk0.us/
// @version    		0.1
// @description  	Добавляет кнопки голосования за пост "+" и "-" внутрь страницы "мои вещи"
// @match      		http://leprosorium.ru/my
// @match 			http://leprosorium.ru/my/*
// ==/UserScript==

(function(){
    
    var divs 	= document.querySelectorAll('div.vote>div'),
        a 		= document.createElement('div'),
        i		= divs.length,
        div, plus, minus;
    
    a.innerHTML = 	'<a href="" onclick="return votePost(this);" class="plus"><em>+</em></a>' + 
        			'<a href="" onclick="return votePost(this);" class="minus"><em>-</em></a>';
    
    plus 		= a.getElementsByTagName('a')[0];
    minus		= a.getElementsByTagName('a')[1];
    
    while(i--) {
        div = divs[i];
        div.appendChild(plus.cloneNode(true));
        div.appendChild(minus.cloneNode(true));
    }
    
})();