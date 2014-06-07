// ==UserScript==
// @name           Craigslist Forum Monkey
// @namespace      http://craigslist.org/forums
// @description    Monkeying around craigslist forum interface
// @include        http://*.craigslist.*/forums/?*act=DF*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var $body = $(document.body);

$body.append("<style type='text/css'>"
        +"#cfmMenu     {  padding-bottom:0.5em; }"
        +"#helpMenu  {  position:absolute; display:none; background-color:white; padding:0.5em; border:1px solid black; margin-right:1em;}"
        +"#editCss   {  position:relative; display:none; background-color:white; padding:0.5em; border:1px solid black; }"
        +"#editCssDefault   {  margin-left:5em; }"
        +"#handleMenu  {  position:absolute; display:none; background-color:white; opacity:0.95; padding:0.5em; border:5px solid black;}"
        +"#handleButton{  position:absolute; display:none; }"
//        +"#handleButton{  color: white; text-decoration:none; font-weight:bold; }"
        +"</style>");

var defaultCss = ""
        +"div.rate1  b {  background-color:#ddffdd; }\n"
        +"div.rate-1 * {  opacity:0.50; }\n"
        +"div.rate-2 * {  opacity:0.25; }\n"
        ;
var customCss = GM_getValue("customCss");
if(!customCss)
{
    customCss = defaultCss;
    GM_setValue("customCss", customCss);
}
$body.append("<style id='customCss' type='text/css'></span>");
$("#customCss").html(customCss);

$body.prepend("<div id='editCss'>"
        +"<h3>Edit CSS - CL Forum Moneky</h3>"
        +"<p><textarea id='editCssTextArea' wrap='off' rows='6' style='width:100%'>blah blah blah</textarea></p>"
        +"<p> <button id='editCssApply'>Apply</button> "
        +"<button id='editCssCancel'>Close</button>"
        +"<button id='editCssDefault'>Restore Default CSS</button>"
        +"</p></div>");
var $editCss = $("#editCss");

$body.prepend( "<div id='cfmMenu' ><b>CL Forum Monkey</b> "
        +" | <a id='cfmHelp'      href='javascript:void(0);'>help</a>"
        +" | <a id='cfmEditCss'   href='javascript:void(0);'>edit css</a>"
        +" | <a id='clearRatings' href='javascript:void(0);'>clear all ratings</a>"
        +" | </div>" );
$("#clearRatings", $handleMenu).click(function(){
    resetAllHandles();
});
$("#cfmHelp", $handleMenu).click(function()
{
    var topleft = $(this).offset();
    topleft.top += this.offsetHeight;
    $helpMenu.css(topleft);
    toggle($helpMenu);
});
$("#cfmEditCss", $handleMenu).click(function()
{
    toggle($editCss);
});

var $threads_table = $("table.threads");

(function(){
	var $td = $("td", $threads_table);
	var lines = $td.html().split("<br>");
	for(var i=0; i<lines.length; i++)
	{
		var line = lines[i];
        line = line.replace(/<span class=\"S\">I<\/span>/g, 'I');
        var handle = line.match(/<span class=\"hnd \w*\">([^<>]+)<\/span>/);
        if(!handle || handle.length<2)
			handle = "";
		else
			handle = handle[1];
		lines[i] = "<div cfm_handle='"+handle+"'>"+line+"</div>";
	}
    $td.html( lines.join('\n') );
})();

restyleAllHandles();

$body.append("<div id='handleMenu'>"
        +"<a class='rate' href='javascript:void(0);'>+1</a> Good<br>"
        +"<a class='rate' href='javascript:void(0);'>+0</a> - - <br>"
        +"<a class='rate' href='javascript:void(0);'>-1</a> Baad<br>"
        +"<a class='rate' href='javascript:void(0);'>-2</a> UGLY<br>"
        +"</div>");
var $handleMenu = $("#handleMenu");
$("a.rate", $handleMenu).click(function(){
    var n = parseInt( $(this).text() );
    rateHandle(currHandle, n);
});

$body.append("<span id='handleButton'><button>rate handle</button></span>");
var $handleButton = $("#handleButton");
$handleButton.click(function()
{
    var topleft = $(this).offset();
    topleft.top += this.offsetHeight;
    $handleMenu.css(topleft);
    toggle($handleMenu);
    $("button", $handleButton).blur();
});

$threads_table.click(function(){ $handleMenu.hide(); $handleButton.hide(); });

var currHandleSpan = null;
var currHandle = null;
$("span.hnd").mouseenter(function(event)
{
    if(currHandleSpan !== this)
    {
        $handleMenu.hide();
        currHandleSpan = this;
        currHandle = $(currHandleSpan).text();
        var topleft = $(this).offset();
        topleft.left += this.offsetWidth;
        $handleButton.css(topleft);
    }
    $handleButton.show();
    front($handleButton);
});


function rateHandle(handle, n){
    if(n==0)
        GM_deleteValue("rating/"+handle);
    else
        GM_setValue("rating/"+handle, n);

    restyleHandle(handle, n);
}

function restyleHandle(handle, n)
{
    $("div[cfm_handle='"+handle+"']").removeClass().addClass("rate"+n);
}

function resetAllHandles(){
    var keys = GM_listValues();
    for(var i=0; i<keys.length; i++)
    {
        var key = keys[i];
        if(key.indexOf("rating/")==0)
            GM_deleteValue(key);
    }
    restyleAllHandles();
}

function restyleAllHandles()
{
    $("div[cfm_handle]").removeClass();
    
    var keys = GM_listValues();
    for(var i=0; i<keys.length; i++)
    {
        var key = keys[i];
        if(key.indexOf("rating/")==0)
        {
            var n = GM_getValue(key);
            var handle = key.substring("rating/".length);
            restyleHandle(handle, n);
        }
    }
}

$body.append("<div id='helpMenu'>"
        +"<h3>Help - CL Forum Monkey</h3>"
        +"<p>To rate a handle, move mouse over the handle, click the button appearing right to it. Click the numbers and see the effects.</p>"
        +"<p>To resest every rating back to '+0 normal', click 'clear all ratings'.</p>"
        +"<p>To change how to highlight different ratings, click 'edit css'. You can also add/change any css of the web page. Don't worry, you can always restore the default ones.</p>"
        +"<p><button id='helpClose'>Close</button></p>"
        +"</div>");
var $helpMenu = $("#helpMenu");
$("#helpClose").click(function(){
    $helpMenu.hide();
});

$("#editCssTextArea").val(customCss);
$("#editCssDefault").click(function(){
    $("#editCssTextArea").val(defaultCss);
    applyCss();
});
function applyCss()
{
    customCss = $("#editCssTextArea").val();
    GM_setValue("customCss", customCss);
    $("#customCss").html(customCss);
}
$("#editCssApply").click(function(){
    applyCss();
});
$("#editCssCancel").click(function(){
    $("#editCssTextArea").val(customCss);
    $editCss.hide();
});


var zindex = 100;
function front(x) { x.css("z-index", ++zindex ); }
function toggle(x)
{
    x.toggle();
    if(x.is(':visible')) front(x);
}