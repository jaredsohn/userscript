// ==UserScript==
// @name          Flickr Functional Suite
// @namespace     http://www.tilford.net/
// @description   Adds some additional functionality to page
// @include       http://*.flickr.com/*
// @include       http://flickr.com/*
//
// ==/UserScript==

/*

This is a Grease Monkey script. It *requires* FireFox and the Grease
Monkey extension to work:

http://www.mozilla.com/firefox/
http://greasemonkey.mozdev.org/

Following the instructions on the above web pages
1. Install FireFox
2. Install GreaseMonkey
3. Install this script

Author: Charles Tilford  http://www.flickr.com/photos/charlestilford/
  (I am not hosting tilford.net yet)

This code is released under the CreativeCommons 'By' license. That is,
you can do anything you want with it, just leave my name as one of the
authors. http://creativecommons.org/licenses/by/2.5/

h2. Summary

Provides an interface to let you assign colors to users you meet - that way, if you find a user's link on a page in the future, it will automatically be highlighted with thes color you previously gave them.

In group pool pages, you can highlight user photos where more than one image is visible from the same user. You can also overlay all comments from a user under the corresponding photos on that page.

h2. Features:

# Configuration
** All features can be toggled on / off
** Access to configuration either through [?] links or main "Organize" menu
** Colors can be customized.
# User coloration
** All '/photos/USERNAME/' links will be altered:
*** Clicking on them brings up a mini-menu
*** You can assign a color to any user, which will highlight the user links
*** Colors will be remembered (only on your computer)
*** It is now possible to assign multiple colors to a user
*** Links to their photos, profile and pool images (if in pool page) shown in menu
# Group pool analysis
** When viewing pool pages, all images on the page are tallied
*** Users posting more than one photo will be noted
*** Images from those users will get a colored background
*** Background colors are unique to each user (but otherwise essentially random)
*** Summary of users posting multiple images shown at top of page
** Comments for all photos on a pool page are pre-fetched
*** For any poster on a pool page, all their comments can be shown for other photos on the same page
** NOTE: these functions are off by default, turn them on in the options page ('Organize' Flickr menu)

!http://static.flickr.com/69/206732191_399d74d02a.jpg!:http://www.flickr.com/photos/charlestilford/206732191/

!http://static.flickr.com/73/219349265_b6b41a139b.jpg!:http://www.flickr.com/photos/charlestilford/219349265/

!http://static.flickr.com/90/219349268_a4dd3fa439.jpg!:http://www.flickr.com/photos/charlestilford/219349268/


Handy Color name reference:
http://www.w3.org/TR/2002/WD-css3-color-20020219/#x11-color

!! Caution !!

Persistent data, such as colors assigned to users, are stored within
the Grease Monkey / FireFox system itself. If you invest a lot of time in
color-coding users, you run the risk of losing all your assignments if
FireFox's prefs.js is over-written. If you would like to back up your
assignments, you should back up that file - on Windows it will be
somewhere like:

C:\Documents and Settings\YourUserName\Application Data\
   Mozilla\Firefox\Profiles\8aabdex06.default\prefs.js

and have entries like:

user_pref("greasemonkey.scriptvals.http://www.tilford.net//Flickr Functional Suite.UserColorcharlestilford", "Lime");

!! About User Identifications

Flickr uses a confusing mixture of identifiers for their customers.

Flickr     Used Here Example
---------- --------- -----------------
NSID:      nsid      51159953@N00
username:  uname     listentoreason
photourl:  purl      charlestilford 
displayid: dispid    Truncated Username...

The NSID is the most useful for getting information, but the least
human friendly. The displayid is not technically an official
identifer, but is encountered when parsing Flickr web pages. It is
used when a user name is too long - the username is truncated
(apparently on a whitespace character) and shown with elipses (...).

# History
* 25 Aug 2006
** John Carney suggests a Plays-Nice-With-Others alteration that lets pop-up functionality work fine with other GM scripts
** Added additional links in user menu, tried to tighten up real estate usage
* 24 Aug 2006
** Bug fix by John Carney (http://schmickr.innercurmudgeon.com/)
* 19 Aug 2006
** Implemented interface to Flickr API
** Use API to fetch comments for all photos on pool page
*** For any pool contributor, show all of their comments on that page
* 15 Aug 2006
** Allow multiple colors to be assigned to one user
* 6 Aug 2006
** User settings added
*** Can toggle basic behaviors on and off
*** Can now customize color list, and assign description to each color
** Altered 'All Pool Photos' to only display when the low-level ID is used as the UID
* 4 August 2006
** Nice interface to set user color
** User colors persistently stored with GM_setValue()
** Multiple posting working well
** The 'All Pool Photos' usually will not work - I need to implement a method to ajax get the low-level user ID

!! Disclaimer !!

Feel free to mine the code for ideas, but be warned that because this
is a Grease Monkey script, I've made no effort at all to make the code
anywhere close to cross-browser compatible - parts of the code will be
specific to FireFox and will not function in other browsers.

Boy it's *nice* to develop JS for *ONLY* FireFox!

*/


var CatFlickrSuite = {
    // Internal data structures
    privateData: new Object(), // Safe (?) storage of metadata for DOM elements
    env:         new Object(), // Global environmental values
    user:        new Object(), // user-defined values
    gmMsg: "",                 // Debugging message buffer
    apikey: "b1c88b6a99ffabbf76ace9eab025996f ",
    objects: { userPhotos: [], }, // Pre-calculated/scanned
    // User configurable parameters. Organized by class (the kind of
    // <input> used to represent them) and parameter name, with a
    // description and default value for each.
    userSet: {
        checkbox: {
            colorUser: ["Colorize user IDs",1],
            colorMult: ["Colorize multiple images from same user in group pools",0],
            sumMult:   ["Summarize multi-posters in group pools",0],
            getCom:    ["Pre-fetch all comments associated with photos on a pool page",0],
        },
        text: {
            comWidth:  ["Maximum characters to show for in-line comments",100],
            comSize:   ["Inline comment font size", '9px'],
        },
        textarea: {
            UserColors: ["Colors and descriptions for tagging other users",
                         "Lime Category 1\nAqua Category 2\nFuchsia Category 3\nSilver Category 4\nYellow Category 5\nRed Category 6\nBlack Category 7\nNone"],
        },
    },
    translate: { },
    // The 'minimum RGB spacing' - prevents grays when using string2color
    colBuf: 64,
    counter: 0,
    ticket: 0,
    ticketStatus: new Object(),
    // Special links that we want to ignore:
    specialLinks: ['1', '< Prev', 'You', 'Organize', 'Upload', 'Popular Tags',
                   'Your Photos', 'Upload Photos', 'All your photos', ],
    re: {
        // Regular Expression Collection
        photoID:    /\/photos\/([^\/]+)\/(\d+)/, // PURL and Photo ID
        userPhotos: /\/photos\/([^\/]+)\/$/,     // Link to user photots
        urlPool1:   /\/([^\/]+)\/pool\//,        // Group pool href
        urlPool2:   /\/in\/pool-([^\/]+)\//,     // Image in pool stream
        elipsed:    /\.\.\.$/,                   // Trailing 3 periods (elipses)
        nsid:       /^\d+\@.{3}$/, // Not sure what the real format is?
    },
    init: function() {
        // The primary initialization function
        //GM_log("Starting: " + new Date());
        this.setEnvironment();
        this.initTransmute();
        this.setSettings();
        this.insertSettings();
        this.armLinks();
        this.findMultiPost();
        this.colorUserPhotos();
        this.getAllComments();
        this.finalize();
        //GM_log("finished");
    },
    setEnvironment: function() {
        // Gather some global information
        var href = this.env.href = document.location.href;
        var mat  = href.match(this.re.urlPool1);
        // See if we are in a group pool-related page:
        if (!mat) mat  = href.match(this.re.urlPool2);
        if (mat) this.env.pool = mat[1];
        this.links = document.getElementsByTagName("a");
    },
    initTransmute: function() {
        // Turn one object type into another This just allows
        // representation of some data structures in a format that is
        // easy for humans to modify, but not the ultimate structure
        // needed by the code.
        this.specLinkHash = new Object();
        for (var i=0; i<this.specialLinks.length;i++) {
            this.specLinkHash[this.specialLinks[i].toLowerCase()] = 1; 
        }
        // Flatten settings hash into 2D array
        var uarr = new Array();
        for (var type in CatFlickrSuite.userSet) {
            // Cycle through each data type
            var info = CatFlickrSuite.userSet[type];
            for (var tag in info) {
                // Cycle through each parameter
                var subarray = [ type, tag ];
                // Add description, defaultValue:
                subarray = subarray.concat( info[tag] );
                uarr.push(subarray);
            }
        }
        this.msg();
        CatFlickrSuite.userSetArr = uarr;
    },
    setSettings: function() {
        // Scan all configurable tagnames and retrieve value from
        // GreaseMonkey internal store, or set to default value.
        var uarr = CatFlickrSuite.userSetArr;
        for (var u=0; u < uarr.length; u++) {
            var tag        = uarr[u][1];
            var def        = uarr[u][3];
            this.user[tag] = GM_getValue(tag, def);
        }
        // Special processing of user colors
        var colArr = this.user.UserColors.split(/[\r\n]+/);
        this.user.colList = new Array();
        this.user.colDesc = new Object();
        for (var c=0;c<colArr.length;c++) {
            var cbits = colArr[c].split(/\s+/);
            var cname = cbits.shift();
            if (!cname || cname == '') continue;
            var cdesc = cbits.join(' ');
            this.user.colList.push(cname);
            this.user.colDesc[ cname.toLowerCase() ] = cdesc;
        }
    },
    msg: function() {
        // Record some debugging information. These messages will
        // appear in the FireFox javascript Console, under 'Messages'
        if (this.gmMsg != "") GM_log("Execution messages:\n"+this.gmMsg);
        this.gmMsg = "";
    },
    err: function (msg, e) {
        // Throw an error, also to the JS concole
        if (e) {
            if (e.description) msg += "\n  DESC: " + e.description;
            msg += "\n  ERR: " + e;
        }
        GM_log(msg);
    },
    finalize: function() {
        // Final code to execute after all parsing is done.
        this.msg();
    },
    armLinks: function() {
        // Search for <a> tags on the page that we want to modify
        for (var i=0; i < this.links.length; i++) {
            var link  = this.links[i];
            this.armUserPhotosLink( link );
        }
    },
    colors4user: function(purl, asArray) {
        // Get your color(s) for a particular PURL
        // asArray = return array, otherwise return hash
        var rv = asArray ? new Array() : new Object();
        var cstr = GM_getValue("UserColor"+purl);
        if (!cstr) return rv;
        // Split string on spaces
        var clist = cstr.split(/\s+/);
        for (c=0; c < clist.length; c++) {
            var cname = clist[c].toLowerCase();
            if (!cname || cname == 'none') continue; // compatibility with old versions
            if (asArray) {
                rv.push(cname);
            } else {
                rv[cname] = clist[c];
            }
        }
        return rv;
    },
    userPhotoClick: function(el, evt) {
        // Establish the new pop-up menu that will be used for "/photos/UserName/" links:
        var dispid    = this.privateHash(el, 'dispid');
        var uname     = this.getTranslation(dispid, 'uname');
        var purl      = this.getTranslation(dispid, 'purl');
        var nsid      = this.getTranslation(dispid, 'nsid');
        var colHash   = this.colors4user( purl );

        // Close box and name:
        var html = "<span class='CancelButt'>[x]</span>&nbsp;<b>"+(uname ? uname : dispid)+
        "</b>&nbsp;<span style='color:green;cursor:help' id='CfsHelpButton'>[?]</span>\n<div id='currentColors'>";
        for (var ucol in colHash) {
            html += this.userColorBlock( colHash[ucol], 'SetColor' );
        }
        html += "</div>\n";

        // Each 'item' is a line in the popup - see makeMenu()
        var items = new Array();
        var links = new Array();
        // This is what the link used to point to:
        links.push( ['Photos', "/photos/"+purl+"/" ] );
        // Add in the user's profile, favorites, sets and tags:
        links.push( [ 'Profile', "/people/"+purl+"/" ] );
        links.push( [ 'Favorites', "/photos/"+purl+"/favorites/"] );
        links.push( [ 'Archive', "/photos/"+purl+"/archives/"] );
        links.push( [ 'Sets', "/photos/"+purl+"/sets/"] );
        links.push( [ 'Tags', "/photos/"+purl+"/tags/"] );
        if (nsid) links.push( ['Mail', "/messages_write.gne?to="+nsid]);
        if (this.env.pool) {
            // We are on a pool-related page
            if (nsid) links.push ( ['All Pool Photos', '/groups/'+this.env.pool+'/pool/'+nsid]);            if (uname && this.objects.comments) {
                // Pre-computed comments are available
                if (this.objects.comments[uname]) {
                    // We found at least one comment for this user
                    var coms = this.objects.comments[uname];
                    var cn   = coms.length;
                    var cmag = {href: "javascript:void(0)", 'class': 'ShowComments', text: ctxt};
                    var ctxt = (this.objects.shownComments[uname] ? 'Hide ' : 'Show ') + cn;
                    ctxt    += " comment"+(cn == 1 ? '' : 's')+ " on this page";
                    cmag.text = ctxt;
                    items.push(cmag);
                } else {
                    // No comments for this user
                    items.push("<i>No comments found</i>");
                }
                // Are the AJAX requests succesfully completed?
                var stat = this.apiStatus('getComments');
                if (stat != "") {
                    // Warn the user that some data was not available.
                    items.push({ tag:'i', style:'color:orange; font-size:xxsmall', text:"&rArr;Data missing: "+stat})
                }
            }
        }
        // John Watson's Scout page - list of the user's interesting photos
        if (uname) links.push
        ( [ 'Scout', "http://flagrantdisregard.com/flickr/scout.php?username="+uname] );
        if (links.length > 0) {
            // The number of links to stuff into one line:
            var linksPerLine = 3;
            for (var l=0;l<links.length; l++) {
                html += "| <a class='simple_butt' href='"+links[l][1]+"'>"+links[l][0]+"</a> ";
                if (!((l+1) % linksPerLine)) html += "|</br>"; 
            }
            if (links.length % linksPerLine) html += "|</br>";
        }
        // Make a menu of colors to list:
        items.push({ tag:'b', text: 'Available Flags:' });

        html += this.makeMenu( items ) + "\n<div style='font-size:smaller' id='availableColors'>";
        for (var c=0; c < this.user.colList.length; c++) {
            var col   = this.user.colList[c];
            if (colHash[col.toLowerCase()]) continue;
            var linkHtml = this.userColorBlock( col, 'SetColor' );
            if (linkHtml != "") html += linkHtml;
        }
        html += "</div>\n";

        // Pop up the window
        var div = this.popUp(el, html, evt);
        // Also associate the PURL with the popup, we'll need it for processing clicks later
        var hb = document.getElementById('CfsHelpButton');
        if (hb) hb.addEventListener('click', function (e) {
            return CatFlickrSuite.settingsClick(this, e);}, false);
        this.privateHash(div, 'purl', purl);
        this.privateHash(div, 'dispid', dispid);
        this.privateHash(div, 'onclose', this.updateUser );
        return true;
    },
    userColorBlock: function(col, cname) {
        // Returns a single div for a category color
        if (/^none$/i.test(col)) return ""; // compatibility with old versions
        // Get the description for this color:
        var text  = this.user.colDesc[col.toLowerCase()];
        // Use the color name itself if no description available:
        if (!text) text = col;
        return this.makeMenu( [ {
            tag: 'div', 'class':cname, text: "<em>"+text+"</em>", colName: col, style: "background-color:"+col
        } ] );
    },
    colorUserPhotos: function (purlReq) {
        if (this.user.colorUser != 1) return;
        // This routine colors <a> tags pointing to
        // "/photos/UserName/", so long as you have assigned a color
        // to that particular user. If purlReq is null, then all links
        // are processed, otherwise only the requested purl will be
        // altered.
        var arr = this.objects.userPhotos;
        for (var i=0; i < arr.length; i++) {
            var el = arr[i];
            var purl   = this.privateHash(el, 'purl');
            // Skip if there is a specific request and this is not it
            if (purlReq && purl != purlReq) continue;
            var colArr  = this.colors4user( purl, true );
            var colNum  = colArr.length;
            var text    = this.privateHash(el, 'innerText');
            var htmlNow = el.innerHTML;
           if (colNum < 1) {
               // Decolorize the link if it was previously colored:
               if (text) el.innerHTML = htmlNow.replace(/\<span[^\>]+span\>/,'');
               continue;
            }
            if (!text) {
                text = el.text
                this.privateHash(el, 'innerText', text);
            }
            // The routine below will color the user's name into one or more colored blocks:
            var tlen   = text.length;
            var step   = tlen / colNum;
            var html   = "";
            for (var c=0; c < colNum; c++) {
                var start = Math.floor(0.5 + c * step);
                var end   = (c == colNum - 1) ? tlen : Math.floor(0.5 + (c+1) * step);
                if (start == end) continue;
                html += "<span style='background-color:"+colArr[c]+"'>"+
                    text.substring(start, end) + "</span>";
            }
            if (/\<span/.test(el.innerHTML)) {
                el.innerHTML = htmlNow.replace(/\<span.+span\>/, html);
            } else {
                el.innerHTML = htmlNow.replace(text, html);
            }
        }
    },
    findMultiPost: function () {
        // Find users that have posted more than one photo on the current page
        var struct = new Object();
        // Scan all 'user photo links' - as found by armUserPhotosLink()
        var arr  = this.objects.userPhotos;
        var pool = this.objects.poolImages = new Object();
        for (var i=0; i < arr.length; i++) {
            var el  = arr[i];
            var par = el.parentNode;
            // Only take note of links inside a PoolList classed object
            if (par.className != 'PoolList') continue;
            var pid = this.imageIdFromNode(par);
            if (pid) pool[pid] = par;
            var purl   = this.privateHash(el, 'purl');
            if (!struct[purl]) {
                // Initiate data stucture for this user
                struct[purl] = {
                    pars: new Array(),
                    name: this.privateHash(el, 'dispid'),
                };
            }
            struct[purl].pars.push( par );
        }
        var pcount = 0; // Total thumbnails on the page
        var ucount = 0; // Total unique users on the page
        var multi = new Array();
        // Now look at each unique user
        for (var purl in struct) {
            ucount++;
            var pars  = struct[purl].pars;
            var count = pars.length;
            pcount   += count;
            if (count > 1) {
                // This user has more than one photo on the page
                // Get the user's automatically generated color...
                var col  = "rgb("+this.color4string( purl )+")";
                // ... and set the background of each thumbnail to that color
                if (this.user.colorMult == 1) {
                    for (var p=0; p < pars.length; p++) {
                        pars[p].style.backgroundColor = col;
                    }
                }
                var name = struct[purl].name;
                // Now make a summary token to put at the top of the
                // page - we will have a link that will be activated
                // as a pop up:
                var link = document.createElement('a');
                link.href = "/photos/" + purl +"/";
                link.innerHTML = name;
                this.armUserPhotosLink(link);
                // ... which will be held in a span that will have the
                // user's auto-color:
                var span = document.createElement('span');
                span.innerHTML = "<b>"+count+":</b>&nbsp;";
                span.appendChild(link);
                span.style.backgroundColor = col;
                // Store in array for later sorting:
                multi.push( [count, span ] );
            }
        }
        // If all images are singletons, return with no action:
        if (multi.length < 1) return;
        // Also exit if the user does not want a summary
        if (this.user.sumMult != 1) return;
        // Sort the users high-to-low:
        multi = multi.sort( function (a,b) { return b[0] - a[0]; } );
        // Slap in the little spans under the Main div:
        var target  = document.getElementById('Main');
        for (var m=0; m < multi.length; m++) {
            target.parentNode.insertBefore(multi[m][1],target);
        }
        // Generate a summary of how many users are unique:
        var div = document.createElement('div');
        var uperc = Math.floor(100 * ucount / pcount);
        div.innerHTML = "<b>"+ucount + "</b> users = <b>"+uperc+"%</b> of maximum";
        target.parentNode.insertBefore(div,target);
    },
    getAllComments: function () {
        if (this.user.getCom != 1) return;
        var pool = this.objects.poolImages;
        this.objects.comments = new Object();
        this.objects.shownComments = new Object();
        for (var pid in pool) {
            var ticket = this.requestImageComments( pid );
        }
   },
    imageIdFromNode: function(el) {
        var focus = el;
        while (!focus.href || !/\/photos\/[^\/]+\/\d+/.test(focus.href)) {
            if (focus.hasChildNodes()) {
                focus = focus.firstChild;
            } else if (focus.nextSibling) {
                focus = focus.nextSibling;
            } else {
                // Failed to find image link
                focus = null; break;
            }
        }
        var id;
        if (focus && focus.href) {
            var hits = focus.href.match( this.re.photoID );
            if (hits) id = hits[2];
        }
        return id;
    },
    requestImageComments: function( id ) {
        if (!id) return;
        var tkey = 'getComments';
        // Set up ticket status queue if needed
        if (!this.ticketStatus[tkey]) this.ticketStatus[tkey] = new Object();
        return this.flickrApi
        ( { method: 'flickr.photos.comments.getList', photo_id: id },
          'ricCB', {ticktype: tkey} );
    },
    ricCB: function(rsp) {
        var hash = this.objects.comments;
        for each (comments in rsp.comments) {
            // for (var cs = 0; cs < rsp.comments.length; cs++) {
            // var comments = rsp.comments[cs];
            var pid  = comments.@photo_id;
            for each (com in comments.comment) {
                var uname  = com.@authorname;
                var nsid   = com.@author;
                this.setTranslation( { uname: uname, nsid: nsid } );
                // var create = new Date( com.@datecreate );
                var ctxt  = com + '';
                // Strip out HTML tags:
                ctxt = ctxt.replace(/(\<|\&lt\;).+?(\>|\&gt\;)/g,'');
                // Collapse all whitespace runs to single spaces:
                ctxt = ctxt.replace(/[\s\n\r\t]+/g, ' ');
                // Store data under both authorname and photo ID (hash
                // will collide only if someone is using a pure
                // integer as a name AND a photo has same integer).
                var info = { txt: ctxt, uname: uname, photo: pid };
                if (!hash[uname]) hash[uname] = new Array();
                if (!hash[pid])   hash[pid]   = new Array();
                hash[uname].push(info);
                hash[pid].push(info);
            }
        }
        this.msg();
        // GM_log(txt);
    },
    armUserPhotosLink: function(el) {
        // Take a link with target '/photos/USERID/' and add pop-up
        // functionality to it. This method also stores the link in an
        // internal structure
        if (!el) return 0;
        var hit  = el.href.match( this.re.userPhotos );
        if (!hit) return 0;
        if (this.privateHash(el, 'armed')) return 0;
        var dispid  = el.text;
        // Skip special links:
        if (dispid == '' || this.specLinkHash[dispid.toLowerCase()] ||
            /photostream$/.test(dispid)) return 0;
        // Ok, this looks like the sort of link we want to modify (and have not already done so)
        this.privateHash(el, 'purl', hit[1]);
        this.privateHash(el, 'dispid', dispid);
        this.privateHash(el, 'armed', true);
        this.setTranslation( { dispid: dispid, purl: hit[1] } );
        // For some reason, I can not get GM to function off of a
        // direct .onclick attribute for the link - I assume this is
        // security sandboxing of some sort. Anyway, event listeners
        // seem to be reliable mechanisms to tie in functionality.
        el.addEventListener('click', function (e) {
            // John Carney suggests better mechanism to over-ride href:
            e.preventDefault();
            return CatFlickrSuite.userPhotoClick(this, e);}, false);
        this.objects.userPhotos.push(el);
        return 1;
    },
    insertSettings: function() {
        // Add a settings menu
        var targ = document.getElementById("candy_nav_menu_organize");
        if (!targ) {
            GM_log("Failed to find 'Organize' menu item for settings");
            return;
        }
        var setL = document.createElement('a');
        setL.href = "javascript:void(0)";
        setL.innerHTML = "Flickr Suite Settings";
        setL.addEventListener('click', function (e) {
            return CatFlickrSuite.settingsClick(this, e);}, false);
        targ.appendChild(setL);
    },
    settingsClick: function (el, evt) {
        var items = new Array();
        items.push("<span class='CancelButt'>[x]</span>&nbsp;"+
                   "<span style='font-weight:bold;color:blue'>"+
                   "Flickr Suite GreaseMonkey Settings</span>");
        for (var type in CatFlickrSuite.userSet) {
            // Cycle through each data type
            var info = CatFlickrSuite.userSet[type];
            if (type == 'checkbox') items.push( "<b>Active Suite Functions:</b>" );
            for (var tag in info) {
                var val  = this.user[tag];
                var desc = info[tag][0];
                var inpt = { tag: 'input', type: type, id: 'CFS'+tag };
                if (type == 'checkbox') {
                    inpt.text = desc;
                    if (val == 1) inpt.checked = 'checked';
                } else if (type == 'text') {
                    inpt.text  = desc;
                    inpt.value = val;
                    inpt.size  = 5;
                } else if (type == 'textarea') {
                    delete inpt.type;
                    inpt.tag  = type;
                    inpt.cols = 30;
                    inpt.rows = 10;
                    inpt.pre  = "<b>"+desc+":</b><br />";
                    inpt.text = val;
                }
                items.push(inpt);
            }
        }
        items.push( "<i>Close menu, then <b>reload page</b> to see changes</i>" );
        items.push({ pre: "Check ", post: " for updates to this suite", text: 'userscripts.org', target:'userscripts', href: 'http://userscripts.org/scripts/show/5016', });
        var html;
        try {
            // Some weirdness during development, so be safe in a try/catch
            html = this.makeMenu( items );
        } catch(e) {
            this.err("Failed to make settings menu for ", e);
            return true;
        }
        // Pop up the window
        var div = this.popUp(el, html, evt);
        this.privateHash(div, 'onclose', this.updateSettings );
        return true;
    },
    updateSettings: function (el) {
        // Note that we have succesfully gotten to the callback
        CatFlickrSuite.privateHash(el, 'onclose', false );
        // Scan all user configurable settings, put values in GreaseMonkey persistant store
        var uarr = CatFlickrSuite.userSetArr;
        for (var u=0; u < uarr.length; u++) {
            var type = uarr[u][0];
            var tag  = uarr[u][1];
            var inpt = document.getElementById('CFS' + tag);
            if (!inpt) continue;
            var val;
            if (type == 'checkbox') {
                // Data in checkboxes
                val = (inpt.checked) ? 1 : 0;
            } else {
                val = inpt.value;
            }
            GM_setValue(tag , val);
        }
        // Reparse all user settings
        CatFlickrSuite.setSettings();
    },
    updateUser: function (el) {
        // Note that we have succesfully gotten to the callback
        CatFlickrSuite.privateHash(el, 'onclose', false );
        var purl    = CatFlickrSuite.privateHash(el, 'purl');
        var setCol = document.getElementById('currentColors');
        if (setCol) {
            // There is a list of colors attributed to this user
            var kids = setCol.childNodes;
            var setCols = new Array();
            for (var k=0; k < kids.length; k++) {
                var col = kids[k].getAttribute('colName');
                if (col) setCols.push(col);
            }
            GM_setValue("UserColor"+purl, setCols.join(" "));
        }
        // Re-color any user links
        CatFlickrSuite.colorUserPhotos( purl );
    },
    color4string: function( txt ) {
        // This method takes a string (for example a user ID) and
        // converts it to a reproducible RGB color. There are probably
        // more elegant ways to do this (I'd like to know of them) -
        // the basic goal is to get good spread of the color spectrum,
        // without being too dark or too light, and avoiding gray
        // scales.
        // Make a string that's just the concatenation of all the decimal ascii codes:
        var hash = "";
        for (var j = 0; j < txt.length; j++) {
            var code = txt.charCodeAt(j);
            hash    += code.toString();
        }
        var col     = new Array();
        var colMv   = 0;
        // Break the long integer into three equal sized pieces:
        var block   = Math.floor(hash.length/3);
        for (var b = 0; b < 3; b++) {
            var si   = b * block;
            var subh = hash.substring( si, si + block - 1 );
            // Turn the sub-hash into 0-255 (modulus 256)
            var val = (parseInt(subh) * 7353) % 256;
            for (var c = 0; c < b; c++) {
                // make sure this color value is far enough from the prior ones
                var pval = col[c];
                if (val > pval - this.colBuf && val < pval + this.colBuf) {
                    // This color index is too close to another
                    if (colMv == 0) colMv = (val < pval) ? -1 : 1;
                    if (colMv > 0) {
                        val = pval + this.colBuf;
                        if (val > 255) val -= 256;
                    } else {
                        val = pval - this.colBuf;
                        if (val < 0) val += 256; 
                    }
                }
            }
            col.push(val);
        }
        // Now finally rotate the three colors
        var rot = parseInt(hash) %3;
        for (var r = 0; r < rot; r++) {
            col.push( col.shift() );
        }
        return col;
    },
    popUp: function (el, html, evt) {
        // Popup a mini menu on a mouse click
        var div = document.getElementById('CatFlickrSuitePopUp');
        if (!div) {
            // Create the object once, then keep it
            div = document.createElement('div');
            div.id = 'CatFlickrSuitePopUp';
            div.className = 'ToolTip';
            div.style.zIndex = '9999';
            document.body.appendChild(div);
            // Using an event listener to monitor activity on our popup
            div.addEventListener('click', function (e) {return CatFlickrSuite.popClick(e);}, false);
        } else {
            // We are recycling the same object as the popup (so only
            // one popup allowed at a time). Registration of user
            // changes in the popup occurs when the user closes the
            // window - make sure that if the window was not
            // explicitly closed (that is, it is open in another
            // location) that we still save the user settings:
            var cb = this.privateHash(div, 'onclose');
            if (cb) cb( div );
        }
        // Position div under click (-15 offset attempts to get close box under mouse)
        div.style.top     = evt.pageY - 15;
        div.style.left    = evt.pageX - 15;
        // Update content:
        div.innerHTML     = html;
        // Make sure it is visible:
        div.style.display = 'block';
        // clear any private variables associated with the popup
        this.clearPrivate(div);
        return div;
    },
    popClick: function (e) {
        // Respond to a click event in our popup
        if (!e || !e.originalTarget) return;
        var targ  = e.originalTarget;
        var par   = targ.parentNode;
        var cname = targ.className;
        while (!cname && par) {
            // Back out of DOM tree until we find a classed target
            targ  = par;
            par   = targ.parentNode;
            cname = targ.className;
        }
        if (!par || !cname) return;
        if (cname == 'CancelButt') {
            // A click within a close button [x] - hide the popup
            this.popClose(par);
        } else if (cname == 'CloseComment') {
            this.toggleComments(par);
        } else if (cname == 'SetColor') {
            // A click within a 'set user color' selection
            var addTo = document.getElementById
            (par.id == 'currentColors' ? 'availableColors' :'currentColors');
            if (!addTo) return;
            addTo.appendChild(targ);
        } else if (cname == 'ShowComments') {
            this.toggleComments(par);
        }
    },
    toggleComments: function (el) {
        var dispid = this.privateHash(el, 'dispid');
        var uname  = this.getTranslation(dispid, 'uname');
        if (!uname) return;
        var coms   = this.objects.comments[uname];
        if (!coms) return;
        var list  = this.objects.shownComments[uname];
        if (list) {
            // Already showing comments - hide them
            for (var l=0; l < list.length; l++) {
                var el = list[l];
                el.parentNode.removeChild(el);
            }
            this.objects.shownComments[uname] = null;
            return;
        }
        list = this.objects.shownComments[uname] = new Array();
        var struct = new Object();
        for (var i=0; i < coms.length; i++) {
            var info = coms[i];
            var pid  = info.photo;
            if (!struct[pid]) struct[pid] = new Array();
            struct[pid].push( info.txt );
        }
        var pool = this.objects.poolImages;
        var purl  = this.privateHash(el, 'purl');
        var col  = "rgb("+this.color4string( purl )+")";
        var elips = "<span style='color:red;font-weight:bold'>&hellip;</span>";
        for (var pid in struct) {
            var targ = pool[pid];
            if (!targ) {
                this.err("Could not find pool image ID="+pid);
                continue;
            }
            var html = "<span style='color:red;background-color:yellow' class='CloseComment'>["+dispid+"]</span>";
            var maxlen = this.user.comWidth;
            for (var c=0; c < struct[pid].length; c++) {
                // If there are multiple comments, separate them by
                // slightly differnt background colors
                var com = struct[pid][c];
                if (maxlen > 0 && com.length > maxlen) com = com.substr(0,maxlen) + elips;
                html += "<span style='background-color:"+( c%2 ? '#cfc' : '#9f9')+"'>"+com+"</span>";
            }
            var el = document.createElement('div');
            el.innerHTML = html;
            targ.appendChild(el);
            el.style.fontSize  = this.user.comSize;
            el.style.border    = col+" solid 1px";
            el.style.textAlign = 'left';
            el.style.zIndex   = 100;
            el.style.position = 'relative';
            el.style.left     = '-4px';
            el.style.width    = '118px';
            el.className      = "CommentBox";
            this.privateHash(el, 'dispid', dispid);
            list.push(el);
            el.addEventListener('click', function (e) {return CatFlickrSuite.popClick(e);}, false);
            //targ.style.height = "100%";
        }
    },
    popClose: function (el) {
        // Does the window have a callback associated with it?
        var cb = this.privateHash(el, 'onclose');
        if (cb) cb( el );
        // Set display to none to hide menu
        el.style.display = 'none';
    },
    makeMenu: function( arr ) {
        // Build a little menu given an array of 'lines'
        if (!arr || arr.length < 1) return "";
        var lines = new Array();
        try {
            for (var i=0; i < arr.length; i++) {
                var info = arr[i];
                if (typeof(info) == 'string') {
                    // If this entry is a simple string, use it as is
                    lines.push(info);
                    continue;
                }
                // Otherwise, assume it is an object that will be turned
                // into a tag, with keys being attribute names. The
                // 'text' attribute is taken as the link text:
                var tag = info.tag;
                if (!tag || tag == '') tag = 'a';
                var txt = ">"+info.text+"</"+tag+">";
                // Free text to put after the link
                if (info.post) txt += info.post;
                // Remove special attrs so they do not become an part of the tag
                delete info.tag; delete info.post; delete info.text; 
                var attrs = new Array();
                for (var attr in info) {
                    var val = info[attr];
                    if (!val) val = "";
                    // Escape single quotes
                    if (typeof(val) == 'string') val = val.replace("'", "\\'");
                    attrs.push(attr+"='"+val+"'");
                }
                txt = "<"+tag+" "+attrs.join(' ')+txt;
                if (info.pre) txt = info.pre + txt;
                // Join all attributes into an anchor tag
                lines.push(txt);
            }
        } catch (e) {
            this.err("Failed to make menu for "+arr.length+" items", e);
            return "";
        }
        // Join all lines into a single block of text
        return lines.join("<br />\n");
    },
    privateHash: function(el, tag, val) {
        // Private hash holding tag / value pairs on HTML elements
        // The function is both a setter and a getter
        if (!el || !tag)  return null;
        // If the element does not have an id assigned, do so now:
        if (!el.id) el.id = "CatFlickrSuite" + ++this.counter;
        var key = el.id;
        // Initialize the hash if this is the first access on the element:
        if (!this.privateData[key]) this.privateData[key] = new Object();
        tag = tag.toLowerCase();
        if (val != null) {
            // Request to set the value
            this.privateData[key][tag] = val;
        }
        // Return the current value
        return this.privateData[key][tag];
    },
    setTranslation: function (data) {
        // Are any other data associated with these?
        for (var type in data) {
            var existing = this.translate[data[type]];
            if (existing) {
                // One of these values is already recorded
                var novel = this.mergeHash( existing, data );
                // No new additions to the tranlsation hash:
                if (novel == 0) return;
                data = existing;
                break;
            }
        }
        // If uname is not set it is the same as the display ID if it is not elipsed
        if (!data.uname && data.dispid && 
            !this.re.elipsed.test(data.dispid)) data.uname = data.dispid;
        // We can generally get the username from the displayed ID
        if (!data.dispid && data.uname) {
            // I *THINK* 20 is the upper limit... ?
            if (data.uname < 20) {
                data.dispid = uname;
            } else {
                // Hmm...
            }
        }
        // Cycle through the hash again, update all keys in translation to point to same hash:
        for (var type in data) {
            this.translate[data[type]] = data;
        }
        this.msg();
    },
    getTranslation: function( term, type ) {
        var thash = this.translate;
        var data  = (term in thash) ? thash[term] : undef;
        if (!data) return null; // Nothing at all found
        if (!type) return data; // The user wants the full hash
        // Specific term type requested for return
        if (type in data) return data[type]; // That type is present, return it
        // We found data, but no match for this type
        if ('dispid' in data && !('uname' in data) &&  this.re.elipsed.test(term)) {
            // The query term is an elipsed display id, which does not
            // yet have a true uname associated with it - see if we
            // can find a match to a username
            var elipre  = this.re.elipsed;
            // Thanks to John Carney for pointing out that I need to
            // escape RE tokens in the username when building this
            // regexp. I miss \Q..\E in perl!
            var matcher = new RegExp(term.replace(elipre,'').
                                     replace(/([(){}.^$*?+\[\]\\])/g, '\\$1')+'.+$');
            for (var tag in thash) {
                // Ignore if this tag does not match, or is itself
                // elipsed, or the matched hash does not have a
                // username defined.
                if (!matcher.test(tag) || elipre.test(tag) || 
                    !('uname' in thash[tag])) continue;
                // We have a match - combine the two hashes
                this.mergeHash(data, thash[tag]);
                this.setTranslation(data);
                if (type in data) return data[type];
            }
        }
        return null;
    },
    mergeHash: function(hashA, hashB) {
        // Adds the key/val pairs of hashB to hashA
        var newVals = 0;
        for (var tag in hashB) {
            if (!(tag in hashA)) { hashA[tag] = hashB[tag]; newVals++; }
        }
        return newVals;
    },
    clearPrivate: function(el) {
        // Clear out private variables associated with an element
        if (!el) return;
        // If the element does not have an id assigned, do so now:
        if (!el.id) el.id = "CatFlickrSuite" + ++this.counter;
        var key = el.id;
        var rv  = this.privateData[key]
        // Totally wipe the settings:
        this.privateData[key] = new Object();
        return rv; // Return the old settings
    },
    flickrApi: function( args, cbname, cfsArgs ) {
        // Generic method for an AJAX call to the Flickr API
        var callback = this[cbname];
        var argList  = new Array();
        for (var arg in args) {
            argList.push( arg + '=' + args[arg] );
        }
        var url = "http://www.flickr.com/services/rest/?api_key=" +
        this.apikey + '&' + argList.join('&');
        var ticket = ++this.ticket;
        if (!cfsArgs) cfsArgs = new Object();
        cfsArgs.ticket = ticket;
        if (cfsArgs.ticktype) this.ticketStatus[cfsArgs.ticktype][ticket] = 'pending';
        GM_xmlhttpRequest
        ({ method: "GET", url: url, headers: {
            "User-agent": "Mozilla/4.0 (compatible) Greasemonkey (Flickr Functional Suite)",
                "Accept": "application/atom+xml,application/xml,text/xml",
                }, onload: function(rsp) { CatFlickrSuite.parseXML(rsp,cbname,args,cfsArgs) } } );
        return ticket;
    },
    parseXML: function(response, cbname, args,cfsArgs) {
        // Takes an XML response from Flickr services and turns it into a E4X object
        // http://developer.mozilla.org/presentations/xtech2005/e4x/
        var txt  = response.responseText;
        txt      = txt.replace(/\s*\<\?[^\>]+\?\>\s*/g,'');
        var rsp  = new XML(txt);
        var stat = rsp.@stat;
        var tick = cfsArgs.ticket;
        var tt   = cfsArgs.ticktype;
        var rv   = null;
        if (stat != 'ok') {
            var msg = "Failed to retrieve Flickr data via API:\n";
            for each (err in rsp.err) {
                msg += "  Error: " +err.@code+ " = "+err.@msg+"\n";
            }
            for (var arg in args) {
                msg += "  "+arg+'='+args[arg]+"\n";
            }
            this.err(msg);
            if (tt) this.ticketStatus[tt][tick] = 'failed';
            return rv;
        }
        try {
            rv = this[cbname](rsp, args);
        } catch (e) {
            this.err("Failed to execute API callback "+cbname, e);
            if (tt) this.ticketStatus[tt][tick] = 'failed';
        }
        // Remove the ticket from the queue as being completed
        if (tt) delete this.ticketStatus[tt][tick];
        return rv;
    },
    apiStatus: function(tt) {
        // Report the status of an API queue
        if (!(tt in this.ticketStatus)) return "";
        var struct = new Object();
        for (var ticket in this.ticketStatus[tt]) {
            var stat = this.ticketStatus[tt][ticket];
            if (!struct[ stat ]) struct[ stat ] = 0;
            struct[ stat ]++;
        }
        var list = new Array();
        for (var stat in struct) {
            list.push( struct[ stat ] + ' ' + stat);
        }
        return list.join(",");
    },
};
// This is the call that starts the ball rolling - it launches the
// init() method when the page finishes loading:
window.addEventListener('load', function (e) {CatFlickrSuite.init();}, false);
