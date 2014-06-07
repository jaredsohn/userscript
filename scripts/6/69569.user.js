// ==UserScript==
// @name           PrismSpore
// @namespace      http://www.spore.com/view/myspore/Digi-P
// @description    Add more Information on Sporepedia Page
// @include        http://www.spore.com/sporepedia*
// ==/UserScript==
// Supported: Firefox 3.06, 3.5.7 & 3.5.8 with Greasemonkey 0.8.20091209.4
// Supported: Google Chrome 7.0.517.44
// Completed Feature
//- Add Comment counter on both Adventure and asset comment box
//- Add Rating Section (Rating, Voting Weight and Worst case change in Rating face) to Asset/Adventure (Some page need to reset)
//- Add Parent Info Section (Parent Name, Parent Analysis Result, Parent Pic, Parent Rating, and Parent Link) to Asset/Adventure (Some page need to reset)
//- Comment Count on both Asset and Adventure
//- Asset Type
//- Add Time Section (Timed Created, MPN Remaining Time and Feature Date) to Asset/Adventure
//- Creature Stat ** Add new GUI
//- Author Info ** Add new GUI
//- Add Adventure Win/Loses
//- Add Sporecast Rating
//- Add Asset Event
//----------------------------Version 1.00 20100315 main------------------------
// Known Issue: mvj not init if the first page is qry=all (Home) pages
//
//----------------------------Version 1.25 20101121 main------------------------
//- Add A mvj checker to see if mvj is presented or not (if yes, Firefox with full feature / if no, Chrome with API feature)
//- Add Sporecast Rating
//- Add Asset Event
//----Developing Note---
//- Comment Box Compatible with Chrome.
//- Rating Called Compatible with Chrome.
//- Parent Section Compatible with Chrome.
//- Comment Count Compatible with Chrome.
//- Asset Type Info Compatible with Chrome. Captain type data is not avalable on Chrome (Played,normal etc.).
//- AdventureWinLoseInformation not available on Chrome.
//- Time Section Compatible with Chrome except featured time.
//- Creature Stat Compatible with Chrome.
//- Author Info Compatible with Chrome. User updated not available on Chrome, Subscriber count max at 500 on Chrome, Creations upload max at 500 on Chrome.
//- Sporecast Rating not available on Chrome.
//- Asset Event available on Chrome.
//- Workaround: mvj not init if the first page is qry=all (Home) pages --> Will use API mode.


// Add check elementID that created from PrismSpore to fix the "double init" bug.
if(document.location.href.lastIndexOf("sporepedia") >= 1 && !document.getElementById("AssetRatingLabel")) {
	var mvj;
	var AutoRefreshRating = true;
	var AutoRefreshParent = true;
	var AutoRefreshCommentCounter = false;
	var Mvj_Mode = true;
// A TempAsset will be used in place of mvj asset data's holder if mvj object is not presented.
	var TempAsset = new Object();  

// The propose of AssetIDKey variable is to prevent double XML fetch during AutoRefreshParent = true (highly reduce workload)
// Use to check if the following ID is not the same when called (Possibly, user select new asset)
	var AssetAdvIDKey = null;
	var AssetIDKey = null;

// Add Waiting for page to load if first page is Asset/Adventure.

	var PrismLoading = document.getElementById("requiredGames");
	var AdvPrismLoading = document.getElementById("advRequiredGames");
	var CastPrismLoading = SporeCastRatingPosition = document.getElementById("sporecastinfo").childNodes[1].childNodes[11];

	addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","PrismSporeLoad",
					 "Waiting for page loaded","...",PrismLoading,"medium","medium","300px",true,null,"300px");
	addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","AdvPrismSporeLoad",
					 "Waiting for page loaded","...",AdvPrismLoading,"medium","medium","300px",true,null,"300px");
	addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","CastPrismSporeLoad",
					 "Waiting for page loaded","...",CastPrismLoading,"medium","medium","10px",true,null,"300px");

// A little fix on Sporecast Rating Margin.
	document.getElementById("CastPrismSporeLoadIconMain").style.marginBottom = "5px";

	FixFooter();
	document.defaultView.addEventListener('load', 
	function(e) { 
		PrismLoading.parentNode.removeChild(document.getElementById("PrismSporeLoadIconMain"));
		AdvPrismLoading.parentNode.removeChild(document.getElementById("AdvPrismSporeLoadIconMain"));
		CastPrismLoading.parentNode.removeChild(document.getElementById("CastPrismSporeLoadIconMain"));

		try {
			mvj = function () { return window.wrappedJSObject.mvj;}
			if (mvj().assetDetail==undefined)
			{
				mvj().initAssetDetail();
			}

			if (mvj().assetAdvDetail==undefined)
			{
				mvj().initAssetAdvDetail();
			}
		}

		catch (err) {Mvj_Mode = false;}

		init();
		FixFooter();

		 }, false);
	}

function init(){
	CreateLayout();
	AddListener();
	if (Mvj_Mode)
	{
		var assetPane = mvj().assetPane;
		var assetDetail = mvj().assetDetail;
		var dataProvider = mvj().dataProvider;
		var sporecastPane = mvj().sporecastPane;
		var userSporecasts = mvj().userSporecasts;

		assetPane.subscribe(assetPane.ASSET_SELECTED_EVENT, mvj().bind(AutoText));
		assetDetail.subscribe(assetDetail.REQUEST_ASSET_RATING_EVENT, mvj().bind(AutoText));
		dataProvider.subscribe(dataProvider.CAPTAIN_ARRIVED_EVENT,mvj().bind(DummyAssetTypeInformation));

		sporecastPane.subscribe(sporecastPane.SPORECAST_SELECTED_EVENT,mvj().bind(sporecastSelected));
		dataProvider.subscribe(dataProvider.SPORECAST_UPDATED_EVENT,mvj().bind(sporecastSelected));
		dataProvider.subscribe(dataProvider.SPORECASTS_ARRIVED_EVENT,mvj().bind(sporecastSelected));
		userSporecasts.subscribe(userSporecasts.SPORECAST_SELECTED_EVENT,mvj().bind(sporecastSelected));

// Add autotext function if the first page is asset/adventure window. 
		if (mvj().assetDetail || mvj().assetAdvDetail){AutoText();}
		if (mvj().sporecastDetail) {updateCastRating(mvj().sporecastDetail.sporecast)}
	}
	else {
		updatedStatLabel("SporeCastRating",document.createTextNode("--Data not available--"));
		XMLFullData();}
}

function CreateLayout(){

	var AssetRatingPosition = document.getElementById("requiredGames");
	var AdvRatingPosition = document.getElementById("advRequiredGames");

	var AssetParentPosition = document.getElementById("asset-description");
	var AdvParentPosition = document.getElementById("advRequiredGames");

	var CommentLengthCount = document.getElementById("commentDesc");
	var CommentAdvLengthCount = document.getElementById("adv-add-comment-button").parentNode;

	var AssetTypePosition = document.getElementById("typeTitle");

	var CommentAllCount = document.getElementById("asset-comments").childNodes[1];

	var AdventureBoardPosition = document.getElementById("top10Title");

	var AssetCreatedPosition = document.getElementById("requiredGames").parentNode;
	var AdvCreatedPosition = document.getElementById("advRequiredGames");

	var AssetAuthorDetailPosition = document.getElementById("requiredGames").parentNode;
	var AdvAuthorDetailPosition = document.getElementById("advRequiredGames");

	var CreatureInfoPosition = document.getElementById("requiredGames").parentNode;
	var AdvEventInfoPosition = document.getElementById("advRequiredGames");

// It's a bit silly call code but "asset-comments" ID are use in both place and getElementById only return the first one.
// Can't use .getElementById("asset-adv-detail").getElementById("asset-comments") to retrive the location for Comments in Adventure screen

	var CommentAdvAllCount = document.getElementById("adv-add-comment-button").parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[5].childNodes[1];

// In SporeCastRatingPosition, the best ChildNode is at [13]. 
// However, from the test, Sometime when Sporecast page doesn't show the thumb, by using childNodes[13], it will cause this position to be shift to the same place as Thumb --> Rate it:Rating: 0 
	var SporeCastRatingPosition = document.getElementById("sporecastinfo").childNodes[1].childNodes[11];


	addStatLabel("ParentHead", "Parent Information: ","",AssetParentPosition,"medium","medium","10px",true);
	addStatLabel("ParentName", "Parent Name: ","<Click Parent Information to refresh>",AssetParentPosition,"small","small","3px",true);
	addStatLabel("ParentType", "Parent Analysis Result: ","<Click Parent Information to refresh>",AssetParentPosition,"small","small","3px",true);

	addStatLabel("AdvParentHead", "Parent Information: ","",AdvParentPosition,"medium","medium","10px",true);
	addStatLabel("AdvParentName", "Parent Name: ","<Click Parent Information to refresh>",AdvParentPosition,"small","small","3px",true);
	addStatLabel("AdvParentType", "Parent Analysis Result: ","<Click Parent Information to refresh>",AdvParentPosition,"small","small","3px",true);
	
	addStatLabel("AssetRating", "Rating: ", "<Click to refresh>",AssetRatingPosition,"medium","medium","10px",true);
	addStatLabel("AdvRating", "Rating: ", "<Click to refresh>",AdvRatingPosition,"medium","medium","10px",true);

	addStatLabel("AssetRatingCycle", "Voting Weight: ", "<Click Rating to refresh>",AssetRatingPosition,"small","small","3px",true);
	addStatLabel("AdvRatingCycle", "Voting Weight: ", "<Click Rating to refresh>",AdvRatingPosition,"small","small","3px",true);

	addStatLabel("AssetRatingCycleWorst", "(On Worst) Rate up will change to: ", "<Click Rating to refresh>",AssetRatingPosition,"small","small","3px",true);
	addStatLabel("AdvRatingCycleWorst", "(On Worst) Rate up will change to: ", "<Click Rating to refresh>",AdvRatingPosition,"small","small","3px",true);

	addSpanStatLabel("AssetType"," <Click to refresh> ",AssetTypePosition,"normal",false);

	addSpanStatLabel("CommentAssetCount"," <Click to count>",CommentAllCount,null,false);
	addSpanStatLabel("CommentAdvCount"," <Click to count>",CommentAdvAllCount,null,false);

	addSpanStatLabel("AdventureWinLoses"," <Click to count>",AdventureBoardPosition,"normal",false);

	addStatLabel("AssetCommentLength", "Remaining character count: ","256",CommentLengthCount,"small","small","10px",true);
	addStatLabel("AdvCommentLength", "Remaining character count: ","256",CommentAdvLengthCount,"small","small","10px",true);

	addStatLabel("AssetTimeHead", "Time: ","",AssetCreatedPosition,"medium","medium","60px",false);
	addStatLabel("AssetCreatedDate", "Upload Time: ","<Click Time to refresh>",AssetCreatedPosition,"small","small","3px",false);
	addStatLabel("AssetMPNSlot", "MPN Remaining Time: ","<Click Time to refresh>",AssetCreatedPosition,"small","small","3px",false);
	addStatLabel("AssetFeaturedDate", "Featured on: ","<Click Time to refresh>",AssetCreatedPosition,"small","small","3px",false);

	addStatLabel("AdvTimeHead", "Time: ","",AdvCreatedPosition,"medium","medium","10px",true);
	addStatLabel("AdvCreatedDate", "Upload Time: ","<Click Time to refresh>",AdvCreatedPosition,"small","small","3px",true);
	addStatLabel("AdvMPNSlot", "MPN Remaining Time: ","<Click Time to refresh>",AdvCreatedPosition,"small","small","3px",true);
	addStatLabel("AdvFeaturedDate", "Featured On: ","<Click Time to refresh>",AdvCreatedPosition,"small","small","3px",true);
	
	addSpanLinkLabel("AssetAuthorStat","javascript:"," <Author Info> ",AssetAuthorDetailPosition,"normal",false);
	addSpanLinkLabel("AdvAuthorStat","javascript:"," <Author Info> ",AdvAuthorDetailPosition,"normal",true);

	addSpanLinkLabel("CreatureStat","javascript:"," <Stat & Event> ",CreatureInfoPosition,"normal",false);
	addSpanLinkLabel("AdvEventStat","javascript:"," <Adventure Event> ",AdvEventInfoPosition,"normal",true);

	addStatLabel("SporeCastRating", "Sporecast Rating: ","<Not Ready>",SporeCastRatingPosition,"medium","medium","10px",true);
	document.getElementById("SporeCastRatingLabel").style.marginBottom = "10px";
	InitHiddenLabel();
}

function AddListener(){
	var AssetRatingPanel = document.getElementById("AssetRatingLabel");
	var AdvRatingPanel = document.getElementById("AdvRatingLabel");

	var AssetParentPanel = document.getElementById("ParentHeadLabel");
	var AdvParentPanel = document.getElementById("AdvParentHeadLabel");

	var AssetTypePanel = document.getElementById("AssetType");

	var AdventureWinLosePanel = document.getElementById("AdventureWinLoses");

	var AssetCommentBox = document.getElementById("add-comment-text");
	var AdvCommentBox = document.getElementById("adv-add-comment-text");
	
	var CommentAll = document.getElementById("CommentAssetCount");
	var CommentAdvAll = document.getElementById("CommentAdvCount");

	var AssetCreatedPanel = document.getElementById("AssetTimeHeadLabel");
	var AdvCreatedPanel = document.getElementById("AdvTimeHeadLabel");

	var AssetAuthorStatPanel = document.getElementById("AssetAuthorStat");
	var AdvAuthorStatPanel = document.getElementById("AdvAuthorStat");

	var CreatureStatPanel = document.getElementById("CreatureStat");
	var AdvEventStatPanel = document.getElementById("AdvEventStat");

// None mvj Panel
	AssetCommentBox.addEventListener('input',
		function(e){
			CommentLengthCalculate(AssetCommentBox, "AssetCommentLength",256);
			return true;
			}, false);

	AdvCommentBox.addEventListener('input',
		function(e){
			CommentLengthCalculate(AdvCommentBox, "AdvCommentLength",256);
			return true;
			}, false);


	CommentAll.addEventListener('click',
		function(e){
			CommentCounter(GetAssetIDAsObject("Asset"),"CommentAssetCount");
			return true;
			}, false);

	CommentAdvAll.addEventListener('click',
		function(e){
			CommentCounter(GetAssetIDAsObject("Adv"),"CommentAdvCount");
			return true;
			}, false);

// Using Other Method to check for mvj
	AssetRatingPanel.addEventListener('click',
		function(e){
			XMLClickEvent("RatingAsset");
			return true;
			}, false);

	AdvRatingPanel.addEventListener('click',
		function(e){
			XMLClickEvent("RatingAdv");
			return true;
			}, false);	

	AssetParentPanel.addEventListener('click',
		function(e){
			XMLClickEvent("ParentAsset");
			return true;
			}, false);
	
	AdvParentPanel.addEventListener('click',
		function(e){
			XMLClickEvent("ParentAdv");
			return true;
			}, false);
	
	AssetTypePanel.addEventListener('click',
		function(e){
			XMLClickEvent("AssetType");
			return true;
			}, false);
		
	AssetCreatedPanel.addEventListener('click',
		function(e){
			XMLClickEvent("AssetCreated");
			return true;
			}, false);

	AdvCreatedPanel.addEventListener('click',
		function(e){
			XMLClickEvent("AdvCreated");
			return true;
			}, false);

// Function that have different call with MVJ
	if (Mvj_Mode)
		{
		AdventureWinLosePanel.addEventListener('click',
			function(e){
				AdventureWinLoseInformation();
				return true;
				}, false);

		AssetAuthorStatPanel.addEventListener('click',
			function(e){
				AuthorInformation(mvj().assetDetail.asset);
				return true;
				}, false);

		AdvAuthorStatPanel.addEventListener('click',
			function(e){
				AuthorInformation(mvj().assetAdvDetail.asset);
				return true;
				}, false);

		CreatureStatPanel.addEventListener('click',
			function(e){
				CreatureInformation(mvj().assetDetail.asset);
				return true;
				}, false);

		AdvEventStatPanel.addEventListener('click',
			function(e){
				CreatureInformation(mvj().assetAdvDetail.asset);
				return true;
				}, false);
		}
//-----------------------------------------------------------------------------
// Function that have different call without MVJ
	else
		{
		window.addEventListener("hashchange",
			function(e){
				RefreshEvent();
				return true;
				}, false);

		AssetAuthorStatPanel.addEventListener('click',
			function(e){
				AuthorXMLFullData();
				return true;
				}, false);

		AdvAuthorStatPanel.addEventListener('click',
			function(e){
				AuthorXMLFullData();
				return true;
				}, false);

		CreatureStatPanel.addEventListener('click',
			function(e){
				if (TempAsset.status == 1){CreatureInformation(TempAsset);}
				return true;
				}, false);

		AdvEventStatPanel.addEventListener('click',
			function(e){
				if (TempAsset.status == 1){CreatureInformation(TempAsset);}
				return true;
				}, false);

//-------------------------------------------------------------------------------
		}

}


//-------------------------------Dealing With XML---------------------------------------

function getAsync(url, finished, FirstArgs, SecondArgs, ThirdArgs) {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(req.readyState == 4)
			finished(req, FirstArgs,SecondArgs,ThirdArgs);
	}
	req.open("GET", url, true);
	req.send(null);
	return true;
}

function XMLErrorHandle(req){
	response = req.responseText;

// Remove Unused Character from String
	for(var a = 0; a <= 8; a++){response = response.replace(RegExp(String.fromCharCode(a),"g"), "");}
	for(var a = 11; a <= 31; a++){response = response.replace(RegExp(String.fromCharCode(a),"g"), "");}
	for(var a = 127; a <= 160; a++){response = response.replace(RegExp(String.fromCharCode(a),"g"), "");}

	var parser = new DOMParser();
	response = parser.parseFromString(response, "text/xml");
	response = response.documentElement;
	return response;

}

function gotAssetDataXml(req, Rating, SecondArgs, ThirdArgs) {
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	status = status[0].firstChild.data;
	if (status == 0){Rating.data = "---Asset Deleted---";}
	else{
	var count = response.getElementsByTagName("rating");
	count = count[0].firstChild.data;
	if (count == -1 || count == -0){count = 0;}
	Rating.data = count;
	}
}

function gotCommentDataXML(req,Counter,SecondArgs, ThirdArgs){
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	status = status[0].firstChild.data;
	if (status == 0){Counter.data = "---Asset Deleted---";}
	else{
	var count = response.getElementsByTagName("length");
	count = count[0].firstChild.data;
	Counter.data = " ("+count+")";
	}
}

function gotParentDataXml(req, ParentName, ParentType, asset){
	var ParentTypeString = "";
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	status = status[0].firstChild.data;
	if (status == 0){
		ParentName.data = "---Parent Deleted---";
		ParentType.data = "---Parent Deleted---";
	}
	else{
	var Name = response.getElementsByTagName("name");
	var authorId = response.getElementsByTagName("authorid");
	var description = response.getElementsByTagName("description");
	var tags = response.getElementsByTagName("tags");
	var Parent = response.getElementsByTagName("parent");
	Name = Name[0].firstChild.data;
	authorId = authorId[0].firstChild.data;
	description = description[0].firstChild.data;
	tags = tags[0].firstChild.data;
	Parent = Parent[0].firstChild.data;
	ParentName.data = Name;
	AuthorName = asset.author.name;
	if (asset.author.id == authorId) {ParentTypeString = ParentTypeString + "[Same Author]";}
	else{
		// This will help distinguish between tagged for ownership or tagged as reward/present/gift. 
		if (Name.toLowerCase().lastIndexOf(AuthorName.toLowerCase()) >= 0 ||description.toLowerCase().lastIndexOf(AuthorName.toLowerCase()) >= 0|| tags.lastIndexOf(AuthorName.toLowerCase()) >= 0) {ParentTypeString = ParentTypeString + "[To User]";}
	}
	
	if (Name.search(/Template/i) >= 0 ||description.search(/Template/i) >= 0|| tags.search(/Template/i) >= 0) {ParentTypeString = ParentTypeString + "[Template]";}
	if (Name.search(/GAProp/i) >= 0 ||description.search(/GAProp/i) >= 0|| tags.search(/GAProp/i) >= 0) {ParentTypeString = ParentTypeString + "[GAProp]";}
	if (Name.search(/Contest/i) >= 0 || Name.search(/Challenge/i) >= 0 || description.search(/Contest/i) >= 0 || description.search(/Challenge/i) >= 0 || tags.search(/Contest/i) >= 0 || tags.search(/Challenge/i) >= 0) {ParentTypeString = ParentTypeString + "[Contest/Challenge]";}

	if (ParentTypeString == "") {ParentTypeString = ParentTypeString + "[Please Check the Lineage]";}
	if (Parent!= "NULL") {ParentTypeString = ParentTypeString + "[Multi-Parent]";}
	ParentType.data = ParentTypeString;

	// Add Parent Picture
	var author = response.getElementsByTagName("author")[0].firstChild.data;
	IDPath = asset.parentId.toString();
	ImgPath = "http://www.spore.com/static/thumb/"+IDPath.substring(0, 3)+"/"+IDPath.substring(3, 6)+"/"+IDPath.substring(6, 9)+"/"+IDPath+".png";

	if (asset.type == "ADVENTURE"){		
		CreateAssetSummaryDataPanel("AdvParentPic",document.getElementById("AdvParentTypeLabel"),response,"adventure",ImgPath,author,authorId,asset.parentId,
						"See Parent Creation",false,true,true);}

	else{
		CreateAssetSummaryDataPanel("AssetParentPic",document.getElementById("ParentTypeLabel"),response,"creature",ImgPath,author,authorId,asset.parentId,
						"See Parent Creation",false,true,true);}
	FixFooter();
	}
}

function gotCreatureDataXml(req,Asset,divMain, ThirdArgs){
	divMain.removeChild(document.getElementById("CreatureInfoWaitIconMain"));
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	status = status[0].firstChild.data;
	if (status == 0){addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-383px -63px","CreatureInfoDelete",
							 "Can't solve "+Asset.name+"'s DNA Code: ","<Creature Deleted>",divMain,"medium","medium","3px",false,null,"700px");}
	else{
	var cost = response.getElementsByTagName("cost")[0].firstChild.data;
	var health = parseInt(response.getElementsByTagName("health")[0].firstChild.data);
	var height = response.getElementsByTagName("height")[0].firstChild.data;
	var meanness = parseFloat(response.getElementsByTagName("meanness")[0].firstChild.data);
	var cuteness = parseFloat(response.getElementsByTagName("cuteness")[0].firstChild.data);
	var sense = parseInt(response.getElementsByTagName("sense")[0].firstChild.data);
	var bonecount = parseInt(response.getElementsByTagName("bonecount")[0].firstChild.data);
	var footcount = parseInt(response.getElementsByTagName("footcount")[0].firstChild.data);
	var graspercount = parseInt(response.getElementsByTagName("graspercount")[0].firstChild.data);
	var carnivore = parseInt(response.getElementsByTagName("carnivore")[0].firstChild.data);
	var herbivore = parseInt(response.getElementsByTagName("herbivore")[0].firstChild.data);
	var glide = parseInt(response.getElementsByTagName("glide")[0].firstChild.data);
	var sprint = parseInt(response.getElementsByTagName("sprint")[0].firstChild.data);
	var stealth = parseInt(response.getElementsByTagName("stealth")[0].firstChild.data);
	var bite = parseInt(response.getElementsByTagName("bite")[0].firstChild.data);
	var charge = parseInt(response.getElementsByTagName("charge")[0].firstChild.data);
	var strike = parseInt(response.getElementsByTagName("strike")[0].firstChild.data);
	var spit = parseInt(response.getElementsByTagName("spit")[0].firstChild.data);
	var sing = parseInt(response.getElementsByTagName("sing")[0].firstChild.data);
	var dance = parseInt(response.getElementsByTagName("dance")[0].firstChild.data);
	var gesture = parseInt(response.getElementsByTagName("gesture")[0].firstChild.data);
	var posture = parseInt(response.getElementsByTagName("posture")[0].firstChild.data);
	var matingCall = 1;
	var grasper = 0;
	if (graspercount > 0){grasper = 1;}
	var TotalAbility = glide + sprint + stealth + sense + matingCall + grasper;
	var TotalAttack = bite + charge + strike + spit;
	var TotalSocial = sing + dance + gesture + posture;
	var MaxAttack = Math.max(bite,charge,strike,spit);
	var MaxSocial = Math.max(sing,dance,gesture,posture);

	//For choosing Pic
	var FacePic = ["0px -87px","-23px -87px","-47px -87px","-71px -87px","-95px -87px",];
	var MeterPic = ["-121px -88px","-169px -88px","-217px -88px","-264px -88px","-313px -88px",]

	divStat = document.createElement("div");
	divMain.appendChild(divStat);
	divStat.id="CommonStatSection";

// Common Stat.
	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","0px -63px","CommonHeaderInfo",
				"Common Statistic","",divStat,"medium","medium","3px",false,null,"200px");
	// Carnivore = 1, Omnivore = 0, herbivore = -1
	switch(carnivore - herbivore){
		case 1:
			addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","MouthTypeInfo",
					"Diet: ","Carnivore",divStat,"small","small","3px",false,"25px","200px");
			break;
		case -1:
			addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","MouthTypeInfo",
					"Diet: ","Herbivore",divStat,"small","small","3px",false,"25px","200px");
			break;
		default:
			addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","MouthTypeInfo",
					"Diet: ","Omnivore",divStat,"small","small","3px",false,"25px","200px");	
	}

	addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","DNACostInfo",
					"DNA Cost: ",cost,divStat,"small","small","3px",false,"25px","200px");

	addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","HeightInfo",
					"Height: ",height,divStat,"small","small","3px",false,"25px","200px");

	if (health > 0) {	
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","HealthInfo",
					"Health: +",health,divStat,"small","small","3px",false,"25px","200px");}

	addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","BoneInfo",
					"Bones: ",bonecount,divStat,"small","small","3px",false,"25px","200px");

	if (graspercount > 0) {	
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","GrasperCountInfo",
					"Hands: ",graspercount,divStat,"small","small","3px",false,"25px","200px");}
	if (footcount > 0) {	
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","FootCountInfo",
					"Feet: ",footcount,divStat,"small","small","3px",false,"25px","200px");}
	if (cuteness > meanness){
		addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-155px -264px","CuteMeanHeaderInfo",
					"Creature's Appearance: ","Cute",divStat,"small","small","7px",false,"25px","200px");}
	if (cuteness == meanness){
		addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-155px -264px","CuteMeanHeaderInfo",
					"Creature's Appearance: ","Balance",divStat,"small","small","7px",false,"25px","200px");}
	if (cuteness < meanness){
		addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-155px -264px","CuteMeanHeaderInfo",
					"Creature's Appearance: ","Mean",divStat,"small","small","7px",false,"25px","200px");}
	if (cuteness > 0) {	
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","CutenessInfo",
					"Cuteness Point: ",cuteness,divStat,"small","small","3px",false,"50px","200px");}
	if (meanness > 0) {	
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","MeannessInfo",
					"Meanness Point: ",meanness,divStat,"small","small","3px",false,"50px","200px");}

	divStat = document.createElement("div");
	divMain.appendChild(divStat);
	divStat.id="MainStatSection";
	divStat.style.marginTop = "-" + (divMain.clientHeight+10)+"px";
	divStat.style.marginLeft = "425px";
	
	
// Ability Stat
	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-287px -63px","AbilityHeaderInfo",
				"Abilities Statistic Point: ",TotalAbility,divStat,"medium","medium","10px",false,null,"300px");

	if (glide > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[glide-1],"GlideInfo",
					"Glide Level: ",glide,divStat,"small","small","3px",false,"25px","300px");}
	if (sprint > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[sprint-1],"SprintInfo",
					"Sprint Level: ",sprint,divStat,"small","small","3px",false,"25px","300px");}
	if (stealth > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[stealth-1],"StealthInfo",
					"Sneak Level: ",stealth,divStat,"small","small","3px",false,"25px","300px");}

		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[0],"MatingCallInfo",
					"Mating Call","",divStat,"small","small","3px",false,"25px","300px");

	if (grasper > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[0],"GraspersAbilityInfo",
					"Graspers","",divStat,"small","small","3px",false,"25px","300px");}
	if (sense > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[0],"SightAbilityInfo",
					"Sight","",divStat,"small","small","3px",false,"25px","300px");}

		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","JumpInfo",
					"Jump Level: ","DNA Information Missing",divStat,"small","small","3px",false,"55px","300px");

// Attack Stat
	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-216px -63px","AttackHeaderInfo",
					"Attacks Statistic Point: ",TotalAttack,divStat,"medium","medium","10px",false,null,"300px");

	if (bite > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[bite-1],"BiteInfo",
					"Bite Level: ",bite,divStat,"small","small","3px",false,"25px","300px");}
	if (charge > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[charge-1],"ChargeInfo",
					"Charge Level: ",charge,divStat,"small","small","3px",false,"25px","300px");}
	if (strike > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[strike-1],"StrikeInfo",
					"Strike Level: ",strike,divStat,"small","small","3px",false,"25px","300px");}
	if (spit > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[spit-1],"SpitInfo",
					"Spit Level: ",spit,divStat,"small","small","3px",false,"25px","300px");}

// Social Stat
	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-262px -63px","SocialHeaderInfo",
				"Socials Statistic Point: ",TotalSocial,divStat,"medium","medium","10px",false,null,"300px");

	if (sing > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[sing-1],"SingInfo",
					"Sing Level: ",sing,divStat,"small","small","3px",false,"25px","300px");}
	if (dance > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[dance-1],"DanceInfo",
					"Dance Level: ",dance,divStat,"small","small","3px",false,"25px","300px");}
	if (gesture > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[gesture-1],"CharmInfo",
					"Charm Level: ",gesture,divStat,"small","small","3px",false,"25px","300px");}
	if (posture > 0) {	
		addStatWithIconLabel("46px","24px","/static/war/images/sporepedia/adv/mySporeSprite.png",MeterPic[posture-1],"PoseInfo",
					"Pose Level: ",posture,divStat,"small","small","3px",false,"25px","300px");}

// Possible ArchType Stat according to http://www.spore.com/comm/tutorials/archetypes
	if(Asset.assetFunction == "CREATURE" || Asset.assetFunction == "0x9ea3031a"){

		divStat = document.createElement("div");
		divMain.appendChild(divStat);
		divStat.id="ArcheStatSection";
	
		divStat.style.marginTop = (-(document.getElementById("MainStatSection").clientHeight-document.getElementById("CommonStatSection").clientHeight)+20)+"px";

		addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-260px -3px","PossibleArchTypeInfo",
					"Possible Archetype","",divStat,"medium","medium","10px",false,null,"300px");
		
		addStatWithIconLabel("30px","30px","/static/war/images/achievements/0x0cc8b2c9!0x064d2514.png","-7px -22px","PossibleArchTypeCreatureInfo",
					"In Creature Stage","",divStat,"small","small","7px",false,"25px","300px");

		PossibleCRG = "";

		if (herbivore == 1){
		// Checking as Social
			if(cost <= 145 && TotalSocial == 1 &&  strike+graspercount == 0 && TotalAttack <=3 && MaxAttack <= 1 && health <= 2) 
				{addStatWithIconLabel("20px","20px","/static/war/images/sporepedia/adv/mySporeSprite.png","-60px -340px","EarlySocialInfo",
							"","Early Level Social",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + "\r\n\t - Early Level Social";}

			if(TotalSocial <=8 && TotalSocial >=2 && TotalAttack <=12 && MaxAttack <=3 && MaxSocial <=2 && health <=3) 
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[2],"LowSocialInfo",
							"","Low Level Social",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - Low Level Social";}

			if(Math.max(TotalAttack,TotalSocial) <=16 && TotalSocial >=5 && Math.max(MaxAttack,MaxSocial) <=4)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[1],"MediumSocialInfo",
							"","Medium Level Social",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - Medium Level Social";}

			if(TotalSocial >=11)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[0],"HighSocialInfo",
							"","High Level Social",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - High Level Social";}
		}

		if(carnivore == 1){
		// Checking as Combat Type

			if(cost <= 145 && TotalSocial <= 2 && sing == 1 && (dance+posture+strike)+graspercount == 0 && TotalAttack <= 3 && MaxAttack <= 1 && health <= 2) 
				{addStatWithIconLabel("20px","20px","/static/war/images/sporepedia/adv/mySporeSprite.png","-60px -340px","EarlyCombatInfo",
							"","Early Level Combat",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + "\r\n\t - Early Level Combat";}

			if(Math.max(TotalAttack,TotalSocial) <=12 && TotalAttack >=2 && Math.max(MaxAttack,MaxSocial) <=3 && health <=3) 
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[2],"LowCombatInfo",
							"","Low Level Combat",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - Low Level Combat";}

			if(Math.max(TotalAttack,TotalSocial) <=16 && TotalAttack >=5 && Math.max(MaxAttack,MaxSocial) <=4) 
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[3],"MediumCombatInfo",
							"","Medium Level Combat",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - Medium Level Combat";}

			if(TotalAttack >=11)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[4],"HighCombatInfo",
							"","High Level Combat",divStat,"small","small","3px",false,"50px","300px");
				PossibleCRG = PossibleCRG + " \r\n\t - High Level Combat";}
		}

		// Checking as Predator Type
		if(carnivore == 1 && TotalAttack <= 12 && TotalAttack >=2 && MaxAttack <=3) 
			{addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-291px -3px","PredatorInfo",
					"","Night Predator",divStat,"small","small","7px",false,"50px","300px");
			PossibleCRG = PossibleCRG + " \r\n\t - Night Predator";}

		// Check for MiniBoss
		if(Math.min(TotalSocial,TotalAttack) >=12 && Math.min(charge,strike,spit,dance,gesture,posture) >= 3) 
			{addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-323px -3px","MiniBossInfo",
					"","Rogue Creature",divStat,"small","small","7px",false,"50px","300px");
			PossibleCRG = PossibleCRG + " \r\n\t - Rogue Creature";}

		// Check for Epic
		if(carnivore == 1 && cost >= 200 && footcount >= 1) 
			{addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_creature.png","0px 0px","EpicCreatureInfo",
						"","Epic Creature",divStat,"small","small","3px",false,"50px","300px");
			PossibleCRG = PossibleCRG + " \r\n\t - Epic Creature";}

		// if none of the above
		if(PossibleCRG == ""){
			addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-182px -342px","CreatureNotInfo",
						"","Can't be specific",divStat,"small","small","3px",false,"50px","300px");}

	// Tribal Stage Check
		addStatWithIconLabel("30px","30px","/static/war/images/achievements/0x0cc8b2c9!0x20000004.png","-15px -25px","PossibleArchTypeTribeInfo",
					"In Tribal Stage","",divStat,"small","small","7px",false,"25px","300px");
		
		PossibleTRG = "";

	// Checking Starter Creature
		if (cost <=145 && (dance+posture+strike)+graspercount+health == 0 && footcount >=1 && TotalSocial <= 2 && sing == 1 && TotalAttack <= 3 && MaxAttack <=1)
			{addStatWithIconLabel("20px","20px","/static/war/images/sporepedia/adv/mySporeSprite.png","-60px -340px","EarlyTribeInfo",
							"","Early Creature",divStat,"small","small","3px",false,"50px","300px");
			PossibleTRG = PossibleTRG + " \r\n\t - Early Creature";}

		if(carnivore == herbivore){
			if(TotalAttack <=12 && TotalAttack >=2 && MaxAttack <=3)
				{addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-359px -63px","ScavengerInfo",
							"","Scavenger",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + "\r\n\t - Scavenger";}
		}

		if (graspercount >= 1 && footcount >=1)
			{addStatWithIconLabel("26px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-311px -63px","TribeCreatureInfo",
						"","Tribal Creature",divStat,"small","small","3px",false,"50px","300px");
			PossibleTRG = PossibleTRG + " \r\n\t - Tribal Creature";}
	
		if(herbivore == 1){
		// Check for Prey
			if (TotalSocial >=2 && TotalAttack <=12 && MaxAttack <=3)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[2],"LowPreyInfo",
							"","Low Level Prey",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + " \r\n\t - Low Level Prey";}
	
			if (TotalSocial >=5 && TotalAttack <=16 && MaxAttack <=4)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[1],"MediumPreyInfo",
							"","Medium Level Prey",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + " \r\n\t - Medium Level Prey";}

			if (TotalSocial >=11)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[0],"HighPreyInfo",
							"","High Level Prey",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + " \r\n\t - High Level Prey";}
		}

		if(carnivore == 1){
		// Check for Predator
			if(TotalAttack >=11)
				{addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[4],"PredatorTrInfo",
							"","Predator",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + " \r\n\t - Predator";}

			if (cost >=200 && footcount >=1) 
				{addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_creature.png","0px 0px","EpicCreatureTrInfo",
							"","Epic Creature",divStat,"small","small","3px",false,"50px","300px");
				PossibleTRG = PossibleTRG + " \r\n\t - Epic Creature";}
		}
	
	// if none of the above --> In-Game Random
		if(PossibleTRG == ""){
			addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-182px -342px","TribeNotInfo",
						"","Can't be specific",divStat,"small","small","3px",false,"50px","300px");}
		}
	}


	addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","CreatureInfoWait",
				"Resolving "+Asset.name+"'s Event Mystery","...",divMain,"medium","medium","3px",false,null,"800px");
}

function gotSubscriberDataXml(req,Asset,divMain, ThirdArgs){
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}
	SubCount = response.getElementsByTagName("count")[0].firstChild.data;

	if (SubCount == 500){updatedStatLabel("SubscribeInfo",document.createTextNode(">=" + SubCount));}
	else{updatedStatLabel("SubscribeInfo",document.createTextNode(SubCount));}
}

function gotAuthorAssetDataXml(req,Asset,divMain, ThirdArgs){
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	divMain.removeChild(document.getElementById("AuthorInfoWaitIconMain"));
	TotalAsset =  parseInt(response.getElementsByTagName("count")[0].firstChild.data);

	if (!Mvj_Mode){
		if (TotalAsset == 500) {updatedStatLabel("CreationUploadedInfo",document.createTextNode(">=" + TotalAsset));}
		else {updatedStatLabel("CreationUploadedInfo",document.createTextNode(TotalAsset));}
	}

	TheAsset = response.getElementsByTagName("asset");
	CreatureCount = 0; BuildingCount = 0; VehicleCount = 0; UFOCount = 0; AdventureCount = 0;
	var HighCreature; var HighBuilding; var HighVehicle; var HighUFO; var HighAdventure;
	Original = 0; Template = 0; Contest = 0; GAProp = 0;
	for(var a = 0; a < TheAsset.length; a++){
		if (!Mvj_Mode && a == 0){updatedStatLabel("LCreationUploadInfo",document.createTextNode(formatDateTimeShort(ChangeXMLToDateFormat(TheAsset[a].getElementsByTagName("created")[0].firstChild.data))));}

		var AssetRating = parseFloat(TheAsset[a].getElementsByTagName("rating")[0].firstChild.data);

		if(TheAsset[a].getElementsByTagName("parent")[0].firstChild.data == "NULL"){Original = Original + 1;}

		switch(TheAsset[a].getElementsByTagName("type")[0].firstChild.data){
		case "CREATURE":
			CreatureCount = CreatureCount + 1;
			if (AssetRating > 0 && HighCreature == undefined) {HighCreature = TheAsset[a];} 
			if (HighCreature != undefined){
				if (AssetRating > parseFloat(HighCreature.getElementsByTagName("rating")[0].firstChild.data)){HighCreature = TheAsset[a];}	
			}
			break;
	
		case "BUILDING":
			BuildingCount = BuildingCount + 1;
			if (AssetRating > 0 && HighBuilding == undefined) {HighBuilding = TheAsset[a];} 
			if (HighBuilding != undefined){
				if (AssetRating > parseFloat(HighBuilding.getElementsByTagName("rating")[0].firstChild.data)){HighBuilding = TheAsset[a];}	
			}
			break;
		
		case "VEHICLE":
			VehicleCount = VehicleCount + 1;
			if (AssetRating > 0 && HighVehicle == undefined) {HighVehicle = TheAsset[a];} 
			if (HighVehicle != undefined){
				if (AssetRating > parseFloat(HighVehicle.getElementsByTagName("rating")[0].firstChild.data)){HighVehicle = TheAsset[a];}	
			}
			break;

		case "UFO":
			UFOCount = UFOCount + 1;
			if (AssetRating > 0 && HighUFO == undefined) {HighUFO = TheAsset[a];} 
			if (HighUFO != undefined){
				if (AssetRating > parseFloat(HighUFO.getElementsByTagName("rating")[0].firstChild.data)){HighUFO = TheAsset[a];}	
			}
			break;

		case "ADVENTURE":
			AdventureCount = AdventureCount + 1;
			if (AssetRating > 0 && HighAdventure == undefined) {HighAdventure = TheAsset[a];} 
			if (HighAdventure != undefined){
				if (AssetRating > parseFloat(HighAdventure.getElementsByTagName("rating")[0].firstChild.data)){HighAdventure = TheAsset[a];}	
			}
			break;

		}
		var Name = TheAsset[a].getElementsByTagName("name")[0].firstChild.data;
		var description = TheAsset[a].getElementsByTagName("description")[0].firstChild.data;
		var tags = TheAsset[a].getElementsByTagName("tags")[0].firstChild.data;
		if (Name.search(/Template/i) >= 0 ||description.search(/Template/i) >= 0|| tags.search(/Template/i) >= 0) {Template = Template + 1;}
		if (Name.search(/GAProp/i) >= 0 ||description.search(/GAProp/i) >= 0|| tags.search(/GAProp/i) >= 0) {GAProp = GAProp + 1;}
		if (Name.search(/Contest/i) >= 0 || Name.search(/Challenge/i) >= 0 || description.search(/Contest/i) >= 0 || 
			description.search(/Challenge/i) >= 0 || tags.search(/Contest/i) >= 0 || tags.search(/Challenge/i) >= 0) {Contest = Contest + 1;}

	}
	var FacePic = ["0px -87px","-23px -87px","-47px -87px"];
	divStat = document.createElement("div");
	divMain.appendChild(divStat);
	divStat.id="OverAllAssetSection";
	divStat.style.marginTop = "-185px";
	divStat.style.marginLeft = "600px";

	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-163px -3px","AssetCountInfo",
							TotalAsset +" Latest Creations Statistic","",divStat,"medium","medium","7px",false,null,"240px");
// All Asset Count
	if (CreatureCount > 0) {addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_creature.png","0px 0px","CreatureCountInfo",
							"Creature: ",CreatureCount,divStat,"small","small","3px",false,"25px","150px");}
	if (BuildingCount > 0) {addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_building.png","0px 0px","BuildingCountInfo",
							"Building: ",BuildingCount,divStat,"small","small","3px",false,"25px","150px");}
	if (VehicleCount > 0) {addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_vehicle.png","0px 0px","VehicleCountInfo",
							"Vehicle: ",VehicleCount,divStat,"small","small","3px",false,"25px","150px");}
	if (UFOCount > 0) {addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_ufo.png","0px 0px","UFOCountInfo",
							"Spaceship: ",UFOCount,divStat,"small","small","3px",false,"25px","150px");}
	if (AdventureCount > 0) {addStatWithIconLabel("32px","32px","/static/war/images/icons/filter_adventure.png","0px 0px","AdventureCountInfo",
							"Adventure: ",AdventureCount,divStat,"small","small","3px",false,"25px","150px");}
	if (Original > 0) {addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-323px -3px","OriginalCountInfo",
							"Original Creation: ",Original,divStat,"small","small","15px",false,"25px","150px");}
	if (Contest > 0) {addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-418px -3px","ContestCountInfo",
							"Contest Related: ",Contest,divStat,"small","small","3px",false,"25px","150px");}
	if (Template > 0) {addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png","-167px -63px","TemplateCountInfo",
							"Template Related: ",Template,divStat,"small","small","3px",false,"25px","150px");}
	if (GAProp > 0) {addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-190px -63px","GAPropCountInfo",
							"GAProp: ",GAProp,divStat,"small","small","3px",false,"25px","150px");}

	divStat = document.createElement("div");
	divMain.appendChild(divStat);
	divStat.id="TopAssetSection";
	divStat.style.marginTop = (-(document.getElementById("OverAllAssetSection").clientHeight-document.getElementById("AuthorCommonSection").clientHeight)+20)+"px";
	divStat.style.marginLeft = "2px";
	divStat.style.width = "800px";

	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-366px -35px","HighAssetInfo",
				"Top Rated Creation in each catagories","",divStat,"medium","medium","3px",false,null,"500px");
	if (HighCreature == undefined && HighBuilding == undefined && HighVehicle == undefined && HighUFO == undefined && HighAdventure == undefined){
		addStatWithIconLabel("15px","18px","/static/war/images/sporepedia/adv/mySporeSprite.png","-179px -305px","NoHigh",
					"No Rated Creation in "+TotalAsset+ " Latest Creations","",divStat,"medium","medium","3px",false,"30px","400px");
	}

	if(HighCreature != undefined){
		CreateAssetSummaryDataPanel("HighCreature",divStat,HighCreature,"creature",HighCreature.getElementsByTagName("thumb")[0].firstChild.data,											Asset.author.screenName,Asset.author.id,HighCreature.getElementsByTagName("id")[0].firstChild.data,"See This Creation",true,true,true);
	}

	if(HighBuilding != undefined){
		CreateAssetSummaryDataPanel("HighBuilding",divStat,HighBuilding,"building",HighBuilding.getElementsByTagName("thumb")[0].firstChild.data,											Asset.author.screenName,Asset.author.id,HighBuilding.getElementsByTagName("id")[0].firstChild.data,"See This Creation",true,true,true);
	}

	if(HighVehicle != undefined){
		CreateAssetSummaryDataPanel("HighVehicle",divStat,HighVehicle,"vehicle",HighVehicle.getElementsByTagName("thumb")[0].firstChild.data,												Asset.author.screenName,Asset.author.id,HighVehicle.getElementsByTagName("id")[0].firstChild.data,"See This Creation",true,true,true);
	}

	if(HighUFO != undefined){
		CreateAssetSummaryDataPanel("HighUFO",divStat,HighUFO,"ufo",HighUFO.getElementsByTagName("thumb")[0].firstChild.data,														Asset.author.screenName,Asset.author.id,HighUFO.getElementsByTagName("id")[0].firstChild.data,"See This Creation",true,true,true);
	}

	if(HighAdventure != undefined){
		CreateAssetSummaryDataPanel("HighAdventure",divStat,HighAdventure,"adventure",HighAdventure.getElementsByTagName("thumb")[0].firstChild.data,											Asset.author.screenName,Asset.author.id,HighAdventure.getElementsByTagName("id")[0].firstChild.data,"See This Creation",true,true,true);
	}
}

//----------------------------------Event Feed Handle---------------------------------------------
//

function gotEventFeed(req,Asset,divMain, ThirdArgs){
	divMain.removeChild(document.getElementById("CreatureInfoWaitIconMain"));

	divEvent = document.createElement("div");
	divMain.appendChild(divEvent);
	divEvent.id="EventHeader";
	MarginHead = "25px";

	if (Asset.type != "CREATURE") {
		MarginHead = "5px";
		if (Asset.type != "ADVENTURE"){ addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-67px -3px","NoStatHead",
				 "This creation does not have the DNA to extract any statistic data.","",divEvent,"medium","medium","10px",false,null,"700px");}
		
	}

	addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-192px -3px","EventHead",
				 "Recent Events on this creation.","",divEvent,"medium","medium",MarginHead,false,null,"700px");

	var parser = new DOMParser();
	var response = req.responseXML || parser.parseFromString(req.responseText, "application/xml");
	var response = response.documentElement;

	var entries = response.getElementsByTagName("entry");

	divEvent = document.createElement("div");
	divMain.appendChild(divEvent);
	divEvent.id="EventSection";

	if (entries[0]){

		for(var a = 0; a < entries.length; a++) {

			entryid = entries[a].getElementsByTagName("id")[0].firstChild.data;
			entryDateTime = formatDateTimeShort(ChangeXMLToDateFormat(entries[a].getElementsByTagName("published")[0].firstChild.data));
			eventContent = entries[a].getElementsByTagName("content")[0].firstChild.data;

			if (entryid >= 32) {ImagePosition = "-145px -342px";}
			else {ImagePosition = "0px 0px";}
			addStatWithIconLabel("20px","20px",getImageSrcFromEventId(entryid),ImagePosition,"Event"+a+"VALUE_AS_INNERHTML",
							 "",entryDateTime + ": " +eventContent,divEvent,"small","small","3px",false,"25px","700px");
		}
	}
	else {addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-383px -63px","NoEvent",
							 "---No Event for this creation---","",divEvent,"small","small","3px",false,"25px","700px");}

}

//------------------------------Event id image----------------------------------------------------------------
// This function credit to misterhaan for finding the event id.
function getImageSrcFromEventId(entryid) {
  switch(entryid) {
	case "1":   // switched to creation avatar  
	case "2":   // switched to custom avatar  
        	return "/static/war/images/icons/spd_IconAvatar.png";  
	case "3":   // added buddy  
		return "/static/war/images/icons/spd_IconBuddy.png";  
	case "4":   // created sporecast  
		return "/static/war/images/icons/spd_IconNewSporecast.png";  
	case "5":   // commented  
		return "/static/war/images/icons/spd_IconCommentsEvent.png";  
	case "7":   // earned achievement  
	return "/static/war/images/icons/spd_IconAchievement.png";  
	case "8":   // completed cell stage  
	case "9":   // killed cells  
	case "10":  // died in cell  
		return "/static/war/images/icons/spd_IconEventCLG.png";  
	case "11":  // extincted  
	case "12":  // befriended  
	case "13":  // epicized in creature  
	case "14":  // added to posse  
		return "/static/war/images/icons/spd_IconEventCRG.png";  
	case "15":  // epicized in tribe  
	case "16":  // killed epic in tribe  
	case "17":  // domesticated  
	case "18":  // lost tribe stage  
	case "19":  // won tribe stage  
		return "/static/war/images/icons/spd_IconEventTRG.png";  
	case "20":  // charmed epic  
	case "21":  // captured  
	case "22":  // used superweapon  
	case "24":  // won civilization stage  
		return "/static/war/images/icons/spd_IconEventCVG.png";  
	case "25":  // epicized in space  
	case "26":  // eradicated  
	case "27":  // added to fleet  
	case "28":  // formed alliance  
	case "29":  // declared war
		return "/static/war/images/icons/spd_IconEventSPG.png";  
	case "32":  // won gold trophy  
	case "33":  // lost gold trophy  
	case "34":  // won silver trophy  
	case "35":  // lost silver trophy  
	case "36":  // won bronze trophy  
	case "37":  // lost bronze trophy
		return "/static/war/images/sporepedia/adv/mySporeSprite.png";
	default:
	// If the ID is not listed in this section, return some pic to prevent any error.
		return "/static/war/images/icons/spd_IconNewSporecast.png";
  }
}
//------------------------------------Add and update text-------------------------------------------------
//

function addStatWithIconLabel(IconWidth,IconHeight,IconPath,IconBPosition,id, label, value, uploaded, spanFontSize, divFontSize,divMarginTop,AddBefore,indent,width){
	div= document.createElement("div");
	div.id= id+"IconMain";
	div.style.width = IconWidth;
	div.style.height = IconHeight;
	div.style.backgroundColor = "transparent";
	div.style.backgroundImage = "url("+IconPath+")";
	div.style.backgroundPosition = IconBPosition;
	if (AddBefore) {uploaded.parentNode.insertBefore(div, uploaded);}
	else {uploaded.appendChild(div);}
	
	if (indent != null) {div.style.marginLeft = indent;}

	addStatLabel(id, label, value, div, spanFontSize, divFontSize,divMarginTop,false);
	RePosition = document.getElementById(id+"Label");
	RePosition.style.width = width;
	RePosition.style.marginLeft = Number(IconWidth.substring(0,IconWidth.length-2))+3+"px";
	RePosition.style.paddingTop = "5px";
}

function addStatLabel(id, label, value, uploaded, spanFontSize, divFontSize,divMarginTop,AddBefore) {
// Special string in id
// if id contain "VALUE_AS_INNERHTML", this function will apply value directly with span.innerHTML

	var span = document.createElement("span");
  	span.id = id;

	if (id.search("VALUE_AS_INNERHTML") != -1) {span.innerHTML = value;}
	else {span.appendChild(document.createTextNode(value));}

	span.style.fontSize = spanFontSize;
	span.style.fontWeight = "normal";
  	var div = document.createElement("div");
  	div.id = id + "Label";
	div.style.marginTop = divMarginTop;
  	div.appendChild(document.createTextNode(label));
	div.style.fontSize = divFontSize;
	div.style.fontWeight = "bold";
  	div.appendChild(span);
	if (AddBefore) {uploaded.parentNode.insertBefore(div, uploaded);}
	else {uploaded.appendChild(div);}

}

function addSpanStatLabel(id, value, uploaded,spanfontWeight,AddBefore) {
  	var span = document.createElement("span");
  	span.id = id;
  	span.appendChild(document.createTextNode(value));
	if (spanfontWeight!= null){span.style.fontWeight = spanfontWeight;}
	if (AddBefore) {uploaded.parentNode.insertBefore(span, uploaded);}
	else {uploaded.appendChild(span);}

}

function addSpanLinkLabel(id,link,value,uploaded,spanfontWeight,AddBefore){
  	var a = document.createElement("a");
	a.href = link
  	a.appendChild(document.createTextNode(value));
	var span = document.createElement("span");
  	span.id = id;
  	span.appendChild(a);

	if (spanfontWeight!= null){span.style.fontWeight = spanfontWeight;}
	if (AddBefore) {uploaded.parentNode.insertBefore(span, uploaded);}
	else {uploaded.appendChild(span);}

}

function updatedStatLabel(id,nodeValue){
	var updatespan = document.getElementById(id);
	updatespan.replaceChild(nodeValue,updatespan.childNodes[0]);

}

function SetVisibleHidden(id,value){
	var SetPanel = document.getElementById(id);
	SetPanel.style.visibility=value;

}

function InitHiddenLabel(){
	SetVisibleHidden("AssetMPNSlotLabel","hidden");
	SetVisibleHidden("AssetFeaturedDateLabel","hidden");

	SetVisibleHidden("AdvMPNSlotLabel","hidden");
	SetVisibleHidden("AdvFeaturedDateLabel","hidden");

	if (!Mvj_Mode){SetVisibleHidden("AdventureWinLoses","hidden");}
}

function NewSummaryPageTop(documentBased,content,id,IconPath,IconWidth,IconHeight,IconBPosition,value){
	documentBased.parentNode.replaceChild(content, documentBased);
	scroll(0, 0);
	content.id = id+"InfoDiv";
	content.style.marginTop="10px";

	var hdr = document.createElement("div");
	content.appendChild(hdr);
	hdr.id = id+"HeaderDiv";
	hdr.className = "homeTabHdrDiv";
	hdr.style.width = "1000px";

	addStatWithIconLabel(IconWidth,IconHeight,IconPath,IconBPosition,id+"HeaderID", value, "", hdr, "medium","medium","3px",false,null,"950px");

	div = document.createElement("div");
	hdr.appendChild(div);
	div.className = "outerpod-header-right";
	div.style.top = "90px";
	div.style.right = "5px";

	span = document.createElement("span");
	div.appendChild(span);
	span.className = "js-close-button";
	img = document.createElement("img");
	span.appendChild(img);
	img.className = "closedetail";
	img.alt = "close";
	img.src = "/static/war/images/global/button_close.png";
	img.addEventListener("click", function() { content.parentNode.replaceChild(documentBased, content); }, false);
}

function AddPic128(id,uploaded,ImgPath,BorderColor,FrameBorder,BackgroundBorder){
	div = document.createElement("div");
	uploaded.appendChild(div);
			
	div.id=id+"Pic";
	div.style.marginTop="2px";
	div.style.backgroundRepeat = "no-repeat";
	div.style.backgroundAttachment = "scroll";
	div.style.backgroundColor = "transparent";
	div.style.width = "140px";
	div.style.height = "140px";

	if (BackgroundBorder){
		div.style.backgroundImage = "url(/static/war/images/sporepedia/adv/mySporeSprite.png)";
		div.style.backgroundPosition = "-492px -137px";
	}

	if(ImgPath != null){
		img = document.createElement("img");
		div.appendChild(img);
		img.src = ImgPath;
		img.style.width = "128px";
		img.style.height = "128px";
		if(BorderColor != null){img.style.border="2px solid "+BorderColor;}
		if (FrameBorder) {img.style.marginTop = "10px";}
		else{img.style.marginTop = "2px";}
		img.style.marginLeft = "2px";
	}

	if(FrameBorder){
		img = document.createElement("img");
		div = document.createElement("div");
		div.appendChild(img);
		div.id= id+"Frame";
		uploaded.appendChild(div);
		img.src = "/static/war/images/global/CreationFrame_myspore_128.png";
		img.style.marginTop = "-150px";
		img.style.marginLeft = "-5px";

	}
}

function CreateAssetSummaryDataPanel(id,uploaded,AssetData,Type,URLPic,AuthorLinkName,AuthorLinkID,AssetID,LinkLabel,showName,showRating,showLink){
// Create a Summary Panel for specific asset. Include Asset Picture, Asset Name, Rating and Link

	divA = document.createElement("div");
	divA.id = id+"Data";
	uploaded.appendChild(divA);
	divA.style.marginTop = "10px";
	AddPic128(id+"Pic",divA,URLPic,"#ABCDEF",false,true);

	divR = document.createElement("div");
	divA.appendChild(divR);
	divR.style.marginTop = "-120px";
	divR.style.marginLeft = "140px";
	divR.style.width = "700px";
	divR.style.height = "100px";

	if (showName){
		MainIcon = "/static/war/images/icons/filter_"+Type+".png";
		addStatWithIconLabel("32px","32px",MainIcon,"0px 0px",id+"NameInfo",
					"Name: ",AssetData.getElementsByTagName("name")[0].firstChild.data,divR,"small","small","10px",false,null,"200px");

	}
	if (showRating){
		rating = parseFloat(AssetData.getElementsByTagName("rating")[0].firstChild.data);
		if (rating == -1) {rating = 0;}
		if (rating >= 10) {Pic = 0;}
		if (rating < 10 && rating >=4) {Pic = 1;}
		if (rating < 4) {Pic = 2;}
		var FacePic = ["0px -87px","-23px -87px","-47px -87px"];
		addStatWithIconLabel("25px","25px","/static/war/images/sporepedia/adv/mySporeSprite.png",FacePic[Pic],id+"RateInfo",
					"Rating: ",rating,divR,"small","small","10px",false,"5px","200px");
	}

	if (showLink){
		
		creationlink = document.createElement("a");
		creationlink.href = "http://www.spore.com/sporepedia#qry=usr-"+AuthorLinkName+"|"+AuthorLinkID+"%3Asast-"+AssetID;
		creationlink.target = "_blank";
		creationlink.appendChild(document.createTextNode(LinkLabel));
		div = document.createElement("div");
		div.appendChild(creationlink);
		div.style.width = "200px";
		div.style.marginTop = "15px";
		div.style.marginLeft = "35px";
		div.style.fontWeight = "bold";
		divR.appendChild(div);
	}
}

//----------------------Fix a footer position-----------------------------------------------------------
//

function FixFooter(){
	AssetDetailPanelHeight = document.getElementById("asset-detail").clientHeight + document.getElementById("asset-detail").offsetTop;
	AdvDetailPanelHeight = document.getElementById("asset-adv-detail").clientHeight + document.getElementById("asset-adv-detail").offsetTop;
	FooterStart = document.getElementById("footerHolder").offsetTop;
	if (Mvj_Mode){
		if (FooterStart < AssetDetailPanelHeight && mvj().assetDetail) {document.getElementById("footerHolder").style.marginTop= AssetDetailPanelHeight-FooterStart+"px";}
		if (FooterStart < AdvDetailPanelHeight && mvj().assetAdvDetail) {document.getElementById("footerHolder").style.marginTop= AdvDetailPanelHeight-FooterStart+"px";}

	// Sometime, the above method will fail to adjust footer, This is the second check that use padding.
		if (FooterStart < AssetDetailPanelHeight && mvj().assetDetail) {document.getElementById("footerHolder").style.paddingTop= AssetDetailPanelHeight-FooterStart+"px";}
		if (FooterStart < AdvDetailPanelHeight && mvj().assetAdvDetail) {document.getElementById("footerHolder").style.paddingTop= AdvDetailPanelHeight-FooterStart +"px";}	


	// If all above method fail to adjust footer, use Z-index.
		if (FooterStart+15 < AssetDetailPanelHeight && mvj().assetDetail) {document.getElementById("asset-detail").style.zIndex= "31";}
		if (FooterStart+15 < AdvDetailPanelHeight && mvj().assetAdvDetail) {document.getElementById("asset-adv-detail").style.zIndex= "31";}
	}
	else{
		if (FooterStart < AssetDetailPanelHeight) {document.getElementById("footerHolder").style.marginTop= AssetDetailPanelHeight-FooterStart+"px";}
		if (FooterStart < AdvDetailPanelHeight) {document.getElementById("footerHolder").style.marginTop= AdvDetailPanelHeight-FooterStart+"px";}

	// Sometime, the above method will fail to adjust footer, This is the second check that use padding.
		if (FooterStart < AssetDetailPanelHeight) {document.getElementById("footerHolder").style.paddingTop= AssetDetailPanelHeight-FooterStart+"px";}
		if (FooterStart < AdvDetailPanelHeight) {document.getElementById("footerHolder").style.paddingTop= AdvDetailPanelHeight-FooterStart +"px";}	


	// If all above method fail to adjust footer, use Z-index.
		if (FooterStart+15 < AssetDetailPanelHeight) {document.getElementById("asset-detail").style.zIndex= "31";}
		if (FooterStart+15 < AdvDetailPanelHeight) {document.getElementById("asset-adv-detail").style.zIndex= "31";}
	}
}

//----------------------Fetch rating using XML method--------------------------------------------------
// Used to manaully update the rating.
// Since using internal call doesn't update rating when recall after rate the asset
// However, XML will update the rating after rate the asset.

function RatingUpdateXML(Asset,Label){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetID = Asset.assetId;
  			if(AssetID) {
        			var rating = document.createTextNode("(Updating...)");
				updatedStatLabel(Label,rating);
				getAsync("http://www.spore.com/rest/asset/"+ AssetID, gotAssetDataXml, rating,null,null);
			}
			RatingCycleCheck(Asset,Label+"Cycle");
		}
	}
}

//----------------------Fetch rating using internal call (SporeScope method)-------------------------------
// Set as an automatic method to fetch rating.
// Doesn't required to load XML and much faster than XML.
// However, there're some bug that make internal call to used the same rating number before and after rate the asset.
// Fixed with XML manual call.

function RatingUpdate(Asset,Label){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetRating = Asset.rating;
  			if(AssetRating) {
				if(AssetRating == -1) {AssetRating = 0;}
        			var rating = document.createTextNode(AssetRating);
				updatedStatLabel(Label, rating);
			}
			else{
				var rating = document.createTextNode("0");
				updatedStatLabel(Label, rating);
			}
			RatingCycleCheck(Asset,Label+"Cycle");
  		}
	}
}

//--------------------------Calculate voting power estimation ---------------------------------------------
// 

function RatingCycleCheck(Asset,Label){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetCreatedDate = Asset.created;
			if (AssetCreatedDate){
				VotingPower = 3;
				DecayPercentage = 0;
// Seems that Chrome need to define Checker in here first instead of inside if or it will see as undefined unlike Firefox.

				Checker = "Green Face";
				ResetCycle = new Date();
				ResetCycle.setUTCHours(23,59,59,999);
				CycleNumber = Math.floor ((Math.ceil((ResetCycle.getTime() - AssetCreatedDate.getTime())/1000))/(60*60*24));
				VotingPower = 3*(5/(5+CycleNumber));
				rating = Asset.rating;
				faceRate = 0;
				if (rating == -1) {rating = 0;}
				if (CycleNumber <= 1 || rating == 0) {faceRate = rating + VotingPower;}
				else{faceRate = (rating*(7/(6+CycleNumber))+VotingPower);}

				var Vote = document.createTextNode(VotingPower.toPrecision(5));
	
				if (faceRate > 4 && faceRate <= 10) {Checker = "Blue Face";}
				if (faceRate > -2 && faceRate <= 4) {Checker = "Yellow Face";}
				if (faceRate > -4 && faceRate <= -2) {Checker = "Orange Face";}
				if (faceRate <= -4) {Checker = "Red Face";}

				if (faceRate >= Asset.rating) {Checker = Checker + " With +";}

				var DecayFace = document.createTextNode(Checker);
				updatedStatLabel(Label, Vote);
				updatedStatLabel(Label+"Worst", DecayFace);
			}
		}
	}
}

//-------------------------Fetch Parent Information--------------------------------------------------------
//

function ParentInformation(Asset,NameLabel,TypeLabel){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {

		//Remove Parent Pic first
			AssetParentPicEx = document.getElementById("AssetParentPicData");
			AdvParentPicEx = document.getElementById("AdvParentPicData");
			if (AssetParentPicEx){AssetParentPicEx.parentNode.removeChild(AssetParentPicEx);}
			if (AdvParentPicEx){AdvParentPicEx.parentNode.removeChild(AdvParentPicEx);}

			ParentID = Asset.parentId;

  			if(ParentID == null || ParentID == "NULL") {
				var ParentNameField = document.createTextNode("<None>");
				var ParentTypeField = document.createTextNode("[Original]");
				updatedStatLabel(NameLabel, ParentNameField);
				updatedStatLabel(TypeLabel, ParentTypeField);
			}
				// From my observation, All of my auto-upload Cell to Creature Stage have parentId < 1000
				// However, I don't sure how big this number is, so I choose 100000 as a check point.
				// This type of Bad parent data will cause the Lineage to freeze with the old data or not show the data.
				// Checking with the output of this function give a better result to see check Parent.
			else{ 	if(ParentID < 100000){
				var ParentNameField = document.createTextNode("<Possibly Auto-Upload>");
				var ParentTypeField = document.createTextNode("[First Auto-Upload]");
				updatedStatLabel(NameLabel, ParentNameField);
				updatedStatLabel(TypeLabel, ParentTypeField);
				}
				else {	if (ParentID < 500000000000){
						var ParentNameField = document.createTextNode("<Bad Parent Data / Maxis creation>");
						var ParentTypeField = document.createTextNode("[Bad Parent Data / Maxis creation]");
						updatedStatLabel(NameLabel, ParentNameField);
						updatedStatLabel(TypeLabel, ParentTypeField);

					} 
					else {
						var ParentNameField = document.createTextNode("Checking...");
						var ParentTypeField = document.createTextNode("Checking...");
						updatedStatLabel(NameLabel, ParentNameField);
						updatedStatLabel(TypeLabel, ParentTypeField);
						getAsync("http://www.spore.com/rest/asset/"+ ParentID, gotParentDataXml, ParentNameField, ParentTypeField, Asset);
					}
				}
			}
		}
	}
}

//-----------------------------Asset Type-----------------------------------------------------
//
function AssetTypeInformation(Asset){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetTypeInfo = Asset.assetFunction;

			if (AssetTypeInfo){

				if (AssetTypeInfo == "CREATURE" || AssetTypeInfo == "0x9ea3031a") {AssetTypeInfo = ": Animal";}
				if (AssetTypeInfo == "TRIBE_CREATURE" || AssetTypeInfo == "0x372e2c04") {AssetTypeInfo = ": Tribal";}
				if (AssetTypeInfo == "CIV_CREATURE" || AssetTypeInfo == "0xccc35c46") {AssetTypeInfo = ": Civilization";}
				if (AssetTypeInfo == "SPACE_CREATURE" || AssetTypeInfo == "0x65672ade") {AssetTypeInfo = ": Space";}
				if (AssetTypeInfo == "ADVENTURE_CREATURE" && Mvj_Mode) {

				// mvj().assetDetail.captain have some slack time on load, slower than loading mvj().assetDetail.asset which caused slow refresh on captain type.
					if (mvj().assetDetail.captain) {
						if (mvj().assetDetail.captain.plays > 0) {AssetTypeInfo = ": Played"}
						else{AssetTypeInfo = ": Normal"}

						// This condition use to solve the "slack time" bug on loading mvj().assetDetail.captain
						if (mvj().assetDetail.captain.assetId != mvj().assetDetail.asset.assetId) {AssetTypeInfo = " Checking";}
					}
					else{AssetTypeInfo = " Checking";}
				}

				// "0x4178b8e8" is ADVENTURE_CREATURE but only appear if fetching from xml which some other data is not available.
				if (AssetTypeInfo == "0x4178b8e8") {AssetTypeInfo = "";}

				if (AssetTypeInfo == "CITY_HALL" || AssetTypeInfo == "0x99e92f05") {AssetTypeInfo = ": City Hall";}
				if (AssetTypeInfo == "HOUSE" || AssetTypeInfo == "0x4e3f7777") {AssetTypeInfo = ": House";}
				if (AssetTypeInfo == "INDUSTRY" || AssetTypeInfo == "0x47c10953") {AssetTypeInfo = ": Factory";}
				if (AssetTypeInfo == "ENTERTAINMENT" || AssetTypeInfo == "0x72c49181") {AssetTypeInfo = ": Entertainment";}

				if (AssetTypeInfo == "MILITARY_LAND" || AssetTypeInfo == "0x7d433fad") {AssetTypeInfo = ": Military Land";}
				if (AssetTypeInfo == "MILITARY_WATER" || AssetTypeInfo == "0x8f963dcb") {AssetTypeInfo = ": Military Water";}
				if (AssetTypeInfo == "MILITARY_AIR" || AssetTypeInfo == "0x441cd3e6") {AssetTypeInfo = ": Military Air";}
				if (AssetTypeInfo == "ECONOMIC_LAND" || AssetTypeInfo == "0xf670aa43") {AssetTypeInfo = ": Economic Land";}
				if (AssetTypeInfo == "ECONOMIC_WATER" || AssetTypeInfo == "0x2a5147a9") {AssetTypeInfo = ": Economic Water";}
				if (AssetTypeInfo == "ECONOMIC_AIR" || AssetTypeInfo == "0x1a4e0708") {AssetTypeInfo = ": Economic Air";}
				if (AssetTypeInfo == "CULTURAL_LAND" || AssetTypeInfo == "0x9ad7d4aa") {AssetTypeInfo = ": Religious Land";}
				if (AssetTypeInfo == "CULTURAL_WATER" || AssetTypeInfo == "0x1f2a25b6") {AssetTypeInfo = ": Religious Water";}
				if (AssetTypeInfo == "CULTURAL_AIR" || AssetTypeInfo == "0x449c040f") {AssetTypeInfo = ": Religious Air";}
				if (AssetTypeInfo == "COLONY_LAND" || AssetTypeInfo == "0xbc1041e6") {AssetTypeInfo = ": Colony Land";}
				if (AssetTypeInfo == "COLONY_WATER" || AssetTypeInfo == "0xc15695da") {AssetTypeInfo = ": Colony Water";}
				if (AssetTypeInfo == "COLONY_AIR" || AssetTypeInfo == "0x2090a11b") {AssetTypeInfo = ": Colony Air";}
				
				if (AssetTypeInfo == "UFO" || AssetTypeInfo == "0x98e03c0d") {AssetTypeInfo = "";}
				if (AssetTypeInfo == "ADVENTURE" || AssetTypeInfo == "0x25a6ea6e") {AssetTypeInfo = "";}

				var type = document.createTextNode(AssetTypeInfo+" ");
				updatedStatLabel("AssetType", type);
			}
		}
	}
}

//-----------------------------Comment Counter--------------------------------------------------
//

function CommentCounter(Asset,Label){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetID = Asset.assetId;
			if(AssetID) {
				var CommentCount = document.createTextNode(" (Counting...)");
				updatedStatLabel(Label, CommentCount);
				getAsync("http://www.spore.com/rest/comments/"+ AssetID+"/0/5000", gotCommentDataXML, CommentCount,null,null);
			}
		}
	}
}

//--------------------------Comment length count-------------------------------------------------
//

function CommentLengthCalculate(CommentBox, Label, MaxLength){
	if (CommentBox.value != null){
		var Commleft = document.createTextNode(MaxLength-CommentBox.value.length);
		updatedStatLabel(Label, Commleft);
	}
}

//-----------------------------Asset Created Date-------------------------------------------------
//

function CreatedInformation(Asset, Label, MPNLabel, FeaturedLabel){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			AssetCreatedDate = Asset.created;
			AssetFeatured = Asset.featured;
			if (AssetCreatedDate){
				CurrentTime = new Date();
				MPNSecond = (24*60*60) - Math.ceil((CurrentTime.getTime() - AssetCreatedDate.getTime())/1000);
				MPNMinute = (MPNSecond/60);
				MPNHour = (MPNMinute/60);

// Don't sure when the server will move asset out of MPN, Usually after 24 hours. However, server doesn't do it job often enough to move exactly 24 hours asset from the list.
// -60 minute count use as a slack to ensure that asset will be move from the list in this minus period time.
			if (MPNMinute > -60){	
				SetVisibleHidden(MPNLabel+"Label","visible");
				if (MPNMinute < 0) {MPNHour = "In MPN Remove List for ";}
				else {MPNHour = Math.floor(MPNHour) + " Hour ";}
				var MPNLeft = document.createTextNode(MPNHour + Math.abs(Math.floor(MPNMinute%60)) + " Minute ");
				updatedStatLabel(MPNLabel, MPNLeft);
			}
			if (AssetFeatured != null){
				SetVisibleHidden(FeaturedLabel+"Label","visible");
				var FeaturedDate = document.createTextNode(formatDateTimeShort(AssetFeatured));
				updatedStatLabel(FeaturedLabel, FeaturedDate);
			}
			var CreatedDate = document.createTextNode(formatDateTimeShort(AssetCreatedDate));
			updatedStatLabel(Label, CreatedDate);
			}
		}
	}
}

//--------------------------Adventure Win Lose Score----------------------------------------------
//

function AdventureWinLoseInformation(){
	if (mvj().assetAdvDetail.asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			var WinLose = document.createTextNode(" (Wins:"+mvj().assetAdvDetail.asset.adventureStat.wins+" / Losses:"+mvj().assetAdvDetail.asset.adventureStat.losses+")");
			updatedStatLabel("AdventureWinLoses", WinLose);
		}
	}
}

//------------------------New Creature (Asset&Event) Information function-----------------------------------------
//--Adding Asset Feed and change header to Stat and Event

function CreatureInformation(Asset){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			var documentBased =  document.getElementById("doc2");
			var content = document.createElement("div");
			content.style.textAlign = "left";

			if(Asset.type == "CREATURE"){
				EndSummary = "'s Statistic and Event Summary";
				WaitSummary = "'s DNA Code Puzzle Mystery";
			}
			else{
				EndSummary = "'s Event Summary";
				WaitSummary = "'s Event Mystery";
			}

			NewSummaryPageTop(documentBased,content,"CreatureInfo","/static/war/images/sporepedia/adv/mySporeSprite.png","27px","26px","-163px -3px",
				Asset.name +""+ EndSummary);
			IDPath = Asset.assetId.toString();
			ImgPath = "http://www.spore.com/static/thumb/"+IDPath.substring(0, 3)+"/"+IDPath.substring(3, 6)+"/"+IDPath.substring(6, 9)+"/"+IDPath+".png";

			AddPic128("CreaturePic",content,ImgPath,"#ABCDEF",false,true);
			
			divMain = document.createElement("div");
			content.appendChild(divMain);
			divMain.id="MainInfoSection";
			divMain.style.marginTop = "-145px";
			divMain.style.marginLeft = "145px";
			AssetID = Asset.assetId;

			addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","CreatureInfoWait",
					 "Resolving "+Asset.name+""+WaitSummary,"...",divMain,"medium","medium","3px",false,null,"800px");

			if (AssetID && Asset.type == "CREATURE"){getAsync("http://www.spore.com/rest/creature/"+ AssetID, gotCreatureDataXml, Asset,divMain,null);}

			if (AssetID) {getAsync("http://www.spore.com/atom/events/asset/"+ AssetID, gotEventFeed, Asset,divMain,null);}
		
		}
	}
}

//--------------------------Author Infomation-----------------------------------------------------
//

function AuthorInformation(Asset){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {
			var documentBased =  document.getElementById("doc2");
			var content = document.createElement("div");
			content.style.textAlign = "left";
			NewSummaryPageTop(documentBased,content,"AuthorInfo","/static/war/images/sporepedia/adv/mySporeSprite.png","27px","26px","-99px -3px",
					Asset.author.screenName+"'s Information Summary");

			if (Asset.author.avatarImage != null){ImgPath = "/static/"+Asset.author.avatarImage;}
			else {ImgPath = null;}

			AddPic128("AuthorAvatar",content,ImgPath,null,true,false);

			var profilelink = document.createElement("a");
			profilelink.href = "http://www.spore.com/view/myspore/"+Asset.author.screenName;
			profilelink.appendChild(document.createTextNode("See User's Profile"));
			div = document.createElement("div");
			div.id = "UserProfileLink";
			div.appendChild(profilelink);
			div.style.width = "128px";
			div.style.marginTop = "2px";
			div.style.marginLeft = "12px";
			div.style.fontWeight = "bold";
			content.appendChild(div);

			divMain = document.createElement("div");
			content.appendChild(divMain);
			divMain.id="MainInfoSection";
			divMain.style.marginTop = "-171px";
			divMain.style.marginLeft = "145px";

			divCommon = document.createElement("div");
			divCommon.id = "AuthorCommonSection";
			divMain.appendChild(divCommon);
			if (Asset.author.tagline != null) {Tag = "\""+ Asset.author.tagline + "\" ";}
			else {Tag = "";}

//In Some case, Author update can be null if it's very recently update.
			if (Asset.author.updated != null) {UpdateDate = formatDateTimeShort(Asset.author.updated);}
			else {
				if (Mvj_Mode) {UpdateDate = "Recently Updated";}
				else {UpdateDate = "--Data not available--";}
			}

// Exclusive to mvj data but some can be fetch through other XML.
			if (Mvj_Mode) {
				SubCount = Asset.author.subscriptionCount;
				AllAssetCount = Asset.author.assetCount;
				NewAssetCreated = formatDateTimeShort(Asset.author.newestAssetCreated);
			}
			else {
				SubCount = "Counting...";
				AllAssetCount = "Counting...";
				NewAssetCreated = "Counting...";
			}

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-130px -3px","TaglineInfo",
						"", Tag,divCommon,"medium","medium","3px",false,null,"800px");

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","0px -3px","DateCreatedInfo",
						"Member Since: ", formatDateTimeShort(Asset.author.dateCreated),divCommon,"small","small","3px",false,null,"800px");

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-225px -3px","SubscribeInfo",
						"Subscribers: ", SubCount,divCommon,"small","small","3px",false,null,"800px");

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-163px -3px","CreationUploadedInfo",
						"Creations Uploaded: ", AllAssetCount,divCommon,"small","small","3px",false,null,"800px");

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-192px -3px","ProfileUpdateInfo",
						"Last Profile Updated: ", UpdateDate,divCommon,"small","small","3px",false,null,"800px");

			addStatWithIconLabel("27px","26px","/static/war/images/sporepedia/adv/mySporeSprite.png","-192px -3px","LCreationUploadInfo",
						"Last Creations Uploaded: ", NewAssetCreated,divCommon,"small","small","3px",false,null, "800px");

			addStatWithIconLabel("32px","32px","/static/war/images/mvj/network_spinner_sm.gif","0px 0px","AuthorInfoWait",
							 "Analyzing "+Asset.author.screenName+"'s Creation Data","...",divMain,"medium","medium","3px",false,null,"800px");

			getAsync("http://www.spore.com/rest/assets/user/"+ Asset.author.screenName+"/0/500", gotAuthorAssetDataXml, Asset,divMain,null);
			
// If mvj not presented then, use XML to get subscriber count.
			if (!Mvj_Mode){getAsync("http://www.spore.com/rest/users/subscribers/"+ Asset.author.screenName+"/0/501", gotSubscriberDataXml, Asset,divMain,null);}
		}
	}
}

//-------------------------Auto update function---------------------------------------------------
// In case of fetching XML files, it need to check for IDKey first to reduce workload on server and client side.

function AutoText(){
	if(AutoRefreshRating){
		RatingUpdate(mvj().assetDetail.asset,"AssetRating");
		RatingUpdate(mvj().assetAdvDetail.asset,"AdvRating");
	}
	else{
		updatedStatLabel("AssetRating", document.createTextNode("<Click to refresh>"));
		updatedStatLabel("AdvRating", document.createTextNode("<Click to refresh>"));
		updatedStatLabel("AssetRatingCycle", document.createTextNode("<Click Rating to refresh>"));
		updatedStatLabel("AdvRatingCycle", document.createTextNode("<Click Rating to refresh>"));
		updatedStatLabel("AssetRatingCycleWorst", document.createTextNode("<Click Rating to refresh>"));
		updatedStatLabel("AdvRatingCycleWorst", document.createTextNode("<Click Rating to refresh>"));
	}

	if (AutoRefreshCommentCounter){
		if (mvj().assetDetail.asset != null){
		if (AssetIDKey != mvj().assetDetail.asset.assetId) {CommentCounter(mvj().assetDetail.asset,"CommentAssetCount");}}
		if (mvj().assetAdvDetail.asset != null){
		if (AssetAdvIDKey != mvj().assetAdvDetail.asset.assetId) {CommentCounter(mvj().assetAdvDetail.asset,"CommentAdvCount");}}
	}
	else{
		updatedStatLabel("CommentAssetCount", document.createTextNode(" <Click to count>"));
		updatedStatLabel("CommentAdvCount", document.createTextNode(" <Click to count>"));
	}

	if(AutoRefreshParent){
		if (mvj().assetDetail.asset != null){
		if (AssetIDKey != mvj().assetDetail.asset.assetId) {ParentInformation(mvj().assetDetail.asset,"ParentName","ParentType");}}
		if (mvj().assetAdvDetail.asset != null){
		if (AssetAdvIDKey != mvj().assetAdvDetail.asset.assetId) {ParentInformation(mvj().assetAdvDetail.asset,"AdvParentName","AdvParentType");}}
	}
	else{
	//Remove Parent Pic
		AssetParentPicEx = document.getElementById("AssetParentPicData");
		AdvParentPicEx = document.getElementById("AdvParentPicData");
		if (AssetParentPicEx){AssetParentPicEx.parentNode.removeChild(AssetParentPicEx);}
		if (AdvParentPicEx){AdvParentPicEx.parentNode.removeChild(AdvParentPicEx);}

		updatedStatLabel("ParentName", document.createTextNode("<Click Parent Information to refresh>"));
		updatedStatLabel("ParentType", document.createTextNode("<Click Parent Information  to refresh>"));
		updatedStatLabel("AdvParentName", document.createTextNode("<Click Parent Information to refresh>"));
		updatedStatLabel("AdvParentType", document.createTextNode("<Click Parent Information  to refresh>"));
	}
	
	InitHiddenLabel();
	AssetTypeInformation(mvj().assetDetail.asset);
	AdventureWinLoseInformation();

	CreatedInformation(mvj().assetDetail.asset,"AssetCreatedDate","AssetMPNSlot","AssetFeaturedDate");
	CreatedInformation(mvj().assetAdvDetail.asset,"AdvCreatedDate","AdvMPNSlot","AdvFeaturedDate");

	CommentLengthCalculate(document.getElementById("add-comment-text"), "AssetCommentLength",256);
	CommentLengthCalculate(document.getElementById("adv-add-comment-text"), "AdvCommentLength",256);

	if (mvj().assetDetail.asset != null){
		if (AssetIDKey != mvj().assetDetail.asset.assetId){AssetIDKey = mvj().assetDetail.asset.assetId;}}
	if (mvj().assetAdvDetail.asset != null){
		if (AssetAdvIDKey != mvj().assetAdvDetail.asset.assetId) {AssetAdvIDKey = mvj().assetAdvDetail.asset.assetId;}}
	FixFooter();
}
//---------------------Sporecast Section----------------------------------------------------------------

function sporecastSelected (sporecast){updateCastRating(sporecast);}

function updateCastRating(sporecast){
	if (sporecast.rating == null || sporecast.rating == "") {SCRating = 0;}
	else {SCRating = sporecast.rating;}
	updatedStatLabel("SporeCastRating", document.createTextNode(SCRating));
}


/////-------------------------------------------------New Function if mvj is not present---------------------------------
/////-----------------------------------------------------(Tested on Google Chrome)--------------------------------------
function GetAssetIDAsObject(AssetType){
	if (Mvj_Mode){
		if (AssetType == "Asset") {return mvj().assetDetail.asset;}
		if (AssetType == "Adv") {return mvj().assetAdvDetail.asset;}
	}
	else {	
	Asset = new Object();
	Asset.assetId = location.href.substr(location.href.lastIndexOf("sast-")+5,12);
	AssetID = Asset.assetId;
	return Asset;
	}
}

function XMLFullData(){
	updatedStatLabel("AssetRating", document.createTextNode("Updating..."));
	updatedStatLabel("AdvRating", document.createTextNode("Updating..."));
	updatedStatLabel("AssetRatingCycle", document.createTextNode("Updating..."));
	updatedStatLabel("AdvRatingCycle", document.createTextNode("Updating..."));
	updatedStatLabel("AssetRatingCycleWorst", document.createTextNode("Updating..."));
	updatedStatLabel("AdvRatingCycleWorst", document.createTextNode("Updating..."));
	updatedStatLabel("ParentName", document.createTextNode("Updating..."));
	updatedStatLabel("ParentType", document.createTextNode("Updating..."));
	updatedStatLabel("AdvParentName", document.createTextNode("Updating..."));
	updatedStatLabel("AdvParentType", document.createTextNode("Updating..."));
	updatedStatLabel("AssetCreatedDate", document.createTextNode("Updating..."));
	updatedStatLabel("AdvCreatedDate", document.createTextNode("Updating..."));

	TempAsset.assetId = location.href.substr(location.href.lastIndexOf("sast-")+5,12);
	AssetID = parseInt(TempAsset.assetId);

// Preventing xml fetch without proper ID
	if (AssetID > 0 && !isNaN(AssetID)) {
		getAsync("http://www.spore.com/rest/asset/"+ AssetID, gotAssetFullDataXml, TempAsset,null,null);
	}
	else{
		updatedStatLabel("AssetRating", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvRating", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AssetRatingCycle", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvRatingCycle", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AssetRatingCycleWorst", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvRatingCycleWorst", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("ParentName", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("ParentType", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvParentName", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvParentType", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AssetCreatedDate", document.createTextNode("<Can't retrieve Asset ID from address bar>"));
		updatedStatLabel("AdvCreatedDate", document.createTextNode("<Can't retrieve Asset ID from address bar>"));

	}
}

function gotAssetFullDataXml(req, Asset, SecondArgs, ThirdArgs) {
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	Asset.status = status[0].firstChild.data;

//Recreting data with mvj format.
	if (Asset.status != 0){
		var AssetID = response.getElementsByTagName("input");
		Asset.assetId = AssetID[0].firstChild.data;

		var Name = response.getElementsByTagName("name");
		Asset.name = Name[0].firstChild.data;

		Asset.author = new Object();	

		var Author = response.getElementsByTagName("author");
		Asset.author.name = Author[0].firstChild.data;

		var AuthorID = response.getElementsByTagName("authorid");
		Asset.author.id = AuthorID[0].firstChild.data;
	
		var Created = response.getElementsByTagName("created");
		Asset.created = Created[0].firstChild.data;	

		Asset.created = ChangeXMLToDateFormat(Asset.created);
	
		var Description = response.getElementsByTagName("description");
		if (Description[0].firstChild != null) {Asset.description = Description[0].firstChild.data;}
		else {Asset.description = null;}

		var Tags = response.getElementsByTagName("tags");
		if (Tags[0].firstChild != null) {Asset.tags = Tags[0].firstChild.data;}
		else {Asset.tags = null;}

		var AssetTypeInfo = response.getElementsByTagName("type");
		Asset.type = AssetTypeInfo[0].firstChild.data;

		var Subtype = response.getElementsByTagName("subtype");
		Asset.assetFunction = Subtype[0].firstChild.data;

		var Rating = response.getElementsByTagName("rating");
		Asset.rating = Rating[0].firstChild.data;

		var parent = response.getElementsByTagName("parent");
		Asset.parentId = parent[0].firstChild.data;

		if (status == 0){Asset.rating.data = "---Asset Deleted---";}
		else{ if (Asset.rating == -1 || Asset.rating == -0){Asset.rating = 0;}}

//----------------------Not in XML but recreated as default valve in mvj----------------------------
		Asset.featured = null;

//----------------------Calling---------------------------------
		InitHiddenLabel();
		if (Asset.type != "ADVENTURE"){
			RatingUpdate(Asset,"AssetRating");
			ParentInformation(Asset,"ParentName","ParentType");
			AssetTypeInformation(Asset);
			CreatedInformation(Asset,"AssetCreatedDate","AssetMPNSlot","AssetFeaturedDate");
		}
		else {
			RatingUpdate(Asset,"AdvRating");
			ParentInformation(Asset,"AdvParentName","AdvParentType");
			CreatedInformation(Asset,"AdvCreatedDate","AdvMPNSlot","AdvFeaturedDate");
		}
		FixFooter();
	}
	else{
		updatedStatLabel("AssetRating", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvRating", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AssetRatingCycle", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvRatingCycle", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AssetRatingCycleWorst", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvRatingCycleWorst", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("ParentName", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("ParentType", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvParentName", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvParentType", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AssetCreatedDate", document.createTextNode("--Asset Deleted--"));
		updatedStatLabel("AdvCreatedDate", document.createTextNode("--Asset Deleted--"));
	}
}

function formatDateTimeShort(DateTime){
	LastWord = "AM";
	TimeMonth = DateTime.getMonth()+1;
	TimeDate = DateTime.getDate();

	if (TimeMonth < 10) {TimeMonth = "0" + TimeMonth;}
	if (TimeDate < 10) {TimeDate = "0" + TimeDate;}

	DateDay = TimeMonth +"/"+ TimeDate +"/"+ DateTime.getFullYear();

	if (DateTime.getHours() > 12) {
		TimeHour = DateTime.getHours() - 12;
		LastWord = "PM"
	}
	else {TimeHour = DateTime.getHours();}
	if (TimeHour < 10) {TimeHour = "0" + TimeHour;}

	if (DateTime.getMinutes() < 10) {TimeMinute = "0" + DateTime.getMinutes();}
	else {TimeMinute = DateTime.getMinutes();}

	DateDay = DateDay +" "+ TimeHour +":"+ TimeMinute +""+ LastWord +" ";
	return DateDay;
}

// In case of Hash Change, Comment count etc. need to reset but should not be reset with click event.
function RefreshEvent(){
	updatedStatLabel("CommentAssetCount", document.createTextNode(" <Click to count>"));
	updatedStatLabel("CommentAdvCount", document.createTextNode(" <Click to count>"));

	CommentLengthCalculate(document.getElementById("add-comment-text"), "AssetCommentLength",256);
	CommentLengthCalculate(document.getElementById("adv-add-comment-text"), "AdvCommentLength",256);

	XMLFullData();
}

function XMLClickEvent(EventClick){
	if (!Mvj_Mode){XMLFullData();}
	else{
		switch(EventClick){
		case "RatingAsset": RatingUpdateXML(mvj().assetDetail.asset,"AssetRating"); break;
		case "RatingAdv": RatingUpdateXML(mvj().assetAdvDetail.asset,"AdvRating"); break;
		case "ParentAsset": ParentInformation(mvj().assetDetail.asset,"ParentName","ParentType"); break;
		case "ParentAdv": ParentInformation(mvj().assetAdvDetail.asset,"AdvParentName","AdvParentType"); break;
		case "AssetType": AssetTypeInformation(mvj().assetDetail.asset); break;
		case "AssetCreated": CreatedInformation(mvj().assetDetail.asset,"AssetCreatedDate","AssetMPNSlot","AssetFeaturedDate"); break;
		case "AdvCreated" : CreatedInformation(mvj().assetAdvDetail.asset,"AdvCreatedDate","AdvMPNSlot","AdvFeaturedDate"); break;
		}
	}
}

function AuthorXMLFullData(){
	if (TempAsset.author.name != null || TempAsset.author.name != "") {
		getAsync("http://www.spore.com/rest/user/"+ TempAsset.author.name, gotAuthorFullDataXml, TempAsset,null,null);
	}

}
function gotAuthorFullDataXml(req, Asset, SecondArgs, ThirdArgs){
	var response = req.responseXML.documentElement;

	// Special Character XML Error Handling.
	if (response.getElementsByTagName("status")[0] == undefined) {response = XMLErrorHandle(req);}

	var status = response.getElementsByTagName("status");
	Asset.author.status = status[0].firstChild.data;

//Recreting data with mvj format.
	var ScreenName = response.getElementsByTagName("input");
	Asset.author.screenName = ScreenName[0].firstChild.data;

	var AuthorID = response.getElementsByTagName("id");
	Asset.author.id = AuthorID[0].firstChild.data;

	var AvatarImage = response.getElementsByTagName("image");
	if (AvatarImage[0].firstChild != null) {
		Asset.author.avatarImage = AvatarImage[0].firstChild.data;
		Asset.author.avatarImage = Asset.author.avatarImage.slice(Asset.author.avatarImage.search("avatar/"));
	}
	else {Asset.author.avatarImage = null;}

	var Tagline = response.getElementsByTagName("tagline");
	if (Tagline[0].firstChild != null) {Asset.author.tagline = Tagline[0].firstChild.data;}
	else {Asset.author.tagline = null;}
	

	var Created = response.getElementsByTagName("creation");
	Asset.author.dateCreated = Created[0].firstChild.data;

	Asset.author.dateCreated = ChangeXMLToDateFormat(Asset.author.dateCreated);


//----------------------Need to fetch from other huge XML and feed----------------------------

	Asset.author.updated = null // Can use atom feed from --> http://www.spore.com/atom/assets/user/Digi-P (Doesn't have much point since profile pages already have it.)

//----------------------Calling---------------------------------
	AuthorInformation(Asset);

}
function ChangeXMLToDateFormat(DateUnFormat){
return new Date(Date.UTC(DateUnFormat.substr(0,4),parseInt(DateUnFormat.substr(5,2),10)-1,DateUnFormat.substr(8,2),DateUnFormat.substr(11,2),DateUnFormat.substr(14,2),DateUnFormat.substr(17,2),DateUnFormat.substr(20,3)));

}
//Dummy Function to refresh captain type since the new function need argument.
function DummyAssetTypeInformation(){AssetTypeInformation(mvj().assetDetail.asset);}