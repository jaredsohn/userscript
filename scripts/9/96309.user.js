// ==UserScript==
// @name           Can You Run it FIX
// @namespace      CYRIFIX
// @description    Fix for users who locked them, when they analyze their PC with CYRI
// @include        http://cyri.systemrequirementslab.com/CYRI/download.aspx
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

/* jQuery Timer 0.1 */
jQuery.timer = function (interval, callback){var interval = interval || 100;if (!callback)return false;_timer = function (interval, callback) {this.stop = function () {clearInterval(self.id);};this.internalCallback = function () {callback(self);};this.reset = function (val) {if (self.id)clearInterval(self.id);var val = val || 100;this.id = setInterval(this.internalCallback, val);};this.interval = interval;this.id = setInterval(this.internalCallback, this.interval);var self = this;};return new _timer(interval, callback);};

function GetSystem(r, v) {
	unsafeWindow.ShowMessage(1);
	if (v == "false") {
		unsafeWindow.SRL_Detection.Object.ID = "SysReqLab";
		$.timer(1000, function(timer){ // <-- The FIX
			timer.stop();
			if (unsafeWindow.SRL_Detection.IsLoaded()) {
				unsafeWindow.ShowMessage(2);
				unsafeWindow.SRL_Detection.Configuration.ReferrerID = r;
				unsafeWindow.SRL_Detection.Configuration.Logging = "0"
				unsafeWindow.SRL_Detection.Configure();
				unsafeWindow.SRL_Detection.Detect();

				var sess = unsafeWindow.SRL_Detection.SessionID();
				$('#ctl00_body_dhd_sessionid').val(sess);

				$("#ctl00_body_btnSubmit").click();
			}else{
				timer.reset(1000);
			}
		});
	} else {
		$("#ctl00_body_btnSubmit").click();
	}
 } 

var ref = $('#ctl00_body_dhd_referrerid').val();
GetSystem(ref, "false");