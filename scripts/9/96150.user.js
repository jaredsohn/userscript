// ==UserScript==
// @name           tvguide.co.uk Selector
// @namespace      http://userscripts.org/users/lorriman
// @description    Select/highlight programs with a click - saves the selection
// @include        http://www.tvguide.co.uk/*
// @version .2
// ==/UserScript==



function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

function getLength (object) {
	len = 0;
	for (prop in object) if (object[prop].constructor != Function) ++len;
	return len;
}

function getDateTitle(){
	m=document.body.innerHTML.match(/<h1>TV Listings for (.*)<\/h1>/i);
	return m[1];
}

function getDateTitleNode(){
	h1s=document.body.getElementsByTagName('h1');
	for(x=0;x<h1s.length;x++){
		h1=h1s[x];
		if(m=h1.innerHTML.match(/TV Listings for/i)){
			return h1;
		}
	}
	return null;
}
			

function getProgramTitle(cell){
	links=cell.getElementsByTagName('a');
	for(i=0;i<links.length;i++){
		if(title=links[i].href){
			return title;			
		}
	}
	return null;
}

function getGridRows(assignIds){
	trs=[];
	tds=document.getElementById('layout-container-body-listing').getElementsByTagName('td');
	for(x=0;x<tds.length;x++){
		td=tds[x];
		if(td.getAttribute('class')=='gridchannel'){
			trs.push(tr=td.parentNode);
			
			if(assignIds || false){
				if( tr.id!='') {
					//do nothing
				}else{
					tr.id=x;
					
				}
			}
		}
	}
	return trs;
}

function getTimeStamp(){ d=new Date; return d.getTime();} 

function unwrap_today(data,date){
	
		today=data[date];
		if(!today){ 
			today={timestamp:getTimeStamp(),programs:{}}; 
			 }
		return today;
}


function maintain_data(data){
	deletion=false;
	timestamp=new Date().getTime();
	timestamp_two_weeks_ago=timestamp-1000*60*60*24*8;//8 days ago
	for(day_str in data){
		day=data[day_str];
		if(day.timestamp<timestamp_two_weeks_ago){
			delete data[day_str];
			deletion=true;
		}
	}
	if(deletion){
		serialize('userscript_click_highlighter_data',{'v1':data})
	}
}

function clickCell(event){
	cell=event.target;
	//some edge cells strangely accept onclicks in a sub-td: we need the parent td, far up the chain of nodes.
	if(cell.getAttribute('class')!='grid'){
		cell=cell.parentNode.parentNode.parentNode.parentNode;
	}	
	selected=cell.getAttribute('selected');
	if(selected!='true'){ selected='false' };
	if(selected!='true'){
		cell.style.background='black';
		//cell.style.color='black';
		cell.setAttribute('selected',true);
	}else{
		cell.style.background='#2f2f2f';
		//cell.style.color='white';
		cell.setAttribute('selected',false);
	}
	var today=null;
	
	m=document.body.innerHTML.match(/<h1>TV Listings for (.*)<\/h1>/i);

		
	if(m){ 
		date_str=m[1];  
		timestamp=new Date().getTime();
		program_title=getProgramTitle(cell);

		data=deserialize('userscript_click_highlighter_data',"({'v1':{}})");
		data=data['v1'];//database version
		today=unwrap_today(data,date_str);
		if(selected=='false'){
			today.programs[program_title]=true;
			//alert(true);
		}else{
			delete today.programs[program_title];
		}
		data[date_str]=today;
		serialize('userscript_click_highlighter_data',{'v1':data})
	}
	

}

//assign ids to the grid rows
getGridRows(true);


var m=document.body.innerHTML.match(/<h1>TV Listings for (.*)<\/h1>/i);
var date_str=m[1];
var data=deserialize('userscript_click_highlighter_data',"({'v1':{}})");
var data=data['v1'];//database version
var today=unwrap_today(data,date_str);


var container=document.getElementById('layout-container-body-listing');
var tds=container.getElementsByTagName('td');
for(x=0;x<tds.length;x++){
	item=tds[x];
	if(item.getAttribute('class')=='grid'){
		item.addEventListener('click',function(cell){clickCell(cell)},false);
		item.setAttribute('xxx','xxx');
		title=getProgramTitle(item);
		if(today.programs[title]){
			item.style.background='black';
			//cell.style.color='black';
			item.setAttribute('selected',true);
		}
	}
}

maintain_data(data);//removes stale days


//add click to reduce grid to selected channels

function toggleShowedItems(event){
	var slideCount=0;
	link=event.target;
	rows=getGridRows();
	for(x=0;x<rows.length;x++){
		row=rows[x];
		
		if(link.getAttribute('showing')=='all'){
			tds=row.getElementsByTagName('td');
			selected=false;
			for(t=0;t<tds.length;t++){
				if(tds[t].getAttribute('selected')=='true'){
					selected=true;				
				}
			}
			if(!selected){
					row.style.display='none';
			}
		}else{
			row.style.display='';
		}
		
	}

	if(link.getAttribute('showing')=='all'){
		textNode.nodeValue='show all';
		link.setAttribute('showing','selected');
	}else{
		textNode.nodeValue='show selected';
		link.setAttribute('showing','all');
	}
}

var dateTitleNode=getDateTitleNode();
var link=document.createElement('a');
link.setAttribute('showing','all');
var textNode=document.createTextNode('show selected');
link.appendChild(textNode);
link.setAttribute('class','title');
link.addEventListener('click',function(event){toggleShowedItems(event,textNode)},false);
dateTitleNode.parentNode.appendChild(link);

