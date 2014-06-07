// ==UserScript==
// @name           Yah's Assistant
// @namespace      http://userscripts.org/scripts/show/56751
// @include        http://*

// ==/UserScript==
// version                     0.44 04 Sep 2009
var local_version = new Number(0.44);

//It's not what you know, it's all about who you know

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Variables
////////////////////////////////////////////////////////////////////////////////////////////////////////
var br = "<br>";
var btns = [];
var cmds = [];
var css_ya_div = "background-color:#EEEEEE; border-left-style:solid; border-bottom-style:solid; border-right-style:solid; border-width:2px; margin-top:0px; margin-bottom:0px; position:fixed; top:0px; z-index:999999999;";
var css_td = 'style="margin:0px 0px 0px 0px; padding:0px 0px 0px 0px; border-spacing:0px 0px 0px 0px;"';
var css_txt = "font-family:sans-serif; font-size:15px; font-style:normal; font-variant:normal; font-weight:normal; font-weight:bolder; line-height:.5em;";

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Buttons
////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////
//	How to match input to action to response processing/display
//
//		. title
//		. Match string for determining command
//		. Match string word qty
//		. url of site (including the variable used to data string: $data)
//		. URL search/replace string(s) separated with a | and use a = between search and replace
//		. Extract string 1
//		. Extract string 2
//		. Extract string 3
//		. Help Screen string
//
////////////////////////////////////////////////////////////////////////////////////////////////////////
cmds.push (["calc",
             /^calc\s/i,
             1,
             "http://www.google.com/search?hl=en&num=1&q=$params",
             [/\+/g,"%2b"],
             "/images/calc_img.gif",
             "<b>",
             "</b>",
             ""
             ]);
cmds.push (["convert",
             /^convert\s|^conv\s|^cv\s/i,
             1,
             "http://www.google.com/search?hl=en&num=1&q=convert $params",
             [],
             "/images/calc_img.gif",
             "<b>",
             "</b>",
             ""
             ]);
cmds.push (["define",
             /^define\s|^def\s/i,
             1,
             "http://www.google.com/search?hl=en&num=1&q=define: $params",
             [],
             "Definitions of",
             "</ul>",
             "",
             ""
             ]);
cmds.push (["help",
             /^help\s|^h\s/i,
             1,
             "help",
             [],
             "",
             "",
             ""
             ]);
cmds.push (["weather",
             /^weather\s|^weath\s/i,
             1,
             "http://www.weather.com/weather/print/$params",
             [],
             '"tenday">',
             'code below -->',
             '<P CLASS="Spacing"></P>'
             ]);
             
             
//"http://www.weather.com/outlook/health/airquality/tenday/$params?from=36hr_topnav_undeclared",
             
////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Setup YA div
////////////////////////////////////////////////////////////////////////////////////////////////////////
var div_ya = document.createElement('div_ya');
document.body.appendChild(div_ya);
div_ya.id = "div_ya";

ya_show_sm();

////////////////////////////////////////////////////////////////////////////////////////////////////////
//	Setup menu for TCLC preferences
////////////////////////////////////////////////////////////////////////////////////////////////////////
GM_registerMenuCommand("Yah's Assistant", ya_show_lg);


function ya_close(){
	ya_show_sm();
}

function ya_process(){
	var ext1 = "";
	var ext2 = "";
	var ext3 = "";
	var help = "";
	var out = "";
	var params = "";
	var srchRepl = [];
	var URL = "";
	var wQty = 0;

	var inp = document.getElementById("ya_input").value;
	for (var i = 0; i < cmds.length; i++){
		var matchStr = 	cmds[i][1];
		if (inp.search(matchStr) != -1){
			wQty = 		cmds[i][2]
			URL =  		cmds[i][3];
			srchRepl = 	cmds[i][4];
			ext1 = 		cmds[i][5];
			ext2 = 		cmds[i][6];
			ext3 = 		cmds[i][7];
			help = 		cmds[i][8];
		}
	}
	// Input and params
	var inps = inp.split(" ");
	for (var i = wQty; i < inps.length; i++){
		params += inps[i] + " ";
	}
	
	// Do what we're told
	if (URL == ""){	// No match
		document.getElementById("ya_output").innerHTML = "Unrecognized request.";
	} else if (URL == "help"){
		document.getElementById("ya_output").innerHTML = "<b>Help for: " + params + "</b><br>" + help;
	} else {
		//Replace data portion of string with $data in URL
		if (srchRepl.length > 0){
			//GM_log("There are search/replace parameters...");
			var loops = srchRepl.length / 2;					//Might add an error routine here to warn of an odd number of search/replace strings
			for (var i = 0; i < loops; i=i+2){
				//GM_log("Search: " + srchRepl[i]);
				//GM_log("Replace: " + srchRepl[i+1]);
				//GM_log("Params Before: " + params);
				params = params.replace(srchRepl[i], srchRepl[i+1]);
				//GM_log("Params After: " + params);
			}
		}

		URL = URL.replace(/\$params/,params);
		GM_log("Params: " + params);
		GM_log("URL: " + URL);
		
	    GM_xmlhttpRequest({
	        method: "GET",
	        url: '' + URL,
	    	headers:{'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey'},
	        data:'',
	        onload:function(result) {
	            var res = result.responseText;
				document.getElementById("ya_output").innerHTML = extract(res, ext1, ext2, ext3);
				//GM_log("res: " + res);
	        }
	    });
	}
}

function ya_show_lg(){
    var wid = 600;
    var divL = (window.top.document.documentElement.clientWidth - wid - 10).toString();
    var t = new Array();
    var txt = window.getSelection();

    t.push('<div id="ya" style="' + css_ya_div + ' left:' + divL + 'px; line-height=.5em; width:600px;" >');
    t.push('	<table border=1 cellspacing=0 cellpadding=0 ' + css_td + ' width=100%>');
    t.push('		<tr>');
    t.push('			<td ' + css_td + ' width=100%><center><div style="' + css_txt + '">Yah\'s Assistant</div></center></td>');
    t.push('			<td ' + css_td + ' valign=top><center><button id="ya_btn_close" type="button" onClick="ya_close()"><font size=-2><b>X</b></font></button></center></td>');
    t.push('		</tr><tr>');
    t.push('			<td  ' + css_td + ' colspan=2><div><input id="ya_input" style="width:99.5%;" type=text value="' + txt + '"></input></div></td>');
    t.push('		</tr><tr>');
    t.push('			<td  ' + css_td + ' colspan=2><button id="ya_btn_process" type="button" onClick="ya_process()">Process</button></td>');
	t.push('		</tr><tr>');
    t.push('			<td  ' + css_td + ' colspan=2><div id="ya_output" style="background-color:white;"></div></td>');
    t.push('		</tr>');
    t.push('	</table>');
    t.push('</div>');
	div_ya.innerHTML = t.join('\n');

    var btn_close = document.getElementById("ya_btn_close");
    btn_close.addEventListener("click", ya_close, false);

    var btn_process = document.getElementById("ya_btn_process");
    btn_process.addEventListener("click", ya_process, false);    
}

function ya_show_sm(){
	var t = new Array();
    var divL = (window.top.document.documentElement.clientWidth - 20).toString();
	t.push('<div id="ya" style="height:15px; width:15px; ' + css_ya_div + 'left:' + divL + 'px; ' + css_txt + '" >');
	t.push('<center style="padding-top:2px;">Y</center>');
	t.push('</div>');
	div_ya.innerHTML = t.join('\n');

    var div_click = document.getElementById("ya");
    div_click.addEventListener("mouseover", ya_show_lg, false);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
//    General Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////
function extract(fullStr, ext1, ext2, ext3){
	if (ext3 == ""){
		var startPos = fullStr.indexOf(ext1) + ext1.length;
		var stopPos = fullStr.indexOf(ext2, startPos + 1);
		var len = stopPos - startPos;
		var ret = fullStr.substr(startPos, len);	
	} else {
		var findPos = fullStr.indexOf(ext1);
		var startPos = fullStr.indexOf(ext2, findPos + 1) + ext2.length;
		var stopPos = fullStr.indexOf(ext3, startPos + 1);
		var len = stopPos - startPos;
		var ret = fullStr.substr(startPos, len);
	}
	GM_log("ext1: " + ext1);
	GM_log("ext2: " + ext2);
	GM_log("ext3: " + ext3);
	GM_log("startPos: " + startPos);
	GM_log("stopPos: " + stopPos);
	GM_log("ret: " + ret);
	return ret;
}
