// ==UserScript==   
// @name            MessageTime
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.0.5
// @description     Displays the time difference between the time the last message and new message was sent in the format [00s] [09m] [05h]
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/74177
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){$('gamepage_header').innerHTML+='<style>.skyStamp{display:block;float:left}</style>';var pad=function(a){a=new String(a);while(a.length<2){a='0'+a}return a},f=Math.floor,q=ChatDialogue.prototype.insert,t=ChatDialogue.prototype.insert=function(e){try{var lastTime=this._message_window_node.lastChild.timeStamp||this._message_window_node.lastChild.previousSibling.timeStamp}catch(e){var lastTime=false};var b,str='<span class=\"skyStamp\">[', curTime = new Date().getTime();try{var a = this._message_window_node.lastChild.lastChild;a.parentNode.timeStamp=curTime;(!lastTime&&(lastTime=curTime));b=f(lastTime=f((curTime-lastTime)/1000))/60;if(b<1)str+=pad(lastTime)+'s';else if(b<60)str+=pad(f(lastTime/60))+'m';else{str+=pad(f(lastTime/3600))+'h'};}catch(e){str+='00s'}var a=new Element('p').insert({bottom:e});(a=a.firstChild).innerHTML=str+']\\xa0</span>'+a.innerHTML;a.timeStamp=curTime;q.call(this,a);}})();void(0)");
}, 1250);