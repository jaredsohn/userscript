// ==UserScript==
// @name          TikTracStopWatch 0.3
// @namespace     http://wiki.mad.mw/
// @description	  Add a stopwatch to tiktrac.com
// @include       *tiktrac.com/
// ==/UserScript==
//
// Version:   0.3
// Changelog: http://wiki.mad.mw/GreaseMonkey/TikTracStopWatch/ChangeLog
//
(function(){

    START_LABEL = 'start';
    STOP_LABEL  = 'stop';
    ADD_LABEL   = 'add';
    SYMBOLS     = [ '', '/', '-', '\\', '|' ];
    SPEED       = 500; /* milliseconds */

    function Dict(){};
    Dict.__data__={};
    Dict.set = function(f, k, v){
        if (""+typeof(Dict.__data__[f])=="undefined"){
            Dict.__data__[f]={};
        }
        Dict.__data__[f][k]=v;
        return v;
    }
    Dict.get = function(f, k){
        if (""+typeof(Dict.__data__[f])=="undefined"){
            return null;
        }
        return Dict.__data__[f][k];
    }
    Dict.delta = function(f){
        Dict.set(f, "stop", new Date().getTime());
        var swstop =  Dict.get(f, "stop");
        var swstart = Dict.get(f, "start");
        Dict.set(f, "delta", Math.round((swstop - swstart)/(1000*60)));
        return Dict.get(f, "delta");
    }

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var css = '\ndiv.swprogress{ font-family:courier; font-size:150%; display:block; cursor:pointer;}'
    addGlobalStyle(css);

	var xpath = "//form[@class='ajax-edit']";
	var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var e, cnt;

	for (e = 0; e < res.snapshotLength; e++) {
		var f = res.snapshotItem(e );
        if (0==f.id.indexOf('task_duration')){
            var btn;
            btn = document.createElement("DIV");
			btn.setAttribute("id", "sw" + e );
			btn.setAttribute("class", "swprogress");
			btn.addEventListener("click", function(ev, e ){
                var state;
                var me = ev.target;
                var frm = ev.target.parentNode;
                var swk = me.id;

                state = Dict.get(swk, "state");
                if (state == null){
                    state = Dict.set(swk, "state", 0);
                }
                if (state == 0){
                    Dict.set(swk, "start", new Date().getTime());
                    Dict.set(swk, "state", 1);
                    Dict.set(swk, "interval", window.setInterval(function(){
                        var delta = Dict.delta(swk);
                        state = state == SYMBOLS.length-1 ? 1 : state+1;
                        Dict.set(swk, "state", state);
                        document.getElementById(swk).innerHTML = '&nbsp;' + SYMBOLS[state] + '&nbsp;' + delta + '&nbsp;' + STOP_LABEL;
                    }, SPEED));
                } else if (state == SYMBOLS.length){
                    Dict.set(swk, "state", 0);
                    delta = Dict.get(swk, "delta");
                    frm["task[duration]"].value = parseInt(frm["task[duration]"].value) + delta;
                    document.getElementById(swk).innerHTML = START_LABEL;
                }
                else {
                    window.clearInterval(Dict.get(swk, "interval"));
                    var delta = Dict.delta(swk);
                    document.getElementById(swk).innerHTML = ADD_LABEL + '&nbsp;' + delta;
                    Dict.set(swk, "state", SYMBOLS.length);
                }
            }, false);
            btn.appendChild(document.createTextNode(START_LABEL) );
            f.appendChild(btn);
        }
	}
}
)();
