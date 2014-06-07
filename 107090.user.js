// ==UserScript==
// @name           Qt Gradient Helper
// @namespace      http://www.AniLeech.com
// @description    Adds support for Qt Gradients to the "Ultimate CSS Gradient Generator".
// @include        http://www.colorzilla.com/gradient-editor/
// @icon           http://www.anileech.com/uglylogo.png
// @version        1.2
// ==/UserScript==

//Create, style and append result node.
var resNode = document.createElement('div');
resNode.className = 'css-output-text';
resNode.style.maximumHeight = '90px';
resNode.style.borderColor = '#44A51C';
//Image = Qt logo, © 2011 Nokia Corporation and/or its subsidiaries. Nokia, Qt and their respective logos are trademarks of Nokia Corporation in Finland and/or other countries worldwide.
resNode.style.backgroundImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAVCAYAAABLy77vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHEhMdFunFwSwAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAqpJREFUOMullNtvVFUUxn9rX87Z58ylF6Z2OghF2wRjG0xsRRIftL6b+JfyZPRBQgwxEKJBSUytltDYFlpghIFpy8xwzlk+TK2HzFAf+F529mWtvdb6vrVEVfWv9gM29v7k3VmHMYK3Mamrk/oJIpuQuDoiwmmQnb8f6tWfv+PT5RpF8eaH3gYqforppEXqJ3AS4W2MMxEAbqu9Q4jNqU4AXuU9Ovkend7eyN1U0sKgoMpb4WXWxTEm9d0nLzlXX+Lj+WWssbwqetx9/D1FkZEXCurB9LDiTmxM2YECnYOMVmWJKwsrOOu5uXmH4KpcnvsaayLazwc0wwrLM2uUEzHlnQD3HnRZeW8ZgJ0Xv5H5+/ywcQsRoW7nefZCWZw9D0Bkw/iIRCD1VYKPAXh8uEUUWe5urwNQj1usXVxDVZkMTVbnvsKIHXUEMH/mXKmIBwigKFmR05yc4sYfPyIi7Ha2uLZ5lULzcREJWV68lurJqorB49zQJA0xaZKPT+1tYMr0qyoH/W6JRT0+B2MsOf03/j1y+rCz/59iw9yxE4MRoZ8dYP41UaXcfq/RrwpxZGh3nwJwtvYBzw/7XFlYAeDJ0Tb9bDBkMHoH7Tcxx6IciWjpQpXrv98EYDqc5cPGl1x+/yPyImO/e58kGXDv0TbOeD65sHoyFeTGxm1d31vn0mLlRN29fsHTZzFfXPycRm2KXnbInf1vh+UUMKIM8gxBMOJIfG00IgFCbJhpDPjm1+sABFdhOrSGxVcoCsGJx8qwVQUZT4EAsReS9IjN/a2hUCcvoTp+1syk8+O7H6BQOD8beDT4ifbuL4iAiEVLQk18nWZlgWZ1EXeayBSwRpgMM9SiBrW4QWQCzgynYxnus8VVCvok/ojYplSjMySuSuInCK6KPW7K/8M/Whzgoy3ZVRMAAAAASUVORK5CYII=)';
resNode.style.backgroundPosition = '4px 20px';
resNode.style.backgroundRepeat = 'no-repeat';
var labels = document.getElementsByClassName('panel-label');
labels[4].parentNode.insertBefore( resNode ,labels[4].nextSibling );

var oldResult = ""; //oldResult is used to monitor for changes.
checkForUpdate();   //Start monitoring loop.

/**
 * Checks the 'result' field of the gradient editor for changes at
 * a set interval. If changes are found then the result node is updated 
 * to reflect these changes.
 */
function checkForUpdate()
{
  var outputNodes = document.getElementsByClassName('css-output-text');
  var browserOutputNodes = outputNodes[1].getElementsByTagName('div');
  var newResult = "";
  for(var i = 0; i < browserOutputNodes.length; i++)
    if(browserOutputNodes[i].innerHTML.search('-webkit-linear-gradient') > -1)
	   newResult = browserOutputNodes[i].innerHTML;
	   
  if(newResult !== oldResult) //if change occured.
  {
  	unsafeWindow.console.log(newResult);
    resNode.textContent =  
      //Transform the normal webkit css to something that can be used by Qt.
      newResult.replace('-webkit-linear-gradient', 'qlineargradient')
      .replace('top, ', 'x1: 0, y1: 0, x2: 0, y2: 1,')
      .replace('left, ', 'x1: 0, y1: 0, x2: 1, y2: 0,')
      .replace(
      //  First capture    |Second capture
      //(6 hex characters) |(percentage)
        /(#[0-9a-fA-F]{6}) ([0-9]{1,3})%/g, //change percentage to double in the 0-1 range.
        function(m, hex, perc){ return ' stop: '+ parseInt(perc)/100 +' '+hex; } 
      )
      .replace(
      // First capture (rgba color)                       Second capture (percentage)
        /(rgb(?:a)?\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}(?:,[0-9](?:\.[0-9]{1,2})?)?\)) ([0-9]{1,3})%/g,
        function(m, hex, perc){ return ' stop: '+ parseInt(perc)/100 +' '+hex; } 
      );
    oldResult = newResult;
  }
  	
  setTimeout(checkForUpdate,300);
}