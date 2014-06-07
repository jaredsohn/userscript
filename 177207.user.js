// ==UserScript==
// @name       Cookie Clicker
// @namespace  http://orteil.dashnet.org/
// @version    1.0
// @description  Clicks cookies
// @match      http://orteil.dashnet.org/cookieclicker/
// @copyright  2013+, XDaWNedX
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==


/*=====================================================================================
		SETTINGS MENU
=======================================================================================*/
// Array for CPS Per Cookie


var CPS1=0;
var CPS2=0;
var BCPSN=0;
var BCPS = new Array();
BCPS[0]="Cursors";
BCPS[1]="Grandmas";
BCPS[2]="Farms";
BCPS[3]="Factories";
BCPS[4]="Mines";
BCPS[5]="Shipments";
BCPS[6]="Alchemy labs";
BCPS[7]="Portals";
BCPS[8]="Time Machines";
var UBCPSN=true;
// toggle menus
var settings=false;

// edit existing buttons
$('#logButton').click(function(){
    if(settings){
        $('#menu').toggle();
        $('#settingsMenu').toggle();
        settings=!settings;
    }
});

$('#prefsButton').click(function(){
    if(settings){
        $('#menu').toggle();
        $('#settingsMenu').toggle();
        settings=!settings;
    }
});

$('#statsButton').click(function(){
    if(settings){
        $('#menu').toggle();
        $('#settingsMenu').toggle();
        settings=!settings;
    }
});

// insert CSS
$('head').append('<style>#settingsButton:hover{right:-8px;}#settingsButton{padding:14px 16px 10px 0px;}#settingsButton{top:0px;right:-16px;}.on{background-color:#0a0ab0;}.CHK,.ST{border:0.25em;}</style>');

//settings page setup
$('#menu').after('<div id="settingsMenu" style="top:112px;position:abolute; display:none;"></div>');


//settings page content
var str="";
str+='<div style="position:absolute;top:120px;right:8px;cursor:pointer;font-size:16px;" id="X">X</div>'+
    '<div class="section">Settings</div>'+
    
    
    // subsection Building Purchaser
    '<div class="subsection">'+
    '<div class="title" id="BPT">Building Purchaser</div>'+
    
    // listings - Building Purchaser
    '<div class="listing BP"><b><span class="CHK" id="BPA">Purchase Buildings automatically?</span>'+
    '<select style="float:right" id="ABS">'+
    '<option value=0>Cursors</option>'+
    '<option value=1>Grandmas</option>'+
    '<option value=2>Farms</option>'+
    '<option value=3>Factories</option>'+
    '<option value=4>Mines</option>'+
    '<option value=5>Shipments</option>'+
    '<option value=6>Alchemy Labs</option>'+
    '<option value=7>Portals</option>'+
    '<option value=8>Time Machines</option>'+
    '</select>'+
    '</b></div>'+
    '<div class="listing BP"><b><span class="CHK" id="ACB">Automatially calculate best building for price?</span></b></div>'+
    '<div class="listing BP"><b><span class="CHK" id="LBP">Limit building purchases?</span><input type="text" style="float:right;" id="ILB"></input></b></div>'+
    
    // end of Building Purchaser subsection
    '</div>'+
    
    
    // subsection Upgrade Purchaser
    '<div class="subsection">'+
    '<div class="title" id="UPT">Upgrade Purchaser</div>'+
    
    //listings - Upgrade Purchaser
    '<div class="listing UP"><b><span class="CHK" id="PUA">Purchase upgrades automatically?</span></b></div>'+
    '<div class="listing UP"><b><span class="CHK" id="PGU">Purchase grandmapocalypse related upgrades?(does not function)</span></b></div>'+
    '<div class="listing UP"><b><span class="CHK" id="ARP">Automatically renew elder pledge?(does not function)</span></b></div>'+
    
    
    // end of Upgrade Purchaser subsection
    '</div>'+
    
    
    // subsection Statistics
    '<div class="subsection">'+
    '<div class="title" id="STA">Statistcs</div>'+
    
    //listings - Statistics
    '<div class="listing ST"><b>Cursors CPS per cookie:</b><div class="price plain CPSPC">0</div><button type="button" style="float:right" id="UCPS">Update numbers</button></div>'+
    '<div class="listing ST"><b>Grandmas CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Farms CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Factories CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Mines CPS per cookie:</b><div class="price plain CPSPC"></div>0</div>'+
    '<div class="listing ST"><b>Shipments CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Alchemy labs CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Portals CPS per cookie:</b><div class="price plain CPSPC"></div>0</div>'+
    '<div class="listing ST"><b>Time Machines CPS per cookie:</b><div class="price plain CPSPC">0</div></div>'+
    '<div class="listing ST"><b>Best CPS per cookie:</b><div class="price plain BCPSPC">0</div></div>'+
    
    //end of Statitics subsection
    '</div>';



// insert html into menu-space
$('#settingsMenu').html(str);

// Return variables to previous state before page unloaded
$('.CHK').each(function(){
    if(GM_getValue(this.id,false)){
        $(this).addClass("on");
    }
});

// set up sliding on title clicks
$('#BPT').click(function(){
    $('.listing.BP').slideToggle("slow");
});

$('#UPT').click(function(){
    $('.listing.UP').slideToggle("slow");
});

$('#STA').click(function(){
    $('.listing.ST').slideToggle("slow");
});

// Toggle div listings. 
$('.CHK').click(function(){
    
    if($(this).hasClass("on")){
        $(this).removeClass("on");
        GM_setValue(this.id,false);
    }
    else{
        $(this).addClass("on");
        GM_setValue(this.id,true);
    }
    
});

$('#UCPS').click(function(){
    CPS1=0;
    CPS2=0;
    
    $('.CPSPC').each(function(index){
        
        CPS1=Game.ObjectsById[index].storedCps/Game.ObjectsById[index].price;
        $(this).html(CPS1);
        if(CPS1>CPS2){
            CPS2=CPS1;
            BCPSN=index;
        }
    });
    $('.BCPSPC').html(BCPS[BCPSN]);
    
});





// Custom X for settings menu

$('#X').click(function(){
    settings=!settings;
    Game.ShowMenu("sett");
    $('#menu').toggle();
    $('#settingsMenu').toggle();
});

// settings button
$( "#logButton" ).before('<div id="settingsButton" class="button">Settings</div>');
$('#settingsButton').css("font-size","80%");
$('#settingsButton').click(function(){
    Game.ShowMenu("sett");
    settings=!settings
    
    $('#menu').toggle();
    $('#settingsMenu').toggle();
    
    
});
//$('#settingsButton').mouseover(function(){Game.tooltip.draw(this,'<div style="min-width:300px;"><div class="name">Auto Cookie Clicker settings</div><div class="description">View settings for auto-clicker and cheats.</div></div>',0,0,"left")}).mouseout(function(){Game.tooltip.hide()});




// auto clicker function
function Clicker(){
    
    var buildings=null;
    
    if($('#ABS').val()==0){
        buildings=parseInt($('#cookieCursors>div').length);
    }
    else{
        buildings=parseInt($('#rowObjects'+$('#ABS').val()+'>div').length);
    }
    
    // Auto Upgrade Purchased - incomplete
    if($('#PUA').hasClass("on")){
        $('#upgrade0').click();
    }
    
    // Auto Building Purchaser - incomplete
    if($('#BPA').hasClass("on")){
        if($('#product'+$('#ABS').val()).hasClass("enabled") && !$('#ACB').hasClass("on")){
            
            if(($('#LBP').hasClass("on") && buildings<$('#ILB').val()) || (!$('#LBP').hasClass("on"))){
                $('#product'+$('#ABS').val()).click();
                $('#UCPS').click();
            }  
        }
        else if($('#ACB').hasClass("on")){
            if(UBCPSN){
                $('#UCPS').click();
                UBCPSN=false;
            }
            if($('#product'+BCPSN).hasClass("enabled")){
                $('#product'+BCPSN).click();
                
                UBCPSN=true;
            }
            
        }
    }
    
    // Auto Cookie and Golden Cookie clicker
    $('#bigCookie').click();
    $('#goldenCookie').click();
    
    setTimeout(function(){Clicker()},10);
}

setTimeout(function(){
    
    // start autoclicker
    Clicker();
    
},3000);
