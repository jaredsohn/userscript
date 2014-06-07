// ==UserScript==
// @name           [DinoRPG] Collecteur de missions
// @namespace      DinoRPG
// @description    Ce script permet de savoir les missions effectuées ou non par vos dinoz
// @include        http://*.dinorpg.*/*
// ==/UserScript==

//Script de vérification de mises à jours
var SUC_script_num = 76390; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('Il y a une mise à jour du script Greasemonkey "'+script_name+'."\nVoulez-vous allez sur la page d\'installation maintenant ?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('Pas de mise à jour disponible pour "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('Une erreur s\'est produite pendant la vérification des mises à jour:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Vérification de mise à jour manuelle', function(){updateCheck(true);});updateCheck(false);}catch(err){}


// Montrer tous les donneurs de missions
//var showAll = GM_getValue("options/showAll", false);
// Mettre le donneur de quêtes visualisé a la fin de la liste
//var organize = GM_getValue("options/organize", false);
// Langue par défaut si la détection ne fonctionne pas
var lng = "fr";

// URL de la page
var url = document.location.pathname;


// Detection de la langue
var fr = "www.dinorpg.com";
var en = "en.dinorpg.com";
var es = "es.dinorpg.com";
var de = "www.dinorpg.de";
switch (location.hostname)
{
    case fr:lng = "fr";
        break;
    case en:lng = "en";
        break;
    case es:lng = "es";
        break;
    case de://lng = "de"
        alert("German version has not been developped yet,\nplease give me all the informations you can, so I can make it.\nThanks");
        break;
    default: //alert("Language not detected, fr set to default")	!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}

// Création du tableau contenant toutes les informations des différentes langues
var locale = {
    "questGiver" : {
        "papy" : {	// OK
            "fr" : "Papy Joe",
            "en" : "Grandpa Joe",
            "es" : "Papy Jose",
        },
        "shaman" : {	// OK
            "fr" : "Shaman Mou",
            "en" : "Soft Shaman",
            "es" : "Chamán Lacio",
        },
        "rodeur" : {	// OK
            "fr" : "Rôdeur Etrange",
            "en" : "Strange Prowler",
            "es" : "Merodeador extraño",
        },
        "bob" : {	// OK
            "fr" : "Bao Bob",
            "en" : "Mr Bao Bob",
            "es" : "Don Bao Bob"
        },
        "nmulot" : {
            "fr" : "Nicolas Mulot",
            "en" : "Nicolas Mulot",
            "es" : "Nicolás Mulot"
        },
        "dian" : { // OK
            "fr" : "Dian Korgsey",
            "en" : "Dian Korgsey",
            "es" : "Dian Korgsey"
        },
        "arbre" : { // OK
            "fr" : "Gardien de la Forêt",
            "en" : "Forest Warden",
            "es" : "Guardián de la Jungla"
        },
        "skull" : {	// OK
            "fr" : "Skully",
            "en" : "Skully",
            "es" : "Calaveri"
        },
        "bureau" : {
            "fr" : "Bureau des Requêtes",
            "en" : "Request Office",
            "es" : "Oficina de Servicios"
        },
        "melem" : {
            "fr" : "Maître Elémentaire",
            "en" : "Elemental Master",
            "es" : "Maestro Elemental"
        },
        "mmex" : {	// OK
            "fr" : "Madame X",
            "en" : "Madam X",
            "es" : "Señora X"
        },
        "hlouche" : {
            "fr" : "Homme Louche",
            "en" : "Shady Man",
            "es" : "Tipo Raro"
        },
        "annato" : {
            "fr" : "Anna Tomie",
            "en" : "Anna Tomie",
            "es" : "Ana Tomía"
        },
        "alzaimer" : {
            "fr" : "Al Zaimer",
            "en" : "Al Zaimer",
            "es" : "Al Zeimura"
        },
        "broc__2" : {
            "fr" : "Broc",
            "en" : "Broc",
            "es" : "Broc"
        }
    },
    "zones" : {
        "papy": {
            "fr" : "Chez Papy Joe",
            "en" : "Grandpa Joe's Home",
            "es" : "Casa de Papy Jose"
        },
        "fosselave" : {
            "fr" : "Fosselave",
            "en" : "Lavapit",
            "es" : "Fosalava"
        },
        "foret" : {
            "fr" : "L'Orée de la Forêt",
            "en" : "The Edge of the Forest",
            "es" : "Entrada a Grumhel"
        },
        "camp" : {
            "fr" : "Camp Korgon",
            "en" : "Korgon Camp",
            "es" : "Campamento Korgón"
        },
        "sylvenoire" : {
            "fr" : "Porte de Sylvenoire",
            "en" : "Blacksylva Doors",
            "es" : "Puerta de Sylvanegra"
        },
        "rocky" : {
            "fr" : "Avant-poste Rocky",
            "en" : "Rocky Outpost",
            "es" : "Puesto Rokky"
        },
        "port" : {
            "fr" : "Port Monstrueux",
            "en" : "Monstrous Port",
            "es" : ""
        },
        "clinique" : {
            "fr" : "Clinique de Dinoville",
            "en" : "Dinotown Clinic",
            "es" : "Clínica de Dinovilla"
        }
    },
    "message" : {
        "donneurIntrouvable" : {
            "fr" : "Donneur de Missions inconnu",
            "en" : "Questgiver unknown",
            "es" : "Questgiver desconocidos"
        }
    },
    "quete" : {
        "terminee" : {
            "fr" : "Terminée",
            "en" : "Completed",
            "es" : "Terminée"
        },
        "en cours" : {
            "fr" : "En cours...",
            "en" : "In progress...",
            "es" : "En cours..."
        },
        "disponible" : {
            "fr" : "Disponible",
            "en" : "Available",
            "es" : "Disponible"
        },
        "indisponible" : {
            "fr" : "Indisponible",
            "en" : "Unavailable",
            "es" : "Indisponible"
        }
    }
};

// Récupérer le numéro du Dinoz
function getNumDinoz(url)
{
	var numDinoz = url.split("/");
	numDinoz = numDinoz[2];
	return numDinoz;
}

// Fonction qui ajoute l'onglet "Missions" sur la page du Dinoz
function addTab()
{
    // Ajouter dans les onglets, après "détails":
	var tabs = document.getElementsByClassName("tabs")[0];
	var ongletMission = document.createElement("li");
	var linkMission = document.createElement("a");
	linkMission.href = "#missions";
	linkMission.addEventListener("click", showMissions, false);
	linkMission.innerHTML = "Missions";
	ongletMission.appendChild(linkMission);
	tabs.appendChild(ongletMission);
    
    
    $("div#dinozPanel ul li a:contains('Carte')").bind("click", timerAddTab);
    $("div#dinozPanel ul li a:contains('Inventaire')").bind("click", timerAddTab);
    $("div#dinozPanel ul li a:contains('Détails')").bind("click", timerAddTab);
}

function timerAddTab()
{
    setTimeout(addTab, 1500);
}

// Récupérer les noms des quêtes et leurs statut
function recup()
{
	var tableMissions = document.getElementsByClassName("mission")[0];
	tableMissions = tableMissions.childNodes[3];
	var node = tableMissions.lastChild.childNodes[2];
	var str = "";
	var nom;
	var statut;
	while (node != null)
	{
		if(node.childNodes[1].childNodes[3])
		{
			nom = node.childNodes[1].childNodes[3].firstChild.nodeValue;
			statut = node.childNodes[3].firstChild.nodeValue;
			statut = statut.replace(/^\s+/g, "").replace(/\s+$/g, "");
			if ((statut != locale["quete"]["terminee"][lng]) && (statut != locale["quete"]["en cours"][lng]))
			{
				statut = locale["quete"]["disponible"][lng];
			}
		} else 
		{
			nom = node.childNodes[1].lastChild.nodeValue;
			statut = locale["quete"]["indisponible"][lng];
		}
        
        nom = nom.replace(/^\s+/g, "").replace(/\s+$/g, "");
		str += nom+"="+statut+";";
		node = node.nextSibling.nextSibling;
	}
	str = str.substring(0, str.length-1);
	
	// Récupère le numéro du Dinoz
	var numDinoz = getNumDinoz(url);
	
	// Récupère le donneur de quêtes
	var questGiver = GM_getValue("donneurMissions/"+numDinoz, false);
	if(!questGiver)
	{
		// Si il n'a pas été détécté, on le cherche a partir de la zone
		var dinozZone = document.getElementsByClassName("selected")[0];
		dinozZone = dinozZone.childNodes[1].childNodes[5].firstChild.nodeValue;
		switch(dinozZone)
		{
			case locale["zones"]["papy"][lng]: questGiver = locale["questGiver"]["alzaimer"][lng];
				break;
			case locale["zones"]["fosselave"][lng]: questGiver = locale["questGiver"]["melem"][lng];
				break;
			case locale["zones"]["foret"][lng]: questGiver = locale["questGiver"]["nmulot"][lng];
				break;
			case locale["zones"]["camp"][lng]: questGiver = locale["questGiver"]["dian"][lng];
				break;
			case locale["zones"]["sylvenoire"][lng]: questGiver = locale["questGiver"]["arbre"][lng];
				break;
			case locale["zones"]["rocky"][lng]: questGiver = locale["questGiver"]["bureau"][lng];
				break;
			case "Port Monstreux": questGiver = locale["questGiver"]["hlouche"][lng];
				break;
			case locale["zones"]["clinique"][lng]: questGiver = locale["questGiver"]["annato"][lng];
				break;
			default: alert(locale["message"]["donneurIntrouvable"][lng]);
		}
	} else
	{
		questGiver = locale["questGiver"][questGiver][lng];
	}
	
	// Sauvegarde des valeurs
	GM_setValue(numDinoz+"/"+questGiver, str);
}

function showMissions()
{
	var tabs = document.getElementsByClassName("tabs")[0];
	var active = tabs.getElementsByClassName("active")[0];
	if (active.firstChild.firstChild.nodeValue != "Missions")
	{
		// Active l'onglet Missions
		active.removeAttribute("class");
		tabs.lastChild.setAttribute("class", "active");
		var cust = document.getElementsByClassName("custom")[0];
		tabs.style.marginBottom = '15px';
		
		// Vide le div
		var div = cust.getElementsByTagName("div")[0];
		div.innerHTML = "";
		div.setAttribute("class", "mission");
		var text = div.nextSibling.cloneNode(false);
		
		// On récupère le numéro du dinoz
		var numDinoz = getNumDinoz(url);
		
		var trouve = false; // Déclaration de la variable pour savoir si aucun donneur de missions n'est connu
        
		// Tableau des donneurs de quêtes
		var questGiver = new Array(
			locale["questGiver"]["papy"][lng], locale["questGiver"]["mmex"][lng], locale["questGiver"]["skull"][lng],"Anna Tomie",
			locale["questGiver"]["shaman"][lng], locale["questGiver"]["melem"][lng],
			locale["questGiver"]["rodeur"][lng], locale["questGiver"]["bureau"][lng],
			locale["questGiver"]["hlouche"][lng], locale["questGiver"]["nmulot"][lng], locale["questGiver"]["bob"][lng],
			locale["questGiver"]["dian"][lng], locale["questGiver"]["arbre"][lng], locale["questGiver"]["alzaimer"][lng],
            locale["questGiver"]["broc__2"][lng]
		);
		questGiver.sort();
		
		// Ajout du li pour chaque donneur de quêtes
		// Affichage du sous menu
		var divMissions = document.createElement("div");
		divMissions.setAttribute("class", "scriptCollecteur");
		divMissions.style.paddingLeft = "2px";
		divMissions.style.paddingRight = "2px";

		var ulMissions = document.createElement("ul");
		ulMissions.setAttribute("class", "questGiver tabs");
		ulMissions.style.marginBottom = "10px";
		divMissions.appendChild(ulMissions);
		cust.insertBefore(divMissions, div);
		divMissions.appendChild(div);
		divMissions.insertBefore(text, div);
        
		for (var i in questGiver)
		{
			var str = GM_getValue(numDinoz+"/"+questGiver[i]);
			if (str != null || GM_getValue("options/showAll", false) == true)
			{
				trouve = true;
				var liMissions = document.createElement("li");
				liMissions.style.marginTop = "2px";
				//liMissions.style.marginBottom = "2px";
				liMissions.style.height = "22px";
				var link = document.createElement("a");
				link.href = "#missions";
				link.addEventListener("click", showList, false);
				link.innerHTML = questGiver[i];
				liMissions.appendChild(link);
				ulMissions.appendChild(liMissions);
			}
		}
		
		// Pour agrandir le ul sur tous les li
		var tailleUl = document.createElement("div");
		tailleUl.setAttribute("class", "tailleUl");
		//tailleUl.style.clear = "both";
		ulMissions.appendChild(tailleUl);
		
		if (!trouve)
		{
			cust.appendChild(div);
			cust.removeChild(divMissions);
			div.innerHTML = "<p>Aucun donneur de missions connu, allez d'abord discuter avec l'un d'eux pour qu'il apparaisse ici ou activez l'option du script pour afficher tous les donneurs de missions</p>";
		}
	}
}

function showList(event)
{
	var questGiver = document.getElementsByClassName("questGiver")[0];
	cust = questGiver.parentNode;
	var active = cust.getElementsByClassName("active")[0];
	if (active)
	{
		active.removeAttribute("class");
	}
	var liActive = this.parentNode;
	liActive.setAttribute("class", "active");
	var ulActive = this.parentNode.parentNode;
	var div = cust.parentNode.getElementsByClassName("mission")[0];
	if(GM_getValue("options/organize", false))
	{
		var tailleUl = questGiver.getElementsByClassName("tailleUl")[0];
		questGiver.insertBefore(liActive, tailleUl);
	}
	div.innerHTML = "";

	var numDinoz = getNumDinoz(url);
	var donneurZone = this.firstChild.nodeValue;
	var str = GM_getValue(numDinoz+"/"+donneurZone);
	if (str != null)
	{
		var tableStr = str.split(";");
		var tableValue = new Array();
		var j = 0;
		for (var i in tableStr)
		{
			tableValue[j] = tableStr[i].split("=");
			j++;
		}
		var tableContent = "<table class='table'><tr><th>Mission</th><th>Statut</th></tr>";
		for (i in tableValue)
		{
			if (tableValue[i][1] == "Terminée")
			{
				tableValue[i][0] = "<tr><td style='font-size: 12px;'><img src='/img/icons/small_missDone.gif' style='vertical-align: center;'> "+tableValue[i][0];
			} else if (tableValue[i][1] == "Disponible")
			{
				tableValue[i][0] = "<tr class='select'><td style='font-size: 12px;'><img src='/img/icons/small_missNew.gif'> "+tableValue[i][0];
			} else if (tableValue[i][1] == "En cours...")
			{
				tableValue[i][0] = "<tr class='important' onclick=\"document.location='/dino/"+numDinoz+"/act/mission/status'\"><td style='font-size: 12px;'><img src='/img/icons/small_missAct.gif'> "+tableValue[i][0];
			} else
			{
				tableValue[i][0] = "<tr class='off'><td style='font-size: 12px;'> "+tableValue[i][0];
			}
			tableContent += tableValue[i][0]+"</td><td style='font-size: 12px;'>"+tableValue[i][1]+"</td></tr>";
		}
		tableContent += "</table>";
	} else
	{
		var tableContent = "<p>Donneur de quête inconnu, allez le voir pour obtenir la liste de ses quêtes.</p>";
	}
	div.innerHTML = tableContent;
}

function trouverDonneur()
{
	var numDinoz = getNumDinoz(url);
	var urlSplit = url.split("/");
	npc = urlSplit[5];
    if(npc == "skull__2")
        npc = "skull";
    
	for (i in locale["questGiver"])
	{
		if (i == npc)
		{
			GM_setValue("donneurMissions/"+numDinoz, npc);
			break;
		}
	}
}

function ouvrirConfig() {
    var content = document.createElement("div");
    content.setAttribute("class", "content");
    
    var option = new Array(
        '<tr><td class="accom"><label><input id="showAll" name="showAll" type="checkbox"> Afficher tous les donneurs de quêtes</label></td></tr>',
        '<tr><td class="accom"><label><input id="organize" name="organize" type="checkbox"> Mettre le donneur de quêtes visualisé a la fin de la liste</label></td></tr>'
    );
    
    var options = "";
    for(opt in option){
        options += option[opt];
    }
    
    var boutonSave = document.createElement("input");
    boutonSave.setAttribute("type", "button");
    boutonSave.setAttribute("class", "button");
	boutonSave.addEventListener("click", save, false);
    boutonSave.setAttribute("value", "Sauvegarder");
    var boutonCancel = document.createElement("input");
    boutonCancel.setAttribute("type", "button");
    boutonCancel.setAttribute("class", "button");
    boutonCancel.addEventListener("click", cancel, false);
    boutonCancel.setAttribute("value", "Annuler");
    var boutons = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(boutonSave);
    td.appendChild(boutonCancel);
    boutons.appendChild(td);
    
    var boutonRAZ = document.createElement("tr");
    var td = document.createElement("td");
    var boutonEffacer = document.createElement("input");
    boutonEffacer.setAttribute("type", "button");
    boutonEffacer.setAttribute("class", "button");
	boutonEffacer.addEventListener("click", raz, false);
    boutonEffacer.setAttribute("value", "Effacer les données");
    td.appendChild(boutonEffacer);
    boutonRAZ.appendChild(td);
    
    
    $("div#notifyBlock").html('<div id="notification"><div id="sitePopup" class="sitePopup"></div><div class="black"></div></div>');
    $("div#sitePopup").append(content);
    
    $("div.content").html('<h2><img src="/img/icons/small_edit.gif" alt=""/> Paramètres du Collecteur de missions</h2><form class="form"><table><tbody></tbody></table></form>');
    $("div.content form table tbody").append(options).append(boutons).append(boutonRAZ);
    
    
    $("input[name=showAll]").attr("checked", GM_getValue("options/showAll", false));
    $("input[name=organize]").attr("checked", GM_getValue("options/organize", false));
    
    
    var exportZone = '<tr><td><textarea id="exportZone"></textarea></td></tr>';
    
    var boutonExport = document.createElement("input");
    boutonExport.setAttribute("type", "button");
    boutonExport.setAttribute("class", "button");
    boutonExport.addEventListener("click", exporter, false);
    boutonExport.setAttribute("value", "Exporter");
    var boutonImport = document.createElement("input");
    boutonImport.setAttribute("type", "button");
    boutonImport.setAttribute("class", "button");
    boutonImport.addEventListener("click", importer, false);
    boutonImport.setAttribute("value", "Importer");
    var boutonsExp = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(boutonExport);
    td.appendChild(boutonImport);
    boutonsExp.appendChild(td);
    
    $("div.content").append('<h2><img src="/img/icons/small_edit.gif" alt=""/> Exporter ou Importer les données du Collecteur de missions</h2><form class="form"><table><tbody></tbody></table></form>');
    $("div.content form ~ form table tbody").append(exportZone).append(boutonsExp);
    
    
}

function save() {
    // Sauvegarder la config
    var showAll = $("input#showAll").is(":checked");
    GM_setValue("options/showAll", showAll);

    var organize = $("input#organize").is(":checked");
    GM_setValue("options/organize", organize);

    location.reload();
    //$("div#notification").empty();
}

function cancel() {
    $("div#notification").empty();
}

function raz() {
	if(confirm("Voulez-vous vraiment supprimer toutes les données associées à ce script ?\nAucune donnée ne pourra être restauré."))
	{
		var keys = GM_listValues();
		for (var i in keys) {
		  GM_deleteValue(keys[i]);
		}
		location.reload();
	}
}

function exporter() {
    var vals = "";
    for each (var val in GM_listValues())
        vals += "{" + val + "|" + GM_getValue(val) + "}";
    
    $("textarea#exportZone").text(vals);
}

function importer() {
    var vals = $("textarea#exportZone").val();
    alert(vals);
    vals = vals.replace(/^\{/g, "").replace(/\}$/g, "");
    
    var chaines = vals.split("}{");
    for(var i in chaines){
        var val = chaines[i].split("|");
        var key = val[0];
        var value = val[1];
        alert("key: " + key + " value: " + value);
        GM_setValue(key, value);
    }
}

// Add jQuery
var $;
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}

// All your GM code must be inside this function
function letsJQuery() {
    
    // Menu
    GM_registerMenuCommand("[DinoRPG] Collecteur de missions - Ouvrir la configuration", function()
    {
        ouvrirConfig();
    });
    
    // Creation de la class questGiver
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = 
                    "div.scriptCollecteur ul.questGiver {\n"+
                        "\theight : 100%;\n"+
                        "\tpadding-bottom: -2px;\n"+
                    "}\n"+
                    "ul.questGiver div.tailleUl {\n"+
                    "\tclear: both;\n"+
                    "}\n";
    document.getElementsByTagName("head")[0].appendChild(style);

    // Detection de l'action à faire sur la page visitée
    var donneurMission = new RegExp("/dino/[0-9]+/act/dialog/"); // Dialogue avec un donneur de missions
    var listMission = new RegExp("/dino/[0-9]+/act/mission/list"); // Liste de missions
    var dinoz = new RegExp("/dino/[0-9]+/?$"); // Page principale d'un dinoz
    
    if (donneurMission.test(url))
    {
        trouverDonneur();
    } else if (listMission.test(url))
    {
        recup();
    } else if (dinoz.test(url))
    {
        var numDinoz = getNumDinoz(url);
        GM_deleteValue("donneurMissions/"+numDinoz);
        addTab();
    }
}
