// ==UserScript==
// @name           HZ autologin
// @namespace      leroybaeyens
// @description    autologin voor hz webapplicaties
// @include        http://*.myhz.nl/*
// @include        https://*.myhz.nl/*
// @include        http://*.hz.nl/*
// @include        https://*.hz.nl/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

// BEGIN config items
var scriptNumber = "127170";
var scriptVersion = "1";
var newdownloadurl = "http://userscripts.org/scripts/source/__SCRIPT__.user.js".replace(/__SCRIPT__/g,scriptNumber);
// END config items

// an array of pages where autologin should apply, only the login procedure!  (not active yet!)
var webtoapply = new Array();
webtoapply[0] = "https://infonet.hz.nl";
webtoapply[1] = "https://mail.hz.nl";



$(document).ready(function(){
	// this is the content of the popupbox
	var html = "<h3>HZ automatic login</h3>";
	html = html + "<h4>logingegevens</h4>";
	html = html + 'Gebruikersnaam:<br /><input type="text" id="autousername" name="autousername" value="" /><br />';
	html = html + 'Wachtwoord:<br /><input type="password" id="autopassword" name="autopassword" value="" /><br />';
	html = html + 'Autologin?:<input type="checkbox" id="autologinauto" name="autologinauto" /><br />';
	html = html + '<input type="button" id="autosavebutton" name="autosavebutton" value="Opslaan" />';
	html = html + '<div><ul>';
	html = html + '<li><a target="_blank" href="http://infonet.hz.nl">Infonet</a></li>';
	html = html + '<li><a target="_blank" href="http://mail.hz.nl">Webmail</a></li>';
	html = html + '<li><a target="_blank" href="http://print.hz.nl">Print</a></li>';
	html = html + '</ul>';
	html = html + '</div>';
	
	// append the div to the body, attach image tot right bottom corner and add save button to web.
	$("input[name=SubmitCreds]").after('&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="autoSaveCredentials" class="login_button" value="Save" />');
	$("body").append('<div id="autologonbar"><img src="http://www.noordwoldefriesland.nl/plattegrond/images/close_button.png" id="autoclose" />' +html+ '</div>');
	$("body").append('<p id="autologin_button"><img src="http://www.zeelandnet.nl/uitinzeeland/assets/fotos/6/6485_medium.jpg" /></p>');
	// START some CSS for the elements
	$("#autologonbar *").css({
		"margin" 		: "0px",
		"padding" 		: "0px",
		"font-size" 	: "1em",
		"font-family"	: "verdana"
	});
	$("#autologonbar input").css({
		"font-size" 	: "1.1em",
		"padding"		: "3px",
		"margin"		: "3px"
	});
	$("#autologonbar li").css({
		"display"		: "block",
		"float"			: "left",
		"margin"		: "2px 9px"
	});
	$("#autologonbar a").css({
		"color"			: "#0000FF"
	});
	$("#autoclose").css({
		"float" 		: "right",
		"margin"		: "-33px -26px 0px 0px"
	}).click(function(){
		// when the close image has been clicked close the DIV
		$("#autologonbar").slideUp();
	});
	$("#autologonbar").css({
		"display"		: "none",
		"position"		: "absolute",
		"bottom"		: "40px",
		"right"			: "20px",
		"width"			: "200px",
		"background"	: "#cccccc",
		"border"		: "#9a0000 solid 2px",
		"padding"		: "10px 4px",
		"z-index"		: "100"
	});
	$("#autologonbar h3").css({
		"margin"		: "0px 0px 15px 0px",
		"padding"		: "0px",
		"text-align" 	: "center",
		"font-weight"	: "bold",
		"font-size"		: "1.1em"
	});
	$("#autologonbar h4").css({
		"margin"		: "0px 0px 10px 0px",
		"padding"		: "0px",
		"font-weight"	: "bold"
	});
	$("#autologin_button").css({
		"position" 		: "fixed",
		"bottom"		: "10px",
		"right"			: "10px",
		"cursor"		: "pointer"
		
	}).click(function(){
		// when the main button has been clicked slidetoggle the DIV
		$('#autologonbar').slideToggle();
	});
	$("#autologin_button img").css({
		"width"			: "40px"
	});
	// END some CSS for the elements
	// when the save button has clicked slidetoggle the DIV because everything is saved when edited!
	$('#autosavebutton').click(function(){
		hz_options.save();
		$('#autologonbar').slideUp();
	});
	$('#autoSaveCredentials').click(function(){
		hz_options.saveFromWeb();
		$('#autologonbar').slideDown();
	});
	
	

	// script below from marcelino van hecke and edit by leroy
	var hz_options = {

		saveCheckbox: function (id) {

			if ($('#' + id + ':checked').val() != undefined)
			{
				hz_options.setString(id, "y");
				//GM_setValue(id, 4);
				//localStorage.setItem(id, 4);
			} else {
				hz_options.setString(id, "n");
				//GM_setValue(id, 0);
				//localStorage.setItem(id, 0);
			}
		},

		loadCheckbox: function (id) {
			//if(GM_getValue(id) != 0) {
			if(hz_options.loadString(id) == "y"){
				$('input[name=' + id + ']').attr('checked', 'checked');
			}			
		},

		saveTextbox: function (id) {
				//GM_setValue(id, $('#' + id).val());
				//alert($('#' + id).val());
				$('#' +id).change(function(){
					hz_options.setString(id, $('#' + id).val());
					hz_options.addToFields();
				});
		},

		loadTextbox: function (id) {
				//$('#' + id).val(GM_getValue(id));
				//alert(hz_options.getString(id));
				$('#' + id).val(hz_options.loadString(id));
		},

		save: function () {
			hz_options.saveCheckbox('autologinauto');
			hz_options.saveTextbox('autousername');
			hz_options.saveTextbox('autopassword');
		},
		saveFromWeb: function(){
			hz_options.setString('autousername', document.getElementById('username').value);
			hz_options.setString('autopassword', document.getElementById('password').value);
			hz_options.load();
		},

		load: function () {
			hz_options.loadCheckbox('autologinauto');
			hz_options.loadTextbox('autousername');
			hz_options.loadTextbox('autopassword');
		},
		setString: function (id, value){
			GM_setValue(id, value);
		},
		loadString: function (id) {
	        return GM_getValue(id);
	    },
		reset: function () {
			//localStorage.clear();
			hz_options.load();
		},

		init: function () {
			document.addEventListener('click', hz_options.save);
			document.addEventListener('keydown', hz_options.save);
			document.addEventListener('keyup', hz_options.save);
			hz_options.load();
		},
		addToFields: function(){
			(hz_options.loadString("autousername") != "") ? document.getElementById('username').value = hz_options.loadString("autousername") : "";
			(hz_options.loadString("autopassword") != "") ? document.getElementById('password').value = hz_options.loadString("autopassword") : "";
		}

	};
	
	hz_options.init();
	// script above from marcelino van hecke and edit by leroy
	// do the autologin procedure. insert username and password in correct fields and submit the form if automatic login has been enabled
	hz_options.addToFields();
	if(hz_options.loadString("autologinauto") == "y"){
		document.getElementById('logonForm').submit();
	}
});



// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available, a message to the user is displayed


// TODO
// Change scriptPage - Number on the URL in userscripts link page.
// Change scipptVersion - Version of the script in this file
// Also add <p>#[V:00000000]#</p> in the page as a description

function scriptCheckVersion(scriptPage, scriptVersion) {
	//var scriptPage = "127170";
	//var scriptVersion = "1";

	var scriptHomepageURL = "http://userscripts.org/scripts/show/__SCRIPT__".replace(/__SCRIPT__/g,scriptPage);
	var scriptFileURL = "http://userscripts.org/scripts/source/__SCRIPT__.user.js".replace(/__SCRIPT__/g,scriptPage);
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptHomepageURL,
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {
				var responseMatch = evt.responseText.match(/#\[V:(\d+)]#/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;
				if (remoteVersion <= scriptVersion) {
					return;
				}
				var messageDiv = document.getElementById("newVersionMessage");
				if (messageDiv) {
					messageDiv.style.display = "block";
				}else {
					$('#autologin_button img').before('<p id="newVersionMessage" style="position:absolute; margin:0px; z-index:10; padding:0px; right:40px; bottom: 0px; width:200px"><strong>HZ autologin</strong><br />Nieuwe versie beschikbaar!</p>');
					if(scriptCheckVersion(scriptNumber, scriptVersion) != ""){
						$('#autologonbar ul').after('<p>Versie ' + remoteVersion + ' is beschikbaar. Download nieuwe versie <a href="' +newdownloadurl+ '">hier</a></p>');
					}
					/*
					messageDiv = document.createElement("div");
					messageDiv.id = "gsscriptVersionMessage";
					messageDiv.style.border = "SOLID 1px BLACK";
					messageDiv.style.backgroundColor = "RED";
					messageDiv.style.fontSize = "1.2em";
					messageDiv.style.padding = "10px";
					messageDiv.style.left = 0;
					messageDiv.style.top = 0;
					messageDiv.style.zIndex = 100000;
					messageDiv.style.position = "absolute"
					messageDiv.innerHTML = "<center>A new version is available<br><br>" +
					"<a id='gsscriptVersionMessageInstall' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
					"&nbsp;|&nbsp;<a href='" + scriptHomepageURL + "' target='_blank' title='Go to homepage'>Go to web page</a>" +
					"&nbsp;|&nbsp;<a id='gsscriptVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a></center>";
					document.body.appendChild(messageDiv);
					document.getElementById("gsscriptVersionMessageHide").addEventListener("click", function(evt) {
						var messageDiv = document.getElementById("gsscriptVersionMessage");
						if (messageDiv){
							messageDiv.style.display = "none";
						}
					}, false);
					*/
				}
			}
		}
	});
}


scriptCheckVersion(scriptNumber, scriptVersion);



