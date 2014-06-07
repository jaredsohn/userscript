// ==UserScript==
// @name           mihir
// @namespace      http://msmvps.com/blogs/senthil
// @description    Refreshes
// @include        http://www.irctc.co.in/* // @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do?*
// @include        * 
 
// ==/UserScript== 

SetTitleMatchMode, 3MsgBox, SL Anti-Idle for Multiple Clients is now running.StartingLabel:GroupAdd, clients, Second LifeWinGetActiveTitle, Title
MouseGetPos, xpos, ypos; MsgBox, The active window is "%active_pid%".

If WinExist("Second Life")     ;
{
GroupActivate, clients
;WinActivateMouseMove, 20, 30, 50, RMouseMove, -20, -30, 50, R
GroupActivate, clients;WinActivate
MouseMove, 20, 30, 50, R
MouseMove, -20, -30, 50, R

GroupActivate, clients
;WinActivate
MouseMove, 20, 30, 50, R
MouseMove, -20, -30, 50, R

GroupActivate, clients
;WinActivate
MouseMove, 20, 30, 50, R
MouseMove, -20, -30, 50, R

}

else
{
MsgBox, Unable to find any SL clients.
ExitApp
}

IfWinExist, %Title%
{
WinActivate
}

else
{
MsgBox, Unable to find the previous program.
}

MouseMove, %xpos%, %ypos%
Sleep 900000 ; 15 minutes
Goto, StartingLabel
