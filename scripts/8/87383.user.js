// ==UserScript==
// @name           Trade Terminal
// @namespace      Trade Terminal
// @description   Trade Terminal for OGame
// @version        Final
// @include        http://*ogame.*/game/index.php?page*

// ==/UserScript==






var start_time = (new Date()).getTime();
var freqMaj = 23*3600;

if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
else 											{var FireFox = false; var nomScript='TradeTerminal';}

var Opera = ((navigator.userAgent.indexOf('Opera')>-1) ? true : false);


	// Google Chrome
	if(!FireFox)
	{
		function GM_getValue(key,defaultVal)
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue )
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value)
		{
			localStorage.setItem(key, value);
		}
	}




		function oui_non_en_checked(oui_non)
		{
			if (oui_non == "true" || oui_non == true ) {return "checked";} else {return "unchecked";}
		}



	var url=location.href;
 if (document.getElementById('playerName') || url.indexOf('page=combatreport',0)>=0 || (url.indexOf('page=showmessage',0))>=0)
{

	if (document.getElementById('playerName'))
	{
		var serveur = url.split('/')[2];
		var numeroUni = document.getElementsByTagName('title')[0].innerHTML;

		if( ! parseInt(numeroUni.replace( /[^0-9]/g, "")) > 0 )
		{
			var adress = url.split('/')[2].split('.');
				adress[0]='';adress[1]='';

			serveur = (numeroUni+'.ogame'+adress.join('.').replace( '..', ".")).toLowerCase();
		}

		GM_setValue(url.split('/')[2], serveur);

		// Prix redesign ou non
		if(serveur.indexOf('uni')>-1 && url.indexOf('uni42.ogame.org') ==-1 && url.indexOf('uni6.ogame.de') ==-1 )
		{
			var nonRedesignPrix = true;
		}
		else var nonRedesignPrix =  false;


		var numeroplanete = 0;
		var nbLune = 0;
		var th_style="height:20px; font-size: 12px; font-weight:normal; color: white; border:1px solid black;";

		var pseudo = document.getElementById('playerName').getElementsByClassName('textBeefy')[0].innerHTML;
		var coordPM = document.getElementsByClassName('planet-koords')[0].innerHTML ;
		var idPlanete = GM_getValue(nomScript+'idPlanet'+pseudo+serveur , 'a;').split(';');
		var manqueId = false; if (idPlanete[0] =='a') manqueId = true;
		var listeId = '';
		var nbPlanet=1;

		var planets = document.getElementById("rechts").getElementsByClassName("smallplanet");
		var Lune = new Array();

		if ( planets.length >1 )
		{
			numeroplanete=-1;
			nbPlanet = 0;
			for ( var i=0; i<planets.length ; i++)
			{
				if( !isNaN(planets[i].innerHTML.split('moonlink')[0].slice(planets[i].innerHTML.split('moonlink')[0].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[0].indexOf('" title'))))
				{
					idPlanete[nbPlanet] = planets[i].innerHTML.split('moonlink')[0].slice(planets[i].innerHTML.split('moonlink')[0].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[0].indexOf('" title'));

				}
				else
				{
					numeroplanete = nbPlanet;
				}

				if (idPlanete[nbPlanet] =='undefined') manqueId = true;

				listeId+= idPlanete[nbPlanet]+';';

				if (planets[i].innerHTML.indexOf('src="img/planets/moon/') > 0)
				{

					nbPlanet++;
					Lune[nbPlanet] = true;
					nbLune++;
					idPlanete[nbPlanet] = planets[i].innerHTML.split('moonlink')[1].slice(planets[i].innerHTML.split('moonlink')[1].indexOf('&amp;cp=')+8, planets[i].innerHTML.split('moonlink')[1].indexOf('" title'));

					listeId+= idPlanete[nbPlanet]+';';

					if(numeroplanete == -1 && planets[i].innerHTML.indexOf('planetlink active tipsStandard' ) > -1) numeroplanete = nbPlanet;

				}
				else Lune[nbPlanet] = false;

				nbPlanet++;
			}

			var idPlaneteTrie = listeId.slice(0, listeId.length -1).split(';').sort();
				idPlanete = listeId.slice(0, listeId.length -1).split(';');

			var f=0;
			for ( var i=0; i< idPlaneteTrie.length ; i++)
			{
				if (!Lune[i])
				{
					if (idPlaneteTrie[0] == idPlanete[i])
						{ coordPM = document.getElementsByClassName('planet-koords')[f].innerHTML;}
					f++;
				}
			}
		}






	}
		var OptionSauvegarde = GM_getValue(nomScript+"options"+coordPM+serveur,'0000FF,0000CC,000099,000066,000033'+';'+false+';'+true+';'+true+';'+true+';'+true+';'+true+';'+false+';'+false+';'+true+';'+true+';'+true+';'+true+';'+true+';'+true+';'+false+';'+true+';'+true+';'+true+';'+false+';'+true+';'+true+';'+true+';'+false+';'+false+';'+false+';'+true+';'+true+';'+false+';'+true+';;;;;;;;;');
		var option = OptionSauvegarde.split(/;/);

		for (i=1; i<option.length ; i++)
		{
			if (option[i]== 'true' || option[i]== true) option[i] = true;
			else option[i] = false;
		}

		var CouleurGraph = option[0];

		var listeCouleur = option[0].split(/,/);

		var couleurFTurl = (GM_getValue(nomScript+'couleurSign'+serveur+coordPM , '0;0;0;-255;255;255|url|')+'|url|').split('|url|');

		var couleurFT = couleurFTurl[0].split('-')






	if (document.getElementById('playerName'))
	{

/* *********************************************************** Page Trade Terminal **************************************************************************************/
		var icone = 'data:image/gif;base64,R0lGODlhMgAyAPcAAAAAAP///wMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDRITFRMUFhQVFxUWGBYXGRcYGhgZGyAiJSEjJiIkJyQmKSMlKC8yNjAzNwgJCgkKCxQWGAoLDBUXGSEkJxYYGgsMDSIlKCMmKRcZGyQnKhgaHAwNDjI2OjE1OSUoKxkbHTQ4PDM3OycqLSYpLBocHg0ODzY6PjU5PSgrLhsdHzc7PyksLzo+Qjk9QTg8QCsuMSotMB0fIRweIA4PEDxARDs/Qy0wMywvMh4gIg8QES4xNB8hIyAiJBAREhESExITFBMUFRQVFigsLzU6PjQ5PSktMDY7PyouMTg9QTc8QCwwMysvMjo/Qzk+Qi0xNDxBRTtARC8zNi4yNTA0NzI2OTE1ODQ4OzM3OhgbHRwfIR0gIh4hIx8iJCAjJSEkJiIlJyQnKSMmKCUoKicqLCYpKygrLSwxNC0yNS80Ny4zNjA1ODI3OjE2OTQ5PDM4OzY7PjU6PTc8Pzo/Qjk+QTg9QDtAQwwODxwgIg4QER0hIx4iJA8REh8jJSAkJhASEyElJyImKBETFCMnKSQoKhIUFSUpKycrLSYqLBMVFigsLhQWFyktLysvMSouMBUXGBYYGRcZGhgaGxkbHBocHSQpKyUqLCYrLSgtLycsLikuMCovMSwxMyswMi0yNC80Ni4zNTA1NxEUFRIVFhMWFxQXGBUYGRYZGhcaGxgbHBkcHRodHhseHxwfIBcbHBgcHRkdHhoeHxsfIBwgIR0hIh4iIx8jJCAkJSElJiImJyMnKB0iIx4jJB8kJSAlJiEmJyInKCMoKSQpKiUqKwABAQECAgIDAwMEBAQFBRQYGAUGBhATExYaGhEUFBcbGxIVFQwODgYHBxoeHhMWFg0PDxQXFxUYGAcICBYZGQ8REQgJCQkKCgoLCwsMDAkJCQYGBgUFBQQEBAMDAwICAgEBAf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAPAALAAAAAAyADIAAAj/AOH1GkiwoMGDCBMqJChwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKCUWc8IoUcqCvoqRusLl0SQuKHohuljKis+fPo8hBGaFy5YtqAb66mWKj51RCBnRmUp1qiplvY5q3VqKESNiXhNR0YqFETCDv3zx2VLQi6RlW7jInWt0UdatWyddwqu1j12FvwoissNoS51jiI8Fq7Nl2F2+WyLt5Rtmqa9HWR4tVejLDlwvBr80fsxXMt6aBCdp/Zuwc7EtoAvS2WIX8tFmpfC67PVrrFYumxH6+uIItsHZjm1HnnzUjq9Cw/bwBXNWOGHjsmmTxhtpFN5Fqm2X/0r463psgsgBKB9VCbKVRbZZwzR/fEsH9bY50MIbpAc3dnihcBQL0ABg4IHuTPLNFiIcaKAb9uEHGSQkHAXEFjK4A0AHW3xDg1Y72HIUHwUW0UgjSoTwxg9bqOEgABB2wI1ytUBjQAhooAENN5JIkQAAPmyRxFEpsHBUI1nYUMSSRXwTwxYVvAjhBu0oR8uBLIjDDhhIQJOgFitsUUNcHUhxlIYvFgGllFsoICFftRjoThiWAPFABzGEkQI37mwBgxdHbXIUNy8C8GQkDCSaaBxtAmAUZEkcKEAtn7wTQqPQZKFJCmkc9QUJXqDpoJq2LQBANO5E086qq4pqIAJexI7hRQHr2IKFA+9UA8SMW0hTqIHraEKCBMRK0AkJmhDw67IG8lENN5GAwU40D1h4TgjMZqttodXcsEkWaWjgDhxbNEIFEM9sq66674ggwYZUaLEFEAa+s+692ZrDxid5TOOOE/fhK/CyloawwcAIJ6zwwgw37PDDEEcs8cQUV2zxxRhnrPHGHMPjMce/ehwQADs=';
       	var icone2 = 'data:image/gif;base64,R0lGODlhMgAyAPcAAAAAAP///xsfINSSVQQEBQsNDh0gIR4hIiMmJx0hIh8jJCElJh8kJRATEw8RER4hIR8iIhocHCQmJiYnJyAjIhQWFScpKCwuLSkrKiMkIyQlJBkaGCUmJCQlIzAxLy8wLgICAScnJCkpJiopJSMhGyopJikoJSsqJy4sJwcGBDIvKS4sKDEvKzYyKy4pITAtKDEuKTkzKjQwKiwqJxIOCUo/MjIrIjs0KxwWDyUdFCEaEkc6LE1BM0g9MUY8MUA3LT01LD02LjkzLHhXN41nQohkQUUzIScdE41pRhQPCgQDAi0iF4ZlRU47KDImGnZaPhUQCx4XECceFQ0KB21UOyMbEx8YEQkHBW5WPiAZEl1KNhMPC2FNOWNPOwUEA11LOVZGNVlIN1RENFFCM1NENVBCNEM5Lzs0LTcyLdOSVdKRVc+PVNGQVdCPVc2PVMyOU8iLUs+QVcyNVMuOVMuNVMqMU8SIUcCFT8mMVMiMU8eLU8OIUciLVMWKU8SJUsOIUsGHUcaKVMGIUsCGUb+GUbR+TMCHUr6FUbJ9TLF8TL6GUryFUbuEUbqDUK16S72GUryFUreCUKp4Sqh3SaFyRrqEUraBULR/T7J+TrF+Tp1wRbB8Tq17TaR1SZpuRJdsQ5NpQZBnQLJ/UKt6Tap5TYxkP618T6d4TKJ1SoZgPX1aOXRTNaV3TJ9zSXpXOKt7T6l6TpluR51xSWVJL6J2TGBGLaB0TJpwSZVtR5RrRpBpRYpkQkc0Ip50TJJrR4ZiQX9dPiEYEHxbPXRWOXJUOGpONDEkGIJgQHlaPG9SN21QNpVuSoBfQHZXOyIZEY5qSIpnRmdMNEk2JWRLM2JJMl5GMFpDLlZALCsgFoRjRFM+K0s4JzkrHoJiRXlcQEY1JUIyI3xeQj4vIX9hRCkfFnVaQHFXPjMnHGtSOy8kGiYdFWtUPmlSPWZQO0M2Kql4TUAuHzYoHBsUDhcRDDwtICQaEiIZEg8LCBAMCRENCgoHBRkSDQsIBgMCAgEBAf///yH5BAEAAP8ALAAAAAAyADIAAAj/AP8JGEiwoMGDCBMqJChwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKCMaqLGuB4KUBTPUYBduDRgubGgJaHHR3LhuQIH+VIFwxjg2AwaMG5hBgDdRt7AgbLdoEaOrVzctMyMgqdev5XyI9dEjCCCvdGqsMMghg6gBBS0hQfe1Lte6X7mYw5sUEleFKAr2GNRuQCQziM34iDTgR1e+A8LsxSsLggAKYAKRobAwhCK6lwweivyYbxgsddmUGWiAi1fHCjsMAm2Q0QAtpfGCKVf3zAMBIs56XcM5YYhDtAvaBpO7ruSvtzSU+MG4Lq0ZCTkoKhy64Ogwzb+e/6774wvkAeYSoiA8oDvBRQPAADiPZR3fcWbS8P1r0HNhSwbBJ818kF0zTWrD4IBPXY0kdUgKAEQo4T2HWDNAIRJG2KA0/pzXRDVJ6WdHCv4sMQA3t3iFijJJ/QHhLMmsokwTh9QyQCIZArAhDucVkwIOTgAjzI+x9IGNP8QM8E1SkYyWxjZupDFLLVNaYyGOGTZoxBTnTSPhIVng0wgwKaSAyyjRDJDMAGos0UdSEOZoI5YSbkggX8VEmIIl16RxzRLcWHLJPCkMoAwnSYE4AA45AmBhI6tEGukgAwyoBmTfSDhFMcV4kc4AVgCQghvWRAJMUphQs4k+jc7iIQD8XJzBzxS00qqPPxmqw0ksm8xDgzJraOPFPGngoN89jUZYTyqlhOKss6WkckSy1Eb4xzw4+NJIPvxcEyI26VQr7riNziNLNW8wk8MVuQywDR1pgEDuvPMqUQQ1ACxBxygDpBGhEvQGLK4URBRjCBRXyLKEwAxXq4QTTpDT8MQUV2zxxRhnrPHGHHfs8ccghyzyyCSXbPLJ/6R8crIpBwQAOw==';
		var aff_option ='<li><span class="menu_icon"><a href="http://ogamespec.com/tools/trade.php" target="blank_" ><img class="mouseSwitch" src="'+icone+'" rel="'+icone2+'" height="27" width="27"></span><a class="menubutton " href="'+url+'&TradeTerminale=scriptON" accesskey="" target="_self">';
			aff_option += '<span class="textlabel">Trade Terminal</span></a></li>';


		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "optionIFC");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);

		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];

		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = aff_option;
		document.getElementById('optionIFC').insertBefore(tableau, document.getElementById('optionIFC').firstChild);

	// Page
	if ((url.indexOf('TradeTerminale=scriptON',0))>=0)
	{
			var couleur = new Array('','','','','');
			for (var i=0 ; i< listeCouleur.length ; i++)
				{couleur[i] = listeCouleur[i];}
			for(var i=0 ; i< option.length ; i++)
				{option[i] = oui_non_en_checked(option[i]);}



			var aff = '<iframe src="http://ogamespec.com/tools/trade.php" frameborder="0" scrolling="yes" width="660" height="500"></iframe>';




			var einhalt=document.getElementById('inhalt');
			var escriptopt=document.createElement('div');
			escriptopt.id='TradeTerminale=scriptON';
			escriptopt.innerHTML=aff;
			escriptopt.style.position='relative';
			escriptopt.style.cssFloat='left';
			einhalt.style.display='none';
			einhalt.parentNode.insertBefore(escriptopt,einhalt);




	}

}}