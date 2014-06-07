// ==UserScript==
// @name            BB Blog word count
// @namespace       BB Blog word count
// @description     Gives a word count for BlackBoard blogs.
// @include         https://my.usf.edu/webapps/blackboard/execute/viewBlog?*
// ==/UserScript==

insert_node = document.getElementById('containerdiv').getElementsByTagName('div').item(7);
text = String(document.getElementById('containerdiv').getElementsByTagName('div').item(7).innerHTML);

wordCount(text);


function wordCount(str) {
           
    all_words = str.split(/\s+/);
    real_words = all_words.filter(realWords);

    makeDiv("all_words", "<br /> <b>Total Word Count: </b>" + (all_words.length - 1)) + "<br /> <br />";
    makeDiv("real_words", "<b>Real Word Count: </b>" + real_words.length);
}

function realWords(element, index, array) {
    return (element.length > 1);
        
}

function makeDiv(id, message) {
    var div = document.createElement("div");
    div.id = id;
    div.setAttribute("align","center");
    div.innerHTML = message;
    insert_node.appendChild(div);
}

