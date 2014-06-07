// ==UserScript==
// @name        U2AutoDownload
// @namespace   http://userscripts.org/users/523477
// @description Auto download torrent when enter page
// @include     http://u2.dmhy.org/userdetails.php*
// @include     https://u2.dmhy.org/userdetails.php*
// @version     2
// @grant       none
// ==/UserScript==

(function(){
    function replaceLink(){
        $('table tr a').each(function(index, elem) {
           var href =  $(elem).attr('href');
           if(/^details.php/.test(href)) {
               var id = /^details.php\?id=(\d+).*/.exec(href)[1];
               $(elem).attr('href', 'download.php?id='+id);
           }
        });       
    };
    
    window.getUserTorrentListAjax2 = function(userid, type, blockid){
       if (document.getElementById(blockid).innerHTML=="")
          ajaxUpdate2('getusertorrentlistajax.php?userid='+userid+'&type='+type, blockid, replaceLink);
          return true;
     };
            
    window.ajaxUpdate2 = function(url,elm, cb){
        var e=_id(elm);
        var f=function(r){e.style.display = '';e.innerHTML=r; cb();};
        ajax.get(url,f)
    };
            
    $('table tr a').each(function(index, elem){
        var href = $(elem).attr('href');

        if(/getusertorrentlistajax/.test(href)) {
            $(elem).attr('href', href.replace(/getusertorrentlistajax/, "getUserTorrentListAjax2"));
        }
    });
})();