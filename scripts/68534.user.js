// ==UserScript==
// @name           BBEditor
// @namespace      http://www.peyups.com
// @description    Advanced Editor for Peyups
// @include        http://www.peyups.com/*
// @include        http://peyups.com/*
// ==/UserScript==

// BBEditor v0.3.1


var base_smiley_url = '/forums/my-plugins/bb-smilies/default/';
var edit_target = null;
var range = null;
var font_color_img_data = "data:image/gif;base64,R0lGODlhFwAWAPUAAAAAAEBYoCA4YL7G1HeNujtShoScytLW5WBynUphd7G/1TBIgFRuojthlcTN4KOuwuTk6WF7ryA4cFRnlTBQkHmRwkpopcfL1M/T39ze51BwsCBAcDBYkCxCaGyCrkhknHyNstLb683R3YSXwMrO1yxDd+Xm7M3V5t7h61R0okBgoMLG2DtZlv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAXABYAAAZ7wJZwSCwaj8ikcqk8VZhJgiYEPWo0lmrRMFJRFNphNkX5hFuKSMvBoTjCkYOwQUFoUQHGhMFaSDJCAIKCRwQRIgMrGAsbdoGERw1FIBIlRABHGR4FCUMPAhsbHSZKJiIiJEQkF6wQSYOwsbBHsrWDtLa1uLmxZ76/wC1BADs=";
var url_img_data = "data:image/gif;base64,R0lGODlhFwAWAPcAAP////D4//Dw/9D48O/t8ND44Orr7urs7+bp7eDo/9Dw0OPl6uLk6N3h5bDwwNDg8NDY8NLX4NDY4NHX3aDosMnQ18rQ2MzO18DQ8MfO18DQ4KDgkKDggMXM1cPJ0ZDggMHI0JDgcLDI4L3F0ZDYoL/Ez5DYcJDQsLnAyZDQoIDYgLDA0IDYYK671rC6xrC40K+6xq+6xa20u6ezzKS0xamyvqOzxKmxvaWvxqCw0JC4sKGvv6CwwKKtxHDIQIC4kJWsw6CowGDIQHDAUJ2otGDIMJyntJCowJqksJaltJijr5ShvI6juI2iuJadtGC4UJWdsXCg/5WdtI6cuI2bt4+btIads3CogICgoI6ZpXCgsGCwQHCY8HCY4ICYsGCgsIuUqYCYoGCY/2CY8HCgcECwYECwUGCY0ICQsHCQ4ICNqnCQwH+NqmCQ4H+NnGCYgHCQoECgkECY0GCQoGCQkGCI4HiImWCI0ECgQFCYYG2HolCI4DCgUECYYCCgYHGDlneBmHCAoCCgQDCQoDCYUFCA0G19jmCAgG17i0CIgCCYQCCQgGB4kECAkEB40FB4YGBwgiCIMFBwYFBokFNne1BogDB4QFVjf0BocEBoUDBocEdccUZabkpZd0pZaEdVcUBYYDtKaDBIYCtAYyw7WRAoUBAoQP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAKcALAAAAAAXABYAAAj/AE8JHEiwoMGDCBMqXIjwgAUXSZzg8ICAocAGLnScIPFhCB0kExgagPFDhYMCV0xsaZSFwcIKWIqEcKBgAIU3chLJWBhjzhMWGzik+DJmDyE7C5OkySPEBxktZ9oMEtRpoZQoh/CYodOlzR4/ijwtpMGFi6Q+ZeLUKZTJkqGFINaIafOID59FjjCBIrJwgZI7a8LAYRRJ0yQ1TJjs6JAQRRAJAQSsCFTpCGTJbEogtPHADSlRXnIceQGEEyUjPAAhtAJg1IUWAAIkgIDhT4QmGkIh7KGhip4lpUwJ3/R7hhdICDNQyaFBBJpLUJY3f14j4Qgwlz4hukHgevbtBAhYBhxPvvz4gAA7";
var img_img_data = "data:image/gif;base64,R0lGODlhFwAWAPYAAP/////4//D4//Dw//Dw8ODw///owODo/+Do8ODg8NDg/9Dg8PDY0NDY8MDY/9DQ8MDQ/9DI0P/AcLDI/7DA4KDA/7DA0LC44LC40KC48KC44KC40LCw0KCw4KCw0KCowJCo0JCowJCg0JCgwJCgsJCYwNCQQICYwICYsICQwICQsHCIsHCAsHCAoHCAkHB4kGB4oNBgMGBwkFBwoGBokNBQIFBooMBQIFBggFBYcEBQYDBIgCBIgCBAgDBAUDA4UCA4gBA4gBAwgBAwcAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAAAXABYAAAfRgEWCg4SFhoeIiYqLjI2FIJAgISMnKSssMDAzNokgAJ+gAAIDBQcKO52hnwwxMREKGjypoQIxBhI1Dh2yiCG0AzESJjcQHj2JI6CjBRE1NxwTIMeIJ58JLS0NCg4QExMj04cpANcIDToeOjodFSVAiSvlCA8YORYWRBkoQYksLQQDFnS4ACLHBxJEVPBDBCNAQA0gRIxo4cPFCyJCEsEg0IBCxBMrWuDwkUPHkEQzFmyoFFIGDRw6fvw4icjGDh48eugEEiSIkCFAHQkdSrQo0UAAOw==";
var bold_img_data = "data:image/gif;base64,R0lGODlhFwAWAPAAAAAAAP///yH5BAEAAAEALAAAAAAXABYAAAImjI+py+0Po5y0gYsvxYZL70Wg9mVkCXQnNKao6rLmWtX2jef6HhQAOw==";
var ital_img_data = "data:image/gif;base64,R0lGODlhFwAWAPEAAAAAAICAgP///wAAACH5BAEAAAIALAAAAAAXABYAAAIjlI+py+0Po5w0gnuruUGLkHmcBwKeMGrlmVIYdsbyTNe2UwAAOw==";
var undl_img_data = "data:image/gif;base64,R0lGODlhFwAWAPEAAAAAAICAgP///wAAACH5BAEAAAIALAAAAAAXABYAAAIrlI+py+0Po5y0gQsEzvIeP4Ea15FiJJ5QSqJmuwKBEKgxVuXIxuv+DwxWCgA7";
var bg_metal2_img_data = "data:image/gif;base64,R0lGODlhFAAyAPcAAPr47M7d36zDytbh3pmxu/X16ubr5MXV17rO0tnk4/n37OPr5/n47LvO1PT168nZ3bfK0eju6N7o5ff37LXKz8TV2qjAyJWtt5Kps+ru5pepsuHo4tDd3Pj367DGzb/S1KC5wuvu5q7CyvHz67XK0O/x6Jy1vvPz6fLz6fHz6pyut8vZ2aCzvO/x56W5wZ21vr/S1/b16qq9xajAx9zk4MDS1/j267PGzqS8xaS9xa/CyrDHzdzl4Jatt8rZ2ff27Oju6aC4wvn369Tg4dHd3OTr55eqssTW2tTh4e3w6aW4wdbg3pKpsqq+xfDz65yvt7/R1/X165uvt8XW1+Ho46/CycnZ3NPh4Zuut6W4wKW5wN7n5aGzvO3w6rPHzqC0vJmxurfL0bvO1ZWttrrN0tHd27vP1OHn4rfL0sDR1djk46G5wsPV2vf269vk4Mva2fT17LPHze3x6ai/yN7o5r/R1aS9xPr37Ozx6Z21v/b37LLGzbDGzKq+xqG0vKG5wdnl5PX17L/R1O7x6JGps9Dd25apscra2crZ2pKos6zDy+zw6uzx6ubr5fj47N/o5cDS1LLGzqW9xaCzu7rO0dPg4eXr5dnk5Nvl4Kq9xqW8xdPh4rPGzebs5JepsePq5+jt6PLz6PPz6K7Cyam9xcna3ff368bW16m+xcvZ2qG4wsDS2Ovu5dzk4cna3Pj37KvDyubs5fr36/r467fK0pGpsrXL0M7d3sTW2e7w55yvtsXW1s/d3/Dz6qC5we7x59vl4eHn4+Tr5u3x6sDS1Zixu6vEyvn467DHzJy1v+nu6am9xsja3cPW2vf26tnl49Pg4sjZ3KS8xKfAx8DR1LzO1L/S2L/R2ODo47vO0azEy7HHzeDn4sXV1qGzu9vk4bXLz520vvb27Japspattu/w6LvO0unu6Oru5bjK0tTg4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAFAAyAAAI/wCNaBhoyJCRcQIFetIgcOBCLE+eqFDxRJcUFVKwYMEoEctFFSy++GFBkuSkkV++TOLCxRuXL1xcuFCSxYUWmlq0yHSRRSdNJUpkkGrSp4mMTENlLGuSqY8MpzJkoNIhooqIUSJ06LCaVUTWUVuternhZQ8nL5FucLoRKY6XOHtuxI1zA4LdMGjsprNrFw2tMIDzQmggRkwDM4gNVzvcoLFjwtZgSIZRo3INGNegQJFcQ/OqGkcqHMFVoQKb0qhFNzt95AibUlYeuHpgJfaDaMwelHpAmzfvAMCD3wpOnBfxAEOQDBmirtIVJJuUV4KWfNPzK1cSqLmkJoH3BJe+P//r7h1QAkAStkiQQGd9+0fst6iXAF/9gvsLhN0vsuDT/v78FcFfBBEAAQSBBSIIxDkFKgMKKAR2sQgjcnSRRBKLJMFIEnjgMUyFcnDYhRMpkJjCCCmcOIITvYzgooolOgBHFA7QSKMDMsoYRSCB4IjjBHoAOcEPE4gzgZA/EJnkkRM4woACDDwJ5ZQKKOCklK8wAMCWXHbp5ZdghtnlLEJEKYQCdzBQpiwA3AFAlUIIccwdNnRgQ512dmCnM23Y2UafeppSQAyDElrAoYYOiiiiJ6BwQigniIJCKI5WekKjkjbaQgslcFoOpyUM0kIuLQxSwqmc/pJBCKtm4GoIsLL/8moI6LyagQGdGGBJI410YokBwAYbbCzAbmAsNhtQYSw3VARzxhnKQmvsGTTwUC0PblSLCQ/Y0kDDN61gAky2AwywxBLllouuuumuOwAHZRBBRBnwEsFBIYVwoC8H9tJLxAo+BLzCCoi8cUgqPgz8xgoG+4DICgcc0M0Bu0xxgMUWR3yxxqccAMkHdXzwQRqCECPIyJCELHId1KTxgTkIkIHAzJTMPLPMNWcjs8wk2EIBBSQE/fPQP5MADglAk7DD0h407QEfO2yzA9ROI8NH0wIIoEjWWRvDtTZcc60ILBaUPYMFc1gww9pqlz3HNG3PIYkmOdhRNw7S5CAJDjjkX4CDJnzbnQMIa/yxBgggBEE4CH8gHkQQviSuShAmvGBC5Xm8YLkJmVueeTKXhwMGAaSPTkAxpJeueupjkHPBBT28fsEYsY9BO+yxv45BLRhgQAgTTGAQfCK9D++78AEBADs=";
var bg_back_1 = "data:image/gif;base64,R0lGODlhDQB4APQAAPX19fPz8/Hx8e/v7+3t7evr6+np6ebm5uTk5OLi4uDg4N7e3tvb29nZ2dfX19TU1NLS0tDQ0M7OzszMzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAANAHgAAAWE4CSO5CidaIpGbOu2UCzP8mPf+O3sfM83wKAwyCgaj8aFcslcKp7QKDRBrVqriKx2qz14v+CvYUwukwvotDpNaLvf7oF8Tp8L7vg8PsDv+/sAgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en6ChoqOkpaanqKmqq6ytrq+wsaUhADs=";

var font_array = 
[
  "Arial",
  "Times New Roman",
  "Courier New",
  "Georgia",
  "Lucida Console",
  "MS Sans Serif",
  "Verdana",
  "Helvetica",
  "Bookman Old Style"
];

var color_array =
[
	"#FFFFFF", "#A0A0A0", "#909090", "#505050", "#000000", 
	"#FF0000", "#A00000", "#500000", "#990000", "#00FFFF",
	"#00FF00", "#00A000", "#005000", "#FF761A", "#FF00FF",
	"#0000FF", "#0000A0", "#000050", "#CB0202", "#FFFF00"
];


/**************************************************************** 
                      Everything Smilies 
 ****************************************************************/

// TODO: Paged smilies, grouped by size

var smiley_array = 
	[
		[':-)','icon_smile.gif'],
		[':D','icon_biggrin.gif'],
		[':(','icon_sad.gif'],
		[':o','icon_surprised.gif'],
		['8O','icon_eek.gif'],
		[':?','icon_confused.gif'],
		['8)','icon_cool.gif'],
		[':lol:','icon_lol.gif'],
		[':x','icon_mad.gif'],
		[':P','icon_razz.gif'],
		[':oops:','icon_redface.gif'],
		[':cry:','icon_cry.gif'],
		[':evil:','icon_evil.gif'],
		[':twisted:','icon_twisted.gif'],
		[':roll:','icon_rolleyes.gif'],
		[':wink:','icon_wink.gif'],
		[':|','icon_neutral.gif'],
		[':mrgreen:','icon_mrgreen.gif']	
	];

function smileyToImg(str)
{
  for(j=0;j<smiley_array.length;j++)
	{
		if(str==smiley_array[j][0])
		{
			 return("<img src='" + base_smiley_url + smiley_array[j][1] + "'>");
		}
	}
	return str;
}

function imgToSmiley(str)
{
  for(j=0;j<smiley_array.length;j++)
	{
		if(str=="<img src=\"" + base_smiley_url + smiley_array[j][1] + "\">")
		{
			 return(smiley_array[j][0]);
		}
	}
	return str;
}

// Write the smiley into 
function dosmiley(text)
{
  doinsert(text);
  UpdateEditDiv();
}

// Write the smiley into 
function docolor(text)
{
	wraptext("[color=" + text + "]","[/color]");
}

// Write the smiley into 
function dofont(e)
{
	var text = fontSel.options[fontSel.selectedIndex].value;
	wraptext("<font face='" + text + "'>","</font>");
}


function colorSelector()
{
	this.colorDiv = null;

	this.getElement = function()
	{
		return this.colorDiv;
	}

	this.createColor = function(text, color)
	{
		el = document.createElement("td"); 
	  el.border = 1;
	  el.width = 16;
	  el.height = 16;
	  el.bgcolor = color;
		el.style.background = color;
		el.style.background.color = color;
	  el.style.cursor = "pointer";
	  el.align = "center";
	  el.cellPadding = 1;
	  
	  el.addEventListener('click', function(){docolor(color); hideDivs();}, false); 


	  return el;
	}

	this.create = function()
	{
		this.colorDiv = document.createElement("div"); 
		this.colorDiv.id = "colorDiv";
		this.colorDiv.style.border = "1px solid";
		this.colorDiv.style.background.color = "#EEEEEE";
		this.colorDiv.style.display = "none";
		this.colorDiv.style.position = "absolute";
		
		table = document.createElement("table"); 
		table.style.backgroundColor = "#EEEEEE";
		this.colorDiv.insertBefore(table, null);

		for(i=0;i<4;i++)
		{
			row = document.createElement("tr");
			row.border = 1;
		  row.bgcolor="#EEEEEE";
			row.cellPadding = 1;
		
			for(j=0;j < Math.ceil(color_array.length/4);j++)
			{
			  k = (i * Math.ceil(color_array.length/4)) + j;
			  if(color_array[k])
			  {
					colorBox = this.createColor(color_array[k], color_array[k]);
					row.insertBefore(colorBox, null);
				}
			}
			
		  table.insertBefore(row, null);
		}
	}
	
	this.show = function(_x, _y)
	{
		this.colorDiv.style.left = _x + "px";
		this.colorDiv.style.top = _y + "px";
		this.colorDiv.style.display = "inline";
	}
	
	this.hide = function()
	{
		this.colorDiv.style.display = "none";
	}

}

function smileySelector()
{
	this.smileyDiv = null;

	this.getElement = function()
	{
		return this.smileyDiv;
	}

	this.createSmiley = function(text, imgurl)
	{
		el = document.createElement("td"); 
	  el.border = 1;
	  el.width = 20;
	  el.height = 20;
	  el.bgcolor = "#EEEEEE";
	  el.style.cursor = "pointer";
	  el.align = "center";
	  el.cellPadding = 1;
	
		img = document.createElement("img"); 
	  img.src = base_smiley_url + imgurl;
	  img.style.cursor = "pointer";
	  img.addEventListener('click', function(){dosmiley(text);hideDivs();}, false); 
	 
	  el.insertBefore(img, null);
	  
	  return el;
	}

	this.create = function()
	{
		this.smileyDiv = document.createElement("div"); 
		this.smileyDiv.id = "smileyDiv";
		this.smileyDiv.style.border = "1px solid";
		this.smileyDiv.style.background.color = "#EEEEEE";
		this.smileyDiv.style.display = "none";
		this.smileyDiv.style.position = "absolute";
		
		table = document.createElement("table"); 
		table.style.backgroundColor = "#EEEEEE";
		this.smileyDiv.insertBefore(table, null);
		
		for(i=0;i<10;i++)
		{
			row = document.createElement("tr");
			row.border = 1;
		  row.bgcolor="#EEEEEE";
			row.cellPadding = 1;
		
			for(j=0;j < Math.ceil(smiley_array.length/10);j++)
			{
			  k = (i * Math.ceil(smiley_array.length/10)) + j;
			  if(smiley_array[k])
			  {
					smiley = this.createSmiley(smiley_array[k][0], smiley_array[k][1]);
					row.insertBefore(smiley, null);
				}
			}
			
		  table.insertBefore(row, null);
		}
	}
	
	this.show = function(_x, _y)
	{
		this.smileyDiv.style.left = _x + "px";
		this.smileyDiv.style.top = _y + "px";
		this.smileyDiv.style.display = "inline";
	}
	
	this.hide = function()
	{
		this.smileyDiv.style.display = "none";
	}
}

/**************************************************************** 
                     End Of Everything Smilies 
 ****************************************************************/


/**************************************************************** 
                       Text Manupulation 
 ****************************************************************/

function insertHtmlAtCursor(html) {
    //var range, node;
    //if (window.getSelection && window.getSelection().getRangeAt) {
        //range = window.getSelection().getRangeAt(0);
        node = range.createContextualFragment(html);
        range.insertNode(node);
    //} else if (document.selection && document.selection.createRange) {
        //range.pasteHTML(html);
        //document.selection.createRange().pasteHTML(html);
    //}
}

function insertText(text)
{
	var scrollPos = msgtxtarea.scrollTop; 
	iStart = msgtxtarea.selectionStart;
  msgtxtarea.value = msgtxtarea.value.substring(0, iStart) + text + msgtxtarea.value.substring(msgtxtarea.selectionEnd, msgtxtarea.value.length);  
  msgtxtarea.focus();
  msgtxtarea.setSelectionRange(iStart + text.length, iStart + text.length);  
	msgtxtarea.scrollTop = scrollPos;	
}

function doinsert(text)
{
	//if(edit_target==editDiv)
	//{
	//	insertHtmlAtCursor(text)
	//} else if(edit_target==msgtxtarea) 
	//{
		insertText(text)
	//}
}

function getSelection()
{
	//if(edit_target==editDiv)
	//{
		//if (window.getSelection && window.getSelection().getRangeAt) {
	//        node = range.cloneContents();
		//} else if (document.selection && document.selection.createRange) {
		//        document.selection.createRange().pasteHTML(html);
		//}
	//	return node;
	//} else if(edit_target==msgtxtarea) 
	//{
 		return msgtxtarea.value.substring(msgtxtarea.selectionStart, msgtxtarea.selectionEnd);
	//}
}

function wraptext(starttag, endtag)
{
  text = getSelection();
  var val = starttag + text + endtag;
  doinsert(val);
  UpdateEditDiv();
}

function makebold()
{
	/*try
	{
	  editDiv.execCommand("bold", false, null);
	}
	catch(e)
	{
		alert(e)
	}*/

	hideDivs();
	wraptext("[B]","[/B]")
}

function makeitalic()
{
	hideDivs();
	wraptext("[I]","[/I]")
}

function makeunderline()
{
	hideDivs();
	wraptext("[U]","[/U]")
}

function makeurl()
{
	hideDivs();

  var iStart = msgtxtarea.selectionStart;
	sText =  msgtxtarea.value.substring(iStart, msgtxtarea.selectionEnd);
  var thisURL = prompt("Enter the URL of the link you want to add.", "http://");
  if(thisURL==null) return;

  var thisTitle = prompt("Enter the text inside the link", sText);
  if(thisTitle==null) return;
  val = "[URL="+thisURL+"]"+thisTitle+"[/URL]";
	
  doinsert(val);

  UpdateEditDiv();
}


function makeimg()
{
	hideDivs();

  var iStart = msgtxtarea.selectionStart;
  var thisURL = prompt("Enter the URL of the image you want to add.", "http://");
  if(thisURL==null) return;
  var val = "[IMG]" + thisURL + "[/IMG]";

  doinsert(val);
  UpdateEditDiv();
}



/******************************************************************************
                                    toolbar Class
 ******************************************************************************/

function peyups_toolbar()
{
  this.table = null;
  this.row = null;
      
  this.create = function(w)
  {
		this.table = document.createElement("table");
		this.table.cellPadding = 2;
		this.table.cellSpacing = 0;
		this.table.width = w;

		this.row = document.createElement("tr");
		this.row.cellPadding = 0;
		this.table.insertBefore(this.row, null);
  }
  
	this.getElement = function()
	{
		return this.table;
	}
	
	this.addButton = function(obj, action)
	{
		el = document.createElement("td"); 
	  el.width = 20;
	  el.height = 20;
	  //el.style.border = "1px solid";
	  el.style.cursor = "pointer";
	  el.style.backgroundImage = "url(" + bg_metal2_img_data + ")";
	  el.align = "center";

		if (typeof(obj) == 'object')
		{
			a = document.createElement("a"); 
			a.href = "javascript:void(0);";
			a.border = 0;
		  a.insertBefore(obj, null);
		  el.insertBefore(a, null);
			if(action!=null)
		    a.addEventListener('click', action, false); 
		} else {
			a = document.createElement("a"); 
			a.href = "#";
	    a.innerHTML = obj;
		  el.insertBefore(a, null);
			if(action!=null)
		    a.addEventListener('click', action, false); 
		}

		this.row.insertBefore(el, null);
	}

	
}

/******************************************************************************
                               end of toolbar Class
 ******************************************************************************/

function UpdateEditDiv()
{
	var text = msgtxtarea.value;
	text = text.replace(/\[B\]/ig,"<b>");
	text = text.replace(/\[\/B\]/ig,"</b>");
	text = text.replace(/\[I\]/ig,"<i>");
	text = text.replace(/\[\/I\]/ig,"</i>");
	text = text.replace(/\[U\]/ig,"<u>");
	text = text.replace(/\[\/U\]/ig,"</u>");
	text = text.replace(/\n/g,"<br/>");
	text = text.replace(/\[center\]/ig,"<center>");
	text = text.replace(/\[\/center\]/ig,"</center>");

	text = text.replace(/\[URL=([^\]]*)\]/ig,"<a href='$1'>");
	text = text.replace(/\[\/URL\]/ig,"</a>");
	text = text.replace(/\[IMG\]([^\[]*)\[\/IMG\]/ig,"<img src='$1'>");
	text = text.replace(/(:\w*:)/ig, smileyToImg);
	text = text.replace(/(:.)/ig, smileyToImg);
	text = text.replace(":-)", smileyToImg(":-)"));
	text = text.replace(/(8.)/ig, smileyToImg);

/*
	text = text.replace(/\[QUOTE\]/ig,"<table align=\"CENTER\" border=\"0\" width=\"85%\"><tbody><tr><td><img src=\"grafix/bdivider.gif\" height=\"1\" width=\"100%\">");
	text = text.replace(/\[\/QUOTE\]/ig,"<img src=\"grafix/bdivider.gif\" height=\"1\" width=\"100%\"></td></tr></tbody></table>");
*/
	
	editDiv.innerHTML = text;
}

function UpdateTextArea()
{
	var text = editDiv.innerHTML;
	text = text.replace(/\n/ig,"");
	text = text.replace(/<B\>/ig,"[b]");
	text = text.replace(/<\/B\>/ig,"[/b]");
	text = text.replace(/\<I\>/ig,"[i]");
	text = text.replace(/\<\/I\>/ig,"[/i]");
	text = text.replace(/\<U\>/ig,"[u]");
	text = text.replace(/\<\/U\>/ig,"[/u]");
	text = text.replace(/<BR[^>]*>/ig,"\n");
	text = text.replace(/<center\>/ig,"[center]");
	text = text.replace(/<\/center\>/ig,"[/center]");

	text = text.replace(/<A href=\'([^\']*)\'[^>]*>/ig,"[url=$1]");
	text = text.replace(/<A href=\"([^\"]*)\"[^>]*>/ig,"[url=$1]");

	text = text.replace(/<\/A>/ig,"[/url]");

/*	text = text.replace("<table align=\"CENTER\" border=\"0\" width=\"85%\"><tbody><tr><td><img src=\"grafix/bdivider.gif\" height=\"1\" width=\"100%\">","[quote]");
	text = text.replace("<img src=\"grafix/bdivider.gif\" height=\"1\" width=\"100%\"></td></tr></tbody></table>","[/quote]");
*/

	text = text.replace(/<IMG src=\'([^\']*)\'[^>]*>/ig, imgToSmiley);
	text = text.replace(/<IMG src=\"([^\"]*)\"[^>]*>/ig, imgToSmiley);

	text = text.replace(/<IMG src=\'([^\']*)\'[^>]*>/ig,"[img]$1[/img]");
	text = text.replace(/<IMG src=\"([^\"]*)\"[^>]*>/ig,"[img]$1[/img]");
	text = text.replace(/<!-- BBCode \w* -->/ig,"");

	msgtxtarea.value = text;
}

function nodeToString(node)
{
	var nodestr = "";
	for(i=0;i<node.children;i++)
	{
		nodestr += "<" + node.nodeName;
		nodestr += ">";
		nodestr += nodeToString(node.child[i]);
		nodestr += "</" + node.nodeName + ">";
	}
	return nodestr;
}

function getCursorPos() {
		range = window.getSelection();
}

function createImgButton(urldata, alttext)
{
		imgbtn = document.createElement("img"); 
		imgbtn.src = urldata;
		imgbtn.alt = alttext;
		imgbtn.border = "0px";
		imgbtn.style.cursor = "pointer";
		return imgbtn;
}

function setEditorToDiv()
{
	edit_target = editDiv;
}

function setEditorToTextArea()
{
	edit_target = msgtxtarea;
}

/* OKAY, LET'S GET STARTED */

msgtxtarea = document.getElementById("post_content");

if(msgtxtarea)
{
	
	try
	{
		/* Create Editable DIV */
		editDiv = document.createElement("div");
		editDiv.id = "EditDiv";
		editDiv.style.width = "100%";
		editDiv.style.height = "200px";
	  editDiv.style.overflow = "scroll";
		editDiv.style.border = "1px solid #000000;";
		editDiv.style.background = "#FFFFFF;";

		/* Editable DIV event handlers */
		editDiv.addEventListener('keyup', UpdateTextArea, true);
		editDiv.addEventListener('mouseup', UpdateTextArea, true);

		editDiv.addEventListener('keyup', getCursorPos, true);
		editDiv.addEventListener('mouseup', getCursorPos, true);

		var mySmileySelector = new smileySelector();
		mySmileySelector.create();

		var myColorSelector = new colorSelector();
		myColorSelector.create();


		/* Create toolbar */		
		var myToolBar = new peyups_toolbar();		
		myToolBar.create("200px"); 
		//myToolBar.create("360px"); // with font selector
		
		
		/* Create toolbar buttons */		
		myToolBar.addButton(createImgButton(bold_img_data, "Bold"), makebold);
		myToolBar.addButton(createImgButton(ital_img_data, "Italic"), makeitalic);
		myToolBar.addButton(createImgButton(undl_img_data, "Underline"), makeunderline);
		myToolBar.addButton(createImgButton(url_img_data, "Insert link"), makeurl);
		myToolBar.addButton(createImgButton(img_img_data, "Insert image"), makeimg);
		myToolBar.addButton(createImgButton(base_smiley_url + "icon_smile.gif", "Insert smiley"), showSmileys);

		colorbtn = document.createElement("td"); 
		colorbtn.bgcolor = "#FFEEAA";
		colorbtn.style.width = "20px";
		colorbtn.style.height = "20px";

		img = document.createElement("img"); 
	  img.src = font_color_img_data;
	  img.border = "0px";
	  img.style.cursor = "pointer";
	  colorbtn.insertBefore(img, null);
		
		myToolBar.addButton(colorbtn, showColors);

/*
		fontSel = document.createElement("select"); 
		
		for(i=0;i<font_array.length;i++)
		{
			fontOpt = document.createElement("option"); 
			fontOpt.text = font_array[i];
			fontOpt.value = font_array[i];
			fontSel.insertBefore(fontOpt, null);
		}
		
		fontSel.addEventListener('change', dofont, false);
	
		myToolBar.addButton(fontSel, null);
*/
		
		/* Add stuff to DOM */
		msgtxtarea.parentNode.insertBefore(editDiv, msgtxtarea);
		msgtxtarea.parentNode.insertBefore(myToolBar.getElement(), msgtxtarea);
		msgtxtarea.parentNode.insertBefore(mySmileySelector.getElement(), msgtxtarea);
		msgtxtarea.parentNode.insertBefore(myColorSelector.getElement(), msgtxtarea);

		// Event handlers
		msgtxtarea.addEventListener('mousedown', hideDivs, false);
		msgtxtarea.addEventListener('keyup', UpdateEditDiv, false);
		
		//edit_target = msgtxtarea;

		/* Refresh the Editable Div with current content */
		UpdateEditDiv();

	} catch (e)
	{
		alert(e);
	}
}

function hideDivs()
{
	hideSmileys();
	hideColors();
}

function hideSmileys()
{
	mySmileySelector.hide();
}

function showSmileys(e)
{
	hideDivs();
	mySmileySelector.show(e.pageX - 90,e.pageY - 140);
}

function hideColors()
{
	myColorSelector.hide();
}

function showColors(e)
{
	hideDivs();
	myColorSelector.show(e.pageX - 90,e.pageY - 140);
}

