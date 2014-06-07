// ==UserScript==
// @name           QuickUse
// @namespace      kol.interface.unfinished
// @description    Drop-down menu so you can quickly use various use-once items in KOL. (Version 2.3.3).
// @include        http://*kingdomofloathing.com/charpane.php
// @include        http://*kingdomofloathing.com/inventory.php*
// @include        http://127.0.0.1:*/charpane.php
// @include        http://127.0.0.1:*/inventory.php*
// @exclude        http://forums.kingdomofloathing.com/*
// @version        2.3.3
// ==/UserScript==

//Version 2.3.3
// - minor fix to make it show up more consistently below the character data
//Version 2.3.2
// - fix a bug I missed in adding new items to the list
//Version 2.3.1
// - missed some fixes for when adding new items to the list
//Version 2.3
// - fixes to accommodate more changes in kol's html, and 3-width inventories
//Version 2.2.2
// - updated to handle changes in kol's html
// - fixed auto-update, again
//Version 2.2
// - now you can add all possible actions when more than one action applies
//   to an object (ie when in configure mode if you look at an inventory item 
//   that normally has [equip][use] you can add either or both of these
//   actions).
//   Mouseover text distinguishes multiple entries in the inventory screen,
//   in the quick list, and for the quick button.
//Version 2.1
// - fix for changes at userscript that invalidated auto-update notification
//Version 2.0
// - Major revamp: now user configurable!
//   - There's now a small button next to the quick list that toggles
//     the existence of the quick button. 
//   - In the quick list itself, there's a new Configure option (where
//     the quick button toggle was in the previous version).  
//     Choose this option to turn configure mode on or off.  In configure
//     mode some things are added so you can change what's in the quick list:
//     - Configure mode adds [quick+] and [quick-] links to anything in your 
//       inventory page which can be added or which already exists in the quick 
//       list.  Click on a link to add/remove it.  Mouse-over text for the 
//       [quick+] link shows you what operation will be associated with it when 
//       there's more than one possibility.
//     - It also adds a list and button bar underneath the quick list (or 
//       underneath the quick button if you have that open).  This lets you 
//       directly edit entries in the quick list.  Choose the list entry you 
//       want to operate on, then click the up/down arrows to move it around in 
//       the list, the 'D' to delete it from the list, the green square to toggle 
//       its colour (green/normal), or the 'R' to reset quicklist to its 
//       original, downloaded state (wiping out all your edits).
//   - There's mouse-over text for all components to help you figure out what 
//     each thing does.
// - no longer zeros all counts for entries when using something that is set to
//   not load a new page (there weren't any of these in the last release, but 
//   people may have added some in customization).
//Version 1.0
// - now can recognize when you have 0 of something
// - automatic update feature: checks userscripts once a day to look for updates to this script
// - added bazookafish gum and ant agonist
// - button text now includes item count
// - anti-anti-antidote now loads a new page
//Version 0.6
// - added button for last use
// - cleaned up code
//Version 0.5
// - counts are not kept in sync as you use them, they are weakly updated
//   when you visit the appropriate inventory screen.
// - use of items in red is shown in the main frame
// - use of items in green is not shown in the main frame
// - list of items is haphazard


// format
//   title: name of option
//   number: the item's item number, found on the wiki page for each item
//     in the handler an item number of 0 means a title (ignore)
//     -1 means the toggle button
//     -2 means the update script url
//   page: 1 or 2 or 3, which inventory page the item lives in
//   newpage: yes or no, whether to load the page in the main frame or not
//   actionpage: eat, use, etc, how the item is consumed
//   counter: a unique counter name for weakly tracking quantity
//   descitem: the item's description ID, found on the wiki page for each item
//   style: a style string, eg for setting colour

// (title and config entry and reset each time so they are separated)
var firstEntry = {title:"Quick Use",number:"0",page:"",newpage:"no",actionpage:"",actionurl:"",counter:"",descitem:"",style:""};
var configEntry = {title:"Configure",number:"-1",page:"",newpage:"no",actionpage:"",actionurl:"",counter:"",descitem:"",style:"color:blue"};

var defaultEntries = new Array(firstEntry,configEntry,
                               {title:"astral mushroom",number:"1622",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"amushroom",descitem:"536233488",style:"color:green"},
                               {title:"llama lama gong",number:"3353",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"gongs",descitem:"450667217",style:"color:green"},
                               {title:"tiny bottle of absinthe",number:"2655",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"absinthe",descitem:"689551675",style:"color:green"},
                               {title:"ant agonist",number:"2569",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"agonist",descitem:"820254596",style:""},
                               {title:"anti-anti-antidote",number:"829",page:"1",newpage:"no",actionpage:"use",actionurl:"",counter:"antidote",descitem:"82346664",style:""},
                               {title:"bazookafish bubble gum",number:"3496",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"fishgum",descitem:"540293802",style:""},
                               {title:"Ben-Gal Balm",number:"2595",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"balm",descitem:"842588397",style:""},
                               {title:"black pudding",number:"2338",page:"1",newpage:"yes",actionpage:"eat",actionurl:"",counter:"puddings",descitem:"716388011",style:""},
                               {title:"cursed piece of thirteen",number:"3034",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"thirteen",descitem:"654772088",style:""},
                               {title:"drum machine",number:"2328",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"drums",descitem:"332500630",style:""},
                               {title:"tomb ratchet",number:"2540",page:"3",newpage:"yes",actionpage:"use",actionurl:"",counter:"ratchet",descitem:"116330864",style:""}
                               );

var invTargets = ['use','eat','booze','equip'];

// current entries set
var entries;

// ids
var TOP_MAIN = 'topmainQuickUse'; // root of main drop-down etc
var TOP_BUTTON = 'topbuttonQuickUse'; // root of quick button
var TOP_CFG = 'topcfgQuickUse'; // root of config bar
var SELECT_QU = 'selectQuickUse'; // id for quick use select object
var SELECT_CFG = 'selectcfgQuickUse'; // id for config select object

// special name to indicate a full url
var ACTIONURL = '***';

// --------------------------------------------
// ------------ entry management --------------
// --------------------------------------------

// store current set of entries
function saveEntries(entr) {
    var playerName = GM_getValue("currentPlayer"); //getPlayerNameFromCharpane().username;
    var e = "";
    for (var i=0;i<entr.length;i++) {
        e = e+'title:'+entr[i].title+'>>';
        e = e+'number:'+entr[i].number+'>>';
        e = e+'page:'+entr[i].page+'>>';
        e = e+'newpage:'+entr[i].newpage+'>>';
        e = e+'actionpage:'+entr[i].actionpage+'>>';
        if (entr[i].actionurl)
            e = e+'actionurl:'+entr[i].actionurl+'>>';
        else
            e = e+'actionurl:>>';
        e = e+'counter:'+entr[i].counter+'>>';
        e = e+'descitem:'+entr[i].descitem+'>>';
        e = e+'style:'+entr[i].style+'>>';
        e = e+"+++";
    }
    GM_setValue(playerName+"_entries",e);
}

// returns an array of objects, parsed from current storage or the default entry list
function loadEntries() {
    var playerName = GM_getValue("currentPlayer"); //getPlayerNameFromCharpane().username;
    var e;
    if (playerName && (e=GM_getValue(playerName+"_entries"))) {
        var elist = e.split('+++');
        var entries=new Array();
        entries[0]=firstEntry; // initialize special entries
        entries[1]=configEntry;
        var count=2;
        for (var i=0;i<elist.length;i++) {
            var x = elist[i];
            if (x.length>0) {
                var idx=0;
                var curi=0;
                var newe = new Object();
                while ((idx=x.indexOf(':',curi))>=0) {
                    var prop=x.substr(curi,idx-curi);
                    var eidx=x.indexOf('>>',idx);
                    var val = x.substr(idx+1,eidx-idx-1);
                    newe[prop]=val;
                    curi = eidx+2;
                    if (curi>=x.length)
                        break;
                }
                if (newe.number>0) { // in case the initial or config/update entry were saved 
                    if (!newe['actionurl'])
                        newe.actionurl='';
                    entries[count] = newe;
                    count++;
                }
            }
        }
        return entries;
    } 
    return defaultEntries;
}


// for debugging
function showEntries(entries) {
    for (var i=0;i<entries.length;i++) {
        var e = entries[i];
        GM_log(' E['+i+'] = {'+e.title+', #'+e.number+', desc='+e.descitem+', page='+e.actionpage+', url='+e.actionurl+'}');
    }
}

// managing counters for individual entries
function getMyCounter(subcounter) {
    var playerName = GM_getValue("currentPlayer"); //getPlayerNameFromCharpane().username;
    var oldCount = GM_getValue(playerName+"__"+subcounter,0);
    //GM_log("getting counter: "+playerName+"__"+subcounter+" = "+oldCount);
    return oldCount;
}

// managing counters for individual entries
function setMyCounter(subcounter,val) {
    var playerName = GM_getValue("currentPlayer");
    GM_setValue(playerName+"__"+subcounter,val);
    //GM_log("setting counter: "+playerName+"__"+subcounter+" = "+val);
}

// managing counters for individual entries
// sets the entry to the given value and updates its string
function updateEntry(index,countval) {
    // update stored value
    setMyCounter(entries[index].counter,countval);
    // create new text
    //GM_log("UPdating: "+entries[index].title+" to "+countval);
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane")
            goo=somef[j];
    }
    if (goo) {
        var sbox=goo.document.getElementById(SELECT_QU);
        if (sbox) 
            sbox[index]=makeAnOption(index,goo.document);
    }
}

// --------------------------------------------
// --------------- DOM creation ---------------
// --------------------------------------------

// creates a new option based on the given index, making it in
// the given document
function makeAnOption(i,doct) {
    var option = doct.createElement("option");
    var titleString=entries[i].title;
    if (entries[i].counter!="") {
        titleString = titleString+" ("+getMyCounter(entries[i].counter)+")";
        //GM_log("Making: "+titleString);
    }
    var theText=doct.createTextNode(titleString);
    option.appendChild(theText);
    if (i == 0) option.setAttribute("selected",1);
    option.setAttribute("usepage",entries[i].page);
    option.setAttribute("newpage",entries[i].newpage);
    option.setAttribute("style",entries[i].style);
    option.setAttribute("actionpage",entries[i].actionpage);
    if (entries[i].actionurl)
        option.setAttribute("actionurl",entries[i].actionpage);
    if (entries[i].actionpage!='')
        option.setAttribute("title",entries[i].actionpage+' '+entries[i].title);
    else if (entries[i].number=="-1")
        option.setAttribute("title",'Select this option to toggle configure mode.');
    else if (entries[i].number=="-2")
        option.setAttribute("title",'Select this option to download version '+outOfDate+' of QuickUse!');
    option.value = entries[i].number;
    return option;
}


// main function to find the anchor point and create
// the drop down quick list
// if button or menu exists it will be destroyed first
function createDropdown() {
    var spot =  document.getElementById('rollover');
    if (spot && spot.nextSibling && spot.nextSibling.firstChild)
        spot = spot.nextSibling.firstChild;
    if (spot && spot.tagName=='TABLE' && spot.firstChild.tagName=='TBODY') 
        spot = spot.firstChild;
    if (spot) {
        var menu=document.getElementById(TOP_MAIN);
        var bmenu=document.getElementById(TOP_BUTTON);
        if (bmenu)
            bmenu.parentNode.removeChild(bmenu);
        if (menu)
            menu.parentNode.removeChild(menu);
        createBox(spot);
        var pname=GM_getValue("currentPlayer","");
        var b = parseInt(GM_getValue(pname+"_editlinks","0"));
        var cmenu=document.getElementById(TOP_CFG);
        if (!b && cmenu) {
            setEditLinks(0);
            cmenu.parentNode.removeChild(cmenu);
        } else if (b && !cmenu) {
            var p = document.getElementById(TOP_BUTTON);
            if (!p)
                p = document.getElementById(TOP_MAIN);
            createCfgBox(p);
            setEditLinks(1);
        }
    }
}

//
// creates the quick use drop-down menu etc
// 
function createBox(parent) {
    var myform=document.createElement("form");
    myform.setAttribute("id","formQuickUse");
    
    var select = document.createElement('select');
    if (outOfDate!='' && (entries[0].title!="New version available!")) {
        // change title to nag, and add a link to update
        entries.unshift({title:"New version available!",number:"0",page:"",newpage:"no",actionpage:"",counter:"",style:""}); 
        entries[1] = {title:"Install updated script",number:"-2",page:"",newpage:"no",actionpage:"",counter:"",descitem:"",style:"color:blue"};
    }
    
    for (var i=0; i<entries.length; i++) {
        var option = makeAnOption(i,document);
        select.appendChild(option);
    }
    myform.appendChild(select);
    
    select.addEventListener("change", dropdownHandler, true);
    select.setAttribute("border","5px");
    select.setAttribute('style','width:82%;font-size:10px;');
    select.setAttribute("id",SELECT_QU);
    if (outOfDate!='') 
        select.setAttribute('title','Version '+outOfDate+' of the quick use script is available! You are currently running version '+VERSION);
    else
        select.setAttribute('title','Select an entry to use it.');
    
    //<select onMouseOver="window.status=this.options[this.options.selectedIndex].title; return true;" onMouseOut="window.status=' '; return true;">
    
    select.addEventListener("mouseover", function() {if (this.options.selectedIndex>0) window.status=this.options[this.options.selectedIndex].title; else window.status=this.title;}, true);
    select.addEventListener("mouseout", function() {window.status='';}, true);
    
    var btn = document.createElement('input');
    myform.appendChild(btn);
    
    btn.addEventListener("mouseup", toggleHandler, true);
    btn.setAttribute("type","button");
    btn.setAttribute("border","5px");
    btn.setAttribute('style','width:18%;font-size:10px;');
    btn.setAttribute('value','Btn');
    btn.setAttribute('title','Toggle quick button.');
    
    var x = document.createElement('tr');
    var y = document.createElement('td');
    y.setAttribute("colspan","2");
    x.appendChild(y);
    y.appendChild(myform);
    x.setAttribute('id',TOP_MAIN);
    
    //parent.insertBefore(x,parent.firstChild);
    parent.appendChild(x);
    
    createButton(x);
}

// create the quick use button
function createButton(sibling) {
    var pname=GM_getValue("currentPlayer","");
    var lastused=parseInt(GM_getValue(pname+"_lastselect","0"));
    var nobutton=parseInt(GM_getValue(pname+"_quickbutton","1"));
    if (nobutton==0) {
        
        var myform=document.createElement("form");
        
        var button = document.createElement('input');
        button.setAttribute('type','button');
        button.setAttribute('name','test');
        button.addEventListener("click", buttonHandler, true);
        button.setAttribute("id","buttonQuickUse");
        button.setAttribute("border","0px");
        button.setAttribute('style','width:100%;font-size:9px;');
        
        if (lastused>0 && lastused<entries.length) {
            var titleString = entries[lastused].title;
            var titleCount = String(getMyCounter(entries[lastused].counter));
            titleString = titleString.replace(/^\s*/, ""); // remove any indenting
            //GM_log("titleCount("+titleCount+")="+titleCount.length);
            if (titleString.length>2 && titleString.length>28-titleCount.length) {
                titleString = titleString.substr(0,28-titleCount.length-2)+'..';
            }
            button.setAttribute('value',titleString+" ("+titleCount+")");
            button.setAttribute('lastused',String(lastused));
            button.setAttribute("title",entries[lastused].actionpage+' '+entries[lastused].title);
            if (entries[lastused].style=='color:green') {
                button.setAttribute('style',button.getAttribute('style')+';color:green');
            }
        } else {
            button.setAttribute('value','Last Quick Use');
            button.setAttribute('lastused',"0");
        }
        
        myform.appendChild(button);
        myform.setAttribute("id","buttonFormQuickUse");
        
        
        var x = document.createElement('tr');
        x.setAttribute('id',TOP_BUTTON);
        var y = document.createElement('td');
        
        y.setAttribute("colspan","2");
        x.appendChild(y);
        y.appendChild(myform);
        
        if (sibling.nextSibling)
            sibling.parentNode.insertBefore(x,sibling.nextSibling);
        else
            sibling.parentNode.appendChild(x);
    }
}


// create the form for cfg boxes
function createCfgBox(sibling) {
    var myform=document.createElement("form");
    
    var select = document.createElement('select');
    var option = document.createElement("option");
    option.appendChild(document.createTextNode("Choose"));
    option.setAttribute("number","0");
    option.setAttribute("selected",1);
    select.appendChild(option);
    
    createCfgOptions(select);
    
    select.setAttribute("border","5px");
    select.setAttribute('style','width:45%;font-size:10px;');
    select.setAttribute("id",SELECT_CFG);
    select.setAttribute('title','Select an entry to operate on with the buttons to the right.');
    
    var btnup = document.createElement('input');
    btnup.setAttribute("type","button");
    btnup.setAttribute("border","5px");
    btnup.setAttribute('style','width:5%;font-size:10px;text-align:center;');
    btnup.setAttribute('value','\u2191\u00A0');
    btnup.addEventListener("mouseup", cfgupHandler, true);
    btnup.setAttribute('title','Move the entry specified higher in the quick list.');
    
    var btndn = document.createElement('input');
    btndn.setAttribute("type","button");
    btndn.setAttribute("border","5px");
    btndn.setAttribute('style','width:5%;font-size:10px;text-align:center;');
    btndn.setAttribute('value','\u2193\u00A0');
    btndn.addEventListener("mouseup", cfgdnHandler, true);
    btndn.setAttribute('title','Move the entry specified lower in the quick list.');
    
    var btn = document.createElement('input');
    btn.setAttribute("type","button");
    btn.setAttribute("border","5px");
    btn.setAttribute('style','width:5%;font-size:10px;text-align:center;');
    btn.setAttribute("id","cfgdelQuickUse");
    btn.setAttribute('value','D\u00A0');
    btn.addEventListener("mouseup", cfgdelHandler, true);
    btn.setAttribute('title','Delete the entry specified from the quick list.');
    
    var btnc = document.createElement('input');
    btnc.setAttribute("type","button");
    btnc.setAttribute("border","5px");
    btnc.setAttribute('style','width:5%;font-size:10px;text-align:center;background-color:green');
    btnc.setAttribute('value','\u00A0');
    btnc.addEventListener("mouseup", cfgcolourHandler, true);
    btnc.setAttribute('title','Toggle color of the specified entry.');
    
    var btnr = document.createElement('input');
    btnr.setAttribute("type","button");
    btnr.setAttribute("border","5px");
    btnr.setAttribute('style','width:5%;font-size:10px;text-align:center;');
    btnr.setAttribute('value','R\u00A0');
    btnr.addEventListener("mouseup", cfgresetHandler, true);
    btnr.setAttribute('title','Reset quick list to default state.');
    
    myform.appendChild(select);
    myform.appendChild(btnup);
    myform.appendChild(btndn);
    myform.appendChild(btn);
    myform.appendChild(btnc);
    myform.appendChild(btnr);
    
    var x = document.createElement('tr');
    var y = document.createElement('td');
    x.setAttribute("id",TOP_CFG);
    
    y.setAttribute("colspan","2");
    x.appendChild(y);
    y.appendChild(myform);
    
    if (sibling.nextSibling)
        sibling.parentNode.insertBefore(x,sibling.nextSibling);
    else
        sibling.parentNode.appendChild(x);
}

// create numbered option entries for cfg options
function createCfgOptions(s) {
    var count=1;
    for (var i=0; i<entries.length; i++) {
        if (entries[i].number>0) {
            option = document.createElement("option");
            option.appendChild(document.createTextNode((count)+'. '+entries[i].title));
            option.setAttribute("number",entries[i].number);
            option.setAttribute("descitem",entries[i].descitem);
            option.setAttribute("actionpage",entries[i].actionpage);
            option.setAttribute("actionurl",entries[i].actionurl);
            count++;
            s.appendChild(option);
        }
    }
}

// --------------------------------------------
// ------------- Event handlers----------------
// --------------------------------------------

// event handler for when something is selected from the list
function dropdownHandler(e) {
    var s = document.getElementById(SELECT_QU); 
    var sid=s.selectedIndex; 
    if (parseInt(s.options[sid].value)>0) { // normal selection
        s.selectedIndex=0; 
        doSelection(sid,"yes");
    } else if (s.options[sid].value=="-1") { // configure link
        s.selectedIndex=0; 
        cfgHandler();
    } else if (s.options[sid].value=="-2") { // new version update link
        s.selectedIndex=0; 
        // wipe out any state potentially incorrect after update
        var pname=GM_getValue("currentPlayer","");
        GM_setValue(pname+"_lastselect","0");
        GM_setValue(pname+"_quickbutton","1");
        // update script
        window.open('http://userscripts.org/scripts/source/35691.user.js');
        window.location.reload();
    }
}


// handler for toggling quick button
function toggleHandler() {
    var name=GM_getValue("currentPlayer","");
    if (name!="")
        GM_setValue(name+"_quickbutton",1-parseInt(GM_getValue(name+"_quickbutton","1")));
    var x = document.getElementById(TOP_BUTTON);
    if (x) 
        x.parentNode.removeChild(x);
    else {
        var y = document.getElementById(TOP_MAIN);
        createButton(y);
    }
}

// handler for quick button action
function buttonHandler(e) {
    var lastused=parseInt(this.getAttribute('lastused'));
    if (lastused>0) {
        doSelection(lastused,"no");
    } else {
        alert('Use something from the select box first.');
    }
}


// handler for toggling configure state
function cfgHandler() {
    var pname=GM_getValue("currentPlayer","");
    var b = 1-parseInt(GM_getValue(pname+"_editlinks","0"));
    GM_setValue(pname+"_editlinks",String(b));
    setEditLinks(b);
    
    var cfgform = document.getElementById(TOP_CFG);
    if (b && !cfgform) {
        var p = document.getElementById(TOP_BUTTON);
        if (!p)
            p = document.getElementById(TOP_MAIN);
        createCfgBox(p);
    } else if (!b && cfgform) {
        cfgform.parentNode.removeChild(cfgform);
    }
}


// handler for cfg del button
function cfgdelHandler() {
    var s = document.getElementById(SELECT_CFG); 
    var sid = s.selectedIndex;
    if (sid<=0)
        return;
    var opt = s.options[sid];
    var num = opt.getAttribute('number');
    var di = opt.getAttribute('descitem');
    var act = opt.getAttribute('actionpage');
    var acturl = opt.getAttribute('actionurl');
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==num && entries[i].descitem==di && entries[i].actionpage==act && entries[i].actionurl==acturl) {
            //GM_log("set lastused to 0");
            entries.splice(i,1);
            
            s.options.length=1;
            createCfgOptions(s);
            if (sid<s.options.length)
                s.selectedIndex = sid;
            else
                s.selectedIndex = s.options.length-1;
            
            saveEntries(entries);
            setEditLinks(0);
            setEditLinks(1);
            // now reset entries
            createDropdown();
            return;
        }
    }
}

// handler for cfg up button
function cfgupHandler() {
    var s = document.getElementById(SELECT_CFG);
    var sid = s.selectedIndex;
    if (sid<=1)
        return;
    var opt = s.options[sid];
    var destopt = s.options[sid-1];
    var num = opt.getAttribute('number');
    var descitem = opt.getAttribute('descitem');
    var act = opt.getAttribute('actionpage');
    var acturl = opt.getAttribute('actionurl');
    var option = document.createElement("option");
    option.appendChild(document.createTextNode((sid-1)+'. '+opt.innerHTML.replace(/^[0-9]*\. /,'')));
    option.setAttribute("number",num);
    option.setAttribute("descitem",descitem);
    option.setAttribute("actionpage",act);
    option.setAttribute("actionurl",acturl);
    s.options[sid-1] = option;
    
    option = document.createElement("option");
    option.appendChild(document.createTextNode((sid)+'. '+destopt.innerHTML.replace(/^[0-9]*\. /,'')));
    option.setAttribute("number",destopt.getAttribute('number'));
    option.setAttribute("descitem",destopt.getAttribute('descitem'));
    option.setAttribute("actionpage",destopt.getAttribute('actionpage'));
    option.setAttribute("actionurl",destopt.getAttribute('actionurl'));
    s.options[sid] = option;
    s.selectedIndex = sid-1;
    // fixup quicklist itself
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==num && entries[i].descitem==descitem && entries[i].actionpage==act && entries[i].actionurl==acturl) {
            // move this entry
            var other=i-1;
            var y;
            // need to move one logical unit up, past any special entries
            do {
                var x = entries[i];
                y = entries[other];
                entries[i] = y;
                entries[other] = x;
                other--;
                i--;
            } while(y.number<=0);
            saveEntries(entries);
            // now reset entries
            createDropdown();
            break;
        }
    }
}

// handler for cfg down button
function cfgdnHandler() {
    var s = document.getElementById(SELECT_CFG);
    var sid = s.selectedIndex;
    if (sid>=s.options.length-1)
        return;
    var opt = s.options[sid];
    var destopt = s.options[sid+1];
    var num = opt.getAttribute('number');
    var descitem = opt.getAttribute('descitem');
    var act = opt.getAttribute('actionpage');
    var acturl = opt.getAttribute('actionurl');
    var option = document.createElement("option");
    option.appendChild(document.createTextNode((sid+1)+'. '+opt.innerHTML.replace(/^[0-9]*\. /,'')));
    option.setAttribute("number",num);
    option.setAttribute("descitem",descitem);
    option.setAttribute("actionpage",act);
    option.setAttribute("actionurl",acturl);
    s.options[sid+1] = option;
    
    option = document.createElement("option");
    option.appendChild(document.createTextNode((sid)+'. '+destopt.innerHTML.replace(/^[0-9]*\. /,'')));
    option.setAttribute("number",destopt.getAttribute('number'));
    option.setAttribute("descitem",destopt.getAttribute('descitem'));
    option.setAttribute("actionpage",destopt.getAttribute('actionpage'));
    option.setAttribute("actionurl",destopt.getAttribute('actionurl'));
    s.options[sid] = option;
    s.selectedIndex = sid+1;
    // fixup quicklist itself
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==num && entries[i].descitem==descitem && entries[i].actionpage==act && entries[i].actionurl==acturl) {
            // move this entry
            var other=i+1;
            var y;
            // need to move one logical unit down, past any special entries
            do {
                var x = entries[i];
                y = entries[other];
                entries[i] = y;
                entries[other] = x;
                other++;
                i++;
            } while(y.number<=0);
            saveEntries(entries);
            // now reset entries
            createDropdown();
            break;
        }
    }
}

// handler for cfg reset button
function cfgresetHandler() {
    if (confirm("Reset quick list to default state?")) {
        saveEntries(defaultEntries);
        // wipe out any state potentially incorrect after update
        var pname=GM_getValue("currentPlayer","");
        GM_setValue(pname+"_lastselect","0");
        GM_setValue(pname+"_quickbutton","1");
        GM_setValue(pname+"_editlinks","0");
        setEditLinks(0);
        window.location.reload();
    }
}

// handler for cfg colour button
function cfgcolourHandler() {
    var s = document.getElementById(SELECT_CFG);
    var sid = s.selectedIndex;
    if (sid==0) {
        GM_log("cfgcolourHandler: index is 0");
        return;
    }
    var opt = s.options[sid];
    var num = opt.getAttribute('number');
    var descitem = opt.getAttribute('descitem');
    var act = opt.getAttribute('actionpage');
    var acturl = opt.getAttribute('actionurl');
    // fixup quicklist itself
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==num && entries[i].descitem==descitem && entries[i].actionpage==act && entries[i].actionurl==acturl) {
            var e = entries[i];
            if (e.style=='color:green') {
                // remove colour
                entries[i] = {title:e.title,number:e.number,page:e.page,newpage:e.newpage,actionpage:e.actionpage,actionurl:e.actionurl,counter:e.counter,descitem:e.descitem,style:""};
            } else {
                entries[i] = {title:e.title,number:e.number,page:e.page,newpage:e.newpage,actionpage:e.actionpage,actionurl:e.actionurl,counter:e.counter,descitem:e.descitem,style:"color:green"};
            }
            saveEntries(entries);
            // now reset entries
            createDropdown();
            return;
        }
    }
}


// --------------------------------------------
// ------------- execution code ---------------
// --------------------------------------------

// actually change url according to the selection
function doSelection(sid,record) {
    var s = document.getElementById(SELECT_QU); 
    if (s.options[sid].page=='')
        return; // nothing to do...
    var frames=window.parent.frames;
    if (!frames)
        return;
    for (var i=0;i<frames.length;i++) {
        var mainpane = frames[i];
        if (mainpane.name=="mainpane") {
            if (mainpane.focus) mainpane.focus(); 
            var hash = getPwdHash();
            if (!hash)
                return;
            if (record=="yes") {
                // record use
                var name=GM_getValue("currentPlayer","");
                if (name!="")
                    GM_setValue(name+"_lastselect",String(sid));
            }
            var ap = s.options[sid].getAttribute("actionpage");
            var apu = s.options[sid].getAttribute("actionurl");
            var useurl;
            if (apu && apu !='') {
                useurl=apu;
            } else {
                useurl="/inv_"+ap+".php?pwd="+hash+"&which="+s.options[sid].getAttribute("usepage")+((ap=='equip')?'&action=equip':'')+"&whichitem="+s.options[sid].value; 
            }
            //GM_log("using item "+s.options[sid].innerHTML + ": "+useurl);
            if (s.options[sid].getAttribute("newpage")=="yes") 
                mainpane.location.href=useurl; 
            else {
                GM_setValue('dontparse',1);
                location.href=useurl; 
            }
            break;
        }
    }
}

// --------------------------------------------
// -------------- magic values ----------------
// --------------------------------------------

// get pwdhash from charpane
function getPwdHash() {
    var page = document.documentElement.innerHTML;
    var find = 'pwdhash = ';
    if (page.indexOf(find) >= 0) {
        var i = page.indexOf(find);
        var j = find.length;
        var ps = page.substr(i+j+2);
        var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
        return foundit;
    } 
    return "";
}

////////////////////////////////////////////////////////////////////////////////
// stolen and adapted from Anti-Marty's fortune cookie script
////////////////////////////////////////////////////////////////////////////////
// parse the char pane for the player name
// revised version! now taken directly from kolpreviousnadventures to handle compact mode
function getPlayerNameFromCharpane() {
    var username = document.getElementsByTagName("b");
    if (!username || username.length < 1) return false;
    username = username[0];
    if (!username) return false;
    username = username.firstChild;
    if (!username) return false;
    // in full mode the link is <a><b>Name</b></a>
    // in compact mode it's <b><a>Name</a></b>
    // so have to handle this, and also can use it to tell
    // whether it's in compact mode or not.
    var fullmode = true;
    while (username && username.nodeType == 1)
        {
            username = username.firstChild;
            fullmode = false;
        }
    if (!username) return false;
    username = username.nodeValue;
    if (!username) return false;
    username = username.toLowerCase();
    //alert("found username " + username + ", fullmode: " + fullmode);
    GM_setValue("currentPlayer", username);  // store for other functions that need to know who's playing
    //return {'username': username, 'fullmode': fullmode};
}

// --------------------------------------------
// -------- inventory page functions ----------
// --------------------------------------------

// add links to inventory items to modify the quick list
function addEditLinks(page,doc) {
    var rows = doc.getElementsByTagName('img');
    for (var i=0;i<rows.length;i++)  {
        var image = rows[i];
        if (image && image.getAttribute('onclick') && image.getAttribute('onclick').indexOf('descitem('==0)) {
            // candidate, see if it has a use/eat/drink link
            var itd = image.parentNode;
            while (itd.tagName != 'TD')
                itd = itd.parentNode;
            var ntd = itd.nextSibling;
            if (ntd) {
                var aref = ntd.getElementsByTagName('a');
                var usedKinds="";
                for (var j=0;j<aref.length;j++) {
                    var ahref=aref[j].getAttribute('href');
                    if (ahref && ahref.indexOf('inv_')==0) {
                        var kind = ahref.substr(4,ahref.indexOf('.php')-4);
                        var okkind=false;
                        for (var ki=0;ki<invTargets.length;ki++) {
                            if (kind==invTargets[ki]) {
                                if (usedKinds.indexOf(kind)==-1) {
                                    okkind=true;
                                    usedKinds = usedKinds+":"+kind;
                                }
                                break;
                            }
                        }
                        if (okkind) {
                            // found an item we can handle
                            // find item number
                            var z = ahref.indexOf('whichitem=');
                            var inum = ahref.substr(z+10);
                            var delEntry=false;
                            // see if in the list already
                            if (inEntries(inum,kind))
                                delEntry=true;
                            // find item name
                            var iname = (ntd.getElementsByTagName('b')[0]).innerHTML;
                            var count = (ntd.getElementsByTagName('span')[0]);
                            if (count && count.firstChild && count.firstChild.nodeValue) {
                                count = count.firstChild.nodeValue;
                                var q = count.indexOf('(');
                                if (q>=0) {
                                    count = count.substring(q+1).replace(/^[^0-9]*/,'').replace(/[^0-9].*/,'');
                                    //updateEntry(j,count);
                                } else // must be just 1
                                    count='1';
                            } else count='1';
                            // find parent node to insert into
                            var f = aref[j].parentNode;
                            while (f && f.tagName != 'FONT')
                                f = f.parentNode;
                            if (!f) {
                                //GM_log('cannot place '+iname);
                                continue;//break;
                            }
                            //f.appendChild(document.createTextNode('\u00A0'));
                            // create structure
                            var link = doc.createElement('a');
                            link.setAttribute('name','queditlink');
                            link.setAttribute('qutitle',iname);
                            link.setAttribute('qunumber',inum);
                            link.setAttribute('qupage',page);
                            link.setAttribute('qunewpage','yes');
                            link.setAttribute('quactionpage',kind);
                            link.setAttribute('quactionurl','');
                            link.setAttribute('qucounter',iname.replace(/ /g,'_').replace(/\"/g,'').replace(/\'/g,''));
                            link.setAttribute('qudescitem',image.getAttribute('onclick').replace(/^[^0-9]*/,'').replace(/[^0-9].*/,''));
                            //link.setAttribute('qudescitem',image.getAttribute('onclick').replace(/[^0-9]/g,''));
                            link.setAttribute('qustyle','');
                            link.setAttribute('qucount',count);
                            var extraspace=''
                                if (f.lastChild && f.lastChild.data && f.lastChild.data.charAt(f.lastChild.data.length-1)==')') {
                                    extraspace=' ';
                                    link.setAttribute('quspace',' ');
                                } else
                                    link.setAttribute('quspace','');
                            if (delEntry)
                                link.addEventListener("click", removeEntry, true);
                            else
                                link.addEventListener("click", addEntry, true);
                            if (delEntry) {
                                link.appendChild(doc.createTextNode(extraspace+'[Q'+kind+'-]'));
                            } else {
                                link.appendChild(doc.createTextNode(extraspace+'[Q'+kind+'+]'));
                            }
                            link.setAttribute('title',makeEditLinkTitle(delEntry,link));
                            f.appendChild(link);
                            //break;
                        } 
                    }
                }
            } 
        }
    }
}

function makeEditLinkTitle(delEntry,link) {
    var s='';
    if (delEntry) {
        s = 'This item is already in your quick list, click here to remove it.';
    } else {
        var x = link.getAttribute('quactionpage');
        s='Click here to add a'+(('aeio'.indexOf(x.charAt(0))>=0)?'n':'')+' '+x+' link for this item to your quick list';
    }
    return s;
}

// event handler for add editlink on inventory page
function addEntry(e) {
    var e = {title:this.getAttribute('qutitle'),
             number:this.getAttribute('qunumber'),
             page:this.getAttribute('qupage'),
             newpage:this.getAttribute('qunewpage'),
             actionpage:this.getAttribute('quactionpage'),
             actionurl:this.getAttribute('quactionurl'),
             counter:this.getAttribute('qucounter'),
             descitem:this.getAttribute('qudescitem'),
             style:this.getAttribute('qustyle')};
    var pname=GM_getValue("currentPlayer","");
    GM_setValue(pname+"_lastselect","0");
    //GM_log("set lastused to 0");
    entries = loadEntries();
    var idx=entries.length;
    entries[idx]=e;
    updateEntry(idx,this.getAttribute('qucount'));
    saveEntries(entries);
    this.firstChild.data=this.getAttribute('quspace')+"[Q"+this.getAttribute('quactionpage')+"-]";
    this.setAttribute('title',makeEditLinkTitle(true,this));
    this.removeEventListener("click", addEntry, true);
    this.addEventListener("click", removeEntry, true);
    reloadCharpane();
}

// event handler for remove editlink on inventory page
function removeEntry() {
    entries = loadEntries();
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==this.getAttribute('qunumber') && entries[i].descitem==this.getAttribute('qudescitem') && entries[i].actionpage==this.getAttribute('quactionpage') && entries[i].actionurl==this.getAttribute('quactionurl')) {
            var pname=GM_getValue("currentPlayer","");
            GM_setValue(pname+"_lastselect","0");
            //GM_log("set lastused to 0");
            entries.splice(i,1);
            saveEntries(entries);
            this.firstChild.data=this.getAttribute('quspace')+"[Q"+this.getAttribute('quactionpage')+"+]";
            this.setAttribute('title',makeEditLinkTitle(false,this));
            this.removeEventListener("click", removeEntry, true);
            this.addEventListener("click", addEntry, true);
            reloadCharpane();
            return;
        }
    }
}

// utility function to find and reload the charpane
function reloadCharpane() {
    var frames=window.parent.frames;
    if (!frames)
        return;
    for (var i=0;i<frames.length;i++) {
        var cpane = frames[i];
        if (cpane.name=="charpane") {
            cpane.location.reload();
            return;
        }
    }
}

// change the state of edit links (visible or not)
function setEditLinks(vis) {
    //GM_log('setEditLinks');
    var frames=window.parent.frames;
    if (!frames)
        return;
    for (var i=0;i<frames.length;i++) {
        var cpane = frames[i];
        if (cpane.name=="mainpane") {
            //GM_log('setting mainpane to '+vis);
            if (vis) {
                if (cpane.location.pathname=='/inventory.php') {
                    if ((cpane.document.getElementsByName('queditlink')).length>0)
                        return; // already visible
                    var x = cpane.location.href.indexOf('which=');
                    if (x>=0) {
                        var page = cpane.location.href.substr(x+6).replace(/[^0-9]/g, "");
                        //GM_log("i think i'm on page "+page);
                        if (parseInt(page)>0) {
                            addEditLinks(page,cpane.document);
                        }
                    }
                }
            } else {
                var links = cpane.document.getElementsByName('queditlink');
                for (var j=links.length-1;j>=0;j--) {
                    links[j].parentNode.removeChild(links[j]);
                }
            }
            return;
        }
    }
}

// return whether an entry already exists with the given item number and action
function inEntries(inum,kind) {
    for (var i=0;i<entries.length;i++) {
        if (entries[i].number==inum && entries[i].actionpage==kind)
            return true;
    }
    return false;
}

// update counters by scanning inventory page
// stolen and adapted from Gorloth's ALLCOLOR.user.js
function updateFromInventory() {
    // first set any that should update to 0
    var x = window.location.href.indexOf('which=');
    var page;
    if (x>=0) {
        page = window.location.href.substr(x+6).replace(/[^0-9]/g, "");
        if (parseInt(page)>0) {
            for (var j=0;j<entries.length;j++) {
                if (entries[j].page==page) {
                    updateEntry(j,0);
                }
            }
        }
    }
    
    var rows = document.getElementsByTagName('img');
    var image;
    for (var i=rows.length-1;i>=0;i--)  {
        image = rows[i];
        if (!image )
            continue;
        var imgclick = image.getAttribute('onclick')+'';
        if (!imgclick)
            continue;
        imgclick = imgclick.replace(/^[^\d]*/,'').replace(/[^\d].*/,''); // 'descitem(688312860,0, event);'
        //GM_log("examing: "+imgclick);
        for (var j=0;j<entries.length;j++) {
            if (entries[j].descitem==imgclick) {
                // found the right entry, now to find the name
                var thing=image.parentNode.nextSibling; // next column over
                var count=1;
                if (thing) {
                    thing=thing.getElementsByTagName('SPAN')[0];
                    if (thing && thing.firstChild) {
                        thing = thing.firstChild.nodeValue;
                        if (thing) {
                            //GM_log('found: '+thing);
                            var q = thing.indexOf('(');
                            if (q>=0) {
                                thing = thing.substring(q+1);
                                count=parseInt(thing);
                                //GM_log('found match for '+imgclick);
                            } 
                        }
                    }
                }
                updateEntry(j,count);
            }
        }
    }
    if(page) {
        var pname=GM_getValue("currentPlayer","");
        var editlinks=GM_getValue(pname+"_editlinks","0");
        if (editlinks=="1")
            addEditLinks(page,document);
    }
}


// --------------------------------------------
// -------------- check version ---------------
// --------------------------------------------

var VERSION='2.3.3';

//Nag user with update link if the script is out of date
var outOfDate = GM_getValue('outOfDate','');
if (outOfDate==VERSION) {
    outOfDate='';
    GM_setValue('outOfDate','');
}

// adapted from ALLCOLOR.user.js
//auto-update checking code
var lastUpdateCheck = GM_getValue('lastUpdateCheck','NEVER');
var curTime = new Date().getTime();
if ((lastUpdateCheck == 'NEVER') || (parseInt(lastUpdateCheck) < (curTime - 86400000))) {
    GM_setValue('lastUpdateCheck',''+curTime);
    // go to the script page, parse the header and check the version number
    GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/show/35691',
                onload: function(responseDetails) {
                if (responseDetails.status!=200)
                    return;// make sure completed normally
                var bodyText = responseDetails.responseText;
                var x = bodyText.match(/<meta [^<>]*name=[\'\"]description[\"\']/);
                if (x) {
                    x = x[0].match(/content=[\'\"][^\'\"]*[\'\"]/);
                    if (x) {
                        var content = x[0];
                        x = content.match(/(Version [0-9.]*)/);
                        if (x) {
                            content = x[0].replace(/[^0-9.]/g,'');
                            if (content!=VERSION) {
                                GM_setValue('outOfDate',content);
                                outOfDate=content;
                                //GM_log('Out of date: "'+content+'"');
                            } else {
                                GM_setValue('outOfDate','');
                                outOfDate='';
                                //GM_log('Not out of date: "'+content+'"');
                            }
                        }
                    }
                } 
            }});
}


// --------------------------------------------
// ---------------- main code -----------------
// --------------------------------------------


if(window.location.pathname=='/charpane.php') {
    getPlayerNameFromCharpane();
    if (!entries) 
        entries = loadEntries();
    createDropdown();
    GM_setValue('dontparse',0);
}
if(window.location.pathname=='/inventory.php') {
    if (GM_getValue('dontparse','0')) {
        GM_setValue('dontparse','0');
    } else {
        if (!entries) 
            entries = loadEntries();
        updateFromInventory();
    }
}
