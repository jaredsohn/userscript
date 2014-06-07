// ==UserScript==
// @name        mitsukerutagsearch
// @namespace      http://d.hatena.ne.jp/kiriano/
// @author         kiriano <kiriano@gmail.com>
// @include     http://mitsukeru.nifty.com/*
// ==/UserScript==

(function(){
    var searchStrBuf = '';
    var reArrayTags = function(e){
    var sStr = searchBoxForm.value;
    location.href=("http://mitsukeru.nifty.com/cs/catalog/mitsukeru_word/term_d/word1_"+encodeURIComponent(sStr)+"/1.htm");  
  }

    //main
    var tagListBox = document.getElementById('taglist-box');

    //create Search Box
    var searchBox = document.createElement('div');
    searchBox.id = 'search-box';

    searchBox.style.fontSize = '12px';
    searchBox.style.height = '27px';
    searchBox.style.width = '600px';
    searchBox.style.margin = '0pt';
    searchBox.style.paddingTop = '10px';
    searchBox.style.paddingBottom = '5px';
    searchBox.style.borderLeft = '0px solid #C5C5C5';
    searchBox.style.borderRight = '0px solid #C5C5C5';

    /************************************************************/
    /*	inner parts						*/
    //title
    var title = document.createElement('span');
    title.innerHTML = 'タグを検索';
    title.style.fontSize = '12px';
    title.style.marginLeft = '5px';
    title.style.marginRight = '5px';
    searchBox.insertBefore(title, null);

    //create Search Form
    var searchBoxForm = document.createElement('input');
    searchBoxForm.type = 'text';
    searchBox.insertBefore(searchBoxForm, null);
    searchBoxForm.addEventListener('change', reArrayTags, false);

    //insert searchBox into documentBody
    //tagListBox.insertBefore(searchBox, document.getElementById('taglist'));
    document.getElementById('header').insertBefore(searchBox, null);

})()
