// ==UserScript==
// @id             Find L8 res
// @name           iitc-NB: Find L8 Res
// @version        0.2.4
// @description   	Finds and Hightlights portals with enemy L8 res on them
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////
     /*TODO
      *  1) Remove portal if it falls out of a catigory
      * 
      * 
      * 
      * 
      * 
      */ 
    // GLOBALS ////////////////////////////////////////////////////////
    var portalsWith8 = [];
    var portalsWith7 = [];
    var portalsWith6 = [];
    var portalsWith5 = [];
    var portalsWith4 = [];
    var portalsWith3 = [];
    var portalsWith2 = [];
    var portalsWith1 = [];
    

// use own namespace for plugin
window.plugin.NBResFinder = function() {};

window.plugin.NBResFinder.clearFromList = function(d) {
    
    tempPortalsWith6 = [];
    $.each(portalsWith6, function(ind, portal){
    	  var guid = portal.guid;
           if(guid !== d.guid)
           {
            	tempPortalsWith6.push(d);
           }
        
    });
    portalsWith6 = tempPortalsWith6;
    
      tempPortalsWith7 = [];
    $.each(portalsWith7, function(ind, portal){
    	  var guid = portal.guid;
           if(guid !== d.guid)
           {
            	tempPortalsWith7.push(d);
           }
        
    });
    
      tempPortalsWith8 = [];
    $.each(portalsWith8, function(ind, portal){
    	  var guid = portal.guid;
           if(guid !== d.guid)
           {
            	tempPortalsWith8.push(d);
           }
        
    });
    
    }

window.plugin.NBResFinder.portalAdded = function(data) {

  var d = data.portal.options.details;
   var colorFlag = $("#Contolsel8ResListDropDownColorFlag").val();
 
    d["guid"]=data.portal.options.guid;
  var numRes = 0;
  //IF it is a Resitence Player high light it.
  if(getTeam(d) == 1) {
  
       //console.log("Here Be Dragons!");
      //console.log(d.resonatorArray.resonators);
      $.each(d.resonatorArray.resonators, function(ind, res){
          if(res !==null)
          {
          	if(res.level == 8)
          	{
              numRes += 1;
          	}
          }
      });
      
    d["numOfL8"] = numRes;
    if(numRes ==1)
    {
        portalsWith1.push(d);
    }
       else if(numRes ==2)
    {
        portalsWith3.push(d);
    }
       else if(numRes ==3)
    {
        portalsWith3.push(d);
    }
       else if(numRes ==4)
    {
        portalsWith4.push(d);
    } else if(numRes ==5)
    {
        portalsWith5.push(d);
    } 
    else if(numRes ==6)
    {
        var add =1;
        $.each(portalsWith6, function(ind, portal){
           var guid = portal.guid;
           if(guid == d.guid)
           {
               add =0;
           }
          });
           if(add == 1)
           {
            window.plugin.NBResFinder.clearFromList();
           	portalsWith6.push(d);
           }
    }
       else if(numRes ==7)
    {
        var add =1;
          $.each(portalsWith7, function(ind, portal){
           var guid = portal.guid;
           if(guid == d.guid)
           {
               add =0;
           }
          });
           if(add == 1)
           {
           window.plugin.NBResFinder.clearFromList;
           	portalsWith7.push(d);
           }
    }
       else if(numRes ==8)
    {
       var add =1;
          $.each(portalsWith8, function(ind, portal){
           var guid = portal.guid;
           if(guid == d.guid)
           {
               add =0;
           }
          });
           if(add == 1)
           {
           window.plugin.NBResFinder.clearFromList;
           	portalsWith8.push(d);
           }
    }
       window.plugin.NBResFinder.fillData();
  }
      console.log("God Man! "+numRes);
      
      
     //if(colorFlag ==1)
    if(1) 
    {
         
   //Fill in color depending on number of L8 Res
    if(numRes > 0) 
    {
      var fill_opacity = .75
      if(numRes == 1)
      {
        
      	var color = 'yellow';
          
      }
      else if(numRes == 2)
      {
           
          var fill_opacity = 1
          var color = 'yellow';
      } 
        else if(numRes == 3)
      {
           
          var color = 'orange';
      } 
        else if(numRes == 4)
      {
           
           var fill_opacity = 1
          var color = 'orange';
      } 
        else if(numRes == 5)
      {
          
          var color = 'red';
      } 
        else if(numRes == 6)
      {
           
           var fill_opacity = 1
          var color = 'red';
         
      } 
        else if(numRes == 7)
      {
         
          var color = 'black';
           
      } 
        else if(numRes == 8)
      {
          
          
           var fill_opacity = 1
          var color = 'black';
          var add =1;
      } 
        
      var params = {fillColor: color, fillOpacity: fill_opacity};
      data.portal.setStyle(params);
      
    } 
      else 
      {
      data.portal.setStyle({color:  COLORS[getTeam(data.portal.options.details)],
                            fillOpacity: 0.5,
                            dashArray: null});
    }
    
  }
}
    
    
  
window.plugin.NBResFinder.fillData = function()
{

    
    window.plugin.NBResFinder.printToSideBar();
    
    
    
}
//////////////// List portals with on the side bar. ////////////////////////////
window.plugin.NBResFinder.printToSideBar = function()
{
    var levelToShow = $("#Contolsel8ResListDropDown").val();
    
    if(levelToShow <= 8)
    {
    $("#l8resList").html('<u><b>portals With 8 L8</b></u></br>');
      
        $.each(portalsWith8, function(ind, portal){
       
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
    if(levelToShow <=7)
    {
        $("#l8resList").append('<u><b>portals With 7 L8</b></u></br>');
       
        $.each(portalsWith7, function(ind, portal){

            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
    if(levelToShow <=6)
    {
        $("#l8resList").append('<u><b>portals With 6 L8</b></u></br>');
        
        $.each(portalsWith6, function(ind, portal){

            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
     if(levelToShow <=5)
    {
        $("#l8resList").append('<u><b>portals With 5 L8</b></u></br>');
        
        $.each(portalsWith5, function(ind, portal){
          
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
     if(levelToShow <=4)
    {
        $("#l8resList").append('<u><b>portals With 4 L8</b></u></br>');
        
        $.each(portalsWith4, function(ind, portal){
            
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
     if(levelToShow <=3)
    {
        $("#l8resList").append('<u><b>portals With 3 L8</b></u></br>');
        
        $.each(portalsWith3, function(ind, portal){
            
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
     if(levelToShow <=2)
    {
        $("#l8resList").append('<u><b>portals With 2 L8</b></u></br>');
        
        $.each(portalsWith2, function(ind, portal){
           
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
     if(levelToShow <=1)
    {
        $("#l8resList").append('<u><b>portals With 1 L8</b></u></br>');
        
        $.each(portalsWith1, function(ind, portal){
           
            var nameOfPortal = portal.portalV2.descriptiveText.TITLE;
            var lat = portal.locationE6.latE6;
  			var lng = portal.locationE6.lngE6;
            var guid = portal.guid;
 			var perma = '/intel?latE6='+lat+'&lngE6='+lng+'&z=17&pguid='+guid;
           $("#l8resList").append('<a href="'+perma+'">'+nameOfPortal+'</a></br>');
        });
    }
}

window.plugin.NBResFinder.portalDataLoaded = function(data) {
  $.each(data.portals, function(ind, portal) {
    if(window.portals[portal[0]]) {
      window.plugin.NBResFinder.portalAdded({portal: window.portals[portal[0]]});
    }
  });
}

var setup =  function() {
    
 // window.addHook('portalAdded', window.plugin.NBResFinder.portalAdded);
  window.addHook('portalDataLoaded', window.plugin.NBResFinder.portalDataLoaded);
  window.COLOR_SELECTED_PORTAL = '#f0f';
     $('#sidebar').append('<div id="Controlsel8resList"><form><select title="Select which the min number of Res need to show up in the toolbar" onChange=window.plugin.NBResFinder.fillData() id="Contolsel8ResListDropDown">'
                          +'<option value="8">8</option><option value="7">7</option><option value="6">6</option><option value="5">5</option><option value="4">4</option><option value="3">3</option>'
                          +'<option value="2">2</option><option value="1">1</option></form></div>');
    // </select><select hidd onChange=window.plugin.NBResFinder.fillData() title="Color Portals on the Map" id="Contolsel8ResListDropDownColorFlag"><option value="1">No</option>'
                          //+'<option value="1">Yes</option></select>
   $('#sidebar').append('<div id="l8resList">Here be your dragons</div>');
     $('#l8resList').css({'color':'#ffce00', 'font-size':'90%', 'padding':'4px 2px', 'height':'150px', 'overflow':'scroll'});
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);