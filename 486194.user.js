// ==UserScript==
// @name       OLD SCHOOL Hackforums Theme - made by Krew
// @namespace  OldSchoolHF.pw
// @version    1.1
// @description  This script replaces HF with the oldschool theme and images.
// @match       *://*.hackforums.net/*
// @copyright  2014 OldschoolHF.pw
// @run-at document-start
// ==/UserScript==


window.addEventListener('load', function() { 
var images = document.getElementsByTagName('img'); 
for (var i = 0; i < images.length; i++) { 
// Regular stars
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/starreg.png', 'http://oldschoolhf.pw/backup/HF/images/star.gif');
// L33t stars
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/starl33t.png', 'http://oldschoolhf.pw/backup/HF/images/star.gif'); 
// Ub3r stars
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/starub3r2.png', 'http://oldschoolhf.pw/backup/HF/images/ub3rstar.gif');
// Admin stars 
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/staradmin.png', 'http://oldschoolhf.pw/backup/HF/images/star.gif');
// Staff stars
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/starstaff.png', 'http://oldschoolhf.pw/backup/HF/images/staff_star1.png');
// Logo
images[i].src = images[i].src.replace('http://hackforums.net:8080/images/modern_pl/logo_pl.gif', 'http://oldschoolhf.pw/backup/HF/images/logo.jpg');
// L33t userbar 
images[i].src = images[i].src.replace('http://www.hackforums.net/images/groupimages/english/l33t.png', 'http://oldschoolhf.pw/backup/HF/images/hf_l33t.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/l33t.png', 'http://oldschoolhf.pw/backup/HF/images/hf_l33t.png');
// Ub3r userbar
images[i].src = images[i].src.replace('http://www.hackforums.net/images/groupimages/english/ub3r.png', 'http://oldschoolhf.pw/backup/HF/images/ub3r.gif');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/ub3r.png', 'http://oldschoolhf.pw/backup/HF/images/ub3r.gif');
// Admin userbar
images[i].src = images[i].src.replace('http://www.hackforums.net/images/groupimages/english/admin2.png', 'http://oldschoolhf.pw/backup/HF/images/admin.jpg');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/admin-bar.png', 'http://oldschoolhf.pw/backup/HF/images/admin.jpg');
// Staff userbar
images[i].src = images[i].src.replace('http://www.hackforums.net/images/groupimages/english/staff.png', 'http://oldschoolhf.pw/backup/HF/images/staff.png');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/staff.png', 'http://oldschoolhf.pw/backup/HF/images/staff.png');
// Mentor userbar
images[i].src = images[i].src.replace('http://www.hackforums.net/images/groupimages/english/mentor.jpg', 'http://oldschoolhf.pw/backup/HF/images/mentor.jpg');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/groupimages/english/mentor.png', 'http://oldschoolhf.pw/backup/HF/images/mentor.jpg');  
// Important theme related st00f
images[i].src = images[i].src.replace('http://x.hackforums.net/images/modern_bl/minion.gif', 'http://oldschoolhf.pw/backup/HF/images/minion.gif');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/blackreign/buddy_offline.gif', 'http://oldschoolhf.pw/backup/HF/images/buddy_offline.gif');
images[i].src = images[i].src.replace('http://x.hackforums.net/images/blackreign/buddy_online.gif', 'http://oldschoolhf.pw/backup/HF/images/buddy_online.gif');

} 
}, false);

function addStyleSheet(style){
  var elementStyle= document.getElementsByTagName("HEAD")[0].appendChild(window.document.createElement('style'));
  elementStyle.innerHTML = style;
  return elementStyle;
}

function removejscssfile(filename, filetype){
 var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist from
 var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
 var allsuspects=document.getElementsByTagName(targetelement);
 for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
  if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
   allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
 }
}

removejscssfile('global.css', 'css', 'tabbed.css');
addStyleSheet('@import "http://oldschoolhf.pw/backup/HF/global.css";\n@import "http://oldschoolhf.pw/backup/HF/tabbed.css";\n@import "http://oldschoolhf.pw/backup/HF/star_rating.css";');