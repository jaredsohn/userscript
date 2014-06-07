// ==UserScript==
// @name        mitsukerutagrelations
// @namespace      http://d.hatena.ne.jp/kiriano/
// @author         kiriano <kiriano@gmail.com>
// @include     http://mitsukeru.nifty.com/*
// ==/UserScript==

(function(){

  var nowpage=location.href;

  var word2num = nowpage.indexOf('word2_', 0);

  if(-1 < word2num) {
    var htmnum = nowpage.indexOf('/1.htm', 0);
    var word1word = nowpage.substring((word2num+6), htmnum);


    var word1num = nowpage.indexOf('/word1_', 0);
    var termnum = nowpage.indexOf('term_', 0);
//    var termword = nowpage.substring((termnum+5), word1num);
    var termword = nowpage.substring((termnum+5), (termnum+6));

    location.href=("http://mitsukeru.nifty.com/cs/catalog/mitsukeru_word/term_"+termword+"/word1_"+encodeURIComponent(word1word)+"/wshow_all/1.htm");  
  }

})()
