// ==UserScript==
// @name        HFES - Thread Previewer
// @author      Emylbus
// @namespace   http://www.sublyme.net
// @description Preview threads without having to open the thread themselves. This feature will be added to HFES and is only intended on being a development version for testing.
// @include     *hackforums.net/*
// @version     1.0
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


function threadPreviewForum(){
    var results = [], i, j;
    for(i=0; i<$('.author').length; i++){
        var reshold, url, tid, previewDict = {};
        reshold = $($($('.author')[i].parentNode.children)[0].children);
        
        if(reshold.filter('.subject_old').length > 0){
            url = reshold.filter('.subject_old')[0].href;
            tid = url.split("tid=")[1].split("&")[0];
        }else if(reshold.filter('.subject_new').length > 0){
            url = reshold.filter('.subject_new')[0].href;
            tid = url.split("tid=")[1].split("&")[0];
        }else{
            url = "";
            tid = "0";
        }
        
        $($($('.author')[i].parentNode.children)[0]).append("&nbsp;<a href='javascript:void(0);' id='preview_"+tid+"' title='Preview Thread'>+</a>");
        $('#preview_'+tid).live("click",function(res){previewThreadsForum(res);});
    }
}

function previewThreadsForum(result){
    var tid, res;
    tid = result.target.id.split("_")[1];
    GM_log(tid);
    
    if($('#preview_'+tid+'_fin').length <= 0){
        $('#preview_'+tid)[0].innerHTML = "<img src='http://i.imgur.com/H8blLIM.gif'></img>";

        GM_xmlhttpRequest({
            method: "GET",
            url: '/showthread.php?tid='+tid,
            
            onload: function(response){
                var postData, previd, turkey, chicken;
                previd = "preview_"+response.finalUrl.split('tid=')[1];
                postData = $($($($(response.responseText).filter("#container")[0].children).filter("#content")[0].children).filter(".quick_keys")[0].children).filter("#posts")[0].children[1].children[0].children[2].children[0];
                $("#"+previd)[0].innerHTML = "-";
                turkey = $($($($("#"+previd)[0].parentNode)[0].parentNode)[0].parentNode)[0].parentNode;
                chicken = turkey.outerHTML+"<td colspan='7' id='"+previd+"_fin' class='trow1'>"+$(postData).html()+"</td>";
                turkey.outerHTML = chicken;
            }
        });
    }else{
        if($('#preview_'+tid)[0].innerHTML == '-'){
            $('#preview_'+tid+'_fin').fadeOut();
            $('#preview_'+tid)[0].innerHTML = '+';
        }else if($('#preview_'+tid)[0].innerHTML == '+'){
            $('#preview_'+tid+'_fin').fadeIn();
            $('#preview_'+tid)[0].innerHTML = '-';
        }else{
            return;
        }
    }
}

function main(){
    threadPreviewForum();
}

main();