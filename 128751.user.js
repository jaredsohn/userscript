// ==UserScript==
// @name       ArchBattle Advanced Menu
// @namespace  http:/sheflaprod.free.fr/
// @version    0.3
// @description Replace game menu and resources with better ones.
// @copyright  MIT License
// @match      http://archbattle.com/play/*
// @exclude    http://archbattle.com/play/asb/shoutbox.php*
// @exclude    http://archbattle.com/play/asb/sbhelp.php
// ==/UserScript==

var
value, min, sec, week, offset,
html = '',
menu = document.createElement('ul'),
res  = document.createElement('ul'), 
root = document.querySelector('tr:nth-child(2)'),
pm   = root.querySelector('a[href="../play/pm.php"]').textContent.match(/[0-9]+/)[0],
info = root.querySelectorAll('div.minfo'),
map  = {
    ug: ['Gold',      '../images/gold.gif'    ],
    ul: ['Lumber',    '../images/wood.gif'    ],
    us: ['Stone',     '../images/stone1.gif'  ],
    ui: ['Iron',      '../images/iron.gif'    ],
    uh: ['Hex',       '../images/hex.gif'     ],
    uf: ['Food',      '../images/food1.gif'   ],
    ho: ['Horse',     '../images/horse.gif'   ],
    un: ['Net Worth', '../images/networth.gif'],
    um: ['Morale',    '../images/morale.gif'  ]
},
// get current timestamp
timestamp = function(){
    return Math.floor((new Date).getTime() / 1000);
},
// cut big numbers to fit in menu
troncate = function(str){
    str += '';
    return str.length > 11 ? str.replace(/(,[0-9]{3})$/, ' k') : str;
},
// compute menu and resources positions regarding of window size
position = function(){
    offset = ((window.outerWidth - 1010) / 2) + 'px';
    menu.style.left = offset;
    res.style.right = offset;
},
// week countdown callback
countdown = function(){
    if (+sec == 0){
	min--;
	sec = 60;
    }
    sec--;
    if (!min && !sec){
	GM_setValue(
            'archbattle-advanced-menu-week',
            timestamp() + 1800
        );
    min = 29;
    sec = 59;
    }
    ('' + sec).length == 1 && (sec = '0' + sec);
    week.textContent = min + ':' + sec;
};

// gather informations from empire page
if (document.location.href == 'http://archbattle.com/play/index.php'){
	// citizen count
	GM_setValue(
		'archbattle-advanced-menu-citizen',
		document.querySelectorAll('.bc50r').item(6).textContent.trim()
	);
	// next week time
	value = document.querySelector('td.bc4c').textContent.match(/[0-9]{1,2}/)[0];
	GM_setValue(
		'archbattle-advanced-menu-week',
		timestamp() + (value * 60)
	);
}

// gather citizen count from training page
if (document.location.href == 'http://archbattle.com/play/training.php'){
    var str = document.querySelector('.bc4c b').textContent;
    if (str.indexOf('successfully') == -1){
        GM_setValue(
            'archbattle-advanced-menu-citizen',
            str.match(/[,0-9]+/)[0]           
        );
    }
}

// build resources html
for (var i=0, l=info.length; i<l; i++){
    value  = info[i].textContent + (info[i].id == 'um' ? '%' : '');
	html += '<li><span'
	    + ' style="background-image: url(' + map[info[i].id][1] + ')"'
	    + ' title="' + map[info[i].id][0] + ': ' + value + '">' + troncate(value) + '</span></li>';
}

// show citizen count
value = GM_getValue('archbattle-advanced-menu-citizen');
if (value != null){
    html += '<li><span title="Citizens: ' + value + '"'
	    + 'style="background-image: url(../images/worker.gif)">' + troncate(value) + '</span></li>';
}

// show week countdown
value = GM_getValue('archbattle-advanced-menu-week');
if (value != null){
    value -= timestamp();
    value < 0 && (value = timestamp() + ((value % 1800) * -1));
    html += '<li><span id="advanced-menu-week" title="Next Week"'
	+ ' style="background-image: url(../images/time.gif)"></span></li>';
    min  = Math.floor(value / 60);
    sec  = Math.floor(value % 60);
    week = true;
    setInterval(countdown, 1000);
}

// assign resources html
res.id        = 'advanced-resources';
res.innerHTML = html;

// Empire Training Building Forge Skills Attack Market Bank History Guild Stats PM (0) Forums Account Logout

// assign menu html
menu.id        = 'advanced-menu';
menu.className = 'dropdown';
menu.innerHTML = '\
<li><a href="index.php">Empire</a></li>\
<li class="dir">Guide\
    <ul>\
        <li><a href="rules.php">Rules</a></li>\
        <li><a href="guide.php#intro">Introduction</a></li>\
        <li><a href="guide.php#races">Races</a></li>\
        <li><a href="guide.php#resources">Resources</a></li>\
        <li><a href="guide.php#empire">Empire</a></li>\
        <li><a href="guide.php#training">Training</a></li>\
        <li><a href="guide.php#building">Building</a></li>\
        <li><a href="guide.php#forge">Forge</a></li>\
        <li><a href="guide.php#skills">Skills</a></li>\
        <li><a href="guide.php#attack">Attack</a></li>\
        <li><a href="guide.php#market">Market</a></li>\
        <li><a href="guide.php#bank">Bank</a></li>\
        <li><a href="guide.php#history">History</a></li>\
        <li><a href="guide.php#guild">Guild</a></li>\
        <li><a href="guide.php#account">Account</a></li>\
        <li><a href="guide.php#shoutbox">Shoutbox</a></li>\
   </ul>\
</li>\
<li><a href="training.php">Training</a></li>\
<li><a href="build.php">Building</a></li>\
<li><a href="forge.php">Forge</a></li>\
<li><a href="skills.php">Skills</a></li>\
<li><a href="empires.php">Attack</a></li>\
<li><a href="market.php">Market</a></li>\
<li><a href="bank.php">Bank</a></li>\
<li><a href="history.php">History</a></li>\
<li><a href="guild.php">Guild</a></li>\
<li><a href="stats.php">Stats</a></li>\
<li><a href="pm.php">Message (' + pm + ')</a></li>\
<li><a href="forums.php">Forums</a></li>\
<li class="dir" id="advanced-menu-shoutbox-toggle" title="Click to refresh">ShoutBox\
    <ul id="advanced-menu-shoutbox-wrapper"></ul>\
</li>\
<li><a href="account.php">Account</a></li>\
<li><a href="logout.php">Logout</a></li>\
';

// menu and resources style
GM_addStyle('\
#advanced-menu, #advanced-menu li, #advanced-menu ul, #advanced-resources {\
    list-style: none;\
    margin: 0;\
    padding: 0;\
}\
#advanced-menu, #advanced-resources {\
    position: fixed;\
    top: 3px;\
    z-index: 597;\
    float: left;\
    cursor: pointer;\
}\
#advanced-menu {\
    left: 3px;\
}\
#advanced-resources {\
    right: 3px;\
}\
#advanced-menu li, #advanced-resources li {\
    float: none;\
    vertical-align: middle;\
    zoom: 1;\
    width: 100px;\
    height: 30px;\
    line-height: 30px;\
    font-weight: bold;\
    text-align: center;\
}\
#advanced-menu li:hover {\
    position: relative;\
    z-index: 599;\
}\
#advanced-menu ul {\
    visibility: hidden;\
    position: absolute;\
    top: 1px;\
    left: 99%;\
    z-index: 598;\
    width: 100%;\
}\
#advanced-menu ul li {\
    float: none;\
}\
#advanced-menu ul ul {\
    top: 1px;\
    left: 99%;\
}\
#advanced-menu li:hover > ul {\
    visibility: visible;\
}\
#advanced-menu li, #advanced-resources li {\
    background: url(http://m.archbattle.com/images/bbm.gif);\
}\
#advanced-menu a {\
    display: block;\
    height: 30px;\
    width: 100px;\
    color: #000;\
    text-decoration: none;\
}\
#advanced-menu #advanced-menu-shoutbox-wrapper {\
    top: -280px;\
    height: 350px;\
    width: 400px;\
    padding: 10px;\
    background: #5F6243;\
    border-radius: 8px;\
    box-shadow: 3px 3px 7px #222;\
}\
#advanced-resources span {\
    display: block;\
    width: 74px;\
    height: 30px;\
    font-size: 10px;\
    text-align: right;\
    padding-right: 26px;\
    background: transparent no-repeat 78px 7px;\
}\
');

// remove game menu and resources from page
root.parentNode.removeChild(root);

// add our advanced menu
document.body.appendChild(menu);

// add our advanced resources
document.body.appendChild(res);

// set initial menu an resources positions
position();

// update positions when window size change
window.addEventListener('resize', position, false);

// needed for week countdown
week && (week = document.getElementById('advanced-menu-week'));

// lazy loading shoutbox system
var
loaded   = false,
toggle   = document.getElementById('advanced-menu-shoutbox-toggle'),
shoutbox = document.getElementById('advanced-menu-shoutbox-wrapper'),
listener = function(){
    shoutbox.innerHTML = '<iframe src="asb/shoutbox.php" width="400" height="350" frameborder="0" style="background-color: #4c513a;"></iframe>';
    if (!loaded){
        toggle.removeEventListener('mouseover', listener, false);
        loaded = true;
    }
};
toggle.addEventListener('click',     listener, false);
toggle.addEventListener('mouseover', listener, false);