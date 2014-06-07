// ==UserScript==
// @name           5 is Average
// @namespace      pendevin
// @description    Finds and displays the number and percentage of each score on a MAL list.
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
//needs the addElm funtion
var XHR={
	// r.doc is the returned page
	// r.respose is the response element
	createDoc:function(response,callback,optional){
		var doc=document.implementation.createDocument('','',null);
		var html=document.createElement("html");
		html.innerHTML=response.responseText;
		doc.appendChild(html);
		var r={};
		r.response=response;
		r.doc=doc;
		callback(r,optional);
	},

	//sends the XHR request, callback is the function to call on the returned page
	get:function(url,callback,optional){
		if(optional==undefined)optional=null;
		GM_xmlhttpRequest({
			method:'GET',
			url:url,
			headers:{
				'User-Agent': navigator.userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

//returns a new element with (tag, id(optional), classname(optional), innerHTML(optional))
//if you want any other attributes, add arrays to the end of the arguments with [attribute,value]
//this might be cooler using JSON, but i could be wrong---probably
//for the attributes, use the html versions not the dom versions
function addElm(tag,id,className,innerHTML){
	var newElm=document.createElement(tag);
	if(id!=undefined&&id!=null)newElm.id=id;
	if(className!=undefined&&className!=null)newElm.className=className;
	if(innerHTML!=undefined&&innerHTML!=null)typeof innerHTML=="string"?newElm.innerHTML=innerHTML:newElm.appendChild(innerHTML);
	for(var i=4;i<arguments.length;i++)newElm.setAttribute(arguments[i][0],arguments[i][1]);
	return newElm;
}

function rateMe(r,name){
	var completed=[0,0,0,0,0,0,0,0,0,0,0,0];
	var onhold=[0,0,0,0,0,0,0,0,0,0,0,0];
	var dropped=[0,0,0,0,0,0,0,0,0,0,0,0];
	var scores=[0,0,0,0,0,0,0,0,0,0,0,0];
	var starts=[0,0,0];
	var rows=r.doc.getElementById("list_surround").children;
	for(var i=0;i<rows.length;i++){
		if(rows[i].className=="header_completed")
			starts[0]=i+2;
		else if(rows[i].className=="header_onhold")
			starts[1]=i+2;
		else if(rows[i].className=="header_dropped")
			starts[2]=i+2;
	}

	if(starts[0]!=0){
		for(var i=starts[0];i<rows.length;i+=2){
			if(rows[i].firstElementChild.firstChild.firstElementChild.className=="category_totals")
				break;
			var score=rows[i].firstElementChild.firstChild.cells;
			for(var j=0;j<score.length;j++){
				if(score[j].width=="45"){
					score=score[j].firstElementChild?score[j].firstChild.firstChild.innerHTML:score[j].innerHTML;
					break;
				}
			}
			if(score=="-"){
				scores[0]+=1;
				completed[0]+=1;
			}
			else{
				scores[+score]+=1;
				completed[+score]+=1;
			}
			scores[11]+=1;
			completed[11]+=1;
		}
	}

	if(starts[1]!=0){
		for(var i=starts[1];i<rows.length;i+=2){
			if(rows[i].firstElementChild.firstChild.firstElementChild.className=="category_totals")
				break;
			var score=rows[i].firstElementChild.firstChild.cells;
			for(var j=0;j<score.length;j++){
				if(score[j].width=="45"){
					score=score[j].firstElementChild?score[j].firstChild.firstChild.innerHTML:score[j].innerHTML;
					break;
				}
			}
			if(score=="-"){
				scores[0]+=1;
				onhold[0]+=1;
			}
			else{
				scores[+score]+=1;
				onhold[+score]+=1;
			}
			scores[11]+=1;
			onhold[11]+=1;
		}
	}

	if(starts[2]!=0){
		for(var i=starts[2];i<rows.length;i+=2){
			if(rows[i].firstElementChild.firstChild.firstElementChild.className=="category_totals")
				break;
			var score=rows[i].firstElementChild.firstChild.cells;
			for(var j=0;j<score.length;j++){
				if(score[j].width=="45"){
					score=score[j].firstElementChild?score[j].firstChild.firstChild.innerHTML:score[j].innerHTML;
					break;
				}
			}
			if(score=="-"){
				scores[0]+=1;
				dropped[0]+=1;
			}
			else{
				scores[+score]+=1;
				dropped[+score]+=1;
			}
			scores[11]+=1;
			dropped[11]+=1;
		}
	}

	var average=[0,0,0,0,0,0,0,0];
	for(var i=1;i<scores.length-1;i++){
		average[6]+=i*scores[i];
		average[7]+=scores[i];
	}
	average[6]=average[6]/average[7];
	for(var i=1;i<completed.length-1;i++){
		average[0]+=i*completed[i];
		average[1]+=completed[i];
	}
	average[0]=average[0]/average[1];
	for(var i=1;i<onhold.length-1;i++){
		average[2]+=i*onhold[i];
		average[3]+=onhold[i];
	}
	average[2]=average[2]/average[3];
	for(var i=1;i<dropped.length-1;i++){
		average[4]+=i*dropped[i];
		average[5]+=dropped[i];
	}
	average[4]=average[4]/average[5];
	if(scores[11]==0)
		scores[11]++;
	if(completed[11]==0)
		completed[11]++;
	if(onhold[11]==0)
		onhold[11]++;
	if(dropped[11]==0)
		dropped[11]++;

	confirm("<spoiler caption=\""+name+"'s MAL Score Distribution\">\n\
<b>Total</b>\n\
10: "+scores[10]+" ("+((scores[10]/scores[11])*100).toFixed(2)+"%)\n\
9: "+scores[9]+" ("+((scores[9]/scores[11])*100).toFixed(2)+"%)\n\
8: "+scores[8]+" ("+((scores[8]/scores[11])*100).toFixed(2)+"%)\n\
7: "+scores[7]+" ("+((scores[7]/scores[11])*100).toFixed(2)+"%)\n\
6: "+scores[6]+" ("+((scores[6]/scores[11])*100).toFixed(2)+"%)\n\
5: "+scores[5]+" ("+((scores[5]/scores[11])*100).toFixed(2)+"%)\n\
4: "+scores[4]+" ("+((scores[4]/scores[11])*100).toFixed(2)+"%)\n\
3: "+scores[3]+" ("+((scores[3]/scores[11])*100).toFixed(2)+"%)\n\
2: "+scores[2]+" ("+((scores[2]/scores[11])*100).toFixed(2)+"%)\n\
1: "+scores[1]+" ("+((scores[1]/scores[11])*100).toFixed(2)+"%)\n\
Unscored: "+scores[0]+" ("+((scores[0]/scores[11])*100).toFixed(2)+"%)\n\
<u><b>Total Average Rating: "+average[6].toFixed(3)+"</b></u>\n\n\
<b>Completed</b>\n\
10: "+completed[10]+" ("+((completed[10]/completed[11])*100).toFixed(2)+"%)\n\
9: "+completed[9]+" ("+((completed[9]/completed[11])*100).toFixed(2)+"%)\n\
8: "+completed[8]+" ("+((completed[8]/completed[11])*100).toFixed(2)+"%)\n\
7: "+completed[7]+" ("+((completed[7]/completed[11])*100).toFixed(2)+"%)\n\
6: "+completed[6]+" ("+((completed[6]/completed[11])*100).toFixed(2)+"%)\n\
5: "+completed[5]+" ("+((completed[5]/completed[11])*100).toFixed(2)+"%)\n\
4: "+completed[4]+" ("+((completed[4]/completed[11])*100).toFixed(2)+"%)\n\
3: "+completed[3]+" ("+((completed[3]/completed[11])*100).toFixed(2)+"%)\n\
2: "+completed[2]+" ("+((completed[2]/completed[11])*100).toFixed(2)+"%)\n\
1: "+completed[1]+" ("+((completed[1]/completed[11])*100).toFixed(2)+"%)\n\
Unscored: "+completed[0]+" ("+((completed[0]/completed[11])*100).toFixed(2)+"%)\n\
<u>Average Rating: "+average[0].toFixed(2)+"</u>\n\n\
<b>Dropped</b>\n\
10: "+dropped[10]+" ("+((dropped[10]/dropped[11])*100).toFixed(2)+"%)\n\
9: "+dropped[9]+" ("+((dropped[9]/dropped[11])*100).toFixed(2)+"%)\n\
8: "+dropped[8]+" ("+((dropped[8]/dropped[11])*100).toFixed(2)+"%)\n\
7: "+dropped[7]+" ("+((dropped[7]/dropped[11])*100).toFixed(2)+"%)\n\
6: "+dropped[6]+" ("+((dropped[6]/dropped[11])*100).toFixed(2)+"%)\n\
5: "+dropped[5]+" ("+((dropped[5]/dropped[11])*100).toFixed(2)+"%)\n\
4: "+dropped[4]+" ("+((dropped[4]/dropped[11])*100).toFixed(2)+"%)\n\
3: "+dropped[3]+" ("+((dropped[3]/dropped[11])*100).toFixed(2)+"%)\n\
2: "+dropped[2]+" ("+((dropped[2]/dropped[11])*100).toFixed(2)+"%)\n\
1: "+dropped[1]+" ("+((dropped[1]/dropped[11])*100).toFixed(2)+"%)\n\
Unscored: "+dropped[0]+" ("+((dropped[0]/dropped[11])*100).toFixed(2)+"%)\n\
<u>Average Rating: "+average[4].toFixed(2)+"</u>\n\n\
<b>On Hold</b>\n\
10: "+onhold[10]+" ("+((onhold[10]/onhold[11])*100).toFixed(2)+"%)\n\
9: "+onhold[9]+" ("+((onhold[9]/onhold[11])*100).toFixed(2)+"%)\n\
8: "+onhold[8]+" ("+((onhold[8]/onhold[11])*100).toFixed(2)+"%)\n\
7: "+onhold[7]+" ("+((onhold[7]/onhold[11])*100).toFixed(2)+"%)\n\
6: "+onhold[6]+" ("+((onhold[6]/onhold[11])*100).toFixed(2)+"%)\n\
5: "+onhold[5]+" ("+((onhold[5]/onhold[11])*100).toFixed(2)+"%)\n\
4: "+onhold[4]+" ("+((onhold[4]/onhold[11])*100).toFixed(2)+"%)\n\
3: "+onhold[3]+" ("+((onhold[3]/onhold[11])*100).toFixed(2)+"%)\n\
2: "+onhold[2]+" ("+((onhold[2]/onhold[11])*100).toFixed(2)+"%)\n\
1: "+onhold[1]+" ("+((onhold[1]/onhold[11])*100).toFixed(2)+"%)\n\
Unscored: "+onhold[0]+" ("+((onhold[0]/onhold[11])*100).toFixed(2)+"%)\n\
<u>Average Rating: "+average[2].toFixed(2)+"</u>\n\
</spoiler>")

	link.innerHTML="Get Score Distribution";
}

//make variables
//count scores
//get average
//display with witty comments
var place=document.getElementById("mal_cs_otherlinks").children[1];
place.innerHTML+="&nbsp;&nbsp;";
var link=addElm("span","getDistribution",null,"Get Score Distribution");
place.appendChild(link);
link.addEventListener("click",function(){link.innerHTML="Loading...";XHR.get(location.href+"&status=7",rateMe,location.pathname.substring(11));},false);
GM_addStyle("#getDistribution{text-decoration:underline;cursor:pointer;}")