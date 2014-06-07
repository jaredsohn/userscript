// NQS
// version 1.1
// 2007-05-31
// Copyright (c) 2007, Julien CAROSI (jcarosi@gmail.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey Firefox extension : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Click on install.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          NQS
// @namespace     http://userscripts.org/scripts/show/7573
// @description   Adds a QuickShare button to Netvibes, like the one found in Google Reader and allows you to share quickly items on delicious. Works with Netvibes Coriander.
// @include       http://www.netvibes.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
// This script allows you to share on delicious in one click an article you're reading on Netvibes.
// As it works with delicious, you do not need to publish a particular feed to share articles.
// You only need to supply one or several tags in order to group items on delicious.
//
// As articles are shared on delicious, you can, for instance, show together your netvibes shared articles and other bookmarks on your blog, using only one feed.
//
// --------------------------------------------------------------------
// Tested on Firefox 1.5 and 2.0
// --------------------------------------------------------------------
// Version 1.0 beta : initial release
// Version 1.1      : new : added support for Coriander "View site" function
//                    new : placed favicon.ico in source code
//                    new : added some code optimizations
//                    fixed : when viewing several articles using "Read all", correct article is shared
// Note : when clicking "Read all" in "view site" mode, the QS button only allows to share first article

// DOM related funcs
function getFirstElementMatchingClassName(root,tag,class)
{
  var elements=root.getElementsByTagName(tag); var i=0;
  while (elements[i] && !elements[i].className.match(class)) { i++; }
  return ((!elements[i]) ? null : (elements[i]));
}

function getElementsByClassName(root,tag,class)
{
  var elements = root.getElementsByTagName(tag);
  var results = new Array();
  for(var i=0; i<elements.length; i++) { if(elements[i].className.indexOf(class)>-1) { results.push(elements[i]); } }
  return (results);
}

function findParentNode(el,tag,class)
{
  el=el.parentNode;
  if (arguments.length==3)
  {
    // Find first element's parent node matching tag and className
    while (el.nodeName.toLowerCase()!='body' && (el.nodeName.toLowerCase()!=tag || (el.className!=class && el.className.indexOf(class+' ')==-1))) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }
  else
  {
    // Find first element's parent node matching tag
    while (el.nodeName.toLowerCase()!='body' && el.nodeName.toLowerCase()!=tag) { el=el.parentNode; }
    return ((el.nodeName.toLowerCase()!='body') ? el : false);
  }	
}

function addStyles(css)
{
  var head=document.getElementsByTagName('head')[0];
  if (head)
  {
    var style=document.createElement('style');
    style.type='text/css';
    style.innerHTML=css;
    head.appendChild(style);
  }
}

function onAvailable(el,f,poll_interval,poll_timeout)
{
  // Wait for an object (identified by string or returned by a function) to be loaded in DOM, then fire a custom function
  this.poll_interval=poll_interval ? poll_interval : 500;
  this.poll_timeout=poll_timeout ? poll_timeout : 10000;
  this.obj=el;
  this.func=f;
  this.onAvailableID = window.setInterval(this.poll,this.poll_interval,this);
  this.timeoutID = window.setTimeout(this.timeout,this.poll_timeout,this);
}

onAvailable.prototype.poll = function(scope)
{
  if (typeof(scope.obj)=='string')
  {
    if (document.getElementById(scope.obj))
    {
        scope.stopPolling();
        scope.func();
    }
  }
  else if (typeof(scope.obj)=='function')
  {
    if (scope.obj())
    {
       scope.stopPolling();
       scope.func();
    }
  }
  else
  {
    alert('onAvailable : object must be a string or a function !');
  }
}

onAvailable.prototype.stopPolling = function()
{
  window.clearInterval(this.onAvailableID);
  window.clearTimeout(this.timeoutID);
}

onAvailable.prototype.timeout = function()
{
  if (this.obj=='string') { alert('object \''+this.obj+'\' not available !'); }
  else { alert('object not available !'); }
}

// Initialize NQS
// This tests ensures that the script is loading only for the main netvibes page, avoiding loading for instance for iframes on the same domain
if (window.location=='http://www.netvibes.com/') { var NQSInstance = new NQS(); }

function NQS()
{
  // Check if GM_xmlhttpRequest is available
  if (!GM_xmlhttpRequest)
  {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
  }
    
  this.init = function()
  {
    // Retrieve delicious settings from GM user config. The script is disabled if one of the settings are not supplied.
    if (!this.delicious.settings.get()) { return; }
       
    // Initialize user menu
    this.initUserMenu();
    
    // Initialize the netvibes related part of the script
    this.netvibes.init();
  };
 
  this.initUserMenu = function()
  {
    var th=this;
    GM_registerMenuCommand("Enter delicious login",function() { th.delicious.settings.changeLogin(); });
    GM_registerMenuCommand("Enter delicious quicksharing tag(s)",function() { th.delicious.settings.changeTags(); });
  };
 
  this.netvibes =
  {
    nqs : this,
    feedReaderContentFrame : null,
    icon : 'data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%00%00%00%00h%05%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%08%00%00%00%00%00%40%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%00%FF%00%00%00%DD%DD%DD%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%00%00%00%00%00%00%00%00%03%03%03%03%03%03%03%03%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%01%01%01%01%01%01%01%01%02%02%02%02%02%02%02%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00',
    
    init : function()
    {
      // Add needed css styles
      addStyles(".QSButton { margin-left: 10px; vertical-align: middle; } .QSButton:hover { cursor: pointer;} #NetvibesQuickSharePanel { z-index: 99999; position: fixed; top: 0; right: 0; width: 80px; height: 25px; line-height: 25px; padding: 0 0 0 5px; background-color: #FF0000; color: #000000; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; }");

      // Attaches an interval that waits for Netvibes App to be available
      var th=this;
      var onAppAvailable = new onAvailable('application',function() { th.attach() },500,10000);
    },

    attach : function()
    {
      var th=this;
      unsafeWindow.App.FeedReader.watch('isOpen',function(id,oldval,newval) { return (th.openStateChange(id,oldval,newval)); } );
    },

    openStateChange : function(id,oldval,newval)
    {
      if (newval)
      {
        // Needed for closure below
        var th=this;
      
        // Will be used several times, save it
        this.feedReaderContentFrame=document.getElementById('feedReaderContentFrame');
        
        // assign addQuickShareButton() to headlines on the left, attaches to the div and uses event bubbling in order for netvibes' code to fire first
        var headlines=getElementsByClassName(document.getElementById('feedReaderHeadlinesFrame'),'div','headline');
        for (var i=0;i<headlines.length;i++) { headlines[i].addEventListener('click',function() { th.addQuickShareButtonWhenArticleAvailable(); },false); }
        
        // Catch clicks on "view site" button
        document.getElementById('btShowPage').addEventListener('click',function() { th.catchViewSite(); },false);
        
        // Assign addQuickShareButton() to "Read All" button
        document.getElementById('FeedreaderReadAll').parentNode.addEventListener('click',function() { th.addQuickShareButtonWhenArticleAvailable(); },false);

        // Adds the QuickShare button to the main headline's title
        this.addQuickShareButtonWhenArticleAvailable();
      }
      // Prevents watch from changing the value of isOpen
      return newval;
    },

    addQuickShareButtonWhenArticleAvailable : function()
    {
      // Wait for article to be loaded in DOM, then add QS button.
      var th=this;
      var contentInsideFrame=getFirstElementMatchingClassName(this.feedReaderContentFrame,'div','contentInsideFrame');
      var onArticleAvailable = new onAvailable(function() { return(getElementsByClassName(contentInsideFrame,'div','title')); },function() { th.addQuickShareButtons(); },10,3000);        
    },
    
    addQuickShareButtons : function()
    {
    	// Add QS button to article title, and to feed reader if in "view site" mode.
        this.addQuickShareButtonToTitle();
        
        if (this.inViewSiteMode())
        {
          // Reader initially in "view site" mode
          this.feedReaderShowQSButton();
        }
    },
    
    addQuickShareButtonToTitle : function()
    {
      // Adds share button(s) to headlines' title
      var contentInsideFrame=getFirstElementMatchingClassName(this.feedReaderContentFrame,'div','contentInsideFrame');
      var headlines=getElementsByClassName(contentInsideFrame,'div','title');
      for (var i=0;i<headlines.length;i++) { this.addQSButton(headlines[i].getElementsByTagName('h2')[0]); }
    },
    
    feedReaderAddQSButton : function()
    {
      var header=document.getElementById('feedReaderFrame').getElementsByTagName('h2')[0];
      var button=this.addQSButton(header);
      button.id='feedReaderQSButton';
    },
    
    feedReaderShowQSButton : function()
    {
      var button=document.getElementById('feedReaderQSButton');
      if (button) { button.style.visibility='visible'; }
      else { this.feedReaderAddQSButton(); }
    },
    
    feedReaderHideQSButton : function()
    {
      document.getElementById('feedReaderQSButton').style.visibility='hidden';
    },
    
    catchViewSite : function()
    {
      // Catch clicks on "view site"
      if (this.inViewSiteMode()) { this.feedReaderShowQSButton(); }
      else { this.feedReaderHideQSButton(); }
    },

    inViewSiteMode : function()
    {
      // Returns true if in "View site" mode
      return (this.feedReaderContentFrame.getElementsByTagName('iframe').length>0);
    },
    
    addQSButton : function(el)
    {
      // Adds a quickshare button to an element
      var th=this;
      var button=document.createElement('img');
      button.setAttribute('src',this.icon);
      button.setAttribute('alt','QS!');
      button.className='QSButton';
      el.appendChild(button);
      button.addEventListener('click',function(e) { th.quickShare(e); },true);
      return button;          
    },
    
    quickShare : function(e)
    {
      // Share article on delicious
      if (this.inViewSiteMode()) { var h2=this.feedReaderContentFrame.getElementsByTagName('h2')[0]; }
      else { var h2=findParentNode(e.target,'h2'); }
      
      var a=h2.getElementsByTagName('a')[1];
      var title=a.innerHTML;
      var url=a.getAttribute('href');
      this.nqs.delicious.share.share({url: url,title: title});
    },
      
    initTimeout : function(scope)
    {
      window.clearInterval(scope.onAvailableID);
      alert("Could not attach GM script to Netvibes app !");
    }
  };   
   
  this.delicious =
  {
    settings :
    {
      login : null,
      defaultTags : '.quickshared',

      get : function()
      {
        return (this.getLogin() && this.getTags());
      },
      
      getLogin : function()
      {
        this.login=GM_getValue('login','');
        // Prompt for delicious login, if needed
        if (!this.validateSetting(this.login)) { return (this.promptForLogin()); }
        else { return true; }
      },
 
      promptForLogin : function()
      {
        var login=window.prompt("First launch, enter your delicious login, please.");
        if (!this.validateSetting(login)) { alert("NetvibesQuickShare will be disabled until you supply your delicious login."); return false; }
        else { this.setLogin(login); return true; }
      },
      
      changeLogin : function()
      {
        var login=window.prompt("Enter your delicious login, please.",this.login);
        if (!login) { alert('Ok, keeping previous login'); }
        else if (!this.validateSetting(login)) { alert('Invalid login, keeping previous one.'); }
        else { this.setLogin(login); }
      },
 
      setLogin : function(login)
      {
        this.login=login;  
        GM_setValue('login',this.login);  
        alert('Delicious login set to : '+this.login);    
      },
      
      getTags : function()
      {
        this.tags=GM_getValue('tags','');
        // Prompt for delicious tags, if needed
        if (!this.validateSetting(this.tags)) { return (this.promptForTags()); }
        else { return true; }
      },
 
      promptForTags : function()
      {
        var tags=window.prompt("First launch, enter your desired delicious quicksharing tag(s), please.",this.defaultTags);
        if (!this.validateSetting(tags)) { alert("NetvibesQuickShare will be disabled until you supply at least one tag for quicksharing."); return false; }
        else { this.setTags(tags); return true; }
      },
      
      changeTags : function()
      {
        var tags=window.prompt("Enter your desired delicious quicksharing tag(s), please.",this.tags);
        if (!tags) { alert('Ok, keeping previous tag(s)'); }
        else if (!this.validateSetting(tags)) { alert('Invalid tag(s), keeping previous one(s).'); }
        else { this.setTags(tags); }
      },
 
      setTags : function(tags)
      {
        this.tags=tags;  
        GM_setValue('tags',this.tags);  
        alert('Delicious quicksharing tag(s) set to : '+this.tags);    
      },

      validateSetting : function(setting)
      {
        return (typeof(setting)=='string' && setting.length>0);
      }
    },

    share :
    {
      urlPrefix : 'http://del.icio.us',
      
      share : function(params)
      {
        this.delicious.infos.show('Sharing...');
        this.formLoad(params);
      },
      
      formLoad : function(params)
      {    
        // Retrieve delicious submit form in order to have the key, so the use of delicious API, and thus of a proxy is not needed
        var th=this;
        var request =
        {
          url : this.urlPrefix+'/'+this.delicious.settings.login+'?v=2&jump=close&tags='+encodeURIComponent(this.delicious.settings.tags)+'&url='+encodeURIComponent(params.url)+'&title='+encodeURIComponent(params.title),
          method : 'GET',
          headers : {'User-Agent' : navigator.userAgent},
          onload : function(response) { th.formLoaded(response); },
          onerror : function(response) { th.formLoadError(response); }
        };
        GM_xmlhttpRequest(request);
      },
 
      formLoaded : function(response)
      {
        if (response.status==200)
        {
          // Import response into the DOM
          var el=document.createElement('div');
          el.innerHTML=response.responseText;
          var form=el.getElementsByTagName('form')[0];
    
          if (form.getAttribute('action').indexOf('login')>-1)
          {
            // Delicious invites the user to log in : the login exists but user is not logged in with it
            this.loginError();
          }
          else
          {
            // Retrieve form infos
            var url=form.getAttribute('action');
            var inputs=form.getElementsByTagName('input');
        
            // Uncheck "private"
            var i=0; while (inputs[i] && inputs[i].getAttribute('name')!='private' && i<inputs.length) { i++; }; if (i<inputs.length) { inputs[i].value=''; }
 
            // Submit the form via XMLHttpRequest
            this.submit({url: url, inputs: inputs});
          }
        }
        else
    {
      // If 404, login doesn't exist
      this.loginError();
    }
      },
 
      formLoadError : function(response)
      {
        // Display status
        this.delicious.infos.hide();
        alert('Error while trying to share this article, please try again ! (Error code '+response.status+')');
      },
 
      submit : function(params)
      {
        // Submit infos to delicious
        var th=this;
        var formdata=new Array();
        for (var i=0;i<params.inputs.length;i++) { formdata.push(params.inputs[i].getAttribute('name')+'='+params.inputs[i].value); }

        var request =
        {
          url : this.urlPrefix+params.url,
          method : 'POST',
          headers : {'User-Agent': navigator.userAgent, 'Content-Type': 'application/x-www-form-urlencoded'},
          data : formdata.join('&'),
          onload : function(response) { th.submitLoaded(response); },
          onerror : function(response) { th.submitError(response); }
        };
        GM_xmlhttpRequest(request);    
      },
      
      submitLoaded : function(response)
      {
        if (response.status==200)
        {
          this.delicious.infos.show('Shared !',true);
        }
        else
        {
      alert('Error while trying to bookmark the article on delicious ! (Error code '+response.status+')');
    }
      },
 
      submitError : function(response)
      {
        this.delicious.infos.hide();
        alert('Error while trying to bookmark the article on delicious ! (Error code '+response.status+')');
      },
      
      loginError : function()
      {
        this.delicious.infos.hide();
        alert('Error ! Please check that you\'re correctly logged in delicious with login : '+this.delicious.settings.login+'. If not, change login in menu.');          
      }
    },
    
    infos :
    {
      show : function(msg,timeout)
      {
        // Create panel if not already in DOM
        if (!this.panel.el)
        {
          // Insert it in DOM
          var div=document.createElement('div');
          div.setAttribute('id',this.panel.id);
    
          // Set its style
          document.getElementsByTagName('body')[0].appendChild(div);
          this.panel.el=document.getElementById(this.panel.id);
        }
    
        // Set panel content
        this.panel.el.innerHTML=msg;
    
        // Check if the panel should be removed automatically after a specified timeout
        if (arguments.length==2 && timeout)
        {
          // Waits for timeout, then hides the panel
          var th=this;
          window.setTimeout(function() { th.hide(); },this.panel.showTimeout);
        }
      },
     
      hide : function()
      {
        this.panel.el.parentNode.removeChild(this.panel.el);
        this.panel.el=null;
      },
      
      panel :
      {
        el : null,      
        id : 'NetvibesQuickSharePanel',
        showTimeout : 1500
      }
    }
  };
 
  this.delicious.share.delicious = this.delicious;
  this.init();
}
