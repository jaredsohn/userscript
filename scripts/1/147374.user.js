// ==UserScript==
// @name        SIS redesign - HvA
// @namespace   Roan Zuman
// @description Laten we van SIS eens iets moois en handigs maken :)
// @include     https://www.sis.hva.nl:8011/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1.2
// ==/UserScript==


//First lets do the homepage..
	if ((window.location.href.indexOf("cmd=login") > -1) || (window.location.href.indexOf("cmd=logout") > -1)) {
			$('td').css('textAlign','center');
			document.body.innerHTML = document.body.innerHTML.replace('Selecteer een taal:', "");
			document.body.innerHTML = document.body.innerHTML.replace('border="1"', "");
			document.body.innerHTML = document.body.innerHTML.replace('HvA-ID', "Gebruikersnaam");
			$('.pslogintext').hide();
			$('.psloginlabel').css('width','50%');
			$('.psloginbutton').css('width','200px');
			$('.psloginbutton').css('fontSize','25px');
			$('.psloginbutton').css('height','70px');
			$('.psloginbutton').css('marginLeft','-50%');
			$('.psloginbutton').css('marginTop','20px');
			$('.psloginbutton').css('backgroundColor','#25167a');			
			$('.psloginbutton').css('borderRadius','20px');
			$('body').css('backgroundColor','#ccc7ea');
			$('table').css('border','0');
			$('img').css('width','590px');
			$('img').css('height','176px');
			$('img').attr('src','http://stap.iam.hva.nl/~zumanr001/sis.png');
			
			
		//hover effect login button
		  $('.psloginbutton').hover(
			function(){
				$('.psloginbutton').css('backgroundColor','8174ce');
			},
			function(){
						$('.psloginbutton').css('backgroundColor','#25167a');
			});
	}		                       
								
//Eenmaal ingelogd.. Show credits en redirect naar juiste interface
	if(window.location.href.indexOf("tab=DEFAULT") > -1) {
			window.location = "https://www.sis.hva.nl:8011/psp/S020PRD/EMPLOYEE/HRMS/s/WEBLIB_PTPP_SC.HOMEPAGE.FieldFormula.IScript_AppHP?pt_fname=CO_EMPLOYEE_SELF_SERVICE";	
	}
	
	if ((window.location.href.indexOf("WEBLIB_PTPP_SC") > -1) || (window.location.href.indexOf("PORTALPARAM_PTCNAV") > -1)) {
			$('#MENU').css('height','400px');
			$('#pthdr2logo').append('<br><div id="menu"><a class="menuItem" target="TargetContent" title="Bekijk je cijferlijst" href="/psc/S020PRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_MY_CRSEHIST.GBL?Page=SSS_MY_CRSEHIST&amp;Action=U" name="default">Cijferlijst</a><a class="menuItem" target="TargetContent" title="Bekijk je voltooide vakken." href="/psc/S020PRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SAA_SS_DPR_ADB.GBL?Page=SAA_SS_DPR_ADB&Action=A" name="default">Voltooide vakken</a><a class="menuItem" target="TargetContent" title="Inschrijven studie-onderdelen." href="https://www.sis.hva.nl:8011/psc/S020PRD/EMPLOYEE/HRMS/c/SNS_CUSTOMIZATIONS_NLD.SNS_SSENRL_CART.GBL?Page=SNS_SSS_ENRL_METH&Action=A" name="default">Inschrijven voor tentamens</a><a class="menuItem" tabindex="-1" title="Afmelden bij SIS" href="https://www.sis.hva.nl:8011/psp/S020PRD/EMPLOYEE/HRMS/?cmd=logout" id="pthdr2logout">Afmelden</a></div>');
			var content = document.getElementById("ptifrmtgtframe");
			content.parentNode.removeChild(content);
			$('#pthdr2logo').append('<br><iframe frameborder="0" src="https://www.sis.hva.nl:8011/psc/S020PRD/EMPLOYEE/HRMS/c/SA_LEARNER_SERVICES.SSS_MY_CRSEHIST.GBL?Page=SSS_MY_CRSEHIST&amp;Action=U" title="Hoofdinhoud" name="TargetContent" id="ptifrmtgtframe2" style="clear: both; width: 690px; height: 450px; margin: auto; margin-top: 5px; overflow-x: hidden; overflow-y: scroll; "></iframe>');
			$('.PSPAGECONTAINER').css('align','center');
			$('body').css('backgroundColor','#ccc7ea');
			$('tr').css('height','35px');
			
			//Weg met dat vreemde menu.. We maken ons eigen (logischere) menu!
			var nav = document.getElementById("ptifrmnav");
			nav.parentNode.removeChild(nav);
			var nav2 = document.getElementById("ptifrmsbarcollexp");
			nav2.parentNode.removeChild(nav2);
			
			//Hier komtie :)
			$('.menuItem').css('width','20%');
			$('.menuItem').css('height','40px');
			$('.menuItem').css('backgroundColor','white');
			$('.menuItem').css('marginLeft','2.5%');
			$('.menuItem').css('marginRight','2.5%');
			$('.menuItem').css('display','inline');
			$('.menuItem').css('float','left');
			$('#menu').css('margin','auto');
			$('#menu').css('width','690px');
			
			//Ons mooie vernieuwde logo plaatsen.
			$('#pthdr2logo').css('textAlign','center');
			$('#pthdr2logo').css('width','100%');
			$('#pthdr2logo').css('marginTop','15px');
			$('#pthdr2logimg').attr('src','http://stap.iam.hva.nl/~zumanr001/sis.png');
			$('#pthdr2logimg').attr('width','590px');
			$('#pthdr2logimg').attr('height','176px');
			
			//Restyle het hoofdmenu
			document.body.innerHTML = document.body.innerHTML.replace('Hoofdmenu', "<h1>Hoofdmenu</h1>");
			document.body.innerHTML = document.body.innerHTML.replace('&gt;', "");
			
			//Verberg bovenste balkje...
			var topbar = document.getElementById("pthdr2top");
			topbar.parentNode.removeChild(topbar);
	
	}
	
	if ((window.location.href.indexOf("Page=SSS_MY_CRSEHIST") > -1) || (window.location.href.indexOf("Page=SAA_SS_DPR") > -1) || (window.location.href.indexOf("Page=SNS_SSS_ENRL") > -1)) {
	
			//overbodige dingen weghalen uit cijferoverzicht.
			var topbar2 = document.getElementById("PAGEBAR");
			topbar2.parentNode.removeChild(topbar2);
			var select2 = document.getElementById("win0divDERIVED_SSTSNAV_SSTS_MAIN_GOTO");
			select2.parentNode.removeChild(select2);
			//var bottom2 = document.getElementById("win0divDERIVED_SSTSNAV_GROUP_BOX$103$");
			//bottom2.parentNode.removeChild(bottom2);
			var topbar3 = document.getElementById("win0divDERIVED_SSTSNAV_SSTS_NAV_TABS");
			topbar3.parentNode.removeChild(topbar3);			
			var topbar4 = document.getElementById("win0divDERIVED_SSTSNAV_SSTS_NAV_SUBTABS");
			topbar4.parentNode.removeChild(topbar4);
			
			
			
			
			document.body.innerHTML = document.body.innerHTML.replace('Bij het openen van deze pagina staan de nieuwste beoordelingen bovenaan.', "");
			document.body.innerHTML = document.body.innerHTML.replace('height="40"', 'height="0"');
			document.body.innerHTML = document.body.innerHTML.replace('height="93"', 'height="0"');
			$('.PSLEVEL1GRIDWBO').css('width','660px');
			document.body.innerHTML = document.body.innerHTML.replace('U kunt de sorteervolgorde aanpassen door gebruik te maken van de sorteeropties.', "");
			
			
	}
	
	