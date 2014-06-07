// ==UserScript==
// @name        PicUnroll
// @namespace   PicUnroll
// @description Permet de "dérouler" un topic.
// @include     http://www.jeuxvideo.com/forums/1-*
// @version     1
// ==/UserScript==

	var carreau = new Image();
	carreau.src = 'http://image.noelshack.com/fichiers/2013/30/1374876347-1dgsv2.png';
	carreau.setAttribute("style", "margin-left:5px;cursor:pointer");
	carreau.setAttribute('class', 'icono_unroll');
	carreau.setAttribute('title', 'Dérouler ce topic');

	if (($(".JVCMaster_BTN_FAVORITESTOPIC").length)) {
		$(carreau).insertAfter(".JVCMaster_BTN_FAVORITESTOPIC");
	} else {
		var titre = document.getElementsByClassName("sujet")[0].innerHTML;
		$(".sujet").html(titre + "<img class='icono_unroll' style='cursor: pointer;margin-left:5px' src='http://image.noelshack.com/fichiers/2013/30/1374876347-1dgsv2.png'>");
	}



	function letsgo() {
			passok = 1
			var id_forum = window.location.href.split('-')[1];
			var id_topic = window.location.href.split('-')[2];
			var page = parseInt(window.location.href.split('-')[3]);
			var titre_topic = window.location.href.split('-').slice(4).join("-");
		function calcul(page) {
			var new_url = "http://www.jeuxvideo.com/forums/1-" + id_forum + "-" + id_topic + "-" + page + "-" + titre_topic;
			$.ajax({
				url: new_url,
				success: function (result) {
					msg_page = $(('.msg'), result);
					var page_check = '<ul class="msg" >⇓ <a style="font-weight:bold" href=' + new_url + '>' + page + '</a> ⇓</ul>'
					$(".msg:last").after(page_check);
					i = 0
					while (i < msg_page.length) {
					$(".msg:last").after(msg_page[i].outerHTML);
					i++;
					}
					passok = 1;
					page += 1;
					calcul(page)
				},
				error: function () {
					if (passok == 0) {
						
					} else {
						passok = 0;
						calcul(page)
					}
				}
			});
		}
		calcul(page+1);
	}




	$(".icono_unroll").on("click", letsgo);