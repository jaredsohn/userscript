// ==UserScript==
// @name           Colored Temple Ordinance Grid
// @namespace      http://www.ndrix.org
// @description    Highlights the different ordinance statuses to easy spot what needs to be done
// @include        https://new.familysearch.org/en/action/openpopup?dest=templeordinancereservationview
// ==/UserScript==

// colorize all interesting cells
var table = document.getElementById('selectAnAncestor');
var links = table.getElementsByTagName('a');
for ( var i in links ) {
    var a = links[i];
    if ( a.id.match(/^(child|husband|wife)(Baptism|Confirmation|Initiatory|Endowment|Sp|SealingSpouse)/) ) {
        var content = a.textContent;
        a.parentNode.style.background = color_for_text(content);
    }
}

// map content to colors
function color_for_text(text) {
    if ( !text ) return;
    if ( text == "Completed" )   return "#ddd";
    if ( text == "Ready" )       return "#cfc";
    if ( text == "In progress" ) return "#ffb";
    if ( text == "On hold" )     return "#fcc";
    return;
}
