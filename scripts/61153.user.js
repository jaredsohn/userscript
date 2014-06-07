// ==UserScript==
// @name           Inline Link Search
// @namespace      pendevin
// @description    Turns the link search link into an inline search bar.
// @include        http://links.endoftheinter.net/*
// @include        https://links.endoftheinter.net/*
// @include        http://boards.endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// @include        http://archive.endoftheinter.net/*
// @include        https://archive.endoftheinter.net/*
// @include        http://endoftheinter.net/*
// @include        https://endoftheinter.net/*
// ==/UserScript==

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

function insertAfter(newNode, target) 
{
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if(refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
}


function getUrlVars(urlz)
{
	//thanks for the function citizenray
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	 
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	return vars;
}
var get=getUrlVars(location.pathname);

	var excl=(parseInt(get["exclude"])>0)?parseInt(get["exclude"]):0;
	var gory=(parseInt(get["category"])>0)?parseInt(get["category"]):0;
	//if the categories change, i'll need to update this list
	var options=[
			{name:"Portable Games",value:2147483648},
			{name:"Books",value:1073741824},
			{name:"Uploads",value:536870912},
			{name:"Gay Porn",value:268435456},
			{name:"Freebies/Deals",value:134217728},
			{name:"Shopping",value:67108864},
			{name:"Traditional Games",value:33554432},
			{name:"Sports",value:16777216},
			{name:"Movies",value:8388608},
			{name:"TV Shows",value:4194304},
			{name:"Educational",value:2097152},
			{name:"News Article",value:1048576},
			{name:"Music",value:524288},
			{name:"Pictures",value:262144},
			{name:"Software",value:131072},
			{name:"Other",value:65536},
			{name:"Comics",value:32768},
			null,
			{name:"Foreign Language",value:8192},
			null,
			{name:"Console Games",value:2048},
			{name:"Text",value:1024},
			{name:"Anime",value:512},
			null,
			{name:"NLS",value:128},
			null,
			{name:"Humor",value:32},
			{name:"Videos",value:16},
			{name:"PC Games",value:8},
			{name:"Furry",value:4},
			{name:"Porn",value:2},
			{name:"Hentai",value:1}
		]

	// find me a search link
	var searchLink;
	searchLink=document.getElementsByClassName("menubar")[0].getElementsByTagName("a");
	for(var i in searchLink){
		if(searchLink[i].pathname=="/links.php"&&getUrlVars(searchLink[i].href)["mode"]=="search"){
			searchLink=searchLink[i];
			searchLink.id="ILS_searchLink";
			break;
		}
	}

	//build the search bar
	var search=addElm("div","ILS_search_bar","menubar",
			"<form method='get' action='links.php' style='display:inline;' name='ILS' id='ILS_form'><span style='font-weight:normal'>\
				<input type='hidden' value='as' name='mode'>\
				<input type='checkbox' value='1' name='s_to'"+(get["s_to"]=="1"?" checked":"")+">Title Only \
				<input id='ILS_search_box' type='text' name='s_aw' value='"+((get["s_aw"]&&location.hostname=="links.endoftheinter.net")?decodeURI(get["s_aw"]).replace(/\+/," "):"")+"'>\
				<input type='hidden' id='ILS_category' name='category' value='"+gory+"'>\
				<input type='hidden' id='ILS_exclude' name='exclude' value='"+excl+"'>"+
				(location.href.match(/sort=\d/)?"<input type='hidden' name='sort' value='"+get["sort"]+"'>":"")+
				(get["sortd"]?"<input type='hidden' name='sortd' value='"+get["sortd"]+"'>":"")+
				"<input id='ILS_submit' type='submit' name='go' value='Search'>\
				&nbsp;<a id='ILS_filter_link' class='ILS_linkish'>Edit Category Filters</a> | \
				</span><a href='lsearch.php?a' class='ILS_linkish small'>Advanced</a></form>\
			",["style",(location.pathname=="/links.php"&&get["mode"]=="as")?"display:block;":"display:none;"]);
	insertAfter(search,document.getElementsByClassName("menubar")[0]);
	searchLink.addEventListener("click",clicked,false);
	document.getElementById("ILS_filter_link").addEventListener("click",clacked,false);

	//build the category filter
	var filter=addElm("div","ILS_category_filter","menubar",
			"<form	id='ILS_categories' style='display:inline;'>\
				<div class='filter-container'><div class='filter-column'>\
				<b>Must	not	include</b><br>\
				<select	id='ILS_c_es' multiple='multiple' size='10' name='ILS_c_es'></select><br>\
				<input type='button' id='ILS_c_es_right'	value='>>'>\
				</div><div class='filter-column'>\
				<b>Don't care</b><br>\
				<select	multiple='multiple'	id='ILS_c_ds' size='10' name='ILS_c_ds'></select><br>\
				<input type='button' id='ILS_c_ds_left'	value='<<'>\
				<input type='button' id='ILS_c_ds_right'	value='>>'>\
				</div><div class='filter-column'>\
				<b>Must	include</b><br>\
				<select	id='ILS_c_is' multiple='multiple' size='10' name='ILS_c_is'></select><br>\
				<input type='button' id='ILS_c_is_left'	value='<<'>\
				</div><br>\
				<input type='button' value='Apply' id='ILS_submit2'>\
				</div></form>\
			",["style","display:none;"]);
	insertAfter(filter,search);
	//whoamg so many event listeners
	document.getElementById("ILS_submit2").addEventListener("click",function(){document.getElementById("ILS_submit").click();},false);
	document.getElementById("ILS_c_es").addEventListener("click",function(e){if(e.detail==2)moveIt(document.getElementById("ILS_c_es"),document.getElementById("ILS_c_ds"));},false);
	document.getElementById("ILS_c_ds").addEventListener("click",function(e){if(e.detail==2)moveIt(document.getElementById("ILS_c_ds"),document.getElementById("ILS_c_is"));},false);
	document.getElementById("ILS_c_is").addEventListener("click",function(e){if(e.detail==2)moveIt(document.getElementById("ILS_c_is"),document.getElementById("ILS_c_ds"));},false);
	document.getElementById("ILS_c_es_right").addEventListener("click",function(){moveIt(document.getElementById("ILS_c_es"),document.getElementById("ILS_c_ds"));},false);
	document.getElementById("ILS_c_ds_left").addEventListener("click",function(){moveIt(document.getElementById("ILS_c_ds"),document.getElementById("ILS_c_es"));},false);
	document.getElementById("ILS_c_ds_right").addEventListener("click",function(){moveIt(document.getElementById("ILS_c_ds"),document.getElementById("ILS_c_is"));},false);
	document.getElementById("ILS_c_is_left").addEventListener("click",function(){moveIt(document.getElementById("ILS_c_is"),document.getElementById("ILS_c_ds"));},false);
	
	//populate the category filter
	//i wonder how llamaguy does it since he doesn't have a function like this in select.js
	//damn i think i'm still drunk
	var category=("00000000000000000000000000000000"+gory.toString(2)).slice(-32).split("");
	var exclude=("00000000000000000000000000000000"+excl.toString(2)).slice(-32).split("");
	var excluder=document.getElementById("ILS_c_es");
	var neutral=document.getElementById("ILS_c_ds");
	var include=document.getElementById("ILS_c_is");
	for(i in options){
		category[i]=parseInt(category[i]);
		exclude[i]=parseInt(exclude[i]);
		if(options[i]==null)continue;
		else if(category[i])include.options[include.options.length]=new Option(options[i].name,options[i].value,false,false);
		else if(exclude[i])excluder.options[excluder.options.length]=new Option(options[i].name,options[i].value,false,false);
		else neutral.options[neutral.options.length]=new Option(options[i].name,options[i].value,false,false);
	}
	sortSelect(excluder);
	sortSelect(neutral);
	sortSelect(include);

	//remove the normal edit category filters link
	//maybe i should add an event listener for clacked and set the onclick to null, but i'm not sure if that will work with greasemonkey
	//fuck that shit yo
	if(location.pathname=="/links.php"&&get["mode"]=="as"){
		var as=document.getElementsByClassName("userbar")[0].getElementsByTagName("a");
		for(i in as){
			if(as[i].innerHTML=="Edit category filters"){
				as[i].parentNode.removeChild(as[i].nextSibling);
				as[i].parentNode.removeChild(as[i]);
				break;
			}
		}
	}

	//show/hide the search bar
	function clicked(e){
		e.preventDefault();
		search.style.display=search.style.display=="none"?"block":"none";
		document.getElementById("ILS_search_box").focus();
	}

	//show/hide the category filter
	function clacked(e){
		e.preventDefault();
		if(filter.style.display=="none"){
			filter.style.display="block"
			if(search.style.display=="none")search.style.display="block";
			searchLink.addEventListener("click",clacked,false);
		}
		else{
			filter.style.display="none";
			searchLink.removeEventListener("click",clacked,false);
		}
	}

	//move the selected options to a new column and update the category values
	function moveIt(oldCol,newCol){
		//move it
		for(var i in oldCol.options){
			var c=oldCol.options[i];
			if(c!=undefined&&c.selected){
				newCol.options[newCol.options.length]=new Option(c.text,c.value,false,false);
				oldCol.options[i]=null
			}
		}
		oldCol.selectedIndex=-1;
		newCol.selectedIndex=-1;
		sortSelect(newCol);

		//update the values
		gory=selectSum(document.getElementById("ILS_c_is"));
		excl=selectSum(document.getElementById("ILS_c_es"));
		document.getElementById("ILS_category").value=gory;
		document.getElementById("ILS_exclude").value=excl;

		//native ETI function
		//gets the sum of the category values
		function selectSum(column){
			var sum=0;
			for(var i in column.options)sum+=parseInt(column.options[i].value);
			return sum;
		}
	}

	//native ETI function
	//sort the categories alphabetically, except 'Other', which goes last
	function sortSelect(column){
		var c=[];
		for(var i in column.options){
			c[c.length]=new Option(column.options[i].text,column.options[i].value,column.options[i].defaultSelected,column.options[i].selected)
		}
		c=c.sort(function(e,d){
				if(d.text=="Other")return -2;
				if(e.text=="Other")return 2;
				if((e.text+"")<(d.text+""))return -1;
				else if((e.text+"")>(d.text+""))return 1;
				else return 0;
		});
		for(i in c){
			column.options[i]=new Option(c[i].text,c[i].value,c[i].defaultSelected,c[i].selected)
		}
	}

	var css="\
		.ILS_linkish{cursor:pointer;text-decoration:none;}\
		.ILS_linkish:hover{text-decoration:underline;}\
		#ILS_categories{text-align:-moz-center;}\
		.small{font-size:8pt;}\
	";
	GM_addStyle(css);