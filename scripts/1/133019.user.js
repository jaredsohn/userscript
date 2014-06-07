// ==UserScript==
// @name       DoubanFM It
// @namespace  http://halguo.com/
// @version    0.3
// @description  DoubanFM the album subject
// @match      http://music.douban.com/subject/*
// @copyright  2012+, haochong.guo
// ==/UserScript==

function addJs(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function main() {

    var regex = /[0-9]+/,
    subject = regex.exec(location.href)[0];

    if($('table.olts').length) {
        $('div.aside').prepend('<div class="infobox"><div class="ex1"><span></span></div> <div class="bd"> <style> .start_radio { margin: 0; padding: 0;} .start_radio p { line-height: 2.2em; margin: 0 } </style> <div class="start_radio"> <p> <a target="_fm" href="http://douban.fm/?context=channel:0|subject_id:'+ subject + '">豆瓣FM</a> &nbsp; 正在播放「' + $('h1 span').text() +'」 </p> </div> </div> <div class="ex2"><span></span></div> </div> ');
    }
}

addJs(main);
