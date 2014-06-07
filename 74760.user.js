// ==UserScript==
// @name           Greased Webcomic Manager
// @namespace      tech.nimbus.fi
// @description    Manages webcomics much like Hilarious Webcomic Manager does but still not exactly.
// @include        *
// @version        1.4.4
// @license        GPLv3
// @author         Tero Niemi (javascript:document.write('\x74al'+'amus\u0040gm'+'ail\056co'+'m');)
// ==/UserScript==
//
//  Version history:
//      1.0.0   Initial release
//      1.1.0   Import/Export tool
//      1.2.0   JSON included for old firefox versions
//      1.2.1   parseDateManually on old firefox versions
//      1.2.2   Added Import/Export tool into Greasemonkey menu
//      1.2.3   Detect http://www.example.com/ and http://example.com/ as the same site
//      1.3.0   parseDateManually on xubuntu, Improved launch by menu command
//      1.3.1   Site visited updated when saving current site info, Code commented
//      1.3.2   Fixed UTC error in parseDateManually
//      1.3.3   Fixed parseDateManually from treating some dates octal!
//              Added 'noisyErrors' boolean flag to hide error messages
//      1.3.4   Fixed compatibility issue with Webcomic Reader
//      1.3.5   Fixed noisyErrors for framesets
//      1.3.6   Regular right-click link menu for comic titles
//      1.4.0   Search box filtering
//      1.4.1   Fixed a small text selection (-moz-user-select) problem
//      1.4.2   Fixed hover and active colors for row links
//      1.4.3   Move focus to search box after site save
//      1.4.4   Table scroll fix for Firefox 4
//

var TN = TN || {};
(function(){  // Beginning of closure

var versionTemp = "1.4.4";

/*** temporary variables ***/
var stylesTemp = {                  // All measurements in pixels:
    fontFamily: "Arial",            // Use this font family for all texts       (default: "Arial")
    fontSize: 11,                   // Size of all fonts                        (default: 11)
    borders: true,                  // Surround everything with 1px borders?    (default: true)
    textColor: "#fff",              // Text color                               (default: "#fff")
    highlightColor: "#fc0",         // Highlight and button color               (default: "#fc0")
    borderColor: "#333",            // Border color if borders are in use       (default: "#333")
    deleteColor: "#f60",            // Delete button color                      (default: "#f60")
    /*** manager window ***/
    managerTop: 10,                 // Top position of manager window           (default: 10)
    managerLeft: 10,                // Left position of manager window          (default: 10)
    managerWidth: 250,              // Width of manager window                  (default: 250)
    managerHeight: 400,             // Height of manager window                 (default: 400)
    earHeight: 50,                  // Height of the hide/display tab           (default: 50)
    visitedColumnWidth: 77,         // Width of the visited column              (default: 77)
    /*** /manager window ***/
    /*** info window ***/
    infoTop: 100,                   // Top position of info window              (default: 100)
    infoLeft: 300,                  // Left position of info window             (default: 300)
    infoWidth: 480,                 // Width of manager window                  (default: 480)
    fieldHeaderWidth: 100,          // Width of info headers                    (default: 100)
    fieldHeight: 14,                // Height of form fields                    (default: 14)
    /*** /info window ***/
    /*** message window ***/
    messageTop: 10,                 // Top position of info window              (default: 10)
    messageLeft: 330,               // Left position of info window             (default: 300)
    messageHeight: 40               // Height of the message window             (default: 40)
    /*** /message window ***/
}
var statusTemp = {
    searchBox: true,                // Show search box?
    noisyErrors: false,             // Alert about errors?
    manager: "closed",              // Is manager open or closed? ("open", "closed")
    managerPosition: -stylesTemp.managerWidth, // Current position of manager (in pixels)
    info: "none",                   // Info of what item is currently shown? ("none", [0..n], "new")
    infoOpacity: 0.0,               // Current opacity of info
    sortColumn: "name",             // Sort by which column? ("name", "visited")
    sortDirection: +1,              // Sort direction (+1 == ascending, -1 == descending)
    scrollDelay: 50,                // Delay when scrolling row into view
    messageOpacity: 0.0,            // Current opacity of message [0.0 .. 2.0]
    searchFilter: "",               // Filter comics list by this filter (default: "")
}
/*** /temporary variables ***/

/*** Main Program ************************************************************/

/** TN Greased Webcomic Manager
 *
 *  This is the GWM object.
 */
TN.gwm = {

id: "Greased-Webcomic-Manager",
name: "Greased Webcomic Manager",
version: "Version " + versionTemp,
copyright: 'Copyright &copy; 2010 <a href="mailto:'+'\x74al'+'amus\u0040gm'+'ail\056co'+'m'+'">Tero Niemi</a>',

styles: stylesTemp,                 // UI style settings
status: statusTemp,                 // Greased Webcomic Manager system status, see above
defaultStatus: statusTemp,

sites: [                            // Array of all sites
    // { name, baseUrl, visitedUrl, faviconUrl, addedTimestamp, visitedTimestamp }, ...
],

currentSite: {                      // Same values for current site:
    index: null,                    //     Index in sites array, null if not found
    name: null,                     //     Site name
    baseUrl: null,                  //     Base url: http://[www.]example.com/
    baseUrlMatchLength: -1,         //     How long is the baseurl today?
    visitedUrl: null,               //     Visited url: view.php?comic=123
    faviconUrl: null                //     Favicon url: favicon.ico
},

/** TN.gwm.seekCurrentSiteIndex()
 *
 *  Seeks our index number in TN.gwm.sites array.
 *  Sets TN.gwm.currentSite.index variable (null if not found).
 *
 *  @return     (Int)       Current site index (null if not found)
 */
seekCurrentSiteIndex: function() {
    // Our current url
    var currentUrl = location.href.toLowerCase();

    // Seek sites array index
    TN.gwm.currentSite.index = null;
    TN.gwm.currentSite.baseUrlMatchLength = -1;
    for (var i = TN.gwm.sites.length; i--;) {
        if (TN.gwm.sites[i]) {
            var longUrl = TN.gwm.sites[i].baseUrl.toLowerCase();
            var shortUrl = longUrl;
            if (shortUrl.indexOf('://www.') > 0) {
                shortUrl = shortUrl.replace('://www.', '://');
            }
            if (currentUrl.indexOf(longUrl) == 0 && longUrl.length >= TN.gwm.currentSite.baseUrlMatchLength) {
                TN.gwm.currentSite.index = i;
                TN.gwm.currentSite.baseUrlMatchLength = longUrl.length;
            } else if (currentUrl.indexOf(shortUrl) == 0 && shortUrl.length >= TN.gwm.currentSite.baseUrlMatchLength) {
                TN.gwm.currentSite.index = i;
                TN.gwm.currentSite.baseUrlMatchLength = shortUrl.length;
            }
        }
    }

    return TN.gwm.currentSite.index;
},

/** TN.gwm.guessCurrentSiteValues()
 *
 *  Seeks our index number in TN.gwm.sites array.
 *  Sets TN.gwm.currentSite object.
 */
guessCurrentSiteValues: function() {
    TN.gwm.currentSite = {
        index: null, name: null, baseUrl: null, baseUrlMatchLength: -1, visitedUrl: null, faviconUrl: null
    };
    TN.gwm.seekCurrentSiteIndex();  // This sets TN.gwm.currentSite.index

    // If we have index: Get object data from sites array and exit
    if (TN.gwm.currentSite.index !== null) {
        TN.gwm.currentSite.name =       TN.gwm.sites[TN.gwm.currentSite.index].name;
        TN.gwm.currentSite.baseUrl =    TN.gwm.sites[TN.gwm.currentSite.index].baseUrl;
        TN.gwm.currentSite.visitedUrl = TN.gwm.sites[TN.gwm.currentSite.index].visitedUrl;
        TN.gwm.currentSite.faviconUrl = TN.gwm.sites[TN.gwm.currentSite.index].faviconUrl;
        return;
    }

    // Still here? Guess name and urls
    TN.gwm.currentSite.name =       TN.str.trim(document.title);
    TN.gwm.currentSite.baseUrl =    location.protocol +"//"+ location.host +"/";
    TN.gwm.currentSite.baseUrlMatchLength = TN.gwm.currentSite.baseUrl.length;
    TN.gwm.currentSite.visitedUrl = location.href.substr(TN.gwm.currentSite.baseUrlMatchLength);
    TN.gwm.currentSite.visitedUrl = TN.gwm.currentSite.visitedUrl.replace(/[\?&]GWM$/, "");

    // Try to guess favicon url
    var url = null;
    var links = TN.gwm.getElem("head").getElementsByTagName("link");
    for each (var link in links) {
        if (link.href) {
            if (link.rel.match(/^\s*icon\s*$/i)) {
                url = link.href;
                break;
            } else if (link.rel.match(/^\s*shortcut\s+icon\s*$/i)) {
                url = link.href;
                // no break
            }
        }
    }
    if (!url) {
        url = TN.gwm.currentSite.baseUrl +"favicon.ico";
    }

    // Try to load the favicon. In case of succes we have guessed correctly!
    var img = new Image();
    img.addEventListener("load", function() {
        if (this.src.indexOf(TN.gwm.currentSite.baseUrl) == 0) {
            TN.gwm.currentSite.faviconUrl = this.src.substr(TN.gwm.currentSite.baseUrl.length);
        } else {
            TN.gwm.currentSite.faviconUrl = this.src;
        }
     }, false);
    img.src = url;
    links = null;
},

/** TN.gwm.saveSites()
 *
 *  Persistence for the TN.gwm.sites array.
 */
saveSites: function() {
    GM_setValue("sites", JSON.stringify(TN.gwm.sites));
},

/** TN.gwm.loadSites()
 *
 *  Persistence for the TN.gwm.sites array.
 */
loadSites: function() {
    try {
        TN.gwm.sites = JSON.parse(GM_getValue("sites"));
        for (var i = TN.gwm.sites.length; i--;) {
            if (TN.gwm.sites[i]) {

                // Parse dates manually after restore in case we are on old Firefox!
                TN.gwm.sites[i].addedTimestamp = TN.gwm.parseDateManually(TN.gwm.sites[i].addedTimestamp);
                TN.gwm.sites[i].visitedTimestamp = TN.gwm.parseDateManually(TN.gwm.sites[i].visitedTimestamp);
            }
        }
    } catch (all) {
        TN.gwm.sites = [];
    }
},

/** TN.gwm.requestByUrl([extension])
 *
 *  Launch Greased Webcomic Manager via [?&]GWM url marker!
 *  THIS FUNCTION DOES NOT RETURN!
 *
 *  @param [extension]  (String)    Optional extension to the url marker
 */
requestByUrl: function(extension) {
    var url = location.href.substr(0, location.href.length - location.search.length);
    var search = location.search;
    search = search.replace(/[\?&]GWM[\-A-Z]*$/, '');  // Remove old marker
    search += (search ? '&' : '?') +'GWM'+ (extension ? '-'+ extension : '');  // Add new marker
    location.href =  url + search;
},

/** TN.gwm.init()
 *
 *  Launch Greased Webcomic Manager if requested.
 *  Note: This function is executed on every page!
 *
 *  @return   (Bool)   Was GWM launched?
 */
init: function() {
    // Check minimum requirements
    if (window.top != window) return false;
    if (!document) return false;
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.addEventListener) return false;
    if (!RegExp) return false;
    if (!GM_setValue || !GM_getValue || !JSON) return false;

    // Add menu commands
    if (GM_registerMenuCommand) {
        GM_registerMenuCommand(TN.gwm.name, function() {
            TN.gwm.requestByUrl();
        }, "G", "control shift alt", "G");
        GM_registerMenuCommand(TN.gwm.name + " Import/Export", function() {
            TN.gwm.requestByUrl('TRANSFER');
        }, "E", "control shift alt", "E");
    }

    // Launch us if requested by url
    if (location.search && location.search.match(/[\?&]GWM$/)) return TN.gwm.buildUI();

    // Launch import/export tool if requested by url
    if (location.search && location.search.match(/[\?&]GWM-TRANSFER$/)) return TN.gwm.importExportUI();

    // Restore sites array
    TN.gwm.loadSites();

    // Launch us if we are on correct site
    if (TN.gwm.seekCurrentSiteIndex() !== null) {
        return TN.gwm.buildUI();
    }

    // Nobody likes us... Quitting.
    return false;
},

/** TN.gwm.importExportUI()
 *
 *  Build import/export user interface.
 *
 *  @return   (Bool)   Is UI functional?
 */
importExportUI: function() {
    // Check for framesets
    if (!document.getElementsByTagName("body").length) {
        if (TN.gwm.status.noisyErrors) {
            alert(TN.gwm.name +" does not work with framesets.\nPlease open the frame you want to view in a new window.");
        }
        return false;
    }

    // Add our styles (using brute force)
    var style = "<style>"+ TN.template.expand(TN.gwm.css) +"</style>";
    TN.gwm.getElem("head").innerHTML += style;

    // Update exportable data
    function updateData() {
        TN.gwm.loadSites();

        // Strip possible nulls
        var oldSites = [];
        for (var i = 0; i < TN.gwm.sites.length; ++i) {
            if (TN.gwm.sites[i] !== null) {
                oldSites.push(TN.gwm.sites[i]);
            }
        }

        // Create string
        var str = "";
        if (oldSites.length) {
            str = JSON.stringify(oldSites, null, " ");
        } else {
            str = "Copypaste your JSON data here and press 'Import data' button.";
        }
        TN.gwm.getElem("importexport-data").value = str;
    }

    // Create UI
    TN.gwm.getElem("body").innerHTML = TN.template.expand(TN.gwm.html.importExport);
    updateData();

    // Bind events
    TN.gwm.bindEvent("importexport-data", "click", function() { TN.gwm.getElem("importexport-data").select(); });
    TN.gwm.bindEvent("importexport-button", "click", function() {

        //
        // Import data from import/export
        //
        var failure = true;
        try {

            // Parse JSON data
            var newSites = JSON.parse(TN.gwm.getElem("importexport-data").value);
            if (typeof newSites === "object" && typeof newSites.length === "number" && newSites.length >= 0) {
                failure = false;
                if (newSites.length > 0) {

                    // Loop the new sites array and check values
                    for (var i = newSites.length; !failure && i--;) {
                        if (newSites[i] !== null) {
                            if (typeof newSites[i].name !== "string") failure = true;
                            if (typeof newSites[i].baseUrl !== "string"
                                || newSites[i].baseUrl.indexOf("://") == -1) failure = true;
                            if (!newSites[i].visitedUrl) newSites[i].visitedUrl = "";
                            if (!newSites[i].faviconUrl) newSites[i].faviconUrl = "";
                            if (!newSites[i].addedTimestamp) newSites[i].addedTimestamp = new Date();
                            if (!newSites[i].visitedTimestamp) newSites[i].visitedTimestamp = new Date();

                            // Parse dates manually in case we are on old Firefox!
                            newSites[i].addedTimestamp = TN.gwm.parseDateManually(newSites[i].addedTimestamp);
                            newSites[i].visitedTimestamp = TN.gwm.parseDateManually(newSites[i].visitedTimestamp);
                        }
                    }
                }
            }

            // No failure detected! Inject data!
            if (!failure && confirm(TN.gwm.name +":\n\nARE YOU SURE?\n\nAll of your sites will be overwritten!")) {
                TN.gwm.sites = newSites;
                TN.gwm.saveSites();
                alert(TN.gwm.name +": Data imported!");
                location.href = location.href.replace(/-TRANSFER$/, "");
                // EXIT!
            }

        } catch (all) { failure = true; }
        if (failure) {
            alert(TN.gwm.name +": Malformed JSON data. Please try again.");
            updateData();
        }

    }); // Import data

    return true;
},

/** TN.gwm.buildUI()
 *
 *  Build GWM user interface.
 *
 *  User interface contains the following elements:
 *    - Manager window
 *    - Info window
 *    - Message box
 *
 *  @return   (Bool)   Is UI functional?
 */
buildUI: function() {
    // Check for framesets
    if (!document.getElementsByTagName("body").length && TN.gwm.status.noisyErrors) {
        alert(TN.gwm.name +" does not work with framesets.\nPlease open the frame you want to view in a new window.");
        return false;
    }

    // Restore sites array
    TN.gwm.loadSites();

    // Try to find out where we currently are
    TN.gwm.guessCurrentSiteValues();

    if (!TN.gwm.getElem("manager", true)) {

        // Add our styles (using brute force)
        var style = "<style>"+ TN.template.expand(TN.gwm.css) +"</style>";
        TN.gwm.getElem("head").innerHTML += style;

        // Restore default status
        TN.gwm.status = TN.gwm.defaultStatus;

        // Restore sorting order
        TN.gwm.status.sortColumn = GM_getValue("sortColumn") || TN.gwm.status.sortColumn
        TN.gwm.status.sortDirection = GM_getValue("sortDirection") || TN.gwm.status.sortDirection;

        // Create base divs
        var divs = '<div id="'+ TN.gwm.id +'-manager"></div>';
        divs    += '<div id="'+ TN.gwm.id +'-info"></div>';
        divs    += '<div id="'+ TN.gwm.id +'-message"></div>';

        // Join base divs to document
        var divContainer = document.createElement('div');
        divContainer.innerHTML = divs;
        divContainer.id = TN.gwm.id +"-container";
        TN.gwm.getElem("body").appendChild(divContainer);
        divContainer = style = divs = null;
    }

    // Update HTML
    return TN.gwm.updateManagerUI() && TN.gwm.updateInfoUI();
},

/** TN.gwm.updateManagerUI()
 *
 *  Update Manager window user interface.
 *
 *  @return   (Bool)   Is Manager window updated?
 */
updateManagerUI: function() {
    var manager = TN.gwm.getElem("manager");
    if (!manager) return false;

    // Create html
    manager.innerHTML = TN.template.expand(TN.gwm.html.manager);
    TN.class.remove(manager, TN.gwm.id +"-manager-open");
    TN.class.remove(manager, TN.gwm.id +"-manager-closed");
    TN.class.add(manager, TN.gwm.id +"-manager-"+ TN.gwm.status.manager);

    // Bind events
    TN.gwm.bindEvent(               "ear",                             "click", TN.gwm.eventEar);
    TN.gwm.bindEvent(               "header-site",                     "click", TN.gwm.eventToggleHeader, "name");
    TN.gwm.bindEvent(               "header-visited",                  "click", TN.gwm.eventToggleHeader, "visited");
    TN.gwm.bindEvent(TN.gwm.getElem("button-new",          true),      "click", TN.gwm.eventOpenInfo, "new");
    TN.gwm.bindEvent(TN.gwm.getElem("button-saveposition", true),      "click", TN.gwm.eventSaveCurrentPosition);
    TN.gwm.bindEvent(TN.gwm.getElem("manager-searchbox-filter", true), "keyup", TN.gwm.eventSearchFilterChange);
    for (var i = 0; i < TN.gwm.sites.length; ++i) {
        if (TN.gwm.sites[i]) {
            TN.gwm.bindEvent(i, "click",    TN.gwm.eventOpenInfo,    i);
            TN.gwm.bindEvent(i, "dblclick", TN.gwm.eventLaunchIndex, i);
        }
    }

    // Scroll active rows to better position
    if (typeof TN.gwm.status.info === "number") {
        TN.gwm.eventScrollRowIntoView(TN.gwm.status.info);
    } else if (typeof TN.gwm.currentSite.index === "number") {
        TN.gwm.eventScrollRowIntoView(TN.gwm.currentSite.index);
    }

    manager = null;
    return true;
},

/** TN.gwm.updateInfoUI()
 *
 *  Update Info window user interface.
 *
 *  @return   (Bool)   Is Info window updated?
 */
updateInfoUI: function() {
    var info = TN.gwm.getElem("info");
    if (!info) return false;

    // Create html
    info.innerHTML = TN.template.expand(TN.gwm.html.info);

    // Bind events
    TN.gwm.bindEvent(    "info-close",                           "click", TN.gwm.eventCloseInfo);
    if (TN.gwm.status.info !== "none") {
        TN.gwm.bindEvent(TN.gwm.getElem("button-cancel",  true), "click", TN.gwm.eventCloseInfo);
        TN.gwm.bindEvent(TN.gwm.getElem("button-goto",    true), "click", TN.gwm.eventLaunchIndex, TN.gwm.status.info);
        TN.gwm.bindEvent(TN.gwm.getElem("button-saveold", true), "click", TN.gwm.eventSave);
        TN.gwm.bindEvent(TN.gwm.getElem("button-savenew", true), "click", TN.gwm.eventSave);
        TN.gwm.bindEvent(TN.gwm.getElem("button-delete",  true), "click", TN.gwm.eventDelete);
        TN.gwm.bindEvent("info-name",                          "keydown", TN.gwm.eventInfoChanged);
        TN.gwm.bindEvent("info-baseurl",                       "keydown", TN.gwm.eventInfoChanged);
        TN.gwm.bindEvent("info-faviconurl",                    "keydown", TN.gwm.eventInfoChanged);
        TN.gwm.bindEvent("info-visitedurl",                    "keydown", TN.gwm.eventInfoChanged);
    }

    info = null;
    return true;
},

/** TN.gwm.sortedSites()
 *
 *  Return TN.gwm.sites array sorted in order requested by variables:
 *    - TN.gwm.status.sortColumn
 *    - TN.gwm.status.sortDirection
 *  A separate 'id' index field is added to each object!
 *
 *  @returns  (Array)  Sites in sorted order (with 'id' index fields added);
 */
sortedSites: function() {
    var sorted = [];

    // Strip null records and add 'id' fields
    for (var i = TN.gwm.sites.length; i--;) {
        if (TN.gwm.sites[i]) {
            var row = TN.gwm.sites[i];
            row.id = i;
            sorted.push(row);
        }
    }

    // Sort and return!
    return sorted.sort(function(a, b) {
        var aVisited = (new Date(a.visitedTimestamp)).getTime();
        var bVisited = (new Date(b.visitedTimestamp)).getTime();
        var nameValue = a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name == b.name ? 0 : 1;
        nameValue *= TN.gwm.status.sortColumn === "name" ? 10 : 1;
        var visitedValue = aVisited > bVisited ? -1 : aVisited == bVisited ? 0 : 1;
        visitedValue *= TN.gwm.status.sortColumn === "visited" ? 10 : 1;
        return TN.gwm.status.sortDirection * (nameValue + visitedValue);
    });
},

/** TN.gwm.getElem(name, [noWarnings = false])
 *
 *  Return user interface element object.
 *
 *  @param name        (String|Number)  A friendly element name.
 *  @param noWarnings  (Boolean)        Do we show a warning if element is not found?
 *  @returns           (Element)        Element object, null if not found.
 */
getElem: function(name, noWarnings) {
    var elem = null;
    if (typeof name === "number") {
        elem = document.getElementById(TN.gwm.id +"-row-"+ name);  // Manager window site row
    } else {
        switch (name) {
            case "body":    elem = document.getElementsByTagName("body")[0];    break;
            case "head":    elem = document.getElementsByTagName("head")[0];    break;
            default:        elem = document.getElementById(TN.gwm.id +"-"+ name);
        }
    }
    if (!noWarnings && !elem && TN.gwm.status.noisyErrors) alert(TN.gwm.name +": Element \""+ name +"\" not found.\nPlease reload the site.");
    return elem;
},

/** TN.gwm.bindEvent(id, type, handler, [parameter])
 *
 *  Bind user interface event handler. Cancel event bubbling.
 *
 *  @param id        (String|Number|Element)  A friendly element name, or the element!
 *  @param type      (String)                 Event type ('load', 'click', ...)
 *  @param handler   (Function)               Event handler
 *  @param parameter (String|Number)          Optional extra parameter to the handler
 */
bindEvent: function(id, type, handler, parameter) {
    if (id === null) return;
    var elem = (typeof id !== "object") ? TN.gwm.getElem(id) : id;
    elem.addEventListener(type, function(e) {
        e.cancelBubble = true;
        handler(parameter, e);
        return false;
    }, false);
    elem = null;
},

/** TN.gwm.eventEar()
 *
 *  User interface event - Manager ear clicked:
 *  Open and close Manager window
 */
eventEar: function() {
    var searchBoxFilter = TN.gwm.getElem("manager-searchbox-filter", true);
    if (TN.gwm.status.manager === "open") {
        TN.gwm.status.manager = "closed";
        TN.gwm.eventCloseInfo();
        if (searchBoxFilter) searchBoxFilter.blur();
        TN.gwm.animateManager();
    } else { // TN.gwm.status.manager === "closed"
        TN.gwm.status.manager = "open";
        if (searchBoxFilter) searchBoxFilter.focus();
        TN.gwm.animateManager();
    }
},

/** TN.gwm.eventToggleHeader(header)
 *
 *  User interface event - Manager window column header clicked:
 *  Toggle header column status
 *
 *  @param header  (String)  Header clicked ('name', 'visited')
 */
eventToggleHeader: function(header) {
    if (TN.gwm.status.sortColumn === header) {
        TN.gwm.status.sortDirection *= -1;
    } else {
        TN.gwm.status.sortColumn = header;
        TN.gwm.status.sortDirection = +1;
    }
    GM_setValue("sortColumn",    TN.gwm.status.sortColumn);
    GM_setValue("sortDirection", TN.gwm.status.sortDirection);
    TN.gwm.updateManagerUI();
},

/** TN.gwm.eventSearchFilterChange(parameter, event)
 *
 *  User interface event - Search filter possibly changed:
 *  Update row visibility
 *
 *  @param parameter  (Object)  Ignored
 *  @param event      (Event)   Event object
 */
eventSearchFilterChange: function(parameter, event) {
    var searchBoxFilter = TN.gwm.getElem("manager-searchbox-filter", true);
    if (!searchBoxFilter) return;
    var filter = searchBoxFilter.value;
    var keyCode = event.keyCode;
    if (TN.gwm.status.searchFilter === filter && keyCode != 13) return;

    // Still here? The change must be real.
    TN.gwm.status.searchFilter = filter;
    var matches = 0;
    var id = null;
    var re = new RegExp(TN.gwm.status.searchFilter, "i"); // ignore case by default
    for (var i = TN.gwm.sites.length; i--;) {
        var row = TN.gwm.getElem(i, true);
        if (TN.gwm.sites[i] && row) {
            if (TN.gwm.sites[i].name.match(re)) {
                row.style.display = "";
                ++matches;
                id = i;
            } else {
                row.style.display = "none";
            }
        }
    }

    // In case of single match and enter key, launch site
    if (keyCode == 13 && matches == 1 && id !== null) {
        TN.gwm.eventLaunchIndex(id);
    }
},

/** TN.gwm.eventSaveCurrentPosition()
 *
 *  User interface event - Manager window Save current position clicked:
 *  Save current site position
 */
eventSaveCurrentPosition: function() {
    var i = TN.gwm.currentSite.index;
    if (i === null) return;

    // Refresh sites array, and if we are no longer there, quit!
    TN.gwm.loadSites();
    if (!TN.gwm.sites[i]) {
        TN.gwm.buildUI();
        return;
    }

    TN.gwm.sites[i].visitedUrl = location.href.substr(TN.gwm.currentSite.baseUrlMatchLength);
    TN.gwm.sites[i].visitedTimestamp = new Date();

    TN.gwm.saveSites();
    TN.gwm.buildUI();
    TN.gwm.eventShowMessage("Current position saved");

    var searchBoxFilter = TN.gwm.getElem("manager-searchbox-filter", true);
    if (searchBoxFilter) searchBoxFilter.focus();
},

/** TN.gwm.eventScrollRowIntoView()
 *
 *  Scroll Manager window current row into view.
 *  (It is possible that this function timeouts.)
 */
eventScrollRowIntoView: function(i) {
    window.setTimeout(function() {
        var obj = TN.gwm.getElem(i, true);
        if (obj) obj.scrollIntoView();
    }, TN.gwm.status.scrollDelay);
},

/** TN.gwm.eventOpenInfo(i)
 *
 *  User interface event - Manager window row clicked or new site added:
 *  Open site into Info window
 *
 *  @param i  (String|Number)  Site number, or 'new' for new site
 */
eventOpenInfo: function(i) {
    // If site is already open, close it!
    if (TN.gwm.status.info === i) {
        TN.gwm.eventCloseInfo();
        return;
    }

    // Mark active row
    TN.gwm.removeClassFromAllRows(TN.gwm.id +"-row-viewed");
    if (typeof i === "number") {
        TN.class.add(TN.gwm.getElem(i), TN.gwm.id +"-row-viewed");
    }

    // Open Info window
    TN.gwm.status.info = i;
    TN.gwm.updateInfoUI();
    window.setTimeout(TN.gwm.animateInfo, 200);
},

/** TN.gwm.eventCloseInfo()
 *
 *  User interface event - Info window closing:
 *  Close Info window
 */
eventCloseInfo: function() {
    TN.gwm.removeClassFromAllRows(TN.gwm.id +"-row-viewed");
    TN.gwm.status.info = "none";
    TN.gwm.animateInfo();
},

/** TN.gwm.eventInfoChanged()
 *
 *  User interface event - Info window content edited:
 *  Add 'save changes' button
 */
eventInfoChanged: function() {
    var save = TN.gwm.getElem("button-saveold", true);
    if (save) save.style.visibility = "visible";
},

/** TN.gwm.eventLaunchIndex()
 *
 *  User interface event - Launch site
 *
 *  @param i  (Number)  Site number
 */
eventLaunchIndex: function(i) {
    TN.gwm.loadSites();
    TN.gwm.eventCloseInfo();
    if (TN.gwm.sites[i]) {
        TN.gwm.eventEar();
        location.href = TN.gwm.sites[i].baseUrl + TN.gwm.sites[i].visitedUrl;
        // EXIT
    } else {
        TN.gwm.buildUI();
    }
},

/** TN.gwm.eventSave()
 *
 *  User interface event - 'Save changes' button clicked:
 *  Save Info window content
 */
eventSave: function() {
    if (TN.gwm.status.info === "none") return;
    if (!TN.gwm.getElem("info-name", true)) return;

    TN.gwm.loadSites();

    // Populate site object with data
    var site = {};
    var newSite = false
    if (typeof TN.gwm.status.info === "number" && TN.gwm.sites[TN.gwm.status.info]) {
        // Old site
        site = TN.gwm.sites[TN.gwm.status.info];

        // We are updating site we are currently viewing, so: We are visiting!
        if (TN.gwm.status.info == TN.gwm.currentSite.index) {
            site.visitedTimestamp = new Date();
        }

    } else {
        // A new site!
        newSite = true;
        site.addedTimestamp   = new Date();
        site.visitedTimestamp = new Date();
    }

    // Insert form data into site object
    site.name       = TN.str.trim(TN.gwm.getElem("info-name").value);
    site.baseUrl    = TN.str.trim(TN.gwm.getElem("info-baseurl").value);
    site.visitedUrl = TN.str.trim(TN.gwm.getElem("info-visitedurl").value);
    site.faviconUrl = TN.str.trim(TN.gwm.getElem("info-faviconurl").value);

    // Check values
    if (!site.name) {
        alert(TN.gwm.name +": Name is empty.\nPlease provide a Name.");
        TN.gwm.getElem("info-name").focus();
        return false;
    }
    if (!site.baseUrl || site.baseUrl.indexOf("://") == -1) {
        alert(TN.gwm.name +": Base URL is partial.\nPlease provide a full Base URL with 'http://' at the beginning.");
        TN.gwm.getElem("info-baseurl").focus();
        return false;
    }

    // Remove baseurl from visited url and favicon url (if possible)
    if (site.visitedUrl.indexOf(site.baseUrl) == 0) site.visitedUrl = site.visitedUrl.substr(site.baseUrl.length);
    if (site.faviconUrl.indexOf(site.baseUrl) == 0) site.faviconUrl = site.faviconUrl.substr(site.baseUrl.length);

    // Insert site object into sites array
    if (typeof TN.gwm.status.info === "number") {
        TN.gwm.sites[TN.gwm.status.info] = site;
    } else {
        TN.gwm.sites.push(site);
    }

    TN.gwm.saveSites();

    TN.gwm.eventCloseInfo();
    TN.gwm.buildUI();
    TN.gwm.eventShowMessage(newSite ? "Site added" : "Changes saved");
    site = null;
},

/** TN.gwm.eventDelete(i)
 *
 *  User interface event - 'Delete site' button clicked:
 *  Delete site from sites array
 *
 *  @param i  (Number)  Site number
 */
eventDelete: function(i) {
    if (typeof TN.gwm.status.info !== "number") return;
    if (!confirm("Do you really want to delete "+TN.gwm.sites[TN.gwm.status.info].name+"?")) return;

    TN.gwm.loadSites();
    TN.gwm.sites[TN.gwm.status.info] = null;
    TN.gwm.saveSites();

    TN.gwm.eventCloseInfo();
    TN.gwm.buildUI();
    TN.gwm.eventShowMessage("Site deleted");
},

/** TN.gwm.eventShowMessage(str)
 *
 *  User interface event - Show message in Message box
 *
 *  @param str  (Number)  Message
 */
eventShowMessage: function(str) {
    var message = TN.gwm.getElem("message");
    message.innerHTML = str;
    if (TN.gwm.status.messageOpacity == 0.0) {
        TN.gwm.animateMessage();
    } else {
        TN.gwm.status.messageOpacity = 0.0;
    }
},

/** TN.gwm.removeClassFromAllRows(cls)
 *
 *  Remove css class name from every Manager window row
 *
 *  @param cls  (String)  Class to be removed
 */
removeClassFromAllRows: function(cls) {
    var rows = TN.class.getElementsByClass(cls, TN.gwm.getElem("rows"), "tr");
    if (rows) {
        for (var i = rows.length; i--;) {
            TN.class.remove(rows[i], cls);
        }
    }
},

/** TN.gwm.animateManager()
 *
 *  Animate Manager window: Open and close
 */
animateManager: function() {
    var manager = TN.gwm.getElem("manager");
    var step = TN.gwm.status.manager === "closed" ? -10 : 10;
    TN.gwm.status.managerPosition += step;
    if (TN.gwm.status.managerPosition <= -TN.gwm.styles.managerWidth) {
        TN.gwm.status.managerPosition = -TN.gwm.styles.managerWidth;
        manager.style.left = TN.gwm.status.managerPosition +"px";
        TN.class.remove(manager, TN.gwm.id +"-manager-open");
        TN.class.add(manager, TN.gwm.id +"-manager-closed");
    } else if (TN.gwm.status.managerPosition >= TN.gwm.styles.managerLeft) {
        TN.gwm.status.managerPosition = TN.gwm.styles.managerLeft;
        manager.style.left = TN.gwm.styles.managerLeft +"px";
        TN.class.remove(manager, TN.gwm.id +"-manager-closed");
        TN.class.add(manager, TN.gwm.id +"-manager-open");
    } else {
        manager.style.left = TN.gwm.status.managerPosition +"px";
        window.setTimeout(TN.gwm.animateManager, 10);
    }
},

/** TN.gwm.animateInfo()
 *
 *  Animate Info window: Fadein and fadeout
 */
animateInfo: function() {
    var info = TN.gwm.getElem("info");
    var step = TN.gwm.status.info === "none" ? -.1 : .1;
    TN.gwm.status.infoOpacity += step;
    if (TN.gwm.status.infoOpacity <= 0.001) {
        TN.gwm.status.infoOpacity = 0.0;
        info.style.opacity = 0.0;
        info.style.visibility = "hidden";
    } else if (TN.gwm.status.infoOpacity >= 0.999) {
        TN.gwm.status.infoOpacity = 1.0;
        info.style.opacity = 1.0;
        info.style.visibility = "visible";
    } else {
        info.style.opacity = TN.gwm.status.infoOpacity;
        info.style.visibility = "visible";
        window.setTimeout(TN.gwm.animateInfo, 10);
    }
},

/** TN.gwm.animateMessage()
 *
 *  Animate Message box: Fadein and fadeout
 */
animateMessage: function() {
    var step = .01;
    var duration = 1.5;
    var message = TN.gwm.getElem("message");
    TN.gwm.status.messageOpacity += step;
    if (TN.gwm.status.messageOpacity >= 2.0 * duration) {
        TN.gwm.status.messageOpacity = 0.0;
        message.style.visibility = "hidden";
        message.style.opacity = 0.0;
    } else {
        var opacity = duration - Math.abs(TN.gwm.status.messageOpacity - duration);
        opacity = opacity > 1.0 ? 1.0 : opacity < 0.0 ? 0.0 : opacity;
        opacity = Math.floor(opacity * 1000)/1000;
        message.style.visibility = "visible";
        message.style.opacity = opacity;
        window.setTimeout(TN.gwm.animateMessage, 10);
    }
},

/** TN.gwm.parseDateManually(timestamp)
 *
 *  Parse a possible Date value manually.
 *
 *  @param timestamp  (String|Date)  Data to be parsed
 *  @returns          (Date)         Parsed date
 */
parseDateManually: function(timestamp) {
    if (typeof timestamp === "string" && timestamp == "Invalid Date") {
        if (TN.gwm.status.noisyErrors) {
            alert(TN.gwm.name +": Invalid date detected and rectified.");
        }
        return new Date();
    }

    if (typeof timestamp === "string" && timestamp.indexOf("T") == 10 && timestamp.indexOf("Z") == timestamp.length-1) {
        // 0         1
        // 0123456789012345678
        //"2010-01-16T00:00:00[.000]Z"
        var year  = parseInt(timestamp.substr(0,4), 10);
        var month = parseInt(timestamp.substr(5,2), 10); --month;
        var day   = parseInt(timestamp.substr(8,2), 10);
        var hours = parseInt(timestamp.substr(11,2), 10);
        var min   = parseInt(timestamp.substr(14,2), 10);
        var sec   = parseInt(timestamp.substr(17,2), 10);
        timestamp = new Date(Date.UTC(year, month, day, hours, min, sec));
    } else {
        timestamp = new Date(timestamp); // Standard way
    }
    return timestamp;
},

/** TN.gwm.timestampToDelayStr(timestamp, [longform = false])
 *
 *  Convert timestamp to a screen friendly delay string.
 *
 *  @param timestamp  (Date)      Timestamp
 *  @param longform   (Boolean)   Use long form?
 *  @returns          (String)    Delay string
 */
timestampToDelayStr: function(timestamp, longform) {
    if (!timestamp) return "unknown";
    var msecs = (new Date()).getTime() - timestamp.getTime();
    var days = Math.floor(msecs/86400000);
    if (days == 0) return "Today";
    if (days == 1) return "Yesterday";
    if (days <= 30) return days +" days" + (longform ? " ago" : "");
    var months = Math.floor(days/30);
    var years = Math.floor(msecs/31556925975);
    if (months <= 1) return "1 month" + (longform ? " ago" : "");
    if (months < 12) return months +" months" + (longform ? " ago" : "");
    if (years < 1) return "12 months" + (longform ? " ago" : "");
    if (years == 1) return "1 year" + (longform ? " ago" : "");
    return years +"years" + (longform ? " ago" : "");
},

/** TN.gwm.timestampToStr(timestamp)
 *
 *  Convert timestamp to a screen friendly string.
 *
 *  @param timestamp  (Date)      Timestamp
 *  @returns          (String)    String
 */
timestampToStr: function(timestamp) {
    if (!timestamp) return "none";
    function twoNumbers(n) {
        if (n < 10) n = "0"+n;
        return n;
    }
    var year  = timestamp.getFullYear();
    var month = twoNumbers(timestamp.getMonth()+1);
    var day   = twoNumbers(timestamp.getDate());
    var hours = twoNumbers(timestamp.getHours());
    var min   = twoNumbers(timestamp.getMinutes());
    var sec   = twoNumbers(timestamp.getSeconds());

    var str = year +"-"+ month +"-"+ day +" "+ hours +":"+ min +":"+ sec;
    str += " ("+ TN.gwm.timestampToDelayStr(timestamp, true) +")";

    return str;
}

}; /*** End of TN.gwm ***/

})(); // End of closure

/*** Stylesheet **************************************************************/

TN.gwm.img = {
    darkBG:        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFUlEQVR4nGNhYGA4w4AHsOCTHD4KAOLIAO1XZH43AAAAAElFTkSuQmCC",
    earHover:      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAABCAYAAAArbAWVAAAACXBIWXMAAAsSAAALEgHS3X78AAAAK0lEQVR4nGMRFxe/KCgoyMrHx8cmICDADqRZOTg42BkYGNigmBmIGRkoAADBSAIYtAGuLgAAAABJRU5ErkJggg==",
    buttonHover:   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAABCAYAAABJwyn/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAM0lEQVR4nGOJiYlhAAIOLJidSDEQZoNiVjQaF5sUMRD4DcS/kOhfZIjhkv+BBf8kUuwHAMasKBnLuXTDAAAAAElFTkSuQmCC",
    favicon:       "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAo0lEQVR4nGP5f4YBA5z8cwJTEAdggdL/0cQZgfg4EP8A4u9QHAzEs5H4INzAwoAb/EBTzIDG/47sAmwAQzFtDIAGGCMWA4KxiDWgC8BcgB5gMJwKxJ1YxGFq18AMwKYZl7OR1cJdgE0zNgMwYoYUA7C5Em4AtgCDgUl45OAGoKcwrAEGxE5ocjcJeQElwPB5gZBmkg3AGmD4DGjAF1BI4Ca6AAApBY+qK2CErgAAAABJRU5ErkJggg==",
    faviconBroken: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAABFklEQVR4nI1TwQnCQBC8QB4W4FcQfPnVR2zBt4g2IBZgAzZgAZJH3qIt+BRzYANWoohwzsZdWfYu4MKSvc3M7N1ckoebi8K/67jZEjk/g+lnyCvyiXxwzpClWlNucxfHgZ9PA6a4IIe6ZwUObhwWzvulITfgoigq7/0c5SAl8CV/gQHADcoRAy/U43dHvJui7DUCbFjWSGCyAu4AzERQpkhPQnbwM4wmE9kSmUyTV8qfkwhow0YArkHeJ8g9g/3twBr2cnG8XOJmUgJkWGXZ6J2xiwnKbkpgpoCRYcrYus3E0k7WhtFkIosY1n2UHeRdH2FIH4m5ZzlzlyYbctKDQYvbD96VJreamCLLv9CxPRHYuv/ibhsf91CxQHXXllAAAAAASUVORK5CYII=",
    line:          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAABCAYAAACbv+HiAAAACXBIWXMAAAsSAAALEgHS3X78AAAAPklEQVR4nGOJiYlhY2BgYAdifDSMTUicBYiZqIwZaWAmrc0eKPCPBvg/jcylldl/gPgXEP+E4l9IfELiGDQAsXhWGV70kFAAAAAASUVORK5CYII="
};

TN.gwm.css = <><![CDATA[
<% with (TN.gwm.styles) { %>

    /* reset absolutely everything (hopefully) */
    #<%= TN.gwm.id %>-container,
    #<%= TN.gwm.id %>-manager,      #<%= TN.gwm.id %>-manager *,
    #<%= TN.gwm.id %>-info,         #<%= TN.gwm.id %>-info    *,
    #<%= TN.gwm.id %>-message,      #<%= TN.gwm.id %>-message *,
    #<%= TN.gwm.id %>-importexport, #<%= TN.gwm.id %>-importexport *,
    #<%= TN.gwm.id %>-manager A:hover, #<%= TN.gwm.id %>-manager A:visited, #<%= TN.gwm.id %>-manager A:active {
        width: auto;
        height: auto;
        max-width: none;
        max-height: none;
        min-width: 0;
        min-height: 0;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        -moz-border-radius: 0;
        -moz-user-select: -moz-none;
        -moz-box-sizing: content-box;
        border-collapse: collapse;
        cursor: auto;

        font-family: <%= fontFamily %>,Helvetica,sans-serif;
        font-size: <%= fontSize %>px;
        font-weight: normal;
        font-style: normal;
        font-variant: normal;
        text-decoration: none;
        text-align: left;
        text-transform: none;
        text-decoration: none;
        letter-spacing: normal;
        word-spacing: 0;
        line-height: 1.0;
        text-align: left;
        vertical-align: baseline;
        direction: ltr;

        color: <%= textColor %>;
        background-color: transparent;
        background-image: none;
        background-position: top left;
        background-repeat: repeat;
        opacity: 1.0;
    }

    /* hide container */
    #<%= TN.gwm.id %>-container {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 1px;
    }

    /*** favicon ******************************************/
    .<%= TN.gwm.id %>-favicon {
        width: 16px !important;
        height: 16px !important;
    }
    /*** /favicon *****************************************/

    /*** manager ******************************************/
    #<%= TN.gwm.id %>-manager {
        position: fixed;
        z-index: 9999998;
        top: <%= managerTop %>px;
        left: -<%= managerWidth %>px;
        width: <%= managerWidth %>px;
        height: <%= managerHeight %>px;
        color: <%= textColor %>;
        overflow: visible; /* for ear and background */
    }
    #<%= TN.gwm.id %>-manager-background-bottom, #<%= TN.gwm.id %>-manager-background-top {
        width: <%= managerWidth - (borders ? 2 : 0) %>px;
        position: absolute;
        z-index: 0;
        background-image: url(<%= TN.gwm.img.darkBG %>);
        <% if (borders) { %>
            border: 1px solid <%= borderColor %>;
        <% } %>
    }
    #<%= TN.gwm.id %>-manager-background-top {
        top: 0;
        left: 0;
        height: <%= earHeight + (borders ? 1 : 0) %>px;
        border-right: 0;
        border-bottom: 0;
        -moz-border-radius: 0;
        -moz-border-radius-topleft: 10px;
    }
    #<%= TN.gwm.id %>-manager-background-bottom {
        border-top: 0;
        height: <%= managerHeight - earHeight - (borders ? 2 : 0) %>px;
        -moz-border-radius: 0;
        -moz-border-radius-bottomleft: 10px;
        -moz-border-radius-bottomright: 10px;
    }
    /*** /manager *****************************************/

    /*** ear **********************************************/
    #<%= TN.gwm.id %>-ear {
        position: relative;
        top: 0px;
        left: <%= managerWidth - (borders ? 1 : 0)  %>px;
        width: 25px;
        height: <%= earHeight %>px;
        background-image: url(<%= TN.gwm.img.darkBG %>);
        -moz-border-radius-topright: 10px;
        -moz-border-radius-bottomright: 10px;
        cursor: pointer;
        <% if (borders) { %>
            border: 1px solid <%= borderColor %>;
            border-left: 0;
        <% } %>
    }
    #<%= TN.gwm.id %>-ear:hover, #<%= TN.gwm.id %>-ear:active {
        background-image: url(<%= TN.gwm.img.earHover %>);
        background-repeat: repeat-y;
    }
    #<%= TN.gwm.id %>-ear:active * {
        color: <%= highlightColor %>;
    }
    #<%= TN.gwm.id %>-ear-open, #<%= TN.gwm.id %>-ear-closed {
        display: none;
        line-height: <%= earHeight-6 %>px;
        color: <%= textColor %>;
        font-size: 35px;
        text-align: center;
        cursor: pointer;
    }
    #<%= TN.gwm.id %>-manager.<%= TN.gwm.id %>-manager-open   #<%= TN.gwm.id %>-ear-open,
    #<%= TN.gwm.id %>-manager.<%= TN.gwm.id %>-manager-closed #<%= TN.gwm.id %>-ear-closed {
        display: block;
    }
    /*** /ear *********************************************/

    /*** table ********************************************/
    #<%= TN.gwm.id %>-table {
        position: relative;
        top: <%= -earHeight - (borders ? 2 : 0) %>px;
        left: 5px;
    }
    #<%= TN.gwm.id %>-header {
        display: block;
    }
    #<%= TN.gwm.id %>-rows {
        display: block;
        width: <%= managerWidth - 9 %>px;
        height: <%= managerHeight - (TN.gwm.status.searchBox ? 3 : 2)*(fontSize + 16) %>px;
        overflow: auto; /* for scrollbars */
    }
    #<%= TN.gwm.id %>-rows A {
        display: block;
    }
    #<%= TN.gwm.id %>-rows TH, #<%= TN.gwm.id %>-rows TH *,
    #<%= TN.gwm.id %>-rows TD, #<%= TN.gwm.id %>-rows TD * {
        cursor: pointer !important;
    }
    /*** header ***/
    #<%= TN.gwm.id %>-table TH {
        color: <%= highlightColor %>;
        font-weight: bold;
        padding: 8px 2px;
        vertical-align: middle;
        height: <%= fontSize + 16 %>px;
        cursor: pointer;
    }
    #<%= TN.gwm.id %>-table TH:hover {
        background-image: url(<%= TN.gwm.img.buttonHover %>);
        background-repeat: repeat-y;
        background-position: 0 0;
    }
    #<%= TN.gwm.id %>-table TH:active {
        color: <%= textColor %>;
    }
    #<%= TN.gwm.id %>-header-icon {     width: 20px; }
    #<%= TN.gwm.id %>-header-site {     width: <%= managerWidth - visitedColumnWidth - 36 %>px; }
    #<%= TN.gwm.id %>-header-visited {  width: <%= visitedColumnWidth %>px;  }
    /*** /header ***/
    /*** row ***/
    #<%= TN.gwm.id %>-table TR {
        background-image: url(<%= TN.gwm.img.line %>);
        background-repeat: no-repeat;
        background-position: 20px bottom;
    }
    #<%= TN.gwm.id %>-rows TR:last-child {
        background-image: none;
    }
    #<%= TN.gwm.id %>-rows TR.<%= TN.gwm.id %>-row-visited * {
        color: <%= highlightColor %>;
        font-weight: bold;
    }
    #<%= TN.gwm.id %>-rows TR.<%= TN.gwm.id %>-row-viewed * {
        font-weight: bold;
    }
    #<%= TN.gwm.id %>-rows TR SPAN.<%= TN.gwm.id %>-row-viewed {
        display: none;
        font-weight: normal;
        color: inherit;
    }
    #<%= TN.gwm.id %>-rows TR.<%= TN.gwm.id %>-row-viewed SPAN.<%= TN.gwm.id %>-row-viewed {
        display: inline;
        font-weight: normal;
        color: inherit;
    }
    #<%= TN.gwm.id %>-rows TR:hover {
        background-image: url(<%= TN.gwm.img.line %>);
        background-repeat: repeat-y;
    }
    #<%= TN.gwm.id %>-rows TR:active TD,
    #<%= TN.gwm.id %>-rows TR:active TD * {
        color: <%= highlightColor %>;
    }
    #<%= TN.gwm.id %>-rows TR.<%= TN.gwm.id %>-row-visited:active TD,
    #<%= TN.gwm.id %>-rows TR.<%= TN.gwm.id %>-row-visited:active TD * {
        color: <%= textColor %>;
    }
    #<%= TN.gwm.id %>-rows TD {
        padding: 1px 2px 2px 2px;
        vertical-align: middle;
    }
    #<%= TN.gwm.id %>-rows TD.<%= TN.gwm.id %>-row-visited {
        text-align: right;
        padding-right: 5px;
    }
    /*** /row ***/
    /*** no rows ***/
    #<%= TN.gwm.id %>-rows .<%= TN.gwm.id %>-row-norows,
    #<%= TN.gwm.id %>-rows .<%= TN.gwm.id %>-row-norows * {
        color: <%= highlightColor %>;
        text-align: center;
        background-image: none;
        cursor: auto !important;
    }
    #<%= TN.gwm.id %>-rows .<%= TN.gwm.id %>-row-norows A {
        color: <%= textColor %>;
        text-align: center;
        cursor: pointer !important;
    }
    #<%= TN.gwm.id %>-rows .<%= TN.gwm.id %>-row-norows A:hover {
        text-decoration: underline;
    }
    #<%= TN.gwm.id %>-rows .<%= TN.gwm.id %>-row-norows A:active {
        color: <%= highlightColor %>;
        text-decoration: underline;
    }
    /*** /no rows ***/
    /*** /table *******************************************/

    /*** info *********************************************/
    <%
        var rowHeight = fieldHeight + 11;
        var closeButtonWidth = 27;
        var fieldWidth = infoWidth - fieldHeaderWidth - closeButtonWidth - 11;
    %>
    #<%= TN.gwm.id %>-info {
        visibility: hidden;
        padding: 5px;
        position: fixed;
        z-index: 9999999;
        top: <%= infoTop %>px;
        left: <%= infoLeft %>px;
        width: <%= infoWidth %>px;
        height: <%= (6 * rowHeight) + (fontSize + 16) - 5 %>px;
        background-image: url(<%= TN.gwm.img.darkBG %>);
        color: <%= textColor %>;
        -moz-border-radius: 10px;
        <% if (borders) { %>
            border: 1px solid <%= borderColor %>;
        <% } %>
    }
    #<%= TN.gwm.id %>-info TD, #<%= TN.gwm.id %>-info TD * {
        -moz-user-select: text;
    }
    #<%= TN.gwm.id %>-info TH {
        width: <%= fieldHeaderWidth - 5 %>px;
        padding-right: 5px;
        text-align: right;
        color: <%= highlightColor %>;
        font-weight: bold;
    }
    #<%= TN.gwm.id %>-info TR,
    #<%= TN.gwm.id %>-info TH,
    #<%= TN.gwm.id %>-info TD {
        height: <%= rowHeight %>px;
        vertical-align: middle;
    }
    #<%= TN.gwm.id %>-info INPUT[type="text"] {
        top: 0;
        width: <%= fieldWidth %>px;
        height: <%= fieldHeight %>px;
        border: 1px solid #5c5c5c;
        padding: 2px;
    }
    INPUT[type="text"]#<%= TN.gwm.id %>-info-name {
        width: <%= fieldWidth - 16 %>px;
        padding-left: 18px;
    }
    #<%= TN.gwm.id %>-info .<%= TN.gwm.id %>-favicon {
        position: absolute;
        top: <%= 6 + Math.floor((rowHeight - 16)/2) %>px;
        left: <%= fieldHeaderWidth + 7 %>px;
    }
    /*** close button ***/
    #<%= TN.gwm.id %>-info-close {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 27px;
        height: 28px;
        font-size: 33px;
        line-height: 28px;
        color: <%= textColor %>;
        text-align: center;
        cursor: pointer;
        -moz-border-radius: 4px;
    }
    #<%= TN.gwm.id %>-info-close:hover, #<%= TN.gwm.id %>-info-close:active {
        background-color: #5c5c5c;
    }
    #<%= TN.gwm.id %>-info-close:active {
        color: <%= highlightColor %>;
    }
    /*** /close button ***/
    /*** /info ********************************************/
    <%
        var buttonHeight = fontSize + 16;
    %>
    /*** searchbox ****************************************/
    #<%= TN.gwm.id %>-manager-searchbox {
        position: absolute;
        bottom: <%= buttonHeight %>px;
        width: <%= managerWidth %>px;
        height: <%= buttonHeight %>px;
        background-image: url(<%= TN.gwm.img.line %>);
        background-repeat: no-repeat;
    }
    #<%= TN.gwm.id %>-manager-searchbox-message,
    #<%= TN.gwm.id %>-manager-searchbox INPUT[type="text"] {
        position: absolute;
        top: <%= (buttonHeight-fieldHeight-6)/2 %>px;
        left: 4px;
        width: <%= managerWidth - 14 %>px;
        height: <%= fieldHeight %>px;
        border: 1px solid #5c5c5c;
        padding: 2px;
    }
    #<%= TN.gwm.id %>-manager-searchbox INPUT[type="text"] {
        -moz-user-select: text;
    }
    #<%= TN.gwm.id %>-manager-searchbox-message {
        display: block;
        margin: 3px 0;
        padding: 0;
        border: 0;
        line-height: <%= fieldHeight %>px;
        color: #5c5c5c;
        text-align: right;
    }
    /*** /searchbox ***************************************/

    /*** buttons ******************************************/
    /*** button containers ***/
    #<%= TN.gwm.id %>-manager-buttons,
    #<%= TN.gwm.id %>-info-buttons {
        position: absolute;
        bottom: 0;
        height: <%= buttonHeight %>px;
        background-image: url(<%= TN.gwm.img.line %>);
        background-repeat: no-repeat;
    }
    #<%= TN.gwm.id %>-manager-buttons {
        left: 0;
        width: <%= managerWidth %>px;
        text-align: center;
        background-position: center top;
    }
    #<%= TN.gwm.id %>-manager-buttons SPAN.<%= TN.gwm.id %>-button {
        display: block;
    }
    #<%= TN.gwm.id %>-info-buttons {
        left: <%= closeButtonWidth + 5 %>px;
        width: <%= infoWidth - 2*closeButtonWidth - 5 %>px;
        text-align: right;
        background-position: right top;
    }
    /*** /button containers ***/
    /*** generic button ***/
    #<%= TN.gwm.id %>-manager      .<%= TN.gwm.id %>-button,
    #<%= TN.gwm.id %>-info         .<%= TN.gwm.id %>-button,
    #<%= TN.gwm.id %>-importexport .<%= TN.gwm.id %>-button {
        display: inline-block;
        color: <%= highlightColor %>;
        font-weight: bold;
        margin: 1px;
        padding: 7px 14px 9px 14px;
        cursor: pointer;
        min-width: 50px;
        text-align: center;
    }
    #<%= TN.gwm.id %>-manager      SPAN.<%= TN.gwm.id %>-button:hover,
    #<%= TN.gwm.id %>-info         SPAN.<%= TN.gwm.id %>-button:hover,
    #<%= TN.gwm.id %>-importexport SPAN.<%= TN.gwm.id %>-button:hover {
        background-image: url(<%= TN.gwm.img.buttonHover %>);
        background-repeat: repeat-y;
        background-position: center center;
    }
    #<%= TN.gwm.id %>-manager      SPAN.<%= TN.gwm.id %>-button:active,
    #<%= TN.gwm.id %>-info         SPAN.<%= TN.gwm.id %>-button:active,
    #<%= TN.gwm.id %>-importexport SPAN.<%= TN.gwm.id %>-button:active {
        color: <%= textColor %>;
    }
    /*** /generic button ***/
    #<%= TN.gwm.id %>-info #<%= TN.gwm.id %>-button-delete {
        position: absolute;
        left: 0;
        font-weight: normal;
        color: <%= deleteColor %>;
    }
    #<%= TN.gwm.id %>-info #<%= TN.gwm.id %>-button-delete:active {
        color: <%= textColor %>;
    }
    #<%= TN.gwm.id %>-info #<%= TN.gwm.id %>-button-saveold {
        visibility: hidden;
    }
    /*** /buttons *****************************************/

    /*** message ******************************************/
    #<%= TN.gwm.id %>-message {
        visibility: hidden;
        display: block;
        padding: 5px 40px;
        position: fixed;
        z-index: 10000000;
        top: <%= messageTop %>px;
        left: <%= messageLeft %>px;
        width: auto;
        height: <%= messageHeight %>px;
        font-size: 33px;
        line-height:  <%= messageHeight %>px;
        background-image: url(<%= TN.gwm.img.darkBG %>);
        color: <%= highlightColor %>;
        -moz-border-radius: 10px;
        <% if (borders) { %>
            border: 1px solid <%= borderColor %>;
        <% } %>
    }
    /*** /message *****************************************/

    /*** import/export ************************************/
    #<%= TN.gwm.id %>-importexport, #<%= TN.gwm.id %>-importexport * {
        overflow: auto;
    }
    #<%= TN.gwm.id %>-importexport {
        margin-top: 10px;
        display: block;
        text-align: center;
    }
    #<%= TN.gwm.id %>-importexport-borders {
        display: inline-block;
        padding: 5px;
        background-image: url(<%= TN.gwm.img.darkBG %>);
        -moz-border-radius: 10px;
        <% if (borders) { %>
            border: 1px solid <%= borderColor %>;
        <% } %>
    }
    #<%= TN.gwm.id %>-importexport #<%= TN.gwm.id %>-importexport-data {
        display: block;
        padding: 2px;
        line-height: 1.0;
        width: 400px;
        height: 400px;
        text-align: left;
        border: 2px inset <%= borderColor %> !important;
        background-color: #666;
        -moz-border-radius: 5px;
        -moz-user-select: text;
        color: #fff;
    }
    /*** /import/export ***********************************/

<% } /* with (TN.gwm.sizes) */ %>
]]></>.toString();

/*** HTML ********************************************************************/

TN.gwm.html = {};

TN.gwm.html.manager = <><![CDATA[
    <div id="<%= TN.gwm.id %>-ear" title="<%= TN.gwm.name %>"><span
        id="<%= TN.gwm.id %>-ear-closed">&#187;</span><span
        id="<%= TN.gwm.id %>-ear-open">&#171;</span></div>
    <div id="<%= TN.gwm.id %>-manager-background-top"></div>
    <div id="<%= TN.gwm.id %>-manager-background-bottom"></div>
    <table id="<%= TN.gwm.id %>-table">
    <thead id="<%= TN.gwm.id %>-header">
        <tr>
            <td id="<%= TN.gwm.id %>-header-icon"></td>

            <% if (TN.gwm.status.sortColumn === "name") { %>
                <th id="<%= TN.gwm.id %>-header-site" class="<%= TN.gwm.id %>-header-selected">Site
                <%= TN.gwm.status.sortDirection > 0 ? "&#9660;" : "&#9650;" %></th>
                <th id="<%= TN.gwm.id %>-header-visited">Visited</th>
            <% } else { /* TN.gwm.status.sortColumn === "visited" */ %>
                <th id="<%= TN.gwm.id %>-header-site">Site</th>
                <th id="<%= TN.gwm.id %>-header-visited" class="<%= TN.gwm.id %>-header-selected">Visited
                <%= TN.gwm.status.sortDirection > 0 ? "&#9660;" : "&#9650;" %></th>
            <% } %>

        </tr>
    </thead>
    <tbody id="<%= TN.gwm.id %>-rows">
    <%
        /*** print all rows **************************************************/

        var sorted = TN.gwm.sortedSites();
        var re = new RegExp(TN.gwm.status.searchFilter, "i"); /* ignore case by default */
        for (var i = 0; i < sorted.length; ++i) {
            var cls = "";
            if (TN.gwm.currentSite.index === sorted[i].id) cls += TN.gwm.id +"-row-visited";
            if (TN.gwm.status.info == sorted[i].id) cls += (cls ? " " : "") + TN.gwm.id +"-row-viewed";

            var favicon = (sorted[i].faviconUrl.indexOf("://") != -1) ? sorted[i].faviconUrl
                        : sorted[i].faviconUrl ? sorted[i].baseUrl + sorted[i].faviconUrl : TN.gwm.img.favicon;

            var visited = TN.gwm.timestampToDelayStr(sorted[i].visitedTimestamp);

            var href = sorted[i].baseUrl + sorted[i].visitedUrl;

            var display = sorted[i].name.match(re) ? "" : "display: none";
    %>
        <tr id="<%= TN.gwm.id %>-row-<%= sorted[i].id %>" class="<%= cls %>" title="<%= sorted[i].baseUrl %>" style="<%= display %>">
            <td class="<%= TN.gwm.id %>-row-icon"><img
                    class="<%= TN.gwm.id %>-favicon" src="<%= favicon %>" alt=""
                    onerror="this.src=\'<%= TN.gwm.img.faviconBroken %>\';"
                    onabort="this.src=\'<%= TN.gwm.img.favicon %>\';" /></td>
            <td class="<%= TN.gwm.id %>-row-site"><a
                    href="<%= href %>"
                    onclick="return false;"
                    onfocus="this.blur();"><%= sorted[i].name %><span
                    class="<%= TN.gwm.id +"-row-viewed" %>">&nbsp;&#9658;</span></a></td>
            <td class="<%= TN.gwm.id %>-row-visited"><%= visited %></td>
        </tr>
    <%
        }

        /*** /print all rows *************************************************/

        if (!sorted.length) {
    %>
        <tr id="<%= TN.gwm.id %>-row-message" class="<%= TN.gwm.id %>-row-norows">
            <td colspan="3">
                <%= TN.gwm.name %><br />
                <br />
                <%= TN.gwm.version %><br />
                <%= TN.gwm.copyright %><br />
                <br />
                No sites have been added.<br />
                Why don\'t you add a few?
           </td>
        </tr>
    <%
        }
    %>
    </tbody>
    </table>
    <%
        if (TN.gwm.status.searchBox) {
    %>
    <div id="<%= TN.gwm.id %>-manager-searchbox"><span
        id="<%= TN.gwm.id %>-manager-searchbox-message">Search</span><input
        id="<%= TN.gwm.id %>-manager-searchbox-filter" type="text" value="<%= TN.gwm.status.searchFilter %>"
        title="Filter comics by regular expression"
    /></div>
    <%
        }
    %>
    <div id="<%= TN.gwm.id %>-manager-buttons"><%
        if (TN.gwm.currentSite.index === null) {
        %>
        <span id="<%= TN.gwm.id %>-button-new" class="<%= TN.gwm.id %>-button">Add new site</span><%
        } else {
        %><span id="<%= TN.gwm.id %>-button-saveposition" class="<%= TN.gwm.id %>-button">Save current position</span><%
        }
        %>
    </div>
]]></>.toString();

TN.gwm.html.info = <><![CDATA[
    <div id="<%= TN.gwm.id %>-info-close">&#9746;</div>
    <%
        if (TN.gwm.status.info !== "none") {
            var addedTimestamp = "not yet";
            var visitedTimestamp = "never";
            var site = TN.gwm.currentSite;
            if (TN.gwm.status.info !== "new" && TN.gwm.sites[TN.gwm.status.info]) {
                var site = TN.gwm.sites[TN.gwm.status.info];
                addedTimestamp = TN.gwm.timestampToStr(site.addedTimestamp);
                visitedTimestamp = TN.gwm.timestampToStr(site.visitedTimestamp);
            } else {
                TN.gwm.status.info = "new";
            }
            var name = site.name || "";
            var baseUrl = site.baseUrl || "";
            var visitedUrl = site.visitedUrl || "";
            var faviconUrl = site.faviconUrl || "";

            var favicon = (faviconUrl.indexOf("://") != -1) ? faviconUrl
                        : faviconUrl ? baseUrl + faviconUrl : TN.gwm.img.favicon;
    %>
    <table><tbody>
        <tr>
            <th>Name:</th>
            <td><input id="<%= TN.gwm.id %>-info-name" type="text" value="<%= name %>"
                title="Name of the site"
                /><img
                class="<%= TN.gwm.id %>-favicon" src="<%= favicon %>" alt=""
                onerror="this.src=\'<%= TN.gwm.img.faviconBroken %>\'"
                onabort="this.src=\'<%= TN.gwm.img.favicon %>\'" /></td>
        </tr>
        <tr>
            <th>Base URL:</th>
            <td><input id="<%= TN.gwm.id %>-info-baseurl" type="text" value="<%= baseUrl %>"
                title="Base URL is used for identifying the site. It can contain a partial path."
            /></td>
        </tr>
        <tr>
            <th>Favicon:</th>
            <td><input id="<%= TN.gwm.id %>-info-faviconurl" type="text" value="<%= faviconUrl %>"
                title="Icon of this site. Use full URL if icon is not located under the base URL."
            /></td>
        </tr>
        <tr>
            <th>Saved position:</th>
            <td><input id="<%= TN.gwm.id %>-info-visitedurl" type="text" value="<%= visitedUrl %>"
                title="Last saved position. This is always located under the base URL."
            /></td>
        </tr>
        <tr>
            <th>Site added:</th>
            <td><%= addedTimestamp %></td>
        </tr>
        <tr>
            <th>Last save:</th>
            <td><%= visitedTimestamp %></td>
        </tr>
    </tbody></table>
    <%
        if (TN.gwm.status.info === "new") {
    %>
    <div id="<%= TN.gwm.id %>-info-buttons">
        <span id="<%= TN.gwm.id %>-button-savenew" class="<%= TN.gwm.id %>-button">Add site</span>
        <span id="<%= TN.gwm.id %>-button-cancel"  class="<%= TN.gwm.id %>-button">Cancel</span>
    </div>
    <%
        } else { /* Edit old record */
    %>
    <div id="<%= TN.gwm.id %>-info-buttons">
        <span id="<%= TN.gwm.id %>-button-delete"  class="<%= TN.gwm.id %>-button">Delete site</span>
        <span id="<%= TN.gwm.id %>-button-saveold" class="<%= TN.gwm.id %>-button">Save changes</span>
        <span id="<%= TN.gwm.id %>-button-goto"    class="<%= TN.gwm.id %>-button">Go to saved position</span>
        <span id="<%= TN.gwm.id %>-button-cancel"  class="<%= TN.gwm.id %>-button">Cancel</span>
    </div>
    <%
        }
    } /* TN.gwm.status.info !== "none" */
    %>
]]></>.toString();

TN.gwm.html.importExport = <><![CDATA[
<div id="<%= TN.gwm.id %>-importexport">
    <div id="<%= TN.gwm.id %>-importexport-borders">
      <textarea id="<%= TN.gwm.id %>-importexport-data"></textarea><br>
      <span id="<%= TN.gwm.id %>-importexport-button" class="<%= TN.gwm.id %>-button">Import data</span>
    </div>
</div>
]]></>.toString();

/*** Libraries ***************************************************************/

/** TN Template Engine
 *
 *  Version 1.0, 17.4.2010-4-17
 *  Requires JavaScript 1.3 or better
 *
 *  Copyright (c) 2010 Tero Niemi (talamus(at-sign)gmail_dot_com)
 *  All worldwide rights reserved.
 *
 *  A very simple templating engine.
 *  Put javascript code inside <% %> and output inside <%= %>
 *
 *  Inside the template:
 *      - Use "" instead of '' for strings.
 *      - Use /* instead of // for javascript comments.
 */
TN.template = {

initialized: true,   /** This library is always available */
output: "",          /** Expanded template is stored here */

/** TN.template.expand(template)
 *
 *  Expand template to a string. Return the string.
 *
 *  @param template  (Template)  Template to be processed
 *  @returns         (String)    The result, also stored in TN.template.output
 */
expand: function(template) {
    TN.template.output = "";
    template = "%>"+ template +"<%";
    template = template.replace(/\n/g,  " ");
    template = template.replace(/<%=/g, "'; TN.template.output += "); // %>
    template = template.replace(/%>/g,  "; TN.template.output += '");
    template = template.replace(/<%/g,  "'; "); // %>
    (function(){ eval(template); })();
    return TN.template.output;
}

} /*** /TN.template ***/

/** TN CSS Class Tools
 *
 *  Version 1.0, 2007-6-28
 *  Requires JavaScript 1.3 or better
 *
 *  Copyright (c) 2007 Tero Niemi (talamus(at-sign)gmail_dot_com)
 *  All worldwide rights reserved.
 *
 *  Tools to manipulate CSS classes in DOM element objects.
 *
 *  The following methods are defined:
 *      TN.class.contains(obj, 'cls') - Does element contain CSS class?
 *      TN.class.add(obj, 'cls')      - Add class into element
 *      TN.class.remove(obj, 'cls')   - Remove class from element
 *
 *      TN.class.getFirstChild(obj, 'cls')
 *                          - Return the first child with required class
 *
 *      TN.class.getElementsByClass('cls'[, root][, 'TAG'])
 *                          - Return all elements with required class
 */
var TN = TN || { };
TN.class = {

initialized: true,   /** This library is always available */

/** TN.class.contains(obj, cls)
 *
 *  Does element contain CSS class?
 *
 *  @param obj  (Element)   Dom element object
 *  @param cls  (String)    Class name
 *  @returns    (Boolean)   True if contains, False otherwise
 */
contains: function(obj, cls) {
    if (!obj || !obj.className) return false;
    var str = ' ' + obj.className + ' ';
    return (str.indexOf(' ' + cls + ' ') >= 0);
},

/** TN.class.add(obj, cls)
 *
 *  Add class into element only if it is not already there.
 *
 *  @param obj    (Element)   Dom element object
 *  @param cls    (String)    Class name
 */
add: function(obj, cls) {
    if (!obj || TN.class.contains(obj, cls)) return;
    if (!obj.className) {
        obj.className = cls
    } else {
        obj.className += ' ' + cls;
    }
},

/** TN.class.remove(obj, cls)
 *
 *  Remove class from element, safely and cleanly.
 *
 *  This function is quick because it doesn't use
 *  regular expressions!
 *
 *  @param obj    (Element)   Dom element object
 *  @param cls    (String)    Class name
 */
remove: function(obj, cls) {
    if (!obj || !obj.className) return;
    cls = ' ' + cls + ' ';
    var str = ' ' + obj.className + ' ';
    if (cls == str) {
        obj.className = '';
        return;
    }
    var pos = str.indexOf(cls);
    if (pos < 0) return;
    str = str.substring(pos ? 1 : 0, pos)
        + str.substring(pos + cls.length - (pos ? 1 : 0), str.length - 1);
    obj.className = str;
},

/** TN.class.getFirstChild(obj, cls)
 *
 *  Returns first child of the element with required class.
 *
 *  @param obj  (Element)   Dom element object
 *  @param cls  (String)    Class name
 *  @returns    (Element)   First child with class, null if none
 */
/*
getFirstChild: function(obj, cls) {
    if (!obj || !obj.childNodes) return null;
    for (var i = 0; i < obj.childNodes.length; ++i) {
        if (TN.class.contains(obj.childNodes[i], cls)) {
            return obj.childNodes[i];
        }
    }
    return null;
},
*/
/** TN.class.getElementsByClass(cls[, root][, tag])
 *
 *  Returns array of elements with required class.
 *
 *  @param cls      (String)    Class name
 *  @param [root]   (Element)   Root node to start searching, default: document
 *  @param [tag]    (String)    Tag type to search, default: '*'
 *  @returns        (Array)     Array of elements, null if none
 */
getElementsByClass: function(cls, root, tag) {
    root = root || document;
    tag = tag || '*';
    if (!root.getElementsByTagName) return null;
    var classElements = new Array();
    var allElements = root.getElementsByTagName(tag);
    for (var i = allElements.length; i--;) {
        if (TN.class.contains(allElements[i], cls)) {
            classElements.push(allElements[i]);
        }
    }
    return (classElements.length)?(classElements):(null);
}

}; /*** /TN.class ***/

/** TN String Tools
 *
 *  Version 2.0, 2010-4-18
 *  Requires JavaScript 1.3 or better
 *
 *  Copyright (c) 2010 Tero Niemi (tniemi(at-sign)gmail_dot_com)
 *  All worldwide rights reserved.
 *
 *  Basic string tools.
 */
var TN = TN || { };
TN.str = {

initialized: true,  /** Always available */

/** TN.str.trim(str)
 *
 *  Trim whitespace from begin and end.
 *  (Actually this trims all control codes and space...)
 *
 *  @param str  (String)    String to be trimmed
 *  @return     (String)    Trimmed string
 */
trim: function(str) {
    var begin = 0;
    var end = str.length;
    while (begin < end && str.charCodeAt(begin++) < 33) {};
    while (end > begin && str.charCodeAt(--end) < 33) {};
    if (begin == end) return "";
    return str.substr(begin-1, end-begin+2);
}

}; /*** End of TN.str ***/

/*** JSON ********************************************************************/

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());

/*** Start Greased Webcomic Manager ******************************************/

TN.gwm.init();

// eof
