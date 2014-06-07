// ==UserScript==
// @name		Photosynth Panorama Image Grabber
// @version		0.1
// @description	Retrieve skybox textures from Microsoft Photosynth pages
// @match		http://*photosynth.net/*
// @include		http://*photosynth.net/*
// @copyright  2013, Lindblum
// ==/UserScript==

DEBUG = true;
SIDES = ["front","right","back","left","bottom","top"];
URL_IMAGE_BASE = "http://cdn3.ps1.photosynth.net/image/";	//TODO: See if images can come from other subdomain

function log(msg){
	if(DEBUG)	console.log(msg);
} //log

function br(parent){
	parent.appendChild(document.createElement("br"));
} //br

function dom(id){
	return document.getElementById(id);
} //dom

function getURLParameter(paramName, url){
	return getURLParametersObject(url)[paramName];
} //getURLParameter

function getURLParametersObject(url){
	if(!url)	url = location.href;
	if(url.indexOf("?") > 0)	url = url.split("?")[1];
	var urlParams = url.split("&");
	var objParams = {};
	for(var i=0; i<urlParams.length; i++){
		var split = urlParams[i].split("=");
		objParams[split[0]] = unescape(split[1]);
	}
	return objParams;
} //getURLParametersObject

function toURLParameters(objParams){
	var urlParams = "";
	for(var param in objParams)
		urlParams += (urlParams?"&":"")+param+"="+objParams[param];
	return urlParams;
} //toURLParameters

//Context: photosynth.net
function getCollectionInfo(){
	var html = document.body.innerHTML;
	var start = html.indexOf("var _collectionInfo =");
	start = html.indexOf("{", start);
	var end = html.indexOf("}", start);
	html = html.substring(start, end+1);
	return JSON.parse(html);
} //getCollectionInfo

//Context: photosynth.net
function getHiresURL(){
	var html = document.body.innerHTML;
	var start = html.indexOf("var loadParameters = new window.Microsoft.Photosynth.Viewer.LoadParameters(");
	start = html.indexOf("(", start)+1;
	var end = html.indexOf(")", start);
	html = html.substring(start, end);
	return html.split(",")[1].split("\"").join("");
} //getHiresURL
//Context: photosynth.net

//Context: photosynth.net
function getAtlasURL(){
	return getHiresURL().split("hires").join("atlas")
} //getAtlasURL

//Context: photosynth.net
function generateVRML1(surfRes){
	var n = surfRes;
	if(n==null || isNaN(n) || n<1)	n = 1;
	n = parseInt(n);
	var vrmlBuilder = [], pointsBuilder = [], meshBuilder = [], texmapBuilder = [];
	var tab = "  ";
	for(var s=0; s<SIDES.length; s++){
		for(var row=0; row<=n; row++){
			for(var col=0; col<=n; col++){
				var a = 2*col/n -1, b = 2*row/n -1;
				var x = a, y = b, z = 1;
				//Use side to adjust orientation
				var index0 = (n+1)*(n+1)*s + ((n+1)*row + col);
				var index1 = index0+1;
				var index2 = index0+(n+1)+1;
				var index3 = index0+n+1;
				if(s==0){		x = 1;	y = a;	z = b;	}
				else if(s==1){	x =-a;	y = 1;	z = b;	}
				else if(s==2){	x =-1;	y =-a;	z = b;	}
				else if(s==3){	x = a;	y =-1;	z = b;	}
				else if(s==4){	x = b;	y = a;	z =-1;	}
				else if(s==5){	x =-b;	y = a;	z = 1;	}
				//Map to sphere
				var mag = Math.sqrt(x*x+y*y+z*z);
				x/=mag;	y/=mag;	z/=mag;
				//Prepare arrays
				pointsBuilder.push(tab+tab+tab+tab+x+" "+y+" "+z+",");
				if(row<n && col<n)
					meshBuilder.push(tab+tab+tab+index0+" "+index1+" "+index2+" "+index3+" -1,");
				texmapBuilder.push(tab+tab+tab+tab+(s+col/n)/6+" "+(row/n)+",");
			} //for col
		} //for row
	} //for s
	vrmlBuilder.push("#VRML V2.0 utf8");
	vrmlBuilder.push("Shape{");
	vrmlBuilder.push(tab+"appearance Appearance{ texture ImageTexture{ url[\"atlas.png\"] } }");
	vrmlBuilder.push(tab+"geometry IndexedFaceSet{");
	vrmlBuilder.push(tab+tab+"coord Coordinate{");
	vrmlBuilder.push(tab+tab+tab+"point[");
	vrmlBuilder.push(pointsBuilder.join("\n"));
	vrmlBuilder.push(tab+tab+tab+"]");
	vrmlBuilder.push(tab+tab+"}");
	vrmlBuilder.push(tab+tab+"coordIndex[");
	vrmlBuilder.push(meshBuilder.join("\n"));
	vrmlBuilder.push(tab+tab+"]");
	vrmlBuilder.push(tab+tab+"texCoord TextureCoordinate{");
	vrmlBuilder.push(tab+tab+tab+"point[");
	vrmlBuilder.push(texmapBuilder.join("\n"));
	vrmlBuilder.push(tab+tab+tab+"]");
	vrmlBuilder.push(tab+tab+"}#TextureCoordinate");
	vrmlBuilder.push(tab+"}#IndexedFaceSet");
	vrmlBuilder.push("}#Shape");
	vrmlBuilder.push("NavigationInfo{ type \"EXAMINE\"}");
	return vrmlBuilder.join("\n");
} //generateVRML1

//Context: photosynth.net
function generateVRML6(surfRes){
	var n = surfRes;
	if(n==null || isNaN(n) || n<1)	n = 1;
	n = parseInt(n);
	var vrmlBuilder = [];
	var tab = "  ";
	vrmlBuilder.push("#VRML V2.0 utf8");
	for(var s=0; s<SIDES.length; s++){
		var pointsBuilder = [], meshBuilder = [], texmapBuilder = [];
		for(var row=0; row<=n; row++){
			for(var col=0; col<=n; col++){
				var a = 2*col/n -1, b = 2*row/n -1;
				var x = a, y = b, z = 1;
				//Use side to adjust orientation
				var index0 = (n+1)*row + col;
				var index1 = index0+1;
				var index2 = index0+(n+1)+1;
				var index3 = index0+n+1;
				if(s==0){		x = 1;	y = a;	z = b;	}
				else if(s==1){	x =-a;	y = 1;	z = b;	}
				else if(s==2){	x =-1;	y =-a;	z = b;	}
				else if(s==3){	x = a;	y =-1;	z = b;	}
				else if(s==4){	x = b;	y = a;	z =-1;	}
				else if(s==5){	x =-b;	y = a;	z = 1;	}
				//Map to sphere
				var mag = Math.sqrt(x*x+y*y+z*z);
				x/=mag;	y/=mag;	z/=mag;
				//Prepare arrays
				pointsBuilder.push(tab+tab+tab+tab+x+" "+y+" "+z+",");
				if(row<n && col<n)
					meshBuilder.push(tab+tab+tab+index0+" "+index1+" "+index2+" "+index3+" -1,");
				texmapBuilder.push(tab+tab+tab+tab+(col/n)+" "+(row/n)+",");
			} //for col
		} //for row
		vrmlBuilder.push("Shape{");
		vrmlBuilder.push(tab+"appearance Appearance{ texture ImageTexture{ url[\""+SIDES[s]+".png\"] } }");
		vrmlBuilder.push(tab+"geometry IndexedFaceSet{");
		vrmlBuilder.push(tab+tab+"coord Coordinate{");
		vrmlBuilder.push(tab+tab+tab+"point[");
		vrmlBuilder.push(pointsBuilder.join("\n"));
		vrmlBuilder.push(tab+tab+tab+"]");
		vrmlBuilder.push(tab+tab+"}");
		vrmlBuilder.push(tab+tab+"coordIndex[");
		vrmlBuilder.push(meshBuilder.join("\n"));
		vrmlBuilder.push(tab+tab+"]");
		vrmlBuilder.push(tab+tab+"texCoord TextureCoordinate{");
		vrmlBuilder.push(tab+tab+tab+"point[");
		vrmlBuilder.push(texmapBuilder.join("\n"));
		vrmlBuilder.push(tab+tab+tab+"]");
		vrmlBuilder.push(tab+tab+"}#TextureCoordinate");
		vrmlBuilder.push(tab+"}#IndexedFaceSet");
		vrmlBuilder.push("}#Shape");
	} //for s
	vrmlBuilder.push("Shape{");
	vrmlBuilder.push("}#Shape");
	vrmlBuilder.push("NavigationInfo{ type \"EXAMINE\"}");
	return vrmlBuilder.join("\n");
} //generateVRML6

//Context: photosynth.net
function fetchTexture(){
	var sides = SIDES;	//All sides
	var sideSelect = parseInt(dom("cmbSides").value);
	if(sideSelect<6)	sides = [SIDES[dom("cmbSides").value]];	//Individual side
	var responseType = dom("cmbResponseType").value;
	var texRes = parseInt(dom("txtImageResolution").value);
	var sphereRes = parseInt(dom("txtSphereResolution").value);
	var strCollectionParams = dom("txtCollectionPaste").value;
	if(!strCollectionParams){
		alert("Insufficient information. Have you completed the above task?");
		return;
	}
	var objCollectionParams = getURLParametersObject(strCollectionParams);
	var strParams = "userscript=true&texRes="+texRes+"&responseType="+responseType;
	//Filter strCollectionParams to use sides wanted
	for(var s=0; s<sides.length; s++)
		strParams += "&"+sides[s]+"="+objCollectionParams[sides[s]];
	var sideCode = objCollectionParams[sides[0]];
	//TODO: See if images ever come from different subdomain (collectionInfoScript could find out)
	var urlAtlasHiRes = "http://cdn3.ps1.photosynth.net/image/"+sideCode+"/"+texRes+"/0_0.jpg"+"?"+strParams;
	dom("frmTexture").src = urlAtlasHiRes;	//Tell the frame to load the proxy image and deploy imageBuildScript
	dom("txtVRML").innerHTML = (sideSelect<6) ? generateVRML6(sphereRes) : generateVRML1(sphereRes);
} //fetchTexture

//Context: photosynth.net
function panoramaPageScript(){
	//Panoramas only
	var collectionInfo = getCollectionInfo();
	if(collectionInfo.CollectionType!="Panorama")
		return;
	log("panoramaPageScript Begin");
	//Collect data
	var urlCollectionJSON = collectionInfo.Url+"?userscript=true";
	var urlHires = getHiresURL();
	var urlAtlas = getAtlasURL();
	//Build new components
	var htmlBuilder = [];
	htmlBuilder.push("<center>");
		htmlBuilder.push("<h1 style='font-family:Verdana; font-size:17px'>Image Data</h1>");
		htmlBuilder.push("<br/>");
		htmlBuilder.push("<div style='border:solid 1px #B4E800; padding:4px; width:90%' >");
			htmlBuilder.push("<img id='imgHires' src='"+urlHires+"' /> <br/>");
			htmlBuilder.push("<img id='imgAtlas' src='"+urlAtlas+"' /> <br/>");
		htmlBuilder.push("</div> <br/>");
		htmlBuilder.push("<div style='border:solid 1px #B4E800; padding:4px; width:90%' >");
			htmlBuilder.push("Side: <select id='cmbSides' style='font-family:Verdana; font-size:10px' title='Select which texture to load' >");
				htmlBuilder.push("<option value='0'>Front</option>");
				htmlBuilder.push("<option value='1'>Right</option>");
				htmlBuilder.push("<option value='2'>Back</option>");
				htmlBuilder.push("<option value='3'>Left</option>");
				htmlBuilder.push("<option value='4'>Bottom</option>");
				htmlBuilder.push("<option value='5'>Top</option>");
				htmlBuilder.push("<option value='6'>All Sides</option>");
			htmlBuilder.push("</select> <br/>");
			htmlBuilder.push("Response Type: <select id='cmbResponseType' style='font-family:Verdana; font-size:10px' title='Select which output method to use' >");
				htmlBuilder.push("<option value='image'>Image</option>");
				htmlBuilder.push("<option value='base64'>Base64</option>");
			htmlBuilder.push("</select> <br/>");
			htmlBuilder.push("Image Resolution: 2^<input id='txtImageResolution' type='text' value='8' style='width:30px; font-family:Verdana; font-size:10px' title='Set higher to search for higher-resolution texture' /> <br/>");
			htmlBuilder.push("Sphere Resolution: <input id='txtSphereResolution' type='text' value='8' style='width:30px; font-family:Verdana; font-size:10px' title='Set to 1 for cube, higher to approximate a sphere' /> <br/>");
		htmlBuilder.push("</div> <br/>");
		htmlBuilder.push("<div style='border:solid 1px #B4E800; padding:4px; width:90%' >");
			htmlBuilder.push("Copy full contents to the next box. (cross-subdomain data acquisition)<br/>");
			htmlBuilder.push("<iframe id='frmCollection' style='width:300px; height:50px; background:#FFFFFF' src='"+urlCollectionJSON+"' title='Copy...' ></iframe>");
			htmlBuilder.push("<textarea id='txtCollectionPaste' style='width:300px; height:50px; font-family:Verdana; font-size:10px; word-wrap:break-word' title='...Paste' ></textarea> <br/>");
			htmlBuilder.push("<a id='btnFetchTexture' type='button' value='' class='buttonTemplate' title='Updates image and VRML code below (May need 2 tries to work properly)' >Fetch Texture</a>");
		htmlBuilder.push("</div> <br/>");
		htmlBuilder.push("<div style='border:solid 1px #B4E800; padding:4px; width:90%' >");
			htmlBuilder.push("Right-click image below to copy/save. <br/>");
			htmlBuilder.push("<iframe id='frmTexture' style='width:512px; height:256px; font-family:Verdana; font-size:10px; word-wrap:break-word; background:#FFFFFF' src='' ></iframe> <br/>");
			htmlBuilder.push("You can use retrieved images as textures for the VRML file. <br/>");
			htmlBuilder.push("<textarea id='txtVRML' style='width:512px; height:256px; font-family:Verdana; font-size:10px; word-wrap:break-word' title='Copy this and save in a VRML file' ></textarea> <br/>");
		htmlBuilder.push("</div> <br/>");
	htmlBuilder.push("</center>");
	dom("titleBar").innerHTML += htmlBuilder.join("\n");	//Apply to document
	dom("btnFetchTexture").onclick = fetchTexture;
	dom("txtVRML").innerHTML = generateVRML("atlas.jpg", dom("txtSphereResolution").value);
	log("panoramaPageScript End");
} //panoramaPageScript



//Context: .json
function collectionInfoScript(){
	//Abort if no userscript
	if(!getURLParameter("userscript"))
		return;
	log("collectionInfoScript Begin");
	try{
		//Parse as JSON
		var html = document.body.childNodes[0].innerHTML;
		var node = JSON.parse(html);
		node = node["l"];
		for(var prop in node)
			if(prop.length>=36)
				node = node[prop];
		var cubeMap = node["x"]["0"]["cubemaps"]["0"];
		//Collect side parameters
		var strParams = "";
		for(var s=0; s<SIDES.length; s++){
			try{
				var url = cubeMap[SIDES[s]]["u"];
				var folders = url.split("/");
				var sideCode = folders[folders.length-2];
				strParams += (strParams?"&":"")+SIDES[s]+"="+sideCode;
			}catch(ex){}
		}
		//Modify document
		document.body.style.fontFamily = "Verdana";
		document.body.style.fontSize = "10px";
		document.body.innerHTML = strParams;
	}catch(ex){
		log("Exception: "+ex);
		document.body.innerHTML = "Failed";
	}
	log("collectionInfoScript End");
} //collectionInfoScript



//Context: .jpg
function prepareImageTable(){
	try{
		var texRes = getURLParameter("texRes");
		if(!texRes)	texRes = 8;
		texRes = parseInt(texRes);
		var imgTable = [];
		//Only load side(s) listed in URL parameters
		var sideCodes = [];
		for(var s=0; s<SIDES.length; s++)
			if( getURLParameter(SIDES[s]) )
				sideCodes.push(getURLParameter(SIDES[s]));
		var n = parseInt(Math.pow(2,texRes-8));	//Number of panels across side
		if(n<1)	n = 1;
		for(var row=0; row<n; row++){
			imgTable[row] = [];
			for(var col=0; col<n; col++){
				for(var s=0; s<sideCodes.length; s++){
					var sideCode = sideCodes[s];
					if(sideCode){
						var img = document.createElement("img");
						//TODO: See if images ever come from different subdomain (collectionInfoScript could find out)
						img.src = URL_IMAGE_BASE+sideCode+"/"+texRes+"/"+col+"_"+row+".jpg";
						imgTable[row][n*s + col] = img;
					} //if
				} //for s
			} //for col
		} //for row
		return imgTable;
	}catch(ex){
		log("Exception: "+ex);
		return null;
	}
} //prepareImageTable

//Context: .jpg
function combineImages(imgTable){
	try{
		var xCols = [], yRows = [];
		var wCombined = 0, hCombined = 0;
		if(imgTable[0]){
			for(var col=0; col<imgTable[0].length; col++){
				try{  	xCols[col] = wCombined;	wCombined += imgTable[0][col].width;	}catch(ex){}
			}
		}
		for(var row=0; row<imgTable.length; row++){
			try{  	yRows[row] = hCombined;	hCombined += imgTable[row][0].height;	}catch(ex){}
		}
		var canvas = document.createElement("canvas");
		canvas.width = wCombined;	canvas.height = hCombined;
		var context = canvas.getContext("2d");
//	var canvas2 = document.createElement("canvas");
//	canvas2.width = 4*hCombined;	canvas2.height = 2*hCombined;
//	var context2 = canvas2.getContext("2d");
//		var xCombined = 0, yCombined = 0;
		for(var row=0; row<imgTable.length; row++){
//			xCombined = 0;
			for(var col=0; col<imgTable[row].length; col++){
				try{
					var img = imgTable[row][col];
					context.drawImage(img, xCols[col],yRows[row]);//xCombined,yCombined);
//					xCombined += imgTable[row][col].width;	//TODO: Find better way to maintain coordinates
				}catch(ex){}
			} //for col
//			yCombined += imgTable[row][0].height;
		} //for row
/*
		for(var x=0; x<4*hCombined; x++){
			for(var y=0; y<2*hCombined; y++){
				var azim = 2*Math.PI*x/(4*hCombined);
				var alti = Math.PI/2 - Math.PI*y/(2*hCombined);
				var rz = Math.cos(alti);
				var px = rz*Math.cos(azim);
				var py = rz*Math.sin(azim);
				var pz = Math.sin(alti);
				var mx = Math.abs(px);
				var my = Math.abs(py);
				var mz = Math.abs(pz);
				var s = 0, a = 0, b = 0;
				if(mx>=my && mx>=mz){
					s = (px>0)?0:2;
					py/=mx;	pz/=mx;	px = 1;
				}else if(my>=mx && my>=mz){
					s = (py>0)?1:3;
					px/=my;	pz/=my;	py = 1;
				}else if(mz>=mx && mz>=my){
					s = (pz>0)?5:4;
					px/=mz;	py/=mz;	pz = 1;
				}
				if(s==0){
					a = (1+py)/2;	b = (1-pz)/2;
				}else if(s==1){
					a = (1-px)/2;	b = (1-pz)/2;
				}else if(s==2){
					a = (1-py)/2;	b = (1-pz)/2;
				}else if(s==3){
					a = (1+px)/2;	b = (1-pz)/2;
				}else if(s==4){
					a = (1+py)/2;	b = (1-px)/2;
				}else if(s==5){
					a = (1+py)/2;	b = (1+px)/2;
				}
				var x0 = parseInt((s+a)*wCombined/6);
				var y0 = parseInt(b*hCombined);
				var data = context.getImageData(x0,y0, 1,1);
				context2.putImageData(data, x,y);
//log(x+","+y+" "+x0+","+y0+" "+s+" "+a+","+b);
			}
if(x%10==0) log(x);
		}
//*/
		return canvas.toDataURL();
	}catch(ex){
		log("Exception: "+ex);
		return null;
	}
} //combineImages

//Context: .jpg
function imageBuildScript(){
	//Abort if no userscript
	if(!getURLParameter("userscript"))
		return;
	log("imageBuildScript Begin");
//	if(document.body.innerHTML.indexOf("BlobNotFound")>=0){	//TODO: What if this side has image, but not in this panel? 
//		document.body.innerHTML = "Resolution unavailable";
//		return;
//	}
	var responseType = getURLParameter("responseType");
	//Clear document
	document.body.style.fontFamily = "Verdana";
	document.body.style.fontSize = "10px";
	document.body.style.wordWrap = "break-word";
	document.body.innerHTML = "Please wait...";
	//Image table/data
	var imgTable = prepareImageTable();
	var data = combineImages(imgTable);
	//Modify document
	if(data && data.length>6){
		var imgCombined = document.createElement("img");
		imgCombined.src = data;
		var title = "";
		for(var s=0; s<SIDES.length; s++)
			if(getURLParameter(SIDES[s]))
				title += (title?",":"")+SIDES[s];
		imgCombined.title = title;
		if(responseType=="base64"){
			document.body.innerHTML = data;
		}else{
			document.body.innerHTML = "";
			document.body.appendChild(imgCombined);
		}
	}else{
		document.body.innerHTML = "Failed (Try again?)";
	}
	log("imageBuildScript End");
} //imageBuildScript

//Begin
var host = window.location.host;
log(window.location.href);
if(window.location.href.indexOf("view.aspx")>0){	//Photosynth page
	panoramaPageScript();
}
else if(window.location.href.indexOf(".json")>0){	//Collection info file
	collectionInfoScript();
}
else if(window.location.href.indexOf(".jpg")>0){	//Image file
	imageBuildScript();
}
//End
