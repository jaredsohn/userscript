// ==UserScript==
// @name              Wykop - Mikroblog Tag Catcher (wersja 24/7)
// @namespace         http://gac3k.pl
// @description       Wyłapuje tagi na mikroblogu, i gdy jakiś znajdzie, wysyła użytkownikowi powiadomienie ;)
// @author            Dominik Gacek
// @updateURL         http://userscripts.org/scripts/source/132393.meta.js
// @version           1.3.2
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
        
        var observed_tags = localStorage.getDefaultValueItem('observed_tags', 'jakisinnnynieistniejacy,smiesznytag').split(',').map($.trim).join(',');
        var get_url, tag_image, tag_hover_image, html;

        var count_new_tags = function()
        {
            var last_check_timestamp = parseInt(localStorage.getDefaultValueItem('last_check_timestamp', 0));
            var surl =  "http://techtube.pl/gac3k/tags/count_new?callback=jsonpcallback" +
                        "&observed_tags="+ observed_tags +"&last_timestamp=" + last_check_timestamp;
                
            $.ajax({
                url: surl,
                crossDomain : true,
                dataType: "jsonp",
                timeout:    10000,
                //jsonp : "callback",
                success: function(result)
                {
                    if(result.count > 0)
                    {
                        $('#observedTagsCount').text(result.count);
                    }
                    else
                    {
                        $('#observedTagsCount').empty();
                    }
                    
                    setTimeout(count_new_tags, 40000);

                    prependNumberToTitle(result.count);
                },
                error:  function(xhr)
                {
                    console.log(xhr);
                    if(xhr.statusText == 'timeout')
                    {
                        console.log('Przekroczono maksymalny czas na odpowiedź serwera wynoszący 8 sekund, być może jest to chwilowy problem, ale równie dobrze może trwać i pół dnia ;)')
                    }
                    else
                    {
                        console.log(xhr.statusCode + ' ' + xhr.statusText);
                    }
                }
            });
        }
        
        count_new_tags();
        
        tag_image = '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%3D';
        tag_hover_image = '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%3D%3D';
            
        html = '<div class="quickpoint fright rel">' +
		'<a title="Przejdź na mikroblog" id="toggleTagsGet" class="fright cfff tdnone quickicon tcenter" href="http://wykop.pl/mikroblog">' +
		'<span class="icon miniwall" style="background: url(data:image/png;base64,'+ tag_image +') no-repeat 5px -2px; line-height: 32px;"><span style="visibility: hidden;">MTC</span></span>'+
                '<span class="abs count x-small br3" id="observedTagsCount" style="right:0;top:0;background:#B00;padding:0 3px;line-height:14px;-webkit-box-shadow:1px 1px 0 0 #32688f;-moz-box-shadow:1px 1px 0 0 #32688f;box-shadow:1px 1px 0 0 #32688f;"></span>' +
		'</a>' +
                '<div class="abs bgfff layer shadow pding10 dnone" id="showTagsContainer" style="margin-top: 35px; width: 350px; right: -30px;">'+
		'<div class="fblock overa h100" id="tagsContainer" style="max-height: 250px; ">' +  
                '</div></div>';
                                            
        $('nav.main.medium.rel').append(html);
        
        $(document).delegate('#toggleTagsGet', 'mouseover', function() 
        {
               $(this).find('span:first').css('background','url(data:image/png;base64,'+ tag_hover_image +') no-repeat 5px -2px');
               
        }).delegate('#toggleTagsGet', 'mouseout', function() 
        {
                if(!$('#showTagsContainer').is(':visible')) 
                {
                    $(this).find('span:first').css('background','url(data:image/png;base64,'+ tag_image +') no-repeat 5px -2px');
                }
        }).delegate('#toggleTagsGet', 'click', function(e) 
        {
            $('#showTagsContainer').toggle().html('<div class="ajaxloaderbg"></div>');
            
            if($('#showTagsContainer').is(':visible'))
            {
                get_url =  "http://techtube.pl/gac3k/tags/get_new?callback=jsonpcallback" +
                           "&observed_tags="+ observed_tags +"&last_timestamp=" + parseInt(localStorage.getDefaultValueItem('last_check_timestamp', 0));
                
                $.ajax({
                    url: get_url,
                    crossDomain : true,
                    dataType: "jsonp",
                    //jsonp : "callback",
                    timeout :   10000,
                    success: function(result)
                    {
                        $('#showTagsContainer').html(result.html);
                        $('#tagsContainer').css('max-height', '230px');
                    },
                    error:  function(xhr)
                    {
                        if(xhr.statusText == 'timeout')
                        {
                            console.log('Przekroczono maksymalny czas na odpowiedź serwera wynoszący 8 sekund, być może jest to chwilowy problem, ale równie dobrze może trwać i pół dnia ;)')
                            $('#showTagsContainer').html('Przekroczono maksymalny czas na odpowiedź serwera wynoszący 10 sekund, być może jest to chwilowy problem, ale równie dobrze może trwać i pół dnia ;) Dla pewności <strong>spróbuj ponownie</strong>');
                        }
                        else
                        {
                            console.log(xhr.statusCode + ' ' + xhr.statusText);
                            $('#showTagsContainer').html('Wystąpił nieznany błąd, komunikat błędu <code>'+xhr.statusText+'</code> przekaż go autorowi skryptu, może będzie w stanie pomóc ;)');
                        }

                    }
                });
                
                $('#observedTagsCount').empty();
                prependNumberToTitle(0);
                localStorage.setItem('last_check_timestamp', Math.round(new Date().getTime() / 1000));
                
                $(this).addClass('active');
                $(this).trigger('mouseover');
            }
            else
            {
                $(this).trigger('mouseout');
                $(this).removeClass('active');
            }
                    
            e.preventDefault();
        });
        

        if(document.location.pathname.match('/ludzie/settings/'))
        {   
            $('head').append('<style type="text/css">.ac_results{border:1px solid gray;background-color:white;padding:0;margin:0;list-style:none;position:absolute;z-index:10000;display:none;font-size:12px;min-width:200px;}.ac_results li{padding:5px 8px;white-space:nowrap;color:#101010;text-align:left;}.ac_over{cursor:pointer;background-color:#6BCFFA;}.ac_match{font-weight:bold;color:black;}</style>');
            
            $('.scale fieldset').prepend('<h3 class="large fbold">TagCatcher - Ustawienia</h3> <form method="post" class="default blackListForm"><div class="fblock margin10_0"><input type="text" class="medium vtop marginright5" id="tagInput" value="" placeholder="Dodaj obserwowany tag..." autocomplete="off"><span class="button blue ttmedium"><input type="submit" value="Dodaj" class="cfff large fnormal" id="group-search-button"></span></div></form><ul id="tags-wall" class="peoplewall clr marginbott20 {type:\'tags\'}"></ul>');

            observed_tags.split(',').map(function (e) {
                 $('#tags-wall').append('<li class="box fleft rel"><a href="http://www.wykop.pl/mikroblog/tagi/' + e + '" class="block tdnone boxh pding5">' + e + '</a><a class="removefromlist tdnone abs icon mini close" href="">x</a></li>');
            });

            $('form.blackListForm').on('submit', function () 
            {
                if ($.trim($(this).find("input[type='text']").val()).length > 1) {
                  var a = $(this);
                  var my_tags = observed_tags.split(',');
                  
                  my_tags.push(a.find("input[type='text']").val());
                  
                  localStorage.setItem('observed_tags', my_tags.join(','));
                  
                  $('#tags-wall').append('<li class="box fleft rel"><a href="http://www.wykop.pl/mikroblog/tagi/' + a.find("input[type='text']").val() + '" class="block tdnone boxh pding5">' + a.find("input[type='text']").val() + '</a><a class="removefromlist tdnone abs icon mini close" href="">x</a></li>');

                  a.find("input[type='text']").val("")
                }
                
                //return false
            });
            
            $('.removefromlist').on('click', function(e) 
            {
                var a = $(this);
                var b = a.prev('a').text();
                
                var my_tags = observed_tags.split(',');
                var new_tags = [];

                my_tags.map(function(c) {
                    if(c != b)
                    {
                        new_tags.push(c);
                    }    
                });
            
                localStorage.setItem('observed_tags', new_tags.join(','));
                a.parent().remove();
                
            });
        }
        
        $('#tagInput').suggest(www_base + "ajax/suggest/tag"); 
    });

}

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);