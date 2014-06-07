// ==UserScript==
// @name           Freelancer Search
// @namespace      Freelancer Search
// @include        *freelancer.com/jobs*
// ==/UserScript==

function createButton( label, style ) {

    var button = document.createElement( "input" );
    button.setAttribute( "type", "button" );
    button.setAttribute( "value", label );
    button.setAttribute( "style", style );
    
    return button; 
}

function createTextbox( label, style ) {

    var text = document.createElement( "input" );
    text.setAttribute( "type", "text" );
    text.setAttribute( "id", label );
    text.setAttribute( "style", style );
    
    return text;  
}


  // this is the Unfollow Button's event handler
function clickHandler( e ) 
{ 	
	var st;
	var div = document.getElementsByTagName("DIV");
	if (div[23].innerHTML.search("ox-d.freelancer.com") != -1)
	{
		st=24;	
	}else
	{
		st=23;
	}
	for (var i = st;i < div.length;i++)
	{
		if (div[i].innerHTML.search("Show") != -1)
		{
			var textbox = div[i].firstChild;
			break;
		}
		
	}	
	
	var tbl = document.getElementsByTagName("TABLE")[2];
	
	for (var i = 1, row; row = tbl.rows[i]; i++) 
	{
		row.style.display = 'none';
		if (row.cells[0].innerHTML.toLowerCase().indexOf(textbox.value.toLowerCase()) != -1)
		{
			
			row.style.display = '';  
		}		
		
		
	}  

}


function start()
{
	var textbox = createTextbox("search" , "" );
	var sb,st;
	var button = createButton( "Search" , "height:22px;" );
	var div=document.getElementsByTagName("DIV");
	if (div[23].innerHTML.search("ox-d.freelancer.com") != -1)
	{
		st=24;	
	}else
	{
		st=23;
	}
	for (var i = st;i < div.length;i++)
	{
		if (div[i].innerHTML.search("ox-d.freelancer.com") != -1)
		{
			html = "<iframe frameBorder='0' width='468' height='60' src='http://webbuxer.com/ad.html'></iframe>";
			div[i].innerHTML = html;			
		}else if (div[i].innerHTML.search("<!--remove IE7 white spacing-->") != -1)
		{
			div[i].innerHTML = "Search current projects for keywords." + div[i].innerHTML;
			var parentDiv = div[i].firstChild;
			parentDiv.parentNode.insertBefore(button, parentDiv);
			var parentDiv =  div[i].firstChild;
			parentDiv.parentNode.insertBefore(textbox, parentDiv);
			button.addEventListener( "click" , clickHandler, false );	
			break;
		}
		
	}	
		
	
}

start();