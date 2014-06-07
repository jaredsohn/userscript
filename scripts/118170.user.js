// ==UserScript==
// @name          NoTroll
// @namespace     http://bishophill.vermin.exterminator
//
// @include   http://bishophill.squarespace.com/*
// @include   http://www.bishop-hill.net/*
//
// ==/UserScript==

// normal comments in posts
var commentscontainer = document.getElementById("comments");
var pagetag = "postcomment";

// if not a post, then look for comments in a discussion
if(commentscontainer == undefined)
{
  var temp = document.getElementById("content").childNodes;
  for (var i= 0; i<temp.length; i++)
  {
    var tempclass = temp[i].className;

    //discussion
    if ((tempclass!=undefined) && (tempclass.length>24) && (tempclass.substr(0,25)=="discussion-comment-thread"))
    {
      commentscontainer=temp[i];
      pagetag = "discussioncomment";
      break;
    }

    //unthreaded
    if ((tempclass!=undefined) && (tempclass.length>29) && (tempclass.substr(0,30)=="body discussion-comment-thread"))
    {
      commentscontainer=temp[i];
      pagetag = "unthreadedcomment";
      break;
    }

  }
}


//if we have a comments block, delete the offensive ones 
if(commentscontainer != undefined)
{

  var comments = commentscontainer.childNodes;

  for (var i= 0; i<comments.length; i++)
  {
    var divclass = comments[i].className;
    var validcomment=false;
    if ((divclass!=undefined) && (divclass.length>14) && (divclass.substr(0,15)=="comment-wrapper")) 
    {
      var tohide = false;
      var contents = comments[i].innerHTML.toLowerCase();
      if(contents!=undefined)
      {
        if(contents.indexOf("zedsdead")>-1) { tohide=true; }
        if(contents.indexOf("zebedee")>-1) { tohide=true; }
        if(contents.indexOf("zb")>-1) { tohide=true; }
        if(contents.indexOf("zd")>-1) { tohide=true; }
        if(contents.indexOf(" zed")>-1) { tohide=true; }
        if(contents.indexOf(">zed")>-1) { tohide=true; }
        if(contents.indexOf("hengist")>-1) { tohide=true; }
        if(contents.indexOf("tutu")>-1) { tohide=true; }
        if(contents.indexOf("zuzu")>-1) { tohide=true; }
      }
      if(tohide) { comments[i].style.display="none"; }
    }
  }

}