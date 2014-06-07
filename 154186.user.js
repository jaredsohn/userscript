// ==UserScript==
// @name           Aarav New Project
// @author         Mahbub Ahmed
// @namespace      aarav
// @description    Aarav project for mama
// @version        2.0a
// @include        http*://*
// @require        http://code.jquery.com/jquery-latest.min.js
// @license        Creative Commons Attributive Share-Alike 3.0
// ==/UserScript==


// JSON parser - jQuery plugin written by Mark Gibson 
// http://jollytoad.googlepages.com/json.js
// $.toJSON(value);
// $.parseJSON(json_str, [safe]);
(function($){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},s={'array':function(x){var a=['['],b,f,i,l=x.length,v;for(i=0;i<l;i+=1){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a[a.length]=v;b=true}}}a[a.length]=']';return a.join('')},'boolean':function(x){return String(x)},'null':function(x){return"null"},'number':function(x){return isFinite(x)?String(x):'null'},'object':function(x){if(x){if(x instanceof Array){return s.array(x)}var a=['{'],b,f,i,v;for(i in x){v=x[i];f=s[typeof v];if(f){v=f(v);if(typeof v=='string'){if(b){a[a.length]=','}a.push(s.string(i),':',v);b=true}}}a[a.length]='}';return a.join('')}return'null'},'string':function(x){if(/["\\\x00-\x1f]/.test(x)){x=x.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c}c=b.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)})}return'"'+x+'"'}};$.toJSON=function(v){var f=isNaN(v)?s[typeof v]:s['number'];if(f)return f(v)};$.parseJSON=function(v,safe){if(safe===undefined)safe=$.parseJSON.safe;if(safe&&!/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(v))return undefined;return eval('('+v+')')};$.parseJSON.safe=false})(jQuery);





jQuery(document).ready(function() {

function readdb() {
	numprofiles = GM_getValue('af_numprofiles', 1);
	var initdatabase = '{"input":{"captcha":{"value":[""],"name":["captcha","verif","response","cword","turing","image","security","token","code","validat","security_code","human"]},"birth":{"value":["30/12/1999"],"name":["birth_date","birth","date","dob"]},"year":{"value":["1986"],"name":["year","yy","yyyy"]},"month":{"value":["7"],"name":["month","mm"]},"day":{"value":["23"],"name":["day","dd"]},"age":{"value":["21"],"name":["age","boyos"]},"gender":{"value":["male"],"name":["gender","sex"]},"firstname":{"value":["Mahboob"],"name":["first","first_name"]},"middlename":{"value":[""],"name":["middle","middle_name"]},"lastname":{"value":["khan"],"name":["last","surname"]},"fathername":{"value":["Mehboob khan"],"name":["father","father_name"]},"mothername":{"value":["Fatema begum"],"name":["mother","mother_name"]},"spousename":{"value":["Saltanat"],"name":["spouse","wife","husband"]},"nominee":{"value":["aaarrraaa"],"name":["nominee","nom"]},"nid":{"value":["1234567890"],"name":["nid","national","id"]},"weight":{"value":["70"],"name":["weight","kg"]},"heightft":{"value":["5"],"name":["feet","ft"]},"heightinch":{"value":["9"],"name":["inches","inche","inch","inc","in"]},"passport":{"value":["r123454321"],"name":["pass","pp","mrp","pno"]},"passissue":{"value":["13/12/2012"],"name":["issue","doi"]},"passexp":{"value":["13/12/2017"],"name":["exp","doe"]},"phone":{"value":["01811111111"],"name":["contactno","mob","cell","contact_no"]},"contactname":{"value":["Mahaaaboob"],"name":["cname","contactna","contact_na","cpn","contact"]},"address":{"value":["nominee address"],"name":["address","add"]},"village":{"value":["graam or house no or street no"],"name":["vill","city","street","town"]},"postcode":{"value":["1200"],"name":["post_c","postc","postal","zip"]},"postoff":{"value":["fataaaa"],"name":["post_o","posto","post"]},"email":{"value":["abc@bbc.com"],"name":["mail","from"]},"hphone":{"value":[""],"name":["phone","tnt","house"]},"religion":{"value":["Islam"],"name":["rel","religion","cast"]},"division":{"value":["Dhaka"],"name":["div","division"]},"district":{"value":["Narayangonj"],"name":["dist","district"]},"thana":{"value":["fatulur"],"name":["thana","upazilla"]}},"checkbox":{"on":["rules","male"],"off":["female"]}}';

	database = jQuery.parseJSON( GM_getValue('af_database', initdatabase) );
	
	// select active profile
	activeprofile = GM_getValue('af_activeprofile', 0);
}





function autofill() {
	
	
// Print to console (code that works)	
// unsafeWindow.console.log('aaa');
	
	
	// INPUTS text and pass
	$('input:text,input:password').each(function(index) {
		for(var i in database.input) {
			// Go through all the different name matches
			var names = database.input[i].name;
			for(var j in names) {
				// If the name matches some part of the name attribute
				if ($(this).attr("name").toLowerCase().indexOf( names[j] ) >= 0) {
					// Check if the selected profile has a value for it
					// and if it is not empty replace the content in the input with it
					value = database.input[i].value[ activeprofile ];
					if (value) {
						$(this).val( value );
					} // if value
				} // if indexof
			} // j names
		} // i database
	}); // input each
	
	// INPUTS EMPTY text and pass
	// Fill in empty ones except Captcha
	if (database.input.other.value[ activeprofile ]) {
		$('input:text,input:password').each(function(index) {
			if (!$(this).val()) {
				$(this).val( database.input.other.value[ activeprofile ] );
			}
		});
	}
	
	
	
	// CHECKBOXES
	$('input:checkbox').each(function(index) {
		var name = $(this).attr("name").toLowerCase();
		// Check ON?
		for(var i in database.checkbox.on) {
			var checkon = database.checkbox.on[i];
			// Needs to be checked
			if (name.indexOf( checkon ) >=0) {
				$(this).attr('checked', true);
				break;
			}
		}
		// Check OFF?
		for(var i in database.checkbox.off) {
			var checkoff = database.checkbox.off[i];
			// Needs to be unchecked
			if (name.indexOf( checkoff ) >=0) {
				$(this).removeAttr('checked');
				break;
			}
		}
	}); // checkbox each
	
	
	
	
	
	// RADIOS
	// tries to select anything in the ON
	// @@@ should avoid checkoffs (agree/disagree will now select disagree)
	$('input:radio').each(function(index) {
		for(var i in database.checkbox.on) {
			$(this).val(database.checkbox.on[i]);
		}
	});
	
	
		// var name = $(this).attr("name").toLowerCase();
		//var checkon = database.checkbox.on[i];
		//$(this).attr('checked', true);
	
	
	
	
	
	// SELECTS DROPDOWN
	// selects the last one for now
	$('select').each(function(index) {
		var gotselected = 0;
		for(var i in database.input) {
			// Go through all the different name matches
			var names = database.input[i].name;
			for(var j in names) {
				// select is fillable, now find a valid option
				if ($(this).attr("name").toLowerCase().indexOf( names[j] ) >= 0) {
					
					// loop through its options
					$(this).find('option').each(function(index) {
						// unselect all
						$(this).removeAttr("selected");
						// see if option value matches database value
						if ($(this).html().toLowerCase().indexOf( database.input[i].value[ activeprofile ].toLowerCase() ) >= 0 ||
						$(this).val().toLowerCase().indexOf( database.input[i].value[ activeprofile ].toLowerCase() ) >= 0) {
							$(this).attr("selected", "selected");
							gotselected = 1;
							//break;
						}
					}); // loop through options
					
				} // fillable select
			} // j names
		} // i database
		// if none could be selected then choose the second one
		if (gotselected==0) {
			$(this).find('option:eq(1)').attr("selected", "selected");
		}
	});
		
	
	
	// CAPTCHA
	// Focus on the first captcha field
	$('input:text').each(function(index) {
		for(var i in database.input.captcha.name) {
				// Go through all the captchas name matches
				var names = database.input.captcha.name[i];
				if ($(this).attr('name').toLowerCase().indexOf( names ) >= 0) {
					$(this).val("").focus();
					break;
				}
		}
	});
	
	
	
	showmessage('AutoFill completed!');

} // function autofill






function menu() {
	$('head').append('<style id="autofill_style">#autofill_menu {background-color: #FBFBFB;border: 5px solid #CCC;border-radius: 10px;font-size: 14px;height: 90%;overflow: scroll;padding: 10px;position: fixed;right: 10px;text-align: center;top: 10px;width: 360px;z-index: 99999;}#autofill_header {margin-bottom:10px;}#autofill_menu .autofill_row {display: block;margin-bottom: 5px;text-align: right;}#autofill_menu label {display: inline;margin-right: 1em;width: 100px;}#autofill_menu input {}</style>');
	$('body').append('<div id="autofill_menu"></div>');
	var menuhtml = "";
	// generate html with variables
	menuhtml += '<div id="autofill_header" style="font-size:24px;font-weight:900;">AutoFill Options</div>';
	// Generate html form with database
	
	// Loop through multiple profiles
	//for (var profile=0;profile<numprofiles;profile++) {
	//	menuthml += 'Profile '+(parseInt(profile)+1);
	profile = 0;
		for(var i in database.input) {
			menuhtml += '<div class="autofill_row">';
			menuhtml += '<label for="af_'+i+'">'+i+'</label>';
			menuhtml += '<input type="text" id="af_'+i+'" name="'+i+'" value="'+database.input[i].value[ profile ]+'" />';			
			menuhtml += '</div>';
		}
	//} // for multiple profiles
	





	
	menuhtml += '<div text-align:right;><a style="font-size:11px;color:#0085d5;" id="autofill_cancel" href="#">Cancel</a>&nbsp;&nbsp;&nbsp;&nbsp;<a id="autofill_save" href="#" style="font-size:24px;color:#0085d5;">Save changes</a></div>';
	
	
	
	$('#autofill_menu').append( menuhtml );
	// bind buttons
	$('#autofill_save').click(function() {save();$('#autofill_menu').remove();$('#autofill_style').remove();return false;});
	$('#autofill_cancel').click(function() {$('#autofill_menu').remove();$('#autofill_style').remove();return false;});
}



function save() {
	// @@@ todo
	// grab all data from autofill_menu and put into object
	$('#autofill_menu input:text').each(function(index) {
		
		unsafeWindow.console.log( database.input[ $(this).attr('name') ].value[ activeprofile ]+"-"+$(this).val() );
		
		database.input[ $(this).attr('name') ].value[ activeprofile ] = $(this).val();
		//name = $(this).attr('name');
		//database.input.;
	});
	// object to json string
	jsondb = $.toJSON(database);
	// save to GM
	GM_setValue('af_database', jsondb); 
	
	readdb();

	showmessage('AutoFill Options saved!');
}







function showmessage(msg) {
	$('body').append('<div id="autofill_msg" style="background-color: #FFC;border: 1px solid #CC6;border-radius: 10px 10px 10px 10px;font-size: 14px;padding: 10px;position: fixed;right: 40%;text-align: center;top: 10px;width: 20%;z-index: 999999;">'+msg+'</div>');
	setTimeout(hidemsg, 1500);
}

function hidemsg() {
	$('#autofill_msg').fadeOut('slow');
}






readdb();
GM_registerMenuCommand("Auto-fill - AutoComplete", autofill );
GM_registerMenuCommand("Auto-fill - Options", menu );

}); /* dom ready */
