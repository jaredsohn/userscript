// JavaScript Document
// ==UserScript==
// @name           IP view
// @autor          Fioleta (http://userscripts.org/users/fioleta)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/75426
// @description    Combat Reports for viewing.
// @include        http://s*.*.ikariam.*/index.php*view=militaryAdvisorDetailedReportView*
// @include        http://s*.*.ikariam.*/index.php*view=diplomacyAdvisor*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.0.3
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// @exclude        http://s*.*.ikariam.*/index.php*oldView=militaryAdvisorDetailedReportView*
// ==/UserScript==

// Wrapper for GM_xmlhttpRequest
function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };

    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };

    this.abort = function() {
        this.readyState = 0;
    };

    this.getResponseHeader = function(name) {
        return this.headers[name];
    };

    this.send = function(data) {
        this.data = data;
        var that = this;
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with returned data
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onerror: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            },
            onreadystatechange: function(rsp) {
                for (k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};

$.ajaxSetup({
    xhr: function(){return new GM_XHR;}
});

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


//check is message convert

if (checkDiplomacy()) {
	convert();
	return;
} else {
	isSaved();
}


var today = new Date();
var to_update = today.getDay();
var week_number = today.getWeek().toString();


function convert() {
    $(".msgText").each(function(index) {
		var tmp = $(this).text().trim();//;
		tmp = tmp.replace(/\n/g, '<br />');
		$(this).html(tmp.replace(/(http:\/\/www\.fioleta\.com\/show_combat\.html\?(combat=[0-9]*)&(round=[0-9]*)&(server=[\w.]*))/i,"<a href=\"$1\" target=\"_blank\" style=\"color: #542c0f; cursor: pointer; text-decoration: underline; font-weight: bold;\">$1</a>"));
  });
}

function checkDiplomacy() {
	
	const hostMatch        = /view=diplomacyAdvisor/i.exec( top.location);
    return ( hostMatch?true:false);
	
}

function getServerWorld() {
    const hostMatch        = /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
    return (hostMatch?hostMatch[1]:false) || 's?';
}

function getServerDomain() {
    const hostMatch        = /(s\d+)(\.([a-z]+))?\.ikariam(\.[a-z]+)?\.([a-z]+)/i.exec( top.location.host );
    return (hostMatch?(hostMatch[3] || hostMatch[5]):false) || 'org';
}

function getCombatNumber() {
    var myregexp = /detailedCombatId=([0-9]*)/;
    var match = myregexp.exec(window.location.href);
    if (match != null) {
        result = match[1];
    } else {
        result = false;
    }
    return result;
}

function getCombatRound() {
    var myregexp = /\w* ([0-9]*) \//;
    var match = myregexp.exec($("li.roundNo").text());
    if (match != null) {
        result = match[1];
    } else {
        result = false;
    }
    return result;
}

/*
TODO:


CHANGELOG:
0.1 - 2010-04-02 - initial release
0.2 - 2010-04-26 - update for dns resolve.
0.3 - 2010-05-02 - added href link to diplomacyAdvisor when message containing link to fioleta.com


Thanks to the autor for the great script that i borrowed to make this litle script...

*/

// END FILE