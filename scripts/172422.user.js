// ==UserScript==
// @name        Feedly Search
// @namespace   http://nodaguti.usamimi.info/
// @description Add search box on Feedly
// @include     http://cloud.feedly.com/*
// @include     https://cloud.feedly.com/*
// @version     0.1
// @author      nodaguti
// @license     MIT License
// @grant       GM_log
// @grant       GM_addStyle
// ==/UserScript==

(function(window, document){

var DB_NAME = 'feedly-search-entries';
var DB_VERSION = 1;
var DB_STORE_NAME = 'entries';
var DB = null;

var timeline = document.getElementById('box');

var SEARCH_ICON = "data:image/png;base64,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";

var STYLE = "\
    .hidden{\
        display: none !important;\
    }\
\
    .invisible{\
        visibility: hidden !important;\
    }\
\
    #feedlySearchBoxContainer{\
        position: absolute;\
        top: 0;\
        right: 0;\
        z-index: 99999;\
        color: rgb(102, 102, 102);\
        background-color: rgb(245, 245, 245);\
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);\
        border: 1px solid rgb(190, 190, 190);\
        padding: 1em;\
    }\
\
    #feedlySearchBoxContainer input[type='text']{\
        border: 1px #bfbfbf solid;\
        border-radius: 3px;\
        color: #444;\
        padding: 3px;\
    }\
    #feedlySearchBoxContainer button,\
    #feedlySearchBoxContainer input[type='checkbox'],\
    #feedlySearchBoxContainer select{\
        background-image: linear-gradient(to bottom, #ededed, #ededed 38%, #dedede);\
        border: 1px #ccc solid;\
        border-radius: 3px;\
        box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);\
        color: #444;\
        text-shadow: 0 1px 0 #f0f0f0;\
        padding: 2px 10px;\
        margin: 0 5px;\
    }\
    #feedlySearchBoxContainer button::-moz-focus-inner{\
        border: 0 !important;\
        padding: 0 !important;\
    }\
    #feedlySearchBoxContainer form{\
        margin: 0;\
    }\
\
    #feedlySearchOptions{\
        margin-top: 5px;\
        font-size: 90%;\
        color: #333;\
    }\
\
    #feedlySearchLoading{\
        width: 12px;\
        height: 12px;\
        border-radius: 50%;\
        border: 3px solid #333;\
        border-right-color: transparent;\
        animation: spin 1s linear infinite;\
        display: inline-block;\
        vertical-align: middle;\
        margin-left: 0.5em;\
    }\
\
    @keyframes spin{\
        0% { transform: rotate(0deg); opacity: 0.2; }\
        50% { transform: rotate(180deg); opacity: 1.0; }\
        100% { transform: rotate(360deg); opacity: 0.2; }\
    }\
\
    #feedlySearchHitList{\
        list-style: none;\
        margin-top: 3em;\
    }\
    #feedlySearchHitList > li{\
        margin: 1em 0;\
        list-style: none;\
    }\
    #feedlySearchHitList a{\
        color: #1122CC !important;\
    }\
    .feedlySearchResultTitle{\
        font-size: 130%;\
    }\
    .feedlySearchResultSource{\
        display: inline-block;\
        margin-left: 0.5em;\
        font-size: 80%;\
        color: #888;\
    }\
    .feedlySearchResultSource::before{\
        content: '(';\
    }\
    .feedlySearchResultSource::after{\
        content: ')';\
    }\
    .feedlySearchResultBody{\
        padding: 1em 0 0 2.5em;\
        width: 80%;\
        font-size: 110%;\
        max-height: 200px;\
        overflow: hidden;\
    }\
    .feedlySearchResultBody:hover{\
        max-height: auto;\
    }";



var FeedlySearch = {

    init: function(){
        //Add observer
        var observer = new MutationObserver(function(mutations){
            this.addEntries();
        }.bind(this));

        observer.observe(timeline, { childList: true, subtree: true });

        //Open database
        this.openDatabase();

        //Add search button
        setTimeout(this.addSearchButton, 3000);

        GM_addStyle(STYLE);
    },


    addSearchButton: function(){
        //Search Button
        var img = document.createElement("img");
        img.id = "pageActionSearch";
        img.className = "pageAction";
        img.width = "20";
        img.height = "20";
        img.border = "0";
        img.src = SEARCH_ICON;
        img.dataset.appAction = "search";
        img.title = "Search";

        var parent = document.querySelector("#feedlyPageHeader > .pageActionBar");
        if(!parent) return;

        parent.appendChild(img);

        img.addEventListener('click', function(){
            var rect = document.getElementById('feedlyPageHeader').getBoundingClientRect();
            var searchbox = document.getElementById('feedlySearchBoxContainer');

            //Adjust position of search box
            searchbox.style.top = (rect.bottom + 5) + 'px';
            searchbox.style.right = (document.documentElement.clientWidth - rect.right) + 'px';

            //Show search box
            searchbox.classList.toggle('hidden');

            //Focus search box
            document.getElementById('feedlySearchBox').focus();
        }, false);


        //Search Box
        var searchBoxTag = '' +
            '<form action="" onsubmit="FeedlySearch.search(document.getElementById(\'feedlySearchBox\').value);return false;">'+
                '<input type="text" id="feedlySearchBox" title="Split by whitepace to AND search" />'+
                '<button type="submit">Search</button>'+
                '<div id="feedlySearchLoading" class="invisible" title="Click to abort searching"></div>'+
                '<div id="feedlySearchOptions">'+
                    '<label><input type="checkbox" id="feedlySearchTitle" checked="checked" /> Title</label>  '+
                    '<label><input type="checkbox" id="feedlySearchURL" checked="checked" /> URL</label>  '+
                    '<label><input type="checkbox" id="feedlySearchBody" checked="checked" /> Body</label>  '+
                    '<label><input type="checkbox" id="feedlySearchRegExp" /> RegExp</label>'+
                '</div>'+
            '</form>';

        var container = document.createElement('div');
        container.id = 'feedlySearchBoxContainer';
        container.classList.add('hidden');
        document.body.appendChild(container);
        container.innerHTML = searchBoxTag;

        setTimeout(function(){
            document.getElementById('feedlySearchLoading').addEventListener('click', function(){
                FeedlySearch.abortSearch();
            }, false);
        })
    },


    openDatabase: function(){
        var req = window.indexedDB.open(DB_NAME, DB_VERSION);

        req.onerror = this.onError;
        req.onupgradeneeded = this.createDatabase;
        req.onsuccess = function(event){
            GM_log('Success: Opening the database.');
            DB = event.target.result;
        }
    },


    createDatabase: function(event){
        var objectStore = event.target.result.createObjectStore(DB_STORE_NAME, { keyPath: "id" });

        GM_log("Success: Creating objectStore.");
    },


    resetDatabase: function(){
        DB.transaction([DB_STORE_NAME], "readwrite").objectStore(DB_STORE_NAME).clear();
    },


    addEntries: function(){
        GM_log("Adding new entries...");

        var transaction = DB.transaction([DB_STORE_NAME], "readwrite");
        transaction.onerror = this.onError;
        transaction.oncomplete = this.onAllEntriesAdded;

        var objectStore = transaction.objectStore(DB_STORE_NAME);

        //unread articles
        var unreadEntries = Array.slice(timeline.getElementsByClassName('u0Entry')).filter(function(item){
            return item.getElementsByClassName('unread').length > 0;
        });

        unreadEntries.forEach(function(entry){
            var id = entry.dataset.inlineentryid;
            var title = entry.dataset.title;
            var url = entry.dataset.alternateLink;
            var sourceTitle = entry.querySelector('.sourceTitle > a');
            var summary = entry.getElementsByClassName('u0Summary')[0].innerHTML;

            var request = objectStore.put({
                id: id,
                title: title,
                url: url,
                sourceTitle: sourceTitle.firstChild.nodeValue,
                sourceURL: sourceTitle.href,
                body: summary,
            });
            request.onsuccess = FeedlySearch.onEntryAdded;
            request.onerror = FeedlySearch.onError;
        });


        //opened articles
        var selectedEntry = timeline.querySelector('.inlineFrame[data-uninlineentryid] .u100Entry');
        if(selectedEntry){
            var id = selectedEntry.dataset.selectentryid;
            var title = selectedEntry.dataset.title;
            var url = selectedEntry.dataset.alternateLink;
            var sourceTitle = selectedEntry.getElementsByClassName('sourceTitle')[0];
            var body = selectedEntry.getElementsByClassName('entryBody')[0];

            var fullFeedLoaded = body.classList.contains('gm_fullfeed_loaded');

            var content = fullFeedLoaded ? body : body.querySelector('.content');

            var request = objectStore.put({
                id: id,
                title: title,
                url: url,
                sourceTitle: sourceTitle.firstChild.nodeValue,
                sourceURL: sourceTitle.href,
                body: content.innerHTML,
            });
            request.onsuccess = this.onEntryAdded;
            request.onerror = this.onError;
        }

        //If remove the following code, this script doesn't work well. (I don't know why)
        if(objectStore.mozGetAll)
            objectStore.mozGetAll().onsuceess = function(event){};
    },


    onEntryAdded: function(event){
        GM_log("Entry Saved: " + event.target.result);
    },

    onAllEntriesAdded: function(event){
        GM_log("Finish Saving All Entries.");
    },


    search: function(key){
        GM_log("Searching...");
        this._abortSearch = false;

        var count = 0;
        var objectStore = DB.transaction([DB_STORE_NAME]).objectStore(DB_STORE_NAME);

        //Get search options
        var optionTags = Array.slice(document.getElementById('feedlySearchOptions').querySelectorAll('input[type="checkbox"]'));
        var options = {};
        var keys;

        optionTags.forEach(function(optionTag){
            options[optionTag.id.replace('feedlySearch', '').toLowerCase()] = optionTag.checked;
        });


        //Create RegExp Object if RegExp option selected
        if(options.regexp){
            keys = [new RegExp(key)];
        }else{
            keys = key.split(/[\s　]+/);
        }


        //Create Search Display
        var titleBar = document.getElementById('feedlyTitleBar');
        var hhint = titleBar.getElementsByClassName('hhint')[0];

        //Change Title to "Search"
        titleBar.firstChild.nodeValue = 'Search';
        hhint.innerHTML = '';

        //Show Loading icon
        var loadingIcon = document.getElementById('feedlySearchLoading');
        loadingIcon.classList.remove('invisible');

        //Clear timeline
        var entriesArea = document.getElementById('mainArea');
        while(entriesArea.hasChildNodes()){
            entriesArea.removeChild(entriesArea.firstChild);
        }

        //Create List
        var hitEntriesList = document.createElement('ul');
        hitEntriesList.id = "feedlySearchHitList";
        entriesArea.appendChild(hitEntriesList);

        var startTime = Date.now();


        //Emphasize every hit term
        function emphasizeTerm(str, keys){
            var _str = str;

            keys.forEach(function(key){
                _str = _str.replace(key, "<strong>$&</strong>", "g");
            });

            return _str;
        }


        //Search
        objectStore.openCursor().onsuccess = function(event){
            var cursor = event.target.result;

            if(cursor){
                var entry = cursor.value;

                if(
                    keys.every(function(key){
                        return options.regexp ?
                                    (options.title && key.test(entry.title)) ||
                                    (options.url && key.test(entry.url)) ||
                                    (options.body && key.test(entry.body))
                                :
                                    (options.title && entry.title.indexOf(key) > -1) ||
                                    (options.url && entry.url.indexOf(key) > -1) ||
                                    (options.body && entry.body.indexOf(key) > -1)
                    })
                ){
                    count++;
                    hitEntriesList.insertAdjacentHTML("beforeend", "" +
                        "<li>"+
                            '<div class="feedlySearchResultTitle">' +
                                '<a href="' + entry.url + '" target="_blank">' + emphasizeTerm(entry.title, keys) + "</a>" +
                                '<div class="feedlySearchResultSource">' +
                                    '<a href="' + entry.sourceURL + '">' + entry.sourceTitle + "</a>" +
                                "</div>" +
                            "</div>" +
                            '<div class="feedlySearchResultBody">' +
                                emphasizeTerm(entry.body, keys) +
                            '</div>' +
                        "</li>");
                }

                if(!FeedlySearch._abortSearch) return cursor.continue();
            }

            loadingIcon.classList.add('invisible');
            GM_log("Search finished.");

            if(count == 0){
                entriesArea.innerHTML = "No Entries Found.";
            }else{
                hhint.innerHTML = count + ' results (' + ((Date.now() - startTime) / 1000) + ' seconds)';
            }
        }
    },


    abortSearch: function(){
        this._abortSearch = true;
    },



    onError: function(event){
        GM_log('Error has occurred.\n\nType: ' + event.type + '\nValue: ' + event.value);
    }

};


window.FeedlySearch = FeedlySearch;
FeedlySearch.init();

})(unsafeWindow, unsafeWindow.document);
