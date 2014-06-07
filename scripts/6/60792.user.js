// ==UserScript==
// @name           PRUEBA-NO USAR - TEST-NOT USE
// @namespace      JUAMPI_MIX
// @description    Script de prueba, no usar  -  Script test, not use
// @include        *
// @author         Juampi_Mix
// @version        2.0

// ==/UserScript==

function autoUpdate (id, version){
	function eliminaElem(e){if(e)e.parentNode.removeChild(e)}
	function addGlobalStyle(css){var head,style;head=document.getElementsByTagName('head')[0];style=document.createElement('style');style.type='text/css';style.innerHTML=css;head.appendChild(style)}
	function trim(cad){return cad.replace(/^\s+|\s+$/g,"")}
	
	function menuCommand (){
		GM_registerMenuCommand ("Turn auto-updater on",
								function (){
									GM_setValue ("update", new Date ().getTime ().toString () + "#1");
								});
	}
	
	function showMessage (){
		addGlobalStyle (
			"#autoUpdater_capaAutopUpdate {" +
				"position: absolute;" +
				"left: 20px;" +
				"width: 280px;" +
				"background-color: #1B3ADE;" +
				"padding: 7px;" +
				"font-family: Calibri;" +
				"font-size: 14px;" +
				"-moz-border-radius: 5px;" +
				"border: solid thin #A9F7EB;" +
				"z-index: 100" +
			"}"
		);
	
		var t;
		
		function move2 (capa){
			if (capa.style.left == "-301px"){
				clearTimeout (t);
				eliminaElem (capa);
			}else{
				capa.style.left = parseInt (capa.style.left) - 3 + "px";
				t = setTimeout (function (){ move2 (capa); }, 20);
			}
		}
		
		function move (capa){
			if (capa.style.top == "20px"){
				clearTimeout (t);
				t = setTimeout (function (){ move2 (capa); }, 5000);
			}else{
				capa.style.top = parseInt (capa.style.top) + 1 + "px";
				t = setTimeout (function (){ move (capa); }, 20);
			}
		}
		
		var capa = document.createElement ("div");
		capa.id = "autoUpdater_capaAutopUpdate";
		capa.innerHTML = "<img style='float: left; position: relative; top: 1px;' src='data:image/png;base64,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'/>" +
						 "<span style='cursor: default; text-align: center;'>Usted puede desactivar la función de actualización en el comando de menú de Greasemonkey.</span>";

		document.getElementsByTagName ("body")[0].appendChild (capa);
		
		capa.style.top = "-50px";
		capa.style.left = "20px";
		move (capa);
	}
	
	var ms = new Date ().getTime ();
	
	var update = GM_getValue ("update");
	var search = false;
	var days;
	
	if (update == undefined){
		search = true;
		
		//Por defecto busca actualizaciones cada 1 día.
		GM_setValue ("update", (24*60*60*1000 + ms).toString () + "#1");
		days = 1;
	}else{
		days = parseInt (update.split ("#")[1]);
		if (days != 0){
			var next_ms = update.split ("#")[0];
			if (ms >= parseInt (next_ms)){
				search = true;
				
				GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
			}
		}else{
			//Registro de comando del menú
			menuCommand ();
		}
	}

	if (!search) return;
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: "http://userscripts.org/scripts/show/" + id,
		headers: {
					"User-agent": "Mozilla/5.0",
					"Accept": "text/html",
				 },
		onload: function (respuesta){
			var userScripts = document.implementation.createDocument ("", "", null);
			var html = document.createElement ("html");
			html.innerHTML = respuesta.responseText;
			userScripts.appendChild (html);
			
			//Obtener la versión nueva
			var newVersion = userScripts.getElementById ("summary").getElementsByTagName ("b")[1].nextSibling.textContent;
			
			//Obtener el nombre del script
			var name = userScripts.getElementById ("details").childNodes[1].innerHTML;
			
			if (trim (newVersion) != trim (version)){
				//Hay una nueva versión
				addGlobalStyle (
					"#autoUpdater_divVersion { text-align: left; height: 140px; position: fixed; top: 10px; left: 10px; background: #EEE; border: solid thin #C7C7C7; padding: 8px; font-family: Calibri; font-size: 14px; -moz-border-radius: 5px; cursor: default; z-Index: 100;}" +
					"#autoUpdater_imgVersion { position: relative; top: 4px; margin-right: 5px; }" +
					"#autoUpdater_install { position: absolute; top: 45px; right: 8px; width: 75px; padding: 5px; border: 1px solid #DEDEDE; background-color: #F5F5F5; color: #565656; text-decoration: none; cursor: pointer; }" +
					"#autoUpdater_install img { padding: 0; margin: 0 2px 0 2px; position: relative; top: 2px; right: 4px; }" +
					"#autoUpdater_install span { position: relative; bottom: 1px; }" +
					"#autoUpdater_cancel { position: absolute; bottom: 8px; width: 75px; right: 8px; padding: 5px; border: 1px solid #DEDEDE; background-color: #F5F5F5; color: #565656; text-decoration: none; cursor: pointer; }" +
					"#autoUpdater_cancel img { padding: 0; margin: 0 2px 0 2px; position: relative; top: 2px; right: 4px; }" +
					"#autoUpdater_cancel span { position: relative; bottom: 1px;}" +
					"#autoUpdater_currentVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_newVersion { color: #373737; width: 105px; }" +
					"#autoUpdater_versionTitle { color: #373737; }" +
					"#autoUpdater_numCurrentVersion { color: #232323; }" +
					"#autoUpdater_numNewVersion { color: #232323; }" +
					"#autoUpdater_text1 { font-size: 14px; color: #373737; position: absolute; bottom: 48px; }" +
					"#autoUpdater_text2 { font-size: 11px; color: #373737; position: absolute; bottom: 34px; left: 8px; }" +
					"#autoUpdater_text3 { font-size: 14px; color: #373737; position: absolute; bottom: 8px; left: 42px; }" +
					"#autoUpdater_input { font-family: Calibri; font-size: 14px; background: #FFF; border: solid thin #232323; color: #232323; width: 23px; height: 15px; position: absolute; bottom: 8px;}" +
					"#autoUpdater_table { border-spacing: 0 0; }" +
					"#autoUpdater_table td { font-family: Calibri; font-size: 14px; }" +
					"#autoUpdater_linkScript { font-family: Calibri; font-size: 14px; color: #000099; text-decoration: none; }"
				);
				
				var capa = document.createElement ("div");
				capa.setAttribute ("id", "autoUpdater_divVersion");
				capa.innerHTML = "<img id='autoUpdater_imgVersion' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKcSURBVDjLpZPLa9RXHMU/d0ysZEwmMQqZiTaP0agoaKGJUiwIxU0hUjtUQaIuXHSVbRVc+R8ICj5WvrCldJquhVqalIbOohuZxjDVxDSP0RgzyST9zdzvvffrQkh8tBs9yy9fPhw45xhV5X1U8+Yhc3U0LcEdVxdOVq20OA0ooQjhpnfhzuDZTx6++m9edfDFlZGMtXKxI6HJnrZGGtauAWAhcgwVnnB/enkGo/25859l3wIcvpzP2EhuHNpWF9/dWs/UnKW4EOGDkqhbQyqxjsKzMgM/P1ymhlO5C4ezK4DeS/c7RdzQoa3x1PaWenJjJZwT9rQ1gSp/js1jYoZdyfX8M1/mp7uFaTR8mrt29FEMQILr62jQ1I5kA8OF59jIItVA78dJertTiBNs1ZKfLNG+MUHX1oaURtIHEAOw3p/Y197MWHEJEUGCxwfHj8MTZIcnsGKxzrIURYzPLnJgbxvG2hMrKdjItjbV11CYKeG8R7ygIdB3sBMFhkem0RAAQ3Fuka7UZtRHrasOqhYNilOwrkrwnhCU/ON5/q04vHV48ThxOCuoAbxnBQB+am65QnO8FqMxNCjBe14mpHhxBBGCWBLxD3iyWMaYMLUKsO7WYH6Stk1xCAGccmR/Ozs/bKJuXS39R/YgIjgROloSDA39Deit1SZWotsjD8pfp5ONqZ6uTfyWn+T7X0f59t5fqDhUA4ry0fYtjJcWeZQvTBu4/VqRuk9/l9Fy5cbnX+6Od26s58HjWWaflwkusKGxjm1bmhkvLXHvh1+WMbWncgPfZN+qcvex6xnUXkzvSiYP7EvTvH4toDxdqDD4+ygT+cKMMbH+3MCZ7H9uAaDnqytpVX8cDScJlRY0YIwpAjcNcuePgXP/P6Z30QuoP4J7WbYhuQAAAABJRU5ErkJggg=='/><span id='autoUpdater_versionTitle'>Nueva version disponible para <a id='autoUpdater_linkScript' target='_blank' href='http://userscripts.org/scripts/show/" + id + "'><b><u>" + name + "</u></b></a>!</span>" +
								 "<br/><hr/>" +
								 "<table id='autoUpdater_table'>" +
									"<tr><td id='autoUpdater_currentVersion'>Version Instalada:</td><td id='autoUpdater_numCurrentVersion'><b>" + version + "</b></td></tr>" +
									"<tr><td id='autoUpdater_newVersion'>Version Actual:</td><td id='autoUpdater_numNewVersion'><b>" + newVersion + "</b></td></tr>" +
								 "</table>" +
								 "<a id='autoUpdater_install' title='Instalar nueva version'><center><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII=' alt='Install script'/><span><b>Instalar</b></span></center></a>" +
								 "<a id='autoUpdater_cancel' title='Cancelar Actualizacion'><center><img src='data:image/png;base64,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' alt='Cancel'/><span><b>Cancelar</b></span></center></a>" +
								 "<span id='autoUpdater_text1'>Buscar actualizaciones cada:</span><br/>" +
								 "<span id='autoUpdater_text2'>(0 para desactivar, max. 90)</span>" +
								 "<input id='autoUpdater_input' type='text' value='" + days + "'/><span id='autoUpdater_text3'>dia/s.</span>";
				
				document.getElementsByTagName ("body")[0].appendChild (capa);
				
				var ok = true;
				
				function install1 (){
					var days = parseInt (document.getElementById ("autoUpdater_input").value);
					var ms = new Date ().getTime ();
					
					if (ok){
						if (days == 0){
							GM_setValue ("update", "#0");
							
							menuCommand ();
							showMessage ();
						}else{
							GM_setValue ("update", (days*24*60*60*1000 + ms).toString () + "#" + days);
						}
						
						window.open ("http://userscripts.org/scripts/source/" + id + ".user.js", "_self");
						eliminaElem (document.getElementById ("autoUpdater_divVersion"));
					}
				}
				
				function install2 (install){
					install.style.background = "#E6EFC2";
					install.style.borderColor = "#C6D880";
					install.style.color = "#529214";
				}
				
				function install3 (install){
					install.style.background = "#F5F5F5";
					install.style.borderColor = "#DEDEDE";
					install.style.color = "#565656";
				}
				
				function install4 (install){
					install.style.background = "#529214";
					install.style.borderColor = "#529214";
					install.style.color = "#FFF";
				}
				
				function cancel1 (){
					if (document.getElementById ("autoUpdater_input").value == "0"){
						GM_setValue ("update", "#0");
						
						menuCommand ();
						showMessage ();
					}
					
					GM_setValue ("update", "0#" + GM_getValue ("update").split ("#")[1]);
					eliminaElem (document.getElementById ("autoUpdater_divVersion"));
				}
				
				function cancel2 (cancel){
					cancel.style.background = "#FBE3E4";
					cancel.style.borderColor = "#FFD3D5";
					cancel.style.color = "#D12F19";
				}
				
				function cancel3 (cancel){
					cancel.style.background = "#F5F5F5";
					cancel.style.borderColor = "#DEDEDE";
					cancel.style.color = "#565656";
				}
				
				function cancel4 (cancel){
					cancel.style.background = "#D12F19";
					cancel.style.borderColor = "#D12F19";
					cancel.style.color = "#FFF";
				}
				
				function input (text){
					if (text.value == "" || isNaN (text.value) || parseInt (text.value) < 0 || parseInt (text.value) > 90){
						text.style.border = "solid thin #FFB9BB";
						text.style.backgroundColor = "#FBE3E4";
						ok = false;
					}else{
						text.style.border = "solid thin #232323";
						text.style.backgroundColor = "#FFF";
						ok = true;
					}
				}
				
				//instalar
				var listener = document.getElementById ("autoUpdater_install");
				listener.addEventListener ("click", install1, false);
				listener.addEventListener ("mouseover", function (){ install2 (this); }, false);
				listener.addEventListener ("mouseout", function (){ install3 (this); }, false);
				listener.addEventListener ("mousedown", function (){ install4 (this); }, false);
				listener.addEventListener ("mouseup", function (){ install2 (this); }, false);
				
				//cancelar
				listener = document.getElementById ("autoUpdater_cancel");
				listener.addEventListener ("click", cancel1, false);
				listener.addEventListener ("mouseover", function (){ cancel2 (this); }, false);
				listener.addEventListener ("mouseout", function (){ cancel3 (this); }, false);
				listener.addEventListener ("mousedown", function (){ cancel4 (this); }, false);
				listener.addEventListener ("mouseup", function (){ cancel2 (this); }, false);
				
				//entrada
				listener = document.getElementById ("autoUpdater_input");
				listener.addEventListener ("keyup", function (){ input (this); }, false);
			}
		}
	});
}