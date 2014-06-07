// ==UserScript==
// @name           FFFetch
// @description    Fetch FF Info for the current page
// @namespace      http://*
// @exclude        http://www.google.com/*
// @exclude        http://www.friendfeed.com/*
// @exclude        http://friendfeed.com/*
// ==/UserScript==
//
// Version 0.1
// 

var SCRIPT_VERSION = "0.1";

GM_xmlhttpRequest({
  method:"GET",
  url:"http://friendfeed.com/api/feed/url?url="+window.location,
  headers:{
    "User-Agent":"fffetch",
    "Accept":"text/xml",
  },
  onload:function(details) {
    if ( top.location == location ) {
      ffeed = eval("("+details.responseText+")");
      var html = "";
      var icount = 0;
      var ccount = 0;
      for (var i = 0; i < ffeed['entries'].length; i++) {
        var e = ffeed['entries'][i];
        p = e['published'];
        cstring = e['comments'].length > 0 ? " - <b>Comments: "+e['comments'].length+"</b>" : "";
        ccount += e['comments'].length;
        datestring = p.substr(5,2)+"/"+p.substr(8,2)+"/"+p.substr(0,4);
        html += "<li style='margin: 0px; padding: 2px; line-height: 18px; font-size: 12px;'>" +
  	      "<img style='margin: 0px; padding: 0px 3px 0px 0px;' src='" + e['service']['iconUrl']+ "'>" +
  	      "<a style='background-color: #CDDFF6;' href='http://friendfeed.com/e/" + e['id'] + "'>" +
  	      e['title'] +
  	      "</a>" +
                " (<a style='background-color: #CDDFF6;' href='" + e['user']['profileUrl'] + "'>" +
  	      e['user']['name']+"</a>) "+datestring+cstring+"</li>";
        icount++;
      } 

      var arrows = "";
      if ( ccount > 0 || icount > 0 ) {
        arrows = '<span id="listOff" onclick="listOff();" style="display: none;">&dArr;</span>' + 
          '<span id="listOn" onclick="listOn();" style="display: inline;">&rArr;</span>';
      }
      var snippet = 
        '<script language="JavaScript" type="text/javascript">' +  
        'function listOff () {' +
        '  document.getElementById("flist").style.display = "none"; ' +
        '  document.getElementById("listOn").style.display = "inline"; ' + 
        '  document.getElementById("listOff").style.display = "none"; ' +
        '}' +
        'function listOn () {' + 
        '  document.getElementById("flist").style.display = "block"; ' +
        '  document.getElementById("listOn").style.display = "none"; ' +
        '  document.getElementById("listOff").style.display = "inline"; ' +
        '}' +
        '</script>' +
        '<div style="' +
        'z-index: 99; display: block;' +
        'text-align: left; margin: 10px; padding: 5px;' +
        'border-bottom: 2px solid #2F72C4; ' +
        'font-size: 9pt; background-color: #CDDFF6; ' +
        'color: #000000;">' +
        '<span style="display:block; font-size: 1.1em; margin: 0px; padding: 0px;">' + 
        '<b>FriendFeed</b> - '+icount+' Items : '+ccount+' Comments ' +
        arrows +
        '</span>' + 
        '<ul id="flist" style="display: none; list-style-type: none; margin: 0px; padding: 10px 0px 10px 0px;">' +
        html + 
        '</ul>' +
        '</p></div>';
  
      var ffetched = document.createElement("div");
      ffetched.innerHTML = snippet;
      document.body.insertBefore(ffetched, document.body.firstChild)
    }
  }
});


