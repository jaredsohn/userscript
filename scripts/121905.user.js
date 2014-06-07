// ==UserScript==
// @name            Flickr Faves Preview
// @namespace       https://github.com/boncey/gm-scripts
// @include         http://*flickr.com/photos/*/favorites/*
// @include         http://*flickr.com/photos/*/favorites
// @description     Shows a preview of the faves of each user who has faved a photo (based on http://userscripts.org/scripts/show/35134)
// @version         0.6
// ==/UserScript==

window.addEventListener("load", function() { load_faves() }, false);

function load_faves() {

    // Fetch faves from existing page
    var faves_users_list = document.evaluate("//*[@id='faves-right']/ul/li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < faves_users_list.snapshotLength; i++) {
        load_photos(faves_users_list.snapshotItem(i), i + 1);
    }
}

// For a user's photostream URL fetch their NSID then fetch their favorites
function load_photos(li_el, idx) {

    // Change MAX_IMGS to load more or less photos for each user
    var MAX_IMGS = 6;
    var current_photo_id = location.pathname.split('/')[3];

    var photo_count           = 0;
    var photos_to_ignore      = new Array();
    photos_to_ignore[current_photo_id] = 1;

    var user_urls = document.evaluate("//*[@id='faves-right']/ul/li[" + idx + "]/a[1]/@href", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var user_url = user_urls.snapshotItem(0).value;
    if (user_url.substring(0, 7) == '/photos') {
        // On Windows URLs are relative so make them absolute for the 'flickr.urls.lookupUser' call
        user_url = 'http://flickr.com' + user_url
    }

    GM_xmlhttpRequest({
        method: 'GET',
        url:    'http://api.flickr.com/services/rest/'
        +'?method=flickr.urls.lookupUser'
        +'&api_key=adbefb3a77a3ae86f2883e7968876f40'
        +'&format=json&nojsoncallback=1'
        +'&url=' + user_url,
        onload: function(resp) {
            var data = eval('(' + resp.responseText + ')');
            var nsid = data.user.id;

            if (nsid != null) {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url:    'http://api.flickr.com/services/rest/'
                    +'?method=flickr.favorites.getPublicList'
                    +'&api_key=adbefb3a77a3ae86f2883e7968876f40'
                    +'&format=json&nojsoncallback=1'
                    +'&user_id=' + nsid,
                    onload: function(getPublicListResponse) {
                        var data   = eval('(' + getPublicListResponse.responseText + ')');
                        var photos = data.photos.photo;

                        var photos_div = document.createElement('div');
                        li_el.appendChild(photos_div);
                        for (var i = 0; i < photos.length; i++) {
                            var photo  = photos[i];
                            if (photos_to_ignore[photo.id]) {
                                continue;
                            } else if (++photo_count > MAX_IMGS) {
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

                            photos_div.style.margin = '8px';
                            photos_div.appendChild(a);
                        }
                    }
                });
            }
        }
    });
}
