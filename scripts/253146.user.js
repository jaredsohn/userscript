// ==UserScript==
// @name       DOU: autoquote
// @version    0.8
// @description  automatically inserts selecion as quotation into reply form 
// @match      http://dou.ua/forums/topic/*
// @grant none
// @copyright  2014+, skyboy
// ==/UserScript==
(function () {
    var selectors = {
        floatForm: '#floatForm',
        inlineForm: '#inlineForm',
        commentEntry: '.comment',
        placeHoldered: '.placeholdered',
        topicContent: '.l-content .b-content-page'
    };
    
    function isQuotationInvoked (event) {
        return event.shiftKey; // script should works if we select text with Shift pressed only
    }
    
    function getSelection () {
        return window.getSelection().toString();
    }
    
    function isTextSelected () {
        return !!getSelection();
    }
    
    function isAnswerFormShown () {
        return $(selectors.floatForm).parents(selectors.commentEntry).length > 0;
    }
    
    function isTheSameCommentBeingReplying (commentEl) {
        var parentBlock = $(selectors.floatForm).parents(selectors.commentEntry)[0];
        return parentBlock && parentBlock === commentEl;
    }
    
    function addQuote ($form, selection) {
        var txt = $form.find('textarea');
        selection = "<blockquote>" + selection + "</blockquote>";
        if (!txt.is(selectors.placeHoldered)) {
            selection = "\n" + selection;
        }
        txt[0].focus();
        txt.val(txt.val() + selection);
        txt[0].blur();
        txt.trigger('change');
    }
    
    $('body').on('mouseup', selectors.commentEntry, function (ev) {
        if (isQuotationInvoked(ev) && isTextSelected() && isAnswerFormShown() && isTheSameCommentBeingReplying(this)) {
            addQuote($(selectors.floatForm), getSelection());
        }
    })
    
    $('body').on('mouseup', selectors.topicContent, function (ev) {
        if (!isQuotationInvoked(ev) || !isTextSelected()) return;
        if (isAnswerFormShown()) {
            addQuote($(selectors.floatForm), getSelection());
        } else {
            addQuote($(selectors.inlineForm), getSelection());
        }
    })
})()