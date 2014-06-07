// ==UserScript==
// @name           Teczka (PW)
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/wiadomosci/talk/*
// @version        1.0.1
// ==/UserScript==

const u = unsafeWindow;
const $ = u.$;
const SERWER = "http://teczka.szatana.eu/";
//const SERWER = "http://localhost/teczka2/";

var link = document.createElement("A");
link.innerHTML = "Archiwizuj";
link.addEventListener("click", beginSend, true);
link.href = "javascript:void(0);";
$("#del_talk_option").before(link);


// tak przy okazji...
$("#pokaz_starsze").click(function(){
	setTimeout(function(){	// bez setTimeout nie działa
		window.scrollTo(0,0);
	}, 0);
});


function beginSend(e){
	e.preventDefault();
	var hash = GM_getValue("hash");
	if(!hash){
		showLoginWindow();
		return;
	}else{
		var logindata = JSON.parse(hash);
		if(logindata.login != u.ad_zalogowany_login){
			alert("Ostatni raz logowano się do teczki z innego konta ("+logindata.login+"). Zaloguj się na obecne konto.");
			showLoginWindow();
			return;
		}
	}

	var chk = document.createElement("input");
    chk.type = "checkbox";
	chk.style.cssFloat = "left";
	chk.checked = true;

	//$(".avatar:not(:last)").append(chk);

	$(".html p:even").prepend(chk);
	$("content div:even").prepend(chk);
	var nr = 0;
	var page = 1;
	$($("input[type=checkbox]").get().reverse()).each(function(){
		if(nr>9){
			nr=0;
			page++;
		}		
		$(this).attr("msgPage", page);
		$(this).attr("msgNr", nr);
		nr++;
	});


	// z dziwnych przyczyn powyższa linijka ustawa nam fokus na pole tekstowe
	setTimeout(function(){	// bez setTimeout nie działa
		window.scrollTo(0,0);
	}, 0);

	e.target.innerHTML = "Wyślij";
	e.target.removeEventListener("click", beginSend, true);
	e.target.addEventListener("click", doSend, true);
}

function doSend(e){
	e.preventDefault();
	e.target.removeEventListener("click", doSend, true);

	var numbers2 = {};
	var nr = 0;
	$($("input[type=checkbox]").get().reverse()).each(function(){
		if(!numbers2[ $(this).attr("msgPage") ]) numbers2[ $(this).attr("msgPage") ] = [];
		if(this.checked){
			numbers2[ $(this).attr("msgPage") ].push(Number($(this).attr("msgNr")));
		}
	});

	var hash = JSON.parse(GM_getValue("hash")).hash;
	var URL = SERWER +  "dodaj_pw.php?messages=" + JSON.stringify(numbers2) +
						"&user_with=" + u.user_id_relacja +
						"&user_me=" + u.session_user_id +
						"&hash=" + hash;
	//document.location.href = URL;

	GM_xmlhttpRequest({
        method: "GET",
        url: URL,
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
        onload: function(resp){
			if(resp.responseText.match("OK")){				
				e.target.innerHTML = "Zarchwizowano jako #"+resp.responseText.split(":")[1];
				e.target.href = SERWER+"szukaj.php?mode=id&s=pw"+resp.responseText.split(":")[1];
				e.target.target = "_blank";
			}else if(resp.responseText == "0"){
				$(e.target).replaceWith("Już to mamy");
			}else{
				var err = document.createElement("a");
				err.addEventListener("click", function(){"Odpowiedź serwera: " + alert(resp.responseText);}, true);
				err.href = "javascript:void(0);";
				err.innerHTML = "Wystąpiły błędy";
				$(e.target).replaceWith(err);
			}
		}
	});
}




function showLoginWindow(){

	var box = document.createElement("div");
	box.innerHTML = '<div class="bg10" style="color:#FFFFFF; padding:1px; font-size:18px"><div style="margin-left:5px">LOGOWANIE</div></div><div class="b10" style="padding:10px;border-width:1px;border-style:solid;background-color:#f5f5f5;"><div style="margin:0px;"><table align="center" cellspacing="0" cellpadding="4" border="0" style=""><tbody><tr><td nowrap="" class="tabelka_br">Login</td><td align="left"><input type="text" name="login" id="f_login" size="10" maxlength="40" style="width:150px;" value=""><br/></td></tr><tr><td nowrap="" class="tabelka_br" align="right">Hasło</td><td align="left"><input type="password" name="pass" id="f_pass" size="10" maxlength="30" style="width:150px;"><br/></td></tr><tr><td nowrap="" class="tabelka_br"><br/></td><td align="left"><b>W loginie liczy się wielkość znaków!</b><br/><br/>Informacja: Te dane nie zostaną nigdzie wysłane w widocznej formie.<br/></td></tr><tr><td nowrap="" class="tabelka_br"><br/></td><td style="text-align:left;padding-top:10px;"><input type="submit" id="form_login" class="button" value="Zaloguj mnie"></td></tr><tr><td class="tabelka_br"><br/></td><td style="text-align:left; padding-top:5px; padding-bottom:5px;"><a href="/haslo.php" class="k01">Nie pamiętasz hasła?</a><br/><a href="/pomoc.php?id=4" class="k01">Problemy z logowaniem?</a><br/><br/></td></tr></tbody></table><input type="hidden" name="back_url" value="/"></div></div>';
	box.style.width = "250px";
	box.style.margin = "0 auto";
	box.style.padding = "100px";


	//document.getElementById("strona").appendChild(box);
	document.body.innerHTML = "";
	document.body.appendChild(box);

	$("#form_login").click(function(e){
		e.preventDefault();
		var authInfo = $("#f_login").val() + ":" + $("#f_pass").val();
		if(authInfo != ":"){
			setTimeout(function(){
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://api.fotka.pl/users/hash_get?identity="+Base64.encode(authInfo),
					headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					onload: function(resp){
						var hash;
						try{
							hash = new DOMParser().parseFromString(resp.responseText, "text/xml").getElementsByTagName("hash")[0].textContent;
							alert("Logowanie powiodło się\nTwój unikalny identyfikator użytkownika to " + hash);

							var logindata = {login: $("#f_login").val(), hash: hash};

							GM_setValue("hash", JSON.stringify(logindata));
							document.location.reload();
						}catch(e){
							alert("Logowanie nie powiodło się");
						}
					}
				});
			}, 0);

		}
	});


}

//http://www.webtoolkit.info/javascript-base64.html
var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	}

}