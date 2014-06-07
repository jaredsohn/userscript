// ==UserScript==
// @name            SOFU Interesting Tag Browser
// @namespace       http://codingcromulence.blogspot.com/
// @description     Makes browsing your interesting tags on SOFU sites easier
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include         http://stackoverflow.com/*
// @include         http://serverfault.com/*
// @include         http://superuser.com/*
// @include         http://meta.stackoverflow.com/*
// ==/UserScript==

var curTag;

var caseCorrections = {
  'css'           : 'CSS',
  'mysql'         : 'MySQL',
  'html'          : 'HTML',
  'xml'           : 'XML',
  'jquery'        : 'jQuery',
  'asp.net'       : 'ASP.NET',
  '.net'          : '.NET',
  'php'           : 'PHP',
  'sql'           : 'SQL',
  'sql-server'    : 'SQL Server',
  'asp.net-mvc'   : 'ASP.NET MVC',
  'wpf'           : 'WPF',
  'best-practices': 'Best Practices',
  'ruby-on-rails' : 'Ruby on Rails',
  'visual-studio' : 'Visual Studio',
  'vb.net'        : 'VB.NET',
  'objective-c'   : 'Objective C',
  'winforms'      : 'WinForms',
  'visual-studio-2008' : 'Visual Studio 2008',
  'web-development' : 'Web Development',
  'linq'          : 'LINQ',
  'web-services'  : 'Web Services',
  'iphone-sdk'    : 'iPhone SDK',
  'sql-server-2005' : 'SQL Server 2005',
  'cocoa-touch'   : 'Cocoa Touch',
  'wcf'           : 'WCF',
  'sharepoint'    : 'SharePoint',
  'svn'           : 'SVN',
  'unit-testing'  : 'Unit-Testing',
  'linq-to-sql'   : 'LINQ to SQL',
  'winapi'        : 'WinAPI',
  'not-programming-related' : 'Not Programming Related',
  'actionscript-3' : 'ActionScript 3',
  'tsql'          : 'TSQL',
  'nhibernate'    : 'NHibernate',
  'internet-explorer' : 'Internet Explorer'
};

$(function() {
    var qheader = $('#subheader h2');
    if(!qheader.text().match("Questions")) return;
	
	genViewAll();
	$('img.delete').click(genViewAll);
	$('#interestingAdd').click(genViewAll);
    
    if(!qheader.text().match("Tagged Questions")) return;
	if(window.location.href.indexOf('tagged/') < 1) {
		var startPos = window.location.href.indexOf('tagnames=') + 9;
		var len = window.location.href.indexOf('&') - startPos;
		curTag = window.location.href.substr(startPos,len);
	} else {
		curTag = window.location.href.substr(window.location.href.indexOf('tagged/') + 7);
	}
    qheader.text(genHeader(curTag)); 
    if(curTag.match(/\+/)) return;
 
	genIntLinks();
	$('img.delete').click(genIntLinks);
	$('#interestingAdd').click(genIntLinks);
});

function genViewAll() {
    var allInterestingURL = window.location.href.replace(/(http:\/\/.*?\/).*/,"$1questions/tagged/");
    if($('#interestingTags a.post-tag').length > 0) {
        $('#interestingTags a.post-tag').each(function() {
           allInterestingURL += escape($(this).text()) + "+OR+";
        });
        allInterestingURL = allInterestingURL.substr(0,allInterestingURL.length-4);
		if ($('#allInteresting').length > 0) {
			$('#allInteresting').html("<div id='allInteresting' style='padding-top:12px;'><a href='"+allInterestingURL+"' style='font-weight:bold'>View All Interesting</a></div>");
		} else {
			$('#sidebar').prepend("<div id='allInteresting' style='padding-top:12px;'><a href='"+allInterestingURL+"' style='font-weight:bold'>View All Interesting</a></div>");
		}
    }
}

function genIntLinks() {
	var prevTag;
    var nextTag;
    var foundIt = false;
    var allDone = false;
    $('#interestingTags a.post-tag').each(function() {
        if(allDone) return;
        if($(this).text() == curTag) {
            foundIt = true;
        } else if (foundIt) {
            allDone = true;
            nextTag = $(this);
        } else {
            prevTag = $(this);
        }
    });
    if(!foundIt) return;
	if ($('#interestingNav').length == 0) {
		$('#sidebar').prepend("<div id='interestingNav' style='width:150px'></span>");
	}
	var inav = $('#interestingNav');
	inav.empty();
    if(prevTag) {
        inav.append("<span id='prevTagNav'>Previous: </span><br>");
        $('#prevTagNav').append($(prevTag).clone());
    }
    if(nextTag) {
        inav.append("<span id='nextTagNav'>Next: </span>");
        $('#nextTagNav').append($(nextTag).clone());
    }
}

function genHeader (str) {
    str = str.replace(/\+|%2b/g,", ");
    var start = 1;
    var retstr = str.charAt(0).toUpperCase();
    var found = 0;
    var searchType = "and";
    while((found = str.indexOf(" ",start)) > 0) {
        if (!str.substr(start-1,found - (start) + 2).match(/OR,/i)) {
            retstr += str.substr(start,found - (start) + 1);

        } else {
            retstr = retstr.substr(0,retstr.length-1);
            searchType = "or";
        }
        retstr += str.charAt(found+1).toUpperCase();
        start = found+2;
    }
    retstr += str.substr(start);
    retstr = retstr.replace(/,([^,]*)$/," "+searchType+"$1");
    if (retstr.length > 35) {
        retstr = retstr.substr(0,35).replace(/,([^,]*)$/," ...");
    }
	var retparts = retstr.split(/, | and | or | Questions/);
	for (partIdx in retparts) {
	    part = retparts[partIdx];
		if (caseCorrections[part.toLowerCase()] !== undefined) {
			retstr = retstr.replace(part,caseCorrections[part.toLowerCase()]); 
		}	
	} 
    return unescape(retstr) + " Questions";
}