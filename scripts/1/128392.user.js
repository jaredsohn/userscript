// ==UserScript==
// @name              Belkator
// @namespace         http://gac3k.pl
// @description       Dodaje
// @author            Dominik Gacek
// @version           1.1.5
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () 
{	
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
           //var nickname = $('a[title="Przejdź do swojego profilu"]').text();
           var nickname = $('.avatar a').attr('title');
           var grupy = new Array();
           var ls = localStorage; 
           var excluded_groups = ls.getDefaultValueItem('excluded_groups', 'Wybierz grupy, z których nie chcesz widzieć na liście, oddziel przecinkiem')
                                   .split(',')
                                   .map($.trim);

           if(ls.getItem('groups') == null)
           {
               $.ajax({
                    method: 'GET',
                    async: false,
                    url: '/ludzie/grupy/' + nickname,
                    success: function(html) {
                        if($('ul.peoplewall a', html).length)
                        {
                            $('ul.peoplewall a[title!="Wypisz się"]', html).each(function()
                            {
                                if($.inArray($.trim($(this).text()), excluded_groups) < 0)
                                {
                                    var _array = 
                                    {
                                        'href'  :   $(this).attr('href'),
                                        'title' :   $.trim($(this).text())
                                    };

                                    grupy.push(_array);
                                }
                            });
                            
                            ls.setItem('groups', JSON.stringify(grupy));
                        }
                    },
                    error: function (xhr){
                        console.log(xhr.status + ' ' + xhr.statusText);
                    }
                });
            }
            else
            {
                grupy = JSON.parse(ls.getItem('groups'));
            }
            
            //console.log(grupy);
            var category_dropdown = '<div class="fleft"><a href="http://wykop.pl/ludzie/grupy/'+ nickname +'" class="tip fleft cfff tab fbold" title="grupy użytkownika '+ nickname +'" id="group-switcher">Moje grupy ▼</a>';
		category_dropdown += '<ul class="abs bgfff layer shadow normal dnone fchbrnone" id="groups-container" style="margin-top: 37px; width: 200px;">';
                
                $(grupy).each(function(index, element) 
                {
                    category_dropdown += '<li class="brtope8"><a href="'+ element.href +'" class="block lheight20 boxh tdnone pding3_10 fbold" title="Przejdź do grupy">'+ element.title +'</a></li>';
                });

		category_dropdown += '</ul>';
                category_dropdown += '</div>';
            
            $('nav.main.medium.rel a:eq(4)').after(category_dropdown);
            
            $('#group-switcher, #groups-container').live('mouseover', function() {$('#groups-container').removeClass('dnone');});
            $('#group-switcher, #groups-container').live('mouseout', function() {$('#groups-container').addClass('dnone');});    
	
            if(document.location.pathname.match('/ludzie/settings/'))
            {
                $('.scale fieldset').prepend('<h3 class="large fbold">Belkator</h3> <form method="post" class="default blackListForm"><div class="fblock margin10_0"><input name="excluded_groups" type="text" class="large vtop marginright5" value="'+ ls.getItem('excluded_groups') +'" placeholder="Wyklucz te grupy, oddzielaj przecinkiem..." style="width: 350px;"></div></form>');

                $(document).delegate('form', 'submit', function(e) 
                {
                    var _array = $('input[name="excluded_groups"]').serializeArray();
                    console.log(_array[0].value)
                    ls.setItem('excluded_groups', _array[0].value);
                    
                    ls.removeItem('groups');
                });
            }
     });
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)