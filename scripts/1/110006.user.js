// ==UserScript==
// @name           YouTube Links Updater
// @namespace      http://www.smallapple.net/
// @description    Updates YouTube Links. Not meant to be used directly.
// @author         Ng Hun Yang
// @include        http://*.youtube.com/*
// @version        1.62
// ==/UserScript==

ujsYtLinks.chkVerCallback([
  { ver: 16200, ts: 2014030700, desc: "Snap to std res" },
  { ver: 16100, ts: 2014020500, desc: "Improved support for obfuscated videos" },
  { ver: 16000, ts: 2014010900, desc: "Support obfuscated videos" },
  { ver: 15000, ts: 2014010200, desc: "Get video info only if in viewport" },
  { ver: 14300, ts: 2013122500, desc: "Don't show link on buttons" },
  { ver: 14200, ts: 2013122200, desc: "Don't show link on playlist buttons" },
  { ver: 14100, ts: 2013122100, desc: "Snap to standard video res" },
  { ver: 14000, ts: 2013122000, desc: "Support adaptive stream videos" },
  { ver: 13600, ts: 2013072400, desc: "Support sig-87 videos" },
  { ver: 13500, ts: 2013072300, desc: "Support sig-85 videos" },
  { ver: 13400, ts: 2013071700, desc: "Support sig-90/92 videos" },
  { ver: 13300, ts: 2013071200, desc: "Fixed not avail videos, support VEVO videos" },
  { ver: 13200, ts: 2013012500, desc: "Fixed channel video" },
  { ver: 13100, ts: 2013012200, desc: "Fixed filename after YouTube update" },
  { ver: 13000, ts: 2012101700, desc: "Show file size in Firefox and Chrome" },
  { ver: 12300, ts: 2012100300, desc: "Show available update in Chrome" },
  { ver: 12200, ts: 2012092100, desc: "Added YouTube video sig" },
  { ver: 12100, ts: 2011091000, desc: "Tooltip positioning bug fix" },
  { ver: 12000, ts: 2011090500, desc: "Show video formats for cur video in user's channel" },
  { ver: 11000, ts: 2011082500, desc: "Show all formats for video links" },
  { ver: 10100, ts: 2011081800, desc: "Monitor new video links and other minor bug fixes" },
  { ver: 10000, ts: 2011081300, desc: "Initial release" }
  ]);
