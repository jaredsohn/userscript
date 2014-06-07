// ==UserScript==
// @name        eBay Old Search
// @description Set _pppn=v3 to use old search engine - Viking - on eBay - instead of Cassini
// @namespace   C:\Users\AdobeScripts\AppData\Roaming\Mozilla\Firefox\Profiles\kdokpam3.default\gm_scripts

// @author      AdobeScripts
// @homepage    http://userscripts.org/scripts/show/152887

// @include     http://www.ebay.co.uk/dsc/*
// @include     http://www.ebay.co.uk/sch/*
// @include     http://www.ebay.co.uk/itm/*
// @include     http://dsa.ebay.co.uk/dsc/*
// @include     http://dsa.ebay.co.uk/sch/*
// @include     http://dsa.ebay.co.uk/itm/*

// @include     http://www.ebay.de/dsc/*
// @include     http://www.ebay.de/sch/*
// @include     http://www.ebay.de/itm/*
// @include     http://dsa.ebay.de/dsc/*
// @include     http://dsa.ebay.de/sch/*
// @include     http://dsa.ebay.de/itm/*

// @include     http://www.ebay.com/dsc/*
// @include     http://www.ebay.com/sch/*
// @include     http://www.ebay.com/itm/*

// @include     http://www.ebay.ca/dsc/*
// @include     http://www.ebay.ca/sch/*
// @include     http://www.ebay.ca/itm/*

// @include     http://www.ebay.pl/dsc/*
// @include     http://www.ebay.pl/sch/*
// @include     http://www.ebay.pl/itm/*

// @version     1.18
// ==/UserScript==

var CurrentAddress = location.href;
var UpdateAddress = false;

// ###########################
var SetLocation = false;
// set this to TRUE if you want to search ONLY in your country
// ###########################

// ###########################
var SetIncludeDescriptionSearch = false;
// set this to TRUE if you want to search ONLY in your country
// ###########################

// ###########################
var DoExtraProcessing = false;
// set this to TRUE if you want to tweak list even more :)
// ###########################

// ###########################
var DoExtraProcessingMoreCondensed = false;
// set this to TRUE if you want to tweak list even more :)
// ###########################

var tabDoc = content.document;
var difs = tabDoc.getElementsByTagName('a');

for(var h = 0; h < difs.length; h++) 
{
	if (difs[h].href.indexOf('/i.html?') >-1 )
	{
		difs[h].href = difs[h].href.replace('/i.html?','/i.html?_pppn=v3&');
	}
	else
	{
		difs[h].href = difs[h].href.replace('/i.html','/i.html?_pppn=v3');
	};
	if (difs[h].href.indexOf('/m.html?') >-1 )
	{
		difs[h].href = difs[h].href.replace('/m.html?','/m.html?_pppn=v3&');
	}
	else
	{
		difs[h].href = difs[h].href.replace('/m.html','/m.html?_pppn=v3');
	};
};

if (/dsa/.test(CurrentAddress))
{
    CurrentAddress = CurrentAddress.replace(new RegExp("\&_odkw.+\&"),"\&");
    
    CurrentAddress = CurrentAddress.replace("dsa.","www.");
    CurrentAddress = CurrentAddress.replace("_odkw=","_nkw=");
};

if (/_pppn=r1/.test(CurrentAddress))
{
//    alert("was r1 - replace it");
    CurrrentAddress = CurrentAddress.replace("_pppn=r1","_pppn=v3");
    UpdateAddress = true;
}
else
{
    if (/_pppn=v3/.test(CurrentAddress))
    {
//        alert("was v3 - do nothing");
         UpdateAddress = false;
    }
    else
    {
//        alert("missing - added v3");
        if (CurrentAddress.slice(-6) == 'i.html')
        {
            CurrentAddress = CurrentAddress.concat("?_pppn=v3");
        }
        else
        {
            CurrentAddress = CurrentAddress.concat("&_pppn=v3");
        };
        UpdateAddress = true;
    };
};

if (SetLocation) // set LOCATION to UK/USA/etc. ONLY
{
    if (/LH_PrefLoc=1/.test(CurrentAddress))
    {
//        alert("was LH_PrefLoc - do nothing");
        UpdateAddress = UpdateAddress || false;
    }
    else
    {
        if (/LH_PrefLoc/.test(CurrentAddress))
        {
//            alert("was something - replace it");
            CurrentAddress = CurrentAddress.replace(new RegExp("\&LH_PrefLoc.+\&"),'\&LH_PrefLoc=1\&');
            UpdateAddress = true;
        }
        else
        {
//            alert("missing - added LH_PrefLoc");
            CurrentAddress = CurrentAddress.concat("&LH_PrefLoc=1");
            UpdateAddress = true;
        };
    };
};

if (SetIncludeDescriptionSearch) // set INCLUDE DESCRIPTION search
{
    if (/LH_TitleDesc=1/.test(CurrentAddress))
    {
//        alert("was LH_PrefLoc - do nothing");
        UpdateAddress = UpdateAddress || false;
    }
    else
    {
        if (/LH_TitleDesc/.test(CurrentAddress))
        {
//            alert("was something - replace it");
            CurrentAddress = CurrentAddress.replace(new RegExp("\&LH_TitleDesc.+\&"),'\&LH_TitleDesc=1\&');
            UpdateAddress = true;
        }
        else
        {
//            alert("missing - added LH_PrefLoc");
            CurrentAddress = CurrentAddress.concat("&LH_TitleDesc=1");
            UpdateAddress = true;
        };
    };
};

if (UpdateAddress)
{
    if (CurrentAddress.indexOf('/itm/') == -1)
    {
        location.href = CurrentAddress;
    };
};

if (DoExtraProcessing)
{
	ExtraProcessing();
};

function ExtraProcessing()
{
	var difs = tabDoc.getElementsByTagName('div');

	for(var h = 0; h < difs.length; h++) 
	{
		if (difs[h].className == 'ff-center')
		{
			difs[h].style.marginRight="5px";
		};

		if (difs[h].className == 'dyn dynS') //'dynamic dynSgCol')
		{

			difs[h].innerHTML=difs[h].innerHTML.replace('<br>(','(');
			if (CurrentAddress.slice(0,19) == 'http://www.ebay.com')
			{
//				difs[h].innerHTML=difs[h].innerHTML.replace('USA','UK');
			}
			else if (CurrentAddress.slice(0,21) == 'http://www.ebay.co.uk')
			{
				difs[h].innerHTML=difs[h].innerHTML.replace('United Kingdom','UK');
			};

			difs[h].innerHTML=difs[h].innerHTML.replace('Seller user ID:','Seller ID:');
			difs[h].innerHTML=difs[h].innerHTML.replace('Seller User ID:','Seller ID:');

			difs[h].innerHTML=difs[h].innerHTML.replace(new RegExp(" mi from.+a>"),' miles');
			if (difs[h].innerHTML.indexOf('<div class="s2">Location:') > -1)
			{
				difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s2">Location: ','<table width="100%"><tr><td width="50%" style="padding:0px">Loc: ');
				difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s1"><div class="mWSpc"></div>Item: ','</td><td width="50%" style="padding:0px">Item: ');
			}
			else
			{
				difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s1"><div class="mWSpc"></div>Item: ','<table width="100%"><tr><td colspan=2 width="100%" style="padding:0px">Item: ');
//				difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s1"><div class="mWSpc"></div>Item: ','</td><td width="25%" style="padding:0px">Item: ');
			};
			difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s1"><div class="mWSpc"></div>Seller ID: ','</td></tr><tr><td style="padding:0px" width="50%" >Seller ID: ');
			difs[h].innerHTML=difs[h].innerHTML.replace('<div class="s1"><div class="mWSpc"></div>Feedback: ','</td><td style="padding:0px" width="50%" >Fdbck: ');
			difs[h].innerHTML=difs[h].innerHTML.replace('<span class="vbar g-nav">&nbsp;|&nbsp;</span>',' | ');

			if (CurrentAddress.slice(0,19) == 'http://www.ebay.com')
			{
				if (difs[h].innerHTML.indexOf('USA') > -1)
				{
				}
				else
				{
					difs[h].innerHTML = difs[h].innerHTML.replace('Loc: <span class="v">','Loc: <span class="v" style=\"background-color: yellow;\">');
				};
			}
			else if (CurrentAddress.slice(0,21) == 'http://www.ebay.co.uk')
			{
				if (difs[h].innerHTML.indexOf('United Kingdom') > -1)
				{
				}
				else if (difs[h].innerHTML.indexOf('UK') > -1)
				{
				}
/*
				else if (difs[h].innerHTML.indexOf('Hong Kong') > -1)
				{
					difs[h].parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'red';
//					difs[h].parentNode.parentNode.parentNode.parentNode.innerHTML = 'qqq';
				}
				else if (difs[h].innerHTML.indexOf('China') > -1)
				{
					difs[h].parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'red';
//					difs[h].parentNode.parentNode.parentNode.parentNode.innerHTML = 'qqq';
//					alert(difs[h].innerHTML);
				}
*/
				else
				{
					difs[h].innerHTML = difs[h].innerHTML.replace('Loc: <span class="v">','Loc: <span class="v" style=\"background-color: yellow;\">');
				};
			};

/*
			if (difs[h].innerHTML.indexOf('United Kingdom') > -1)
			{
			}
			else if (difs[h].innerHTML.indexOf('UK') > -1)
			{
			}
			else
			{
				difs[h].innerHTML = difs[h].innerHTML.replace('Loc: <span class="v">','Loc: <span class="v" style=\"background-color: yellow;\">');
			};
*/

		};
		if (difs[h].className == 'g-nav group' )
		{
			if (difs[h].innerHTML.indexOf('This item is on your') > -1)
			{
				difs[h].innerHTML = difs[h].innerHTML.replace('<span class="watch">','<span class="watch" style=\"background-color: lime;\">');
			};
		}

		if (difs[h].className == 'mi-l')
		{
			difs[h].parentNode.removeChild(difs[h]);
		};

		if (difs[h].className == 'dsft')
		{
			difs[h].className="";
			difs[h].innerHTML="";
		};

	};

	var tds = tabDoc.getElementsByTagName('td');
	for(var h = tds.length-1; h>=0 ; h--)
	{
		if (tds[h].className == 'trs')
		{
			tds[h].innerHTML = '';
			tds[h].style.backgroundColor = 'red';
			tds[h].parentNode.removeChild(tds[h]);
		};

		if (tds[h].className == 'tme  rt')
		{
			tds[h].parentNode.removeChild(tds[h]);
		};
		if (tds[h].className == 'tme rt')
		{
			tds[h].parentNode.removeChild(tds[h]);
		};

/*
		if (tds[h].className.slice(0,3) == 'tme')
		{
			tds[h].style.width = "45px";
			tds[h].className = "";
		};
*/

		if (tds[h].className.slice(0,3) == 'prc')
		{
			tds[h].style.width = "60px";
			if (tds[h].nextSibling.innerHTML == 'Free')
			{
				if (tds[h].innerHTML.indexOf('</div><div>') > 0)
				{
					tds[h].innerHTML = tds[h].innerHTML.concat('<br><div style=\"background-color: lime; font-weight:bold; color:white;\">',tds[h].nextSibling.innerHTML,'</div>');
				}
				else
				{
					tds[h].innerHTML = tds[h].innerHTML.concat('<br><br><div style=\"background-color: lime; font-weight:bold; color:white;\">',tds[h].nextSibling.innerHTML,'</div>');
				};
			}
			else
			{
				if (tds[h].innerHTML.indexOf('</div><div>') > 0)
				{
					tds[h].innerHTML = tds[h].innerHTML.concat('<br><div style=\"background-color: lightcoral; font-weight:bold; color:white;\">',tds[h].nextSibling.innerHTML,'</div>');
				}
				else
				{
					tds[h].innerHTML = tds[h].innerHTML.concat('<br><br><div style=\"background-color: lightcoral; font-weight:bold; color:white;\">',tds[h].nextSibling.innerHTML,'</div>');
				};
				tds[h].innerHTML = tds[h].innerHTML.replace('Postage to','Post');
				tds[h].innerHTML = tds[h].innerHTML.replace('Price</a> <br><br>','Price</a><br>');
			};
			tds[h].parentNode.removeChild(tds[h].nextSibling);
			tds[h].className = "";
		};

		if (DoExtraProcessingMoreCondensed)
		{
			if (tds[h].className.slice(0,4) == 'bids')
			{
				aaa = tds[h].innerHTML ;
				tds[h].innerHTML = '<div style=\"background-color: white; font-weight:bold; color: blue;\">' + aaa + '</div>';
				tds[h].style.width = "80px";
				tds[h].className = "";
				tds[h].innerHTML = tds[h].innerHTML.concat('<br>',tds[h].nextSibling.innerHTML);
				tds[h].parentNode.removeChild(tds[h].nextSibling);
			};
		};

		if (tds[h].className.slice(0,4) == 'ship')
		{
			tds[h].innerHTML=tds[h].innerHTML.replace('Collection only: Free','Pick up only');
		};

	};
};