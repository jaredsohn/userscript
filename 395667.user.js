// ==UserScript==
// @name       Skidpepp user block
// @namespace  SweTor
// @version    1.0
// @description  Block comments from writers
// @match      http://www.skidpepp.se/*
// @copyright  2014, SweTor
// ==/UserScript==

var element = $('.comment');
var writers = new Array();
var writer,
    banWriter,
    hidden = 0;

// Get banWriter cookie
if(readCookie("banWriter")) {
    banWriter = readCookie("banWriter");
}

// Create <select>
$("<div class=\"banController\">" +
  	"<strong>Dölj kommentarer från: </strong>" +
  	"<select id=\"setting_ban\">" +
  		"<option>Välj</option>" + 
  	"</select><br />" +
  "<em id=\"nrHidden\"></em><br />" +
  //"<strong>Markera egna kommentarer: </strong> <input type=\"checkbox\" id=\"setting_highlight\">" +
  "</div>").insertBefore("section#comments");

// Find unique writers
element.each(function() {
    writers.push($(this).find('h5').text().split(": ")[2].replace(/[^\w]/gi, ''));
    writers = $.unique(writers).sort();
});

// Fill <select> with writers
$.each(writers, function(index,value){
    if(banWriter === value) {
    	var sel = "selected=\"selected\"";
    }
    $("#setting_ban").append("<option value=" + value + " " + sel + ">" + value + "</option>");
});

// Hide comments by selected writer
$("#setting_ban").change(function() {
	banWriter = $("#setting_ban option:selected").text();
    element.each(function() {
		writer =  $(this).find('h5').text().split(": ")[2].replace(/[^\w]/gi, '');
		if (banWriter === writer){
			$(this).hide();
            hidden++;
            createCookie("banWriter",banWriter,100);
        } else {
            $(this).show();
        }
	});
    if (hidden != 0) {
    	$("#nrHidden").text(" " + hidden + " kommentar(er) dolda");
    } else {
    	$("#nrHidden").text("");
    }
    hidden = 0;
    
    if(banWriter === "Välj") {
        eraseCookie("banWriter");
    }
});

// Highlight own comments
$("#setting_highlight").click(function() {
    var checked = this.checked;
	element.each(function() {
		writer =  $(this).find('h5').text().split(": ")[2].replace(/[^\w]/gi, '');
		if ($("#author").val() === writer){
            if (checked) {
				$(this).addClass("highlight");
            } else {
            	$(this).removeClass("highlight");
            }
        }
	});
});

// Trigger 
$("#setting_ban").change();

// ************************************************************
// Coockie handling
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


// ************************************************************
// Add CSS
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(".banController { border: 1px solid #ffab00; background: #ffd173; float: left; padding: 10px; width: 90%; margin-top: 20px; }");
addGlobalStyle(".highlight { border: 1px solid #ffab00; background: #ffd173; color: #000; }");
addGlobalStyle("#nrHidden { font-size: 0.8em; }");
