// ==UserScript==
// @name           ToodleDo Folder Categories 2.0
// @namespace      http://userscripts.org
// @description    Allows folders to be grouped
// @include        http://www.toodledo.com/views/*
// @include        https://www.toodledo.com/views/*
// ==/UserScript==

//VERSION 2.2

var toodleDoLeftTabs = function() {
    
    var tabWidth = 140;
    var DEBUG = false;
    var log = function(item) {
        if (DEBUG)
            unsafeWindow.console.log(item);
    };
    
    var $ = function(id) {
        return document.getElementById(id);
    };
    

    var addGlobalStyle = function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
        
        var changeTabStyle = function() {
            addGlobalStyle(
                "#tabs { overflow: none; position:absolute; left:9px;top:35px; height: auto; width: " + tabWidth + "px; z-index:1000 !important;opacity: 0.9; -webkit-border-radius: 0px; -moz-border-radius: 0px; }"+
                ".tab { float: none; }"+
                ".tabon { float: none;  }"+
                ".tab, .tabon { height: 12px; }"+
                ".tl {display: none; }"+
                ".tab a, .tabon a { font-size: 12px; }"+
                "#moretabs { display: none; }"+
                "#tabs .clear {display: none;}"+
                "#tabs:hover > DIV > DIV+DIV {display: block !important;}"+
                "#tabs:hover > DIV+DIV  {display: block !important;}"+
                "#tabs:hover > DIV > DIV+DIV > DIV {display: block !important;}"+
                "#tabs:hover > DIV > .folderGroupClosed > DIV {display: none !important;}"+
                "#tabs .right {display: none;}"
            );
        };
    
    var createContainer = function() {
        var container = document.createElement('div');
        container.id = "contentContainer";
        var head = $("head");
        head.parentNode.insertBefore(container, head);
        var width = getContainerWidth();
        addGlobalStyle(
            "#brg {margin-left: " + tabWidth + "px;}"+
            "#contentContainer { float: left; margin-top: 0px; width: 100% !important;}"+
            "#head {margin-left: " + tabWidth + "px; height: 21px;padding: 3px; overflow: hidden;}" 
        );
        
        
        moveContainer();
    };
    
    var moveContainer = function() {
        $("contentContainer").style.width = getContainerWidth()+"px";
    };
    
    var getContainerWidth = function() {
        var mainWidth = $("main").offsetWidth; 
        var tocWidth = $("toc").offsetWidth;
        
        var newWidth = mainWidth - 50; 
        return newWidth;
    };
    
    var moveElements = function() {
        var elements = ['head', 'sharetask', 'filtertask', 'sorttask', 'searchtask', 'toolbar', 'tip', 'colhead', 'tasks'];
        for (i in elements) {
            moveElement(elements[i]);
        }
    };
    
    var moveElement = function(id) {
        var container = $("contentContainer");
        var element = $(id);
        if (element) 
            container.appendChild($(id));
    };
    
    var initMoveListener = function() {
        window.addEventListener("resize", function() { moveContainer() }, false);
    };
    
    var initTOCListener = function() {
        $("tocc").addEventListener("click", function() {
            setTimeout(moveContainer, 200);
        }, false);
        $("toco").addEventListener("click", function() {
            setTimeout(moveContainer, 200);
        }, false);
    };
    
    window.addEventListener("load", function() { 
        initMoveListener();
        initTOCListener();
        changeTabStyle();
        createContainer();
        moveElements();
    }, false);
};


var toodleDoFolderCategories = function() {
    var DEBUG = false;
    var folderCategories;
    var tabList;
    var old_tabList;
    var curRow;
    var curCol;
    var subNode;
    var method="new"
    var hidden = false;
    var log = function(item) {
        if (DEBUG)
            console.log(item);
    };
    
    var $ = function(id) {
        return document.getElementById(id);
    };
    
    var addGlobalStyle = function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    }
        
        var addFolderCategories = function() {
            var y = 1;
            var categoriesElement = document.createElement('div');
            var tabContainer = $("tabs");
            var id = "Toggle";
            var groupElement = document.createElement('div');
            groupElement.id = id;
            groupElement.className = "folderGroup tab";
            var spanElement = document.createElement("span");
            var tabs = getTabList();
            spanElement.innerHTML = "(" + tabs.length + ")";
            groupElement.addEventListener("click",function() {
                toggleList();
            }, false);
            
            groupElement.appendChild(spanElement);
            categoriesElement.appendChild(groupElement);
            
            tabContainer.insertBefore(categoriesElement, tabContainer.getElementsByTagName("div")[0]);
            
            
            for (var key in folderCategories) {
                var groupElement = document.createElement('div');
                var id =  "folderGroup_"+key;
                groupElement.id = id;
                groupElement.className = "folderGroup tab";
                if (cookie.read(id) == "closed")
                    groupElement.className += " folderGroupClosed";
                var spanElement = document.createElement("span");
                spanElement.innerHTML = folderCategories[key];
                spanElement.addEventListener("click",function() {
                    var parent = this.parentNode;
                    if (parent.className.indexOf("folderGroupClosed") == -1) {
                        parent.className += " folderGroupClosed";
                        cookie.create(parent.id, "closed", 365);
                    }
                    else {
                        parent.className = "folderGroup tab";
                        cookie.erase(parent.id);
                    }
                }, false);
                groupElement.appendChild(spanElement);
                categoriesElement.appendChild(groupElement);
                moveTabsToGroup(key, groupElement);
                y++;
            }
            toggleList();
        };
    
    
    var addFolderCategorieStyle = function() {
        addGlobalStyle(
            ".folderGroup { height: auto; margin:0; background: 0; }"+
            ".folderGroup span { display: block; cursor: pointer; font-size: 13pt; padding: 3px 0; }"+
            ".folderGroup .tab { border: 0;}"+
            ".folderGroup.folderGroupClosed div { display: none; }"+
            ".folderGroup .tab a, .folderGroup .tabon a { font-weight: normal; }"+
            "#Toggle {font-size: 13pt; height: 21px; padding: 3px; font-weight: bold;}"
        );
    };
    
    var moveTabsToGroup = function(key, groupElement) {
        if (method == "old") {
            var re_old = new RegExp(" -?"+key+"$");
        }
        else {
            var re = new RegExp("^"+key+"[/|-]+");
        }
        for (var i = 0; i < tabList.length; i++) {
            var tabName = getTabName(tabList[i]);
            var match = re.exec(tabName);
            if (match) {
                setTabName(tabList[i], tabName.replace(re, ""));
                if (match[0].indexOf("-") != -1) {
                    tabList[i].style.display = "none";
                }
                groupElement.appendChild(tabList[i]);
            }
        }
    };
    
    var getTabList = function() {
        var tabContainer = $("tabs");
        return tabContainer.getElementsByTagName("div");
    };
    
    var getTabName = function(tab) {
        if (tab.getElementsByTagName("a").length != 0) {
            var text = tab.getElementsByTagName("a")[0].innerHTML;
            if (text.indexOf("<i>") != -1)
                text = text.substr(0, text.indexOf(" <i>"));
            return text;
        }
        return '';
    };
    
    var getFullTabName = function(tab) {
        if (tab.getElementsByTagName("a").length != 0) {
            var text = tab.getElementsByTagName("a")[0].innerHTML;
            return text;
        }
        return '';
    };
    
    
    var setTabName = function(tab, tabName) {
        if (tab.getElementsByTagName("a").length != 0) {
            var href = tab.getElementsByTagName("a")[0];
            var text = href.innerHTML;
            if (text.indexOf("<i>") != -1) {
                href.innerHTML = text.replace(/(.*?)<i>/, tabName+" <i>");
            }
            else
                href.innerHTML = tabName;
        };
    };
    
    var getTabFromList = function(name) {
        var list = getTabList();
        for (var i = 0; i < list.length; i++) {
            if (getTabName(list[i]) == name)
                return list[i];
        };
        return false;
    };
    
    
    var prevTag = function() {
        var tabs = getTabList();
        var newTab = getCurrentTab();
        var name = getTabName(tabs[newTab]);        
        newTab = newTab - 1;        
        next_name = getTabName(tabs[newTab]);
        if (name == next_name) {
            newTab = newTab - 1;
        }
        if (newTab > 0) {
            tabClick(tabs[newTab]);
        };
    };
    
    var nextTag = function() {
        var tabs = getTabList();
        var newTab = getCurrentTab() + 1;        
        log(newTab);
        if (newTab < tabs.length) {
            tabClick(tabs[newTab]);
        };
    };
    
    var tabClick = function(tab) {
        log(tab.getElementsByTagName("a")[0]);
        tab = tab.getElementsByTagName("a")[0];
        var oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, tab);
        tab.dispatchEvent(oEvent);
    };
    
    
    var clickNode = function(node) {
        var oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent("click", true, true,window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        node.dispatchEvent(oEvent);
    };
    
    var tabNode = function(node) {
        var oEvent = document.createEvent("KeyboardEvent");
        oEvent.initKeyEvent("keypress", true, true, null , false, false, false, false, 13, 0);
        node.dispatchEvent(oEvent);
    } ;  
    
    var getCurrentTab = function() {
        var tabs = getTabList();
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i]["className"] == "tabon") {
                return i;
            }
        }
        return false;
    };
    
    var updateTitle = function(tabs) {
        for (var i = 2; i < tabs.length; i++) {
            if (tabs[i]["className"] == "tabon") {
                var name = getFullTabName(tabs[i]);
                $("Toggle").innerHTML = name;
            }
        }
    };
    
    var toggleList = function() {
        var tabs = getTabList();
        updateTitle(tabs);
        for (var i = 2; i < tabs.length; i++) {
            if (hidden == true) {
                tabs[i].style.display = "";
                continue;
                    }
            else {
                tabs[i].style.display = "none";
                continue;
                    }
        }
        hidden = !hidden;
        
    };
    var updateList = function() {
        var tabs = getTabList();
        updateTitle(tabs);
    };
    
    var getCategoryKey = function(folderName) {
        var re = new RegExp("z* (.*) (\\w.*)$");
        match = re.exec(folderName);
        if (match) {
            return [match[2], match[1]];
        } else {
            return '';
        }
    };
    
    var getFolderCategories = function() {
        var folderCategories = {};
        var toRemove = [];
        tabList = getTabList();
        for (var i = 0; i < tabList.length; i++) {
            var name = getTabName(tabList[i]);
            if (name.indexOf('z*') == 0) {
                var key = getCategoryKey(name);
                folderCategories[key[0]] = key[1];
                toRemove.push(tabList[i]);
            }
        }
        for (var i = 0; i < toRemove.length; i++) {
            toRemove[i].parentNode.removeChild(toRemove[i]);
        }
        return folderCategories;
    };
    
    function getRowId(mEvent) {
        var myElement = mEvent.target;
        if (myElement.parentNode.parentNode.id.indexOf('row') == 0) {
            rowElement = myElement.parentNode.parentNode;
        }
        if (myElement.parentNode.id.indexOf('row') == 0) {
            rowElement = myElement.parentNode;
        }
        if (myElement.id.indexOf('row') == 0) {
            rowElement = myElement;
        }   
        if (rowElement.id.indexOf('row') == 0) {
            curRow = rowElement.getElementsByTagName("div");
            subNode = '';
            if (rowElement.parentNode.id.indexOf('sub') == 0) {
                subNode = rowElement.parentNode;
            }
            if (rowElement.lastChild.id.indexOf('sub') == 0) {
                subNode = rowElement.lastChild;
            }
        }
        else { 
            curRow = '';
        }
    }
    
    function colSelect(col, option) {
        for (var i = 0; i < curRow.length; i++) {
            if (curRow[i]["className"] == "dett col" + col) {
                clickNode(curRow[i].getElementsByTagName("span")[0]);
                var selNode = curRow[i].getElementsByTagName("select")[0]
                    if (selNode) {
                        selNode.options[option].selected = true;
                        selNode.blur();
                    }
            }
        }
    }
    
    
    function GRT_key(e) {
        var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.;
            var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode;
        var actualkey=String.fromCharCode(unicode);
        if (evtobj.target.nodeName.toLowerCase() == "input" || evtobj.target.nodeName.toLowerCase() == "textarea") {
            return true;
        }
        /* 
        Backslash = toggle menu
        []        = previous / next entry
        .         = toggle menu
        `         = select firstChild (star)
        @         = select first context
        #         = select second context
        $         = select third context
        !         = star item
        */
        if (unicode==220) {
            toggleList();
        }
        if (unicode==221 && !evtobj.altKey) {
            nextTag();
        }
        if (unicode==219 && !evtobj.altKey) {
            prevTag();
        }
        if (unicode==190 && !evtobj.altKey) {
            clickNode($("tocc"));
        }
        if (unicode==192) {
            clickNode(curRow[1].firstChild);
        }
        if (actualkey=="2" && evtobj.shiftKey) {
            colSelect(512,1);
        }
        if (actualkey=="3" && evtobj.shiftKey) {
            colSelect(512,3);
        }
        if (actualkey=="4" && evtobj.shiftKey) {
            colSelect(512,4);
        }
        if (actualkey=="1" && evtobj.shiftKey) {
            clickNode(curRow[0].firstChild);
        }
        if (actualkey=="A" && !evtobj.shiftKey) {
            
            log(subNode.id);
            clickNode(subNode.lastChild.getElementsByTagName('a')[1]);
            return false;
        }
        return true;
    }
    
    var onload = function() {
        tabList = getTabList();        
        for (var i = 0; i < tabList.length; i++) {
            var name = getTabName(tabList[i]);
            if (name.indexOf('z*') != 0) {
                $(tabList[i]["id"]).addEventListener("click", updateList, false);
            }
        }
        folderCategories = getFolderCategories();
        tabList = getTabList();
        addFolderCategorieStyle();
        addFolderCategories();
        document.addEventListener("keydown", GRT_key, false);
        document.addEventListener("`", getRowId, false);
    };
    
    window.addEventListener("load", onload, false);
    
};

var cookie = {
    create: function(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    },
    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    },
    erase: function(name) {
        this.create(name,"",-1);
    }
}
    
    new toodleDoLeftTabs();
new toodleDoFolderCategories();

