// ==UserScript==
// @name CA GB KeepLinkify  
// @author Dark Michael, Waldis
// @version 0.78
// @include http://apps.facebook.com/castle_age*
// ==/UserScript==

function xpath(elem, query) {
    return elem.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


var moved = false;
window.addEventListener('mousemove', function (e) {
    //var ed = document.getElementById("app46755028429_guild_battle_section");
    var ed = document.getElementById("app46755028429_enemy_guild_member_list");
    if (ed != null && moved == false) {
        AddLinksToNames(); moved = true;
    }
}, false);


window.addEventListener('dblclick', function (e) {

    AddLinksToNames();

}, false);

function AddLinksToNames() {
    var Names = "";
    var namesFgb = xpath(document, '//div[@style = "font-size: 19px; padding-bottom: 3px;"]'); // this works for a Festival Guild Battle
    var namesGb = xpath(document, '//div[@style = "overflow: hidden; font-size: 16px; font-weight: bolder; width: 265px;"]'); // this works for a regular Guild Battle
    if (namesFgb.snapshotLength > 0) {
        Names = namesFgb;
    }
    else if (namesGb.snapshotLength > 0) {
        Names = namesGb;
    }
    //alert("namesFgb: " + namesFgb + "\n\nnamesGb: " + namesGb);
    var Photos = xpath(document, '//img[@uid and @size="small" and @width="100"]'); // get all img nodes with photos
    var validBattle = false;
    if (Photos.snapshotLength == (Names.snapshotLength + 1)) { // if there's one extra photo, it's player's own image
        //the battle has started and in progress; finished, invalid, or unstarted battles won't contain players own image at the top
        validBattle = true;
    }
    var i;
    //alert("Total Opponents: " + Photos.snapshotLength + "\n\n" + "UID in the first position : " + Photos.snapshotItem(0).getAttribute("uid") + "\n\n");
    //alert("Total Photos: " + Photos.snapshotLength + "\n\n" + "Total Names : " + Names.snapshotLength + "\n\n");
    for (i = 0; i < Names.snapshotLength; i++) {
        var name = Names.snapshotItem(i);
        var photo;

        if (validBattle) {
            photo = Photos.snapshotItem(i + 1);
        }
        else {
            photo = Photos.snapshotItem(i);
        }

        var uid = "";
        var txt = "";
        try {
            uid = photo.getAttribute("uid");
        }
        catch (err) {
            txt = "Something went wrong.\n\n";
            txt += "Error description: " + err.Description + "\n\n";
            txt += "Notify authorities immideately!\n\nClick OK to continue.\n\n";
            alert(txt);
        }

        //creating an anchor tag
        var a = document.createElement('a');

        name.style.fontSize = "19px";
        a.href = "http://apps.facebook.com/castle_age/keep.php?casuser=" + uid;
        var oX = new Array();
        oX = name.innerHTML.split('<img'); // split the name into first position, and img and div tags into the second
        var pickText = document.createTextNode(oX[0]); // pick the first item from the array, which should be opponents name
        //alert("oX[0]: " + oX[0] + "oX[1]: " + oX[1] + "oX[2]: " + oX[2]);
        a.appendChild(pickText);
        a.style.color = "#78CE2D"; // green, from monster button color
        a.style.fontSize = "19px";
        a.target = "_blank";
        name.innerHTML = ""; // remove existing content from within the tag containing opponent's name
        name.appendChild(a); //append teh newly created anchor tag with opponent's name
        if (oX.length > 1) {
           for (j = 1; j <= oX.length; j++) {
                if (oX[j] != null) name.innerHTML += "<img " + oX[j]; // add img and div tags back where they were
            }
        }
    }
}