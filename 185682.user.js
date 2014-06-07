// ==UserScript==
// @name        vk
// @namespace   vk
// @description preview photos by clicking Ctrl+>, Ctrl+<, Ctrl+^, Ctrl+v
// @include     http://*vk.com/*
// @include     https://*vk.com/*
// @version     1
// @grant       none
// ==/UserScript==

var bSlider = {
    direction   : null,
    delay       : 2000,
    event       : null,
    run         : function(){
        var that = this;
        this.event = setInterval(function(){
            Photoview.show(false, cur.pvIndex + that.direction, null);
        }, that.delay);
    },
    stop        : function(){
        clearInterval(this.event);
        this.event = null;
    },
    accelerate  : function(keyCode){
        this.stop();
        this.delay = (keyCode == 38) 
            ? this.delay/2
            : this.delay*2;
        this.run();
    },
    init        : function(keyCode){
        var newDirection = (keyCode==37) ? -1 : 1;
        if(this.event && (newDirection != this.direction)){
            this.delay = 2000;
            this.stop();
        }else{
            this.direction = newDirection;
            this.run();
        }
    }
}
window.addEventListener("keydown", function(e){
    if(e.ctrlKey && ([37,39].indexOf(e.keyCode)>-1)){
        bSlider.init(e.keyCode);
    }
    if(e.ctrlKey && ([38,40].indexOf(e.keyCode)>-1)){
        bSlider.accelerate(e.keyCode);
    }
})