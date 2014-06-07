// ==UserScript==
// @name       Scan Safe Access Denied
// @version    0.2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match          http://alert.scansafe.net/alert/process?*
// ==/UserScript==
 
 
var $alertBody = $('#alertbody');
var link = document.createElement('a');
$(link).css({'right': '0px',
          'position': 'absolute',
          'line-height': '20px',
          'background-color': 'goldenrod'})
    .text('Open with appspot proxy ')
    .attr('href','http://mycsproxy.appspot.com/?url='+$alertBody.find('b:eq(0)').text())
 
   
var alertBody = $alertBody[0];
  
alertBody.parentNode.insertBefore(link, alertBody);

var $alertBody = $('#alertbody');
var link = document.createElement('a');
$(link).css({'right': '0px',
          'position': 'absolute',
          'line-height': '20px',
             'top':'90px',
          'background-color': 'goldenrod'})
    .text('Open with uxlabs proxy ')
.attr('href','http://uxlabs2.sungard.ch:8080/'+$alertBody.find('b:eq(0)').text().replace(/.*:\/\//, ''));
 
   
var alertBody = $alertBody[0];
  
alertBody.parentNode.insertBefore(link, alertBody);
