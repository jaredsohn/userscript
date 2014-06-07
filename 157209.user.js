// ==UserScript==

// @name Async post loader for Habr
// @description

// @include http://habrahabr.ru*posts*

// @grant none

// ==/UserScript==

 

console.log('Async post loader for Habr');

 

/*global */

 

;(function(){

 

var isLoadInProgress = false;

 

function Habr_loader(){

this.navBar = this._extractNavBar($(document));

this.content = this._extractContent($(document));

 

this._initListeners();

}

 

Habr_loader.prototype._initListeners = function() {

 

var self = this;

var targetHref;

 

// intercept clicks from navigation bar

$(document).click(function(event){	

var target = $(event.target);

 

var link = $('a', self.navBar);

if (link.is(target)){

if (!isLoadInProgress){

targetHref = target.attr('href');

self._loadPage(targetHref);

}

event.preventDefault();

}

});

 

$(window).keypress(function(event){

if (event.altKey){

if (event.keyCode === 37){

console.log('Left pressed');

}	

if (event.keyCode === 39){

console.log('Right pressed');

}	

 

}

});

};

 

Habr_loader.prototype._loadPage = function(href) {

var self = this;

if (href){

isLoadInProgress = true;

self._disable();

$.get(href, function(page){	

//setTimeout(function () {

page = $(page);	

self._updateNavBar(page);	

self._updateContent(page);

isLoadInProgress = false;

self._enable();

//},5000);

});

}

};

 

Habr_loader.prototype._updateContent = function(page) {

var content = this._extractContent(page);

this.content.replaceWith(content);

this.content = content;

};

 

Habr_loader.prototype._updateNavBar = function(page) {

var navBar = this._extractNavBar(page);

 

this.navBar.replaceWith(navBar);

this.navBar = navBar;

};

 

Habr_loader.prototype._extractContent = function(page) {

var content = $('.posts.shortcuts_items', page);	

return content;

};

 

Habr_loader.prototype._extractNavBar = function(page) {

var navBar = $('.page-nav', page);

 

return navBar;

};

 

Habr_loader.prototype._enable = function() {

this.navBar.fadeTo('1000', 1);

this.content.fadeTo('1000', 1);

};

 

Habr_loader.prototype._disable = function() {

this.navBar.fadeTo('500', 0.3);

this.content.fadeTo('500', 0.3);

};	

 

 

function initModule(){

window.habr_loader = new Habr_loader();

}

 

$(initModule);

 

})();