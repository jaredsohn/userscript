// ==UserScript==
// @name           Travian: Resource overlow Timer
// @description    add timer for resource
// @author	       ww_start_t
// @copyright	   © Travian
// @license 	   KSA 
// @include        http://*.travian*.*/*
// @version        1.0
// ==/UserScript==


	function formatTime(sec, aFormat)
	{if (sec > -1) { var h = Math.floor(sec/3600); var m = Math.floor(sec/60) % 60;
	var s = parseInt(sec % 60); var ht = "";
	switch (aFormat) { case 1: var d = Math.floor(h/24); h = h - d * 24; ht += d + ", "; break; case 2: h = h % 24; break;}
	ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);}
	else ht = "FULL";h = null; m = null; s = null; d = null;return ht;}
	
	function toSeconds(hTime) 
	{p = hTime.split(":");return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);}
		
		var target = document.getElementById("res");
		var td1 = document.createElement("td");
		var td2 = document.createElement("td");
		var td3 = document.createElement("td");
        for (var j = 0; j < 4; j++) {
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
		var td6 = document.createElement("td");
		var wholeRes = document.getElementById("l" + (4-j));
		var income = wholeRes.getAttribute("title");
		var incomepersecond = income / 3600;
		
		wholeRes = wholeRes.innerHTML;
		wholeRes = wholeRes.split("/");
		var resNow = wholeRes[0];
		var fullRes = wholeRes[1];
		var spaceLeft = fullRes - resNow;
	
		incomepersecond = spaceLeft / incomepersecond;
		incomepersecond = formatTime(incomepersecond, 0);
		var test0 = document.createElement("td");
		var test1 = document.createElement("td");
		test1.setAttribute("id", "l" + (4-j) + "pb");
		var test2 = document.createElement("td");
		test2.setAttribute("id", "l" + (4-j) + "fval");
		test2.innerHTML = "[ <span text-align='center'><span id='l" + (4-j) + "pval' title='" + income + "'>"+
		"</span> " + income + " , <span id='l" + (4-j) + "val'> " + incomepersecond + " </span></div> ]";
		test1.appendChild(test2);
		test0.appendChild(test1);
		td6 = test0;
		
		var cellText = td6;
        td5.appendChild(cellText);
        td4.appendChild(td5);
        td3.appendChild(td4);}

		var td4 = document.createElement("tr");
        var td5 = document.createElement("td");
		td5.setAttribute("colspan", "2");
		
		td4.appendChild(td5);
		td2.appendChild(td4);
		td1.appendChild(td2);
        td1.appendChild(td3);
        target.appendChild(td1);
        		
		function updValues() {
		for (var j = 0; j < 4; j++) {
		var ljal = document.getElementById("l" + (4-j) + "val").innerHTML;
		document.getElementById("l" + (4-j) + "val").innerHTML = formatTime(toSeconds(ljal) - 1);
		var secondsLeft = toSeconds(ljal);
		var wholeRes = document.getElementById("l" + (4-j));
		var income = wholeRes.getAttribute("title");
		var incomepersecond = income / 3600;
		wholeRes = wholeRes.innerHTML;
		wholeRes = wholeRes.split("/");
		var resNow = wholeRes[0];
		var fullRes = wholeRes[1];
		var spaceLeft = fullRes - resNow;			
		document.getElementById("l" + (4-j) + "pb");}
		setTimeout(updValues, 1000);}
		window.onLoad = updValues();
