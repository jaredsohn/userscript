// ==UserScript==
// @name       Envoi éclair de troupes
// @version    1.0
// @description  enter something useful
// @match      http://*.guerretribale.fr/game.php?*&screen=place*
// @copyright  2013, tondeuse
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==



function addButtonAttaqueMultiple(){ 
    
    $('#target_support').parent().after("<button id='mult_attack' tabindex='17' class='attack' name='attack'  style='font-size: 10pt;'>x4 Attaque</button>");
    $('#units_form').after("<div id='validation'></div>");
    $('#validation').hide();
}



$(document).ready(function () {
    
    
    
    addButtonAttaqueMultiple();
    
    $('#mult_attack').click(function(){
        
        var dataToSend = $('#units_form').serialize();
        var url =  $('#units_form').attr('action');
        
        dataToSend+= '&attack=Attaque';
        
        var i =0;
        var count =0;
        
        for(i =0; i<4; i++){
            
            $.ajax({
                type:'POST',
                url: url,
                data:dataToSend ,
                success: function(data){
                    
                    try{
                        var dataToWrite = $(data).find('form').attr('id', 'validation_form');
                        
                        $('#validation').html(dataToWrite);  
                    }
                    catch(err){
                    }
                    
                    var dataToSendValidation = $('#validation_form').serialize();
                    var urlValidation =  $('#validation_form').attr('action');
                    
                    $.ajax({
                        type:'POST',
                        url:urlValidation,
                        data:dataToSendValidation,
                        success:function(){
                            if(count==3){
                                location.reload();
                            }
                            count++;
                        }
                    });
                    
                }               
            });
            
        }
        
         
        
        return false;
    });
    
    
});