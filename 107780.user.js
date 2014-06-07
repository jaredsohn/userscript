// ==UserScript==
// @name           BuddyMod
// @namespace      localhost
// @include        http://www.kingsofchaos.com/*
// @include        http://www.kingsofchaos.com/buddylist.php*
// @description    BuddyList mod for managing and adding friends faster. Created by klmdb.
// ==/UserScript==

//------------------
// Auto Update
//------------------

var _ver = 0.002

checkUpdate();


function checkUpdate(){

var d=new Date();

 var hour = d.getHours();
 var lastchecked = GM_getValue("Koc_LastVerCheck");

if(hour == lastchecked)
{
//Do nothing, we've already checked this hour...
}else{

GM_xmlhttpRequest({
    method: "GET",
     url: "http://www.sr.fusedhosting.net/buddymod/Var.txt",
     onload: function(xhr) { 
 GM_setValue("Koc_LastVerCheck",hour); //reset the last "updated time"
 if(xhr.responseText > _ver){
  		var conver = confirm("You're using a old version of BuddyMod. Do you want to update?");
		if (conver){
		alert("Updating");
		GM_openInTab('http://www.sr.fusedhosting.net/buddymod/buddymod.xpi');
		}else{
		//Nothing
		}
	}
	 
	 }

});

}
}

//------------------
// Helper functions
//------------------
unsafeWindow.createXMLHttpRequest = function() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}
unsafeWindow.POSTRequest=function (url,query) {
    unsafeWindow.createXMLHttpRequest();
    
   
    xmlHttp.open("POST", url, true);
    xmlHttp.onreadystatechange = unsafeWindow.handleStateChange();
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");    
    xmlHttp.send(query);
}
unsafeWindow.handleStateChange = function() {
    if(xmlHttp.readyState == 4) {
        if(xmlHttp.status == 200) {
            unsafeWindow.parseResults();
        }
    }
}
unsafeWindow.parseResults=function () {
	
}

unsafeWindow.getElementsByClass = function( searchClass, domNode, tagName) {
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " "+searchClass+" ";
    for(i=0,j=0; i<tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1)
            el[j++] = tags[i];
    }
    return el;
}

//--------------
// Mod statpage
//--------------
unsafeWindow.stat_add_friendMakeButtons = function() {
    b=unsafeWindow.getElementsByClass("table_lines officers",document,"table")
    table=b[0];
    id_ar=new Array();
    for(i=2;i<table.rows.length;i++)
    {
        if(i<table.rows.length-1){
            str=table.rows[i].cells[0].innerHTML;
            var re = new RegExp("([^0-9]*)([0-9]*)(.*)", "g");
            id=str.replace(re,"$2");
            id_ar[i-2]=id;
            //table.rows[i].cells[0].innerHTML="<span style=\"cursor:pointer;\" onclick=\"addFriend("+id+")\">+</span> "+str;
        }
        else{
            cell=table.rows[i].cells[0];
            if(cell.childNodes[0].innerHTML!=undefined){
                cell.innerHTML="<a href='"+cell.childNodes[0].href+"'>&lt;&lt; Previous</a>";
            }
            cell=table.rows[i].cells[2];
            if(cell.childNodes[0].innerHTML!=undefined){
                //alert(cell.childNodes.length);
                cell.innerHTML="<a href='"+cell.childNodes[0].href+"'>Next &gt;&gt;</a>";
            }//*/
        }
    }
    table.rows[0].cells[0].innerHTML="Officers - <span style=\"color:yellow;cursor:pointer;\" onclick='addFriendList(\""+id_ar.toString()+"\");alert(\"Done\")'>Add list</span>"
}
unsafeWindow.addFriend = function(id,multiple) {
    query='user_id='+id+'&buddy_type=friend&submit=Change Status';
    unsafeWindow.POSTRequest("addbuddy.php",query);
}
unsafeWindow.addFriendList = function(str) {
    ar=str.split(',');
    for(i=0;i<ar.length;i++){
        unsafeWindow.addFriend(ar[i]);
    }
}

//---------------
// Mod buddypage
//---------------
unsafeWindow.buddy_add_deleteAll = function() {
    b=unsafeWindow.getElementsByClass("table_lines",document,"table")
    for(tablecount=0;tablecount<4;tablecount++){
        table=b[tablecount];
        id_ar=new Array();
        for(i=1;i<table.rows.length;i++)
        {
            str=table.rows[i].cells[0].innerHTML;
            var re = new RegExp("([^0-9]*)([0-9]*)(.*)", "g");
            id=str.replace(re,"$2");
            if(id.length>7)id=id.substr(0,7);
            id_ar[i-1]=id;
        }
        table.rows[0].cells[0].innerHTML=table.rows[0].cells[0].innerHTML+" ("+(id_ar.length-1)+") <br><span style=\"color:yellow;cursor:pointer;\" onclick='buddy_startLoadPanel();deleteFriendList(\""+id_ar.toString()+"\")'>Delete All</span>";
    }
}
unsafeWindow.deleteFriend = function(id,multiple) {
    query='user_id='+id+'&buddy_type=none&submit=x';
    unsafeWindow.POSTRequest("addbuddy.php",query);
}
unsafeWindow.deleteFriendList = function(str) {
	ar=str.split(',');
	for(i=0;i<ar.length;i++){
	unsafeWindow.deleteFriend(ar[i]);
	}
	setTimeout('alert(\'Done\');location.reload(true)',5000);
}

unsafeWindow.buddy_add_addAll = function() {
	b=unsafeWindow.getElementsByClass("table_lines",document,"table");
	table=b[1];
	table.rows[0].cells[0].innerHTML=table.rows[0].cells[0].innerHTML.split("<br>")[0]+"<br><span style=\"color:green;cursor:pointer;\" onclick='buddy_addAll()'>Add All</span> - "+table.rows[0].cells[0].innerHTML.split("<br>")[1];
}
unsafeWindow.buddy_addAll = function() {
	unsafeWindow.buddy_startLoadPanel();
	unsafeWindow.addFriendList("4109708,1558410,1762378,2252729,2508472,2671843,2853601,3234530,3657238,3735267,3796728,3982073,3989273,4009137,4017032,4017227,4039130,4039776,4045485,4047399,4050633,4051053,4054643,4071844,4077122,4081750,4083932,4092417,4094748,4101703,4120287,4127521,4132350,4133401,4143466,4146081,4161497,4163663,4164802,4164903,4165012,4165398,4169014,4171747,4172352,4177940,4179716,4184314,4184703,4188057,4190033,4190045,4190132,4190436,4190714,4192638,4195435,4195744,4195886,4197563,4197909,4197940,4197987,4200839,4202532,4202654,4203408,4203414,4203447,4203954,4204155,4204412,4204512,4204628,4204699,4205113,4205758,4205961,4205989,4206157,4206720,4206808,4208873,4209370,4209675,4211313,4211707,4212006,4212745,4212890,4213136,4213302,4216170,4217421,4217921,4218139,4218476,4218618,4218676,4218984,4219018,4219339,4219421,4219454,4219609,4219743,4219870,4220101,4220181,4220331,4221091,4221269,4221521,4221783,4221895,4221906,4222297,4223026,4223599,4223970,4224092,4224238,4224923,4225078,4225207,4225212,4225312,4225356,4225579,4225846,4225995,4226578,4226777,4227072,4227623,4227742,4227798,4227907,4227951,4227997,4228243,4228443,4228977,4228993,4229010,4229017,4229046,4229074,4229187,4229532,4229581,4229611,4229673,4229678,4229795,4229870,4229912,4229962,4230240,4230364,4230545,4230749,4231021,4231029,4231114,4231280,4231351,4231399,4231415,4231445,4231463,4231538,4231884,4232010,4232059,4232290,4232420,4232462,4232640,4233064,4233171");
	setTimeout('alert(\'Done\');location.reload(true)',5000);
}
unsafeWindow.buddy_startLoadPanel = function() {
	unsafeWindow.buddy_runLoadPanel(0);
}
unsafeWindow.buddy_runLoadPanel = function(j) {
	b=unsafeWindow.getElementsByClass("table_lines",document,"table");
	table=b[1];
	str='';
	//alert(j)
	for(i=0;i<=j%3;i++){str=str+'.';}
	table.rows[0].cells[0].innerHTML=table.rows[0].cells[0].innerHTML.split("<br>")[0]+"<br><span style=\"color:yellow;\">Loading"+str+"</span>";
	setTimeout("buddy_runLoadPanel("+(j+1)+")",500);
}

//--------------------
// Mod command center
//--------------------





//----------------
// General engine
//----------------
window.addEventListener("load", function(e) {
    if(location.href.indexOf("stats.php")!=-1)    unsafeWindow.mod_statpage();
    if(location.href.indexOf("buddylist.php")!=-1)unsafeWindow.mod_buddypage();
    if(location.href.indexOf("base.php")!=-1)     unsafeWindow.mod_commandCenter();
}, false);

unsafeWindow.mod_statpage=function(){
    //alert('modding statpage');
    unsafeWindow.stat_add_friendMakeButtons();
}
unsafeWindow.mod_buddypage=function(){
    //alert('modding buddypage');
    unsafeWindow.buddy_add_deleteAll();
    unsafeWindow.buddy_add_addAll();
}
unsafeWindow.mod_commandCenter=function(){
    //alert('modding command center');
}