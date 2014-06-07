// ==UserScript==
// @name           Nettby 0.0.1
// @namespace      Nettby 0.0.1
// @include        http://www.nettby.no*
// @description    Nettby.no
// ==/UserScript==

var d=document;
var images=d.getElementsByTagName('img');
var welcome=d.getElementsByTagName("span");
var nick1=d.getElementsByTagName("tr");
var nick2=d.getElementsByTagName("span");
var member="";
var city1=d.getElementsByTagName("tr");
var city2=d.getElementsByTagName("strong");
var rcity="Sunndal";
var count=0;
var fonts=d.getElementsByTagName('font');
var links=d.getElementsByTagName('a');
var mm=d.getElementsByTagName('link');
function m() { 
  e=setTimeout("g()",300);
}
//CALADORION ©
//if (document.all||document.getElementById){
//var thetitle=document.title
//document.title='nettbyagent by caladorion ©'
//}

//Ikke tenk på å KOPIER eller ENDRE på denne Js...
//spørr meg først, eller la den koden NEDENFOR være i scriptet!!!
//Og fjern slachene "\" fra den.
//CALADORION ©

//var bg1 = window.document.getElementsByTagName('div')[4];
//bg1.style.background = 'url()';

//var bg2 = window.document.getElementsByTagName('div')[5];
//bg2.innerHTML = '';

//var bg3 = window.document.getElementsByTagName('div')[6];
//bg3.innerHTML = '<img src="http://8crazycat8.webs.com/1nettbyhaxZZ.jpg">';

//SMILEY
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley19.png")
{images[i].src="http://i38.tinypic.com/1z3ym1y.gif";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://static.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://i203.photobucket.com/albums/aa296/kimove_photos/FBI.jpg";}}




//CALADORION ©
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/smiley/smiley52.png")
{images[i].src="http://www.33smiley.com/smiley4/smileys/16.gif";}}



//CALADORION ©
var sted=0;
for(i=0;i<links.length;i++) {
if(links[i].innerHTML=="Eidsberg") {
links[i].innerHTML="Her bor jeg";
links[i].style.color="#FF7F00";
sted++;}


if(links[i].innerHTML=="Østfolfd"){
links[i].innerHTML="Bling! bling!";
links[i].style.color="#87CEEB";
sted++;}
if (sted==2) break;}


for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Send brev") {
  links[i].innerHTML="Skriv et hyggelig brev";
  links[i].style.color="#A52A2A"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Ignorer") {
  links[i].innerHTML="Bli uvenn med denne borgeren";
  links[i].style.color="#ff0000"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Bli venn med") {
  links[i].innerHTML="Bli venn med denne borgeren";
  links[i].style.color="#FF69B4"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Skriv en hilsen") {
  links[i].innerHTML="SKriv eN HiLSeN";
  links[i].style.color="#8B7D7B"; {
  }
 }
}
for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="Postkasse") {
  links[i].innerHTML="Min private postkasse<3";
  links[i].style.color="#ff0000"; {
  }
 }
}


//CALADORION ©




//PROFILELDER
var D = window.document;
var bilder=getName('img');

function getName(n){return D.getElementsByTagName(n);}
//FANNY65
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/fanny65\/3.jpg/)) {bilder[i].src="http://i39.tinypic.com/huizw2.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ZAPTOPARK
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/zaptopark\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/28u5o5z.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//STARGAZER
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/stargazer\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/2ueqi3c.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//RIKKO10
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/rikko10\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/2hprm6t.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SJAZMINA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sjazmina\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/2j4agpz.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MOT96
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/mot96\/3.jpg/)) {bilder[i].src="http://i42.tinypic.com/k2d9nb.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//OTTAR96
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/ottar96\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/20r8rgl.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//PATWI
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/patwi\/3.jpg/)) {bilder[i].src="http://i43.tinypic.com/2s0fnuv.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SWIITI
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/swiiti\/3.jpg/)) {bilder[i].src="http://i40.tinypic.com/hsku8h.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MISSYKISSY
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/missykissy\/3.jpg/)) {bilder[i].src="http://i44.tinypic.com/svosqv.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SIMONZ1
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/simonz1\/3.jpg/)) {bilder[i].src="http://i44.tinypic.com/21n02l2.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//DO0B
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/do0b\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/14j2as6.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//AWNW
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/awnw\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/nv3zg0.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//HIPMAN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/hipman\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/29c01o8.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ANDREASWB
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/andreaswb\/3.jpg/)) {bilder[i].src="http://i43.tinypic.com/2mmz80m.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//GOOD4YOU
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/good4you\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/351hnwo.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//HELENESIPI
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/helenesipi\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/ngablk.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//BROCHMANN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/brochmann\/3.jpg/)) {bilder[i].src="http://i41.tinypic.com/zm16e1.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//D3VILMIND
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/d3vilmind\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/2isvzbp.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//TORELISE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/torelise\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/2r5eot2.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//HERMIE86
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/hermie86\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/2s8qs5s.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//VASSDAL
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/vassdal\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/igm7ls.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//TORELISE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/torelise\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/254zvjl.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//TORANDRE96
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/torandre96\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/70gpxj.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//KENNYBO192
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/kennyboi92\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/9ljts5.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ARNO
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/arno\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/sd2uqd.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//GIBBI
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/gibbi\/3.jpg/)) {bilder[i].src="http://i24.tinypic.com/10mpmwx.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//TOSH
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/t0sh\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/2enxbo0.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ANNAGIRL110
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/annagirl10\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/2eb92er.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SMILY50
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/smily50\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/b6uhjq.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//BRATLIE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/bratlie\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/ics0vo.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//CRAZYDEVEL
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/crazydevel\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/2rfdatl.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//FLAMMEFUL
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/flammeful\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/24ys7pv.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//PAARTY85
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/paarty85\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/24wrkn4.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//LARUS07
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/larus07\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/2s0mqro.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//PUSHSEN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/puhsen\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/11go9bn.gif";bilder[i].width="220";bilder[i].height="300";}
}
//ANDINOFX
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/andinofx\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2zyez3o.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//KITTY63
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/kitty63\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/1z4iand.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//CAT63
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/cat63\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/xle9s6.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SOFT
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/soft\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/apgzh4.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//GROMJINTA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/gromjinta\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/2v8o7zb.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MAKITA11
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/makita11\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/2a5gpkx.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SONIQSA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/soniqsa\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/2ytvjaq.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SMONG
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sm0ng\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/syawwn.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//NITEDALS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/nitedals\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2weyt93.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ZOMBIESEX
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/zombiesex\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/2gsn4nn.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//LYSESTAKEN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/lysestaken\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/2hxxxk.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//JOAMYR
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/joamyr\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/jaj8jq.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//TORILAN5
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/torilan5\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/6hn7sx.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MALMO95
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/malmo95\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/ercw20.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//Sm0NG
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sm0ng \/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/6f4h2v.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//M4RT1NM
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/m4rt1nm\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/35bhycp.gif";bilder[i].width="220";bilder[i].height="300";}
}
//RBH
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/rbh\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/2qnxnoj.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//SNUPPJENTA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/snuppjenta\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/20zpjie.gif ";bilder[i].width="220";bilder[i].height="300";}
}
//SUNMOON
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sunmoon\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/25hmvxs.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MELGARD
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/melgard\/3.jpg/)) {bilder[i].src="http://i20.tinypic.com/x4htvk.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//SEAHWK39
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/seahawk39\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/2u6h55v.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//GIDEON
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/gideon\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2pqkwmt.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MAJAKANIN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/majakanin\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/5z35mq.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MIZZEMINEM
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/mizzeminem\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/15mjxc3.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ARRVIDD
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/arrvidd\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/iy379f.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}
//M4RT1nm
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/m4rt1nm\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/bimbv5.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//QRUSELLA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/qrusella\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/35lepol.gif ";bilder[i].width="220";bilder[i].height="300";}
}
//JACKASSE90
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/jackass90\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/10fbd5t.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//TORPEJINTA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/torpejinta\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/htfalh.gif";bilder[i].width="220";bilder[i].height="300";}
}
//RINAH85
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/rinah85\/3.jpg/)) {bilder[i].src="http://s4.tinypic.com/3089t7k.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//BLONDIKIM
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/blondikim\/3.jpg/)) {bilder[i].src="http://s4.tinypic.com/otfb0y.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MOLDEMAFIAN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/moldemafia\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/10pmzgw.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//JOAQUIM9
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/joaquim9\/3.jpg/)) {bilder[i].src="http://i23.tinypic.com/11rg68i.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//THESNOWMAN
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/thesnowman\/3.jpg/)) {bilder[i].src="http://i31.tinypic.com/1zpll3n.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//GODJENTE25
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/godjente24\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/2e3tssw.gif";bilder[i].width="220";bilder[i].height="300";}
}
//HECATE88
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/hecate88\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2ajp2kx.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//STRYX
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/stryx\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/30jlbur.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//LAAYSE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/laayse\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/210c6yx.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//SLECK94
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sleck94\/3.jpg/)) {bilder[i].src="http://sacandolavuelta.bitacoras.com/nerd.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//MAIOJENTA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/maiojenta\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/ri7xwz.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//GH3TOO
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/gh3tto\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/15non6f.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//XXTASCHAXX
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/xxtaschaxx\/3.jpg/)) {bilder[i].src="http://i237.photobucket.com/albums/ff118/xX_yourXemoXdrem_Xx/gun-1.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//CRAP93SHIT
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/crap93shit\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/2be2oi.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}
//ROCKJENTA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/rockjenta\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2m3ry90.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MOON77
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/moon77\/3.jpg/)) {bilder[i].src="http://i35.tinypic.com/15n0ldz.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ANTONYMUS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/antonymus\/3.jpg/)) {bilder[i].src="http://i28.tinypic.com/16lkc5i.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MYSTIC81
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/mystic81\/3.jpg/)) 
{bilder[i].src="http://i28.tinypic.com/rmvalc.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MARIUSIK
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/mariusik\/3.jpg/)) 
{bilder[i].src="http://i27.tinypic.com/259vk81.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//ONLYJU
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/onlyju\/3.jpg/)) {bilder[i].src="http://i25.tinypic.com/9llog2.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//MUNDGJER
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/mundgjer\/3.jpg/)) {bilder[i].src="http://i31.tinypic.com/2dqjy9g.gif";bilder[i].width="220";bilder[i].height="300";}
}
//LINDABEJB
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/lindabejb\/3.jpg/)) {bilder[i].src="http://i28.tinypic.com/2h4jr41.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//RONJA37
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/ronja37\/3.jpg/)) {bilder[i].src="http://i25.tinypic.com/pljra.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//WOWZORZOR
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/wowzorzor\/3.jpg/)) {bilder[i].src="http://i32.tinypic.com/21dlq8m.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//PETTERF2
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/petterf2\/3.jpg/)) {bilder[i].src="http://i28.tinypic.com/vg1pxg.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//DAMAH
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/dmah\/3.jpg/)) {bilder[i].src="http://i26.tinypic.com/2h7qget.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SEPHIA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sephia\/3.jpg/)) {bilder[i].src="http://i32.tinypic.com/4uta2c.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//TOMMYGRR
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/tommygrr\/3.jpg/)) {bilder[i].src="http://i28.tinypic.com/abtfzs.gif";bilder[i].width="220";bilder[i].height="300";}
}
//SHANNARA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/shannara\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/1gtbog.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//JACOBANDRE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/jacobandre\/3.jpg/)) {bilder[i].src="http://i32.tinypic.com/23svr75.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//BAD2TBONE
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/bad2tbone\/3.jpg/)) {bilder[i].src="http://i34.tinypic.com/262724n.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//BIMMERS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/bimmers\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/dr2oba.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//NETTENUTT
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/nettenutt\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/i27rro.jpg";bilder[i].width="220";bilder[i].height="300";}
}
//SHEVY
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/shevy\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2cqzpee.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//SONIQSA
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/soniqsa\/3.jpg/)) {bilder[i].src="http://i38.tinypic.com/2qdd6c3.jpg ";bilder[i].width="220";bilder[i].height="300";}
}
//ROLVKR
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/rolvkr\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/2yv7wp5.gif ";bilder[i].width="220";bilder[i].height="300";}
} 
//JOHNSEN007
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/johnsen007\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/5pesn4.jpg ";bilder[i].width="220";bilder[i].height="300";}
} 
//HANSEHANS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/hansehans\/3.jpg/)) {bilder[i].src="http://i37.tinypic.com/ieij4j.gif ";bilder[i].width="220";bilder[i].height="300";}
}
//RAISINS
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/raisins\/3.jpg/)) {bilder[i].src="http://i33.tinypic.com/wk0cpx.gif  ";bilder[i].width="220";bilder[i].height="300";}
}
//PIFFY
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/piffy\/3.jpg/)) {bilder[i].src="http://s4.tinypic.com/2wq4s2e.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}
//SIDNEY79
for(var i=0;i<bilder.length;i++) {
if(bilder[i].src.match(/\/sidney79\/3.jpg/)) {bilder[i].src="http://i36.tinypic.com/v7xpc5.jpg  ";bilder[i].width="220";bilder[i].height="300";}
}

for(i=0;i<images.length;i++){if(images[i].src==
"http://img1.nettby.no/img/vg.gif"
){images[i].src=
"http://i29.tinypic.com/b7ludg.jpg"}}
//

for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_girl.gif"){images[i].src="http://i37.tinypic.com/depk5g.jpg";images[i].width="55";images[i].height="60";}}
for(i=0;i<images.length;i++){if(images[i].src=="http://img1.nettby.no/img/no_photo_boy.gif"){images[i].src="http://i33.tinypic.com/1htf8k.jpg";images[i].width="55";images[i].height="60";}}



//Caladorion.Gruppeleder
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/c/a/l/caladorion/2.jpg?1218546198"){images[i].src="http://i34.tinypic.com/2cfrx8l.jpg";images[i].width="90";images[i].height="110";}}

for(i=0;i<images.length;i++){if(images[i].src=="http://img3.nettby.no/users/c/a/l/caladorion/1.jpg?1214607151"){images[i].src="http://i37.tinypic.com/28i15l3.jpg";images[i].width="55";images[i].height="60";}}
//Cartman.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img3.nettby.no/users/c/a/r/cartman/1.jpg?1213777479"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Countryrg.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/c/o/u/countryrg/1.jpg?1203368692"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Moldemafia.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img4.nettby.no/users/m/o/l/moldemafia/1.jpg?1210095383"){images[i].src="http://i36.tinypic.com/2rp4bnq.jpg";images[i].width="55";images[i].height="60";}}
//Gh3tto.Gruppevakt
for(i=0;i<images.length;i++){if(images[i].src=="http://img3.nettby.no/users/g/h/3/gh3tto/1.jpg?1217803580"){images[i].src="http://i38.tinypic.com/2lpaur.jpg";images[i].width="55";images[i].height="60";}}


var nick=d.getElementsByTagName('h1');
for(i=0;i<nick.length;i++) {
var s="";
s=nick[i].innerHTML;
if(s.substr(0,12)=='caladorion') {
alert(nick[i].innerHTML)
alert(nick[i].outerHTML);

nick[i].outerHTML='CALADORION';
break;}}

for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Fakta$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML +'<br><img src="http://i6.photobucket.com/albums/y204/elazn/imagent.gif">'
akt.innerHTML = akt.innerHTML + '</strong><br></font><font color="#ff0000">&nbsp; <font color="#ffffff"><a href="http://userscripts.org/scripts/source/35401.user.js" style="text-decoration: none;"><input class="button" value="Oppdatering" name="send" type="submit"></a><br><br><div align="center"><font size="1"><font color="#ff6600">&copy;2008</font> <font color="#000000"><a href="http://www.nettby.no/user/index.php?user_id=494015">Caladorion</a></font></font></div>';
}
}
//CALADORION ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Informasjon$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}
akt.innerHTML = akt.innerHTML + '<div id="FAVORITT"></div>';
akt.innerHTML = akt.innerHTML + '<div id="Randomvenn"></div>';
}
}
//CALADORION ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Din aktivitet$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {
akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}

akt.innerHTML = akt.innerHTML + '';
akt.innerHTML = akt.innerHTML + '<img src="http://www.a-begynder.dk/images/ani-gear.gif">';
akt.innerHTML = akt.innerHTML + '<div id="Random"></div>';
}
}
//CALADORION ©
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/community/article.php?id=1279864&community_id=665594' );
anchor.appendChild( document.createTextNode( 'Agenter på nettby' ) );
document.getElementById( 'Randomvenn' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/meet/superstars.php' );
anchor.appendChild( document.createTextNode( 'Superstjerner' ) );
document.getElementById( 'FAVORITT' ).appendChild( anchor );

var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/user/index.php?user_id=' + Math.round( Math.random() * 959755 ) );
anchor.appendChild( document.createTextNode( 'Random profil' ) );
document.getElementById( 'Random' ).appendChild( anchor );

function poeng(e){try{e.innerHTML=e.innerHTML.replace(/Poeng i dag/,"Poeng du har i dag").replace(/(\d*)\/20\)/,"--0--)").replace(/Poeng totalt/,"Jeg har totalt").replace(/\(\d*\/2000\)/,"(2001/2000)").replace(/Bling-O-Meter:/,":");
var im=e.getElementsByTagName('img');
var is=im[0].parentNode.style;is.width='200px';
is.background='url(http://i38.tinypic.com/sfyovm.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=100)";
is=im[1].parentNode.style;is.width='200px';is.background='url(http://i38.tinypic.com/2en16ba.jpg)';is.opacity="0.9";
if(is.filter)is.filter="alpha(opacity=90)";
}catch(err){}};
{var d;
for(var i=window.document.getElementsByTagName('div').length;i&&(d=window.document.getElementsByTagName('div')[--i]);)
{switch(d.innerHTML){case 'Din aktivitet':case 'Finn borger':case 'Inviter en venn til nettby':case '<span>Sist pålogget </span>':case 'Sist påloggede på nettby':case 'Informasjon':d.className="rtl";break;case 'Aktivitet':poeng(window.document.getElementsByTagName('div')[i+1]);

   break;
  }
 }
}


for(i=0;i<fonts.length;i++)
{if(fonts[i].innerHTML=="Borgermester"){fonts[i].innerHTML='<img src="http://img227.imageshack.us/img227/5271/borjemestergfyn2.gif">';
fonts[i].style.color="#3c3c3c";break;}}

for(i=0;i<links.length;i++) {
 if(links[i].innerHTML=="mujaff") {
  links[i].innerHTML="ProfildesignernesLeder";
  links[i].style.color="#00FF00"; {
   if(links[i].href='http://www.nettby.no/user/index.php?user_id=494015');
   break;
  }
 }
}



//CALADORION ©
//Setter Fakta
var fakta=window.document.getElementsByTagName('div');
for(q=0;q<fakta.length;q++){
	if(fakta[q].innerHTML=="Fakta")
		{fakta[q].innerHTML="noen FaktaSetninger om meg:";
		break;
	}
}

//Setter Sist innom
var innom=window.document.getElementsByTagName('span');
for(q=0;q<innom.length;q++){





	if(innom[q].innerHTML=="Sist innom")
		{innom[q].innerHTML="Disse har vært her før deg:";
		break;
	}
}

//Setter status (pålogget)
var imON=window.document.getElementsByTagName('div');
for(q=0;q<imON.length;q++){
	if(imON[q].innerHTML=="Pålogget")
		//{imON[q].innerHTML="<center><blink>Jeg er på nettby </blink></center>";
		{imON[q].innerHTML='<center><blink><img src="http://xs128.xs.to/xs128/08220/24et6wl_png130.png"></blink></center>';
		break;
	}
}
//CALADORION ©
for (var c = 0; c < window.document.getElementsByTagName('div').length; c++){
if (/^Inviter en venn til nettby$/.test(window.document.getElementsByTagName('div')[c].innerHTML)) {


akt = window.document.getElementsByTagName('div')[c].nextSibling;
while ((akt.nodeType != 1) || (akt.nodeName != 'DIV')){
akt=akt.nextSibling;
}


akt.innerHTML = akt.innerHTML + '<img src="http://i32.tinypic.com/1ysjf4.jpg">';
akt.innerHTML = akt.innerHTML + '<div id="Test"></div>';
}
}
var anchor = document.createElement( 'a' );
anchor.setAttribute( 'href', 'http://www.nettby.no/community/news.php?community_id=1058604' );
anchor.appendChild( document.createTextNode( 'Nettbys profildesignere' ) );
document.getElementById( 'Test' ).appendChild( anchor );

var ffghj = document.createElement('link');
ffghj.setAttribute('type', 'image/x-icon');
ffghj.setAttribute('rel', 'shortcut icon');
ffghj.setAttribute('href', 'http://i44.tinypic.com/2i1e1dw.png');
var head = document.getElementsByTagName('head')[0];
head.appendChild(ffghj);
