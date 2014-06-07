// ==UserScript==
// @name           Rapidshare Plus! (Usuarios Free)
// @namespace      Juampi_Mix
// @description    Rediseña la pagina de Rapidshare.com, y la automatiza, (autoclickea en zonas necesarias para usuarios FREE)
// @include        http://rapidshare.com/*
// @include        https://rapidshare.com/*
// @include        http://*.rapidshare.com/*
// @include        https://*.rapidshare.com/*
// @autor          Juampi_Mix
// @require        http://userscripts.org/scripts/source/60663.user.js
// @version        1.10
// @history        1.10 Cambio de version, para comprobacion de rutina en el actualizador
// @history        1.00 Reparado un detalle de relevancia minima (Pero detalle en fin)
// @history        0.33 Cambio de version, para chequeo del actualizador.
// @history        0.32 Pequeños retoques en el codigo.
// @history        0.31 En esta version, se volvio al actualizador anterior (ya que comprobe que si funcionaba. Solo que las comprobaciones las hace cada un dia) (ahora estoy viendo de modificar el codigo del actualizaror para ver si puedo lograr que las comprobaciones las haga cada 1 hora)
// @history        0.30 Nueva limpieza del codigo, y solucion del actualizador. Ahora si muestra la version actual en el aviso de actualizacion.
// ==/UserScript==

(function() {
var css = "input, button, select, textarea, option {\n-moz-appearance:none !important;\n}\n\n* {\noutline:none!important;\n}\n\nhr,\nimg[src=\"img2/pfeil.jpg\"],\ndiv[style=\"position: fixed; left: 0px; bottom: 0px; height: 15px; width: 50%; background-color: rgb(142, 144, 143);\"],\ndiv[style=\"position: fixed; left: 50%; bottom: 0px; height: 15px; width: 50%; background-color: red;\"],\ndiv[style=\"margin-top: 20px; font-size: 8pt; color: rgb(0, 39, 96);\"],\ndiv[style=\"color: rgb(0, 39, 96); font-size: 8pt;\"],\nh2,\np#small,\ndiv.untermenue,\ndiv.klappbox p:not([class])+p,\ndiv.klappbox p:not([class])+p+p,\ndiv.klappbox p:not([class])+p+p+p,\ncenter div[style=\"width: 750px; text-align: left;\"],\ndiv.klappbox br,\ndiv[style=\"padding-top: 15px; width: 728px; height: 353px; background-image: url(/img2/premium_vorteile_bg.jpg); background-repeat: no-repeat;\"] {\ndisplay:none!important;\n}\n\nbody {\nbackground: black !important;\ncolor:#747b6e!important;\n}\n\n\n.klapptitel div, div.klappbox table[width=\"100%\"] tbody tr td,\ninput[name=\"newfolder\"],\ninput[value=\"Send download link\"],\ninput[value=\"Premium Zone Login\"],\ninput[value=\"Extend Premium Account\"],\ninput[value=\"Send\"],\ninput[value=\"Login\"],\ninput[value=\"Check URLs\"] {\nfont-size:11px!important;\n}\n\n.downloadlink {\ncolor:#747b6e!important;\n}\n\nh1 {\nbackground:none !important;\nborder-bottom:1px solid #484d44!important;\ncolor:#747b6e!important;\n}\n\nh3 {\ncolor:#747b6e!important;\n}\n\n\ninput[type=\"submit\"], input[value=\"Check URLs\"] {\nbackground:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAcCAYAAAC+uCc6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuNJREFUeNrsm8uOEkEUhqu6mzvTsJCgIRObQILPwMaVOxN38wAufCgfYTZG4wu4Yc0WAgGDiRqGKJeme6AvntOecgpMxlm46j5/8qfoSofF6S+nbqdkHMcCJaUUJEk2yFJrWekTAhBprfqdgKH4sDRIFBAm9efIFvUZGkSsdACi4AjBAfhIDqgvAjZihEVqWcQgMArgErhMbZH6FSys9EhBgnD4YA+8p/aW+pMMY51BgmBUwXVyDVwhWCweglI55AQEiQteg3+Sd/QewhJa9GBSJrkAPwI/7vV6zx3HeVkqlS5zudwFxzW9Oh6PW8/zFvP5/ONoNPpESUNoc5ZIapDY4Ab4st/vv7Ft+9VyuRS73Q7/iKOZYkEiENVqVTQaDbHZbN4PBoO30L0AL8EbzDgmgVKkYaYJmeRFt9t9PR6Ppeu6IooijmTaJyrwjX3fF9vtVnQ6nV4QBIvVavVFm6sEhjY/wclrDV68ms1m8nA4cAQzJvzmMPxISBRXNMKUiQ1DgWLR8FMpFotPIP1w1DKq9XotgIEWLWoKahGjVjH4kMchyDTNQhiGHLGMCr89MqBtiyQrY30TTWUWFkuIu41WqUARgrfpWX/rhAkdFMGgsM5AEeegsFj3ikFhMSis/w9KfNayWCdM6KBEDArrDJRIB0UvYAk4PixSoIESK1CwEw93/DAMb03T5DBldS5iGHhImLBATAQKFJVJ8JTQ9X3/q23bHLGMql6vC8/z8OTYJSaSzKJAwYITLIFbT6fT63a7HefzeY5axoTf3HGceDKZXIvf1W57YiP6s5dP8xVjtVr9AKqqzWbzGdYp4CER16SkW1i4VKvVRKvVEjc3Nx+Gw+E76P5OsGBNylFBouplsXjppBSyXC4/tSyrwuFM8aw1CNz9fv9ZK4X8Ju6q205A4eLq7C5/7yuu9mjoCfm6Rrb14OsaMrncwxfAsppR/nkBTCSXBYERvlLKwIgHXCn9JcAAUEE1qKOHHP8AAAAASUVORK5CYII=) no-repeat !important;\nborder:none!important;\ncolor:#747b6e!important;\ncursor:pointer!important;\nheight:28px!important;\npadding:0 0 2px!important;\ntext-transform:uppercase!important;\nwidth:138px!important;\nfont-size:11px!important;\nmargin-bottom:300px!important;\n}\n\n\ninput[type=\"submit\"]:hover, input[value=\"Check URLs\"]:hover {\nbackground:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAcCAYAAAC+uCc6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAthJREFUeNrsm8+OEkEQxrtnBvkzuywBiRrZSMIm+AxcPHkz8bYP4MGH8hH2YjS+gBfOXEkgwWCCQibroszMQk+PVWP1boPJugdPM/UlXwY6cOn+paq6p1qmaSpQUkpBkmSHLK0nK39CALT1NJ8zMAwfngWJAcKl8RLZozHHgoiVD0AMHAlYgXdkRWMa2EgRFmlFEYfAKIOr4Bo9KzRuYGHlRwYShCMGR+CQntc0nkUY7wASBOMI3CCfgH2CxeMUlMuUowiSDfgK/IP8i36HsCQefXEpkhyDH4If9/v9F91u91W1Wj0tlUrHPK/51W63+xlF0Xw2m30aj8efKWgIq2bR0oKkDm6DTweDwdtWq/V6vV6LOI6FUopnM8fyPE9UKhVRr9dFEAQfhsPhOxieg1fgNUYcl0CpUJp5BJHk5dnZ2ZvFYiEREq01z2TeCxVY4+12KyCqiE6n04fAMAdgvlq1inKs+gSL15Ner3e+Wq0kR5HiCdcc1x4CxTllmBqx4RhQPEo/PoSgJ2EY8qwVVLj2wMBT2tSUzSbG7GLwywNMQa7rljndFDsNIQPWsUi2M7YP0UxkYbGEuD1olQYUIfiYnvW39piwQREMCusAFHEICot1pxgUFoPC+v+gpAdPFmuPCRsUzaCwDkDRNih2Awuf27OMlAVKakDBwS04TpLk2nG4dClsLQJrr7XOWCAmlAHFRBJ8S7iJ43hRq9V4xgoqXPsoivDN8YaYyCKLAQW7mPBN4NV0Or1ot9sp9iiwiiVcc1z7yWRyIf50u4XEhr45y6d6xQmC4LLRaBzBH55jUy2koptObFY+5bqu8H1fNJtNsVwuP45Go/cw/J1gwZ6UnYHE9Mti89JeKySEomdAms/TmeOqValNGIZfrFbIb+K2u20PFG6uLu72967m6ohST8LXNYqte1/XkNnlHr4AVtSI8s8LYCK7LAiM8JVSBkbc40rpbwEGALkfNaI4T0iuAAAAAElFTkSuQmCC) no-repeat !important;\n}\n\ndiv.hauptmenue ul li {\nbackground:transparent !important;\nborder:none!important;\ncolor:#747b6e!important;\n}\n\ndiv.hauptmenue ul li a {\ncolor:#747b6e!important;\n}\n\ndiv.hauptmenue ul li a:hover {\ncolor:#63695e!important;\n}\n\na {\ncolor: #999!important;\ntext-decoration:none!important;\n}\n\na:hover {\ncolor:#888!important;\n}\n\n\ncenter input[type*=\"image\"][src*=\"download_file.jpg\"], input[id=\"btnupload\"] {\nbackground:url(data:image/png;base64,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) !important;\nheight:100px!important;\npadding-left:100px!important;\nwidth:0!important;\nmargin-bottom:200px!important;\n}\n\n\ncenter input[type*=\"image\"][src*=\"download_file.jpg\"]:hover, input[id=\"btnupload\"]:hover {\nbackground:url(data:image/png;base64,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) no-repeat !important;\n}\n\n.klapptitel div {\nborder-bottom:none!important;\ncolor:red!important;\nfont-weight:900!important;\ntext-transform:uppercase!important;\n}\n\np[style=\"color: red;\"] {\ncolor:#999!important;\ntext-transform:uppercase!important;\n}\n\ntd {\nborder:none!important;\n}\n\ndiv#files {\ncolor:#999!important;\n}\n\ninput[size=\"65\"] {\nbackground:#333!important;\nborder:1px solid red!important;\ncolor:#747b6e!important;\nmargin-top:40px!important;\n}\n\ndiv.klappbox table[width=\"100%\"] tbody tr td {\ncolor:#999!important;\ntext-transform:uppercase!important;\nfont-weight:bold!important;\n}\n\ntd input {\nbackground:#111!important;\nborder:1px solid red!important;\ncolor:#999!important;\n}\n\ninput[type=\"checkbox\"], textarea[style=\"width: 300px;\"] {\nbackground:black!important;\nborder:1px solid red!important;\ncolor:#747b6e!important;\nmargin-top:5px!important;\n}\n\ntextarea[style=\"width: 300px;\"] {\npadding:3px!important;\nwidth:294px!important;\n}\n\ninput[value=\"Send download link\"] {\npadding-bottom:3px!important;\n}\n\ncenter p, div[style=\"color: rgb(0, 39, 96); font-size: 10pt; font-weight: bold;\"] {\ncolor:#747b6e!important;\n}\n\ndiv[style=\"width: 725px; height: 316px; background-image: url(img2/praemien_infobox.jpg); background-repeat: no-repeat; background-position: right center;\"] {\nbackground:#222!important;\nborder:1px solid #666!important;\n}\n\ndiv[style=\"color: black; float: right; width: 380px; margin-right: 25px;\"] {\ncolor:#747b6e!important;\n}\n\ndiv[style=\"color: rgb(0, 32, 78); font-size: 16pt; height: 40px; margin-top: 55px;\"] {\ncolor:#999!important;\n}\n\ntd div[style*=\"border: 1px solid rgb(0, 39, 96);\"] {\nbackground:none!important;\nborder:1px solid red!important;\ncolor:#747b6e!important;\n}\n\nh3[style=\"color: red;\"] {\ncolor:red!important;\ntext-transform:uppercase!important;\n}\n\ndiv#inhaltbox center table[cellpadding=\"4\"] {\nfloat:left!important;\n}\n\ninput[value=\"Extend Premium Account\"] {\nwidth:160px!important;\nbackground:#222!important;\nborder:1px solid #666!important;\n}\n\ninput[value=\"Extend Premium Account\"]:hover {\nbackground:#222!important;\nborder:1px solid #4a5145!important;\n}\n\ninput[name=\"email\"] {\nbackground:#222!important;\nborder:1px solid #666!important;\ncolor:#747b6e!important;\n}\n\ninput[value=\"Send\"] {\npadding-top:5px!important;\n}\n\ntr input[name=\"username\"], tr input[name=\"password\"], tr input[name=\"login\"], tr input[name=\"adminpassword\"] {\nbackground:#222!important;\nwidth:150px!important;\n}\n\nform[id=\"freefoldersform\"] input[name=\"foldername\"],\nform[id=\"freefoldersform\"] input[name=\"folderheadline\"],\nform[id=\"freefoldersform\"] input[name=\"adminpassword\"],\nform[id=\"freefoldersform\"] input[id=\"adminpassword2\"],\nform[id=\"freefoldersform\"] input[name=\"folderpassword\"],\nform[id=\"freefoldersform\"] input[name=\"email\"] {\nbackground:#222!important;\n}\n\ntextarea[id=\"urls\"] {\nbackground:#222!important;\nborder:1px solid #666!important;\ncolor:#747b6e!important;\n}\n\ninput[value=\"Check URLs\"] {\nmargin-bottom:0!important;\n}\n\ninput[value=\"Create Collector's Account\"] {\nbackground:#222!important;\nborder:1px solid #666!important;\ncolor:#747b6e!important;\nfont-size:10px!important;\nwidth:170px!important;\nheight:20px!important;\n}\n\ninput[value=\"Create Collector's Account\"]:hover {\nbackground:#222!important;\nborder:1px solid #4a5145!important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

        location.href = "javascript:(" + encodeURI(uneval(function() {
repeatTimeout = 60;
useFuzzyLogic = true;
hideAd = true;
	inhaltbox = document.getElementById("inhaltbox");
if (hideAd) hideAdF();

	function hideAdF() {
 try {
 if ((undefined !== inhaltbox) && (null !== inhaltbox)) {
			    var inhaltchilds = inhaltbox.childNodes;
			    var klappbox;
			    for (i in inhaltchilds) { ch = inhaltchilds[i];
				    if (ch.className == "klappbox") {
					    klappbox = ch;
if (undefined !== klappbox) {
				            kc = klappbox.childNodes;
				            var disabling = false;
				            for (i in kc) {
					            var ch = kc[i];
if ( !disabling && (ch.nodeType == 1) && (
                                        (ch.innerHTML.search(/Create Premium Account/g) > -1 )
							            || (ch.innerHTML.search(/Do you want to send your files with ease and speed?/g) > -1 )
							            || (ch.innerHTML.search(/Premium members can download any number of files simultaneously./g) > -1 )
							            || (ch.innerHTML.search(/You do not want to wait longer?/g) > -1 )
							            )
						            ) {
							            disabling = true;
					            }
					            if (disabling) {
						            if (ch.nodeType == 1) ch.style.display = "none";
						            else if (ch.nodeType == 3) ch.nodeValue = "";
					            }
				            }
			            }
				    }
			    }


			    // untermenue
			    //try { inhaltbox.childNodes[5].style.display = "none"; } catch(err) {}
		    }
	    } catch(err) {}
	}

	window.submitDownloadForm = function() {
		window.setTimeout("document.dlf.submit();", 4000);
	}

	function isError() {
		var err = "";
		if (inhaltbox.getElementsByTagName("h1").length > 0) {
			err = inhaltbox.getElementsByTagName("h1")[0].innerHTML;

			if (err.search(/Please do not destroy our service. It is funded by Premium accounts, so please be fair and do not hide the Premium features and payment options. If we have to close the service, no one will benefit. Thank you./g) > -1) {
			    return false;
			}
			if (err.indexOf("Error") > -1) {
				return true;
			}
		}
		return false;
	}
	

	function getErrorType() {
		var element1=document.getElementById("errorTitleText");
		if (element1) {
			var text1=element1.textContent;
			switch (text1) {
				case "Connection Interrupted":
				case "Network Timeout":
				case "Failed to Connect":
				case "Address Not Found":
					return "network-error"; // document.getElementById("errorTryAgain").click();
					break;
			}
		} else if (isError()) {
			var errorText = inhaltbox.getElementsByTagName("div")[0].innerHTML;
			switch (true) {
				case (errorText.search(/Your IP address \d+.\d+.\d+.\d+ is already downloading a file/g) > -1):
					return "downloading";
					break;
				case (errorText.search(/You have reached the download limit for free-users/g) > -1):
					return "wait";
					break;
				case (errorText.search(/The file could not be found./g) > -1):
					return "not-found";
					break;
				case (errorText.search(/The download session has expired./g) > -1):
					return "session-timeout";
					break;
				case (errorText.search(/Currently a lot of users are downloading files./g) > -1):
					return "too-many-users";
					break;
				case (errorText.search(/We regret that currently we have no available slots for free users./g) > -1):
					return "no-free-slots";
					break;
				case (errorText.search(/The server * is momentarily not available. We are aware of this and are working to get this resolved./g) > -1):
					return "server-down";
					break;
				case (errorText.search(/The download cannot be provided. Please check, if your browser supports Javascript./g) > -1):
					return "weird"; // ;-)
					break;
				default:
					return "unknown";
			}
		}
		return false;
	}


	function checkFirstPage() {
		if (document.forms["ff"]) {
		    return true;
		}
		return false;
	}
	

	function sendFFform() {
		document.forms["ff"].submit();
	}
	
	function getDownloadLink() {
		var link = "";
		if (getErrorType() != "network-error") {
			var klappbox = inhaltbox.getElementsByTagName("div")[0];
			var ka = klappbox.getElementsByTagName("p");
			for (p in ka) {
				if (ka[p].className == "downloadlink") {
					if (ka[p].firstChild.tagName == "A") {
						link = ka[p].firstChild.href;
					} else {
						link = ka[p].firstChild.nodeValue.replace(/^\s+|\s+$/g,"");
					}
				}
			}
		}
		if (link == "") { 
			link = document.location+"";
			link = link.replace(/http:\/\/rs.+\.rapidshare/, "http://rapidshare");
		}
		return link;
	}

	
	
	window.titleTimer = function(message, countdown) {
		document.title = message.replace(/%s/g, countdown);
		if (countdown > 0) {
			countdown = countdown-1;
			window.setTimeout("titleTimer(\""+message+"\", "+countdown+")", 1000);
		}
	}

	function RapidshareAutowait() {
		if (checkFirstPage()) {
			document.title="Enviar el formulario";
			sendFFform();
			return;
		}
		
		var error = false;
		if (error = getErrorType()) {
			var reload = true;
			var countdownMessage = "%s s - de espera para volver a intentarlo";
			var w = repeatTimeout;
			
			switch (error) {
				case "not-found":
					alert("Archivo no encontrado");
					reload = false;
					break;
				case "network-error":
					w = 10; 
					useFuzzyLogic = false;
					countdownMessage = "%s s - Error de red, volver a intentarlo";
					break;
				case "server-down":
					w = 5*60; 
					countdownMessage = "%s s - Servidor caído, volver a intentarlo";
					break;
				case "downloading":
					countdownMessage = "%s s - Descarga en progreso, Volver a intentarlo";
					break;
				/*
				case "wait":
				case "session-timeout":
				case "too-many-users":
				case "no-free-slots":
				case "weird":
					break;
				*/
			}
			
			if (reload) {
				if (useFuzzyLogic) {
					w = w + Math.ceil(Math.random()*11 - 6); // +-5 seconds
					if (w < 0) w = 0;
				}
				titleTimer(countdownMessage, w);
				var href = getDownloadLink();
				window.setTimeout("document.location = '"+href+"'", w*1000 );
			}
		
		} else { 
			if (undefined !== c) { // c 
				if (c > 0) {
					titleTimer("%s s - Cuenta atrás para iniciar la descarga", c);
					window.setTimeout(RapidshareAutowait, c*1000+2000); // c+2 seconds (solo en caso..) 
				} else {
					submitDownloadForm();
					document.title="Comienzo de descarga exitoso!";
				}
			} else {
				alert("Error desconocido - el sitio ha cambiado?");
			}
		}
	}
	
	RapidshareAutowait();
	
})) + ")();";

ScriptUpdater.check(60828, '1.10');
ScriptUpdater.forceNotice(60828, '1.10');
ScriptUpdater.forceCheck(60828, '1.10');
function handleReturnedVersion(v) {
}
ScriptUpdater.check(60828, "1.10", handleReturnedVersion);