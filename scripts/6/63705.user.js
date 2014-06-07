// ==UserScript==
// @name          Gmail Fonts Manager
// @namespace     http://creazy.net/
// @description   You can select font styles for the part of GMail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @version       1.1.0
// ==/UserScript==

(function () {

var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window.top;
var s = window;
var d = w.document;

function GmailFontsManager() {

    /** default styles */
    this.styles = [
        {'name':".gt",'label':"本文",    'weight':"normal",'size':"90%", 'height':"120%",'family':"monospace", 'color':"#000000"},
        {'name':".ha",'label':"件名",    'weight':"bold",  'size':"110%",'height':"120%",'family':"sans-serif",'color':"#660000"},
        {'name':".Ak",'label':"フォーム",'weight':"normal",'size':"90%", 'height':"120%",'family':"monospace", 'color':"#000000"}
    ];

    /** Add cookie */
    this.addCookie = function(key, value) {
        if ( !key ) {
            return false;
        }
        document.cookie
            = key + '=' + escape(value) + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    }

    /** Get cookie */
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
    }

    /**
     * Set Config to cookie
     */
    this.setConfig = function() {
        var config = '[';
        for ( var i in _gfm.styles ) {
            s = _gfm.styles[i];
            n = s['name'].replace(/(\.|\#)/g,'_');
            if ( i > 0 ) {
                config += ', ';
            }
            config
                +='{'
                +     '"name":"'  +s['name']+'",'
                +     '"label":"' +s['label']+'",'
                +     '"weight":"'+document.getElementById('gfm_'+n+'_weight').value+'",'
                +     '"size":"'  +document.getElementById('gfm_'+n+'_size').value+'",'
                +     '"height":"'+document.getElementById('gfm_'+n+'_height').value+'",'
                +     '"family":"'+document.getElementById('gfm_'+n+'_family').value+'",'
                +     '"color":"' +document.getElementById('gfm_'+n+'_color').value+'"'
                + '}';
        }
        config += ']';
        _gfm.addCookie('gfm_config', config);
        _gfm.getConfig();
        _gfm.setStyle();
        _gfm.closeConfig();
    }

    /**
     * Get Config from cookie
     */
    this.getConfig = function() {
        var config = _gfm.getCookie('gfm_config');
        if ( config ) {
            _gfm.styles = eval('('+config+')');
        }
    }

    /**
     * 
     */
    this.openConfig = function() {
        document.getElementById('gfm_config_panel').style.display = 'block';
        document.getElementById('gfm_switch').href  = 'javascript:_gfm.closeConfig();';
        document.getElementById('gfm_switch').style.MozOpacity = '1.0';
        document.getElementById('gfm_switch').style.opacity    = '1.0';
    }

    /**
     * 
     */
    this.closeConfig = function() {
        document.getElementById('gfm_config_panel').style.display = 'none';
        document.getElementById('gfm_switch').href  = 'javascript:_gfm.openConfig();';
        document.getElementById('gfm_switch').style.MozOpacity = '0.6';
        document.getElementById('gfm_switch').style.opacity    = '0.6';
    }

    /**
     * create Menu
     */
    this.createMenu = function() {
        /* font button */
        if ( !document.getElementById('gfm_switch') ) {
            var a = document.createElement('a');
            a.id        = 'gfm_switch';
            a.href      = 'javascript:_gfm.openConfig();';
            a.innerHTML = 'font';
            a.style.display            = 'block';
            a.style.width              = '30px';
            a.style.height             = '16px';
            a.style.position           = 'fixed';
            a.style.bottom             = '0';
            a.style.left               = '0';
            a.style.zIndex             = '998';
            a.style.textAlign          = 'center';
            a.style.textDecoration     = 'none';
            a.style.color              = '#FFF';
            a.style.font               = 'bold 12px/16px Arial';
            a.style.background         = '#000';
            a.style.border             = '1px solid #000';
            a.style.MozBorderRadius    = '0 4px 0 0';
            a.style.WebkitBorderRadius = '0 4px 0 0';
            a.style.MozOpacity         = '0.6';
            a.style.opacity            = '0.6';
            document.body.appendChild(a);
        }

        /* Configration panel */
        if ( !document.getElementById('gfm_config_panel') ) {
            var div = document.createElement('div');
            div.id   = 'gfm_config_panel';
            div.style.display            = 'none';
            div.style.width              = '450px';
            div.style.position           = 'fixed';
            div.style.bottom             = '0';
            div.style.left               = '0';
            div.style.zIndex             = '997';
            div.style.background         = '#EEE';
            div.style.border             = '3px solid #000';
            div.style.MozBorderRadius    = '0 10px 0 0';
            div.style.WebkitBorderRadius = '0 10px 0 0';
            css = 'font:bold 12px/1 Arial;border-bottom:1px solid #CCC;';
            html
                = '<form id="gfm_form" name="gfm_form" onsubmit="return false;" style="margin:10px;padding:0;">'
                + '<table cellpadding="5" cellspacing="0" border="0">'
                + '<tr>'
                + '<th style="'+css+'">target</th>'
                + '<th style="'+css+'">weight</th>'
                + '<th style="'+css+'">size</th>'
                + '<th style="'+css+'">height</th>'
                + '<th style="'+css+'">family</th>'
                + '<th style="'+css+'">color</th>'
                + '</tr>';
            for ( var i in _gfm.styles ) {
                s   = _gfm.styles[i];
                n   = s['name'].replace(/(\.|\#)/g,'_');
                p   = 'gfm_'+n;
                css = 'font:12px/1 monospace;border-bottom:1px dashed #CCC;';
                html
                    +='<tr>'
                    + '<td style="text-align:right;'+css+'">'+s['label']+':</td>'
                    + '<td><input id="'+p+'_weight" name="'+p+'_weight" type="text" value="'+s['weight']+'" style="width:50px;'+css+'" /></td>'
                    + '<td><input id="'+p+'_size"   name="'+p+'_size"   type="text" value="'+s['size']+'" style="width:40px;'+css+'" /></td>'
                    + '<td><input id="'+p+'_height" name="'+p+'_height" type="text" value="'+s['height']+'" style="width:40px;'+css+'" /></td>'
                    + '<td><input id="'+p+'_family" name="'+p+'_family" type="text" value="'+s['family']+'" style="width:70px;'+css+'" /></td>'
                    + '<td><input id="'+p+'_color"  name="'+p+'_color"  type="text" value="'+s['color']+'" style="width:60px;'+css+'" /></td>'
                    + '</tr>';
            }
            html
                +='</table>'
                + '<p style="margin:0;padding:10px 0 0 0;text-align:center;">'
                + '<input id="gfm_submit" name="gfm_submit" type="button" value="Save" onclick="_gfm.setConfig();"'
                + ' style="margin:0 auto;font:20px/20px Arial;" /></p>'
                + '</form>';
            div.innerHTML = html;
            document.body.appendChild(div);
        }
    },
    this.setStyle = function() {
        var style_text = '';
        for ( var i in _gfm.styles ) {
            s = _gfm.styles[i];
            style_text
                += s['name']+' {'
                +     'font-weight:'+s['weight']+' !important;'
                +     'font-size:'  +s['size']+' !important;'
                +     'line-height:'+s['height']+' !important;'
                +     'font-family:'+s['family']+' !important;'
                +     'color:'+s['color']+' !important;'
                + '}';
        }
        var heads  = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(style_text));
            heads[0].appendChild(node);
        }
    }
}

var _gfm = new GmailFontsManager();
_gfm.getConfig();
_gfm.setStyle();
_gfm.createMenu();

/* add Class to global */
var script = document.createElement('script');
script.type = 'text/javascript';
script.text
    = 'var GmailFontsManager = ' + GmailFontsManager.toString() + ';'
    + 'var _gfm = new GmailFontsManager();'
document.body.appendChild(script);



}) ();