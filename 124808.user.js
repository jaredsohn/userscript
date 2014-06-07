// ==UserScript==
//
// @name          Auto redirect

// @namespace     http://*

// @description   A basic example of Greasemonkey that causes an alert at each page load.

// @include       *  
//
// ==/UserScript==
function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}





if(parent.location == window.location && document.title=="Web Gateway - Notification") {
var get_params = new Object();
var params = {'u':window.location,'encodeURL':'checked'};
post_to_url("http://www.lartoon.com/includes/process.php?action=update",params)
}
