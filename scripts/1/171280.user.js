// ==UserScript==
// @name        FogBugz and Trello integration
// @include     http://fogbugz.skyscanner.co.uk/default.asp*
// @version     1
// ==/UserScript==

var KEY = "";
var TOKEN = "";
var MEMBER_ID = "";

var title = document.getElementsByClassName('content title')[0].textContent;
var label = document.getElementsByClassName('content subtitle')[0].firstChild.textContent;
var bugzID = location.search.slice(1);

var labels = {
    "SD Indexing": "yellow",
    "SD Commercial": "orange",
    "SD Coverage": "green"
};

var lists = {
    "Working On": "51b5abb363b35abf58003c7d",
    "To Pick Up": "51b5abb363b35abf58003c7c",
    "Fixing": "51b5ac5da03c5d2049006e9e",
    "Testing (In Progress)": "51b5abb363b35abf58003c7e",
    "Testing (To Pick Up)": "51b6089504d88c2d14005381",
    "Blocked": "51b88f95462e37db6700086e"
};

var data = "{ \
    'name': '" + bugzID + ' ' + title + "', \
    'pos': 'top', \
    'labels': ['" + labels[label] + "'], \
    'due': 'null', \
    'key': '" + KEY + "', \
    'token': '" + TOKEN + "', \
    'fogbugz': '" + bugzID + "' \
}";

var sidebar = document.getElementById("bugviewContainerSide");

var div = document.createElement("div");
div.setAttribute("id", "trello")

var label = document.createElement("label");
label.textContent = "Trello";

var select = document.createElement("select");
select.setAttribute("class", "content");
select.setAttribute("style", "visibility:visible; width:100%;padding:0;")
select.setAttribute("id", "listSelect");
for (var key in lists) {
    var opt = document.createElement("option");
    opt.setAttribute("value", lists[key]);
    opt.textContent = key;
    select.appendChild(opt);
}

var check = document.createElement("input");
check.setAttribute("id", "add_me");
check.setAttribute("class", "content");
check.setAttribute("type", "checkbox");
check.setAttribute("checked", true);
var check_desc = document.createElement("span");
check_desc.textContent = "Add me";

var link = document.createElement("a");
link.setAttribute("id", "trello_link");
link.setAttribute("class", "content");
link.setAttribute("href", "#");
link.setAttribute("onclick", "createCard(" + data + ");");
link.textContent = "Create a card";
div.appendChild(label);
div.appendChild(select);
div.appendChild(check);
div.appendChild(check_desc);
div.appendChild(link);
var top_element = document.getElementById("sidebar_priority_-1");
sidebar.insertBefore(div, top_element);

var script = document.createElement("script");
script.innerHTML = " \
function createParams(data) { \
    var params = ''; \
    for (var d in data) { \
        params += d + '=' + encodeURI(data[d]) + '&'; \
    } \
    return params.slice(0, -1); \
} \
 \
function createCard(data) { \
    if (document.getElementById('add_me').checked) { \
        data['idMembers'] = ['" + MEMBER_ID + "']; \
    } \
    data['idList'] = document.getElementById('listSelect').value; \
    var params = createParams(data); \
    console.log(data['labels']); \
 \
    var req = new XMLHttpRequest(); \
    req.onload = function() { \
        if (req.status == 200) { \
            div = document.getElementById('trello'); \
            div.removeChild(document.getElementById('trello_link')); \
            var par = document.createElement('p'); \
            par.textContent = 'Adding FogBugz link...'; \
            div.appendChild(par); \
            var cardID = JSON.parse(req.responseText)['id']; \
            postFogBugzLink(data, cardID, par); \
        } \
    }; \
    req.open('POST', 'https://trello.com/1/cards?' + params, true); \
    req.send(); \
} \
 \
function postFogBugzLink(data, cardID, par) { \
    var ndata = { \
        'text': 'http://fogbugz.skyscanner.co.uk/default.asp?' + data['fogbugz'], \
        'key': data['key'], \
        'token': data['token'] \
    }; \
 \
    var params = createParams(ndata); \
 \
    var req = new XMLHttpRequest(); \
    req.onload = function() { \
        if (req.status == 200) { \
            par.textContent = 'Success!'; \
        } \
    }; \
    req.open('POST', 'https://trello.com/1/cards/' + cardID + '/actions/comments?' + params, true); \
    req.send(); \
}";
document.body.appendChild(script);