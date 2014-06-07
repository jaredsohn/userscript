// ==UserScript==
// @name           Whirlpool.Net.au Search Results Date Sort
// @namespace      Whirlpool
// @description    Sort the whirlpool search results by post date.
// @include        http://forums.whirlpool.net.au/forum/?action=threads_search*
// @version			0.3
// ==/UserScript==

$=unsafeWindow.jQuery;

var fPA = $('<a href="#" style="color:white;" />');

fPA.toggle(function() {
	GM_orderSearch('.oldest','down');
	return false;
}, function() {
	GM_orderSearch('.oldest','up');
    return false;
});

$('td.oldest:first b').wrap(fPA);


var fPA2 = $('<a href="#" style="color:white;" />');

fPA2.toggle(function() {
	GM_orderSearch('.newest','down');
    return false;
}, function() {
	GM_orderSearch('.newest','up');
    return false;
});

$('td.newest:first b').wrap(fPA2);

function GM_orderSearch(firstOrLast,upOrDown){

    $('#threads td.group:first').html('<b>Forum</b>').attr('style','background-color: #937F69;color: white;font-size: 11px;padding: 4px;text-align: center;');

    var getTrs = $('#content #threads tbody tr');
    var titleTxt=true;
    var plainArr = [];
	var daysArr=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var daysArrStore=[];	
	
    getTrs.each(function(i){
	
			var hasC = $(this).hasClass('section');
			if(hasC){
				if($(this).css('display')!='none'){	//if it has already been run once
					titleTxt=$(this).find('a:first');
					$(this).css('display','none');
				}
				else{
					titleTxt=false;
				}
			}    
			else{
				if(titleTxt){	//if it has already been run once
					$(this).children('.group').empty().append(titleTxt.clone());
				}
				var dS, dS2, ds2Num, tymeHTML=$(this).children(firstOrLast).html().split('<br>')[1];
				
				var newDate = new Date();
				var todaysDate = newDate.getDate();
				var todaysDay = newDate.getDay();
				var currHour = newDate.getHours(); 
				var currMinute = newDate.getMinutes();
				var currMonth = newDate.getMonth();
				var currYear = newDate.getFullYear();	
				
				if(!tymeHTML.match('m')){
					newDate="Thu, 01 Jan 1970 00:00:00 GMT";
				}
				else if(tymeHTML.match('minutes ago')){		//32 minutes ago
					dS=Number(tymeHTML.split('minutes ago')[0]);
					newDate.setMinutes(currMinute-dS);		//cause it's "minutes ago"
				}
				else if(tymeHTML.match('Today at ')){		//Today at 1:23 am
					dS=tymeHTML.split('Today at ')[1].split(' ')[0];
					dS2=dS.split(':');
					newDate.setMinutes(Number(dS2[1]));
					ds2Num=Number(dS2[0]);
					if(tymeHTML.match('pm') && ds2Num!=12){
						ds2Num+=12;
					}
					newDate.setHours(ds2Num);
				}
				else if(tymeHTML.match('Yesterday at ')){		//Yesterday at 2:11 pm
					newDate.setDate((todaysDate-1));
					dS=tymeHTML.split('Yesterday at ')[1].split(' ')[0];
					dS2=dS.split(':');
					newDate.setMinutes(Number(dS2[1]));
					ds2Num=Number(dS2[0]);
					if(tymeHTML.match('pm') && ds2Num!=12){
						ds2Num+=12;
					}
					newDate.setHours(ds2Num);				
				}
				else if(tymeHTML.match(/Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday/)){		//Wednesday at 5:02 pm

					dS=tymeHTML.split(' at ');
					dS2=dS[1].split(' ')[0].split(':');

					var daysArrSl=daysArr.slice(0,todaysDay);
					var daysArrS2=daysArr.slice(todaysDay);
					daysArrStore =daysArrS2.concat(daysArrSl);						

					daysArrStore.reverse();
					var theHolyIndex=null;
					for(var i=0;i<daysArrStore.length;i++){
						if(dS[0] == daysArrStore[i]){
							theHolyIndex=i+1;
							break;
						}
					}
					
					ds2Num=Number(dS2[0]);
					if(tymeHTML.match('pm') && ds2Num!=12){
						ds2Num+=12;
					}
					
					newDate.setDate((todaysDate-theHolyIndex));
					newDate.setHours(ds2Num);
					newDate.setMinutes(Number(dS2[1]));
				}
				else{		//2010-Jan-4, 3:24 pm
					dS= tymeHTML.split(',');
					dS2=dS[0].split('-');
					newDate=dS2[2]+" "+dS2[1]+" "+dS2[0]+dS[1];
				}
				var tyme = {
					ele: this,
					t:Date.parse(newDate.toString())
				};
				plainArr.push(tyme);
			}

		
    });

    plainArr.sort(function(a,b) { 
        if(upOrDown=='up'){
            return a.t < b.t ? -1 : 1; 
        }
        else{
            return a.t > b.t ? -1 : 1; 
        }
    });

    var tTB=document.querySelector('#threads tbody');
	for(var j=0;j<plainArr.length;j++){
		tTB.appendChild(plainArr[j].ele);
    }

	//In case of high CPU usage
	//See http://www.youtube.com/watch?v=i_qE1iAmjFg#t=588s
	/*var j=0;
	(function(){
		if(j<plainArr.length){
			tTB.appendChild(plainArr[j].ele);
			j++;
			setTimeout(arguments.callee,20);
		}
	})();*/
	
}	