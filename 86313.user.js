// ==UserScript==
// @name            [TS] Title Amender
// @namespace       TimidScript
// @homepage        http://userscripts.org/scripts/show/86313
// @author          Timid Script
// @author's page   http://userscripts.org/users/100610
// @license         CC BY http://creativecommons.org/licenses/by/3.0/
// @usage           Give credit to original author and link
// @description     Removes outgoing links tracking/redirection parts.
// @description     Allows you to alter titles of websites by trimming, adding and replacing text
// @include         *
// @version         2.0.8
// @require         http://userscripts.org/scripts/source/159301.user.js
// @resource  meta  http://userscripts.org/scripts/source/86313.meta.js
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFeUlEQVR42r2XD0zUZRjHvz/uDk7kDsVODlIQMVFrpRPXtBS1zGpqlJRimp0xEZxmYJKZW5o5jaGCuZkKUyFiUgtQ5580yZQhoqLGJrMhcHgpdxz/7h/c/e563vuBCp16h9i7Pdvvd3t/7+f7PM/7PO97HPpmiMj43nzIPSE4Vi6Trvs0MUpp0reofzlSubXmn7a8/0vAykEB/bcV5ceJJo0fAmi1uHb2L/vryb9Ha5sth5+mAPbN2mCl/6ZjBfHcixHPAK2tQE0N0NaKVfuqLqUXVE2gOY6nIYDN3xiklK87dTiBGxMeIMBrawneBljMyLwAc1zqyQE0r6OvBXiRpQ4LGZh0onAZRob4Ay0tQF0dYDA44UZxEGalVhYWny+P7usUsF2+M2KEIuFE0TKEBvYHmpoAtRowMrgFbaJnEZNedfxkcUkMzTX2pQAJ2d4xowIX/0bw4AApoNcD9QxuAtotQEAEtp9vNiatzx5Nc9UeRPWxAnzIsiPHDX3/6M9xGCwnLTodcLseMDF4O6B4ARgdDt6oQdKGExUZBy69Qd9o+0KAjCx/yqThMwvzVBjgwzlLDRoNYO6EK8cBI4fS+x3nO0+WnPpnRXrOVbdFPEwA1RaORE8d/vKPGdHwlUmFnDc0ODebEz6EKm24kuB3hXerFbDZwNt4rN5RWrEj95pbIlwJEJOdmTJx7KvZ2xbDytkQSJH3u1Mi5NtK1RUyEQgdSHBtNzjsdqp+B3i7A6szytwS4UpArLe3d275qVQE+lajTmuGQ9wfL0n7wft2KRA2hbz3JXjjfTjP34N3DZ4eP0svq9iZ++h0uBKQFRo6TFXzRyIt2Ay1zgJ1gwFhg0YgSEzeB1JFmqkKOjoEr13AwXFOs4nEWLX7esWuH84+VIQrARl+fn4r6i9vg7+oGgZysFbTilERoyHiqeuZm7rDGbgn3It6loiESiSwKYORsKbo0r7Mc1Fw0R9cCRhPVpK4NNb7+5QIemx3NnUvh10I94P5ZtZttU64WOyEw4eqWKGAyerA5OnpWy5fVa91RwAbKrK961NUog1xQ8DxJsHbLq/5zqP/Qc8ZuCfcl/aKv79zr2xNO6354pvjVLOwuyOAjY+ZiC+TPxJvWhIErqPtvteOHgddF5yBvb0F69cPkMsF0dSqM7PLTHHJhVQ63Q+px3XCRWxTpqxcIN68RAkvq8HlZnPmm3nOwMxzBpfJhEgRnEVAlVRUvP/QlWnupuDBsYBsf/LyDyTffRIML5vxv/Auz6VSwRicRaoTfvTkDct7S/OndnTYLvRGABvzyLJXxcdI0uKHwos3dtvpTq+7jIWdwVmPIAGlZbW22aqfFuv0plxXC3tyH2DHbM7yuLk+6StG0Pls7A7v8pylqBN+/Vq9Y44qL7Gmvnn3wxb19Eb0DllevOpd6a61YyESW+7n3M9PmNEJr7551zFj/sGvquuaNj9qwd7cCfMUCsW8G/lfIyCSlZ1NiATznDUogmtqtHgz9mDa9aqGz/GYu6GnAmZwHHfs0MZ4UYyhGJg8G3j7eUJYhHIj7/WaRsxZmJN5vrxuKXrU/JMKoBsoriya+1bIgSgLuEZ2NBN0+lzgtVDqkO0w6lowa17Wr8Ult9imtbqzqCcCtshkspRb+xZi0J2LdCYQ3GwVMKvXUMNuwPwP958uOFZJYYHZ3UU9EXA8MnLCzItrhtGdkG7C7fw9EfyiBMRvzCnPPFg6g+Y1e7CmRwKy5HK56u8DS6DQl5HnvFOEQxKA5Erfm9t3FUymOXc9gXsq4Dmyc1GvTBiclRiJMIkOFrsUm88Yar/dUzDN4XDc8hTuqQA26E8gEiUSSXB4eJijUa+/qW3Q7aHfdL2B90ZAn49/AcsAWj+uzY09AAAAAElFTkSuQmCC

// @grant           GM_setValue
// @grant           GM_getValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_log
// @grant           GM_getResourceText
// @grant           GM_registerMenuCommand
// ==/UserScript==

/*
*****************************************************************
Version 2.0.7
 - Bug Fix: DocTitle string is being replaced.

Version 2.0.6
 - Bug Fix: Check if item is enabled. 
 - Ignores empty document titles

Version 2.0.5
 - Bug fix: Removal of titles is fixed

Version 2.0.4 (24/02/2013)
 - Bug fix: Capture title change in document

Version 2.0.2 (11/02/2013)
 - Small fixed

Version 2.0.1 (09/02/2013)
 - Initial release of new version
 - New Settings Window
 - Ability to add your own amendements through the settings window
 - Everything stored in prefs.js file (about:config)
 - Can now an regex search and replace.         

Version 1.0.5
 - Did something really important

Version 1.0.3
 - Added auto-update

Version 1.0.2: Fixed Youtube
 - Fixed Youtube

version 1 (Title Trimmer)
 - Inital release
*****************************************************************/

GM_registerMenuCommand("[TS] Title Amender Settings", ShowSettings);

var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACMklEQVR42mNkwA/EbCyVosX4WG+u23lzGzYFjHg0y7s4qO1eMz9KlfnOrf8R1Qc9t556upNYA1Q8XDT2rJkbIc/95AHD31fvGFLmPs9ZsOX0VGIM0Ar01d29bGqwFMfDewwM778wdOz5sbly0rZAoNxfQgYYR4UYbp/f6yvKdv8OA8Onn0DjDBnu3H/wpaRtn/fG/fcO4TPAPDbQctfkRg8+/pdXGBi+/2Ng0DRgYPjzHsj+znDn4fsvpRNPem84cP8QVgO4ubn3Pj5R5vTw5WsGDRY2Bg5pAQaGX+8YGH78ADoc4vI7z79+KZxxyXvL9iuHMAxgZmZef3lPRYCU6C8GPm5uBsYvQM0/gV749w+igIWFgYGDg+HGD47PgRHzjG7cenkH3QsSyorSe3fNC9NSEvoNtP0XA8P//xAZVlYGBk5OBgZBQQYGdnaGmoatVa0TDrRjC0RxRTnJvbum+2uriAKdzcgI0czFxcAgIAA25O2jV/9CU1c67j8GCQts0SgmLyO+e9f0QD01ORZQ4EA0Aw358uItQ0nt1oKZS89OJJSQROTlpC7f2psvwSbOAnb2z3cfGIrKNzZNW3S6npiU6NcUZbuhVu8/I0NKOMNf1l8MNTUbp3RMPpQHlPtP0ABBQcHzL/ssDVhfPmP4r2HM0HXx5bKK+i2xQKl/xCRlYIyxrN7b7hdiLfKVYdqZv9vzpu4JAAr/wqYWlxfYmZiYnGRkpf8+evh4P5D/G4c6BgASi80RI6E2VAAAAABJRU5ErkJggg==";
var iDoc = document; //Used to store iframe at creation
var docTitle = null; //Original document title
var changesMade = false; //If changes are made this is set to true. Set to false when iframe window is displayed

var amendList = new Array(); //An array containing all amend data
savedData = GM_getValue("AmendList", null);
if (savedData == null) //Default amendList data
{
    AddAmendListItem(1, "^https?://www\\.youtube\\.com", " - YoUtUbE$", "");
    AddAmendListItem(1, "^https?://(\\w+\\.)?deviantart\\.com", " on deviantart", "");
    AddAmendListItem(1, "^https?://(\\w+\\.)?crunchyroll\\.com", "Crunchyroll - Watch ", "");
    AddAmendListItem(1, "^https?://anidb\\.net", "::AniDB.net::", "");
    AddAmendListItem(1, "^https?://anidb\\.net", "::", "");
    AddAmendListItem(1, "^https?://(\\w+)\\.google\\.com", "- Google Search", "");
    AddAmendListItem(1, "^http://www\\.emacswiki\\.org", "^(EmacsWiki)(:\\s)(.+)$", "$3$2$1");
}
else //Parse data from saved value
{
    amendList = JSON.parse(savedData); //Gets amendList data
    savedData = null;
}

AmendPageTitle();
document.head.addEventListener("DOMSubtreeModified", AmendPageTitle, false);

/*
=====================================================================
 Parses through amendlist, if URL match, it tries to amend the 
 document title
=====================================================================*/
function AmendPageTitle()
{
    //console.log("Amend Title");
    if (document.title != "" && docTitle != document.title)
    {
        docTitle = document.title;
        for (var i = 0; i < amendList.length; i++)
        {
            var item = amendList[i];

            if (item.enabled == 1)
            {
                var re = RegExp(item.url, "i");
                var m = re.exec(document.URL);

                if (m != null)
                {
                    re = RegExp(item.search, "gi");
                    docTitle = docTitle.replace(re, item.replace);
                }
            }
        }
        document.title = docTitle;
    }
}

/*
=====================================================================
 amendList structer. Not necessary at all but used for lazy ass
 auto-complete
=====================================================================*/
function makeStruct(names)
{
    var names = names.split(' ');
    var count = names.length;
    function constructor()
    {
        for (var i = 0; i < count; i++)
        {
            this[names[i]] = arguments[i];
        }
    }
    return constructor;
}
var RowData = makeStruct("enabled url search replace"); //See above

/*
=====================================================================
 Adds items to amendList
=====================================================================*/
function AddAmendListItem(enabled, url, search, replace)
{
    amendList.push({ "enabled": enabled, "url": url, "search": search, "replace": replace });
}

/*
=====================================================================
 ??
=====================================================================*/
function AddListner(id, func, parm)
{
    node = iDoc.getElementById(id);

    if (parm == undefined) node.addEventListener("click", function () { func() }, true);
    else node.addEventListener("click", function () { func(parm) }, true);
}

/*
=====================================================================
 Shows settings dialog in an iframe.
=====================================================================*/
function ShowSettings()
{
    changesMade = false;

    var iframe = CreateElement(
        "iframe",
            {
                "id": "TASettings",
                "style": "position: fixed; top: 0px; left: 0px; right: 0px; border: none; height: 100%; width: 100%; z-index: 10001; background-color: rgba(128, 128, 128,0.25);"
            },
        document);



    iframe.onload = function ()
    {

        iDoc = iframe.contentDocument || iframe.contentWindow.document;
        iDoc.body.innerHTML = content;
        head = iDoc.head;
        style = iDoc.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
        iDoc.getElementById("icon").setAttribute("src", icon);


        AddListner("btnAdd", OnClickAddRow);
        AddListner("txtURL", OnClickClearContent);
        AddListner("txtSearch", OnClickClearContent);
        AddListner("txtReplace", OnClickClearContent);

        AddListner("btnInvert", OnClickInvertSelection);
        AddListner("btnDeselect", OnClickDeselect);
        AddListner("btnUp", OnClickMoveUp);
        AddListner("btnDown", OnClickMoveDown);
        AddListner("btnDisable", OnClickRowEnable, false);
        AddListner("btnEnable", OnClickRowEnable, true);
        AddListner("btnDelete", OnClickDelete);

        AddListner("btnSave", OnClickSave);
        AddListner("btnCancel", OnClickCancel);

        PopulateTable();
    }

    document.body.appendChild(iframe);
}

/*
=====================================================================
 Populates the settings table
=====================================================================*/
function PopulateTable()
{
    for (var i = 0; i < amendList.length; i++)
    {
        AddRow(amendList[i].enabled, amendList[i].url, amendList[i].search, amendList[i].replace);
    }
}

/*
=====================================================================
 Resets input text boxes
=====================================================================*/
function ResetAddTextBox()
{
    var el = iDoc.getElementById("addRow");
    el.setAttribute("cleared", 0);

    var el = iDoc.getElementById("txtURL");
    el.value = el.getAttribute("value");
    StyleSetAttributes(el, "color: #999999;");

    el = iDoc.getElementById("txtSearch");
    el.value = el.getAttribute("value");
    StyleSetAttributes(el, "color: #999999;");

    el = iDoc.getElementById("txtReplace");
    el.value = el.getAttribute("value");
    StyleSetAttributes(el, "color: #999999;");
}

/*
=====================================================================
  Creates document element. Default doc value is set to iframe
  document
=====================================================================*/
function CreateElement(tag, attributes, doc)
{
    if (doc == undefined) doc = iDoc;
    var el = doc.createElement(tag);

    for (var x in attributes) el.setAttribute(x, attributes[x]);
    return el;
}

/*
=====================================================================
  Highlights row when moves hovers over it. 
=====================================================================*/
function HighlightRow(row)
{
    StyleSetAttributes(row, "background-color: lightsalmon;");
}

/*
=====================================================================
 Removes attributes from element style. attributes should a string 
 of attribute names seperated by semi-colon (;).
=====================================================================*/
function StyleRemoveAttributes(element, attributes)
{
    attribs = attributes.split(";");
    var style = element.getAttribute("style");
    if (style != null)
    {
        for (var i = 0; i < attribs.length; i++)
        {
            attrib = attribs[i].split(':')[0].trim();
            if (attrib.length > 0)
            {
                var replaced = style.split(';').filter(function (v)
                {
                    return v.split(':')[0].trim() != attrib;
                }).join(';');


                style = replaced;
                if (attrib == "color") console.log("---> " + style);
            }
        }
        element.setAttribute("style", style);
    }
    else element.setAttribute("style", "");
}

/*
=====================================================================
 Set style attributes without creating duplicates. Uses
 StyleRemoveAttributes() first. 
=====================================================================*/
function StyleSetAttributes(element, attributes)
{
    StyleRemoveAttributes(element, attributes);
    style = element.getAttribute("style") + attributes;
    element.setAttribute("style", style);
}

/*
=====================================================================
 Sets the row color of the table
=====================================================================*/
function SetRowColor(row)
{
    if (row.getAttribute("selected") == 1)
    {
        StyleSetAttributes(row, "background-color: yellow;");
    }
    else if (row.rowIndex % 2 == 1)
    {
        //StyleSetAttributes(row, "background-color: lightgoldenrodyellow;");
        StyleSetAttributes(row, "background-color:  #FFF3C3;");
    }
    else
    {
        //StyleSetAttributes(row, "background-color: #FFFF99;");
        StyleSetAttributes(row, "background-color:  #F6CCC0;");
    }
}

/*
=====================================================================
 Parses through all rows and uses SetRowColor to set the color
=====================================================================*/
function SetAllRowColors()
{
    var rows = iDoc.getElementById("dataTable").rows;
    for (var i = 1; i < rows.length; i++)
    {
        SetRowColor(rows[i]);
    }
}

/*
=====================================================================
 Copies row into input text boxes. Called when a row is double 
 clicked.
=====================================================================*/
function CopyRow(row)
{
    //var addRow = iDoc.getElementById("addRow");
    //if (iDoc.getElementById("addRow").getAttribute("cleared") == 1)
    ClearContent(iDoc.getElementById("txtURL"));
    ClearContent(iDoc.getElementById("txtSearch"));
    ClearContent(iDoc.getElementById("txtReplace"));

    iDoc.getElementById("txtURL").value = row.cells[0].innerHTML;
    iDoc.getElementById("txtSearch").value = row.cells[1].innerHTML;
    iDoc.getElementById("txtReplace").value = row.cells[2].innerHTML;
    iDoc.getElementById("addRow").setAttribute("cleared", 1);

}

/*
=====================================================================
 Adds row to the table
=====================================================================*/
function AddRow(enabled, url, search, replace)
{
    var table = iDoc.getElementById("dataTable");

    var row = table.insertRow(-1);
    row.setAttribute("class", "notfirst");
    row.setAttribute("selected", 0);
    row.setAttribute("style", "cursor: pointer;");
    row.setAttribute("enabled", enabled);
    if (enabled == 0) StyleSetAttributes(row, "color: gray;");

    row.addEventListener("click", function () { OnClickRow(row) }, true);
    row.addEventListener("mouseover", function () { HighlightRow(row) }, true);
    row.addEventListener("mouseout", function () { SetRowColor(row) }, true);
    row.addEventListener("dblclick", function () { CopyRow(row) }, true);

    SetRowColor(row);
    var cel = row.insertCell(-1);
    cel.innerHTML = url;

    cel = row.insertCell(-1);
    cel.innerHTML = search;

    cel = row.insertCell(-1);
    cel.innerHTML = replace;

    ResetAddTextBox();
}

/*
=====================================================================
 Calls AddRow to add input boxes content to the table
=====================================================================*/
function OnClickAddRow()
{
    if (iDoc.getElementById("addRow").getAttribute("cleared") == 1)
    {
        cel0 = iDoc.getElementById("txtURL").value;
        cel1 = iDoc.getElementById("txtSearch").value;
        cel2 = iDoc.getElementById("txtReplace").value;

        if (cel0.length > 0 && cel1.length > 0)
        {
            AddRow(1, cel0, cel1, cel2);
            changesMade = true;
        }
    }
}

/*
=====================================================================
 Highlights row if clicked on.
=====================================================================*/
function OnClickRow(row)
{
    selected = row.getAttribute("selected");

    row.setAttribute("selected", (selected == 1) ? 0 : 1);
    SetRowColor(row);
}

/*
=====================================================================
 Parses to selected rows and enables/disables them
=====================================================================*/
function OnClickRowEnable(enabled)
{
    var rows = iDoc.getElementById("dataTable").rows;

    for (var i = 1; i < rows.length; i++)
    {
        if (rows[i].getAttribute("selected") == 1)
        {
            if (enabled == true) StyleRemoveAttributes(rows[i], "color"); else StyleSetAttributes(rows[i], "color: gray;");
            rows[i].setAttribute("enabled", (enabled == true) ? 1 : 0);
            changesMade = true;
        }
    }
}

/*
=====================================================================
 Clears the content of the input boxes.
=====================================================================*/
function ClearContent(element)
{
    StyleRemoveAttributes(element, "color");
    element.value = "";
}

/*
=====================================================================
 Called when any input box is selected. The content of the boxes
 are cleared and text color is set to black.
=====================================================================*/
function OnClickClearContent()
{
    row = iDoc.getElementById("addRow");
    if (row.getAttribute("cleared") == 0)
    {
        row.setAttribute("cleared", 1);

        ClearContent(iDoc.getElementById("txtURL"));
        ClearContent(iDoc.getElementById("txtSearch"));
        ClearContent(iDoc.getElementById("txtReplace"));
    }
}

/*
=====================================================================
 Parses through rows and inverts selection
=====================================================================*/
function OnClickInvertSelection()
{
    var rows = iDoc.getElementById("dataTable").rows;
    for (var i = 1; i < rows.length; i++)
    {
        if (rows[i].getAttribute("selected") == 0) rows[i].setAttribute("selected", 1);
        else rows[i].setAttribute("selected", 0);
    }
    SetAllRowColors();
}

/*
=====================================================================
 Parses through rows and deselects them
=====================================================================*/
function OnClickDeselect()
{
    var rows = iDoc.getElementById("dataTable").rows;
    for (var i = 1; i < rows.length; i++)
    {
        rows[i].setAttribute("selected", 0);
    }
    SetAllRowColors();
}

/*
=====================================================================
 Deletes selected rows
=====================================================================*/
function OnClickDelete()
{
    if (confirm("Are you sure you wish to delete all selections"))
    {
        var table = iDoc.getElementById("dataTable");
        var rows = table.rows;

        for (var i = rows.length - 1; i > 0; i--)
        {
            if (rows[i].getAttribute("selected") == 1)
            {
                table.deleteRow(i);
                changesMade = true;
            }
        }
        SetAllRowColors();
    }
}

/*
=====================================================================
 Moves selected rows down one
=====================================================================*/
function OnClickMoveDown()
{
    var rows = iDoc.getElementById("dataTable").rows;


    for (var i = rows.length - 2; i > 0; i--)
    {
        row1 = rows[i].getAttribute("selected");
        row2 = rows[i + 1].getAttribute("selected");


        if (row1 == 1 && row2 == 0)
        {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            changesMade = true;
        }
    }
    SetAllRowColors();
}

/*
=====================================================================
 Moves selected rows up on
=====================================================================*/
function OnClickMoveUp()
{
    var rows = iDoc.getElementById("dataTable").rows;

    for (var i = 2; i < rows.length; i++)
    {
        row1 = rows[i].getAttribute("selected");
        row2 = rows[i - 1].getAttribute("selected");

        if (row1 == 1 && row2 == 0)
        {
            rows[i].parentNode.insertBefore(rows[i], rows[i - 1]);
            changesMade = true;
        }
    }
    SetAllRowColors();
}

/*
=====================================================================
 Saves settings
=====================================================================*/
function OnClickSave()
{
    if (changesMade)
    {
        var rows = iDoc.getElementById("dataTable").rows;

        amendList = new Array();
        for (var i = 1; i < rows.length; i++)
        {
            //GM_log(rows[i].getAttribute("enabled") + rows[i].cells[0].innerHTML + rows[i].cells[1].innerHTML + rows[i].cells[2].innerHTML);
            AddAmendListItem(rows[i].getAttribute("enabled"), rows[i].cells[0].innerHTML, rows[i].cells[1].innerHTML, rows[i].cells[2].innerHTML);
        }

        GM_setValue("AmendList", JSON.stringify(amendList));
        AmendPageTitle();
    }
    document.body.removeChild(document.getElementById("TASettings"));
}

/*
=====================================================================
 Exits and cancels any changes
=====================================================================*/
function OnClickCancel()
{
    if (!changesMade || confirm("Do you wish to exit and cancel changes?"))
        document.body.removeChild(document.getElementById("TASettings"));
}


/*
=====================================================================
 Settings Window HTML code
=====================================================================*/
var content = '<div style="position: fixed; top: 100px; left: 5%; width: 90%; height: 400px; border: 1px dotted #000000; margin: 0 auto; background-color: #FFFFFF;">' +
                '    <div class="gradient" style="width: 100%; font-weight: bold;"><img id="icon" /> Title Trimmer Settings</div>' +
                '    <table style="width: 100%;" border="1" cellspacing="1" cellpadding="1">' +
                '        <tbody>' +
                '            <tr id="addRow" cleared="0">' +
                '                <th style="width: 60px;">' +
                '                    <input id="btnAdd" type="submit" style="width: 100%" value="Add" /></th>' +
                '                <th style="width: 60%;">' +
                '                    <input id="txtURL" type="text" style="width: 98%; color: #999999;" value="Website" /></th>' +
                '                <th style="width: 20%;">' +
                '                    <input id="txtSearch" type="text" style="width: 95%; color: #999999;" value="Search Text" /></th>' +
                '                <th>' +
                '                    <input id="txtReplace" type="text" style="width: 95%; color: #999999;" value="Replacement Text" /></th>' +
                '            </tr>' +
                '        </tbody>' +
                '    </table>' +
                '    <div style="height: 300px; overflow-y: auto;">' +
                '        <table id="dataTable" style="width: 100%;" border="0" cellspacing="1" cellpadding="1" bgcolor="black">' +
                '            <tbody id="dataTBody">' +
                '                <tr style="background-color: lightsteelblue;">' +
                '                    <th style="width: 60%;">Website</th>' +
                '                    <th style="width: 20%;">Search Text</th>' +
                '                    <th>Replacement Text</th>' +
                '                </tr>' +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '    <div style="width: 100%; text-align: left; background-color: lightsteelblue;">' +
                '        <div style="display: inline-block; width: 5px;"></div>' +
                '        <input id="btnInvert" type="submit" style="width: auto;" value="Invert Selection" />' +
                '        <input id="btnDeselect" type="submit" style="width: auto;" value="Deselect All" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnUp" type="submit" style="width: 70px;" value="Up" />' +
                '        <input id="btnDown" type="submit" style="width: 70px;" value="Down" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnEnable" type="submit" style="width: 70px;" value="Enable" />' +
                '        <input id="btnDisable" type="submit" style="width: 70px;" value="Disable" />' +
                '        <div style="display: inline-block; width: 20px;"></div>' +
                '        <input id="btnDelete" type="submit" style="width: 70px;" value="Delete" />' +
                '    </div>' +
                '    <div class="gradient" style="width: 100%; text-align: right;">' +
                '        <input id="btnSave" type="submit" style="width: 70px; margin-right: 5px" value="Save" />' +
                '        <input id="btnCancel" type="submit" style="width: 70px; margin-right: 5px" value="Cancel" />' +
                '    </div>' +
                '</div>';

/*
=====================================================================
 Styles
=====================================================================*/
css = ".gradient { background-image: linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%);" +
        "background-image: -o-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%);" +
        "background-image: -moz-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%);" +
        "background-image: -webkit-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%);" +
        "background-image: -ms-linear-gradient(bottom, rgb(82,106,179) 37%, rgb(157,117,217) 69%);" +
        "background-image: -webkit-gradient( linear, left bottom, left top, color-stop(0.37, rgb(82,106,179)), color-stop(0.69, rgb(157,117,217))); }";