// ==UserScript==
// @name           TwitterColorLabel2
// @namespace      http://mstssk.blogspot.com/
// @description    Coloring tweets like twicca(http://twicca.r246.jp/) on NewTwitter!
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @version        1.0.5
// @build          6
// ==/UserScript==

const propertyName = 'list'
    ,ns = 'jp.mstssk.twitter_color_label.' // localStorage namespace
var isFx = GM_getValue('dummy',1) // GM_getValue does not return 2nd argument in GoogleChrome.
    ,MY_getValue = isFx ? GM_getValue : (function(key,defaultValue){
                            var value=localStorage.getItem(ns+key);return value!==null?value:defaultValue})
    ,MY_setValue = isFx ? GM_setValue : (function(key,value){localStorage.setItem(ns+key,value)})
    ,d = document
    ,current_list = JSON.parse(MY_getValue(propertyName,'{}'))
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
        for(var i=0,e,l=s.snapshotLength;i<l;i++){e=_(s.snapshotItem(i));if(a.indexOf(e)<0){a.push(e);f(e)}}setTimeout(r,250)};r()}
    ,tooltip
    ,tooltip_inner

// set up
(function(){

    var img = 'data:image/png;base64,'
             + 'iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAQAAADRCYyNAAAAAnNCSVQICFXs'
             + 'RgQAAAAJcEhZcwAADiYAAA4mAaLvJfwAAAAZdEVYdFNvZnR3YXJlAHd3dy5p'
             + 'bmtzY2FwZS5vcmeb7jwaAAAAgklEQVQI12NgIAoYszpwOHBoswFZbMYcQMjK'
             + 'YPzU+BEQPjOyMd5r3AeEpxmMHxj/Nf5r9NzY0zgfrGseNiGTZxBo7Gi81bgO'
             + 'CE8ymFgZeRp5mrgA5V2AKj2NrRiMDxunA+EKYzcgBrEOg/SCTMhHNh6L0Anj'
             + 'eUB40NgMiEGsE1j8AwAIfze8d97InQAAAABJRU5ErkJggg=='
    var color_list = [['Red',       'red']
                     ,['Orange',     'orange']
                     ,['Yellow',     'gold']
                     ,['Light Green','#A4C639']
                     ,['Green',      'green']
                     ,['Sky Blue',   'deepskyblue']
                     ,['Blue',       'blue']
                     ,['Purple',     'purple']
                     ,['Pink',       'pink']]

    var style = d.createElement('style')
    style.type = 'text/css'
    style.textContent = '.button .color-label{background-image:url("' + img + '");width:9px;}'
                      + '.button .color-label + span.down-arrow{margin-left:3px}'
                      + '.user-content-medium .user-content-rest{max-width:315px}'
    d.getElementsByTagName('head')[0].appendChild(style)

    var menu_list = d.createElement('ul')
        ,menu_inner = ''
    menu_list.className = 'drop-down'
    menu_list.style.cssText = "visibility:visible;left:auto;right:0;top:0px"
    menu_inner = '<li>&nbsp;&nbsp;<input type="hidden" value="">'
               + '<b class="item-name">Not Set</b></input></li>'
    color_list.map(function(c){
        menu_inner += '<li style="border-left:' + c[1] 
                   + ' solid 8px;padding-left:0">&nbsp;&nbsp;<input type="hidden" value="'
                   +c[1]+'"><b class="item-name" >'
                   +c[0]+'</b></input></li>'
    })
    menu_list.innerHTML += menu_inner
    // color select event
    $a('li',menu_list).map(function(c){
        $e(c,'click',function(e){
            current_list = JSON.parse(MY_getValue(propertyName,'{}'))
            var userid = $x('../../..//div[@data-user-id]', this).getAttribute('data-user-id').trim()
                ,color = $x('input',this).value
            if (color) {
                current_list[userid] = color
            } else {
                delete current_list[userid]
            }
            MY_setValue(propertyName, JSON.stringify(current_list))
            execute()
            return false
        })
    })

    var container = d.createElement('div')
    container.className = 'drop-down-container'
    container.style.zIndex = 'auto'
    container.innerHTML = '<div class="button color-label-button" title="Set Color Label">'
                        + '<span class="color-label"></span><span class="down-arrow"></span></div>'

    $live('//div[contains(@class,"profile-actions")]/div[contains(@class,"buttons")]'
        + '|//div[@class="stream-user-buttons"]', function(e){
        var copy_container = container.cloneNode(true)
            ,button = copy_container.firstChild
        e.insertBefore(copy_container, e.firstChild)
        // button click event
        $e(button, 'click', function() {
            menu_list.style.visibility = 'visible'
            menu_list.style.top = e.className.indexOf('stream-user-buttons') >= 0 ? isFx ? '13px' : '16px' : '0px'
            if (this.parentNode.lastChild !== menu_list) {
                this.parentNode.appendChild(menu_list)
            }
            window.setTimeout(function(){ // workaround for click event does not die.
                $e($x("//html"), 'click', function(e) {
                    this.removeEventListener('click', arguments.callee, false)
                    if (e.target.className.indexOf('color-label-button') < 0
                        && e.target.parentNode.className.indexOf('color-label-button') < 0) { 
                        menu_list.style.visibility = 'hidden'
                    }
                    return false
                })
            },0)
            return false // No effect to disable click event?
        })
        // tipsy tooltip
        tipsy_tooltip(button)
    }, $('page-container'))

})()

execute()

function execute(){

    // remove old labels
    $a('//head/style[@class="color_label"]').map(function(c){c.parentNode.removeChild(c)})
    
    var h = d.getElementsByTagName('head')[0]//$x('//head')
        , color_style = d.createElement('style')
        , css = ''
        , color = ''
        , i = 0
    color_style.type = 'text/css'
    color_style.className = 'color_label'
    h.appendChild(color_style)
    
    for (var userid in current_list) {
        color = current_list[userid]
        css +=  'div.tweet[data-user-id="' + userid + '"]:not(.latest-tweet),'
            + 'div.stream-item-content[data-user-id="' + userid + '"]'
            + '{border-left:5px solid ' + color + '!important;padding-left:15px!important}'
            + 'div.tweet[data-user-id="' + userid + '"] div.tweet-row div.tweet-text a:not(.tweet-timestamp),'
            + 'div.focused-stream-item div.tweet[data-user-id="' + userid + '"] div.tweet-row a:not(.tweet-timestamp),'
            + 'div.details-pane div.tweet[data-user-id="' + userid + '"] div.tweet-row a:not(.tweet-timestamp),'
            + 'div.stream-item:hover div.tweet[data-user-id="' + userid + '"] div.tweet-row a,'
            + 'div.stream-item:hover div.stream-item-content[data-user-id="' + userid + '"] a strong'
            + '{color:' + color + ' !important}'
        
        if (++i > 100) {
            color_style.textContent += css
            css = ''
            i = 0
        }
    }
    color_style.textContent += css

}

function tipsy_tooltip(c) {
    $e(c, 'mouseover', function(){
        if(!tooltip){
            tooltip = d.createElement('div')
            tooltip.className = 'tipsy tipsy-s'
            tooltip.style.position = 'absolute'
            tooltip.style.zIndex = 100000
            tooltip.style.opacity = 0.8
            tooltip.innerHTML = '<div class="tipsy-arrow"></div>'
                              + '<div class="tipsy-inner"><div class="tooltip">'
                              + '<b></b></div></div>'
            tooltip_inner = tooltip.children[1].firstChild.firstChild
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