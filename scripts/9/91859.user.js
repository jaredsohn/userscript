// ==UserScript==
// @name           Ikariam safe storage indicators
// @namespace      BadgerWorks it smells better than a Skunk 
// @description    uninstall old versions before installing current version 0.2, because the namespace has changed. the this script gives a display of the safe storage capacity and calculates the safe capacity left or the resources over the safe limit and displays that too. not approved use at your own risk. 
// @author         Euler (http://userscripts.org/users/Euler)
// @version        0.2
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
///< changelog

///> to do's
  // change it so it will know that there are goods in a trading post.
  // add more comments.
  // fix the buttons in options they work but don't look right. the area to click is wider than the button if the buttons are smaller.
  // add color to the resource display to indicate safe and lootable with tooltip view.     not to interfere with 75% and 100% capacity colors. 
  // add an updater.
///< to do's

function optfun()
{    if (GM_getValue(opt1)=="on")
    {document.getElementById( 'button001' ).innerHTML=htmlpart + 'main view is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button001' ).innerHTML=htmlpart + 'main view is "off" click to change</button></a>'   
	  }
///////////////////////
if (GM_getValue(opt2)=="on")
    {document.getElementById( 'button002' ).innerHTML=htmlpart + 'tooltip view is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button002' ).innerHTML=htmlpart + 'tooltip view is "off" click to change</button></a>'   
	  }
///////////////////////
if (GM_getValue(opt3)=="on")
    {document.getElementById( 'button003' ).innerHTML=htmlpart + 'Double storage capacity is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button003' ).innerHTML=htmlpart + 'Double storage capacity is "off" click to change</button></a>'   
	  }
////////////////////////
if (GM_getValue(opt4)=="on")
    {document.getElementById( 'button004' ).innerHTML=htmlpart + 'Double theft security is "on" click to change</button></a>'
    }
   else
    {document.getElementById( 'button004' ).innerHTML=htmlpart + 'Double theft security is "off" click to change</button></a>'   
	  }	  
};
var htmlpart='<a><button style="width:100%; height:25px; background-color:Wheat;border-color:#000000; padding:2px 2px;background:#eccf8e; font:bold 12px Arial, Helvetica, sans-serif;">';
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
    
// gets the number of resource in the town
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

// sets the font color   
function tag(Resource)
  { if (Resource<0)
      { //sets font to red if not secure
        return "lootable";
      }
    else
      {//set font color to green
        return "space left";
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

function getcapacity(numb, l)
  { return parseInt(document.getElementById("cityResources").getElementsByClassName("tooltip")[numb].innerHTML.slice(l,document.getElementById("cityResources").getElementsByClassName("tooltip")[numb].innerHTML.length).replace(",","").replace(".",""));
  }  
  
// sends the number to the screen with color and position
function to_page(Resource , left , top )
  { var newDiv = document.createElement("div");
    newDiv.setAttribute("style","left:"+left+"px; top:"+top+"px; position:absolute");
    Resource= Resource.fontsize("1"); 
    newDiv.innerHTML =Resource;
    document.getElementById('cityNav').appendChild(newDiv);
  }

//
function to_tip(safe , secure , tag , num )
  { document.getElementById("cityResources").getElementsByClassName("tooltip")[num].innerHTML = document.getElementById("cityResources").     getElementsByClassName("tooltip")[num].innerHTML + ", safe capacity "+secure
 + ", " + tag + " " + safe;
  }
  
var cityid=document.getElementById("citySelect").value;
var cityiddump=document.getElementById("citySelect").value + "dump";
var body=document.getElementsByTagName("body")[0].id;  




if (body=="city")
{
var test1=document.getElementById("citySelect")[document.getElementById("citySelect").selectedIndex].innerHTML.slice(13)+"";
var test2=document.getElementsByClassName("city")[0].innerHTML+"";
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
var woodStock = getvalue("value_wood");
var wineStock = getvalue("value_wine");
var marbleStock = getvalue("value_marble");
var glassStock = getvalue("value_crystal");
var sulphurStock =getvalue("value_sulfur");

//
var secure = GM_getValue(cityid);		
var cap = GM_getValue(cityiddump); 
//
if (GM_getValue(opt3)=='on')
    {cap *=2};
if (GM_getValue(opt4)=='on')
    {secure *=2};     
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
    to_tip(woodsafe , secure , woodtag , '0' );
    to_tip(winesafe , secure , winetag , '1' );
    to_tip(marblesafe , secure , marbletag , '2' );
    to_tip(glasssafe , secure , glasstag , '3' );
    to_tip(sulphursafe , secure  , sulphurtag , '4' );
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
                        '<div class="centerButton">' + 
                      '</div>' +
                    <>	
                     <p id="button001"><a><button>test
  </button></a></p>
                   </>    +
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p id="button002"><a><button>test
  </button></a></p>
                   </> + 
                        '</div>' +
                   
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p id="button003"><a><button>test
  </button></a></p>
                   </> +
                   '</div>' +
                   
                        '</td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                             <>	
                     <p id="button004"><a><button>test
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