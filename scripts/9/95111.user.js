// ==UserScript==
// @name           LetterBlox Auto
// @namespace      280683280683
// @description    Letter blox auto player test.
// @include        http://www.omgpop.com*
// ==/UserScript==
set WshShell = WScript.CreateObject("WScript.Shell")

INSTRING=InputBox("Copy and paste your result here.")
'http://grecni.com/texttwist.php
'^^^ A really nice word unscrambler. I'm working on
'an actual program that will create all possible
'permutations, but this is almost always good enough

For i = 0 To 5
 INSTRING=Replace(INSTRING, "  ", " ")
Next

INSTRING=Replace(INSTRING, " ", "~")
MsgBox("You will have 2 seconds to switch window focus to the game before the algorithm begins. The Timer starts when you hit 'OK'.")
WScript.Sleep 2000
WshShell.SendKeys(INSTRING)