// ==UserScript==
// @name				Reload page

// @include			*

// @run-at			document-end
// @grant			none
// @require			http://code.jquery.com/jquery-1.8.3.min.js
// @version			1
// ==/UserScript==

$(document).ready(function(){
	// Temps avant rechargement de la page
	var reload_delay = 60000; // 1 min

	/* Affichage du décompte */
	var current_cpt = 0;
	var page_reload_timeout = setInterval(
		function() {
			// Affichage des secondes restantes
			if (current_cpt == 0)
			{
				$("body").prepend(
					$("<div style='width:100%; text-align:center; z-index:100000; position:absolute;'><span id='id_seconds_left'></span></div>")
				);
			}

			$('#id_seconds_left').html("Chargement dans " + (reload_delay - current_cpt) / 1000 + "s");

			current_cpt+=1000;

			// Rechargement
			if (current_cpt >= reload_delay)
			{
				window.clearInterval(page_reload_timeout);
				window.location.reload();
			}
		},
		1000 // 1s
	);
});
