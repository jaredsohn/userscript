// ==UserScript==
// @name Bugit
// ==/UserScript==

var yid = document.getElementById ("entry_1108978603").value;
var companyName = document.getElementById("entry_138122356").value;
var name = document.getElementById ("entry_688696207").value;
var contactType = document.getElementById("entry_2000661106").value;
var phNum = document.getElementById ("entry_750737280").value;
var adId = document.getElementById ("entry_402754895").value;
var email = document.getElementById ("entry_860891296").value;
var callType = document.getElementById ("entry_617234825").value;
var campName = document.getElementById ("entry_479018008").value;
var issue = document.getElementById ("entry_80843369").value;
var escalate = document.getElementById ("entry_1823728347").value;
var w = window.open();
var date = Date();
w.document.open();
w.document.write("Date of Interaction: " + date + "<br /><br />YID: " + yid + "<br /> Company Name: " + companyName + "<br />Caller Name: " + name + "<br />Caller Phone: " + phNum + "<br />Caller Email: " + email + "<br />Preferred Contact Method: " + contactType + "<br />Type of Call: " + callType + "<br /><br />Campaign Name: " + campName + "<br /><br />What's the Issue: <br />" + issue + "<br /><br />Form Submitted? Y");
w.document.close();