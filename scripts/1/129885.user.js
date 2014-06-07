// ==UserScript==
// @name           Nordea kontoutdrag
// @namespace      arneball.com
// @include        *nordea.se*
// ==/UserScript==

// Parametrar
var firstRow=2;
var datumCol=1;
var transaktCol=2;
var categoryCol=3;
var ammountCol=4;
var headerRow=1;
var element;
var tbody;
var rader;

function mean(konto)
{
    resetTable();
	if (konto!="")
	{
		var regex= new RegExp("\w*"+konto+"\w*","i");

			var summa=0;
			for (var i=firstRow; i<rader.length; i++)
			{
				var celler = rader[i].getElementsByTagName("td");
				var linkCell=celler[transaktCol].getElementsByTagName("a")[0];
				var cpCell=celler[categoryCol]/*.getElementsByTagName("a")[0]*/;
				var horCell = celler[datumCol];
				
				if (!(cpCell.innerHTML.trim().match(regex)) && !(linkCell && linkCell.innerHTML.trim().match(regex)) && !(horCell.innerHTML.trim().match(regex)))
					rader[i].style.visibility="collapse";
				/*if (!linkCell)
					rader[i].style.visibility="collapse";
				else if ((linkCell && !(linkCell.innerHTML.trim().match(regex)) )
					linkCell.parentNode.parentNode.style.visibility="collapse";	
				*/
				else
				{
				//	alert(horCell.innerHTML.trim().match(regex));
					summa+=(parseFloat(celler[ammountCol].innerHTML.trim().replace(".","").replace(",",".")));		
				}
			}
			
		rader[headerRow].getElementsByTagName("th")[ammountCol].innerHTML="Summa: "+Math.round(summa);
		
	}	
}

function init()
{
	// Init variabler
	element = document.evaluate(
	"/html/body/table/tbody/tr[2]/td[3]/div[3]/form/table/tbody",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
	);

	if (element.snapshotItem(0))
	{
		tbody= element.snapshotItem(0);
		rader= tbody.getElementsByTagName("tr");
	}

	// init HEADER
	var header= document.evaluate(
	"/html/body/table/tbody/tr[2]/td[3]/div[3]/form/table/tbody/tr/td",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
	);
	var button= document.createElement('input');
		button.setAttribute("class","button");
		button.setAttribute("type","button");
		button.setAttribute("name","buttonReset");
		button.setAttribute("value","Återställ");
		button.addEventListener("click",  function(){document.getElementById("mustarfield").value="Sök post";resetTable();},false);

	var field= document.createElement('input');
	field.setAttribute("type","text");
	field.setAttribute("id","mustarfield");
	field.setAttribute("name","trust");
	field.setAttribute("value","Sök post");
	field.style.background="#E5EAEF";
	field.addEventListener("mouseover", function(){ if (field.value=="Sök post") field.value="";},false);
	field.addEventListener("keyup", function(){musta(field.value);},false);


	header.snapshotItem(0).appendChild(field);
	header.snapshotItem(0).appendChild(button);
	//SLUT HEADER

    var  links= document.evaluate(
	"//form[@id='accountTransactionsRowForm']/table/tbody/tr/td/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
	);

    //Transaktionslänkar
	for (var i=0; i<links.snapshotLength; i++)
	{
	    var kuk = links.snapshotItem(i);
	    if (kuk.innerHTML!="Alla" && kuk.innerHTML!="Inga")
		{
			kuk.setAttribute("href","javascript:scroll(0,0)");
			kuk.addEventListener("click", function(k)
			{
				return function()
					{
						musta(k);
					}
				}(kuk.innerHTML)
			,false);

		}
		else if (kuk.innerHTML=="Alla")
		{
			kuk.removeAttribute("href");
			kuk.addEventListener("click",checkers,false);
		}

    }

    //Kategorilänkar
    for (var i=firstRow;i<rader.length;i++)
    {
        var catCell= rader[i].getElementsByTagName("td")[categoryCol];
        if (catCell.innerHTML.trim()!="&nbsp;")
        {
            
            var link= document.createElement("a");
                link.setAttribute("href","javascript:scroll(0,0)");
                link.innerHTML=catCell.innerHTML;
            catCell.innerHTML="";
            link.addEventListener("click",function(k)
            {
                return function()
                {
                    musta(k)
                }
            }(link.innerHTML.trim()),false);

            catCell.appendChild(link);
        }


    }
}

function checkers()
{
	for (var i=firstRow; i<rader.length;i++)
	{
		if(rader[i].style.visibility!="collapse")
		{
			rader[i].getElementsByTagName("td")[0].getElementsByTagName("input")[0].checked=1;
		}
	}
}

function resetTable()
{
	for (var i=0; i<rader.length;i++)
	{
		rader[i].style.visibility="";
	}
	rader[1].getElementsByTagName("th")[4].innerHTML="Belopp";
}

function musta(target)
{
    mean(target);
}

init();