// ==UserScript==
// @name       FreeDrama
// @namespace  Anonymous
// @version    0.1a
// @description  Regarder tous les épisodes de Drama gratuitement et en HD !
// @downloadURL https://userscripts.org/scripts/source/164584.user.js
// @updateURL https://userscripts.org/scripts/source/164584.meta.js
// @include     http*://www.dramapassion.*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// @copyright	© Anonymous
// ==/UserScript==

var url = location.pathname.split('/');
var userID = Math.floor((Math.random()*3000)+1);;
var drama = url[2];
var name = url[3];
var epid = url[4];
var type = 'auto_hd';

if (location.href.match(/^http[s]{0,1}\:\/\/www\.dramapassion\.com\/drama/)) {
    if(epid) {
        $('#Tableau_01').find("tr:eq(5)").html('<td valign="top" height="545" style="background-image:url(http://www.dramapassion.com/images/player_bg.png); background-repeat:repeat-x;"><div style="width:1000px;margin:auto;border:none;"> <iframe allowtransparency="true" style="border:none;background:transparent; " width="1000" height="560" marginheight="0" marginwidth="0" frameborder="0" border="0" valign="top" scrolling="no" src="http://www.dramapassion.com/player_HD2.php?dramaID='+drama+'&epiNB='+epid+'&type='+type+'&user='+userID+'" id="player"></iframe></div></td>');
    }
    
    $('.noir > tbody > tr:eq(0)').find('td:eq(4), td:eq(5)').remove();
    
    $('.tab_blanc, .tab_gris').each(function(nb) {
        $(this).find('td:eq(4), td:eq(5)').remove();
        
		nb = nb+1;
        if(nb < 10) {
            nb = "0"+nb;
        }
        
        $(this).find('td:eq(3)').attr('width','470');
        $(this).find('td:eq(3) > center > a').attr({'href':'http://www.dramapassion.com/drama/'+drama+'/'+name+'/'+nb+'/','title':''});
        $(this).find('td:eq(3) > center > a > img').attr('src','http://www.dramapassion.com/images/play');
    });
}