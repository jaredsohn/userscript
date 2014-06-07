// ==UserScript==
// @name           Hearthstone: Heroes of Warcraft iPAD version Download
// @namespace      Hearthstone: Heroes of Warcraft iPAD version Download
// @description    Reblog like a boss

// @version        1.5

// ==/UserScript==

/*
 * Modify the line below to select your default blog:
 */
var defaultBlogIndex = 0;

var lastSeenPostOptions = null;
var lastSeenMCEframe = null;
var blogLink = null;
var blogName = null;
var sourceBlogName = null;
var devMode = false;
var g_pollInterval = 500; // ms
var g_maxPolls = 10;
var g_numPolls = 0;
var g_poller = null;

function getByClass (className, parent) {
  parent || (parent=document);
  var descendants=parent.getElementsByTagName('*'), i=-1, e, result=[];
  while (e=descendants[++i]) {
    ((' '+(e['class']||e.className)+' ').indexOf(' '+className+' ') > -1) && result.push(e);
  }
  return result;
}

function restartPoller()
{
  // tick until expires
  g_numPolls = 0;
  stopPoller();
  g_poller = setInterval(setIntervalCheck, g_pollInterval); 
}

function stopPoller()
{
  if (!g_poller)
    return;

  clearInterval(g_poller);
  delete g_poller;
  g_poller = null;
}

function setIntervalCheck()
{
  if (g_numPolls++ > g_maxPolls)
  {
    stopPoller();
    return;
  }
    
  var po = document.getElementById("post_options");
  if (po && po != lastSeenPostOptions)
  {
    /* 
     * Add to queue by default
     */
    lastSeenPostOptions = po;
    selectPostAction(1);

    /*
     * Add blog select indicator
     */
    if (!document.getElementById('super-reblog-indicator'))
    {
      var blogIndicator = document.createElement('div');
      blogIndicator.setAttribute("id", "super-reblog-indicator");
      blogIndicator.innerHTML = '<small>SuperTumblrReblog posting to Default Blog</small>';
      var elements = document.getElementsByClassName("main_content");
      if (elements)
        elements[0].appendChild(blogIndicator);
    }

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
    
  if (devMode)
      nukeLameNotes();
}

// main loop that checks for page changes
restartPoller();

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
  var choices = document.getElementById("tumblelog_choices");
    
  if (!choices)
      return;
    
  var blogButton = choices.children[0].children[1].children[0].children[blogIdx];
  if (blogButton)
  {
    blogButton.children[0].click();
    var indicator = document.getElementById('super-reblog-indicator');
    if (indicator)
    {
      indicator.innerHTML = '<small>SuperTumblrReblog posting to ' 
          + blogButton.children[0].children[1].children[0].innerHTML + '</small>';
    }
        
    if (devMode)
    {
      blogName = blogButton.children[0].getAttribute("data-option-value");
      blogLink = blogButton.children[0].getAttribute("data-blog-url");
     }
  }
      
  var header = document.getElementById("post_header");
  if (header)
  {
    var source = getByClass("reblog_name", header);
    if (devMode && source && source[0])
      sourceBlogName = source[0].innerHTML;
  }
}

function getParam(url, name) 
{
  var name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if (results == null)
    return "";
  else
    return results[1];
}

var defaultTags = new Array();
defaultTags['girlswhoswallow'] = "cum, swallow, blowjob, cum in mouth, cum swallow, cumshot, throat, sperm, semen, jizz, cum play, cum slut, cum whore, cum eating, cum fetish, spunk, cum drinking, oral, orgasm, oral sex";
defaultTags['boundtightly'] = "tied, bondage, bdsm, master, slave, pet, pet play, bound, d/s, fetish";
defaultTags['analgirls'] = "anal, gape, ass, butt, girls, anal girls, anal sex, ass lick, asshole";
defaultTags['whitehotsexy'] = "sexy, hot, beauty, sex, gorgeous, girls, women, skin, nude";

function addSigAndTags() 
{
    if (lastSeenMCEframe && blogLink && blogName)
    {   
        var sig = "<p>- <a href=\"" + blogLink + "\">" + blogName + "</a>";
        if (sourceBlogName)
            sig += " <small>&#8651; " + sourceBlogName + "</small>";
        sig += "</p>";
        
    	lastSeenMCEframe.contentWindow.document.body.innerHTML 
        	+= sig;
        
        if (blogName in defaultTags)
        {
            var tags = document.getElementsByName("post[tags]");
            if (tags && tags[0] && tags[0].value == '')
                tags[0].value = defaultTags[blogName];
        }
    }
}

function nukeLameNotes()
{
        var feed = document.getElementById("ui_activity_feed");
  		if (feed)
  		{
    		var notes = getByClass("ui_note", feed);
            for(i in notes)
            {
                var note = notes[i];
                var html = note.innerHTML;
                if (html.indexOf("and added") == -1
                   && html.indexOf("started following") == -1)
                {
                    note.style.display = "none";
                    note.parentNode.removeChild(note);
                    delete note;
                    note = null;
                }
			}
        }
}

window.onscroll = function (e) 
{  
  restartPoller();
} 

document.onclick = function(e) 
{ 
  restartPoller();
}

document.onkeyup=function(e)
{
  restartPoller();
    
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
    addSigAndTags();
    document.getElementById("create_post").children[0].click();
  }

  if (unicode == 115) // F4
  {
    window.location.href = 'http://' + document.location.hostname + '/archive';
  }

  if (unicode == 192) // `
  {
    selectPostAction(0);
    addSigAndTags();
    document.getElementById("create_post").children[0].click();  
  }

  if (unicode == 220) // \
  {
     
  }

  //alert (unicode);
};