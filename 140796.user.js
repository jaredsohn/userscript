// ==UserScript==
// @name         Google Reader Mouseover Panels
// @namespace    http://userscripts.org/users/cytochrome
// @version      0.1.1
// @description  Toggle visibility of panels by mouseover. (tested on google chrome)
// @match      http://www.google.com/reader/view/*
// @match      https://www.google.com/reader/view/*
// @copyright  2012+, Cytochrome
// ==/UserScript==


(function(){
    var $, $$;
    var config = {
        sensor: { // condition to show
            top:  function(e){ return (e.clientY < 16); },
            left: function(e){ return (e.clientX < 4); }
        },
        get_menu_nodes: function(){
            return ([
                $("#gb"),
                $("#viewer-header"),
                $("#viewer-header-container")
//                ,document.createElement("div")
            ]);
        }
    };
    
    var toArray = function(e){ return Array.prototype.slice.apply(e);};

    var isString = function(x){ return x && x.constructor === String; };
    $ = function(x){
        return ( ( isString(x) && document.querySelector(x) ) ||
                 ( isNode(x) && x ) ||
                null );
    };
    $$ = function(x){
        if( isString(x) ){
            return toArray(document.querySelectorAll(x));
        } 
        var xx = $(x);
        return (xx && [xx]) || [];
    };
    function isNode(e){ return ( e && e.nodeName && e.nodeName.charAt(0) != "#" ); }
    function getNodeMover(f){
        return (function(){
            var es  = toArray(arguments).map($);
            var dst = ( es.length && es.pop() );
            ( dst && es.filter(isNode).forEach(function(x){f(dst,x);}) );
            return dst || null;
        });
    }
    var moveToLast  = getNodeMover(function(d,s){d.appendChild(s);});
    var moveToFirst = getNodeMover(function(d,s){
        var parent  = s.parentNode || document.body;
        if( d.hasChildNodes() ){ parent.insertBefore(s,d.firstChild); }
        else{ moveToLast(d,s);}
    });

    var nodes = {
        top:  moveToLast.apply(this,config.get_menu_nodes()),
        left: $("#nav"), // document.createElement("div"),
        content:   $("#chrome-viewer-container")
    };
        
    var getDocRect = function(){
        var d = document;
        var rect_  = function(w,h){
            return {height:parseInt(h),width:parseInt(w)};
        };
        
        if ( ! ( "height" in d ) ){
        	d = "documentElement" in d ?
        		d.documentElement:
        		d.body;
        	
        	if( ! d.clientHeight && !d.clientWidth ){
	        	d = window.getComputedStyle(d.body, null);
	        }
			else {
		        return rect_(d.clientWidth,d.clientHeight);
		    }
        }
        return rect_(d.width,d.height);

    };
    
   
	var getScreenPos = function(e){
			var d = document.documentElement;
			var r = e.getBoundingClientRect();	    
			return {left:r.left - d.clientLeft, top:r.top - d.clientTop};
	}
  

    function hide(e){ e.style.display="none";  }
    function show(e){ e.style.display="block"; }

	var getViewerPadding = (function(ar){
		var vH = ["#chrome-viewer-container","#chrome-viewer"]
		          .map($).map(function(e){return "clientHeight" in e ? e.clientHeight:0;});
		return (vH[0] - vH[1]);
	});
	
    var on_resize = function(){
        var r = getDocRect();
        var w = r.width  + "px";
        var h = r.height + "px";
        var gN = function(e){ return nodes[e]; };

        [ "content", "left" ].map(gN).map(function(e){
            e.style.height = h;
            return e;
        });
        
        [ "left", "top", "content" ].map(gN).map(function(e){
            e.style.top      = "0px";
            e.style.left     = "0px";
            return e;
        }).slice(1).forEach(function(e){
            e.style.width = w;
        });
        
       	// dirtyfix
       	var s = $("div#scrollable-sections");
       	var sr = getScreenPos(s);
       	s.style.height = r.height - sr.top - getViewerPadding() + "px";
        return true;
    };

    var shown = {
        top:  false,
        left: false
    };
    
    var firstMove = true;
    var on_mousemove = function(e){
        // return if any floating element has already shown.
        for( var nd in config.sensor ){
            if( shown[nd] ){ return true; }
        }
        for( var nd in config.sensor ){
            if( nd in nodes && config.sensor[nd](e) ){
                show(nodes[nd]);
                on_resize();
                return shown[nd] = true;
            }
        }
        return true;
    };

    var getMouseOut = function(e){
        if( !(e in nodes) ){ return function(){}; }
        return (function(){
            if(shown[e]){ hide(nodes[e]); shown[e] = false; }
        });
    };
    
    var bgColor = ( document.body.style.backgroundColor || "#ffffff" );
	
	// dirtyfix
    (function(e){
    	e.style.backgroundColor = bgColor;
    	e.style.zIndex          = 3000;
   	})( $("#viewer-header") );
   	

    ["content","top","left"]
    .map(function(e){
        var n = nodes[e];
        n.style.position = "fixed";
        n.style.top      = "0px";
        n.style.left     = "0px";
    	n.style.backgroundColor = bgColor;
        return e;
    }).slice(1).forEach(function(e){
        var n = nodes[e];
        hide(n);
        $("#chrome").addEventListener("mouseover",getMouseOut(e),false);
        document.body.appendChild(n);
        hide(n);
    });
    window.addEventListener("resize",on_resize,true);
    $("#chrome").addEventListener("mouseover",on_resize,false);
    document.body.addEventListener("mousemove",on_mousemove,true);
    on_resize();
    window.addEventListener("load",on_resize,true);
})();