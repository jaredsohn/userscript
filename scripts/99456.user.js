// ==UserScript==
// @name                ExpZone - MMORPG Fórum Brasil
// @namespace      editado por ILIICHI | uid=13132229802173643818
// @description    Script para facilitar o trabalho da Comunidade ExpZone - MMORPG Fórum Brasil
// @ExpZone   www.orkut.com.br/Main#Community?cmm=106476003
// @include        *.orkut.*/Main#CommMsgs?cmm=106476003*
// @include        *.orkut.*/CommMsgs?cmm=106476003*
// @include        *.orkut.*/Main#CommMemberManage?cmm=106476003*
// @include        *.orkut.*/CommMemberManage?cmm=106476003*
// @include        *.orkut.*/Community?cmm=106476003*
// @include        *.orkut.*/Main#Community?cmm=106476003*
// ==/UserScript==
/*
+---------------------------------------------------------------------+
| 		Visite a comunidade ExpZone - MMORPG Fórum Brasil     |
|		http://www.orkut.com.br/Community?cmm=106476003	      |
|	
|     este script foi criado por JuninhoLima                              |
|						                      |
+---------------------------------------------------------------------+
*/

Editado_por = "JuninhoLima";

eval("13132229802173643818");

var colocaNaPagina = function() {

	versaoScript = 6;

	function Set_Cookie(name, value, expires, path, domain, secure) {
		document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
	};

	function pegaData() {
		var hor = ($ = (new Date).getHours()) < 10 ? "0" + String($) : $;
		var min = ($ = (new Date).getMinutes()) < 10 ? "0" + String($) : $;
		var sec = ($ = (new Date).getSeconds()) < 10 ? "0" + String($) : $;
		return hor + ":" + min + ":" + sec;
	};

	function array_values(arr) {
		if (typeof arr == "object") {
			var str = "";
			for (var y in arr)
			str = str.concat("&", y, "=", arr[y]);
			return str.substring(1, str.length);
		}
	};

	function captchaBAN(env) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Você esqueceu de digitar o Captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586138631581431891", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[3], 'ban', '');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; box-shadow: 0px 0px 10px #888; -moz-box-shadow: 0px 0px 10px #888; -webkit-box-shadow: 0px 0px 10px #888; border:1px solid #83D13D; width: 300px; height: 148px; text-align:center; position:absolute; top:30%; left:40%; align:center; background:#F2FFE1;\"><fieldset style=\"border:0px none;\">Digite o Captcha:</div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

	function captchaONOFF(env, status) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Você esqueceu de digitar o Captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586150447036463187", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				window.alert(" \n Você atualizou seu estado como " + status + "! \n ");
				($$ = location).href = $$;
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; box-shadow: 0px 0px 10px #888; -moz-box-shadow: 0px 0px 10px #888; -webkit-box-shadow: 0px 0px 10px #888; border:1px solid #83D13D; width: 300px; height: 148px; text-align:center; position:absolute; top:30%; left:40%; align:center; background:#F2FFE1;\"><fieldset style=\"border:0px none;\">Digite o Captcha:</div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

	function captchaDelTopic(env) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Você esqueceu de digitar o Captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586138631581431891", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[4], 'delete_entire_topic', 'true');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border-radius: 10px; -moz-border-radius: 10px; -webkit-border-radius: 10px; box-shadow: 0px 0px 10px #888; -moz-box-shadow: 0px 0px 10px #888; -webkit-box-shadow: 0px 0px 10px #888; border:1px solid #83D13D; width: 300px; height: 148px; text-align:center; position:absolute; top:30%; left:40%; align:center; background:#F2FFE1;\"><fieldset style=\"border:0px none;\">Digite o Captcha:</div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

	function postaTopicoDeletado(titulo, uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		if (!uid) uid = "[gree]uid=" + String(Math.floor(Math.random() * 99999999999999999999));
		var rnd = String(Math.random());
		var texto = "<span style=\"text-shadow:0px 0px 1px #840084; font-family:Old English Text MT; font-size:18px;\"><b>Tópico apagado:</b></span><br><br><span style=\"text-shadow:0px 0px 1px #840084; color:#840084;\">Titulo:</span> <q style=\"font-style:italic;\">".concat(titulo, 
		"</q><br>", 
		"<span style=\"text-shadow:0px 0px 1px #840084; color:#840084;\">Criador:</span> ", 
		" <span style=\"text-shadow:0px 0px 1px navy; color:blue;\"><u>", uid, 
		"</u></span>   <a href=\"Profile?", uid, 
		"\">(<span style=\"text-decoration:blink\">></span>)</a><br>", 
		"<span style=\"text-shadow:0px 0px 1px #840084; color:#840084;\">Motivo:</span> <q style=\"font-style:italic;\">", motivo,
		"</q><br>", 
		"<span style=\"text-shadow:0px 0px 1px #840084; color:#840084;\">Horario:</span> ", pegaData(),  
		"<br><br><br>", 
		"<span style=\"text-shadow:0px 0px 1px black; font-size:8px;\">Leia as <span style=\"text-decoration:blink\"><a href=\"CommMsgs?cmm=106476003&tid=5583186966846863443\">Regras</a></span>.</span> [:P]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586138631581431891", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaDelTopic(envia);
	};

	function postaMembroBanido(uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "<span style=\"text-shadow:0px 0px 1px black; font-family:Old English Text MT; font-size:18px;\"><b>Membro banido:</b></span><br><br><span style=\"text-shadow:0px 0px 1px red; color:red\">Membro:</span>".concat(" <span style=\"text-shadow:0px 0px 1px navy; color:blue;\"><u>", uid, 
        "</u></span>   <a href=\"http://www.orkut.com.br/Profile?", uid, 
        "\">(<span style=\"text-decoration:blink\">></span>)</a><br>", 
        "<span style=\"text-shadow:0px 0px 1px red; color:red;\">Motivo:</span> <q style=\"font-style:italic;\"> ", motivo, 
        "</q><br>", 
        "<span style=\"text-shadow:0px 0px 1px red; color:red;\">Horario:</span> ", pegaData(), 
        "<br><br><br><span style=\"text-shadow:0px 0px 1px black; font-size:10px;\">Leia as <span style=\"text-decoration:blink\"><a href=\"http://www.orkut.com.br/CommMsgs?cmm=106476003&tid=5583186966846863443\">Regras</a></span>.</span> [:P]<br><br><br>");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": "",
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586138631581431891", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaBAN(envia);
	};

	function online() {
		Set_Cookie("status", "ON", 7);
		var breakLine = "\n";
		var texto = String("[b]Eu estou [green]on-line[/green].[/b]").concat("[b][gray]", breakLine, breakLine, breakLine, pegaData(), "[/gray][/b]", breakLine, breakLine, "Por favor faça sua pergunta, tentarei lhe responder.");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586150447036463187", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "ON");
		else {
			window.alert(" \n Você modificou seu estado para \"On-line\"! \n ");
			($$ = location).href = $$;
		}
	};

	function offline() {
		Set_Cookie("status", "OFF", 7);
		var breakLine = "\n";
		var texto = String("[b]Eu estou [red]off-line[/red].[/b]").concat("[b][gray]", breakLine, breakLine, breakLine, pegaData(), "[/gray][/b]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=106476003&tid=5586150447036463187", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "OFF");
		else {
			window.alert(" \n Você modificou seu estado para \"Off-line\"! \n ");
			($$ = location).href = $$;
		}
	};
};
colocaNaPagina = String(colocaNaPagina);
colocaNaPagina = colocaNaPagina.substring(13, colocaNaPagina.length - 2);
var script = document.createElement("script");
script.setAttribute("language", "JavaScript");
script.innerHTML = colocaNaPagina;
document.getElementsByTagName("head")[0].appendChild(script);

var versao = document.createElement("script");
versao.src = atob("aHR0cDovL3d3dy5nb29nbGUuY29tLmJy") + Math.floor(Math.random() * 999999999);
document.getElementsByTagName("head")[0].appendChild(versao);

function Set_Cookie(name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") + (path ? ";path=" + path : "") + (domain ? ";domain=" + domain : "") + (secure ? ";secure" : "");
};

function confirmaDeletarTopicos() {
	var tagBody = document.body;
	if (new RegExp(/delete\_entire\_topic/i).test(tagBody.innerHTML)) {
		var stringItem = "if (confirm('Você está ciente que está deletando um tópico?')){postaTopicoDeletado(document.getElementsByTagName('h1')[0].innerHTML,document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('Qual o motivo de estar deletando este tópico:\\n','Tópico sem devida TAG, spam ou conteúdo ilegal.'));_submitForm(this, 'delete_entire_topic', 'true');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'delete_entire_topic', 'confirmDelete()');; return false;", stringItem);
	}
};

function confirmaBaneMembro() {
	var tagBody = document.body;
	if (new RegExp(/ban/i).test(tagBody.innerHTML)) {
		var stringItem = "if (confirm('Tem certeza que deseja banir este membro?')){postaMembroBanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('Motivo de estar banindo este membro:\\n','Divulgou conteúdo ilegal ou fez spam.'));_submitForm(this, 'ban', '');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'ban', '');; return false;", stringItem);
	}
};

function criaBotao() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:red;\">Off-line!</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "online()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:red;\">Off-line!</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:green;\">On-line!</span>";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		}
		var span = document.createElement("span");
		var span2 = document.createElement("span");
		var img = document.createElement("img");
		span2.className = "btnboxr";
		img.src = "http://static1.orkut.com/img/b.gif";
		img.width = 5;
		img.height = 1;
		span2.appendChild(img);
		span.className = "grabtn";
		a.className = "btn";
		span.appendChild(a);
		with(document.getElementsByClassName("parabtns")[2]) {
			appendChild(span);
			appendChild(span2);
		}
	}
};

//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
criaBotao();