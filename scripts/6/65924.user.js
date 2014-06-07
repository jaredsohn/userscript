// ==UserScript==
// @name           vBulletin MUDD Login Menu
// @namespace      
// @description    vBulletin (Multi-User Drop-Down) Login Menu
// @include       http://*forum*
// @include       http://*community*
// @include       http://*board*
// @version		  0.5
// ==/UserScript==


// !!!IMPORTANT!!!
// Edit these lines to include MENU_TITLE|USERNAME|PASSWORD for each user. 
// Add or delete lines as necessary. 
			var userList = new Array();
userList[0] = "Title|Username|Password";
userList[1] = "Title|Username|Password";
userList[2] = "Title|Username|Password";
userList[3] = "Title|Username|Password";



// align correctly for vB4
var brVar = document.createElement("br");
var getEl = document.getElementById("cb_cookieuser_navbar");
var parentDiv = getEl.parentNode;
parentDiv.insertBefore(brVar, getEl);

// rest of the script by http://userscripts.org/scripts/show/57921
function autoLogin() {
  index = oSel.selectedIndex;
  var userString = userList[index-1].split("|");
  fE.value = userString[1];
  fP.value = userString[2];
  document.getElementById("cb_cookieuser_navbar").checked = true;
  fE.form.submit();
  }

if (document.getElementById("navbar_username") && document.getElementById("navbar_password")) {
   fE = document.getElementById("navbar_username");
   fP = document.getElementById("navbar_password");
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