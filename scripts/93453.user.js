// ==UserScript==
// @name Gr1d Mods
// @description Mods the web interface of gr1d.org to more user-friendly.
// @include http://gr1d.org/*
// @run-at document-start
// ==/UserScript==

// Methods

// Adds the given script text to the body of the given doc;
// if doc is undefined, uses the current document.
function addScriptToBody(text, doc) {
    if (doc == undefined)
        doc = document;
    var script = doc.createElement('script');
    script.type = "text/javascript";
    script.text = text;
    doc.body.appendChild(script);
}

// Adds the given script text to the head of the given doc;
// if doc is undefined, uses the current document.
function addScriptToHead(text, doc) {
    if (doc == undefined)
        doc = document;
    var script = doc.createElement('script');
    script.type = "text/javascript";
    script.text = text;
    doc.getElementById('head').appendChild(script);
}

// Creates and returns a button with the given value (display text) and onclick method
function createButton(value, onclick) {
    var button = document.createElement('input');
    button.type = 'button';
    button.setAttribute("onclick", onclick);
    button.value = value;

    return button;
}

// Launches all available agents
function modLaunchAll() {
    launchAllPopup = window.open("", "", "", true);
    launchAllPopup.focus();
    while (launchAllPopup.document != null && launchAllPopup.document.childNodes.length > 0)
        launchAllPopup.document.removeChild(launchAllPopup.document.firstChild);
    while (launchAllPopup.document != null && launchAllPopup.document.getElementById('head') != null && launchAllPopup.document.getElementById('head').childNodes.length > 0)
        launchAllPopup.document.getElementById('head').removeChild(launchAllPopup.document.getElementById('head').firstChild);
    var launchSelect = launchAllPopup.document.createElement('iframe');
    for (var i = 0; i < modLaunchableAgents.length; i++)
        modLaunchableAgents[i] = modLaunchableAgents[i].action;

    launchSelect.id = 'launchSelect';
    launchSelect.style.width = '100%';
    launchSelect.style.height = '90%';
    launchSelect.src = modLaunchableAgents[0];
    launchAllPopup.document.write("<html><head id='head'><script type='text/javascript'>var modAgentsToLaunch=new Array('" + modLaunchableAgents.join("','") + "');\nvar loadCount = 0; </script>");
    launchAllPopup.document.write("<script type='text/javascript'>function loadedFrame() { loadCount++; if (loadCount > 0 && loadCount == modAgentsToLaunch.length) window.location = 'http://gr1d.org/home'; } </script></head><body></body>");
    launchAllPopup.document.body.appendChild(launchSelect);
    addScriptToHead(createButton.toString(), launchAllPopup.document);
    addScriptToBody("document.body.appendChild(createButton('Launch All', 'modLaunchAllFromPopup()'));", launchAllPopup.document);
    addScriptToHead(modLaunchAllFromPopup.toString(), launchAllPopup.document);
}

// Once the launch popup window is created and the 'Launch' button is clicked,
// this function runs to actually do the launching and redirect back to the home page once complete.
function modLaunchAllFromPopup() {
    // Create a div to hide iframes
    var iframeDiv = document.createElement('div');
    iframeDiv.style.display = 'none';
    document.body.appendChild(iframeDiv);
    for (var i = 0; i < modAgentsToLaunch.length; i++) {
        var iframe = document.createElement('iframe');
        iframeDiv.appendChild(iframe);
        var form = iframe.contentWindow.document.importNode(document.getElementById('launchSelect').contentWindow.document.forms[0], true);
        form.action = modAgentsToLaunch[i];
        iframe.setAttribute("onload", 'loadedFrame();');
        iframe.contentWindow.document.body.appendChild(form);
        form.submit();
    }

}

// Launches the selected agents
function modLaunchSelected() {
    var agents = new Array();
    for (var i = 0; i < modLaunchableAgents.length; i++) {
        var form = modLaunchableAgents[i];
        if (form.parentNode.parentNode.firstChild.nextSibling.firstChild.checked) 
            agents[agents.length] = form;
    }
    if (agents.length > 0) {
        modLaunchableAgents = agents;
        modLaunchAll();
    }
}

// The main function. All of the stuff that gets embedded in the document starts from here
function modMain() {
    // Expand all agent lists
    $('.uxAccordionHead').click();
    var recallHREFCrap = 'http://gr1d.org/Agent/Recall/';
    var lastAgent;
    
    for (var i = 0; i < document.forms.length; i++) {
        var form = document.forms[i];
        // Get the list of recallable agents
        if (form.action.indexOf('Recall') != -1) {
            modRecallableAgents[modRecallableAgents.length] = form;
        }
        // Get the list of launchable agents
        if (form.action.indexOf('Launch') != -1) {
            modLaunchableAgents[modLaunchableAgents.length] = form;
        }
        // If the form action does not contain 'Feedback' (the 'Post feedback..' button) or 'Deploy' (the 'Overwrite' button)
        // Add a checkbox next to the entry
        if (form.action.indexOf('Feedback') == -1 && form.action.indexOf('Deploy') == -1) {
            var currentAgent = form.action.substring(form.action.lastIndexOf('/') + 1);
            // Keep track of the last agent so that we can never add 2 checkboxes to the same agent (in case of multiple forms for the same agent).
            if (lastAgent == undefined || currentAgent != lastAgent) {
                var cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.id = currentAgent;
                lastAgent = currentAgent;
                form.parentNode.parentNode.firstChild.nextSibling.insertBefore(cb, form.parentNode.parentNode.firstChild.nextSibling.firstChild);
            }
        }
    }

    // Add the buttons
    var fieldsets = document.getElementsByTagName('fieldset');
    var modCommandsDiv = document.createElement('div');
    if (modRecallableAgents.length > 0) {
        modCommandsDiv.appendChild(createButton("Recall All", "modRecallAll()"));
        modCommandsDiv.appendChild(createButton("Recall Selected", "modRecallSelected()"));
    }
    if (modLaunchableAgents.length > 0) {
        modCommandsDiv.appendChild(createButton("Launch Selected", "modLaunchSelected()"));
        modCommandsDiv.appendChild(createButton("Launch All", "modLaunchAll()"));
    }

    fieldsets[fieldsets.length - 1].appendChild(modCommandsDiv);
}

// Recalls all of available agents
function modRecallAll() {
    var iframe = document.getElementById('modNoReloadOps');
    var iframeDiv = document.createElement('div');
    iframeDiv.style.display = 'none';
    document.body.appendChild(iframeDiv);
    
    for (var i = 0; i < modRecallableAgents.length; i++) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute("onload", 'loadedFrame();');
        iframeDiv.appendChild(iframe);
        iframe.src = modRecallableAgents[i].action;
    }
}

// Recalls the selected agents
function modRecallSelected() {
    var agents = new Array();
    for (var i = 0; i < modRecallableAgents.length; i++) {
        var form = modRecallableAgents[i];
        if (form.parentNode.parentNode.firstChild.nextSibling.firstChild.checked)
            agents[agents.length] = form;
    }
    if (agents.length > 0) {
        modRecallableAgents = agents;
        modRecallAll();
    }
}

// Upgrades all agents to the given assembly
function modUpgradeAll(assemblyID) {
    var form = document.createElement('form');
    form.action = 'http://gr1d.org/utility/confirmsingle?TargetAction=Upgrade&TargetController=PlayerAssembly&id=' + assemblyID;
    var input = document.createElement('input');
    input.id = 'confirmation_0_';
    input.name = 'confirmation[0]';
    input.type = 'checkbox';
    input.value = true;
    input.checked = 'true';
    form.appendChild(input);
    form.method = 'post';
    document.getElementById('contentcontent').appendChild(form);
    form.submit();
}

// Locks the theme to whichever one you specify (see <html><head><link rel="stylesheet" id="kulerCSS" ...> to find the theme name).
document.getElementById("kulerCSS").href = "/Kuler/Theme/210?Name=Dolores&c1=%23E8E595&c2=%23D0A825&c3=%2340627C&c4=%2326393D&c5=%23FFFAE4";


var href = window.location.href;
// This is the stuff we do on the home page
if (href == 'http://gr1d.org/home') {
    addScriptToHead(addScriptToHead.toString());
    addScriptToBody(addScriptToBody.toString());

    addScriptToHead("var modRecallableAgents = new Array();\nvar modLaunchableAgents = new Array();\nvar launchAllPopup;\nvar loadCount = 0;");
    // Embed all the functions we're going to need
    addScriptToHead(modRecallAll.toString());
    addScriptToHead(modRecallSelected.toString());
    addScriptToHead(modLaunchAllFromPopup.toString());
    addScriptToHead(modLaunchAll.toString());
    addScriptToHead(modLaunchSelected.toString());
    addScriptToHead("function loadedFrame() { loadCount++; if (loadCount > 0 && loadCount == modRecallableAgents.length) window.location.reload(); }");
    addScriptToHead(createButton.toString());
    addScriptToHead(modMain.toString());
    // Call the main function to kick things off
    addScriptToBody("modMain();");
}
// This is the stuff we do on the 'Overwrite -> Select Class' page
else if (href.indexOf('http://gr1d.org/Agent/SelectClass') != -1) { 
    var assemblyID = href.substring(href.indexOf('assemblyID=') + 'assemblyID='.length);
    addScriptToHead(modUpgradeAll.toString());
    var floatRight = document.createElement('div');
    floatRight.style.float = 'right';
    floatRight.appendChild(createButton('Upgrade All', 'modUpgradeAll(\'' + assemblyID + '\');'));
    document.getElementById('contentcontent').appendChild(floatRight);
}