// ==UserScript==
// @namespace     http://sakinijino.blogbus.com
// @name          Douban Posters Wall
// @description
// @include http://www.douban.com/subject/*/
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
    var jQuery = unsafeWindow.jQuery;
    var $ = jQuery
}

Subjects = {}

var Subject = function(params){
    $.extend(this, params);
    this.friends = null;
    var _this =this;
    this.img = $("<img src='"+this.image_src+"' title='"+this.title+"\n ...... ("+decodeURI('%E5%8F%8C%E5%87%BB%E8%BF%9B%E5%85%A5')+")"+"' id='"+this.id+"' style='position:absolute; margin:0px; padding:5px; cursor:pointer'>")
    this.img.appendTo($('body'))
    this.zIndex = '';
    this.img.css('opacity', 0.3);
    this.left = Math.floor((Math.random()*d_width))+30
    this.img.css('left', this.left)
    this.top = Math.floor((Math.random()*d_height))+10
    this.img.css('top', this.top)
    this.isLarge = false;
    this.isFixedLarge = false;
    this.img.mouseover(function(){_this.setLarge();this.style.zIndex=20;})
    this.img.mouseout(function(){_this.setSmall();this.style.zIndex=_this.zIndex;})
    this.img.dblclick(function(){window.open(_this.url)})
    this.img.click(function(){
        if (Subjects[_this.id].getFriends()==null) _this.getFriendsRemote(function(){_this.focus()});
        else _this.focus();
        return false;
    })
    Subjects[this.id] = this;
}


Subject.prototype.setLarge = function(){
    if (this.isLarge) return;
    if (this.img[0].naturalWidth == null && (this.img[0].width<50 || this.img[0].height<50)) {
        this.img.css('opacity', 1);
        this.isLarge = true;
        return;
    }
    this._getImgNaturalSize()
    this.isLarge = true;
    this.img.animate({
        width: this.img[0].naturalWidth,
        height: this.img[0].naturalHeight,
        opacity: 1
    }, 300);
}

Subject.prototype.setSmall = function(){
    if (!this.isLarge || this.isFixedLarge) return;
    if (this.img[0].naturalWidth == null && (this.img[0].width<50 || this.img[0].height<50)) {
        this.img.css('opacity', 0.3);
        this.isLarge = false;
        return;
    }
    this._getImgNaturalSize()
    this.isLarge = false;
    this.img.animate({
        width: this.img[0].naturalWidth/2,
        height: this.img[0].naturalHeight/2,
        opacity: 0.3
    }, 300)
}

Subject.prototype.getFriends = function(callback){
    return this.friends;
}

Subject.prototype.getFriendsRemote = function(callback){
    if (this.friends != null) return;
    var _this = this;
    $.get(this.url, function(res){
        var tmp = $("<div></div>").append(res.replace(/<script(.|\s)*?\/script>/g, ""));
        var ss = tmp.find("div.obss dl.obs");
        var summary = $(tmp.find("div.indent")[1]).text().replace('<br>', '\n').substring(0, 500) + " ...... ("+decodeURI('%E5%8F%8C%E5%87%BB%E8%BF%9B%E5%85%A5')+")";
        _this.img.attr("title", _this.title+'\n'+summary)
        _this.friends = $.map(ss, function(s){
            s = $(s)
            var link =s.find('dd a');
            var url = link.attr('href');
            var id = url.match('[0-9]+')[0];
            if (Subjects[id] != null) return Subjects[id];
            var title = link.attr('title');
            var image_src = s.find('dt a img').attr('src');
            return new Subject({id:id, title:title, image_src:image_src, url: url});
        })
        if ($.isFunction(callback)) callback(_this.friends)
    })
}

Subject.prototype.focus = function(){
    if (Subject.focuseduser != null) Subject.focuseduser.unfocus()
    Subject.focuseduser = this;
    this.img.css('background-color', 'rgb(230, 251, 224)')
    this.zIndex = 15
    this.img.css('z-index', this.zIndex)
    this.isFixedLarge = true;
    this.setLarge();
    $.each(this.friends, function(i, f){
        f.focusAsFriend()
    })
}

Subject.prototype.focusAsFriend = function(){
    this.img.css('background-color', 'rgb(255, 246, 238)')
    this.zIndex = 10
    this.img.css('z-index', this.zIndex)
    this.isFixedLarge = true;
    this.setLarge();
}

Subject.prototype.unfocus = function(){
    this.img.css('background-color', 'transparent')
    this.zIndex = ''
    this.img.css('z-index', this.zIndex)
    this.isFixedLarge = false;
    this.setSmall();
    $.each(this.friends, function(i, f){
        f.unfocusAsFriend();
    })
}

Subject.prototype.unfocusAsFriend = function(){
    this.isFixedLarge = false;
    this.setSmall();
    this.img.css('background-color', 'transparent')
    this.zIndex = ''
    this.img.css('z-index', this.zIndex)
}

Subject.prototype._getImgNaturalSize = function(){
    if (!$.browser.mozilla) {
        if (this.img[0].naturalWidth == null) this.img[0].naturalWidth = this.img[0].width-10
        if (this.img[0].naturalHeight == null) this.img[0].naturalHeight = this.img[0].height-10
    }
}

$(document).click(function(){
    if (Subject.focuseduser != null) Subject.focuseduser.unfocus()
})


$("#in_tablem div.indent div.fil a:first").click(function(){
    var id = window.location.pathname.match('[0-9]+')[0];
    var title = $("form h1").text();
    var image_src = $("div.indent div.fil a img").attr('src').replace('lobelia.douban.com/mpic', 'otho.douban.com/spic')
    var url = window.location.pathname

    $("body").html("");

    d_width = ($.browser.msie ? document.documentElement.clientWidth : window.innerWidth) - 130
    d_height = ($.browser.msie ? document.documentElement.clientHeight : window.innerHeight) - 110

    new Subject({id:id, title:title, image_src:image_src, url: url});
    return false;
})