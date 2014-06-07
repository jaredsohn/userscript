// ==UserScript==
// @name        AnichartFix
// @author      Kura
// @description Turns Anichart.net currently airing anime list into minimalistic planner view
// @require     https://code.jquery.com/jquery-latest.min.js
// @namespace   anichart_stuff
// @include     http://anichart.net/airing
// @version     0.122
// @grant       none
// ==/UserScript==

$(document).ready(function(){
    
    var data = {}
    var fixedDaysData = {};
    
    $(".cardWrapper").each(function(){

        //day
        var day = $(this).prev().text();
        data[day] = {};
        fixedDaysData[day] = {};

        //loop over animes
        $(this).find(".anime_info_sml").each(function(){
           
            var anime;
            var studio;
            var eta = "";
            var etaminutes = 0;

            //Time
            var days = $(this).find(".cd_day").text();
            var hours = $(this).find(".cd_hr").text();
            var minutes = $(this).find(".cd_min").text();
            if(days){
                eta += days + "d ";
                etaminutes += 1440 * parseInt(days);
            }
            if(hours){
                eta += hours + "h ";
                etaminutes += 60 * parseInt(hours);
            }
            if(minutes){
                eta += minutes + "m";
                etaminutes += parseInt(minutes);
            }
            if(days[0] === undefined && hours[0] === undefined && minutes[0] === undefined){
                if($(this).find(".ctdn").text().length !== 0){
                    etaminutes = null;
                    eta = "Airing now!";
                }
            }

            //studio + title
            $(this).find(".sml").each(function(){
    
                $(this).find("a").each(function(idx, obj){
                    if(idx == 0)
                        anime = $(this).text();
                    else
                        studio = $(this).text();
                });
            });

            data[day][anime] = {'name':anime, 'studio':studio, 'eta':eta, 'etaminutes':etaminutes };

        });
    });
        
    $("#guts").remove();

    var mainlist = $("<ul></ul>");
    mainlist.css({'list-style': 'none', 'display':'inline-flex', 'text-align':'left', 'margin-right':'130px', 'padding-left':'0px'});


    var namesList = $("<ul></ul>"); namesList.css({'list-style': 'none', 'padding-left':'0px'});
    var studioList = $("<ul></ul>"); studioList.css('list-style', 'none');
    var etaList = $("<ul></ul>"); etaList.css('list-style', 'none');

    var t1 = $("<br /><li>Day</li>"); t1.css('text-decoration','underline');
    var t2 = $("<br /><li>Studio</li>"); t2.css('text-decoration','underline');
    var t3 = $("<br /><li>ETA</li>"); t3.css('text-decoration', 'underline');

    namesList.append(t1);
    studioList.append(t2);
    etaList.append(t3);

    var allAnimes = [];
    
    //All to 1 array
    $.each(data, function(key, day){   
        $.each(day, function(idx2, anime){
            allAnimes.push(anime);
        });
    });
    allAnimes.sort(compare);

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var now = new Date();

    //Create new object with fixed dates
    $.each(allAnimes, function(key, anime){
        var animeTime = new Date(now.getTime() + anime.etaminutes*60000);
        var animeDay = days[animeTime.getDay()];
        fixedDaysData[animeDay][key] = anime;
    });

    //Create list
    $.each(fixedDaysData, function(key, day){

        //mainlist.append( $("<br />"+"<li>"+key+"</li>") );
        var dayObj = $("<br />"+"<li>"+key+"</li>");
        dayObj.css('font-weight', 'bold');
        namesList.append(dayObj);
        studioList.append($("<br /><br />"));
        etaList.append($("<br /><br />"));

        var temparray = [] //used for sorting by eta
        var rotateAmnt = 0;

        $.each(day, function(key2, anime){
            temparray.push(anime);
            
            if(anime.etaminutes > 8640)
        		rotateAmnt += 1;
        });

        temparray.sort(compare);

        temparray = rotate(temparray, rotateAmnt); //rotate already aired shows today to the beginning of the list

        $.each(temparray, function(idx, anime){
            
            if(anime.etaminutes > 0 || anime.etaminutes == null){

            	var temp1 = $("<li>"+anime.name+"</li>");
        		var temp2 = $("<li>"+anime.studio+"</li>");
        		var temp3 = $("<li>"+anime.eta+"</li>");
                
                if(anime.etaminutes != null){
                	var r = Math.round((1020 - anime.etaminutes) / 4);
                	var g = 0;
                	var b = Math.round(anime.etaminutes / 4);
	
                	if(anime.etaminutes < 1020){
                		temp1.css('color', 'rgb('+r+','+g+','+b+')');
                		temp2.css('color', 'rgb('+r+','+g+','+b+')');
                		temp3.css('color', 'rgb('+r+','+g+','+b+')');
                	}
                }
                else{
                	temp1.css('color', 'rgb(0,200,0)');
                	temp2.css('color', 'rgb(0,200,0)');
                	temp3.css('color', 'rgb(0,200,0)');
                }


                namesList.append(temp1);
                studioList.append(temp2);
                etaList.append(temp3);
            }
        });

    });

    mainlist.append(namesList);
    mainlist.append(studioList);
    mainlist.append(etaList);
    
    $("#main-content").css('text-align', 'center');
    $("#main-content").append(mainlist);
});

function compare(a,b) {
  if (a.etaminutes < b.etaminutes)
     return -1;
  if (a.etaminutes > b.etaminutes)
    return 1;
  return 0;
}

function rotate(arr, steps){
	if(steps <= 0){
		while(steps != 0){
			arr.push(arr.shift());
			steps += 1;
		}
	}
	else{
		while(steps != 0){
			arr.unshift(arr.pop())
			steps -= 1;
		}
	}
	return arr;
}