// ==UserScript==
// @version        1.0.5
// @name           iwiw last online
// @namespace      iwiw_last_online
// @include        http://iwiw.hu/pages/main/index.jsp*
// @include        http://iwiw.hu/pages/user/userdata.jsp?userID=*
// ==/UserScript==
//---------------------------------------autoupdate
var scriptver = '1.0.5';
var CheckForUpdates = function(name,version) {
        var today = new Date();
        today = today.getDate();
        var lastupdate = GM_getValue('lastupdate',1000);
        var dif = today - lastupdate;
        var updatedays = 0; //how many days between update checks (set to 0 to check every time you visit userscripts.org)
        var uurl = 'http://userscripts.org/scripts/review/62372?format=txt';
                
        this.init = function()
        {
                if(dif>=updatedays || dif<=-updatedays)
                {
                        GM_setValue('lastupdate',today);
                        this.check();   
                }
        }

        this.check = function()
        {
//              alert("check! " + uurl);
                GM_xmlhttpRequest({method:"GET",url:uurl,onreadystatechange:this.doupdate});
        }

        this.doupdate = function(o)
        {
                if(o.readyState == 4)
                {
                        var checkver = o.responseText.substr(0,100);
                        checkver = checkver.split('@version')[1];
                        checkver = parseInt(checkver.replace(/\./g,''))+100;
                        var thisver = parseInt(version.replace(/\./g,''))+100;
//                      alert("new: " + checkver + " old: " + thisver);
                        if(checkver>thisver)
                        {
                                if(confirm('Update ' + name + ' ?'))
                                {
                                        window.location = 'http://userscripts.org/scripts/source/62372.user.js';
                                }
                        }
                        
                }
        }

this.init();
}

wloc = ''+window.location;
pattern = /iwiw.hu/;
result = wloc.match(pattern);
if(result){//check for updates
//alert("!");
CheckForUpdates('iwiw_last_online',scriptver);//CheckForUpdates(scriptname,scriptversion,scriptnumber);
}
//---------------------------------------
var arrayIndex = 0;
var userLink = 'http://iwiw.hu/pages/user/userdata.jsp?userID='
var usersToCheck = new Array();


Array.prototype.swap = function (x,y) {
  //alert("x: " + x + " y: " + y + " length: " + this.length);
  if ( y == -1 ){
    y = this.length-1;
  }
  if (y == this.length){
    y = 0;
  }
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

function addEvent(obj,evType,fn,useCapture){
  var ret = false;
  if(obj!=null){
        if(obj.addEventListener){
                obj.addEventListener(evType,fn,useCapture);
                ret=true;
          }
          else if(obj.attachEvent){
                obj.attachEvent("on"+evType,fn);ret=true;
          }
  }
  return ret;
}

function removeElement(elementID) {
  var d = document.getElementById(elementID);
  d.parentNode.removeChild(d);
}

function exchange_rows(i, j, tableID) {
        var oTable = document.getElementById(tableID);
        var trs = oTable.tBodies[0].getElementsByTagName("tr");

        if ( j == -1 ){
                j = trs.length-1;
        }
        if (j == trs.length){
                j = 0;
        }
        
        if(i == j+1) {
                oTable.tBodies[0].insertBefore(trs[i], trs[j]);
        } else if(j == i+1) {
                oTable.tBodies[0].insertBefore(trs[j], trs[i]);
        } else {
                var tmpNode = oTable.tBodies[0].replaceChild(trs[i], trs[j]);
                if(typeof(trs[i]) != "undefined") {
                        oTable.tBodies[0].insertBefore(tmpNode, trs[i]);
                } else {
                        oTable.appendChild(tmpNode);
                }
        }
}

function remove_row(i,tableID){
        var oTable = document.getElementById(tableID);
        oTable.deleteRow(i);
}

function moveDown(userID){
//  alert(usersToCheck);
  load_users(); 
  var idx = usersToCheck.indexOf(userID);
  usersToCheck.swap(idx,idx+1);
  save_users();
  exchange_rows(idx,idx+1,"lastlogin");
}

function moveUp(userID){
  load_users();
//  alert(userID);
  var idx = usersToCheck.indexOf(userID);
  usersToCheck.swap(idx,idx-1);
  save_users();
  exchange_rows(idx,idx-1,"lastlogin");
}

function remove_from_favorite(userID){
  load_users();
  var idx = usersToCheck.indexOf(userID);
  usersToCheck.splice(idx, 1);
  remove_row(idx,"lastlogin");
  save_users();
  //alert('Törölve!');
}

function add_to_favorite(userID){
  //alert(userID);
  load_users();
  if (usersToCheck.indexOf(userID)==-1){
    usersToCheck.push(userID);
    save_users();
        alert('Hozzáadva!');
  }else{
        alert('Már szerepel a listában!');
  }
}

function save_users(){
//save array
  //alert(usersToCheck);
  GM_setValue('usersToCheck', uneval(usersToCheck));
}

function load_users(){
//load_array
  usersToCheck = eval(GM_getValue('usersToCheck', '[]'));
}

//usersToCheck.reverse();

function GetUserLastLogin(results) {
        if (arrayIndex <= usersToCheck.length){
                if (results)  {
                //alert('1');
                        var userPage = document.createElement('div');
                        userPage.innerHTML = results.responseText;
                        var userName = userPage.getElementsByClassName('pageTitle')[0].getElementsByTagName('h1')[0].innerHTML;
                        if ((userName != 'törölt regisztráció') && (userName != 'ismeretlen')){
                                //alert(userName);
                                var userLastActive = userPage.getElementsByClassName('sidebar inverted numerology')[0].getElementsByTagName('P')[2].innerHTML;
                        }else{
                                var userLastActive = ':(';
                        }
        //              alert( userName + ' ' + userLastActive);
                        add_row("lastlogin",userName,userLastActive,usersToCheck[arrayIndex]);
                        arrayIndex++;
                }
                if (usersToCheck[arrayIndex]) {
                //alert('2');
                        GM_xmlhttpRequest({
                                'method': 'GET',
                                'url': userLink + usersToCheck[arrayIndex],
                                'onload': GetUserLastLogin
                                });
                }
        }
}

function GetUserId(str){
  return String(str).replace(/[^0-9]/gi, '');
}

function add_li(aParentNode){
  var new_li = document.createElement('li');
  aParentNode.appendChild(new_li);
  return new_li;
}

function add_link(aParentNode, aLinkSrc, aLinkText){
        var newLink = document.createElement('a');
        newLink.setAttribute('href',aLinkSrc);
        aParentNode.appendChild(newLink);

        var linkText = document.createTextNode(aLinkText);
        newLink.appendChild(linkText);
        return newLink;
}
        
function add_row(tablename,userName,userLast,userID){
        var table = document.getElementById(tablename);
        var oTR = table.insertRow(arrayIndex);

        var oTD = oTR.insertCell(0);
    var delLink = add_link(oTD,"#","X");
        delLink.addEventListener('click', foo=function(){remove_from_favorite(userID);}, false);    
        
        var oTD = oTR.insertCell(0);
        oTD.innerHTML = userLast;

        var oTD = oTR.insertCell(0);
        add_link(oTD,userLink + userID,userName);
        
        var oTD = oTR.insertCell(0);
    var link = add_link(oTD,"#","↓");
        link.addEventListener('click', foo=function(){moveDown(userID);}, false);    

        var oTD = oTR.insertCell(0);
    var link = add_link(oTD,"#","↑");
        link.addEventListener('click', foo=function(){moveUp(userID);}, false);    
}

function create_box(){
        var right_box = document.getElementsByClassName("grid_2 sidebar")[0];
		//alert(right_box.className);
		
        var oTbl = document.createElement("Table");
        oTbl.className = "sidebox appsBox";
        oTbl.setAttribute("border", "0");
        oTbl.setAttribute("width", "73px");
        oTbl.setAttribute("id","lastlogin");
        right_box.appendChild(oTbl);

        var oTH = document.createElement("caption");
        oTH.className = "box_head";
        oTH.setAttribute("style","font-weight: bold; text-align: left;");
        var oH3 = document.createElement("h3");
        oTH.appendChild(oH3);

        var oText = document.createTextNode("Kedvenc ismerősök v" + scriptver);
        oH3.appendChild(oText);
        oTbl.appendChild(oTH);
}

if ( String(location).indexOf(userLink) == -1 ){
  create_box();
  load_users();
  GetUserLastLogin();
}else{
  var currentUser = GetUserId(String(location));
  var userTitle = document.getElementsByClassName('actions')[0];
  var li = add_li(userTitle);
  var link = add_link(li,"#","Kedvenc ismerős");
  link.setAttribute('class','bogusLink');
  link.addEventListener('click', foo=function(){add_to_favorite(currentUser);}, false);
}
