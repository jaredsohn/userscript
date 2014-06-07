// ==UserScript==
// @name          Google Reader Wheel Flip
// @author        Cytochrome
// @version       0.1.3
// @description   Attach to wheel scroll to flip articles. it works only when the pointer is in specific region.
// @description   (default usage: move pointer to empty space at the bottom of the page, and wheel up or down.)
// @description   if the script doesnt work, please try to change "options" in this scipt.
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       https://google.com/reader/*
// @include       http://google.com/reader/*
// @include       https://www.google.co.jp/reader/*
// @include       http://www.google.co.jp/reader/*
// ==/UserScript==


/**
 change log
 0.1.3: change panel background color.
 0.1.2: fix button and mouseweel event for Google Chrome and the others.
 0.1.1: set default method to Button
 0.1.0: init.
**/ 

(function(){
    var $, $$;

    /******************************************************
        options
    ******************************************************/
    var options = {
        //  panel (as scroll region)
        wheelPanel : {
            // panel layout. specify where the panel is shown.
            //   dir -> bottom | top | left | right 
            dir: "bottom",

            // panel size by pixel. direction depends on dir.
            //   1 < width
            width: 13,

            // style object for panel
            style: {
                color:"#000000", 
                fontSize:"8px"
            }
        },

        // method to send flip-signal.
        // try Key if the "Button" doesnt work.
        //   method -> Key | Button
        method: "Button",

        // scroll with Alt-key or not.
        //   with_alt_key -> true | false
        with_alt_key: false,

        // onChange -> function ( panel-element, new-state )
        onChange: function(p,n){
            // show symbol while it works
            p.innerHTML = n ? "<b>[w]</b>" : "";
            p.style.backgroundColor = n ? "#aaaaaa":"#ffffff";
        }
    };

    /*****************************************************/


    function objectOverride(src,dest){
        for( var i in src ){
            dest[i] = src[i];
        }
        return dest;
    }

    /* same to above function but with shallow copy */
    function newOverride(src,dest){
        var oo = objectOverride;
        return oo(src,oo(dest,{}));
    }

    /* size of client-region */
    function getDocRect(){
        var d = document;
        function rect_(w,h){
            return ({
                height: parseInt(h),
                width:  parseInt(w)  });
        }
        
        if ( ! ( "height" in d ) ){
        	d = "documentElement" in d ?
        		d.documentElement:
        		d.body;
        	
        	if( d.clientHeight || d.clientWidth ){
		        return rect_(d.clientWidth,d.clientHeight);
	        }

	       	d = window.getComputedStyle(d.body, null);
        }
        return rect_(d.width,d.height);
    }
    
    /* calculate default bottom empty space in GoogleReader. */
	function getViewerPadding(){
		var vH = ["#chrome-viewer-container","#chrome-viewer"]
		          .map($).map(function(e){return "clientHeight" in e ? e.clientHeight:0;});
		return (vH[0] - vH[1]);
	}


    /* create resizer for panel.
     * because of i try to use closure as possible as I can,
     * it is dirty and long. */
    function getWheelPanelResizer(b,cf){
        var OO = objectOverride;
        var W="width", H="height", S="style";
        var dirMap = {
            left:   { dir:W, fit:["left","top"]    },
            right:  { dir:W, fit:["right","top"]   },
            top:    { dir:H, fit:["left","top"]    },
            bottom: { dir:H, fit:["left","bottom"] }
        };

        var nDir = ( cf.dir in dirMap ) ?
            cf.dir: "bottom";

        var tmpl = dirMap[nDir];

        var sDir = tmpl.dir;

        var stObj = OO(cf.style,{
            position:"fixed",
            zIndex: "3000"
        });

        var ptObj = {};
        var szObj = {};

        tmpl.fit.forEach(function(e){
            ptObj[e] = "0px";
        });

        function getDefSetter(obj){
            return (function(r){
                var oobj = OO(obj,OO(r,{}));
                OO(oobj,b.style);
            });
        }

        var setSizeDefault     = getDefSetter(szObj);
        var setStyleDefault    = getDefSetter(stObj);
        var setPositionDefault = getDefSetter(ptObj);

        var setSize     = setSizeDefault;
        var setStyle    = setStyleDefault;
        var setPosition = setPositionDefault;

        if( "width" in cf ){
            szObj[sDir] = cf.width + "px";
        } else {
            setSize = function(r){
                var oobj = OO(r,{});
                oobj[sDir] = getViewerPadding();
                setSizeDefault(oobj);
            };
        }

        return (function(){
            var r = getDocRect();
            ["width","height"].forEach(function(e){
                r[e] = r[e]+"px";
            });
            setStyle({});
            setSize(r);
            setPosition({});
        });
    }

    function getWheelToggler(onC){
        var bEnabled = false;
        var obj = {};
        [["enable",true],["disable",false]]
        .forEach(function(e){
            obj[e[0]] = function(){
                onC(e[1]);
                bEnabled = e[1];
            };
        });
        obj.enabled = function(){ return bEnabled; };
        return obj;
    }

    function getWheelScrollReceiver(cf,eS){
        var alt  = cf.with_altkey;
        var send = eS[cf.method];
        return function(ev) {
            ev = ev || window.event;
            var detail = "wheelDelta" in ev ? -ev.wheelDelta : ev.detail;
            if( detail && ( !alt || ev.altKey ) ) {
                send( detail > 0);
                ev.preventDefault || ev.preventDefault();
            }
            return false;
        };
    }

    function createWheelPanel(cf,eS,onc){
        var b  = document.createElement("div");
        var wt = getWheelToggler(onc);
        var ws = (function(en){
            var onWS = getWheelScrollReceiver(cf,eS);
            return function(e){ ;en() && onWS(e); }
        })(wt.enabled); 
        
        var wsEvent = ("onmozfullscreenchange" in document) ?
            "DOMMouseScroll" : "mousewheel";

        [ [b,"mouseover",wt.enable,  true],
          [b,"mouseout" ,wt.disable, true],
          [b,wsEvent, ws, true] ]
        .forEach(function(e){
            e[0].addEventListener(e[1],e[2],e[3]);
        });
        return b;
    }

    function _main(cf){
        cf.method = (function _DefaultMethod(m){
            return (["Key","Button"].some(function(e){
                return m==e;
            }))?m:"Key";
        })(cf.method);

        if( !( "onChange" in cf && typeof(cf.onChange)=="function" ) ){
            cf.onChange = function(b,n){
                b.innerHTML = n ? "wheel on" : "";
            };
        } 

        var eS = getEventSender({
            key:    $("#entries"),
            button: ["#entries-down","#entries-up"].map($),
        });

        
        var panel;
        panel = (function(){
            var oc = cf.onChange;
            return createWheelPanel(cf,eS, function(n){oc(panel,n);});
        })();

        
        var resizer = getWheelPanelResizer(panel,cf.wheelPanel);

        ["resize", "load"].forEach( function(e){
            window.addEventListener(e,resizer,true);
        });
        resizer();

        document.body.appendChild(panel);
    }

///////////////////////////////////////////////////////////////////////////////

	function preventDefault(e){
		return e.preventDefault || e.preventDefault();
	};

    function createKeyEvent(sEv,c1,c2){
        var e = document.createEvent("KeyboardEvent");
        var t = true, f = false;
        e.initKeyEvent(sEv,t,t,null,f,f,f,f,c1,c2);
        return e;
    }
    function createMouseEvent(e){
        var ev = document.createEvent("MouseEvents");
        var T = true, F = false;
		ev.initMouseEvent (e, T,T, window, 0,0,0,0,0,F,F,F,F,null,null);
		return ev;
    }

	function getEventSender(r){ return ({
		Key: function(isDown){
			[ ["keydown",  ( isDown ? 74 : 75 ), 0],
              ["keypress", 0, "jk".charCodeAt( isDown ? 0 : 1 ) ] ]
            .map(function(e){
                return createKeyEvent.apply(this,e);
            }).forEach(function(x){
                r.key.dispatchEvent(x)
            });
		},

		Button: function(isDown){
			var button = r.button[isDown?0:1];
			["mousedown","mouseup"]
			.map(createMouseEvent)
			.forEach(function(e){button.dispatchEvent(e);});
		},
	});}

    /* code for dom-elements */
    function toArray(e){ return Array.prototype.slice.apply(e);};

    function isString(x){ return x && x.constructor === String; };
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

	_main(options);
})();