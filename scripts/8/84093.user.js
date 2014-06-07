// ==UserScript==
// @name           toast1
// @namespace      toast1
// @description    toast1
// @include        *
// ==/UserScript==

//Mémorisation du document dans la variable 'chaine'.
var chaine=document.body.innerHTML;
// == Remplacement de tous les smiles JVC == 

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/11074448.gif' />");

var reg=new RegExp("(:desu:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/voir/130309/desu048198.png' />");

var reg=new RegExp("(:jap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/up/aab/jap-96e0c6f067.png' />");

var reg=new RegExp("(:})", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/clein092566.gif' />");

var reg=new RegExp("(:{)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/colere090258.gif' />");

var reg=new RegExp("(:\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/1077426.gif' />");

var reg=new RegExp("(:-\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/46039312.gif' />");

var reg=new RegExp("(:hap:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/voir/010309/hap096754.gif' />");

var reg=new RegExp("(:fake:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/fake046934.png' />");

var reg=new RegExp("(:jerry:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/jerry008711.png' />");

var reg=new RegExp("(:ah ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/ahok1028448.png' />");

var reg=new RegExp("(:ah ok2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/ahok2059601.png' />");

var reg=new RegExp("(:btg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/btg009718.png' />");

var reg=new RegExp("(:chaud:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/chaud021624.png' />");

var reg=new RegExp("(:sweet2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/sweet007664.gif' />");

var reg=new RegExp("(:owned:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/owned089683.png' />");

var reg=new RegExp("(:pwned:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/pwned000187.png' />");

var reg=new RegExp("(:salut:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/salut011933.png' />");

var reg=new RegExp("(:cake:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/cake062801.png' />");

var reg=new RegExp("(:sweet:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/sweet025112.png' />");

var reg=new RegExp("(:ok2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/ok090348.png' />");

var reg=new RegExp("(:-\\)\\)\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://image.jeuxvideo.fr/smileys/23.gif' />");

var reg=new RegExp("(:content:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/content041648.gif' />");

var reg=new RegExp("(:oui:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/oui044116.gif' />");

var reg=new RegExp("(:down:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/down071594.png' />");

var reg=new RegExp("(:cool:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/cool037395.gif' />");

var reg=new RegExp("(:rire:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/rire038256.gif' />");

var reg=new RegExp("(:-D)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/40030964.gif' />");

var reg=new RegExp("(:rire2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/rire2025447.gif' />");

var reg=new RegExp("(:o\\)\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/12093930.gif' />");

var reg=new RegExp("(:ok:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/36033780.gif' />");

var reg=new RegExp("(:sournois:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/67084149.gif' />");

var reg=new RegExp("(:gni:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/62015186.gif' />");

var reg=new RegExp("(:merci:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/58057146.gif' />");

var reg=new RegExp("(:rechercher:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/rechercher073271.gif' />");

var reg=new RegExp("(:gne:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/51078659.gif' />");

var reg=new RegExp("(:noel:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/11074448.gif' />");

var reg=new RegExp("(:hs:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/64065276.gif' />");

var reg=new RegExp("(:snif:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/20078876.gif' />");

var reg=new RegExp("(:snif2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/13094068.gif' />");

var reg=new RegExp("(:ouch:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/ouch086400.gif' />");

var reg=new RegExp("(:ouch2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/57035228.gif' />");

var reg=new RegExp("(:p\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/7059261.gif' />");

var reg=new RegExp("(:\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/45081268.gif' />");

var reg=new RegExp("(:-\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/14034744.gif' />");

var reg=new RegExp("(:-\\(\\()", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/15067600.gif' />");

var reg=new RegExp("(:nonnon:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/nonnon041875.gif' />");

var reg=new RegExp("(:non2:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/non2091049.gif' />");

var reg=new RegExp("(:non:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/non027032.gif' />");

var reg=new RegExp("(:nah:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/19033512.gif' />");

var reg=new RegExp("(:hum:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/68067016.gif' />");

var reg=new RegExp("(:bravo:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.com/up/aac/69-3bb4af9f58.gif' />");

var reg=new RegExp("(:svp:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/59090572.gif' />");

var reg=new RegExp("(:hello:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/29018062.gif' />");

var reg=new RegExp("(:lol:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/lol086844.gif' />");

var reg=new RegExp("(:banzai:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/banzai095668.gif' />");

var reg=new RegExp("(:gba:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/17048936.gif' />");

var reg=new RegExp("(:mac:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/16003577.gif' />");

var reg=new RegExp("(:pacg:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/9017206.gif' />");

var reg=new RegExp("(:pacd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/10043858.gif' />");

var reg=new RegExp("(:-p)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/langue088182.gif' />");

var reg=new RegExp("(:peur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/47001898.gif' />");

var reg=new RegExp("(:coeur:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/54085077.gif' />");

var reg=new RegExp("(:fou:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/50095796.gif' />");

var reg=new RegExp("(:fier:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/53052210.gif' />");

var reg=new RegExp("(:sarcastic:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/sarc065750.gif' />");

var reg=new RegExp("(:doute:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/doute084843.gif' />");

var reg=new RegExp("(:malade:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/8039019.gif' />");

var reg=new RegExp("(:ange:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/60066566.gif' />");

var reg=new RegExp("(:desole:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/65065335.gif' />");

var reg=new RegExp("(:sors:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/56097670.gif' />");

var reg=new RegExp("(:up:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/44042148.gif' />");

var reg=new RegExp("(:dpdr:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/49014498.gif' />");

var reg=new RegExp("(:bave:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://img30.imageshack.us/img30/2733/bave.gif' />");

var reg=new RegExp("(:g\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/3005758.gif' />");

var reg=new RegExp("(:d\\))", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/4080857.gif' />");

var reg=new RegExp("(:cd:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/5041860.gif' />");

var reg=new RegExp("(:globe:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/6045145.gif' />");

var reg=new RegExp("(:question:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/2077487.gif' />");

var reg=new RegExp("(:mort:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/21005492.gif' />");

var reg=new RegExp("(:sleep:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/sleep092112.gif' />");

var reg=new RegExp("(:honte:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/honte064844.gif' />");

var reg=new RegExp("(:monoeil:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/monoeil041720.gif' />");

var reg=new RegExp("(:rouge:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/55041365.gif' />");

var reg=new RegExp("(:fete:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/fete024440.gif' />");

var reg=new RegExp("(:diable:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/61066601.gif' />");

var reg=new RegExp("(:spoiler:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/63062107.gif' />");

var reg=new RegExp("(:salut:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/42021756.gif' />");

var reg=new RegExp("(:bye:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/48087887.gif' />");

var reg=new RegExp("(:dehors:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/52038098.gif' />");

var reg=new RegExp("(:chuck:)", "g");
chaine=chaine.replace(reg,"<img border=0 src='http://www.noelshack.fr/uploads/Chuck056744027285.png' />");

// == Fin Remplacement de tous les smiles JVC == 

//Application au Document.
alert('toast')
document.body.innerHTML=chaine;