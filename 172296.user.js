// ==UserScript==
// @name            NeoGAF font fix
// @description     Changes the font declaration to load your OS's default sans-serif font.
// @version         1

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js

// @include        http://*.neogaf.com/forum/forumdisplay.php*
// @include        http://*.neogaf.com/forum/subscription.php*

// @include        http://*.neogaf.com/forum/showthread.php*
// @include        http://*.neogaf.com/forum/showpost.php?p*
// @include        http://*.neogaf.com/forum/newreply.php*
// @include        http://*.neogaf.com/forum/editpost.php*
// @include        http://*.neogaf.com/forum/private.php*

// @include        http://*.neogaf.net/forum/showthread.php*
// @include        http://*.neogaf.net/forum/showpost.php?p*
// @include        http://*.neogaf.net/forum/newreply.php*
// @include        http://*.neogaf.net/forum/editpost.php*
// @include        http://*.neogaf.net/forum/private.php*

// @match          http://*.neogaf.com/forum/showthread.php*
// @match          http://*.neogaf.com/forum/showpost.php?p*
// @match          http://*.neogaf.com/forum/newreply.php*
// @match          http://*.neogaf.com/forum/editpost.php*
// @match          http://*.neogaf.com/forum/private.php*

// @match          http://*.neogaf.net/forum/showthread.php*
// @match          http://*.neogaf.net/forum/showpost.php?p*
// @match          http://*.neogaf.net/forum/newreply.php*
// @match          http://*.neogaf.net/forum/editpost.php*
// @match          http://*.neogaf.net/forum/private.php*

// ==/UserScript==

var fontStyles = "* { font-family: Verdana, sans-serif !important; } TD { line-height: 100%} .threadbit-lastpostlink {margin-top: 0px;}"

GM_addStyle(fontStyles);


$('SPAN.time').next().remove();