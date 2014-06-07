// ==UserScript== 
// @name           Pixiv Lazy plus
// @namespace      pixivlazyplus
// @description    provide a direct link to original image ([s] link).
// @version        0.7.9
// @include        http://www.pixiv.net/*
// ==/UserScript==
// version 0.7.9 - fix for no profile image
// version 0.7.8 - fix for spapi return value changes
// version 0.7.7 - change [s] to [M](go directly to manga page) for manga links
// version 0.7.6 - fix prev/next [s] link
// version 0.7.5 - fix new manga page
// version 0.7.4 - fix modified images
// version 0.7.3 - fix missing session ID when it is not the end of cookie
// version 0.7.2 - fix comma in tags breaking parsing logic
// version 0.7.1 - fix iPhone API by supplying session ID
// version 0.7 - work with new sample images with iPhone API, fix old manga
// version 0.6.1 - preload manga images
// version 0.6 - change manga mode to big images
// version 0.5 - remove [b] link, add stylish style class
// version 0.4 - updated to filter new thumbnails
// version 0.3 - fix a bug, hat-tip to syosyo
// version 0.2 - updated on 2008-06-25
var pixivlink_run = 0;
var isNewManga = 1;
var postProcImg = new Array();
var preloadImg = new Array();
var sessID = (/PHPSESSID=[^;]*?(?=;|$)/.exec(document.cookie) || "");

String.prototype.splitCSV = function(sep) {
  for (var foo = this.split(sep = sep || ","), x = foo.length - 1, tl; x >= 0; x--) {
    if (foo[x].replace(/"\s+$/, '"').charAt(foo[x].length - 1) == '"') {
      if ((tl = foo[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
        foo[x] = foo[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
      } else if (x) {
        foo.splice(x - 1, 2, [foo[x - 1], foo[x]].join(sep));
      } else foo = foo.shift().split(sep).concat(foo);
    } else foo[x].replace(/""/g, '"');
  } return foo;
};

function GetImageIDFromLink(imageLink) {
    var imgID = 0; // If lower 11319936 it means Manga does not have Big version

    var re = /\d+(_[a-z0-9]+)?\.(jpe?g|gif|png)\??.*$|id=[0-9]+$/;
    var s = re.exec(imageLink);
    if (s && s.length > 0) {
        re = /\d+/;
        imgID = re.exec(s[0])[0];
    }
    return imgID;
}

function pixivlink() {
    //alert(pixivlink_run);
    if (!pixivlink_run) pixivlink_run = 1;
    else return;
    var Items = document.getElementsByTagName('img');
    var rexa = /\?mode\=medium\&illust_id|\?mode\=big\&illust_id/;
    var rexb = /source.pixiv.net/;
    var rexc = /\img-inf\//;
    var rexd = /\mobile\//;
    for (var i = 0; i < Items.length; i++) {
        var imgR = Items[i];
        var aR = imgR.parentNode.parentNode;
        var aR2 = imgR.parentNode;
        if (rexa.test(aR2.href)) {
            aR = aR2;
        }
        if (rexa.test(aR.href)) {
            var imgID = GetImageIDFromLink(imgR.src);
            var srcR = imgR.src.replace(/_s\.|_m\.|_100\.|_64x64\./i, ".");
//            var hrefR = aR.href.replace(/medium/i, "big");
            var tdR = aR.parentNode;
/*            var linkB = document.createElement('a');
            linkB.href = hrefR;
            linkB.target = '_blank';
            linkB.style.padding = '0 2px';
            linkB.className = '_pxlazy';
            linkB.appendChild(document.createTextNode('[b]'));
            tdR.appendChild(linkB);*/
//            tdR.appendChild(document.createTextNode(' '));
            if (!rexb.test(srcR)) {
                var linkS = document.createElement('a');
                linkS.href = srcR;
                linkS.target = '_blank';
                linkS.className = '_pxlazy _pxlazy_s';
                linkS.setAttribute('id', 'ill_' + imgID);
                linkS.appendChild(document.createTextNode('[s]'));
                tdR.appendChild(linkS);
                if (rexc.test(imgR.src)||rexd.test(imgR.src)) {
                    postProcImg.push(imgID);
                }
            }
        }
    }

    if (postProcImg.length > 0) {
        for (var x = 0; x < postProcImg.length; x++) {
            GM_xmlhttpRequest({
                url: 'http://spapi.pixiv.net/iphone/illust.php?' + sessID + (sessID ? '&' : '') + 'illust_id=' + postProcImg[x],
                method: "GET",
                headers: {
                    Referer: "http://www.pixiv.net"
                },
                onload: function (response) {
                    if (response.status == 200) {
                        var rexb = /source.pixiv.net/;
                        var vals = response.responseText.splitCSV();
                        /*var vtxt = '';
                        for(var x=0;x < vals.length;x++)
                            vtxt=vtxt+x+':'+vals[x]+"\n";
                            GM_log(vtxt);*/
                        if (vals.length > 0) {
                            var slnk, imgID, isRestricted;
                            isRestricted = rexb.test(vals[6]);
                            if (!isRestricted) {
                                imgID = vals[0];
                            } else {
                                imgID = GetImageIDFromLink(response.finalUrl);
                            }
                            slnk = document.getElementById('ill_' + imgID);
                            if (slnk) {
                                var goodSlink;
                                if (vals[19].length > 0) {
                                    goodSlink = 'http://www.pixiv.net/member_illust.php?mode=manga&illust_id=' + imgID;
                                    slnk.innerHTML = '[M]';
                                } else {
                                    var re = new RegExp('/' + vals[0] + '_.*$');
                                    if (!isRestricted) {// use 480mw instead
                                        goodSlink = vals[9].replace(/mobile\//, '').replace(re, '/' + vals[0] + '.' + vals[2]);
                                    } else { //salvage from profile image
                                        re = /\/[0-9_]+\..*$/;
                                        goodSlink = vals[29].replace(/mobile\//, '').replace(/profile\//, 'img/').replace(re, '/' + imgID + '.' + vals[2]);
                                    }
                                }
                                slnk.href = goodSlink;
								slnk.title=vals[12];
                                slnk.className = '_pxlazy _pxlazy_s _pxlazy_s_new';
                            }
                        }
                    }
                }
            });
        }
    }

    var links = document.getElementsByTagName('a');
    var tagslink = /tags\.php\?tag=/;
    for (var i = 0; i < links.length; i++) {
        if (tagslink.test(links[i].href))
            links[i].href = links[i].href.replace("tags.php?tag=", "search.php?s_mode=s_tag_full&word=");
    }

    if (unsafeWindow.pixiv && unsafeWindow.pixiv.context.images) {
        isNewManga = (GetImageIDFromLink(unsafeWindow.pixiv.context.images[0]/*[0]*/) >= 11319936);
        for (var x = 0; x < unsafeWindow.pixiv.context.images.length; x++) {
            if (isNewManga) unsafeWindow.pixiv.context.images[x]/*[0]*/ = unsafeWindow.pixiv.context.images[x]/*[0]*/.replace(/_p(\d+\.[a-zA-Z\?\d]+)$/, "_big_p$1");
            preloadImg.push(new Image());
            preloadImg[preloadImg.length - 1].src = unsafeWindow.pixiv.context.images[x]/*[0]*/;
        }
        //setTimeout(mangaFull,250);
        mangaFull();
    }
}

function mangaFull() {
    Items = document.getElementsByTagName('img');
    for (var x = 0; x < Items.length; x++) {
        var datasrc = Items[x].getAttribute("data-src");
        if (datasrc) datasrc = datasrc.replace(/_p(\d+\.[a-zA-Z\?\d]+)$/, "_big_p$1");
        Items[x].setAttribute("data-src", datasrc);
        if (isNewManga) Items[x].src = datasrc ? datasrc : Items[x].src.replace(/_p(\d+\.[a-zA-Z\?\d]+)$/, "_big_p$1");
    }
}

window.addEventListener("load", pixivlink, true);