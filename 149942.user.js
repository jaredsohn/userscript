// ==UserScript==
// @name           9GAG NSFW Viewer (Images + Videos and Comments) AJAX
// @version        1.9
// @description    It lets 9GAG users view NSFW images/videos in the list, search and post-page without a 9GAG account.
// @updateURL      http://userscripts.org/scripts/source/149942.meta.js
// @include        http*://9gag.com/*
// @run-at         document-end
// ==/UserScript==

var isLoaded = false;

(function gag9nsfw() {
    if (document.readyState != 'complete') {
        setTimeout(gag9nsfw, 0);
        return;
    }

    var entryList = document.getElementById("entry-list-ul");
    if (entryList == null) {
        var body = document.getElementById("page-nsfw");
        if (body != null) {
            gag9nsfwBody(body);
        } else {
            var body = document.getElementById("page-search");
            if (body != null)
                gag9nsfwBodySearch(body);
        }
    } else {
        entryList.addEventListener("DOMNodeInserted", gag9nsfwAjax, false);
        var entries = entryList.getElementsByClassName("entry-item");
        if (entries != null && entries.length > 1) {
            for (var i = 0; i < entries.length; i++) {
                gag9nsfwNode(entries[i]);
            }
        }
    }


})();

function gag9nsfwAjax(event) {
    gag9nsfwNode(event.target);
}

function checkUrl(url, callback) {
    var img = new Image();
    img.onerror = function() { callback(url, false); };
    img.onload =  function() { callback(url, true); };
    img.src = url;
}

function gag9nsfwNodeCheckPossibleImages(imgTag, images) {
    if (images == null || images.length == 0)
        return;

    checkUrl(images.pop(), function(url, result) {
        if (result) {
            imgTag["src"] = url;
        } else if (images.length > 0) {
            gag9nsfwNodeCheckPossibleImages(imgTag, images);
        }
    });
}

function gag9nsfwNodeAddVideoOrImage(contentTag, imgTag, dataurl, images) {
    var gagPage = new XMLHttpRequest();
    gagPage.open("GET", dataurl, true);
    gagPage.onreadystatechange = function() {
        if (gagPage.readyState === 4) {  // Makes sure the document is ready to parse.
            if (gagPage.status === 200) {  // Makes sure it's found the file.
                var allText = gagPage.responseText;

                var videoId = allText.match(/<link rel=\"image_src\" href=\"http:\/\/img.youtube.com\/vi\/(.+)\/0.jpg\" \/ >/i);
                if (videoId != null && videoId.length > 1) {
                    contentTag.innerHTML = videoHTMLPreview.replace(/VIDEOID/g, videoId[1]);
                    return;
                }

                var imageUrl = allText.match(/<meta name=\"twitter:image\" value=\"(.+)\"\/>/i);
                if (imageUrl != null && imageUrl.length > 1) {
                    var photo = imageUrl[1];
                    photo = photo.replace("_fbthumbnail.jpg", "_460s.jpg").replace("_fbthumbnail_v1.jpg", "_460s_v1.jpg").replace("_fbthumbnail_v2.jpg", "_460s_v2.jpg").replace("_fbthumbnail_v3.jpg", "_460s_v3.jpg");
                    imgTag["src"] = photo;
                    return;
                }

                gag9nsfwNodeCheckPossibleImages(imgTag, images);
            } else {
                gag9nsfwNodeCheckPossibleImages(imgTag, images);
            }
        }
    }
    gagPage.send(null);
}

function gag9nsfwNode(node) {
    if (node == null)
        return;

    var contents = node.getElementsByClassName("content");
    if (contents == null || contents.length == 0)
        return;

    var imgs = contents[0].getElementsByTagName("img");
    if ((imgs == null || imgs.length == 0) || imgs[0]["alt"] != "NSFW")
        return;

    var dataurl = node.getAttribute("data-url");

    var gagid = node.getAttribute("gagid");
    if (gagid == null && dataurl != null)
        gagid = dataurl.split("/")[4];

    if (gagid == null)
        return;

    var images = new Array();
    images.push("http://d24w6bsrhbeh9d.cloudfront.net/photo/"+gagid+"_460s.jpg");
    images.push("http://d24w6bsrhbeh9d.cloudfront.net/photo/"+gagid+"_460s_v1.jpg");
    images.push("http://d24w6bsrhbeh9d.cloudfront.net/photo/"+gagid+"_460s_v2.jpg");
    images.push("http://d24w6bsrhbeh9d.cloudfront.net/photo/"+gagid+"_460s_v3.jpg");

    gag9nsfwNodeAddVideoOrImage(contents[0], imgs[0], dataurl, images);
}

function gag9nsfwBody(body) {
    if (body == null || body["id"] != "page-nsfw")
        return;

    var imageUrl = null;
    var metas = document.getElementsByTagName("meta");
    if (metas != null && metas.length > 0) {
        for (var i = 0; i < metas.length; i++) {
            if (metas[i]["name"] == "twitter:image") {
                imageUrl = metas[i].getAttribute("value");
                break;
            }
        }
    }

    var contents = body.getElementsByClassName("content");
    if (contents == null || contents.length == 0)
        return;

    var imgs = contents[0].getElementsByTagName("img");
    if (imgs == null || imgs.length == 0)
        return;

    var links = document.getElementsByTagName("link");
    if (links == null || links.length == 0)
        return;

    for (var i = 0; i < links.length; i++) {
        if (links[i]["rel"] != "image_src")
            continue;

        var photo = imageUrl;
        if (photo == null)
            photo = links[i]["href"];
        photo = photo.replace("_fbthumbnail.jpg", "_460s.jpg").replace("_fbthumbnail_v1.jpg", "_460s_v1.jpg").replace("_fbthumbnail_v2.jpg", "_460s_v2.jpg").replace("_fbthumbnail_v3.jpg", "_460s_v3.jpg");
        if (photo.indexOf("youtube") != -1) {
            contents[0].innerHTML = videoHTMLFull.replace(/VIDEOID/g, photo.split("/")[4]);
        } else {
            imgs[0]["src"] = photo;
        }
        contents[0].parentElement.className = "";

        var url = location.protocol+'//'+location.hostname;
        if (location.port == 0 || location.port == "")
            url = url+location.pathname;
        else
            url = url+':'+location.port+location.pathname;

        contents[0].innerHTML = contents[0].innerHTML + facebookHTMLComments.replace(/GAGURL/g, url);

        FB.XFBML.parse();

        return;
    }
}

function gag9nsfwBodySearch(body) {
    if (body == null || body["id"] != "page-search")
        return;

    var listEntries = body.getElementsByClassName("nsfw");
    if (listEntries == null || listEntries.length == 0)
        return;

    for (var i = 0; i < listEntries.length; i++) {
        var imgs = listEntries[i].getElementsByTagName("img");
        if (imgs == null || imgs.length == 0)
            continue;

        var a = imgs[0].parentElement;
        if (a == null || a["tagName"] != "A")
            continue;

        gagid = a["pathname"].split("/")[2];
        photo = "http://d24w6bsrhbeh9d.cloudfront.net/photo/" + gagid + "_220x145.jpg";
        imgs[0]["src"] = photo;
    }
}

var facebookHTMLComments = '\
  <div class="comment-section">\
    <h3 class="title" id="comments">Comments</h3>\
    <span class="report-and-source">\
      <p>\
        \
      </p>\
    </span>\
    <div id="entry-comments" style="margin-left:20px;">\
      <fb:comments href="GAGURL" num_posts="10" width="700"></fb:comments>\
      <p class="facebook-init-failed" style="display:none"></p>\
    </div>\
  </div><!--end div.comment-section-->\
  <br/>';

var videoHTMLPreview = '\
  <div class="video-post all-users-expand">\
    <object class="video-element" width="460" height="310">\
    <param value="http://www.youtube.com/v/VIDEOID?version=3&hl=en&showinfo=0&autohide=1" name="movie">\
    <param value="transparent" name="wmode">\
    <param value="true" name="allowFullScreen">\
    <embed class="video-element" width="460" height="310" allowscriptaccess="always" allowfullscreen="true" wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/v/VIDEOID?version=3&hl=en&showinfo=0&autohide=1">\
  </object>\
</div>';

var videoHTMLFull = '\
<div class="post-container">\
  <div class="img-wrap">\
    <div class="video-post">\
      <object width="700" height="420" class="video-element">\
        <param name="movie" value="http://www.youtube.com/v/VIDEOID?version=3&amp;hl=en&amp;showinfo=0&amp;autohide=1"/>\
        <param name="wmode" value="transparent"/>\
        <param name="allowFullScreen" value="true"/>\
        <embed src="http://www.youtube.com/v/VIDEOID?version=3&amp;hl=en&amp;showinfo=0&amp;autohide=1"\
                class="video-element"\
                type="application/x-shockwave-flash"\
                wmode="transparent"\
                allowfullscreen="true"\
                allowscriptaccess="always"\
                width="700" height="420">\
        </embed>\
      </object>\
    </div>\
  </div><!--end image-wrap--> \
</div><!--end post-container-->';