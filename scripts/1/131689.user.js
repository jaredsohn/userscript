// ==UserScript==
// @name Google+ EJB Translator
// @description Adds EJB to your Google+ stream. Based on: http://adam.hughes.cc/shack/googleplus/
// @include https://plus.google.com/*
// ==/UserScript==

var NAMES_URL = "https://spreadsheets.google.com/feeds/list/tpY4DRO3VxbGrBIAXlswONQ/od7/public/basic?hl=en_US&alt=json";
var ejb_icon = "http://dl.dropbox.com/u/30076842/EJBPlus/ejb.png"
var CACHE_TIME = 60 * 60 * 1000;

var oid_regex = /^https?:\/\/(plus|profiles)\.google\.com\/(u\/\d\/)?(\d+)$/i
var map_regex = /^googleid: (\d+), ejbname: (.*)$/

var g_ids;
var g_map;
var imgs;
var links;
var divs;

function mapNames(map, source)
{
    var div_class_sig = {"vi bv tY a-l-k vi-X" : "active", "vi bv tY a-l-k cl" : "inactive", "Sf Gn AkM0qf c-wa-Da nk" : "active"};
    
    // Get all links and images
    try {
        links = source.getElementsByTagName("a");
        //imgs = source.getElementsByTagName("img");
        divs = source.getElementsByTagName("div");
    } catch(err) { }
    
    var g_map = map;
    
    // Filter out images that don't match a profile link class
    // Not sure if this is still validd due to changing CSS
    
    /* Removed images because I'm not sure if they are still useful.
    if(imgs)
      for (var j = 0; j < imgs.length; j++) 
      {
          if (imgs[j].className != img_class_sig) {
              continue;
          }
          
          var oid = imgs[j].parentNode.getAttribute("oid");
          var name = g_map[oid];
          checkAndAddNickname(removeHTMLTags(name),"imgs",j,oid);
      }
	// */
	
	// Filter out divs that don't match the profile link class
	
    if(divs)
    {
		
		
      for(var k = 0; k < divs.length; k++)
      {

        if (!(divs[k].className in div_class_sig))
          continue;
        
        var oid = divs[k].getAttribute("oid");
        var name = g_map[oid];
        
        
        if ((name != '' && name != null) && divs[k].innerHTML.indexOf(ejb_icon)==-1) 
        {
          divs[k].insertBefore(createIcon(false), divs[k].firstChild);
        }
        	
      }
	}
    // look for all the links with an 'oid' attribute
    if(links)
      for (var i = 0; i < links.length; i++)
      {
          // use a regex instead of the oid attribute to try to catch more items
          var match = oid_regex.exec(links[i].href);

          // don't put names after images or in the ribbon
          if (match != null && links[i].firstChild.tagName != "IMG" && links[i].getAttribute('asrc') != 'ribbon')
          {
              var oid = match[3];
              var name = g_map[oid];
              
              // Insert EJB icon if it hasn't already been
              if ((name != '' && name != null) && links[i].innerHTML.indexOf(ejb_icon)==-1) {
                  links[i].appendChild(createIcon(name));
              }
          }
      }
}

function addMapFromEvent(e)
{
    console.log('Added element');
    
    getNames(function (response)
    {
        var map = response.names;
        // map all the links alread in the document
        mapNames(map, e.srcElement);
    });
};

function createIcon(withName)
{
	container = document.createElement('span');
	icon = document.createElement('img');
	
	icon.src = ejb_icon;
	icon.alt = "EJB";
	
	if(!withName)
		icon.setAttribute("style","vertical-align: bottom; position:absolute;bottom: -4px; right: -8px;");
	
	container.appendChild(icon);
	
	if(withName)
	 	container.innerHTML += " (" + withName + ")";
	
	return container;
}

function getNames(callback) 
{

	var cached = JSON.parse(GM_getValue('names', '{ }'));
	var now = new Date().getTime();
	if ((now - GM_getValue('last_updated', 0)) > CACHE_TIME)
	{
		GM_log("fetching");
		GM_xmlhttpRequest({
			method: "GET",
			url: NAMES_URL, 
			onload: function(response) {
				//var map = JSON.parse(response.responseText);
				
				// Do some work to the Google Docs JSON to get it into a nicer format.
				// Not sure about the performance hit of this.
				var map = {};
				
				var root = JSON.parse(response.responseText);  
				var entries = root.feed.entry;
				
				for(var entry in entries)
				{
				  var match = map_regex.exec(entries[entry].content.$t);
				  
				  var t_id = match[1];
				  var t_name = match[2];
				  map[t_id] = t_name;
				 
				}
				
				GM_setValue('names', JSON.stringify(map));
				GM_setValue('last_updated', String(now));
	
				callback({ "names": map});
			}
		});
	}
	else
	{
		GM_log("using cached");
		callback({ "names": cached});
	}
}

getNames(function (response)
{
	var map = response.names;
	// map all the links alread in the document
	// alert(map);
	mapNames(map, document);
});

document.addEventListener('DOMNodeInserted', addMapFromEvent);



