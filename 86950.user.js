// ==UserScript==
// @name           grepoTime
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game*
// @version        1.1
// @description    Dynamic and real arrival time
// @require        http://datejs.googlecode.com/files/date.js
// @source         http://userscripts.org/scripts/show/86950
// ==/UserScript==

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'), server = (n[1] + n[2]);
    var townId = parseInt(uW.Game.townId, 10);
    var Ts = {
        en: {
            dep_time: 'Estimated departure time',
            arr_time: 'Planned arrival time'
        },
        fr: {
            dep_time: 'Estimation de l\'heure de départ',
            arr_time: 'Heure d\'arrivée prévue'
        },
		de: {
            dep_time: 'Geschätzte Abflugzeit',
            arr_time: 'Geplante Ankunftszeit'
        }
    };
    var T = Ts[lang] || Ts.en;
	
    uW.TownInfo.bindDurationCounter = createSequence(uW.TownInfo.bindDurationCounter, update);
    
    function update(){
        var tabId = $('.ui-state-active').id;
		var asAttack = (tabId==='town_info_tab_attack');
		var asSupport = (tabId==='town_info_tab_support');		
		
		$('.index_unit').bind('click', recalcArrival);
        $('.unit_input').bind('keyup change', recalcArrival);
		
		if ($('#colo_container').length === 0) {
			$('#duration_container').append('<div id="colo_container" style="float:left;display: block;margin:8px;">' +
			'<input type="text" size="10" id="g_arr_time" value="'+GM_getValue('arrival_time','')+'"/>' +
			'&nbsp;<span id="g_dep_time"></span>' +
			'</div>');
			$('#g_dep_time').mousePopup(new MousePopup(T.dep_time));
			$('#g_arr_time').mousePopup(new MousePopup(T.arr_time));
			$('#g_arr_time').blur(updatecolo).keypress(function(e){
	            var k = e.keyCode || e.which;
				setTimeout(updatecolo,100);
	            if (k == 13) {
	                return false;
	            } else {
	                return true;
	            }
	        });
		}
    }
	
	function updatecolo(){
		console.log('updatecolo');
		$('#g_dep_time').text('');
		var arr = getDateTime('#g_arr_time');
		if (arr) {
			GM_setValue('arrival_time',arr.toString("H:mm:ss"));
			var dur = getDateTime('#way_duration');
			if (dur) {
				var dep = arr.add({
					seconds: -dur.getSeconds(),
					minutes: -dur.getMinutes(),
					hours: -dur.getHours()
				});
				$('#g_dep_time').text('~' + dep.toString("H:mm:ss"));
			}
		}
	}
	
	var di = {};
	
    function recalcArrival(){
		updatecolo();
		recalc('#way_duration', '#arrival_time', true);
	}
	
	function recalc(durationId, arrivalId, arrival){
        var d = getDateTime(durationId);
        if (di[arrivalId]) {
            clearInterval(di[arrivalId]);
        }
		if (d) {
			di[arrivalId] = setInterval(function(){
				var i = 0, ds;
				if (arrival) {
					ds = getServerTime();
					i = 1;
				} else {
					//ds=??;
					i = -1;
				}
				var t = ds.add({
					seconds: i * d.getSeconds(),
					minutes: i * d.getMinutes(),
					hours: i * d.getHours()
				});
				var arr = $(arrivalId);
				if (arr.length === 0) {
					clearInterval(di[arrivalId]);
				} else {
					arr.text(t.toString("H:mm:ss"));
				}
			}, 1000);
		}
    }
	
	function getServerTime(){
		var servertime = new Date((new Date()).getTime() - uW.Timestamp.serverGMTOffset() * 1000 - uW.Layout.client_server_time_diff * 1000);
        var ds = Date.today().set({
                millisecond: 0,
                second: servertime.getUTCSeconds(),
                minute: servertime.getUTCMinutes(),
                hour: servertime.getUTCHours(),
                day: servertime.getUTCDate(),
                month: servertime.getUTCMonth() + 1,
                year: servertime.getUTCFullYear()
        });
		return ds;
	}
	function getDateTime(id){
		var d=false, w = $(id).val()||$(id).text();
		w = w.replace('~', '');
        if (w) {
			w=w.split(':');
			d = Date.today().set({
                millisecond: 0,
                second: parseInt(w[2]||0,10),
                minute: parseInt(w[1]||0,10),
                hour: parseInt(w[0]||0,10)
			});
		}
		return d;
	}
    
    function createSequence(method, fcn, scope){
        return (typeof fcn != 'function') ? this : function(){
            var retval = method.apply(this || window, arguments);
            fcn.apply(scope || this || window, arguments);
            return retval;
        };
    }
    
})();
