/*

Copyright (c) 2013 Yuriy Yushin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
// ==UserScript==
// @name       SG Small Improvements
// @namespace  http://yuriyyushin.info/
// @version    0.1
// @description  Small improvements
// @include      http://www.steamgifts.com/*
// @include      http://steamgifts.com/*
// @license      MIT License
// @copyright  2013+, Yusyuriv
// ==/UserScript==

(function() {
    var K = 'SG_SMALL_IMPROVEMENTS_';
    var R = 'REMEMBER';
    var C = 'COMMENT_AND_ENTER';
    var S = 'CREATING_SEARCH';
    var FW = 'FILTER_WHAT';
    var FR = 'FILTER_REGEXP';
    var TL = 'TOPICS_LIST';
    var T = 'TOPIC';
    
    var data;
    if(localStorage[K]) {
        data = { }
        data[R] = JSON.parse(localStorage[K+R]);
        data[C] = JSON.parse(localStorage[K+C]);
        data[S] = JSON.parse(localStorage[K+S]);
        data[FW] = localStorage[K+FW];
        data[FR] = JSON.parse(localStorage[K+FR]);
        data[TL] = JSON.parse(localStorage[K+TL]);
    } else {
        data = { }
        data[R] = true;
        data[C] = false;
        data[S] = true;
        data[FW] = 'thanks|thanks.|thanks!|thank you|thank you.|thank you!|thank you!!!|ty|ty!|thx|thx!|thanks!:)|thanks:)|thanks! :)|thanks :)';
        data[FR] = false;
        data[TL] = { };
        
        localStorage[K] = 1;
        localStorage[K+R] = data[R];
        localStorage[K+C] = data[C];
        localStorage[K+S] = data[S];
        localStorage[K+FW] = data[FW];
        localStorage[K+FR] = data[FR];
        localStorage[K+TL] = JSON.stringify(data[TL]);
    }
    
    var body = document.querySelector('body');
    var wrapper = document.querySelector('.wrapper');
    var featured = document.querySelector('.featured');
    
    function createSettings(){
        var settings = document.createElement('div');
        settings.style.width = '75%';
        settings.style.height = '100%';
        settings.style.margin = '0 auto';
        
        var divRemember = document.createElement('div');
        divRemember.style.border = '1px solid #000';
        divRemember.style.borderRadius = '5px';
        divRemember.style.marginTop = '7px';
        divRemember.style.padding = '7px';
        var labelRemember = document.createElement('label');
        labelRemember.innerHTML = ' <span>Remember where you leave comments in the topic</span>';
        labelRemember.style.display = 'block';
        labelRemember.style.cursor = 'pointer';
        var checkboxRemember = document.createElement('input');
        checkboxRemember.type = 'checkbox';
        checkboxRemember.checked = data[R];
        checkboxRemember.onchange = function(e) {
            data[R] = e.currentTarget.checked;
            localStorage[K+R] = e.currentTarget.checked;
        }
        labelRemember.insertBefore(checkboxRemember, labelRemember.firstChild);
        divRemember.appendChild(labelRemember);
        settings.appendChild(divRemember);
        
        var divCreatingSearch = document.createElement('div');
        divCreatingSearch.style.border = '1px solid #000';
        divCreatingSearch.style.borderRadius = '5px';
        divCreatingSearch.style.marginTop = '7px';
        divCreatingSearch.style.padding = '7px';
        var labelCreatingSearch = document.createElement('label');
        labelCreatingSearch.innerHTML = ' <span>Add search to the page of creating giveaway</span>';
        labelCreatingSearch.style.display = 'block';
        labelCreatingSearch.style.cursor = 'pointer';
        var checkboxCreatingSearch = document.createElement('input');
        checkboxCreatingSearch.type = 'checkbox';
        checkboxCreatingSearch.checked = data[S];
        checkboxCreatingSearch.onchange = function(e) {
            data[S] = e.currentTarget.checked;
            localStorage[K+S] = e.currentTarget.checked;
        }
        labelCreatingSearch.insertBefore(checkboxCreatingSearch, labelCreatingSearch.firstChild);
        divCreatingSearch.appendChild(labelCreatingSearch);
        settings.appendChild(divCreatingSearch);
        
        var divEnter = document.createElement('div');
        divEnter.style.border = '1px solid #000';
        divEnter.style.borderRadius = '5px';
        divEnter.style.marginTop = '7px';
        divEnter.style.padding = '7px';
        var labelEnter = document.createElement('label');
        labelEnter.innerHTML = ' <span>Enter to giveaway when you comment it</span>';
        labelEnter.style.display = 'block';
        labelEnter.style.cursor = 'pointer';
        var checkboxEnter = document.createElement('input');
        checkboxEnter.type = 'checkbox';
        checkboxEnter.checked = data[C];
        checkboxEnter.onchange = function(e) {
            data[C] = e.currentTarget.checked;
            localStorage[K+C] = e.currentTarget.checked;
        }
        labelEnter.insertBefore(checkboxEnter, labelEnter.firstChild);
        divEnter.appendChild(labelEnter);
        settings.appendChild(divEnter);
        
        var divHide = document.createElement('div');
        divHide.style.border = '1px solid #000';
        divHide.style.borderRadius = '5px';
        divHide.style.marginTop = '7px';
        divHide.style.padding = '7px';
        var labelHide = document.createElement('label');
        labelHide.innerHTML = ' <span>Regular expression (use <strong>only if you know what are you doing</strong>), for example: ^.*thanks|thx.*$</span>';
        labelHide.style.display = 'block';
        labelHide.style.cursor = 'pointer';
        var checkboxHide = document.createElement('input');
        checkboxHide.type = 'checkbox';
        checkboxHide.checked = data[FR];
        checkboxHide.onchange = function(e) {
            data[FR] = e.currentTarget.checked;
            localStorage[K+FR] = e.currentTarget.checked;
        }
        labelHide.insertBefore(checkboxHide, labelHide.firstChild);
        var inputHide = document.createElement('input');
        inputHide.style.width = '500px';
        inputHide.value = data[FW];
        var btnHide = document.createElement('input');
        btnHide.type = 'button';
        btnHide.value = 'Save';
        btnHide.onclick = function() {
            data[FW] = inputHide.value;
            localStorage[K+FW] = inputHide.value;
        }
        divHide.innerHTML = 'What to replace: ';
        divHide.appendChild(inputHide);
        divHide.appendChild(btnHide);
        divHide.appendChild(document.createElement('br'));
        divHide.appendChild(labelHide);
        settings.appendChild(divHide);
        
        if(featured)
            featured.innerHTML = '<h1 style="color: #fff; text-shadow: 1px 1px 2px #ccc; text-align: center;">SG Small Improvements</h1>';
        wrapper.innerHTML = '';
        wrapper.appendChild(settings);
    }
    var hash = location.hash;
    var footer_sm__right = document.querySelector('.footer_sm .right');
    footer_sm__right.innerHTML = '<a href="/SGSmallImprovements" style="margin-right: 15px;">SG Small Improvements</a>' + footer_sm__right.innerHTML;
    if(hash == '#SGSmallImprovements' || location.pathname == '/SGSmallImprovements') {
        createSettings();
    } else {
        var path = location.pathname;
        if(path.indexOf('/giveaway/') === 0 && data[C]) {
            var form = document.querySelector('#comment_form form');
            var abilityToEnter = !!document.querySelector('#form_enter_giveaway [name="enter_giveaway"][value="1"]');
            
            if(form && abilityToEnter) {
                var enterGiveawayHidden = document.createElement('input');
                enterGiveawayHidden.type = 'hidden';
                enterGiveawayHidden.name = 'enter_giveaway';
                enterGiveawayHidden.value = '1';
                form.appendChild(enterGiveawayHidden);
                
                document.querySelector('[name="submit_comment"]').value = 'Submit Comment and Enter';
            }
            if(data[FW]) {
                var whatToReplace = data[FR] ?new RegExp(data[FW], 'gi') :data[FW].toLowerCase().split('|');
                var comments = document.querySelectorAll('.comment_body p');
                for(var i = 0; i < comments.length; i++) {
                    var comment = comments[i].innerHTML.toLowerCase();
                    if(data[FR]) {
                        if(whatToReplace.test(comment)) {
                            comments[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                        }
                    } else {
                        for(var j = 0; j < whatToReplace.length; j++) {
                            console.log([comment, whatToReplace[j]]);
                            if(comment == whatToReplace[j]) {
                                comments[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                                break;
                            }
                        }
                    }
                }
            }
        } else if(path.indexOf('/create') === 0 && data[S]) {
            var searchBar = document.createElement('input');
            searchBar.style.width = '400px';
            searchBar.placeholder = 'Enter a part of the game\'s title here';
            var gamesListContainer = document.querySelector('[name="game_id"]');
            var gamesList;
            if(gamesListContainer.type != 'hidden'){
                gamesListContainer.size = 8;
                gamesList = gamesListContainer.childNodes;
                var gamesArray = {};
                for(var i = 0; i < gamesList.length; i++) {
                    gamesArray[gamesList[i].innerHTML] = gamesList[i].value;
                }
                gamesList = null;
                gamesListContainer.parentNode.insertBefore(searchBar, gamesListContainer);
                
                var timeout;
                
                function searchGame() {
                    var searchStr = searchBar.value.toLowerCase();
                    timeout = null;
                    while(gamesListContainer.firstChild) {
                        gamesListContainer.removeChild(gamesListContainer.firstChild);
                    }
                    
                    for(var key in gamesArray) {
                        if(key.toLowerCase().indexOf(searchStr) != -1) {
                            var option = document.createElement('option');
                            option.innerHTML = key;
                            option.value = gamesArray[key];
                            gamesListContainer.appendChild(option);
                        }
                    }
                }
                
                searchBar.onkeyup = function() {
                    if(timeout) {
                        clearTimeout(timeout);
                    }
                    timeout = setTimeout(searchGame, 500);
                }
            }
        } else if(path.indexOf('/forum') === 0 && data[R]) {
            var str = '';
            if(/^\/forum\/[\d\w]{5}(\/.*)?$/i.test(path)) {
                var subkey = path.substr(7, 5);
                var key = K+T+subkey;
                var userlink = document.querySelector('#navigation ol li:nth-child(3) ul li:nth-child(1) a').href;
                var commentsHere = {};
                if(document.querySelector('.author a:nth-child(2)').href == userlink) {
                    data[TL][subkey] = document.querySelector('.content .discussions .row .details .title a').innerHTML.substr(0, 30);
                }
                var comments = document.querySelectorAll('.comment .author_name a');
                if(comments) {
                    var current, p;
                    var page = path.match(/\/page\/(\d{1,})$/);
                    page = page ?page[1] :1;
                    for(var i = 0; i < comments.length; i++) {
                        if(comments[i].href == userlink) {
                            current = comments[i].parentNode.parentNode.parentNode;
                            if(current.class != 'comment' && current.class != 'child_container')
                                current = current.parentNode;
                            if(current.class != 'comment' && current.class != 'child_container')
                                current = current.parentNode;
                            if(current.class != 'comment' && current.class != 'child_container')
                                current = current.parentNode;
                            console.log(current)
                            p = current.querySelector('.comment_body p');
                            if(p) {
	                            commentsHere[current.id] = p.innerText.substr(0, 30);
                            }
                        }
                    }
                    var keys = {};
                    if(localStorage[key]) {
                        keys = JSON.parse(localStorage[key]);
                    }
                    keys[page] = commentsHere;
                    localStorage[key] = JSON.stringify(keys);
                }
                /*comments = document.querySelectorAll('.comment.child .author_name a');
                if(comments) {
                    var current, p;
                    var page = path.match(/\/page\/(\d{1,})$/);
                    page = page ?page[1] :1;
                    for(var i = 0; i < comments.length; i++) {
                        if(comments[i].href == userlink) {
                            current = comments[i].parentNode.parentNode.parentNode.parentNode;
                            p = current.querySelector('.comment_body p');
                            if(p) {
	                            commentsHere[current.id] = p.innerText.substr(0, 30);
                            }
                        }
                    }
                    var keys = {};
                    if(localStorage[key]) {
                        keys = JSON.parse(localStorage[key]);
                    }
                    keys[page] = commentsHere;
                    localStorage[key] = JSON.stringify(keys);
                }*/
                localStorage[K+TL] = JSON.stringify(data[TL]);
                key = localStorage[key];
                if(key) {
	                var data = JSON.parse(key);
                    var substr = '';
                    for(var page in data) {
                        substr = '<h3>Page '+page+'</h3><br>'
                        var commentsCount = 0;
                        for(var comment in data[page]) {
                            substr += '<a href="/forum/'+subkey+'/page/'+page+'#'+comment+'">'+data[page][comment]+'</a> | ';
                            commentsCount++;
                        	console.log('fff', ' ', comment);
                        }
                        console.log('fff', ' ', commentsCount);
                        if(commentsCount)
	                        substr += '<hr>';
                        else
                            substr = '';
                    }
                    str += substr;
                }
            } else {
                for(var topic in data[TL]) {
                    str += '<a href="/forum/' + topic + '/">'+data[TL][topic]+'</a> | ';
                }
                str = str.substr(0, str.length - 3);
            }
            if(str != '') {
	            str = '<div style="border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 5px;">' + str + '</div>';
                var div = document.createElement('div');
                div.innerHTML = str;
	            var discussions = document.querySelector('.content .discussions');
	            discussions.parentNode.insertBefore(div, discussions);
            }
        }
            }
 })();