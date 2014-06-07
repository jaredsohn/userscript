// ==UserScript==
// @name           Dizimag - Advert Cleaner
// @description    Dizimag - Advertisement Cleaner - removes skin ads and frames that Adblock couldn't remove
// @version        1.7
// @date           23.12.2013
// @author         Volkan K.
// @namespace      Dizimag_NoAds
// @include        http://www.dizi-mag.com/*
// @include        http://*.dizi-mag.com/*
// @include        http://dizi-mag.com/*
// @run-at 			document-end
// ==/UserScript==

if ('undefined' == typeof __DIZIMAG_NOADS_PAGE_SCOPE_RUN__) {
	(function page_scope_runner() {
		// If we're _not_ already running in the page, grab the full source
		// of this script.
		var my_src = "(" + page_scope_runner.caller.toString() + ")();";

		// I need to remove any extras added by Tampermonkey etc.
		var myregexp = /\/\/ ?### ?START_POINT ?###.*([\w\W]*)\/\/ ?### ?FINISH_POINT ?###/i;
		var match = myregexp.exec(my_src);
		if (match != null) {
			result = match[1];
			my_src = result;
		} else {
			result = "";
		}

		// Create a script node holding this script, plus a marker that lets us
		// know we are running in the page scope (not the Greasemonkey sandbox).
		// Note that we are intentionally *not* scope-wrapping here.
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.textContent = "var __DIZIMAG_NOADS_PAGE_SCOPE_RUN__ = true;\n" + my_src;

		// Insert the script node into the page, so it will run, and immediately
		// remove it to clean up.  Use setTimeout to force execution "outside" of
		// the user script scope completely.
		setTimeout(function() {
			(document.body || document.head || document.documentElement).appendChild(script);
			(document.body || document.head || document.documentElement).removeChild(script);
		}, 0);
	})();

	// Stop running, because we know Greasemonkey actually runs us in
	// an anonymous wrapper.
	return;
}

// ###START_POINT###  anything before this line will not be executed.

var ad_chekl="don";

jQuery('a[href*=tatilbudur]').remove();
jQuery('a[href*=commissionlounge]').remove();
jQuery('#backkapat').remove();

if ( jQuery( ".cs_age3" ).length > 0 ) {   /* dirty-fix for FireFox display issue */
	jQuery( ".cs_age3" ).after( '<div id="cs_age_fix" style="position: relative; min-height: 30px;"></div>' );
	jQuery( "#cs_age_fix" ).append( jQuery(".cs_age"), jQuery(".cs_age2"), jQuery(".cs_age3") );
}

BackDegis2('/bgdi/w14');

trackGA('PageSkin','Close');

if ( (typeof ad_kapat != "undefined") && (ad_kapat != null) ) {
	ad_kapat('ad_block',1);
}

(function maraba_televole() {
	window.ReklamAc = function() {
		return null;
	}
	var remove_list=".reklamac, *[id*='admedia'], *[did*='admedia'], *[src*='admedia'], *[src*='/ads/'], *[class*='rk250'], *[class*='rk728'], iframe[width='728'][height='90']";
	parent_suspects=jQuery(remove_list).parent();
	jQuery(remove_list).remove();
	parent_suspects.filter(":empty").remove();

	notice_remove_func=function (){
		jQuery( "div > div:contains('AdBlock kullan')" ).remove();
		jQuery('#katey,#arkaplanyx').removeClass('novid');
	};

	setTimeout(notice_remove_func,2200);
	setTimeout(notice_remove_func,5500);
	setTimeout(notice_remove_func,9900);
	setTimeout(notice_remove_func,10200);
	setTimeout(notice_remove_func,20200);
	addEventListener ('DOMSubtreeModified', notice_remove_func, false);

	var myregexp = /jQuery\(\"\.(\w+)\"\)\.click\(function\(\)\{\s*[^}]+out\.asp/i;
	doc_script_elements=document.getElementsByTagName('script');
	for (var i = 0; i < doc_script_elements.length; i++) {
		var subject = doc_script_elements[i].innerHTML;
		var match = myregexp.exec(subject);
		if ( (match != null) && (match[1] != null) ) {
			// Successful match
			result = match[1];
			jQuery("."+result).remove();
		} else {
			// Match attempt failed
		}
	}
})();

reklamgoster=null;reklamsure=null;prerollads=null;
delete reklamgoster;delete reklamsure;delete prerollads;
var reklamgoster=0;var reklamsure=0;var prerollads='';
ReklamAc = null;
ReklamAc = function() {
		return null;
}

jQuery("div.rateshow").siblings("a.sonrakibolum").css( "float", "right" );

jQuery.fn.extend({
  getAttributes: function(string) {
    if(this.length === 0) {
      return null;
    }

	if (string) {
	  var attributes = "";
      jQuery.each(this[0].attributes, function(index,attr) {
        if(attr.specified) {
          attributes += attr.name+'="'+attr.value+'" ';
        }
      });
      return attributes;
	}
    var attributes = {};
    jQuery.each(this[0].attributes, function(index,attr) {
      if(attr.specified) {
        attributes[attr.name] = attr.value;
      }
    });
    return attributes;
  }
});

jQuery("a")
.filter(function( index ) { 
	all_attr=jQuery( this ).getAttributes(true);
	//return ( jQuery.inArray('out.asp',all_attr) !== -1 ); 
	return ( (all_attr.indexOf('out.asp') !== -1) || (all_attr.indexOf('commissionlounge') !== -1) || (all_attr.indexOf('tatilbudur') !== -1) );
})
.remove();

// ###FINISH_POINT###  anything beyond this line will not be executed.