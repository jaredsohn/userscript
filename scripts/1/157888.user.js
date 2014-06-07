// ==UserScript==
// @name       osu! Top 400 Listing
// @namespace  http://wa.vg/
// @version    2013.01.06
// @description  osu! Top 400
// @match      http://osu.ppy.sh/b/*
// @match      https://osu.ppy.sh/b/*
// @match      https://osu.ppy.sh/s/*
// @match      http://osu.ppy.sh/s/*
// @match      https://osu.ppy.sh/p/beat*
// @match      http://osu.ppy.sh/p/beat*
// @copyright  2013 Jebwiz Oscar
// ==/UserScript==
var page=10; //(1-10)
var u="Your Username Here";
var p="Your Password Here";
var Qt;
Qt= document.getElementsByClassName('beatmapTab active')[0];
var q= Qt.href.replace("https://osu.ppy.sh/b/","");
q= q.replace("http://osu.ppy.sh/b/","");
var idT;
idT = document.getElementsByClassName('beatmapListing')[0];

if (idT) {
    
    newElement1 = document.createElement('div');
    newElement1.setAttribute("class","beatmapListing");
    
    idT.parentNode.insertBefore(newElement1, idT.nextSibling);
    newElement1.width="100%";
    newElement1.setAttribute("cellspacing",0);
    {
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://esu.eu5.org/scoreapi2.php?pg='+page+'&u='+u+'&p='+p+"&id="+q,
        onload: function(response){
        newElement1.innerHTML= '<table width="100%" cellspacing="0"><tbody>'+(response.responseText)+'</tbody></table>';
        if (response.responseText.indexOf("the ranked version")<0)
          idT.parentNode.removeChild(idT);
    }})
    }
                     
}