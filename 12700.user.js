// ==UserScript==
// @name           Snapfiles Auto Freeware-only Search
// @namespace      http://userscripts.org/users/26957;scripts
// @description    Add the 'search for freeware only' checkbox to the search box on the front page and on freeware pages.
// @include        http://www.snapfiles.com/*
// @include        http://snapfiles.com/*
// @version	       0.1
// ==/UserScript==

if(document.URL.toLowerCase().indexOf('shareware') < 0){

  var se = document.getElementById('search');

  se.style.width = '230px';

  se.style.top = '10px';

  var f1 = se.getElementsByTagName('form')[0]

  var inP = document.createElement('span');

  inP.innerHTML = '<input style="float:left;margin:5px 5px 0 0;" type="checkbox" value="1" checked="checked" name="lc"/>';

  f1.insertBefore(inP, f1.childNodes[0]);


  var s = document.createElement('span');
  s.style.position = 'relative';
  s.style.top = '-2px';
  s.style.left = '224px';

  var data = 'data:image/png;base64,'+
      'iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
      'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAClSURBVHjaYmGAgBwg1oWy5wLxKQYywBYg'+
      '/g/FUaRqZmKgAhg1hDJDeKhhSCwQz8dmGMyQ70hinHgMSgDiM0BsgCzIAqWfIom1ALEZFgO0oLQ6'+
      'EB8D4jIgnoKswBUpxZKCNwKxEMwQZqjp5Bi0Atk1IBMPkGhAI8gBjFj8bg/1NzZxWOZ8AcTRQLyP'+
      '1DSVCbV9FxCLkptOfgFxJRC7AfFrZAmAAAMA9Js83X8IOV0AAAAASUVORK5CYII=';

  s.innerHTML = '<img style="position:relative;opacity:0.5;margin:-3px 3px 0 3px;border:none;" src="'+data+'" />Only search for freeware';


  var co = document.getElementById('content');

  co.insertBefore(s, co.getElementsByTagName('div')[0]);


}