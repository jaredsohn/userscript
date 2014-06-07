// ==UserScript==
// @name           AvatarReplay
// @namespace      GLB
// @description    Put miniature avatars into the replay instead of the default images.
// @include        http://goallineblitz.com/game/replay.pl?*
// ==/UserScript==

window.setTimeout( function()
{



var allDivs, thisDiv, id;
allDivs = document.evaluate(
    "//*[@class='player_icon']", //FIND THOSE PLAYERS
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) 
{


    
    thisDiv = allDivs.snapshotItem(i);


    id = thisDiv.id; //WHERE DA ID AT
    
if (id=='ball')
{thisDiv.innerHTML = '<img src="http://goallineblitz.com/images/ball.gif">';}

else if (id == 'ds') //fixes conflict with first down marker script
{}

else
thisDiv.innerHTML = '<img src="http://goallineblitz.com/game/player_pic.pl?player_id=' + id + '"width=16 height=16>';

}




	



}

)





