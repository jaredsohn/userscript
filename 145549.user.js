// ==UserScript==
// @name mk-equipment-repair
// @namespace http://mk.pisem.net/greasemonkey/
// @description Equipment repair assistance
// @include http://virtonomica.ru/*/main/company/view/*/unit_list/equipment
// ==/UserScript==


// checks if "s1" starts with "s2"
function startsWith(s1, s2)
{
    return s1.substr(0, s2.length) == s2;
}

function mk_run()
{
    var form = document.getElementsByName("unitsEquipmentRepair")[0];
    if (!form) {
	GM_log("'mk:' form 'unitsEquipmentRepair' not found");
	return;
    }
    var inputs = form.getElementsByTagName('input');
    //GM_log("'mk:' inputs.length=" + inputs.length);
    for(var i=inputs.length; i>0; --i) {
	var j=i-1;
	var input = inputs[j];
	//GM_log("'mk:' inputs[" + j + "].id='" + inputs[j].id + "'");
	if (!startsWith(input.id, "wear_")) {
	    continue;
	}
	//GM_log("'mk:' inputs[" + j + "].id='" + inputs[j].id + "'");
	if (parseFloat(input.value) >= 3.) { continue; }
	var td = input.parentNode;
	var textContent = td.textContent;
	// "0.14 % (4+1)"
	// "0.37 % (0+1)"
	// "0.00 % (0)"
	var inBrackets = textContent.substring(textContent.indexOf("(")+1, textContent.indexOf(")"));
	//GM_log("'mk:' inputs[" + j + "].id='" + inputs[j].id + "' inBrackets='" + inBrackets + "'");
	//var worn = inBrackets.substring(0, inBrackets.indexOf("+"));
	//var worn = parseInt(inBrackets.substring(0, inBrackets.indexOf("+")));
	var worn = inBrackets.split("+")[0];
	//GM_log("'mk:' inputs[" + j + "].id='" + inputs[j].id + "' inBrackets='" + inBrackets + "' worn=" + worn);
	if (worn == 0) {
	    var tr = td.parentNode;
	    var tbody = tr.parentNode;
	    tbody.removeChild(tr);
	}
    }
}

mk_run();

//GM_log("'mk:' finished");
