// ==UserScript==
// @name           3gm.fr Add
// @namespace      Author : Aurélien Vivet
// @description    Best 3gm, author : Aurélien Vivet
// @include        http://www.3gm.fr/*
// @version         1.05
// @grant      	 none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var bouton_selection_base64 ="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NDgxQUZFNDI0RDg3RTIxMUE0RjhENTIwRDJDQjMwMTIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTc4ODkxNkY4NzREMTFFMkIyOTA4RUUyRTk4Mzk3NzEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTc4ODkxNkU4NzREMTFFMkIyOTA4RUUyRTk4Mzk3NzEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0OTFBRkU0MjREODdFMjExQTRGOEQ1MjBEMkNCMzAxMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0ODFBRkU0MjREODdFMjExQTRGOEQ1MjBEMkNCMzAxMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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";

function trinombres(a,b){ return a-b; };
  
var type = new Array();

var type = {
    0: "Fourgons",     
    1: "Camions",
    2: "Transporteurs_maritimes",
    3: "Marines",
    4: "Helicopteres",
    5: "Jeeps",
    6: "Tanks_urbains",
    7: "Helicopteres",
    8: "Wingfires",
    9: "B80_k",
    10: "Fregates",
    11: "Destroyers",
    12: "Croiseurs",
    13: "Drones_cyclopes"
};

var Fourgons = new Array();
var Camions = new Array();
var Transporteurs_maritimes = new Array();
var Marines = new Array();
var Helicopteres = new Array();
var Jeeps = new Array();
var Tanks_urbains = new Array();
var Helicopteres = new Array();
var Wingfires = new Array();
var B80_k = new Array();
var Fregates = new Array();
var Destroyers = new Array();
var Croiseurs = new Array();
var Drones_cyclopes = new Array();

var Tours = new Array();
var Canons = new Array();
var Missiles_balistiques = new Array();
var DCA = new Array();
var Batteries_cotieres = new Array();


function save_unite_localStorage(){
    localStorage.setItem("caracteristique_Fourgons_3", 2000);
    localStorage.setItem("caracteristique_Camions_3", 12000);
    localStorage.setItem("caracteristique_Transporteurs_maritimes_3", 40000);
    localStorage.setItem("caracteristique_Marines_3", 25);
    localStorage.setItem("caracteristique_Freemens_3", 15);
    localStorage.setItem("caracteristique_Jeeps_3", 110);
    localStorage.setItem("caracteristique_Tanks_urbains_3", 250);
    localStorage.setItem("caracteristique_Helicopteres_3", 300);
    localStorage.setItem("caracteristique_Wingfires_3", 500);
    localStorage.setItem("caracteristique_B80_k_3", 6000);
    localStorage.setItem("caracteristique_Fregates_3", 10000);
    localStorage.setItem("caracteristique_Destroyers_3", 18000);
    localStorage.setItem("caracteristique_Croiseurs_3", 35000);
    localStorage.setItem("caracteristique_Drones_cyclopes_3", 0);
}

function message_alerte(msg){
    $("#barre_bot").after('<div id="shadowing_script"  style="display: none;background-color: black;width: 100%;height: 100%;position: absolute;top: 0;left: 0;opacity: 0.8;"></div>');
    
    $("#shadowing_script").after('<div id="fenetre_alert_script" style="display: none;background-image: url(\'../img/popup.png\'); background-repeat: no-repeat; width: 235px; height: 182px; z-index: 9999; top: 30%; left: 50%; margin-left: -130px; position: absolute; text-align: center;"><div style="margin: 25px; margin-top: 50px; margin-bottom: 10px"><span id="probleme_ins">' + msg + '</span></div><button type="button" onclick="$(\'#fenetre_alert_script\').hide();$(\'#shadowing_script\').hide();" class="submit_ins" style="position: absolute; bottom:13px; right:53px"></button></div>');
    $('#fenetre_alert_script').show();
    $('#shadowing_script').show();
}

function notifunderconstruction(){

var typemission = $("#partie_centrale>.centre>.centre_mid>div:eq(1)>div:eq(2)>div:eq(2)>div:eq(0)>span").html();

typemission = typemission.replace("On"," ");

var qui = $("#partie_centrale>.centre>.centre_mid>div:eq(1)>div:eq(2)>div:eq(2)>div:eq(2)>div>div>div>div").html();

var quand = $("#partie_centrale>.centre>.centre_mid>div:eq(1)>div:eq(2)>div:eq(2)>div:eq(2)>div>div>div>div:eq(1)").html();

var quoi = $("#partie_centrale>.centre>.centre_mid>div:eq(1)>div:eq(2)>div:eq(2)>div:eq(2)>div>div.info_hover").html();

quoi = quoi.replace("(<span style=\"color:white\">"," ")
quoi = quoi.replace("</span>)<br>"," ")


var phrase1 =  qui+" "+typemission+' avec :';
var phrase2 = quoi +" dans "+ quand;

phrase1  = phrase1.replace(/\s+/g, ' ');
phrase2= phrase2.replace(/\s+/g, ' ');
var notification = webkitNotifications.createNotification(
  '48.png',  // icon url - can be relative
  '3Gm Notif',  // notification title
 phrase + "" + phrase2 // notification body text
);
notification.show();

}




function changetitle(arg1){
	msgpriv = parseInt($("#msg_non_lu_head").html());
	msgally = parseInt($('a[href="my_ally.php"]').children().children().children().html());
	
	if(msgally >= 1 && msgpriv >= 1){
		msg = msgally+msgpriv;
		$("title").html("("+msg+") "+arg1);
		console.log(msg);
	}else if(msgally >= 1){
		$("title").html("("+msgally+") "+arg1);
	}else if(msgpriv >= 1){
		$("title").html("("+msgpriv+") "+arg1);
	}
}

function mise_a_jour_capacite(arg1){
    var selection = $(arg1).val();
    //var calcul = (selection * 12000);
    if(selection == "" || selection == "0" ){
        $(arg1).parent().parent().children("div:eq(3)").html("0");
    }else{
        $(arg1).parent().parent().children("div:eq(3)").html(""+calcul_capacite_transport(arg1,selection)+"");
    }
}

function calcul_total_capacite(arg1){
    var total = 0;
    arg1.each(function(index){
        total = parseFloat(parseFloat(total)+parseFloat($(this).html()));
        return total;
    });
    return total;
}

function calcul_capacite_transport(index,selection){
    
    if(!isNaN(index) === false){
        var a =  $(index).parent().parent().children("div:eq(0)").html();
    }else{
        var a = $(".rapport_vague_titre+div>div:eq(" + index + ")>div:eq(0)").html();
    }
    var capacite_transport;
    
    switch(a){
            
        case "Fourgons":
            capacite_transport = parseFloat(localStorage.caracteristique_Fourgons_3)+parseFloat(localStorage.caracteristique_Fourgons_3*(localStorage.bonus_Fourgons_3/100));
            break;
            
        case "Camions":
            capacite_transport = parseFloat(localStorage.caracteristique_Camions_3)+parseFloat(localStorage.caracteristique_Camions_3*(localStorage.bonus_Camions_3/100));
            break;
            
        case "Transporteurs maritimes":
            capacite_transport = parseFloat(localStorage.caracteristique_Transporteurs_maritimes_3)+parseFloat(localStorage.caracteristique_Transporteurs_maritimes_3*(localStorage.bonus_Transporteurs_maritimes_3/100));
            break;
            
        case "Marines":
            capacite_transport = parseFloat(localStorage.caracteristique_Marines_3)+parseFloat(localStorage.caracteristique_Marines_3*(localStorage.bonus_Marines_3/100));
            break;
            
        case "Helicopteres":
            capacite_transport = parseFloat(localStorage.caracteristique_Freemens_3)+parseFloat(localStorage.caracteristique_Freemens_3*(localStorage.bonus_Freemens_3/100));
            break;
            
        case "Jeeps":
            capacite_transport = parseFloat(localStorage.caracteristique_Jeeps_3)+parseFloat(localStorage.caracteristique_Jeeps_3*(localStorage.bonus_Jeeps_3/100));
            break;
            
        case "Tanks urbains":
            capacite_transport = parseFloat(localStorage.caracteristique_Tanks_urbains_3)+parseFloat(localStorage.caracteristique_Tanks_urbains_3*(localStorage.bonus_Tanks_urbains_3/100));
            break;
            
        case "Helicopteres":
            capacite_transport = parseFloat(localStorage.caracteristique_Helicopteres_3)+parseFloat(localStorage.caracteristique_Helicopteres_3*(localStorage.bonus_Helicopteres_3/100));
            break;
            
        case "Wingfires":
            capacite_transport = parseFloat(localStorage.caracteristique_Wingfires_3)+parseFloat(localStorage.caracteristique_Wingfires_3*(localStorage.bonus_Wingfires_3/100));
            break;
            
        case "B80-k":
            capacite_transport = parseFloat(localStorage.caracteristique_B80_k_3)+parseFloat(localStorage.caracteristique_B80_k_3*(localStorage.bonus_B80_k_3/100));
            break;
            
        case "Fregates":
            capacite_transport = parseFloat(localStorage.caracteristique_Fregates_3)+parseFloat(localStorage.caracteristique_Fregates_3*(localStorage.bonus_Fregates_3/100));
            break;
            
        case "Destroyers":
            capacite_transport = parseFloat(localStorage.caracteristique_Destroyers_3)+parseFloat(localStorage.caracteristique_Destroyers_3*(localStorage.bonus_Destroyers_3/100));
            break;
            
        case "Croiseurs":
            capacite_transport = parseFloat(localStorage.caracteristique_Croiseurs_3)+parseFloat(localStorage.caracteristique_Croiseurs_3*(localStorage.bonus_Croiseurs_3/100));
            break;
            
        case "Drones-cyclopes":
            capacite_transport = parseFloat(localStorage.caracteristique_Drones_cyclopes_3)+parseFloat(localStorage.caracteristique_Drones_cyclopes_3*(localStorage.bonus_Drones_cyclopes_3/100));
            break;
            
        default:
            capacite_transport = 0;
            break;
            
    }
    
    
    var calcul = (selection * capacite_transport);
    if(calcul == "" || calcul == null || calcul == 0 ){
        calcul == "0";
    }
    return calcul;
}

function reset_unites_selection(){
    var ligne = $(".rapport_vague_titre+div>div:has('input')");
    ligne.each(function(index){
        $(this).children("div:eq(2)").children("input").val(0);
        
        mise_a_jour_capacite($(this).children("div:eq(2)").children("input").val(0));
        $("#total_capacite_unite").html(calcul_total_capacite($('.selection_unite')));
    });
}

function tempsAffichage(entier){
		var temps = "";
		if(entier <= 0){
			if(refreshAuto == false){
				window.location.reload(true);
				refreshAuto = true;
			}
		}
		else{
			var ts = entier;
			
			var jour = Math.floor(ts/86400);
			
			if(jour>0){
				ts -= jour * 86400;
				temps += jour+"j ";
			}
			var heure = Math.floor(ts/3600);
			if(heure>0){
				ts -= heure * 3600;
				temps += heure+"h ";
			}
			var min = Math.floor(ts/60);
			if(min>0){
				ts -= min * 60;
				temps += min+"min ";
			}
			var sec = ts;
			temps += Math.floor(sec)+"s";
			//alert(temps);
		}
		return temps;
	}
//support de  unsafeWindow pour avoir accès aux functions de la page.
unsafeWindow    = ( function () {
    var dummyElem   = document.createElement('p');
    dummyElem.setAttribute ('onclick', 'return window;');
    return dummyElem.onclick ();
} ) ();


$(document).ready(function() {
    
	  if(window.location.pathname == "/game/index.php"){
		//rechargement de la page toutes les x secondes
		var xseconde = 120;
		setTimeout(function(){window.location.reload(true)},xseconde*1000)
	  }

	   
		
    /*==============RESSOURCE===========*/
//var $ = unsafeWindow.$; //jquery de la page
//var tempsAffichage = unsafeWindow.tempsAffichage; //fonction de spoke

//var reg = unsafeWindow.reg; 
    var reg = new RegExp('[.]', 'g');
    
    var new_elem = '<div class="ressource_bloc"><div style="height: 16px; padding-top: 22px;" ><b>Total</b></div>';
    new_elem += '<div><b id="script_total_res">Chargement</b></div></div>';
    $(new_elem).prependTo('#ressources');
    
	
	
    setInterval(function(){
        $(".resscript").remove();
        // Ajouter une indication sur le temps restant avant d'atteindre le plafond de l'entrepot
        
        $('.ressource_inf').each( function(){
            
            if($(this).parent().find('span').text() != 'Aucune information.' &&  $(this).html() != "0"){
                var max =  $(this).parent().children(".info_hover_general").children("div:eq(2)").children("span").text().split("/");
                
                var nbapreslepoint = max[1].split(".").length;
                
                var reg2 = new RegExp('k|M', 'g');
                var decompose = max[1].replace(reg2,"").split(".");
                
                if(max[1].substring(max[1].length,max[1].length-1) == "M"){
                    var reste = 6 - nbapreslepoint;
                }else if(max[1].substring(max[1].length,max[1].length-1) == "k"){
                    var reste = 4 - nbapreslepoint;
                }
                if(decompose[1] == null){decompose[1] = ""}
                var entier = decompose[1];
                
                for(i=0;i<reste;i++){
                    entier = entier+"0";
                }
                
                var  max = decompose[0] + entier;
                
                //compte le nombre après le . et remplace M par le nombre de 0 manquant pour avoir la quantité voulu 
                //si c'est k faire pareil mais pour arrivé à 1000
                
                var value = $(this).parent().text().split('/');
                var current = parseInt(value[0].replace(reg, ''));
                var ratio = parseInt($(this).parent().children(".ressource_bloc .res_info").find('div[style="color:white"]').text().replace(reg, ''));
                var temps = Math.round((max - current) / ratio * 3600);
				if(temps <= 0){
					timeToDisplay = 0
				}else{
					var timeToDisplay = tempsAffichage(temps);
				}
               var maxElem = '<div class="resscript" style="color: red">Max atteint dans: ' + timeToDisplay + '</div>';
                // $('.ressource_bloc .res_info')
                
                
        /*
                console.log("value:" + value);
                console.log("current:" + current);
                console.log("ratio:" + ratio);
                console.log("temps:" + temps);
               console.log("maxElem:" + maxElem);
		*/
                
                //
                $(this).parent().children(".ressource_bloc .res_info").append(maxElem);
            }
        });
        
        var res_tot = 0;
        // Affiche la quantité totale des ressources         
        $('.ressource_inf').each( function(){
            if($(this).attr('id') != 'res_energie'){
                res_tot = res_tot + parseInt($(this).text().replace(reg, ''));
            }
        });
        
        $("#script_total_res").html(res_tot);
    }, 1000);
    
    $('#ressources').css('width', '540px');
    
    
    /*==========FIN=RESSOURCE===========*/
    
    //si il y a le fenetre de message d'erreur ou d'alerte
    if($("#fenetre_alert")){
        $(document).keyup(function(e){
            $("#fenetre_alert").children("button").click()
        })
    }   
    
    
    //page mission
    /*
    pour chaque ligne on ajoute le bouton de selection
    si on clique sur le bouton selection on enregistre dans "nombre_disponible" ne nombre d'unité max
    et on le met dans le input à coté
    on ajoute aussi une colonne capacité qui change si on met a jour les unité selectionné
    on verra donc les capacités de chaque unité avec la prise en charge des bonus !
    
    */
    if(window.location.pathname == "/game/mission.php"){
        $(".max_btn").remove();
        $(".max_div").remove();
        $(".nombre_max").remove();
        
        $(".centre_content_texte>div:eq(0)").css({'width':'556px'});
        
        var ligne = $(".rapport_vague_titre+div>div");
        
        
        //1ere partie
        if($("input[name='send']").length >= 1){
            
            $(".rapport_vague_titre:contains(Objectif)").before("<div style=\"margin: auto; text-align:center; padding-bottom: 10px; \">Capacité maximum des troupes : <span id=\"total_capacite_unite\"></span></div>");
            $("#total_capacite_unite").html(calcul_total_capacite($('.selection_unite')));
            
            $(".centre_content_texte>div:eq(0)").css({'width':'618px'});
            
            ligne.each(function(index){
                
                $(".centre_content_texte:eq(0)>div>form>div:eq(1)>div:eq(" + (index+1) + ")>div:eq(3)").before('<img class="selection_transport" style="margin-top: -2px;margin-top: 1px;" src=' + bouton_selection_base64 + ' />');
                
                if(index >= 2 && index <= ligne.length-4){
                    $(".rapport_vague_titre+div>div:eq(" + index + ")>div:last()").before('<div class="rapport_td selection_unite" style="width: 102px">0</div>');
                }               
                
                $(".rapport_vague_titre+div>div>div>input:not('.input_ins')").keyup(function(e){
                    mise_a_jour_capacite(this);
                    $("#total_capacite_unite").html(calcul_total_capacite($('.selection_unite').replace(".","")));
                })
            })
            
            $(".selection_transport").click(function(e){
                var nombre_disponible = $(this).parent().children("div:eq(1)").html().replace(".","");
                $(this).parent().children("div:eq(2)").children("input").val(nombre_disponible);
                mise_a_jour_capacite($(this).parent("div").children("div:eq(2)").children("input"));
                $("#total_capacite_unite").html(calcul_total_capacite($('.selection_unite')));
            });
            
            //bouton reset
            $(".centre_content_texte>div:eq(0)>form>div:eq(1)>div:eq(0)>.clear").before('<div class="rapport_th" style="width: 100px; float:left; text-transform:uppercase; color: #f3d643;font-size:0.9em;font-weight:bold" >Capaticté</div><div id="reset_selection_unite" style="float: left;width: 50px; border-radius: 4px; text-align: center; margin-left: 5px; background: #4F2500; padding: 4px;cursor: pointer; ">Reset</div>');
            
            $("#reset_selection_unite").click(function(){
                reset_unites_selection();
            });
            
        }
        
        //2eme partie
        if($("#cout_voyage").length >= 1){
            //pour chaque ligne
            ligne.each(function(index){
                if(index >= 2 ){
                    $(".rapport_vague_titre+div>div:eq(" + index + ")>div:last()").before('<div class="rapport_td selection_unite" style="width: 102px">0</div>');
                    var selection = $(this).parent().children("div:eq(2)").children("div:eq(1)").html().replace(".","");
                    if(selection == "" || selection == "0" ){
                        $(this).parent().children("div:eq("+index+")").children("div:eq(2)").html("0");
                        //$(this).parent().parent().children("div:eq(3)").html("0")
                    }else{
                        $(this).parent().children("div:eq("+index+")").children("div:eq(2)").html(String(calcul_capacite_transport(index,selection)));
                        //$(this).parent().parent().children("div:eq(3)").html(calcul)
                    }
                }
            });
            
            $(".centre_content_texte>div:eq(0)>form>div:eq(1)>div:eq(0)>.clear").before('<div class="rapport_th" style="width: 100px; float:left; text-transform:uppercase; color: #f3d643;font-size:0.9em;font-weight:bold" >Capaticté</div>');
            
            //$(document).keyup(function(e){
             //   $(".btn_envoyer").click()
            //})
        }
        
        
        
    }//fin mission.php
    
    //prise en charge du localStorage
    if(typeof(Storage)!=="undefined"){
        
        //message_alerte("Votre navigateur accepte le stockage local.");
        //enregistrement des bonus
        if(window.location.pathname == "/game/troops.php"){
            
            localStorage.clear();
            
            //Si on ne vois pas la capacité de transport des unitées on les a quand même enregistré 
            // permet d'évité de isNan dans la colonne capacité dans mission si on a pas les troupes.
            save_unite_localStorage();
            
            var vehicule = $(".centre>.centre_mid>.centre_content>.centre_content_texte");
            
            
            
            vehicule.each(function(index){
                
                var transport =  type[index]; 
                
                var caracteristiques =  $(".centre>.centre_mid>.centre_content>.centre_content_texte:eq("+index+")>div:eq(2)>table>tbody>tr>td:contains(+)");
                var valeurs = $(".centre>.centre_mid>.centre_content>.centre_content_texte:eq("+index+")>div:eq(1)>div:eq(1)>div:contains(%)");
                
                valeurs.each(function(index){
                    // console.log($(this).html());
                    
                    localStorage.setItem("bonus_" + transport + "_" + index, $(this).html().trim().substring(0, $(this).html().trim().length-1));
                    
                });
                
                caracteristiques.each(function(index){
                    // $(".centre_content_texte:eq(0)>div:eq(2)>table>tbody>tr").children("td:eq(1)").html()
                    localStorage.setItem("caracteristique_" + transport + "_" + index, parseFloat($(this).html()));
                    
                });
                
            });
            /*
            0 fourgons
            1 camions
            etc....
            */
            
            
        }//fin troop.php
    }else{//fin stockage local
        console.log("pas de stockagelocal");
        message_alerte("Votre navigateur ne prend pas en charge le stockage local.");
    }
    
    
    //carte
    if(window.location.pathname == "/game/map.php" ){ 
        var decalage = parseInt(10);
        var x = parseInt($('input[name=x]').val());
        var y = parseInt($('input[name=y]').val());
        
        $('.left').parent().attr('href','map.php?x=' + (x-decalage) + '&y=' + y + '#map');
        $('.right').parent().attr('href','map.php?x=' + (x + decalage) + '&y=' + y + '#map');
        
        $('.up').parent().attr('href','map.php?x=' + x + '&y=' + (y-decalage) + '#map');
        
        $('.down').parent().attr('href','map.php?x=' + x + '&y=' + (y+decalage) + '#map');  
    }//fin map
    
    
    //warcom	
    if(window.location.pathname == "/game/warcom.php"){

		$('.offre_bandeau').each(function(index){
			typevente = $(this).children("div>div:eq(0)").children("div:eq(0)").html();

			switch(typevente){

				case "Fourgons":
					Fourgons.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Camions":
					Camions.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Transporteurs maritimes":
					Transporteurs_maritimes.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Marines":
					Marines.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Helicopteres":
					Helicopteres.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Jeeps":
					Jeeps.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Tanks urbains":
					Tanks_urbains.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Helicopteres":
					Helicopteres.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Wingfires":
					Wingfires.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "B80-k":
					B80_k.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Fregates":
					Fregates.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Destroyers":
					Destroyers.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Croiseurs":
					Croiseurs.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Drones-cyclopes":
					Drones_cyclopes.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				// deff

				case "Tours":
					Tours.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Missiles balistiques":
					Missiles_balistiques.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "DCA":
					DCA.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Batteries cotieres":
					Batteries_cotieres.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				case "Canons":
					Canons.push($(this).children("div>div:eq(2)").html().replace(".","")+":"+index);
					break;

				default:
				break;

			}
		});
					
		//triage					
		Batteries_cotieres.sort(trinombres());
		DCA.sort(trinombres());
		Missiles_balistiques.sort(trinombres());
		Tours.sort(trinombres());
		Canons.sort(trinombres());
		console.log(" -----    ");
		Fourgons.sort(trinombres());
		Camions.sort(trinombres());
		Transporteurs_maritimes.sort(trinombres());
		Helicopteres.sort(trinombres());
		Marines.sort(trinombres());
		Jeeps .sort(trinombres());
		Tanks_urbains.sort(trinombres());
		Helicopteres.sort(trinombres());
		Fregates.sort(trinombres());
		Destroyers.sort(trinombres());
		Wingfires.sort(trinombres());
		B80_k.sort(trinombres());
		Croiseurs.sort(trinombres());
		Drones_cyclopes.sort(trinombres());

		function greenlypricewarcom(posav,posap){
			$(".offre_prix:eq("+ posap[posap.length-1] +")").css({ color: "red", background: "none" });
			$(".offre_prix:eq("+ posav[1] +")").css({ color: "green", background: "none" });
		};

		(Batteries_cotieres.length >=1) ? posav = Batteries_cotieres[0].split(":") : x ;
		(Batteries_cotieres.length >=1) ? posap = Batteries_cotieres[Batteries_cotieres.length-1].split(":") : x ;
		(Batteries_cotieres.length >=1) ? posap = Batteries_cotieres[Batteries_cotieres.length-1].split(":") : x ;
		(Batteries_cotieres.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(DCA.length >=1) ? posav = DCA[0].split(":") : x ;
		(DCA.length >=1) ? posap = DCA[DCA.length-1].split(":") : x ;
		(DCA.length >=1) ? posap = DCA[DCA.length-1].split(":") : x ;
		(DCA.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Missiles_balistiques.length >=1) ? posav = Missiles_balistiques[0].split(":") : x ;
		(Missiles_balistiques.length >=1) ? posap = Missiles_balistiques[Missiles_balistiques.length-1].split(":") : x ;
		(Missiles_balistiques.length >=1) ? posap = Missiles_balistiques[Missiles_balistiques.length-1].split(":") : x ;
		(Missiles_balistiques.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Tours.length >=1) ? posav = Tours[0].split(":") : x ;
		(Tours.length >=1) ? posap = Tours[Tours.length-1].split(":") : x ;
		(Tours.length >=1) ? posap = Tours[Tours.length-1].split(":") : x ;
		(Tours.length >=1) ? greenlypricewarcom(posav,posap) : x ;

		(Canons.length >=1) ? posav = Canons[0].split(":") : x ;
		(Canons.length >=1) ? posap = Canons[Canons.length-1].split(":") : x ;
		(Canons.length >=1) ? posap = Canons[Canons.length-1].split(":") : x ;
		(Canons.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Fourgons.length >=1) ? posav = Fourgons[0].split(":") : x ;
		(Fourgons.length >=1) ? posap = Fourgons[Fourgons.length-1].split(":") : x ;
		(Fourgons.length >=1) ? posap = Fourgons[Fourgons.length-1].split(":") : x ;
		(Fourgons.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Camions.length >=1) ? posav = Camions[0].split(":") : x ;
		(Camions.length >=1) ? posap = Camions[Camions.length-1].split(":") : x ;
		(Camions.length >=1) ? posap = Camions[Camions.length-1].split(":") : x ;
		(Camions.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Transporteurs_maritimes.length >=1) ? posav = Transporteurs_maritimes[0].split(":") : x ;
		(Transporteurs_maritimes.length >=1) ? posap = Transporteurs_maritimes[Transporteurs_maritimes.length-1].split(":") : x ;
		(Transporteurs_maritimes.length >=1) ? posap = Transporteurs_maritimes[Transporteurs_maritimes.length-1].split(":") : x ;
		(Transporteurs_maritimes.length >=1) ? greenlypricewarcom(posav,posap) : x ;

		(Helicopteres.length >=1) ? posav = Helicopteres[0].split(":") : x ;
		(Helicopteres.length >=1) ? posap = Helicopteres[Helicopteres.length-1].split(":") : x ;
		(Helicopteres.length >=1) ? posap = Helicopteres[Helicopteres.length-1].split(":") : x ;
		(Helicopteres.length >=1) ? greenlypricewarcom(posav,posap) : x ;

		(Marines.length >=1) ? posav = Marines[0].split(":") : x ;
		(Marines.length >=1) ? posap = Marines[Marines.length-1].split(":") : x ;
		(Marines.length >=1) ? posap = Marines[Marines.length-1].split(":") : x ;
		(Marines.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Jeeps.length >=1) ? posav = Jeeps[0].split(":") : x ;
		(Jeeps.length >=1) ? posap = Jeeps[Jeeps.length-1].split(":") : x ;
		(Jeeps.length >=1) ? posap = Jeeps[Jeeps.length-1].split(":") : x ;
		(Jeeps.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Tanks_urbains.length >=1) ? posav = Tanks_urbains[0].split(":") : x ;
		(Tanks_urbains.length >=1) ? posap = Tanks_urbains[Tanks_urbains.length-1].split(":") : x ;
		(Tanks_urbains.length >=1) ? posap = Tanks_urbains[Tanks_urbains.length-1].split(":") : x ;
		(Tanks_urbains.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Helicopteres.length >=1) ? posav = Helicopteres[0].split(":") : x ;
		(Helicopteres.length >=1) ? posap = Helicopteres[Helicopteres.length-1].split(":") : x ;
		(Helicopteres.length >=1) ? posap = Helicopteres[Helicopteres.length-1].split(":") : x ;
		(Helicopteres.length >=1) ? greenlypricewarcom(posav,posap) : x ;

		(Fregates.length >=1) ? posav = Fregates[0].split(":") : x ;
		(Fregates.length >=1) ? posap = Fregates[Fregates.length-1].split(":") : x ;
		(Fregates.length >=1) ? posap = Fregates[Fregates.length-1].split(":") : x ;
		(Fregates.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Destroyers.length >=1) ? posav = Destroyers[0].split(":") : x ;
		(Destroyers.length >=1) ? posap = Destroyers[Destroyers.length-1].split(":") : x ;
		(Destroyers.length >=1) ? posap = Destroyers[Destroyers.length-1].split(":") : x ;
		(Destroyers.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Wingfires.length >=1) ? posav = Wingfires[0].split(":") : x ;
		(Wingfires.length >=1) ? posap = Wingfires[Wingfires.length-1].split(":") : x ;
		(Wingfires.length >=1) ? posap = Wingfires[Wingfires.length-1].split(":") : x ;
		(Wingfires.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(B80_k.length >=1) ? posav = B80_k[0].split(":") : x ;
		(B80_k.length >=1) ? posap = B80_k[B80_k.length-1].split(":") : x ;
		(B80_k.length >=1) ? posap = B80_k[B80_k.length-1].split(":") : x ;
		(B80_k.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Croiseurs.length >=1) ? posav = Croiseurs[0].split(":") : x ;
		(Croiseurs.length >=1) ? posap = Croiseurs[Croiseurs.length-1].split(":") : x ;
		(Croiseurs.length >=1) ? posap = Croiseurs[Croiseurs.length-1].split(":") : x ;
		(Croiseurs.length >=1) ? greenlypricewarcom(posav,posap) : x ;
		
		(Drones_cyclopes.length >=1) ? posav = Drones_cyclopes[0].split(":") : x ;
		(Drones_cyclopes.length >=1) ? posap = Drones_cyclopes[Drones_cyclopes.length-1].split(":") : x ;
		(Drones_cyclopes.length >=1) ? posap = Drones_cyclopes[Drones_cyclopes.length-1].split(":") : x ;
		(Drones_cyclopes.length >=1) ? greenlypricewarcom(posav,posap) : x ;
					
	}
	
    if(window.location.pathname == "/game/market.php"){
        var prix = new Array();
        
        // $('.offre_prix:eq(11)').html("500 / k");

		
        $(".offre_prix").each(function(index){
            prix_texte = $(this).html();
            
            //prix.push();
            prix[index] = prix_texte.substring(0,prix_texte.length-4).replace(".","");
            
        });
        
      
        
        prix.sort(trinombres);//du plus petit au plus grand
        
        
        
        
        $(".offre_prix").each(function(index){
            
            if(prix[index] > 999){
                var val1 = prix[index].substring(0,prix[index].length-3);
                var val2 = prix[index].substring(prix[index].length-3,prix[index].length);
                
                prix[index] = val1 + "." + val2 ;
                
                //var val1 = $(this).html().substring(0,$(this).html().length-8);
                //var val2 = $(this).html().substring($(this).html().length-7,$(this).html().length);  
                //if($(this).html() ==   val1 + '.' + val2 +' / k'){
                //    $(this).css({ color: "red", background: "none" });
                //}
            }
            
            
        });
        
        var moins_chere = prix[0];
        var plus_chere = prix[prix.length-1];
        
        
        $(".offre_prix").each(function(index){
            if($(this).html() == plus_chere +' / k'){
                $(this).css({ color: "red", background: "none" });
            }
            
            
            if($(this).html() == moins_chere +' / k'){
                $(this).css({ color: "green", background: "none" });
            }
            
            // if($(this).html() == plus_chere +' / k'){
            //     $(this).css({ color: "green", background: "none" });
            //}
            
        });
        
        
    }//fin market
	
	
    
    $("#sous_menu_general").css({'display' : 'block'});
    /*
    //alliance/messagerie/tchat
    if(window.location.pathname == "/game/my_ally.php"
    || window.location.pathname == "/game/msg.php"
    || window.location.pathname == "/game/tchat.php"  ){
    
    //pour les dates.
    var date_chat_ally = $(".centre_content_texte>div>div>div>a+div");
    var date_chat_public = $(".centre_content>div>div>div>.clear+div");
    var date_msg = $('.rapport_td'); 
    
    date_chat_ally.each(function(index){
    if($(this).html().length < 6 ){
    $(this).css({'font-weight' : 'bolder'});
    }
    });
    
    date_chat_public.each(function(index){
    if($(this).html().length < 6 ){
    $(this).css({'font-weight' : 'bolder'});
    }
    });
    
    date_msg.each(function(index){
    if($(this).html().length < 6 ){
    $(this).css({'font-weight' : 'bolder'});
    }
    });
    }// FIN alliance/messagerie/tchat
    */
    
    //Batiments
    //ajout des bordure verte sur les batiments/unité faisable
    if(window.location.pathname == "/game/build.php" 
       || window.location.pathname == "/game/production.php" 
       || window.location.pathname == "/game/defense.php" 
       || window.location.pathname == "/game/army.php"  ){
        var construction = $(".btn_developper");
        
        construction.each(function(index){
            $(this).parent().parent().parent().parent().parent().css({'border' : '2px solid green', 'margin' : '-2px'});
        });
        
    }//FIN batiments
    
	if(parseInt($("#msg_non_lu_head").html()) >= 1 || parseInt($('a[href="my_ally.php"]').children().children().children().html()) >= 1){
		changetitle($("title").html());
	}
    
    
});

/*
compteur de ressources dans les rapport 

var x=[];
var z=pourcentage=0;
$(".res_bloc").each(function(index){
x.push($(this).children(".res_value").html());
}, false);

$(x).each(function(index){
x[index] = parseInt(x[index].replace(".",""));
z += x[index];
pourcentage = (z/100000)*100;
});

*/