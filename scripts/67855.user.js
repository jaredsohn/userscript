// ==UserScript==
// @name        TwitterColorLabel
// @namespace   http://mstssk.blogspot.com/
// @include     *://twitter.com/*
// @description Coloring tweets like twicca.(http://lab.r246.jp/twicca/) 
// @version     1.2.9
// @build       14
// ==/UserScript==

const propertyName = 'list'
    ,ns = 'http://mstssk.blogspot.com//TwitterColorLabel.'; // localStorage namespace
var isFx = GM_getValue('dummy',1) // GM_getValue does not return 2nd argument in GoogleChrome.
    ,MY_getValue = isFx ? GM_getValue : (function(key,defaultValue){
                            var value=localStorage.getItem(ns+key);return value!==undefined?value:defaultValue})
    ,MY_setValue = isFx ? GM_setValue : (function(key,value){localStorage.setItem(ns+key,value)})
    ,d = document
    ,current_list = JSON.parse(MY_getValue(propertyName,'{}'))
    // Code borrowed and modified from http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/ 
    //,$ = function(id){return d.getElementById(id)}
    ,$x = function(xp,c){return d.evaluate(xp,c||d,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}
    ,$a = function(xp,c){var r=d.evaluate(xp,c||d,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),a=[];
                            for(var i=0;i<r.snapshotLength;i++){a.push(r.snapshotItem(i))}return a}
    ,$e = function(e,t,f){if(e)e.addEventListener(t,f,false)}
    ,$addClass = function(e,c){if(!e.className.match(new RegExp("(?:^|\\s)"+c+"(?:$|\\s)")))e.className+=" "+c}
    ,$removeClass = function(e,c){e.className=e.className.replace(new RegExp("(?:^|\\s)"+c+"(?:$|\\s)")," ")}
    ,body = d.body
    ,tooltip
    ,tooltip_inner;

execute();
setMenu();

function setMenu(){
    if(!body.id.match(/profile|follow|users|lists_/))return;
    
    var base_style = d.createElement('style');
    base_style.type = "text/css";
    base_style.textContent = 'td.user-actions-outer{padding-left:0!important;width:140px!important}';
    d.getElementsByTagName('head')[0].appendChild(base_style);
   
    var color_list = [["Blue",     "blue"]
                      ,["Green",    "green"]
                      ,["Sky Blue", "deepskyblue"]
                      ,["Purple",   "purple"]
                      ,["Red",      "red"]
                      ,["Yellow",   "gold"]];

    var menu_list = d.createElement('ul');
    menu_list.className = "round";
    menu_list.style.cssText = "display:block";
    menu_list.innerHTML = '<li>&nbsp;&nbsp;<input type="hidden" value="">'
                        + '<label style="border-left:gray solid 8px;">Not Set</label></input></li>';
    color_list.map(function(c){
        menu_list.innerHTML += '<li>&nbsp;&nbsp;<input type="hidden" value="'
                            +c[1]+'"><label style="border-left:'+c[1]+' solid 8px;">'
                            +c[0]+'</label></input></li>';
    });
    
    // color select event
    $a('li',menu_list).map(function(c){
        $e(c,'click',function(e){
            var username = $x("ancestor::tr[contains(@class,'user')]//*[contains(@class,'screenname')]/a"
                            + "|//*[contains(@class,'screen-name')]",this).innerHTML.trim()
                ,color = $x('input',this).value;
            current_list = JSON.parse(MY_getValue(propertyName,'{}'))
            if(color){
                current_list[username] = color;
            }else{
                delete current_list[username];
            }
            MY_setValue(propertyName, JSON.stringify(current_list));
            execute();
            return false;
        });
    });

    var li = d.createElement('li');
    li.className = 'color-label-menu menu';
    li.innerHTML = '<button class="btn" title="Set Color Label" style="padding:4px 6px 5px;margin-right:3px">田'
                 + '<i style="display:block;float:right;height:5px;width:7px;margin:4px 0 0 3px;'
                 + 'background-position:-47px -67px;background-image:'
                 + 'url(http://s.twimg.com/a/1263323195/images/sprite-icons.png);'
                 + 'background-repeat:no-repeat;"></i></button>';

    $a("//ul[contains(@class,'user-actions')]//li[contains(@class,'list-menu')]").map(function(c){
        c.parentNode.insertBefore(li.cloneNode(true), c);
    });
    
    $a("//li[contains(@class,'color-label-menu')]/button[contains(@class,'btn')]").map(function(c){
        // button click event
        $e(c, 'click', function(e){
            $addClass(this,'clicked');
            this.parentNode.insertBefore(menu_list, this.nextSibling);
            var clicked_menu = this;
            window.setTimeout(function(){ // workaround for click event does not die.
                $e($x("//html"),'click',function(e){
                    this.removeEventListener('click',arguments.callee,false);
                    $removeClass(clicked_menu,'clicked');
                    clicked_menu.parentNode.removeChild(clicked_menu.nextSibling);
                    return false;
                });
            },0);
            return false; // No effect to disable click event?
        });
        // tipsy tooltip
        tipsy_tooltip(c);
    });
}
function execute(){
    if(!body.className.match(/follow|timeline|favourings|account|search|lists/))return;
    
    $a("//head/style[@class='color_label']").map(function(c){c.parentNode.removeChild(c)});    
    var h = d.getElementsByTagName('head')[0], base_style = d.createElement('style')
            , color_style = d.createElement('style'), css = '', color = '', i = 0;
    base_style.type = color_style.type = "text/css";
    base_style.className = color_style.className = 'color_label';
    h.appendChild(base_style);
    h.appendChild(color_style);
    if(body.className.match(/follow|lists_/)){
        // follow(ers|ing) page
        base_style.textContent = '#content td.thumb{padding-left:5px!important;}'
                               + '#content td > a{padding-left:5px!important;display:inline-block;}';
        for (var username in current_list) {
            color = current_list[username];
            css += '#content td a[href$="'+username+'"]{color:'+color+'!important}#content td > a[href$="'
                    +username+'"]{border-left:solid 5px;padding-left:0px!important}';
            if(++i > 100){
                color_style.textContent += css;
                css = '';
                i = 0;
            }
        }
    }else{
        // timeline page
        base_style.textContent = 'body:not([id^="list"]):not(#users) #content div.section{padding-left:5px!important}'
                               + 'body.lists #timeline{padding-left:7px}span.meta a{color:#999999!important}'
                               + 'li.status{margin-left:5px!important}#timeline_heading{padding-left:5px}';
        for (var username in current_list) {
            color = current_list[username];
            css += 'li.u-'+username+'{border-left:'+color+' solid 5px;margin-left:0!important}li.u-'
                    +username+' a{color:'+color+'}';
            if(++i > 100){
                color_style.textContent += css;
                css = '';
                i = 0;
            }
        }
    }
    color_style.textContent += css;
}
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
