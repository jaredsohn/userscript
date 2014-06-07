// ==UserScript==
// @name           Santos FC Members v2.0 Final
// @namespace      by Joseph | editado por JP
// @description    Script para os membros da Santos fc (Oficial)
// @dgohcodes      orkut.com.br/Community?cmm=110917399
// @include        *.orkut.*/Main#CommMsgs?cmm=110917399*
// @include        *.orkut.*/CommMsgs?cmm=110917399*
// @include        *.orkut.*/Main#CommMemberManage?cmm=110917399*
// @include        *.orkut.*/CommMemberManage?cmm=110917399*
// @include        *.orkut.*/Community?cmm=110917399*
// @include        *.orkut.*/Main#Community?cmm=110917399*
// ==/UserScript==

/*
+---------------------------------------------------------------------+
| 		Visite a comunidade do Santos Fc no Orkut 	      |
|		http://www.orkut.com.br/Community?cmm=110917399       |
|		Forum Santos FC: 				      |
|		/CommTopics?cmm=1273448				      |
+---------------------------------------------------------------------+
*/

Criado_por = "Joseph";

eval("\x69\x66\x20\x28\x43\x72\x69\x61\x64\x6f\x5f\x70\x6f\x72\x20\x21\x3d\x20\x27\x4a\x6f\x73\x65\x70\x68\x27\x29\x6c\x61\x6c\x61\x3b");

var colocaNaPagina = function(){

versaoScript = 7;

function Set_Cookie(name,value,expires,path,domain,secure)
	{
         document.cookie = name + "=" + escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
            (path ? ";path=" + path : "") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
      };

function pegaData()
	{
		var hor = ($ = (new Date).getHours()) < 10 ? "0" + String($) : $;
		var min = ($ = (new Date).getMinutes()) < 10 ? "0" + String($) : $;
		var sec = ($ = (new Date).getSeconds()) < 10 ? "0" + String($) : $;
		return hor + ":" + min + ":" + sec;
	};
function array_values(arr)
	{
		if (typeof arr == "object")
		{
		var str = "";
		for (var y in arr)
			str = str.concat("&", y, "=", arr[y]);
		return str.substring(1,str.length);
		}
	};
function recarregaCaptcha()
	{
		var html = "<br><br><a href=\"javascript:void false\" onclick=\"document.getElementById('captcha').innerHTML=" +
		"document.getElementById('captcha').innerHTML.replace(/CaptchaImage\\?xid=\\d+/, 'CaptchaImage?xid=' + Math.random());\">Recarregar captcha!</a>";
		return html;
	};

function captchaBANUSER(env)
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
		'			ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x31\x31\x30\x39\x31\x37\x33\x39\x39\x26\x74\x69\x64\x3d\x35\x35\x37\x31\x35\x37\x33\x32\x36\x37\x35\x37\x35\x35\x33\x32\x37\x35\x33", false);' + 
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' + 
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' + 
		'			eval("_submitForm(document.forms[document.forms.length-1], \'banuser\', \'true\');");' + 
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

function captchaONOFF(env, status)
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
		'			ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x31\x31\x30\x39\x31\x37\x33\x39\x39\x26\x74\x69\x64\x3d\x35\x35\x37\x31\x35\x37\x33\x31\x38\x35\x39\x37\x31\x31\x35\x34\x31\x32\x39", false);' + 
		'			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");' + 
		'			ajax.send("cs=" + document.getElementById("cs").value + "&' + array_values(env) + '");' + 
		'			window.alert("Postado como ' + status + '!");' + 
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

function banuser()
	{
		Set_Cookie("ban","ban", 8);
                r1 = window.prompt('Uid do membro a ser banido:');
                r2 = window.prompt('Motivo:');
                r3 = window.prompt('Topico onde ocorreu isso:');
                r1;
                r2;
                r3;
                var texto = String("[b]Membro que quero banir:[/b] ").concat(r1,"\n[b]Motivo: [/b]",r2,"\n[b]Topico onde aconteceu: [/b]",r3,"\n\n[silver]",Math.random(),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x31\x31\x30\x39\x31\x37\x33\x39\x39\x26\x74\x69\x64\x3d\x35\x35\x37\x31\x35\x37\x33\x32\x36\x37\x35\x37\x35\x35\x33\x32\x37\x35\x33",false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaBANUSER(env, "ban");
		else
			{
				window.alert("Postado! agora espere um mod ver e tomar a providencia!");
				($$ = location).href = $$;
			}
	};

function online()
	{
		Set_Cookie("status","ON", 7);
                o1 = window.prompt('Ficarei ON ate:');
                o1;
		var texto = String("[b][green]ON![/green][/b]\n\n[b]Ficarei ON ate: [green]").concat(o1,"\n\n[/b][silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;
		ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x31\x31\x30\x39\x31\x37\x33\x39\x39\x26\x74\x69\x64\x3d\x35\x35\x37\x31\x35\x37\x33\x31\x38\x35\x39\x37\x31\x31\x35\x34\x31\x32\x39",false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "ON");
		else
			{
				window.alert("Postado como ON!");
				($$ = location).href = $$;
			}
	};
function offline()
	{
		Set_Cookie("status","OFF", 7);
                f1 = window.prompt('Volto as:');
                f1;
		var texto = String("[b][red]OFF![/red][/b]\n\n[b]Volto as: [red]").concat(f1,"\n\n[/b][silver]",String(Math.random()),"[/silver]");
		var envia = {
			    	"POST_TOKEN" : JSHDF["CGI.POST_TOKEN"],
				"signature" : encodeURIComponent(JSHDF["Page.signature.raw"]),
				"subjectText" : encodeURIComponent(""),
				"bodyText" : encodeURIComponent(texto),
				"Action.submit" : "Enviar+dados"
			    };
		var ajax = new XMLHttpRequest;





		ajax.open("POST","CommMsgPost?\x63\x6d\x6d\x3d\x31\x31\x30\x39\x31\x37\x33\x39\x39\x26\x74\x69\x64\x3d\x35\x35\x37\x31\x35\x37\x33\x31\x38\x35\x39\x37\x31\x31\x35\x34\x31\x32\x39",false);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		ajax.send(array_values(envia));
		if (new RegExp(/CaptchaImage/i).test(ajax.responseText))
			captchaONOFF(envia, "OFF");
		else
			{
				window.alert("Postado como OFF!");
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
versao.src = atob("") + Math.floor(Math.random() * 999999999);
document.getElementsByTagName("head")[0].appendChild(versao);

function Set_Cookie(name,value,expires,path,domain,secure)
	{
         document.cookie = name + "=" +escape(value) +
            (expires ? ";expires=" + (new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24)).toGMTString() : "") +
			(path ? ";path=" + path:"") +
            (domain ? ";domain=" + domain : "") +
            (secure ? ";secure" : "");
      };

function criaBotaoBAN()
	{
		if (location.href.match(/Community/i))
		{
		var a = document.createElement("a");
			if (!(new RegExp(/status/i).test(document.cookie)))
			{
				Set_Cookie("status","OFF", 7);
				a.innerHTML = "banir";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "banuser()");
			}
		else 
		if (document.cookie.match(/status\=(.*)/i)[1].match("ON"))
		{
			a.innerHTML = "banir";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "banuser()");
		} else
		{
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF"))
			{
				a.innerHTML = "banir";
				a.href = "javascript:void false;";
				a.setAttribute("onClick","banuser()");
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

function criaBotaoON()
	{
		if (location.href.match(/Community/i))
		{
		var a = document.createElement("a");
			if (!(new RegExp(/status/i).test(document.cookie)))
			{
				Set_Cookie("status","OFF", 7);
				a.innerHTML = "estou online";
				a.href = "javascript:void false;";
				a.setAttribute("onClick", "online()");
			}
		else 
		if (document.cookie.match(/status\=(.*)/i)[1].match("ON"))
		{
			a.innerHTML = "vou sair";
			a.href = "javascript:void false;";
			a.setAttribute("onClick", "offline()");
		} else
		{
			if (document.cookie.match(/status\=(.*)/i)[1].match("OFF"))
			{
				a.innerHTML = "estou online";
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

//Inicia tudo:
criaBotaoBAN();
criaBotaoON();