// ==UserScript==
// @name           MUHelper
// @version        0.1.4
// @namespace      http://megaupload.com
// @include        http://*megaupload.com/*
// @include        http://*megaporn.com/*
// ==/UserScript==

/*
	if you're getting an annoying message saying that the script couldn't close the window, you should do the following:
	- Open a new tab.
	- Navigate to the address "about:config".
	- Click on the button "I'll be careful, I promise".
	- Type "dom.allow_scripts_to_close_windows" on the filter
	- Double-Click the Item that will appear on the list to change its value to "true"
	- Close the tab


	By default, the firefox will only allow you to open 20 popups of the script.
	If you need more, type about:config in the address bar of you firefox,
	find the "dom.popup_maximum" property, double click it and change to a higher value.

*/
var debug = false;
var versao = "0.1.4";

//window.alert = function(a) {
//	document.body.appendChild(document.createTextNode(a));
//	document.body.appendChild(document.createElement("br"));
//};

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    var startPos = this.length - suffix.length;
    if (startPos < 0) {
      return false;
    }
    return (this.lastIndexOf(suffix, startPos) == startPos);
  };
}

window.gup = function(name)
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null ) {
		  return "";
	  } else {
		  return results[1];
	  }
	};

var arrLinks = eval("[[],[]]");
var lbl;

function carregaLinks() {
	arrLinks = eval(GM_getValue("MULinks","[[],[]]"));
}

function salvaLinks() {
	GM_setValue("MULinks",uneval(arrLinks));
}

function preencheListBox() {
	if (arrLinks[0].length == 0)
	{
		lbl.size = 3;
		lbl.options.length = 0;
		lbl.options[0] = new Option("There is no link added");
	} else {
		if (arrLinks[0].length < 10)
		{
			lbl.size = 10;
		} else if (arrLinks[0].length > 20)
		{
			lbl.size = 20;
		} else {
			lbl.size = arrLinks[0].length;
		}
		var selectedValues = new Array();
		for (var iter=0; iter<lbl.options.length; iter++) {
			if (lbl.options[iter].selected) {
				selectedValues.push(lbl.options[iter].value);
			}
		}
		lbl.options.length = 0;
		for (var iter = 0; iter < arrLinks[0].length; iter++)
		{
			var opt = new Option(arrLinks[1][iter],arrLinks[0][iter]);
			lbl.options.add(opt);
		}
		for (var iter=0; iter<lbl.options.length; iter++) {
			if (selectedValues.indexOf(lbl.options[iter].value) >= 0) {
				lbl.options[iter].selected = true;
			}
		}
	}
}

var janela;
var bStartDownload = false;
var taDebug;
var idTimeoutExecutaPrincipal;
var idTimeoutVerificaJanela;
var idIntervalVerificaPaginaMegaporn;

function executaPrincipal(){
	if (!bStartDownload)
	{
		return;
	}
	if (arrLinks[0].length == 0)
	{
		setTimeout(executaPrincipal, 500);
	} else {
		GM_setValue("controleLinkMegaporn", "0"); //possiveis valores: 0 - não existe link do megaporn aberto, 1 - link do megaporn aberto e esperando confirmação de download, 2 - confirmado download do megaporn, -1 - redirecionado para http://www.megaporn.com/?c=premium&l=1
		if (idIntervalVerificaPaginaMegaporn)
		{
			clearInterval(idIntervalVerificaPaginaMegaporn);
		}
		if (idTimeoutVerificaJanela)
		{
			clearTimeout(idTimeoutVerificaJanela);
		}
		if (janela && !janela.closed)
		{
			janela.close();
		}
		if (lbl.options[0].value.indexOf("megaporn.com"))
		{
			GM_setValue("controleLinkMegaporn", "1");

			janela = window.open(lbl.options[0].value + "&miliControleMUDownloader=" + GM_getValue("milissigundosControlePaginaMegaporn", "0"));
		} else {
			janela = window.open(lbl.options[0].value);
		}
		if (!janela)
		{
			document.getElementById("btStartMUHelper").click();
			alert("(MegaUpload Downloader) The script won't work if the popup blocker is enabled. Please allow the domain 'megaupload.com' to open popups.\nIf you have already allowed the popups and are still receiving errors, you need to change the maximum popups that firefox allow by domain. Read the comment on the beginning of the script.");
			return;
		}
		if (idTimeoutExecutaPrincipal)
		{
			clearTimeout(idTimeoutExecutaPrincipal);
		}
		idTimeoutExecutaPrincipal = setTimeout(executaPrincipal, 300000);
		idTimeoutVerificaJanela = setTimeout(verificaJanelaDownload, 100);
	}
}


function logDebug(msgDebug) {
	var dataDebug = new Date();
	taDebug.value += "\n" + dataDebug.getHours() + ":" + dataDebug.getMinutes() + ":" + dataDebug.getSeconds() + " - " + msgDebug;
}

function verificaJanelaDownloadMegaporn() {
	if (document.title.indexOf("MU | ") < 0 ||
		(document.body.innerHTML.indexOf("Success! Downloading...") < 0 && 
		document.body.innerHTML.indexOf("You can automatically download this file without captcha or waiting!") < 0))
	{
		if (location.href.indexOf("megaporn.com/") > 0 && location.href.indexOf("c=premium") > 0)
		{
			GM_setValue("controleLinkMegaporn", "-1");
			location.href = "http://www.megaupload.com/?c=premium&l=1";
		} else {
			setTimeout(verificaJanelaDownloadMegaporn, 1000);
		}
	} else 
	{
		setTimeout(function() {
			if (!window.closed && 
				(document.body.innerHTML.indexOf("Success! Downloading...") > 0 || 
				document.body.innerHTML.indexOf("You can automatically download this file without captcha or waiting!") > 0))
			{
				GM_setValue("controleLinkMegaporn", "2");
			} else  {
				setTimeout(verificaJanelaDownloadMegaporn, 1000);
			}
		}, 15000);
	}
}

function verificaJanelaDownload() {
	try
	{
		if (debug)
		{
			logDebug("verificaJanelaDownload|"+(janela?"Existe Janela|":"Não Existe Janela|")+(janela.closed?"Janela Fechada|":"Janela Aberta|")+"titulo:'" + janela.window.document.title + "'|");
		}
		if (janela && !janela.closed)
		{
			if (GM_getValue("controleLinkMegaporn", "0") == "1")
			{
				idIntervalVerificaPaginaMegaporn = setInterval(function () {
					if (GM_getValue("controleLinkMegaporn", "0") == "2" && janela && !janela.closed)
					{
						clearInterval(idIntervalVerificaPaginaMegaporn);
						janela.close();
						carregaLinks();
						arrLinks[0].splice(0,1);
						arrLinks[1].splice(0,1);
						salvaLinks();
						preencheListBox();
						if (idTimeoutExecutaPrincipal)
						{
							clearTimeout(idTimeoutExecutaPrincipal);
						}
						executaPrincipal();
					} else if (GM_getValue("controleLinkMegaporn", "0") == "-1")
					{
						clearInterval(idIntervalVerificaPaginaMegaporn);
						idTimeoutVerificaJanela = setTimeout(verificaJanelaDownload, 1000);
					} else if (!janela || janela.closed)
					{
						clearInterval(idIntervalVerificaPaginaMegaporn);
						if (idTimeoutExecutaPrincipal)
						{
							clearTimeout(idTimeoutExecutaPrincipal);
						}
						executaPrincipal();
					} else if (GM_getValue("controleLinkMegaporn", "0") == "0")
					{
						clearInterval(idIntervalVerificaPaginaMegaporn);
					}
				}, 1000);
			}
			else if (janela.window.document.title.indexOf("MU | ") < 0 ||
				(janela.window.document.body.innerHTML.indexOf("Success! Downloading...") < 0 && 
				janela.window.document.body.innerHTML.indexOf("You can automatically download this file without captcha or waiting!") < 0))
			{
				if (janela.window.location.href.indexOf("c=premium") > 0)
				{
					if (idTimeoutExecutaPrincipal)
					{
						clearTimeout(idTimeoutExecutaPrincipal);
					}
					var rndNumb = Math.floor((600000-180000)*Math.random()) + 240000;
					var time = Math.floor(rndNumb / 1000);
					idTimeoutExecutaPrincipal = setTimeout(executaPrincipal, rndNumb);
					window.s = setInterval(function() {
						if (janela.window.location.href.indexOf("c=premium") > 0)
						{
							if(--time > 0) {
								if (janela && !janela.closed)
								{
									janela.window.document.title = "Trying again in " + time + " seconds.";
								}
							}
							else {
								clearInterval(s);
							}
						} else {
							clearInterval(s);
						}
					}, 1000);
				} else {
					idTimeoutVerificaJanela = setTimeout(verificaJanelaDownload, 1000);
				}
			} else 
			{
				setTimeout(function() {
					if (janela && !janela.closed && janela.window.location.href == lbl.options[0].value)
					{
						janela.window.close();
						carregaLinks();
						arrLinks[0].splice(0,1);
						arrLinks[1].splice(0,1);
						salvaLinks();
						preencheListBox();
						executaPrincipal();
					} else {
						idTimeoutVerificaJanela = setTimeout(verificaJanelaDownload, 1000);
					}
				}, 15000);
			}
		} else {
			setTimeout(executaPrincipal,1000);
		}
	}
	catch (e)
	{
		if (debug)
		{
			logDebug(e);
		}
		idTimeoutVerificaJanela = setTimeout(verificaJanelaDownload, 1000);
	}
}

function pegaLinkENomeArquivo() {
	if (document.title.indexOf("MU | ") >= 0)
	{
		var link = location.href;
		if (link.indexOf("&miliControleMUDownloader=") > 0)
		{
			link = link.substring(0, link.indexOf("&miliControleMUDownloader="));
		}
		var nomeArquivo = document.title.substring(5);
		carregaLinks();
		if (arrLinks[0].indexOf(link) >= 0)
		{
			alert("(MegaUpload Downloader) This file is already in your list");
		} else {
			arrLinks[0].push(link);
			arrLinks[1].push(nomeArquivo);
			salvaLinks();
			window.close();
			setTimeout("alert('(MegaUpload Downloader) I couldn't close this window.\n Read the comment on the beginning of the script.')", 5000);
		}
	} else {
		setTimeout(pegaLinkENomeArquivo, 100);
	}
}

function setDataControle() {
	GM_setValue("dataControlePaginalPrincipal", uneval(new Date()));
	if (GM_getValue("trazPraFrente", "nao") == "sim")
	{
		window.focus();
		GM_setValue("trazPraFrente", "nao");
	}
	setTimeout(setDataControle, 500);
}

function setDataControleAtualizacao() {
	GM_setValue("dataControleAtualizacao", uneval(new Date()));
}

function pegaMetaScript(scriptID, meta, variavel, nomeScript) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://userscripts.org/scripts/source/" + scriptID + ".meta.js",
		onload: function(xhr) {
			var texto = xhr.responseText;
			if (texto.indexOf(meta) > 0)
			{
				GM_setValue(variavel, texto.match(new RegExp("// " + meta + "\\s*(\\S*)"))[1]);
			} else {
				alert("(MegaUpload Downloader) An error ocurred when getting information about the '" + nomeScript + "' script.");
			}
		},
		onerror: function(xhr) {
			alert("(MegaUpload Downloader) An error ocurred when getting information about the '" + nomeScript + "' script.");
		}
	});
}

function verificaVersaoMUAFC() {
	if (GM_getValue("usoVersionMUAFC", "0") == "0")
	{
		if (confirm("(MegaUpload Downloader) Do you already have the 'Megaupload auto-fill captcha++' script installed? (Note that this 'MegaUpload Downloader' script needs it to work properly.)\n" +
					"If you don't have it, you will be promped to install it"))
		{
			pegaMetaScript("56989", "@uso:version", "usoVersionMUAFC", "Megaupload auto-fill captcha++");
		} else {
			GM_openInTab("http://userscripts.org/scripts/source/56989.user.js");
			pegaMetaScript("56989", "@uso:version", "usoVersionMUAFC", "Megaupload auto-fill captcha++");
		}
	} else {
		GM_setValue("tempVersionMUAFC", "-1");
		pegaMetaScript("56989", "@uso:version", "tempVersionMUAFC", "Megaupload auto-fill captcha++");
		var idInterval = setInterval(function() {
			if (GM_getValue("tempVersionMUAFC", "-1") != "-1")
			{
				clearInterval(idInterval);
				if (GM_getValue("tempVersionMUAFC", "-1") != GM_getValue("usoVersionMUAFC", "0") && confirm("(MegaUpload Downloader) There's a new version of the 'Megaupload auto-fill captcha++' script. Do you want to update it now?"))
				{
					GM_openInTab("http://userscripts.org/scripts/source/56989.user.js");
					pegaMetaScript("56989", "@uso:version", "usoVersionMUAFC", "Megaupload auto-fill captcha++");
				}
			}
		}, 500);
	}
}

function verificaVersaoScript() {
	GM_setValue("tempVersionScript", "-1");
	pegaMetaScript("61436", "@version", "tempVersionScript", "MegaUpload Downloader");
	var idInterval = setInterval(function() {
		if (GM_getValue("tempVersionScript", "-1") != "-1")
		{
			clearInterval(idInterval);
			if (GM_getValue("tempVersionScript", "-1") != versao && confirm("(MegaUpload Downloader) There's a new version of the 'MegaUpload Downloader' script. Do you want to update it now?"))
			{
				GM_openInTab("http://userscripts.org/scripts/source/61436.user.js");
				window.close();
			}
		}
	}, 500);
}

function verificaAtualizacaoScripts() {
	var milisAtualizacaoGravado = eval(GM_getValue("dataControleAtualizacao", "(new Date(100))")).getTime();
	var milisAtual = (new Date()).getTime();
	if (milisAtual - milisAtualizacaoGravado >= 10800000)
	{
		setTimeout(verificaVersaoMUAFC,100);
		setTimeout(verificaVersaoScript,100);
		setDataControleAtualizacao();
	}
}

function verificaMainPageAberta() {
	var milisGravado = eval(GM_getValue("dataControlePaginalPrincipal", "(new Date(100))")).getTime();
	var milisAtual = (new Date()).getTime();
	while (milisAtual - milisGravado <= 2000)
	{
		if (confirm("(MegaUpload Downloader) There's another 'Megaupload Downloader' window opened.\nIf you've closed it in the last two seconds, press Ok to try again.\nOtherwise, press Cancel to go to the other 'Megaupload Downloader' window."))
		{
			milisGravado = eval(GM_getValue("dataControlePaginalPrincipal", "(new Date(100))")).getTime();
			milisAtual = (new Date()).getTime();
		} else {
			GM_setValue("trazPraFrente", "sim");
			window.close();
			return true;
		}
	}
	GM_setValue("trazPraFrente", "nao");
	return false;
}

if (location.href.endsWith("megaupload.com/"))
{
	if (verificaMainPageAberta())
	{
		return;
	}
	verificaAtualizacaoScripts();
	GM_setValue("milissigundosControlePaginaMegaporn", (new Date()).getTime() + ''); // variável que irá ser passada como parâmetro para a página do megaporn indicando se a mesma foi aberta pelo downloader
	setDataControle();
	var elFieldset = document.createElement("fieldset");
	elFieldset.style.width = "330px";
	var elLegend = document.createElement("legend");
	elLegend.innerHTML = "MegaUpload Downloader";
	elFieldset.appendChild(elLegend);
	var elCenter = document.createElement("center");
	var elSpan = document.createElement("span");
	var elBold = document.createElement("b");
	elBold.innerHTML = "Link List: ";
	var element = document.createElement("select");
	element.setAttribute("id", "lbLinks");
	element.setAttribute("size", "10");
	element.setAttribute("multiple", "multiple");
	elSpan.appendChild(elBold);
	elFieldset.appendChild(elSpan);
	elFieldset.appendChild(document.createElement("br"));
	elFieldset.appendChild(element);
	elFieldset.appendChild(document.createElement("br"));

	var btStart = document.createElement("input");
	btStart.type = "button";
	btStart.id = "btStartMUHelper";
	btStart.value = "Start Automatic Download";
	btStart.addEventListener("click",function(){
		bStartDownload = !bStartDownload;
		if (bStartDownload)
		{	
			idTimeoutExecutaPrincipal = setTimeout(executaPrincipal, 100);
			document.getElementById("btStartMUHelper").value = "Stop Automatic Download";
		} else {
			if (idTimeoutVerificaJanela)
			{
				clearTimeout(idTimeoutVerificaJanela);
			}
			if (idTimeoutExecutaPrincipal)
			{
				clearTimeout(idTimeoutExecutaPrincipal);
			}
			GM_setValue("controleLinkMegaporn", "0");
			document.getElementById("btStartMUHelper").value = "Start Automatic Download";
		}
	},false);
	var btDelete = document.createElement("input");
	btDelete.type = "button";
	btDelete.id = "btDeleteSelectedLinks";
	btDelete.value = "Delete Selected";
	btDelete.addEventListener("click",function(){
		var selectedValues = new Array();
		for (var iter=0; iter<lbl.options.length; iter++) {
			if (lbl.options[iter].selected) {
				selectedValues.push(lbl.options[iter].value);
			}
		}
		if (arrLinks[0].length > 0)
		{
			if (lbl.options[0].selected && bStartDownload)
			{
				alert("(MegaUpload Downloader) You can't remove the file " + lbl.options[0].text + " as I'm already trying to download it.\n Stop the Automatic Download and try again.");
			} else {
				carregaLinks();
				for (var iter=0; iter<selectedValues.length; iter++) {
					if (arrLinks[0].indexOf(selectedValues[iter]) >= 0) {
						arrLinks[1].splice(arrLinks[0].indexOf(selectedValues[iter]),1);
						arrLinks[0].splice(arrLinks[0].indexOf(selectedValues[iter]),1);
					}
				}
				salvaLinks();
				preencheListBox();
			}
			
		}
	},false);
	elFieldset.appendChild(btStart);
	elFieldset.appendChild(btDelete);
	if (debug)
	{
		var eTaDebug = document.createElement("textarea");
		eTaDebug.rows = 7;
		eTaDebug.cols = 100;
		eTaDebug.id = "taDebug";
		elFieldset.appendChild(document.createElement("br"));
		elFieldset.appendChild(document.createElement("br"));
		elFieldset.appendChild(document.createElement("br"));
		elFieldset.appendChild(eTaDebug);
	}
	elCenter.appendChild(elFieldset);
	elCenter.appendChild(document.createElement("br"));
	elCenter.appendChild(document.createElement("br"));
	if (document.getElementById("tabs"))
	{
		document.getElementById("tabs").parentNode.insertBefore(elCenter, document.getElementById("tabs"));
	} else {
		document.body.appendChild(elCenter);
	}
	lbl = document.getElementById("lbLinks");
	if (debug) {
		taDebug = document.getElementById("taDebug");
	}
	carregaLinks();
	preencheListBox();
	setInterval(function() {
		carregaLinks();
		preencheListBox();
	}, 5000);
} else if (/[&?]d=/.test(location.href))
{
	try
	{
		if (!(window.opener && window.opener.location.href.endsWith("megaupload.com/")))
		{
			if (location.href.indexOf("megaporn.com/") > 0 && ((location.href.indexOf("&miliControleMUDownloader=") > 0 && gup("miliControleMUDownloader") == GM_getValue("milissigundosControlePaginaMegaporn", "0"))))
			{
				setTimeout(verificaJanelaDownloadMegaporn, 100);
			} else {
				var milisGravado = eval(GM_getValue("dataControlePaginalPrincipal", "(new Date(100))")).getTime();
				var milisAtual = (new Date()).getTime();
				if (milisAtual - milisGravado <= 10000)
				{
					pegaLinkENomeArquivo();
				}
			}
		}
	}
	catch (e)
	{
		if (location.href.indexOf("megaporn.com/") > 0 && ((location.href.indexOf("&miliControleMUDownloader=") > 0 && gup("miliControleMUDownloader") == GM_getValue("milissigundosControlePaginaMegaporn", "0"))))
		{
			setTimeout(verificaJanelaDownloadMegaporn, 100);
		} else {
			var milisGravado = eval(GM_getValue("dataControlePaginalPrincipal", "(new Date(100))")).getTime();
			var milisAtual = (new Date()).getTime();
			if (milisAtual - milisGravado <= 10000)
			{
				pegaLinkENomeArquivo();
			}
		}
	}
} else {
	var milisGravado = eval(GM_getValue("dataControlePaginalPrincipal", "(new Date(100))")).getTime();
	var milisAtual = (new Date()).getTime();
	if (milisAtual - milisGravado <= 10000)
	{
		if (location.href.indexOf("megaporn.com/") > 0 && location.href.indexOf("c=premium") > 0)
		{
			setTimeout(verificaJanelaDownloadMegaporn, 100);
		}
	}
}
