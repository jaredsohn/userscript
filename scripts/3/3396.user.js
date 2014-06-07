/*
 * Copyright (c) 2006 Amol S Deshmukh
 * Author email: amol at apache. dot. org
 *
 * Terms of Use:
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

// ==UserScript==
// @name          Search Assist
// @namespace     http://www.chaoscorder.com
// @description	  Search Assist pops up search syntax suggestions for popular search engines.   Usage: Use UP / DOWN keys to select and SPACE key to use selection.
// ==/UserScript==

// <scriptcode>

// BEGIN: toplevel functions
function SA_nvl(value, defaultValue) {
  return value ? value : defaultValue;
}
function SA_log(message) {
  GM_log("[SearchAssist] " + message);
}
// END: toplevel functions

// BEGIN: SuggestList
var SuggestList = {
  _GOOGLE_FIELDS: new Array(
       new Array("-"          ,"exclude term")
      ,new Array("+"	      ,"force include term")
      ,new Array("OR "	      ,"boolean or")
      ,new Array("allintext:" ,"restrict to doc text")
      ,new Array("site:"      ,"restrict to domain name")
      ,new Array("intitle:"   ,"search in doc title")
      ,new Array("allintitle:","all terms in title")
      ,new Array("inurl:"     ,"search in url")
      ,new Array("allinurl:"  ,"all terms in url")
      ,new Array("filetype:"  ,"restrict to file extn")
      ,new Array("-filetype:" ,"exclude file extn")
      ,new Array("daterange:" ,"date filter (days since 1/1/4713BC")
      ,new Array("cache:"     ,"retrieve from cache")
      ,new Array("link:"      ,"pages linking to url")// no other query terms can be specified
      ,new Array("allinlinks:","all terms in url")
      ,new Array("related:"   ,"related to page at url") // no other query terms can be specified
      ,new Array("info:"      ,"retrieve info about url") // no other query terms can be specified
      )
  ,
  _YAHOO_FIELDS: new Array(
       new Array("-"          ,"exclude term")
      ,new Array("+"	      ,"force include term")
      ,new Array("OR "	      ,"boolean or")
      ,new Array("site:"      ,"pages in domain name")
      ,new Array("intitle:"   ,"search in doc title")
      ,new Array("inurl:"     ,"search in url")
      ,new Array("filetype:"  ,"restrict to file extn")
      ,new Array("-filetype:" ,"exclude file extn")
      ,new Array("cache:"     ,"retrieve from cache")
      ,new Array("link:"      ,"pages linking to url")// no other query terms can be specified
      ,new Array("related:"   ,"related to page at url") // no other query terms can be specified
      ,new Array("info:"      ,"retrieve info about url") // no other query terms can be specified
      )
  ,
  _GSA_FIELDS: new Array(
       new Array("-"          ,"exclude term")
      ,new Array("+"	      ,"force include term")
      ,new Array("OR "	      ,"boolean or")
      ,new Array("site:"      ,"pages in domain name")
      ,new Array("intitle:"   ,"search in doc title")
      ,new Array("allintitle:","all terms in title")
      ,new Array("inurl:"     ,"search in url")
      ,new Array("allinurl:"  ,"all terms in url")
      ,new Array("filetype:"  ,"restrict to file extn")
      ,new Array("-filetype:" ,"exclude file extn")
      ,new Array("cache:"     ,"retrieve from cache")
      ,new Array("link:"      ,"pages linking to url")// no other query terms can be specified
      ,new Array("info:"      ,"retrieve info about url") // no other query terms can be specified
      )
  ,
  _BLOGGER_FIELDS: new Array(
       new Array("-"            ,"exclude term")
      ,new Array("+"	        ,"force include term")
      ,new Array("OR "	        ,"boolean or")
      ,new Array("inposttitle:" ,"search in post title")
      ,new Array("inpostauthor:","posts by author")
      ,new Array("inblogtitle:" ,"search in blog title")
      ,new Array("link:"        ,"posts referencing url")// no other query terms can be specified
      )
  ,
  _MSN_FIELDS: new Array(
       new Array("-"          ,"exclude term")
      ,new Array("+"          ,"force include term")
      ,new Array("AND "       ,"boolean and")
      ,new Array("OR "        ,"boolean or")
      ,new Array("NOT "       ,"same as -")
      ,new Array("contains:"  ,"linking to filetypes")
      ,new Array("filetype:"  ,"restrict to file extn")
      ,new Array("inanchor:"  ,"restrict to anchor tag")
      ,new Array("inbody:"    ,"restrict to doc text")
      ,new Array("intitle:"   ,"restrict to title")
      ,new Array("inurl:"     ,"restrict to url")
      ,new Array("ip:"        ,"site at ip address")
      ,new Array("language:"  ,"pages in language")
      ,new Array("link:"      ,"pages linking to url")
      ,new Array("linkdomain:","linking to domain")
      ,new Array("site:"      ,"pages in domain name")
      ,new Array("location:"  ,"pages in country code")
      ,new Array("prefer:"    ,"increase term weight")
      ,new Array("feed: "     ,"find feeds in website")
      ,new Array("hasfeed: "  ,"linking to feeds at")
      ,new Array("url:"       ,"pages in msn index")
  )
  ,
  allFields: null
  ,
  putDiv: null
  ,
  putDivDisplay: "none"
  ,
  suggestionDivs: new Array()
  ,
  idx: -1
  ,
  selectNext: function () {
    SuggestList.deselectAt(SuggestList.idx);
    SuggestList.idx++;
    if (SuggestList.idx >= SuggestList.allFields.length) {
      SuggestList.idx = 0;
    }
    SuggestList.selectAt(SuggestList.idx);
  }
  ,
  selectPrevious: function () {
    SuggestList.deselectAt(SuggestList.idx);
    SuggestList.idx--;
    if (SuggestList.idx < 0) {
      SuggestList.idx = SuggestList.allFields.length-1;
    }
    SuggestList.selectAt(SuggestList.idx);
  }
  ,
  putInto: function (parentDiv) {
    parentDiv.appendChild(SuggestList.putDiv);
  }
  ,
  showAll: function () {
    SuggestList.putDiv.style.display = "";
  }
  ,
  hideAll: function () {
    SuggestList.putDiv.style.display = "none";
    SuggestList.deselectAt(SuggestList.idx);
    SuggestList.idx = -1;
  }
  ,
  selectAt: function (indx) {
    if (indx >=0 && indx < SuggestList.allFields.length) {
      SuggestList.suggestionDivs[indx].style.backgroundColor = "#aaa";
    }
  }
  ,
  deselectAt: function (indx) {
    if (indx >=0 && indx < SuggestList.allFields.length) {
      SuggestList.suggestionDivs[indx].style.background = "none";
    }
  }
  ,
  initialize: function (flavor) {
    switch (flavor) {
    case "google" : SuggestList.allFields = SuggestList._GOOGLE_FIELDS;  break;
    case "yahoo"  : SuggestList.allFields = SuggestList._YAHOO_FIELDS;   break;
    case "gsa"    : SuggestList.allFields = SuggestList._GSA_FIELDS;     break;
    case "blogger": SuggestList.allFields = SuggestList._BLOGGER_FIELDS; break;
    case "msn"    : SuggestList.allFields = SuggestList._MSN_FIELDS;     break;
    }
    SuggestList.putDiv = document.createElement("div");
    SuggestList.putDiv.style.display = "none";
    var i=0;
    for (i=0; i<SuggestList.allFields.length; i++) {
      var suggestionDiv = document.createElement("div");
      suggestionDiv.style.background = "none";
      suggestionDiv.style.paddingLeft = "7px";
      suggestionDiv.style.textAlign = "left";
      suggestionDiv.style.fontFamily = "'Trebuchet MS', Arial, Verdana";
      suggestionDiv.style.fontSize = "12px";
      suggestionDiv.innerHTML = SuggestList.allFields[i][0] +
        "<span style='text-decoration: none; margin-left: 10px; color: #fff; font-size: 10px'>" +
          SuggestList.allFields[i][1] +
        "</span>";
      SuggestList.putDiv.appendChild(suggestionDiv);
      SuggestList.suggestionDivs.push(suggestionDiv);
    }
  }
  ,
  getCurrentSelection: function () {
    if (SuggestList.idx >= 0 && SuggestList.idx < SuggestList.allFields.length)
      return SuggestList.allFields[SuggestList.idx][0];
    else
      return "";
  }
};
// END: SuggestList


// BEGIN: SearchAssist
var SearchAssist = {
  displayDiv: null
  ,
  queryField: null
  ,
  suspend: false
  ,
  /**
   * params can contain any of foll (defaults will be used if not supplied):
   * inputField(name of html input field; default "q")
   * style(map of style params)
   * useLastInput(whether choose the first matching input textfield or last; default false)
   * placementDivId(html id of div relative to which SearchAssist box should be placed)
   */
  initialize: function(params) {
    var inputFieldName = SA_nvl(params["inputField"], "q");
    var styleMap = SA_nvl(params["style"], {"":""});
    var placementDivId = params["placementDivId"];
    var useLastInput = params["useLastInput"];

    var inputs = document.getElementsByTagName("input");
    var i=0;
    for (i=0; i<inputs.length; i++) {
      var name = inputs[i].getAttribute("name");
      if (name == inputFieldName) {
        SearchAssist.queryField = inputs[i];
        if (!SA_nvl(useLastInput, false)) break;
      }
    }
    SearchAssist.queryField.addEventListener("keypress", SearchAssist.keypressed, false);
    SearchAssist.displayDiv = document.createElement("div");
    SearchAssist.stylizeDisplayDiv(styleMap);

    SearchAssist.displayDiv.innerHTML = "<div style='background-color: #777; color: #fff; text-align: center'>Query Syntax Reference</div>";
    if (placementDivId) {
      if ("object" == typeof(placementDivId)) {
        var i=0;
        for (i=0; i<placementDivId.length; i++) {
          if (document.getElementById(placementDivId[i])) {
            document.getElementById(placementDivId[i]).appendChild(SearchAssist.displayDiv);
            break;
          }
        }
      }
      else { // "string" == typeof(placementDivId)
        if (!document.getElementById(placementDivId)) SA_log("placementDidvId not found:" + placementDivId);
        document.getElementById(placementDivId).appendChild(SearchAssist.displayDiv);
      }
    }
    else {
      document.getElementsByTagName("body")[0].appendChild(SearchAssist.displayDiv);
    }
    SuggestList.putInto(SearchAssist.displayDiv);
  }
  ,
  stylizeDisplayDiv: function (styleParams) {
    var dd = SearchAssist.displayDiv;
    dd.style.display    = SA_nvl(styleParams["display"], "none");
    dd.style.zIndex     = SA_nvl(styleParams["zIndex"], 100);
    dd.style.position   = SA_nvl(styleParams["position"], "absolute");
    dd.style.top        = SA_nvl(styleParams["top"], 170);
    dd.style.left       = SA_nvl(styleParams["left"], window.innerWidth-200); // IE would have needed document.body.offsetWidth
    dd.style.width      = SA_nvl(styleParams["width"], "180px");
    dd.style.marginTop  = SA_nvl(styleParams["marginTop"], "0px");
    dd.style.marginLeft = SA_nvl(styleParams["marginLeft"], "0px");
    dd.style.border     = SA_nvl(styleParams["border"], "1px solid #aaa");
    dd.style.fontSize   = SA_nvl(styleParams["fontSize"], "12px");
    dd.style.fontFamily = SA_nvl(styleParams["fontFamily"], "'Trebuchet MS', Arial, Verdana");
    dd.style.textAlign  = SA_nvl(styleParams["textAlign"], "left");
    dd.style.textDecoration = SA_nvl(styleParams["textDecoration"], "none");
    dd.style.backgroundColor = SA_nvl(styleParams["backgroundColor"], "#fff");
  }
  ,
  keypressed: function(evnt) {
    SearchAssist.displayDiv.style.display = "";

    if (SearchAssist.suspend && evnt.which == 32) {
      SearchAssist.suspend = false;
      SuggestList.showAll();
    }
    else if (!SearchAssist.suspend &&
      (evnt.keyCode == 38 || evnt.keyCode == 40 || (evnt.which == 32 && evnt.keyCode == 0))) {
      switch (evnt.keyCode) {
      case 0: // space; since which==32
        SearchAssist.queryField.value += SuggestList.getCurrentSelection();
        evnt.cancelBubble = true;
        if (evnt.preventDefault) evnt.preventDefault();
        if (evnt.stopPropagation) evnt.stopPropagation();
        SearchAssist.suspend = true;
        SuggestList.hideAll();
        break;
      case 38: // up
        SuggestList.selectPrevious();
        break;
      case 40: // down
        SuggestList.selectNext();
        break;
      }
    }
    else {
      SearchAssist.suspend = true;
      SuggestList.hideAll();
    }
  }
};
// END: SearchAssist

// BEGIN: SiteDetective
var SiteDetective = {
  isGoogle: function () {
  var retval = null;
    if (location.href.indexOf("google.com") > 0 && location.href.indexOf("google.com") < 15) {
      retval = {"type":(location.href.indexOf("q=") < 0?"main":"results")};
    }
    return retval;
  }
  ,
  isYahoo: function () {
    var retval = null;
    if (location.href.indexOf("search.yahoo.com") > 0 && location.href.indexOf("search.yahoo.com") < 15) {
      retval = {"type":(location.href.length < 30 ?"main":"results")};
    }
    return retval;
  }
  ,
  isGSA: function () {
    var retval = null;
    var inputs = document.getElementsByTagName("input");
    var i=0;
    var counter=0;
    for (i=0; i<inputs.length; i++) {
      var name = inputs[i].getAttribute("name");
      if (name=="proxystylesheet" || name=="sort" || name=="site" || name=="ie" || name=="oe") {
        counter++;
      }
      else if (name == "output") {
        if (inputs[i].value == "xml_no_dtd") counter++;
      }
    }
    if (counter > 3) {// if we find 4 identifiable elements, it is a GSA (hopefully!)
      retval = {"type":(location.href.indexOf("q=") < 0 ? "main" : "results")};
    }
    return retval;
  }
  ,
  isBlogger: function() {
    return (location.href.indexOf("search.blogger.com") > 0 && location.href.indexOf("search.blogger.com") < 15);
  }
  ,
  isMSN: function () {
    var retval = null;
    if (location.href.indexOf("search.msn.com") > 0 && location.href.indexOf("search.msn.com") < 15) {
      retval = {"type":(location.href.length < 30 ? "main" : "results")};
    }
    return retval;
  }
};
// END: SiteDetective


// BEGIN: main()
if (SiteDetective.isGoogle()) {
  var styleParams = {"position": "absolute","top": 100,"right":window.innerWidth-10,"left":""};
  SuggestList.initialize("google");
  if ("main" == SiteDetective.isGoogle()["type"]) {
    styleParams["top"] = 170;
  }

  SearchAssist.initialize({
    "inputField": "q"
   ,"useLastInput": false
   , "style": styleParams
  });
  GM_log("GoogleAssist initialized");
}

else if (SiteDetective.isYahoo()) {
  SuggestList.initialize("yahoo");
  var styleParams = {"position":"relative","width":"180px","marginLeft":"365px","marginTop":"3px"};
  if ("main" == SiteDetective.isYahoo()["type"]) { // main page
    styleParams["marginLeft"] = "365px";
    styleParams["marginTop"] = "3px";
  }
  else { // search results page
    styleParams["marginLeft"] = "0px";
    styleParams["marginTop"] = "0px";
    styleParams["position"] = "absolute";
    styleParams["top"] = 170;
    styleParams["right"] = window.innerWidth - 10;
    styleParams["left"] = "";
  }

  SearchAssist.initialize({
    "inputField": "p"
   ,"useLastInput": false
   ,"style":styleParams
   ,"placementDivId": new Array("yschsbx", "ygma")
  });
  GM_log("YahooAssist initialized");
}

else if (SiteDetective.isGSA()) {
  SuggestList.initialize("gsa");
  var useLastInput = false;
  if ("main" == SiteDetective.isGSA()["type"]) { // main page
    useLastInput = true;
  }
  SearchAssist.initialize({
    "inputField": "q"
   ,"useLastInput": useLastInput
  });
  GM_log("GSAAssist initialized");
}

else if (SiteDetective.isBlogger()) {
  SuggestList.initialize("blogger");
  SearchAssist.initialize({
    "inputField": "q"
   ,"useLastInput": false
   ,"placementDivId": "header"
  });
  GM_log("BloggerAssist initialized");
}

else if (SiteDetective.isMSN()) {
  SuggestList.initialize("msn");
  var styleParams = {"position":"absolute","width":"180px","top":10,"left":100};
  if ("main" == SiteDetective.isMSN()["type"]) { // main page
    styleParams["marginLeft"] = "365px";
    styleParams["marginTop"] = "60px";
  }
  else { // search results page
    styleParams["marginLeft"] = "-50px";
    styleParams["marginTop"] = "20px";
  }
  SearchAssist.initialize({
    "inputField": "q"
   ,"useLastInput": false
   ,"placementDivId": new Array("logo", "hplogo")
   ,"style":styleParams
  });
  GM_log("BloggerAssist initialized");
}
// END: main()
// </scriptcode>