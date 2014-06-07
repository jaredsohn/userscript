// ==UserScript==
// @name       Remove annoying ASK.fm Facebook Posts
// @namespace  http//no-homepage.com
// @version    0.1.1
// @description  Removes all ask.fm links posted on facebook
// @match      *facebook.com*
// @copyright  2013, TobSpr
// ==/UserScript==


function hideAskFM() {

    container = document.getElementsByTagName('li')
    for(var i=0;i<container.length;i++) {
    	c = container[i]
        if(c.innerHTML.indexOf('ask.fm')>0) {
            c.innerHTML = '<span style="padding: 8px 10px !Important;margin-left: -18px !Important;margin-top: -1px;border-top: 1px solid #eee;display: block;background: #fff;font-weight:bold;color:#aaa;font-size:11px;font-family:Tahoma;">NO ANNOYING ASK.FM POSTS ANYMORE *_*</span>'
            c.className = '';
        }
    }
}

setInterval(hideAskFM, 200)
hideAskFM()
