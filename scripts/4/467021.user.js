// ==UserScript==
// @name       Ref. System [Mission Assigner]
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Provides buttons to assign to correct mission faster in the LDS Referral Manager
// @match      http://referrals.lds.org/referralmanager/PersonInfo.put
// @include    http://referrals.lds.org/referralmanager/PersonInfo.action
// @copyright  2012+, You
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////////////
//New HTML//         ** If you want to add a different mission just add another html
////////////            button to the code below with the value equal to the mission id.

var newHTML = document.createElement('div');
newHTML.innerHTML= '\
<div id="wrap">\
	<button class="button" value="2011530">North</button>\
	<button class="button" value="2017008">South</button>\
	<button class="button" value="2012081">East</button>\
	<button class="button" value="374229">West</button>\
	<button class="button" value="1174177">Northwest</button>\
	<button class="button" value="1161970">Southeast</button>\
	<button class="button" value="1985957">Chalco</button>\
	<button class="button" value="1941232">Pachuca</button>\
</div>\
<div id="drop">Drop em</div>\
<style>\
	#wrap{top:510px;left:600px;position:absolute;}\
	.button{cursor:pointer;}\
#drop{\
background:crimson;top:615px;left:475px;padding:3px;\
position:absolute;width:95px;box-sizing: border-box;\
text-align:center;font-family:calibri;cursor:pointer;\
}\
</style>';
document.body.appendChild (newHTML);

////////////////////////////////////////////////////////////////////////////////
//Mission Assigner//
////////////////////

var northdiv = document.getElementById('north');
function assign()
{
    var missionID=this.value;
    document.getElementById('missionUnitID').value=1;
    document.getElementById('unitID').value=1;
    document.getElementById('missionList').style.cssText="display:table-row;";
    document.getElementsByName("missionID")[0].value=missionID;
    //Get rid of the two slashes in the following line for auto save on click
    //mySubmit('SAVE') 
}

var buttonValue = document.getElementsByClassName('button');
for (i = 0; i < buttonValue.length; i++){
    document.getElementsByClassName('button')[i].addEventListener("click", assign, false);
}

////////////////////////////////////////////////////////////////////////////////
//Auto Dropper//
////////////////

function dropper()
{
    document.getElementById('status').selectedIndex=4;
    statusChange();
    document.getElementById('statusDetail').selectedIndex=2;
    statusDetailChange();
	document.getElementsByName('contactedDate')[0].value="14-Apr-25";
    //mySubmit('SAVE');
}
document.getElementById('drop').addEventListener("click", dropper, false);


