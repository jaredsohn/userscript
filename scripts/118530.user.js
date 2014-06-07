// ==UserScript==
// @name        Comunio - SCRIPT - Beta
// @description Integra las estadisticas de SCRIPT en el juego Comunio, con funcionalidad en fase BETA
// @include     http*://www*.comunio.es/*
// @include     http*://comunio.es/*
// @exclude     http*://www*.comunio.es/external/phpBB2*
// @exclude     http*://comunio.es/external/phpBB2*
// @copyright 	Jomofer-DiegoCom-Anthorlop-erpichi
// @version	    13.0.3
// @license	http://creativecommons.org/licenses/by-nc-sa/3.0/es/
// ==/UserScript==

//Cambios
//Mostrar busquedas de jugador cuando vienes de comunio stats

//error alineacion ideal con negativos
//mejorar el calculo de fichajes
//mirar poner foto jugador en alineacion
//Ultima alineacion publicada (en desarrollo)
//Noticias en el refresco por ajax, que ponga los puntos links y tal(en desarrollo)
//Administracion de primas(en desarrollo)
//admnistracion de salarios(en desarrollo)
//apartado aceptar ofertas el valor de compra de los jugadores?

//Thanks to Jomofer to allow this script to be mantained!
//Gracias a Anthorlop por las mejoras introducidas: Cálculo de saldo - Próximas jornadas - Estado jugadores
//http://www.greywyvern.com/code/php/binary2base64

//VERSION DEL SCRIPT
var version = "13.0.3";	//Version of the script. For checking for updates
var SCRIPTName = "SCRIPT BETA";
var update;				//Variable for storing the result of checking for updates
var plusPlayer = false;	//Variable to store if we are plusPlayer
var basicPlayer = false;	//Variable to store if we are basicPlayer
var comUser = "Undefined";
var get;				//To store the get function
var getSync;				//To store the get function
var modoBeta = false;
var showFotoCMZ = false;
var showFotoCMN = true;
var cacheTimeActualizado = 10;

////////Player ID//////////////////////
var playerID = new Array;
var playerIDName = new Array;
var playerIDNameEntra = new Array;
var playerIDNameSale = new Array;
var playerIDNamePicas = new Array;
var playerIDNameGoles = new Array;
var playerIDNameTarjetas = new Array;
var playerIDNameMarcador = new Array;
var playerIDNameFoto = new Array;
var playerIDNameFotoCMZ = new Array;
var playerIDNameFotoCMN = new Array;
var playerIDNamePuntos = new Array;
var playerIDNameEstado = new Array;
var playerIDNameUrl = new Array;
var playerIDNameEquipo = new Array;
var playerIDNamePosicion = new Array;
var playerIDNameTotales = new Array;
var playerIDNameMercado = new Array;
var playerIDCpC = new Array;
var playerIDNameEficiencia = new Array;
var playerIDNameValor = new Array;
var playerIDNameMediavalor = new Array;
var playerFotoSize  = 35;
var playerFotoSizeMax  = 60;
//var playerFotoSize  = 30;
//var playerFotoSizeMax  = 50;

var avisarActualizacion = true;

var randomnumber=Math.floor(Math.random()*2);

var serverScriptBetafreeiz = 'http://www.scriptbeta.freeiz.com/scriptbeta/';
var serverScriptBetanixiweb = 'http://www.scriptbeta.nixiweb.com/scriptbeta/';
//var serverScriptBetanixiweb = 'http://www.scriptbeta.260mb.org/scriptbeta/';
var serverScriptBeta260 = 'http://www.scriptbeta.260mb.org/scriptbeta/';
//var serverDataName = "scriptbeta.php";
//var serverTimeName = "scriptbetatime.php";
var serverDataName = "scriptbetadata.xml";
//var serverTimeName = "scriptbetadata.xml";
var serverTimeName = "scriptbetatime.xml";

var serverScriptBeta = serverScriptBetanixiweb;
if (randomnumber == 0) {
	serverScriptBeta = serverScriptBetafreeiz;
}
//var serverScriptBeta = 'http://www.scriptbeta.nixiweb.com/scriptbeta/test/';

if (modoBeta) {
	serverScriptBeta += 'test/';
	serverScriptBetanixiweb += 'test/';
	serverScriptBetafreeiz += 'test/';
	serverScriptBeta260 += 'test/';
}

////////////
//Auto login
////////////
function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "http://code.jquery.com/jquery-1.8.2.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

if(endsWith(document.location.href, "comunio.es/login.phtml")
		|| endsWith(document.location.href, "comunio.es/")
		|| endsWith(document.location.href, "comunio.es")) {
	
	function mainJquery() {

		var imagesLogin = new Array;

		imagesLogin['i_error_sign'] ='data:image/gif;base64,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';
		imagesLogin['i_hook'] ='data:image/gif;base64,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';
		imagesLogin['ajaxload'] ='data:image/gif;base64,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';

		function autologin(){
			$.ajax({
		        url: "/login.phtml",
		        type: "post",
		        data: { login: user, pass: pass, action: "login", ">> Login_x": "33" },
		        // callback handler that will be called on success
		        success: function(response, textStatus, jqXHR){
		            // log a message to the console
//		            alert("Hooray, it worked!-");
						if(response.indexOf("<title>Comunio.es Iniciar sesión</title>") == -1){
							var okMsg = "<div class='success' style='height: 90px!important; text-align: center;'>"
								+    "<div style='height: 60px;'>"
								+    '<img alt="success" src="' + imagesLogin['i_hook'] + '" style="float: left; margin-right: 4px;"/>'
								+    "<div style='font-size:18px; padding-bottom: 10px; padding-top: 5px;'>Acceso satisfactorio ("+contador_errores+" intentos)</div>"
								+    "</div>"
								+    "</div>";
							if ($("#contentfullsize .barcenter")) {
								$("#contentfullsize .barcenter").html(okMsg);
							}
							if ($("#manager")) {
								$("#manager").html(okMsg);
							}
							var comunio = "";
							if (window.location.href.indexOf("https://") != -1) {
								comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
							} else {
								comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
							}
							location.href= comunio +"/team_news.phtml";
						}else{
							contador_errores++;
							var errorMsg = "<div class='warning' style='height: 90px!important; text-align: center;'>"
								+    "<div style='height: 60px;'>"
								+    '<img alt="success" src="' + imagesLogin['i_hook'] + '" style="display: none; float: left; margin-right: 4px;"/>'
								+    "<img alt='warning' src='" + imagesLogin['i_error_sign'] + "' style='float: left; margin-right: 4px;'/>"
								+    "<div style='font-size:18px; padding-bottom: 10px; padding-top: 5px;'>Error (Intento "+contador_errores+"):</div>"
								+    "<span>" + $(jqXHR.responseText).find("#contentfullsize").find("div.warning").text() + "</span>"
								+    "</div>"
								+    "<img src='" + imagesLogin['ajaxload'] + "'\>"
								+    "<div><a href='javascript:window.location.reload();' style='font-size: 10px; text-decoration: none;'>Cancelar &gt;&gt;</a></div>"
								+    "</div>";
							if ($("#contentfullsize .barcenter")) {
								$("#contentfullsize .barcenter").html(errorMsg);
							}
							if ($("#manager")) {
								$("#manager").html(errorMsg);
							}
							setTimeout(autologin, 2500);
						}
		        },
		        // callback handler that will be called on error
		        error: function(jqXHR, textStatus, errorThrown){
		            // log the error to the console
		            alert(
		                "ScriptBETA - Error de conexión: "+
		                textStatus, errorThrown
		            );
		        },
		        // callback handler that will be called on completion
		        // which means, either on success or error
		        complete: function(){
		            // enable the inputs
//		            alert("disabled");
		        }
		    });
		}

//		$(document).ready(function() {
		    $("div#manager form,div#contentfullsize form").css("display", "inline");
		    $("div#manager form div,div#contentfullsize form div").css("float", "left");
//		    $("div#manager form div p,div#contentfullsize form div p").css("float", "left").css("margin", "0").css("padding", "0").css("line-height", "8px").css("padding-top", "1px");
//		    $("div#manager form div a,div#contentfullsize form div a").css("line-height", "8px").css("display", "block");
			$("div#manager,div#contentfullsize").find(".login").before("<a href='javascript:;' id='login2' class='login'>&gt;&gt; AutoLogin</a>");
			$("div#manager,div#contentfullsize").find("input[name='pass']").removeAttr("onkeypress");
			$("a#login2").click(function(){
				contador_errores=0;

				var loadMsg = "<div class='note' style='height: 90px!important; text-align: center;'>"
					+    "<div style='height: 60px;'>"
					+    "<img alt='warning' src='" + imagesLogin['i_error_sign'] + "' style='float: left; margin-right: 4px;'/>"
					+    "<div style='font-size:18px; padding-bottom: 10px; padding-top: 5px;'>Intentando conectar</div>"
					+    "</div>"
					+    "<img src='" + imagesLogin['ajaxload'] + "'\>"
					+    "<div><a href='javascript:window.location.reload();' style='font-size: 10px; text-decoration: none;'>Cancelar &gt;&gt;</a></div>"
					+    "</div>";
				if ($("#contentfullsize .barcenter")) {
					$("#contentfullsize .barcenter form").hide();
					$("#contentfullsize .barcenter").append(loadMsg);
				}
				if ($("#manager")) {
					$("#manager form").hide();
					$("#manager").append(loadMsg);
				}
				
				user=$("div#manager,div#contentfullsize").find("input[name='login']").val();
				pass=$("div#manager,div#contentfullsize").find("input[name='pass']").val();
				autologin();
			});
//		});
	}
	addJQuery(mainJquery);
}

///////////IMAGES///////////////
var images = new Array;

images['i_error_sign'] ='data:image/gif;base64,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';
images['i_hook'] ='data:image/gif;base64,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';
images['ajaxload'] ='data:image/gif;base64,R0lGODlh3AATAPQAACBFEwAAABczDhQtDBMqCxcxDRYwDRk2Dhs6EBg1Dho5Dxs7EBw8EBw9ERYvDRczDh0/ER1AERk2Dx5BEh5CEhk3Dx5CEhg1Dho4Dx1AERo6EBg0DhUuDB9DEhQrCxIoCyH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFg8PwKIMHnLF63N2438f0mv1I2O8buXjvaOPtaHx7fn96goR4hmuId4qDdX95c4+RG4GCBoyAjpmQhZN0YGYFXitdZBIVGAoKoq4CG6Qaswi1CBtkcG6ytrYJubq8vbfAcMK9v7q7D8O1ycrHvsW6zcTKsczNz8HZw9vG3cjTsMIYqQgDLAQGCQoLDA0QCwUHqfYSFw/xEPz88/X38Onr14+Bp4ADCco7eC8hQYMAEe57yNCew4IVBU7EGNDiRn8Z831cGLHhSIgdE/9chIeBgDoB7gjaWUWTlYAFE3LqzDCTlc9WOHfm7PkTqNCh54rePDqB6M+lR536hCpUqs2gVZM+xbrTqtGoWqdy1emValeXKwgcWABB5y1acFNZmEvXwoJ2cGfJrTv3bl69Ffj2xZt3L1+/fw3XRVw4sGDGcR0fJhxZsF3KtBTThZxZ8mLMgC3fRatCLYMIFCzwLEprg84OsDus/tvqdezZf13Hvr2B9Szdu2X3pg18N+68xXn7rh1c+PLksI/Dhe6cuO3ow3NfV92bdArTqC2Ebc3A8vjf5QWf15Bg7Nz17c2fj69+fnq+8N2Lty+fuP78/eV2X13neIcCeBRwxorbZrAxAJoCDHbgoG8RTshahQ9iSKEEzUmYIYfNWViUhheCGJyIP5E4oom7WWjgCeBBAJNv1DVV01MZdJhhjdkplWNzO/5oXI846njjVEIqR2OS2B1pE5PVscajkxhMycqLJgxQCwT40PjfAV4GqNSXYdZXJn5gSkmmmmJu1aZYb14V51do+pTOCmA00AqVB4hG5IJ9PvYnhIFOxmdqhpaI6GeHCtpooisuutmg+Eg62KOMKuqoTaXgicQWoIYq6qiklmoqFV0UoeqqrLbq6quwxirrrLTWauutJ4QAACH5BAkKAAAALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BAXHx/EoCzboAcdhcLDdgwJ6nua03YZ8PMFPoBMca215eg98G36IgYNvDgOGh4lqjHd7fXOTjYV9nItvhJaIfYF4jXuIf4CCbHmOBZySdoOtj5eja59wBmYFXitdHhwSFRgKxhobBgUPAmdoyxoI0tPJaM5+u9PaCQZzZ9gP2tPcdM7L4tLVznPn6OQb18nh6NV0fu3i5OvP8/nd1qjwaasHcIPAcf/gBSyAAMMwBANYEAhWYQGDBhAyLihwYJiEjx8fYMxIcsGDAxVA/yYIOZIkBAaGPIK8INJlRpgrPeasaRPmx5QgJfB0abLjz50tSeIM+pFmUo0nQQIV+vRlTJUSnNq0KlXCSq09ozIFexEBAYkeNiwgOaEtn2LFpGEQsKCtXbcSjOmVlqDuhAx3+eg1Jo3u37sZBA9GoMAw4MB5FyMwfLht4sh7G/utPGHlYAV8Nz9OnOBz4c2VFWem/Pivar0aKCP2LFn2XwhnVxBwsPbuBAQbEGiIFg1BggoWkidva5z4cL7IlStfkED48OIYoiufYIH68+cKPkqfnsB58ePjmZd3Dj199/XE20tv6/27XO3S6z9nPCz9BP3FISDefL/Bt192/uWmAv8BFzAQAQUWWFaaBgqA11hbHWTIXWIVXifNhRlq6FqF1sm1QQYhdiAhbNEYc2KKK1pXnAIvhrjhBh0KxxiINlqQAY4UXjdcjSJyeAx2G2BYJJD7NZQkjCPKuCORKnbAIXsuKhlhBxEomAIBBzgIYXIfHfmhAAyMR2ZkHk62gJoWlNlhi33ZJZ2cQiKTJoG05Wjcm3xith9dcOK5X51tLRenoHTuud2iMnaolp3KGXrdBo7eKYF5p/mXgJcogClmcgzAR5gCKymXYqlCgmacdhp2UCqL96mq4nuDBTmgBasaCFp4sHaQHHUsGvNRiiGyep1exyIra2mS7dprrtA5++z/Z8ZKYGuGsy6GqgTIDvupRGE+6CO0x3xI5Y2mOTkBjD4ySeGU79o44mcaSEClhglgsKyJ9S5ZTGY0Bnzrj+3SiKK9Rh5zjAALCywZBk/ayCWO3hYM5Y8Dn6qxxRFsgAGoJwwgDQRtYXAAragyQOmaLKNZKGaEuUlpyiub+ad/KtPqpntypvvnzR30DBtjMhNodK6Eqrl0zU0/GjTUgG43wdN6Ra2pAhGtAAZGE5Ta8TH6wknd2IytNKaiZ+Or79oR/tcvthIcAPe7DGAs9Edwk6r3qWoTaNzY2fb9HuHh2S343Hs1VIHhYtOt+Hh551rh24vP5YvXSGzh+eeghy76GuikU9FFEainrvrqrLfu+uuwxy777LTXfkIIACH5BAkKAAAALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BAWHB2l4CDZo9IDjcBja7UEhTV+3DXi3PJFA8xMcbHiDBgMPG31pgHBvg4Z9iYiBjYx7kWocb26OD398mI2EhoiegJlud4UFiZ5sm6Kdn2mBr5t7pJ9rlG0cHg5gXitdaxwFGArIGgoaGwYCZ3QFDwjU1AoIzdCQzdPV1c0bZ9vS3tUJBmjQaGXl1OB0feze1+faiBvk8wjnimn55e/o4OtWjp+4NPIKogsXjaA3g/fiGZBQAcEAFgQGOChgYEEDCCBBLihwQILJkxIe/3wMKfJBSQkJYJpUyRIkgwcVUJq8QLPmTYoyY6ZcyfJmTp08iYZc8MBkhZgxk9aEcPOlzp5FmwI9KdWn1qASurJkClRoWKwhq6IUqpJBAwQEMBYroAHkhLt3+RyzhgCDgAV48Wbgg+waAnoLMgTOm6DwQ8CLBzdGdvjw38V5JTg2lzhyTMeUEwBWHPgzZc4TSOM1bZia6LuqJxCmnOxv7NSsl1mGHHiw5tOuIWeAEHcFATwJME/ApgFBc3MVLEgPvE+Ddb4JokufPmFBAuvPXWu3MIF89wTOmxvOvp179evQtwf2nr6aApPyzVd3jn089e/8xdfeXe/xdZ9/d1ngHf98lbHH3V0LMrgPgsWpcFwBEFBgHmyNXWeYAgLc1UF5sG2wTHjIhNjBiIKZCN81GGyQwYq9uajeMiBOQGOLJ1KjTI40kmfBYNfc2NcGIpI4pI0vyrhjiT1WFqOOLEIZnjVOVpmajYfBiCSNLGbA5YdOkjdihSkQwIEEEWg4nQUmvYhYe+bFKaFodN5lp3rKvJYfnBKAJ+gGDMi3mmbwWYfng7IheuWihu5p32XcSWdSj+stkF95dp64jJ+RBipocHkCCp6PCiRQ6INookCAAwy0yd2CtNET3Yo7RvihBjFZAOaKDHT43DL4BQnsZMo8xx6uI1oQrHXXhHZrB28G62n/YSYxi+uzP2IrgbbHbiaer7hCiOxDFWhrbmGnLVuus5NFexhFuHLX6gkEECorlLpZo0CWJG4pLjIACykmBsp0eSSVeC15TDJeUhlkowlL+SWLNJpW2WEF87urXzNWSZ6JOEb7b8g1brZMjCg3ezBtWKKc4MvyEtwybPeaMAA1ECRoAQYHYLpbeYYCLfQ+mtL5c9CnfQpYpUtHOSejEgT9ogZ/GSqd0f2m+LR5WzOtHqlQX1pYwpC+WbXKqSYtpJ5Mt4a01lGzS3akF60AxkcTaLgAyRBPWCoDgHfJqwRuBuzdw/1ml3iCwTIeLUWJN0v4McMe7uasCTxseNWPSxc5RbvIgD7geZLbGrqCG3jepUmbbze63Y6fvjiOylbwOITPfIHEFsAHL/zwxBdvPBVdFKH88sw37/zz0Ecv/fTUV2/99SeEAAAh+QQJCgAAACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2cw8BQEm3T6yHEYHHD4oKCuD9qGvNsxT6QTgAkcHHmFeX11fm17hXwPG35qgnhxbwMPkXaLhgZ9gWp3bpyegX4DcG+inY+Qn6eclpiZkHh6epetgLSUcBxlD2csXXdvBQrHGgoaGhsGaIkFDwjTCArTzX+QadHU3c1ofpHc3dcGG89/4+TYktvS1NYI7OHu3fEJ5tpqBu/k+HX7+nXDB06SuoHm0KXhR65cQT8P3FRAMIAFgVMPwDCAwLHjggIHJIgceeFBg44eC/+ITCCBZYKSJ1FCWPBgpE2YMmc+qNCypwScMmnaXAkUJYOaFVyKLOqx5tCXJnMelcBzJNSYKIX2ZPkzqsyjPLku9Zr1QciVErYxaICAgEUOBRJIgzChbt0MLOPFwyBggV27eCUcmxZvg9+/dfPGo5bg8N/Ag61ZM4w4seDF1fpWhizZmoa+GSortgcaMWd/fkP/HY0MgWbTipVV++wY8GhvqSG4XUEgoYTKE+Qh0OCvggULiBckWEZ4Ggbjx5HXVc58IPQJ0idQJ66XanTpFraTe348+XLizRNcz658eHMN3rNPT+C+G/nodqk3t6a+fN3j+u0Xn3nVTQPfdRPspkL/b+dEIN8EeMm2GAYbTNABdrbJ1hyFFv5lQYTodSZABhc+loCEyhxTYYkZopdMMiNeiBxyIFajV4wYHpfBBspUl8yKHu6ooV5APsZjQxyyeNeJ3N1IYod38cgdPBUid6GCKfRWgAYU4IccSyHew8B3doGJHmMLkGkZcynKk2Z50Ym0zJzLbDCmfBbI6eIyCdyJmJmoqZmnBAXy9+Z/yOlZDZpwYihnj7IZpuYEevrYJ5mJEuqiof4l+NYDEXQpXQcMnNjZNDx1oGqJ4S2nF3EsqWrhqqVWl6JIslpAK5MaIqDeqjJq56qN1aTaQaPbHTPYr8Be6Gsyyh6Da7OkmmqP/7GyztdrNVQBm5+pgw3X7aoYKhfZosb6hyUKBHCgQKij1rghkOAJuZg1SeYIIY+nIpDvf/sqm4yNG5CY64f87qdAwSXKGqFkhPH1ZHb2EgYtw3bpKGVkPz5pJAav+gukjB1UHE/HLNJobWcSX8jiuicMMBFd2OmKwQFs2tjXpDfnPE1j30V3c7iRHlrzBD2HONzODyZtsQJMI4r0AUNaE3XNHQw95c9GC001MpIxDacFQ+ulTNTZlU3O1eWVHa6vb/pnQUUrgHHSBKIuwG+bCPyEqbAg25gMVV1iOB/IGh5YOKLKIQ6xBAcUHmzjIcIqgajZ+Ro42DcvXl7j0U4WOUd+2IGu7DWjI1pt4DYq8BPm0entuGSQY/4tBi9Ss0HqfwngBQtHbCH88MQXb/zxyFfRRRHMN+/889BHL/301Fdv/fXYZ39CCAAh+QQJCgAAACwAAAAA3AATAAAF/yAgjmRpnmiqrmzrvnAsz3Rt33iu73zv/8CgcEgECAaEpHLJbDqf0Kh0Sq1ar9isdjoQtAQFh2fAKXsKm7R6Q+Y43vABep0mGwwOPH7w2CT+gHZ3d3lyagl+CQNvg4yGh36LcHoGfHR/ZYOElQ9/a4ocmoRygIiRk5p8pYmZjXePaYBujHoOqp5qZHBlHAUFXitddg8PBg8KGsgayxvGkAkFDwgICtPTzX2mftHW3QnOpojG3dbYkNjk1waxsdDS1N7ga9zw1t/aifTk35fu6Qj3numL14fOuHTNECHqU4DDgQEsCCwidiHBAwYQMmpcUOCAhI8gJVzUuLGThAQnP/9abEAyI4MCIVOKZNnyJUqUJxNcGNlywYOQgHZirGkSJ8gHNEky+AkS58qWEJYC/bMzacmbQHkqNdlUJ1KoSz2i9COhmQYCEXtVrCBgwYS3cCf8qTcNQ9u4cFFOq2bPLV65Cf7dxZthbjW+CgbjnWtNgWPFcAsHdoxgWWK/iyV045sAc2S96SDn1exYw17REwpLQEYt2eW/qtPZRQAB7QoC61RW+GsBwYZ/CXb/XRCYLsAKFizEtUAc+G7lcZsjroscOvTmsoUvx15PwccJ0N8yL17N9PG/E7jv9S4hOV7pdIPDdZ+ePDzv2qMXn2b5+wTbKuAWnF3oZbABZY0lVmD/ApQd9thybxno2GGuCVDggaUpoyBsB1bGGgIYbJCBcuFJiOAyGohIInQSmmdeiBnMF2GHfNUlIoc1rncjYRjW6NgGf3VQGILWwNjBfxEZcAFbC7gHXQcfUYOYdwzQNxo5yUhQZXhvRYlMeVSuSOJHKJa5AQMQThBlZWZ6Bp4Fa1qzTAJbijcBlJrtxeaZ4lnnpZwpukWieGQmYx5ATXIplwTL8DdNZ07CtWYybNIJF4Ap4NZHe0920AEDk035kafieQrqXofK5ympn5JHKYjPrfoWcR8WWQGp4Ul32KPVgXdnqxM6OKqspjIYrGPDrlrsZtRIcOuR86nHFwbPvmes/6PH4frrqbvySh+mKGhaAARPzjjdhCramdoGGOhp44i+zogBkSDuWC5KlE4r4pHJkarXrj++Raq5iLmWLlxHBteavjG+6amJrUkJJI4Ro5sBv9AaOK+jAau77sbH7nspCwNIYIACffL7J4JtWQnen421nNzMcB6AqpRa9klonmBSiR4GNi+cJZpvwgX0ejj71W9yR+eIgaVvQgf0l/A8nWjUFhwtZYWC4hVnkZ3p/PJqNQ5NnwUQrQCGBBBMQIGTtL7abK+5JjAv1fi9bS0GLlJHgdjEgYzzARTwC1fgEWdJuKKBZzj331Y23qB3i9v5aY/rSUC4w7PaLeWXmr9NszMFoN79eeiM232o33EJAIzaSGwh++y012777bhT0UURvPfu++/ABy/88MQXb/zxyCd/QggAIfkECQoAAAAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEBY5nwCk7xIWNer0hO95wziC9Ttg5b4ND/+Y87IBqZAaEe29zGwmJigmDfHoGiImTjXiQhJEPdYyWhXwDmpuVmHwOoHZqjI6kZ3+MqhyemJKAdo6Ge3OKbEd4ZRwFBV4rc4MPrgYPChrMzAgbyZSJBcoI1tfQoYsJydfe2amT3d7W0OGp1OTl0YtqyQrq0Lt11PDk3KGoG+nxBpvTD9QhwCctm0BzbOyMIwdOUwEDEgawIOCB2oMLgB4wgMCx44IHBySIHClBY0ePfyT/JCB5weRJCAwejFw58kGDlzBTqqTZcuPLmCIBiWx58+VHmiRLFj0JVCVLl0xl7qSZwCbOo0lFWv0pdefQrVFDJtr5gMBEYBgxqBWwYILbtxPsqMPAFu7blfa81bUbN4HAvXAzyLWnoDBguHIRFF6m4LBbwQngMYPXuC3fldbyPrMcGLM3w5wRS1iWWUNlvnElKDZtz/EEwaqvYahQoexEfyILi4RrYYKFZwJ3810QWZ2ECrx9Ew+O3K6F5Yq9zXbb+y30a7olJJ+wnLC16W97Py+uwdtx1NcLWzs/3G9e07stVPc9kHJ0BcLtQp+c3ewKAgYkUAFpCaAmmHqKLSYA/18WHEiZPRhsQF1nlLFWmIR8ZbDBYs0YZuCGpGXWmG92aWiPMwhEOOEEHXRwIALlwXjhio+BeE15IzpnInaLbZBBhhti9x2GbnVQo2Y9ZuCfCgBeMCB+DJDIolt4iVhOaNSJdCOBUfIlkmkyMpPAAvKJ59aXzTQzJo0WoJnmQF36Jp6W1qC4gWW9GZladCiyJd+KnsHImgRRVjfnaDEKuiZvbcYWo5htzefbl5LFWNeSKQAo1QXasdhiiwwUl2B21H3aQaghXnPcp1NagCqYslXAqnV+zYWcpNwVp9l5eepJnHqL4SdBi56CGlmw2Zn6aaiZjZqfb8Y2m+Cz1O0n3f+tnvrGbF6kToApCgAWoNWPeh754JA0vmajiAr4iOuOW7abQXVGNriBWoRdOK8FxNqLwX3oluubhv8yluRbegqGb536ykesuoXhyJqPQJIGbLvQhkcwjKs1zBvBwSZIsbcsDCCBAAf4ya+UEhyQoIiEJtfoZ7oxUOafE2BwgMWMqUydfC1LVtiArk0QtGkWEopzlqM9aJrKHfw5c6wKjFkmXDrbhwFockodtMGFLWpXy9JdiXN1ZDNszV4WSLQCGBKoQYHUyonqrHa4ErewAgMmcAAF7f2baIoVzC2p3gUvJtLcvIWqloy6/R04mIpLwDhciI8qLOB5yud44pHPLbA83hFDWPjNbuk9KnySN57Av+TMBvgEAgzzNhJb5K777rz37vvvVHRRxPDEF2/88cgnr/zyzDfv/PPQnxACACH5BAkKAAAALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BIUCwcMpO84OT2HDbm8GHLQjnn6wE3g83SA3DB55G3llfHxnfnZ4gglvew6Gf4ySgmYGlpCJknochWiId3kJcZZyDn93i6KPl4eniopwq6SIoZKxhpenbhtHZRxhXisDopwPgHkGDxrLGgjLG8mC0gkFDwjX2AgJ0bXJ2djbgNJsAtbfCNB2oOnn6MmKbeXt226K1fMGi6j359D69ua+QZskjd+3cOvY9XNgp4ABCQNYEDBl7EIeCQkeMIDAseOCBwckiBSZ4ILGjh4B/40kaXIjSggMHmBcifHky5gYE6zM2OAlzGM6Z5rs+fIjTZ0tfcYMSlLCUJ8fL47kCVXmTjwPiKJkUCDnyqc3CxzQmYeAxAEGLGJYiwCDgAUT4sqdgOebArdw507IUNfuW71xdZ7DC5iuhGsKErf9CxhPYgUaEhPWyzfBMgUIJDPW6zhb5M1y+R5GjFkBaLmCM0dOfHqvztXYJnMejaFCBQlmVxAYsEGkYnQV4lqYMNyCtnYSggNekAC58uJxmTufW5w55mwKkg+nLp105uTC53a/nhg88fMTmDfDVl65Xum/IZt/3/zaag3a5W63nll1dvfiWbaaZLmpQIABCVQA2f9lAhTG112PQWYadXE9+FtmEwKWwQYQJrZagxomsOCAGVImInsSbpCBhhwug6KKcXXQQYUcYuDMggrASFmNzjjzzIrh7cUhhhHqONeGpSEW2QYxHsmjhxpgUGAKB16g4IIbMNCkXMlhaJ8GWVJo2I3NyKclYF1GxgyYDEAnXHJrMpNAm/rFBSczPiYAlwXF8ZnmesvoOdyMbx7m4o0S5LWdn4bex2Z4xYmEzaEb5EUcnxbA+WWglqIn6aHPTInCgVbdlZyMqMrIQHMRSiaBBakS1903p04w434n0loBoQFOt1yu2YAnY68RXiNsqh2s2qqxuyKb7Imtmgcrqsp6h8D/fMSpapldx55nwayK/SfqCQd2hcFdAgDp5GMvqhvakF4mZuS710WGIYy30khekRkMu92GNu6bo7r/ttjqwLaua5+HOdrKq5Cl3dcwi+xKiLBwwwom4b0E6xvuYyqOa8IAEghwQAV45VvovpkxBl2mo0W7AKbCZXoAhgMmWnOkEqx2JX5nUufbgJHpXCfMOGu2QAd8eitpW1eaNrNeMGN27mNz0swziYnpSbXN19gYtstzfXrdYjNHtAIYGFVwwAEvR1dfxdjKxVzAP0twAAW/ir2w3nzTd3W4yQWO3t0DfleB4XYnEHCEhffdKgaA29p0eo4fHLng9qoG+OVyXz0gMeWGY7qq3xhiRIEAwayNxBawxy777LTXbjsVXRSh++689+7778AHL/zwxBdv/PEnhAAAIfkECQoAAAAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEhYLD4BlwHGg0ubBpuzdm9Dk9eCTu+MTZkDb4PXYbeIIcHHxqf4F3gnqGY2kOdQmCjHCGfpCSjHhmh2N+knmEkJmKg3uHfgaaeY2qn6t2i4t7sKAPbwIJD2VhXisDCQZgDrKDBQ8aGgjKyhvDlJMJyAjV1gjCunkP1NfVwpRtk93e2ZVt5NfCk27jD97f0LPP7/Dr4pTp1veLgvrx7AL+Q/BM25uBegoYkDCABYFhEobhkUBRwoMGEDJqXPDgQMUEFC9c1LjxQUUJICX/iMRIEgIDkycrjmzJMSXFlDNJvkwJsmdOjQwKfDz5M+PLoSGLQqgZU6XSoB/voHxawGbFlS2XGktAwKEADB0xiEWAodqGBRPSqp1wx5qCamDRrp2Qoa3bagLkzrULF4GCvHPTglRAmKxZvWsHayBcliDitHUlvGWM97FgCdYWVw4c2e/kw4HZJlCwmDBhwHPrjraGYTHqtaoxVKggoesKAgd2SX5rbUMFCxOAC8cGDwHFwBYWJCgu4XfwtcqZV0grPHj0u2SnqwU+IXph3rK5b1fOu7Bx5+K7L6/2/Xhg8uyXnQ8dvfRiDe7TwyfNuzlybKYpgIFtKhAgwEKkKcOf/wChZbBBgMucRh1so5XH3wbI1WXafRJy9iCErmX4IWHNaIAhZ6uxBxeGHXQA24P3yYfBBhmgSBozESpwongWOBhggn/N1aKG8a1YY2oVAklgCgQUUwGJ8iXAgItrWUARbwpqIOWEal0ZoYJbzmWlZCWSlsAC6VkwZonNbMAAl5cpg+NiZwpnJ0Xylegmlc+tWY1mjnGnZnB4QukMA9UJRxGOf5r4ppqDjjmnfKilh2ejGiyJAgF1XNmYbC2GmhZ5AcJVgajcXecNqM9Rx8B6bingnlotviqdkB3YCg+rtOaapFsUhSrsq6axJ6sEwoZK7I/HWpCsr57FBxJ1w8LqV/81zbkoXK3LfVeNpic0KRQG4NHoIW/XEmZuaiN6tti62/moWbk18uhjqerWS6GFpe2YVotskVssWfBOAHACrZHoWcGQwQhlvmsdXBZ/F9YLMF2jzUuYBP4a7CLCnoEHrgkDSCDAARUILAGaVVqAwQHR8pZXomm9/ONhgjrbgc2lyYxmpIRK9uSNjrXs8gEbTrYyl2ryTJmsLCdKkWzFQl1lWlOXGmifal6p9VnbQfpyY2SZyXKVV7JmZkMrgIFSyrIeUJ2r7YKnXdivUg1kAgdQ8B7IzJjGsd9zKSdwyBL03WpwDGxwuOASEP5vriO2F3nLjQdIrpaRDxqcBdgIHGA74pKrZXiR2ZWuZt49m+o3pKMC3p4Av7SNxBa456777rz37jsVXRQh/PDEF2/88cgnr/zyzDfv/PMnhAAAIfkECQoAAAAsAAAAANwAEwAABf8gII5kaZ5oqq5s675wLM90bd94ru987//AoHBIBAgGhKRyyWw6n9CodEqtWq/YrHY6ELQEhYLDUPAMHGi0weEpbN7wI8cxTzsGj4R+n+DUxwaBeBt7hH1/gYIPhox+Y3Z3iwmGk36BkIN8egOIl3h8hBuOkAaZhQlna4BrpnyWa4mleZOFjrGKcXoFA2ReKwMJBgISDw6abwUPGggazc0bBqG0G8kI1tcIwZp51djW2nC03d7BjG8J49jl4cgP3t/RetLp1+vT6O7v5fKhAvnk0UKFogeP3zmCCIoZkDCABQFhChQYuKBHgkUJkxpA2MhxQYEDFhNcvPBAI8eNCx7/gMQYckPJkxsZPLhIM8FLmDJrYiRp8mTKkCwT8IQJwSPQkENhpgQpEunNkzlpWkwKdSbGihKocowqVSvKWQkIOBSgQOYFDBgQpI0oYMGEt3AzTLKm4BqGtnDjirxW95vbvG/nWlub8G9euRsiqqWLF/AEkRoiprX2wLDeDQgkW9PQGLDgyNc665WguK8C0XAnRY6oGPUEuRLsgk5g+a3cCxUqSBC7gsCBBXcVq6swwULx4hayvctGPK8FCwsSLE9A3Hje6NOrHzeOnW695sffRi/9HfDz7sIVSNB+XXrmugo0rHcM3X388o6jr44ceb51uNjF1xcC8zk3wXiS8aYC/wESaLABBs7ch0ECjr2WAGvLsLZBeHqVFl9kGxooV0T81TVhBo6NiOEyJ4p4IYnNRBQiYCN6x4wCG3ZAY2If8jXjYRcyk2FmG/5nXAY8wqhWAii+1YGOSGLoY4VRfqiAgikwmIeS1gjAgHkWYLQZf9m49V9gDWYWY5nmTYCRM2TS5pxxb8IZGV5nhplmhJyZadxzbrpnZ2d/6rnZgHIid5xIMDaDgJfbLdrgMkKW+Rygz1kEZz1mehabkBpgiQIByVikwGTqVfDkk2/Vxxqiqur4X3fksHccre8xlxerDLiHjQIVUAgXr77yFeyuOvYqXGbMrbrqBMqaFpFFzhL7qv9i1FX7ZLR0LUNdcc4e6Cus263KbV+inkAAHhJg0BeITR6WmHcaxhvXg/AJiKO9R77ILF1FwmVdAu6WBu+ZFua72mkZWMfqBElKu0G8rFZ5n4ATp5jkmvsOq+Nj7u63ZMMPv4bveyYy6fDH+C6brgnACHBABQUrkGirz2FwAHnM4Mmhzq9yijOrOi/MKabH6VwBiYwZdukEQAvILKTWXVq0ZvH5/CfUM7M29Zetthp1eht0eqkFYw8IKXKA6mzXfTeH7fZg9zW0AhgY0TwthUa6Ch9dBeIsbsFrYkRBfgTfiG0FhwMWnbsoq3cABUYOnu/ejU/A6uNeT8u4wMb1WnBCyJJTLjjnr8o3OeJrUcpc5oCiPqAEkz8tXuLkPeDL3Uhs4fvvwAcv/PDEU9FFEcgnr/zyzDfv/PPQRy/99NRXf0IIACH5BAkKAAAALAAAAADcABMAAAX/ICCOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSAQIBoSkcslsOp/QqHRKrVqv2Kx2OhC0BIWCw/AoDziOtCHt8BQ28PjmzK57Hom8fo42+P8DeAkbeYQcfX9+gYOFg4d1bIGEjQmPbICClI9/YwaLjHAJdJeKmZOViGtpn3qOqZineoeJgG8CeWUbBV4rAwkGAhIVGL97hGACGsrKCAgbBoTRhLvN1c3PepnU1s2/oZO6AtzdBoPf4eMI3tIJyOnF0YwFD+nY8e3z7+Xfefnj9uz8cVsXCh89axgk7BrAggAwBQsYIChwQILFixIeNIDAseOCBwcSXMy2sSPHjxJE/6a0eEGjSY4MQGK86PIlypUJEmYsaTKmyJ8JW/Ls6HMkzaEn8YwMWtPkx4pGd76E4DMPRqFTY860OGhogwYagBFoKEABA46DEGBAoEBB0AUT4sqdIFKBNbcC4M6dkEEk22oYFOTdG9fvWrtsBxM23MytYL17666t9phwXwlum2lIDHmuSA2IGyuOLOHv38qLMbdFjHruZbWgRXeOe1nC2BUEDiyAMMHZuwoTLAQX3nvDOAUW5Vogru434d4JnAsnPmFB9NBshQXfa9104+Rxl8e13rZxN+CEydtVsFkd+vDjE7C/q52wOvb4s7+faz025frbxefWbSoQIAEDEUCwgf9j7bUlwHN9ZVaegxDK1xYzFMJH24L5saXABhlYxiEzHoKoIV8LYqAMaw9aZqFmJUK4YHuNfRjiXhmk+NcyJgaIolvM8BhiBx3IleN8lH1IWAcRgkZgCgYiaBGJojGgHHFTgtagAFYSZhF7/qnTpY+faVlNAnqJN0EHWa6ozAZjBtgmmBokwMB01LW5jAZwbqfmlNips4B4eOqJgDJ2+imXRZpthuigeC6XZTWIxilXmRo8iYKBCwiWmWkJVEAkfB0w8KI1IvlIpKnOkVpqdB5+h96o8d3lFnijrgprjbfGRSt0lH0nAZG5vsprWxYRW6Suq4UWqrLEsspWg8Io6yv/q6EhK0Fw0GLbjKYn5CZYBYht1laPrnEY67kyrhYbuyceiR28Pso7bYwiXjihjWsWuWF5p/H765HmNoiur3RJsGKNG/jq748XMrwmjhwCfO6QD9v7LQsDxPTAMKsFpthyJCdkmgYiw0VdXF/Om9dyv7YMWGXTLYpZg5wNR11C78oW3p8HSGgul4qyrJppgllJHJZHn0Y0yUwDXCXUNquFZNLKyYXBAVZvxtAKYIQEsmPgDacr0tltO1y/DMwYpkgUpJfTasLGzd3cdCN3gN3UWRcY3epIEPevfq+3njBxq/kqBoGBduvea8f393zICS63ivRBTqgFpgaWZEIUULdcK+frIfAAL2AjscXqrLfu+uuwx05FF0XUbvvtuOeu++689+7778AHL/wJIQAAOwAAAAAAAAAAAA==';

images['red_light'] ='data:image/gif;base64,R0lGODlhDQANAMIFAP8AAPwDAuUYEq9KOKFWQm2GZm2GZm2GZiH5BAEKAAcALAAAAAANAA0AAAMmeHojIWMtAqoFZN6dz/7MtzXi5ZTWg1bQCkSuQpXdMXOS0jzRkgAAOw==';

images['titular'] ='data:image/gif;base64,R0lGODlhFAATAOZNAL7JuKCwmNXc0WuEX8DLu4SZeqGxmouegYicftrg14KXd83Vyfn6+F14ULvGtaWlpEpoO8LMvL/Kuunp6au5pN/l3eTk4/z8/L+/vcXEwq67p77JuVp2TJaojpytlN3j2lh0S73IuFFvQ6y6pUFhMrnFs/f49kVkNn2TcsLNvczVyJKkibC9qXKJZrG+qsLCwHCIZJepj5+vl52ulens52V/WXKKZ7TAruHh4O3w7GiBW/v8++Xp48bQwaSznPP18qq4o+3w66Kyms3Ny2N9Vuvu6Vt3Tj1dLd3d3EBgMbvHtv3+/f///ztcKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE0ALAAAAAAUABMAAAeWgE2CgkcQASEHADw3Bzokg00NNggaCwI/TJmaTEsVEgYFA0WbpKWaNAmmmxMZOJsCPaqaQw8vmxtKspkWGEiZO0xAMDEBArqZAEQgHIMFx0wKkIIozzLSTQjPJdcrzwvXHc8fSdIGz0En0iPPJiLSLs8MRtIOzxc10inPTC3SKvvRIAFgkCMBARY+AniYIYQCgQgDBAUCADs=';
images['suplente'] ='data:image/gif;base64,R0lGODlhEQATAPeJAAVjpQVlqRZiggVkpgA0WQJDcQRbmAViowVhoQVfnhliegVmqQRfngVgnwVhogVnqgVlpwNVjzlcMANNggVkpzddNCBhagRXkgVenARZlS1eTANQhzpcLARVjwNOgwRWkDlaLRBkkBVIUhZacgRdmzJdQC1VPDpcLSNeXgNMgAVgoARenQxkmCZfWwRfnQE2WQE1WiRgYRRihAA4XwVkpSRgYgNTigA0WgtEXyJTTShfVw9afx9LQztcLC9eRgpcjC5eSAJLfzldMARZlANWjwJAbAE3Xi9eRzhdMwNTiTNdPw9jkBdGSx9hax9LRgQ8XwRXkSVgXzBeRQNRiDdZLglknwRalQxWfwRenBBjjwlkoAE7ZAA1XBBkjypfUwNRhgJIehRjhgZmpgA1WhthdQRWjwVnqyRZUwJEcwVmqgRUjgplnQ5JYxlITCJgZBpJSxdjgBZigClfVgJNgQVbmQRYkQA2XQNSigA3XgA2XCJgZQRZlgZblQRblxVjhBhiewJJewVDbARVjgNUjAE7ZQVnrARalgRYkwVlqDtcKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIkALAAAAAARABMAAAj/ABMJFEjFCZM2b0wMXDgQhAgYY7jceJGD4UIeTwgQ2mKEAA6LiXpIYTMjTxkABQgEgkOmxEI3iMDgSVKgCBo7BcwgYqFEoAYxiLD0KTQI0IENNh4gCiDjRKI4iBwACIDIgJU0BjxESDDVS4U1JFIgGmvoEKIJQeYIMhDAwpEFHegoRVQWUYQJd1ZkAKCgBYUpA6jSNTsWkYoMFAQ0AfBlQOG6hREcAiAgzAE1jskSHssAygEBXRp0KDyYtIs6NP6EwLC5dGEGQxBZ8IPhA2nIYxNcQKSnBp8Ngl2PbUAEgRwhZ64seNzawQ8UEgTqyFIFAqI9uxFB0LJEQ/SBHJD4DIgyYoeCGEAqcBgYEAA7';
images['nojugadoEquipo'] ='data:image/gif;base64,R0lGODlhGQAZAPf/AEyCpOTj4meFktbUy1N8lRSOC97c2f76+SovNTlqiVJMRE17m6OcmzpzmIJ8ezpFRVedSTs7MzqBr0GBpENedzNzl11bUXRlY117mkKBq1aCnFlrgZm9jTx0k1J8m//6/JPFi/r29kKJtCWVHY28gmlnX0mBnlp1i7KsrEdIRlZhbDNSaFFdZj1VZTdccktUXtfW00RifeTh3jxifI6IhElhbIS6ezVWawKCADKWK0yJskFvkxwmMB+RFjNpg5uVkj10jk5lfPb18y+TIktfbezn5S06RkV0jUVZYkuFrA2GAZ3CkjlvjVtlckFlgoqreRaQDTh1m0VdaklogEmdPcG8ujaBpTdWajpAPTNqilqtVB2PGbjKrVGGqA+KBkZqfjuCpzmcNjp+ojObLDpjgzp7ov33+YexeUZ9nW9sZj9ZbjREUWKFoWtdVXGzZ0Z2m6u/njpZajdheRUMCzN7ohIhDTp8npqPkBeNDjhMXejh33ata/Dt68/XxCCME0KIqFBzlTl5nk90lPv1+KjHnUR5nTBYbUWjQDNhfUhzi0N6pER8o2RZUGNdV0l8n2Vzelt/oiVOcDlRVjRlhGB9lTxoiihAWGGuWYB4daukpUFPV01kdYywfUtodIWzdzMhHh+TGq7LpU58ly9YdgSLADOIrsXQvEWDsy1TbUGKuzhNYUiLuLnNsENvj0BUaWBvf01ZYkVthHm3cD5+nTaRKPzx9kqIrTCZJhSICDd4mdDVxkGSM0KZN0SeOZ3IlpbHkWBygGR9jGx/jEJ8qpCHg//4/HCGmDRvkfDo6fHp7FqgTPHt7zl8mR8eJjx8m3WzbHa4bl6lU16vWVd2hmqyYVF2iTmbL7HOqT93nkF+m3BwaEB8nVdRR1JWTFpVSHCpYrK0tXioZnZsalJneJnDjxmSER+UFjFhePXu8TRjfjRmf2ymXktKQUxzhvTw8UB5ok1qgEN+o0V/psnEwszKyDNJWevr6e3r6u/u7EejPjpabObd2z5caTx5oAAAACxQHyH5BAEAAP8ALAAAAAAZABkAAAj/AP8JHEiwoMGCdfwpXMiwocM6Av11SkTAAxsMzEzkErEIzIRAYJjsmJROzhV/ERNN+AOAzCgrGY51SKDOhSE5alpIibOpBsp//io4ypbOiAonaq7wI7IiCAV4G2IRAGICwE9/iFy44vHpwqsN8DxgaAWg0IQkGVaJEXHq6qNqU5rNMQIpyZth8iaIoAMmXoMdMcjou0pJRwMec3hESoWtnzMflWbcaOFCSo0pwK6+yxDlxpo8lihQWIFECpEmX4KdIKAhm9WITGJcaQHrhYom49oJO8GGzSxbjsSI6ZfhKgvb0wQYW9BFFJouHiB5sFOKjqI3lWJcPWFCwzYraBpI/8j1zrAgQFl8xKn3AEuEq0fK2IkioUwHAB2yzKD9wggWBewo0EgaV1WwwAIJODHFFWtoIskD7FhgATdtXJAGJgyAc9U5qKiyBgIpKKCABYw0UoI2DhDzQyZVwMCHEFelgEU33ihQoTgO3MEACvMYIMM9IXwwSBEDXCVhCZioiEKLAeATZDGDLGMAF55AsMtVNOxIjwz2CHHAAWagI4MpcHASDS9+eLFFDlcF4I4ZHxRTSzJ6DMDFGVRs4QUuoIzRyzdLXHMVMkXsowsrcDyhDC24KNFDGPmEw8ESvpBAxRhXPbEOBLR4oYQSBRwijSzk9BHKHhDcYk45BRRwFQ6w3j2iBTU2gEDILyBc8gwHI5ACxa/m9HCVFtDYQAIHJNjghjV4FOAFHm54MgQePVQrrEAJOaStthAd5O23/wQEADs=';
images['nojugado'] ='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';

images['comstats'] ='data:image/gif;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAs7i3AN7h3wDg4d8Ae4B+AAUFBgAHCQkAkJuYAG9ycADAxcMA6+vrAMHFwwAyOjcAwsXDAAsRDwDZ3NoAm6ShAPLz8QCeqacAjZKQALS8uwDLzswAtry7AAQEBADi5eMApK2qAJCbmQBFSEYAu8TBAKSpqACirasA+Pj4AFdaWADn6ecAqLGuAKyurgANEA4A2NvZAMXFxQAzQj8AhpGPABEVFACxurcAnaimAMrNywCKlZIAn6imAAIDAwDLzs4AAwMDAOHk4gAEBwYAj5qYABkeHQCmsa8A09bUAFteXAC/xMMA6vHuAK62tQCFkI0A3N/dACgrKQD18vEAtbq4AIqVkwC1vrsAztHPABcdGwClq6cAGR0bALq/vgAYIR4AqbCtAOnr5gCqtbMA19rYAMPIxwCwtbMAYmdmALa2tgCyurkAipSRAAICAgDK0M0A4OPhAKKrqACOmZcAQUZEAPn6+AAsNDMACAoIAAkKCAD7+/sA0tXTAJSdmgCXoqAArbW0ANre3AASGBcATlhWAPT18wCPlJIAzdDOABkcGgAuMzEAvMLAAL3GwwCptLIA1tnXAJahngCXoZ4AmKGeAISPjQB3enMA8vHxAIiTkACJlY0AAQEBAN/i4ACiqqcAjZiWAKSqpwCmq6oA+vr6ALrCwQDR1NIAqq+tAOrr6QCqs7AAwcbEAJahnwCstLMADRIQAK20swDy8O8ADhsZALO8uQAEAQIAs728ALW9vAADBQUAvMG/AL7BvwBRaGQAqLOxANXY1gCus7EAx8rIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMJN7HQAAAAAAAAAAAAAmT30WAUdaUAAAAAAAAAATOBuCCxxqNWgIAAAAAABNIFhCjBSJiSpEaSMAAAAAkSxRSztskYQ2gWtmAAAAJTlHYRKDYGBgK1YZIk4AADdngkAeJykpY3kabhB6AAAYbWcJhopTMXYoQQdfPAAABgNMQ4tTMTFTdXEtV0YAAAZcMg+QMTEXFww0dGRIAACIWyFzYi4vBQR4b1IzcgAAAIV8H4ACVH6Uj0lwjQAAAACHEV18EVU9XhWOf0UAAAAAAGVlWXxKgHeSLA0AAAAAAAAACjo+DiQkPwAAAAAAAAAAAAAAAAAAAAAAAAAAAPw/AADwDwAA4AcAAMADAADAAwAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAwAMAAMADAADgBwAA8B8AAP//AAA=';
images['comstatsno'] ='data:image/gif;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/mAAD/ugAA/2cAAAAAAAAAAAAAAADLzs7/rrOx/6arqv+kqaj/AAAAAAAAAAAAAAAAAAD/QAAA/9sAAP/2AAD/ugAA//8AAP/5AAD/qpOT0/9iZ2b/usLB/7a8u/+zuLf/ur++/yw0M/+2trb/AAD/QAAA/34AAP/bAAD/2wAAAAAAAP/GAAD//wME+/8KCuz/MzV0/8HGxP/BxcP/u8TB/7zCwP8ZHh3/EhRT/wwM7v8AAP/sAAD/1AAA/3AAAAAAAAAAAEFD7P8GBvL/AwP0/zU46v+1vbz/tLy7/7O8uf+zvLn/sbq3/wYIu/8AAP//Bgb8/wAA/40AAAAAAAAAAAAAAACos7H/iIrb/zU36v8AAP//Mzbo/6m0sv+os7H/rLSz/2Jpz/8EBPz/AwP9/y0v2/8AAAAAAAAAAAAAAADY29n/v8TD/7q/vv9na9L/BAT8/wQF+/81Od3/l6Kg/5eioP8pLOf/AAD//x0f7/+Xn7X/sLWz/wAAAAAAAAAA09bU/83Qzv/BxsT/o6e+/x8h7v8AAfv/AAD1/wEC4f8HCaH/BQX6/xkb7P95grD/m6Sh/6Sqp/8AAAAAAAAAAOLl4//W2df/zdDO/8DFw/+MksH/AADB/wAA9/8AAP//AAD6/wQF+v9KUMT/kJuY/5Sdmv+FkI3/AAAAAAAAAAAHCQn/4OHf/9fa2P/O0c//s728/wAAfv8AAO//AAD+/wAA/v8QEfH/d4CY/4qVkv+OmZf/GR0b/wAAAAAAAAAABwkJ/wkKCP/h5OL/2dza/y06qP8AAOT/AADk/wAA9v8AAPz/BAXs/y8z3P+Ik5D/TlhW/xghHv8AAAAAAAAAAA4bGf8ICgj/5+nn/4eH9/8SE/v/AQH9/wAA5P8CAnP/JSbY/wwM+P8CAv3/LjHa/wQHBv93enP/AAAAAAAAAAAAAAAADRIQ/0VF/f8kJP3/CQn+/xIS/P9xdOL/0dTS/8fKyP9ISeb/BAT8/w0N9v8CA0P/AAAAAAAAAAAAAAAAAAD/jTw8+v8AAP//FRX+/0pK/f+jo/X/4OPh/9zf3f/S1dP/iIrc/woK+/8CAv7/KSro/wAAAAAAAAAAAAD/wQAA//sAAP/xFBT+/4iJ+P/g4fj/+vr6/+nr5v/q6+n/3+Lg/9XY1v9MTev/BQX9/wAA//MAAP+/AAD/GQAA//YAAP/1AAD/2QAA/3Dr6+v/6vHu/ygrKf8LEQ//DRAO/w0QDv/18vH/AAAAAAAA/5QAAP/pAAD/+wAA/8sAAP/hAAD/qQAA/1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/fAAA/+wAAP/ePDwAAAAMAACAAQAAwAEAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAADAAwAAgAMAAAABAAAQEAAAP/wAAA==';
images['cpc'] ='data:image/gif;base64,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';
images['cpcno'] ='data:image/gif;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAABAQAAABAAgAaAUAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/ZwAA/3AAAAAAAAAAAAAAAAAAAAASCx8ZWggYFD8AAAAEAAAAAAAAAAAAAAAAAAAAAAAA/zAAAP/NAAD/9QAA//EAAP/1AAD/vwAA/xkAAAAAJl5NLjJ9ZNAudV6UAAAACAAAAAAAAAAAAAAAAAAA/xkAAP/IAAD/+gAA//cAAP/GAAD/+QAA//wAAP/WAAD/GSRiTjE5jnLnNIFpqwAAABMAAAAGAAAAAAAAAAEAAP2lAAD/8gAA//kAAP+tAAD/GQAA/54AAP/xAAD/+gAA/5gkYk4xOY5y5y1yXMkHFRBqAwkGTwAAczcAAPzEAAD97QAA/8IAAP+EAAAAAAAAAAAAAAAAAAD9swAA//sAAPvrCh2dejmNcug4jHH3Mn5m5yZhbNgCBu/wAAD9/QAA+u8AALxwAAAAGQAAAAQAAAAAAAAABgAAU0wBA+jpAAL0+AQM1eodSa75OYxx0R5LsrMKG+T1AAD//wAA/P0bJsXdUXFnrz5VToYAAAAmAAAAAAAAACgaQjWtH09a8gkY0fwAAfv/AQP7/wQK8/UAAP3yAAH9/A0f4P46Xrv7lM279JnUwemQyLfudaKUWwAAAAUZPjNuJl5L9SZfTcUcSXRwAwfw5wAB/f8AAP7/AAD+/gQK6vE1goL9ZqmT1pTKul2W1cAxmdPAb43Gtj8AAAAKIVFBoCdhTvgjWEZlAAAAAAgX2n8CB/f+AAD+/wAA/f4RK836SpyC/mSkj4cAAAABAAAAAAAAAAAAAAAAABISDiNZR7kmX0zqGkM1OQAA/0AAAf3wAAL8/QMI9vkBBPr8BQr3/C5H3v14qJhhAAAAAQAAAAAAAAAAAAAAAAAqFQwkXEq2JV5L6w0lalQAAP/MAAD/+wAA/t4NINAjAAL8rQIE/foFB/z/DRLw2gAAAAQAAAAAAAAAAQAAAAEAAAADJFxLkg8lt/wBBevnAAD/+wAA/fUAANJ5AAAADQAAAAATGvXNAwT9/wAB/v4AAPLJAAAAFQAAACkAAAAYAAAAAAIH8N0AAP//AAH6/QAB9PMBBbG5FDQqlxAsJi4AAAAAjMKuJiUz7/EDBP3+AQL7/AkOx8pYeW6oYId6TwAA/7sAAP/7AAD9/gwex/0ZP3byIlZF7CZfTNsgVkEvAAAAAAAAAACZ0sBiKzzt9AYJ+/8MEfj+UXDc9DhN4YQAAP/yAAD/8AAB+qcmYU1cJWFNjSZgTYolXktRAAAAAQAAAAAAAAAAAAAAAJnQvjcVHfbWAAD//wMF/fIAAP/nAAD/4QAA/4kAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6gAAP/nAAD/9f/8AAAc+AAADPAAAIThAADEBwAA4AEAAMABAADIDwAAnA8AAJgfAACRDwAAg4cAAIHBAAAB4AAAE/AAAD/4AAAoAAAAEAAAACAAAAABAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AAAA/wABAf0AAQH+AAEC/QABAv4AAgX1AAID/gABBPsAAgT7AAIF+AADBP0AAgX6AAIE/gACBvgABArrAAQF/AADBvoAAwX+AAQF/gAEB/oABQrwAAUH/AAECPkABAf9AAQK9AAFCP0ABgn6AAUI/gAHCvoABwr+AAsV2gAHC/4ACRDvAAkN+gANFOIACA/2AAkO/QAMEu8ACxPwAA8jwQAPIscADhnvABAX/AARGPkAEhn8ABtCiQAeK9gAFDDNABQw0QAaJvcAGiX7ABwo8QAYM9cAHSn3ABg5wwAcKPsAHyzvAB8u7wAgMOgAJVljAClfUAAhL/UAKl9RACAu+gAqX1IAJTzMACpiUQAlNe4AIzL6ACpkUgAlNfoAKDjwACY2+gAnOPoAKULaAC9oWQAtSMwAKjv5ACo8+AAqPPkALEPhACs9+QAsP/cALD/5ADBE8gA1b2MAP16ZADJM3AAwRPkANkvrAEBvcAA2TPgARmqPADdS6QAsbJgAR3N6AD54cQA1Xs4APmmrADpT9wBBeXUAQlvkAD1+cgBRd4YAP1nzAEN9eQBAXPYAS4CBADuGcwBChXsAWIGRAEhm9gA7jnUAW4CbAESMfQBJaPUAQYmSAExt8wBBk30AQZR+AGWOmQBVkpUAV5KWAF2QnQBikKIASpyCAGWRpQBrlpkAU5qUAFiamgBfiO4AYYryAGWfqwBxoLgAb6G3AGiksQBqp7MAapjuAGuY7gBtr6EAb6q6AGya8QB6rccAeq7IAHmt0QB7r8oAerHJAHm4uwB+s80AfrPOAHqu4QCFuMMAgrjJAHy4zQB8uc4AfrrQAIO61gCDu9cAh77NAIS53wCAt+sAhb3ZAIK57gCGv9sAh7/cAJDIuwCJxOEAisThAIrG4wCLxuQAisTtAIzI5gCOyecAks3aAJDM3wCY08UAjsroAJDM5ACPy+kAlNDZAI/M6gCTzuMAlNDcAJLP5ACQzewAkc7tAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFyEurq6pX2Hs7q6urq6unABHnSOupxzgqy6urq6o0UBQCArLVmbeIGkrbq5djMBRbprLQ0DXnhub3+WaRIcSbq6uos+ATt3cW1nQh0ENJ2zuq2GXSMVMHViNQ4BJnJ5krqQWz08KBkRGBQxTZiwpp+xfENhiEsIAQIhX4yuuLSvqmxGhVkaDAAKN36Uubq6uqdlTDoSByQXESpYkbm6urqpaikDB0qKg08sCzmhurm5tWMPCTKXlaijVQcbRKKPnrpRBh9XaGCTurJIEAEvgJlkJScuP0FWmrq6t1oWImagHgVTiXp7jbm6urq2NgETUEdOq7q6ubq6urq6urpUUjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
images['cmz'] ='data:image/gif;base64,R0lGODlhEAAQALMAAAAAAP///0l1Q4qjhv9gANOul+7u7szMzLu7u////wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAQABAAAARLUMhJx6DC6M3P0ZJGjNxYfCGxqYaqnikntu1x0TPtGndL5rSQbAjKEIex3GhpEAx8ypzzsGPlEJJDQWRVIb6hk3IEFnqGZYwFg4kAADs=';
images['cmzno'] ='data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///87ZyNHcy8/ayTtkIzxlJD1mJT5nJj9oJ0BpKEFqKUJrKkNsK0RtLEVuLUZvLkdwL0hxMElyMUpzMkx1NNLczNHby9Days/Zyc7YyGVrO2VpOWltPWhrOmVnNmZoOGNkNGhpOGRlNmlqO31qMINxOYNyOYBwOn5rMn5rNIBtNn5sNoNvOX5sOIFvO4dvMYRvO4xyNZF1N5J3OY91OYVqMY9yNo1xN5R3OpN2OoxxOJR4PZh7P5d6P5d7QJZ5QJV4QJh7Qpl8Q5d8Q5p9RdikRY5vNZN1PZd5Qrd7O7V7O7Z7PLp/QLl/QLqAQrh/QbuCQ7yCRL+JT7R5PP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFYALAAAAAAQABAAAAfKgFVVKCcmKjEsKy0vLiklgpALBQwOChAKExERkDKQAhgCDgYZGQmQODATkBIODRMDCqs7RAgWqw8HtoIZDDZFERamggcUkAkZCklBCgsXF5CQCrkOSECUBwgS0A4RBwUQRzoKGhARsZAEGhkXDDc5EwICm9BVowwUQzwIGAuQDKqCFEiIIORHgwGeCihwAKmBAx89EECqQACBAgEZ/M2gAYlCgQkSJFBgIFFQDUgfRoQA0WEDBxIeRNAzQuWJlChNnDBZAkXJFEGBAAA7';

images[':D'] =  	'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///wDywwDuvwDsvgDqvADktwDitgDgtADcsQDarwDYrgDWrADSqQDOpgDKogDIoQDGnwDEngC+mQC8lwC4lAC0kQCyjwCujACqiQCohwCmhQCggQCcfQCafACWeQCOcgCKbwCGbACCaQB+ZQB8ZAB4YP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAPAA8AAAZ6wJNQCCgWh8hTcQJpKAxHJEBzoTQVh4IAMAR0NkWJY1EcbIkeAKYCeAASBwCBCwB9OBkLJeJgJBAGUAAhRoWFCUUiAAEBi4yOAA1FI5CMjY8QRSWVj48TdCSLjpcAF1xKJqGjRRsap6iqRh4dr0QAJSMiISBRSUqFSUEAOw==';
images[':)'] =  	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOfoAOjoAOTjAOTkAOPjAODhAODgANzbANrbANvbANjYANTTANTUANHSANLSANHRAM/OAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALy7ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKSkAKOiAKKiAKChAKCgAJydAJycAJqbAJuaAJubAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAPAA8AAAergFKCggCFhYOIUoUjHBUQCoeIADIsJRsUDwsGAwCDAD01LSYfGBEMBwQCnYpAOIUgGhOFCAWdAEhCO4UlHhmFDQmQAEpFPjYuKCIdGRIREA6FS0dCPDEtJyEeGhcWFYVNSkZAOjAtKiMgHx0chVBMAERBOTEuKykAJSS2T0vwPzs2XgBowWIVgCj8DBW6QWPGKkUImSg5MkRIEB8PCQGA4mSJkiSREilSmCgQADs=';
images[':('] =  	'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///y9ekS5cji1aiytWhTx2tzt0tDpzsjpysThvrDhvqzdtqTZrpjZrpTVpozRnoDRnnzNlnTNlnDJjmTFhlzFhljBflDBfky9dkC5bjS1ZiixXhytVhCpTgSlRfShPeiZLdCVJcSRHbiNFayJDaCFBZSA/Yh89XypSfylQfChOeSdMdiZLcyVJcCNFaiFBZB89Xh47W////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAPAA8AAAaWwJlQCCgWh8hZMVOJOBRHJCDFATQdgIQBMASwPoDBZfJgAA5bYgjQIWAokMYCgOACSKJVcWCZFBkKUAAlIyxFBBkWRQ8ODUUmeCspBQQCFhQTEhFFJ4QhIB4FGxkYFxYVRTEwLy5GhxoDGXYoJgAuISsfHgAFVUQytC8jLSwrKh8pXL8oMCUkLiIhhkmpJybOUUlKrklBADs=';
images[':o'] =  	'data:image/gif;base64,R0lGODlhDwAPAKIAAP///729vZyc/zExMQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQhDAABACwAAAAADwAPAAAITQADCBRIoGDBgQgDFBTAkOFBhAQaSnQ4MOLEiQQIXsSosOFChxYFfBQwYEDDkh5Dbky5EqPKlhlVGpSYsWNKmRVvekw4EmTCigZrDgwIACH5BCEMAAEALAAAAAAPAA8AAAhWAAMIFEigYMGBCAMUFMCQ4UGEBBpKdDgw4sSJBAg6tChgYUeFDgEAiEhApEWPBAYMIKnyJEePHV9yvCgRJs2GGWcarKkRp82MPWO+TGgzZsKKBoEODAgAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIVgADCBRIoGDBgQgDFBTAkOFBhAQaSnQ4MOLEiQQIOrQoYGFHhQ4BAIhIQKRFjwQGDCCp8iRHjx1fcrwoESbNhhlnGqypEafNjD1jvkxoM2bCigaBDgwIACH5BCEMAAEALAAAAAAPAA8AAAhNAAMIFEigYMGBCAMUFMCQ4UGEBBpKdDgw4sSJBAhexKiw4UKHFgV8FDBgQMOSHkNuTLkSo8qWGVUalJixY0qZFW96TDgSZMKKBmsODAgAOw==';
images[':-?'] =     'data:image/gif;base64,R0lGODlhDwAWAJH/AP//////AAAAAP///yH5BAEAAAMALAAAAAAPABYAQAI/3GSGuSwBoWgv2tuS3jXM+EkOlilaVm7qcbVI11qvhInHfS8vc/b8b1JNhisYhiHphGYxUvOoHCqRzdRBuikAADs=';
images['8)'] =      'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///4MqB48uCHwoB+ZJDOJIDOBHDN5GDN1GDNFCC89CC81BC8pAC8A9Cr48Crw8Cro7Crg6Crc6Cq03Cas2Cak2Cac1CaU0CZoxCJgwCJQvCIcrB4UqB3IkBtlFDNdFDNVEDMhAC8Y/C8Q/C7U6CrM5CrE4Cq84CqI0CaAzCZ4yCZwyCZIuCI0tCIssCH8oB34oB3gmB3YmB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADQALAAAAAAPAA8AAAaHQJpQCCgWh0hasfQQLT5HJEBlMTUXIEQBMARsVhdThMQIJQxbYotVlDgaxcSBa6xD6nXBC19fKIowHANFFygTRSQjIkUEei0ZKRcUJRIREA9FMzEdLo8qGBUoJyYldDIwAJ0aKykAFxZcSh6neCwrKrGyMjECHC4DLRu5RAAzBDC9UUlKdUlBADs=';
images[':lol:'] =   'data:image/gif;base64,R0lGODlhDwAPAOYVAAAAAHt7AISEAIT//4yMAJSUAJycAKWlAK2tALW1AL21AL29AMbGAM7GAM7OANbWAN7eAOfnAOfvAO/vAPf3AID//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID//yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAVACwAAAAADwAPAAAIjgArCBQIoGDBgQgrFFzAwAEECAcRAjiQgOGDBxEiTAAwEICBAwgYOngAQeNGgh8LMmDwoKBGjgAIFACAAAEABgBIAogAMWaBjwgqNrwIoSUAATIN1FzAsIGDkQWR/jwAUuhKnAACCDDIdeECmFq7FgzKUWGAsFypHihrVisBmT8NsCWYVQBSAhETKuSaMCAAIfkEBQoAFQAsAwADAAsABgAACDcADwAAwMDBg4ETJgxEkACAAwAQIABQaIDhgoIPIkKIYOCARYwZHxSoiGDBRQcoDw5cuZIBg4AAADs=';
images[':x'] =      'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP////IAAO4AAOwAAOoAAOgAAOQAAOAAANwAANoAANgAANQAANIAANAAAM4AAMoAAMgAAMYAAMQAAMIAAMAAAL4AALwAALgAALIAALAAAK4AAKgAAKYAAKQAAKAAAJwAAJoAAJYAAJQAAJIAAI4AAIoAAIYAAIQAAIIAAH4AAHwAAHgAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAPAA8AAAaBwJZQCCgWh8hW0RJpKA5HJICTATQVgIIAMASAOpoL4AFAGAZbYshTpAAYRQOBCyiJPsWLhFw+QAEmJF8bGBZ7DAsKCUUndh8cGhgVEhAPDg1FKYFGnBMSEUUrKJykFxZ0KqScVUQsqaodHFytKigmJSMiISCzXQArKSe3UUlKnElBADs=';
images[':P'] =      'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOTjAOTkAOLjAOPjAODgANvcANzbANrbANvbANjYANbVANTTANHSANLSAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALu7ALi5ALm5ALi3ALe3ALO0ALOzALGxAK+uAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKKiAKChAKCgAJydAJycAJuaAJubAJeXAJSUAJOTAJKSAI2OAI6OAI2NAIyMAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE4ALAAAAAAPAA8AAAekgE6CggCFhYOIToUgGRQPCIeIADApIhgTDgoGAwCDADkzhRwVEIUEAp2KOwArJAAXAAwJAAWdAEE9Ny0oIhsWEQ0LB5AART86NCwmHxoWEhAPDYVGhTgvKiUeG7AAFIVIRUAANi4qJyAdABoZhUtHRD6GhiMiIbZKRkMATfsALCopUgFggq8fvxoyYqRSRPCIoR48dCwkBGBJEiNFhERKpEheokAAOw==';
images[':oops:'] =  'data:image/gif;base64,R0lGODlhDwAPALMAAAAAAM7Ozv8AAP///////////////////////////////////////////////////yH5BAEAAAEALAAAAAAPAA8AAAQ1MEgJap04VMH5xUAnelM4jgAlmCG7at3mmSt9inKcz3iM2zQgzOMjDWdC1e0FstUyJUsKEwEAOw==';
images[':cry:'] =   'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///2OE/87e/wCa7gCZ7ACX6gCW6ACS4gCR4ACO3ACN2gCM2ACJ1ACI0gCFzgCByACAxgB/xAB8wAB7vgB4ugB3uAB2tgB0tABzsgBysABuqgBrpgBqpABpogBlnABimABhlgBekgBcjgBZigBVhABUggBQfACd8gCU5ACH0ACDygB+wgB6vABxrgBtqABooABkmgBglABbjABXhgBSfgBOeP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAAPAA8AAAaXwJtQCCgWh8hbkQJxLFJHJOCVaTUXCAMKMAR8OJqW5MFIHAhbYqxTZK0axUOBCxiFYMVW5FFMpKAAJCJfLhYUEQMCDAsKRTR2MC8aFhOJDyoORSaCMR4bGhcULBIREEUnJTMynS8uGBYVLRR0NTQzRkUuGhlcSjY1ADMiIB94HC+9vjUlJCMyITEfyUQAJyY0zVFJSrhJQQA7';
images[':evil:'] = 	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOjoAOTjAOTkAOLjAOPjAODhAODgANzbANrbANvbANjYANTUANHSANLSANHRAM/OAM/PAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL69AL6+AL29ALy7ALu7ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+uAK+vAKqqAKipAKmoAKioAKanAKemAKSkAKOiAKKiAKChAKGhAKCgAJydAJycAJuaAJubAJiXAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAI2NAIyMAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAPAA8AAAevgFKCggCFhYOIUoUgGhQQCYeIADAqIhkTDwsGAwCDADozACMdFxEMAAQCnYo8NCwAHhgSAAoHBZ0ART83UVEAHAC9DQiQAElCO70mABu9ERAOhUpEPzkvKyUfHBgWFRSFTElDPDYuKyggHh0bGoVPS0hBPTUvLSknJCIhuE5KR4aFWqxQsQoAFCcAkAzxsQMHABkxVik6uCQJESA/euyQSAjAkyZKkhiJlEgRwESBAAA7';
images[':roll:'] = 	'data:image/gif;base64,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';
images[':wink:'] = 	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOfoAOjoAOTjAOTkAOPjAODhAODgANzbANrbANvbANjYANTTANTUANHSANLSANHRAM/OAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALy7ALi5ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+uAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKOiAKKiAKChAKCgAJydAJycAJqbAJuaAJubAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAAPAA8AAAergFOCggCFhYOIU4UjHBUQCoeIADQtJRsUDwsGAwCDAD43LiYfGBEMBwQCnYpBAC8nIAAThQgFnQBJQzyGHhmFDQmQAEtGPzgwKSIdGRIREA6FTEhDPTMuKCEeGhcWFYVOS0dBOzIuKyMgHx0chVFNAEVCOjMwLCoAJSS3UEzwQDw4YgBw0WIVACn8DBXKYaPGKkUImyxBQmSIkB8PCQGI8oTJEiWREilSmCgQADs=';
images[':zzz:'] = 	'data:image/gif;base64,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';
images[':))'] = 	'data:image/gif;base64,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w8UAxsgAzM0A09QA2t4B4eMA6+0B7vEA8vQA+vsA+/0B/v8AgACAgACABrlAn3BILBqPyKRyyWyCIijV6dD0JVa9bA/XcSwXMa0YNVJqejMMTvXJ7ibJAq7HAtguA142BkFasi12FwR6PTpURyiAgoRaG0gwczgvPDUyWmtIGx5inRsZSB1/nVk5ExxIHBMspD0cFx5IGTQEKjdaNRsGNhhIBTo0FgYZGxYEHDsyfZpZNy4vMTlZFUpgrSkiSwgtYjoaDU0PEiksKBQkVUImJent7u/pDAIKCgzpCgD5AAEh8P5KQQAh+QQJCAA+ACwAAAAAFQAdAIUDAwQLCwsXFxcfIBAoKQQvMAMxMgE3OAc6OwApKRciIiIuLyMqKiovLzgyMjU6Ojc/Pz0/QANDRANNTgNFRglUVQBaXABWVwlERRFaWxReYABnaABzdQB4eQB1dglCQjpMTDg3N0FISEdJSVBSU1JTU11ZWWRmZm6JiwCPkQCTlQGVmAGanACenwifoACjpAKvsQCyswO6vQC/wQDHyQDO0QDU1QDb3QHd4ADj5QDt7gDz9QD3+QD+/wCAAICAAIAGyECfcEgsGo/IpHLJbDqf0Kiw9PlATM4SAUWzzToDpoij65nNt8pycm73doYkIdejXXQqz1nGQGrMLgA3FgRtEkcPMmYvghYFbSklRgc8ZiyNhWc0H0YUOmU4KD0yLmc6NZxFEywcbm0bLyBGGCsWrmY8qyJGJCkRiq4oFSgnRxU1Bip0ZjYbCDeHRws1NRUGGxsVBa0sI0kGOz05MDEy4TUJSwjAZyzpTA4ZLzEtGbtPDQ4hTwwCAP//AvRZAkEBwH8C7klZmCQIACH+UEFuaW1hdGlvbiBieSBDYW1pbGxhIEVyaWtzc29uDQptaWxsYW5AbWlsbGFuLm5ldA0KaHR0cDovL3d3dy5taWxsYW4ubmV0LgFVU1NQQ01UACH/C1BJQU5ZR0lGMi4w/zFzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcMXMuZ2lmATJzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcMnMuZ2lmATNzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcM3MuZ2lmATRzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNHMuZ2lmAUltYWdlIGZyb20gY2xpcGJvYXJkATVzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNXMuZ2lmATZzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNnMuZ2lmAVI3cy5naWYCQzpcTXkgRG9jdW1lbnRzXHNtaWxleXMyXDdzLmdpZgFJbWFnZSBmcm9tIGNsaXBib2FyZAFJbWFnZSBmcm9tIGNsaXBib2FyZAEBADs=';
images[':love:'] = 	'data:image/gif;base64,R0lGODlhGwAcAJH/AP//AP8AAAAAAP///yH/C0FET0JFOklSMS4wAt7tACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgADACwAAAAAGwAcAAACR5yPqcvtD6OctNqLs968OwGCGAiUpUgJ5npOKssK0kuedPQCtZ7LTw5b+T5B2LABLOogtOCNeYq1cKbQ7vhTYplJlMW69SgKACH5BAUUAAMALAAABwAWABUAAAJW3HSmyyvxUJvmhQvptFhqxnmVQIpOppDAupKbsyosYILAxNZVLtN8I2iBVDTgbeBDxpRF2IdpCj5/qaOGuksuckKbFtr1Ng/EsQ0X3iyZZkq5pXOXagUAIfkEBTIAAwAsCgAFABEADAAAAiKcjyKj6CZCiPMdKvOyOFfLeB8YShsJjSi0tu7rAAcgyGQBACH5BAVQAAMALAUAAAALAAsAAAIcnGWDqYHiEgyOxmmzwJnurjXgIlrkYTJSpEpqAQA7';
images[':bier:'] = 	'data:image/gif;base64,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';
images[':xx'] = 	'data:image/gif;base64,R0lGODlhGQAUALMMAAAAAMYhAMbn//9CAP9rIf+EQv+UY/+thP/Wxv/nAP//hP///////wAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAMACwAAAAAGQAUAAAEi5DJSSsFONttQSlDAHCk5IViSWaaunkFkFbs+IKybQJETwyYTig34X0+PiCtZiIUDIYPpqcsfoamJzS6WPCq2QHWuDV0uxgwAJUyagtn70LNdB/h55/Os2737khJe0BjPnc9aWoiATM8Pj6OQUVMDGuPj2I6lVczlWKYmTQgWJNippIXbJo7LR01EQAAIfkECRQADAAsAAAAABkAFAAABI6QyUkrBTjbbUEpQwBwpOSFYklmmrp5BZBW7PiCsm3C34B1odzEcygePjhazVQ4IBBFTE/HgAVNzid0sThRT1eiFsHlYnxDVIqYPZS7C/SOVW0ai4vjdBgLf+5FMXQmPn5/RjECZhciATM8SDFmX0tVA5Efg3wgM5aXSAOhVHWhnVUAoak/NGqjpy0dNREAACH5BAkKAAwALAAAAAAZABQAAASOkMlJKwU4221BKUMAcKTkheKUYSWzsu73DfDmFUDqHbxMc6fcCMBD8A5BW0i4QziPycoLUzg4Ea+fdCZqXo+z0QW03FmNSKpWhepWj0iBXHOZfqDyhV48BixjeHp7HTR/NzxTfCoiASkxHwACgguKJi8mAzKJWyCOLgOZPqCVJ38qfqCjlZ+Nnqd0HS8RAAAh+QQJCgAMACwAAAAAGQAUAAAElpDJSSsFONttQSlDAHCk5IViNU6ammEXu1qKVwApa7qA4p+42UqI+Xx+oaBOZjw4jy9Y5+OsPmuf5LSK6B4Ahx9Ieylwu4iwr4bKscznaq8WLVtfTg8WQDbBvwIAAoE3PXx8bgw2gAuCC40FPyIBiTY3j40CjWtRM36Xj46HWCCJigMfAKEvfgN9LK4DUiptnjKzPBkRAAAh+QQFCgAMACwAAAAAGQAUAAAEkZDJSSsFONttQSlDAHCk5IViWSVTpqlSIpsfkMJYgjGnPZKZz2eACfk4GOFhOXTtOp+llEkc3i4FKWKrO4BOxopHy5V5iagrbbo9JA49J3bqWvYKgHAraxcABH54eYN6NFl/C4iJXz4Bah41C5KICQNETj97eJKJAjI6PFaZJgORiTk/YGqklk9iaaMtLx1OEQAAOw==';
images[':8))'] = 	'data:image/gif;base64,R0lGODlhEAAQAPcWAAAAAAAAMQAAYwAxMQAxYzEAMTExADExMTExYzFjY2NjAGNjY2NjnGNjzmOcnGOczpyczpzOzsaM/87Ozv//zv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAWACwAAAAAEAAQAAAIigAtCBwIoCCAgQgJApDAUELBhAINNJzoEOGEABQpHhQ4oOCBBgURACDAAIJIgR4PLABgQAGABQsiOAhgYSGAAAc6MgSAYIFIhwsNGJxYsGHRjEiLClXAtKkCCQV21pQgtEKEChUmVBDA0ADKhgUgVKDw4ABYgg0NqJUoFeHCpBBrvt05IK7ChwkDAgAh+QQFBQAWACwKAAQABAAGAAAIFQAFLLCQwEIFCwwsKFwoYKFDCwoCAgAh+QQFBQAWACwCAAEADQAKAAAIMAAtCBxIEADBgwgNIrRQ4SACBgIPCGyIYAHBABMbVqigEOGBhgsJggxJsmRJBQIDAgAh+QQJCgAWACwCAAEADgAJAAAILgAtCBxIsALBgwUHBkA40CDBAw0QVqgA4GBFhw0xHkRgYSJDggA0fuw4MqHAgAAAIfkEBQUAFgAsAgABAA4ACgAACGAALVgAAECCQQkEBSo0cLAhQoUFHRqs8HAgAAQMCB4AIKACBAQLBh44sCCAAQUVUqYEMDDAgQERARyogKAgAAMEIxoEUEHATolAbwJQQLSoAgkFjhbEWSFCygk9DRqwEBAAIfkEBQUAFgAsAgADAA0ACAAACCsAA1gYSHCghIIWDjQYiGDgAgsJEAIYCOBhBAYCETJ8qFFix48gQyJUMDAgACH5BAUKABYALAoABAAEAAIAAAgMAAkwsIDAwgILDgICADs=';
images[':puke:'] = 	'data:image/gif;base64,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';
images['>:)'] = 	'data:image/gif;base64,R0lGODlhDwAPAMQRAEVFRf/qAAAAAP/OAP6dAP/9E/+0AP8AAP/////+k//JAP//x/4qAJaWljMzM/5tA///6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AAAVrIABEpGiSkcmY0JIkgyo+RLEURaAPA/GINUBORwT0AA1AoiAg6pqx5C0gaD6bCoJoKThUqV2BwrClHg7Es5gsvBK/Y9Eg4HASHdmRscrvx0o8AgiDgwJHKEYxfEZaKCUABpEGWiOOiCaVKCEAOw==';
images[':clap:'] = 	'data:image/gif;base64,R0lGODlhGQAbALMAAAAAAP//Qv///////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDwACACwAAAAAGQAbAAAEaVDISau1ANwt8wRBoHEVKHbhSH4pKqpk1grmzNUnHdobrpqwGw+4csGIRSQrR8t4jJiWbPfSMZciqhYYdKVqUx5lygV+hdr0NarextpuNG6nvIC39BXYCU7CxT1wXTdzT0VjfIeKi4wSEQAh+QQJDAACACwAAAAAGQAbAAAEZlDISau9OOutAeCXJwBB8IETaaonOpZeuYIxrMotdsMvz90nlksoIW6MvVwGyfSIUj6oabSbIYs4mRaGC2lrq6+OZSPPdNt01KveKivV9ptidq8tQPsdj3MCf21dgHJDVU8uVE4aEQAh+QQJDwACACwAAAAAGQAbAAAEaVDISau1ANwt8wRBoHEVKHbhSH4pKqpk1grmzNUnHdobrpqwGw+4csGIRSQrR8t4jJiWbPfSMZciqhYYdKVqUx5lygV+hdr0NarextpuNG6nvIC39BXYCU7CxT1wXTdzT0VjfIeKi4wSEQAh+QQJCgACACwAAAAAGQAbAAAEa1DIOQGol+otQAiXB3KkmHXfSUoiGLZq+aXoHG+mhZkrL48cz00jlA0pxSCwY9GxlsSRZZYKQZEpqtaHo06r3pKpOqb9tOjjE51e1djhXjZtPrfm1y75m9fD+35tbkh3LoNBTWqHi4yNjhsRADs=';
images[':schimpf:'] = 'data:image/gif;base64,R0lGODlhFgATALMAAAAAALWUAMalANa1AOe9AO/GAP/WEP/eIf/eOf/nUv/nY//ve//3rf/31v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJGQAAACwAAAAAFgATAAAEihDISau1L+fLs1pKcmzc9DhNw4DIYTwlcDpPuoiPUcBdg2aLjI7AwygYKcYKYTAMBoEi5fFhAHGPgSB6eSQUiozo9RBspSaEWu0iaLdc2fRAbxYIZnOA+4hLcjoFT3l7PH1SOXcDGnBxhxUPgnp7hSaVU32UUYaHj5AaRYdRlzF/mhqlU6epqqQRAAAh+QQFGQAAACwAAAAAFgATAAAEjRDISau1L+fLs1pKcmzc9DhNw4DIYTwlcDpPuoiPUcBdg2aLjI7AwygYKcYKYTAMBoEi5fFhAHGPgSB6eSQUiozo9RBspSaEWu0iaLfcqexAbxYIZnMgLnlwczoFT3l7aH4wOXcDGnB8MoV9gnp7kCaHU36UUUUZUY59GlKHniQxfZSdaDGZlaYmqBIRAAAh/hqpIDIwMDEgYnkgd3d3LnNwYXNzY2hhdC5kZQA7';
images['*:('] = 	'data:image/gif;base64,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';

images['Almería'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAY2SURBVEiJtZZrcFRnHcZ/7zl7ze6SBJIGSGKMJBCJ5dKOE7VMaYfSQVqGwQ/qeKkdlQ/SqfWCjk4bywe1avACAsVKrUMLlUK1tGJBmsG2JqEkNCEJl2wgCSSbze5m77ezZ/ec1w8NLcE08sUz886cOfM+v/O8//f2CCkl/6/HcqsdWxcIx+KHuMM00Gu2y65b0YhbcR7Y0bChqKap2VrZVCfNgqFffbtH851trvju0OlZhVLKWdtYS90DyePfM83UhDS1hDRzSWlEh2Ty6DdTI09VrphNOyt4Zxlq5MDGXjPhk1JKmW37lcye3iGllLLgOyMDf7z7yGx65foIgkPtvLVIKI8JIR4TQlQIQeVnqLOUVDcIz0KQJmrFctSKZe+9lzVgK6levscunJuFEC1CiF8KIXq2FqvBzqem1zz6woM7VZtjlSjy5IUAM5s1TYfVbRVFjdaae4Q08iAEGDoyl0QaGkbCq0mLPC8QBTMWE9IwAWkrFMyWeV957eD7qyWXmqyft+ZHK4V9GTIdRa2cj95/EeuiOoTLjlCs5C69guKYi7VuPRQ0cj39jsLQlTvxuHGtXYMQCtq7z5A6f7wG+KAsWU0Pq54y9P4xtO5hlDmVJA68jhkzUdwLEM5SHDKITU6ieBaglNYS3vZ70qf6SR46ReTJPSglNQj7HJKpZHwaXBrGpJmNQ5GV/NUhcr19GPEIOOyAAZf28OtD4xx4/ih49yABI53AUluJUjEXrbcHADOvEU/rcbhhE2k5bTwXC+FY/QAFTSPdeQ73tx5BqV4Ag8+w68/n2PonO8K2kFLbS6x/uAjn5kfR+ntRK6ope/KnFIBcMsK1YDrQdCN8NJz3zfefx/WRTtwrVJSVVUACvLvZvquDH+y3gV1HZgUb/lDD4ew+PveNTch1dyCkiRH5K2rIIBsb1/wZ5/g05/5k4XLQP2oe3HdKKSu2EonGcagmXRcCHLtUxYK6PMUlDtxOG4GQxu+8NVzY1UMmexo9b6IqKko6zOb7lGBAd/qmwcf9gcvZdMLf6rVUbv32Fxg762U4EGPfmyf418tfJ5FIo+sGpmHyxr8v8PAXV3Py9DXiEzFcLjtO5xyO7P0tW9ZGBn9+2Bv/2Y3wx/+uh9evCvStXWpWeq+GyKQTFHtUPr9pJa3tg1hVlcl4mttKXEQSOi+f6CGdzuF2WHGpAr2Q5cur7eQy8Y7re+d9uJSSE0+sOHnnwu51Z99so7yQwVNayuJ5KpPeMFJAqaOIoqyF+e4c4aEMxaUlKHlJ2pfEkCpNtYK2y3pb3UwH1yP3li7r3rkuO9Z3Ql7r+oc888l62bXqE3K076T0tR+VvQ1Vsu/+T8uJ0S45fOw5+c6SMtm9YZX0DbRJ35mD8p1f3DW0uNxS+l9nC8DuU9H+wLjv7XA8Q9yxhMnBFKHBFJp7KRfDVl70h/hnKMx4roy05aMEByYJjeSIFS0lGJrE5/MdGwjmo9d50+BSSvPClbHnMwPH0VMxDKvAWuLmXOdpXt/3KNo9c/FXRXj2Jw8RCE4gLEUYNhU9OkrK22q0XwwevJE3DQ7wxOHoa9HRvkFtuJOCVNFVO1c6XsGhBXFJKx6rC1esn+72VhSnk4LiQBt+i9DYQOv2NzJnZoWnpYxd9gefTnmPoxckeWli5DXGEyYWBZJZA1/cxCjoFFDQ01GSgyfpGIzukFIas8IBfnx4bH8y7x8QtTYKGY3yxjVYnR6yooDFmqOhfhG1tzeRyuiIRSYT4bG/tbwaOHEzZ0Z4KpwNd48ntlnunkfGLqhfvJTGz36fxNkE9pCL+k3NzHF4MOvnYK7whF/t8G+72TV8yO0vhAA4snvLx9fd9mDV15J6jiU1tRT7BcLmpqRsIVokiHVtORfHws2HT/l6hRDcfNnP6HyqU6HlL0OPRzXfu9rFl0gkkqQF5FSFdGCE7PARxtLJvc3PDTwrhFBmShEfGi2m3Iv7l5ffvqlp7iFXycca4vt7UctL8GxcSGBk8MWtL4xsARJSSnNGxmy5ZeoHyr2NZY0bP1X2tMvqvktIg0g2deCH+we/A0RnqvW0EsyaPUDw3txUb/vq0r3NX2r4DVA69W1W7S0lrqkR2PhgAeSllPn/pfsPFaK2Wr/vqvEAAAAASUVORK5CYII=';
images['Atlético'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAW0SURBVEiJtZZ9jFTVGcZ/Z+7MzuwsLGU7EOnajR8gWglWRBrS2qBNozUK2qRNUGmXTQuJacPa72xKP2JqsZWY0mDW0MZiVqKtNE21+IGguFrKVsHlY5FFRdxSCrvMzM7MnZlz7rnn7R/3LuxugyRtepKbnJN773Oe8z7Pe95XiQj/r5EEeH7z56bdsnTnl2hEoVFkgBSQGPdlGZj6oVgCqBP7E0da54e7AJSIUM5Pv/qvL7YdfP2NT5HNBgTGIQIignOglCOdbqBSriMOnBNEBGNCMo0eXgLeL6ZZ0nqUlR1/6/FmuxVnmWdUsWHfgetZuKSbXEuZ3h0fYHSIX9KcGamSa01z653zefDHLzP0TglrQ7Cw7/gxHvjZ7dRUir0bfs0Dn3gbfyWqeXxYqgWS6YzhvcGDNMxVLFiUwQQGXU9yZiTEOsvhA/188vokV85rJpVKsPnRN5lCnUc2/oEb75jPa9e8RYsUOB56iQngTiEiyg0drSQ+NitL65wTnH5/gMZsCys6lpFpaCQMHZ4XifCd7/2eU8MlajRwzeU5HvrpbbQsexRdAFyklFIqmky/mKoTqRkT4FcC9g8eYmBwkIGBfqr1OkAMLNx9Tzfrf7mTGtO56ZKAvzy7ipm5qVAxoCYIrCIqCVAKVSlr/Eqd5be1s2ThTXx0ShthPYisIELnmqe4ak4rbZdewRL28+fcS0xrboqhYsuMc/aY2ZQClR/xOX26xEeamxDfsqVnC8VSEYDVq59g44bdBM7j5jsu4U9X76VptIADXOzDyRmTABCDGB3KdZ9pZcZFGQr5GhflWpg7dzZ9fb10dT3Lpk29WNI8t+Mg639yM9PSGepWYazFCATOYQE3bockABWUc1a1XTEFT2qcHDpOIT/M8i9+gbX3/53de94Ccnz+sgrbdt6LNGQpVQwKAWMgCUoEw8SwR8pmkITnseHBXTy/7QgzZuX47NJl9PYFjObTQJLFvM3W5pewwKhfJVBgRDDaYLTGOEegIJzM3BmUDR22GhJoRyab4p4V3ZSLlvu+ewPdW/axdXgbruRzxrcocZFyAmgNoUOJECpQk8FtgApDwRiNtR7f+ObjbHniTVKNU6kFPn/sWUnyls3kjUIZHQG7WEajo0CLi0SdDB4E4JxIrVZnzyv/YqTqAy0syuXZ+PBqEimPM74hoSRiOjZEwASRXZzEsT9rGkkCeApQTg0VT9BEnYA0iznCb1o+IJlpoFCsROI5IgGRmH0sqHMIQtJCyuFNYD5awpXLVnV13ciuV/oo2QSPFA4hFUXeNyil4vOOYz52fq0hDBHnwEIqkGr0WkgopZTvcyw3c+Ro354jtH48R/fDS0ngUbBgjSYIAgKBQITABATGRHMRgsAQBAH1spCaB8Nt8lyUldHdoi5fRG3WrKF1185/WlZ2fJp0ppl8VWMRjAkwxkS2g2g+thaHMRZdTqJucNh2Xu18Rl5USnkiQkJEHJDpuJen51zc/5X6yA9GRvP7sSaLDgVtNFprtLjoGVs7hw6T6LojrGwif9fQ42sGubtvNbWJGQoaaFr1bbYuuOr197666p2HZl9bW+wdmoHVDpUIzl0eJo65TqCmGKjcX/zn8e0/bO+kh3PXTHg2QyWq0lXA23uYA2vuO7V854LSbwu3a6gU0SZ5jrkOMaMe5rok5Y6Tb7ywe/vS9k5+F2d+HdBjRf9sCY7D4wMWKK5fx/d7/H90Hnv3RyNSP4Q1WYxNYrWmXn6MU7ee3NR1mC//6hf0xzhlEQnGdxNqcmuhlIKo9mcBaZ3JovZVuZ/P7bULkyez+N+6bPjdgdfWrtvAkzFbA9RjchOxzte3KKU8oDEGyH39a6y9soV52/bRuWM7/bFeNcCcF+PDmiKlVAJIxydpoJEUNXwi0aoiEp735wuBxxsQg4+ltcRsL9iqXRB83CYq/v4/Yvs/g/83498BVTlXiuRUWwAAAABJRU5ErkJggg==';
images['Athletic'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAYISURBVEiJtdZbbBxXHcfx74xnL7bX601s79qNa9cXhZI64FCahj7EpmoofSiCQqSgSkSCqkCEoLSNBOoTooGXIqA80FDFfihtU9Vx0iTYdQUSie1WNXWI7cS3tbu7dn3biy+z65md6+EhxqRuXPqSI52XM+d8/n/9NJozkhCC2zXk2yYDCkCRV64KlIYO+Lw+06MokuM6gMBxXGRZJhAIoBQo2I6DXFBAXtdxXYeqO+4glUxhmgY+n5/y8nKh65o/OjU1kc3p1xSAxt2fb3n+xIm2mppae01dw+vxoHg8yJKE4zqsrq5iGhaFhX6EECiKgs/vJxGPU1NTQ4GiYJkmyVQKr0dRznSceQ14QgEIlobCDQ2NhR6vh7LyMjRNJ51OEYlEsCwb1xEURYpYWFxgbXWFrz74EOPjY3i9XtKpNLuqdzEZi/Huu/001DdQEa4Ibsai6ZpiOzbhUBiBIJfL4ff5GB8bQ7gCJNhVeSdlJUGS83P0XvonXq+PxYV5NE1jJp2iIhTim996DJ/XR2dnx/8yt21bKikJUhEOk0wu8e/hYTxeL4btYOXz6IbB0GwfV0em0Q0vDeU1SJJDUVExKVVl+qWTPHfiNzz08NcBOH36NWkTdx1Hc2wbAMu08BUVEyivQFlIoO3cwfq6yqnuUa5MJQlKEo/tuxe7upHJ+DQNms6Tc3M4+TwArisAyd58FW3bVlVVxTQNcuvrGLqGNZ9Anp3GWs+iOhCQIwQKvBy4p5lsaQUD5zq5Ox7nlz97imJFJqGtk9N1ZhJxclk1s4lnMpmU4zpcvHCRZDpNZG2J8qmreFyLTG6dFTXHg01f4ODd+9i/p4mJvj4Ov/JXvlsSBI+HNa+XQKSS48ef4fr1EQzDWNzE05nludj0tFZWUYa/sJC8prO6vMxcKoPvSi81Vy/h11VWV5axolGOP/44ewtkll0XjDzZYCnsCLF3zx7UbJZ4YmZ2EwdmP5qfW2w52Mq+5mZUTyGZ+QVC8x8iRapYqd1N4towR8518NPyCkrr6kg5LpbjYmg685EqmvZ9iWPHfkJxUbHzweCVqU1cCKFGJyfHVFVFkWW8ZWGiyMzeWc9odSMx2cejLYd41LRQhUtO17EAS7hkdI188xcpC4WwLItoNLoATN7cOT1v9/w9FouRNwwa6uroDjfyor+S9C+e46jXz5dbW1kE8q6L5ThYG4ejhsnOgweRDYPk0hL/Gnj/AyFE6mN4fGb2H++/956W13VqGhppxuXwTIxjySQFCNJraze6dRxMy8YCXCEYmZxgd9NeLMNgdGyU7u6e8/81b/4qXuvq+tulVCqJYZo8cugQtZVVGBJkTQvTMrEA07ExTRNZkRkZGsIyDCojEfL5PH2XLy+ouVzPJ3AhhDh/4eKp/r5+bNvmnj1NDE9PkRQghMAyrRud2w6WZSGQGEgkuO++/RiGQTQ6ydmzZ98QQszfqnMEdJ07d7ZveXkZV9do+f4T9BYXIWkapnUDN20br2HQbzs0PvMsVcEgtm3T3dW1MnJ99OTN3sdxIfS3zl848U5Pj4skUVFSgnz0KAO6hk8ITEApkJldWSH68NeQ/D60bJbh4SFeffWVPwkhxrfFJUkCeKe9ve0v8XiM0eFhLL+fVDjMYO9lAorCQjxO/1SUB44cYWZigqXkEqdff31wZnb+RbaMrZ0DuGPjE78+9fLLQz6/n9lEgrsilUTTaQZtm8HMMuHSUkYGB6mqrqan5231zY4zTwshMltxZeuCEAJJkubf7Djzo5KS4Fstra3hxFSUz+2/n2ggQH1jI/FoFEe4WIbByT+/dBzolSRJEltu++0uaAkYaGtv/8H42NhKXV098ekp7j3wABc6O9m5s4zamlp+98ILv8qua+3AJ2A2Fm+tS5K8UeQbP/7hk2131deHkktLWJZFJBKhra3tt9Mfxp4HDCGEc0tECLHtBAo2onvk8He+/dEf//B78fTPn8pXRSqeBQoB5VPPf9rDjQLyRoEDX7l/f/eOUPB7gOf/wUKI7WPZEpEE+DZQGzC3jeKzZL5Nkc0oP9P+2/mv+B/hCHYY7uK5YAAAAABJRU5ErkJggg==';
images['Barcelona'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAVuSURBVEiJ7ZZbbFzVFYa/PefMeG72eGyPHSdM43Fsx2AUK6IB18RRkUVLIE0FASmRKqWX0Eht1UppkVBfWtGqtEBbtVRCLQ9IFUovgIA0TdpcSICAk9A4Dsi52AnGl9iOb+MZz8w5c26rD8ZNJgl946XqkvbL3trf+fWv/6xzlIjwaZXvUyP/78KVUvrme6LfUko1Xn/W3ZX8cvfnGjb/1/tLDW2Mq+iuH2z5TVVtynrv5OmBlbWyrPX2VFdqdced48MXLp48+vKL5waNnuAtDeUd7c33J8snHnbtLGlTO/LhuH3SmqfYnOSO8yO5t37y3IXnReQq/DNx1f76a7/qa2q7l9xCFr3MTyjtofouY7dUkY6kmZ0aJpCZxbX6COw9RuBuh/nJevx1AdyYSzQe40Sv/f72H/a2i8hVW0bScub11/b9STyhPtVJYvk6/FMu7pnTRLxKUrc9SMPnH2FZzwGazu8lGbBZ6Tk0Z0Zp7LtElX+QkRmLv+yd/cWSYP1aj17d3/PnrdtObw3NBhSGiT10Edc0Kfb+Cy+dxVJv4S/0IdEQjubDEg8CGj5HMOYqmMoFRva9O3xoiVcCf/9C/oPp6ZHsisMTMXdoAk/3oZRg/PMQmQM/pbBmguruMPisksZ54mEXyygU3XERmfqktOSNhRlHmpooW9+BCpbhfDSKLxYjvOV+tM0P4BTdm6QK/LqH5lPq2v0S5Z3NpCpjsXjFxi2LG7MLZH/3B6qe/jna9x6lyAnUzj0Eq3RcfPiUi08UmifE4jnCjtyilC8q4uVugG+6r3lrIBjzXRo8g/hdinP95JMeA2MfUDvwJheHe6jUIoRMDRsf4UIQB9B1yGYdYiFvxaauleuBf5TAO9fE7/jtExu/2bJ8ktzMM4idJvFQnh/NJSiMvcRXew6yf88M27/Szrt9GQ4MzfD4hhSr10coWi5xE6orYH6TPKGUOiYiOX3RM3X7i09t+Ntn19aFcWcI1xQw3SLBSIgq3eY725Zj637iq1ySST8fXjCpII+rW1SviOMsmOieDaK4t6Ny3fe3Nz8LfG1J+aUjx0d/vyoV//HB/iB2JktXbpwYDloxwQvHa0kZGeqPZjg+pDgSreOKXsPYgTynDg9w0RflVDBBQ41HSyKd6T07vxsAEUFE6GjR7nz+ZxuEtp1C49flKLUySUAequsW1jwmd1V/Qd7WwvKyLyGs3iGs2yXPld0qc+jyZFmbsOq7svqebfLK021DQERErnqu9LDpZ8GNRHKa6BpSrmEZfvwRD7Q0NQ2XOFwdRLkurdP9nJe1UAH2nB9/JRCxqI0VCGiL0S/Jec/ZhWFlGROpuIFZBFsEWwkFV6NWjbC5bgrN00mENDZWDEAxg4XCQnBFwPRoXWaQyRYHAaMELiKZ0cnCwQfbZ/AMB1vAQuEhiHhMG1AeUGQtwfMEcHEEbMBwfKiQwd0rZ9lzbH730mwpeUOf2X3llytC03M7uiaYzXt4tocfi2mnnhPpamZNCx8ub+abQIugPAfL9TBMi8e+NMbk+Nzbfz0089ISrwSezpj9v/7j5R1rGiYm9UermUxFMEwHnCCXh5O0vFEgdFDRl26Agk3W9fhobTXrdgWpNkf7H3926Nsikv9PH6/9+qvF0aABd+38RuOutvrwFx3THz2biVCXLdJ1ZZpcwM++ujqqYh63xgsYATd/6lzm1Rd2jzwJnFt0WG6EX/MAHYii62sf6KzsbK3Xm+L1kY7OzkRret7mbO/UUcNwx06PuIP7j0y/A957QF5ESqfaUs6vXx+XDpQBYeC2rRuTf+/uqH0KqAGiH5/pSyKvXzco/6RSSulAOeAAhRtU3uzO//+4blb/BnKGsg8nABUrAAAAAElFTkSuQmCC';
images['Deportivo'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAZnSURBVEiJtdZtbFPXGQfw/7n3+vr6JXb8Gtt5A4eEktF2TRmhK2ztVqaiIqDqGNPKQKzsPRLal2mjE6VfNti0rRPqRlehajC6RmuzTW1R2TqaBbawriE1AhInjbGT2Nhx/O7r6/t69qFp1BRaZVJ3Pt77PL/76Og+5zyEUor/12L+l+DH9/V0P7Hndu/Hjm94fE/IbPMdqblCfeTIoYbl5JCP2pav9W1b7zG0hzXKd20oTD9wzRl0+JUKiG7EJhrcg1XGHM2x+uk/PTWQvFU+92Hwvu9su/9zxfQZhWOEtMWCe3IZjDm9WFUqwaeI4ZzFHH4wF8ekzbn/zu99/d7IL5/NLhs3KepdDk0RGmsyZIZFxOlFRyWPPM+hYnKiqV5DU13EjGDvNIvFZgDLxxvLhXraakOZ5bAinwNMJnglGQbLAJqGJqmGq043KhxTdSenqsveFkIIvrLW1U9b/es/7XXsVbpWg2sOU1UQiEWwQZtPw1IuovLONeWt2My3hXxu+iPxg499ah3LsI+U5xK/ppTOAMj9+LtbU56HdiLUvZ5aOJ5qqgKWYcGYTDRXnCO5cwN649Bw5vmhhHLLIt/7W449uW93z6Ztp3iro5CfGT+pUcbVc++W3S5fgBQys7DanaiW85DEMvLZJFRVhWBzELGclzMzU4d37v/RkQ+tnLX6xfZVa8HYfK5AoPWAYDaDF6zI3ZimNbFMGJaFYLWjUirAYnejmplBMv4f6nD7zd7m8E9OH3/S8ei3njj4fnyxiSRJZKmmQjAk2OwO2J0+VEoFqJpCOJMZ+WwGo8N/TUVGz52Nx8ajFksDAm23ERAWcr2GQEv4h8ePHth1y8o5zgS5XofZqsLQdNTECjgTD0WR4G0Kov83f8CJIydd7mZqszdrp1Z0tLvv3/zw3uYVazzTkxEKSkhreM1Pv7ix5cyLF2YrS3BVU2GAAmBQrcyDEIKCrAIcj7DTh6nxCYgVk0VLMBt37Nm6ccOD940M/+2lpGFojb5QmM2kYlRXlbbNO3Z9GcCzS3CxXKRyXUKtWoKqqjDxZjTYeYwm5pCcGwCggeE4KIoMShis7Fpzt822D9l0gs5nYpDEHFbedjd0Km+5Ca+U5qHIdUhSDQCBIkt48bev4Z/nhqHqKliDYnUPhSqbceb03/H6wAUwDAXHCUTXNUhilbj9b6M5bOq98uam3sPHzv97ES/l0mylOI9GTxC6JuPKyJsYeO4sZImD1c6iq6cOhiFgWECslBEd4WHiAcMogxoAw7K4PpZC5F801Hk7f/HgY5tOLOKyVGXsjT6UC1lwgg35fBaUiGB5HjqlKOVM0BQOLAeoqgKGE8FwDDiWh2FQqHIVwZVOtHXaqzUl/auplPjHRdzhCer5bBKSKGIyehmCYME3Du2C29cGhtXw6u/PYOSNWVDo2PLoOty37fMo5fOYT8/QaiWPYGsXAm1BMj0VubS/79VDAOgi3t75SUOq1WFtDKG7xw2r1Ylk4go677gTTa0tGHx5GLV6HDxP4Qt54WsJXb0+MVJ0uBy993xhB+vyBDH+9nkkE6khSqmxpIl4wU7isTGkkzEIVicUVYbF5sLgK6cQG7sMTauh0S3NddxBXrlw/oVvHj7w1WNyXfN7mjo5lrNiNj5Jpqeu1QaHLvTf1ES1WgU+bxNURUY+m0LHJ3phGBSEYTEeeQurup2qt2X1sMnqvtpg9271eAMPUUqZqegIZhPjcLr8iL0TPX7u4uSVm3BNkSlhOLR33YVoZAjVcgF1SUR4TS8FQDxNbZymKts1pb6dsCx0TUMmOUVlqUosNgeZHLv0j58/3X/06NP9eO8wXMR5sw1itWDEJyIXo+NjbzhswvaO7nVrZVki8YlLaPSEiMsbRKmQRSYVA2+2osHpJnaHCzdm42ef+sUzfRqQu+XZwvOCtViYjx34wc++BKAccDEv7N1N+vz+wE5d09yqUkcuMwuxWoTD6QVhOdTEavxyJPLc8d/9+QSAOQD6+y/8RZxSw0RATAtBRrpgTBw99vz3V7d7Tm5+4LOfseYLa80810wBTVVpIpWKj770l8HzNRVTAFRKqYoPrEX8+mTkBgHzDACNvvt5nRCiRxO5keiJgVEAPAAzAAqgDkAFYCzEGx+EgYWbiBACAKaFBJZSqi8Jevc9A4AsPDLoMubAJUMRIQQf5+z4XyZ4EFLIFpQyAAAAAElFTkSuQmCC';
images['Espanyol'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAXwSURBVEiJlZV7cJTVGYef8327m+tu7ksSbkEkxhIgpB0KBNOGS9pyiXREjaNT6KRkhNLWeBmwMhWH2im1QhGppakxUyvMGHE6EzqllGIVO8EGgjYRjSbkft8k7G72kt1vv7f/aAaERTwzZ85f73N+7+WcnxIRbmn9S9l8YeuKhMnwW9x9a0HarZHh43bsyln28K2CARCRm24QvKft633/u/eo0XtEAs2rDnlPxZZ8WZyIoKKVxVOvFcTetunXxM6xa2QvV2oOKikWc6APtEumqJ4GCV4e97Y1/jTtXum4EcMSLSNL1oo9WviB7yi7nciowhw0sBW48J/RiV04SzONlCK5kkLMrMEeYPtXghOTmWGOOlBaEHSQyRBE/Ih/ErGMY3zsA48iMicuMxoiakNdI90X9IxRIkM2dPskEvIhfj+a1YcWP8FkcxjbnYMMDrj++5Xhhw+9VxPWP/DbZljRHUFilnlNHD4jvuyKWGMC2Iu8hDI6+nftHTsWjRG1oUqp2P6Wja/GpK/M6z11ps3d8Inb6PVr1rk2cRSmJ+YUkT/e3XQ6pyS4Q6JAotZcRIKvKXUiL/3sjKSc/HzntPmZlplinTznmZyoHxn6qK+//6Og5Z/RwFGVv6pU4orYnOrkLWvKY+/KQ3MqBA9a3Bimy4fpDRA80UagsVOCly1//DfWHRXSaXwp/A2lUpYWLDuZtLl8iZadgT6nk8mzg8Qrk1BrBLEOERi7hHVRLyouhokXbIT61MlzAaPsARkK3xTeOXfJCeeBynXWRTH4j3WhDAuO4iL+0xNmf10DWbrG07NCON6tI5TcQ/jbNibf1PE26dW50lf5xdpO7Ys47nf/5hkJvvO6TBz/pUxUvyLi8cn59mFZvul5yVv5tJy71CciIlVbXpRaZspYkV1GH3VKX2GmNJJdfDVvahTLldJTv7H0MdvC24kEuzD7k0nY8gMuDripqvoT+APUHd7KN+/MZtvjtRyoPUnDQ0+SkJyHivejpwt2ncduqPx1yBv52cMhY+hl8RzeLdLcKs1dLll9zz4p2vCstLYNiIjIj3f+WaBEyn/4goiI+PfXSv9durgeyZDOzKzROpzO65RP12PyNZVsDb7jIYYkPgxb2Ln7KBOBEEee20zu3Ey2P17L4X0v8/0HN3Cs5if0u7yU17fji2RgnFTImEp1xMm8z5lTc65ISBGHELnkZ3w4zJ6mvzHqusIfntvM/DumU/lINdUHa1m/qYw3/1LFsMvDytW/oLW1hz3hNOKyhzFnmlg7NOfnzCnlbhUJhUIBVIGXiTg3EhZ+v+9BCubPorKqmuqDNZSuL6W+bieDw6OsKNlF6wet7H/ibqYtDhFaFSZkE/rMiO86eJPh6fIPdRPOEFTvBfaumk3hgtvYVvUS1b+rYe3G7/GP+t0MDI7wrTVP8WlLM789+iTbF6cxPNCJzFcEDAm0YHRf19B8SD3rXNDdVVMmzdt1aS8pk4pdtQLLpXT9UyLil57efsld+COBZbL30HEJR8JyvnCpXLw/Vt4vzZDT8c7zqVitUy529VzWkPZ8w6I0eduRIY2ZiVKh58rqe54Vl+GXltZPZF5BhUCx/PzFv4rb75b31t4n7+br0nQgWRq+ni4vkVYV1eaWaPrsXZL6dlqemh33aBDjQASrczmW+x6iovYc71+8zBNbS9m2JJOOXx1ETbuAdXESxls6Y600VYbH14yIMRb1+W9VjrXrZtiOORaaDm2BYDT6CXabeLzp6PYEpqeaTLh6IMGClpKIJSuC++/awBue4MbXZOIa47gGrpRS6OhbI/YNxZptf1qJmWMGFbbvhqEJiAghXaEl6jCqMNo03J+qD89IYMcr+M4C5tVf8HXKlVIaGpZc0/a1ChJ2ZMWpdbEzyMQL+jwh0qFQKYKvResa0I3jzxjeI0HMDiAiImZU5ddkAFYgJhfLHcXEFWaj325FpUxiDvcTaT9F4EIvkTYgDIRvZBpRbe6zS3RAB9RnpwaYQAQQwPii2luG3yAbBcjNrO3q9X+P5WSj1GzzXwAAAABJRU5ErkJggg==';
images['Getafe'] = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAZDSURBVEiJ1ZZpbFzVFcf/9703q2fGmTfjJWPHNiaO7dgxHpAdSGwnJTuUQBISq1AF3EaQNkIVhdIPFCEhIGFT1bCoAgQICalChRYCTUCqkjQxNCRunHFmbMfxEtuz27O9N/OWefNuP9gK2YD0Ax96pfvp6vzO/5x7zrmXUErxYy3mRyP/L3AjR3a89OLef724b+/rhBD+uowopT+477hj01Mv7HtekCWJDg4G6CN7dvfduWl90w/ZffcBwMDc+uD6LXuODw4GaF5VaSgUpJFIhAaD0/SPr70zU968bb/nhpaG72Jw14qGEHJT27qH/9zR1Xlry40uLKrwIJvL4emn/oD29uXY9dDD4BfYXJ6a+kfSqdIek2fVXiV09PmrOFdWCyGL1my6v+fDOzeu5ikIghNDqF/I4u6t23Hg07+jsbEJiiTgmX2vYlxdgungLGRFgklPvP/K5BcP7rkEyFwONi1b373zoy13reWFrITxSBLhFJE0ak0ucDrRefsatLW3gyNEDkyIodFzs7osyABhoTKunY9Vrtl/TeWEEK5lVc83PTu7vVlZgZROwpCO6+6Fis/lIjP5INfZH/Cb3N4mGo2Fff7+c0dPTSV3WA3V5eEEASUEDM3Dmr+wVQie+BuAb3POOZY9sLLjNq+qqggmRCwSwlg7PQL3Bkurs05D7+YBvaPxBjwaPwwiSS23dS29iROjepF/jCJUSWA2QQcHhXU/21BCPh2K0wIzrxotbbfuLivhEYrOQhQF1V5IDapZiQTG0/jal4JVB9PnP4FqaxmpcpSTwxEfNrhWMgxPRkghdmpOYgEaMS+d5rzrLsm5paGiwuPN5mTMpEQYGPk0r6t9iUSG9L8bxpePnUfQPwoxlgGrE+iKBp3qoNk8KMuKnDT6BlPIUVAKSglUZsHmi3BLyeIWxmBkxyYjSKdSsOrMseI2mvA8aYK7LQf34ji4Zw3Y/noXZtMiFGh4YMkGHI6dQb2h0lKaDR+HLo+B6jCyDBjGsOwCIXNwwlkqy1wObOxsRl6VoeUxKCuiLGdncG7gAjJhFSaTCTFpBmkqQYSCf4f9KCq2wxc7zwpAiFBlGIKIFd5alPB2vo4jbgYAcpLKti2rQWV5MVzFRTirRBL+P50W+7f50ew2oHmpBeKjaRx8fAArqhuxxFYBX2YC2ys6YXMXQwTyVJbknp1r0bG8AUJKMBo5xjynXFfE3lNDiMSSUPMqTh/x5fWxQNLEECxZV4TVT7tgNuioLSvFQHQU46kg6hZU4OBIL5gCoWBhdLjdZbe01qLc7YDTWZTJyoXZuQsVx89nMhksWuiEzWpG1j/WZjcQhTIEeYkin9EhF/Ko46ugMRQUQCffjHE1Dg8cipstq03FMq2vvf0PHP0mgOlgOEgplebguuzrHxiK73riTZS67ahZfvN9B1MSSyjVMN/MJs6IgfAIqpzlKLHzODDRi011KzCZnRqb0fnt9Y21RU6HGcOjU9CE+LGL1aJTGh37T9+hxVU8TByDak9J3T/N9femC9KEBQAFBUsYJPMiGA1AQUcEGbg5syYEckS3un+95xcb0NO9CtHJKYlRRj+/rEOB4Ku9X/XtKHU7TD/7aTtGJ2NrnulLJQ5ZVJ23WRlVy6PJVY8vhDBsFOheupp+8MlnihItu50C9k8OfAWj2YjoiO8vlNLAZXBakE8SS83LZ84sfLLa48TK1hpIDQ/xj3/4Gf09FWBmJBCGwGBjIYaTiB1LIHnEan3id1tJMpHC2eEgjp84OQUu8tw1Ry4hxMHa69+qrmvZcd+WDiQzWViLXHjnvY9RK0yhqs6Jz/M5eCvqcWFUQWgsgqabb8TGn3jxxpt/TUizZ++nWubQxXmFy1emIAz/ZmqcZJ57YWLXXZu74G22IZnO4ZZf/RLB6TgKHx3Htp+vxdeOQZx32eEbmoQ/EBhhcuO/ZQrCl4QQXJy0Vz8WhAVgYy2l3UWu2t02h8sbCiVw7z0dSKZEhKJJeMp5nBueRCqTSqq5+MdaYnh/AQgAKNBLgFfB5x0w81FVAJYuI1/dqSpYzDvt9pyqFeSMEAFyJyGHjgA4AyBHKdWu4nzfp2g+Cg6AAYAVgAmADiAHQAKgXan2uuFXOCKY6wtKKdWvy+b/9jv3X4kpUR10dyLmAAAAAElFTkSuQmCC';
images['Málaga'] = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAXpSURBVEiJvZZ9bNXlFcc/v/ve29tf32ihFApUqhQWWVlYsNNRjWKDbnMyNNEAbvzhNnRh4Q/3IluWZUEzMWiyuWiDMTDZtBErrEPZFqHWFrtZ7Itw4RbuvW0pbe+9va+/e39vz7M/FAMqL1nCTvL8cZJzPs83J89zzlGklFwvc1w38v8F/tO181e/sKlhp6Io6uUC/7KxcuuRrXUdD5crDZeL2fnt4m89+0DNrgu+IqXk9e1rt61uve+ZROR0fyb8QWf/8dMflrm1iZSmqI31lV+pmbdwrVHbdGuyaLan+syhKNOhg8GzE90RKzAWywlPQ2l2ce0s9Y6K6tpW2zJz9+882RhKy6QipaTvpS2v++98/HvnlFKqZ4bxzZwBkcc2DdJOlbC/nmNyAZNpnYXeNMtmjlGSGWdhbog5zjwpdSne2uUo85pJ7N/Cvv3dtzzVI3tdiqI4g3/9Re2U4mdCdxJ1NxKra6Z0+iznvWUk8JK3BNg67mLJgKuejqrlfC3VzjZfnOGbNlCoWcmaBpW8gJxDUFvhqAd6XUA5Lm9pQrgon4mgWxbnyrxUJUZIF88lpi7AgYmmOEh5y9HSab5/ehffKcvjXP07vIE5dJ1JMD4WJrz3UUoSQdSKstkALqAob5neulgQ93QUyzJQ42HmxU7hcYUZrPNT0Apg5HHmMjya7GT9yq8SWbKBrpEYNwecNOe70F75LW877seTzPAN1zHnBbjmkrbuT4RJZXOYRoEac5wZQ1CZiXBruh2vM0fj3AKz/DEclVW8aLVwm3CxuKoE5dAThD54i47Kn7Diro0YL76GkIgL8FRBS6UptjF1HZ/UKZg2ViFPQJg0M07N10sxs3mmPIs5r9lEQ0cYLxIsOPJD9g1nadjcSaJnBLUwhlCyxPOOKQCHlNJKJiZHVWcezbYxhI0hBSnpxChkyQUKTCULDJrzGYr7GMmUs8ZzGHP3nQyX3UVb+RME3DYYGWYpKcqVFH3jIvrZJ0qEBj+MFjQ6/IvY41nEn3w30aM4cc8rw7voFlR3jvfOujF1g6b0QcTkSX4WewhlxSPMdibRczkKlsJ8xxRFVna6fUCcvFAWDvWc7ntsZQjbU0dMM1ilHeee+mpSSzbTFdHQJnRWVZygJvkeWS1BbuGvqIlXY82MISwL2zLQTIkdeZ9M1hyIpuXUZ/DdH8neTaPBkca6xTeoRpSmxib6K1oYH81ieQKsKPYQfHs/Z25cQ1+2nuX1TQTEMKY5F2mbgCQyOs602clIgo5LeouUMtc38PGbtxkDNH/zIcSy79IdOociHdx9vo1TB55i+9DdHPdvIlDbTF5LImwLyzSRto0m3NRm/o05GUzuGfQcuAQO0NYZfzkaDWm600vtrArW3xhgae9Wdu1p5/HJh0n56yi244hCEtsyEZaJaZoI20I3TNaX/oeppLlvcEIPfwF+Ii+HB4ZO7I0f20uw+00ibQ/w5LsWbWIjeJwgsliWhW2Z2KaFsG1s00THhzrdxyJ7JLujSz53cZd0Xew8fTi7Y0nNa+vC77xa+euJVlLFN4AjA0KAsLFtE4HEskxsy8ASkvRMAr37ZcJjheeDUyJ4Me+SYZHQRLhrcOI3RW7QXSpIDWwTbAHS/kS1ZWGZBlJYZIWPdc5/4oyPDG3/h/r7z/f3L0yine+rf5D59Fu/rPob5A0QfHqB/aliE2EZaPjRgodpcfTprw57tkiZTF4VLmVK/Pig67E6Jk79oPRfoDsACcJCWCa2aWDgo8QYRe1/jt6zxs/fCepHP8/5UjiArWdHd/c7H2nxB+Otvm4ouAH5yQvBzWg0woO8QWwm98dnu4xdX8a4LBzg3VO5nvaPXZvXqR9pt3t6QHdSwEupzFI3+AyRSLR9x9HqbfIKu4lytb3lvpsDD7Yutl/68/SykuycZraofycUGjnw9NGSDVKmUlfKvSoc4N6l/ntvb3C+ogsqJmcKe5/v9v9IylRWURSumC+lvKbT0uC7Y/Mq/5NA0bXmXJPy/9Wu68b1X7V6Y+IcnM59AAAAAElFTkSuQmCC';
images['Mallorca'] = 'data:image/png;base64,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';
images['Osasuna'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAXPSURBVEiJtZZbbBTXGYC/MzNer70XX9cXHBbHGGqQY2PiBkjSCgWIAm0qVYpSVahVQh8qxU1KFFVqGp6iIPWiJA11pTaV2iDiktKSRCmKcWhRVdJwKZiAgWDjy/q668vau97L7Nz29CE4cuw1jSr1l+Zhzpz5/n++OefXEVJK/l+hfNGJ+7YExPEf1j7/yuM12v8Mf7Ntjfv4/rsLFu6PPVPbAPDIlsJnTEc+WVOltd0e37gw5+39dxe82bbGvZQllmrp+MGaepcqfiugc3LePlnuVdunE87PClxiZ54qHrAceVY3ZVfAp/4kmnTaAn5tJ/Co6cjv720fvnXHyve2D/fPJu0u4BeawteAYJlXfUlTRXN+gdKSp4rmMo96EEFQU8UeAS/PpZy/LQXnrFwIwe5NvlWPby0+7FJFg2HJIYmcl1mmtHDWZ1UpCUUhIATF+ZpSazry1rHzse90fpwYX8pa9nOklAghJmpt7UDFOtcmj1tp8BWoHiEZ0SSNlkNIQRrzenYgpVtHJgesK51Xl4NzwhfCRoxUeKxdhqH36OnCyMRMajKayvy11CrQglVFla5suqqgUKuOaIyttOZyDkspeb0nGi5reuRa3bZ9Rr5LCbVsWH3P08+9eKi5vrJ56ExksGzt9kzDlkdv/uZSdFw6uffKMuc/2iVqN5Sy1WNVPLTxsaeeuOur38xzTDOLzCp5bi9GMoqRTjiqcNTQwJB95YOjbzRWDP/9K43hc3xLhpbBxR8ER8+ufroor+Lbpf619/i9d3mLvKuh2IP/G3vwltQgAenYKOqnJpMTPfz44J8JJwuIXP+IIiLJzXVmT13J/Fv7fh76FUVSfubclS35but9z7a6K1cj3C4yoWGSiTFs28KyTGJjn1BYsop8fwBNAdMyicWSnLkYpbToSwwmar0fdI1te27nLRdw6DPn8knJVGzqfMZMIMt8pCbHycxMQrASI5PE0JNMD3WT0RMkomNMjdwAW6e+0sKaj/Ll5kq2bw1S5ZcUiMQ5iuTnV0v/bKR7euQG/g2t2JkMlq5jJZLk2Sao+cQi/ZiGTnldK7ZlgjnDcP8QhZ5yAuU+EoagsihFaf7M5WWr5dQ4Z8fHr6ZTV3qwkWRNm9TH10G4iEcGkUIjHhnk2vuHcJfVkTHh/TOjTMd03vjjaY6+9SHB0pjuU9Jnl8Gv9tE7FO07HxvuRe8dwEgmcXST2GgfUnPj8lfjq2nEyAombn5EZGQQW8nHMnTmZlNY+gz1xdELkRl6l8GllNnueLhjJHwVbDDTKWzTJm0k0BNzVGzchWfVJtbu2o+RSWElw4g8N4gsSI3mmnmC/skjz3dKJ+cmOtzPu/1z1weS0xFMw8SJG8T/fQndTpPVfNjChbskiNvtout0D2nzU7iq2TRXT4Xi0fS7i3mfg8sxGb2oj/1yZPY6jm5ipQyyJ3r45Gg7c8lJyPOiZCJ0HjvMyx2z6I4KtqCpepb6kshrBzpldDFvWW85fCt7ZH1j/xM+w38vqKTCM8Rf/SeXzQzr9uyl++Sf+GnHFHgrQTh43BZbgxOX+kPJ3y9lLestckTGTyXCLwwwZM33DjE7MUp+thjr2L8YvXaaXx8PkzADCM0EU/BgXcQKuMcO/O6CnP+vcCEE//iQrsta+NUJOQ6OhukW+KctTrxyjv4ZD7hNpKmwsWaOlqqx1158L3tSCLEUlaPy243s9b65g6H1SpdeIrDSJsq9LQTv20ZTSy2kswT8abbXjZy6ORB/iRwNMCd8IYHsk/Md6WTbaAM3LK9KXnUVg92XKasqp8yX5eH1wzeN5ORT79yQcbnC+SRnxgU9AC07fK07EuLtdbOB1T11D3BidJZW38XRKm/ksfbTXFj8tbmrXOECBMCW3SXbXthcGNpdVCN3bF41/OzD3L+4uBXfv9PDRQmUDU2e+7/3UPFfvt7Eg7d13hEspVxZyxJFAnABKuAA5kqev5DzFZKs7DdH/Af5XzRs9eLjqwAAAABJRU5ErkJggg==';
images['Racing'] = 	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAYcSURBVEiJtZZtbFvVGcf/59rXL/FrnMRJnLeSNGma0KQviZuy0jQBWoVR6DqKEEXAYOrYNDSNShMfINrYpHWDUU1M2tQPewE2xNhWxor6kgRom65JQ6I6yxukiVPcxrV9r319r33t63t9zz5MQl3ddOHDjnS+nf/vPPo/z3POQyil+H8t42oPHnm+mk1n0e22kTPffSWkrkpEKV3VBgV+eLDyKKWr15Db2ULIJteWTUZ/TFJS9T7Dky6zui8uG/52JYLfl9pZ50SAGaH6RXFF/UrwDXf6u6vK5Z+CgZOX6Poyuzgmaw6fiYjLiYxrS6mDzFId0nLU/sLkv0bOrRruK2vzNrXmT7vUyJAiOTc8YVDuawlmuPFmp33znJieucNa8oZuPmW0JadlU2XP5c9Mu0PLE7GbObdMaFEN6a03p9Z9b0KvjFTKXguhaDIZS8+oaaxjjRYxq+GQnt9dGqQbX98mOa9VeXYCeHdVcGM1f8GR0aIGL1ur2IDzNgOybopEEcFwA8UwC/jTFKYyttxBlc+ZiujYqm0BAK/Pee93mm1/yRh016ic0V02jXg4jfAlRiplWOq3WhiLxiR/PZd6OBqWBr8UHADuqiTv1d1Z/FBD6+Z8bc1aYrFZGEXO6gvBORqanzKEpvi/n71K964IWKlG93Tixdd/9nRibvoiDYejekLMUVWnNByO0/n5BX1sZIgefumRxB4/XvwSdU7w+C7XWwcP/fLAus17wTAMZDECLrwEUUpDJQaYWBsqfPWw2634LPAPHH31uT++81Hm8ZtZBQndd7f1tf5X/nBgY9dDSEkiAmMnMDM1iWsShziREZclsJE8tjXWYcdXv4Xe+58B1emBTObbUQDPr+h5Swm5++XX+s929T6LTJrH7ORHmJ4OgTdnQYtVyHIaUlRENBbD/MlxbOpajyOvvo1UzorBv/4Ib/7mdzs+CdEvGoq58ab7H2zr93cfwGxgHOMj/4SjrBk9u/bD7rYgnRKQyabAhXlwfAT27dWY5oL41U+eBaE5dPU8he3dTf038r6Auwhp6Ni+Z4fNXQm7w4xQcBFr7lgHX3k53EwZ+GQcqayEeD4GatFRXGMG4/Lg9IcXMDl6DI3rN2JD5+4dpQxpKPB8a7txW0l5o0nP5yHEF/H54jxOnTwOatJwKTQKTc+BE2KAJQ/KAVpah7vKjKVLBsxdOo/Wjr0or2o1tbVgG4CF/4JX1xav9XjrEOdjCAaDyCnAidPHwK4H8tDACxxyag6shYXG6tAyeZgcRrjbPbgcXEJa5GFxeFFd61pbEHmxq4hNCgLsTi+SYhJ8UgTVFShZA0SFR05TwFqN0FUKqgOggMHMQNcJsvkcopFlpNM8vCUOtsDz0DKXrajworq6FgaSB58UkE1KiMai0JgcdMJg+ZKEpQ84XD8nQLqSBReQcO3DGLweN7p770FzUxMWl2LZgshnZ9LzfGQJLW13ocpXibhwCuZcHqpqRjZKkJ6QUBRXIWoUlAHiAQlaHjAQBS0b2uByucFFg5j7VJkviHzqOkbHR4dkAPB/pQ9FZgm8ICExnkJ4II7H3Cb8YIsbz7U6YGMJdCOBoutorDOje9ejyOvAxOigPBvDaAGcUho8N/j+wFRgDLVNXejruw8Wg4h4KItWF4s1biNUnaKr1IT2YhO4VB5Os4j9+x9GfctOBCbO48KZEwOU0uAtm+jkGe7we3/6eW5oYABNm/bh0W88gmJHCiFBhKJoiMoqFgQFV4UUaj0pfPOpB2HzdmH47Mc4/ucjucFzicM38goeLv9a8lJP39df7uh5EskEDzW1gLMff4BSLgJPHpjUALbcA//WXpRWd6LCV4ORod/i+Ltv9H+ySH98WzghhOxsZ3/Ruf2B7ze290HVWXhcVswHPwVDCJz2IhRZ3TCaHBCFCJZmBnFx+PiR4Sn9EL0JdsvPghDCtFbhYMfWthdqGjrrGpo7oOksBEGExWyCnObBX7+M6NXJKxcvBA7PLOMopVQv4Nx+biH1m+vxtXKfd7e7xLfGaS9ipZSsikJkKXwtfGr8Mo5RShdX1K9mViSEWAEU4z99oQFIUEoz/0v3b3l4T7l5I93HAAAAAElFTkSuQmCC';
images['Real Madrid'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAYdSURBVEiJtdZ7UFTXHcDx790Hyy7sgoiAPEUBKaBQfDU1CCpVx+LYaYx5mIbWNh2TTk1Sm3TStA5qUpM2nSRtOqPtYK1pa2dsA00NYepoShWUiAZRw2MBeS6sS3Bddtm7e+/e0z8qHXU3HTOdnpkzc+c3937Ouef8zkMSQvD/Krp7fTFFknKXZOif+Cy4dC89X7123bLVecYdc0zTX2idLn7pd79587gQYup/wqu3bSspWFz49byCnKdTU1IwhWSCURbsXfbuD04019Qerv27EGLyM+GSJOn3vbK3tmjR4uqk6CiKLVY8XpmxgEqp1cLHoSmGFBhwjIw2vdf4+NFjdaci4RHH/Ae7X9i1JienOl9nwFP/DoGVZQzV/JCxtmYc5eX4n92F3jnC5rnpaVWbq46kL8iz3RMuSZIxzhb9iHh5L8N7X8SVmsHbKUb+ZpDFhYGr4nCGgbaF2Vy/0sXYpk1E9dvT1j/6QEUk3BAhFp2eMCfxak4yXb3twnn0DWFbVojwyihnjmOrWCk+6rlIQt8FLuZYdQVBP6lR1uxIeNiYS5JkXFNeVhbr7dyxelXFlg96e7Wi/EVULkjDOzoqafNzxaH6OpYtWKgb7/y459LI+H77uDjhdLkcYfMnhLijzjRYvrSg+uSRvaGb3Y1awNWhad5BTQSdmuru1QJj5zX7Pw+Lt3ZtOQXEz6Bh1t0BIQQHf/LUj8c66oKDPe3C5/WJu4smhAgFbgh/T704c/Br3U8/vGpRJCcscPhnO3df72oQzWcviCN158X7TVeFzx8Ma0BVFRHQhHB/9LZoe6XYub44Kf9u645s2fWNjWu+VFm+p3symaFPYFOxTF6cixPN3bh96r9/HRCTnYim55H63sNU8hhZpRuTvrfe9AdJkowRs0WSJF3rX1//uVeXRp9T4yuLZdx+HRazgZJEJz77MPHxIRQ5QGC8g+jsDYjW/RiQMK/aR8HoxdI9X5W3AwdnzP/0/OENKyrmzc8rmZVeyP15OpRQiOZ+M4o8TZbVhTR1jYaT7US5TmLETyh7HaH7X0U+tx+DTmAqeJCy3OgnJEmSwvANFUsqYuNTSUyIZUGqgbYhE/mzJtDJ4zx/VMHl9lBqu8STv/JyLfMZogF17nIUaz5qTx1a+lribPGFa/JNWWF4cmp6rj42ASUYRPGrLC7KI8fi4FiLh7Pdbr792hWeOeDiwLseNj/0Er39w1j1EJhdin/gLFhS0MfMiU6xsjAMB91sncFESPEj+zwkWKOw4OX0pTHOHG/iufv62Fkls3a5ir3DwbotNfQMOrElJDHtdaNpIHRRxJoNsWG4HJA9Qb+PoCpQp8aYCmjcHOpgx+Zc0lKTsOllOgckmgeMkBjDtf5x1m/dz4XWFmLi5+DzThEITOMLhNxh+MRoX7fXaUfRxeJ39eIZ7cJpyKVYruPAL7+JJSEFKRRCliHZ4gFbDANX+hn5sJ7Q3BVonkEmXeO+lj51KAyva2xpud7dzM0bLtxSEt7TLxP6XDXjcjz59hexRgta7QF+++Aohx5xgCfIlpU+MlNjqPzOGYbP/ZGJm/6uaxPqYBjecK6vqe3Unzuc/3gdOfsBNKMV5fRuxBf34Emr4hOXi+e2LcQVjONbv05gaY6PV6tcPFufSteldqZ7GmgblmqFEMEwXAjhrX3fvm+iow731eOEVuxBMcShehxoWRvRJCNTmVsxl73AhN9MeswkO99J5PxlA28+dgP3tNb8i4ah39++QvU1NTUzK5Rht9ZtNenMWWr7yqBxNrr8regJoQWmUIWekCWNksJsij+fzht/GqSz389PH3WRafM7th8cejyoKIO343fs55Ik6QDL9vLZP6ossn3fOr9Mr59XiT4uA0NsIkKR0ZQAsSaVDxuPYXI0EmPWXX7q0OiT3unps4B2hxfhsNADUUUZsV9+aGn0d9OT4+4zz0ozYk5ESHokxYc65SAke0Yuj6p/ee3dobeAASAk7sI+9fQH9MCseYnGJcvnRZVmJOgz9XrJ4PFrN646lK7TPfJ5wA4EASWi82n3llv7j+HWpOtue1ZvVQBVCKFFBP4bHqGxmczS7vWbfwGp3lFMjHH21gAAAABJRU5ErkJggg==';
images['Sevilla'] = 'data:image/png;base64,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';
images['Sporting'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAARPSURBVEiJtZZbbFRVFIb/fWZ65t7pUDoDhTQ6bUoqwWCLQmOIDz4YDSZeE2PghfjgAyTGS7wlJibaUGMiIZiqQMGiEkVEsfRmEatYLVikIdJb7Ng6nc5Mpz3tnJ77ZfkAJaa206nRley3tb98+c/aZ29GRPi/iltJc38D29TfwDbn2+9cCZxs7GAMPIAr+fTnbd7wOFttm3iYTDx26lm2Np89bLnMf3yObSzZ5H+F95Zv84RvixKZUFJXx3Rt9OJcQtlX8zL1rhje/RpXEtlYU1fg8z4YELZHnJNhWBUybFMG+1mD4Y9DquoRDEVqllLJl+54gRILGUvG4ozQjqCj9qlV3O6IgwuDJnSQUwBcAhA3wJle+H7fFvLHoru4NXhiUcZS8CnRJ0VLNdieDNTiEQP2LJeVU6OWrVqF2/1RK6rZzri7ABkZQtYprgge5MxVscnWnoDYUZYV00m3X47MZTBFBFvzwy8PO5KFbv8a0W+M8RIFFmPk/KCMMU/nm2hyC1ht9EHgxxHiAKauxzRfg0KzFOo9e7GTiGbygl9zh+4OVVS+Sj6vqEsKk0y5OOAOl/sqN4Q9d9V6YNqQvmxW5ZHB9KwUG/EQl3HZBTbjHH6F2fsrpfQ3S8YyoM2M1lZG7y3e8zRfUFEOErKQzpwFfD7QrjAMPQYYAbfzXbGsov7tMn7rFgh1byF75jRi7uAzlX9j/WNaHiGKD3d2HjIFAVzZeliRYmgT0xCpG6owDN5TC3HsV8ylYjBvrwJ3ZzXstWEkbP34fVJ6GLngjDGcEDPHpzvPqxYAQ5ZhTIkwAlmYBAiDzZDlGLRyQMuqUAGIwyNWC3BsIWvROX8PuPTHZ6c6lP4BWJYT6ro0dL+CZFcddJ2HrURgcIDldmOu5xLiXee+2wdcYIzlhhMRiMjumB4/lD72CZmMoFQlYJ0vhDP4KCaHjsDsBawYg+4iTDc2oddQDxORnpc5ALwBfPvnF6cvqn39UIfmkAl8D2/VbvC3PIDsQ4NQdwLK5WtItrT99jzQxhjDwslb8hARkXyAscbCw+9vVX7KwNpiIXH5RXDgYd7qBNdVAOHIxxiKjxwlopmFkeQ0Z4yhHuyr8bb2mJadgWX4ENxcB9eGJ2FMMKDFBeHqlcQHzHFyPs684USEcbJTCYejyXTwUEMziP+wB+ned4D2Qpg6Q9Ll+PQXWx9bzDonfN7+FKefkEx9hnWvQ1F1PULV+0HJEkhMk1ttvWkp62XhANCuq4OT0D83eBMmOWFYgOEwMEXm1ycNpW8p62Xh80bdMD5UbVvXVQW6oUIDqA/6Ubpe/w4OXI+mCejJTKXOKYND0EbHIAjpCweBrlzWQB63/w0zYy9jjUVnW+9nLh7DithIROpy8PkTmXPdqOABT9HAQU/RuB8oyWdv3u8WIpp9nfN+xBi8ItHkstbI42lxs5ExrpRzFgFgCdsUiMj+L+E3I1rsP7JY/QVtK27atPWvWAAAAABJRU5ErkJggg==';
images['Tenerife'] = 'data:image/png;base64,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';
images['Valencia'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAV+SURBVEiJtdZbbFzFHcfx75w9u+td72bXazvBJnUIhEYmaWiSBoVYULDTcEkvqJQKFfUBFakSL1UkVFWIh0pVq0p5KFSoFaVC8IAUqVURUkgoBRUIJJHSpqFuHRvbdYwdX/DefM7unj2XmX8fYqTI3rjhoSPN2/w/c/T7a+aMEhH+X8P6PItVOnOzUmrndReIyLoTuK3Qt+WgiDBw+JvH7h4aHBURevfuv31z/47B9WrVerEopR768u7bX27U67nlQL9119ChAx1tduaDDz88hcgOwqDgNho/npm6dLRl/bVwpdR9D3z98PED+++064k0c9OXUGKo+QGlmUskNt9CdWKEhZlpwiA8Mjc7++xqo2XmSqmth77/g2ODh79le1YCMgWyvX0sTY2zODpMvHcrVraA3tiHneukc9e+X/X09tz3P3GlFDuH7n/xwFfvzZeKS7haKJeWcPyIppWg7rpoLMqlIjpmk8gViGdydGzf9YJSKnO1Za/G27s3PrJ7z1eGEiZqLFbKTi6Vej0MjVUuO48Glp1V7VnmPx7Bi6LfR+7yeduOPQ5qWyJf2NK3vf8I8LOWmSulrD33HDzz+KOPLO/t6z4WGqnePbB3jMZM6btP/vzQnOv/sOTUsvMXzv2uGsrzKzUdQGbbri89QLztSHFy9I5KxXFb4TcfeujhcwcGHzw5W6wUy06t4dbq3mKpGpSqDpenpwsolaS98yKGWLaQidxKQynb2NKQYJOefNquLjwxu1R5Z00sGdhWyW8vDHfd+ZiVcwh8w+xijRv3pLjRUmxpGBxf4wYe+VScj8aK7L61i8tug629vYyfeBV94tltwFo8mbA74zGfHmeUm+IWmQ6LS8olGcCmVIpoQ8TIooMXCru78rzyn0nuTXmMlzwG2jV/6BIuJhP5lg1Nd7Tz68ETWGdOMvayxY4nqzw8MM/bP0qjpxX7nnP4Xg+8/4scYuDdF5f5+Lxi/Gg3W79R5f5va77zTk61xDfldL076xK15SjYKboScxQ6oKctRaWQZHSql3QJGjGHW1KGDfkmmwo286S4Ia9Jdrrk2nStJT675FdqDY1toOGU8X2NRDFm2hIs7L+N9qUsdilGfaBO++RFpFkiMBYRihAFoUVb0nzSEl+oqLlqPah1uKWMMQmUpQibEVH/Zu7ovwlLNykve5QSKcY6cwjwWQYxC5ZrSv41rT79zFt1QvNzM4uNOSMBBgttIDQQ2Tau41HzQtx6yOKnLkHcJsRCG0EDYsHlslpYrlkTLXGRRe/8NO9XPIVG8DUYY6Fnl5h3fLxAsONx2gtpup06YUPjR4oQQy0QRi7L36BabBkLwPHR6LUvCk9ssARfCx4WHXNlxiY/orTvBgJtsCeq9NdKeMTwQ8GyhYkFeK2o/3T1oVyDj5wJ/3o6r859LWH2+RF4ARgsbi1X+cKeT4hnDBNns5i4jReCHwkkhQ9GrKnTYXD8amvNrSi+eG/U/eemREMIzRB8ERqWRTotbMgKfixGUwQvBBMpZpXmjYr/vCxJcV0cYLHu/vHdMHq7FkAYQGAgRGh4UPcUIUJkIAgg8OFUFF4YbzovrXZa4iLiv2W8p/+pI0eFEIoQieCH4AdXYF8ES8NI3fivN72fiEj1unClFCLuuVf+Ls/8Y9zCjht8MfiR0AyhKYZYXPj3tOLV0/wS6n9WSq1x1jR05ctRV1a/8NtEqm+oxlPdMQgjUBpsBfOB8N5fYi+dHa4fBSwRMdeFr2wgSqno7AXvp5Vk3LsrzVMbPVLGhjG0PlWOfjO8UH8G8FrBsM7f/6qIYkCCePKegzutx5JxkieHzTHj+W8CvohE16y9nufcygZXNrlynfiAFhG9bt3neSuu9EFdK4bV478AMw34wnLHtQAAAABJRU5ErkJggg==';
images['Valladolid'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAajSURBVEiJtdZ7cBVXHQfw79nde3fv+5WbFym5IUASWhDTBAhpeISOtg2vaKCO2k6rjh2tMzjWPzrqVKeOjjq2HR1nOqMOOFYrA8gMbQElrWgoloDhkQB5ALk0j3tvkvt+7N7dvbs//xAiClLaGc/fv/M5Z37nd875MSLC/2twHyaYsUDNh4q/l517an3SyoVsY20Vnpkr4JU/HWF9RIkPnHhXfOcv3LxzQOjJyfjsaMS8vvo+ruP8tHnqY/V8uariN6/9PvHW3fC7piW5X/iJVcQr2yJC68snbe2JLEK7+xwrG65zm3Sin65Z43/+I+HNVznXw8Tv6HpD9A/w5At7zOV2AdwJj9FyVSfp6bfFuq12/nMfCV/wXXd30U7SOc2Q/5E0E2daS9OxK6w4tFafiCoUuWQ1U0Wnae9+wrvlfxl3zPmiinJP2J6vxqTiWLfa8aPOTazdU8OSIzM+S1NlSp0dZ74LJ/HXw/36CyzEFRvDNHFZK+Tvilcwm4NWVuwsuoTuLyR9Q9uCixOni5c+4SjTV+anfYPrtqx3v3voWNJZlW3hIvypVZbKv7ykpKoPVSoN9njxADcY2xcjTb0jHly39AcQ+W9lphLffm9xyyZxRWNn3aAOU1FJR56dsCXRHmYQSqppqknuaKWB86kHDvy88vRlt8X6AkrG83PHx358W86DAe8SBnwVWTWlj8wdlDLElamE9JN5zG7OsPiyAmraS5jszCLCJbioBFwqtCFe8PDmufG9yKkyK+EbZS5nzW04mso+BQavaZonAIzkc0XFSGShrUzD0p6B84k0ypqycJk5lCxZuL//Irz1D2AmMSKWshgD0A8O5ez+iq7/wCs87gWw8NshCkBWu0ZEmNM1KkVzUCYLyIULiA0VEDutIP7HJGaXbkFVz1bo6Tg4i0UlIoPy2jWIAiDx3RV2KQgAAgDMUq7JmXOvAceQn4peAICUkh4b9zge48Zl2DQZBVmF80gRf097oXoa8TAImqkjnc0MAEAiEht22xkI7JM5Ra0BMMeriryho2PDk26rrSHkrza2be5ODI+HV2im1lp+PVqvBhXkqxQYvTmUxOU4aW2GxyniwR2tOL77bbhXeJWoGqsNheqbJJ1rqg1U64/vfFzoPXw0yRGZbE7NLgY4s+S0sMxctNmQFeus5By3jcmkXi4iP6VAuV6O+pdehtPvglosQJGL0DhdpzIW1rN5WzY+82DJKTCYRJH0bBOIGIgIWOZ8yrqxjsS1C82uSt9oG1ANwLmvYumVvvsb6bW2Svrh9l00NDVOX1n2Rfre5u/QVHSadj367FkA/OeBxV3VgQmxI0RS5yJCnXUHEf3rQLdGLFMhTYDTKrH3qt3mRa9rCRHlRw394KRVRf94E963M+z/7W7QUg7MypDL5EDV7AARGW8EPEtOVblMhyCiTuG0nrhtcr5aNmZNbtFo6oihG5muGU10hPxtALAnPr0n/ciWjOuhDlgcGkYuDkMMWiE5JIQnwjO/PrTndwDgqvV2PJLQmaaV4o2XU2+ulpl1Hv+6kT72Ny8/YOU4z58DQsqQhJ4K0Ra8RurIpKf8Z+mJCKzTArbv/DSUQRnRySj6z596sTCXn6jwuGpUu+XRXg83YwcLHPZxZ75ZSvUBAIgIRATnAl912dr6k2WdDRT8eChR3hI6jM01FiJCu9R6+LlNu+jCyCA9u+rLtNre/AciAnoWO8pbQseDzaFkoLPBDKyqe8cVcAZvmvM3NDeVjBix3H4up4E5BL8u8o+tv2T2ti2s/MzJ4pmnDW/prUh4WpVdhX398tmvrVtQ8aWHzhePaTbLBma3+PicxszZ/N5sPDd30xTmXzDGwFmF1926mRGqnM8wr211JEjrZYGt91SKfQezfUOhwbqzRzAw610VejPM8W2SAXB2C8x44d3SbP6X2Wj6KGM3KvBWHABMrZRIT8YPBmrcT/GakY27LG6eAJ7R0lIsZ5+MTS9nsYLE+6y1RckCGQReLeVMnsunJxMHARRv9ebxG6sZgcbqWqOo7y0Oz7wq1vp3kk0QSNb8xCySXFJF4jmNkspVcpsxKCVdfj/xulhXVhVYUnlffCw6ckf85kiORocADAlAsJAu9Pq9rue4oGOVWePyq8wwyS/ZWESLYzjen8jkXuUBoXBuYg4A+2/rNpz+/XvMOj0ONyx8b/ZK7FcuxrouFs/NqIm0Vx6becdd7qu1SVZNVtTUjTzf9l/eU1PEGLMBMG7ZHUdEygfOu9dekTF2M/6em8t/Ak+1U/SB9nUpAAAAAElFTkSuQmCC';
images['Villarreal'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAABBF0RVh0WE1MOmNvbS5hZG9iZS54bXAAPD94cGFja2V0IGJlZ2luPSIgICAiIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNC4xLWMwMzQgNDYuMjcyOTc2LCBTYXQgSmFuIDI3IDIwMDcgMjI6Mzc6MzcgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhhcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgRmlyZXdvcmtzIENTMzwveGFwOkNyZWF0b3JUb29sPgogICAgICAgICA8eGFwOkNyZWF0ZURhdGU+MjAwOC0wOC0yOVQwOTo1NjowM1o8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwOC0wOS0wMVQxNDozMTo0N1o8L3hhcDpNb2RpZnlEYXRlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIj4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRvHgIQAAABZ0RVh0Q3JlYXRpb24gVGltZQAwOC8yOS8wOCQhPd8AAAAYdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3Jrc0+zH04AAAaJSURBVEiJtdZ7cFTVHcDx79m72U022UfehDwa89AAYQ0vJxBCgmBLMLSdCgxgKVhpRWkpioqMDq3TDq1FUKeM2sYWQRkqyvAwDRREaVWeKaWAwRIgISTZsLvZR/aZu3vv7R8Gp2sE2+n0ztw/7pzz+5xzfnPO/R2haRr/r0f333ReNNt+34ql35z2P+NCCKnp+cdW/urppXVD3xnL5k3e8vWJeT+90Wf98qofP/Vd+7dvZuhvMXDSqLLSFwO+HM/yRTP3vf7rJRVmfa7ZYOyc+tiCyq3+gBr8VnXeI/0+92Fgz1fiSxfMqamdVPrsls0vPTyhyDw7Gb98+6jszCJLwwOePgVjShd6zWCYXjj5exkjuwn7IyQbAqV6YZm+cYmUH5FF49od3sWapsWG4R6X67KmlE1sevUXFx19KaQZbahxhxbwgF6NEAoNEnBHRCygIzQQ0dJT3XS0Zhf/binvF44M8M7HoTeB2Oep/eJuEULManr63s21U2aUKmqS5g/1a0k6t0iJu7lwMJXUXKfIKnPQ0YH26VVZM7llXXGJn31n+o+8cUxeDHTfMBNwIYRuaDUZNcVi1YOPLn9yRFEe0t924HE5KQgZwRAVnYSwZli0D7LmYG3b73h5u2OFU+Eo4AViN8yEtGiapgLy+JKi8rpnNt6rWlURaruC7KmlwhZl3H0XCJ7Xc32/wulzMUGZl+CMX2ZNt1yY+dbm5/ZqX0jDsN1Sb6+Y+p2fbWqOVU61nJIlKk3pTAtdIiuYjIhoKHGo0rKRqgK8ec+T7POYDVX2ghULl7pyhBALhiY4HL9diNxFW3e9EzfbLN0vrMYVM3Ix5ARDKnOzjRDzk6KaaBsw8dC2Yzib6gCJUyWj0f38lXnzgwOfAutueAmHqOGJNesN4+pyu2JJSAXlTBnpwqQE2dfdRzAcACWCUVVo6biMczDGnNEyDVWQZq/hRDydSO3ctQsL0+8YhjfccVthXm3DoqtRDYrtzBuXwVMzVBZPjnD0mpsz7n4gjj/gZK/LTV4m7Fsn0TLLwrr5Y9GJFE5by/X6xvtXDcNL6u9p8Nnyk/1qMnN6dmI/eZQ3dkMwEMSoC9LicIDi40zAh4MwlZkSz+2Ch7YNEtj8MMtEKz2GPNyF9tnVQqQk4OaKceNcxmzqfe8z5dwB1pzwsbO9F3M8zphUjT0XO1GjUQ51yYDKxBQr6/eoHB+I479kZdXpldTrHbgzS/PrJpWVJuBBc27R6Mg1loU38lHAh6t/kHcbzcyvC2EfVPCG47x1Eg61gVUYmWy1oDNqRFSFubnFjMro4onOxynNHSmdSy/OS8BleVBy6m1cj2dgivq5PhDEMzAAPhczbWYEgsf/CK1XoNZiISfJQIoRfliYg0kn6B+ACzmN9EaiWHSKlICnygOOY0HYlPwoFSaJMsMA1a+28Zu9Cnemm6hITqXXB6oK09KtRFUVDag2p2MydnMgfTEvmBYQdPVqIyP93gQ8crntE4Onm7dD+Wwvn8+aEg/PjLEyvlwlGhPUWK2fTUKSKDemkZoWZ9sDoNc7aa8awe9Lf0JPdyeFg67r7SfOXk7APcffO2ILOuMedzcvxqdxaGw9s6rclGfr6IvEmWRNBaAyzYRVkpBRqSuGSHmQnRPW8kFHgCwRxOK4+GFzFHcC/nZr298zus4eMg2G6O/t4bWiH3AkqYywV8EfUyi26SjLhbsKJWRNQ1Y02nvgwKiV7ArkQtTHqEgv3j/veO3GL+ZzXNM0xbH79Werwl1BIWK0+8K8bF3DuT4LiiITExoL74LxxRqeqEZowMtBbTbbDfVEndcoNcYo+OeH2//U1nl42CESQtD8yeUTead2r66RvCpRP38ZzGBH5oNEjC48QY1GO4ywCmTVQ2deATvSl9DT202BCe7sOn7y6NY/rAGUYfjQUsS2dw9uKTnb8qMZktufJXvZbazmo7HVaJKDYFigyDF8+UGax3yf1n6ZyuQwNddPHTr/yqbFV8GRUB++pBJJgHT317Km2r6xYPWltOKZSalmQ+OlzUy1ncPph7/mPMJR6yRy+9s7TFdOb2luOdCkghuI3xL/9wEAy7Sy/InybRNmZ2ak3V0TaxnjTS6LnQhXHo50tB72/eP8/na4MoTGhkGapt30HRrAAKTY8u1FGzZs+Pi3TVs2AClA8lCbuFn8re4taJqmAIoQQvh6zvY5w9L9ze/tifBZhY9/1VXwS9NyywAh+E9j/gWlnRu2JCIgVAAAAABJRU5ErkJggg==';
images['Zaragoza'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABUBJREFUeNqclltsFFUYx/9nZrqzu3Tb0lJKb4CtLVAoCAiYILeUxqgYE8QIeHngRQ0KJsag8cXExAeihUjBYCqNGrCKBCGi0EJtLZdy6710uy3QS9qll73vzn3meODZLksnOU9zvt/3n//5vm8OoZQi0aemmqxJ4kFee4c2J7KfJAAnFQdOzgxF5hLB2FdJqSnUNm14//WtZdZHezcFWbg1Lfj+/ZUlnjunTuq6RXOyTV7RaFCWNCszMyXd65Wpy2XDuG/BG8dPHO38v3gunuS7vX8damltqEhNL6h84OsZrK0vPlD1s3BYMYcHA2HHIUHoOpSZ3n9kqnghHty0NGF0OE0O6xdfLLyNtaXFpzcZRRavXbSrjmfCkc7bjrPFS3R+WvBRzl2zM58cL5ECwEYg6ucgEmDm2pgzO0y29Ubs21ojvR9Oy3OylXA7oym18wvMMjHPBK8DD3erLAGZ5HC3T6g/kR8up1XUemLllWWVzuO/HO3JGI2VkS4XTEl6VBohWYGtUENj91gzakFQlaDy6mM/7PKOjpTn5uYvt4mOORSCq6PtDjdnbi5S0tNBLQvRYBhqVIOshkzfxOj4wH2Pu6O95ZKq6X96x33tUyoP+gNfjfnCWWm5CnLyUiAHhlBa5IdDGYJrQoVsKEgyTCiCAME2g0/OysmmqUXZFxqubEp3CK8yxOqp4bJE1i/SUBK9BVddDCIDpsUsjIyrqBclrA5pWCTJCPMSVFFHJAPwikEkbwG+a0BKXM9Vu6QvV5nqRgKqsNeKiUuQcf+lCPgcCTu+JqiIWHhWcsJijqbeDCFLdsC1RUbVPFOK20SqRv3BsAxdlnHWGcMwF4M3oGByUsHivCgWFsdQPdtgkRSpchAhIkNjNeQ3mQ4LQ3HhdsHpkSyZ2hh8wpJQ91QYpaoMQVfQ0W5AZVwyxuO6EsReKuFzO6Oy0mQfSaMyWuPCo16pLWDJhmkpeHNAQ2+fhu+XhrD7iwAMmaC3l8crgTB+1WXWZBRDDBwUKUIiVTHE34nrecG8wvaxyZYYJXoar6ksgY4PRijO/Cai7poNKcMRbFc0TCQB83UO+cz3HCfFIEcjiNo64yovL1/XOqhpD3Qxhgm/Ajszct8eBX1DHK78E4WHWfElU/y2waGVp8jQCGKzKPpNjKzE0r64yuvr68IDQbPnphhZeGIFRWGRiQwfAUeCOFcbRHeHgN2fOCFqHJhg1LKSWZ9poD2Ejlv0ghm3Qwkh/Mry5/d8nDNWwV+xwXJZyHPHMEkkjCwwYd8hwRMgOPyNEwUpFN/6eUy+rGFHF9ml3wtWx7WFJTMzSPq/nRzVNjBpy/qjSIOE5RLBaJaB83U23BvhsFknOBbhUZBJ0SRYunHfeT6hn8XQkGfgRlC87J7tQyzCGohYuDTLwDUfUNIiQI0Ai5MoXGw8Djyto9FPmigd9SYEd7vdge5byo+1MyJIZurbWJNUZRgoH+Cxhc307bdt8GxU4RUsNGaYaG9NOvhE85x5n7XkOee5/Ry/0nHVBsqOnmdSDFYpLYTipzQTn+VRHHFaPU0N0ZIn/YdOdjXTg3+kG+AzLESYNSHOetTqbgYvtwiuZpu4fF3cOxVgSvjDgwXkv092k1Ntq1TwrO3Vhx3M1lsSh2VLDZwe4H+nsq9u2vcWQsRlpav4M5/y/Lyk5iSmm8Bco+GgnQ7faJyziNL+GOIofOwCxO3r1tkjNUuSac1iF91c5gwBs0seG5cYHGyS2N/bsMbhf2G94wEwa0UicSTRuyKrHpbA9S5L4qF0vDaRmP8EGAB5JBmkAci9ygAAAABJRU5ErkJggg%3D%3D';
images['Real Sociedad'] = 'data:image/png;base64,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%3D%3D';
images['Levante'] = 'data:image/png;base64,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%3D';
images['Hércules'] = 'data:image/png;base64,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%3D';
images['Rayo Vallecano'] = 'data:image/png;base64,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%3D%3D';
images['Granada'] = 'data:image/gif;base64,R0lGODlhDAAZAOeDAPQGBOyGhOzGxOxGTPTm5PSmpORmZOy2xOwqLPTW5PRWVPQWFPT29PTW1OS6vOR2dOyalPTG1Pzm9OS+xOROTOyupPTe5OxiZOweHPQ2NOx+fOQSFOxeXPQGDOTOzPTu7OxubPz+9OS+vOyepPTC1ORSVPzi9OSOlOTKzOxWXOx2fPTO1PS+xPSytPTe7PQeJPTm7OyqrOy6xOwuPPQWHPz6/PTe3Pzy9PROTOyurPze5Ow+RORydOyirPTO3PQKBORKTOwuNPTa5Pz69PzW3PS2vOx6dOzCxOzi5Ow2POx+hOwKDOzCvOyipOySlPTGzORaXOwiJPTq7OwaHOyyrPwGBPSKhPTGxOyqpOxqbPS2xOwuLPzW5OxaVPz29Oy6vOx2dOyenPzq/Oy+xOxOTOxibPQeHPQ6NORiXPzu7OxybPz+/Oy+vPSepOxSVOyOlOR6fOzS1PTCxPSqrPS6xPzu/PRSTPSurOxydPTS3OxKTPTa3PTi5OyChPQKDPTKzOxaXPQiJPzq7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEAAP8ALAAAAAAMABkAAAj+AP8J/OeDzZcIAxMKiYHExhcfCeloaXMEiQUPTYoc+MdlCoANWPjYYDJliZ4VXGhUATADS4EBAKI08EFkih1AChRwIOOnDQEfXDBA8UMUgJ8sUGzkqQkIwBk9GbY42WID6JQuMcsACaMChI04TAEsQKPBQBoeVTt26YBngJIjawhIWcGUwg4IStbUWJMGJQY4FwJsabGmsJQ4XMyMUPAAjhoBQ9Z88JHADAIbdzJY6RGZwNIpMdaguaMGSwwvaYCq2IsmR58ibLx4TiBl7xsod2zsncxFUOEacEqciCxohZA9eiUTSA4jz78xv1HEYVAYhcAnMOI2EIGkxj8ZAx0b3KgRR0SNGhMS/jtg44mIPQ7UC8wzhgXCgQEBADs%3D';
images['Betis'] = 'data:image/gif;base64,R0lGODlhHAAZAOZ/AO7x2o6MNOOrAtGOCuzs03N6POrt2eHmvHV8Q8rSi5aONd3fxJuXRX2CS6KeY7O1WLOpatXTqsLNedvisdY2Fa1UKLnGZWZ2SKu5SbixdURiMpOnEY2UCKWFGoF5WLPBW9zXtPL141tyR9Taos1JE8pUEdsmF4OKAFVvQpaWIz5eLLKdLuPSA152S4mHKdrhq2p+U5uhJYaMCuPdwvv79omLFG+BU+gSGdPNslFsP1dxRkBgLv///6+8UdjequfsyLGdA7ugIvTy6m9zOHd/RdzWw7rIa5xwKeTpw5iqI0poOc7WlNPZnvD03Mx/DKmqRO7w4p6wLvLu7donIH+GOYB+HJSdEaWrOL66hKS1PK6mYL9WDn99G4SHSLOhMGltLMnJpW5xLM7VpnN1QHZ/THhyTpWVMHh/S+7t4IhzSJZsQOEhCt/d0d8hCKCZWuPjzqB9PcFXDXhtSfTx8PX46O3x15uqKLahAp2hKLfEYZ6aYMbEk8nMlsvLnj5fLD1eKyH5BAEAAH8ALAAAAAAcABkAAAf/gH+Cg4SFhoeIhRooiY2HKDaOkjswFwxmIjYakoc6VAVlHR1yRFQifpyDLTANFTcUJDcVXS0tqYIoHlNbFCUlJlsmHjq3fztpbSROAwNOJWtqm8VKcAIsAtYCRznFhCt3XitAQTuTfufofjp6YGILbHqn6eflgxcKDi4BegpVDAYvlkyYYMANlwAOArhwoOBCITIRsmDgYeREkSYj6tAI8aOPjA88PkQB0aAeIQQcevCwUGMOAB8SEtQ5ICSFyjwciCQq8GRlDSkvE4wAgASNTR4PCjgiAkLCCRxNmACgAeDHHhl5ZjRA5egMniRaFhxI8OLAGwh2YjS4VSAGFAhYQfhEwAEBzZUCXFMhmDHhRIYMJ0YQGJL3VoMHG+rQ2fBgjIpugwpwIBDCypfHkCNHmBEGc+ZBDQp4/iwohzTSkAMBADs%3D';
images['Celta'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAADYUlEQVRIx7WU8UtbVxzFT15uYhJrfE2rwUUxzSKzkri02iCtHdsYDIYt+sMC1i7dCtNKCyL7C8YGhbajZbT+JKMwaJgUmZrVgmurUKi6iEFtcbMt0b7KlmfS+NS85MXcux/WwrDtfGHp98d337kfzjn3XiDHaWtrM+SqyWW4ocHBg5Fr1xZ/GRpqBMDlnRAKhbxLHR1pyeFgT9vb0xMTE/VqtUTtj4Ig0NL6eix63wFPiyAIAs03hHs7kz69OhLUG7QaSFnoqz9t7QLwBYBtYdtBCACOEELI3qJPYmeal3W7yixriRWpmN/RVFpaaopGo8pz0ObrNtG8biEQCJTvk6QrVFGqs17vxWR2sWVuXv4ovODmap2zqK0x3DZy9oAuFPpKS8jDcaOx0+/3C6+MYesHg8FAgsGgx1Nc/F1Bb+9Rsarq9jKjX0/Gbd6ocQ8XL4hjxbQHv8Ur9j/ObJ6X3O6w4erVpgM8fzEYDHoKCwv12znh/ujru1Lc13eKiiIKBQFic/NKv/3A7kNNzRA3nos0GlAG3Lszgo6nd6WS/n7zhs0GrqAAq62tP1SdOPHlv7t6yUnKaPx9026P08pKSvV6JG22x2W7NMvxJOCwaPBMBv5aY4g8YyizaBJrVut8hhBkdu6kmfLyRMpsvr9dXLT2yJHvPxgcrBR9vnMJiwXU4Vh612UfnY1EsJhgoAzomcjipykRB6vNYVZREYlnMlg5duzC+2NjFe6WlktbT5z2FT2xWCymRFOpe4e6urLsyZOSdZP5uoJ1r6J7i+eNHGxmwGV8INmQ/VY/P7+X+nzXe0dHzw4PD68DYKpP1xa39NatkfemJe1Apmgfr8TDqQ/LlM8OH/64/0UCKvZRNdzAwM++sUvfsF9HhtvxJt6u2Zs3/Q+7uxdEk4k96u5+NHPjxuf5ZnAzPT0/ylotSxPCUlotm7l8OaDWjVrLlNTVTW3o/7ln6zodSF3dFFR2oTrXqCyHqMsFDYBsTQ2i6fRkvuOCy+Xi/zx5UlYIYct+v9zQ0MCr1ap2Mjc3l1wtKZkBgDWr9cH4+Hgy7xAAm7LTGZYZg+x0hvEfT/v/gVDi8UxFrVYQj0d16blCsCAIk9njx7EUi+W/9BfjdrtN4vT0/cbGxh1vDAIAnZ2d+lw1fwO7pF7RxM8QzQAAAABJRU5ErkJggg==';
images['Elche'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAFHklEQVRIx52VbVBUVRjHf+fu3V12weVlkSERR9CEaFWClEyMbMg3smYsx7Syl2masYzxQ9bU5PSlrJnGySYnLZvsRXKmD2pFKZlZiAG+lEIwKIhvC7IrC7vLAvty7z19oJwRBbHn47nnPL/zPP//uY9gDJGcnKzu2bNnhq7r9v/WLBZLdNu2bQ0VFRXhm50XY2CoJ+v3vZqqHXhHtSYi5dCiEfUTsBR/Pnv+02tCoVB0LJcdEXC8tmqd+/BaPRrqkCeO1cqNb62Xne7zMhYJyq7adbKh/rsPMjMz40ZLYhrpQ1lZmWP3zvffc0YrN6TdtV4x2Sbw9fYPybR6ueDTmZ5fhD3tXpSuL+957PFn8jKyCmsOHjzYNyaIzWaz/Hbol8WP3mf5xhmqWNoyvkTsaNqCL3QZ76kuEs0xAv1RpuTMIN6Rgi39fszn3rhjyuT05U+98FZP1YFDpwOBgDaaJsqZYzsrEqJ1jydPXoIYaEGZ+Cwn/jzJz4ffo1O9wlJLAW1uPwOaysOrXiSvoBit9W1wLsJ3Zidh64y6rMLnS4CrOinDNRADZ1zO3NWYRBQhYzSfqqd27xYiZxXMnfGc9HXgD4WZdXsSwebvaD/diABE5BLO7IdQoxfyAMs1Nx/eLgkY5z9CsaahRwNUbNhIY72b820+Ik0GRqdBn2+Q6sPt/L6/ic1rX+ai24vs+hYU0w0Nex0EQEkpRnZXoYowc59ein1SEtMLs8jJz8Qal0C/Do3eIK1ajCXPLWJiRhrK+FKUlBLQAtdb9LpKJCjJc1Fs6chLn5FgU0hIMCOFjqKqpEx0YBqnkuK3Y7dbSXPaUeQVlLRH0KPdII3RISX3z1GFyWrRPlmO4lFQgPuAYpvAiEk8ZpVQQBIvBelxBkiB2H0cI9yD5EP0cSAfW2UAxogQV06u1m0UbI9Pr3k/9YvLoAkEoEhJ0GHl5OwMglPHM66tm7l1F3G0d6CEIwjMgCT42jgC8WXb4NNrfjXXaHK2yR1dULZ8SyBn5ffhkhgSedXohlkhnJ2KxW7Fn2pB83QhBsNDVpESfZaBv/TZhpde2fTO8EqugeyvOUAoFAo3XrBu6FtSqP1XpxCCoKrQr4Dvioc+EaH7XyMJQAjoXTaRkH3Bu9XV1aExuWvFihXN/sT8at2lgyI49ODt1C3LRWh9NDS3E283U/3cLPYunoYAZKZksKD0fPm69ZU3yqdy49BInPNjYP7XDyTmRJhmO8qUyFAHslJ7yTQ8YJWYZmhot2lE0nWCpvz9R45sHrgVCJcu+6t7xs+mvGYRZpPBuW4Ld6c2UpTRRm3zZP7yzcTpEAzGVN6csoPZDteR4VqM2i6A8vLyloxUtSstvhdNqmRbG1g7r4XCrBgvFZ9hkqWJmK4ipeCevATt9+o/akbKNSKktbV1oN9S9NPMlGOYMNDUFNyePtyeftzeELqawsyMbopu+xPFll1TXl7uvmUIYFzsTd66oqhXC0UUlIiXho5Eqs66aOhw4lC6OOdzsPquYwzEl2wFtJES3Wz8qk21X+7ob9n45FHPdMS/26UcekEuZysT8lbVzVu2ab7X6x1x1qs3gWi/Hg++vnD6o8W/1dsnV7XPHZrxQjIzrZWtK5P8p3ty14wGGEslAFRW/lAwNe7QDx/v1yd89ffDLMw+whuL20P9SU8+ce+80kpGcNUtQQB27do1rWCS56NYT22pNenOhnODs9YsWLD46M0A/ycs+/bty3W5XHG3cugfoK4f5XG+GsAAAAAASUVORK5CYII=';

images['ha dejado la liga'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
images['imgIcon'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAACXBIWXMAAAp1AAAKdQFKJd39AAABxklEQVR4nK2SsYoTURSGv7hZ9kw3KYQMVmGrSWcKIZZTptw2pWV8A/MIG1AwYJPSUhvBRzBgESsTmzDVMoEt7kXUOXFmjMVskpkk4JJ4uDAc7nwf957/VlarFafV8/6rKvBtcZJofnNbBZLsJEuyzKpArMtTLEC12Dy5rNwDiYDP8/quJUmzu07TfxjE5N8tsrFkabJuK4oO38du3QEcJ3ZxgCi+2246tt12VbWArC1p8nvdXqjGuA61OuA2EEEVz8wsfmxBjaqWEYAHQPZnlS9AxPHU1ESd2UDDcQ0aLAbDLovQM2NQwNotklNVYLncZCSqTD6NiERkpNctBv1wOgqj2bt+N/TtsPvWWsrIZi7ZdlQiWM9OR9NFsIi9j9EzE3raDntjHQbmavNbEdmfLqr4s8DtTFpc0zD1QAPfBwdeq+WLri370y3GJkJw5T5u9TTCAhDaEKNWLWCk2UA4mHSSlM4ys0STvHOJADcihDo0mk033ygiBywidDo++EAeKgBPKdcBS5qWnqyIs8ZVRAqube0gpYzefPi6D9ynDpzlSMtO+Edafv388R8sxn4/RXF+cVbpvXg5v7lNlkde6vzi7PLRw7/Ut/6BfiSHlwAAAABJRU5ErkJggg==';
images['httpIcon'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAXCAIAAAAZcvF8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGdSURBVEhL7VaxTsMwED23YmSDP0g7IL7A/YKWpRM/gOSOZWFj7MaSjs2GQAxMXUi+gHwBQoKEfgDQCYkFivHZTuI6VUNElQxwipR79vne2e8ih1zN5m8fC6jDGgSA8zqYgZDJw3OTkKPWTpX8l7P5++dXQ1AuKt+4IBa8yF2X/XNv/OTjcYd0xnGS14I5vYMBIYNgM1UEZ8chPTxwdDYL4mih3mY5ZUoLph6w02FKvQxVQeL7Fg9X5jMASqmcoG7EI1f5wphr+D5GUsb0LPPFWhkrvSRTClRiAyrSPLeMyRKZqwwfXZVN1pvUmeS3uCzIFXf+zFm/C+C094tVl5HQ2lO7d4a3nE9wBEAeuJxdBZPhQr3XlOBNsS2j+1DGYB+rRo3HI5PaglnCQu5un4HXU1lNHzvibkQI6XnUPU97CqlvrkPqniS7tqCkFjcIvpZ6TTfKD162gtkSbBXUX5sF1ejF0+tKvYt1Xhsht5l91hbUS9Vdgncodmx795ecpZZ7jy8ivlDvUjnLBf9Vbq339laz+j9GfebVE4vW+AbF9nlh1aMFvQAAAABJRU5ErkJggg==';

////////Team URL//////////////////////

var teamURL = new Array;

teamURL["oficial"] = new Array;
teamURL["oficial"]["Almería"] = 'http://www.udalmeriasad.com/udalmeria/';
teamURL["oficial"]["Athletic"] = 'http://www.athletic-club.net/web/main.asp?a=0&b=0&c=0&d=0&idi=1';
teamURL["oficial"]["Atlético"] = 'http://www.clubatleticodemadrid.com/es/index.asp';
teamURL["oficial"]["Barcelona"] = 'http://www.fcbarcelona.cat/web/castellano/index.html';
teamURL["oficial"]["Deportivo"] = 'http://www.canaldeportivo.com/';
teamURL["oficial"]["Espanyol"] = 'http://www.rcdespanyol.com/';
teamURL["oficial"]["Getafe"] = 'http://www.getafecf.com/';
teamURL["oficial"]["Málaga"] = 'http://www.malagacf.com/?home';
teamURL["oficial"]["Mallorca"] = 'http://www.rcdmallorca.es/';
teamURL["oficial"]["Osasuna"] = 'http://www.osasuna.es/dev/';
teamURL["oficial"]["Racing"] = 'http://www.realracingclub.es/';
teamURL["oficial"]["Real Madrid"] = 'http://www.realmadrid.com/cs/Satellite/es/Home.htm';
teamURL["oficial"]["Sevilla"] = 'http://www.sevillafc.es/_www/index.php';
teamURL["oficial"]["Sporting"] = 'http://www.realsporting.com/webrsg/';
teamURL["oficial"]["Tenerife"] = 'http://www.clubdeportivotenerife.es/default.asp';
teamURL["oficial"]["Valencia"] = 'http://www.valenciacf.com/es/Home/index.html';
teamURL["oficial"]["Valladolid"] = 'http://www.realvalladolid.es/';
teamURL["oficial"]["Villarreal"] = 'http://www.villarrealcf.es/principal.php?idioma=1';
teamURL["oficial"]["Xerez"] = 'http://www.xerezcd.com/index.php';
teamURL["oficial"]["Zaragoza"] = 'http://www.realzaragoza.com/';
teamURL["oficial"]["Hércules"] = 'http://www.herculescf.es/';
teamURL["oficial"]["Real Sociedad"] = 'http://www.realsociedad.com/caste/home/real.asp';
teamURL["oficial"]["Levante"] = 'http://www.levanteud.com/';
teamURL["oficial"]["Rayo Vallecano"] = 'http://www.rayovallecano.es/';
teamURL["oficial"]["Granada"] = 'http://www.granadacf.es/';
teamURL["oficial"]["Betis"] = 'http://www.realbetisbalompie.es/';
teamURL["oficial"]["Celta"] = 'http://www.celtavigo.net/';
teamURL["oficial"]["Elche"] = 'http://www.elchecf.es/';

teamURL["AS"] = new Array;
teamURL["AS"]["Almería"] = 'http://www.as.com/futbol/equipo/Almería-85';
teamURL["AS"]["Athletic"] = 'http://www.as.com/futbol/equipo/Athletic-5';
teamURL["AS"]["Atlético"] = 'http://www.as.com/futbol/equipo/Atlético-42';
teamURL["AS"]["Barcelona"] = 'http://www.as.com/futbol/equipo/Barcelona-3';
teamURL["AS"]["Deportivo"] = 'http://www.as.com/futbol/equipo/Deportivo-7';
teamURL["AS"]["Espanyol"] = 'http://www.as.com/futbol/equipo/Espanyol-8';
teamURL["AS"]["Getafe"] = 'http://www.as.com/futbol/equipo/Getafe-172';
teamURL["AS"]["Málaga"] = 'http://www.as.com/futbol/equipo/Málaga-10';
teamURL["AS"]["Mallorca"] = 'http://www.as.com/futbol/equipo/Mallorca-11';
teamURL["AS"]["Osasuna"] = 'http://www.as.com/futbol/equipo/Osasuna-13';
teamURL["AS"]["Racing"] = 'http://www.as.com/futbol/equipo/Racing-15';
teamURL["AS"]["Real Madrid"] = 'http://www.as.com/futbol/equipo/Real Madrid-1';
teamURL["AS"]["Sevilla"] = 'http://www.as.com/futbol/equipo/Sevilla-53';
teamURL["AS"]["Sporting"] = 'http://www.as.com/futbol/equipo/Sporting-76';
teamURL["AS"]["Tenerife"] = 'http://www.as.com/futbol/equipo/Tenerife-162';
teamURL["AS"]["Valencia"] = 'http://www.as.com/futbol/equipo/Valencia-17';
teamURL["AS"]["Valladolid"] = 'http://www.as.com/futbol/equipo/Valladolid-18';
teamURL["AS"]["Villarreal"] = 'http://www.as.com/futbol/equipo/Villarreal-19';
teamURL["AS"]["Xerez"] = 'http://www.as.com/futbol/equipo/Xerez-254';
teamURL["AS"]["Zaragoza"] = 'http://www.as.com/futbol/equipo/Zaragoza-20';
teamURL["AS"]["Hércules"] = 'http://www.as.com/futbol/equipo/Hercules-93';
teamURL["AS"]["Real Sociedad"] = 'http://www.as.com/futbol/equipo/R-Sociedad-16';
teamURL["AS"]["Levante"] = 'http://www.as.com/futbol/equipo/Levante-136';
teamURL["AS"]["Rayo Vallecano"] = 'http://www.as.com/futbol/equipo/Rayo-2';
teamURL["AS"]["Granada"] = 'http://www.as.com/futbol/equipo/Granada-347';
teamURL["AS"]["Betis"] = 'http://www.as.com/futbol/equipo/Betis-171';
teamURL["AS"]["Celta"] = 'http://www.as.com/futbol/equipo/Celta-6';
teamURL["AS"]["Elche"] = 'http://www.as.com/futbol/equipo/Elche-121';

teamURL["CMN"] = new Array;
teamURL["CMN"]["Almería"] = 'http://www.comunio.es/clubInfo.phtml?cid=22';
teamURL["CMN"]["Athletic"] = 'http://www.comunio.es/clubInfo.phtml?cid=1';
teamURL["CMN"]["Atlético"] = 'http://www.comunio.es/clubInfo.phtml?cid=2';
teamURL["CMN"]["Barcelona"] = 'http://www.comunio.es/clubInfo.phtml?cid=3';
teamURL["CMN"]["Deportivo"] = 'http://www.comunio.es/clubInfo.phtml?cid=6';
teamURL["CMN"]["Espanyol"] = 'http://www.comunio.es/clubInfo.phtml?cid=7';
teamURL["CMN"]["Getafe"] = 'http://www.comunio.es/clubInfo.phtml?cid=8';
teamURL["CMN"]["Málaga"] = 'http://www.comunio.es/clubInfo.phtml?cid=65';
teamURL["CMN"]["Mallorca"] = 'http://www.comunio.es/clubInfo.phtml?cid=11';
teamURL["CMN"]["Osasuna"] = 'http://www.comunio.es/clubInfo.phtml?cid=12';
//teamURL["CMN"]["Racing"] = 'http://www.as.com/futbol/equipo/Racing-15';
teamURL["CMN"]["Real Madrid"] = 'http://www.comunio.es/clubInfo.phtml?cid=15';
teamURL["CMN"]["Sevilla"] = 'http://www.comunio.es/clubInfo.phtml?cid=17';
//teamURL["CMN"]["Sporting"] = 'http://www.as.com/futbol/equipo/Sporting-76';
//teamURL["CMN"]["Tenerife"] = 'http://www.as.com/futbol/equipo/Tenerife-162';
teamURL["CMN"]["Valencia"] = 'http://www.comunio.es/clubInfo.phtml?cid=18';
teamURL["CMN"]["Valladolid"] = 'http://www.comunio.es/clubInfo.phtml?cid=21';
teamURL["CMN"]["Villarreal"] = 'http://www.comunio.es/clubInfo.phtml?cid=19';
//teamURL["CMN"]["Xerez"] = 'http://www.as.com/futbol/equipo/Xerez-254';
teamURL["CMN"]["Zaragoza"] = 'http://www.comunio.es/clubInfo.phtml?cid=20';
//teamURL["CMN"]["Hércules"] = 'http://www.as.com/futbol/equipo/Hercules-93';
teamURL["CMN"]["Real Sociedad"] = 'http://www.comunio.es/clubInfo.phtml?cid=13';
teamURL["CMN"]["Levante"] = 'http://www.comunio.es/clubInfo.phtml?cid=10';
teamURL["CMN"]["Rayo Vallecano"] = 'http://www.comunio.es/clubInfo.phtml?cid=70';
teamURL["CMN"]["Granada"] = 'http://www.comunio.es/clubInfo.phtml?cid=71';
teamURL["CMN"]["Betis"] = 'http://www.comunio.es/clubInfo.phtml?cid=4';
teamURL["CMN"]["Celta"] = 'http://www.comunio.es/clubInfo.phtml?cid=5';
teamURL["CMN"]["Elche"] = 'http://www.comunio.es/clubInfo.phtml?cid=75';

teamURL["NMK"] = new Array;
teamURL["NMK"]["Almería"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/19/almeria';
teamURL["NMK"]["Athletic"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/7/athletic';
teamURL["NMK"]["Atlético"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/12/atletico';
teamURL["NMK"]["Barcelona"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/2/barcelona';
teamURL["NMK"]["Deportivo"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/21/deportivo';
teamURL["NMK"]["Espanyol"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/13/espanyol';
teamURL["NMK"]["Getafe"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/3/getafe';
teamURL["NMK"]["Málaga"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/4/malaga';
teamURL["NMK"]["Mallorca"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/9/mallorca';
teamURL["NMK"]["Osasuna"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/5/osasuna';
teamURL["NMK"]["Racing"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/15/racing';
teamURL["NMK"]["Real Madrid"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/16/real-madrid';
teamURL["NMK"]["Sevilla"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/1/sevilla';
teamURL["NMK"]["Sporting"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/17/sporting';
teamURL["NMK"]["Tenerife"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/22/tenerife';
teamURL["NMK"]["Valencia"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/20/valencia';
teamURL["NMK"]["Valladolid"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/18/valladolid';
teamURL["NMK"]["Villarreal"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/11/villarreal';
teamURL["NMK"]["Xerez"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/24/xerez';
teamURL["NMK"]["Zaragoza"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/23/zaragoza';
teamURL["NMK"]["Hércules"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/66/hercules';
teamURL["NMK"]["Real Sociedad"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/26/real-sociedad';
teamURL["NMK"]["Levante"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/25/levante';
teamURL["NMK"]["Rayo Vallecano"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/29/rayo-vallecano';
teamURL["NMK"]["Granada"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/30/granada';
teamURL["NMK"]["Betis"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/8/betis';
teamURL["NMK"]["Celta"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/31/celta';
teamURL["NMK"]["Elche"] = 'http://www.nomaskeine.com/estadisticas/comunio/equipo/32/elche';

teamURL["CPC"] = new Array;
teamURL["CPC"]["Almería"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=1';
teamURL["CPC"]["Athletic"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=2';
teamURL["CPC"]["Atlético"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=3';
teamURL["CPC"]["Barcelona"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=4';
teamURL["CPC"]["Deportivo"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=5';
teamURL["CPC"]["Espanyol"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=6';
teamURL["CPC"]["Getafe"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=7';
teamURL["CPC"]["Málaga"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=10';
teamURL["CPC"]["Mallorca"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=11';
teamURL["CPC"]["Osasuna"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=12';
//teamURL["CPC"]["Racing"] = 'http://www.as.com/futbol/equipo/Racing-15';
teamURL["CPC"]["Real Madrid"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=13';
teamURL["CPC"]["Sevilla"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=16';
//teamURL["CPC"]["Sporting"] = 'http://www.as.com/futbol/equipo/Sporting-76';
//teamURL["CPC"]["Tenerife"] = 'http://www.as.com/futbol/equipo/Tenerife-162';
teamURL["CPC"]["Valencia"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=18';
teamURL["CPC"]["Valladolid"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=43';
teamURL["CPC"]["Villarreal"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=19';
//teamURL["CPC"]["Xerez"] = 'http://www.as.com/futbol/equipo/Xerez-254';
teamURL["CPC"]["Zaragoza"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=20';
//teamURL["CPC"]["Hércules"] = 'http://www.as.com/futbol/equipo/Hercules-93';
teamURL["CPC"]["Real Sociedad"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=14';
teamURL["CPC"]["Levante"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=9';
teamURL["CPC"]["Rayo Vallecano"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=22';
teamURL["CPC"]["Granada"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=23';
teamURL["CPC"]["Betis"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=21';
teamURL["CPC"]["Celta"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=29';
teamURL["CPC"]["Elche"] = 'http://www.calculapuntoscomunio.com/estadisticas/equipo.php?id=33';

teamURL["CMZ"] = new Array;
teamURL["CMZ"]["Almería"] = 'http://www.comuniazo.com/equipos/almeria';
teamURL["CMZ"]["Athletic"] = 'http://www.comuniazo.com/equipos/athletic';
teamURL["CMZ"]["Atlético"] = 'http://www.comuniazo.com/equipos/atletico';
teamURL["CMZ"]["Barcelona"] = 'http://www.comuniazo.com/equipos/barcelona';
teamURL["CMZ"]["Deportivo"] = 'http://www.comuniazo.com/equipos/deportivo';
teamURL["CMZ"]["Espanyol"] = 'http://www.comuniazo.com/equipos/espanyol';
teamURL["CMZ"]["Getafe"] = 'http://www.comuniazo.com/equipos/getafe';
teamURL["CMZ"]["Málaga"] = 'http://www.comuniazo.com/equipos/malaga';
teamURL["CMZ"]["Mallorca"] = 'http://www.comuniazo.com/equipos/mallorca';
teamURL["CMZ"]["Osasuna"] = 'http://www.comuniazo.com/equipos/osasuna';
//teamURL["CMZ"]["Racing"] = 'http://www.as.com/futbol/equipo/Racing-15';
teamURL["CMZ"]["Real Madrid"] = 'http://www.comuniazo.com/equipos/real-madrid';
teamURL["CMZ"]["Sevilla"] = 'http://www.comuniazo.com/equipos/sevilla';
//teamURL["CMZ"]["Sporting"] = 'http://www.as.com/futbol/equipo/Sporting-76';
//teamURL["CMZ"]["Tenerife"] = 'http://www.as.com/futbol/equipo/Tenerife-162';
teamURL["CMZ"]["Valencia"] = 'http://www.comuniazo.com/equipos/valencia';
teamURL["CMZ"]["Valladolid"] = 'http://www.comuniazo.com/equipos/valladolid';
teamURL["CMZ"]["Villarreal"] = 'http://www.comuniazo.com/equipos/villareal';
//teamURL["CMZ"]["Xerez"] = 'http://www.as.com/futbol/equipo/Xerez-254';
teamURL["CMZ"]["Zaragoza"] = 'http://www.comuniazo.com/equipos/zaragoza';
//teamURL["CMZ"]["Hércules"] = 'http://www.as.com/futbol/equipo/Hercules-93';
teamURL["CMZ"]["Real Sociedad"] = 'http://www.comuniazo.com/equipos/real-sociedad';
teamURL["CMZ"]["Levante"] = 'http://www.comuniazo.com/equipos/levante';
teamURL["CMZ"]["Rayo Vallecano"] = 'http://www.comuniazo.com/equipos/rayo-vallecano';
teamURL["CMZ"]["Granada"] = 'http://www.comuniazo.com/equipos/granada';
teamURL["CMZ"]["Betis"] = 'http://www.comuniazo.com/equipos/betis';
teamURL["CMZ"]["Celta"] = 'http://www.comuniazo.com/equipos/celta';
teamURL["CMZ"]["Elche"] = 'http://www.comuniazo.com/equipos/elche';

/////////////////////////////////////////////////////////


//erpichi 20111123 - Diferencia en puntos con los demas jugadores
var userIdDiv = document.getElementById("userid");
var userId = "";
if (userIdDiv != null) {
	userId = userIdDiv.textContent.replace("ID:", "").replace("ES", "").replace( /\s/g, "" );
} else if (document.location.href.indexOf('&userId=') != -1) {
	userId = document.location.href.substring(document.location.href.indexOf('&userId=')).replace('&userId=', "");
}

/////////////////////////////////////////////////////////////////
//FUNCIONALIDADES QUE SE EJECUTAN EN TODO COMUNIO

/////////////////////////////////////////////////////////////////

/*--- Create a proper unsafeWindow object on browsers where it doesn't exist
(Chrome, mainly).
Chrome now defines unsafeWindow, but does not give it the same access to
a page's javascript that a properly unsafe, unsafeWindow has.
This code remedies that.
*/
var bGreasemonkeyServiceDefined     = false;

try {
if (typeof Components.interfaces.gmIGreasemonkeyService === "object") {
    bGreasemonkeyServiceDefined = true;
}
}
catch (err) {
//Ignore.
}

if ( typeof unsafeWindow === "undefined"  ||  ! bGreasemonkeyServiceDefined) {
unsafeWindow    = ( function () {
    var dummyElem   = document.createElement('p');
    dummyElem.setAttribute ('onclick', 'return window;');
    return dummyElem.onclick ();
} ) ();
}


//Function that hides or shows something
function toggleDisplay( obj , estilo){
	
	if( obj.style.display == "none" ){
		obj.style.display = estilo;
	}
	else{
		obj.style.display = "none";
	}
}
	

//Function get (it gets data from other web)
//url--> url of the web
//func--> function to do with the received data

try{
	//Try to assign GM_xmlhttpRequest to get function (firefox and emulated greasemonkey). It can do cross domain!
	get = function(url, func) {
	  GM_xmlhttpRequest({
		method: "GET",
		 url: url,
		 onload: function(xhr) { func(xhr.responseText); }
	  });
	}
}
catch( ex ){
	//If we cant with GM_xmlhttpRequest, assign general request (it cant do cross domain...)
	get = function(url, func) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			func(xhr.responseText);
		  }
		}
	}
}


try{
	//Try to assign GM_xmlhttpRequest to get function (firefox and emulated greasemonkey). It can do cross domain!
	getSync = function(url, func) {
	  GM_xmlhttpRequest({
		method: "GET",
		 url: url,
		 onload: function(xhr) { func(xhr.responseText); },
		 synchronous: true
	  });
	}
}
catch( ex ){
	//If we cant with GM_xmlhttpRequest, assign general request (it cant do cross domain...)
	getSync = function(url, func) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			func(xhr.responseText);
		  }
		}
	}
}

//erpichi 20111119 - Comprobar actualizacion BETA
function checkUpdateBETA(text) {

	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
	var ini = text.indexOf("@version");	//Search for number of version ( x.x.x )
	ini += ("@version").length;
	var end = text.indexOf( "//", ini );
//	var ini = text.indexOf("<b>Version:</b>");	//Search for number of version ( x.x.x )
//	ini += ("<b>Version:</b>").length;
//	var end = text.indexOf( "<", ini );

	//erpichi 20111119 - Comprobar actualizacion BETA
	//text = text.substring( ini+1, ini+6 );
	text = text.substring( ini+1, end );
	text = text.replace( /\s/g, "" );		//Clear white spaces
	//erpichi 20111114
	var actualizar = false;
	var serverVersion = text.split(".");
	var userVersion = version.split(".");
	//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
	while (serverVersion.length > userVersion.length) {
		userVersion[userVersion.length] = 0;
	} 
	for (var i = 0; i < serverVersion.length && i < userVersion.length; i++) {
		//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
		if (parseInt(serverVersion[i]) > parseInt(userVersion[i])) {
			actualizar = true;
			break;
		} else if (parseInt(serverVersion[i]) < parseInt(userVersion[i])) {
			actualizar = false;
			break;
		}
	}
	if(actualizar) {
		update = '<a target="_blank" href="http://userscripts.org/scripts/show/118530" style="text-decoration: none;">'
			+ '<span class="button02">Probar v' + text + ' BETA</span></a>';
		
		if (document.getElementById("updateVersion") != null) {
			document.getElementById("updateVersion").innerHTML += update;
		}	
	}
}

function checkUpdate(text) {

	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
	var ini = text.indexOf("@version");	//Search for number of version ( x.x.x )
	ini += ("@version").length;
	var end = text.indexOf( "//", ini );
//	var ini = text.indexOf("<b>Version:</b>");	//Search for number of version ( x.x.x )
//	ini += ("<b>Version:</b>").length;
//	var end = text.indexOf( "<", ini );

	//erpichi 20111119 - Comprobar actualizacion BETA
	//text = text.substring( ini+1, ini+6 );
	text = text.substring( ini+1, end );
	text = text.replace( /\s/g, "" );		//Clear white spaces
	//erpichi 20111114
	var actualizar = false;
	var serverVersion = text.split(".");
	var userVersion = version.split(".");
	//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
	while (serverVersion.length > userVersion.length) {
		userVersion[userVersion.length] = 0;
	} 
	for (var i = 0; i < serverVersion.length && i < userVersion.length; i++) {
		//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
		if (parseInt(serverVersion[i]) > parseInt(userVersion[i])) {
			actualizar = true;
			break;
		} else if (parseInt(serverVersion[i]) < parseInt(userVersion[i])) {
			actualizar = false;
			break;
		}
	}
	if( text.split(".").length < 3 ){	//Error if there are not at least 3 numbers
		update = '<span class="button02"><a href="javascript:;">Error al comprobar la versión</a></span>';
		//erpichi 20111114
	} else if(!actualizar) { //text == version ){				//Using the newest version
		update = '<span class="button02"><a href="javascript:;">Versión actualizada</a></span><span class="button02"><a id="reparaDatos" href="javascript:" title="En caso de que los datos no carguen correctamente pulsa aquí para repararlos.">Reparar datos</a></span>';
	} else{	//New update!
		//erpichi 20111114
		//update = '<span class="button02">Versión vieja BETA</span>' + 
		 //'<a href="http://userscripts.org/scripts/show/88692"> Actualizar!</a>'	
		update = '<span class="button02" style="background: red;"><a target="_blank" href="http://userscripts.org/scripts/show/118530" style="text-decoration: none;">Actualizar a v' + text + '</a></span>';
//			update = '<a target="_blank" title="Se perderá la funcionalidad BETA" href="http://userscripts.org/scripts/show/88692" style="text-decoration: none;">'
//				+ '<span class="button02">Actualizar a v' + text + '</span></a>'

		if(avisarActualizacion && confirm("Esta disponible una nueva versión (Script BETA v" + text + "). ¿Quieres abrir la página del script en una nueva ventana para instalarla?")) {
			window.open("http://userscripts.org/scripts/show/118530");
		}
	}
	
	if (document.getElementById("updateVersion") != null) {
		document.getElementById("updateVersion").innerHTML = update;
		if (document.getElementById("socialnetworks") != null) {
			document.getElementById("socialnetworks").style.position="static";
		}
		
		var reparaDatos = document.getElementById("reparaDatos");
		if (reparaDatos != null) {
			reparaDatos.addEventListener( "click", function(){ readScriptData(true);}, true );
		}
	}

//erpichi 20111119 - Poner comprobando.. y dejarlo en segundo plano
//	//Search for status player and change it to SCRIPTPlayer with the number of version of the script
//	var span = document.getElementsByTagName("span");
//	for( var i=0; i<span.length; i++){
//
//		//plusplayer?
//		if (span[i].textContent == "Plus" ){
//			plusPlayer = true;
//		}
//		//or basic?
//		if (span[i].textContent == "basic" ){
//			span[i].textContent = "SCRIPT BETA ";
//			
//			//add it!
//			span[i+1].innerHTML += '<br/><br/><span class="button02">v' + version + '</span>' + update;
//			document.getElementById('kicker').style.width = '300px';
//			document.getElementById('kicker').style.marginLeft = '500px';
//			break;
//		}
//	}
	
	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
	//erpichi 20111119 - Comprobar actualizacion BETA
	 //get( "http://userscripts.org/scripts/show/118530", checkUpdateBETA );	//Check for updates (Only for function get with cross domain)
//	 get( "http://userscripts.org/scripts/source/118530.meta.js", checkUpdateBETA );	//Check for updates (Only for function get with cross domain)
}

//erpichi 20111119 - Poner comprobando.. y dejarlo en segundo plano
//Search for status player and change it to SCRIPTPlayer with the number of version of the script
var updateSearch = '<span id="updateVersion"><span class="button02"><a href="team_news.phtml" title="Se redireccionará a la página de noticias, que es donde se buscan actualizaciones.">Comprobar actualizaciones</a></span></span><span id="mantenerSesionSpan"></span>';
if (document.location.href.indexOf('team_news.phtml') != -1) {
	updateSearch = '<span id="avisarActualizacionSpan"></span><span id="updateVersion"><span class="button02"><a href="javascript:;">Comprobando la versión...</a></span></span><span id="mantenerSesionSpan"></span>';
}

var span = document.getElementsByTagName("span");
for( var i=0; i<span.length; i++){

	//plusplayer?
	if (span[i].textContent == "Plus" ){
		plusPlayer = true;
		comUser = "Plus Player";
		span[i].textContent = SCRIPTName + " Plus";
		
		//add it!
		span[i+1].innerHTML += '<p><span class="button02"><a target="_blank" href="http://userscripts.org/scripts/show/118530" title="Visitar la página del script">v' + version + '</a></span>' + updateSearch + "</p>";
		document.getElementById('kicker').style.width = '300px';
		document.getElementById('kicker').style.marginLeft = '500px';
		break;
	}
	//or basic?
	if (span[i].textContent == "basic" ){
		basicPlayer = true;
		comUser = "Basic Player";
		span[i].textContent = SCRIPTName + " ";
		
		//add it!
		span[i+1].innerHTML += '<p><span class="button02"><a target="_blank" href="http://userscripts.org/scripts/show/118530" title="Visitar la página del script">v' + version + '</a></span>' + updateSearch + "</p>";
		document.getElementById('kicker').style.width = '300px';
		document.getElementById('kicker').style.marginLeft = '500px';
		break;
	}
}

var avisarActualizacionValue = "";
var avisarActualizacionStorage = localStorage.getItem("avisarActualizacion");
if (avisarActualizacionStorage != null && avisarActualizacionStorage == "false") {
	avisarActualizacion = false;
} else {
	avisarActualizacionValue = "checked=\"checked\"";
}
var alertaActualizacion = '<span class="button02"><a id="avisarActualizacion" href="javascript:" title="Activa/Desactiva el aviso de actualizaciones"><input type="checkbox" id="avisarActualizacionCheck" ' + avisarActualizacionValue + '><span id="avisarActualizacionText">Avisar actualización</span></a> </span>';

if (document.getElementById("avisarActualizacionSpan") != null) {
	document.getElementById("avisarActualizacionSpan").innerHTML = alertaActualizacion;
	
	var avisarActualizacionCheck = document.getElementById("avisarActualizacionCheck");
	if (avisarActualizacionCheck != null) {
		avisarActualizacionCheck.addEventListener( "click", function(){ activaAvisarActualizacion(avisarActualizacionCheck.checked);}, true );
	}
}

var mantenerSesionValue = "";
var mantenerSesionStorage = localStorage.getItem("mantenerSesion");
if (mantenerSesionStorage != null && mantenerSesionStorage == "true") {
	mantenerSesionValue = "checked=\"checked\"";

	var comunio = "";
	if (window.location.href.indexOf("https://") != -1) {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
	} else {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
	}
//	setTimeout(function(){get(comunio + '/team_news.phtml', function(text2) {sesionMantenida(text2, comunio)}  )}, 1000*60*10);
	var timeSesion = 1000*60*10;
	setTimeout(function(){window.location.href = window.location.href;}, timeSesion);
	setTimeout(function(){mostrarSesionTime(timeSesion - 1000);}, 1000);
//	setTimeout(function(){get(window.location.href, function(text2) {sesionMantenida(text2, comunio)}  )}, 1000*60*10);
}
var updateSesion = '<span class="button02"><a id="mantenerSesion" href="javascript:" title="Intenta mantener la sesión activa"><input type="checkbox" id="mantenerSesionCheck" ' + mantenerSesionValue + '><span id="mantenerSesionText">Mantener sesión</span></a> </span>';

if (document.getElementById("mantenerSesionSpan") != null) {
	document.getElementById("mantenerSesionSpan").innerHTML = updateSesion;
	
	var mantenerSesion = document.getElementById("mantenerSesionCheck");
	if (mantenerSesion != null) {
		mantenerSesion.addEventListener( "click", function(){ activaMantenerSesion(mantenerSesion.checked);}, true );
	}
}

function mostrarSesionTime(value) {
	var mantenerSesionText = document.getElementById("mantenerSesionText");
	if (mantenerSesionText != null) {
		setTimeout(function(){mostrarSesionTime(value - 1000);}, 1000);
		var timeMin = 0;
		var timeSeg = 0;
		if (value > 0) {
			timeMin = parseInt(((value)/1000/60));
			timeSeg = parseInt(((value)/1000)) - timeMin*60; 
		}
		
		var timeMinTxt = timeMin + "";
		while (timeMinTxt.length < 2) {
			timeMinTxt = "0" + timeMinTxt;
		}
		var timeSegTxt = timeSeg + "";
		while (timeSegTxt.length < 2) {
			timeSegTxt = "0" + timeSegTxt;
		}
		
		var time = timeMinTxt + ":" + timeSegTxt;
		mantenerSesionText.innerHTML = "Mantener sesión (" + time + ")";
	}
}

function activaAvisarActualizacion(value) {
	if (!value) {
		localStorage.setItem("avisarActualizacion", "false");
	} else {
		localStorage.removeItem("avisarActualizacion");
	}
	window.location.reload();
}

function activaMantenerSesion(value) {
	if (value) {
		localStorage.setItem("mantenerSesion", "true");
	} else {
		localStorage.removeItem("mantenerSesion");
	}
	window.location.reload();
}

function sesionMantenida(text, comunio) {
//	setTimeout(function(){get(comunio + '/team_news.phtml', function(text2) {sesionMantenida(text2, comunio)}  )}, 1000*60*10);
	setTimeout(function(){get(window.location.href, function(text2) {sesionMantenida(text2, comunio)}  )}, 1000*60*10);
}

//erpichi 20111123 - No hacemos nada si es plus player
//if (basicPlayer) {
if (true) {
	if (document.location.href.indexOf('team_news.phtml') != -1) {
		 get( "http://userscripts.org/scripts/source/118530.meta.js", checkUpdate );
	} else {
		
	}
	
	
	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
//	 get( "http://userscripts.org/scripts/source/118530.meta.js", checkUpdate );
//	 get( "http://userscripts.org/scripts/source/88692.meta.js", checkUpdate );	//Check for updates (Only for function get with cross domain)
	// get( "http://userscripts.org/scripts/show/88692", checkUpdate );	//Check for updates (Only for function get with cross domain)
} else if (plusPlayer) {
//	return;
}
 
 
// Excluimos de la ejecucion del resto del SCRIPT cuando estamos en el foro
// exclude directive only works in FF
 
//erpichi 20111122 - Se cambia match por indexOf, que el match no va bien
//if (document.location.href.match('www*.comunio.es/external/*') ) {
if (document.location.href.indexOf('external/phpBB2') != -1) {
    return;
}
//if ( document.location.href.match('www*.comunio.es/team_news.phtml?postMessage_x=34')) {
if ( document.location.href.indexOf('team_news.phtml?postMessage_x=34') != -1) {
    return;
}

//if ( document.location.href.match('http://www*.comunio.es/team_admin.phtml')) {   return;}
if ( document.location.href.indexOf('team_admin.phtml') != -1) {  return;}
//if ( document.location.href.match('http://www*.comunio.es/undoTransactions.phtml')) {    return;}
if ( document.location.href.indexOf('undoTransactions.phtml') != -1) {    return;}
if ( document.location.href.indexOf('matrix.phtml') != -1) {    return;}
if ( window.location.href.indexOf( 'postMessage_x' ) != -1) {    return;}
if ( window.location.href.indexOf( 'signup.phtml' ) != -1) {    return;}

//Erpichi 20111123 - En clubinfo no hacemos nada
//if(window.location.href.indexOf('clubInfo.phtml') != -1) {return;}

if(window.location.href.indexOf('listTradables.phtml') != -1) {return;}
if(window.location.href.indexOf('invite.phtml') != -1) {return;}

function readFotoPlayer(name) {
	if (showFotoCMZ) {
		return playerIDNameFotoCMZ[name];
	} else if (showFotoCMN) {
		return playerIDNameFotoCMN[name];
	} else {
		return playerIDNameFoto[name];
	}
}

function readScriptData(forzar){
	var scriptDataString = localStorage.getItem("scriptData");
	var scriptVersionString = localStorage.getItem("scriptVersion");
	var scriptActualizadoString = localStorage.getItem("scriptActualizado");
//	alert(scriptDataString);
	if (!forzar
			&& scriptDataString != null && scriptDataString.length > 1
			&& scriptVersionString != null && scriptVersionString.length > 1
			&& scriptActualizadoString != null && scriptActualizadoString.length > 1){
		updateScriptData(false,null,null,true,true);
		scriptDataString = scriptDataString.split("/-/");
		for( var i=0; i<scriptDataString.length; i+=24 ){
			if (scriptDataString[i+1] != "-")
				playerID[ scriptDataString[i] ] = scriptDataString[i+1];
			if (scriptDataString[i] != "-")
				playerIDName[ scriptDataString[i+1] ] = scriptDataString[i];
			if (scriptDataString[i+2] != "-")
				playerIDNamePuntos[ scriptDataString[i] ] = scriptDataString[i+2];
			var estadoArray = new Array();
			estadoArray[0] = scriptDataString[i+3];
			estadoArray[1] = scriptDataString[i+4];
			estadoArray[2] = scriptDataString[i+5];
			estadoArray[3] = scriptDataString[i+6];
			estadoArray[4] = scriptDataString[i+7];
			if (scriptDataString[i+3] != "-")
				playerIDNameEstado[ scriptDataString[i] ] = estadoArray;
			if (scriptDataString[i+8] != "-")
				playerIDNameEntra[ scriptDataString[i] ] = scriptDataString[i+8];
			if (scriptDataString[i+9] != "-")
				playerIDNameSale[ scriptDataString[i] ] = scriptDataString[i+9];
			if (scriptDataString[i+10] != "-")
				playerIDNamePicas[ scriptDataString[i] ] = scriptDataString[i+10];
			if (scriptDataString[i+11] != "-")
				playerIDNameGoles[ scriptDataString[i] ] = scriptDataString[i+11];
			if (scriptDataString[i+12] != "-")
				playerIDNameTarjetas[ scriptDataString[i] ] = scriptDataString[i+12];
			if (scriptDataString[i+13] != "-")
				playerIDNameMarcador[ scriptDataString[i] ] = scriptDataString[i+13];
			if (scriptDataString[i+14] != "-")
				playerIDNameFoto[ scriptDataString[i] ] = scriptDataString[i+14];

			    playerIDNameFotoCMN[ scriptDataString[i] ] = "<img  height='" + playerFotoSize + "'  src=\"tradablePhoto.phtml/m/" + playerID[ scriptDataString[i] ] + ".gif\">";
				playerIDNameFotoCMZ[ scriptDataString[i] ] = "<img height='" + playerFotoSize + "' src='http://www.comuniazo.com/img/players/foto.php?id=" + playerID[ scriptDataString[i] ] + "&utm_source=scriptbeta&utm_medium=foto&utm_campaign=scripts' onerror='this.onerror=null;this.src=\"http://www.comuniazo.com/img/players/0.jpg?utm_source=scriptbeta&utm_medium=foto&utm_campaign=scripts\"' />";
			if (scriptDataString[i+15] != "-")
				playerIDNameUrl[ scriptDataString[i] ] = scriptDataString[i+15];
			if (scriptDataString[i+16] != "-")
				playerIDNameEquipo[ scriptDataString[i] ] = scriptDataString[i+16];
			if (scriptDataString[i+17] != "-")
				playerIDNamePosicion[ scriptDataString[i] ] = scriptDataString[i+17];
			if (scriptDataString[i+18] != "-")
				playerIDNameTotales[ scriptDataString[i] ] = scriptDataString[i+18];
			if (scriptDataString[i+19] != "-")
				playerIDNameMercado[ scriptDataString[i] ] = scriptDataString[i+19];
			if (scriptDataString[i+20] != "-")
				playerIDCpC[ scriptDataString[i] ] = scriptDataString[i+20];
			if (scriptDataString[i+21] != "-")
				playerIDNameEficiencia[ scriptDataString[i] ] = scriptDataString[i+21];
			if (scriptDataString[i+22] != "-")
				playerIDNameValor[ scriptDataString[i] ] = scriptDataString[i+22];
			if (scriptDataString[i+23] != "-")
				playerIDNameMediavalor[ scriptDataString[i] ] = scriptDataString[i+23];
		}

		var scriptJornadaString = localStorage.getItem("scriptJornada");
		var scriptActualizadoString = localStorage.getItem("scriptActualizado");

		var mostrarCronicas = true;
		
		if (mostrarCronicas) {
			if (scriptJornadaString != null && scriptJornadaString.length > 0) {
				var textoActualizado = "";
				if (scriptActualizadoString != null && scriptActualizadoString.length > 0) {
					textoActualizado = " (" + scriptActualizadoString + ")";
				}
				
				jornadaCronica = "<span class='button02'><a id='reparaDatos' href=\"javascript:\" title='Click para reparar los datos'>Datos actualizados a Jornada " + scriptJornadaString + textoActualizado +"</a></span>";
				var botonUpdate = document.getElementById("updateVersion");
				if (botonUpdate != null) {
					botonUpdate.innerHTML += jornadaCronica;
				}

				var reparaDatos = document.getElementById("reparaDatos");
				if (reparaDatos != null) {
					reparaDatos.addEventListener( "click", function(){ readScriptData(true);}, true );
				}
			}
		}
	} else {
		localStorage.setItem("scriptData", "");
		localStorage.setItem("scriptVersion", "");
		localStorage.setItem("scriptActualizado", "");
		updateScriptData(true,null,null,true,true);
	}
	return;
}

readScriptData(false);

//Erpichi 20111209 - En informacion de jugador no hacemos nada
if(window.location.href.indexOf('clubInfo.phtml') != -1) {
	var teamName = document.getElementById("title").childNodes[0].textContent;
	
	buscarForoEquipo(teamName);
	//return;
}

//Erpichi 20111209 - En informacion de jugador no hacemos nada
if(window.location.href.indexOf('/primera_division/') != -1) {
	var playerURL = window.location.href.substr(window.location.href.indexOf('/primera_division/')).replace('/primera_division/','').replace(".html","");

	var playerSplit = playerURL.split("-");
	var player_id = playerSplit[0];
	buscarForo(player_id);
	return;
}

//Erpichi 20111130 - En tradableInfo.phtml no hacemos nada
if(window.location.href.indexOf('tradableInfo.phtml') != -1) {
	var playerURL = "";
	if (window.location.href.indexOf('&') != -1) {
		playerURL = window.location.href.substring(window.location.href.indexOf('tradableInfo.phtml?tid='), window.location.href.indexOf('&')).replace('tradableInfo.phtml?tid=','');
	} else {
		playerURL = window.location.href.substring(window.location.href.indexOf('tradableInfo.phtml?tid=')).replace('tradableInfo.phtml?tid=','');
	}

	var playerSplit = playerURL.split("-");
	var player_id = playerSplit[0];
	buscarForo(player_id);
	return;
}


//erpichi20111101
function outerHTMLJugador(element){
	var div = document.createElement('div');
	div.appendChild(element);
	return div.innerHTML;
}

//erpichi20111103
function calculaEstadoScriptJugador(jugadorNombre) {
	var image = document.createElement('img');
//	var urlBaja = "http://www.calculapuntoscomunio.com/estados/";
//	var urlBaja = "http://www.comuniazo.com/estados";
	var urlBajaDefault = "http://www.comuniazo.com/comunio/lesionados";
	var urlBaja = "http://www.comuniazo.com/comunio/lesionados";
  if ( playerIDNameEstado[jugadorNombre]) {
		switch(playerIDNameEstado[jugadorNombre][0]) {   
		case "molestias":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es duda: ' + playerIDNameEstado[jugadorNombre][1] + " - " + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "lesion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
			image.title=jugadorNombre + ' esta lesionado: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "acum_tarjetas":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por acumulación de tarjetas: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "seleccion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es baja: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "doble_tarjeta":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
			image.title=jugadorNombre + ' es baja por doble amarilla: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "roja_directa":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por roja directa: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "vendido":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' ha sido vendido, ¿no?';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "no_convocado":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' no ha sido convocado en la última jornada';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			default:
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
		};	
	    image.title += " - Click aquí para visitar la fuente de la noticia.";
	} else {
		image.title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
		image.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
	    image.title += " - Click aquí para ver los lesionados/sancionados";
	}
    if (urlBaja == "" || urlBaja == "-") {
    	urlBaja = urlBajaDefault;
    }
  
	return "<a href='javascript:;' onclick=\"window.open('" + urlBaja + "?utm_source=scriptbeta&utm_medium=bajas&utm_campaign=scripts')\" >" + outerHTMLJugador(image) + "</a>";
}

function buscarForo(idPlayer){

	var normalizeAndSpaces = (function() {
		  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç ", 
		      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc-",
		      mapping = {};
		 
		  for(var i = 0, j = from.length; i < j; i++ )
		      mapping[ from.charAt( i ) ] = to.charAt( i );
		 
		  return function( str ) {
		      var ret = [];
		      for( var i = 0, j = str.length; i < j; i++ ) {
		          var c = str.charAt( i );
		          if( mapping.hasOwnProperty( str.charAt( i ) ) )
		              ret.push( mapping[ c ] );
		          else
		              ret.push( c );
		      }      
		      return ret.join( '' ).toLowerCase();
		  }
		 
		})();
	
	var playerName = playerIDName[idPlayer];
	var comunio = "";
	if (window.location.href.indexOf("https://") != -1) {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
	} else {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
	}
	buscar = '<span class="contenttext" style="background-color: rgb(21, 45, 12); display: inline-block; padding: 0.5em;">'
//		+ '<img src="http://www.comunio.es/tradablePhoto.phtml/l/' + idPlayer + '.gif?pln=1" style="border: medium none; float: left;">'
		+ replaceAll(readFotoPlayer(playerName), "height='" + playerFotoSize + "'", "style='border: medium none; float: left;'")
		+ '<form style="float: left; margin-left: 0.5em;" target="_blank" method="POST" action="' + comunio +'/external/phpBB2/search.php?mode=results">'
		+ '<div style="display:none;">'
		+ '<input type="text" size="30" name="search_keywords" class="textarea" style="width:300px;" value=\'' + playerName + '\'>'
		+ '<input type="radio" checked="checked" value="any" name="search_terms">'
		+ '<input type="radio" value="all" name="search_terms">'
		+ '<input type="text" size="30" name="search_author" class="textarea" style="width:300px;">'
		+ '<select name="search_forum" class="select"><option value="-1">Todos los disponibles</option><option value="5">Reglas del Foro / Forenregeln</option><option value="27">Noticias de la Liga</option><option value="8">Análisis de los partidos</option><option value="28">Equipos de la liga BBVA y jugadores</option><option value="34">Competiciones europeas</option><option value="35">Selecciones</option><option value="36">Otras ligas y competiciones</option><option value="10">Titulares o no. ¿Jugarán?</option><option value="38">Alineaciones </option><option value="39">Fichajes</option><option value="3">Conversación</option><option value="33">Estadísticas</option><option value="13">Bugs, problemas y dudas sobre Comunio:</option><option value="29">Errores de puntuación</option><option value="14">Sugerencias:</option><option value="15">Administración del usuario</option><option value="23">Off Topic ES (español / spanisch)</option><option value="6">Talk</option><option value="7">Spielanalyse</option><option value="17">Suche Mitspieler</option><option value="24">Statistiken</option><option value="2">Feature Requests</option><option value="11">Userverwaltung</option><option value="40">BUGS</option><option value="22">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="search_time" class="select"><option selected="selected" value="0">Todos los mensajes</option><option value="1">1 Día</option><option value="7">7 Días</option><option value="14">2 Semanas</option><option value="30">1 Mes</option><option value="90">3 Meses</option><option value="180">6 Meses</option><option value="364">1 Año</option></select><input type="radio" value="all" name="search_fields"><input type="radio" value="msgonly" name="search_fields"> <input type="radio" checked="checked" value="titleonly" name="search_fields">'
		+ '<select name="search_cat" class="select"><option value="-1">Todos los disponibles</option><option value="3">Reglas del Foro / Forenregeln</option><option value="10">LIGA BBVA</option><option value="2">MÁS FÚTBOL </option><option value="11">DEBATE SOBRE LOS EQUIPOS </option><option value="12">ESTADÍSTICAS </option><option value="6">SOPORTE</option><option value="9">Off Topic ES (español / spanisch)</option><option value="4">Talk (deutsch) / Conversación (aléman)</option><option value="1">Support (deutsch) / Soporte (aléman)</option><option value="8">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="sort_by" class="select"><option value="0">Fecha de publicación</option><option value="1">Asunto del Mensaje</option><option value="2">Título del Tema</option><option value="3">Autor</option><option value="4">Foro</option></select><input type="radio" value="ASC" name="sort_dir"><input type="radio" checked="" value="DESC" name="sort_dir">'
		+ '<input type="radio" value="posts" name="show_results"><input type="radio" checked="checked" value="topics" name="show_results">'
		+ '<select name="return_chars" class="select"><option value="-1">Todos los disponibles</option><option value="0">0</option><option value="25">25</option><option value="50">50</option><option value="100">100</option><option selected="selected" value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option><option value="900">900</option><option value="1000">1000</option></select>'
		+ '</div>'
		+ '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="submit" value="Buscar en el Foro" class="button">'
		+ '<span class="button02" style="padding-left: 0.5em; font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;"><a href=\'http://www.google.es/search?q=' + playerName + '+comunio&ie=utf-8&oe=utf-8&aq=t\' target="_blank">Buscar en Google</a></span>';	

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en NomasKeine" class="button"  onclick="window.open(\'http://www.nomaskeine.com/estadisticas/comunio/jugador/' + idPlayer + '/' + playerName.replace(/\"/g, "&quot;") + '\');return false;">';

	var idPlayerCpC = playerIDCpC[playerName];
	if (idPlayerCpC != "" && idPlayerCpC != "-1") {
		buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en CpC" class="button"  onclick="window.open(\'http://www.calculapuntoscomunio.com/estadisticas/jugador.php?id=' + idPlayerCpC + '\');return false;">';
		
	}
	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en Comuniazo" class="button"  onclick="window.open(\'http://www.comuniazo.com/jugadores/' + idPlayer + '?utm_source=scriptbeta&utm_medium=jugador&utm_campaign=scripts\');return false;">';
		buscar += '</form>'
				+ '</span>';

	if (document.getElementById("title") != null) {
		document.getElementById("title").innerHTML += buscar;
	}
	
//	if (document.getElementById("contentfullsizeib") != null) {
//		document.getElementById("contentfullsizeib").innerHTML = buscar + document.getElementById("contentfullsizeib").innerHTML;
//	}

	var jugEstado = calculaEstadoScriptJugador(playerName);
	var jugEquipo = playerIDNameEquipo[playerName];
	var jugPuntos = "-";

	var valorEntra = "";
	var valorSale = "";
	var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="' + images['nojugadoEquipo'] + '" alt="' + playerName + ' su equipo aun no ha jugado en la última jornada" title="' + playerName + ' su equipo aun no ha jugado en la última jornada">';
	if (playerIDNamePuntos[playerName] != null) {
		jugPuntos = playerIDNamePuntos[playerName];
		var entra = playerIDNameEntra[playerName];
		var sale = playerIDNameSale[playerName];
		var url = playerIDNameUrl[playerName];

//		camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
		camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la última jornada" title="' + playerName + ' ha jugado de titular en la última jornada. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
		if (sale != null && sale != "-") {
//			camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la última jornada - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la última jornada - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
			camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la última jornada - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la última jornada - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
			valorSale = '<small style="display: block;color: red;font-weight: bold;">' + sale + "\'</small>";
		}
		if (entra != null && entra != "-") {
//			camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la última jornada - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la última jornada - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/suit.gif">';
			camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la última jornada - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la última jornada - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['suplente'] + '">';
			valorEntra = '<small style="display: block;color: #3F5B34;font-weight: bold;">' + entra + '\'</small>';
		}
		if (playerIDNamePuntos[playerName] == "s.c.") {
			camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="15" src="' + images['nojugado'] + '" alt="' + playerName + ' no ha jugado en la última jornada" title="' + playerName + ' no ha jugado en la última jornada">';
		}
		camiseta = valorEntra + "<a href='javascript:;' onclick=\"window.open('" + url + "')\" >" + camiseta + "</a>" + valorSale;
	}
	var imgPicas = (playerIDNamePicas[playerName]) ? playerIDNamePicas[playerName]:"-";
	imgPicas = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Picas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="display:inline-block;" id="cronicPicas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgPicas  + '</div>' + "</a>";

	var imgGoles = (playerIDNameGoles[playerName]) ? playerIDNameGoles[playerName]:"-";
	imgGoles = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Goles. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="display:inline-block;" id="cronicGoles' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgGoles  + '</div>' + "</a>";
	
	var imgTarjetas = (playerIDNameTarjetas[playerName]) ? playerIDNameTarjetas[playerName]:"-";
	imgTarjetas = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Tarjetas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="display:inline-block;" id="cronicTarjetas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgTarjetas  + '</div>' + "</a>";
	
	var imgMarcador = (playerIDNameMarcador[playerName]) ? playerIDNameMarcador[playerName]:"-";
	imgMarcador = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Marcador. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="" id="cronicMarcador' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgMarcador  + '</div>' + "</a>";
	
	var tdEquipo = '<a href="' + teamURL[ GM_getValue( "URLSrc", "oficial" ) ][ jugEquipo ] + '" target="_blank"><img src="' + images[ jugEquipo ] + '" alt="' + jugEquipo +'" title="' +jugEquipo + '" border="0" /></a>';
	var trEstado = '<tr class="tr1"><td>Estado: </td><td style="text-align:center;">' + jugEstado + '</td></tr>';
	var trPuntos = '<tr class="tr1"><td>Puntos (Última jornada): </td><td style="text-align:right;">' + getPuntosColor(jugPuntos) + '</td></tr>';
	var trCamiseta = '<tr class="tr1"><td>Participación (Última jornada): </td><td style="text-align:center;">' + camiseta + '</td></tr>';
	var trPicas = '<tr class="tr1"><td>Nota (Última jornada): </td><td style="text-align:center;">' + imgPicas + '</td></tr>';
	var trGoles = '<tr class="tr1"><td>Goles (Última jornada): </td><td style="text-align:center;">' + imgGoles + '</td></tr>';
	var trTarjeta = '<tr class="tr1"><td>Tarjetas (Última jornada): </td><td style="text-align:center;">' + imgTarjetas + '</td></tr>';
	var trMarcador = '<tr class="tr1"><td>Marcador (Última jornada): </td><td style="text-align:center;">' + imgMarcador + '</td></tr>';
	if (document.getElementById("contentfullsizeib") != null) {
		var divTablaJug = document.getElementById("contentfullsizeib");
		var tablaJug = divTablaJug.getElementsByTagName("table");
		if (tablaJug.length > 0) {
			var trsTablaJug = tablaJug[0].getElementsByTagName("tr");
			if (trsTablaJug.length > 1) {
				var tdsTablaJug = trsTablaJug[1].getElementsByTagName("td");
				if (tdsTablaJug.length > 1) {
					tdsTablaJug[1].innerHTML = tdEquipo;
				}
			}
			tablaJug[0].innerHTML += trEstado + trPuntos + trCamiseta + trPicas + trGoles +  trTarjeta + trMarcador;
		}
	}
	
}



function buscarForoEquipo(teamName){
	var playerName = playerIDName[idPlayer];
	var comunio = "";
	if (window.location.href.indexOf("https://") != -1) {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
	} else {
		comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
	}
	buscar = '<span class="contenttext" style="background-color: rgb(21, 45, 12); display: inline-block; padding: 0.5em;">'
		+ '<img alt="teamName"  style="border: medium none; float: left;" width="150px" src="' + images[teamName] + '">'
		+ '<form style="float: left; margin-left: 0.5em;" target="_blank" method="POST" action="' + comunio +'/external/phpBB2/search.php?mode=results">'
		+ '<div style="display:none;">'
		+ '<input type="text" size="30" name="search_keywords" class="textarea" style="width:300px;" value=\'' + teamName + '\'>'
		+ '<input type="radio" checked="checked" value="any" name="search_terms">'
		+ '<input type="radio" value="all" name="search_terms">'
		+ '<input type="text" size="30" name="search_author" class="textarea" style="width:300px;">'
		+ '<select name="search_forum" class="select"><option value="-1">Todos los disponibles</option><option value="5">Reglas del Foro / Forenregeln</option><option value="27">Noticias de la Liga</option><option value="8">Análisis de los partidos</option><option value="28">Equipos de la liga BBVA y jugadores</option><option value="34">Competiciones europeas</option><option value="35">Selecciones</option><option value="36">Otras ligas y competiciones</option><option value="10">Titulares o no. ¿Jugarán?</option><option value="38">Alineaciones </option><option value="39">Fichajes</option><option value="3">Conversación</option><option value="33">Estadísticas</option><option value="13">Bugs, problemas y dudas sobre Comunio:</option><option value="29">Errores de puntuación</option><option value="14">Sugerencias:</option><option value="15">Administración del usuario</option><option value="23">Off Topic ES (español / spanisch)</option><option value="6">Talk</option><option value="7">Spielanalyse</option><option value="17">Suche Mitspieler</option><option value="24">Statistiken</option><option value="2">Feature Requests</option><option value="11">Userverwaltung</option><option value="40">BUGS</option><option value="22">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="search_time" class="select"><option selected="selected" value="0">Todos los mensajes</option><option value="1">1 Día</option><option value="7">7 Días</option><option value="14">2 Semanas</option><option value="30">1 Mes</option><option value="90">3 Meses</option><option value="180">6 Meses</option><option value="364">1 Año</option></select><input type="radio" value="all" name="search_fields"><input type="radio" value="msgonly" name="search_fields"> <input type="radio" checked="checked" value="titleonly" name="search_fields">'
		+ '<select name="search_cat" class="select"><option value="-1">Todos los disponibles</option><option value="3">Reglas del Foro / Forenregeln</option><option value="10">LIGA BBVA</option><option value="2">MÁS FÚTBOL </option><option value="11">DEBATE SOBRE LOS EQUIPOS </option><option value="12">ESTADÍSTICAS </option><option value="6">SOPORTE</option><option value="9">Off Topic ES (español / spanisch)</option><option value="4">Talk (deutsch) / Conversación (aléman)</option><option value="1">Support (deutsch) / Soporte (aléman)</option><option value="8">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="sort_by" class="select"><option value="0">Fecha de publicación</option><option value="1">Asunto del Mensaje</option><option value="2">Título del Tema</option><option value="3">Autor</option><option value="4">Foro</option></select><input type="radio" value="ASC" name="sort_dir"><input type="radio" checked="" value="DESC" name="sort_dir">'
		+ '<input type="radio" value="posts" name="show_results"><input type="radio" checked="checked" value="topics" name="show_results">'
		+ '<select name="return_chars" class="select"><option value="-1">Todos los disponibles</option><option value="0">0</option><option value="25">25</option><option value="50">50</option><option value="100">100</option><option selected="selected" value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option><option value="900">900</option><option value="1000">1000</option></select>'
		+ '</div>'
		+ '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="submit" value="Buscar en el Foro" class="button">'
		+ '<span class="button02" style="padding-left: 0.5em; font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;"><a href=\'http://www.google.es/search?q=' + teamName + '+comunio&ie=utf-8&oe=utf-8&aq=t\' target="_blank">Buscar en Google</a></span>';	

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en NomasKeine" class="button"  onclick="window.open(\'' + teamURL["NMK"][teamName] + '\');return false;">';

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en CpC" class="button"  onclick="window.open(\'' + teamURL["CPC"][teamName] + '\');return false;">';

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en Comuniazo" class="button"  onclick="window.open(\'' + teamURL["CMZ"][teamName] + '?utm_source=scriptbeta&utm_medium=equipo&utm_campaign=scripts\');return false;">';

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en As" class="button"  onclick="window.open(\'' + teamURL["AS"][teamName] + '\');return false;">';

	buscar += '<input id="equipoForo" style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Ver post oficial ' + teamName + ' en el foro" class="button"  onclick="javascript:;">';
	
		buscar += '</form>'
				+ '</span>';

	if (document.getElementById("title") != null) {
		document.getElementById("title").innerHTML += buscar;
	}

	var equipoForo = document.getElementById("equipoForo");
	if (equipoForo != null) {
		eval('equipoForo.addEventListener( "click", function(){get( "' + comunio + '/external/phpBB2/viewforum.php?f=28", function(text2) {getURLPostEquipo2(text2, "'+teamName+'", "'+comunio+'")}  ); }, true )');
	}

//	if (document.getElementById("contentfullsizeib") != null) {
//		document.getElementById("contentfullsizeib").innerHTML = buscar + document.getElementById("contentfullsizeib").innerHTML;
//	}
	
}

//Erpichi 20120225 - En top jugadores no hacemos nada
if(window.location.href.indexOf('topComs.phtml') != -1) {return;}



//Trim function(Opera doesnt have it)
//http://blog.stevenlevithan.com/archives/faster-trim-javascript
function trim(str){
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	//return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	//return str.replace(/^\s*|\s*$/g,"");
	
//	for(i=0; i<str.length; )
//	{
//		if(str.charAt(i)==" ")
//			str=str.substring(i+1, str.length);
//		else
//			break;
//	}
//
//	for(i=str.length-1; i>=0; i=str.length-1)
//	{
//		if(str.charAt(i)==" ")
//			str=str.substring(0,i);
//		else
//			break;
//	}
//	
//	return str;
}
	
	function noAccents( str ){
	
		return str.replace(/Á/g, "A").replace(/É/g, "E").replace(/Í/g, "I").replace(/Ó/g, "O").replace(/Ú/g, "U")
				.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
	}

/*--------------------------------------------------------------*/
// HTML TABLE SORTER
// OBJECT ORIENTED JAVASCRIPT IMPLEMENTATION OF QUICKSORT
// @author	Terrill Dent 
// @source	http://www.terrill.ca
// @date	August 28th, 2006
/*--------------------------------------------------------------*/
function TSorter(){
	var table = Object;
	var trs = Array;
	var ths = Array;
	var curSortCol = Object;
	var prevSortCol = '-1';
	var sortType = Object;

	function get(){}

	function getCell(index){
		return trs[index].cells[curSortCol] 
	}

	/*----------------------INIT------------------------------------*/
	// Initialize the variable
	// @param tableName - the name of the table to be sorted
	/*--------------------------------------------------------------*/
	/*
	this.init = function(tableName)
	{
		table = document.getElementById(tableName);
		ths = table.getElementsByTagName("th");
		for(var i = 0; i < ths.length ; i++)
		{
			ths[i].onclick = function()
			{
				sort(this);
			}
		}
		return true;
	};
	*/
	this.init = function(t){
	
		table = t;
		trs = table.getElementsByTagName("tr");
		ths = trs[0].getElementsByTagName("td");
		
		//Evitamos ordenar en la pagina alineacion
		if (t.parentNode.parentNode.id=="smallcontentright")
		{
			return;
		}
		for(var i = 0; i < ths.length ; i++){
			ths[i].innerHTML = '<a href="JavaScript:;"> ' + ths[i].textContent + '</a>'; 
			ths[i].addEventListener( "click",  function(event){ sort(this); }, true );
		}
		return true;
	};
	this.end = function(t){
	
		table = t;
		trs = table.getElementsByTagName("tr");
		ths = trs[0].getElementsByTagName("td");
		
		//Evitamos ordenar en la pagina alineacion
		if (t.parentNode.parentNode.id=="smallcontentright")
		{
			return;
		}
		for(var i = 0; i < ths.length ; i++){
			ths[i].innerHTML = ths[i].textContent.replace('<a href="JavaScript:;"> ','').replace('</a>', ''); 
			ths[i].removeEventListener( "click",  function(event){ sort(this); }, true );
		}
		return true;
	};
	/*----------------------SORT------------------------------------*/
	// Sorts a particular column. If it has been sorted then call reverse
	// if not, then use quicksort to get it sorted.
	// Sets the arrow direction in the headers.
	// @param oTH - the table header cell (<th>) object that is clicked
	/*--------------------------------------------------------------*/
	function sort(oTH)
	{
		curSortCol = oTH.cellIndex;
		sortType = oTH.abbr;
		trs = table.getElementsByTagName("tr");
		
		
		var trs2 = new Array();
		for( var i=1; i<trs.length; i++ ){
			
			trs2[i-1] = trs[i];
		}
		trs = trs2;
		
		
		if( ths[curSortCol].textContent.indexOf( "Por" ) != -1 ||
			ths[curSortCol].textContent.indexOf( "Nombre" ) != -1 ){
			
			sortType = "link_column";
		}
		else if( ths[curSortCol].textContent.indexOf( "Equipo" ) != -1 ){
				
			sortType = "img";
		}
		else if( ths[curSortCol].textContent.indexOf( "Precio" ) != -1 || 
				 ths[curSortCol].textContent.indexOf( "Valor" ) != -1 ||
				 ths[curSortCol].textContent.indexOf( "Puntos" ) != -1 ){
				 
			sortType = "number";
		}
		else if( ths[curSortCol].textContent.indexOf( "Desde" ) != -1 || 
				 ths[curSortCol].textContent.indexOf( "cambio" ) != -1 ){
				 
			sortType = "date";
		}
		
		//set the get function
		setGet(sortType);

		// it would be nice to remove this to save time,
		// but we need to close any rows that have been expanded
		/*
		for(var j=0; j<trs.length; j++)
		{
			if(trs[j].className == 'detail_row')
			{
				closeDetails(j+2);
			}
		}
		*/

		// if already sorted just reverse
		if(prevSortCol == curSortCol)
		{
			oTH.className = (oTH.className != 'ascend' ? 'ascend' : 'descend' );
			reverseTable();
		}
		// not sorted - call quicksort
		else
		{
			oTH.className = 'ascend';
			//if(ths[prevSortCol].className != 'exc_cell'){ths[prevSortCol].className = '';}
			quicksort(0, trs.length);
		}
		prevSortCol = curSortCol;
		
		if (typeof activarSeguirJugadores != 'function' && typeof cambiarOnblurInputs == 'function') {
			recalcularSaldo();
			cambiarOnblurInputs();
		}
		if (typeof activarSeguirJugadores == 'function') {
			activarSeguirJugadores();
		}
	}
	
	function noAccent( str ){
	
		return str.replace(/Á/g, "A").replace(/É/g, "E").replace(/Í/g, "I").replace(/Ó/g, "O").replace(/Ú/g, "U")
				.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
	}
	
	/*--------------------------------------------------------------*/
	// Sets the GET function so that it doesnt need to be 
	// decided on each call to get() a value.
	// @param: colNum - the column number to be sorted
	/*--------------------------------------------------------------*/
	function setGet(sortType)
	{
		switch(sortType)
		{   
			case "link_column":
				get = function(index){
					/*return  getCell(index).firstChild.firstChild.nodeValue;*/
					return  noAccent( getCell(index).textContent.toLowerCase() );
				};
				break;
			case "img":
				get = function(index){
					//return  getCell(index).innerHTML;
					return  getCell(index).getElementsByTagName("img")[0].alt;
				};
				break;
			case "number":
				get = function(index){
					return  parseInt( getCell(index).textContent.split(".").join(""), 10 );
				};
				break;
			case "date":
				get = function(index){
					return  parseInt( getCell(index).textContent.split(".").reverse().join(""), 10 );
				};
				break;
			default:
				//get = function(index){	return getCell(index).firstChild.nodeValue;};
				get = function(index){	return  noAccent( getCell(index).textContent.toLowerCase() );};
				break;
		};	
	}

	/*-----------------------EXCHANGE-------------------------------*/
	//  A complicated way of exchanging two rows in a table.
	//  Exchanges rows at index i and j
	/*--------------------------------------------------------------*/
	/*
	function exchange(i, j)
	{
		if(i == j+1) {
			table.tBodies[0].insertBefore(trs[i], trs[j]);
		} else if(j == i+1) {
			table.tBodies[0].insertBefore(trs[j], trs[i]);
		} else {
			var tmpNode = table.tBodies[0].replaceChild(trs[i], trs[j]);
			if(typeof(trs[i]) == "undefined") {
				table.appendChild(tmpNode);
			} else {
				table.tBodies[0].insertBefore(tmpNode, trs[i]);
			}
		}
	}
	*/
	function exchange(i, j){
		var temp = trs[i].innerHTML;
		
		trs[i].innerHTML = trs[j].innerHTML;
		trs[j].innerHTML = temp;
	}
	
	/*----------------------REVERSE TABLE----------------------------*/
	//  Reverses a table ordering
	/*--------------------------------------------------------------*/
	function reverseTable()
	{
	/*
		for(var i = 1; i<trs.length; i++)
		{
			table.tBodies[0].insertBefore(trs[i], trs[0]);
		}
	*/

		for(var i = 0; i<trs.length/2; i++){
			exchange(i,trs.length-1-i);
		}
	
	}

	/*----------------------QUICKSORT-------------------------------*/
	// This quicksort implementation is a modified version of this tutorial: 
	// http://www.the-art-of-web.com/javascript/quicksort/
	// @param: lo - the low index of the array to sort
	// @param: hi - the high index of the array to sort
	/*--------------------------------------------------------------*/
	function quicksort(lo, hi)
	{
		if(hi <= lo+1) return;
		 
		if((hi - lo) == 2) {
			if(get(hi-1) > get(lo)) exchange(hi-1, lo);
			return;
		}
		
		var i = lo + 1;
		var j = hi - 1;
		
		if(get(lo) > get(i)) exchange(i, lo);
		if(get(j) > get(lo)) exchange(lo, j);
		if(get(lo) > get(i)) exchange(i, lo);
		
		var pivot = get(lo);
		
		while(true) {
			j--;
			while(pivot > get(j)) j--;
			i++;
			while(get(i) > pivot) i++;
			if(j <= i) break;
			exchange(i, j);
		}
		exchange(lo, j);
		
		if((j-lo) < (hi-j)) {
			quicksort(lo, j);
			quicksort(j+1, hi);
		} else {
			quicksort(j+1, hi);
			quicksort(lo, j);
		}
	}
}
////////////////////////////////////////////////////////////	

function updateScriptData(reload, textData, time, nixiweb, freeiz){
	if (window.location.href.indexOf("team_news.phtml") != -1
			|| window.location.href.indexOf("standings.phtml") != -1
			|| window.location.href.indexOf("lineup.phtml") != -1
			|| window.location.href.indexOf("exchangemarket.phtml") != -1
			|| window.location.href.indexOf("placeOffers.phtml") != -1
			|| window.location.href.indexOf("putOnExchangemarket.phtml") != -1) {
		//alert("no textdata-" + !textData + "-nixiweb-" + nixiweb + "-freeiz-" + freeiz);
		if (!textData) {
			var comprobarScriptVersionAntiguo = localStorage.getItem("scriptVersion");
			if (comprobarScriptVersionAntiguo == null) {
				comprobarScriptVersionAntiguo = "";
				localStorage.setItem("scriptVersion", "");
			}
			if (comprobarScriptVersionAntiguo == version) {
				var comprobarActualizadoActualDate = new Date();
				var comprobarActualizadoActualAnio = comprobarActualizadoActualDate.getFullYear() + "";
				while (comprobarActualizadoActualAnio.length < 4) {
					comprobarActualizadoActualAnio = "0" + comprobarActualizadoActualAnio;
				}
				var comprobarActualizadoActualMes = (comprobarActualizadoActualDate.getMonth() +1) + "";
				while (comprobarActualizadoActualMes.length < 2) {
					comprobarActualizadoActualMes = "0" + comprobarActualizadoActualMes;
				}
				var comprobarActualizadoActualDia = comprobarActualizadoActualDate.getDate() + "";
				while (comprobarActualizadoActualDia.length < 2) {
					comprobarActualizadoActualDia = "0" + comprobarActualizadoActualDia;
				}
				var comprobarActualizadoActualHora = comprobarActualizadoActualDate.getHours() + "";
				while (comprobarActualizadoActualHora.length < 2) {
					comprobarActualizadoActualHora = "0" + comprobarActualizadoActualHora;
				}
				var comprobarActualizadoActualMinuto = comprobarActualizadoActualDate.getMinutes() + "";
				while (comprobarActualizadoActualMinuto.length < 2) {
					comprobarActualizadoActualMinuto = "0" + comprobarActualizadoActualMinuto;
				}
				var comprobarActualizadoActual = comprobarActualizadoActualAnio + comprobarActualizadoActualMes + comprobarActualizadoActualDia + comprobarActualizadoActualHora + comprobarActualizadoActualMinuto;
				comprobarActualizadoActual = parseInt(comprobarActualizadoActual);
//				alert("comprobarActualizadoActual" + comprobarActualizadoActual);
				var comprobarActualizado = localStorage.getItem("comprobarActualizado");
				if (comprobarActualizado == null) {
					comprobarActualizado = comprobarActualizadoActual;
				} else {
					comprobarActualizado = parseInt(comprobarActualizado);
					comprobarActualizado = comprobarActualizado + cacheTimeActualizado;
				}
//				alert("comprobarActualizado" + comprobarActualizado);
				
				if (comprobarActualizado > comprobarActualizadoActual) {
//					alert("No se comprueba actualizado");
					return;
				}
			}
//			alert("Si se comprueba actualizado");
			
			var url = serverScriptBeta + serverTimeName;
//			alert(url);
			get(url, function(text) {updateScriptData(reload, text, false, nixiweb, freeiz)});
		} else {
//			alert(serverScriptBeta);
//			alert(textData);
//			alert(textData.indexOf("</jugadores>"));
//			alert(textData.substring(0, textData.indexOf("</jugadores>")));
			if (textData.indexOf("</jugadores>") != -1) {
				textData = textData.substring(0, textData.indexOf("</jugadores>") + "</jugadores>".length);
			}
			if (!time) {
				var xmlJugadores = textData;
//				alert(xmlJugadores);
				var response = StringtoXML(xmlJugadores);
				var actualizadoCronica = response.getElementsByTagName('actualizado');
				if (actualizadoCronica.length == 1) {

					var comprobarActualizadoActualDate = new Date();
					var comprobarActualizadoActualAnio = comprobarActualizadoActualDate.getFullYear() + "";
					while (comprobarActualizadoActualAnio.length < 4) {
						comprobarActualizadoActualAnio = "0" + comprobarActualizadoActualAnio;
					}
					var comprobarActualizadoActualMes = (comprobarActualizadoActualDate.getMonth() +1) + "";
					while (comprobarActualizadoActualMes.length < 2) {
						comprobarActualizadoActualMes = "0" + comprobarActualizadoActualMes;
					}
					var comprobarActualizadoActualDia = comprobarActualizadoActualDate.getDate() + "";
					while (comprobarActualizadoActualDia.length < 2) {
						comprobarActualizadoActualDia = "0" + comprobarActualizadoActualDia;
					}
					var comprobarActualizadoActualHora = comprobarActualizadoActualDate.getHours() + "";
					while (comprobarActualizadoActualHora.length < 2) {
						comprobarActualizadoActualHora = "0" + comprobarActualizadoActualHora;
					}
					var comprobarActualizadoActualMinuto = comprobarActualizadoActualDate.getMinutes() + "";
					while (comprobarActualizadoActualMinuto.length < 2) {
						comprobarActualizadoActualMinuto = "0" + comprobarActualizadoActualMinuto;
					}
					var comprobarActualizadoActual = comprobarActualizadoActualAnio + comprobarActualizadoActualMes + comprobarActualizadoActualDia + comprobarActualizadoActualHora + comprobarActualizadoActualMinuto;
//					alert("meter comprobarActualizadoActual" + comprobarActualizadoActual);
					localStorage.setItem("comprobarActualizado", comprobarActualizadoActual);
					
					var scriptVersionAntiguo = localStorage.getItem("scriptVersion");
					if (scriptVersionAntiguo == null) {
						scriptVersionAntiguo = "";
						localStorage.setItem("scriptVersion", "");
					}
					if (scriptVersionAntiguo != version) {
						localStorage.setItem("scriptVersion", version);
						localStorage.setItem("scriptActualizado", "");
						scriptVersionAntiguo = "";
					}
					var scriptActualizadoStringAntiguo = localStorage.getItem("scriptActualizado");
					if (scriptActualizadoStringAntiguo == null) {
						scriptActualizadoStringAntiguo = "";
					}
					if (scriptActualizadoStringAntiguo != null
							&& scriptActualizadoStringAntiguo != actualizadoCronica[0].childNodes[0].nodeValue) {
						reload = true;
						var url = serverScriptBeta + serverDataName;
						get(url, function(text) {updateScriptData(false, text, true, nixiweb, freeiz)});
					}
				} else if (xmlJugadores.indexOf("http://www.nixiweb.com/error/cpu.html?scriptbeta.nixiweb.com") != -1) {
					//alert("No nixiweb");
					if (freeiz) {
						serverScriptBeta = serverScriptBetafreeiz;
						updateScriptData(reload,null,null,false,freeiz);
					} else {
						serverScriptBeta = serverScriptBeta260;
						updateScriptData(reload,null,null,false,freeiz);
					}
//					var urlReserva = serverScriptBeta + serverTimeName;
////					alert(url);
//					get(urlReserva, function(text) {updateScriptData(reload, text, false)});
				} else if (xmlJugadores.indexOf("reached CPU usage limit of the server") != -1) {
//					alert("No freeiz");
					if (nixiweb) {
						serverScriptBeta = serverScriptBetanixiweb;
						updateScriptData(reload,null,null,nixiweb,false);
					} else {
						serverScriptBeta = serverScriptBeta260;
						updateScriptData(reload,null,null,false,freeiz);
					}
//					var urlReserva = serverScriptBeta + serverTimeName;
////					alert(url);
//					get(urlReserva, function(text) {updateScriptData(reload, text, false)});
				}
			} else {
				var xmlJugadores = textData;
				if (xmlJugadores.indexOf("http://www.nixiweb.com/error/cpu.html?scriptbeta.nixiweb.com") != -1) {
//					alert("No nixiweb");
					if (freeiz) {
						serverScriptBeta = serverScriptBetafreeiz;
						var urlReserva = serverScriptBeta + serverDataName;
						get(urlReserva, function(text2) {updateScriptData(reload, text2, time, false,freeiz)});
					} else {
						serverScriptBeta = serverScriptBeta260;
						updateScriptData(reload,null,null,false,freeiz);
					}
				} else if (xmlJugadores.indexOf("reached CPU usage limit of the server") != -1) {
//					alert("No freeiz");
					if (nixiweb) {
						serverScriptBeta = serverScriptBetanixiweb;
						var urlReserva = serverScriptBeta + serverDataName;
						get(urlReserva, function(text2) {updateScriptData(reload, text2, time, nixiweb,false)});
					} else {
						serverScriptBeta = serverScriptBeta260;
						updateScriptData(reload,null,null,false,freeiz);
					}
				} else {
					var response = StringtoXML(xmlJugadores);

					var jornadaCronica = response.getElementsByTagName('jornada');
					if (jornadaCronica.length == 1) {
						localStorage.setItem("scriptJornada", jornadaCronica[0].childNodes[0].nodeValue);
					}
					var actualizadoCronica = response.getElementsByTagName('actualizado');
					if (actualizadoCronica.length == 1) {
						var scriptActualizadoStringAntiguo = localStorage.getItem("scriptActualizado");

						if (!reload && scriptActualizadoStringAntiguo != null
								&& scriptActualizadoStringAntiguo != actualizadoCronica[0].childNodes[0].nodeValue) {
							reload = true;
//							alert("Actualizando datos a: "+ actualizadoCronica[0].childNodes[0].nodeValue);
						}
						localStorage.setItem("scriptActualizado", actualizadoCronica[0].childNodes[0].nodeValue);
					}
					
					var players = response.getElementsByTagName('jugador');

					var playerString = "";
					
					for (var i=0; i<players.length; i++){

						idNmk = "0";
						name = "-";
						puntos = "-";
						tipobaja = "-";
						descripcionbaja = "-";
						duracionbaja = "-";
						urlbaja = "-";
						fuentebaja = "-";
						entra = "-";
						sale = "-";
						picas = "-";
						goles = "-";
						tarjetas = "-";
						marcador = "-";
						foto = "-";
						url = "-";
						equipo = "-";
						posicion = "-";
						totales = "-";
						mercado = "-";
						idcpc = "0";
						eficiencia = "-";
						valor = "-";
						mediavalor = "-";

						if (players[i].getElementsByTagName("id") && players[i].getElementsByTagName("id").length > 0) {
							idNmk = players[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("nombre") && players[i].getElementsByTagName("nombre").length > 0) {
							name = players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("puntos") && players[i].getElementsByTagName("puntos").length > 0) {
							puntos = players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("tipobaja") && players[i].getElementsByTagName("tipobaja").length > 0) {
							tipobaja = players[i].getElementsByTagName("tipobaja")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("descripcionbaja") && players[i].getElementsByTagName("descripcionbaja").length > 0) {
							descripcionbaja = players[i].getElementsByTagName("descripcionbaja")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("duracionbaja") && players[i].getElementsByTagName("duracionbaja").length > 0) {
							duracionbaja = players[i].getElementsByTagName("duracionbaja")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("urlbaja") && players[i].getElementsByTagName("urlbaja").length > 0) {
							urlbaja = players[i].getElementsByTagName("urlbaja")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("fuentebaja") && players[i].getElementsByTagName("fuentebaja").length > 0) {
							fuentebaja = players[i].getElementsByTagName("fuentebaja")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("entra") && players[i].getElementsByTagName("entra").length > 0) {
							entra = players[i].getElementsByTagName("entra")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("sale") && players[i].getElementsByTagName("sale").length > 0) {
							sale = players[i].getElementsByTagName("sale")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("picas") && players[i].getElementsByTagName("picas").length > 0) {
							picas = players[i].getElementsByTagName("picas")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("goles") && players[i].getElementsByTagName("goles").length > 0) {
							goles = players[i].getElementsByTagName("goles")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("tarjetas") && players[i].getElementsByTagName("tarjetas").length > 0) {
							tarjetas = players[i].getElementsByTagName("tarjetas")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("marcador") && players[i].getElementsByTagName("marcador").length > 0) {
							marcador = players[i].getElementsByTagName("marcador")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("foto") && players[i].getElementsByTagName("foto").length > 0) {
							foto = players[i].getElementsByTagName("foto")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("url") && players[i].getElementsByTagName("url").length > 0) {
							url = players[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("equipo") && players[i].getElementsByTagName("equipo").length > 0) {
							equipo = players[i].getElementsByTagName("equipo")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("posicion") && players[i].getElementsByTagName("posicion").length > 0) {
							posicion = players[i].getElementsByTagName("posicion")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("totales") && players[i].getElementsByTagName("totales").length > 0) {
							totales = players[i].getElementsByTagName("totales")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("mercado") && players[i].getElementsByTagName("mercado").length > 0) {
							mercado = players[i].getElementsByTagName("mercado")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("idcpc") && players[i].getElementsByTagName("idcpc").length > 0) {
							idcpc = players[i].getElementsByTagName("idcpc")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("eficiencia") && players[i].getElementsByTagName("eficiencia").length > 0) {
							eficiencia = players[i].getElementsByTagName("eficiencia")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("valor") && players[i].getElementsByTagName("valor").length > 0) {
							valor = players[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
						}
						if (players[i].getElementsByTagName("mediavalor") && players[i].getElementsByTagName("mediavalor").length > 0) {
							mediavalor = players[i].getElementsByTagName("mediavalor")[0].childNodes[0].nodeValue;
						}
						
						playerString += trim( name ) + "/-/" + idNmk + "/-/" + puntos + "/-/" + tipobaja + "/-/" + descripcionbaja + "/-/" + duracionbaja + "/-/" + urlbaja + "/-/" + fuentebaja + "/-/" + entra + "/-/" + sale + "/-/" + picas + "/-/" + goles + "/-/" + tarjetas + "/-/" + marcador + "/-/" + foto + "/-/" + url + "/-/" + equipo + "/-/" + posicion + "/-/" + totales + "/-/" + mercado + "/-/" + idcpc + "/-/" + eficiencia + "/-/" + valor + "/-/" + mediavalor + "/-/";
						
					}
					localStorage.setItem("scriptData", playerString);
					if (reload) {
						window.location.reload();
					}
				}
			}
		}
	}
}

	function StringtoXML(text){
      if (window.ActiveXObject){
        var doc=new ActiveXObject('Microsoft.XMLDOM');
        doc.async='false';
        doc.loadXML(text);
      } else {
        var parser=new DOMParser();
        var doc=parser.parseFromString(text,'text/xml');
      }
      return doc;
  }


function getNoPlayerList(){
//	var invocation = new XMLHttpRequest();
//	var url = 'http://s339418926.mialojamiento.es/comunio/noplayers.php';
//	
//	if( invocation ){
//	
//		invocation.open('GET', url, false);
//		invocation.send(); 
//		var response = invocation.responseXML;
//		var players = response.getElementsByTagName('jugador');
		
		var jugadores =new Array();

		var i = 0;
		for (var nombreJug in playerIDNameEstado) {
			if (nombreJug != null && nombreJug.length > 0) {
				var jugador = new Array(4);
			  	jugador[0] = nombreJug;
				jugador[1] = playerIDNameEstado[nombreJug][0];
				jugador[2] = playerIDNameEstado[nombreJug][1];
				jugador[3] = playerIDNameEstado[nombreJug][2] + " Fuente: " + playerIDNameEstado[nombreJug][4];
//				jugador[4] = playerIDNameEstado[nombreJug][3];
//				jugador[5] = playerIDNameEstado[nombreJug][4];
				jugadores[i] = jugador;
				i = i+1;
			}
		}
		
//		for (var i=0; i<players.length; i++){
//			var jugador = new Array(4);
//		  	jugador[0] = players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
//			jugador[1] = players[i].getElementsByTagName("tipobaja")[0].childNodes[0].nodeValue;
//			jugador[2] = players[i].getElementsByTagName("descripcionbaja")[0].childNodes[0].nodeValue;
//			jugador[3] = players[i].getElementsByTagName("duracion")[0].childNodes[0].nodeValue;
//			jugadores[i] = jugador;
//		}
//	}
//		alert(jugadores);
	return jugadores;
}
//diegocom 20111013
function getPointsPlayerList(){


//var invocation = new XMLHttpRequest();
//	var url = 'http://s339418926.mialojamiento.es/comunio/pointplayers.php';
	
//	if( invocation ){
	
//		invocation.open('GET', url, false);
//		invocation.send(); 
//		var response = invocation.responseXML;
//		var players = response.getElementsByTagName('jugador');
		var jugadores =new Array();

//		alert(playerIDNamePuntos);
//		alert(playerIDNamePuntos.length);
//		alert(playerIDNamePuntos[0]);
//		alert(playerIDNamePuntos["Agirretxe"]);
//		alert(playerIDNamePuntos.elements);
		var i = 0;
		for (var nombreJug in playerIDNamePuntos) {
//			alert(nombreJug);
//			alert(playerIDNamePuntos[nombreJug]);
			if (nombreJug != null && nombreJug.length > 0) {
				var jugador = new Array(4);
			  	jugador[0] = nombreJug;    //players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
				jugador[1] = playerIDNamePuntos[nombreJug];    //players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
				jugadores[i] = jugador;
				i = i+1;
			}
		}
//		for (var i=0; i<playerIDNamePuntos.length; i++){
//			var jugador = new Array(4);
//		  	jugador[0] = playerIDNamePuntos[0];    //players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
//			jugador[1] = playerIDNamePuntos[0];    //players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
//			jugadores[i] = jugador;
//		}
		
		
//	}
//		alert(jugadores.length);
	return jugadores;
}

function getConv(text){
		
			link3.textContent = link3.textContent.replace( "*", "" );
			
			var td = document.getElementById("convCol");
			var ini = 0;
			var end = 0;
			ini = text.indexOf('<table>', ini);
			end = text.indexOf('</table>', ini);
			td.innerHTML =  text.substring(ini, end);
			//erpichi20111105
			var divs = td.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++) {
				var div = divs[i];
				if (div.className == "forum_overflow") {
					div.style.display = "inline";
				}
			}
		}

function getJornada(text){
		
			link4.textContent = link4.textContent.replace( "*", "" );
			
			var td = document.getElementById("jornadaCol");
			
			td.innerHTML =  text.substring( text.indexOf('<form name="lineupTip"'), text.indexOf('</form>',text.indexOf('<form name="lineupTip"') + 7) ).replace('Submisión hasta:', 'Fecha Partido').replace('Apuesta', 'Resultado');
			
		}

//erpichi20111105
function getJornadaActual(text){
	var padre = document.getElementById('contentleft');
	var formacion = padre.childNodes[0];

	var div = document.createElement('div');
	var jornada =  text.substring( text.indexOf('<form name="lineupTip"'), text.indexOf('</form>',text.indexOf('<form name="lineupTip"') + 7) ).replace('Submisión hasta:', 'Fecha Partido').replace('Apuesta', 'Resultado');
	div.innerHTML =  jornada;
	var table = div.getElementsByTagName("table")[0];
	var trs = table.getElementsByTagName("tr");
	var borrar = false;
	var numPartidos = 0;
	do {
		borrar = false;
		removeElement(trs[0]);
		//erpichi 20111129 - Mostrar partidos de la jornada cuando tiene menos de 10
		for(var i = 0; i < trs.length; i++) {
			if (trs[i].className == null
					|| trs[i].className == "") {
				numPartidos = i;
				break;
			} else if (trs[i].childNodes[1].textContent == 'Spain') {
				borrar = true;
				break;
			}
		}
		if (numPartidos == 0) {
			borrar = true;
		}
	} while (borrar);
	for(var i = trs.length-1; i >= numPartidos; i--) {
		removeElement(trs[i]);
	}
	var numJornada = trs[0].childNodes[0].textContent;
	for(var i = 0; i < trs.length; i++) {
		removeElement(trs[i].childNodes[0]);
		removeElement(trs[i].childNodes[1]);
		trs[i].childNodes[1].innerHTML = ":";
		removeElement(trs[i].childNodes[2]);
		removeElement(trs[i].childNodes[3]);
		removeElement(trs[i].childNodes[3]);
		
		var newlink = document.createElement('a');
		newlink.href = "javascript:;";
		newlink.innerHTML = trs[i].childNodes[0].innerHTML;
		newlink.id="foro" + newlink.innerHTML;
		newlink.title = "Ver post oficial " + newlink.innerHTML + " en el foro";
		trs[i].childNodes[0].innerHTML = outerHTML(newlink);
		
		var newlink2 = document.createElement('a');
		newlink2.href = "javascript:;";
		newlink2.innerHTML = trs[i].childNodes[2].innerHTML;
		newlink2.id="foro" + newlink2.innerHTML;
		newlink2.title = "Ver post oficial " + newlink2.innerHTML + " en el foro";
		trs[i].childNodes[2].innerHTML = outerHTML(newlink2);
		
		var newlink3 = document.createElement('a');
		var partido = newlink.innerHTML + "-" + newlink2.innerHTML;
		newlink3.href = "javascript:;";
		newlink3.innerHTML = trs[i].childNodes[3].innerHTML;
		newlink3.id="analisis" + partido;
		newlink3.title = "Ver análisis del partido " + partido + " en el foro";
		trs[i].childNodes[3].innerHTML = outerHTML(newlink3);
	}

	var divTitle = document.createElement('div');
	divTitle.className = "titleboxcontent";
	var titulo = "Partidos " + numJornada + ". jornada";
	var jornadaHidden = "<input type='hidden' id='jornadaHidden' value='" + numJornada + ". jornada'/>";
	divTitle.innerHTML = jornadaHidden + "<div class=\"edgetitle\"><b class=\"top\"><b class=\"e1\"></b><b class=\"e2\"></b><b class=\"e3\"></b><b class=\"e4\"></b><b class=\"e5\"></b><b class=\"e6\"></b><b class=\"e7\"></b><b class=\"e8\"></b><b class=\"e9\"></b><b class=\"e10\"></b><b class=\"e11\"></b></b></div><div class=\"titlecontent\"><h2>&nbsp; <a href=\"javascript:try{show('previewScript');}catch(ex){console.log('Error show -' + ex);}\">" + titulo + "</a>&nbsp;</h2></div>";
	padre.insertBefore(divTitle,formacion);
	
	var divPreview = document.createElement('div');
	divPreview.id = "previewScript";
	divPreview.appendChild(table);
	padre.insertBefore(divPreview,formacion);
	
	var preview = document.getElementById("previewScript");
	var trsPreview = preview.getElementsByTagName("a");
	for(var i = 0; i < trsPreview.length; i++) {
		var newlink = trsPreview[i];
		if (newlink.id.indexOf("foro") != -1) {
			eval('newlink.addEventListener( "click", function(){get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=28", function(text2) {getURLPostEquipo(text2, "'+newlink.innerHTML+'")}  ); }, true )');
		} else if (newlink.id.indexOf("analisis") != -1) {
			var partido = newlink.id.replace("analisis", "");
			eval('newlink.addEventListener( "click", function(){get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=8", function(text2) {getURLPostPartido(text2, "'+partido+'")}  ); }, true )');
		}
	}
	
	var divSpacer = document.createElement('div');
	divSpacer.className = "spacer10px";
	padre.insertBefore(divSpacer,formacion);
}

//erpichi20111105
function removeElement(node) {
    node.parentNode.removeChild(node);
}

	
function getNoPlayers(text){
	link2.textContent = link2.textContent.replace( "*", "" );
	var td = document.getElementById("injuriedCol");
//			var ini = 0;
//			var end = 0;
//			ini = text.indexOf('<table>', ini);
//			end = text.indexOf('</table>', ini);
//			td.innerHTML =  text.substring(ini, end);
	
	//erpichi20111112
	var tablaResultados =  document.createElement("table");
	var foro = document.createElement("div");
	foro.innerHTML = text;
	var foroDivs = foro.getElementsByTagName("div");
	for(var i = 0; i < foroDivs.length; i++) {
		var divForo = foroDivs[i];
		if (divForo.className == "forum_overflow") {
			divForo.style.display = "inline";
			var trResultados =  document.createElement("tr");
			var tdResultados =  document.createElement("td");
			tdResultados.innerHTML =  divForo.parentNode.innerHTML;
			trResultados.appendChild(tdResultados);
			tablaResultados.appendChild(trResultados);
		}
	}
	td.appendChild(tablaResultados);
	
	//erpichi20111105
//			var divs = td.getElementsByTagName("div");
//			for(var i = 0; i < divs.length; i++) {
//				var div = divs[i];
//				if (div.className == "forum_overflow") {
//					div.style.display = "inline";
//				}
//			}
	
}

	
function getPuntosComunio(text){
	link6.textContent = link6.textContent.replace( "*", "" );
	var td = document.getElementById("puntosComunioCol");
//			var ini = 0;
//			var end = 0;
//			ini = text.indexOf('<table>', ini);
//			end = text.indexOf('</table>', ini);
//			td.innerHTML =  text.substring(ini, end);
	
	//erpichi20111112
	var tablaResultados =  document.createElement("table");
	var foro = document.createElement("div");
	foro.innerHTML = text;
	
	var foroDivs = foro.getElementsByTagName("div");
	for(var i = 0; i < foroDivs.length; i++) {
		var divForo = foroDivs[i];
		if (divForo.id == "title"){
//			var trTitulo =  document.createElement("tr");
//			var tdTitulo =  document.createElement("td");
//			tdTitulo.innerHTML =  divForo.innerHTML;
//			trTitulo.appendChild(tdTitulo);
//			tablaResultados.appendChild(trTitulo);
			document.getElementById("link6").innerHTML += " - " + divForo.innerHTML;;
		}
		if (divForo.className == "forum_overflow") {
			divForo.style.display = "inline";
			var trResultados =  document.createElement("tr");
			var tdResultados =  document.createElement("td");
			tdResultados.innerHTML =  divForo.parentNode.innerHTML;
			trResultados.appendChild(tdResultados);
			tablaResultados.appendChild(trResultados);
		}
	}
	td.appendChild(tablaResultados);
	
	//erpichi20111105
//			var divs = td.getElementsByTagName("div");
//			for(var i = 0; i < divs.length; i++) {
//				var div = divs[i];
//				if (div.className == "forum_overflow") {
//					div.style.display = "inline";
//				}
//			}
	
}
		
function getURLNoPlayers(text){

			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
		
			while( ini != -1 && count < 100 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("lista") != -1 && text.substring( iniTitle, endTitle ).toLowerCase().indexOf("lesionados") != -1 ){
					
					get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getNoPlayers );
					break;
				}
				count++;
			}
			
			if( ini == -1 ){
				get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLConv );
			}

		}
		
function getURLPostEquipo(text, equipo){
			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
			var encontrado = false;
		
			while( ini != -1 && count < 200 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("post oficial") != -1 && noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(equipo.toLowerCase())) != -1 ){
					window.open(window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ));
					encontrado = true;
					break;
				}
				count++;
			}
			
			if( ini == -1 || !encontrado){
				alert("No se ha encontrado el post del equipo: " + equipo + ", se le redirigirá al listado completo.");
				window.open(window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=28');
			}

		}
		
function getURLPostEquipo2(text, equipo, comunio){
			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
			var encontrado = false;
		
			while( ini != -1 && count < 200 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("post oficial") != -1 && noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(equipo.toLowerCase())) != -1 ){
					window.open(comunio + "/external/phpBB2/" + text.substring( ini, end ));
					encontrado = true;
					break;
				}
				count++;
			}
			
			if( ini == -1 || !encontrado){
				alert("No se ha encontrado el post del equipo: " + equipo + ", se le redirigirá al listado completo.");
				window.open(comunio+ '/external/phpBB2/viewforum.php?f=28');
			}

		}
		
function getURLPostPartido(text, partido){
			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
			var encontrado = false;
		
			while( ini != -1 && count < 200 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				var partidoSplit = partido.split("-");
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("jornada") != -1
						&& noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(partidoSplit[0].toLowerCase())) != -1 
						&& noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(partidoSplit[1].toLowerCase())) != -1 ){
					window.open(window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ));
					encontrado = true;
					break;
				}
				count++;
			}
			
			if( ini == -1 || !encontrado){
				alert("No se ha encontrado el análisis del partido: " + partido + ", se le redirigirá al listado completo.");
				window.open(window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=8');
			}

		}
		
function getURLPuntosComunio(text){

			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
		
			while( ini != -1 && count < 100 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("puntos") != -1 && text.substring( iniTitle, endTitle ).toLowerCase().indexOf("jornada") != -1 ){
					
					get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getPuntosComunio );
					break;
				}
				count++;
			}
			
			if( ini == -1 ){
				get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=33', getURLPuntosComunio );
			}

		}

//erpichi 20111129 - Buscar los convocados en la pagina que esten
function getURLConv(text, numCount){
	
	if (numCount == null) {
		numCount = 0;
	}

	var ini = 0;
	var end = 0;
	var iniTitle = 0;
	var endTitle = 0;
	var count = 0;
	//erpichi 20111129 - Buscar los convocados en la pagina que esten
	var encontrado = false;

	while( ini != -1 && count < 100 ){
		//erpichi20111128 - Obtener bien las noticias
		ini = text.indexOf( '<tr', end );
		ini = text.indexOf( 'href="viewtopic', ini ) + ( ('href="').length );
		if (text.indexOf( '&', ini ) < text.indexOf( '"', ini )) {
			ini = text.indexOf( 'href="viewtopic', ini ) + ( ('href="').length );
		}
		end = text.indexOf( '"', ini );
		
		iniTitle = text.indexOf( '>', end ) + 1;
		endTitle = text.indexOf( '</a>', iniTitle );
					
		//erpichi20111127 - Evitar que salga otro post antes que ponga convocatoria
		//if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("convocatorias liga bbva") != -1 ){
		if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("convocatorias") != -1
				&& text.substring( iniTitle, endTitle ).toLowerCase().indexOf("recopilación") == -1){
			//erpichi 20111129 - Buscar los convocados en la pagina que esten
			encontrado = true;
			get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getConv );
			break;
		}
		count++;
	}
	//erpichi 20111129 - Buscar los convocados en la pagina que esten
	if (!encontrado) {
		get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27&topicdays=0&start=' + numCount + 50, function(text2) {getURLConv(text2, numCount + 50)} );
	}
}

function getURLJornada(text){
			get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornada );
		}
//erpichi20111105
function getURLJornadaActual(text){
	get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornadaActual );
}
function getURLJornadaAnterior(text){
	get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornadaAnterior );
}

//erpichi 20111104
function imprimirAlineacion(){
	var porteros = getAlineacionByPuesto("keeper");
	var defensas = getAlineacionByPuesto("defender");
	var centrocampistas = getAlineacionByPuesto("midfielder");
	var delanteros = getAlineacionByPuesto("striker");
	var alineacion = "";
	var separacionJugador = "; ";
	var separacionPuesto = " - ";
	for(var i = 0; i < porteros.length; i++) {
		alineacion = alineacion + porteros[i];
		if ((i + 1) < porteros.length) {
			alineacion = alineacion + separacionJugador;
		} else {
			alineacion = alineacion + separacionPuesto;
		}
	}
	for(var i = 0; i < defensas.length; i++) {
		alineacion += defensas[i];
		if ((i + 1) < defensas.length) {
			alineacion += separacionJugador;
		} else {
			alineacion += separacionPuesto;
		}
	}
	for(var i = 0; i < centrocampistas.length; i++) {
		alineacion += centrocampistas[i];
		if ((i + 1) < centrocampistas.length) {
			alineacion += separacionJugador;
		} else {
			alineacion += separacionPuesto;
		}
	}
	for(var i = 0; i < delanteros.length; i++) {
		alineacion += delanteros[i];
		if ((i + 1) < delanteros.length) {
			alineacion += separacionJugador;
		}
	}

	return "<b>Alineación:</b> " + alineacion;
}

//erpichi 20111104
function getAlineacionIdealByPuestoAndFormacion(puesto, formacion){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].value != "" && jugadores[j].parentNode.className.indexOf(puesto) != -1) {
	            jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
	            if (jugadorNombre.indexOf("<") != -1) {
	            	jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf("<"));
	            }
	            var jugadorNombreSolo = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
	            var jugadorNombrePuntos = jugadorNombre.substring(jugadorNombre.indexOf(":") + 1);
	            jugadorNombrePuntos = jugadorNombrePuntos.replace("(","");
	            jugadorNombrePuntos = jugadorNombrePuntos.replace(")","");
	            var sinCalificar = false;
	            if (jugadorNombrePuntos == "-") {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("-", "s.c");
	            }
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("(","");
		            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace(")","");
		            var sinCalificar2 = false;
		            if (jugadorNombrePuntos2 == "-") {
		            	jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("-", "s.c");
		            }
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
	           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	}
    while(alineacion.length > formacion) {
    	alineacion.pop();
    }
   // alert(alineacion);
	return alineacion;
}

//erpichi 20111104
function getAlineacionByPuesto(puesto){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].selected && jugadores[j].parentNode.className.indexOf(puesto) != -1) {
              jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
              jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
              alineacion.push(jugadorNombre);
			}
		}
	}
	return alineacion;
}

//diegocom 20111013
function getAlineacion(){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].selected == true)
			{
                //erpichi 20111101
                jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
                jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
				alineacion.push(jugadorNombre);
			}
		}
	}
	return alineacion;
}
    //diegocom 20111013

//erpichi20111106
function replaceAll( text, busca, reemplaza ){
	if (text != null && text.length > 0) {
		while (text.toString().indexOf(busca) != -1) {
			text = text.toString().replace(busca,reemplaza);
		}
	}
	return text;
}

//erpichi 20111106		
function calculaPuntosAlineacionClick(enlace){
	var alineacion = enlace.parentNode.parentNode.childNodes[0].textContent;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación:","");
	var alineacionSplit = alineacion.split(";");
	enlace.parentNode.innerHTML = calculaPuntosAlineacion(alineacionSplit, listaJugadores);

}

//erpichi 20111107		
function calculaEstadoAlineacionGeneral(){
	var alineacionObj = document.getElementById("alineacionLine");
	var alineacion = alineacionObj.value;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación:","");
	alineacion = trim(alineacion);
	var alineacionSplit = alineacion.split(";");
	var divResultado = document.getElementById("alineacionLineEstado");
	divResultado.className = "contenttext";
	divResultado.innerHTML = calculaEstadoAlineacion(alineacionSplit, listaJugadoresLesionados).replace("<br/><br/>", "") + "<br/><br/>";

}

//erpichi 20111107		
function calculaPuntosAlineacionGeneral(){
	var alineacionObj = document.getElementById("alineacionLine");
	var alineacion = alineacionObj.value;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
	alineacion = trim(alineacion);
	var alineacionSplit = alineacion.split(";");
	var divResultado = document.getElementById("alineacionLinePuntos");
	divResultado.className = "contenttext";
	divResultado.innerHTML = calculaPuntosAlineacion(alineacionSplit, listaJugadores).replace("<br/><br/>", "") + "<br/><br/>";

}

//erpichi 20111107		
function calculaEstadoAlineacion(alineacion, listaJugadoresLesionados){
	var jugador2 = "";
	var mensajeEstado = '<br/><br/><b>Estado:</b> ';
	var sumaTotalNOK = 0;
//	alert(listaJugadoresLesionados);
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
        var estadoJugador = calculaEstadoJugador(jugadorNombre,listaJugadoresLesionados);
//        alert(jugadorNombre + "-" + estadoJugador);
        if (estadoJugador != "") {
//        	jugadores[j].title = estadoJugador.title;
        	estadoJugador.style.height = "";
        	estadoJugador = outerHTML(estadoJugador);
        	sumaTotalNOK++;
        } else {
        	var image = document.createElement('img');
        	image.title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
        	image.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
        	estadoJugador = outerHTML(image);
        }
        mensajeEstado = mensajeEstado + jugadorNombre + estadoJugador + " - ";
	}
	return mensajeEstado + " <strong>Total bajas: "+sumaTotalNOK+"</strong>";
}

//erpichi 20111106		
function calculaPuntosAlineacion(alineacion, listaJugadores){
	var jugador2 = "";
	var mensajePuntos = '<br/><br/><b>Puntos:</b> ';
	var sumaTotal = 0;
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos = mensajePuntos + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "; ";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal = sumaTotal + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0)
		{
		mensajePuntos = mensajePuntos + jugadorNombre + ": -; ";
				
		}
		
	}	
	//Restamos los no convocados
	var numNoConvocados = 11 - alineacion.length;
	if (numNoConvocados > 0 && numNoConvocados > 0 < 11) {
		mensajePuntos = mensajePuntos + "No Convocados(" + numNoConvocados + "): " + (numNoConvocados * -4) + "; ";

		sumaTotal = sumaTotal + (numNoConvocados * -4);
		
	}
		
	return mensajePuntos + " <strong>Total: "+sumaTotal+"</strong>";
}

//diegocom 20111013		
function calculaPuntos(){
	var listaJugadores = getPointsPlayerList();
	var alineacion = getAlineacion();
	var jugador2 = "";
	var mensajePuntos = "";
	var sumaTotal = 0;
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos = mensajePuntos + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal = sumaTotal + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0)
		{
		mensajePuntos = mensajePuntos + jugadorNombre + ": - <br/>";
				
		}
		
	}	
	document.getElementById("totalPointsCell").innerHTML = mensajePuntos + "<br/><strong>Total: "+sumaTotal+"</strong>";
}

function getAlineacionByFormacion(portero, defensa, centrocampista,delantero) {
	var porteros = getAlineacionIdealByPuestoAndFormacion("keeper",portero);
	var defensas = getAlineacionIdealByPuestoAndFormacion("defender",defensa);
	var centrocampistas = getAlineacionIdealByPuestoAndFormacion("midfielder",centrocampista);
	var delanteros = getAlineacionIdealByPuestoAndFormacion("striker",delantero);
	var alineacion = new Array();
	for (var i = 0; i < porteros.length; i++) {
		alineacion.push(porteros[i]);
	}
	for (var i = 0; i < defensas.length; i++) {
		alineacion.push(defensas[i]);
	}
	for (var i = 0; i < centrocampistas.length; i++) {
		alineacion.push(centrocampistas[i]);
	}
	for (var i = 0; i < delanteros.length; i++) {
		alineacion.push(delanteros[i]);
	}
	return alineacion;
}

//erpichi 20111105		
function calculaPuntosIdeal(){
	var listaJugadores = getPointsPlayerList();
	var jugador2 = "";
	var mensajePuntos = "";
	var sumaTotal = -10000;
	//Alineacion 4-4-2
	var alineacion1442 = getAlineacionByFormacion(1,4,4,2);
	var mensajePuntos1442 = "";
	var sumaTotal1442 = 0;
	for(var i = 0; i <alineacion1442.length; i++) {
		jugadorNombre = alineacion1442[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1442 = sumaTotal1442 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": - <br/>";
		}
	}
	mensajePuntos1442 = "<b>Formación:</b> 4-4-2<br/>" + mensajePuntos1442 + "<br/><strong>Total: "+sumaTotal1442+"</strong>";
	if (sumaTotal1442 > sumaTotal) {
		sumaTotal = sumaTotal1442;
		mensajePuntos = mensajePuntos1442;
	}
	//Alineacion 3-4-3
	var alineacion1343 = getAlineacionByFormacion(1,3,4,3);
	var mensajePuntos1343 = "";
	var sumaTotal1343 = 0;
	for(var i = 0; i <alineacion1343.length; i++) {
		jugadorNombre = alineacion1343[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1343 = mensajePuntos1343 + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1343 = sumaTotal1343 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1343 = mensajePuntos1343 + jugadorNombre + ": - <br/>";
		}
	}
	mensajePuntos1343 = "<b>Formación:</b> 3-4-3<br/>" + mensajePuntos1343 + "<br/><strong>Total: "+sumaTotal1343+"</strong>";
	if (sumaTotal1343 > sumaTotal) {
		sumaTotal = sumaTotal1343;
		mensajePuntos = mensajePuntos1343;
	}
	//Alineacion 3-5-2
	var alineacion1352 = getAlineacionByFormacion(1,3,5,2);
	var mensajePuntos1352 = "";
	var sumaTotal1352 = 0;
	for(var i = 0; i <alineacion1352.length; i++) {
		jugadorNombre = alineacion1352[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1352 = mensajePuntos1352 + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1352 = sumaTotal1352 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1352 = mensajePuntos1352 + jugadorNombre + ": - <br/>";
		}
	}
	mensajePuntos1352 = "<b>Formación:</b> 3-5-2<br/>" + mensajePuntos1352 + "<br/><strong>Total: "+sumaTotal1352+"</strong>";
	if (sumaTotal1352 > sumaTotal) {
		sumaTotal = sumaTotal1352;
		mensajePuntos = mensajePuntos1352;
	}
	//Alineacion 4-3-3
	var alineacion1433 = getAlineacionByFormacion(1,4,3,3);
	var mensajePuntos1433 = "";
	var sumaTotal1433 = 0;
	for(var i = 0; i <alineacion1433.length; i++) {
		jugadorNombre = alineacion1433[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1433 = mensajePuntos1433 + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1433 = sumaTotal1433 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1433 = mensajePuntos1433 + jugadorNombre + ": - <br/>";
		}
	}
	mensajePuntos1433 = "<b>Formación:</b> 4-3-3<br/>" + mensajePuntos1433 + "<br/><strong>Total: "+sumaTotal1433+"</strong>";
	if (sumaTotal1433 > sumaTotal) {
		sumaTotal = sumaTotal1433;
		mensajePuntos = mensajePuntos1433;
	}
	//Alineacion 4-5-1
	var alineacion1451 = getAlineacionByFormacion(1,4,5,1);
	var mensajePuntos1451 = "";
	var sumaTotal1451 = 0;
	for(var i = 0; i <alineacion1451.length; i++) {
		jugadorNombre = alineacion1451[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1451 = mensajePuntos1451 + jugadorNombre + ": " + getPuntosColor(listaJugadores[j][1]) + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1451 = sumaTotal1451 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1451 = mensajePuntos1451 + jugadorNombre + ": - <br/>";
		}
	}
	mensajePuntos1451 = "<b>Formación:</b> 4-5-1<br/>" + mensajePuntos1451 + "<br/><strong>Total: "+sumaTotal1451+"</strong>";
	if (sumaTotal1451 > sumaTotal) {
		sumaTotal = sumaTotal1451;
		mensajePuntos = mensajePuntos1451;
	}

	document.getElementById("totalPointsCellIdeal").innerHTML = mensajePuntos;
}


//////////////////////////////////////////////////////////////////

//Commands for team URL	
try{
	GM_registerMenuCommand( "oficial", function(){ GM_setValue( "URLSrc", "oficial" );} ) ; 
	GM_registerMenuCommand( "as", function(){ GM_setValue( "URLSrc", "AS" );} ); 
	GM_registerMenuCommand( "comunio", function(){ GM_setValue( "URLSrc", "CMN" );} ); 
	GM_registerMenuCommand( "nomaskeine", function(){ GM_setValue( "URLSrc", "NMK" );} ); 
	GM_registerMenuCommand( "calculapuntoscomunio", function(){ GM_setValue( "URLSrc", "CPC" );} ); 
	GM_registerMenuCommand( "comuniazo", function(){ GM_setValue( "URLSrc", "CMZ" );} ); 
}
catch( ex ){
	function GM_getValue(){
		return "oficial";
	}
}

	
/////////////////////////////////////////////////////////////////

//Change size of principal table
var tables = document.getElementsByTagName("table");
for( var i=0; i<tables.length; i++ ){
	if( parseInt( tables[i].style.width.replace("px", ""), 10 ) > 600 ){	//If it has an attribute "width" with more than 600px, it has to be the principal
		tables[i].style.width = "65%";
		break;
	}
}
//////////////////////////////





//////////////////////////////

var thisTable, tables=[], tables1, tables2, tableRows, thisRow;
var playerName, teamName, idTeam, idPlayer;
//erpichi 20111120 - fotos de los jugadores
//var playerNameCol=0;
//var teamNameCol=1;
//var teamTotalesCol=2;
//var pujaCol=8;
//var cellOwnersToConvert = [];
//var ownerCol=6;
var playerNameCol=1;
var teamNameCol=2;
var teamTotalesCol=3;
var pujaCol=9;
var cellOwnersToConvert = [];
var ownerCol=7;

var valorMercadoCol=3;
var precioVentaCol=3;
var fechaVentaCol=5;
var estadoVentaCol=6;
var updated = false;

//if( plusPlayer == false ){
	if( true){
//erpichi20111105
function actualizaTextoInformacion() {
	var verAbajo = true; 
	var mensajeAyuda = "Solamente los jugadores alineados recibirán puntos. Una alineación sólo se activa en el siguiente día de alineación y no te olvides de confirmar tú alineación. "
		+ "Solamente las alineaciones publicadas recibirán premios por jugadores en el once ideal. No te olvides de publicar tú alineación. "
		+ "En las versiones <a target='_blank' href='http://userscripts.org/scripts/show/118530'>SCRIPT BETA</a>, <a target='_blank' href='proDemo.phtml'>Pro Player</a> y <a target='_blank' href='plusDemo.phtml'>Plus Player</a> los números al lado del nombre de los jugadores representan sus puntos en la última jornada. "
		+ "Si un número está entre paréntesis significa que no alineaste este jugador. "
		+ "En la versión SCRIPT BETA si un jugador puede ser baja para el próximo partido "
		+ "se mostrará el icono de la causa de la baja en lugar de la foto del jugador. "
		+ "El valor 's.c' significa que el jugador no calificó en la última jornada. "
		+ "En la lista de tú plantilla, los jugadores que no alineaste en la última jornada aparecerán alineados a la derecha. "
		+ "Aparece también si el jugador fué titular, suplente o no jugó, y en que minuto fue sustituido. "
		+ "Puedes ver de nuevo el estado de tus jugadores y los puntos obtenidos en la última jornada. "
		+ "Puedes activar los datos extras obtenidos de comuniazo, calculapuntoscomunio y comstats.<br>";
	
	var padre = document.getElementById('contentfullsize');
	padre.innerHTML = padre.innerHTML.replace("You have not saved your lineup yet!", "Tu no has salvado tu alineación aun!");
	var span = padre.getElementsByTagName("span");
	if (span.length > 0) {
		if (!verAbajo) {
			span[0].innerHTML = mensajeAyuda;
		} else {
			span[0].innerHTML = "";
		}
	} else {
		if (!verAbajo) {
			var newSpan = document.createElement('span');
			padre.appendChild(newSpan);
			newSpan.innerHTML = '<span class="contenttext">' + mensajeAyuda + '</span>';
		}
	}
	
	var padreAbajo = document.getElementById('contentleft');
	var spanAbajo = padreAbajo.getElementsByTagName("span");
	if (spanAbajo.length > 0) {
		if (verAbajo) {
			spanAbajo[spanAbajo.length-1].innerHTML = mensajeAyuda;
		} else {
			spanAbajo[spanAbajo.length-1].innerHTML = "";
		}
	} else {
		if (verAbajo) {
			var newSpanAbajo = document.createElement('span');
			padreAbajo.appendChild(newSpanAbajo);
			newSpanAbajo.innerHTML = '<span class="contenttext">' + mensajeAyuda + '</span>';
		}
	}
}

//erpichi20111105
function getProximaJornada() {
	get( window.location.href.replace( "lineup.phtml", "" ) + 'calendarTip.phtml', getURLJornadaActual );
}
	
//erpichi20111104
function reactualizaAlineacion(select) {
	alert(select);
}
    //erpichi20111101
function actualizaAlineacion() {
	var listaJugadores = getPointsPlayerList();
	var listaJugadoresLesionados = getNoPlayerList();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
	  //erpichi20111120 - Actualizar alineacion en onchange
		actualizaAlineacionByTr(trs[i], listaJugadores, listaJugadoresLesionados);
//		var jugadores = trs[i].getElementsByTagName("option");
//		for( var j=0; j<jugadores.length; j++ ){
//        	var select = jugadores[j].parentNode;
//            if(jugadores[j].value != '') {
//                if (startsWith(jugadores[j].innerHTML,'*') && endsWith(jugadores[j].innerHTML,'*')) {
//                    jugadores[j].innerHTML = replaceAll(jugadores[j].innerHTML,'*','');
//                    var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
//                    var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
//                    if (estadoJugador != "") {
//                    	if (jugadores[j].selected) {
//                    		select.style.backgroundColor = "lightCoral";
//                        	select.title = estadoJugador.title;
//                    	}
//                    	jugadores[j].style.backgroundColor = "lightCoral";
//                    	jugadores[j].title = estadoJugador.title;
//                    	estadoJugador = outerHTML(estadoJugador);
//                    }
//                    jugadores[j].innerHTML = jugadores[j].innerHTML + ": " + puntosJugador + estadoJugador;
//                } else {
//                    var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
//                    var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
//                    if (estadoJugador != "") {
//                    	if (jugadores[j].selected) {
//                    		select.style.backgroundColor = "lightCoral";
//                        	select.title = estadoJugador.title;
//                    	}
//                    	jugadores[j].style.backgroundColor = "lightCoral";
//                    	jugadores[j].title = estadoJugador.title;
//                    	estadoJugador = outerHTML(estadoJugador);
//                    }
//                    jugadores[j].innerHTML = jugadores[j].innerHTML + ": (" + puntosJugador + ")" + estadoJugador;
//                }
//            }
//		}
		accionSelects(trs[i], listaJugadores, listaJugadoresLesionados);
	}
}

    //erpichi20111120 - Actualizar alineacion en onchange
function actualizaAlineacionByTr(trActual, listaJugadores, listaJugadoresLesionados) {
	var jugadores = trActual.getElementsByTagName("option");
	for( var j=0; j<jugadores.length; j++ ){
    	var select = jugadores[j].parentNode;
    	var capa = select.parentNode.parentNode;
    	var capaJug = capa;
    	var capaJugHijo = null;
		if (capa.tagName == "DIV") {
			capaJug = select.parentNode.nextSibling;
			capaJugHijo = capaJug.childNodes[0];
		}

        if(jugadores[j].value != '') {
            if (jugadores[j].innerHTML.indexOf(":") != -1) {
            	var nombreJugadorOrig = jugadores[j].innerHTML.substring(0, jugadores[j].innerHTML.indexOf(":"));
            	var puntosJugador = jugadores[j].innerHTML.substring(jugadores[j].innerHTML.indexOf(":") + 1);
            	puntosJugador = trim(puntosJugador);
            	if (startsWith(puntosJugador,'(')) {
            		jugadores[j].innerHTML = nombreJugadorOrig;
            	} else {
            		jugadores[j].innerHTML = "*" + nombreJugadorOrig + "*";
            	}
            }
            if (startsWith(jugadores[j].innerHTML,'*') && endsWith(jugadores[j].innerHTML,'*')) {
                jugadores[j].innerHTML = replaceAll(jugadores[j].innerHTML,'*','');
                jugadores[j].innerHTML = trim(jugadores[j].innerHTML);
                var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
                var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
                if (estadoJugador != "") {
                	if (jugadores[j].selected) {
                		select.style.backgroundColor = "lightCoral";
                    	select.title = estadoJugador.title;
                	}
                	jugadores[j].style.backgroundColor = "lightCoral";
                	jugadores[j].title = estadoJugador.title;
                	if (capaJug != null) {
                    	jugadores[j].title = estadoJugador.src;
                	} else {
                    	jugadores[j].title = estadoJugador.title;
                	}
                	estadoJugador = outerHTML(estadoJugador);
                } else {
                	jugadores[j].style.backgroundColor = "#CAE0C5";

                	if (capaJug != null) {
                		var jugSrc = readFotoPlayer(jugadores[j].innerHTML);
                		if (jugSrc != null) {
                    		var srcIndex = jugSrc.indexOf('src=') + 'src='.length;
                    		var charComillas = jugSrc.substring(srcIndex, srcIndex + 1);
                    		jugSrc = jugSrc.substring(srcIndex + 1, jugSrc.indexOf(charComillas, srcIndex + 1));
//                    		var srcIndex = jugSrc.indexOf('src=\'') + 'src=\''.length;
//                    		jugSrc = jugSrc.substring(srcIndex, jugSrc.indexOf('\'', srcIndex));

                        	jugadores[j].title = jugSrc;
                		}
                	}
                }
                jugadores[j].innerHTML = jugadores[j].innerHTML + ": " + puntosJugador + estadoJugador;
            } else {
                jugadores[j].innerHTML = trim(jugadores[j].innerHTML);
                var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
                var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
                if (estadoJugador != "") {
                	if (jugadores[j].selected) {
                		select.style.backgroundColor = "lightCoral";
                    	select.title = estadoJugador.title;
                	}
                	jugadores[j].style.backgroundColor = "lightCoral";
                	if (capaJug != null) {
                    	jugadores[j].title = estadoJugador.src;
                	} else {
                    	jugadores[j].title = estadoJugador.title;
                	}
                	estadoJugador = outerHTML(estadoJugador);
                } else {
                	jugadores[j].style.backgroundColor = "#CAE0C5";

                	if (capaJug != null) {
                		var jugSrc = readFotoPlayer(jugadores[j].innerHTML);
                		if (jugSrc != null) {
                    		var srcIndex = jugSrc.indexOf('src=') + 'src='.length;
                    		var charComillas = jugSrc.substring(srcIndex, srcIndex + 1);
                    		jugSrc = jugSrc.substring(srcIndex + 1, jugSrc.indexOf(charComillas, srcIndex + 1));

                        	jugadores[j].title = jugSrc;
                		}
                	}
                }
                jugadores[j].innerHTML = jugadores[j].innerHTML + ": (" + puntosJugador + ")" + estadoJugador;
            }
        }
	}
}
    //erpichi20111103
function accionSelects(parent, listaJugadores, listaJugadoresLesionados) {
	var selects = parent.getElementsByTagName("select");
	for( var j=0; j<selects.length; j++ ){
    	var select = selects[j];
    	select.addEventListener("change", function() {this.style.backgroundColor = "";this.title = "";actualizaAlineacionByTr(parent, listaJugadores, listaJugadoresLesionados);}, false);
    	//jQuery('#lineup_bg select').change(function(event){alert('pepe');})
	}
}

    //erpichi20111101
//erpichi20111120 - que compare mas de un solo caracter
function startsWith(cadena, str){
    if (cadena.length > 0
    		&& cadena.length >= str.length
    		&& cadena.substring(0, str.length) == str) {
    		//&& cadena[0] == str) {
        return true;
     } else {
         return false;
      }
   }
    //erpichi20111101
//erpichi20111120 - que compare mas de un solo caracter
function endsWith(cadena, str){
    if (cadena.length > 0
    		&& cadena.length >= str.length
    		&& cadena.substring(cadena.length - str.length) == str) {
    		//&& cadena[cadena.length - 1] == str) {
        return true;
     } else {
         return false;
      }
   }

//erpichi20111101
function outerHTML(element){
	var div = document.createElement('div');
	div.appendChild(element);
	return div.innerHTML;
}
		
    //erpichi20111101
function calculaPuntosJugador(jugadorNombre,listaJugadores){
	var jugador2 = "";
	for (var j = 0; j < listaJugadores.length; j++) {
		//TODO: convertir HTML to char
		jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
		if ( jugador2 == trim(jugadorNombre)) {
//            return getPuntosColor(listaJugadores[j][1]);
            return listaJugadores[j][1];
		}
	}
    return "s.c";
}

//erpichi20111103
function calculaEstadoScript(jugadorNombre) {
	var image = document.createElement('img');
//	var urlBaja = "http://www.calculapuntoscomunio.com/estados/";
//	var urlBaja = "http://www.comuniazo.com/estados";
	var urlBajaDefault = "http://www.comuniazo.com/comunio/lesionados";
	var urlBaja = "http://www.comuniazo.com/comunio/lesionados";
    if ( playerIDNameEstado[jugadorNombre]) {
		switch(playerIDNameEstado[jugadorNombre][0]) {   
		case "molestias":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es duda: ' + playerIDNameEstado[jugadorNombre][1] + " - " + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "lesion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
			image.title=jugadorNombre + ' esta lesionado: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "acum_tarjetas":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por acumulación de tarjetas: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "seleccion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es baja: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "doble_tarjeta":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
			image.title=jugadorNombre + ' es baja por doble amarilla: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "roja_directa":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por roja directa: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "vendido":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' ha sido vendido, ¿no?';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "no_convocado":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' no ha sido convocado en la última jornada';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			default:
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
		};	
	    image.title += " - Click aquí para visitar la fuente de la noticia.";
	} else {
		image.title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
		image.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
	    image.title += " - Click aquí para ver los lesionados/sancionados";
	}

    if (urlBaja == "" || urlBaja == "-") {
    	urlBaja = urlBajaDefault;
    }
	return "<a href='javascript:;' onclick=\"window.open('" + urlBaja + "?utm_source=scriptbeta&utm_medium=bajas&utm_campaign=scripts')\" >" + outerHTML(image) + "</a>";
}

//erpichi20111103
function calculaEstadoJugador(jugadorNombre,listaJugadores) {
	var jugador2 = "";
	var image = document.createElement('img');
	image.style.height = "1.1em";
	for (var j = 0; j < listaJugadores.length; j++) {
		//TODO: convertir HTML to char
		jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
//		alert(jugador2 + "-" + jugadorNombre);
	    if ( jugador2 == trim(jugadorNombre)) {
			switch(listaJugadores[j][1]) {   
			case "molestias":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' es duda: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "lesion":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
				image.title=jugadorNombre + ' esta lesionado: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "acum_tarjetas":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
				image.title=jugadorNombre + ' es baja por amarillas' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "seleccion":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' es baja: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "doble_tarjeta":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
				image.title=jugadorNombre + ' es baja por doble amarilla ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "roja_directa":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
				image.title=jugadorNombre + ' es baja por roja directa' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "vendido":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' ha sido vendido, ¿no?';
				break;
				case "no_convocado":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' no ha sido convocado en la última jornada';
				break;
				default:
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
				break;
			};	
			return image;
		}
	}
	return "";
}	
 
     // estado de jugadores - by diegocom - 20110812 - ini
     function actualizaEstado()
     {
		var images = document.getElementsByTagName("img");
		var listaJugadores = getNoPlayerList();
		var jugador2 = "";
		for(var i = 0; i <images.length; i++) {
		if(images[i].id.indexOf('estado') != -1) {
				var idImg = images[i].id;
				var jugadorNombre = idImg.replace('estado','').replace( /\_/g, ' ');
				var jugador = normalize(idImg.replace('estado','').replace( /\_/g, ' '));
				var baja = 0;
				for (var j = 0; j < listaJugadores.length; j++) {
					//TODO: convertir HTML to char
					jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				    if ( jugador2 == jugadorNombre) {
						
						switch(listaJugadores[j][1])
						{   
							case "molestias":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' es duda: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "lesion":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
							images[i].title=jugadorNombre + ' esta lesionado: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "acum_tarjetas":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
							images[i].title=jugadorNombre + ' es baja por amarillas' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "seleccion":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' es baja: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "doble_tarjeta":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
							images[i].title=jugadorNombre + ' es baja por doble amarilla ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "roja_directa":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
							images[i].title=jugadorNombre + ' es baja por roja directa' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
									
							case "vendido":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' ha sido vendido, ¿no?';
							
							case "no_convocado":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' no ha sido convocado en la última jornada';
							
							break;
							default:
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
							
							break;
						};	
						break;
					}
					else {
						images[i].title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
						images[i].src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
					}
				}
			}
		}
	 }	

	function actualizaPuntos()
     {
		var divspuntos = document.getElementsByTagName("div");
		var listaJugadores = getPointsPlayerList();
		var jugador2 = "";
		for(var i = 0; i <divspuntos.length; i++) {
		if(divspuntos[i].id.indexOf('puntos') != -1) {
				var idDiv = divspuntos[i].id;
				var jugadorNombre = idDiv.replace('puntos','').replace( /\_/g, ' ');
				var jugador = normalize(idDiv.replace('puntos','').replace( /\_/g, ' '));
				for (var j = 0; j < listaJugadores.length; j++) {
					//TODO: convertir HTML to char
					jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
					if ( jugador2 == jugadorNombre) {
						divspuntos[i].innerHTML=listaJugadores[j][1];
						
					}
				}
			}
		}	
	}
}

	var normalize = (function() {
	  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
	      mapping = {};
	 
	  for(var i = 0, j = from.length; i < j; i++ )
	      mapping[ from.charAt( i ) ] = to.charAt( i );
	 
	  return function( str ) {
	      var ret = [];
	      for( var i = 0, j = str.length; i < j; i++ ) {
	          var c = str.charAt( i );
	          if( mapping.hasOwnProperty( str.charAt( i ) ) )
	              ret.push( mapping[ c ] );
	          else
	              ret.push( c );
	      }      
	      return ret.join( '' );
	  }
	 
	})();

// estado de jugadores - by anthorlop - 20110301 - fin

	//Collect all kinds of tables in one
	tables1 = document.getElementsByClassName("tablecontent03");
	tables2 = document.getElementsByClassName("tablecontent03b");
	
	for( var i=0; i<tables1.length; i++ ){
		tables.push(tables1[i]);
	}
	for( var i=0; i<tables2.length; i++ ){
		tables.push(tables2[i]);
	}	

	//erpichi 20120304 - stats
	if (window.location.href.indexOf( "lineup" ) != -1){
			var objCabecera = document.getElementById("smallcontentright");
			objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2><div id='buscastatsCom' style='display: none;'></div><div id='buscastatsCpC' style='display: none;'></div><div id='buscastatsCMZ' style='display: none;'></div><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
			var linkStatsCom = document.getElementById("linkStatsCom");
			linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
			var linkStatsCpC = document.getElementById("linkStatsCpC");
			linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
			var linkStatsCMZ = document.getElementById("linkStatsCMZ");
			linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
	}
	
	function getStatsCom(tables) {
		
		if (document.getElementById("buscastatsCom") != null) {
			get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)});
		}
		
		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_stats") != -1) {
					tableRows[j].style.display = "";
				} else if (tableRows[j].id.indexOf("no_stats") != -1) {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCpC = "";
		if (document.getElementById("buscastatsCpC") != null) {
			buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
		}
		
		var buscastatsCMZ = "";
		if (document.getElementById("buscastatsCMZ") != null) {
			buscastatsCMZ = "<div id='buscastatsCMZ' style='display: none;'></div>";
		}
		

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCpC + buscastatsCMZ + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ocultar Comunio Stats' alt='Ocultar Comunio Stats' src='" + images['comstatsno'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLNoStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getNoStats(tables, ""); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getNoStatsCom(tables, ""); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
		var linkStatsCMZ = document.getElementById("linkStatsCMZ");
		linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
	
	}
	
	function getStatsCpC(tables) {
		var mostrarCpC = true;
		if (document.getElementById("buscastatsCpC") != null) {
			var fechaActualDate = new Date();
			var fechaActual = fechaActualDate.getDate() + "/" + (fechaActualDate.getMonth() +1) + "/" + fechaActualDate.getFullYear();
			var cpcVisitDate = localStorage.getItem("visitDateCpC");
			if (cpcVisitDate == null) {
				cpcVisitDate = "";
			}
			if (cpcVisitDate != fechaActual) {
				if(confirm("Debes conectarte a la página de CpC para disfrutar de las estupendas crónicas que nos ofrece. ¿Quieres abrir CpC en una nueva ventana?")) {
					localStorage.setItem("visitDateCpC", fechaActual);
					window.open("http://www.calculapuntoscomunio.com/");
				} else {
					mostrarCpC = false;
				}
			}
		}
		
		if (mostrarCpC) {
			for( var i=0; i<tables.length; i++ ){
				thisTable = tables[i];
				tableRows = thisTable.getElementsByTagName('td');
				for ( var j = 0; j < tableRows.length; j++ ){
					if (tableRows[j].id.indexOf("si_cronic") != -1) {
						tableRows[j].style.display = "";
					} else if (tableRows[j].id.indexOf("no_cronic") != -1) {
						tableRows[j].style.display = "none";
					}
				}
			}
			
			var buscastatsCom = "";
			if (document.getElementById("buscastatsCom") != null) {
				buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
			}
			
			var buscastatsCMZ = "";
			if (document.getElementById("buscastatsCMZ") != null) {
				buscastatsCMZ = "<div id='buscastatsCMZ' style='display: none;'></div>";
			}
			

			var objCabecera = document.getElementById("smallcontentright");
			objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + buscastatsCMZ + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ocultar Crónicas de CpC' alt='Ocultar Crónicas de CpC' src='" + images['cpcno'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
//			var linkStats = document.getElementById("linkStats");
	//
////			linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLNoStats(text2, tables)}); }, true );
//			linkStats.addEventListener( "click", function(){getNoStats(tables, ""); }, true );
			
			var linkStatsCom = document.getElementById("linkStatsCom");
			linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
			var linkStatsCpC = document.getElementById("linkStatsCpC");
			linkStatsCpC.addEventListener( "click", function(){getNoStatsCpC(tables, ""); }, true );
			var linkStatsCMZ = document.getElementById("linkStatsCMZ");
			linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
		}
	
	}
	
	function getStatsCMZ(tables) {
		var mostrarCMZ = true;
		if (document.getElementById("buscastatsCMZ") != null) {
			var fechaActualDate = new Date();
			var fechaActual = fechaActualDate.getDate() + "/" + (fechaActualDate.getMonth() +1) + "/" + fechaActualDate.getFullYear();
			var cmzVisitDate = localStorage.getItem("visitDateCMZ");
			if (cmzVisitDate == null) {
				cmzVisitDate = "";
			}
			if (cmzVisitDate != fechaActual) {
				if(confirm("Debes conectarte a la página de Comuniazo para disfrutar de los estupendos datos que nos ofrece. ¿Quieres abrir Comuniazo en una nueva ventana?")) {
					localStorage.setItem("visitDateCMZ", fechaActual);
					window.open("http://www.comuniazo.com?utm_source=scriptbeta&utm_medium=stats&utm_campaign=scripts");
				} else {
					mostrarCMZ = false;
				}
			}
		}
		
		if (mostrarCMZ) {
			for( var i=0; i<tables.length; i++ ){
				thisTable = tables[i];
				tableRows = thisTable.getElementsByTagName('td');
				for ( var j = 0; j < tableRows.length; j++ ){
					if (tableRows[j].id.indexOf("si_comuniazo") != -1) {
						tableRows[j].style.display = "";
					} else if (tableRows[j].id.indexOf("no_comuniazo") != -1) {
						tableRows[j].style.display = "none";
					}
				}
			}
			
			var buscastatsCom = "";
			if (document.getElementById("buscastatsCom") != null) {
				buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
			}
			
			var buscastatsCpC = "";
			if (document.getElementById("buscastatsCpC") != null) {
				buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
			}
			

			var objCabecera = document.getElementById("smallcontentright");
			objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + buscastatsCpC + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ocultar Datos de Comuniazo' alt='Ocultar Datos de Comuniazo' src='" + images['cmzno'] + "'></a>";
//			var linkStats = document.getElementById("linkStats");
	//
////			linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLNoStats(text2, tables)}); }, true );
//			linkStats.addEventListener( "click", function(){getNoStats(tables, ""); }, true );
			
			var linkStatsCom = document.getElementById("linkStatsCom");
			linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
			var linkStatsCpC = document.getElementById("linkStatsCpC");
			linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
			var linkStatsCMZ = document.getElementById("linkStatsCMZ");
			linkStatsCMZ.addEventListener( "click", function(){getNoStatsCMZ(tables, ""); }, true );
		}
	
	}
	
	function getNoStatsCom(tables, buscastats) {

		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_normal") != -1) {
					tableRows[j].style.display = "";
				} else {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCpC = "";
		if (document.getElementById("buscastatsCpC") != null) {
			buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
		}
		
		var buscastatsCMZ = "";
		if (document.getElementById("buscastatsCMZ") != null) {
			buscastatsCMZ = "<div id='buscastatsCMZ' style='display: none;'></div>";
		}

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastats + buscastatsCpC + buscastatsCMZ + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getStats(tables); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
		var linkStatsCMZ = document.getElementById("linkStatsCMZ");
		linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
	
	}
	
	function getNoStatsCpC(tables, buscastats) {

		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_normal") != -1) {
					tableRows[j].style.display = "";
				} else {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCom = "";
		if (document.getElementById("buscastatsCom") != null) {
			buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
		}
		
		var buscastatsCMZ = "";
		if (document.getElementById("buscastatsCMZ") != null) {
			buscastatsCMZ = "<div id='buscastatsCMZ' style='display: none;'></div>";
		}

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + buscastatsCMZ + buscastats +"<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getStats(tables); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
		var linkStatsCMZ = document.getElementById("linkStatsCMZ");
		linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
	
	}
	
	function getNoStatsCMZ(tables, buscastats) {

		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_normal") != -1) {
					tableRows[j].style.display = "";
				} else {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCom = "";
		if (document.getElementById("buscastatsCom") != null) {
			buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
		}
		
		var buscastatsCpC = "";
		if (document.getElementById("buscastatsCpC") != null) {
			buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
		}

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + buscastatsCpC + buscastats +"<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCMZ' href='javascript:;' ><img title='Ver Datos de Comuniazo' alt='Ver Datos de Comuniazo' src='" + images['cmz'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getStats(tables); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
		var linkStatsCMZ = document.getElementById("linkStatsCMZ");
		linkStatsCMZ.addEventListener( "click", function(){getStatsCMZ(tables); }, true );
	
	}
	
	function getURLStats(text, tables) {
		if (text.indexOf(">" + userId + "<") == -1) {
			getNoStatsCom(tables, "<div id='buscastatsCom' style='display: none;'></div>");
			if(confirm("Debes logarte en la página de Comunio Stats para disfrutar de las estupendas estadísticas que nos ofrece Comunio. ¿Quieres abrir Comunio Stats en una nueva ventana para logarte?")) {
				window.open("http://stats.comunio.es/my_team.php");
			}
			return;
		}
		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				var jugadorNombre = "";
				if (tableRows[j].id.indexOf("si_statsTrends") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsTrends')).replace('si_statsTrends','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						while (text.charAt(trendIndex) != "<") {
							trendIndex = trendIndex - 1;
						};
						var imgTrend = text.substring(trendIndex, text.indexOf(">", trendIndex) + 1);
						var imgTrendStyle = 'background-image: url("http://comstats.net/images/all_icons1.png");height: 25px;width: 25px;';
						if(imgTrend.indexOf("trend_5") != -1) {
							imgTrendStyle += "background-position: -564px -275px;";
						} else if(imgTrend.indexOf("trend_4") != -1) {
							imgTrendStyle += "background-position: -564px -250px;";
						} else if(imgTrend.indexOf("trend_3") != -1) {
							imgTrendStyle += "background-position: -564px -225px;";
						} else if(imgTrend.indexOf("trend_2") != -1) {
							imgTrendStyle += "background-position: -564px -200px;";
						} else if(imgTrend.indexOf("trend_1") != -1) {
							imgTrendStyle += "background-position: -564px -175px;";
						} else if(imgTrend.indexOf("trend_0") != -1) {
							imgTrendStyle += "background-position: -564px -150px;";
						} else if(imgTrend.indexOf("trend_-1") != -1) {
							imgTrendStyle += "background-position: -564px -125px;";
						} else if(imgTrend.indexOf("trend_-2") != -1) {
							imgTrendStyle += "background-position: -564px -100px;";
						} else if(imgTrend.indexOf("trend_-3") != -1) {
							imgTrendStyle += "background-position: -564px -75px;";
						} else if(imgTrend.indexOf("trend_-4") != -1) {
							imgTrendStyle += "background-position: -564px -50px;";
						} else if(imgTrend.indexOf("trend_-5") != -1) {
							imgTrendStyle += "background-position: -564px -25px;";
						}
//						var imgTrendStyle = 'background-image: url("http://comstats.net/images/trends2.png");height: 25px;width: 25px;';
//						if(imgTrend.indexOf("trend_5") != -1) {
//							imgTrendStyle += "background-position: 0 -275px;";
//						} else if(imgTrend.indexOf("trend_4") != -1) {
//							imgTrendStyle += "background-position: 0 -250px;";
//						} else if(imgTrend.indexOf("trend_3") != -1) {
//							imgTrendStyle += "background-position: 0 -225px;";
//						} else if(imgTrend.indexOf("trend_2") != -1) {
//							imgTrendStyle += "background-position: 0 -200px;";
//						} else if(imgTrend.indexOf("trend_1") != -1) {
//							imgTrendStyle += "background-position: 0 -175px;";
//						} else if(imgTrend.indexOf("trend_0") != -1) {
//							imgTrendStyle += "background-position: 0 -150px;";
//						} else if(imgTrend.indexOf("trend_-1") != -1) {
//							imgTrendStyle += "background-position: 0 -125px;";
//						} else if(imgTrend.indexOf("trend_-2") != -1) {
//							imgTrendStyle += "background-position: 0 -100px;";
//						} else if(imgTrend.indexOf("trend_-3") != -1) {
//							imgTrendStyle += "background-position: 0 -75px;";
//						} else if(imgTrend.indexOf("trend_-4") != -1) {
//							imgTrendStyle += "background-position: 0 -50px;";
//						} else if(imgTrend.indexOf("trend_-5") != -1) {
//							imgTrendStyle += "background-position: 0 -25px;";
//						}
						imgTrend = imgTrend.replace("<img", "<img style='" + imgTrendStyle +"' ");
						tableRows[j].innerHTML = imgTrend;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				} else if (tableRows[j].id.indexOf("si_statsLast") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsLast')).replace('si_statsLast','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						var lastIndex = text.indexOf("<td", trendIndex);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
//						var lastIndex = text.indexOf("schmal", trendIndex);
//						while (text.charAt(lastIndex) != "<") {
//							lastIndex = lastIndex - 1;
//						};
						var imgLast = text.substring(lastIndex, text.indexOf("</td>", lastIndex) + 5);
						imgLast = imgLast.substring(imgLast.indexOf(">") + 1).replace("</td>", "");
						tableRows[j].innerHTML = imgLast;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				} else if (tableRows[j].id.indexOf("si_statsMedia") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsMedia')).replace('si_statsMedia','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						var lastIndex = text.indexOf("<td", trendIndex);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
						lastIndex = text.indexOf("<td", lastIndex + 1);
//						var lastIndex = text.indexOf("schmal", trendIndex);
//						while (text.charAt(lastIndex) != "<") {
//							lastIndex = lastIndex - 1;
//						};
//						lastIndex = lastIndex - 1;
//						while (text.charAt(lastIndex) != "<") {
//							lastIndex = lastIndex - 1;
//						};
//						lastIndex = lastIndex - 1;
//						while (text.charAt(lastIndex) != "<") {
//							lastIndex = lastIndex - 1;
//						};
						var imgLast = text.substring(lastIndex, text.indexOf("</td>", lastIndex) + 5);
						imgLast = imgLast.substring(imgLast.indexOf(">") + 1).replace("</td>", "");
						tableRows[j].innerHTML = imgLast;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				}
			}
		}
	}

	
	var numTotalJugadores = 0;
	//Iterate through the tables we have collected
	for( var i=0; i<tables.length; i++ ){
	
		//If we are in the administration page, we dont touch it
		if( window.location.href.indexOf( "administration" ) != -1 ){
			break;
		}
	
		thisTable = tables[i];
		
		if (plusPlayer) {
			if (thisTable.parentNode.id == 'preview') {
				try {
					unsafeWindow.show('preview');
				} catch (ex) {
					console.log("Error - unsafeWindow.show('preview'); - " + ex );
				}
				continue;
			}
		}
		if (thisTable.previousSibling.previousSibling != null) {
			if (thisTable.previousSibling.previousSibling.childNodes.length >= 3) {
				if (thisTable.previousSibling.previousSibling.childNodes[3].innerHTML == '<h2>next gamedays</h2>'
						|| thisTable.previousSibling.previousSibling.childNodes[3].innerHTML == '<h2>gamedays</h2>') {
					continue;
				}
			}
		}
		
		//Add sorting capability	
		var Table1Sorter = new TSorter;
		Table1Sorter.init(thisTable);
		
		if (!plusPlayer
				&& (window.location.href.indexOf( "exchangemarket.phtml?takeplayeroff" ) != -1
				|| window.location.href.indexOf( "exchangemarket.phtml?acceptoffer" ) != -1
				|| window.location.href.indexOf( "exchangemarket.phtml?declineoffer" ) != -1
				|| window.location.href.indexOf( "exchangemarket.phtml?recalloffer" ) != -1)) {
			var thisTBodys = thisTable.getElementsByTagName('tbody');
			if (thisTBodys != null && thisTBodys.length > 0) {
				thisTBodys[0].innerHTML += '<tr class="tr1c"><td align="center"><input type="checkbox" align="bottom" style="margin-left:7px;margin-bottom:0px;" onclick="CheckAll(\'takeOff\');" value="Checkall" name="Checkall" id="Checkall"></td><td align="center" colspan="9">Todos</td></tr>';
			}
		}

		//Obtain the rows of the table
		tableRows = thisTable.getElementsByTagName('tr');

		for ( var j = 0; j < tableRows.length; j++ ){
		
			thisRow = tableRows[j];
			//Columns of the row
			var td = thisRow.getElementsByTagName('td');
			
			//erpichi 20111120 - que no modifique nada en la home que falla
			if((thisRow.getAttribute('class') == 'tr1' || thisRow.getAttribute('class') == 'tr2'  || thisRow.getAttribute('class') == 'highlightedtablecontent' )
					&& !endsWith(window.location.href, "comunio.es/")){		//if it is a player...
				
				numTotalJugadores++;
				
				//erpichi 20111120 - Fotos de los jugadores
				var tdNew = document.createElement("TD");
				
				//crear la nueva columna foto del jugador
				tdNew.appendChild(document.createTextNode(''));
				tdNew.align = "center";

				tdNew.innerHTML = '';
				thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
				
				var suplente = true;
				//alert(td[playerNameCol].textContent);
				//+"-"+(startsWith(td[playerNameCol].textContent,'*') && endsWith(td[playerNameCol].textContent,'*')));
                if (startsWith(td[playerNameCol].textContent,'*') && endsWith(td[playerNameCol].textContent,'*')) {
                	suplente = false;
                }
				playerName = td[playerNameCol].textContent.replace( /\*/g, "" );
				
				//erpichi 20111123 - Evitar que si eres plusPlayer se vean mal los equipos
				//teamName = td[teamNameCol].textContent;
				teamName = td[teamNameCol].innerHTML;
				if (startsWith(teamName, "<a")) {
					var divEquipo = document.createElement("div");
					divEquipo.innerHTML = teamName;
					teamName = divEquipo.childNodes[0].title;
				}
				if (startsWith(teamName, "<span")) {
					var divEquipo = document.createElement("div");
					divEquipo.innerHTML = teamName;
					teamName = divEquipo.childNodes[0].title;
				}
				
				//Comunio errors with spaces
				playerName = trim(playerName);
				teamName = trim(teamName);
				////////////////////////////////
		
				//Id number of the player
				idPlayer = playerID[ playerName ];

				var jugStorageMercado = localStorage.getItem("scriptSeguir" + idPlayer);
				if (jugStorageMercado != null && jugStorageMercado != "") {
					thisRow.className += " highlightedtablecontent";
				}
				
				if( !playerID[ playerName ] && updated == false ){
					updated = true;
					idPlayer = playerID[ playerName ];
				}

				td[playerNameCol].id='si_normal' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
				td[teamTotalesCol].id='si_normalsi_statsno_cronicsi_comuniazototales' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );

				td[teamNameCol].id='si_normalno_statsno_cronicno_comuniazoequipo' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
				//Image and link of the team
				if (teamName == 'ha dejado la liga') {
					td[teamNameCol].innerHTML = '<img src="' + images[ teamName ] + '" alt="' +
					teamName +'" title="' +teamName + '" border="0" />';
				} else {
//					td[teamNameCol].innerHTML = '<a href="' + teamURL[ GM_getValue( "URLSrc", "oficial" ) ][ teamName ] + 
//					'" target="_blank"><img src="' + images[ teamName ] + '" alt="' +
//					teamName +'" title="' +teamName + '" border="0" /></a>';

					td[teamNameCol].innerHTML = '<a href="' + teamURL[ GM_getValue( "URLSrc", "CMN" ) ][ teamName ] + 
					'" onclick="return(openSmallWindow(\'' + teamURL[ GM_getValue( "URLSrc", "CMN" ) ][ teamName ] + '\'))" target="_blank"><img src="' + images[ teamName ] + '" alt="' +
					teamName +'" title="' +teamName + '" border="0" /></a>';
					
					 
				}
																				
									
				//SCRIPT link					
				td[playerNameCol].innerHTML ='<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
												//erpichi 20111103
												//td[playerNameCol].textContent + '</a>';
												playerName + '</a>';

				var mostrarCambios = true;
				
				if (!plusPlayer && suplente && window.location.href.indexOf( "lineup" ) != -1) {
					//td[playerNameCol].style.fontSize="smaller";
					td[playerNameCol].style.fontStyle="italic";
					td[playerNameCol].style.textAlign="right";
					td[playerNameCol].style.paddingRight="1em";
					td[playerNameCol].childNodes[0].style.color="darkolivegreen";
					
					if (!mostrarCambios) {
						//erpichi 20111206 - Camiseta jugador suplente
						var tdNewSuplente = document.createElement("TD");
						tdNewSuplente.id='si_normalsi_cronicno_statsno_comuniazotitular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						//crear la nueva columna camiseta Suplente
						tdNewSuplente.align = "center";
//						alert("<small>" + playerIDNameEntra[playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" )] + '</small>');
//						tdNewSuplente.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es suplente en tu equipo" title="Es suplente en tu equipo" src="i/1/suit.gif">';
						tdNewSuplente.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es suplente en tu equipo" title="Es suplente en tu equipo" src="' + images['suplente'] + '">';
						thisRow.appendChild(tdNewSuplente);
					}
				//erpichi 20111206 - Camiseta jugador titular
				} else if (window.location.href.indexOf( "lineup" ) != -1) {
					//td[playerNameCol].childNodes[0].style.color="lightgray";

					if (!mostrarCambios) {
						var tdNewAlineado = document.createElement("TD");
						tdNewAlineado.id='si_normalsi_cronicno_statsno_comuniazotitular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						//crear la nueva columna camiseta Titular
						tdNewAlineado.align = "center";
//						alert("<small>" + playerIDNameEntra[playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" )] + '</small>');
//						tdNewAlineado.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es titular en tu equipo" title="Es titular en tu equipo" src="i/1/whitesuit.gif">';
						tdNewAlineado.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es titular en tu equipo" title="Es titular en tu equipo" src="' + images['titular'] + '">';
						thisRow.appendChild(tdNewAlineado);
					}
				}
				var scriptJornadaString = localStorage.getItem("scriptJornada");
				if (mostrarCambios) {
//					if (window.location.href.indexOf( "lineup" ) != -1) {
					if (window.location.href.indexOf( "putOnExchangemarket" ) == -1) {
						var tdNewAlineado = document.createElement("TD");
						tdNewAlineado.id='si_normalsi_cronicno_statsno_comuniazotitular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						//crear la nueva columna camiseta Titular
						tdNewAlineado.align = "center";
						var valorEntra = "";
						var valorSale = "";
//						var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="i/1/tribuene2.gif" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
						var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="' + images['nojugadoEquipo'] + '" alt="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '">';
						if (playerIDNamePuntos[playerName] != null) {
							var entra = playerIDNameEntra[playerName];
							var sale = playerIDNameSale[playerName];
							var url = playerIDNameUrl[playerName];
		
//							camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
							camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
							if (sale != null && sale != "-") {
//								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
								valorSale = '<small style="display: block;color: red;font-weight: bold;">' + sale + "\'</small>";
							}
							if (entra != null && entra != "-") {
//								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/suit.gif">';
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['suplente'] + '">';
								valorEntra = '<small style="display: block;color: #3F5B34;font-weight: bold;">' + entra + '\'</small>';
							}
							if (playerIDNamePuntos[playerName] == "s.c.") {
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="15" src="' + images['nojugado'] + '" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
							}
							camiseta = valorEntra + "<a href='javascript:;' onclick=\"window.open('" + url + "')\" >" + camiseta + "</a>" + valorSale;
						}
		//				alert("<small>" + playerIDNameEntra[playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" )] + '</small>');
						tdNewAlineado.innerHTML = camiseta;
						thisRow.appendChild(tdNewAlineado);
					}
				}

				// estado de jugadores - by diegocom - 20110820 - ini
				// nueva columna en alineacion
				if (window.location.href.indexOf( "lineup" ) != -1
					|| window.location.href.indexOf( "playerInfo" ) != -1
					|| window.location.href.indexOf( "clubInfo" ) != -1
					|| window.location.href.indexOf( "placeOffers" ) != -1
					|| window.location.href.indexOf( "exchangemarket" ) != -1
					/*&& window.location.href.indexOf( "viewoffers" ) == -1*/) {

					//erpichi 20111120 - Fotos de los jugadores
					var tdNew = thisRow.childNodes[0];
					tdNew.id='si_normal' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					//crear la nueva columna foto del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

					tdNew.innerHTML = '<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
//							'<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/m/' + idPlayer + '.gif?pln=1" /></a>';
							readFotoPlayer(playerName) + '</a>';
					
					var tdNew = document.createElement("TD");
					tdNew.id='si_normalno_cronicno_statsno_comuniazoestado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
//					tdNew.innerHTML = '<img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" id="estado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" />';
					tdNew.innerHTML = calculaEstadoScript(playerName);
					thisRow.appendChild(tdNew);
					
					var tdNew = document.createElement("TD");
					tdNew.id='si_normalsi_cronicno_statsno_comuniazopuntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

//					tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >s.c.</div>';
					var puntosScript = "-";
					if (playerIDNamePuntos[playerName]) {
						puntosScript = playerIDNamePuntos[playerName];
					}
//					var urlPuntos = "http://www.calculapuntoscomunio.com/puntos/";
//					var titlePuntos = "Click aquí para ver los puntos en CpC.";
					var urlPuntos = "http://www.comuniazo.com/puntos?utm_source=scriptbeta&utm_medium=puntos&utm_campaign=scripts";
					var titlePuntos = "Click aquí para ver los puntos en Comuniazo.";
					tdNew.innerHTML = "<a  style='text-decoration: none;' title='" + titlePuntos + "' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + getPuntosColor(puntosScript) + '</div>' + "</a>";
				    
					thisRow.appendChild(tdNew);
				}
				// estado de jugadores - by diegocom - - fin
				
				//erpichi20120304 - stats
				if (window.location.href.indexOf( "lineup" ) != -1){
					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicno_comuniazosi_statsMedia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsMedia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicno_comuniazosi_statsTrends' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsTrends' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					

					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicno_comuniazosi_statsLast' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsLast' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					

					var url = playerIDNameUrl[playerName];
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicno_comuniazoPicas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgPicas = (playerIDNamePicas[playerName]) ? playerIDNamePicas[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Picas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicPicas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgPicas  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicno_comuniazoGoles' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgGoles = (playerIDNameGoles[playerName]) ? playerIDNameGoles[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Goles. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicGoles' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgGoles  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicno_comuniazoTarjetas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgTarjetas = (playerIDNameTarjetas[playerName]) ? playerIDNameTarjetas[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Tarjetas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicTarjetas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgTarjetas  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicno_comuniazoMarcador' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgMarcador = (playerIDNameMarcador[playerName]) ? playerIDNameMarcador[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Marcador. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 4em;" id="cronicMarcador' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgMarcador  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					var urlComuniazo = "http://www.comuniazo.com/jugadores/" + idPlayer + "?utm_source=scriptbeta&utm_medium=cronica&utm_campaign=scripts";
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statsno_cronicsi_comuniazoEficiencia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var divEficiencia = (playerIDNameEficiencia[playerName]) ? playerIDNameEficiencia[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + urlComuniazo + "')\" title='Eficiencia. Click aquí para ver los datos en Comuniazo.' >" + '<div style="display:inline-block; font-size: 9px;" id="cronicEficiencia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + divEficiencia  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statsno_cronicsi_comuniazoValor' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var divValor = (playerIDNameValor[playerName]) ? playerIDNameValor[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + urlComuniazo + "')\" title='Valor. Click aquí para ver los datos en Comuniazo.' >" + '<div style="display:inline-block; font-size: 9px;" id="cronicValor' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + divValor  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statsno_cronicsi_comuniazoMediavalor' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var divMediavalor = (playerIDNameMediavalor[playerName]) ? playerIDNameMediavalor[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + urlComuniazo + "')\" title='Media valor. Click aquí para ver los datos en Comuniazo.' >" + '<div style="display:inline-block; font-size: 9px;" id="cronicMediavalor' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + divMediavalor  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
				}
				
				//erpichi 201111120 - estado jugador en vender jugadores
				if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {

					//erpichi 20111120 - Fotos de los jugadores
					var tdNew = thisRow.childNodes[0];
					
					//crear la nueva columna foto del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

					tdNew.innerHTML = '<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
//							'<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/m/' + idPlayer + '.gif?pln=1" /></a>';
						readFotoPlayer(playerName) + '</a>';
					
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna estado del jugador
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "center";
						
//						tdNew.innerHTML = '<img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" id="estado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" />';
						tdNew.innerHTML = calculaEstadoScript(trim(playerName));
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);

						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						var nombreJugadorComprado = trim(playerName).replace(/"/g, "quot").replace( /\ /g, "_" );
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna precio de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="precioCompra" + nombreJugadorComprado;
						//tdNew.id="precioCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = '-';
						if (plusPlayer) {
							tdNew.style.display = "none";
						}
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna diferencia de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="diferenciaCompra" + nombreJugadorComprado;
						//tdNew.id="diferenciaCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = "-<span id='diferenciaCompraValue" + nombreJugadorComprado + "' style='display: none;'>" + td[valorMercadoCol].textContent +"</span>";
						//tdNew.innerHTML = "-<span id='diferenciaCompraValue" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + "' style='display: none;'>" + td[valorMercadoCol].textContent +"</span>";
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna fecha de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="fechaCompra" + nombreJugadorComprado;
						//tdNew.id="fechaCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = '-';
						if (plusPlayer) {
							tdNew.style.display = "none";
						}
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna puntos del jugador
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "center";
//						
						var valorEntra = "";
						var valorSale = "";
//						var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="i/1/tribuene2.gif" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
						var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="' + images['nojugadoEquipo'] + '" alt="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '">';
						if (playerIDNamePuntos[playerName] != null) {
							var entra = playerIDNameEntra[playerName];
							var sale = playerIDNameSale[playerName];
							var url = playerIDNameUrl[playerName];
		
//							camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
							camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
							if (sale != null && sale != "-") {
//								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
								valorSale = '<small style="display: block;color: red;font-weight: bold;">' + sale + "\'</small>";
							}
							if (entra != null && entra != "-") {
//								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/suit.gif">';
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['suplente'] + '">';
								valorEntra = '<small style="display: block;color: #3F5B34;font-weight: bold;">' + entra + '\'</small>';
							}
							if (playerIDNamePuntos[playerName] == "s.c.") {
								camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="15" src="' + images['nojugado'] + '" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
							}
							camiseta = valorEntra + "<a href='javascript:;' onclick=\"window.open('" + url + "')\" >" + camiseta + "</a>" + valorSale;
						}
						
						
						tdNew.innerHTML = camiseta;
					    
						thisRow.appendChild(tdNew);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna puntos del jugador
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "center";
						
//						tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >s.c.</div>';
						var puntosScript = "-";
						if (playerIDNamePuntos[trim(playerName)]) {
							puntosScript = playerIDNamePuntos[trim(playerName)];
						}
//						tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + puntosScript + '</div>';
//						var urlPuntos = "http://www.calculapuntoscomunio.com/puntos/";
//						var titlePuntos = "Click aquí para ver los puntos en CpC.";
						var urlPuntos = "http://www.comuniazo.com/puntos?utm_source=scriptbeta&utm_medium=puntos&utm_campaign=scripts";
						var titlePuntos = "Click aquí para ver los puntos en Comuniazo.";
						tdNew.innerHTML = "<a style='text-decoration: none;' title='" + titlePuntos + "' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + getPuntosColor(puntosScript) + '</div>' + "</a>";
					    
						thisRow.appendChild(tdNew);
						//thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
					}

				cellOwnersToConvert.push( td[ownerCol] );
			
			} else{	//If not a player, we are in the headings
			
				if( window.location.href.indexOf( "standings" ) != -1 ||	//Standings table--> out (only sorting)
					window.location.href.indexOf( "teamInfo.phtml" ) != -1 ||	//Table with the community players
					window.location.href.indexOf( "team_news" ) != -1) {	//News board table--> out (only sorting)
					break;
				}
				
				//erpichi 201111120 - estado jugador en vender jugadores
				//thisRow = tableRows[0];
				//Columns of the row
				//var tdHeader = thisRow.getElementsByTagName('td');
				for(var k = 0; k < td.length; k++) {
					td[k].align = "center";
				}

				//erpichi 20111120 - Fotos de los jugadores
				if (window.location.href.indexOf( "lineup" ) != -1
						|| window.location.href.indexOf( "playerInfo" ) != -1
						|| window.location.href.indexOf( "clubInfo" ) != -1
						|| window.location.href.indexOf( "placeOffers" ) != -1
						|| window.location.href.indexOf( "exchangemarket" ) != -1
						/*&& window.location.href.indexOf( "viewoffers" ) == -1*/) {

					var tdNew = document.createElement("TD");
					
					//crear la nueva columna fotos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
				}
				//erpichi 201111120 - estado jugador en vender jugadores
				if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {

					//erpichi 20111120 - Fotos de los jugadores

					var tdNew = document.createElement("TD");
					
					//crear la nueva columna fotos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Estado';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Precio de la compra';
					//thisRow.appendChild(tdNew);
					if (plusPlayer) {
						tdNew.style.display = "none";
					}
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Diferencia';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Fecha de la compra';
					if (plusPlayer) {
						tdNew.style.display = "none";
					}
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';//'Últimos puntos';
					thisRow.appendChild(tdNew);
					//thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
				}
			
				//Get the number of column
				playerNameCol = 0;
				teamNameCol = 1;
				teamTotalesCol = 2;
				
				for( var k = 0; k < td.length; k++ ){
				
					if( td[k].textContent.indexOf("Nombre") != -1 || td[k].textContent.indexOf("Por") != -1 ){
						playerNameCol = k;
					}
					else if( td[k].textContent.indexOf("Equipo") != -1 ){
						teamNameCol = k;
						teamTotalesCol = k+1;
					}
					else if( td[k].textContent.indexOf("Propietario") != -1 ||
							 td[k].textContent.indexOf("Para") != -1 ||
							 td[k].textContent.indexOf("De") != -1 ){
						
						ownerCol = k;
					}
				}
			}
		}
	}
	
	//ponemos el numero total de jugadores
	var divAlineacion = document.getElementById("smallcontentright");
	
	if (divAlineacion != null) {

		var newDiv = document.createElement("div");
		newDiv.innerHTML ='<div class="boxcontentdown" style="text-align:center;padding:6px 0px 0px 0px;"><div class="bar_content_r">' + numTotalJugadores + ' jugadores</div></div>';
	
		divAlineacion.appendChild(newDiv);
	}
	
	
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {
		function getJugadoresComprados(text) {
			var pujaspos = text.indexOf("Tus pujas:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divPujas";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Efectuada") {
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("precioCompra" + nombreJugadorComprado) != null
							&& document.getElementById("precioCompra" + nombreJugadorComprado).innerHTML == "-") {
						
						if (document.getElementById("precioCompra" + nombreJugadorComprado) != null) {
							document.getElementById("precioCompra" + nombreJugadorComprado).innerHTML = tdsPujas[precioVentaCol].innerHTML;

						}
						if (document.getElementById("diferenciaCompra" + nombreJugadorComprado) != null) {
							var precioMercado = document.getElementById("diferenciaCompraValue" + nombreJugadorComprado).textContent;
							precioMercado = replaceAll(precioMercado, ".", "");
							var precioCompra = tdsPujas[precioVentaCol].textContent;
							precioCompra = replaceAll(precioCompra, ".", "");
							var diferencia =  parseInt(precioMercado) - parseInt(precioCompra);
							if (diferencia > 0) {
								document.getElementById("diferenciaCompra" + nombreJugadorComprado).style.color = "#3F5B34";
							} else if (diferencia < 0) {
								document.getElementById("diferenciaCompra" + nombreJugadorComprado).style.color = "RED";
							}
							diferencia = formateaNumero(diferencia, ".", true);
							document.getElementById("diferenciaCompra" + nombreJugadorComprado).innerHTML = diferencia;
						}
						if (document.getElementById("fechaCompra" + nombreJugadorComprado) != null) {
							document.getElementById("fechaCompra" + nombreJugadorComprado).innerHTML = tdsPujas[fechaVentaCol].innerHTML;
						}
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = "";
				if (window.location.href.indexOf("https://") != -1) {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
				} else {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				}
				get( comunio + "/" + hrefSiguientePuja, getJugadoresComprados );
			}
		}
		
		get( window.location.href.replace( "putOnExchangemarket.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresComprados );
	}
	
	//erpichi 20111120 
	function formateaNumero(numero, separador_miles, mostrarPositivos) {
	    numero = parseInt(numero);
	    if(isNaN(numero)){
	        return "";
	    }
	    
	    if (mostrarPositivos && numero <= 0) {
	    	mostrarPositivos = false;
	    }

	    if(separador_miles){
	    	numero = numero.toString();
	        // Añadimos los separadores de miles
	        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
	        while(miles.test(numero)) {
	            numero=numero.replace(miles, "$1" + separador_miles + "$2");
	        }
	    }
	    
	    if (mostrarPositivos) {
	    	numero = "+" + numero;
	    }

	    return numero;
	}
	
	//erpichi 20111112
	if (window.location.href.indexOf( "standings" ) != -1 ) {
		if (document.getElementById("smallcontentrightst") != null){
			document.getElementById("smallcontentrightst").style.fontSize="0.93em";
		}
	}
	// estado de jugadores - by diegocom - 20110820 - ini
	if (window.location.href.indexOf( "lineup" ) != -1 ) {
//		actualizaEstado();
	//erpichi20111105
		getProximaJornada();
	//erpichi20111105
		actualizaTextoInformacion();
    //erpichi20111101
		actualizaAlineacion();
	}
	if (window.location.href.indexOf( "playerInfo" ) != -1 ) {
//		actualizaEstado();
		}
	if (window.location.href.indexOf( "exchangemarket" ) != -1
				/*&& window.location.href.indexOf( "viewoffers" ) == -1*/)
	{
//		actualizaEstado();
	}
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1)
	{
//		actualizaEstado();
	}
	//erpichi 201111120 - fotos de los jugadores y estado
	if (window.location.href.indexOf( "placeOffers" ) != -1)
	{
//		actualizaEstado();
	}
	// estado de jugadores - by diegocom - 20110820 - fin
	
	// puntos  de jugadores - by diegocom - 20111013 - ini
	if (window.location.href.indexOf( "lineup" ) != -1 ) {
//			actualizaPuntos();
	}
	if (window.location.href.indexOf( "playerInfo" ) != -1 ) {
//			actualizaPuntos();
			}
	if (window.location.href.indexOf( "exchangemarket" ) != -1
				/*&& window.location.href.indexOf( "viewoffers" ) == -1*/)
	{
//			actualizaPuntos();
	}
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1)
	{
//			actualizaPuntos();
	}
	//erpichi 201111120 - fotos de los jugadores y estado
	if (window.location.href.indexOf( "placeOffers" ) != -1)
	{
//		actualizaPuntos();
	}
	// puntos  de jugadores - by diegocom - 20111013 - fin

// Cálculo de Saldo - by anthorlop - 20110222 - ini
if ((window.location.href.indexOf( "exchangemarket.phtml" ) != -1
		 	&& window.location.href.indexOf( "?" ) == -1)
		 || window.location.href.indexOf( "placeOffers.phtml" ) != -1) {
	var allTablesMercado = document.getElementsByTagName('table');
	var saldoControl = document.createElement('table');
	saldoControl.setAttribute( "style", "width:100%; height:24px;" );
	saldoControl.setAttribute( "cellpadding", "3" );
	saldoControl.setAttribute( "cellspacing", "3" );
	saldoControl.innerHTML = '<tr><td><table style="width:100%; height:1px;" border="0" cellpadding="0" cellspacing="0" class="tableline02"><tr><td><img src="i/i/pxl_transparent.gif" width="1" height="1" border="0" alt="" /></td></tr></table><table style="width:100%; height:20px;" border="0" cellpadding="4" cellspacing="0"><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px;" align="right"><strong>Actual:</strong> <input size="22px" type="text" name="saldoActual" id="saldoActual" readonly="true" style="background-color:transparent;border:0px;color:#002000;font-size:12px;text-align:right;" /></td></tr></table><table style="width:100%; height:21px;" border="0" cellpadding="4" cellspacing="0"><tr id="abiertoTR" class="tr1" style="display: none;"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Ofertas abiertas:</strong><input size="21px" type="text" name="abierto" id="abierto" readonly="true" style="background-color:transparent;border:0px;color:#002000;font-size:12px;text-align:right;" value="0"/><input type="hidden" id="abiertoNames" /></td></tr><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Ofrecido:</strong><input size="21px" type="text" name="ofrecido" id="ofrecido" readonly="true" style="background-color:transparent;border:0px;color:#002000;font-size:12px;text-align:right;" /></td></tr><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Vendido:</strong><input size="21px" type="text" name="vendido" id="vendido" readonly="true" style="background-color:transparent;border:0px;color:#002000;font-size:12px;text-align:right;" value="0 €"/><input type="hidden" id="vendidoNames" /></td></tr></table><table style="width:100%; height:20px;" border="0" cellpadding="4" cellspacing="0"><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px" align="right"><img src="i/1/i_balancemoney.png" width="18" height="9" alt="Fondos de la cuenta si se aceptan todas las ofertas" /><strong>Total:</strong> <input size="23px" type="text" name="saldoTotal" id="saldoTotal" readonly="true" style="background-color:transparent;border:0px;color:#002000;font-size:12px;text-align:right;" /></td></tr></table></td></tr> ';
		
	allTablesMercado[allTablesMercado.length-1].parentNode.insertBefore( saldoControl, allTablesMercado[allTablesMercado.length-1].nextSibling );
	
	function addPuntosMiles(num){
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(num)) {
			num = num.replace(rgx, '$1' + '.' + '$2');
		}
		return num;
	}
	
	function recalcularSaldo(){
		document.getElementById('saldoTotal').value='';
		document.getElementById('ofrecido').value='';
		document.getElementById('saldoActual').value='';
		var vendido = parseInt(replaceAll(document.getElementById('vendido').value, ".", "").replace(' €', ''),10);
		document.getElementById('vendido').value='';
		var abierto = parseInt(replaceAll(document.getElementById('abierto').value, ".", "").replace(' €', ''),10);
		document.getElementById('abierto').value='';
		var ofrecido = 0;
		var inp = document.getElementsByTagName('input');
		for(var i = 0; i <inp.length; i++) {
			if(inp[i].type == 'text') { 
				if (inp[i].value != '') {
					inp[i].value = inp[i].value.replace( /\./g, "" );
					if (!isNaN(inp[i].value)) {
						ofrecido = parseInt(ofrecido,10) + parseInt(inp[i].value,10);
						inp[i].value = addPuntosMiles(inp[i].value);
					} else {
						inp[i].value = '';
					}
					
				}
			}
		}
		var finanzas = document.getElementById("userbudget");
		var saldo = finanzas.textContent;
		saldo = saldo.substring(saldo.indexOf(':')+1,saldo.indexOf('€'));
		saldo = saldo.replace( /\./g, "" );
		var total =  parseInt(saldo) -  parseInt(ofrecido)-  parseInt(abierto) + parseInt(vendido);
		document.getElementById('saldoTotal').value=addPuntosMiles(total+'') + ' €';
		document.getElementById('ofrecido').value=addPuntosMiles(ofrecido+'') + ' €';
		document.getElementById('vendido').value=addPuntosMiles(vendido+'') + ' €';
		document.getElementById('abierto').value=addPuntosMiles(abierto+'') + ' €';
		document.getElementById('saldoActual').value=addPuntosMiles(saldo+'') + ' €';
		if (total < 0) {
			document.getElementById('saldoTotal').style.color = "red";
		} else {
			document.getElementById('saldoTotal').style.color = "#3F5B34";
		}
	}
	
	function cambiarOnblurInputs(){
		var inp = document.getElementsByTagName('input');
		for(var i = 0; i <inp.length; i++) {
			if(inp[i].type == 'text') { 
				inp[i].addEventListener("blur", recalcularSaldo, false);
				//inp[i].onblur = function (){recalcularSaldo();}
			}
		}
	}
	
	recalcularSaldo();
	cambiarOnblurInputs();

	//erpichi 20120328 - en calculadora jugadores aceptados
		function getJugadoresVendidos(text) {
			var pujaspos = text.indexOf("Ofertas para ti:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divVentas";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Aceptada") {
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("vendido") != null
							&& document.getElementById("vendidoNames") != null
							&& document.getElementById("vendidoNames").value.indexOf("//" + nombreJugadorComprado+ "//") == -1) {
						var vendidoTotal = parseInt(replaceAll(document.getElementById('vendido').value, ".", "").replace(' €', ''),10);
						var vendidoTD = parseInt(replaceAll(tdsPujas[precioVentaCol].innerHTML, ".", ""),10);
						document.getElementById('vendido').value = vendidoTotal + vendidoTD;
						document.getElementById("vendidoNames").value += "//" + nombreJugadorComprado+ "//";
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = "";
				if (window.location.href.indexOf("https://") != -1) {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
				} else {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				}
				get( comunio + "/" + hrefSiguientePuja, getJugadoresVendidos );
			} else {
				
				recalcularSaldo();
				cambiarOnblurInputs();

				if(window.location.href.indexOf( "placeOffers.phtml") != -1) {
					get( window.location.href.replace( "placeOffers.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresAbiertos );
				}
			}
		}
		
		function getJugadoresAbiertos(text) {
			var pujaspos = text.indexOf("Tus pujas:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divAbiertos";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Abierta") {
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("abierto") != null
							&& document.getElementById("abiertoNames") != null
							&& document.getElementById("abiertoNames").value.indexOf("//" + nombreJugadorComprado+ "//") == -1) {
						var abiertoTotal = parseInt(replaceAll(document.getElementById('abierto').value, ".", "").replace(' €', ''),10);
						var abiertoTD = parseInt(replaceAll(tdsPujas[precioVentaCol].innerHTML, ".", ""),10);
						document.getElementById('abierto').value = abiertoTotal + abiertoTD;
						document.getElementById("abiertoNames").value += "//" + nombreJugadorComprado+ "//";
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = "";
				if (window.location.href.indexOf("https://") != -1) {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
				} else {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				}
				get( comunio + "/" + hrefSiguientePuja, getJugadoresAbiertos );
			} else {
				
				recalcularSaldo();
				cambiarOnblurInputs();
				document.getElementById("abiertoTR").style.display = "";
			}
		}

		if (window.location.href.indexOf( "exchangemarket.phtml") != -1) {
			get( window.location.href.replace( "exchangemarket.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresVendidos );
		} else if(window.location.href.indexOf( "placeOffers.phtml") != -1) {
			get( window.location.href.replace( "placeOffers.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresVendidos );
		}
}
// Cálculo de Saldo - by anthorlop - 20110222 - fin


	//Add smiles/improve editor if we are writing a message
	if ( window.location.href.indexOf( "postMessage" ) != -1 ){
		
		var newScript = document.createElement("script");
		newScript.innerHTML = "function setText( txt ){" + 
							   "	var text = document.post.message;" +
							   "	var start = text.selectionStart;" +
							   "	var end = text.selectionEnd;" +
							   "	var s1 = text.value.substr(0, start);" +
							   "	var s2 = text.value.substr(end);" +
							   "	var scrollTop = text.scrollTop;" +
							   "	text.value = s1 + txt + s2;" +
							   "	if (start == end)	{" +
							   "		text.selectionStart = s1.length + txt.length;" +
							   "		text.selectionEnd = text.selectionStart;" +
							   "	}" +
							   "	else{" +
							   "		text.selectionStart = s1.length;" +
							   "		text.selectionEnd = s1.length + txt.length;" +
							   "	}" +
							   "	if ( txt.indexOf('[/') != -1 ){" +
							   "		text.selectionStart -= txt.indexOf('[/')+1;" +
							   "		text.selectionEnd = text.selectionStart;" +
							   "	}" +
							   "	text.focus();" +
							   "	text.scrollTop = scrollTop;" +
							   "}";
		document.body.appendChild( newScript );
		


		var newTable1 = document.createElement("table");
		newTable1.setAttribute( "style", "width:100%; height:24px;" );
		newTable1.setAttribute( "cellpadding", "3" );
		newTable1.setAttribute( "cellspacing", "3" );
		newTable1.innerHTML = 	'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':D\');"><img src="' + images[':D'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':)\');"><img src="' + images[':)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':(\');"><img src="' + images[':('] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':o\');"><img src="' + images[':o'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':-?\');"><img src="' + images[':-?'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'8)\');"><img src="' + images['8)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':lol:\');"><img src="' + images[':lol:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':x\');"><img src="' + images[':x'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':P\');"><img src="' + images[':P'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':oops:\');"><img src="' + images[':oops:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':cry:\');"><img src="' + images[':cry:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':evil:\');"><img src="' + images[':evil:'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':roll:\');"><img src="' + images[':roll:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':wink:\');"><img src="' + images[':wink:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':zzz:\');"><img src="' + images[':zzz:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':))\');"><img src="' + images[':))'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':love:\');"><img src="' + images[':love:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'*:(\');"><img src="' + images['*:('] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':xx\');"><img src="' + images[':xx'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':8))\');"><img src="' + images[':8))'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':puke:\');"><img src="' + images[':puke:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'>:)\');"><img src="' + images['>:)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':clap:\');"><img src="' + images[':clap:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':schimpf:\');"><img src="' + images[':schimpf:'] + '" border="0" /></a></td></tr>';
							
		var newTable2 = document.createElement("table");
		newTable2.setAttribute( "style", "width:100%; height:24px;" );
		newTable2.setAttribute( "cellpadding", "3" );
		newTable2.setAttribute( "cellspacing", "3" );
		newTable2.innerHTML =	'<tr"><td><a href="JavaScript:;" onclick="JavaScript:setText(\':bier:\');"><img src="' + images[':bier:'] + '" border="0" /></a></td></tr>';
									
		var newTable3 = document.createElement("table");
		newTable3.setAttribute( "style", "width:100%; height:24px;" );
		newTable3.setAttribute( "cellpadding", "3" );
		newTable3.setAttribute( "cellspacing", "3" );
		newTable3.innerHTML =	'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\'[img][/img]\');"><img src="' + images['imgIcon'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'http://\');"><img src="' + images['httpIcon'] + '" border="0" /></a></td></tr>';
							

		var allTables = document.getElementsByTagName("table");
		allTables[20].parentNode.insertBefore(newTable1, allTables[20].nextSibling);
		newTable1.parentNode.insertBefore(newTable2, newTable1.nextSibling);
		newTable2.parentNode.insertBefore(newTable3, newTable2.nextSibling);

	}

	//If we are at news page (but not writing a post)...
	if ( window.location.href.indexOf( "news" ) != -1 && window.location.href.indexOf( "edit" ) == -1 ){

		
		//erpichi 20111129  - Mostrar fotos en alineacion ideal
		function showPlayerFotoAlineacionIdeal() {
			//erpichi 20111106
			var padre = document.getElementById("postwrap");
			var divs = padre.getElementsByTagName("div");
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == "article_content_text"
						&& divs[i].textContent.indexOf("¡Puntuación total:") != -1) {
					//erpichi 20111130 - Estilo del fondo del 11 ideal igual que la noticia
					var estiloFondo = divs[i].parentNode.className.replace("article_content", "");
					var centerTable = divs[i].getElementsByTagName("center");
					if (centerTable.length == 1 && centerTable[0].innerHTML.indexOf("<br>") != -1) {
						var tableSplit = centerTable[0].innerHTML.split("<br>");
						var tableString = "<table><tbody>";
						for (var j = 0; j < tableSplit.length; j++) {
							if (tableSplit[j].length > 0) {
								//erpichi 20111130 - Estilo del fondo del 11 ideal igual que la noticia
								tableString += '<tr class="tr' + estiloFondo + '">';
								tableString += '<td width="" height="" align="center" style="vertical-align: top;"><table><tbody>';
								var trSplit = tableSplit[j].split(" - ");
								tableString += '<tr>';
								for (var k = 0; k < trSplit.length; k++) {
									tableString += '<td style="border:1px solid black;text-align:center;vertical-align:bottom;">';
									var playerFotoId = trSplit[k].substring(trSplit[k].indexOf("href=\"") + "href=\"".length);
									playerFotoId = playerFotoId.substring(0, playerFotoId.indexOf("\"")).replace( "../primera_division/", "" ).replace( ".html", "" );
									playerFotoId = playerFotoId.split("-")[0];
//									varFotoHTML = '<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/s/' + playerFotoId + '.gif?pln=1">';
									varFotoHTML = replaceAll(readFotoPlayer(playerIDName[playerFotoId]), "height='" + playerFotoSize + "'", "height='" + playerFotoSizeMax + "'");
									tableString += varFotoHTML;
									tableString += '</td>';
								}
								tableString += '</tr>';
								tableString += '<tr>';
								for (var k = 0; k < trSplit.length; k++) {
									tableString += '<td class="small" style="border:1px solid black;text-align:center;vertical-align:bottom;font-weight:normal;font-size:10px;">';
									tableString += trSplit[k];
									tableString += '</td>';
								}
								tableString += '</tr>';
								tableString += '</tbody></table></td>';
								tableString += '</tr>';
							}
						}
						tableString += "</tbody></table>";
						centerTable[0].innerHTML = tableString;
					}
				}
			}
		}
		showPlayerFotoAlineacionIdeal();
		
		//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
		function changePlayerLinksToSCRIPT() {
			//Change player links to SCRIPT
			var a = document.getElementsByTagName("a");
			for( var i=0; i<a.length; i++ ){
				
				if( a[i].href.indexOf("/primera_division") != -1 ){
				
					var player = a[i].getAttribute("href").replace( "../primera_division/", "" ).replace( ".html", "" );
					player = player.split("-");
					
					var playerName = trim( a[i].textContent );
					var playerId = player[0];
					var varFotoHTML = replaceAll(readFotoPlayer(playerIDName[playerId]), "height='" + playerFotoSize + "'", "height='" + playerFotoSizeMax + "'");
					if (a[i].innerHTML.indexOf("<img") != -1) {
						a[i].innerHTML = varFotoHTML;
					} else {
						a[i].textContent = playerName;
					}
					 
					a[i].setAttribute( "href", 'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId);
					a[i].setAttribute( "onclick", 'return(openSmallWindow(\'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId + '\'))' );
				} else if( a[i].href.indexOf("tradableInfo.phtml") != -1 ){
				
					var playerId = a[i].getAttribute("href").replace( "tradableInfo.phtml?tid=", "" );
					var playerName = trim( a[i].textContent );
					var varFotoHTML = replaceAll(readFotoPlayer(playerIDName[playerId]), "height='" + playerFotoSize + "'", "height='" + playerFotoSizeMax + "'");
					if (a[i].innerHTML.indexOf("<img") != -1) {
						a[i].innerHTML = varFotoHTML;
					} else {
						a[i].textContent = playerName;
					}
					 
						a[i].setAttribute( "href", 'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId);
						a[i].setAttribute( "onclick", 'return(openSmallWindow(\'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId + '\'))' );
					
				}
			}
		}
		changePlayerLinksToSCRIPT();
		
		//erpichi 20111120 - filtro noticias
		var separadorFiltroNews = "|";
		var separadorFiltroNewsBody = "#";
		function filtrarNoticias(text, objValue, posNews) {
			var divNews = document.getElementById("postwrap");
			if (posNews == -1) {
				document.getElementById("center").style.height="";
				document.getElementById("news_filter").disabled = true;
				posNews = 0;
				divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>';
				get(window.location.href + "?newsAction=reload&first_news=" + posNews, function(text2) {filtrarNoticias(text2, objValue, posNews);});
			} else {
				var newPosNews = text.substring(0, text.indexOf(";"));
				newPosNews = parseInt(newPosNews);
				text = text.substring(text.indexOf(";") + 1);
				if (newPosNews > 0) {
					//erpichi 20111122 - reiniciar noticias sin filtro
					var llamarSiguiente = true;
					if (objValue == "-1") {
						objValue = "";
						llamarSiguiente = false;
					}
					var divContenedor = document.createElement("div");
					divContenedor.innerHTML = text;
					var divsHijos = divContenedor.childNodes;
					//alert(divsHijos.length);
					for(var i = 0; i < divsHijos.length; i++) {
						//alert();
						if (typeof divsHijos[i].className != 'undefined'
							&& divsHijos[i].className.indexOf("article_header") != -1) {
							var correcto = true;
							var objValueSplit = objValue.split(separadorFiltroNewsBody);
							if (objValueSplit.length > 0) {
								var objValueTitulo = objValueSplit[0];
								var objValueTituloSplit = objValueTitulo.split(separadorFiltroNews);
								for (var j = 0; j < objValueTituloSplit.length; j++) {
									var valueToCompare = objValueTituloSplit[j];
									var negacion = false;
									if (valueToCompare.length > 1 && startsWith(valueToCompare, "!")) {
										negacion = true;
										valueToCompare = valueToCompare.substring(1);
									}
									if (!negacion && divsHijos[i].textContent.indexOf(valueToCompare) == -1) {
										correcto = false;
										break;
									} else if (negacion && divsHijos[i].textContent.indexOf(valueToCompare) != -1) {
										correcto = false;
										break;
									}
								}
							}
							if (correcto && objValueSplit.length > 1) {
								for (var k = i + 2; k < divsHijos.length; k++) {
									if (typeof divsHijos[k].className != 'undefined'
											&& divsHijos[k].className.indexOf("article_content") != -1) {
										var objValueBody = objValueSplit[1];
										var objValueBodySplit = objValueBody.split(separadorFiltroNews);
										for (var j = 0; j < objValueBodySplit.length; j++) {
											var valueToCompare = objValueBodySplit[j];
											var negacion = false;
											if (valueToCompare.length > 1 && startsWith(valueToCompare, "!")) {
												negacion = true;
												valueToCompare = valueToCompare.substring(1);
											}
											//alert(divsHijos[k].textContent + "---" + valueToCompare);
											if (!negacion && divsHijos[k].textContent.indexOf(valueToCompare) == -1) {
												correcto = false;
												break;
											} else if (negacion && divsHijos[k].textContent.indexOf(valueToCompare) != -1) {
												correcto = false;
												break;
											}
										}
									} else if (typeof divsHijos[k].className != 'undefined'
											&& divsHijos[k].className.indexOf("article_header") != -1) {
										break;
									}
								}
							}
							
							if (correcto) {
								if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
									divNews.innerHTML = '';
								}
								divNews.appendChild(divsHijos[i]);
								divNews.appendChild(divsHijos[i + 1]);
								divNews.appendChild(divsHijos[i + 2]);
							}
						}
					}
					//erpichi 20111122 - reiniciar noticias sin filtro
					if (llamarSiguiente) {
						posNews += newPosNews;
						get(window.location.href + "?newsAction=reload&first_news=" + posNews, function(text2) {filtrarNoticias(text2, objValue, posNews);});
					} else {
						if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
							divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">No hay noticias.</div></div>';
						}
						//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
						document.getElementById("news_filter").disabled = false;
						showPlayerFotoAlineacionIdeal();
						changePlayerLinksToSCRIPT();
						showVerAlineacionInNews();
					}
				} else {
					if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
						divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">No hay noticias.</div></div>';
					}
					//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
					document.getElementById("news_filter").disabled = false;
					showPlayerFotoAlineacionIdeal();
					changePlayerLinksToSCRIPT();
					showVerAlineacionInNews();
				}
			}
		}
		
		//erpichi 20111122 - reiniciar noticias sin filtro
		function changeFiltroNoticias(objValue) {
			if (objValue != "-1") {
				$(window).unbind("scroll");
			} else {
				var tn_count=0,tn_pos,tn_last=false,tn_load=false;$(window).scroll(function(){var b="display",a="#loadbar";if(tn_last)return false;var d=60,c=$(document).scrollTop();if($(document).scrollTop()+d+$(window).height()-$(document).height()>0&&c>tn_pos&&!tn_load){tn_load=true;$(a).css(b,"inline");tn_count++;$.ajax({type:"POST",url:"team_news.phtml",data:"newsAction=reload&first_news="+10*tn_count,success:function(c){tn_num=parseInt(c.substring(0,c.indexOf(";")));if(!isNaN(tn_num)&&tn_num<10)tn_last=true;$("#postwrap").append(c.substr(c.indexOf(";")+1));$(a).css(b,"none");tn_load=false},error:function(){$(a).css(b,"none");tn_load=false}})}tn_pos=c});
			}
		}

		//var spans = document.getElementsByClassName("button02");
//		var spans = document.getElementsByClassName("send_mail_btn");
		var spans = document.getElementsByClassName("titlecontent");
		for (var i = 0; i < spans.length; i++) {
//			if (spans[i].childNodes.length > 0 
//					&& spans[i].childNodes[0] != null
//					&& (spans[i].childNodes[0].textContent == "Enviar E-mail"
//						|| spans[i].childNodes[0].textContent == "Send Mail"
//						|| spans[i].childNodes[0].textContent == "Enviar correo electrónico")) {
			if (spans[i] != null && (spans[i].innerHTML.indexOf('Enviar E-mail') != -1
					|| spans[i].innerHTML.indexOf('Send Mail') != -1
					|| spans[i].innerHTML.indexOf('Enviar correo electrónico') != -1)) {
				var filtroSpan = document.createElement("h2");
				filtroSpan.innerHTML = '<select style="float: right;" size="1" id="news_filter" onchange=\'if (this.value != "-1") {$(window).unbind("scroll");} else {var tn_count=0,tn_pos,tn_last=false,tn_load=false;$(window).scroll(function(){var b="display",a="#loadbar";if(tn_last)return false;var d=60,c=$(document).scrollTop();if($(document).scrollTop()+d+$(window).height()-$(document).height()>0&&c>tn_pos&&!tn_load){tn_load=true;$(a).css(b,"inline");tn_count++;$.ajax({type:"POST",url:"team_news.phtml",data:"newsAction=reload&first_news="+10*tn_count,success:function(c){tn_num=parseInt(c.substring(0,c.indexOf(";")));if(!isNaN(tn_num)&&tn_num<10)tn_last=true;$("#postwrap").append(c.substr(c.indexOf(";")+1));$(a).css(b,"none");tn_load=false},error:function(){$(a).css(b,"none");tn_load=false}})}tn_pos=c});}\'>'
//					+ '<option selected="selected" value="0">Filtro de noticias:</option>'
//					+ '<option value="0">todas las noticias</option>'
//					+ '<option value="2">Noticias internas</option>'
//					+ '<option value="3">Noticias privadas</option>'
//					+ '<option value="4">Fichajes</option>'
//					+ '<option value="5">penas disciplinarias/abonos</option>'
//					+ '<option value="6">System Information</option>'
//					+ '<option value="7">Administración del miembro</option>'
//					+ '<option value="8">Administración de la comunidad</option>'
//					+ '<option value="9">La mejor alineación</option>'
//					+ '<option value="10">Cambiar alineación</option>'
//					+ '<option value="11">Noticias escondidas</option>'
					+ '<option selected="selected" value="-1">Filtro de Script BETA:</option>'
					+ '<option value="">Todas las noticias</option>'
					+ '<option value="Computer \>">Noticias de Comunio</option>'
					+ '<option value="!Computer \>">Noticias de Usuarios</option>'
					//erpichi 20111122 - filtro puntos 
					+ '<option value="Computer \>|La computación de los puntos ha terminado">Cálculo de puntos</option>'
					+ '<option value="Computer \>|El cálculo de los puntos del juego de apuestas ha finalizado">Cálculo de puntos apuestas</option>'
					+ '<option value="Computer \>|Fichajes">Fichajes</option>'
					+ '<option value="Computer \>#Abono:">Abonos</option>'
					+ '<option value="Computer \>#Pena disciplinaria:">Penas disciplinarias</option>'
					+ '<option value="Computer \>|Once ideal de Comunio.es">Once ideal Comunio</option>'
					+ '<option value="Computer \>|La alineación se ha cambiado, la nueva alineación es">Cambiar alineación</option>'
					+ '<option value="!Computer \>|SCRIPT - Alineación">Publicar alineación SCRIPT</option>'
					+ '<option value="!Computer \>#Alineación:">Publicar alineación</option>'
					+ '<option value="!Computer \>|SCRIPT - Puntuación">Publicar puntuación SCRIPT</option>'
					+ '</select>'
				filtroSpan.childNodes[0].addEventListener("change", function() {filtrarNoticias(null, this.value, -1);}, false);

//				spans[i].parentNode.appendChild(filtroSpan);
				spans[i].appendChild(filtroSpan);
			}
		}

		//erpichi 20111106
		var listaJugadores = getPointsPlayerList();
		var listaJugadoresLesionados = getNoPlayerList();
		//erpichi 20111107
		var divMessage = document.getElementById("directMessage");
		var divCalculaAlineacion = document.createElement('div');
		divCalculaAlineacion.style.paddingBottom = "1em";
		divCalculaAlineacion.innerHTML = "<span class=\"contenttext\">Comprueba tu alineación</span>"
			+ "<textarea style=\"height: 4em;\" onchange=\"this.value=this.value.replace(/^\\s\\s*/, '').replace(/\\s\\s*$/, '');\" onblur=\"if(this.value == '') this.value = 'Introduce tu alineación';\" onfocus=\"if(this.value == 'Introduce tu alineación') this.value = '';\" class=\"textarea_news\" id=\"alineacionLine\">Introduce tu alineación</textarea>"
			+ "<div id='alineacionLinePuntos'></div><div id='alineacionLineEstado'></div>"
			+ "<div class=\"titleboxcontent\"><div class=\"edgetitle\"><b class=\"top\"><b class=\"e1\"></b><b class=\"e2\"></b><b class=\"e3\"></b><b class=\"e4\"></b><b class=\"e5\"></b><b class=\"e6\"></b><b class=\"e7\"></b><b class=\"e8\"></b><b class=\"e9\"></b><b class=\"e10\"></b><b class=\"e11\"></b></b></div><div class=\"titlecontent\">"
			+ "<h2><span class=\"button02\"><a id=\"alineacionPuntosGeneral\" title=\"Ver puntos alineación\" href=\"JavaScript:;\">Ver puntos alineación</a></span><span class=\"button02\"><a id=\"alineacionEstadoGeneral\" title=\"Ver estado alineación\" href=\"JavaScript:;\">Ver estado alineación</a></span><span class=\"button02\"><a title=\"Ver 11 ideal en CpC\" href=\"JavaScript:;\" onclick=\"window.open('http://www.calculapuntoscomunio.com/once_ideal/')\">Ver 11 ideal</a></span><span class=\"button02\"><a title=\"Visitar calculapuntoscomunio\" href=\"JavaScript:;\" onclick=\"window.open('http://www.calculapuntoscomunio.com/')\">Visitar CpC</a></span></h2></div></div>";

		divMessage.parentNode.insertBefore(divCalculaAlineacion, divMessage);
		
		var linkPuntosGeneral = document.getElementById('alineacionPuntosGeneral');
		linkPuntosGeneral.addEventListener( "click", function(){ calculaPuntosAlineacionGeneral();}, true );
		
		var linkEstadoGeneral = document.getElementById('alineacionEstadoGeneral');
		linkEstadoGeneral.addEventListener( "click", function(){ calculaEstadoAlineacionGeneral();}, true );
		
		//erpichi 20111129 - Al filtrar que ponga los datos SCRIPT y puntos
		function showVerAlineacionInNews() {
			//erpichi 20111106
			var padre = document.getElementById("postwrap");
			var divs = padre.getElementsByTagName("div");
			var indice = 0;
			for (var i = 0; i < divs.length; i++) {
//				if (divs[i].className == "newsheader"
//						&& divs[i].textContent.indexOf("SCRIPT - Alineación - ") != -1) {
////					var alineacion = divs[i].parentNode.nextSibling.nextSibling.childNodes[0].textContent;
////					alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
////					var alineacionSplit = alineacion.split(";");
////					divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML += calculaPuntosAlineacion(alineacionSplit, listaJugadores, indice);
	//
//					divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML = '<span>' + divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML + '</span><br/><span style="float:right"><a id="linkPuntos' + indice + '" href="JavaScript:;">Ver Puntos</a></span> ';
//					var linkClick = document.getElementById('linkPuntos' + indice);
//					linkClick.addEventListener( "click", function(){ calculaPuntosAlineacionClick(this);}, true );
//					indice++;
//				}

				//erpichi 20111129 - Solo aparece Ver puntos en las alineaciones bien puestas
				if (divs[i].className == "article_content_text"
					//&& divs[i].textContent.indexOf("Alineación:") != -1) {
						&& startsWith(trim(divs[i].textContent), "Alineación:")) {
//					var alineacion = divs[i].textContent;
//					alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
//					var alineacionSplit = alineacion.split(";");
//					divs[i].innerHTML += calculaPuntosAlineacion(alineacionSplit, listaJugadores, indice);

					divs[i].innerHTML = '<span class="verPuntos">' + divs[i].innerHTML + '</span><br/><span style="float:right"><a id="linkPuntos' + indice + '" href="JavaScript:;">Ver Puntos</a></span> ';
					var linkClick = document.getElementById('linkPuntos' + indice);
					linkClick.addEventListener( "click", function(){ calculaPuntosAlineacionClick(this);}, true );
					indice++;
				}
			}
		}
		showVerAlineacionInNews();
		
		var objects =[];
		//Obtain all the posts from news page
		var posts = document.getElementsByClassName("tableline02b");
		for( var i=0; i<posts.length; i++ ){
			objects.push(posts[i]);
		}
		var infoBox = document.getElementsByClassName("infoBox");
		for( var i=0; i<infoBox.length; i++ ){
			var infoRows = infoBox[i].getElementsByTagName("tr");
			for( var j=0; j< infoRows.length; j++ ){
				objects.push(infoRows[j].getElementsByTagName("td")[0]);
			}
		}

		for( var i=0; i<objects.length; i++ ){
			
			//Replace Smiles with their images
			objects[i].innerHTML = objects[i].innerHTML.replace(/:D/g,"<img src=\"" + images[':D'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\)\)/g,"<img src=\"" + images[':))'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/\*:\(/g,"<img src=\"" + images['\*:\('] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:oops:/g,"<img src=\"" + images[':oops:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:-\?/g,"<img src=\"" + images[':-?'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:8\)\)/g,"<img src=\"" + images[':8))'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:lol:/g,"<img src=\"" + images[':lol:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:xx/g,"<img src=\"" + images[':xx'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:P/g,"<img src=\"" + images[':P'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:o/g,"<img src=\"" + images[':o'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:cry:/g,"<img src=\"" + images[':cry:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:evil:/g,"<img src=\"" + images[':evil:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:roll:/g,"<img src=\"" + images[':roll:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:wink:/g,"<img src=\"" + images[':wink:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:zzz:/g,"<img src=\"" + images[':zzz:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/>:\)/g,"<img src=\"" + images['>:)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:love:/g,"<img src=\"" + images[':love:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:bier:/g,"<img src=\"" + images[':bier:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:x/g,"<img src=\"" + images[':x'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/8\)/g,"<img src=\"" + images['8)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:puke:/g,"<img src=\"" + images[':puke:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\)/g,"<img src=\"" + images[':)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:clap:/g,"<img src=\"" + images[':clap:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:schimpf:/g,"<img src=\"" + images[':schimpf:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\(/g,"<img src=\"" + images[':('] + "\" />");

			//Web links (http://, https://, file://, ftp://)
			var exp = /[^\]"](\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			objects[i].innerHTML = objects[i].innerHTML.replace(exp,"<a href='$1'>$1</a>"); 
			
			//Image links ( [img][/img], [img=align][/img]
			objects[i].innerHTML = objects[i].innerHTML.replace(/\[img\](.*?)\[\/img\]/gi,"<img src=\"$1\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/\[img=(.*?)\](.*?)\[\/img\]/gi,"<img src=\"$2\" align=\"$1\" />");

		}
		
		function getPujasJugadores(text, numPujas) {
			if (!numPujas) {
				numPujas = 0;
			}
			var pujaspos = text.indexOf("Ofertas para ti:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			if (text.indexOf("Tus pujas:", table2pos) != -1) {
				var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
				//alert(tablaPujasHTML);
				var divPujas = document.createElement("div");
				divPujas.id="divVentas";
				divPujas.style.display="none";
				divPujas.innerHTML = tablaPujasHTML;
				var trsPujas = divPujas.getElementsByTagName("tr");
				for (var i = 0; i < trsPujas.length; i++) {
					var tdsPujas = trsPujas[i].getElementsByTagName("td");
					if (tdsPujas[tdsPujas.length - 1].innerHTML == "Abierta") {
						
						playerNameColNoScript = 0;
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						var nombreJugadorPujado = trim(tdsPujas[playerNameColNoScript].textContent);
						var precioJugadorPujado = trim(tdsPujas[playerNameColNoScript + 3].textContent);
						var userJugadorPujado = trim(tdsPujas[playerNameColNoScript + 1].textContent);

						var noticePujasDiv = document.getElementById("noticePujas");
						var fotoJugadorPujado = readFotoPlayer(nombreJugadorPujado);
						noticePujasDiv.innerHTML = replaceAll(noticePujasDiv.innerHTML, "<div>Cargando...</div>", "<div style='display: inline-block; width: 100%;'><div style='float: left; padding-right: 5px;'>" + fotoJugadorPujado + "</div><div style='float: left; text-align: left; width: 75%;'><div style='font-weight: bold;'>" + nombreJugadorPujado + "</div><div style='font-size: 9px; float: left;'>" + precioJugadorPujado + "</div><div style='font-size: 9px; float: left;'> (" + userJugadorPujado + ")</div></div></div>") + "<div class='spacer10px'></div><div>Cargando...</div>";
						numPujas++;
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = "";
				if (window.location.href.indexOf("https://") != -1) {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
				} else {
					comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				}
				get( comunio + "/" + hrefSiguientePuja, function(text2) {getPujasJugadores(text2, numPujas);}  );
			} else {
				var noticePujasDiv = document.getElementById("noticePujas");
				if (numPujas == 0) {
					noticePujasDiv.innerHTML = "<div>No tienes pujas</div>";
				} else {
					var comunio = "";
					if (window.location.href.indexOf("https://") != -1) {
						comunio = window.location.href.substring(0, window.location.href.indexOf("/","https://".length));
					} else {
						comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
					}
					noticePujasDiv.innerHTML = replaceAll(noticePujasDiv.innerHTML, "<div>Cargando...</div>", "<div style='text-align: right;'><a href='" + comunio + "/exchangemarket.phtml?viewoffers_x=22" + "' style='text-decoration: none; font-weight: bold;'>Ver pujas &gt;&gt;</a></div>");
				}
			}
		}
		
		var noticeDiv = document.getElementById("notice_cont");
		if (noticeDiv != null) {

			var newDiv = document.createElement("div");
			newDiv.innerHTML ='<div class="spacer10px"></div>'
				+ '<div class="titleboxcontent"><div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div><div class="titlecontent"><h2>Pujas</h2></div></div>'
				+ '<div class="barcenter" style="min-height: 0;"><div id="noticePujas"><div>Cargando...</div></div></div>';
		
//			noticeDiv.insertBefore(newDiv);
			noticeDiv.appendChild(newDiv);
			
			get( window.location.href.replace( "team_news.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getPujasJugadores );
		}
	}

	//Get information from the forum (points, convocated players, ...)
	if ( window.location.href.indexOf( "lineup" ) != -1 ){

		//At points table, this function quits the player from the total sum
		function quitPlayerPoints( points ){
		
			var totalPointsCell = document.getElementById("totalPointsCell");	//Obtain the cell with the sum
			var total = totalPointsCell.textContent.split(":")[1];				//Only the number (TOTAL:22)
			var totalInt = parseInt( total, 10 );								//Parse it
			totalInt -= points;													//Quit
			totalPointsCell.textContent = totalPointsCell.textContent.replace(/\bTOTAL:-?[0-9]+/,'TOTAL:' + totalInt);	//Change the total sum
		}
		
		//At points table, it adds a player to the total sum
		function addPlayerPoints( playerRow ){
		
			var totalPointsTable = document.getElementById("totalPointsTable");		//Table where the sum it is
			var totalPointsCell = document.getElementById("totalPointsCell");		//Cell of the total sum
			
			var temp = playerRow.textContent.split(" ");							//Obtain the points of the player spliting it ( Villa 16 )
			var tempInt = parseInt( temp[temp.length-1], 10 );						//Parse points
			
			if( isNaN( tempInt ) ){													//If there is a problem or the player has no points... 0
				tempInt = 0;
			}
			
			var total = totalPointsCell.textContent.split(":")[1];					//Only the number (TOTAL:22)
			var totalInt = parseInt( total, 10 );									//Parse it
			totalInt += tempInt;													//Add points
			totalPointsCell.textContent = totalPointsCell.textContent.replace(/\bTOTAL:-?[0-9]+/,'TOTAL:' + totalInt);		//Change the total sum
			
			//Add the player name to the total sum column
			var newRow = totalPointsTable.insertRow(0);
			newRow.innerHTML = '<td><a href="javascript:;">' + playerRow.textContent + '</a></td>';
			//Put an event listener on it for quit from the sum if we want
			newRow.getElementsByTagName("a")[0].addEventListener( "click", function(){ this.parentNode.parentNode.removeChild(this.parentNode); quitPlayerPoints(tempInt) }, false);
		}
		

		var allTables = document.getElementsByTagName('table');
		var bigTable = document.createElement('table');
		bigTable.style.fontSize = "12px";

		bigTable.style.width = "100%";
		bigTable.style.backgroundColor = "#B8D6B4";
		bigTable.style.setProperty("color", "#01233B", "important");
		var mensajeAlineacion = imprimirAlineacion();
		bigTable.innerHTML = '<tr><td><table><tr><td>' + mensajeAlineacion + '</td></tr></table></td></tr>' +
							 '<tr><td><div style="text-align:center;padding:6px 0px 0px 0px;font-size: 0.8em;" class="boxcontentdown"><form style="display:inline" name="post" action="team_news.phtml" method="post"><input type="hidden" value="messageSubmitted" name="newsAction"><input type="hidden" id="titleMensajeAlineacion" value="SCRIPT - Alineación" name="headline"/><input type="hidden" name="message" id="message" value=""/><input type="hidden" value="-1" name="send"/><a onclick="document.getElementById(\'titleMensajeAlineacion\').value = \'SCRIPT - Alineación - \' + document.getElementById(\'jornadaHidden\').value" title="Publicar alineación" class="button02" href="javascript:submitForm(\'post\',\'send\');">Publicar alineación</a></form></div></td></tr>' +
							 '<tr><td><div style="text-align:center;padding:6px 0px 0px 0px;font-size: 0.93em;" class="boxcontentdown"><a title="Jugar con esta alineación" class="button02" href="javascript:submitForm(\'set_lineup\',\'playwiththislineup\');">Jugar con esta alineación</a></div></td></tr>' + 
							 '<tr><td><table cellspacing="0" cellpadding="0"><tr><td align="left"><a style="color: #01233B !important;" id="link1" href="JavaScript:;">*Puntos</a></td></tr><tr style="display:none" id="bigRow1"><td><table id="teamsTable"></table></td><td align="left"><table id="totalPointsTable"><tr><td id="totalPointsCell">TOTAL:0</td></tr></table></td></tr></table></td></tr>' +
							 '<tr><td><table cellspacing="0" cellpadding="0"><tr><td align="left"><a style="color: #01233B !important;" id="link5" href="JavaScript:;">*Alineacion ideal última jornada</a></td></tr><tr style="display:none" id="bigRow5"><td><table id="teamsTableIdeal"></table></td><td align="left"><table id="totalPointsTableIdeal"><tr><td id="totalPointsCellIdeal">TOTAL:0</td></tr></table></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a style="color: #01233B !important;" id="link6" href="JavaScript:;">*Puntos Foro Comunio</a></td></tr><tr style="display:none" id="bigRow6"><td id="puntosComunioCol"></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a style="color: #01233B !important;" id="link2" href="JavaScript:;">*Lesionados/Sancionados</a></td></tr><tr style="display:none" id="bigRow2"><td id="injuriedCol"></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a style="color: #01233B !important;" id="link3" href="JavaScript:;">*Convocados</a></td></tr><tr style="display:none" id="bigRow3"><td id="convCol"></td></tr></table></td></tr>' +
							 //erpichi 20111129 - Dar las gracias
							 '<tr><td><table><tr>Dad las gracias a los foreros que comparten esta información (J,A,E,, DARI y Gsus77)</tr></table></td></tr>' +
							 '<tr><td><style type="text/css"><!-- #bigRow4 .tablecontent03{font-size:1em;}--></style><table><tr><td align="left"><a style="color: #01233B !important;" id="link4" href="JavaScript:;">*Próximas Jornadas</a></td></tr><tr style="display:none" id="bigRow4"><td id="jornadaCol"></td></tr></table></td></tr>';
		
		allTables[ allTables.length-5].parentNode.insertBefore( bigTable, allTables[ allTables.length-5 ].nextSibling );
		document.getElementById("message").value = mensajeAlineacion;
		document.getElementById("lineup_bg").style.overflow="auto";
		var bigRow1 = document.getElementById("bigRow1");
		var bigRow5 = document.getElementById("bigRow5");
		var bigRow2 = document.getElementById("bigRow2");
		var bigRow6 = document.getElementById("bigRow6");
		var bigRow3 = document.getElementById("bigRow3");
		var bigRow4 = document.getElementById("bigRow4");

		var link1 = document.getElementById("link1");
		var link5 = document.getElementById("link5");
		var link6 = document.getElementById("link6");
		var link2 = document.getElementById("link2");
		var link3 = document.getElementById("link3");
		var link4 = document.getElementById("link4");
		
		//link1.addEventListener( "click", function(){ toggleDisplay(bigRow1, 'block');if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=33", getURLPoints ); }, true );
		link1.addEventListener( "click", function(){ toggleDisplay(bigRow1, 'block');if(this.textContent[0]!='*')return;calculaPuntos();}, true );
		link5.addEventListener( "click", function(){ toggleDisplay(bigRow5, 'block');if(this.textContent[0]!='*')return;calculaPuntosIdeal();}, true );
		link6.addEventListener( "click", function(){ toggleDisplay(bigRow6, 'block');if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=33', getURLPuntosComunio ); }, true );
		link2.addEventListener( "click", function(){ toggleDisplay(bigRow2, 'block');if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLNoPlayers ); }, true );
		link3.addEventListener( "click", function(){ toggleDisplay(bigRow3, 'block');if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLConv ); }, true );
		link4.addEventListener( "click", function(){ toggleDisplay(bigRow4, 'block');if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'calendarTip.phtml', getURLJornada );}, true );
		
	}  

	//erpichi 20111123 - Diferencia en puntos con los demas jugadores
if( window.location.href.indexOf( "standings.phtml" ) != -1) {
	var tablePuntos = document.getElementById("tablestandings");
	var trsPuntos = tablePuntos.getElementsByTagName("tr");
	var misPuntos = 0;
	var misValor = 0;

	var rowName = 0;
	
	if (trsPuntos.length >= 2) {
		var tdsPuntosC = trsPuntos[1].getElementsByTagName("td");
		for (var i = 0; i < tdsPuntosC.length; i++) {
			if (tdsPuntosC[i].innerHTML.indexOf('playerInfo.phtml?pid=') != -1) {
				rowName += i;
				break;
			}
		}
	}

	var difPuntosTdTitle = document.createElement("td");
	difPuntosTdTitle.align = "right";
	difPuntosTdTitle.innerHTML = "Diferencia";
	if (trsPuntos[0].getElementsByTagName("td").length > (rowName+2)) {
		trsPuntos[0].insertBefore(difPuntosTdTitle, trsPuntos[0].getElementsByTagName("td")[(rowName+2)]);
		var difValorTdTitle = document.createElement("td");
		difValorTdTitle.align = "right";
		difValorTdTitle.innerHTML = "Diferencia";
		trsPuntos[0].appendChild(difValorTdTitle);
	} else {
		trsPuntos[0].appendChild(difPuntosTdTitle);
	}
	for (var i = 1; i < trsPuntos.length; i++) {
		var tdsPuntos = trsPuntos[i].getElementsByTagName("td");
		if (tdsPuntos[rowName].innerHTML.indexOf('playerInfo.phtml?pid=' + userId + '"') != -1) {
			var puntosHTML = tdsPuntos[(rowName+1)].textContent;
			if (puntosHTML == "-") {
				puntosHTML = "0";
			}
			misPuntos = parseInt(puntosHTML);
			if (tdsPuntos.length > (rowName+2)) {
				misValor = parseInt(replaceAll(tdsPuntos[(rowName+2)].textContent, ".", ""));
			}
			break;
		}
	}
	for (var i = 1; i < trsPuntos.length; i++) {
		var tdsPuntos = trsPuntos[i].getElementsByTagName("td");
		var difPuntosTd = document.createElement("td");
		difPuntosTd.align = "right";
		var difValorTd = document.createElement("td");
		difValorTd.align = "right";
		if (tdsPuntos[rowName].innerHTML.indexOf('playerInfo.phtml?pid=' + userId + '"') != -1) {
			difPuntosTd.innerHTML = "-";
			difValorTd.innerHTML = "-";
		} else {
			var puntosHTML = tdsPuntos[(rowName+1)].textContent;
			if (puntosHTML == "-") {
				puntosHTML = "0";
			}
			var diferenciaPuntos = parseInt(puntosHTML) - misPuntos;
			if (diferenciaPuntos > 0) {
				difPuntosTd.style.color = "RED";
			} else if (diferenciaPuntos < 0) {
				difPuntosTd.style.color = "#3F5B34";
			}
			diferenciaPuntos = formateaNumero(diferenciaPuntos, ".", true);
			difPuntosTd.innerHTML = diferenciaPuntos;

			if (tdsPuntos.length > (rowName+2)) {
				var diferenciaValor = parseInt(replaceAll(tdsPuntos[(rowName+2)].textContent, ".", "")) - misValor;
				if (diferenciaValor > 0) {
					difValorTd.style.color = "RED";
				} else if (diferenciaValor < 0) {
					difValorTd.style.color = "#3F5B34";
				}
				diferenciaValor = formateaNumero(diferenciaValor, ".", true);
				difValorTd.innerHTML = diferenciaValor;
			}
		}
		if (tdsPuntos.length > (rowName+2)) {
			trsPuntos[i].insertBefore(difPuntosTd, tdsPuntos[(rowName+2)]);
			trsPuntos[i].appendChild(difValorTd);
		} else {
			trsPuntos[i].appendChild(difPuntosTd);
		}
	}

	//erpichi 20111205 - En clasificacion poner fuerza
	function getAlineacionIdealFuerzaByFormacion(tablaJugadores, portero, defensa, centrocampista,delantero,posCompare) {
		var porteros = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Portero",portero,posCompare);
		var defensas = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Defensa",defensa,posCompare);
		var centrocampistas = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Centrocampista",centrocampista,posCompare);
		var delanteros = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Delantero",delantero,posCompare);
		var alineacion = new Array();
		for (var i = 0; i < porteros.length; i++) {
			alineacion.push(porteros[i]);
		}
		for (var i = 0; i < defensas.length; i++) {
			alineacion.push(defensas[i]);
		}
		for (var i = 0; i < centrocampistas.length; i++) {
			alineacion.push(centrocampistas[i]);
		}
		for (var i = 0; i < delanteros.length; i++) {
			alineacion.push(delanteros[i]);
		}
		return alineacion;
	}
	
	function getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, puesto, formacion, posCompare){
		var alineacion = new Array();
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var jugador = trs[i].getElementsByTagName("td");
			var posPuesto = 6;
			var posNombre = 2;
			if (plusPlayer) {
				posPuesto = 6;
				posNombre = 2;
			}
			if (jugador[posPuesto].textContent == puesto) {
	            var jugadorNombreSolo = jugador[posNombre].textContent;
	            var jugadorNombrePuntos = jugador[posCompare].textContent;
	            var jugadorNombre = jugadorNombreSolo + ":" + jugadorNombrePuntos;
	            var sinCalificar = false;
	            if (jugadorNombrePuntos == "-") {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("-", "s.c");
	            }
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            jugadorNombrePuntos = replaceAll(jugadorNombrePuntos, ".", "");
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            var sinCalificar2 = false;
					//erpichi 20111128 - Error en alineacion ideal del jugador
		            if (jugadorNombrePuntos2 == "-") {
		            	jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("-", "s.c");
		            }
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            jugadorNombrePuntos2 = replaceAll(jugadorNombrePuntos2, ".", "");
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
		           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	    while(alineacion.length > formacion) {
	    	alineacion.pop();
	    }
	    //alert(alineacion);
		return alineacion;
	}
	
	function getAlineacionIdealFuerzaMensaje(tablaJugadores, porteros, defensas, centrocampistas, delanteros, listaJugadores, posCompare) {
		var retorno = new Array();
		
		//Alineacion 4-4-2
		var alineacion1442 = getAlineacionIdealFuerzaByFormacion(tablaJugadores, porteros,defensas,centrocampistas,delanteros,posCompare);
		var mensajePuntos1442 = "";
		var sumaTotal1442 = 0;
		for(var i = 0; i <alineacion1442.length; i++) {
			jugadorNombre = alineacion1442[i];
			if (jugadorNombre.indexOf(":")) {
				jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
			}
			tienePuntos = 0;
			for (var j = 1; j < listaJugadores.length; j++) {
				var jugadorTD = listaJugadores[j].getElementsByTagName("td");
				//TODO: convertir HTML to char
				//jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				var posNombre = 2;
				if (plusPlayer) {
					posNombre = 2;
				}
				var jugador2=jugadorTD[posNombre].textContent;
				//alert(jugador2+"---"+trim(jugadorNombre));
				if ( trim(jugador2) == trim(jugadorNombre)) {
					mensajePuntos1442 += j + ",";
					tienePuntos = 1;
					var jugadorPuntosValue = replaceAll(jugadorTD[posCompare].textContent, ".", "");
					if (jugadorPuntosValue == parseInt(jugadorPuntosValue)){	
						sumaTotal1442 = sumaTotal1442 + parseInt(jugadorPuntosValue);
					}
					break;
				}
			}
			if (tienePuntos == 0) {
				//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": s.c. <br/>";
			}
		}

		retorno[0] = sumaTotal1442;
		retorno[1] = mensajePuntos1442;
		return retorno;
	}
	
	function getAlineacionIdealFuerza(tablaJugadores, posCompare) {
		var listaJugadores = tablaJugadores.getElementsByTagName("tr");
		var sumaTotal = -10000;
		var retornoTotal = "";
		var retorno;

		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,4,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
			retornoTotal[2] = "4-4-2";
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,3,4,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
			retornoTotal[2] = "3-4-3";
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,3,5,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
			retornoTotal[2] = "3-5-2";
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,3,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
			retornoTotal[2] = "4-3-3";
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,5,1, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
			retornoTotal[2] = "4-5-1";
		}

		return retornoTotal;
	}
	
	function getAlineacionUltimaFuerza(divPage) {

//		var mapa = getPuntosAlineacionUltimaFuerza(divPage);
		return getAlineacionTitularUltimaFuerza(playerIDNamePuntos, divPage);
	}
	
	////////
	function getAlineacionTitularUltimaFuerza(mapa, divPage){
		var alineacion = new Array();
		var div = document.getElementById(divPage);

		var tablasDelDiv = div.getElementsByTagName("table");
		var tablaAlineacion = tablasDelDiv[1].getElementsByTagName("tr");
		var puntos = 0;
		var jugadores = 0;
		var noAlineados = 0;
		var defensas = 0;
		var centrocampistas = 0;
		var delanteros = 0;
		for (var iTable = 2; iTable < tablaAlineacion.length; iTable += 3) {
			//alert("DCB tablaAlineacion[iTable].innerHTML ("+iTable+")" + tablaAlineacion[iTable].innerHTML);
			var tdAlineacion = tablaAlineacion[iTable].getElementsByTagName("td");
			for(var jTable = 0; jTable < tdAlineacion.length; jTable++) {
				var futbolista = tdAlineacion[jTable].innerHTML.replace(/^\s+|\s+$/g,"");
				//alert("DCB futbolista->" + futbolista + "<-mapa[futbolista]->" + mapa[futbolista] + "<-parseInt( mapa[futbolista] )->" + parseInt( mapa[futbolista] ));
//				if (mapa[futbolista] != null && mapa[futbolista] != "-") {
//					puntos += parseInt( mapa[futbolista] );
//					jugadores += 1;
//				}
				if (mapa[futbolista] != null && mapa[futbolista] != "-") {
					if (mapa[futbolista] == parseInt( mapa[futbolista] )) {
						puntos += parseInt( mapa[futbolista] );
					}
					jugadores += 1;
				} else if (futbolista == "-") {
					noAlineados += 1;
					jugadores += 1;
				}
				if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('defender') != -1) {
					defensas += 1;
				} else if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('midfielder') != -1) {
					centrocampistas += 1;
				} else if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('striker') != -1) {
					delanteros += 1;
				}
			}
		}
		if (noAlineados != 11) {
			puntos += noAlineados * -4;
		}
		alineacion[0] = puntos;
//		alineacion[0] = "<b>"+puntos+"</b>/"+eval(puntos/jugadores).toFixed(2)+"/<b>"+jugadores+"</b>";
		alineacion[1] = defensas + '-' + centrocampistas + '-' + delanteros;
		alineacion[2] = jugadores;
		alineacion[3] = noAlineados;
		return alineacion;
	}
	
	function getPuntosAlineacionUltimaFuerza(divPage){
		var mapaTitulares = new Object();
		var div = document.getElementById(divPage);
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var posNombre = 2;
			var posCompare = 5;
			if (plusPlayer) {
				posNombre = 2;
				posCompare = 5;
			}

			var jugador = trs[i].getElementsByTagName("td");
			var jugadorNombreSolo = jugador[posNombre].textContent.replace(/^\s+|\s+$/g,"");
			var jugadorPuntos = "-";
			if (playerIDNamePuntos[jugadorNombreSolo]) {
				jugadorPuntos = playerIDNamePuntos[jugadorNombreSolo];
			}
			if (jugadorPuntos.indexOf("s.c") != -1) {
				jugadorPuntos = "0";
			}
			jugadorPuntos = replaceAll(jugadorPuntos, ".", ""); // ?
			mapaTitulares[jugadorNombreSolo] = jugadorPuntos;
		}
		mapaTitulares["-"] = "-";
		return mapaTitulares;
	}
	//////
	
	
	function obtenerFuerza(text, type, posicion, fuerzaId, numJugId, numJugForId) {
		var totalFuerza = 0;
		var totalJugadores = 0;
		var totalJugadoresStr = "";
		var totalNoAlineadosStr = "";
		var tableFuerza = "";
		var tableFuerzaIni = 0;
		var bodyFuerza = "";
		var bodyFuerzaIni = 0;
		

		bodyFuerzaIni = text.indexOf("<body", bodyFuerzaIni + 1);
		bodyFuerza = text.substring(bodyFuerzaIni, text.indexOf("</body>", bodyFuerzaIni) ) + "</body>";
		bodyFuerza = replaceAll(bodyFuerza, "contentfullsizeib", "bodyFuerzaUltima"+numJugId);
		
		var divPage = document.createElement("div");
		divPage.innerHTML = bodyFuerza;
		divPage.style.display = "none";

		document.body.appendChild( divPage );
		
		do {
			tableFuerzaIni = text.indexOf("<table", tableFuerzaIni + 1);
			tableFuerza = text.substring(tableFuerzaIni, text.indexOf("</table>", tableFuerzaIni) ) + "</table>";
		} while (tableFuerzaIni != -1 && tableFuerza.indexOf("tablecontent03") == -1);
		if (tableFuerza.indexOf("tablecontent03") != -1) {
			var divTableFuerza = document.createElement("div");
			divTableFuerza.innerHTML = tableFuerza;
			var trJugFuerza = divTableFuerza.getElementsByTagName("tr");
			var posPuesto = 6;
			var posPuntos = 5;
			if (plusPlayer) {
				posPuesto = 6;
				posPuntos = 5;
			}
			if (type == "todos") {
				for (var i = 1; i < trJugFuerza.length; i++) {
					var tdJugFuerza = trJugFuerza[i].getElementsByTagName("td");
					if (tdJugFuerza[posPuesto].textContent.indexOf(posicion) != -1) {
						totalFuerza += parseInt(tdJugFuerza[posPuntos].textContent);
						totalJugadores++;
						totalJugadoresStr = totalJugadores + "";
					}
				}
			} else if (type == "ideal") {
				var retornoTotal = getAlineacionIdealFuerza(divTableFuerza, posPuntos);
				totalJugadoresStr = retornoTotal[2];
				var jugadoresSplit = retornoTotal[1].split(",");
				for (var i = 0; i < jugadoresSplit.length - 1; i++) {
					var tdJugFuerza = trJugFuerza[parseInt(jugadoresSplit[i])].getElementsByTagName("td");
					if (tdJugFuerza[posPuesto].textContent.indexOf(posicion) != -1) {
						totalFuerza += parseInt(tdJugFuerza[posPuntos].textContent);
					}
				}
			} else if (type == "ultima") {
//				alert(divPage);
//				alert(divPage.innerHTML);
				var retornoTotal = getAlineacionUltimaFuerza("bodyFuerzaUltima"+numJugId);
				totalJugadoresStr = retornoTotal[2];
				if (retornoTotal[3] != 0) {
					totalNoAlineadosStr = " (" + retornoTotal[3] + " no alineados)";
				}
				totalFuerza = retornoTotal[0];
				document.getElementById(numJugForId).innerHTML = retornoTotal[1];
			}
		} else {
//			totalFuerza = '<img border="0" alt="Error de conexión" title="Error de conexión" src="i/red_light.gif">';
			totalFuerza = '<img border="0" alt="Error de conexión" title="Error de conexión" src="' + images['red_light'] + '">';
		}
		document.getElementById(fuerzaId).innerHTML = totalFuerza;
		document.getElementById(numJugId).innerHTML = totalJugadoresStr + totalNoAlineadosStr;
	}
	
	if( window.location.href.indexOf( "standings.phtml?todos" ) != -1) {
		var typeFuerza = "todos";
		var posicion = "";
		if (window.location.href.indexOf("&") != -1) {
			posicion = window.location.href.substring(window.location.href.indexOf("&") + 1);
		}
		var divContent  = document.getElementById("contentleftst");
		if (divContent != null) {
			var titlePuntuacion = divContent.getElementsByTagName("h2");
			if (posicion == "") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Total (de todos los jugadores)";
			} else if (posicion == "Portero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Portero (de todos los jugadores)";
			} else if (posicion == "Defensa") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Defensa (de todos los jugadores)";
			} else if (posicion == "Centrocampista") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Centrocampista (de todos los jugadores)";
			} else if (posicion == "Delantero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Delantero (de todos los jugadores)";
			}
		}
		var tablaFuerza = document.getElementById("tablestandings");
		var trsFuerza = tablaFuerza.getElementsByTagName("tr");

		var fuerzaTdTitle = document.createElement("td");
		fuerzaTdTitle.align = "right";
		fuerzaTdTitle.innerHTML = "Fuerza";
		trsFuerza[0].appendChild(fuerzaTdTitle);
		
		var numJugTdTitle = document.createElement("td");
		numJugTdTitle.align = "right";
		numJugTdTitle.innerHTML = "Jugadores";
		trsFuerza[0].appendChild(numJugTdTitle);
		for (var i = 1; i < trsFuerza.length; i++) {
			var tdsFuerza = trsFuerza[i].getElementsByTagName("td");
			var linkPlayer = tdsFuerza[rowName].getElementsByTagName("a")[0];
			var idFuerza = "fuerza" + i;
			var fuerzaTd = document.createElement("td");
			fuerzaTd.align = "right";
			fuerzaTd.id = idFuerza;
			fuerzaTd.innerHTML = '<img width="20px" height="20px" title="cargando fuerza..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(fuerzaTd);
			var idNumJug = "numJug" + i;
			var numJugTd = document.createElement("td");
			numJugTd.align = "right";
			numJugTd.id = idNumJug;
			numJugTd.innerHTML = '<img width="20px" height="20px" title="cargando número de jugadores..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(numJugTd);
			eval("get(linkPlayer.href, function(text2) {obtenerFuerza(text2, typeFuerza, posicion, '" + idFuerza + "', '" + idNumJug + "');})");
		}
	}
	
	if( window.location.href.indexOf( "standings.phtml?ideal" ) != -1) {
		var typeFuerza = "ideal";
		var posicion = "";
		if (window.location.href.indexOf("&") != -1) {
			posicion = window.location.href.substring(window.location.href.indexOf("&") + 1);
		}
		var divContent  = document.getElementById("contentleftst");
		if (divContent != null) {
			var titlePuntuacion = divContent.getElementsByTagName("h2");
			if (posicion == "") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Total (de alineación ideal)";
			} else if (posicion == "Portero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Portero (de alineación ideal)";
			} else if (posicion == "Defensa") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Defensa (de alineación ideal)";
			} else if (posicion == "Centrocampista") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Centrocampista (de alineación ideal)";
			} else if (posicion == "Delantero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Delantero (de alineación ideal)";
			}
		}
		var tablaFuerza = document.getElementById("tablestandings");
		var trsFuerza = tablaFuerza.getElementsByTagName("tr");
		
		var fuerzaTdTitle = document.createElement("td");
		fuerzaTdTitle.align = "right";
		fuerzaTdTitle.innerHTML = "Fuerza";
		trsFuerza[0].appendChild(fuerzaTdTitle);
		
		var numJugTdTitle = document.createElement("td");
		numJugTdTitle.align = "right";
		numJugTdTitle.innerHTML = "Formación";
		trsFuerza[0].appendChild(numJugTdTitle);
		for (var i = 1; i < trsFuerza.length; i++) {
			var tdsFuerza = trsFuerza[i].getElementsByTagName("td");
			var linkPlayer = tdsFuerza[rowName].getElementsByTagName("a")[0];
			var idFuerza = "fuerza" + i;
			var fuerzaTd = document.createElement("td");
			fuerzaTd.align = "right";
			fuerzaTd.id = idFuerza;
			fuerzaTd.innerHTML = '<img width="20px" height="20px" title="cargando fuerza..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(fuerzaTd);
			var idNumJug = "numJug" + i;
			var numJugTd = document.createElement("td");
			numJugTd.align = "right";
			numJugTd.id = idNumJug;
			numJugTd.innerHTML = '<img width="20px" height="20px" title="cargando formación..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(numJugTd);
			eval("get(linkPlayer.href, function(text2) {obtenerFuerza(text2, typeFuerza, posicion, '" + idFuerza + "', '" + idNumJug + "');})");
		}
	}
	
	if( window.location.href.indexOf( "standings.phtml?ultima" ) != -1) {
		var typeFuerza = "ultima";
		var posicion = "";
		if (window.location.href.indexOf("&") != -1) {
			posicion = window.location.href.substring(window.location.href.indexOf("&") + 1);
		}
		var divContent  = document.getElementById("contentleftst");
		if (divContent != null) {
			var titlePuntuacion = divContent.getElementsByTagName("h2");
			if (posicion == "") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Puntos de alineación última jornada";
			}
		}
		var tablaFuerza = document.getElementById("tablestandings");
		var trsFuerza = tablaFuerza.getElementsByTagName("tr");
		
		var fuerzaTdTitle = document.createElement("td");
		fuerzaTdTitle.align = "right";
		fuerzaTdTitle.innerHTML = "Fuerza";
		trsFuerza[0].appendChild(fuerzaTdTitle);
		
		var numJugForTdTitle = document.createElement("td");
		numJugForTdTitle.align = "right";
		numJugForTdTitle.innerHTML = "Formación";
		trsFuerza[0].appendChild(numJugForTdTitle);
		
		var numJugTdTitle = document.createElement("td");
		numJugTdTitle.align = "right";
		numJugTdTitle.innerHTML = "Jugadores";
		trsFuerza[0].appendChild(numJugTdTitle);
		for (var i = 1; i < trsFuerza.length; i++) {
			var tdsFuerza = trsFuerza[i].getElementsByTagName("td");
			var linkPlayer = tdsFuerza[rowName].getElementsByTagName("a")[0];
			var idFuerza = "fuerza" + i;
			var fuerzaTd = document.createElement("td");
			fuerzaTd.align = "right";
			fuerzaTd.id = idFuerza;
			fuerzaTd.innerHTML = '<img width="20px" height="20px" title="cargando fuerza..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(fuerzaTd);
			var idNumJugFor = "numJugFor" + i;
			var numJugForTd = document.createElement("td");
			numJugForTd.align = "right";
			numJugForTd.id = idNumJugFor;
			numJugForTd.innerHTML = '<img width="20px" height="20px" title="cargando formación..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(numJugForTd);
			var idNumJug = "numJug" + i;
			var numJugTd = document.createElement("td");
			numJugTd.align = "right";
			numJugTd.id = idNumJug;
			numJugTd.innerHTML = '<img width="20px" height="20px" title="cargando número de jugadores..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(numJugTd);
			eval("get(linkPlayer.href, function(text2) {obtenerFuerza(text2, typeFuerza, posicion, '" + idFuerza + "', '" + idNumJug + "', '" + idNumJugFor + "');})");
		}
	}

	//erpichi 20111123 - En clasificacion poner fuerza
	var divPadreFuerza = document.getElementById("contentleftst");
	
	var divCajaClasificacion = document.getElementById("newsnaviends");
	if (divCajaClasificacion != null) {
		divCajaClasificacion.innerHTML = "<span class=\"button02\"><a title=\"Calcular dinero en Comuniazo\" href=\"JavaScript:;\" onclick=\"window.open('http://www.comuniazo.com/dinero?utm_source=scriptbeta&utm_medium=dinero&utm_campaign=scripts')\">Calcular dinero</a></span>";
	}
	
	divPadreFuerza.innerHTML += '<div class="spacer10px"></div>';
	divPadreFuerza.innerHTML += '<div class="titleboxcontent"><div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div><div class="titlecontent"><h2>Fuerza Script BETA</h2></div></div>';
	
	//todos los jugadores
	divPadreFuerza.innerHTML += '<div id="fuerzaTodos" style="float:left;width:189px;margin:0px 1px 0px 0px;">'
		+ '<div class="titleboxcontent">'
		+ '<div class="bar"><span onmouseout="mclosetime()" onmouseover="mopentime(\'strength2Script\');"><span class="icon i_triangle"></span> Todos los jugadores:</span></div>'
		+ '</div>'
		+ '<div style="background-color: #C3E3BF;border: 1px solid;box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.7); color: #002000 !important;margin:0px 0px 0px 0px;text-align:left;visibility:hidden;position:absolute;padding:5px;min-width:190px;width:auto !important;width:240px;min-height:20px;height:auto !important;height:20px;" id="strength2Script" onmouseout="mclosetime()" onmouseover="mcanceltimer()">'
		+ '<ul style="list-style:none;padding:0px 0px 3px 0px;">'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Total" target="_self" href="standings.phtml?todos">Total</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Portero" target="_self" href="standings.phtml?todos&Portero">Portero</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Defensa" target="_self" href="standings.phtml?todos&Defensa">Defensa</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Centrocampista" target="_self" href="standings.phtml?todos&Centrocampista">Centrocampista</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Delantero" target="_self" href="standings.phtml?todos&Delantero">Delantero</a></span></li>'
		+ '</ul>'
		+ '</div>'
		+ '</div>';
	
	//jugadores  alineacion ideal
	divPadreFuerza.innerHTML += '<div id="fuerzaAlineacion" style="float:left;width:189px;margin:0px 1px 0px 0px;">'
		+ '<div class="titleboxcontent">'
		+ '<div class="bar"><span onmouseout="mclosetime()" onmouseover="mopentime(\'strength1Script\');"><span class="icon i_triangle"></span> Alineación ideal:</span></div>'
		+ '</div>'
		+ '<div style="background-color: #C3E3BF;border: 1px solid;box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.7); color: #002000 !important;margin:0px 0px 0px 0px;text-align:left;visibility:hidden;position:absolute;padding:5px;min-width:189px;width:auto !important;width:239px;min-height:20px;height:auto !important;height:20px;" id="strength1Script" onmouseout="mclosetime()" onmouseover="mcanceltimer()">'
		+ '<ul style="list-style:none;padding:0px 0px 3px 0px;">'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Total" target="_self" href="standings.phtml?ideal">Total</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Portero" target="_self" href="standings.phtml?ideal&Portero">Portero</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Defensa" target="_self" href="standings.phtml?ideal&Defensa">Defensa</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Centrocampista" target="_self" href="standings.phtml?ideal&Centrocampista">Centrocampista</a></span></li>'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Delantero" target="_self" href="standings.phtml?ideal&Delantero">Delantero</a></span></li>'
		+ '</ul>'
		+ '</div>'
		+ '</div>';
	
	//jugadores última alineacion publicada
	divPadreFuerza.innerHTML += '<div id="fuerzaUltima" style="float:left;width:220px;">'
		+ '<div class="titleboxcontent">'
		+ '<div class="bar"><span onmouseout="mclosetime()" onmouseover="mopentime(\'strength3Script\');"><span class="icon i_triangle"></span> Puntos última jornada:</span></div>'
		+ '</div>'
		+ '<div style="background-color: #C3E3BF;border: 1px solid;box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.7); color: #002000 !important;margin:0px 0px 0px 0px;text-align:left;visibility:hidden;position:absolute;padding:5px;min-width:189px;width:auto !important;width:239px;min-height:20px;height:auto !important;height:20px;" id="strength3Script" onmouseout="mclosetime()" onmouseover="mcanceltimer()">'
		+ '<ul style="list-style:none;padding:0px 0px 3px 0px;">'
		+ '<li><span class="strengthbutton"><a style="color: #002000 !important;" title="Total" target="_self" href="standings.phtml?ultima">Total</a></span></li>'
		+ '</ul>'
		+ '</div>'
		+ '</div>';
	
}

//erpichi 20111124 - Mostrar última alineacion publicada, alineacion ideal, alineacion ideal última jornada, en playerInfo
if( window.location.href.indexOf( "playerInfo.phtml" ) != -1) {
	
//erpichi 20121006 - Codigo de S13 para puntos de once alineado	
	function getAlineacionTitular(mapa){
		var alineacion = new Array();
		var div = document.getElementById("contentfullsizeib");

		var tablasDelDiv = div.getElementsByTagName("table");
		var tablaAlineacion = tablasDelDiv[1].getElementsByTagName("tr");
		var puntos = 0;
		var jugadores = 0;
		var noAlineados = 0;
		var defensas = 0;
		var centrocampistas = 0;
		var delanteros = 0;
		for (var iTable = 2; iTable < tablaAlineacion.length; iTable += 3) {
			//alert("DCB tablaAlineacion[iTable].innerHTML ("+iTable+")" + tablaAlineacion[iTable].innerHTML);
			var tdAlineacion = tablaAlineacion[iTable].getElementsByTagName("td");
			for(var jTable = 0; jTable < tdAlineacion.length; jTable++) {
				var futbolista = tdAlineacion[jTable].innerHTML.replace(/^\s+|\s+$/g,"");
				var puntosFutbolista = mapa[futbolista];
				//alert("DCB futbolista->" + futbolista + "<-mapa[futbolista]->" + mapa[futbolista] + "<-parseInt( mapa[futbolista] )->" + parseInt( mapa[futbolista] ));
				if (puntosFutbolista != null && puntosFutbolista != "-") {
					if (puntosFutbolista == parseInt( puntosFutbolista )) {
						puntos += parseInt( puntosFutbolista );
					}
					jugadores += 1;
				} else if (futbolista == "-") {
					noAlineados += 1;
					jugadores += 1;
					puntosFutbolista = "-";
					futbolista = "No alineado";
				} else if (puntosFutbolista == null) {
					puntosFutbolista = "-";
				}
				if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('defender') != -1) {
					defensas += 1;
				} else if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('midfielder') != -1) {
					centrocampistas += 1;
				} else if (tdAlineacion[jTable].parentNode.parentNode.parentNode.parentNode.style.backgroundImage.indexOf('striker') != -1) {
					delanteros += 1;
				}
				tdAlineacion[jTable].innerHTML = futbolista + "<br>" + puntosFutbolista;
//				tdAlineacion[jTable].style.color = "red!important";
				tdAlineacion[jTable].style.setProperty("color", "white", "important");
				tdAlineacion[jTable].style.backgroundColor = "black";
				tdAlineacion[jTable].style.textAlign = "center";
				tdAlineacion[jTable].style.verticalAlign = "bottom";
				tdAlineacion[jTable].style.fontFamily = "Arial";
				tdAlineacion[jTable].style.fontSize = "10px";
				tdAlineacion[jTable].style.padding = "0 3px";
				
				if (futbolista != "No alineado") {
					if (readFotoPlayer(futbolista)) {
						var varFotoHTMLAlineado = replaceAll(readFotoPlayer(futbolista), "height='" + playerFotoSize + "'", "height='" + playerFotoSizeMax + "'");
						tdAlineacion[jTable].parentNode.previousSibling.previousSibling.cells[jTable].innerHTML = varFotoHTMLAlineado;
					}
				}
			}

		}
		if (noAlineados != 11) {
			puntos += noAlineados * -4;
		}

		var divsDelDiv = div.getElementsByTagName("div");
		for (var kTable = 0; kTable < divsDelDiv.length; kTable++) {
			if (divsDelDiv[kTable].className == "titlecontent") {
				divsDelDiv[kTable].innerHTML = "<h2><a id='onceAlineadoLink' href='javascript:;' ><b>Alineación de la ultima jornada</b></a></h2>";

				var padreDiv = divsDelDiv[kTable].parentNode;
				var divSpacer = padreDiv.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
				divSpacer.className = "";
				var jugadoresJugados = "";
				if (jugadores != 11) {
					jugadoresJugados = " (Han jugado " + jugadores + " jugadores)";
				}
//				divSpacer.innerHTML = '<div class="boxcontentdown"><div class="bar_content_r" id="onceAlineadoResumen"><b>Formación:</b> ' + defensas + '-' + centrocampistas + '-' + delanteros + ' <b>Jugados:</b> ' + jugadores + ' <strong>Total: ' + puntos + '</strong></div></div><div class="spacer10px"></div>';
				divSpacer.innerHTML = '<div class="boxcontentdown"><div class="bar_content_r" id="onceAlineadoResumen"><b>Formación:</b> ' + defensas + '-' + centrocampistas + '-' + delanteros + ' <strong>Total: ' + puntos + '</strong>' + jugadoresJugados + '</div></div><div class="spacer10px"></div>';

				var onceAlineadoLink = document.getElementById("onceAlineadoLink");
				onceAlineadoLink.addEventListener( "click", function(){ toggleDisplay(padreDiv.nextSibling.nextSibling.nextSibling.nextSibling, '');}, true );
				break;
				
			}
			
			
		}
	}
	
	function getPuntosAlineacion(){
		var mapaTitulares = new Object();
		var div = document.getElementById("contentfullsizeib");
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var posNombre  = 3;
			var posCompare = 10;

			var jugador = trs[i].getElementsByTagName("td");
			var jugadorNombreSolo = jugador[posNombre].textContent.replace(/^\s+|\s+$/g,"");
			var jugadorPuntos = jugador[posCompare].textContent;
//			if (jugadorPuntos.indexOf("s.c") != -1) {
//				jugadorPuntos = "0";
//			}
//			jugadorPuntos = replaceAll(jugadorPuntos, ".", ""); // ?
			mapaTitulares[jugadorNombreSolo] = jugadorPuntos;
		}
		mapaTitulares["-"] = "-";
		return mapaTitulares;
	}

//	var mapa = getPuntosAlineacion();
	getAlineacionTitular(playerIDNamePuntos);
	//erpichi 20121006 - Codigo de S13 para puntos de once alineado	

	function getAlineacionIdealJugadorByFormacion(portero, defensa, centrocampista,delantero,posCompare) {
		var porteros = getAlineacionIdealJugadorByPuestoAndFormacion("Portero",portero,posCompare);
		var defensas = getAlineacionIdealJugadorByPuestoAndFormacion("Defensa",defensa,posCompare);
		var centrocampistas = getAlineacionIdealJugadorByPuestoAndFormacion("Centrocampista",centrocampista,posCompare);
		var delanteros = getAlineacionIdealJugadorByPuestoAndFormacion("Delantero",delantero,posCompare);
		var alineacion = new Array();
		for (var i = 0; i < porteros.length; i++) {
			alineacion.push(porteros[i]);
		}
		for (var i = 0; i < defensas.length; i++) {
			alineacion.push(defensas[i]);
		}
		for (var i = 0; i < centrocampistas.length; i++) {
			alineacion.push(centrocampistas[i]);
		}
		for (var i = 0; i < delanteros.length; i++) {
			alineacion.push(delanteros[i]);
		}
		return alineacion;
	}
	
	function getAlineacionIdealJugadorByPuestoAndFormacion(puesto, formacion, posCompare){
		var alineacion = new Array();
		var div = document.getElementById("contentfullsizeib");
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var jugador = trs[i].getElementsByTagName("td");
			var posPuesto = 7;
			var posNombre = 3;
			if (plusPlayer) {
				posPuesto = 7;
				posNombre = 3;
			}
			if (jugador[posPuesto].textContent == puesto) {
	            var jugadorNombreSolo = jugador[posNombre].textContent;
	            var jugadorNombrePuntos = jugador[posCompare].textContent;
	            var jugadorNombre = jugadorNombreSolo + ":" + jugadorNombrePuntos;
	            var sinCalificar = false;
	            if (jugadorNombrePuntos == "-") {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("-","s.c");
	            }
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            jugadorNombrePuntos = replaceAll(jugadorNombrePuntos, ".", "");
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            var sinCalificar2 = false;
					//erpichi 20111128 - Error en alineacion ideal del jugador
		            if (jugadorNombrePuntos2 == "-") {
		            	jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("-","s.c");
		            }
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            jugadorNombrePuntos2 = replaceAll(jugadorNombrePuntos2, ".", "");
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
		           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	    while(alineacion.length > formacion) {
	    	alineacion.pop();
	    }
	    //alert(alineacion);
		return alineacion;
	}
	
	function getAlineacionIdealTotalMensaje(porteros, defensas, centrocampistas, delanteros, listaJugadores, posCompare) {
		var retorno = new Array();
		
		var mensajePuntosIni = '<tbody>';
		
		var mensajePuntosDelanterosIni = '<tr class="tr1"><td width="600" height="172" align="center" style="background-image:url(\'i/1/lineup_striker_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: bottom;"><table><tbody><tr>';
		var mensajePuntosDelanterosImagen = '<td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosDelanterosSeparacion = '</tr><tr>';
		var mensajePuntosDelanterosNombre = '<td style="color:white !important;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;padding: 0 3px;">-</td>';
		var mensajePuntosDelanterosFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosCentrocampistasIni = '<tr class="tr1"><td width="600" height="109" align="center" style="background-image:url(\'i/1/lineup_midfielder_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: middle;"><table><tbody><tr>';
		var mensajePuntosCentrocampistasImagen = '<td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosCentrocampistasSeparacion = '</tr><tr>';
		var mensajePuntosCentrocampistasNombre = '<td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;padding: 0 3px;">-</td>';
		var mensajePuntosCentrocampistasFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosDefensasIni = '<tr class="tr1"><td width="600" height="137" align="center" style="background-image:url(\'i/1/lineup_defender_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: middle;"><table><tbody><tr>';
		var mensajePuntosDefensasImagen = '<td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosDefensasSeparacion = '</tr><tr>';
		var mensajePuntosDefensasNombre = '<td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;padding: 0 3px;">-</td>';
		var mensajePuntosDefensasFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosPorterosIni = '<tr class="tr1"><td width="600" height="73" align="center" style="background-image:url(\'i/1/lineup_keeper_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: top;"><table><tbody><tr>';//background-position:center; 
		var mensajePuntosPorterosImagen = '<td style="background-color:transparent;text-align:center;vertical-align:top;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosPorterosSeparacion = '</tr><tr>';
		var mensajePuntosPorterosNombre = '<td style="color:white !important;background-color:black;text-align:center;vertical-align:top;font-family:Arial;font-size:10px;padding: 0 3px;">-</td>';
		var mensajePuntosPorterosFin = '</tr></tbody></table></td></tr>';
		
		var mensajePuntosFin = '</tbody>';
		
		//Alineacion 4-4-2
		var alineacion1442 = getAlineacionIdealJugadorByFormacion(porteros,defensas,centrocampistas,delanteros,posCompare);
		var mensajePuntos1442 = "";
		var mensajePuntos1442DelanterosImagen = "";
		var mensajePuntos1442DelanterosNombre = "";
		var mensajePuntos1442CentrocampistasImagen = "";
		var mensajePuntos1442CentrocampistasNombre = "";
		var mensajePuntos1442DefensasImagen = "";
		var mensajePuntos1442DefensasNombre = "";
		var mensajePuntos1442PorterosImagen = "";
		var mensajePuntos1442PorterosNombre = "";
		var sumaTotal1442 = 0;
		for(var i = 0; i <alineacion1442.length; i++) {
			jugadorNombre = alineacion1442[i];
			if (jugadorNombre.indexOf(":")) {
				jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
			}
			tienePuntos = 0;
			for (var j = 1; j < listaJugadores.length; j++) {
				var jugadorTD = listaJugadores[j].getElementsByTagName("td");
				//TODO: convertir HTML to char
				//jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				var posPuesto = 7;
				var posNombre = 3;
				if (plusPlayer) {
					posPuesto = 7;
					posNombre = 3;
				}
				var jugador2=jugadorTD[posNombre].textContent;
				//alert(jugador2+"---"+trim(jugadorNombre));
				if ( jugador2 == trim(jugadorNombre)) {
//					var imageTD = jugadorTD[0].innerHTML.substring(jugadorTD[0].innerHTML.indexOf("<img"), jugadorTD[0].innerHTML.indexOf(">", jugadorTD[0].innerHTML.indexOf("<img"))).replace("tradablePhoto.phtml/m/", "tradablePhoto.phtml/s/");
					var imageTD = jugadorTD[0].innerHTML.substring(jugadorTD[0].innerHTML.indexOf("<img"), jugadorTD[0].innerHTML.indexOf(">", jugadorTD[0].innerHTML.indexOf("<img")) + 1).replace("height='" + playerFotoSize + "'", "height='" + playerFotoSizeMax + "'").replace("height=\"" + playerFotoSize + "\"", "height=\"" + playerFotoSizeMax + "\"");
					if (jugadorTD[posPuesto].textContent == "Delantero") {
						mensajePuntos1442DelanterosImagen += mensajePuntosDelanterosImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442DelanterosNombre += mensajePuntosDelanterosNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[posPuesto].textContent == "Centrocampista") {
						mensajePuntos1442CentrocampistasImagen += mensajePuntosCentrocampistasImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442CentrocampistasNombre += mensajePuntosCentrocampistasNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[posPuesto].textContent == "Defensa") {
						mensajePuntos1442DefensasImagen += mensajePuntosDefensasImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442DefensasNombre += mensajePuntosDefensasNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[posPuesto].textContent == "Portero") {
						mensajePuntos1442PorterosImagen += mensajePuntosPorterosImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442PorterosNombre += mensajePuntosPorterosNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					}
					//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": " +jugadorTD[5].textContent + "<br/>";
					tienePuntos = 1;
					var jugadorPuntosValue = replaceAll(jugadorTD[posCompare].textContent, ".", "");
					
					if (jugadorPuntosValue == parseInt(jugadorPuntosValue)){	
						sumaTotal1442 = sumaTotal1442 + parseInt(jugadorPuntosValue);
					}
					break;
				}
			}
			if (tienePuntos == 0) {
				//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": s.c. <br/>";
			}
		}
		mensajePuntos1442DelanterosImagen = mensajePuntosDelanterosIni + mensajePuntos1442DelanterosImagen + mensajePuntosDelanterosSeparacion + mensajePuntos1442DelanterosNombre + mensajePuntosDelanterosFin;
		mensajePuntos1442CentrocampistasImagen = mensajePuntosCentrocampistasIni + mensajePuntos1442CentrocampistasImagen + mensajePuntosCentrocampistasSeparacion + mensajePuntos1442CentrocampistasNombre + mensajePuntosCentrocampistasFin;
		mensajePuntos1442DefensasImagen = mensajePuntosDefensasIni + mensajePuntos1442DefensasImagen + mensajePuntosDefensasSeparacion + mensajePuntos1442DefensasNombre + mensajePuntosDefensasFin;
		mensajePuntos1442PorterosImagen = mensajePuntosPorterosIni + mensajePuntos1442PorterosImagen + mensajePuntosPorterosSeparacion + mensajePuntos1442PorterosNombre + mensajePuntosPorterosFin;
		mensajePuntos1442 = mensajePuntosIni + mensajePuntos1442DelanterosImagen + mensajePuntos1442CentrocampistasImagen + mensajePuntos1442DefensasImagen + mensajePuntos1442PorterosImagen + mensajePuntosFin;
		mensajePuntos1442Resumen = "<b>Formación:</b> " + defensas + "-" + centrocampistas + "-" + delanteros +" <strong>Total: "+formateaNumero(sumaTotal1442, ".", false)+"</strong>";

		retorno[0] = sumaTotal1442;
		retorno[1] = mensajePuntos1442;
		retorno[2] = mensajePuntos1442Resumen;
		return retorno;
	}
	
	function showAlineacionIdealTotal(idAlineacion, posCompare) {
		var div = document.getElementById("contentfullsizeib");
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var listaJugadores = tablaJugadores.getElementsByTagName("tr");
//		var jugador2 = "";
		var mensajePuntos = "";
		var mensajePuntosResumen = "";
		var sumaTotal = -10000;

		var retorno = getAlineacionIdealTotalMensaje(1,4,4,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,3,4,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,3,5,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,4,3,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,4,5,1, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}

		document.getElementById(idAlineacion).innerHTML = mensajePuntos;
		document.getElementById(idAlineacion + "Resumen").innerHTML = mensajePuntosResumen;
	}
	
	function crearAlineacionIdealTotal(idAlineacion, labelAlineacion, posCompare) {
		var divPadreAlineacion = document.getElementById("contentfullsizeib");
		
		var divAlineacionIdealTotal = document.createElement("div");
		divAlineacionIdealTotal.innerHTML += '<div class="titleboxcontent">'
			+ '<div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div>'
			+ '<div class="titlecontent"><h2><a id="'+ idAlineacion +'Link" href="javascript:;" ><b>' + labelAlineacion + '</b></h2></a></div>'
			+ '</div>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[2]);
		divAlineacionIdealTotal.innerHTML += '<table id="' + idAlineacion +'" cellspacing="0" cellpadding="0" border="0" style="display: none;">'
			+ '<tbody><tr class="tr1"><td width="600" height="172" align="center" style="background-image:url(\'i/1/lineup_striker_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: bottom;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white !important;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="600" height="109" align="center" style="background-image:url(\'i/1/lineup_midfielder_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: middle;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="600" height="137" align="center" style="background-image:url(\'i/1/lineup_defender_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: middle;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white !important;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="600" height="73" align="center" style="background-image:url(\'i/1/lineup_keeper_bg.gif\'); position:relative; background-repeat:no-repeat; background-position:top;background-color:#152D0C; vertical-align: top;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:top;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white !important;background-color:black;text-align:center;vertical-align:top;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '</tbody></table>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[3]);
		divAlineacionIdealTotal.innerHTML += '<div class="boxcontentdown"><div id="' + idAlineacion + 'Resumen" class="bar_content_r"></div></div>';
		divAlineacionIdealTotal.innerHTML += '<div class="spacer10px"></div>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[4]);

		//alert(divAlineacionIdealTotal.innerHTML);
		divPadreAlineacion.insertBefore(divAlineacionIdealTotal, divPadreAlineacion.childNodes[2]);
		//divPadreAlineacion.appendChild(divAlineacionIdealTotal);
		
		var alineacionIdealTotalLink = document.getElementById(idAlineacion + "Link");
		var alineacionIdealTotal = document.getElementById(idAlineacion);
		alineacionIdealTotalLink.addEventListener( "click", function(){ toggleDisplay(alineacionIdealTotal, '');showAlineacionIdealTotal(idAlineacion, posCompare);}, true );
	}

	//erpichi 20111125 - Estilos en playerInfo
	//erpichi 20111130 - Comentados porque los arregla comunio
	//erpichi 20111205 - El estilo se ve mal en www.comunio.es y bien en www*.comunio.es
	if (document.location.href.indexOf('www.comunio.es') != -1) {
		var divPlayerInfo = document.getElementById("contentfullsizeib");
		if (divPlayerInfo != null) {
			divPlayerInfo.style.padding = "0 0 0 10px";
		}
	}

	//erpichi 20111125 - Cambio titulos en playerInfo
	var tableJugadoresFic = document.getElementsByTagName("table");
	for (var iTable = 0; iTable < tableJugadoresFic.length; iTable++) {
		if (tableJugadoresFic[iTable].className != "tablecontent03") {
			continue;
		}
		var trsJugadoresFic = tableJugadoresFic[iTable].getElementsByTagName("tr");
		if (trsJugadoresFic.length > 0) {
			var tdsJugadoresFic = trsJugadoresFic[0].getElementsByTagName("td");
			for(var jTable = 0; jTable < tdsJugadoresFic.length; jTable++) {
				if (tdsJugadoresFic[jTable].innerHTML.indexOf("Estado") != -1) {
					plusPlayer = true;
					break;
				}
			}
//			if (tdsJugadoresFic.length > 8) {
//				plusPlayer = true;
//			}
			
		}
		break;
	}
	if (plusPlayer) {
		crearAlineacionIdealTotal("alineacionIdealPrecio", "Alineación ideal (Valor de mercado)", 5);
		crearAlineacionIdealTotal("alineacionIdealUltimaJornada", "Alineación ideal (Puntos última jornada)", 12);
		crearAlineacionIdealTotal("alineacionIdealTotal", "Alineación ideal (Puntos totales)", 6);
	} else {
		crearAlineacionIdealTotal("alineacionIdealPrecio", "Alineación ideal (Valor de mercado)", 5);
		crearAlineacionIdealTotal("alineacionIdealUltimaJornada", "Alineación ideal (Puntos última jornada)", 10);
		crearAlineacionIdealTotal("alineacionIdealTotal", "Alineación ideal (Puntos totales)", 6);
	}
	
}

var menuJugador = document.getElementById("playactiv");
if (menuJugador != null) {
	var ulsMenu = menuJugador.getElementsByTagName("ul");
	ulsMenu[3].innerHTML += '<li><span class="subsubnav"><div class="subsubnav_i_arrow"></div><a title="Seguir jugadores" target="_self" href="exchangemarket.phtml?jugadores">Seguir jugadores</a></span></li>';
}

if (window.location.href.indexOf( "exchangemarket.phtml?jugadores" ) != -1) {
	var listado = '<span class="contenttext">Aquí puedes ver a todos los jugadores y seguir a los que te interesen. Escribe en el campo de texto para filtrar. Si pulsas en Seguir, podras ver la diferencia en el valor de mercado y en los puntos desde la fecha en que lo estas siguiendo. Pulsa Dejar para quitar el seguimiento de ese jugador.</span>'
		+ '<div class="spacer10px"></div>'
		+ '<div class="titleboxcontent">'
		+ '<div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div>'
		+ '<div class="titlecontent"><h3><span class="button02"><a href="javascript:;">Filtrar: <input id="jugFiltrar" type="text" class="textinput" value="" maxlength="20" size="30" /></a></span></h3>'
		+ '<h3><span class="button02"><a href="javascript:;">Posición: <select class="textinput" id="jugFiltrarPosicion"><option value="">Cualquiera</option><option value="Portero">Portero</option><option value="Defensa">Defensa</option><option value="Centrocampista">Centrocampista</option><option value="Delantero">Delantero</option></select></a></span></h3>'
		+ '<h3><span class="button02"><a href="javascript:;">Equipo: <select class="textinput" id="jugFiltrarEquipo"><option value="">Cualquiera</option><option value="Athletic">Athletic</option><option value="Atlético">Atlético</option><option value="Barcelona">Barcelona</option><option value="Betis">Betis</option><option value="Celta">Celta</option><option value="Deportivo">Deportivo</option><option value="Espanyol">Espanyol</option><option value="Getafe">Getafe</option><option value="Granada">Granada</option><option value="Levante">Levante</option><option value="Mallorca">Mallorca</option><option value="Málaga">Málaga</option><option value="Osasuna">Osasuna</option><option value="Rayo Vallecano">Rayo Vallecano</option><option value="Real Madrid">Real Madrid</option><option value="Real Sociedad">Real Sociedad</option><option value="Sevilla">Sevilla</option><option value="Valencia">Valencia</option><option value="Valladolid">Valladolid</option><option value="Zaragoza">Zaragoza</option></select></a></span></h3>'
		+ '<h3><span class="button02"><a href="javascript:;"><input type="checkbox" id="jugFiltrarCheck" /> Solo seguimiento</a></span></h3></div>'
		+ '</div>'
		+ '<table id="tablaJugadores" cellspacing="1" cellpadding="2" border="0" class="tablecontent03"><tbody>'
		+ '<tr>'
		+ '<td align="center"></td>'
		+ '<td align="center">Nombre</td>'
		+ '<td align="center">Equipo</td>'
		+ '<td align="center">Seguimiento</td>'
		+ '<td align="center">Posicion</td>'
		+ '<td align="center">Valor de mercado</td>'
		+ '<td align="center">Dif. Valor</td>'
		+ '<td align="center">Puntos</td>'
		+ '<td align="center">Dif. Puntos</td>'
		+ '<td align="center"></td>'
		+ '<td align="center"></td>'
		+ '<td align="center"></td>'
		+ '</tr>';

	var iJugadores = 0;
	for (var jugNombre in playerID) {
		if (jugNombre != null && jugNombre.length > 0) {
			var jugId = playerID[jugNombre];
			var jugFoto = readFotoPlayer(jugNombre);
			var jugPuntos = "-";
			if (playerIDNamePuntos[jugNombre]) {
				jugPuntos = playerIDNamePuntos[jugNombre];
			}
//			var urlPuntos = "http://www.calculapuntoscomunio.com/puntos/";
//			var titlePuntos = "Click aquí para ver los puntos en CpC.";
			var urlPuntos = "http://www.comuniazo.com/puntos?utm_source=scriptbeta&utm_medium=puntos&utm_campaign=scripts";
			var titlePuntos = "Click aquí para ver los puntos en Comuniazo.";
			var jugEstado = calculaEstadoScript(jugNombre);
			var jugEquipo = playerIDNameEquipo[jugNombre];
			var jugPosicion = playerIDNamePosicion[jugNombre];
			var jugTotales = playerIDNameTotales[jugNombre];
			var jugMercado = playerIDNameMercado[jugNombre];
//			
			var playerName = jugNombre;
			var valorEntra = "";
			var valorSale = "";
//			var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="i/1/tribuene2.gif" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
			var camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="20" src="' + images['nojugadoEquipo'] + '" alt="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' su equipo aun no ha jugado en la jornada ' + scriptJornadaString + '">';
			if (playerIDNamePuntos[playerName] != null) {
				var entra = playerIDNameEntra[playerName];
				var sale = playerIDNameSale[playerName];
				var url = playerIDNameUrl[playerName];

//				camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
				camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + '. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
				if (sale != null && sale != "-") {
//					camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/whitesuit.gif">';
					camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'" title="' + playerName + ' ha jugado de titular en la jornada ' + scriptJornadaString + ' - Sustituido en el ' + sale + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['titular'] + '">';
					valorSale = '<small style="display: block;color: red;font-weight: bold;">' + sale + "\'</small>";
				}
				if (entra != null && entra != "-") {
//					camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="i/1/suit.gif">';
					camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'" title="' + playerName + ' fué suplente en la jornada ' + scriptJornadaString + ' - Entra en el ' + entra + '\'. Click aquí para ver la crónica del partido en CpC." src="' + images['suplente'] + '">';
					valorEntra = '<small style="display: block;color: #3F5B34;font-weight: bold;">' + entra + '\'</small>';
				}
				if (playerIDNamePuntos[playerName] == "s.c.") {
					camiseta = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" width="15" src="' + images['nojugado'] + '" alt="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '" title="' + playerName + ' no ha jugado en la jornada ' + scriptJornadaString + '">';
				}
				camiseta = valorEntra + "<a href='javascript:;' onclick=\"window.open('" + url + "')\" >" + camiseta + "</a>" + valorSale;
			}

			var classHighlight = "";
			var jugSeguir = "";
			var jugSiguiendo = false;
			var jugSiguiendoSplit;
			var jugStorage = localStorage.getItem("scriptSeguir" + jugId);
			if (jugStorage != null && jugStorage != "") {
				jugSiguiendo = true;
				jugSiguiendoSplit = jugStorage.split("/-/");
				var jugSiguiendoFecha = "-";
				if (jugSiguiendoSplit.length >= 4) {
					jugSiguiendoFecha = jugSiguiendoSplit[3];
				}
				classHighlight = " highlightedtablecontent";
				jugSeguir = '<td align="center">'+jugSiguiendoFecha+'<h5><span class="button02"><a id="dejarJug' + jugId + '" name="dejarJug" title="Dejar de seguir" href="javascript:;">Dejar</a></span></h5></td>';
			} else {
				jugSeguir = '<td align="center"><h3><span class="button02"><a id="seguirJug' + jugId + '" name="seguirJug" title="Seguir" href="javascript:;">Seguir</a></span></h3></td>';
			}
			var jugDifTotales = "-";
			var jugDifMercado = "-";
			
			if (jugSiguiendo) {
				if (jugSiguiendoSplit.length >= 2) {
					jugDifTotales = jugSiguiendoSplit[1];

					jugDifTotales = replaceAll(jugDifTotales, ".", "");
					var jugTotalesCalc = replaceAll(jugTotales, ".", "");
					var diferencia =  parseInt(jugTotalesCalc) - parseInt(jugDifTotales);
					jugDifTotales = formateaNumero(diferencia, ".", true);
					if (diferencia > 0) {
						jugDifTotales = "<span style='color:#3F5B34'>" + jugDifTotales + "</span>";
					} else if (diferencia < 0) {
						jugDifTotales = "<span style='color:RED'>" + jugDifTotales + "</span>";
					} else {
						jugDifTotales = "<span>" + jugDifTotales + "</span>";
					}
				}
				if (jugSiguiendoSplit.length >= 3) {
					jugDifMercado = jugSiguiendoSplit[2];

					jugDifMercado = replaceAll(jugDifMercado, ".", "");
					var jugMercadoCalc = replaceAll(jugMercado, ".", "");
					var diferencia =  parseInt(jugMercadoCalc) - parseInt(jugDifMercado);
					jugDifMercado = formateaNumero(diferencia, ".", true);
					if (diferencia > 0) {
						jugDifMercado = "<span style='color:#3F5B34'>" + jugDifMercado + "</span>";
					} else if (diferencia < 0) {
						jugDifMercado = "<span style='color:RED'>" + jugDifMercado + "</span>";
					} else {
						jugDifMercado = "<span>" + jugDifMercado + "</span>";
					}
				}
			}

			iJugadores = iJugadores + 1;
			var trClass = 'class="tr1' + classHighlight + '"';
			if (iJugadores % 2 == 0) {
				trClass = 'class="tr2' + classHighlight + '"';
			}
			listado += '<tr ' + trClass + '>';
			listado += '<td align="center" width="5%"><a href="tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '\'))" target="_blank" >' + jugFoto + '</a></td>';
			listado += '<td align="left"><a href="tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '\'))" target="_blank" >' + jugNombre + '</a></td>';
//			listado += '<td align="center" width="5%">' + '<a href="' + teamURL[ GM_getValue( "URLSrc", "oficial" ) ][ jugEquipo ] + '" target="_blank"><img src="' + images[ jugEquipo ] + '" alt=' + jugEquipo +' title=' +jugEquipo + ' border="0" /></a>' + '</td>';
			listado += '<td align="center" width="5%">' + '<a href="' + teamURL[ GM_getValue( "URLSrc", "CMN" ) ][ jugEquipo ] + '" onclick="return(openSmallWindow(\'' + teamURL[ GM_getValue( "URLSrc", "CMN" ) ][ jugEquipo ] + '\'))" target="_blank"><img src="' + images[ jugEquipo ] + '" alt="' + jugEquipo +'" title="' +jugEquipo + '" border="0" /></a>' + '</td>';
			listado += jugSeguir;
			listado += '<td align="left">' + jugPosicion + '</td>';
			listado += '<td align="right">' + jugMercado + '</td>';
			listado += '<td align="right">' + jugDifMercado + '</td>';
			listado += '<td align="right">' + jugTotales + '</td>';
			listado += '<td align="right">' + jugDifTotales + '</td>';
			listado += '<td align="right" width="5%">' + camiseta + '</td>';
			listado += '<td align="right" width="5%">' + jugEstado + '</td>';
			listado += '<td align="right" width="5%">' + "<a  style='text-decoration: none;' title='" + titlePuntos + "' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div>' + getPuntosColor(jugPuntos) + '</div>' + "</a>" + '</td>';
			listado += '</tr>';
		}
	}
	if (iJugadores == 0) {
		listado += '<tr class="tr1">';
		listado += '<td align="center" colspan="2">No se encuentran jugadores</td>';
		listado += '</tr>';
	}
	
	
	listado += '</tbody></table>'
		+ '<div class="boxcontentdown"><div class="bar_content_l"></div><div class="bar_content_r"></div></div><div class="spacer10px"></div>';

	var title = document.getElementById("title");
	if (title != null) {
		title.innerHTML = '<h1><span class="heading">Seguir jugadores</span></h1>';
	}
	
	function activarSeguirJugadores() {
		//Add seguir capability	
		var btnsSeguir = document.getElementsByName("seguirJug");
		for (var i = 0; i < btnsSeguir.length; i++) {
			btnsSeguir[i].addEventListener( "click", function(){ seguirJugadores(this);}, true );
		}

		//Add dejar capability	
		var btnsDejar = document.getElementsByName("dejarJug");
		for (var i = 0; i < btnsDejar.length; i++) {
			btnsDejar[i].addEventListener( "click", function(){ dejarJugadores(this);}, true );
		}
	}
	
	var contentfullsize = document.getElementById("contentfullsize");
	if (contentfullsize != null) {
		
		contentfullsize.innerHTML = listado;
		var jugFiltrar = document.getElementById("jugFiltrar");
		if (jugFiltrar != null) {
			jugFiltrar.addEventListener( "keyup", function(){ filtrarJugadores();}, true );
		}
		var jugFiltrarPosicion = document.getElementById("jugFiltrarPosicion");
		if (jugFiltrarPosicion != null) {
			jugFiltrarPosicion.addEventListener( "change", function(){ filtrarJugadores();}, true );
		}
		var jugFiltrarEquipo = document.getElementById("jugFiltrarEquipo");
		if (jugFiltrarEquipo != null) {
			jugFiltrarEquipo.addEventListener( "change", function(){ filtrarJugadores();}, true );
		}
		var jugFiltrarCheck = document.getElementById("jugFiltrarCheck");
		if (jugFiltrarCheck != null) {
			jugFiltrarCheck.addEventListener( "click", function(){ filtrarJugadores();}, true );
		}
		
		activarSeguirJugadores();

		//Add sorting capability	
		var tablaJugadores = document.getElementById("tablaJugadores");
		var tablaJugadoresSorter = new TSorter;
		tablaJugadoresSorter.init(tablaJugadores);
	}
	
	function seguirJugadores(btnId) {
		var jugId = btnId.id.replace("seguirJug", "");
		var jugNombre = playerIDName[jugId];
		var jugTotales = playerIDNameTotales[jugNombre];
		var jugMercado = playerIDNameMercado[jugNombre];
		var jugFechaDate = new Date();
		var jugFechaDia = jugFechaDate.getDate().toString();
		if (jugFechaDia.length == 1) {
			jugFechaDia = "0" + jugFechaDia;
		}
		var jugFechaMes = (jugFechaDate.getMonth() + 1).toString();
		if (jugFechaMes.length == 1) {
			jugFechaMes = "0" + jugFechaMes;
		}
		var jugFecha = jugFechaDia + "." + jugFechaMes + ".    ";
		localStorage.setItem("scriptSeguir" + jugId, jugId + "/-/" + jugTotales + "/-/" + jugMercado + "/-/" + jugFecha);

		window.location.reload();
	}
	
	function dejarJugadores(btnId) {
		var jugId = btnId.id.replace("dejarJug", "");
		var jugNombre = playerIDName[jugId];
		localStorage.removeItem("scriptSeguir" + jugId);

		window.location.reload();
	}
	
	function filtrarJugadores(filtro) {
		var filtro = document.getElementById("jugFiltrar").value;
		var filtroPosicion = document.getElementById("jugFiltrarPosicion").value;
		var filtroEquipo = document.getElementById("jugFiltrarEquipo").value;
		var filtroCheck = document.getElementById("jugFiltrarCheck").checked;

		var filtrado = false;
		var tablaJugadores = document.getElementById("tablaJugadores");
		var trsJugadores = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trsJugadores.length; i++) {
			var tdsJugadores = trsJugadores[i].getElementsByTagName("td");
			if (tdsJugadores.length >= 2) {
				var tdEnlaces = tdsJugadores[1].getElementsByTagName("a");
				var tdValor = normalize(tdEnlaces[0].innerHTML.toLowerCase());
				var tdValorPosicion = normalize(tdsJugadores[4].innerHTML.toLowerCase());
				var tdValorEquipo = normalize(tdsJugadores[2].innerHTML.toLowerCase());
				var filtroValor = normalize(filtro.toLowerCase());
				var filtroValorPosicion = normalize(filtroPosicion.toLowerCase());
				var filtroValorEquipo = normalize(filtroEquipo.toLowerCase());
				var filtroSeguimiento = tdsJugadores[3].innerHTML.indexOf('name="dejarJug"') != -1;
				if ((tdValor.indexOf(filtroValor) != -1
							&& tdValorPosicion.indexOf(filtroValorPosicion) != -1
							&& tdValorEquipo.indexOf(filtroValorEquipo) != -1
							&& !filtroCheck)
						|| (tdValor.indexOf(filtroValor) != -1
							&& tdValorPosicion.indexOf(filtroValorPosicion) != -1
							&& tdValorEquipo.indexOf(filtroValorEquipo) != -1
							&& filtroCheck
							&& filtroSeguimiento)) {
					trsJugadores[i].style.display = "";
				} else {
					trsJugadores[i].style.display = "none";
					filtrado = true;
				}
			}
		}
		if (filtrado) {
			var tablaJugadoresSorter = new TSorter;
			tablaJugadoresSorter.end(tablaJugadores);
		} else {
			var tablaJugadoresSorter = new TSorter;
			tablaJugadoresSorter.init(tablaJugadores);
		}
	}
}

if (window.location.href.indexOf( "standings.phtml?currentweekonly" ) != -1) {
	var tablePuntUlt = document.getElementById("newsnaviends");
	if (tablePuntUlt != null) {
		tablePuntUlt.innerHTML += '<form style="display:inline" name="post" action="team_news.phtml" method="post"><input type="hidden" value="messageSubmitted" name="newsAction"><input type="hidden" id="titleMensajePuntuacion" value="SCRIPT - Puntuación" name="headline"/><input type="hidden" name="message" id="message" value=""/><input type="hidden" value="-1" name="send"/><a title="Publicar puntuación" class="button02" href="javascript:submitForm(\'post\',\'send\');">Publicar puntuación</a></form>';
		if (document.getElementById("message") != null && document.getElementById("tablestandings") != null) {
			var table = document.createElement('table');
			table.className="tablecontent03";
			table.cellspacing="1";
			table.cellpadding="2";
			table.border="0";
			table.style.fontSize="1em";
			table.innerHTML = document.getElementById("tablestandings").innerHTML;

			var jugFechaDate = new Date();
			var jugFechaDia = jugFechaDate.getDate().toString();
			if (jugFechaDia.length == 1) {
				jugFechaDia = "0" + jugFechaDia;
			}
			var jugFechaMes = (jugFechaDate.getMonth() + 1).toString();
			if (jugFechaMes.length == 1) {
				jugFechaMes = "0" + jugFechaMes;
			}
			var jugFecha = jugFechaDia + "." + jugFechaMes + ".";
			document.getElementById('titleMensajePuntuacion').value = 'SCRIPT - Puntuación - ' + jugFecha;
			document.getElementById("message").value = outerHTML(table);
		}
	}
}

if (window.location.href.indexOf("lineup.phtml") != -1) {
	if (unsafeWindow.loadOptions != null
			/*&& document.getElementById("playerstatus") != null*/) {
//			alert(unsafeWindow.$(".basic").html());
//			document.getElementById("playerstatus").innerHTML = '<span class="basic">SCRIPT BETA </span><span class="playerstatus">Player</span>';
		unsafeWindow.loadOptions();

		var fotoArray = new Array;
		var div = document.getElementById("lineup_bg");
		var selects = document.getElementsByTagName("select");
		for( var i=0; i<selects.length; i++ ){
			selects[i].onchange = function() {
				var jugadores = div.getElementsByTagName("option");
				var repeat = false;
				for( var j=0; j<jugadores.length; j++ ){
					var titulo = jugadores[j].title;
					var value = jugadores[j].value;
					if (titulo.indexOf('tradablePhoto.phtml') == -1) {
						fotoArray[value] = titulo;
					} else {
						repeat = true;
					}
				}
				if (repeat) {
					for( var j=0; j<jugadores.length; j++ ){
						var titulo = jugadores[j].title;
						var value = jugadores[j].value;
						if (titulo.indexOf('tradablePhoto.phtml') != -1) {
							jugadores[j].title = fotoArray[value];
						}
					}
					unsafeWindow.loadOptions();
				}
			}
		}
	}
}


//if (window.location.href.indexOf( "administration.phtml?penalty" ) != -1) {
//	
//}

//PUNTOS
function getPuntosColor(puntosStr) {
//	-8=color:#F44;
//	-2=color:#FCC;
//	 2=color:#FF0;
//	 5=color:#AF0;
//	 6=color:#AF0;
//	 7=color:#AF0;
//	 9=color:#7F0;
//	10=color:#7F0;
//	11=color:#7F0;
//	13=color:#3F0;
//	14=color:#3F0;
//	18=color:#3F0;
	var colorStyle = '';

	var puntos = parseInt(puntosStr);
    if(isNaN(puntos)){
        return puntosStr;
    }
	if (puntos > 12) {
		colorStyle = 'style="color:#103710;font-weight: bold;"';
	} else if (puntos > 8) {
		colorStyle = 'style="color:#284221;font-weight: bold;"';
	} else if (puntos > 4) {
		colorStyle = 'style="color:#3F5B34;font-weight: bold;"';
	} else if (puntos > 0) {
		colorStyle = 'style="color:#A68B0C;font-weight: bold;"';
	} else if (puntos == 0) {
		colorStyle = '';
	} else if (puntos >= -4) {
		colorStyle = 'style="color:#F03C3C;font-weight: bold;"';
	} else {//if (puntos >= -8) {
		colorStyle = 'style="color:#F44;font-weight: bold;"';
	}
	
	var puntosSpan = '<span ' + colorStyle + '>' + puntos + '</span>';
	return puntosSpan;
}



///ANALITICS
var _googleInterval;
function addGoogleTracking()
{
	var sc = document.createElement('script');
	sc.type = 'text/javascript';
	sc.src = 'http://www.google-analytics.com/ga.js';
	document.getElementsByTagName("head").item(0).appendChild(sc);
	window.addEventListener('load', function(event) {
		_googleInterval = setInterval(activateGoogle,250);
	});
}
function activateGoogle()
{
	var _gat =  unsafeWindow["_gat"];
	if(typeof _gat != 'undefined') 
	{
		clearInterval(_googleInterval);
		var pageTracker = _gat._getTracker("UA-34458413-1");
		pageTracker._setCustomVar(
			      1,                   // Required - This custom var is set to slot #1
			      "Version",           // Required - The top-level name for your online content categories
			      version,  // Required - Sets the value of "Section" to "Life & Style" for this particular article
			      1                    // Optional - Sets the scope to page-level
			   );
		pageTracker._setCustomVar(
			      2,                   // Required - This custom var is set to slot #1
			      "ComUser",           // Required - The top-level name for your online content categories
			      comUser,  // Required - Sets the value of "Section" to "Life & Style" for this particular article
			      1                    // Optional - Sets the scope to page-level
			   );
		pageTracker._initData();
		pageTracker._trackPageview();
	}
}
addGoogleTracking();
