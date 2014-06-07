// ==UserScript==
// @name           Clubstatus
// @namespace      Clubstatus
// @description    showclub stat
// @include        http://forums.d2jsp.org/topic.php?t=*&f=*
// @include        http://forums.d2jsp.org/user.php?i=*
// @include        http://forums.d2jsp.org/pm.php?c=*
// ==/UserScript==

var KARLSRUHERSC = [];
var HERTHABSC =[];
var BVB =[];
var BARCA =[];
var MILAN =[];
var AIK =[];
var BAYERN
var JUVE =[];
var REAL =[];
var VALENCIA =[];
var ATLETICO =[];
var MANU = [];
var CHELSEA =[];
var ARSENAL =[];
var LIVERPOOL =[];
var MANCITY =[];
var FULHAM =[];
var SCHALKE =[];
var BREMEN =[];
var LYON =[];
var BORDEUX =[];
var MARSEILLE =[];
var PARISSG =[];
var INTER =[];
var FLORENZ =[];
var PORTO =[];
var BENFICA =[];
var SPORTING =[];
var AJAX =[];
var PSV =[];
var RANGERS =[];
var CELTIC =[];
var ZSKA =[];
var STP =[];
var FCBASEL =[];
var YBB =[];
var TOTTENHAM =[];
var TSV =[];
var EINTRACHT =[];
var VFB =[];
var AACHEN=[];
var GLADBACH=[];
var GAY=[];
var GS=[];
var LEVERKUSEN = [];
var SCF = [];
var FCN = [];
var DSC =[]
function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

function resolveBettorType(name){
	var i;
			
	for(i=0;i<KARLSRUHERSC.length;i++){
		if(name == KARLSRUHERSC[i]){
			return 'KarlsruherSc';
		}
	}
	for(i=0;i<HERTHABSC.length;i++){
		if(name == HERTHABSC[i]){
			return 'Hertha BSC';
		}
	}
		for(i=0;i<BVB.length;i++){
		if(name == BVB[i]){
			return 'BvB';
		}
	}
	for(i=0;i<BARCA.length;i++){
		if(name == BARCA[i]){
			return 'Barca';
		}
	}
	for(i=0;i<MILAN.length;i++){
		if(name == MILAN[i]){
			return 'Milan';
		}
	}
		for(i=0;i<AIK.length;i++){
		if(name == AIK[i]){
			return 'Aik';
		}
	}
	for(i=0;i<BAYERN.length;i++){
		if(name == BAYERN[i]){
			return 'Bayern';
		}
	}
	for(i=0;i<JUVE.length;i++){
		if(name == JUVE[i]){
			return 'Juve';
		}
	}
	for(i=0;i<REAL.length;i++){
		if(name == REAL[i]){
			return 'Real';
		}
	}
	for(i=0;i<VALENCIA.length;i++){
		if(name == VALENCIA[i]){
			return 'Valencia';
		}
	}
	for(i=0;i<ATLETICO.length;i++){
		if(name == ATLETICO[i]){
			return 'Atletico';
		}
	}
	for(i=0;i<MANU.length;i++){
		if(name == MANU[i]){
			return 'Manu';
		}
	}
	for(i=0;i<CHELSEA.length;i++){
		if(name == CHELSEA[i]){
			return 'Chelsea';
		}
	}
	for(i=0;i<ARSENAL.length;i++){
		if(name == ARSENAL[i]){
			return 'Arsenal';
		}
	}
	for(i=0;i<LIVERPOOL.length;i++){
		if(name == LIVERPOOL[i]){
			return 'Liverpool';
		}
	}
	for(i=0;i<MANCITY.length;i++){
		if(name == MANCITY[i]){
			return 'Mancity';
		}
	}
	for(i=0;i<FULHAM.length;i++){
		if(name == FULHAM[i]){
			return 'Fulham';
		}
	}
	for(i=0;i<SCHALKE.length;i++){
		if(name == SCHALKE[i]){
			return 'Schalke';
		}
	}
	for(i=0;i<BREMEN.length;i++){
		if(name == BREMEN[i]){
			return 'Bremen';
		}
	}
	for(i=0;i<LYON.length;i++){
		if(name == LYON[i]){
			return 'Lyon';
		}
	}
	for(i=0;i<BORDEUX.length;i++){
		if(name == BORDEUX[i]){
			return 'Bordeux';
		}
	}
	for(i=0;i<MARSEILLE.length;i++){
		if(name == MARSEILLE[i]){
			return 'Marseille';
		}
	}
	for(i=0;i<PARISSG.length;i++){
		if(name == PARISSG[i]){
			return 'Parissg';
		}
	}
	for(i=0;i<INTER.length;i++){
		if(name == INTER[i]){
			return 'Inter';
		}
	}
	for(i=0;i<FLORENZ.length;i++){
		if(name == FLORENZ[i]){
			return 'Florenz';
		}
	}
	for(i=0;i<PORTO.length;i++){
		if(name == PORTO[i]){
			return 'Porto';
		}
	}
	for(i=0;i<BENFICA.length;i++){
		if(name == BENFICA[i]){
			return 'Benfica';
		}
	}
	for(i=0;i<SPORTING.length;i++){
		if(name == SPORTING[i]){
			return 'Sporting';
		}
	}
	for(i=0;i<AJAX.length;i++){
		if(name == AJAX[i]){
			return 'Ajax';
		}
	}
	for(i=0;i<PSV.length;i++){
		if(name == PSV[i]){
			return 'Psv';
		}
	}
	for(i=0;i<RANGERS.length;i++){
		if(name == RANGERS[i]){
			return 'Rangers';
		}
	}
	for(i=0;i<CELTIC.length;i++){
		if(name == CELTIC[i]){
			return 'Celtic';
		}
	}
	for(i=0;i<ZSKA.length;i++){
		if(name == ZSKA[i]){
			return 'Zska';
		}
	}
	for(i=0;i<STP.length;i++){
		if(name == STP[i]){
			return 'Stp';
		}
	}	
	for(i=0;i<FCBASEL.length;i++){
		if(name == FCBASEL[i]){
			return 'Fcbasel';
		}
	}	
	for(i=0;i<YBB.length;i++){
		if(name == YBB[i]){
			return 'Ybb';
		}
	}
	for(i=0;i<TOTTENHAM.length;i++){
		if(name == TOTTENHAM[i]){
			return 'Tottenham';
		}
	}
	for(i=0;i<TSV.length;i++){
		if(name == TSV[i]){
			return 'Tsv';
		}
	}
	for(i=0;i<EINTRACHT.length;i++){
		if(name == EINTRACHT[i]){
			return 'Eintracht';
		}
	}
	for(i=0;i<VFB.length;i++){
		if(name == VFB[i]){
			return'Vfb';
		}
	}
	for(i=0;i<AACHEN.length;i++){
		if(name == AACHEN[i]){
			return'Aachen';
		}
	}
	for(i=0;i<GLADBACH.length;i++){
		if(name == GLADBACH[i]){
			return'Gladbach';
		}
	}
	for(i=0;i<GAY.length;i++){
		if(name == GAY[i]){
			return'Gay';
		}
	}
	for(i=0;i<GS.length;i++){
		if(name == GS[i]){
			return'Gs';
		}
	}
	for(i=0;i<LEVERKUSEN.length;i++){
		if(name == LEVERKUSEN[i]){
			return'Leverkusen';
		}
	}
	for(i=0;i<SCF.length;i++){
		if(name == SCF[i]){
			return'Scf';
		}
	}
	for(i=0;i<FCN.length;i++){
		if(name == FCN[i]){
			return'Fcn';
		}
	}
	for(i=0;i<DSC.length;i++){
		if(name == DSC[i]){
			return'Dsc';
		}
	}
	return 'unknown';
};

function createHTML(div,user){
div.innerHTML += '<br/><b><a href="http://forums.d2jsp.org/forum.php?f=205"' + 
		' title="World Football - Soccer" target="_blank">Club</a>: ';
	switch(resolveBettorType(user)){

		case 'KarlsruherSc':
			div.innerHTML += '<font color="blue"><b>KarlsruherSc</b></font>';
			break;
		case 'Hertha BSC':
			div.innerHTML += '<font color="blue"><b>Hertha BSC</b></font>';
			break;
		case 'BvB':
			div.innerHTML += '<font color="yellow"><b>BvB</b></font>';
			break;
		case 'Barca':
			div.innerHTML += '<font color="red"><b>Barcelona</b></font>';
			break;
		case 'Milan':
			div.innerHTML += '<font color="red"><b>Ac Milan</b></font>';
			break;
		case 'Aik':
			div.innerHTML += '<font color="yellow"><b>AIK</b></font>';
			break;
		case 'Bayern':
			div.innerHTML += '<font color="red"><b>Bayern Munich</b></font>';
			break;
		case 'Juve':
			div.innerHTML += '<font color="white"><b>Juventus</b></font>';
			break;
		case 'Real':
			div.innerHTML += '<font color="white"><b>Real Madrid</b></font>';
			break;
		case 'Valencia':
			div.innerHTML += '<font color="red"><b>Valencia</b></font>';
			break;
		case 'Atletico':
			div.innerHTML += '<font color="red"><b>Atletico</b></font>';
			break;
		case 'Manu':
			div.innerHTML += '<font color="red"><b>Manchester United</b></font>';
			break;
		case 'Chelsea':
			div.innerHTML += '<font color="blue"><b>Chelsea</b></font>';
			break;
		case 'Arsenal':
			div.innerHTML += '<font color="red"><b>Arsenal</b></font>';
			break;
		case 'Liverpool':
			div.innerHTML += '<font color="red"><b>Liverpool</b></font>';
			break;
		case 'Mancity':
			div.innerHTML += '<font color="blue"><b>Manchester City</b></font>';
			break;
		case 'Fulham':
			div.innerHTML += '<font color="white"><b>Fulham</b></font>';
			break;
		case 'Schalke':
			div.innerHTML += '<font color="blue"><b>Fc Schalke 04</b></font>';
			break;
		case 'Bremen':
			div.innerHTML += '<font color="green"><b>Werder Bremen</b></font>';
			break;
		case 'Lyon':
			div.innerHTML += '<font color="blue"><b>Olympique Lyon</b></font>';
			break;
		case 'Bordeux':
			div.innerHTML += '<font color="blue"><b>FC Girondins de Bordeaux</b></font>';
			break;
		case 'Marseille':
			div.innerHTML += '<font color="blue"><b>Olympique Marseille</b></font>';
			break;
		case 'Parissg':
			div.innerHTML += '<font color="blue"><b>Paris Saint-Germain</b></font>';
			break;
		case 'Inter':
			div.innerHTML += '<font color="blue"><b>Inter Mailand</b></font>';
			break;
		case 'Florenz':
			div.innerHTML += '<font color="fuchsia"><b>AC Florenz</b></font>';
			break;
		case 'Porto':
			div.innerHTML += '<font color="white"><b>Fc Porto</b></font>';
			break;
		case 'Benfica':
			div.innerHTML += '<font color="red"><b>Benfica Lissabon</b></font>';
			break;
		case 'Sporting':
			div.innerHTML += '<font color="green"><b>Sportin Lissabon</b></font>';
			break;
		case 'Ajax':
			div.innerHTML += '<font color="red"><b>Ajax Amsterdam</b></font>';
			break;
		case 'Psv':
			div.innerHTML += '<font color="red"><b>Psv Eindhoven</b></font>';
			break;
		case 'Rangers':
			div.innerHTML += '<font color="blue"><b>Glasgow Rangers</b></font>';
			break;
		case 'CELTIC':
			div.innerHTML += '<font color="green"><b>Celtic Glasgow</b></font>';
			break;
		case 'Zska':
			div.innerHTML += '<font color="red"><b>CSKA Moskow</b></font>';
			break;
		case 'Stp':
			div.innerHTML += '<font color="blue"><b>FC Zenit Saint Petersburg</b></font>';
			break;
		case 'Fcbasel':
			div.innerHTML += '<font color="red"><b>Fc Basel</b></font>';
			break;
		case 'Ybb':
			div.innerHTML += '<font color="yellow"><b>Bsc Young Boys</b></font>';
			break;
		case 'Tottenham':
			div.innerHTML += '<font color="white"><b>Tottenham Hotspur</b></font>';
			break;
		case 'Tsv':
			div.innerHTML += '<font color="white"><b>TSV 1860 Munich</b></font>';
			break;
		case 'Eintracht':
			div.innerHTML += '<font color="red"><b>Eintracht Frankfurt</b></font>';
			break;
		case'Vfb':
			div.innerHTML += '<font color="fuchsia"><b>Vfb Stuttgart</b></font>';
			break;
		case'Aachen':
			div.innerHTML += '<font color="yellow"><b>Alemannia Aachen</b></font>';
			break;
		case'Gladbach':
			div.innerHTML += '<font color="white"><b>Borussia Mönchengladbach</b></font>';
			break;
		case'Gay':
			div.innerHTML += '<font color="fuchsia"><b>Gay</b></font>';
			break;
		case'Gs':
			div.innerHTML += '<font color="yellow"><b>Sv Grillschaf</b></font>';
			break;
		case'Leverkusen':
			div.innerHTML += '<font color="red"><b>Bayer 04 Leverkusen</b></font>';
			break;
		case 'Scf':
			div.innerHTML += '<font color="red"><b>Sc Freiburg</b></font>';
			break;
		case 'Fcn':
			div.innerHTML += '<font color="red"><b>1.Fc Nuernberg</b></font>';
			break;
		case 'Dsc':
			div.innerHTML += '<font color="blue"><b>Arminia Bielefeld</b></font>';
			break;
		case 'unknown':
			div.innerHTML += '<font color="gray"><b>Unknown</b></font>';
			break;
		}
	div.innerHTML += '</b>';
};

function doThePage(){
	var divs = getElementsByClassName('bc1',document);
	var names = document.getElementsByTagName('legend');
	var name,str,nameOffset,divOffset;
	nameOffset = 0;
	divOffset = 0;
	
	for(var i=0;i<divs.length;i++){
		if(names[i + nameOffset].innerHTML == 'User Poll'){
			nameOffset++;
		}
		
		if(window.location.href.indexOf('pm.php?') > 0){
			nameOffset = 2;
			divOffset = divs.length - 1;
		}
		
		if(window.location.href.indexOf('index.php?act=Post&c') > 0){
			nameOffset = 1;
		}
		
		str = names[i + nameOffset].firstChild;

		if(str.innerHTML.indexOf('<') == 0){
			str = str.firstChild;
		}
		
		str = str.innerHTML;
		
		var idx = str.indexOf('<');
		if(idx != -1){
			name = str.substring(0,idx)
		}else{
			name = str;
		}
		
		name = name.replace(/ /gi,'');
		
		createHTML(divs[i + divOffset],name.toUpperCase());
		
		if(window.location.href.indexOf('pm.php?') > 0 || window.location.href.indexOf('user.php?i') > 0){
			break;
		}
	}
};

function getNames(){
	GM_xmlhttpRequest(
	{
	    method: 'GET',
	    url: 'http://chju.bplaced.net/cl/',
	    headers: 
		{
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	    onload: function(response)
		{
			var str = response.responseText;
			
			var names = str.substring(str.indexOf('StArToFmYCLUBlIsT') + 19,str.indexOf('EnDoFmYCLUBlIsT'));
			eval(names);
			doThePage();
		}
	});

};

getNames();