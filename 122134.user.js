// ==UserScript==
// @name           Make public
// @namespace      http://userstyles.org
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// ==/UserScript==

(function() {

	// Style du bouton d'affichage/masquage de la barre de recherche
	var grlButton = ".grl-button-public { \
		cursor: pointer;\
		display: block;\
		height: 27px;\
		margin-left: 147px;\
		margin-top: -13px;\
		position: absolute;\
		top: 50%;\
		width: 50px;\
	}";
	GM_addStyle(grlButton);
	
	
	// Affiche / Masque barre de recherche
	function makePublic() {
		
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://www.google.com/reader/api/0/token',
			onload: function(results) {
			
				var o={"s":"user/-/label/"+prompt("Enter tag name to make public",document.getElementById("chrome-title").innerHTML),"pub":"true","T":results.responseText},p=[];
				for(var k in o)
					p.push(k+"="+ encodeURIComponent(o[k]));
				var param=p.join("&");
				
				GM_xmlhttpRequest({
					method: "POST",
					url: 'http://www.google.com/reader/api/0/tag/edit',
					headers: {
   						"Content-Type": "application/x-www-form-urlencoded", 
   					},
   					data: param,
					onload: function(results) {
						alert(results.responseText);
					},
				});

			},
		});
		
	}
	//makePublic();

	// Nouveau bouton
	var abon = document.getElementById('lhn-add-subscription-section');
	var button = document.createElement('SPAN');
	button.className = "jfk-button-standard jfk-button grl-button-public";
	button.appendChild(document.createTextNode("Public"));
	button.addEventListener('click', makePublic, false);
	abon.appendChild(button);
	
})();