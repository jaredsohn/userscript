// ==UserScript==
// @name           PSIS Co-operative Bank Full Account Field Parser
// @version        v1.2
// @description    Adds a field for a full bank account no, which populates the existing bank account number fields. Based heavily off stuartm's  'ASB Full Bank Account Field Parser' user script (http://userscripts.org/users/40350)
// @include        https://www.co-operativebank.co.nz/internetbanking/t/oop.aspx
// ==/UserScript==

// Parse the pasted Bank account number
var updateNumbers = function(event) {
  var full = event.target.value.replace(/[^0-9]/g, "");
  
  var bank = full.substring(0, 2);
  var branch = full.substring(2, 6);
  var acct = full.substring(6, 13);
  var suffix = full.substring(13);
  
  document.getElementById("accountBank").value = bank;
  document.getElementById("accountBranch").value = branch;
  document.getElementById("accountBase").value = acct;
  document.getElementById("accountSuffix").value = suffix;
}

// Locate the box content container and the 'e.g.' text to remove
tmp = document.getElementById("accountSuffix");
var table = tmp.parentNode.parentNode.parentNode;
var boxcontent = tmp.parentNode.parentNode.parentNode.parentNode.parentNode;
var area_to_remove = boxcontent.childNodes[5];

// Make INPUT box
var input = document.createElement("INPUT");
input.size = 41;
input.type = "text";
input.addEventListener('change', updateNumbers, true); 

// Create new TR and TDs
var new_td1 = document.createElement("TD");
var new_td2 = document.createElement("TD");
var new_tr = document.createElement("TR");
var label = document.createElement("LABEL");
var i = document.createElement("I");
i.innerHTML = "Bank Account&nbsp;&nbsp;";
label.appendChild(i);
new_td1.appendChild(label);
area_to_remove.innerHTML = '';

// Append new TDs to the new TR, and the new TR to the existing TABLE
var tr = table.appendChild(new_tr);
var td = tr.appendChild(new_td1);
tr.appendChild(new_td2);
td.appendChild(input);

// This is quick and dirty, but works.
// Thanks to stuartm for his ASB version.
