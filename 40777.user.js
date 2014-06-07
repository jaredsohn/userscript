// ==UserScript==
// @author         mungushume
// @name           freedb cue sheet maker
// @version        1.1
// @description    Create a cue sheet from any entry from freedb.org
// @namespace      http://www.monkeyr.com
// @include        http://www.freedb.org/freedb_search.php*
// @scriptsource   http://userscripts.org/scripts/show/40777
/* StartHistory

v1.1 - 19 Jan 2009
 - Auto update test

v1.0 - 19 Jan 2009
 - Inital release

EndHistory */ 
// ==/UserScript==


var O = {

    scriptName : "freedb cue sheet maker",
    scriptVersion : "1.1",
    scriptId : "40777",

    init : function()
    {
        var nodes = document.getElementsByXPath( '//table [@class = "searchResultT2A"]//div//a' );

        for (var i = 0; i < nodes.length; i++)
        {
            var node = nodes[i];
            var link = document.createElement( "a" );
            link.href = "javascript:;";
            link.appendChild( document.createTextNode( "cue sheet" ) );
            var div = node.parentNode;
            div.insertBefore( link, node );
            div.insertBefore( document.createTextNode( " / " ), node );

            link.addEventListener("click", this.cueIt(node.href), false);
        }
    },

    getURL : function (address, cb)
    {
        GM_xmlhttpRequest({
            method:"GET",
            url:address,//+"?"+Math.random(),
            onload:function(xhr) { cb(xhr.responseText); }
        });
    },

    cueIt : function(link)
    {
        var that = this;
        return function(e)
        {
            if (e)
            {
                e.preventDefault();
                e.stopPropagation();
            }
            that.getURL(link, that.proc.bind(that));

        }.bind(this);
    },

    proc : function (txt)
    {
        var ss = txt.split("\n");
        var frames=[], titles=[], artists=[], dperformer, dtitle, reg;
        for (var i = 0; i < ss.length; i++)
        {
            var s = ss[i];
            var frame = s.match(/#\s*(\d+)/);
            if(frame)
            {
                frames.push(frame[1]);
            }
            disktitle = s.match(/DTITLE=(.*)/);
            if(disktitle)
            {
                if(reg = disktitle[1].match(/(.*) \/ (.*)|(.*) \- (.*)/))
                {
                    dperformer = (reg[1]||reg[3]);
                    dtitle = (reg[2]||reg[4]);
                }
                else
                {
                    dtitle = disktitle[1];
                }
            }

            var ttitle = s.match(/TTITLE\d+=(.*)/);
            if(ttitle)
            {
                if(reg = ttitle[1].match(/(.*) \/ (.*)|(.*) \- (.*)/))
                {
                    artists.push(reg[1]||reg[3]);
                    titles.push(reg[2]||reg[4]);
                }
                else
                {
                    titles.push(ttitle[1]);
                }
            }
        }
        var cs = "REM cue sheet generated from freedb.org by freedb cue sheet maker v"+ this.scriptVersion +"\n"
        cs += dperformer ? "PERFORMER \"" + this.cln(dperformer) + "\"\n" : "";
        cs += dtitle ? "TITLE \"" + this.cln(dtitle) + "\"\n" : "";
        cs += "FILE \"PUT YOUR FILENAME HERE\" MP3\n";

        for (i = 0; i < titles.length; i++)
        {
            var trackCount = titles.length;
            var duration = 0;

            for(i = 1; i <= trackCount; ++i )
            {

                cs += "  TRACK " + ( i <10 ? "0" + i : i ) + " AUDIO\n";

                if( artists.length>0 )
                {
                    cs += "    PERFORMER \"" + this.cln(artists[i-1]) + "\"\n"
                }
                cs += "    TITLE \"" + this.cln(titles[i-1]) + "\"\n";
                cs +=  "    INDEX 01 " + this.convDuration( duration ) + "\n";
                duration = parseInt(frames[i]-frames[0]);
            }
        }
        window.open("data:text/plain;charset=utf-8," + encodeURI( cs ));
    },
    
    cln : function ( str )
    {
        return str.trim().replace(/"/g, "'");
    },
    
    convDuration : function ( frameoffset )
    {
        var dec = frameoffset/75;
        var min = Math.floor(dec/60);
        var sec = Math.floor((dec-(min*60)));
        var frames = Math.floor(frameoffset-((min*60*75)+(sec*75)));

        return ( min <10 ? "0" + min : min ) + ":" + ( sec <10 ? "0" + sec : sec ) + ":" + ( frames <10 ? "0" + frames : frames );
    }
};

/* Update interface */
O.UI =
    {   
    _loadBlocker: function()
    {
        if (this.blocker==null)
        {
            var blocker = document.buildElement("div", {id:"uil_blocker",
                style:"position:fixed;top:0px;bottom:0px;left:0px;right:0px;background-color:#000;opacity:0.5;z-index:10000;"});
            this.blocker = blocker;
            document.body.appendChild(blocker);	
        }
    },
	
    updateScript: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        this._loadBlocker();

        try{
            window.location.replace("http://userscripts.org/scripts/source/"+ O.scriptId +".user.js");
        }
        catch(e)
        {}
        if(this.prefs)document.body.removeChild(this.prefs);
        if(this.history)document.body.removeChild(this.history);
        GM_setValue('skipVersion', 0);
        setTimeout(this.refreshShow.bind(this),4000);

    },

    refreshShow: function()
    {
        var refresh = document.buildElement("iframe", {src:O.RES.REFRESH_HTML,
            style:"position:fixed;top:20%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001"}, 
            null, "load", this.refreshDocumentLoadHandler.bind(this));
        this.refresh = refresh;
        document.body.appendChild(refresh);
    },
    
    refreshDocumentLoadHandler: function()
    {
        this.refresh.contentDocument.getElementById("scriptName").innerHTML=O.scriptName;
    },
	
    hide: function()
    {
        if(this.history) document.body.removeChild(this.history);
        if(this.blocker)document.body.removeChild(this.blocker);
        this.history = null;
        this.prefs = null;
        this.blocker = null;
    },
    	
    getURL: function(address, cb)
    {
        GM_xmlhttpRequest({
            method:"GET",
            url:address,//+"?"+Math.random(),
            onload:function(xhr) { cb(xhr.responseText); }
        });
    },
	
    updateCheckRequest: function()
    {		
        var lastCheck = GM_getValue('lastCheck', 0);
        if (this._currentTime() > (lastCheck + 86400)) //24 hours after last check
        { 
            GM_setValue('delayUpdate', false);
            this.getURL("http://userscripts.org/scripts/source/"+O.scriptId+".meta.js", this.updateTestOnPage.bind(this));
        }
        else
        {
            this.onSiteVersion = GM_getValue('onSiteVersion', 0);
            var delayUpdate = GM_getValue('delayUpdate', false);			
            var skipVersion = GM_getValue('skipVersion', 0);
            if ( this.versionCompare(O.scriptVersion, this.onSiteVersion) )
            {
                if ( this.versionCompare(skipVersion, this.onSiteVersion) && !delayUpdate )
                {
                    this.updateMessageShow();
                }
            }
        }
    },
	
    updateTestOnPage: function(text)
    {
        var skipVersion = GM_getValue('skipVersion', 0);

        var onSiteVersion = text.match(/\/\/\s*@version\s*(\d.*)/);
        this.onSiteVersion = (onSiteVersion===null) ? 0 : onSiteVersion[1];
        GM_setValue('onSiteVersion', this.onSiteVersion);
		
        var updateHistory = text.substring(text.search(/\/\*.*StartHistory/im));
        updateHistory = updateHistory.substring(0, updateHistory.search(/EndHistory.*\*\//im))
        GM_setValue('onSiteVersionHistory', encodeURI(updateHistory));

        if ( this.versionCompare(O.scriptVersion, this.onSiteVersion) )
        {
            if ( this.versionCompare(skipVersion, this.onSiteVersion) )
            {
                this.updateMessageShow();
            }
    	}
    	GM_setValue('lastCheck', this._currentTime());
    },	
	
	
    versionCompare: function(ver1, ver2)
    {
        var maxVersionPartTest = 5;
        var ver1Arr = (ver1+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        var ver2Arr = (ver2+('.0'.repeat(maxVersionPartTest))).split(".",maxVersionPartTest);
        
        //GM_log(ver1Arr.join(',') + ' - ' +ver2Arr.join(','));
        
        for(var i=0; i<maxVersionPartTest; i++)
        {
            //GM_log(ver1Arr[i].retNum() +' '+ ver2Arr[i].retNum());
            if( ver1Arr[i].retNum() < ver2Arr[i].retNum() )
            {
                break;
            }
            else if( ver1Arr[i].retNum() > ver2Arr[i].retNum() )
            {
                i = maxVersionPartTest
                break;
            }
        }
        return (i<maxVersionPartTest);
    },
	
    updateMessageShow: function()
    {
        this._addStyle("@namespace url(http://www.w3.org/1999/xhtml); .gbh{display: none !important;} #gm_update_alert {margin: 10px; background-color: #E5ECF9; text-align: center; -moz-border-radius: 5px} #gm_update_alert a:visited {color: #0000CC !important} #gm_update_alert p {padding: 5px}");
        var div = document.buildElement("div", {id:"gm_update_alert"});
        var p = document.buildElement("p");
        var sn = document.buildElement("strong", null, O.scriptName+"&nbsp;");
        var sep = document.buildElement("span", null, "&nbsp;&nbsp;-&nbsp;&nbsp;");
        p.appendChild(sn);
        p.appendChild(document.createTextNode(" update available v"+this.onSiteVersion+" (current v"+O.scriptVersion+")"));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(this.createLinkControl("Ignore for 24 hours", this.updateDelay.bind(this)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(this.createLinkControl("Wait for next version", this.updateSkip.bind(this)));
        p.appendChild(sep.cloneNode(true));
        var a = document.buildElement("a", {target:"_blank", href:"http://userscripts.org/scripts/show/"+O.scriptId}, "Script homepage"); 
        p.appendChild(a);
        p.appendChild(sep.cloneNode(true));
        p.appendChild(this.createLinkControl("What's new", this.historyShow.bind(this)));
        p.appendChild(sep.cloneNode(true));
        p.appendChild(this.createLinkControl("Update", this.updateScript.bind(this)));
        div.appendChild(p);
        document.body.insertBefore(div, document.body.firstChild);
        this.updateMessage = div
    },

    updateMessageHide: function()
    {
        if(this.updateMessage)document.body.removeChild(this.updateMessage);
        this.updateMessage = null;
    },
	
    updateDelay: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        GM_setValue('delayUpdate', true);
        alert("You will not be reminded about this update again for 24 hours.");
        this.updateMessageHide();
    },
	
    updateSkip: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        GM_setValue('skipVersion', this.onSiteVersion);
        alert("You will not be reminded again until the next new version is released.");
        this.updateMessageHide();
    },
	
    _currentTime: function()
    {
        var d = new Date();
        return Math.round(d.getTime() / 1000); // Unix time in seconds
    },

    historyShow: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }
        
        this._loadBlocker();
        if(this.prefs)document.body.removeChild(this.prefs);
        this.prefs = null;

        var history = document.buildElement("iframe", {src:O.RES.HISTORY_HTML,
            style:"position:fixed;top:5%;left:0px;right:0px;border:none;height:100%;width:100%;overflow:hidden;z-index:10001"}, 
            null, "load", this.historyDocumentLoadHandler.bind(this));
        this.history = history;

        document.body.appendChild(history);
    },

    historyDocumentLoadHandler: function()
    {
        this.history.contentDocument.getElementById("version").innerHTML=O.scriptVersion;
        this.history.contentDocument.getElementById("scriptName").innerHTML=O.scriptName;

        var form = this.history.contentDocument.forms.namedItem("history");

        // Set up form state
        form.elements.namedItem("history_text").innerHTML = decodeURI(GM_getValue('onSiteVersionHistory', ''));
	    
        // Set up event handlers
        form.elements.namedItem("install_button").addEventListener("click", this.updateScript.bind(this), false);
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
                
    },
    
    _addStyle: function(css)
    {
        if (typeof GM_addStyle != "undefined") {
            GM_addStyle(css);
        } else if (typeof addStyle != "undefined") {
            addStyle(css);
        } else {
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.innerHTML = css;
                heads[0].appendChild(node); 
            }
        }
    },
    
    createLinkControl: function(name, handler)
    {
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", handler, false);
        return a;
    }
};

/* Resources */
O.RES = 
{
    HISTORY_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VO"+
        "IiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD48aGVhZD4NCjxtZXRhIGh0dHAtZXF1aX"+
        "Y9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOyBjaGFyc2V0PVVURi04Ij4NCjxtZXRhIG5hbWU9IkF1dGhvciIgY2"+
        "9udGVudD0ibXVuZ3VzaHVtZSI%2BDQo8bWV0YSBuYW1lPSJDb3B5cmlnaHQiIGNvbnRlbnQ9IsKpIDIwMDcsIE1vbmtleVIuY29t"+
        "Ij4NCjxtZXRhIG5hbWU9Ik9yaWdpbmFsQXV0aG9yIiBjb250ZW50PSJKb25hdGhhbiBCdWNoYW5hbiI%2BDQo8bWV0YSBuYW1lPS"+
        "JPcmlnaW5hbENvcHlyaWdodCIgY29udGVudD0iwqkgMjAwNiwgSm9uYXRoYW4gQnVjaGFuYW4iPg0KPHN0eWxlIHR5cGU9InRleH"+
        "QvY3NzIj4NCmJvZHkgeyBtYXJnaW46MDsgcGFkZGluZzowOyBmb250LXNpemU6MTJweDsgZm9udC1mYW1pbHk6Ikx1Y2lkYSBHcm"+
        "FuZGUiLCJCaXRzdHJlYW0gVmVyYSBTYW5zIixWZXJkYW5hLEFyaWFsLHNhbnMtc2VyaWY7IGNvbG9yOiMzMzM7IHdpZHRoOiA2OD"+
        "ZweDsgbWFyZ2luOiAwIGF1dG87IH0NCi5tb2R1bGUgeyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBtYXJnaW4tYm90dG9tOiA1cH"+
        "g7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH0NCi5tb2R1bGUgaDIsIC5tb2R1bGUgY2FwdGlvbiB7IG1hcmdpbjogMDsgcGFkZG"+
        "luZzogMnB4IDVweCAzcHggNXB4OyBmb250LXNpemU6IDExcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBiYWNrZ3JvdW5kOiAjQ0NDQ0"+
        "NDIHVybCgiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBV0FNUUFBTWpLeXNYSHg5JTJGaDRjJTJGUjBlUGw1Y2JJeU"+
        "5QVjFjM1B6JTJCZnA2ZDdoNGU3dzhPdnQ3Y3ZOemRmWjJlSGo0OXZkM2ZEeThnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"+
        "FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSDVCQUFBQUFBQUxBQUFBQUFCQUJZQUFBVVNJQ1FxQzBJSVQzTUVCY0FNUn"+
        "ZNa2poTUNBRHMlM0QiKSB0b3AgbGVmdCByZXBlYXQteDsgY29sb3I6ICM2NjY2NjY7IGJvcmRlci1ib3R0b206IDA7IH0NCi5mb3"+
        "JtLXJvdyB7IG92ZXJmbG93OiBoaWRkZW47IHBhZGRpbmc6IDhweCA4cHg7IGZvbnQtc2l6ZTogMTFweDsgYm9yZGVyLWJvdHRvbT"+
        "ogMXB4IHNvbGlkICNlZWU7IGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZWU7IH0NCi5mb3JtLXJvdyBpbWcsIC5mb3JtLXJvdy"+
        "BpbnB1dCB7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0NCmlucHV0LmJ0biB7CXBhZGRpbmc6IDBweCAxMHB4IDBweCAxMHB4Oy"+
        "Bjb2xvcjogIzk5OTk5OTsgYmFja2dyb3VuZC1jb2xvcjogV2hpdGU7IGZvbnQtd2VpZ2h0OiBib2xkOyBib3JkZXI6IHNvbGlkID"+
        "FweCAjQ0NDQ0NDOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0NCmlucHV0LmJ0bjpob3ZlciB7CXBhZGRpbmc6IDFweCAxMXB4IDFweC"+
        "AxMXB4OyBjb2xvcjogIzMzMzMzMzsgYm9yZGVyLWNvbG9yOiAjNjY2NjY2OyB9DQphIHsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG"+
        "9yOiAjOTk5OTk5OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGN1cnNvcjogcG9pbnRlcjsgfQ0KYTpob3ZlciB7CWZvbnQtd2VpZ2"+
        "h0OiBib2xkOyBjb2xvcjogIzMzMzMzMzsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9DQo8L3N0eWxlPg0KPC9oZWFkPjxib2R5IG"+
        "9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9Imhpc3RvcnkiIGlkPSJoaXN0b3J5IiBjbGFzcz0iYWxpZ25lZCI%2BDQogIDxkaXYgY2xh"+
        "c3M9Im1vZHVsZSIgaWQ9InJvb3QiPg0KDQogICAgPHRhYmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5n"+
        "PSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJvZHk%2BPHRyPg0KICAgICAgICA8dGQ%2BPGgyPjxzcGFuIGlkPSJzY3JpcH"+
        "ROYW1lIj5zY3JpcHROYW1lPC9zcGFuPiA6OiB2PHNwYW4gaWQ9InZlcnNpb24iPjEuMC4wPC9zcGFuPiA6OiBoaXN0b3J5PC9oMj"+
        "48L3RkPg0KICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI%2BPGEgaHJlZj0iaHR0cDovL3d3dy5tb25rZXlyLmNvbS8iIHRh"+
        "cmdldD0iX3RvcCI%2BTW9ua2V5Ui5jb208L2E%2BPC9oMj48L3RkPg0KICAgICAgPC90cj4NCiAgICA8L3Rib2R5PjwvdGFibGU%"+
        "2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3ciPg0KICAgICAgPGRpdiBhbGlnbj0iY2VudGVyIj4NCiAgICAgICAgPHRleHRhcm"+
        "VhIGlkPSJoaXN0b3J5X3RleHQiIG5hbWU9Imhpc3RvcnlfdGV4dCIgY29scz0iODAiIHJvd3M9IjE1Ij4mbmJzcDs8L3RleHRhcm"+
        "VhPg0KICAgICAgICA8L2Rpdj4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPH"+
        "RhYmxlIGJvcmRlcj0iMCIgY2VsbHBhZGRpbmc9IjAiIGNlbGxzcGFjaW5nPSIwIiB3aWR0aD0iMTAwJSI%2BDQogICAgICA8dGJv"+
        "ZHk%2BPHRyIGhlaWdodD0iMzAiPg0KICAgICAgICA8dGQgd2lkdGg9IjUxNCIgYWxpZ249ImxlZnQiIHZhbGlnbj0ibWlkZGxlIj"+
        "4mbmJzcDs8L3RkPg0KICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRoPSI4NSI%2BPGlucHV0"+
        "IHZhbHVlPSJJbnN0YWxsIiBuYW1lPSJpbnN0YWxsX2J1dHRvbiIgaWQ9Imluc3RhbGxfYnV0dG9uIiBjbGFzcz0iYnRuIiB0eXBl"+
        "PSJidXR0b24iPg0KICAgICAgICA8L3RkPg0KICAgICAgICA8dGQgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiIHdpZHRo"+
        "PSI4NSI%2BPGlucHV0IHZhbHVlPSJDbG9zZSIgbmFtZT0iY2xvc2VfYnV0dG9uIiBpZD0iY2xvc2VfYnV0dG9uIiBjbGFzcz0iYn"+
        "RuIiB0eXBlPSJidXR0b24iPg0KICAgICAgICA8L3RkPg0KICAgICAgPC90cj4NCiAgICA8L3Rib2R5PjwvdGFibGU%2BDQogIDwv"+
        "ZGl2Pg0KPC9mb3JtPg0KPC9ib2R5PjwvaHRtbD4%3D",

    REFRESH_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VO"+
        "IiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbD4NCjxoZWFkPg0KPHRpdGxlPkdvb2dsZU"+
        "1vbmtleVIgVXBkYXRlPC90aXRsZT4NCjxtZXRhIGh0dHAtZXF1aXY9IkNvbnRlbnQtVHlwZSIgY29udGVudD0idGV4dC9odG1sOy"+
        "BjaGFyc2V0PVVURi04Ij4NCjxtZXRhIG5hbWU9IkF1dGhvciIgY29udGVudD0ibXVuZ3VzaHVtZSI%2BDQo8bWV0YSBuYW1lPSJD"+
        "b3B5cmlnaHQiIGNvbnRlbnQ9IsKpIDIwMDcsIE1vbmtleVIuY29tIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BDQpib2R5IH"+
        "sgbWFyZ2luOjA7IHBhZGRpbmc6MDsgZm9udC1zaXplOjEycHg7IGZvbnQtZmFtaWx5OiJMdWNpZGEgR3JhbmRlIiwiQml0c3RyZW"+
        "FtIFZlcmEgU2FucyIsVmVyZGFuYSxBcmlhbCxzYW5zLXNlcmlmOyBjb2xvcjojMzMzOyB3aWR0aDogMzAwcHg7IG1hcmdpbjogMC"+
        "BhdXRvOyB9DQoubW9kdWxlIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgbWFyZ2luLWJvdHRvbTogNXB4OyBiYWNrZ3JvdW5kLW"+
        "NvbG9yOiAjZmZmOyB9DQoubW9kdWxlIGgyIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAycHggNXB4IDNweCA1cHg7IGZvbnQtc2l6ZT"+
        "ogMTFweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGJhY2tncm91bmQ6ICNDQ0NDQ0MgdXJsKCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUj"+
        "BsR09EbGhBUUFXQU1RQUFNakt5c1hIeDklMkZoNGMlMkZSMGVQbDVjYkl5TlBWMWMzUHolMkJmcDZkN2g0ZTd3OE92dDdjdk56ZG"+
        "ZaMmVIajQ5dmQzZkR5OGdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU"+
        "NINUJBQUFBQUFBTEFBQUFBQUJBQllBQUFVU0lDUXFDMElJVDNNRUJjQU1Sdk1ramhNQ0FEcyUzRCIpIHRvcCBsZWZ0IHJlcGVhdC"+
        "14OyBjb2xvcjogIzY2NjY2NjsgYm9yZGVyLWJvdHRvbTogMDsgfQ0KLmZvcm0tcm93IHsgb3ZlcmZsb3c6IGhpZGRlbjsgcGFkZG"+
        "luZzogMTJweCAxMnB4OyBmb250LXNpemU6IDExcHg7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlOyBib3JkZXItcmlnaH"+
        "Q6IDFweCBzb2xpZCAjZWVlOyB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7IHRleHQtYWxpZ246Y2VudGVyOyB9DQppbnB1dC5idG4gew"+
        "lwYWRkaW5nOiAwcHggMTBweCAwcHggMTBweDsgY29sb3I6ICM5OTk5OTk7IGJhY2tncm91bmQtY29sb3I6IFdoaXRlOyBmb250LX"+
        "dlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggI0NDQ0NDQzsgdGV4dC1hbGlnbjogY2VudGVyOyB9DQppbnB1dC5idG46aG"+
        "92ZXIgewlwYWRkaW5nOiAxcHggMTFweCAxcHggMTFweDsgY29sb3I6ICMzMzMzMzM7IGJvcmRlci1jb2xvcjogIzY2NjY2NjsgfQ"+
        "0KYSB7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogIzk5OTk5OTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBjdXJzb3I6IHBvaW"+
        "50ZXI7IH0NCmE6aG92ZXIgewlmb250LXdlaWdodDogYm9sZDsgY29sb3I6ICMzMzMzMzM7IHRleHQtZGVjb3JhdGlvbjogbm9uZT"+
        "sgfQ0KPC9zdHlsZT4NCjwvaGVhZD4NCjxib2R5IG9uTG9hZD0iIj4NCjxmb3JtIG5hbWU9InVwZGF0ZSIgaWQ9InVwZGF0ZSIgY2"+
        "xhc3M9ImFsaWduZWQiPg0KICA8ZGl2IGNsYXNzPSJtb2R1bGUiPg0KICAgIDx0YWJsZSB3aWR0aD0iMTAwJSIgYm9yZGVyPSIwIi"+
        "BjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPg0KDQogICAgICA8dHI%2BDQogICAgICAgIDx0ZD48aDI%2BPHNwYW4gaW"+
        "Q9InNjcmlwdE5hbWUiPnNjcmlwdE5hbWU8L3NwYW4%2BPC9oMj48L3RkPg0KICAgICAgICA8dGQgYWxpZ249InJpZ2h0Ij48aDI%"+
        "2BPGEgaHJlZj0iaHR0cDovL3d3dy5tb25rZXlyLmNvbSIgdGFyZ2V0PSJfdG9wIj5Nb25rZXlSLmNvbTwvYT48L2gyPjwvdGQ%2B"+
        "DQogICAgICA8L3RyPg0KICAgIDwvdGFibGU%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3ciPg0KCTx0YWJsZSB3aWR0aD0iMT"+
        "AwJSIgYm9yZGVyPSIwIiBjZWxscGFkZGluZz0iMCIgY2VsbHNwYWNpbmc9IjAiPg0KCTx0cj48dGQgaGVpZ2h0PSI0MCIgYWxpZ2"+
        "49ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiPlJlZnJlc2ggeW91ciBicm93c2VyIHRvIGNvbnRpbnVlLjwvdGQ%2BPC90cj4NCg0K"+
        "CTx0cj48dGQgaGVpZ2h0PSI0MCIgYWxpZ249ImNlbnRlciIgdmFsaWduPSJtaWRkbGUiPjxpbnB1dCBuYW1lPSJidXR0b24iIHR5"+
        "cGU9ImJ1dHRvbiIgY2xhc3M9ImJ0biIgb25DbGljaz0iamF2YXNjcmlwdDp0b3AubG9jYXRpb24ucmVwbGFjZSh0b3AubG9jYXRp"+
        "b24pIiB2YWx1ZT0iUmVmcmVzaCI%2BPC90ZD48L3RyPg0KCTwvdGFibGU%2BPC9kaXY%2BDQogIDwvZGl2Pg0KPC9mb3JtPg0KPC"+
        "9ib2R5Pg0KPC9odG1sPg%3D%3D"
}

document.getElementsByXPath = function(XPath, contextNode)
{
    var ret=[], i=0;
    var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    while(a.snapshotItem(i))
    {
        ret.push(a.snapshotItem(i++));
    }
    return ret;
};

Function.prototype.bind = function(object)
{
    var __method = this;
    return function()
    {
        __method.apply(object, arguments);
    }
};

document.buildElement = function(type, atArr, inner, action, listen)
{
    var e = document.createElement(type);
    for (var at in atArr) 
    {
        if (atArr.hasOwnProperty(at))
        {
            e.setAttribute(at, atArr[at]);
        }
    }
    if(action && listen)
    {
        e.addEventListener(action, listen, false);
    } 
    if(inner)
    {
        e.innerHTML = inner;
    }
    return e;
};

String.prototype.repeat = function(l)
{
    return new Array(l+1).join(this);
};

String.prototype.retNum = function()
{
    return (isNaN(this) ? 0 : (+this));
}; 

String.prototype.trim = function () 
{
    return this.replace(/^\s+|\s+$/g, '');
};

O.UI.updateCheckRequest();
O.init();
