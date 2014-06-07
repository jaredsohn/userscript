// ==UserScript==
// @name           facebook-multiuser-login
// @namespace      Dwight Barrows
// @description    Facebook auto login for shared computer, adds a "Who?" drop down list and logs in the selected user, useful for husband/wife or others that share a computer and don't mind sharing their password
// @include        http://*.facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://www.facebook.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant    GM_listValues
// @grant    GM_deleteValue
// @grant    GM_openInTab
// @version        1.2e
/* Changelog:
1.2 2011-08-14
1.2a 2011-08-15, added export features (experimental, commented out)
1.2b 2011-11-14, added menu back when logged in due to FB layout changes
1.2c 2011-11-15, switch user while on page wasn't logging out
1.2d 2013-06-25, updated due to FB layout changes (position of menu)
1.2e 2013-09-06, cleanup: added grant metadata, added changelog, updated version
*/
// ==/UserScript==

var userString = new Array();
  
if (document.getElementById("email") && document.getElementById("pass")) {
  fE = document.getElementById("email");
  fP = document.getElementById("pass");
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
      oDiv.className = "form_row clearfix";
      fE.parentNode.appendChild(oDiv);
      oDiv.appendChild(oSel);
    }
  }
}

if (document.getElementById("pageNav")) {
  fUL = document.getElementById("pageNav");
  oSel = buildMenu();
  addMenuOptions(false);
  var oLi = document.createElement("LI");
  oLi.className  = 'navItem';
  fUL.insertBefore(oLi, document.getElementById("navHome"));
  //fUL.appendChild(oLi);
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
    var userPass = prompt("Enter the Facebook password","").replace(/^\s+|\s+$/g, '');
    if (userPass == null) { return 0 }
    var fmtString = userName + "|" + userEmail + "|" + userPass 
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
  orgPassword = userString[2];
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
    var userPass = prompt("Enter the Facebook password",orgPassword).replace(/^\s+|\s+$/g, '');
    if (userPass == null) { return 0 }
    var fmtString = newUserName + "|" + userEmail + "|" + userPass 
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
  GM_openInTab("http://userscripts.org/scripts/show/57400");
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
