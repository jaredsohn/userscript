// ==UserScript==
// @name           NS Links by Jixbad
// @namespace      For educational purposes only.
// @include        http://www.n.dk/rightpages/cms/indhold.asp
// ==/UserScript==

var head = document.head.innerHTML;

head += '<style>'
 + 'h2 { color: #653303 !important; }'
 + 'li { color: #d37063; }'
 + 'input { background: #fbbb7e; padding: 4px; margin: 0 10px 0 0 !important; color: #af5806; border: 1px solid #222; }'
 + 'button { background: #fbbb7e; color: #af5806; border: 1px solid #051b3f; line-height: 19px; border-radius: 3px; }'
 + 'a { color: #2a5497 !important; text-decoration: none; }'
 + 'a:hover { color: #f77f0c !important; }'
 + '.stdP { padding: 10px; }'
 + '</style>';

document.head.innerHTML = head;

var stopped = false;


function requestRoom() {
  var room = document.getElementById('goto').value;
  var request = new XMLHttpRequest();
  request.open('GET', '/rightpages/other/lift_goto.asp?RoomID=' + room, false);
  request.send();
}

function requestUser() {
  var room = document.getElementById('user').value;
  var request = new XMLHttpRequest();
  request.open('GET', '/rightpages/other/lift_goto.asp?RoomID=' + room, false);
  request.send();
}

function findRoom() {
  var room = document.getElementById('findgoto').value;
  document.location = '/rightpages/post/New.asp?u=' + room;
}

function findPost() {
  var room = document.getElementById('findmail').value;
  document.location = '/rightpages/other/room.asp?id=' + room;
}

function stopLoop() {
  stopped = true;
  var btn = document.getElementById('spam');
  btn.onclick = initLoopRoom;
  btn.innerHTML = 'GO!';
}

function initLoopRoom() {
  var btn = document.getElementById('spam');
  stopped = false;
  btn.onclick = stopLoop;
  btn.innerHTML = 'Stop';
  loopRoom();
}

function loopRoom() {
  requestRoom();
  if (!stopped)
    setTimeout(loopRoom, 25);
}

function stopLoop2() {
  stopped = true;
  var btn = document.getElementById('spam2');
  btn.onclick = initLoopUser;
  btn.innerHTML = 'GO!';
}

function initLoopUser() {
  var btn = document.getElementById('spam2');
  stopped = false;
  btn.onclick = stopLoop2;
  btn.innerHTML = 'Stop';
  loopUser();
}

function loopUser() {
  requestUser();
  if (!stopped)
    setTimeout(loopUser, 250);
}

var sections = [
  ['Rum',
    ['Kasino', '/rightpages/other/lift_goto.asp?RoomID=10'],
    ['X-Perten', '/rightpages/other/lift_goto.asp?RoomID=51'],
    ['Fællesrummet', '/rightpages/other/lift_goto.asp?RoomID=53'],
    ['VIP', '/rightpages/other/lift_goto.asp?RoomID=19'],
    ['Celeb-chat', '/rightpages/other/lift_goto.asp?RoomID=44'],
    ['Bingo', '/rightpages/other/lift_goto.asp?RoomID=91'],
  ],
  ['Butikker',
    ['Bazaren', '/rightpages/cms/Bazaren.asp'],
    ['Geos Gadgets', '/rightpages/shops/entrance.asp?ID=11'],
    /*['Skovbutikken', '/rightpages/shops/entrance.asp?ID=4'],*/
    ['Bennys Møbelbiks', '/rightpages/shops/entrance.asp?ID=2'],
    ['Floras Blomster', '/rightpages/shops/entrance.asp?ID=6'],
    ['Salon Patrice', '/rightpages/shops/entrance.asp?ID=3'],
    /*['Fredag d. 13.', '/rightpages/shops/entrance.asp?ID=7'],
    ['Påske Shoppen', '/rightpages/shops/entrance.asp?ID=6'],
    ['SMS Butikken', '/rightpages/shops/entrance.asp?ID=5'],*/
    ['Tøjbutikken', '/rightpages/shops/entrance.asp?ID=1'],
    ['VIP Shop', '/rightpages/shops/entrance.asp?ID=5'],
  ],/*
  ['Tøjbutikken',
    ['Tøj', 'http://www.n.dk/community/Shopping/generated/6_114.aspx?EntranceID=6&ShopID=114'],
    ['Galla', 'http://www.n.dk/community/Shopping/generated/6_82.aspx?EntranceID=6&ShopID=82'],
    ['Sommertøj', 'http://www.n.dk/community/Shopping/Shop.aspx?EntranceID=6&ShopID=129'],
    ['Freelancer', 'http://www.n.dk/community/Shopping/Shop.aspx?EntranceID=6&ShopID=132'],
    ['Leveltrøjer', 'http://www.n.dk/community/Shopping/generated/6_80.aspx?EntranceID=6&ShopID=80']
  ],
  ['Salon Patrice',
    ['Hår', 'http://www.n.dk/community/Shopping/generated/5_76.aspx?EntranceID=5&ShopID=76'],
    ['Hatte', 'http://www.n.dk/community/Shopping/Shop.aspx?EntranceID=5&ShopID=130'],
    ['Tilbehør', 'http://www.n.dk/community/Shopping/generated/5_77.aspx?EntranceID=5&ShopID=77'],
    ['Levelcaps', 'http://www.n.dk/community/Shopping/generated/5_78.aspx?EntranceID=5&ShopID=78'] 
  ],*/
  ['Andet',
    /*['Julequiz', 'http://www.n.dk/rightpages/cms/Pejsestuen_xmas.asp'],
    ['Pakke Menu', 'http://www.n.dk/rightpages/cms/Pakkeleg_forside.asp'],
    */['Kasino Menu', 'http://www.n.dk/rightpages/cms/Kasino.asp'],
    ['Rediger GB', 'http://www.n.dk/rightpages/settings/Guestbook.asp'],
    ['Skift Email', 'http://www.n.dk/rightpages/settings/Profile_Changeemail.asp'],
    ['Skift Profilfarve', 'http://www.n.dk/rightpages/settings/Colors.asp'],
    ['NK Indstillinger', 'http://www.n.dk/rightpages/settings/nk.asp'],
    ['Bingo', 'http://www.n.dk/rightpages/events/bingo.asp'],
    ['Startside', 'http://www.n.dk/rightpages/settings/Welcome.asp'],
    ['Avislisten', 'http://www.n.dk/rightpages/cms/aviser.asp'],
    ['Level liste', 'http://www.n.dk/rightpages/settings/Level.asp'],
   /* ['Nix Ballon', '/community/user2/settings/Wardrobe/SetItems.aspx?ItemID=14&ItemID=1874&ItemID=1831&isHairOnTop=True'],
    ['Nix Standard', '/community/user2/settings/Wardrobe/SetItems.aspx?ItemID=14&ItemID=20&ItemID=19&isHairOnTop=True'], */
  ]

];

var html = '<div class="main"><div class="secHeaderRed">'
    + '<img class="secHeaderTitle" src="/images/DynamicImaging/HeaderFactory.aspx?Style=Red&Text=NS Links by Jixbad" alt="NS Linker" />'
    + '<a href="javascript:history.back();"><img src="/images/global/back_red.gif" alt="Tilbage" border="0" align="right" /></a>'
    + '</div>'
    + '<div style=" padding: 0; width: 330px; background-image:url(/images/global/sec_red.gif); background-repeat:repeat-y;"><div class="col1"><div class="stdP">';


for (var n = 0; n<sections.length; n++) {
  var s = sections[n];
  html += '<h2>' + s[0] + '</h2><ul>';
  for (var i = 1; i<s.length; i++)
    html += '<li><a href="'+s[i][1]+'">'+s[i][0]+'</a></li>';
  html += '</ul>';
}

/* Send Post */

html += '<h2>Send Post (indtast navn)</h2>'
  + '<input type="text" style="width: 50px; padding-left: 3px;" value="Jixbad" id="findgoto" />'
  + '<button id="find">Post</button>';

/* Goto Spammer 40x */

html += '<h2>Goto Spammer 40x i sekundet</h2>'
  + '<input type="text" style="width: 50px; padding-left: 3px;" value="10" id="goto" />'
  + '<button id="spam">GO!</button>';

/* Goto Spammer 4x */

html += '<h2>Goto Spammer 4x i sekundet</h2>'
  + '<input type="text" style="width: 50px; padding-left: 3px;" value="10" id="user" />'
  + '<button id="spam2">GO!</button>';

/* Goto Lookup */

html += '<h2>Goto Lookup</h2>'
  + '<input type="text" style="width: 50px; padding-left: 3px;" value="10" id="findmail" />'
  + '<button id="mail">Find</button>';


html += '</div></div>'
  + '<div class="secEndRed" style="margin-bottom: 15px;">&nbsp;</div></div></div>'

document.body.innerHTML = html;

var spamButton = document.getElementById('spam');
spamButton.onclick = initLoopRoom;

var spamButton = document.getElementById('spam2');
spamButton.onclick = initLoopUser;

var findButton = document.getElementById('find');
findButton.onclick = findRoom;

var findButton = document.getElementById('mail');
findButton.onclick = findPost;