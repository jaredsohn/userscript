// ==UserScript==
// @name           Account Age
// @namespace      Account Age
// @description    Calculates the age, in days, of each account. Originally by SpeedySurfer; fixed by wubby118
// @include        http://*bungie.net/Account/Profile.aspx*
// ==/UserScript==

document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/"); document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML = document.getElementById('ctl00_mainContent_lblMemberSince2').innerHTML.replace("." ,"/");

var date1 = new Date(document.getElementById('ctl00_mainContent_lblMemberSince2').lastChild.data);
  var date2 = new Date();
  date2day=date2.getDate();
  date2month=date2.getMonth()+1;
  date2year=date2.getFullYear();
  date2= new Date(date2month +"/"+ date2day +"/"+ date2year);
  var daysApart = Math.abs(Math.round((date2-date1)/86400000));
function insertAge()
{
var profilebox = document.getElementsByClassName('profile');
profilebox[0].innerHTML = profilebox[0].innerHTML.replace("</span></li>" ,"</span></li><li style=\"background: url(http://www.bungie.net/images/base_struct_images/forums/IconBungie.gif) no-repeat scroll left center; padding-left: 40px; margin-left: 12px;\">Account Age: <span id=\"ctl00_mainContent_lblDaysApart\">"+daysApart+" Days</span></li>")
}
insertAge();

// Yes, I totally made up that ID above. But it looks pretty legit like ma br yo.
// Snakie owes me. 4realz.