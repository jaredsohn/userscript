// ==UserScript==
// @name           ČSFD - hodnocení filmů v profilech herců a režisérů
// @namespace      csfd
// @include http://www.csfd.cz/tvurce/*
// @grant none
// ==/UserScript==

/*
    checks for localStorage support
    http://diveintohtml5.org/storage.html
*/
function supports_html5_storage()
{
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

/*
    xmlhttp stuff
    http://www.quirksmode.org/js/xmlhttp.html
*/

function createXMLHTTPObject()
{
    try {
        xmlhttp = new XMLHttpRequest();
    }
    catch (e) {
        return false;
    }

    return xmlhttp;
}

function sendRequest(url, callback, postData) {
    var req = createXMLHTTPObject();
    if (!req) {
        return;
    }
    var method = (postData) ? "POST" : "GET";
    req.open(method, url, true);
    //req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    if (postData) {
        req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    }

    req.onreadystatechange = function () {
        if (req.readyState != 4) {
            return;
        }
        if (req.status != 200 && req.status != 304) {
            //alert('HTTP error ' + req.status);
            return;
        }
        callback(req);
    }
    if (req.readyState == 4) {
        return;
    }
    req.send(postData);
}

/*
    checks if user is logged in
*/
function getUserName()
{
    var XPath = "//div[@id='user-menu']/descendant::h3/a/text()";
    var userName = document.evaluate(XPath, document, null, XPathResult.STRING_TYPE, null).stringValue;

    return userName;
}

function getFilmList()
{
    var XPath = "//a[contains(@href, '/film/')]";
    var filmList = document.evaluate(XPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    return filmList;
}

function handleResponse(response)
{
    var responseDocument = document.createElement('div');
    responseDocument.innerHTML = response.responseText.replace(/<script(.|\s)*?\/script>/g, '');

    var XPath = ".//a[contains(@href, '/doplneni-k-filmu/')]/@href";
    var url = document.evaluate(XPath, responseDocument, null, XPathResult.STRING_TYPE, null).stringValue;
    var id = url.match(/\d+/)[0];

    XPath = ".//div[@id='ratings']/descendant::li[@class='favorite']";
    var ratingLIs = document.evaluate(XPath, responseDocument, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var rating = null;
    for (var i = 0; i < ratingLIs.snapshotLength; ++i) {
        var ratingLI = ratingLIs.snapshotItem(i);

        if (ratingLI.innerHTML.indexOf(userName) == -1) {
            continue;
        }

          var src = document.evaluate(".//img/@src", ratingLI, null, XPathResult.STRING_TYPE, null).stringValue;
        if (src) {
            rating = src.match(/\d+/)[0];
        } else {
            rating = 0;
        }
    }

    appendRating(id, rating);
}

function appendRating(id, rating)
{
    var XPath = "//div[@id='filmography']/descendant::tr[child::td/a[contains(@href, '/"+id+"-')]]";
    var filmRows = document.evaluate(XPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    console.log("id: " + id + " rating: " + rating + " rows: " + filmRows.snapshotLength);

    var html = '';
    if (rating === null) {
        html = '';
    } else {
        if (rating === 0) {
            html = 'odpad!';
        } else {
            html = '<img src="http://img.csfd.cz/sites/web/images/common/stars/'+rating+'.gif" border="0">';
        }
    }

    for (var i = 0; i < filmRows.snapshotLength; ++i) {
        var td = document.createElement('td');
        td.innerHTML = html;
        td.className = 'user-rating'
        td.style.width = '80px';

        var filmRow = filmRows.snapshotItem(i);
        filmRow.appendChild(td);
    }
}

function clearRatings()
{
    var XPath = "//td[@class='user-rating']";
    var ratingTDs = document.evaluate(XPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < ratingTDs.snapshotLength; ++i) {
        var ratingTD = ratingTDs.snapshotItem(i);
        ratingTD.parentNode.removeChild(ratingTD);
    }
}

function addRatings()
{
    var filmList = getFilmList();
    var processedIds = new Array();

    for(var i = 0; i < filmList.snapshotLength; ++i) {
        var film = filmList.snapshotItem(i);
        var url = film.getAttribute('href');

        var id = url.match(/\d+/);
        if (processedIds[id]) {
            continue;
        }

        processedIds[id] = 1;
        sendRequest(url, handleResponse);
    }
}

function onUserNameSelect(chooser)
{
    var chooser = document.getElementById('user-name-chooser');
    userName = chooser.options[chooser.selectedIndex].value;

    if (storage) {
        localStorage.setItem('ratings-user-name', userName);
    }
    
    addRatingsForUserName();
}

function addUserNameChooser()
{
    var div = document.getElementById('filmography');

    var html = '\
        <div class="header">\
            <h2>Zobrazit hodnocení uživatele</h2>\
            <div class="controls">\
                <div class="orderer select">\
                    <select id="user-name-chooser">\
                        <option value="">žádného</option>\
                    </select>\
                </div>\
            </div>\
        </div>\
        <div class="footer"></div>';

    var container = document.createElement('div');
    container.className = 'ct-general th-1';
    container.innerHTML = html;

    div.insertBefore(container, div.firstChild);

    var chooser = document.getElementById('user-name-chooser');

    var selectedIndex = 0;
    var length = usersToSelect.length;
    for(var i = 0; i < length; ++i) {
        var user = usersToSelect[i];

        var option = document.createElement('option');
        option.text = user;
        option.value = user;

        chooser.add(option, null)

        if (user === userName) {
            selectedIndex = i + 1;
        }
    }

    chooser.selectedIndex = selectedIndex;
    chooser.addEventListener('change', onUserNameSelect, false);
}

function addRatingsForUserName()
{
    clearRatings();

    if (userName) {
        addRatings();
    }
}

var userName = '';
// vybrani oblibeni uzivatele
var usersToSelect = new Array('POMO', 'golfista', 'kleopatra', 'KevSpa', 'Houdini');

userName = getUserName();
if (userName !== '') {
    var storage = supports_html5_storage();

    if (storage) {
        userName = localStorage.getItem('ratings-user-name');
    }

    addUserNameChooser();
    addRatingsForUserName();
}