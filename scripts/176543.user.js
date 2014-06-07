// Google Old Favicon ['09-'11]
// 2013
// from FalkeXY 2013
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Old Favicon ['09-'11]
// @description   Replaces Googles Favicon with the one from 2009 to 2011 - by FalkeXY
// @include       htt*://*.google.*/*
// @include       htt*://google.*/*
// @exclude	/^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.*.*/
// @exclude     /^htt.*://(mail|accounts|support|maps|play|news|drive|translate|plus)\.google\.co.*/
// @version       1.1_2
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGnRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS4xMDD0cqEAAAM5SURBVDhPTZN9TNVVGMefey62ZCTwh21NLdbKTGOtzeLlSqQtFqymzdRoU7cs/8le/urFbi3BS2GpmEaCvbJ2E3MGFOidhZVa5BioCytI3rIk7xW4F3b1+rvcT8/vWFt/PHvOOTvft+d3fgKIk4TOvmFy1gZJe+gTqvafIpVKkoiOcbS4kB6PcMUYpkS0DHHdj+raxUrSQS/DsspDyKoQZl0nM574mt//ilmS+M89nM9I/xfstd0liEgag0YQF+w4DrdsaEPWdSDru5Hy76j84rQlVg4GS0pIiIekV2wfV6KwkgwombgX3PL52zGrf8Cs78A8foxV27rUoWNJzi5fxqQq/udiQsF/6rrXeJWAKdyqaDyNLA+R9uQJzGPfUF7TwZSLvgw/3j6P72+4hua52bTlZNOZNc3ad2cjfUMXrcpINM68Da3Io4eZsTpEqPucPa9r3sOc53OQd/Pw1hYh7/iYXn0PhU/lsmVBJnLbmo/Y334GlWMsluDjI/30Dl+06oFDdUjFHXjrfXh3FyK1eXhqC/Ds0PXOYjxvLEFmrtxL1tL3WfJckM0N7XbybvYjvT9hXrwJ2XM3UpeH1Ct41yJbsj0fz5YiJbhXHZQ3MHvFp1xb9iHZD+5mYCRq1Yci55hb/wiyK9eqmvd8us63EWS7gpVAqnV/c+k28td8wMrXWni25lu6e0ctgTvYcCxMyd6n8WzNVfuq7IL/T7BZK3j4JOFR/RI6sCvjPYycbaK/u5ZLExeunulLKw0+oyTzNbcq1vgwbxUgbyphQMuNPPH3Sbqa8hloSuePVmH4gOFM43yikd/sTH4ZGeS6qmIFF+B9exGmWpUDmn+T1mVnks5gHmNfCanjBudoOvH26VzYJ/Q1lV2NoyK37lihmRciWzVCVRHTNt2PvKoEsUg/vzbM4lIoi2gog1hrJuMtmUx+OYvzn98JiQniToo5gTIF6jADi7Wri9fvQ15RJ04yxcDBtUQ+y2C8+XqiLTMtOLrvRkaP+e0cGk8cxPvCXXgq9T1UaBRXeaPWy+rC/s6TEcLH/Yy1LSXa/ID2h4l37SThxDk11M/sl0oVsBDjV7DfVdbhbVysUOQfPFOSQg11AUoAAAAASUVORK5CYII=");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 1.1_2	Initial release.