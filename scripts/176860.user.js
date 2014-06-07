// ==UserScript== 
// @name        HackForums AutoFont
// @author      Goodies from HackForums - UID=1173142
// @description Made by Goodies. Allows You to Automatically Set a Font, Size, and 'Mini-Sig' For Posts, Replies, PMs, and Threads
// @version     1.0.0
// @license     GPL 3.0
// ==/UserScript== 
//Please Set These Variables:
var myfont="Arial";
var mysize="medium";
var myend="~ HackForums AutoFont Script Made by Goodies";
function setfont(){var base="[font=" + myfont + "][size=" + mysize + "]" + ((myend==="") ? "\n" : "\n\n\n" + myend) + "\n[/size][/font]";var theurl = document.URL;if(theurl.indexOf(".hackforums.net")!==-1){try{document.getElementById("message").value+=base;}catch(e){}try{document.getElementById("message_new").value+=base;}catch(e){}}}setfont();