// ==UserScript==
// @author          Bedrich Rios
// @website         http://bedrichrios.com
// @name            Taskboy Helper
// @namespace       taskboy_helper
// @include         https://taskman.omniti.com/login
// ==/UserScript==
var s=document.getElementsByTagName('link'),h=document.getElementsByTagName('head')[0],n=document.createElement('link'),i=s.length;while(i--){if(s[i].rel==='stylesheet'){h.removeChild(s[i]);}}
n.rel='stylesheet';n.type='text/css';n.href='http://labs.bedrichrios.com/taskboy/taskboy.css';h.appendChild(n);