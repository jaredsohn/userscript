// ==UserScript==
// @name           Castle Age Army Mass Add
// @namespace      http://userscripts.org/users/ahmedabdou
// @description    Adds all CA Players from your friends list to your army.
// @include        http*://apps.*facebook.com/castle_age/army.php*
// @include        http*://apps.*facebook.com/castle_age/gift.php?app_friends=c&giftSelection=1
// ==/UserScript==


var navbar;
navbar = document.getElementById('app46755028429_equippedGeneralContainer');

if(window.location.href == "http://apps.facebook.com/castle_age/army.php")
{   
    var logo = document.createElement("div");

logo.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 0.2em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" value="Enumerate" style="width: 6em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
navbar.parentNode.insertBefore(logo, navbar);

button=document.getElementById("btn1");
button.addEventListener("click", armyrunall, false);
}

if(window.location.href == "http://apps.facebook.com/castle_age/gift.php?app_friends=c&giftSelection=1")
{
var temp = new Array;
temp = eval(GM_getValue('FList', '[]'));
var logo = document.createElement("div");
if(temp.length!=0)
{
logo.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" value="Enumerate" disabled="disabled" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id="btn2" name="EV" type="button" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
navbar.parentNode.insertBefore(logo, navbar);

button=document.getElementById("btn2");
button.addEventListener("click", giftrunall, false); 
}
else
{
logo.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family:Verdana; text-align:center; '+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" bgcolor="">' +
    '<colgroup style="width: 42em" />' +
    '<tr>' + '<td>' +
    'Either all your friends playing Castle Age are members in your Army,' +
    ' or you need to load the Army page first for the script to function correctly.' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    navbar.parentNode.insertBefore(logo, navbar);
}
}

function armyrunall()
{
GM_deleteValue("FList");
var Army = document.evaluate("//DIV[@class='condensed_multi_friend_selector']/DIV/LABEL/INPUT", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var j = Army.snapshotLength / 2;
var i = j - 1;
var FRList = new Array();
var FBID = Army.snapshotItem(i);
while (i>=0)
    {
	 var fbidtext = FBID.value;
	 FRList.push(fbidtext);
	 i--;
	 FBID = Army.snapshotItem(i);
	 }
GM_setValue('FList', uneval(FRList));
window.location.href = 'http://apps.facebook.com/castle_age/gift.php?app_friends=c&giftSelection=1';
}

function giftrunall()
{
var LoadedList = new Array();
LoadedList = eval(GM_getValue('FList', '[]'));
var alllist = LoadedList.join('\n');
var Army = document.evaluate("//DIV[@class='condensed_multi_friend_selector']/DIV/LABEL/INPUT", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var j = Army.snapshotLength / 2;
var i = j - 1;
var FRList = new Array();
var FBID = Army.snapshotItem(i);
while (i>=0)
    {
	 var fbidtext = FBID.value;
	 FRList.push(fbidtext);
	 i--;
	 FBID = Army.snapshotItem(i);
	 }
var anythingfound = 0;
var FinalList = new Array();
for(var fc = LoadedList.length - 1; fc>=0 ; fc--)
	 { 
	 var found = 0;
     for(var lc = FRList.length - 1; lc>=0 ; lc--)
            if(LoadedList[fc]==FRList[lc])
                {
                found=1;
                anythingfound++;
                }
                
if(found!=0)
     FinalList.push(LoadedList[fc]);                
                
     }

GM_deleteValue('FList');

var armyno = FinalList.length;

 
var logo2 = document.createElement("div");
if(anythingfound==0)
    {
    logo2.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" disabled="disabled" value="Enumerate" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'All Friends Playing CA are members in your Army ' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    }
     else
     {
     logo2.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" disabled="disabled" value="Enumerate" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Found '+ armyno +' not in Army' + '</td>' + '<td align="right">' +
    '<input id ="btn3" name="addtoarmy" type="button" value="Add" style="width: 6em"/>' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    }
navbar.parentNode.insertBefore(logo2, navbar);

button3=document.getElementById("btn3");
button3.addEventListener("click", addtoarmy, false); 


function addtoarmy()
{

var arrayDomains = new Array ( ), timer ;
var ii = FinalList.length - 1;

logo2.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" disabled="disabled" value="Enumerate" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Adding ' + FinalList.length + ' friends to your Army . . . . . . .' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    navbar.parentNode.insertBefore(logo2, navbar);


    
function startXmlHttp ( numX, respondText) {

if ( numX < arrayDomains.length ) {
var url = arrayDomains [ numX ];

GM_xmlhttpRequest({
method: 'GET', url: url,
onreadystatechange: function (responseDetails) {
if (responseDetails.status == 404) {   // file not found
startXmlHttp ( ++numX, " ");    // recursion
} else if (responseDetails.status == 200) {   // file found
startXmlHttp ( ++numX, responseDetails.responseText);   // recursion
}
},
});
}


var logo4 = document.createElement("div");
logo4.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" disabled="disabled" value="Enumerate" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    (FinalList.length-numX) +' remaining ...' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    navbar.parentNode.insertBefore(logo4, navbar);

if(numX==arrayDomains.length)
{
var logo3 = document.createElement("div");
logo3.innerHTML = '<div style="position:absolute;top:200px;left:140px; float: left; font-family: Verdana; text-align:left;'+
    'font-size: 1em !important; font-variant:small-caps; background-color: grey; border:0.2em solid black; ' +
    'color: black;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
    '<tr>' + '<td>' +
    'Click Here To Enumerate All Unadded Friends ' + '</td>' + '<td>' +
    '<input id="btn1" name="EN" type="button" disabled="disabled" value="Enumerate" style="width: 6em" />' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    'Click Here To Evaluate Against Friends Who Play CA ' + '</td>' + '<td>' +
    '<input id ="btn2" name="EV" type="button" disabled="disabled" value="Evaluate" style="width: 6em"/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    FinalList.length +' friend(s) have been added to your Army' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
    navbar.parentNode.insertBefore(logo3, navbar);
    
}
}

while (ii>=0)
    {
    arrayDomains.push("http://apps.facebook.com/castle_age/index.php?&lka="+FinalList[ii]);
	 ii--;
	 }

startXmlHttp( 0 , " ");





}

}

