// XmlHttpRequest Debugging
// version 1.2
// 2005-05-11 (last updated 2005-02-20)
// Copyright (c) 2005, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This is a re-write of my XmlHttpRequestTracing script to allow for more
//  powerful interception, replaying and maybe even "edit and continue" debugging
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "XmlHttpRequestDebugging", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// 
// More info at http://blog.monstuff.com/archives/000252.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            XmlHttpRequestDebugging
// @namespace       http://blog.monstuff.com
// @description     Allows you to debug XmlHttpRequest calls with an in-browser UI
//
// @include         http://pick.some.domains/*
// ==/UserScript==

// update (2005/07/20):
// Greasemonkey 0.3.5 has no GM_* function. This script doesn't actually need any of
//  these for the core functionality. Changed the script to handle that case nicely.

// update (2005/09/09):
// Drag and Drop doesn't work in Firefox 1.5 (DeerPark). Put in a workaround until 
//  I fix the "Drag" library (it uses on* events instead of AddEventListener)

// update (2005/10/21):
// Fix problem with onreadystatechange (didnt't get properly called back)

// update (2006/01/12):
// Fixed to run in Firefox 1.5 with Greasemonkey 0.6.4. Older versions are not supported anymore.

// update (2006/02/20):
// Implementing a couple of pass-thru methods that were missing.

// fix Gmail issue
// todo: make console resizable
// todo: make the console float when scrolling vertically
// todo: Bring back within the screen borders if needed
// todo: work around DOM leak
// question: is there different ways to call XHR that needs to be intercepted too?
// todo: let users edit response before replaying callback
// todo: let users intercept and modify requests and responses as they go (breakpoint)
// todo: format the javascript source code for the callback
// todo: use literal string for the libraries?

unsafeWindow.GM_setValue = GM_setValue;
unsafeWindow.GM_getValue = GM_getValue;
unsafeWindow.GM_registerMenuCommand = GM_registerMenuCommand;

function injectMe() {
/*============================================================================*/
// XMLHttpRequest instrumentation/wrapping
var startTracing = function (onnew) {
    var OldXHR = window.XMLHttpRequest;
    
    // create a wrapper object that has the same interfaces as a regular XMLHttpRequest object
    // see http://www.xulplanet.com/references/objref/XMLHttpRequest.html for reference on XHR object
    var NewXHR = function() {
        var self = this;
        var actualXHR = new OldXHR();
        
        // private callbacks (for UI):
        // onopen, onsend, onsetrequestheader, onupdate, ...
        this.requestHeaders = "";
        this.requestBody = "";
        
        // emulate methods from regular XMLHttpRequest object
        this.open = function(a, b, c, d, e) { 
                self.openMethod = a.toUpperCase();
                self.openURL = b;
                if (self.onopen != null && typeof(self.onopen) == "function") { self.onopen(a,b,c,d,e); } 
                return actualXHR.open(a,b,c,d,e); 
            }
        this.send = function(a) {
                if (self.onsend != null && typeof(this.onsend) == "function") { self.onsend(a); } 
                self.requestBody += a;
                return actualXHR.send(a); 
            }
        this.setRequestHeader = function(a, b) {
                if (self.onsetrequestheader != null && typeof(self.onsetrequestheader) == "function") { self.onsetrequestheader(a, b); } 
                self.requestHeaders += a + ":" + b + "\r\n";
                return actualXHR.setRequestHeader(a, b); 
            }
        this.getRequestHeader = function() {
            return actualXHR.getRequestHeader(); 
        }
        this.getResponseHeader = function(a) { return actualXHR.getResponseHeader(a); }
        this.getAllResponseHeaders = function() { return actualXHR.getAllResponseHeaders(); }
        this.abort = function() { return actualXHR.abort(); }
        this.addEventListener = function(a, b, c) { return actualXHR.addEventListener(a, b, c); }
        this.dispatchEvent = function(e) { return actualXHR.dispatchEvent(e); }
        this.openRequest = function(a, b, c, d, e) { return actualXHR.openRequest(a, b, c, d, e); }
        this.overrideMimeType = function(e) { return actualXHR.overrideMimeType(e); }
        this.removeEventListener = function(a, b, c) { return actualXHR.removeEventListener(a, b, c); }
        
        // copy the values from actualXHR back onto self
        function copyState() {
            // copy properties back from the actual XHR to the wrapper
            try {
                self.readyState = actualXHR.readyState;
            } catch (e) {}
            try {
                self.status = actualXHR.status;
            } catch (e) {}
            try {
                self.responseText = actualXHR.responseText;
            } catch (e) {}
            try {
                self.statusText = actualXHR.statusText;
            } catch (e) {}
            try {
                self.responseXML = actualXHR.responseXML;
            } catch (e) {}
        }
        
        // emulate callbacks from regular XMLHttpRequest object
        actualXHR.onreadystatechange = function() {
            copyState();
            
            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}

            // onreadystatechange callback            
            if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { return self.onreadystatechange(); } 
        }
        actualXHR.onerror = function(e) {
            copyState();

            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}

            if (self.onerror != null && typeof(self.onerror) == "function") { 
                return self.onerror(e); 
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        }
        actualXHR.onload = function(e) {
            copyState();

            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}

            if (self.onload != null && typeof(self.onload) == "function") { 
                return self.onload(e); 
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        }
        actualXHR.onprogress = function(e) {
            copyState();

            try {
                if (self.onupdate != null && typeof(self.onupdate) == "function") { self.onupdate(); } 
            } catch (e) {}

            if (self.onprogress != null && typeof(self.onprogress) == "function") { 
                return self.onprogress(e);
            } else if (self.onreadystatechange != null && typeof(self.onreadystatechange) == "function") { 
                return self.onreadystatechange(); 
            }
        }
        
        if (onnew && typeof(onnew) == "function") { onnew(this); }
    }
    
    window.XMLHttpRequest = NewXHR;
}

/*============================================================================*/
// make a styled link element with an "onclick" callback
var makeActiveLink = function(text, callback, unactive) {
    var link = document.createElement("a");
    link.href = "#";
    link.className = unactive ? "XHRDebug_Unactive" : "XHRDebug_Active";
    link.innerHTML = text;
    
    var wrappedCallback = function(e) { callback(e); return false; }
    link.addEventListener("click", wrappedCallback, true);
    
    // returns whether the link is "active" after the toggle
    link.toggle = function() {
        if (link.className == "XHRDebug_Unactive") 
        {
            link.className = "XHRDebug_Active";
            return true;
        } 
        else
        {
            link.className = "XHRDebug_Unactive";
            return false;
        }
    }
    
    link.activate = function(active) {
        link.className = active ? "XHRDebug_Active" : "XHRDebug_Unactive";
    }
    
    link.isActive = function() {
        return (link.className == "XHRDebug_Active");
    }
    
    return link;
}

/*============================================================================*/
// add a node into a list, wrapped in a "li" element
var addListItem = function(ul, contentNode) {
    var li = document.createElement("li");
    li.appendChild(contentNode);
    ul.appendChild(li);
}

/*============================================================================*/
// console object
var Console = function() {
    var self = this;
    var capture = true;
    var autoscroll = GM_getValue("ConsoleAutoScrolling", true);
    var showHelp = false;
    
    var uiDiv = document.createElement("div");
    uiDiv.className = "XHRDebug_Console";
    window.document.documentElement.appendChild(uiDiv);
    var uiTitle = document.createElement("div");
    uiTitle.className = "XHRDebug_ConsoleTitle";
    uiDiv.appendChild(uiTitle);
        
    var uiDragHandle = document.createElement("div");
    uiDragHandle.className = "XHRDebug_ConsoleHandle";
    uiDragHandle.innerHTML = "XmlHttpRequest debugging";
    uiTitle.appendChild(uiDragHandle);

    var uiOptions = document.createElement("div");
    uiOptions.className = "XHRDebug_ConsoleOptions";
    uiTitle.appendChild(uiOptions);
    
    var captureActionClick = function() {
        capture = captureActionLink.toggle();
        GM_setValue("ConsoleCapturing", capture);
    }
    
    var autoscrollActionClick = function(e) {
        autoscroll = autoscrollActionLink.toggle();
        GM_setValue("ConsoleAutoScrolling", autoscroll);
    }
    
    var clearActionClick = function(e) {
        Fat.fade_element(uiContent, 30, 500, "#FF0000");
        while (uiTracing.hasChildNodes()) {
            uiTracing.removeChild(uiTracing.firstChild);
        }
    }
    
    var hideActionClick = function() {
        uiDiv.style.display = "none";
        GM_setValue("ConsoleHidden", true);
    }
    
    this.showConsoleClick = function() {
        uiDiv.style.display = "";
        GM_setValue("ConsoleHidden", false);
    }
    
    var exportActionClick = function(e) {
        alert("not implemented");
    }
    
    var helpActionClick = function() {
        var showHelp = helpActionLink.toggle();
        uiHelp.style.display = showHelp ? "" : "none";
        
        if (showHelp) {
            uiContent.style.display = "none";        
        } else {
            if (!GM_getValue("ConsoleMinimized", false)) {
                uiContent.style.display = "";
            }
        }
    }
    
    var minimizeActionClick = function() {
        var minimize = consoleMinimizeOption.toggle();
        uiContent.style.display = (minimize ? "none" : "");
        GM_setValue("ConsoleMinimized", minimize);
        
        if (helpActionLink.isActive()) {
           helpActionClick(); 
        }
    }
    
    var ulNode = document.createElement("ul");
    var captureActionLink = makeActiveLink("capture", captureActionClick);
    addListItem(ulNode, captureActionLink);
    var autoscrollActionLink = makeActiveLink("auto-scroll", autoscrollActionClick);
    addListItem(ulNode, autoscrollActionLink);
    addListItem(ulNode, makeActiveLink("clear", clearActionClick, true));
    var helpActionLink = makeActiveLink("help", helpActionClick);
    addListItem(ulNode, helpActionLink);
    var consoleMinimizeOption = makeActiveLink("minimize", minimizeActionClick, true);
    addListItem(ulNode, consoleMinimizeOption);
    //addListItem(ulNode, makeActiveLink("hide", hideActionClick, true));
    
    uiOptions.appendChild(ulNode);

    var uiContent = document.createElement("div");
    uiContent.className = "XHRDebug_ConsoleBody";
    uiDiv.appendChild(uiContent);

    var uiHelp = document.createElement("div");
    uiHelp.className = "XHRDebug_ConsoleBody";
    uiHelp.innerHTML = helpText;
    uiDiv.appendChild(uiHelp);

    var uiTracing = document.createElement("div");
    uiContent.appendChild(uiTracing);

    var uiReplay = document.createElement("div");
    uiContent.appendChild(uiReplay);

    this.traceNode = function(node) {
        uiTracing.appendChild(node);
        Fat.fade_element(node, 30, 2000);
        if (autoscroll) {
            node.scrollIntoView(false);
        }
    }
    
    this.traceXHR = function(xhr) {
        if (!capture) return;
        
        var xhrNode = makeXHRNode(xhr, self);
        xhr.onopen = xhrNode.update;
        xhr.onsend = xhrNode.update;
        xhr.onupdate = xhrNode.update;
        self.traceNode(xhrNode);
    }
    
    this.showReplay = function(displayed) { 
        uiReplay.style.display = displayed ? "" : "none"; 
        uiTracing.style.display = displayed ? "none" : "";
    }
    
    this.insertReplay = function(node) {
        uiReplay.appendChild(node);    
    }
    
    this.clearReplay = function() {
        while (uiReplay.hasChildNodes()) {
            uiReplay.removeChild(uiReplay.firstChild);
        }
    }
    
    this.savePosition = function() {
        GM_setValue("ConsolePosLeft", uiDiv.style.left);
        GM_setValue("ConsolePosTop", uiDiv.style.top);
    }
    
    this.restorePosition = function() {
        // ensure the console is displayed within the viewport
        uiDiv.style.left = GM_getValue("ConsolePosLeft", "10px");
        uiDiv.style.top = GM_getValue("ConsolePosTop", "10px");
    }
    
    if (!GM_getValue("ConsoleCapturing", true)) {
        captureActionClick();
    }
    if (!GM_getValue("ConsoleAutoScrolling", true)) {
        autoscrollActionClick();
    }
    helpActionClick();
    if (GM_getValue("ConsoleMinimized", false)) {
        minimizeActionClick();
    }
    if (GM_getValue("ConsoleHidden", false)) {
        hideActionClick();
    }
    
    this.restorePosition(uiDiv);
    this.showReplay(false);
    

    Drag.init(uiDragHandle, uiDiv);
    uiDiv.onDragEnd = self.savePosition;

}

/*============================================================================*/
var startXHRReplay = function(xhr, uiConsole, xhrNode) {
    // todo: add tooltips
    var methodField = document.createElement("input");
    methodField.type = "text";    
    methodField.maxLength = 5;
    methodField.size = 5;
    methodField.value = xhr.openMethod;
    uiConsole.insertReplay(methodField);
/*
    var userField = document.createElement("input");
    userField.type = "text";    
    userField.size = 10;
    userField.value = "";
    uiConsole.insertReplay(userField);
    
    var pwdField = document.createElement("input");
    pwdField.type = "text";    
    pwdField.size = 10;
    pwdField.value = "";
    uiConsole.insertReplay(pwdField);
*/    
    var urlField = document.createElement("input");
    urlField.type = "text";    
    urlField.size = 50;
    urlField.value = xhr.openURL;
    uiConsole.insertReplay(urlField);
    
    var headersField = document.createElement("textarea");
    headersField.cols = 37;
    headersField.rows = 5;
    headersField.value = xhr.requestHeaders;
    uiConsole.insertReplay(headersField);
  
    var bodyField = document.createElement("textarea");
    bodyField.cols = 37;
    bodyField.rows = 5;
    bodyField.value = xhr.requestBody;
    uiConsole.insertReplay(bodyField);

    var sendClick = function() {
        closeReplay();

        var replayXHR = new XMLHttpRequest();
        replayXHR.replayXHRNode = xhrNode;
        replayXHR.onreadystatechange = xhr.onreadystatechange;
        replayXHR.onload = xhr.onload;
        replayXHR.onerror = xhr.onerror;
        
        // todo: add username and password
        replayXHR.open(methodField.value, urlField.value, true);
        replayXHR.send(bodyField.value);
    }
    
    var sendLink = makeActiveLink("send", sendClick);
    uiConsole.insertReplay(sendLink);
    
    var closeReplay = function() {
        uiConsole.clearReplay();
        uiConsole.showReplay(false);
    }
    
    var cancelLink = makeActiveLink("cancel", closeReplay);
    uiConsole.insertReplay(cancelLink);
    
    uiConsole.showReplay(true);
}

/*============================================================================*/
// individual entry in the console for an XHR object
var makeXHRNode = function(xhr, uiConsole) {
    var xhrNode = document.createElement("div");
    xhrNode.className = "XHRDebug_XHRNode";
    
    var replayedFromDiv = document.createElement("div"); 
    xhrNode.appendChild(replayedFromDiv);
    
    var openDiv = document.createElement("div"); 
    openDiv.className = "XHRDebug_Request";
    xhrNode.appendChild(openDiv);

    var pickRequestOption = function(e) {
        if (requestReplayOption == e.target) {
            startXHRReplay(xhr, uiConsole, xhrNode);
            return;
        }
        
        requestMinimizeOption.activate(requestMinimizeOption == e.target);
        
        requestHeadersDiv.style.display = (requestHeadersOption == e.target) ? "" : "none";
        requestHeadersOption.activate(requestHeadersOption == e.target);
        
        requestBodyDiv.style.display = (requestBodyOption == e.target) ? "" : "none";
        requestBodyOption.activate(requestBodyOption == e.target);
    }
    
    var requestMinimizeOption = makeActiveLink("minimize", pickRequestOption);
    var requestHeadersOption = makeActiveLink("headers", pickRequestOption, true);
    var requestBodyOption = makeActiveLink("body", pickRequestOption, true);
    var requestReplayOption = makeActiveLink("[edit&amp;replay]", pickRequestOption, true);
    
    var requestOptions = document.createElement("ul");
    requestOptions.className = "XHRDebug_XHROptions";
    addListItem(requestOptions, requestMinimizeOption);
    addListItem(requestOptions, requestHeadersOption);
    addListItem(requestOptions, requestBodyOption);
    addListItem(requestOptions, requestBodyOption);
    addListItem(requestOptions, requestReplayOption);
    
    xhrNode.appendChild(requestOptions);

    var requestHeadersDiv = document.createElement("div"); 
    requestHeadersDiv.className = "XHRDebug_ResponseBlock";
    xhrNode.appendChild(requestHeadersDiv);

    var requestBodyDiv = document.createElement("div"); 
    requestBodyDiv.className = "XHRDebug_ResponseBlock";
    xhrNode.appendChild(requestBodyDiv);

    var statusDiv = document.createElement("div"); 
    statusDiv.className = "XHRDebug_Status";
    xhrNode.appendChild(statusDiv);
    
  
    var pickResponseOption = function(e) {
        if (callbackReplayOption == e.target) {
            if (xhr.onreadystatechange != null && typeof(xhr.onreadystatechange) == "function") { xhr.onreadystatechange(); } 
            uiConsole.traceNode(makeReplayCallbackNode(xhrNode));
            return;
        }

        responseMinimizeOption.activate(responseMinimizeOption == e.target);

        responseDiv.style.display = (responseOption == e.target) ? "" : "none";
        responseOption.activate(responseOption == e.target);
        
        responseHeadersDiv.style.display = (responseHeadersOption == e.target) ? "" : "none";
        responseHeadersOption.activate(responseHeadersOption == e.target);

        viewCallbackDiv.style.display = (viewOption == e.target) ? "" : "none";
        viewOption.activate(viewOption == e.target);
    }
    
    var responseMinimizeOption = makeActiveLink("minimize", pickResponseOption, true);
    var responseOption = makeActiveLink("response", pickResponseOption, true);
    var responseHeadersOption = makeActiveLink("headers", pickResponseOption, true);

    var viewOption = makeActiveLink("callback", pickResponseOption, true);
    var callbackReplayOption = makeActiveLink("[replay]", pickResponseOption, true);

    var responseOptions = document.createElement("ul");
    responseOptions.className = "XHRDebug_XHROptions";
    addListItem(responseOptions, responseMinimizeOption);
    addListItem(responseOptions, responseHeadersOption);    
    addListItem(responseOptions, responseOption);
    addListItem(responseOptions, viewOption);
    addListItem(responseOptions, callbackReplayOption);    

    xhrNode.appendChild(responseOptions);
    
    var responseDiv = document.createElement("div"); 
    responseDiv.className = "XHRDebug_ResponseBlock";
    xhrNode.appendChild(responseDiv);
   
    var responseHeadersDiv = document.createElement("div"); 
    responseHeadersDiv.className = "XHRDebug_ResponseBlock";
    xhrNode.appendChild(responseHeadersDiv);
     
    var viewCallbackDiv = document.createElement("div"); 
    viewCallbackDiv.className = "XHRDebug_ResponseBlock";
    xhrNode.appendChild(viewCallbackDiv);
    
    var printReadyState = function() {
        if (!xhr.readyState) {
            return "uninitialized";
        }
        
        switch(xhr.readyState) {
            case 0: 
                return "uninitialized";
            case 1:
                return "loading";
            case 2:
                return "loaded";
            case 3:
                return "interactive";
            case 4:
                return "completed";
        }
    }
    
    var formatResponse = function(c) {
	    c = c.replace(/\</g,"&lt;");
	    c = c.replace(/\>/g,"&gt;");
	    c = c.replace(/\"/g,"&quot;");
	    c = c.replace(/\'/g,"&#39;");
	    c = c.replace(/\\/g,"&#92;");
        c = c.replace(/\n/g,"<br />");

	    return c;
    }
    
    xhrNode.update = function() {
        var exportString = ""; 
        if (xhr.replayXHRNode) {
            var replayXHRNode = xhr.replayXHRNode;
            var showReplayedRequest = function() {    
                replayXHRNode.scrollIntoView(true);
                Fat.fade_element(replayXHRNode);                
            }
            var replaydFromLink = makeActiveLink("User replayed request", showReplayedRequest, true);
            replayedFromDiv.appendChild(replaydFromLink);
            xhr.replayXHRNode = null;
        }
        if (xhr.openMethod) {
            openDiv.innerHTML = xhr.openMethod;
            exportString += xhr.openMethod;
        }
        if (xhr.openURL) {
            openDiv.innerHTML += " " + xhr.openURL;
            exportString += " " + xhr.openURL;
        } 
        exportString += "\r\n";
        
        requestHeadersOption.style.display = xhr.requestHeaders ? "" : "none";
        requestHeadersDiv.innerHTML = xhr.requestHeaders ? formatResponse(xhr.requestHeaders) : "<em>&lt;no request headers&gt;</em>";
        exportString += xhr.requestHeaders ? xhr.requestHeaders : "";
        exportString += "\r\n";
        
        requestBodyOption.style.display = xhr.requestBody ? "" : "none";
        requestBodyDiv.innerHTML = xhr.requestBody ? formatResponse(xhr.requestBody) : "<em>&lt;no request body&gt;</em>";
        exportString += xhr.requestBody ? xhr.requestBody : "";
        exportString += "\r\n\r\n";
        

        statusDiv.innerHTML = "Status: " + printReadyState() + " ";
        
        if (xhr.status && xhr.statusText) {
            statusDiv.innerHTML += "(" + xhr.status + " " + xhr.statusText + ") ";
            exportString += xhr.status + " (" + xhr.statusText + ")\r\n\r\n";
        }
        var exportDiv = document.createElement("div");
        exportDiv.style.display = "inline";
        statusDiv.appendChild(exportDiv);
        
        if (xhr.readyState == 4) {
            var responseHeaders = xhr.getAllResponseHeaders();
            if (responseHeaders) {
                responseHeadersDiv.innerHTML = formatResponse(responseHeaders);
                exportString += responseHeaders;
            } else {
                responseHeadersDiv.innerHTML = "<em>&lt;no response headers&gt;</em>";
            }
        }
        exportString += "\r\n";
        
        if (xhr.responseText) {
            responseDiv.innerHTML = formatResponse(xhr.responseText);
            exportString += xhr.responseText;
        } else {
            responseDiv.innerHTML = "<em>&lt;no response&gt;</em>";
        }
        
        if (xhr.onreadystatechange && typeof(xhr.onreadystatechange) == "function") {
            viewCallbackDiv.innerHTML = formatResponse("" + xhr.onreadystatechange);
        } else {
            viewCallbackDiv.innerHTML = "<em>&lt;no callback&gt;</em>";
        }
        
        var exportLink = document.createElement("a");
        exportLink.target = "_blank";
        exportLink.className = "XHRDebug_Unactive";
        exportLink.appendChild(document.createTextNode("[export]"));
        exportLink.href = "data:text/plain;charset=utf-8," + encodeURI(exportString);
        exportDiv.appendChild(exportLink);
    }
    
    xhrNode.update();
    pickRequestOption( {target: requestMinimizeOption} );
    pickResponseOption( {target: responseMinimizeOption} );
    
    return xhrNode;
}

var makeReplayCallbackNode = function(xhrNode) {
    var replayNode = document.createElement("div");
    replayNode.className = "XHRDebug_XHRNode";
    
    var showReplayedCallback = function() {
        xhrNode.scrollIntoView(true);
        Fat.fade_element(xhrNode);
    }
    
    replayNode.appendChild(makeActiveLink("User replayed callback", showReplayedCallback, true));
    
    return replayNode;
}

/*============================================================================*/
var AddGlobalStyle = function(css) 
{
    style = document.createElement("style");
	style.type = "text/css";
    style.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(style);
}
var css = 
".XHRDebug_Console { font-size: 12px; position: absolute; width: 340px;  background-color: #FFF; -moz-border-radius: 7px; color: black; z-index: 999999999; }" +
".XHRDebug_Console h1 { font-size: 15px; }" +
".XHRDebug_Console h2 { font-size: 12px; text-decoration: underline; }" +
".XHRDebug_Console dt { font-weight: bold; }" +
".XHRDebug_Console a { font-size: 12px; color: black; }" +
".XHRDebug_ConsoleTitle { -moz-border-radius: 7px 7px 0px 0px; border: 2px; border-color: #000; border-style: solid; background-color: #c3d9ff; color: #003ce6; padding: 1px 0px 0px 2px; }" +
".XHRDebug_ConsoleHandle { font-weight: bold; -moz-border-radius: 7px 7px 0px 0px; background-color: }" +
".XHRDebug_ConsoleOptions { margin-bottom: 1px; }" +
".XHRDebug_ConsoleOptions ul, .XHRDebug_ConsoleOptions li { margin: 0; padding: 0; display: inline; }" +
".XHRDebug_Active { color: black; font-weight: bold; margin-right: 3px; text-decoration: none; cursor: hand; }" +
".XHRDebug_Unactive { color: black; margin-right: 3px; text-decoration: none; cursor: hand; }" +
".XHRDebug_ConsoleBody { background-color: #e8eef7; height: 400px; overflow: auto; padding: 5px; -moz-border-radius: 0px 0px 7px 7px; border: 2px; border-color: #000; border-style: none solid solid solid;}" +
".XHRDebug_XHRNode { background-color: white; border: 1px; border-color: #000; border-style: solid; margin: 0px 0px 4px 0px; padding: 2px; }" +
".XHRDebug_Request { overflow: hidden; }" +
".XHRDebug_Status { margin-bottom: 7px; }" +
".XHRDebug_XHROptions { margin-bottom: 1px; }" +
".XHRDebug_XHROptions, .XHRDebug_XHROptions li { margin: 0; padding: 0; display: inline; }" +
".XHRDebug_ResponseBlock { padding: 2px; border: 1px; border-color: #CCC; border-style: solid; overflow: hidden; }" +
"";

var helpText = 
"<h1>XMLHttpRequest debugging help</h1>" +
"<h2>Console options and actions</h2>" +
"<dl>" +
"<dt>capture</dt><dd>Turn capturing on/off.</dd>" +
"<dt>auto-scroll</dt><dd>Toggle auto-scrolling. When on, the capture window will automatically scroll down as new events are catpured.</dd>" +
"<dt>clear</dt><dd>Clear the capture history.</dd>" +
"<dt>help</dt><dd>Show/hide this page.</dd>" +
"<dt>minimize</dt><dd>Reduce the footprint of the XmlHttpRequest debugging window.</dd>" +
"<dt>hide</dt><dd>Completely hide the XmlHttpRequest debugging window. The window can be brought back with the 'Tools' -> 'User scripts commands' -> 'Show XmlHttpRequest console' menu item.</dd>" +
"</dl>" +
"<h2>History options and actions</h2>" +
"<dl>" +
"<dt>headers (in the request)</dt><dd>Shows the request headers, if any where set.</dd>" +
"<dt>body</dt><dd>Show the request body, if any was set.</dd>" +
"<dt>edit&amp;replay (the request)</dt><dd>Lets you create a new XMLHttpRequest request based on the selected one.</dd>" +
"<dt>export</dt><dd>Opens a new window with the text for the request and the response.</dd>" +
"<dt>headers (in the response)</dt><dd>Shows the response headers.</dd>" +
"<dt>response</dt><dd>Shows the response body.</dd>" +
"<dt>callback</dt><dd>Shows the source code for the XMLHttpRequest callback that was set.</dd>" +
"<dt>replay (the callback)</dt><dd>Calls the callback again.</dd>" +
"</dl>" +
"<h1>About</h1>" +
"<p>'XMLHttpRequest Debugging' user script. Version 1.2</p>" +
"<p>Written by <a href='&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#106;&#117;&#108;&#105;&#101;&#110;&#46;&#99;&#111;&#117;&#118;&#114;&#101;&#117;&#114;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;'>Julien Couvreur</a>.</p>" +
"<p>More info and other user scripts on <a href='http://blog.monstuff.com/archives/cat_greasemonkey.html'>my site</a>.</p><br />" +
"";


/*============================================================================*/    
/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/

var Drag = {
    obj : null,

    init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
    {
        o.onmousedown      = Drag.start;

        o.hmode            = bSwapHorzRef ? false : true ;
        o.vmode            = bSwapVertRef ? false : true ;

        o.root = oRoot && oRoot != null ? oRoot : o ;

        if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
        if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
        if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
        if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

        o.minX    = typeof minX != 'undefined' ? minX : null;
        o.minY    = typeof minY != 'undefined' ? minY : null;
        o.maxX    = typeof maxX != 'undefined' ? maxX : null;
        o.maxY    = typeof maxY != 'undefined' ? maxY : null;

        o.xMapper = fXMapper ? fXMapper : null;
        o.yMapper = fYMapper ? fYMapper : null;

        o.root.onDragStart    = new Function();
        o.root.onDragEnd    = new Function();
        o.root.onDrag        = new Function();
    },

    start : function(e)
    {
        var o = Drag.obj = this;
        e = Drag.fixE(e);
        var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
        o.root.onDragStart(x, y);

        o.lastMouseX    = e.clientX;
        o.lastMouseY    = e.clientY;

        if (o.hmode) {
            if (o.minX != null)    o.minMouseX    = e.clientX - x + o.minX;
            if (o.maxX != null)    o.maxMouseX    = o.minMouseX + o.maxX - o.minX;
        } else {
            if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
            if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
        }

        if (o.vmode) {
            if (o.minY != null)    o.minMouseY    = e.clientY - y + o.minY;
            if (o.maxY != null)    o.maxMouseY    = o.minMouseY + o.maxY - o.minY;
        } else {
            if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
            if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
        }

        document.onmousemove    = Drag.drag;
        document.onmouseup        = Drag.end;

        return false;
    },

    drag : function(e)
    {
        e = Drag.fixE(e);
        var o = Drag.obj;

        var ey    = e.clientY;
        var ex    = e.clientX;
        var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
        var nx, ny;

        if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
        if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
        if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
        if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

        nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
        ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

        if (o.xMapper)        nx = o.xMapper(y)
        else if (o.yMapper)    ny = o.yMapper(x)

        Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
        Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
        Drag.obj.lastMouseX    = ex;
        Drag.obj.lastMouseY    = ey;

        Drag.obj.root.onDrag(nx, ny);
        return false;
    },

    end : function()
    {
        document.onmousemove = null;
        document.onmouseup   = null;
        Drag.obj.root.onDragEnd(    parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]), 
                                    parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
        Drag.obj = null;
    },

    fixE : function(e)
    {
        if (typeof e == 'undefined') e = window.event;
        if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
        if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
        return e;
    }
};


/*============================================================================*/    
// @name            The Fade Anything Technique (revisited)
//                  Based on http://www.axentric.com/aside/fat/
// @version         1.0
// @author          Julien Couvreur
// @original author Adam Michela

var Fat = {
	make_hex : function (r,g,b) 
	{
		r = r.toString(16); if (r.length == 1) r = '0' + r;
		g = g.toString(16); if (g.length == 1) g = '0' + g;
		b = b.toString(16); if (b.length == 1) b = '0' + b;
		return "#" + r + g + b;
	},

	fade_element : function (element, fps, duration, from, to) 
	{
		if (!fps) fps = 30;
		if (!duration) duration = 2000;
		if (!from || from=="#") from = "#FFFF33";
		if (!to) to = this.get_bgcolor(element);
		
		var frames = Math.round(fps * (duration / 1000));
		var interval = duration / frames;
		var delay = interval;
		var frame = 0;
		
		if (from.length < 7) from += from.substr(1,3);
		if (to.length < 7) to += to.substr(1,3);
		
		var rf = parseInt(from.substr(1,2),16);
		var gf = parseInt(from.substr(3,2),16);
		var bf = parseInt(from.substr(5,2),16);
		var rt = parseInt(to.substr(1,2),16);
		var gt = parseInt(to.substr(3,2),16);
		var bt = parseInt(to.substr(5,2),16);
			
		var r,g,b,h;
		while (frame < frames)
		{
			r = Math.floor(rf * ((frames-frame)/frames) + rt * (frame/frames));
			g = Math.floor(gf * ((frames-frame)/frames) + gt * (frame/frames));
			b = Math.floor(bf * ((frames-frame)/frames) + bt * (frame/frames));
			h = this.make_hex(r,g,b);
		
		    
			setTimeout(this.makeTimer(element, h), delay);

			frame++;
			delay = interval * frame; 
		}
		setTimeout(this.makeTimer(element, to), delay);
	},
	
	makeTimer : function(element, color) {
	    return function() { Fat.set_bgcolor(element, color); }
	},
	
	set_bgcolor : function (element, c)
	{
		element.style.backgroundColor = c;
	},
	
	get_bgcolor : function (element)
	{
		while(element)
		{
			var c;
			if (window.getComputedStyle) c = window.getComputedStyle(element,null).getPropertyValue("background-color");
			if (element.currentStyle) { c = element.currentStyle.backgroundColor; }
			if ((c != "" && c != "transparent") || element.tagName == "BODY") { break; }
			element = element.parentNode;
		}
		if (c == undefined || c == "" || c == "transparent") c = "#FFFFFF";
		var rgb = c.match(/rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/);
		if (rgb) c = this.make_hex(parseInt(rgb[1]),parseInt(rgb[2]),parseInt(rgb[3]));
		return c;
	}
}

AddGlobalStyle(css);

var console = new Console();
startTracing(console.traceXHR);
GM_registerMenuCommand("Show XmlHttpRequest console", console.showConsoleClick);
}


/*============================================================================*/  
var onload = function() {
    unsafeWindow.eval(injectMe.toString());
    unsafeWindow.eval("injectMe();");
    
}
window.addEventListener("load", onload, false);
