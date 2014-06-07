// BLAR: BBC Listen Again retargetter
// version 0.1.115 BETA!
// 2007-09-23
// Copyright (c) 2007, Nick Woolley
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "RetargetListenAgain", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BLAR
// @namespace     http://noodlefactory.co.uk/
// @description   Retargets the BBC Listen Again player from RealPlayer to other backends
// @include       http://www.bbc.co.uk/*/aod.shtml
// @include       http://www.bbc.co.uk/*/aod.shtml*
// ==/UserScript==


var amarok_url = "http://snackpot/~nick/cgi-bin/amarok";

function make_alert(name) 
{
  var nam = name;
  return function()
  {
    alert("invoked '"+nam+"'");
  };
}


// Applies a closure function 'operation' to an HTML node and all it's children in turn.
// The operation() function is called with the current node as it's first argument, the 
// node's parent as it's second, and so up up to the original root_node  - the number of 
// arguments equals the depth in the tree.
//
// Note, a node's children are *not* processed if the operation() function returns 
// the value PRUNE.
var PRUNE = true;
function recursive_apply(root_node, operation)
{
  var node_stack = [];
  
  var iterator;
  iterator = function(node)
  {
    if (!node) return;
    node_stack.unshift(node);
    
    // apply the operation to any child nodes, if the operation
    // didn't ask to prune the recursion here
    if (operation.apply(null, node_stack) != PRUNE)
      for(var ix = 0; ix < node.childNodes.length; ++ix)
        iterator(node.childNodes[ix]);
    
    node_stack.shift();
  }
  
  iterator(root_node);
}


function find_node(root_node, name)
{
  var node = root_node;
  var found;
  found = function()
  {
    if (node.nodeName.toLowerCase() == name) return true;
    var children = node.childNodes;
    for(var ix = 0; ix < children.length; ++ix)
    {
      node = children[ix];
      if (found()) return true;
    }
    return false;
  }
  if (found()) return node;
  return null;
}


// returns a function which, given an element, returns the value of
// the named attribute, if present, else returns null.  The function does *not*
// check the argument is an element.
function get_attribute_value(attr_name) 
{ 
  return function(node) 
  {
    // This includes a work-around for an IE "feature" mentioned here:
    // http://tobielangel.com/2007/1/11/attribute-nightmare-in-ie
    // (Reading this kind of thing just makes me sick with fear and loathing)
    var value = node.getAttribute(attr_name);
    if (value != null && typeof value == "object" && "nodeValue" in value) 
      value = value.nodeValue;
    else
    {
      value = node.attributes[attr_name];
      if (value != null && typeof value == "object" && "nodeValue" in value) 
        value = value.nodeValue;
    }
    return value;
  }
}
  

var get_src_attribute = get_attribute_value("src");
var get_onclick_attribute = get_attribute_value("onclick");


//////////////////////////////////////////////////////////////////////
// FakePlayer
//
// This class looks like the RealPlayer object exposed to the javascript
// world in a BBC listen again page via the document.RP property.
// It does nothing. 

function FakePlayer(src_url)
{
    this.srcUrl = src_url;
}


/*
FakePlayer.prototype = 
{
    CanPause: make_alert("CanPause"),
    CanPlay: make_alert("CanPlay"),
    CanStop: make_alert("CanStop"),
    DoPause: make_alert("DoPause"),
    DoPlay: make_alert("DoPlay"),
    DoStop: make_alert("DoStop"),
    GetBandwidthAverage: make_alert("GetBandwidthAverage"),
    GetBufferingTimeElapsed: make_alert("GetBufferingTimeElapsed"),
    GetCanSeek: make_alert("GetCanSeek"),
    GetLength: make_alert("GetLength"),
    GetPlayState: make_alert("GetPlayState"),
    GetPosition: make_alert("GetPosition"),
    GetVolume: make_alert("GetVolume"),
    SetPosition: make_alert("SetPosition"), //function(time)
    SetVolume: make_alert("SetVolume"), //function(volume)
};
*/

FakePlayer.prototype = 
{
  CanPause: function() { return true; },
  CanPlay: function() { return true;},
  CanStop: function() { return true; },
  DoPause: function() { },
  DoPlay: function() {},
  DoStop: function() {},
  GetBandwidthAverage: function() { return 0; },
  GetBufferingTimeElapsed: function() { return 0; },
  GetCanSeek: function() { return false; },
  GetLength: function() { return 0; },
  GetPlayState: function() { return "blah"; },
  GetPosition: function() {},
  GetVolume: function() {},
  SetPosition: function() {}, //function(time)
  SetVolume: function() {}, //function(volume)
};





////////////////////////////////////////////////////////
// The BLAR class
//
// BBC Listen Again Retargeter
//
// This is a base class which does nothing.  You need to subclass it
// with an implementation which does something useful.
// See CgiAmarokBLAR for a practical example.



function BLAR(target_window) 
{
  if (target_window == null) throw "target_window argument must not be null";
  this._targetWindow = target_window;
}

function make_delegate_to(obj, method_name)
{
  var method = obj[method_name];
  return function() { return method.apply(obj, arguments) };
}


// These methods emulate the original logic performed on the BBC
// listen again AOD.shtml page, e.g. updating images and state
// variables.
//
// In general, when overriding thse methods, call the base method
// first before you perform your own actions (unless specifically
// stated otherwise).  This should maintain the original logic.
BLAR.prototype = 
  {
    // this are rebound to call our own versions
    retargettedFunctions: 
    {
      PlayPause: 'playPause',
      Stop: 'stop',
      PosChange: 'posChange',
      VolChange: 'volChange',
      GetStatus: 'getStatus'
    },

    // these are the states as returned by RP.GetPlayState()
    PLAYSTATES:
    {
      STOPPED:    0, // stopped
      CONTACTING: 1, // contacting server
      LOADING:    2, // loading stream
      PLAYING:    3, // playing stream
      PAUSED:     4, // paused
      SEEKING:    5  // seeking       
    },

    _targetWindow: null,

    // a flag used to track the current state of the player
    playstate: 0,
    volume: 0, // FIXME get this from the client


    // starts playing a new url
    play: function(stream_url) 
    {
      this.playstate = this.PLAYSTATES.PLAYING;
      this._targetWindow.ImgPause();
    },
    
    // toggles between play and pause modes
    //
    //
    playPause: function() 
    {
      // The listen again implemenation also calls ImgPause() or
      // ImgPlay() (for play and pause, respectively).  This is
      // handled by resume() and pause().

      switch(this.playstate)
      {
      case this.PLAYSTATES.STOPPED:
      case this.PLAYSTATES.PAUSED:
        this.resume();
        break;

      default: 
        this.pause();
        break;
      }
    },

    // pauses playback
    pause: function()
    {
      this._targetWindow.ImgPlay();
      this.playstate = this.PLAYSTATES.PAUSED;
    },
    
    // resumes from a pause 
    resume: function()
    {
      this._targetWindow.ImgPause();
      this.playstate = this.PLAYSTATES.PLAYING;
    },

    // stops playing
    stop: function() 
    {
      this._targetWindow.ImgPlay();
      this.playstate = this.PLAYSTATES.STOPPED;
    },

    // Changes the playback position of the stream (if this is
    // possible) by the specified number of minutes.
    posChange: function(minutes) 
    {
      
    },

    // Sets the volume property. delta_vol is the amount to change the volume by,
    // and the volume itself is a value from 0 to 100.  
    //
    // The implementation on the listen again page does the following:
    //
    //      if (volume > 80 && delta_vol > 0) volume = 100;
    // else if (volume < 21 && delta_vol < 0) volume = 1;  
    // else volume += delta_vol
    //
    // Also it calls ImgVol()
    volChange: function(delta_vol) 
    {
      if (this.volume > 80 && delta_vol > 0) this.volume = 100;
      else if (this.volume < 21 && delta_vol < 0) this.volume = 1;  
      else this.volume += delta_vol;
      if (this.volume > 100) this.volume = 100;
      if (this.volume < 0) this.volume = 0;
      
      // FIXME do we need to set the volume property in RP, or override ImgVol?
      this._targetWindow.ImgVol();
    },

    // Called periodically by the listen again page to query the
    // playstate by calling RP.GetPlayState().  The playstate values
    // returned by GetPlayState() are as defined in the PLAYSTATES
    // property.
    //
    // Should return a string, typically one of: 'Stopped'/'Loading...' /'Playing'/'Paused'/'Seeking...'
    //
    // Original implementation also does:
    // calls ImgPlay() if stopped or paused 
    // calls ImgPause() if contacting, loading, or playing 
    getStatus: function() 
    {
      var status = "";
      switch(this.playstate)
      {
      case this.PLAYSTATES.STOPPED:    this._targetWindow.ImgPlay(); status =  "Stopped"; break;
      case this.PLAYSTATES.CONTACTING: this._targetWindow.ImgPause(); status =  "Contacting..."; break;
      case this.PLAYSTATES.LOADING:    this._targetWindow.ImgPause(); status =  "Loading..."; break;
      case this.PLAYSTATES.PLAYING:    this._targetWindow.ImgPause(); status =  "Playing"; break;
      case this.PLAYSTATES.PAUSED:     this._targetWindow.ImgPlay(); status =  "Paused"; break;
      case this.PLAYSTATES.SEEKING:    this._targetWindow.ImgPause(); status =  "Seeking"; break;
      default:  status = ""; break;
      }
      return status;
    }

    // Also defined in the AOD player, but currently unimplemented, as
    // these are wrappers for the above:
    //
    // AodStop() - inspect the value of the global 'show_end' and save
    // the resume position using setResume(), then call Stop()
    //
    // FForward(mins) - calls PosChange(mins)
    //
    // Rewind(mins) - calls PosChange(-mins)
    //
    // ImgVol() - sets the volume display by querying RP.GetVolume().
    // Called periodically by to update the volume display.
    //
    // ImgPause() - sets the display status to 'paused'
    // ImgPlay() - sets the display status to 'playing'
    // ImgChange() - something fiddly to do with the document image array
    //
    // some functions mentioned above which are defined in all.js
    //
    // getResume(cookie_id) - gets (and clears) the resume point,  
    //
    // setResume(cookie_id, expiry_period) - saves the resume point
    // (obtained from RP.CurrentPosition) for the audio stream (set in
    // the AudioStream global), with some other information, in the named cookie.
    // 
    // loadResume(cookie_id) - loads the resume point from the aforementioned cookie(s) 
    //
    // checkResume() - loads the resume point from the cookie, if it
    // exists, and if resume is possible, prompts the user if they
    // wish to resume from the start of the stream or the saved resume
    // point. (Called on page load).
    //
    // checkLoaded() - returns true unless realplayer in use and RP.GetPlayState<2 
  };



////////////////////////////////////////////////////////
// The CgiAmarokBLAR class
//
// An subclass of the BLAR class which invokes Amarok via a CGI
// script.

function copy(obj)
{
  var new_obj = {};
  for(var prop in obj) new_obj[prop] = obj[prop];
  return new_obj;
}

function CgiAmarokBLAR(target_window, cgi_url)
{
  // FIXME sanity check needed
  BLAR.call(this, target_window);
  this.cgiUrl = cgi_url;
  // FIXME get volume and status (and position?) from the client
//  GM_xmlhttpRequest
}

CgiAmarokBLAR.prototype = new BLAR("dummy"); // Javascript OO is a bit obscure sometimes, or maybe I'm just being thick
CgiAmarokBLAR.prototype.constructor = CgiAmarokBLAR;

CgiAmarokBLAR.prototype.play = function(stream_url) 
{
  BLAR.prototype.play.call(this, stream_url);
  this.invoke({playurl: stream_url});
};

CgiAmarokBLAR.prototype.pause = function() 
{
  BLAR.prototype.pause.call(this);
  this.invoke({pause: 1});
};

CgiAmarokBLAR.prototype.resume = function() 
{
  BLAR.prototype.resume.call(this);
  this.invoke({play: 1});
};

CgiAmarokBLAR.prototype.stop = function() 
{
  BLAR.prototype.stop.call(this);
  this.invoke({stop: 1});
};

CgiAmarokBLAR.prototype.posChange = function(pos) 
{
  BLAR.prototype.posChange.call(this, pos);
//  this.invoke({: 1}); not yet implemented
  alert("unimplemented");
};

CgiAmarokBLAR.prototype.volChange = function(vol) 
{
  GM_log("volChange: "+vol);
  BLAR.prototype.volChange.call(this, vol);
  this.invoke({setvolume: this.volume});
};

CgiAmarokBLAR.prototype.getStatus = function() 
{
  var status = BLAR.prototype.getStatus.call(this);
//  GM_log("getStatus: "+status);
  return status;
/*
  // FIXME not currently used, as we may need to throttle this repeated querying over the network.
  var status = this.invoke({status: 1});  
  switch (status)
  {
  case 0: status = this.playstate = this.PLAYSTATES.STOPPED; 
  case 1: status = this.playstate = this.PLAYSTATES.PAUSED;
  case 2: status = this.playstate = this.PLAYSTATES.PLAYING;
  default: status = this.playstate = this.PLAYSTATES.STOPPED;
  }
  return status;*/
};


CgiAmarokBLAR.prototype.invoke = function(params)
{
  var components = [];
  for(var param in params)
  {
    components.push(param + "=" + encodeURIComponent(params[param]));
  }
  var url = this.cgiUrl + "?" + components.join("&");

  GM_xmlhttpRequest({method: 'GET',
                     url: url});
}



////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function dump(x)
{
    var s;
    for(var k in x) { s += k + "=>" +x[k] + "\n"; }
    alert(s);
}


function rebind(target_window, blar)
{
  var player_node_name = "embed";
  var player_node = find_node(target_window.document, player_node_name);
  if (player_node == null) throw "Could not find player node '"+player_node_name+"'";
  
  var src_url = get_src_attribute(player_node);
  var base_url = target_window.document.location.toString();
  var abs_url = src_url.match(/^\//)?
    base_url.replace(/^([a-z]+:\/\/[^\/]*).*/, "$1"+src_url) :
    base_url.replace(/\/?[^\/]*$/,"/"+src_url); 
    
  blar.play(abs_url);


  player_node.parentNode.removeChild(player_node);
  target_window.document.RP = new FakePlayer(abs_url);

  for(var func in blar.retargettedFunctions)
  {
    var method_name = blar.retargettedFunctions[func];
    target_window[func] = make_delegate_to(blar, method_name);
  }
};

window.addEventListener('load', function() { rebind(this, new CgiAmarokBLAR(this, amarok_url)) }, true);

