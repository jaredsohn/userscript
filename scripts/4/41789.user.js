// ==UserScript==
// @name           Calypso GTA
// @namespace      none.non
// @description    Changes Tab Name
// @include        https://www.calypsoconnect.com/reports/terminal_status.aspx?__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=dDwxNDA0MzIxNTIxO3Q8O2w8aTw0Pjs%2BO2w8dDw7bDxpPDE%2BOz47bDx0PDtsPGk8MD47PjtsPHQ8O2w8aTwwPjs%2BO2w8dDw7bDxpPDg%2BOz47bDx0PHA8cDxsPFZpc2libGU7PjtsPG88Zj47Pj47Pjs7Pjs%2BPjs%2BPjs%2BPjs%2BPjs%2BPjtsPGNicmVmcmVzaDtjYnNob3dkaXM7Pj78OXCPY%2F5o4bVvVgtF2SsJNMd9ow%3D%3D&index=0&pageid=alltermstat&groupPicker%3AdictList=670&switchPicker%3AdictList=0&errorPicker%3AdictList=-2&btnSubmit=Generate&cbrefresh=on&refinterval=32&cbshowdis=on&sortby=CommDateShifted
// ==/UserScript==

document.title = document.title.replace(/^Terminal status/, 'GTA')
