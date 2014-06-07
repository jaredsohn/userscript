//=============================================================================
// ==UserScript==

// @name           Full Screen Kongregate

// @namespace      Kongregate

// @description    Play games at full browser size on Kongregate.com

// @include        http://kongregate.com/games/*
// @include        http://www.kongregate.com/games/*
// @include        http://a.kongregate.com/games/*/*

// ==/UserScript==

// Since Kongregate flash elements take a while to load, the following code
// keeps trying to access elements by their ID until it succeeds.


//=============================================================================
//=Globals

var oldstyle = false,
    newstyle = false;

//=============================================================================
//=Functions

// Once the element with the given ID is loaded, pass it to the given function.
function Push(id, fun) {
    try {
        var elm = document.getElementById(id);
        if (elm == null)
            setTimeout(function() { Push(id, fun); }, 200);
        else fun(elm);
    } catch (e) { alert(e); }
}

function Reset(elm)
{
    elm.removeAttribute('width');
    elm.removeAttribute('height');
    elm.style['margin'    ] = 0;
    elm.style['padding'   ] = 0;
    elm.style['left'      ] = 0;
    elm.style['top'       ] = 0;
    elm.style['right'     ] = '';
    elm.style['bottom'    ] = '';
    elm.style['textAlign' ] = 'left';
    elm.style['position'  ] = 'relative';
    elm.style['overflow'  ] = 'hidden';
}

// Resize an inner element based on style.
function Resize(elm) {
    Reset(elm);
    elm.style['width' ] = '100%';
    if (elm.className == 'game_table')
    {
        var linkcell = document.getElementById('quicklinks').parentNode,
            fcontent = document.getElementById('flashframecontent');
        elm.style['height'] = (fcontent.offsetHeight - linkcell.offsetHeight)
            + 'px';
    }
    else
        elm.style['height'] = '100%';
}

function PushResize(id) { Push(id, Resize); }

// Resize the main div according to the client dimensions.
function ResizeClientRoot() {
    var doc      = document.documentElement,
        floating = document.getElementById('floating_game_holder'),
        linkrow  = document.getElementById('quicklinks').parentNode.parentNode,
        gamecell = document.getElementById('gameholder'),
        table    = gamecell.parentNode.parentNode.parentNode,
        fcontent = document.getElementById('flashframecontent');
    
    floating.style.width  = (doc.clientWidth-5+300)+'px';
    floating.style.height = (doc.clientHeight-10)+'px';
    floating.scrollIntoView(true);
}

function ResizeDescend(elmstart, elmend) {
    for (var elm = elmstart; elm != elmend; elm = elm.parentNode)
        Resize(elm);
}

//=============================================================================
//=Main code

// Do property modifications.

try {
    var ResizeAll = function() {
        var gamediv = document.getElementById('gamediv'),
            gameiframe = document.getElementById('gameiframe');
        oldstyle = gameiframe != null;
        newstyle = gamediv != null && gamediv.nodeName == 'OBJECT';
        if (!(oldstyle || newstyle)) {
            setTimeout(ResizeAll, 200);
            return;
        }
        
        Push('play', function(elm) {
            elm.style['overflow'] = 'scroll'; });
        Push('primarywrap', function(elm) {
            elm.style['padding'] = 0;
            elm.style['width'] = 'auto'; });

        var floating = document.getElementById('floating_game_holder');
        Reset(floating);
        if (newstyle)
            ResizeDescend(gamediv, floating);
        else {
            gameiframe.scrolling = 'no';
            ResizeDescend(gameiframe, floating);
        }

        // Resize listener.
        ResizeClientRoot();
        window.addEventListener('resize', ResizeAll, false);
        
        Push('chat_container_cell', function(elm) {
            elm.style['width'] = '300px';
            elm.style['height'] = '100%'; });
        PushResize('chat_container');
    };
    ResizeAll();
    setTimeout(ResizeAll, 500);
} catch (e) { alert(e); }
