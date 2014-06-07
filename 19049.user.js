// This software is in the public domain
// Dmitry Rubinstein (C) 2008
//
// SVN log:
// ------------------------------------------------------------------------
// r3 | dimrub | 2008-01-05 23:47:26 +0200 (Sat, 05 Jan 2008) | 1 line
// 
// some very minor enhancements and some comments added
// ------------------------------------------------------------------------
// r1 | dimrub | 2008-01-05 13:31:05 +0200 (Sat, 05 Jan 2008) | 1 line
// 
// initial import
// ------------------------------------------------------------------------
// ==UserScript==
// @name           Fotki.com in Vox
// @namespace      http://dimrub.vox.com/
// @description    Add an ability to easily add photos from fotki.com to Vox posts through a user conduit, similar to other photo services such as photobucket and flickr, already natively supported by Vox.
// @include        http://www.vox.com/compose/
// ==/UserScript==

var DEBUG = false;

var ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

var names = {};
var list;
var app;
var username = '';

function debug(message)
{
    if (DEBUG) GM_log(message);
}

// Query is a valid Xpath expression
// Root is the node relative to which the query is performed
// (usually document).
// Type is one of the following:
//
// ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
// SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
// NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;
//
// returns undefined if the query has failed
function xpath(query, root, type)
{
    var res;
    try {
        res = document.evaluate(query, root, null, type, null);
    } catch (e) {
        debug("Failed to run an XPath query \"" + query + "\", got exception <" + e.name + ">, error was: <" + e.message + ">");
    } finally {
        return res;
    }
}


function getTagValue(node, tag)
{
    var res;
    try {
        res = node.getElementsByTagName(tag)[0].firstChild.nodeValue;
    } catch (e) {
        debug("Caught an error " + e.name + " while trying to fetch a value of tag " + tag + "under the node " + node + ": " + e.message);
    } finally {
        return res;
    }
}

// Processes the RSS feed, returns array of thumbnails' urls
function processFeed(text)
{
    var parser = new DOMParser();
    var dom = parser.parseFromString(text, 'application/xml');
    results = [];
    imgs = xpath('//item', dom, SNAP);
    if (!imgs) return null;
    for (var i = 0; i < imgs.snapshotLength; i++) {
        thisImg = imgs.snapshotItem(i);
        results[i] = {
            name: getTagValue(thisImg, 'title'),
            thumb_uri: getTagValue(thisImg,'guid')
        };
    }
    return results;
}

// Retrieves an RSS feed of a folder and puts it in the scrollbox
function goToFolder(evt)
{
    var folderID = this.getAttribute('folderID');
    var feedURI = 'http://feeds.fotki.com/' + username + '/album_' + folderID + '.rss';
    GM_xmlhttpRequest({
        method: 'GET',
        url: feedURI,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Referer': 'http://client.fotki.com/xppubwiz?cmd=publish&lcid=1033&langid=1033',
        },
        onload: function(responseDetails) {
            // Retrieve the feed and process it
            text = responseDetails.responseText;
            photos = processFeed(text);

            // Hide the folder list
            folderListDiv = document.getElementById('fotki-folder-list');
            folderListDiv.style.display = 'none';

            for (var i = 0; i < photos.length; i++) {
                names[photos[i].thumb_uri] = photos[i].name;
                list.addItem({
                    id : photos[i].thumb_uri,
                    basic: {
                        type: 'Photo',
                        name: photos[i].name,
                        uri: photos[i].thumb_uri
                    },
                    attributes: {
                        // Do we need both thumb and thumb_uri?
                        thumb: photos[i].thumb_uri,
                        thumb_uri: photos[i].thumb_uri
                    }
                });
            }
        }
    });
}

// Retrieves the list of folders from fotki, and adds it to the 
// scrollbox
function addFoldersListing(event)
{
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://client.fotki.com/xppubwiz?cmd=publish&lcid=1033&langid=1033',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Referer': 'http://client.fotki.com/xppubwiz?cmd=publish&lcid=1033&langid=1033',
            'Content-Type': 'application/x-www-form-urlencoded',
            // Cookie removed - apparently, when the user is logged in into
            // fotki.com, it is not required.
            //'Cookie': 's_id=FKPP2EPQMASN6VZUMAY42GUOE0OHYJEP; cart_cmd=; c=1'
        },
        // We don't ask for username and password - instead the user
        // must be logged in into fotki.com (more secure this way).
        data: 'cmd=check_cookies&save=on', //&login=' + user + '&password=' + pass + '&save=on',
        onload: function(responseDetails) {
            // Get the folders list
            text = responseDetails.responseText;
            lines = text.split(/\n/);
            var foldersText = '';
            // All of the folders are contained in a single line. We only
            // want that line (TODO: change it into a real HTML parsing).
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].search(/div class="tree"/) >= 0 ||
                lines[i].search(/stylesheet/) >= 0) {
                    foldersText += lines[i];
                }
            }
            // fotki.com gives us an extra '>' char in the end.
            foldersText = foldersText.replace(/>>/,'>');
            // Put it into the scroll box
            // TODO: handle the styles clash, which results in fotki's 
            // folder list looking ugly.
            foldersList = document.getElementById('fotki-folder-list');
            foldersList.innerHTML = foldersText;

            // Remove the password-protected folders
            var allDivs, thisDiv;
            allDivs = xpath('//div[@class="locked"]', foldersList, SNAP);
            if (allDivs) {
                for (var i = 0; i < allDivs.snapshotLength; i++) {
                    thisDiv = allDivs.snapshotItem(i);
                    next = thisDiv.nextSibling;
                    if (next) {
                        if (next.tagName == '#text')
                            next = thisDiv.nextSibling;
                        if (next.tagName == 'ul')
                            next.parentNode.removeChild(next);
                    }
                    thisDiv.parentNode.removeChild(thisDiv);
                }
            }

            // Now define the correct handlers to the links in the folder list
            var allLinks, thisLink;
            allLinks = xpath('//a[contains(@href, "sdone")]', foldersList, SNAP);
            if (allLinks) {
                for (var i = 0; i < allLinks.snapshotLength; i++) {
                    thisLink = allLinks.snapshotItem(i);
                    thisLink.addEventListener('click', goToFolder, true);
                    sdone = thisLink.href.replace(/^.*\'(.*)\'.*$/,"$1");
                    thisLink.href="javascript: void 0;";
                    thisLink.setAttribute('folderID', sdone);
                }
            }
        }
    });
}

// A callback being called after an asset has been created.
// TODO: should call the align dialog instead of using 
// hardcoded alignment settings.
function handleCreate( res, obj ) {
    if( res.error ) {
        alert( Template.templates.errorWord + res.error );
        return;
    }
    
    var xid = res.result.asset_id.toString() || obj.asset_id;
    app.assetCache.deleteItem( xid );

    // Somehow, Vox's code wraps an array in a custom object, which is then 
    // used for JSON encoding. We simulate same with a hardcoded 
    // toJSON function.
    tmpArray = new Array();
    tmpArray.push(xid);
    tmpArray.toJSON = function() {
        return "[\"" + xid + "\"]";
    }
    app.insertAsset({
        ids: tmpArray,
        format: 'auto',
        align: 'center'
    });
    this.close();
}

// A replacement for the conduit's OK button click handler -
// allows us to override the default action (which is to call
// the conduit's server side counterpart).
function conduitEventClick(event) {
    var command = this.getMouseEventCommand( event );
    switch( command ) {
        case "cancel":
            this.close();
            break;
        case "searchConduit":
            this.searchConduit();
            break;
        case "insertFromConduit":               
            var ids = this.list.getSelectedIDs();
            if( ids.length ) {
                // Actually, we only handle a single photo at a time
                // at this time.
                for (var i = 0; i < ids.length; i++) {
                    var asset = {
                        name: names[ids[i]],
                        // TODO: bells & whistles for the IMG tag?
                        body: "<img src=\"" + ids[i].replace(/-th./, "-vi.") + "\">"
                    };
                    app.c.createAssetFromEmbed( {
                        asset: asset,
                        callback: this._gIM( "handleCreate" )
                    } );
                }
            }
            break;
    }
}

// Handler for the action of double clicking on a photo.
// TODO: unite its body with the above handler for OK button
function conduitEventDoubleClick(listobj, elements) {
    var ids = listobj.getSelectedIDs();
    if( ids.length ) {
        for (var i = 0; i < ids.length; i++) {
            var asset = {
                name: names[ids[i]],
                body: "<img src=\"" + ids[i].replace(/-th./, "-vi.") + "\">"
            };
            app.c.createAssetFromEmbed( {
                asset: asset,
                callback: this._gIM( "handleCreate" )
            } );
        }
    }
}
    
// Add a tab for fotki
function addFotkiTab() {
    sourceTabbar = document.getElementById("source-tabbar");
    fotkiDiv = document.createElement('div');
    fotkiDiv.id = 'tab-conduit-fotki';
    fotkiDiv.addEventListener(
        'click', 
        function(evt) {    
            folderListDiv = document.getElementById('fotki-folder-list');
            folderListDiv.style.display = 'block';
        },
        true
    );
    fotkiDiv.innerHTML = "<a class=\"command-show-source-conduit-fotki left bar button\"><b>Fotki</b><s></s></a>";
    sourceTabbar.appendChild(fotkiDiv);
}

// Add the code for the panel
function addFotkiPanel() {
    div_new = document.createElement('div');
    div_new.id = "dialog-insert-asset-conduit-fotki";
    div_new.className =  "dialog-insert-asset-conduit-fotki dialog-insert-asset-conduit hidden";

    // TODO: throw away as much of the HTML below as possible
    div_new.innerHTML = 
        "    <div class=\"pkg dialog-content\">" + 
        "        <div class=\"tab-header\">" + 
        "            <a href=\"http://www.fotki.com/\" class=\"right command-open-window\">Fotki.com</a>" + 
        "            <div class=\"search\">" + 
        "                <div class=\"header2\">Choose the folder:</div>" + 
        "            </div>            " + 
        "        </div>" + 
        "        <div class=\"scrollbox chunk list-empty\" id=\"conduit-results-fotki\">" + 
        "                <dl class=\"list-empty-message\">" + 
        "                </dl>" + 
        "            " + 
        "            <dl class=\"list-no-results-message\">" + 
        "            </dl>" + 
        "            <div class=\"conduit-setup-message\">" + 
        "                " + 
        "            </div>" + 
        "        </div>" + 
        "        <div class=\"clr\"></div>" + 
        "        <div class=\"content-footer-spacing\">&nbsp;</div>" + 
        "        <div id=\"insert-asset-conduit-footer\" class=\"dialog-insert-asset-conduit-footer content-footer\">" + 
        "            <div class=\"pagination pkg\" id=\"insert-asset-conduit-fotki-pager\">&nbsp;</div>" + 
        "" + 
        "            <div id=\"privacy-settings-conduit\" class=\"privacy-settings left\">" + 
        "" + 
        "<div style=\"display:none\" class=\"viewer\">" + 
        "    <label for=\"asset-privacy-conduit-fotki\">Viewable by:</label>" + 
        "    <select tabindex=\"3\" id=\"asset-privacy-conduit-fotki\" class=\"asset-privacy-conduit-fotki asset-privacy\" name=\"post-default-privacy\">" + 
        "        " + 
        "        <option value=\"1\" selected=\"selected\">anyone</option>" + 
        "        " + 
        "        <option value=\"10\">neighborhood</option>" + 
        "        " + 
        "        <option value=\"21\">friends and family</option>" + 
        "        " + 
        "        <option value=\"11\">friends</option>" + 
        "        " + 
        "        <option value=\"12\">family</option>" + 
        "        " + 
        "        <option value=\"0\">you (hidden)</option>" + 
        "        " + 
        "    </select>" + 
        "</div>" + 
        "<div style=\"display:none\" class=\"commenter\">" + 
        "    <label for=\"asset-privacy-conduit-fotki\">Allow comments from:</label>" + 
        "    <select tabindex=\"3\" id=\"asset-commenters-conduit-fotki\" class=\"asset-commenters-conduit-fotki asset-commenters\" name=\"post-default-commenters\">" + 
        "            <option value=\"1\" selected=\"selected\">anyone</option>" + 
        "    <option value=\"10\">neighborhood</option>" + 
        "    <option value=\"21\">friends and family</option>" + 
        "    <option value=\"11\">friends</option>" + 
        "    <option value=\"12\">family</option>" + 
        "    <option value=\"0\">nobody</option>" + 
        "" + 
        "" + 
        "    </select>" + 
        "</div>" + 
        "" + 
        "            </div>" + 
        "            <div class=\"clr\"></div>" + 
        "            <div style=\"display:none\" class=\"left\">" + 
        "<input id=\"exclude-offensive-conduit-fotki\" class=\"exclude-offensive-conduit exclude-offensive-conduit-fotki checkbox\" name=\"exclude-offensive\" type=\"checkbox\"><span class=\"offensive-text\">This may be offensive or otherwise not for the public. Exclude from public explore pages.</span>" + 
        "" + 
        "            </div>" + 
        "            <div class=\"clr\"></div>" + 
        "            <a class=\"command-insert-from-conduit right default button\"><b>OK</b><s></s></a>" + 
        "" + 
        "            <a class=\"command-cancel right button\"><b>Cancel</b><s></s></a>" + 
        "" + 
        "        </div>" + 
        "    </div>";

    vh1EyeCandyDiv2 = document.getElementById("dialog-insert-asset-conduit-eyecandy");
    vh1EyeCandyDiv2.parentNode.insertBefore(div_new, vh1EyeCandyDiv2.nextSibling);

    var scrollBox = document.getElementById('conduit-results-fotki');

    // Add a div for the photo thumbnails
    photosList = document.createElement('div');
    photosList.id = 'fotki-photos-list';
    scrollBox.appendChild(photosList);

    // And another one for the folder list
    folderList = document.createElement('div');
    folderList.id = 'fotki-folder-list';
    scrollBox.appendChild(folderList);

}


// Perform all the initializations that depend upon availability of the 
// app object
function doAfterAppAppears() {
    app = window.wrappedJSObject.App.singleton;
    if (!app) {
        setTimeout(doAfterAppAppears, 1000);
        return;
    }
    var conduits = window.wrappedJSObject.ArcheType.UserConduits;
    conduits.push( { name: 'Fotki', provides: [ 'Photo' ] } );
    conduits.PRESENTATION['ConduitFotki'] = {action: "Insert", stackOrder: 98, perPage: 14};


    var DOM = window.wrappedJSObject.DOM;
    var insertAsset = app.dialogs.insertAsset;
    var sourceNames = insertAsset.sourceNames;
    sourceNames.push("ConduitFotki");
    var id = insertAsset.element.id + "-conduit-fotki";
    var element = DOM.getElement(id);
    var constructor = window.wrappedJSObject.ArcheType.InsertAsset.Conduit;
	var component=new constructor(element,"ConduitFotki");
	component.addObserver(insertAsset);
	insertAsset.sources.push(component);
	insertAsset.sourceMap["ConduitFotki"]=component;
	insertAsset.addComponent(component);
    list = component.list;
    list.setOption("singleSelect", true);
    component.eventClick = conduitEventClick;
    component.listItemsDoubleClicked = conduitEventDoubleClick;
    component.handleCreate = handleCreate;
}

function getUsername()
{
    username = GM_getValue("fotki_username");
    if (!username) {
        username = prompt("Enter your Fotki.com username ");
        GM_setValue("fotki_username", username);
    }
}

getUsername();
addFotkiTab();
addFotkiPanel();
addFoldersListing();
setTimeout(doAfterAppAppears, 1000);

