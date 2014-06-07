// ==UserScript==
// @name       LF Elements US
// @namespace  LF Elements US
// @version    0.9
// @description  Exclusive Userscript for the LeakForums Group "Elements"
// @include      http://*leakforums.org*
// @copyright  2013+, HypnoToad
// @run-at document-start
// ==/UserScript==


/*
Nice of you to be looking in the source - I hope you're not going to steal anything without permissions or the correct credit given.
Oh, but I'm not interested in improvements on how it can load quicker etc, it's a rough script and I wasn't exactly going to devote my
life to it -- seeming as nobody's going to use it probably :fp:
*/

//Alter colours + other minor tweaks, all CSS
document.head.lastElementChild.outerHTML+="<style>html{-webkit-filter:hue-rotate(50deg)}body{background:url(https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/LF_BG.png) #070a00!important}::selection{background:#a9e969!important}::-moz-selection{background:#a9e969!important}img,.blue_alert,a[href*='member.php?action=profile&uid='] span,.post_body span,.editor_button_color_selected,.editor_dropdown_color_item,.largetext>span,.active>font,.forumdisplay_regular font strong,.trow1>table>tbody>tr>td>.largetext span,input[type='radio'],.boxcontent .largetext,.tborder tr div span font strong,.online,.tborder a font strong{-webkit-filter:hue-rotate(-50deg)}td>img[class='tooltip'],.post_author img[src*='Cake_cream'],.post_body span[style*='007787'],img[src*='multiquote'],img[src*='/top.png'],img[src*='bullet.png'],.trow1[class*='reputation'],.post_content span *{-webkit-filter:none!important}s{-webkit-filter:brightness(50%)}.thead{-webkit-filter:brightness(125%) contrast(120%)}blockquote,.codeblock{background:rgba(98,136,69,.15)!important}.trow1:not(.trow_reputation_positive):not(.trow_reputation_negative),.trow2,.dtabscontent,.boxcontent{background:rgba(0,0,0,0)!important}.crumbholder,.tcat{background:rgba(0,0,0,.15)!important}.tborder{background:#1d201b}.pagination a,.pagination_current{border:1px solid #000!important;background:hsla(0,0,100%,.15)!important;position:relative;margin-right:-4px;font-size:12px;-moz-border-radius:3px;border-radius:3px}.pagination a:hover{background:hsla(0,0,100%,.2)!important;color:#000}.pagination .pages{font-size:0;border:0}.pagination_current{color:#FFF!important;cursor:default}.thead *{text-shadow:0 0 0 #000!important}a:hover{-webkit-filter:brightness(75%)}a{cursor:pointer!important}.button:hover{cursor:pointer!important}a:visited{color:#a9e969}.codeblock .title{color:#EEE}.logo{text-align:center;margin-bottom:20px;background:url(https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/LF_LOGO.png) no-repeat center center}.logo:hover{-webkit-filter:brightness(75%)}.logo img{z-index:-1;opacity:0;filter:alpha(opacity=0)}#hoverheader{width:90%!important;text-align:center;margin:auto;position:fixed;top:0;left:0!important;right:0!important;opacity:.7}#hoverheader:hover{opacity:1}#hoverheader .welcome img{margin-left:-70px}#container .tborder input[type='text'],#container .tborder input[type='number'], input[name^='against'], input[value^='betting'],#container .tborder center>input{color:#FFF;background:#111;border:#333 solid 1px}.pagination .pagination_current{background:#f5f5f5;border:1px solid #81a2c4;font-weight:700;color:#000!important;text-shadow:0 0 0 #000}</style>";