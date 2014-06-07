// ==UserScript==
// @name           vBulletin ACP MUDD Login Menu
// @namespace      the_staff@remarkablyrandom.com
// @description    vBulletin AdminCP (Multi-User Drop-Down) Login Menu
// @include        http://*.*.*/admincp/*
// @include        http://*.*.*/forum/admincp/*
// ==/UserScript==

var userList = new Array();

// Edit these lines to include MENU_TITLE|USERNAME|PASSWORD for each user. Add or delete lines as necessary.
userList[0] = "MENU_TITLE|USERNAME|PASSWORD";
userList[1] = "MENU_TITLE|USERNAME|PASSWORD";
userList[2] = "MENU_TITLE|USERNAME|PASSWORD";
userList[3] = "MENU_TITLE|USERNAME|PASSWORD";

function autoLogin() {
  index = oSel.selectedIndex;
  var userString = userList[index-1].split("|");
  fE.value = userString[1];
  fP.value = userString[2];
  document.getElementById("cb_cookieuser_navbar").checked = true;
  fE.form.submit();
  }

if (document.getElementById("vb_login_username") && document.getElementById("vb_login_password")) {
   fE = document.getElementById("vb_login_username");
   fP = document.getElementById("vb_login_password");
   fTr = fE.parentNode.parentNode;
   var oSel=document.createElement("SELECT");
   oSel.addEventListener('change', autoLogin, false);
   var oOpt=document.createElement("OPTION"); oOpt.innerHTML = "Login Menu";  oSel.appendChild(oOpt);
   for (i=0;i<userList.length;i++){
      var userString = userList[i].split("|");
      name = userString[0];
      if (name.length > 0) {
         var oOpt=document.createElement("OPTION");
         oOpt.innerHTML = name;  
         oSel.appendChild(oOpt);
         }
      }
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