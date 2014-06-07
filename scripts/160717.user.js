// ==UserScript==
// @name        HerobrinePlus
// @description Ajout de fonctionnalités et légères modifications du desgin du site Herobrine.fr, de manière à le rendre plus pratique et plus efficace.
// @namespace   hb
// @include     http://www.herobrine.fr/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// ==/UserScript==

var parts = window.location.search.substr(1).split("&");
var _get = {};
for (var i = 0; i < parts.length; i++) {
    var temp = parts[i].split("=");
    _get[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

//==========================//
//======Compact design======//
//==========================//

var compactdesign = GM_getValue('compactdesign', true);
function togglecompactdesign(){
    compactdesign = !compactdesign;
    GM_setValue('compactdesign', compactdesign);
    location.reload(true);
}

if(compactdesign)
{
    GM_registerMenuCommand("Design normal", togglecompactdesign, "d");
    
    if(_get['p'] == 'quests')
    {
        $('.quete, .quetereussie').css('padding', '10px');
        $('.quete, .quetereussie').css('margin-bottom', '10px');
    }
    else if(_get['p'] == 'mantras')
    {
        $('div[style="position:relative;"]').attr('id', 'mantras');
        //$('#mantras').css('overflow', 'auto');
        $('#mantras center').each(function(){
            var html = $(this).find('p.scroll').html();
            $(this).replaceWith($('<div class="mantra">' + html + '</div>'));
        });
        $('.mantra')
            .css('width', '300px')
            .css('text-align', 'center')
            .css('padding', '10px')
            .css('margin', '5px')
            .css('border', '2px solid #99876c')
            .css('background-color', '#d6be96')
            .css('display', 'inline-block');
        $('#mantras').css('text-align', 'center');
    }
}
else GM_registerMenuCommand("Design compact", togglecompactdesign, "d");



//==========================//
//==Toggle finished quests==//
//==========================//

if(_get['p'] == 'quests')
{
    $('div#main').prepend(
    '<p style="margin: 0px;"><input type="checkbox" id="togglefquests" />'+
    '<label for="togglefquests">Quêtes terminées</label></p>'+
    '<p style="margin: 0px;margin-bottom: 20px;"><input type="checkbox" id="togglenquests" />'+
    '<label for="togglenquests">Nouvelles quêtes</label></p>'
    );
    
    var finishedquests = GM_getValue('finishedquests', false);
    if(!finishedquests) $('.quetereussie').hide();
    else $('#togglefquests').prop('checked', true);
    
    $('#togglefquests').change(function() {
        finishedquests = !finishedquests;
        GM_setValue('finishedquests', finishedquests);
        
        if(finishedquests) $('.quetereussie').show();
        else $('.quetereussie').hide();
    });
    
    var newquests = GM_getValue('newquests', true);
    if(!newquests) $('.quete').hide();
    else $('#togglenquests').prop('checked', true);
    
    $('#togglenquests').change(function() {
        newquests = !newquests;
        GM_setValue('newquests', newquests);
        
        if(newquests) $('.quete').show();
        else $('.quete').hide();
    });



//==========================//
//========Ajax quests=======//
//==========================//

    var dynamicquests = GM_getValue('dynamicquests', true);
    function toggledynamicquests(){
        dynamicquests = !dynamicquests;
        GM_setValue('dynamicquests', dynamicquests);
        location.reload(true);
    }

    if(dynamicquests)
    {
        GM_registerMenuCommand("Quêtes normales", toggledynamicquests, "q");
        
        $('#main').on('click', '.quete a[name], .quetereussie  a[name]', function(){
            var name = $(this).attr('name');
            var thisquest = $(this).closest('div');
            
            $.ajax($(this).attr('href')).done(function(data) {
                var questText = $('<div>').html(data).find('.quete a[name="'+name+'"], .quetereussie a[name="'+name+'"]').closest('div').html();
                thisquest.html(questText);
            });
            return false;
        });

        /*$('#main').on('click', '.quete a:not([name]), .quetereussie  a:not([name])', function(){
            $.ajax($(this).attr('href'))//.done(function(data) {alert('done !')})
        ;
            return false;
        });*/
    }
    else
        GM_registerMenuCommand("Quêtes dynamiques", toggledynamicquests, "q");
}