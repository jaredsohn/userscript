// ==UserScript==
// @name       The Powder Toy quotes rewrite
// @namespace  http://github.com/boxmein
// @version    0.1.2
// @description Rewrites the quote function to do an entirely different thing. One needs to select text now! :D
// @match      http://powdertoy.co.uk/*
// @copyright  2013+, boxmein
// ==/UserScript==

/*global jQuery,$,GetQuote,Element */
/*jshint browser:true, multistr:true */ 
var magicaljs = "function getSelectionHtml(){var a='';if('undefined'!=typeof window.getSelection){var c=window.getSelection();if(c.rangeCount){for(var a=document.createElement('div'),b=0,d=c.rangeCount;b<d;++b)a.appendChild(c.getRangeAt(b).cloneContents());a=a.innerHTML}}else'undefined'!=typeof document.selection&&'Text'==document.selection.type&&(a=document.selection.createRange().htmlText);return a} GetQuote=function(a,c,b){$('html, body').animate({scrollTop:$(document).height()},200);$.get('/Discussions/Thread/Post.json?Type=Raw&Post='+a,function(c){1==c.Status?($('#AddReplyMessage.EditPlain').insertAtCaret('@'+b+'!'+a+'\\n<em>&gt;'+getSelectionHtml()+'</em>'),$('#AddReplyMessage.EditWYSIWYG').tinymce().execCommand('mceInsertContent',!1,'@'+b+'<br />\\n<em>&gt;'+getSelectionHtml()+'</em>')):($('#AddReplyMessage.EditPlain').insertAtCaret('@'+b+'!'+a+'\\n<em>&gt;'+getSelectionHtml()+'</em>'),$('#AddReplyMessage.EditWYSIWYG').tinymce().execCommand('mceInsertContent',!1,'@'+b+'!'+a+'<br />\\n<em>&gt;'+getSelectionHtml()+'</em>'))})};";
var js = document.createElement("script");
js.text = magicaljs;
document.body.appendChild(js);