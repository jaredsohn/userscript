// ==UserScript==
// @name           Sort Course Table
// @namespace      law.georgetown.edu
// @include        http://www.law.georgetown.edu/curriculum/tab_schedules.cfm*
// @author		   Peter Guarnieri
// ==/UserScript==

function resetFilter()
{
	var table = document.getElementById('schedMain');
	var rows = table.firstElementChild.children;
	for(var i = 1; i < rows.length; i++)
	{
		rows[i].style.display = '';
	}
}

function lessThanFilter()
{
	var credits = document.getElementById("lessThanInputField").value;
	if(isNaN(credits) || credits < 1)
	{
		alert("Please enter a number of credits greater than zero.");
		return;
	}
	var table = document.getElementById('schedMain');
	credits = parseInt(credits);
	var rows = table.firstElementChild.children;
	
	for(var i = 1; i < rows.length; i++)
	{
		rows[i].style.display = '';
	}
	
	for(var i = 1; i < rows.length; i++)
	{

		if(rows[i].childNodes[5] != null)
		{
			var numCredits = rows[i].childNodes[5].innerHTML;
			if (!isNaN (numCredits)) 
			{
				numCredits = parseInt(numCredits);
				if(numCredits >= credits)
				{
					var className = rows[i].className;
					
					rows[i].style.display = 'none';
					if(i+1 < rows.length)
					{
				
						var nextRow = rows[i+1];
						if(nextRow.className == className)
						{
							nextRow.style.display = 'none';
							i = i +1;
							if(i+1 < rows.length)
							{
								nextRow = rows[i+1];
								if(nextRow.className == className)
								{
									nextRow.style.display = 'none';
									i = i +1;
								}
							}
						}
					}
				}
			} 
			else
			{
				alert("not number");
			}
		}
	} 
}

function greaterThanFilter()
{
	var credits = document.getElementById("greaterThanInputField").value;
	if(isNaN(credits) || credits < 1)
	{
		alert("Please enter a number of credits greater than zero.");
		return;
	}
	var table = document.getElementById('schedMain');
	credits = parseInt(credits);
	var rows = table.firstElementChild.children;
	
	for(var i = 1; i < rows.length; i++)
	{
		rows[i].style.display = '';
	}
	
	for(var i = 1; i < rows.length; i++)
	{

		if(rows[i].childNodes[5] != null)
		{
			var numCredits = rows[i].childNodes[5].innerHTML;
			if (!isNaN (numCredits)) 
			{
				numCredits = parseInt(numCredits);
				if(numCredits <= credits)
				{
					var className = rows[i].className;
					
					rows[i].style.display = 'none';
					if(i+1 < rows.length)
					{
				
						var nextRow = rows[i+1];
						if(nextRow.className == className)
						{
							nextRow.style.display = 'none';
							i = i +1;
							if(i+1 < rows.length)
							{
								nextRow = rows[i+1];
								if(nextRow.className == className)
								{
									nextRow.style.display = 'none';
									i = i +1;
								}
							}
						}
					}
				}
			} 
			else
			{
				alert("not number");
			}
		}
	} 
}

function equalToFilter()
{
	var credits = document.getElementById("equalToInputField").value;
	if(isNaN(credits) || credits < 1)
	{
		alert("Please enter a number of credits greater than zero.");
		return;
	}
	var table = document.getElementById('schedMain');
	credits = parseInt(credits);
	var rows = table.firstElementChild.children;
	
	for(var i = 1; i < rows.length; i++)
	{
		rows[i].style.display = '';
	}
	
	for(var i = 1; i < rows.length; i++)
	{

		if(rows[i].childNodes[5] != null)
		{
			var numCredits = rows[i].childNodes[5].innerHTML;
			if (!isNaN (numCredits)) 
			{
				numCredits = parseInt(numCredits);
				if(numCredits != credits)
				{
					var className = rows[i].className;
					
					rows[i].style.display = 'none';
					if(i+1 < rows.length)
					{
				
						var nextRow = rows[i+1];
						if(nextRow.className == className)
						{
							nextRow.style.display = 'none';
							i = i +1;
							if(i+1 < rows.length)
							{
								nextRow = rows[i+1];
								if(nextRow.className == className)
								{
									nextRow.style.display = 'none';
									i = i +1;
								}
							}
						}
					}
				}
			} 
			else
			{
				alert("not number");
			}
		}
	} 
}

var div = document.getElementById("courseLetters");

var newBR1 = document.createElement('br');
var newBR2 = document.createElement('br');
div.appendChild(newBR1);
div.appendChild(newBR2);

var resetButton = document.createElement('input');
resetButton.setAttribute('id','resetButton');
resetButton.setAttribute('name','resetButton');
resetButton.setAttribute('type','submit');
resetButton.setAttribute('value','Reset Filters');
resetButton.addEventListener("click", resetFilter, false); 

div.appendChild(resetButton);

var newBR3 = document.createElement('br');
div.appendChild(newBR3);

/********** less than filter *****************/
var lessThanDiv = document.createElement('div');

lessThanDiv.innerHTML = 'Credits are less than ';

var lessThanInputField = document.createElement('input');
lessThanInputField.setAttribute('id','lessThanInputField');
lessThanInputField.setAttribute('name','lessThanInputField');
lessThanInputField.setAttribute('type','text');

lessThanDiv.appendChild(lessThanInputField);

var lessThanButtonField = document.createElement('input');
lessThanButtonField.setAttribute('id','lessThanButtonField');
lessThanButtonField.setAttribute('name','lessThanInputField');
lessThanButtonField.setAttribute('type','submit');
lessThanButtonField.setAttribute('value','Filter');
lessThanButtonField.addEventListener("click", lessThanFilter, false); 

lessThanDiv.appendChild(lessThanButtonField);

//newanchor.addEventListener("click", lessThan, false); 
div.appendChild(lessThanDiv);


/********** greater than filter *****************/
var greaterThanDiv = document.createElement('div');

greaterThanDiv.innerHTML = 'Credits are greater than ';

var greaterThanInputField = document.createElement('input');
greaterThanInputField.setAttribute('id','greaterThanInputField');
greaterThanInputField.setAttribute('name','greaterThanInputField');
greaterThanInputField.setAttribute('type','text');

greaterThanDiv.appendChild(greaterThanInputField);

var greaterThanButtonField = document.createElement('input');
greaterThanButtonField.setAttribute('id','greaterThanButtonField');
greaterThanButtonField.setAttribute('name','greaterThanInputField');
greaterThanButtonField.setAttribute('type','submit');
greaterThanButtonField.setAttribute('value','Filter');
greaterThanButtonField.addEventListener("click", greaterThanFilter, false); 

greaterThanDiv.appendChild(greaterThanButtonField);

div.appendChild(greaterThanDiv);


/********** equal filter *****************/
var equalToDiv = document.createElement('div');

equalToDiv.innerHTML = 'Credits are exactly ';

var equalToInputField = document.createElement('input');
equalToInputField.setAttribute('id','equalToInputField');
equalToInputField.setAttribute('name','equalToInputField');
equalToInputField.setAttribute('type','text');

equalToDiv.appendChild(equalToInputField);

var equalToButtonField = document.createElement('input');
equalToButtonField.setAttribute('id','equalToButtonField');
equalToButtonField.setAttribute('name','equalToInputField');
equalToButtonField.setAttribute('type','submit');
equalToButtonField.setAttribute('value','Filter');
equalToButtonField.addEventListener("click", equalToFilter, false); 

equalToDiv.appendChild(equalToButtonField);

div.appendChild(equalToDiv);