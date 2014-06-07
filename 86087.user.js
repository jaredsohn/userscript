// ==UserScript==   
// @name            RoomJoinEnhancement
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Allows you to join any room, full or not; and changes how the number of users is displayed to "#users | #guests"  when #users is turquoise, the room would normally be full
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/86087
// ==/UserScript==  
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname)) {
setTimeout(function() {
javascript:void(window.location.assign("javascript:void(document.observe('holodeck:ready',function(){var p=function(a){a+='';while(a.length<3)a='0'+a;return a},r=function(a,r){return r?a:'<u style=\"color:#099\">'+a+'</u>'},a=ChatRoomGroup.prototype,b=a.setRooms,c=function(a,b){var q=a.registered_user_count,d=a.total_user_count,n=a.name,c=0,i=-1,l=0,m=29; a.total_user_count=d?r(q,a.joinable)+' | '+p(d-q):0;if(n.length>m){c=(n=n.split(/\\s+/g)).length;while(++i<c){l+=(d=n[i]).length;if(l>m){if(i){n[i-1]+='<br>'} if(d.length>m)d=d.replace(/(.{20})(?=.{10})/g,'$1<br>');l=0}--m}a.name=n.join(' ')}a.joinable=!0};a.setRooms=function(a){a.each(c);b.call(this,a)}}))"));
}, 1250);
}