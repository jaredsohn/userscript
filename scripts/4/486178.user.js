// ==UserScript==
// @name          Oldschool HF Userbars
// @namespace     uid=730772
// @description   Changes the new userbars to the oldschool ones.
// @include       *hackforums.net/*
// @version 	  1.4
// ==/UserScript==
var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    img=ilist[i]
    if(img.src == "http://www.hackforums.net/images/groupimages/english/admin.jpg") {
  img.src = "http://i.imgur.com/Hl1sM0X.png";
    }
    if(img.src == "http://www.hackforums.net/images/groupimages/english/staff.jpg")   {
  img.src = "http://i.imgur.com/G98Tmz7.png";
    }
    if(img.src == "http://www.hackforums.net/images/groupimages/english/ub3r.jpg") {
  img.src = "http://i.imgur.com/8CECyVp.png";
    }
    if(img.src == "http://www.hackforums.net/images/groupimages/english/l33t.jpg") {
  img.src = "http://i.imgur.com/oemjZbb.png";
    }
 if(img.src == "http://www.hackforums.net/images/groupimages/english/mentor.jpg") {
  img.src = "http://i.imgur.com/WuJTR3v.png";
    }
     if(img.src == "http://hackforums.net/images/groupimages/english/admin.jpg") {
  img.src = "http://i.imgur.com/Hl1sM0X.png";
    }
    if(img.src == "http://hackforums.net/images/groupimages/english/staff.jpg") {
  img.src = "http://i.imgur.com/G98Tmz7.png";
    }
    if(img.src == "http://hackforums.net/images/groupimages/english/ub3r.jpg") {
  img.src = "http://i.imgur.com/8CECyVp.png";
    }
    if(img.src == "http://hackforums.net/images/groupimages/english/l33t.jpg") {
  img.src = "http://i.imgur.com/oemjZbb.png";
    }
 if(img.src == "http://hackforums.net/images/groupimages/english/mentor.jpg") {
  img.src = "http://i.imgur.com/WuJTR3v.png";
    }
 if(img.src == "http://www.hackforums.net/images/groupimages/english/3p1c.jpg") {
  img.src = "http://i.imgur.com/VqomOF1.png";
    }
 if(img.src == "http://hackforums.net/images/groupimages/english/3p1c.jpg") {
  img.src = "http://i.imgur.com/VqomOF1.png";
    }
}