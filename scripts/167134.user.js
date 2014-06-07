// ==UserScript==
// @name          Check dislikes
// @namespace      
// @description    Simple script made to display the percentage of likes/dislikes.
// @include        *//*.youtube.com/watch?*
// @version        1.2.1
// ==/UserScript==

// User-set variables
 likescolor="#090";
 dislikescolor="red";
 voidcolor="#666";
 ratingsdisabledtext="Ratings are disabled would you like to go back?";
 moredislikestext="I'm sorry there are more dislikes than there are likes, would you like to go back?";
 commentapprovaltext="This video has comment approval would you like to go back?";
//

// Helping functions
 function replace(a, x, y){for(i=0, b="";i<=a.toString().length;++i){if(a.toString().substring(i-(1), i)==x.toString()){b+=y;}else{b+=a.toString().substring(i-(1), i)}}return b;}
 function round(x){x=x.toString();if(x.toString().indexOf(".")==-1){ return Number(x); }else{ xstring=x.toString().substring(x.toString().indexOf(".")+1);phstring=xstring; for(i=0;i<=xstring.length;++i){ if((x.substring(x.toString().indexOf(".")+1, x.toString().indexOf(".")+2))>=5){ return Number(x.substring(0, x.toString().indexOf(".")))+1; }else if(phstring.length==1){ if(phstring>=5){ return Number(x.substring(0, x.toString().indexOf(".")))+1; }else{ return Number(x.substring(0, x.toString().indexOf("."))); } }else if(phstring.substring((phstring.length)-1)>=5){ if(((Number(phstring.substring((phstring.length), (phstring.length)-1))).toString())==="9" && ((Number(phstring.substring((phstring.length)-2, (phstring.length)-1))).toString())==="9"){ phstring=(Number(phstring.substring(0, (phstring.length)-2))+1).toString();++i; }else{ phstring=(Number(phstring.substring(0, (phstring.length)-1))+1).toString(); } }else{ phstring=phstring.substring(0, (phstring.length)-1); } } }return Number(x);}
// End Helping functions

// Code

 // Error Handler
  var confirmrd;
  var confirmmd;
  var confirmca;
  if(document.getElementById("watch7-views-info")==null){
   confirmrd=confirm(ratingsdisabledtext);
   if(confirmrd==true){
    window.history.go(-1);
   }
  }if((Number(replace(document.getElementsByClassName("likes-count")[0].innerHTML, ",", ""))) < (Number(replace(replace(document.getElementsByClassName("dislikes-count")[0].innerHTML, ",", ""), ",", "")))){
   confirmmd=confirm(moredislikestext);
   if(confirmmd==true){
    window.history.go(-1);
   }
  }if(document.getElementsByClassName("comments-approval-hold-warning needs-focus").length > 0){
   conirmca=confirm(commentapprovaltext);
   if(confirmca==true){
    window.history.go(-1);
   }
  }
 // End Error Handler

 // Variables (DON'T TOUCH THIS SECTION)
  ratingshtml=document.getElementById("watch7-views-info").innerHTML;
  ratingselement=document.getElementById("watch7-views-info");
  if(document.getElementsByClassName("likes-count")[0].innerHTML.toString().indexOf(",")>0){
   likescount=Number(replace(document.getElementsByClassName("likes-count")[0].innerHTML, ",", ""));
  }else{
   likescount=Number(document.getElementsByClassName("likes-count")[0].innerHTML);
  }if(document.getElementsByClassName("likes-count")[0].innerHTML.toString().indexOf(",")>0){
   dislikescount=Number(replace(document.getElementsByClassName("dislikes-count")[0].innerHTML, ",", ""));
  }else{
   dislikescount=Number(document.getElementsByClassName("dislikes-count")[0].innerHTML);
  }total=Number(likescount+dislikescount);
  voidelement=document.createElement("p");voidelement.style.color=voidcolor;voidelement.innerHTML="void";
  if(likescount==0 && dislikescount==0){
   ratingselement.appendChild(voidelement);
  }else{
   // Likes and dislikes percentage
    if(((100 / total)*likescount).toString().indexOf(".")==-1){
     likesper=((100 / total)*likescount);
    }else if(((100 / total)*likescount).toString().indexOf(".")>-1){
     likesper=round(Number((((100 / total)*likescount).toString().substring(0, (((100 / total)*likescount).toString().indexOf("."))+2))));
    }if(((100 / total)*dislikescount).toString().indexOf(".")==-1){
     dislikesper=((100 / total)*dislikescount);
    }else if(((100 / total)*dislikescount).toString().indexOf(".")>-1){
     dislikesper=round(Number((((100 / total)*dislikescount).toString().substring(0, (((100 / total)*dislikescount).toString().indexOf("."))+2))));
    }
   // End Likes and dislikes percentage
  }
 // End Variables

 // Action 
  ratingselement.innerHTML=ratingshtml + "<br/><span style='color:" + likescolor + ";'>" + likesper + "%</span>&nbsp;&nbsp;&nbsp;&nbsp;<span style='color:" + dislikescolor + ";'>" + dislikesper + "%</span>";
 // End Action

// End Code