// ==UserScript==
// @name        HD-torrents Torrentz search link
// @namespace   -
// @author 	    Ben Dover
// @description Adds a link for each torrent in the list for a search on torrentz.eu. Real basic functionality.
// @include     https://hd-torrents.org/torrents.php*
// @version     2.1
// ==/UserScript==


$('table.mainblockcontenttt tbody tr td:nth-child(3) b').each(function(){
    var title = $(this).text();
    
    var arr = title.split(' ');
    var res = '';
    
    function createString(array) {
        for(i=0; i < array.length; i++){
            if(array[i] > 1900 || array[i] == '720p' || array[i] == '1080p'){
                break;
            } else {
                res = res + array[i] + ' ';
            }
        }
        return(res);
    }
    
    var cleanTitle = createString(arr);
    
    $(this).parent().append('<span style="color:DarkSlateGray; margin-left:5px;"><a target="_blank" href="http://torrentz.eu/search?f=' + cleanTitle + '">TZ</a></span>');
});