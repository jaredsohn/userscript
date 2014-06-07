// ==UserScript==
// @name           Bangumi Music+
// @namespace      http://bgm.tv/group/topic/10395
// @description    Bangumi.tv 音乐增强
// @version        0.7.4
// @icon           http://bgm.tv/favicon.ico
// @include        http://bgm.tv/subject/*
// @include        http://bgm.tv/index/*
// @include        http://bgm.tv/music/*
// @include        http://bgm.tv/subject_search/*
// @exclude        http://bgm.tv/subject/*/*
// @include        http://bangumi.tv/subject/*
// @include        http://bangumi.tv/index/*
// @include        http://bangumi.tv/music/*
// @include        http://bangumi.tv/subject_search/*
// @exclude        http://bangumi.tv/subject/*/*
// @include        http://chii.in/subject/*
// @include        http://chii.in/index/*
// @include        http://chii.in/music/*
// @include        http://chii.in/subject_search/*
// @exclude        http://chii.in/subject/*/*
// ==/UserScript==

function createLink(d){
    if (document.getElementById('navMenuNeue').children[2].children[0].className == "focus chl" ||  window.location.href.match("/index/") || window.location.href.match("/subject_search/") || window.location.href.match("/music/")){
    var b = document.createElement("a");
    b.href = d;
    b.target = "_blank";
    b.title = "虾米收听";
    b.setAttribute("xiamiLink", true);
    var c = document.createElement("img");
    c.style.border = "none";
    c.style.height = '12px';
    c.style.width = '14px';
    c.style.marginLeft = "3px";
    c.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAIAAADd4huNAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA5UlEQVQokY2RMU7DYAyFPycmagaGqmHPPbJAJcQZOEEG5g4MpKILA0vXLgxcgh2pnAIkZlQaJiTy/+nP4CjNGMuy3rOenyVb6pUwLpTDaGloj2S6ausqTufLyXk1FNVVDCgO4LR81bwwtf/c1rcxMH1oDVhEwUvwonmxXyiwX6jmhTWBdL40HLxocN2QgWEFJpdVOMjvyz0Q4QQn/n07W3tgtvb+482awPfNSXp1Z1Rt0c/jBZBtml2ZANCdJXjZlYnRCMcxAUe2aYa0z8717PnPbLKnxsx61/4C8nWdjH0B7dhv/QP3jGd5Dn2pqwAAAABJRU5ErkJggg==";
    b.appendChild(c);
    return b
        }
};
function createlinkmf(d){
    if (document.getElementById('navMenuNeue').children[2].children[0].className == "focus chl" ||  window.location.href.match("/index/") || window.location.href.match("/subject_search/") || window.location.href.match("/music/")){
    var b = document.createElement("a");
    b.href = d;
    b.target = "_blank";
    b.title = "萌否收听";
    b.setAttribute("moefouLink", true);
    var c = document.createElement("img");
    c.style.border = "none";
    c.style.height = '12px';
    c.style.width = '14px';
    c.style.marginLeft = "3px";
    c.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAq0lEQVQokZWQMRKCMBBFXzIWQqM1hZzGU6EV46W08gR6A8XKMhSolWsBCUxYdHxV5u/7G4gRETxm+6gApExzBmi5jYYZkHnxay4ifriSMvUywK1zRrmUaW7YNP23/sHMH/zWX3S39kVtOCRerBZjUVtkR0nEcvdU81CsXzIpLuYGgMqFd6wtcAQ43WUkArgiwRUJAJe+eA7/eHVvwAZJo3VaDJtmD6wnbZ3DB3eITW5wDuG7AAAAAElFTkSuQmCC";
    b.appendChild(c);
    return b
        }
};
function getText(d){
    b = d.textContent.replace(/^\s+(.*)\s+$/, '$1');
    return b
}

try {
    var h1 = document.getElementsByTagName("h1")[0];
    var title = getText(h1);
    if (h1 && window.location.href.match("/subject/")) {
        h1.appendChild(createLink("http://www.xiami.com/search/find?album=" + encodeURIComponent(title)));
        h1.appendChild(createlinkmf("http://moe.fm/search/direct?title=" + encodeURIComponent(title)));
    }
}
catch (e) {
}
try {
    var h1 = document.getElementsByTagName("h1")[0];
    var title = getText(h1);
    var songlist = document.getElementsByTagName("h6");
    for (var i = 0; i <  songlist.length; i++) {
        var song = songlist[i].getElementsByTagName("a")[0];
        var songname = song.textContent.replace(/^\d+\s/,"")
        if (h1 && song) {
            song.appendChild(createLink("http://www.xiami.com/search/find?album=" + encodeURIComponent(title) + "&song=" + encodeURIComponent(songname)))
        }
    }
}
catch (e) {
}
try {
    for (var i = 0; i <  document.getElementsByTagName("h3").length; i++) {
        var albumname = document.getElementsByTagName("h3")[i].getElementsByTagName("small")[0];
        var album = document.getElementsByTagName("h3")[i].getElementsByTagName("a")[0];
        if (window.location.href.match("/music/") || document.getElementsByTagName("h3")[i].getElementsByTagName("span")[0].className == "ico_subject_type subject_type_3 ll") {
            if (albumname) {
                albumname.appendChild(createLink("http://www.xiami.com/search/find?album=" + encodeURIComponent(albumname.textContent)))
                albumname.appendChild(createlinkmf("http://moe.fm/search/direct?title=" + encodeURIComponent(albumname.textContent)))
            }
            else if (album) {
                album.appendChild(createLink("http://www.xiami.com/search/find?album=" + encodeURIComponent(album.textContent)))
                album.appendChild(createlinkmf("http://moe.fm/search/direct?title=" + encodeURIComponent(album.textContent)))
            }
        }
    }
}
catch (e) {
}