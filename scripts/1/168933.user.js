// ==UserScript==
// @name MP3 and Brawl Custom Music
// @author Tommy Smith, http://3dvia.com/tomy
// @version 1.0
// @description Adds the now discontinued "Download MP3" link to Brawl Custom Music, along with the BRSTM download link.
// @include http://www.brawlcustommusic.com/*
// @include http://brawlcustommusic.com/*
// @exclude http://www.brawlcustommusic.com/songlist
// @exclude http://www.brawlcustommusic.com/random
// @exclude http://www.brawlcustommusic.com/gamelist
// @exclude http://www.brawlcustommusic.com/stagelist
// @exclude http://www.brawlcustommusic.com/themelist
// @exclude http://www.brawlcustommusic.com/upload.html
// @exclude http://www.brawlcustommusic.com/pending
// @exclude http://www.brawlcustommusic.com/board
// @exclude http://www.brawlcustommusic.com/board/*
// @exclude http://www.brawlcustommusic.com/chat
// @exclude http://www.brawlcustommusic.com/donate
// @exclude http://www.brawlcustommusic.com/about
// @exclude http://www.brawlcustommusic.com/game/*
// @exclude http://www.brawlcustommusic.com/register
// @exclude http://www.brawlcustommusic.com/login*
// @exclude http://brawlcustommusic.com/songlist
// @exclude http://brawlcustommusic.com/random
// @exclude http://brawlcustommusic.com/gamelist
// @exclude http://brawlcustommusic.com/stagelist
// @exclude http://brawlcustommusic.com/themelist
// @exclude http://brawlcustommusic.com/upload.html
// @exclude http://brawlcustommusic.com/pending
// @exclude http://brawlcustommusic.com/board
// @exclude http://brawlcustommusic.com/board/*
// @exclude http://brawlcustommusic.com/chat
// @exclude http://brawlcustommusic.com/donate
// @exclude http://brawlcustommusic.com/about
// @exclude http://brawlcustommusic.com/game/*
// @exclude http://brawlcustommusic.com/register
// @exclude http://brawlcustommusic.com/login*
// ==/UserScript==
document.getElementById("brstmdl").innerHTML += "<br><a href='http://brawlcustommusic.com/music/mp3/" + location.pathname.substr(1) + ".mp3'>Download MP3</a>";