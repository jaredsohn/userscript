// ==UserScript==
// @name           Paul Graham Topics Chrome
// @namespace      http://metaphysicaldeveloper.wordpress.com/
// @include        http://www.paulgraham.com/*
// @include        http://paulgraham.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}



function enhancePage() {
    function getElements() {
        var elements = $('b');
        var filteredElements = elements.filter(function() {
                return $(this).text().match(/^\d+/);
            });
        if (filteredElements.size() == 0) {
            return elements;
        }
        return filteredElements;
    }

    var count = 1;
    var elements = getElements();
    if (elements.size() == 0) {
        return;
    }
    $('body').append('<div id="gm_topics"><h3><i>Topics</i></h3><div id="gm_data"></div></div>');

    $('#gm_topics')
        .css('position', 'fixed')
        .css('top', '20px')
        .css('right', '20px')
        .css('padding', '2px 4px 2px 4px')
        .css('max-width', '30%')
        .css('max-height', '70%')
        .css('overflow', 'auto')
        .css('border', 'solid 1px #000000');
    var data = $("#gm_data");
    data.append('<ul>');
    elements.each(function() {
            var name = $(this).text();
            var link_name = 'gm_topic_' + count;
            $(this).replaceWith('<a name="' + link_name + '"><b> '+ name + '</b></a>');
            data.append('<li><a href=#' + link_name + '>' +  name + '<br></a></li>');
            count++;
        });
    data.append('</ul>');
};


// load jQuery and execute the main function
addJQuery(enhancePage);