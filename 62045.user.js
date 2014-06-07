// ==UserScript==
// @name           facebook-multiuser-login
// @namespace      Dwight
// @description    Facebook auto login for shared computer, adds a "Who?" drop down list and logs in the selected user, useful for husband/wife or others that share a computer and don't mind sharing their password
// @include		http://*.facebook.com/*
// @include		https://*.facebook.com/*
// @include		http://facebook.com/*
// @include		https://facebook.com/*

// ==/UserScript==

// Edit these lines to include user name|email address|password for each user.  Add or delete lines as necessary.
// The index in brackets must start at 0
var userList = new Array();
userList[0] = "ken|kenverzo@yahoo.com|raiderken";
userList[1] = "ryuzaki kira |ryuzaki043@yahoo.com|raiderken";
userList[2] = "kira - light yagami justice|kiwaro043@yahoo.com|raiderken";
userList[3] = "diran joy|pretty_diran@yahoo.com|joyjoy";
userList[4] = "precious verzo|karismalovely_143@yahoo.com|preken";
userList[5] = "UserName3|emailaddress3|password6";
userList[6] = "UserName3|emailaddress3|password7";
userList[7] = "UserName3|emailaddress3|password8";


var userString = new Array();

if (document.getElementById("email") && document.getElementById("pass")) {
   fE = document.getElementById("email");
   fP = document.getElementById("pass");
   fTr = fE.parentNode.parentNode;
   suppressMenu = 0;
   if (GM_getValue("FBMLU_Index") != undefined) {
     if (GM_getValue("FBMLU_Index") > 0) {
       index = GM_getValue("FBMLU_Index");
       GM_setValue("FBMLU_Index",0);  
       userString = userList[index-1].split("|");
       doForm();
       suppressMenu = 1;
       }
     }
   if (suppressMenu == 0) {
     oSel = buildMenu();
     if (fTr.tagName == "TR") {
        var newCell = fTr.insertCell(0);
        newCell.appendChild(oSel);
        }
     else if (fE.parentNode.tagName == "DIV") {
        var oDiv = document.createElement("DIV");
        oDiv.class = "form_row clearfix";
        fE.parentNode.appendChild(oDiv);
        oDiv.appendChild(oSel);
        }
      }
   }

if (document.getElementById("fb_menu_account")) {
   fName = document.getElementById("fb_menu_account");
   fUL = fName.parentNode;
   oSel = buildMenu();
   var oLi = document.createElement("LI");
   oLi.className  = 'fb_menu';
   fUL.appendChild(oLi);
   oLi.appendChild(oSel);
  }
                         
function buildMenu() {
   var oSel=document.createElement("SELECT");
   if (document.getElementById("fb_menu_account")) {
     oSel.addEventListener('change', logMeOut, false);
     }
   else {
     oSel.addEventListener('change', autoLogin, false);
     }
   var oOpt=document.createElement("OPTION"); oOpt.innerHTML = "Who?";  oSel.appendChild(oOpt);
   for (i=0;i<userList.length;i++){
      userString = userList[i].split("|");
      name = userString[0];
      if (name.length > 0) {
         var oOpt=document.createElement("OPTION");
         oOpt.innerHTML = name;  
         oSel.appendChild(oOpt);
         }
      }
   return(oSel);
  }

function autoLogin() {
  index = oSel.selectedIndex;
  userString = userList[index-1].split("|");
  doForm();
  }

function logMeOut() {
  GM_setValue("FBMLU_Index", oSel.selectedIndex);
  lmo = document.getElementById('fb_menu_logout');
  lmocn = lmo.childNodes[0];
  document.location.href = lmocn.href;
  }
  
function doForm() {
  fE.value = userString[1];
  fP.value = userString[2];
  document.getElementById("persistent").checked = true;
  fE.form.submit();
  }