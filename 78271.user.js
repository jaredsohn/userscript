// ==UserScript==
// @name           Jobseekers direct helper
// @namespace      http://www.manicphase.org
// @description    Let's you put markers on jobs to say unsuitable or interesting
// @include        http://jobseekers.direct.gov.uk/*
// ==/UserScript==

//varioos boring shits
	
//put stuff in global storage

/*document.body.innerHTML += "<script type='text/javascript' src='http://code.jquery.com/jquery-nightly.js'/>";
console.log("asjdia");
console.log($('divTitle') == null);
console.log("asdasd");
unsafeWindow.globalStorage[document.location.host]["lololololol"] = "wait"
*/
//document.getElementsByClassName("JobTitle HorizontalSeparator")[0].childNodes[5].innerHTML = "<s>lolol</s>"
// ^^^^that's to find and replace job reference numbers innit^^^^

unsafeWindow.hide = function(id) {
	console.log("id is:"+id.toString());
	if(id == id.toString())
		id = document.getElementById(id);
	if(id && id.style)
		id.style.visibility = "hidden";
};
unsafeWindow.show = function(id) {
	console.log("id is:"+id.toString());
	if(id == id.toString())
		id = document.getElementById(id);
	if(id && id.style)
		id.style.visibility = "";
};

window.addEventListener("submit", function(e){ 
	console.log("form submit");
	console.log("aaaa"+e.toString());
	notes = document.getElementById('cheese').value;
	document.getElementById("chalk").innerHTML = notes.replace(/(\+)([^\+\-\#]*)/g, "<font color='blue'>$2</font>")
				.replace(/(\-)([^\+\-\#]*)/g, "<font color='red'>$2</font>")
				.replace(/#/g,'');
	jobNo = document.getElementById("parJobNo").innerHTML;
	GM_setValue(jobNo, notes);
}, true);

unsafeWindow.submitNote = function() {
	unsafeWindow.hide("cheese");
	unsafeWindow.show("chalk");
	
	console.log(notes);
	console.log(jobNo);
	return false;
};


if (document.location.href.match("listjob") == "listjob")
{
	//coad for teh list page
	for (x in document.getElementsByClassName("JobTitle HorizontalSeparator"))
	{
		jobNo = document.getElementsByClassName("JobTitle HorizontalSeparator")[x].childNodes[5].innerHTML.split(" ")[2];
		console.log(jobNo);
		status = GM_getValue(jobNo);
		console.log(status);
		if (status != undefined)
		{
			status = status
				.replace(/(\+)([^\+\-\#]*)/g, "<font color='blue'>$2</font>")
				.replace(/(\-)([^\+\-\#]*)/g, "<font color='red'>$2</font>")
				.replace(/#/g,'');
			document.getElementsByClassName("JobTitle HorizontalSeparator")[x].childNodes[5].innerHTML = "<s>Job No: " + jobNo + "</s> <font color = 'grey'>" + status + "</font color>";
		}
	}
}

else if (document.location.href.match("detailjob") == "detailjob")
{
	//coad for individual jobes
	//notes bar
	notes = document.createElement("div");
	notes.style.position = "relative";
	notes.style.height = "20px";
	notes.style.innerHTML = "";
	//notes.innerHTML = "<div style='position:absolute;'>";
	jobNo = document.getElementById("parJobNo").innerHTML;
	notes.innerHTML += "<form onSubmit='return submitNote();'><input id='cheese' style='left:0px; width:90%; visibility:hidden; position:absolute;' value='"+GM_getValue(jobNo)+"'></input></form>";
	if (GM_getValue(jobNo) == undefined){
		notes.innerHTML += "<span id='chalk' style='left:0px; color:grey; position:absolute; ' onClick='hide(\"chalk\"); show(\"cheese\"); return false;'>[Click to edit notes]</span>";
	}
	else {
		notes.innerHTML += "<span id='chalk' style='left:0px; color:grey; position:absolute; ' onClick='hide(\"chalk\"); show(\"cheese\"); return false;'>"
		+GM_getValue(jobNo)
		.replace(/(\+)([^\+\-\#]*)/g, "<font color='blue'>$2</font>")
				.replace(/(\-)([^\+\-\#]*)/g, "<font color='red'>$2</font>")
				.replace(/#/g,'')
		+"</span>";
	}
	//notes.innerHTML += "</div>";
	document.getElementById("divTitle").childNodes[1].appendChild(notes)
	console.log(GM_getValue(jobsNo) + "in thingy");
	//get the numero for the jobby
	
	console.log(jobNo);
	//GM_setValue(jobNo, "Already read");
	console.log("not crashed");

}