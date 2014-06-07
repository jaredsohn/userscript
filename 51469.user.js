// KingsAgeX! user script
// version 0.73
// kingsage version 1.1.6
// 2011-01-18
// Copyright (c) 2009, 2010, 2011 Arxleol
// http://www.axino.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "KingsAgeX", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name KingsAgeX
// @namespace http://axino.net/code/
// @description script that extends functionallity of the free online game KingsAge
// @version 0.73
// @author Arxleol
// @copyright Axino.net (http://www.axino.net/)
// @include http://*.kingsage.*/*
// @include http://*.kingsage.*.*/*
// ==/UserScript==

//Google analytics for tracking usage of script.
/*window.googleAnalytics = function(){


var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));

try {
var pageTracker = _gat._getTracker("UA-6903425-1");
pageTracker._trackPageview();
} catch(err) {}
	
}*/

window.surAtt = function(j){
    
                  var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[3]/tbody/tr[6]/td["+j+"]";
                  
                  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
                  var rst=resultLinks.iterateNext();
              
                  if(parseInt(rst.innerHTML).toString()=="NaN"){
                    var key = 'loadattsur'+j;
                    GM_setValue(key, 0);
                    
                  }else{

                      var st = rst.innerHTML.toString();
                      
                      //alert(st + " :: " + st.length().toString());
                      var ll = 0;
                      var val = '';
                      
                      while(ll<st.length){
                      
                        if(st.charAt(ll).toString()!="."){
                      
                            val = val + st.charAt(ll);
                      
                      }
                      
                      
                      ll++;    
                          
                      }
                      
                    var key = 'loadattsur'+j;
                    GM_setValue(key, parseInt(val));
                    
                  }

    
}

window.surDef = function(j){

                  var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[4]/tbody/tr[6]/td["+j+"]";
                  
                  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
                  var rst=resultLinks.iterateNext();
              
                  if(parseInt(rst.innerHTML).toString()=="NaN"){
                    var key = 'loaddefsur'+j;
                    GM_setValue(key, 0);
                    
                  }else{

                      var st = rst.innerHTML.toString();
                      
                      //alert(st + " :: " + st.length().toString());
                      var ll = 0;
                      var val = '';
                      
                      while(ll<st.length){
                      
                        if(st.charAt(ll).toString()!="."){
                      
                            val = val + st.charAt(ll);
                      
                      }
                      
                      
                      ll++;    
                          
                      }
                      
                    var key = 'loaddefsur'+j;
                    GM_setValue(key, parseInt(val));
                    
                  }
    
}

window.troAtt = function(j){
    
                  var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[3]/tbody/tr[4]/td["+j+"]";
                  
                  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
                  var rst=resultLinks.iterateNext();
              
                  if(parseInt(rst.innerHTML).toString()=="NaN"){
                    var key = 'loadatttro'+j;
                    GM_setValue(key, 0);
                    
                  }else{

                      var st = rst.innerHTML.toString();
                      
                      //alert(st + " :: " + st.length().toString());
                      var ll = 0;
                      var val = '';
                      
                      while(ll<st.length){
                      
                        if(st.charAt(ll).toString()!="."){
                      
                            val = val + st.charAt(ll);
                      
                      }
                      
                      
                      ll++;    
                          
                      }
                      
                    var key = 'loadatttro'+j;
                    GM_setValue(key, parseInt(val));
                    
                  }

    
}

window.troDef = function(j){

                  var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[4]/tbody/tr[4]/td["+j+"]";
                  
                  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
                  var rst=resultLinks.iterateNext();
              
                  if(parseInt(rst.innerHTML).toString()=="NaN"){
                    var key = 'loaddeftro'+j;
                    GM_setValue(key, 0);
                    
                  }else{

                      var st = rst.innerHTML.toString();
                      
                      //alert(st + " :: " + st.length().toString());
                      var ll = 0;
                      var val = '';
                      
                      while(ll<st.length){
                      
                        if(st.charAt(ll).toString()!="."){
                      
                            val = val + st.charAt(ll);
                      
                      }
                      
                      
                      ll++;    
                          
                      }
                      
                    var key = 'loaddeftro'+j;
                    GM_setValue(key, parseInt(val));
                    
                  }
    
}

//This function updates list of settlements.
window.updateList = function(){
 
    //var li='<select name="listcitz"><option value="#">Select Settlement</option>';
    var li = '<div id="village_drop_down" style=" display: none;"><table style="width: 100%;" class="borderlist"><tbody>';

    //*[@id="qeText1"]
    //*[@id="qeText2"]  
    var j = 0;

    var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div/table/tbody/tr/td[4]/a";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();
    var tmp = false;
    
    alert("If you are premium user you do not need this function. Note that gameforge stole this idea from me :D Arxleol");
    
    do{
      
        j++;
              
            var om = j + 1;
            
            //Points to settlement link and name in none premium users
            ///html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td
            ///html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[3]/td/a
            var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+om+"]/td/a";
            var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
            var rst=resultLinks.iterateNext();
          
            if(rst!=null){

          	//Adjusts to arrow css.
	        li=li+'<tr><td class="marked_group"><a href="'+rst+'">'+rst.innerHTML+'</a></td></tr>';
          
            }else{
 
                break;
              
            }          
          
        /*}was part for checking whether user has premium or not*/

    }while(rst!=null);

    li=li+'</tbody></table></div>';
    GM_setValue('list',li.toString());

    alert("Settlement list is updated!");
 
}

//Function that generates extended map
window.extendedMap = function(){
	
	GM_setValue("exmap", false);   
	   
    //echo rst;
    
    //echo(rst.innerHTMl);
    
    var pp = parseInt(GM_getValue("xvalue"));
    var py = parseInt(GM_getValue("yvalue"));
    
    var point1 = "map.php?village="+qs['village']+"&x="+(pp-7)+"&y="+(py-7)+"";
    var point2 = "map.php?village="+qs['village']+"&x="+(pp+7)+"&y="+(py-7)+"";
    var point3 = "map.php?village="+qs['village']+"&x="+(pp-7)+"&y="+(py+6)+"";
	var point4 = "map.php?village="+qs['village']+"&x="+(pp+7)+"&y="+(py+6)+"";
	
    var findPattern = "/html/body";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();

    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+point1+"/>";
    GM_setValue("map1", rst.innerHTML);
    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+point2+"/>";
    GM_setValue("map2", rst.innerHTML);
    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+point3+"/>";
    GM_setValue("map3", rst.innerHTML);    
    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+point4+"/>"; 
	GM_setValue("map4", rst.innerHTML); 
    rst.innerHTML = "<table><tr><td>" + GM_getValue("map1") + "</td><td>" + GM_getValue("map2") + "</td></tr><tr><td>" + GM_getValue("map3") + "</td><td>" + GM_getValue("map4") + "</td></tr></table>";
	
    GM_setValue("map1", "");
    GM_setValue("map2", "");
    GM_setValue("map3", "");
    GM_setValue("map4", "");
	
}

//Function that generates XXL map
window.xxlMap = function(){
	
	GM_setValue("xxlmap", false);
	
    var pp = parseInt(GM_getValue("xvaluexxl"));
    var py = parseInt(GM_getValue("yvaluexxl"));	

    var findPattern = "/html/body";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();

	if(!((pp-35 < 0 || pp+34 > 998) && (py - 32 < 0 || py + 32 > 999))){

	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-28)+"&y="+(py-26)+""+"/>";
	    GM_setValue("map1", rst.innerHTML);		
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-14)+"&y="+(py-26)+""+"/>";
	    GM_setValue("map2", rst.innerHTML);			
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp)+"&y="+(py-26)+""+"/>";
	    GM_setValue("map3", rst.innerHTML);			
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+14)+"&y="+(py-26)+""+"/>";
	    GM_setValue("map4", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+28)+"&y="+(py-26)+""+"/>";
	    GM_setValue("map5", rst.innerHTML);	
	    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-28)+"&y="+(py-13)+""+"/>";
	    GM_setValue("map6", rst.innerHTML);		    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-14)+"&y="+(py-13)+""+"/>";
	    GM_setValue("map7", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp)+"&y="+(py-13)+""+"/>";
	    GM_setValue("map8", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+14)+"&y="+(py-13)+""+"/>";
	    GM_setValue("map9", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+28)+"&y="+(py-13)+""+"/>";
	    GM_setValue("map10", rst.innerHTML);		
	    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-28)+"&y="+(py)+""+"/>";
	    GM_setValue("map11", rst.innerHTML);		    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-14)+"&y="+(py)+""+"/>";
	    GM_setValue("map12", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp)+"&y="+(py)+""+"/>";
	    GM_setValue("map13", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+14)+"&y="+(py)+""+"/>";
	    GM_setValue("map14", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+28)+"&y="+(py)+""+"/>";
	    GM_setValue("map15", rst.innerHTML);

	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-28)+"&y="+(py+13)+""+"/>";
	    GM_setValue("map16", rst.innerHTML);		    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-14)+"&y="+(py+13)+""+"/>";
	    GM_setValue("map17", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp)+"&y="+(py+13)+""+"/>";
	    GM_setValue("map18", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+14)+"&y="+(py+13)+""+"/>";
	    GM_setValue("map19", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+28)+"&y="+(py+13)+""+"/>";
	    GM_setValue("map20", rst.innerHTML);
	    
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-28)+"&y="+(py+26)+""+"/>";
	    GM_setValue("map21", rst.innerHTML);		
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp-14)+"&y="+(py+26)+""+"/>";
	    GM_setValue("map22", rst.innerHTML);			
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp)+"&y="+(py+26)+""+"/>";
	    GM_setValue("map23", rst.innerHTML);			
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+14)+"&y="+(py+26)+""+"/>";
	    GM_setValue("map24", rst.innerHTML);	
	    rst.innerHTML = "<iframe scrolling=\"no\" width=\"798\" height=\"545\" frameborder=\"0\" src="+"map.php?village="+qs['village']+"&x="+(pp+28)+"&y="+(py+26)+""+"/>";
	    GM_setValue("map25", rst.innerHTML);		    
	    
		var A = "<table><tr><td>" + GM_getValue("map1") + "</td><td>" + GM_getValue("map2") + "</td><td>" + GM_getValue("map3") + "</td><td>" + GM_getValue("map4") + "</td><td>" + GM_getValue("map5") + "</td></tr>";
		var B = "<tr><td>" + GM_getValue("map6") + "</td><td>" + GM_getValue("map7") + "</td><td>" + GM_getValue("map8") + "</td><td>" + GM_getValue("map9") + "</td><td>" + GM_getValue("map10") + "</td></tr>";
		var C = "<tr><td>" + GM_getValue("map11") + "</td><td>" + GM_getValue("map12") + "</td><td>" + GM_getValue("map13") + "</td><td>" + GM_getValue("map14") + "</td><td>" + GM_getValue("map15") + "</td></tr>";
		var D = "<tr><td>" + GM_getValue("map16") + "</td><td>" + GM_getValue("map17") + "</td><td>" + GM_getValue("map18") + "</td><td>" + GM_getValue("map19") + "</td><td>" + GM_getValue("map20") + "</td></tr>";
		var F = "<tr><td>" + GM_getValue("map21") + "</td><td>" + GM_getValue("map22") + "</td><td>" + GM_getValue("map23") + "</td><td>" + GM_getValue("map24") + "</td><td>" + GM_getValue("map25") + "</td></tr></table>";
		
		rst.innerHTML = A + B + C + D + F;
		
		for(var i = 1; i <= 25; i++){
		
			GM_setValue("map"+i.toString(), "");
			
		}
		
	}else{
	
		alert("incorrect coordinates");
		
	}
	
	
}

//Function determines coordinates of the current village
window.coordinatesFinder = function(){
	
	//alert("ups");
	
	var findPattern = "//*[@id=\"settlement\"]";
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();
	
	var tmp = rst;
	
	var x = tmp.innerHTML.substring(0, tmp.innerHTML.indexOf("|"));
	
	tmp.innerHTML = tmp.innerHTML.substring(tmp.innerHTML.indexOf("|")+1);
	
	var y = tmp.innerHTML.substring(0, tmp.innerHTML.indexOf("|"));
	
	GM_setValue("xcorv", x);
	GM_setValue("ycorv", y);
	
}


//this function check if there is new version of script available
window.checkVersion = function(){

	var tmp = new Date().getTime();

	var tm = GM_getValue("tcv", 0);

	if(tm == 0){
		
		GM_setValue("tcv", parseInt(tmp/1000));

	}else{

		if(tmp/1000 - parseInt(tm) >= 90000){

			GM_setValue("tcv", parseInt(tmp/1000));

			GM_xmlhttpRequest({
			    method: 'GET',
			    url: 'http://userscripts.org/scripts/source/51469.meta.js',
			    headers: {
			        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			        'Accept': 'application/html,application/xml,text/xml',
			    },
			    onload: function(responseDetails) {
			    	
			    	var text = responseDetails.responseText;
			    	vs=text.split("\n");
			    	vers = vs[4].substring(12);

			    	if(version < parseFloat(vers)){
			    		
			    		alert("New version of KingsAgeX is out!");

			    		window.location = "http://userscripts.org/scripts/source/51469.user.js";
			    		
						window.reload();
			
			    	}
			    	
			    	
			    	
			    }
			});		
			
		}
		
	}

}
	
//Function for generating server map
window.generateServerMap = function(){
	//<img src="http://s5.kingsage.org/minimap.php?x=471&y=599"/>
	/*
	popupWin = window.open('http://s5.kingsage.org/game.php?village=12850&s=map&a=saveMinimapSize&p=dacb&size=4', 'open_window', 'menubar, toolbar, location, directories, status, scrollbars, resizable, dependent, width=640, height=480, left=0, top=0');
	
	popupWin.close();
	*/
    var findPattern = "/html/body";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();	
    
	var locs = window.location.toString();
	
	var ls = locs.split("/");
	
	var linky = ls[2];
    
    var simul = "<div><table cellSpacing=\"0\" cellPadding=\"0\">";
    
    for(i=0; i < 21; i++){
    
    	simul = simul + "<tr>";
    	
    	for(j=0; j < 21; j++){
    	
    		simul = simul + "<td><img src=\"http://"+linky+"/minimap.php?x="+((j*45)+25)+"&y="+((i*45)+25)+"\"/></td>";
    		
    	}
    	
    	simul = simul + "</tr>";
    	
    }
    
    rst.innerHTML = simul + "</table></div>";
    
    
	
}

/*
 *
 __  ___  __  .__   __.   _______      _______.     ___       _______  __________   ___
|  |/  / |  | |  \ |  |  /  _____|    /       |    /   \     /  _____||   ____\  \ /  /
|  '  /  |  | |   \|  | |  |  __     |   (----`   /  ^  \   |  |  __  |  |__   \  V  /
|    <   |  | |  . `  | |  | |_ |     \   \      /  /_\  \  |  | |_ | |   __|   >   <
|  .  \  |  | |  |\   | |  |__| | .----)   |    /  _____  \ |  |__| | |  |____ /  .  \
|__|\__\ |__| |__| \__|  \______| |_______/    /__/     \__\ \______| |_______/__/ \__\

 *
 *

     ___      .______     ___   ___  __       _______   ______    __
    /   \     |   _  \    \  \ /  / |  |     |   ____| /  __  \  |  |
   /  ^  \    |  |_)  |    \  V  /  |  |     |  |__   |  |  |  | |  |
  /  /_\  \   |      /      >   <   |  |     |   __|  |  |  |  | |  |
 /  _____  \  |  |\  \----./  .  \  |  `----.|  |____ |  `--'  | |  `----.
/__/     \__\ | _| `._____/__/ \__\ |_______||_______| \______/  |_______|
 *
 *
 *
 *
 *
 */

//Current scripts version
var version = 0.73;

//check for new version
window.checkVersion();	
	
//Separates variables and values from URL of current page
    var qs=new Array();
    var loc=location.search;
    if (loc){loc=loc.substring(1);
    var parms=loc.split('&');
    for(var i=0;i<parms.length;i++){
        nameValue=parms[i].split('=');
        qs[nameValue[0]]=unescape(nameValue[1]);
        }
    }
      
 //Detection if we are in map mode
if(qs['s'].toString()=='map'.toString() && GM_getValue("exmap", false)){
	
    extendedMap();
    
//This is part of code specializied for XXL map
}else if(qs['s'].toString()=='map'.toString() && GM_getValue("xxlmap", false)){
	
    xxlMap();
    
}

//Detects  whether it is village overview and puts update! button
// also alerts user when list was updated.
if(qs['s'].toString()=='overview_villages'){
 
    var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/b";
    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();
    rst.innerHTML=rst.innerHTML+'<input type="button" value="update!"/>';
 
    var buttonxpath ='/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td/b/input';
    var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    button=buttons.iterateNext()
    button.addEventListener('click',
        function (event) {
            window.updateList();
        },true);
        
}else{

    if(!(GM_getValue('list','').toString() == '' || GM_getValue('list','').toString() == 'emp')){

    	//Changes drop down list to settlement list :D only for none-premium users
    	if(!GM_getValue('haspremium', false)){

            var findPattern = "//*[@id=\"container_village_drop_down\"]";
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();
	    rst.innerHTML=GM_getValue('list');
            
    	}

    }
}

//This part shows and updates options of KingsAgeX in the Castle
if(qs['s'].toString()=="build_main"){

    //loads current settings
    var tmp15 = GM_getValue('haspremium', 'yes');
    
    if(tmp15){
		
		tmp15 = "YES!";
		
	}else{
		
		tmp15 = "NO!";
		
	}
	
	var tmp16 = GM_getValue('suse', false);
	
    if(tmp16){
		
		tmp16 = "NO!";
		tmpsu = "<strong>YES!</strong>";
		
	}else{
		
		tmp16 = "YES!";
		tmpsu = "<strong>NO!</strong>";
		
	}	
	
 	var tmp17 = GM_getValue('jumperuse', false);
	
    if(tmp17){
		
		tmp17 = "NO!"; 
		tmpju="<strong>YES!</strong>";
		
	}else{
		
		tmp17 = "YES!";
		tmpju="<strong>NO!</strong>";
		
	}	   
	 
    //Inserting of kingsagex options
    
    if(tmp15 == "NO!"){
    
    	var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div";
    	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    	var rst=resultLinks.iterateNext();
    	rst.innerHTML = rst.innerHTML + "<table style=\"width: 820px;\" class=\"borderlist\"><tbody><tr><th>KingsAgeX options:</th></tr><tr><td>Do you have premium: <input type=\"button\" value=\"Yes!\" id=\"yespremium\"><input type=\"button\" value=\"No!\" id=\"nopremium\"> default is Yes! &bull Current answer is: <strong>"+tmp15+"</strong></td></tr><tr><td>Use settlement name shortener: <input type=\"button\" value=\""+tmp16+"\" id=\"suse\"> default is No! &bull; Current answer is: <span>" + tmpsu + "</span></td></tr><tr><td>Use drop down list to jump to current position: <input type=\"button\" value=\""+tmp17+"\" id=\"jumperuse\"> default is No! &bull; Current answer is: <span>"+ tmpju +"</span></td></tr><tr><td>Extended map: X: <input type=\"text\" size=\"3\" id=\"xvalue\"> Y: <input type=\"text\" size=\"3\" id=\"yvalue\"><input type=\"button\" value=\"View!\" id=\"viewmap\"></td></tr><tr><td>XXL map: X: <input type=\"text\" size=\"3\" id=\"xvaluexxl\"> Y: <input type=\"text\" size=\"3\" id=\"yvaluexxl\"><input type=\"button\" value=\"Show!\" id=\"xxlmap\">&bull<i>remember that this puts large load on server and your browser.</i></td></tr><tr><td>Generate server map: <input type=\"button\" value=\"generate\" id=\"gosmap\" /> &bull; Before use switch to the map 9*9 sectors, 5 pixels per field.</td></tr><tr><td>Use this function to clean settlement list. <input type='button' value='Clean list' id='cleanButton' /></td></tr></tbody></table>";
    
    }else{
    
        var findPattern = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();
        rst.innerHTML = rst.innerHTML + "<table style=\"width: 820px;\" class=\"borderlist\"><tbody><tr><th>KingsAgeX options:</th></tr><tr><td>Do you have premium: <input type=\"button\" value=\"Yes!\" id=\"yespremium\"><input type=\"button\" value=\"No!\" id=\"nopremium\"> default is Yes! &bull Current answer is: <strong>"+tmp15+"</strong></td></tr><tr><td>Use settlement name shortener: <input type=\"button\" value=\""+tmp16+"\" id=\"suse\"> default is No! &bull; Current answer is: <span>" + tmpsu + "</span></td></tr><tr><td>Use drop down list to jump to current position: <input type=\"button\" value=\""+tmp17+"\" id=\"jumperuse\"> default is No! &bull; Current answer is: <span>"+ tmpju +"</span></td></tr><tr><td>Extended map: X: <input type=\"text\" size=\"3\" id=\"xvalue\"> Y: <input type=\"text\" size=\"3\" id=\"yvalue\"><input type=\"button\" value=\"View!\" id=\"viewmap\"></td></tr><tr><td>XXL map: X: <input type=\"text\" size=\"3\" id=\"xvaluexxl\"> Y: <input type=\"text\" size=\"3\" id=\"yvaluexxl\"><input type=\"button\" value=\"Show!\" id=\"xxlmap\">&bull<i>remember that this puts large load on server and your browser.</i></td></tr><tr><td>Generate server map: <input type=\"button\" value=\"generate\" id=\"gosmap\" /> &bull; Before use switch to the map 9*9 sectors, 5 pixels per field.</td></tr><tr><td>Use this function to clean settlement list. <input type='button' value='Clean list' id='cleanButton' /></td></tr></tbody></table>";
            	    	
    }

    if(GM_getValue('haspremium', true)){
        
        var findPattern = "//*[@id=\"yespremium\"]";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();    
        rst.disabled = true;
        var findPattern = "//*[@id=\"nopremium\"]";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();    
        rst.disabled = false;
		        
    }else{
        
        var findPattern = "//*[@id=\"nopremium\"]";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();    
        rst.disabled = true;
        var findPattern = "//*[@id=\"yespremium\"]";
        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
        var rst=resultLinks.iterateNext();    
        rst.disabled = false;
        
    }

        var buttonxpath ="//*[@id=\"yespremium\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button1=buttons.iterateNext();
        button1.addEventListener('click',
            function (event) {
                
                button1.disabled = true;
                GM_setValue("haspremium", true);
                
                var buttonxpath ="//*[@id=\"nopremium\"]";
                var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
                button1x=buttons.iterateNext();
                
                button1x.disabled = false;
                
            },true);    

        var buttonxpath ='//*[@id=\"nopremium\"]';
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button2=buttons.iterateNext();
        button2.addEventListener('click',
            function (event) {
                
                button2.disabled = true;
                GM_setValue("haspremium", false);
                
                var buttonxpath ="//*[@id=\"yespremium\"]";
                var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
                button2x=buttons.iterateNext();
                
                button2x.disabled = false;
                
            },true);    

        var buttonxpath ="//*[@id=\"suse\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button3=buttons.iterateNext();
        button3.addEventListener('click',
            function (event) {
                
                if(button3.value == 'YES!'){
					
	                button3.value = 'NO!';
	                GM_setValue("suse", true);		
					
				}else{
					
	                button3.value = 'YES!';
	                GM_setValue("suse", false);				               
					
				}
                

                
            },true);        

        var buttonxpath ="//*[@id=\"jumperuse\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button4=buttons.iterateNext();
        button4.addEventListener('click',
            function (event) {

                if(button4.value == 'YES!'){
					
	                button4.value = 'NO!';
	                GM_setValue("jumperuse", true);					
					
				}else{
					
	                button4.value = 'YES!';
	                GM_setValue("jumperuse", false);					
					
				}
                

                
            },true);          
        
        var buttonxpath ="//*[@id=\"viewmap\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button6=buttons.iterateNext();
        button6.addEventListener('click',
            function (event) {
              
              GM_setValue("exmap", true);
              
              var findPattern = "//*[@id=\"xvalue\"]";
  			  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    		  var rst=resultLinks.iterateNext();
    		  
    		  GM_setValue("xvalue", rst.value);
              
              var findPattern = "//*[@id=\"yvalue\"]";
  			  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    		  var rst=resultLinks.iterateNext();
    		  
    		  GM_setValue("yvalue", rst.value);              
              
			  window.location = window.location + "&s=map";
              window.reload();  
            
            },true);                

        var buttonxpath ="//*[@id=\"xxlmap\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button7=buttons.iterateNext();
        button7.addEventListener('click',
            function (event) {
              
              GM_setValue("xxlmap", true);
              
              var findPattern = "//*[@id=\"xvaluexxl\"]";
  			  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    		  var rst=resultLinks.iterateNext();
    		  
    		  GM_setValue("xvaluexxl", rst.value);
              
              var findPattern = "//*[@id=\"yvaluexxl\"]";
  			  var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
    		  var rst=resultLinks.iterateNext();
    		  
    		  GM_setValue("yvaluexxl", rst.value);              
              
			  window.location = window.location + "&s=map";
              window.reload();  
            
            },true);          
    
        
        var buttonxpath ="//*[@id=\"gosmap\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button8=buttons.iterateNext();
        button8.addEventListener('click',
            function (event) {
                
        		generateServerMap();
                
            },true);

        //Code for cleaning settlement list.
        var buttonxpath ="//*[@id=\"cleanButton\"]";
        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
        button8=buttons.iterateNext();
        button8.addEventListener('click',
            function (event) {

                GM_setValue('list','');
                alert('Settlement list cleared.');

            },true);
        
}

//This part of script check if member entered barracks simulator!
if(qs['s'].toString()=="build_barracks"){
	
	if(qs['m'].toString()=="sim" && !GM_getValue("haspremium", true)){
	    
	    if(GM_getValue("loadsimsur")){
	    
	        GM_setValue("loadsimsur", false);
	        //*[@id="att_spear"]
	        var findPattern = "//*[@id=\"att_spear\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur2");
	        //*[@id="def_spear"]
	        var findPattern = "//*[@id=\"def_spear\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur2");
	        //*[@id="att_sword"]    
	        var findPattern = "//*[@id=\"att_sword\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur3");
	        //*[@id="def_spear"]
	        var findPattern = "//*[@id=\"def_sword\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur3");
	        //*[@id="att_axe"]
	        var findPattern = "//*[@id=\"att_axe\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur4");
	        //*[@id="def_axe"]//*[@id="att_axe"]
	        var findPattern = "//*[@id=\"def_axe\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur4");                        
	        //*[@id="att_bow"]
	        var findPattern = "//*[@id=\"att_bow\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur5");    
	        //*[@id="def_bow"]
	        var findPattern = "//*[@id=\"def_bow\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur5");    
	        //*[@id="att_spy"]
	        var findPattern = "//*[@id=\"att_spy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur6");
	        //*[@id="def_spy"]
	        var findPattern = "//*[@id=\"def_spy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur6");        
	        //*[@id="att_light"]
	        var findPattern = "//*[@id=\"att_light\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur7");
	        //*[@id="def_light"]
	        var findPattern = "//*[@id=\"def_light\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur7");
	        //*[@id="att_heavy"]    
	        var findPattern = "//*[@id=\"att_heavy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur8");
	        //*[@id="def_heavy"]
	        var findPattern = "//*[@id=\"def_heavy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur8");
	        //*[@id="att_ram"]
	        var findPattern = "//*[@id=\"att_ram\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur9");
	        //*[@id="def_ram"]
	        var findPattern = "//*[@id=\"def_ram\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur9");                        
	        //*[@id="att_kata"]
	        var findPattern = "//*[@id=\"att_kata\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur10");    
	        //*[@id="def_kata"]
	        var findPattern = "//*[@id=\"def_kata\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur10");    
	        //*[@id="att_snob"]
	        var findPattern = "//*[@id=\"att_snob\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadattsur11");
	        //*[@id="def_snob"]
	        var findPattern = "//*[@id=\"def_snob\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddefsur11");        
	        
	    }else if(GM_getValue("loadsimtro")){
	        
	        GM_setValue("loadsimtro", false);
	        //*[@id="att_spear"]
	        var findPattern = "//*[@id=\"att_spear\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro2");
	        //*[@id="def_spear"]
	        var findPattern = "//*[@id=\"def_spear\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro2");
	        //*[@id="att_sword"]    
	        var findPattern = "//*[@id=\"att_sword\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro3");
	        //*[@id="def_spear"]
	        var findPattern = "//*[@id=\"def_sword\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro3");
	        //*[@id="att_axe"]
	        var findPattern = "//*[@id=\"att_axe\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro4");
	        //*[@id="def_axe"]//*[@id="att_axe"]
	        var findPattern = "//*[@id=\"def_axe\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro4");                        
	        //*[@id="att_bow"]
	        var findPattern = "//*[@id=\"att_bow\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro5");    
	        //*[@id="def_bow"]
	        var findPattern = "//*[@id=\"def_bow\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro5");    
	        //*[@id="att_spy"]
	        var findPattern = "//*[@id=\"att_spy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro6");
	        //*[@id="def_spy"]
	        var findPattern = "//*[@id=\"def_spy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro6");        
	        //*[@id="att_light"]
	        var findPattern = "//*[@id=\"att_light\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro7");
	        //*[@id="def_light"]
	        var findPattern = "//*[@id=\"def_light\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro7");
	        //*[@id="att_heavy"]    
	        var findPattern = "//*[@id=\"att_heavy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro8");
	        //*[@id="def_heavy"]
	        var findPattern = "//*[@id=\"def_heavy\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro8");
	        //*[@id="att_ram"]
	        var findPattern = "//*[@id=\"att_ram\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro9");
	        //*[@id="def_ram"]
	        var findPattern = "//*[@id=\"def_ram\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro9");                        
	        //*[@id="att_kata"]
	        var findPattern = "//*[@id=\"att_kata\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro10");    
	        //*[@id="def_kata"]
	        var findPattern = "//*[@id=\"def_kata\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro10");    
	        //*[@id="att_snob"]
	        var findPattern = "//*[@id=\"att_snob\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loadatttro11");
	        //*[@id="def_snob"]
	        var findPattern = "//*[@id=\"def_snob\"]";
	        var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	        var rst=resultLinks.iterateNext();
	        rst.value=GM_getValue("loaddeftro11");
	        
	    }
	        
	}

}

//This is part of code that changes info village page
if(qs['s'].toString()=='info_village'){
	
	//Performs check whether user has premium or not first part is no second is yes
	
	if(!GM_getValue('haspremium', true)){
	
		var findPattern1 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/table/tbody/tr[2]/td[2]";
		var findPattern2 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/table/tbody/tr[2]/td[2]/a";
	    var findPattern3 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[4]/table";
	
	}else{
	
		var findPattern1 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr[2]/td[2]";
		var findPattern2 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table/tbody/tr[2]/td[2]/a";
	    var findPattern3 = "/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/table";		
		
	}
    
    var resultLinks = document.evaluate( findPattern1, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();	
    
    rst.innerHTML = rst.innerHTML + " <input type=\"button\" value=\"Xmap\" id=\"xmap\">" + "<input type=\"button\" value=\"XXLmap\" id=\"xxlmap\">";

    var resultLinks = document.evaluate( findPattern2, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();
    
    var cor=new Array();
    var loc=rst.href;
    if (loc){loc=loc.substring(1);
    var parms=loc.split('&');
    for(var i=0;i<parms.length;i++){
        nameValue=parms[i].split('=');
        cor[nameValue[0]]=unescape(nameValue[1]);
        }
    }

    coordinatesFinder();
    
    var xm = parseInt(GM_getValue("xcorv"));
    var ym = parseInt(GM_getValue("ycorv"));
    
    var xn = parseInt(cor['x']);
    var yn = parseInt(cor['y']);
    
    var distance = Math.sqrt(Math.pow(xm-xn,2)+Math.pow(ym-yn,2));

    var i = 0;
    
    var speeds = new Array(22,18,18,18,9,10,11,30,30,35);
    var hours = new Array();
    var minutes = new Array();
    var seconds = new Array();

    while(i < 10){

    
    	var time = speeds[i]*60*distance;
    	hours[i] = Math.floor(time/3600);
    	minutes[i] = Math.floor((time%3600)/60);
    	seconds[i] = Math.ceil((time%3600)%60);
    	
    	i++;

    }
    
    if(distance > 70){
    
    	coutnwarning = " <strong><font color=\"red\">Count cannot go more then 70 fields</font></strong>";
    	
    }else{
    
    	coutnwarning = "";
    	
    }
    

    var resultLinks = document.evaluate( findPattern3, document, null, XPathResult.ANY_TYPE , null );
    var rst=resultLinks.iterateNext();

    rst.innerHTML = rst.innerHTML + "<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_sword.png\"/> Templar: </td><td>"+hours[0]+":"+minutes[0]+":"+seconds[0]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_spear.png\"/> Squire: </td><td>"+hours[1]+":"+minutes[1]+":"+seconds[1]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_axe.png\"/> Berserker: </td><td>"+hours[2]+":"+minutes[2]+":"+seconds[2]+"</td></tr><tr>" +
    		"<td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_bow.png\"/> Long-bow: </td><td>"+hours[3]+":"+minutes[3]+":"+seconds[3]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_spy.png\"/> Spy: </td><td>"+hours[4]+":"+minutes[4]+":"+seconds[4]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_light.png\"/> Crusader: </td><td>"+hours[5]+":"+minutes[5]+":"+seconds[5]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_heavy.png\"/> Black knight: </td><td>"+hours[6]+":"+minutes[6]+":"+seconds[6]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_ram.png\"/> Battering ram: </td><td>"+hours[7]+":"+minutes[7]+":"+seconds[7]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_kata.png\"/> Trebuche: </td><td>"+hours[8]+":"+minutes[8]+":"+seconds[8]+"</td></tr>" +
    		"<tr><td><img alt=\"\" src=\"http://s5.kingsage.org/img/units/unit_snob.png\"/>Count: </td><td>"+hours[9]+":"+minutes[9]+":"+seconds[9]+coutnwarning+"</td></tr>";

    
    var buttonxpath ="//*[@id=\"xmap\"]";
    var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    buttonx=buttons.iterateNext();
    buttonx.addEventListener('click',
        function (event) {
    	
    	GM_setValue("exmap", true);   

        GM_setValue("xvalue", cor['x']);
        GM_setValue("yvalue", cor['y']);  
        
        extendedMap();
            
        },true); 	
    
    var buttonxpath ="//*[@id=\"xxlmap\"]";
    var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    buttony=buttons.iterateNext();
    buttony.addEventListener('click',
        function (event) {
            
			GM_setValue("xxlmap", true);
		  	
			GM_setValue("xvaluexxl", cor['x']);
			GM_setValue("yvaluexxl", cor['y']); 

			xxlMap();		
			
        },true); 	    

    
}

//This parts add for nonepremium members ability to insert troops into simulator like premium users can...
if(qs['s'] === undefined){

	if(qs['s'].toString()=='messages' && !GM_getValue("haspremium", true)){
	    
	    var findPattern = "/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[7]/tbody";
	    var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	    var rst=resultLinks.iterateNext();
	    
	    rst.innerHTML = "<tr><td><img alt=\"\" src=\"http://s1.kingsage.org/img/arrow_right_raquo.png\"/> <span class=\"click\">Insert surviving troops into Simulator</span></td></tr><tr><td><img alt=\"\" src=\"http://s1.kingsage.org/img/arrow_right_raquo.png\"/> <span class=\"click\">Insert troops into Simulator</span></td></tr>" + rst.innerHTML;
	    
	        var buttonxpath ='/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[7]/tbody/tr/td/span';
	        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	        button=buttons.iterateNext()
	        button.addEventListener('click',
	            function (event) {
	              GM_setValue('loadsimsur',true);
	              
	              var j = 2;
	              
	              while(j <= 11){
	
	                  window.surAtt(j);
	                  window.surDef(j);
	                  j++;
	                  
	            }
	              
	                window.location=window.location+"&s=build_barracks&m=sim";
	              
	                windows.reload();
	                
	            },true);
	
	        var buttonxpath ='/html/body/div/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[3]/div[2]/table[7]/tbody/tr[2]/td/span';
	        var buttons = document.evaluate(buttonxpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	        button=buttons.iterateNext()
	        button.addEventListener('click',
	            function (event) {
	              GM_setValue('loadsimtro',true);
	              
	              var j = 2;
	              
	              while(j <= 11){
	
	                  window.troAtt(j);
	                  window.troDef(j);
	                  j++;
	                  
	            }
	              
	                window.location=window.location+"&s=build_barracks&m=sim";
	              
	                windows.reload();            },true);
	        
	}else{
	    
	    
	    
	}
	
}