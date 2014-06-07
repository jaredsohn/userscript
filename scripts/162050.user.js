// ==UserScript==
// @author      TheEvil 
// @name		Travian ally distance to XY
// @namespace	userscripts.org
// @description	calculate the nearest ally member to XY point
// @include     http://*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @exclude     http://help.travian.*
// @exclude     http://*.travian.*/logout.php
// @exclude     http://ads*/*
// @exclude     http://*survey.travian.*
// @exclude     http://*travian*anmelden.php
// @exclude     http://*travian*manual.php*
// @grant       none
// @version     1.1
// ==/UserScript==



var targetX = 0;
var targetY = -24;
var villages=new Object();
var villagesDistance=new Object();
var users=Array();
var nearestMemberProgress;
var nearestXControl;
var nearestYControl;
var AllyID = "";

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}



function fetchAllyUsers(){

    if (AllyID==0)AllyID="";
	var req = new Request.HTML({
	    url: '/allianz.php',
        evalScripts : false,
	    noCache: true,
	    async: false,
	    onSuccess: function( responseTree, responseElements /*more*/  ) {
            console.debug('A Success');
    
    		var tblMembers = responseElements.filter('#member .pla a');        

            var stophere = false;
            tblMembers.forEach(function(a,b,c){
                nearestMemberProgress.set('text',(Math.round(b/tblMembers.length*100)) + '%');

                if (stophere)return;
                var userid=a.get('href').substring(16);
                var username=a.get('text');
                users[userid]=username;
                fetchUserVillages(userid);
                //stophere=true;
            });
            displayResults();
        },
        onFailure: function(xhr){
            alert("Error " + xhr.status);
        }
        
	}).get({aid:AllyID,rand:new Date().getTime()});

    //console.debug(users[2424]);
}

function searchNeighbors(){
    targetX = 0;
    targetY = 0;
    try{
        targetX = parseInt(nearestXControl.value);
        targetY = parseInt(nearestYControl.value);
        
        if (isNaN(targetX)) targetX = 0;
        if (isNaN(targetY)) targetY = 0;
        setCookie('nearestTargetX',targetX);
        setCookie('nearestTargetY',targetY);
    }catch(e){
    
    }

    AllyID = getParameterByName('aid');
    users=Array();
    villages=new Object();
    villagesDistance=new Object();
    
    displayWait();
    fetchAllyUsers();
}
//fetchAllyUsers("665");

function displayNearestControls(){
    $$("#nearestMemberControl").dispose();
    $$("#nearestMember").dispose();
    
    var injectionPos;
    
    if ($$(".alliance #memberTitles").length==0){
        injectionPos = $$(".alliance #details")[0];
    }else{
        injectionPos = $$(".alliance #memberTitles")[0];
    }
    
    var injectionHTML = '<div id="nearestMemberControl">' + 
    '<h4 class="round">هاك اقرب اﻷعضاء - برمجة <a href="http://ts5.travian.com.eg/spieler.php?uid=85170" target="_blank">TheEvil</a></h4>' + 
    '<table cellpadding="1" cellspacing="1">' + 
    '					أدخل احداثيات القرية أو الواحة التي تريد حساب المسافة إليها' + 
    '					<tr>' + 
    '						<td>الإحداثي Y</td>' + 
    '						<td><input id="nearestY" class="text coordinates y" value="0" dir="ltr" /></td>' + 
    '						<td>الإحداثي X</td>' + 
    '						<td><input id="nearestX" class="text coordinates x" value="0" dir="ltr" /></td>' + 
    '					</tr></table><br/><center>' + 
    '    <button type="button" value="احسب" id="btnsearchNeighbors">' + 
    '	<div class="button-container">' + 
    '		<div class="button-position">' + 
    '			<div class="btl">' + 
    '				<div class="btr">' + 
    '					<div class="btc"></div>' + 
    '				</div>' + 
    '			</div>' + 
    '			<div class="bml">' + 
    '				<div class="bmr">' + 
    '					<div class="bmc"></div>' + 
    '				</div>' + 
    '			</div>' + 
    '			<div class="bbl">' + 
    '				<div class="bbr">' + 
    '					<div class="bbc"></div>' + 
    '				</div>' + 
    '			</div>' + 
    '		</div>' + 
    '		<div class="button-contents">' + 
    '			احسب		</div>' + 
    '	</div>' + 
    '</button></center>' + 
    '					<br/></div>';
    var injectionElement = Elements.from(injectionHTML);
    injectionPos.parentNode.insertBefore(injectionElement[0], injectionPos.nextSibling.nextSibling.nextSibling);
    
    $(injectionElement[0]).getElements('#btnsearchNeighbors')[0].addEvent('click', function(){
        searchNeighbors();
    });
    
    nearestXControl = $(injectionElement[0]).getElements('#nearestX')[0];
    nearestYControl = $(injectionElement[0]).getElements('#nearestY')[0];
    
    var c_nearestTargetX = getCookie('nearestTargetX');
    var c_nearestTargetY = getCookie('nearestTargetY');
    
    if (typeof c_nearestTargetX !== "undefined")nearestXControl.value=c_nearestTargetX;
    if (typeof c_nearestTargetY !== "undefined")nearestYControl.value=c_nearestTargetY;
  
}

///////////////////////////////////

function fetchUserVillages(userid){

	var req = new Request.HTML({
	    url: '/spieler.php',
        evalScripts : false,
	    noCache: true,
	    async: false,
	    onSuccess: function( responseTree, responseElements /*more*/  ) {
            console.debug('U Success');
    
    		var tblVillages = responseElements.filter('#villages tbody tr');        
            //var tblVillages = $$('#villages tbody tr');

            tblVillages.forEach(function(a,b,c){
                var villageName = a.getElements('td.name a').get('text');
                var villageLink = a.getElements('td.name a').get('href');
                var villageX = a.getElements('td.coords .coordinateX')[0].get('text').replace('(','').replace(')','');
                var villageY = a.getElements('td.coords .coordinateY')[0].get('text').replace('(','').replace(')','');
                var villageKey = villageX + '|' + villageY;
                var distance = Math.round(Math.sqrt(Math.pow(targetX-villageX,2)+Math.pow(targetY-villageY,2))*100)/100;
                villagesDistance[villageKey]=distance;
                villages[villageKey]=new Object();
                villages[villageKey].villageName=villageName;
                villages[villageKey].villageLink=villageLink;
                villages[villageKey].villageX=villageX;
                villages[villageKey].villageY=villageY;
                villages[villageKey].villageKey=villageKey;
                villages[villageKey].distance=distance;
                villages[villageKey].userid=userid;
                
            });
        },
        onFailure: function(xhr){
            alert("Error " + xhr.status);
        }
        
	}).get({uid:userid,rand:new Date().getTime()});
    
}

function displayWait(){
    $$("#nearestMember").dispose();

    var injectionPos = $$("#nearestMemberControl")[0];
    var injectionHTML = '<div id="nearestMember">' + 
    '<h4 class="round">اقرب اﻷعضاء إلى &nbsp; <a target="_blank" href="/karte.php?x=' + targetX + '&y=' + targetY + '">X:' + targetX + ' &nbsp; Y:' + targetY + '</a></h4><center>' + 
    'جاري البحث, رجاء الانتظار' + 
    '<br /><div id="nearestMemberProgress">0%</div>'; 

    injectionHTML += '</center><br></div>';
    
    var injectionElement = Elements.from(injectionHTML);
    injectionPos.parentNode.insertBefore(injectionElement[0], injectionPos.nextSibling);
    nearestMemberProgress = $(injectionElement[0]).getElements('#nearestMemberProgress')[0];

}


function displayResults(){
    $$("#nearestMember").dispose();

    var injectionPos = $$("#nearestMemberControl")[0];
    var injectionHTML = '<div id="nearestMember">' + 
    '<h4 class="round">اقرب اﻷعضاء إلى &nbsp; <a target="_blank" href="/karte.php?x=' + targetX + '&y=' + targetY + '">X:' + targetX + ' &nbsp; Y:' + targetY + '</a></h4>' + 
    '<table cellpadding="1" cellspacing="1">' + 
    '				<thead>' + 
    '					<tr>' + 
    '						<th>م</th>' + 
    '						<th>القرية</th>' + 
    '						<th>اللاعب</th>' + 
    '						<th>المسافة</th>' + 
    '					</tr>' + 
    '				</thead>' + 
    '				<tbody>'; 

    var villagesDistanceSorted = new Array();
    for (var villageKey in villagesDistance)villagesDistanceSorted.push([villageKey, villagesDistance[villageKey]])
    villagesDistanceSorted.sort(function(a, b) {return a[1] - b[1]})

    var i=0;
    villagesDistanceSorted.forEach(function(a,b,c){
        i++;
        var villageKey=a[0];
        var village = villages[villageKey];
        injectionHTML += '<tr>';
        injectionHTML += '<td class="hab">' + i + '</td>';
        injectionHTML += '<td class="vil"><a target="_blank" href="' + village.villageLink + '">' + village.villageName + '</a></td>';
        injectionHTML += '<td class="pla"><a target="_blank" href="/spieler.php?uid=' + village.userid + '">' + users[village.userid] + '</a></td>';
        injectionHTML += '<td class="hab">' + village.distance + '</td>';
        injectionHTML += '</tr>';
    });
    
    injectionHTML += '</tbody></table><br></div>';
    
    var injectionElement = Elements.from(injectionHTML);
    injectionPos.parentNode.insertBefore(injectionElement[0], injectionPos.nextSibling);
    
}

if ($$(".alliance #details").length==1){
    displayNearestControls();

    //fetchAllyUsers();
}


function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
