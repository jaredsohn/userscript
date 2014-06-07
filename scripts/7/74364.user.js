// ==UserScript==
// @name           YouTubeHD
// @namespace      http://www.sumosoft.tk/
// @description    Makes youtube in HD.
// @include        http://www.youtube.com/*
// @include        http://www.youtube.com/watch/*
// ==/UserScript==

(function() {

var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
var d = w.document;
var l = w.location;
var s = {};

/**
 * YouTube HD object
 */
w.hdsuite = {
    /**
     * YouTube HD version
     */
    version: { text:'1.0.1', rev:201004040015 },
    /**
     * Auto version check
     */
    checkVersionCallback: function(json) {
        //console.log(json);
        w.hdsuite.addCookie('hdsuite_last_update_rev',json.rev);

        if ( json.rev > w.hdsuite.version.rev ) {
            var a = document.getElementById('hdsuite_update_button');
            a.href = 'http://userscripts.org/scripts/source/39167.user.js';
            a.title = 'Update now!';
            a.style.backgroundPosition = '-20px 0';
            
            alert("New YouTube HD Suite "+json.text+" is now available!\nClick the buttom of right side, Update now!");
        }
    },
    /**
     * YouTube All Format
     */
    formats: {
        37: {icon:'FHD',desc:'fmt=37 ( HD1080p/MP4/H.264/AAC )',color:"F0F",check:1},
        22: {icon:'HD', desc:'fmt=22 ( HD720p /MP4/H.264/AAC )',color:"F00",check:1},
        35: {icon:'HQ', desc:'fmt=35 ( HQ     /FLV/H.264/AAC )',color:"0F0",check:1},
        34: {icon:'LQ', desc:'fmt=34 ( LQ     /FLV/H.264/AAC )',color:"00F",check:1},
        18: {icon:'SD', desc:'fmt=18 ( iPod   /MP4/H.264/AAC )',color:"666",check:0},
         6: {icon:'OLD',desc:'fmt=6  ( OldHQ  /FLV/H.263/MP3 )',color:"999",check:1},
         5: {icon:'OLD',desc:'fmt=5  ( OldLQ  /FLV/H.263/MP3 )',color:"999",check:0},
        17: {icon:'MOB',desc:'fmt=17 ( Hmobile/3GP/MPEG4/AAC )',color:"999",check:0},
        13: {icon:'MOB',desc:'fmt=13 ( Lmobile/3GP/H.263/AMR )',color:"999",check:0}
    },
    /**
     * Function add cookie
     */
    addCookie: function(key, value) {
        if ( !key ) {
            return false;
        }
        document.cookie
            = key + '=' + escape(value) + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    },
    /**
     * Get cookie
     */
    getCookie: function(key) {
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
    },
    /**
     * Configs
     */
    config: {
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
    },
    /**
     * Set Config to cookie
     */
    setConfig: function() {
        var config
            = '{'
            + 'redirect:'+(document.getElementById('hdsuite_config_redirect').checked?1:0)+','
            //+ 'show_highest_link:'+(document.getElementById('hdsuite_config_showlink').checked?1:0)+','
            //+ 'show_highest_embed:'+(document.getElementById('hdsuite_config_showembed').checked?1:0)+','
            + 'visualize:'+(document.getElementById('hdsuite_config_visualize').checked?1:0)+','
            + 'download_formats: {'
            +   '37:'+(document.getElementById('hdsuite_config_dl37') && document.getElementById('hdsuite_config_dl37').checked?1:0)+','
            +   '22:'+(document.getElementById('hdsuite_config_dl22') && document.getElementById('hdsuite_config_dl22').checked?1:0)+','
            +   '35:'+(document.getElementById('hdsuite_config_dl35') && document.getElementById('hdsuite_config_dl35').checked?1:0)+','
            +   '34:'+(document.getElementById('hdsuite_config_dl34') && document.getElementById('hdsuite_config_dl34').checked?1:0)+','
            +   '18:'+(document.getElementById('hdsuite_config_dl18') && document.getElementById('hdsuite_config_dl18').checked?1:0)+','
            +    '6:'+(document.getElementById('hdsuite_config_dl6')  && document.getElementById('hdsuite_config_dl6').checked?1:0)+','
            +    '5:'+(document.getElementById('hdsuite_config_dl5')  && document.getElementById('hdsuite_config_dl5').checked?1:0)+','
            +   '17:'+(document.getElementById('hdsuite_config_dl17') && document.getElementById('hdsuite_config_dl17').checked?1:0)+','
            +   '13:'+(document.getElementById('hdsuite_config_dl13') && document.getElementById('hdsuite_config_dl13').checked?1:0)+''
            +   '}'
            + '}';

        w.hdsuite.addCookie('hdsuite_config', config);
        alert("Saved!\nAfter reloading the page, the setting will become effective.");
        w.hdsuite.closeConfig();
    },
    /**
     * Get Config from cookie
     */
    getConfig: function() {
        var config = w.hdsuite.getCookie('hdsuite_config');
        if ( config ) {
            w.hdsuite.config = eval('('+config+')');
        }
    },
    /**
     * 
     */
    openConfig: function() {
        document.getElementById('hdsuite_config_panel').style.display = 'block';
        document.getElementById('hdsuite_switch').href  = 'javascript:hdsuite.closeConfig();';
        document.getElementById('hdsuite_switch').title = 'Close config panel.';
        document.getElementById('hdsuite_switch').style.backgroundPosition = '-20px -100px';
    },
    /**
     * 
     */
    closeConfig: function() {
        document.getElementById('hdsuite_config_panel').style.display = 'none';
        document.getElementById('hdsuite_switch').href  = 'javascript:hdsuite.openConfig();';
        document.getElementById('hdsuite_switch').title = 'Open config panel.';
        document.getElementById('hdsuite_switch').style.backgroundPosition = '0 -100px';
    },
    /**
     * create Menu
     */
    createMenu: function() {
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
        a.style.background = 'url('+w.hdsuite.sprite+') no-repeat scroll 0 0';
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
        a.style.background = 'url('+w.hdsuite.sprite+') no-repeat scroll 0 -20px';
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
        a.style.background = 'url('+w.hdsuite.sprite+') no-repeat scroll 0 -40px';
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
        a.style.background = 'url('+w.hdsuite.sprite+') no-repeat scroll 0 -100px';
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
            + (w.hdsuite.config.visualize?'checked="checked" ':'')
            + '/>'
            + ' Show icons that checked the highest quality format</li>'
            + '</ul>'
            + '<h4>Watch Page</h4>'
            + '<ul style="margin:0 0 0 15px;">'
            + '<li><input id="hdsuite_config_redirect" name="hdsuite_config_redirect" type="checkbox" value="1" '
            + (w.hdsuite.config.redirect?'checked="checked" ':'')
            + '/> Always watch in highest quality format</li>'
            // comment out show link setting
            /*
            + '<li><input id="hdsuite_config_showlink" name="hdsuite_config_showlink" type="checkbox" value="1" '
            + (w.hdsuite.config.show_highest_link?'checked="checked" ':'')
            + '/> Show the link in highest quality format</li>'
            */
            // comment out embed setting
            /*
            +     '<li><input id="hdsuite_config_showembed" name="hdsuite_config_showembed" type="checkbox" value="1" '
            +     (w.hdsuite.config.show_highest_embed?'checked="checked" ':'')
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
        for ( var i in w.hdsuite.config.download_formats ) {
            fmt    = w.hdsuite.config.download_formats[i];
            config = w.hdsuite.formats[i];
            html
                += '<tr>'
                +  '<td><input id="hdsuite_config_dl'+i+'" name="hdsuite_config_dl'+i+'" type="checkbox" value="1" '+(fmt?'checked="checked" ':'')+'/></td>'
                +  '<td><span style="color:#fff;font:bold 10px/10px Arial;padding:1px 2px;border:1px solid #'+config.color+';-moz-border-radius:3px;-webkit-border-radius:3px;background-color:#'+config.color+';">'+config.icon+'</span></td>'
                +  '<td style="'+w.hdsuite.tx.pre+'">'+w.hdsuite.formats[i].desc+'</td>'
                +  '</tr>';
        }
        d.getElementById('hdsuite_config_downloads').innerHTML = html;
    },
    /**
     * create XmlHttpRequest
     */
    createXHR: function() {
        if ( w.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;
                }
            }
        } else if ( w.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    },
    /**
     * check URL
     */
    checkURL: function(video_id) {
        var url = '';
        if ( video_id.match(/.+==$/) ) {
            url = 'http://'+l.host+'/cthru?key='+video_id;
        } else {
            url = 'http://'+l.host+'/watch' + '?v='+video_id;
        }
        var XHR = w.hdsuite.createXHR();
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
                var strong = d.getElementsByTagName('strong');
                for ( var i=0; i<strong.length; i++ ) {
                    if ( !strong[i].innerHTML && strong[i].getAttribute('class') == flashvars['video_id'] ) {
                        link = d.createElement('a');
                        link.style.color   = '#fff';
                        link.style.font    = 'bold 10px/10px Arial';
                        link.style.padding = '1px 2px';
                        for ( var j in w.hdsuite.config.download_formats ) {
                            fmt  = w.hdsuite.formats[j];
                            flag = w.hdsuite.config.download_formats[j];
                            if ( flag && (
                                    flashvars['fmt_url_map'].indexOf(j+'|') > -1 ||
                                    !fmt.check
                                )
                            ) {
                                link.style.border             = '1px solid #'+fmt.color;
                                link.style.MozBorderRadius    = '3px';
                                link.style.WebkitBorderRadius = '3px';
                                link.style.backgroundColor    = '#'+fmt.color;
                                link.href      = '/get_video?fmt='+j+'&video_id='+flashvars['video_id']+'&t='+flashvars['t'];
                                link.innerHTML = fmt.icon;
                                if ( strong[i].nextSibling.href && !strong[i].nextSibling.href.match(/#$/) && w.hdsuite.config.redirect ) {
                                    strong[i].nextSibling.href += "&fmt="+j;
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
    },
    /**
     * Add HD or MP4 on each links in YouTube List Page
     */
    visualize: function() {
//console.log('start visualize');
        var a = d.getElementsByTagName('a');
        for ( var i=0; i<a.length; i++ ) {
            match = '';
            if ( a[i].getAttribute('class') == 'video-list-item-link' && a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/) ) {
                match = RegExp.$1;
                
                a[i].setAttribute('vid',2);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                strong.style.position = "absolute";
                strong.style.zIndex = 100;
                a[i].parentNode.insertBefore(strong, a[i]);
            }
            if ( a[i].getAttribute('vid') )                        continue; // Skip checked Link
            if ( a[i].innerHTML.match(/video-logo/i) )             continue; // Skip HD icon
            if ( a[i].innerHTML.match(/vimg(90|120|180)/i) )       continue; // Skip Image icon
            if ( a[i].getAttribute('class') == 'yt-button' )       continue; // Skip Button Link
            if ( a[i].parentNode.getAttribute('class') == 'video-time' ) continue; // Skip time
            // functional links
            if ( a[i].href.match(/#$/) ) {
                if ( a[i].getAttribute('onclick') &&
                     ( a[i].getAttribute('onclick').match(/^onPlayVideos\(\['([a-zA-Z0-9_-]*)'\]\)/) ||
                       a[i].getAttribute('onclick').match(/^onPlayVideos\('\/watch\?v=([a-zA-Z0-9_-]*)'\)/) )
                ) {
                    match = RegExp.$1;
                    
                    a[i].setAttribute('vid',1);
                    strong = d.createElement('strong');
                    strong.setAttribute('class',match);
                    a[i].parentNode.insertBefore(strong, a[i]);
                    a[i].style.display = 'inline';
                } else {
                    continue;
                }
            }
            // normal 'watch' and 'play list'
            else if ( a[i].href.match(/watch\?v=([a-zA-Z0-9_-]*)/) || a[i].href.match(/view_play_list\?.+&v=([a-zA-Z0-9_-]*)/) ) {
                match = RegExp.$1;
                
                a[i].setAttribute('vid',2);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                a[i].parentNode.insertBefore(strong, a[i]);
            }
            // new channel page
            else if ( !a[i].href && a[i].getAttribute('onclick') && a[i].getAttribute('onclick').match(/playnav.playVideo\(\'.+\',\'[0-9]\',\'([a-zA-Z0-9_-]*)\'\);/) ) {
                match = RegExp.$1;
                
                a[i].setAttribute('vid',3);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                a[i].parentNode.insertBefore(strong, a[i]);
            }
            // channels
            else if ( a[i].getAttribute('onclick') && a[i].getAttribute('onclick').match(/video_ids=([a-zA-Z0-9_-]*)%2C/) ) {
                match = RegExp.$1;
                
                a[i].setAttribute('vid',4);
                strong = d.createElement('strong');
                strong.setAttribute('class',match);
                a[i].parentNode.insertBefore(strong, a[i]);
            }

        }
        
        var s = d.getElementsByTagName('strong');
        
        var c = '';
        for ( var i=0; i<s.length; i++ ) {
            if ( !s[i].innerHTML && s[i].getAttribute('class') && c.indexOf(s[i].getAttribute('class')) < 0 ) {
                c += ' ' + s[i].getAttribute('class');
                w.hdsuite.checkURL( s[i].getAttribute('class') );
            }
        }
    },
    /**
     * check Format
     */
    checkFormat: function(fmt) {
        // Local check
        if ( s['fmt_url_map'].indexOf(fmt+'|') > -1 ) {
//console.log(fmt);
            d.getElementById('check_fmt_'+fmt).innerHTML
                = '<a href="'+w.hdsuite.makeDownloadURL(fmt)+'" style="'+w.hdsuite.tx.dl+'background:#'+w.hdsuite.formats[fmt].color+';border:1px solid #'+w.hdsuite.formats[fmt].color+';" title="'+w.hdsuite.formats[fmt].desc+'">'+w.hdsuite.formats[fmt].icon+'('+fmt+')</a>';
            return true;
        }
        
        // Remote check
        var url = 'http://'+l.host+'/watch' + '?fmt='+fmt+'&v='+s['video_id'];
        var XHR = w.hdsuite.createXHR();
        XHR.open( 'GET', url, true );
        XHR.onreadystatechange = function() { 
            if (XHR.readyState==4) {
                //<link rel="alternate" media="handheld" href="http://m.youtube.com/watch?desktop_uri=%2Fwatch%3Fv%3DFzMuN_Mx-To%26fmt%3D22&amp;fmt=22&amp;v=FzMuN_Mx-To&amp;gl=JP">
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
                var block = d.getElementById('check_fmt_'+fmt);
                block.innerHTML = '';
                if ( flashvars['fmt_url_map'].indexOf(fmt+'|') > -1 ) {
                    block.innerHTML
                        += '<a href="'+w.hdsuite.makeDownloadURL(fmt)+'" style="'+w.hdsuite.tx.dl+'background:#'+w.hdsuite.formats[fmt].color+';border:1px solid #'+w.hdsuite.formats[fmt].color+';" title="'+w.hdsuite.formats[fmt].desc+'">'
                        +  w.hdsuite.formats[fmt].icon+'('+fmt+')</a>';
                } else {
                    block.innerHTML
                        += '<span style="'+w.hdsuite.tx.mono+'">'+w.hdsuite.formats[fmt].icon+'('+fmt+')</span>';
                }
            }
        }
        XHR.send('');
    },
    /**
     * Make Download URL
     */
    makeDownloadURL: function(num) {
        var u = 'http://'+l.host+'/get_video' + '?video_id='+s['video_id'] + '&t=' + s['t'];
        if ( num ) {
            u += '&fmt='+num;
        }
        return u;
    },
    /**
     * Redirect Higher Quality URL
     */
    redirect: function() {
        if ( !w.hdsuite.config.redirect ) return false;
        
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
    },
    /**
     * Add Customized Embed Link
     */
// delete 2010/03/12
/*
    showCopyLink: function() {
        if ( !w.hdsuite.config.show_highest_link ) return;
        
        for ( var i in w.hdsuite.formats ) {
            if( s['fmt_url_map'].indexOf(i+'|') > -1 ) {
                document.getElementById('watch-url-field').value += '&fmt='+i;
                break;
            }
        }
    },
*/
    /**
     * Add Download Links
     */
    showDownloadLinks: function() {
        if( !d.getElementById('hdsuite_dl_div') ) {
            // Create Links Block
            div = d.createElement('div');
            div.id = 'hdsuite_dl_div';
            div.style.padding = '5px';
            div.style.color = '#333';
            div.style.backgroundColor = '#EEE';
            div.style.border = '1px solid #CCC';
            div.style['-moz-border-radius'] = '5px';
            div.style['-webkit-border-radius'] = '5px';
            d.getElementById('watch-headline').insertBefore(div,d.getElementById('watch-headline-title'));
        }
        for ( var i in w.hdsuite.config.download_formats ) {
            fmt    = w.hdsuite.config.download_formats[i];
            if ( !fmt ) continue;

            config = w.hdsuite.formats[i];
            if ( config.check ) {
                d.getElementById('hdsuite_dl_div').innerHTML
                    += '<div style="display:inline-block;margin:2px;" id="check_fmt_'+i+'">fmt='+i+'</div>';
                w.hdsuite.checkFormat(i);
            } else {
                d.getElementById('hdsuite_dl_div').innerHTML
                    += '<div style="display:inline-block;margin:2px;"><a href="'+w.hdsuite.makeDownloadURL(i)+'" style="'+w.hdsuite.tx.dl+'background:#'+w.hdsuite.formats[i].color+';" title="'+config.desc+'">'+config.icon+'('+i+')</a></div>';
            }
        }
    },
    sprite:
    'data:image/gif;base64,'+
    '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'+
    'U0gEsqGG7KQWzNCVK/T0CRktghKCaoQgAAA7',
    /**
     * text
     */
     tx: {
        mono: 'display:block;font:12px/12px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:3px;color:#CCC;border:1px solid #CCC;-moz-border-radius:3px;-webkit-border-radius:3px;',
        dl:   'display:block;font:12px/12px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:3px;color:#FFF;-moz-border-radius:3px;-webkit-border-radius:3px;',
        pre:  'display:block;font:12px/12px Osaka-Mono,\'MS Gothic\',Monaco,monospace;white-space:pre;padding:3px;'
     },

    /**
     * init
     */
    init: function() {
        w.hdsuite.getConfig();

        if ( d.getElementById('movie_player') ) {
            // vars
            flashparams = d.getElementById('movie_player').getAttribute('flashvars').split('&');
            for ( i=0; i<flashparams.length; i++ ) {
                flashparam = flashparams[i].split('=');
                s[ flashparam[0] ] = decodeURIComponent(flashparam[1]);
            }
            //console.log(flashvars);
        }

    },
    /**
     * checkVersion
     */
    checkVersion: function( force ) {
        if ( !force ) force = false;
        // if you don't check version in 24hours, check update automatically.
        var last_update_check = w.hdsuite.getCookie('hdsuite_last_update_check');
        var now = new Date().getTime();
        if ( force || !last_update_check || (now - last_update_check) > (3600 * 24 * 1000) ) {
            w.hdsuite.addCookie('hdsuite_last_update_check',now);
            var script = d.createElement('script');
            script.type = 'text/javascript';
            script.src  = 'http://labs.creazy.net/greasemonkey/youtube_hd_suite_check.js';
            d.body.appendChild(script);
        } else {
            var rev = w.hdsuite.getCookie('hdsuite_last_update_rev');
            if ( rev > w.hdsuite.version.rev ) {
                var a = document.getElementById('hdsuite_update_button');
                a.href = 'http://userscripts.org/scripts/source/39167.user.js';
                a.title = 'Update now!!';
                a.style.backgroundPosition = '-20px 0';
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
// Watching Page
w.hdsuite.init();
if ( l.pathname.match(/\/watch/) ) {
    // always watch in Highest Quality
    if ( !l.search.match(/fmt=[0-9]*/) ) {
        w.hdsuite.redirect()
    }
    //w.hdsuite.showCopyLink();
    w.hdsuite.showDownloadLinks();
}
// Other Page (Top, Browse, seache, ...)
else {
    if ( w.hdsuite.config.visualize ) {
        // for Auto Pager
        var scrollHeight = d.documentElement.scrollHeight;
        _AddEventListener(
            w,
            "scroll",
            function(e){
                if(d.documentElement.scrollHeight - scrollHeight > 100){
                    scrollHeight = d.documentElement.scrollHeight;
                    w.hdsuite.visualize();
                }
            }
        );
    }
}

w.hdsuite.createMenu();
w.hdsuite.checkVersion();
if ( w.hdsuite.config.visualize ) {
    w.hdsuite.visualize();
}

})();