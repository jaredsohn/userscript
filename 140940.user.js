// ==UserScript==
// @name           Telescope
// @namespace      http://toaster.taijitu.org/
// @description    NationStates Spotting utility
// @include        http://*.nationstates.net/*
// @require        http://code.jquery.com/jquery-1.6.1.min.js
// @version        0.4.5
// ==/UserScript==

// Code copyright Eluvatar
// Distributed under strict license:
// 1- You may not redistribute this code.
// 2- You may only use this code for defender purposes.
// 3- No derivative works are permitted.
// 4- You agree not to make invader scripts if you read and analyze this code. You agree that if you have an interest in making invader scripts, you will not read or analyze this code. 

function get_localid( callback ) {
    GM_log("getting localid");
    localid_input = $('input[name=localid]');
    if( localid_input.length ) {
		set_localid(localid_input[0].value, callback);
    } else {
		GM_xmlhttpRequest( {
			method : 'get',
			url : 'http://www.nationstates.net/template-overall=none/region=sherwood_chapel',
			onload : function(res) {
				localid_input = $(res.responseText).find('input[name=localid]');
				if( localid_input.length ) {
					set_localid(localid_input[0].value, callback);
				} else {
					GM_log("failed to get localid from sherwood chapel by GM_xmlhttpRequest");
					return false;
				}
			}
		});
    }
}

function set_localid(localid, callback) {
    GM_setValue('nationstates_localid',localid); 
    get_regions(callback);
}

function get_regions( callback ) {
    if( ! GM_getValue('nationstates_regions') || (undefined == GM_getValue('nationstates_regions_time')) || parseInt(GM_getValue('nationstates_regions_time')) < (new Date().getTime())-(24*60*60*1000) ) {
                d=new Date();
		GM_setValue('nationstates_regions_time',d.getTime().toString());
		GM_setValue('nationstates_regions',"true");
		load_regions(callback);
    } else {
		callback();
    }
}

function load_regions( callback ) {
    GM_log("getting regions.json");
    GM_xmlhttpRequest( {
		method : 'get',
		url : 'http://udl.taijitu.org/secret/regions.json', 
		onload : function(res) {
                        var d=new Date(); 
			GM_setValue('nationstates_regions',res.responseText);
                        GM_setValue('nationstates_regions_time', d.getTime().toString());
            callback();
        }
    });
}

function telescope_regions() {
        get_regions(function(){
                regions = JSON.parse(GM_getValue('nationstates_regions'));
        	localid=GM_getValue('nationstates_localid');
	        if( localid == undefined ) {
                        var wrap=get_localid;
                } else {
                        var wrap=function(fn){fn();};
                }
                wrap(function() {
                        $('.telescope').empty();
	                $('.rlink').after( function(){
		                name=$(this).attr('href').split('=')[1].split('#')[0];
        		        region=regions[name];
	                	if( region == null ) {
		        	        return;
        		        }
	                	str='<span class="telescope"> (<a href="http://www.nationstates.net/template-overall=none/page=change_region?region_name='+name+'&localid='+localid+'&move_region=1">Move</a>)';
		                if( typeof region.delegate !== 'undefined' && region.delegate ) {
        		        	str+=' (<a href="http://www.nationstates.net/nation='+region.delegate+'">Delegate '+region.delegate+"</a>)";
	                	}
		                return str+"</span>";
                	} );
	                $('.rlink').after( function(){
	        	        name=$(this).attr('href').split('=')[1].split('#')[0];
                		region=regions[name];
	                	if( region == null ) {
		                	return;
        		        }
	                	count=region.count;
		                t=Math.round(count*0.04186); 
        		        h=String("00"+Math.floor(t/3600)).slice(-2);
	                	m=String("00"+Math.floor(((t%3600)/60))).slice(-2);
        	        	s=String("00"+(t)%60).slice(-2);
	        	        str='<span class="telescope approx"> ('+h+':'+m+':'+s+')</span>';
	        	        return str;
        	        });
                });
       }); 
}

function telescope_helicopter() {
	GM_log("helicopter");
        get_regions(function(){
                regions = JSON.parse(GM_getValue('nationstates_regions'));
		get_localid( function(){
        		localid=GM_getValue('nationstates_localid');
		        $('.info a').after( function() {
        			GM_log($(this).attr('href'));
			        name=$(this).attr('href').split('=')[1].split('#')[0];
	   		     	region=regions[name];
        			if( region == null ) {
		     		   	return;
	       		 	}
        			if( typeof region.delegate !== 'undefined' && region.delegate ) {
		     		   	return '<span class="telescope"> (<a style="padding:1em;background-color:red;color:black;font-weight:bold;" href="http://www.nationstates.net/cgi-bin/endorse.cgi?nation='+region.delegate+'&localid='+localid+'&action=endorse">Endorse delegate '+region.delegate+"</a>)</span>";
	       	 		}
        		});
	        });
	});
}

function telescope_decorate() {
        $("head").append("<link rel=\"stylesheet\" href=\"http://udl.taijitu.org/secret/telescope.css\" type=\"text/css\">");
}

if( /^https?:\/\/.*\.nationstates\.net\/.*page=reports/.exec(document.URL) ) {
	telescope_regions();
        if( /\/template-overall=none\//.exec(document.URL) ) {
                telescope_decorate();
        }
} else if( /^https?:\/\/.*\.nationstates\.net\/template-overall=none\/page=change_region\?region_name=/.exec(document.URL) ) {
	telescope_helicopter();
        telescope_decorate();
} else if( /^https?:\/\/.*\.nationstates\.net\/.*region=/.exec(document.URL) ) {
        get_localid(function(){});
} else if( /^https?:\/\/.*\.nationstates\.net\/\.*page=change_region/.exec(document.URL) ) {
        get_localid(function(){});
} else if( /^https?:\/\/.*\.nationstates\.net\/cgi-bin\/endorse\.cgi\?nation=/.exec(document.URL) ) {
        get_localid(function(){});
} else if( /^https?:\/\/.*\.nationstates\.net\/$/.exec(document.URL) ) {
        nation=GM_getValue("nationstates_nation");
        cur_nation=$("#panel .nation a.STANDOUT")[0].href.split('=')[1];
        if( nation != cur_nation ) {
                get_localid(function(){
                        GM_setValue("nationstates_nation",cur_nation);
                });
        }
}

GM_registerMenuCommand("Get new security code",get_localid,'s');