// ==UserScript==
// @name          Ylilauta Word Filter
// @namespace     Ylilauta Word Filter
// @description   Hides posts/threads if blacklisted word or filename is found from the list at /preferences.
// @include       http://ylilauta.org/*
// @include       https://ylilauta.org/*
// @require       http://static.ylilauta.org/js/jquery.js
// @author        Ville Rouhiainen
// @version       1.2
// ==/UserScript==

(function() {
    'use strict';
    var posts, blacklistWords, blacklistWordsInFiles, threads, i, from, threadNumber, files, file, isThread, useOldLayout, hideUpperHr, event, word, wordToSave, blacklistWordsArray, blacklistWordsInFilesArray, fileWord, inputValue, filterType;
    posts = '.post p';
    threads = '.op_post .post p';
    files = '.fileinfo a';
    file = false;
    blacklistWordsArray = JSON.parse(localStorage.getItem('blacklistWords'));
    blacklistWordsInFilesArray = JSON.parse(localStorage.getItem('blacklistWordsInFiles'));
    useOldLayout = JSON.parse(localStorage.getItem('isUsingOldLayout'));
    if (blacklistWordsArray === null || blacklistWordsArray === "") {
            localStorage.setItem('blacklistWords', JSON.stringify(''));
    }
    if (blacklistWordsInFilesArray === null || blacklistWordsInFilesArray === "") {
            localStorage.setItem('blacklistWordsInFiles', JSON.stringify(''));
    }
    if (useOldLayout === null || useOldLayout === "") {
            localStorage.setItem('useOldLayout', JSON.stringify('false'));
    }

    function saveData(filterType) {
        if (filterType === 'word') {
            blacklistWords = [];
            $('#words .word').each(function() {
                wordToSave = $(this).text();
                blacklistWords.push(wordToSave);
            });
            localStorage.setItem('blacklistWords', JSON.stringify(blacklistWords));
        } else {
            blacklistWordsInFiles = [];
            $("#wordsFiles .wordFile").each(function() {
                wordToSave = $(this).text();
                blacklistWordsInFiles.push(wordToSave);
            });
            localStorage.setItem('blacklistWordsInFiles', JSON.stringify(blacklistWordsInFiles));
        }

    }

    function formatData(filterType) {
        if (filterType === "word") {
            localStorage.setItem('blacklistWords', JSON.stringify(''));
        } else {
            localStorage.setItem('blacklistWordsInFiles', JSON.stringify(''));
        }
        saveData(filterType);
    }

    function printWords() {
        blacklistWordsArray = JSON.parse(localStorage.getItem('blacklistWords'));
        if (blacklistWordsArray === null || blacklistWordsArray === "") {
            localStorage.setItem('blacklistWords', JSON.stringify(''));
        } else {
            for (i = 0; i < blacklistWordsArray.length; i++) {
                $('#words input').before('<span class="word">' + blacklistWordsArray[i] + '</span>');
            }
        }
        blacklistWordsInFilesArray = JSON.parse(localStorage.getItem('blacklistWordsInFiles'));
        if (blacklistWordsInFilesArray === null || blacklistWordsInFilesArray === "") {
            localStorage.setItem('blacklistWordsInFiles', JSON.stringify(''));
        } else {
            for (i = 0; i < blacklistWordsInFilesArray.length; i++) {
                $('#wordsFiles input').before('<span class="wordFile">' + blacklistWordsInFilesArray[i] + '</span>');
            }
        }
    }

    function postContains(blacklistWords, from, file) {
        if (file === false) {
            blacklistWordsArray = JSON.parse(localStorage.getItem('blacklistWords'));
            for (i = 0; i < blacklistWordsArray.length; i++) {
                if ($(from).text().toLowerCase().indexOf(blacklistWordsArray[i]) !== -1) {
                    return true;
                }
            }
        } else {
            blacklistWordsInFilesArray = JSON.parse(localStorage.getItem('blacklistWordsInFiles'));
            for (i = 0; i < blacklistWordsInFilesArray.length; i++) {
                if ($(from).text().toLowerCase().indexOf(blacklistWordsInFilesArray[i]) !== -1) {
                    return true;
                }
            }
        }
    }

    $(document).ready(function() {

        $(posts).each(function() {
            from = this;
            if (postContains(blacklistWords, from, file)) {
                $(from).closest('.answer').hide();
            }
        });

        $(threads).each(function() {
            from = this;
            if (postContains(blacklistWords, from, file)) {
                threadNumber = $(from).parent().attr('id');
                threadNumber = threadNumber.replace(/\D/g, '');
                $('#thread_' + threadNumber).hide();
                $('#hr_' + threadNumber).hide();
            }
        });

        $(files).each(function() {
            from = this;
            file = true;
            if (postContains(blacklistWordsInFiles, from, file)) {
                if (useOldLayout) {
                    isThread = $(this).parents().closest('.answer').parent().attr('id');
                    hideUpperHr = $(this).parents().prev().closest("hr");
                    if (typeof isThread === 'undefined') {
                        threadNumber = $(this).parents().closest('.thread').parent().attr('id');
                        threadNumber = threadNumber.replace(/\D/g, '');
                        $('#thread_' + threadNumber).hide();
                        $('#hr_' + threadNumber).hide();
                    } else {
                        $(this).closest('.answer').hide();
                    }
                } else {
                    isThread = $(this).parents().closest('.op_post').attr('id');
                     if (typeof isThread === 'undefined') {
                        $(this).closest('.answer').hide();
                    } else {
                        threadNumber = isThread;
                        threadNumber = threadNumber.replace(/\D/g, '');
                        $('#thread_' + threadNumber).hide();
                        $('#hr_' + threadNumber).hide();
                        $(hideUpperHr).hide();
                    }
                }
            }
        });
        
        if($(location).attr('href').match(/preferences/i)) {
            $('table#hiddenboards').before('<table class="preferences"><tr><th colspan="6">Word Filter</th></tr><tr><td>Suodata lankoja ja postauksia viestien sisällön perusteella.</td></tr><tr><td><div id="words"><input type="text" value="" id="word" placeholder="Lisää sana ja paina enter" /> </div></td></tr></table><table class="preferences"><tr><th colspan="6">Filename Filter</th></tr><tr><td>Suodata lankoja ja postauksia tiedostonimen perusteella.</td></tr><tr><td><div id="wordsFiles"><input type="text" value="" id="wordFile" placeholder="Lisää tiedostonimi ja paina enter" /> </div></td></tr></table>');

            if ($('#oldstyle').is(':checked')) {
                localStorage.setItem('isUsingOldLayout', true);
            } else {
                localStorage.setItem('isUsingOldLayout', false);
            }

            $('#words input, #wordsFiles input').on('focusout', function() {
                word = $(this).val();
                fileWord = $(this).val();
                if ($(this).attr('id') === 'word') {
                    inputValue = 'word';
                } else {
                    inputValue = 'fileWord';
                }
                if (word !== '' || fileWord !== '') {
                    if ($(this).attr('id') === 'word') {
                        $(this).before('<span class="word">' + word.toLowerCase() + '</span>');
                    } else {
                        $(this).before('<span class="wordFile">' + fileWord.toLowerCase() + '</span>');
                    }
                    $('#words input, #wordsFiles input').val('');
                    formatData(inputValue);
                }
            }).on('keydown', function(event) {
                if (/(188|13)/.test(event.which)) { // trigger on enter or comma
                    event.preventDefault();
                    $('#words input, #wordsFiles input').focusout();
                } 
            });

            $('#words, #wordsFiles').on('click','.word, .wordFile',function(){
                $(this).remove();
                if ($(this).hasClass('word')) {
                    inputValue = 'word';
                } else {
                    inputValue = 'wordFile';
                }
                formatData(inputValue);
            });

            $('#oldstyle').on('change', function(){
                if ($('#oldstyle').is(':checked')) {
                    localStorage.setItem('isUsingOldLayout', true);
                } else {
                    localStorage.setItem('isUsingOldLayout', false);
                }
            });
            
            // maybe put these on .css file? Cleaner and faster. http://rouhiainen.net/ylilautaWordFilter.css
            $('head').append($('<style>#words, #wordsFiles{border: 0px solid #ccc;float: left;padding: 0px;}#words input, #wordsFiles input {margin: 3px 0px 0px 10px;}#words span.word, #wordsFiles span.wordFile {background: #FCFFBE;border: 1px solid #000000;cursor: pointer;color: #000000;display: block;padding: 4px;float: left;margin: 2px;padding-right: 25px;border-radius: 6px;}#words span.word:hover, #wordsFiles span.wordFile:hover{opacity: 0.7;}#words span.word:after, #wordsFiles span.wordFile:after {padding: 0px 3px 0px 3px;margin: -1px 0px 0px 5px;position: absolute;border: 1px solid;content: "x";}</style>'));
            printWords();
        }
    });
}());
