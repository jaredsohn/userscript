// ==UserScript==
// @name       CivClicker, Stylin' and Profilin'
// @namespace  
// @version    0.5.2
// @description  A visual overhaul of the incremental game, CivClicker.
// @match      http://dhmholley.co.uk/civclicker.html
// @copyright  2012+, You
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'body{font-family:Arial,sans-serif;background:#12130b url("http://i.imgur.com/qanzKU3.jpg") no-repeat center center fixed;color:#f2f3ee;background-size:cover;padding:0;margin:0}#header{text-align:center;background:rgba(40,28,46,.5)}#ruler,h1{width:100%;padding-bottom:2%}#stripInner{top:5px;right:5px}#stripInner a{color:#949b3d}#stripInner a:hover,a:visited{color:#828836}button{outline:0;margin:5px;border:1px solid #949b3d;background:#8e943a;transition:all .2s;border-radius:2px;color:#f2f3ee;padding:5px 6px 4px;text-decoration:none;text-shadow:0 1px 1px #001121}button:hover{border:1px solid #949b3d;background:#9fa641;text-decoration:none;cursor:pointer}button:disabled{border:1px solid #e8503c;background:#D64937;color:#ccc}#resources{width:45%;margin-right:1%;margin-left:2%}#population{width:45%;margin-left:2%}#achievements,#eventsContainer,#jobsContainer,#pantheonContainer,#permaUpgradeContainer,#populationContainer,#resourcesContainer{padding:10px 10px 10px 20px;background:rgba(92,92,42,.5);margin-top:2%}#panesSelectors{background:rgba(92,92,42,.5);margin-top:2%;padding:0}#selectors{margin-top:0;padding:0}#buildingsPane,#conquestPane,#deityPane,#upgradesPane{padding:10px 10px 10px 20px}.paneSelector{height:50px;border:0;background:#281c2e;width:25%;margin-top:0;font-size:1.5em}.paneSelector:hover{background:#372740;text-decoration:none}.selected{background:#3e2c47}#jobsContainer{margin-top:0}#eventsContainer{background:rgba(40,28,46,.5)}#permaUpgradeContainer{margin-top:0}#settings,#stats{margin-top:2%}#settings{padding-left:20px;width:45%}#achievements{background:0 0;margin-bottom:100px;text-size:1em}.achievement{border:0;margin:0 2px;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px}.achUnlocked{background:#8e943a;font-size:.8em;padding:4px 0 0;text-shadow:0 1px 1px #001121;height:46px;text-align:center;-moz-border-radius:2px;border-radius:2px}';
document.documentElement.appendChild(styleEl);