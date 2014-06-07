// ==UserScript==
// @name        Disqus Click Automate
// @autor       aaferrari@eml.cc
// @namespace   Disqus Click Automate
// @description Automate repetitive clicks on those sites that use Disqus as commenting system.
// @include     *
// @version     0.2
// @updateURL   https://userscripts.org/scripts/source/174606.meta.js
// ==/UserScript==

// This open a dialog to customize some parameters of the script, add the click events in
// the respective radioboxs, checkboxes and set the way that this dialogue disappears from
// the page when the user wants to close
function config_dialog(){
    var i18n = {
        "en": {
            "SORTING_LABEL": "Sort comments by",
            "RECENT_LABEL": "Most recent",
            "BEST_LABEL": "The best",
            "OLDEST_LABEL": "Oldest",
            "AUTOLOAD_LABEL": "Autoload all comments",
            "EXPAND_LABEL": "Expand shortened comments",
            "GUEST_LABEL": "I am not interested in log in/create an account, I just want to comment",
            "CLOSE_TITLE": "Close",
            "AUTOLOAD_TITLE": "Load all comments available automatically instead of showing the 50 first",
            "EXPAND_TITLE": 'Expand automatically shortened comment containing the link "See more"',
            "GUEST_TITLE": 'Check the option "I prefer commenting as guest" and hidden the password field on the comment form'
        },
        "es": {
            "SORTING_LABEL": "Ordenar comentarios por",
            "RECENT_LABEL": "Mas nuevos",
            "BEST_LABEL": "El mejor",
            "OLDEST_LABEL": "Mas antiguos",
            "AUTOLOAD_LABEL": "Autocargar todos los comentarios",
            "EXPAND_LABEL": "Expandir comentarios acortados",
            "GUEST_LABEL": "No me interesa iniciar sesión/crear una cuenta, solo quiero comentar",

            "CLOSE_TITLE": "Cerrar",
            "AUTOLOAD_TITLE": "Carga automáticamente todos los comentarios disponibles en vez de mostrar los 50 primeros",
            "EXPAND_TITLE": 'Expande de forma automática los comentarios acortados que contienen el enlace "Ver más"',
            "GUEST_TITLE": 'Marca la opcion "Prefiero comentar como invitado" y oculta el campo de contraseña en el formulario para comentar' 
        }
    }

    function translate(string){
        var lang = navigator.userLanguage || navigator.language;
        if (i18n[lang]) {
            if (i18n[lang][string]) { return i18n[lang][string]; }
        }
        return i18n["en"][string];
    }

    // Changed the inline html to Javascript DOM (special thanks to
    // http://rick.measham.id.au/paste/html2dom.htm for saving so much work) to
    // avoid problems with the Content-Security-Policy on pages that have embedded
    // the Disqus comments, as well as other sites that also possess these policies.
    configDialogStyle = document.createElement('style');
    configDialogStyle.id = "config-dialog-style";
    configDialogStyle.appendChild(document.createTextNode("\
#div_Content{position: fixed;\
            top: 50%; left: 50%;\
            transform: translate(-50%, -50%);\
            -ms-transform:translate(-50%, -50%); /* IE 9 */\
            webkit-transform:translate(-50%, -50%); /* Safari and Chrome */\
            z-index: 999; background-color: #ffffff;\
            border-color: black; border: 2px solid #000;}\
#div_Content:focus{display:none;}\
        .dsq-options li {float: left; margin: 0px 5px;}"));
    document.body.appendChild(configDialogStyle);

    div_Content = document.createElement('div');
    div_Content.id = "div_Content";

    var table_0 = document.createElement('table');
    table_0.style.textAlign = "left";

    var tbody_0 = document.createElement('tbody');

    var tr_0 = document.createElement('tr');
    tr_0.style.color = "white";

    var td_0 = document.createElement('td');
    td_0.style.verticalAlign = "top";
    td_0.style.textAlign = "right";

    var btnClose = document.createElement('span');
    btnClose.style.background = "red none repeat scroll 0% 50%";
    btnClose.style.cursor = "pointer";
    btnClose.style.fontWeight = "bold";
    btnClose.style.MozBackgroundClip = "-moz-initial";
    btnClose.style.MozBackgroundOrigin = "-moz-initial";
    btnClose.style.MozBackgroundInlinePolicy = "-moz-initial";
    btnClose.id = "btn close";
    btnClose.title = translate("CLOSE_TITLE");
    btnClose.innerHTML = "&nbsp;X&nbsp;";

    td_0.appendChild(btnClose);

    tr_0.appendChild(td_0);

    tbody_0.appendChild(tr_0);

    var tr_1 = document.createElement('tr');

    var td_1 = document.createElement('td');
    td_1.appendChild(document.createTextNode(translate("SORTING_LABEL") + ":"));

    tr_1.appendChild(td_1);

    tbody_0.appendChild(tr_1);

    var tr_2 = document.createElement('tr');

    var td_2 = document.createElement('td');

    var ul_0 = document.createElement('ul');
    ul_0.style.listStyle = "none outside none";
    ul_0.className = "dsq-options";

    var li_0 = document.createElement('li');

    var dsq_sorting_desc = document.createElement('input');
    dsq_sorting_desc.name = "sorting";
    dsq_sorting_desc.type = "radio";
    dsq_sorting_desc.id = "dsq-sorting-desc";
    li_0.appendChild(dsq_sorting_desc);

    li_0.appendChild(document.createTextNode(translate("RECENT_LABEL")));
    ul_0.appendChild(li_0);

    var li_1 = document.createElement('li');

    var dsq_sorting_popular = document.createElement('input');
    dsq_sorting_popular.name = "sorting";
    dsq_sorting_popular.type = "radio";
    dsq_sorting_popular.id = "dsq-sorting-popular";
    li_1.appendChild(dsq_sorting_popular);

    li_1.appendChild(document.createTextNode(translate("BEST_LABEL")));
    ul_0.appendChild(li_1);

    var li_2 = document.createElement('li');

    var dsq_sorting_asc = document.createElement('input');
    dsq_sorting_asc.name = "sorting";
    dsq_sorting_asc.type = "radio";
    dsq_sorting_asc.id = "dsq-sorting-asc";
    li_2.appendChild(dsq_sorting_asc);

    li_2.appendChild(document.createTextNode(translate("OLDEST_LABEL")));
    ul_0.appendChild(li_2);

    td_2.appendChild(ul_0);

    tr_2.appendChild(td_2);

    tbody_0.appendChild(tr_2);

    var tr_3 = document.createElement('tr');

    var td_3 = document.createElement('td');

    var br_2 = document.createElement('br');
    td_3.appendChild(br_2);

    tr_3.appendChild(td_3);

    tbody_0.appendChild(tr_3);

    var tr_4 = document.createElement('tr');

    var td_4 = document.createElement('td');
    td_4.title = translate("AUTOLOAD_TITLE");

    var autoload = document.createElement('input');
    autoload.type = "checkbox";
    autoload.id = "autoload_comments";
    autoload.title = translate("AUTOLOAD_TITLE");
    td_4.appendChild(autoload);

    td_4.appendChild(document.createTextNode(translate("AUTOLOAD_LABEL")));
    tr_4.appendChild(td_4);

    tbody_0.appendChild(tr_4);


    var tr_5 = document.createElement('tr');

    var td_5 = document.createElement('td');
    td_5.title = translate("EXPAND_TITLE");

    var autoexpand = document.createElement('input');
    autoexpand.type = "checkbox";
    autoexpand.id = "autoexpand_comments";
    autoexpand.title = translate("EXPAND_TITLE");
    td_5.appendChild(autoexpand);

    td_5.appendChild(document.createTextNode(translate("EXPAND_LABEL")));
    tr_5.appendChild(td_5);

    tbody_0.appendChild(tr_5);

    var tr_6 = document.createElement('tr');

    var td_6 = document.createElement('td');
    td_6.title = translate("GUEST_TITLE");

    var without_login = document.createElement('input');
    without_login.type = "checkbox";
    without_login.id = "guest-comment";
    without_login.title = translate("GUEST_TITLE");
    td_6.appendChild(without_login);

    td_6.appendChild(document.createTextNode(translate("GUEST_LABEL")));
    tr_6.appendChild(td_6);
    tbody_0.appendChild(tr_6);

    table_0.appendChild(tbody_0);

    div_Content.appendChild(table_0);

    document.body.appendChild(div_Content);

    // This function is only added for the purpose of facilitate the process of
    // inserting click events in radiobuttons and checkboxes (both current and
    // new) of the dialog config
    function click_check_setter(element, gm_value, pseudo_global_var, getted_value){
        var superior_scope = this; //Necessary to modify the "pseudo_global_var" from click event
        create_click_event(element, function () {
            GM_setValue(gm_value, getted_value === "" ? element.checked: getted_value);
            superior_scope[pseudo_global_var] =  getted_value === "" ? element.checked: getted_value;
        });
    }
    // Init config dialog
    var sorting = {"desc": dsq_sorting_desc, "popular": dsq_sorting_popular, "asc": dsq_sorting_asc};
    sorting[default_order].checked= true;
    autoload.checked = autoload_comments;
    click_check_setter(autoload, 'autoload', "autoload_comments", "");
    autoexpand.checked = expand_comments;
    click_check_setter(autoexpand, 'expand', "expand_comments", "");
    without_login.checked = guest_comment;
    click_check_setter(without_login, 'guest', "guest_comment", "");
    // Set onclick event in radiobuttons
    click_check_setter(dsq_sorting_desc, 'sorting', "default_order", "desc");
    click_check_setter(dsq_sorting_popular, 'sorting', "default_order", "popular");
    click_check_setter(dsq_sorting_asc, 'sorting', "default_order", "asc");
    // Click event to close de config dialog
    create_click_event(document, function (e) {
        e = e || event
        var target = e.target || e.srcElement
        do {
            if (div_Content == target) {
                // Click occured inside the box, do nothing.
                return
            }
            target = target.parentNode
        } while (target)
        // Click was outside the box, destroy it.
        del_element(div_Content);
        del_element(configDialogStyle);
    });

    create_click_event(btnClose, function(){
        del_element(div_Content);
        del_element(configDialogStyle);
    });
}

function clicker(link){
    if (link.click) {link.click();}
    else{
        var new_event = document.createEvent("MouseEvents");
        new_event.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
        try { link.dispatchEvent(new_event); }
        // Do nothing in this catch, this is a problem with JQuery compatibility, more details in
        // http://stackoverflow.com/questions/980697/element-dispatchevent-is-not-a-function-js-error-caught-in-firebug-of-ff3-0
        catch(error) {} 
    }
}

function finder(tag, attrib, value, one_element){
    if (document.querySelector || document.querySelectorAll){
        var selectors = {true: "querySelector", false: "querySelectorAll"}
        return document[selectors[one_element]](tag + '['+ attrib+ '="'+ value + '"]');
    }
    else {
        var elems = document.getElementsByTagName(tag);
        var results = Array();
        for (i in elems){
            if(elems[i].getAttribute(attrib) == value) {
                if (one_element == true) { return elems[i]; }
                else { results.push(elems[i]); }
            }
        }
        return results;
    }
}

function is_class_name(elem, matchClass){
    //Adapted from http://stackoverflow.com/a/3808886
    if (elem == null) { return null; }
    else if (typeof(matchClass) == 'string') {
        return (' ' + elem.className + ' ').indexOf(' ' + matchClass + ' ') > -1;
    }
    else if (matchClass instanceof RegExp) { return matchClass.test(elem.className); }
}

function create_click_event(element, func) {
    if (element.addEventListener) {
        element.addEventListener("click", func, false); }
    else { elemen.attachEvent("onclick", func); } //Internet Explorer
}

function del_element(id){
    if (typeof(id) == "string") { var element = document.getElementById(id); }
    else { element = id; }
    if (element){
        var ancestry = element.parentNode;
        ancestry.removeChild(element);
    }
}

//saved values
default_order = GM_getValue("sorting", "desc");
autoload_comments = GM_getValue("autoload", true);
expand_comments = GM_getValue("expand", true);
guest_comment = GM_getValue("guest", true);

//register GM menu command
GM_registerMenuCommand("[Disqus Click Automate] Configuration", config_dialog);

// This line (with the @include *) is needed to open the configuration dialog at any time from any page
if (window.location.href.search("disqus.com/embed/comments") == -1 ) {return;}

all_comments_retrieved = false;
//var JSON_Disqus = eval("("+document.getElementById("disqus-jsonData").innerHTML+")");
//var actual_comments = JSON_Disqus["response"]["posts"].length;
total_comments = null
comments = null

// Ordering comments and get some extra data
sorted_comments = false;
initial_timer = window.setInterval(function (){
    var actual_sort = finder("li", 'class', "selected", true);
    if (actual_sort != null) {
        var choosen_sort = finder("a", 'data-sort', default_order, true);
        if (actual_sort.children[0].getAttribute('data-sort') != default_order){
            clicker(choosen_sort);
        }
        sorted_comments = true;
        total_comments = parseInt(finder("a", 'data-role', "post-count", true).innerHTML.match(/([0-9]+) /));
        comments = document.getElementById("post-list");
        window.clearInterval(initial_timer);
        console.log("Finished first timer");
    }
}, 100);

if (autoload_comments == true){
    timer1 = window.setInterval(function (){
        if (is_class_name(comments, "post-list loading") == false && sorted_comments == true) {
            // Autoload all comments
            var more_comments = finder("a", "data-action", "more-posts", true);
            if (is_class_name(more_comments, "btn busy") == false && more_comments.parentNode.style.display != "none"){
                clicker(more_comments);
            }
            else if ((finder("li", "class", "post", false).length + finder("li", "class", "post minimized", false).length) == total_comments) {
                all_comments_retrieved = true;
                window.clearInterval(timer1);
                console.log("Finished second timer");
            }
        }
    }, 100);
}
else { all_comments_retrieved = true; } //Necessary to run the next timer

// This timer is held in execution because normally the "long" comments often contain many
// images and/or videos, that when the user read this, then Disqus load comments with this
// kind of content and the system at that moment decides whether shorten (or not) the comment
// based on the resultant height (in pixels) of the div where is the comment.
if (expand_comments == true){
    timer2 = window.setInterval(function (){// Unhide long comments
        var comments = finder("div", "class", "post-body-inner", false);
        for (var i=0; i < comments.length; i++) {
            var nodes = comments[i].childNodes;
            for (var j=0; j < nodes.length; j++) {
                if (is_class_name(nodes[j], "post-message-container") == true) {
                    nodes[j].style.height = "";
                }
                else if (is_class_name(nodes[j], /message-shadow|more-button|see-more/gi) == true) {
                    comments[i].removeChild(nodes[j]); 
                }
            }
        }
        // Adjust the height of the iframe to match with the unshorted comments
        // height with media content that are loaded when the user checks them 
        // (for some reason does not work or only works sometimes, if anyone 
        // knows how to fix this, then notify on the forum) 
        if (top.location != self.location) {
            var dsq_iframe = top.document.getElementById("dsq-2");
            if (dsq_iframe != null){
                dsq_iframe.style.height = document.getElementsByTagName("body")[0].clientHeight + "px";
            }
        }
        //console.log("Finished third timer");
    }, 500);
}

// Check the option "I prefer commenting as guest" when you click in the textbox to write the nick
if (guest_comment == true){
    timer3 = window.setInterval(function (){
        var nick_textbox = finder("input", "name", "author-name", true);
        if (nick_textbox != null){
            create_click_event(nick_textbox, function(){
                finder("input", "name", "author-guest", true).checked = true;
                del_element(finder("input", "name", "author-password", true));
            });
            window.clearInterval(timer3);
        }
    }, 100);
}