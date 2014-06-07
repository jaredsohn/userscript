// ==UserScript== 
// @name Tag Colorizer
// @description Colorizes tags! 
// @author Laserbomb 
// @include http://boards.endoftheinter.net/topics/* 
// @include https://boards.endoftheinter.net/topics/* 
// ==/UserScript== 

// ARGS
// ARGS
// ARGS


var tags=new Array();

var colors=new Array();
var rowColors = new Array();

// the default color that will be applied to all tags.
var defaultColor='#8888DD';

// pushes the tags next to the topic if set to true.
var pushLeft = true ;

// Add the tags here.
// tags = search tag
// colors = text color
// rowColors = background color
// to use no special color for a tag, specify 'NONE'.
// Obviously, a table row can't be two colors at once. So,
// the tags lower down on the list will get precedence in which
// background color gets chosen.

//Examples:
//tags.push('NWS'); colors.push('#FF0000'); rowColors.push('NONE');
//tags.push('NLS'); colors.push('NONE'); rowColors.push('#8888DD');


// END ARGS
// END ARGS
// END ARGS

// Script starts here

var trs =document.getElementsByTagName("tr");
for (var i=0; i<trs.length; i++)
{
	var elem = trs[i];
	//alert(elem.innerHTML);
	if(elem.innerHTML.indexOf('<td class="oh">') == 0)
	{
		//it's a forum row.
		//alert("okay!");
		var tableColor = "NONE";
		var frdivs = elem.getElementsByClassName('fr');
		var frdiv = null;
		if(frdivs.length==1)
		{
			frdiv = frdivs[0];
			//alert(frdiv.innerHTML);
			var hrefs = frdiv.getElementsByTagName('a');
			for(var j=0; j<hrefs.length; j++)
			{
				var thisref = hrefs[j];
				//alert(thisref.innerHTML);
				var useColor = defaultColor;
				for(var k=0; k<tags.length; k++)
				{
					if(tags[k]==thisref.innerHTML)
					{
						useColor = colors[k];
						if(rowColors[k]!="NONE")
						{
							tableColor = rowColors[k];
						}
					}
				}
				if(useColor != 'NONE')
				{
					thisref.style.color = useColor;
				}
				
			}
		}

		if( frdiv != null && pushLeft )
		{
			//we wanna move the tags left!
			var fldivs = elem.getElementsByClassName('fl');
			var fldiv = null;
			if( fldivs.length == 1)
			{
				fldiv = fldivs[0];
				fldiv.innerHTML = fldiv.innerHTML + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + frdiv.innerHTML;
				frdiv.innerHTML = "";
			}
		}

		//now on to the color, if necessary.
		if(tableColor != "NONE")
		{
			var reps = elem.getElementsByTagName("td");
			for( var j=0; j< reps.length; j++)
			{
				reps[j].style.backgroundColor = tableColor;
			}
		}
		//alert(elem.innerHTML);

	} 
}