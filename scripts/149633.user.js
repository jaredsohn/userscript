// ==UserScript==
// @name           ASU Guest Auto Login
// @version        1.1
// @namespace      http://userscripts.org/users/429638
// @author         Greg Littlefield
// @description    Automatically logs you in to the "asu guest" network, instead of having to click the login button and deal with that stupid popup.
// @include        https://mainguestcas.asu.edu/auth/perfigo_weblogin.jsp*
// ==/UserScript==

// Set up an overlay output container, and fall back to window.alert if the DOM manipulation goes wrong
var error = function(errStr) {
    alert(errStr);
};
var message = function(msgStr) {
    alert(msgStr);
};
var output, outputText;
try {
    output = document.createElement('div');
    document.body.appendChild(output);
    output.innerHTML =
    '<div style="position:fixed; z-index:99999999; left:0; top:0; height:100%; width:100%; display:table;">' + 
        '<p style="' +
            'display: table-cell;     vertical-align: middle;     text-align: center;' +
            'background: rgba(0,0,0,.5);' +
            'color: white;' +
            'font: 48px arial,sans-serif;' +
            'font-weight: bold;' +
            'text-shadow: 1px 1px 5px rgba(0,0,0,.8);' + 
            'padding: 50px' + 
        '">' +
            'Auto Signing in to ASU Guest...' + 
        '</p>' +
    '</div>';
    outputText = output.firstChild.firstChild;
    
    error = function(errStr) {
        outputText.innerHTML = errStr;
        // Modal behavior
        output.style.cursor = 'pointer'
        output.onclick = function() {
            output && output.parentNode.removeChild(output);
        }.bind(this);
    }.bind(this);
        
    message = function(msgStr) {
        outputText = msgStr;
    }.bind(this);
    
} catch(e) {}
// Nothing should throw an error, but we should let the user know if something went wrong
try {
    // Get the url form the params that were trying to go to before it redirected us
    urlMatches = location.search.match(/uri=([^&]*)/);
    var nextUrl = urlMatches && unescape(urlMatches[1]);

    // Wait for jQuery to set up the form
    var waitUntilPageLoaded = function() {
        // Build our request from the form they have
        var form = document.getElementsByName('loginform')[0]
        if (form) {
            var method = form.method.toUpperCase();
            var url = form.action;
            var params = '';
            // Use the forEach iterator in Array.prototype to iterate over the input tags (NodeList is not technically an Array)
            //   and use their name, vale pairs to construct the params
            Array.prototype.forEach.call(form.getElementsByTagName('input'), function(input) { 
                    params += escape(input.name) + '=' + escape(input.value) + '&';
                }
            );

            // Use AJAX to make the request, since we don't want the response page we get back to open a new window and stuff
            var http = new XMLHttpRequest();

            http.open(method, url, true);

            // Send the proper header information along with the request
            http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            http.setRequestHeader("Content-length", params.length);
            http.setRequestHeader("Connection", "close");

            // Listen for when the state changes.
            http.onreadystatechange = function() {
                if (outputText) {
                    // Output a '.' so they know it's working
                    outputText.innerHTML += '.';
                }
                // Check to see if the response is ready
                if (http.readyState == 4) {
                    // Check to see if the request was successful
                    if (http.status == 200) {
                        // Parse the response page to check if the login was successful
                        if (http.responseText.indexOf('You have been successfully logged on the network.') == -1) {
                            error("Looks like ASU Guest changed its login page. You should contact Greg Littlefield and he'll fix it for you.");
                        } else {
                            if (nextUrl) {
                                window.location.replace(nextUrl);
                            } else {
                                message('Successfully signed in to ASU Guest.');
                            }
                        }
                    } else {
                        error('There was an error connecting to the server. Check your internet connection and refresh to try again.');
                    }
                }
            }.bind(this);

            // Make the actual request
            http.send(params);
        } else {
           window.setTimeout(waitUntilPageLoaded, 500);
        }
    }.bind(this);
    waitUntilPageLoaded();
} catch(e) {
    error("An error occured somewhere in the auto login script. Contact Greg Littlefield and he'll fix it for you.");
} 
