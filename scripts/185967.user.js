// ==UserScript==

// @name        Paperbag
// @namespace   global
// @include     https://www.facebook.com/*
// @description Encrypts Facebook conversations by using the CryptoJS library.
// @version     0.3.1
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QwZDBgtREttDQAABRZJREFUWMO9lltsVFUUhv+19zlz5j6dTsd2gFqpYIVSFTFyERCJVhKJKcGEaGIwVhKNxhBiNMEEH0yICX0URZ9MfODJeOHNRNFgSHxBIlpEgxSkl8B0ZjpzZs59Lx9aqpFeOC1xPZ6zzv6/s9fe61+E2xwv9G169P572ne05TNdhVzm0LYXj/wyV762WMGBN/akr5cqfe1tuT3ZdGJbW0vGEIJEqWLSqTO/ZwE8dtsA1q66M7uhpzNbaMncRYJ6W3Ppp5JxY83aVe3QhACD4QcKo8UJuK7vb13XtXS+NecFOP3Jm7HPTp7tbU4nHkklog+lEtGeZDza0pxJQEoCGCAiuL4PIkKl2sBE1QKDfy3X6lsXC0BffP/zT+t7OtuTCSMe0TRIKQAwmAFmQEqBy8PjuDR8nR3Xw0TNgqbJoY4luf6+149WFwWw9+lNR6+Xa10N20VLNgkAYGYAgFIKpWoD5/64yuNlE8l4FF3L22hF+x24dLWom5Zt3UpZZwV4fOPq1qZU7OXR4gQPDRfRsSRHjuuhXG2galqo1Bqo1m3OZ1O0oacTTek4fF8hUAr55uQyd8xbD2BwPgA524sta+9+iYR4UpAgy3FRLJsoVkxiBmLRCJbmm9C9YikV8k3QNAk/UNO7I6WA7Xqxh7uXH//mx/O8kB0gEqLXrNtYviyPfDZFKztaIaWAFAQimioDA7h5fSkEIrrW217I5gBcmwtAzPRw3+4tnQC6hCBk0wk8uLoDRkSDJsW0+FzBzMhm4hivmPvny50RoKPQ4jWl4j4AXB4tsuN6oRuUoetIJeOvLgjA9fxACuELQag3HBTLZmgApRQKLZn00YPPPRMaQLFSDFbxqEEN28X1co3DAjAAI6Ih15TcGRrA91XAjMCIaIhoEkMjRQ6UWpBX6Jq8LzSAFwSKmRUzEI8ZNDxWhmW5CwKIx4z0e/t3t4YCYIYCEEz9ATRN4sxvV1iTMnQh4omEse6B7kwoAMdxFQAFAEIQjIiGKyPjsB0Xt3ALJxuJkGAZ41LF1H3bTIQtgc8Mf2o3oGmSooaO83+OQgoxhyoBICgIWI7LDXOCUjFNi0gyQgHEjIgimtwBZkYQBGAGroyV2HH9GXX5Bi0AqABRXVIyZkAI8kmQFQogGY8GN86AYobteNywXVaKcWWsNN0NJ39YoG65CAI1XXchaPoqAvAUcziAlR35gIj8fxqTQtTQyfMDVOs2MwgQOhwfaDQsJGIGNDlzaQKl/AuXxhqhAPa+PaB0KaYvvqYJGBFt0oiEDp8Fu64NXTAS8ei0C84UluN55y78FQ6AqEWByAUAVoxkLAoxdcDqpgkELkU0CSKaU5wIKFdMr5DLhAMAANOyKwAgpEBEl1NFBxzPo7lE/xvFill/56MTdmiAwYsjQ8xgQQSlFHhSH47rT80Bc4cfKG+8Yn5l6NquBY1k4xVzhAgCAAfMqFVNbs4kyXF9VsxztiPPD4qlSv3As299/OmCR7LxauNiKm48kc+mlmhSQpOSXM8HM2NlRyvp2qyf/uA4/rbdBz44vaihNPCD8tenB9clopEP2wu5ffqkEbBle7MdvDqAw9v7Bw6HcQsxX8Ln3559RSn1GoCqFIJqDRt+cJM1nwKwM6z4LQEAwPvHTx6L6HK75bhDluNQrW7/25QOAti1vX/gu4XYNYVJ3rd7S+5aqXZix+Y1G+9dXigxc9/2/oFT+D9j5+bu1LFDzx8Z/PLdxO1Y728PY0Hm3n7K1wAAAABJRU5ErkJggg==
// @grant       GM_setValue
// @grant       GM_getValue

// Hash algorithms:
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha512.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/ripemd160.js

// Cipher algorithms:
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/tripledes.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/rabbit.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/rc4.js

// Block modes:
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/mode-cfb.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/mode-ctr.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/mode-ofb.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/mode-ecb.js

// Padding schemes:
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/pad-iso97971.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/pad-ansix923.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/pad-iso10126.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/pad-zeropadding.js
// @require     http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/pad-nopadding.js

// ==/UserScript==

var MY_TITLE = "Paperbag 0.3.1";
var DEFAULT = [false, "<c>","1234567890","-","AES", "CBC", "Pkcs7"];
var NULL = [false, "","","-","AES", "CBC", "Pkcs7"];

var frame;
var body;
var titlebar;
var select;
var rows = [];

var settings = {};
var converBoxes = {};
var inbox = [];
var inboxView = false;

var frameHeight = "264px";
var frameWidthMin = "112px";
var frameWidthMax = "332px";
var bodyHeight = "222px";

var indicatingBorder = "1px solid rgba(255, 0, 0, .5)";

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var conversationObserver = new MutationObserver(function(mutations) {
    conversationObserver.disconnect();
    var n = mutations[0].target;
    while ( n.className != "conversation" ) n = n.parentNode;
    var user;
    for ( u in converBoxes ) {
        if ( converBoxes[u][1] == n ) {
            if ( settings[u][0] ) decryptConversation(u, false);
            break;
        }
    }
    refresh();
});

function decryptConversation(user, onlyInboxView) {
	if ( converBoxes[user] != null && !onlyInboxView ) {
		var msgs = converBoxes[user][1].getElementsByClassName("null");
		for ( var i = 0 ; i < msgs.length ; i ++ ) {
			msgs[i].innerHTML = decrypt( settings[user][1],
										 hash(settings[user][3], settings[user][2]),
										 settings[user][4],
										 settings[user][5],
										 settings[user][6],
										 msgs[i].innerHTML );
		}
	}
	if ( inboxView && 
		 document.getElementById("webMessengerHeaderName").getElementsByTagName("a")[0].innerHTML == user ) {
		 var ps = inbox[1].getElementsByTagName("p");
		 for ( var i = 0 ; i < ps.length ; i ++ ) {
			ps[i].innerHTML =  decrypt( settings[user][1],
									hash(settings[user][3], settings[user][2]),
									settings[user][4],
									settings[user][5],
									settings[user][6],
									ps[i].innerHTML );
		 }
	}
}

/**
    children == null                : textfield
    typeof children == "boolean"    : checkbox
    typeof children == "object" &&
    children != null                : select
*/
function Row(text, text_width, padding, text_paddingTop, children) {
	if ( typeof Row.i == 'undefined' ) Row.i = 0;
    else Row.i ++;
    this.row = document.createElement("div");
    this.row.style.padding = padding;
    this.row.style.fontFamily = "Tahoma";
    this.row.style.fontSize = "11px";
    var text_div = document.createElement("div");
    text_div.style.cssFloat = "left";
    text_div.appendChild(document.createTextNode(text));
    text_div.style.width = text_width;
    text_div.style.paddingTop = text_paddingTop == null ? "0px" : text_paddingTop;
    this.input = document.createElement( ( children == null || typeof children == "boolean" ) ? "input" : "select" );
    this.input.setAttribute("i", Row.i);
    var input = this.input;
    if ( typeof children == "object" ) {
        this.input.style.width = "calc(100% - " + text_width + ")";
        this.input.style.borderStyle = "none none solid none";
        this.input.style.borderWidth = "1px";
        this.input.style.borderColor = "#aaa";
		var transparent_bg = "rgba(0,0,0,0)";
		this.input.style.background = transparent_bg;
		var transition = "background 100ms";
		this.input.style.transition = transition;
		this.input.style.MozTransition = transition;
		this.input.style.WebkitTransition = transition;
		this.input.onmouseover = function() { input.style.background = "rgba(255,255,255,.6)"; }
		this.input.onmouseout = function() { input.style.background = transparent_bg; }
        if ( children != null ) {
            for ( var i = 0 ; i < children.length ; i ++ ) {
                var new_option = document.createElement("option");
                new_option.appendChild( document.createTextNode(children[i]) );
                this.input.appendChild(new_option);
            }
		}
    } else {
        this.input.type = "checkbox";
        text_div.style.marginTop = "3px";
    }
    this.input.onchange = function(e) { 
        if ( input.value == "" ) {
            input.value = settings[ select.value ][ input.getAttribute("i") ];
            alert("Constraint: value != null");
        } else storeValue(input);
    }
    this.row.appendChild(text_div);
    this.row.appendChild(this.input);
}

window.onload = function() {   
	inboxView = window.location.href.indexOf("/messages/") >= 0;
    if ( inboxView ) {
		var listObserver = new MutationObserver(function(mutations) { refresh(); });
		listObserver.observe( document.getElementById("wmMasterViewThreadlist") , { childList: true } );
		var headerName = document.getElementById("webMessengerHeaderName");
		var headerObserver = new MutationObserver(function(mutations) {
			var user = headerName.getElementsByTagName("a")[0].innerHTML;
			toggle(
				settings[user][0],
				user
			);
		});
		headerObserver.observe( headerName , { childList: true, subtree: true } );		
		inbox[0] = document.getElementsByName("message_body")[0];
		inbox[1] = document.getElementById("webMessengerRecentMessages");
		var msgObserver = new MutationObserver(function(mutations) {
			if ( converBoxes[user] == null ) {
				msgObserver.disconnect();
				decryptConversation(headerName.getElementsByTagName("a")[0].innerHTML, true);
				msgObserver.observe( inbox[1] , { childList: true } );
			}
		});
	}
    
    if ( GM_getValue( MY_TITLE ) != null ) 
        settings = JSON.parse(GM_getValue( MY_TITLE ));

    frame = document.createElement("div");
    frame.className = "fbNub fbNubFlyout fbNubFlyoutOuter fbNubFlyoutInner";
    frame.style.position = "fixed";
    frame.style.width = frameWidthMax;
    frame.style.height = frameHeight;
    frame.style.left = GM_getValue(MY_TITLE + ":FL") == null ? "150px" : GM_getValue(MY_TITLE + ":FL");
    frame.style.top = GM_getValue(MY_TITLE + ":FT") == null ? "150px" : GM_getValue(MY_TITLE + ":FT");
    frame.style.zIndex = 100;
    
    titlebar = document.createElement("div");
    titlebar.className = "clearfix titlebarLabel fbNubFlyoutTitlebar";
    var titlebarLabel = document.createElement("div");
    titlebarLabel.className = "titlebarLabel clearfix";
    var titlebarTextWrapper = document.createElement("h4");
    titlebarTextWrapper.className = "titlebarTextWrapper";
    var titlebarText = document.createElement("span");
    titlebarText.className = "titlebarText";
    titlebarText.style.fontFamily = "Verdana";
    titlebarText.style.color = "#fff";
    titlebarText.appendChild(document.createTextNode(MY_TITLE));
    titlebarTextWrapper.appendChild(titlebarText);
    titlebarLabel.appendChild(titlebarTextWrapper);
    titlebar.appendChild(titlebarLabel);
    
    body = document.createElement("div");
    body.className = "fbNubFlyoutBody scrollable fbNubFlyoutBodyContent";
    body.style.padding = "8px";
    body.style.height = bodyHeight;
	body.style.backgroundImage = "url('data:image/png;base64,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')";
    
    select = document.createElement("select");
    select.style.width = "100%";
    select.style.fontWeight = "bold";
    select.onchange = function() { showValues(settings[select.value]); }
    
    var text_width = "100px";
    var padding = "3px";
    var text_paddingTop = "3px";
    var id_start = "pbin_";
 
    var i = 0;
    rows[i] = new Row("Enabled:", text_width, "6px " + padding + " " + padding + " " + padding, null, false);
    rows[i].input.onchange = function() { 
        storeValue(this);
		toggle(this.checked, select.value);
    }
    i ++;
    rows[i++] = new Row("Tag:", text_width, padding, null, null);
    rows[i++] = new Row("Passphrase:", text_width, padding, null, null);
    rows[i++] = new Row("Hash algorithm:", text_width, padding, text_paddingTop, 
        ["-", "MD5", "SHA1", "SHA256", "SHA512", "RIPEMD160"] );
    rows[i++] = new Row("Cipher algorithm:", text_width, padding, text_paddingTop, 
        ["AES", "DES", "TripleDES", "Rabbit", "RC4", "RC4Drop"] );
    rows[i++] = new Row("Block mode:", text_width, padding, text_paddingTop, 
        ["CBC", "CBF", "CTR", "OFB", "ECB"] );
    rows[i] = new Row("Padding scheme:", text_width, padding, text_paddingTop, 
        ["Pkcs7", "Iso97971", "AnsiX923", "Iso10126", "ZeroPadding", "NoPadding"] );
            
    var save_btn = document.createElement("button");
    save_btn.className = "uiButton uiButtonConfirm";
    save_btn.style.color = "#fff";
    save_btn.style.cssFloat = "right";
    save_btn.style.marginTop = "7px";
    save_btn.appendChild( document.createTextNode("Save") );
    save_btn.style.marginRight = "5px";
    save_btn.onclick = function() { 
        GM_setValue( MY_TITLE, JSON.stringify( settings ) ); 
    }

    var cancel_btn = document.createElement("button");
    cancel_btn.className = "uiButton";
    cancel_btn.style.cssFloat = "right";
    cancel_btn.style.marginTop = "7px";
    cancel_btn.appendChild( document.createTextNode("Cancel") );
    cancel_btn.onclick = function() {     
        if ( GM_getValue( MY_TITLE ) != null ) settings = JSON.parse(GM_getValue( MY_TITLE ));
        else settings = {};
        refresh();
        showValues(settings[ select.value ]);
    }

    body.appendChild(select);
    for ( var i = 0 ; i < rows.length ; i ++ ) 
        body.appendChild(rows[i].row);
    body.appendChild(cancel_btn);
    body.appendChild(save_btn);
    frame.appendChild(titlebar);
    frame.appendChild(body);
    
    if ( GM_getValue(MY_TITLE + ":FM") != null ) 
		resizeFrame(GM_getValue(MY_TITLE + ":FM"));

    var group = document.getElementById("ChatTabsPagelet").getElementsByClassName("fbNubGroup")[0].getElementsByClassName("fbNubGroup")[0];
    var observer = new MutationObserver(function(mutations) { refresh(); });
    observer.observe(group, { childList: true } );
    
    titlebar.addEventListener('mousedown', mouseDown, false);
    titlebar.addEventListener('mouseup', mouseUp, false);
    
    refresh();
    
    document.addEventListener('keydown', keyListener, true);    
    document.getElementsByTagName("html")[0].appendChild(frame);
    
}

function toggle(visible, user) {
	if ( visible ) {
		if ( converBoxes[user] != null ) {
			converBoxes[user][0].style.borderLeft = indicatingBorder;
			converBoxes[user][0].style.paddingLeft = "4px";
		}
		if ( inboxView && 
			 document.getElementById("webMessengerHeaderName").getElementsByTagName("a")[0].innerHTML == user ) {
			inbox[0].style.borderLeft = indicatingBorder;
			inbox[0].style.paddingLeft = "4px";
		}
		decryptConversation(user, false);
	} else {
		if ( converBoxes[user] != null ) {
			converBoxes[user][0].style.borderLeft = "none";
			converBoxes[user][0].style.paddingLeft = "0px";
		}
		if ( inboxView && 
			 document.getElementById("webMessengerHeaderName").getElementsByTagName("a")[0].innerHTML == user ) {
			inbox[0].style.borderLeft = "none";
			inbox[0].style.paddingLeft = "0px";
		}
	}
}

function showValues(values) {
	if ( values != null ) {
		for ( var i = 0 ; i < values.length ; i ++ ) {
			var element = rows[i].input;
			if ( element.type == "checkbox" ) element.checked = values[i];
			else element.value = values[i];
		}
	}
}

function storeValue(element) {
    if ( element.type == "checkbox" ) 
		settings[ select.value ][ parseInt( element.getAttribute("i") ) ] = element.checked;
    else 
		settings[ select.value ][ parseInt( element.getAttribute("i") ) ] = element.value;
}

function keyListener(evt) {
    var target = evt.target;
    if ( evt.keyCode == 13 ) {
        if ( target.tagName == "TEXTAREA" ) {
			if ( inboxView && target == inbox[0] ) {
				var user = document.getElementById("webMessengerHeaderName").getElementsByTagName("a")[0].innerHTML;
				if ( settings[user][0] && inbox[0].value != "" ) {
					inbox[0].value = encrypt(settings[user][1], 
											 hash(settings[user][3], settings[user][2]),
											 settings[user][4],
											 settings[user][5],
											 settings[user][6],
											 inbox[0].value);
				}
			} else {
				for ( user in converBoxes ) {
					if ( converBoxes[user][0] == target ) {
						if ( settings[user][0] && converBoxes[user][0].value != "" ) {
						   converBoxes[user][0].value = encrypt(settings[user][1], 
																  hash(settings[user][3], settings[user][2]),
																  settings[user][4],
																  settings[user][5],
																  settings[user][6],
																  converBoxes[user][0].value);
						}
						break;
					}
				}
			}
        }
    }
}

function refresh() {
    conversationObserver.disconnect();
    converBoxes = {};
    var initial_value = select.value;
    while (select.firstChild) select.removeChild(select.firstChild);
    var f = document.getElementsByClassName("fbNubFlyoutInner");
    for ( n in f ) {
        if ( f[n].tagName == "DIV" ) {
            var t = f[n].getElementsByClassName("titlebarText");
            if ( t.length > 0 ) {
                var title = t[0].innerHTML;
                if ( title != MY_TITLE ) {
                    var newOption = document.createElement("option");
                    newOption.innerHTML = title;
                    select.appendChild(newOption);
                    converBoxes[title] = [];
                    converBoxes[title][0] = f[n].getElementsByTagName("textarea")[0];
                    converBoxes[title][1] = f[n].getElementsByClassName("conversation")[0];
                    if ( settings[title] == null ) settings[title] = DEFAULT.slice(0);
					toggle(settings[title][0], title);
                    conversationObserver.observe(converBoxes[title][1], { childList: true, subtree: true } );
                }
            }
        }
    }
	if ( inboxView ) {
		var inbox_users = document.getElementById("wmMasterViewThreadlist").getElementsByClassName("accessible_elem");
		for ( var i = 0 ; i < inbox_users.length ; i ++ )  {
			var user = inbox_users[i].innerHTML;
			if ( converBoxes[user] == null ) {
                if ( settings[user] == null ) settings[user] = DEFAULT.slice(0);
				var newOption = document.createElement("option");
				newOption.innerHTML = user;
				select.appendChild(newOption);
				toggle(settings[user][0], user);
			}
		}
	}
    if ( select.value == "" ) {
        showValues(NULL);
        for ( var i = 0 ; i < rows.length ; i ++ )
            rows[i].input.disabled = true;
    } else if ( rows[0].input.disabled == true ) {
        for ( var i = 0 ; i < rows.length ; i ++ )
            rows[i].input.disabled = false;
    }
    if ( select.value != initial_value ) {
        select.value = initial_value;
        if ( select.value != initial_value ) 
            showValues(settings[select.value]);
    }
}

function hash(hash_alg, text) {
    if ( hash_alg == "-" ) return text;
    else {
        var f = CryptoJS[hash_alg];
        return f(text).toString();
    }
}

function encrypt(tag, key, cipher_alg, mode, padding, text) {
    var s = escape(text);
    var mode_pad = { mode: CryptoJS.mode[mode], padding: CryptoJS.pad[padding] };
    var encrypted = CryptoJS[cipher_alg].encrypt(s, key, mode_pad).toString();
    return tag + encrypted;
}

function decrypt(tag, key, cipher_alg, mode, padding, text) {
    var s = htmlspecialchars_decode(text);
    if ( s.indexOf(tag) == 0 ) {
        s = s.substring(tag.length);
        var mode_pad = { mode: CryptoJS.mode[mode], padding: CryptoJS.pad[padding] };
        var decrypted = CryptoJS[cipher_alg].decrypt(s, key, mode_pad).toString();
        return unescape( htmlspecialchars( hex2a(decrypted) ) );
    } else return text;
}

var mouseLeft;
var mouseTop;
var frameLeft;
var frameTop;

function resizeFrame( maximize ) {
        body.style.display = maximize ? "block" : "none";
        frame.style.width = maximize ? frameWidthMax : frameWidthMin;
        frame.style.height = maximize ? frameHeight : ( titlebar.offsetHeight + "px" );
        GM_setValue(MY_TITLE + ":FM", maximize);
}

function mouseUp() {
    if ( frame.offsetLeft == frameLeft && frame.offsetTop == frameTop )
        resizeFrame( body.style.display == "none" );
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e){
    frameLeft = frame.offsetLeft;
    frameTop = frame.offsetTop;
    mouseLeft = e.clientX - frameLeft;
    mouseTop = e.clientY - frameTop;
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e){
    frame.style.top = e.clientY - mouseTop + 'px';
    frame.style.left = e.clientX - mouseLeft + 'px';
    GM_setValue(MY_TITLE + ":FT", frame.style.top);
    GM_setValue(MY_TITLE + ":FL", frame.style.left);
}

function hex2a(hex) {
    var str = "";
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function htmlspecialchars(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function htmlspecialchars_decode(str) {
    return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, '\'');
}