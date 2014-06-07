// -----------------------------------------------------------------
//
// drei.to - Skip-Enter
// V. 0.01
// Date: 2010-06-22
//
// -----------------------------------------------------------------
//
// This script submits the disclaimer page automatically without
// an ad popup.
//
// -----------------------------------------------------------------
// ==UserScript==
// @name           drei.to - Skip-Enter
// @description    Skips Enter Page
// @namespace      drei.to - Skip-Enter
// @include        http://drei.to/*
// @include        http://*.drei.to/*
// ==/UserScript==

/************************************************************
***                                                       ***
***                       Beginning                       ***
***                                                       ***
************************************************************/

function SkipEnter() {
  try
  {
    var enter_form = document.getElementsByName("enter")[0];
    enter_form.submit();
  }
  finally
  {
  }
}

window.addEventListener('load', SkipEnter, true);