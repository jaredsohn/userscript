// ==UserScript==
// @name           bm-libris
// @namespace      http://luftslott.org/bm-libris
// @description    A short hack to import Libris data into BookMooch
// @include        http://bookmooch.com/m/add_manually
// ==/UserScript==

// Map function fun to all elements having property prop if cond(element) is true
function mapelem(fun, cond, prop, onlyfirst) {
    var allElements, thisElement;
    allElements = document.evaluate(
                                    '//*[@'+prop+']',
                                    document,
                                    null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                    null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        if(cond(thisElement) == true) {
            fun(thisElement);
            if(onlyfirst)
                return;
        }
    }
}


String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

    


function loadJSON(url) {
    var headID = document.getElementsByTagName("head")[0];         
    var newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = url;
    headID.appendChild(newScript);
}


function processJSON(data){
    return data.xsearch.list[0];
}
       
var box_exists = false
function show_message(message) {
    var bodyID = document.getElementsByTagName("body")[0];         
    if(!box_exists) {
        var box = document.createElement("span");
        var header = document.createElement("h2");
        header.appendChild(document.createTextNode("Messages:"));
        box.appendChild(header);
        box.appendChild(document.createTextNode(message));
        bodyID.appendChild(box);
        box.appendChild(document.createElement("br"));
        box_exists = true;
    } else {
        var msg = document.createElement("span");
        msg.appendChild(document.createTextNode(message));
        msg.appendChild(document.createElement("br"));
        bodyID.appendChild(msg);
    }


}

function bm_fill_form(author, title, isbn, publisher, date) {
    show_message(
          "author: " + author +
          ", title: " + title +
          ", isbn: " + isbn +
          ", publisher: " + publisher +
          ", date: " + date);
    function setval(name, value) {
        mapelem(function(elm) {elm.value=value;elm.style.backgroundColor="lightgreen";},
                function(elm) {return (elm.nodeName.toUpperCase() == 'INPUT' && elm.name == name);},
                "name");
    }

    setval("author", author);
    setval("isbn", isbn);
    setval("publisher", publisher);
    setval("title", title);
    setval("pubyear", date.trim());

    show_message("Fetched data from Libris. Marked altered fields with green.");


}



// Convert "Carroll, Lewis,xxxx-" to "Lewis Carroll"
function read_author(author) {
    var strings=author.split(/,/);
    return strings[1].trim() + " " + strings[0].trim();
}


function fetch_data_from_isbn(isbn) {
                    if (typeof GM_xmlhttpRequest != 'function') {
                    return;
                    }
                    
                    var query = 'isbn:\(' + isbn + '\)';
                    var callback = 'processJSON';
                    var url = 'http://libris.kb.se/xsearch?query=' + query + '&format=json&callback=' + callback;
                    
                    GM_xmlhttpRequest({
                            method: 'GET',
                                url: url,
                                headers: {
                                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                                    'Accept': 'application/atom+xml,application/xml,text/javascript',
                                    },
                                onload: function(responseDetails) {
                                var books = eval(responseDetails.responseText);
                                if(books) {
                                    bm_fill_form(read_author(books.creator),
                                                 books.title,
                                                 isbn,
                                                 books.publisher,
                                                 books.date);
                                                 
                                } else{
                                    show_message("No hits on " + isbn +"." );
                                }
                                    
                            }
                        });
}

function newsubmit() {
    mapelem(function(elm) {fetch_data_from_isbn(elm.value);},
            function(elm) {return (elm.nodeName.toUpperCase() == 'INPUT' && elm.name == 'isbn');},
            "name",
            true);
   
}


// We need more space in the ISBN box!
mapelem(function(elm) {elm.setAttribute('maxlength',13); elm.setAttribute('size', 13);},
        function(elm) {return (elm.nodeName.toUpperCase() == 'INPUT' && elm.name == 'isbn');},
        "name");

// Now add a "LET'S ROCK!"-button
// var bodyID = document.getElementsByTagName("body")[0];         
// var button = document.createElement("button");
// button.appendChild(document.createTextNode("Import from Libris"));
// button.addEventListener("click", newsubmit, true);
// bodyID.appendChild(button);

mapelem(function(elm) {elm.setAttribute('href', "javascript:doNothing()");elm.addEventListener("click",newsubmit,true);},
        function(elm) {return(elm.title == "search isbn-db")},
        "title");




