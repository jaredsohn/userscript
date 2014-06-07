// ==UserScript==
// @name       Rimon Time
// @version    0.1
// @description  Add Time to Rimon
// @match      http://safepage.neto.net.il/?a=block*
// @copyright  2012+, shmuelj
// ==/UserScript==
var option2=document.createElement("option");
option2.value=1.5;
option2.text="90";
document.getElementsByName("time_limit_select")[0].options.add(option2);
var option=document.createElement("option");
option.value=2;
option.text="120";
document.getElementsByName("time_limit_select")[0].options.add(option);
