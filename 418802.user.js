// ==UserScript==
// @name           ReplaceR
// @description    Repace numbers on last names and highlights color scores
// @include        http://iasu.npi-tu.ru/progress/application/attgroup/2502*
// @copyright      GODofART
// @version        1.0.4
// @updateURL       http://userscripts.org/scripts/source/418802.user.js
// @downloadURL     http://userscripts.org/scripts/source/418802.user.js
// @grant       none
// ==/UserScript==
(function () {

    'use strict';


    /*
        NOTE:  
            You can use \\* to match actual asterisks instead of using it as a wildcard!
            The examples below show a wildcard in use and a regular asterisk replacement.
    */

    var words = {
    ///////////////////////////////////////////////////////


        // Syntax: 'Search word' : 'Replace word',
        '1302029' : 'Агасиев',
        '1302030' : 'Асадулаев',
        '1302031' : 'Базарный',
        '1302032' : 'Беккер',
        '1302033' : 'Долинин',
        '1302034' : 'Ерхов',
        '1302035' : 'Забродин',
        '1302036' : 'Иванков',
        '1302037' : 'Ильин',
        '1302038' : 'Клишина',
        '1302039' : 'Кондрацкий',
        '1302040' : 'Кумышев',
        '1302041' : 'Кутурга',
        '1302042' : 'Лихолетов',
        '1302043' : 'Лысенко',
        '1302044' : 'Палагичев',
        '1302045' : 'Пивоваров',
        '1302046' : 'Радимцев',
        '1302047' : 'Романов',
        '1302048' : 'Савченко',
        '1302049' : 'Сафронов',
        '1302051' : 'Смирнов',
        '1302050' : 'Смирнова',
        '1302052' : 'Усеинов',
        '1302053' : 'Хеирбекова',
        '1302054' : 'Хромов',
        '1302055' : 'Худяков',
        '1302056' : 'Чеботаев',
        '1302057' : 'Чирков',
        '1302058' : 'Шамилов',

    ///////////////////////////////////////////////////////
    '':''};











    //////////////////////////////////////////////////////////////////////////////
    // This is where the real code is
    // Don't edit below this
    //////////////////////////////////////////////////////////////////////////////

    var regexs = [], replacements = [],
        tagsWhitelist = ['PRE', 'BLOCKQUOTE', 'CODE', 'INPUT', 'BUTTON', 'TEXTAREA'],
        rIsRegexp = /^\/(.+)\/([gim]+)?$/,
        word, text, texts, i, userRegexp;

    // prepareRegex by JoeSimmons
    // used to take a string and ready it for use in new RegExp()
    function prepareRegex(string) {
        return string.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, '\\$1');
    }

    // function to decide whether a parent tag will have its text replaced or not
    function isTagOk(tag) {
        return tagsWhitelist.indexOf(tag) === -1;
    }

    delete words['']; // so the user can add each entry ending with a comma,
                      // I put an extra empty key/value pair in the object.
                      // so we need to remove it before continuing

    // convert the 'words' JSON object to an Array
    for (word in words) {
        if ( typeof word === 'string' && words.hasOwnProperty(word) ) {
            userRegexp = word.match(rIsRegexp);

            // add the search/needle/query
            if (userRegexp) {
                regexs.push(
                    new RegExp(userRegexp[1], 'g')
                );
            } else {
                regexs.push(
                    new RegExp(prepareRegex(word).replace(/\\?\*/g, function (fullMatch) {
                        return fullMatch === '\\*' ? '*' : '[^ ]*';
                    }), 'g')
                );
            }

            // add the replacement
            replacements.push( words[word] );
        }
    }

    // do the replacement
    texts = document.evaluate('//body//text()[ normalize-space(.) != "" ]', document, null, 6, null);
    for (i = 0; text = texts.snapshotItem(i); i += 1) {
        if ( isTagOk(text.parentNode.tagName) ) {
            regexs.forEach(function (value, index) {
                text.data = text.data.replace( value, replacements[index] );
            });
        }
    }
document.body.innerHTML= document.body.innerHTML.replace(/11<\/td>/g,"<div style=\"color: #159fd8; font-size: 12px;\"><b>11<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/12<\/td>/g,"<div style=\"color: #159fd8; font-size: 12px;\"><b>12<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/13<\/td>/g,"<div style=\"color: #159fd8; font-size: 12px;\"><b>13<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/14<\/td>/g,"<div style=\"color: #159fd8; font-size: 12px;\"><b>14<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/15<\/td>/g,"<div style=\"color: #da8b31; font-size: 12px;\"><b>15<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/16<\/td>/g,"<div style=\"color: #da8b31; font-size: 12px;\"><b>16<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/17<\/td>/g,"<div style=\"color: #da8b31; font-size: 12px;\"><b>17<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/18<\/td>/g,"<div style=\"color: #75b200; font-size: 12px;\"><b>18<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/19<\/td>/g,"<div style=\"color: #75b200; font-size: 12px;\"><b>19<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/20<\/td>/g,"<div style=\"color: #75b200; font-size: 12px;\"><b>20<\/b><\/div><\/td>");
document.body.innerHTML= document.body.innerHTML.replace(/224070\"> <\/a>/g,"224070\">Лушков<\/a>");

}());
