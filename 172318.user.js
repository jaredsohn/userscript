// ==UserScript==
// @name           C&C Autologin multicompte V2
// @author		   F1u5h3r / Christian17300
// @description    Autologin to C&C - Version améliorée
// @include        https*://www.tiberiumalliances.com*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://userscripts.org/scripts/source/107941.user.js
// @grant   GM_setValue 
// @grant   GM_getValue 
//
// @Script modifié par Christian_FR - Juin 2013
// @version 2
//
// ==/UserScript==

var language = "fr"; // CHANGE FOR OTHER REGION
var url = window.location.href;
var CCEmail = GM_SuperValue.get("CCEmail", []);
var CCPassword = GM_SuperValue.get("CCPassword", []);

function login(){
	var profile = $('#selectionBox234562 option:selected').text();
	profile = profile.substring(profile.lastIndexOf("-")+1);
	$('input#username').val(CCEmail[profile]);
	$('input#password').val(CCPassword[profile]);
	$('input[type="submit"]').trigger('click');
}

function addProfile() {
	var email = $("#email234562").val();
	var password = $("#password234562").val();
	if(email != "" && password != "") {
		CCEmail.push(email);
		CCPassword.push(password);
		GM_SuperValue.set("CCEmail", CCEmail);
		GM_SuperValue.set("CCPassword", CCPassword);
		window.location.href = url;
	}
}

function removeProfile() {
	var profile = $('#selectionBox234562 option:selected').text();
	var splitProfileIndex = profile.lastIndexOf("-");
	profile = profile.substring(0, splitProfileIndex);
	var CCEmailString = CCEmail.toString();
	var profileIndex = CCEmail.indexOf(profile);
	CCEmail.splice(profileIndex, 1);
	CCPassword.splice(profileIndex, 1);
	GM_SuperValue.set("CCEmail", CCEmail);
	GM_SuperValue.set("CCPassword", CCPassword);
	window.location.href = url;
}

function init() {
	if (url == "https://alliances.commandandconquer.com/"+language+"/" || url == "https://alliances.commandandconquer.com/") {
		window.location.href = "https://alliances.commandandconquer.com/" + language + "/game/launch";
	} else if (url.search("/login/auth/step") != -1 || url.search("/login/auth") != -1) {
		//var width = $(window).width() / 2.5;
		var width = $(window).width() / 3.4; // Adaptation Christian17300 (largeur de l'écran divisé par 3.4)
		var height = $(window).height() / 4;
		//var selectionList = '<select name="selectionBox234562" size="1" style="width: 90px">';
		var selectionList = '<select name="selectionBox234562" size="1" style="width: 240px">'; // adaptation Christian17300
		for(var i = 0; i < CCEmail.length; i++){
			selectionList += '<option>'+CCEmail[i]+'-'+i+'</option>';
			if(i == CCEmail.length-1){
				selectionList += '</select>';
			}
		}
		//var selectionBox = '<div id="selectionBox234562" style="width: 350px; height: 80px; border: 4px solid grey; padding: 15px; z-index: 9999; position: absolute; background-color: #17341A; top: 199px; left: 665.2px; line-height: 20px; top: '+height+'px; left: '+width+'px;">Select one of the following profiles for your login.<br>Profiles: </div>';
		var selectionBox = '<div id="selectionBox234562" style="width: 500px; height: 150px; border: 4px solid grey; padding: 15px; z-index: 9999; position: absolute; background-color: #17341A; top: 199px; left: 665.2px; line-height: 20px; top: '+height+'px; left: '+width+'px;">Sélectionnez un des profils suivants pour votre connexion.<br>Profil : </div>'; // adaptation Christian17300
		$('body').append(selectionBox);
        
        // &nbsp insère un espace en HTML
		//$('#selectionBox234562').append(selectionList).append('<button id="login234562" type="button">Login</button><button type="button" id="remove234562">Supprimer Profil</button><br>Ou ajoutez un nouveau profil<br>EMail : <input type="text" style="width: 110px" id="email234562"> Password : <input type="text" style="width: 90px" id="password234562"> <button type="button" id="add234562">Ajouter ce profil</button></div>');
		$('#selectionBox234562').append(selectionList).append('&nbsp<button id="login234562" type="button">Login</button> &nbsp &nbsp &nbsp &nbsp\
								<button type="button" style="background:red;<button id="remove234562">Supprimer ce Profil</button>\
								<br><br>Ou ajoutez un nouveau profil<br>\
								&nbsp &nbsp &nbsp &nbsp EMail : <input type="text" style="width: 240px" id="email234562"><br><br>\
								Password : <input type="text" style="width: 90px" id="password234562">&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp&nbsp\
								<button type="button" id="add234562">Ajouter ce profil</button></div>');
        
        document.getElementById("email234562").style.color = "Black";
		document.getElementById("password234562").style.color = "Black";
		$('#login234562').click(function() {
			var profile = $('#selectionBox234562 option:selected').text();
			profile = profile.substring(profile.lastIndexOf("-")+1);
			login(CCEmail[profile], CCPassword[profile]);
		});

		$('#add234562').click(function() {
			addProfile();
		});

		$('#remove234562').click(function() {
			removeProfile();
		});
	}
}

init();

/* Comment the code above and uncomment the following part if you want to use instant login for a single account (No clicks required for login) */
/*
var language = "en"; // CHANGE FOR OTHER REGION
var email = "YOUREMAIL"; // CHANGE
var password = "YOURPASSWORD"; // CHANGE
var url = window.location.href;

function init() {
	if (url == "https://alliances.commandandconquer.com/"+language+"/" || url == "https://alliances.commandandconquer.com/") {
		window.location.href = "https://alliances.commandandconquer.com/" + language + "/game/launch";
	} else if (url.search("/login/auth/step") != -1 || url.search("/login/auth") != -1) {
		$('input#username').val(email);
		$('input#password').val(password);
		$('input[type="submit"]').trigger('click');		
	}
}

init();
*/