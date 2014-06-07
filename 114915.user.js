// ==UserScript==
// @id                 bvspachinkohelper@skarn22
// @name           BvS Pachinko Helper
// @namespace  Skarn22
// @description  Easier insight into Pachinko success rates.
// @include        http://www.animecubed.com/billy/bvs/partyhouse-pachinkoplay.html
// @include        http://www.animecubed.com/billy/bvs/partyhouse-pachinkomake.html
// @version        1.2.1
// @history        1.2.1 -- Fixed a bug with the opening slot prize chances.
// @history        1.2 -- Hotkeys, and click-to-select option on the creation page.
// @history        1.1.2.1 -- Fix for comma separators.
// @history        1.1.2 -- Reworked some code. Added the start of default item values. 
// @history        1.1.1 -- Removed 'chance of reaching this point' from starting slot messages.
// @history        1.1 -- Mouseover the starting slot arrows to view prizes for that slot.
// @history        1.0.3 -- Fix for Wheels, and a couple other things.
// @history        1.0.2 -- Fix for uploadfail.
// @history        1.0.1 -- 'Balls stopped here:' Message will now still display.
// @history        1.0 -- NOT FINAL -- Formats now also apply to object chances.
// @history        0.9.2.2 -- 'Balls ending here:' Message will now still display.
// @history        0.9.2.1 -- Hopefully fixed an issue with the version history >_>
// @history        0.9.2 -- Options no longer need to reload the page. Other minor fixes.
// @history        0.9.1 -- Coordinates now use the same system as the pachinkomake page.
// @history        0.9 -- Three format types for PathChances. Fixed calc for spots with no pathchance. 
// @history        0.9 -- Fixed machines with 2 mwidth at any point.
// @history        0.8 -- Coordinates toggleable, and prep for later changes.
// @history        0.7 -- Wheels. Can now perform all major calculations.
// @history        0.5 -- Formatting, and Chutes.
// @history        0.3 -- Slot, Bottom-Half, and Pins all work perfectly.
// ==/UserScript==

 // Records information and adds them to the span titles.
function GetTitles()
{
var spot;
 // Helper variables
	Table = document.getElementsByTagName('table');
	var y = 0;
	for(var k=1;k<Table.length;k++)
	{	
		var x = 1;
		for(var j=0;j<Table[k].rows[0].cells.length;j++)	
		{
            var Arrows = /pachiarrow(\d)/.exec(Table[k].rows[0].cells[j].style.backgroundImage)
            if(Arrows)
            {
                Machine[x] = new MachineSpot(Table[k].rows[0].cells[j],0,x,"Path " + Arrows[1],null,'')
                x++;
            }
			var span = Table[k].rows[0].cells[j].getElementsByTagName('span')[0]
			if(span)
			{   
				var header = /header=\[(?:[\d\s,()]+)?([\w\s]+)\s\] /.exec(span.title)
		body=/body=\[(?:([\d?]+)%\s|([\d?]+) in ([\d?]+)\s)?([^<\]]+(?:<br>Balls (?:ending|stopped) here: \d+)?)/.exec(span.title)
				spot = [null,header[1],body[1],body[2],body[3],body[4]]
 				var type = spot[1];	
					
				var chance = null;
				if(spot[2])
					if(spot[2] === 0)
						chance = 0;
					else if(!isNaN(parseInt(spot[2])))
						chance = Math.round((spot[2]/100)*10000)/10000
				if(spot[3])
					if(spot[3] >= 1)
						chance = Math.round((spot[3]/spot[4])*10000)/10000
					else if(spot[3] === 0)
						chance = 0;
				if(spot[2] == '??' || spot[3] == '??' || spot[4] == '??')
					chance = 0.1; //Assume 10% chance for now.

				var desc = spot[5];
                if(type == "Prize")
                {
                    var prize = /Win Prize \(([\w\W\s]+): ([\d,]+)\)/.exec(spot[5])
                    prize[2] = prize[2].replace(/,/g,''); // fix for commas
                    prize = new Prize(prize[1], prize[2]);
                }
                else prize = null;
				Machine[10*y+x] = new MachineSpot(span,y,x,type,chance,desc,prize);
//stores all of the information you might need to access later in the element.
                span.mach = Machine[10*y+x] 
				x++;
			}
		}
		if(x > 1)
		{
			if(x >2)
			{
				MachineWidth[y] = x-1;
				y++;
			}
			else x = 1; // Fix for a bug that causes one machinespot to be added incorrectly.
		}
	}
}
function SetTitles()
{
	for(var l=10;l<Machine.length;l++)
	{
        var mach = Machine[l]
		if(mach)	
		{
			var span = mach.span;
			var header = "",body = "";
			if(AddCoordinates == true)
				header += "("+mach.ymod+","+mach.x+") "
			header += mach.type + " "
			
			if(!isNaN(parseInt(mach.chance)))
			    body  += AddFormatting(mach.chance)

			body += mach.desc;

			if(!mach.path)
				mach.path = PathChance(l);
            
			if(mach.path[0])
			{
				body += "<br> Chance of reaching this point(Ignoring Locks): "
				for(var z=1;z<Machine[l].path.length;z++)
					if(mach.path[z])
						body += '<br>Path '+z+': '+ AddFormatting(mach.path[z])
			}
			else body += '<br> This point cannot be reached. '
      
            if(span.title)
				span.title = "header=["+header+"] body=["+body+"]";
			else span.wrappedJSObject.boHDR = header, span.wrappedJSObject.boBDY = body;
		}
	}
 // Now, go back and input the prize values at the starting point.
    for(var i=1;i<10;i++)
    {
        var mach = Machine[i];
        if(mach)
        {
            var a = 0;
            mach.prize = new Array();
 //loop through the prizes and find any that this starting point has a chance at.
            for(var j=10;j<Machine.length;j++)
                if(Machine[j] && Machine[j].prize && Machine[j].path[i])
                    mach.prize[a] = Machine[j].prize, mach.prize[a].path = Machine[j].path[i], a++;
            var header = "",body = "";
			header += mach.type + " "
			body += mach.desc;
            if(mach.prize[0])
            {
                mach.prize.sort(sortDescending)
                for(var j=0;j<mach.prize.length;j++)
                    if(mach.prize[j+1] && mach.prize[j].name == mach.prize[j+1].name && mach.prize[j].quantity == mach.prize[j+1].quantity)
                        mach.prize[j].path += mach.prize[j+1].path, mach.prize.splice(j+1,1), j--;
                body += "Prize chances for this path(Ignoring Locks): "           
                for(var h=0;h<mach.prize.length;h++)
                    body += "<br>" + mach.prize[h].quantity + " " + mach.prize[h].name + ":  " + mach.prize[h].fpath();
            }
            else body += "No prizes can be reached."
            var UWcell = mach.span.wrappedJSObject;
            UWcell.boHDR = header, UWcell.boBDY = body, UWcell.hasbox = 1;
        }
    }
}

 // determine the chance of getting to this point from each Gate
	function PathChance(i)
	{
		var pchance = new Array(0,0,0,0,0,0,0);
		var mach = Machine[i];
		var mwidth = MachineWidth[mach.y];
		var pchance2;
		var mach2;
		var mwidth2;
		var h;
		var offset;
 //Opening gates have no probability :P
        if(mach.y == 0)
            return null
 //When directly below an opening gate, base probability is 1.
		if(mach.y == 1)
			pchance[mach.x] = 1;
 //Even-numbered spots use the PathChance of the spot above them.
		if(mach.y % 2 == 0)
		{
			mach2 = Machine[i-10];
			pchance2 = new Array();
 // For wheels, multiply by the inverse of the probability.
			if(mach2.type == 'Wheel Left' || mach2.type == 'Wheel Right')
				for(h=1;h<7;h++)
					pchance2[h] = mach2.path[h] * (1-mach2.chance);
 // For Gates, multiply by the probability.
			else if(mach2.type == 'Gate')
				for(h=1;h<7;h++)
 					pchance2[h] = mach2.path[h] * mach2.chance;
			else pchance2 = mach2.path;
 // If the spot has no path, it can't be reached so there's no pchance.
			pchance2 = pchance2? pchance2: new Array(0,0,0,0,0,0,0)
 // Finally, just add the probabilities you have together.
			for(h=1;h<7;h++)
				pchance[h] += pchance2[h];
		}
		else 
		{
 // Check for Pins.
			if(mach.y > 1)
			{
				var mwidth2 = MachineWidth[mach.y-1]
				if(mwidth > mwidth2)
					offset = -1;
				else offset = 0;

				mach2 = Machine[(i+offset-10)];
 // For Pins to the left, multiply by the probability.
				pchance2 = new Array();
				if(mach2 && mach2.type == 'Pin')
				{
					for(h=1;h<7;h++)
						pchance2[h] = mach2.path[h] * mach2.chance;
					for(h=1;h<7;h++)
						pchance[h] += pchance2[h];
				}
				mach2 = Machine[(i+offset-9)];
 // For Pins to the right, multiply by the inverse of the probability.
				pchance2 = new Array();
				if(mach2 && mach2.type == 'Pin')
				{
					for(h=1;h<7;h++)
						pchance2[h] = mach2.path[h] * (1-mach2.chance), pchance[h] += pchance2[h];
				}
			}
 // Check for Chutes.
			if(mach.y > 3)
			{
				var mwidth2 = MachineWidth[mach.y-3]
				if(mwidth > mwidth2)
					offset = -1;
				else if(mwidth < mwidth2)
					offset = 1;
				else offset = 0;
				mach2 = Machine[(i+offset-30)]
				if(mach2 && mach2.type == 'Chute')
					for(h=1;h<7;h++)
						pchance[h] += mach2.path[h];
			}
		}
 // Check for Wheels.
		if(mach.x > 1)
		{
			mach2 = Machine[i-1];
			pchance2 = new Array();
			if(mach2 && mach2.type == 'Wheel Right')
			{
				for(h=1;h<7;h++)
					pchance2[h] = mach2.path[h] * mach2.chance;
				for(h=1;h<7;h++)
					pchance[h] += pchance2[h];
			}
		}
	
		if(mach.x < mwidth)
		{
			mach2 = Machine[i+1];
			pchance2 = new Array();
			if(mach2 && mach2.type == 'Wheel Left')
			{
				mach2.path = arguments.callee(i+1);
				for(h=1;h<7;h++)
					pchance2[h] = mach2.path[h] * mach2.chance;
				for(h=1;h<7;h++)
					pchance[h] += pchance2[h];
			}
		}
		for(h=0;h<pchance.length;h++)
            if(pchance[h])
				pchance[0]++; //so pchance[0] is the number of paths that have a chance.
		return pchance;
	}

function MachineSpot(span,y,x,type,chance,desc,prize)
{
    this.span = span;
	this.y = y;
    this.ymod = Math.ceil(this.y/2) 
	this.x = x;
	this.type = type;
	this.chance = chance;
	this.desc = desc;
    this.prize = prize;
	this.path;
    this.ref = 10*this.y + this.x; //basically, the Index in the Machine array.
}

function sortDescending(a,b)
{
return b.value - a.value;
}

function factor(a)
{
	if (a >= 9007199254740992 || a < 2) 
		return a;

	var b = new Array();
	for (o=2;o<=a;o++) 
	{
		if (a % o == 0) 
		{
			b.push(o);
			a = a/o, o = 1;
		}
	}
	return b;
}

function simplify(a,b)
{
	var faca = factor(a), facb = factor(b);
	if(a == b)
		return new Array(1,1)
	if(faca == 0 || facb == 0)
		return new Array(0,1)
    if(b != 0 && !b)
        return a;

	for(m=0;m<faca.length;m++)
	{
		for(n=0;n<facb.length;n++)
		{
			if(faca[m] === facb[n])
			{
				a = a/faca[m]
				b = b/facb[n]
				faca.splice(m,1);
				facb.splice(n,1);
				m = 0;
				n = -1;
			}
		}
	}
	return new Array(a,b)
}

function ToggleClickSelect()
{
 // Get a fresh check, just in case
    if(GM_getValue)
	    ClickSelect = GM_getValue('BvSPachinkoClickSelect',true)
	if(ClickSelect == true)
    {
	    ClickSelect = false;
        document.removeEventListener('click',SelectSpot,false)
        if(GM_setValue)
		    GM_setValue('BvSPachinkoClickSelect',false)
    }
	else
    {
	    ClickSelect = true;
        document.addEventListener('click',SelectSpot,false)
        if(GM_setValue)
		    GM_setValue('BvSPachinkoClickSelect',true)
    }
    
	document.forms.namedItem('setmachinec').reset();
}

function ToggleCoordinates()
{
 // Get a fresh check, just in case
    if(GM_getValue)
	    AddCoordinates = GM_getValue('BvSPachinkoCoords',true)
	if(AddCoordinates == true)
		GM_setValue('BvSPachinkoCoords', false);
	else
		GM_setValue('BvSPachinkoCoords', true);
	AddCoordinates = GM_getValue('BvSPachinkoCoords',true)
    
	SetTitles(); //Reset titles with new data.
}

function SetFormat(FormatType)
{
	GM_setValue('BvSPachinkoFormat', FormatType);
	Format = FormatType;
	SetTitles(); //Reset titles with new data.
}

function AddFormatting(value, FormatOverride)
{
 // formatoverride isn't currently being used, but it might be handy later, so...
        var Format = FormatOverride? FormatOverride: GM_getValue('BvSPachinkoFormat','1 in X');
		if(Format == '1 in X')
        {
            if(value)
			    return '1 in '  + (Math.round(100*(100/value/100))/100) + ' '
            else return '0 in 1 ' // Instead of '1 in Infinity'
        }
 // X in Y is rounded to the nearest 1
		if(Format == 'X in Y')
        {
            var simplechance = simplify(100,Math.round(100/value));
			return  simplechance[0] + ' in ' + simplechance[1] + ' ';
        }
 // Percent is rounded to the nearest thousandth
		if(Format == 'Percent')
        {
			if(value)
			    return  (Math.round(10000*(value*100))/10000) + '% '
            return '0% ';
        }
        return 'Formatting Error.'
}


function SelectSpot(event)
{
    function SetValues(spot)
    {
        switch(spot.type)
        {
            case "Nothing":
                form[6].checked = true;
            break;
            case "Wheel Left":
                form[7].checked = true;
                form[8].value = (100 * spot.chance);
            break;
            case "Wheel Right":
                form[9].checked = true;
                form[10].value = (100 * spot.chance)
            break;
            case "Gate":
                form[11].checked = true;
                form[12].value = (100 * spot.chance)
            break;
            case "Roulette Spin":
                form[13].checked = true;
                form[14].value = (100/spot.chance/100)
                form[15].value = /\/j(\d).gif/.exec(span.parentNode.style.backgroundImage)[1]
            break;
            case "Lock":
                form[16].checked = true;
                form[17].value = /\/ka?(\d).gif/.exec(span.parentNode.style.backgroundImage)[1]
            break;
            case "Pin":
                form[18].checked = true;
                form[19].value = (100 * spot.chance)
            break;
            case "Chute":
                form[20].checked = true;
            break;
            case "Drain":
                form[21].checked = true;
            break;
            case "Prize":
                var Span = Table[spot.k].rows[0].cells[spot.j].getElementsByTagName('span')[0]
                var Type = /(y|z)(\d).gif/.exec(Span.parentNode.style.backgroundImage)
                if(Type[1] == 'z')
                {
                    form[22].checked = true;
                    form[23].value = Type[2]
                } else {
                    form[24].checked = true;
                    form[25].value = Type[2]
                }
            break;
        }
    }

    var span = event.target.parentNode;
    if(span.mach)
    {
	    document.forms.namedItem('setmachinec').reset();
        var mach = span.mach;
        if(mach.y%2 == 0) 
            var mach2 = Machine[mach.ref - 10];
        else var mach2 = Machine[mach.ref + 10];
        var form = document.forms.namedItem('setmachinec').elements;
        form[4].value = mach.ymod;
        form[5].value = mach.x;
        SetValues(mach);
        SetValues(mach2);
    }
}

function Prize(name, quantity)
{
    this.GetPrizeValue = function()
    {
        for(var i=0; i<items.length; i++)
            if(this.name == items[i].name)
                return items[i].value * this.quantity;
        return this.quantity;
    }
    this.name = name;
    this.quantity = quantity;
    this.path;
    this.value = this.GetPrizeValue();
    this.fpath = function()
    {
        return AddFormatting(this.path);
    }
}
function Item(name, value)
{
    this.name = name;
    this.value = value;
}

var items  = [
new Item("Template", 11111111111),
new Item("Over 11000", 50000000),
new Item("Sho Nuff Elixir", 40000000),
new Item("Looptastic", 3000000),
new Item("Chestnut Parfait", 1000000),
new Item("Turtle Shoes", 1000000),
new Item("Friend Request", 1000000),
new Item("Pet Food", 100000),
new Item("CHACOTACO", 100000),
new Item("BROCOTACO", 50000),
new Item("TACO", 15000),
new Item("Gold Ball", 1000),
new Item("Silver Ball", 100),
new Item("Bronze Ball", 10),
new Item("Ryo", 1.11)
];

function process_event(event) // Hotkeys.
{
    if(event.keyCode == 97) // Numpad 1
        SetFormat('1 in X');
    if(event.keyCode == 98) // Numpad 2
        SetFormat('Percent');
    if(event.keyCode == 99) // Numpad 3
        SetFormat('X in Y');
    if(event.keyCode == 100) // Numpad 4
        ToggleCoordinates();
    if(event.keyCode == 101) // Numpad 5
        ToggleClickSelect();
}
window.addEventListener("keyup", process_event, false);

 // Options to choose the format your pathchances will use.
var Format = '1 in X'; //DEFAULT VALUE for Chrome.
if(GM_getValue)
{
    var Format = GM_getValue('BvSPachinkoFormat','1 in X');
    GM_registerMenuCommand('Format (1 in X)', function(){SetFormat('1 in X')})
    GM_registerMenuCommand('Format (Percent)', function(){SetFormat('Percent')})
    GM_registerMenuCommand('Format (X in Y)', function(){SetFormat('X in Y')})
}

 // Option to toggle whether coordinates are displayed.
var AddCoordinates = true; //DEFAULT VALUE for Chrome.
if(window.location.pathname=="/billy/bvs/partyhouse-pachinkomake.html")
    var AddCoordinates = true; //Always true when in the creation menu.    
else if(GM_getValue)
{
    var AddCoordinates = GM_getValue('BvSPachinkoCoords',true);
    GM_registerMenuCommand('Toggle Coordinates', ToggleCoordinates)
}

// Click-to-select option.
var ClickSelect = false; //Always false except on the pachinkomake page.
if(window.location.pathname=="/billy/bvs/partyhouse-pachinkomake.html")
{
    var ClickSelect = true; //DEFAULT VALUE for Chrome.
    if(GM_getValue)
    {
        ClickSelect = GM_getValue('BvSPachinkoClickSelect',true)
        GM_registerMenuCommand('Toggle Click-To-Select', ToggleClickSelect)
        if(ClickSelect == true)
            document.addEventListener('click',SelectSpot,false); // Click a spot to set the pin settings form to it's specs.
    }
}

var Machine = new Array();
var MachineWidth = new Array();
var Table;
GetTitles();

SetTitles();
