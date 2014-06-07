// ==UserScript==
// @name        Select-To-Input
// @namespace   andysouter.net/greasemonkey/select-to-input
// @description http://www.reddit.com/r/GreaseMonkey/comments/17kd3b/request_create_additional_option_or_modify/
// @include     *
// @version     1
// @grant       none
// ==/UserScript==

(function(){
    var selects = document.querySelectorAll("select");
    for(var i = 0; i < selects.length; i++){
        selects[i].addEventListener("mousedown", function(ev){
            if(!ev.shiftKey) return;
            var input = document.createElement("input");
            input.name = this.name;
            input.className = this.className;
            input.id = this.id;
            input.value = this.options[this.selectedIndex].value;
            this.parentNode.insertBefore(input, this);
            this.parentNode.removeChild(this);
            setTimeout(function(){
                input.focus();
            }, 0);
        }, false);
    }
})();