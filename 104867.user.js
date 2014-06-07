// Telecom NZ Usage Stats
// 
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Telecom NZ Usage Stats", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Telecom NZ Usage Stats
// @namespace     https://www.telecom.co.nz/ebill/requesthandler
// @description   Show Telecom Broadband stats in an easy to read manner
// @include       https://www.telecom.co.nz/ebill/requesthandler*
// ==/UserScript==

var telecom_nz_stats = {
	
	BASIC: false,
	DETAILED: false,
	ONE_DAY: 1000 * 60 * 60 * 24,
	
	detailed_url_regex: new RegExp(/^https:\/\/www\.telecom\.co\.nz\/ebill\/requesthandler\/\?js=2&currentAccountLine.*/i),

	container: document.createElement('div'),
	label_css: 'style="display:hidden;width:200px;float:left;text-align:right;margin-right:10px;"',
	info_css: 'style="font-weight:bold;"',
	
	interval_id: false,
	
	output: function(content) {
	
		var message = '';
		for (var label in content) {
			message += '<span ' + this.label_css + '>' + label + '</span><span ' + this.info_css + '>' + content[label] + '</span><br/>';
		}
		this.container.innerHTML = message;
		this.container.style.display = 'block';
	},

	basic: function() {
		var usage = document.getElementsByClassName('tbdr')[1].getElementsByTagName('table')[0].getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML.replace(/<\/?(img|nobr|br)[^>]*\/?>|<a\s.*|MB|\s/gi,'').trim().split('of');
		usage = parseFloat(usage[1]) - parseFloat(usage[0]);
		var more_information = document.getElementsByClassName('tbdr')[1].getElementsByTagName('table')[0].getElementsByTagName('a')[0];

		if (!isNaN(usage)) {
			this.output({
			'Remaining bandwidth:': Math.round(usage) + ' MB',
			'&nbsp;': '<a href="' + more_information + '">More Information</a>'
			});
		}
	},
	
	detailed: function() {
	
		var total_bandwidth = parseFloat(document.getElementsByClassName('usage')[0].getElementsByTagName('font')[0].children[0].innerHTML.replace(/[^0-9]/g,''));
		var usage_period = document.getElementsByClassName('tbdr')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML.split('-');
		var usage_from = new Date(usage_period[0]);
		var usage_to = new Date(usage_period[1]);
		var now = new Date();
	
		var used_bandwidth = parseFloat(document.getElementsByClassName('usage')[1].getElementsByClassName('copy')[0].getElementsByTagName('td')[0].innerHTML.replace(/<\/?(img|nobr|br)[^>]*\/?>|,/gi,'').trim());
	
		var elapsed_days = Math.round((now.getTime() - usage_from.getTime()) / (this.ONE_DAY));
		var total_period = Math.round((usage_to.getTime() - usage_from.getTime()) / (this.ONE_DAY));
		var remaining_days = Math.round((usage_to.getTime() - now.getTime()) / (this.ONE_DAY));
	
		var remaining_bandwidth = (total_bandwidth - used_bandwidth);
				
		this.output({
			'Elapsed period:': elapsed_days + ' days',
			'Remaining period:': remaining_days + ' days',
			'Remaining bandwidth:': Math.round(remaining_bandwidth) + ' MB',
			'Remaining bandwidth per day:': Math.round(remaining_bandwidth / remaining_days) + ' MB'
		});
	},

	check: function(self) {
		if (document.getElementsByClassName('tbdr')) {
			window.clearInterval(self.interval_id);
			self.BASIC ? self.basic() : self.detailed();
		}
	},

	begin: function() {
		if (this.detailed_url_regex.exec(window.location.href)) this.DETAILED = true;
		else this.BASIC = true;
		
		this.container.style.position = 'fixed';
		this.container.style.top = '10px';
		this.container.style.right = '10px';
		this.container.style.backgroundColor = '#FFF';
		this.container.style.padding = '5px';
		this.container.style.display = 'none';
		document.getElementsByTagName('body')[0].appendChild(this.container);

		this.interval_id = window.setInterval(this.check, 100, this); 	
	}
};

telecom_nz_stats.begin();