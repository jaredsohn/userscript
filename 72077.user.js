// ==UserScript==
// @name           player expose 
// @description    makes dark background while playing video in online player(затемняем фон при проигрывании видео)
// @namespace      http://www.ex.ua/
// @include        http://ex.ua/*
// @include        http://www.ex.ua/*
// @author         fatalfury aka .bs
// @version        0.6
// ==/UserScript==

(function () {
	var p;
	if (p = document.getElementById('player')) {
		var w = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window,
			playHandlerOld = w.play_index,
			b = document.getElementsByTagName('body')[0],
            props = {
                initial: {
					'transition' : 'opacity 1s',
                    'opacity' : 0.7,
                    'backgroundColor' : 'black'
                },
                timeouts: {
                    'transition' : 'opacity 4s linear 500ms',
                    'opacity' : 0.9
                },
                map: {
                    'transition' : (function (s) {
                        var t = '';
                    	['t','OT','MozT','WebkitT'].some(function (p){
							p += "ransition";
                            if (p in s){
								t = p;
                                return true;
                            }
						})
                        return t;
                    }(document.createElement('div').style))
                }
            },
			gs = (function (e) {
				e.id='_sd'

				;(function (s) {
                    s.zIndex = 1
					s.backgroundColor = 'rgb(0,0,0)'
					s.opacity = 0.7
					s.position = 'fixed'
					s.width = s.height = '100%'
					s.top = 0
					s[props.map.transition] = props.initial.transition
				}(e.style))
				
				e.addEventListener('dblclick', function () {
					b.removeChild(e)
                    timer.cleanup()
				}, false)
				return function () { return e }
			}(document.createElement('div'))),
            timer = new Timer;
        
        	timer.onTimeout(function () {
                var changeset = props.timeouts;
                	for (var p in changeset)
                		changeset.hasOwnProperty(p) && (gs().style[props.map[p] || p] = changeset[p])
            })
            
            timer.onReset(function () {
                var changeset = {}
                for (var p in props.initial) 
                    if (props.initial.hasOwnProperty(p) && props.timeouts.hasOwnProperty(p))
                    	changeset[p] = props.initial[p];
                
                return function () {
                    if (timer.isTriggered()) {
                        for (var p in changeset)
                			changeset.hasOwnProperty(p) && (gs().style[props.map[p] || p] = changeset[p])
                    }
                }
            }())
			
			p.style.zIndex += 3
			
                
			w.play_index = function () {
				if (!document.getElementById("_sd")) {
                    typeof w.dragObj === 'object' && (w.dragObj.zIndex = 3)
					b.appendChild(gs())
					timer.setup()
				}
                
				return playHandlerOld.apply(this, arguments)
			}
	}
	
	function Timer () {
		var timer,
			timeoutDelay = 5000,
			triggered = false,
			cbs = {
				t: [],
				r: []
			};
		
		function resetTimer () {
			clearTimeout(timer)
			cbs.r.forEach(function (cb) {
				cb.call()
			});
			triggered = false;
			timer = setTimeout(triggerTimeout, timeoutDelay)
		}
		
		function triggerTimeout () {
			cbs.t.forEach(function (cb) {
				cb.call()
			});
			triggered = true;
		}
		
		function registrator (q) {
			return function (cb) {
				 cbs[q].push(cb)
			}
		}
		
		function cleanup() {
			w.removeEventListener('mousemove', resetTimer)
			w.removeEventListener('keypress', resetTimer)
			clearTimeout(timer)
		}

		function setup () {
			resetTimer();
			w.addEventListener('mousemove', resetTimer, false)
			w.addEventListener('keypress', resetTimer, false)
		}            
		
		
		return {
			setup: setup,
			reset: resetTimer,
			cleanup: cleanup,
			onTimeout: registrator('t'),
			onReset: registrator('r'),
			isTriggered: function () {
				return triggered;   
			}
		}
	}
}())