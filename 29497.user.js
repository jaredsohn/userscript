// ==UserScript==
// @name           BOB for Mapmakers
// @namespace      www.conquerclub.com
// @description    BOB for Mapmakers
// @include        http://www.conquerclub.com/mapmaker/index2.php
// ==/UserScript==
//-------------------------------------------------------------------------
// Images as strings
//-------------------------------------------------------------------------

var attackonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00SIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%08%14%04I%90%8B!.%94%94%94%84%BB%90%02%C3h%E8B%E40%1Cu!%A9%B1%8D%99%0EG%C3p%10%86!%25%05%05%7DJ%1Bj%B8%10%00%F6%99%89%EE%AE%84%9A%9C%00%00%00%00IEND%AEB%60%82";
var bombardedimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5BIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86%E1h%B2%19%99Y%0F9%E5%93%CA%C6Z%DA%90j%08%C1%AC%C7%C2%C2%F2%9F%9D%9D%1D%5E%9C%91b%01%CC%85%00%16%23rE%C7(%B7)%00%00%00%00IEND%AEB%60%82";
var bombardimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%A3%C9%06%9Cl%00x%E0%90%9C%EB%B7%F2%06%00%00%00%00IEND%AEB%60%82";
var defendonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8O%ED%94%C1%0A%000%08B%ED%FF%FF%B5_p%C9%D8%D8%B9%DA-%C1c%8F%10%D1%000%5C%16I%3B%10%01%CB%0E%20d%A9%0C%13%E3%02%DD%9DY%BF%CF%0C0%97%E3d%B8%8B%9D%ED%A0%EE%26%C3O%E3%D0%BE6%DD%C0%05%90%82%90%9C%E5%9D%92.%00%00%00%00IEND%AEB%60%82";
var mutualbombimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86!E%C9%E6%3D(%CD%8E%86%E1h%18%0E%D6%E2%0B%00%3C%03%D6l4%B8H%5D%00%00%00%00IEND%AEB%60%82";
var normalimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%8Aa%E7%A1%EA%EF%A3%EB%83%1B%08d%FC%A7%12%86%B8%90J%86%81%1C5j%20%E5%913%1A%86%23'%0CI%2C%1Cp%16%24%E4%966%F47%10%00%AB%88%ED%BB%03%F0'%AC%00%00%00%00IEND%AEB%60%82";
var safeimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00PIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%04%93%0D%25%05%05%7DJ%1Bj%B8%10%00%0A%D1%2C4%3D%FCt%15%00%00%00%00IEND%AEB%60%82";

//-------------------------------------------------------------------------
//    OBJECTS
//-------------------------------------------------------------------------

    //Reinforcements Object
    function Reinforcement(lower, upper, divisor)
    {
    	this._lower = lower;
    	this._upper = upper;
    	this._divisor = divisor;
    }

    
    // Country Class
    function Country (name) {
        this._name = name;
        this.toString = function() { return this._name; }
        this._borders = new Array();
        this._DefendBorders = new Array();
        this._bombards = new Array();
        this._bombardedBy = new Array();
        this._inContenent = false;
				this._bonus = 0;
				this._armies = 88;
				this._killer = false;
				this._neutral = 0;
        this._smallxPos = 0;
        this._smallyPos = 0;
        this._largexPos = 0;
        this._largeyPos = 0;
        this.textMap = function () { 
            var txtMapHtml2 = "";
            var txtMapHtmlA = "";
            var txtMapHtmlD = "";
            var txtMapHtmlC = "";
            var txtMapHtmlE = "";
            var txtMapHtmlF = "";
            var txtMapHtmlG = "";
            var aAttack = new Array();
            var aDefend = new Array();
            var aBombard = new Array();
            var aBombarded = new Array();
            
            for (var k =0; k < this._borders.length; k++){
                var bb = countriesArray[this._borders[k]];
                aAttack[bb._name] = bb;
            }
            for (var k =0; k < this._DefendBorders.length; k++){
                var bb = countriesArray[this._DefendBorders[k]];
                aDefend[bb._name] = bb;
            }
                
            for (var k =0; k < this._bombards.length; k++){
                var bb = countriesArray[this._bombards[k]];
                aBombard[bb._name] = bb;
            }
            for (var k =0; k < this._bombardedBy.length; k++){
                var bb = countriesArray[this._bombardedBy[k]];
                aBombarded[bb._name] = bb;
            }

            txtMapHtml2 += this.displayString(); 

                    for (var k =0; k < this._borders.length; k++){
                        var bb = countriesArray[this._borders[k]];
                         if (typeof(aDefend[bb._name])=="undefined"){
                                txtMapHtmlA +=  bb.displayString();
                            }
                            else
                            {
                                txtMapHtmlC +=  bb.displayString();
                            }
                    }
                    
                    for (var k =0; k < this._DefendBorders.length; k++)
		    						{
                        var bb = countriesArray[this._DefendBorders[k]];
                        
                        if (typeof(aAttack[bb._name])=="undefined")
												{
                                txtMapHtmlD += bb.displayString();
                        }
                    }


										for (var bombard in  this._bombards) 
										{
														var bb = countriesArray[this._bombards[bombard]];
														var b = this._bombards[bombard].makeID();

														if (typeof(aBombarded[bb._name])=="undefined")
														{
			                        txtMapHtmlE += bb.displayString();
														}
														else
														{
			                        txtMapHtmlG += bb.displayString();
														}
										}
										for (var bombard in  this._bombardedBy) 
										{
														var bb = countriesArray[this._bombardedBy[bombard]];
														var b = this._bombardedBy[bombard].makeID();
														if (typeof(aBombard[bb._name])=="undefined")
														{
			                        txtMapHtmlF += bb.displayString();
														}
														// don't need else as if will have been done by the bombard loop.
										}

                    if (txtMapHtmlC != "") 
		   							{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+normalimage+'>';
                        txtMapHtml2 += '<span> Borders </span>';
                        txtMapHtml2 += '[ ' + txtMapHtmlC + ' ]';
                    }
                    if (txtMapHtmlA != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+attackonlyimage+'>';
                        txtMapHtml2 += '<span> Attacks </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlA + ' ]'

                    }
                    if (txtMapHtmlD != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+defendonlyimage+'>';
                        txtMapHtml2 += '<span> Attacked By </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlD + ' ]'
										}
                    if (txtMapHtmlE != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+bombardimage+'>';
                        txtMapHtml2 += '<span> Bombards </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlE + ' ]';
                    }
                    if (txtMapHtmlF != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+bombardedimage+'>';
                        txtMapHtml2 += '<span> Bombarded by </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlF + ' ]';
                    }
                    if (txtMapHtmlG != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+mutualbombimage+'>';
                        txtMapHtml2 += '<span> Mutual Bombardment </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlG + ' ]';
                    }
                    
                    
                return  txtMapHtml2;
         }
         this.displayString = function () 
				 {
						result = '<span class="clickJump" title="' + this._name + '">'  + replaceSpace(this._name) + '&nbsp;';
						if (this._bonus != 0)
								result += '&nbsp;['+this._bonus+']';
						result += '</span> ';
						return result;
         }
    }

    //Continent Class - Note all Continents now have required elements
    // If a Traditional continent - then required matches the size of the countrys array.
    function Continent (name,bonus,realname) {
        this._name = name;
        this._realName = realname;
        this._bonus = bonus;
				this._required = 0;
        this.toString = function() { return this._name; }
        this._countrys = new Array();
        this._continents = new Array();
				this._overrides = new Array(); // Hold overriders for this continent.
        this.alert = function() {
            alert(    "Name:\t"            +    this._name        +
                    "\nrealName:\t"            +    this._realName        +
                    "\nBonus:\t"        +    this._bonus        +
                    "\nRequired:\t"        +    this._required        +
                    "\nCountries:\t"    +    this._countrys +
                    "\nOverrides:\t"    +    this._overrides)
        }
				this.displayString = function () 
				{
						var result = "";
						result += '<span class="hovermap" title="' + this._realName + '">'  + replaceSpace(this._name) + '&nbsp;';
						if (this._bonus != 0)
								result += '&nbsp;['+this._bonus+']';
						result += '</span>';
						return result;
        }
    }

	function objective (name, realname)
	{
		this._name = name;
		this._realname = realname;
		this._countrys = new Array();
	  this._continents = new Array();
		this._required = 0;
	}


//-------------------------------------------------------------------------
//    FUNCTIONS
//-------------------------------------------------------------------------



//*** This code is copyright 2003 by Gavin Kistner, gavin@refinery.com
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt

//***Cross browser attach event function. For 'evt' pass a string value with the leading "on" omitted
//***e.g. AttachEvent(window,'load',MyFunctionNameWithoutParenthesis,false);

function AttachEvent(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
	else{
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){ MyFireEvent(obj,evt) };
	}
} 

//The following are for browsers like NS4 or IE5Mac which don't support either
//attachEvent or addEventListener
function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
}
//*** - End of Gavin Kistner code.


function replaceSpace(text)
{
	var newText="";

	for (var i=0;i<text.length;i++)
	{
		if (text[i]==' ')
			newText += "&nbsp;";
		else
			newText += text[i];
	}
	return newText;
}

function parseTerritory(entry)
{
	var title = entry.getElementsByTagName('name')[0].textContent.normiliseSpaces();
	countriesArray[title] =  new Country (title);
	var borders = entry.getElementsByTagName('border');

	for (var j = 0; j <borders.length; j++) 
	{
		var bb = borders[j].textContent.normiliseSpaces();

		countriesArray[title]._borders.push(bb);
	}

	countriesArray[title]._smallxPos = entry.getElementsByTagName('smallx')[0].textContent;
	countriesArray[title]._smallyPos = entry.getElementsByTagName('smally')[0].textContent;
	countriesArray[title]._largexPos = entry.getElementsByTagName('largex')[0].textContent;
	countriesArray[title]._largeyPos = entry.getElementsByTagName('largey')[0].textContent;

	bombardments = entry.getElementsByTagName('bombardment');

	for (var j = 0; j <bombardments.length; j++) 
	{
		var bb = bombardments[j].textContent.normiliseSpaces();
		countriesArray[title]._bombards.push(bb);
	}

	var bonusElements = entry.getElementsByTagName('bonus');
	if (bonusElements.length>0)
	{
		var bonus = bonusElements[0].textContent;
		countriesArray[title]._bonus = parseInt(bonus);
	}
	var neutral = entry.getElementsByTagName('neutral');
	if (neutral.length>0)
	{
		killer = neutral[0].getAttribute("killer");
		if (killer=="yes")
		{
			countriesArray[title]._killer=true;
		}
		countriesArray[title]._neutral=neutral[0].textContent;
	}
}

function parseContinent(entry)
{
	var title = entry.getElementsByTagName('name')[0].textContent.normiliseSpaces();
	var dedupename = 1;
	var titleRoot = title
	while (continentsArray[title]) { title = titleRoot + "_" + dedupename++ ; }
	var bonus = parseInt(entry.getElementsByTagName('bonus')[0].textContent);
	var partial = false;
	var required = 0;
	var requiredEl = entry.getElementsByTagName('required');
	if (requiredEl.length>0) // Partial continent - hold required value from XML
	{
		required = parseInt(requiredEl[0].textContent);
		partial = true;
	}

	continentsArray[title] = new Continent(titleRoot,bonus,title);
	var countries = entry.getElementsByTagName('territory');
	for (var j = 0; j <countries.length; j++) 
	{
		var bb = countries[j].textContent.normiliseSpaces();
		continentsArray[title]._countrys.push(bb);
		if (!partial) // Traditional continent we will need to capture how many components there are.
			required++;
	}
	var continents = entry.getElementsByTagName('continent');
	for (var j = 0; j <continents.length; j++) 
	{
		var bb = continents[j].textContent.normiliseSpaces();
		continentsArray[title]._continents.push(bb); 
		if (!partial) // Traditional continent we will need to capture how many components there are.
			required++;
	}
	continentsArray[title]._required = required;
	var overrides = entry.getElementsByTagName('override');
	for (var j = 0; j <overrides.length; j++) 
	{
		var bb = overrides[j].textContent.normiliseSpaces();
		continentsArray[title]._overrides.push(bb); 
	}
}

function parseObjective(entry)
{
	title = entry.getElementsByTagName('name')[0].textContent.normiliseSpaces();
	var dedupename = 1;
	var titleRoot = title
	while (objectivesArray[title]) { title = titleRoot + "_" + dedupename++ ; }
	objectivesArray[title] =  new objective(titleRoot,title);
	var countries = entry.getElementsByTagName('territory');
	for (var j = 0; j <countries.length; j++) 
	{
		var bb = countries[j].textContent.normiliseSpaces();
		objectivesArray[title]._countrys.push(bb); 
		objectivesArray[title]._required++; 
	}
	var continents = entry.getElementsByTagName('continent');
	for (var j = 0; j <continents.length; j++) 
	{
		var bb = continents[j].textContent.normiliseSpaces();
		objectivesArray[title]._continents.push(bb); 
		objectivesArray[title]._required++; 
	}
}

function cc_log (m) 
{
	Logging += Math.round((new Date()).getTime()/1000)-startLogTime + ":" + m + "<br />" 
}

// Altered to allow partial matches... player matches player1 ... 2 etc.
function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
        var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
        var oElement;
        for(var i=0; i<arrElements.length; i++){
            oElement = arrElements[i];
	        if (exact)
	        {
		    if(oElement.className==strClassName){
			arrReturnElements.push(oElement);
		    }
	        }
		else
		{
		    if(oElement.className.has(strClassName)){
			arrReturnElements.push(oElement);
		    }
		}
        }
        return (arrReturnElements)
}

function showMoreTextMap()
{
				var textMap = document.getElementById("textMap");
				var sml = document.getElementById('showMoreLink')
				if (sml.innerHTML=="fixed text map")
				{
								textMap.style.height="";
								textMap.style.overflowY = "hidden";
								textMap.style.overflowX = "hidden";
								sml.innerHTML = "scrollable text map";
				}
				else
				{
								if (textMap.clientHeight>=200)
								{
												textMap.style.height="200px";
												textMap.style.overflowY = "auto";
												textMap.style.overflowX = "hidden";
												sml.innerHTML = "fixed text map";
								}
								else
								{
												sml.parentNode.style.display = "none";
								}
				}
}

function updateStarts()
{
	var neutralWrapperDiv = document.getElementById('neutrals');
	var startSummary = "";
	var neutralSummary = "";
	var killers = "";
	var show = false;
	for (var cnt in countriesArray) 
	{
		var cont = countriesArray[cnt];
		if (cont._neutral>0)
		{
			show = true;
			if (cont._killer)
				killers += cont.displayString()+" ";
			else
				neutralSummary += cont.displayString()+" ";
		}
		else
		{
				startSummary += cont.displayString()+" ";
		}
	}
	var positionSummary = "";
	for (var pos in positionsArray) 
	{
				var position = positionsArray[pos];
				positionSummary += '<h4><span class="JumpClick" title="' + pos + '">' + position._name +'</span></h4>'; 

				for (var j = 0; j < position._countrys.length; j++ ) 
				{
						var cc = countriesArray[position._countrys[j]];
						positionSummary += cc.displayString();
				}
	}
	if (show)
	{
		neutralWrapperDiv.style.display = "inline";
		var neutralDiv = document.getElementById('neutralsummary');
		neutralDiv.innerHTML = ""
		if (startSummary!="")
			neutralDiv.innerHTML += "<span class='JumpClick' title='STARTS'><H4>Normal Starts</H4></span>"+startSummary;
		if (neutralSummary!="")
			neutralDiv.innerHTML += "<span class='JumpClick' title='NEUTRALSTARTS'><H4>Neutral Starts</H4></span>"+neutralSummary;
		if 	(killers!="")
			neutralDiv.innerHTML += "<span class='JumpClick' title='KILLERS'><H4>Killers</H4></span>"+killers;
		if (positionSummary!="")
				neutralDiv.innerHTML += "<H3>Positions</H3>"+positionSummary;
	}
	else
	{
		neutralWrapperDiv.style.display = "none";
	}
}

function updateObjectives()
{
	var objWrapperDiv = document.getElementById('objectives');
	var objSummary = "";
	var show = false;
	for (var obj in objectivesArray) 
	{
		show = true;
		var objective = objectivesArray[obj];
		var obSummary = "";


		for (var j = 0; j < objective._countrys.length; j++ ) 
		{
			var cc = countriesArray[objective._countrys[j]];
			obSummary += cc.displayString();
		}
		for (var j = 0; j < objective._continents.length; j++ ) 
		{
			var cc = continentsArray[objective._continents[j]];
				var obOwnerSumm = '<span class="clickJump" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span>&nbsp;';
				obSummary += obOwnerSumm;
		}
		objSummary += "<br><span class='JumpClick' title='"+objective._name+"'>"+objective._name+" ==> </span>";	
		objSummary += obSummary;
	}
	if (show)
	{
		objWrapperDiv.style.display = "";
		var objDiv = document.getElementById('objectivessummary');
		objDiv.innerHTML = objSummary;
	}
	else
	{
		objWrapperDiv.style.display = "none";
	}
}

function updateReinforcements()
{
	var reinfWrapperDiv = document.getElementById('reinforcements');
	var reinfSummary = "";
	var show = false;
	for (var reinf in reinforcementsArray) 
	{
		show = true;
		var renf = reinforcementsArray[reinf];
		var reinfSummary = "";

		reinfSummary += "Lower : "+renf._lower+" Upper : "+renf._upper+" Divisor : "+renf._divisor+"</br>";

	}
	if (minimumReinforcements!=3)
	{
		reinfSummary += "Minimum Reinforcements : "+minimumReinforcements
	}
	if (show)
	{
		reinfWrapperDiv.style.display = "inline";
		var reinfDiv = document.getElementById('reinforcementssummary');
		reinfDiv.innerHTML = reinfSummary;
	}
	else
	{
		reinfWrapperDiv.style.display = "none";
	}
}

// this just updates the contoverview now
function updateContinents()
{
	var contOverview = document.getElementById("contOverview");

	var contOutput = "";
	for (cont in continentsArray)
	{
			var cnt = continentsArray[cont];
			contOutput += cnt.displayString();
			contOutput += " &nbsp;";
	}
	contOverview.innerHTML = contOutput;
	var contOverviewWrapper = document.getElementById("contOverviewWrapper");
	contOverviewWrapper.style.display="";
}

function updateMapInspectPadding()
{
		var height = smallheight;
		if (mapSize=="L")
		{
				height=largeheight;
		}
		height = parseInt(height,10)+15; // add 15 to the margin.
    var mapInspectDiv = document.getElementById("mapinspect");
    mapInspectDiv.style.marginTop = height+"px";
}

function updateTextmap()
{
	
				txtMapHtml = "";

				for (var continentn in continentsArray) 
				{
						txtMapSmallOwner = "";
						var continent = continentsArray[continentn];
						txtMapHtml += '<h4><span class="JumpClick" title="' + continentn + '">' + continent._name + ' (' +  continent._bonus + ')</span></h4>'; 

						txtMapHtml +="<table>"

						for (var j = 0; j < continent._countrys.length; j++ ) 
						{
							var cc = countriesArray[continent._countrys[j]];
							cc._inContenent = true;

							txtMapHtml += "<tr><td>"+ cc.displayString() + '</td>'
							if (cc._borders.length>0)
							{
											txtMapHtml +="<td>==></td><td>"; 
											for (var k =0; k < cc._borders.length; k++)
											{
												var bb = countriesArray[cc._borders[k]];
												txtMapHtml += bb.displayString()+" ";
											}
											txtMapHtml += "</td></tr>";
											if (cc._bombards.length>1)
													txtMapHtml += "<tr><td/>";
							}
							if (cc._bombards.length>1)
							{
								txtMapHtml += '<td> __> </td><td>'; 
								for (var k =0; k < cc._bombards.length; k++)
								{
									var bb = countriesArray[cc._bombards[k]];
									txtMapHtml += bb.displayString()+" ";
								}
								txtMapHtml += "</td></tr>";
							}
						}
						for (var j = 0; j < continent._continents.length; j++ ) 
						{
							var cc = continentsArray[continent._continents[j]];

							txtMapHtml += '<tr><td><span class="playerBG0"><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span></td></tr>';
						}
						txtMapHtml += '</table>';
				}

				var txtMapHtml2 = "";
				var bDone2 = false;
				txtMapHtml2 += '<h4><span class="JumpClick" title="NOCONT">No Continent</span></h4>'; 
				txtMapHtml2 += "<table>";

				for (var countr in countriesArray) 
				{
								var cc = countriesArray[countr];
								if (!cc._inContenent) 
								{
										txtMapHtml2 +=  "<tr><td>"+cc.displayString()+"</td>";
										
										if (cc._borders.length>0)
										{
												txtMapHtml2 += '<td>==></td><td>'
												for (var k =0; k < cc._borders.length; k++)
												{
															var bb = countriesArray[cc._borders[k]];
															txtMapHtml2 += bb.displayString();
												}
												txtMapHtml2 += "</td></tr>";
												if (cc._bombards.length>1)
														txtMapHtml2 += "<tr><td/>";
										}
										if (cc._bombards.length>1)
										{
												txtMapHtml2 += '<td> __> </td><td>'; 
												for (var k =0; k < cc._bombards.length; k++)
												{
														var bb = countriesArray[cc._bombards[k]];
														txtMapHtml2 += bb.displayString();
												}
										}
										txtMapHtml2 += '</td></tr>';
										bDone2 = true;
								}
				}
				if (bDone2) 
				{
						txtMapHtml += txtMapHtml2;
				}

				var textMap = document.getElementById("textMap");
				textMap.innerHTML = txtMapHtml;
				var showMoreLink = document.getElementById('showMoreLink');
				AttachEvent(showMoreLink,'click',showMoreTextMap,true);
				showMoreLink.parentNode.style.display = "";
				var wrapper = document.getElementById('textMapWrapper');
				wrapper.style.display = "";
}

function SHIFT_MAGICMAP()
{
        var mm = document.getElementById("magicmap");
        left = 26;
        top = 643;
				mm.style.top= top+"px";
				mm.style.left= left+"px";
}


function updateMagicMap()
{
	var magicmap = document.getElementById('outer-map');
	magicmap.style.position="absolute";
	/*SHIFT_MAGICMAP();
	if (mapSize=="L")
	{
		magicmap.style.height=largeheight;
		magicmap.style.width=largewidth;
	}
	else
	{
		magicmap.style.height=smallheight;
		magicmap.style.width=smallwidth;
	}*/
		var mmaphtml = "";
//             -- And magic map squares -- 
            for (var cou in countriesArray) 
	    			{
                var cc = countriesArray[cou];
                var highlightType = "l";
								var pid = 0;
						    mmaphtml += "<div ID='ARMY"+cc._name.makeID()+"' class='" + highlightType + "player"+pid+"' style='z-index:1; height:18px; width: " + (12 + ((""+cc._armies).length) *8 ) + "px;  left:";
								if (mapSize=='S')
										mmaphtml += (parseInt(cc._smallxPos)-11);
								else
										mmaphtml += (parseInt(cc._largexPos)-11);
								mmaphtml += "px; top:";
								if (mapSize=='S')
										mmaphtml += (parseInt(cc._smallyPos)-37) +"px;'>";
								else
										mmaphtml += (parseInt(cc._largeyPos)-37) +"px;'>";
								mmaphtml += cc._name + "</div>";

						    mmaphtml += "<div ID='ATTACK"+cc._name.makeID()+"' class='off"+pid+"' style='z-index:1; height:18px; width: " + (12 + ((""+cc._armies).length) *8 ) + "px;  left:";
								if (mapSize=='S')
										mmaphtml += (parseInt(cc._smallxPos)-11);
								else
										mmaphtml += (parseInt(cc._largexPos)-11);
								mmaphtml += "px; top:";
								if (mapSize=='S')
										mmaphtml += (parseInt(cc._smallyPos)-37) +"px;'>";
								else
										mmaphtml += (parseInt(cc._largeyPos)-37) +"px;'>";
								mmaphtml += cc._name + "</div>";

            }
            magicmap.innerHTML += mmaphtml;


  
    	  cc_log("Attaching the hover handlers");
    	
  
			  cc_log("Attaching the hover handlers (MAP SQUARES)");
    	    // Add Rollovers to map squares
				var mm1 =  document.getElementById('outer-map');
    		var arrElements1 = mm1.getElementsByTagName("div");
    		var oElement1;
        for(var i=0; i<arrElements1.length; i++) 
				{
						oElement1 = arrElements1[i];
						if (oElement1.id!="inner-map")
						{
										var title = oElement1.innerHTML; 

										if (title.indexOf('&')>-1)
										{
											title = title.replace("&amp;","&");
											title = title.replace("&lt;",/</);
											title = title.replace("&gt;",/>/);
										}

										AttachEvent(oElement1,'mouseout',onMouseOutHover,true);
										oElement1.innerHTML = "";
										var c = countriesArray[title];

										AttachEvent(oElement1,'mouseover',makeHandlerName(c.textMap()),true);

										var type;

										var aAttack = new Array();
										var aDefend = new Array();
										for (var k =0; k < c._borders.length; k++)
										{
												var bb = countriesArray[c._borders[k]];
												aAttack[bb._name] = bb;
										}
										for (var k =0; k < c._DefendBorders.length; k++)
										{
												var bb = countriesArray[c._DefendBorders[k]];
												aDefend[bb._name] = bb;
										}


										for (var k =0; k < c._borders.length; k++)
										{
												var bb = countriesArray[c._borders[k]];
												if (typeof(aDefend[bb._name])=="undefined")
												{
													type = "ATTACK"
												}
												else
												{
													type = "BORDER";
												}
												var b = c._borders[k].makeID();
												AttachEvent(oElement1,'mouseover',makeHandler(b, type),true);
										}

										for (var k =0; k < c._DefendBorders.length; k++)
										{
												var bb = countriesArray[c._DefendBorders[k]];

												if (typeof(aAttack[bb._name])=="undefined")
												{
													var b = c._DefendBorders[k].makeID();
													AttachEvent(oElement1,'mouseover',makeHandler(b,"DEFEND"),true);
												}
										}

										var aBombard = new Array();
										var aBombarded = new Array();
										for (var k =0; k < c._bombards.length; k++){
												var bb = countriesArray[c._bombards[k]];
												aBombard[bb._name] = bb;
										}
										for (var k =0; k < c._bombardedBy.length; k++){
												var bb = countriesArray[c._bombardedBy[k]];
												aBombarded[bb._name] = bb;
										}

										for (var bombard in  c._bombards) 
										{
														var bb = countriesArray[c._bombards[bombard]];
														var b = c._bombards[bombard].makeID();

														if (typeof(aBombarded[bb._name])=="undefined")
														{
															AttachEvent(oElement1,'mouseover',makeHandler(b.makeID(),"BOMBARDS"),true);
														}
														else
														{
															AttachEvent(oElement1,'mouseover',makeHandler(b.makeID(),"MUTUAL"),true);
														}
										}
										for (var bombard in  c._bombardedBy) 
										{
														var bb = countriesArray[c._bombardedBy[bombard]];
														var b = c._bombardedBy[bombard].makeID();
														if (typeof(aBombard[bb._name])=="undefined")
														{
															AttachEvent(oElement1,'mouseover',makeHandler(b.makeID(),"BOMBARDED"),true);
														}
														// don't need else as if will have been done by the bombard loop.
										}
						}
        }


   			cc_log("Attaching the click handlers");  


        // Add Click Handlers to Text Map
        var allCntry = getElementsByClassName(document.getElementById('textMap'), "span","clickJump");
        for (i in allCntry) 
				{
						AttachEvent(allCntry[i],'click',MakeCntryClickHandler(allCntry[i].title),true);
        }

        var allCntry = getElementsByClassName(document.getElementById('textMap'), "span","JumpClick");
        for (i in allCntry) 
				{
						if (allCntry[i].title=="NOCONT")
								makeNoContJumpers(allCntry[i]);
						else
            		recurseContinents(allCntry[i], allCntry[i].title, "click", MakeCntntClickHandler);
        }

        // Add Click Handlers to Objectives
        var allCntry = getElementsByClassName(document.getElementById('objectives'), "span","clickJump");
        for (i in allCntry) 
				{
						AttachEvent(allCntry[i],'click',MakeCntryClickHandler(allCntry[i].title),true);
        }
        var allCntry = getElementsByClassName(document.getElementById('objectives'), "span","JumpClick");
        for (i in allCntry) 
				{
            recurseObjectives(allCntry[i], allCntry[i].title, "click", MakeObjClickHandler);
				}

        // Add Click Handlers to Neutrals
        var allCntry = getElementsByClassName(document.getElementById('neutrals'), "span","clickJump");
        for (i in allCntry) 
				{
						AttachEvent(allCntry[i],'click',MakeCntryClickHandler(allCntry[i].title),true);
        }
        var allCntry = getElementsByClassName(document.getElementById('neutrals'), "span","JumpClick");
        for (i in allCntry) 
				{
							if (allCntry[i].title=="STARTS")
							{
									makeStartJumpers(allCntry[i]);
							}
							else if (allCntry[i].title=="NEUTRALSTARTS")
							{
									makeNeutralStartJumpers(allCntry[i]);
							}
							else if (allCntry[i].title=="KILLERS")
							{
									makeKillerJumpers(allCntry[i]);
							}
							else // must be positions
							{
            			recursePositions(allCntry[i], allCntry[i].title, "click", MakePosClickHandler);
							}
        }

        // Add Hover Handler to continents overview
        var allCntry = getElementsByClassName(document.getElementById('contOverview'), "span","hovermap");
        for (i in allCntry) 
				{
            recurseContinents(allCntry[i], allCntry[i].title, "mouseover", MakeCntntHoverHandler);
						AttachEvent(allCntry[i],'mouseout',onMouseOutHover,true);
        }

}

	// various Magicmap functions (now outside magicmap)

      var onMouseOverPlayer = function () { 
        var mm =  document.getElementById('outer-map');
        var arrElements = mm.getElementsByTagName("div");
        var oElement;
        var player = this.className;
       
        for(var i=0; i<arrElements.length; i++)
        {
            oElement = arrElements[i];
            if (oElement.id.indexOf("ARMY")>=0)
            {
										if(oElement.className==("l" + player))
												{
												oElement.className  ="h" + player;
												}
										if(oElement.className==("m" + player))
												{
												oElement.className  ="i" + player;
												}

										if(oElement.className==("n" + player))
												{
												oElement.className  ="j" + player;
												}
						}
        }
      } ;
     var onMouseOverTeam = function (player) {
        var mm =  document.getElementById('outer-map');
            var arrElements = mm.getElementsByTagName("div");
            var oElement;
            for(var i=0; i<arrElements.length; i++)
            {
                oElement = arrElements[i];
                if (oElement.id.indexOf("ARMY")>=0)
               {
												if(oElement.className==("l" + player))
														{
																oElement.className  ="h" + player;
														}

												if(oElement.className==("m" + player))
														{
																oElement.className  ="i" + player;
														}
												if(oElement.className==("n" + player))
														{
																oElement.className  ="j" + player;
														}
							  }
            }
        } ;
        var makeHandlerMOT = function (n) {
         return function () {onMouseOverTeam (n);}
        };
    
   
    
       var onMouseOutHover = function () { 
       var mm =  document.getElementById('outer-map');
       var arrElements = mm.getElementsByTagName("div");
        var oElement;
        for(var i=0; i<arrElements.length; i++){
            oElement = arrElements[i];
          if(oElement.className.substring(0,4)=="type"){
          			var player = oElement.className.substring(oElement.className.length-1);
                oElement.className  ="off"+player;
          }
          else if(oElement.className.substring(0,1)=="h"){
                oElement.className  ="l" + oElement.className.substring(1);
            }
          else if(oElement.className.substring(0,1)=="i"){
                oElement.className  ="m" + oElement.className.substring(1);
            }
          else if(oElement.className.substring(0,1)=="j"){
                oElement.className  ="n" + oElement.className.substring(1);
            }
        }
        var hoverInfo = document.getElementById("hoverInfo");
        if (hoverInfo)
	        hoverInfo.innerHTML = "";
    } ;


    var onMouseOverTerritory = function mm123 (n, type) { 
	    
        var args = mm123.arguments;

        for (var i = 0; i < args.length; i++) {
            var oElement =  document.getElementById("ARMY" +args[i]);
            if (oElement)
            {
										if (type) // show attack type
										{
														var aElement =  document.getElementById("ATTACK" +args[i]);
														var player = aElement.className.substring(aElement.className.length-1);
														if (type=="BORDER")
														{
																aElement.className = "typeborder"+player;
														}
														else if (type=="ATTACK")
														{
																aElement.className = "typeattack"+player;
														}
														else if (type=="DEFEND")
														{
																aElement.className = "typedefend"+player;
														}
														else if (type=="BOMBARDS")
														{
																aElement.className = "typebombards"+player;
														}
														else if (type=="BOMBARDED")
														{
																aElement.className = "typebombarded"+player;
														}
														else if (type=="MUTUAL")
														{
																aElement.className = "typemutualbombard"+player;
														}
										}
										else
										{
														if(oElement.className.substring(0,1)=="l"){
																oElement.className  ="h" + oElement.className.substring(1);
														}
														if(oElement.className.substring(0,1)=="m"){
																oElement.className  ="i" + oElement.className.substring(1);
														}
														if(oElement.className.substring(0,1)=="n"){
																oElement.className  ="j" + oElement.className.substring(1);
														}
										}
						}
        }
        } ;
       var makeHandler = function (n, type) {
        return function () {onMouseOverTerritory(n, type);}
    };
    
    var onMouserOverShowName = function mm123321 (n) {
        var hoverInfo = document.getElementById("hoverInfo");
				if (hoverInfo)
        	hoverInfo.innerHTML = n;
    
    };
     var makeHandlerName = function (n) {
        return function () {onMouserOverShowName(n);}
        };


   var cntryClickHandler = function cntryClickHandler(cntryName) 
   {
					{
									window.setTimeout(jtm,100);
									window.setTimeout(makeHandler(cntryName.makeID()),500);
									window.setTimeout(onMouseOutHover,1000);
									window.setTimeout(makeHandler(cntryName.makeID()),1500);
									window.setTimeout(onMouseOutHover,2000);
									window.setTimeout(makeHandler(cntryName.makeID()),2500);
									window.setTimeout(onMouseOutHover,3000);
									window.setTimeout(makeHandler(cntryName.makeID()),3500);
									window.setTimeout(onMouseOutHover,4000);
									window.setTimeout(makeHandler(cntryName.makeID()),4500);
									window.setTimeout(onMouseOutHover,5000);
									window.setTimeout(makeHandler(cntryName.makeID()),5500);
									window.setTimeout(onMouseOutHover,6000);
									window.setTimeout(makeHandler(cntryName.makeID()),6500);
									window.setTimeout(onMouseOutHover,7000);
									window.setTimeout(makeHandler(cntryName.makeID()),7500);
									window.setTimeout(onMouseOutHover,8000);
									window.setTimeout(makeHandler(cntryName.makeID()),8500);
									window.setTimeout(onMouseOutHover,9000);
									window.setTimeout(makeHandler(cntryName.makeID()),9500);
									window.setTimeout(onMouseOutHover,10000);
					}
    }

    var MakeCntryClickHandler = function MakeCntryClickHandler(c) 
    {
        return function () { cntryClickHandler(c);};
    }

    function MakeCntntClickHandler(c)
    {
        return function () 
        {
                var ctn = continentsArray[c];
                for (var t in ctn._countrys) 
                {
                        cntryClickHandler(countriesArray[ctn._countrys[t]]._name);
								}
        };
    }

    function MakePosClickHandler(c)
    {
        return function () 
        {
                var ctn = positionsArray[c];
                for (var t in ctn._countrys) 
                {
                        cntryClickHandler(countriesArray[ctn._countrys[t]]._name);
								}
        };
    }

    function MakeObjClickHandler(c)
    {
        return function () 
        {
                var ctn = objectivesArray[c];
                for (var t in ctn._countrys) 
                {
                        cntryClickHandler(countriesArray[ctn._countrys[t]]._name);
								}
        };
    }

    function MakeCntntHoverHandler(c)
    {
        return function () 
        {
                var ctn = continentsArray[c];
                for (var t in ctn._countrys) 
                {
                			var id = countriesArray[ctn._countrys[t]]._name.makeID();
											onMouseOverTerritory(id);
								}
        };
    }

    function recurseContinents(clicker, cnt, action, func)
    {
	    var cnts = cnt.split("|");
	    for (i=0;i<cnts.length;i++)
	    {
				AttachEvent(clicker,action,func(cnts[i]),true);
		    var ctn = continentsArray[cnts[i]];
		    for (var cntn  in ctn._continents) 
		    {
						var cont = continentsArray[ctn._continents[cntn]]._name;
						recurseContinents(clicker, cont, action, func);
		    }
	    }
    }

    function recursePositions(clicker, cnt, action, func)
    {
	    var cnts = cnt.split("|");
	    for (i=0;i<cnts.length;i++)
	    {
				AttachEvent(clicker,action,func(cnts[i]),true);
		    var ctn = positionsArray[cnts[i]];
		    for (var cntn  in ctn._continents) 
		    {
						var cont = positionsArray[ctn._continents[cntn]]._name;
						recursePositions(clicker, cont, action, func);
		    }
	    }
    }

    function recurseObjectives(clicker, cnt, action, func)
    {
	    var cnts = cnt.split("|");
	    for (i=0;i<cnts.length;i++)
	    {
				AttachEvent(clicker,action,func(cnts[i]),true);
	    }
    }


		function makeNoContJumpers(clicker)
		{
				for (cnt in countriesArray)
				{
						var cont = countriesArray[cnt];
						if (!cont._inContenent)
						{
								AttachEvent(clicker,"click",MakeCntryClickHandler(cont._name.makeID()),true);
						}
			
				}
		}

		function makeNeutralStartJumpers(clicker)
		{
				for (cnt in countriesArray)
				{
						var cont = countriesArray[cnt];
						if (cont._neutral>0 && !cont._killer)
						{
								AttachEvent(clicker,"click",MakeCntryClickHandler(cont._name.makeID()),true);
						}
				}
		}

		function makeStartJumpers(clicker)
		{
				for (cnt in countriesArray)
				{
						var cont = countriesArray[cnt];
						if (!cont._neutral>0 && !cont._killer)
						{
								AttachEvent(clicker,"click",MakeCntryClickHandler(cont._name.makeID()),true);
						}
				}
		}

		function makeKillerJumpers(clicker)
		{
				for (cnt in countriesArray)
				{
						var cont = countriesArray[cnt];
						if (cont._neutral>0 && cont._killer)
						{
								AttachEvent(clicker,"click",MakeCntryClickHandler(cont._name.makeID()),true);
						}
				}
		}


//---- Prototyping ----
String.prototype.has = function(key) { return this.indexOf(key) > -1; }
String.prototype.makeID = function() { return this.replace(/ /g,"_").replace(/'/g,"_").replace(/#/g,"_").replace(/\?/g,"_"); }
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

String.prototype.normiliseSpaces = function() { return this.replace(/  /g," ").trim(); }

var jtm = function jtm() {window.location.hash="outer-map";}


//-------------------------------------------------------------------------
//    VARIABLE DECLARATIONS
//-------------------------------------------------------------------------

var startLogTime = Math.round((new Date()).getTime()/1000)
var Logging =  "";

// globalise variable to easily function out calls.
var map = document.getElementById('outer-map');
var minimumReinforcements = 3;

var smallwidth;
var smallheight;
var largewidth;
var largeheight;

//---- Misc ----
var i;
var tmp;
var re;

var mapSize;

var xmlurl = document.getElementById("xml_url").value;

// this function is run ONCE on initial INIT of the script.
function gm_ConquerClubGame()
{
    cc_log("Starting");

//    ---- Check for Required Components ----

    //If we cannot find any of the following then we're not in a game.
    if(map && xmlurl)
    {

    //-------------------------------------------------------------------------
    //    INIT
    //-------------------------------------------------------------------------

//     --- Add Styles ---
/*
Number Colors
#FFFFFF: White (Neutral)
#FF0000: Red (Both Same)
#0000FF: Blue (Both Same)
#009A04: Green (Both Same)
#FFFF00: Yellow (Bright)
#FF00FF: Magenta/pink (Both Same)
#00FFFF: Cyan (Bright)
#7F7F7F: Gray (Both Same)
#FF9922: Orange (Both Same)

Log Colors
#000000: Black (Neutral) <- Neutral has always been black in the logs!
#FF0000: Red (Both Same)
#0000FF: Blue (Both Same)
#009A04: Green (Both Same)
#CCCC00: Yellow (Muted)
#FF00FF: Magenta/pink (Both Same)
#00CCCC: Cyan (Muted)
#7F7F7F: Gray (Both Same)
#FF9922: Orange (Both Same) 
*/


// Colour Defs
// Number
var col0 = new Array();
col0[0] = "#FFFFFF"; // neutral
col0[1] = "#FF0000";
col0[2] = "#009A04";
col0[3] = "#0000FF";
col0[4] = "#FFFF00";
col0[5] = "#FF00FF";
col0[6] = "#00FFFF";
col0[7] = "#FF9922";
col0[8] = "#7F7F7F";
col0[9] = "#000000"; // BR colour
//Log
var col1 = new Array();
col1[0] = "#000000";
col1[1] = "#FF0000";
col1[2] = "#009A04";
col1[3] = "#0000FF";
col1[4] = "#DDDD00";
col1[5] = "#FF00FF";
col1[6] = "#00CCCC";
col1[7] = "#FF9922";
col1[8] = "#7F7F7F";
col1[9] = "#BBBBBB"; // BR colour

GM_addStyle(		
                ' .attackhovers { vertical-align:middle; padding-top:1px; padding-bottom:1px;} ' +
                ' #summary {height: 150px;overflow: auto;background-color: #eee; margin:10px 0 0 0;} ' +
                ' #outer-map div   { position:absolute; opacity:1.0; display:block} ' +

                ' #outer-map .hplayer0  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +

                ' #outer-map .lplayer0  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +

                ' #outer-map .iplayer0  {  opacity:0.8; border:thick solid ' + col0[0] + ';} ' +

                ' #outer-map .mplayer0  {  opacity:0.0; border:thick solid ' + col0[0] + ';} ' +

                ' #outer-map .jplayer0  {  opacity:10.8; border:thick solid  ' + col0[0] + ';} ' +

                ' #outer-map .nplayer0  {  opacity:0.0; border:thick solid ' + col0[0] + ';} ' +

                ' #outer-map .off0    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #outer-map .typeborder0    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #outer-map .typeattack0    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #outer-map .typedefend0    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #outer-map .typebombards0  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';} ' +
                ' #outer-map .typebombarded0 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #outer-map .typemutualbombard0 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';} ' +

                ' .playerBG0 { color: ' + col1[0] + '; } ' +

                ' .playerBGDD0 { background-color: ' + col0[0] + '; } ');


		var dashboard = map.parentNode.parentNode;

		// always create this DIV now - we need it for the mapfade number show...
/*		var magicMapDiv = document.createElement('div');
		magicMapDiv.id="magicmap";
		magicMapDiv.innerHTML = "";
		dashboard.appendChild(magicMapDiv);*/

		// map inspectdiv		
    var mapInspectDiv = document.createElement('div');
    mapInspectDiv.id="mapinspect";
    dashboard.appendChild(mapInspectDiv);
    mapInspectDiv.style.backgroundColor = "#EEEEEE";
    var mapInspetHTML = "<table><tr><td colspan=2>Map Inspect: <b><span id=hoverInfo /></b></td></tr></table>";
    mapInspectDiv.innerHTML = mapInspetHTML;

		// contoverviewdiv
		var contOverviewWrapper = document.createElement('div');
		contOverviewWrapper.innerHTML = "<H4>Continents Overview</H4>";
		contOverviewWrapper.id = "contOverviewWrapper";
		var contOverview = document.createElement('div');
		contOverview.id = "contOverview";
		contOverviewWrapper.style.display = "none";
		contOverviewWrapper.style.overflowY = "auto";
		contOverviewWrapper.style.overflowX = "hidden";
		contOverviewWrapper.appendChild(contOverview);
		dashboard.appendChild(contOverviewWrapper);

		// Objectives
		objWrapperDiv = document.createElement('div');
		objWrapperDiv.id="objectives";
		objWrapperDiv.innerHTML = "<h3>Objective Summary</h3>";
		var objDiv = document.createElement('div');
		objDiv.id="objectivessummary";
		objDiv.style.margin = '10px 0 0 0';
		objDiv.style.backgroundColor = "#EEEEEE";
		objWrapperDiv.appendChild(objDiv);
		objWrapperDiv.style.display = 'none';
		dashboard.appendChild(objWrapperDiv);

		// Neutral territories
		neutralWrapperDiv = document.createElement('div');
		neutralWrapperDiv.id="neutrals";
		neutralWrapperDiv.innerHTML = "<h3>Neutral Territories Summary</h3>";
		var neutralDiv = document.createElement('div');
		neutralDiv.id="neutralsummary";
		neutralDiv.style.margin = '10px 0 0 0';
		neutralDiv.style.backgroundColor = "#EEEEEE";
		neutralWrapperDiv.appendChild(neutralDiv);
		neutralWrapperDiv.style.display = 'none';
		dashboard.appendChild(neutralWrapperDiv);

		// Reinforcements Positions
		reinforcementsWrapperDiv = document.createElement('div');
		reinforcementsWrapperDiv.id="reinforcements";
		reinforcementsWrapperDiv.innerHTML = "<h3>Reinforcements Summary</h3>";
		var reinforcementsDiv = document.createElement('div');
		reinforcementsDiv.id="reinforcementssummary";
		reinforcementsDiv.style.margin = '10px 0 0 0';
		reinforcementsDiv.style.backgroundColor = "#EEEEEE";
		reinforcementsWrapperDiv.appendChild(reinforcementsDiv);
		reinforcementsWrapperDiv.style.display = 'none';
		dashboard.appendChild(reinforcementsWrapperDiv);

//     Create text map 
		textMapWrapper = document.createElement('div');
		textMapWrapper.id = "textMapWrapper";
		textMapWrapper.innerHTML = "<span style='float:right;margin-right:20px'>[<a id='showMoreLink'>scrollable text map</a>]</span><H3>Text Map</H3>"
		textMapWrapper.style.display = "none";

    textMap = document.createElement('div');
    textMap.id="textMap";
    textMap.style.backgroundColor = "#EEEEEE";

		textMapWrapper.appendChild(textMap);

    dashboard.appendChild(textMapWrapper);
    textMap.style.margin = '10px 0 0 0';

    // ID THE MAP
    if (document.getElementById("map_size_s").checked)
	    mapSize = "S";
	  else
	    mapSize =  "L";

//    ---- Map Analysis ----
    cc_log("Map Analysis");

    cc_log("Starting Request XML");
    GM_xmlhttpRequest({method: 'GET',url: xmlurl+'?nocache='+Math.random(),headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3 BOB' , 'Accept': 'application/xml,text/xml'},onload: 
	function(responseDetails) 
	{

		cc_log("Received XML response");

		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");

		smallwidth = dom.getElementsByTagName('smallwidth')[0].textContent.normiliseSpaces();
		smallheight = dom.getElementsByTagName('smallheight')[0].textContent.normiliseSpaces();
		largewidth = dom.getElementsByTagName('largewidth')[0].textContent.normiliseSpaces();
		largeheight = dom.getElementsByTagName('largeheight')[0].textContent.normiliseSpaces();

		var entries = dom.getElementsByTagName('name');

		for (var i = 0; i < entries.length; i++) 
		{
			var parent = entries[i].parentNode;
			comp = parent.getElementsByTagName('components');
			if (comp.length==1)
			{
				bonus = parent.getElementsByTagName('bonus');
				if (bonus.length==1)
					parseContinent(parent);
				else
					parseObjective(parent);
			  
			}
			else
				parseTerritory(parent);
		}

		// get starting positions.
		var entries = dom.getElementsByTagName('position');
		if (entries.length>0) 
		{
			for (var i = 0; i < entries.length; i++) 
			{
				positionsArray[i] = new Continent("Position_"+i,0,"position_"+i);
				var terrs = entries[i].getElementsByTagName('territory');
				for (var j = 0; j < terrs.length; j++) 
				{
						var terr = terrs[j].textContent.normiliseSpaces();
						positionsArray[i]._countrys.push(terr);
				}
			}
		}

		
		// get minimum reinforcements - defaulted to 3.
		var entries = dom.getElementsByTagName('minreinforcement');
		if (entries.length>0) 
		{
			minimumReinforcements = entries[0].textContent.normiliseSpaces();
		}
		
		// read out the reinforcements matrix.
		var entries = dom.getElementsByTagName('reinforcement');

		for (var i = 0; i < entries.length; i++) 
		{
			lower = entries[i].getElementsByTagName('lower')[0].textContent.normiliseSpaces();
			upper = entries[i].getElementsByTagName('upper')[0].textContent.normiliseSpaces();
			divisor = entries[i].getElementsByTagName('divisor')[0].textContent.normiliseSpaces();
			reinforcementsArray.push(new Reinforcement(lower, upper, divisor));
		}
		cc_log("Parsed XML");


//             -- Calculate Defensive Borders -- 

		for (var cou in countriesArray) 
		{
			var cc = countriesArray[cou];
			// Now update all those places I can attack with my details
			for (var k=0; k < cc._borders.length; k++)
			{
				var bb = countriesArray[cc._borders[k]];
				if (!bb._DefendBorders[cc._name]) 
				{
					bb._DefendBorders.push(cc._name);
				}
			}
			for (var k=0; k < cc._bombards.length; k++)
			{
				var bb = countriesArray[cc._bombards[k]];
				bb._bombardedBy.push(cc._name);
			}
		}

		updateContinents();

		updateObjectives();
		
		updateReinforcements();
		
		updateStarts();

		updateTextmap();

		updateMagicMap();
		
		updateMapInspectPadding();

    }}); // END Map Get response Function

} // End GAME Processing
}
// global vars so refresh function still has scope on them.
var countriesArray = new Array();
var continentsArray = new Array();
var objectivesArray = new Array();
var reinforcementsArray = new Array();
var positionsArray = new Array();

// Run init on first load.
var theGame = new gm_ConquerClubGame();