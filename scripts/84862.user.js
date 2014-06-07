// ==UserScript==
// @name           Ikariam safe storage indicators
// @namespace      BadgerWorks it smells better than a Skunk 
// @description    uninstall old versions before installing current version 0.2. the this script gives a display of the safe storage capacity and calculates the safe capacity left or the resources over the safe limit and displays that too. not approved, use at your own risk. 
// @author         Euler (http://userscripts.org/users/Euler)
// @version        0.3
// @include        http://s*.ikariam.*
// @exclude        http://board.*.ikariam.*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

//============================================================================
//Copyright © 2010 Euler
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.
//============================================================================

// book keeping
///> changelog
  //0.0 initial release.
  //0.1 added GM_registerMenuCommands to set the display options.  
  //    added tooltip displays.
  //0.2 changed the options to appear in the Ikariam options screen.
  //    changed it to looks at the levels of dump and warehouse, to caluclate the safe and maxcapacity.
  //    changed to have options to set if you have Double storage capacity and Double theft security 
  //0.3 fixed the buttons in options
  //    it knows that there are goods in a trading post.
  //0.4 fixed a bug so it works with "show coordinates in town navigation"
///< changelog

///> to do's
  // fix it so goods in trading post can't be (-) if the cap is 2X 
  // add more comments.
  // add color to the resource display to indicate safe and lootable with tooltip view. not to interfere with 75% and 100% capacity colors. 
  // add an updater.
///< to do's
 
  //options 
function optfun()
{    if (GM_getValue(opt1)=="on")
    {document.getElementById( 'button001' ).innerHTML='<button class="button">main view is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button001' ).innerHTML='<button class="button">main view is "off" click to change</button></a>'   
	  }
///////////////////////
if (GM_getValue(opt2)=="on")
    {document.getElementById( 'button002' ).innerHTML='<button class="button">tooltip view is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button002' ).innerHTML='<button class="button">tooltip view is "off" click to change</button></a>'   
	  }
///////////////////////
if (GM_getValue(opt3)=="on")
    {document.getElementById( 'button003' ).innerHTML='<button class="button">Double storage capacity is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button003' ).innerHTML='<button class="button">Double storage capacity is "off" click to change</button></a>'   
	  }
////////////////////////
if (GM_getValue(opt4)=="on")
    {document.getElementById( 'button004' ).innerHTML='<button class="button">Double theft security is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button004' ).innerHTML='<button class="button">Double theft security is "off" click to change</button></a>'   
	  }	  
};

var opt1=document.domain +"1";
var opt2=document.domain +"2";
var opt3=document.domain +"3";
var opt4=document.domain +"4";

if (GM_getValue(opt1)!=="on" && GM_getValue(opt1)!=="off")
    { GM_setValue(opt1,"on"); };

if (GM_getValue(opt2)!=="on" && GM_getValue(opt2)!=="off")
    { GM_setValue(opt2,"on"); };

if (GM_getValue(opt2)!=="on" && GM_getValue(opt2)!=="off")
    { GM_setValue(opt2,"off");  };

if (GM_getValue(opt2)!=="on" && GM_getValue(opt2)!=="off")
    { GM_setValue(opt2,"off");
       alert( 'Ikariam safe storage indicators\n'+
              'main view is "on"\n'+
              'tooltip view is "on"\n'+
              'Double storage capacity is "off"\n'+
              'Double theft security is "off"\n'+
              'To change the defaults go to options\n');
     };
     
function opt_1() 
{   if (GM_getValue(opt1)=="on")
    { GM_setValue(opt1,"off");
      optfun() 
      return
    };
	GM_setValue(opt1,"on");
	optfun()
}

function opt_2() 
{ if (GM_getValue(opt2)=="on")
    { GM_setValue(opt2,"off");
      optfun() 
      return
    };
	GM_setValue(opt2,"on");
	optfun()
}

function opt_3() 
{
   if (GM_getValue(opt3)=="on")
    { GM_setValue(opt3,"off");
      optfun() 
      return
    };
	GM_setValue(opt3,"on");
	optfun()
}

function opt_4() 
{ if (GM_getValue(opt4)=="on")
    { GM_setValue(opt4,"off");
      optfun() 
      return
    };
	GM_setValue(opt4,"on");
	optfun()
} 
  //end of options
      
// gets the number of resources in the town
function getvalue(Resource)
  { return parseInt(document.getElementById(Resource).innerHTML.replace(",","").replace(".","")); 
  }

//calculates the difference of what can be safe and the number of resources      
//positive if there is safe space left
function safespaceleft(Resource)
  { return secure-Resource; 
  }

// sets the font color   
function fcolor(Resource)
  { if (Resource<0)
      { //sets font to red if not secure
        return '#F00000';
      }
    else
      {//set font color to green
        return '#00a000';
      }
  }

// sets the tag 
function tag(Resource)
  { if (Resource<0)
      { return "lootable goods";
      }
    else
      {return "safe space left";
      }
  }

// adds commas it will go to 999,999,999 
function addcomma(Resource)
  { if (Resource.length>6)
      { return Resource.slice(0,Resource.length-6) +","+ Resource.slice(Resource.length-6,Resource.length-3)+","+ Resource.slice(Resource.length-3,Resource.length);
      }
   if (Resource.length>3)
      { return Resource.slice(0,Resource.length-3) +","+ Resource.slice(Resource.length-3,Resource.length);
      } 
    else
      { return Resource;
      };
  }
  //finds the capacity from the tooltip may be deffrent than from the # of wearhouses and dumps 
function getcapacity(numb)
  { var str=document.getElementById("cityResources").getElementsByClassName("tooltip")[numb].innerHTML;
    var str2="";
    var start=str.indexOf('Storage capacity')+15;
    var last=str.indexOf('Trading Post');
    if(last=-1)
    { last=str.length};
   for (var count = start; count<=last ; count += 1) 
      {	if (str[count]==0 || str[count]==1 || str[count]==2 || str[count]==3 || str[count]==4 || str[count]==5 || str[count]==6 || str[count]==7 || str[count]==8 || str[count]==9)
        { str2=str2 + str[count];
        }
      }
    return parseInt(str2);
  }  
  
// sends the number to the screen with position
function to_page(Resource , left , top )
  { var newDiv = document.createElement("div");
    newDiv.setAttribute("style","left:"+left+"px; top:"+top+"px; position:absolute");
    Resource= Resource.fontsize("1"); 
    newDiv.innerHTML =Resource;
    document.getElementById('cityNav').appendChild(newDiv);
  }

//
function to_tip(safe , secure , tag , num)
  { document.getElementById("cityResources").getElementsByClassName("tooltip")[num].innerHTML ='<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '</tr>' +
                        '</tbody></table>' +
                          document.getElementById("cityResources").getElementsByClassName("tooltip")[num].innerHTML  +
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div>' + "safe capacity: "+secure +
                          '</td>' +
                            '</tr>' +
                        '</tbody></table>'+
                        '<div>' 
                        + tag + ": " + safe+
                         '</td>' +
                            '</tr>';
  }
  
var cityid=document.getElementById("citySelect").value;
var cityiddump=document.getElementById("citySelect").value + "dump";
var body=document.getElementsByTagName("body")[0].id;  




if (body=="city")
{
var test1=document.getElementById("citySelect")[document.getElementById("citySelect").selectedIndex].innerHTML.slice(13)+"";
test1=test1.split(";");
test1=test1[test1.length-1];
var test2=document.getElementsByClassName("city")[0].innerHTML+"";

// check that you are looking at the same city that is slected
if (test1==test2) 
{ var  TWL=0;
  var  TDL=0;
//>>>>>modified from Town Enhancer script by BagBag (aka CactiFantastico)
for (var buildingLocation = 0; buildingLocation <= 14; buildingLocation += 1) 
{		var locationObject = document.getElementById("position"+buildingLocation);
		var buildingClass = locationObject.className.split(" ")[0].trim();
    var buildingLevel = parseInt(locationObject.getElementsByTagName("a")[0].title.split(" ")[locationObject.getElementsByTagName("a")[0].title.split(" ").length-1].trim());
if (buildingClass == "warehouse") { TWL+=buildingLevel }
if (buildingClass == "dump") { TDL+=buildingLevel }
};
//<<<<<modified from Town Enhancer script by BagBag (aka CactiFantastico)

//secure
GM_setValue(cityid,480*TWL + 100);
//cap
GM_setValue(cityiddump,8000*TWL + 4*8000*TDL + 1500);
};
};

//
var secure = GM_getValue(cityid);		
var cap = GM_getValue(cityiddump); 
//
if (GM_getValue(opt3)=='on')
    {cap *=2};
if (GM_getValue(opt4)=='on')
    {secure *=2};  

//
var woodcap = getcapacity(0);
var winecap = getcapacity(1);
var marblecap = getcapacity(2);
var glasscap = getcapacity(3);
var sulphurcap = getcapacity(4);

//
var woodStock = getvalue("value_wood")+cap-woodcap;
var wineStock = getvalue("value_wine")+cap-winecap;
var marbleStock = getvalue("value_marble")+cap-marblecap;
var glassStock = getvalue("value_crystal")+cap-glasscap;
var sulphurStock =getvalue("value_sulfur")+cap-sulphurcap;

//
var woodsafe=safespaceleft(woodStock);
var winesafe=safespaceleft(wineStock);
var marblesafe=safespaceleft(marbleStock);
var glasssafe=safespaceleft(glassStock);
var sulphursafe=safespaceleft(sulphurStock);

//
var woodcolor=fcolor(woodsafe);
var winecolor=fcolor(winesafe);
var marblecolor=fcolor(marblesafe);
var glasscolor=fcolor(glasssafe); 
var sulphurcolor=fcolor(sulphursafe);

//
var woodtag=tag(woodsafe);
var winetag=tag(winesafe);
var marbletag=tag(marblesafe);
var glasstag=tag(glasssafe); 
var sulphurtag=tag(sulphursafe);

//
woodsafe=Math.abs(woodsafe);
winesafe=Math.abs(winesafe);
marblesafe=Math.abs(marblesafe);
glasssafe=Math.abs(glasssafe);
sulphursafe=Math.abs(sulphursafe); 

//  
secure +='';
woodsafe +='';
winesafe +='';
marblesafe +='';
glasssafe +='';
sulphursafe +='';

//
secure=addcomma(secure);
woodsafe=addcomma(woodsafe);
winesafe=addcomma(winesafe);
marblesafe=addcomma(marblesafe);
glasssafe=addcomma(glasssafe);
sulphursafe=addcomma(sulphursafe);

//
woodsafe = woodsafe.fontcolor(woodcolor);
winesafe = winesafe.fontcolor(winecolor);
marblesafe = marblesafe.fontcolor(marblecolor);
glasssafe = glasssafe.fontcolor(glasscolor);
sulphursafe = sulphursafe.fontcolor(sulphurcolor);

//
if (GM_getValue(opt1)=="on")
  { to_page(secure , '47' , '58' );
    to_page(secure , '136' , '58' );
    to_page(secure , '224' , '58' );
    to_page(secure , '313' , '58' );
    to_page(secure , '403' , '58' );
    
    to_page(woodsafe , '47' , '79' );
    to_page(winesafe , '136' , '79' );
    to_page(marblesafe , '224' , '79' );
    to_page(glasssafe , '313' , '79' );
    to_page(sulphursafe , '403' , '79' );
  };

// 
if (GM_getValue(opt2)=="on")
  {   
    to_tip(woodsafe , secure , woodtag , '0');
    to_tip(winesafe , secure , winetag , '1');
    to_tip(marblesafe , secure , marbletag , '2');
    to_tip(glasssafe , secure , glasstag , '3');
    to_tip(sulphursafe , secure  , sulphurtag , '4');
  };

// HTML code from Ikariam HelpMe
if (body=='options') {
var HTMLtext = '<div class="contentBox01h">' +
                    '<h3 class="header">Ikariam safe storage indicators</h3>' +
                            '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '</tr>' +
                        '</tbody></table>' +
                        '<div style="width:auto;" class="centerButton">' + 
                      '</div>' +
                    <>	
                     <p><a id="button001"><button class="button">test
  </button></a></p>
                   </>    +
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p><a id="button002"><button class="button">test
  </button></a></p>
                   </> + 
                        '</div>' +
                   
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p><a id="button003"><button class="button">test
  </button></a></p>
                   </> +
                   '</div>' +
                   
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p><a id="button004"><button class="button">test
  </button></a></p>
                   </> +
                       '</div>' +
                    '</div>' + 
                    '<div class="footer"></div>' +
                '</div>';

   var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
    document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));
    document.getElementById('button001').addEventListener("click",opt_1,false);
    document.getElementById('button002').addEventListener("click",opt_2,false);
    document.getElementById('button003').addEventListener("click",opt_3,false);
    document.getElementById('button004').addEventListener("click",opt_4,false);
optfun()
};
// the end