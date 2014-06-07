// ==UserScript==
// @name           planio_enhancement
// @namespace      volt.plan.io/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var css = document.createElement("style");
css.type = "text/css";
css.innerHTML = "#issue_tree td { border-bottom:1px solid #ccc; }";
css.innerHTML += "#issue_tree tr:hover { background:#f5f5f5; }";
css.innerHTML += "tr.status-1.overdue, tr.status-2.overdue { border:#E00 1px solid; }";
css.innerHTML += ".status-1 .late, .status-2 .late { background:#E00; color: #FFF; }";
css.innerHTML += ".status-1 .now, .status-2 .now { background:#E60; color: #FFF; }";
document.body.appendChild(css);

var one_day=1000*60*60*24

$('.due_date').each(function(){
	if($(this).html() != ''){
		due = $(this).html().split('.');
		date = new Date ();
		date.setFullYear(due[2],due[1]-1,due[0]);
		today = new Date();
		diff = (date.getTime()-today.getTime())/(one_day);
		if(diff < 0){
			$(this).addClass('late');
		}else if(diff == 0){
			$(this).addClass('now');
		}
	}
});

//remember dropdown
var drop = document.getElementById('time_entry_activity_id');

drop.onchange = function(){
	GM_setValue("job", drop.options[drop.selectedIndex].text);
}


var opt = drop.options.length;
for( i=0; i<opt; i++){
	if(drop.options[i].text == GM_getValue("job")){
		drop.value = drop[i].value;
	}
}


