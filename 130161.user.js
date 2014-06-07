// ==UserScript==
// @name              Wykop - Macieja naprawiacz :)
// @namespace         http://gac3k.pl
// @description       Przywraca poprzedni wygląd wykopu :)
// @author            Dominik Gacek
// @include           http://*.wykop.pl*
// @updateURL         http://userscripts.org/scripts/source/130161.meta.js
// @version           1.1
// ==/UserScript==

var main = function () 
{	
        var VERSION = 1.1;
        var URL = "http://userscripts.org/scripts/source/130161.meta.js";
        
        Storage.prototype.getDefaultValueItem = function(key, default_value)
        {
            if(localStorage.getItem(key) == null)
            {
                return default_value;
            }
            else
            {
                return localStorage.getItem(key);
            }
        } // dodaje mały ficzer do localStorage
    
	$(document).ready(function($) 
        {
            var ls = localStorage;
            
            var description = $('a.jsLink');
            
            description.replaceWith(description.text());
            
            $('#related-media').removeClass('marginbott30');
            
            $('a.playleft').removeClass('fleft')
                           .addClass(ls.getDefaultValueItem('mn-thumb-place', 'fright')); 
                           
            $('a.imagexbig').find('img').removeAttr('height').attr('width', 150);
            
            $('.relatedContainer div a').each(function() {
                $(this).removeClass('image');
                $(this).parent().find('em').removeClass('block');
            });
            
            $('div[style="margin-left: 316px;"]').css('margin', 0);
            $('.image-fake').css('min-height', '150px');
            
            $('head').append('<style type="text/css">article.entry .imagebig{ width: '+ls.getDefaultValueItem('mn-thumb-x', 104)+'px !important; height: '+ls.getDefaultValueItem('mn-thumb-y', 74)+'px !important;margin: 0 10px;} .imagexbig{ width: 170px !important; height: 130px !important;}</style>');
            
            if(document.location.pathname.match('/ludzie/settings/'))
            {
                $('.scale fieldset').prepend('<div class="fblock margin10_0 marginbott20"><h3 class="large fbold">Maciejo (Michało) naprawiacz, ustawienia</h3><p><label for="">Rozmiar miniatur na liście</label> <input id="mn-thumb-x" name="mn-thumb-x" type="number" value="'+ls.getDefaultValueItem('mn-thumb-x', 104)+'" style="width: 50px;"> x <input id="mn-thumb-y" name="mn-thumb-y" type="number" value="'+ls.getDefaultValueItem('mn-thumb-y', 74)+'" style="width: 50px;"></p><p style="margin-top: 5px"><label for="">Umiejscowienie miniatur:</label> <select id="mn-thumb-place" name="mn-thumb-place"><option value="fleft" '+ (ls.getDefaultValueItem('mn-thumb-place', 'fleft') == 'fleft' ? 'selected="selected"' : '') +'>Lewa strona</option><option value="fright" '+ (ls.getDefaultValueItem('mn-thumb-place', 'fright') == 'fright' ? 'selected="selected"' : '') +'>Prawa strona</option></select></p></div>');
            
                $(document).delegate('form', 'submit', function(e) 
                {
                   var options = $('[name*="mn-"]').serializeArray(); 

                   for(var i=0; i < options.length; i++)
                   {
                       ls.setItem(options[i].name, options[i].value);
                   }
                });
            };

	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)