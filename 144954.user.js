// ==UserScript==
// @name           jp2gmd
// @include        http://www.karachan.org/*
// @author         Poniaczek
// @version        1.1.3
// @description    Zmiana nazwy /b/ na Random, BBCode, Wordfiltry, Email, Auto captcha, Anty smalec, Anty youtube autoplay, Tajne boardy i poprawny adres /sek/ na pasku  
// ==/UserScript==

document.title = document.title.replace('Homoseksualne prawiczki i miłośnicy drobiu', 'Random'); 
document.body.innerHTML = document.body.innerHTML.replace('Homoseksualne prawiczki i miłośnicy drobiu', 'Random');
document.body.innerHTML = document.body.innerHTML.replace('background-image:url(data:image/gif;base64,', '<--//');
document.body.innerHTML = document.body.innerHTML.replace('/css/images/empty_captcha.png"', 'http://www.karachan.org/captcha.php?" ');    
document.body.innerHTML = document.body.innerHTML.replace('?autoplay=1"', '?autoplay=0"');
//document.body.innerHTML = document.body.innerHTML.replace('height="1"', 'height="200"');    
//document.body.innerHTML = document.body.innerHTML.replace('width="1"', 'width="200"');
document.body.innerHTML = document.body.innerHTML.replace('"/sek/"', '"http://sek.karachan.org/"');
document.body.innerHTML = document.body.innerHTML.replace('>int</a>', '>int</a> / <a href="/&#1101;&#1083;&#1080;&#1090;&#1072;/" title="ruski">ruski</a> / <a href="/wykop/" title="wykop">wykop</a>');
  
document.getElementById('postbox').innerHTML += "<input type='button' value=' b ' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' i ' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' u ' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' s ' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' aa ' onclick='tag1=\"[aa]\"; tag2=\"[/aa]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' small ' onclick='tag1=\"[small]\"; tag2=\"[/small]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' code ' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
document.getElementById('postbox').innerHTML += " <input type='button' value=' spoiler ' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";

if(location.pathname.indexOf('/b/') >= 0)
    document.getElementById('postbox').innerHTML += " <select onChange='javascript:word=this.options[this.selectedIndex].value; txt=document.postform.message; s1=(txt.value).substring(0,txt.selectionEnd); s2=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+word+s2; txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><option value='' selected='selected'>WORDFILTRY</option><option value='#nowocioty'>STAROCIOTY PAMIĘTAJĄ</option><option value='#gimbo'>xD</option><option value='#penis'>pisiorek</option><option value='#wagina'>cipuszka</option><option value='#m__b'>groźny WYKOPEK wykryty</option><option value='#homoś'>pedał</option><option value='#lasoupeauxchoux'>kapuśniaczek</option></select>";

for(i = 0;i < document.getElementsByTagName("input").length;i++) {
    if(document.getElementsByTagName("input")[i].name == "em") {
        document.getElementsByTagName("input")[i].name = "kurahen";
		    document.getElementsByTagName("input")[i].type = "hidden";
		    document.getElementsByTagName("input")[i].parentNode.innerHTML = '<select name="em" style="width:100px"><option value="" selected="selected">Bump </option><option value="sage">Sage </option><option value="noko">Noko </option><option value="spoiler">Spoiler </option></select>';
		    break;
    }
}