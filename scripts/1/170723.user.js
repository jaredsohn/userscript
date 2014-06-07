// ==UserScript==
// @name        Skip t.co 
// @namespace   cocoadaemon
// @description Skip t.co
// @include     *twitter.com
// @version     1.1.1
// @grant       none
// ==/UserScript==

/* 
  Changelog
  1.1.1  Skips tweet box 
  1.1    Mutations
  1.0    Working
  0.1    POC
*/

// Keeps the global scope clean
(function(window, undefined){

    // Script wide settings and vars
    var DEBUG = false,
    bind_class="tco-bind",
    anchor_class= "tco-ham-proof";
    
    // Main function
    function main(debug,mutations){
        debug = debug || ".";
        _debug(debug);
        _debugMutations(mutations);
        // Defines the injected class name
        var cls = anchor_class,
        col = false,el,ham;
        // Does href and class changes on anchors
        $("a.twitter-timeline-link").not("."+cls).each(function(){
            el = $(this);
            // Skip tweet box
            if( el.parent(".tweet-box").length ){
               return;
            }            
            // Retrieves color
            col = el.css("color");
            // Retrieves the good link
            ham = el.attr("data-expanded-url") || "https://"+el.html()
            // Sets the link
            el.attr("href",ham);
            // Plus, opens in new tab
            el.attr("target","_blank");
            // Assigns checked class
            el.addClass(cls);
            // Shows link marker
            el.before('<a style="color:'+col+'">&#8631;</a>')                    
        });
    }

    // listens on body changes to keep Observers alive 
    function observeProxy( options ){
        var child, children, cls=bind_class, config, target, observer;        
        // Inits the observers
        observeInit(options);
        // Selects the target node
        target = document.querySelector("body");
        // Runs observer on body change
        observer = new MutationObserver(function(mutations) {
            _debug( "body observer");
            observeInit(options);
        });
        // configures the observer:
        config = {  childList: true };
        // passes in the target node and config 
        observer.observe(target, config);        
    }
    
    // Inits the DOM bindings
    function observeInit( options ){
        var i;
        for (i=0; i<options.length;i++){
            if ($(options[i]).length < 1) {
             debug("x Element "+options[i]+" does not exist");
            } 
            //else { _debug( "init", options[i] )}
            doObserve( options[i], false, options[i]);
        }
    }

    // Binds main() to Dom changes
    function doObserve ( target, config, debug_string ){
        var cls=bind_class,observer,target;
        // selects the target node
        target = document.querySelector(target);
        // skips if element marked
        if (target.classList.contains(cls)) {
            _debug( "x doObserve skipped", target )
            return;
        }
        // adds marker class to target
        target.classList.add(cls);
        // creates an observer instance
        observer = new MutationObserver(function(mutations) {
            main(debug_string, mutations); 
        });
        // configures the observer:
        config = config || {  childList: true, subtree: true };
        // passes in the target node and config 
        observer.observe(target, config);
    }
        
    // Provides poor-man console.log alternative
    function _debug (){
        var a=arguments, d="_dbg", i=0, l=arguments.length, m="", w=$("#"+d);
        // Skips if deactivated
        if (!DEBUG) { return; }
        // Skips if no args
        if (0===l) { return }
        // Creates a DOM node for content
        if (!w.length) { w = $("body").append('<div id="'+d+'" style="background:white;height:400px;overflow:scroll;position:fixed;top:40px;width:300px;z-index:9999;">DEBUG<br/></debug>').find("#"+d); }
        // Builds message string
        for (i=0; i<l; i++) { m+=a[i]+" " }
        // Preprends string in DOM node
        w.prepend(m + "<br>");
    }
    
    // Provides mutations (ie. DOM changes events) tracker
    function _debugMutations (mutations){
        var m = [":"];
        // Skips if no args
        if (!DEBUG||!mutations||! mutations.length) { return; }
        // Builds list of mutations types        
        mutations.forEach(function(mutation) {
            m.push(mutation.type);
        });    
        // Debugs string
        _debug(m);
    }    
        
    // Runs once page is loaded
    main("init");
    
    // Binds main function to #timeline DOM changes
    observeProxy([
        ".stream-items",
        "#profile_popup"
    ]);
    
    // Runs on click in case of failure
    $("html").on("click",function(){main("click");})
    
})(window)
