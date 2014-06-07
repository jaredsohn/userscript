// ==UserScript==
// @name           PF-modifier
// @include        http://forum.politik.de/*
// ==/UserScript==

const version = "0.2";

var currentConfigurationDialog; // not elegant but necessary for event handlers

var storeGeneral = new DataStore("general");
var storeShowHide = new DataStore("showHide");
var storeDos = new DataStore("dos");
var storeThreadParameters = new DataStore("threadParameters");
var storeSidebar = new DataStore("sidebar");

initialize();
if (storeDos.getData("doRemoveCrapOnTop")) {
    removeCrapOnTop();        
}

createSidebar();
connectClickeventHandler(document.getElementById("closeDiv"), toggleNav);

// do for thread-view only:
if(window.location.pathname == "/forum/showthread.php") {
	if (storeDos.getData("doModifyPostText")){
        modifyPostText();
	}

	if (storeDos.getData("doModifyPostBackground")) {
        modifyPostBackground();
	}

	if (storeDos.getData("doModifyPostHead")) {
	    modifyPostHead();
    }
}

// do for forum-view only:
if(window.location.pathname == "/forum/forumdisplay.php") {
    createMarginalRightControl();
    connectClickeventHandler(document.getElementById("rightDiv"), toggleRight);
}

// -----------------------------------------------------------------------------
//  initialization function
// -----------------------------------------------------------------------------

function initialize() {
    /* check if the script does run the first time in this version,
       write default configuration if values dont exist.
     */
    var configurationCreated = storeGeneral.getData("configurationCreated");
    var scriptVersion = storeGeneral.getData("version");
    if  ((configurationCreated != "true") || (scriptVersion != version)) {
        storeGeneral.setData("configurationCreated", "true");
        storeGeneral.saveAll();
    }
    if (scriptVersion != version) {
        storeGeneral.setData("version", version);
        storeGeneral.saveData("version");
    }
    storeShowHide.setAndSaveIfNotExisting("showMarginalRight", "hide");
    storeSidebar.setAndSaveIfNotExisting("showSidebar", "show");  
    storeDos.setAndSaveIfNotExisting("doRemoveCrapOnTop", true);    
    storeDos.setAndSaveIfNotExisting("doModifyPostText", true);
    storeDos.setAndSaveIfNotExisting("doModifyPostBackground", true);
    storeDos.setAndSaveIfNotExisting("doModifyPostHead", true);
    storeThreadParameters.setAndSaveIfNotExisting("postTextAlign", "justify");
    storeThreadParameters.setAndSaveIfNotExisting("postTextSize", "15px");
    storeThreadParameters.setAndSaveIfNotExisting("postBackgroundColor", "#edf5ff");
    storeThreadParameters.setAndSaveIfNotExisting("postHeadBackgroundColor", "#336699");
    storeThreadParameters.setAndSaveIfNotExisting("postHeadFontColor", "#ffffff");
    storeSidebar.setAndSaveIfNotExisting("widthPx", 200);
    storeSidebar.setAndSaveIfNotExisting("gapToContent", 30);
    storeSidebar.setAndSaveIfNotExisting("sidebarContent", 
        "<h2>Foren</h2>" +
          "<ul>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=2\">Wirtschaft - Finanzen</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=5\">Staat - Demokratie</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=28\">Geschichte</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=4\">Parteien - Wahlen</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=6\">Innenpolitik - Recht</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=8\">Au&szlig;enpolitik</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=9\">Bildung - Gesundheit</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=13\">Gesellschaft - Soziales</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=36\">Gender-Knast</a></li>" +
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=31\">Gotteskrieger</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=10\">&Ouml;kologie - Wissenschaft</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=12\">Internet - Medien</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=1\">Offenes Forum</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=11\">PF intern</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=29\">Weinstube</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=32\">Moderatoren</a></li>" + 
              "<li><a href=\"http://forum.politik.de/forum/forumdisplay.php?f=16\">Ablage</a></li>" + 
          "</ul>" +
        "<h2>Suche</h2>" +
          "<ul>" + 
            "<li><a href=\"http://forum.politik.de/forum/search.php?do=getnew\">Neue Beitr&auml;ge</a></li>" + 
            "<li><a href=\"http://forum.politik.de/forum/search.php?do=getdaily\">Heutige Beitr&auml;ge</a></li>" + 
            "<li><a href=\"http://forum.politik.de/forum/search.php?\">Forensuche</a></li>" + 
          "</ul>" +
        "<h2>Sonstiges</h2>" +
          "<ul>" + 
            "<li><a id=\"chatlink\" href=\"javascript:;\">Chat</a></li>" + 
            "<li><a href=\"http://forum.politik.de/forum/showgroups.php\">Zeige Moderatoren</a></li>" +
            "<li><a href=\"http://forum.politik.de/forum/usercp.php?\">Kontrollzentrum</a></li>" + 
            "<li><a href=\"http://mein.politik.de/\">Mein Politik.de</a></li>" +  
            "<li><a href=\"http://forum.politik.de/forum/private.php?\">Private Nachrichten</a></li>" +  
            "<li><a id=\"generalPrefLink\" href=\"javascript:;\">Skript-Einstellungen (allgemein)</a></li>" + 
            "<li><a id=\"threadPrefLink\" href=\"javascript:;\">Skript-Einstellungen (Thread-Anzeige)</a></li>" + 
          "</ul>"+
    	  "<div id=\"closeDiv\" style=\"cursor:pointer;font-size:200%;font-weight:bold;color:white;padding:145px 1px;background-color:#69b;position:absolute;right:0px;top:0;bottom:0;\"></div>"
    );
}

// -----------------------------------------------------------------------------
//  General functions for access, creation and modification of the website
// -----------------------------------------------------------------------------

/**
 * returns all elements of a tag where attribute attr contains value
 */
function getElementsByAttribute(tag, attr, value) {
	return document.evaluate('//'+tag+'[contains(@'+attr+',"'+value+'")]', document, null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
 * connect a handler function to the click-event of an object
 * @param element the object to add the event handler to
 * @param handler the event handler function
 */
function connectClickeventHandler(element, handler) {
    connectEventHandler(element, "click", handler)
}

/**
 * connect a handler function to an event of an object
 * @param element the object to add the event handler to
 * @param event type of the event (string)
 * @param handler the event handler function
 */
function connectEventHandler(element, event, handler) {
    if (window.attachEvent) { // Opera
    	element.attachEvent(event, handler, true);
    } else  {                 // Firefox
    	element.addEventListener(event, handler, true);
    } 
}

/**
    add an attribute to an object of the dom
    @param element object of the dom
    @param attribute attribute name (string)
    @param value attribute value (string)
*/
function addAttribute(element, attribute, value) {
    var attr = document.createAttribute(attribute);
	attr.nodeValue = value;
    element.setAttributeNode(attr);
}

// -----------------------------------------------------------------------------
//  Specific functions for access, creation and modification of the website
// -----------------------------------------------------------------------------

/**
 * creates a blank div that can be used to display content
 */
function createContentAreaDiv() {
    var myDiv = document.createElement("div");
    var myStyle = document.createAttribute("style");
    var left = "0px";
	if(storeSidebar.getData("showSidebar") == "hide") { 
        left = "25px"; 
    } else {
        left = "" + (storeSidebar.getData("widthPx") + storeSidebar.getData("gapToContent")) + "px"; 
    }
    myStyle.nodeValue = "background-color:#e6edf7;padding:145px 10px 10px 10px;position:fixed;top:0px;left:" + left + ";width:100%; height:100%;z-index:1;";
    myDiv.setAttributeNode(myStyle);
    return myDiv;
}

/**
 * displays the Webchat-Applet
 */
function createChat() {
    var userName = "Gast";
    try {
        var divsOR = getElementsByAttribute("div", "class", "schatten_or");
        var divOR = divsOR.snapshotItem(0);
        userName = divOR.childNodes[1].innerHTML;
    } catch(e) {}
    var chatDiv = createContentAreaDiv();
    chatDiv.innerHTML = "<h2>Web-Chat</h2>" 					
                      + "<applet codebase=\"http://www.worldirc.org/webchat/\" code=IRCApplet.class archive=\"irc.jar,pixx.jar\" width=640 height=400>"
                      + "<param name=\"CABINETS\" value=\"irc.cab,securedirc.cab,pixx.cab\">"
                      + "<param name=\"nick\" value=\"" + userName + "\">"
                      + "<param name=\"fullname\" value=\"WorldIRC Webchat User\">"
                      + "<param name=\"host\" value=\"irc.worldirc.org\">"
                      + "<param name=\"gui\" value=\"pixx\">"
                      + "<param name=\"command1\" value=\"/join #politikforum\">"
                      + "<p>Der Webchat benötigt Browser-Unterstützung für Java-Applets.</p>"
                      + "<p>Eine Alternative besteht im Verwenden eines IRC-Clients.</p>"
                      + "</applet>"
                      + "<br /><br />"
                      + "<h2>IRC-Daten:</h2>"
                      + "<p>Server: <em>irc.worldirc.org</em> Channel: <em>#politikforum</em></p>";

    document.body.appendChild(chatDiv);
}

function removeCrapOnTop() {
    //Platz nach oben schaffen (unnützen Balken entfernen)
    document.getElementById("kategorien").style.display = "none";
	document.getElementById("politik-header").style.zIndex = "100";	
	document.getElementById("politik-header").style.backgroundColor = "#fff";
}

function createSidebar() {
    var myDiv = document.createElement("div");
    var myId = document.createAttribute("id");
    myId.nodeValue = "sidebar";
    var myStyle = document.createAttribute("style");
    myDiv.setAttributeNode(myId);
    myDiv.setAttributeNode(myStyle);
    document.body.appendChild(myDiv);
    myDiv.innerHTML = storeSidebar.getData("sidebarContent");
    if(storeSidebar.getData("showSidebar") == "hide"){ // sidebar hidden:
    	myStyle.nodeValue = "padding:145px 10px 10px 10px;background-color:#e6edf7;position:fixed;width:" + storeSidebar.getData("widthPx") + "px" + ";top:0px;left:-"+ storeSidebar.getData("widthPx") + "px" +"; height:100%; z-index:2;";
    	document.getElementById("content").style.marginLeft = "25px";
    	document.getElementById("closeDiv").innerHTML = "&gt;";
    } else { // sidebar shown:
    	myStyle.nodeValue = "padding:145px 10px 10px 10px;background-color:#e6edf7;position:fixed;width:" + storeSidebar.getData("widthPx") + "px" + ";top:0px;left:2px; height:100%; z-index:2;";  
    	document.getElementById("content").style.marginLeft = "" + (storeSidebar.getData("widthPx")  + storeSidebar.getData("gapToContent")) + "px";
    	document.getElementById("closeDiv").innerHTML = "&lt;";
    }
    
    /* try to connect event handlers to some links, that possibly occur in the
       sidebar
     */
    try {
        connectClickeventHandler(document.getElementById("chatlink"), showChat);
    } catch(e) {}
    try {
        connectClickeventHandler(document.getElementById("threadPrefLink"), showThreadPreferencesDialog);
    } catch(e) {}
    try {
        connectClickeventHandler(document.getElementById("generalPrefLink"), showGeneralPreferencesDialog);
    } catch(e) {}
}

function createMarginalRightControl() {
	var rightDiv = document.createElement("div");
	var rightId = document.createAttribute("id");
	rightId.nodeValue = "rightDiv";
	var rightStyle = document.createAttribute("style");
	rightStyle.nodeValue = "background-color:#69b;border:1px solid black;text-align:center;font-size:100%;font-weight:bold;color:white;cursor:pointer;position:absolute;top:0px;width:100px;right:2px;";
	rightDiv.setAttributeNode(rightId);
	rightDiv.setAttributeNode(rightStyle);
	document.getElementById("content").appendChild(rightDiv); 
	if(storeShowHide.getData("showMarginalRight") == "hide"){
		rightDiv.innerHTML = "einblenden V";
		document.getElementById("abstand").style.marginRight = "0px";
		document.getElementById("marginal_right").style.display = "none";
	} else {
		rightDiv.innerHTML = "ausblenden X";
	}
}

function modifyPostText() {
    // transform post text:
    var divs, div;
    divs = getElementsByAttribute("div", "id", "post_message");
    try {
        for (var i = 0; i < divs.snapshotLength; i++) {
            div = divs.snapshotItem(i);
            div.style.textAlign = storeThreadParameters.getData("postTextAlign");
            div.style.fontSize = storeThreadParameters.getData("postTextSize");
        }
    } catch(e) {}
}

function modifyPostBackground() {
    // change post background:
    var tds, td;
    tds = getElementsByAttribute("td", "id", "td_post");
    for (var i = 0; i < tds.snapshotLength; i++) {
        td = tds.snapshotItem(i);
        td.style.backgroundColor = storeThreadParameters.getData("postBackgroundColor");
    }
}

function modifyPostHead() {
    // change head background:
    var tds, td;
    tds = getElementsByAttribute("td", "class", "thead");
    for (var i = 0; i < tds.snapshotLength; i++) {
        td = tds.snapshotItem(i);
        td.style.backgroundColor = storeThreadParameters.getData("postHeadBackgroundColor");
        td.style.color = storeThreadParameters.getData("postHeadFontColor");
	}
}

function createGeneralPreferencesDialog() {
    var prefDiv = createContentAreaDiv();
    var configDialog = new ConfigurationDialog(storeDos);
    configDialog.setTitle("Allgemeine Einstellungen");

    var versionLabel = document.createElement("p");
    versionLabel.innerHTML = "Skript-Version: " + version;
    prefDiv.appendChild(versionLabel);

    var wCrap = new WidgetCheckbox();
    configDialog.addConfig("doRemoveCrapOnTop", "Seitenkopf reduzieren", wCrap, "Aktivieren, um unnötigen Kram aus dem Kopf der Website zu entfernen");

    var wText = new WidgetCheckbox();
    configDialog.addConfig("doModifyPostText", "Text in Posts ändern", wText, "Aktivieren, um Ausrichtung und Größe in Beitragstexten zu ändern.");

    var wBg = new WidgetCheckbox();
    configDialog.addConfig("doModifyPostBackground", "Beitragshintergrund ändern", wBg, "Aktivieren, um den Hintergrund von Beitragstexten zu ändern");

    var wHead = new WidgetCheckbox();
    configDialog.addConfig("doModifyPostHead", "Beitragskopf ändern", wHead, "Aktivieren, um die Farben der Beitragsköpfe zu ändern");

    prefDiv.appendChild(configDialog.getDOMObject());
    document.body.appendChild(prefDiv);
}

function createThreadPreferencesDialog() {
    var prefDiv = createContentAreaDiv();
    var configDialog = new ConfigurationDialog(storeThreadParameters);
    configDialog.setTitle("Einstellungen zur Anzeige von Strängen");

    var wAlign = new WidgetDropdown();
    wAlign.addOption("right");
    wAlign.addOption("center");
    wAlign.addOption("left");
    wAlign.addOption("justify");
    configDialog.addConfig("postTextAlign", "Text-Ausrichtung", wAlign, "Ausrichtung des Texts innerhalb von Beiträgen");

    var wSize = new WidgetTextfield();
    configDialog.addConfig("postTextSize", "Schriftgröße", wSize, "Schriftgröße des Beitragstexts. (z. B. '13.33px' oder '10pt' ...)");

    var wBackground = new WidgetColorChooser("widgetPostBackgroundColor");
    configDialog.addConfig("postBackgroundColor", "Hintergrundfarbe", wBackground, "Hintergrundfarbe des Beitragstexts. (z. B. '#ffffff', 'rbg(0, 255, 0)' oder 'red')");

    var wHeadBackground = new WidgetColorChooser("widgetPostHeadBackgroundColor");
    configDialog.addConfig("postHeadBackgroundColor", "Beitrags-Kopfleiste: Hintergrundfarbe:", wHeadBackground, "Hintergrundfarbe der Beitrags-Kopfleiste. (z. B. '#ffffff', 'rbg(0, 255, 0)' oder 'red')");

    var wHeadForeground = new WidgetColorChooser("widgetPostHeadFontColor");
    configDialog.addConfig("postHeadFontColor", "Beitrags-Kopfleiste: Schriftfarbe:", wHeadForeground, "Schriftfarbe für den Beitrags-Kopf. (z. B. '#ffffff', 'rbg(0, 255, 0)' oder 'red')");

    prefDiv.appendChild(configDialog.getDOMObject());
    document.body.appendChild(prefDiv);
}

// -----------------------------------------------------------------------------
//  class ConfigurationDialog
// -----------------------------------------------------------------------------

/**
    The constructor
    There should always only be one active configuration dialog, because
    the event handler functions work on currentConfigurationDialog
    @param dataStoreObject reference to an existing dataStore
*/
function ConfigurationDialog(dataStoreObject) {
    this.dataStore = dataStoreObject;
    this.title = this.dataStore.getId();
    this.labels = new Object();
    this.widgets = new Object();
    this.descriptions = new Object();
    this.addConfig = ConfigurationDialog_addConfig;
    this.getDOMObject = ConfigurationDialog_getDOMObject;
    this.reset = ConfigurationDialog_reset;
    this.save = ConfigurationDialog_save;
    this.setTitle = ConfigurationDialog_setTitle;
    this.getTitle = ConfigurationDialog_getTitle;
}

/** 
    Add a rule for creating a user interface
    @param key key of corresponding data entry (string)
    @param label the label that names the entry (string)
    @param widget widget that will do the configuration.
                  the widget needs to implement an interface consisting of:
                    * setData(data) accepting data of the corresponding type
                                    to change the value
                    * getData() returning the selected value in the
                                corresponding data type
                    * getDOMObject() returning a DOM-Object to append into the 
                                     DOM-tree.
    @param description (string)
*/
function ConfigurationDialog_addConfig(key, label, widget, description) {
    this.labels[key] = label;
    this.widgets[key] = widget;
    this.descriptions[key] = description;
}

function ConfigurationDialog_getDOMObject() {
    var container = document.createElement("form");
    addAttribute(container, "class", "ConfigurationDialog_Container");

    var title = document.createElement("h3");
    title.innerHTML = this.title;
    container.appendChild(title);
    for (key in this.labels) {
        if (this.dataStore.exists(key)) {
  
            var label = document.createElement("h4");
            label.style.marginTop = "20px";
            label.innerHTML = this.labels[key];
            container.appendChild(label);        

            this.widgets[key].setData(this.dataStore.getData(key));
            var widget = this.widgets[key].getDOMObject();
            widget.style.marginLeft = "20px";
            container.appendChild(widget);

            var desc = document.createElement("p");
            desc.style.marginLeft = "20px";
            desc.innerHTML = this.descriptions[key];
            container.appendChild(desc);
        }
    }

    currentConfigurationDialog = this;
    
    var btnReset = document.createElement("input");
    addAttribute(btnReset, "type", "button");
    addAttribute(btnReset, "value", "Zurücksetzen");
    connectClickeventHandler(btnReset, this.reset);
    container.appendChild(btnReset);


    var btnSave = document.createElement("input");
    addAttribute(btnSave, "type", "button");
    addAttribute(btnSave, "value", "Speichern");
    connectClickeventHandler(btnSave, this.save)
    container.appendChild(btnSave);

    return container;
}

function ConfigurationDialog_reset() {
    currentConfigurationDialog.dataStore.loadAll();
    for (key in currentConfigurationDialog.labels) {
        if (currentConfigurationDialog.dataStore.exists(key)) {
            currentConfigurationDialog.widgets[key].setData(currentConfigurationDialog.dataStore.getData(key));
        }
    }
}

function ConfigurationDialog_save() {
    for (key in currentConfigurationDialog.labels) {
        if (currentConfigurationDialog.dataStore.exists(key)) {
            currentConfigurationDialog.dataStore.setData(key, currentConfigurationDialog.widgets[key].getData());
        }
    }
    currentConfigurationDialog.dataStore.saveAll();
}

function ConfigurationDialog_setTitle(title) {
    this.title = title;
}

function ConfigurationDialog_getTitle() {
    return this.title;
}

// -----------------------------------------------------------------------------
//  widget classes
// -----------------------------------------------------------------------------


// Textfield
function WidgetTextfield() {
    this.field = document.createElement("input");
    addAttribute(this.field, "type", "text");
    this.field.value = "";
    this.setData =Textfield_setData;
    this.getData = Textfield_getData;
    this.getDOMObject = Textfield_getDOMObject;
}

function Textfield_setData(dataValue) {
    this.field.value = dataValue;
}

function Textfield_getData() {
    return this.field.value;
}

function Textfield_getDOMObject() {
    return this.field;
}

// Checkbox
function WidgetCheckbox() {
    this.field = document.createElement("input");
    addAttribute(this.field, "type", "checkbox");
    this.field.checked = false;
    this.setData = WidgetCheckbox_setData;
    this.getData = WidgetCheckbox_getData;
    this.getDOMObject = WidgetCheckbox_getDOMObject;
}

function WidgetCheckbox_setData(dataValue) {
    this.field.checked = dataValue;
}

function WidgetCheckbox_getData() {
    return this.field.checked;
}

function WidgetCheckbox_getDOMObject() {
    return this.field;
}

// Dropdown
function WidgetDropdown() {
    this.field = document.createElement("select");
    addAttribute(this.field, "size", "1");
    this.field.value = "";
    this.addOption = WidgetDropdown_addOption;
    this.setData = WidgetDropdown_setData;
    this.getData = WidgetDropdown_getData;
    this.getDOMObject = WidgetDropdown_getDOMObject;
}

function WidgetDropdown_addOption(option) {
    var opt = document.createElement("option");
    opt.innerHTML = option;
    this.field.appendChild(opt);
}

function WidgetDropdown_setData(dataValue) {
    this.field.value = dataValue;
}

function WidgetDropdown_getData() {
    return this.field.value;
}

function WidgetDropdown_getDOMObject() {
    return this.field;
}

// ColorChooser
function WidgetColorChooser(id) {
    this.id = id;
    this.container = document.createElement("span");
    this.preview = document.createElement("span");
    addAttribute(this.preview, "id", id + "_preview");
    this.preview.style.border = "solid #000000 1px";
    this.preview.style.marginLeft = "10px";
    this.preview.innerHTML = " ";
    this.preview.style.paddingLeft = "30px";
    this.previewLabel = document.createElement("span");
    this.previewLabel.innerHTML = "(Vorschau)";
    this.previewLabel.style.marginLeft = "10px";
    this.field = document.createElement("input");
    addAttribute(this.field, "id", id + "_input");
    addAttribute(this.field, "type", "text");
    this.field.value = "#ffffff";
    this.container.appendChild(this.field);
    this.container.appendChild(this.preview);
    this.container.appendChild(this.previewLabel);

    changeHandler = new Function("var prev = document.getElementById('" + id + "_preview" + "');" + 
                                 "var input = document.getElementById('" + id + "_input" + "');" +
                                 "prev.style.backgroundColor = input.value;");
    
    connectEventHandler(this.field, "change", changeHandler);

    this.setData = WidgetColorChooser_setData;
    this.getData = WidgetColorChooser_getData;
    this.updatePreview = WidgetColorChooser_updatePreview;
    this.getDOMObject = WidgetColorChooser_getDOMObject;
}

function WidgetColorChooser_updatePreview() {
    this.preview.style.backgroundColor = this.field.value;
}

function WidgetColorChooser_setData(dataValue) {
    this.field.value = dataValue;
    this.updatePreview();
}

function WidgetColorChooser_getData() {
    return this.field.value;
}

function WidgetColorChooser_getDOMObject() {
    return this.container;
}

// -----------------------------------------------------------------------------
//  class DataStore
// -----------------------------------------------------------------------------

/**
    @brief The DataStore class provides a very easy to use interface for 
           handling persistent data of various types in a script.
    
    Each time a DataStore instance is associated with an id not necessarily 
    identifying that instance (but be careful with multiple instances working on
    the same id, you can shoot yourself in the foot when changing data types)
    but identifying the set of data to work on.
    When a DataStore is created it loads automatically former data belonging 
    to its id.
    Persistence is currently set to 30 days.
    Data in a DataStore has a key (has to be a string) identifying it and a type 
    (currently supported types: string, number, boolean).
    It can be set by calling setData, made persistent by calling saveData
    (for ease of use there is a combined method setAndSave).
    Read access is provided by the method getData, that reads from the local
    copy of the data.
    The type of data is automatically detected so a user of this class doesn't 
    need to care about it: just use setData with a variable of a supported type 
    and getData will return you a value of that type later.

    The interface is independent from the the technical aspects of saving and
    loading the data.
    The current implementation uses cookies as storage but it is possible to 
    change the saving method easily or implement browser-specific methods.
    Additionally there is the possibility to change the implementation so that
    all the data of a DataStore instance goes into one cookie (if there occurs
    the wish to reduce the number of cookies in the future).
 */
function DataStore(id) {
    // properties:
    this.properties = new Object();
    this.id = id;
    this.seperator = "_";
    this.cookiePrefix = "dataStore" + this.seperator + this.id + this.seperator;
    this.cookieDays = 30;

    // methods:
    this.getData = DataStore_getData;
    this.setData = DataStore_setData;
    this.saveData = DataStore_saveData;
    this.saveAll = DataStore_saveAll;
    this.loadData = DataStore_loadData;
    this.loadAll = DataStore_loadAll;
    this.exists = DataStore_exists;
    this.getId = DataStore_getId;
    this.initialize = DataStore_initialize;
    this.convertStringToType = DataStore_convertStringToType;
    this.setAndSave = DataStore_setAndSave;
    this.setAndSaveIfNotExisting = DataStore_setAndSaveIfNotExisting;

    // do initialization: load former data
    this.initialize();
}

function DataStore_getId() {
    return this.id;
}

function DataStore_getData(key) {
    if (key in this.properties) {
        return this.properties[key];
    } else {
        return null;
    }
}

function DataStore_setData(key, data) {
    this.properties[key] = data;
}

function DataStore_saveData(key) {
    // the "" + is for conversion of the data into string type.
    createCookie(this.cookiePrefix + (typeof this.properties[key]) + this.seperator + key, escape("" + this.properties[key]), this.cookieDays);
}

function DataStore_saveAll() {
    // could be modified to save only changed data
    for (var key in this.properties) {
        this.saveData(key);
    }
}

function DataStore_loadData(key) {
    try {
        var type = (typeof this.properties[key]);
        var data = unescape(readCookie(this.cookiePrefix + type + this.seperator + key));
        this.properties[key] = this.convertStringToType(data, type);
    } catch (e) {
        // Probably the key does not exist yet in the DataStore instance...
    }
}

function DataStore_loadAll() {
    for (var key in this.properties) {
        this.loadData(key);
    }
}

function DataStore_exists(key) {
    if (this.getData(key) == null) {
        return false;
    } else {
        return true;
    }
}

function DataStore_initialize() {
    var names = getCookieNamesBeginningWith(this.cookiePrefix);
    var typeAndKey;
    var key;
    var type;
    for (var i = 0; i < names.length; i++) {
        typeAndKey = names[i].substring(this.cookiePrefix.length);
        // seperate key string and type string:
        key = typeAndKey.substring(typeAndKey.indexOf(this.seperator) + 1);
        type = typeAndKey.substring(0, typeAndKey.indexOf(this.seperator));
        /* it is important to convert the initial dummy data that will be
           overwritten by the following call of loadAll to the right type,
           because the loadData-method gets its knowledge about the type 
           expected from the type of the value set here.
         */
        this.setData(key, this.convertStringToType("", type));
    }
    this.loadAll();
} 

function DataStore_convertStringToType(string, type) {
    if (type == "string") {
        return string;
    }
    if (type == "boolean") {
        return ((string == "true") ? true : false);
    }
    if (type == "number") {
        return Number(string);
    }
}

function DataStore_setAndSave(key, data) {
    this.setData(key, data);
    this.saveData(key);
}

function DataStore_setAndSaveIfNotExisting(key, defaultValue) {
    if (!this.exists(key)) {
        this.setData(key, defaultValue);
        this.saveData(key);
    }
}

// -----------------------------------------------------------------------------
//  cookie functions:
// -----------------------------------------------------------------------------

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function getCookieNamesBeginningWith(begin) {
    var names = new Array();
    var cookie;
	var cookieArray = document.cookie.split(';');    
	for(var i = 0; i < cookieArray.length; i++) {
        cookie = cookieArray[i];
   		while (cookie.charAt(0) == ' ') { // remove heading spaces
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.substring(0, begin.length) == begin) { // if cookie starts with begin
            names.push(cookie.split('=')[0]);
        }
    }
    return names;
}

// -----------------------------------------------------------------------------
//  action handlers
// -----------------------------------------------------------------------------

function showChat() {
    createChat();
}
         
function showThreadPreferencesDialog() {
    createThreadPreferencesDialog();
}

function showGeneralPreferencesDialog() {
    createGeneralPreferencesDialog();
}

function toggleNav(){
	if(document.getElementById("sidebar").style.left == "2px"){
		document.getElementById("sidebar").style.left = "-" + storeSidebar.getData("widthPx") + "px";
		document.getElementById("closeDiv").innerHTML = "&gt;";
		document.getElementById("content").style.marginLeft = "25px";
        storeSidebar.setAndSave("showSidebar", "hide");
	} else {
		document.getElementById("sidebar").style.left = "2px";
		document.getElementById("closeDiv").innerHTML = "&lt;";
		document.getElementById("content").style.marginLeft = "" + (storeSidebar.getData("widthPx") + storeSidebar.getData("gapToContent")) + "px";
        storeSidebar.setAndSave("showSidebar", "show");
	}
}

function toggleRight(){
	if(document.getElementById("rightDiv").innerHTML == "ausblenden X"){
		document.getElementById("abstand").style.marginRight = "0px";
		document.getElementById("marginal_right").style.display = "none";		
		document.getElementById("rightDiv").innerHTML = "einblenden V";
        storeShowHide.setData("showMarginalRight", "hide");
        storeShowHide.saveAll();
	} else {		
		document.getElementById("abstand").style.marginRight = "21em";
		document.getElementById("marginal_right").style.display = "block";
		document.getElementById("rightDiv").innerHTML = "ausblenden X";
        storeShowHide.setData("showMarginalRight", "show");
        storeShowHide.saveAll();
	}
}

