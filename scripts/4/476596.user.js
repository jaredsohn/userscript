// ==UserScript==
// @name        PicStats
// @namespace   PicStats
// @description Calcule les statistiques d'un topic pour savoir qui a le mieux boosté. :)
// @include     http://www.jeuxvideo.com/forums/1-*
// @include     http://www.jeuxvideo.com/forums/3-*
// @include     http://www.jeuxvideo.com/picstats
// @version     1
// ==/UserScript==

if (document.URL.indexOf('www.jeuxvideo.com/picstats') >= 0) {
	var url = sessionStorage["url_stats"] + "";
	if (url != "undefined") {
		document.getElementsByClassName('bloc_inner')[0].getElementsByClassName('alerte')[0].innerHTML = "<FONT size='4'>Le calcul des statistiques est en cours.</FONT>";
		$(document.getElementsByClassName('bloc_inner')[0].getElementsByClassName('lien_base')[0]).remove();
		document.title = "PicStats : En cours"
		var id_forum = url.split('-')[1];
		var id_topic = url.split('-')[2];
		var titre_topic = url.split('#form_post')[0].split('-').slice(4).join("-");
		document.getElementsByClassName('titre_page')[0].innerHTML = '<font size="3"><a target="_blank" href="' + 'http://www.jeuxvideo.com/forums/1-' + id_forum + '-' + id_topic + '-1-' + titre_topic + '">' + sessionStorage["titre_stats"] + '</a></font>';
		document.getElementsByClassName('titre_page')[0].removeAttribute('class');
		newElement = document.createElement("p");
		newElement.id = "page_en_cours";
		newElement.innerHTML = "<FONT size='2' color='black'>Initialisation...</FONT>";
		document.getElementsByClassName('alerte')[0].appendChild(newElement);
		passok = 1;
		pseudos = {};

		jQuery.fn.selectText = function () {
			var doc = document,
				element = this[0],
				range, selection;
			if (doc.body.createTextRange) {
				range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
			} else if (window.getSelection) {
				selection = window.getSelection();
				range = document.createRange();
				range.selectNodeContents(element);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		};

		function selectionner() {
			$('.bloc_inner p:eq(2)').selectText();
		}

		function calcul(page) {
			var new_url = "http://www.jeuxvideo.com/forums/1-" + id_forum + "-" + id_topic + "-" + page + "-" + titre_topic;
			$.ajax({
				url: new_url,
				success: function (result) {
					if (page == 1) {
						document.getElementById('page_en_cours').innerHTML = "<FONT size='2' color='black'>  Page n°<font id='num_page'>" + page + "</font> actuellement analysée.</FONT><br><br><img src='http://image.noelshack.com/fichiers/2013/26/1372609034-loading.gif' />"
					} else {
						document.getElementById('num_page').innerHTML = page;
					}
					pseudos_page = $(('.pseudo strong'), result);
					var i = 0;
					while (i < pseudos_page.length) {
						if (isNaN(pseudos[pseudos_page[i].innerHTML])) {
							pseudos[pseudos_page[i].innerHTML] = 1;
						} else {
							pseudos[pseudos_page[i].innerHTML] += 1;
						}
						i++;
					}
					passok = 1;
					page += 1;
					calcul(page)
				},
				error: function () {
					if (passok == 0) {
						document.title = "PicStats : /!\\ TERMINÉ /!\\"
						document.getElementsByClassName('bloc_inner')[0].getElementsByClassName('alerte')[0].getElementsByTagName('FONT')[0].innerHTML = "Le calcul des statistiques est terminé !";
						if (page <= 2) {
							document.getElementById('page_en_cours').innerHTML = "<FONT size='2' color='black'>" + parseInt(page - 1) + " page a été analysée !</FONT><br><br><INPUT type='button' value='Tout sélectionner' id='bouton_cc'>";
						} else {
							document.getElementById('page_en_cours').innerHTML = "<FONT size='2' color='black'>" + parseInt(page - 1) + " pages ont été analysées !</FONT><br><br><INPUT type='button' value='Tout sélectionner' id='bouton_cc'>";
						}
						document.getElementById('bouton_cc').addEventListener("click", selectionner, false);
						var liste_ordre = [];
						var liste_tolowercase = []
						for (var x in pseudos) {
							if ($.inArray(x.toLowerCase(), liste_tolowercase) == -1) {
								liste_ordre.push([pseudos[x], x])
								liste_tolowercase.push(x.toLowerCase());
							} else {
								index = $.inArray(x.toLowerCase(), liste_tolowercase);
								if (parseInt(pseudos[x]) >= parseInt(liste_ordre[index][0])) {
									liste_ordre[index] = [parseInt(pseudos[x]) + parseInt(liste_ordre[index][0]), x];
								} else {
									liste_ordre[index] = [parseInt(pseudos[x]) + parseInt(liste_ordre[index][0]), liste_ordre[index][1]];
								}
							}
						}

						liste_ordre.sort(function (a, b) {
							if (parseInt(a[0]) > parseInt(b[0])) {
								return -1;
							} else if (parseInt(a[0]) < parseInt(b[0])) {
								return 1;
							} else {
								alpha = [a[1].toLowerCase(), b[1].toLowerCase()].sort();
								if (a[1].toLowerCase() == alpha[1]) {
									return 1;
								} else {
									return -1;
								}
							}
						});
						var liste = "<br>";
						var k = 0;
						var total = 0;
						var pts_previous = 0
						while (k < liste_ordre.length) {
							if (liste_ordre[k][0] != pts_previous) {
								var place = k + 1;
								var pts_previous = liste_ordre[k][0];
							}
							total += liste_ordre[k][0];
							liste += place + ". " + liste_ordre[k][1] + " ⇒ " + liste_ordre[k][0] + "<br>";
							k++;
						}
						liste += "<br><br> Total de pseudos : " + liste_ordre.length + "<br>Total de messages : " + total;
						var elem_list = document.createElement("p");
						elem_list.innerHTML = liste;
						document.getElementsByClassName('bloc_inner')[0].appendChild(elem_list);
					} else {
						passok = 0;
						calcul(page)
					}
				}
			});
		}
		calcul(1);
	}
} else {
	var pique = new Image();
	pique.src = 'http://image.noelshack.com/fichiers/2013/16/1366561498-13z7y2.png';
	pique.setAttribute("style", "margin-left:5px;cursor:pointer");
	pique.setAttribute('class', 'icono_stats');
	pique.setAttribute('title', 'Calculer les statistiques de ce topic');

	if (($(".JVCMaster_BTN_FAVORITESTOPIC").length)) {
		$(pique).insertAfter(".JVCMaster_BTN_FAVORITESTOPIC");
	} else {
		var titre = document.getElementsByClassName("sujet")[0].innerHTML;
		$(".sujet").html(titre + "<img class='icono_stats' style='cursor: pointer;margin-left:5px' src='http://image.noelshack.com/fichiers/2013/16/1366561498-13z7y2.png'>");
	}



	function letsgo() {
		var url = window.location.href;
		sessionStorage["url_stats"] = url;
		var title = document.getElementsByClassName('sujet')[0].innerHTML;
		sessionStorage["titre_stats"] = title.substring(6)
		window.open('http://www.jeuxvideo.com/picstats')
	}




	$(".icono_stats").on("click", letsgo);
}