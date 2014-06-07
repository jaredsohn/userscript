
// ==UserScript==

// @name           GLB Add Stats to Roster

// @namespace      GLB

// @description    Show stats on roster page

// @include        http://goallineblitz.com/game/roster.pl?team_id=*

// ==/UserScript==

window.setTimeout( function() 
{

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var showagent = 1;
var showstats = 1;
var showage = 1;
var buseshort = true;
var loaded = false;

//create loadAgent link
      var loadLink = document.createElement('a');
      loadLink.setAttribute('href', '#');
      loadLink.innerHTML = "Load Stats";
      loadLink.addEventListener('click',loadAgents, false);

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " ";
   subhead_link_bar[0].appendChild(loadLink);
   

function getPlayerStat(playerId, i)
{
   GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://goallineblitz.com/game/player.pl?player_id=' + playerId,
   headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
   },
   onload: function(agntname) {
      var response1=agntname.responseText
      // get position  "position
      // build stats array
      // build string for array
      
      var playersplit1=response1.split('"position');
      var playerposition = playersplit1[1].substring(playersplit1[1].indexOf('>')+1,playersplit1[1].indexOf('<'));
      
      var playersplit2=response1.split('stat_value_tall');
      var StatsArray = new Array(14);
      var StatsNames = new Array(14);
      StatsNames[0] = 'Str:';
      StatsNames[1] = 'Blk:';
      StatsNames[2] = 'Spe:';
      StatsNames[3] = 'Tac:';
      StatsNames[4] = 'Agi:';
      StatsNames[5] = 'Thr:';
      StatsNames[6] = 'Jmp:';
      StatsNames[7] = 'Cat:';
      StatsNames[8] = 'Sta:';
      StatsNames[9] = 'Car:';
      StatsNames[10] = 'Vis:';
      StatsNames[11] = 'Kic:';
      StatsNames[12] = 'Con:';
      StatsNames[13] = 'Pun:';
      // StatsArray[0] = Strength StatsArray[1] = Blocking StatsArray[2] = Speed StatsArray[3] = Tackling StatsArray[4] = Agility StatsArray[5] = Throwing
      // StatsArray[6] = Jumping StatsArray[7] = Catching StatsArray[8] = Stamina StatsArray[9] = Carrying StatsArray[10] = Vision StatsArray[11] = Kicking
      // StatsArray[12] = Confidence StatsArray[13] = Punting
      // 



      var attributes = new Array(16);
      
      attributes[0] = new Array(2);
      attributes[0][0] = new Array(5);
      attributes[0][0][0] = 0;
      attributes[0][0][1] = 5;
      attributes[0][0][2] = 10;
      attributes[0][0][3] = 12;
      attributes[0][0][4] = 8;
      attributes[0][1] = new Array(5);
      attributes[0][1][0] = 4;
      attributes[0][1][1] = 6;
      attributes[0][1][2] = 9;
      attributes[0][1][3] = 2;
      attributes[0][1][4] = 7;
      attributes[1] = new Array(2);
      attributes[1][0] = new Array(6);
      attributes[1][0][0] = 4;
      attributes[1][0][1] = 2;
      attributes[1][0][2] = 0;
      attributes[1][0][3] = 10;
      attributes[1][0][4] = 9;
      attributes[1][0][5] = 12;
      attributes[1][1] = new Array(5);
      attributes[1][1][0] = 7;
      attributes[1][1][1] = 1;
      attributes[1][1][2] = 6;
      attributes[1][1][3] = 5;
      attributes[1][1][4] = 8;
      attributes[2] = new Array(2);
      attributes[2][0] = new Array(4);
      attributes[2][0][0] = 0;
      attributes[2][0][1] = 1;
      attributes[2][0][2] = 4;
      attributes[2][0][3] = 9;
      attributes[2][1] = new Array(5);
      attributes[2][1][0] = 12;
      attributes[2][1][1] = 10;
      attributes[2][1][2] = 7;
      attributes[2][1][3] = 3;
      attributes[2][1][4] = 8;
      attributes[3] = new Array(2);
      attributes[3][0] = new Array(2);
      attributes[3][0][0] = 0;
      attributes[3][0][1] = 1;
      attributes[3][1] = new Array(5);
      attributes[3][1][0] = 12;
      attributes[3][1][1] = 4;
      attributes[3][1][2] = 10;
      attributes[3][1][3] = 3;
      attributes[3][1][4] = 8;
      attributes[4] = new Array(2);
      attributes[4][0] = new Array(3);
      attributes[4][0][0] = 0;
      attributes[4][0][1] = 1;
      attributes[4][0][2] = 12;
      attributes[4][1] = new Array(4);
      attributes[4][1][0] = 4;
      attributes[4][1][1] = 10;
      attributes[4][1][2] = 3;
      attributes[4][1][3] = 8;
      attributes[5] = new Array(2);
      attributes[5][0] = new Array(5);
      attributes[5][0][0] = 0;
      attributes[5][0][1] = 1;
      attributes[5][0][2] = 12;
      attributes[5][0][3] = 4;
      attributes[5][0][4] = 10;
      attributes[5][1] = new Array(2);
      attributes[5][1][0] = 3;
      attributes[5][1][1] = 8;
      attributes[6] = new Array(2);
      attributes[6][0] = new Array(4);
      attributes[6][0][0] = 0;
      attributes[6][0][1] = 1;
      attributes[6][0][2] = 7;
      attributes[6][0][3] = 10;
      attributes[6][1] = new Array(6);
      attributes[6][1][0] = 4;
      attributes[6][1][1] = 2;
      attributes[6][1][2] = 12;
      attributes[6][1][3] = 9;
      attributes[6][1][4] = 8;
      attributes[6][1][5] = 3;
      attributes[7] = new Array(2);
      attributes[7][0] = new Array(6);
      attributes[7][0][0] = 2;
      attributes[7][0][1] = 4;
      attributes[7][0][2] = 7;
      attributes[7][0][3] = 6;
      attributes[7][0][4] = 10;
      attributes[7][0][5] = 8;
      attributes[7][1] = new Array(2);
      attributes[7][1][0] = 12;
      attributes[7][1][1] = 9;
      attributes[8] = new Array(2);
      attributes[8][0] = new Array(3);
      attributes[8][0][0] = 0;
      attributes[8][0][1] = 3;
      attributes[8][0][2] = 4;
      attributes[8][1] = new Array(5);
      attributes[8][1][0] = 1;
      attributes[8][1][1] = 12;   
      attributes[8][1][2] = 10;
      attributes[8][1][3] = 2;
      attributes[8][1][4] = 8;
      attributes[9] = new Array(2);
      attributes[9][0] = new Array(4);
      attributes[9][0][0] = 0;
      attributes[9][0][1] = 3;
      attributes[9][0][2] = 4;
      attributes[9][0][3] = 2;
      attributes[9][1] = new Array(5);
      attributes[9][1][0] = 1;
      attributes[9][1][1] = 12;   
      attributes[9][1][2] = 10;
      attributes[9][1][3] = 6;
      attributes[9][1][4] = 8;
      attributes[10] = new Array(2);
      attributes[10][0] = new Array(6);
      attributes[10][0][0] = 0;
      attributes[10][0][1] = 10;
      attributes[10][0][2] = 3;
      attributes[10][0][3] = 4;
      attributes[10][0][4] = 12;
      attributes[10][0][5] = 8;
      attributes[10][1] = new Array(4);
      attributes[10][1][0] = 2;
      attributes[10][1][1] = 6;   
      attributes[10][1][2] = 1;
      attributes[10][1][3] = 7;
      attributes[11] = new Array(2);
      attributes[11][0] = new Array(6);
      attributes[11][0][0] = 2;
      attributes[11][0][1] = 4;
      attributes[11][0][2] = 6;
      attributes[11][0][3] = 10;
      attributes[11][0][4] = 7;
      attributes[11][0][5] = 8;
      attributes[11][1] = new Array(4);
      attributes[11][1][0] = 0;
      attributes[11][1][1] = 3;   
      attributes[11][1][2] = 12;
      attributes[11][1][3] = 9;
      attributes[12] = new Array(2);
      attributes[12][0] = new Array(5);
      attributes[12][0][0] = 0;
      attributes[12][0][1] = 2;
      attributes[12][0][2] = 10;
      attributes[12][0][3] = 3;
      attributes[12][0][4] = 8;
      attributes[12][1] = new Array(6);
      attributes[12][1][0] = 4;
      attributes[12][1][1] = 6;   
      attributes[12][1][2] = 12;
      attributes[12][1][3] = 1;
      attributes[12][1][4] = 7;
      attributes[12][1][5] = 9;
      attributes[13] = new Array(2);
      attributes[13][0] = new Array(5);
      attributes[13][0][0] = 2;
      attributes[13][0][1] = 10;
      attributes[13][0][2] = 3;
      attributes[13][0][3] = 7;
      attributes[13][0][4] = 8;
      attributes[13][1] = new Array(6);
      attributes[13][1][0] = 4;
      attributes[13][1][1] = 6;   
      attributes[13][1][2] = 0;
      attributes[13][1][3] = 12;
      attributes[13][1][4] = 1;
      attributes[13][1][5] = 9;
      attributes[14] = new Array(2);
      attributes[14][0] = new Array(2);
      attributes[14][0][0] = 11;
      attributes[14][0][1] = 12;
      attributes[14][1] = new Array(6);
      attributes[14][1][0] = 0;
      attributes[14][1][1] = 10;   
      attributes[14][1][2] = 4;
      attributes[14][1][3] = 2;
      attributes[14][1][4] = 6;
      attributes[14][1][5] = 5;
      attributes[15] = new Array(2);
      attributes[15][0] = new Array(2);
      attributes[15][0][0] = 13;
      attributes[15][0][1] = 12;
      attributes[15][1] = new Array(6);
      attributes[15][1][0] = 0;
      attributes[15][1][1] = 10;   
      attributes[15][1][2] = 4;
      attributes[15][1][3] = 2;
      attributes[15][1][4] = 6;
      attributes[15][1][5] = 5;
      
      for (var q=1;q<playersplit2.length;q++) {
          StatsArray[q-1]=playersplit2[q].substring(playersplit2[q].indexOf('>')+1,playersplit2[q].indexOf('<'));
      }
      
      /*   'QB': {
	 'HB': {
	 'FB': {
	 'C': {
	 'G': {
	 'OT': {
	 'TE': {
	 'WR': {
	 'DT': {
	 'DE': {
	 'LB': {
	 'CB': {
	 'SS': {
	 'FS': {
	 'K': {
	 'P': {
	
*/
      var htmlstringadd = '';
      switch(playerposition) {
      case 'QB':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[0][0].length;w++) {
              htmlstringadd += StatsNames[attributes[0][0][w]] + StatsArray[attributes[0][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[0][1].length;w++) {
              htmlstringadd += StatsNames[attributes[0][1][w]] + StatsArray[attributes[0][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'HB':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[1][0].length;w++) {
              htmlstringadd += StatsNames[attributes[1][0][w]] + StatsArray[attributes[1][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[1][1].length;w++) {
              htmlstringadd += StatsNames[attributes[1][1][w]] + StatsArray[attributes[1][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'FB':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[2][0].length;w++) {
              htmlstringadd += StatsNames[attributes[2][0][w]] + StatsArray[attributes[2][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[2][1].length;w++) {
              htmlstringadd += StatsNames[attributes[2][1][w]] + StatsArray[attributes[2][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'C':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[3][0].length;w++) {
              htmlstringadd += StatsNames[attributes[3][0][w]] + StatsArray[attributes[3][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[3][1].length;w++) {
              htmlstringadd += StatsNames[attributes[3][1][w]] + StatsArray[attributes[3][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'G':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[4][0].length;w++) {
              htmlstringadd += StatsNames[attributes[4][0][w]] + StatsArray[attributes[4][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[4][1].length;w++) {
              htmlstringadd += StatsNames[attributes[4][1][w]] + StatsArray[attributes[4][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'OT':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[5][0].length;w++) {
              htmlstringadd += StatsNames[attributes[5][0][w]] + StatsArray[attributes[5][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[5][1].length;w++) {
              htmlstringadd += StatsNames[attributes[5][1][w]] + StatsArray[attributes[5][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'TE':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[6][0].length;w++) {
              htmlstringadd += StatsNames[attributes[6][0][w]] + StatsArray[attributes[6][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[6][1].length;w++) {
              htmlstringadd += StatsNames[attributes[6][1][w]] + StatsArray[attributes[6][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'WR':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[7][0].length;w++) {
              htmlstringadd += StatsNames[attributes[7][0][w]] + StatsArray[attributes[7][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[7][1].length;w++) {
              htmlstringadd += StatsNames[attributes[7][1][w]] + StatsArray[attributes[7][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'DT':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[8][0].length;w++) {
              htmlstringadd += StatsNames[attributes[8][0][w]] + StatsArray[attributes[8][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[8][1].length;w++) {
              htmlstringadd += StatsNames[attributes[8][1][w]] + StatsArray[attributes[8][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'DE':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[9][0].length;w++) {
              htmlstringadd += StatsNames[attributes[9][0][w]] + StatsArray[attributes[9][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[9][1].length;w++) {
              htmlstringadd += StatsNames[attributes[9][1][w]] + StatsArray[attributes[9][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'LB':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[10][0].length;w++) {
              htmlstringadd += StatsNames[attributes[10][0][w]] + StatsArray[attributes[10][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[10][1].length;w++) {
              htmlstringadd += StatsNames[attributes[10][1][w]] + StatsArray[attributes[10][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'CB':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[11][0].length;w++) {
              htmlstringadd += StatsNames[attributes[11][0][w]] + StatsArray[attributes[11][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[11][1].length;w++) {
              htmlstringadd += StatsNames[attributes[11][1][w]] + StatsArray[attributes[11][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'SS':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[12][0].length;w++) {
              htmlstringadd += StatsNames[attributes[12][0][w]] + StatsArray[attributes[12][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[12][1].length;w++) {
              htmlstringadd += StatsNames[attributes[12][1][w]] + StatsArray[attributes[12][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'FS':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[13][0].length;w++) {
              htmlstringadd += StatsNames[attributes[13][0][w]] + StatsArray[attributes[13][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[13][1].length;w++) {
              htmlstringadd += StatsNames[attributes[13][1][w]] + StatsArray[attributes[13][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'K':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[14][0].length;w++) {
              htmlstringadd += StatsNames[attributes[14][0][w]] + StatsArray[attributes[14][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[14][1].length;w++) {
              htmlstringadd += StatsNames[attributes[14][1][w]] + StatsArray[attributes[14][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;
      case 'P':
          htmlstringadd = '<br><font size="1" color="green">';
          for (var w=0;w<attributes[15][0].length;w++) {
              htmlstringadd += StatsNames[attributes[15][0][w]] + StatsArray[attributes[15][0][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd+='</font><br><font size="1" color="black">';
          for (var w=0;w<attributes[15][1].length;w++) {
              htmlstringadd += StatsNames[attributes[15][1][w]] + StatsArray[attributes[15][1][w]] +', ';
          }
          htmlstringadd = htmlstringadd.substring(0,htmlstringadd.length -2);
          htmlstringadd += '</font>';
          break;

      }


      var htmldaysoldsplit = response1.split('colspan="5">');
      daysold = htmldaysoldsplit[1].substring(htmldaysoldsplit[1].indexOf(' - ')+3,htmldaysoldsplit[1].indexOf('</td>'));
      
      var playeroverall=response1.split('<div class="rating_bar">');
      var playeroverallbar = playeroverall[1].substring(playeroverall[1].indexOf('<div class="rating_bar_fill'), playeroverall[1].indexOf('</div>', playeroverall[1].indexOf('<div class="rating_bar_fill') + 6));
      if (playeroverallbar.indexOf('px')>0) {
          var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('px'));
      }else{
          var playerstat = playeroverallbar.substring(playeroverallbar.indexOf('width:') + 6, playeroverallbar.indexOf('%'));
      }
      playeroverallbar = playeroverallbar.replace('&nbsp;',playerstat);
      var agntname=response1.split('user_id=');
      var name1=agntname[1].split('">');
      var agntID = name1[0];
      var name2=name1[1].split('</');
      var container=document.getElementById('content')
      if (buseshort) {
	      var playerbox=getElementsByClassName('player_name_short',document)
      } else {
 	      var playerbox=getElementsByClassName('player_name',document)
      }
      var htmladd1 = '';
      if (showagent==1) {
           htmladd1 = '<br><a href="/game/home.pl?user_id=' + agntID + '"><span style="font: 10pt black bold;">' + name2[0] + '</span></a>';
          
      }
      if (showstats==1) {
          htmladd1 += '<br>Player Overall: ' + playeroverallbar;
      }
      //playerbox[i].innerHTML = playerbox[i].innerHTML + 

      if (buseshort) {
          var playerbox=getElementsByClassName('player_name_short',document)
      } else {
          var playerbox=getElementsByClassName('player_name',document)
      }
      if(showage==1) {
          playerbox[i].innerHTML += '(' + daysold + ')';
      }
      if (showstats==1) {
          if (htmlstringadd.indexOf('undefined')==-1) {
              playerbox[i].innerHTML = playerbox[i].innerHTML + htmlstringadd;
          }
      }
      playerbox[i].innerHTML += htmladd1;
   
   }
   });
};



function loadAgents() {
if (!loaded) {
loaded = true;
var playernames=getElementsByClassName('player_name_short',document);
if (playernames.length == 0) {
	buseshort=false;
	var playernames=getElementsByClassName('player_name',document);
}

for (var i = 0; i < playernames.length; i++) {
   var playerInfo = playernames[i].innerHTML;
   var idlong = playerInfo.split('player_id=');
   var id = idlong[1].split('">');
   getPlayerStat(id, i);
}
}
};

},100);
