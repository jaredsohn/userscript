// ==UserScript==
// @name           ETI Avatar Highlighter
// @namespace      pendevin
// @description    Highlights a user based on their avatar color
// @include        http://endoftheinter.net/inboxthread.php?*
// @include        http://links.endoftheinter.net/linkme.php?*
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        http://archives.endoftheinter.net/showmessages.php?*
// @include        https://endoftheinter.net/inboxthread.php?*
// @include        https://links.endoftheinter.net/linkme.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @include        https://archives.endoftheinter.net/showmessages.php?*
// ==/UserScript==

//xhtmlhttprequest handler
//i got this from shoecream's userscript autoupdater at http://userscripts.org/scripts/show/45904
//this instance is modified to return text/plain
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
			overrideMimeType: "text/plain; charset=x-user-defined",
			headers:{
				'User-Agent': navigator.userAgent
			},
			onload:function(r){XHR.createDoc(r,callback,optional);}
		});
	}
}

function base64Encode(data){
  return btoa(data.replace(/[\u0100-\uffff]/g,function(c){
    return String.fromCharCode(c.charCodeAt(0)&0xff);
  }));
}

//Converts an RGB color value to HSV. Conversion formula
//adapted from http://en.wikipedia.org/wiki/HSV_color_space.
//Assumes r, g, and b are contained in the set [0, 255] and
//returns h in the set [0, 360] and, s and v in the set [0, 100].
function rgbToHsl(red,green,blue){
	red/=255, green/=255, blue/=255;
	var max=Math.max(red,green,blue), min=Math.min(red,green,blue);
	var hue, saturation, lightness=(max+min)/2;
	if(max==min)
		hue=saturation=0; // achromatic
	else{
		var difference=max-min;
		saturation=lightness>0.5?difference/(2-max-min):difference/(max+min);
		if(max==red)
			hue=(green-blue)/difference+(green<blue?6:0);
		else if(max==green)
			hue=(blue-red)/difference+2;
		else if(max==blue)
			hue=(red-green)/difference+4;
		hue/=6;
	}
	return [Math.round(hue*360), Math.round(saturation*100), Math.round(lightness*100)];
}

//takes a color and finds a contrasting color
//99% guaranteed readable, 50% guaranteed ugly
function complement(rgb){
	var hsl=rgbToHsl(rgb[0],rgb[1],rgb[2]);
	hsl[0]=(hsl[0]+180)%360;

	if(hsl[1]<=40)
		hsl[1]=hsl[1]+60;
	else if(hsl[1]<=50)
		hsl[1]=100;
	else if(hsl[1]>=60)
		hsl[1]=hsl[1]-60;
	else if(hsl[1]>50)
		hsl[1]=0;

	if(hsl[2]<=40)
		hsl[2]=hsl[2]+60;
	else if(hsl[2]<50)
		hsl[2]=100;
	else if(hsl[2]>=60)
		hsl[2]=hsl[2]-60;
	else if(hsl[2]>=50)
		hsl[2]=0;
	return hsl;
}

function round(pixel){
	pixel.pop();
	for(var i=0;i<pixel.length;i++){
		pixel[i]=(pixel[i]-(pixel[i]%16))
		pixel[i]+=pixel[i]/16;
	}
}

//needs to happen with XHR.get to bypass domain security restrictions
function getColor(r,user,url){
	//make variables and shit
	var canvas=document.createElement("canvas");
	var context=canvas.getContext("2d");
	var img=document.createElement("img");
	var imageData=[];
	var pixels=[];

	//extract the goddamn color data
	var string=r.responseText;
	var type=r.responseHeaders.match(/Content-Type: (.*)/i)[1];
	img.src="data:"+type+";base64,"+base64Encode(string);
	document.getElementsByClassName("body")[0].appendChild(canvas);
	canvas.parentNode.appendChild(img);
	canvas.width=img.width;
	canvas.height=img.height;
	context.drawImage(img,0,0);
	try{
		imageData=context.getImageData(0,0,canvas.width,canvas.height).data;
		var j=0;
		for(var i=0;i<imageData.length;j++){
			pixels[j]=[imageData[i],imageData[i+1],imageData[i+2],imageData[i+3]];
			i+=4;
		}
		canvas.parentNode.removeChild(canvas);
		img.parentNode.removeChild(img);

		//analyze the color data
		//group it by pixels and count how many times each nontransparent color is used
		var colors=[];
		for(var i=0;i<pixels.length;i++){
			if(pixels[i][3]==255){
				round(pixels[i]);
				if(!(pixels[i][0]==255&&pixels[i][1]==255&&pixels[i][2]==255)&!(pixels[i][0]==0&&pixels[i][1]==0&&pixels[i][2]==0)){
					var listed=false;
					if(colors.length>0)
						for(var j=0;j<colors.length;j++){
							if("rgb("+pixels[i][0]+","+pixels[i][1]+","+pixels[i][2]+")"==colors[j].value){
								listed=true;
								colors[j].num++;
							}
						}
					if(listed==false)
						colors.push({value:"rgb("+pixels[i][0]+","+pixels[i][1]+","+pixels[i][2]+")",num:1,data:[pixels[i][0],pixels[i][1],pixels[i][2]]});
				}
			}
		}

		colors.sort(function(a,b){return b.num-a.num;});
		var comp=complement(colors[0].data);

		var css="\
			.message-container .message-top[userid='"+user+"'], .quoted-message div[userid='"+user+"']{\
				background-color:"+colors[0].value+";\
				color:hsl("+comp[0]+","+comp[1]+"%,"+comp[2]+"%);\
			}\
			.message-container .message-top[userid='"+user+"'] a, .message-container .message-top[userid='"+user+"'] a:visited,\
			.quoted-message .message-top[userid='"+user+"'] a, .quoted-message .message-top[userid='"+user+"'] a:visited{\
				color:hsl("+comp[0]+","+comp[1]+"%,"+comp[2]+"%);\
			}\
		";
		GM_addStyle(css);

		datas[user]={value:colors[0].value,image:url,complement:"hsl("+comp[0]+","+comp[1]+"%,"+comp[2]+"%)"};
		GM_setValue("datas",JSON.stringify(datas));
	}
	catch(e){
		GM_log(e);
		canvas.parentNode.removeChild(canvas);
		img.parentNode.removeChild(img);
	}
}

function tagPosts(place){
	function applyHighlight(e){
		if(e.target.parentNode.className=="img-placeholder"){
			var user=e.target.parentNode.getAttribute("userid");
			var data=datas[user];
			var image=e.target.src;
			var process=false;
			for(var i=0;i<processing.length;i++)
				if(processing[i]==user)
					process=true;
			if(!process&&(!data||data.image!=image)){
				processing.push(user);
				window.setTimeout(function(){XHR.get(image,function(r){getColor(r.response,user,image);})},0);
			}
		}
	}

	var tops=place.getElementsByClassName("message-top");
	var users=[];
	for(var i=0;i<tops.length;i++){
		//is it a normal post or a quote
		//does the user have the moneybags perk
		var user=tops[i].parentNode.className=="message-container"?
			[tops[i].children[1].textContent=='$ $'?
				tops[i].children[2].href.substring(tops[i].children[2].href.indexOf("user=")+5):
				tops[i].children[1].href.substring(tops[i].children[1].href.indexOf("user=")+5),
			true]:
			[tops[i].children[0].textContent=='$ $'?
				tops[i].children[1].href.substring(tops[i].children[1].href.indexOf("user=")+5):
				tops[i].children[0].href.substring(tops[i].children[0].href.indexOf("user=")+5),
			false];
		tops[i].setAttribute("userid",user[0]);
		var processed=false;
		for(var j=0;j<userList.length;j++)
			if(userList[j]==user[0])
				processed=true;
		if(!processed){
			userList.push(user[0]);
			users.push(user[0]);
		}
		if(user[1]){
			var userpic=tops[i].parentNode.getElementsByClassName("userpic-holder")[0];
			if(userpic.firstChild&&userpic.firstChild.tagName=="A")
				userpic=userpic.firstChild.firstChild;
			else if(userpic.firstChild&&userpic.firstChild.tagName=="SPAN")
				userpic=userpic.firstChild;
			if(userpic!=tops[i].parentNode.getElementsByClassName("userpic-holder")[0]){
				userpic.setAttribute("userid",user[0]);
				userpic.addEventListener("DOMNodeInserted",applyHighlight,false);
			}
		}
	}

	var css="";
	for(var i=0;i<users.length;i++){
		var data=datas[users[i]];
		if(data){
			css+="\
				.message-container .message-top[userid='"+users[i]+"'], .quoted-message .message-top[userid='"+users[i]+"']{\
					background-color:"+data.value+";\
					color:"+data.complement+";\
				}\
				.message-top[userid='"+users[i]+"'] a, .message-top[userid='"+users[i]+"'] a:visited,\
				.quoted-message .message-top[userid='"+users[i]+"'] a, .quoted-message .message-top[userid='"+users[i]+"'] a:visited{\
					color:"+data.complement+";\
				}\
			";
		}
	}
	GM_addStyle(css);
}

var datas=JSON.parse(GM_getValue("datas","[]"));
var userList=[];
var processing=[];
tagPosts(document);
document.addEventListener("DOMNodeInserted",function(e){if(e.target.firstChild&&e.target.firstChild.className=="message-container")tagPosts(e.target);},false);