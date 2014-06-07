// ==UserScript== 
 // @name		ClassRou2 
 // @namespace		PylonPants
 // @description	In TrophyManager.com shows Routine Class 
 // @include		*trophymanager.com/players/* 
 // @exclude		*trophymanager.com/players 
 // @exclude		*trophymanager.com/players/compare/* 
 // @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js

 // ==/UserScript== 
 
/*
 * Find the table holding the routine.
 * Luckily this is the only one having the class 'info_table'
 */
 
// get array of all tables
tables = document.getElementsByTagName('table');


// this variable will be the reference to the desired table
container = null;

console.log("xhep "+tables);

// iterate through them
for( i=0; i<tables.length; i++)
{
	// get class name

	element_class = tables[i].className;
	
	// if the element has more than one class, these will be separated by a blank space
	class_list = element_class.split(" ");
	
	// iterate through the class list, and check if one of them is 'info_table'

	for ( j=0; j<class_list.length; j++)
	{
		if (class_list[j]=="info_table")
			container = tables[i];
	}
	
	// if table has been found, stop iteration

	if (container!=null)
		break;
}

//alert(container.innerHTML);


// execute the following code only if the table has been found.
// applies if the player doesn't exist or has retired
if (container!=null)
{
	// la ultima fila corresponde a la routine
	rows = container.getElementsByTagName('tr');
	routine_row = rows[rows.length-1];

	//alert(routine_row.innerHTML);

	// la ultima celda contiene la routine
	cells = routine_row.getElementsByTagName('td');
	routine_cell = cells[cells.length-1];

	// get routine value
	routine = routine_cell.innerHTML;

	//Ahora repetimos el proceso para la edad

	// la 7a fila empezando por abajo corresponde a la edad

	rows = container.getElementsByTagName('tr');
	age_row = rows[rows.length-7];

	//alert(age_row.innerHTML);

	// la ultima celda contiene la age
	cells = age_row.getElementsByTagName('td');
	age_cell = cells[cells.length-1];


	// get routine value
	age = age_cell.innerHTML;
	new_age = age.replace(/[^\d]/g, '');
	years = new_age.substring(0, 2);
	months = new_age.substring(2);
	monthstoyears = months/12;
	resultado = years + monthstoyears;
	careeryears = resultado-15
	careerextended = Math.pow(careeryears, 1.05)

	// compute new routine and display max 2 decimals
	new_routine = Math.round( routine/2 *100) /100;


	// update cell
	routine_cell.innerHTML = routine + ' - ' + resultado;
}