// ==UserScript==
// @name           Super Tumblr Reblog
// @namespace      http://userscripts.org/users/smrots
// @description    Reblog like a boss
//                 
//                 * Press 1, 2, 3, ... through 0 to select your blogs
//                 * Change your default blog
//                 * Press r key to reblog from a post page
//                 Handcrafted by http://userscripts.org/users/smrots
// @include        http://www.tumblr.com/reblog/*
// @include        http://*.tumblr.com*
// @include        http://www.tumblr.com/dashboard*
// @version        1.0
// @run-at         document-start
// @grant          none
// ==/UserScript==

/*
 * Modify the line below to select your default blog:
 */
var defaultBlogIndex = 0;

var lastSeenPostOptions = null;
var lastSeenMCEframe = null;
var blogLink = null;
var blogName = null;
var devMode = false;

function setTimeoutCheck()
{
  var po = document.getElementById("post_options");
  if (po && po != lastSeenPostOptions)
  {
    /*
     * Select default blog
     */
    selectBlog(defaultBlogIndex);
  }
    
  var mceFrame = document.getElementById("post_two_ifr");
  if (mceFrame && mceFrame != lastSeenMCEframe && devMode)
  {
      lastSeenMCEframe = mceFrame;
      lastSeenMCEframe.contentWindow.document.body.innerHTML = "";
  }

  setTimeout(setTimeoutCheck, 100);
}

// main loop that checks for page changes
setTimeoutCheck(); 

function selectPostAction(actionIdx)
{
  var po = document.getElementById("post_options");
  if (!po)
    return;

  lastSeenPostOptions = po;
  var actionSelector = po.children[0].children[0].children[0];
  if (actionSelector)
    actionSelector.children[actionIdx].children[0].click();
}

function selectBlog(blogIdx) 
{
  choices = document.getElementById("tumblelog_choices");
  if (choices)
  {
    var blogButton = choices.children[0].children[1].children[0].children[blogIdx];
    if (blogButton)
    {
      blogButton.children[0].click();
      indicator = document.getElementById('super-reblog-indicator');
      if (indicator)
      {
        indicator.innerHTML = '<small>SuperTumblrReblog posting to ' 
            + blogButton.children[0].innerHTML + '</small>';
      }
        
      if (devMode)
      {
      	blogName = blogButton.children[0].getAttribute("data-option-value");
      	blogLink = blogButton.children[0].getAttribute("data-blog-url");
      }
    }
  }
}

function getParam(url, name) 
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if (results == null)
    return "";
  else
    return results[1];
}

document.onkeyup=function(e)
{
  var unicode = e.keyCode? e.keyCode : e.charCode;
  if (unicode == 82) // r
  {
    /* 
     * Bind r key to reblog from post page
     */
    var ctrl = document.getElementById('tumblr_controls');
    if (ctrl)
    {
      var url = ctrl.getAttribute('src');
      var pid  = getParam(url, 'pid');
      var rk  = getParam(url, 'rk');
      var redirectUrl = getParam(url, 'url') + 'post%2F' + pid;
      window.location.href = "http://www.tumblr.com/reblog/" + pid + "/" + rk + '?redirect_to=' + redirectUrl;
    }
  }
  if (unicode >= 48 && unicode <= 57) // {1,2,3,4,5,6,7,8,9,0}
  {
    var blogIdx = (unicode - 48);
    selectBlog(blogIdx);
  }

  if (unicode == 68 && devMode) // d
  {
    var parts = document.URL.split("/");
    if (parts[3] == 'dashboard')
    {
        var pageNum = parts[4];
        if (!pageNum) pageNum = 0;
        var incr = Math.floor((Math.random()*100)+1);
        var targetPageNum = parseInt(pageNum) + incr;
        window.location.href = "http://tumblr.com/dashboard/" + targetPageNum;
    }
    //document.getElementById("next_page_link").click();
  }
  if (unicode == 65 && devMode) // a
  {
     document.getElementById("previous_page_link").click();
  }

  if (unicode == 113) // F2
  {
    if (lastSeenMCEframe && blogLink && blogName)
    {        
    	lastSeenMCEframe.contentWindow.document.body.innerHTML 
        	+= "<p>- <a href=\"" + blogLink + "\">" + blogName + "</p>";
    }
    
    document.getElementById("create_post").children[0].click();
  }

  if (unicode == 115) // F4
  {
    window.location.href = 'http://' + document.location.hostname + '/archive';
  }

  if (unicode == 192) // `
  {
    selectPostAction(0);
  }

  //alert (unicode);
};