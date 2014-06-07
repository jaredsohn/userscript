// ==UserScript==
// @name        Hitri urnik - eAsistent
// @namespace   https://www.easistent.com/urnik
// @description Dodatek h urniku, hiter pogled katera ura poteka in kdaj se konca.
// @include     https://www.easistent.com/urnik
// @version     1
// ==/UserScript==


var deftmp = privzeto();
var _startCAS = katera_ura();

setInterval(function(){_glava();},1000);

function _glava()
{

if(_startCAS!=katera_ura())
{
privzeto(true);
_startCAS=katera_ura();
}

if(katera_ura()!=-1)
{
var danes = new Date();
var vseTabele = document.getElementsByTagName("table");
var Tabela_URNIK = vseTabele[9];
var oznaka_poteka = "<center><p id='skripta_t' style='background-color:blue; color:red; font-weight:bold;'>POTEKA! Do konca se: "+(katera_ura(true))+" minut in "+(60-danes.getSeconds())+" sekund!</p></center>";
var CELICA = Tabela_URNIK.rows.item(katera_ura()).cells;
	   
	 if(!ze_vsebuje())  
	CELICA.item(danes.getDay()).innerHTML=(CELICA.item(danes.getDay()).innerHTML)+oznaka_poteka;
	  else
	   {
	   if(typeof deftmp[katera_ura()-1] ==='undefined') deftmp[katera_ura()-1]="";
	  CELICA.item(danes.getDay()).innerHTML=deftmp[katera_ura()-1];
	  }
}       
}		

function privzeto(vse)
{
 vse = typeof vse === 'undefined' ? false : vse;
 
var CELICA = new Array(); 
 var TMP_T;
 var danes = new Date();
var vseTabele = document.getElementsByTagName("table");
var Tabela_URNIK = vseTabele[9];
for(k=1;k<12;k++)
{
TMP_T = Tabela_URNIK.rows.item(k).cells;
if(vse===true)
{
TMP_T.item(danes.getDay()).innerHTML=deftmp[k-1]; 
}else{
CELICA[k-1]=TMP_T.item(danes.getDay()).innerHTML;
}


}

return CELICA;
}
function ze_vsebuje()
{
if(document.getElementById('skripta_t'))
   return true;
 else
   return false;
}

function katera_ura(razlika)
{
 razlika = typeof razlika === 'undefined' ? false : razlika;
var zdaj = new Date();
var nas_cas = ((zdaj.getHours()*60)+zdaj.getMinutes());

var ure = new Array(11);
for(j=0;j<11;j++)
 ure[j]= new Array(2);

ure[0][0]=420;ure[0][1]=465-1;
ure[1][0]=470;ure[1][1]=515-1;
ure[2][0]=520;ure[2][1]=565-1;
ure[3][0]=570;ure[3][1]=615-1;
ure[4][0]=620;ure[4][1]=665-1;
ure[5][0]=670;ure[5][1]=715-1;
ure[6][0]=720;ure[6][1]=765-1;
ure[7][0]=770;ure[7][1]=815-1;
ure[8][0]=820;ure[8][1]=865-1;
ure[9][0]=870;ure[9][1]=915-1;
ure[10][0]=916;ure[10][1]=1439-1;
for(ura=0;ura<11;ura++)
{
  if(ure[ura][0]<=nas_cas && nas_cas<=ure[ura][1])
         {
		 if(!razlika)
		 return (ura+1); 
		 else
		 return  (ure[ura][1] - nas_cas);
		 }
		 
}

return -1;

}	
