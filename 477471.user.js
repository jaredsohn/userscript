// ==UserScript==
// @name        Resize_to_left
// @namespace   Resize_to_left
// @include     *youtube.com*
// @include     *apis.google.com/u/0/wm/4/_/widget/render/comments?*
// @version     1.3
// ==/UserScript==

function change_size(){
	player_api = document.getElementById('player-api');
	player_api.setAttribute('style','width:'+document.getElementById('largeur').value+';height:'+document.getElementById('hauteur').value+';');
	
	player = document.getElementById('player');
	player.style.width = document.getElementById('largeur').value+'px';
	player.style.height = document.getElementById('hauteur').value+'px';
	
	movie_player = document.getElementById('movie_player');
	movie_player.setAttribute('width',document.getElementById('largeur').value);
	movie_player.setAttribute('height',document.getElementById('hauteur').value);
	GM_setValue('largeur_value',document.getElementById('largeur').value);
	GM_setValue('heuteur_value',document.getElementById('hauteur').value);
	console.log('size changed');
}
function to_the_left(){
	if(document.getElementById('to_the_left').checked){
		document.getElementById('content').style.marginLeft = '0px';
		document.getElementById('player').style.marginLeft = '0px';
		GM_setValue('to_the_left_checked',true);
	}else{
		document.getElementById('content').style.marginLeft = 'auto';
		document.getElementById('player').style.marginLeft = 'auto';
		GM_setValue('to_the_left_checked',false);
	}
}

style = document.createElement('style');
style.setAttribute('id','Resize_to_left_style');
document.body.appendChild(style);
document.getElementById('Resize_to_left_style').innerHTML =

'.guide-item .guide-count'+
'{'+
			'color:#000000'+
'}'+

'body'+
',#appbar-guide-button'+
',#content'+
'{'+
			'background-color:#808080'+
'}'+

'#appbar-guide-button'+
'{'+
			'background-color:#888888'+
'}'+

'.commenthub .tab'+
'{'+
			'background-color:#a0a0a0;'+
'}'+

'#appbar-guide-menu'+
',#baseDiv'+
',#masthead-appbar'+
',#masthead-expanded-container'+
',#footer-container'+
',#non-appbar-vm-video-actions-bar, #non-appbar-vm-video-actions-bar .vm-video-actions-bar'+
',#resize_to_left_div'+
',#vm-pagination'+
',#watch7-content'+
',#watch7-headline'+
',#watch7-sidebar'+
',#watch7-user-header'+
',#yt-admin-content'+
',#yt-masthead-container'+
',.ab-midpane'+
',.account-container'+
',.BJa'+
',.branded-page-box yt-card'+
',.channel-header .secondary-header-contents'+
',.DJa'+
',.exp-css-ellipsis .yt-ui-ellipsis'+
',.GK5ROLOBBJB'+
',.GK5ROLOBEFB'+
',.gssb_m'+
',.guide-flyout'+
',.hh #yt-admin-content'+
',.mj'+
',.site-center-aligned #footer-container'+
',.site-center-aligned .watch-card-rhs'+
',.site-center-aligned .yt-card'+
',.yJa'+
',.yt-card'+
',.yt-uix-button-menu'+
'{'+
			'background-color:#B0B0B0;'+
'}'+

'.Mb'+
'{'+
			'background:#B0B0B0;'+
'}'+

'#footer-container'+
',#hauteur'+
',#largeur'+
',#masthead-search-terms input'+
',.e4'+
',.E5'+
',.g-h-f-vc-B'+
',.yt-uix-form-input-fluid .yt-uix-form-input-text, .yt-uix-form-input-fluid .yt-uix-form-input-textarea'+
'{'+
			'background-color:#DDDDDD;'+
'}'+

'#comment-settings .comment-settings-header'+
',#watch7-action-panels #watch7-action-panel-footer'+
',.commenthub .tab.active'+
',.metadata-inline'+
',.track-list li.track, .stick-wings div'+
'{'+
			'background-color:#e0e0e0;'+
'}'+

'.howto-promo-container'+
'{'+
			'background-image:linear-gradient(to top, #d0cdd0 0px, #f0f0f0 15px);'+
'}'+

'#masthead-search-terms'+
'{'+
			'border:0px;'+
'}'+

'#watch7-action-buttons'+
',#watch7-action-panels'+
',#watch-discussion'+
',#watch7-headline'+
',#watch7-user-header'+
'{'+
			'border:1px solid #777777;'+
'}'+

'.Jea'+
',.Mga'+
'{'+
			'border:6px solid #DDDDDD;'+
			'border-bottom-color:rgba(0, 0, 0, 0);'+
			'border-left-color:rgba(0, 0, 0, 0);'+
'}'+

'#watch7-main'+
',#watch7-sidebar'+
',.comments-iframe-container'+
',.yJa'+
'{'+
			'margin:0px;'+
'}'+

'.site-center-aligned #player, .site-center-aligned #player.watch-large, .site-center-aligned #player.watch-medium, .site-center-aligned #player.watch-medium-540, #player'+
'{'+
			'margin-top:0px;'+
			'margin-bottom:0px;'+
'}'+

'#watch7-sidebar-contents'+
'{'+
			'margin-top:10px;'+
			'margin-bottom:10px;'+
			'margin-left:5px;'+
			'margin-right:5px;'+
'}'+

'#watch-discussion'+
'{'+
			'padding:5px;'+
'}'+

'#content'+
'{'+
			'max-width:auto;'+
'}'+

'#watch-discussion .comments-iframe-container'+
'{'+
			'max-width:10000px;'+
'}'+

'#widget_bounds'+
'{'+
			'width:auto;'+
'}'+

'#comments-test-iframe iframe'+
'{'+
			'width:633px;'+
'}'+

'.searchfield input'+
'{'+
			'width:400px;'+
'}'+

'#watch7-content'+
',#watch7-sidebar'+
'{'+
			'float:left;'+
'}'+

'.site-center-aligned .yt-card'+
'{'+
			'box-shadow:0 0px 0px rgba(0, 0, 0, 0);'+
'}'+
'';

window.addEventListener ("load", mon_main, false);
function mon_main()
{
	console.log('Start Resize_to_left');
	setTimeout(
		function()
		{
			if(window.location.href.indexOf("youtube.com/watch?v=")!=-1)
			{
				document.getElementById('player').style = '';
				document.getElementById('watch-discussion').firstChild.style = "";
				inter = setInterval(
					function()
					{
						if(document.getElementById('comments-test-iframe').firstChild.style.width != "633px"){
							document.getElementById('comments-test-iframe').firstChild.style.width = "633px";
							console.log('interval');
						}else{
							clearInterval(inter);
							console.log('interval cleared');
						}
					}
					,1000
				)
				
				player_api = document.getElementById('player-api');
				player_api.setAttribute('class','off-screen-target');

				div = document.createElement("div");
				div.setAttribute('id','resize_to_left_div');
				div.innerHTML = 
				"Width:<input type='number' id='largeur' size='4' value='640' >"+
				"Height:<input type='number' id='hauteur' size='4' value='390' >"+
				" <input type='checkbox' id='to_the_left' > To the left ?";

				contenu = document.getElementById('watch7-content');
				contenu.insertBefore(div,contenu.childNodes[0]);
				document.getElementById('largeur').value=(GM_getValue('largeur_value')== undefined)?640:GM_getValue('largeur_value');
				document.getElementById('hauteur').value=(GM_getValue('heuteur_value')== undefined)?390:GM_getValue('heuteur_value');
				
				document.getElementById('to_the_left').checked=GM_getValue('to_the_left_checked');
				to_the_left();
				
				player_api.setAttribute('style','width:'+document.getElementById('largeur').value+';height:'+document.getElementById('hauteur').value+';');

				movie_player = document.getElementById('movie_player');
				movie_player.setAttribute('width',document.getElementById('largeur').value);
				movie_player.setAttribute('height',document.getElementById('hauteur').value);
				
				document.getElementById('largeur').addEventListener('change', change_size, false);
				document.getElementById('hauteur').addEventListener('change', change_size, false);
				document.getElementById('to_the_left').addEventListener('change', to_the_left, false);
				change_size();
			}
			else
			{
				inter = setInterval(
					function()
					{
						document.getElementById('widget_bounds').style = "";
					}
					,1000
				)
			}
			
		}
		,300
	)
}
