// ==UserScript==
// @name           ShortPeeker
// @version        1.0
// @namespace      http://ordo.dk/
// @description    Puts the full URL of shortened URLs in the title-attribute
// @include        http*
// @exclude        http://*.google.tld/*
// ==/UserScript==

var shorts = [ 'bit.ly', 'j.mp', 'goo.gl', 'tinyurl.com', 'is.gd', 'tl.gd'
             , 'ow.ly', 'tumblr.com', 'ping.fm', 'post.ly', 'ff.im', 'twt.tl'
             , 'wp.me', 'disq.us', 'icio.us', 'digg.com', 'flic.kr', 'tcrn.ch'
             , 'y.ahoo.it', 'oreil.ly', 'twurl.nl', 'ub0.cc', 'retwt.me'
             , 'short.to', 'snurl.com', 'su.pr', 'tr.im', 'ur1.ca', 'grab.ly'
             , 'ur.ly', 'twt.gs', 'fb.me', 'on.cnn.com', 'bbc.in', 'gu.com'
             , 'cli.gs', 'tiny.cc', 'snipr.com', 'instapaper.com', 'arst.ch'
             , 'blo.gr', 'lnk.ms', '3.ly', 'zz.gd', 'mu.ly', 'snipurl.com'
             , 'fav.me', '2tu.us', 'b2l.me', 'chart.ly', 'dlvr.it', 'pwr.com'
             , 'bt.io', 'nyturl.com', 's.nyt.com', 'nyti.ms', 'wapo.st'
             , 'nyr.kr', 'amzn.to', 'mzl.la', 'mee.bo', 'plr.is', 'gclink.us'
             , 'url.ag', 'db.ly', 'awe.sm', 'reg.cx', 'shozu.com', 'moourl.com'
             , 'con.st', 's2t.vg', 'tnw.to', 'drp.ly', 'r2.ly', 'jr.ly'
             , 'alturl.com', 'on0.us', 'cptlst.com', 'idek.net', 'om.ly'
             , 'gdzl.la', 'cnt.to', 'jan.io', 'afx.cc', 'u.nu', 'minurl.org'
             , 'swtiny.eu', 'pop.is', 'vf.cx', 'cot.ag', 'neow.in', 'econ.st'
             , 'huff.to', 'xrl.in', 'uurl.in', 'shar.es', 'kiq.me', 'lev.me'
             , 'ptiturl.com', 'l.pr', 'cl.ly', 'sn.im', 'datafl.ws' ];

var links = document.getElementsByTagName( 'a' );
var element;
var no_shorts = shorts.length;
for ( i = 0; i < links.length; i++ )
{
    element = links[i];
    for ( a = 0; a < no_shorts; a++  )
    {
        try 
        {
            if ( element.href.indexOf( "http://"+shorts[a] ) == 0 ) 
            {
                GM_xmlhttpRequest({
                    method: 'HEAD',
                    url: element.href,
                    theelement: element,
                    onload: function(response) 
                    {
                        this.theelement.title = response.finalUrl;
                    }
                });
                break;
            }
        }
        catch (err)
        {
            // Nothing
        }
    }
}
