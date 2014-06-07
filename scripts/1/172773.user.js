// ==UserScript==
// @name        Karachan.org Gold+
// @include     *.karachan.org/*
// @version     1.0
// @author      Janusz Pawulon III
// @run-at document-start
// ==/UserScript==


if ((""+document.location).match(/karachan.org\/(|index\.html|index\.php)$/) !== null) {
  document.location.replace("http://www.karachan.org/kusaba.php");
}


if (typeof document.origGEBTN == "undefined") {
  document.origGEBTN = document.getElementsByTagName;
  document.getElementsByTagName = function(a) {
    if (a == "blockquote") return [];
    else return document.origGEBTN(a);
  }
}


var blacklist = 'embed[name="flashfontshelper"], embed[src$="cenzorave.gif"], embed[src$="cenzorave2.gif"], link[href$="night.css"], option[value="Night"], iframe[src$="autoplay=1"], param[value="thekwejkbomb.swf"], embed[src$="thekwejkbomb.swf"], script[src$="palecwdupie.js"], script[src$="jquery-1.7.2.min.js"]';


function dezalgo() {
  if (document.getElementById('regulamin') !== null) {
    document.getElementById('regulamin').style.display = 'none';
  }
  if (document.body !== null) {
    document.body.style.backgroundImage = "none";
  }

  var embeds = document.querySelectorAll(blacklist);
  for (i in embeds) {
    var elem = embeds[i];
    if (elem.parentNode) elem.parentNode.removeChild(elem);
  }

  if ((""+document.location).match(/\/b\//) !== null) {
    var tytul = 'Kurahen'
    var title = document.querySelectorAll('.logo');
    if (title.length > 0) {
	title[0].innerHTML = '<img src="http://www.karachan.org/baners/fandom.php" alt="karachan.org"  width="300" height="106" /><br /><!--<img id="fandom_img" src="/baners/logo54.png" height="106" width="300">--><br>'+tytul;
	document.title = tytul;
    }
  }
}

dezalgo(); // first fire

var changed = 0;

window.addEventListener('beforescriptexecute', function(e) {

	src = e.target.src;
	if (src.search(/jquery/) != -1) {
                changed++;
		e.preventDefault();
		e.stopPropagation();
	};
	
	src = e.target.src;
	if (src.search(/palecwdupie\.js/) != -1) {
                changed++;
		e.preventDefault();
		e.stopPropagation();
	};

	if(changed == 3) window.removeEventListener(e.type, arguments.callee, true);
	
}, true);

function Main(){

hidesnow();

dezalgo(); 

document.querySelector('div.content.ads').innerHTML = "<iframe data-aa='4756' src='//ad.a-ads.com/4756?size=468x60' scrolling='no' style='width:468px; height:60px; border:0px; padding:0;overflow:hidden' allowtransparency='true'></iframe><br />Donate some Bitcoins for Karachan.org Unlock script creators: 1BiQhVbEf281uGDS3z5Cy6r6wJ2kCcfitN";

var span = document.createElement("span");
span.innerHTML = "Palec w dupie (fingerprint; 00000001 => taki anonimowy):";
document.getElementById("postform").insertBefore(span, document.getElementById("finger"));
document.getElementById("finger").type = "text";


document.querySelector('input[name="postpassword"]').type = "text";
    
    function getCookie(c_name)
    {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
      {
      c_start = c_value.indexOf(c_name + "=");
      }
    if (c_start == -1)
      {
      c_value = null;
      }
    else
      {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1)
      {
    c_end = c_value.length;
    }
    c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
    }
    
    function setCookie(c_name,value,exdays)
    {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
    }
    
    if(!getCookie('kustyle'))
    {
        setCookie('kustyle','Roach',9000);
        location.reload();
    }
    
    if(!getCookie('regulamin'))
    {
        setCookie('regulamin','accepted',9000);
        location.reload();
    }
    setCookie('tc_previousip', 'do siebie nie rownaj', -9000);

	var dzie=document.getElementById('postbox');
	dzie.innerHTML+="<input type='button' value=' b ' onclick='tag1=\"[b]\"; tag2=\"[/b]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' i ' onclick='tag1=\"[i]\"; tag2=\"[/i]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' u ' onclick='tag1=\"[u]\"; tag2=\"[/u]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' s ' onclick='tag1=\"[s]\"; tag2=\"[/s]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' small ' onclick='tag1=\"[small]\"; tag2=\"[/small]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' code ' onclick='tag1=\"[code]\"; tag2=\"[/code]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";
	dzie.innerHTML+=" <input type='button' value=' spoiler ' onclick='tag1=\"[spoiler]\"; tag2=\"[/spoiler]\";txt=document.postform.message; if (txt.selectionEnd && (txt.selectionEnd - txt.selectionStart>0)){	s1=(txt.value).substring(0, txt.selectionStart);	s2=(txt.value).substring(txt.selectionStart, txt.selectionEnd);	s3=(txt.value).substring(txt.selectionEnd, txt.textLength);	txt.value=s1+tag1+s2+tag2+s3;} txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'>";

	if(location.pathname.indexOf('/b/')>=0)
		dzie.innerHTML+=" <select onChange='javascript:word=this.options[this.selectedIndex].value; txt=document.postform.message; s1=(txt.value).substring(0,txt.selectionEnd); s2=(txt.value).substring(txt.selectionEnd, txt.textLength); txt.value=s1+word+s2; txt.focus(); txt.selectionStart=txt.selectionEnd=txt.value.length; this.selectedIndex=this.selectedIndex[0];'><option value='' selected='selected'>WORDFILTRY</option><option value='#nowocioty'>STAROCIOTY PAMIĘTAJĄ</option><option value='#gimbo'>xD</option><option value='#penis'>pisiorek</option><option value='#wagina'>cipuszka</option><option value='#m__b'>groźny WYKOPEK wykryty</option><option value='#homoś'>pedał</option><option value='#lasoupeauxchoux'>kapuśniaczek</option><option value='#bialkov'>michalek</option><option value='#sadolov'>ECNE PEDAL MATKE JEBAL</option><option value='#czajka'>Czajniczek ;3</option><option value='#gtfo'>WYPIERDALAJ</option></select>";
	
	var inputs=document.getElementsByTagName("input");
	for(i=0;i<inputs.length;i++){
		if(inputs[i].name=="em"){
			inputs[i].name="kurahen";
			inputs[i].type="hidden";
			dzie=inputs[i].parentNode;
			dzie.innerHTML='<select name="em" style="width:100px"><option value="noko" selected="selected">Podbij </option><option value="sage">Sage </option><option value="spoiler">Spoiler </option></select>';
		}
		if(inputs[i].name=="imagefile")
		{
			dzie=inputs[i].parentNode;
			dzie.innerHTML+='<br><input type="text" name="embed" size="28" maxlength="75" accesskey="e" /> <select name="embedtype"><option value="youtube">Youtube</option><br>[<input type="checkbox" name="nofile" id="nofile" accesskey="q" /><label for="nofile"> Brak pliku</label>';
			break;
		}
	}
    var kapcza=document.getElementById('captchaimage');
	kapcza.src='http://www.karachan.org/captcha.php?'+Math.random();
}
window.addEventListener("DOMContentLoaded", Main, false);
document.getElementsByClassName('footer')[0].remove();