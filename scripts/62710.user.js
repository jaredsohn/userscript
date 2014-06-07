// ==UserScript==
// @name               Read It Later from LDR
// @namespace          http://d.hatena.ne.jp/sha_ring/
// @description        add to Read It Later from LDR
// @include            http://reader.livedoor.com/reader/*
// @version            0.7.5
// ==/UserScript==

(function() {
    var w = (typeof unsafeWindow == "undefined") ? window : unsafeWindow;
    var _onload = w.onload;

    //var apiurl = "https://readitlaterlist.com/v2/";
    var posturl = "https://readitlaterlist.com/edit_process.php?BL=1";
    //var config = { "shortcut":"", "apikey":"", "username":"", "password":"" };
    var config = { "shortcut":"" };
    //var unread_count = 0;

    var login_flag = 0;

    var style_label = 'display:block; float:left; width:100px; margin:0px 5px; text-align:right;';
    var style_inputbox = 'display:block; float:left; width:180px; margin:0px 5px; border:1px solid #000000;';
    var style_button = 'display:block; float:left; margin:0px 5px; border:1px solid #000000;';
    var style_hr = 'width: 90%; height:1px; border-style:solid;';
    var style_ok = 'font-weight:bold; background-color: #99ff99;';

    var icon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAwBQTFRF'+
    'wZItypwzzJ0zzp8yyp89zKE+0qM0264+yqBBz6ZGzKNMz6hMyaJR2KxA27BD2rddzKljz65q27to'+
    '07d/1rh65bhF5rtO5r5W5L9a5sNh5sNs48Vx5sly5st958196Mx1/tx8/t5+1byL38OD3MGI38WN'+
    '3cWS3cif382p38+x5cqJ6MuC6M2C48uT5s2V6dCG7dCB7NWI7dKQ7tWZ79qU8NuQ9NyT69mt7Ny2'+
    '/uGA/uCE/uCH/ueG/uCL/uWJ/+uK/+uM9uOS9+OT9OWe/uST/uSW+eef/ueY/uiV/++Q/eif//GX'+
    '//SX//Wc//ic/u+i+O2p/Oqp8eC6+O2x//Oj//Gl/PGt/POv//er//ml//ul//mr/vCy//6x//u6'+
    '//y5//66//6949bA49fB6uHR7uXU7+bV6uTc7efd8+jQ7Ojk8e3q8O/z/vzr8fD08vH18/L29PL1'+
    '9PP39fT4+Pf7///w///x///z+fj8////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS5cRvwAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVU'+
    'IFYzLjUuMUlLPc8AAADOSURBVChTY8ivqDASFRUVM66oyAcBhvySIIPystJc8cwSqEBxsVRwYmyC'+
    's3ZxMURFfpGFRFxUVLykeRFMoEjLNNovMoC9ECQCVJFflMYX7usTIa9XBBQBCRQU6MqEeHqH8aYW'+
    'QATyC/LYHB3sQw2V4QLZzE42Nv5yqjCBfBVpD0s7N6YMqKH5KYxeVoru/GpQa/PyRGRdFKzNuPLy'+
    'ICpyNFhjXG29ONVzICpycnhM9FkCdQRzYALJHNwCwkIMyWA+UEVlTpJmTpZSOoSfDwC4+1Xo49ca'+
    '4gAAAABJRU5ErkJggg==';

    var onload = function() {
        load_config();
        bind_shortcut();
        add_button();
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
            w.Keybind.add(config.shortcut, add_to_readitlater);
        };
    }

    function add_button() {
        var searchobj, newElement, newSpan;
        searchobj = document.getElementById('pin_button');
        if (searchobj) {
            newElement = document.createElement('li');
            newElement.setAttribute("class", "button icon");
            newElement.setAttribute("id", "ril_button");
            newElement.setAttribute("style", "background-image: url(" + icon + "); font-weight:bold; text-align:right;");
            newElement.addEventListener('click', function(){ add_to_readitlater(); }, false);
            newSpan = document.createElement('span');
            //newSpan.setAttribute("id", "unread_count");
            newSpan.setAttribute("style", "line-height:22px;");
            newElement.appendChild(newSpan);
            searchobj.parentNode.insertBefore(newElement, searchobj.nextSibling);
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
                                  w.message('Read It Later - not login...');
                              } else {
                                  login_flag = 1;
                              } },
                onerror : function(res) { w.message('Read It Later... Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }

    function add_to_readitlater() {
       /* if ((config.apikey == '')||(config.username == '' )||(config.password == '')) {
            var res = confirm("\"Read It Later from LDR\" has not been set up yet.\nDo you set it up now?");
            if ( res == true ) {
                show_setup();
            } else {
                return;
            }
        }*/

        if (! login_flag) {
            check_login();
            if (! login_flag) { return; };
        };

        var item = w.get_active_item(true);
        if ( item == null ) { return; }
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'POST',
                headers : {'Content-type' : 'application/x-www-form-urlencoded'},
                //url     : apiurl + 'add?username=' + config.username + '&password=' + config.password + '&apikey=' + config.apikey + '&url=' + encodeURIComponent(item.link) + '&title=' + encodeURIComponent(item.title),
                url     : posturl,
                data    : 'title=' + encodeURIComponent(item.title) + '&url=' + encodeURIComponent(item.link) + '&tags=&ref=',
                onload  : function(res) {
                              if (res.status == 200) {
                                  w.message('Read It Later! - ' + item.title);
                                  //add_unread_count(1);
                              } else {
                                  w.message('Read It Later... Failed - ' + res.status + ' ' + res.statusText);
                              } },
                onerror : function(res) { w.message('Read It Later... Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }

/*    function auth_readitlater(user,pass) {
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : apiurl + 'auth?username=' + user + '&password=' + pass + '&apikey=' + config.apikey,
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
*/
/*
    function check_apikey(k) {
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : apiurl + "api?apikey=" + k,
                onload  : function(res) {
                              if (res.status == 200) { 
                                  GM_log('API key - OK ' + res.status + ' ' + res.statusText);
                                  set_config("apikey", k);
                                  change_style_ok(get_form_element("apikey"));
                              } else {
                                  GM_log('API key - NG ' + res.status + ' ' + res.statusText);
                                  set_config("apikey", "");
                                  change_style_ng(get_form_element("apikey"));
                              }
                          },
                onerror : function(res) { GM_log('Error - ' + res.status + ' ' + res.statusText);},
                onreadystatechange : function(res) {
                              if ( res.readyState == 1 ) {
                                  change_style_wait(get_form_element("apikey"));
                              } }
            });
        },0);
    }
*/
/*
    function get_unread_count() {
        if ( (config.apikey == "")||(config.username == "" )||(config.password == "") ) { return; }
        //if ( (config.apikey == "undefined")||(config.username == "undefined" )||(config.password == "undefined") ) { return; }
        window.setTimeout(function() {
            GM_xmlhttpRequest({
                method  : 'GET',
                url     : apiurl + 'stats?username=' + config.username + '&password=' + config.password + '&apikey=' + config.apikey,
                onload  : function(res) {
                              if (res.status == 200) {
                                  set_unread_count(res.responseText);
                              } else {
                                  GM_log('Warn - ' + res.status + ' ' + res.statusText);
                              }
                          },
               onerror : function(res) { GM_log('Error - ' + res.status + ' ' + res.statusText); }
            });
        },0);
    }
*/

    function set_shortcut(k) {
        // check - [A-Za-z0-9_] only
        if ( ! k.match( /\w/ ) ) { return; }

        set_config("shortcut", k);
        change_style_ok(get_form_element("shortcut"));
    }

/*
    function set_unread_count(j) {
        var json = JSON.parse(j);
        unread_count = Number(json.count_unread);
        apply_unread_count();
    }
*/

/*
    function add_unread_count(i) {
        if ( typeof i == 'number') { unread_count += i; }
        apply_unread_count();
    }
*/
/*
    function apply_unread_count() {
        var width = 18 + String(unread_count).length * 7;
        document.getElementById("ril_button").style.width = width + "px";
        document.getElementById("unread_count").innerHTML = unread_count;
    }
*/
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
            settingsPanel.setAttribute("id", "readitlater");
            settingsPanel.setAttribute("style",
                "position:static; width:400px; margin:auto auto; padding:12px;" +
                "border:1px solid #666666; -moz-border-radius:8px;" +
                "color:#333333; background:#eeeeee; opacity:0.95;" +
                "font-size: 80%; display:none;" );

        var settingsTitle = document.createElement("div");
        settingsTitle.appendChild(document.createTextNode("Read It Later from LDR - Setup"));
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

/*        // field - API key
        var label_apikey = document.createElement("label");
            label_apikey.appendChild(document.createTextNode("API Key"));
            label_apikey.setAttribute("style", style_label);
            settings_form.appendChild(label_apikey);
        var inputbox_apikey = document.createElement("input");
            inputbox_apikey.setAttribute("type", "text");
            inputbox_apikey.setAttribute("size", 20);
            inputbox_apikey.setAttribute("title", "API Key of Read It Later");
            inputbox_apikey.setAttribute("name", "apikey");
            inputbox_apikey.setAttribute("value", config.apikey);
            inputbox_apikey.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_apikey);
        var submit_check = document.createElement("input");
            submit_check.setAttribute("value", "Check");
            submit_check.setAttribute("type", "button");
            submit_check.setAttribute("style", style_button);
            submit_check.addEventListener('click', function(){ check_apikey(get_form_element("apikey").value); }, false);
        settings_form.appendChild(submit_check);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var get_apikey = document.createElement("a");
            get_apikey.appendChild(document.createTextNode("Get API Key"));
            get_apikey.setAttribute("href", "http://readitlaterlist.com/api/signup/");
            get_apikey.setAttribute("target", "_blank");
            get_apikey.setAttribute("style", "display:block; width:120px; margin:0 auto; text-align:center; font-weight:bold;");
        settings_form.appendChild(get_apikey);
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
            inputbox_username.setAttribute("title", "Read It Later Username");
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
            inputbox_password.setAttribute("title", "Read It Later password");
            inputbox_password.setAttribute("name", "password");
            inputbox_password.setAttribute("value", config.password);
            inputbox_password.setAttribute("style", style_inputbox);
        settings_form.appendChild(inputbox_password);
        var submit_auth = document.createElement("input");
            submit_auth.setAttribute("value", "Auth");
            submit_auth.setAttribute("type", "button");
            submit_auth.setAttribute("style", style_button);
            submit_auth.addEventListener('click', function(){ auth_readitlater(get_form_element("username").value, get_form_element("password").value); }, false);
        settings_form.appendChild(submit_auth);
        settings_form.appendChild(document.createElement("br"));
        settings_form.appendChild(document.createElement("br"));
        var hr = document.createElement("hr");
            hr.setAttribute("style", style_hr);
        settings_form.appendChild(hr);
        settings_form.appendChild(document.createElement("br"));
*/
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

    GM_registerMenuCommand("Read It Later from LDR - setup", show_setup );

})();