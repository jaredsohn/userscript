// ==UserScript==
// @name           Google bar color changer
// @namespace      http://userscripts.org/users/Hamza7
// @description    Change the color of Google top bar or hide it completely, with a simple and easy to use GUI (Graphic User Interface) for GreaseMonkey.
// @license        GNU General Public License (http://www.gnu.org/licenses/gpl.html)
// @include        http*://*.google.com/*
// @exclude        http*://mail.google.com/*
// @author         Hamza Abbad
// @version        3.1.1
// ==/UserScript==
//Available colors:
var colors = {Transparent:"transparent",Black:"#000",Navy:"#000080",DarkBlue:"#00008B",MediumBlue:"#0000CD",
Blue:"#0000FF",DarkGreen:"#006400",Green:"#008000",Teal:"#008080",DarkCyan:"#008B8B",
DeepSkyBlue:"#00BFFF",DarkTurquoise:"#00CED1",MediumSpringGreen:"#00FA9A",Lime:"#00FF00",
SpringGreen:"#00FF7F",Aqua:"#00FFFF",Cyan:"#00FFFF",MidnightBlue:"#191970",DodgerBlue:"#1E90FF",
LightSeaGreen:"#20B2AA",ForestGreen:"#228B22",SeaGreen:"#2E8B57",DarkSlateGray:"#2F4F4F",
LimeGreen:"#32CD32",MediumSeaGreen:"#3CB371",Turquoise:"#40E0D0",RoyalBlue:"#4169E1",SteelBlue:"#4682B4",
DarkSlateBlue:"#483D8B",MediumTurquoise:"#48D1CC",Indigo:"#4B0082",DarkOliveGreen:"#556B2F",
CadetBlue:"#5F9EA0",CornflowerBlue:"#6495ED",MediumAquaMarine:"#66CDAA",DimGray:"#696969",
SlateBlue:"#6A5ACD",OliveDrab:"#6B8E23",SlateGray:"#708090",LightSlateGray:"#778899",
MediumSlateBlue:"#7B68EE",LawnGreen:"#7CFC00",Chartreuse:"#7FFF00",Aquamarine:"#7FFFD4",Maroon:"#800000",
Purple:"#800080",Olive:"#808000",Gray:"#808080",SkyBlue:"#87CEEB",LightSkyBlue:"#87CEFA",
BlueViolet:"#8A2BE2",DarkRed:"#8B0000",DarkMagenta:"#8B008B",SaddleBrown:"#8B4513",DarkSeaGreen:"#8FBC8F",
LightGreen:"#90EE90",MediumPurple:"#9370D8",DarkViolet:"#9400D3",PaleGreen:"#98FB98",DarkOrchid:"#9932CC",
YellowGreen:"#9ACD32",Sienna:"#A0522D",Brown:"#A52A2A",DarkGray:"#A9A9A9",LightBlue:"#ADD8E6",
GreenYellow:"#ADFF2F",PaleTurquoise:"#AFEEEE",LightSteelBlue:"#B0C4DE",PowderBlue:"#B0E0E6",
FireBrick:"#B22222",DarkGoldenRod:"#B8860B",MediumOrchid:"#BA55D3",RosyBrown:"#BC8F8F",
DarkKhaki:"#BDB76B",Silver:"#C0C0C0",MediumVioletRed:"#C71585",IndianRed:"#CD5C5C",Peru:"#CD853F",
Chocolate:"#D2691E",Tan:"#D2B48C",LightGray:"#D3D3D3",PaleVioletRed:"#D87093",Thistle:"#D8BFD8",
Orchid:"#DA70D6",GoldenRod:"#DAA520",Crimson:"#DC143C",Gainsboro:"#DCDCDC",Plum:"#DDA0DD",
BurlyWood:"#DEB887",LightCyan:"#E0FFFF",Lavender:"#E6E6FA",DarkSalmon:"#E9967A",Violet:"#EE82EE",
PaleGoldenRod:"#EEE8AA",LightCoral:"#F08080",Khaki:"#F0E68C",AliceBlue:"#F0F8FF",HoneyDew:"#F0FFF0",
Azure:"#F0FFFF",SandyBrown:"#F4A460",Wheat:"#F5DEB3",Beige:"#F5F5DC",WhiteSmoke:"#F5F5F5",
MintCream:"#F5FFFA",GhostWhite:"#F8F8FF",Salmon:"#FA8072",AntiqueWhite:"#FAEBD7",Linen:"#FAF0E6",
LightGoldenRodYellow:"#FAFAD2",OldLace:"#FDF5E6",Red:"#FF0000",Fuchsia:"#FF00FF",Magenta:"#FF00FF",
DeepPink:"#FF1493",OrangeRed:"#FF4500",Tomato:"#FF6347",HotPink:"#FF69B4",Coral:"#FF7F50",
Darkorange:"#FF8C00",LightSalmon:"#FFA07A",Orange:"#FFA500",LightPink:"#FFB6C1",Pink:"#FFC0CB",
Gold:"#FFD700",PeachPuff:"#FFDAB9",NavajoWhite:"#FFDEAD",Moccasin:"#FFE4B5",Bisque:"#FFE4C4",
MistyRose:"#FFE4E1",BlanchedAlmond:"#FFEBCD",PapayaWhip:"#FFEFD5",LavenderBlush:"#FFF0F5",
SeaShell:"#FFF5EE",Cornsilk:"#FFF8DC",LemonChiffon:"#FFFACD",FloralWhite:"#FFFAF0",Snow:"#FFFAFA",
Yellow:"#FFFF00",LightYellow:"#FFFFE0",Ivory:"#FFFFF0",White:"#FFF"};
//Setting:
var GB = {};
GB.version = "3.1.1";
GB.defaults = {color:colors.RoyalBlue,
               barColor:colors.Transparent,
			   barHoverBgColor:colors.SkyBlue};
GB.color = GM_getValue("color",GB.defaults.color);
GB.barColor = GM_getValue("barColor",GB.defaults.barColor);
GB.barHoverBgColor = GM_getValue("barHoverBgColor",GB.defaults.barHoverBgColor);
//Script body:

GB.bar = document.getElementById("gb");
GB.status = GM_getValue("status","visible");

GM_addStyle("#gbx3, #gbx4{background-color:"+GB.barColor+";border-bottom:"+GB.barHoverBgColor+" 1px solid;}\
	                      #gbz .gbzt, #gbz .gbgt, #gbg .gbgt{color:"+GB.color+" !important; }\
						  .gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus{background-color:"+GB.barHoverBgColor+";}\
						  .gbmt, .gbml1, .gbmt:visited, .gbml1:visited{color:"+GB.color+" !important;}\
						  .gbz0l .gbts{color:"+GB.color+";}\
						  .gbto .gbts{color:"+GB.color+";}\
						  .gbz0l .gbtb2{border-top-color:"+GB.barHoverBgColor+" !important;}\
						  .a-Eo-T{background-color:"+GB.barColor+";}\
						  .gbmt-hvr, .gbmt:focus{background-color:"+GB.barHoverBgColor+";}\
						  .gbml1-hvr{background-color:"+GB.barHoverBgColor+";}\
						  .gbmc{background-color:"+GB.barColor+";}");

//Graphic User Interface (GUI):

    function gbColorChanger(){
      //----------------------------------------Style-------------------------------------------------------
      document.styleSheets[0].insertRule("div#GBCC{width:400px;height:400px;border:2px outset gray;background-image:-moz-linear-gradient(top,#6CF,#FFF);overflow:auto;position:absolute;left:0px;bottom:0px;direction:ltr;border-radius:5px;z-index:3725;text-align:center;}",document.styleSheets[0].cssRules.length);
      document.styleSheets[0].insertRule("div#GBCC h1{text-align:left;background-color:#D3D3D3;color:white;border:#808080 1px solid;font-size:20px;}",document.styleSheets[0].cssRules.length-1);
      document.styleSheets[0].insertRule("div#GBCC button#X{color:white;font-weight:bold;background-image:-moz-linear-gradient(top,#F00, #CCC);width:30px;height:30px;position:absolute;right:0px;top:0px;border-radius:5px;}",document.styleSheets[0].cssRules.length-2);
      document.styleSheets[0].insertRule("div#GBCC select option{font-weight:bold;}",document.styleSheets[0].cssRules.length-3);
      document.styleSheets[0].insertRule("div#GBCC h2{font-weight:bold;font-size:100%;color:gray;display:block;boder-top:1px dotted #778899;border-bottom:1px dotted #778899;}",document.styleSheets[0].cssRules.length-4);
      document.styleSheets[0].insertRule("div#GBCC select {font-weight:bold;}",document.styleSheets[0].cssRules.length-5);
      document.styleSheets[0].insertRule("div#GBCC button#Reset{font-weight:bold;color:black;position:absolute;right:50px;bottom:30px;border-radius:5px;}",document.styleSheets[0].cssRules.length-6);
      document.styleSheets[0].insertRule("div#GBCC button#Save{font-weight:bold;color:black;position:absolute;left:50px;bottom:30px;border-radius:5px;}",document.styleSheets[0].cssRules.length-7);
	  document.styleSheets[0].insertRule("div#GBCC button#Toggle{font-weigth:bold;color:black;position:absolute;left:100px;bottom:60px;border-radius:5px;width:200px;}",document.styleSheets[0].cssRules.length-8);
	  document.styleSheets[0].insertRule("div#GBCC span{width:200px;position:absolute;left:100px;bottom:90px;}",document.styleSheets[0].cssRules.length-9)
	  document.styleSheets[0].insertRule("div#GBCC em{font-style:italic;font-weight:bold;}",document.styleSheets[0].cssRules.length-10);
	  document.styleSheets[0].insertRule("div#GBCC sub{font-style:italic;font-weight:normal;font-size:8px;}",document.styleSheets[0].cssRules.length-11);
	  //---------------------------------------Div---------------------------------------------------------
      GB.div = document.createElement("div");
      GB.div.id = "GBCC";
      GB.div.innerHTML = "<h1>Google bar color changer "+GB.version+"<sub>By Hamza Abbad</sub></h1>";
      //---------------------------------------Button-------------------------------------------------------
      var Status = document.createElement("span");
	  Status.innerHTML = "Google bar status: <em>" + GB.status + ".</em>";
	  var close = document.createElement("button");
      close.id = "X";
      close.title = "Click to cancel";
	  close.accesskey = "x";
      var reset = document.createElement("button");
      var save = document.createElement("button");
	  var toggle = document.createElement("button");
	  reset.id = "Reset";
	  save.id = "Save";
	  toggle.id = "Toggle";
      close.innerHTML = "X";
      reset.innerHTML = "Reset to default";
	  reset.accesskey = "r";
      save.innerHTML = "Save";
	  save.accesskey = "s";
	  toggle.innerHTML = (GB.status == "visible") ? "Hide Google bar" : (GB.status == "hidden") ? "Show Google bar" : "" ;
	  toggle.disabled = (function(){if(toggle.innerHTML=="")return true;})();
	  toggle.accesskey = "t";
      close.addEventListener("click",function(){document.body.removeChild(GB.div);},false);
      reset.addEventListener("click",function(){if(confirm("Are you sure ?")){GM_setValue("color",GB.defaults.color);GM_setValue("barColor",GB.defaults.barColor);GM_setValue("barHoverBgColor",GB.defaults.barHoverBgColor);GM_setValue("status","visible");location.reload();}},false);
      save.addEventListener("click",function(){GM_setValue("color",GB.color);GM_setValue("barColor",GB.barColor);GM_setValue("barHoverBgColor",GB.barHoverBgColor);GM_setValue("status",GB.status);GB.div.parentNode.removeChild(GB.div);alert("Setting saved !");},false);
      toggle.addEventListener("click",toggleButton,false);

	  GB.div.appendChild(close);
      GB.div.appendChild(reset);
      GB.div.appendChild(save);
	  GB.div.appendChild(Status);
	  GB.div.appendChild(toggle);
      //--------------------------------------Headers & Selects---------------------------------------------
      //________________________________________1___________________________________________________________
      var header1 = document.createElement("h2");
      header1.appendChild(document.createTextNode("Select the font color of the bar"));
  
      var select1 = document.createElement("select");
        for (color in colors)select1.innerHTML += "<option style='background-color:"+colors[color]+";color:white;' value='"+colors[color]+"'>"+color+"</option>";
      select1.addEventListener("change",function(){afterChange(this,"color",this.selectedIndex)},false);
        for (var opt1=0;opt1<select1.options.length;opt1++)if(select1.options[opt1].value==GB.color){select1.options[opt1].defaultSelected=true;select1.style.backgroundColor=select1.options[opt1].value;break;}
      GB.div.appendChild(header1);
      GB.div.appendChild(select1);

      //________________________________________2__________________________________________________________
      var header2 = document.createElement("h2");
      header2.appendChild(document.createTextNode("Select the background color of the bar"));

      var select2 = document.createElement("select");
       for (color in colors)select2.innerHTML += "<option style='background-color:"+colors[color]+";color:white;' value='"+colors[color]+"'>"+color+"</option>";
      select2.addEventListener("change",function(){afterChange(this,"barColor",this.selectedIndex)},false);
       for (var opt2=0;opt2<select2.options.length;opt2++)if(select2.options[opt2].value==GB.barColor){select2.options[opt2].defaultSelected=true;select2.style.backgroundColor=select2.options[opt2].value;break;}

      GB.div.appendChild(header2);
      GB.div.appendChild(select2);

      //_________________________________________3________________________________________________________
      var header3 = document.createElement("h2");
      header3.appendChild(document.createTextNode("Select the background color of the hovering element"));

      var select3 = document.createElement("select");
       for (color in colors)select3.innerHTML += "<option style='background-color:"+colors[color]+";color:white;' value='"+colors[color]+"'>"+color+"</option>";
      select3.addEventListener("change",function(){afterChange(this,"barHoverBgColor",this.selectedIndex)},false);
       for (var opt3=0;opt3<select3.options.length;opt3++)if(select3.options[opt3].value==GB.barHoverBgColor){select3.options[opt3].defaultSelected=true;select3.style.backgroundColor=select3.options[opt3].value;break;}
	   
      GB.div.appendChild(header3);
      GB.div.appendChild(select3);
      //--------------------------------------------------------------------------------------------------
      document.body.appendChild(GB.div);

	  //Google bar toggler:
	  function toggleButton() { if ( GB.bar ){
                           	    if ( GB.status == "visible" ) { GB.bar.style.display = "none";
	                                                            this.innerHTML = "Show Google bar";
																GB.status = "hidden";
																Status.innerHTML = "Google bar status: <em>" + GB.status + "</em>.";}
								else  { GB.bar.style.display = "block";
								        this.innerHTML = "Hide Google bar";
										GB.status = "visible";
										Status.innerHTML = "Google bar status: <em>" + GB.status + "</em>.";}
										}
							}
	  //OnChange handler function:
      function afterChange(select,x,SI){
        var value = select.options[SI].value;
	    select.style.backgroundColor = value;
        switch (x){
                    case "color": GB.color = value;
	                GM_addStyle("#gbz .gbzt, #gbz .gbgt, #gbg .gbgt{color:"+GB.color+" !important; }\
					             .gbmt, .gbml1, .gbmt:visited, .gbml1:visited{color:"+GB.color+" !important;}\
								 .gbz0l .gbts{color:"+GB.color+";}\
								 .gbto .gbts{color:"+GB.color+";}");
					break;
                    case "barColor": GB.barColor = value; 
					GM_addStyle("#gbx3, #gbx4{background-color:"+GB.barColor+";border-bottom:"+GB.barHoverBgColor+" 1px solid;}\
					             .a-Eo-T{background-color:"+GB.barColor+";}\
								 .gbmc{background-color:"+GB.barColor+";}");
					break;
                    case "barHoverBgColor": GB.barHoverBgColor = value;
					GM_addStyle("#gbx3, #gbx4{background-color:"+GB.barColor+";border-bottom:"+GB.barHoverBgColor+" 1px solid;}\
					             .gbzt-hvr, .gbzt:focus, .gbgt-hvr, .gbgt:focus{background-color:"+GB.barHoverBgColor+";}\
								 .gbz0l .gbtb2{border-top-color:"+GB.barHoverBgColor+" !important;}\
								 .gbmt-hvr, .gbmt:focus{background-color:"+GB.barHoverBgColor+";}\
								 .gbml1-hvr{background-color:"+GB.barHoverBgColor+";}");
					break;
		}
      }
    }

//Register in GreaseMonkey script commands:
GM_registerMenuCommand("Change Google bar color",gbColorChanger,"G");