// ==UserScript==
// @name           Gladiatus autoAttacker
// @namespace      http://userscripts.org/users/sebi99
// @description    Bot atakuje liste graczy tak czsto jak to tylko moliwe.
// @include        http://s*.gladiatus.*/game/*od=aren*
// @include        http://s*.gladiatus.*/game/*od=repor*
// ==/UserScript==
// AUTOR           sebi99
// WWW             http://sebi99.pl/ <- nic ciekawego, strona do testow
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



/* JAK USTAWIAC LISTE ATAKOWANYCH:
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
*/

/////////////////////////////////////////////////////////////////////////
//// TO NA DOLE WOLNO EDYTOWAC //// A NAWET TRZEBA //////////////////////
/////////////////////////////////////////////////////////////////////////

nr = 0;
srv = 1;

enemylist[srv][nr++] = 'nick1';
srv = 2;

enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';

nr = 0;
srv = 3;

enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';

nr = 0;
srv = 4;

enemylist[srv][nr++] = 'Mordek13';
enemylist[srv][nr++] = 'jerryy6767';
enemylist[srv][nr++] = 'Jaanuszak2 ';
enemylist[srv][nr++] = 'Art_T';
enemylist[srv][nr++] = 'SpartakusZkrwi';
enemylist[srv][nr++] = 'taygericzka';
enemylist[srv][nr++] = 'pabian';
enemylist[srv][nr++] = 'Shrek';
enemylist[srv][nr++] = 'FanatykStomilu';
enemylist[srv][nr++] = 'cwks';
enemylist[srv][nr++] = 'goferos';
enemylist[srv][nr++] = 'Makiraki';
enemylist[srv][nr++] = 'yakuza1117';
enemylist[srv][nr++] = '@Radek@';
enemylist[srv][nr++] = 'yanik38';
enemylist[srv][nr++] = '!Domel1990';
enemylist[srv][nr++] = 'keri';
enemylist[srv][nr++] = 'Michalldo';
enemylist[srv][nr++] = 'Amonefusz';
enemylist[srv][nr++] = 'masimomakarone';


nr = 0;
srv = 5;

enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';
enemylist[srv][nr++] = '';

nr = 0;
srv = 6;

enemylist[srv][nr++] = 'nick z serva 6';


nr = 0;
srv = 17;

enemylist[srv][nr++] = 'piotrek100';
enemylist[srv][nr++] = 'no5scir3';
enemylist[srv][nr++] = 'insane';
enemylist[srv][nr++] = 'anichlator';
enemylist[srv][nr++] = 'witek';

//////////////////////////////////////////////////////
////// TEGO NA DOLE NIE WOLNO EDYTOWAC ///////////////
//////////////////////////////////////////////////////


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
	if(enemylist[getServer()][lastnr] == undefined || enemylist[getServer()][lastnr] == '' ) {

		lastnr = 0;
	}
	GM_setValue("lastnr", lastnr+1);
	toattack = enemylist[getServer()][lastnr];
	atakuj(toattack);
}
function wait() {

	lastnr = parseInt(GM_getValue("lastnr", "0"));
	if(enemylist[getServer()][lastnr] == undefined || enemylist[getServer()][lastnr] == '' ) {
		lastnr = 0;
	}
	toattack = enemylist[getServer()][lastnr];
	document.getElementById('ujn').value = 'Czekam, nastepny: ' + toattack;
}
if(enemylist[getServer()].length != 0 ){
	if(window.location.toString().indexOf('arena') == -1){
		setTimeout(function(){window.location = 'http://s'+getServer()+'.gladiatus.onet.pl/game/index.php?mod=arena';}, 10000);
	}else if(document.body.innerHTML.toString().indexOf('Prosz') != -1 && document.body.innerHTML.toString().indexOf('czeka') != -1){

			wait();
	}else{
			attack();
	}
	setTimeout(function(){window.location = window.location;}, 5000);
}