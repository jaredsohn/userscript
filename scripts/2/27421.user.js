// ==UserScript==
// @name           searchTargets
// @namespace      ikatips
// @include        http://*.ikariam.*/index.php*
// ==/UserScript==

//le informazione su tutte le isole di ikariam, x,y,idisola,nomeisola,idtempio,idminiera,postiliberi
var arrXY = new Array();
//array associativo [idisola] : x ogni id ho un array di polis, ogni polis è un array di elementi: nomepolis,dimensione,nomegiocatore,linkmessaggiogiocatore,nomeally(altrimenti -),linkpaginally,linkmessaggioally
var infoPolis  = new Array();
//infoplayer['nome'] : total,militare,oro,generali,ricerca,scienziati 

var infoPlayer = new Array();

var postScore = new Array(
    "score",
    "building_score_main",
    "building_score_secondary",
    "research_score_main",
    "research_score_secondary",
    "army_score_main",
    "trader_score_secondary"
);
var SEARCHCODE = new Array();
SEARCHCODE[postScore[0]] = 'TOTALE';
SEARCHCODE[postScore[1]] = 'COSTRUTTORI';
SEARCHCODE[postScore[2]] = 'EDIFICI';
SEARCHCODE[postScore[3]] = 'SCIENZIATI';
SEARCHCODE[postScore[4]] = 'RICERCA';
SEARCHCODE[postScore[5]] = 'GENERALI';
SEARCHCODE[postScore[6]] = 'ORO';
var ikaserver = location.host;

function checkTargets(){

var initOK = 1;

tradegoodText = new Array();
tradegoodText[1] = 'Vino';
tradegoodText[2] = 'Marmo';
tradegoodText[3] = 'Cristallo';
tradegoodText[4] = 'Zolfo';

wonderText = new Array();
wonderText[1] = 'Fucina di Efesto';
wonderText[2] = 'Tempio di Gaia';
wonderText[3] = 'Giardino di Dioniso';
wonderText[4] = 'Tempio di Atena';
wonderText[5] = 'Tempio di Hermes';
wonderText[6] = 'La fortezza di Ares';
wonderText[7] = 'Tempio di Poseidone';
wonderText[8] = 'Colosso';

 var el = document.getElementsByTagName('script');
 if(!el[6]) return 0;
 var eli = el[6].innerHTML;

 eli = eli.substring(0,eli.indexOf('MAXSIZE'));
 eli = eli.split(';');
 var elii = null;
 var p1o = null;
 var p1c = null;
 var p2o = null;
 var p2c = null;
 var cX  = null;
 var cY  = null;
 var arrXYC = 0;
 var dataofp = null;
 var allCoords = "";
 var arry = (eli.length)-2;
 for (i=1;i<arry;i++){
   elii = eli[i].split('=');
   if((elii[0].split('][')).length == 2){
      arrXYC++;
      p1o = elii[0].indexOf('[')+1;
      p2o = elii[0].lastIndexOf('[')+1; 
      p1c = elii[0].indexOf(']');
      p2c = elii[0].lastIndexOf(']'); 
      cX  = elii[0].substring(p1o,p1c);
      cY  = elii[0].substring(p2o,p2c);
      dataofp = elii[1].substring(elii[1].indexOf('(')+1,elii[1].indexOf(')'));
      dataofp = dataofp.split(',');//x,y,id,nome,idtempio,idminiera,postiliberi
      arrXY[arrXYC] = new Array(cX,cY,dataofp[0],dataofp[3],wonderText[dataofp[2]],tradegoodText[dataofp[1]],16-dataofp[5]); 
      
    }
 }
 return initOK;
}

unsafeWindow.showToolTip = function(e,text){
		if(document.all)e = event;
		
		var obj = document.getElementById('bubble_tooltip');
		var obj2 = document.getElementById('bubble_tooltip_content');
		obj2.innerHTML = text;
		obj.style.display = 'block';
	//	var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		//var leftPos = e.clientX - 100;
		var leftPos = 20;
		if(leftPos<0)leftPos = 0;
		obj.style.left = leftPos + 'px';
	//	obj.style.top = e.clientY - obj.offsetHeight -1 + st + 'px';
	obj.style.top ='20px';
	}	
	
unsafeWindow.hideToolTip = function()
	{
		document.getElementById('bubble_tooltip').style.display = 'none';
		
	}

unsafeWindow.requestScore = function(name,cityLevel) {

 if (infoPlayer[name] == null){
 
 infoPlayer[name] = new Array();infoPlayer[name]['LENGTH']  = 0;
 setTimeout(function g(){
 
 var mname=name;
 for(var psi in SEARCHCODE) {
  
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://" + ikaserver +  "/index.php",
    data: "view=highscore&highscoreType="+ psi +"&searchUser="+ name,
    headers: {
      "User-agent": "Mozilla/4.0 (compatible)",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/atom+xml,application/xml,text/xml",
      "Referer": "http://" + ikaserver + "/index.php"
    },
    onload:  function(responseDetails) {       
    
        var htmlString = responseDetails.responseText;
        var scoreRequest = '';
        var nameRequest = mname;
         for (var st in SEARCHCODE) {
          var strToSearch = 'name="highscoreType" value="'+st+'"';
          if (htmlString.indexOf(strToSearch) != -1) {
          scoreRequest = st;
          break;         
          }   
          }
           var i1 = null;
           var i2 = null;
           //posso avere risultati multipli per nomegiocatore xchè fa una query %nome% , quindi sposto l'indice di testo subito prima del resultset del giocatore voluto
           i1 = htmlString.indexOf('<td class="name">'+nameRequest+'</td>');
           htmlString = htmlString.substring(i1);
            i1 = htmlString.indexOf('class="allytag">')+16;
            i2 = htmlString.substring(i1).indexOf('</td>');
            i2=i1+i2;
            infoPlayer[nameRequest]['ALLY'] =  htmlString.substring(i1,i2);
            htmlString = htmlString.substring(i2);
            i1 = htmlString.indexOf('class="score">')+14;
            i2 = htmlString.substring(i1).indexOf('</td>');
            i2=i1+i2;
            var scValue =  htmlString.substring(i1,i2);
            infoPlayer[nameRequest][scoreRequest] = scValue;

            infoPlayer[nameRequest]['LENGTH']++; //l'array associativo non ha un campo length        
    }
  }); 
   } 
 },100);
 } else { var strScores = 'GIOCATORE: <B>'+name+'</B> ALLY:<B> '+infoPlayer[name]['ALLY']+'</B><BR>';
    
     for (var scoreTypes in SEARCHCODE) {
      var ldata = infoPlayer[name][scoreTypes];
     if(ldata == null) return 'GIOCATORE: <B>'+name+'</B><BR> Dati in caricamento ....'; 
     if (scoreTypes == postScore[6])  {ldata =ldata+'('+Math.floor((parseInt(ldata.replace(",",""))*((cityLevel*(cityLevel-1))/100))/100)+')';}
            strScores+=SEARCHCODE[scoreTypes] + ': <B>' + ldata +'</B><BR>';
    }    return strScores;
 }
  return '';
}

function requestIsland(id) {
  
  infoPolis[''+id+''] = new Array();
  var classesToFind = new Array('<span class="textLabel">Nome: </span>','<span class="textLabel">Dim. città: </span>','<span class="textLabel">Giocatore: </span>','href="','<span class="textLabel">Alleanza: </span>');
  var endFind       = new Array('</li>','</li>','    					<a','" class=','</li>');
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://" + ikaserver + "/index.php",
    data: "view=island&id="+ id,
    headers: {
      "User-agent": "Mozilla/4.0 (compatible) ",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/atom+xml,application/xml,text/xml",
      "Referer": "http://" + ikaserver + "/index.php"
    },
    onload: function(responseDetails) {
        
        var htmlString = responseDetails.responseText;
        
        setTimeout(
           
          function g(){
           var pi = null;
           var i1 = null;
           var i2 = null;
           var ii = 0;
           while(true){
           
           pi = new Array();
           for (ii=0;ii<classesToFind.length;ii++){
            i1 = htmlString.indexOf(classesToFind[ii])+classesToFind[ii].length;
            i2 = htmlString.substring(i1).indexOf(endFind[ii]);
            i2=i1+i2;
            pi[ii]=htmlString.substring(i1,i2);
            htmlString = htmlString.substring(i2);
           }
           if (pi[ii-1] != '-') 
             {
              var allstr = new String(pi[ii-1]);
              var i1a=allstr.indexOf('<a href="')+9; 
              var i2a=allstr.substring(i1a).indexOf('">'); 
              i2a = i2a + i1a;
              var allypage = allstr.substring(i1a,i2a);
              allstr = allstr.substring(i2a);
              i1a=allstr.indexOf('">')+2; 
              i2a=allstr.substring(i1a).indexOf('</a>'); 
              i2a = i2a + i1a;
              var allyname = allstr.substring(i1a,i2a);
              allstr = allstr.substring(i2a);
              i1a=allstr.indexOf('<a href="')+9; 
              i2a=allstr.substring(i1a).indexOf('" class'); 
              i2a = i2a + i1a;
              var allymsg = allstr.substring(i1a,i2a);
              pi[ii-1]   = allyname;
              pi[ii]     = allypage;
              pi[ii+1]   = allymsg;
              
             }
          
           infoPolis[''+id+''].push(pi);
           
           if(htmlString.indexOf(classesToFind[0]) == -1) break;
           }
           
         },100);
    }
  }); 
}

function makeRows() {
var rowsHTML = '';
rowsHTML +='<TR><TD><b>Coordinate</b></TD><TD><b>Nome</b></TD><TD><b>Tempio</b></TD><TD><b>Risorsa</b></TD><TD><b>Colonizzabili</b></TD></TR>';
for(i in arrXY) {
islex = arrXY[i];
// x,y,idisola,nomeisola,idtempio,idminiera,postiliberi
rowsHTML +='<TR onclick="showIsle('+islex[2]+',\''+islex[0]+':'+islex[1]+'\','+islex[3]+');document.getElementById(\'isleBox\').style.visibility=\'visible\';" onmouseout="this.style.backgroundColor=\' RGB(253,247,221)\'" onmouseover="this.style.backgroundColor=\'RGB(228,184,115)\'"><TD>'+islex[0]+':'+islex[1]+'</TD><TD>'+islex[3]+'</TD><TD>'+islex[4]+'</TD><TD>'+islex[5]+'</TD><TD>'+islex[6]+'</TD></TR>';
document.getElementById('allWorldIslands').innerHTML=rowsHTML;
//requestIsland(islex[2]);
}
/*

for(i in infoPlayer)
alert(infoPlayer[i]);

for(i in infoPolis)
alert(infoPolis[i]);
*/
}

unsafeWindow.showIsle = function(isId,isCoord,isName){
var strRows='<TR><TD colspan="7" align="left"><B>'+isCoord+' '+isName+'</B><input type="button" style="border:1px solid RGB(228,184,115);" value="Chiudi" onclick="document.getElementById(\'isleBox\').style.visibility=\'hidden\';" /></TD></TR>';
strRows+='<TR><TD><B>Polis</B></TD><TD<B>Livello</B></TD><TD<B>Giocatore</B></TD><TD><B>Msg</B></TD><TD><B>Ally</B></TD><TD><B>Link</B></TD><TD><B>Msg</B></TD></TR>';
if (infoPolis[''+isId+'']) {
pI = infoPolis[''+isId+''];
if (pI.length == 0) {strRows+='<TR><TD colspan="7">Sto caricando, prova più tardi ...</TD></TR>'; }else {
for(i=0;i<pI.length;i++){ 

 strRows += '<TR  onmousemove="showToolTip(event,requestScore(\''+pI[i][2]+'\',\''+pI[i][1]+'\'));" onmouseout="hideToolTip(); this.style.backgroundColor=\' RGB(253,247,221)\'" onmouseover="this.style.backgroundColor=\'RGB(228,184,115)\'"><TD>'+pI[i][0]+'</TD><TD>'+pI[i][1]+'</TD><TD>'+pI[i][2]+'</TD><TD><a href="'+pI[i][3]+'" >msg</a></TD>'; if(pI[i][4] == '-') {strRows += '<TD-</TD><TD>-</TD><TD>-</TD></TR>';} else  {strRows += '<TD>'+pI[i][4]+'</TD><TD><a href="'+pI[i][5]+'">home</a></TD><TD><a href="'+pI[i][6]+'">msg</a></TD></TR>';} 
   }
 if (i<10) {do{strRows+='<TR><TD colspan="7">&nbsp;</TD></TR>';i++;}while(i<10)}; 
 }document.getElementById('polisTable').innerHTML = strRows;} /* 
 else { requestIsland(isId); document.setTimeout(function g(){pI = infoPolis[''+isId+''];
for(i=0;i<pI.length;i++){   
 strRows += '<TR><TD>'+pI[i][0]+'</TD><TD>'+pI[i][1]+'</TD><TD>'+pI[i][2]+'</TD><TD><a href="'+pI[i][3]+'" >msg</a></TD>'; if(pI[i][4] == '-') {strRows += '<TD-</TD><TD>-</TD><TD>-</TD></TR>';} else  {strRows += '<TD>'+pI[i][4]+'</TD><TD><a href="'+pI[i][5]+'">home</a></TD><TD><a href="'+pI[i][6]+'">msg</a></TD></TR>';} 
   }},600);document.getElementById('polisTable').innerHTML = strRows; }
*/
}

function initWorld(){
var initOK = 1;
var worldBoxHTML =
'<DIV style="vertical-align: middle; text-align:center; margin-bottom: 10px; height: 30px; background: RGB(228,184,115);"><B>Il mondo di Ikariam</B></DIV>'+
'<TABLE id="allWorldIslands" width=100%  height=100% ></TABLE>';

var worldBoxNode;
var refIkaNode = document.getElementById('GF_toolbar').parentNode;
if (refIkaNode) {
   worldBoxNode = document.createElement('DIV');
         worldBoxNode.setAttribute('id', 'worldBox');
         worldBoxNode.setAttribute('align', 'center');
         worldBoxNode.setAttribute('style', 'overflow-x:hidden;overflow-y:scroll;visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 700px; height:400px; position: absolute; z-index: 400; left:15px; top:150px;');
 
        refIkaNode.appendChild(worldBoxNode,refIkaNode);

document.getElementById("worldBox").innerHTML = worldBoxHTML;
} else initOK = 0;
var isleBoxHTML =
'<div id="bubble_tooltip" style="width:147px;'+
'		position:absolute;'+
'background: RGB(253,247,221);border:3px double RGB(228,184,115);'+
'		display:none;">'+
'<div style="background: RGB(253,247,221);'+
//'<div style="background-image: url(\'http://www.html.it/articoli/1757/bubble_top.gif\');'+
'		background-repeat:no-repeat;'+
'		height:16px;"><span></span></div>'+ 
//'<div style="background-image: url(\'http://www.html.it/articoli/1757/bubble_middle.gif\');'+
'<div style="'+
'		background-repeat:repeat-y;	'+
'		background-position:bottom left;'+
'		padding-left:7px;'+
'		padding-right:7px;"><span id="bubble_tooltip_content" style="position:relative;'+
'		top:-8px;'+
'		font-family: Trebuchet MS, Lucida Sans Unicode, Arial, sans-serif;'+
'		font-size:11px;"></span></div>'+
//'<div style="background-image: url(\'http://www.html.it/articoli/1757/bubble_bottom.gif\');'+
'<div style="'+
'		background-repeat:no-repeat;'+	
'		height:44px;'+
'		position:relative;'+
'		top:-6px;"></div>'+
'</div><TABLE id="polisTable" width="100%"  height="100%" style="margin-top:0px;"></TABLE>';

var isleBoxNode;
refIkaNode = document.getElementById('GF_toolbar').parentNode;
if (refIkaNode) {
   isleBoxNode = document.createElement('DIV');
         isleBoxNode.setAttribute('id', 'isleBox');
         isleBoxNode.setAttribute('align', 'center');
         isleBoxNode.setAttribute('style', 'vertical-align:top;overflow-x:hidden;overflow-y:scroll;visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 410px; height:260px; position: absolute; z-index: 500; left:50px; top:220px;');
 
        refIkaNode.appendChild(isleBoxNode,refIkaNode);

document.getElementById("isleBox").innerHTML = isleBoxHTML;
} else initOK = 0;
return initOK;
}

function showIkariamIslands(){
var hr = document.location.href;
hr = hr.split('?');
if ((!hr[1])  || hr[1].indexOf('view=worldmap_iso')!=-1){
if (checkTargets() == 1) {
if (initWorld() == 1){
makeRows();

for(i in arrXY) if (arrXY[i][6] < 16) requestIsland(arrXY[i][2]);

   }
  } 
 }
}
showIkariamIslands();