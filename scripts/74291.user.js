// ==UserScript==
// @name           TwitterFollowingChecker
// @namespace      http://mstssk.blogspot.com/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @exclude        http://twitter.com/followers
// @exclude        https://twitter.com/followers
// @description    Check whether users are following you.
// ==/UserScript==

var d = document
    // Code borrowed and modified from http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/
    //,$ = function(id){return d.getElementById(id)}
    ,$x = function(xp,c){return d.evaluate(xp,c||d,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}
    ,$a = function(xp,c){var r=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),a=[];
                            for(var i=0;i<r.snapshotLength;i++){a.push(r.snapshotItem(i))}return a}
    ,$e = function(e,t,f){if(e)e.addEventListener(t,f,false)}
    ,my_name = $x('//meta[@name="session-user-screen_name"]').content.trim()
    ,tooltip
    ,tooltip_inner;

if(!my_name) return;

$a("//ul[contains(@class,'user-actions')]").map(function(c){
    var li = d.createElement('li'), button = d.createElement('button');
    li.className = 'menu';
    button.className = 'btn';
    button.style.cssText = 'background:transparent;border:0;cursor:default;font-size:14px';
    li.appendChild(button);
    c.insertBefore(li, c.firstChild);
    var user_data = $x("ancestor::*[contains(@class,'user ')]", c)
        ,username = $x("*//*[contains(@class,'screenname')]/a|//*[contains(@class,'screen-name')]",user_data).innerHTML.trim()
        ,bool = (user_data.className.indexOf('direct-messageable') > 0);
    button.innerHTML = bool ? '&#9745;' : '□';
    button.title = username+' is' + (bool ? '' : ' NOT') + ' following you!';
    tipsy_tooltip(button);
});
function tipsy_tooltip(c){
    $e(c, 'mouseover', function(){
        if(!tooltip){
            tooltip = d.createElement('div');
            tooltip.className = 'tipsy tipsy-south';
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = 100000;
            tooltip.innerHTML = '<div class="tipsy-inner">';
            tooltip_inner = tooltip.getElementsByClassName('tipsy-inner')[0];
        }
        tooltip_inner.innerHTML = this.title;
        this.title = '';
        d.body.appendChild(tooltip);
        var box = this.getBoundingClientRect();
        tooltip.style.top = box.top - tooltip.offsetHeight + window.scrollY + 'px';
        tooltip.style.left = box.left + (box.width / 2) 
                           - (tooltip.offsetWidth / 2) + window.scrollX + 'px';
        tooltip.style.visibility = "visible";
        tooltip.style.display = "block";
    });
    $e(c, 'mouseout', function(){
        d.body.removeChild(tooltip);
        this.title = tooltip_inner.innerHTML;
        tooltip_inner.innerHTML = '';
    });
}
