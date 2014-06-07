// ==UserScript==
// @name Orange Se7ensins logo w/ logo background
// @author Pepe Le Pew
// @homepage http://se7ensins.com
// @match http://www.se7ensins.com/*
// @version 2.0
// ==/UserScript==
 
function sevensins_loaded()
{
$("#logo img:eq(0)").attr('src',"http://i.imgur.com/ztXma9m.png");
$("#logoBlock").css("background-image","url(http://www.se7ensins.com/forums/data/avatars/m/591/591578.jpg)");
}
 
$(document).ready(sevensins_loaded);