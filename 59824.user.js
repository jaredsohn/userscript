// ==UserScript==
// @name           myAdmin
// @namespace      myAdmin
// @description    myAdmin for begom.com
// @include        http://*.begom.com/*
// ==/UserScript==

(function(){

    var myAdmin = {
	config: {
	    stylesheet : '.myAdminMenu { position: absolute; top: 10px; right: 15px; display: none;}' +
			  '.myAdminMenuButtonMove { position: absolute; top: 0px; right: 0px; height: 25px; width: 25px; background-color: green; overflow: hidden;}' +
			  '.myAdminMenuButtonNowMove { background-color: lightgreen;}' +
			  '.myAdminMenuButtonEdit { position: absolute; top: 0px; right: 30px; height: 25px; width: 25px; background-color: yellow; overflow: hidden;}' +
			  '.myAdminMenuButtonNowEdit { background-color: lightyellow;}' +
			  '.myAdminEditor { z-index: 1000; position: fixed; left: 200px; right: 200px; top:100px; bottom: 100px; border: 1px solid black; padding: 10px; background-color: white; allign: center; text-allign: middle; display: none;}' +
			  '.myAdminEditor textarea { height: 80%; width: 100%;}',
	    trClass : '.p0'
	},

	nowMove: false,
	movedLayer: false,
	selfHover: false,

	init: function () {
	    var self = this;
	    addGlobalStyle(self.config.stylesheet);
	    self.setMovable('.menu');
	    self.setEditable('.content');
	    self.setEditable('.menu');
	   	    
	},

	appendMenu: function (el) {
	    
	    var self = this;
	    
	    if(el && !el[0].jMenu) {
		el[0].jMenu = $('<div></div>').addClass('myAdminMenu')
		    			    .appendTo(el);
		el.hover(function() {
		    if(!self.nowMove) {
			el[0].jMenu.show();
		    }
		    return true;
		}, function () {
		    if(!self.nowMove) {
			el[0].jMenu.hide();
		    }
		    return true;
		});
		
	    }
	},

	openEditor: function (el) {
	    var self = this;
	    self.jEditor = (self.jEditor || $('<div />').addClass('myAdminEditor')
							.append($('<textarea />'))
							.append($('<input type="button" value="Сохранить" />').click(function() {self.closeEditor();}))
							.append($('<input type="button" value="Отменить"/>').click(function() {self.closeEditor();}))
							.prependTo($('body'))).show();


	    self.jEditor.children('textarea').val(el.html());
	    
	},

	closeEditor: function () {
	    var self=this;
	    self.jEditor.hide();
	    self.nowEdit = false;
	},

	setEditable: function (className) {
	    var self = this;
	    $(className).each(function () {		
		var node = this;
		var el = $(this);
		if(!this.jMenu) self.appendMenu(el);
		this.jMenuButtonEdit = $('<div>&nbsp;</div>').addClass('myAdminMenuButtonEdit')
							    .click(function() {
								self.nowEdit = !self.nowEdit;
								if(self.nowEdit) {
								    self.openEditor(el);
								} else {
								    self.closeEditor();
								}
								return false;
							    }).appendTo(this.jMenu);
	    });

	},

	setMovable: function (className) {
	    var self = this;
	    console.log(className);
	    $(className).each(function () {
		var node = this;
		var el = $(this);
		if(!this.jMenu) self.appendMenu(el);
		
		this.jMenuButtonMove = $('<div>&nbsp;</div>').addClass('myAdminMenuButtonMove')
						    .click(function() {
	
							self.nowMove = !self.nowMove;
							if(self.nowMove) $(this).addClass('myAdminMenuButtonNowMove');
							else $(this).removeClass('myAdminMenuButtonNowMove');
							self.movedLayer = el;
							return false;
						    }).appendTo(this.jMenu);
		
		el.hover(function (ev) {
		    
		    return true;
		}, function() {
		    
		    return true;
		}).click(function () {		    
		    if(self.nowMove) {
			node.jMenuButtonMove.click();
		    }
		}).mousemove(function (ev) {
		    if(self.nowMove && self.movedLayer != el) {
			var offset = $(this).offset();
			var height = this.offsetHeight;
			if(ev.pageY > (offset.top + height/2)) {
			    $(this).after(self.movedLayer);
			} else {
			   $(this).before(self.movedLayer);
			}
		    }
		});

	    });

	    $(self.config.trClass).hover(function () {
		if(self.nowMove) {
		    $(this).children('div').prepend(self.movedLayer);
		}
		return true;
	    }, function () {
		return true;
	    });
	    
	   
	}
    };

    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }


    GM_xmlhttpRequest({
	method: "GET",
	url: "http://jqueryjs.googlecode.com/files/jquery-1.2.6.pack.js",
	onload: run
    });

    function run(details) {

       if (details.status != 200) {
	   GM_log("no jQuery found!");
	   return;
       }

       eval(details.responseText);
       var $ = jQuery;
       
       myAdmin.init();

    }

})();