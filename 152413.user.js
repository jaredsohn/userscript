// ==UserScript==
// @name           plug.dj: DJ Leave Alert
// @include        *plug.dj/*/*
// @version        0.5.2
// @grant          none
// ==/UserScript==

var fireLazers=function() {
    var settings = {
        gitPath: 'https://raw.github.com/lakario/plug.dj-plugins/master/'
        , djs: []
        , state: localStorage.getItem('DJLeaveAlertFlag')
        , stateArray: ['OFF', 'ON']
        , flashCount: 5
        , maxDjs: 5
    };

    unsafeWindow = window;

    var utils = {
        flashBg: function(flashCount) {
            flashCount = flashCount || settings.flashCount;
            var count = 0;

            var blinkInt = setInterval(function() {
                var body = unsafeWindow.$('body');
                var bg = body.css('background');

                body.css('background', 'none');
                setTimeout(function() {
                    body.css('background', bg);
                }, 250);

                if(++count == flashCount) {
                    clearInterval(blinkInt);
                }
            }, 500);
        }
        , beep: function() {
            var element = document.getElementById('loud-beep');
            element.load();
            element.play();
        }
    };

	var djUpdate = function(users) {
		var len = users.length;
		var me = unsafeWindow.API.getSelf();
		
		if(len < settings.maxDjs) {
			console.log('[Leave Alert] DJ slot open.');
			
			// if there was already a slot available, i am already on the deck, or i just stepped down: don't notify
			if((settings.djs.length >= settings.maxDjs || settings.djs.length < 1)
                && users.indexOf(me) == -1
                && settings.djs.indexOf(me) == -1) {
				utils.beep();
				utils.flashBg(5);
			}
		}
		else {
			console.log('[Leave Alert] All slots taken.');
		}

        settings.djs = unsafeWindow.API.getDJs();
	};

    var init = function() {
        if(window.navigator.vendor.match(/Google/)) {
            var div = document.createElement("div");
            div.setAttribute("onclick", "return window;");
            unsafeWindow = div.onclick();
        }

        if(!unsafeWindow.$) {
            return;
        }

        settings.djs = unsafeWindow.API.getDJs();

        if (settings.state == null){
            settings.state = 0;
            localStorage.setItem('DJLeaveAlertFlag', '0');
        }
        else{
            settings.state = parseInt(settings.state);
        }

        var toggleDJLeaveAlert = function(ev) {
            if(ev && ev.preventDefault) {
                ev.preventDefault();
            }

            if (settings.state){
                console.log('Turning DJ Leave Alert off');

                try {
                    unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_UPDATE, djUpdate);
                }
                catch (e) {}

                settings.djs = [];
                unsafeWindow.$('#djla-state').text('OFF').parent().css('color', 'white');
            }
            else {
                console.log('Turning DJ Leave Alert on');

                try {
                    unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_UPDATE, djUpdate);
                }
                catch (e) {}

                djs = unsafeWindow.API.getDJs();
                unsafeWindow.$('#djla-state').text('ON').parent().css('color', 'red');
            }

            localStorage.setItem('DJLeaveAlertFlag', settings.state);
            settings.state = (settings.state + 1) % 2;

            return false;
        };

        unsafeWindow.$('#user-container')
            .append('<div class="leave-alert-wrp" style="position:absolute;bottom:-18px;right:0;"></div>');
        unsafeWindow.$('.leave-alert-wrp')
            .append('<a href="#" id="toggleDJLeaveAlert" style="font-size:11px;font-weight:bold;display:none;">DJ Leave Alert: <span id="djla-state">' + settings.stateArray[settings.state] + '</span></a>')
            .click(toggleDJLeaveAlert);
        unsafeWindow.$('.leave-alert-wrp')
            .append('<audio id="loud-beep"><source src="' + settings.gitPath + 'assets/loudbeep.wav" type="audio/wav"><source src="' + settings.gitPath + 'assets/loudbeep.mp3" type="audio/mp3"></audio>');

        toggleDJLeaveAlert();

        unsafeWindow.$('#toggleDJLeaveAlert').show();
    };

    init();
};
setTimeout(function() { 
	fireLazers();
}, 1000);