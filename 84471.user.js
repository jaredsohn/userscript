// ==UserScript==
// @name           Emoticones estilo T! en páginas de TuLocura
// @description    Agrega un panel de emoticones al estilo Taringa en GratisJuegos, GratisPeliculas, GratisProgramas y GratisMusica
// @include        *gratisprogramas.org/*

// @include        *gratisjuegos.org/*

// @include        *gratispeliculas.org/*

// @include        *gratismusica.org/*
// @exclude        *gratis*.org/wp*
// ==/UserScript==



var Comentario=document.getElementById('comment');


if(Comentario){

var smile = document.createElement('a');
smile.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_smile.gif"> ';
smile.addEventListener('click',Agregarsmile,true);
function Agregarsmile(){AgregarTexto(" :)")}


var razz = document.createElement('a');
razz.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_razz.gif"> ';
razz.addEventListener('click',Agregarrazz,true);
function Agregarrazz(){AgregarTexto(" :P")}

var sad = document.createElement('a');
sad.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_sad.gif"> ';
sad.addEventListener('click',Agregarsad,true);
function Agregarsad(){AgregarTexto(" :(")}

var cool = document.createElement('a');
cool.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_cool.gif"> ';
cool.addEventListener('click',Agregarcool,true);
function Agregarcool(){	AgregarTexto(" 8)")}

var neutral = document.createElement('a');
neutral.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_neutral.gif"> ';
neutral.addEventListener('click',Agregarneutral,true);
function Agregarneutral(){AgregarTexto(" :|")}

var mad = document.createElement('a');
mad.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_mad.gif"> ';
mad.addEventListener('click',Agregarmad,true);
function Agregarmad(){AgregarTexto(" :x")}

var wink = document.createElement('a');
wink.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_wink.gif"> ';
wink.addEventListener('click',Agregarwink,true);
function Agregarwink(){AgregarTexto(" ;)")}

var grin = document.createElement('a');
grin.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_biggrin.gif"> ';
grin.addEventListener('click',Agregargrin,true);
function Agregargrin(){AgregarTexto(" :D")}

var shock = document.createElement('a');
shock.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_eek.gif"> ';
shock.addEventListener('click',Agregarshock,true);
function Agregarshock(){AgregarTexto(" 8O")}

var confused = document.createElement('a');
confused.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_confused.gif"> ';
confused.addEventListener('click',Agregarconfused,true);
function Agregarconfused(){AgregarTexto(" :?")}

var twisted = document.createElement('a');
twisted.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_twisted.gif"> ';
twisted.addEventListener('click',Agregartwisted,true);
function Agregartwisted(){AgregarTexto(" :twisted:")}

var roll = document.createElement('a');
roll.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_rolleyes.gif"> ';
roll.addEventListener('click',Agregarroll,true);
function Agregarroll(){AgregarTexto(" :roll:")}

var mrgreen = document.createElement('a');
mrgreen.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_mrgreen.gif"> ';
mrgreen.addEventListener('click',Agregarmrgreen,true);
function Agregarmrgreen(){AgregarTexto(" :mrgreen:")}

var evil = document.createElement('a');
evil.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_evil.gif"> ';
evil.addEventListener('click',Agregarevil,true);
function Agregarevil(){AgregarTexto(" :evil:")}

var oops = document.createElement('a');
oops.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_redface.gif"> ';
oops.addEventListener('click',Agregaroops,true);
function Agregaroops(){AgregarTexto(" :oops:")}

var cry = document.createElement('a');
cry.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_cry.gif"> ';
cry.addEventListener('click',Agregarcry,true);
function Agregarcry(){AgregarTexto(" :cry:")}

var lol = document.createElement('a');
lol.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_lol.gif"> ';
lol.addEventListener('click',Agregarlol,true);
function Agregarlol(){AgregarTexto(" :lol:")}

var question = document.createElement('a');
question.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_question.gif"> ';
question.addEventListener('click',Agregarquestion,true);
function Agregarquestion(){AgregarTexto(" :?:")}

var arrow = document.createElement('a');
arrow.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_arrow.gif"> ';
arrow.addEventListener('click',Agregararrow,true);
function Agregararrow(){AgregarTexto(" :arrow:")}

var exclaim = document.createElement('a');
exclaim.innerHTML='<img src="http://blog.tinypic.com/wp-includes/images/smilies/icon_exclaim.gif"> ';
exclaim.addEventListener('click',Agregarexclaim,true);
function Agregarexclaim(){AgregarTexto(" :!:")}




}




function AgregarTexto(texto){
 	if (document.selection) {
    		Comentario.focus();
		sel = document.selection.createRange();
		sel.text = texto;
 		Comentario.focus();
    	}
    	else if (Comentario.selectionStart || Comentario.selectionStart == '0') {
    		var startPos = Comentario.selectionStart;
    		var endPos = Comentario.selectionEnd;
    		var cursorPos = endPos;
    		Comentario.value = Comentario.value.substring(0, startPos)
    					  + texto
    					  + Comentario.value.substring(endPos, Comentario.value.length);
    		cursorPos += texto.length;
    		Comentario.focus();
    		Comentario.selectionStart = cursorPos;
    		Comentario.selectionEnd = cursorPos;
    	}
    	else {
    		Comentario.value += texto;
    		Comentario.focus();
    	}
}





/*------------------------------------------
--------------------------------------------
--------------------------------------------
--------Seccion de negrita y cursiva--------
--------------------------------------------
--------------------------------------------
------------------------------------------*/




var strongact=0
var emact=0


function AgregarTags(tipo){
	if (document.selection) {



		alert('1');



    		Comentario.focus();
    		sel = document.selection.createRange();
    		sel.text = texto;
    		Comentario.focus();
    	}
    	else if (Comentario.selectionStart != Comentario.selectionEnd) {
    		var startPos = Comentario.selectionStart;
    		var endPos = Comentario.selectionEnd;
 		var largo=endPos-startPos
    		Comentario.value = Comentario.value.substring(0, startPos)
						+ "<"+tipo+">"
						+ Comentario.value.substring(startPos, endPos)				  
						+ "</"+tipo+">"
						+ Comentario.value.substring(endPos,Comentario.value.length)
    		cursorPos += (tipo.length*2)+5;
    		Comentario.focus();
    	}
    	else {

		var texto;
		if(tipo=="strong"){
			if(strongact){
				texto="</strong>"
				strongact=0
			}
			else{
				texto="<strong>"
				strongact=1
			}
		}
		if(tipo=="em"){
			if(emact){
				texto="</em>"
				emact=0
			}
			else{
				texto="<em>"
				emact=1
			}
		}

	
    		var startPos = Comentario.selectionStart;
    		var cursorPos = startPos;
    		Comentario.value = Comentario.value.substring(0, startPos)
						+ texto
						+ Comentario.value.substring(startPos, Comentario.value.length)				  
    		cursorPos += texto.length;
    		Comentario.focus();
    		Comentario.selectionEnd = cursorPos;

    	}
}



var strong = document.createElement('input');
strong.type="button"
strong.value='N';
strong.addEventListener('click',Agregarstrong,true);
function Agregarstrong(){AgregarTags("strong")}

var em = document.createElement('input');
em.type="button"
em.value='C';
em.addEventListener('click',Agregarem,true);
function Agregarem(){AgregarTags("em")}

//insertar los botones
if(Comentario){
Comentario.parentNode.insertBefore(strong,Comentario);
Comentario.parentNode.insertBefore(em,Comentario);
Comentario.parentNode.insertBefore(smile,Comentario);
Comentario.parentNode.insertBefore(sad,Comentario);
Comentario.parentNode.insertBefore(cool,Comentario);
Comentario.parentNode.insertBefore(neutral,Comentario);
Comentario.parentNode.insertBefore(razz,Comentario);
Comentario.parentNode.insertBefore(mad,Comentario);
Comentario.parentNode.insertBefore(wink,Comentario);
Comentario.parentNode.insertBefore(grin,Comentario);
Comentario.parentNode.insertBefore(shock,Comentario);
Comentario.parentNode.insertBefore(confused,Comentario);
Comentario.parentNode.insertBefore(twisted,Comentario);
Comentario.parentNode.insertBefore(roll,Comentario);
Comentario.parentNode.insertBefore(mrgreen,Comentario);
Comentario.parentNode.insertBefore(evil,Comentario);
Comentario.parentNode.insertBefore(oops,Comentario);
Comentario.parentNode.insertBefore(cry,Comentario);
Comentario.parentNode.insertBefore(lol,Comentario);
Comentario.parentNode.insertBefore(question,Comentario);
Comentario.parentNode.insertBefore(arrow,Comentario);
Comentario.parentNode.insertBefore(exclaim,Comentario);
Comentario.parentNode.insertBefore(document.createElement('br'),Comentario);
}