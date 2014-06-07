// ==UserScript==
// @name       交大作业iframe太窄
// @namespace  
// @version    0.1
// @description  
// @match      http://www.onlinesjtu.com/learningspace/hwk/student/mainframe.asp
// @copyright  2013+, You
// ==/UserScript==

document.getElementsByTagName('table')[1].getElementsByTagName('td')[0].height=360;