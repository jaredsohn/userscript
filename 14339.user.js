// ==UserScript==
// @name          PandoraRO Post All Communities
// @namespace     http://cyberneticz.blogspot.com
// @description   Post a message in all the communities
// @include       http://www.orkut.com/*

window.addEventListener("load", function(e) {
if(document.location.href.indexOf("Communities.aspx")>=0)
{
	var anchorTags = document.getElementsByTagName('a');
	var communities = "";
	var j=0;
	for(var i=0;i<anchorTags.length-1;i++)
	{
		if(anchorTags[i].href.indexOf("Community.aspx")>=0)
		{
			if(j>0)
			{
				communities=communities+",";
			}
			communities=communities+anchorTags[i].href.split("cmm=")[1];
			j++;
		}	
	}
	GM_setValue("communities",communities);
	GM_setValue("postCount",0);
	document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
}
if(document.location.href.indexOf("CommMsgPost.aspx")>=0)
{
	GM_setValue("postCount",GM_getValue("postCount")+1);
	document.getElementById("subject").value="PANDORA RAGNAROK ONLINE GRÁTIS";
	document.getElementById("messageBody").value="[purple]- Site: Http://pandorabox.info/br/ \n - Fórum: Http://pandorabox.info/forum \n - Painel de controle: Http://pandorabox.info/CP \n - Patch v6.3: http://www.mediafire.com/?myww1heucmm \n - Vote e ajude o servidor: http://www.gamesites200.com/ragnarok/in.php?id=14808 \n [green]SISTEMA DE SEGURANÇA 100% IMPLEMENTADO. EXCLUSIVIDADE PARA PROTEGER OS JOGADORES. \n - SISTEMA ANTI-BOT \n - SISTEMA ANTI-SCAM / ANTI-HACK. \n - SERVER LIMPO PARA JOGADORES HONESTOS!!! \n [blue]INFORMAÇÕES DO SERVIDOR: \n - ATUALIZADO 100% KRO \n - RATES: 3000x/3000x/3000x \n - MAX LVL: 255/200 \n - SERVIDOR COMPLETO E COM CLASSES BALANCEADAS & PVP|WOE EQUILIBRADO SEM ITENS OVERPOWER. \n [blue]- NOVAS CLASSES: \n [green]--Gunslinger, Taekwon & Ninja. \n [blue]- NOVAS CIDADES: \n [green]--Veins, Rachel, Nameless Island, Moscovia. \n [blue]- NOVAS DUNGEONS: \n [green]--Tanathos, Bio Labs, Thor, Ice and Abbey. \n [blue]- CIDADE DOS MERCADORES: \n [green]--É uma cidade totalmente organizada para lojas dos jogadores. Usem @autotrade. \n [blue]- NPC ESTILISTA: \n [green]--530 Cores de Roupas, 37 tipos de cabelos, 251 cores de cabelos. \n [blue]- COMANDOS PARA JOGADORES: \n [green]--@warp, @time, @autoloot, @duel, @changeleader, @changegm, @autotrade e outros... \n [blue]- NPCs BÁSICOS: \n [green]--Kafra grátis, Mestre das Classes, Garota do Aluguel, Resetadora com Platinum skills, Curandeiro, Ferreiro, Removedora de Cartas e todos os NPCs básicos para facilitar o jogo. \n [blue]- NPCs AVANÇADOS: \n [green]--Mercado Negro com vários NPCs vendendo itens e equipamentos em geral, Arena de Desafios, Arena MVP, Sistema de Pets únicos, Teleportadora com cidades, dungeons e mapas especiais para upar. \n [blue]- SISTEMA DE RANQUEAMENTO \n [green]--Devil MVP Square, PVP ranqueado com Dota System, Top Emperium Rank. \n [blue]- SUPORTE: \n -Nossos GMs atendem no forum, orkut, msn, IRC e no jogo em 4 linguas. \n [purple]WOE - GUERRA DO EMPERIUM \n -Segunda 21:00-23:00 \n -Quarta 10:00-12:00 \n -Sábado 13:00-15:00";
	document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(15),'submit','');"
}
if(document.location.href.indexOf("CommMsgs.aspx")>=0)
{
	if(GM_getValue("communities").split(",").length>GM_getValue("postCount"))
	{
		document.location.href="http://www.orkut.com/CommMsgPost.aspx?cmm="+GM_getValue("communities").split(",")[GM_getValue("postCount")];
	}
	else
	{
		alert("All the communities have been posted with the message");
	}
}
}, false);