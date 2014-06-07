// ==UserScript==
// @name           nowa_clip
// @namespace      perlnamehoge@gmail.com
// @description    nowa-entry-add-ldclip-favorite-user-number.
// @include        http://*.nowa.jp/*
// @exclude        http://my.nowa.jp/*
// ==/UserScript==

new function () {
    var getElementsByClassName = function ( obj, cls ) {
        var obj  = obj || document;
        var tags = obj.getElementsByTagName ? obj.getElementsByTagName("*") : obj.all ;
        var reg  = ( cls.constructor == RegExp ) ? cls : new RegExp(cls);
        for ( var i = 0, res = []; i < tags.length; i++ ) {
            if ( reg.test(tags[i].className) ) res.push(tags[i]);
        }
        return res;
    }
    var $N = function (name, attr, css) {
        var elem = document.createElement( name );
        for ( var i in attr ) {
            elem[i] = attr[i];
        }
        elem.style.cssText = css;
        return elem;
    }
    getElementsByClassName(document, /^entry-title$/).forEach(function (obj) {
        var permalink = obj.childNodes[0].href;
        var clip_page = $N("a", {
              href : "http://clip.livedoor.com/page/" + permalink
        }, "");
        var clip_image = $N("img", {
                         src : "http://image.clip.livedoor.com/counter/medium/" + permalink
        }, "margin-left:5px;");
        clip_page.appendChild( clip_image );
        obj.appendChild( clip_page );
    });
}