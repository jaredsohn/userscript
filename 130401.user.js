// ==UserScript==
// @name        Niconvert Comment Link
// @namespace   qixinglu.com
// @description 显示 Acfun 和 Bilibili 的弹幕评论地址
// @grant       none
// @include     http://www.bilibili.tv/video/*
// @include     http://bilibili.kankanews.com/video/*
// @include     http://www.acfun.tv/v/*
// ==/UserScript==

'use strict';

let $ = document.querySelector.bind(document);
let $e = document.createElement.bind(document);

let LinkCreater = {

    comment: function(url) {
        let link = $e('a');
        link.href = url;
        link.text = '评论地址';
        link.target = '_blank';
        return link;
    },

    convert: function(url) {
        let url = encodeURIComponent(url);
        let link = $e('a');
        link.href = 'http://niconvert.appspot.com/?url=' + url;
        link.text = '转换弹幕';
        link.target = '_blank';
        return link;
    },

    assist: function(url) {
        let link = $e('a');
        link.href = url;
        link.text = '辅助地址';
        link.target = '_blank';
        return link;
    },

};

let pages = [
{
    urls: ['http://www.bilibili.tv/video/',
           'http://bilibili.kankanews.com/video/'],
    handle: function() {
        let aidReg = new RegExp('/av([0-9]+)/');
        let cidReg = new RegExp("cid=([0-9]+)|cid:'(.+?)'");
        let h1Reg = new RegExp('<h2 title="(.+?)">');

        let html = $('body').innerHTML;
        let aid = html.match(aidReg)[1];
        let cid = html.match(cidReg).filter((x) => x !== undefined)[1];
        let h1 = html.match(h1Reg)[1];

        let commentUrl = 'http://comment.bilibili.tv/' + cid + '.xml';
        let commentLink = LinkCreater.comment(commentUrl);
        let assistUrl = 'b://aid=' + aid + ',cid=' + cid;
        let assistLink = LinkCreater.assist(assistUrl);
        let convertUrl = location.href;
        let convertLink = LinkCreater.convert(convertUrl);

        assistLink.style.marginLeft = '13px';
        convertLink.style.marginLeft = '13px';

        let wrap = $e('div');
        wrap.style.marginTop = '3px';
        wrap.style.float = 'left';
        wrap.appendChild(commentLink);
        wrap.appendChild(assistLink);
        wrap.appendChild(convertLink);

        $('.tminfo').appendChild(wrap);
        $('.sf').style.marginTop = '24px';
    },
},
{
    urls: ['http://www.acfun.tv/v/'],
    handle: function() {
        let url = location.href;
        let req = new XMLHttpRequest();
        req.open('GET', url, true);

        let onloadFunc = function() {
            let aidReg = new RegExp('/ac([0-9]+)');
            let vidReg = new RegExp('active" data-vid="(.+?)"');
            let h1Reg = new RegExp('<h1>(.+?)</h1>');

            let html = req.responseText;
            let aid = html.match(aidReg)[1];
            let vid = html.match(vidReg)[1];
            let h1 = html.match(h1Reg)[1];

            this.reqCid1(aid, vid);
        };

        req.onload = onloadFunc.bind(this);
        req.send();
    },
    reqCid1: function(aid, vid) {
        let url = 'http://www.acfun.tv/api/getVideoByID.aspx?vid=' + vid;
        let req = new XMLHttpRequest();
        req.open('GET', url, true);

        let onloadFunc = function() {
            let cid = JSON.parse(req.responseText).cid;
            if (cid) {
                this.appendLinks(aid, vid, cid);
            } else {
                this.reqCid2(aid, vid);
            }
        };

        req.onload = onloadFunc.bind(this);
        req.send();
    },
    reqCid2: function(aid, vid) {
        let url = 'http://www.acfun.tv/video/getVideo.aspx?id=' + vid;
        let req = new XMLHttpRequest();
        req.open('GET', url, true);

        let onloadFunc = function() {
            let cid = JSON.parse(req.responseText).danmakuId;
            this.appendLinks(aid, vid, cid);
        };

        req.onload = onloadFunc.bind(this);
        req.send();
    },
    appendLinks: function(aid, vid, cid) {
        let commentUrl =  'http://comment.acfun.tv/' + cid + '.json';
        let assistUrl = 'a://aid=' + aid + ',cid=' + cid +
                        ',vid=' + vid;
        let convertUrl = location.href;

        let commentLink = LinkCreater.comment(commentUrl);
        let assistLink = LinkCreater.assist(assistUrl);
        let convertLink = LinkCreater.convert(convertUrl);

        assistLink.style.marginLeft = '13px';
        convertLink.style.marginLeft = '13px';

        let styleNode = $e('style');
        styleNode.scoped = true;
        styleNode.textContent = 'a { color: #999999; }';

        let wrap = $e('div');
        wrap.style.marginTop = '3px';
        wrap.style.float = 'left';
        wrap.appendChild(styleNode);
        wrap.appendChild(commentLink);
        wrap.appendChild(assistLink);
        wrap.appendChild(convertLink);

        let wrapParent = $('#subtitle-article');
        wrapParent.style.marginBottom = '20px';
        wrapParent.appendChild(wrap);
    },
},
];

for (let page of pages) {
    for (let url of page.urls) {
        if (location.href.startsWith(url)) {
            page.handle();
        }
    }
};
