// ==UserScript==
// @name           Memurlar.Net auto-login by Bayramozdem
// @namespace      Bayram Özdemir :)
// @description    Memurlar.net Auto-Login denemesi :)
// @include        http://*.memurlar.net/*
// @include        http://www.memurlar.net/*
// @include        https://*.memurlar.net/*
// @include        https://www.memurlar.net/*
// ==/UserScript==

var userString = new Array();
  
if (document.getElementById("email") && document.getElementById("Password")) {
  fE = document.getElementById("email");
  fP = document.getElementById("Password");
  fTr = fE.parentNode.parentNode;
  suppressMenu = 0;
  if (GM_getValue("FBMUL_NextUser") != undefined) {
    nextUser = GM_getValue("FBMUL_NextUser");
    GM_deleteValue("FBMUL_NextUser");
    autoLogin(nextUser);    
  }
  else {
    oSel = buildMenu();
    addMenuOptions(false);
    if (fTr.tagName == "TR") {
      var newCell = fTr.insertCell(0);
      newCell.appendChild(oSel);
    }
      else if (fE.parentNode.tagName == "DIV") {
      var oDiv = document.createElement("DIV");
      oDiv.className = "form_row PageSkin";
      fE.parentNode.appendChild(oDiv);
      oDiv.appendChild(oSel);
    }
  }
}

if (document.getElementById("PageSkinArea")) {
  fUL = document.getElementById("PageSkinArea");
  oSel = buildMenu();
  addMenuOptions(false);
  var oLi = document.createElement("LI");
  oLi.className  = 'fb_menu';
  //fUL.insertBefore(oLi, fUL.getFirstChild());
  fUL.appendChild(oLi);
  oLi.appendChild(oSel);
}
if (document.getElementById("navAccountName")) {
  fName = document.getElementById("navAccountName");
  fUL = fName.parentNode.parentNode.parentNode.parentNode;
  oSel = buildMenu();
  addMenuOptions(false);
  var oLi = document.createElement("LI");
  oLi.className  = 'fb_menu';
  fUL.insertBefore(oLi,fUL.firstChild);
  oLi.appendChild(oSel);
}

function buildMenu() {
  var oSel = document.createElement("SELECT");
  oSel.style.marginTop = '4px';
  oSel.addEventListener('change', menuSelected, false);
  return(oSel);
}

function addMenuOptions(resetOpt) {
  if (resetOpt == true) {
    if ( oSel.hasChildNodes() ) {
      while ( oSel.childNodes.length >= 1 ) {
        oSel.removeChild( oSel.firstChild );       
      } 
    }
  }
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = "Who?"; oOpt.style.color = 'gray'; oSel.appendChild(oOpt);
  if (GM_listValues().length > 0) {
     // Swith Users Group
     var userGroup = document.createElement("OPTGROUP"); userGroup.label = "Switch User";  oSel.appendChild(userGroup);
     // Edit Users Group
     var editGroup=document.createElement("OPTGROUP"); editGroup.label = "Edit User";  oSel.appendChild(editGroup);
     // Delete Users Group
     var deleteGroup=document.createElement("OPTGROUP"); deleteGroup.label = "Delete User";  oSel.appendChild(deleteGroup);
     // Add List of Users to each Group
     var gmValues = GM_listValues();
     gmValues.sort();
     for (i = 0; i < gmValues.length; i++){
        if (gmValues[i].substr(0,11)=="FBMUL_User_") {
          displayName = gmValues[i].substr(11);
          appendUser(displayName, userGroup, editGroup, deleteGroup);
        }
     }
  }   
  var oOptAU = document.createElement("OPTION"); oOptAU.innerHTML = "Add User"; oOptAU.style.fontStyle='italic'; oSel.appendChild(oOptAU);
//  var oOptAU = document.createElement("OPTION"); oOptAU.innerHTML = "Import/Export"; oOptAU.style.fontStyle='italic'; oSel.appendChild(oOptAU);
  var oOptAU = document.createElement("OPTION"); oOptAU.innerHTML = "Help"; oOptAU.style.fontStyle='italic'; oSel.appendChild(oOptAU);
}

function appendUser(t,g1,g2,g3) {
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g1.appendChild(oOpt);
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g2.appendChild(oOpt);
  var oOpt = document.createElement("OPTION"); oOpt.innerHTML = t; g3.appendChild(oOpt);
}

function menuSelected() {
  muIndex = oSel.selectedIndex;
  mySelOpt = oSel.options[muIndex];
  muParent = mySelOpt.parentNode;
  if (muParent.label == "Switch User") {
    if (document.getElementById("fb_menu_account")||document.getElementById("navAccountName")||document.getElementById("logout_form")) {
      logMeOut(mySelOpt.innerHTML);
    }
    else {
      autoLogin(mySelOpt.innerHTML);
    }
  }
  else if (muParent.label == "Edit User") {
    editUser(mySelOpt);
  }
  else if (muParent.label == "Delete User") {
    deleteUser(mySelOpt);
  }
  else if (mySelOpt.innerHTML == "Add User") {
    addUser();
  }
  else if (mySelOpt.innerHTML == "Import/Export") {
    importExport();
  }  
  else if (mySelOpt.innerHTML == "Help") {
    showHelp();
  }
}

function autoLogin(userName) {
  userString = GM_getValue("FBMUL_User_" + userName).split("|");
  fE.value = userString[1];
  fP.value = userString[2];
  document.getElementsByName("persistent")[0].checked = true;
  fE.form.submit();
}

function logMeOut(userName) {
  GM_setValue("FBMUL_NextUser", userName);
  myInputs = document.getElementById("logout_form").submit();
}
  
function addUser() {
  //note: "replace(/^\s+|\s+$/g, '')" trims leading and trailing spaces from input variables
  var userName = prompt("What name do you want to display on this menu?","").replace(/^\s+|\s+$/g, '');
  if (userName == null) { return 0 }
  var gmValues = GM_listValues();
  for (i = 0; i < gmValues.length; i++){
     if (gmValues[i] == "FBMUL_User_" + userName) {
        alert("A user with this name already exists!");
        oSel.selectedIndex = 0;
        break;
     }
  }
  if (oSel.selectedIndex > 0) {
    var userEmail = prompt("Enter the e-mail address for this Facebook account","").replace(/^\s+|\s+$/g, '');
    if (userEmail == null) { return 0 }
    var userPassword = prompt("Enter the Facebook Passwordword","").replace(/^\s+|\s+$/g, '');
    if (userPassword == null) { return 0 }
    var fmtString = userName + "|" + userEmail + "|" + userPassword 
    GM_setValue("FBMUL_User_" + userName, fmtString);
    addMenuOptions(true);
    oSel.selectedIndex = 0;
    return 1;
  }
}
  
function editUser(selOpt) {
  orgUserName = selOpt.innerHTML;
  userString = GM_getValue("FBMUL_User_" + orgUserName).split("|");
  orgEmail = userString[1];
  orgPasswordword = userString[2];
  newUserName = prompt("What name do you want to display on this menu?",orgUserName).replace(/^\s+|\s+$/g, '');
  if (newUserName == null) { return 0 }
  if (newUserName != orgUserName) {
    var gmValues = GM_listValues();
    for (i = 0; i < gmValues.length; i++){
       if (gmValues[i] == "FBMUL_User_" + newUserName) {
          alert("A user with this name already exists!");
          oSel.selectedIndex = 0;
          break;
       }
    }
  }
  if (oSel.selectedIndex > 0) {
    var userEmail = prompt("Enter the e-mail address for this Facebook account",orgEmail).replace(/^\s+|\s+$/g, '');
    if (userEmail == null) { return 0 }
    var userPassword = prompt("Enter the Facebook Passwordword",orgPasswordword).replace(/^\s+|\s+$/g, '');
    if (userPassword == null) { return 0 }
    var fmtString = newUserName + "|" + userEmail + "|" + userPassword 
    GM_setValue("FBMUL_User_" + newUserName, fmtString);
    GM_deleteValue("FBMUL_User_" + orgUserName);
    addMenuOptions(true);
    oSel.selectedIndex = 0;
    return 1;
  }
}
function deleteUser(selOpt) {
  userName = selOpt.innerHTML;
  var r = confirm("Are you sure you want to delete the user " + userName + "?");
  if (r == true) {
    GM_deleteValue("FBMUL_User_" + userName);
    addMenuOptions(true);
  }
  oSel.selectedIndex = 0;
}

function showHelp() {
  GM_openInTab("http://www.facebook.com/pages/ProgramAngel/256208971160285");
  oSel.selectedIndex = 0;
  }
  
function importExport() {
  var gmValues = GM_listValues();
  gmValues.sort();
  var exportText = "";
  for (i = 0; i < gmValues.length; i++){
    if (gmValues[i].substr(0,11)=="FBMUL_User_") {
      userString = GM_getValue(gmValues[i]);
      if (exportText.length > 0) { exportText = exportText + "\n"; }
      exportText = exportText + gmValues[i] + "=" + userString;
    }
  }
  alert(exportText);  
}  


// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/pages/ProgramAngel/256208971160285\">Visit My Facebook Page :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+180px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#rgb(120, 233, 16)";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/gabriel.nieves.7\">bayram  :D</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}


// ==Expand==chrome-extension://dhdgffkkebhmkfjojejmpbldmpobfkfo/images/filesave.png
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+62px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.programangel.enjin.com/home\">Visit My Web-Site</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
