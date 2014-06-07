// ==UserScript==
// @id             PlayAudioFileAtDictionaryArticleLoad
// @name           Play US pronunciation audio file
// @version        1.0
// @namespace      
// @author         php5engineer@gmail.com
// @description    Play US pronunciation audio file every time dictionary article loads
// @include        http://dictionary.cambridge.org/dictionary/*
// @require		   http://code.jquery.com/jquery-1.9.0.min.js
// @run-at         window-load
// ==/UserScript==

$(".pron-us").click()
// alert(document.location.href)