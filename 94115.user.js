// ==UserScript==
// @name           ShowRSSonNewTwitter
// @namespace      http://afroginthevalley.com/
// @include        *://twitter.com/*
// ==/UserScript==

// super quick hack based on TwitterProfileExtention2 to display an RSS icon for updates on user profiles


var d = document
    // Code borrowed and modified from http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/
    ,_ = function(o){return o.wrappedJSObject||o}
    ,$ = function(id){return _(d.getElementById(id))}
    ,$x = function(xp,c){return _(d.evaluate(xp,c||d,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)}
    ,$a = function(xp,c){var r=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),a=[]
                            for(var i=0,l=r.snapshotLength;i<l;i++){a.push(_(r.snapshotItem(i)))}return a}
    ,$e = function(e,t,f){if(e)e.addEventListener(t,f,false)}
//    ,$addClass = function(e,c){if(!e.className.match(new RegExp('(?:^|\s)'+c+'(?:$|\s)')))e.className+=' '+c}
//    ,$removeClass = function(e,c){e.className=e.className.replace(new RegExp('(?:^|\s)'+c+'(?:$|\s)'),' ')}
    ,$live = function(xp,f,c){var a=[],s,r=function(){s=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,s)
        for(var i=0,l=s.snapshotLength;i<l;i++){var e=_(s.snapshotItem(i));if(a.indexOf(e)<0){a.push(e);f(e)}}setTimeout(r,250)};r()}
    ,tooltip
    ,tooltip_inner

var list = [ 
            ["RSS", "http://twitter.com/statuses/user_timeline/", "http://www.feedicons.com/favicon.ico"]
            ]

$live('//ul[contains(@class,"user-stats")]|//div[@class="location"]|'
    + '//div[@class="screen-name-and-location"][../@class="profile-details"]', function(e){
    if (e.localName == 'ul') {
        var scrname = $x('li/a[contains(@class,"user-stats-count")]',e).href.match(/[a-zA-Z0-9_]+$/)
            ,li = d.createElement("li")
            ,html = ''
        for(var i=0,l=list.length;i<l;i++){
            html += '<a href="' + list[i][1] + scrname + '.rss"><img src="' + list[i][2] 
                 + '" title="' + scrname + '\'s '+ list[i][0] 
                 + '" style="margin:0px 2px;width:16px;height:16px" /></a>'
        }
        li.innerHTML = html
        e.appendChild(li)
        $a('a/img',li).map(tipsy_tooltip)
    } else {
        var loc
        if (e.className != 'location') {
            loc = e.childNodes[1].textContent.trim()
        } else {
            loc = e.textContent.trim()
        }
        if (loc) {
            var iphoneLoc = loc.replace(' ', '').match(/^iphone\:(-?\d+\.\d+,-?\d+\.\d+)$/i)
            if (iphoneLoc) {
                loc = iphoneLoc[1]
            }
            e.innerHTML += '<a href="http://maps.google.com/maps?q=' + encodeURI(loc) 
                        + '" ><img src="http://www.gstatic.com/mgc/images/icons/32x32/maps.png"'
                        + ' title="Google Map" alter="Google Map" style="width:16px;'
                        + 'height:16px;float:none;vertical-align:middle" /></a>'
        }
    }
}, $('page-container'))

function tipsy_tooltip(c){
    $e(c, 'mouseover', function(){
        if(!tooltip){
            tooltip = d.createElement('div')
            tooltip.className = 'tipsy tipsy-south'
            tooltip.style.position = 'absolute'
            tooltip.style.zIndex = 100000
            tooltip.innerHTML = '<div class="tipsy-inner">'
            tooltip_inner = tooltip.getElementsByClassName('tipsy-inner')[0]
            tooltip_inner.style.fontSize = "10pt"
        }
        tooltip_inner.innerHTML = this.title
        this.title = ''
        d.body.appendChild(tooltip)
        var box = this.getBoundingClientRect()
        tooltip.style.top = box.top - tooltip.offsetHeight + window.scrollY - 2 + 'px'
        tooltip.style.left = box.left + (box.width / 2) 
                           - (tooltip.offsetWidth / 2) + window.scrollX + 'px'
        tooltip.style.visibility = "visible"
        tooltip.style.display = "block"
    })
    $e(c, 'mouseout', function(){
        d.body.removeChild(tooltip)
        this.title = tooltip_inner.innerHTML
        tooltip_inner.innerHTML = ''
    })
}
