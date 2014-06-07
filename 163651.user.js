// ==UserScript==
// @name          Autograder Enhancer
// @namespace     http://personal.utulsa.edu/~christian-mann
// @description	  Adds a summary to the top of the autograded page, detailing pass/fail for each test
// @include       http://129.244.240.152/~papama/perl/*
// @version       1.2.1
// ==/UserScript==

Object.prototype.nextObject = function() {
	var n = this;
	do n = n.nextSibling;
	while (n && n.nodeType != 1);
	return n;
}

Object.prototype.previousObject = function() {
	var n = this;
	do n = n.previousSibling;
	while (n && n.nodeType != 1);
	return n;
}


// STYLES
var styleSheet = document.createElement('style')
document.body.appendChild(styleSheet)


// LANDING PAGE - wrap each label in a <label> tag
var inputs = document.getElementsByTagName('input');
for(var i = 2; i < inputs.length; i++) {
	console.log(inputs[i]);
	var kid = inputs[i].nextObject();
	var wrapper = document.createElement('label');
	wrapper.setAttribute('for', inputs[i].id);
	wrapper.appendChild(kid);
	inputs[i].parentNode.appendChild(wrapper);
	
	////hide "Priority Grader 4"
	//if(inputs[i].getAttribute('id') == "pg4") {
	//	inputs[i].style.display = "none";
	//	inputs[i].checked = "false";
	//	wrapper.style.display = "none";
	//}
}



// RESULTS SCREEN

//Remove "Thread woke up at" messages
document.body.innerHTML = document.body.innerHTML.replace(/Thread woke up at(.)*?<br>/g, '');

//Look for valid or invalid array references
document.body.innerHTML = document.body.innerHTML.replace(/(A\[\d+\]=\d+)/g, "<span id=\"reference\">$1</span>")
document.body.innerHTML = document.body.innerHTML.replace(/(A\[(\d+)\]=\2)/g, "<span id=\"valid\">$1</span>")
styleSheet.appendChild(document.createTextNode('.reference { color: red; } .reference.valid { color: royalBlue }'))

//Split the page by <hr>
var pageHtml = document.body.innerHTML;
var sectionArray = pageHtml.split("<hr>");
var resultArray = [];
//For each section, find the title and pass/fail
for( var i = 1; i < sectionArray.length; i++) {
	var _title = sectionArray[i].match(/[A-Z][a-z]+ Grader \d/);
	if(!(_title)) return;
	//look for "passed!"
	if(sectionArray[i].search("passed!") != -1) {
		resultArray[i-1] = {
			pass : true,
			certain : true,
			title : _title[0]
		};
	} 
	//failing that, look for "failed"
	else if(sectionArray[i].search("failed") != -1
	     || sectionArray[i].search("at nachos.machine.Machine.main") != -1
	     || sectionArray[i].search("at java.lang.Thread.run") != -1
	     || _title == "Read Grader 1"  && sectionArray[i].search("This is Mauricio saying hello from a file!") == -1
		 || _title == "Read Grader 2"  && sectionArray[i].search("<span id=\"reference\">A") != -1
		 || _title == "Priority Grader 4"  && sectionArray[i].search("<span id=\"reference\">A") != -1
	     || _title == "Write Grader 1" && sectionArray[i].search("This is Mauricio saying Hello to a file") == -1
	     || _title == "Close Grader 2" && sectionArray[i].search("Closing the screen..We shouldn't be able to print anything else<br>Machine halting!") == -1
	     || _title == "Write Grader 2" && sectionArray[i].search("test passes if there is no output]<br><br><br>Done with test script") == -1) {
		resultArray[i-1] = {
			pass : false,
			certain : true,
			title : _title[0]
		};
	}
	else if (_title == "Read Grader 1"  && sectionArray[i].search("This is Mauricio saying hello from a file!") != -1
		  || _title == "Read Grader 2"  && sectionArray[i].search("<span id=\"reference\">A") == -1
		  || _title == "Priority Grader 4"  && sectionArray[i].search("<span id=\"reference\"><span id=\"valid\">A") == -1
	      || _title == "Write Grader 1" && sectionArray[i].search("This is Mauricio saying Hello to a file") != -1
	      || _title == "Close Grader 2" && sectionArray[i].search("Closing the screen..We shouldn't be able to print anything else<br>Machine halting!") != -1
	      || _title == "Write Grader 2" && sectionArray[i].search("test passes if there is no output]<br><br><br>Done with test script") != -1) {
	 	resultArray[i-1] = {
	 		pass : true,
	 		certain : true,
	 		title : _title[0]
	 	}     
	}
	else {
		resultArray[i-1] = {
			pass : false,
			certain : false,
			title : _title[0]
		};
	}
}

//Give each <hr> an id to link to later
var hrElems = document.getElementsByTagName('hr');
for(var i = 0; i < hrElems.length; i++) {
	hrElems[i].id = 'test'+i;
}

//Now create the necessary table
var table = document.createElement('table');
table.style.position = "absolute";
table.style.top = "25px";
table.style.right = '650px';
table.style.border = '1px solid black';
table.style.borderCollapse = 'collapse';
table.style.fontFamily = 'arial, sans-serif';
for(var i = 0; i < resultArray.length; i++) {
	var row = document.createElement('tr');
	
	var titleCell = document.createElement('td');
	var link = document.createElement('a');
	link.href = '#test'+i;
	link.innerHTML = resultArray[i].title;
	titleCell.style.padding = "5px";
	titleCell.style.border = "1px solid black";
	titleCell.style.textAlign = "right";
	titleCell.appendChild(link);
	row.appendChild(titleCell);
	
	var passFailCell = document.createElement('td');
	if(resultArray[i].pass) {
		passFailCell.style.color = "#006100";
		passFailCell.style.backgroundColor = "#C6EFCE";
		passFailCell.innerHTML = "Passed!";
	} else if(resultArray[i].certain) {
		passFailCell.style.color = "#9C0006";
		passFailCell.style.backgroundColor = "#FFC7CE";
		passFailCell.innerHTML = "Failed";
	} else {
		passFailCell.style.color = "black";
		passFailCell.style.backgroundColor = "white";
		passFailCell.innerHTML = "Unknown";
	}
	passFailCell.style.padding = "5px";
	passFailCell.style.border = "1px solid black";
	row.appendChild(passFailCell);
	table.appendChild(row);
}
document.body.appendChild(table);
