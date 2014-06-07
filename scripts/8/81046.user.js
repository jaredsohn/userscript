// ==UserScript==
// @name Ogame NucleaR 
// @description NucleaR
// @creator pincopallino, modified by Lorenz
// @version 0.0
// @include http://*.ogame.*/game/index.php?page=showmessage*
// @include http://*.ogame.*/game/index.php?page=writemessage*
// @include http://*.ogame.*/game/index.php?page=alliance*
// ==/UserScript==
}
...................................................................working............		
		document.getElementById('logo').innerHTML="<a href=http://uni103.ogame.it/game/index.php?page=alliance&session=3e793a4f0d92 title=Alleanza><img src=http://i.imgur.com/pQLeK.gif></img></a>";

	//}

function getElementsByClassName( strClassName, obj ) {
    var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}