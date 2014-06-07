// ==UserScript==
// @name           YouTube HD Suite
// @namespace      http://creazy.net/
// @description    Perfect package to enjoy HD videos in YouTube. Always watching or downloading the highest quality format ( HD 1080p / HD 720p / HQ FLV / MP4 iPod ). Add download icons in video list page.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

(function() {

var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
var d = w.document;
var l = w.location;
var s = {};

/**
 * YouTube HD Suite Class
 */
var HdSuite = function () {

    this.$ = function( id ) {
        return document.getElementById(id);
    }

    /**
     * YouTube HD Suite version
     */
    this.version = { text:'3.0.0', rev:201007072100 };

    /**
     * Auto version check
     */
    this.checkVersionCallback = function( json ) {
        //console.log(json);
        this.addCookie('hdsuite_last_update_rev',json.rev);

        if ( json.rev > this.version.rev ) {
            var a = this.$('hdsuite_update_button');
            a.href = 'http://userscripts.org/scripts/source/39167.user.js';
            a.title = 'Update now!';
            a.style.backgroundPosition = '-20px 0';
            
            alert("New YouTube HD Suite "+json.text+" is now available!\nClick the buttom of right side, Update now!");
        }
    };

    /**
     * YouTube All Format
     */
    this.formats = [
        [0, {id:37, icon:'FHD',desc:'fmt=37 ( HD1080p/MP4/H.264/AAC )',color:"C0C",check:1}],
        [1, {id:22, icon:'HD', desc:'fmt=22 ( HD720p /MP4/H.264/AAC )',color:"F00",check:1}],
        [2, {id:35, icon:'HQ', desc:'fmt=35 ( HQ     /FLV/H.264/AAC )',color:"0C0",check:1}],
        [3, {id:34, icon:'LQ', desc:'fmt=34 ( LQ     /FLV/H.264/AAC )',color:"00F",check:1}],
        [4, {id:18, icon:'SD', desc:'fmt=18 ( iPod   /MP4/H.264/AAC )',color:"666",check:0}],
        [5, {id: 6, icon:'OLD',desc:'fmt=6  ( OldHQ  /FLV/H.263/MP3 )',color:"999",check:1}],
        [6, {id: 5, icon:'OLD',desc:'fmt=5  ( OldLQ  /FLV/H.263/MP3 )',color:"999",check:0}],
        [7, {id:17, icon:'MOB',desc:'fmt=17 ( Hmobile/3GP/MPEG4/AAC )',color:"999",check:0}],
        [8, {id:13, icon:'MOB',desc:'fmt=13 ( Lmobile/3GP/H.263/AMR )',color:"999",check:0}]
    ];
    this.getFormat = function(id) {
        for ( var i=0; i<this.formats.length; i++ ) {
            if ( this.formats[i][1]['id'] == id ) {
                return this.formats[i][1];
            }
        }
    };

    /**
     * Function add cookie
     */
    this.addCookie = function(key, value) {
        if ( !key ) {
            return false;
        }
        document.cookie
            = key + '=' + escape(value) + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    };

    /**
     * Get cookie
     */
    this.getCookie = function(key) {
        var cookies = document.cookie.split(';');
        for ( var i=0; i<cookies.length; i++ ) {
            if ( cookies[i].indexOf('=') < 0 ) continue;
            key_value  = cookies[i].replace(/(^[\s]+|;)/g,'');
            deli_index = key_value.indexOf('=');
            if ( key_value.substring(0,deli_index) == key ) {
                return unescape(key_value.substring(deli_index+1,key_value.length));
            }
        }
        return '';
    };

    /**
     * Text Styles
     */
     this.tx = {
        mono:
             'display:block;font:14px/14px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:5px;'
            +'color:#CCC;border:1px solid #CCC;border-bottom:5px solid #CCC;-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;',
        dl:
             'display:block;font:14px/14px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:5px;'
            +'color:#000;background:#FFF;border:1px solid #CCC;-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;',
        pre:
             'display:block;font:12px/12px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:3px;'
     };

    /**
     * Configs
     */
    this.config = {
        // default settings
        redirect: 1,           // Do redirect to highest format page
        show_highest_link: 1,  //
        //show_highest_embed: 1, //
        visualize:  1,         // Do check format of listed videos
        download_formats: {
            37: 1,
            22: 1,
            35: 1,
            34: 1,
            18: 1,
             6: 0,
             5: 0,
            17: 0,
            13: 0
        }
    };

    /**
     * Set Config to cookie
     */
    this.setConfig = function() {
        var config
            = '{'
            + 'redirect:'+(this.$('hdsuite_config_redirect').checked?1:0)+','
            //+ 'show_highest_link:'+(this.$('hdsuite_config_showlink').checked?1:0)+','
            //+ 'show_highest_embed:'+(this.$('hdsuite_config_showembed').checked?1:0)+','
            + 'visualize:'+(this.$('hdsuite_config_visualize').checked?1:0)+','
            + 'download_formats: {'
            +   '37:'+(this.$('hdsuite_config_dl37') && this.$('hdsuite_config_dl37').checked?1:0)+','
            +   '22:'+(this.$('hdsuite_config_dl22') && this.$('hdsuite_config_dl22').checked?1:0)+','
            +   '35:'+(this.$('hdsuite_config_dl35') && this.$('hdsuite_config_dl35').checked?1:0)+','
            +   '34:'+(this.$('hdsuite_config_dl34') && this.$('hdsuite_config_dl34').checked?1:0)+','
            +   '18:'+(this.$('hdsuite_config_dl18') && this.$('hdsuite_config_dl18').checked?1:0)+','
            +    '6:'+(this.$('hdsuite_config_dl6')  && this.$('hdsuite_config_dl6').checked?1:0)+','
            +    '5:'+(this.$('hdsuite_config_dl5')  && this.$('hdsuite_config_dl5').checked?1:0)+','
            +   '17:'+(this.$('hdsuite_config_dl17') && this.$('hdsuite_config_dl17').checked?1:0)+','
            +   '13:'+(this.$('hdsuite_config_dl13') && this.$('hdsuite_config_dl13').checked?1:0)+''
            +   '}'
            + '}';

        this.addCookie('hdsuite_config', config);
        alert("Saved!\nAfter reloading the page, the setting will become effective.");
        this.closeConfig();
    };
    /**
     * Get Config from cookie
     */
    this.getConfig = function() {
        var config = this.getCookie('hdsuite_config');
        if ( config ) {
            this.config = eval('('+config+')');
        }
    };
    /**
     * 
     */
    this.openConfig = function() {
        this.$('hdsuite_config_panel').style.display = 'block';
        this.$('hdsuite_switch').href  = 'javascript:hdsuite.closeConfig();';
        this.$('hdsuite_switch').title = 'Close config panel.';
        this.$('hdsuite_switch').style.backgroundPosition = '-20px -100px';
    };
    /**
     * 
     */
    this.closeConfig = function() {
        this.$('hdsuite_config_panel').style.display = 'none';
        this.$('hdsuite_switch').href  = 'javascript:hdsuite.openConfig();';
        this.$('hdsuite_switch').title = 'Open config panel.';
        this.$('hdsuite_switch').style.backgroundPosition = '0 -100px';
    };
    /**
     * create Menu
     */
    this.createMenu = function() {
        /* update button */
        var a = d.createElement('a');
        a.id   = 'hdsuite_update_button';
        a.href = 'javascript:hdsuite.checkVersion(true);';
        a.title = 'Check version.';
        a.style.display  = 'block';
        a.style.width    = '20px';
        a.style.height   = '20px';
        a.style.overflow = 'hidden';
        a.style.zIndex   = '999';
        a.style.position = 'fixed';
        a.style.top      = '100px';
        a.style.right    = '0';
        a.style.background = 'url('+this.sprite+') no-repeat scroll 0 0';
        d.body.appendChild(a);

        /* visualize button */
        a = d.createElement('a');
        a.href = 'javascript:hdsuite.visualize();';
        a.title = 'Check formats again!';
        a.setAttribute('onmouseover','this.style.backgroundPosition=\'-20px -20px\';');
        a.setAttribute('onmouseout','this.style.backgroundPosition=\'0 -20px\';');
        a.style.display  = 'block';
        a.style.width    = '20px';
        a.style.height   = '20px';
        a.style.overflow = 'hidden';
        a.style.zIndex   = '999';
        a.style.position = 'fixed';
        a.style.top      = '120px';
        a.style.right    = '0';
        a.style.background = 'url('+this.sprite+') no-repeat scroll 0 -20px';
        d.body.appendChild(a);

        /* icon */
        a = d.createElement('a');
        a.id   = 'hdsuite_logo';
        a.href = 'http://userscripts.org/scripts/show/39167';
        a.title = 'Go to userscripts.org page.';
        a.setAttribute('onmouseover','this.style.backgroundPosition=\'-20px -40px\';');
        a.setAttribute('onmouseout','this.style.backgroundPosition=\'0 -40px\';');
        a.style.display  = 'block';
        a.style.width    = '20px';
        a.style.height   = '60px';
        a.style.overflow = 'hidden';
        a.style.zIndex   = '999';
        a.style.position = 'fixed';
        a.style.top      = '140px';
        a.style.right    = '0';
        a.style.background = 'url('+this.sprite+') no-repeat scroll 0 -40px';
        d.body.appendChild(a);

        /* open button */
        a = d.createElement('a');
        a.id   = 'hdsuite_switch';
        a.href = 'javascript:hdsuite.openConfig();';
        a.title = 'Open configration panel.';
        a.style.display  = 'block';
        a.style.width    = '20px';
        a.style.height   = '20px';
        a.style.overflow = 'hidden';
        a.style.zIndex   = '999';
        a.style.position = 'fixed';
        a.style.top      = '200px';
        a.style.right    = '0';
        a.style.background = 'url('+this.sprite+') no-repeat scroll 0 -100px';
        d.body.appendChild(a);

        /* Configration panel */
        var div = d.createElement('div');
        div.id   = 'hdsuite_config_panel';
        div.style.display   = 'none';
        div.style.width     = '400px';
        div.style.zIndex    = '998';
        div.style.position  = 'fixed';
        div.style.top       = '20px';
        div.style.right     = '0';
        div.style.background = '#EEE';
        div.style.borderTop       = '3px solid #999';
        div.style.borderBottom    = '3px solid #999';
        div.style.borderLeft      = '3px solid #999';
        div.style.MozBorderRadiusTopleft       = '10px';
        div.style.MozBorderRadiusBottomleft    = '10px';
        div.style.WebkitBorderTopLeftRadius    = '10px';
        div.style.WebkitBorderBottomLeftRadius = '10px';
        div.innerHTML
            = '<form id="hdsuite_form" name="hdsuite_form" onsubmit="return false;" style="margin:10px;padding:0;">'
            + '<h3 style="padding:5px;background:#CCC;border:1px solid #999;-moz-border-radius:5px;-webkit-border-radius:5px;">Config Panel</h3>'
            + '<h4>List Page</h4>'
            + '<ul style="margin:0 0 0 15px;">'
            + '<li><input id="hdsuite_config_visualize" name="hdsuite_config_visualize" type="checkbox" value="1" '
            + (this.config.visualize?'checked="checked" ':'')
            + '/>'
            + ' Show icons that checked the highest quality format</li>'
            + '</ul>'
            + '<h4>Watch Page</h4>'
            + '<ul style="margin:0 0 0 15px;">'
            + '<li><input id="hdsuite_config_redirect" name="hdsuite_config_redirect" type="checkbox" value="1" '
            + (this.config.redirect?'checked="checked" ':'')
            + '/> Always watch in highest quality format</li>'
            // comment out show link setting
            /*
            + '<li><input id="hdsuite_config_showlink" name="hdsuite_config_showlink" type="checkbox" value="1" '
            + (this.config.show_highest_link?'checked="checked" ':'')
            + '/> Show the link in highest quality format</li>'
            */
            // comment out embed setting
            /*
            +     '<li><input id="hdsuite_config_showembed" name="hdsuite_config_showembed" type="checkbox" value="1" '
            +     (this.config.show_highest_embed?'checked="checked" ':'')
            +     '/>'
            +     ' Show the embed code in highest quality format</li>'
            */
            + '</ul>'
            + '<h4>Download formats</h4>'
            + '<table cellpadding="0" cellspacing="5" id="hdsuite_config_downloads" style="margin:0 0 0 15px;"></table>'
            + '<p style="padding:10px;text-align:center;">'
            + '<input id="hdsuite_config_submit" name="hdsuite_config_submit" type="button" value="Save" onclick="hdsuite.setConfig();"'
            + ' style="margin:0 auto;font:20px/20px Arial;" />'
            + '</form>';
        d.body.appendChild(div);
        
        html = '';
        for ( var i=0; i<this.formats.length; i++ ) {
            config = this.formats[i][1];
            for ( var j in this.config.download_formats ) {
                if ( config.id == j ) {
                    fmt = this.config.download_formats[j];
                }
            }
            html
                += '<tr>'
                +  '<td><input id="hdsuite_config_dl'+config.id+'" name="hdsuite_config_dl'+config.id+'" type="checkbox" value="1" '+(fmt?'checked="checked" ':'')+'/></td>'
                +  '<td><span style="color:#fff;font:bold 10px/10px Arial;padding:1px 2px;border:1px solid #'+config.color+';-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#'+config.color+';">'+config.icon+'</span></td>'
                +  '<td style="'+this.tx.pre+'">'+config.desc+'</td>'
                +  '</tr>';
        }
        d.getElementById('hdsuite_config_downloads').innerHTML = html;
    };
    /**
     * create XmlHttpRequest
     */
    this.createXHR = function() {
        if ( window.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;
                }
            }
        } else if ( window.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    };
    /**
     * check URL
     */
    this.checkURL = function(video_id) {
        var url = '';
        if ( video_id.match(/.+==$/) ) {
            url = 'http://'+location.host+'/cthru?key='+video_id;
        } else {
            url = 'http://'+location.host+'/watch' + '?v='+video_id;
        }
        var XHR = this.createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if ( XHR.readyState==4 ) {
                flashvars = {};
                // vars
                if ( match = XHR.responseText.match(/flashvars=\\"(.*)\\"/) ) {
                    flashparams = RegExp.$1.split('&');
                    for ( i=0; i<flashparams.length; i++ ) {
                        flashparam = flashparams[i].split('=');
                        flashvars[ flashparam[0] ] = decodeURIComponent(flashparam[1]);
                    }
                }
//console.log(flashvars);
                var strong = document.getElementsByTagName('strong');
                for ( var i=0; i<strong.length; i++ ) {
                    if ( !strong[i].innerHTML && strong[i].getAttribute('class') == flashvars['video_id'] ) {
                        link = document.createElement('a');
                        link.style.color   = '#fff';
                        link.style.font    = 'bold 10px/1 Arial';
                        link.style.padding = '1px 2px';
                        link.setAttribute('onmouseover',"this.style.fontSize='20px'");
                        link.setAttribute('onmouseout' ,"this.style.fontSize='10px'");

                        for ( var j=0; j<hdsuite.formats.length; j++ ) {
                            fmt = hdsuite.formats[j][1];
                            for ( var k in hdsuite.config.download_formats ) {
                                if ( fmt.id == k ) {
                                    flag = hdsuite.config.download_formats[k];
                                }
                            }
                            if ( flag && (
                                    flashvars['fmt_url_map'].indexOf(fmt.id+'|') > -1 ||
                                    !fmt.check
                                )
                            ) {
                                link.style.border             = '1px solid #'+fmt.color;
                                link.style.MozBorderRadius    = '3px';
                                link.style.WebkitBorderRadius = '3px';
                                link.style.backgroundColor    = '#'+fmt.color;
                                link.href      = '/get_video?fmt='+fmt.id+'&video_id='+flashvars['video_id']+'&t='+flashvars['t'];
                                link.innerHTML = fmt.icon;
                                if ( strong[i].nextSibling.href && !strong[i].nextSibling.href.match(/#$/) && hdsuite.config.redirect ) {
                                    strong[i].nextSibling.href += "&fmt="+fmt.id;
                                }
                                break;
                            }
                        }
                        strong[i].appendChild(link);
                    }
                }
            }
        }
        XHR.send('');
    };
    /**
     * Add HD or MP4 on each links in YouTube List Page
     */
    this.visualize = function() {
        if ( !this.config.visualize ) return false;

        var a = document.getElementsByTagName('a');
        for ( var i=0; i<a.length; i++ ) {
            match = '';
            if ( a[i].getAttribute('vid') )                        continue; // Skip checked Link
            if ( a[i].innerHTML.match(/video-logo/i) )             continue; // Skip HD icon
            if ( a[i].getAttribute('class') == 'yt-button' )       continue; // Skip Button Link
            if ( a[i].parentNode.getAttribute('class') == 'video-time' ) continue; // Skip time
            // Thumbnail Link
            if ( a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/) || a[i].href.match(/watch_videos.+?&video_ids=([a-zA-Z0-9_-]*)/)  ) {
                a[i].setAttribute('vid',2);
                match = RegExp.$1;
                
                imgs = a[i].getElementsByTagName('img');
                if ( imgs.length && imgs[0].getAttribute('src').indexOf('ytimg.com') > -1  ) {
                    // get video_id
                    if ( imgs[0].getAttribute('src') && imgs[0].getAttribute('src').match(/.+?\/([a-zA-Z0-9_-]*)\/default\.jpg$/) ) {
                        match = RegExp.$1;
                    }
                    else if ( imgs[0].getAttribute('thumb') && imgs[0].getAttribute('thumb').match(/.+?\/([a-zA-Z0-9_-]*)\/default\.jpg$/) ) {
                        match = RegExp.$1;
                    }
                    
                    if ( !a[i].parentNode.style.position ) {
                        a[i].parentNode.style.position = "relative";
                    }
                    strong = document.createElement('strong');
                    strong.setAttribute('class',match);
                    strong.setAttribute('title',imgs[0].getAttribute('alt'));
                    strong.style.position = "absolute";
                    strong.style.zIndex = 100;
                    if ( a[i].parentNode.getAttribute('class') != 'spons-vid-thumb' ) {
                        strong.style.left = "0";
                    }
                    a[i].parentNode.insertBefore(strong, a[i]);
                }
            }
        }
        
        var s = document.getElementsByTagName('strong');
        
        var c = '';
        for ( var i=0; i<s.length; i++ ) {
            if ( !s[i].innerHTML && s[i].getAttribute('class') && c.indexOf(s[i].getAttribute('class')) < 0 ) {
                c += ' ' + s[i].getAttribute('class');
                this.checkURL( s[i].getAttribute('class') );
            }
        }
    };
    /**
     * check Format
     */
    this.checkFormat = function(fmt) {
        // Local check
        if ( s['fmt_url_map'].indexOf(fmt+'|') > -1 ) {
            format = this.getFormat(fmt);
            this.$('check_fmt_'+fmt).innerHTML
                = '<a href="'+this.makeDownloadURL(fmt)+'" style="'+this.tx.dl+'border-bottom:5px solid #'+format.color+';" title="'+format.desc+'">'+format.icon+'('+fmt+')</a>';
            return true;
        }
        
        // Remote check
        var url = 'http://'+location.host+'/watch' + '?fmt='+fmt+'&v='+s['video_id'];
        var XHR = this.createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                if ( match = XHR.responseText.match(/<link\srel=\"alternate\"\smedia=\"handheld\"\shref=\".+?\&amp;fmt=([0-9]+)/) ) {
                    fmt = RegExp.$1;
                    //console.log('found fmt='+fmt);
                } else {
                    //console.log('not found');
                }
                flashvars = {};
                // vars
                if ( match = XHR.responseText.match(/flashvars=\\"(.*)\\"/) ) {
                    flashparams = RegExp.$1.split('&');
                    for ( i=0; i<flashparams.length; i++ ) {
                        flashparam = flashparams[i].split('=');
                        flashvars[ flashparam[0] ] = decodeURIComponent(flashparam[1]);
                    }
                }
//console.log(flashvars);
                format = hdsuite.getFormat(fmt);

                var block = document.getElementById('check_fmt_'+fmt);
                block.innerHTML = '';
                if ( flashvars['fmt_url_map'].indexOf(fmt+'|') > -1 ) {
                    block.innerHTML
                        += '<a href="'+hdsuite.makeDownloadURL(fmt)+'" style="'+hdsuite.tx.dl+'border-bottom:5px solid #'+format.color+';" title="'+format.desc+'">'
                        +  format.icon+'('+fmt+')</a>';
                } else {
                    block.innerHTML
                        += '<span style="'+hdsuite.tx.mono+'">'+format.icon+'('+fmt+')</span>';
                }
            }
        }
        XHR.send('');
    };
    /**
     * Make Download URL
     */
    this.makeDownloadURL = function(num) {
        var u = 'http://'+location.host+'/get_video' + '?video_id='+s['video_id'] + '&t=' + s['t'];
        if ( num ) {
            u += '&fmt='+num;
        }
        return u;
    };
    /**
     * Redirect Higher Quality URL
     */
    this.redirect = function() {
        if ( !this.config.redirect ) return false;   // Stop redirect if switch off
        if ( l.search.match(/fmt=[0-9]*/) ) return false; // Stop redirect if fmt param exists

        if ( s['fmt_url_map'].indexOf('37|') > -1 ) {
            l.replace(l.href + '&fmt=37');
        }
        else if ( s['fmt_url_map'].indexOf('22|') > -1 ) {
            l.replace(l.href + '&fmt=22');
        }
        else if ( s['fmt_url_map'].indexOf('35|') > -1 ) {
            l.replace(l.href + '&fmt=35');
        }
        else if ( s['fmt_url_map'].indexOf('34|') > -1 ) {
            l.replace(l.href + '&fmt=34');
        }
        else {
            l.replace(l.href + '&fmt=18');
        }
        return true;
    };
    /**
     * Redirect Higher Quality URL
     */
    this.checkVars = function() {
        if ( l.href.match(/watch\?v=([a-zA-Z0-9_-]*)/) ) {
            match = RegExp.$1;
        } else {
            return false;
        }
        // Remote check
        var url = 'http://'+l.host+'/watch?v='+match;
        var XHR = this.createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                flashvars = {};
                // vars
                if ( match = XHR.responseText.match(/flashvars=\\"(.*)\\"/) ) {
                    flashparams = RegExp.$1.split('&');
                    for ( i=0; i<flashparams.length; i++ ) {
                        flashparam = flashparams[i].split('=');
                        flashvars[ flashparam[0] ] = decodeURIComponent(flashparam[1]);
                    }
                    s = flashvars;

                    // always watch in Highest Quality
                    if ( !hdsuite.redirect() ) {
                        //hdsuite.showCopyLink();
                        hdsuite.showDownloadLinks();
                        hdsuite.visualize();
                    }
                }
            }
        }
        XHR.send('');
    };
    /**
     * Add Customized Embed Link
     */
// delete 2010/03/12
//
//    showCopyLink: function() {
//        if ( !hdsuite.config.show_highest_link ) return;
//        
//        for ( var i in hdsuite.formats ) {
//            if( s['fmt_url_map'].indexOf(i+'|') > -1 ) {
//                this.$('watch-url-field').value += '&fmt='+i;
//                break;
//            }
//        }
//    },
    /**
     * Add Download Links
     */
    this.showDownloadLinks = function() {
        if( !this.$('hdsuite_dl_div') ) {
            // Create Links Block
            div = document.createElement('div');
            div.id = 'hdsuite_dl_div';
            div.style.padding = '5px';
            div.style.margin  = '0 0 5px 0';
            div.style.color = '#333';
            div.style.backgroundColor = '#EEE';
            div.style.border = '1px solid #CCC';
            div.style.MozBorderRadius    = '5px';
            div.style.WebkitBorderRadius = '5px';
            this.$('watch-headline').insertBefore(div,this.$('watch-headline-title'));
        }
        for ( var i=0; i<this.formats.length; i++ ) {
            config = this.formats[i][1];
            for ( var j in this.config.download_formats ) {
                if ( config.id == j ) {
                    fmt = this.config.download_formats[j];
                }
            }
            if ( !fmt ) continue;

            if ( config.check ) {
                this.$('hdsuite_dl_div').innerHTML
                    += '<div style="display:inline-block;margin:2px;" id="check_fmt_'+config.id+'">fmt='+config.id+'</div>';
                this.checkFormat(config.id);
            } else {
                this.$('hdsuite_dl_div').innerHTML
                    += '<div style="display:inline-block;margin:2px;"><a href="'+this.makeDownloadURL(config.id)+'" style="'+this.tx.dl+'border-bottom:5px solid #'+config.color+';" title="'+config.desc+'">'+config.icon+'('+config.id+')</a></div>';
            }
        }
    };
    this.sprite =
    'data:image/gif;base64,'+
    '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'+
    'U0gEsqGG7KQWzNCVK/T0CRktghKCaoQgAAA7';

    /**
     * init
     */
    this.init = function() {
        this.getConfig();
//        if ( d.getElementById('movie_player') ) {
//            // vars
//            flashparams = d.getElementById('movie_player').getAttribute('flashvars').split('&');
//            for ( i=0; i<flashparams.length; i++ ) {
//                flashparam = flashparams[i].split('=');
//                s[ flashparam[0] ] = decodeURIComponent(flashparam[1]);
//            }
//            //console.log(flashvars);
//        }
    };
    /**
     * checkVersion
     */
    this.checkVersion = function( force ) {
        if ( !force ) force = false;
        // if you don't check version in 24hours, check update automatically.
        var last_update_check = this.getCookie('hdsuite_last_update_check');
        var now = new Date().getTime();
        if ( force || !last_update_check || (now - last_update_check) > (3600 * 24 * 1000) ) {
            this.addCookie('hdsuite_last_update_check',now);
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src  = 'http://labs.creazy.net/greasemonkey/youtube_hd_suite_check.js';
            document.body.appendChild(script);
        } else {
            var rev = this.getCookie('hdsuite_last_update_rev');
            if ( rev > this.version.rev ) {
                var a = this.$('hdsuite_update_button');
                a.href = 'http://userscripts.org/scripts/source/39167.user.js';
                a.title = 'Update now!!';
                a.style.backgroundPosition = '-20px 0';
            }
        }
    };

}

/* add Class to global */
var script = document.createElement('script');
script.type = 'text/javascript';
script.text
    = 'var HdSuite = ' + HdSuite.toString() + ';'
    + 'var hdsuite = new HdSuite();'
d.body.appendChild(script);

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
var hdsuite = new HdSuite();
hdsuite.init();
// Watching Page
if ( l.pathname.match(/\/watch/) ) {
    hdsuite.checkVars();
}
// Other Page (Top, Browse, seache, ...)
else {
    if ( hdsuite.config.visualize ) {
        // for Auto Pager
        var scrollHeight = d.documentElement.scrollHeight;
        _AddEventListener(
            w,
            "scroll",
            function(e){
                if(d.documentElement.scrollHeight - scrollHeight > 100){
                    scrollHeight = d.documentElement.scrollHeight;
                    hdsuite.visualize();
                }
            }
        );
        hdsuite.visualize();
    }
}

hdsuite.createMenu();
hdsuite.checkVersion();

})();