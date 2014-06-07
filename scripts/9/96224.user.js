// ==UserScript==
// @name           twitter automatic unread tweets show
// @description    Automatic shows unread tweets. Works in /home and /replies.
// @include        http://twitter.com/*
// ==/UserScript==

// (c) new bsd Fyodorov "bga" Alexander <bga.email@gmail.com>

;(function($G)
{
  // .buffered
  // .last-on-refresh  
  // .minor-notification
  
  //var console = {log: function(){}};
  var STATUS_IDS_TO_SAVE = 10;
  var _jq;
  
  var _waitLoading = function(_fn)
  {
    if(_jq('#more').hasClass('loading'))
      setTimeout(function(){ _waitLoading(_fn) }, 100);
    else
      _fn();
  };
  var _hasIds = function(lastIds)
  {
    var i = -1; while(++i < lastIds.length)
    {
      if(_jq('#status_' + lastIds[i]).length > 0)
        return true;
    }
    
    return false;
  };
  var _showUnreaded = function(lastIds)
  {
    var firstId = _jq('#timeline > .status')[0].id.slice(7);
    
    console.log(firstId);
    
    var i = lastIds.length; while(i--)
      if(+firstId >= +lastIds[i]) break;
    
    if(i == -1)
      return setTimeout(function(){ console.log('wait'); _showUnreaded(lastIds) }, 1000);
    
    if(!_hasIds(lastIds))
    {
      _jq('#more').click();
      setTimeout(function(){ _waitLoading(function(){ _showUnreaded(lastIds) }) }, 100);
    }
    else
    {
      var i = -1; while(++i < lastIds.length)
      {
        var v = _jq('#status_' + lastIds[i]); 
        
        if(v.length > 0)
        {
          v.addClass('last-on-refresh');
          
          break;
        }  
      }
      
      _saveLastIds(false);
    }
  };
  
  var _getData, _setData;
  
  if($G.localStorage && !$G.opera) // opera does not correctly saves localStorage if user shutdown PC using soft power button
  { 
    _getData = function(key)
    {
      return localStorage.getItem(key);
    };
    _setData = function(key, v)
    {
      localStorage.setItem(key, v);
    };
  }
  else
  {
    _getData = function(name)
    {
      var c = document.cookie;
      var matchStr = '; ' + name + '=';
      var i = c.indexOf(matchStr);
      
      // may be in start of cookie string
      if(i < 0)
      {
        if(c.slice(0, (matchStr = name + '=').length) == matchStr)
          i = 0;
      }
      
      if(i > -1)
      {
        var j = c.indexOf(';', (i += matchStr.length));
        if(j < 0) j = c.length;
        return decodeURIComponent(c.slice(i, j));
      }
    };
    _setData = function(key, v)
    {
      var expired = new Date();
      expired.setTime(expired.getTime() + 359*86400000);
      document.cookie = key + '=' + encodeURIComponent(v) + '; expires=' + expired.toGMTString();
    };
  }
  
  var _saveLastIds = function(isAll)
  {
    if(isAll == null) isAll = false;
    var i = 0;
    var _filter = (isAll) 
      ? function(v){ return true }
      : function(v){ return !_jq(v).hasClass('buffered') }
    ;  
    var vs = _jq('#timeline')[0].childNodes;
    var lastIds = [];
    
    var j = -1, v; while((v = vs[++j]))
    {
      if(v.id > '' && _filter(v))
      {
        lastIds[i++] = v.id.slice(7);
        if(i == STATUS_IDS_TO_SAVE) break;
      }  
    }
    
    console.log('vs.length = ', vs.length, 'j = ', j, 'i = ', i);
    
    _setData(_lsKey(), JSON.stringify(lastIds));
  };
  
  var _lsKey = function()
  {
    return 'bga-unreaded-show-lastIds-' + document.body.id;
  };
  
  var _init = function(a)
  {
    _jq = $G.jQuery;
    
    if(document.body.id != 'home' && document.body.id != 'replies')
      return;
    
    if(a != 1)
      return setTimeout(function(){ _init(1) }, 1000);
    
    console.log('_init');
  
    var lastIds = _getData(_lsKey());
    
    console.log('lastIds = ' + lastIds);
    
    if(lastIds != null)
    {
      lastIds = JSON.parse(lastIds);
      _showUnreaded(lastIds);
    }
    else
    {
      _saveLastIds(false);
    }
    
    //console.log(_jq('#results_update').length);
    /*
    document.getElementById('new_results_notification').addEventListener('mousedown', function(e)
    {
      console.log('mousedown 1');
      setTimeout(function(){ _saveLastIds(true) }, 100);
    }, true);
    */
    document.getElementById('new_results_notification').addEventListener('mouseup', function(e)
    {
      console.log('mouseup 1');
      setTimeout(function(){ _saveLastIds(true) }, 100);
    }, true);
    /*
    document.getElementById('new_results_notification').addEventListener('mouseup', function(e)
    {
      console.log('mouseup 1');
      setTimeout(function(){ _saveLastIds(true) }, 100);
    }, true);
    */
    /*
    document.getElementById('results_update').addEventListener('click', function(e)
    {	
      console.log('mousedown 2');
      setTimeout(_saveLastIds, 100);
    }, true);
    */
  };
  
  var _waitJQ = function(_fn)
  {
    if($G.jQuery)
      _fn();
    else
      setTimeout(function(){ _waitJQ(_fn) }, 100);
  };
  
  // opera has some issue with DOMContentLoaded
  var _onDOMReady = function(_fn)
  {
    if(document.body)
      _fn();
    else
      setTimeout(function(){ _onDOMReady(_fn) }, 100);
  };
  
  _onDOMReady(function(){ _waitJQ(_init) });
  
})(this);