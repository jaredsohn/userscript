// ==UserScript==
// @name           LDR with Social Media Counter
// @namespace      http://creazy.net/
// @include        http://reader.livedoor.com/reader/*
// @version        1.0
// ==/UserScript==

// based on http://d.hatena.ne.jp/edvakf/20090319/1237479596
// based on http://d.hatena.ne.jp/tnx/20060716/1152998347
// based on http://tokyoenvious.xrea.jp/b/web/livedoor_reader_meets_hatebu.html
// based on http://la.ma.la/blog/diary_200610182325.htm
// based on http://la.ma.la/blog/diary_200703221812.htm

// [except]
// http://rss.rssad.jp
// http://rd.yahoo.co.jp
// http://www.pheedo.jp
// http://feedproxy.google.com
// http://match.seesaa.jp

(function(){
    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;

    /* add Function to global */
    function __ldr_sbc_hatebu(json) {
        //console.log(json);
        if ( json ) {
            var a       = document.createElement('a');
            a.href      = 'http://b.hatena.ne.jp/entry/'+json.url;
            a.target    = '_blank';
            a.style.color              = '#F00';
            a.style.fontStyle          = 'normal';
            a.style.padding            = '0 5px';
            if ( json.count >= 10 ) {
                a.style.fontWeight      = 'bold';
            }
            a.innerHTML = json.count;
            //console.log(a);
            
            var ems = document.getElementById('right_body').getElementsByTagName('em');
            for ( var i=0; i<ems.length; i++ ) {
                if ( ems[i].getAttribute('title') == 'Hatebu: ' + json.url ) {
                    ems[i].innerHTML = '';
                    ems[i].appendChild(a);
                    break;
                }
            }
        }
    }
    function __ldr_sbc_twitter(json) {
        //console.log(json);
        if ( json && json.response.trackback_total > 0 ) {
            var a       = document.createElement('a');
            a.href      = json.response.topsy_trackback_url;
            a.target    = '_blank';
            a.style.color              = '#09C';
            a.style.fontStyle          = 'normal';
            a.style.padding            = '0 5px';
            if ( json.response.trackback_total >= 10 ) {
                a.style.fontWeight      = 'bold';
            }
            a.innerHTML = json.response.trackback_total;
            //console.log(a);
            
            var ems = document.getElementById('right_body').getElementsByTagName('em');
            for ( var i=0; i<ems.length; i++ ) {
                if ( ems[i].getAttribute('title') == 'Twitter: ' + json.response.url ) {
                    ems[i].innerHTML = '';
                    ems[i].appendChild(a);
                    break;
                }
            }
        }
    }
    var __ldr_sbc = function(obj) {
        var item = eval(obj);

        // Skip AD or Feedproxy
        var is_check = true;
        if (
            item.url.indexOf('http://rss.rssad.jp') > -1 ||
            item.url.indexOf('http://rd.yahoo.co.jp') > -1 ||
            item.url.indexOf('http://www.pheedo.jp') > -1 ||
            item.url.indexOf('http://feedproxy.google.com') > -1 ||
            item.url.indexOf('http://match.seesaa.jp') > -1
        ) {
            is_check = false;
        };

        var div = document.createElement('div');
        div.style.marginLeft = '10px';

        if ( is_check ) {
            // Twitter Counter
            var div1 = document.createElement('div');
            div1.style.display    = 'inline-block';
            div1.style.padding    = '3px';
            div1.style.marginRight = '5px';
            div1.style.background = '#EEF';
            div1.style.border     = '1px solid #CCF';
            div1.style.MozBorderRadius    = '3px';
            div1.style.WebkitBorderRadius = '3px';
            div1.innerHTML = 't: <em title="Twitter: '+item.url+'"></em>';
            div.appendChild(div1);
    
            // Hatebu Counter
            var div2 = document.createElement('div');
            div2.style.display    = 'inline-block';
            div2.style.padding    = '3px';
            div2.style.marginRight = '5px';
            div2.style.background = '#CCF';
            div2.style.border     = '1px solid #00F';
            div2.style.MozBorderRadius    = '3px';
            div2.style.WebkitBorderRadius = '3px';
            div2.innerHTML = 'b: <em title="Hatebu: '+item.url+'"></em>';
            div.appendChild(div2);
        }

        var span = document.createElement('span');
        span.innerHTML = '<a href="'+item.url+'" target="_blank">'+item.url+'</a>';
        div.appendChild(span);

        document.getElementById('head_'+item.id).parentNode.appendChild(div);
        
        if ( is_check ) {
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src  = 'http://b.hatena.ne.jp/entry/jsonlite/?callback=__ldr_sbc_hatebu&url='+encodeURIComponent(item.url);
            document.body.appendChild(script);
    
            script = document.createElement('script');
            script.type = 'text/javascript';
            script.src  = 'http://otter.topsy.com/urlinfo.js?callback=__ldr_sbc_twitter&url='+encodeURIComponent(item.url);
            document.body.appendChild(script);
        }
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text
        = 'var __ldr_sbc = ' + __ldr_sbc.toString() + ';'
        + 'var __ldr_sbc_twitter = ' + __ldr_sbc_twitter.toString() + ';'
        + 'var __ldr_sbc_hatebu = ' + __ldr_sbc_hatebu.toString() + ';'
    document.body.appendChild(script);

    // Twitter(Topsy)
    w.entry_widgets.add('twitter_counter', function(feed, item){
        var datatext = '{id:'+item.id+',url:\''+item.link+'\'}';
        return '<img alt="" style="height:1px;" src="/favicon.ico" onerror="__ldr_sbc('+datatext+')" onload="__ldr_sbc('+datatext+')" />'; 
    }, '');

})();