// ==UserScript==
// @name PasteFromClipboard
// @description User Script, который выполняет вставку текста из буфера обмена 
// @author Bazaleev Nickolay
// @license MIT
// @version 1.0
// @include http://pult_server/*
// @include http://localhost*
// ==/UserScript==

// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window) {
    'use strict';

    function handlePaste(e) {
        var eventTarget, clipboardDataFormat, bufferData, clip, trans, str, strLength;

        // Перечисление формат данных для функции getData
        clipboardDataFormat = {
            Text: 'Text',
            URL: 'URL'
        };

        if (!e) {
            e = window.event;
        }

        if (e.target) {
            eventTarget = e.target;
        } else if (e.srcElement) {
            eventTarget = e.srcElement;
        }

        if (eventTarget) {
            if (eventTarget.type === 'text' && !eventTarget.disabled) {
                if (window.clipboardData && window.clipboardData.getData) {// Webkit - get data from clipboard, put into editdiv, cleanup, then cancel even
                    if (window.clipboardData.types) {  //Поддерживает Safari для события onpaste
                        if (/text\/html/.test(window.clipboardData.types)) {
                            eventTarget.value = window.clipboardData.getData('text/html');
                        } else if (/text\/plain/.test(window.clipboardData.types)) {
                            eventTarget.value = window.clipboardData.getData('text/plain');
                        } else {
                            eventTarget.value = '';
                        }
                    } else {
                        bufferData = window.clipboardData.getData(clipboardDataFormat.Text);
                        if (typeof (bufferData) !== "undefined" && bufferData !== null) {
                            eventTarget.value = bufferData;
                        }
                    }
                } else if (navigator.appCodeName.toLowerCase() === 'mozilla') {
                    try {
                        // Statement below for scripts running under ussual window
                        //netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

                        //this is for user scripts
                        if (unsafeWindow) {
                            unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

                            clip = Components.classes["@mozilla.org/widget/clipboard;1"].getService(Components.interfaces.nsIClipboard);
                            trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
                            if (clip && trans) {
                                trans.addDataFlavor("text/unicode");
                                clip.getData(trans, clip.kGlobalClipboard);
                                str = {};
                                strLength = {};
                                trans.getTransferData("text/unicode", str, strLength);
                                if (str) {
                                    str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
                                    bufferData = str.data.substring(0, strLength.value / 2);
                                    eventTarget.value = bufferData;
                                }
                            }
                        }
                    } catch (ex) {
                        alert(ex.message);
                    }
                } else {// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
                    return true;
                }
            }
        }

        return true;
    }

    var w;  //textBoxes,i

    // [2] нормализуем window
    if (typeof unsafeWindow !== "undefined") {
        w = unsafeWindow;
    } else {
        w = window;
    }

    // В юзерскрипты можно вставлять практически любые javascript-библиотеки. 
    // Код библиотеки копируется прямо в юзерскрипт. 
    // При подключении библиотеки нужно передать w в качестве параметра окна window 
    // Пример: подключение jquery.min.js 
    // (function(a,b){function ci(a) ... a.jQuery=a.$=d})(w);

    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self !== w.top) {
        return;
    }

    // [4] дополнительная проверка наряду с @include
    if (/http:\/\/pult_server/.test(w.location.href) || /http:\/\/localhost/.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта

        //        textBoxes = document.getElementsByTagName('input');

        //        for (i = 0; i < textBoxes.length; i++) {
        //            if (textBoxes[i].type === "text") {
        //                if (textBoxes[i].attachEvent) {
        //                    textBoxes[i].attachEvent('onclick', handlePaste);
        //                } else {
        //                    textBoxes[i].addEventListener('click', handlePaste, false);
        //                }
        //            }
        //        }

        if (document.attachEvent) {
            document.attachEvent('onclick', handlePaste);
        } else {
            addEventListener('click', handlePaste, false);
        }

        alert("Userscripts loaded.");
    }
} (window));