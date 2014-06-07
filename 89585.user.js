// ==UserScript==
// @name           QuoteButton
// @namespace      http://mstssk.blogspot.com/
// @description    Quote target tweet in replyi dialog on Twitter.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.2
// @build          3
// ==/UserScript==

// Code borrowed and modified from http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/ 
var d = document
    ,_ = function(o){return o.wrappedJSObject||o}
    ,$ = function(id){return _(d.getElementById(id))}
    ,$x = function(xp,c){return _(d.evaluate(xp,c||d,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)}
//    ,$a = function(xp,c){var r=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),a=[]
//                            for(var i=0,l=r.snapshotLength;i<l;i++){a.push(_(r.snapshotItem(i)))}return a}
    ,$e = function(e,t,f){if(e)e.addEventListener(t,f,false)}
//    ,$addClass = function(e,c){if(!e.className.match(new RegExp('(?:^|\s)'+c+'(?:$|\s)')))e.className+=' '+c}
//    ,$removeClass = function(e,c){e.className=e.className.replace(new RegExp('(?:^|\s)'+c+'(?:$|\s)'),' ')}
    ,$live = function(xp,f,c){var a=[],s,r=function(){s=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,s)
        for(var i=0,l=s.snapshotLength;i<l;i++){var e=_(s.snapshotItem(i));if(a.indexOf(e)<0){a.push(e);f.apply(e)}}setTimeout(r,250)};r()}
    ,tooltip
    ,tooltip_inner

$live('//div[contains(@class,"twttr-dialog-footer")]/div[contains(@class,"twttr-dialog-reply-footer")]', function(){

    var content = this.textContent.trim().replace(/^([_a-zA-Z0-9]+)\s*(.+)/, " RT @$1: $2")
        ,isProtected = (document.querySelector('a.tweet-timestamp[href^="/#!/' + RegExp.$1 + '/status/"] > span.protected-icon') != null)
        ,textarea = $x('ancestor::div[@class="twttr-dialog-inside"]//textarea[@class="twitter-anywhere-tweet-box-editor"]', this)
        ,tweetButton = $x('ancestor::div[@class="twttr-dialog-inside"]//a[contains(@class,"tweet-button")]', this)
        ,reTweetButton = d.createElement('a')
    reTweetButton.className = 'retweet btn tweet-button button' + (isProtected ? ' disabled' : '')
    reTweetButton.href = '#'
    reTweetButton.innerHTML = 'Quote'
    reTweetButton.style.marginRight = '5px'
    reTweetButton.title = isProtected ? 'The tweet is protected' : 'Quote the tweet'
    tweetButton.parentNode.insertBefore(reTweetButton, tweetButton)
    tipsy_tooltip(reTweetButton)
    $e(reTweetButton, 'click', function(){
        if (isProtected) {
            return false;
        }
        textarea.value = content
        textarea.focus()
        textarea.setSelectionRange(0,0)
        return false
    })

})

function tipsy_tooltip(c) {
    $e(c, 'mouseover', function(){
        if(!tooltip){
            tooltip = d.createElement('div')
            tooltip.className = 'tipsy tipsy-s'
            tooltip.style.position = 'absolute'
            tooltip.style.zIndex = 100000
            tooltip.innerHTML = '<div class="tipsy-arrow" /><div class="tipsy-inner">'
            tooltip_inner = tooltip.firstChild.nextSibling
        }
        tooltip_inner.innerHTML = this.title
        this.title = ''
        d.body.appendChild(tooltip)
        var box = this.getBoundingClientRect()
            ,style = tooltip.style
        style.top = box.top - tooltip.offsetHeight + window.scrollY - 2 + 'px'
        style.left = box.left + (box.width / 2) 
                           - (tooltip.offsetWidth / 2) + window.scrollX + 'px'
        style.visibility = "visible"
        style.display = "block"
    })
    $e(c, 'mouseout', function(){
        d.body.removeChild(tooltip)
        this.title = tooltip_inner.innerHTML
        tooltip_inner.innerHTML = ''
    })
}
