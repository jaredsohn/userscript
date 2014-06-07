// ==UserScript==
// @name           tempoAlcancarCompetidores
// @namespace      http://utopia.lv/
// @include        http://utopia.lv/exchange/?do=mmc_competitors
// ==/UserScript==


try
{
	for (var iterTabelas = 0; iterTabelas < document.getElementsByTagName("table").length; iterTabelas++)
	{
		var tabela = document.getElementsByTagName("table")[iterTabelas];
		var parser = new DOMParser();
		var milisDeHora=1000*60*60;
		var agora = new Date().getTime();
		var xmldoc = parser.parseFromString(GM_getValue("UtopiaHistoricoCompetidores", "<doc></doc>"), "text/xml");
		var xmlRoot = xmldoc.getElementsByTagName("doc")[0];
	//	var fazMaisDeUmaHora= false
	//	if (xmlRoot.getElementsByTagName("ultimaAtualizacao").length > 0)
	//	{
	//		if (agora - parseInt(xmlRoot.getElementsByTagName("ultimaAtualizacao")[0].getAttribute("milisegundos"))>=milisDeHora)
	//		{
	//			fazMaisDeUmaHora = true
	//		}
	//	} else {
	//		fazMaisDeUmaHora = true;
	//		var elementoUltimaAtualizacao = xmldoc.createElement("ultimaAtualizacao");
	//		xmlRoot.appendChild(elementoUltimaAtualizacao);
	//	}
	//	if (fazMaisDeUmaHora)
	//	{
		var competidores = new Array();
		var populacoes = new Array();
		var meuLinkNaTabela = "";
		var minhaPopulacaoNaTabela = "";
		for (var iter=1; iter<tabela.rows.length; iter++)
		{
			var row = tabela.rows[iter];
			if (row.className == "table_highlight")
			{
				meuLinkNaTabela = row.cells[1].innerHTML;
				minhaPopulacaoNaTabela = parseInt(row.cells[2].innerHTML);
			}
			competidores.push(row.cells[1].innerHTML);
			populacoes.push(parseInt(row.cells[2].innerHTML));
		}
		var cadastrarMinhaPop = false;
		var meuLink= xmlRoot.getElementsByTagName("link" + meuLinkNaTabela);
		if (meuLink.length == 0)
		{
			for (var iter = 0; iter < competidores.length; iter++)
			{
				var arrLinkCompetidor = xmlRoot.getElementsByTagName("link" + competidores[iter]);
				if (arrLinkCompetidor.length > 0)
				{
					var linkCompetidor = arrLinkCompetidor[0];
					if (linkCompetidor.getElementsByTagName("milis" + agora).length == 0)
					{
						var elementoPopulacao = xmldoc.createElement("milis" + agora);
						elementoPopulacao.setAttribute("populacao", populacoes[iter]);
						linkCompetidor.appendChild(elementoPopulacao);
						if (meuLinkNaTabela != competidores[iter])
						{
							tabela.rows[iter+1].cells[2].innerHTML += " (First prevision in 1H)";
						}
					}
				} else {
					var elementoCompetidor = xmldoc.createElement("link" + competidores[iter]);
					var elementoPopulacao = xmldoc.createElement("milis" + agora);
					elementoPopulacao.setAttribute("populacao", populacoes[iter]);
					elementoCompetidor.appendChild(elementoPopulacao);
					xmlRoot.appendChild(elementoCompetidor);
					if (meuLinkNaTabela != competidores[iter])
					{
						tabela.rows[iter+1].cells[2].innerHTML += " (First prevision in 1H)";
					}
				}
			}
		} else {
			meuLink = xmlRoot.getElementsByTagName("link" + meuLinkNaTabela)[0];
			for (var iter = 0; iter < competidores.length; iter++)
			{
				if (meuLinkNaTabela == competidores[iter])
				{
					continue;
				}
				var arrLinkCompetidor = xmlRoot.getElementsByTagName("link" + competidores[iter]);
				if (arrLinkCompetidor.length > 0)
				{
					var linkCompetidor = arrLinkCompetidor[0];
					var primeiroElementoPopulacao = linkCompetidor.childNodes[0];
					var achouMiliIgual = false
					for (var iter2 = 0; iter2 < meuLink.childNodes.length; iter2++)
					{
						for (var iter3 = 0; iter3 < linkCompetidor.childNodes.length; iter3++)
						{
							if (meuLink.childNodes[iter2].nodeName == linkCompetidor.childNodes[iter3].nodeName)
							{
								achouMiliIgual = true;
								primeiroElementoPopulacao = linkCompetidor.childNodes[iter3]
							}
						}
					}
					if (!achouMiliIgual)
					{
						var elementoPopulacao = xmldoc.createElement("milis" + agora);
						elementoPopulacao.setAttribute("populacao", populacoes[iter]);
						linkCompetidor.appendChild(elementoPopulacao);
						cadastrarMinhaPop = true;
						tabela.rows[iter+1].cells[2].innerHTML += " (First prevision in 1H)";
						continue;
					}
					var nomePrimeiroElementoPopulacao = primeiroElementoPopulacao.nodeName;
					var valorPrimeiroElementoPopulacao = parseInt(primeiroElementoPopulacao.getAttribute("populacao"));
					var miliDif = agora - parseInt(nomePrimeiroElementoPopulacao.substring(5));
					if (miliDif <= milisDeHora)
					{
						tabela.rows[iter+1].cells[2].innerHTML += " (First prevision in " + Math.floor((milisDeHora - miliDif)/ (1000*60)) + "M)";
						continue;
					}
					var diferencaCompetidor = parseInt(populacoes[iter]) - parseInt(valorPrimeiroElementoPopulacao);
					var minhaPopCorrespondente = parseInt(meuLink.getElementsByTagName(nomePrimeiroElementoPopulacao)[0].getAttribute("populacao"));
					var minhaDiferenca = parseInt(minhaPopulacaoNaTabela) - parseInt(minhaPopCorrespondente);
					if (minhaPopulacaoNaTabela > populacoes[iter] )
					{
						if (diferencaCompetidor > minhaDiferenca)
						{
							var dif = diferencaCompetidor - minhaDiferenca;
							var difPopTotal = minhaPopulacaoNaTabela - populacoes[iter];
							var milisTotal = (difPopTotal / dif) * miliDif;
							var dias = Math.floor(milisTotal / (1000*60*60*24));
							milisTotal -= dias * 1000*60*60*24;
							var horas = Math.floor(milisTotal / (1000*60*60));
							milisTotal -= horas * 1000*60*60;
							var minutos = Math.floor(milisTotal / (1000*60));
							tabela.rows[iter+1].cells[2].innerHTML += " (" + dias + "D " + horas + "H " + minutos + "M)";
						} else {
							tabela.rows[iter+1].cells[2].innerHTML += " (your city is growing faster than this city)";
						}
					} else {
						if (minhaDiferenca > diferencaCompetidor)
						{
							var dif = minhaDiferenca - diferencaCompetidor;
							var difPopTotal = populacoes[iter] - minhaPopulacaoNaTabela;
							var milisTotal = (difPopTotal / dif) * miliDif;
							var dias = Math.floor(milisTotal / (1000*60*60*24));
							milisTotal -= dias * 1000*60*60*24;
							var horas = Math.floor(milisTotal / (1000*60*60));
							milisTotal -= horas * 1000*60*60;
							var minutos = Math.floor(milisTotal / (1000*60));
							tabela.rows[iter+1].cells[2].innerHTML += " (" + dias + "D " + horas + "H " + minutos + "M)";
						} else {
							tabela.rows[iter+1].cells[2].innerHTML += " (this city is growing faster than your city)";
						}
					}
				} else {
					var elementoCompetidor = xmldoc.createElement("link" + competidores[iter]);
					var elementoPopulacao = xmldoc.createElement("milis" + agora);
					elementoPopulacao.setAttribute("populacao", populacoes[iter]);
					elementoCompetidor.appendChild(elementoPopulacao);
					xmlRoot.appendChild(elementoCompetidor);
					cadastrarMinhaPop = true;
					tabela.rows[iter+1].cells[2].innerHTML += " (First prevision in 1H)";
				}
			}
		}
		if (cadastrarMinhaPop)
		{
			var arrMeuLink = xmlRoot.getElementsByTagName("link" + meuLinkNaTabela);
			if (arrMeuLink.length > 0)
			{
				var link = arrMeuLink[0];
				var elementoPopulacaoLink = xmldoc.createElement("milis" + agora);
				elementoPopulacaoLink.setAttribute("populacao", minhaPopulacaoNaTabela);
				link.appendChild(elementoPopulacaoLink);
			} else {
				var elementoLink = xmldoc.createElement("link" + meuLinkNaTabela);
				var elementoPopulacaoLink = xmldoc.createElement("milis" + agora);
				elementoPopulacaoLink.setAttribute("populacao", minhaPopulacaoNaTabela);
				elementoLink.appendChild(elementoPopulacaoLink);
				xmlRoot.appendChild(elementoLink);
			}
		}
		var xmlString = (new XMLSerializer()).serializeToString(xmldoc);
		GM_setValue("UtopiaHistoricoCompetidores", xmlString);
	}
}
catch (e)
{
	alert(e);
}
	//}
