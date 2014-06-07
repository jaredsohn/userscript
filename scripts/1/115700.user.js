// ==UserScript==
// @name           DMZO
// @version        1.0
// @namespace      tthacks
// @description    You know how we do
// @homepage       http://facebook.com/DMZOOfficial
// ==/UserScript==

var app, roomObj, controller, old, normalFunctions = ["syncServerClock", "main", "flushUnsentMessages", "setSocketAddr", "socketConnected", "socketKeepAlive", "socketLog", "socketDumpLog", "initIdleChecker", "idleTime", "checkIdle", "socketReconnected", "pingSocket", "closeSocket", "addEventListener", "removeEventListener", "dispatchEvent", "addIdleListener", "removeIdleListener", "setPage", "reloadPage", "initFavorites", "hashMod", "getHashedAddr", "numRecentPendingCalls", "whenSocketConnected", "messageReceived", "logMessage", "randomRoom", "showWelcome", "die", "showAlert", "serverNow", "seedPRNG"];

if(turntable){
[y].blackswan) {
console.log('app: ' + x);
console.log('roomObj: ' + y);
app = x; roomObj = y;
}
}
}
} if(typeof turntable[x] == 'function'){
if (!$(normalFunctions).filter(function(i){return normalFunctions[i] == x;})[0]){
console.log('controller: ' + x);
controller = x;
}

}
}
}
old = turntable[app].removeDj;
turntable[app].removeDj = function(c){
console.log('removed');

z=this;
turntable[controller]({
api:"room.add_dj",roomid:this.roomId}
,function(b){
if(!b.success&&!z.isDj()){
turntable.showAlert(b.err);
}
}
);

var b=$.inArray(c,this.djIds);
if(b==-1){
return;
}
this.djIds.splice(b,1);
this[roomObj].rem_dj(b);
for(;
b<this.djIds.length;
b++){
this[roomObj].rem_dj(b+1);
var e=this.djIds[b];
var d=this.users[e];
this[roomObj].add_dj(d,b);
if(e==this.currentDj){
this[roomObj].set_active_dj(b);
}
else{
this.refreshUserVote(d);
}
}
var a=this.users[c];
if(a){
this[roomObj].add_listener(a,this.getEntropyForUser(a));
this.refreshUserVote(a);
}