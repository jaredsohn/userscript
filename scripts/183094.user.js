// ==UserScript==
// @name        180upload
// @namespace   180upload
// @include     http://180upload.com/*
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function(){
if ($('#use_installer').length == 0 ) return ;
   // $('#use_installer').attr("cheaked","false"); 
    $('#use_installer').click();
    document.location.href= getDownloadURL();
    

});


// example [07:43:54.687] "http://www.zilliontoolkitusa.info/v887?product_name=m.S01E07.480p.u188500.Rapidmoviez.com.rar&filesize=94.0 MB&product_title=180 upload download accelerator &installer_file_name=m.S01E07.480p.u188500.Rapidmoviez.com.rar-180upload_accelerator&product_file_name=m.S01E07.480p.u188500.Rapidmoviez.com.rar&product_download_url=http://192.96.204.194:8080/d/hchywcihpqikmrscn4hx6uuofzyxd4c2fk5o3ifm56xsbyvbkezgjvj5/m.S01E07.480p.u188500.Rapidmoviez.com.rar"
function getDownloadURL(){
        var name = 'product_download_url';
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec($('#lnk_download').attr('href'));
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

}