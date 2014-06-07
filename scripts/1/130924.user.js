// ==UserScript==
// @name         Leumi details
// @include        https://hb2.bankleumi.co.il*ExtendedActivity.aspx*
// @author       Oren Roth
// @description  
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	//console.log('start');
	var $dataTable = $(".dataTable");

	$dataTable.find("tr:first").append("<th>הערות</th>");
	$dataTable.find("tr:gt(0)").each(function(){
		var $row = $(this),
			ref 	= $.trim($row.find('.ReferenceNumberUniqeClass').text()),
			date 	= $.trim($row.find('.DateUniqeClass').text()).replace(/\//g, ""),
			id 		= ref + date,
			val 	= localStorage.getItem(id) === null ? "" : localStorage.getItem(id) ;

		$row.append("<td><input style='border: 1px solid #DDD;' type='text' class='dataNotes' id='" + id + "' value='" + val + "' /></td>");
		$('.dataNotes').each(function(){
			$(this).keydown(function(event) {
			  
			     var $note = $(this);
			     //event.preventDefault();
			     //save here
			     //console.log('saved...');
			     setTimeout ( function(){saveNote($note.attr('id'),$note.val());},10 );  

			   
			});
		});
	});

	function saveNote(noteId,msg){
		localStorage.setItem(noteId,msg);
	}

}


// load jQuery and execute the main function
addJQuery(main);