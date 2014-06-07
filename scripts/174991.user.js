// ==UserScript==
// @name            Coursera EXT - Quiz option cross-out
// @description     Coursera Extension -- enables the user to temporary disable some quiz answers/options (eg. the obvious incorrect ones)
// @namespace       http://sepczuk.com/
// @version         0.10
// @include         https://*.coursera.org/*/quiz/attempt*
// @match           https://*.coursera.org/*/quiz/attempt*
// @include         https://*.coursera.org/*/exam/attempt*
// @match           https://*.coursera.org/*/exam/attempt*
// @copyright       2013, Damian Sepczuk, damian at sepczuk period delme com
// @downloadURL     https://userscripts.org/scripts/source/174991.user.js
// @updateURL       https://userscripts.org/scripts/source/174991.user.js
// ==/UserScript==

function mainWrapper(){
    var debug = !false;
    var US_SHORT_NAME = 'CourseraEXT-QACO';
    var US_VERSION = 0.01;
    
  	function debugLog(msg) {
        if (!debug) return;
        console.log(US_SHORT_NAME + ": " + msg);
  	}
    
    function disableQuizOption(qo) {
        $(qo).css('opacity','.3').prop('disabled', true)
        	.children('.cext-toggle-this-one').html('&#9675;').end()
            .children('input').prop('disabled', true).next().css('text-decoration', 'line-through').css('cursor','default');
    }
    
    function enableQuizOption(qo) {
        $(qo).css('opacity','').prop('disabled', false)
        	.children('.cext-toggle-this-one').html('&#9679;').end()
        	.children('input').prop('disabled', false).next().css('text-decoration', '').css('cursor','pointer');
    }
    
    function toggleQuizOption(qo) {
        if ($(qo).prop('disabled') === true) {
            enableQuizOption(qo);
        } else {
            disableQuizOption(qo);
        }
    }
    
    function main(){
        debugLog("Running main!");
        var stylesheetText = (function(){/*!HTML!
        <style type="text/css">
        .cext-choose-this-one {
            font-size: 140%;
            font-family: monospace;
            margin-right: 2px;
            cursor: cell;
            vertical-align: top;
            color: #aaa;
        }
        
        .course-disabled-quiz-option {
        	opacity: .3;
            pointer-events: none;            
        }

        .cext-toggle-this-one {
            font-size: 130%;
            font-family: monospace;
            margin-right: 7px;
            cursor: pointer;
            vertical-align: top;
            color: #aaa;
            line-height: 17px;
        }
        
        .cext-toggle-question {
        	line-height: 0px;
			color: #999;
			position: absolute;
			left: -40px;
            top: 20px;
        }
        
        .course-quiz-question-number {
        	position: relative;
        	cursor: pointer;
            background-color: rgb(234, 234, 234);
            padding-left: 10px;
        }
        </style>
        */}).toString().slice(21,-3);
        
        $(stylesheetText).appendTo('head');
        
        var chooseThisOne = $('<span class="cext-choose-this-one">&#9758;</span>').click(function(){
            var quizOption = this.parentElement;
            var allButMe = $(quizOption).parent().children().not(quizOption);
			var otherEnabled = allButMe.filter(':not([disabled])');
            var amIEnabled = $(quizOption).prop('disabled') !== true;
            
            if (otherEnabled.length === 0) {
                enableQuizOption(allButMe);
            } else {
                disableQuizOption(otherEnabled);
                enableQuizOption(quizOption);
                
                if($(quizOption).children('input').attr('type')==='radio') {
                    $(quizOption).children('input').click();
                }
            }
        });
        
        var toggleThisOne = $('<span class="cext-toggle-this-one">&#9679;</span>').click(function(){
            toggleQuizOption(this.parentElement);
        });
        
        var toggleQuestion = $('<span class="cext-toggle-question">&#9679;</span>');
        
        $('.course-quiz-option').prepend(toggleThisOne).prepend(chooseThisOne);
        $('.course-quiz-question-number').prepend(toggleQuestion).toggle(
        function(){
            $(this).parent().css('opacity', '.3');
            $(this).children('.cext-toggle-question').html('&#9675;');
        },
        function(){
            $(this).parent().css('opacity', '');
            $(this).children('.cext-toggle-question').html('&#9679;');
        });
        
        $('.course-quiz-submit-button-container input[type=submit]').click(function(){
            enableQuizOption($('.course-quiz-option'));
        });
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}