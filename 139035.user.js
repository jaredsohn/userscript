 // ==UserScript==
 // @name       IRCTC PNR Status
 // @namespace  indianrail
 // @version    5.0
 // @description To check PNR status without entering the PNR number every time,also you can check multiple number at a time.
 // @match      http://*.indianrail.gov.in/*
 // @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
 // @copyright  2012+, You
 // @author     Nivash Ramachandran
 // ==/UserScript==

/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			if (decode(parts.shift()) === key) {
				var cookie = decode(parts.join('='));
				return config.json ? JSON.parse(cookie) : cookie;
			}
		}

		return null;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

})(jQuery, document);

$(document).ready(function(){    
    $("body").html("<div>"
				   + "<textarea style='margin-top:25px;' id='tapnr' cols='50' rows='5'/>" 
                   + "<br/>"
                   + "<input type='button' id='btnsubmit' inprogress='0' value='submit' /></div>"
                   + "<div id='divnewpnrstatus' count='0' ></div>");
    
	$("#tapnr").html($.cookie('pnr_numbers'));
    $("script").remove();
	
    
    $("#btnsubmit").click(function(){
        
        $("#divnewpnrstatus").html("");        
        var pnrNumbers = $("#tapnr").val().replace(/\r\n|\r|\n/g,"").split(",");        
        
        var validpnrno = 0;
        for(var i=0;i<pnrNumbers.length;i++){ 
	     var trimpnrno = $.trim(pnrNumbers[i]);
            if(!fnValidate(trimpnrno)) continue;
            validpnrno++;
        }
        
        if(pnrNumbers == undefined || validpnrno == 0 ){
            $("#divnewpnrstatus").html("<span>Invalid input</span>");
            return;        
        }
        
        $("#divnewpnrstatus").html("<span class='spinprogress'>Please wait , your request in progress.</span>");
        $("#divnewpnrstatus").attr("count",validpnrno);
        $.removeCookie('pnr_numbers');
		var str = "";
        for(var i=0;i<pnrNumbers.length;i++){   
	     var trimpnrno = $.trim(pnrNumbers[i]);
            if(!fnValidate(trimpnrno)) continue; 
			str += trimpnrno + ",";
            //cgi_bin/inet_pnrstat_cgi.cgi            
            $.post('cgi_bin/inet_pnstat_cgi_24335.cgi',
                   { lccp_pnrno1 :trimpnrno, lccp_cap_val: 94217, lccp_capinp_val: 94217},
                   function(data) {  
                       
                       $('#divnewpnrstatus').append("<hr><br/><br/>").append("<span>" + $(data).find("td.Enq_heading").html() + "</span>");
                           $(data).find("table.table_border").each(function(index) {
                               $('#divnewpnrstatus').append(this);
                           });
                      
                       var validpnrno = parseInt($("#divnewpnrstatus").attr("count"));
                       $("#divnewpnrstatus").attr("count",--validpnrno );
                       
                       if(validpnrno == 0){$('span.spinprogress').remove();}
                   });
        }
		$.cookie('pnr_numbers', str,{expires:365,path: '/'});
		
        
        function fnValidate(val){
			val = $.trim(val);
            if(val.length != 10) return false;
            var numval = parseInt(val);
            if(!(numval > 999999999 && numval <= 9999999999)) return false;
            return true;
        }
    });
	
	if($.trim($.cookie('pnr_numbers')) != ""){
		$("#btnsubmit").click();
	}
});




