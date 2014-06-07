// ==UserScript==
// @name  HF Userbar Replacement - Mastery's Userbars - Coded by: Fox™
// @namespace  http://http://userscripts.org/scripts/show/181567/
// @version    0.1
// @description  Replaces userbars on HF, with even better ones. c;
// @match  http://*/*
// @copyright  2012+, Fox™
// ==/UserScript==
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://x.hackforums.net/images/modern/groupimages/english/admin.png") {
  img.src = "http://i.imgur.com/Ta41TO8.png";
    }
    if(img.src == "http://x.hackforums.net/images/modern/groupimages/english/staff.png") {
  img.src = "http://i.imgur.com/rC1gVpF.png";
    }
    if(img.src == "http://x.hackforums.net/images/modern/groupimages/english/ub3r.png") {
  img.src = "http://i.imgur.com/ANQjc2Q.png";
    }
    if(img.src == "http://x.hackforums.net/images/modern/groupimages/english/hf_l33t.png") {
  img.src = "http://i.imgur.com/tlNjNGs.png";
    }
}