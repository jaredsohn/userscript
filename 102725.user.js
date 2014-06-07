// ==UserScript==
// @name           Youtube Details
// @author         Onofrei Iulian http://revolt666.deviantart.com
// @namespace      http://userscripts.org/users/revolt
// @description    Moves the like/dislike/share bar and the description section to the right of the video
// @version        4
// @require        http://sizzlemctwizzle.com/updater.php?id=102725&days=1
// @include        *://www.youtube.com/watch?*
// @include        *://www.youtube.com/all_comments?*
// @include        *://www.youtube.com/user/*
// ==/UserScript==

document.body.addEventListener( "click" , _Comments , false );
_Move();

function _Move()
{
	var
		width = window.innerWidth ,
		height = window.innerHeight ,

		//finds details and sidebar
		actions = document.getElementById( "watch-actions" ) ,
		actions_container = document.getElementById( "watch-actions-area-container" ) ,
		details = document.getElementById( "watch-info" ) ,
		sidebar = document.getElementById( "watch-sidebar" ) ,
		player = document.getElementById( "watch-player" ) ,
		player_user = document.getElementById( "playnav-player" );

	if( window.location.href.indexOf( "user" ) == -1 )
	{
		player.style.zIndex  = "200";
		player.style.border = "1px solid #AAA";
	}
	else
	{
		player_user.style.zIndex  = "200";
		player_user.style.border = "1px solid #AAA";
	}

	//adds overlay div
	var light = document.createElement( "div" );
	light.style.cssText =
		"position: fixed;" +
		"width: 100%;" +
		"height: 100%;" +
		"background-color: #000;" +
		"visibility: hidden;" +
		"z-index: 100;";
	light.addEventListener( "mousedown" , function( event )
		{
			if( event.preventDefault )
			{
				event.preventDefault();
			}
		} , false );

	document.body.insertBefore( light , document.body.firstChild );

	//adds light bulb image button
	var button = document.createElement( "img" );
	button.src = "data:image/png;base64,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";
	button.style.cssText =
		"position: fixed;" +
		"width: 32px;" +
		"height: 32px;" +
		"top: 10px;" +
		"left: 10px;" +
		"opacity: 0.4;" +
		"cursor: pointer;" +
		"z-index: 200";
	button.addEventListener( "mouseover" , function()
		{
			button.style.opacity = "1";
		} , false );
	button.addEventListener( "mouseout" , function()
		{
			button.style.opacity = "0.4";
		} , false );
	button.addEventListener( "click" , function()
		{
			if( light.style.visibility == "hidden" )
			{
				light.style.visibility = "visible";
				//player.style.border = "1px solid #AAA";
			}
			else
			{
				light.style.visibility = "hidden";
				//player.style.border = "0px";
			}
		} , false );

	document.body.insertBefore( button , document.body.firstChild.nextSibling );

	if( sidebar != null )
	{
		//sets the sitebar width and height
		//sidebar.setAttribute("style","position:absolute;margin-left:650px;width:500px;height:" + eval(height - 120) + "px;overflow-y:scroll;");
		var style = "position: fixed !important;" +
					"margin-left: " + eval( width - 720 ) + "px !important;" +
					"width: 500px !important;" +
					"height: " + eval( height - 120 ) + "px !important;" +
					"overflow-y: scroll !important;";
		sidebar.setAttribute( "style" , style );

		//removes tags section
		var extras = document.getElementById( "watch-description-extras" );
		extras.parentNode.removeChild( extras );

		//wraps ratings section
		var div = document.createElement( "div" );
		var element = document.getElementById( "watch-description-extra-info" );
		var element_clone = element.cloneNode( true );
		div.appendChild( element_clone );
		element.parentNode.removeChild( element );
		element_clone.removeAttribute( "id" );
		details.insertBefore( div , details.firstChild );

		//clones the details section
		var actions_clone = actions.cloneNode( true );
		actions_clone.setAttribute( "style" , "width: 480px;" );
		var actions_container_clone = actions_container.cloneNode(true);
		actions_container_clone.setAttribute("style","width: 480px !important;");
		var details_clone = details.cloneNode( true );
		details_clone.childNodes[2].className = "watch-expander yt-uix-expander yt-uix-expander-expanded";

		//moves the details section
		sidebar.insertBefore( details_clone , sidebar.childNodes[0] );
		sidebar.insertBefore( actions_container_clone , sidebar.childNodes[0] );
		sidebar.insertBefore( actions_clone , sidebar.childNodes[0] );

		//removes the details section
		details.parentNode.removeChild( details );
		actions_container.parentNode.removeChild( actions_container );
		actions.parentNode.removeChild( actions );

		//updates the video thumbs
		var i;
		var spans = document.getElementsByTagName( "span" );

		for( i = 0 ; i <= spans.length - 1 ; i++ )
		{
			if( spans[i].className == "clip" && spans[i].parentNode.parentNode.className == "ux-thumb-wrap  contains_addto" )
			{
				var thumb = spans[i].firstChild;
				var src = thumb.getAttribute( "data-thumb" );
				thumb.src = src;
			}
		}
	}

	_Comments();
}

function _Comments()
{
	var comms = document.getElementsByTagName( "span" );

	for( i = 0 ; i <= comms.length - 1 ; i++ )
	{
		if( comms[i].className == "comments-rating-positive" && comms[i].id != "comments_id" )
		{
			comms[i].id = "comments_id";

			//searches for the votes
			var up = comms[i].getAttribute( "title" ).split( ", " )[0].split( " " )[0];
			var down = comms[i].getAttribute( "title" ).split( ", " )[1].split( " " )[0];

			if( down != "0" )
			{
				//creates the down votes span
				var down_span = document.createElement( "span" );
				down_span.setAttribute( "style" , "color: red !important;" );
				down_span.textContent = down + " down";

				var comma = document.createElement( "span" );
				comma.setAttribute( "style" , "color: black !important;" );
				comma.textContent = " , ";

				comms[i].textContent = up + " up";

				//appends the votes
				comms[i].appendChild( comma );
				comms[i].appendChild( down_span );
			}
			else
			{
				comms[i].textContent = up + " up";
			}
		}
	}
}