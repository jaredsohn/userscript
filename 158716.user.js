// ==UserScript==
// @name              Wykop Kicioch 2 :)
// @namespace         http://gac3k.pl
// @description       :D :) :P ;P ;) :] ;D ;_; :_:
// @author            Dominik Gacek
// @include           http://*.wykop.pl*
// @updateURL         http://userscripts.org/scripts/source/130161.meta.js
// @version           1.1
// ==/UserScript==

var main = function () 
{	
	$(document).ready(function() 
	{
		$('.addcommentin').on('submit', function(e)
        {
			var self = $(this);
			var text = self.find('textarea[name="entry[body]"]');
			var smiles = ['( ͡° ͜ʖ ͡°)'];

			if(text.val() != '')
		    {
				var new_text = text.val() + ' ' + smiles[Math.floor(Math.random()*smiles.length)];
				text.val(new_text);
			}
		});
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)