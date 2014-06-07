// ==UserScript==
// @name           Google Analytics with SBM
// @namespace      http://creazy.net/
// @description    Add Social Media Counter (Hatena Bookmark, Twitter, Facebook) besides the outer url Link
// @include        https://www.google.com/analytics/*
// @version        1.3
// ==/UserScript==

(function(){

    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var d = document;
    var t = d.getElementById('Table');
    
    function __hatebu(json) {
        //console.log(json);
        if ( json ) {
            var a       = document.createElement('a');
            a.href      = 'http://b.hatena.ne.jp/entry/'+json.url;
            a.target    = '_blank';
            a.style.color = '#FFF';
            if ( json.count >= 10 ) {
                a.style.fontWeight = 'bold';
                a.style.textShadow = '1px 1px 1px #666';
                a.style.color      = '#FCC';
            }
            a.innerHTML = json.count;
            document.getElementById('b_'+encodeURIComponent(json.url)).appendChild(a);

            if ( document.getElementById('tt_'+encodeURIComponent(json.url)).innerHTML == '' && json.title ) {
                document.getElementById('tt_'+encodeURIComponent(json.url)).innerHTML
                    = json.title.length>20?json.title.substr(0,20)+'...':json.title;
                document.getElementById('tt_'+encodeURIComponent(json.url)).setAttribute('title',json.title);
            }
        }
    }
    function __twitter(json) {
        //console.log(json);
        if ( json && json.response.trackback_total > 0 ) {
            var a       = document.createElement('a');
            a.href      = json.response.topsy_trackback_url;
            a.target    = '_blank';
            a.style.color = '#FFF';
            if ( json.response.trackback_total >= 10 ) {
                a.style.fontWeight = 'bold';
                a.style.textShadow = '1px 1px 1px #666';
                a.style.color      = '#FCC';
            }
            a.innerHTML = json.response.trackback_total;
            document.getElementById('t_'+encodeURIComponent(json.response.url)).appendChild(a);

            if ( document.getElementById('tt_'+encodeURIComponent(json.response.url)).innerHTML == '' && json.response.title ) {
                document.getElementById('tt_'+encodeURIComponent(json.response.url)).innerHTML
                    = json.response.title.length>20?json.response.title.substr(0,20)+'...':json.response.title;
                document.getElementById('tt_'+encodeURIComponent(json.response.url)).setAttribute('title',json.response.title);
            }
        }
    }
    function __facebook(json) {
        //console.log(json);
        if ( json && json[0].total_count > 0 ) {
            var a       = document.createElement('a');
            a.href      = "javascript:void(0);";
            a.style.color = '#FFF';
            if ( json[0].total_count >= 10 ) {
                a.style.fontWeight = 'bold';
                a.style.textShadow = '1px 1px 1px #666';
                a.style.color      = '#FCC';
            }
            a.innerHTML = json[0].total_count;
            document.getElementById('f_'+encodeURIComponent(json[0].url)).appendChild(a);
        }
    }
    /* add Class to global */
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text
        = 'var __hatebu   = ' + __hatebu.toString() + ';'
        + 'var __twitter  = ' + __twitter.toString() + ';'
        + 'var __facebook = ' + __facebook.toString() + ';';
    document.body.appendChild(script);

    function addSBM() {
        if ( !t ) return false;

        var anchors = t.getElementsByTagName('a');
        var sbms    = null;
        var is_sbm  = 0;
        var script  = null;
        for ( var i=0; i<anchors.length; i++ ) {
            if ( anchors[i].getAttribute('target') == 'GA_LINKER' && !anchors[i].getAttribute('GM_CHECKED') ) {
                anchors[i].parentNode.style.height            = '2.4em';
                anchors[i].parentNode.style.position          = 'relative';
                anchors[i].parentNode.parentNode.style.height = '2.4em';

                br    = d.createElement('br');
                anchors[i].parentNode.appendChild(br);

                sbms    = d.createElement('span');
                sbms.id = 'b_'+encodeURIComponent(anchors[i].href);
                sbms.style.color = '#FFF';
                sbms.style.backgroundColor = '#66F';
                sbms.style.padding = '0 3px 0 3px';
                sbms.innerHTML = 'B:';
                anchors[i].parentNode.appendChild(sbms);

                sbms    = d.createElement('span');
                sbms.id = 't_'+encodeURIComponent(anchors[i].href);
                sbms.style.color = '#FFF';
                sbms.style.backgroundColor = '#2D76B9';
                sbms.style.padding = '0 3px 0 3px';
                sbms.innerHTML = 'T:';
                anchors[i].parentNode.appendChild(sbms);

                sbms    = d.createElement('span');
                sbms.id = 'f_'+encodeURIComponent(anchors[i].href);
                sbms.style.color = '#FFF';
                sbms.style.backgroundColor = '#3B5998';
                sbms.style.padding = '0 3px 0 3px';
                sbms.innerHTML = 'F:';
                anchors[i].parentNode.appendChild(sbms);

                sbms    = d.createElement('span');
                sbms.id = 'tt_'+encodeURIComponent(anchors[i].href);
                sbms.style.verticalAlign = 'top';
                sbms.style.marginLeft = '5px';
                sbms.style.color = '#999';
                anchors[i].parentNode.appendChild(sbms);

                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src  = 'http://b.hatena.ne.jp/entry/jsonlite/?callback=__hatebu&url='+encodeURIComponent(anchors[i].href);
                document.body.appendChild(script);

                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src  = 'http://otter.topsy.com/urlinfo.js?callback=__twitter&url='+encodeURIComponent(anchors[i].href);
                document.body.appendChild(script);

                script = document.createElement('script');
                script.type = 'text/javascript';
                script.src  = 'https://api.facebook.com/method/fql.query?format=json&callback=__facebook&query=select+url,like_count,total_count,share_count,click_count+from+link_stat+where+url=%22'+encodeURIComponent(anchors[i].href)+'%22';
                document.body.appendChild(script);

                anchors[i].setAttribute('GM_CHECKED',1);
                is_sbm  = 1;
            }
        }

        if ( is_sbm && !d.getElementById('show_sbm') ) {
            var sbm = d.createElement('li');
            sbm.setAttribute('id','show_sbm');
            sbm.innerHTML = '<a href="javascript:void(0);">Show SBM</a>';
            d.getElementById('tab_0').parentNode.appendChild(sbm);
            
            __addEventListener(sbm,"click",addSBM);
        }
    }

    function __addEventListener(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    }

    addSBM();

})();