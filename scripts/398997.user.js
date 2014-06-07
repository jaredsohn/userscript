// ==UserScript==
// @id             hiszilla-kunagi-app
// @name           Create Kunagi issue from Hiszilla Bug
// @version        1.1
// @namespace      hiszilla.his.de
// @author         wi@koczewski.de
// @description    
// @include        *hiszilla.his.de/hiszilla/show_bug.cgi*
// @run-at         document-end
// ==/UserScript==

function getQueryParams() {
	var qs = document.location.search
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

var bugId = getQueryParams().id
var title = document.title;
var description = document.getElementsByClassName('bz_comment bz_first_comment')[0].getElementsByTagName("pre")[0].innerHTML;

var text = '[https://hiszilla.his.de/hiszilla/show_bug.cgi?id=' + bugId + ' Anfrage '+ bugId +']\n\n' + description;

var kunagiCode = '<div style="clear: both;"></div>';
kunagiCode += '<form action="http://vmkunagi.his.de/kunagi/submitIssue" target="_blank" method="post" accept-charset="UTF-8" style="margin-top: 10px;">';
kunagiCode += '<input type="hidden" name="projectId" value="1446881c-647a-4d4e-bc80-fdbd5922b2ec-1">';
kunagiCode += '<input type="hidden" name="spamPreventionCode" value="no-spam">';
kunagiCode += '<input type="hidden" name="subject" value="'+title+'">';
kunagiCode += '<input type="hidden" name="wiki" value="true">';
kunagiCode += '<input type="hidden" name="text" value="'+text+'">';
kunagiCode += '<input type="submit" name="submit" value="Kunagi Issue erstellen (APP)" style="float: right;">';
kunagiCode += '</form>';

var debug = false;
if (debug) {
	kunagiCode += '<pre style="border: 1px solid red;">' + text + '</pre>'
}

document.getElementById('boxofimportantstuff').parentNode.innerHTML += kunagiCode;

