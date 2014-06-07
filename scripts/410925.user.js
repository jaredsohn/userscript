// ==UserScript==
// @name se7ensins signature
// @author ECB2
// @homepage http://se7ensins.com
// @match http://www.se7ensins.com/*
// @version 1.0
// ==/UserScript==

function sevensins_loaded()
{
    var swag = "<style>.signature:before { content: \"Hidden Signature - Hover to view\"; font-weight: bold; } .signature:hover:before { content: \"\"; } .signature{ height: 16px; overflow: hidden; } .signature:hover{ height: auto; }</style>";
    $("head link[rel='stylesheet']").last().after(swag);
}

$(document).ready(sevensins_loaded);