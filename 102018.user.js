// ==UserScript==
// @name           Fourmizzz Extender
// @namespace      Roromix
// @description	   Fourmizzz Extender pour Firefox
// @version        1.9.1
// @author         Roromix

// @include        http://*fourmizzz.fr/*
// ==/UserScript==

var Version = '1.9';

/*=================================================================================================================
 Site Web : http://www.roromix.net/fourmizzz-extender
/*=================================================================================================================*/
// VARIABLES
// Chargement des URL de fichiers internes
var img_chrono = 'http://www.roromix.net/img/fourmizzz_extender/chrono.png';
var img_warning = 'http://www.roromix.net/img/fourmizzz_extender/warning.png';

var res = new Array(3);
var prod = new Array(2);
var unit = new Array(12);
var pseudo = '';
var tdc = 0;
var tpschasse = 0;
var retour = 0;
var max_n = 0;
var max_m = 0;

// JQUERY
var $;

// Add jQuery
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
		handlePages();
    }

	
// DEBUT DU SCRIPT
function handlePages()
{
	if ($('.boite_connexion').length) {
		$('.boite_connexion').find('#serveur').val('s3.fourmizzz.fr');
		$('.boite_drapeaux').css({background:'url()',top:'20px'});
	}
	else {
		if ($('#menu_colonne').length && !$('#menu_colonne #lien_compte').length) {
			$('#menu_ligne li:last').before('<li><a href="blocnote.php"><img src="http://img3.fourmizzz.fr/images/icone/feuille.gif" width="14" height="17" title="Bloc Note" alt="Bloc Note" style="margin-top:5px;"/></a></li>');
		}	
	}
	
	if ($('.boite_info').length) {
		$('.boite_info td[title*="%"]').each(function() {
			var title = $(this).attr('title');
			if (!$(this).find('div.jauge').length) {
				$(this).find('div').append('<div class="jauge" title="'+title+'"><div class="plein" title="'+title+'" style="width : '+title.replace(/[^0-9]/g, '')+'% ; "></div></div>');
			}
		});
	}
	
	if ($('.banniere').length) {
		$('.banniere').remove();
	}
	
	if ($('.petite_pub').length) {
		$('.petite_pub').remove();
	}

    // URL courante
    var url = document.URL;
		
	// Page Reine
	if (url.indexOf("Reine.php", 0) > 0) {
		// Affichage du nombre max d'unités
		aff_max_units();
		// Affichage de la quantité d'unités
		aff_qte_units();
		// Demander confirmation d'annulation
		var link = $('a[href*="AnnulerPonte"]');
		var location = link.attr('href');
		link.attr('href', 'javascript:void(0);');
		link.bind('click', function() {
			if(confirm("Êtes-vous sûr de vouloir annuler la dernière ponte ?")) {
				document.location = location;
			}
		});
        $('input[name="nombreDePonte"]').bind('keyup', function(i)
        {
            var quantite = parseInt($(this).val().replace(/[^0-9]/g, ''));
            if (quantite >= 1) {
                var time = $(this).closest('tbody').find('.temps').text();
                var m = time.indexOf('m');
                var s = time.indexOf('s');
                var temps = parseFloat(0);
                if (m > -1) {
                    var min = parseInt(time.substring(0,m));
                    temps = parseFloat(temps+min*60);
                }
                if (s > -1) {
                    if (m > -1) {
                        var sec = parseFloat(time.substring(m+2,s).replace(/[^0-9.]/g, ''));
                    }
                    else {
                        var sec = parseFloat(time.replace(/[^0-9.]/g, ''));
                    }
                    temps = (temps+sec);
                }
                temps = Math.ceil(temps*quantite);
                if (!$(this).closest('tbody').find('.duree').length) {
                    $(this).closest('tr').after('<tr><td><div class="icone_temps"><img alt="Chrono :" src="' + img_chrono + '" width="17" height="17" title="Temps"></div></td><td style="min-width:70px"><div class="duree"></div></td></tr>');
                }
                $(this).closest('tbody').find('.duree').text(calculerTempsdeponte(temps));
            }
            else {
                $(this).closest('tbody').find('.duree').closest('tr').remove();
            }
        });
	}
	
	if (url.indexOf("construction.php", 0) > 0) {
		// Affichage du temps d'attente pour construire un batiment
		aff_bats_chrono();
		// Demander confirmation d'annulation
		var link = $('a[href*="annuler"]');
		var location = link.attr('href');
		link.attr('href', 'javascript:void(0);');
		link.bind('click', function() {
			if(confirm("Êtes-vous sûr de vouloir annuler cette construction ?")) {
				document.location = location;
			}
		});
	}
	
	if (url.indexOf("laboratoire.php", 0) > 0) {
		// Affichage du temps d'attente pour faire une recherche
		aff_labs_chrono();
		// Demander confirmation d'annulation
		var link = $('a[href*="annuler"]');
		var location = link.attr('href');
		link.attr('href', 'javascript:void(0);');
		link.bind('click', function() {
			if(confirm("Êtes-vous sûr de vouloir annuler cette recherche ?")) {
				document.location = location;
			}
		});
	}

	if (url.indexOf("Ressources.php", 0) > 0) {
		tdc = parseInt($('#ouvrieresAuTravail + span:first').text().replace(/[^0-9]/g, ''));
		
		if (!$('a[href*="#max"]').length) {
			getRessources();
            $('#RecolteNourriture').after('<span id="max_n" style="cursor:pointer"></span>');
			$('#RecolteMateriaux').after('<span id="max_m" style="cursor:pointer"></span>');

			var rm = parseInt($('#RecolteMateriaux').val().replace(/[^0-9]/g, ''));
			if ((tdc-rm) > 0) {
				max_n = (((tdc-rm) <= res[0])?(tdc-rm):res[0]);
				$('#RecolteNourriture').next('#max_n').text('(max: ' + nombreFormate(max_n) + ')');
			}
			var rn = parseInt($('#RecolteNourriture').val().replace(/[^0-9]/g, ''));
			if ((tdc-rn) > 0) {
				max_m = (((tdc-rn) <= res[0])?(tdc-rn):res[0]);
				$('#RecolteMateriaux').next('#max_m').text('(max: ' + nombreFormate(max_m) + ')');
			}
			$('#RecolteNourriture').bind('keyup', function() {
				var rn = parseInt($('#RecolteNourriture').val().replace(/[^0-9]/g, ''));
				max_m = (((tdc-rn) <= res[0])?(tdc-rn):res[0]);
				$('#RecolteMateriaux').next('#max_m').text('(max: ' + nombreFormate(max_m) + ')');
			});
			$('#RecolteMateriaux').bind('keyup', function() {
				var rm = parseInt($('#RecolteMateriaux').val().replace(/[^0-9]/g, ''));
				max_n = (((tdc-rm) <= res[0])?(tdc-rm):res[0]);
				$('#RecolteNourriture').next('#max_n').text('(max: ' + nombreFormate(max_n) + ')');
			});
			$('#max_n').bind('click', function() {
				$('#RecolteNourriture').val(max_n).keyup();
			});
			$('#max_m').bind('click', function() {
				$('#RecolteMateriaux').val(max_m).keyup();
			});
        }
		
		if (!$('#tempsDeChasse').length) {
			$('input[name="AgrandirTerrain"]').after('<br/>Cette chasse durera : <span id="tempsDeChasse"></span>');
				var bonus = $('#AcquerirTerrain').attr('onkeyup');
				var debut = bonus.indexOf("'")+1;
				var fin = bonus.indexOf("',");
				tpschasse = bonus.substring(debut, fin);
			$('#AcquerirTerrain').removeAttr('onkeyup');
			$('#AcquerirTerrain').bind('keyup', function() {
				calculTempsDeChasse(tpschasse, tdc);
			});
		}
	}
	
	aff_fin_chronos();
	aff_version();
}

// Affichage du nombre max possible
function aff_max_units() {
	getRessources();
	$('.nourriture:not(:first)').each(function() {
		var val = parseInt($(this).text());
		if (Math.floor(res[1]/val) > 0) {
			if ($(this).parent().parent().next().find('input').length > 0) {
				$(this).append('<span style="cursor:pointer">(max: ' + nombreFormate(Math.floor(res[1]/val)) + ')</span>');
				$(this).find('span').bind('click', function() {
					var value = $(this).text().replace(/[^0-9]/g, '');
					$(this).parent().parent().parent().next().find('input').val(value).keyup();
				});
			}
		}
	});
}

// Affichage de la quantité en face chaque nom d'unité
function aff_qte_units() {
	getRessources();
	getUnits();
	$('h4.titre:first').append(" (" + nombreFormate(res[0]) + ")");
	$(document).ajaxStop(function() {
		$('h4.titre:not(:first)').each(function(i) {
			$(this).append(" (" + nombreFormate(unit[i]) + ")");
		});
	});
}

// Affichage du temps d'attente pour construire un batiment
function aff_bats_chrono() {
	getRessources();
	getProduction();
	$(document).ajaxStop(function() {
		if(prod) {
			$('tr[id*="batiment"]').each(function(i) {
				var notok = $(this).find('.verificationNonOK').length;
				var m = $(this).find('.materiaux');
				if(m.css("color").toString() != "rgb(0, 0, 0)") {
					var mat = parseInt(m.text().replace(/[^0-9]/g, ''))-res[2];
					if (prod[1] != 0) {
						var time = (mat/prod[1])*24*3600;
						if (time <= retour) {
							var temps = retour;
						}
						else {
							var temps = Math.ceil(time/1800)*1800-(1800-retour);
						}
						m.closest('tr').after('<tr><td><div class="icone_temps"><img alt="Chrono :" src="' + img_chrono + '" width="17" height="17" title="Temps"></div></td><td style="min-width:70px"><div id="chrono_' + i + '" class="temps" ' + ((notok)?'style="color: #c5130f;" title="Construction(s)/Recherche(s) requis !"':"") + '></div></td></tr>');
						chrono(temps, "chrono_" + i);
					}
				}
			});
		}
	});
}

// Affichage du temps d'attente pour faire une recherche
function aff_labs_chrono() {
	getRessources();
	getProduction();
	$(document).ajaxStop(function() {
		if(prod) {
			$('table[cellpadding="3"] > tbody > tr:even').each(function(i) {
				var notok = $(this).find('.verificationNonOK').length;
				var o = $(this).find('.ouvriere');
				var n = $(this).find('.nourriture');
				var m = $(this).find('.materiaux');
				var time0 = 0;
				var time1 = 0;

				if ((res[0]-tdc-parseInt(o.text().replace(/[^0-9]/g, ''))) < 0) {
					o.append('<img src="'+img_warning+'" alt="Votre TDC ne sera plus exploité à 100%" title="Votre TDC ne sera plus exploité à 100%"/>');
				}
				
				if (o.css("color").toString() == "rgb(0, 0, 0)" && (n.css("color").toString() != "rgb(0, 0, 0)" || m.css("color").toString() != "rgb(0, 0, 0)")) {					
					
					if (n.css("color").toString() != "rgb(0, 0, 0)") {
						var nou = parseInt(n.text().replace(/[^0-9]/g, ''))-res[1];
						if(prod[0] != 0)
							var time0 = (nou/prod[0])*24*3600;
					}
					if (n.css("color").toString() != "rgb(0, 0, 0)") {
						var mat = parseInt(m.text().replace(/[^0-9]/g, ''))-res[2];
						if(prod[1] != 0)
							var time1 = (mat/prod[1])*24*3600;
					}
					
					if (time0 > 0 || time1 > 0) {
						var time = ((time0 > time1)?time0:time1);
						if (time <= retour) {
							var temps = retour;
						}
						else {
							var temps = Math.ceil(time/1800)*1800-(1800-retour);
						}
						m.closest('tr').after('<tr><td><div class="icone_temps"><img alt="Chrono :" src="' + img_chrono + '" width="17" height="17" title="Temps"></div></td><td style="min-width:70px"><div id="chrono_' + i + '" class="temps" ' + ((notok)?'style="color: #c5130f;" title="Construction(s)/Recherche(s) requis !"':"") + '></div></td></tr>');
						chrono(temps, "chrono_" + i);
					}
				}
			});
		}
	});
}

// Affichage de la date de fin des chronos
function aff_fin_chronos() {
	$('span[id*="ponte_"]').each(function(i) {
		var ponte = $(this).attr('id');
		var time = $('script:contains(' + ponte + ')').text();
		$(this).after('<span> (' + end(time) + ')</span>');
	});
	$('span[id*="batiment_"]').each(function(i) {
		var batiment = $(this).attr('id');
		var time = $('script:contains(' + batiment + ')').text();
		$(this).after('<span> (' + end(time) + ')</span>');
	});
	$('span[id*="recherche_"]').each(function(i) {
		var recherche = $(this).attr('id');
		var time = $('script:contains(' + recherche + ')').text();
		$(this).after('<span> (' + end(time) + ')</span>');
	});
	$('span[id*="attaque_"]').each(function(i) {
		var attaque = $(this).attr('id');
		var time = $('script:contains(' + attaque + ')').text();
		$(this).after('<span> (' + end(time) + ')</span>');
	});
	$('span[id*="chasse_"]').each(function(i) {
		var chasse = $(this).attr('id');
		var time = $('script:contains(' + chasse + ')').text();
		$(this).after('<br/><span> (' + end(time) + ')</span>');
	});
	$('#retour_ouvrieres').each(function(i) {
		var ponte = $(this).attr('id');
		var time = $('script:contains(retour_ouvrieres)').text();
		$(this).after('<br/><span> (' + end(time) + ')</span>');
	});
}

function end(time) {
		var debut = time.indexOf('(')+1;
		var fin = time.indexOf(',');
		time = time.substring(debut, fin)*1000;
		var date = new Date();
		var auj_j = date.getDate();
		var auj_m = date.getMonth()+1;
		var auj_a = 1900+date.getYear();
		var ms = date.getTime()+time;
		date.setTime(ms);
		var j = date.getDate();
		var m = date.getMonth()+1;
		var a = 1900+date.getYear();
		var h = date.getHours();
		var min = date.getMinutes();
		var s = date.getSeconds();
		var fin = ((auj_j==j && auj_m==m && auj_a==a)?'aujourd\'hui':((j<10)?'0'+j:j)+'/'+((m<10)?'0'+m:m)+'/'+a)+' à '+((h<10)?'0'+h:h)+'h '+((min<10)?'0'+min:min)+'m '+((s<10)?'0'+s:s)+'s';
	return fin;
}

// Obtention de la production en cours
function getProduction() {
	$.ajax({
		url: '/Ressources.php',
		success: function(data) {
			prod[0] = parseInt($(data).find('#RecolteNourriture').val().replace(/[^0-9]/g, ''))*48;
			prod[1] = parseInt($(data).find('#RecolteMateriaux').val().replace(/[^0-9]/g, ''))*48;
			tdc = parseInt($(data).find('#ouvrieresAuTravail').next('span:first').text().replace(/[^0-9]/g, ''));
			var time = $(data).find('#retour_ouvrieres').text();
			var m = time.indexOf('m');
			var s = time.indexOf('s');
			var temps = 0;
			if (m > -1) {
				var min = parseInt(time.substring(0,m));
				temps = temps+min*60;
			}
			if (s > -1) {
				if (m > -1) {
					var sec = parseInt(time.substring(m+2,s));
				}
				else {
					var sec = parseInt(time.replace(/[^0-9]/g, ''));
				}
				temps = temps+sec;
			}
			retour = temps;
		}
	});
}

// Obtention de la quantité d'unités
function getUnits() {
	$.ajax({
		url: '/Armee.php',
		success: function(data) {
			$(data).find('.simulateur tr[align="center"]').each(function(i){
				unit[i] = 0;
				for(j=1; j<=5; j++) {
					var val = $(this).find('td:eq(' + j + ')').text().replace(/[^0-9]/g, '');
					if (val != '') {
						unit[i] += parseInt(val);
					}
				}
			});
		}
	});
}

// Obtention des ressources disponibles
function getRessources() {
	res[0] = parseInt($('.ouvriere:first').text().replace(/[^0-9]/g, ''));
	res[1] = parseInt($('.nourriture:first').text().replace(/[^0-9]/g, ''));
	res[2] = parseInt($('.materiaux:first').text().replace(/[^0-9]/g, ''));
}

function chrono(zetime, nom_id) {

    var nid = nom_id;

    if (zetime>0) {
    	var jours = Math.floor(zetime / 86400);
    	var time = zetime-  jours*86400;
        var heures = Math.floor(time / 3600);
        var minutes = Math.floor( ( (time / 3600) - Math.floor(time / 3600) ) * 60);
        var secondes = Math.floor(time - ((Math.floor(time / 60)) * 60));
		var message = "";
		if (jours > 0)
			message += jours + "j ";
		if (heures > 0)
			message += heures + "h ";
		if (minutes > 0)
			message += minutes + "m ";
		if (secondes > 0)
			message += secondes + "s";
		$("#"+nid).text(message);
		var restant = zetime - 1;
		setTimeout("chrono(" + restant + ",'" + nid + "')", 1000);
    }
    else {
        $("#"+nid).text("0s");
    }
}

function nombreFormate(entier)
{
	var entier = entier.toString();
	var separator = " ";
	var regexp = new RegExp ( "\\B(\\d{3})(" + separator + "|$)" );
	do
	{
		entier = entier.replace ( regexp, separator + "$1" );
	}
	while ( entier.search ( regexp ) >= 0 )
	return entier;
}

function calculerTempsdeponte(zetime) {
    var jours = Math.floor(zetime / 86400);
    var time = zetime-  jours*86400;
    var heures = Math.floor(time / 3600);
    var minutes = Math.floor( ( (time / 3600) - Math.floor(time / 3600) ) * 60);
    var secondes = Math.floor(time - ((Math.floor(time / 60)) * 60));
    var message = "";
    if (jours > 0)
        message += jours + "j ";
    if (heures > 0)
        message += heures + "h ";
    if (minutes > 0)
        message += minutes + "m ";
    if (secondes > 0)
        message += secondes + "s";
    return message;
}

function calculTempsDeChasse(bonus, terrainActuel) {

	var acquerirTerrain = parseInt($('#AcquerirTerrain').val().replace(/[^0-9]/g, ''));     

	if ( acquerirTerrain && acquerirTerrain >= 0)
    {
		$('#AcquerirTerrain').val(nombreFormate(acquerirTerrain));

		var tempsBase = parseInt(terrainActuel) + acquerirTerrain;
		var tempsFinal = Math.ceil( tempsBase * Math.pow(0.9 , parseInt(bonus) ) );
		var zetime = tempsFinal;
				
		var jours = Math.floor(zetime / 86400);
		var temp = zetime-  jours*86400;
		var heures = Math.floor(temp / 3600);
		var minutes = Math.floor( ( (temp / 3600) - Math.floor(temp / 3600) ) * 60);
		var secondes = temp - ((Math.floor(temp / 60)) * 60);
		var message = "";
		if(jours>=1){ message+= jours + "J "; }
		if(heures>=1){ message+= heures + "H "; }
		if(minutes>=1 ){ message += minutes + "m "; }
		if(secondes>=1 ){ message += secondes + "s"; }
		$('#tempsDeChasse:last').text(message);
	}
	else {
        acquerirTerrain = "";
		$('#AcquerirTerrain').val(acquerirTerrain);
		$('#tempsDeChasse:last').text('');
    }
}

function aff_version() {
	$('.logo').append('<div style="float:right;color:#fff;font-weight:bold">Fourmizzz Extender v' + Version + ' <a href="http://www.roromix.net/fourmizzz-extender/" target="_blank" style="color:blue">[by Roromix]</a></div>');
}