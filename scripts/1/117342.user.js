// ==UserScript==
// @name           StackOverflowImTooStupidMarker
// @namespace      StackOverflowImTooStupidMarker
// @description    Allows you to hide questions on Stack Overflow when you can't answer them.
// @include        http://stackoverflow.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var idListString = GM_getValue('idList', '');
var idList = idListString.split(',');
GM_setValue('idList', idList.join(','));

function getId (idString)
{
    return idString.split('-')[2];
}

function removeQuestion (e)
{
    var id = getId(e.data.questionSummaryDiv.id);

    $(e.data.questionSummaryDiv).hide(250);

    idList.push(id);

    setTimeout(function() {
        GM_setValue('idList', idList.join(','));
    }, 0);

    return false;
}

$('div.question-summary').each(function (index, questionSummaryDiv)
{
    var id = getId(questionSummaryDiv.id);

    if (idList.indexOf(id) != -1)
    {
        $(questionSummaryDiv).hide();

        return;
    }

    var link = $('<a><em>(Too Stupid)</em></a>');

    link.attr('href', '#' + questionSummaryDiv.id);

    link.click({questionSummaryDiv: questionSummaryDiv}, removeQuestion);

    $('div.started', questionSummaryDiv).append(link);
});