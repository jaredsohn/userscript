// ==UserScript==
// @id             account_switcher
// @name           Account switcher
// @version        2.1
// @namespace      http://www.cc98.org
// @author         tuantuan <dangoakachan@foxmail.com>
// @description    Switch your login account of CC98 quickly.
// @include        http://www.cc98.org/*
// @run-at         document-end
// ==/UserScript==

(function() {
    /* User Settings Start */
    /* Timout for reloading */
    var timeout = 1000;

    /* Status color for default, warning or error */
    var default_color = "black";
    var warn_color = "blue";
    var error_color = "red";

    /* Bookmarks */
    var bookmarks = {
        //"隐身": "cookies.asp?action=hidden",
        //"上线": "cookies.asp?action=online",
        //"注销": "logout.asp",
        "修改个人资料": "modifyinfo.asp",
        "我的主题列表": "mytopic.asp",
        "十大热门主题": "hottopic.asp",
    };
    /* User Settings End */

    /* Make it empty here */
    var accounts = {};
    /* Set the status logger position */
    var status_where = "switch_status";

    /*
     * Create a cookie with the given key and value and other optional parameters.
     * or get the value of a cookie with the given key.
     *
     * code from: https://github.com/carhartl/jquery-cookie/blob/master/jquery.cookie.js
     */
    function cookie(key, value, options)
    {
        if (arguments.length > 1 && String(value) !== "[object Object]") {
            options = options || {};

            if (value === null || vnalue === undefined)
                options.expires = -1;

            if (typeof options.expires === "number") {
                var days = options.expires;
                var t = options.expires = new Date();

                t.setDate(t.getDate() + days);
            }

            value = String(value);

            document.cookie = [
                encodeURIComponent(key), "=",
                options.raw ? value : encodeURIComponent(value),
                options.expires ? "; expires=" + options.expires.toUTCString() : "",
                options.path ? "; path=" + options.path : "/",
                options.domain ? "; domain=" + options.domain : "",
                options.secure ? "; secure" : ""].join("");

            return document.cookie;
        }

        options = value || {};
        var result;
        var decode = options.raw ? function (s) { return s; }: decodeURIComponent;

        return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) +
            '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : "";
    }

    /* Evaluate a xpath expression */
    function xpath(path)
    {
        return document.evaluate(
            path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    }

    /* Print the log to the console */
    function logger(msg, color)
    {
        var status = document.getElementById(status_where)

        color = color || default_color;
        msg = "<font color='" + color + "'>" + msg + "</font>";
        status.innerHTML = msg;
        status.style.display = "inline";
    }

    /* Add customized style like GM_addStyle */
    function add_style(css)
    {
        var head = document.getElementsByTagName("head")[0];
        var style = document.createElement("style");

        style.setAttribute("type", "text/css");
        style.innerHTML = css;
        head.appendChild(style);
    }

    /* Simulate GM_getValue and GM_setValue functions */
    function get_value(key, def) { return localStorage.getItem(key) || def; }
    function set_value(key, value) { return localStorage.setItem(key, value); };
    function del_value(key) { localStorage.removeItem(key); }

    /* Do ajax post request */
    function xhr_post(url, data, callback)
    {
        /* Create a request object */
        var req = new XMLHttpRequest();

        req.open("POST", url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        /* If callback is a function, bind it to onload event */
        if (typeof callback == "function")
            req.onload = callback;
        else if (typeof callback == "object") {
            /* Otherwise, callback is a event object as {"event": "callback"} */
            for (var attr in callback)
                req[attr] = callback[attr];
        }

        /* Send the post data */
        req.send(data);
    }

    /* Reload cur pages when timeout */
    function reload(flag) 
    { 
        if (!flag) return;
        else setTimeout("location.reload()", timeout); 
    }

    /* Check if the user has logged in */
    function is_login(username)
    {
        var login_info = cookie("aspsky");

        if (username) {
            if (login_info.indexOf(username) != -1)
                return true;
            else
                return false;
        } else if (login_info)
            return true;
        else
            return false;
    }

    /* Log in cc98 with specified user account */
    function login(username, passwd, reload_flag)
    {
        /* Check if the user has logged in */
        if (is_login(username)) {
            logger("用户'" + username + "'已经登录.");
            return;
        }

        /* Log out last user */
        logout();

        /* MD5 encrypt */
        passwd = md5(String(passwd));

        /* Prepare the data to be posted */
        var data = "a=i&u=" + encodeURIComponent(username) +
            "&p=" + encodeURIComponent(passwd) + "&userhidden=2";

        xhr_post("http://www.cc98.org/sign.asp", data, function(e) {
            var req = e.target || this;

            switch (req.responseText) {
                case "9898":
                    logger("用户'" + username + "'登录成功.");
                    break;
                case "1003":
                    logger("用户'" + username + "'密码错误.", error_color);
                    break;
                case "1002":
                    logger("用户'" + username + "'已经被锁定.", warn_color);
                    break;
                case "1001":
                    logger("用户'" + username + "'不存在.", error_color);
                    break;
                default:
                    logger("遇到未知的错误.", error_color);
                    break;
            }

            reload(reload_flag);
        });
    }

    /* Log out cc98.org */
    function logout()
    { 
        /* If a user have logged in */
        if (is_login()) {
            xhr_post("http://www.cc98.org/sign.asp", "a=o", function(e) {
                req = e.target || this;

                if (req.status == 200)
                    cookie("aspsky", null);    // Delete the cookie
            });
        }
    }

    /* Actions object */
    var actions = {
        /* Add a new account */
        add_user: function() {
            var username = prompt("Username: ");
            var passwd = prompt("Password: ");

            if (username && passwd) {
                accounts[username] = passwd;
                set_value("cc98_accounts", JSON.stringify(accounts));
                logger("用户'" + username + "已经添加到马甲列表.");

                return true;
            } else {
                logger("添加用户必须同时指定用户名和密码", warn_color);
                return false;
            }
        },

        /* Delete a old account */
        del_user: function() {
            var username = prompt("Username: ");

            if (!username) {
                logger("删除用户必须指定用户名", warn_color);
                return false;
            }

            if (username in accounts) {
                delete accounts[username];
                set_value("cc98_accounts", JSON.stringify(accounts));
                logger("用户'" + username + "已经从马甲列表中删除.");

                return true;
            } else {
                logger("用户'" + username + "不存在马甲列表中.", warn_color);
                return false;
            }
        },

        /* Clear all accounts */
        clear_users: function() {
            del_value("cc98_accounts");
            logger("马甲列表已经清空.");
            return true;
        },

        /* Import accounts */
        import_accounts: function() {
            var im_accounts = prompt("Import accounts, like {\"u1\":\"p1\", \"u2\":\"p2\"}: ");
            var users = [];
            var ret = true;

            if (im_accounts) {
                try {
                    im_accounts = JSON.parse(im_accounts);

                    for (var user in im_accounts) {
                        accounts[user] = im_accounts[user];
                        users.push(user);
                    }

                    set_value("cc98_accounts", JSON.stringify(accounts));
                    logger("用户'" + users.join(", ") + "成功导入到马甲列表中.");
                } catch (err) {
                    logger(err, error_color);
                    ret = false;
                }
            } else {
                logger("必须以JSON的形式提供导入的账号,请参考导出格式.", warn_color);
                ret = false;
            }

            return ret;
        },

        /* Export accounts */
        export_accounts: function() {
            var ex_accouts = get_value("cc98_accounts");

            if (ex_accouts)
                logger(ex_accouts);
            else
                logger("马甲列表为空.", warn_color);

            return false;
        },
    };

    /* Add multi switch menu */
    function add_multi_switcher()
    {
        /* Get the add position */
        var pos = xpath("//td[@class='TopLighNav1']/div").singleNodeValue;

        if (pos == null)
            return;

        var multi_login = document.createElement("div");
        multi_login.id = "multi_login";
        pos.appendChild(multi_login);

        /* Add status notification box */
        var status = document.createElement("pre");
        status.id = "switch_status";
        multi_login.appendChild(status);

        /* Add select box */
        var select_menu = document.createElement("select");
        select_menu.id = "multi_select";
        multi_login.appendChild(select_menu);

        /* Add accounts to select menu */
        var option = new Option("用户列表", "", true)
        option.disabled = "disabled";
        select_menu.add(option);

        accounts = JSON.parse(get_value("cc98_accounts", "{}"));
        for (var user in accounts)
            select_menu.add(new Option(user, user));

        /* Add actions to select menu */
        option = new Option("操作列表", "")
        option.disabled = "disabled";
        select_menu.add(option);

        select_menu.add(new Option("添加", "add_user"));
        select_menu.add(new Option("删除", "del_user"));
        select_menu.add(new Option("清空", "clear_users"));
        select_menu.add(new Option("导入", "import_accounts"));
        select_menu.add(new Option("导出", "export_accounts"));

        /* Add bookmarks to select menu */
        option = new Option("书签列表", "");
        option.disabled = "disabled";
        select_menu.add(option);

        for (var name in bookmarks)
            select_menu.add(new Option(name, bookmarks[name]));

        /* Bind change event to select menu */
        select_menu.addEventListener("change", function(e) {
            var val = e.target.value;

            /* Change status logger position */
            status_where = "switch_status";

            if (val in accounts) /* If val is an account username */
                login(val, accounts[val], true);
            else if (val in actions) {  /* If val is an action name */
                var ret = actions[val]();

                if (ret) reload(true);
                else e.target.selectedIndex = 0;
            } else  /* Otherwise, val is a bookmark url */
                location.href = val;
        }, false);
    }

    function add_post_as()
    {
        /* We will get submit button here */
        var submit_btn = xpath("//td[@class='tablebody2']//input[@type='submit']")
            .singleNodevalue;

        if (submit_btn == null)
            return;

        /* Add status notification box */
        var status = document.createElement("pre");
        status.id = "postas_status";
        submit_btn.parentNode.insertBefore(status, submit_btn);

        /* Create post as menu */
        var postas_menu = document.createElement("select");
        submit_btn.parentNode.insertBefore(postas_menu, submit_btn);

        /* Add User List label */
        var option = new Option("切换用户为", "", true)
        option.disabled = "disabled";
        postas_menu.add(option);

        /* Add accounts to post as menu */
        postas_menu.id = "post_as";

        for (var user in accounts)
            postas_menu.add(new Option(user, user));

        /* Bind change event to select menu */
        postas_menu.addEventListener("change", function(e) {
            /* Get account username and password */
            var val = e.target.value;
            var passwd = accounts[val];

            /* Change status logger position */
            status_where = "postas_status";

            /* Log in selected user */
            login(val, passwd, true);
        }, false);
    }

    /* C-like main entry */
    function main() 
    {
        /* Disable the script in frame window */
        if (window.top != window.self)
            return;

        /* Add customized style for select menu */
        add_style("\
            #switch_status, #postas_status {\
                font-size: 12px;\
                width: 50px;\
                margin-right: 5px;\
                display: none;\
            }\
            #multi_login {\
                text-align: right;\
                width: 500px;\
                position: absolute;\
                top: 0px;\
                right: 0px;\
            }\
            #multi_select {\
                font-size: 12px;\
                padding-bottom: 1px;\
                height: 16px;\
            }\
            #post_as {\
                font-size: 12px;\
                margin-right: 10px;\
                height: 20px;\
            }\
        ");

        /* Add multi switch menu */
        add_multi_switcher();

        /* Add post as menu when reply */
        if (is_login() && (location.href.match(/reannounce|dispbbs/) != null))
            add_post_as();
    }

    main();

    /* MD5 script from http://www.cc98.org/js/md5.js */
    var md5 = (function() {
        var hexcase=0;var b64pad="";var chrsz=8;function hex_md5(s){return binl2hex(core_md5(str2binl(s),s.length*chrsz));}
        function b64_md5(s){return binl2b64(core_md5(str2binl(s),s.length*chrsz));}
        function str_md5(s){return binl2str(core_md5(str2binl(s),s.length*chrsz));}
        function hex_hmac_md5(key,data){return binl2hex(core_hmac_md5(key,data));}
        function b64_hmac_md5(key,data){return binl2b64(core_hmac_md5(key,data));}
        function str_hmac_md5(key,data){return binl2str(core_hmac_md5(key,data));}
        function md5_vm_test()
        {return hex_md5("abc")=="900150983cd24fb0d6963f7d28e17f72";}
        function core_md5(x,len)
        {x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16)
        {var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}
        return Array(a,b,c,d);}
        function md5_cmn(q,a,b,x,s,t)
        {return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}
        function md5_ff(a,b,c,d,x,s,t)
        {return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}
        function md5_gg(a,b,c,d,x,s,t)
        {return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}
        function md5_hh(a,b,c,d,x,s,t)
        {return md5_cmn(b^c^d,a,b,x,s,t);}
        function md5_ii(a,b,c,d,x,s,t)
        {return md5_cmn(c^(b|(~d)),a,b,x,s,t);}
        function core_hmac_md5(key,data)
        {var bkey=str2binl(key);if(bkey.length>16)bkey=core_md5(bkey,key.length*chrsz);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++)
        {ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}
        var hash=core_md5(ipad.concat(str2binl(data)),512+data.length*chrsz);return core_md5(opad.concat(hash),512+128);}
        function safe_add(x,y)
        {var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}
        function bit_rol(num,cnt)
        {return(num<<cnt)|(num>>>(32-cnt));}
        function str2binl(str)
        {var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz)
        bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(i%32);return bin;}
        function binl2str(bin)
        {var str="";var mask=(1<<chrsz)-1;for(var i=0;i<bin.length*32;i+=chrsz)
        str+=String.fromCharCode((bin[i>>5]>>>(i%32))&mask);return str;}
        function binl2hex(binarray)
        {var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var str="";for(var i=0;i<binarray.length*4;i++)
        {str+=hex_tab.charAt((binarray[i>>2]>>((i%4)*8+4))&0xF)+
        hex_tab.charAt((binarray[i>>2]>>((i%4)*8))&0xF);}
        return str;}
        function binl2b64(binarray)
        {var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var str="";for(var i=0;i<binarray.length*4;i+=3)
        {var triplet=(((binarray[i>>2]>>8*(i%4))&0xFF)<<16)|(((binarray[i+1>>2]>>8*((i+1)%4))&0xFF)<<8)|((binarray[i+2>>2]>>8*((i+2)%4))&0xFF);for(var j=0;j<4;j++)
        {if(i*8+j*6>binarray.length*32)str+=b64pad;else str+=tab.charAt((triplet>>6*(3-j))&0x3F);}}
        return str;}
        return hex_md5;
    })();
})();
