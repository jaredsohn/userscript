// ==UserScript==
// @name        Kaskus Speech
// @author      Dimaz Arno 
// @description "Karena ngetik udah terlalu mainstream". Plugin kaskus buat ngisi komen dan searching dengan suara. Saat ini hanya dapat digunakan di chrome. Katakan "kirim komentar" untuk submit otomatis!.
// @namespace   http://kaskus.co.id
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @namespace   http://kaskus.co.id
// @include     http://www.kaskus.co.id/*
// @version     1.0
// ==/UserScript==

var version_now = '1.0';
var qr = 'no-exist';    
var ks_sign = '\n[size="2"][FONT="Arial Narrow"][RIGHT][I][URL="http://www.kaskus.co.id/post/51ac2bda1dd7192739000011"][color=blue]~me using [color=orange]"Kaskus Speech"~[/color][/color][/URL][/I][/RIGHT][/FONT][/size]';
var mantra_kaskus = /mantra kaskus|kirim komentar|kirim komen/;
var searchInputSpeech = 'no';

if ($('#reply-messsage').length !== 0) searchInputSpeech = 'yes';

function check_version(){	
    var seconds = new Date().getTime();    
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://inovasindo.com/kaskus/kaskusspeech.html?"+seconds+""
        ,
        onload: function(ver) {
            verdata = ver.responseText;			
            var version = $("<div>").html(verdata).find('a').eq(0).attr('rel');			
            var linkversion = $("<div>").html(verdata).find('a').eq(0).attr('href');			
            if (version==version_now) {
                
            } else {                
                if (qr=='exist') {
                    $('#quick-reply .clearfix:first').after('<div class="clearfix"><label>Version info</label><div class="input">Download versi terbaru <a target="_blank" href="'+linkversion+'">disini</a></div></div>');
                } else {
                    $('#edit .clearfix').eq(1).after('<div class="clearfix"><label>Version info</label><div class="input">Download versi terbaru <a target="_blank" href="'+linkversion+'">disini</a></div></div>');
                }
            }
        }, 
        onerror: function(responseDetails) {
            
        }
    });
}

function existSpeechMessage(){
    if ($('#quick-reply').length !== 0){
        qr = 'exist';
    }        
    
    if (qr=='exist') {
        $('#quick-reply .clearfix:first').after('<div class="clearfix"><label><strong>Speech</strong></label><div class="input"><input lang="id" id="speechMessage" style="" type="text" x-webkit-speech="x-webkit-speech" /> click microphone first</div></div>');
        $('#quick-reply .clearfix:first').after('<div class="clearfix"><label><strong>Pilihan Bahasa</strong></label><div class="input"><select id="langlinglung"><option value="id">Indonesia</option><option value="en">English</option></select></div></div>');
    } else {
        $('#edit .clearfix').eq(1).after('<div class="clearfix"><label><strong>Speech</strong></label><div class="input"><input lang="id" id="speechMessage" style="" type="text" x-webkit-speech="x-webkit-speech" /> click microphone first</div></div>');
        $('#edit .clearfix').eq(1).after('<div class="clearfix"><label><strong>Pilihan Bahasa</strong></label><div class="input"><select id="langlinglung"><option value="id">Indonesia</option><option value="en">English</option></select></div></div>');
    }
    
    var speech = document.getElementById('speechMessage');    
    
    $('#langlinglung').change(function() {
        $('#speechMessage').attr('lang',$('#langlinglung').val());
    });
    
    speech.onwebkitspeechchange = function(e) {        
        if (qr !== 'exist') {
            if (document.getElementById('reply-messsage').value.length){
                document.getElementById('reply-messsage').value = document.getElementById('reply-messsage').value+'\n'+speech.value;
                if (document.getElementById('reply-messsage').value.match(mantra_kaskus)){                   
                    document.getElementById('reply-messsage').value = document.getElementById('reply-messsage').value.replace(mantra_kaskus,ks_sign);
                    document.forms["postreply"].submit();            
                }
            } else {
                document.getElementById('reply-messsage').value = speech.value;              
            }
        } else {
            if (document.getElementById('reply-messsage').value.length){
                document.getElementById('reply-messsage').value = document.getElementById('reply-messsage').value+'\n'+speech.value;
                if (document.getElementById('reply-messsage').value.match(mantra_kaskus)){                   
                    document.getElementById('reply-messsage').value = document.getElementById('reply-messsage').value.replace(mantra_kaskus,ks_sign);
                    document.forms["qr_form"].submit();            
                }            
            } else {
                document.getElementById('reply-messsage').value = speech.value;
            }
        }    
    };            
}

function FSpeechSearch(){
    $('input[name=q]').attr('id','speechSearch');
    $('#speechSearch').attr('lang','id');
    $('#speechSearch').attr('x-webkit-speech','x-webkit-speech');
    $('form[id=searchform]').attr('name','speechSearch');
    var speechSearch = document.getElementById('speechSearch');
    speechSearch.onwebkitspeechchange = function(e) {        
        document.getElementById('speechSearch').value = speechSearch.value;            
        if (document.getElementById('speechSearch').value.match('cari')){                   
            document.getElementById('speechSearch').value = document.getElementById('speechSearch').value.replace('cari','');
            document.forms["speechSearch"].submit();
            $(this).trigger({
                type: 'keypress',
                which: 13
            });
        }
    };
}

if (searchInputSpeech == 'yes'){
	check_version();
    existSpeechMessage();
    FSpeechSearch();
} else {
    FSpeechSearch();
}