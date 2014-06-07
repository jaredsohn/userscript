// ==UserScript==
// @name        logviewer
// @namespace   yi.zhang.at.redhat.com
// @description general log file viewer, it will colloring timestamps, ip address, domain names, and some keywords : for http log, krb5kdc log, messages, dirsrv (directory server)
// @version     1.0
// @include     http*://*/messages
// @include     http*://*/krb5kdc.log
// @include     http*://*/secure
// @include     http*://*/audit.log
// @include     http*://*/access_log
// @include     http*://*/error_log
// @include     http*://*/errors
// @include     http*://*/access
// @include     http*://*.log
// ==/UserScript==


var header = "<?xml version='1.0' encoding='UTF-8'?>" +
             "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.1//EN' 'http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd'>" +
             "<html xmlns='http://www.w3.org/1999/xhtml'>" +
             "<head><title id=title></title><style type=\"text/css\"></style></head><body>";
var footer = "</body></head></html>";

var ss_span = {
	        "msg_type_pass"      : "color: #00ff00; background: inherit;", 
	        "msg_type_fail" 	 : "color: #ff0000; background: inherit; font-weight: bold",
	        "msg_type_error"     : "color: #f28600; background: inherit;",
	        "msg_type_warn"      : "color: #ccff66; background: inherit;", 
	        "msg_type_info"      : "color: #66d9ef; background: inherit;", 

	        "msg_type_highlight" : "color: #f0f0f0; background: inherit; ",
	        "msg_type_timestamp" : "color: #ff6600; background: inherit; ",
	        "msg_type_ip"        : "color: #ffffff; background: #3366cc; ",
	        "msg_type_hostname"  : "color: #0099ff; background: inherit; "
            };

//var style_default = "color: #A0A0A0; background: #303030";

function loadCustomizedStyleSheet() {
	var customized_ss = "body { line-height: 1.2; color: #A0A0A0; background: #303030  }\n";
    for (var style in ss_span){
        var ss = "." + style + " { " + ss_span[style] + " } \n";
        customized_ss = customized_ss + ss;
    }
    var style = document.getElementsByTagName("style")[0];
    style.innerHTML = customized_ss;
}

// use file name as title
var log_filename = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
var log_content = document.body.innerHTML;

var regex_str_weekday="(Mon|Tue|Wed|Thu|Fri|Sat|Sun)";
var regex_str_month="(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
var regex_str_day="(\\d{2})";
var regex_str_year="(\\d{4})";
var regex_str_hhmmss="(\\d{2}:\\d{2}:\\d{2})";

// htpd error log: [Mon Feb 04 12:03:35 2013]
//log_content = log_content.replace(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{2}) (\d{2}):(\d{2}):(\d{2}) (\d{4})/g, "<span class=msg_type_timestamp>$1 $2 $3 $4:$5:$6 $7</span>"); // raw format, it works
var regex_httpd_errorlog_timestamp = new RegExp(regex_str_weekday+" "+regex_str_month+" "+regex_str_day+" "+regex_str_hhmmss+" "+regex_str_year, "g");
log_content = log_content.replace(regex_httpd_errorlog_timestamp, "<span class=msg_type_timestamp>$1 $2 $3 $4 $5</span>");

// httpd access log: [04/Feb/2013:12:18:16 -0800]
//log_content = log_content.replace(/(\d{2})\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/(\d{4}):(\d{2}):(\d{2}):(\d{2}) -(\d{4})/g, "<span class=msg_type_timestamp>$1\/$2\/$3\/$4:$5:$6 -$7</span>"); // raw format, it works
var regex_httpd_accesslog_timestamp = new RegExp(regex_str_day + "\\/" + regex_str_month + "\\/" + regex_str_year + ":" + regex_str_hhmmss,"g" );
log_content = log_content.replace(regex_httpd_accesslog_timestamp, "<span class=msg_type_timestamp>$1\/$2\/$3\/$4</span>");

// httpd access log: ip address: 192.168.122.107
//log_content = log_content.replace(/([\n| ])(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})/g, "$1<span class=msg_type_ip>$2.$3.$4.$5</span>"); // raw format, it works
var regex_ipv4_address = new RegExp("(\\d{1,3}[.]\\d{1,3}[.]\\d{1,3}[.]\\d{1,3})","g");
log_content = log_content.replace(regex_ipv4_address, "<span class=msg_type_ip>$1</span>");

// httpd access log: keyword: POST GET
log_content = log_content.replace(/POST /g, "<span class=msg_type_highlight>POST </span>");
log_content = log_content.replace(/GET /g , "<span class=msg_type_highlight>GET </span>");

// krb5kdc log: domain name
//log_content = log_content.replace(/([a-z|A-Z]+)[.]([a-z|A-Z|.]+)[.]([a-z|A-Z]+)/g, "<span class=msg_type_hostname>$1.$2.$3</span>"); // raw format, works good
var regex_domain_name = new RegExp("([0-9a-zA-Z]+[.][0-9a-zA-Z|.]+[.][a-zA-Z]+)", "g");
log_content = log_content.replace(regex_domain_name, "<span class=msg_type_hostname>$1</span>");

// krb5kdc log: timestamp 
//log_content = log_content.replace(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ([ |\d]{1,2}) (\d{2}):(\d{2}):(\d{2}) /g, "<span class=msg_type_timestamp>$1 $2 $3:$4:$5 </span>"); // raw format, it works
var regex_krb5kdc_timestamp = new RegExp(regex_str_month + " " + "([ |\\d]{1,2})" + " " + regex_str_hhmmss, "g");
log_content = log_content.replace(regex_krb5kdc_timestamp, "<span class=msg_type_timestamp>$1 $2 $3</span>");

// coloring some keywords
var regex_keyword_pass = new RegExp("(passed|pass|successfully|success)", "ig");
var regex_keyword_fail = new RegExp("(failed|failure|fail|abort|crash|error)", "ig");
var regex_keyword_warn = new RegExp("(can't|cannot|couldn't|warning|warn)", "ig");
var regex_keyword_info = new RegExp("(stop|stopped|notice|info|restarted|restart|starting up|starting|started|start|shutting down|done|resuming|enabled|disabled)", "ig");

log_content = log_content.replace(regex_keyword_pass, "<span class=msg_type_pass>$1</span>");
log_content = log_content.replace(regex_keyword_fail, "<span class=msg_type_fail>$1</span>");
log_content = log_content.replace(regex_keyword_warn, "<span class=msg_type_warn>$1</span>");
log_content = log_content.replace(regex_keyword_info, "<span class=msg_type_info>$1</span>");

//log_content = log_content.replace(/(pass|passed|successfully|success)/ig , "<span class=msg_type_pass>$1</span>"); // raw format, it works
//log_content = log_content.replace(/(stopped|stop|notice|info|restarted|restart|starting up|starting|started|start|shutting down|done|resuming|enabled|disabled)/ig , "<span class=msg_type_info>$1</span>"); // raw format, it works
//log_content = log_content.replace(/(can't|cannot|couldn't|warning|warn)/ig , "<span class=msg_type_warn>$1</span>"); // raw format, it works
//log_content = log_content.replace(/(fail|failed|failure|abort|crash|error)/ig, "<span class=msg_type_fail>$1</span>"); // raw format, it works

// finally, the function to load log file content with customozed style sheet
window.addEventListener(
   'load',
	function() { 
        document.body.innerHTML = header + log_content + footer;
        title = document.getElementById("title");
        if (title) {
             title.innerHTML=log_filename;
        }
        loadCustomizedStyleSheet();
	},
    true
);

