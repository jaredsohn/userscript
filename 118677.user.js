// ==UserScript==
// @name           PathRecorder
// @namespace      jirina42@seznam.cz
// @description    Records the path you go and stores it. It then allows you to show the path on the nav screen and follow it easily.
// @include        http*://*.pardus.at/main.php*
// @version	   1.6
// @grant	GM_setValue
// @grant	GM_deleteValue
// @grant	GM_getValue
// @grant	GM_log
// ==/UserScript==

// Changes in 1.6:
// 1. Grant for GM calls
// 2. Simplified header
// 3. Navscreen path points were not showing when menu closed

// Changes in 1.5:
// 1. paths recorded without partial refresh now still work when pf is activated
// 2. per universe paths. old paths are imported to each uni.
// 3. more pardus style table but it's still far from perfect.
// 4. changed [D] to [G] for compatibilty with another script.

// ////////////////////////////////////////////////////////////////////////
// Support for 'cookies'
// There are two types of cookies used here
// 1. Permanent cookies implemented using the GM SetValue and GetValue functions
// 2. Session-scope using the sessionStorage FF features
// The second one has to be used when runing functions directly from unsafeWindow
// while the first one can only be used in the GM sandbox.
// ////////////////////////////////////////////////////////////////////////

function GMcreateCookie(name,value) {
    // We use the write-through cache here. Everything written to the permanent
    // storage is written to the session storage as well so that it can be used immediately
    GM_setValue(name,value);
    createCookie (name, value);
}

function GMreadCookie(name, override) {
    // Check first if we have the value in the local storage and return it if so.
    // In case the Override is set to True, we read the GM value anyway and write
    // it into the local storage once again.
    
    //var local = readCookie (name);
    //if (local && override != true) return local;
    
    // Try to read teh GM value and return it
    try {
            var temp = GM_getValue(name);
            if(temp) {
                createCookie (name, temp);
                return temp;
            }
            return null;
    } catch(err) {
            return null;
    }
    return null;
}

function GMeraseCookie(name) {
    GM_deleteValue(name);
    eraseCookie (name);
}

function createCookie(name, value) {
    localStorage.setItem(name, value); 
}

function readCookie (name) {
    return localStorage.getItem(name);
}


function eraseCookie(name) {
	localStorage.removeItem(name);
}

// ////////////////////////////////////////////////////////////////////////
// 
// ////////////////////////////////////////////////////////////////////////
function ajax () {
    return unsafeWindow.ajax;
}

function getUniverse () {
    var text = document.URL;
    return text.split ("//")[1].split(".")[0];
}

function getUserloc () {
    return unsafeWindow.userloc;
}

function clearPath () {
    eraseCookie ("pr_nodes");
    showNodes ();
}

function clearLast () {
    var nodes = readCookie ("pr_nodes");

    if (nodes == null || nodes == "") {
        return;
    } else {
        // Unpack the saved nodes and check if the last one is the current one. If so, we won't add it again.
        var rows = document.createElement ("table");
        rows.innerHTML = "<tbody></tbody>";
        rows.firstChild.innerHTML = nodes;
        rows.firstChild.removeChild(rows.firstChild.lastChild);
        createCookie ("pr_nodes", rows.firstChild.innerHTML);
        showNodes ();
    }
 }

var prPaths = "pr_paths_" + getUniverse();
var prPathsHeader = "pr_paths_header_" + getUniverse();

// import old paths
var paths = GMreadCookie("pr_paths");
if (paths) {
	GMcreateCookie("pr_paths_orion", paths);
	GMcreateCookie("pr_paths_artemis", paths);
	GMcreateCookie("pr_paths_pegasus", paths);
	GMeraseCookie("pr_paths");
	GM_log("paths imported");
}

function getLocation (statusPanel) {
    if (!statusPanel) {
        statusPanel = unsafeWindow.statusTab;
	if (!statusPanel)
	    statusPanel = document.getElementById ("status_content");
    }

    var sector = null;
    var loc = null;
    // Loop over SPAN elements and find those for Sector and Coords
    var spans = statusPanel.getElementsByTagName ("span");
    for (i=0; i<spans.length; i++) {
        if (sector && loc) break;
        if (spans[i].id == "sector")
            sector = spans[i];
        if (spans[i].id == "coords")
            loc = spans[i];
    }
    var name = "";
    var coords = "";
    
	// must use textContent instead of innerHTML because quick commands makes coordinates into link
    if (sector.childNodes[0].nodeType == 1) {
        name = sector.childNodes[0].textContent;
        coords = loc.childNodes[0].textContent;
    } else {
        name = sector.textContent;
        coords = loc.textContent;
    }

    return name+" "+coords;
}

function pr_go_next () {
    var curr = document.getElementById ("pr_current_node_mark");
    if (!curr) {
        return;
    }
    
    // Get the next node and check if it does exist
    var next = curr.parentNode.nextSibling;
    if (!next) {
        return;
    }
    
    // OK, we have the next node so let's click on it
    var lnk = next.getElementsByTagName ("a")[0];
	var goHref = lnk.href;
	
	// Replace nav with navAjax when partial refresh is active. this way paths recorded without partial 
	// refresh still work
	if (unsafeWindow.ajax == true) 
		goHref = goHref.replace("nav(", "navAjax(")
	else
		goHref = goHref.replace("navAjax(", "nav(");

    location.assign (goHref);
}
unsafeWindow.pr_go_next = pr_go_next;

function pr_hotkey (evt) {
    if (evt.target.tagName == "INPUT") return;
    var key = evt.which;

    if (key == 71) {
        pr_go_next();
        return;
    }
    if (key == 113) {
        // Process the F2 key = load first available path
        goAvailablePath (null, null, null, 1);
        return;
    }
}
unsafeWindow.pr_hotkey = pr_hotkey;
unsafeWindow.document.addEventListener ("keydown", function (evt){pr_hotkey(evt);}, true); // The G key

function markCurentTile (row, rowindex) {
    var doc = unsafeWindow.document;
    var nava = doc.getElementById ("nav");
    var navt = doc.getElementById ("navtransition");
    var nav = null;

    // Find the right HTML element showing the nav area
    if (!nav && !navt) return;
    if (nava) {
        if (nava.style.display == "block"){
            nav = nava;
        }
    }
    if (navt) {
        if (navt.style.display == "block"){
            nav = navt;
        }
    }
    if (!nav) return;

    // Find the corresponding element on the nav screen
    var id = row.id;
    var links = nav.getElementsByTagName ("a");
    var tileid = null;
    var tilelnk = null;
    for (var i=0; i<links.length; i++) {
        var oncl = String(links[i].getAttribute ("onclick"));
        if (!oncl) continue;
        var mid = oncl.split("(")[1];
        if (!mid) continue;
        tileid = mid.split(")")[0];
        if (!tileid) continue;
        if (tileid == id){
            tilelnk = links[i];
            break;
        }
    }

    // Highlight the tile found
    if (tilelnk) {
        //tilelnk.parentNode.setAttribute ("style", "border: 1px dotted lime;");
        // Check if there's the IMG tag
        var child = tilelnk.firstChild;
        if (child && child.tagName == "IMG") {
            var tbl = doc.createElement ("table");
            tbl.setAttribute ("width", "64");
            tbl.setAttribute ("height", "64");
            tbl.setAttribute ("cellspacing", "0");
            tbl.setAttribute ("cellpadding", "0");
            //tbl.setAttribute ("border", "0");
            tbl.setAttribute ("style", "border: 1px dotted lime;");
            tbl.setAttribute ("background", child.getAttribute ("src"));
            tbl.innerHTML = "<tbody><tr><td style='vertical-align: top;'><font color=lime>"+(rowindex+1)+"</font></td></tr></tbody>";
            tilelnk.removeChild(child);
            tilelnk.appendChild (tbl);
        }
    }
}

function markCurrentNode () {
    // Check if the recorder is open
    var rec = document.getElementById ("pr_nodes");
    if (!rec) {
        return;
    }

    // Get the location ID and name
    var userloc = getUserloc ();
    var location = getLocation ();
    var sector = location.split(" ")[0];
    
    // Get the current node index indicator so that we can set it later
    var curr = document.getElementById ("pr_current_node_index");
    
    // Loop over the locations shown in the recorder and check if any of them equals to the userloc.
    // We're also searching for the previously marked one.
    var current = null;
    var old = null;
    var currentID = null;
    for (i=0; i<rec.childNodes.length; i++) {
        var row = rec.childNodes[i];
        if (row.id == userloc){ // || row.getAttribute ("jumpID") == userloc){
            if (!current) {
                // set the current node in case it's not set yet
                current = row;
                currentID = i;
            } else if (current && old) {
                // ... or in case that we already have the current (the same tile is twice in the path)
                // but only if we have already crossed the previous current tile
                current = row;
                currentID = i;
            }
        }
        if (!old) {
            for (y=0; y<row.childNodes.length; y++) {
                if (row.childNodes[y].id == "pr_current_node_mark") {
                    old = row.childNodes[y];  
                    break;
                }
            }
        }
        if (row.getAttribute ("name")==sector || row.getAttribute ("viewSector")==sector) {
            // We're in the right sector so let's try to mark the corresponding nav screen tile
            markCurentTile (row,i);
        }
    }
    
    // Set the current node indicator
    curr.removeChild (curr.firstChild);
    if (currentID != null)
        curr.appendChild (document.createTextNode (currentID+1));
    else
        curr.appendChild (document.createTextNode ("?"));

    // OK, in case we've found the current node, let's mark it so
    if (current) {
        if (!old) {
            old = document.createElement ("td");
            old.id = "pr_current_node_mark";
            old.setAttribute ("style", "font-weight: bold; color: lime; padding-left: 5px;");
            old.appendChild(document.createTextNode ("<<"));
        }
        old.setAttribute ("pr_position", currentID);
        current.appendChild (old);
    } else {
        if (old) {
            old.parentNode.removeChild(old);
        }
    }

    if ((((currentID+1) == rec.childNodes.length) || rec.childNodes.length == 0) && readCookie ("pr_recording") != "yes") {
        if (current) {
            //clearPath ();
        }
        var recorder = readCookie ("pr_status") == "Recorder";
        var paths = document.getElementById ("pr_load_rows").childNodes.length;
        if (paths > 0) {
            if (!recorder) {
                showRecorder ();
            }
            showLoadMenu ();
        } else {
//            if (recorder)
//                closeRecorder ();
        }
    }
}

function showNodes () {
    var savedNodes = readCookie ("pr_nodes");

    // Find the table to add the info to
    var nodes = document.getElementById ("pr_nodes");
    var newnodes = document.createElement ("tbody");
    newnodes.id = "pr_nodes";

    if (nodes){
        var par = nodes.parentNode;
        par.removeChild (nodes);
        par.appendChild (newnodes);
    } else {
        var par = document.createElement ("table");
        par.appendChild (newnodes);
    }
 
    // read the saved nodes and add them into the tbody
    var rec = document.getElementById ("pr_nodes_recorded");
    if (rec.firstChild){
        rec.removeChild (rec.firstChild);
    }
    if (savedNodes) {
            newnodes.innerHTML = savedNodes;
            rec.appendChild (document.createTextNode (newnodes.childNodes.length));
    } else {
        rec.appendChild (document.createTextNode ("0"));
    }
       
    // Mark the node we're staying on
    markCurrentNode ();
}

function addCurrentLocation () {
    // Get the current location and userloc
    var userloc = getUserloc ();
    var navUserloc = userloc;
    var loc = getLocation ();
    var sector = loc.split(" ")[0];
    var viewSector = sector;
    var location = loc;
    var nav = ajax()?"navAjax":"nav";

    // Get the saved nodes list
    var nodes = readCookie ("pr_nodes");
    var no = 1;
    if (nodes == null || nodes == "") {
        nodes = "";
    } else {
        // Unpack the saved nodes and check if the last one is the current one. If so, we won't add it again.
        var rows = document.createElement ("table");
        rows.innerHTML = "<tbody></tbody>";
        rows.firstChild.innerHTML = nodes;
        no = rows.firstChild.childNodes.length + 1;
        if (rows.firstChild.lastChild.id == userloc)
            return;
        if (rows.firstChild.lastChild.getAttribute("name") != sector){
            nav = ajax()?"warpAjax":"warp";
            navUserloc = rows.firstChild.lastChild.id;
            location = ">> "+location;
            viewSector = rows.firstChild.lastChild.getAttribute("name");
        }
    }
  
    // Compose the corrent location info
    var node = document.createElement ("table");
    node.innerHTML = "<tbody><tr id="+userloc+" name="+sector+" jumpID="+navUserloc+" viewSector="+viewSector+" location=\""+loc+"\"><td>"+no+"."+"</td><td><a href=\"javascript:"+nav+"("+navUserloc+");void(0)\">"+location+"</a></td></tr></tbody>";

    // Add the corrent node to the end   
    nodes += node.firstChild.innerHTML;
    createCookie ("pr_nodes", nodes);
    showNodes ();
    //markCurrentNode ();
}

function stopRecording () {
    createCookie ("pr_recording", "no");
    
    // Find the calling link and get it back
    var lnk = document.getElementById("pr_record");
    lnk.removeChild(lnk.childNodes[0]);
    lnk.appendChild(document.createTextNode("Rec"));
    lnk.removeEventListener("click", stopRecording, true);
    lnk.addEventListener("click", startRecording, true);
    lnk.parentNode.style.backgroundColor = "lime";
    lnk.parentNode.style.color = "black";
}

function startRecording () {

    // Find the calling link and get it back
    var lnk = document.getElementById("pr_record");
    lnk.removeChild(lnk.childNodes[0]);
    lnk.appendChild(document.createTextNode("Stop"));
    lnk.removeEventListener("click", startRecording, true);
    lnk.addEventListener("click", stopRecording, true);
    lnk.parentNode.style.backgroundColor = "red";
    lnk.parentNode.style.color = "white";
    createCookie ("pr_recording", "yes");
    
    // Add the first node right away
    addCurrentLocation ();
}

function showLoadMenu () {
    createCookie ("pr_shown_section", "load");
    stopRecording ();
    
    document.getElementById("pr_show_load").parentNode.style.backgroundColor="gray";
    document.getElementById("pr_show_load").parentNode.style.color="white";
    document.getElementById("pr_show_file").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_file").parentNode.style.color="";
    document.getElementById("pr_show_record").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_record").parentNode.style.color="";
    
    document.getElementById("pr_load_menu").style.display="block";
    document.getElementById("pr_load_pane").style.display="block";
    document.getElementById("pr_record_menu").style.display="none";
    document.getElementById("pr_record_pane").style.display="none";
    document.getElementById("pr_file_menu").style.display="none";
    document.getElementById("pr_file_pane").style.display="none";
}

function showFileMenu () {
    createCookie ("pr_shown_section", "file");
    stopRecording ();
    
    document.getElementById("pr_show_file").parentNode.style.backgroundColor="gray";
    document.getElementById("pr_show_file").parentNode.style.color="white";
    document.getElementById("pr_show_record").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_record").parentNode.style.color="";
    document.getElementById("pr_show_load").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_load").parentNode.style.color="";
    
    document.getElementById("pr_load_menu").style.display="none";
    document.getElementById("pr_load_pane").style.display="none";
    document.getElementById("pr_record_menu").style.display="none";
    document.getElementById("pr_record_pane").style.display="none";
    document.getElementById("pr_file_menu").style.display="block";
    document.getElementById("pr_file_pane").style.display="block";
    
    // Set the current location as the default path name
    document.getElementById("pr_file_save_name").value = getLocation();
}

function showRecordMenu () {
    createCookie ("pr_shown_section", "record");
    
    document.getElementById("pr_show_file").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_file").parentNode.style.color="";
    document.getElementById("pr_show_record").parentNode.style.backgroundColor="gray";
    document.getElementById("pr_show_record").parentNode.style.color="white";
    document.getElementById("pr_show_load").parentNode.style.backgroundColor="";
    document.getElementById("pr_show_load").parentNode.style.color="";
    
    document.getElementById("pr_load_menu").style.display="none";
    document.getElementById("pr_load_pane").style.display="none";
    document.getElementById("pr_record_menu").style.display="block";
    document.getElementById("pr_record_pane").style.display="block";
    document.getElementById("pr_file_menu").style.display="none";
    document.getElementById("pr_file_pane").style.display="none";
    
    // begin recording if necessary
    if (readCookie("pr_recording") == "yes")
        startRecording ();

}

function clearSavedPaths () {
    var answer = confirm ("This action will delete all saved paths in all universes. Do you want to continue (OK) or Cancel?");
    if (!answer) return;
    
    GMeraseCookie  (prPaths);
    readPathsHeader ()
}

function loadAvailablePath (universe, userloc, filename, index) {
    var paths = readCookie (prPaths);
    if (!paths) return;
    
    var div = document.createElement ("div");
    div.innerHTML = paths;
    var rows = div.firstChild.firstChild;
    
    // Chck if we have the hotkey index. If so (a 1-9 key has been pushed) but the corresponding path does not exist, just return.
    // Check if there is any saved header
    if (index) {
        var paths = document.getElementById ("pr_load_rows");
        if (paths.childNodes.length < index) return;
        universe = paths.childNodes[index-1].getAttribute ("startuni");
        userloc = paths.childNodes[index-1].getAttribute ("startloc");
        filename = paths.childNodes[index-1].getAttribute ("filename");
    }

    for (var i=0; i<rows.childNodes.length; i++) {
        if (rows.childNodes[i].getAttribute("startloc") == userloc && rows.childNodes[i].getAttribute("startuni") == universe && rows.childNodes[i].getAttribute("filename") == filename) {
            var path = rows.childNodes[i].firstChild.firstChild.firstChild;
            clearPath ();
            createCookie ("pr_nodes", path.innerHTML);
            showNodes ();
            showRecordMenu ();
            return;
        }
    }
}
unsafeWindow.loadAvailablePath = loadAvailablePath;

function goAvailablePath (universe, userloc, filename, index) {
    // Load the available path into recorder and go to the next node immediately
    loadAvailablePath (universe, userloc, filename, index);
    pr_go_next ();
}
unsafeWindow.goAvailablePath = goAvailablePath;

function deleteAvailablePath () {
    var answer = confirm ("Do you really want to delete the selected path? If so, push the OK button.");
    if (!answer) return;
    
    var universe = this.parentNode.parentNode.getAttribute ("startuni");
    var userloc = this.parentNode.parentNode.getAttribute ("startloc");
    var filename = this.parentNode.parentNode.getAttribute ("filename");
    var paths = GMreadCookie (prPaths);
    var div = document.createElement ("div");
    div.innerHTML = paths;
    var rows = div.firstChild.firstChild;
    
    for (var i=0; i<rows.childNodes.length; i++) {
        if (rows.childNodes[i].getAttribute("startloc") == userloc && rows.childNodes[i].getAttribute("startuni") == universe && rows.childNodes[i].getAttribute("filename") == filename) {
            rows.removeChild (rows.childNodes[i]);
            GMcreateCookie (prPaths, div.innerHTML);
            readPathsHeader ();
            showAvailablePaths ();
            return;
        }
    }
}

function showAvailablePaths (showAll) {
    // Called when the shop moves. The purpose is to show all paths starting at the
    // current ship's location so that the pilot can possibly switch to another path.
    var universe = getUniverse ();
    var userloc = getUserloc ();
    
    // Remove the old rows
    var paths = document.getElementById ("pr_load_rows");
    var len = paths.childNodes.length;
    for (var i=0; i<len; i++) {
        paths.removeChild (paths.firstChild);
    }
    
    // Check if there is any saved header
    var header = readCookie(prPathsHeader);
    if (!header  || paths === 'undefined') return 0;
    var div = document.createElement ("div");
    div.innerHTML = header;
 
    // Loop over the header rows and find these which start on the current tile.
    // We're moving elements to a new collection within the loop so we have to do the little trick with the 'y' variable
    var no = 0;
    var y = 0;
    var rows = div.firstChild.firstChild;
    var len = rows.childNodes.length;
    for (var i=0; i<len; i++) {
        var aRow = rows.childNodes[y];
        if (!aRow) break;
        if ((aRow.getAttribute("startuni") == universe && aRow.getAttribute("startloc") == userloc) || showAll){
            no ++;
            paths.appendChild (aRow);
            // Add the index in front of the filename. This will also work
            // as a hotkey.
            var td = document.createElement ("td");
            td.appendChild (document.createTextNode (no+". "));
            aRow.insertBefore (td, aRow.firstChild);
            var td = document.createElement ("td");
            
            // Add the Delete link
            var td = document.createElement ("td");
            td.appendChild (document.createTextNode ("|"));
            aRow.appendChild (td);
            var td = document.createElement ("td");
            td.innerHTML = "<a style='color: red;' title='Delete this path. There is no un-delete function!'>Del</a>";
            td.firstChild.addEventListener ("click", deleteAvailablePath, true);
            aRow.appendChild (td);
        } else
            y++;
    }
    
    return no;
}

function showAllPaths () {
    showAvailablePaths (true);
}

function readPathsHeader () {
    // Read saved paths
    var div = document.createElement ("div");
    var paths = GMreadCookie (prPaths);
    if (paths && paths != 'undefined') {
        div.innerHTML = paths;
    } else {
        eraseCookie (prPathsHeader);
        return;
    }
 
    // Loop over paths and remove their content. Just header should stay
    var row = div.firstChild.firstChild;
    var len = row.childNodes.length;
    for (var i=0; i<len; i++) {
        var path = row.childNodes[i];
        var title = "Load&Go: "+path.firstChild.firstChild.firstChild.firstChild.getAttribute ("location")+" --> "+path.firstChild.firstChild.firstChild.lastChild.getAttribute ("location");
        var attrs = "'"+path.getAttribute ("startuni")+"','"+path.getAttribute ("startloc")+
                    "','"+path.getAttribute ("filename")+"'";
        path.removeChild (path.firstChild);
        path.innerHTML = "<td><a>"+path.getAttribute ("filename")+"</a></td>";
        var lnk = path.firstChild.firstChild;
        lnk.setAttribute ("title", title);
        lnk.setAttribute ("style", "color:lime;");
        lnk.setAttribute ("href", "javascript:goAvailablePath("+attrs+")");
        
        // Add the Load and Delete links
        var td = document.createElement ("td");
        td.innerHTML = "<span> </span>";
        path.appendChild (td);
        var td = document.createElement ("td");
        td.innerHTML = "<a>Load</a>";
        td.firstChild.setAttribute ("href", "javascript:loadAvailablePath("+attrs+")");
        td.firstChild.setAttribute ("title", "Load this path into the recorder but don't move the ship");
        path.appendChild (td);
    }
    
    // Save the header
    createCookie (prPathsHeader, div.innerHTML);
//GM_log (div.innerHTML);
}

function savePathAs () {
    // Check if a name has been provided
    var name = document.getElementById("pr_file_save_name");
    if (!name.value) {
        alert ("Please provide a name for the path.");
        return;
    }
    
    var nodes = readCookie ("pr_nodes");
    if (nodes == null || nodes == "") {
        alert ("There's nothing to be saved. Please create a path first.");
        return;
    }
    
    // Unpack the saved nodes 
    var rows = document.createElement ("table");
    rows.innerHTML = "<tbody></tbody>";
    rows.firstChild.innerHTML = nodes;
    
    // Get the first location and put it in front of the path name
    var filename = name.value; 
    rows.setAttribute ("filename", filename);

    // Read the directory or create a new one if it does not exist yet
    var universe = getUniverse ();
    var userloc = getUserloc ();
    var paths = GMreadCookie (prPaths);
    var div = document.createElement ("div");
    if (!paths || paths === 'undefined') {
        div.innerHTML = "<table><tbody></tbody></table>";
        GMcreateCookie (prPaths, div.innerHTML);
    } else {
        div.innerHTML = paths;
    }
    var tb = div.firstChild.firstChild;
    
    // Check if a path with the same name already exists
    var oldtr = null;
    for (var i=0; i<tb.childNodes.length; i++) {
        var rec = tb.childNodes[i];
        if (rec.getAttribute ("filename") == filename && rec.getAttribute("startuni") == universe && rec.getAttribute("startloc") == userloc) {
            // It does already exist so we have to ask the user if they want to overwrite or cancel.
            var answer = confirm ("A path with the same name already exists. Do you want to overwrite it (OK) or will you chose a different name (Cancel)?");
            if (answer) {
                oldtr = tb.childNodes[i];
            } else {
                return;
            }
            break;
        }
    }
    
    // Add the curent path into the list
    var tr = oldtr;
    if (!tr)
        tr = document.createElement ("tr");
    else
        tr.removeChild (tr.firstChild);    
    tr.setAttribute ("filename", filename);
    tr.setAttribute ("startloc", rows.firstChild.firstChild.id);
    tr.setAttribute ("startsec", rows.firstChild.firstChild.getAttribute ("viewSector"));
    tr.setAttribute ("startuni", universe);
    tr.appendChild (document.createElement ("td"));
    tr.firstChild.appendChild (rows);
    tb.appendChild (tr);

    // Save the updated directory back to cookies
    GMcreateCookie (prPaths, div.innerHTML);

    // Erase the textbox
    document.getElementById("pr_file_save_name").value = "";
    
    // Read the header information into the standard cookies so that it can be accessed online
    readPathsHeader ();
}

function buildRecorder () {
    // Check if rec is here already and don't build it again if so
    var rec = document.getElementById ("pr_recorder");
    if (rec)
        return;
    
    // Find the data element
    var topDiv = document.getElementById ("pr_data");

    // Create the recorder's content and install it
    topDiv.innerHTML = "<table id=pr_recorder cellpadding=0 cellspacing=0 style=\"display: none;\">\
                        <tbody>\
                            <tr id=pr_top_menu>\
                                <td>\
                                    <table>\
                                        <tbody>\
                                            <tr>\
                                                <td><a id=pr_show_file title='Save/Export/Import paths'>File</a></td>\
                                                <td><a id=pr_show_record title='Work with the current path. You can record a new path here.'>Current path</a></td>\
                                                <td><a id=pr_show_load title='List of saved paths starting at current tile. You can load/delete paths here.'>All paths</a></td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_record_menu>\
                                <td>\
                                    <table>\
                                        <tbody>\
                                            <tr>\
                                                <td><a id=pr_clear_nodes title='Clear all recorded nodes from the current path.'>Clear</a></td>\
                                                <td><a id=pr_clear_last title='Clear the last node in the current path.'>Last</a></td>\
                                                <td>|</td>\
                                                <td style=\"background-color:lime;color:black;font-weight:bold;\"><a id=pr_record title='Start/Stop automatic recording. All your moves will be recorded until you say stop.'>Rec</a></td>\
                                                <td>|</td>\
                                                <td><a id=pr_add_node title='Add the current position in the end of the current path.'>Add</a></td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_record_pane>\
                                <td>\
                                    <table cellspacing=0 cellpadding=0>\
                                        <tbody id=pr_nodes></tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_file_menu>\
                                <td>\
                                    <table>\
                                        <tbody>\
                                            <tr>\
                                                <td><a title='Not implemented yet.'>Import</a></td>\
                                                <td><a title='Not implemented yet.'>Export</a></td>\
                                                <td><a id=pr_clear_saved_paths title='Deletes all saved paths. Ireversible action!!!'>Clear</a></td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_file_pane>\
                                <td>\
                                    <table cellspacing=0 cellpadding=0>\
                                        <tbody><tr><td>\
                                            <form name=pr_file_save_form id=pr_file_save_form>\
                                                <a href='javascript:document.getElementById(\"pr_file_save_name\").value=prompt(\"Enter path name\");void(0);'>Save current path as:</a><br>\
                                                <input type=text name=pr_file_save_name id=pr_file_save_name size=20>\
                                                <input type=button name=pr_file_save_btn value=Save id=pr_file_save_btn>\
                                            </form>\
                                        </td></tr></tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_load_menu>\
                                <td>\
                                    <table>\
                                        <tbody>\
                                            <tr>\
                                                <td><a id=pr_show_all title='Shows all saved paths including those which do NOT start at the current tile.'>Show all</a></td>\
                                            </tr>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                            <tr id=pr_load_pane>\
                                <td>\
                                    <table cellspacing=1 cellpadding=0>\
                                        <tbody id=pr_load_rows>\
                                        </tbody>\
                                    </table>\
                                </td>\
                            </tr>\
                        </tbody>\
                    </table>";
    document.getElementById("pr_record").addEventListener("click", startRecording, true);
    document.getElementById("pr_add_node").addEventListener("click", addCurrentLocation, true);
    document.getElementById("pr_clear_nodes").addEventListener("click", clearPath, true);
    document.getElementById("pr_clear_last").addEventListener("click", clearLast, true);
    document.getElementById("pr_show_file").addEventListener("click", showFileMenu, true);
    document.getElementById("pr_show_record").addEventListener("click", showRecordMenu, true);
    document.getElementById("pr_show_load").addEventListener("click", showLoadMenu, true);
    document.getElementById("pr_file_save_btn").addEventListener("click", savePathAs, true);
    document.getElementById("pr_clear_saved_paths").addEventListener("click", clearSavedPaths, true);
    document.getElementById("pr_show_all").addEventListener("click", showAllPaths, true);
}

function showRecorder () {
    createCookie ("pr_status", "Recorder");

    // Find the calling link
    var lnk = document.getElementById ("pr_link");

    // Change the link text and event handler
    lnk.removeChild(lnk.childNodes[0]);
    lnk.appendChild(document.createTextNode("- Path recorder"));
    lnk.removeEventListener("click", showRecorder, true);
    lnk.addEventListener("click", closeRecorder, true);

    // Try to find the recorder. if it exists, let's just open it.
    var rec = document.getElementById ("pr_recorder");
    if (rec){
        rec.style.display = "block";
        showNodes ();
    }
}

function closeRecorder () {
    eraseCookie ("pr_status");

    // Find the recorder and hide it
    var rec = document.getElementById ("pr_recorder");
    if (rec){
        rec.style.display = "none";
    }

    // Find the link and get it back to the original state
    var lnk = document.getElementById ("pr_link");
    lnk.removeChild(lnk.childNodes[0]);
    lnk.appendChild(document.createTextNode("+ Path recorder"));
    lnk.removeEventListener("click", closeRecorder, true);
    lnk.addEventListener("click", showRecorder, true);

}

function showLink() {
    
    // Check that we're on the correct page
    var text = document.URL;
    if (text.indexOf("main.php") < 0) {
            return;
    }

    // Find the Command table and install the link right after it.
    var cmds = document.getElementById ("otherships");
    
    // Create the DIV and add the link into it
    var div = document.createElement ("table");
    div.innerHTML = "<tr><td><img src='" + unsafeWindow.imgDir + "/position.png' width='210' height='34'></td></tr>\
					 <tr><td style='background-image:url(" + unsafeWindow.imgDir + "/panel.png');background-repeat:repeat-y;text-align:left;'><div id='pr_content' style='margin:0 18px;'></div></td></tr>\
					 <tr><td><img src='" + unsafeWindow.imgDir + "/panelbottom.png' width='210' height='22'></td></tr>";
    div.setAttribute ("width", "210");
    div.setAttribute ("border", "0");
    div.setAttribute ("cellpadding", "0");
    div.setAttribute ("cellspacing", "0");
    div.id = "pr_top_table";

    var cell = div.rows[1].cells[0].firstChild;
    
    // Install the div at the end
    cmds.parentNode.insertBefore(div, cmds);
    cmds.parentNode.insertBefore (document.createElement ("br"), cmds);
    cmds.parentNode.insertBefore (document.createElement ("br"), cmds);
    
//	cell.innerHTML = "<a id=pr_link title='Open/Close the path recorder'>+ Path recorder</a> (<span id=pr_current_node_index>?</span>/<span id=pr_nodes_recorded>0</span> nodes) <span><br><a id=pr_go_next href=\"javascript:pr_go_next()\" title='Moves your ship to the next tile in the current path. You can use the \"g\" key instead of clicking.'>Go next [G]</a></span><div id=pr_data></div>";
	cell.innerHTML = "<a id=pr_link title='Open/Close the path recorder'>+ Path recorder</a> | <a id=pr_go_next href=\"javascript:pr_go_next()\" title='Moves your ship to the next tile in the current path. You can use the \"g\" key instead of clicking.'>Go next [G]</a></span><div id=pr_data></div><div id='pr_node_status' style='display:none'><span id='pr_current_node_index'>?</span>/<span id='pr_nodes_recorded'>0</span></div>";
	cell.firstChild.addEventListener("click", showRecorder, true);
    
    // Cache the saved paths into the local storage
    GMreadCookie (prPaths, true);
    
    // Build the recorder panes
    buildRecorder ();
    readPathsHeader ();
    showAvailablePaths ();

    // Open panes
    if (readCookie("pr_status") == "Recorder")
        showRecorder ();
        showNodes ();

        // Check which section should be shown
        var show = readCookie ("pr_shown_section");
        if (show == null || show == "file") {
            showFileMenu ();
        } else if (show == "record") {
            showRecordMenu ();
        } else if (show == "load") {
            showLoadMenu ();
        }
    else {
        showNodes ();
	}
}

function hijackStatus () {
    var local_updateStatus = unsafeWindow.updateStatus;
    unsafeWindow.updateStatus = function(cmd) {
        local_updateStatus(cmd);
        showAvailablePaths ();
        if (readCookie("pr_recording") == "yes"){
            addCurrentLocation ();
        } else {
            markCurrentNode ();
        }
    }
}

hijackStatus ();
showLink ();
