// ==UserScript==
// @name           NewsReader
// @author         Yukuang Goh
// @description    Modifies Channel News Asia layout to have more reading space by removing unwanted stuffs
// @version    	   1.14
// @namespace      http://ykgoh.wordpress.com
// @match          http://www.asiaone.com/*
// @match          http://www.channelnewsasia.com/*
// ==/UserScript==

var newsReader = function () {

    var website = "http://userscripts.org/scripts/show/99694";
    var version = "1.14";
    var bodyfontSize = 14; //pixels
    var minBodyFontSize = 10;
    var maxBodyFontSize = 20;

    var fontfaces = ["arial", "tahoma", "verdana"];
    var bodyFontFace = fontfaces[2];

    var cnaFooterMessage = "\
        All Article Contents wholely belongs to Channel News Asia. <br />\
        Viewing Experience is modified using <a href='" + website + "'>NewsReader " + version + "</a> Plugin.";

    //[#getElementsByClassName]
    var getElementsByClassName = function (classname, node) {
        var a = [];
		if (node == null) return a;
		
        var re = new RegExp('\\b' + classname + '\\b');
        var els = node.getElementsByTagName("*");
        for (var i = 0, j = els.length; i < j; i++)
            if (re.test(els[i].className)) a.push(els[i]);

        return a;
    }

    //[#$get] Gets and returns the requested element by ID
    var $get = function (eleName) {
        return document.getElementById(eleName);
    }

    //[#getParam] Gets parameter from URL
    var getParam = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else
            return results[1];
    }

    //[#containsString] Checks if Contains String
    var containsString = function (longstr, crit) {

        var rgx = new RegExp(crit);
        rgx.ignoreCase = true;
        //alert(longstr + "\n" + crit + "\n" + rgx.test(longstr));

        return rgx.test(longstr);

        //return (longstr.toString().toUpperCase().indexOf(crit.toString().toUpperCase()) > -1)
    }

    //[#compareString] Checks if string matches
    var compareString = function (longstr, crit) {

        var rgx = new RegExp("^" + crit + "$");
        rgx.ignoreCase = true;

        return rgx.test(longstr);
        //return (longstr.toString().toUpperCase() == crit.toString().toUpperCase());
    }


	/****************************************************************************************************************
    Channel News Asia Website (new)
    ****************************************************************************************************************/
	var removeNode = function(nde){
		if (nde != null)
			nde.parentNode.removeChild(nde);
	}
	
	var modLayout_CNA = function(){
		var classNameToRemove = [];
		
		x = $get("div-gpt-ad-imu");
		removeNode(x);
		
		var targets = [
			{
				"id": "content",
				"classname": "banner-area"
			}, 
			{
				"id": "content",
				"classname": "banner-holder-section"
			}, 
			{
				"id": "content",
				"classname": "banner-holder"
			}, 
			{
				"id": "latest-news-block",
				"classname": "side-banner-area"
			}, 
			{
				"id": "sidebar",
				"classname": "user-info-box"
			}, 
			{
				"id": "sidebar",
				"classname": "social-side-area"
			}, 
			{
				"id": "sidebar",
				"classname": "side-banner-holder"
			}
			, 
			{
				"id": "sidebar",
				"classname": "side-banner-box"
			}
		];
		
		for (var i = 0; i < targets.length; i++) {
			x = getElementsByClassName(targets[i].classname, $get(targets[i].id));
			if (x != null && x.length > 0) {
				for (var a = 0; a < x.length; a++) {
					removeNode(x[a]);
				}
			}
		}
		
		
	}
	
    var modLayout_asia1 = function () {
		var adContainerId = ["pushad", "adspace", "wrapper_ad", "yah_ad", "hot_content", "sec_adspace", "right_ad", "stclass", "awards", "fblike", "headerlogo", "LikeboxPluginPagelet"];
		for (var i=0; i<adContainerId.length; i++) {
			var element = document.getElementById(adContainerId[i]);
			if (element!= null)
				element.parentNode.removeChild(element);
		}
		
		var iframeElements = document.getElementsByTagName('iframe');
		for (var i=0; i<iframeElements.length; i++) {
			var element = iframeElements[i];
			if (element!= null)
				element.parentNode.removeChild(element);
		}
		
		var dynamicAdvertContainer = ["dclkAdsDivID"];
		var divElements = document.getElementsByTagName('div');

		for (var i=0; i<divElements.length; i++) {
			if (divElements[i].id != "") {
				for (var x=0; x<dynamicAdvertContainer.length; x++) {
					if (containsString(divElements[i].id, dynamicAdvertContainer[x])) {
						divElements[i].parentNode.removeChild(divElements[i]);
					}
				}
			}
		}

		var adContainerClassName = ["ad_imu", "art_skscaper"];
		for (var i=0; i<adContainerClassName.length; i++) {
			var elements = getElementsByClassName(adContainerClassName[i], document.body);
			if (elements!= null && elements != []) {
				for (var x=0; x<elements.length; x++) {
					var element = elements[x];
					element.parentNode.removeChild(element);	
				}
			}
		}
    }

    //[#load] Start Loading of scripts
    this.load = function () {
		if (containsString(window.location, "channelnewsasia")) {
			//modLayout_channelNewsAsia();
			modLayout_CNA();
		}
		else {
			modLayout_asia1();
		}
    }
}


try {
    //Load, Run, Release
    var reader = new newsReader();
    reader.load();
    reader = null;
}
catch (e) {
    alert(e.Description);
}