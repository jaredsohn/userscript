// ==UserScript==
// @name          Facebook Lite Spoon
// @namespace     http://userscripts.org/scripts/show/57854
// @description   Removes Ads. Full width. Removes Facebook | from the title and makes the header fixed at the top. Thumbnail previewer. Hotkeys!
// @include       http://lite.facebook.com/*
// @include       https://lite.facebook.com/*
// @author        Marcus Carlsson
// @timestamp     1259840088596
// @version       0.4.6
// ==/UserScript==

/* Copyright (c) 2009, Marcus Carlsson <carlsson.marcus@gmail.com>
 All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the <organization> nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY Marcus Carlsson ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL <copyright holder> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*

CHANGELOG:

0.4.6
* Hotkeys
  - W : Write
  - N : notifications
* Add a list of hotkeys on the configuration menu.

0.4.5
* Hotkeys
  - H : home
  - P : profile
  - E : events
  - I : inbox

0.4.2
* Width option in configuration menu. Default: 80%
* Force update check
* Right padding fixed (.LSplitPage_content, thanks to @dmorrison for pointing that out)

0.4.1
* opt out header padding problem fixed

0.4
* Configuration page
  - Set PreviewPosition, left, right or auto (at cursor). Default: right
  - Automatic updates.
* Automatic updates. Don't miss out ;)

0.3.5
* Updated the script to match the new changes on Facebook Lite
* Added support for "Back to regular facebook"-bar
* Comments width: 100% on album/single image pages

*/

(function () {

var version_timestamp = 1259840088596;

var conf = {
    'PreviewPosition': getValue('PreviewPosition', 'right'),
    'WidthContent': getValue('WidthContent', '80')
}

// Set Value
function setValue(key, value) {
    GM_setValue(key, value);
    conf[key] = value;
}
// Get value
function getValue(key, value) {
    return GM_getValue(key, value);
}

var opts = 'AutoUpdate';
var boolopts = opts.split(',');
for (i=0; i<boolopts.length; i++) {
    bool = true;
    if (boolopts[i].charAt(0) == '!') {
        boolopts[i] = boolopts[i].replace('!', '');
        bool = false;
    }
    conf[boolopts[i]] = getValue(boolopts[i], bool);
}


// Hotkeys
window.addEventListener('keydown', function(e) {
    function toUrl(url) {
        location.href = location.protocol + '//lite.facebook.com' + url;
    }

    if (e.target.type && e.target.type!='checkbox' && e.target.type!='select') {
        return;
    }
    else if (e.shiftKey) {
        switch (e.keyCode) {
            case 72: toUrl('/'); break; // H
            case 73: toUrl('/inbox/'); break; // I
            case 80: location.href = $('navigation').getElementsByTagName('a')[1].href; break; // P
            case 69: toUrl('/events/'); break; // E
            case 87: 
                $$('FN_button-view')[0].style.display = 'none';
                $$('FN_write-view')[0].style.display = 'block';
                $$('FN_fancy-text-area')[0].focus();
                stop(e);
                break; // W
            case 78: toUrl('/notifications/'); break; // N
        }
    }
}, false);


// Check if we're on the main page, then hide the ads
if ($$('LMuffinView', $$('LSplitPage_RightInner')[0])[0]) {
    addStyle(".LSplitPage_Right {display: none;}");
}

// Fixes the width of the page and removes the right-hand bar, also set comments to 100% width
addStyle('#navigation, #content, #footer {width: '+conf['WidthContent']+'%; min-width: 900px;} .FN_feedbackview, .UFIView { width: 100%; }'+
        '.LSplitPage_Content {padding-right: 0}'
);


// Add styles for popup
addStyle(
    '.flsPopupWrap {background: #fff; display: none; color: #000; width: 800px; z-index: 667; position: fixed; top:0;left:0;right:0; padding: 10px; border: 4px solid #f99; margin: 20px auto 0;}'+
    '.flsShadow {background: #000; display: none; z-index: 666; opacity: 0.5; position: fixed; top:0;bottom:0;left:0;right:0;}'+
    '#flsClose {cursor: pointer;}'
);


// Create popup-container and shadow-box
var popupWrap = document.createElement('div');
popupWrap.id = 'flsPopupWrap';
popupWrap.className = 'flsPopupWrap';
document.body.appendChild(popupWrap);
var shadowDiv = document.createElement('div');
shadowDiv.id = 'flsShadow';
shadowDiv.className = 'flsShadow';
document.body.appendChild(shadowDiv);

// Top Bar Positioning
var contentPosition = getPosition($('content'));
// If the users have the "Show switch back to regular facebook"-link active, fix this!
if ($$('optoutHeader')[0]) 
    addStyle('.optoutHeader {position: fixed !important; right: 0; left: 0; z-index:12; padding: 4px 10px;} #header {position:fixed !important; width:100% !important; z-index:12; margin-top: '+getPosition($('header'))[1]+'px;} #content {padding-top:' + contentPosition[1] + 'px;}');
else
    addStyle('#header {position:fixed !important; width:100% !important; z-index:12; margin-top:0;} #content {padding-top:' + contentPosition[1] + 'px;}');


// Viewing photos, set the comments to 100% width and check for browser-resize
function photoComments() {
    var size = ($('contentWrapper').offsetWidth - 625 -80);
    addStyle('.LPhotoListView .LSplitPage_Right, .LPhideoView .LSplitPage_Right {width: '+size+'px;} .LPhotoListView .LSplitPage_Content {width: 605px;} .LPhotoListView .UFIView, .LPhotoListView .LSplitPage_Right .LSplitPage_RightInner, .LPhideoView .UFIView {width: 100%} .LSplitPage_ContentWithNoRightColumn {width: 639px;}');
}
if (document.body.getAttribute('class').match('LPhotoListView') ||
        document.body.getAttribute('class').match('LProfilePhotoPane') || 
        document.body.getAttribute('class').match('LPhideoView')) {
    photoComments();
    window.addEventListener('resize', photoComments, false);
}

//
// Creates a box where the original image is shown when hovering profile thumbnails
//
function showHover(e) {
    var FLSpopup = $('FLSpopup');
    if (!FLSpopup) {
        FLSpopup = document.createElement('div');
        FLSpopup.id = 'FLSpopup';
        addStyle("#FLSpopup {background: #ffffff; position: fixed !important; z-index: 99; border: 1px solid #333333; padding: 5px; display: none;}");
        document.body.appendChild(FLSpopup);
    }
    var image = document.createElement('img');
    if (this.tagName == 'I')
        image.src = this.style.backgroundImage.replace(/url\(([^)]+)\)/i, '$1').replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");
    else
        image.src = this.src.replace(/\/[aqst]([\d_]+)\.jpg/, "/n$1.jpg").replace(/\/([\d_]+)[aqst]\.jpg/, "/$1n.jpg");

    FLSpopup.innerHTML = '';
    FLSpopup.appendChild(image);
    if (conf['PreviewPosition'] == 'auto') {
        FLSpopup.style.removeProperty('right');
        var intY = e.clientY 
        if (window.innerHeight > intY + image.height) {
            FLSpopup.style.top = intY + 5 + 'px';
            FLSpopup.style.left = e.clientX + 5 + 'px';
        }
        else {
            intY = window.innerHeight - image.height - 10 
            FLSpopup.style.top = intY + 'px';
            FLSpopup.style.left = e.clientX + 5 + 'px';
        }
    }
    else if (conf['PreviewPosition'] == 'left') {
        FLSpopup.style.removeProperty('right');
        FLSpopup.style.top = '20px';
        FLSpopup.style.left = '20px';
    }
    else {
        FLSpopup.style.removeProperty('left');
        FLSpopup.style.top = '20px';
        FLSpopup.style.right = '20px';
    }
        
    $('FLSpopup').style.display = 'block';
}

function hideHover() {
    $('FLSpopup').style.display = '';
}

//
// Add mouse-events
//
function mouseEvents() {
    if (document.getElementsByTagName('body')[0].getAttribute('class').match('LHomeStreamView') || document.getElementsByTagName('body')[0].getAttribute('class').match('LProfileView')) {
        var profilephoto = $$('profilePhoto');
        for (i in profilephoto) {
            profilephoto[i].childNodes[0].addEventListener('mouseover', showHover, false);
            profilephoto[i].childNodes[0].addEventListener('mouseout', hideHover, false);
        }
        // Add for attachments
        var attachments = $$('attachmentMedia');
        for (i in attachments) {
            var nodes = attachments[i].childNodes;
            for (n in nodes) {
                nodes[n].childNodes[0].addEventListener('mouseover', showHover, false);
                nodes[n].childNodes[0].addEventListener('mouseout', hideHover, false);
            }
        }           
    }

    // Add for photogallery as well as setting width for comments to 100% and 50% of #content
    if (document.getElementsByTagName('body')[0].getAttribute('class').match('LPhotoListView') || document.getElementsByTagName('body')[0].getAttribute('class').match('LProfilePhotoPane')) {
        var galleryimg = $$('LGridCropView')[0].getElementsByTagName('td');
        for (i in galleryimg) {
            var nodes = galleryimg[i].childNodes;
            for (n in nodes) {
                nodes[n].childNodes[0].addEventListener('mouseover', showHover, false);
                nodes[n].childNodes[0].addEventListener('mouseout', hideHover, false);
            }
        }
    }
}
mouseEvents();
// Reload mouse events if the content change
$('contentWrapper').addEventListener('DOMNodeInserted', mouseEvents, false);

// Remove Facebook from the title
var titleValue = document.title;
document.title = titleValue.replace('Facebook | ', '');

// Get element by id
function $(id,root){return root ? root.getElementById(id) : document.getElementById(id);}

// Get element(s) by class name
function $$(className,root){
    if (document.getElementsByClassName) {
        return root ? root.getElementsByClassName(className) : document.getElementsByClassName(className);
    } else {
        var elms = $x('//*[contains(@class,"'+className+'")]',root);
        var buffer = new Array();
        for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
        return buffer;
    }
}

// XPath
function $x(xpath,root){return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);}

// Add style
function addStyle(css) {
    if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    else if (heads = document.getElementsByTagName('head')) {
        var style = document.createElement('style');
        try { style.innerHTML = css; }
        catch(x) { style.innerText = css; }
        style.type = 'text/css';
        heads[0].appendChild(style);
    }
}

// Get an elements position
function getPosition(elm) {
    var x=0;
    var y=0;
    while (elm != null) {
        x += elm.offsetLeft;
        y += elm.offsetTop;
        elm = elm.offsetParent;
    }
    return Array(x,y);
}

// Open in tab
function openInTab(url) {
    if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
    else { window.open(url); }
}


function xmlhttpRequest(params, callBack) {
    if (typeof GM_xmlhttpRequest !== 'undefined') {
        params['onload'] = callBack;
        return GM_xmlhttpRequest(params);
    }
    return null;
}

// Stop mouse events
function stop(e) {
    if (e.preventDefault)
        e.preventDefault();
    else
        e.returnValue= false;
    return false;
}


// Show popup
function showPopup(content) {
    var popupWrap = $('flsPopupWrap');
    var shadowDiv = $('flsShadow');
    popupWrap.innerHTML = content;
    popupWrap.style.display = 'block';
    shadowDiv.style.display = 'block';
}
function hidePopup() {
    $('flsPopupWrap').style.display = 'none';
    $('flsShadow').style.display = 'none';
}


// Check for new updates - modified to work with this script (originally based on code by Jarett - http://userscripts.org/users/38602) (rewritten by Vaughan - http://userscripts.org/users/biff)
var updateForced;
function updateCheck(forced) {
    if ((forced) || (parseInt(GM_getValue('LastUpdate', '0')) + 172800 <= (new Date().getTime()))) {
        updateForced = forced;
        try { 
            xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/source/57854.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse); 
        }
        catch (err) { if (forced) { alert("An error occurred while checking for updates:\n" + err); } }
    }
}
function handleUpdateResponse(resp) {
    GM_setValue('LastUpdate', new Date().getTime()+'');
    if (resp.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) { 
        if (confirm('There is a new version of Facebook Lite Spoon. Do you want to update?'))
            openInTab('http://userscripts.org/scripts/source/57854.user.js');
    }
    else if (updateForced) { alert("No update is available for Facebook Lite Spoon."); }
}
if (conf['AutoUpdate']) updateCheck(false);


// Register menu command
GM_registerMenuCommand('Configure Facebook Lite Spoon', showMenuConf)
function showMenuConf() {
    showPopup('<h2>Facebook Lite Spoon configuration!</h2>'+
           '<input type="checkbox" id="flscAutoUpdate" '+(conf['AutoUpdate'] ? 'checked' : '')+' /> Fetch new versions automatically (<a id="doUpdate" href="#">Check for updates now</a>)<br />'+
           '<select id="flscPreviewPosition"><option value="left"'+(conf['PreviewPosition'] == 'left' ? ' selected' : '')+'>Left</option><option value="auto"'+(conf['PreviewPosition'] == 'auto' ? ' selected' : '')+'>Auto</option><option value="right"'+(conf['PreviewPosition'] == 'right' ? ' selected' : '')+'>Right</option></select> Previewbox positioning<br />'+
           '<select id="flscWidthContent"><option value="50"'+(conf['WidthContent'] == '50' ? ' selected' : '')+'>50%</option><option value="60"'+(conf['WidthContent'] == '60' ? ' selected' : '')+'>60%</option><option value="70"'+(conf['WidthContent'] == '70' ? ' selected' : '')+'>70%</option><option value="80"'+(conf['WidthContent'] == '80' ? ' selected' : '')+'>80%</option><option value="90"'+(conf['WidthContent'] == '90' ? ' selected' : '')+'>90%</option><option value="100"'+(conf['WidthContent'] == '100' ? ' selected' : '')+'>100%</option></select> Content width.<br /><br />'+
           '<h3 style="margin: 0;">Hotkeys</h3><ul style="list-style-type: disc; margin: 0 0 0 25px;"><li>E - Events</li><li>H - Home</li><li>I - Inbox</li><li>N - Notifications</li><li>P - Profile</li><li>W - Write new status update</li></ul><span style="font-size: 9px;">All Home-keys requires shift+key to work, ie. shift+n for notifications.</span><br />'+
           '<br /><a id="flsClose" href="#">Close</a><br /><span style="font-size: 9px;">Updates are saved automatically.</span>'
    );

    // Look for changes to the script
    for (var i=0; i<boolopts.length; i++) {
        $('flsc'+boolopts[i]).addEventListener('click', function (e) {
            setValue(e.target.id.replace('flsc', ''), e.target.checked);
            conf[e.target.id.replace('flsc', '')] = e.target.checked;
        }, false);
    }
    $('flscPreviewPosition').addEventListener('change', function (e) {
        setValue(e.target.id.replace('flsc', ''), e.target.value);
        conf[e.target.id.replace('flsc', '')] = e.target.value;
    }, false);
    $('flscWidthContent').addEventListener('change', function (e) {
        setValue(e.target.id.replace('flsc', ''), e.target.value);
        conf[e.target.id.replace('flsc', '')] = e.target.value;
        $('navigation').style.width = $('content').style.width = $('footer').style.width = e.target.value+'%';
    }, false);
    $('doUpdate').addEventListener('click', function (e) { stop(e); updateCheck(true) }, false);
    $('flsClose').addEventListener('click', function (e) { stop(e); hidePopup() }, false);
}

}) ();
