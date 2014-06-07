// ==UserScript==
// @name           Twitter-URL-Shortener
// @namespace      James
// @description    Shortens URLs within Twitter Web Interface - Even when a URL goes over the 140 character limit!
// @include        http://twitter.com/*
// ==/UserScript==

// Using jQuery - Twitter already has Twitter loaded.
function wait() {if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(wait,100); } else { jQuery = unsafeWindow.jQuery; setTimeout(function(){action();},1000);}}wait();
function action() {
    if(jQuery('#update-submit').get(0)&&jQuery('#status').get(0)) {
        jQuery('<div/>').css({
            position: 'absolute',
            zIndex: 999,
            width: ( jQuery('#update-submit').width() + parseInt(jQuery('#update-submit').css('paddingLeft').replace('px',''),10) + parseInt(jQuery('#update-submit').css('paddingRight').replace('px',''),10) ) + 'px',
            height: ( jQuery('#update-submit').height() + parseInt(jQuery('#update-submit').css('paddingTop').replace('px',''),10) + parseInt(jQuery('#update-submit').css('paddingBottom').replace('px',''),10) ) + 'px',
            left: jQuery('#update-submit').offset().left+'px',
            top: jQuery('#update-submit').offset().top+'px',
            opacity:0,
            '-moz-border-radius':'5px',
            background: 'black',
            cursor: 'pointer'
        }).appendTo('body').mouseover(function(){
            if(jQuery('#status').val()) {
                jQuery('#update-submit').removeClass('disabled').css({background:'url(http://static.twitter.com/images/round-btn-hover.gif)'});
            }
        }).mouseout(function(){
            if(jQuery('#status').val()) {
                jQuery('#update-submit').removeClass('disabled').css({background:''});
            }
        }).get(0).onclick = function(){
            var v = jQuery('#status').val();
            var vi = v.indexOf('http://');
            if(v) {
                var urls = (function(s,Rx){
                    var A = [], M, z = 0;
                    while((M= Rx.exec(s)) != null){
                        i= M.index;
                        z= Rx.lastIndex;
                        A[A.length]= [s.substring(i, z),i];
                    }
                    return A;
                })(v,/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?[^\)$]/g);
                var urlLength = urls.length;
                if(urlLength===0) {
                    jQuery('#doingForm').submit();
                } else {
                    for(var i=urlLength-1;i>-1;i--) {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://reque.st/create.api.php?url=' + encodeURIComponent(urls[i][0]),
                            onload: (function(longURL,i) {
                                return function (response) {
                                    var shortURL = response.responseText;
                                    if(shortURL.substr(0,4)=='http') {
                                        var currentStatus = jQuery('#status').val();
                                        var newStatusText = currentStatus.substr(0,longURL[1]) + shortURL + currentStatus.substr(longURL[1]+longURL[0].length);
                                        jQuery('#status').val(newStatusText);
                                    }
                                    if(i===0) {
                                        jQuery('#doingForm').submit();
                                    }
                                }
                            })(urls[i],i),
                            onerror: function(){
                                alert('An error occured');
                            }
                        });                
                    }                
                }
    
            }
            return false;
        }        
    }
}