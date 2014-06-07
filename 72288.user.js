// ==UserScript==
// @name            UserList Scroll Enhancement
// @author          skyboy
// @version         1.0.0
// @description     Prevents the UserList in chat from scrolling from it's current view when users join or leave.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/72288
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
window.location.assign("javascript:(function(){function a(){holodeck.userRowHeight=(function(){var a={innerHTML:''},i = 0;do{(a=$$('.user_row')[i])||alert('Error: Userlist scroll enhancement may not work correctly.');}while((!a.innerHTML.match(new RegExp(holodeck.username())))&&(++i));return(a.clientHeight||20);})();var a=ChatRoom.prototype,x=a.userLeft,z=a.userJoined;a.userLeft = function(b){var a=(function(b,q){return $(q.usernameNodeId(b)).offsetTop - $(q.usernameNodeId(holodeck.username())).offsetTop;})(b.data.user.username,this),c=this._users_in_room_node;if(c.scrollTop>a){c.scrollTop-=holodeck.userRowHeight;}x.apply(this,arguments);};a.userJoined = function(b){z.apply(this,arguments);var a=(function(b,q){return $(q.usernameNodeId(b)).offsetTop - $(q.usernameNodeId(holodeck.username())).offsetTop;})(b.data.user.username,this),c=this._users_in_room_node;if(c.scrollTop>a){c.scrollTop+=holodeck.userRowHeight;}};};if (holodeck.activeDialogue()){a()}else{holodeck.registerKonduitCallback(KonduitEvent.JOIN_ROOM,function(){setTimeout(a, 5000)})}})();void(0);");
}, 5000);