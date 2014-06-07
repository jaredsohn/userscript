// ==UserScript==
// @name       Google Docs View Mouseover Panels
// @namespace  http://userscripts.org/users/cytochrome
// @version    0.1.4
// @description  Toggle visibility of panels by mouseover. (tested on google chrome)
// @match      https://docs.google.com/viewer?*
// @match      http://docs.google.com/viewer?*
// @copyright  2012, Cytochrome
// ==/UserScript==

/***** changelog
0.1.4: fix border-radius.
0.1.3: fix resize issue. force set content position to (0,0).
0.1.2: add border-radius and fade-in/out transition.
0.1.1: fix userscript "match" attribute.
0.1  : init
******/

(function(){
    var $, $$;
    var config = {
        sensor: { // condition to show
            menu:  function(e){ return (e.clientY < 32); },
            thumb: function(e){ return (e.clientX < 32); }
        },
        get_menu_nodes: function(){
            return ([
                $("#docs-header").parentNode,
                $("#gview-menu"),
                $("#controlbar"),
                $("#docs-menu-shield")
            ].concat($$("div.goog-menu")));
        }
    };
    
    function toArray(e){ return Array.prototype.slice.apply(e); }
    function objectOverride(){
        var ar = toArray(arguments);
        return ar.length > 0 ? (ar.reverse().reduce(function(d,s){
            for(var i in s){ d[i]=s[i]; }
            return d;
        })) : null;
    }
    function appendStyle(x){
        var S = document.createElement("style");
        S.setAttribute("type","text/css");
        S.appendChild(document.createTextNode(x));
        $("head").appendChild(S);
    }

    function arrayOfClassName(el){
        return (el.getAttribute("class") || "")
            .split(/\s+/g).filter(function(e){return e;});
    }

    function classNameAsArray(cl){
        if     ( cl.constructor == String ){ cl = [cl];  }
        else if( cl.constructor != Array ) { cl = ([]); }
        return cl;
    }

    function getElemClassMethodMod(modifier){
        var ne = function(x){ return function(e){return e!=x;}; };
        return (function(el,cl){
            var a = [],E=arrayOfClassName(el);
            classNameAsArray(cl).forEach(function(e){
                a = modifier(E,e,ne(e));
            });
            el.setAttribute("class",a.join(" "));
            return true;
        });
    }

    var addClass = getElemClassMethodMod(function(arr,target,ne){
        if( arr.every(ne) ){ arr.push(target); } return arr;
    });
    
    function hasClass(node,cls){
        return (arrayOfClassName(node)
            .some(function(e){return cls==e;}));
    }

    var removeClass = getElemClassMethodMod(function(arr,cls,ne){
        return arr.filter(ne);
    });

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

    var getStyleTmplSetter = function(x){
        return (function(e){ objectOverride(x,e.style); return e;});};

    var styleTmpl = {
        fix0: getStyleTmplSetter({ top:"0px", left:"0px", position: "fixed" }),
        pos0: getStyleTmplSetter({ top:"0px", left:"0px"}),
        abs0: getStyleTmplSetter({ position: "absolute", top:"0px", left:"0px"}),
        fix:  getStyleTmplSetter({ position: "fixed" }),
        abs:  getStyleTmplSetter({ position: "absolute" }),
    };

    function hide(e){
        removeClass(e,"panelFadeIn");
        addClass(e,"panelFadeOut");
    }
    function show(e){
        removeClass(e,"panelFadeOut");
        addClass(e,"panelFadeIn");
    }
    
    var getLocalNode;  //   = function(e){ return nodes[e]; };
    var getStyleSetter = function(x,y){
        return (function(e){e.style[x]=y;return e;}); };

    var _exit = function(){};
    
    function _main(cf){
        
        appendStyle([
            ".panelFadeIn,",
            ".panelFadeOut {",
            "    -webkit-transition-property: opacity,visibility;",
            "    -webkit-transition-duration: .2s;",
            "}",
            ".panelFadeIn {",
            "    opacity: 1;",
            "    visibility: visible;",
            "}",
            ".panelFadeOut {",
            "    opacity: 0;",
            "    visibility: hidden;",
            "}",
            ".thumb-pane, #thumb-pane-lower, #us-menu-pane, #controlbar {",
            "    border-radius: 10px;",
            "}",
            ".thumb-pane-lower, #us-menu-pane, #controlbar {",
            "    border: 3px solid #aaa;",
            "    border-style: none solid none none;",
            "}",
            ".thumb-pane, .thumb-pane-lower {",
            "    border-radius: 0px 10px 10px 0px",
            "}",
            ".thumb-pane-lower {",
            "    border-style: none solid none none;",
            "}",
            "#us-menu-pane, #controlbar {",
            "    border-radius: 0px 0px 10px 10px;",
            "    border-style: none none solid none;",
            "}"].join("\n")
        );

        var shown = {
            menu:  false,
            thumb: false
        };
        
        var menuNodes = cf.get_menu_nodes();

        var nodes = {
            menu:  moveToLast.apply(this,menuNodes.concat([document.createElement("div")])),
            thumb: $("#thumb-pane"), // document.createElement("div"),
            thumb_low: $("#thumb-pane-lower"),
            content:   $("#content-pane")
        };

        getLocalNode = function(e){ return nodes[e]; };

        nodes.menu.style.backgroundColor =
            document.body.style.backgroundColor || "#ffffff";
        nodes.menu.setAttribute("id","us-menu-pane");
    
        var sensor = cf.sensor;
        var mouseMoveListener = function(e){
            // return if any floating element has already shown.
            for( var nd in sensor ){
                if( shown[nd] ){ return true; }
            }
            for( var nd in sensor ){
                if( nd in nodes && sensor[nd](e) ){
                    show(nodes[nd]);
                    return shown[nd] = true;
                }
            }
            return true;
        };
    
        var getMouseOut = function(e){
            if( !(e in nodes) ){ return function(){}; }
            return (function(){
                if(shown[e]){ hide(nodes[e]); shown[e]=false; }
            });
        };

        ["menu","content","thumb"]
        .map(getLocalNode)
        .map(styleTmpl.fix0);

        ["menu","thumb"]
        .map(function(e){
            $("#page-pane").addEventListener("mouseover",getMouseOut(e),true);
            return e;
        })
        .map(getLocalNode)
        .forEach(function(e){
            document.body.appendChild(e);
            hide(e);
        });
    
        $("#page-pane").addEventListener("mouseover",resizeListener,true);
        document.body.addEventListener("mousemove",mouseMoveListener,true);
        
        resizeListener();
        nodes.content.addEventListener("DOMAttrModified", function(e){
            ( e.attrName == "style" ) && resizeListener();
        }, false);
    }
    
    var resizeListener = function(){
        var B = document.body;
        var setWidth  = getStyleSetter("width", B.clientWidth +"px");
        var setHeight = getStyleSetter("height",B.clientHeight+"px");

        [ "content", "thumb", "thumb_low" ]
        .map(getLocalNode)
        .forEach(setHeight);
        
        [ "thumb", "menu", "content" ]
        .map(getLocalNode)
        .map(styleTmpl.pos0)
        .slice(1)
        .map(setWidth);

        var C = $("#controlbar");
        getLocalNode("menu").style.height =
            (C.offsetTop + C.offsetHeight)+"px";
        
        return false;
    };
    _main(config);

})();