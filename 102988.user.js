// ==UserScript==
// @name           tag autosuggest for trunkly
// @namespace    http://www.morelightmorelight.com/trunklyscript
// @description    Tag autosuggest for trunkly submit.  Makes the trunk.ly submit form and bookmarklet autosuggest your popular tags.
// @homepage   http://www.morelightmorelight.com/2011/05/17/greasemonkey-hack-adding-tags-and-autosuggest-to-trunkly/
// @include        http://trunk.ly/submit/*
// @include		http://trunkly.com/submit/*
// @icon	http://trunkly.com/static/trunkly-social-icon.png
// @version 1.0.3
// ==/UserScript==

// grab the submission form
var submitform = document.evaluate("/html/body/div[2]/div/form",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
submitform.setAttribute("id","bookmarkform");
//we are going to let the firefox autosuggest connect to a datalist of tags.
// only half good because autosuggest doesn't handle multiple!
var tagelement = submitform.elements.namedItem("tags");
tagelement.setAttribute('id', 'tagelement');
var dl = document.createElement("datalist");
dl.setAttribute("id","taglist");

submitform.appendChild(dl);
tagelement.setAttribute("list","taglist");
tagelement.setAttribute("multiple","true");  // sure, it does nothing NOW... but maybe someday multiple will work for text input.

// let's style the tag list we display
var stylein = document.createElement('style');
stylein.setAttribute('type', 'text/css');
stylein.innerHTML = <![CDATA[
	  #inline-list ul, #inline-list li {
		display: inline;
		margin: 0;
		padding: 0;
		color: #339;
		font-weight: bold;
	  }
		
	  #inline-list ul li:after {
		content: ", ";
	  }
  
  ]]>.toString();
document.head.appendChild(stylein);
  

var apikeytxt = 		<![CDATA[
	var keyval = '';			
	function getapikey (resp){  
		//alert(resp["api_key"]);
		keyval = resp["api_key"];
		var tagscript = document.createElement("script");
		tagscript.setAttribute("type", "text/javascript");
		//now we insert a script tag to get our addTags called.
		tagscript.setAttribute("src", "http://trunk.ly/api/v1/user/tags/?callback=addTags&api_key=" + keyval);
		document.body.appendChild(tagscript);
	}
	
	function onTagClick(tag)
	{
	   var tagelement = document.getElementById('tagelement');
	   var curValue = tagelement.value;
	   if (curValue == null){curValue= "";}
	   curValue += " " + tag;
	   tagelement.value = curValue;
	}
	function sorter(a,b){
		if( a['tag'] > b['tag']){
			return 1;
		}
		return -1;
	}
	
	function addTags(resp){
		//alert(resp['count']);
		var tags = resp['tags'];
		//to do the size weighting we need the max and min counts..
		var maxCount = tags[0]['count'];
		var minCount = tags[tags.length -1]['count'];
		//comment this out if you want singelton tags.
		minCount = Math.max(2,minCount);
		var spread = maxCount - minCount;
		var fontLarge = 4;
		var fontSmall = .75;
		var fontSpread = fontLarge - fontSmall;
		var fontStep = fontSpread/spread;
		
		//alpha sort these
		tags = tags.sort(sorter);
		var count = resp['count'];
		
		var dl = document.getElementById('taglist');
		var sform = document.getElementById("bookmarkform");
		var tagsdiv = document.createElement('div');
		tagsdiv.setAttribute('id', 'inline-list');
		sform.appendChild(tagsdiv);
		var tagsul = document.createElement('ul');
		tagsdiv.appendChild(tagsul);
		
		
		for(i = 0; i <  tags.length; i++){
			var tag = tags[i]['tag'];
			var tagweight = tags[i]['count'];
			if(tagweight < minCount){continue;}
			var opt = document.createElement('option');
			opt.setAttribute("value",tag);
			opt.innerHTML=tag;
			dl.appendChild(opt);
			//add clickable tags
			var taglink = document.createElement('a');
			 taglink.setAttribute('href', '#');
			taglink.setAttribute('onClick', 'onTagClick("'+tag +'");');
			taglink.innerHTML=tag + "<span style='font-size:0.5em;'>("+tagweight+")</span>";
			//let's do the tagcloud size weighting
			tagweight = fontSmall + ((tagweight - minCount)* fontStep);
			taglink.setAttribute('style', 'font-size: ' + tagweight + 'em;'); 
			
			var li = document.createElement('li');
			li.appendChild(taglink);
			tagsul.appendChild(li);
		}
	} 
]]>.toString();


//prime our page by putting our custom scripts in.
var apkscript = document.createElement('script');
apkscript.setAttribute("type", "text/javascript");
apkscript.innerHTML= apikeytxt;
document.body.appendChild(apkscript);

//use jsonp to get our custom functions called with the apikey, which then triggers the tags call.
var getkey = document.createElement("script");
getkey.setAttribute("src", "https://trunkly.com/api/v1/api_key/?callback=getapikey");
getkey.setAttribute("type", "text/javascript");
document.body.appendChild(getkey);
