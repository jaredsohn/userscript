// ==UserScript==
// @name           Sibcy Cline Saved Searches
// @namespace      js.sibcy
// @include        http://www.sibcycline.com/scadv.aspx*
// @resource       jsonParser http://www.json.org/json2.js
// ==/UserScript==

eval (GM_getResourceText ("jsonParser"));

var savedSearchesDiv;
var container;

function body_load () {
    var div = document.createElement ("div");
    div.style.width = "100%";
    div.style.textAlign = "left";
    div.style.fontFamily = "Sans-serif";
    div.style.fontSize = "12px";
    
    var hdg = div.appendChild (document.createElement ("div"));
    hdg.innerHTML = "Saved Searches";
    hdg.style.fontWeight = "bold";

    var list = div.appendChild (document.createElement ("select"));
    list.size = 5;
    list.style.width = "100%";
    list.style.display = "block";
    list.addSearch = function (name) {
        var option = document.createElement ("option");
        option.text = name;
        option.value = name;
        this.appendChild (option);
    }
    list.removeSearch = function (index) {
        this.removeChild (this.childNodes[index]);
    }
    
    var saveLink = div.appendChild (document.createElement ("a"));
    saveLink.href = "javascript: void(0);";
    saveLink.innerHTML = "Save Current Search";
    saveLink.style.marginRight = "5px";
    saveLink.addEventListener ("click", function(){saveSearch (list);}, true);
    
    var loadLink = div.appendChild (document.createElement ("a"));
    loadLink.href = "javascript: void(0);";
    loadLink.innerHTML = "Load";
    loadLink.style.marginRight = "5px";
    loadLink.addEventListener ("click", function(){loadSearch (list);}, true);
    
    var deleteLink = div.appendChild (document.createElement ("a"));
    deleteLink.href = "javascript: void(0);";
    deleteLink.innerHTML = "Delete";
    deleteLink.style.marginRight = "5px";
    deleteLink.addEventListener ("click", function(){deleteSearch (list);}, true);
    
    list.addEventListener ("change", function () {
        loadLink.disabled = !(this.selectedIndex >= 0);
        deleteLink.disabled = !(this.selectedIndex >= 0);
    }, true);
    
    for (var search in SearchOptions.savedSearches) {
        list.addSearch (search);
    }
    
    savedSearchesDiv = div;
    container = (document.getElementById ("btnSearch")).parentNode;
    if (GM_getValue ("SavedSearchesToggle", true)) {
        container.appendChild (savedSearchesDiv);
    }
}
function body_unload () {
    SearchOptions.save ();
}

window.addEventListener ("load", body_load, true);
window.addEventListener ("unload", body_unload, true);

function saveSearch (list) {
    do {
        var name = prompt ("Please enter a name for your saved search.");
        if (SearchOptions.savedSearches[name]) {
            var overwrite = confirm ("There is already a search with that name.\nDo you want to replace it?");
            if (!overwrite) {
                name = "";
            }    
        }
    } while (typeof (name) == "undefined" || name == "")
    
    if (name == null) {
        return;
    }
    
    var search = new SearchOptions (name);
    SearchOptions.fromForm.call (search, document.forms[0]);
    SearchOptions.savedSearches[name] = search;
    
    if (!overwrite) {
        list.addSearch (name);
    }
}
function loadSearch (list) {
    if (! (list.selectedIndex >= 0)) {
        alert ("Please select a saved search in the list.");
        return;
    }
    
    var search = SearchOptions.savedSearches[list.value];
    if (!search || search == null) {
        var remove = confirm ("Could not find the specified search.\nDo you want to remove it from the list?");
        if (remove) {
            deleteSearch (list);
        }
    }
    
    SearchOptions.toForm.call (search, document.forms[0]);
}
function deleteSearch (list) {
    if (! (list.selectedIndex >= 0)) {
        alert ("Please select a saved search in the list.");
        return;
    }
    
    var name = list.value;
    delete SearchOptions.savedSearches[name];

    list.removeSearch (list.selectedIndex);
}

function SearchOptions (name) {
    this.name = name;
    this.areas = Array ();
}
SearchOptions.fromForm = function (form) {
    for (var i = 0; i < form.length; i++) {
        this[form[i].name] = Object();
        for (var j in SearchOptions.valueProperties) {
            var property = SearchOptions.valueProperties[j];
            if (typeof(form[i][property]) != "undefined") {
                this[form[i].name][property] = form[i][property];
            }
        }
        
        if (form[i].name == "frmSelectedAreas") {
            for (var k = 0; k < form[i].length; k++) {
                var option = Object ();
                option.value = form[i][k].value;
                option.text = form[i][k].text;
                this.areas [this.areas.length] = option;
            }
        }
    }
}

SearchOptions.toForm = function (form) {
    for (var i = 0; i < form.length; i++) {
        var name = form[i].name;
        
        if (name == "frmSelectedAreas") {
            while (form[i].length > 0) {
                form[i].removeChild (form[i][0]);
            }
            
            for (var k = 0; k < this.areas.length; k++) {
                var option = document.createElement ("option");
                option.value = this.areas[k].value;
                option.text = this.areas[k].text;
                form[i].appendChild(option);
            }
        }
        
        for (var j in this[name]) {
            form[i][j] = this[name][j];
        }
        
        var onchange = form[i].getAttribute("onchange");
        if (onchange != null) {
            onchange = onchange.replace (/javascript:\s*/, "unsafeWindow.")
            try {eval (onchange);}
            catch (e) {}
        }
    }
}

SearchOptions.valueProperties = Array ("selectedIndex", "checked", "value");
SearchOptions.savedSearches = JSON.parse (GM_getValue ("SavedSearches", "{}"));;
SearchOptions.save = function () {
    var text = JSON.stringify (SearchOptions.savedSearches);
    GM_setValue ("SavedSearches", text);
}

function toggleSavedSearches () {
    var visible = GM_getValue ("SavedSearchesToggle", true);
    if (visible) {
        container.removeChild (savedSearchesDiv);
    } else {
        container.appendChild (savedSearchesDiv);
    }
    GM_setValue ("SavedSearchesToggle", !visible);
}

GM_registerMenuCommand ("Show/hide saved searches", toggleSavedSearches);