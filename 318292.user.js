// ==UserScript==
// @name        LoS
// @namespace   Clowst
// @description DoTheDo
// @include     http://www.legendofsoccer.com/*
// @version     1.1
// @grant       none
// @run-at 		document-end
// ==/UserScript==

var actualPage = window.location.href,
	uriTactique = "tactique",
	uriClubMath = "match",
	joueurs = [],
	// ui
	sWindow= null, sTitle= null, sContainer= null,
	$sContainerId;
	
function allPage()
{
	raccourciMatchQueue();
}

function raccourciMatchQueue()
{
	
	var button = document.createElement('button');
	 button.id = 'findMatch';
	 button.style.border = '2px solid black';
	 button.className = "btn";
	 button.innerHTML = "Trouver un match";
	 $sContainerId.append(button);
	 
	document.getElementById("findMatch").addEventListener("click", function(event) 
	{
	  $.post("http://www.legendofsoccer.com/en/club/legend", { 'match_legend_search': '' } ).done(function (data) {
		afficherMessage('File rejointe', true);
		console.log(data);
	});
	}, true);

}

function tactiquePage()
{
	
	// addBtnBestTeam();

	var listJoueurs = $('#liste_joueur li');
			
	for(var i=0, len= listJoueurs.length; i < len; i++)
	{
		addPrincipalScore(listJoueurs[i]);
	}
	
	afficherMessage('Raccourci Skill', true);
}


// Ajoute un score à droite des joueurs
function addPrincipalScore(_from){

	var sommeCompetence = 0,
		mainScore = $(_from).find('.joueur_content > p .joueur-content-gs').text();
	
	joueurs.push({
		id: $(_from)[0].id,
		nom_prenom: $($(_from)[0]).find(".nom").text()+' '+ $($(_from)[0]).find(".prenom").text(),
		pos: $($(_from)[0]).find(".position_j").text(),
		cote: $($(_from)[0]).find(".cote_j").text(),
		skill: mainScore
	});
    
	// Ajoute un score général par rapport aux stats principales
    $('#'+$(_from)[0].id+' > div').append('<span style="color: red;float: right; margin-right: 25px; font-weight: bold;">'+mainScore+'</span>');
}

// ===================== MATCH PAGE =======================
function matchPage() 
{
	afficherMessage('Full invitations');
	addBtnDemandes();
	
}

function addBtnDemandes(){
	// Process Demandes
	var button = document.createElement('button');
	button.id = 'addBtnDemandes';
	button.style.border = '2px solid red';
	button.className = "btn";
	button.innerHTML = "Process Full invitations";
	$('.box-controls > div.pull-left').append(button);

	document.getElementById("addBtnDemandes").addEventListener("click", function(event) 
	{
		buildDemandes();
	}, true);
	
	
	// Si on a des matchs en attente de validation on active le bouton
	if($('div.match-list-byday-slot span.label-warning').length > 0)
	{
		// Process reponse
		var buttonAccept = document.createElement('button');
		buttonAccept.id = 'addBtnAcceptance';
		buttonAccept.style.border = '2px solid green';
		buttonAccept.className = "btn";
		buttonAccept.innerHTML = "Process Full acceptance";	
		$('.box-controls > div.pull-left').append(buttonAccept);
		
		document.getElementById("addBtnAcceptance").addEventListener("click", function(event) 
		{
			console.log('buildAcceptance');
			buildAcceptance();
		}, true);
	}
}


function buildAcceptance() {
	var $listDesMatchsAValider = $('div.match-list-byday-slot span.label-warning'),
		nbMatchsAValider = $listDesMatchsAValider.length,
		currentMatchUrl = null,
		currentIdMatch = null,
		compteurReussi= 0;
	
	for(var i=0; i< nbMatchsAValider;i++)
	{
		currentMatchUrl = $($listDesMatchsAValider[i]).parent().prop('href');
		$.get(currentMatchUrl)
			.done(function(response)
			{
				//var el = $( '<div></div>' ),
				var	tmpStr = response,
					trouve = tmpStr.indexOf(' rel="accept_invitation" class="btn">', 0);
				// C'est mignon tout beau !
				
				currentIdMatch = tmpStr.substring(trouve-6, trouve-1);
				// console.log("id: "+ currentIdMatch);
				//el.html(text);
						
				//currentIdMatch = $('a[rel="accept_invitation"]', el).attr('data-id');
				$.post(currentMatchUrl, {id_match: currentIdMatch , type_query:'accept_invitation'})
					.done(function(response){
						compteurReussi++;
				});
			});
	}
	afficherMessage('Acceptance réussie', true);
}

function buildDemandes()
{
	var invitations = $('div[data-target="#modal-invitation"]');
	nbInvitations = $(invitations) .length,
	newInvit = [];
	for (var i = 0; i < nbInvitations; i++)
	{
		newInvit.push({
			'invitation-hour': $(invitations[i]) .attr('data-hour'),
			'invitation-slot': $(invitations[i]) .attr('data-slot'),
			'invitation-request': ''
		});
	}
	
	envoiDemandeDeMatch(newInvit, 0);
	document.getElementById("addBtnDemandes").remove();
}

function envoiDemandeDeMatch(_newInvit, _index)
{
    $.post(window.location.href, _newInvit[_index]).done(function (data) {
        if (_index < _newInvit.length)
         envoiDemandeDeMatch(_newInvit, ++_index);
         else
        afficherMessage('Envoi de ' + _index + ' requêtes de jeu envoyés avec le grand succès', true);
    });
}
	
function creationMenu()
{
	sWindow = document.createElement('div');
	sTitle = document.createElement('div');
	sContainer = document.createElement('div');
	 
	sWindow.style.position= 'fixed';
	sWindow.style.top= '0px';
	sWindow.style.left= '0px';
	sWindow.style.backgroundColor = 'rgba(42, 42, 42, 0.75)';
	sWindow.style.border= '1px solid grey';
	sWindow.style.zIndex= '9999';
	sWindow.style.color= '#fff';
	
	sTitle.innerHTML = "Le plaisir actived";
	sTitle.style.border= '1px solid grey';
	sTitle.style.padding= '5px';
	
	sContainer.id= "sContainer";
	sContainer.style.padding= '5px';

	//sContainer.innerHTML = "LoFucker actived";
	sWindow.appendChild(sTitle);
	sWindow.appendChild(sContainer);
	document.body.appendChild(sWindow);
	
	$sContainerId =  $(document.getElementById("sContainer"));
}


function afficherMessage(_string, _flgDone)
{
	$sContainerId.append('<div '+((_flgDone) ? 'style="color: yellowgreen;"' : '')+'>'+_string+'</div>');
}
	
	
creationMenu();




// Page tactique
 if(RegExp(uriTactique,"g").exec(actualPage)!==null)
 {
 	tactiquePage();
 }
 else if(RegExp(uriClubMath,"g").exec(actualPage)!==null)
 {
 	matchPage();
 }
allPage();



