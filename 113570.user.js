// ==UserScript==
// @name           			episodecalendar.com Torrent Search Links
// @namespace				http://userscripts.org/users/kgoutsos
// @author					Konstantinos Goutsos
// @description				Just a simple script for episodecalendar.com that adds a torrentz.eu search link under each episode in the calendar page.
// @copyright 				2013+, Konstantinos Goutsos (www.kgoutsos.gr)
// @license					Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported; http://creativecommons.org/licenses/by-nc-sa/3.0/

// @version        			2.1.0
// @date           			03/10/2013

// @include        			http://*episodecalendar.com/calendar*
// @include        			http://*episodecalendar.com/unwatched*


// ==/UserScript==

var baseUrl="https://kickass.to/usearch/";//"http://torrentz.eu/search?q=";
var spaceChar="%20";//"+";
var timer;
var interval=500;

var currentPage=window.location+"";
currentPage=currentPage.substring(currentPage.indexOf("episodecalendar.com/")+20);
var slashIndex=currentPage.indexOf("/");
if(slashIndex>0){
    currentPage=currentPage.substr(0,slashIndex);
}

switch(currentPage){
    case "calendar":   
        var showCells=document.getElementsByClassName("calendar_cell_content");
        for(var i in showCells)
        {            
            var uls=showCells[i].getElementsByTagName('ul');		
            var lis=uls[0].getElementsByTagName('li');		
            for(j=0;j<lis.length;j++){		
                var showTitle=lis[j].getElementsByTagName('strong')[0].getElementsByTagName('a')[0].firstChild.data.replace(" ",spaceChar);        
                var epId=lis[j].getElementsByTagName('span')[0].firstChild.data;                
                var searchLink=document.createElement('a');
                searchLink.target='_blank';                
                searchLink.href = baseUrl+showTitle+spaceChar+makeEpisodeId(epId);
                searchLink.appendChild(document.createTextNode('Search for torrents'));
                var searchSpan=searchSpan=document.createElement('span');
                searchSpan.appendChild(searchLink);
                lis[j].appendChild(document.createElement("br"));
                lis[j].appendChild(searchSpan);
            }	
        }
        
        function makeEpisodeId(title){            
            var seasonNumber;
            var episodeNumber;
            title=title.substring(title.lastIndexOf('(')+1,title.lastIndexOf(')'));
            seasonNumber=title.split('x')[0];
            if(parseInt(seasonNumber)<=9){
                seasonNumber='0'+seasonNumber;
            }
            episodeNumber=title.split('x')[1].replace(')','');
            if(parseInt(episodeNumber)<=9){
                episodeNumber='0'+episodeNumber;
            }
            return 's'+seasonNumber+'e'+episodeNumber;
        }
        
        break;
    case "unwatched":          
        timer=self.setInterval(makeLinks,800);
        function makeLinks(){  
            var addedLinks=document.getElementsByClassName("greaseAdded");
            for(k=addedLinks.length-1;k>=0; --k){
                addedLinks[k].parentElement.removeChild(addedLinks[k]);
            }
            var unDiv=document.getElementById('unwatched_episodes');
            if(unDiv.innerHTML!=""){                 
                self.clearInterval(timer);       
                var unChildren=unDiv.children;
                for(i=0;i<unChildren.length;i++)
                {
                    if(unChildren[i].getAttribute("style")==null || unChildren[i].getAttribute("style").indexOf("display: none")<0){                                                   
                        var seasonTitles=unChildren[i].getElementsByTagName("h2");
                        for(j=0;j<seasonTitles.length;j++){
                            var searchLink=document.createElement('a');
                            searchLink.target='_blank';
                            var seasonQuery=seasonTitles[j].innerText.replace("- Season ","Season ").replace("  "," ").toLowerCase();
                            while(seasonQuery.indexOf(" ")>=0){
                                seasonQuery=seasonQuery.replace(" ",spaceChar);
                            }
                            searchLink.href =baseUrl+ seasonQuery;
                            searchLink.appendChild(document.createTextNode(' Search for season torrents'));
                            searchLink.style.fontSize="16px";
                            searchLink.style.letterSpacing="0px";
                            var searchSpan=searchPar=document.createElement('span');
                            searchSpan.className="greaseAdded";
                            searchSpan.appendChild(searchLink);
                            seasonTitles[j].appendChild(searchSpan);  
                        }
                    }
                }           
                var title=document.getElementById("show_anchors").getElementsByTagName("ul")[0].getElementsByClassName("selected")[0].getElementsByTagName("span")[0];
                var showTitle=title.innerText;                
                var episodes=document.getElementsByClassName("episode");
                var a=true;
                for(i=0;i<episodes.length;i++)
                {                        
                    var name=episodes[i].getElementsByClassName("name")[0];
                    var episode=name.getElementsByTagName("strong")[0].innerText;
                    var season=episode.split("x")[0];
                    var episodeNum=episode.split("x")[1];
                    if(season.length<2){
                        season="0"+season;
                    }
                    if(episodeNum.length<2){
                        episodeNum="0"+episodeNum;
                    }
                    var episodeId="s"+season+"e"+episodeNum;                        
                    var searchLink=document.createElement('a');
                    searchLink.target='_blank';
                    searchLink.href = baseUrl+showTitle+spaceChar+episodeId;
                    searchLink.appendChild(document.createTextNode('Search for torrents'));
                    var searchSpan=searchPar=document.createElement('span');
                    searchSpan.className="greaseAdded";
                    searchSpan.appendChild(searchLink);
                    name.appendChild(searchSpan);                    
                }
                var anchorLinks=document.getElementById("show_anchors").getElementsByTagName("a");               
                for(var i in anchorLinks){
                    anchorLinks[i].onclick=function(){
                        self.clearInterval(timer);
                        timer=self.setInterval(makeLinks,800);
                    };
                }  
            }
        }        
        
        break;
}
