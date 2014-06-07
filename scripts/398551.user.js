// ==UserScript==
// @name       ADR Timesheet Enhancement
// @namespace  http://www.willcarle.com/
// @version    0.1
// @description  Enhances the ADR timesheet by automatically totaling columns and allowing you to use the up and down arrow keys to add .5 hours to a task, also adds a hide button next to each task for tasks you don't want to see anymore (click the unhide all button at the top to bring them back.  Also alerts you when you hit 8 hours for a day
// @include    https://banner.unf.edu/pls/nfpo/wkiuadr.p_timesheet*
// @copyright  2014+, Will Carle
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


var hiddenRows = new Array();
var els = document.getElementsByTagName("tr");
loadData();
hideRows();
if(hiddenRows.length > 0 && els.length > 0)
{
    els[0].parentNode.innerHTML = "<input id='btnShow' type='button' value='Show All Rows (will refresh the page)'/>" + els[0].parentNode.innerHTML;
    document.getElementById("btnShow").addEventListener('click',clearData,false);
    
}
var btns = document.getElementsByTagName("input");
for(var i = 0; i < btns.length; i++)
{
    if(btns[i].getAttribute("class") == "btnHide")
    {
        var tohide = btns[i].getAttribute("tohide");
        
        btns[i].addEventListener('click',hideRow,false);
    }
}
function hideRow(e)
{
    var tohide = e.target.getAttribute('tohide');
    
    hiddenRows.push(tohide);
    saveData();
    hideRows();
    
}
function hideRows()
{
    for(var i = 0; i < els.length; i++)
{
    var children = els[i].childNodes;
    var isADR = false;
    var adrid = "";
    var idx = els[i].innerHTML.indexOf("ADR #");
    if(els[i].innerHTML.indexOf("ADR #") > 0)
    {
        isADR = true;
        adrid = els[i].innerHTML.substring(idx, els[i].innerHTML.indexOf("<", idx));
        for(var j = 0; j < hiddenRows.length; j++)
        {
            if(hiddenRows[j] == adrid)
            {
                els[i].setAttribute("style", "display:none;");
            }
        }
    }
    
    
    if(isADR  && els[i].innerHTML.indexOf("btnHide") < 0)
    {
        els[i].innerHTML = els[i].innerHTML + "<td><input class='btnHide' tohide='" + adrid + "' type='button' value='Hide'/></td>";
    }
    
}
}
function saveData() {
	GM_setValue("hiddenRows", JSON.stringify(hiddenRows));
}
function clearData()
{
    GM_setValue("hiddenRows", "");
    window.location.reload();
}
function loadData() {
	temp = GM_getValue("hiddenRows");
	// if there was nothing saved before, the 'temp' will be null
	if (temp) {
		hiddenRows = JSON.parse(temp);
	} else {
		// if the options weren't saved yet, but they are request to load, it's good to use some default values
		hiddenRows = new Array();
	}
}
var $totRow = $(".datadisplaytable tr:contains('Total')");
$("input").keyup(function(e){
    
    var i = $(this).parent().prevAll().length;
    var tot = 0;
    $(".datadisplaytable tr").each(function(){
    	var el = $(this).find("td:eq(" + i + ") input[type=text]");
    	//console.log(i);
    	if(el && el.val()){
    		//console.log(el.val());
    		tot += parseFloat(el.val());
            
    	}        
    	 
    });
    if(e.keyCode == 38){
    	t = parseFloat($(this).val()) + 0.5;
        tot += 0.5;
    	$(this).val(t);
        if(tot == 8)
            alert("This day is complete");
    }
    else if(e.keyCode == 40){
    	var t = parseFloat($(this).val()) - 0.5;
        tot -= 0.5;
    	$(this).val(t);
    }
    $totRow.find("td:eq(" + i + ")").text(tot);
    
});

$(document).ready(function(){
    $(document).keyup(function(e){
        if(e.keyCode == 118){
            console.log($("iframe")[0].contentWindow.document.body.innerText);
        }
    });
 	setTimeout(function(){
        $($("iframe").get(0).contentWindow).keyup(function(e){
            if(e.keyCode == 118){
                console.log($("iframe")[0].contentWindow.document.body.innerText);
            }
        });
    }, 1000);
});

