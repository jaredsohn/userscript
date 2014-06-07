// ==UserScript==
// @name       Coordination Assistant
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  enter something useful
// @match      http://s116-us.ogame.gameforge.com/game/index.php?page=resources*
// @include        http://*.ogame.*/game/index.php?*
// @copyright  2014+, Brian Mason
// ==/UserScript==


var updateO = new Object();

if (page('fleet1')) {
    $("div.fleft[title='Show Deuterium usage per withdrawal']").append($.parseHTML("LCs for <span action='all' class='caCargo'>ALL</span>   <span class='caCargo'>C&D</span>"));
    $(".caCargo").click(function() {
           	caCargo($(this).attr('action'));
     });
    caDisplayProjects(new Array(JSON.parse(localStorage['caProject'])));
}

if (page('fleet2')) {
//    alert((localStorage['caProject']));
    if ((localStorage['caProject']).length > 0) {
    var loc = JSON.parse((localStorage['caProject'])).location;
    document.getElementById('galaxy').value = loc.split(':')[0];
	document.getElementById('system').value =  loc.split(':')[1];
	document.getElementById('position').value =  loc.split(':')[2];
    }
	$("#galaxy").trigger('change')
}


if (page('fleet3')) {
//    alert((localStorage['caProject']));
    if ((localStorage['caProject']).length > 0) {
    var project = JSON.parse((localStorage['caProject']));
    caDisplayProjects(new Array(project));

     $("#start").click( function () {caShipResources(); } );
    
    }

}

if (page('movement')) {

    if ((localStorage['caShipment']).length > 0) {
    var shipment = JSON.parse((localStorage['caShipment']));
    var project = JSON.parse((localStorage['caProject']));
    localStorage.removeItem('caShipment');
//        alert('http://mooyai.com/ogameTools/resources/'+ project.planet + '/'+JSON.stringify(shipment));
     $.getJSON( 'http://mooyai.com/ogameTools/resources/'+ project.planet + '/'+JSON.stringify(shipment),
        
               function(data) { caDisplayProjects(data); });   
    }
}

if (!page('fleet')) localStorage.removeItem('caProject'); 


if(page('resources') || page('station') || page('research'))
	document.getElementById('planet').addEventListener('DOMNodeInserted', insertText, false);

if(page('resources') ) {
	updateO.met = getResource("metal");
	updateO.crys = getResource("crystal");
	updateO.deut = getResource("deuterium");
    updateO.universe = $("title").html();
	updateO.metp = parseInt($("span.res_heading").next().children().eq(2).html().replace(".",""))+120;
	updateO.crysp = parseInt($("span.res_heading").eq(1).next().children().eq(2).html().replace(".",""))+60;
	updateO.deutp = parseInt($("span.res_heading").eq(2).next().children().eq(2).html().replace(".",""));
	if ($("a.abortNow").length != 0) updateO.producing = $("a.abortNow").attr("title").substr(21).slice(0,-1);
    updateO.location = $("meta[name='ogame-planet-coordinates']").attr("content");

	caUpdateResources(updateO);
    

}

function insertText(e) {
            if(e.target.id != 'content') return;
    if ($('#caScheduleTask').length== 0) {
//          $("ul#costs").append("<span id='caScheduleTask'>SCH</span>"); 
//    		document.getElementById('caScheduleTask').addEventListener('click', function(e) { caScheduleTask();});
         $("ul#costs").append('<a href="#" id="caScheduleTask">SCH</a>');
       document.getElementById('caScheduleTask').addEventListener('click', function(e) { caScheduleTask();});
        }
}
                         
function caScheduleTask() {
    var updateO = new Object();
    updateO.rmet =  getNeeded("metal");
    updateO.rcrys =  getNeeded("crystal");
    updateO.rdeut =  getNeeded("deuterium");
	
	updateO.project = $("div#content h2").html();  
    
//     $('#contentWrapper').prepend(JSON.stringify(updateO));   
       $.ajax({
        url: 'http://mooyai.com/ogameTools/resources/'+$("#selectedPlanetName").html()+'/'+JSON.stringify(updateO),
        success: function(response) {
//          alert($("#selectedPlanetName").html()+response);
            
    		caDisplayProjects(response);
           
        }
    });

    
    }

function caParseInt (str) {
    return parseInt(str.replace(/\./g,""));
}

function getResource(str) {
    return caParseInt($("#resources_" + str).html());
}

function getNeeded(str) {

    var valStr = $("." + str + " .cost");
    if (valStr.length == 0) return 0;

    valStr = valStr.html().replace(/ /g,"");
//         alert(valStr.slice(-2));             
    if (valStr.indexOf('M') != -1) {
//        alert("000".slice(1,0));
       
       if (valStr.length ==9) valStr = valStr.replace("M","90000".slice(1,valStr.split(".")[0].length+2)); 

    }

    return caParseInt(valStr) - getResource(str);
}

function page(str) {
		return document.URL.match(str);
	}

function caShipResources () {
    var updateO = new Object();
    updateO.duration =  $("#duration").html();
    updateO.smet =  $("#metal").val();
    updateO.scrys =  $("#crystal").val();
    updateO.sdeut =  $("#deuterium").val();
    
    localStorage['caShipment'] = JSON.stringify(updateO);

}


function caUpdateResources(outO, planet) {

    if ( typeof planet == 'undefined')  planet = $("#selectedPlanetName").html();
    
//alert(planet + JSON.stringify(outO));
    $.getJSON( 'http://mooyai.com/ogameTools/resources/'+ planet +'/'+JSON.stringify(outO),
        
         function(data) {

				caDisplayProjects(data);
         });
}

    
function caCargo(action) {  
    var toShip = getResource('crystal') + getResource('deuterium');
    if (action == 'all') toShip += getResource('metal');     
     $("#ship_203").val(Math.ceil(toShip/24956)).trigger("change");
} 

function caProject(project, action) {    
    if (action == 'ship') { 
//          alert(project+action);
        localStorage['caProject'] = project;  //JSON.parse(project);
        window.location.replace('http://s116-us.ogame.gameforge.com/game/index.php?page=fleet1');
    } else {// alert ('reset');
    	var updateO = new Object();
    	updateO.reset = '';
    	caUpdateResources(updateO, JSON.parse(project).planet);
    }
}

function caDisplayProjects(data) {
            $('#caProjectList').remove();
           var projectList = "<table id='caProjectList'  style ='border: 1px solid green;'>"
//      alert(data.length);
//           if (typeof data != 'Array') data = new Array(data);
           if (data.length == 0) projectList += "<tr><td>no projects</td></tr>";
           for (var e in data) {
//               alert (JSON.stringify(e));
               projectList += "<tr ";
               if (data[e].rmet < 0 && data[e].rcrys < 0 && data[e].rdeut < 0) projectList += "style='color: green'";
               projectList += "><td style=\"width:80px\">" + data[e].planet +"</td>";
               projectList += "<td style=\"width:80px\">" + data[e].rmet +"</td>";               
               projectList += "<td style=\"width:80px\">" + data[e].rcrys +"</td>";               
               projectList += "<td style=\"width:80px\">" + data[e].rdeut +"</td>";               
               projectList += "<td style=\"width:150px\">" + data[e].start +"</td>";               
               projectList += "<td style=\"width:50px\"><span action='ship' pname='" +JSON.stringify(data[e]) + "' class=\"caProject\">Ship</span></td>";               
               projectList += "<td style=\"width:50px\"><span action='reset' pname='" +JSON.stringify(data[e]) + "' class=\"caProject\">Reset</span></td>";               

               projectList += "</tr>";
           }
            projectList += "</table>";
           $('#contentWrapper').prepend($.parseHTML(projectList));
           $(".caProject").click(function() {
           		caProject($(this).attr('pname'),$(this).attr('action'));
				});
        }   
