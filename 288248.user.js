// ==UserScript==
// @name        BKRS additional links
// @namespace   amuralex
// @description Добавляет ссылки на другие словари
// @include     http://bkrs.info/slovo.php?ch=*
// @version     1
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// ==/UserScript==

$(function(){
    
    var word_div = $('#ch')
    var word = word_div.text()
    
    if (word.length == 1)
        var include_etim = true
    else
        var include_etim = false
    
    var baidu_url = 'http://baike.baidu.com/search/word?word='+word
    var baidu_link = '<a target="baidu" href="'+baidu_url+'"> B </a><span>'
    var zdict_url = 'http://www.zdic.net/sousuo/?q='+word
    var zdict_link = '<a target="zdict" href="'+zdict_url+'"> Z </a><span>'

    if (include_etim)
    {
        var etim_url = 'http://www.hanziyuan.com/result.php?zi='+word
        var etim_link = '<a target="etim" href="'+etim_url+'"> E </a><span>'
    }
    
    
    var content = '<span style="font-family:Arial; font-size:16px; padding-left:12px">'
    
    content = content + baidu_link
    content = content + zdict_link
    if (include_etim)
        content = content + etim_link
    content = content + '</span>'
    word_div.html(word+content)
});