// ==UserScript==
// @name       "Finished" button for brb.to (ex fs.to)
// @namespace  http://brb.to/
// @version    0.1
// @description  add finish button for videos
// @match      http://brb.to/video/*
// @copyright  2014+, m.ksy
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
    var fsid = $("[name='item_id']").val();
    var fsurl = "http://brb.to/addto/finished/i" + fsid + "?json";
    $('body').append('<input type="button" value="В завершене" id="CP">');
    $("#CP").css("position", "fixed").css("top", 0).css("left", 0);
    $('#CP').click(function(){
        window.open(fsurl, '_blank');
    });
});