// ==UserScript==
// @name         grmtotoschedule
// @namespace    
// @description  toto
// @include      http://www.jsgoal.jp/
// ==/UserScript==
(function(){

var element={};
element.menu=document.getElementById('container');
var _btn=document.createElement('div');
_btn.id='grm_schedule';
_btn.style.width='40px';
_btn.style.height='20px';
_btn.style.display='block';
_btn.style.position='absolute';
_btn.style.top='463px';
_btn.style.left='960px';
_btn.style.border='solid 1px #000000';
_btn.style.background='#ffffff';
_btn.style.color='blue'
_btn.style.cursor='pointer';
_btn.appendChild(document.createTextNode('日程▼'));
element.menu.appendChild(_btn);
element.btn=document.getElementById('grm_schedule');

element.btn.addEventListener('click',getSchedule,false);


function getSchedule(){
var req='';
var _team=document.evaluate('//span[@class=\'team\']',document.body,null,7,null);
var _d=document.evaluate('//td[@class=\'date\']',document.body,null,7,null);
var _t=document.evaluate('//td[@class=\'time\']',document.body,null,7,null);
for (var i=0,j=0;i<_team.snapshotLength;i+=2,j++) {
    req+=_d.snapshotItem(j).textContent+' '+_t.snapshotItem(j).textContent+'　'+_team.snapshotItem(i).textContent+' vs '+_team.snapshotItem(i + 1).textContent+"\n";
}
alert(req);
};
})();