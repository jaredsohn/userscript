// ==UserScript==
// @name        testthisshit

// @description Russian:testanswer
// @include     http*
// @version     0.1a
// @run-at      document-start
// @icon        data:image/png;base64,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
// ==/UserScript==

//Based in http://userscripts.org/guides/471
var changed = false; // script need to be edited with
var redirector = /[\s\t]*if[\n\s\t]*\([a-z0-9$_()\.\n\s\t]+===?[a-z0-9$_()\.\n\s\t]+\)[\n\s\t]*{?[\n\s\t]*(top|window|self|document)[\n\s\t]*\.[\n\s\t]*location[\n\s\t]*=[\n\s\t]*['"](https?:\/\/[^'"]+)['"];?[\n\s\t]*}?/i;
var escaped_content = /unescape[\n\s\t]*\(['"]([^'"]+)['"]\)/i;
var encoded = false;
var scripts = Array();
var link_avoided = ""
var user_lang = navigator.userLanguage || navigator.language;
function goToItem(itemIndex)
{
    var curItemIndex = parseInt($("#currentItemIndex").val(), 10);
    if (curItemIndex == itemIndex)
        return;
    
    var answer = getAnswer();
    
    // показ подсказок в режиме обучения
    if ($('#mode').val() == 'self-control' )
    {
        var correctAnswer = checkAnswerAndShowPrompt();
        
        var newAnswer = answer;
        var prevAnswer = $("#answerForm").data('prevAnswer');

        // корректное сравнение массивов и строк
        var changedAnswer = prevAnswer < newAnswer || newAnswer < prevAnswer;
        if (changedAnswer && !correctAnswer)
        {
            $("#answerForm").data('prevAnswer', newAnswer);// сохраняем ответ
            return;
        }
    }
    
    
}


