// ==UserScript==
// @name        Karachan.org S.H.I.E.L.D.
// @namespace   http://userscripts.org/users/529059
// @description Blokuje zabezpieczenia dla nowokurew na kardigan 3.0(mitsuba) - skrypt jest na bieżąco aktualizowany.
// @include     http://www.karachan.org/*
// @include     http://karachan.org/*
// @exclude     http://www.karachan.org/*/src/*
// @exclude     http://karachan.org/*/src/*
// @version     4.2.2
// @author      Astondvz
// @run-at document-start
// ==/UserScript==



if (typeof document.origGEBTN == "undefined") {
  document.origGEBTN = document.getElementsByTagName;
  document.getElementsByTagName = function(a) {
    if (a == "blockquote") return [];
    else return document.origGEBTN(a);
  }
}

var blacklist = 'script[src$="html5shiv.js"], iframe[src$="autoplay=1"], param[value="wyborcza.swf"], embed[src$="wyborcza.swf"]';


function replaceBoardName(name) { 
document.title = name; 
document.getElementsByClassName('boardTitle')[0].innerHTML = name; 
} 
// To dla niekuców
replaceBoardName('Kurahen.gov')

document.body.innerHTML += document.getElementById("boardLinks").innerHTML


// KARDIGAN PREMIUM, NAŁ AVAIBLE FOR MITSUBA

// A dalej juz dla kuców

document.getElementsByClassName("boardTitle")[0].innerHTML = tytul
document.title = tytul
//document.body.innerHTML += document.getElementById("boardLinks").innerHTML;

var lel = document.getElementById("boardLinks");
lel.innerHTML = lel.innerHTML.replace('>z</a>', '>z</a> / <a href="../&#1101;&#1083;&#1080;&#1090;&#1072;/" title="Ruski">ruski</a> / <a href="../wykop/" title="Wykop">wykop</a> / <a href="../noc/" title="Nocny">noc</a>');

var dzie = document.getElementById('postform');
var chuj = dzie.innerHTML
dzie.innerHTML="<center><input type='button' value=' b ' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'> <input type='button' value=' i ' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><input type='button' value=' u ' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><input type='button' value=' s ' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><input type='button' value=' small ' onclick='tag1=\"[small]\"; tag2=\"[/small]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><input type='button' value=' code ' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><input type='button' value=' spoiler ' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.getElementsByTagName(\"textarea\")[0]; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'> <select onChange='javascript:word=this.options[this.selectedIndex].value; txt=document.getElementsByTagName(\"textarea\")[0]; s1=(txt.value).substring(0,txt.selectionEnd); s2=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+word+s2; txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><option value='' selected='selected'>WORDFILTRY</option><option value='#nowocioty'>STAROCIOTY PAMIĘTAJĄ</option><option value='#gimbo'>xD</option><option value='#penis'>pisiorek</option><option value='#wagina'>cipuszka</option><option value='#m__b'>groźny WYKOPEK wykryty</option><option value='#homoś'>pedał</option></select></center>";
dzie.innerHTML+=chuj;
var inputs = document.getElementsByTagName("input");
for (i in inputs) {
    if (inputs[i].name == "email") {
        inputs[i].name = "kurahen";
        inputs[i].type = "hidden";
        dzie = inputs[i].parentNode;
        dzie.innerHTML = '<select name="email" style="width:200px"><option value="" selected="selected">bump</option><option value="sage">sage</option></select>';
    }
}