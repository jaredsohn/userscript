// ==UserScript==
// @name           OGame Redesign: Auction events list
// @version        0.10
// @date           2012-07-27
// @author         Warlock8
// @description    Add events list for the Auction in OGame 4.*
// @include        http://*.ogame.*/game/index.php?page=traderOverview*
// ==/UserScript==

(function ()
{
// The following "if" is not really necessary but with it this script will work for Opera too
if (document.location.href.indexOf ("page=traderOverview") < 0)
	return;
	var unsafe;
	try
	{
		unsafe = unsafeWindow;
	}
	catch (e)
	{
		unsafe = window;
	}
	var $ = unsafe.$;
	if (! $)
		return;

	var gameClock = document.getElementsByClassName ("OGameClock")[0];
	if (gameClock == null)
		return;
	
	var TimeLine;
	var t_auction_info="";
	var n_auction_info="";
	var t_auction_item="";
	var n_auction_item="";

	var EventHTML = localStorage.getItem('AEL_HTML');
	if(!EventHTML) EventHTML = '';

	
	function get_item()
	{
		var item = document.querySelector ("#div_traderAuctioneer .image_140px .detail_button").title.match(/\D+(?=\|)/i);
		if(item)
		{ 
			item = item.toString();
		}
		else
		{
			item = document.querySelector ("#div_traderAuctioneer .image_140px").childNodes[1].alt;
		}
		return item;
	}
	
	var Fun4io = function()
	{
		if(unsafe.io) {
			var mysoc = new unsafe.io.connect("/auctioneer",{port:unsafe.auctioneerPort});
			mysoc.on('timeLeft', function (msg) {
				n_auction_item=get_item();
				if(!(n_auction_item == t_auction_item)) {
					t_auction_item=n_auction_item;
					//document.getElementById ("auc_events").innerHTML = gameClock.textContent+" "+n_auction_item+'<br />'+document.getElementById ("auc_events").innerHTML;
					document.getElementById ("auc_events").innerHTML = EventHTML = gameClock.textContent+" "+n_auction_item+'<br />'+EventHTML;
					localStorage.setItem('AEL_HTML',EventHTML);
				}
				if(document.querySelector ("#div_traderAuctioneer .left_header h2").textContent.indexOf(unsafe.loca.auctionFinished) != -1)
				{
					return;
				}
				n_auction_info=msg;
				if(typeof(msg.textContent) != 'undefined') n_auction_info=msg.textContent;
				var nEnter = n_auction_info.indexOf('<br');
				if(nEnter>0) 
				{
					n_auction_info=document.querySelector ("#div_traderAuctioneer .auction_info").textContent.substring(0,nEnter-1);
				}
				else
				{
					nEnter = n_auction_info.indexOf('\n');
					if(nEnter>0) 
					{
						n_auction_info=document.querySelector ("#div_traderAuctioneer .auction_info").textContent.substring(0,nEnter-1);
					}
				}
				if(!(n_auction_info == t_auction_info)) {
					t_auction_info=n_auction_info;
					//document.getElementById ("auc_events").innerHTML = gameClock.textContent+" "+n_auction_info+'<br />'+document.getElementById ("auc_events").innerHTML;
					document.getElementById ("auc_events").innerHTML = EventHTML = gameClock.textContent+" "+n_auction_info+'<br />'+EventHTML;
					localStorage.setItem('AEL_HTML',EventHTML);
				}
			});
			mysoc.on('new auction', function (msg) {
				//document.getElementById ("auc_events").innerHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionRunning+"</b><br />"+document.getElementById ("auc_events").innerHTML;
				document.getElementById ("auc_events").innerHTML = EventHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionRunning+"</b><br />"+EventHTML;
				localStorage.setItem('AEL_HTML',EventHTML);
			});
			mysoc.on('new bid', function (msg) {
			n_auction_item=get_item();
			if(!(n_auction_item == t_auction_item)) {
				t_auction_item=n_auction_item;
				//document.getElementById ("auc_events").innerHTML = gameClock.textContent+" "+n_auction_item+'<br />'+document.getElementById ("auc_events").innerHTML;
				document.getElementById ("auc_events").innerHTML = EventHTML = gameClock.textContent+" "+n_auction_item+'<br />'+EventHTML;
				localStorage.setItem('AEL_HTML',EventHTML);
			}
			  //document.getElementById ("auc_events").innerHTML = gameClock.textContent+' <a style="color: #FFFFFF; text-decoration: none;" href="'+msg.player.link+'"> '+msg.player.name+"</a> "+unsafe.number_format(Math.floor(msg.sum),0)+'<br />'+document.getElementById ("auc_events").innerHTML;
			  document.getElementById ("auc_events").innerHTML = EventHTML = gameClock.textContent+' <a style="color: #FFFFFF; text-decoration: none;" href="'+msg.player.link+'"> '+msg.player.name+"</a> "+unsafe.number_format(Math.floor(msg.sum),0)+'<br />'+EventHTML;
			  localStorage.setItem('AEL_HTML',EventHTML);
			});
			mysoc.on('auction finished', function (msg) {
				n_auction_item=get_item();
				if(!(n_auction_item == t_auction_item)) {
					t_auction_item=n_auction_item;
					//document.getElementById ("auc_events").innerHTML = gameClock.textContent+" "+n_auction_item+'<br />'+document.getElementById ("auc_events").innerHTML;
					document.getElementById ("auc_events").innerHTML = EventHTML = gameClock.textContent+" "+n_auction_item+'<br />'+EventHTML;
					localStorage.setItem('AEL_HTML',EventHTML);
				}
				//document.getElementById ("auc_events").innerHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionFinished+' <a style="color: #FFFFFF; text-decoration: none;" href="'+msg.player.link+'"> '+msg.player.name+"</a> "+unsafe.number_format(Math.floor(msg.sum),0)+'</b><br />'+document.getElementById ("auc_events").innerHTML;
				document.getElementById ("auc_events").innerHTML = EventHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionFinished+' <a style="color: #FFFFFF; text-decoration: none;" href="'+msg.player.link+'"> '+msg.player.name+"</a> "+unsafe.number_format(Math.floor(msg.sum),0)+' '+n_auction_item+'</b><br />'+EventHTML;
				localStorage.setItem('AEL_HTML',EventHTML);
			});
			return;
		}
		setTimeout (Fun4io, 500);
	}

	var Fun4Ajax = function()
	{
		if (document.getElementById ("auc_events") == null)
		{
			TimeLine = document.createElement ("div");
			TimeLine.id = "AuctioneerEvents";
			TimeLine.className = "auction_history";
			
			hTimeLine = document.createElement ("div");
			hTimeLine.className = "history_header";
			
			headerEvents = document.createElement ("h3");
			headerEvents.innerHTML = 'Events&nbsp;&nbsp;<a id="ClearAEL" title="|Clear auction event list" class="tipsStandard" href="javascript:void(0);"><img width="16" height="16" style="vertical-align: middle;" src="data:image/gif;base64,R0lGODlhEAAQAJEAAFx2i2+Jnf///////yH5BAEAAAMALAAAAAAQABAAAAIuHI6Zpu0Pj5gT0lubcFtj+mwi0B3BeQqByqJuusbqi7YtDbsz/u34DwQOgq5BAQA7">';
			
			hTimeLine.appendChild(headerEvents);
			TimeLine.appendChild(hTimeLine);
			
			hTimeLine = document.createElement ("div");
			hTimeLine.id = "auc_events";
			hTimeLine.className = "history_content";
			hTimeLine.style.textAlign = "left";
			hTimeLine.style.fontSize = "11px";
			hTimeLine.innerHTML = EventHTML = gameClock.textContent+" "+document.querySelector ("#div_traderAuctioneer .image_140px").childNodes[1].alt+"<br /><br />"+EventHTML;
			localStorage.setItem('AEL_HTML',EventHTML);
//			hTimeLine.innerHTML = gameClock.textContent+" "+document.querySelector ("#div_traderAuctioneer .image_140px").childNodes[1].alt+"<br />"+hTimeLine.innerHTML;
			t_auction_item=n_auction_item=get_item();
			if(document.querySelector ("#div_traderAuctioneer .left_header h2").textContent.indexOf(unsafe.loca.auctionFinished) != -1)
			{
				//hTimeLine.innerHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionFinished+' <a style="color: #FFFFFF; text-decoration: none;" href="'+document.querySelector ("#div_traderAuctioneer .currentPlayer").href+'"> '+document.querySelector ("#div_traderAuctioneer .currentPlayer").textContent+"</a> "+document.querySelector ("#div_traderAuctioneer .currentSum").textContent+"</b><br />"+hTimeLine.innerHTML;
				hTimeLine.innerHTML = EventHTML = "<b>"+gameClock.textContent+" "+unsafe.loca.auctionFinished+' <a style="color: #FFFFFF; text-decoration: none;" href="'+document.querySelector ("#div_traderAuctioneer .currentPlayer").href+'"> '+document.querySelector ("#div_traderAuctioneer .currentPlayer").textContent+"</a> "+document.querySelector ("#div_traderAuctioneer .currentSum").textContent+"</b><br />"+EventHTML;
				localStorage.setItem('AEL_HTML',EventHTML);
			}
			TimeLine.appendChild(hTimeLine);

			hTimeLine = document.createElement ("div");
			hTimeLine.className = "history_footer";
			TimeLine.appendChild(hTimeLine);
			
			document.querySelector ("#div_traderAuctioneer .content").appendChild (TimeLine);
			$ ('#ClearAEL').click (function ()
			{
				document.getElementById ("auc_events").innerHTML = EventHTML = '';
				localStorage.setItem('AEL_HTML',EventHTML);
				t_auction_info="";
				n_auction_info="";
				t_auction_item="";
				n_auction_item="";
			});

			Fun4io();
		}
	}
	if (document.getElementById ("div_traderAuctioneer"))
		Fun4Ajax();
	else
	{
		$ ("#inhalt").ajaxSuccess (function ()
		{
			if ((document.getElementById ("div_traderAuctioneer") == null) || document.getElementById ("auc_events"))
				return;
			Fun4Ajax();
		});
	}

}) ();

