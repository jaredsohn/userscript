// ==UserScript==
// @name           PHPBB3 - Fast Post Delete
// @namespace      Roi-Henok.com
// @include        http://www.roi-heenok.com/forum/*
// @author         Sebondus
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$('li.delete-icon a').each(function(i)
	{
		$(this).click(function(e) {
			$.get(	
					$(this).attr("href"),
					{},
					function(data)
					{
						var url_delete = data.match(/form id=\"confirm\" action=\"(.*?)\" method=\"post/).pop();
						url_delete= url_delete.replace(/\&amp;/g,'&');
						
						var p = data.match(/name=\"p\" value=\"(.*?)\"/).pop();
						var f = data.match(/ name=\"f\" value=\"(.*?)\"/).pop();						
						var user_id = data.match(/name=\"user_id\" value=\"(.*?)\"/).pop();
						var sess = data.match(/name=\"sess\" value=\"(.*?)\"/).pop();
						var sid = data.match(/name=\"sid\" value=\"(.*?)\"/).pop();
						var confirm = 'Oui';						
						var mode = 'delete';
						
						$.post(	url_delete,
								{
									p:p,
									f:f,
									mode:mode,
									user_id:user_id,
									sess:sess,
									sid:sid,
									confirm:confirm
								},
								function(data)
								{
									$('#p'+p).hide('slow');								    
								}
						);
					}
			);
			return false;
	    });
	}
);