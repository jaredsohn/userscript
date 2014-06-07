// ==UserScript==
// @name       Pr0gameHelper
// @version    0.1
// @require http://userscripts.org/scripts/source/179609.user.js
// @match      *pr0game.de/*/game.php*
// @copyright  2013+, DaQ
// ==/UserScript==


var scriptActive = "&scriptActive=1";
var minLoot = 400000;

var kTs = 5000;


function CheckPage()
{
    //return;
    try
    {
        if ($("body#messages").length > 0) Messages();
        if (document.URL.search("page=galaxy") >= 0) Galaxy();
    }
    catch(error)
    {
        alert("error: " + error);
    }
}


function Galaxy()
{   
    var buttons = $("table tbody tr td a");
    for (var i = 0; i < buttons.length; i++)
    {
        if (buttons.eq(i).attr("href") == undefined) continue;
        if (buttons.eq(i).attr("href").search("javascript:doit.6,") < 0) continue;
        //bisserl a pfusch, aber egal^^
        var planet = buttons.eq(i).attr("href").slice(18,22);
        var number = buttons.eq(i).attr("href").slice(31, 32);
        doit(6,planet,{"210":number});
    }
}


function ArrowLeft()
{
    if ($("body#galaxy").length < 1) return;
	galaxy_submit('systemLeft');
}
function ArrowRight()
{
    if ($("body#galaxy").length < 1) return;
	galaxy_submit('systemRight');
}
function ArrowUp()
{
    if ($("body#galaxy").length < 1) return;
	galaxy_submit('galaxyLeft');
}
function ArrowDown()
{
    if ($("body#galaxy").length < 1) return;
	galaxy_submit('galaxyRight');
}
function Enter()
{
    if ($("form").length < 1) return;
    $("form").first().submit();
}




function Messages()
{
    var spyReports = $("table#messagestable tbody tr.messages_body td div.spyRaport");
    if (spyReports.length < 1) return; //throw "no spy report";
 
    
    for(var i = 0; i < spyReports.length; i++)
    {
     	var report = spyReports.eq(i);
        
        var containers = report.find("div.spyRaportContainer");
        var danger = false;
        if (containers.eq(1).children().length > 1) danger = true;
        if (containers.eq(2).children().length > 1) danger = true;
        
        var cells = report.find("div.spyRaportContainer:first div div.spyRaportContainerCell");
        
        var res = {met: Number(cells.eq(1).html().split(".").join("")),
                   kris: Number(cells.eq(3).html().split(".").join("")),
                   deut: Number(cells.eq(5).html().split(".").join("")),
                  };
        
        var footer = report.find("div.spyRaportFooter");
        var children = footer.children();
        
        var links = footer.find("a");
        if (links.length > 2) return;

        var href = footer.html();
        href = href.split('">Angreifen')[0].replace('<a href="',"");          

        for (var currentRes = res.met + res.kris + res.deut; currentRes > minLoot*2; currentRes = currentRes/2)
        {
            //this one for later game
            //var transporters = (Math.ceil(((currentRes/2)/kTs+5)/10))*10;
            //this one for start
            var transporters = (Math.ceil((currentRes/2)/kTs+5));
            
            if (danger) children.first().before('<a style="color:red;font-size:90%" target="_new" href="' + href + '&danger=1&scriptkt=' + transporters + '">Send ' + transporters + ' KT</a><br>');
        	else children.first().before('<a style="color:lime;font-weight:bold;font-size:120%" target="_new" href="' + href + '&scriptkt=' + transporters + '">Send ' + transporters + ' KT</a><br>');
        }

    }
}


function scriptFleetTable()
{
    var transporters = Number(document.URL.split("&").pop().replace("scriptkt=", ""));
    var form = $("body#fleetTable div#wrapper-over-all div#page div#content form[action='?page=fleetStep1']").first();
    form.find("table tbody tr td input#ship202_input").first().val(transporters);
    form.attr("action", form.attr("action")+scriptActive);
    if (document.URL.search("&danger=1") >= 0) return;
    form.submit();
}

function scriptFormSubmit()
{
    if (document.URL.search("page=fleetStep3") >= 0) close();
    var form = $("form").first();
    form.attr("action", form.attr("action")+scriptActive);
    form.submit();
}

function Phalanx()
{
    
    if (document.URL.search("page=phalanx") < 0) return;
    if (document.URL.search("&scriptPhalanxLastTime") >= 0) return;
    var d = new Date();
    window.location.href=document.URL+"&scriptPhalanxLastTime="+d.getTime();
}

function ultraPhalanx()
{
    var oldTimeString = document.URL.split("&").pop().replace("scriptPhalanxLastTime=","");
    var oldTime = new Date(Number(oldTimeString));
    var fleetID = "fleettime_137587782993059";
      
    
    fleet = $("td#" + fleetID + ".fleets");
    var time = new Date();

    
    if (fleet.length >= 1)
    {
        //alert(fleet.first().attr("data-fleet-time"));
   		window.location.href=document.URL.replace(oldTimeString, "")+time.getTime();
    }
    else
    {
		alert("Fleet was flying at " + oldTime.getHours() + ":" + oldTime.getMinutes() +":" 
              + oldTime.getSeconds() + ":" + oldTime.getMilliseconds()
              + "\n\n"
              + "Fleet was returning at " + time.getHours() + ":" + time.getMinutes() +":" 
              + time.getSeconds() + ":" + time.getMilliseconds() );
    }
}



$(document).ready(function(){
    
    $(document).bind('keydown', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 75) CheckPage();
        else if(code == 37) ArrowLeft();
        else if(code == 38) ArrowDown();
        else if(code == 39) ArrowRight();
        else if(code == 40) ArrowUp();
        else if(code == 13) Enter();
        else if(code == 76) Phalanx();
        //else alert(code);
    });
    
    if (document.URL.search("&scriptkt=") >= 0) scriptFleetTable();
 	if (document.URL.search(scriptActive) >= 0) scriptFormSubmit();
    if (document.URL.search("&scriptPhalanxLastTime") >= 0) ultraPhalanx();
    
    
    
});