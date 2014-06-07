// ==UserScript==
// @name		kwejk infinite scroll
// @description 	en: kwejk.pl infinite scroll; pl: nieskonczone przewijanie na kwejk.pl
// @version     0.06
// @include	http://kwejk.pl/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
//
var current = parseInt($('#pagination .current').html());
var strona = $('#pagination a').attr('href').replace(/([0-9])+/,'');
var loading = false;
$('.media img').css('margin','0px !important');
$('.slim_holder').scroll(function(){
    if ($('.slim_holder').scrollTop() > $('#content').height() - 2000 - $('.slim_holder').height() && !loading){
        current--;
        loading = true;
        $.get(strona+current, function(data){
            var all_data = $(data),j,patt = /id="content"/;
            for(j=0;j<all_data.length;j++){if(patt.test(all_data[j].outerHTML)) break;}
            
            $('#shots .shot',$(data)[j]).each(function(idx, elem){
                var newElem = $(elem).insertBefore('#pagination');
                var img = $('img', newElem);
                if(/\.gif/.test($(img).attr('src'))){
                    $(img).css('padding-bottom', '40px');
                }
            })
            
            
            var sharePics = new Array();
            var idPics = new Array();
            $('.facebook_share_count_inner',$(data)[j]).each(
                function()
                {
                    sharePics.push($(this).attr("share_url"));
                    idPics.push($(this).attr("share_id"));
                });
                if(sharePics.length > 0){
                    var shares = 0;
                    $.ajax({
                        type: 'get',
                        dataType:'json',
                        url: 'http://graph.facebook.com?ids='+sharePics.join(","),
                        data: "",
                        success: function(data) {
                            var jsonPics = data;
                            var idx = 0;
                        
                            $.each(jsonPics, function(i, object) {
                                idx = jQuery.inArray(object.id, sharePics);
                                shares = object.shares == undefined ? 0 : object.shares;
                            $("#shares_"+idPics[idx]).html(shares);
                            $("#fb_shares_"+idPics[idx]).show();
                        });
                        }
                    });
                } 
            
            loading = false;
        }); 
        
    }  
});
