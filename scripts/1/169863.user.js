// ==UserScript==
// @name       Pinboard Notes save draft
// @namespace  nietky.scripts
// @version    0.2
// @description  hit ctrl+S on the "add note" or while editing a note, and it will save your draft copy
// @include    http*://notes.pinboard.in/*
// @include    http*://pinboard.in/note/add/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @copyright  2013
// ==/UserScript==

$(document).ready(function () {
    var current = window.location.pathname;
    text = '';
    existing = $('textarea').val();
    if (current.match(/note\/add/)) {
        console.log('Adding note.');
        localStorage.setItem('pinboard_note_autosave_key', 'draft');
        text = localStorage.getItem('pinboard_note_autosave_draft');
        if (text != null) {
            $('textarea').val(text);
            console.log('Restored draft');// (' + text + ')');
        }
    }
    if (current.match(/\/[a-z0-9]+\/edit/)) {
        console.log('Editing note.');
        id = current.match(/[a-z0-9]+/g);
        localStorage.setItem('pinboard_note_autosave_key', id[2]);
        text = localStorage.getItem('pinboard_note_autosave_' + id[2]);
        if (text != null) {
            $('textarea').val(text);
            console.log('Restored note ID=' + id[2]);// + ' (' + text + ')');
        }
    }
});

$(window).keydown(function(event) {
    if (!( String.fromCharCode(event.which).toLowerCase() == 's' && event.ctrlKey) && !(event.which == 19)) return true;
    text = $('textarea').val();
    key_suffix = localStorage.getItem('pinboard_note_autosave_key');
    key = 'pinboard_note_autosave_' + key_suffix;
    localStorage.setItem(key, text);
    console.log('Saved note ID=' + key_suffix);// + ' (' + text + ')');
    return false;
});