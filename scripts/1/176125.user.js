// ==UserScript==
// @name       Eksi Begenilenler
// @namespace  https://eksisozluk.com/biri/mini-mini-bir-nick-konmustu
// @version    0.1
// @description En begenilenleri ayni sayfada gor
// @match      https://eksisozluk.com/istatistik/dunun-en-begenilen-entryleri
// @match      https://eksisozluk.com/istatistik/gecen-haftanin-en-begenilen-entryleri
// @match      https://eksisozluk.com/istatistik/tsllbnnin-formulu
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

function append(thisItem, url)
{
    $.get(url, function(data) {
        
        var x = $(data).find('div.content').html();
        
        thisItem.append("<ol id='entry-list'><li><article data-menu-attached='true'>"
                        + "<div id='topic' class='content' itemprop='articleBody text'>"
                        + x +"</div>"+"</article></li></ol>");        
        
        $('a.b').css({"display":"inline"});
        $('a.url').css({"display":"inline"});
        $('sup').find('a').css({"display":"inline"});
        
    });
}

$(document).ready(
    function()
    {
        
        var list = $('#stats');
        var items = list.find('li');
        var i = 0;
        items.each( 
            function() { 
                var thisItem = $(this);
                var url = $(this).find("a").attr('href');
                
                
                thisItem.append("<div id='goster' class='options'><a class='button'> Goster/Gizle </a></div>");
                
                var down=0;
                
                thisItem.find('#goster').click(
                    function() 
                    {
                        if(down == 1)
                        {
                            thisItem.find('#entry-list').css({"display":"none"});
                            down = 0;
                        }
                        else
                        {
                            var list = thisItem.find('#entry-list');
                            
                            if(!list.length)
                                append(thisItem,url);
                            
                            thisItem.find('#entry-list').css({"display":"inline-block"});
                            down = 1;
                        }
                    });
            });                     
    });