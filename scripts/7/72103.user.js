// ==UserScript==
// @name           Tom's Hardware collapse comments
// @match          http://www.tomshardware.com/reviews/*
// @match          http://www.tomshardware.com/news/*
// @match          http://www.tomshardware.com/picturestory/*
// ==/UserScript==
document.getElementById('commentsBox').parentNode.style.display = 'none';
commenter = document.getElementsByClassName('toolbarNews-comment')[0]
commenter.setAttribute('href','javascript:;');
commenter.setAttribute('onmousedown','if(document.getElementById(\'commentsBox\').parentNode.style.display == \'none\'){document.getElementById(\'commentsBox\').parentNode.style.display = \'block\';}else{document.getElementById(\'commentsBox\').parentNode.style.display = \'none\';}');