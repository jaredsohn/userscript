// eBay Forum Signature Switch user script
// version 0.2.3
// 2008-02-08
// Copyright 2006-2008, thorbenhauer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// -----------------------------------------------------------------------------
//
// Icon: Humility Icon Set
// by Andrew Fitzsimon and Chad 'gonZo' Rodrigue
// http://art.gnome.org/themes/icon/1136
// Released under the GPL license
//
// -----------------------------------------------------------------------------
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Forum Signature Switch
// @namespace     http://userscripts.org/users/9022
// @description   http://userscripts.org/scripts/show/6280
// @include       http://forums*.ebay.tld/*thread.jspa?*
// ==/UserScript==
//
// -----------------------------------------------------------------------------
(function () {

const ONPNG = 'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWBAMAAAAyb6E1AAAAElBMVEXU0Mj39/fu7u6AgIBAQEAA' +
'AAAUIDs2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAR0lEQVQImWMQhAERBgEGKDBhEFCCAlKZoaFK' +
'qkGqICaQCoIxlZSCVEPBzFAQUxUhqhoKV6sUCjdBSZVki7ExhY2hwITBBQ4AD7Mg5fEmz48AAAAA' +
'SUVORK5CYII=';

const OFFPNG = 'data:image/png;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAIAAABPIytRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
'kElEQVQ4jdWUoRLDIBBEl8x9wcqKyH4Hln+tiOQ3KivyC2exFclcCSHpgGMVC/fYg2FwKSV0KYQg' +
'ANbPu5V8LRGAbOYxPxvxCGBqzcw1KCy5IQlAVXNrM4U9wCStyJZtULWVtlXVQu7158wk840KK1Xg' +
'qs/CVi7sXHSlH3wG7mMx7AsbFBbsf0rsgJ33vjv5C+MsNsw0IKCAAAAAAElFTkSuQmCC';

const EDIPNG =  'data:image/png;base64,' +
'R0lGODdhFAAWAOeZAAAAAAEBAQICAgcHBwkJCQoKCg8PDxERDxMTExQUFBcXFxoXFBgYGBoaGhsb' +
'Gx0dHR4eHh8fHyAgICIiIiMiISMjIyUlJScnJygoKDomBCkpKSoqKisrKywsLDIyMjMzMzQ0NDU1' +
'NVE1Bjo5Njk5OT09PVk6B049G0BAQEFBQUJCQk9BK11DG0dHR1tMLWpKFk5OTmBQKlFRUVhRRlJS' +
'UlZWVldXV3lWCVlZWWJZR3pYC3tZDHtZDXxaD3dbJHtZJXxcHF9fX3lcLYFgGGNjY2RkZHlkO4Zn' +
'IWlpaX9qQYprKG1tbXZuX3BwcI1vLpBuLI5wMZR1NHh4eJZ4OpZ6PZd6PoV9bX9+fJF9XoCAgJuC' +
'SJqBV52DSoeHh4iIiKSEUpyIaJGKfY2NjZePfqiRX5uSf6iQaKqTYpWVlZeXl5iYmKWXga2Yaq6Z' +
'a5ubm7Ccbq6bfrWedranibS0tL22qLe3t8W2mb23rcC4pb29vb6+vsDAwNDAp9HHs8vLy87Lxs7O' +
'ztHPy9TQyNjRxdbW1tra2uDZ0Nvb29zc3OLe1t/f3+Dg4OHh4ePi4eTk5OXl5ebm5ufn5+np6erq' +
'6uvr6+zs7O3t7e7u7vf39///////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'/////////////////////////////////////////////////////ywAAAAAFAAWAAAI/gAxCRxI' +
'sCBBFJgEKVzIsKHCLAgFXZpIsaLFSxATXtxIMaNEi4hkILE00U6VKBgjWiQ0YY8YFZfOaCHzJKVG' +
'ioc+zImUaU8SLW169LH58dIhD17S6Ckkh8ubIVMmepyIaEOKIg+a5KDy5siORFJVIsLwAIKECRSg' +
'vFFyw0iNsAkdWcAggUEDByfYONHhIwgRHERlVAixIUICJnhi8ACCoUUREIo8TrJRYsKFEYEINXKx' +
'QAEHDR8WTb3EqMYAOoQelTlgAAEKNI+IThQTwUrqMQQGFKgDiRIl2Zf4fFlxJwwCAQACdGBEo4js' +
'OGa2CMkwowUJDDAAufFD0qOhHy9MMYhgcUXKki6SKFWy1D3iIDhgsKz5U0gNmjzpScItytFixiwA' +
'BijggAGiYOCBCCaoYEAAOw==';

const LOAPNG =  'data:image/png;base64,' +
'R0lGODdhFAAWAMIFANTQyPf39+7u7oCAgEBAQP///////////ywAAAAAFAAWAAADWhi63EwByEmr' +
'HBCIzbsXWPSNXKiRo9kRbMt2KkecG0DA2SrV9BbLhIHwhhN9Xp9fbXBJ5mCUgUc5q0yfm6BwS/Rh' +
'BS5XsYcqfcteI9qsXoPO6NB2Tq+H7/hWAgA7';

const ERRPNG =  'data:image/png;base64,' +
'R0lGODdhFAAWAOeHACsICEwBAToLCzkODjwODmcAAGgAAFALCx0kJDMbG3YAAHEDAyYqKiQrK5EA' +
'AFkbGy4uLpoAAJwAADgrK50AAIANDYENDYINDYMNDXgSEpgFBaYAAD4vL6wAAK4AAK8AAFEpKVIp' +
'KbABAVMpKacFBbMAALQAALMBAaoFBbcAALkAALoAALgBAbYCArUDA1wqKj04OLEJCboHB6sPD64P' +
'D6sREX0lJbwKCkBAQLYTE6wYGGk1Na0YGLQZGZ4jI2c7O09GRr8ZGaArK7ohIaMrK74jI7MpKbom' +
'JrYoKIg8PLsoKMInJ7krK7ctLaE3N74rK8QwMMIxMbk1Nbw1NcgyMl1lZXdaWsY5OcQ8PLJERF5q' +
'asU/P29kZMZFRXZxccxOTnt1ddZQUMxVVc9UVH9/f8hhYYCAgMthYctkZNBiYoGEhMxlZdJjY9Bk' +
'ZMloaN1jY32Ojs5ubtNubtdvb9twcM52dpuOjoKZmdN8fJ6enrSzs7K0tLfAwMDHx9TQyNfX1+3t' +
'7e7u7u3z8+/4+Pf39/T///r/////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'////////////////////////////////////////////////////////////////////////////' +
'/////////////////////////////////////////////////////ywAAAAAFAAWAAAI/gAJCRxI' +
'sCBBHIT8KFzIsKFCMwj9BJpIsaLFQBATVvxjx8qPH1bs/KmYUWIgQHlARFgSJsySCCDyAJpY8iSX' +
'CjLk4KlTB48cGRW4zKyZx0ILOmvalDnDBs2cExbyYIz4J0SKKzsQOBnz5QWELFhMhPhT0o4EEUng' +
'HILh40GfQwzEdJBgp6SVEjS2JCh0aMKeQ2psdJlRwkrJHyp4TCkCQNChQ14yPJGiQ8WPwypqIAkS' +
'QM9jDhqGGKlh2a4JFDkO8DkEZtAhIA56kDBhOKIdCh4W3DlExoAAQ4caxOhAoS7VESs+ENBSoMOG' +
'AVUUeEgxgmzEQHkwsIAiREkTJkeIQ0RxgUFqTUBcLtxIE8eNmzhpblwQOlXjyZQSqLx5Q0VCzJn1' +
'mTQRRx6BJBJJ112kIE0ImeHggxBG+CAOFFZo4YUYBgQAOw==';

var anchor = document.evaluate("//td[@class='ebayWelcome']//b", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (anchor == null) {
    return;
}
var userID = anchor.innerHTML;
var baseURL = document.location.href.split("thread.jspa?")[0];
var spellcheck = document.evaluate("//a[@name='spellcheck']/ancestor::td[1]",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
if (spellcheck == null) {
    return;
}
var node = spellcheck.childNodes[0];
if (node.nodeType == 3) {
    spellcheck.removeChild(node);
}
var tarea = document.getElementById("body01");
var tr = document.evaluate("//table[@class='jive-font-buttons']//tr",
    document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null).snapshotItem(0);
var status = getStatus(baseURL);
var elem = document.createElement('td');
elem.id = "status";
if (status != null && status == "on") {
    elem.appendChild(createImg("on"));
} else {
    elem.appendChild(createImg("off"));
}
tr.appendChild(elem);
elem = document.createElement('td');
elem.id = "edit";
elem.appendChild(createImg("edit"));
tr.appendChild(elem);
var text, backup;
var edit = false;
var errorMsg = null;

function createImg(type) {
    var img =  document.createElement("img");
    switch (type) {
        case "on":
            img.src = ONPNG;
            img.title = "Signature is active";
            img.alt = "Signature is active";
            img.width = "20";
            img.height = "22";
            img.border = "0";
            img.style.cursor = "pointer";
            img.addEventListener('click',
                function(event) {
                    hideSig(event);
                }, true
            );
            return img;
        case "off":
            img.src = OFFPNG;
            img.title = "Signature is hidden";
            img.alt = "Signature is hidden";
            img.width = "20";
            img.height = "22";
            img.border = "0";
            img.style.cursor = "pointer";
            img.addEventListener('click',
                function(event) {
                    showSig(event);
                }, true
            );
            return img;
        case "edit":
            img.src = EDIPNG;
            img.title = "Edit signature";
            img.alt = "Edit signature";
            img.width = "20";
            img.height = "22";
            img.border = "0";
            img.style.cursor = "pointer";
            img.addEventListener('click',
                function(event) {
                    editSig(event);
                }, true
            );
            return img;
        case "load":
            img.src = LOAPNG;
            img.title = "Sync in Progress";
            img.alt = "Sync in Progress";
            img.width = "20";
            img.height = "22";
            img.border = "0";
            return img;
        case "fail":
            img.src = ERRPNG;
            img.title = "Error";
            img.alt = "Error";
            img.width = "20";
            img.height = "22";
            img.border = "0";
            img.style.cursor = "pointer";
            img.addEventListener('click',
                function(event) {
                    error(event);
                }, true
            );
            return img;
        default:
            return null;
    }
}

function hideSig(event) {
    var td = document.getElementById("status");
    td.replaceChild(createImg("load"), td.firstChild);
    syncSig("");
    setStatus(baseURL, "off");
}

function showSig(event) {
    var sig = getSig(baseURL);
    if (sig != null) {
        var td = document.getElementById("status");
        td.replaceChild(createImg("load"), td.firstChild);
        syncSig(sig);
        setStatus(baseURL, "on");
    }
}

function editSig(event) {
    if (edit) {
        if (tarea.value.length > 0) {
            if (backup != tarea.value) {
                setSig(baseURL, tarea.value);
                var status = getStatus(baseURL);
                if (status == "on") {
                    showSig(null);
                }
            }
        } else {
            var status = getStatus(baseURL);
            if (status != null && status == "on") {
                hideSig(null);
            }
            removeData(baseURL);           
        }
        tarea.style.background = "";
        tarea.value = text;
        edit = false;
    } else {
        text = tarea.value;
        tarea.style.background = "lightsteelblue";
        backup = getSig(baseURL);
        tarea.value = backup;
        edit = true;
    }
}

function getData(baseURL) {
    var data = GM_getValue("data");
    if (data != undefined && data.length > 0) {
        var strings = data.split("||");
        var temp;
        for (var i = 0; i < strings.length; i++) {
            temp = strings[i].split("|");
            if (temp[0] == baseURL) {
                temp[2] = temp[2].replace(/\/&\//g, "|");
                return temp;
            }
        }
        return null;
    } else {
        return null;
    }
}

function getStatus(baseURL) {
    var data = getData(baseURL);
    if (data != null) {
        return data[1];
    } else {
        return null;
    }
}

function getSig(baseURL) {
    var data = getData(baseURL);
    if (data != null) {
        return data[2];
    } else {
        return null;
    }
}

function setData(baseURL, newStatus, newSig) {
    if (baseURL != undefined && baseURL.length > 0) {
        var data = GM_getValue("data");
        if (data != undefined && data.length > 0) {
            var strings = data.split("||");
            var temp;
            for (var i = 0; i < strings.length; i++) {
                temp = strings[i].split("|");
                if (temp[0] == baseURL) {
                    if (newStatus != undefined && newStatus.length > 0 &&
                        newSig == undefined) {
                        temp[1] = newStatus;
                        strings[i] = temp.join("|");
                        data = strings.join("||");
                        GM_setValue("data", data);
                        return;
                    }
                    if (newStatus == undefined && newSig != undefined &&
                        newSig.length > 0) {
                        newSig = newSig.replace(/\|/g, "/&/");
                        temp[2] = newSig;
                        strings[i] = temp.join("|");
                        data = strings.join("||");
                        GM_setValue("data", data);
                        return;
                    }
                    return;
                }
            }
            if (newSig != undefined && newSig.length > 0) {
                GM_setValue("data", data + "||" + baseURL + "|off|" +
                    newSig.replace(/\|/g, "/&/"));
            }
        } else {
            if (newSig != undefined && newSig.length > 0) {
                GM_setValue("data", baseURL + "|off|" +
                    newSig.replace(/\|/g, "/&/"));
            }
        }
    }
}

function setStatus(baseURL, newStatus) {
    setData(baseURL, newStatus, null);
}

function setSig(baseURL, newSig) {
    setData(baseURL, null, newSig);
}

function removeData(baseURL) {
    if (baseURL != undefined && baseURL.length > 0) {
        var data = GM_getValue("data");
        if (data != undefined && data.length > 0) {
            var strings = data.split("||");
            var temp;
            for (var i = 0; i < strings.length; i++) {
                temp = strings[i].split("|");
                if (temp[0] == baseURL) {
                    strings.splice(i, 1);
                    data = strings.join("||");
                    GM_setValue("data", data);
                    return;
                }
            }
        }
    }
}

function syncSig(sig) {
    GM_xmlhttpRequest({
        method: 'Post',
        url: baseURL + 'usersettings.jspa',
        headers:{
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: "name=" + userID + "&signature=" + sig,
        onload: function(responseDetails) {
            if (responseDetails.status == "200") {
                aftermath(null, sig);
            } else {
                aftermath(new Array(responseDetails.statusText,
                    responseDetails.status, responseDetails.responseHeaders),
                    sig);
            }
        }
    });
}

function error(event) {
    alert(errorMsg[0] + "\n" + errorMsg[1] + "\n" + errorMsg[2]);
    var td = document.getElementById("status");
    var status = getStatus(baseURL);
    if (status != null && status == "on") {
        td.replaceChild(createImg("on"), td.firstChild);
    } else {
        td.replaceChild(createImg("off"), td.firstChild);
    }
}

function aftermath(result, sig) {
    var td = document.getElementById("status");
    if (result != null) {
        errorMsg = result;
        td.replaceChild(createImg("fail"), td.firstChild);
        if (sig.length > 0) {
            setStatus(baseURL, "off");
        } else {
            setStatus(baseURL, "on");
        }
        return;
    }
    if (sig.length > 0) {
        td.replaceChild(createImg("on"), td.firstChild);
    } else {
        td.replaceChild(createImg("off"), td.firstChild);
    }
}

})();