// ==UserScript==
// @name           Togetter - Who's tweeting?
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @description    add tweeter list.
// @include        http://togetter.com/li/*
// @version        0.4
// @date           2010091220
// ==/UserScript==

// tweeter list
var $ = unsafeWindow.$, obj = {}, df = document.createDocumentFragment();
$('.tweet_box img.twttrimg').each(function() {
  var alt = this.alt;
  obj.hasOwnProperty(alt) ? obj[alt][0]++ : obj[alt] = [1, this.src];
});
for(var name in obj) {
  var img = $('<img>').attr({
    title: name + " (" + obj[name][0] + ")",
    alt: name,
    src: obj[name][1],
  })
  .click(function(){
    scroll(0, $('.tweet_box img.twttrimg[alt="' + this.alt + '"]').position().top - 10);
  }).css({
    width: 48,
    margin: "3px"
  });
  df.appendChild(img[0]);
}
$('#tweet_list_head').css("margin-bottom", 50).append(df);


// tweet counter
document.querySelector('#tweet_list_head h2').textContent += " (" + document.querySelectorAll('.list_item').length + ")";
