// ==UserScript==
// @name           Smile Fixer for Sparkworkz Forum
// @version        1.0.0
// @namespace      dracooccisor.wwebs.com
// @description    Displays the smileys the FC1 forum smileys on FC2 forum..
// @copyright      C 2010 Hero88go  
// @include        http://www.sparkworkz.com/forums/*
// @exclude        http://*.fantasticcontraption.com/forum/*
// @exclude        http://fantasticcontraption.com/forum/*
// ==/UserScript==

function typeSmiley(sSmiley)
{
    if (document.getElementsByTagName('textarea')[0].getAttribute('name') == 'bdescr')
        var editor = document.getElementsByTagName('textarea')[0];
    else
    {
        var allTextAreas = document.getElementsByTagName('textarea');
        for (i = 0; i < allTextAreas.length; ++i)
        {
            if (allTextAreas[i].getAttribute('name') == 'bdescr')
            {
                var editor = allTextAreas[i];
                break;
            }
        }
    }
    editor.value = editor.value + sSmiley;
}
function replaceTextSmileys()
{
    // ***add textual emoticons to the array below
    var textSmileys = new Array(
        ":water:",
        ":badgeless:",
        ":sweep:",
        ":rodless:",
        ":unconnected:",
        ":green:",
        ":brown:",
        ":champ:",
        ":boomerang:",
        ":clean:",
        ":lightning:",
        ":10bux:",
        ":cdynamic:",
        ":ccwheel:",
        ":cwheel:",
        ":uwheel:",
        ":waterrod:",
        ":woodrod:",
        ":longway:",
        ":perv:",
        ":canada:",
        ":colbert:",
        ":ahh:",
        ":dance:",
        ":doh:",
        ":siren:",
        ":science:",
        ":woop:",
        ":toot:",
        ":munch:");
       var realSmileys = new Array(
        "http://fantasticcontraption.com/forum/images/smilies/water.png",
        "http://fantasticcontraption.com/forum/images/smilies/badgeless.png",
        "http://fantasticcontraption.com/forum/images/smilies/sweep.png",
        "http://fantasticcontraption.com/forum/images/smilies/rodless.png",
        "http://fantasticcontraption.com/forum/images/smilies/unconnected.png",
        "http://fantasticcontraption.com/forum/images/smilies/green.png",
        "http://fantasticcontraption.com/forum/images/smilies/brown.png",
        "http://fantasticcontraption.com/forum/images/smilies/champ.png",
        "http://fantasticcontraption.com/forum/images/smilies/boomerang.png",
        "http://fantasticcontraption.com/forum/images/smilies/soap.png",
        "http://fantasticcontraption.com/forum/images/smilies/lightning.png",
        "http://fantasticcontraption.com/forum/images/smilies/emot-10bux.gif",
        "http://fantasticcontraption.com/forum/images/smilies/dynamic_circle.png",
        "http://fantasticcontraption.com/forum/images/smilies/ccw_wheel.png",
        "http://fantasticcontraption.com/forum/images/smilies/cw_wheel.png",
        "http://fantasticcontraption.com/forum/images/smilies/unpowered.png",
        "http://fantasticcontraption.com/forum/images/smilies/hollow_rod.png",
        "http://fantasticcontraption.com/forum/images/smilies/solid_rod.png",
        "http://fantasticcontraption.com/forum/images/smilies/static_circle.png",
        "http://fantasticcontraption.com/forum/images/smilies/emot-pervert.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-canada.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-colbert.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-aaaaa.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-dance.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-doh.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-siren.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-science.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-woop.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-toot.gif",
        "http://fantasticcontraption.com/forum/images/smilies/emot-munch.gif");
    // *** number of smileys that will be displayed per row
    var maxNumberOfSmileysPerRow = 10;
    // preloading images
    var preloadedImages = new Array(realSmileys.length);
    for (i = 0; i < preloadedImages.length; ++i)
    {
        preloadedImages[i] = new Image();
        preloadedImages[i].src = realSmileys[i];
    }
    
    var allTableData = document.getElementsByTagName('td');
    var indx;
    var smiley;
    var replacement;
    
    for (var i = 0 ; i < allTableData.length ; ++i )
    {   
        for ( var n = 0 ; n < textSmileys.length; ++n )
        {
            if ((allTableData[i].innerHTML.toUpperCase().indexOf('TABLE') == -1) &&
                (allTableData[i].innerHTML.indexOf('previewHTML()') == -1))
            {
                indx = allTableData[i].innerHTML.indexOf(textSmileys[n]);
                if (indx != -1)
                { 
                    while (indx != -1)
                    {   
                        replacement = '';
                        indx = allTableData[i].innerHTML.indexOf(textSmileys[n]);
                        smiley = '<img src=\"' + realSmileys[n] + '">'
                        replacement = allTableData[i].innerHTML.replace(textSmileys[n],smiley);
                        allTableData[i].innerHTML = replacement;                  
                    }                   
                }
            }
        
        }
    }
    
   