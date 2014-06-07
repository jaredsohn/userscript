// ==UserScript==

// @author         AaronHarun  

// @version        1.0.13

// @name           IMDb popular torrent search

// @namespace      http://aahacreative.com 

// @description    Adds title search links to the most popular torrent sites.

// @include        http://www.imdb.com/title/*

// @include        http://imdb.com/title/*

// @scriptsource   http://userscripts.org/scripts/show/86439
//Forked from mungushume (www.monkeyr.com) script to fix IMDB errors.

/* StartHistory


v1.0.13 - 7 NOV 2011
 - Updated KickassTorrents

v1.0.12 - 8 OCT 2010
 - Added support for movies with "original titles"


v1.0.11 - 20 Sep 2010
 - Added support for inner imdb pages
 - Added support for message boards


v1.0.10 - 20 Sep 2010

 - Updated: Links now work with IMDB's new design Aaron Harun (http://aahaceative.com)
 - Added support for inner imdb pages
 -- Added support for message boards


v1.0.9 - 02 Dec 2009

 - Updated: With the sad news of mininova's passing I've decided to add several

 new replacements:

  Kickass Torrents (suggested by Erik Lundmark)

  Torrentzap

  monova

  BitSnoop



v1.0.8 - 05 Oct 2008

 - Cleanup: Change of the update url to point at the script meta file

 "http://userscripts.org/scripts/source/86439.meta.js" 

 this will reduce the bandwidth to/from userscripts.org and speed up checks

 - Cleanup: Change of several method names to aid readability

 - Cleanup: "Update bar" code re-written more cleanly



v1.0.7 - 04 Oct 2008

 - Updated torrentz link to include the www part and hence fix it



v1.0.6 - 25 Sep 2008

 - Updated for new DOM layout of IMDb

 - Added the autoupdate script to notify users of updates



v1.0.4 - 10 Feb 2008

 - Added the pirate bay back in after FaeGiN's comments



v1.0.3 - 25 Jan 2008

 - Removed the pirate bay and torrentspy links in favour of torrentz and youtorrent 

 

v1.0.2 - 20 Aug 2007

 - Changed the link to The Pirate Bay to only show videos/movies. 

 - Changed the link to mininova to only show videos/movies. 

 	Thanks Dave Charlesworth! I really should have done a little more research!

 	

 - Outstanding. torrentspy needs the same thing doing but looks like you need to post

 	to the advanced search page to get any results displayed. I will look into this 

 	when i have more time. Works reasonably well as it is though.



v1.0.1 - 19 Aug 2007

 - Changed the link to isohunt to only show videos/movies. Thanks Idiomatic!



EndHistory */ 

// ==/UserScript==



var UIL =

{

    scriptName: "Easy IMDB Torrent Search",

    scriptVersion:"1.0.12",

    scriptId:"86439"

};



Function.prototype.bind = function(object){var __method=this;return function(){__method.apply(object,arguments);}};

String.prototype.repeat = function(l){return new Array(l+1).join(this);};

String.prototype.retNum = function(){return (isNaN(this) ? 0 : (+this));}; 



/**

 * User Interface (UI).

 **/

UIL.UI =

    {   

    _loadBlocker: function()

    {

        if (this.blocker==null)

        {

            var blocker = document.createElement("div");

            this.blocker = blocker;

            blocker.id = "uil_blocker";

            with(blocker.style)

            {

                position = "fixed";

                top = "0px";

                right = "0px";

                bottom = "0px";

                left = "0px";

                backgroundColor = "#000";

                opacity = "0.5";

                zIndex = "10000";

            }

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

            window.location.replace("http://userscripts.org/scripts/source/"+ UIL.scriptId +".user.js");

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

        var refresh = document.createElement("iframe");

        this.refresh = refresh;

        refresh.addEventListener("load", this.refreshDocumentLoadHandler.bind(this), false);

        document.body.appendChild(refresh);

        with(refresh.style)

        {

            position = "fixed";

            top = "20%";

            left = "0px";

            right = "0px";

            border = "none";

            height = "100%";

            width = "100%";

            overflow = "hidden";

            zIndex = "10001";

        }

        refresh.src = UIL.RES.REFRESH_HTML;

    },

    

    refreshDocumentLoadHandler: function()

    {

        this.refresh.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;

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

            this.getURL("http://userscripts.org/scripts/source/"+UIL.scriptId+".meta.js", this.updateTestOnPage.bind(this));

        }

        else

        {

            this.onSiteVersion = GM_getValue('onSiteVersion', 0);

            var delayUpdate = GM_getValue('delayUpdate', false);			

            var skipVersion = GM_getValue('skipVersion', 0);

            if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )

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



        if ( this.versionCompare(UIL.scriptVersion, this.onSiteVersion) )

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

        

        //alert(ver1Arr.join(',') + ' - ' +ver2Arr.join(','));

        

        for(var i=0; i<maxVersionPartTest; i++)

        {

            //alert(ver1Arr[i].retNum() +' '+ ver2Arr[i].retNum());

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

        var div = document.createElement("div");

        div.id = 'gm_update_alert';

        var p = document.createElement("p");

        var sn = document.createElement("strong");

        sn.innerHTML = UIL.scriptName+"&nbsp;";

        var sep = document.createElement("span");

        sep.innerHTML = "&nbsp;&nbsp;-&nbsp;&nbsp;";

        p.appendChild(sn);

        p.appendChild(document.createTextNode(" update available v"+this.onSiteVersion+" (current v"+UIL.scriptVersion+")"));

        p.appendChild(sep.cloneNode(true));

        p.appendChild(this.createLinkControl("Ignore for 24 hours", this.updateDelay.bind(this)));

        p.appendChild(sep.cloneNode(true));

        p.appendChild(this.createLinkControl("Wait for next version", this.updateSkip.bind(this)));

        p.appendChild(sep.cloneNode(true));

        var a = document.createElement("a"); 

        a.target = "_blank";

        a.href = "http://userscripts.org/scripts/show/"+UIL.scriptId;

        a.innerHTML = "Script homepage";

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



        var history = document.createElement("iframe");

        history.addEventListener("load", this.historyDocumentLoadHandler.bind(this), false);

        this.history = history;



        document.body.appendChild(history);



        history.id = "uil_history";

        history.name = "uil_history";

        with(history.style)

        {

            position = "fixed";

            top = "5%";

            left = "0px";

            right = "0px";

            border = "none";

            height = "100%";

            width = "100%";

            overflow = "hidden";

            zIndex = "10001";

        }

        history.src = UIL.RES.HISTORY_HTML;

    },



    historyDocumentLoadHandler: function()

    {

        this.history.contentDocument.getElementById("version").innerHTML=UIL.scriptVersion;

        this.history.contentDocument.getElementById("scriptName").innerHTML=UIL.scriptName;



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



/**

 * Resource section (RES).

 **/

UIL.RES = 

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

};

UIL.UI.updateCheckRequest();





var div = document.evaluate ("//div[@class='infobar']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

var title = document.evaluate ("//h1[@class='header']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


if(!title){ //Sub pages descriptions etc


	title = document.evaluate ("//div[@id='tn15title']//a", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


	div = document.evaluate ("//div[@id='tn15content']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}
if(!title){ //forums


	title = document.evaluate ("//div[@id='tn15']//a", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(title.innerHTML.match(/Board:/)){ //The first /a isn't what we want on the message board list
		title.parentNode.removeChild(title);

		title = document.evaluate ("//div[@id='tn15']//a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}


	div = document.evaluate ("//div[@id='tn15']", document, null,

XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

}


if(div && title)

{

    title = title.cloneNode(true);

    var span = document.evaluate (".//span", title, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if(span)

    {

        title.removeChild(span);

    }

    var txt = title.innerHTML;

    txt = txt.replace(/\<br\>[\s\S]*/g, ""); //remove original title
    txt = txt.replace(/^\s+|\s+$/g, ''); //trim the title

    txt = txt.replace(/\s/g, "+"); //replace spaces with +'s

    txt = txt.replace(/[\?#]!\"/g, ""); //remove bad chars



    var tab = div.insertBefore(document.createElement("table"), div.firstChild);

    tab.id = "gm_links";

    _addStyle("@namespace url(http://www.w3.org/1999/xhtml); #gm_links td { width:130px; padding:2px } #gm_links img { margin:0 3px 0 0 } #gm_links a { vertical-align:top; font-weight:bold };");

    var tr = tab.appendChild(document.createElement("tr"));



    var img

    img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2Fl6fbRydap1dqx1d6x1d6x1dqxzdaxzdaXd3uP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FMzvoAAOYAAOYAAeYAAOYAAOYAAOYAAOkAANWpqsn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FNz%2FoAB%2BsACOwAC%2BwAC%2BwAC%2BwAC%2BwACu0AA%2BalqNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoABu0EDtydoNrV1%2F%2FNz%2FvNz%2FvLzfvw8P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoABu4GD9jHyNX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoABu4FD9nFxdf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoABu4FD9jFxcz%2F%2F%2Ff%2F%2FvP%2F%2FvT%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoACO4FD99GSqBXW6JSVqJYXJ3X19z%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoACesAC%2BwAAu0AAOsAAO4EBtTExdT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FNz%2FoAB%2BoACesAC%2BsED%2BsFD%2BwAC%2B4VHuDX2Ob%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FN0PoAB%2BoABu0FD9unqtvf4f%2FW2P3d3v79%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FNz%2FoAB%2BoABu4HEdfMzNL%2F%2F%2F%2F%2F%2F%2Fv%2F%2F%2Fv%2F%2F%2Fr%2F%2F%2F7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FP0foACeoAB%2B4FD91WWp1sb6NpbKNpbKNiZZ69vs7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FR0voACOoACOsACesAAugAAOUAAOYAAOcAAN6hotT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FQ0foABOoABOsABusABewABewABewAA%2BwABeTExub%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fj3%2Be%2Bv%2FG9vO29ve29ve29ve29ve28vO3Dw%2FHo5Of%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    buildCell(tr, "empireonline","http://www.empireonline.com/search/default.asp?search="+txt, img);



    img = "data:image/x-icon;base64,AAABAAIAICAAAAEAIACoEAAAJgAAABAQAAABACAAaAQAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A9%2Fz8B%2Bv5%2BRTn%2BPcZ5%2Fj3Geb49xnv%2BvkR%2Bv39A%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8AapSSwGqUksBqlJLAapSSwGqUksBqlJLAapSSwGqUksBqlJLAcpqYtYytq5O90M9S9%2Fn5B%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDo%2BPgZp%2BjmZ23a1q9F0cveNMzG9S7Lxf8uy8X%2FLsvF%2FTnNyO5S087QieDdjNv19Cn%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwA8c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf1UhILdw9TTSvz8%2FAD%2F%2F%2F8An%2BbjcTLMxvguy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FMszG%2BIvh3or1%2B%2FsH%2F%2F%2F%2FADxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf8%2FdXL4us3NV%2F%2F%2F%2FwCE4NyULsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2F3fd2aP6%2Ff0DPHNx%2Fzxzcf88c3H%2FPHNx%2Fz91c%2FhZh4bXVISC3VSEgt1Ie3ntPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf9Je3rq6u%2FvGYTg3JQuy8X%2FLsvF%2Fy7Lxf83zcfyYNfSvYbg3ZKY5eJ8huDdklrV0ccuy8X9LsvF%2Fy7Lxf8uy8X%2FLsvF%2FbHr6F48c3H%2FPHNx%2Fzxzcf88c3H%2FUIKA4vb4%2BAn3%2BfkG9%2Fn5BvD09A%2BvxsRkQnd19Txzcf88c3H%2FPHNx%2Fzxzcf%2BrwsJrhODclC7Lxf1E0Mvioufkbur5%2BBj8%2Ff0A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2Bv39A5%2Fm43Iuy8X%2FLsvF%2Fy7Lxf8uy8X%2FW9XRxDxzcf88c3H%2FPHNx%2Fzxzcf9QgoDi9%2Fn5Bv%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwCGqKebPHNx%2Fzxzcf88c3H%2FPHNx%2F4SnppyF4NySft7am%2FD6%2Bg%2F%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A7fn5Ey7Lxf8uy8X%2FLsvF%2Fy7Lxf8xy8X4PHNx%2Fzxzcf88c3H%2FPHNx%2F1CCgOL3%2BfkG%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAJ%2B6uXw8c3H%2FPHNx%2Fzxzcf88c3H%2FgKOipPX7%2Bwn6%2Ff0B%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPn8%2FAWW5OF9LsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf88c3H%2FPHNx%2Fzxzcf88c3H%2FUIKA4vf5%2BQb%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD5%2BvoDbZeVujxzcf88c3H%2FPHNx%2Fzxzcf%2BXtLOF%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A6Pj4Gb7u7EyQ49%2BGUtPO0i7Lxf0uy8X%2FLsvF%2Fy7Lxf8uy8X%2FOc3I8Dxzcf88c3H%2FPHNx%2Fzxzcf9JfHrquczMWbzOzlS8zs5UrsXEZ2yWlL07cnD9PHNx%2Fzxzcf88c3H%2FQHZ0%2BNTg4DP%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDl9%2FccluThfVLTztAxy8X4LsrF%2FS7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf9v2tasPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fztzcf2fubh7%2FPz8AP%2F%2F%2FwD8%2Ff0Ao%2BflbTrOyO4uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FOc3I8NXz8jE8c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fz91dPhxmZe4yNfWRfz8%2FAD%2F%2F%2F8A%2F%2F%2F%2FAKDn5HAuy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2F0jRzNvM8fA8%2F%2F%2F%2FADxzcf88c3H%2FPHNx%2Fzxzcf88c3H9P3Vz%2Bj91c%2Fo9dHH8PHNx%2Fzxzcf88c3H%2FP3Vz%2BJazsob5%2BvoD%2F%2F%2F%2FAP%2F%2F%2FwDr%2BfkVPM7J6y7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uysX9McrE%2BFjV0Mml6OVr8Pr6D%2F%2F%2F%2FwD%2F%2F%2F8APHNx%2Fzxzcf88c3H%2FPHNx%2F06AfuXg6egl5ezsH9zl5SuUsrCIPHNw%2FTxzcf88c3H%2FPHNx%2FZazsof8%2FPwA%2F%2F%2F%2FALfs6lUuy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2FzHLxfpY1dDJi%2BHejLrt61Dn%2BPcZ%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwA8c3H%2FPHNx%2Fzxzcf88c3H%2FUIKA4vf5%2BQb%2F%2F%2F8A%2F%2F%2F%2FAPr7%2BwFfjIrOPHNx%2Fzxzcf88c3H%2FQnd19uvw8BX%2F%2F%2F8AmuXieC7Lxf8uy8X%2FLsvF%2Fy7Lxf8%2Fz8nl0PLxNfr9%2FQP%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FADxzcf88c3H%2FPHNx%2Fzxzcf9QgoDi9%2Fn5Bv%2F%2F%2FwD%2F%2F%2F8A%2FPz8AGyWlL08c3H%2FPHNx%2Fzxzcf88c3H%2FwtPSTf%2F%2F%2FwCd5uN1LsvF%2Fy7Lxf8uy8X%2FLsvF%2F3nc2aH%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2Bfz8A5nl4nnb9fQpPHNx%2Fzxzcf88c3H%2FPHNx%2F1CCgOL2%2BPgJ9%2Fn5Bvb4%2BAnI19ZEQHZ0%2BDxzcf88c3H%2FPHNx%2Fzxzcf%2B5zMxX%2F%2F%2F%2FAMLv7Uguy8X9LsvF%2Fy7Lxf8uy8X%2FRNDL4t729SX8%2Ff0A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A9fv7B77u7ExY1NDILsvF%2Fczx8Do8c3H%2FPHNx%2Fzxzcf88c3H%2FP3Vz%2BFmHhtdUhILdUYKA4D10cvo8c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2F9bh4TL%2F%2F%2F8A9Pv7Ck3Szdcuy8X%2FLsvF%2Fy7Lxf8uy8X%2FOc3I7nbc2KWW5OF9leThfnfd2aNI0czdLsrF%2FS7Lxf8uy8X%2FzPHwOjxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf9pk5LB%2Bvv7Af%2F%2F%2FwD%2F%2F%2F8AzPHwOjfNx%2FAuy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf%2FM8fA6PHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H%2FPHNx%2Fzxzcf88c3H9ZpGQxuft7R3%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD8%2Ff0AzPHwOk7TzdUuy8X9LsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FLsvF%2Fy7Lxf8uy8X%2FL8vF%2BtHz8TVqlJLAapSSwGqUksBqlJLAapSSwGqUksBqlJLAapSSwGqUksB2nJuykK%2BtkMfW1Uf6%2B%2FsD%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A9fv7B6%2Fq6GBl2NS6QM%2FJ5y%2FKxfouy8X%2FLsvF%2FzTMxvVF0cveaNnVtJ3m43Xe9vUl%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPz9%2FQDy%2B%2FoM6Pj4GOf49xnn%2BPcZ6%2Fn5FPf8%2FAf%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwAf4A8AB4ADAAMAAQABAQEHwR%2FgB8A%2F4Afg%2F%2BAHwP8AB4H4AAAD4AEAB8ADAAeADwcDgH8Hg4P%2FB4OD%2FweDg%2FkAA4DBAAPAAQAH4AEAH%2FgH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FKAAAABAAAAAgAAAAAQAgAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPf8%2FAfy%2B%2FoM9Pv7Cvz9%2FQD%2F%2F%2F8A%2F%2F%2F%2FAFKDgd5Sg4HeUoOB3lKDgd5ThIHdb5iWuMPU00z8%2FPwAreroYVvW0cU2zcfzLsvF%2Fy7LxfpN0szXpejla%2Fr9%2FQE8c3H%2FPHNx%2F0N4dvNIennuP3Vz%2Bjxzcf88c3H9us3MV1jV0Mkuy8X%2FPM3I6l3W0sJO083WLcrF%2FS7Lxf%2BT4%2BB%2FPHNx%2Fzxzcf%2Bjvbx1%2Bvv7A%2Bft7R1PgH%2FjPHNx%2F2mTksFt2tWvtezqV%2Ff8%2FAb%2F%2F%2F8A%2FP39AHjc2aEuy8X%2FOczI7jxzcf88c3H%2Fpb69dP%2F%2F%2FwD8%2FPwAYI2LzTxzcf9jj43J%2Bv39Af%2F%2F%2FwD%2F%2F%2F8A6Pj4GbXs6ldI0czeLsvF%2Fy%2FLxfo8c3H%2FPHNx%2F16Mis97oJ%2BoY46NyTxzcf08c3H9rMPDavz9%2FQCx6%2BhdT9PO0y7Lxf0uy8X%2FLsvF%2Fy7Lxf9q2dWzPHNx%2Fzxzcf88c3H9O3Nx%2FTxzcf89dHL6scfGYvz8%2FACx6%2BhcLsvF%2Fy7Lxf8uy8X%2FLsrE%2FTjMyPCD39yU8Pr6Dzxzcf88c3H%2Fnbm4fe7y8hKLq6qWPHNx%2F1SEgt75%2BvoFatnVsy7Lxf8xy8X4leThftDy8Tf3%2FPwG%2F%2F%2F%2FAP%2F%2F%2FwA8c3H%2FPHNx%2F6O9vHX6%2B%2FsDnLe2fjxzcf88c3H%2F3efmKW3a1q4uy8X%2FRtHL4PX7%2Bwn%2F%2F%2F8A%2Bv39AcLv7Uab5eN1PHNx%2Fzxzcf9DeHbzRnp47jxzcP08c3H%2FRnp47vP29gzD7%2B1HLsvE%2Bi7Lxf9D0MnjYNfSvUbRy94uy8X9fN7am1KDgd5Sg4HeUoOB3lKDgd5VhYPccpqYtdHe3Tj%2F%2F%2F8A%2FP39AMTv7kVb1tHFMszG%2BC7Lxf82zcfzWNXPybfs6lX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2FP39APX7%2Bwny%2B%2FoM9%2Fz8B%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2FwAA%2F%2F8AAP%2F%2FAAADgwAAAQEAADh4AAA4%2BAAAAcAAAAOBAAAxHwAAOR8AAAGAAAADwQAA%2F%2F8AAP%2F%2FAAD%2F%2FwAA";

    buildCell(tr, "BitSnoop","http://bitsnoop.com/search/m/"+txt+"/p/d/1/", img);

    

    img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD18%2FEOnYJppXVUNPdxUDD%2FcE4u%2F25MK%2F9sSin%2Fa0gn%2F2lGJf9nRCP%2FZkIh%2F2RAHv9iPhz%2FZUMg95uBZ6X18%2FEOnoVsoYdvWf%2BNemj%2FiHVi%2F4RvXP%2BBbFr%2Fe2RQ%2F3ZfSv9xWkT%2FbVZB%2F2hPOP9kSjL%2FX0Qs%2F1o%2FJv9ZOx%2F%2FnIJpo3FNKfWNb1H%2FqZJ7%2F6mSfP9%2BXT3%2Fdlc6%2F6iRe%2F%2BpkXv%2FqZN8%2F25NLv92VDP%2FqZJ8%2F6mSe%2F%2Beg2r%2FXj4f%2F2VDIfd2UzL%2Fs56K%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FmoBn%2F4VnSv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BQc1j%2Fg2VI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4trS%2F2FBI%2F9iPh3%2Ffl4%2F%2F6SMdf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F5%2BGbf%2BdhGv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fvaya%2F3tYN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BLb0%2F9kRSf%2FZEEf%2F4JjRv%2Bcgmn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Bmjnf%2Fu6mX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Bzn4v90Tyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fk3db%2FZ0gr%2F2ZDIv%2BEZkn%2Fl3xi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FrpmE%2F9vSyP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fi2xN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F5%2BHa%2F2pLLv9oRST%2Fh2lM%2F5N3Xf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F7qnlf%2F5%2BPb%2F%2F%2F%2F%2F%2F%2Bjh2%2F%2F%2F%2F%2F7%2F%2F%2F%2F%2F%2F6%2BZhf%2F%2B%2Fv7%2F%2F%2F%2F%2F%2F%2Bvm4P9sTTD%2FaUcm%2F4lsT%2F%2BQdFn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fd1Mv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FFtqf%2F6%2Bbh%2F%2F%2F%2F%2F%2F%2FOwbT%2F%2Ffz8%2F%2F%2F%2F%2F%2F%2Fv6%2Bb%2Fbk8y%2F2tJKf%2BMb1P%2FkXZc%2F%2Fz7%2Bv%2F%2F%2F%2F%2F%2F%2FPz7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FqpR%2B%2F7%2Bunf%2F%2F%2F%2F%2F%2F7urm%2F%2Fv6%2Bf%2F%2F%2F%2F%2F%2F8%2FDt%2F3BRM%2F9tSyv%2FjnJW%2F5mAZ%2F%2F08e7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F5B0Wf%2BTeF3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F7%2F%2F%2F%2F%2F%2F%2Fj29P9yUjT%2Fb04u%2F5F1Wf%2BjjXf%2F6uXf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Ff18%2F%2BFaU3%2FhWlO%2F%2FDs6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8%2B%2Fr%2FdVU3%2F3FQMP%2BTeF3%2FrpuI%2F%2BLa0v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FYzsT%2FmIFs%2F56Mev%2FBsKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv79%2F3laPP9zUjL%2FlHhc87qqmv%2BqlH7%2Fv66d%2F7%2Bunf%2B%2Frp3%2FnoRr%2F6ubi%2F%2B0qZ7%2FjW9R%2F7%2Bunv%2B%2Frp3%2Fv66d%2F8Cvnv95WTv%2FeFc49aOLc5zDtab%2Fyb2x%2F8S3qv%2B%2FsaT%2Fuaqc%2F7OjlP%2FBt67%2FvbOp%2F6eWhv%2Bei3n%2FmYVy%2F5R%2FbP%2BQemb%2Fg2lQ%2F6CHb5%2F39vQKo4tzm45xU%2FCNcFP6i25Q%2BolrTvqHaUv6hWZI%2BoJkRfqBYkL6f19B%2Bn1dPvp7Wjv6fFs88KGIcJz49vQKgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA%3D%3D";

    buildCell(tr, "monova","http://search.monova.org/search.php?term="+txt+"&cat=1&sort=5&verified=", img);



    img = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAECSURBVHjaYpwxYwYDSQCo4f%2F%2F%2F7MW7Hr05PV%2FQgComAWo5%2FHTN0Cyd%2FImiBHHTt20MlNHNrSpKoKPjwvCBmmQlRZJjXeFS2uY5AK52pqyWF3EhCkE1I%2FHCyyYQkAX%2FvkjdvseAycHiPv9B4ghI4VbA9C57z6yv%2FvI8P07iHvpKoOQIENaPG4Nnz59ExN%2BDPHDk2cMJ84y5Ifh9QMyWLKKITaMgZOTOA3bdjPoaTOoKuENJaB7IAyg04H%2B9nIlIlg9XAxFhUXWbGYI9iUiWIFBNKEjaeJMkEuAAQq0BAKAvne0wRFKwNAEOh2iCA6EBXEHKzBMIIbhjOmZM2cSn7oBAgwAzApyBonlsY8AAAAASUVORK5CYII%3D";

    buildCell(tr, "Torrentzap","http://www.torrentzap.com/clean-search-results1/"+txt+"/seeds/4", img);



    tr = tr.parentNode.insertBefore(document.createElement("tr"), tr);



    img = "data:application/octet-stream;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D";

    buildCell(tr, "The Pirate Bay","http://thepiratebay.org/search/"+txt+"/0/7/200", img);



    //	var img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5Xq90Oe%2BvdDnor3Q5YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa90Od2vdDn%2Fr3Q5%2F690OeEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDl%2Fr3Q5%2Bq90OfSvdDmaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFr3Q5pq90OUOvdDkMAAAABAAAAAAAAAAAAAAAAAAAAACvdDk1r3Q5cq90OSgAAAAAAAAAAK90ORqvdDlSr3Q5qa90OZcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5yq90Of%2BvdDmnAAAAAK90OYavdDn0r3Q5%2F690Of%2BvdDnOr3Q5GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90ObGvdDn%2Fr3Q5uq90Oa6vdDn%2Fr3Q59K90OeyvdDn%2Fr3Q5%2F690OacAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAivdDkhr3Q5Rq90OaKvdDn%2Fr3Q55K90OSOvdDkRr3Q53K90Of%2BvdDnyr3Q5HwAAAAAAAAAAAAAAAAAAAACvdDngr3Q5rK90OTSvdDnfr3Q5%2F690OasAAAAAr3Q5I690Oe2vdDn%2Fr3Q5%2FK90OSwAAAAAAAAAAAAAAAAAAAAAr3Q5f690OXivdDmhr3Q5%2F690Of%2BvdDnqr3Q5s690OeavdDn%2Fr3Q5%2F690Od2vdDkMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAr3Q5KK90OfWvdDn%2Fr3Q5%2F690Of%2BvdDn%2Fr3Q5%2F690Of%2BvdDllAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDlLr3Q54K90Of%2BvdDn%2Fr3Q5%2F690Oe6vdDnor3Q5QgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK90OQ%2BvdDlQr3Q5cK90OVyvdDkYr3Q5Ma90ObCvdDkur3Q5EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDm3r3Q5%2F690Oa8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvdDkar3Q59K90OfavdDm5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq90OZ6vdDnzr3Q5VwAAAAAAAAAA%2F8MAAP%2FDAAD%2FwwAA%2F8cAAMYfAADEDwAAwA8AAMAHAACBBwAAgAcAAOAPAADwDwAA%2BAMAAP%2FjAAD%2FwwAA%2F%2BMAAA%3D%3D";

    //	buildCell(tr, "torrentspy","http://www.torrentspy.com/search?query="+txt, img);



    //	var img = "data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAeP%2FPAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2F%2FAHj%2F%2FwB4%2F%2F8AeP%2FVAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FwB6%2F%2F8Aev%2F%2FAHr%2F%2FAF9%2F%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8BZc%2F%2FAV6%2F%2FwF17%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8hjf%2F%2FQZ7%2F%2FyGN%2F%2F8Bff%2F%2FAX3%2F%2FwF9%2F%2F8BgP%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FACBA%2FwAAAP8BYL%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FgMD%2F%2F%2F%2F%2F%2F%2F%2BAwP%2F%2FAYD%2F%2FwGA%2F%2F8BgP%2F%2FAYP%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2FwAhQP8AAAD%2FAWK%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2F4DB%2F%2F%2F%2F%2F%2F%2F%2FgMH%2F%2FwGD%2F%2F8Bg%2F%2F%2FAYP%2F%2FwKH%2F%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F8BIkD%2FAAAA%2FwFlv%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F%2BBw%2F%2F%2F%2F%2F%2F%2F%2F4HD%2F%2F8Ch%2F%2F%2FAof%2F%2FwKH%2F%2F8Ci%2F%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FASNA%2FwAAAP8BaL%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FgcX%2F%2F%2F%2F%2F%2F%2F%2BBxf%2F%2FAov%2F%2FwKL%2F%2F8Ci%2F%2F%2FA4%2F%2F%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2FwASIP8AAAD%2FAlmf%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2F4HH%2F%2F%2F%2F%2F%2F%2F%2Fgcf%2F%2FwOP%2F%2F8Dj%2F%2F%2FA4%2F%2F%2FwOT%2F%2F8Dk%2F%2F%2FA5P%2F%2FwJ3z%2F8AAAD%2FAAAA%2FwEuUP8Dk%2F%2F%2FA5P%2F%2FwOT%2F%2F%2BByf%2F%2F%2F%2F%2F%2F%2F4HJ%2F%2F8Dk%2F%2F%2FA5P%2F%2FwOT%2F%2F8El%2F%2F%2FBJf%2F%2FwSX%2F%2F8CS3%2F%2FAAAA%2FwAAAP8ACRD%2FBJf%2F%2FwSX%2F%2F8El%2F%2F%2Fgsv%2F%2F%2F%2F%2F%2F%2F%2BCy%2F%2F%2FBJf%2F%2FwSX%2F%2F8El%2F%2F%2FBJv%2F%2FwSb%2F%2F8Em%2F%2F%2FAR0w%2FwAAAP8AChD%2FAAAA%2FwNqr%2F8Em%2F%2F%2FBJv%2F%2F4LN%2F%2F%2F%2F%2F%2F%2F%2Fgs3%2F%2FwSb%2F%2F8Em%2F%2F%2FBJv%2F%2FwWf%2F%2F8Fn%2F%2F%2FBIvf%2FwAAAP8AChD%2FAk9%2F%2FwAAAP8CRnD%2FBZ%2F%2F%2F0S3%2F%2F%2Bh2%2F%2F%2F%2F%2F%2F%2F%2F6Hb%2F%2F9Et%2F%2F%2FFaX%2F%2FwWf%2F%2F8Fov%2F%2FBaL%2F%2FwNbj%2F8AAAD%2FAjNQ%2FwR5v%2F8AAAD%2FARQg%2FwWi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F0S5%2F%2F8Fov%2F%2FBaX%2F%2FwWl%2F%2F8DZ5%2F%2FAlJ%2F%2FwR8v%2F8Fpf%2F%2FAlJ%2F%2FwJSf%2F8Fpf%2F%2FgtL%2F%2F4LS%2F%2F%2BC0v%2F%2FgtL%2F%2F4LS%2F%2F8ksP%2F%2FBaX%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8GqP%2F%2FBqj%2F%2Fwao%2F%2F8Gqv%2FhBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2F%2FBqr%2F%2Fwaq%2F%2F8Gqv%2FnAABpYwAAdC4AAGF0AABsYQAAL2sAAD4KAAAJCQAAbnQAAGVyAAA8LwAAdGUAAHI%2BAAAJCQAAZGkAAD4KAAA8Lw%3D%3D";

    //	buildCell(tr, "youtorrent","http://www.youtorrent.com/tag/?q="+txt, img)



    img = "data:application/octet-stream;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAMgAAADIAAAAAAAAAAAAAAD%2F%2F%2F%2F%2F%2F%2F%2Ft8v%2FY4%2F%2Ft8v%2F5%2B%2F%2Fx9f%2F09%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fo7ftJevYqZ%2F8mZP9qcJeij3zIvbLx7%2Bz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fy7%2Byij3w3WbsRVf8RVf9aWHR3Wj93Wj%2BGbVXMwrf%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7OmPeGJ3Wj83VrURVf8RVf9bWHN3Wj93Wj93Wj94W0HFuK3%2B%2Fv3%2F%2F%2F%2F%2F%2F%2F%2F8%2FPueind3Wj93Wj9LV48RVf8RVf9ZWHV3Wj93Wj93Wj93Wj97X0Xb1M3%2F%2F%2F%2F%2F%2F%2F%2Fa0st6XUN3Wj93Wj9ZWHURVf4RVf9RV4V3Wj93Wj93Wj93Wj93Wj%2BciHT8%2FPz%2B%2Fv6tnIx3Wj93Wj93Wj9qWVUWVfURVf87Vq53Wj93Wj93Wj93Wj93Wj99YUfr5%2BP%2F%2F%2F%2BLclt3Wj93Wj93Wj92WT8mVdURVf8lVdd3Wj93Wj93Wj93Wj93Wj93Wj%2FPxbv%2F%2F%2F%2BCaE93Wj93Wj93Wj93Wj9EV50RVf8RVf1wWUp3Wj93Wj93Wj93Wj93Wj%2FEuKz%2F%2F%2F%2BIb1h3Wj93Wj91WUFdWG5UWH4RVf4RVf9RV4R3Wj93Wj93Wj93Wj93Wj%2FOxLv%2F%2F%2F%2BpmId3Wj9kWGIiVd0SVfwTVfoRVf4RVf8oVdJfWGpzWUV3Wj93Wj98YEbp5OD%2F%2F%2F%2FTysF4XEEtVsgzVr5jWGNlWF5hWGZVWH07Vq8hVeAkVdlLV5ByWUaWf2v7%2Bvn%2F%2F%2F%2F7%2BvmVf2o7Vq1aWHR3Wj93Wj93Wj93Wj93Wj92WUBiWGQ8Vq0pVdCosM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq5eF%2FcGxIV5VfWGslVdhuWU53Wj93Wj93Wj93Wj93W0CvpqSQr%2F6euv%2F5%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fo49%2BOfnVcWXRaWHV1WUF3Wj93Wj93Wj9%2FZEu9r6L8%2FPv%2B%2Fv%2Fm7f%2FO3P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F6%2BfjOxLulkoCGbVWCZ0%2BSe2a4qZvp5OD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    buildCell(tr, "torrentz","http://www.torrentz.com/search?q="+txt, img)



    img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD39vX28e%2F5%2BfUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkim2EWjTazb0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACkimdmMwDBq5oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQv6qymH4AAACulH1mMwCpi3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08O16UCaAXDPs5N%2FMu6xmMwCgfl8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD7%2BviadFNzRRPl3tjn39dyRBaJYz4AAAAAAAAAAAC7qJaQbUvfzsYAAAAAAAAAAAAAAAC1m4ZmMwDGs57p4tqFXjh9VCXo4dgAAAAAAADZyrx1SByMbEUAAAAAAAAAAAAAAADJvKtsPQujh2n7%2B%2FqUd1dmMwB1Rxl3SRx3SRx1RxlmNAGKZj%2Fl2NMAAAAAAAAAAADk1c5wQBGNZ0H18O2niGNmMwBtPA52SRx2SRx2SRxtPQxoNQPl2tQAAAAAAAAAAADz8eyHXz9xQxXt6OTMvrNpNwW1mYQAAAAAAAAAAACxloNmMwC6p40AAAAAAAAAAAAAAACjgGJsOgrTx7Xs49uFXjeXdlXv6uMAAAAAAADXzb9sPAujgWYAAAAAAAAAAAAAAAC%2FrZlmNAG4n4gAAAAAAAAAAAAAAAAAAAAAAADn39d3TCGDWS7PwbQAAAAAAAAAAADx7ei6pI7Yyr0AAAAAAAAAAAAAAAAAAAAAAAAAAACJZD9rOgrIs54AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADGsZxmMwCkjnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSwLdtPQqDWjL08vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy7uju6eQAAADx%2FwAA8f8AAPH%2FAACR%2FwAAAf8AAAHHAACAxwAAgAMAAIADAACA4wAAwGMAAMfhAADH8QAA%2F%2FEAAP%2FwAAD%2F%2BQAA";

    buildCell(tr, "isohunt","http://isohunt.com/torrents/"+txt+"?ihs1=2&iho1=d&iht=1", img)



    img = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy%2BDVzhf81c4X%2FNXOF%2FydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG%2Fzh2iP84doj%2FOHaI%2Fzh2iP84doj%2FM2t7%2FB9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM%2Fzx5jP88eYz%2FWIyc%2F3OfrP9BfI%2F%2FPHmM%2Fzx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ%2FkB9j%2F9AfY%2F%2FXZGg%2F%2Fb5%2Bv%2F%2F%2F%2F%2F%2F4uvu%2F2iZp%2F9AfY%2F%2FQH2P%2FzNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT%2FRYGU%2F73T2f%2F%2F%2F%2F%2F%2F%2Ff7%2B%2F%2FL29%2F%2Fp8PL%2FRYGU%2F0WBlP9FgZT%2FKUxXgAAAAAAAAAAAJ0ZPHUeBk%2F9Khpj%2FSoaY%2F0qGmP%2Fb5%2Br%2F%2F%2F%2F%2F%2F7vR2P9Khpj%2Fbp6t%2F0qGmP9Khpj%2FSoaY%2FzlndOcAAAAAAAAAAC9SXIBPi53%2FT4ud%2F0%2BLnf9Pi53%2F0eHm%2F%2F%2F%2F%2F%2F%2FF2d%2F%2FT4ud%2F0%2BLnf9Pi53%2FT4ud%2F0%2BLnf9Mhpf%2FKEZPEgAAAAA4YGu%2BVJCh%2F1SQof9UkKH%2FVJCh%2F8HX3f%2F%2F%2F%2F%2F%2F6%2FL0%2F1SQof9UkKH%2FVJCh%2F1SQof9UkKH%2FVJCh%2Fy9QWVwAAAAAQGp31lmUpv9ZlKb%2FaZ6u%2F5u%2Fyv%2FW5en%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FC2N%2F%2F3urt%2F3Smtf9ZlKb%2FWZSm%2F1mUpv81WWOIAAAAAENseNRemar%2FXpmq%2F3Wntv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BVvMf%2FXpmq%2F16Zqv9emar%2FOFtlhAAAAABCaHS%2BY52v%2F2Odr%2F9nn7H%2FiLTC%2F4Kxv%2F%2F0%2BPn%2F%2F%2F%2F%2F%2F6zL1f9jna%2F%2FY52v%2F2Odr%2F9jna%2F%2FY52v%2FzdXYVwAAAAAPF5od2ehsv9nobL%2FZ6Gy%2F2ehsv9nobL%2Fxtzi%2F%2F%2F%2F%2F%2F%2Ff6%2B%2F%2FZ6Gy%2F2ehsv9nobL%2FZ6Gy%2F2Wdrv80UVoSAAAAADZTXBJkmqr%2Ba6W2%2F2ultv9rpbb%2Fa6W2%2F2ultv9rpbb%2Fa6W2%2F2ultv9rpbb%2Fa6W2%2F2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG%2Bouf9vqLn%2FXIuZ9GGTovpvqLn%2Fb6i5%2F2%2Bouf9gkqD5Zpqp%2FW%2Bouf9vqLn%2FQWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn%2FdBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA%2Fj8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA%3D%3D";

    buildCell(tr, "Kickass Torrents","http://www.kat.ph/usearch/"+encodeURIComponent(txt.replace('/\+/g',' '))+"/?categories%5B0%5D=movies&field=seeders&sorder=desc", img)



    //  img = "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FANx3RgDdEREA7rmeAOWXbgD44NcA8825AOuphAD68ekA34BQAOJ%2BRgDx0MEA%2FPLxAP%2F99wDmkmsAMzMzMzMzMzMxEREREREREzERERERERETMRERERERERMxonHCoRUkEzGiccKhFSQTMaJxwqEVJBMxonHCsRUkEzGiQXItHyQTMaK08iVCJxMxoosixSL%2BEzGZ7W0eZuETMRERERERERMxEREREREREzERERERERETMzMzMzMzMzMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

    //  buildCell(tr, "mininova","http://www.mininova.org/search/"+txt+"/4/seeds", img)



}



function buildCell(container, text, href, image)

{

    var a = document.createElement("a");

    a.href = href; 

    a.setAttribute("target","_blank");

    var img = document.createElement("img");

    img.src = image;

    var txt = document.createTextNode(text);

    a.appendChild(txt);

    var cell = container.insertCell(0);

    cell.appendChild(img);

    cell.appendChild(a);

}



function _addStyle(css)

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

}