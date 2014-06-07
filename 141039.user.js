// ==UserScript==
// @name       Weblio Utility
// @namespace  https://twitter.com/ruby_U
// @version    0.9
// @description  It provides you with more usability as electronic dictionary.
// @include      http://ejje.weblio.jp/*
// ==/UserScript==

//It clears the search form and plays the word's voice when started. 
//It adds shortcuts; SHIFT to focus and clear the search box, TAB to play the sound.

function Form(elem) {
    this.element = elem;
}
Form.prototype.exists = function() {
    return !!this.element;
};
Form.prototype.clear = function() {
    this.element.value = "";
};
Form.prototype.focus = function() {
    this.element.focus();
};
Form.prototype.isFocus = function() {
    return document.activeElement == this;
};
var form = new Form(document.getElementById("combo_txt"));

function Sound(elem) {
    this.element = elem;
}
Sound.prototype.exists = function() {
    return !!this.element;
};
Sound.prototype.play = function() {
    this.element.click();
};
var sound = new Sound(document.getElementById("ePsdDl"));

function capture(e) {
    if (e.keyCode == 9) { //tab
        if (sound.exists()) {
            sound.play();
        }
        e.preventDefault();
    } else if (e.keyCode == 16) { //shift
        if (form.exists() && !form.isFocus()) {
            form.focus();
            form.clear();
        }
        e.preventDefault();
    }
}
document.onkeydown = capture;

if (form.exists()) {
    form.clear();
}
if (sound.exists()) {
    sound.play();
}
