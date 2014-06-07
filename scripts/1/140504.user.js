// ==UserScript==
// @name           KiwiszonGold
// @description    Dodaje buttony BBcode, listę emotek z f23, zamienia input na select w emailu (podbij, sage lub noko)
// @version        1.1
// @include        http://www.kiwiszon.org/*
// @include        http://kiwiszon.org/*
// ==/UserScript==
function Main(){
	var dzie=document.getElementById('postbox');
	dzie.innerHTML+=" <input type='button' value=' b ' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){ s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' i ' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){ s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' u ' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){ s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' s ' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){ s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' code ' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' spoiler ' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart); s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd); s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	 txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";


dzie.innerHTML+=" <select onChange='javascript:word=this.options[this.selectedIndex].value; txt=document.postform.message; s1=(txt.value).substring(0,txt.selectionEnd); s2=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+word+s2; txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><option value='' selected='selected'>EMOTKI</option><option value=':)'>:)</option><option value=';)'>;</option><option value=':('>:(</option><option value=':D'>:D</option><option value=':O'>:O</option><option value=':P'>:P</option><option value='[beksa]'>[beksa]</option><option value='[cool]'>[cool]</option><option value='[kwiat]'>[kwiat]</option><option value='[czesc]'>[czesc]</option><option value='[love]'>[love]</option><option value='[spioch]'>[spioch]</option><option value='[kiss]'>[kiss]</option><option value='[zly]'>[zly]</option><option value='[wsciekly]'>[wsciekly]</option><option value='[ziewam]'>[ziewam]</option></select>";
	
	var inputs=document.getElementsByTagName("input");
	for(i=0;i<inputs.length;i++){
		if(inputs[i].name=="em"){
			inputs[i].name="kurahen";
			inputs[i].type="hidden";
			dzie=inputs[i].parentNode;
			dzie.innerHTML='<select name="em" style="width:100px"><option value="" selected="selected">Podbij </option><option value="sage">Sage</option><option value="noko">Noko</option></select>';
			break;
		}
	}
}
window.addEventListener("load", Main, false);