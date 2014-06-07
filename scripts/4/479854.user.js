// ==UserScript==
// @name        Youtube mp3 DLOAD - *related site"video2mp3.net" *
// @namespace   Kev [DAV-Team]
// @description Simple Term: it opens the video your on in new page to download the song/audio playing. Detailed: gets your url location and adds code directly the video2mp3.net audio download location.
// @include     *www.youtube.com/watch?*
// @exclude     *video2mp3.net*
// @version     1.7
// @grant       none
// ==/UserScript==


// button code "same as FackBook HighBrid 1.0"
var scriptCode1 = new Array();
scriptCode1.push(' <div id="GTTh-bx" style="position:fixed; top:50px; right:0px;"><center><a id="GTTh" onclick="Lokat()"><b>Download-MP3</b></a></center><div id="GTTh-lo">via:<a href="http://www.video2mp3.net/" target="_blank">video2mp3.net</a></div><div id="GTTh-info"><b>v1.5 - Kev [DAV-Team]</b></div></div>  ');  

var script1 = document.createElement('div');    // create the script element
    script1.innerHTML = scriptCode1.join('\n');         // add the script code to it
    scriptCode1.length = 0;
document.getElementsByTagName('body')[0].appendChild(script1);

// button JS
var scriptCode2 = new Array();
scriptCode2.push('function Lokat(){window.open("http://www.video2mp3.net/loading.php?url="+location.href);}');  

var script2 = document.createElement('script');    // create the script element
    script2.innerHTML = scriptCode2.join('\n');         // add the script code to it
    scriptCode2.length = 0;
document.getElementsByTagName('body')[0].appendChild(script2);

// button CSS
var scriptCode0 = new Array();

scriptCode0.push('#GTTh-bx {'); 
scriptCode0.push('   z-index: 9000000;');
scriptCode0.push('    background: rgba(0, 0, 0, 0.1);'); 
scriptCode0.push('} '); 


scriptCode0.push('#GTTh {'); 
scriptCode0.push('   z-index: 9000000;');
scriptCode0.push(' -moz-box-sizing: content-box;'); 
scriptCode0.push('    border: 1px solid;'); 
scriptCode0.push('    border-radius: 2px;'); 
scriptCode0.push('    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);'); 
scriptCode0.push('    padding: 0 8px 0px 8px;'); 
scriptCode0.push('    position: relative;'); 
scriptCode0.push('    text-align: center;'); 
scriptCode0.push('    background: url("/rsrc.php/v2/y1/r/wL6VQj7Ab77.png") repeat-x scroll 0 0 padding-box #F6F7F8;'); 
scriptCode0.push('    border-color: #CDCED0 #C5C6C8 #B6B7B9;'); 
scriptCode0.push('    color: #4E5665;'); 
scriptCode0.push('    text-shadow: 0 1px 0 #FFFFFF;'); 
scriptCode0.push('    font-family: "Arial;'); 
scriptCode0.push('    font-weight: bold;'); 
scriptCode0.push('    font-size:11px;'); 
scriptCode0.push('} '); 
scriptCode0.push('#GTTh:hover {'); 
scriptCode0.push('   z-index: 9000000;');
scriptCode0.push('    background: #526DA4;'); 
scriptCode0.push(' -moz-box-sizing: content-box;'); 
scriptCode0.push('    border: 1px solid;'); 
scriptCode0.push('    border-radius: 2px;');
scriptCode0.push('    border-color: #000000 #000000 #000000;'); 
scriptCode0.push('    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);'); 
scriptCode0.push('    padding: 0 8px 0px 8px;'); 
scriptCode0.push('    text-decoration:none;'); 
scriptCode0.push('    color: #000000;'); 
scriptCode0.push('    font-family: "Arial;'); 
scriptCode0.push('    font-weight:none;'); 
scriptCode0.push('    font-size:10px;'); 
scriptCode0.push('}'); 
scriptCode0.push('#GTTh-lo {'); 
scriptCode0.push('    color: #000000;'); 
scriptCode0.push('    font-family: "Arial;'); 
scriptCode0.push('    font-weight:none;'); 
scriptCode0.push('    font-size:10px;'); 
scriptCode0.push('}'); 
scriptCode0.push('#GTTh-info {'); 
scriptCode0.push('    color: rgba(0, 0, 0, 0.2);'); 
scriptCode0.push('    font-family: "Arial;'); 
scriptCode0.push('    font-weight:bold;');
scriptCode0.push('    font-size:6px;'); 
scriptCode0.push('}');

var script0 = document.createElement('style');    // create the script element
    script0.innerHTML = scriptCode0.join('\n');         // add the script code to it
    scriptCode0.length = 0;
document.getElementsByTagName('head')[0].appendChild(script0);