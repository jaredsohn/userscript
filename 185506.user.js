// ==UserScript==
// @name        Anti JS Redirector
// @namespace   antijsredirector
// @description English: Remove Javascript redirections. Español: Elimina redirecciones en Javascript
// @include     http*
// @version     0.1
// @run-at      document-start
// @icon        data:image/png;base64,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
// ==/UserScript==

//Based in http://userscripts.org/guides/471
var changed = false; // script need to be edited with
var redirector = /[\s\t]*if[\n\s\t]*\([a-z0-9$_()\.\n\s\t]+===?[a-z0-9$_()\.\n\s\t]+\)[\n\s\t]*{?[\n\s\t]*(top|window|self|document)[\n\s\t]*\.[\n\s\t]*location[\n\s\t]*=[\n\s\t]*['"](https?:\/\/[^'"]+)['"];?[\n\s\t]*}?/i;
var escaped_content = /unescape[\n\s\t]*\(['"]([^'"]+)['"]\)/i;
var encoded = false;
var scripts = Array();
var link_avoided = ""
var user_lang = navigator.userLanguage || navigator.language;
show_message_interval = null;
var i18n = {"en": 'Redirect to <a href="$1">$1</a> blocked',
"es": 'Se bloqueo un intento de redirección hacia <a href="$1">$1</a>'};
if (!i18n[user_lang]) { i18n[user_lang] = i18n["en"]; }
    
function del_element(){
    var trash = ["notif-decoration", "notif"];
    for(i=0; i < trash.length; i++){
        var element = document.getElementById(trash[i]);
        if (element){
            var ancestry = element.parentNode;
            ancestry.removeChild(element);
        }
    }
}

// When a redirection is blocked, this is what the user will see at the top of 
// the page (based on the notification of browser-update.org)
function show_message(){
    document.body.innerHTML += '<style id="notif-decoration">\
    .notif {\
        background: url("data:image/png;base64,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") no-repeat scroll 10px center #FDF2AB;\
        border-bottom: 1px solid #A29330;\
        color: #000000;\
        font-family: Arial,Helvetica,sans-serif;\
        font-size: 12px;\
        left: 0;\
        position: fixed;\
        text-align: left;\
        top: 0;\
        width: 100%;\
        z-index: 1111;\
    }\
    .notif div {\
        padding: 5px 36px 20px 50px;\
    }\
    #notifclose {\
        font-size: 14px;\
        font-weight: bold;\
        height: 20px;\
        padding: 0;\
        position: absolute;\
        right: 0.5em;\
        top: 0.2em;\
        width: 12px;\
        background-color: #FF0000;\
        color: #ffffff;\
        text-align: center;\
		cursor: pointer;\
    }\
    </style>\
    <div id="notif" class="notif"><div>' + i18n[user_lang].replace(/\$1/g, link_avoided) + '<div id="notifclose">X</div></div></div>';
    // Add click event in notifclose
    var notifclose = document.getElementById("notifclose");
    if (notifclose.addEventListener) {
        notifclose.addEventListener("click", del_element, false); }
    else { notifclose.attachEvent("onclick", del_element); } //Internet Explorer
    setTimeout(del_element,15000);
}

window.addEventListener('beforescriptexecute', function(e) {
    var html = e.target.innerHTML;
	if (scripts.indexOf(e.target) != -1) { return; } 
    if(html.search(escaped_content) != -1) {
        var original = eval(html.match(escaped_content)[0]);
        if(original.search(redirector) != -1) { encoded = true; }
    }

    if(html.search(redirector) != -1 || encoded == true){
        changed = true;
        e.stopPropagation();
        e.preventDefault();
        var redirection_code = html.match(redirector) || original.match(redirector);
        link_avoided = redirection_code[2];
        if (/{[\n\s\t]*.*?[\n\s\t]*}/gi.test(redirection_code[0]) == false){
            redirection_code[0] = redirection_code[0].replace(/{/, '');
            }
        if (encoded == true){
            original = original.replace(redirection_code[0], '');
            html = html.replace(escaped_content, 'unescape("'+ escape(original) + '")');
        }
        else { html = html.replace(redirection_code[0], ''); }
		// We add a new <script> tag (to run the modified content after removing that
		// coincides with the "redirector" pattern) and remove the current element
		document.head.appendChild(document.createElement('script')).innerHTML = html;
		var ancestry = e.target.parentNode;
        ancestry.removeChild(e.target);
    }
	else { scripts.push(e.target); }

    ///when done, remove the listener and warns the user about the site that avoid going
    if(changed == true){
        window.removeEventListener(e.type, arguments.callee, true);
        var show_message_interval = window.setInterval(function(){
            if (document.body != null) {
                show_message();
                clearInterval(show_message_interval);
            }
        }, 500);
    }

}, true);


