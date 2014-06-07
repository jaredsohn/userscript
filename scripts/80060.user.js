// ==UserScript==
// @name           起点小说阅读器 qidian book reader
// @namespace      http://www.ouyanghongyu.info
// @include        http://www.qidian.com/BookReader/*,*.aspx*
// @exclude        http://www.qidian.com/BookReader/vip,*,*.aspx*
// @exclude        http://www.qidian.com/BookReader/Vol,*,*.aspx*
// ==/UserScript==

qd_reader_header = document.getElementById('qd_reader_header')
readercontent = document.getElementById('readercontent')
readerheader = document.getElementById('readerheader')
readerfooter = document.getElementById('readerfooter')

qd_reader_header.style.display = 'none';
readercontent.className = 'office_ver'; 
readerheader.className = 'office_ver';
readerfooter.className = 'office_ver';
