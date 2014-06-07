// ==UserScript==
// @name        ImmoWeb
// @namespace   ImmoWeb
// @description ImmoWeb showing pictures and map improvements
// @include     http://www.immoweb.be/
// @version     1
// ==/UserScript==

(function ()
{
	if (location.hostname.indexOf('www.immoweb.be') != -1) {
		if (location.href.indexOf('Results.Map') != -1) {
			window.onscroll = function () {
				showEstate = function (id) {
					window.open('http://www.immoweb.be/en/Rent.Estate.cfm?IdBien=' + id, '_blank');
				};
			}
		}
		
		if (location.href.indexOf('Rent.Estate.cfm') != -1) {
			var id = location.search.split('IdBien=')[1].split('&')[0];
			
			var temp_f;
			if( window.onload ) {
				temp_f = window.onload;
			}

			window.onload = function () {
				if( temp_f ) {
					temp_f();
				}
				
				for (var i = 1; i <= 15; i++) {
					var url = 'http://pictures.immoweb.be/photos/' + id[0] + id[1] + '/' + id[2] + id[3] + '/' + id + '_' + i + '.jpg';
					
					var contentElem = document.getElementById('content');
					
					var image = document.createElement('img');
					image.setAttribute('src', url);
					image.setAttribute('style', 'padding: 20px;');
					
					contentElem.appendChild(image);
				}
			};
		}
	}
})();
  
  