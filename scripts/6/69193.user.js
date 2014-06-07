// ==UserScript==
// @name           DirectGov Job Hider
// @description    Allows you to permanently toggle the visibility of jobs in the search results by clicking on the job number
// @include        http://jobseekers.direct.gov.uk/*
// ==/UserScript==

var timestamp = Math.round(new Date().getTime() / 1000.0);

function jobHideToggle(event)
{
	// Get the <tr>
	var jobRow = event.target.parentNode.parentNode.parentNode;

	// Get the job number from the contents of the <a> e.g. "Job No: XXX/12345"
	var jobNum = event.target.textContent.split(": ");

	// Toggle the opacity and save
	var jobHidden = GM_getValue("DGJob_" + jobNum[1], 0);
	if (jobHidden != 0)
	{
		GM_deleteValue("DGJob_" + jobNum[1]);
		jobRow.style.opacity = 1;
	}
	else
	{
		GM_setValue("DGJob_" + jobNum[1], Math.round(new Date().getTime() / 1000.0));
		jobRow.style.opacity = 0.2;
	}

	// Block default link behavour
	event.stopPropagation();
	event.preventDefault();
}

function jobClear()
{
	var values = GM_listValues();
	var jobHidden = 0;

	for (var i in values)
	{
		jobHidden = GM_getValue(values[i], 0);

		// Update to a timestamp to ensure backwards compatability with earlier script version
		if (jobHidden == 1)
		{
			GM_setValue(values[i], timestamp);
			continue;
		}

		// If older than 28 days remove from storage
		if ((jobHidden - 2419200) < 0)
			GM_deleteValue(values[i]);
	}
}

function jobHideInit()
{
	var table = document.getElementById("dgResultList"); 
	if (table == null)
	{
		return;
	}

	var row = table.getElementsByTagName("tr");
	for (var i = 1; i < row.length; i++) // i = 1 to skip header
	{
		// Get the last <p> in the first <td> of each <tr>
		var jobContent = row[i].firstElementChild.lastElementChild;
	
		// Get the contents e.g. "Job No: XXX/12345"
		var jobText = jobContent.textContent;

		// Add the <a> to the text so its more obvious you have to click it
		row[i].firstElementChild.lastElementChild.innerHTML = "<a href='#'>" + jobText + "</a>";

		// Add a listener to catch when a user clicks on the <a>
		row[i].firstElementChild.lastElementChild.firstElementChild.addEventListener("click", jobHideToggle, true);

		// Split the string so we are just left with the job number
		var jobNum = jobText.split(": ");

		// Check if the job has been hidden previously
		var jobHidden = GM_getValue("DGJob_" + jobNum[1], 0);
		if (jobHidden != 0)
		{
			row[i].style.opacity = 0.2;
			GM_setValue("DGJob_" + jobNum[1], timestamp); // Update the timestamp
		}
	} 
	jobClear()
}

window.addEventListener("load", jobHideInit, false);
