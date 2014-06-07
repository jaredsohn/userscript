// ==UserScript==
// @name AutoMegaupload Downloader
// @namespace AutoMegaupload Downloader
// @description   Script made by r3x0
// @include *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version 1.0.0
// ==/UserScript==

// Wait document ready

$(document).ready(function () {

	// Var

	var cont = 60;
	var print = document.createElement("div");

	// Register menu command
	
	GM_registerMenuCommand("Download a file!", function () {
		start();
	});
	
	// Start function

	function start(){

		var url = prompt("Megaupload link?");

		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			data:"xx=w",
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0a2) Gecko/20111101 Firefox/9.0a2',
				'Content-Type': 'application/x-www-form-urlencoded'
				},onload: function(data) {
					Timer = self.setInterval(contatore, 1000);
					var htmltext = data.responseText;	
					window.setTimeout(function () {
						var downloadl = $("#dlbutton", htmltext).attr('href');
						window.location.href = downloadl;
					}, (cont*1000));
					
				}

		}); 
	}
	
	// Signature function with counter
	
	function contatore(){
		print.innerHTML = '<div style="background-color: #000000;clear:both;position:fixed;z-index: 1;bottom:0px;font-family:Arial;font-size:11px;height:15px;padding-top:5px;padding-left:4px;padding-right:10px;color:#aeaeae;"><span><font color="yellow">AutoMegaupload Downloader v1.0</font> is running! Wait <b>' + cont + '</b> seconds for the savefile dialog!&nbsp;<i>Script made by Team Vipers</i>&nbsp;&nbsp;&nbsp;<font color="skyblue">NOT CHANGE THIS PAGE OR THE DOWNLOAD WILL BE INTERRUPTED</font></span></div>'
		document.body.insertBefore(print, document.body.firstChild);
		cont--;
		if(cont == 0){
			clearInterval(Timer);
		}
	}

});