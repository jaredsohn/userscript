// This is a greasemonkey script, for use with the Firefox extension Greasemonkey.
// More info: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name        Show Btchina
// @author      Sunwan
// @e-mail      <Sunwan>AT<zjcnnj.cn>
// @version     1.2.1
// @description Show torrent in btchina.net [Ver. 1.2.1]
// @namespace   http://www.cnnj.8866.org/download/greasemonkey/
// @include     http://*.btchina.net/*
// @include     http://*.sa20.com/*
// ==/UserScript==


// JScript.encode解码器
// 改编自Soya.Encode.ScriptDecoder
function JScriptDecoder()
{
    this.$matrix = [];
    this.$rotor =
        [
        1,2,0, 1,2,0, 2,0,0, 2,0,2, 1,0,2, 0,1,0, 2,0,1,
        1,2,0, 0,2,1, 0,2,0, 0,2,1, 1,0,2, 0,2,0, 1,0,1,
        1,2,0, 1,0,2, 1,0,2, 0,1,1, 2,0,0, 1,1,2, 0,1,0, 2];
    this.$ccmap =
        [ 
        0x7b,0x57,0x6e, 0x32,0x2e,0x2d, 0x30,0x47,0x75, 0x21,0x7a,0x52,
        0x29,0x56,0x60, 0x5b,0x42,0x71, 0x38,0x6a,0x5e, 0x33,0x2f,0x49,
        0x3d,0x26,0x5c, 0x58,0x49,0x62, 0x3a,0x41,0x7d, 0x35,0x34,0x29,
        0x65,0x32,0x36, 0x39,0x5b,0x20, 0x5c,0x76,0x7c, 0x56,0x72,0x7a,
        0x73,0x43,0x00, 0x66,0x38,0x6b, 0x4e,0x39,0x63, 0x45,0x70,0x33,
        0x6b,0x45,0x2b, 0x62,0x68,0x68, 0x59,0x71,0x51, 0x78,0x4f,0x66,
        0x5e,0x09,0x76, 0x7d,0x62,0x31, 0x4a,0x44,0x64, 0x6d,0x23,0x54,
        0x71,0x75,0x43, 0x00,0x00,0x00, 0x60,0x7e,0x3a, 0x00,0x00,0x00,
        0x53,0x5e,0x7e, 0x00,0x00,0x00, 0x42,0x77,0x45, 0x27,0x4a,0x2c,
        0x48,0x61,0x2a, 0x72,0x5d,0x74, 0x75,0x22,0x27, 0x31,0x4b,0x37,
        0x37,0x6f,0x44, 0x4d,0x4e,0x79, 0x52,0x3b,0x59, 0x22,0x4c,0x2f,
        0x54,0x50,0x6f, 0x6a,0x67,0x26, 0x47,0x2a,0x72, 0x64,0x7d,0x6a,
        0x2d,0x74,0x39, 0x20,0x54,0x7b, 0x00,0x2b,0x3f, 0x2e,0x2d,0x38,
        0x4c,0x2c,0x77, 0x5d,0x30,0x67, 0x7e,0x6e,0x53, 0x6c,0x6b,0x47,
        0x6f,0x66,0x34, 0x79,0x35,0x78, 0x74,0x25,0x5d, 0x43,0x21,0x30,
        0x26,0x64,0x23, 0x76,0x4d,0x5a, 0x25,0x52,0x5b, 0x24,0x63,0x6c,
        0x2b,0x3f,0x48, 0x28,0x7b,0x55, 0x23,0x78,0x70, 0x41,0x29,0x69,
        0x34,0x28,0x2e, 0x09,0x73,0x4c, 0x2a,0x59,0x21, 0x44,0x33,0x24,
        0x3f,0x00,0x4e, 0x77,0x6d,0x50, 0x3b,0x55,0x09, 0x55,0x53,0x56,
        0x69,0x7c,0x73, 0x61,0x3a,0x35, 0x63,0x5f,0x61, 0x50,0x65,0x4b,
        0x67,0x46,0x58, 0x51,0x58,0x3b, 0x49,0x31,0x57, 0x4f,0x69,0x22,
        0x46,0x6c,0x6d, 0x68,0x5a,0x4d, 0x7c,0x48,0x25, 0x36,0x27,0x28,
        0x70,0x5c,0x46, 0x6e,0x3d,0x4a, 0x7a,0x24,0x32, 0x2f,0x79,0x41,
        0x5f,0x37,0x3d, 0x4b,0x60,0x5f, 0x5a,0x51,0x4f, 0x2c,0x20,0x42,
        0x57,0x36,0x65];
    this.$prepareMatrix = function () {
        if (!this.$matrix.length) {
            var i, j, afccs =
                function (cca) { return String.fromCharCode
                    (cca[0], 0, cca[1], 0, cca[2]).split('\x00');
                };

            this.$matrix[9] = afccs(this.$ccmap.slice(0, j = 3));
            for(i = 0x20; i < 0x80; j += 3, i++)
                this.$matrix[i] = afccs(this.$ccmap.slice(j, j + 3));
        }
    };
    this.decode = function (sData) {
        var i, of, cc, at, sEncoded, s = '';

        // do we have anything to decode. if not, return an empty string.
        if(!sData)
            return s;

        // else try isolating the sEncoded script from its surroundings.
        else if(/#@~\^[\w\+\/]{6}==(.+)[\w\+\/]{6}==\^#~@/.test(sData))
            sEncoded = RegExp.$1;
    
        // no surrounding checksum found, then subject everything for decoding.
        else sEncoded = sData;

        this.$prepareMatrix();

        // iterate the sEncoded string and decode char by char...
        for(at = of = i = 0; i < sEncoded.length; i++){
            cc = sEncoded.charCodeAt(i);

            // 'at' switched off and the charcode is less 128 means we have
            // to perform decoding unless charcode equals 64 (@, at).
            if(!at && cc < 0x80){
                (cc != 0x40) ? 
                s += this.$matrix[cc][this.$rotor[of++ % 0x40]] : at = 1;
                continue;
            }

            // if 'at' switch is set, switch it off and replace current charcode
            // to one of the control-chars, others are passed through as-is.
            else {
                at = 0;
                if(cc < 0x80) of++;
                    switch(cc){
                        case 33 : cc = 60; break;
                        case 35 : cc = 13; break;
                        case 36 : cc = 64; break;
                        case 38 : cc = 10; break;
                        case 42 : cc = 62; break;
                    }
                s += String.fromCharCode(cc);
            }
        }
        return s;
    };
}
// end decoder


function pageChecker() {

    this.CONFIG_SHOW_STILLS = GM_getValue("configShowStills", false);           // 显示剧照
    this.CONFIG_SHOW_ALERT = GM_getValue("configShowAlert", false);             // 显示警告内容
    this.CONFIG_SHOW_SITES = GM_getValue("configShowSites", false);             // 显示镜像及联盟站点
    this.CONFIG_REFRESH_HOT_QUERY = GM_getValue("configRefreshHotQuery", false); // 热门刷新
    this.SHOW_GM_MENUS = GM_getValue("showGM_menus", true);                     // 显示GM菜单

    this.saveConfig1 = function() {
        GM_setValue("configShowStills", !GM_getValue("configShowStills",false));
        window.location.reload();
    };
    this.saveConfig2 = function() {
        GM_setValue("configShowAlert", !GM_getValue("configShowAlert",false));
        window.location.reload();
    };
    this.saveConfig3 = function() {
        GM_setValue("configShowSites", !GM_getValue("configShowSites",false));
        window.location.reload();
    };
    this.saveConfig4 = function() {
        GM_setValue("configRefreshHotQuery", !GM_getValue("configRefreshHotQuery",false));
        window.location.reload();
    };
    this.doGMmenus = function() {    // GM菜单操作
        if ( this.SHOW_GM_MENUS ) {
            if (this.CONFIG_SHOW_STILLS) {GM_registerMenuCommand("√ 显示剧照", this.saveConfig1 );}
            else{GM_registerMenuCommand("   显示剧照", this.saveConfig1 );}
            if (this.CONFIG_SHOW_ALERT) {GM_registerMenuCommand("√ 显示警告内容", this.saveConfig2 );}
            else{GM_registerMenuCommand("   显示警告内容", this.saveConfig2 );}
            if (this.CONFIG_SHOW_SITES) {GM_registerMenuCommand("√ 显示镜像及联盟站点", this.saveConfig3 );}
            else{GM_registerMenuCommand("   显示镜像及联盟站点", this.saveConfig3 );}
            if (this.CONFIG_REFRESH_HOT_QUERY) {GM_registerMenuCommand("√ 热门刷新", this.saveConfig4 );}
            else{GM_registerMenuCommand("   热门刷新", this.saveConfig4 );}
        }
        if ( !GM_getValue("showGM_menus") )
            GM_setValue("showGM_menus", this.SHOW_GM_MENUS);
        if ( !GM_getValue("configShowStills") )
            GM_setValue("configShowStills", this.CONFIG_SHOW_STILLS);
        if ( !GM_getValue("configShowAlert") )
            GM_setValue("configShowAlert", this.CONFIG_SHOW_ALERT);
        if ( !GM_getValue("configShowSites") )
            GM_setValue("configShowSites", this.CONFIG_SHOW_SITES);
        if ( !GM_getValue("configRefreshHotQuery") )
            GM_setValue("configRefreshHotQuery", this.CONFIG_REFRESH_HOT_QUERY);
    };

    this.page = null;
    this.head = null;
    this.tbody = null;
    this.rowsLength = 0;
    this.maxTableRows = 100;     // 表格中最多有100行
    this.checkCount = 0;

    this.getPage = function() {
        if ( document.body && document.body.nodeName =='BODY' ) {
            if ( /http:\/\/bt\d?\.btchina\.net/.test(location.href) ) {
                this.page = 'indexpage';    // 索引页
            }
            else if ( /http:\/\/search[1-3]?\.btchina\.net/.test(location.href) 
                    || /http:\/\/(search|www2)\.sa20\.com/.test(location.href) ) {
                this.page = 'searchpage';    // 搜索页
            }
        }
        else if ( /http:\/\/search[1-3]?\.btchina\.net/.test(location.href) ) {
            this.page = 'framesetpage';    // 框架页
        }
    };

    this.getHead = function() {
        this.head = document.getElementsByTagName("head")[0];
        if (this.head) return true; else return false;
    };

    this.getTbody = function() {
        switch (this.page) {
            case 'indexpage':
                var tb = document.getElementById("table-1");
                if ( tb ) this.tbody = tb.tBodies[0];
                    if (this.tbody) {
                        this.tbody.id = "contentTBody";
                        // 清空混乱的表格内容
                        while (this.tbody.rows[0]) this.tbody.deleteRow(0);
                        return true;
                    }
                return false;
            case 'searchpage':
                this.tbody = document.getElementById("contentTBody");
                if (this.tbody) return true;
                return false;
        }
    };

    // 取得script的文本，应该比innerHTML快
    this.getScriptText = function(oNode) {
        var s = "";
        var cs = oNode.childNodes;
        var l = cs.length;
        for (var i = 0; i < l; i++) {
            if ( cs[i].nodeType == 3 ) {    //TEXT_NODE
                s += cs[i].nodeValue;
            }
        }
        return s;
    };

    this.doStyle = function() {
        var el = document.createElement("style");
        el.setAttribute("type", 'text/css');
        el.innerHTML = [
            'IFRAME { display: none !important; }',       // 隐藏 iframe 
            '#AutoNumber1 { display: none !important; }', // 隐藏 ads 
            (this.CONFIG_SHOW_ALERT ? '' : 
                'div.contentbox { visibility: hidden !important; display: none !important; }'),
            (this.CONFIG_SHOW_ALERT ? '' : 
                'div.alert { visibility: hidden !important; display: none !important; }'),
            (this.CONFIG_SHOW_ALERT ? '' :
                'div.please { visibility: hidden !important; display: none !important; }'),
            (this.CONFIG_SHOW_SITES ? '' : 
                'div.annotation { visibility: hidden !important; display: none !important; }'),
            '.mlyri{position:absolute;left:0;top:0;}',             // popup menus
            '.mlyrh{width:1;height:1;position:absolute;left:0;top:0;visibility:hidden}', // popup menus
            '.m1mouto {BACKGROUND: rgb(229,229,229) !important;}', // popup menus
            '.m1inner {PADDING-LEFT: 0px !important;}',            // popup menus
            'tr.odd { white-space: normal !important; }',          // change nowrap to normal
            'tr.even { white-space: normal !important; }'          // change nowrap to normal
        ].join('\n');
        this.head.appendChild(el);
    };

    this.adsRemove = function() {
        // remove ads event
        var fn = function() {
            if (typeof(document.onclick) == 'function') document.onclick = null;
            if (typeof(window.onmousedown) == 'function') window.onmousedown = null;
        };
        this.execFunctionInHtml(fn);

        // 移除 ads divs
        var str, el;
        var count = 0;
        var sc = document.getElementsByTagName("script");
        for (var i = 0; i < sc.length; i++) {
            try {
                str = this.getScriptText(sc[i]);
                if ( str.indexOf('function getCookieVal(offset)') > -1 ) {
                    count++;
                    el = sc[i].parentNode;
                    while ( el && el.nodeName != 'DIV' ) {
                        el = el.parentNode;
                    }
                    if (el) {
                        el.parentNode.removeChild(el.nextSibling.nextSibling);
                        el.parentNode.removeChild(el);
                    }
                    if ( count > 1 ) break;
                }
                else if ( str.indexOf('displayFlash(') > -1 ) {
                    count++;
                    el = sc[i].parentNode;
                    while ( el && el.nodeName != 'TABLE' ) {
                        el = el.parentNode;
                    }
                    if (el) {
                        el.parentNode.removeChild(el);
                    }
                    if ( count > 1 ) break;
                }
            } catch (e) {}
        }

        // remove iframe
        var els = document.getElementsByTagName("iframe");
        for (var i = 0; i < els.length; i++) {
            els[i].parentNode.removeChild(els[i]);
        }
    };

    this.addEven = function() {
        // 左键或右键点击预览框外空白地方，预览框消失
        var fn = function() {    // 是在HTML中执行的
            window.onmousedown = function (evt) {
                var whichIt = evt.target;
                while ( whichIt && whichIt.id != 'TTip0' ) whichIt = whichIt.parentNode;
                if ( whichIt == null && myHint && myHint.visible != null )
                    myHint.hide(0);
            };
        };
        this.execFunctionInHtml(fn);
    };

    this.overrideHotQuery = function() {
        // 热门
        if ( !this.CONFIG_REFRESH_HOT_QUERY ) {
            var fn = function() {
                window.refreshHotQuery = function() {};
            };
            this.execFunctionInHtml(fn);
        }
    };

    this.findJScriptAndExec = function() {
        // 解码 JScript.encode
        var decoder = new JScriptDecoder();

        var sc = document.getElementsByTagName("script");
        for (var i = 0; i < sc.length; i++) {
            if (sc[i].getAttribute("language") && 
                    sc[i].getAttribute("language").toLowerCase() == 'jscript.encode') {
                sc[i].parentNode.replaceChild(
                    this.createNewScript( decoder.decode(this.getScriptText(sc[i])) ),sc[i]);
                return true;
            }
        }
        return false;
    };

    this.execConfigScript = function() {
        // 重新执行解码网页需要的一段script
        var str;
        var sc = document.getElementsByTagName("script");
        for (var i = 0; i < sc.length; i++) {
            str = this.getScriptText(sc[i]);
            if ( str.indexOf('var seed=new Array(32);') > -1 ) {
                var newScript = this.createNewScript( str )
                newScript.setAttribute( "id", "divMark" );
                sc[i].parentNode.replaceChild(newScript,sc[i]);
                return true;
            }
        }
        return false;
    };

    this.execContentScript = function() {
        if ( this.tbody ) {
            var str;
            var sc = document.getElementsByTagName("script");
            // 找出有关种子文件的所有script并执行
            for (var i = 0; i < sc.length; i++) {
                str = this.getScriptText(sc[i]);
                try {
                    if ( str.indexOf('getRawCode2( "') > -1 ) {
                        sc[i].parentNode.replaceChild(this.createNewScript(str),sc[i]);
                    }
                } catch (e) {}
            }
        }
    };

    // 修复btchina菜单
    this.doBtchinaMenus = function() {
        var str;
        var sc = document.getElementsByTagName("script");
        for (var i = 0; i < sc.length; i++) {
            str = this.getScriptText(sc[i]);
            try {
                // 找出菜单所在的单元
                if ( str.indexOf('var MENU_ITEMS0') > -1 ) {
                    var el = sc[i].parentNode;
                    el.setAttribute( "id", "btchinaMenuTdId" );
                    el = el.parentNode;
                    while ( el && el.nodeName != 'TABLE' ) el = el.parentNode;
                    if (el) {
                        el = el.parentNode;
                        while ( el && el.nodeName != 'TABLE' ) el = el.parentNode;
                    }
                    if (el)
                        try {
                            el.tBodies[0].rows[0].removeChild(el.tBodies[0].rows[0].cells[1]);
                        } catch (e) {}
                    break;
                }
            } catch (e) {}
        }

        try {this.showPopupMenus();} catch (e) {}
    };

    this.go = function() {
        this.getPage();

        if ( this.page ) {
            this.doGMmenus(); // GM菜单操作
        }
        else return;

        if ( this.page == 'indexpage' || this.page == 'searchpage' ) {
            if ( !this.getHead() ) return;
            try {this.doStyle();} catch (e) {}                    // CSS
            try {this.adsRemove();} catch (e) {}                  // ADS
            try {this.overrideHotQuery();} catch (e) {}           // 热门
            try {this.overrideGetValueFromString();} catch (e) {} // 种子排序修复
            try {this.doBtchinaMenus();} catch (e) {}             // 修复btchina菜单
        }
        if ( this.page == 'indexpage' ) {
            // JScript.encode 解码并执行
            if ( !this.findJScriptAndExec() ) return;

            this.head.appendChild( this.createNewScript( this.insertSpace.toString() ) );

            if ( !this.overrideGetRawCode3() ) return;

            // 重载THints对象方法
            try {this.overrideTHints();} catch (e) {}

            // 重载onRowClicked函数
            try {this.overrideOnRowClicked();} catch (e) {}

            if ( !this.execConfigScript() ) return; // 执行预置script
            if ( !this.getTbody() ) return;         // 表格body
            this.execContentScript();               // 执行种子script

            try {this.removeImages();} catch (e) {} // 移除剧照及预览框里的IFRAME Ads
        }
        else if ( this.page == 'searchpage' )    {
            try {this.addEven();} catch (e) {}
            if ( !this.getTbody() ) return;         // 表格body
            // 修复Firefox3或以上不能搜索
            if ( !(/Firefox\/[12]\./.test(navigator.userAgent)) )
                try {this.overrideloadXMLFromURL();} catch (e) {}
            // 每200ms检查表格内容的更新,因搜索页使用innerHTML来插入表格
            this.showBtChinaTimeId = window.setInterval( checkTbodyRows, 200 );
            // 移除剧照及预览框里的IFRAME Ad
            try {this.removeImages();} catch (e) {}
        }
    };
}

// 创建一新script并返回其node
pageChecker.prototype.createNewScript = function(str) {
    var newScript = document.createElement("script");
    newScript.setAttribute( "language", "javascript" );
    var sNode = document.createTextNode( str );
    newScript.appendChild( sNode );
    return newScript;
};

// 为了消除因访问不安全元素引起的安全问题，把script函数主体放到HTML中执行
pageChecker.prototype.execFunctionInHtml = function(f) {
    var str = f.toString();
    // 取出函数主体
    str = str.substring( str.indexOf('{')+1, str.lastIndexOf('}') );
    // 附加到HTML头部并执行
    var scNode = this.createNewScript(str);
    this.head.appendChild( scNode );
    // 执行过后删除script
    this.head.removeChild( scNode );
};

// 重载THints对象方法,改编自BTCHINA网页,
// 为安全起见，是在HTML中执行的
pageChecker.prototype.overrideTHints = function() {
    if ( typeof(unsafeW.THints) == 'undefined' ) return;
    var fn = function() {
        var str = window.THints.toString();
        str = str.replace(/function\s+THints \(o_cfg, items\)/,'function (o_cfg, items)');
        str = str.replace(/document\.write\s*\(.*\);/,
            // 创建一个预览块
            'var el = document.createElement("div");'+
            'el.setAttribute("id","TTip0");'+
            'var s = "visibility:hidden;position:absolute;top:0px;left:0px;";'+
            's += o_cfg["z-index"] != null ? ("z-index:" + o_cfg["z-index"]) : "";'+
            'el.setAttribute("style",s);'+
            'el.setAttribute("onMouseOver","myHint.show();");'+
            'el.setAttribute("onMouseOut","myHint.hide(" + o_cfg.out2_delay + ");");'+
            'var el0 = document.getElementById("divMark");'+
            'el0.parentNode.insertBefore(el,el0.nextSibling);'+
            'var el1 = document.createElement("table");'+
            'el.appendChild(el1);'+
            'el = document.createElement("tr");'+
            'el1.appendChild(el);'+
            'el1 = document.createElement("td");'+
            'el1.setAttribute("id","ToolTip0");'+
            'el1.setAttribute("class", o_cfg.css);'+
            'el1.setAttribute("nowrap","nowrap");'+
            'el.appendChild(el1);');
            // 预览块结束
        eval('window.THints = ' + str);
    };
    this.execFunctionInHtml(fn);
};

// 重载onRowClicked函数以实现点击一行变色
// 为安全起见，是在HTML中执行的
pageChecker.prototype.overrideOnRowClicked = function() {
    if ( typeof(unsafeW.onRowClicked) == 'undefined' ) return;
    var fn = function() {
        var str = window.onRowClicked.toString();
        str = str.replace(/function\s+onRowClicked\s*\(row,\s*rowNo\)/,'function (row, rowNo, e)');
        str = str.replace(/whichIt\s*=\s*event\.srcElement;/,'var whichIt = e.target;');
        eval('window.onRowClicked =' + str);
    };
    this.execFunctionInHtml(fn);
};

// 改编自BTCHINA网页
// 为安全起见，是在HTML中执行的
pageChecker.prototype.overrideGetRawCode3 = function() {
    if ( typeof(unsafeW.getRawCode3) == 'undefined' ) return false;
    var fn = function() {
        window.getRawCode3 = function (pagetext,paramters){
            var i = 0;
            var row_color = paramters[i++];
            var dateline = paramters[i++];
            var category = paramters[i++];
            var nowrap = paramters[i++];
            var typeprefix = paramters[i++];
            var attachmentid = paramters[i++];
            var zeroseedalert = paramters[i++];
            var title = paramters[i++];
            var postlink = paramters[i++];
            var torrent_filesize = paramters[i++];
            var torrent_tracker = paramters[i++];
            var data_updated = paramters[i++];
            var completed = paramters[i++];
            var downloading = paramters[i++];
            var sources = paramters[i++];
            var postedby = paramters[i++];
            var attachmentpath = paramters[i++];
            var fulldateline = paramters[i++];
            var downloadurls = [
                'http://'+((new Date()).getSeconds()>=17?((new Date()).getSeconds()>=43?
                    'nnv.dl1':'dl1.www2'):'dl2.www2')+'.btchina.net/download.php?s='+
                    attachmentpath+'&attachmentid='+attachmentid,
                'http://'+((new Date()).getSeconds()<17?'nnv.dl1':'dl2.www2')+
                    '.btchina.net/download.php?s='+attachmentpath+'&attachmentid='+attachmentid,
                'http://dl3.www2.btchina.net/download.php?s='+attachmentpath+'&attachmentid='+attachmentid,
                'http://dl4.www2.btchina.net/download.php?s='+attachmentpath+'&attachmentid='+attachmentid
            ];

            // 创建一行及相关内容
            var tr = document.createElement("tr");
            tr.setAttribute( "align", "center" );
            tr.setAttribute( "class", row_color );
            tr.setAttribute( "onMouseOver", 'onRowOver(this,'+rowNo+');');
            tr.setAttribute( "onMouseOut", 'onRowOut(this,'+rowNo+');' );
            tr.setAttribute( "onClick", 'onRowClicked(this,'+rowNo+',event);' );

            insertTd(tr,'nowrap |title="发布时间：'+fulldateline+'"',
                '<font face="宋体,verdana,arial,helvetica" >' + '<span style="display:none">'+
                fulldateline.substring(0,5)+'</span>'+dateline+'</font>');
            insertTd(tr,'nowrap','<font face="宋体,verdana,arial,helvetica" >'+category+'</font>');

            title = insertSpace(title);

            var s = nowrap;
            if ( myHint != null ){
                s += ' align="left" |id="cat" |onMouseOver="myHint.show('+ rowNo +
                     ');" |onMouseOut="myHint.hide();"';
                HINTS_ITEMS.push( mywrap(title, pagetext, postedby) );
                rowNo++;
            }
            else {
                s += 'align="left" |id="cat" |title="'+(pagetext==''?title:title+'\n\n'+pagetext)+'"';
            }

            insertTd(tr,s,'<font face="Verdana,Tahoma">'+typeprefix+'<a href="'+downloadurls[0]+
                '" '+zeroseedalert+' target="_blank">'+title+'</a> '+postlink+'</font>');
            insertTd(tr,'align="right" |nowrap','<font face="Verdana,Tahoma">'+torrent_filesize+'</font>');
            var tracker_update_title = ' title="Tracker：'+torrent_tracker+'\n数据更新：'+data_updated+'"';
            insertTd(tr,'nowrap |'+tracker_update_title,'<font face="Verdana,Tahoma">'+sources+'</font>');
            insertTd(tr,'nowrap |'+tracker_update_title,'<font face="Verdana,Tahoma">'+
                downloading+'</font>');
            insertTd(tr,'nowrap |'+tracker_update_title,'<font face="Verdana,Tahoma">'+completed+'</font>');
            insertTd(tr,'width="100"','<font face="Verdana,Tahoma">'+postedby.replace(/@/g,' @')+'</font>');

            s = '<font face="Verdana,Tahoma">';
            for (var i=1;i<downloadurls.length;i++){
                if (i!=1){
                    s += '| ';
                }
                s += '<a href="'+downloadurls[i]+'" '+zeroseedalert+' target="_blank">D'+(i+1)+'</a>';
            }
            s += '</font>';
            insertTd(tr,'align="left" |nowrap |title="安装BT后点击下载"',s);

            document.getElementById("contentTBody").appendChild(tr);    // 把此行添加tbody到的最后

            // 在一TR中添加TD,proStr为属性字符串,不同属性以'|'隔开
            function insertTd(tr,proStr,content) {
                var str;
                var td = document.createElement("td");

                if (proStr) {
                    str = proStr.split('|');
                    for (var i=0; i<str.length; i++) {
                        if ( /^\s*([^'"]+)s*=\s*"((?:.*(?:\n|\r)*)*)"/.test(str[i]) ){
                            //td.setAttribute(RegExp.$1,RegExp.$2);
                            td.setAttribute(RegExp.$1,(RegExp.$2).replace(/\n|\r/g,'\\n'));
                        }
                        else if ( /nowrap/i.test(str[i]) )
                            td.setAttribute("nowrap","nowarp");
                        else
                            td.setAttribute(str[i],"");
                    }
                }
                td.innerHTML = content;
                tr.appendChild(td);
            }
        };
    };
    this.execFunctionInHtml(fn);
    return true;
};

//在FF中,若表格内容是不含空格的可打印的ASCII字符,则FF不折行,因此常常撑开表格.
//此函数往带标签格式的字符串中的适当位置插入空格以实现自动折行.
pageChecker.prototype.insertSpace = function insertSpace(str) {
    var lablePos = [];   // 标签位置
    var lableValue = []; // 标签值
    var s = "";          // 去除了标签的字串
    var s1 = "";         // 添加了空格后的字串
    var s2 = "";         // 恢复了标签的字串
    var index;
    while ( str ) {
        index = str.search(/(<[^<>]*>)/); // 查找标签位置
        if ( index != -1 ) {              // 找到
            lableValue.push(RegExp.$1);   // 保存标签值
            s += str.substring(0,index);  // 保存去除了标签的字串
            lablePos.push(s.length);      // 保存标签位置
            str = str.substring( index + (RegExp.$1).length, str.length ); // 截断已查找部分
        }
        else {
            s += str;                     // 保存字串
            str = '';
        }
        s1 = insertSpace1(s,s1,lablePos); // 适当位置插入空格
    }

    // 恢复标签
    for ( var i = 0, j = 0; i < lablePos.length; i++ ) {
        s2 += s1.substring( j, lablePos[i] ) + lableValue[i];
        j = lablePos[i];
    }
    s2 += s1.substring( j, s1.length );
    return s2;

    function insertSpace1(s,s1,pos) {
        // 允许的最长连续ASCII字符，达到此长度则强行分割
        var maxAsciiLength = 30;
        // 匹配规定字符数以上的可见ASCII字符
        var re = eval( '/([\x21-\x7e]{' + maxAsciiLength + ',})/' );
        // 查找匹配字符串位置
        var j = s.search(re);
        // 没找到取整串,找到取前面的子串
        s1 = ( j == -1 ) ? s : s.substring( 0, j );
        while ( -1 != j ) {
            s = s.substring( j + (RegExp.$1).length, s.length ); // 保存剩余的子串
            // 往匹配字符串的') ] } . - _'后面插入空格并分组
            var ss = (RegExp.$1).replace(/((?:[\)|\]|\}|\.|\-|_])+)/g,'$1 ').split(' ');

            for ( var i = 0; i < ss.length; i++ ) {
                if ( ss[i] && ss[i].length > maxAsciiLength ) {
                    while ( ss[i] && ss[i].length > maxAsciiLength ) {
                        // 分组后的子串长度大于最长连续字符数,在最长连续字符数后插入连线符及空格
                        s1 += ss[i].substring(0,maxAsciiLength) + '_ ';
                        fixPos(s1.length-2, 2, pos);        // 调整标签位置
                        ss[i] = ss[i].substring(maxAsciiLength,ss[i].length);
                    }
                    s1 += ss[i];
                }
                else {
                    if ( i == ss.length - 1 ) {
                        // 是最后分组则连接以待处理
                        s1 += ss[i];
                    }
                    else {
                        // 非最后分组则连接并插入空格
                        s1 += ss[i] + ' ';
                        fixPos(s1.length-1, 1, pos); // 调整标签位置
                    }
                }
            }
            j = s.search(re);        // 循环处理匹配字符串后面的子串
            s1 += ( j == -1 ) ? s : s.substring( 0, j );
        }
        return s1;
    }

    // 调整标签位置函数
    // p插入字符的位置,n影响的字符数,pos标签位置数组
    function fixPos(p,n,pos) {
        for ( var i = 0; i < pos.length; i++ ) {
            if ( pos[i] >= p ) {
                // 插入字符的位置在原来的标签位置或之前
                pos[i] += n;        // 往后调整n个字符
            }
        }
    }
};

// 移除剧照及预览框里的IFRAME Ads
pageChecker.prototype.removeImages = function() {
    if ( typeof(unsafeW.myHint) == 'undefined' ) return;
    var fn;
    if ( this.CONFIG_SHOW_STILLS ) {
        fn = function() { window.myHint.CONFIG_SHOW_STILLS = 'true'; };
        this.execFunctionInHtml(fn);
    }

    fn = function() {
        // 覆盖myHint的showD方法以实现移除海报及IFRAME Ads
        window.myHint.showD = function(id) {
            var pageStr = this.items[id];
            
            if (!myHint.CONFIG_SHOW_STILLS) {
                // 移除剧照
                var re = /(?:(?:<br>)*<img[^<]*<\/img>(?:<br>)*)+/gi;
                pageStr = pageStr.replace( re, '<br>' );
            }

            // 移除 IFRAME Ads (不包括嵌套iframe)
            var sIndex, index = 0;
            var len = pageStr.length;
            while ( index < len )    {
                sIndex = pageStr.indexOf('<IFRAME ',index);    // 找到iframe标签的开始位置
                if ( sIndex > -1 ) {
                    index = sIndex + 8;
                    index = pageStr.indexOf('</IFRAME>',index);    // 找到iframe标签的结束位置
                    if ( index > -1 ) {
                        index += 9;
                        // 移除iframe标签中的所有内容,再接着找下一个iframe
                        pageStr = pageStr.substring(0,sIndex) + pageStr.substring(index,len);
                        len = pageStr.length;
                        index = sIndex;
                    }
                    else
                        break; // 没有找到,退出
                }
                else
                    break;     // 没有找到,退出
            }
            pageStr = pageStr.replace( /(?:\s*<br>\s*)+/gi, '<br>' ); // 移除多余的<br>
            // remove end

            this.divs[0].o_content.innerHTML = pageStr;
            if ( typeof(init_btchina) != 'undefined' ) {
                init_btchina(this.divs[0].o_content);
            }

            this.move(0);

            // 延迟100ms再显示预览以消除预览框的跳动
            this.divs[0].timer = window.setTimeout("myHint.showElem(0)", 100);

            if (this.n_dl_hide) this.timer = setTimeout("myHint.hide(0)", this.n_dl_hide);
            this.visible = id;
        };
    };
    this.execFunctionInHtml(fn);
}

// 重载 getValueFromString 以使种子数等排序正确
pageChecker.prototype.overrideGetValueFromString = function() {
    if ( typeof(unsafeW.SortableTable) == 'undefined' ) return;
    var fn = function() {
        // 重载 getValueFromString 以使种子数等排序正确
        SortableTable.prototype.__getValueFromString = SortableTable.prototype.getValueFromString;
        SortableTable.prototype.getValueFromString = function(sText, sType) {
            if ( sType == "PreNumber" ) {
                var n = parseInt(sText);
                return isNaN(n) ? -100 : n;
            }
            return this.__getValueFromString(sText, sType);
        };
    };
    this.execFunctionInHtml(fn);
};

// Firefox3下，btchina的搜索站点不支持fx3，在此把User-Agent暂时改为fx2.0的。
pageChecker.prototype.overrideloadXMLFromURL = function() {
    if ( typeof(unsafeW.loadXMLFromURL) == 'undefined' ) return;
    var fn = function() {
        eval('loadXMLFromURL =' + loadXMLFromURL.toString().replace(
            'httpRequest.open("GET", url, true);',
            'httpRequest.open("GET", url, true);'+
            'httpRequest.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.10");'));
        loadXMLFromURL(searchdataurl, getRawCodeXML);
    };
    this.execFunctionInHtml(fn);
};

// 显示btchina菜单
pageChecker.prototype.showPopupMenus = function() {
    if ( typeof(unsafeW.menu) == 'undefined' ) return;
    var fn = function() {
        var str = window.TMN.toString();
        // Firefox3.0以下，替换菜单中的Webdings指示为unicode编码字符
        if ( navigator.userAgent.indexOf('Firefox/3.') == -1 ) {
            str = str.replace(/this\.TMY\.join\(""\)/,
                'this.TMY.join("").replace(/&#052;/g,\"\\u25BA\")');
        }
        // document.write方法改为innerHTML
        str = str.replace(/document\.write\s*\((.*)\)\s*;/g,
            'document.getElementById("btchinaMenuTdId").innerHTML = [$1].join("");');
        eval('window.TMN =' + str);

        // 增加一个DIV使几个DIV重叠
        str = window.TMp.toString();
        str = str.replace(/(function[^>]+nowrap>)(<table.+<\/div>)(.*)/,
            '$1<div style=\\"position:relative;\\">$2</div>$3');
        eval('window.TMp =' + str);

        // 延迟显示使菜单稳定
        str = window.TM04.toString();
        str = str.replace(/(TMg.TM8\s*\(\s*this\.TMf\s*,\s*true\s*\)\s*;)/,
            'menus["0"].TM1B=setTimeout("TMg.TM8(menus[\\"0\\"].TM0T[\\""+this.id+"\\"].TMf,true)",100);');
        eval('window.TM04 =' + str);

        // 重作菜单
        var TM17 = false;
        new menu (MENU_ITEMS0, MENU_POS0);
    };
    this.execFunctionInHtml(fn);
};

// 应用于搜索页上,检查每行数据以实现自动折行
function checkTbodyRows() {
    var o = pChecker;
    if ( !o.tbody ) {
        window.clearInterval( o.showBtChinaTimeId );
        return;
    }
    var len = o.tbody.rows.length;

    if ( len > o.rowsLength ) { // 数据有更新
        var str, td, oNode;
        for ( var i = o.rowsLength; i < len; i++ ) {
            try {               // 检查更新部分
                td = o.tbody.rows[i].cells[2]; // 第3列---> 种子名称
                try {
                    oNode = td.getElementsByTagName("a")[0];
                    str = o.insertSpace(oNode.innerHTML); // 插入空格
                    if ( str.length != oNode.innerHTML.length )
                        // 若有改变,须重写
                        oNode.innerHTML = str;
                } catch (e) {}

                td = o.tbody.rows[i].cells[7];    // 第8列---> 发布者
                try {
                    td.removeAttribute("nowrap");  // 允许折行
                    td.width = "100";             // 设定宽度
                    // 找到'@'符号并在前面插入空格
                    oNode = td.getElementsByTagName("a")[0].nextSibling;
                    if ( oNode && oNode.nodeValue )
                        oNode.nodeValue = oNode.nodeValue.replace(/@/g,' @');
                } catch (e) {}
            } catch (e) {}
        }
        if ( len >= o.maxTableRows ) {
            // 已经处理完,清除时间ID
            window.clearInterval( o.showBtChinaTimeId );
        }
        else {
            o.rowsLength = len; // 保存已处理的行数
        }
    }
    else if ( len > 0 && o.checkCount++ > 50 )
        // 有数据并检查次数已超过50次还没传输完,清除时间ID
        window.clearInterval( o.showBtChinaTimeId );
}
// ====================
var unsafeW = window.wrappedJSObject;

var pChecker = new pageChecker();

window.addEventListener('load', function(){pChecker.go()}, false);

// ======== end ========