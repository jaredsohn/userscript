// ==UserScript==
// @author     Miguel Miranda de Mattos
// @name       Patch LinkedIn messages body.
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Makes messages bodies and inbox sidebar more easy on the eyes.
// @match      http://www.linkedin.com/inbox/mailbox/message/*
// @require   https://gist.github.com/mmmattos/6264214/raw/755d33de2038afe4d82fef4bf41b3824ee25effa/jsLib.js
// @copyright  2014+, @achurasapps
// ==/UserScript==
addCustomStyle('.content{font-size:11px;font-weight:bolder;}');
addCustomStyle('.sidebar{font-size:11px;font-weight:bolder;}');