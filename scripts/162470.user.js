// ==UserScript==
// @name        Решалка тестов МТИ
// @namespace   /
// @include     http://lms.mti.edu.ru/mod/quiz/attempt.php?attempt=*
// @version     2
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==


var updateQuestions = function(otvety) {
    GM_setValue("last_answers", jQuery('#otvety').val());
    jQuery('.formulation').each(function(){
        var el = jQuery(this);
        var q = jQuery.trim( el.find( '.qtext' ).text().replace(/\s+/gm, '') );
        var afterQ = otvety.split(q)[1];

        if(!afterQ) return true;
        var bestIndex, bestAnswer, bestLength;
        el.find('.answer > div').each(function(){
            var $answer = jQuery(this);
            var answer = jQuery.trim( $answer.find('label').text().replace(/\s+/gm, '') );
            var aIndex = afterQ.indexOf( answer );
        
            if(aIndex == -1) return true;
            if(!bestIndex || aIndex < bestIndex || (aIndex == bestIndex && bestLength < answer.length) ){
                bestLength = answer.length;
                bestIndex = aIndex;
                bestAnswer = $answer;
            }        
        });
    
        if(bestAnswer)
            bestAnswer.find('input').attr('checked', true);
    
    })
}

jQuery(document).ready(function(){
    
	jQuery('#navbar').after( 'Копируйте ответы сюда -> <br><textarea style="width:700px; heigth: 150px;" id="otvety" /><br><input type="button" id="answerBtn" value="Сделай мне заебись!">' );
    jQuery('#otvety').val( GM_getValue('last_answers')||'' );
    jQuery('#answerBtn').click(function(){
         updateQuestions( jQuery('#otvety').val().replace(/\s+/gm, '') );
        jQuery('[name=next]').trigger('click');
    })
});
