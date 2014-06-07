// ==UserScript==
// @name           smileys jvc
// @namespace      smileys jvc
// @description    smileys jvc
// @include        http://hapbook2.ning.com/*
// Script dévellopé par Bastien \\(Bastnt\\)
// le reste par Monkay \\( shugah@live.fr \\)
// http://bastnt.free.fr/
// bastien45@gmail.com
// ==/UserScript==

//Mémorisation du document dans la variable 'chaine'.
var chaine=document.body.innerHTML;
// == Remplacement de tous les smiles JVC == 

var reg=new RegExp(":-\\(\\(", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/15067600.gif' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/212.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/hapggg.gif' />");

var reg=new RegExp("(:lol:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/32.gif' />");

var reg=new RegExp("(:)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/aia.gif' />");

var reg=new RegExp("(:-)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/yny.gif' />");

var reg=new RegExp("(:-)\\)\\)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/23.gif' />");

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/24.gif' />");

var reg=new RegExp("(:oui:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/37.gif' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/26.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/39.gif' />");

var reg=new RegExp("(:-D)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/40.gif' />");

var reg=new RegExp("(:rire2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/41.gif' />");

var reg=new RegExp("(:o)\\)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/12.gif' />");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/36033780.gif' />");

var reg=new RegExp("(:sournois:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/67084149.gif' />");

var reg=new RegExp("(:gni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/62015186.gif' />");

var reg=new RegExp("(:merci:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/58057146.gif' />");

var reg=new RegExp("(:rechercher:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/38090116.gif' />");

var reg=new RegExp("(:gne:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/51078659.gif' />");

var reg=new RegExp("(:hs:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/64065276.gif' />");

var reg=new RegExp("(:snif:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/20078876.gif' />");

var reg=new RegExp("(:snif2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/13094068.gif' />");

var reg=new RegExp("(:ouch:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/22.gif' />");

var reg=new RegExp("(:ouch2:)", "g");
chaine=chaine.replace(reg,"<img border=0 srchttp://www.noelshack.com/uploads/57035228.gif' />");

var reg=new RegExp("(:nonnon:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/25.gif' />");

var reg=new RegExp("(:non2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/33.gif' />");

var reg=new RegExp("(:non:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/35.gif' />");

var reg=new RegExp("(:nah:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/19033512.gif' />");

var reg=new RegExp("(:hum:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/68067016.gif' />");

var reg=new RegExp("(:bravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/69.gif' />");

var reg=new RegExp("(:svp:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/59.gif' />");

var reg=new RegExp("(:hello:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/29018062.gif' />");

var reg=new RegExp("(:banzai:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/70.gif' />");

var reg=new RegExp("(:gba:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/17048936.gif' />");

var reg=new RegExp("(:mac:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/16003577.gif' />");

var reg=new RegExp("(:pacg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/9017206.gif' />");

var reg=new RegExp("(:pacd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/10043858.gif' />");

var reg=new RegExp("(:-p)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/31.gif' />");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='hhttp://www.noelshack.com/uploads/47001898.gif' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/54085077.gif' />");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/50095796.gif' />");

var reg=new RegExp("(:fier:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/53052210.gif' />");

var reg=new RegExp("(:sarcastic:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/43.gif' />");

var reg=new RegExp("(:doute:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/28.giff' />");

var reg=new RegExp("(:malade:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/8039019.gif' />");

var reg=new RegExp("(:ange:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/60066566.gif' />");

var reg=new RegExp("(:desole:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/65065335.gif' />");

var reg=new RegExp("(:sors:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/56097670.gif' />");

var reg=new RegExp("(:up:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/44042148.gif' />");

var reg=new RegExp("(:dpdr:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/49014498.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/71.gif' />");

var reg=new RegExp("(:g)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/3005758.gif' />");

var reg=new RegExp("(:d)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/4080857.gif' />");

var reg=new RegExp("(:cd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/5041860.gif' />");

var reg=new RegExp("(:globe:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/6045145.gif' />");

var reg=new RegExp("(:question:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/2077487.gif' />");

var reg=new RegExp("(:mort:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/21005492.gif' />");

var reg=new RegExp("(:sleep:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/27.gif' />");

var reg=new RegExp("(:honte:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/30.gif' />");

var reg=new RegExp("(:monoeil:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/34rcr.gif' />");

var reg=new RegExp("(:rouge:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/55041365.gif' />");

var reg=new RegExp("(:fete:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.hapshack.com/images/66vhv.gif' />");

var reg=new RegExp("(:diable:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/61066601.gif' />");

var reg=new RegExp("(:spoiler:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/63062107.gif' />");

var reg=new RegExp("(:salut:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/42021756.gif' />");

var reg=new RegExp("(:bye:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/48087887.gif' />");

var reg=new RegExp("(:dehors:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/52038098.gif' />");

var reg=new RegExp("(:p)\\)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/7059261.gif' />");

var reg=new RegExp(":\\(", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/45081268.gif' />");

var reg=new RegExp(":-\\(", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/uploads/14034744.gif' />");


// == Fin Remplacement de tous les smiles JVC == 

//Application au Document.
document.body.innerHTML=chaine;