var meta = <><![CDATA[
// ==UserScript==
// @name           Colorful Search
// @namespace      http://hi.baidu.com/chrisyue
// @version        1.2.3
// @include        http://www.google.*/search?*
// @include        http://search.yahoo.com/search*
// @include        http://*.bing.com/search?*
// @description    Generate random light background colors of search results. For Google, Yahoo, Bing 
// @copyright      2009+, chrisyue
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
]]></>.toString();

function x(xpath, element, type, result)
{
    return document.evaluate(xpath, element || document, 
                             null,  type || 7, result);
}

function remove(elm)
{
    if (elm.snapshotItem) {
        for (var i = 0; i < elm.snapshotLength; i++) {
            remove(elm.snapshotItem(i));
        }
    } else if (elm[0]) {
        for (var i = 0; i < elm.length; i++) {
            remove(elm);
        }
    } else {
        elm.parentNode.removeChild(elm);
    }
}

function parseHeaders(metadataBlock) {
    var headers = {};
    var line, name, prefix, header, key, value;

    var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

        switch (name) {
            case "licence":
                name = "license";
                break;
        }

        [key, prefix] = name.split(/:/).reverse();

        if (prefix) {
            if (!headers[prefix]) 
                headers[prefix] = new Object;
            header = headers[prefix];
        } else
            header = headers;

        if (header[key] && !(header[key] instanceof Array))
            header[key] = new Array(header[key]);

        if (header[key] instanceof Array)
            header[key].push(value);
        else
            header[key] = value;
    }

    headers["licence"] = headers["license"];

    return headers;
}

function gm(name, value) {
    var ret;
    if ((ret = GM_getValue(name)) || typeof ret == "boolean") {
        return ret;
    }
    return value;
}

function getTld(hostname) {
    // a very easy way, not very accurate
    var hostParts = hostname.split(".");
    if (hostParts.length < 3) return hostname;
    // this info must be no mistake 'cause it is from wiki
    var gTLD = ["aero", "asia", "cat", "coop", "int", "com", "net", "org", "gov", "edu", 
                "biz", "info", "name", "jobs", "mil", "mobi", "museum", "pro", "tel", "travel"];
    var rootDomain = hostParts[hostParts.length - 2] + "."
                   + hostParts[hostParts.length - 1];
    if (gTLD.hasGot(hostParts[hostParts.length - 2])) {
        rootDomain = hostParts[hostParts.length - 3] + "." 
                   + rootDomain;
    }
    return rootDomain;
}

Array.prototype.hasGot = function(value) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) return true;
    }
    return false;
}

modules = {
    
    colorful: {

        colorEngines: {
        
            google: {
                
                run: function() {
                    var elements = x("//li[starts-with(@class, 'g')][not(@colorized)]|//div[@class='e']");
                    for (var i = 0; i < elements.snapshotLength; i++) {
                        var elm = elements.snapshotItem(i);
                        var link = x(".//a[1]", elm).snapshotItem(0);
                        if (!link) continue;
                        var tld = getTld(link.hostname);
                        var colors = modules.colorful.colorGenerator.generate(tld);
                        modules.colorful.colorize(elm, colors);
                    }
                }
            },
            
            yahoo: {
            
                run: function() {
                    var elements = x("//div[starts-with(@class, 'res')][not(@colorized)]");
                    for (var i = 0; i < elements.snapshotLength; i++) {
                        var elm = elements.snapshotItem(i);
                        var link = x(".//span[@class='url']/b[1]", elm).snapshotItem(0);
                        if (link) {
                            var tld = getTld(link.innerHTML);
                            var colors = modules.colorful.colorGenerator.generate(tld);
                            modules.colorful.colorize(elm, colors);
                        } else { // for maps, weather ..
                            modules.colorful.colorize(elm, ["#def", "#cde"]);
                        }
                    }
                                            
                    if (!this._fixedAPInfor) {
                        var css = ".autopagerize_page_info { margin: 0 0 20px 0 }";
                        GM_addStyle(css);
                        this._fixedAPInfor = true;
                    }
                }
            },
            
            bing: {
            
                run: function() {
                    var elements = x("//div[@id='results']/ul/li[not(@colorized)]|//div[@class='ansC']");
                    for (var i = 0; i < elements.snapshotLength; i++) {
                        var elm = elements.snapshotItem(i);
                        var link = x(".//a[1]", elm).snapshotItem(0);
                        if (!link) continue;
                        var tld = getTld(link.hostname);
                        var colors = modules.colorful.colorGenerator.generate(tld);
                        modules.colorful.colorize(elm, colors);
                        elm.style.marginBottom = "10px";
                    }                    
                    
                    if (!this._fixedAPInfor) {
                        var css = ".autopagerize_page_info { clear: both; margin: 0 0 10px; width: 100% }";
                        GM_addStyle(css);
                        this._fixedAPInfor = true;
                    }
                }
            }
        },
        
        colorGenerator: {
            
            _colorfulBg: [],
            
            _colorfulBd: [],
            
            generate: function(linkDomain) {
                var bgcolor, bdcolor;
                if (this._colorfulBg[linkDomain]) { // if this domain already have color 
                    bgcolor = this._colorfulBg[linkDomain];
                    bdcolor = this._colorfulBd[linkDomain];
                } else {
                    var r = parseInt(Math.random() * 48) + 220;
                    var g = parseInt(Math.random() * 48) + 220;
                    var b = parseInt(Math.random() * 48) + 220;
                    bgcolor = 'rgb(' + r + ',' + g + ',' + b + ')';
                    bdcolor = 'rgb(' + (r - 16) + ',' + (g - 16) + ',' + (b - 16) + ')';
                    this._colorfulBg[linkDomain] = bgcolor;
                    this._colorfulBd[linkDomain] = bdcolor;
                }
                return [bgcolor, bdcolor];
            }
        },
        
        colorize: function(elm, colors) {
            with (elm.style) {
                backgroundColor = colors[0];
                MozBorderRadius = "10px"; padding = "10px";
                border = "1px solid " + colors[1];
            }
            elm.setAttribute("colorized", "colorized");
        },
        
        getEngine: function() {
            if (this.engine) {
                return this.engine;
            }           
            return this.engine = this.colorEngines[document.domain.split('.')[1]];
        },
        
        run: function() {
            var engine;
            if (engine = this.getEngine()) {
                engine.run();
            }
        }
    },
         
    autopagerize: {
    
        run: function() {
            this.improveUi();
            var scrollHeight = document.documentElement.scrollHeight;
            document.addEventListener("scroll", function() {
                if( scrollHeight != document.documentElement.scrollHeight ) {
                    scrollHeight = document.documentElement.scrollHeight;
                    modules.colorful.run();
                }
            }, false);
        },
        
        improveUi: function() {
            css = <><![CDATA[
.autopagerize_page_info {
    padding: 10px; border: 1px solid #bcd; text-align: center;
    background: #cde; -moz-border-radius: 10px;
}
.autopagerize_page_separator {
    display: none;
}
]]></>.toString();
            GM_addStyle(css);
        }
    },
    
    version: {
        
        run: function() {
            var now = Math.ceil(Date.now() / 1000);
            if (now - gm("cs-verCheckAt", 0) > 2 * 86400) { // 2 days
                GM_xmlhttpRequest({
                    method:"GET",
                    url:"https://userscripts.org/scripts/source/52119.meta.js",
                    headers:{
                        "Accept":"text/javascript; charset=UTF-8"
                    },
                    overrideMimeType:"application/javascript; charset=UTF-8",
                    onload:function(response) {
                        var httpsMETA = parseHeaders(response.responseText);
                        var remoteVersion = httpsMETA["version"] ? httpsMETA["version"] : "0.0.0";
                        GM_setValue("cs-remoteVersion", remoteVersion);
                        GM_setValue("cs-verCheckAt", now);
                    }
                });
            }
            if (this.compare(this.local(), this.remote())) {
                this.showNotice(this.remote());
            }
        },
        
        local: function() {
            if (!this._local) {
                this._local = parseHeaders(meta)["version"];
            }
            return this._local;
        },
        
        remote: function() {
            if (!this._remote) {
                this._remote = gm("cs-remoteVersion", "0.0.0");
            }
            return this._remote;
        },
        
        compare: function(o, n) {
            var o = o.split(/\./); var n = n.split(/\./);
            for (var i = 0; i < 3; i++) {
                if (n > o) return true;
            }
            return false;
        },
        
        showNotice: function(version) {
            var a = document.createElement("a");
            with (a) {
                innerHTML = "Update to <span style='color: #f00'>C</span>olorful <span style='color: #0f0'>S</span>earch <span style='color: #66f'>v</span>" + version;
                href = "http://userscripts.org/scripts/show/52119";
                target = "_blank";
                with (style) {
                    display = "block"; background = "black"; color = "white";
                    position = "fixed"; zIndex = "100"; bottom = "5px"; right = "5px";
                    padding = "2px"; textDecoration = "none";
                }
            }
            document.body.appendChild(a);
        }
    }
};

app = {

    run: function() {
        for each(mod in modules) {
            if (mod.run) {
                mod.run();
            }
        }
    }
};

try {
    app.run();
} catch (e) {
    //alert(e.message);
}