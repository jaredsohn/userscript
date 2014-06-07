// ==UserScript==
// @name        Deezer Max 1.4
// @namespace   Moon6child
// @description Profitez un max de Deezer ! D'un seul clic trouvez les paroles, tablatures, mp3 de vos musiques préférées ! Et en bonus les publicités vocales et la limitation d'écoute sont supprimées !
// @include     http://*.deezer.*/*
// ==/UserScript==
function StartLyrics(){
var dir = document.getElementById('options').getElementsByTagName('ul')[0];
var div = document.createElement('div');
div.setAttribute("id", "divlink");
div.setAttribute("style", "text-align:center;");
dir.appendChild(div);
var dirdiv = dir.getElementsByTagName('div')[0];
var tdiv = document.createElement('div');
tdiv.setAttribute("id", "divtlink");
tdiv.setAttribute("style", "display:none; text-align:center; background-color:#272727; border-radius:6px; box-shadow: 2px 2px 5px 0px #656565;");
tdiv.setAttribute("onMouseOver", "javascript:this.style.display='block';");
tdiv.setAttribute("onMouseOut", "javascript:this.style.display='none';");
dir.appendChild(tdiv);
var ldiv = document.createElement('div');
ldiv.setAttribute("id", "divllink");
ldiv.setAttribute("style", "display:none; text-align:center; background-color:#272727; border-radius:6px; box-shadow: 2px 2px 5px 0px #656565;");
ldiv.setAttribute("onMouseOver", "javascript:this.style.display='block';");
ldiv.setAttribute("onMouseOut", "javascript:this.style.display='none';");
dir.appendChild(ldiv);
var link = document.createElement('a');
link.setAttribute("onMouseOver", "javascript:document.getElementById('divllink').style.display='block';");
link.setAttribute("onMouseOut", "javascript:document.getElementById('divllink').style.display='none';");
var txt = document.createTextNode('Lyrics');
link.appendChild(txt);
var tlink = document.createElement('a');
tlink.setAttribute("onMouseOver", "javascript:document.getElementById('divtlink').style.display='block';");
tlink.setAttribute("onMouseOut", "javascript:document.getElementById('divtlink').style.display='none';");
var ttxt = document.createTextNode('Tabs');
tlink.appendChild(ttxt);
var font = document.createElement('font');
font.setAttribute('color', '#0D7BBC');
var fonttxt = document.createTextNode(' | ');
font.appendChild(fonttxt);
dirdiv.appendChild(link);
dirdiv.appendChild(font);
dirdiv.appendChild(tlink);
Lyrics();
}
function Lyrics(){
var dir2 = document.getElementById('options').getElementsByTagName('ul')[0];
var dirtdiv = dir2.getElementsByTagName('div')[1];
var dirldiv = dir2.getElementsByTagName('div')[2];
var elements = document.getElementById('current');
var band = elements.getElementsByTagName('a')[1].innerHTML;
var song = elements.getElementsByTagName('a')[0].innerHTML.split(' (')[0].split(' [')[0];
var l1adress = 'http://search.letssingit.com/cgi-exe/am.cgi?a=search&l=archive&s=' + band + ' ' + song;
var l2adress = 'http://www.lyricsmode.com/search.php?what=bands&s=' + band + '&what=songs&s=' + song;
var t1adress = 'http://www.ultimate-guitar.com/search.php?value=' + band + ' ' + song + '&search_type=title';
var t2adress = 'http://www.911tabs.com/search.php?search=' + band + '&type=band&search=' + song + '&type=song';   
var l1link = document.createElement('a');
l1link.setAttribute('href', l1adress);
l1link.setAttribute('target', '_blank');
l1link.setAttribute("onMouseOver", "javascript:this.style.color='#0D7BBC';");
l1link.setAttribute("onMouseOut", "javascript:this.style.color='#FFFFFF';");
var l1txt = document.createTextNode('Lets Sing It');
l1link.appendChild(l1txt);
var l2link = document.createElement('a');
l2link.setAttribute('href', l2adress);
l2link.setAttribute('target', '_blank');
l2link.setAttribute("onMouseOver", "javascript:this.style.color='#0D7BBC';");
l2link.setAttribute("onMouseOut", "javascript:this.style.color='#FFFFFF';");
var l2txt = document.createTextNode('Lyrics Mode');
l2link.appendChild(l2txt);
var t1link = document.createElement('a');
t1link.setAttribute('href', t1adress);
t1link.setAttribute('target', '_blank');
t1link.setAttribute("onMouseOver", "javascript:this.style.color='#0D7BBC';");
t1link.setAttribute("onMouseOut", "javascript:this.style.color='#FFFFFF';");
var t1txt = document.createTextNode('Ultimate Guitare');
t1link.appendChild(t1txt);
var t2link = document.createElement('a');
t2link.setAttribute('href', t2adress);
t2link.setAttribute('target', '_blank');
t2link.setAttribute("onMouseOver", "javascript:this.style.color='#0D7BBC';");
t2link.setAttribute("onMouseOut", "javascript:this.style.color='#FFFFFF';");
var t2txt = document.createTextNode('911Tabs');
t2link.appendChild(t2txt);
var tbr = document.createElement('br');
var lbr = document.createElement('br');
dirldiv.appendChild(l1link);
dirldiv.appendChild(lbr);
dirldiv.appendChild(l2link);
dirtdiv.appendChild(t1link);
dirtdiv.appendChild(tbr);
dirtdiv.appendChild(t2link);
}
function DownloadMusic(){
var delements = document.getElementById('current');
var dband = delements.getElementsByTagName('a')[1].innerHTML;
var dsong = delements.getElementsByTagName('a')[0].innerHTML.split(' (')[0].split(' [')[0];
var dadress = 'http://mp3skull.com/mp3/' + dband + '_' + dsong + '.html';
var dlink = document.createElement('a');
dlink.setAttribute('href', dadress);
dlink.setAttribute('target', '_blank');
dlink.setAttribute("onMouseOver", "javascript:this.style.color='#0D7BBC';");
dlink.setAttribute("onMouseOut", "javascript:this.style.color='#FFFFFF';");
var dtxt = document.createTextNode('Download');
dlink.appendChild(dtxt);	
var ddir = document.getElementById('controller');
ddir.appendChild(dlink);					
}
function ListeMax(){
if(document.getElementById('naboo_album')){
var ntrackmax=0;
var albummax = document.getElementById('naboo_datagrid');
var trackmax = albummax.getElementsByTagName('dl');
var itrackmax = albummax.getElementsByTagName('dl')[ntrackmax].getElementsByTagName('dd')[2];
var itrackmax2;
var itrackmax3;
var maxdivreset = document.createElement('div');
maxdivreset.setAttribute("id", "divmaxreset");
albummax.appendChild(maxdivreset);
for(ntrackmax=0;ntrackmax<trackmax.length;ntrackmax++){
itrackmax2 = albummax.getElementsByTagName('dl')[ntrackmax];
if(itrackmax2.id){
itrackmax3 = itrackmax2.getElementsByTagName('dd')[2];
var maxdiv = document.createElement('div');
maxdiv.setAttribute("id", "divmax" + ntrackmax);
maxdiv.setAttribute("style", "border:0;min-width:30px;margin-right:20px;float:right;");
itrackmax3.appendChild(maxdiv);
var nametrackmax = itrackmax3.getElementsByTagName('a')[0].innerHTML.split(' (')[0].split(' [')[0];
var bandmax = document.getElementById('naboo_album_artist').getElementsByTagName('a')[0].innerHTML;
var maxadress1 = 'http://www.lyricsmode.com/search.php?what=bands&s=' + bandmax + '&what=songs&s=' + nametrackmax;
var maxadress2 = 'http://www.911tabs.com/search.php?search=' + bandmax + '&type=band&search=' + nametrackmax + '&type=song';
var maxadress3 = 'http://mp3skull.com/mp3/' + bandmax + '_' + nametrackmax + '.html';
var diramax = document.getElementById('divmax' + ntrackmax);
var amax1 = document.createElement('a');
amax1.setAttribute("href", maxadress1);
amax1.setAttribute("target", "_blank");
amax1.setAttribute("id", "amaxlyrics" + ntrackmax);
diramax.appendChild(amax1);
var dirimax1 = document.getElementById('amaxlyrics' + ntrackmax);
var imax1 = document.createElement('img');
imax1.setAttribute("src", "http://www.apreh.org/image/L.gif");
imax1.setAttribute("style", "width:18px;height:18px;margin-right:5px;opacity:1;");
imax1.setAttribute("onMouseOver", "javascript:this.style.opacity='0.5';");
imax1.setAttribute("onMouseOut", "javascript:this.style.opacity='1';");
imax1.setAttribute("alt", "L");
dirimax1.appendChild(imax1);
var amax2 = document.createElement('a');
amax2.setAttribute("href", maxadress2);
amax2.setAttribute("target", "_blank");
amax2.setAttribute("id", "amaxtabs" + ntrackmax);
diramax.appendChild(amax2);
var dirimax2 = document.getElementById('amaxtabs' + ntrackmax);
var imax2 = document.createElement('img');
imax2.setAttribute("src", "http://www.apreh.org/image/T.gif");
imax2.setAttribute("style", "width:18px;height:18px;margin-right:5px;opacity:1;");
imax2.setAttribute("onMouseOver", "javascript:this.style.opacity='0.5';");
imax2.setAttribute("onMouseOut", "javascript:this.style.opacity='1';");
imax2.setAttribute("alt", "T");
dirimax2.appendChild(imax2);
var amax3 = document.createElement('a');
amax3.setAttribute("href", maxadress3);
amax3.setAttribute("target", "_blank");
amax3.setAttribute("id", "amaxdownload" + ntrackmax);
diramax.appendChild(amax3);
var dirimax3 = document.getElementById('amaxdownload' + ntrackmax);
var imax3 = document.createElement('img');
imax3.setAttribute("src", "http://www.apreh.org/image/D.gif");
imax3.setAttribute("style", "width:18px;height:18px;margin-right:5px;opacity:1;");
imax3.setAttribute("onMouseOver", "javascript:this.style.opacity='0.5';");
imax3.setAttribute("onMouseOut", "javascript:this.style.opacity='1';");
imax3.setAttribute("alt", "D");
dirimax3.appendChild(imax3);
}
}
}
}
function disableAds() {
var source = "dzPlayer.setForbiddenListen=function(status){try{if(dzPlayer.version==1){dzPlayer.user_status.limited=false;this.trigger('audioPlayer_setLock',[dzPlayer.user_status.limited])}}catch(e){console.log(e.message,e.stack)}};$('.timeline_t-b .remaining').css('background','green'); dzPlayer.setForbiddenListen(false);var hqQuality=false;$('#btnHq').live('click',function(){dzPlayer.setHq(!hqQuality);hqQuality=!hqQuality;return false;});";
var script = document.createElement('script');
script.setAttribute("type", "application/javascript" );
script.textContent = source;
document.documentElement.appendChild(script);
}
function Adsban(){
var diraban = document.getElementById('top-nav');
var aban = document.createElement('a');
aban.setAttribute("href", "http://concert-stream.fr/");
aban.setAttribute("target", "_blank");
aban.setAttribute("id", "banconcertstream");
diraban.appendChild(aban);
var diriban = document.getElementById('banconcertstream');
var iban = document.createElement('img');
iban.setAttribute("src", "http://concert-stream.fr/images/ban350x38.jpeg");
iban.setAttribute("alt", "");
iban.setAttribute("style", "position:absolute;margin-left:20px;width:400px;height:38px;");
diriban.appendChild(iban);
}
function DeleteLyrics(){
var dirdel = document.getElementById('options').getElementsByTagName('ul')[0];
var dirtdivdel = dirdel.getElementsByTagName('div')[1];
var dirldivdel = dirdel.getElementsByTagName('div')[2];
var l1del = dirldivdel.getElementsByTagName('a')[0];
var l2del = dirldivdel.getElementsByTagName('a')[1];
var t1del = dirtdivdel.getElementsByTagName('a')[0];
var t2del = dirtdivdel.getElementsByTagName('a')[1];
var lbrdel = dirldivdel.getElementsByTagName('br')[0];
dirldivdel.removeChild(l1del);
dirldivdel.removeChild(lbrdel);
dirldivdel.removeChild(l2del);
var tbrdel = dirtdivdel.getElementsByTagName('br')[0];
dirtdivdel.removeChild(t1del);
dirtdivdel.removeChild(tbrdel);
dirtdivdel.removeChild(t2del);
Lyrics();
}
function DownloadDelete(){
var ddir = document.getElementById('controller');
var ddel = ddir.getElementsByTagName('a')[8];
ddir.removeChild(ddel);
DownloadMusic();
}
function ListeMaxDelete(){
if(document.getElementById('divmaxreset')){
var ntrackmaxdel=0;
var trackmaxdel = document.getElementById('naboo_datagrid').getElementsByTagName('dl');
for(ntrackmaxdel=0;ntrackmaxdel<trackmaxdel.length;ntrackmaxdel++){
var dirmaxdel = document.getElementById('naboo_datagrid').getElementsByTagName('dl')[ntrackmaxdel];
if(dirmaxdel.id){
var dirmaxdel2 = dirmaxdel.getElementsByTagName('dd')[2];
var divmaxdel = document.getElementById('divmax' + ntrackmaxdel);
dirmaxdel2.removeChild(divmaxdel);
}
}
var dirmaxresetdel = document.getElementById('naboo_datagrid');
var divmaxresetdel = document.getElementById('divmaxreset');
dirmaxresetdel.removeChild(divmaxresetdel);
ListeMax();
}
else{
ListeMax();
}
}
disableAds();
StartLyrics();
DownloadMusic();
Adsban();
setInterval(ListeMaxDelete, 4000);
setInterval(disableAds, 5000);
setInterval(DeleteLyrics, 1000);
setInterval(DownloadDelete, 1000);