// ==UserScript==   
// @name            KongDayIcon
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.0
// @description     Displays a special icon by the names of people in chat who have been on kong X years today
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/112361
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
	window.location.assign("javascript:void($$('head')[0].insert('<style>.kongday{width:15px!important;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAAZiS0dEAMsA3QD/z9UrWwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAcVJREFUKM+Vkz9IG1Ecxz93Z7u0DrpIwWS4IVI6NoiLg0sm1wMnKXQMFkoGceng4tJOEnDRwaFIbopL4QYpzSSeQylBEmLSRCHkwERaQkn07tfhvGcOieAPHu/9fu99f9/fv6ednAuRpE2eYVeHjBMrpY9ohiYimlLtauBn8mOxhpMFK6W7dSRtot2D74DGwepYsL+yHzl4DtwiIhNSqMjt9QeRHVf8PzciZU8tpRcqIjtu+K5QERF5qWNXbxTjYhL9ooe1tanY9ItemO7hNkxPYhys4mfyYFf/3hdgMUmQmMLa2sTe+BRzoGyH2wy7v5Rdk0JF/Ewew/0Ir14AECSmFCMA7X64d8NG+Jk8hpNFMRedNSi1oNRC//ozZG73VQRFZ42im6Po5pTPiehQrjV5/fYbAGenx3x+v4K1+wX7XQ5qV8zMJgE4+l5iGTOsB1ZKN5ws63tLnJ0ek5hbYGY2ycBrkJsPGP5w+LcQptC5bLG+t6T6PToxlGtNvF4n1tvfbzxlK9easTs9GruIfeA1HgzHwGs8YI3lHEm306Zz2VJhjkYV5apadXIupE20J8y24dYJ0iZaHHzn4JFfNQn0Adw68h/DIvPdL9odJAAAAABJRU5ErkJggg==)}</style>'))");
	window.location.assign("javascript:void((function(){var p=ChatRoom.prototype,un=p._userNode;p._userNode=function(u){var v=u.variables,t=new Ajax.Request('/accounts/'+v.username+'.chat',{asynchronous:false,method:'get'}).transport.responseText.match(/<li>member since: <span>([^<]+)<\\/span><\\/li>/i),n=new Date().toString().toLowerCase().split(' ');if(t)t=t[1].toLowerCase().split(' ');else t=[0,0,0,0,0,0];if(!t[0].indexOf(n[1]))if(t[1]==n[2])t=parseInt(t[2])-parseInt(n[3]);else t=-1;else t=-1;if(t+1){if(v.special_chat_vars){v.special_chat_vars=v.special_chat_vars.replace(/\"chat_icons\":\\[\\{/,'\"chat_icons\":[{\"slug\":\"kongday\"},{');}if(!/kongday/.test(v.special_chat_vars)){v.special_chat_vars='{\"chat_icons\":[{\"slug\":\"kongday\"}]}';}v=un.apply(this,arguments);t=(t!=1?t+' years':t+' year')+' on Kongregate!';Element.replace($(v).down('.kongday'),'<span class=\"kongday rank_icon\" title=\"'+t+'\">'+t+'</span>');return v;}return un.apply(this,arguments);}})());")
}, 1250);
}