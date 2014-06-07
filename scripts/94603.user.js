// ==UserScript==
// @name           DS - Incoming/OutcomigTroopsInfo
// @namespace      *
// @description    Sorft dafür, dass bei Klick auf Eintreffene Truppen bzw. Ausgehende Truppen keine neue Seite geladen wird, sondern eine Box angezeigt wird mit den Infos
// @author         Ulrich-Matthias Schäfer
// @include        http://*.die-staemme.de*
// ==/UserScript==

// Modifikationen und Weiterverbreitung dieses Scripts benötigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------


var $ = unsafeWindow.$;
var eigene = $('th:contains("Eigene Befehle")');
var fremde = $('th:contains("Ankommende Truppen")');

if(eigene.length == 0 && fremde.length == 0)
    return;

eigene = eigene.parent().nextAll();
fremde = fremde.parent().nextAll();

for(var i = 0;i<eigene.length;i++)
{
    var link = $(eigene[i]).find('a:not(.small)');
    
    link.click(function(){
    
        var obj = $(this);

        if(obj.parent().find('.DS_INCOMING_OUTCOMING_TROOPS').length == 0)
        {
            obj.parent().append('<img src="graphic/throbber.gif" height="16px" />');
            $.get(obj.attr('href'),function(data){
                obj.parent().find('<img[src$="graphic/throbber.gif"]').remove();
                data = $(data).find('.vis');
                
                var player = $(data[0]).find('tr:nth-child(4) td:nth-child(3)').html();
                var village = $(data[0]).find('tr:nth-child(5) td:nth-child(2)').html();
                var cancel = $(data[0]).find('tr:nth-child(9) td').html();
                
                obj.parent().append(
                    $('<div class="DS_INCOMING_OUTCOMING_TROOPS">').hide().html('<p>'+village+' ('+player+')</p><table class="vis">'+$(data[1]).html()+'</table>').toggle()
                );
            
            });
        }
        else
        {
            obj.parent().find('.DS_INCOMING_OUTCOMING_TROOPS').toggle();
        }
        
        return false;

    });
}

for(var i = 0;i<fremde.length;i++)
{
    var link = $(fremde[i]).find('a:not(.small)');
    
    link.click(function(){

        var obj = $(this);
        
        if(obj.parent().find('.DS_INCOMING_OUTCOMING_TROOPS').length == 0)
        {
            obj.parent().append('<img src="graphic/throbber.gif" height="16px" />');
            $.get(obj.attr('href'),function(data){
                obj.parent().find('<img[src$="graphic/throbber.gif"]').remove();
                data = $(data).find('.vis');
                
                var player = $(data[0]).find('tr:nth-child(2) td:nth-child(3)').html();
                var village = $(data[0]).find('tr:nth-child(3) td:nth-child(2)').html();
                //var place = $(data[0]).find('tr:nth-child(8) td').html();

                
                obj.parent().append(
                    $('<div class="DS_INCOMING_OUTCOMING_TROOPS">').hide()
                        .html('<p style="margin-top:10px;"><strong>Herkunft:</strong> '+village+' ('+player+') </p><a href="javascript:void(null)">Laufzeiten/Truppen anzeigen</a><table class="vis" style="display:none;">'+$(data[1]).html()+'</table>').toggle()
                );
                
                obj.parent().find('a:contains("Laufzeiten anzeigen")').click(function(){$(this).next().toggle();})
                
            });
        }
        else
        {
            obj.parent().find('.DS_INCOMING_OUTCOMING_TROOPS').toggle();
        }
        return false;
    });
}