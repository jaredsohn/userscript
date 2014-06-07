var jQuery = unsafeWindow.jQuery;
// ==UserScript==
// @name Reddit stats export
// @namespace redditstatsexport
// @description exportstats
// @include http://www.reddit.com/r/*/about/traffic
// @version 0.6
// ==/UserScript==
function createcsv() {
    jQuery.download = function(url, data, method){
        //url and data options required
        if( url && data ){ 
                //data can be string of parameters or array/object
                data = typeof data == 'string' ? data : jQuery.param(data);
                //split params into form inputs
                var inputs = '';
                jQuery.each(data.split('&'), function(){ 
                        var pair = this.split('=');
                        inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
                });
                //send request
                jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
                .appendTo('body').submit().remove();
        };
};
    
    
    var pathname = window.location.pathname;




    $.getJSON(pathname + '.json', null, function (json) {
        console.log(json.day.length);
        var str = 'sep=; \r\n date(by day); uniques; pageviews; subscriptions \r\n';
        for (var i = 0; i < json.day.length; i++) {
            str = str + json.day[i][0] + ';' + json.day[i][1] + ';' + json.day[i][2] + ';' + json.day[i][3] + '\r\n';

        }
        
        var str2 = 'sep=; \r\n date(by hour); uniques; pageviews\r\n';
        for (var i = 0; i < json.hour.length; i++) {
            str2 = str2 + json.hour[i][0] + ';' + json.hour[i][1] + ';' + json.hour[i][2] + '\r\n';

        }
        
                var str3 = 'sep=; \r\n date(by month); uniques; pageviews \r\n';
        for (var i = 0; i < json.month.length; i++) {
            str3 = str3 + json.month[i][0] + ';' + json.month[i][1] + ';' + json.month[i][2] + ';' + '\r\n';

        }

str = str + '\r\n' + str2 + '\r\n' + str3;

var popup = window.open('','csv','');
        popup.document.body.innerHTML = '<pre>' + str || 'sep=; \r\n' + '</pre>';
        

    });
}

// Add script to the page
document.addEventListener('DOMContentLoaded', function (e) {
    var s = document.createElement('script');
    s.textContent = "(" + createcsv.toString() + ')();';
    document.head.appendChild(s);
});;
