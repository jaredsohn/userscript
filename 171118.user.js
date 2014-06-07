// ==UserScript==
// @name          F23 - nowe emotki na forume
// @description   Dodaje nowe emotki na forume + klikany interfejs do ich dodawania
// @include       http://forum.o2.pl/forum.php*
// @include       http://forum.o2.pl/temat.php*
// @include       http://forum.o2.pl/nowy.php*
// @author        dumny_anarchista
// @version       0.1
// @run-at        document-end
// ==/UserScript==



(function() {
var css = "\ .nowaemotka { 	display:inline-block; width: 0px; height: 0px; overflow: hidden; padding-top: 20px; padding-left: 27px; vertical-align: middle;; } \
\
.xluzak { background: url(http://i.imgur.com/8AcA4HQ.gif); } \
.x10ton { padding-left: 30px; background: url(http://i.imgur.com/6dEeYYu.gif); } \
.xbalwan { padding-left: 28px; background: url(http://i.imgur.com/hRTD92g.gif); } \
.xbeczy { padding-left: 24px; background: url(http://i.imgur.com/sOuD1FN.gif); } \
.xble { padding-left: 26px; background: url(http://i.imgur.com/wQKcIWo.gif); } \
.xboks { padding-left: 32px; background: url(http://i.imgur.com/IK5fXqL.gif); } \
.xcaluje { padding-left: 38px; background: url(http://i.imgur.com/Gmmveb4.gif); } \
.xchrapie { padding-left:26px; background: url(http://i.imgur.com/c1PSwEL.gif); } \
.xcmok { padding-left: 32px; background: url(http://i.imgur.com/BmQYH0u.gif); } \
.xczaszka { padding-left: 20px; background: url(http://i.imgur.com/oOPIBAX.gif); } \
.xdiabel { padding-left: 26px; background: url(http://i.imgur.com/URxYGtn.gif); } \
.xgadula { padding-left: 23px; background: url(http://i.imgur.com/yxjcp79.gif); } \
.xgryz { padding-left: 26px; background: url(http://i.imgur.com/uvlleGT.gif); } \
.xgwizd {padding-left: 26px; background: url(http://i.imgur.com/pQqQYDC.gif); } \
.xhihi { padding-left: 24px; background: url(http://i.imgur.com/9qYXv0m.gif); } \
.xhura { padding-left: 32px; background: url(http://i.imgur.com/8dweWum.gif); }\
.xkreci { padding-left: 26px; background: url(http://i.imgur.com/38E9O0f.gif); }\
.xmniam { padding-left: 26px; background: url(http://i.imgur.com/E0L8HQO.gif); } \
.xnie { padding-left: 20px; background: url(http://i.imgur.com/qqL38vt.gif); } \
.xniedobrze { padding-left: 26px; background: url(http://i.imgur.com/aMfVhhk.gif); } \
.xnienie { padding-left: 21px; background: url(http://i.imgur.com/AJGUyaK.gif); } \
.xnie_wiem { padding-left: 24px; background: url(http://i.imgur.com/6kqZXyO.gif) } \
.xtak { padding-left: 20px; background: url(http://i.imgur.com/i3LWyEn.gif); } \
.xpapa { padding-left: 32px; background: url(http://i.imgur.com/mGEZAC5.gif); } \
.xstrach { padding-left: 26px; background: url(http://i.imgur.com/MiC6g8s.gif); } \
.xtaktak { padding-left: 21px; background: url(http://i.imgur.com/7vRIbST.gif); } \
.xzdziwiona { padding-left: 32px; background: url(http://i.imgur.com/DH6a1bq.gif); } \
\
\
/* a poniżej są stare emoty, potrzebne do podmieniania na liście tematów i nie tylko */ \
.cool { padding-left: 20px; background: url(./emotikony/cool.gif); } \
.usmiech { padding-left: 20px; background: url(./emotikony/usmiech.gif); } \
.smutas { padding-left: 20px; background: url(./emotikony/smutas.gif); } \
.oczko { padding-left: 20px; background: url(./emotikony/oczko.gif); } \
.smiech { padding-left: 20px; background: url(./emotikony/smiech.gif); } \
.jezyk { padding-left: 20px; background: url(./emotikony/jezyk.gif); } \
.pechowiec { padding-left: 20px; background: url(./emotikony/pechowiec.gif); } \
.beksa { padding-left: 20px; background: url(./emotikony/beksa.gif); } \
.kwiat { padding-left: 20px; background: url(./emotikony/kwiatek.gif); } \
.lapka { padding-left: 20px; background: url(./emotikony/lapka.gif); } \
.serce { padding-left: 20px; background: url(./emotikony/serduszko.gif); } \
.spioch { padding-left: 20px; background: url(./emotikony/spioch.gif); } \
.usta { padding-left: 20px; background: url(./emotikony/usta.gif); } \
.zly { padding-left: 20px; background: url(./emotikony/zly.gif); } \
.wsciekly { padding-left: 20px; background: url(./emotikony/wsciekly.gif); } \
.ziewam { padding-left: 20px; background: url(./emotikony/ziewanie.gif); } \
\
\
";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();



var text = new Array();
text[0] = 'luzak';
text[1] = '10ton';
text[2] = 'balwan';
text[3] = 'beczy';
text[4] = 'ble';
text[5] = 'boks';
text[6] = 'caluje';
text[7] = 'chrapie';
text[8] = 'cmok';
text[9]= 'czaszka';
text[10]= 'diabel';
text[11]= 'gadula';
text[12]= 'gryz';
text[13]= 'gwizd';
text[14]= 'hihi';
text[15]= 'hura';
text[16]= 'kreci';
text[17]= 'mniam';
text[18]= 'nie';
text[19]= 'niedobrze';
text[20]= 'nienie';
text[21]= 'nie_wiem';
text[22]= 'tak';
text[23]= 'papa';
text[24]= 'strach';
text[25]= 'taktak';
text[26]= 'zdziwiona';



if (document.URL.indexOf("forum.o2.pl/nowy.php") == -1) {


	var posts = new Array();
	posts.push(document.getElementById("c_main"));




for (i = 0; i < posts.length; i++) {
	
	var txt_string = posts[i].innerHTML;
	
	/* tą całą podmianę pewnie dało by się napisać szybciej, ale...
	 * kurrwa nie chce mi się tego optymalizować więc jest jak jest i chooj !
	 */
	
	
	txt_string = txt_string.replace(/\[luzak\]/g,"<span class=\"nowaemotka xluzak\">[luzak]</span>");
	txt_string = txt_string.replace(/\[10ton\]/g,"<span class=\"nowaemotka x10ton\">[10ton]</span>");
	txt_string = txt_string.replace(/\[balwan\]/g,"<span class=\"nowaemotka xbalwan\">[balwan]</span>");
	txt_string = txt_string.replace(/\[beczy\]/g,"<span class=\"nowaemotka xbeczy\">[beczy]</span>");
	txt_string = txt_string.replace(/\[ble\]/g,"<span class=\"nowaemotka xble\">[ble]</span>");
	txt_string = txt_string.replace(/\[boks\]/g,"<span class=\"nowaemotka xboks\">[boks]</span>");
	txt_string = txt_string.replace(/\[caluje\]/g,"<span class=\"nowaemotka xcaluje\">[caluje]</span>");
	txt_string = txt_string.replace(/\[chrapie\]/g,"<span class=\"nowaemotka xchrapie\">[chrapie]</span>");
	txt_string = txt_string.replace(/\[cmok\]/g,"<span class=\"nowaemotka xcmok\">[cmok]</span>");
	txt_string = txt_string.replace(/\[czaszka\]/g,"<span class=\"nowaemotka xczaszka\">[czaszka]</span>");
	txt_string = txt_string.replace(/\[diabel\]/g,"<span class=\"nowaemotka xdiabel\">[diabel]</span>");
	txt_string = txt_string.replace(/\[gadula\]/g,"<span class=\"nowaemotka xgadula\">[gadula]</span>");
	txt_string = txt_string.replace(/\[gryz\]/g,"<span class=\"nowaemotka xgryz\">[gryz]</span>");
	txt_string = txt_string.replace(/\[gwizd\]/g,"<span class=\"nowaemotka xgwizd\">[gwizd]</span>");
	txt_string = txt_string.replace(/\[hihi\]/g,"<span class=\"nowaemotka xhihi\">[hihi]</span>");
	txt_string = txt_string.replace(/\[hura\]/g,"<span class=\"nowaemotka xhura\">[hura]</span>");
	txt_string = txt_string.replace(/\[kreci\]/g,"<span class=\"nowaemotka xkreci\">[kreci]</span>");
	txt_string = txt_string.replace(/\[mniam\]/g,"<span class=\"nowaemotka xmniam\">[mniam]</span>");
	txt_string = txt_string.replace(/\[nie\]/g,"<span class=\"nowaemotka xnie\">[nie]</span>");
	txt_string = txt_string.replace(/\[niedobrze\]/g,"<span class=\"nowaemotka xniedobrze\">[niedobrze]</span>");	
	txt_string = txt_string.replace(/\[nienie\]/g,"<span class=\"nowaemotka xnienie\">[nienie]</span>");
	txt_string = txt_string.replace(/\[nie_wiem\]/g,"<span class=\"nowaemotka xnie_wiem\">[nie_wiem]</span>");
	txt_string = txt_string.replace(/\[tak\]/g,"<span class=\"nowaemotka xtak\">[tak]</span>");
	txt_string = txt_string.replace(/\[papa\]/g,"<span class=\"nowaemotka xpapa\">[papa]</span>");
	txt_string = txt_string.replace(/\[strach\]/g,"<span class=\"nowaemotka xstrach\">[strach]</span>");
	txt_string = txt_string.replace(/\[taktak\]/g,"<span class=\"nowaemotka xtaktak\">[taktak]</span>");	
	txt_string = txt_string.replace(/\[zdziwiona\]/g,"<span class=\"nowaemotka xzdziwiona\">[zdziwiona]</span>");
	
	/* stare emotikony, potrzebne żeby podmieniać na liście tematów */
	txt_string = txt_string.replace(/\[cool\]/g,"<span class=\"nowaemotka cool\">[cool]</span>");
	txt_string = txt_string.replace(/:\)/g,"<span class=\"nowaemotka usmiech\">:)</span>");	
	txt_string = txt_string.replace(/:-\)/g,"<span class=\"nowaemotka usmiech\">:-)</span>");	
	txt_string = txt_string.replace(/:\(/g,"<span class=\"nowaemotka smutas\">:(</span>");	
	txt_string = txt_string.replace(/:-\(/g,"<span class=\"nowaemotka smutas\">:-(</span>");	
	txt_string = txt_string.replace(/;\)/g,"<span class=\"nowaemotka oczko\">;)</span>");	
	txt_string = txt_string.replace(/;-\)/g,"<span class=\"nowaemotka oczko\">;-)</span>");
	txt_string = txt_string.replace(/:D/g,"<span class=\"nowaemotka smiech\">:D</span>");
	txt_string = txt_string.replace(/:-D/g,"<span class=\"nowaemotka smiech\">:-D</span>");
	txt_string = txt_string.replace(/:p/g,"<span class=\"nowaemotka jezyk\">:p</span>");
	txt_string = txt_string.replace(/:-p/g,"<span class=\"nowaemotka jezyk\">:-p</span>");
	txt_string = txt_string.replace(/:P/g,"<span class=\"nowaemotka jezyk\">:P</span>");
	txt_string = txt_string.replace(/:-P/g,"<span class=\"nowaemotka jezyk\">:-P</span>");
	txt_string = txt_string.replace(/:o/g,"<span class=\"nowaemotka pechowiec\">:o</span>");
	txt_string = txt_string.replace(/:-o/g,"<span class=\"nowaemotka pechowiec\">:-o</span>");
	txt_string = txt_string.replace(/:O/g,"<span class=\"nowaemotka pechowiec\">:O</span>");
	txt_string = txt_string.replace(/:-O/g,"<span class=\"nowaemotka pechowiec\">:-O</span>");
	txt_string = txt_string.replace(/\[beksa]/g,"<span class=\"nowaemotka beksa\">[beksa]</span>");
	txt_string = txt_string.replace(/\[kwiat]/g,"<span class=\"nowaemotka kwiat\">[kwiat]</span>");
	txt_string = txt_string.replace(/\[kwiatek]/g,"<span class=\"nowaemotka kwiat\">[kwiatek]</span>");
	txt_string = txt_string.replace(/\[czesc]/g,"<span class=\"nowaemotka lapka\">[czesc]</span>");
	txt_string = txt_string.replace(/\[cześć]/g,"<span class=\"nowaemotka lapka\">[cześć]</span>");
	txt_string = txt_string.replace(/\[serce]/g,"<span class=\"nowaemotka serce\">[serce]</span>");
	txt_string = txt_string.replace(/\[love]/g,"<span class=\"nowaemotka serce\">[love]</span>");
	txt_string = txt_string.replace(/\[spioch]/g,"<span class=\"nowaemotka spioch\">[spioch]</span>");
	txt_string = txt_string.replace(/\[śpioch]/g,"<span class=\"nowaemotka spioch\">[śpioch]</span>");
	txt_string = txt_string.replace(/\[usta]/g,"<span class=\"nowaemotka usta\">[usta]</span>");
	txt_string = txt_string.replace(/\[kiss]/g,"<span class=\"nowaemotka usta\">[kiss]</span>");
	txt_string = txt_string.replace(/\[zly]/g,"<span class=\"nowaemotka zly\">[zly]</span>");
	txt_string = txt_string.replace(/\[zły]/g,"<span class=\"nowaemotka zly\">[zły]</span>");
	txt_string = txt_string.replace(/\[wsciekly]/g,"<span class=\"nowaemotka wsciekly\">[wsciekly]</span>");
	txt_string = txt_string.replace(/\[wściekły]/g,"<span class=\"nowaemotka wsciekly\">[wściekły]</span>");	
	txt_string = txt_string.replace(/\[ziewam]/g,"<span class=\"nowaemotka ziewam\">[ziewam]</span>");		
	
	
	posts[i].innerHTML = txt_string;
	
}


}

 else {
	 /* na początek mechanizm dodawania starych emotów */
	 
	 
var textareas = document.getElementsByTagName("textarea");

var script = document.createElement("script");
script.textContent = ' ' +
'function klikemot(emot) {' +
'	var uchwyttext = document.getElementById(\'textareaIDemotki\');' +
'	var a = uchwyttext.selectionStart;' +
'	var b = uchwyttext.selectionEnd;' +
'	var text = uchwyttext.value;' +
'	uchwyttext.value = text.substr(0,a) + emot + text.substr(b);' +
'	uchwyttext.focus();' +
'	var ve = uchwyttext.value;' +
'	uchwyttext.value = "";' +
'	uchwyttext.value = ve;' +
'}' +
'function kliktext(beg,end) {' +
'	var uchwyttext = document.getElementById(\'textareaIDemotki\');' +
'	var a = uchwyttext.selectionStart;' +
'	var b = uchwyttext.selectionEnd;' +
'	var diff = b - a;' +
'	var text = uchwyttext.value;' +
'	uchwyttext.value = text.substr(0,a) + beg + text.substr(a,diff) + end + text.substr(b);' +
'	uchwyttext.focus();' +
'	var ve = uchwyttext.value;' +
'	uchwyttext.value = "";' +
'	uchwyttext.value = ve;' +
'}';


document.body.appendChild(script);



for (i=0;i < textareas.length; i++) {

	if (textareas[i].getAttribute("name") == "tresc") {
		var str = '<style>.newemoimg {margin:2px 5px 2px 4px;}</style>';
		for (var x=0; x < text.length; x++) {
			str += '<span class="nowaemotka x'+text[x]+' newemoimg" onclick="klikemot(\'['+text[x]+']\')">['+text[x]+']</span>';
			if (x==12) str += '<br/>';
		}
		
		str += '<small><br/>Uwaga ! Wszystkie dodatkowe ikony są widoczne tylko dla użytkowników <a href="http://userscripts.org/scripts/show/171118">skryptu</a>.</small><br/><br/>' ;
		var ne = document.createElement('span');
		ne.innerHTML = str;
		textareas[i].parentNode.insertBefore(ne,textareas[i]);
		
		
	}


	if ((textareas[i].getAttribute("name") == "tresc") && (textareas[i].getAttribute("id") != "textareaIDemotki")) {
		/* fragment kodu poniżej pochodzi od gocia który przygotował starą listę emotek, niejaki "kocham_agnieszkę" */
		textareas[i].setAttribute('id','textareaIDemotki');
		
		var str = '<style>.emoimg{ text-align: center; float: left; width: 20px; height: 20px; margin: 2px 4px 2px 4px;} .buttxt {padding-top: 2px;border-top: 1px solid #aaa; border-right: 1px solid #111; border-left: 1px solid #aaa; border-bottom: 1px solid #111; width: 18px !important; height: 16px !important;}</style>';
		
		str += '<span style="width:40px !important;" class="emoimg buttxt" onclick="kliktext(\'[cytat]\',\'[/cytat]\')"><i>cytat</i></span>';
		
		str += '<img src="emotikony/usmiech.gif" class="emoimg" onclick="klikemot(\':)\')">';
		str += '<img src="emotikony/smutas.gif" class="emoimg" onclick="klikemot(\':(\')">';
		str += '<img src="emotikony/oczko.gif" class="emoimg" onclick="klikemot(\';)\')">';
		str += '<img src="emotikony/smiech.gif" class="emoimg" onclick="klikemot(\':D\')">';	
		str += '<img src="emotikony/jezyk.gif" class="emoimg" onclick="klikemot(\':p\')">';
		str += '<img src="emotikony/pechowiec.gif" class="emoimg" onclick="klikemot(\':o\')">';
		str += '<img src="emotikony/beksa.gif" class="emoimg" onclick="klikemot(\'[beksa]\')">';
		str += '<img src="emotikony/cool.gif" class="emoimg" onclick="klikemot(\'[cool]\')">';
		str += '<img src="emotikony/kwiatek.gif" class="emoimg" onclick="klikemot(\'[kwiat]\')">';
		str += '<img src="emotikony/lapka.gif" class="emoimg" onclick="klikemot(\'[czesc]\')">';
		str += '<img src="emotikony/serduszko.gif" class="emoimg" onclick="klikemot(\'[love]\')">';
		str += '<img src="emotikony/spioch.gif" class="emoimg" onclick="klikemot(\'[spioch]\')">';
		str += '<img src="emotikony/usta.gif" class="emoimg" onclick="klikemot(\'[kiss]\')">';	
		str += '<img src="emotikony/zly.gif" class="emoimg" onclick="klikemot(\'[zly]\')">';	
		str += '<img src="emotikony/wsciekly.gif" class="emoimg" onclick="klikemot(\'[wsciekly]\')">';	
		str += '<img src="emotikony/ziewanie.gif" class="emoimg" onclick="klikemot(\'[ziewam]\')">';	
		str += '<br/>' ;
		var ne = document.createElement('span');
		ne.innerHTML = str;
		textareas[i].parentNode.insertBefore(ne,textareas[i]);
	}





}

	 
	 
 }


