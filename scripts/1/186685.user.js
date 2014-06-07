// ==UserScript==
  
// @name            Gorep selecteren
// @author          Aus
// @version         0.5
// @description     Selecteert de juiste groep
// @include         http://*.tribalwars.nl/game.php*screen=report*
  
// ==/UserScript==

(function (f) {
    var d = document,
        s = d.createElement('script');
    s.textContent = '$(document).ready(' + f.toString() + ')';
    (d.body || d.head || d.documentElement).appendChild(s);
})(function () {

    if(game_data.screen == "report") {
        
        var groupselect = $('<button id="groupselect">Groep opslaan</button>');
        groupselect.insertAfter('#report_list');
        $('#groupselect').click(function() {
            
            var groep = $("select[name='group_id']").val();
            
            localStorage["Groepkiezer"]=groep;
			
    
  });
	
		localStorage["Groepkiezer"];
		$('select option[value=groep]').prop('selected', true)
		
		
     
        
		
	
    }}
   



    
});