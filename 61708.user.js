// ==UserScript==
// @name           YouTube HD Everywhere
// @namespace      http://creazy.net/
// @description    Show Download Links in any YouTube embed pages.
// @include        *
// @exclude        http://*.youtube.com/*
// @exclude        http://youtube.com/*
// ==/UserScript==

(function() {

    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var d = w.document;
    var l = w.location;

    /**
     * check URL
     */
    w.checkURL = function(json) {
        if ( json.error ) {
            d.getElementById('v_'+json.video_id).innerHTML = json.error;
            return;
        }
        
        map = decodeURIComponent(json.SWF_ARGS.fmt_url_map).split(',');
        formats = {};
        for ( var i=0; i<map.length; i++ ) {
            formats[ map[i].split('|')[0] ] = map[i].split('|')[1];
        }
        
        d.getElementById('v_'+json.SWF_ARGS.video_id).innerHTML = '';
        highest_fmt = 0;
        if ( formats['22'] ) {
            // create a
            a = d.createElement('a');
            a.href      = formats['22'];
            a.innerHTML = 'HD (fmt=22)';
            a.style.display         = 'inline-block';
            a.style.margin          = '2px';
            a.style.padding         = '2px 5px 2px 5px';
            a.style.border          = '2px outset #F00';
            a.style.backgroundColor = '#F00';
            a.style.color           = '#FFF';
            a.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(a);
            if ( !highest_fmt ) highest_fmt = 22;
        } else {
            // create span
            span = d.createElement('span');
            span.innerHTML = 'HD (fmt=22)';
            span.style.display         = 'inline-block';
            span.style.margin          = '2px';
            span.style.padding         = '2px 5px 2px 5px';
            span.style.border          = '2px solid #EEE';
            span.style.backgroundColor = '#FFF';
            span.style.color           = '#CCC';
            span.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(span);
        }

        if ( formats['35'] ) {
            // create a
            a = d.createElement('a');
            a.href      = formats['35'];
            a.innerHTML = 'HQ (fmt=35)';
            a.style.display         = 'inline-block';
            a.style.margin          = '2px';
            a.style.padding         = '2px 5px 2px 5px';
            a.style.border          = '2px outset #0F0';
            a.style.backgroundColor = '#0F0';
            a.style.color           = '#FFF';
            a.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(a);
            if ( !highest_fmt ) highest_fmt = 35;
        } else {
            // create span
            span = d.createElement('span');
            span.innerHTML = 'HQ (fmt=35)';
            span.style.display         = 'inline-block';
            span.style.margin          = '2px';
            span.style.padding         = '2px 5px 2px 5px';
            span.style.border          = '2px solid #EEE';
            span.style.backgroundColor = '#FFF';
            span.style.color           = '#CCC';
            span.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(span);
        }

        if ( formats['34'] ) {
            // create a
            a = d.createElement('a');
            a.href      = formats['34'];
            a.innerHTML = 'LQ (fmt=34)';
            a.style.display         = 'inline-block';
            a.style.margin          = '2px';
            a.style.padding         = '2px 5px 2px 5px';
            a.style.border          = '2px outset #00F';
            a.style.backgroundColor = '#00F';
            a.style.color           = '#FFF';
            a.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(a);
            if ( !highest_fmt ) highest_fmt = 34;
        } else {
            // create span
            span = d.createElement('span');
            span.innerHTML = 'LQ (fmt=34)';
            span.style.display         = 'inline-block';
            span.style.margin          = '2px';
            span.style.padding         = '2px 5px 2px 5px';
            span.style.border          = '2px solid #EEE';
            span.style.backgroundColor = '#FFF';
            span.style.color           = '#CCC';
            span.style.font            = 'bold 12px/1 Arial';
            d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(span);
        }
        
        // create a
        a = d.createElement('a');
        a.href      = formats['18'];
        a.innerHTML = 'SD (fmt=18)';
        a.style.display         = 'inline-block';
        a.style.margin          = '2px';
        a.style.padding         = '2px 5px 2px 5px';
        a.style.border          = '2px outset #999';
        a.style.backgroundColor = '#999';
        a.style.color           = '#FFF';
        a.style.font            = 'bold 12px/1 Arial';
        d.getElementById('v_'+json.SWF_ARGS.video_id).appendChild(a);
        if ( !highest_fmt ) highest_fmt = 18;

        d.getElementById('v_'+json.SWF_ARGS.video_id).insertBefore(
            d.createElement('br'),
            d.getElementById('v_'+json.SWF_ARGS.video_id).childNodes[0]
        );

        a = d.createElement('a');
        a.href      = 'http://www.youtube.com/watch?v='+json.SWF_ARGS.video_id+'&fmt='+highest_fmt;
        a.target    = '_blank';
        a.innerHTML = json.VIDEO_TITLE;
        a.style.color   = '#00F';
        a.style.font    = '12px/1.2 Arial';
        d.getElementById('v_'+json.SWF_ARGS.video_id).insertBefore(
            a,
            d.getElementById('v_'+json.SWF_ARGS.video_id).childNodes[0]
        );

    }

    /**
     * Add HD or MP4 on each links in YouTube List Page
     */
    w.visualize = function() {
        var objs = d.getElementsByTagName('object');
        for ( var i=0; i<objs.length; i++ ) {
            if ( objs[i].getAttribute('vid') ) continue; // Skip checked Link
            
            params = objs[i].getElementsByTagName('param');
            for ( var j=0; j<params.length; j++ ) {
                if ( params[j].name == 'movie' ) {
                    if ( params[j].value.match(/^http:\/\/.*youtube.com\/v\/([a-zA-Z0-9_-]+)/) ) {
                        vid = RegExp.$1;
                        //console.log(vid);
                        objs[i].setAttribute('vid',vid);

                        
                        // create div
                        div = d.createElement('div');
                        is_new = false;
                        if ( d.getElementById('v_'+vid) ) {
                            // create a
                            a = d.createElement('a');
                            a.href      = '#v_'+vid;
                            a.innerHTML = '[*] Exists same video before.';
                            a.style.color = '#00F';
                            a.style.font  = '12px/1.2 Arial';
                            div.appendChild(a);
                        } else {
                            div.setAttribute('id','v_'+vid);
                            div.innerHTML = 'loading...';
                            is_new = true;
                        }
                        div.style.padding         = '5px';
                        div.style.backgroundColor = '#FFF';
                        div.style.border          = '1px solid #CCC';

                        div2 = d.createElement('div');
                        div2.style.display         = 'block';
                        div2.style.width           = objs[i].getAttribute('width')+'px';
                        div2.appendChild(div);
                        
                        if ( objs[i].nextSibling ) {
                            objs[i].parentNode.insertBefore(div2, objs[i].nextSibling);
                        } else {
                            objs[i].parentNode.appendChild(div2);
                        }

                        if ( is_new ) {
                            s = d.createElement('script');
                            s.type    = 'text/javascript';
                            s.charset = 'UTF-8';
                            s.src     = 'http://youtube-args.appspot.com/?callback=checkURL&v='+vid;
                            d.body.appendChild(s);
                        }
                        break;
                    }
                }
            }
        }
        
    }

    /* add eventLister for cross browser */
    function _AddEventListener(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    }

    /**
     * Controller
     */
    // for Auto Pager
    var scrollHeight = d.documentElement.scrollHeight;
    _AddEventListener(
        w,
        "scroll",
        function(e){
            if(d.documentElement.scrollHeight - scrollHeight > 100){
                scrollHeight = d.documentElement.scrollHeight;
                w.visualize();
            }
        }
    );

    w.visualize();

})();