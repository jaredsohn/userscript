// ==UserScript==
// @name		flickr_stream_download_list
// @namespace	flickr
// @include     http://*.flickr.com/photos/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @grant       none
// ==/UserScript==

var done = false
function starting(e) {
    if (done == false && e.target.innerHTML.indexOf("Y.FlickrAppPhotostream.init") > 0) 
    {
        var script = document.createElement('script');   
        script.innerHTML = e.target.innerHTML.replace("Y.FlickrAppPhotostream.init","window.listData = Y.listData;Y.FlickrAppPhotostream.init");
        e.preventDefault();
        done = true;
        document.getElementsByTagName('head')[0].appendChild(script); 
    }
}

document.addEventListener("beforescriptexecute", starting, true);
var inject_code = '<button id="_flickr_download_list_btn" style="z-index:10000;position:fixed;top:5px;left:5px;padding:20px;">Get download list</button>';

jQuery(window).load(function()
{
    function _get_list()
    {
        var list = "";
        for ( i in window.listData.rows)
        {
            for ( j in window.listData.rows[i].row)
            {
                list += window.listData.rows[i].row[j].sizes.o.url + "<br/>\n";
            }
        }

        var out = window.open('data:text/html,get_list_text');
        out.addEventListener('load', function() {out.document.write(list);} );

    }
	jQuery("body").append(inject_code);
	jQuery("#_flickr_download_list_btn").click(_get_list);
});