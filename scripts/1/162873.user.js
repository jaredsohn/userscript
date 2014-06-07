// ==UserScript==
// @name        Diaspora AutoUpdater (Wai-Modus)
// @namespace   Mein eigener
// @description Aktualisiert automatisch die angezeigte Timeline.
// @include     https://*/stream
// @grant		none
// @downloadURL	https://github.com/Faldrian/diasporaAutoUpdate/raw/master/src/Diaspora_AutoUpdater_(Wai-Modus).user.js
// @updateURL	https://github.com/Faldrian/diasporaAutoUpdate/raw/master/src/Diaspora_AutoUpdater_(Wai-Modus).user.js
// @version     1.2.0
// ==/UserScript==


function wrapper() {
window.d_autoupdater = function() {} // Namespace machen

// Hält den letzten gerenderten Eintrag.
window.d_autoupdater.latest_entry = null;
window.d_autoupdater.last_marked_entry = null;
window.d_autoupdater.title = document.title;

window.d_autoupdater.setup = function() {
	// Model - Veränderungen: Damit sich das System so verhält, wie ich es brauche, muss ich einige functions überschreiben.
	window.app.stream.autoreload_on = false;
	
	window.app.stream.url = function(){
		// Lass den eigentlichen Algorithmus intakt, damit infinite-scroll nicht kaputtgeht. Bau nur nen Schalter dran.
		if(this.autoreload_on) {
			return this.basePath();
		} else {
			return _.any(this.items.models) ? this.timeFilteredPath() : this.basePath();
		}
	}

	window.app.stream.autoupdate = function() {
		// Merk dir das letzte angezeigte Element, bevor neue Beiträge geladen werden.
		if(window.d_autoupdater.latest_entry == null) {
			window.d_autoupdater.latest_entry = $('#main_stream > div > div:not(.post_preview)').first();
		}
		
		// Hole neue Beiträge und render sie
		window.app.stream.autoreload_on = true; // damit die korrekte URL genommen wird.
		window.app.stream.fetch();
		window.app.stream.autoreload_on = false; // und wieder auf "normal"
	
	}
	
	window.app.stream.on('fetched', function() {
		setTimeout(function() {
			if(window.d_autoupdater.latest_entry != null) {
				// Verstecke alle neu geladenen Beiträge
				var newPostCount = 0;
				var AvatarUrl = $('#user_menu li:nth-child(2) > a').attr('href');
				// Alle Beiträge, die neu sind und nicht unser Button sind und auch nicht die PostPreview.
				window.d_autoupdater.latest_entry.prevAll(':not(.post_preview)').not('#main_stream_refresh_button').each(function(index, element) {
					var postAvatarUrl = $(element).children().children().first().attr('href');
					// Checken, ob das dein eigener Post ist
					if(AvatarUrl != postAvatarUrl) {
						$(element).css('display','none');
						newPostCount = newPostCount + 1;
					}
				});
				
				// Preview wieder nach oben einschieben, damit die neuen Posts drunter stehen.
				$('#main_stream > div').prepend($('#main_stream > div > div.post_preview'));
				
				if(newPostCount > 0) { // Nur wenn es neue Beiträge gibt, den Button überhaupt anzeigen
					// Knopf einfügen, der das Anzeigen der Beiträge erlaubt. Vorher alten Knopf löschen.
					$('#main_stream_refresh_button').remove();
					// Knopf muss VOR die Einträge, aber NACH der Preview eingefügt werden!
					window.d_autoupdater.latest_entry.before('<div id="main_stream_refresh_button" style="margin-top:15px; border: 1px solid #3f8fba; background-color: #cae2ef; padding: 6px; text-align:center;">' + newPostCount + ' new Posts</div>');
					
					$('#main_stream_refresh_button').click(function() {
						window.d_autoupdater.latest_entry.prevAll().css('display',''); // Alte Beiträge anzeigen
						window.d_autoupdater.latest_entry.css('border-top', '1px solid #3f8fba'); // Balken drantun, damit man weiß, ab wann es neu ist.
						if(window.d_autoupdater.last_marked_entry != null) {
							window.d_autoupdater.last_marked_entry.css('border-top',''); // Balken beim alten Beitrag entfernen
						}
						window.d_autoupdater.last_marked_entry = window.d_autoupdater.latest_entry;
						window.d_autoupdater.latest_entry = null; // leeren, damit wir wieder frisch sind.
					
						$('#main_stream_refresh_button').remove(); // Button entfernen.
						
						// Titel normalisieren:
						document.title = window.d_autoupdater.title;
					});
					
					// Titel des Fensters updaten
					document.title = "(" + newPostCount + ") " + window.d_autoupdater.title
				}
				
				console.log("AutoUpdater cycle finished.");
			}
			}, 50); // EKLIG! Aber es gibt aktuell kein Event, was getriggert wird, wenn die Beiträge gerendert sind. Update: Immer noch eklig.
			
		});
	
	setInterval(window.app.stream.autoupdate, 90*1000); // 1.5min interval
	console.log("AutoUpdater eingerichtet, Timer gestartet.");
}

setTimeout(window.d_autoupdater.setup, 2000); // Ein bisschen warten, bis wir uns aktivieren.

} // end of wrapper


// Check if the page is a Diaspora-Pod (all Pods have a meta-element with "Diaspora*" as content)
var isValidPod = false;
var meta_elements = window.document.getElementsByTagName('meta');
for(key in meta_elements) {
	if(meta_elements[key].getAttribute("content") == 'diaspora*') {
		isValidPod = true;
		break;
	}
}

if(isValidPod) {
	// inject code into site context
	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ wrapper +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
}
