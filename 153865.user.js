// ==UserScript==
// @name           fgf smiley hijacking
// @description    let's use smilies that are from a better forum than ours
// @author         drfunk
// @homepage       http://eat.my/ass
// @version        4.20
// @include        http*://forum.free-games.com.au/*

// ==/UserScript==
var postbox = document.getElementsByName('post_message');
if(postbox.length > 0) {
    postbox[0].parentNode.parentNode.childNodes[1].innerHTML = '<input type="button" value="View Smilies" onclick="window.open(\'//sae.tweek.us\')">';
}

//fuck you fgf html from 1999 seriously youre terrible
var smilies = document.getElementsByTagName('center')[0].innerHTML.match(/:([A-Za-z0-9]*?):/g);
for(var i in smilies){
    var name = smilies[i].substring(1, smilies[i].length-1);
    var image = '<img src="http://sae.tweek.us/static/images/emoticons/emot-'+name+'.gif" />';
    document.body.innerHTML = document.body.innerHTML.replace(smilies[i], image);
}
