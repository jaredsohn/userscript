var $ = unsafeWindow.jQuery;
var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit declutter to toolbox
// @namespace decluttertotoolbox
// @description rescue old data
// @include http://reddit.com/*
// @include https://reddit.com/*
// @include http://*.reddit.com/*
// @include https://*.reddit.com/*
// @version 1
// ==/UserScript==

function datarescue() {
    function rescuedata() {
	    var convertedlist = "<table class='moddedlist'><tr><th>Users</th><th>Total</th></tr>";
	
        var modaction2Arr = new Array();
        var keycount = 0;
        for (var i = 0; i < localStorage.length; i++) {
            var keystore = localStorage.key(i)

            if (keystore.toLowerCase().indexOf("modaction") >= 0) {

                modaction2Arr[keycount] = keystore;

                keycount++;
            }







        }
        console.log(modaction2Arr);

        $.each(modaction2Arr, function(index, value) {
            var obj = parseInt(localStorage.getItem(value), 10);
            var loguser = value.substring(9);
            console.log(loguser);
            var logr = "unknown_subbredit";
            var logaction = localStorage.getItem('logaction_' + loguser) || '{}';
            var logexecuted = "removed";

            logaction = JSON.parse(logaction);

            if (jQuery.isEmptyObject(logaction)) {

                logaction[logr] = {
                    "removed": 0,
                    "spammed": 0,
                    "reported": 0,
                    "total": 0
                };
                logaction.total = {
                    "removed": 0,
                    "spammed": 0,
                    "reported": 0,
                    "total": 0
                };
                logaction[logr][logexecuted] = obj;
                logaction.total[logexecuted] = obj;
                logaction[logr].total = obj;
                logaction.total.total = obj;
            } else {
                logaction[logr] = {
                    "removed": 0,
                    "spammed": 0,
                    "reported": 0,
                    "total": 0
                };
                logaction[logr][logexecuted] = obj;
                logaction[logr].total = obj;
                logaction.total[logexecuted] = parseInt(logaction.total[logexecuted], 10) + obj;
                logaction.total.total = parseInt(logaction.total.total, 10) + obj;
            }

            localStorage.setItem('logaction_' + loguser, JSON.stringify(logaction));
			
			convertedlist = convertedlist + "<tr style='border: 1px solid #4b515b;'><td style='padding: 2px;' title='" + loguser + "'  class='dcmodlog'>" + loguser + "</td><td>" + obj + "</td></tr>";
			localStorage.removeItem(value);
        });
$('#rescuebutton2').css('display', 'block');
 $('#rescuebutton2').html(convertedlist + "</table>");




    }

    $("head").prepend("<style type='text/css'>#rescuebutton \
{ \
    font-size: small; \
    background-color: rgba(50, 55, 63, 0.9); \
    font-family: sans-serif; \
    color: rgba(255, 255, 255, 0.9); \
    position: fixed; \
    z-index: 1000; \
    margin: 0; \
    top: 50px; \
    right: 250px; \
    width: 200px; \
            box-shadow: 10px 10px 10px rgb(170, 170, 170); \
    -webkit-box-shadow: 10px 10px 10px; \
    text-align: left; \
  }\
  #rescuebutton2 \
{ \
    font-size: small; \
    background-color: rgba(50, 55, 63, 0.9); \
    font-family: sans-serif; \
    color: rgba(255, 255, 255, 0.9); \
    position: fixed; \
    z-index: 1000; \
    margin: 0; \
	display: none; \
    top: 50px; \
    right: 250px; \
    width: 200px; \
            box-shadow: 10px 10px 10px rgb(170, 170, 170); \
    -webkit-box-shadow: 10px 10px 10px; \
    text-align: left; \
  }\
  </style>");

    $('.footer-parent').prepend('<div id="rescuebutton">click here to rescue your data</div><div id="rescuebutton2">data</div>');

    $(document).on('click', '#rescuebutton', function() {
	$('#rescuebutton').css('display', 'none');
        rescuedata();
        
    });
}


// Add script to the page
document.addEventListener('DOMContentLoaded', function(e) {
    var s = document.createElement('script');
    s.textContent = "(" + datarescue.toString() + ')();';
    document.head.appendChild(s)
});