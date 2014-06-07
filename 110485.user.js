// ==UserScript==
// @name           [ RH +] Radio Hunter ᴾˡᵘˢ - Moderação
// @namespace      editado por Guilherme | uid=15068755456499681157
// @description    Script para facilitar o trabalho da Comunidade Radio Hunter ᴾˡᵘˢ .
// @CFBT     www.orkut.com.br/Main#Community?cmm=117249465
// @include        *.orkut.*/Main#CommMsgs?cmm=117249465*
// @include        *.orkut.*/CommMsgs?cmm=117249465*
// @include        *.orkut.*/Main#CommMemberManage?cmm=117249465*
// @include        *.orkut.*/CommMemberManage?cmm=117249465*
// @include        *.orkut.*/Community?cmm=117249465*
// @include        *.orkut.*/Main#Community?cmm=117249465*
// ==/UserScript==
/*
+---------------------------------------------------------------------+
| 		                                 	              |
|	http://www.orkut.com.br/Main#Community?cmm=117249465          |
|	
|     este script foi criado por joseph, e editado por Brenno Lopes   |
|						                      |
+---------------------------------------------------------------------+
*/

Editado_por = "Brenno Lopes";

eval("6495868269379011071");

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
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?http://www.orkut.com.br/Main#CommMsgs?cmm=117249465&tid=5641624721084005585", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[3], 'ban', '');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\"><fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};

function captchaDesban(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.setAttribute("onClick",
		'if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");' +
		'	else ' + 
		'		{ ' +
 		'			var ajax = new XMLHttpRequest;' + 
		'			ajax.open("POST","' + tpc + '", false);' + 
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' + 
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' + 
		'			eval("_submitForm(document.forms[3], \'unBan\', \'\');");' + 
		'		} ');
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\">"+
		"<fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c)
		{
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
			c.innerHTML = c.innerHTML + recarregaCaptcha();
		}
	};
	
	function captchaKick(env)
	{
		if (document.getElementById("captcha"))
			document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");
		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.setAttribute("onClick",
		'if (document.getElementById("cs").value == "")alert("Esqueceu de digitar o captcha!");' +
		'	else ' + 
		'		{ ' +
 		'			var ajax = new XMLHttpRequest;' + 
		'			ajax.open("POST","' + tpc + '", false);' + 
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' + 
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' + 
		'			eval("_submitForm(document.forms[document.forms.length-3], \'boot\', \'\');");' + 
		'		} ');
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\">"+
		"<fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c)
		{
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
			c.innerHTML = c.innerHTML + recarregaCaptcha();
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
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				window.alert("Postado como " + status + "  ;D");
				($$ = location).href = $$;
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\"><fieldset><legend>Captcha:</legend></div>";
		document.body.innerHTML += div;
		var c = document.getElementById("captcha").getElementsByTagName("fieldset")[0];
		with(c) {
			appendChild(img);
			c.innerHTML = c.innerHTML + "<br /><br />";
			appendChild(text);
			appendChild(button);
		}
	};
	
		function captchalocutor(env, status) {
		if (document.getElementById("captcha")) document.body.removeChild(document.getElementById("captcha"));
		var img = document.createElement("img");

		var text = document.createElement("input");
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Enviar!";
		button.onclick = function() {
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5642292171886705873", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				($$ = location).href = $$;
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\"><fieldset><legend>Captcha:</legend></div>";
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
			if (document.getElementById("cs").value == "") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[4], 'delete_entire_topic', 'true');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#C8C8C8;\"><fieldset><legend>Captcha:</legend></div>";
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
		if (!uid) uid = "[green]" + String(Math.floor(Math.random() * 99999999999999999999));
		var rnd = String(Math.random());
        var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#75C400\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Titulo:[/b] ".concat(titulo, breakLine, "[b]Criador:[/b] ", "[gray]", uid, breakLine, "[/gray]", breakLine, "[b]Motivo:[/b] ", motivo, breakLine, "[b]Horario:[/b] ", pegaData(), breakLine, "[/gray]</font></font></div></td></tr></tbody></table></span></span>");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent("Tópico Excluido: "),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641624721084005585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaDelTopic(envia);
	};

	function postaMembroBanido(uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#000000\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Membro:[/b] ".concat("[b]", uid, breakLine, "[/b]", breakLine, "[b]Motivo:[/b] ", motivo, breakLine, "[b]Horario:[/b] ", pegaData(), breakLine, breakLine, "</font></font></div></td></tr></tbody></table></span></span>");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": "Membro banido:",
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641624721084005585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));

		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaBAN(envia);
	};
	
	function postaMembroKickado(uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#363636\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Uid:[/b] ".concat(uid,breakLine,
			    "[b][red]Motivo[/red]:[/b] ",motivo,breakLine,
			    "[b]Horario:[/b] ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]</font></font></div></td></tr></tbody></table></span></span>");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : "Membro removido!",
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641624721084005585", false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaKick(envia);
		
	}
	
function postaMembroDesbanido(uid, motivo)
	{
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#1C1C1C\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Perfil:[/b] ".concat(uid,breakLine,
			    "[b]Motivo:[/b] ",motivo,breakLine,
			    "[b]Horário:[/b] ", pegaData(),breakLine,breakLine,
			    "[silver]",rnd,"[/silver]</font></font></div></td></tr></tbody></table></span></span>");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : "Membro desbanido!",
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641624721084005585", false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaDesban(envia);
	};

	function online() {
		Set_Cookie("status", "ON", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#1D1D1D\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Eu estou [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(0, 255, 0) 0px 0px 5px\">[lime]ONLINE[/lime]</span></span>[/b].\n[b]Hora:[/b][purple] " + pegaData() + "[/purple]\n\n<div style='text-align:right'>[gray][i]Estou ONLINE, faça sua pergunta, tentarei lhe ajudar.[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "ON");
		else {
			window.alert(" \n Você modificou seu estado para \"online\" \n ");
			($$ = location).href = $$;
		}
	};

	function ausente() {
		Set_Cookie("status", "ON", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#1D1D1D\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Eu estou [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(255, 165, 0) 0px 0px 5px\">[orange]AUSENTE[/orange]</span></span>[/b].\n[b]Hora:[/b][purple] " + pegaData() + "[/purple]\n\n<div style='text-align:right'>[gray][i]Estou AUSENTE, mais ainda tentarei lhe responder.[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "ON");
		else {
			window.alert(" \n Você modificou seu estado para \"ausente\" \n ");
			($$ = location).href = $$;
		}
	};

	function ocupado() {
		Set_Cookie("status", "ON", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#1D1D1D\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Eu estou [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(255, 0, 0) 0px 0px 5px\">[red]OCUPADO[/red]</span></span>[/b].\n[b]Hora:[/b][purple] " + pegaData() + "[/purple]\n\n<div style='text-align:right'>[gray][i]Estou OCUPADO, peça ajuda a outro moderador, mas ainda tentarei lhe responder.[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "ON");
		else {
			window.alert(" \n Você modificou seu estado para \"ocupado\" \n ");
			($$ = location).href = $$;
		}
	};

	function offline() {
		Set_Cookie("status", "OFF", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#1D1D1D\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Eu estou [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(105, 105, 105) 0px 0px 5px\">[b]OFFLINE[/b]</span></span>[/b].\n[b]Hora:[/b][purple] " + pegaData() + "[/purple]\n\n<div style='text-align:right'>[gray][i]Estou OFFLINE, peça ajuda a outro moderador.[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5641622036729445585", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
	if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaONOFF(envia, "OFF");
		else {
			window.alert(" \n Você modificou seu estado para \"offline\" \n ");
			($$ = location).href = $$;
		}
	};
	
	function locutoronline() {
		Set_Cookie("status", "ON", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#333333\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Programa esta [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(255, 0, 0) 0px 0px 5px\">[red]ONLINE[/red]</span></span>[/b].\n\[/purple][b]Hora:[/b][purple] " + pegaData() +motivo + "[/purple]\n\n<div style='text-align:right'>[gray][i]Programa ONLINE, faça seu pedido  [link=http://www.radiohunter.com.br/master/pedidos/]aqui[/link].[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5642292171886705873", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
	if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchalocutor(envia, "ON");
		else {
			window.alert(" \n Você modificou seu estado para \"Locutor ON\" \n ");
			($$ = location).href = $$;
		}
	};
	
	function locutoroffline() {
		Set_Cookie("status", "OFF", 7);
		var breakLine = "\n";
		var texto = "<table cellspacing=\"5\"><tbody><tr align=\"left\" valign=\"top\"><td bgcolor=\"#333333\" width=\"6\" style=\"color: rgb(0, 0, 0); \"><br></td><td align=\"left\" valign=\"top\" width=\"\" style=\"color: rgb(0, 0, 0); \"><font face=\"Comic Sans MS\"><font color=\"#0\">[b]Status:[/b] Programa esta [b]<span style=\"font-family:Comic Sans MS\"><span style=\"text-shadow:rgb(105, 105, 105) 0px 0px 5px\">[b]OFFLINE[/b]</span></span>[/b].\n[b]Hora:[/b][purple] " + pegaData() + "[/purple]\n\n<div style='text-align:right'>[gray][i]Programação OFFLINE, siga agora a programação normal, da Radio Hunter, acesse  [link=http://www.radiohunter.com.br]/radiohunter.com.br[/link].[/i][/gray]</div></font></font></div></td></tr></tbody></table></span></span>";
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent(""),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		var ajax = new XMLHttpRequest;
		ajax.open("POST", "CommMsgPost?cmm=117249465&tid=5642292171886705873", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
	if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchalocutor(envia, "OFF");
		else {
			window.alert(" \n Você modificou seu estado para \"Locutor OFF\" \n ");
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
		var stringItem = "if (confirm('Tem certeza que deseja deletar este tópico?')){postaTopicoDeletado(document.getElementsByTagName('h1')[0].innerHTML,document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('Qual o motivo de estar deletando este tópico:\\n','T\ópico de spam'));_submitForm(this, 'delete_entire_topic', 'true');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'delete_entire_topic', 'confirmDelete()');; return false;", stringItem);
	}
};

function confirmaBaneMembro() {
	var tagBody = document.body;
	if (new RegExp(/ban/i).test(tagBody.innerHTML)) {
		var stringItem = "if (confirm('Tem certeza que deseja banir este membro?')){postaMembroBanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('Motivo de estar banindo este membro:\\n','fez spam'));_submitForm(this, 'ban', '');; return false;}";
		tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'ban', '');; return false;", stringItem);
	}
};

function confirmaDesbaneMembro()
	{
		var tagBody = document.body;
		if (new RegExp(/\&nbsp;\(Expulso\)/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja desbanir este membro?')){" +
			"postaMembroDesbanido(document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," + 
			"prompt('Digite o motivo de estar desbanindo este membro:\\n',''));" + 
			"_submitForm(this, 'unBan', '');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'unBan', '');; return false;", stringItem);
		}
	};
	
function confirmaRemoveMembro()
	{
		var tagBody = document.body;
		if (new RegExp(/boot/i).test(tagBody.innerHTML))
		{
			var stringItem = "if (confirm('Tem certeza que deseja remover este membro?')){" +
			"postaMembroKickado(document.body.innerHTML.match(/uid=(\\d+)/ig)[1]," + 
			"prompt('Digite o motivo de estar removendo este membro:\\n','Fez spam'));" + 
			"_submitForm(this, 'boot', '');; return false;}";
			tagBody.innerHTML = tagBody.innerHTML.replace("_submitForm(this, 'boot', '');; return false;", stringItem);
		}
	};

function criaBotao() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:gray;\">Offline</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "online()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:gray;\">Offline</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:green;\">Online</span>";
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

function criaBotao2() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:red;\">busy</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "ocupado()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:red;\">busy</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "ocupado()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:red;\">busy</span>";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "ocupado()");
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

function criaBotao3() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:orange;\">away</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "ausente()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:orange;\">away</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "ausente()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:orange;\">away</span>";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "ausente()");
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

function criaBotao4() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:red;\">locutor on</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "locutoronline()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:red;\">locutor on</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "locutoronline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:red;\">locutor on</span>";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "locutoronline()");
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
		with(document.getElementsByClassName("parabtns")[3]) {
			appendChild(span);
			appendChild(span2);
		}
	}
};

function criaBotao5() {
	if (location.href.match(/Community/i)) {
		var a = document.createElement("a");
		if (! (new RegExp(/status/i).test(document.cookie))) {
			Set_Cookie("status", "OFF", 7);
			a.innerHTML = "<span style=\"color:gray;\">locutor off</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "locutoroffline()");
		} else if (document.cookie.match(/status\=(.*)/i)[1].match("ON")) {
			a.innerHTML = "<span style=\"color:gray;\">locutor off</span>";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "locutoroffline()");
		} else {
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF")) {
				a.innerHTML = "<span style=\"color:gray;\">locutor off</span>";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "locutoroffline()");
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
		with(document.getElementsByClassName("parabtns")[3]) {
			appendChild(span);
			appendChild(span2);
		}
	}
};
//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
confirmaDesbaneMembro();
confirmaRemoveMembro();
criaBotao();
criaBotao2();
criaBotao3();
criaBotao4();
criaBotao5();