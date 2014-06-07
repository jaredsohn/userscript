// ==UserScript==
// @name           SCRIPT MOD DA DGOH CODES - INFO | WEB
// @namespace      editado por Iago | uid=15634686484504502302
// @description    SCRIPT OFICIAL DA DGOH CODES 
// @TESTE    	   http://www.orkut.com.br/Main#Community?cmm=105897509
// @include        *.orkut.*/Main#CommMsgs?cmm=105897509*
// @include        *.orkut.*/CommMsgs?cmm=105897509*
// @include        *.orkut.*/Main#CommMemberManage?cmm=105897509*
// @include        *.orkut.*/CommMemberManage?cmm=105897509*
// @include        *.orkut.*/Community?cmm=105897509*
// @include        *.orkut.*/Main#Community?cmm=105897509*
// ==/UserScript==
/*
+---------------------------------------------------------------------+
| 			                                              |
|			                                              |
|	
|     este script foi criado por joseph,e editado por Iago Rammiro     |
|						                      |
+---------------------------------------------------------------------+
*/

Editado_por = "IagoKx";

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
			if (document.getElementById("cs").value == "CommMsgPost?cmm=105897509&tid=5511594985869474689") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=105897509&tid=5511594985869474689", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[3], 'ban', '');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\"><fieldset><legend>Captcha:</legend></div>";
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
			if (document.getElementById("cs").value == "CommMsgPost?cmm=105897509&tid=5511594985869474689") alert("Esqueceu de digitar o captcha!");
			else {
				var ajax = new XMLHttpRequest;
				env.cs = document.getElementById("cs").value;
				ajax.open("POST", "CommMsgPost?cmm=105897509&tid=5511594985869474689", false);
				ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
				ajax.send(array_values(env));
				eval("_submitForm(document.forms[4], 'delete_entire_topic', 'true');");
			}
		};
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\"><fieldset><legend>Captcha:</legend></div>";
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
		if (!uid) uid = "uid=" + String(Math.floor(Math.random() * 99999999999999999999));
		var rnd = String(Math.random());
		var texto = "Titulo: ".concat(titulo, breakLine, "Criador: ", uid, breakLine, "Motivo: ", motivo, breakLine, "Horario: ", pegaData(), breakLine, breakLine, "[silver]", rnd, "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": encodeURIComponent("Tópico Deletado!"),
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=105897509&tid=5511594985869474689", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaDelTopic(envia);
	};

	function postaMembroBanido(uid, motivo) {
		var ajax = new XMLHttpRequest;
		var breakLine = "\n";
		var rnd = String(Math.random());
		var texto = "Uid do membro: ".concat(uid, breakLine, "Motivo: ", motivo, breakLine, "Horario: ", pegaData(), breakLine, breakLine, "[silver]", rnd, "[/silver]");
		var envia = {
			"POST_TOKEN": JSHDF["CGI.POST_TOKEN"],
			"signature": encodeURIComponent(JSHDF["Page.signature.raw"]),
			"subjectText": "Membro banido!",
			"bodyText": encodeURIComponent(texto),
			"Action.submit": "Enviar+dados"
		};
		ajax.open("POST", "CommMsgPost?cmm=105897509&tid=5511594985869474689", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText)) captchaBAN(envia);
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
		var stringItem = "if (confirm('Voc/ê Tem certeza que deseja deletar este t\ópico?')){postaTopicoDeletado(document.getElementsByTagName('h1')[0].innerHTML,document.body.innerHTML.match(/uid=(\\d+)/ig)[1],prompt('digite o motivo de estar deletando este topico:\\n','T\ópico de spam'));_submitForm(this, 'delete_entire_topic', 'true');; return false;}";
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


//Inicia tudo:
confirmaDeletarTopicos();
confirmaBaneMembro();
criaBotao();