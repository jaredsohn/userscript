// ==UserScript==
// @name           Dealextreme Track Local Post
// @namespace      dxtlp
// @include        http*://www.dealextreme.com/accounts/summaries.dx
// @include        http*://www.dealextreme.com/accounts/tracking.dx
// @description    Add link to track shipping by local post
// @creator        manuelcanepa[at]gmail.com
// ==/UserScript==
(function (){
    var log = function() {
        if (unsafeWindow.console) unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
    };
    // /accounts/TrackingRedirect.dx/TrackingNumber.RA190209146CN
    
    var $ = function(id) {
        return document.getElementById(id);
    };
    
    
    var getTrackIds = function(){
        var ahref = document.getElementsByTagName('a');
        var trackids = []
        for(var i = 0; i < ahref.length; i++){
            var matches = ahref[i].href.match(/TrackingRedirect\.dx\/TrackingNumber\.(.*)/)
            if(matches !== null) {
                trackids.push({
                    'link':ahref[i],
                    'trackid':matches[1]
                })
            }
        }
        return trackids;
    }
    
    var getPageHtml = function(url, callback){
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            onload: callback
        });
    }
    
    var getLocalPostServices = function(){
        return [
        {
            name: 'correoargentino',
            url: 'http://www.correoargentino.com.ar/seguimiento_envios/consultar/oidn/#TRACKID#',
            showResult: function(e){
                e.preventDefault()
                getPageHtml(this.getAttribute('href'),function(r) {
                    var html = '<html><head><title></title>';
                    html += '<link type="text/css" rel="stylesheet" ';
                    html += 'href="http://www.correoargentino.com.ar/css/principal/seguimiento/tramites.print.css">';
                    html += '</head><body style="padding:10px;margin:10px;" class=""><div class="results-wrapper">';
                    html += '<div class="results-wrapper">';
                    html += '<div style="display: block;" id="results">';
                    html += r.responseText
                    html += '</div></div></div></body></html>';
                    
                    var opciones = ["scrollbars=yes", "resizable=yes", 
                    "width=839", "height=366"]
                    
                    var pop_response= window.open('',"",opciones.join(', '));
                    pop_response.document.write(html);
                    pop_response.document.close()
                });
            }
        }
        ]
    }
    
    var addTrackLinks = function(track) {
        var loc_post=getLocalPostServices();
        var track_link;
        for(var lp=0; lp < loc_post.length; lp++){
            if(loc_post[lp].parserTrack){
                track_link = loc_post[lp].parserTrack(track.trackid)
            } else {
                track_link = document.createElement("a")
                track_link.setAttribute("href", loc_post[lp].url.replace(/#TRACKID#/,track.trackid))
                if(loc_post[lp].showResult) {
                    track_link.addEventListener('click',loc_post[lp].showResult, false);
                }
                track_link.innerHTML = '[' + loc_post[lp].name + ']';
            }
            track.link.parentNode.insertBefore(track_link, track.link)
        }
    }

    function init(){
        try {
            if(window != window.top){
                return;
            }
            
            var tracks = getTrackIds();
            for(var i = 0; i < tracks.length; i++){
                var track = tracks[i];
                addTrackLinks(track);
            }

        } catch(e){
            log(e)
        }
    }
    init();
})()