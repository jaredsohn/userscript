// ==UserScript==
// @id             www.google.com-b7b882b4-139f-408b-a5f6-635e7a071102@scriptish
// @name           Pimp My gReader (fix the 2011 redesign)
// @version        1.41
// @namespace      spanishgringo
// @author         Spanishgringo (Michael Freeman)
// @description    Improve the layout of the new Google Reader UI and add preview feature
// @include        http://www.google.com/reader/view/*
// @run-at         document-end
// ==/UserScript==

	/*fix the CSS*/  
	var cSS = document.createElement('style'); cSS.type="text/css";
	cSS.innerHTML = "#gbzw {margin-left:0;} #gbq1, #logo-section {display:none; } #gb,#gb.gbem, #gb.gbemi {height:69px;} #gb #gbx1.gbes, #gb #gbx2.gbes, #gb.gbesi #gbx1, #gb.gbesi #gbx2, #gb #gbq.gbes, #gb #gbu.gbes, #gb.gbesi #gbq, #gb.gbesi #gbu{top 25px;} #gb.gbemi #gbzw, #gbzw.gbem{margin-left:2px;} #gbzw .gbt {line-height:20px;}  #gbx1.gbes, #gbx2.gbes, #gbqlw.gbes, #gb.gbesi #gbx1, #gb.gbesi #gbx2, #gb.gbesi #gbqlw{40px;} #gbqf{width:274px;padding-left:10px;} #gbqff{width:284px;} #gbq2, #gbq2.gbes, #gb.gbesi #gbq2, #gbq2.gbem, #gb.gbemi #gbq2{margin-left:0px;} #nav, #logo-container, #lhn-add-subscription-section, #scrollable-sections-top-shadow, #scrollable-sections-bottom-shadow{width:236px;}   #gb.gbes, #gb.gbesi {height:76px;} #viewer-header-container{position:relative; z-index:991;} #gbx1,#gbx2{42px;} #gbx3, #gbx4 {height:24px;} #chrome {margin-left:236px;} #gbx1.gbem, #gbx2.gbem, #gbqlw.gbem, #gb.gbemi #gbx1, #gb.gbemi #gbx2, #gb.gbemi #gbqlw {height:40px;} #gbx1, #gbx2 {height:42px;}  #gbq2, #gbq2.gbes, #gb.gbesi #gbq2, #gbq2.gbem, #gb.gbemi #gbq2 {padding-top:4px;} #gbu {margin-right:4px;} #gbq2, #gbu, #gbu.gbem, #gbq2.gbem, #gbq3.gbem, #gb.gbemi #gbu, #gb.gbemi #gbq2, #gb.gbemi #gbq3{padding:4px 0 2px;} #gb.gbemi #gbx3, #gbx3.gbem{height:24px;} #gbx1, #gb #gbx1, #gbq, #gbu, #gb #gbq, #gb #gbu{top:26px;} body .entry-container .entry-title a, body .entry-container .entry-body a { color:#2244BB;} div.card{border-style:dotted none;    padding-bottom: 4px;} #current-entry div.card {border-color: #85C5FC;} #viewer-top-controls {max-width:600px;min-width:532px;}  #logo{display:none;} #main{overflow:visible;}#top-bar{height:40px;border:none;width:608px;} #search{display:inline-block;position:absolute;left:6px;padding:6px 0;z-index:2;min-width:420px;margin-left:0px;} #chrome-viewer-container{position:relative;top: 0px;} #viewer-header{background: none repeat scroll 0 0 transparent ;color: #333333; height: 33px; margin-right: 0; overflow: visible; margin-left: 154px;position: fixed; top:30px;width:694px;} #viewer-header-container{border-bottom: none ;padding-bottom: 4px;}  #scrollable-sections{padding-bottom:13px;} #lhn-add-subscription-section {height:32px;} 	.goog-button-base-content {line-height:1em;} #entries {padding-bottom:12px;} .jfk-button{min-width:24px;}  .jfk-button, .goog-flat-menu-button, .goog-button-base-inner-box {height:22px; line-height:22px;} .jfk-button-action { margin-left: -236px;  margin-top: 3px;  opacity: 0.6;} #search-input {width:210px;}. goog-button-tight .goog-button-base-content{line-height:1em;}#lhn-add-subscription{width:70px;height:22px; padding: 0 6px;} #reading-list-unread-count {margin-top:0} .lhn-section-primary{line-height:20px;} .section-minimize{top:4px;left:10px;} #home-section { padding: 0.2em 0 0;} #lhn-add-subscription:hover{color:#fff;} .samedir{ border-left: 1px dotted #DDDDDD;} .scroll-tree, .lhn-section{font-size:12px;} .section-minimize{left:8px:} #sub-tree-header, .folder .name.name-d-0, #lhn-selectors .selector, #overview-selector  { padding-left: 24px;} .folder .sub-icon{margin-left:24px;} .folder .folder > a > .icon {margin-left: 46px;} .folder .folder .folder-toggle{margin-left:32px;} .folder .folder > ul .icon{margin-left:44px;}  #current-entry .entry-container .entry-title a {color: #24B; text-shadow: 1px 1px 2px #DDDDDD;}  .display-none{display:none !important;} #viewer-header-container.full{margin-left:238px;} #chrome.chrome-wide{ margin-left:26px;} .previewFrame{min-height:540px;}  .card-common {background:#fdfdfd;} .read .card-common {background:#ffffff;} .jfk-button{min-width:24px; margin-right: 3px;} #viewer-view-options, #mark-all-as-read-split-button, #viewer-top-controls .goog-button{margin-right:.6em;} #viewer-refresh{min-width:20px;width:20px;} #mark-all-as-read-split-button .jfk-button {margin-right:0;}" ;
	var l = document.getElementsByTagName('link'); 
	l = l[l.length-1];
	l.parentNode.insertBefore(cSS, l);
	document.getElementById("lhn-add-subscription").className =  document.getElementById("lhn-add-subscription").className + "goog-inline-block goog-flat-menu-button";
	
 
 // a function that loads jQuery and calls a callback function when jQuery has finished loading
 // thank you erik!!!   http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
   script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}




// the guts of this userscript
function main() {
jQuery.noConflict();

var myScript = {};
myScript.checkEntries = function (){
		if (jQuery(".entry").length==0){
			return false;
		}else{
			return true;
		}
	};

	myScript.setupPreview = function (jQuery, elm){
		var prevElm = jQuery("<a class='previewLink' href='#' style='font-size:.7em;' rel='"+jQuery(".entry-title-link",elm).attr("href") +"' > Preview</a>");
				jQuery(prevElm).insertAfter(jQuery(".entry-title-link",elm));
				jQuery(prevElm).click(function(e){
				e.preventDefault();
				if(jQuery(".previewFrame", jQuery(".entry-main", elm)).length>0){

					if(jQuery(".entry-body",elm).css("display") =="none"){
						jQuery(".entry-body", elm).css("display","");
						jQuery(".previewFrame", elm).css("display","none");
					}else{
						jQuery(".entry-body", elm).css("display","none");
						jQuery(".previewFrame",elm).css("display","");
					}
				
				}else{
				//clean up some of the old iframes loaded to free up memory
				if(jQuery(".previewFrame").length>2){
				jQuery(".previewFrame",elm).css("display","");
					jQuery(".previewFrame:first").siblings(".entry-body").css("display","");
					jQuery(".previewFrame:first").remove();
				}
				//create new new iframe
				//console.log(parseInt(elm.offsetHeight)+40) ;
				//console.log("<iframe class='previewFrame' width='"+ (parseInt(jQuery("#entries").width())-34) + " height='" + (parseInt(elm.offsetHeight)+40) +"'  src='"+jQuery(".entry-title-link",elm).attr("href") +"'/>") ;
					jQuery(".entry-body",elm).parent().append(jQuery("<iframe class='previewFrame' height='" + (parseInt(elm.offsetHeight)+80) + "' width='"+ (parseInt(jQuery("#entries").width())-30) +"'  src='"+jQuery(".entry-title-link",elm).attr("href") +"'/>")).find(".entry-body").css("display","none");
					}
				});
	};

	while (myScript.checkEntries===false){
		myScript.checkEntries();
		}
		jQuery(".entry").each(function(i){
			myScript.setupPreview(jQuery, this);
		});


	jQuery("#entries").bind('DOMNodeInserted', function(e){
		//console.log("node inserted: " + e.target.className );
		if(e.target.className .search(/^entry | entry$|^entry$| entry |entry-container/gi)>=0){
				myScript.setupPreview(jQuery, e.target);
			}
	});
	
	jQuery(document).bind('keydown', function(e){
		 if (e.target.nodeName.toLowerCase()!='input' && e.shiftKey && e.keyCode==86)
		  {
		  if(jQuery("#current-entry").length>0){
			jQuery(".previewLink",'#current-entry').click();
			}else{
			jQuery(".entry:first").find(".previewLink").click();
			}
		}
		// pressing W will open and close the nav bar
		if (e.target.nodeName.toLowerCase()!='input' && e.shiftKey && e.keyCode==87){
			jQuery("#nav").toggleClass("display-none");
			jQuery("#viewer-header-container").toggleClass("full");
			jQuery("#chrome").toggleClass("chrome-wide");
		}
		
		if(e.target.className .search(/^entry | entryjQuery|^entryjQuery| entry /gi)>=0){
				myScript.setupPreview(jQuery, e.target);
				}
	});

}

// load jQuery and execute the main function
addJQuery(main);
