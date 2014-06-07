// ==UserScript==
// @name           Facebook Auto-invite
// @description   Invites all friends to a group of fanpage
// @version        1.0
// @author         Udhy Gelo

// ==/UserScript==
//
javascript:elms=document.getElementById('friends').getElementsByTagName('li');for(var fid in elms){if(typeof elms[fid] === 'object'){fs.click(elms[fid]);}}