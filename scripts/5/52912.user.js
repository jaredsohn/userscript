// ==UserScript==
// @name           AA
// @namespace      AA
// @description    AA
// @include        http://s*.gladiatus.*/game/*od=aren*
// @include        http://s*.gladiatus.*/game/*od=repor*
// ==/UserScript==

debugnr = 0;
enemylist = new Array();
enemylist[1] = new Array();
enemylist[2] = new Array();
enemylist[3] = new Array();
enemylist[4] = new Array();
enemylist[5] = new Array();
enemylist[6] = new Array();
enemylist[7] = new Array();
enemylist[8] = new Array();
enemylist[9] = new Array();
enemylist[10] = new Array();
enemylist[11] = new Array();
enemylist[12] = new Array();
enemylist[13] = new Array();
enemylist[14] = new Array();
enemylist[15] = new Array();
enemylist[16] = new Array();
enemylist[17] = new Array();
enemylist[18] = new Array();

nr = 0;
srv = 1;

//enemylist[srv][nr++] = ''; 
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';

nr = 0;
srv = 2;

//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';

nr = 0;
srv = 3;

//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';

nr = 0;
srv = 4;

//enemylist[srv][nr++] = ''; 
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';

nr = 0;
srv = 5;

//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';
//enemylist[srv][nr++] = '';

function getServer(){
	server = window.location.toString();
	server = server.substr(8, 2);
	if(server.indexOf('.') == 1) {
		server = server.substr(0, 1)+'';
	}
	return parseInt(server);
}
function atakuj(kogo) {
	document.getElementById('ujn').value = kogo;
	window.location = 'javascript:startFightWithName();';
}
function attack(){
	lastnr = parseInt(GM_getValue("lastnr", "0"));
	if(enemylist[getServer()][lastnr] == undefined) {
		lastnr = 0;
	}
	GM_setValue("lastnr", lastnr+1);
	toattack = enemylist[getServer()][lastnr];
	//sendRequest('ajax/doArenaFight.php?dname='+encodeURIComponent(toattack)+'&a='+ new Date().getTime());
	atakuj(toattack);
}
function wait() {
	lastnr = parseInt(GM_getValue("lastnr", "0"));
	if(enemylist[getServer()][lastnr] == undefined) {
		lastnr = 0;
	}
	toattack = enemylist[getServer()][lastnr];
	document.getElementById('ujn').value = 'Czekam, nastepny: ' + toattack;
}

if(window.location.toString().indexOf('arena') == -1){
	setTimeout(function(){window.location = 'http://s'+getServer()+'.gladiatus.onet.pl/game/index.php?mod=arena';}, 30000);
}else if(document.body.innerHTML.toString().indexOf('Prosz') != -1 && document.body.innerHTML.toString().indexOf('czeka') != -1){

		wait();
}else{
		attack();
}
setTimeout(function(){window.location = window.location;}, 30000);