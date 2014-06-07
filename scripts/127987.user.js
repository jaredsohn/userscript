// No Next Please
// version 0.3.3 BETA!
// 2012-03-04
// Copyright (c) 2012, sevenever
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Next Please", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          No Next Please
// @namespace     http://www.sevenever.com/greasemonkeyscripts
// @description   Auto load all pages in one article
// @include       *
// @version       0.3.3
// ==/UserScript==

NoNextPlease_default_config = {};

NoNextPlease_default_config.debug = true;
NoNextPlease_default_config.maxrecursion = 9;
NoNextPlease_default_config.nextthreshold = 4;
NoNextPlease_default_config.contentthreshold = 200;
NoNextPlease_default_config.buttonColor = "#4e7";
NoNextPlease_default_config.buttonTextColor = "#000";
NoNextPlease_default_config.cookieroot = false;
NoNextPlease_default_config.autoload = false;
NoNextPlease_default_config.disabled = false;
NoNextPlease_default_config.hideme = false;




if(typeof GM_log == "undefined" || !GM_log) {
    GM_log = console.debug;
}
if(typeof GM_registerMenuCommand === "undefined" || !GM_registerMenuCommand) {
    GM_registerMenuCommand = function(s, f) {
    }
}

function NoNextPlease(doc) {
    if(window.innerWidth == 0 && window.innerHeight == 0) {
        return undefined;
    }

    var me = this;
    GM_registerMenuCommand("NoNextPlease: Show control panel",
        function(){
            me.init();
            me.show_config_panels(true);
        });

    GM_registerMenuCommand("NoNextPlease: Reset whole site settings",
        function(){
            NoNextPlease_config.deleteLocalStorage();
            NoNextPlease_config.deleteRootCookie(document.location.host);
            alert("Whole site settings for " + document.location.host + " reset.");
        });
    
    this.config = new NoNextPlease_config(doc);
    
    
    this.document = doc;
    this.firstContent = null;
    this.nextSibling = null;
    
    this.config_panels = [];
    this.config_panel_to_next = null;
    
    this.content_links = [];
    this.content_count = 0;
    this.cur_content = 0;
    
    this.initialized = false;
    
    if(this.config.getDisabled()) {
        return undefined;
    }
    
    this.init();
        
    if(this.config.getAutoload()) {
        this.initiate_merge();
    }
}


NoNextPlease.prototype.init = function() {
    if(this.initialized) {
        return;
    }
    this.initialized = true;
    // search next by default settings, if found, move the control handler next to the next link
    var next = this.search_next_pre_link(this.document, "next");
    if(next) {
        this.firstContent = this.search_content_by_next(this.document, next);
        if(this.firstContent) {
            this.nextSibling = this.firstContent.nextSibling;
            if(!this.nextSibling && this.firstContent.parentNode) {
                // if the content has no nextSibling, create a anchor as nextSibling
                this.nextSibling = this.document.createElement("A");
                this.firstContent.parentNode.appendChild(this.nextSibling);
            }
        }
        this.refresh_config_panel_to_next();
        
        this.iframe = this.document.createElement("IFRAME");
        this.iframe.hidden = true;
        this.document.body.appendChild(this.iframe);
        
        this.fixed_config_panel = this.create_config_panel();
        this.move_fixed_config_panel(3);
        this.document.body.appendChild(this.fixed_config_panel);
    
        this.config_panels.push(this.fixed_config_panel);
            
        var content_link = this.document.createElement("A");
        content_link.style.display = "inline";
        this.document.body.insertBefore(content_link, this.document.body.firstChild);
        
        this.content_links.push(content_link);
        this.content_count++;
        this.sync_all_config_panel();
    }
}

NoNextPlease.prototype.refresh_config_panel_to_next = function() {
    if(this.config_panel_to_next) {
        this.config_panel_to_next.parentNode.removeChild(this.config_panel_to_next);
    }
    var next = this.search_next_pre_link(this.document, "next");
    if(next) {
        if(!this.config_panel_to_next) {
            this.config_panel_to_next = this.create_config_panel();
            this.config_panel_to_next.style.position="relative";
            this.config_panel_to_next.style.left = 0;
            this.config_panel_to_next.style.top = 0;
            
            this.config_panels.push(this.config_panel_to_next);
        }
        next.parentNode.insertBefore(this.config_panel_to_next, next.nextSibling);
    }
}

NoNextPlease.prototype.create_config_panel = function() {
    var panel = this.document.createElement("DIV");
    panel.className = "NoNextPlease.config.panel"
    panel.style.backgroundColor="white";
    panel.style.display = "inline";
    panel.style.color = "black";
    panel.style.width = "auto";

    var handler = this.document.createElement("DIV");
    handler.style.border = "solid 1px";
    handler.style.textAlign = "right";
    // var navigator = this.document.createElement("DIV");
    var last = this.document.createElement("A");
    last.style.borderStyle = "solid"
    last.style.borderWidth = "0px 1px 0px 1px";
    last.style.color = this.config.getButtonTextColor();
    last.style.backgroundColor = this.config.getButtonColor();
    last.style.textDecoration = "none"
    last.style.padding = "1px 20px 1px 20px";
    last.style.margin = "0px 2px 0px 2px";
    last.style.width = "auto";
    last.style.height = "auto";
    last.style.textAlign = "center";
    last.href = "javascript:;";
    last.target = "_self";
    last.innerHTML = "<";
    handler.appendChild(last);
    var cur = this.document.createElement("SPAN");
    cur.style.borderStyle = "solid"
    cur.style.borderWidth = "0px 1px 0px 1px";
    cur.style.color = this.config.getButtonTextColor();
    cur.style.backgroundColor = this.config.getButtonColor();
    cur.style.padding = "1px 10px 1px 10px";
    cur.style.margin = "0px 2px 0px 2px";
    cur.style.width = "auto";
    cur.style.height = "auto";
    cur.style.textAlign = "center";
    cur.innerHTML = this.cur_content + 1;
    handler.appendChild(cur);
    var next = this.document.createElement("A");
    next.style.borderStyle = "solid"
    next.style.borderWidth = "0px 1px 0px 1px";
    next.style.color = this.config.getButtonTextColor();
    next.style.backgroundColor = this.config.getButtonColor();
    next.style.textDecoration = "none"
    next.style.padding = "1px 20px 1px 20px";
    next.style.margin = "0px 2px 0px 2px";
    next.style.width = "auto";
    next.style.height = "auto";
    next.style.textAlign = "center";
    next.href = "javascript:;";
    next.target = "_self";
    next.innerHTML = ">";
    handler.appendChild(next);
    
    
    var feellucky = this.document.createElement("A");
    feellucky.style.border = "solid"
    feellucky.style.borderWidth = "0px 1px 0px 1px";
    feellucky.style.color = this.config.getButtonTextColor();
    feellucky.style.backgroundColor = this.config.getButtonColor();
    feellucky.style.textDecoration = "none"
    feellucky.style.padding = "1px 2px 1px 2px";
    feellucky.style.margin = "0px 1px 0px 0px";
    feellucky.style.width = "auto";
    feellucky.style.height = "auto";
    feellucky.style.textAlign = "center";
    feellucky.href = "javascript:;";
    feellucky.target = "_self"
    feellucky.innerHTML = "NoNextPlease";
    handler.appendChild(feellucky);


    var minimize = this.document.createElement("A");
    minimize.style.borderStyle = "solid"
    minimize.style.borderWidth = "0px 1px 0px 1px";
    minimize.style.color = this.config.getButtonTextColor();
    minimize.style.backgroundColor = this.config.getButtonColor();
    minimize.style.textDecoration = "none"
    minimize.style.padding = "1px 2px 1px 2px";
    minimize.style.margin = "0px 2px 0px 2px";
    minimize.style.width = "auto";
    minimize.style.height = "auto";
    minimize.style.textAlign = "center";
    minimize.href = "javascript:;";
    minimize.target = "_self";
    minimize.innerHTML = "_";
    handler.appendChild(minimize);

    var maximize = this.document.createElement("A");
    maximize.style.borderStyle = "solid"
    maximize.style.borderWidth = "0px 1px 0px 1px";
    maximize.style.color = this.config.getButtonTextColor();
    maximize.style.backgroundColor = this.config.getButtonColor();
    maximize.style.textDecoration = "none"
    maximize.style.padding = "1px 2px 1px 2px";
    maximize.style.margin = "0px 2px 0px 2px";
    maximize.style.width = "auto";
    maximize.style.height = "auto";
    maximize.style.textAlign = "center";
    maximize.href = "javascript:;";
    maximize.target = "_self";
    maximize.innerHTML = "O";
    handler.appendChild(maximize);

    var close = this.document.createElement("A");
    close.style.borderStyle = "solid"
    close.style.borderWidth = "0px 1px 0px 1px";
    close.style.color = this.config.getButtonTextColor();
    close.style.backgroundColor = this.config.getButtonColor();
    close.style.textDecoration = "none"
    close.style.padding = "1px 2px 1px 2px";
    close.style.margin = "0px 2px 0px 2px";
    close.style.width = "auto";
    close.style.height = "auto";
    close.style.textAlign = "center";
    close.href = "javascript:;";
    close.target = "_self";
    close.innerHTML = "X";
    handler.appendChild(close);

    panel.appendChild(handler);

    var config = this.document.createElement("DIV");
    config.style.border = "solid 1px"
    config.style.borderTopStyle = "none"
    config.style.textAlign = "left"

    panel.appendChild(config);

    var span = this.document.createElement("SPAN")
    span.innerHTML = "Max&nbsp;recursion:";
    config.appendChild(span);
    var maxrecursion = this.document.createElement("INPUT");
    maxrecursion.type = "text"
    maxrecursion.size = 2;
    maxrecursion.maxLength = 2;
    maxrecursion.value = this.config.getMaxrecursion();
    config.appendChild(maxrecursion);
    config.appendChild(this.document.createElement("BR"));

    var span = this.document.createElement("SPAN")
    span.innerHTML = "Threshold&nbsp;to&nbsp;detect&nbsp;content:";
    config.appendChild(span);
    var contentthreshold = this.document.createElement("INPUT");
    contentthreshold.type = "text"
    contentthreshold.size = 5;
    contentthreshold.maxLength = 5;
    contentthreshold.value = this.config.getContentthreshold();
    config.appendChild(contentthreshold);
    config.appendChild(this.document.createElement("BR"));

    var span = this.document.createElement("SPAN")
    span.innerHTML = "Button&nbsp;color:";
    config.appendChild(span);
    var buttonColor = this.document.createElement("INPUT");
    buttonColor.type = "text"
    buttonColor.size = 7;
    buttonColor.maxLength = 7;
    buttonColor.value = this.config.getButtonColor();
    config.appendChild(buttonColor);
    config.appendChild(this.document.createElement("BR"));
    
    var span = this.document.createElement("SPAN")
    span.innerHTML = "Button&nbsp;text&nbsp;color:";
    config.appendChild(span);
    var buttonTextColor = this.document.createElement("INPUT");
    buttonTextColor.type = "text"
    buttonTextColor.size = 7;
    buttonTextColor.maxLength = 7;
    buttonTextColor.value = this.config.getButtonTextColor();
    config.appendChild(buttonTextColor);
    config.appendChild(this.document.createElement("BR"));

    var autoload = this.document.createElement("INPUT");
    autoload.type = "checkbox";
    autoload.checked = this.config.getAutoload();
    autoload.name = "NoNextPlease.autoload"
    var label = this.document.createElement("LABEL")
    label.innerHTML = "Autoload mode:";
    label.htmlFor = autoload.name;
    config.appendChild(label);
    config.appendChild(autoload);

    var hideme = this.document.createElement("INPUT");
    hideme.type = "checkbox";
    hideme.checked = this.config.getHideme();
    hideme.name = "NoNextPlease.hideme"
    var label = this.document.createElement("LABEL")
    label.innerHTML = "Hide me:";
    label.htmlFor = hideme.name;
    label.style.marginLeft = "5px";
    config.appendChild(label);
    config.appendChild(hideme);

    var disabled = this.document.createElement("INPUT");
    disabled.type = "checkbox";
    disabled.checked = this.config.getDisabled();
    disabled.name = "NoNextPlease.disabled"
    var label = this.document.createElement("LABEL")
    label.innerHTML = "Disable me:";
    label.htmlFor = disabled.name;
    label.style.marginLeft = "5px";
    config.appendChild(label);
    config.appendChild(disabled);
    config.appendChild(this.document.createElement("BR"));

    var cookieroot = this.document.createElement("INPUT");
    cookieroot.type = "checkbox";
    cookieroot.checked = this.config.getCookieRoot();
    cookieroot.name = "NoNextPlease.cookieroot"
    var label = this.document.createElement("LABEL")
    label.innerHTML = "Save optins for Whole site:";
    label.htmlFor = cookieroot.name;
    config.appendChild(label);
    config.appendChild(cookieroot);
    config.appendChild(this.document.createElement("BR"));
    
    var span = this.document.createElement("SPAN")
    span.innerHTML = "Reset&nbsp;settings&nbsp;for:";
    config.appendChild(span);
    
    var deletesiteconfig = this.document.createElement("A");
    deletesiteconfig.href = "javascript:";
    deletesiteconfig.target = "_self";
    deletesiteconfig.innerHTML = "whole site";
    deletesiteconfig.style.padding = "1px 5px 1px 5px";
    deletesiteconfig.style.margin = "0px 2px 0px 2px";
    config.appendChild(deletesiteconfig);
    
    var deletepageconfig = this.document.createElement("A");
    deletepageconfig.href = "javascript:";
    deletepageconfig.target = "_self";
    deletepageconfig.innerHTML = "this page";
    deletepageconfig.style.padding = "1px 5px 1px 5px";
    deletepageconfig.style.margin = "0px 2px 0px 2px";
    config.appendChild(deletepageconfig);
    config.appendChild(this.document.createElement("BR"));
    
    var span = this.document.createElement("SPAN")
    span.innerHTML = "Fixed&nbsp;config&nbsp;panel&nbsp;position:";
    var topleft = this.document.createElement("A");
    topleft.href = "javascript:";
    topleft.target = "_self";
    topleft.innerHTML = "1";
    topleft.style.padding = "1px 5px 1px 5px";
    topleft.style.margin = "0px 2px 0px 2px";
    span.appendChild(topleft);
    var topright = this.document.createElement("A");
    topright.href = "javascript:";
    topright.target = "_self";
    topright.innerHTML = "2";
    topright.style.padding = "1px 5px 1px 5px";
    topright.style.margin = "0px 2px 0px 2px";
    span.appendChild(topright);
    var bottomright = this.document.createElement("A");
    bottomright.href = "javascript:";
    bottomright.target = "_self";
    bottomright.innerHTML = "3";
    bottomright.style.padding = "1px 5px 1px 5px";
    bottomright.style.margin = "0px 2px 0px 2px";
    span.appendChild(bottomright);
    var bottomleft = this.document.createElement("A");
    bottomleft.href = "javascript:";
    bottomleft.target = "_self";
    bottomleft.innerHTML = "4";
    bottomleft.style.padding = "1px 5px 1px 5px";
    bottomleft.style.margin = "0px 2px 0px 2px";
    span.appendChild(bottomleft);
    
    config.appendChild(span);
    config.appendChild(this.document.createElement("BR"));

    config.style.display = "none";
    panel.appendChild(config);


    var me = this;
    minimize.addEventListener("click", function(){config.style.display="none";}, false);
    maximize.addEventListener("click", function(){config.style.display="block";config.scrollIntoView(false);}, false);
    close.addEventListener("click", function(){panel.style.display="none";}, false);
    
    topleft.addEventListener("click", function(){me.move_fixed_config_panel(1);}, false);
    topright.addEventListener("click", function(){me.move_fixed_config_panel(2);}, false);
    bottomright.addEventListener("click", function(){me.move_fixed_config_panel(3);}, false);
    bottomleft.addEventListener("click", function(){me.move_fixed_config_panel(4);}, false);
    
    last.addEventListener("click", function(){me.navigate(-1);}, false);
    next.addEventListener("click", function(){me.navigate(1);}, false);
    feellucky.addEventListener("click", NoNextPlease.debug_wrapper(function(){me.NoNextPlease(panel);}), false);
    deletesiteconfig.addEventListener("click", NoNextPlease.debug_wrapper(function(){
                                                        NoNextPlease_config.deleteLocalStorage();
                                                        NoNextPlease_config.deleteRootCookie(document.location.host);
                                                        alert("Whole site settings for " + document.location.host + " reset.");}), false);
    deletepageconfig.addEventListener("click", NoNextPlease.debug_wrapper(function(){
                                                        me.config.deletePageSettings();
                                                        me.config.load();
                                                        me.show_config();
                                                        alert("Settings for this page reset.");}), false);

    panel.cur = cur;
    panel.maxrecursion = maxrecursion;
    panel.contentthreshold = contentthreshold
    panel.buttonColor = buttonColor;
    panel.buttonTextColor = buttonTextColor;
    panel.cookieroot = cookieroot;
    panel.autoload = autoload;
    panel.disabled = disabled;
    panel.hideme = hideme;
    
    panel.setButtonColor = function(c, bc) {
        var buttons = [last, cur, next, feellucky, minimize, maximize, close];
        for(var i=0;i<buttons.length;i++) {
            var b = buttons[i];
            b.style.color = c;
            b.style.backgroundColor = bc;
        }
    }
    
    panel.style.zIndex=10000;
    if(this.config.getHideme()) {
        panel.style.display = "none";
    }
        
    return panel;
}

NoNextPlease.prototype.move_fixed_config_panel = function(pos) {
    this.fixed_config_panel.style.position = "fixed"
    this.fixed_config_panel.style.top = "";
    this.fixed_config_panel.style.bottom = "";
    this.fixed_config_panel.style.left = "";
    this.fixed_config_panel.style.right = "";
    switch(pos){
        case 1: {
            this.fixed_config_panel.style.top = 0;
            this.fixed_config_panel.style.left = 0;
            break;
            }
        case 2: {
            this.fixed_config_panel.style.top = 0;
            this.fixed_config_panel.style.right = 0;
            break;
            }
        case 3: {
            this.fixed_config_panel.style.bottom = 0;
            this.fixed_config_panel.style.right = 0;
            break;
            }
        case 4: {
            this.fixed_config_panel.style.bottom = 0;
            this.fixed_config_panel.style.left = 0;
            break;
            }
    }
    if(!this.config.getHideme()){
        this.fixed_config_panel.style.display = "block";
    }
}

NoNextPlease.prototype.apply_config = function(panel) {
    try{
        this.config.setMaxrecursion(parseInt(panel.maxrecursion.value));
    }catch(err){
    }
    try{
        this.config.setContentthreshold(parseInt(panel.contentthreshold.value));
    }catch(err){
    }
    try{
        var buttonColor = panel.buttonColor.value;
        if(buttonColor.charAt(0) != "#") {
            buttonColor = "#" + buttonColor;
        }
        this.config.setButtonColor(buttonColor);
    }catch(err){
        GM_log(err);
    }
    try{
        var buttonTextColor = panel.buttonTextColor.value;
        if(buttonTextColor.charAt(0) != "#") {
            buttonTextColor = "#" + buttonTextColor;
        }
        this.config.setButtonTextColor(buttonTextColor);
    }catch(err){
        GM_log(err);
    }
    try{
        var cookieroot = panel.cookieroot.checked;
        this.config.setCookieRoot(cookieroot);
    }catch(err){
        GM_log(err);
    }
    try{
        var autoload = panel.autoload.checked;
        this.config.setAutoload(autoload);
    }catch(err){
        GM_log(err);
    }
    try{
        var disabled = panel.disabled.checked;
        this.config.setDisabled(disabled);
    }catch(err){
        GM_log(err);
    }
    try{
        var hideme = panel.hideme.checked;
        this.config.setHideme(hideme);
    }catch(err){
        GM_log(err);
    }
    
    for(var i=0;i<this.config_panels.length;i++) {
        var p = this.config_panels[i];
        p.setButtonColor(this.config.getButtonTextColor(), this.config.getButtonColor());
    }
}

NoNextPlease.prototype.show_config = function() {
    for(var i=0;i<this.config_panels.length;i++) {
        var p = this.config_panels[i];
        p.maxrecursion.value = this.config.getMaxrecursion();
        p.contentthreshold.value = this.config.getContentthreshold();
        p.buttonColor.value = this.config.getButtonColor();
        p.buttonTextColor.value = this.config.getButtonTextColor();
        p.cookieroot.checked = this.config.getCookieRoot();
        p.autoload.checked = this.config.getAutoload();
        p.disabled.checked = this.config.getDisabled();
        p.hideme.checked = this.config.getHideme();
        p.setButtonColor(this.config.getButtonTextColor(), this.config.getButtonColor());
    }
}

NoNextPlease.prototype.NoNextPlease = function(panel) {
    this.apply_config(panel);
    
    if(!this.config.isDefault()) {
        this.config.save();
    }
    
    this.sync_all_config_panel();
    
    if(this.config.getDisabled() || this.config.getHideme()) {
        this.show_config_panels(false);
    }
    
    if(this.config.getDisabled()) {
        return;
    }
    
    this.initiate_merge();
}

NoNextPlease.prototype.show_config_panels = function(show) {
    for(var i=0;i<this.config_panels.length;i++) {
        var p = this.config_panels[i];
        p.style.display = (show ? "block" : "none");
    }
}


NoNextPlease.prototype.initiate_merge = function() {
    var next = this.search_next_pre_link(this.document, "next");
    if(next) {
        this.firstContent = this.search_content(this.document);
        if(this.firstContent) {
            this.nextSibling = this.firstContent.nextSibling;
            if(!this.nextSibling) {
                // if the content has no nextSibling, create a anchor as nextSibling
                this.nextSibling = this.document.createElement("A");
                this.firstContent.parentNode.appendChild(this.nextSibling);
            }
            
            var me = this;
            this.iframe.addEventListener("load", NoNextPlease.debug_wrapper(function(){me.append_content();}), false);
            this.currecursion = this.config.getMaxrecursion();
            this.iframe.src = next.href;
            //DOMContentLoaded
        }
    }
}

NoNextPlease.prototype.sync_all_config_panel = function() {
    // for each(var panel in this.config_panels) {
    // fuck chrome
    for(var i=0;i<this.config_panels.length;i++) {
        panel = this.config_panels[i];
        panel.maxrecursion.value = this.config.getMaxrecursion();
        panel.contentthreshold.value = this.config.getContentthreshold();
        panel.buttonColor.value = this.config.getButtonColor();
        panel.buttonTextColor.value = this.config.getButtonTextColor();
        panel.cookieroot.checked = this.config.getCookieRoot();
        panel.autoload.checked = this.config.getAutoload();
        panel.disabled.checked = this.config.getDisabled();
        panel.hideme.checked = this.config.getHideme();
        panel.cur.innerHTML = (this.cur_content + 1) + "/" + this.content_count;
    }
}

NoNextPlease.prototype.append_content = function() {
    // need to search next first, or it will be moved from iframe
    var next = this.search_next_pre_link(this.iframe.contentDocument, "next");

    var content = this.search_content(this.iframe.contentDocument);
    if(content.parentNode) {
        content.parentNode.removeChild(content);
    }
    
    if(this.firstContent && content) {
        this.firstContent.parentNode.insertBefore(content, this.nextSibling);
        
        var content_link = this.document.createElement("A");
        // content_link.name = "NoNextPlease_content" + this.content_count;
        // content_link.id = content_link.name;
        content_link.style.display = "inline";
        if(content.parentNode) {
            content.parentNode.insertBefore(content_link, content);
        } else {
            content.insertBefore(content_link, content.firstChild);
        }
        this.content_links.push(content_link);
        
        this.content_count++;
        this.sync_all_config_panel();
    }
    this.currecursion--;
    
    this.refresh_config_panel_to_next();
    
    if(next && this.currecursion>0) {
        this.iframe.src = next.href;
    } 
}

NoNextPlease.prototype.navigate = function(step) {
    this.cur_content += step;
    if(this.cur_content<0) {
        this.cur_content = 0;
    } else if (this.cur_content>this.content_links.length) {
        this.cur_content = this.content_links.length - 1;
    }
    this.content_links[this.cur_content].scrollIntoView(true);
    this.sync_all_config_panel();
}

NoNextPlease.prototype.search_content = function(doc) {
    var next = this.search_next_pre_link(doc, "next");
    var content = this.search_content_by_next(doc, next);
    if(!content) {
        var pre = this.search_next_pre_link(doc, "pre");
        content = this.search_content_by_pre(doc, pre);
    }
    return content;
}

NoNextPlease.prototype.search_content_by_next = function(doc, next) {
    var content = null;
    if(next){
        var nextlen = next.textContent.length;
        var content = next;

        while(content!=doc && content.tagName != "BODY" && this.strip_config_panel_textContent(content.textContent).length<this.config.getContentthreshold()) {
           content = content.parentNode;
        }
        while((content.childNodes.length == 1 && content!=doc && content.tagName != "BODY")
                || content.tagName == "TD"
                || content.tagName == "TH") {
            content = content.parentNode;
        }
    }
    return content;
}

NoNextPlease.prototype.search_content_by_pre = function(doc, pre) {
    var content = null;
    if(pre){
        var nextlen = pre.textContent.length;
        var content = pre;

        while(content!=doc && content.tagName != "BODY" && this.strip_config_panel_textContent(content.textContent).length<this.config.getContentthreshold()) {
            content = content.parentNode;
        }
        while((content.childNodes.length == 1 && content!=doc && content.tagName != "BODY")
                || content.tagName == "TD"
                || content.tagName == "TH") {
            content = content.parentNode;
        }
    }
    return content;
}

NoNextPlease.prototype.search_next_pre_link = function(doc, mode) {
    var max_match=0;
    var next_pre_link=null;
    // for each(var a in doc.getElementsByTagName("A")) {
    // fuck chrome
    var as = doc.getElementsByTagName("A");
    for(var i=0;i<as.length;i++) {
        a = as[i];
        try{
            var match = this.match_pre_next(a, mode);
            if( match >= max_match && match >= this.config.getNextthreshold() )  {
                max_match = match;
                next_pre_link = a;
            }
        }catch(err){
            GM_log(err);
        }
    }
    return next_pre_link;
}

NoNextPlease.prototype.match_pre_next = function(link, mode) {
    var one_step_tokens;
    var one_step_symbols;
    var to_end_tokens;
    var to_end_symbols;

    var next_tokens = ["next", "下一页", "下页", "后一页", "后页"];
    var next_symbols = [">", "›", "＞"];
    var last_tokens = ["last", "最后", "末页"];
    var last_symbols = [">>", "»", "＞＞"];
    var pre_tokens = ["pre", "previous", "上一页", "上页", "前一页", "前页"]
    var pre_symbols = ["<", "‹", "＜"]
    var first_tokens = ["first", "第一页", "首页"]
    var first_symbols = ["<<", "«", "＜＜"]
    if(mode=="next") {
        one_step_tokens = next_tokens;
        one_step_symbols = next_symbols;
        to_end_tokens = last_tokens;
        to_end_symbols = last_symbols;
    } else {
        one_step_tokens = pre_tokens;
        one_step_symbols = pre_symbols;
        to_end_tokens = first_tokens;
        to_end_symbols = first_symbols;
    }

    var score = 0;
    var textContent = link.textContent;
    if(textContent.length>20) {
        return 0;
    }
    if(link.href.charAt(link.href.length-1) == "#" || link.href.substr(0, 11) == "javascript:" )  {
        return 0;
    }

    if(NoNextPlease.equals_multi_token(textContent.toLowerCase(), one_step_tokens)>=0) {
        score += 4;
    }
    else if(NoNextPlease.indexOf_multi_token(textContent.toLowerCase(), one_step_tokens)>=0) {
        score += 2;
    }
    if(NoNextPlease.equals_multi_token(textContent.toLowerCase(), one_step_symbols)>=0) {
        score += 4;
    }
    else if(NoNextPlease.indexOf_multi_token(textContent.toLowerCase(), one_step_symbols)>=0 && textContent.length <= 6) {
        score += 2;
    }

    var title = link.title;
    if(NoNextPlease.indexOf_multi_token(title.toLowerCase(), one_step_tokens)>=0) {
        score += 2;
    }

    var className = link.className;

    var parent_node = link.parentNode;
    while((parent_node.childNodes.length == 1 || 
            ( parent_node.childNodes.length == 2 && this.config_panel_in(parent_node.childNodes)) ) && 
          parent_node.tagName != "BODY") {
        parent_node = parent_node.parentNode;
        className += " " + parent_node.className;
    }
    if(NoNextPlease.indexOf_multi_token(className.toLowerCase(), one_step_tokens)>=0) {
        score += 2;
    }

    if(parent_node.childNodes.length>1 && score >= 2) {
        var p_txt = parent_node.textContent;
        p_txt = this.strip_config_panel_textContent(p_txt).toLowerCase().replace(/\n/g,"").replace(" ", "");
        if(p_txt.length <= 50 || true) {
            if(NoNextPlease.index_of_continual_num(p_txt, 3)>=0) {
                score += 2;
            }
            var next_idx = NoNextPlease.indexOf_multi_token(p_txt, next_tokens);
            var pre_idx = NoNextPlease.indexOf_multi_token(p_txt, pre_tokens);
            var last_idx = NoNextPlease.indexOf_multi_token(p_txt, last_tokens);
            var first_idx = NoNextPlease.indexOf_multi_token(p_txt, first_tokens);
            if(last_idx>=0) {
                if(p_txt.lastIndexOf(last_tokens[last_idx]) + last_tokens[last_idx].length == p_txt.length) {
                    score += 2;
                }else{
                    score += 1;
                }
            }
            if(first_idx>=0) {
                if(p_txt.indexOf(first_tokens[first_idx]) == 0) {
                    score += 2;
                }else{
                    score += 1;
                }
            }

            if(next_idx>=0 && last_idx>=0) {
                if (p_txt.lastIndexOf(last_tokens[last_idx])>p_txt.lastIndexOf(next_tokens[next_idx])) {
                    score += 2;
                    if (p_txt.lastIndexOf(last_tokens[last_idx]) - p_txt.lastIndexOf(next_tokens[next_idx]) < next_tokens[next_idx].length + 4) {
                        score += 2;
                    }
                }
            }
            if(pre_idx>=0 && first_idx>=0) {
                if (p_txt.indexOf(pre_tokens[pre_idx])>p_txt.indexOf(first_tokens[first_idx])) {
                    score += 2;
                    if (p_txt.indexOf(pre_tokens[pre_idx]) - p_txt.indexOf(first_tokens[first_idx]) < first_tokens[first_idx].length + 4) {
                        score += 2;
                    }
                }
            }


            var idx = NoNextPlease.index_of_continual_num(p_txt, 3);
            if(idx>=0) {
                //stripped the consequence number
                var stripped = p_txt.substr(0, idx);
                var i = parseInt(p_txt.charAt(idx));
                while(true) {
                    if(p_txt.charAt(idx)!=i.toString()) {
                        break;
                    }
                    i++;
                    idx++;
                }
                stripped += p_txt.substr(idx);

                stripped = NoNextPlease.replaceAll(stripped, [].concat(next_tokens, next_symbols, last_tokens, last_symbols, pre_tokens, pre_symbols, first_tokens, first_symbols));

                if(stripped.length * 2 < p_txt.length) {
                    score += 4;
                }
            }
        }
    }

    return score;
}

NoNextPlease.prototype.config_panel_in = function(arr) {
    // for each(var p in this.config_panels) {
    // fuck chrome
    for(var i=0;i<this.config_panels.length;i++) {
        p = this.config_panels[i];
        // for each(var o in arr) {
        // fuck chrome
        for(var j=0;j<arr.length;j++) {
            o = arr[j];
            try {
                if( o == p ) {
                    return true;
                }
            }catch(err){
            }
        }
    }
    return false;
}

NoNextPlease.prototype.strip_config_panel_textContent = function(o) {
    // for each(var p in this.config_panels) {
    // fuck chrome
    for(var i=0;i<this.config_panels.length;i++) {
        p = this.config_panels[i];
        try {
            var o = o.replace(p.textContent, "");
        }catch(err){
        }
    }
    return o;
}

NoNextPlease.index_of_continual_num = function(txt, minc) {
    for(var i=1;i<100;i++) {
        var t = "";
        for(var j=0;j<minc;j++) {
            t = t + (i+j).toString();
        }
        var n = txt.indexOf(t);
        if(n>=0) {
            return n;
        }
    }
    return -1;
}

NoNextPlease.indexOf_multi_token = function(s, ts) {
    for(var i=0;i<ts.length;i++) {
        var n = s.indexOf(ts[i]);
        if(n>=0) {
            return i;
        }
    }
    return -1;
}

NoNextPlease.equals_multi_token = function(s, ts) {
    for(var i=0;i<ts.length;i++) {
        if(s == ts[i]) {
            return i;
        }
    }
    return -1;
}

NoNextPlease.replaceAll = function(s, ts) {
    // for each(var t in ts) {
    // fuck chrome
    for(var i=0;i<ts.length;i++) {
        t = ts[i];
        s = s.replace(t, "");
    }
    return s;
}

NoNextPlease.debug_wrapper = function(f) {
    if(!NoNextPlease_default_config.debug) {
        return f;
    }
    var func = function(){
        try{
            f();
        }catch(err){
            GM_log(err);
        }
    };
    return func;
}
//--------------------------------------------------------------------------------------------
// NoNextPlease_config class
//--------------------------------------------------------------------------------------------
NoNextPlease_config = function(doc) {
    this.doc = doc;
    
    this.nextthreshold = parseInt(NoNextPlease_config.readLocalStorage("nextthreshold", NoNextPlease_default_config.nextthreshold));
    this.maxrecursion = parseInt(NoNextPlease_config.readLocalStorage("maxrecursion", NoNextPlease_default_config.maxrecursion));
    this.contentthreshold = parseInt(NoNextPlease_config.readLocalStorage("contentthreshold", NoNextPlease_default_config.contentthreshold));
    this.buttonColor = NoNextPlease_config.readLocalStorage("buttonColor", NoNextPlease_default_config.buttonColor);
    this.cookieroot = NoNextPlease_config.readLocalStorage("cookieroot", NoNextPlease_default_config.cookieroot);
    this.autoload = NoNextPlease_config.readLocalStorage("autoload", NoNextPlease_default_config.autoload);
    this.disabled = NoNextPlease_config.readLocalStorage("disabled", NoNextPlease_default_config.disabled);
    this.hideme = NoNextPlease_config.readLocalStorage("hideme", NoNextPlease_default_config.hideme);
    
    this.load();
}

NoNextPlease_config.prototype.isDefault = function() {
    return  this.maxrecursion == NoNextPlease_default_config.maxrecursion &&
            this.nextthreshold == NoNextPlease_default_config.nextthreshold &&
            this.contentthreshold == NoNextPlease_default_config.contentthreshold &&
            this.buttonColor == NoNextPlease_default_config.buttonColor &&
            this.buttonTextColor == NoNextPlease_default_config.buttonTextColor &&
            this.cookieroot == NoNextPlease_default_config.cookieroot &&
            this.autoload == NoNextPlease_default_config.autoload &&
            this.disabled == NoNextPlease_default_config.disabled &&
            this.hideme == NoNextPlease_default_config.hideme;
}
NoNextPlease_config.prototype.getNextthreshold = function() {
    return this.nextthreshold;
}
NoNextPlease_config.prototype.setNextthreshold = function(v) {
    this.nextthreshold = v;
}
NoNextPlease_config.prototype.getMaxrecursion = function() {
    return this.maxrecursion;
}
NoNextPlease_config.prototype.setMaxrecursion = function(v) {
    this.maxrecursion = v;
}
NoNextPlease_config.prototype.getContentthreshold = function() {
    return this.contentthreshold;
}
NoNextPlease_config.prototype.setContentthreshold = function(v) {
    this.contentthreshold = v;
}
NoNextPlease_config.prototype.getButtonColor = function() {
    return this.buttonColor;
}
NoNextPlease_config.prototype.setButtonColor = function(v) {
    this.buttonColor = v;
}
NoNextPlease_config.prototype.getButtonTextColor = function() {
    return this.buttonTextColor;
}
NoNextPlease_config.prototype.setButtonTextColor = function(v) {
    this.buttonTextColor = v;
}
NoNextPlease_config.prototype.getCookieRoot = function() {
    return this.cookieroot;
}
NoNextPlease_config.prototype.setCookieRoot = function(v) {
    this.cookieroot = v;
}
NoNextPlease_config.prototype.getAutoload = function() {
    return this.autoload;
}
NoNextPlease_config.prototype.setAutoload = function(v) {
    this.autoload = v;
}
NoNextPlease_config.prototype.getDisabled = function() {
    return this.disabled;
}
NoNextPlease_config.prototype.setDisabled = function(v) {
    this.disabled = v;
}
NoNextPlease_config.prototype.getHideme = function() {
    return this.hideme;
}
NoNextPlease_config.prototype.setHideme = function(v) {
    this.hideme = v;
}
NoNextPlease_config.prototype.readCookie = function(k) {
    var regex = new RegExp("(?:^|.*;\\s*)" + escape("NoNextPlease_config." + k).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*");
    var v = null;
    if(regex.test(this.doc.cookie)) {
        v = unescape(this.doc.cookie.replace(regex, "$1"));
    }
    return v;
}
NoNextPlease_config.readLocalStorage = function(k, d) {
    var v = null;
    if(localStorage["NoNextPlease"]) {
        try{
            var cookie = JSON.parse(localStorage["NoNextPlease"]);
        } catch(err) {
            var cookie = {};
        }
        
        if(!cookie || typeof cookie[k] === 'undefined') {
            v = null;
        } else {
            v = cookie[k];
        }
    }
    if((typeof v == "undefined" || v == null)
         && typeof d !== "undefined") {
        v = d;
    }
    return v;
}
NoNextPlease_config.prototype.writeCookie = function(kvs) {
    for(var k in kvs) {
        this.doc.cookie = "NoNextPlease_config." + k + "=" + escape(kvs[k]) + ";max-age=31536000";
    }
}
NoNextPlease_config.writeLocalStorage = function(kvs) {
    if(!localStorage["NoNextPlease"]) {
        localStorage["NoNextPlease"] = JSON.stringify({});
    }
    try{
        var cookie = JSON.parse(localStorage["NoNextPlease"]);
    } catch(err) {
        var cookie = {};
    }
    if(!cookie) {
        cookie = {};
    }
    for(var k in kvs) {
        cookie[k] = kvs[k];
    }
    localStorage["NoNextPlease"] = JSON.stringify(cookie);
}
NoNextPlease_config.deleteRootCookie = function() {
    window.document.cookie = "NoNextPlease_config.maxrecursion=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.contentthreshold=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.buttonColor=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.buttonTextColor=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.cookieroot=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.autoload=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.disabled=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
    window.document.cookie = "NoNextPlease_config.hideme=0;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/"
}
NoNextPlease_config.prototype.deletePageSettings = function() {
    this.doc.cookie = "NoNextPlease_config.maxrecursion=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.contentthreshold=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.buttonColor=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.buttonTextColor=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.cookieroot=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.autoload=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.disabled=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
    this.doc.cookie = "NoNextPlease_config.hideme=0;expires=Thu, 01-Jan-1970 00:00:01 GMT"
}
NoNextPlease_config.deleteLocalStorage = function() {
    delete localStorage["NoNextPlease"];
}
NoNextPlease_config.prototype.save = function() {
    var kvs = [];
    kvs["maxrecursion"] = this.maxrecursion;
    kvs["contentthreshold"] = this.contentthreshold;
    kvs["buttonColor"] = this.buttonColor;
    kvs["buttonTextColor"] = this.buttonTextColor;
    kvs["cookieroot"] = this.cookieroot;
    kvs["autoload"] = this.autoload;
    kvs["disabled"] = this.disabled;
    kvs["hideme"] = this.hideme;
    if(this.cookieroot) {
        // user want to set whole site, but we are not in site root,
        // try to save to localStorage
        NoNextPlease_config.writeLocalStorage(kvs);
    } else {
        this.writeCookie(kvs);
    }
}
NoNextPlease_config.prototype.load = function() {
    // try cookie first, fallback to localStorage
    
    try {
        this.maxrecursion = parseInt(this.readCookie("maxrecursion"));
        if(isNaN(this.maxrecursion)) {
            this.maxrecursion = parseInt(NoNextPlease_config.readLocalStorage("maxrecursion"));
            if(isNaN(this.maxrecursion)) {
                this.maxrecursion = NoNextPlease_default_config.maxrecursion;
            }
        }
    } catch(err) {
        GM_log(err);
        this.contentthreshold = NoNextPlease_default_config.contentthreshold;
    }
    try {
        this.contentthreshold = parseInt(this.readCookie("contentthreshold"));
        if(isNaN(this.contentthreshold)) {
            this.contentthreshold = parseInt(NoNextPlease_config.readLocalStorage("contentthreshold"));
            if(isNaN(this.contentthreshold)) {
                this.contentthreshold = NoNextPlease_default_config.contentthreshold;
            }
        }
    } catch(err) {
        GM_log(err);
        this.contentthreshold = NoNextPlease_default_config.contentthreshold;
    }
    try {
        this.buttonColor = this.readCookie("buttonColor");
            if(!this.buttonColor) {
            this.buttonColor = NoNextPlease_config.readLocalStorage("buttonColor");
            if(!this.buttonColor) {
                this.buttonColor = NoNextPlease_default_config.buttonColor;
            }
        }
    } catch(err) {
        GM_log(err);
        this.buttonColor = NoNextPlease_default_config.buttonColor;
    }
    try {
        this.buttonTextColor = this.readCookie("buttonTextColor");
        if(!this.buttonTextColor) {
            this.buttonTextColor = NoNextPlease_config.readLocalStorage("buttonTextColor");
            if(!this.buttonTextColor) {
                this.buttonTextColor = NoNextPlease_default_config.buttonTextColor;
            }
        }
    } catch(err) {
        GM_log(err);
        this.buttonTextColor = NoNextPlease_default_config.buttonTextColor;
    }
    try {
        this.cookieroot = this.readCookie("cookieRoot");
        if(this.cookieroot == null) {
            this.cookieroot = NoNextPlease_config.readLocalStorage("cookieroot");
            if(this.cookieroot == null) {
                this.cookieroot = NoNextPlease_default_config.cookieroot;
            }
        }
    } catch(err) {
        GM_log(err);
        this.cookieroot = NoNextPlease_default_config.cookieroot;
    }
    try {
        this.autoload = this.readCookie("autoload");
        if(this.autoload == null) {
            this.autoload = NoNextPlease_config.readLocalStorage("autoload");
            if(this.autoload == null) {
                this.autoload = NoNextPlease_default_config.autoload;
            }
        }
    } catch(err) {
        GM_log(err);
        this.autoload = NoNextPlease_default_config.autoload;
    }
    try {
        this.disabled = this.readCookie("disabled");
        if(this.disabled == null) {
            this.disabled = NoNextPlease_config.readLocalStorage("disabled");
            if(this.disabled == null) {
                this.disabled = NoNextPlease_default_config.disabled;
            }
        }
    } catch(err) {
        GM_log(err);
        this.disabled = NoNextPlease_default_config.disabled;
    }
    try {
        this.hideme = this.readCookie("hideme");
        if(this.hideme == null) {
            this.hideme = NoNextPlease_config.readLocalStorage("hideme");
            if(this.hideme == null) {
                this.hideme = NoNextPlease_default_config.hideme;
            }
        }
    } catch(err) {
        GM_log(err);
        this.hideme = NoNextPlease_default_config.hideme;
    }
}

var npp = new NoNextPlease(document);