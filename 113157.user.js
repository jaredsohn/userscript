// ==UserScript==
// @name           Kronos MCAnime - Custom Search
// @namespace      Zeyth
// @description    Cambia el nuevo motor de busqueda de Kronos por uno personalizado de Google al estilo MCAnime V1.
// @include        http://kronos.mcanime.net/*
// ==/UserScript==

var style=".gsc-completion-container {z-index:10000; margin-left:-191px !important; margin-top:-47px !important; background:white !important; padding:2px !important;} .hidden {display:none !important;} .zhow {display:block !important;} .gsc-control-cse {padding-top:0px !important;} .gsc-webResult {padding-top: 0 !important; padding-bottom:8px !important;} .gsc-adBlock {display:none !Important;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='ua-box ua-search hide']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
	thisDiv.setAttribute("style", "");
	thisDiv.innerHTML = ('<form onSubmit="return false;" id="search">	<div>	Busqueda: 	<span id="ua-cat" class="open" onclick="$(\'#ua-search-cats\').addClass(\'zhow\');">	<b><i>Z</i>earch</b>	</span>	</div>	<div id="ua-search-cats" class="hide" style="padding-top:3px; padding-bottom:0px;"><span style="color:#7AA51D" onclick="$(\'.mcs_results\').addClass(\'hidden\'); $(\'#CSC\').removeClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();"><i>Z</i>earch</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\');  $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">general</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">anime</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">manga</span>,<br><span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">topics</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">grupos</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">fansubs</span>, <span onclick="$(\'.mcs_results\').removeClass(\'hidden\'); $(\'#CSC\').addClass(\'hidden\'); $(\'#ua-search-cats\').addClass(\'hide\'); $(\'#ua-search-cats\').removeClass(\'zhow\'); $(\'#mcs_site\').focus();">usuarios</span>	</div>	<div style="padding-top:8px;">	<input id="mcs_site" type="text" value="" class="ua-ins mcs_search" autocomplete="off" onkeydown="$(\'#CSC\').removeClass(\'hide\'); $(\'#CSI\').scrollTop(\'0\');" />	                            <div class="mcs_results mcs_general hide hidden">                                <div class="mcs_data"></div>                            </div>	<input id="ua-sc" class="ua-ins" type="hidden" value="general">	</div>	<div id="CSC" style="position:absolute !Important; right:0px; width:720px; margin-top:12px; opacity:.95;" class="hide"><div id="CSI" style="max-height:540px !important; overflow-x:hidden; border:1px solid black; border-radius: 4px 4px 4px 4px;  background-color:white;"><div id="CustomSearch" style="margin:0px; padding:0px; color:black;"></div></div></div>	</form>');
}


    var script = document.createElement("script");
    script.textContent = ('function addSearch(callback) {  var script = document.createElement("script");  script.setAttribute("src", "http://www.google.es/jsapi");    document.body.appendChild(script);  script.addEventListener(\'load\', function() {    var script = document.createElement("script");    script.textContent = "(" + callback.toString() + ")();";    document.body.appendChild(script);  }, false);} function main() {google.load("search", "1", {language : "es", "style" : google.loader.themes.ESPRESSO, callback : "searchLoaded"});} searchLoaded = function(){ var customSearchControl = new google.search.CustomSearchControl("001161274258707582644:dd-qwefwamu");customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);customSearchControl.setLinkTarget(google.search.Search.LINK_TARGET_SELF);var options = new google.search.DrawOptions();options.setAutoComplete(true);options.setInput(document.getElementById(\'mcs_site\'));options.enableSearchResultsOnly();customSearchControl.draw("CustomSearch", options);}; addSearch(main); $(\'span#ua-cat\').click(function(){        $(this).toggleClass(\'open\').next();        $(\'div#ua-search-cats\').toggleClass(\'hide\');    });        $(\'div#ua-search-cats span\').click(function(){        var obj = $(this);                $(\'div#ua-search-cats span\').removeClass(\'selected\');        obj.addClass(\'selected\');   $(\'#ua-sc\').val(obj.text().replace(\' \', \'\'));        $(\'#ua-cat b\').html(obj.html());    });    $(\'#mcs_site\').focus(function(){        if($(this).val() == \'Buscar\')            $(this).val(\'\');    }).blur(function(){        if($(this).val() == \'\')            $(this).val(\'Buscar\');    }).keyup(function(){        search(this, \'/busqueda/site/\', {q: $(this).val(), t: $(\'#ua-sc\').val()});    });').toString();
    document.body.appendChild(script);
