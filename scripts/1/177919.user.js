// ==UserScript==
// @name        Administrador de emoticonos - PxP
// @namespace   pxpemoticonos
// @description Permite administrar emoticonos en foros PxP
// @include     http://www.pokexperto.net/foros/*
// @version     1.2.2
// @grant       none
// ==/UserScript==

console.log("Yay");
window.list = [];
window.secList = [];
window.thrList = [];
window.main = function() {
console.log("hey");
    var lItem = document.createElement("li");
    lItem.innerHTML = "<a href='http://www.pokexperto.net/foros/index.php?board=777'><span>Emoticonos</span></a>";

    document.getElementById("nav").appendChild(lItem);
    if(window.location == "http://www.pokexperto.net/foros/index.php?board=777") {
        list = unparseList("emoticonos");
        secList = unparseList("resultados");
        thrList = unparseList("imgs");
        document.getElementsByClassName("titlebg")[0].innerHTML = "Emoticonos";
        document.title = "Emoticonos";
        var tb = document.getElementsByClassName("windowbg")[0];
        tb.innerHTML = "¡Bienvenido! Aquí puedes guardar emoticonos, textos o imágenes para acceder a ellos fácilmente. <br>";
        tb.innerHTML += "Por ejemplo, digamos que usas a Merumito (<img src='http://i1127.photobucket.com/albums/l623/aukaiva/dummyrenderizado.png'></img>) bastante, pero no te gusta copiar y pegar su URL cada vez. Con este userscript no tendrás que preocuparte más por ello. Simplemente, en el primer campo pon ':merumito:' (sin comillas) y en el segundo campo, pon el código que le correspondería, es decir '[img]http://i1127.photobucket.com/albums/l623/aukaiva/dummyrenderizado.png[/img]' (sin comillas otra vez). Así, cada vez que pongas :merumito:, la imagen de merumito saldrá sin que tengas que buscar y poner la url. <br><br> ¡Nuevo! En el tercer campo pon la imagen que quieres que se vea en la pantalla de publicación, para que al hacer click en ella ponga el emoticono. No son necesarias las tags [img], simplemente pon la url."
        tb.innerHTML += "<br><br><div id='emoticonlist' ></div><br><br>";
        tb.innerHTML += "<button onclick='addEmoticon();'>Añadir nuevo emoticono</button><button onclick='updateList();'>Guardar</button>";
        for(var i = 0; i < list.length; i++) {
        document.getElementById("emoticonlist").innerHTML += "Texto de acceso: <input type='text' id='emot" + i + "' value='" + list[i] + "'></input> Código: <input type='text' id='result" + i + "' value='" + secList[i] +"'></input> URL de la imagen para clickear: <input type='text' id='img" + i + "' value='" + thrList[i] + "'></input><br>";
        }
        updateList();
    }
	
    else if(document.getElementById("message") || document.forms["postmodify"].message) {
        list = unparseList("emoticonos");
        secList = unparseList("resultados");
        console.log("ola k ase");
        if(document.getElementById("message")) {
        thrList = unparseList("imgs");
        var emolist = document.getElementById("sml_sisisi.gif").parentNode.parentNode;
        emolist.innerHTML += "<br>";
		
        for(var i = 0; i < thrList.length; i++) {
			
            if(thrList[i]) {
                emolist.innerHTML += "<a onclick='clickEmot("+i+")' href='javascript:void(0);'><img src='"+thrList[i]+"'  ></img></a>";
				//editorHandlemessage.addSmiley(secList[i], list[i], list[i])
            }
        }
        document.getElementById("message").addEventListener("keyup", function(e) {
            for(var i = 0; i < list.length; i++) {
                
                document.getElementById("message").value = document.getElementById("message").value.replace(list[i], secList[i]);
            }
        });
        }
        else {
            document.forms.postmodify.message.addEventListener("keyup", function(e) {
            for(var i = 0; i < list.length; i++) {
                document.forms.postmodify.message.value = document.forms.postmodify.message.value.replace(list[i], secList[i]);
            }
        }); 
        }
		//Reseteando los emoticonos normales, ya que no se comportan como deberían.
		editorHandlemessage.oSmfSmileys = [];
		editorHandlemessage.addSmiley(':huh:', 'huh.gif', 'Huh');
editorHandlemessage.addSmiley(':o', 'ohmy.gif', 'Oh!');
editorHandlemessage.addSmiley(';)', 'wink.gif', 'wink');
editorHandlemessage.addSmiley('=P', 'tongue.gif', 'jaja');
editorHandlemessage.addSmiley(':lol:', 'laugh.gif', 'LOL');
editorHandlemessage.addSmiley('B)', 'cool.gif', 'molo');
editorHandlemessage.addSmiley(':rolleyes:', 'rolleyes.gif', 'Roll Eyes');
editorHandlemessage.addSmiley(':¬¬:', 'dry.gif', 'Ehem');
editorHandlemessage.addSmiley(':angry:', 'angry.gif', 'Enfado');
editorHandlemessage.addSmiley(':triste:', 'sad.gif', 'Triste');
editorHandlemessage.addSmiley(':unsure:', 'unsure.gif', 'Dudoso');
editorHandlemessage.addSmiley(':blink:', 'blink.gif', 'Ouch');
editorHandlemessage.addSmiley(':ph43r:', 'ninja.gif', 'ph43r');
editorHandlemessage.addSmiley(':ook:', 'oki.gif', 'Okey');
editorHandlemessage.addSmiley(':^^U:', 'sweatdrop.gif', 'Vergüenza');
editorHandlemessage.addSmiley(':shock:', 'shock.gif', 'Shock');
editorHandlemessage.addSmiley(':nenemalo:', 'nunu.gif', 'Nene malo');
editorHandlemessage.addSmiley(':xD', 'xD.gif', 'xD');
editorHandlemessage.addSmiley('^__^', 'happy.gif', 'Feliz');
editorHandlemessage.addSmiley(':feliz:', 'biggrin.gif', 'Sonrisa');
editorHandlemessage.addSmiley('- -', 'sleep.gif', 'Aburrido');
editorHandlemessage.addSmiley(':love:', 'wub.gif', 'Amor');
editorHandlemessage.addSmiley(':loco:', 'loco.gif', 'Locura');
editorHandlemessage.addSmiley(':facepalm:', 'facepalm.gif', '');
editorHandlemessage.addSmiley(':sisisi:', 'sisisi.gif', ''); 
editorHandlemessage.addSmiley(':vueltasss:', 'vueltasss.gif', 'Vueltasss');
editorHandlemessage.addSmiley(':baile:', 'baile.gif', 'Baile'); 

}

    function addEmoticon() {
        var elem = document.createElement("input");
        elem.setAttribute("type", "text");
        elem.setAttribute("id", "emot" + list.length);
        document.getElementById("emoticonlist").appendChild(elem);
        var elemsec = document.createElement("input");
        elemsec.setAttribute("type", "text");
        elemsec.setAttribute("id", "result" + list.length);
        document.getElementById("emoticonlist").appendChild(elemsec);
        var elemthr = document.createElement("input");
        elemthr.setAttribute("type", "text");
        elemthr.setAttribute("id", "img" + list.length);
        document.getElementById("emoticonlist").appendChild(elemthr);
        document.getElementById("emoticonlist").innerHTML += "<br>";
        updateList();
        
    }
    function updateList() {
        for(var i=0; true; i++) {
            if(document.getElementById("emot" + i.toString())) {
                list[i] = document.getElementById("emot" + i.toString()).value;
                secList[i] = document.getElementById("result" + i.toString()).value;
                thrList[i] = document.getElementById("img" + i.toString()).value;
            }
            else break;
        }
        parseList(list, secList, thrList);
    }
function unparseList(name) {
if(getCookie(name)) {
return getCookie(name).split(",");
}
else return [];
}
function parseList(list, secList, thrList) {
var dat = new Date(2099, 12);
document.cookie = "emoticonos=" + list.join(",") + "; expires="+ dat.toUTCString();
document.cookie = "resultados=" + secList.join(",") + "; expires="+ dat.toUTCString();
document.cookie = "imgs=" + thrList.join(",") + "; expires="+ dat.toUTCString();
}
function getCookie(c_name)
{
var c_value = document.cookie;
var 
	c_start = c_value.indexOf(" " + c_name + "=");
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
  c_start = c_value.indexOf("=", c_start) 
	+ 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
  {

	c_end = c_value.length;
}
c_value = 
	unescape(c_value.substring(c_start,c_end));
}
return c_value;
}

function clickEmot(i) {
document.getElementById("message").value += secList[i];
}
window.getCookie = getCookie;
window.unparseList = unparseList;
window.parseList = parseList;
window.addEmoticon = addEmoticon;
window.updateList = updateList;
window.clickEmot = clickEmot;
};

window.addEventListener('load', window.main);