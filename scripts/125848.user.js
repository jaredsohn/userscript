// ==UserScript==
// @id             leproscroll@esreality.com
// @name           leproscroll for esreality.com
// @version        0.25
// @description    leprosorium-like scroll for esreality.com
// @namespace      esreality.com
// @homepage       http://esreality.com
// @include        http://esreality.com/*
// @include        http://*.esreality.com/*
// ==/UserScript==

function runWithMooTools(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
    if (typeof animatePosts != 'undefined') {
      animatePosts.run();
    }
  }, false);
  document.body.appendChild(script);
}

runWithMooTools(function() {
MooTools.More={version:"1.4.0.1",build:"a4244edf2aa97ac8a196fc96082dd35af1abab87"};(function(){Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(c,b){this.element=this.subject=document.id(c);
this.parent(b);if(typeOf(this.element)!="element"){this.element=document.id(this.element.getDocument().body);}if(this.options.wheelStops){var d=this.element,e=this.cancel.pass(false,this);
this.addEvent("start",function(){d.addEvent("mousewheel",e);},true);this.addEvent("complete",function(){d.removeEvent("mousewheel",e);},true);}},set:function(){var b=Array.flatten(arguments);
if(Browser.firefox){b=[Math.round(b[0]),Math.round(b[1])];}this.element.scrollTo(b[0],b[1]);return this;},compute:function(d,c,b){return[0,1].map(function(e){return Fx.compute(d[e],c[e],b);
});},start:function(c,d){if(!this.check(c,d)){return this;}var b=this.element.getScroll();return this.parent([b.x,b.y],[c,d]);},calculateScroll:function(g,f){var d=this.element,b=d.getScrollSize(),h=d.getScroll(),j=d.getSize(),c=this.options.offset,i={x:g,y:f};
for(var e in i){if(!i[e]&&i[e]!==0){i[e]=h[e];}if(typeOf(i[e])!="number"){i[e]=b[e]-j[e];}i[e]+=c[e];}return[i.x,i.y];},toTop:function(){return this.start.apply(this,this.calculateScroll(false,0));
},toLeft:function(){return this.start.apply(this,this.calculateScroll(0,false));},toRight:function(){return this.start.apply(this,this.calculateScroll("right",false));
},toBottom:function(){return this.start.apply(this,this.calculateScroll(false,"bottom"));},toElement:function(d,e){e=e?Array.from(e):["x","y"];var c=a(this.element)?{x:0,y:0}:this.element.getScroll();
var b=Object.map(document.id(d).getPosition(this.element),function(g,f){return e.contains(f)?g+c[f]:false;});return this.start.apply(this,this.calculateScroll(b.x,b.y));
},toElementEdge:function(d,g,e){g=g?Array.from(g):["x","y"];d=document.id(d);var i={},f=d.getPosition(this.element),j=d.getSize(),h=this.element.getScroll(),b=this.element.getSize(),c={x:f.x+j.x,y:f.y+j.y};
["x","y"].each(function(k){if(g.contains(k)){if(c[k]>h[k]+b[k]){i[k]=c[k]-b[k];}if(f[k]<h[k]){i[k]=f[k];}}if(i[k]==null){i[k]=h[k];}if(e&&e[k]){i[k]=i[k]+e[k];
}},this);if(i.x!=h.x||i.y!=h.y){this.start(i.x,i.y);}return this;},toElementCenter:function(e,f,h){f=f?Array.from(f):["x","y"];e=document.id(e);var i={},c=e.getPosition(this.element),d=e.getSize(),b=this.element.getScroll(),g=this.element.getSize();
["x","y"].each(function(j){if(f.contains(j)){i[j]=c[j]-(g[j]-d[j])/2;}if(i[j]==null){i[j]=b[j];}if(h&&h[j]){i[j]=i[j]+h[j];}},this);if(i.x!=b.x||i.y!=b.y){this.start(i.x,i.y);
}return this;}});Fx.Scroll.implement({scrollToCenter:function(){return this.toElementCenter.apply(this,arguments);},scrollIntoView:function(){return this.toElementEdge.apply(this,arguments);
}});function a(b){return(/^(?:body|html)$/i).test(b.tagName);}})();

// leprosorium.ru scroll script
animatePosts = { 
	animation : null,
	posts : false,
	loaded : false,
	run : function () {
		if ($$('.post, .comment').length > 1) {
			animatePosts.addEventListeners();
		}
	},
	// waiting for ctrl + up, down keypress
	addEventListeners : function () {
		animatePosts.animation = new Fx.Scroll(window);
		document.addEvent('keyup', function (event) {
			e = new Event(event);
			if ((e.key == 'up' || e.key == 'down') && e.control) {
				if (Browser.Engine.presto && !e.shift) {
					return false;
				}
				e.preventDefault();
				animatePosts.posts = animatePosts.getPostsPositions();
				var nearestPost = animatePosts.getNearestPost(animatePosts.posts, e);
				if (nearestPost) {
					animatePosts.animation.start(document.getScroll().x, nearestPost.getPosition().y);
				}
			}
		});
		document.addEvent('keydown', function (event) {
			e = new Event(event);
			if ((e.key == 'up' || e.key == 'down') && e.control) {
				e.preventDefault();
			}
		});
	},
	
	getPostsPositions : function () {
		var allPosts = $$('.post');
		allPosts = allPosts.concat($$('.commentboxnew').getParent());
		if (allPosts.length == 1) {
			allPosts = $$('.post, .comment');
		}
		for(var i = 0; i < allPosts.length; i++) {
			allPosts[i].pos = allPosts[i].getPosition().y;
		}
		return allPosts;
	},
	
	getNearestPost : function (allPosts, e) {
		var myPosition = document.getScroll().y;
		for (var i = 0; i < allPosts.length; i++) {
			// searching the nearest post on the screen
			if (myPosition < allPosts[i].pos) {
				// if we clicked down we go to that post else we go the previous if it exists
				return (e.key == 'down' ) ? allPosts[i] : ((i == 0) ? false : allPosts[i-1]);
			// and if we are AT any post now
			} else if (myPosition == allPosts[i].pos) {
				// we go to the next or previous if they exist
				return (e.key == 'down' ) ? ((i == allPosts.length - 1) ? false : allPosts[i+1]) : ((i == 0) ? false : allPosts[i-1]);
			}
		}
		// but if all posts are higher we have to go to the last post if we clicked "up"
		return (e.key == 'up') ? allPosts[allPosts.length-1] : false;
	},
	
	scrollTo : function (nearestPost) {
		animatePosts.animation.toElement(nearestPost);
	}
};
if (animatePosts.animation == null) {
  animatePosts.run();
}
}); // runWithMooTools