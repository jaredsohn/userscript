// ==UserScript==
// @name           Plurk Time Jumper (Tampermonkey edition)
// @namespace      http://www.plurk.com/
// @description    Go back to the past timeline
// @include        http://www.plurk.com/*
// @author         WiselySong, Mist Poryvaev
// @version        1.33
// @grant 		   none
// ==/UserScript==
// v0.1 : 2009.03.31 : First Release, Fix from YungSang's Plurk Time Machine and add a simple date select dialog box.
// v0.2 : 2009.04.01 : Change button name from "SelectDate" => "Jumpto" ,jump time will open a new window to make sure it work.
// v1.0 : 2009.04.03 : Use Plurk's TimeLine.reset&TimeLine.getPlurks function .
// v1.2 : 2009.04.03 : Thanks "Forte Lin" ( http://www.plurk.com/fortelin ) to optimize code and add h:m:s when assign time.
// v1.3 : 2014.01.15 : Updated for Tampermonkey compatibility
// v1.32: 2014.01.16 : Firefox bugfixes
// v1.33: 2014.01.17 : Images loading fixed (it was jQuery conflict lol)

var to= "";

jQuery(document).ready(function() {
    if(!window.jQuery('top_bar')) TopBar.init();
    var edit_link = window.document.getElementById('edit_link');
    if (!edit_link) return;
    var bar = edit_link.parentNode;
    if(!bar) return;
    var date0 = new Date();
    var element = TopBar.createItem('JumpTo', 'JumpTo', function() {
        if(to=="")
		    to = date0.getFullYear()+"/"+(date0.getMonth()+1)+"/"+date0.getDate()+" "+date0.getHours()+":"+date0.getMinutes()+":"+date0.getSeconds(); 
	    to = prompt("Jump to YYYY/M/D h:m:s ", to);
        if(!to) return;
	    var _date = to.split(' ')[0];
	    var _time = to.split(' ')[1];
	    var _year = _date.split('/')[0];
	    //if no _month,get now Month .
	    var _month= (_date.split('/')[1]) ? _date.split('/')[1] : date0.getMonth()+1;
	    //if no _day, get now Date .
	    var _day  = (_date.split('/')[2]) ? _date.split('/')[2] : date0.getDate();
	    // if no _time,make _time=23:59:59 .
	    to = _year+"/"+_month+"/"+_day+" "+((_time) ? _time : "23:59:59");
	    // call Plurk TimeLine function.
	    TimeLine.reset();
	    TimeLine.offset = new Date(to);
	    TimeLine.showLoading();
	    TimeLine.getPlurks();
    });
    element.removeChild(element.firstChild);
    bar.appendChild(element);
});
