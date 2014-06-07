// ==UserScript==
// @name        Jira toggle detail view width
// @namespace   sockmonkeydev
// @include     https://*.atlassian.net/secure/RapidBoard.jspa*
// @version     1
// ==/UserScript==
var wideDetail = false;
setTimeout(function() {
    var btn=document.createElement("a");
    var t=document.createTextNode("Expand Detail View");
    btn.appendChild(t);

    btn.setAttribute('href', '#');
    btn.setAttribute('title', 'Toggle width of detail panel.');
    btn.setAttribute('class', 'js-quickfilter-button');
    var detailDiv = document.getElementById('ghx-detail-view');
    btn.onclick=function(){
        if (wideDetail) {            
            btn.className = btn.className.replace(/\bghx-active\b/,'').trim();
            detailDiv.style.width = '25%';
            wideDetail = false;
        } else {
            btn.className = btn.className + " ghx-active"
            detailDiv.style.width = '50%';
            wideDetail = true;
        }
    };
    var dd=document.createElement("dd");
    dd.appendChild(btn);

    document.getElementById('ghx-controls-plan').firstChild.appendChild(dd);
}, 2000);
