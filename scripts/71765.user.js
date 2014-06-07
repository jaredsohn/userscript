// ==UserScript==
// @name           Plurk Time Jumper
// @namespace      http://www.plurk.com/
// @description    Go back to the past timeline
// @include        http://www.plurk.com/*
// @author         WiselySong
// @version        1.2
// ==/UserScript==
// v0.1 : 2009.03.31 : First Release, Fix from YungSang's Plurk Time Machine and add a simple date select dialog box.
// v0.2 : 2009.04.01 : Change button name from "SelectDate" => "Jumpto" ,jump time will open a new window to make sure it work.
// v1.0 : 2009.04.03 : Use Plurk's TimeLine.reset&TimeLine.getPlurks function .
// v1.2 : 2009.04.03 : Thanks "Forte Lin" ( http://www.plurk.com/fortelin ) to optimize code and add h:m:s when assign time.

var to= "";

(function (window) {
    var date0 = new Date();

    if(!window.$('top_bar')) window.TopBar.init();
    var bar = window.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = window.TopBar.createItem('JumpTo', 'Перейти к дате', function() {
        if(to=="")
            to= date0.getFullYear()+"."+(date0.getMonth()+1)+"."+date0.getDate()+" "+date0.getHours()+":"+date0.getMinutes()+":"+date0.getSeconds(); 
			to = prompt("Перейти к ГГГГ.М.Д ч:м:с ", to);
        if(!to) return;
	var _date = to.split(' ')[0];
	var _time = to.split(' ')[1];
	var _year = _date.split('.')[0];
	//if no _month,get now Month .
	var _month= (_date.split('.')[1]) ? _date.split('.')[1] : date0.getMonth()+1;
	//if no _day, get now Date .
	var _day  = (_date.split('.')[2]) ? _date.split('.')[2] : date0.getDate();
	// if no _time,make _time=23:59:59 .
	to = _year+"/"+_month+"/"+_day+" "+((_time) ? _time : "23:59:59");
	// call Plurk TimeLine function.
	window.TimeLine.reset();
	window.TimeLine.offset = new Date(to);
	window.TimeLine.showLoading();
	window.TimeLine.getPlurks();
    });
    element.removeChild(element.firstChild);
    bar.appendChild(element);
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);
