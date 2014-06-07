// ==UserScript==
// @name           Kurahen.ork 4.0
// @description    Forum narodowo-katolickie.
// @version        4.0
// @include        http://www.karachan.org/*
// @include        http://karachan.org/*
// ==/UserScript==

function Main(){

	var tytul = 'Marlon Brandom'
	var title = document.querySelectorAll('.logo');
	title[0].innerHTML = '<img src="http://www.karachan.org/baners/fandom.php" alt="karachan.org"  width="300" height="106" /><br /><!--<img id="fandom_img" src="/baners/logo54.png" height="106" width="300">--><br>'+tytul;
	document.title = tytul

	var dzie=document.getElementById('postbox');
	dzie.innerHTML+="<input type='button' value=' b ' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' i ' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' u ' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' s ' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' small ' onclick='tag1=\"[small]\"; tag2=\"[/small]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' code ' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' spoiler ' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";

	if(location.pathname.indexOf('/b/')>=0)
		dzie.innerHTML+=" <select onChange='javascript:word=this.options[this.selectedIndex].value; txt=document.postform.message; s1=(txt.value).substring(0,txt.selectionEnd); s2=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+word+s2; txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><option value='' selected='selected'>WORDFILTRY</option><option value='#nowocioty'>STAROCIOTY PAMIĘTAJĄ</option><option value='#gimbo'>xD</option><option value='#penis'>pisiorek</option><option value='#wagina'>cipuszka</option><option value='#m__b'>groźny WYKOPEK wykryty</option><option value='#homoś'>pedał</option><option value='#lasoupeauxchoux'>kapuśniaczek</option></select>";
	
	var inputs=document.getElementsByTagName("input");
	for(i=0;i<inputs.length;i++){
		if(inputs[i].name=="em"){
			inputs[i].name="kurahen";
			inputs[i].type="hidden";
			dzie=inputs[i].parentNode;
			dzie.innerHTML='<select name="em" style="width:100px"><option value="" selected="selected">Podbij </option><option value="sage">Sage </option><option value="noko">Noko </option></select>';
		}
		if(inputs[i].name=="imagefile")
		{
			dzie=inputs[i].parentNode;
			dzie.innerHTML+='<br><input type="text" name="embed" size="28" maxlength="75" accesskey="e" /> <select name="embedtype"><option value="youtube">Youtube</option><br>[<input type="checkbox" name="nofile" id="nofile" accesskey="q" /><label for="nofile"> Brak pliku</label>]';
			break;
		}
	}
	
	var kapcza=document.getElementById('captchaimage');
	kapcza.src='http://www.karachan.org/captcha.php?'+Math.random();
}
window.addEventListener("load", Main, false);