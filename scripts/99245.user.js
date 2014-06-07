// ==UserScript==
// @name           Enhancement of scroogle
// @description    Enhancement of scroogle
// @include        http://www.scroogle.org/*
// ==/UserScript==

;(function($G)
{
  var console = {log: function(){}};
  
  var _each = function(vs, _fn)
  {
    var ret;
    var i = vs.length; while(i--)
    {  
      ret = _fn(vs[i], i, vs);
      if(ret === false) break;
    }
    return ret;
  };
  var _qsa = function(sel, v){ return (v || document).querySelectorAll(sel) };
  
  var _onDOMReady = function()
  {
    _each(_qsa('form'), function(v)
    {
      v.method = 'GET';
    });
    _each(_qsa('ul > font > font'), function(v)
    {
      var a = document.createElement('a');
      a.href = 'http://www.google.com/search?newwindow=1&site=&q=cache:' + 
        encodeURIComponent(v.innerText || v.textContent);
      a.innerHTML = 'Google cache';
      v.parentNode.appendChild(document.createTextNode(' '));
      v.parentNode.appendChild(a);
    });
    _each(_qsa('a'), function(v)
    {
      v.target = '_blank';
    });
  };

  
  var _domReady = (function()
  {
    var _isLoaded = 
      'readyState' in document && function() // stupid opera
      {
        return document.readyState == 'loaded' || document.readyState == 'complete'
      } ||
      function()
      {
        return document.body
      }
    ;  
    var _attachEvent = 
      'onreadystatechange' in document && function(_fn)
      {
        document.addEventListener('readystatechange', _fn, false)
      } ||
      function(_fn)
      {
        document.addEventListener('DOMContentLoaded', _onDOMReady, false);
      }
    ;

    return function(_fn)
    {
      if(_isLoaded())
        _fn()
      else
        _attachEvent(_fn);
    }
  })();
  
  _domReady(_onDOMReady);

})(this);
