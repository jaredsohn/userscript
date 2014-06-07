// ==UserScript==
// @name          Google Favicon Redesigned
// @description   Replaces the Google favicon with one designed by Tyler Sticka. Tweak of "Google's Old Favicon" script.
// @version       1.1
// @author        Tyler Sticka
// @namespace     http://userscripts.org/users/50438
// @include       http://*.google.tld/*
// @include       http://google.tld/*
// @include       https://*.google.tld/*
// @include       https://google.tld/*
// @exclude       http://desktop.google.tld/*
// @exclude       http://docs.google.tld/*
// @exclude       http://google.tld/notebook/*
// @exclude       http://groups.google.tld/*
// @exclude       http://mail.google.tld/*
// @exclude       http://pack.google.tld/*
// @exclude       http://pages.google.tld/*
// @exclude       http://picasaweb.google.tld/*
// @exclude       http://toolbar.google.tld/*
// @exclude       http://sites.google.tld/*
// @exclude       http://spreadsheets.google.tld/*
// @exclude       http://webaccelerator.google.tld/*
// @exclude       http://www.google.tld/calendar/*
// @exclude       http://www.google.tld/notebook/*
// @exclude       http://www.google.tld/reader/*
// @exclude       http://www.google.tld/analytics/*
// @exclude       https://docs.google.tld/*
// @exclude       https://sites.google.tld/*
// @exclude       https://spreadsheets.google.tld/*
// @exclude       https://pages.google.tld/*
// @exclude       https://groups.google.tld/*
// @exclude       https://mail.google.tld/*
// @exclude       https://www.google.tld/calendar/*
// @exclude       https://www.google.tld/health/*
// @exclude       https://www.google.tld/reader/*
// @exclude       https://www.google.tld/analytics/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var vodka = document.createElement('link');
vodka.setAttribute('type', 'image/x-icon');
vodka.setAttribute('rel', 'shortcut icon');
vodka.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD///+M38rA/7txUf+iPRH/nDAB/7VkQf/hv7H//////7enoP9XHAL/njIC/5wwAf+cMAD/nDAA/5wwAP/Nl3+My7mx/6I3CP+iNwn/pDkL/6U7Df+mPQ7/pz4Q/+TDtf//////cVFE/5EzCv+jOAn/oTYH/580BP+dMQH/nDAA/4VZRv+pQBL/q0IV/61FF/+vRxr/sEgb/7FJHP/ZpY7//////66bk/+RNxD/qUAS/6c+D/+lOwz/ozgJ/6A1Bf+Mcmf/n0Ib/7VPIv+3USX/uVMn/7pUKf+7Vin/3c3H///////GubT/lz4Y/69HGv+uRRj/q0IU/6g/Ef+lOw3/9fLx/3haTf93OB3/pE4q/6VQLP+nUi7/wqme////////////oYZ6/7dRJP+2TyL/tE0g/7FJHP+uRhj/q0IU/+nQxf//////5tvW/8Cpn/+0m5D/39jV////////////6uXi/61aNv++WC3/vFYq/7pUKP+3UCT/tE0g/7BIG/+wSRv/uVkv/8t+XP/NgWD/693X////////////4tnV/8VyTv/FYTf/xGA1/8JeM/+/WzD/vFcs/7lTJ/+1TiL/tU4h/7lTJ/++WC3/xmdA////////////zr+5/8dvSf/LaUD/y2k//8pnPv/IZTv/xWI4/8JeM/++WS7/ulQo/7lTJ/+cYkr/rpaM/76vqf///////////45xZf/CaUP/0nFI/9FxSP/Qb0b/zm1D/8tpP//HZDr/w181/79aL//MtKr////////////f0Mr/5LWh//Tk3f/k29f/d0k2/9B0Tv/YeFD/1ndO/9RzS//Qb0b/zGpB/8hlO//DXzT////////////Eq6D/0G9G/9V1TP/bgVz/+e7q/+DZ1/9yQi7/1XtW/9x+V//ZelL/1nZN/9FwR//MakD/x2M5///////q5eP/t2E8/9R0S//ZelL/3oBZ//TRw///////pI+G/8N0U//ihV//34Fa/9p7U//VdUz/0G5F/8pnPv//////vrCq/9FxSP/XeFD/3X9Y/+KFX//y2M3//////6+dlf/Ielr/6Itm/+OGYP/egFn/2HlR/9NySf/Na0H//////6mVjf/Tc0r/2ntT/+CCW//miWP/9e3q//////+wnpf/zYBh/+yRbP/ni2X/4YNd/9t8VP/UdEz/zm1E//////+/sKr/tGNB/9t8VP/hhF3/5LWj////////////rox///WceP/vlXD/6Y1n/+KFX//cfVb/1nZN/89uRf////+M/////66ZkP+zgWz/yKSU////////////x7mz/+eUc//1nHj/75Vw/+mNZ//ihV//3H1W/9Z2Tf/ntqKMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//w==');
head.appendChild(vodka);