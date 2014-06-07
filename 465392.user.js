// ==UserScript==
// @name        Facebook PokeBack
// @namespace   ploufka
// @include     https://www.facebook.com/pokes/*
// @grant	none
// @version     1.1
// ==/UserScript==

var pokes = $("poke_live_new");

var ____hasClass = function( el, strclass )
{
    return el.className.indexOf( strclass ) != -1;
};

var ____autoPoke = function()
{
for( var i = 0 ; i < pokes.children.length ; i++ )
{
    if( !____hasClass( pokes.children[i], "hidden_elem" ) )
    {
        var div1 = null; // .clearfix
        var div2 = null; // .clearfix
        var div3 = null; // no class
        var divMls = null; // .mls

        for( var j = 0 ; j < pokes.children[i].children.length ; j++ )
        {
            if( ____hasClass( pokes.children[i].children[j], "clearfix" ) )
            {
                div1 = pokes.children[i].children[j];
                break;
            }
        }

        if( div1 != null )
        {
            for( var j = 0 ; j < div1.children.length ; j++ )
            {
                if( ____hasClass( div1.children[j], "clearfix" ) )
                {
                    div2 = div1.children[j];
                    break;
                }
            }
        }

        if( div2 != null )
        {
            for( var j = 0 ; j < div2.children.length ; j++ )
            {
                if( div2.children[j].className.length == 0 )
                {
                    div3 = div2.children[j];
                    break;
                }
            }
        }

        if( div3 != null )
        {
            for( var j = 0 ; j < div3.children.length ; j++ )
            {
                if( ____hasClass( div3.children[j], "mls" ) )
                {
                    divMls = div3.children[j];
                    break;
                }
            }
        }

        if( divMls != null )
        {
            ev = document.createEvent('HTMLEvents');
            ev.initEvent('click', true, false);

            divMls.children[0].children[0].dispatchEvent(ev);
        }
    }
}
};

setInterval( function(){____autoPoke();}, 5000 );