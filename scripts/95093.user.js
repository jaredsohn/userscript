// ==UserScript==
// @name           GetBook
// @namespace      books
// @description    append a feature for viewing books information without clicking on link
// @include        http://ebookee.org/*
// ==/UserScript==

// set event onmouseover for all books
var books = document.getElementById('booklist');
books.innerHTML = books.innerHTML.replace(/<li>/g,'<li onmouseover="getBook(this);">');

// create block for viewing information
div = document.createElement('div');
div.setAttribute("style", '-moz-border-radius: 10px;-moz-box-shadow:  0 0 5px #000;');
div.style.right = '10px';
div.style.top = '10px'
div.style.position = 'fixed';
div.style.border = '10px solid #eee';
div.style.background = '#eee';
div.style.width = '460px';

document.body.appendChild(div)

// this function set content for information block
unsafeWindow.showBook = function(url, dsc, li){
    div = document.body.lastChild;
    div.innerHTML = '';
    img = document.createElement('img');
    img.src = url;
    img.setAttribute("style", "float:left; margin:0px 10px 5px 0px; ");
    img.width = 140;
    div.appendChild(img);
    div.innerHTML+=dsc;
}
  
// function will be called as callback for event onmouseover
unsafeWindow.getBook = function(li){ 
    try{
        a = li.children[1];				
        a.title = a.innerHTML;
        ajax = new XMLHttpRequest();
        ajax.open('GET', a.href, false);
        ajax.send(null);
        p = /img src="(http[^"]+(jpeg|jpg|png))"/g;
        p2 = /<([divb]+)\s*(class="center")?>(.+?ISBN.+?)<\/\1>/g;
        txt = ajax.responseText;
        img = p.exec(txt)[1];
        dsc = p2.exec(txt.replace(/[\r\n]/g,''))
        dsc = dsc != null && dsc.length > 0? dsc[dsc.length-1] : 'не удалось получить описание';
        dsc = dsc.replace(/<img[^>]+>/g, '')
        dsc = dsc.replace(/class="\w+"/,'')
        unsafeWindow.showBook(img, dsc, li); 
    } catch(e) {}
}

