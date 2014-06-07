// ==UserScript==
// @name           LDR+SBM Counter
// @namespace      http://www.milk1000.cc/
// @include        http://*
// ==/UserScript==

(function() {
    var VERSION = '0.0.4';

    var ALWAYS_SHOW = true;
    var TOGGLE_KEY = 'z';

    var SHOW_BLANK_COMMENT_USER = false;

    var ID_PREFIX = 'gm_ldr_sbm_counter_';
    var COUNTER_ID = function(serviceName) {
        return ID_PREFIX + serviceName + '_counter';
    };

    var DEFAULT_STYLE = {
        base: [
            'border: 0',
            'margin: 0',
            'padding: 0',
            'background: black',
            'color: white',
            'font-family: Helvetica, Arial, sans-serif',
            'text-decoration: none',
            'font-weight: normal',
            'font-style: normal',
            'font-stretch: normal',
            'font-variant: normal',
            'font-size-adjust: none',
            'letter-spacing: normal',
            'line-height: 100%',
            'vertical-align: baseline',
            'z-index: 1001',
            'text-align: left',
            'cursor: auto',
            'width: auto',
            'height: auto',
            '-moz-box-sizing: content-box'
        ].join('; '),

        container: [
            'right: 0',
            'bottom: 0',
            'position: fixed'
        ].join('; '),

        item: [
            'cursor: pointer',
            'display: inline'
        ].join('; ')
    };

    var STYLE = {
        counter: {
            container: [
                DEFAULT_STYLE.base,
                DEFAULT_STYLE.container,
                'font-size: 10px',
                'padding: 2px 0',
                'opacity: 0.8',
                'display: none'
            ].join('; '),

            item: [
                DEFAULT_STYLE.base,
                DEFAULT_STYLE.item
            ].join('; '),

            image: [
                DEFAULT_STYLE.base,
                DEFAULT_STYLE.item,
                'width: 12px',
                'height: 12px',
                'padding: 0 2px 0 4px'
            ].join('; ')
        },

        comments: {
            container: [
                DEFAULT_STYLE.base,
                DEFAULT_STYLE.container,
                'padding: 10px',
                'margin-bottom: 17px',
                'overflow: auto',
                'max-width: 480px',
                'min-height: 0',
                'max-height: 240px'
            ].join('; '),

            item: [
                DEFAULT_STYLE.base,
                'font-size: 13px',
                'line-height: 1.6',
                'padding-left: 26px',
                '-webkit-background-size: 16px 16px'
            ].join('; '),

            name: [
                DEFAULT_STYLE.base,
                'margin-right: 10px',
                'font-weight: bold',
                'text-decoration: underline'
            ].join('; '),

            tag: [
                DEFAULT_STYLE.base,
                'margin-right: 10px',
                'color: #ccc',
                'font-size: 90%'
            ].join('; ')
        }
    };

    var SERVICES = [
        {
            name: 'ldr',
            rssReader: true,
            link: 'http://reader.livedoor.com/subscribe/{url}',
            icon: 'http://reader.livedoor.com/favicon.ico',
            requestUrl: 'http://rpc.reader.livedoor.com/count?feedlink=' +
                '{url}&callback={callback}'
        },

        {
            name: 'hatebu',
            link: 'http://b.hatena.ne.jp/entry/{url}',
            commentIcon: function(bk) {
                return 'http://www.hatena.ne.jp/users/' +
                    bk['user'].substr(0, 2) + '/' + bk['user'] +
                    '/profile_s.gif';
            },
            requestUrl: 'http://b.hatena.ne.jp/entry/json/?url={url}&' +
                'callback={callback}',
            key: {
                count: 'count',
                comments: 'bookmarks',
                comment: 'comment',
                tags: 'tags',
                name: 'user'
            },
            unescape: true,
            showBlankCommentUser: SHOW_BLANK_COMMENT_USER
        },

        {
            name: 'delicious',
            link: 'http://del.icio.us/url/{md5}',
            requestUrl: 'http://badges.del.icio.us/feeds/json/url/data?' +
                'url={url}&callback={callback}',
            key: { count: 'total_posts' }
        },

        {
            name: 'clip',
            link: 'http://clip.livedoor.com/page/{url}',
            requestUrl: 'http://api.clip.livedoor.com/json/comments?' +
                'link={url}&callback={callback}',
            key: {
                count: 'total_clip_count',
                comments: 'Comments',
                comment: 'notes',
                tags: 'tags',
                name: 'livedoor_id'
            }
        }
    ];

    if (window != window.parent) return;

    var ldrsbmcounter = function() {
        var LdrSbmCounter = function() {
            this.initialize.apply(this, arguments);
        };

        LdrSbmCounter.prototype = {
            url: location.href,
            jsc: (new Date).getTime(),
            display: ALWAYS_SHOW,
            enable: false,
            commentsContainers: [],
            counterContainer: null,

            initialize: function() {
                this.counterContainer = this.createCounterContainer();
                document.body.appendChild(this.counterContainer);
                this.addKeyDownEventListener();
            },

            createCounterContainer: function() {
                var container = document.createElement('div');
                container.setAttribute('style', STYLE.counter.container);

                var self = this;

                SERVICES.forEach(function(service) {
                    container.appendChild(
                        self.createCounter.call(self, service)
                    );
                });

                return container;
            },

            createCounter: function(service) {
                var item = document.createElement('div');
                item.setAttribute('id', COUNTER_ID(service.name));
                item.setAttribute('style', STYLE.counter.item);

                var img = new Image();
                img.setAttribute('style', STYLE.counter.image);
                img.setAttribute('src', this.getFaviconUrl(service));
                item.appendChild(img);

                var container, self = this;

                var rssReaderHandler = function() {
                    var feeds = self.findFeeds();

                    if (feeds.length == 0) {
                        item.appendChild(document.createTextNode('0'));
                        return;
                    }

                    var cnt = 0;
                    feeds.forEach(function(feed) {
                        self.request(service.requestUrl, feed, function(json) {
                            if (json > 0) cnt += json;
                            if (item.lastChild.nodeType == 3)
                                item.removeChild(item.lastChild);
                            item.appendChild(document.createTextNode(cnt));
                        });
                    });
                };

                var sbmHandler = function() {
                    self.request(service.requestUrl, function(json) {
                        if (json && typeof json[service.key.count] !=
                            'undefined') {
                            item.appendChild(
                                document.createTextNode(json[service.key.count])
                            );
                            container =
                                self.createCommentsContainer(service, json);
                            if (container) {
                                item.appendChild(container);
                                container.style.display = 'none';
                                self.commentsContainers.push(container);
                            }
                        } else {
                            item.appendChild(document.createTextNode('0'));
                        }
                        if (ALWAYS_SHOW) self.counterContainer.style.display = 'block';
                        self.enable = true;
                    });
                };

                service.rssReader ? rssReaderHandler() : sbmHandler();

                item.addEventListener('mouseover', function() {
                    self.hideCommentsContainers();
                    if (container) container.style.display = 'block';
                }, false);
                item.addEventListener('mouseout', function(e) {
                    if (e.relatedTarget == self.counterContainer) return;

                    var elems = $X('//div[@id="' + this.id + '"]//*');
                    for (var i = 0; i < elems.length; i++)
                        if (e.relatedTarget == elems[i]) return;

                    self.hideCommentsContainers();
                }, false);
                item.addEventListener('click', function(e) {
                    if (e.target != item && e.target != img) return;

                    var link = service.link
                    .replace('{url}', self.url)
                    .replace('{md5}',
                             MD5_hexhash(self.url.replace(/%23/g, '#')));
                    return open(link);
                }, false);

                return item;
            },

            hideCommentsContainers: function() {
                this.commentsContainers.forEach(function(container) {
                    container.style.display = 'none';
                });
            },

            getFaviconUrl: function(service) {
                return service.link.replace(/^(http:\/\/.+?\/).+$/,
                                            '$1favicon.ico');
            },

            createCommentsContainer: function(service, json) {
                var key = service.key;

                var hasComment = function(bk) {
                    for (var i = 0; i < bk.length; i++)
                        if (bk[i][key.comment]) return true;

                    return false;
                };

                if (!key.comments ||
                    (!hasComment(json[key.comments]) &&
                     !service.showBlankCommentUser))
                    return null;

                var container = document.createElement('div');
                container.setAttribute('style', STYLE.comments.container);

                var self = this;
                json[key.comments].forEach(function(bk) {
                    if (!bk[key.comment]) {
                        if (service.showBlankCommentUser)
                            bk[key.comment] = '&nbsp;';
                        else return;
                    }

                    if (service.unescape) {
                        bk[key.name] = unescapeHTML(bk[key.name]);
                        bk[key.comment] = unescapeHTML(bk[key.comment]);
                        for (var i = 0; i < bk[key.tags].length; i++)
                            bk[key.tags][i] = unescapeHTML(bk[key.tags][i]);
                    }

                    var item = document.createElement('p');
                    item.setAttribute('style', STYLE.comments.item);

                    var bgUrl;
                    switch (typeof service.commentIcon) {
                    case 'function':
                        bgUrl = service.commentIcon(bk);
                        break;
                    case 'string':
                        bgUrl = service.commentIcon;
                        break;
                    default:
                        bgUrl = self.getFaviconUrl(service);
                        break;
                    }
                    item.style.background = 'url(' + bgUrl + ') no-repeat 0 0';

                    var name = document.createElement('span')
                    name.setAttribute('style', STYLE.comments.name);
                    name.appendChild(document.createTextNode(bk[key.name]));
                    item.appendChild(name);

                    var tags = document.createElement('span');
                    tags.setAttribute('style', STYLE.comments.tag);
                    tags.appendChild(
                        document.createTextNode(bk[key.tags].join(' '))
                    );
                    item.appendChild(tags);

                    item.appendChild(document.createTextNode(bk[key.comment]));

                    container.appendChild(item);
                });

                return container;
            },

            request: function(url, callbackOrParam, callback) {
                var name = 'jsonp' + this.jsc++;
                var w = typeof unsafeWindow != 'undefined' ?
                    unsafeWindow : window;
                var script = document.createElement('script');
                var param;

                if (typeof callbackOrParam == 'function') {
                    param = this.url;
                    callback = callbackOrParam;
                } else {
                    param = callbackOrParam;
                }

                w[name] = function(json) {
                    if (json && typeof json[0] != 'undefined') json = json[0];
                    callback(json);
                    w[name] = undefined;
                    try { delete w[name]; } catch (e) {}
                    document.getElementsByTagName('head')[0]
                    .removeChild(script);
                };

                script.type = 'text/javascript';
                script.src = url
                .replace(/{url}/, encodeURIComponent(param))
                .replace(/{callback}/, name);
                script.charset = 'utf-8';

                document.getElementsByTagName('head')[0].appendChild(script);
            },

            addKeyDownEventListener: function() {
                var self = this;
                window.addEventListener('keydown', function(e) {
                    if (String.fromCharCode(e.keyCode).toLowerCase()
                        == TOGGLE_KEY && self.enable) {
                        self.counterContainer.style.display =
                            self.display ? 'none' : 'block';
                        self.display = !self.display;
                    }
                }, true);
            },

            findFeeds: function() {
                var feeds = [];
                var types = [
                    'application/x.atom+xml',
                    'application/atom+xml',
                    'application/xml',
                    'text/xml',
                    'application/rss+xml',
                    'application/rdf+xml'
                ];

                $X('//link[@rel="alternate"]').forEach(function(link) {
                    if (types.indexOf(link.type) != -1 &&
                        feeds.indexOf(link.href) == -1)
                        feeds.push(link.href);
                });

                return feeds;
            }
        };

        new LdrSbmCounter();

        function unescapeHTML(str) {
            var memo = '';

            var div = document.createElement('div');
            div.innerHTML = str.replace(/<\/?[^>]+>/gi, '');

            if (div.childNodes)
                for (var i = 0; i < div.childNodes.length; i++)
                    memo += div.childNodes[i].nodeValue;

            return memo;
        }

        // http://lowreal.net/blog/2007/11/17/1
        function $X (exp, context, type /* want type */) {
            if (typeof context == "function") {
                type    = context;
                context = null;
            }
            if (!context) context = document;
            var exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
                var o = document.createNSResolver(context).lookupNamespaceURI(prefix);
                if (o) return o;
                return (document.contentType == "application/xhtml+xml") ? "http://www.w3.org/1999/xhtml" : "";
            });

            switch (type) {
            case String:
                return exp.evaluate(
                    context,
                    XPathResult.STRING_TYPE,
                    null
                ).stringValue;
            case Number:
                return exp.evaluate(
                    context,
                    XPathResult.NUMBER_TYPE,
                    null
                ).numberValue;
            case Boolean:
                return exp.evaluate(
                    context,
                    XPathResult.BOOLEAN_TYPE,
                    null
                ).booleanValue;
            case Array:
                var result = exp.evaluate(
                    context,
                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                    null
                );
                var ret = [];
                for (var i = 0, len = result.snapshotLength; i < len; i++) {
                    ret.push(result.snapshotItem(i));
                }
                return ret;
            case undefined:
                var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
                switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
                    // not ensure the order.
                    var ret = [];
                    var i = null;
                    while (i = result.iterateNext()) {
                        ret.push(i);
                    }
                    return ret;
                }
                }
                return null;
            default:
                throw(TypeError("$X: specified type is not valid type."));
            }
        }

        // --------------------------------------------------------------
        // MD5
        // http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
        // --------------------------------------------------------------
        /* md5.js - MD5 Message-Digest
         * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
         * Version: 2.0.0
         * LastModified: May 13 2002
         *
         * This program is free software.  You can redistribute it and/or modify
         * it without any warranty.  This library calculates the MD5 based on RFC1321.
         * See RFC1321 for more information and algorism.
         */
        var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);
        var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2), new Array( 2,17, 3), new Array( 3,22, 4), new Array( 4, 7, 5), new Array( 5,12, 6), new Array( 6,17, 7), new Array( 7,22, 8), new Array( 8, 7, 9), new Array( 9,12,10), new Array(10,17,11), new Array(11,22,12), new Array(12, 7,13), new Array(13,12,14), new Array(14,17,15), new Array(15,22,16));
        var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18), new Array(11,14,19), new Array( 0,20,20), new Array( 5, 5,21), new Array(10, 9,22), new Array(15,14,23), new Array( 4,20,24), new Array( 9, 5,25), new Array(14, 9,26), new Array( 3,14,27), new Array( 8,20,28), new Array(13, 5,29), new Array( 2, 9,30), new Array( 7,14,31), new Array(12,20,32));
        var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34), new Array(11,16,35), new Array(14,23,36), new Array( 1, 4,37), new Array( 4,11,38), new Array( 7,16,39), new Array(10,23,40), new Array(13, 4,41), new Array( 0,11,42), new Array( 3,16,43), new Array( 6,23,44), new Array( 9, 4,45), new Array(12,11,46), new Array(15,16,47), new Array( 2,23,48));
        var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50), new Array(14,15,51), new Array( 5,21,52), new Array(12, 6,53), new Array( 3,10,54), new Array(10,15,55), new Array( 1,21,56), new Array( 8, 6,57), new Array(15,10,58), new Array( 6,15,59), new Array(13,21,60), new Array( 4, 6,61), new Array(11,10,62), new Array( 2,15,63), new Array( 9,21,64));
        function MD5_F(x,y,z){return (x&y)|(~x&z);}
        function MD5_G(x,y,z){return (x&z)|(y&~z);}
        function MD5_H(x,y,z){return x^y^z;}
        function MD5_I(x,y,z){return y^(x|~z);}
        var MD5_round=new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));
        function MD5_pack(n32){return String.fromCharCode(n32 & 0xff)+String.fromCharCode((n32>>>8)&0xff)+String.fromCharCode((n32>>>16)&0xff)+String.fromCharCode((n32>>>24)&0xff);}
        function MD5_unpack(s4){return s4.charCodeAt(0)|(s4.charCodeAt(1)<<8)|(s4.charCodeAt(2)<<16)|(s4.charCodeAt(3)<<24);}
        function MD5_number(n){while(n<0)n+=4294967296;while(n>4294967295)n-=4294967296;return n;}
        function MD5_apply_round(x,s,f,abcd,r){var a,b,c,d;var kk,ss,ii;var t,u;a=abcd[0];b=abcd[1];c=abcd[2];d=abcd[3];kk=r[0];ss=r[1];ii=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[kk]+MD5_T[ii];t=MD5_number(t);t=((t<<ss)|(t>>>(32-ss)));t+=s[b];s[a]=MD5_number(t);}
        function MD5_hash(data){var abcd,x,state,s;var len,index,padLen,f,r;var i,j,k;var tmp;state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);len=data.length;index=len&0x3f;padLen=(index<56)?(56-index):(120-index);if(padLen>0){data+="\x80";for(i=0;i<padLen-1;i++)data+="\x00";}data+=MD5_pack(len*8);data+=MD5_pack(0);len+=padLen+8;abcd=new Array(0,1,2,3);x=new Array(16);s=new Array(4);for(k=0;k<len;k+=64){for(i=0,j=k;i<16;i++,j+=4){x[i] = data.charCodeAt(j)|(data.charCodeAt(j+1)<<8)|(data.charCodeAt(j+2)<<16)|(data.charCodeAt(j+3)<<24);}for(i=0;i<4;i++)s[i]=state[i];for(i=0;i<4;i++){f=MD5_round[i][0];r=MD5_round[i][1];for(j=0;j<16;j++){MD5_apply_round(x,s,f,abcd,r[j]);tmp=abcd[0];abcd[0]=abcd[3];abcd[3]=abcd[2];abcd[2]=abcd[1];abcd[1]=tmp;}}for(i=0;i<4;i++){state[i]+=s[i];state[i]=MD5_number(state[i]);}}return MD5_pack(state[0])+MD5_pack(state[1])+MD5_pack(state[2])+MD5_pack(state[3]);}
        function MD5_hexhash(data){var i,out,c;var bit128;bit128=MD5_hash(data);out="";for(i=0;i<16;i++){c=bit128.charCodeAt(i);out+="0123456789abcdef".charAt((c>>4) & 0xf);out+="0123456789abcdef".charAt(c & 0xf);}return out;}
    };

    ldrsbmcounter();
})();
