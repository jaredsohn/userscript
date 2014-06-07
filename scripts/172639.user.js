// ==UserScript==
// @name               Pocket from LDR
// @namespace          http://d.hatena.ne.jp/toshi123/
// @description        add to Pocket from LDR
// @include            http://reader.livedoor.com/reader/*
// @version            0.2
// ==/UserScript==

(function() {
    // PocketのBookmarkletをhttp://getpocket.com/welcome?b=Bookmarkletからダウンロードして
    // 該当する部分の値を以下にコピーしてください。下の値はダミーなのでこのままでは動きません。
    // 詳しくはREADMEまたはhttp://snoozingpanda.me/2013/07/howto_pocketfromldr/を参考にしてください。
    var pocket_array = [1000001,1000002,1000003,1000004,1000005,1000006,1000007,1000008,1000009,1000000];
    var pocket_value = 999;
    var pocket_string = '6789abcdef';
    // ここまで

    var w = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
    var _onload = w.onload;

    var posturl = "https://getpocket.com/b/r4.js";
    //var config = { "shortcut":"", "apikey":"", "username":"", "password":"" };
    var config = { "shortcut":"q" };
    //var unread_count = 0;

    var login_flag = 0;

    var onload = function() {
        load_config();
        bind_shortcut();
        //add_button();
        //get_unread_count();
    };

    function load_config() {
        for ( var i in config ) {
            var x = decode_data(GM_getValue(i));
            if ( x != "undefined" ) { config[i] = x; }
        }
    }

    function set_config(key, value) {
        if ( ! key.match( /\w+/ ) ) { return; }
        config[key] = value;
        GM_setValue(key, value);
    }

    function bind_shortcut() {
        if ( String(config.shortcut).match( /\w/ ) ) {
            w.Keybind.add(config.shortcut, add_to_pocket);
        }
    }

    function get_form_element(key) {
        return document.forms.namedItem("settings_form").elements.namedItem(key);
    }


    function check_login() {
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : posturl,
                onload  : function(res) {
                    if ( res.finalUrl.match(/login/) ) {
                        w.message('Pocket - not login...');
                    } else {
                        login_flag = 1;
                    }
                },
                onerror : function(res) {
                    w.message('Pocket... Error - ' + res.status + ' ' + res.statusText);
                }
            });
        },0);
    }

    function add_to_pocket() {
        if (! login_flag) {
            check_login();
            if (! login_flag) { return; }
        }
        var item = w.get_active_item(true);
        if ( item === null ) { return; }
        var item4pocket = b4pocket(item.link);
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : 'https://getpocket.com/b/r4.js?h='+item4pocket+'&u='+encodeURIComponent(item.link)+'&t='+encodeURIComponent(item.title),
                onload  : function(res) {
                    if (res.status == 200) {
                        w.message('Pocket - ' + item.title);
                    } else {
                        w.message('Pocket... Failed - ' + res.status + ' ' + res.statusText);
                    } 
                },
                onerror : function(res) {
                    w.message('Pocket... Error - ' + res.status + ' ' + res.statusText);
                }
            });
        },0);
    }

    function b4pocket(t,n,r,i,s){
        var o=pocket_array;
        i=i||0;
        u=0;
        n=n||[];
        r=r||0;
        s=s||0;
        var a={
            'a':97,'b':98,'c':99,'d':100,'e':101,'f':102,'g':103,'h':104,'i':105,'j':106,'k':107,
            'l':108,'m':109,'n':110,'o':111,'p':112,'q':113,'r':114,'s':115,'t':116,'u':117,'v':118,
            'w':119,'x':120,'y':121,'z':122,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,
            'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,
            'V':86,'W':87,'X':88,'Y':89,'Z':90,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,
            '8':56,'9':57,'\/':47,':':58,'?':63,'=':61,'-':45,'_':95,'&':38,'$':36,'!':33,'.':46
        };
        if(!s||s===0){t=o[0]+t;}

        for(var f=0;f<t.length;f++){
            var l= a[t[f]]?a[t[f]]:t.charCodeAt(f);
            if(!l*1)l=3;
            var c=l*(o[i]+l*o[u%o.length]);
            n[r]=(n[r]?n[r]+c:c)+s+u;
            var p=c%(50*1);
            if(n[p]){
                var d=n[r];
                n[r]=n[p];
                n[p]=d;
            }
            u+=c;
            r=r==50?0:r+1;
            i=i==o.length-1?0:i+1;
        }
        if(s==pocket_value){
            var v='';
            for(var f1=0;f1<n.length;f1++){
                v+=String.fromCharCode(n[f1]%(25*1)+97);
            }
            o=function(){};
            return v+pocket_string;
        }else{
            return b4pocket(u+'',n,r,i,s+1);
        }
    }

    function set_shortcut(k) {
        // check - [A-Za-z0-9_] only
        if ( ! k.match( /\w/ ) ) { return; }

        set_config("shortcut", k);
        change_style_ok(get_form_element("shortcut"));
    }

    function decode_data(v){
        return v !== null ? decodeURI(v) : "";
    }

    w.onload = function() {
        _onload();
        onload();
    };

})();