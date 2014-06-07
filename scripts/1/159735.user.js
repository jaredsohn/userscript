// ==UserScript==
// @name           Auto filler
// @namespace      ASD
// @description    Auto filler
// @include        https://www.google.com/accounts/ServiceLogin*
// @include        https://www.google.com/accounts/Login*
// @include        https://www.google.com/groups/signin*
// @include        https://www.google.com/settings/account*
// @include        https://accounts.google.com/ServiceLoginAuth*
// ==/UserScript==


// https://accounts.google.com/ServiceLoginAuth?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3Dupload%26hl%3Den_US%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fmy_videos_upload%26nomobiletemp%3D1&service=youtube&uilel=3&hl=en_US&vyral=true&email=webmaster@jtfield.com&pw=JobTrack123
// https://accounts.google.com/ServiceLoginAuth?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3Dupload%26hl%3Den_US%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fmy_videos_upload%26nomobiletemp%3D1&service=youtube&uilel=3&hl=en_US&vyral=true&email=jmiller5@usinternet.com&pw=Pliers123

function letsLogin(sEmail, sPw) {
    document.getElementById("Email").value = sEmail;
    document.getElementById("Passwd").value = sPw;
    document.getElementById("Email").form.submit();
    
//    window.location = "https://www.youtube.com/my_videos_upload";
}


function getQueryVariable(query, variable) { 
//  var query = window.location.search.substring(1); 
  var vars = query.split("&"); 
  for (var i=0;i<vars.length;i++) { 
    var pair = vars[i].split("="); 
    if (pair[0] == variable) { 
      return pair[1]; 
    } 
  } 
} 

sLoc = location.toString();
if (sLoc.indexOf("vyral") > 0){
  var sEmail = getQueryVariable(sLoc, "email");
  var sPw    = getQueryVariable(sLoc, "pw");
  if (sEmail && sPw){
    letsLogin(sEmail, sPw);
  }
} else if (sLoc.indexOf("settings/account") > 0){
  window.location = "https://www.youtube.com/my_videos_upload";
}