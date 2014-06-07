// ==UserScript==
// @name              Wykop - Mikroblog Tag Catcher
// @namespace         http://gac3k.pl
// @description       Wyłapuje hashtagi na mikroblogu, i gdy jakiś znajdzie, wysyła użytkownikowi powiadomienie ;)
// @author            Dominik Gacek
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () 
{	
	$(document).ready(function($) 
        {
            var tags = new Array();
            var observed_tags = localStorage.getItem('observed_tags');
            var last_check_timestamp = localStorage.getItem('last_check_timestamp');
            var parsed_entries = new Array();
            var notifications = new Array();
            var count = 0;
            var html, nhtml, result_html, tag_image, tag_hover_image;
            var _element, _id, _entry_id, _href, _timestamp, _avatar, _username, _class, _notify;
            
            last_check_timestamp = last_check_timestamp == null ? 0 : parseInt(last_check_timestamp);
            //console.log(last_check_timestamp, Math.round(new Date().getTime() / 1000));
            if(document.location.pathname.match('/ludzie/settings/'))
            {
                var input = $('<input />').attr('placeholder', 'Obserwowane tagi')
                                          .attr('class', 'xxx-long c888 medium')
                                          .attr('name', 'ot')
                                          .attr('value', observed_tags);
                                          
                $('fieldset').prepend(input);
                
                $(document).delegate('form', 'submit', function(e) 
                {
                    var _array = $('input[name="ot"]').serializeArray();
                    localStorage.setItem('observed_tags', _array[1].value);
                });
            }
            
            var getTagsNotifications = function() 
            {
                $.ajax({
                    method: 'GET',
                    url: '/mikroblog/',
                    success: function(html) {
                        if($('.entry', html).length)
                        {
                            last_check_timestamp = parseInt(localStorage.getItem('last_check_timestamp'));
                            count = 0;
                            
                            //console.log(last_check_timestamp);
                            $('a[href*="/tagi/"]', html).each(function(index, element) 
                            {
                                if( $(element).parent().parent().parent().hasClass('subcomment') )
                                {
                                    _element = $(element).parent().parent().parent().parent().parent().parent();
                                    _id = $(element).parent().find('a.hash').attr('href').split('#comment-')[1];
                                    _entry_id = $(element).metadata().id;
                                    _href = _element.find('div blockquote p a.hash').attr('href');
                                    _timestamp = Math.round(new Date($(element).parent().parent().find('h5 small time').attr('datetime')).getTime() / 1000);    
                                    _username = _element.find('blockquote h4 a').text().replace('[edytuj]', '').replace('[usuń]', ''); 
                                    _class = _element.find('blockquote h4 a').attr('class');
                                    _avatar = _element.find('div a span img').attr('src');
                                    // Ta no to jest straszne jak nieszczęście, ale jakoś nie mam koncepcji zrobić tego lepiej, ani closest, ani parents nie działają jak chcę, a skoro działa, to niech zostanie :)

                                }
                                else
                                {
                                    _element = $(element).parent().parent();
                                    _id = $(element).parent().parent().parent().parent().metadata().id;
                                    _entry_id = _id;
                                    _href = _element.find('p a.hash').attr('href');
                                    _timestamp = Math.round(new Date(_element.find('h4 small time').attr('datetime')).getTime() / 1000);
                                    _username = _element.find('h4 a').text().replace('[edytuj]', '').replace('[usuń]', '');             
                                    _class = _element.find('h4 a').attr('class');
                                    _avatar = _element.parent().find('a span img').attr('src');
                                     // Ta, no tu tak samo jak wyżej, i jest troche wbrew DRY, ale już trudno ;)
                                }
                                
                                if($.inArray($(element).text(), observed_tags.split(',').map($.trim)) > -1)
                                {
                                    tags.push($(element).text());
                                    
                                    if(parsed_entries.indexOf(_id) < 0)
                                    {
                                        _notify = 
                                        {
                                            tag :   $(element).text(),
                                            id  :   _id,
                                            entry_id    :   _entry_id,
                                            timestamp    :   _timestamp,
                                            highlited   :   (_timestamp > last_check_timestamp) ? 'bgfbfbd3' : '',
                                            username    :   _username,
                                            href        :   _href,
                                            css :   _class,
                                            avatar  :   _avatar,
                                            content :   $(element).parent().text().substr(0, 100) + '...'
                                        }
                                        
                                        parsed_entries.push(_id);
                                        notifications.push(_notify);
                                    }
                                    
                                    
                                    //console.log((_timestamp > last_check_timestamp));
                                    // jeszcze jedna opcja i count--
                                    if(_timestamp > last_check_timestamp)
                                    {
                                        count++;
                                    }
                                }

                            });

                            notifications.sort(function(a, b) {
                                if (a.timestamp > b.timestamp) { return -1; }
                                if (a.timestamp < b.timestamp) { return  1; }
                                return 0;
                            });
                            
                            nhtml = '';
                            
                            $(notifications).each(function(index, entry) 
                            {
                                    nhtml += '<li class="tag-notification brbotte8 rel '+ entry.highlited +'">' + 
                                   '<p class="c999 margin5_0">We wpisie <img src="'+ entry.avatar +'" alt="Avatar" width="14" height="14" class="avatar vmiddle"> <a href="http://wykop.pl/ludzie/'+ entry.username +'" title="profil '+ entry.username +'" class="'+ entry.css +'">'+ entry.username +'</a> użyto taga #<a href="http://www.wykop.pl/mikroblog/tagi/'+ entry.tag +'">'+ entry.tag +'</a> pisząc <a href="'+ entry.href +'">'+ entry.content +'</a></p>' +
                                   '</li>';  
                            });
                            
                            $(nhtml).prependTo('#obTagsContainer ul');
                            //console.log(count);
                            if(count > 0)
                            {
                                $('#obCounter').text(count);
                                prependNumberToTitle(count);      
                            }
                            else
                            {
                                $('#obCounter').text('');
                                prependNumberToTitle(0);
                            }
                            
                            notifications = new Array();
                        }
                    },
                    error: function (xhr){
                        console.log(xhr.status + ' ' + xhr.statusText);
                    }
                });
                
                //console.log('Przeprasowałem mikroblog :)');  
            }
            
            //tag_image = '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 ';
            
            tag_image = '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%3D';
            tag_hover_image = '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%3D%3D';
            
            result_html = '<div class="quickpoint fright rel">' +
		'<a title="Przejdź na mikroblog" class="fright cfff tdnone quickicon tcenter" href="#">' +
		'<span class="icon inlblk" id="toggleOb" style="background: url(data:image/png;base64,'+ tag_image +') no-repeat 5px -2px;"><span>Mikroblog Tag Catcher</span></span>'+
                '<span class="abs count x-small br3" id="obCounter" style="right:0;top:0;background:#ff772e;padding:0 3px;line-height:14px;-webkit-box-shadow:1px 1px 0 0 #32688f;-moz-box-shadow:1px 1px 0 0 #32688f;box-shadow:1px 1px 0 0 #32688f;"></span>' +
		'</a>' +
                '<div class="abs bgfff layer shadow pding10 dnone" id="showObCont" style="margin-top: 35px; min-width: 290px; right: -30px;">'+
		'<div class="fblock overa h100" id="obTagsContainer" style="max-height: 230px; ">' +  
                '<ul class="small"></ul>' +
                '</div></div>';
                                            
            $('nav.main.medium.rel').append(result_html);
            
            getTagsNotifications();
            setInterval(getTagsNotifications, 20000);
            
            $(document).delegate('#toggleOb', 'mouseover', function() {
               $(this).css('background','url(data:image/png;base64,'+ tag_hover_image +') no-repeat 5px -2px');
            }).delegate('#toggleOb', 'mouseout', function() {
                if(!$('#showObCont').is(':visible')) {
                    $(this).css('background','url(data:image/png;base64,'+ tag_image +') no-repeat 5px -2px');
                }
            });
            
            $(document).delegate('#toggleOb,#obCounter', 'click', function(e) 
            {
                $('#showObCont').toggle();
                $('#obCounter').html('');


                if($('#showObCont').is(':visible'))
                {
                    $(this).parent().addClass('active');
                    $(this).trigger('mouseover');
                }
                else
                {
                    $('.tag-notification').removeClass('bgfbfbd3');
                    $(this).trigger('mouseout');
                    $(this).parent().removeClass('active');
                }
                
                prependNumberToTitle(0); 
                count = 0;
                localStorage.setItem('last_check_timestamp', Math.round(new Date().getTime() / 1000));
                
                e.preventDefault();
            });
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)