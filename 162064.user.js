// ==UserScript==
// @name      Better ddwrt stats
// @version    0.3
// @description  Enhances the ddwrt stats. Makes a nice table view of the send and received traffic 
// @copyright  brantje

// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @grant 		   GM_addStyle
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include		http://192.168.1.1/*
// ==/UserScript==
$(function(){
    
    //ttgraph.cgi
    var totaldownloadbytes = 0;
    var totaluploadbytes= 0;
    var table = '<table style="width:100%" cellspacing="0">'
    	table += '<thead><tr><td>Day  </td><td>Download  </td><td>Upload  </td></tr></thead><tbody>'
    $('.day, .day_sun').each(function(){
        day = $(this).attr('onmouseover');
        console.debug(day)
       	var pattern1 = /Show\('(.*) (.*), (.*) \(Incoming: (.*) MB \/ Outgoing: (.*) MB\)\'\)/
       	stats = day.match(pattern1)
        console.debug(stats)
        var uploadbytes = stats[5]*1024*1024;
        var downloadbytes = stats[4]*1024*1024;
        totaluploadbytes = totaluploadbytes+uploadbytes;
        totaldownloadbytes = totaldownloadbytes + downloadbytes
        
 		var day = stats[1]+' '+stats[2]+', '+stats[3];
        table += '<tr><td>'+ day + ' </td><td> '+ bytesToSize(downloadbytes) +' ('+stats[4]+' MB) </td><td> '+ bytesToSize(uploadbytes) +' ('+stats[5]+' MB) </td></tr>';
    })
    var totaltraffic = totaldownloadbytes+totaluploadbytes;
    table += '<tr><td>Total </td><td> '+ bytesToSize(totaldownloadbytes) +' </td><td> '+ bytesToSize(totaluploadbytes) + ' </td></tr>'
    table += '<tr><td>Sum </td><td colspan="2"> '+bytesToSize(totaltraffic)+'</td></tr>'
    table += '</tbody></table>'
    $('#t-graph').before(table)
    //End ttgraph.cgi
    
    //status_internet.asp
    $('#graph').load(function() {
        this.style.height =
        this.contentWindow.document.body.offsetHeight+750 + 'px';
    });
})




function bytesToSize(bytes, precision)
{  
    var precision = 2;
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;
    var petabyte = terabyte * 1024;
    var exabyte  = petabyte * 1024;
    var zettabyte = exabyte * 1024;
    var yottabyte = zettabyte * 1024;
   
    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
 
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
 
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
 
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
 
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
 
    }else if (bytes >= petabyte) {
        return (bytes / petabyte).toFixed(precision) + ' PB';
 
    }else if (bytes >= exabyte) {
        return (bytes / exabyte).toFixed(precision) + ' EB';
 
    }else if (bytes >= zettabyte) {
        return (bytes / zettabyte).toFixed(precision) + ' ZB';
 
    }else if (bytes >= yottabyte) {
        return (bytes / yottabyte).toFixed(precision) + ' YB';
 
    } else {
        return bytes + ' B';
    }
}
GM_addStyle('td {font-family: Tahoma, Arial, sans-serif; font-size: 0.8em;}')
GM_addStyle('tr:nth-child(even) {background: #CCC; border-style: solid; border-color: #ddd #999 #999 #ddd;}')
GM_addStyle('tr:nth-child(odd) {background: #FFF}')