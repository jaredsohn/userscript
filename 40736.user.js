// ==UserScript==
// @name        Dump.Ru helper for Opera 8 - 9 (replace button with a link)
// @version     1.01
// @date        2007-08-12
// @author      Mike Samokhvalov <mikivanch@gmail.com>
// @download    http://www.puzzleclub.ru/files/dump_ru.js
// @include     http://dump.ru/files/*
// ==/UserScript==

(function(){

  if(window.location.href.search(/^http:\/\/dump\.ru\/files\/\w\/\w+\//i) == -1)
    return;
    
  window.opera.addEventListener('BeforeExternalScript', function (e) {      
    var src = e.element.getAttribute('src', false);
    if(src.indexOf('http://promo-reklama.ru/adv.php?') != -1)
      e.preventDefault();
    if(src.indexOf('/banners/banners.php') != -1)
      e.preventDefault(); 
      
    }, false);  

  var count = 0;
  var addStyle = function(css)
  {
    if(!document || !document.documentElement)
    {
      if(count < 500)
      {
        setTimeout(addStyle, 25, css);
        count++;
      }
      return;
    }
      
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('style', 'display:none !important;');			
    s.appendChild(document.createTextNode(css));
    document.documentElement.appendChild(s); 
  };
  
  var getFormParams = function(f)
  {
    var params = '', sep = '';
    for(var i = 0; i < f.elements.length; i++)
    {
      if(f.elements[i].name)
      {
        if(f.elements[i].tagName == 'INPUT' && f.elements[i].type == 'checkbox')
        {
          if(f.elements[i].checked)
          {
            params += sep + f.elements[i].name + '=on';
            sep = '&';
          }
        }
        else if(f.elements[i].tagName == 'INPUT' && f.elements[i].type == 'radio')
        {
          if(f.elements[i].checked)
          {
            params += sep + f.elements[i].name + '=' + escape(f.elements[i].value);
            sep = '&';
          }
        }
        else
        {
          params += sep + f.elements[i].name + '=';
          if(f.elements[i].value)
          {
            if(f.elements[i].name == 'filename')
            {
              var v = f.elements[i].value;
              v = encodeURIComponent(v);
              v = v.replace(/%20/g, '+');
              params += v;
            }
            else
              params += escape(f.elements[i].value);
          }          
          sep = '&';
        }      
      }    
    }
      
    var input = f.getElementsByTagName('input');  
    for(var i = 0; i < input.length; i++)
    {
      if(input[i].type == 'image' && input[i].name)
      {
        params += sep + input[i].name + '.x=0&' + input[i].name + '.y=0';
        sep = '&';
      }
    }

    return params;    
  }
  
  var onLoad = function()
  {
    var f = document.getElementsByTagName('form');
    for(var i = 0; i < f.length; i++)
    {
      if(f[i].action && f[i].action.indexOf('/loadfile.php') != -1)
      {
        f[i].addEventListener('submit', function(e){
          e.preventDefault();
          var url = '';
          if(f[i].action)
            url += f[i].action;
          else
            url += window.location.href;          
  
          url += '?' + getFormParams(f[i]);
          
          for(var j = f[i].elements.length - 1; j >= 0; j--)
          {
            if(f[i].elements[j].tagName == 'INPUT' && f[i].elements[j].type == 'submit')
            {
              var a = document.createElement('a');
              a.href = url;
              a.setAttribute('style', 'font-size: medium; font-weight: bold; display: inline-block; padding: 0 10px 0 0;', false);
              a.innerHTML = '\u0421\u043a\u0430\u0447\u0430\u0442\u044c';
              f[i].elements[j].parentNode.replaceChild(a, f[i].elements[j]);
              break;
            }
          }          
        }, false);
        break;
      }
    }
  };
  
  addStyle('td[background] {display: none !important;}');
  
  if(typeof(opera.version) == 'function' && opera.version() >= 9)
    document.addEventListener('DOMContentLoaded', onLoad, false);  
  else
    document.addEventListener('load', onLoad, false);

})();