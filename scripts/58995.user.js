// ==UserScript==
// @name           spambuffer
// @description    TH spam-buffing
// @include        http://www.twilightheroes.com/skills.php
// ==/UserScript==

//yes, it's ugly.
//yes, it's slow.
//yes, it's one fucking kludge.
//still, it does the job. and I'm tired of fucking around fixing it, so if you
//   want to make a better version, go right ahead. otherwise, if you want
//   to use this, fine. Just don't bitch.
//</ramt>
//I will, if anyone asks, explain what's going on in this script if they're 
//    trying to adapt it and need to understand. If this doesn't apply to you...
//   all I'll say is this is all a result of majick. Live with it. :p
//I left in, although commented out, the message logs. Uncomment them and
//  you should figure out how the code's working, if you can't tell by looking...
//edit: I took those out of this version, but did include a bit showing a countdown
//   of the buffs remaining, at a (sorta) request for such.
var datum = document.getElementsByTagName('form');
var hormel = datum[1];
var advTable = document.createElement("table");
var advRow = document.createElement("tr");
var advCell = document.createElement("td");
var num = GM_getValue('castsLeft',0)-GM_getValue('buffs',0);
var spam = '<input type="button" id="spammer" value="Go">';
advCell.innerHTML= 		'Spam Computer : # of casts ' +
								'<input type="text" maxlength="3" id="casts" value="'+
								GM_getValue('castsLeft',false)+ 
								'">'+
								spam;
if(GM_getValue("running", false)) advCell.innerHTML+= '<br>Casts remaining:' + num + '<br>';
advRow.insertBefore(advCell,null);
advTable.insertBefore(advRow,null);
hormel.parentNode.insertBefore(advTable, hormel);
if (GM_getValue("running", false)&&num>0){
	var temp = GM_getValue("buffs", 0);
	GM_setValue("buffs", temp+1);
	hormel.submit();}
document.getElementById("spammer").addEventListener(
						"click", 
						function(){
							GM_setValue('castsLeft',document.getElementById("casts").value);
							GM_setValue("buffs", 1);
							GM_setValue("running", true);
							hormel.submit();},
						true);
