// ==UserScript==
// @name           163 Album Expander
// @namespace      http://leechael.org/plugins/163-album-expander
// @include        http://photo.163.com/photos/*/*/*
// ==/UserScript==

expander = function ()
{
    var cur     = unsafeWindow;
    var ids     = cur.gPhotosIds;
    var info    = cur.gPhotosInfo;
    var imgsrc  = '';
    for (var i = 0; i < ids.length; i++)
    {
        var id = ids[i];
        imgsrc += '<div id=\"photobox_'+id+'\" style=\"margin: 10px 0;\"><a href=\"'+id+'\"><img src=\"'+info[id][5]+'\" /></a></div>';
    }
    cur.document.getElementById('photoboxes_container').innerHTML = imgsrc;
}
expander();