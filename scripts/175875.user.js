// ==UserScript==
// @name            Unpublished-Geocaches
// @namespace       http://www.geocaching.com
// @description     Fetch unpublished geocaches
// @include         http://www.geocaching.com/geocache/*
// @updateURL       http://unpublished.vaguelibre.net/unpublished.user.js
// @version         1.1
// @grant           GM_xmlhttpRequest
// ==/UserScript==


var d = document.getElementById('Download');
var m = d.children;
var last = m.item(m.length - 1);

var html = '<br /><input type="button" name="SendToUnpublishedGeocaches" value="Send to unpublished geocaches" id="SendToUnpublishedGeocaches" />';
last.innerHTML = last.innerHTML + html;

var button = document.getElementById("SendToUnpublishedGeocaches");

button.addEventListener('click', function() {
    GM_xmlhttpRequest({
    method: "POST",
    url: "http://unpublished.vaguelibre.net/gm.php",
    data: "content=" + encodeURIComponent(document.documentElement.innerHTML),
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    onload: function(response) {
        var data = JSON.parse(response.responseText);
        if(!data.success) {
            alert(data.message);
            return false;
        }
        alert('Geocache added to your list!');
        return true;
    }
});
}, true);