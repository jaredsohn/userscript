// ==UserScript==
// @name           FaceFixer for Sporepedia
// @namespace      http://www.spore.com/view/myspore/Digi-P
// @description    Fix a rating face on Sporepedia.
// @include        http://www.spore.com/sporepedia*
// ==/UserScript==
//---------------------------------------------------------------------------------------------------------------------------
// FaceFixer, A seperate script for changing rating face in Sporepedia.
// Based on "Quality" attribute
// if the creation is consider as quality, then this script will check if the rating face of that creation is below blue face or not.
// if it's below blue face (yellow, orange, red), then this script will change the rating face to blue face no matter how much rating it has.
// Only useful if you're worry about rating face of your creation that changed by rating decay or mass downrate.
//---------------------------------------------------------------------------------------------------------------------------
// Known issue
// - It seems that creation that has rating higher than 3 gain a quality attribute (from observation), 
//   so this script will shift the blue face from 4.00 rating to 3.00 rating  
// - Much like in PrismSpore, mvj not init if the first page is qry=all (Home) pages

if(document.location.href.lastIndexOf("sporepedia") >= 1 && !document.getElementById("AssetRatingLabel")) {
	var mvj;

// The propose of AssetRatingFace here is to save the original script on the page before it got alter.
// Changing determine that change rating face is in effect or not.
	var AssetRatingFace = document.getElementById("requiredGames").parentNode.childNodes[1].childNodes[15].childNodes[1];
	var AdvRatingFace = document.getElementById("overallRatingDiv");

	var AssetChangingFace = false;
	var AdvChangingFace = false;

	document.defaultView.addEventListener('load', 
	function(e) { 
		
		mvj = function () { return window.wrappedJSObject.mvj;}
		init();
		 }, false);
}

function init(){
	if (mvj().assetDetail==undefined)
		{
			mvj().initAssetDetail();
		}
	if (mvj().assetAdvDetail==undefined)
		{
			mvj().initAssetAdvDetail();
		}
	var assetPane = mvj().assetPane;
	var assetDetail = mvj().assetDetail;

	assetPane.subscribe(assetPane.ASSET_SELECTED_EVENT, mvj().bind(AutoText));
	assetDetail.subscribe(assetDetail.REQUEST_ASSET_RATING_EVENT, mvj().bind(AutoText));

// Add autotext function if the first page is asset/adventure window. 
	if (mvj().assetDetail || mvj().assetAdvDetail){AutoText();}

}

//--------------------------Rating Face Fixed-----------------------------------------------------
//
function RatingFaceFix(Asset,Label,ChangingFace,Target){
	if (Asset != null){
		if(document.location.href.lastIndexOf("sporepedia") >= 1) {

			if (document.getElementById(Label) != null){
				NormalFace(Label,Target);
				ChangingFace = false;

			}

			if (Asset.quality && Asset.rating < 4 && !ChangingFace){
				FaceFix("/static/war/images/icons/ratings+1.png","Rating: Fixed by FaceFixer",Label,Target);
				ChangingFace = true;

			}
		}
	}
}

//----------------------------Face Fixed----------------------------------------------------------
//
function FaceFix(Img,Title,Label,Target){
	span = document.createElement("span");
				
	img = document.createElement("img");
	img.src = Img;
	img.title = Title;
	img.style.width = "32px";
	img.style.height = "32px";
	span.appendChild(img);
	span.id = Label;
	Target.parentNode.replaceChild(span, Target);

}

//-----------------------------Replace to Normal condition----------------------------------------
//
function NormalFace(Label,Target){

	Fixed = document.getElementById(Label);
	Fixed.parentNode.replaceChild(Target,Fixed );
}

//-------------------------Auto update function---------------------------------------------------
// 

function AutoText(){
	RatingFaceFix(mvj().assetDetail.asset, "FixAssetFace",AssetChangingFace, AssetRatingFace);
	RatingFaceFix(mvj().assetAdvDetail.asset, "FixAdvFace",AdvChangingFace, AdvRatingFace);
}