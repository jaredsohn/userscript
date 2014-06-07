// ==UserScript==
// @name					Color Empornium Highest Seeds
// @description		Color codes torrents with highest seeds
// @version				2
// @author				Monkeys
// @namespace			empornium.me
// @include				*torrents.empornium.me/torrents.php*
// ==/UserScript==

(function(){
	
	// *** BEGIN USER ADJUSTABLE VARIABLES *** //
	var MODE = 1; //which to use to colorize: 1-seeds, 2-peers, 3-snatched, 4-ratio
	var COLORADJUST = 2; //which color to use: 1-red, 2-green, 3-blue
	var LOWEST = 1; //lowest color is: 0-black, 1-white
	// *** END USER ADJUSTABLE VARIABLES *** //
	
	//each torrent is a table row:
	//<tr class="torrent">
	var torrents = document.getElementsByClassName('torrent');
	var thislink, links, thisdata;
	var numtorrents = torrents.length;
	var snatchedi, seedsi, peersi;
	
	var seeds=[];
	var peers=[];
	var snatched=[];
	var ratio=[];
	
	var hiseeds=0;
	var hipeers=0;
	var hisnatched=0;
	var hiratio=0;
	var lowseeds=100000; //I should just set this to first torrent
	var lowpeers=100000;
	var lowsnatched=100000;
	var lowratio=100000;
	var MAXCOLORS=255;
	
	
	for (var i = 0; i < numtorrents; i++)
	{//first pass, collect data
		seeds[i]=0;
		peers[i]=0;
		snatched[i]=0;
		ratio[i]=1;
		
		links = torrents[i].getElementsByTagName('td'); //grab links in this torrent
		for (var j = 0; j< links.length; j++)
		{//go through each link, look for seeds, peers, snatched
			thislink = links[j].toString(); //href=
			thisdata = links[j].innerHTML.toString(); //link text
			//GM_log("\nthis link: " + thislink + ", this data: " + thisdata);
			
			if (thisdata.indexOf('class="user"') != -1)
			{//found user td, prev 3 are seeds, peers, snatched
				snatchedi = j-3;
				seedsi = j-2;
				peersi = j-1;
				
				seeds[i] = parseInt(links[seedsi].innerHTML.toString())
				peers[i] = parseInt(links[peersi].innerHTML.toString())
				snatched[i] = parseInt(links[snatchedi].innerHTML.toString())
			}
		}
		ratio[i] = seeds[i]/(peers[i]+1); //+1 to prevent divide by zero
		//GM_log("Seeds: " + seeds[i] + ", Peers: " + peers[i] + ", Snatched: " + snatched[i]);
		//GM_log("Seeds: " + typeof seeds[i] + ", Peers: " + typeof peers[i] + ", Snatched: " + typeof snatched[i]);
		//GM_log("Ratio: " + ratio[i]);
		
		//test to see if this is the highest so far:
		if (seeds[i] > hiseeds) hiseeds = seeds[i];
		if (peers[i] > hipeers) hipeers = peers[i];
		if (snatched[i] > hisnatched) hisnatched = snatched[i];
		if (ratio[i] > hiratio) hiratio = ratio[i];
		
		//test to see fi this is the lowest so far:
		if (seeds[i] < lowseeds) lowseeds = seeds[i];
		if (peers[i] < lowpeers) lowpeers = peers[i];
		if (snatched[i] < lowsnatched) lowsnatched = snatched[i];
		if (ratio[i] < lowratio) lowratio = ratio[i];
		//GM_log("Snatched "+snatched[i]+", low: "+lowsnatched+", hi: "+hisnatched+", temp: ")
		
	}	
	//we now have seeds, peers, snatched, ratio for torrents
	//we have to go through again to do styles
	for (var i = 0; i < numtorrents; i++)
	{//go through each torrent to apply styles
		var tempcolor=0;
		var fullcolor;
		if (MODE==1) tempcolor = Math.round(((seeds[i]-lowseeds)/hiseeds) * MAXCOLORS);
		if (MODE==2) tempcolor = Math.round(((peers[i]-lowpeers)/hipeers) * MAXCOLORS);
		if (MODE==3) tempcolor = Math.round(((snatched[i]-lowsnatched)/hisnatched) * MAXCOLORS);
		if (MODE==4) tempcolor = Math.round(((ratio[i]-lowratio)/hiratio) * MAXCOLORS);
		
		GM_log("Seeds "+seeds[i]+", low: "+lowseeds+", hi: "+hiseeds+", temp: "+tempcolor)
		
		if (LOWEST) tempcolor = MAXCOLORS-tempcolor; //flip in the case of white = low	
		
		if (COLORADJUST==1)
		{//red
			if (LOWEST)
			{//white
				fullcolor = "rgb("+MAXCOLORS+","+tempcolor+","+tempcolor+")";
			}
			else
			{//black
				fullcolor = "rgb("+tempcolor+"0,0)";
			}
		}
		else if (COLORADJUST==2)
		{//green
			if (LOWEST)
			{//white
				fullcolor = "rgb("+tempcolor+","+MAXCOLORS+","+tempcolor+")";
			}
			else
			{//black
				fullcolor = "rgb(0,"+tempcolor+",0)";
			}
		}
		else
		{//blue
			if (LOWEST)
			{//white
				fullcolor = "rgb("+tempcolor+","+tempcolor+","+MAXCOLORS+")";
			}
			else
			{//black
				fullcolor = "rgb(0,0,"+tempcolor+")";
			}
		}
		if (torrents[i].className.indexOf('redbar') == -1)
		{
			torrents[i].style.background = fullcolor;	
			
			//torrents[i].style.background = '#ff5644';	
		}
			
		
	}	
})();
