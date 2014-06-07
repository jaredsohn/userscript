// pypi Exteneder
// version 0.5
// 2009-05-31
// Patrick Gerken
// do3ccqrv@googlemail.com
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This script retrieves popular urls from delicious for the given package
// and adds them to the page, for additional documentation
// As for many packages no sensible tag can be retrieved, we provide
// a way to store a tag to use. This tag is stored on a different server!
// pypiextender.appspot.com contains a dead simple web app for this reason
// It also offers a way to hide code examples
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name           Pypi Extender
// @namespace      http://buildingbridgesintotheunknown.blogspot.com
// @description    adds popular delicious links and offers a way to hide code examples
// @include        http://pypi.python.org/pypi/*
// ==/UserScript==

// Delicious block
var package_name = document.URL.split('/')[4]
var package_name_length = package_name.split('.').length
var tag_name = package_name.split('.')[package_name_length - 1]
var key = tag_name

var styles = '<style type="text/css">\
    div#delicious div#form{\
    padding : 1em 1em 0em 1em;\
}\
div#delicious div#links{\
    color:blue;\
    list-style-type: square;\
    padding: 1em 0 1em 1em;\
}\
div#delicious div#help{\
    padding-bottom: 1em;\
}\
span.comment_hider{\
    font-size:75%;\
    padding-left:3em;\
}\
blockquote{\
    margin-top: -1em;\
}\
</style>'
var delicious = '\
<div id="delicious">\
    <h1>Delicious links</h1>\
    <div id="new_tag">\
        <img src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0B%00%00%00%0A%08%02%00%00%00%ED%923%D4%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%00%00%00%00%00%F9C%BB%7F%00%00%00%09pHYs%00%00%0E%C4%00%00%0E%C4%01%95%2B%0E%1B%00%00%00%07tIME%07%D9%05%1F%16%058t%A1%BC%E7%00%00%00%19tEXtComment%00Created%20with%20GIMPW%81%0E%17%00%00%004IDAT%18%D3c%FC%FF%FF%3F%03%5E%C0%C4%40%08%20T%F0hxce3%FCG%02%DC%EA%5Ep%12%0EPT%60J%A3%A8%40%96CfS%C3%16F*%84%07%00%ABR%97TSQ%22U%00%00%00%00IEND%AEB%60%82" />If the links are not helpful, please provide an alternative tag to search for.\
    </div>\
    <div id="form" style="display:none;">\
        <div id="help">\
            If there is no single meaningful tag, you might enter the full package name as a tag and tag some helpful resources with that name. They will show up here after a while.\
        </div>\
        <form action="http://pypiextender.appspot.com/tag/' + package_name + '" method="post">\
            <label for="tag_name">Change tag:</label>\
            <input id="tag_name" type="text" name="tag_name" />\
            <input type="submit" id="button" value="Change" />\
        </form>\
    </div>\
    <div id="links"></div>\
</div>'


function getRequest(url, func){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: func
    });
}

function initForm(key)
{
    $('#delicious #tag_name')[0].value = key
}

function showForm(){
    $('#delicious #form').show()
}

function writeLink(result){
    var  new_link = '<li><a href="' + result.u + '">' + result.d + '</a></li>'
    $('#delicious #links').append(new_link)
}

function addNotSoPopularDeliciousLinks(missing_results){
    var delicious_base_url = 'http://feeds.delicious.com/v2/json/tag/'
    var delicious_url = delicious_base_url + key + '?count=100'

    GM_xmlhttpRequest({
        method: 'GET',
        url: delicious_url,
        onload: function(responseDetails) {
            var results = eval(responseDetails.responseText)
            var grouped_results = new Array()
            for (var i=0;i<results.length;i++){
                result = results[i]
                new_result = true
                for(var j=0;j<grouped_results.length;j++){
                    grouped_result = grouped_results[j]
                    if (grouped_result.u == result.u){
                        grouped_result.count += 1
                        new_result = false
                    }
                }
                if(new_result == true){
                    result.count = 1
                    grouped_results.push(result)
                }
            }
            grouped_results.sort(function(a, b){
                return a.count - b.count
            })
            var popular_results = grouped_results.slice(0, missing_results)
            for (var i=0;i<popular_results.length;i++){
                writeLink(popular_results[i])
            }
        }
    })
}

function addDeliciousLinks(){
    var delicious_base_url = 'http://feeds.delicious.com/v2/json/popular/'
    var delicious_url = delicious_base_url + key + '?count=100'
    
    GM_xmlhttpRequest({
        method: 'GET',
        url: delicious_url,
        onload: function(responseDetails) {
            var results = eval(responseDetails.responseText)
            for(var i=0;i<results.length;i++){
                writeLink(results[i])
            }
            if(results.length < 10){
                addNotSoPopularDeliciousLinks(10 - results.length)
            }
        }
    });
}

function registerCodeHider(){
    $('blockquote').before('<span class="comment_hider">Hide code</span><span class="comment_hider" style="display:none;">Show code</span>')
    $('.comment_hider').click(function(){
        $('blockquote').toggle();
        $('.comment_hider').toggle();
    })
}


// set up jQuery variable
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
GM_JQ.type = "text/javascript";

document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
    if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
        clearInterval(checker);
        letsJQuery();
    }
},100);

// All your GM code must be inside this function
function letsJQuery() {
    $('div.section table.list').before(delicious)
    $('#delicious').before(styles)
    $('#delicious #new_tag').click(showForm)
    getRequest('http://pypiextender.appspot.com/tag/' + package_name, 
                function(data){
                    var custom_key = data.responseText
                    if(custom_key){
                        key = custom_key
                   }
                   initForm(key)
                   addDeliciousLinks()
                }
    )
    registerCodeHider()
}