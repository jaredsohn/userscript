// ==UserScript==
// @name        Community boost
// @namespace   whatever
// @description Helper scripts to speed up using community
// @domain      community.na.leagueoflegends.com
// @include     http://community.na.leagueoflegends.com/*
// @version     1
// @grant       none
// ==/UserScript==

/**
Error: Load timeout for modules: /js/2b2c3c9.js?1.0.53 http://requirejs.org/docs/errors.html#timeout

TypeError: b.attr(...) is undefined
 **/   

var TITLE = "COMMUNITY_BOOST";
var PATH = window.sc_path.split(":");

var XPATHS = {
  myupdates: "/html/body/script",
}
/***CLASES***/
///scroooool down to see any relevant code
/**Local storage entry**/
function LocalStorageMan(name) {
  //Entry name
  this.name = "TEST";
  //Whether or not to virtualize thread safety
  this.useMutex = false;
  //Empty data object
  this.data = {};
  //Call constructor already
  if(name!=null) {
    this.init(name);
  }
}
LocalStorageMan.prototype.init = function(name) {
  if(name!=null) {
    this.name = name;
  }
  if(localStorage[this.name]==null) {
    localStorage[this.name]="";
    localStorage[this.name+"__mutex"]=0;
  }
  else {
    this.reload();
  }
  
  //Add listener
  var _this = this;
  window.addEventListener("storage", 
    function(event) {
      if(event.key==_this.name) {
        _this.reload();
      }
    }
  , false);
}

LocalStorageMan.prototype.reload = function() {
  var data = localStorage[this.name];
  if(data == "")
    this.data = {};
  else
    this.data = JSON.parse(data);
}

LocalStorageMan.prototype.v = LocalStorageMan.prototype.value = function(name, val) {
  this.data[name]=val;
  if(this.use_mutex)
    this.v_mutex(name, val);
  else {
    localStorage[this.name] = this.serializeData();
  }
}
LocalStorageMan.prototype.v_mutex = function(name, val) {
  //Delay any changes if the local storage is being changed
  if(localStorage[this.name+"__mutex"]==1) {
    setTimeout(function() {this.v(name, val);}, 1);
  }
  //Lock the mutext to prevent overwriting
  localStorage[this.name+"__mutex"] = 1;
  //Save serialized data
  localStorage[this.name] = this.serializeData;
  //Allow usage from another tabs
  localStorage[this.name+"__mutex"] = 0;
}
LocalStorageMan.prototype.serializeData = function() {
  return JSON.stringify(this.data);
}
/**Updates manager**/
function UpdateManager(storageMan) {
  //New updates count - used to know which updates to render on screen
  this.newUpdates = 0;
  //Last update (to prevent duplicities)
  this.lastUpdate = 0;
  //Laste read update - this one serves to find updates that are new but were displayed already
  this.lastReadUpdate = 0;
  //All the updates
  this.ups = new PostCollection();
  this.ups.manager = this;
  //Storage manager
  this.sMan = storageMan;
  
  //Update timer delay
  this.delay = 10000;
  //Repeating now? (this shall be treated as private!)
  this.repeat = false;
  //The timeout handle
  this.timeout = null;
  
  //Usefull info about the site
  this.apolloToken = "";
  
  //Remember original document title
  this.baseTitle = document.title;
  
  //HTML references in the document
  this.refs = {
    updateCount: $("div.gs-container.player-profile-card-nav div a span")[0],
    myUpdates: $("div.gs-container.player-profile-card-nav div")[0]
  }
  //Events
  var _this = this;
  this.refs.myUpdates.onmouseover = function() {
    _this.showUpdates(_this.ups);
  };
  this.refs.myUpdates.onmouseout = function() {
    _this.hideUpdates(2000);
  };
}

UpdateManager.prototype.getUpdates = function(dom, callback) {
  //Call itself recursively if dom is not provided:
  if(dom==null) {
    var _this = this;                                              //?show=all
    domByAjax("http://community.na.leagueoflegends.com/en/myupdates", function(data) {_this.getUpdates(data, callback);});
    cons.info("Connecting to update server.");
  }
  //Otherwise just read the data
  else { 
    /*Read apolloToken*/
    this.apolloToken = dom.getElementById("apollo-token").value;  
  
    /*Read updates*/
    var script_text = getChildByXPath(XPATHS.myupdates, dom);
    var data = [];
    var script = script_text.textContent.replace(/document\.apolloPageBootstrap/ig, "data");
    //Evaluate the script
    try {
      eval(script);
    }
    catch(e)  {
      cons.warn("Failed to update replies to your posts!");
      cons.log(script_text, e);
      return false;
    }
    //Now work with data
    data = data[0].data;
    //If there is something new
    if(data.searchResults!=null) {
      cons.info("New updates found!");
      this.ups.load(data.searchResults, true);
      //Filter the updates that were never downloaded before
      var timeRef = {time: this.lastUpdate};
      var ups = this.getNewUpdates(timeRef);
      this.lastUpdate = timeRef.time;
      //Show these new updates
      cons.log(ups);
      this.showUpdates(ups, !true);
      
      //Show all new updates in document title
      this.countInTitle(data.searchResults.length);
      //Also change my updates field value
      this.refs.updateCount.innerHTML = (data.searchResults.length);
    }
    else {
      cons.info("No updated posts!");
      //Show all new updates in document title
      this.countInTitle(0);
      //Also change my updates field value
      this.refs.updateCount.innerHTML = (0);
    }
    //Call callback eventually
    if(typeof callback=="function") {
      callback();
    }
    //True means that delayed re-call is requested
    else if(typeof callback=="boolean") {
      this.updateDelay();
    }
  }
}

UpdateManager.prototype.updateDelay = function(delay) {
  if(this.timeout!=null) {
    return false;
  }
  var _this = this;
  //Wait for updating
  this.timeout = setTimeout(function() {
    _this.timeout = null;
    _this.getUpdates(null, true);
  }, delay!=null?delay:this.delay);
}

UpdateManager.prototype.getNewUpdates = function(timeRef) {
  //list of new updates
  var n = [];
  var ups = this.ups;
  var time;
  //We must also find out the time of latest update
  var largest_time = -1;
  //Find the new
  for(var i=0,l=ups.length; i<l; i++) {
    time = (new Date(ups[i].data.createdAt)).getTime();
    if(time>timeRef.time) {
      n.push(ups[i]);
      //If this update is newer than any previous
      if(time>largest_time) {
        largest_time = time;
      }   
    }
  }
  //Update the largest time to prevent returning this array again
  if(largest_time>timeRef.time)
    timeRef.time = largest_time;
  //Return results 
  return n;
}
UpdateManager.prototype.showUpdates = function(n, autohide) {
  if(n.length>0) {
    var wrap = this.updateDiv;
    if(wrap==null) {
      wrap = this.updateDiv = document.createElement("div");
      wrap.className = "update_list"
      wrap.style.zIndex = "666";
      document.body.appendChild(wrap); 
    }
    //Clear old values
    wrap.innerHTML = "";
    for(var i=0,l=n.length; i<l; i++) {
      cons.log(n[i]);
      //Create info holder
      var mini = n[i].html();
      wrap.appendChild(mini);  
      
      //cons.log(reply);
      //cons.warn("WTF?");
    }  
    $(wrap).fadeIn(800);
    if(autohide)
      this.hideUpdates(5000);
  }
}

UpdateManager.prototype.hideUpdates = function(timeout) {
  var wrap = this.updateDiv;
  if(wrap!=null)
    setTimeout(function() {$(wrap).fadeOut(800);}, timeout);
}

UpdateManager.prototype.countInTitle = function(count) {
  if(count>0) {
    document.title = "("+count+") "+this.baseTitle;
  
  }
  else {
    document.title = this.baseTitle;
  }
}


function Post(data) {
  //The div that is displayed for this post
  this.updateDiv = null;
  //Data from server
  if(data.comment!=null)
    this.data = data.comment;
  else 
    this.data = data;
    
  //Html map to refer elements quickly
  this.el_map = {
    textfield: null,
    main: null,
    post_text: null
  }
}
//Create update entry for this post
Post.prototype.html = function() {
  var _this = this;
  var urls = this.getUrls();
  //Return already existing html
  if(this.el_map.main!=null) 
    return this.el_map.main;
  //Create HTML
  var mini = this.el_map.main = document.createElement("div");
  mini.className="update_item";
  mini.maxToggle = function() {
    var th = $(this);
    if(th.hasClass("large")) {
      th.removeClass("large");     
      th.removeClass("reply"); 
    }
    else {
      th.addClass("large");
    }
  }
  
  var heading = document.createElement("div");
  heading.className = "heading";
  
  var posterName = document.createElement("a");
  posterName.className = "poster_name";
  posterName.innerHTML = this.data.user.name;
  posterName.href = urls.profile;
  //Tools
  var tools = document.createElement("div");
  tools.className = "tools";
  
  var close = document.createElement("div");
  close.className = "tool permanent close";
  close.onclick = function() {
    $(this.parentNode.parentNode.parentNode).fadeOut(800);
    _this.setReadState(true);
  }
  
  var maximize = document.createElement("div");
  maximize.className = "tool permanent maximize";
  maximize.onclick = function() {
    this.parentNode.parentNode.parentNode.maxToggle();
  }
  /**Post editor**/
  var editor = document.createElement("div");
  var textfield = this.el_map.textfield = document.createElement("textarea");
  textfield.className = "editor";
  editor.className = "editor";
  var submit = document.createElement("button");
  submit.className = "submit btn-large btn-large-primary";
  submit.innerHTML = "Send message";
  submit.onclick = function() {
    _this.reply(textfield.value, function(reply) {
      var replyht = document.createElement("div");
      replyht.innerHTML = reply.text();
      replyht.className = "reply";
      editor.insertBefore(replyht, textfield);
      $(mini).removeClass("reply");
      textfield.disabled = null;
      this.disabled = null;
    });
    textfield.disabled = 'disabled';
    this.disabled = "disabled";
  }
  
  var replyBut = document.createElement("button");
  replyBut.className = "replyBut btn-large btn-large-primary";
  replyBut.innerHTML = "Quick reply";
  replyBut.onclick = function() {
    $(mini).addClass("reply");
  }
  
  
  var text = this.el_map.post_text = document.createElement("a");
  text.href = urls.comment;
  text.className = "text";
  this.renderText();
  
  tools.appendChild(maximize);
  tools.appendChild(close);
  
  editor.appendChild(textfield);
  editor.appendChild(submit);
  editor.appendChild(replyBut);
  
  heading.appendChild(posterName);
  heading.appendChild(tools);       
  mini.appendChild(heading);
  mini.appendChild(text);
  mini.appendChild(editor);
  return mini;
}
//Create update entry for this post
Post.prototype.getUrls = function() {
  var urls = this.urls;
  if(urls==null) {
    urls = this.urls = {
      profile: null,
      post: null,
      comment: null,
      board: null
    }
    
    var base = "http://"+location.host+"/en/c/"+this.data.discussion.application.shortName;
    urls.board = base;
    urls.post = base+"/"+this.data.discussion.id;
    urls.comment = urls.post+"?comment="+this.data.id;
    urls.profile = "http://"+location.host+"/en/player/"+this.data.user.realm+"/"+this.data.user.name;
  }
  return urls;
}
Post.prototype.setReadState = function(state) {
  var data = {
    //comments: {bzRrPGQO: {weu1jJXA: ['00020000000000000000000200010000']}},
    comments: {},
    readState: state,
    apolloToken: this.manager.apolloToken
  };
  //console.log(this.manager, this.manager.appoloToken);
  
  data.comments[this.boardID()]={};
  data.comments[this.boardID()][this.postID()] = [this.commentID()];
  
  $.ajax({
      url: "http://community.na.leagueoflegends.com/en/api/myupdates",
      type: 'PUT',
      data: data,
      success: function(result) {
          console.log(result);
      }
  });
}
Post.prototype.reply = function(replyText, callback) {
  //http://community.na.leagueoflegends.com/api/2XjzURgc/discussions/qcEEwTH7/comment
  /*apolloToken	4dac379a4b8b4ea387a2e9a28c62a0ec54b80eea
language	en
message	text comment
parentCommentId	0000000000000000*/
  var url = "http://community.na.leagueoflegends.com/api/"+this.boardID()+"/discussions/"+this.postID()+"/comment";
  var data = {
    apolloToken: this.manager.apolloToken,
    message: replyText,
    parentCommentId: this.commentID(),
    language: "en"
  }
  $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: function(result) {
          console.log("Post succesful:", result);
          if(typeof callback=="function") {
             callback(new Post(result));
          }
      }
  });
}
Post.prototype.update = function(newpost) {
  this.data = newpost.data;
  this.timeCache = null;
  this.renderText();
}
//Html rendering of the post
Post.prototype.removeHTML = function() {
  this.el_map.main.parentNode.removeChild(this.el_map.main);
}
Post.prototype.renderText = function() {
  var text = this.el_map.post_text;
  if(this.data.deleted) {
    text.innerHTML = "<i>Comment deleted</i>"; 
    text.style.color = "red"; 
  }   
  else {
    text.innerHTML = this.data.message;
  }
}

Post.prototype.boardID = function() {
  return this.data.discussion.application.id;
}
Post.prototype.boardName = function() {
  return this.data.discussion.application.shortName;
}
Post.prototype.postID = function() {
  return this.data.discussion.id;
}
Post.prototype.commentID = function() {
  return this.data.id;
}
Post.prototype.id = function() {
  if(this.cachedID==null) {
    this.cachedID = this.boardID()+"_"+this.postID()+"_"+this.commentID();
  }
  return this.cachedID;
}
Post.prototype.time = function() {
  if(this.timeCache==null) {
    this.timeCache = (new Date(this.data.createdAt)).getTime();
  }
  return this.timeCache;
}
Post.prototype.text = function() {
  return this.data.message;
}



function PostCollection(post_ar) {
  if(post_ar!=null) {
    this.load(post_ar);
  }
  //Utility property - shows maximal time in list
  this.maxTime = 0;
  //Overwrite push function 
  this.pushReally = this.push;
  this.push = function(post) {
    if(this.maxTime<post.time()) {
      this.maxTime = post.timeCache;
    }
    //Give the update manager referrence
    post.manager = this.manager;
    //Actually push the post in the array
    this.pushReally(post);
  }
}
PostCollection.prototype = Array.prototype;
PostCollection.prototype.load = function(post_ar, clear) {
  if(clear)
    this.splice(0, this.length);

  for(var i=0,l=post_ar.length; i<l; i++) {
    this.push(new Post(post_ar[i].comment)); 
  }
}

PostCollection.prototype.update = function(post_ar) {
  var tmp = new PostCollection(post_ar);
  var tmp_elm;
  
  for(var i=0,l=this.length; i<l; i++) {
    if((tmp_elm = tmp.getElementById(this[i].id()))==null) {
      var p = this[i];
      p.removeHTML();
      this.splice(i, 1);
      //Array just got shorter
      i--;
      l--;    
    }
    else {
      this[i].update(tmp_elm);
    }
  }
}
PostCollection.prototype.newerThan = function(lowtime) {
  //list of new updates
  var n = new PostCollection();
  var time;
  //Find the new
  for(var i=0,l=this.length; i<l; i++) {
    time = this[i].time();
    if(time>lowtime) {
      n.push(this[i]);
    }
  }

  //Return results 
  return n;
}
PostCollection.prototype.getElementById = function(id) {
  for(var i=0,l=this.length; i<l; i++) {
    if(this[i].id()==id)
      return this[i];
  }
  return null;
}


/***END OF CLASES**/
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//Return the functionality to the console
var console = healConsole();
//make own console implementation
var cons = {
  log: function() {
    var args = ["["+TITLE+"]"];
    for(var i=0, l=arguments.length; i<l;i++)
      args.push(arguments[i]);
    
    this.logReal.apply(console, args);
  },
  logReal: console.log,
  info: function() {
    console.info("["+TITLE+"] "+arguments[0]);
  },
  warn: function() {
    console.warn("["+TITLE+"] "+arguments[0]);
  },
}
//Remember hostname
var host = window.location.host;

//Array of functions to run onload
var onloads = [];

/**Page switch**/
//Page specific scripts - small modifications here and there
onloads.push(function() {
  //removing the character length for poll questions
  var tmp = document.getElementById("poll_id");
  
  if(tmp!=null) {
    var ol = tmp.parentNode.getElementsByTagName("ol")[0];
    //Change existing choices
    tmp = tmp.parentNode.getElementsByTagName("div")[0].getElementsByTagName("input");
    for(var i=0,l=tmp.length; i<l; i++) {
      tmp[i].removeAttribute("maxlength");
      tmp[i].style.width = "100%";
    }  
    //Prepare for new choices
    var appendOld = ol.appendChild;
    ol.appendChild = function(li) {
      //cons.log("New poll option added!");
      var input = li.getElementsByTagName("input")[0];
      input.removeAttribute("maxlength");
      input.style.width = "100%";
      appendOld.apply(this, arguments);
    }
  }

  //Fix permalinks
  //Get all the links under posts
  /*var length = $("a.toggle-reply-form")
  //Now filter out those that are permalinks
  .filter(
    function(d) {
     return this.innerHTML.indexOf("link")!=-1;
    }
  )
  //Now perform function for filtered permalinks
  .each(
    function() {
      this.href = "#"+this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
      //this.addEventListener("click", function()
    }
  ).length;
  console.info("Fixed "+length+" permalinks.");   */
  
  /**Allow voting on the board index**/
  //Only on board index
  if(PATH.length<=3) {
    $("ul.voting").each(function() {
       $(this).removeClass("isDisabledVote");
       var buttons = this.getElementsByTagName("button");
       //nasty conversion from collection to array
       buttons = [buttons[0], buttons[1]];
       //cons.log(buttons);
       for(var i=0; i<2; i++) {
         var n = elmCopyClear(buttons[i]);
         //cons.log(n);
         n.onclick = voteButtonClick; 
         buttons[i].parentNode.insertBefore(n, buttons[i]);
         buttons[i].parentNode.removeChild(buttons[i]); 
       }
       //cons.log(buttons);
       //cons.log(this);
       //this.className = "voting";
       /*this.parentNode.removeChild(this);
       var n = elmCopyClear(this);
       n.onclick = ForumVote(true, )   */
    });
  }
  
  /**Accessibility on polls**/
  $("td.riot-athena-choice-label").each(function() {
     //The option text
     var text = this.innerHTML;
     //The radio button
     var radio = $(this.parentNode).find("input")[0];
     radio.removeAttribute("disabled");
     //Clear inner HTML
     this.innerHTML = "";
     //Add label
     var lbl = document.createElement("label");
     lbl.setAttribute("for", radio.id);
     lbl.innerHTML = text;
     this.appendChild(lbl);
  });
  
});
/**Updates poller**/


/**Event handlers**/
function Permalink_evc_click(event) {
  //cancel_event(event);
  //var id = this.parentNode.parentNode.parentNode.parentNode.parentNode.id;
  
}
//Prevent event from doing - well anything
function cancel_event(event) {
  event.preventDefault();
  event.stopPropagation();
  event.cancelBubble = true;
  return event;
}
function voteButtonClick(event) {
  var mode = this.className == "up-vote";
  var wrapper = this.parentNode.parentNode;
  //better cache this shit
  if(this.postID==null) {
    this.postID = postIdFromUrl(
      wrapper.parentNode
      .getElementsByTagName("p")[0]
      .getElementsByTagName("a")[0]
      .href
    );
  }
  //cast a vote
  ForumVote(this.postID, mode, wrapper);
}

/**Dom functions**/
function elmCopyClear(elm) {
  var n = document.createElement(elm.tagName);
  for(var i in elm.style) {
    n.style[i] = elm.style[i];
  }
  n.className = elm.className;
  n.innerHTML = elm.innerHTML;
  return n;
}

/**Forum interaction functions**/

function ForumVote(discussionID, status, callback, commentID) {
  var data = {direction: status>0?"up":"down"};      
  
  var url = "http://community.na.leagueoflegends.com/api/bzRrPGQO/discussions/"+discussionID;
  if(commentID!=null) {
    url+="/comments/"+commentID;
  }
  //Aplly default callback on DOM element
  if(callback instanceof HTMLElement) {
    var wrapper = callback;
    callback = function(data) {
      var vote = data.voteAction;
      var dd = $(wrapper);
      dd.removeClass("isDownVoted isUpVoted");
      if(vote=="up") {
        dd.addClass("isUpVoted");
      }
      else if(vote=="down") {
        dd.addClass("isDownVoted");
      }
      dd.find(".total-votes")[0].innerHTML = data.newUpVoteCount-data.newDownVoteCount;
    }
  }
  //Send request
  $.post(url+"/vote", data, callback);
}
function MarkRead(state, board, post, comment) {
  var data = {
    //comments: {bzRrPGQO: {weu1jJXA: ['00020000000000000000000200010000']}},
    comments: {},
    readState: state
  };                     
  data.comments[board]={};
  data.comments[board][post] = [comment];
  
  $.ajax({
      url: "http://community.na.leagueoflegends.com/en/api/myupdates",
      type: 'PUT',
      data: data,
      success: function(result) {
          console.log(result);
      }
  });
}
//Get just the relevant post ID from the whole url
function postIdFromUrl(url) {
  var matches = url.match(/(?:http\:\/\/)?(?:[a-z0-9\.\-\_]+\/)+([a-z0-9]+)-.*/i);
  return matches[1];
}

function postUrls(post) {
  var data = {
    profile: null,
    post: null,
    comment: null,
    board: null
  }
  
  var base = "http://"+location.host+"/en/c/"+post.discussion.application.shortName;
  data.board = base;
  data.post = base+"/"+post.discussion.id;
  data.comment = data.post+"?comment="+post.id;
  //data.profile = 
  return data;
}

window.CB_API = {
  vote: ForumVote
}

var STORAGE = window.STORAGE = new LocalStorageMan(TITLE);
var manager = new UpdateManager(STORAGE);
manager.updateDelay(2000);
window.man = manager;


//Get the console back (fuck you Riot!)
function healConsole() {
  //<iframe> element
  var iframe = document.createElement("iframe");
  //Hide it somewhere
  iframe.style.position="fixed";
  iframe.style.height = iframe.style.width = "1px";
  iframe.style.top = iframe.style.left = "-5px";
  //No src to prevent loading some data
  iframe.src = "about: blank";
  //Needs append to work
  document.body.appendChild(iframe);
  //Get the inner console
  return window.console = iframe.contentWindow.console;
}
function domByAjax(path, callback) {
    //New request
    var req = new XMLHttpRequest();
    //Open the request (I only use GET requests)
    req.open("GET", path);
    //Onload callback
    req.onload = function() {
      //Create DOM parser
      var doc = document.implementation.createHTMLDocument("");
      //Parse the HTML returned
      doc.documentElement.innerHTML = this.responseText;
      //Send the DOM to callback()
      callback(doc);    
    }
    //Keep trying on error
    req.onerror = function() {
      console.warn("Failed to fetch request, retrying in 5 seconds.");
      setTimeout(function() {domByAjax(path, callback);}, 5000);
      return false;
    }
    //Send the request and wait for reply
    req.send();
}
//My trick to get an elemnt by Xpath        
function getChildByXPath(path, node, create, doc) {
    var tmp = node;
    create = create==true?true:false;
    
    if(path==null) {
      var err = new Error();
      console.log(err.stack);
      return;
    }
    
    var fragment, children, result, chlIndex, found;
    
    path = path.split("/");
    if(path[0]=="") {
      path.splice(0,1);
    }
    for(var i=0; i<path.length; i++) {
      //console.log(i, path.length, tmp);
      fragment = path[i].split("[");
      fragment[0] = fragment[0].toLowerCase();
      if(fragment.length>1) {
        fragment[1]=fragment[1].substr(0, fragment[1].length-1)*1;
      }
      else {
        fragment.push(0);
      } 
      
      children = tmp.children;
      chlIndex = 1;
      found = false;
      for(var j=0, l=children.length; j<l; j++) {
        if(fragment[0]==children[j].tagName.toLowerCase()) {
          chlIndex++;
          if(chlIndex>fragment[1]) {
            tmp = children[j];
            found = true;
            break;
          }
        }                                                            
      }
      
      if(!found) {
        console.warn("Element not found: <"+fragment[0]+">");
        console.log("Last element: ",tmp);
        if(create) {
          var tmpnew = doc.createElement(fragment[0]);
          tmp.appendChild(tmpnew);
          tmp = tmpnew;
          
          //console.log("Created new element <"+fragment[0]+">", i, j);
        }
        else 
          return null;
      }
    }
    return tmp;
}
/**Run onload functions**/
window.addEventListener("load", function() {
  cons.info("Running onload events: "+onloads.length+" total.");
  for(var i=0,l=onloads.length; i<l; i++) {
    //Fuck logic, I'm javascript!
    onloads[i]();  
  }
});

/**CSS styles**/

function addCssStyle(styleText) {
  var head = document.head,
  style = document.createElement('style');
  
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = styleText;
  } else {
    style.appendChild(document.createTextNode(styleText));
  }
  
  head.appendChild(style);
}
var images = {
  close: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIZDgsijzsprwAABS1JREFUSMeFVmuIVVUU/vZae+/zuo+549xJvZkUkTRZVhr5+hGBET1E5ablVZAa0iFCKIp+hGLgnyDoT+SImviA0S6jaVFQBJKQEVKQChYFhuagTuPMXO/jnLPP7seMV++M5jmcP2et8337rP2t/S2B/7keW7y2AGA5gOcB5AE8Oh76FcBlAF8BOPTL8b0XbochbvVy9vyVUwFsEcSvEcAAwUtlIXUKABCHFdQqwwASJICxidkJYPOpEwcH7kgwe/7KZ4UQn5OQKT/bCd9vAzNDsGrJsyaCMQbV6lVUhy8hsXHFWvvSqRMHv7k5jyeAbxTE+xwvo9vz98IL2iC1hlQuiLnlYalBkqGdAK6fRRyH2phoTWeh6+ql86d/mkQwe/7KpUy8K8h0Uq5jJqTWYKkgBN12j4SgMULJ8PwcrE1gwtqSfKHr10vnT599avn7QgDA7CeLBcHqtBfksrmOmSCWUNKBdFMglkhMiKg6OlZxAASC8tMg1khMjLheQRQ3kJgYQ1fOoXFtaDixyUO//XjgwtjyBG1S2su25aaDWEKShHRTcLW7PfC9aUoHh5SfBo3fyk9D6eBQ4HvTXO1ul24KkiSIJdpy08HaywLYBABizsJX7mHl/JXKTmU/3Q4hGNrxwVJt7+/tXg8AxQ27NVjuh4mLY4WVZZi4VN62LgSAFet39Jo4ej1sVGGtQXX0X1SGB4yJovuItbdaOz57QQ5CCAAJ6tURjAz+s/V6rcvb1oVJXC9p7Za1dstJXG+CA8DI4D8f1KsjABIIIeAFOWjHZ9bOapLKXaKc9Jj0rIW1FsOD5zA48MdHDy9Y1RRBf293WK2NlKq1kVJ/b3d4kzh4cOCPj4cHzzW/BwDlpCGV+7RY+Nxb5x03XdCO31RHoz6KoUvnEEfVsrX25TM/95tbqajriRUshOiTyi/mOmfCcdPNWNioolEfvUBKOXklW5vIcdPI5KaCpC4KIfrmLFrLE8HnLFrLQog+krqYyU1tAQcAJRWUcvKSpJ7UpQDgpzsQZPOI6jXEJmQALX/Rlr+HJWso14NN7OQeYQWSGsSCL08MEku4fgZ+qr3sB22lY4e3hhNzjh3eGvpBW8lPtZddPwNiOYmEBV8mEJ0lbu1WSRKCuGziqHR0z8YmeNe8Zdw1b1mzXEf3bAzjOC4J4rIkOWGRBBCdIQK+JUGwiWk+jfooKkMDb36xs6cFHEAfgL6bSY7s3BBWhgbebtRHWzBIEAj4ngSrAxBkWN3Yh6tX/saVi79vmgguiIuCuDiR5MrF398b+veGJbBSgCAjWB3gP099d/WBR54pMKm5Jm4AsEisRa02/ETHXfff1TFt1kkhxC5BXMy03w3HyyCsV7pgbVfHtFk/dBYe/BDMPUFqCpRyAFho5cNas+Pr/e/svX4WfQCgotwAAOB6GQTpPARxjxDioiAuZqfMgB+0ww/akZ0yA4K4OB7rCdJ5uF5mTJ5jGJXEJptbDOfFVz9dSgJfhI0qorAGawziuA5jDJgZUroQzONmc+uY0h604yOxePzorp5fHl6wSrQ42or1OzYmSfJxVB9Fo3YN1lokSECgsXOKxtWWJJNijhdAuWkQ0av9vd2f3dYyixt2LwWwvxHWUmFtBCZq/N9cAFYOtJeBo70KgFJ527ojdzT9Fet3FJQTbDHGrEviOke1awijOqyJml2qlQvlBSDpGmbeHTWube7v7b5wR9Nf/MK76viXH0YAUHxjX4FZ3Ty2zB1PO3l9bDEmOlT+ZM1tx5b/AB7j+hZ+X5bKAAAAAElFTkSuQmCC",
  maximize: "iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIZDiAniSEgSQAABCVJREFUWMPtl01sVFUYhp/33qmFGpq2UYy1RApV/GGGuHLB0miMTVA3hsR2qtGqWLXGCiX+pK2CEgnBxmiNNKHOEBf+BAgJG2WniQtjmukPUUExlIaCaVEc29Lhfi56O9Npp3Nn3OCi7+rm3nNOnnvO953v/eB/IgFEYvagiS1AlYyVJiSYApLABYwzOJwdH+PESJsmC1387oO22XVZg0MtHjWICqDMwAVmJP4B+hMN2hcCMLHFEdvm0JQTFypvoGUEPioIImabXPG5RDUAzqLlZmXUA/vmPlcFLWwwIjFW6G4MrWDQjFgB65akOWWsDIIwoysR1VcFH/pjujo5QacHewJGZkBMi08jSx4/DjSqt9gAPNWqaVJ8acavQXHq+E9TAWvWh+O2vViQm2J2vUI0S6xbkkLMzA+hZN7UcnAF2zfGraEYkNXQLng24NizQC4E5rm4UfBC5FO7pxCIcNxek3iD4GhNZkCMM+n3xqhnHDPjysI5jrjXHFo29NqqfGtHYrZV0KYcsefBMc+Iz3t1KQPicNbfpnMmOgcatcVgh2f8lgPmqdIS7l8Koi5u5UCDtPhKMI/uFLw4OU6z56WzaTQNMj7GCe8qLXi0DjToAMBAo7plPG/Gkaw/MpKeuLxkpjTqLxMnswAM8+CtxATtJxv0+6lWTU9O0GlGm4kvFl1yuXRH3G4Oebzsuuww47IZ7w1EtSvvrdpn612XLonHzfjTPPYONGl3YK0JDihT5DMeSKVIDjfp20KmbOi1VSWlPAwkBxt1mGUta1nXSpv67BYwFTPn1oO2oijPGqSNcXvFgSYzvrkKPcNRnSpojvGQOXw3McaeIK+r+R5z6DRDdCmV/tphTmQ9b+Lwunwn5XkcEjyXiCqZp+i9inhXIuRf8Z+kUvQMP6n+BeNqxy9yfqRNk07abYvj4Tp2zW3nXQesKnwbu+XQOQcB4Dg0mLgvb9ETj8xB+BbiGTfEx5GYRdM24ZA1I45WraYDmB3suqyRqBa0l7vYnTE7EoJtgqYcFfQns9mKmbPolZIMT/O9YPMiCwG3h+NWg/GHjA6JaoPpNAgOtfP+eGeJsVVi7eKSwxXEh4NR/ZDPNE/12f6VDuvk8OgCc1WJsQvxt8Qq3wtVZvyIR82CCWuXcFPvJBr1QVCg/vKEznnQ4xk/53B6SkPMqiIDMtuBBfUfexOnebvQdByM6msZ73sBfhi4br5nLQuAOHzF2E+XvGLukURUPXjsMcPyDAtl+prZXjSPHeHyZIqJ/9hdnyePo8sCwbf0S8kR0XKXjrpuKy2GIRy3pyU6BOV5QDPthN+V55XjsLOsipZCISIxqxW8JLITIYdSmfSFfox6vyEuASQxYzDj9x2XgFHLv8VZGr/I+arVHDeY9lO0wg/MEBDydyJllm20r7n+BdJ+jYi6krsGAAAAAElFTkSuQmCC",
  minimize: "iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIZDiAa0UlsWAAABH5JREFUWMPtl8tvVHUUxz/nN3OHofJQaCwQQgxKDNEoCQviQtEFhA7VNiR0Cg1KXZj4ChUfiQ8oBV8pMRIXmLKwlRDo0BDAtFM3LHBjSFTU6EL/AB4+WkuRQu/c+3XR6XvuXBKDccFZzdzz+/3O95zfeXx/8D8RG/ux7rDuWFBJowkFf/NZd70Ft8poNq/nHNwbiK+Pb7RTAA5g83HNWVjJh85oN8chN5f9m3q0vNQhq9vl3ZS1FrmSIHq1y+BjjDec0Znt045xIIkKnjXjpbHFDl5JJfg026NNE0fIsnntXrGU99d2KF3W4z5tb1hDZ7ZHtWPfatpV0ZDXXufYa0YFgBnzLaQRIFm0nChxZ+vN8WA2r+W5DB9l+2hx0CJjoGoxR4AfIu9bPGbGNhwP1ffKVOAn59FsxosllgfjQFxIZ5hglcHT09AsMfFBQ56NBo+PBoY7TVRFx0OGWIKBGQ87aDOPfow1M1aKq5bg0PjVHK2xAQIOKuS7Gd4ZSbMiiNH/JrEoCkbtSeZjE0DNWFEKRBFI27EN1jEOBKCrxs5hfKKQ/rg8dGJhlC7lkQZmx50heC+30fZNyssJ6crY5zLaJMKYoo9MVufjYcXciwIhOoMk+6fsm74ol6EN+CrGnVSUKnQkx4ugdCSuSHzfvc4GywCRZftomZwTJQPiKJSJVoAIynTQeWZs39Krukgg2Ty7HLTE3W8ohqN0BQ8f8Ms6YqyS0ZLt0coZQFa3yzMxVzAgoRgsl6IUaR/fjGsx+4eBu2QsmDFrANZ2KF21mPstpEpikRMLMdKIlDkKxUhcGjROfJmxG5GdtUe15lgmqDBIGwhjWDBEgcthgosaYaC7zn7httyW2/JvqeL0Dlt7kvkpj7Tz8UJHEiMoePhpH//YU/ZHuUM3H1ciMYvKwJF0STw/QKkU/g1R6L/AlbNNdr0skPpeNTnjUWAJUAXMLg6wZLFt+2ZcCwNaczV2OgpEcg77BHVA0sATCChg+BKDiEsY54ZHOPhFnQ0xZTi1yDnjCTO2xcXOHMuiopGYRaWgzoyVpbw1G/0gUTs7xTfAmamzptVChZyQoingpAlaEaULYqbvJB63L5exMyWHXq7GTodij+DXmMSK5iNJPIOyTD+E1lw1rWX5SFKcR/wZAyRyKPoBEjFDU4RgigSyul1eYDSb8UhMrUXSgFQKH8rwlVFH3mzI6+VIIPct423naL6JHBmK0t3QaHXE8JE0YueWvJ6cASSb12sO3ongmFMNF7gcZaT/AlckBqftVwmWdw/wwtbii9IBbMkrY2IHzHxoAUeA3cD5MVITJrgYBeRsk11HE8QphFaM3RJXS9zRhsAx8eQMjQfMsbQEJWwrDLGzK2MHLKBV4luJ3zTCQEwOnZMIx6qjq9reFbwK/FgiXxrHgTjxs8Rfk9uBxJ5cB29119vvxUfYaYmtoWiMY1bDIxwUrM9V256x6shl7FAY8Lzg8LSE65jS9BryagaeMbg7NA7kqm3/rRhujXnNK8DrBk3A0asF2npiZtd/Kv8ATqW0KY+DOD0AAAAASUVORK5CYII=",
  getUrl: function(image) {
    return "data:image/png;base64,"+this[image];
  },
  css: function(image) {
    return "background-image: url(\""+this.getUrl(image)+"\");";
  }
  
};


var style = 
"div.update_list {"+
  "position: fixed;"+
  "bottom: 40px;"+
  "left: 30px;"+
  "max-width: 130px;"+ 
  "text-align: center;"+
  "z-index: 666"+
"}"+
"div.update_list div.update_item { "+
  "background-color: rgba(0,0,0,0.8);"+
  "display: inline-block;"+
  "color: white;"+
  "width:120px;"+
  "text-align: left;"+
  "border: 1px solid black;"+
  "font-family: monospace;"+
  "padding: 5px;"+
  "margin: 8px;"+
  "position: relative"+
"}"+
"div.update_list div.heading{ "+
  "display: block;"+
  "color: #0096FF;"+
  "padding-left: 3px;"+
  "background-color: white;"+
  "position: relative;"+
  "-webkit-box-shadow: 0px 0px 8px 0px rgba(255, 255, 255, 0.75);-moz-box-shadow:    0px 0px 8px 0px rgba(255, 255, 255, 0.75);box-shadow:  0px 0px 8px 0px rgba(255, 255, 255, 0.75);"+
"}"+
"div.update_list a.poster_name { "+
  "color: #0096FF;"+
  "font-weight: bold;"+
"}"+
"div.update_list div.update_item a.text { "+
  "display: block;"+
  "overflow: hidden;"+
  "color: white;"+
  "text-overflow: ellipsis;"+
  "max-height: 120px;"+
"}"+
"div.update_list div.update_item a.text:hover { "+
  "color: white;"+
"}"+
"div.update_list div.tools {"+
  //"display: none;"+
  "position: absolute;"+
  "right: 0px;"+      
  "top: 0px;"+
  "padding: 1px;"+
"}" +
"div.update_list div.tools div.tool {"+
  "background-repeat: no-repeat;"+
  "background-size: contain;"+
  "background-position: center;"+
  "display: inline-block;"+
  "cursor: pointer;"+
  "width: 18px;"+
  "height: 18px;"+
  "margin-top: 1px;"+
  "margin-left: 1px;"+
  "margin-right: 1px;"+
"}" +
/**Large view options**/
"div.update_list div.update_item.large {"+
  "position: fixed;"+
  "top:100px;"+
  "left: 15%;"+
  "width: 70vw;"+
  "z-index: 667;"+         
"}"+
"div.update_list div.update_item.large a.text {"+
  "overflow: visible;"+
  "max-height: 10000px;"+
"}"+
"div.update_list div.update_item.large div.tools div.tool, div.update_list div.update_item div.tools div.tool.permanent {"+
  "display: inline-block;"+
"}"+
"div.update_item div.editor {"+
  "display: none;"+
"}"+
"div.update_item.large div.editor {"+
  "display: block;"+
"}"+

/**TOOLS**/
"div.tools div.tool a {"+
  "display: inline-block;"+
  "width: 100%;"+
  "height: 100%;"+
"}"+
"div.tools div.tool.close {"+
  images.css("close")+
"}"+
" div.update_item div.tool.maximize {"+
  images.css("maximize")+
"}"+
" div.update_item.large div.tool.maximize {"+
  images.css("minimize")+
"}"+
/**Quick reply**/
"div.editor {"+
  "text-align: center;"+
"}"+
"div.editor textarea, div.editor button.submit {"+
  "display: none;"+
"}"+
"div.update_item.large.reply div.editor textarea, div.update_item.large.reply div.editor button.submit {"+
  "display: block;"+
"}"+
"div.update_item.large.reply button.replyBut {"+
  "display: none;"+
"}"+
" div.editor textarea {"+
  "width: 90%;"+
  "margin: 5px auto 5px auto;"+
  "border: 1px dashed black;"+
  "resize: vertical;"+
"}"+
" div.editor textarea:focus {"+
  "border: 1px dashed #BD6B17;"+
"}"+
" div.editor button.submit {"+
  "margin: 0 auto 0 auto;"+
"}"+
"div.update_list div.update_item.large.reply a.text {"+
  "max-height: 40vh;"+
  "overflow: auto;"+
"}"
;


addCssStyle(style);