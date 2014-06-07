// ==UserScript==
// @name           Reddit filters
// @namespace      leroy_twiggles
// @description    Provies filtering for subreddits
// @include        http://www.reddit.com/*
// ==/UserScript==

//Find the subreddit we are in
var url = document.location.href.toLowerCase();
var urlpattern = url.match(/^http:\/\/www.reddit.com\/(r\/([^\/\?#]+))?/i);
if (urlpattern != null)
{
  //Make some functions
  function getconfig()
  {
    var resultobj = JSON.parse(GM_getValue('__GM_REDDIT_FILTERBAR_CONFIG', '{}'));
    if (!resultobj.filter_self) resultobj.filter_self = {};    
    if (!resultobj.filter_nonself) resultobj.filter_nonself = {};
    if (!resultobj.filter_nsfw) resultobj.filter_nsfw = {};
    return resultobj;    
  }
  function saveconfig(arg_cfg)
  {
    GM_setValue('__GM_REDDIT_FILTERBAR_CONFIG', JSON.stringify(arg_cfg));
  }
  
  //Found it
  var subreddit = (typeof urlpattern[1] == 'undefined' ? 'all' : urlpattern[2]);  
  
  //Function to update a link and save config
  function update_link(arg_link, arg_list, arg_toggle)
  {
    //Get the state
    var cfg = getconfig();
    var active = (cfg[arg_list][subreddit] == true);
    if (arg_toggle)
    {
      active = !active;
      if (active) cfg[arg_list][subreddit] = true;
      else delete cfg[arg_list][subreddit];
      saveconfig(cfg);
    }
    
    //Update text
    arg_link.firstChild.nodeValue = (active ? arg_link.__GM_REDDIT_FILTERBAR_ACTIVE : arg_link.__GM_REDDIT_FILTERBAR_INACTIVE);
    
    //Update page
    arg_link.__GM_REDDIT_FILTERBAR_UPDATE(active);
  }
  

  //Add a link to the side object
  var searchbox = document.getElementById('search');
  if (searchbox == null) return;
  var side = searchbox.parentNode;
  
  //Create elements
  var filterbar = document.createElement('div');
  filterbar.className = "__GM_REDDIT_FILTERBAR";
  side.insertBefore(filterbar, searchbox.nextSibling);
  
  
  //#####################################################################################
  //Code to build a filter link
  //#####################################################################################
  function buildfilter(arg_list, arg_body_attribute, arg_text_active, arg_text_inactive)
  {
    //Add the filter item  
    var newspan = document.createElement('span');
    newspan.className = 'fancy-toggle-button toggle';
    var newlink = document.createElement('a');
    newlink.__GM_REDDIT_FILTERBAR_ACTIVE = arg_text_active;
    newlink.__GM_REDDIT_FILTERBAR_INACTIVE = arg_text_inactive;  
    newlink.__GM_REDDIT_FILTERBAR_UPDATE = function(arg_active)
    { 
      newlink.className = (arg_active ? 'option active remove' : 'option active add');
      if (arg_active) document.body.setAttribute(arg_body_attribute,true);
      else document.body.removeAttribute(arg_body_attribute);
    }    
    newlink.appendChild(document.createTextNode(''));
    newlink.setAttribute('href','#');
    newlink.addEventListener('click',function() { update_link(newlink, arg_list, true); return false; }, false);
    update_link(newlink, arg_list, false);
    newspan.appendChild(newlink);
    filterbar.appendChild(newspan);
  }
  
  //Build the filters
  buildfilter('filter_self', '__GM_REDDIT_FILTER_SELFLINKS', 'Hiding self links', 'Showing self links');
  buildfilter('filter_nonself', '__GM_REDDIT_FILTER_NONSELFLINKS', 'Hiding non-self links', 'Showing non-self links');
  buildfilter('filter_nsfw', '__GM_REDDIT_FILTER_NSFW', 'Hiding NSFW links', 'Showing NSFW links');
  
  
  //Mark all the self links
  var nodesSnapshot = document.evaluate("//span[@class='domain']/a/text()[contains(.,'self.')]/ancestor::div[contains(@class,'thing')]", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    element.setAttribute('__GM_REDDIT_FILTER_IS_SELFLINK',true);
  }
  //Mark all the non-self links
  var nodesSnapshot = document.evaluate("//span[@class='domain']/a/text()[not(contains(.,'self.'))]/ancestor::div[contains(@class,'thing')]", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    element.setAttribute('__GM_REDDIT_FILTER_IS_NONSELFLINK',true);
  }
  //Mark all the NSFW links
  var nodesSnapshot = document.evaluate("//li[contains(@class,'nsfw-stamp')]/ancestor::div[contains(@class,'thing')]", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
  {
    var element = nodesSnapshot.snapshotItem(i);
    element.setAttribute('__GM_REDDIT_FILTER_IS_NSFWLINK',true);
  }  
  
  //Mark all the also-hide-ifs
  if (subreddit == 'all')
  {
    var cfg = getconfig();
    function also_hide_if(arg_list, arg_attribute)
    {
      for (var other_subreddit in cfg[arg_list])
      {
        //Mark all the NSFW links
        var nodesSnapshot = document.evaluate("//a[contains(@class,'subreddit')]/text()[.='"+encodeURIComponent(other_subreddit)+"']/ancestor::div[contains(@class,'thing')]", document.body, null,  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
        {
          var element = nodesSnapshot.snapshotItem(i);
          element.setAttribute(arg_attribute,true);
        }  
      }
    }
    also_hide_if('filter_self', '__GM_REDDIT_FILTER_BLOCK_SELF');
    also_hide_if('filter_nonself', '__GM_REDDIT_FILTER_BLOCK_NONSELF');
    also_hide_if('filter_nsfw', '__GM_REDDIT_FILTER_BLOCK_NSFW');
  }
      
  //Add style
  GM_addStyle(".__GM_REDDIT_FILTERBAR a { display: block; margin-top: 8px; }");
  GM_addStyle("body[__GM_REDDIT_FILTER_SELFLINKS] div[__GM_REDDIT_FILTER_IS_SELFLINK] { display: none; }");
  GM_addStyle("body[__GM_REDDIT_FILTER_NONSELFLINKS] div[__GM_REDDIT_FILTER_IS_NONSELFLINK] { display: none; }");
  GM_addStyle("body[__GM_REDDIT_FILTER_NSFW] div[__GM_REDDIT_FILTER_IS_NSFWLINK] { display: none; }");
  
  GM_addStyle("div[__GM_REDDIT_FILTER_IS_SELFLINK][__GM_REDDIT_FILTER_BLOCK_SELF] { display: none; }");
  GM_addStyle("div[__GM_REDDIT_FILTER_BLOCK_NONSELF][__GM_REDDIT_FILTER_IS_NONSELFLINK] { display: none; }");
  GM_addStyle("div[__GM_REDDIT_FILTER_BLOCK_NSFW][__GM_REDDIT_FILTER_IS_NSFWLINK] { display: none; }");
}