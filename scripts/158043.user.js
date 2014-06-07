// ==UserScript==
// @name      HF Group leader username colour change
// @namespace  M1N3RMΛN/BEACON_USER_COLOUR
// @description  Script for Groupd to colour all leaders usernames.
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        http://hackforums.net/showthread.php?tid=*	
// @include        http://www.hackforums.net/member.php?action=profile&uid=*
// @include        http://hackforums.net/member.php?action=profile&uid=*
// @include        http://www.hackforums.net/usercp.php?action=options
// @include        http://hackforums.net/usercp.php?action=options
// ==/UserScript==

// HF GROUP LEADER USERNAME COLOUR CHANGER
// THIS USERSCRIPT WAS MADE BY M1N3RMΛN, DO NOT REMOVE ANY NAMES.

// ==VARIABLES==
var html = document.body.innerHTML;
// ==/VARIABLES==

// ==DO-NOT-REMOVE==
html = html.replace( /M1N3RMΛN/g, '<span style="text-shadow: 0px 2px 3px #000"><b>M1N3RMΛN</b></span>' );
// ==/DO-NOT-REMOVE==

html = html.replace( /Sir/g, '<span style="color: #578BA7;"><b>Sir</b></span>' );
html = html.replace( /AsSaSs@iN/g, '<span style="color: #860000;"><b>AsSaSs@iN</b></span>' );
html = html.replace( /Joey Tribbiani/g, '<span style="color: #3A72FF;"><b>Joey Tribbiani</b></span>' );
html = html.replace( /McFlurry/g, '<span style="color: #3A72FF;"><b>McFlurry</b></span>' );
html = html.replace( /Cody/g, '<span style="color: #FF7ABF;"><b>Cody</b></span>' );
html = html.replace( /Daisy/g, '<span style="color: #FF7ABF;"><b>Daisy</b></span>' );
html = html.replace( /Juicy Booty/g, '<span style="color: #00F7FF;"><b>Juicy Booty</b></span>' );
html = html.replace( /Sandshrew/g, '<span style="color: #00F7FF;"><b>Sandshrew</b></span>' );
html = html.replace( /Froggy/g, '<span style="color: #8E005E;"><b>Froggy</b></span>' );
html = html.replace( /xadamxk/g, '<span style="color: #8E005E;"><b>xadamxk</b></span>' );
html = html.replace( /Chief/g, '<span style="color: #8E005E;"><b>Chief</b></span>' );
html = html.replace( /Tibit/g, '<span style="color: #8E005E;"><b>Tibit</b></span>' );
html = html.replace( /Baked/g, '<span style="color: #FFF700;"><b>Baked</b></span>' );
html = html.replace( /Orgy/g, '<span style="color: #FFF700;"><b>Orgy</b></span>' );
html = html.replace( /BV1 ツ/g, '<span style="color: #FFF700;"><b>BV1 ツ</b></span>' );
html = html.replace( /Kohsti/g, '<span style="color: #90EF7D;"><b>Kohsti</b></span>' );
html = html.replace( /BELLAGIO/g, '<span style="color: #90EF7D;"><b>BELLAGIO</b></span>' );
html = html.replace( /TheHackersLove/g, '<span style="color: #FE2E2E;"><b>TheHackersLove</b></span>' );
html = html.replace( /Pali/g, '<span style="color: #FE2E2E;"><b>Pali</b></span>' );
html = html.replace( /iNviZ/g, '<span style="color: #FE2E2E;"><b>iNviZ</b></span>' );
html = html.replace( /Starfall/g, '<span style="color: #2EFE2E;"><b>Starfall</b></span>' );
html = html.replace( /RyanC/g, '<span style="color: #2EFE2E;"><b>RyanC</b></span>' );
html = html.replace( /Castle Bravo/g, '<span style="color: #2EFE2E;"><b>Castle Bravo</b></span>' );
html = html.replace( /Tɦɛ Gʀiɱ/g, '<span style="color: #9AFE2E;"><b>Tɦɛ Gʀiɱ</b></span>' );
html = html.replace( /Codevade/g, '<span style="color: #9AFE2E;"><b>Codevade</b></span>' );
html = html.replace( /Apple J4ck/g, '<span style="color: #2E64FE;"><b>Apple J4ck.</b></span>' );
html = html.replace( /Viral Dragon/g, '<span style="color: #2E64FE;"><b>Viral Dragon</b></span>' );
html = html.replace( /WiFi/g, '<span style="color: #2E64FE;"><b>WiFi.</b></span>' );
html = html.replace( /T3h Hacker/g, '<span style="color: #860000;"><b>T3h Hacker</b></span>' );
html = html.replace( /Barneyyz™/g, '<span style="color: #2E9AFE;"><b>Barneyyz™</b></span>' );
html = html.replace( /Barneyyz™/g, '<span style="color: #2E9AFE;"><b>Barneyyz™</b></span>' );
html = html.replace( /Flashy/g, '<span style="color: #2E9AFE;"><b>Flashy</b></span>' );
html = html.replace( /Sai/g, '<span style="color: #2E9AFE;"><b>Sai</b></span>' );
html = html.replace( /Pirate/g, '<span style="color: #04B404;"><b>+Pirate</b></span>' );
html = html.replace( /Bullet/g, '<span style="color: #04B404;"><b>Bullet</b></span>' );
html = html.replace( /PubMaster/g, '<span style="color: #04B404;"><b>PutMaster</b></span>' );
html = html.replace( /Astonish/g, '<span style="color: #04B404;"><b>Astonish</b></span>' );
html = html.replace( /Λɴᴏɴʏᴍᴏᴜs/g, '<span style="color: #848484;"><b>Λɴᴏɴʏᴍᴏᴜs</b></span>' );
html = html.replace( /Anonymous/g, '<span style="color: #848484;"><b>Anonymous</b></span>' );
html = html.replace( /nokia2mon2/g, '<span style="color: #FF0000;"><b>nokia2mon2</b></span>' );
html = html.replace( /Glassy/g, '<span style="color: #FF0000;"><b>Glassy</b></span>' );
html = html.replace( /Dan/g, '<span style="color: #55e2d9;"><b>Dan.</b></span>' );


document.body.innerHTML = html;