// ==UserScript==
// @name           HUEis 
// @namespace      Anon
// @description    Facilita a comunicação criptografada entre anões
// @version        0.9b
// @include 	   http://*.brchan.org/*
// ==/UserScript==



(function() {
var script=document.createElement('script');
script.setAttribute("type", "text/javascript");
script.textContent="function AHUEToChar(AHUE, key){" +
"var letter=0;" +
"for (var i=0;i<4;i++){" +
"letter*=4;" +
"if (AHUE[3-i]=='A'){" +
	"continue;" +
	"}" +
"if (AHUE[3-i]=='H'){" +
	"letter++;" +
	"continue;" +
	"}" +
"if (AHUE[3-i]=='U'){" +
	"letter+=2;" +
	"continue;" +
	"}" +
"if (AHUE[3-i]=='E'){" +
	"letter+=3;" +
	"continue;" +
	"}" +
"return -1;" +
"}" +
"return String.fromCharCode(letter^key);" +
"}" +
"" +
"function charToAHUE(letter, key){" +
"var messtable = ['A', 'H', 'U', 'E'];" +
"var message='';" +
"letter^=key;" +
"message=message.concat(messtable[letter&3]);" +
"letter/=4;" +
"message=message.concat(messtable[letter&3]);" +
"letter/=4;" +
"message=message.concat(messtable[letter&3]);" +
"letter/=4;" +
"message=message.concat(messtable[letter&3]);" +
"return message;" +
"}" +
"" +
"function decrypto(form){" +
"mess=form.emess.value;" +
"var key=form.key.value;" +
"var dmess='';" +
"var dchar;" +
"if (key.length==0){" +
"for (var i=0;i<mess.length/4;i++){" +
"dchar=AHUEToChar(mess.slice(i*4, (i+1)*4), 0);" +
"if (dchar==-1){" +
	"form.dmess.value='Mensagem inv'+String.fromCharCode(225)+'lida!';" +
	"return;" +
	"}" +
"dmess=dmess.concat(dchar);" +
"}" +
"}" +
"else{" +
"for (var i=0;i<mess.length/4;i++){" +
"dchar=AHUEToChar(mess.slice(i*4, (i+1)*4), key[i%key.length].charCodeAt());" +
"if (dchar==-1){" +
	"form.dmess.value='Mensagem inv'+String.fromCharCode(225)+'lida!';" +
	"return;" +
	"}" +
"dmess=dmess.concat(dchar);" +
"}" +
"}" +
"form.dmess.value=dmess;" +
"}" +
"" +
"function crypto(form){" +
"var mess=form.dmess.value;" +
"var key=form.key.value;" +
"var emess='';" +
"if (key.length==0){" +
"for (var i=0;i<mess.length;i++)" +
"emess=emess.concat(charToAHUE(mess[i].charCodeAt(),0));" +
"form.emess.value=emess;" +
"}" +
"else{" +
"for (var i=0;i<mess.length;i++)" +
"emess=emess.concat(charToAHUE(mess[i].charCodeAt(),key[i%key.length].charCodeAt()));" +
"form.emess.value=emess;" +
"}" +
"}" +
"" +
"function wipeSpecial(form){" +
"var mess=form.emess.value;" +
"mess=mess.replace(/[^AHUE]/g, '');" +
"form.emess.value=mess;" +
"}" +
"" +
"function drawPartial(){" +
"document.getElementById('marcador2').style.display='none';" +
"document.getElementById('marcador').style.display='inline';" +
"}" +
"" +
"function drawComplete(){" +
"document.getElementById('marcador').style.display='none';" +
"document.getElementById('marcador2').style.display='inline';" +
"}" +
"" +
"function showCrypto(){" +
"document.getElementById('marcador').style.visibility='hidden';" +
"document.getElementById('marcador2').style.display='none';" +
"document.getElementById('Crypto').style.display='inline';" +
"}" +
"" +
"function hideCrypto(){" +
"document.getElementById('marcador').style.visibility='visible';" +
"document.getElementById('Crypto').style.display='none';" +
"}";
document.body.appendChild(script);
var holder=document.createElement('div');
holder.innerHTML="<div id='marcador' style='position:fixed; width:0.1%; height:5%; top:0px; left:0px; border:1px solid #000000;' onmouseover='drawComplete();'></div><div id='marcador2' style='position:fixed; display:none; width:2%; height:10%; top:0px; left:0px;' onmouseout='drawPartial();' onclick='showCrypto();'><svg><text x='0' y='0' font-family='Tahoma' font-size='12' transform='rotate(90)' text-rendering='optimizeSpeed' fill='#0'>Enigma</text></svg></div><fieldset id='Crypto' style='position:fixed; background-color: #CCCCCC ;top: 0px; left: 0px; width:40%; height:95%; display:none;'><legend onclick='hideCrypto();'>FECHAR</legend><center><form action='' method='post'><textarea type='text' rows='10' placeholder='Mensagem descriptografada' name='dmess' style='width:75%;'></textarea><INPUT TYPE='button' NAME='button' Value='Criptografar' onClick='crypto(this.form); this.form.emess.select()'><br><INPUT TYPE='text' NAME='key' placeholder='Chave de criptografia' style='width:50%;'><br>	<textarea type='text' rows='20' placeholder='Mensagem criptografada' name='emess' style='width:75%;' oninput='wipeSpecial(this.form)'></textarea><INPUT TYPE='button' NAME='button' Value='Descriptografar' onClick='decrypto(this.form)'></center></form></fieldset>";
document.body.appendChild(holder);
}).call(this);
