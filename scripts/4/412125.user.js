// ==UserScript==
// @name       Sauce Job Custom Data
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://saucelabs.com/tests/*
// @copyright  2014+, Dmitry Ivanov
// @run-at document-end
// @grant unsafeWindow
// ==/UserScript==

var $ = unsafeWindow.jQuery;

var treeMaker = function(obj, name, alt){
    var $el = $('<div class="mm_treeblock"><span class="mm_treelabel">' + name + '</span></div>');
    if(alt) $el.addClass('mm_alt');
    if(obj.splice){
        $el.addClass('mm_closed');
        for(var i = 0; i < obj.length; i++)
            $el.append( treeMaker(obj[i], i, !alt) );
    } else if(typeof obj == 'object'){
        $el.addClass('mm_closed');
        for(var i in obj)
            $el.append( treeMaker(obj[i], i, !alt) );
    } else {
        $el.append('<span class="mm_treevalue">' + obj.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;') +'</span>');
    }
    return $el;
};

$(document).on('click', '.mm_open > .mm_treelabel, .mm_closed > .mm_treelabel', function(e){
    $(this).parent().toggleClass('mm_open').toggleClass('mm_closed');
    e.stopPropogation();
});

var st = document.createElement("style");
st.type = "text/css";
function attach(css) {
	if (st && css) {
		if (st.styleSheet) {
			st.styleSheet.cssText += css;
		} else {
			st.innerHTML += css;
        }
    }
}
$('head').append(st);
attach(".mm_closed > .mm_treeblock {\
    display: none;\
}\
.mm_open > .mm_treelabel, .mm_closed > .mm_treelabel { \
    cursor: pointer; \
}\
.mm_open > .mm_treelabel:before {\
    content: '(-) ';\
}\
.mm_closed > .mm_treelabel:before {\
    content: '(+) ';\
}\
.mm_treeblock {\
    padding: 5px;\
    border-radius: 5px;\
    border: 1px solid #ddd;\
    background: #eee;\
}\
.mm_alt {\
    background: #ddf;\
}\
.mm_treeblock .mm_treeblock {\
    margin-left: 25px;\
    margin-bottom: 5px;\
}\
.mm_treelabel {\
    font-weight: bold;\
}\
.mm_treelabel:after {\
    content: ' : ';\
}\
.mm_treevalue {\
    padding: 3px;\
    border-radius: 3px;\
    background: transparent;\
	font-family:Courier;\
}\
}");

$('.tabbed-menu.nav.nav-tabs li a:contains(Metadata)').live('click', function(){
    var json = $('.metadata-name:contains("Custom Data")').next().text();
    try{
		$('.metadata-name:contains("Custom Data")').next().html(treeMaker(JSON.parse(json), 'data') );
    }catch(e){}
});
