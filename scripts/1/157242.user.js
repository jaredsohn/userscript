// ==UserScript==
// @name            Google Drive Desktop Integration
// @namespace       https://github.com/mackatack/GoogleDriveDesktopIntegrator
// @version         0.9
// @description     UserScript to add a java-based desktop integrator to google drive
//                  This allows Google Drive users to click files in the online file browser
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match           https://drive.google.com/*
// @run-at          document-end
// @copyright       2013, mackatack@gmail.com
// @updateURL       http://userscripts.org/scripts/source/157242.meta.js
// ==/UserScript==

// Google drive has a few Iframes, check if we're the toplevel window
if (window == window.top)
	console.log("GoogleDriveDesktopIntegrator userScript initializing");
else {
	console.log("GoogleDriveDesktopIntegrator not loading, iFrame detected");
	return;
}

jQuery.noConflict();

(function($j) {

	var extentionRegexp = /\.(odt|ods|doc|docx|xls|xlsx|ppt|pptx|vsd|zip|ai|psd)$/im;

	// This array holds all the paths the java applet needs to open
	var pollerArray = [];

	// This boolean holds whether or not the applet has been started
	var integratorAppletStarted = false;

	// Make a list of functions we wish the expose to the applet
	var gdriveIntegratorFuncs = {

		// The Java applet calls this function on successfull initialization
		GoogleDriveDesktopIntegratorInit: function() {
			integratorAppletStarted = true;
			console.log("GoogleDriveDesktopIntegratorInit called");
		},

		// The applet is asking us if we have some files we might want to open
		// Just return the first value of the pollerArray
		GoogleDriveDesktopIntegratorPoll: function() {
			integratorAppletStarted = true;
			return pollerArray.pop();
		},

		// The applet was able to open the file
		GoogleDriveDesktopIntegratorSuccess: function() {
		},

		// The applet was unable to open the file
		GoogleDriveDesktopIntegratorFail: function() {
			// Dont't block the java applet, start the popup in a thread
			setTimeout(function(){
				alert("Unable to open the file you selected, please make sure it's synched locally!");
			},10);
		}
	};

	// Register the functions in the window and unsafeWindow
	for(fName in gdriveIntegratorFuncs) {
		window[fName] = gdriveIntegratorFuncs[fName];
		unsafeWindow[fName] = gdriveIntegratorFuncs[fName];
	}

    // Lets start the applet
    var docintegrator = $j("<applet id='docintegrator' scripable=true mayscript=true>").attr({
        name: 'GoogleDriveDesktopIntegrator',
        code: 'nl.org.mackatack.GoogleDriveDesktopIntegrator.IntegratorApplet',
        archive: 'https://github.com/mackatack/GoogleDriveDesktopIntegrator/blob/master/applet/jar/GoogleDriveIntegratorApplet.jar?raw=true&v=8'
    }).css({
        width: '250px',
        height: '24px',
		position: 'absolute',
        top: '0px',
        right: '0px',
		'z-index': '1000'
    });
    $j('BODY').append(docintegrator);

    // Find the authentication token
    var authTokenVariable = null;
    function findAuthToken() {
        var w = unsafeWindow || window;

        // Use the regexp one time to detect in which variable google drive is storing
        // the authentication token
        // We do this to support both custom domains and native gmail accounts and possibly
        // automatically supporting future versions
        if (!authTokenVariable) {
            var authTokenRegexp = /^[a-z0-9_-]{8,32}\.[a-z0-9_-]{10,32}\.[a-z0-9_-]{10,32}$/i;
    		for(p in w)
            	if (authTokenRegexp.test(w[p])) authTokenVariable=p;
        }

        // Once we have detected where the token is stored, just return it
        if (authTokenVariable)
            return w[authTokenVariable];

        GM_log("No token found!");
    }

    // Get information about a collection of entries from the server
    function getEntryInfo(docID, callback) {
        if (docID.join) docID = docID.join(',');
        GM_log('docintegrator performing file stat for ' + docID);
        $j.ajax({
            type: "POST",
            url: "dr",
            data: {docIds: docID, token: findAuthToken()}
        }).done(function(data) {
            if (!/^&&&START&&&/i.test(data)) {
                GM_log("ERROR IN AJAX RESPONSE: " + data);
                return;
            }
            callback($j.parseJSON(data.replace(/^&&&START&&&/i, '')));
        });
    }
    // Get the information for a single document
    function getDocInfo(docID, callback) {
        getEntryInfo(docID, function(data) {
            callback(data.response.docs[0]);
        });
    }

    // Download the parent information from the server, parent by parent
    function _requestParentPaths(parents, parentMeta, callback) {
        getEntryInfo(parents, function(data) {
            // This array holds the ids of parent that we still need to lookup
            var newParents = [];

            $j(data.response.docs).each(function(docNum, doc) {
                // Store the information in the cache
                parentMeta[doc.id] = doc;

                $j(doc.parents).each(function(pNum, parent) {
                    // Only do a lookup for the new parent if it's not in the cache.
                    if (!parentMeta[parent]) newParents.push(parent);
                });
            });

            // Still parents to find? Do it, otherwise call the callback
            if (newParents.length>0)
                _requestParentPaths(newParents, parentMeta, callback);
            else
                callback();
        });
    }
    // Recursively build the parent paths using a cache
    function _buildParentPaths(entryID, parentMeta) {
        if (!parentMeta[entryID].parents) return [[parentMeta[entryID].name]];

        var paths = [];
        $j(parentMeta[entryID].parents).each(function(pNum, parentID) {
            $j(_buildParentPaths(parentID, parentMeta)).each(function(rNum, result) {
                result.push(parentMeta[entryID].name);
                paths.push(result);
            });
        });
        return paths;
    }

    // Find the paths leading to the given parents;
    function findParentPaths(docData, callback) {
        if (!docData.parents) return callback([]);
        var parentMeta = {};
       	parentMeta[docData.id]=docData;

        // Find the parents by first requesting the google servers for all the information
        _requestParentPaths(docData.parents, parentMeta, function() {
            // We cached all the data locally, now lets traverse the tree and
            // build the file paths.
           	var paths = _buildParentPaths(docData.id, parentMeta);

            // All done, return our data
            callback(paths);
        });
    }

    // The user clicked a file, lets handle the click
    function handleFileClick(docName, linkObject) {

        GM_log('received click for ' + docName);

        // Lets see if it's any of the extentions we want to handle
        if (!extentionRegexp.test(docName)) return;

		// Lets first see if the applet has been started successfully, if not
		// show an error popup
		if (!integratorAppletStarted) {
			alert("GoogleDriveDesktopIntegrator was unable to open the file, java applet not started!");
			return false;
		}

        // Find the documentID by manipulating the DOMElement's ID a little
        var docID = linkObject.id.replace(/^.*\./g, "");

        // Find the parent for this document. We need to see if we have any paths
        // that lead to "My Drive". The JAVA integrator tries all the paths it can find
        // to open the file.
        getDocInfo(docID, function(docData){

            // Find the paths leading to this document
            findParentPaths(docData, function(pathArrays) {
                var paths = [];
                $j(pathArrays).each(function(pNum, pathArray){
                    delete pathArray[0];
                    // TODO: Handle special chars in the filename
                    paths.push(pathArray.join('/'));
                });

                console.log("Found the following paths to file " + docData.name + "\n\n" + paths.join("\n"));

				// Use the applet to open the file
                if (paths.length>0)
                	pollerArray.push(paths.join("\n"));
            });
        });

        return false;
    }

    // (Re)Hook all the file lists
    function hookTables() {
        // Trap any click on the file list and see if we clicked a file entry
        $j(".doclist-table").off().on("click", ".doclist-name", function(e){

            // Sometimes the target element holds the inner SPAN, so find the parent
            var nameObj = $j(e.target).closest('.doclist-name');

            // It seems the user clicked a file, lets see if we need to handle it
            return handleFileClick(nameObj.attr('title'), nameObj.closest('A').get(0))
        });
    }

    // If a listView is added, rehook the tables
    $j('#viewmanager').on('DOMNodeInserted', function(e) {
    	hookTables();
    });

    // Initial hooking of the file tables
    hookTables();
})(jQuery);