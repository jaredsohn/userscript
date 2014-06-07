// ==UserScript==
// @name       高端-RQNOJ百宝箱
// @namespace  http://www.rqnoj.cn/AboutUser.asp?UID=33474
// @version    0.1
// @description  enter something useful
// @match      http://www.rqnoj.cn/Problem.asp*
// @copyright  2012+, MonKey
// ==/UserScript==

function withjQuery(callback, safe){
	if(typeof(jQuery) == 'undefined') {
		var script = document.createElement('script');
		script.type = 'text/javascript';
        script.src = 'http://code.jquery.com/jquery.min.js';

		if(safe) {
			var cb = document.createElement('script');
			cb.type = "text/javascript";
			cb.textContent = 'jQuery.noConflict();(' + callback.toString() + ')(jQuery, window);';
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		}
		else {
			var dollar = undefined;
			if(typeof($) != 'undefined') dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery, window);
			});
		}
		document.head.appendChild(script);
	} else {
		setTimeout(function() {
			//Firefox supports
			callback(jQuery, typeof unsafeWindow === 'undefined' ? window : unsafeWindow);
		}, 30);
	}
}

withjQuery(function($, window){
    $(function(){
        $('tr[align=center]').each(function(i){
            var tr=$(this);
            if(i==0){
                tr.append('<th width=70>通过率</th>');
            }else{
                var td5=parseInt((tr.find('td:nth-child(5)')).html());
                var td6=parseInt((tr.find('td:nth-child(6)')).html());
                var tmp=Math.round((td5/td6)*100);
                if(tmp>50){
                    tmp='<font color="red">'+tmp+'%</font>';
                }else if(tmp>30){
                    tmp='<font color="green">'+tmp+'%<font>';
                }
                tr.append('<td>'+tmp+'</td>');
            }
        });
    });
}, true);