// ==UserScript==
// @name       movie2k Serienscript
// @include http://www.movie2k.to/*
// @include http://serienjunkies.org/*
// @version    0.4.1
// @description  remembers the episode from a series at movie2k
// @run-at document-end
// @copyright  2012+, BeJay
// ==/UserScript==
console.log("------------------------------");
//Funktionalitäten auf denen alles aufbaut
if (document.URL.split("/").length > 3){
        console.log("setEpi");
    //Speichern der Episoden
    console.log(document.URL.split("/")[2]);
            setEpisode(document.URL.split("/")[2]);
    //Abrufen der gespeicherten Episoden
            viewSeries(document.URL.split("/")[2]);
            console.log("StartBildschirm");

}



function setEpisode(site){
   
    var episodeUrl = getEpisodeURL(site, getSerie(site));

}

function saveToLocal(site, serie, episodeUrl){
    console.log("site");
    console.log(site);
    console.log("Serie");
    console.log(serie);
    console.log("episodeUrl");
    console.log(episodeUrl);
	var locStor =localStorage[site]; 
	var allSeries;
	if(locStor == null){
		allSeries = [];
	} else{
		allSeries = JSON.parse(localStorage[site]);
	}
	var bool = true;
	for(var u = 0 ; u < allSeries.length; u++){
		if(allSeries[u].name == serie){
			bool = false;
			allSeries[u].url = episodeUrl;
		}
	}
	if(bool){
		allSeries.push({name: serie, url: episodeUrl});
	}
	localStorage[site] = JSON.stringify(allSeries);    
}

function viewSeries(site){
    var select = document.createElement("select");
    var first = document.createElement("option");
    first.value = "";
    select.appendChild(first);
    var loc;
    var button = document.createElement("button");
    button.innerHTML = "Get Episode!";
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete TV Show";
    deleteButton.onclick = function(){
    if(select.selectedIndex != 0){
        loc.splice(select.selectedIndex-1, 1);
        localStorage["movie2k"] = JSON.stringify(loc);
        self.location = "http://" + serie + "/";
        return false;
        } else{
            return false;
        }
    };
    if ((localStorage[site.split("\.")[1]]!=null)||(site.split("\.")[0].indexOf("serienjunkies") != -1)){
        if(site.split("\.")[1].indexOf("movie2k") != -1){
            loc = JSON.parse(localStorage["movie2k"]);
        } else {
            if(site.split("\.")[0].indexOf("serienjunkies") != -1){
                loc = JSON.parse(localStorage["serienjunkies"]);
            }
        }
        for(var i = 0; i < loc.length; i++){
                var option = document.createElement("option");
                option.value = loc[i].url;
                option.innerHTML =loc[i].name;
                select.appendChild(option);    
        }
        
        if(site.split("\.")[1].indexOf("movie2k") != -1){
            button.onclick = function(){
                console.log(select.options[select.selectedIndex].value);
                self.location = "http://www.movie2k.to/" + select.options[select.selectedIndex].value;
                return false;                           
            };


            document.getElementsByTagName("tbody")[0].children[1].children[0].appendChild(select);
            document.getElementsByTagName("tbody")[0].children[1].children[0].appendChild(button);
            document.getElementsByTagName("tbody")[0].children[1].children[0].appendChild(deleteButton);
        }
    }
    if(site.split("\.")[0].indexOf("serienjunkies") != -1){
        if (document.URL.split("/")[3].split("-")[0].indexOf("serie") == -1){
            button.onclick = function(){
                console.log(select.options[select.selectedIndex].value);
                self.location = "http://serienjunkies.org/serie/" + select.options[select.selectedIndex].innerHTML;
                return false;                           
            };
            document.getElementsByTagName("table")[2].appendChild(select);
            document.getElementsByTagName("table")[2].appendChild(button);
            document.getElementsByTagName("table")[2].appendChild(deleteButton);
        }
    }
}

function sleeper(){
    if(document.getElementById("ajax_loading").style.cssText.indexOf("display: none;")== -1){
        setTimeout(sleeper,100)
        console.log("sleep");
            }else {
                console.log("Fertig");
            }
}

function getSerie(site){
	if(site.split("\.")[1].indexOf("movie2k") != -1){
        if(document.head.getElementsByTagName("title")[0].innerHTML.indexOf("Watch ") !=-1){
    		return document.head.getElementsByTagName("title")[0].innerHTML.split("Watch ")[1].split(" online")[0];
        }
	}
	if(site.split("\.")[0].indexOf("serienjunkies") != -1){
		return(document.URL.split("/")[4]);
	}
}

function getEpisodeURL(site, serie){
     console.log(site);
    if(site.split("\.")[1].indexOf("movie2k")!= -1){
        if(document.head.getElementsByTagName("title")[0].innerHTML.indexOf("Watch ") !=-1){
            var seas=0;
            var season = document.getElementsByName("season");
            var episodes = document.getElementsByName("episode");
            
            for(var s = 0; s < season[0].children.length; s++){
                if (season[0].children[s].getAttribute("selected") != null){
                        seas = season[0].children[s].getAttribute("value");
                        seas--;
                }
            }
        
            var epis = episodes[seas];
            var next = true;
            for(var i = 2; i< epis.children.length -1; i++){
                if (epis.children[i-1].getAttribute("selected") != null){
                    next = false;
                    console.log(epis.children[i].getAttribute("value"));
                    episodeUrl = epis.children[i].getAttribute("value");
                }
            }
            if(next){
                seas++;
                if(episodes.length != seas){
                    episodeUrl = episodes[seas].children[1].getAttribute("value");
                } else{
                    episodeUrl = "";
                }
            }
            saveToLocal(site.split("\.")[1], serie, episodeUrl);
        }
    }
	if(site.split("\.")[0].indexOf("serienjunkies")!= -1){
        if (document.URL.split("/")[3].split("-")[0].indexOf("serie") != -1){
            //sucht aus der DB die Folge + Staffel und schreibt sie in einem <a> Tag
            //speichert die nächste Folge
            if(localStorage["serienjunkies"] != null){
                var loc = JSON.parse(localStorage["serienjunkies"]);
                console.log(loc);
                for(var i = 0; i < loc.length; i++){
                    if(loc[i].name.indexOf(serie) != -1 ){
                        var newA = document.createElement("a");
                        newA.innerHTML = "Take Season: " + loc[i].url.split(";")[0] + " ; Episode: " + loc[i].url.split(";")[1] ;
                        document.getElementById("lang_list").parentElement.appendChild(newA);    
                    }
                }
                
                document.getElementById("episode_list").addEventListener("change", function(evt){
                   
                    if(evt.srcElement.selectedIndex == (evt.srcElement.length -1)){
                        saveToLocal(site.split("\.")[0], serie, (document.getElementById("season_list").selectedIndex + 1)+";"+(1));
                    } else{
                        saveToLocal(site.split("\.")[0], serie, (document.getElementById("season_list").selectedIndex )+";"+(evt.srcElement.selectedIndex+1));
                    }
                });
        }
        }
    }
}