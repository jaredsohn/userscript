// ==UserScript==
// @name          insighty's Auto wooter
// @author        insighty
// @description   Auto woot/meh
// @version       1.0.0.0
// @grant         none
// ==/UserScript==
var autowoot = 0;
var automeh = 0;
function init() {
    var css = "#chat {height:321px} #chat-messages {height:245px} #bottom-chat-line {top:290px} #chat-input-field {width:100%} .chat-input{top:296px} #button-chat-expand {top:291px} .botonwoot {position:absolute; width:50%; top:280px; background-color:#c1e320; height:30px; color:#758913; font-family:Arial, sans-serif; font-size:1.2em; cursor:pointer; text-align:center; padding-top:10px; left:50%; font-weight:bold} .botonmeh {position:absolute; width:50%; top:280px; background-color:#c8303e; height:30px; color:#791d25; font-family:Arial, sans-serif; font-size:1.2em; text-align:center; cursor:pointer; padding-top:10px; font-weight:bold} .botonwoot_s {position:absolute; width:50%; top:280px; background-color:#c3e322; height:30px; color:white; font-family:Arial, sans-serif; font-size:1.2em; cursor:pointer; text-align:center; padding-top:10px; left:50%; font-weight:bold} .botonmeh_s {position:absolute; width:50%; top:280px; background-color:#c7303c; height:30px; color:white; font-family:Arial, sans-serif; font-size:1.2em; text-align:center; cursor:pointer; padding-top:10px; font-weight:bold} .botonovideo {position:absolute; width:484px; top:275px; background-color:#42a6db; height:30px; color:white; font-family:Arial, sans-serif; font-size:1.2em; cursor:pointer; text-align:center; padding-top:10px; left:5px; font-weight:bold; visibility:visible} .botonovideo2 {position:absolute; width:310px; top:0px; background-color:#42a6db; height:30px; color:white; font-family:Arial, sans-serif; font-size:1.2em; cursor:pointer; text-align:center;  left:5px; padding-top:10px; font-weight:bold; visibility:hidden; -moz-transform:rotate(-270deg); -moz-transform-origin:bottom left; -webkit-transform:rotate(-270deg); -webkit-transform-origin:bottom left; -o-transform:rotate(-270deg); -o-transform-origin:bottom left; margin-top:-35px} #listavotos {position:absolute; top:0px; left:0px; background-color:rgb(10, 10, 10); opacity:0.91; width:470px; padding:5px 5px 5px 15px; height:310px; visibility:hidden; z-index:1000} #playback {z-index:999}";
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.appendChild(document.createTextNode(css));
        heads[0].appendChild(node);
    }
    document.getElementById("meta-frame").style.height = "320px";
    var butmeh = document.createElement("div");
    butmeh.innerHTML = "(להצביע לא אהבתי (אוטומטי";
    butmeh.setAttribute("class", "botonmeh");
    document.getElementById("meta-frame").appendChild(butmeh);
    var butwoot = document.createElement("div");
     butwoot.innerHTML = "(להצביע אהבתי (אוטומטי";
    butwoot.setAttribute("class", "botonwoot");
    document.getElementById("meta-frame").appendChild(butwoot);
    //-------------------
    document.getElementById("playback").style.height = "320px";
    document.getElementById("playback").style.zindex = "999";
    document.getElementById("audience").style.top = "321px";
    var butovideo = document.createElement("div");
    butovideo.innerHTML = "הסתר וידאו";
    butovideo.setAttribute("class", "botonovideo");
    butovideo.setAttribute("id", "butovideo");
    document.getElementById("playback").appendChild(butovideo);
    var butovideo2 = document.createElement("div");
    butovideo2.innerHTML = "הראה וידאו";
    butovideo2.setAttribute("class", "botonovideo2");
    butovideo2.setAttribute("id", "butovideo2");
    document.getElementById("playback").appendChild(butovideo2);
	//-------------------
	var lista = document.createElement("div");
	lista.setAttribute("id", "listavotos");
	lista.setAttribute("style", "visibility:hidden");
	document.getElementById("room-score-value").setAttribute("style", "cursor:pointer");
	lista.innerHTML = "<strong style='font-family:CalgaryScript, Arial, sans-serif; font-size:28px'>Votos</strong></br><div id='listavotosin' style='max-; overflow-x:hidden; overflow-y:auto; max-height:270px;'></div>";
	document.getElementById("playback").appendChild(lista);
	actlista();
    //----------------------------------------------------------
    butwoot.addEventListener("click", function () {
        if (autowoot == 0) {
            autowoot = 1;
            automeh = 0;
            butwoot.setAttribute("class", "botonwoot_s");
            butmeh.setAttribute("class", "botonmeh")
        } else if (autowoot == 1) {
            autowoot = 0;
            butwoot.setAttribute("class", "botonwoot")
        } else {
            return 0
        }
    }, false);
    butmeh.addEventListener("click", function () {
        if (automeh == 0) {
            automeh = 1;
            autowoot = 0;
            butmeh.setAttribute("class", "botonmeh_s");
            butwoot.setAttribute("class", "botonwoot")
        } else if (automeh == 1) {
            automeh = 0;
            butmeh.setAttribute("class", "botonmeh")
        } else {
            return 0
        }
    }, false);
    butovideo.addEventListener("click", function () {
        document.getElementById("playback-container").style.visibility = "hidden";
        document.getElementById("playback").style.width = "50px";
        document.getElementById("button-hd-off").style.visibility = "hidden";
        document.getElementById("button-hd-on").style.visibility = "hidden";
        document.getElementById("button-refresh").style.visibility = "hidden";
        document.getElementById("nobody-playing").style.visibility = "hidden";
        document.getElementById("playback-buffering").style.visibility = "hidden";
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.appendChild(document.createTextNode(".botonovideo {visibility:hidden !important} .botonovideo2 {visibility:visible !important} #chat {height:321px; left:408px; width:800px} #chat-header {width:100%} #chat-messages {width:98%} .chat-message {width:100%} .chat-input {width:94%} #chat-input-field {width:100%} #bottom-chat-line {top:290px} #chat-input-field {width:100%} .chat-input{top:296px} #button-chat-expand {top:291px} .chat-skip {width:100%}"));
            heads[0].appendChild(node);
        }
    }, false);
    butovideo2.addEventListener("click", function () {
        document.getElementById("playback-container").style.visibility = "visible";
        document.getElementById("playback").style.width = "494px";
        document.getElementById("button-hd-off").style.visibility = "visible";
        document.getElementById("button-hd-on").style.visibility = "visible";
        document.getElementById("button-refresh").style.visibility = "visible";
        document.getElementById("nobody-playing").style.visibility = "visible";
        document.getElementById("playback-buffering").style.visibility = "visible";
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.appendChild(document.createTextNode(".botonovideo {visibility:visible !important} .botonovideo2 {visibility:hidden !important} #chat {height:321px; left:852px; width:348px} #chat-header {width:348px} #chat-messages {width:333px} .chat-message {width:308px} .chat-input {width:295px} #chat-input-field {width:294px} #bottom-chat-line {top:290px} #chat-input-field {width:100%} .chat-input{top:296px} #button-chat-expand {top:291px} "));
            heads[0].appendChild(node);
        }
    }, false);
	document.getElementById("room-score-value").addEventListener("click", function () {
		if (lista.getAttribute("style") == "visibility:hidden") {
			lista.setAttribute("style", "visibility:visible");
		} else {
			lista.setAttribute("style", "visibility:hidden");
		}
	}, false);
    API.bind(API.DJ_ADVANCE, autovote);
	API.bind(API.DJ_UPDATE, autovote);
	API.bind(API.DJ_ADVANCE, actlista);
	API.bind(API.DJ_UPDATE, actlista);
	API.bind(API.VOTE_UPDATE, actlista);
	API.bind(API.USER_JOIN, actlista);
	API.bind(API.USER_LEAVE, actlista);
}
function cinit() {
    if (typeof API == "object" && API.getVolume() != undefined) {
        clearInterval(relojCarga);
        init();
        return 1;
    } else {
        return 0;
    }
}
var relojCarga = setInterval(cinit, 500);
//-------------------------------------------------------------------
function autovote(obj) {
    if (obj == null) return 0;
    if (autowoot == 1) {
        if (document.getElementById("button-vote-positive") != undefined) {
            var event = new Event('click');
            document.getElementById("button-vote-positive").dispatchEvent(event);
            return 1;
        }
    } else if (automeh == 1) {
        if (document.getElementById("button-vote-negative") != undefined) {
            var event = new Event('click');
            document.getElementById("button-vote-negative").dispatchEvent(event);
            return 1;
        }
    } else {
        return 0;
    }
}
//-------------------------------------------------------------------
function actlista(obj) {
	document.getElementById("listavotosin").innerHTML = "";
	for (i=0;i<API.getUsers().length;i++) {
		var user = API.getUsers()[i];
		if (API.getDJs()[0].username == user.username) {
 			document.getElementById("listavotosin").innerHTML += "<font color='orange':><b>"+user.username+"</b> :די ג'יי פעיל</font></br>";
		} else {
			if (user.vote == 1) {
				document.getElementById("listavotosin").innerHTML += "<font color='lime'> .אהב <b>"+user.username+"</b> </font></br>";
			} else if (user.vote == 0) {
				document.getElementById("listavotosin").innerHTML += "<font color='white'> .עדיין לא הצביע <b>"+user.username+"</b></font></br>";
			} else if (user.vote == -1) {
				document.getElementById("listavotosin").innerHTML += "<font color='red'> .לא אהב <b>"+user.username+"</b></font></br>";
			} else {
				return 0;
			}
		}
	}
	document.getElementById("listavotosin").innerHTML += "</br>";
}