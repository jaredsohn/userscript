// ==UserScript==
// @name          Craigslist image preview
// @namespace     http://jeffpalm.com/craigslist
// @description   View craigslist image previews
// @include       http://*.craigslist.org/*/*
// ==/UserScript==

const VERSION = '1.0';
const NOTE_PREFIX = '[craigslist ' + VERSION + '] ';
/*
 * Copyright 2007-2011 Jeffrey Palm.
 */

// --------------------------------------------------
// misc
// --------------------------------------------------

const PREFIX = "*cs*.";
const SIZE_PARAM = "size";
const KEEP_ASPECT_RATIO_PARAM = "aspect.ratio";
const MAX_RESULTS_PARAM = "max.results";
const MAX_MAX_RESULTS = 50;
const CLASS = "_c";
const USER_AGENTS = [
  "AmigaVoyager/3.4.4 (MorphOS/PPC native)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3)  Arora/0.3 (Change: 287 c9dfb30)",
  "Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/523.15 (KHTML, like Gecko, Safari/419.3)  Arora/0.2 (Change: 0 )",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322; FDM)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; Avant Browser [avantbrowser.com]; Hotbar 4.4.5.0)",
  "Mozilla/6.0; (Spoofed by Amiga-AWeb/3.5.07 beta)",
  "MSIE/6.0; (Spoofed by Amiga-AWeb/3.4APL)",
  "Mozilla/4.61 [en] (X11; U; ) - BrowseX (2.0.0 Windows)",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.14) Gecko/20080409 Camino/1.6 (like Firefox/2.0.0.14)",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.0.1) Gecko/20060118 Camino/1.0b2+",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.5b) Gecko/20030917 Camino/0.7+",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US; rv:1.0.1) Gecko/20021104 Chimera/0.6",
  "Mozilla/2.0 compatible; Check&amp;Get 1.14 (Windows NT)",
  "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.1 (KHTML, like Gecko) Chrome/5.0.322.2 Safari/533.1",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_2; en-US) AppleWebKit/532.9 (KHTML, like Gecko) Chrome/5.0.307.11 Safari/532.9",
  "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.249.78 Safari/532.5",
  "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/532.4 (KHTML, like Gecko) Chrome/4.0.233.0 Safari/532.4",
  "Mozilla/5.0 (X11; U; Linux i686 (x86_64); en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.198.0 Safari/532.0",
  "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; Valve Steam GameOverlay; ) AppleWebKit/532.1 (KHTML, like Gecko) Chrome/3.0.195.24 Safari/532.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.0 (KHTML, like Gecko) Chrome/3.0.195.33 Safari/532.0",
  "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.53 Safari/525.19",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-US) AppleWebKit/531.0 (KHTML, like Gecko) Chrome/3.0.183 Safari/531.0",
  "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.53 Safari/525.19",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.36 Safari/525.19",
  "Mozilla/5.0 (Linux; U; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13",
  "Contiki/1.0 (Commodore 64; http://dunkels.com/adam/contiki/)",
  "Contiki/1.0 (Commodore 64; http://dunkels.com/adam/contiki/)",
  "curl/7.7.2 (powerpc-apple-darwin6.0) libcurl 7.7.2 (OpenSSL 0.9.6b)",
  "DocZilla/1.0 (Windows; U; WinNT4.0; en-US; rv:1.0.0) Gecko/20020804",
  "ELinks/0.12~pre2.dfsg0-1ubuntu1-lite (textmode; Debian; Linux 2.6.32-4-jolicloud i686; 143x37-2)",
  "ELinks/0.12pre5.GIT (textmode; CYGWIN_NT-6.1 1.7.1(0.218/5/3) i686; 80x24-2)",
  "ELinks/0.11.3-5ubuntu2-lite (textmode; Debian; Linux 2.6.24-19-generic i686; 126x37-2)",
  "ELinks/0.11.4-2 (textmode; Debian; GNU/kFreeBSD 6.3-1-486 i686; 141x21-2)",
  "ELinks/0.10.4-7ubuntu1-debian (textmode; Linux 2.6.12-10-k7-smp i686; 80x24-2)",
  "ELinks/0.10.5 (textmode; CYGWIN_NT-5.0 1.5.18(0.132/4/2) i686; 143x51-2)",
  "Mozilla/5.0 (X11; U; Linux i686; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Safari/531.2+ Epiphany/2.29.5",
  "Mozilla/5.0 (X11; U; Linux i686; en; rv:1.9.0.11) Gecko/20080528 Epiphany/2.22 Firefox/3.0",
  "Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/420+ (KHTML, like Gecko)",
  "Mozilla/5.0 (X11; U; Linux x86_64; c) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) epiphany",
  "Mozilla/5.0 (X11; U; Linux x86_64; en; rv:1.8.1.4) Gecko/20061201 Epiphany/2.18 Firefox/2.0.0.4 (Ubuntu-feisty)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.5) Gecko/20060731 Epiphany/2.14 Firefox/1.5.0.5",
  "Mozilla/5.0 (X11; U; Linux i686; en; rv:1.8.1) Gecko/20061203 Epiphany/2.16 Firefox/2.0",
  "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.8.0.1) Gecko/Debian-1.8.0.1-5 Epiphany/1.8.5",
  "Mozilla/5.0 (X11; U; Linux i686; cs-CZ; rv:1.7.13) Gecko/20060418 Epiphany/1.8.2 (Ubuntu) (Ubuntu package 1.0.8)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.7.3) Gecko/20040924 Epiphany/1.4.4 (Ubuntu)",
  "Mozilla/5.0 (X11; U; FreeBSD i386; en-US; rv:1.7) Gecko/20040628 Epiphany/1.2.6",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4.1) Gecko/20031030 Epiphany/1.0.8",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4.1) Gecko/20031114 Epiphany/1.0.4",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4) Gecko/20030704 Epiphany/0.9.2",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4) Gecko/20030703 Epiphany/0.8.4",
  "Mozilla/5.0 (X11; U; Linux armv61; en-US; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.2pre) Gecko/20100225 Ubuntu/9.10 (karmic) Namoroka/3.6.2pre",
  "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8) Gecko/20100215 Solaris/10.1 (GNU) Superswan/3.5.8 (Byte/me)",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.0.3) Gecko/2008092414 Firefox/3.0.3 ",
  "Mozilla/5.0 (X11; U; OpenBSD i386; en-US; rv:1.8.1.14) Gecko/20080821 Firefox/2.0.0.14",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.13) Gecko/20060410 Firefox/1.0.8",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.3) Gecko/20041002 Firefox/0.10.1",
  "Mozilla/5.0 (X11; U; SunOS sun4m; en-US; rv:1.4b) Gecko/20030517 Mozilla Firebird/0.6",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.3a) Gecko/20021207 Phoenix/0.5",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.2b) Gecko/20020923 Phoenix/0.1",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008100716 Firefox/3.0.3 Flock/2.0",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.4) Gecko/20060612 Firefox/1.5.0.4 Flock/0.7.0.17.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8b5) Gecko/20051019 Flock/0.4 Firefox/1.0+",
  "Mozilla/5.0 (X11; U; OpenBSD i386; en-US; rv:1.8.1.19) Gecko/20090701 Galeon/2.0.7",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.13) Gecko/20080208 Galeon/2.0.4 (2008.1) Firefox/2.0.0.13",
  "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.8.1.4) Gecko/20061201 Galeon/2.0.2 (Ubuntu package 2.0.2-4ubuntu1)",
  "Mozilla/5.0 (X11; U; FreeBSD i386; en-US; rv:1.7.12) Gecko/20051105 Galeon/1.3.21",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.7.3) Gecko/20040913 Galeon/1.3.18",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.7.3) Gecko/20041007 Galeon/1.3.17 (Debian package 1.3.17-2)",
  "Mozilla/5.0 (X11; U; FreeBSD i386; en-US; rv:1.6) Gecko/20040406 Galeon/1.3.15",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.6) Gecko/20040115 Galeon/1.3.12",
  "Mozilla/5.0 (X11; U; Linux i686) Gecko/20030422 Galeon/1.3.4",
  "Mozilla/5.0 Galeon/1.2.0 (X11; Linux i686; U;) Gecko/20020326",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008072716 IceCat/3.0.1-g1",
  "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.1) Gecko/2008071420 Iceweasel/3.0.1 (Debian-3.0.1-1)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.8) Gecko/20071008 Iceape/1.1.5 (Ubuntu-1.1.5-1ubuntu0.7.10)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.1) Gecko/20061205 Iceweasel/2.0.0.1 (Debian-2.0.0.1+dfsg-2)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; Google Wireless Transcoder;)",
  "Mozilla/5.0 (Linux; U; Android 1.1; en-gb; dream) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2",
  "Mozilla/5.0 (Linux; U; Android 0.5; en-us) AppleWebKit/522+ (KHTML, like Gecko) Safari/419.3 ",
  "Mozilla/3.0 (x86 [en] Windows NT 5.1; Sun)",
  "Mozilla/4.5 RPT-HTTPClient/0.3-2",
  "iCab/2.9.5 (Macintosh; U; PPC; Mac OS X)",
  "Mozilla/4.5 (compatible; iCab 2.7.1; Macintosh; I; PPC)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.11) Gecko Kazehakase/0.5.4 Debian/0.5.4-2.1ubuntu3",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.13) Gecko/20080311 (Debian-1.8.1.13+nobinonly-0ubuntu1) Kazehakase/0.5.2",
  "Mozilla/5.0 (X11; Linux x86_64; U;) Gecko/20060207 Kazehakase/0.3.5 Debian/0.3.5-1",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; KKman2.0)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.1.4) Gecko/20070511 K-Meleon/1.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9) Gecko/2008052906 K-MeleonCCFME 0.09",
  "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.8.0.7) Gecko/20060917 K-Meleon/1.02",
  "Mozilla/5.0 (Windows; U; Win 9x 4.90; en-US; rv:1.7.5) Gecko/20041220 K-Meleon/0.9",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.5) Gecko/20031016 K-Meleon/0.8.2",
  "Mozilla/5.0 (Windows; U; Win98; en-US; rv:1.5) Gecko/20031016 K-Meleon/0.8.2",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.5) Gecko/20031016 K-Meleon/0.8",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.2b) Gecko/20021016 K-Meleon 0.7",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:0.9.5) Gecko/20011011",
  "Mozilla/5.0(Windows;N;Win98;m18)Gecko/20010124",
  "Mozilla/5.0 (compatible; Konqueror/3.1; Linux 2.4.19-32mdkenterprise; X11; i686; ar, en_US)",
  "Mozilla/4.0 (compatible; MSIE 6.0; U; Windows;) Lobo/0.98.2",
  "Lynx/2.8.5dev.16 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6b",
  "Lynx/2.8.5dev.16 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6b",
  "Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.0.16",
  "Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/0.8.12",
  "Lynx/2.8.3rel.1 libwww-FM/2.14FM",
  "Lynx/2.8.4dev.11 libwww-FM/2.14 SSL-MM/1.4.1 OpenSSL/0.9.6",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; Maxthon; .NET CLR 1.1.4322)",
  "Mozilla/5.0 (X11; U; Linux armv6l; en-us) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) midori",
  "Mozilla/5.0 (X11; U; Linux i686; fr-fr) AppleWebKit/525.1+ (KHTML, like Gecko, Safari/525.1+) midori",
  "WinMosaic/Version 2.0 (ALPHA 2)",
  "VMS_Mosaic/3.8-1 (Motif;OpenVMS V7.3-2 DEC 3000 - M700)  libwww/2.12_Mosaic",
  "NCSA_Mosaic/2.7b5 (X11;Linux 2.6.7 i686) libwww/2.12 modified",
  "mMosaic/3.6.6 (X11;SunOS 5.8 sun4m)",
  "mothra/Jul-10-17:33:30-EDT-2006",
  "Mozilla/5.0 (X11; U; Linux i686; nb-NO; rv:1.9.1.8) Gecko/20100205 SeaMonkey/2.0.3",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b4pre) Gecko/20090405 SeaMonkey/2.0b1pre",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1b1pre) Gecko/20080915000512 SeaMonkey/2.0a1pre",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9pre) Gecko/2008060901 SeaMonkey/2.0a1pre",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.13) Gecko/20080313 SeaMonkey/1.1.9 (Ubuntu-1.1.9+nobinonly-0ubuntu1)",
  "Mozilla/5.0 (X11; U; SunOS sun4u; en-US; rv:1.7) Gecko/20070606",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.7.8) Gecko/20050927 Debian/1.7.8-1sarge3",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060823 SeaMonkey/1.1a",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.6) Gecko/20040616 MultiZilla/1.6.3.1d",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US; rv:1.0.2) Gecko/20020924 AOL/7.0",
  "Mozilla/5.0 (Windows; U; Win 9x 4.90) Gecko/20020502 CS 2000 7.0/7.0",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.5b; MultiZilla v1.5.0.2g) Gecko/20030827",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.2) Gecko/20021126",
  "Mozilla/5.0 (Windows; U; WinNT4.0; en-US; rv:1.2) Gecko/20021126",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.2a) Gecko/20020910",
  "Mozilla/5.0 (X11; U; Linux 2.4.3-20mdk i586; en-US; rv:0.9.1) Gecko/20010611",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; InfoPath.1)",
  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MDDC)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; FunWebProducts; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506; Windows-Media-Player/10.00.00.3990)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; GTB6.4; .NET CLR 1.1.4322; FDM; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Rogers Hi∑Speed Internet; (R1 1.3))",
  "Mozilla/4.0 (compatible; MSIE 5.5; Windows 98)",
  "Mozilla/4.0 (compatible; MSIE 5.0; SunOS 5.10 sun4u; X11)",
  "Mozilla/4.0 (compatible; MSIE 5.22; Mac_PowerPC) ",
  "Mozilla/4.0 (compatible; MSIE 4.01; Windows NT 5.0)",
  "Mozilla/2.0 (compatible; MSIE 3.02; Windows CE; 240x320)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GTB6.3; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; ws8 Embedded Web Browser from: http://bsalsa.com/; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)",
  "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.0; Smart Bro)",
  "MMozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; Tablet PC 2.0) Sleipnir/2.8.3",
  "Mozilla/3.0 (compatible; NetPositive/2.2.2; BeOS)",
  "Mozilla/3.0 (compatible; NetPositive/2.2.1; BeOS)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.8pre) Gecko/20071019 Firefox/2.0.0.8 Navigator/9.0.0.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US; rv:1.7.5) Gecko/20050519 Netscape/8.0.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.2) Gecko/20040804 Netscape/7.2 (ax)",
  "Mozilla/4.8 [en] (X11; U; Linux 2.4.20-8 i686)",
  "Mozilla/3.04Gold (X11; U; IRIX 5.3 IP22)",
  "Mozilla/0.96 Beta (X11; Linux 2.6.25.18-0.2-default i686)",
  "Mozilla/4.7 (compatible; OffByOne; Windows 2000)",
  "Mozilla/4.7 (compatible; OffByOne; Windows 2000) Webster Pro V3.4",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; en-US) AppleWebKit/531.9+(KHTML, like Gecko, Safari/528.16) OmniWeb/v622.10.0",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US) AppleWebKit/525.18 (KHTML, like Gecko, Safari/525.20) OmniWeb/v622.3.0.105198",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US) AppleWebKit/125.4 (KHTML, like Gecko, Safari) OmniWeb/v563.34",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US) AppleWebKit/85 (KHTML, like Gecko) OmniWeb/v558.48",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US) AppleWebKit/85 (KHTML, like Gecko) OmniWeb/v558.46",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-US) AppleWebKit/85 (KHTML, like Gecko) OmniWeb/v496",
  "Mozilla/4.5 (compatible; OmniWeb/4.2.1-v435.9; Mac_PowerPC)",
  "Mozilla/4.5 (compatible; OmniWeb/4.2-v435.2; Mac_PowerPC)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.4) Gecko/20061019 pango-text",
  "Opera/9.80 (Windows NT 5.1; U; en) Presto/2.5.22 Version/10.50",
  "Opera/9.80 (Windows NT 6.0; U; en) Presto/2.5.22 Version/10.50",
  "Opera/9.80 (X11; Linux x86_64; U; Linux Mint; en) Presto/2.2.15 Version/10.10",
  "Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.16823/1428; U; en) Presto/2.2.0",
  "Opera/9.80 (J2ME/MIDP; Opera Mini/4.2.14912/1186; U; en) Presto/2.2.0",
  "Opera/9.80 (Windows NT 5.2; U; en) Presto/2.2.15 Version/10.10",
  "Opera/9.80 (X11; Linux i686; U; nl) Presto/2.2.15 Version/10.00",
  "Opera/9.60 (J2ME/MIDP; Opera Mini/4.2.13337/458; U; en) Presto/2.2.0",
  "Opera/9.60 (J2ME/MIDP; Opera Mini/4.1.11320/608; U; en) Presto/2.2.0",
  "Opera/10.00 (X11; Linux i686 ; U; en) Presto/2.2.0",
  "Opera/9.62 (Windows NT 5.1; U; en) Presto/2.1.1",
  "Opera/9.60 (X11; Linux i686; U; en) Presto/2.1.1",
  "Opera/9.52 (Windows NT 5.1; U; en)",
  "Opera/9.25 (Windows NT 6.0; U; en)",
  "Opera/9.20 (Macintosh; Intel Mac OS X; U; en)",
  "Opera/9.02 (Windows NT 5.0; U; en)",
  "Opera/9.00 (Windows NT 4.0; U; en)",
  "Opera/9.00 (X11; Linux i686; U; en)",
  "Opera/9.00 (Windows NT 5.1; U; en)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; PPC; 480x640) Opera 8.60 [en]",
  "Opera/8.00 (Windows NT 5.1; U; en)",
  "Mozilla/5.0 (X11; Linux i386; U) Opera 7.60  [en-GB]",
  "Opera/7.60 (Windows NT 5.2; U)  [en] (IBM EVV/3.0/EAK01AG9/LE)",
  "Opera/7.54 (Windows NT 5.1; U)  [pl]",
  "Opera/7.50 (X11; Linux i686; U)  [en]",
  "Mozilla/5.0 (X11; Linux i686; U) Opera 7.50  [en]",
  "Mozilla/4.0 (compatible; MSIE 6.0; X11; Linux i686) Opera 7.20  [en]",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows ME) Opera 7.11  [en]",
  "Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 4.0) Opera 7.0 [en]",
  "Mozilla/4.0 (compatible; MSIE 5.0; Windows 2000) Opera 6.0 [en]",
  "Mozilla/4.0 (compatible; MSIE 5.0; Windows 95) Opera 6.01  [en]",
  "Mozilla/4.0 (compatible; MSIE 5.0; Mac_PowerPC) Opera 5.0  [en]",
  "Mozilla/4.01 (Compatible; Acorn Browse 1.25 [23-Oct-97] AW  97; RISC OS 4.39) Acorn-HTTP/0.84",
  "Mozilla/1.10 [en] (Compatible; RISC OS 3.70; Oregano 1.10)",
  "Mozilla/1.10 [en] (Compatible; RISC OS 3.70; Oregano 1.10)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.6) Gecko/20011128",
  "Mozilla/3.0 (compatible; HP Web PrintSmart 04b0 1.0.1.34)",
  "Mozilla/5.0 (X11; U; Linux armv6l; en-US; rv: 1.9.1a2pre) Gecko/20080813221937 Prism/0.9.1",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071719 prism/0.8",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_2; en-us) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10",
  "Mozilla/5.0 (iPod; U; CPU iPhone OS 2_2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5H11a Safari/525.20",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/525.28.3 (KHTML, like Gecko) Version/3.2.3 Safari/525.28.3",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Version/3.1.2 Safari/525.21",
  "Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5F136 Safari/525.20",
  "Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_0 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5A347 Safari/525.20",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Version/3.1.2 Safari/525.21",
  "Mozilla/5.0 (iPod; U; CPU iPhone OS 2_0 like Mac OS X; de-de) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5A347 Safari/525.20",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Version/3.1.2 Safari/525.21",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.18 (KHTML, like Gecko) Version/3.1.1 Safari/525.17",
  "Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_2; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_2; en-us) AppleWebKit/525.13 (KHTML, like Gecko) Version/3.1 Safari/525.13",
  "Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/4A93 Safari/419.3",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-gb) AppleWebKit/523.10.6 (KHTML, like Gecko) Version/3.0.4 Safari/523.10.6",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; bg) AppleWebKit/522.13.1 (KHTML, like Gecko) Version/3.0.2 Safari/522.13.1",
  "Mozilla/4.0 (compatible; Mozilla/4.0; Mozilla/5.0; Mozilla/6.0; Safari/431.7; Macintosh; U; PPC Mac OS X 10.6 Leopard; AppleWebKit/421.9 (KHTML, like Gecko) )",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/418.8 (KHTML, like Gecko) Safari/419.3",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/417.9 (KHTML, like Gecko) Safari/417.8",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en) AppleWebKit/417.3 (KHTML, like Gecko) Safari/417.2",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/412 (KHTML, like Gecko) Safari/412",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/312.9 (KHTML, like Gecko) Safari/312.6",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.5.1 (KHTML, like Gecko) Safari/312.3.1",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; fr-fr) AppleWebKit/312.5 (KHTML, like Gecko) Safari/312.3",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/124 (KHTML, like Gecko) Safari/125.1",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/106.2 (KHTML, like Gecko) Safari/100.1",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; es) AppleWebKit/85 (KHTML, like Gecko) Safari/85",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en-us) AppleWebKit/74 (KHTML, like Gecko) Safari/74",
  "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/51 (like Gecko) Safari/51",
  "Mozilla/5.0 (X11; U; OpenVMS AlphaServer_ES40; en-US; rv:1.4) Gecko/20030826 SWB/V1.4 (HP)",
  "Mozilla/2.0 (Compatible; SIS 1.2; IIgs)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.2pre) Gecko/2009031304 Spicebird/0.7.1 ",
  "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.0.10) Gecko/2009043012 Songbird/1.2.0 (20090616030052)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008072921 Songbird/0.7.0 (20080819112708)",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1b2) Gecko/20060925 Songbird/0.2.5.1 (20070301190953)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.0; en-NZ; rv:1.8.1b2) Gecko/20060925 Songbird/0.2",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8) Gecko/20060206 Songbird/0.1",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.9 (KHTML, like Gecko) Iron/4.0.280.0 Chrome/4.0.280.0 Safari/532.9",
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-us) AppleWebKit/525.27.1 (KHTML, like Gecko) Stainless/0.5.5 Safari/525.20.1",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.12pre) Gecko/20080101 Strata/4.1.0.1274",
  "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1) Gecko/20061024 Firefox/2.0 (Swiftfox)",
  "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.5) Gecko/20031007 Sylera/1.2.7",
  "Mozilla/3.0 (compatible; WebCapture 2.0; Auto; Windows)",
  "Mozilla/4.0 WebTV/2.8 (compatible; MSIE 4.0)",
  "Mozilla/1.10 [en] (Compatible; RISC OS 3.70; Oregano 1.10)",
  "Contiki/1.0 (Commodore 64; http://dunkels.com/adam/contiki/)",
  "Mozilla/4.0 (compatible; Powermarks/3.5; Windows 95/98/2000/NT)",
  "Mozilla/5.0 (compatible; IDZap)",
  "Bobby/4.0.1 RPT-HTTPClient/0.3-3E",
  "W3C_Validator/1.183 libwww-perl/5.64",
  "Mozilla/4.01 (Compatible; Acorn Phoenix 2.08 [intermediate]; RISC OS 4.39) Acorn-HTTP/0.84 ",
  "mozilla/4.0 (compatible; msie 6.0; windows 98; ypc 3.0.2; yplus 4.4.01d)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; FREE; .NET CLR 1.1.4322)",
  "Mozilla/4.5 RPT-HTTPClient/0.3-2 ",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; KTXN)",
  "Mozilla/3.0 (compatible; HP Web PrintSmart 04b0 1.0.1.34)",
  "Mozilla/4.0 (compatible; MSIE 5.0; Win3.1; ATHMWWW1.1;)",
  "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705; .NET CLR 1.1.4322)",
  "Mozilla/4.0 (compatible; ICS 1.2.105)",
  "Sqworm/2.9.85-BETA (beta_release; 20011115-775; i686-pc-linux"		     
];

var size = 0;
var keepAspectRatio = false;
var maxResults = 0;
var userAgent = null;

/**
 * String -> Void
 * Logs a message
 */
function note(msg) {
  try {
    console.log(NOTE_PREFIX + msg);
  } catch (e) {}
}

/**
 * String Object -> Object
 * Stores val as key and returns val
 */
function setValue(key,val) {
  var k = PREFIX + key;
  try {
    GM_setValue(v,val);
  } catch (e) {
    try {
      localStorage.setItem(k,val);
    } catch (e) {
      try {
	localStorage[k] = val;
      } catch (e) {
	note('can\'t setValue(' + key + ',' + val + ')');
      }
    }
  }
  return val;
}

/**
 * String Object -> Object
 * Returns value stored for key or defaultValue if stored value is null
 */
function getValue(key,defaultValue) {
  var k = PREFIX + key;
  var res;
  try {
    res = GM_getValue(PREFIX + key);
  } catch (e) {
    try {
      res = localStorage.getItem(k);
    } catch (e) {
      try {
	res = localStorage[k];
      } catch (e) {
	note('can\'t getValue(' + key + ')');
      }
    }
  }
  if (!res) res = defaultValue;
  return res;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

const SPAM_EXCLUDES = [
    /footer/i,
    /logo/i,
    /\.gif$/
];
/*
 * String -> Boolean
 * Returns whether src is a spam image or not
 */
function isSpam(src) {
  var excludes = SPAM_EXCLUDES;
  for (var i in excludes) {
    if (src.match(excludes[i])) return true;
  }
  return false;
}

var cnt=0;
/*
 * Remember the images we've seen before.  When there are duplicates
 * it's almost definitely spam.
*/
var seenImages = {};
function newFunction(_a) {
  var a = _a;
  var seen = seenImages;
  return function(details) {
    if (details.responseText) {
      
      if (m = details.responseText.match(/img[^>]*src=\"([^\"]+)\"/gi)) {
        //
        // Go thru the links
        // div will hold the new div below the links parent
        //
        var div;
        var cnt = 0;
        for (var j=0; j<m.length; j++) {
          s = m[j];
          if (!s) continue;
          //
          // basically a hack, but I thought this would return 
          // an array
          s = s.replace(/img src=/g,"");
          s = s.replace(/\"/g,"");
	  //
	  // Remove spam images
	  //
	  if (isSpam(s)) {
	    note('Skipping spam: ' + s);
	    continue;
	  }
	  //
	  // Exclude repeat images
	  //
	  if (seen[s]) {
	    note('Skipping repeat image: ' + s);
	    continue;
	  }
	  seen[s] = true;
          //
          // For the first time create the div to hold the links
          //
          if (!div) {
            var d = $n("div",a.parentNode);
            var br = $t(" ",a.parentNode);
            div = $n("div",a.parentNode);
          }
          //
          // Create the link and image and add them
          //
          var newA = $n("a",div);
          var img = $n("img",newA);
	  //
	  // Add an onerror listener to remove the image if it doesn't load
	  //
	  img.addEventListener('error',(function() {
	    var _div = div;
	    var _newA = newA;
	    return function(e) {
	      _div.removeChild(_newA);
	    };
	  })(), true);

          img.className = CLASS;
          img.src = s;
          //
          // 1.5: Don't change the height if we're keeping the aspect ratio
          //
          if (!keepAspectRatio) {
            img.style.width = size + "px";
          }
          img.style.height = size + "px";
          newA.href = s;
          if (++cnt > maxResults-1) {
            var amt = m.length-maxResults;
            if (amt != 0) {
              $t(" ...",div);
              $t(amt + " more ",div);
            }
            break;
          }
          $t(" ",div);
        }
      }
    }
  };
}

function addLinkAtTop() {

  var span = $n("span");
  span.style.verticalAlign = "middle";

  $t("change size: ",span);

  var sel = $n("select",span);
  for (var i=10; i<=300; i += 10) {
    var opt = $n("option",sel);
    opt.value = i;
    if (i == size) opt.selected = true;
    opt.innerHTML = i;
  }
  sel.addEventListener("change",function() {
    var v = sel.value;
    size = setValue(SIZE_PARAM,v);
    changeSizes();
  },true);

  $t(" keep aspect ratio: ",span);

  var check = $n("input",span);
  check.type = "checkbox";
  if (keepAspectRatio) check.checked = "1";
  check.addEventListener("change",function() {
    var v = check.checked;
    keepAspectRatio = setValue(KEEP_ASPECT_RATIO_PARAM,v);
    changeSizes();
  },true);

  $t("max # of images: ",span);

  var sel2 = $n("select",span);
  for (var i=1; i<=MAX_MAX_RESULTS; i++) {
    var opt = $n("option",sel2);
    opt.value = i;
    if (i == maxResults) opt.selected = true;
    opt.innerHTML = i;
  }
  sel2.addEventListener("change",function() {
    var v = sel2.value;
    maxResults = setValue(MAX_RESULTS_PARAM,v);
    document.location = document.location;
  },true);
  
  var tab = document.getElementById("topbar");
  if (!tab) {
    tab = document.getElementsByTagName("table")[0];
  }
  tr = $n("tr",tab);
  td = $n("td",tab);
  td.appendChild(span);
  tab.insertBefore(tr,tab.firstChild);
}

function changeSizes() {
  var imgs = document.getElementsByTagName("img");
  for (var i in imgs) {
    var img = imgs[i];
    if (img.className != CLASS) continue;
    //
    // 1.5: Don't change the height if we're keeping the aspect ratio
    //
    if (!keepAspectRatio) {
      img.style.width = size + "px";
    }
    img.style.height = size + "px";
  }
}

function getUserAgent() {
  if (!userAgent) {
    userAgent = Math.floor(Math.random()*USER_AGENTS.length);
  }
  return userAgent;
}

function showImages() {
  //
  // Find all the links to listings and display the images
  //
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {

    link = links[i];
    if (link.href && link.href.match(/.*craigslist.org.*\/\d+\.html$/)) {
      GM_xmlhttpRequest({
	method:"GET",
        url: link.href,
        headers:{
          "User-Agent": getUserAgent(),
          "Accept":"text/html,text/monkey,text/xml,text/plain",
        },
        onload: newFunction(link)
      });
    }
  }
}

function isListPage() {
  var loc = String(document.location);
  return loc.match(/http:\/\/\w+\.craigslist.org\/\w+\/?/);
}

function main() {
  if (!isListPage()) return;
  size = getValue(SIZE_PARAM,100);
  keepAspectRatio = getValue(KEEP_ASPECT_RATIO_PARAM,true);
  maxResults = getValue(MAX_RESULTS_PARAM,MAX_MAX_RESULTS);
  addLinkAtTop();
  showImages();
}

main();