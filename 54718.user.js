// ==UserScript==
// @name           Facebook MouseHunt Horn Timer
// @namespace      http://userscripts.org/users/101716
// @description    Shows horn timer and alerts when horn is ready to sound...
// @include        http://apps.facebook.com/mousehunt/*
// ==/UserScript==

var inputs = document.getElementsByTagName("input");
var timerInput = null;
var timerFunc = null;
var timerDisplay = null;

if (inputs) {
  for (i = 0; i < inputs.length; ++i) {
    if (inputs[i].id.indexOf("hornWaitValue") != -1) {
      timerInput = inputs[i];
      break;
    }
  }
}

inputs = null;

for (f in unsafeWindow) {
  if (unsafeWindow.hasOwnProperty(f) && typeof unsafeWindow[f] === 'function') {
    if (f.indexOf('moveTimer') != -1) {
      timerFunc = unsafeWindow[f];
      break;
    }
  }
}

var alerted = false;
var lastValue = -1;
var timerValue = -1;
var first = true;
var canAlert = (location.href == "http://apps.facebook.com/mousehunt/")
               || (location.href == "http://apps.facebook.com/mousehunt/index.php")
               || (location.href == "http://apps.facebook.com/mousehunt/soundthehorn.php");
function updateTimer()
{
  if (lastValue != timerInput.value) {
    lastValue = timerValue = timerInput.value;
  } else {
    --timerValue;
  }

  if (timerValue < 0) timerValue = 0;
  timeoutvalue = (parseInt(timerValue)) * 1000;
  temp = timeoutvalue/1000;
  Rmins = parseInt(temp/60);
  Rsecs = temp%60;

  if (Rmins < 10) Rmins = '0' + Rmins;
  if (Rsecs < 10) Rsecs = '0' + Rsecs;
  timerDisplay.innerHTML = Rmins + ":" + Rsecs;
  
  if (timerValue <= 0) {
    if (!alerted) {
      if (!first && canAlert) {
        alert('Ready to hunt!');
        timerFunc();
      }
      alerted = true;
    }
  }

  if (!alerted) {
    first = false;
    setTimeout(updateTimer, 1000);
  }
}

if (timerInput) {
  timerDisplay = document.createElement('div');
  timerDisplay.style.position = 'absolute';
  timerDisplay.style.top = '35px';
  timerDisplay.style.left = '5px';
  timerDisplay.style.backgroundColor = '#ff0000';
  timerDisplay.style.color = '#fff';
  timerDisplay.style.fontWeight = 'bold';
  timerDisplay.style.fontFamily = 'monospace';
  timerDisplay.style.fontSize = '16px';
  timerDisplay.style.padding = '5px 10px';
  document.body.appendChild(timerDisplay);

  updateTimer();
}