// ==UserScript==
// @name               Instapaper from LDR
// @namespace          http://d.hatena.ne.jp/sha_ring/
// @description        add to Instapaper from LDR
// @include            http://reader.livedoor.com/reader/*
// @version            0.2
// ==/UserScript==

(function() {
    var w = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
    var _onload = w.onload;

    var apiurl = "https://www.instapaper.com/api/";
    var config = { "shortcut":"", "username":"", "password":"" };

    var style_label = 'display:block; float:left; width:100px; margin:0px 5px; text-align:right;';
    var style_inputbox = 'display:block; float:left; width:180px; margin:0px 5px; border:1px solid #000000;';
    var style_button = 'display:block; float:left; margin:0px 5px; border:1px solid #000000;';
    var style_hr = 'width: 90%; height:1px; border-style:solid;';
    var style_ok = 'font-weight:bold; background-color: #99ff99;';

    var icon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAZFJREFUeNqMU0tqAkEQrRl6Rhe6FhVF8AoiHsALZOkiRA+QHCDkAkI2'+
    'QRdBgtsscwHBnWsXrkQQgyDu/MCo46fTr6CbGZnAFLx5b6q7q6u7qq16ve7kcrn3Wq32kkqlKI7t'+
    '93sajUbt9Xr9Rs1m82symcjD4SCv12sseJ4nx+OxbDQaH3a1Wn0sl8vkOA5JKWPBdV3Cmkql8mAn'+
    'k0nXtm2aTqekohvudrskhGBAB8fAlmVRIpEg6vf7nH4U1A6MqLHdbic7nc6vfbvdOOpsNmNoDb5c'+
    'Loz/xnEcgQ9+isUi37DW4NPpFPIF9fl85gAmg/l8blhrBADu/ZqxVuCDNFUvGIZBH49Ho4N+aJOB'+
    'PsJisWBoDUYAIOjT87CxyQAD2WzWnBH6/g60T89DJqEMlstliO/vIGqOuUQgk8mEuNfrmTJCR83h'+
    'Mqq+9jebjZtOp0MPptVqMbRhx6Btt1tSDUViMBh8FwqFp3w+zz0ex3zf52MMh8MfSz1noUrSLpVK'+
    'z6q3nTgB1M6eqsTnarV6/RNgADO/EX5sbtc3AAAAAElFTkSuQmCC';

    var onload = function() {
        load_config();
        bind_shortcut();
        add_button();
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
            w.Keybind.add(config.shortcut, add_to_instapaper);
        };
    }

    function add_button() {
        var searchobj, newElement, newSpan;
        searchobj = document.getElementById('pin_button');
        if (searchobj) {
            newElement = document.createElement('li');
            newElement.setAttribute("class", "button icon");
            newElement.setAttribute("id", "insta_button");
            newElement.setAttribute("style", "background-image: url(" + icon + "); font-weight:bold; text-align:right;");
            newElement.addEventListener('click', function(){ add_to_instapaper(); }, false);
            newSpan = document.createElement('span');
            newSpan.setAttribute("style", "line-height:22px;");
            newElement.appendChild(newSpan);
            searchobj.parentNode.insertBefore(newElement, searchobj.nextSibling);
        }
    }

    function get_form_element(key) {
        return document.forms.namedItem("settings_form").elements.namedItem(key);
    }

    function add_to_instapaper() {
        if ((config.username == '' )||(config.password == '')) {
            var res = confirm("\"Instapaper from LDR\" has not been set up yet.\nDo you set it up now?");
            if ( res == true ) {
                show_setup();
            } else {
                return;
            }
        }

        var item = w.get_active_item(true);
        if ( item == null ) { return; }
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : apiurl + 'add?username=' + config.username + '&password=' + config.password + '&url=' + encodeURIComponent(item.link) + '&title=' + encodeURIComponent(item.title) + '&redirect=close',
                onload  : function(res) {
                              if (res.status == 201) {
                                  w.message('Instapaper! - ' + item.title);
                              } else {
                                  w.message('Instapaper... Failed - ' + res.status + ' ' + res.statusText);
                              } },
                onerror : function(res) { w.message('Instapaper... Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }

    function auth_instapaper(user,pass) {
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : apiurl + 'authenticate?username=' + user + '&password=' + pass,
                onload  : function(res) {
                              if (res.status == 200) {
                                  set_config("username", user);
                                  set_config("password", pass);
                                  change_style_ok(get_form_element("username"));
                                  change_style_ok(get_form_element("password"));
                              } else {
                                  set_config("username", "");
                                  set_config("password", "");
                                  change_style_ng(get_form_element("username"));
                                  change_style_ng(get_form_element("password"));
                                  GM_log('Authorize - NG ' + res.status + ' ' + res.statusText);
                              } },
                onerror : function(res) { GM_log('Error - ' + res.status + ' ' + res.statusText); },
                onreadystatechange : function(res) {
                              if ( res.readyState == 1 ) {
                                  change_style_wait(get_form_element("username"));
                                  change_style_wait(get_form_element("password"));
                              } }
            });
        },0);
    }

    function set_shortcut(k) {
        // check - [A-Za-z0-9_] only
        if ( ! k.match( /\w/ ) ) { return; }

        set_config("shortcut", k);
        change_style_ok(get_form_element("shortcut"));
    }

    function show_setup() {
        var settingsPanel = build_setup();
        var body = document.getElementsByTagName("body");
        body[0].appendChild(settingsPanel);
        settingsPanel.style.display = 'block';
        check_ok();
        return;
    }

    function build_setup() {
        var settingsPanel = document.createElement("div"); 
            settingsPanel.setAttribute("id", "instapaper");
            settingsPanel.setAttribute("style",
                "position:static; width:400px; margin:auto auto; padding:12px;" +
                "border:1px solid #666666; -moz-border-radius:8px;" +
                "color:#333333; background:#eeeeee; opacity:0.95;" +
                "font-size: 80%; display:none;" );

        var settingsTitle = document.createElement("div");
        settingsTitle.appendChild(document.createTextNode("Instapaper from LDR - Setup"));
        settingsTitle.setAttribute("style", "margin: 1em auto 2em; font-weight:bold; text-align:center;");
        settingsPanel.appendChild(settingsTitle);

        var settings_form = document.createElement("form");
            settings_form.setAttribute("method", "get");
            settings_form.setAttribute("action", "");
            settings_form.setAttribute("id", "settings_form");

        // field - shortcut key
        var label_shortcut = document.createElement("label");
            label_shortcut.appendChild(document.createTextNode("Shortcut Key"));
            label_shortcut.setAttribute("style", style_label);
            settings_form.appendChild(label_shortcut);
        var inputbox_shortcut = document.createElement("input");
            inputbox_shortcut.setAttribute("type", "text");
            inputbox_shortcut.setAttribute("size", 20);
            inputbox_shortcut.setAttribute("title", "Shortcut key");
            inputbox_shortcut.setAttribute("name", "shortcut");
            inputbox_shortcut.setAttribute("maxlength", "1");
            inputbox_shortcut.setAttribute("value", config.shortcut);
            inputbox_shortcut.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_shortcut);
        var shortcut_set = document.createElement("input");
            shortcut_set.setAttribute("value", "Set");
            shortcut_set.setAttribute("type", "button");
            shortcut_set.setAttribute("style", style_button);
            shortcut_set.addEventListener('click', function(){ set_shortcut( get_form_element("shortcut").value ); }, false);
        settings_form.appendChild(shortcut_set);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var hr = document.createElement("hr");
            hr.setAttribute("style", style_hr);
        settings_form.appendChild(hr);
        settings_form.appendChild(document.createElement("br"));

        // field - username
        var label_username = document.createElement("label");
            label_username.appendChild(document.createTextNode("Username"));
            label_username.setAttribute("style", style_label);
        settings_form.appendChild(label_username);
        var inputbox_username = document.createElement("input");
            inputbox_username.setAttribute("type", "text");
            inputbox_username.setAttribute("size", 20);
            inputbox_username.setAttribute("title", "Instapaper Username");
            inputbox_username.setAttribute("name", "username");
            inputbox_username.setAttribute("value", config.username);
            inputbox_username.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_username);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var label_password = document.createElement("label");
            label_password.appendChild(document.createTextNode("Password"));
            label_password.setAttribute("style", style_label);
        settings_form.appendChild(label_password);
        var inputbox_password = document.createElement("input");
            inputbox_password.setAttribute("type", "password");
            inputbox_password.setAttribute("size", 20);
            inputbox_password.setAttribute("title", "Instapaper password");
            inputbox_password.setAttribute("name", "password");
            inputbox_password.setAttribute("value", config.password);
            inputbox_password.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_password);
        var submit_auth = document.createElement("input");
            submit_auth.setAttribute("value", "Auth");
            submit_auth.setAttribute("type", "button");
            submit_auth.setAttribute("style", style_button);
            submit_auth.addEventListener('click', function(){ auth_instapaper(get_form_element("username").value, get_form_element("password").value); }, false);
        settings_form.appendChild(submit_auth);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var hr = document.createElement("hr");
            hr.setAttribute("style", style_hr);
        settings_form.appendChild(hr);
        settings_form.appendChild(document.createElement("br"));

        // Close Button
        var close_button = document.createElement("input");
            close_button.setAttribute("value", "Close");
            close_button.setAttribute("type", "button");
            close_button.setAttribute("style", "width:200px; display:block; margin:0px auto; padding: 5px; border:1px solid #000000;");
            close_button.addEventListener('click', function(){ close_settings(settingsPanel); }, false);
        settings_form.appendChild(close_button);
        settings_form.appendChild(document.createElement("br"));

        // Initialize Button
        var close_button = document.createElement("input");
            close_button.setAttribute("value", "Initialize");
            close_button.setAttribute("type", "button");
            close_button.setAttribute("style", "width:200px; display:block; margin:0px auto; padding: 5px; border:1px solid #000000;");
            close_button.addEventListener('click', function(){ init_settings(settingsPanel); }, false);
        settings_form.appendChild(close_button);
        settings_form.appendChild(document.createElement("br"));

        settingsPanel.appendChild(settings_form);
        return settingsPanel;
    }

    function close_settings(w){
        w.style.display = 'none';
    }

    function init_settings(w){
        // confirm
        var res = confirm("Initialize all settings?");
        if ( res !== true ) { return; }

        // init
        for ( var i in config ) {
            var f = get_form_element(i);
            f.value = '';
            change_style_default(f);
            set_config(i, '');
        }
    }

    function check_ok() {
        for ( var i in config ) {
            var f = get_form_element(i);
            if ( f.value.match( /\w+/) ) { change_style_ok(f); }
        }
    }

    function change_style_ok(i) {
        i.style.background = '#99ff99';
        i.style.fontWeight = 'bold';
    }
    function change_style_ng(i) {
        i.style.background = '#ff9999';
        i.style.fontWeight = 'bold';
    }
    function change_style_default(i) {
        i.style.background = '#ffffff';
        i.style.fontWeight = 'normal';
    }
    function change_style_wait(i) {
        i.style.background = '#cccccc';
        i.style.fontWeight = 'normal';
    }

    function decode_data(v){
        return v !== null ? decodeURI(v) : "";
    }

    w.onload = function() {
        _onload();
        onload();
    };

    GM_registerMenuCommand("Instapaper from LDR - setup", show_setup );

})();