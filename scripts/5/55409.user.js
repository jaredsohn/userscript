// ==UserScript==
// @name           GLB Custom Sorting
// @namespace      GLB
// @include        http://goallineblitz.com/game/home.pl
// ==/UserScript==
// 
// 

function getElementsByClassName(classname, par){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

function getElementsByClassNameWC(classname, par){
   var a=[];  
   var re = new RegExp(classname); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};



function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}


function CreateSort(){

    var newwindow ='';
    newwindow=window.open('',"Sort Players", "width=260,height=240,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!newwindow.opener) newwindow.opener = self;

    dropdownstring ='<select id="listorder" size=7 style="font-size: 12px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);">';
    // get the saved thread addresses and titles      
    for(var favloop =0; favloop<playersarray.length; favloop++) {
        dropdownstring += '<option value ="' + playersarray[favloop][0] + '">' + playersarray[favloop][1] + ' (' + playersarray[favloop][2] + ')</option>'
    };
    newwindow.document.write(dropdownstring + '</select>');
    var writeline = '';
    writeline = '<center><br><input type=button value="&#9650;" onclick=moveup()>'
    writeline += '<input type=button value="&#9660" onclick=movedown()></center><br><center><input type=button value="Submit" onclick=dochange()></center>'

    newwindow.document.write(writeline);

    var javaline = ''
    javaline = '<script language="JavaScript" type="text/javascript">function moveup() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array(); arrValues = new Array();for(var i=0; i<lb.length; i++)  {arrTexts[i] = lb.options[i].text; arrValues[i] = lb.options[i].value;}; if(selecteditem > 0){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem - 1]; holdvalue = arrValues[selecteditem - 1]; arrTexts[selecteditem - 1] = arrTexts[selecteditem]; arrValues[selecteditem - 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];}; lb.options[selecteditem-1].selected=true;};};</script>';

    newwindow.document.write(javaline);

    javaline = '<script language="JavaScript" type="text/javascript">function movedown() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array();arrValues = new Array();for(var i=0; i<lb.length; i++){arrTexts[i] = lb.options[i].text;arrValues[i] = lb.options[i].value;}; if(selecteditem < lb.length -1){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem + 1]; holdvalue = arrValues[selecteditem + 1]; arrTexts[selecteditem + 1] = arrTexts[selecteditem]; arrValues[selecteditem + 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];};lb.options[selecteditem+1].selected=true;};};</script>';

    newwindow.document.write(javaline);

    javaline = '<script language="JavaScript" type="text/javascript">function dochange() {var lb = document.getElementById("listorder");var strvalue = "";for(var i=0; i<lb.length; i++){opener.document.getElementById("hiddentext").value+=lb.options[i].value+",";};opener.document.getElementById("hiddentext").value=opener.document.getElementById("hiddentext").value.substring(0,opener.document.getElementById("hiddentext").value.length-1);opener.document.cookie="CustSort=" + opener.document.getElementById("hiddentext").value + "; expires=15/02/2015 00:00:00";opener.document.getElementById("hiddentext").onchange();window.close();};</script>'

    newwindow.document.write(javaline);




}


function EditSort(){
    var newwindow ='';
    newwindow=window.open('',"Sort Players", "width=260,height=240,scrollbars=no,resizable=yes,toolbar=no,location=no,menubar=no");
    if (!newwindow.opener) newwindow.opener = self;

    dropdownstring ='<select id="listorder" size=7 style="font-size: 12px; color: rgb(0, 0, 0); font-family: Arial; background-color: rgb(255, 255, 255);">';
    for(var favloop =0; favloop<playersarray.length; favloop++) {
        dropdownstring += '<option value ="' + playersarray[favloop][0] + '">' + playersarray[favloop][1] + ' (' + playersarray[favloop][2] + ')</option>'
    };
    newwindow.document.write(dropdownstring + '</select>');
    var writeline = '';
    writeline = '<center><br><input type=button value="&#9650;" onclick=moveup()>'
    writeline += '<input type=button value="&#9660" onclick=movedown()></center><br><center><input type=button value="Submit" onclick=dochange()></center>'

    newwindow.document.write(writeline);

    var javaline = ''
    javaline = '<script language="JavaScript" type="text/javascript">function moveup() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array(); arrValues = new Array();for(var i=0; i<lb.length; i++)  {arrTexts[i] = lb.options[i].text; arrValues[i] = lb.options[i].value;}; if(selecteditem > 0){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem - 1]; holdvalue = arrValues[selecteditem - 1]; arrTexts[selecteditem - 1] = arrTexts[selecteditem]; arrValues[selecteditem - 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];}; lb.options[selecteditem-1].selected=true;};};</script>';

    newwindow.document.write(javaline);

    javaline = '<script language="JavaScript" type="text/javascript">function movedown() {var lb = document.getElementById("listorder");var selecteditem = lb.selectedIndex; arrTexts = new Array();arrValues = new Array();for(var i=0; i<lb.length; i++){arrTexts[i] = lb.options[i].text;arrValues[i] = lb.options[i].value;}; if(selecteditem < lb.length -1){var holdtext = ""; var holdvalue = ""; holdtext = arrTexts[selecteditem + 1]; holdvalue = arrValues[selecteditem + 1]; arrTexts[selecteditem + 1] = arrTexts[selecteditem]; arrValues[selecteditem + 1] = arrValues[selecteditem]; arrTexts[selecteditem] = holdtext; arrValues[selecteditem] = holdvalue;for(var f=0; f<lb.length; f++) {lb.options[f].text = arrTexts[f]; lb.options[f].value = arrValues[f];};lb.options[selecteditem+1].selected=true;};};</script>';

    newwindow.document.write(javaline);

    javaline = '<script language="JavaScript" type="text/javascript">function dochange() {var lb = document.getElementById("listorder");var strvalue = "";for(var i=0; i<lb.length; i++){opener.document.getElementById("hiddentext").value+=lb.options[i].value+",";};opener.document.getElementById("hiddentext").value=opener.document.getElementById("hiddentext").value.substring(0,opener.document.getElementById("hiddentext").value.length-1);opener.document.cookie="CustSort=" + opener.document.getElementById("hiddentext").value + "; expires=15/02/2015 00:00:00";opener.document.getElementById("hiddentext").onchange();window.close();};</script>'

    newwindow.document.write(javaline);



}

function ChangeSort(){
    var sortcheckbox = document.getElementById('dosort');
    if (sortcheckbox.checked) {
        createCookie("CustSortCheck", "true", 365);
        var sortsplit = sortcookie.split(',');
        var oldsort = new Array;
        for (var q=0; q<playersarray.length;q++) {
            oldsort[q] = new Array(4);
            oldsort[q][0] = playersarray[q][0];
            oldsort[q][1] = playersarray[q][1];
            oldsort[q][2] = playersarray[q][2];
            oldsort[q][3] = playersarray[q][3];
        }
        for (var t=0;t<sortsplit.length;t++) {            
            for (var looping=0;looping<oldsort.length;looping++) {
                if (sortsplit[t] == oldsort[looping][0]) {
                    playersarray[t][0] = oldsort[looping][0];
                    playersarray[t][1] = oldsort[looping][1];
                    playersarray[t][2] = oldsort[looping][2];
                    playersarray[t][3] = oldsort[looping][3];
                    playersboxes[t].innerHTML = playersarray[t][3];
                }
            }
        }
    }else {
        createCookie("CustSortCheck", "false", 365);
        for(var x = 0; x < playersarray.length; x++) {
            for(y = 0; y < (playersarray.length-1); y++) {
                if(parseInt(playersarray[y][0]) > parseInt(playersarray[y+1][0])) {
                    holder = playersarray[y+1];
                    playersarray[y+1] = playersarray[y];
                    playersarray[y] = holder;
                }
            }
        }

        for (var sending = 0; sending<playersarray.length; sending++) {
            playersboxes[sending].innerHTML = playersarray[sending][3];
        }

    }
    var cookstr = ''
    for (var z=0;z<playersarray.length;z++) {
        cookstr+=playersarray[z][0];
    };
    cookstr = cookstr.substring(0,cookstr.length-1)
    createCookie('CustSort', cookstr, 365);
    sortcheckbox.addEventListener("click", ChangeSort,false);
}




var insertlocation = getElementsByClassName('medium_head subhead_head', document);
insertlocation[0].innerHTML += '<br><br>';

var playerssec = document.getElementById('players');
var playersboxes = getElementsByClassNameWC('content_container',playerssec);
var playersarray = new Array;
for (var i=0;i<playersboxes.length;i++) {
    // playersarray[i][0] = id
    // playersarray[i][1] = Player Name
    // playersarray[i][2] = Position
    // playersarray[i][3] = HTML
    playersarray[i] = new Array(4);
    playersarray[i][0] = playersboxes[i].innerHTML.substring(playersboxes[i].innerHTML.indexOf('player_id=')+10, playersboxes[i].innerHTML.indexOf('"', playersboxes[i].innerHTML.indexOf('player_id=')));
    playersarray[i][1] = playersboxes[i].innerHTML.substring(playersboxes[i].innerHTML.indexOf('">', playersboxes[i].innerHTML.indexOf('player_id=')) + 2, playersboxes[i].innerHTML.indexOf('</a>'));
    playersarray[i][2] = playersboxes[i].innerHTML.substring(playersboxes[i].innerHTML.indexOf('class="position ') + 16 , playersboxes[i].innerHTML.indexOf('"', playersboxes[i].innerHTML.indexOf('class="position ') + 16));
    playersarray[i][3] = playersboxes[i].innerHTML;
};



var subpagehidden = document.createElement("input");
subpagehidden.setAttribute("name", "hiddentextname");
subpagehidden.setAttribute("type", "text");
subpagehidden.setAttribute("id", "hiddentext")
subpagehidden.setAttribute("onchange", "window.location.reload();")
var sortcookie = readCookie('CustSort');
var ischecked = 'false';
if (sortcookie==null) {
    var cookstr = ''
    for (var ts =0; ts < playersarray.length;ts++) {
        cookstr+=playersarray[ts][0] +',';
    }
    cookstr = cookstr.substr(0,cookstr.length-1);
    createCookie('CustSort',cookstr,365);
}

var editsortbutt = document.createElement('input');
//build button
editsortbutt.setAttribute("name", "Edit Sort");
editsortbutt.setAttribute("type", "button");
editsortbutt.setAttribute("id", "editsort")
editsortbutt.setAttribute("value", "Edit Sort");
editsortbutt.addEventListener("click", EditSort,false);


var checksort = document.createElement('input');
//build button
checksort.setAttribute("name", "dosort");
checksort.setAttribute("type", "checkbox");
checksort.setAttribute("id", "dosort")
ischecked = readCookie('CustSortCheck');
if (ischecked == 'true') {
    checksort.setAttribute("checked", true);
}
checksort.addEventListener("click", ChangeSort,false);


insertlocation[0].appendChild(checksort);
insertlocation[0].innerHTML += ' Custom Sort  ';
insertlocation[0].appendChild(editsortbutt);

var insertdiv = document.getElementsByTagName('div');
insertdiv[1].appendChild(subpagehidden);

document.getElementById("hiddentext").style.visibility="hidden";
var sortCookie = readCookie("CustSort");
if (sortCookie!=null) {

    ChangeSort();

}
