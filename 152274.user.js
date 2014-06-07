// ==UserScript==
// @name Check and Uncheck - FarmList - Travian T4
// @namespace http://userscripts.org/scripts/show/152274
// @description With this scrip you can check and uncheck farms by the last report (color and carry) and if the farm is under attack
// @author Tantan
// @include http://ts*.travian.*/build.php?*tt=99*
// @version 1.1.2
// @updateURL http://userscripts.org/scripts/source/152274.user.js
// @downloadURL http://userscripts.org/scripts/source/152274.user.js
// ==/UserScript==

var buttons1Position = document.getElementsByClassName("sideInfoAlly");
var buttons2Position = document.getElementsByClassName("sideInfoAlly");
var scriptPosition = document.getElementsByTagName("head");
var scriptOldHTML, buttonsOldHTML, buttonsOldHTML2;

//Functions and variables
var scr = document.createElement('script'); 
scr.setAttribute('type', 'text/javascript');
scr.innerHTML = 'var lc = document.getElementsByClassName("slotRow");'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'var cf =[1, "carry full"], ch=[1, "carry half"], ce=[1, "carry empty"]; var rg =[0, "iReport iReport1"], ry =[0, "iReport iReport2"], rr =[0, "iReport iReport3"]; var at = "attack att2"; var hid = "hidden", vis="visible", non="none";'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'function notBlankReport(idimg, typ, torf) {for (i in lc) { try { if (lc[i].getElementsByClassName("lastRaid")[0].getElementsByTagName("img")[idimg].getAttribute("class") == typ){ lc[i].getElementsByClassName("markSlot")[0].checked = torf;}} catch (err) { }}}'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'function underAttack(typ, torf) { for (i in lc) { try {  if (lc[i].getElementsByClassName("village")[0].getElementsByTagName("img")[0].getAttribute("class") == typ) lc[i].getElementsByClassName("markSlot")[0].checked = torf; } catch (err) { } } }'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'function blankReport(torf) { for (i in lc) { try { if (lc[i].getElementsByClassName("lastRaid")[0].getElementsByTagName("img")[0].src == window.location.protocol + "//" + window.location.host + "/img/x.gif"){ } } catch (err) { lc[i].getElementsByClassName("markSlot")[0].checked = torf; }}}'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'function setVisible(checkDivVisibility, hideShowDivVisibility){document.getElementById("checkDiv").style.visibility=checkDivVisibility; document.getElementById("hideShowDiv").style.visibility=hideShowDivVisibility;}'; scriptOldHTML = scr.innerHTML;
scr.innerHTML = scriptOldHTML + 'function hideShowNotBlankReport(idimg, typ, displayValue) {for (i in lc) { try { if (lc[i].getElementsByClassName("lastRaid")[0].getElementsByTagName("img")[idimg].getAttribute("class") == typ){ lc[i].style.display="displayValue"} } catch (err) { }}}'; scriptOldHTML = scr.innerHTML;
    
scriptPosition[0].appendChild(scr);






//Buttons


//---------------- checkDiv

var newdiv = document.createElement('div');
newdiv.setAttribute('id', 'checkDiv');
newdiv.setAttribute('style', 'position: fixed; left: 80%; bottom:5%; border: 2px dotted black; width: 100px; background-color: White; visibility: none;');
buttons1Position[0].appendChild(newdiv);

        //Check
newdiv.innerHTML = '<h3>Check</h3>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(cf[0], cf[1], true)" value="Carry Full"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ch[0], ch[1], true)" value="Carry Half"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ce[0], ce[1], true)" value="Carry Empty"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(rg[0], rg[1], true)" value="Report Green"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ry[0], ry[1], true)" value="Report Yellow"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(rr[0], rr[1], true)" value="Report Red"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="blankReport(true)" value="Blank Report"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="underAttack(at, true)" value="Under Attack"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;

        //UnCheck
newdiv.innerHTML = buttonsOldHTML + '<h3>UnCheck</h3>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(cf[0], cf[1], false)" value="Carry Full"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ch[0], ch[1], false)" value="Carry Half"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ce[0], ce[1], false)" value="Carry Empty"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(rg[0], rg[1], false)" value="Report Green"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(ry[0], ry[1], false)" value="Report Yellow"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="notBlankReport(rr[0], rr[1], false)" value="Report Red"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="blankReport(false)" value="Blank Report"/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<p/>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="underAttack(at, false)" value="Under Attack"/>'; buttonsOldHTML = newdiv.innerHTML;

        //Buttons Hide Div
newdiv.innerHTML = buttonsOldHTML + '<h3>Change Buttons</h3>'; buttonsOldHTML = newdiv.innerHTML;
newdiv.innerHTML = buttonsOldHTML + '<input type="button" onclick="setVisible(hid, vis)" value="Buttons to hide and show"/>'; buttonsOldHTML = newdiv.innerHTML;



//---------------- hideShowDiv


var newdiv2 = document.createElement('div');
newdiv2.setAttribute('id', 'hideShowDiv');
newdiv2.setAttribute('style', 'position: fixed; left: 80%; bottom:5%; border: 2px solid black; width: 100px; background-color: White; visibility: hidden;');
buttons2Position[0].appendChild(newdiv2);

        //Hide
newdiv2.innerHTML = '<h3>Hide</h3>'; buttonsOldHTML2 = newdiv2.innerHTML;
newdiv2.innerHTML = buttonsOldHTML2 + '<input type="button" onclick="hideShowNotBlankReport(rr[0], rr[1], non)" value="Report Red"/>'; buttonsOldHTML2 = newdiv2.innerHTML;
        //Show


        //Buttons Hide Div
newdiv2.innerHTML = buttonsOldHTML2 + '<h3>Change Buttons</h3>'; buttonsOldHTML2 = newdiv2.innerHTML;
newdiv2.innerHTML = buttonsOldHTML2 + '<input type="button" onclick="setVisible(vis, hid)" value="Buttons to hide and show"/>'; buttonsOldHTML2 = newdiv2.innerHTML;