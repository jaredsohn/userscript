// ==UserScript==
// @name           Potato Counter Solver - Auto
// @description    Solver for the potato counter. It's auto baby!
// @include        *.neopets.com/medieval/potatocounter.*
// @version        1.0
// @author         Demeiz
// @grant          none
// ==/UserScript==
// Okay so it's not pretty, but this is an effective way to count the potatoes. Previously the value was accessible via the source.
value=document.evaluate("count(/html/body/div/div[3]/table/tbody/tr/td[2]/table/tbody/tr/td/img)",document,null,1,null).numberValue
// The guess should be in the box now..So we'll click the button
Button = document.evaluate("//input[@value='Guess!']", document, null,7, null)
buttonclick = Button.snapshotItem(0)
buttonclick.click()
// Well if we're here then it's worked so far. Last bit of code restarts it ^__^
second = document.evaluate("//input[@value='Play Again']", document, null,7, null)
clickretry = second.snapshotItem(0)
clickretry.click()