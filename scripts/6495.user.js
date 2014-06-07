// ==UserScript==
// @name            AKAD VH Hide modules - djuxen
// @description     Add button to VH to hide finished modules.
// @include         http://www.akadvh.de/cgi/WebObjects.dll/AKADFrontend.woa/wo/*
// @include         https://www.akadvh.de/cgi/WebObjects.dll/AKADFrontend.woa/wo/*
// @version			0.4
// ==/UserScript==

var constIterator, showAllModulesText, hideFinishedModulesText, configureModulesText;

var debug = false;
var initialized = false;
var hideFinishedModules = false;
var showCheckboxes = false;
var finishedModules = [];
var moduleLinks = [];
var checkBoxes = [];

window.addEventListener("load", function() {
    initialize();
    main();
}, false);

function initialize() {
    if (getNode("//td[contains(text(), 'Zur Zeit sind Sie in')]").singleNodeValue) {
        constIterator = "ttern";
        showAllModulesText = "Abgeschlossene Module einblenden";
        hideFinishedModulesText = "Abgeschlossene Module ausblenden";
        configureModulesText = "Module konfigurieren";
        initialized = true;
    } else if (getNode("//td[contains(text(), 'at present, you are')]").singleNodeValue) {
        constIterator = "browse";
        showAllModulesText = "Show finished modules";
        hideFinishedModulesText = "Hide finished modules";
        configureModulesText = "Configure modules";
        initialized = true;
    }
}

function main() {

    if (initialized) {
        try {
            var topTd = getNode("//b[contains(text(), '" + constIterator + "')]");

            createCheckboxes();
            toggleFinishedModules();

            var mainTable = document.createElement("table");
            mainTable.setAttribute("border", "0");
            mainTable.setAttribute("cellspacing", "2");
            mainTable.setAttribute("cellpadding", "2");

            var mainRow = document.createElement("tr");
            var cell1 = document.createElement("td");
            var cell2 = document.createElement("td");
            cell2.setAttribute("id", "switchcell");
            cell2.innerHTML = showAllModulesText;

            var switchFinished = document.createElement("input");
            switchFinished.setAttribute('id', 'switchbutton');
            switchFinished.setAttribute('type', 'image');
            switchFinished.setAttribute('src', '/WebObjects/Frameworks/AKAD5Shared.framework/WebServerResources/img/button_linkaustabelle.gif');
            switchFinished.addEventListener('click', toggleFinishedModules, true);
            cell1.appendChild(switchFinished);

            mainRow.appendChild(cell1);
            mainRow.appendChild(cell2);
            mainTable.appendChild(mainRow);

            mainRow = document.createElement("tr");
            cell1 = document.createElement("td");
            cell2 = document.createElement("td");
            cell2.innerHTML = configureModulesText;

            var switchConfigure = document.createElement("input");
            switchConfigure.setAttribute('id', 'configurebutton');
            switchConfigure.setAttribute('type', 'image');
            switchConfigure.setAttribute('src', '/WebObjects/Frameworks/AKAD5Shared.framework/WebServerResources/img/button_linkaustabelle.gif');
            switchConfigure.addEventListener('click', toggleCheckboxes, true);
            cell1.appendChild(switchConfigure);

            mainRow.appendChild(cell1);
            mainRow.appendChild(cell2);
            mainTable.appendChild(mainRow);

            topTd = topTd.singleNodeValue.parentNode.parentNode.parentNode;
            topTd.insertBefore(document.createElement("br"), topTd.firstChild);
            topTd.insertBefore(mainTable, topTd.firstChild);
        }
        catch(e) {
            if (debug) alert(e.message);
        }
    }
}

/**
 * Create checkbox elements and add them to the page
 */
function createCheckboxes()
{
    moduleLinks = getNodes("//img[contains(@src, 'button_linkaustabelle.gif')]");

    for (i = 0; i < moduleLinks.length; i++)
    {
        moduleName = moduleLinks[i].parentNode.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.textContent;

        var chkFinished = document.createElement("input");
        chkFinished.setAttribute('id', 'hide_' + moduleName);
        chkFinished.setAttribute('name', 'hide_' + moduleName);
        chkFinished.setAttribute('moduleName', moduleName);
        chkFinished.setAttribute('type', 'checkbox');
        chkFinished.addEventListener('click', setModuleFinished, true);
        chkFinished.style.display = 'none';
        chkFinished.checked = GM_getValue(moduleName, false);

        if (GM_getValue(moduleName, false))
            finishedModules.push(moduleName);

        checkBoxes.push(chkFinished);
        moduleLinks[i].parentNode.parentNode.insertBefore(chkFinished, moduleLinks[i].parentNode);
    }
}

/**
 * Called when clicking on a a checkbox
 **/
function setModuleFinished(evt)
{
    moduleName = evt.target.getAttribute('moduleName');
    GM_setValue(moduleName, evt.target.checked);  // Save value to Greasemonkey

    if (evt.target.checked) // new module set as finished
    {
        finishedModules.push(moduleName);
    }
    else // finished module is now unfinished again
    {
        finishedModulesTmp = [];
        for (i = 0; i < finishedModules.length; i++)
        {
            if (finishedModules[i] != moduleName)
                finishedModulesTmp.push(finishedModules[i]);
        }
        finishedModules = finishedModulesTmp;
    }

    if (hideFinishedModules)
        toggleModule(moduleName, evt.target.checked);
}

/**
 * Toggle configuration checkboxes
 **/
function toggleCheckboxes()
{
    try
    {
        showCheckboxes = !showCheckboxes;

        for (i = 0; i < moduleLinks.length; i++)
        {
            moduleLinks[i].style.display = showCheckboxes ? 'none' : '';
            checkBoxes[i].style.display = !showCheckboxes ? 'none' : '';
        }
    }
    catch(e) {
        if (debug) alert(e.message);
    }
}

/**
 * Show all or hide finished modules
 **/
function toggleFinishedModules()
{
    hideFinishedModules = !hideFinishedModules;

    try
    {
        var cell = document.getElementById('switchcell');
        if (cell)
            cell.innerHTML = hideFinishedModules ? showAllModulesText : hideFinishedModulesText;

        for (i = 0; i < finishedModules.length; i++)
        {
            toggleModule(finishedModules[i], hideFinishedModules);
        }
    }
    catch(e) {
        if (debug) alert(e.message);
    }
}

/**
 * Show/Hide a specific module
 **/
function toggleModule(moduleName, display)
{
    var moduleTd = getNode("//td[contains(text(),'" + moduleName + "')]");

    if (moduleTd && moduleTd.singleNodeValue)
    {
        var parentNode = moduleTd.singleNodeValue.parentNode;
		
		// toggle table row display
        parentNode.style.display = display ? 'none' : '';
		
		// toggle line separator
        parentNode.nextSibling.nextSibling.style.display = display ? 'none' : '';
    }
}

/**
 * Get specific node from DOM
 **/
function getNode(xpath)
{
    var evaluator = new XPathEvaluator();
    return evaluator.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
}

/**
 * Get nodelist from DOM
 **/
function getNodes(xpath)
{
    var nodes = [];
    var evaluator = new XPathEvaluator();
    var result = evaluator.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    while ((aNode = result.iterateNext()) != null) {
        nodes.push(aNode);
    }

    return nodes;
}
