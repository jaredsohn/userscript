// ==UserScript==
// @name           Friends Request
// @namespace      www.bungie.net
// @description     Lets you add peoples gamertags from their profiles by clicking a little button.
// @include        http://*bungie.net/Account/Profile.aspx?memberID=*
// @include        http://*bungie.net/Account/Profile.aspx?uID=*
// @version        1
// @author         ApocalypeX
// ==/UserScript==
var t = 0;
var xblgtava = document.getElementById('ctl00_mainContent_header_gtFloatLabel');

if(xblgtava){
document.getElementById('ctl00_mainContent_header_gtFloatLabel').innerHTML += '<a id="addFRIEND" href="#de45"><img width="15" height="15" src="http://www.clker.com/cliparts/2/f/6/1/11949856271997454136tasto_2_architetto_franc_01.svg.med.png" /></a>';
var addfriendbutton = document.getElementById('addFRIEND');
addfriendbutton.addEventListener("click", sendFR, true);

}

function sendFR(){
var gt = document.getElementById('ctl00_mainContent_header_gamertagLinkFloat').innerHTML;

if(t<1){
var requesthref = "http://live.xbox.com/en-GB/profile/FriendsMgmt.aspx?ru=%252fen-GB%252fprofile%252fprofile.aspx%253fpp%253d0%2526GamerTag%253d"+gt+"&gt="+gt+"&act=Add"
GM_xmlhttpRequest({
    method: "get",
    url: requesthref,
    onload: function(response)
    {
        var confirmation = response.responseText;
if(confirmation.search("You have added") > -1){
alert("You have successfully added "+gt+"!")
}
else{
alert("Your request was unsuccessful. Your friends list may be full or "+gt+"\'s friends list is full")
}
    }
});
}
else{
alert("Please wait...You have already tried adding "+gt+"!");
}
t++
}