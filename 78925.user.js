// ==UserScript==
// @name			Portal Tools (Attendance Calculator+)
// @namespace		http://userscripts.org/users/cobalt
// @include			http*portal.expression.edu*
// @description		Attendance Calculator: Calculates attendance for a class, how many more hours you can miss, how many hours per class you can miss.
// ==/UserScript==


var version = "1.6";
var script_key = "78925";

/*
notes:

bugs:
if no term/week selected (first install), press "add page to list", and it adds it the next time it does get a term+week.
[FIXED] http dosn't work, only https

ideas:
do export&import feature. serialize the fucker, and then base64 encode it
another way to update all would be to have it (slowly) go through it all by 1. take a while, but doable.

todo:
show the hours missed so far somewhere
*/

parse_testing = false;

do_reset = false;

if(do_reset == true)
{
	var to_set = false;
	GM_setValue("term", to_set);	
	GM_setValue("week", to_set);
	GM_setValue("class", to_set);
	GM_setValue("parsing", to_set);
	GM_setValue("math", to_set);
}

// ------------ begin top functions------------ //

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}



function utf8_decode ( str_data ) {
    var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    
    str_data += '';
    
    while ( i < str_data.length ) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}

function utf8_encode ( argString ) {
    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;

    start = end = 0;
    stringl = string.length;
    for (var n = 0; n < stringl; n++) {
        var c1 = string.charCodeAt(n);
        var enc = null;

        if (c1 < 128) {
            end++;
        } else if (c1 > 127 && c1 < 2048) {
            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
        } else {
            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
        }
        if (enc !== null) {
            if (end > start) {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }
    }

    if (end > start) {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}


function serialize (mixed_value) {
    var _getType = function (inp) {
        var type = typeof inp, match;
        var k;
        if (type == 'object' && !inp) {
            return 'null';
        }
        if (type == "object") {
            if (!inp.constructor) {
                return 'object';
            }
            var cons = inp.constructor.toString();
            match = cons.match(/(\w+)\(/);
            if (match) {
                cons = match[1].toLowerCase();
            }
            var types = ["boolean", "number", "string", "array"];
            for (k in types) {
                if (cons == types[k]) {
                    type = types[k];
                    break;
                }
            }
        }
        return type;
    };
    var type = _getType(mixed_value);
    var val, ktype = '';
    
    switch (type) {
        case "function": 
            val = ""; 
            break;
        case "boolean":
            val = "b:" + (mixed_value ? "1" : "0");
            break;
        case "number":
            val = (Math.round(mixed_value) == mixed_value ? "i" : "d") + ":" + mixed_value;
            break;
        case "string":
            mixed_value = utf8_encode(mixed_value);
            val = "s:" + encodeURIComponent(mixed_value).replace(/%../g, 'x').length + ":\"" + mixed_value + "\"";
            break;
        case "array":
        case "object":
            val = "a";
            /*
            if (type == "object") {
                var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
                if (objname == undefined) {
                    return;
                }
                objname[1] = serialize(objname[1]);
                val = "O" + objname[1].substring(1, objname[1].length - 1);
            }
            */
            var count = 0;
            var vals = "";
            var okey;
            var k;
            for (k in mixed_value) {
                ktype = _getType(mixed_value[k]);
                if (ktype == "function") { 
                    continue; 
                }
                
                okey = (k.match(/^[0-9]+$/) ? parseInt(k, 10) : k);
                vals += serialize(okey) +
                        serialize(mixed_value[k]);
                count++;
            }
            val += ":" + count + ":{" + vals + "}";
            break;
        case "undefined": // Fall-through
        default: // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
            val = "N";
            break;
    }
    if (type != "object" && type != "array") {
        val += ";";
    }
    return val;
}

var utf8Overhead = function(chr) {
	var code = chr.charCodeAt(0);
	if (code < 0x0080) {
		return 0;
	}
	if (code < 0x0800) {
		 return 1;
	}
	return 2;
};

function unserialize (data) {
    //var that = this;

    var error = function (type, msg, filename, line)
	{
		// alert("error: " + type+":" + msg);
		//throw new window[type](msg, filename, line);
	};
    var read_until = function (data, offset, stopchr){
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        var i = 2;
        while (chr != stopchr) {
            if ((i+offset) > data.length) {
                error('Error', 'Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1),offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var read_chrs = function (data, offset, length){
        var buf;

        buf = [];
        for (var i = 0;i < length;i++){
            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr); 
        }
        return [buf.length, buf.join('')];
    };
    var _unserialize = function (data, offset){
        var readdata;
        var readData;
        var chrs = 0;
        var ccount;
        var stringlength;
        var keyandchrs;
        var keys;

        if (!offset) {offset = 0;}
        var dtype = (data.slice(offset, offset + 1)).toLowerCase();

        var dataoffset = offset + 2;
        var typeconvert = function(x) {return x;};

        switch (dtype){
            case 'i':
                typeconvert = function (x) {return parseInt(x, 10);};
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case 'b':
                typeconvert = function (x) {return parseInt(x, 10) !== 0;};
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case 'd':
                typeconvert = function (x) {return parseFloat(x);};
                readData = read_until(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
            break;
            case 'n':
                readdata = null;
            break;
            case 's':
                ccount = read_until(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];
                dataoffset += chrs + 2;

                readData = read_chrs(data, dataoffset+1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 2;
                if (chrs != parseInt(stringlength, 10) && chrs != readdata.length){
                    error('SyntaxError', 'String length mismatch');
                }

                // Length was calculated on an utf-8 encoded string
                // so wait with decoding
                readdata = utf8_decode(readdata);
            break;
            case 'a':

                readdata = {};

                keyandchrs = read_until(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];
                dataoffset += chrs + 2;

                for (var i = 0; i < parseInt(keys, 10); i++){
                    var kprops = _unserialize(data, dataoffset);
                    var kchrs = kprops[1];
                    var k = kprops[2];
                    dataoffset += kchrs;

                    var vprops = _unserialize(data, dataoffset);
                    var vchrs = vprops[1];
                    var value = vprops[2];
                    dataoffset += vchrs;

                    readdata[k] = value;
                }

                dataoffset += 1;
            break;
            default:
                error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
            break;
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    };
    
    return _unserialize((data+''), 0)[2];
}

String.prototype.reverse = function()
{
	splitext = this.split("");
	revertext = splitext.reverse();
	reversed = revertext.join("");
	return reversed;
}

// ------------ end top functions------------ //

// _hour
classes_3 = new Array("Texture and Lighting 1");
classes_4 = new Array("Texture and Lighting 1 Lab");

do_set = false;

if(!GM_getValue("term")) //  == undefined
{
	GM_setValue("term", false);	
	do_set = true;
}

if(!GM_getValue("week"))
{
	GM_setValue("week", false);
	do_set = true;
}

if(!GM_getValue("class"))
{
	GM_setValue("class", false);	
	do_set = true;
}

if(!GM_getValue("parsing"))
{
	GM_setValue("parsing", false);
}

if(!GM_getValue("math"))
{
	GM_setValue("math", false); // cant have array. serialize string.
}

if(do_set)
{
	// alert("Please set your term/week/class on the top right.");
	// return;
}


is_page_attendance = false;

page_prefix = "http:";

page = document.location.toString();
page = page.substr(page.indexOf("/"), page.length);
page_attendance = "//portal.expression.edu/secure/Student/Acad/ViewAttendance.aspx";

page_get = page.substr(page.indexOf("?")+1,page.length);

get_both = page_get.split("&");
do_updated = false;
for(i=0;i<get_both.length;i++)
{
	a = get_both[i].toString().split("=");
	a[1] = unescape(a[1]);
	a[1] = a[1].toString().replace(/\+/gi, " ")
	if(a[0]=="term")
	{
		GM_setValue("term", a[1]);
		do_updated = true;
	} else if(a[0] == "week")
	{
		GM_setValue("week", a[1]);
		do_updated = true;
	} else if(a[0] == "class")
	{
		GM_setValue("class", a[1]);
		do_updated = true;
	} else if(a[0].toString().toLowerCase() == "action")
	{
		if(a[1].toString().toLowerCase() == "add page to list")
		{
			GM_setValue("parsing", true);
		} else if(a[1].toString().toLowerCase() == "clear")
		{
			GM_setValue("math", false);
			math = GM_getValue("math");
			math_arary = math;
		}
	}
}

function string_to_array(str)
{
	if(str==false || str == '')
	{
		return new Array();
	}
}


parsing = GM_getValue("parsing");
math = GM_getValue("math");
if(math==false)
	math = new Array();
math_array = math;

term = GM_getValue("term");
week = GM_getValue("week");
class = GM_getValue("class");

all_term = new Array();
all_week = new Array();

//alert(page.substr(0,page_attendance.length).toLowerCase()+"\n"+page_attendance.toLowerCase());
if(page.substr(0,page_attendance.length).toLowerCase() == page_attendance.toLowerCase())
{
	is_page_attendance = true;
	if(do_updated)
	{
		document.location = page_prefix + page_attendance;
		return;
	}	
	do_term();
}

function do_term()
{
	ele_term = document.getElementById("_ctl0_MyViewAttendance_lstTerm");
	eles_term = ele_term.getElementsByTagName("option");
	ele_term_option = false;
	for(i=0;i<eles_term.length;i++)
	{
		e = eles_term[i];
		e.var_term_number = e.innerHTML.toLowerCase();
		e.var_term_number = e.var_term_number.substr(0,3); // e.var_term_number.length
		all_term[all_term.length] = e;
		if(e.var_term_number.toString()==term.toString())
		{
			ele_term_option = e;
		}
	}

	if(ele_term_option)
	{
		if(!ele_term_option.selected)
		{
			ele_term_option.selected = true;
			setTimeout('__doPostBack(\'_ctl0$MyViewAttendance$lstTerm\',\'\')', 0);
		} else {
			do_week();
		}
	} else {
		// alert("couldn't find term");
	}
}

function is_in_math(k)
{
	math_array_tmp = unserialize(math_array);
	for(p in math_array_tmp)
	{
		if(p==k)
		{
			return true;
		}
	}
	return false;
}

function do_week()
{
	ele_week = document.getElementById("_ctl0_MyViewAttendance_lstWeeks");
	eles_week = ele_week.getElementsByTagName("option");
	ele_week_option = false;
	for(i=0;i<eles_week.length;i++)
	{
		e = eles_week[i];
		e.var_week_number = e.innerHTML.toString().substr(0,"Week 12".length).toLowerCase();
		if(e.var_week_number.toString().indexOf(":")>0)
		{
			e.var_week_number = e.var_week_number.toString().substr(0, e.var_week_number.length-1);
			
		}
		e.var_week_number = e.var_week_number.toString().substr("week ".length, 2);
		all_week[all_week.length] = e;
		if(e.var_week_number.toString()==week.toString())
		{
			ele_week_option = e;
		}
	}

	if(ele_week_option)
	{
		parse_actually = false;
		if(is_in_math(term+""+week))
		{
			parse_actually = true;
		}
		if(!ele_week_option.selected)
		{
			ele_week_option.selected = true;
			setTimeout('__doPostBack(\'_ctl0$MyViewAttendance$lstTerm\',\'\')', 0);
		} else {
			// done, continue
			if(parsing || parse_actually || parse_testing)
			{
				do_parsing();
			}
		}
	} else {
		// alert("couldn't find week");
	}
}


function do_parsing()
{
	if(math_array.length != 0) //if the array isn't empty, 
	{
		math_array = unserialize(math_array);
	}
	var ele_table = document.getElementById("_ctl0_MyViewAttendance_grdAttendance");
	if(ele_table != null)
	{
		var eles_tr = ele_table.getElementsByTagName("tr");
		class_before = "";
		num_skipped = 0;

		k = term.toString()+""+week.toString();
			math_array[k] = new Array();
		
		for(i=0;i<eles_tr.length;i++)
		{
			tr = eles_tr[i];
			if(tr.className.toString().substr(0,3).toLowerCase() != "row")
			{
				continue;
			}
			tds = tr.getElementsByTagName("td");
			td_class = false;
			td_date = false;
			td_attendance = false;
			for(j=0;j<tds.length;j++)
			{
				td = tds[j];
				if(j==1)
				{
					td_class = td.innerHTML;
				} else if (j==4)
				{
					td_date = td.getElementsByTagName("span")[0].innerHTML;
				} else if(j==5)
				{
					td_attendance = td.innerHTML.toString();
					//td_attendance = td_attendance.substr(0,td_attendance.length-1);
				}
			}
			
			if(td_class!="" && td_class != " " && td_class != "&nbsp;")
			{
				class_before = td_class;
			} else {
				td_class = class_before;
			}
			// alert("."+td_attendance+".");
			unposted = false;
			if(td_attendance.toString().reverse().substr(0,1)!="%")
			{
				if(td_attendance.toString().toLowerCase() != "unscheduled")
				{
					num_skipped++;
				}
				if (td_attendance.toString().toLowerCase() != 'not posted')
				{
					continue;
				} else {
					// alert(1);
					unposted = true;
				}
			}
			
			ar_val = new Array(td_class, td_date, td_attendance, term, week, num_skipped, unposted);
			
			length_new = 0;
			var u = 0;
			
			for(u in math_array[k])
			{
				length_new++;
			}

			
			math_array[k][length_new] = ar_val;
			
			//alert(td_class);
			//alert(td_date);
			//alert(td_attendance);
			
			//break;
		}
	} else {
		// alert("you are not on the correct page for that");
	}
	
	// alert(math_array[key]);
	
	math_array = serialize(math_array);
	math = math_array;
	GM_setValue("math", math_array);
	GM_setValue("parsing", false);
}

function handle_select_term(ele, ele_week)
{
	return function ()
	{
		// ele_week.disabled = "true";
	}
}

function showhide(id)
{
	if(document.getElementById(id))
	{
		id = document.getElementById(id);
		if(id.style.display=='none')
		{
			id.style.display = 'block';
		} else {
			id.style.display = 'none';
		}
	}
}



function showhide_gm(id,gm_id)
{
	if(document.getElementById(id))
	{
		id = document.getElementById(id);
		if(id.style.display=='none')
		{
			id.style.display = 'block';
			GM_setValue(gm_id, false);
		} else {
			id.style.display = 'none';
			GM_setValue(gm_id, true);
		}
	} else {
		// alert("DEV: ERROR: Function showhide_gm, invalid element ID");
	}
}

function showhide_scripthelp()
{
	id = 'script_help_content_id';
	gm_id = 'help_hidden';
	showhide_gm(id,gm_id);
}

function showhide_more()
{
	id = 'script_buttons_more_text';
	gm_id = 'toggle_more_hidden';
	showhide_gm(id,gm_id);
}

function do_eles_actions()
{
	var ele_all = document.createElement("div");
	var ele_text_term = document.createElement("input");
	var ele_text_week = document.createElement("input");
	var ele_text_class = document.createElement("input");
	var ele_caption_class = document.createElement("span");
	var ele_caption_term = document.createElement("span");
	var ele_caption_week = document.createElement("span");
	var ele_br = document.createElement("br");
	var ele_submit = document.createElement("input");
	var ele_submit_parse = document.createElement("input");
	var ele_submit_clear = document.createElement("input");
	var ele_submit_import = document.createElement("input");
	var ele_submit_export = document.createElement("input");
	var ele_form = document.createElement("form");
	var ele_select_term = document.createElement("select");
	var img_more = document.createElement("img");

	img_more.src = "http://sleekupload.com/img/add.gif"; // change to question mark
	img_more.id = 'script_help_id';
	img_more.style.cursor = 'pointer';
	img_more.style.cssFloat = 'right';
	img_more.addEventListener('click', showhide_more, true);
	img_more.title = 'Show more actions!';
	img_more.style.position = 'relative';
	img_more.style.top = "-22px";
	
	var ele_more = document.createElement("div");
	ele_more.id = "script_buttons_more_text";
	
	if(GM_getValue("toggle_more_hidden") == true || GM_getValue("toggle_more_hidden") != false)
	{
		ele_more.style.display = 'none';
	}
	
	var ele_div_termweek = document.createElement("div");

	ele_select_term.addEventListener('change', handle_select_term(ele_select_term, ele_text_week), true);

	ele_select_term.name="term";

	for(i=0;i<all_term.length;i++)
	{
		term_text = all_term[i];
		term_text = term_text.innerHTML;
		term_text = term_text.toString().reverse();
		term_text = term_text.substr("Parent ".length,term_text.length);
		term_text = term_text.toString().reverse();
		option = document.createElement("option");
		option.innerHTML = option.name = term_text;
		option.style.maxWidth = "50px";
		if(term_text == term)
		{
			option.selected = "selected";
		}
		ele_select_term.appendChild(option);
	}

	ele_all.style.width="220px";
	ele_all.style.width="160px";
	ele_all.style.height = "80px";
	ele_all.style.height = "70px";
	ele_all.style.position = "absolute";
	ele_all.style.right = "200px";
	ele_all.style.top = "0px";
	ele_all.style.backgroundColor = "#000000";
	ele_all.style.opacity = ".5";

	ele_form.method = "get";

	ele_submit.type = "submit";
	ele_submit.value = "Update";
	ele_submit.style.position = "relative";
	ele_submit.style.left = "10px";
	ele_submit.name = "action";

	ele_submit_parse.type = "submit";
	ele_submit_parse.value = "Parse";
	ele_submit_parse.value = "Add page to list";
	ele_submit_parse.style.position = "relative";
	ele_submit_parse.style.left = "20px";
	ele_submit_parse.name = "action";
	ele_submit_parse.title = 'Use this button to add a page to the list.';

	ele_submit_clear.type = "submit";
	ele_submit_clear.value = "Clear";
	ele_submit_clear.style.position = "relative";
	ele_submit_clear.style.left = "30px";
	ele_submit_clear.name = "action";

	ele_caption_term.innerHTML = " (Term)";
	ele_caption_week.innerHTML = " (Week)";
	ele_caption_class.innerHTML = " (Term Start)";

	ele_text_term.style.width = ele_text_week.style.width = "35px";
	ele_text_class.style.width = "60px";

	ele_text_term.value = term;
	ele_text_term.name = "term";
	ele_text_class.name = "class";
	ele_text_class.value = class;
	ele_text_week.value = week;
	ele_text_week.name = "week";

	
	ele_div_termweek.style.display = 'none';
	ele_submit.style.display = 'none';
	ele_submit_clear.style.display = 'none';
	
	
	ele_div_termweek.appendChild(ele_select_term);
	ele_div_termweek.appendChild(ele_caption_term);
	ele_div_termweek.appendChild(ele_br);
	ele_div_termweek.appendChild(ele_text_week);
	ele_div_termweek.appendChild(ele_caption_week);
	ele_div_termweek.appendChild(ele_br);
	ele_div_termweek.appendChild(ele_text_class);
	ele_div_termweek.appendChild(ele_caption_class);
	ele_div_termweek.appendChild(ele_br);
	
	
	ele_submit_import.type = "submit";
	ele_submit_import.value = "Import";
	ele_submit_import.style.position = "relative";
	ele_submit_import.style.left = "30px";
	ele_submit_import.name = "action";
	
	ele_submit_export.type = "submit";
	ele_submit_export.value = "Export";
	ele_submit_export.style.position = "relative";
	ele_submit_export.style.left = "30px";
	ele_submit_export.name = "action";
	
	ele_submit_export.addEventListener('click', submit_export(ele_submit_export), true);
	ele_submit_import.addEventListener('click', submit_import(ele_submit_import), true);
	
	
	ele_form.appendChild(ele_div_termweek);
	


	ele_form.appendChild(ele_submit);
	
	ele_form.appendChild(ele_submit_parse);
	ele_form.appendChild(ele_submit_clear);

	ele_all.appendChild(ele_form);
	
	ele_all.appendChild(img_more);
	
	ele_more.appendChild(ele_submit_import);
	ele_more.appendChild(ele_submit_export);
	
	ele_all.appendChild(ele_more);
		
	document.body.appendChild(ele_all);
	
	/*
	--------------------------------
	*/
	
	var ele2_all = document.createElement("div");
	var ele_img = document.createElement("img");
	var ele_content = document.createElement("div");
	
	//ele2_all.style.width="160px";
	// ele2_all.style.height = "40px";
	ele2_all.style.position = "absolute";
	ele2_all.style.right = "900px";
	ele2_all.style.top = "0px";
	ele2_all.style.backgroundColor = "#000000";
	ele2_all.style.opacity = ".7";
	
	ele_img.src = "http://sleekupload.com/img/add.gif"; // change to question mark
	ele_img.id = 'script_help_id';
	ele_img.style.cursor = 'pointer';
	ele_img.style.cssFloat = 'right';
	ele_img.addEventListener('click', showhide_scripthelp, true);
	
	ele_content.id = 'script_help_content_id';
	ele_img.style.textAlign = 'left';
	if(GM_getValue("help_hidden")==true || GM_getValue("help_hidden") != false)
	{
		ele_content.style.display = 'none';
	}
	ele_content.style.width = '290px';
	ele_content.style.padding = '2px';
	ele_content.innerHTML = '';
	ele_content.innerHTML += '<u>Help</u>';
	ele_content.innerHTML += '<ul>';
	ele_content.innerHTML += '<li>once you have a term and week selected, click the "Add page to list" button.</i>';
	ele_content.innerHTML += '<li>To get an accurate value, add all weeks of a class to the list, past current and future.</i>';
	ele_content.innerHTML += '<li>When you view this page, it will automatically load the last Term and Week you viewed</i>';
	ele_content.innerHTML += '<li>When you visit a term+week, it will automatically update that entry on the list (if it exists). Besides that, it will NOT automatically update the list.</i>';
	// ele_content.innerHTML += '<li></i>';
	ele_content.innerHTML += '<li>If you have 2 Different classes (not just 1 or lecture + lab), it will merge the two together. im not spending the time to fix that, so deal with it.</i>';
	ele_content.innerHTML += '<li>Let the page refresh until it stops. Some changes don\'t take effect until you let it work!</i>';
	ele_content.innerHTML += '<li>An item in Red means there are still unposted attendance for that week.</i>';
	ele_content.innerHTML += '<li>If an entry says "Class not found", the class was not in our database. please contact us (with the class name, and the length in hours of the class) to get it added!</i>';
	
	ele_content.innerHTML += '<li>Exporting your data will give you an encrypted string. store this somewhere as a backup, or to import it onto another computer</i>';
	ele_content.innerHTML += '<li>Importing only works with an exported string (from the current version of this script)</i>';
	
	ele_content.innerHTML += '<li style="text-decoration:underline;">Labs count as separate classes</i>';
	ele_content.innerHTML += '<li>Contact: <a href="http://userscripts.org/scripts/discuss/78925" target="_blank">Here</a></i>';
	ele_content.innerHTML += '</ul>';
	
	ele2_all.appendChild(ele_img);
	ele2_all.appendChild(ele_content);
	document.body.appendChild(ele2_all);
	
}

// bookmark: import | bookmark: export

function is_valid_math(str)
{
	str = unserialize(str);
	if(!str || (typeof(str) != "object" && typeof(str)!="array") )
	{
		return false;
	}
	i_main = 0;
	for(u in str)
	{
		i_main++;
		v = str[u];
		if(v && (typeof(v) != "object" || typeof(v)!="array") )
		{
			for(w in v)
			{
				v2 = v[w];
				if(v2 && (typeof(v2) != "object" || typeof(v2)!="array") )
				{
					for(x in v2)
					{
						v3 = v2[x];
						return true;
					}
				}
			}
		}
	}
	return false;
}

function submit_import(ele)
{
	return function ()
	{
		var prompt_return = prompt("Paste in your saved exported text");
		
		if(prompt_return)
		{
			text = prompt_return;
			text = Base64.decode(text);
			//alert(text);
			if(is_valid_math(text))
			{
				text = unserialize(text);
				math_array = text;
				GM_setValue("math", serialize(math_array));
				alert("Successfully imported.\nThe page will now refresh.");
				document.location = document.location;
			} else {
				alert("Text was in an invalid format. Please try exporting again.");
			}
		}
		
		return false;
	}
}

function submit_export(ele)
{
	return function ()
	{
		var exported_text = serialize(math_array);
		exported_text = Base64.encode(exported_text);
		var prompt_return = prompt("Copy (and save) this text to import it on another computer",exported_text);
	}
}


function test_handler()
{

}

if(is_page_attendance)
{
	do_eles_actions();
}

/*
var test_array = new Array("a", "b");
test_s = 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}';
alert(test_array);
alert(serialize(test_array));
alert(unserialize(serialize(test_array)));
*/
do_math = true;
if(math_array==false || typeof(math_array) != "string")
{
	do_math = false;
}

math_array_length = 0;

if(do_math)
{
	math_array = unserialize(math_array);
	
	if(math_array) // math_array.length>0
	{
		for(var z in math_array)
		{
			math_array_length++;
		}
	}
}

ele_line = document.createElement("div");
ele_line.style.borderBottom = "1px #00FFFF solid";
ele_line.style.height = "2px";
ele_line.style.maxHeight = "2px";
ele_line.style.fontSize = "1px";

padding = 1;

sort_math_i = 0;

function sort_math_function(a,b)
{
	sort_math_i++;
	// new Array(0td_class, 1td_date, 2td_attendance, 3term, 4week, 5num_skipped, 6unposted);
	
	//alert(object_to_array(a,true)+"_"+object_to_array(b,true));

	a = object_to_array(a, true);
	// a = a[3] + "" + a[4];
	a = a[4];
	a = parseInt(a);
	
	b = object_to_array(b, true);
	// b = b[3] + "" + b[4];
	b = b[4];
	b = parseInt(b);

	return a - b;
	r = a - b;
	alert(sort_math_i);
	return r;
}

function sort_test(m)
{
	var array_keys = new Array();
	var m_new = new Array();
	for(t in m)
	{
		array_keys[array_keys.length] = t;
	}
	// alert(array_keys);
	array_keys.sort();
	// alert(array_keys);
	for(k in array_keys)
	{
		v = array_keys[k];
		m_new[v] = m[v];
		// alert(v);
	}
	return m_new;
}

function sort_math(m)
{
	//return m.sort();
	return m.sort(sort_math_function);
	sort_math_i = 0;
}

function object_to_array(obj,going)
{
	if(typeof(obj)!="object")
	{
		return obj;
	}
	r = new Array();
	for(s in obj)
	{
		v = obj[s];
		if(typeof(v)=="object" && going == true)
		{
			r[s] = object_to_array(v);
		} else {
			r[s] = v;
		}
	}
	return r;
}

if(math_array_length>0)
{
	var ele_all_math = document.createElement("div");
	ele_all_math.style.width="250px";
	// ele_all_math.style.height = (5*math_array_length)+"px";
	ele_all_math.style.position = "absolute";
	ele_all_math.style.right = "600px";
	ele_all_math.style.top = "0px";
	ele_all_math.style.backgroundColor = "#000000";
	ele_all_math.style.opacity = ".6";

	attended_all = 0;
	total_all = 0;
	total_total_all = 0;
	
	classes_left_all = 0;
	
	i_num = 0;
	
	// math_array = sort_math(object_to_array(math_array));
	
	math_array = sort_test(math_array);
	
	// a = new Array(0td_class, 1td_date, 2td_attendance, 3term, 4week, 5num_skipped, 6unposted);
	for(var i in math_array)
	{
		w = math_array[i];
		skipped = 0;
		w_total = 0;
		w_total_total = 0;
		w_attended = 0;
		w_percent = 0;
		
		w_length = 0;
		
		for(var t in w)
		{
			w_length++;
		}
		
		class_failed = false;
		
		for(j=0;j<w_length;j++)
		{
			a = w[j];
			if(a[5]>skipped)
			{
				skipped = a[5];
			}
			total = 0;
			attended = 0;
			for(k=0;k<classes_3.length;k++)
			{
				c = classes_3[k];
				if(c.toString().toLowerCase()==a[0].toLowerCase())
				{
					total = 3 * 60;
					break;
				}
			}
			for(k=0;k<classes_4.length;k++)
			{
				c = classes_4[k];
				if(c.toString().toLowerCase()==a[0].toLowerCase())
				{
					total = 4 * 60;
					break;
				}
			}
			//alert(total/60);
			if(total>0)
			{
				if(a[6]!=true)
				{
					w_total += total;
					attended = parseInt(a[2]);
					attended = (attended/100) * total;
					w_attended += attended;
				} else {
					// date > 0?
					classes_left_all++;
					// alert("TESTING DAMNIT");
				}
				w_total_total += total;
			} else {
				// alert("Error: class not in database");
				class_failed = true;
			}
		}
		
		var ele_x = document.createElement("img");
		ele_x.src = "http://sleekupload.com/img/delete.png";
		ele_x.style.cssFloat="left";
		ele_x.width = ele_x.height = 10;
		ele_x.style.position = "relative";
		ele_x.style.top = "4px";
		ele_x.style.cursor = 'pointer';
		
		var ele = document.createElement("div");
		if(skipped>0 || class_failed == true)
		{
			ele.style.color = "#FF0000";
		} else {
			ele.style.color = "#00FF00";
		}
		ele.style.padding = padding+"px";
		
		total_all += w_total;
		attended_all += w_attended;
		total_total_all += w_total_total;
		
		ele.style.textIndent = "1px";
		ele_x.addEventListener('click', handle_math_delete(i,ele), true);

		ele.innerHTML = '';
		
		w_percent = parseInt(w_attended / w_total * 100);
		if(!w_percent)
		{
			w_percent = '-';
		}

		ele.innerHTML += 'Term ' + a[3] + ': ';
		ele.innerHTML += 'Week ' + a[4] + ': ';
		
		if(class_failed)
		{
			ele.innerHTML += '<i>Class Not Found</i>';
		} else {
			ele.innerHTML += '' + w_percent + '%';
		}
		
		
		if(i_num+1==math_array_length)
		{
			// ele.style.borderBottom = '1px #FFF solid'; // 00FFFF
		}
		

		ele.appendChild(ele_x);
		ele_all_math.appendChild(ele);

		
		i_num++;
	}
	
	//ele_all_math.appendChild(ele_line);
	
	ele = document.createElement("div");
	ele.style.color = "#EEff00";
	ele.style.borderTop = '1px #FFF solid'; // 00FFFF
	
	ele.innerHTML = '';
	ele.style.padding = padding+"px";
	ele.id = 'custom_parsing_total';
	
	total_percent = parseInt(attended_all / total_all * 100);
	
	total_canmiss = (total_total_all / 60) * .15;
	
	missed = ((total_all - attended_all) / 60);
	left_total = total_canmiss - missed;
	//alert(left_total);

	if(left_total<2)
	{
		left = left_total.toFixed(2);
	} else {
		left = left_total.toFixed(1);
	}
	
	/*
		total classes: 14 (13.5. last day no lab)
		remaining classes (as of 6/11 including today): 5
	*/
	
	// per =(left_total / ((total_total_all-total_all)/60));
	
	/*
		thoughts:
		hours i can miss / number of classes left
	*/
	
	per = (left_total / ((total_total_all-total_all)/60));
	
	per = left_total/classes_left_all;
	
	/*
	alert(total_total_all/60);
	alert(total_all/60);
	alert(classes_left_all*3.5);
	alert(per);
	*/
	
	if(per<0.1)
	{
		per = per.toFixed(3);
	} else {
		per = per.toFixed(2);
	}
	

	ele.innerHTML += '(' + total_percent + "%)  <b style='color:#ffcc00;font-weight:bold;text-decoration:underline;'>" + left + '</b> hours left to miss' + '<br />';
	

	if(per == Number.POSITIVE_INFINITY)
	{
		per = "(0)"; // 0
	}
	
	ele.innerHTML += per + " hours per class. ";
	ele.innerHTML += '(<i>' + classes_left_all + ' classes left</i>)' + '<br />';
	
	ele_all_math.appendChild(ele);
	ele_all_math.style.border = "1px solid #FFF";
	ele_all_math.style.borderTop = 'none';
	
	document.body.appendChild(ele_all_math);
}


if(is_page_attendance)
{
	ele_week_default = document.getElementById("_ctl0_MyViewAttendance_lstWeeks");
	ele_week_default.addEventListener('change', handle_select_week_default(ele_week_default, all_week), true);

	ele_term_default = document.getElementById("_ctl0_MyViewAttendance_lstTerm");
	ele_term_default.addEventListener('change', handle_select_term_default(ele_term_default, all_term), true);
}

// bookmark: math delete
function handle_math_delete(k, ele, ele_total)
{
	return function ()
	{
		if(confirm('Are you sure you want to delete this week?'))
		{
			ele.parentNode.removeChild(ele);
			math_array_new = new Array();
			for(m in math_array)
			{
				if(m == k)
				{
					continue;
				}
				math_array_new[m] = math_array[m];
			}
			
			math_array_new = serialize(math_array_new);
			GM_setValue("math", math_array_new);
			math_array = unserialize(math_array_new);
			document.getElementById("custom_parsing_total").style.color = '#999999';
		}
	}
}

function handle_select_week_default(ele_week_default_var, all_week_var)
{
	return function ()
	{
		//alert(all_week_var.length);
		// alert(ele_week_default_var);
		// ele_week.disabled = "true";
		//alert(ele_week_default_var.value);
		ele_week_selected = false;
		for(i=0;i<all_week_var.length;i++)
		{
			w = all_week_var[i];
			//alert(w.value);
			//break;
			if(w.value==ele_week_default_var.value)
			{
				ele_week_selected = w;
			}
		}
		//alert(ele_week_selected);
		// alert(ele_week_selected.var_week_number);
		GM_setValue("week", ele_week_selected.var_week_number);
	}
}




function handle_select_term_default(ele_term_default_var, all_term_var)
{
	return function ()
	{
		ele_term_selected = false;
		for(i=0;i<all_term_var.length;i++)
		{
			w = all_term_var[i];
			//alert(w.value);
			//break;
			if(w.value==ele_term_default_var.value)
			{
				ele_term_selected = w;
			}
		}
		// alert(ele_term_selected.var_term_number);
		GM_setValue("term", ele_term_selected.var_term_number);
	}
}


function urlencode(data)
{
	// return data;
	return escape(data);
}

function array_to_url(a)
{
	r = '';
	for (b in a)
	{
		v = a[b];
		r += escape(b) + "=" + escape(v);
		r += '&';
	}
	r = r.substr(0,r.length-1);
	return r.toString();
}

function test_ajax()
{
	/*
		trying to make this work. if it did, it could update the list automatically. but, fucking https. 
	*/
	var body = document.body.innerHTML.toString();
	
	var index = body.indexOf("__VIEWSTATE") + '__VIEWSTATE" id="__VIEWSTATE" value="'.length;
	var index2 = body.indexOf('"', index);
	var viewstate = body.substr(index, index2-index);
	
	index = body.indexOf("__EVENTVALIDATION") + '__EVENTVALIDATION" id="__EVENTVALIDATION" value="'.length;
	index2 = body.indexOf('"', index);
	var event = body.substr(index, index2-index);

	
	// try viewstate reading!!
	k1 = urlencode('_ctl0:MyViewAttendance:lstTerm');
	v1 = urlencode('187_2/27/2010 12:00:00 AM|6/23/2010 12:00:00 AM');
	k2 = urlencode('_ctl0:MyViewAttendance:lstWeeks');
	v2 = urlencode('6/6/2010 12:00:00 AM_6/12/2010 12:00:00 AM');
	v3 = urlencode('_ctl$MyViewAttendance$lstWeeks');
	
	data_post =  {
		'__EVENTTARGET': v3,
		'__EVENTARGUMENT': '',
		'__LASTFOCUS': '',
		'__VIEWSTATE': viewstate,
		'__EVENTVALIDATION': event,
		k1: v1,
		k2: v2,
	};
	
	//data_post = array_to_url(data_post);
	
	// alert(data_post);

	// application/atom+xml,application/xml,text/xml
	// Mozilla/4.0 (compatible) Greasemonkey
	
	page_attendance_test = "http:" + page_attendance;
	
	/*
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2) Gecko/20100115 Firefox/3.6',
			'Accept': 'text/html,application/xhtml+xml,application/xml;',
			'Content-type': 'application/x-www-form-urlencoded',
			'cookie' : 'way_too_long',
			'Connection': 'keep-alive',
			'POSTDATA' : data_post,
			'Cache-Control' : 'public',
		},
		overrideMimeType : "text/html; charset=ISO-8859-1",
	*/
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: page_attendance_test,
		headers: {
			'Content-type': 'application/x-www-form-urlencoded',
		},
		data: data_post,
		onload: function(responseDetails)
		{
			/*
			alert([
			  responseDetails.status,
			  responseDetails.statusText,
			  responseDetails.readyState,
			  responseDetails.responseHeaders
			].join("\n"));
			// */

			txt = responseDetails.responseText;
			if(responseDetails.statusText.toString().toLowerCase() != "ok")
			{
				alert("error:" + responseDetails.statusText + "_"+ responseDetails.status);
			} else {
				alert(txt.toString().indexOf("Texture and Lighting 1"));
				document.body.innerHTML = txt;
			}
		},
		onerror: function(responseDetails)
		{
			// alert('1Request for Atom feed returned ' + responseDetails.status +' ' + responseDetails.statusText + '\n\n' + 'Feed data:\n' + responseDetails.responseText);
		},
		onreadystatechange: function(responseDetails)
		{
			// alert('2Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' + 'Feed data:\n' + responseDetails.responseText);
		},
	});
	//return;
	
	// alert(document.body.innerHTML.toString().indexOf("Texture and Lighting 1"));
	
	/*
<tr class="row1">
<td>
<a id="_ctl0_MyViewAttendance_grdAttendance__ctl2_lnkClass" class="link2" href="javascript:__doPostBack('_ctl0$MyViewAttendance$grdAttendance$_ctl2$lnkClass','')">AVE205      </a> 
</td><td>Texture and Lighting 1</td><td nowrap="nowrap" align="left" style="font-weight:normal;font-style:normal;text-decoration:none;">
<span id="_ctl0_MyViewAttendance_grdAttendance__ctl2_DateRange" class="text2">5/18/10 to 6/23/10</span>
</td><td>Monday</td><td>
<span id="_ctl0_MyViewAttendance_grdAttendance__ctl2_lblDate" class="text2">6/14/2010</span>
</td><td>Unscheduled</td>
</tr>

<tr class="row1">
0<td>AVE205</td>
1<td>Texture and Lighting 1</td>
2<td>5/18/10 to 6/23/10</td>
3<td>Monday</td>
4<td><span id="_ctl0_MyViewAttendance_grdAttendance__ctl2_lblDate" class="text2">6/14/2010</span></td>
5<td>Unscheduled</td>
</tr>
*/

}

// test_ajax();








/*
------------------------------------------------------------------
UPDATE SCRIPT CODE
Created by Justin Strawn, http://userscripts.org/users/cobalt
You may use this code for your own script, but only if you also include these lines.
------------------------------------------------------------------
*/


setTimeout ( do_update, 4 * 1000 ); // 6
//do_update();
function do_update()
{
	var url_update = "http://sleekupload.com/greasemonkey/update.php?id="+script_key+"&v="+version;
	GM_xmlhttpRequest({
		method: "GET",
		url: url_update,
		onload: function(response) {
			var currentversion = unescape(response.responseText);
			if(currentversion=="")
			{
				
			} else {
				if(currentversion!=version)
				{
					var url = prompt("You are using an outdated version of this script!\nYou have version "+version+", and the current version is "+currentversion+"\nPlease navigate to the url below to update:", "http://userscripts.org/scripts/show/"+script_key);
				}
			}
		}
	});
}