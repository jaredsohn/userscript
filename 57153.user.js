// ==UserScript==

// @name           TheRPF - Block Threads

// @namespace      cocomonk22

// @description    Block threads by id.

// @include        http://www.therpf.com/*

// ==/UserScript==

function blockThreads(){
var IDS = [
/*Put threads to block here in the format 'number',
For example:
'65326',
PUT THREAD IDS TO BLOCK ON NEXT LINE*/


];

for(var i=0; i<IDS.length; i++)
{
input='<td class="alt1" id="td_threadstatusicon_'+IDS[i]+'">';
output='<tr style=display:none>';
document.body.innerHTML = document.body.innerHTML.replace(input,output);
}
}

blockThreads();