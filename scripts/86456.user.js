// ==UserScript==
// @name           Gladiatus autoAttacker
// @namespace      http://userscripts.org/users/tiare
// @description    auto-attack gladiatus bot
// @include        http://s*.gladiatus.*/game/*mod=aren*
// @include        http://s*.gladiatus.*/game/*mod=repor*
// @include        http://s*.gladiatus.lt/*     
// ==/UserScript==
// AUTOR           test
// WWW            test
srv = 3;
debugnr = 0;
enemylist = new Array();
enemylist[1] = new Array(thug);
enemylist[2] = new Array(stark);
enemylist[3] = new Array(dainanas);
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



/////////////////////////////////////////////////////////////////////////

srv = 6;	//numer serwera
nr = 0;		//to musi byc 0
enemylist[srv][nr++] = 'nick_1'; //nicki osob z servera 6
enemylist[srv][nr++] = 'nick_2';
enemylist[srv][nr++] = 'nick_3';
enemylist[srv][nr++] = 'nick_4';


srv = 7;	//numer serwera
nr = 0;		// to musi byc 0
enemylist[srv][nr++] = 'nick_1'; //nicki osob z servera 7
enemylist[srv][nr++] = 'nick_2';
enemylist[srv][nr++] = ''; 


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

nr = 0;
srv = 3;

enemylist[srv][nr++] = 'nume jucator';
enemylist[srv][nr++] = 'aaaaaaaaaaa';
enemylist[srv][nr++] = 'bbbbbbbbb';
enemylist[srv][nr++] = 'cccccccccccc';
enemylist[srv][nr++] = '111111111111';
enemylist[srv][nr++] = '22222222';
enemylist[srv][nr++] = '33333333';
enemylist[srv][nr++] = '124454trgfsdac';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////


function getServer(){
	server = window.location.toString();
	server = server.substr(3, 2);
	if(server.indexOf('.') == 1) {
		server = server.substr(0, 1)+'';
	}
	return parseInt(server);
}
function Pirmyn(palauk) {
	document.getElementById('ujn').value = kogo;
	window.location = 'javascript:startFightWithName(thug);';
}
function attack(){
	lastnr = parseInt(GM_getValue("lastnr", "0"));
	if(enemylist[getServer()][lastnr] == undefined || enemylist[getServer()][lastnr] == '' ) {

		lastnr = 0;
	}
	GM_setValue("lastnr", lastnr+1);
	toattack = enemylist[getServer()][lastnr];
	pirmyn(toattack);
}
function wait() {

	lastnr = parseInt(GM_getValue("lastnr", "0"));
	if(enemylist[getServer()][lastnr] == undefined || enemylist[getServer()][lastnr] == '' ) {
		lastnr = 0;
	}
	toattack = enemylist[getServer()][lastnr];
	document.getElementById('ujn').value = 'Vardas: ' + toattack;
}
if(enemylist[getServer()].length != 0 ){
	if(window.location.toString().indexOf('arena') == -1){
		setTimeout(function(){window.location = 'http://s'+getServer()+'.gladiatus.lt/game/index.php?mod=arena';}, 10000);
	}else if(document.body.innerHTML.toString().indexOf('Prosz') != -1 && document.body.innerHTML.toString().indexOf('Laukimas') != -1){

			wait();
	}else{
			attack();
	}
	setTimeout(function(){window.location = window.location;}, 5000);
}

Because it's your web

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
