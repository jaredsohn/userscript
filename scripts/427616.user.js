// ==UserScript==
// @name	YouTube Comment Quality Improver
// @namespace	subby
// @description	Improves the average quality of YouTube comments
// @include */widget/render/comments?*
// @grant	none
// ==/UserScript==
var words = ['herp', 'derp', 'hurr', 'durr'];
var wlen = words.length;
var comments = document.getElementsByClassName("Ct");
var createClickHandler = function(arg1, arg2) {
  return function() { arg1.innerHTML = arg2;  };
}

for (var i = 0, clen = comments.length; i < clen; i++) {
    var temp = comments[i].innerHTML;
    var commentWords = comments[i].innerHTML.split(" ");
    for (var k = 0, cwlen = commentWords.length; k < cwlen; k++)
        commentWords[k] = words[Math.floor(Math.random()*wlen)];
    comments[i].innerHTML = commentWords.join(" ");
    comments[i].onclick = createClickHandler(comments[i],temp);
}