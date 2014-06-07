// ==UserScript==
// @name           	IPB3 Top button
// @namespace      http://www.invisionmodding.com
// @description    	Brings back the top button in IPB3
// @include        	*
// ==/UserScript==

(function(unsafeWindow) 
{

	if( ( ipb	= unsafeWindow['window'].ipb ) !== false )
	{
		if ( unsafeWindow['Object'].isUndefined( ipb.topic ) == false )
		{
			if( ( unsafeWindow['Object'].isUndefined( ipb.topic.inSection ) == false ) && ipb.topic.inSection == 'topicview' )
			{
				Effect 	= unsafeWindow['Effect'];
				Element	= unsafeWindow['Element'];
				$$ 		= unsafeWindow['window'].$$; 
			
				var items = $$( '.post_controls' );
			
				if( items.length )
				{
					items.each( function(s) 
								{
									// Create IMG element
									var img = Element( 'img', { 'src' : ipb.vars['loading_img'].replace( 'loading.gif', '' ) + 'bullet_green.png' } );
			
									// Create the "link"
									var link = Element( 'a', { 'style' : 'cursor: pointer' } );
										link.insert( img );
										link.insert( 'Top' );
			
									// Create the button
									var button = Element('li', { 'className' : 'report' });
										button.insert( link );
			
										// Onclick event
										link.observe('click', 	function(event) 
																{
																	Effect.ScrollTo( 'ipboard_body', { duration: 0.3 } );
																}, 
													false );
			
									s.insert( button );
								}
							);
				}
			}
		}
	}
})(this.unsafeWindow || window);