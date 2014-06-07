// ==UserScript==
// @name         CMP Form Export
// @author       lemonsqueeze
// @version      0.4
// @downloadURL  http://userscripts.org/scripts/source/175685.user.js
// @namespace	 http://userscripts.org/scripts/source/175685.user.js
// @scriptsource http://userscripts.org/scripts/source/175685.user.js
// @published    2013-08-14 16:40
// @description  Adds a button to export CMP memberclicks forms (receipts) as CSV file
// @include      https://cmp.memberclicks.net/*/adminUI/quickForm/receipt/editReceipt.do?*
// @grant        none
// ==/UserScript==

var script_url = "http://userscripts.org/scripts/source/175685.user.js";

/***************************************** extract answers ***************************************/

function assert(val, msg)
{
    if (val)
	return;
    var s = "Memberclicks Form Export:\n" + msg;
    alert(s);
    throw(s);
}

// form fields
var values = {};		// name/value pairs
var names = [];			

function new_field_name(title, existing_fields)
{
    var s = cleanup_whitespace(title);	// remove leading/trailing whitespace
    s = s.toLowerCase();
    s = s.replace(/:$/, '');		// remove trailing semicolon
    s = s.replace(/ /g, '_');		// replace spaces by underscores
    
    s = s.slice(0, 37);			// truncate (40 chars max for word ...)
    
    // ensure it's unique, append letter in case of collision
    if (existing_fields[s] || existing_fields[s + 'b'])
    {
	var letters = "bcdefghijklmnopqrstuvwxyz";    	
	var i;
	for (i = 0; existing_fields[s + letters[i]]; i++)
	{  }
	if (letters[i] == 'b')
	    rename_data(s, s + 'a');
	s = s + letters[i];
    }
    
    return s;
}

function rename_data(from, to)
{
    var tmp = values[from];
    delete values[from];
    values[to] = tmp;

    for (var i = 0; i < names.length; i++)
	if (names[i] == from)
	    names[i] = to;
}

function add_data(name, value)
{
    values[name] = value;
    names.push(name);
}

function handle_data(title, value)
{
    var name = new_field_name(title, values);
    add_data(name, value);
}

function cleanup_whitespace(v)
{
    v = v.replace(/^[ \t\n]*/, '');		// remove leading whitespace
    v = v.replace(/[ \t\n]*$/, '');		// remove trailing whitespace
    return v;
}

function extract_data()
{
    var fields = document.body.querySelectorAll('div.adminSummaryArea b');
    for (var i = 0; i < fields.length; i++)
    {
	var field = fields[i];
	if (!field.nextElementSibling)
	{
	    alert("field " + field.textContent + "has no value !");
	    continue;
	}
	var value = cleanup_whitespace(field.nextElementSibling.textContent);
	
	var m = field.textContent.match(/^([0-9]+)-/);
        if (!m)         // not a question
            handle_data(field.textContent, value);
        else
        {
            var n = m[1];       // question number
            handle_data('answer' + n, value);
        }
    }
}

/***************************************** output csv ***************************************/

function save_file(s, mime_type)
{
    var url = "data:text/plain;base64,";
    if (mime_type)
	url = "data:" + mime_type + ";base64,";
    location.href = url + window.btoa(s);
}

function csv_escape(s)
{
    s = s.replace(/\n/g, ' ');		// turn newlines into spaces    
    s = s.replace(/\"/g, '""');		// escape quotes
    s = '"' + s + '"';			// ... and quote the whole thing
    return s;
}

function data_name(n)
{
    return values[n];
}

function output_csv()
{
    var s = "";

    var columns = names;
    var data =    names.map(data_name);

    columns = columns.map(csv_escape);
    data = data.map(csv_escape);
    
    // comma separated column names
    s += columns.join(',') + '\r\n';
    s += data.join(',') + '\r\n';		    // and answers ...
    
    save_file(s, 'text/csv');
    //save_file(s, 'application/binary');
    //save_file(s, 'text/plain');    
}
    

/******************************************** main ******************************************/

function button_onclick()
{
    extract_data();    
    output_csv();
}

function add_button()
{
    var d = document.createElement('div');
    d.innerHTML = '<button style="float:right; margin-right:20px;">Export as CSV</button>';
    var b = d.firstChild;
    b.onclick = button_onclick;
    document.body.insertBefore(b, document.body.firstChild);
}

function main()
{
    add_button();
}

/******************************************** debugging ******************************************/

function load_script(url)
{
     var script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = url;
     document.getElementsByTagName('head')[0].appendChild(script);
}


var debug = false;

if (debug)	// load external script when debugging, can't debug greasemonkey scripts ...
    load_script(script_url);
else
    main();
