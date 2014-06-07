// ==UserScript==
// @name       Empire Sith CRA
// @namespace  http://use.i.E.your.homepage/
// @version    3
// @description  enter something useful
// @match      http://s124-fr.ogame.gameforge.com/game/index.php?page=premium
// @require 	//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==

var allyId = "";

function timeConverter(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var sec = a.getSeconds();
     var time = date+','+month+' '+year+' '+hour+':'+min+':'+sec ;
     return time;
 }

function setStyle(){
    
	var elemsDiv =  document.getElementsByClassName("divCra");
	for(var a = 0; a < elemsDiv.length; a++) {
		elemsDiv[a].style.cssFloat = "left";            
    	elemsDiv[a].style.margin = "20px";
	} 
       
 	var elemsTable =  document.getElementsByClassName("tableCra");
	for(var b = 0; b < elemsTable.length; b++) {
		elemsTable[b].style.border="1px solid #EBB00E";
    	elemsTable[b].style.color="#EBB00E";
        elemsTable[b].style.borderCollapse = "true";
        elemsTable[b].style.borderSpacing = "5px 8px";
    }  
    
 	var elemsTr =  document.getElementsByClassName("thCra");
	for(var c = 0; c < elemsTr.length; c++) {    
		elemsTr[c].style.fontSize = "medium";
    	elemsTr[c].style.fontWeight = "bold";
    }
  
	var elemsTitre =  document.getElementsByClassName("titreCra");
	for(var d = 0; d < elemsTitre.length; d++) {    
		elemsTitre[d].colSpan = "3";
    }
         
	var elemsThB =  document.getElementsByClassName("thCraBorder");
	for(var e = 0; e < elemsThB.length; e++) {    
		elemsThB[e].style.borderTop = "1px solid #EBB00E";
        elemsThB[e].style.borderBottom = "1px solid #EBB00E";
    }
    
	var elemsTitreAlly =  document.getElementsByClassName("titreCraAlly");
	for(var f = 0; f < elemsTitreAlly.length; f++) {    
		elemsTitreAlly[f].colSpan = "5";
    }
    
    var elemsDivAlly =  document.getElementsByClassName("divCraAlly");
	for(var g = 0; g < elemsDivAlly.length; g++) {
		elemsDivAlly[g].style.cssFloat = "none";   
        elemsDivAlly[g].style.clear = "both";   
    	elemsDivAlly[g].style.margin = "20px";
	}
    
}

function getClassementsJoueurs(j){
    getClassementJoueurs(j, 0, "Général");
    getClassementJoueurs(j, 1, "Economique");
    getClassementJoueurs(j, 2, "Scientifique");
    getClassementJoueurs(j, 3, "Militaire");
}

function getClassementJoueurs(j, type, titreClassement){
	var div = document.createElement("div");
    div.id = "classement"+titre;
    div.className = "divCra"; 
    
    var table = document.createElement("table");
    table.className = "tableCra";
    
	var trTitre = document.createElement("tr");
    trTitre.className = "thCra";
	var titre = document.createElement("th");
    titre.className = "titreCra";
    var t = document.createTextNode("Classement  " + titreClassement);
	titre.appendChild(t);
    trTitre.appendChild(titre);
    table.appendChild(trTitre);      
    
    
    var tr = document.createElement("tr");
    tr.className = "thCra";    
    var thPseudo = document.createElement("th");
    var thPosition = document.createElement("th");
    var thPoints = document.createElement("th");
    thPseudo.className = "thCraBorder";
    thPosition.className = "thCraBorder";
    thPoints.className = "thCraBorder";
    var pseudo = document.createTextNode("Membre");
    var position = document.createTextNode("Place");
    var points = document.createTextNode("Points");
    thPseudo.appendChild(pseudo);
    thPosition.appendChild(position);
    thPoints.appendChild(points);
    tr.appendChild(thPseudo);
    tr.appendChild(thPosition);
    tr.appendChild(thPoints);
    table.appendChild(tr);
    div.appendChild(table);
    
    document.getElementById("craEmpireSith").appendChild(div);
    
    $.get("http://s124-fr.ogame.gameforge.com/api/highscore.xml",{"category":1,"type":type},function(xml){
        $('highscore',xml).each(function(i){  
		 	var trTitre2 = document.createElement("tr");
            var titre2 = document.createElement("th");
    		titre2.className = "titreCra";
			var timestamp = document.createTextNode(timeConverter($(this).attr("timestamp"))); 			
			titre2.appendChild(timestamp);
            trTitre2.appendChild(titre2);
            trTitre.parentNode.insertBefore(trTitre2, trTitre.nextSibling);    
        });
        
        $('player',xml).each(function(i){
            if(j.indexOf($(this).attr("id")) >= 0){
                var tr = document.createElement("tr");
                var tdPseudo = document.createElement("th");
                tdPseudo.className = $(this).attr("id");
                var tdPosition = document.createElement("th");
                var tdPoints = document.createElement("th");
				var pseudo = document.createTextNode($(this).attr("id"));
                var position = document.createTextNode($(this).attr("position"));
                var points = document.createTextNode($(this).attr("score"));
                tdPseudo.appendChild(pseudo);
                tdPosition.appendChild(position);
                tdPoints.appendChild(points);
                tr.appendChild(tdPseudo);
                tr.appendChild(tdPosition);
                tr.appendChild(tdPoints);
                table.appendChild(tr); 
            }
        });
        
		remplacerPseudo(j);
		setStyle();
    });
}


function remplacerPseudo(j){
    
    var listeId = j.split(",");
    for(i=0;i < listeId.length;i++){
        var playerid = listeId[i];
        $.get("http://s124-fr.ogame.gameforge.com/api/playerData.xml",{id:playerid},function(test){
            $('playerData',test).each(function(y){
                var elems = document.getElementsByClassName($(this).attr("id"));
                
                for(var k = 0; k < elems.length; k++) {
                   elems[k].innerHTML = $(this).attr("name");
                }     
            });
        });
    }
}

function getClassementsAlly(allyId,j){

    var divAlly = document.createElement("div");
    divAlly.id = "classementAlly";
    divAlly.className = "divCraAlly"; 
    
    var tableAlly = document.createElement("table");
    tableAlly.className = "tableCra";
    tableAlly.id = "tableAllyCra";
    
	var trTitre = document.createElement("tr");
    trTitre.className = "thCra";
	var titre = document.createElement("th");
    titre.className = "titreCraAlly";
    var t = document.createTextNode("L'Empire");
	titre.appendChild(t);
    trTitre.appendChild(titre);
    tableAlly.appendChild(trTitre);      

    var trTimespanAlly = document.createElement("tr");
	var timestampAlly = document.createElement("th");
    timestampAlly.className = "titreCra";
    timestampAlly.id = "timestampAlly";
    trTimespanAlly.appendChild(timestampAlly);
    tableAlly.appendChild(trTimespanAlly);    
    
	var trTitre2 = document.createElement("tr");
    trTitre2.className = "thCra";
	var titreClassement = document.createElement("th");
    titreClassement.className = "thCraBorder";
    var tClassement = document.createTextNode("Classement");
	titreClassement.appendChild(tClassement);
    trTitre2.appendChild(titreClassement);
    
    var titrePlace = document.createElement("th");
    titrePlace.className = "thCraBorder";
    var tPlace = document.createTextNode("Place");
	titrePlace.appendChild(tPlace);
    trTitre2.appendChild(titrePlace);
    
    var titrePoints = document.createElement("th");
    titrePoints.className = "thCraBorder";
    var tPoints = document.createTextNode("Points");
	titrePoints.appendChild(tPoints);
    trTitre2.appendChild(titrePoints);   
    
    tableAlly.appendChild(trTitre2);   
    
    divAlly.appendChild(tableAlly);    
    document.getElementById("craEmpireSith").appendChild(divAlly);
    
    getClassementAlly(0,"Général");
    getClassementAlly(1,"Economie");
    getClassementAlly(2,"Scientifique");
    getClassementAlly(3,"Militaire");
}

function getClassementAlly(type,titre){
     
        $.get("http://s124-fr.ogame.gameforge.com/api/highscore.xml",{"category":2,"type":type},function(xml){
            var tableAlly = document.getElementById("tableAllyCra");                
			var trC = document.createElement("tr");  
            
            $('alliance',xml).each(function(i){
                
                if($(this).attr("id") == allyId){                    
                    
                    var tdType = document.createElement("td");            
                    var type = document.createTextNode(titre); 			
                    tdType.appendChild(type);
                    trC.appendChild(tdType);
                    
                    var tdPlace = document.createElement("td");            
                    var position = document.createTextNode($(this).attr("position")); 			
                    tdPlace.appendChild(position);
                    trC.appendChild(tdPlace);
                    
                    var tdScore = document.createElement("td");            
                    var score = document.createTextNode($(this).attr("score")); 			
                    tdScore.appendChild(score);
                    trC.appendChild(tdScore);                   
                    
                }
            });    
         
            $('highscore',xml).each(function(i){ 
                var tsAlly = document.getElementById("timestampAlly");
                if(tsAlly.childNodes.length == 0){
                	var timestamp = document.createTextNode(timeConverter($(this).attr("timestamp"))); 			
                	tsAlly.appendChild(timestamp);                 
                }
            });
            
            tableAlly.appendChild(trC);
			setStyle();
    });
    
}

function main(){
    $(document).ready(function(){
        var listejoueurs = new Array();
        var joueurs = "";
        
        var divCraEmpireSith = document.createElement("div");
    	divCraEmpireSith.id = "craEmpireSith";
        divCraEmpireSith.style.float = "left";
        divCraEmpireSith.style.clear = "both";
        divCraEmpireSith.style.margin = "150px";
        divCraEmpireSith.style.marginTop = "550px";
        divCraEmpireSith.style.marginBottom = "250px";
        
        var tsMembresCraEmpireSith = document.createElement("h1");
        divCraEmpireSith.appendChild(tsMembresCraEmpireSith);
        
        document.body.appendChild(divCraEmpireSith);
        
         var alliance = prompt("Saisissez le nom de l'alliance :", "Empire Sith");
        
        // Initialisation des joueurs de l'empire
         $.get("http://s124-fr.ogame.gameforge.com/api/alliances.xml",{},function(xml){
             $('alliances',xml).each(function(i){
                 var tmaj = document.createTextNode("Mise à jour de la liste des membres : " + timeConverter($(this).attr("timestamp")));
                 tsMembresCraEmpireSith.appendChild(tmaj);
             });
             
            $('alliance',xml).each(function(i){                
                var allianceName = $(this).attr("name");
                if(allianceName==alliance){
                    allyId = $(this).attr("id")
                    player = $(this).find("player");
                    //joueurs[attr("id")] = 
                    while(player.attr("id") != undefined){
                        playerid = player.attr("id");
                        joueurs += playerid + ",";
                        listejoueurs
                        player = player.next()
                    }
                } 
             });
             getClassementsAlly(allyId, joueurs);             
             getClassementsJoueurs(joueurs);

         });
      
    });    
}

main();

