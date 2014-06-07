// ==UserScript==
// @name           Call of duty MW3 (Game)
// @namespace      Call of duty MW3 (Game)
// @description    by Daveini
// ==/UserScript==


For use this Script Open it whith Cheat engine or Java.
Script:
_____________________________________________________________________________________

[ENABLE]
//code from here to '[DISABLE]' will be used to enable the Script
0042205A:
jmp 400308
400308:
cmp esi,010BF2D8
je 00422060
mov [esi+00000150],ecx
jmp 00422060

 
 
[DISABLE]
//code from here till the end of the code will be used to disable the Script
0042205A:
mov [esi+00000150],ecx
00422060:
test eax,eax

_____________________________________________________________________________________