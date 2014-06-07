// ==UserScript==
// @name            Flickr Cross-Recommendations
// @namespace       http://netcetera.org
// @include         http://*flickr.com/photos/*
// @description     Adds a "People who faved this also faved..." panel to photos on Flickr
// ==/UserScript==

window.addEventListener("load", function() { FCR_add_panel() }, false);

function FCR_add_panel() {
    var current_photo_id = location.pathname.split('/')[3];
    var img              = document.getElementById('photoImgDiv' + current_photo_id);
    var MAX_IMGS         = 6;
    
    if (!img)
        return;
    
    var comments_div = document.getElementById('DiscussPhoto');
    var xrec_div     = document.createElement('div');
    var xrec_photos  = document.createElement('div');
    var xrec_header  = document.createElement('h3');
    xrec_header.innerHTML = 'People who faved this also faved...';
    
    xrec_div.appendChild(xrec_header);
    xrec_div.appendChild(xrec_photos);
    comments_div.parentNode.insertBefore(xrec_div, comments_div);

    xrec_div.style.display = 'none';
    
    GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://api.flickr.com/services/rest/'
               +'?method=flickr.photos.getFavorites'
               +'&api_key=45d5d4b7dff9bc653c8eb3e73271c10c'
               +'&format=json&nojsoncallback=1'
               +'&photo_id=' + current_photo_id,
               
        onload: function(responseDetails) {
            var data        = eval('(' + responseDetails.responseText + ')');
            var people      = data.photo.person;
            
            if (people && people.length > 0) {
                var photo_count           = 0;
                var max_photos_per_person = Math.ceil(MAX_IMGS / people.length);
                var photos_to_ignore      = new Array();
                photos_to_ignore[current_photo_id] = 1;
                
                for (i = 0; i < people.length; i++) {
                    var nsid = people[i].nsid;
                    
                    GM_xmlhttpRequest({
                        method: 'GET',
                        url:    'http://api.flickr.com/services/rest/'
                               +'?method=flickr.favorites.getPublicList'
                               +'&api_key=45d5d4b7dff9bc653c8eb3e73271c10c'
                               +'&format=json&nojsoncallback=1'
                               +'&user_id=' + nsid,
                        onload: function(getPublicListResponse) {
                            var data   = eval('(' + getPublicListResponse.responseText + ')');
                            var photos = data.photos.photo;
                            
                            var photo_count_this_user = 0;
                            
                            for (var i = 0; i < photos.length; i++) {
                                var photo  = photos[i];
                                if (photos_to_ignore[photo.id]) {
                                    continue;
                                } else if (++photo_count_this_user > max_photos_per_person || ++photo_count > MAX_IMGS) {
                                    return;
                                }
                                photos_to_ignore[photo.id] = 1;
                            
                                var photo_url = 'http://farm' + photo.farm
                                              + '.static.flickr.com/' 
                                              + photo.server + '/' 
                                              + photo.id + '_' + photo.secret + '_s.jpg';
                            
                                var page_url  = 'http://www.flickr.com/photos/'
                                              + photo.owner
                                              + '/' + photo.id + '/';
                                                        
                                var img = document.createElement('img');
                                img.setAttribute('src',photo_url);
                                img.setAttribute('border', 0);
                            
                                var a = document.createElement('a');
                                a.setAttribute('href', page_url);
                                a.setAttribute('title', photo.title);
                                a.style.marginRight = '8px';
                                a.appendChild(img);
                            
                                xrec_photos.appendChild(a);
                            
                                // Show the main div, in case it's still hidden
                                xrec_div.style.display = "block";
                            }
                        }
                    });
                }
            }
        }
    });
}
