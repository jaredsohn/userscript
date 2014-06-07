// ==UserScript==
// @name                Motherless on Steroids
// @description         Various improvements for motherless.com: direct download links, remove ads, auto-buffering video, visual enhancements, etc.
// @author              xantilas
// @version             2.0
// @include             http://motherless.com/*
// @grant               GM_xmlhttpRequest
// @downloadURL         https://userscripts.org/scripts/source/126040.user.js
// ==/UserScript==




removeAds();
visualEnhancements();
loadContent();
startBuffering();
showDownload();
loadStatic();


function removeAds() {
    try {
        removeElement(document.getElementById('home-page-welcome').parentElement);
        removeElement(document.getElementById('anonymous-notice'));
    } catch (objErr) {}
    var elementCollection = document.getElementsByTagName('h2');
    for (var i = 0; i < elementCollection.length; i++) {
        switch (elementCollection[i].textContent.trim()) {
        case 'Our Friends':
            removeElement(elementCollection[i].parentElement);
            i--;
            break;
        }
    }
    try {
        removeElement(document.getElementById('top-referers-row'));
        removeElement(document.getElementById('spot_view_sb_1'));
        removeElement(document.getElementById('spot_view_sb_2'));
    } catch (objErr) {}
    var elementCollection = document.getElementsByTagName('div');
    for (var i = 0; i < elementCollection.length; i++) {
        switch (elementCollection[i].className) {
        case 'tiny-thumb':
            removeElement(elementCollection[i]);
            i--;
            break;
        }
        switch (elementCollection[i].getAttribute('style')) {
        case 'margin-top: 15px; margin-bottom: 15px;':
            removeElement(elementCollection[i]);
            i--;
            break;
        }
    }
    contentEval('im.closePopup();');
}

function visualEnhancements() {
    try {
        document.getElementById('view-page').style.width = '100%';
        document.getElementById('media-info').style.marginLeft = 'auto';
        document.getElementById('media-info').style.marginRight = 'auto';
        if (getVar('__mediatype') == 'video') {
            document.getElementById('media-media').innerHTML = '<div style="width: 710px; margin: auto;"><div id="mediaspace"></div></div>';
            contentEval(loadPlayer);
            contentEval('loadPlayer("' + getVar("__codename") + '", "' + getVar("__fileurl") + '");');
        }
        document.getElementById('comment-success').style.marginLeft = 'auto';
        document.getElementById('comment-success').style.marginRight = 'auto';
        document.getElementById('comment-success').style.setProperty('width', '700px', 'important');
        document.getElementById('media-comments-form').style.paddingRight = '5px';
        document.getElementById('media-comments-form').style.textAlign = 'center';
        document.getElementById('media-comments-form').style.marginBottom = '50px';
        document.getElementById('media-comments-form').parentElement.insertBefore(document.getElementById('media-comments-wrapper'), document.getElementById('media-comments-form'));
        document.getElementById('media-comments-form').parentElement.insertBefore(document.getElementById('comment-success'), document.getElementById('media-comments-form'));
        var elementArray = ['comment', 'media-comment-submit'];
        for (var i = 0; i < elementArray.length; i++) {
            document.getElementById(elementArray[i]).style.marginLeft = 'auto';
            document.getElementById(elementArray[i]).style.marginRight = 'auto';
            document.getElementById(elementArray[i]).style.setProperty('width', '710px', 'important');
            document.getElementById(elementArray[i]).style.resize = 'none';
        }
        document.getElementById('comment').style.height = '100px';
        document.getElementById('media-comment-submit').style.height = '40px';
        document.getElementById('media-comments-wrapper').style.height = 'auto';
        document.getElementById('media-comments-wrapper').style.margin = 'auto auto 30px auto';
        document.getElementById('media-comments-wrapper').style.width = '710px';
    } catch (objErr) {}
    try {
        document.getElementById('full_image').style.textAlign = 'center';
        var elementCollection = document.getElementById('full_image').getElementsByTagName('img');
        for (var i = 0; i < elementCollection.length; i++) {
            elementCollection[i].style.width = '100%';
            elementCollection[i].parentElement.href = getVar('__fileurl');
        }
    } catch (objERR) {}
    var elementCollection = document.getElementsByTagName('td');
    for (var i = 0; i < elementCollection.length; i++) {
        switch (elementCollection[i].className) {
        case 'left-side content':
            elementCollection[i].style.paddingRight = '5px';
            break;
        case 'right-side sidebar':
            removeElement(elementCollection[i]);
            i--;
            break;
        case 'right-side comments':
            elementCollection[i].id = 'comments-tweaked';
            break;
        case 'footer-ads':
            try {
                elementCollection[i].parentElement.replaceChild(document.getElementById('comments-tweaked'), elementCollection[i]);
                document.getElementById('comments-tweaked').className = 'left-side comments';
                document.getElementById('comments-tweaked').style.paddingRight = '5px';
            } catch (objErr) {}
            break;
        }
    }
    var elementCollection = document.getElementsByTagName('div');
    for (var i = 0; i < elementCollection.length; i++) {
        switch (elementCollection[i].className) {
        case 'sub_menu dark-menu':
            elementCollection[i].style.width = 'auto';
            break;
        case 'media-comment':
            elementCollection[i].style.width = 'auto';
            break;
        }
    }
}

function loadContent() {
    try {
        document.getElementById('content-jumplinks').id = 'content-jumplinks-tweaked';
        GM_xmlhttpRequest({
            method: 'GET',
            url: '/view/jumplinks?codename=' + getVar('__codename'),
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            onload: function (objResponse) {
                document.getElementById('content-jumplinks-tweaked').innerHTML = objResponse.responseText;
                var elementCollection = document.getElementById('content-jumplinks-tweaked').getElementsByTagName('div');
                for (var i = 0; i < elementCollection.length; i++) {
                    switch (elementCollection[i].className) {
                    case 'media-linked':
                        elementCollection[i].style.marginLeft = 'auto';
                        elementCollection[i].style.marginRight = 'auto';
                        break;
                    case 'content-inner':
                        elementCollection[i].style.width = '692px';
                        elementCollection[i].style.textAlign = 'center';
                    }
                    switch (elementCollection[i].getAttribute('data-action')) {
                    case 'OurFriends':
                        removeElement(elementCollection[i]);
                        i--;
                        break;
                    }
                }
            }
        });
    } catch (objErr) {}
}

function startBuffering() {
    if (getVar('__mediatype') == 'video') {
        contentEval('jwplayer("mediaspace").play(true); jwplayer("mediaspace").play(false);');
    }
}

function showDownload() {
    strType = getVar('__mediatype');
    strLink = getVar('__fileurl');
    if (strLink) {
        var elementCollection = document.getElementsByTagName('div');
        for (var i = 0; i < elementCollection.length; i++) {
            switch (elementCollection[i].className) {
            case 'sub_menu dark-menu':
                var newLink = document.createElement('a');
                newLink.id = 'downloadLink';
                newLink.className = 'head_link';
                newLink.style.fontSize = '14px';
                newLink.href = strLink;
                newLink.textContent = (strType == 'video' ? 'Download Video' : 'View Image')
                elementCollection[i].appendChild(newLink);
                break;
            }
        }
        document.getElementById('button-download').setAttribute('onclick', 'location.href = "' + strLink + '"');
        if (strType == 'image') {
            document.getElementById('button-download').innerHTML = '<img src="/images/icons/download.png"> View image';
        }
        document.getElementById('button-download').id = 'button-download-tweaked';
        if (strType == 'video') {
            GM_xmlhttpRequest({
                url: strLink,
                method: 'HEAD',
                onload: function (objResponse) {
                    var strHead = objResponse.responseHeaders.match('Content-Length: \\d+').toString();
                    var size = strHead.match('\\d+').toString() / (1024 * 1024);
                    size = size.toFixed(2);
                    document.getElementById('downloadLink').title = size + ' Mb';
                    document.getElementById('button-download-tweaked').title = size + ' Mb';
                }
            });
        }
    }
}

function loadStatic() {
    var elementArray = ['http://c.statcounter.com/9725454/0/a53e6548/1/', 'http://c4.gostats.com/bin/count/a_390200/t_5/i_1/counter.png'];
    for (var i = 0; i < elementArray.length; i++) {
        var newImage = document.createElement('img');
        newImage.style.visibility = 'hidden';
        newImage.src = elementArray[i];
        document.getElementById('main').appendChild(newImage);
    }

}

function loadPlayer(codename, fileurl) {
    jwplayer("mediaspace").setup({
        "file": fileurl,
        "image": "http://thumbs.motherlessmedia.com/thumbs/" + codename + ".jpg",
        "startparam": "start",
        "mute": false,
        "controlbar": "over",
        "repeat": false,
        "height": 565,
        "wmode": "opaque",
        "abouttext": "Motherless",
        "aboutlink": "http://motherless.com/about",
        "width": 710,
        "tracks": [{
            "file": "/view/vtt?codename=" + codename,
            "kind": "thumbnails"
        }],
    });
}

function removeElement(elementItem) {
    elementItem.parentElement.removeChild(elementItem);
}

function contentEval(source) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

function getVar(strVar) {
    var strHTML = document.documentElement.innerHTML;
    try {
        strHTML = strHTML.match(strVar + '.+?[,;]').toString();
        if (strHTML) {
            eval('var ' + strHTML.slice(0, -1));
            return eval(strVar);
        }
    } catch (objErr) {}
}