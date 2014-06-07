function parseHeaders(_metadataBlock)
{
  var headers = {};
  var line, name, prefix, header, key, value;

  var lines = _metadataBlock.split(/\n/).filter(/\/\/ @/);
  for each (line in lines)
  {
    var name = line.match(/\/\/ @(\S+)\s*(.*)/)[1];
    var value = line.match(/\/\/ @(\S+)\s*(.*)/)[2];

    switch (name)
    {
      case "licence":
        name = "license";
        break;
    }

    var [key, prefix] = name.split(/:/).reverse();

    if (prefix)
    {
      if (!headers[prefix])
        headers[prefix] = new Object;
      header = headers[prefix];
    } else
      header = headers;

    if (header[key] && !(header[key] instanceof Array))
      header[key] = new Array(header[key]);

    if (header[key] instanceof Array)
      header[key].push(value);
    else
      header[key] = value;
  }

  headers["licence"] = headers["license"];

  return headers;
}

var fileMETA = parseHeaders(<>
  <![CDATA[
// ==UserScript==
// @name           Neobux SP 1+ (Aldione)
// @namespace      http://userscripts.org/users/211885
// @homepage       http://userscripts.org/users/211885/scripts

// @description    This script provides detailed statistics for your Neobux account and referrals (eg: ages of referrals, recent income/outcome averages, plus more!)

// @include        http://www.neobux.com/*
// @include        https://www.neobux.com/*
// @exclude        http://www.neobux.com/v/*
// @exclude        https://www.neobux.com/v/*
// @exclude        http://www.neobux.com/?u=c&s=rba
// @exclude        https://www.neobux.com/?u=c&s=rba

// @resource       remoteMeta_USO http://userscripts.org/scripts/source/90512.meta.js

// // version = major.minor.date.time // date.time = yymmdd.hhmm (GMT)
// @version        4.1.101113.1434;
// @updateNoteMin  4.1.101113.1434 = Trivial fix to the rented referrals page code after http://www.neobux.com/forum/?/3/157684/Referral-listing/ broke it; Uploaded to userscripts.org;

// @versionStatus  Developmental (Dev)
// @updateNote     4.1 = Started over to reorganise & structure the script properly;

// // Changelog ::
// @history        4.0.100615.1500 = Start of second refactoring of code to modularise code; Re-licenced to GPL;
// @history        4.0.100626.2110 = Started to create a kind of structure for the script, will start on referral statistics page first;
// @history        4.0.100627.1900 = Started extraction of the data from the graph data into the graphData[graphNumber] variable -- will start using the extracted data next;
// @history        4.0.100702.0816 = Added yellow bar under graphs - averages deisplayed in this bar not yet working properly;
// @history        4.0.100703.2035 = Reduced the amount of redundant code though not yet done completely (duplicate code across stats page and account summary to analyse graph data and show bars under graphs); Calculation of averages and sums now working; Toying with styling of the bars - applies only to stats page currently;
// @history        4.0.100708.1315 = ;
// @history        4.0.100710.0830 = Heavily reduced the amount of code by modularising the code into more specific functions; Statistics sidebar now pretty much working though multi-lingual support (temporarily) removed and a few NaN errors to fix.. needs more thorough testing;
// @history        4.0.100711.1115 = Split up the actions in the ref stats page some more and made the graph data available to all functions in run on that page by defining the variables outside of where they are defined; Ref stats page now mostly finished - TODO: add export tabs, clean up sidebar data labels, clean up how the sidebar is generated;
// @history        4.0.100711.1230 = As standard member, rented referral listings page working pretty much perfectly (i think) though zero code simplifications have been made and I am pretty much certain that script does not yet work for ultimates (not yet sorted out the function to read the minigraph data);
// @history        4.0.100713.0845 = w00t all nighter... A lot of code changes / refactoring etc.. Rented referral listings page now extracts the data from mtx not the table and is somewhat testing okay for all member types though not sure if the ultimate clicks/day, a10, 17 and rsa columns are working properly though -- needs more testing; not sure if the script will read the minigraphs properly; Added sort asc/desc buttons for all columns (working okay when you select a sorting direction though doesn't indicate what sorting is being applied if you load the ref listing via the menu/top bar);
// @history        4.0.100813.0300 = Fixed a couple bugs in sidebar calculations; Massively improved code re-use in processGraphs(); Moved some functions around that were out of structure somewhat; Moved statically set 'recent' timeframe to a preference; TODO: cleanup the preferences, figure out why manipulatePrefs() doesn't seem to be cacheing the vars to about:config;
// @history        4.0.100819.1615 = In middle of *MAJOR* edits - HUGE number of changes big & small (using "JetBrains WebStorm" code editor -- awesome!); Settings editor (probably) working; Fixed a number of aesthetic issues (jaunted columns/'congratulations message overflowing to right etc); Fixed issue with manipulatePrefs() (was checking for existance of pref using the default value); Added donate button to stats sidebar; Fixed & improved aspects of detcecting # of refs (will now correctly identify zero refs); Fixed positioning of bigred arrow; Added placeholder for the local/server time (TODO: make it show actual times);
// @history        4.0.100820.0230 = Added profit graph to Stats page;
// @history        4.0.100822.2250 = The code is a bit of a hack-together after quick mashups of code; Added storage of the graph data from the personal clicks graph and ref stats page and added info to stats sidebar; Uploaded code to userscript.org;
// @history        4.0.100822.2330 = Added ads page to @includes; Uploaded code to userscript.org;
// @history        4.0.100823.0020 = Fixed a few 'first run' issues; Uploaded code to userscript.org;
// @history        4.0.100823.0100 = Attempt at fixing the account type detection code. Need samples of pages however to understand how it is displayed on other account types; Uploaded code to userscript.org;
// @history        4.0.100823.0155 = Fixed mismatch in code relating to variable names and showing columns etc - LARGE problem with settings editor not being able to handle many settings stored as a stringified object; Uploaded code to userscript.org;
// @history        4.0.100823.0215 = Fixed clicks/day column to show the clicks in the correct order now; Edited @include and @exclude rules to allow the local/server time to show in forums pages; Uploaded code to userscript.org;
// @history        4.0.100823.1400 = Fixed Error: today.projectedDirectIncome is undefined - Line: 2627;
// @history        4.0.100823.1500 = Fixed tooltip over profit column to 'working' but TODO: needs updating; Uploaded code to userscript.org;
// @history        4.0.100825.0300 = Started over to reorganise & structure the script properly;
// @history        4.0.100826.0235 = **AWESOME** progress - accSummary and refStats pages functioning pretty much perfectly, rentedRefListing is somewhat sorted out;
// @history        4.0.100826.1625 = accSummary, rentedRefListings and refStats pages working great; Not done yet: 'income' / 'net' values do not yet take the personal clicks into account, the export tabs won't show, local/server time and settings editor not added yet;
// @history        4.1.100827.0840 = whole bunch of stuff, don't remember.. ; Added instructions that load up on the first run / checks on following runs that inform the user that they need to run the script on a few pages to collect info before the script will function correctly;
// @history        4.1.100829.2330 = Fixed widenPage() to take into account the added items within existing columns - the rented referral listings page should now work correctly;
// @history        4.1.100829.2345 = Fixed error in grabbing cost to renew for 15 days instead of the recycle cost;
// @history        4.1.100830.2045 = Gotten the new settings editor to handle storing the values as objects - need to 'fill it out' now for it to edit other prefs too;
// @history        4.1.100830.2355 = Settings editor can now handle non-object variables too now; Setup the option for accordion-style menus to save space;
// @history        4.1.100831.1325 = Temporary fix for totalClickAverage counting new refs (<24hrs old) as having an average of 999 but earlier in the script it doesn't;
// @history        4.1.100901.1445 = Added the personal click income into the 'income' section of the stats sidebar; Fixed a few issues with the ordering of data causing the stats sidebar to show it in reverse; Fixed a few typos in variable names; Fixed a few issues with the raverage; Uploaded to userscripts.org;
// @history        4.1.100903.0245 = Redesigned definition of myAccountDetails and script.preferences; Made the column indexes not specific to the rented ref page (should now run okay on the direct refs page though likely to be NaN errors or similar); Changed the stats code to not calculate the sum based on the mean * time period (errors with lack of accuracy in the mean causing the sum to be wrong by (1 - 0.999...) ; Fixed the dates in the generated profit graph to not be hard-coded as July 2010 (now generated dynamically);
// @history        4.1.100903.0525 = Fixed many of the direct referral page issues - the direct refs page should now function well;
// @history        4.1.100903.1150 = Fixed the balance transfer to correctly identify and alert when a successful transfer occurs when the Portuguese language is being used;
// @history        4.1.100903.1900 = Major overhaul of the data structure to bring all the graph info into the _graphs object; Added the 'sum's to the graph databars; Redesigned code to allow easy switching of the order of the timeperiods;
// @history        4.1.100903.2100 = Added local/server time code (copy paste from previous versions);
// @history        4.1.100904.0145 = Many changes / fixes as outlined here < http://www.neobux.com/forum/?frmid=7&tpcid=141956&msgid=1583085#m1583085 >; Uploaded to userscripts.org;
// @history        4.1.100904.1650 = Updated the preference editing code to be more resilient against storing objects; Updated some of the server time code;
// @history        4.1.100905.0150 = Added auto-update code; Uploaded to userscripts.org;
// @history        4.1.100907.1915 = Added Object.prototype.append();
// @history        4.1.100908.0230 = Gotten setterGetter_GM_Storage() to a workable state, where the script will save the default prefs recursively okay, but setters/getters do not allow setting/getting non-top-level variables in the object: columnPrefix and shownColumn are set as String || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.columnPrefix && Boolean || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.showColumn;
// @history        4.1.100908.1254 = Problems with myAccountDetails && ACCOUNT_FUNCTIONS  --  not functioning correctly when used with setterGetter_GM_Storage, so defining myAccountDetails.renewalFees outside of the main myAccountDetails declaration.;
// @history        4.1.100908.1500 = Fixed tooltips to stay on the page and allow the mouse to move over the tooltip; Uploaded to userscripts.org;
// @history        4.1.100908.2000 = Added handling for the golden extension scheduling graph for - needs testing by > golden members;
// @history        4.1.100909.0230 = Fixed problems with the server time w/ the server hour not being checked if it is <0 or >=24;
// @history        4.1.100910.1740 = Fixed some issues with the autoupdator; Still some problems for golden members wrt the scheduling graph so have removed that code for this release; Uploaded to userscripts.org;
// @history        4.1.100910.1820 = userscripts is down so temporarily removing the @require and changing the update code; re-included the code for the extensions databar;
// @history        4.1.100910.1900 = userscripts is back up; extension schedule stuff doesn't seem to be working but doesn't appear to break anythnig so is left in..; Uploaded oto userscripts.org;
// @history        4.1.100913.1310 = Detection of the server time offset should now work in EN & PT;
// @history        4.1.100913.1430 = Removed testing code that forces the updater to show, regardless of whether the userscripts.org version is newer; Uploaded to userscripts.org;
// @history        4.1.100913.1500 = Fixed handling of (boolean) false settings - last click column and average colmun should no longer be replace; Increased updater checking period to 2hours (120mins);
// @history        4.1.100913.1515 = Fixed ultimate only columns being shown when more than 100 refs showing on a page; Uploaded to userscripts.org;
// @history        4.1.100914.0300 = Added an *awesome* new feature - click on the local/server time to see which time periods you should be clicking in to follow TOS 3.7.. red is one time period, blue is another; Uploaded to userscripts.org;
// @history        4.1.100914.1400 = Added the fixes suggested bp surbrec: Fixed the profit columns for goldens & ultimates, changed the column header for the average column; Uploaded to userscripts.org;
// @history        4.1.100914.1600 = Re-added the graph export tabs (ctrl+click on the export tab to reverse the order); Uploaded to userscripts.org;
// @history        4.1.100914.1615 = Added the option to disable the local/server time clock; Uploaded to userscripts.org;
// @history        4.1.100915.0300 = Fixed the spacer row in referrals pages not spanning the whole table and the footer row information bar not showing if there are fewer than 3 refs on the page (common with direct refs for example); Uploaded to userscripts.org;
// @history        4.1.100915.1200 = Altered the local/server time to be appended to the uppor-right corner rather than overwriting the contents of that area (eg, to stop it hiding "1 New History");
// @history        4.1.100915.1420 = Hopefully fixed the ultimate graphs issue and added some logging code to help identify cause if it doesn't work; Uploaded to Userscripts.org;
// @history        4.1.100919.1230 = Big/many changes all rolled into one update note..: Inserted a slightly modified copy of surebrec's update to insertChartDataBars() - hopefully the extensions databars should work for >=golden members now; Updated the updater code to look to kwah.org for its updates because userscripts.org keeps going down; Fixed the 'yesterday's average issues; I managed to make a large push towards 'fixing' a whole bunch of code style issues and inconsistencies; Fixed existing problems with the preferences editor; Changed how the server time is calculated; Uploaded to userscripts.org;
// @history        4.1.100920.1530 = Fixed a few issues with the extensions graph; Uploaded to userscripts.org;
// @history        4.1.100920.1930 = Extensions graph stopped from causing a loop, possible issues with extensions chart databar displaying wrong numbers - will confirm asap; Uploaded to userscripts.org;
// @history        4.1.100920.2000 = Added the line of supplied by surebrec to fix the crashing of the stats page; ToDo: alter code to display (0-7): (8-15): (16-30): etc...; Uploaded to userscripts.org;
// @history        4.1.100920.2255 = Altered the extensions databar code to display (0-7): (8-15): (16-30): etc...; Fixed a bug in the profit column causing the hovertip to not show (was caused by the a comparison not working after it had been made into a strict comparison); Uploaded to userscripts.org;
// @history        4.1.100921.0415 = Goldens-only 'referrals due for extensions' graph databar now confirmed to be working & displaying in the format '(0-7): (8-15): (16-30)'; Changed the standard's profit graph to span the whole table; Cleaned up the error console log messages so that you don't get spammed with them on page loads;
// @history        4.1.100922.2130 = Fixed test in showThisIfUserHasReferrals(); Altered instatces of .day/.yesterday/.recent to be ['day']/['yesterday']/['recent'] to enhance readability;
// @history        4.1.100923.2100 = Changed the stats sidebar to only show rented/direct referral-specific stats if the user currently has that regerral tyye (note: if you recently had these refs but don't have them now it may make things look odd/inconsistent); Changed location to update the script back to userscripts.org - if you want to check kwah.org then change the alphaTester setting; Uploaded to userscripts.org;
// @history        4.1.100924.0115 = Fixed the problems with the profit column caused by the partial refactoring; Fixed a number of potential ultimate column issues (bad tests for how many refs currently shown on a page); Removed bunch of function defining code out from a loop so hopefully there'll be some minor speed increases on the rented referrals page; Note to self: avoid the temptation of code formatting/refactoring tools like the plague from now on unless I go through *EVERY* change it makes before it is applied ;) ; Uploaded to userscripts.org;
// @history        4.1.100924.0130 = A few changes that were missed fromin the very long last update note 15mins ago: the databars are now wider (surebrec), the databars are also now central and lower than before; Many variables changed to avoid ambiguity (ex: whether 'currentReferral' refers to the current referral's row or data info); Uploaded to userscripts.org;
// @history        4.1.100924.1335 = Changed how the the width of the data bars, located under the graphs, is calculated to allow for expansion where necessary; Changed a few labels on the stats sidebar (mostly grammar stuff);
// @history        4.1.100927.1135 = Added more options to the settings editor; Hopefully fixed the extensions message bug reported by surebrec; Uploaded to userscripts.org;
// @history        4.1.101027.1939 = Fixed the problem of the server time displaying oddly (caused by the edit to the Neobux site layout for halloween); Uploaded to userscripts.org;
// @history        4.1.101113.1434 = Trivial fix to the rented referrals page code after http://www.neobux.com/forum/?/3/157684/Referral-listing/ broke it; Uploaded to userscripts.org;


// ==/UserScript==
]]></>.toString());

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js
// @require        http://cdn.jquerytools.org/1.2.4/jquery.tools.min.js



/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();



/*
 * jQuery Tools 1.2.4 - The missing UI library for the Web
 *
 * [toolbox.flashembed, toolbox.history, toolbox.expose, toolbox.mousewheel, tabs, tabs.slideshow, tooltip, tooltip.slide, tooltip.dynamic, scrollable, scrollable.autoscroll, scrollable.navigator, overlay, overlay.apple, dateinput, rangeinput, validator]
 *
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 *
 * http://flowplayer.org/tools/
 *
 * jquery.event.wheel.js - rev 1
 * Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
 * Liscensed under the MIT License (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 * Created: 2008-07-01 | Updated: 2008-07-14
 *
 * -----
 *
 * File generated: Wed Aug 18 09:10:10 GMT 2010
 */
(function(){function f(a,b){if(b)for(var c in b)if(b.hasOwnProperty(c))a[c]=b[c];return a}function l(a,b){var c=[];for(var d in a)if(a.hasOwnProperty(d))c[d]=b(a[d]);return c}function m(a,b,c){if(e.isSupported(b.version))a.innerHTML=e.getHTML(b,c);else if(b.expressInstall&&e.isSupported([6,65]))a.innerHTML=e.getHTML(f(b,{src:b.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title});else{if(!a.innerHTML.replace(/\s/g,"")){a.innerHTML="<h2>Flash version "+b.version+
" or greater is required</h2><h3>"+(g[0]>0?"Your version is "+g:"You have no flash plugin installed")+"</h3>"+(a.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='"+k+"'>here</a></p>");if(a.tagName=="A")a.onclick=function(){location.href=k}}if(b.onFail){var d=b.onFail.call(this);if(typeof d=="string")a.innerHTML=d}}if(i)window[b.id]=document.getElementById(b.id);f(this,{getRoot:function(){return a},getOptions:function(){return b},getConf:function(){return c},
getApi:function(){return a.firstChild}})}var i=document.all,k="http://www.adobe.com/go/getflashplayer",n=typeof jQuery=="function",o=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,j={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};window.attachEvent&&window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}});
window.flashembed=function(a,b,c){if(typeof a=="string")a=document.getElementById(a.replace("#",""));if(a){if(typeof b=="string")b={src:b};return new m(a,f(f({},j),b),c)}};var e=f(window.flashembed,{conf:j,getVersion:function(){var a,b;try{b=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(c){try{b=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"))&&a.GetVariable("$version")}catch(d){try{b=(a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"))&&a.GetVariable("$version")}catch(h){}}}return(b=
o.exec(b))?[b[1],b[3]]:[0,0]},asString:function(a){if(a===null||a===undefined)return null;var b=typeof a;if(b=="object"&&a.push)b="array";switch(b){case "string":a=a.replace(new RegExp('(["\\\\])',"g"),"\\$1");a=a.replace(/^\s?(\d+\.?\d+)%/,"$1pct");return'"'+a+'"';case "array":return"["+l(a,function(d){return e.asString(d)}).join(",")+"]";case "function":return'"function()"';case "object":b=[];for(var c in a)a.hasOwnProperty(c)&&b.push('"'+c+'":'+e.asString(a[c]));return"{"+b.join(",")+"}"}return String(a).replace(/\s/g,
" ").replace(/\'/g,'"')},getHTML:function(a,b){a=f({},a);var c='<object width="'+a.width+'" height="'+a.height+'" id="'+a.id+'" name="'+a.id+'"';if(a.cachebusting)a.src+=(a.src.indexOf("?")!=-1?"&":"?")+Math.random();c+=a.w3c||!i?' data="'+a.src+'" type="application/x-shockwave-flash"':' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';c+=">";if(a.w3c||i)c+='<param name="movie" value="'+a.src+'" />';a.width=a.height=a.id=a.w3c=a.src=null;a.onFail=a.version=a.expressInstall=null;for(var d in a)if(a[d])c+=
'<param name="'+d+'" value="'+a[d]+'" />';a="";if(b){for(var h in b)if(b[h]){d=b[h];a+=h+"="+(/function|object/.test(typeof d)?e.asString(d):d)+"&"}a=a.slice(0,-1);c+='<param name="flashvars" value=\''+a+"' />"}c+="</object>";return c},isSupported:function(a){return g[0]>a[0]||g[0]==a[0]&&g[1]>=a[1]}}),g=e.getVersion();if(n){jQuery.tools=jQuery.tools||{version:"1.2.4"};jQuery.tools.flashembed={conf:j};jQuery.fn.flashembed=function(a,b){return this.each(function(){$(this).data("flashembed",flashembed(this,
a,b))})}}})();
(function(b){function h(c){if(c){var a=d.contentWindow.document;a.open().close();a.location.hash=c}}var g,d,f,i;b.tools=b.tools||{version:"1.2.4"};b.tools.history={init:function(c){if(!i){if(b.browser.msie&&b.browser.version<"8"){if(!d){d=b("<iframe/>").attr("src","javascript:false;").hide().get(0);b("body").append(d);setInterval(function(){var a=d.contentWindow.document;a=a.location.hash;g!==a&&b.event.trigger("hash",a)},100);h(location.hash||"#")}}else setInterval(function(){var a=location.hash;
a!==g&&b.event.trigger("hash",a)},100);f=!f?c:f.add(c);c.click(function(a){var e=b(this).attr("href");d&&h(e);if(e.slice(0,1)!="#"){location.href="#"+e;return a.preventDefault()}});i=true}}};b(window).bind("hash",function(c,a){a?f.filter(function(){var e=b(this).attr("href");return e==a||e==a.replace("#","")}).trigger("history",[a]):f.eq(0).trigger("history",[a]);g=a;window.location.hash=g});b.fn.history=function(c){b.tools.history.init(this);return this.bind("history",c)}})(jQuery);
(function(b){function k(){if(b.browser.msie){var a=b(document).height(),d=b(window).height();return[window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a-d<20?d:a]}return[b(document).width(),b(document).height()]}function h(a){if(a)return a.call(b.mask)}b.tools=b.tools||{version:"1.2.4"};var l;l=b.tools.expose={conf:{maskId:"exposeMask",loadSpeed:"slow",closeSpeed:"fast",closeOnClick:true,closeOnEsc:true,zIndex:9998,opacity:0.8,startOpacity:0,color:"#fff",onLoad:null,
onClose:null}};var c,i,e,g,j;b.mask={load:function(a,d){if(e)return this;if(typeof a=="string")a={color:a};a=a||g;g=a=b.extend(b.extend({},l.conf),a);c=b("#"+a.maskId);if(!c.length){c=b("<div/>").attr("id",a.maskId);b("body").append(c)}var m=k();c.css({position:"absolute",top:0,left:0,width:m[0],height:m[1],display:"none",opacity:a.startOpacity,zIndex:a.zIndex});a.color&&c.css("backgroundColor",a.color);if(h(a.onBeforeLoad)===false)return this;a.closeOnEsc&&b(document).bind("keydown.mask",function(f){f.keyCode==
27&&b.mask.close(f)});a.closeOnClick&&c.bind("click.mask",function(f){b.mask.close(f)});b(window).bind("resize.mask",function(){b.mask.fit()});if(d&&d.length){j=d.eq(0).css("zIndex");b.each(d,function(){var f=b(this);/relative|absolute|fixed/i.test(f.css("position"))||f.css("position","relative")});i=d.css({zIndex:Math.max(a.zIndex+1,j=="auto"?0:j)})}c.css({display:"block"}).fadeTo(a.loadSpeed,a.opacity,function(){b.mask.fit();h(a.onLoad);e="full"});e=true;return this},close:function(){if(e){if(h(g.onBeforeClose)===
false)return this;c.fadeOut(g.closeSpeed,function(){h(g.onClose);i&&i.css({zIndex:j});e=false});b(document).unbind("keydown.mask");c.unbind("click.mask");b(window).unbind("resize.mask")}return this},fit:function(){if(e){var a=k();c.css({width:a[0],height:a[1]})}},getMask:function(){return c},isLoaded:function(a){return a?e=="full":e},getConf:function(){return g},getExposed:function(){return i}};b.fn.mask=function(a){b.mask.load(a);return this};b.fn.expose=function(a){b.mask.load(a,this);return this}})(jQuery);
(function(b){function c(a){switch(a.type){case "mousemove":return b.extend(a.data,{clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY});case "DOMMouseScroll":b.extend(a,a.data);a.delta=-a.detail/3;break;case "mousewheel":a.delta=a.wheelDelta/120;break}a.type="wheel";return b.event.handle.call(this,a,a.delta)}b.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)};b.event.special.wheel={setup:function(){b.event.add(this,d,c,{})},teardown:function(){b.event.remove(this,
d,c)}};var d=!b.browser.mozilla?"mousewheel":"DOMMouseScroll"+(b.browser.version<"1.9"?" mousemove":"")})(jQuery);
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs==="a"&&d.find(a.tabs+location.hash).length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.4"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);
(function(d){function r(g,a){function p(f){var e=d(f);return e.length<2?e:g.parent().find(f)}var c=this,j=g.add(this),b=g.data("tabs"),h,m,k,n=false,o=p(a.next).click(function(){b.next()}),l=p(a.prev).click(function(){b.prev()});d.extend(c,{getTabs:function(){return b},getConf:function(){return a},play:function(){if(!h){var f=d.Event("onBeforePlay");j.trigger(f);if(f.isDefaultPrevented())return c;n=false;h=setInterval(b.next,a.interval);j.trigger("onPlay");b.next()}},pause:function(){if(!h&&!k)return c;
var f=d.Event("onBeforePause");j.trigger(f);if(f.isDefaultPrevented())return c;h=clearInterval(h);k=clearInterval(k);j.trigger("onPause")},stop:function(){c.pause();n=true}});d.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(f,e){d.isFunction(a[e])&&c.bind(e,a[e]);c[e]=function(s){return c.bind(e,s)}});if(a.autopause){var t=b.getTabs().add(o).add(l).add(b.getPanes());t.hover(function(){c.pause();m=clearInterval(m)},function(){n||(m=setTimeout(c.play,a.interval))})}if(a.autoplay)k=
setTimeout(c.play,a.interval);else c.stop();a.clickable&&b.getPanes().click(function(){b.next()});if(!b.getConf().rotate){var i=a.disabledClass;b.getIndex()||l.addClass(i);b.onBeforeClick(function(f,e){if(e){l.removeClass(i);e==b.getTabs().length-1?o.addClass(i):o.removeClass(i)}else l.addClass(i)})}}var q;q=d.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:false,autopause:true,interval:3E3,clickable:true,api:false}};d.fn.slideshow=function(g){var a=
this.data("slideshow");if(a)return a;g=d.extend({},q.conf,g);this.each(function(){a=new r(d(this),g);d(this).data("slideshow",a)});return g.api?a:this}})(jQuery);
(function(f){function p(a,b,c){var h=c.relative?a.position().top:a.offset().top,e=c.relative?a.position().left:a.offset().left,i=c.position[0];h-=b.outerHeight()-c.offset[0];e+=a.outerWidth()+c.offset[1];var j=b.outerHeight()+a.outerHeight();if(i=="center")h+=j/2;if(i=="bottom")h+=j;i=c.position[1];a=b.outerWidth()+a.outerWidth();if(i=="center")e-=a/2;if(i=="left")e-=a;return{top:h,left:e}}function u(a,b){var c=this,h=a.add(c),e,i=0,j=0,m=a.attr("title"),q=a.attr("data-tooltip"),r=n[b.effect],l,s=
a.is(":input"),v=s&&a.is(":checkbox, :radio, select, :button, :submit"),t=a.attr("type"),k=b.events[t]||b.events[s?v?"widget":"input":"def"];if(!r)throw'Nonexistent effect "'+b.effect+'"';k=k.split(/,\s*/);if(k.length!=2)throw"Tooltip: bad events configuration for "+t;a.bind(k[0],function(d){clearTimeout(i);if(b.predelay)j=setTimeout(function(){c.show(d)},b.predelay);else c.show(d)}).bind(k[1],function(d){clearTimeout(j);if(b.delay)i=setTimeout(function(){c.hide(d)},b.delay);else c.hide(d)});if(m&&
b.cancelDefault){a.removeAttr("title");a.data("title",m)}f.extend(c,{show:function(d){if(!e){if(q)e=f(q);else if(m)e=f(b.layout).addClass(b.tipClass).appendTo(document.body).hide().append(m);else if(b.tip)e=f(b.tip).eq(0);else{e=a.next();e.length||(e=a.parent().next())}if(!e.length)throw"Cannot find tooltip for "+a;}if(c.isShown())return c;e.stop(true,true);var g=p(a,e,b);d=d||f.Event();d.type="onBeforeShow";h.trigger(d,[g]);if(d.isDefaultPrevented())return c;g=p(a,e,b);e.css({position:"absolute",
top:g.top,left:g.left});l=true;r[0].call(c,function(){d.type="onShow";l="full";h.trigger(d)});g=b.events.tooltip.split(/,\s*/);e.bind(g[0],function(){clearTimeout(i);clearTimeout(j)});g[1]&&!a.is("input:not(:checkbox, :radio), textarea")&&e.bind(g[1],function(o){o.relatedTarget!=a[0]&&a.trigger(k[1].split(" ")[0])});return c},hide:function(d){if(!e||!c.isShown())return c;d=d||f.Event();d.type="onBeforeHide";h.trigger(d);if(!d.isDefaultPrevented()){l=false;n[b.effect][1].call(c,function(){d.type="onHide";
h.trigger(d)});return c}},isShown:function(d){return d?l=="full":l},getConf:function(){return b},getTip:function(){return e},getTrigger:function(){return a}});f.each("onHide,onBeforeShow,onShow,onBeforeHide".split(","),function(d,g){f.isFunction(b[g])&&f(c).bind(g,b[g]);c[g]=function(o){f(c).bind(g,o);return c}})}f.tools=f.tools||{version:"1.2.4"};f.tools.tooltip={conf:{effect:"toggle",fadeOutSpeed:"fast",predelay:0,delay:30,opacity:1,tip:0,position:["top","center"],offset:[0,0],relative:false,cancelDefault:true,
events:{def:"mouseenter,mouseleave",input:"focus,blur",widget:"focus mouseenter,blur mouseleave",tooltip:"mouseenter,mouseleave"},layout:"<div/>",tipClass:"tooltip"},addEffect:function(a,b,c){n[a]=[b,c]}};var n={toggle:[function(a){var b=this.getConf(),c=this.getTip();b=b.opacity;b<1&&c.css({opacity:b});c.show();a.call()},function(a){this.getTip().hide();a.call()}],fade:[function(a){var b=this.getConf();this.getTip().fadeTo(b.fadeInSpeed,b.opacity,a)},function(a){this.getTip().fadeOut(this.getConf().fadeOutSpeed,
a)}]};f.fn.tooltip=function(a){var b=this.data("tooltip");if(b)return b;a=f.extend(true,{},f.tools.tooltip.conf,a);if(typeof a.position=="string")a.position=a.position.split(/,?\s/);this.each(function(){b=new u(f(this),a);f(this).data("tooltip",b)});return a.api?b:this}})(jQuery);
(function(d){var i=d.tools.tooltip;d.extend(i.conf,{direction:"up",bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!d.browser.msie});var e={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};i.addEffect("slide",function(g){var a=this.getConf(),f=this.getTip(),b=a.slideFade?{opacity:a.opacity}:{},c=e[a.direction]||e.up;b[c[1]]=c[0]+"="+a.slideOffset;a.slideFade&&f.css({opacity:0});f.show().animate(b,a.slideInSpeed,g)},function(g){var a=this.getConf(),f=a.slideOffset,
b=a.slideFade?{opacity:0}:{},c=e[a.direction]||e.up,h=""+c[0];if(a.bounce)h=h=="+"?"-":"+";b[c[1]]=h+"="+f;this.getTip().animate(b,a.slideOutSpeed,function(){d(this).hide();g.call()})})})(jQuery);
(function(g){function j(a){var c=g(window),d=c.width()+c.scrollLeft(),h=c.height()+c.scrollTop();return[a.offset().top<=c.scrollTop(),d<=a.offset().left+a.width(),h<=a.offset().top+a.height(),c.scrollLeft()>=a.offset().left]}function k(a){for(var c=a.length;c--;)if(a[c])return false;return true}var i=g.tools.tooltip;i.dynamic={conf:{classNames:"top right bottom left"}};g.fn.dynamic=function(a){if(typeof a=="number")a={speed:a};a=g.extend({},i.dynamic.conf,a);var c=a.classNames.split(/\s/),d;this.each(function(){var h=
g(this).tooltip().onBeforeShow(function(e,f){e=this.getTip();var b=this.getConf();d||(d=[b.position[0],b.position[1],b.offset[0],b.offset[1],g.extend({},b)]);g.extend(b,d[4]);b.position=[d[0],d[1]];b.offset=[d[2],d[3]];e.css({visibility:"hidden",position:"absolute",top:f.top,left:f.left}).show();f=j(e);if(!k(f)){if(f[2]){g.extend(b,a.top);b.position[0]="top";e.addClass(c[0])}if(f[3]){g.extend(b,a.right);b.position[1]="right";e.addClass(c[1])}if(f[0]){g.extend(b,a.bottom);b.position[0]="bottom";e.addClass(c[2])}if(f[1]){g.extend(b,
a.left);b.position[1]="left";e.addClass(c[3])}if(f[0]||f[2])b.offset[0]*=-1;if(f[1]||f[3])b.offset[1]*=-1}e.css({visibility:"visible"}).hide()});h.onBeforeShow(function(){var e=this.getConf();this.getTip();setTimeout(function(){e.position=[d[0],d[1]];e.offset=[d[2],d[3]]},0)});h.onHide(function(){var e=this.getTip();e.removeClass(a.classNames)});ret=h});return a.api?ret:this}})(jQuery);
(function(e){function n(f,c){var a=e(c);return a.length<2?a:f.parent().find(c)}function t(f,c){var a=this,l=f.add(a),g=f.children(),k=0,m=c.vertical;j||(j=a);if(g.length>1)g=e(c.items,f);e.extend(a,{getConf:function(){return c},getIndex:function(){return k},getSize:function(){return a.getItems().size()},getNaviButtons:function(){return o.add(p)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(b,d){return a.seekTo(k+
b,d)},next:function(b){return a.move(1,b)},prev:function(b){return a.move(-1,b)},begin:function(b){return a.seekTo(0,b)},end:function(b){return a.seekTo(a.getSize()-1,b)},focus:function(){return j=a},addItem:function(b){b=e(b);if(c.circular){g.children("."+c.clonedClass+":last").before(b);g.children("."+c.clonedClass+":first").replaceWith(b.clone().addClass(c.clonedClass))}else g.append(b);l.trigger("onAddItem",[b]);return a},seekTo:function(b,d,h){b.jquery||(b*=1);if(c.circular&&b===0&&k==-1&&d!==
0)return a;if(!c.circular&&b<0||b>a.getSize()||b<-1)return a;var i=b;if(b.jquery)b=a.getItems().index(b);else i=a.getItems().eq(b);var q=e.Event("onBeforeSeek");if(!h){l.trigger(q,[b,d]);if(q.isDefaultPrevented()||!i.length)return a}i=m?{top:-i.position().top}:{left:-i.position().left};k=b;j=a;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){l.trigger("onSeek",[b])});return a}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(b,d){e.isFunction(c[d])&&e(a).bind(d,c[d]);a[d]=function(h){e(a).bind(d,
h);return a}});if(c.circular){var r=a.getItems().slice(-1).clone().prependTo(g),s=a.getItems().eq(1).clone().appendTo(g);r.add(s).addClass(c.clonedClass);a.onBeforeSeek(function(b,d,h){if(!b.isDefaultPrevented())if(d==-1){a.seekTo(r,h,function(){a.end(0)});return b.preventDefault()}else d==a.getSize()&&a.seekTo(s,h,function(){a.begin(0)})});a.seekTo(0,0,function(){})}var o=n(f,c.prev).click(function(){a.prev()}),p=n(f,c.next).click(function(){a.next()});!c.circular&&a.getSize()>1&&a.onBeforeSeek(function(b,
d){setTimeout(function(){if(!b.isDefaultPrevented()){o.toggleClass(c.disabledClass,d<=0);p.toggleClass(c.disabledClass,d>=a.getSize()-1)}},1)});c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(b,d){if(c.mousewheel){a.move(d<0?1:-1,c.wheelSpeed||50);return false}});c.keyboard&&e(document).bind("keydown.scrollable",function(b){if(!(!c.keyboard||b.altKey||b.ctrlKey||e(b.target).is(":input")))if(!(c.keyboard!="static"&&j!=a)){var d=b.keyCode;if(m&&(d==38||d==40)){a.move(d==38?-1:1);return b.preventDefault()}if(!m&&
(d==37||d==39)){a.move(d==37?-1:1);return b.preventDefault()}}});c.initialIndex&&a.seekTo(c.initialIndex,0,function(){})}e.tools=e.tools||{version:"1.2.4"};e.tools.scrollable={conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,wheelSpeed:0}};var j;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},
e.tools.scrollable.conf,f);this.each(function(){c=new t(e(this),f);e(this).data("scrollable",c)});return f.api?c:this}})(jQuery);
(function(c){var g=c.tools.scrollable;g.autoscroll={conf:{autoplay:true,interval:3E3,autopause:true}};c.fn.autoscroll=function(d){if(typeof d=="number")d={interval:d};var b=c.extend({},g.autoscroll.conf,d),h;this.each(function(){var a=c(this).data("scrollable");if(a)h=a;var e,i,f=true;a.play=function(){if(!e){f=false;e=setInterval(function(){a.next()},b.interval);a.next()}};a.pause=function(){e=clearInterval(e)};a.stop=function(){a.pause();f=true};b.autopause&&a.getRoot().add(a.getNaviButtons()).hover(function(){a.pause();
clearInterval(i)},function(){f||(i=setTimeout(a.play,b.interval))});b.autoplay&&setTimeout(a.play,b.interval)});return b.api?h:this}})(jQuery);
(function(d){function p(b,g){var h=d(g);return h.length<2?h:b.parent().find(g)}var m=d.tools.scrollable;m.navigator={conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,idPrefix:null,history:false}};d.fn.navigator=function(b){if(typeof b=="string")b={navi:b};b=d.extend({},m.navigator.conf,b);var g;this.each(function(){function h(a,c,i){e.seekTo(c);if(j){if(location.hash)location.hash=a.attr("href").replace("#","")}else return i.preventDefault()}function f(){return k.find(b.naviItem||
"> *")}function n(a){var c=d("<"+(b.naviItem||"a")+"/>").click(function(i){h(d(this),a,i)}).attr("href","#"+a);a===0&&c.addClass(l);b.indexed&&c.text(a+1);b.idPrefix&&c.attr("id",b.idPrefix+a);return c.appendTo(k)}function o(a,c){a=f().eq(c.replace("#",""));a.length||(a=f().filter("[href="+c+"]"));a.click()}var e=d(this).data("scrollable"),k=b.navi.jquery?b.navi:p(e.getRoot(),b.navi),q=e.getNaviButtons(),l=b.activeClass,j=b.history&&d.fn.history;if(e)g=e;e.getNaviButtons=function(){return q.add(k)};
f().length?f().each(function(a){d(this).click(function(c){h(d(this),a,c)})}):d.each(e.getItems(),function(a){n(a)});e.onBeforeSeek(function(a,c){setTimeout(function(){if(!a.isDefaultPrevented()){var i=f().eq(c);!a.isDefaultPrevented()&&i.length&&f().removeClass(l).eq(c).addClass(l)}},1)});e.onAddItem(function(a,c){c=n(e.getItems().index(c));j&&c.history(o)});j&&f().history(o)});return b.api?g:this}})(jQuery);
(function(a){function t(d,b){var c=this,i=d.add(c),o=a(window),k,f,m,g=a.tools.expose&&(b.mask||b.expose),n=Math.random().toString().slice(10);if(g){if(typeof g=="string")g={color:g};g.closeOnClick=g.closeOnEsc=false}var p=b.target||d.attr("rel");f=p?a(p):d;if(!f.length)throw"Could not find Overlay: "+p;d&&d.index(f)==-1&&d.click(function(e){c.load(e);return e.preventDefault()});a.extend(c,{load:function(e){if(c.isOpened())return c;var h=q[b.effect];if(!h)throw'Overlay: cannot find effect : "'+b.effect+
'"';b.oneInstance&&a.each(s,function(){this.close(e)});e=e||a.Event();e.type="onBeforeLoad";i.trigger(e);if(e.isDefaultPrevented())return c;m=true;g&&a(f).expose(g);var j=b.top,r=b.left,u=f.outerWidth({margin:true}),v=f.outerHeight({margin:true});if(typeof j=="string")j=j=="center"?Math.max((o.height()-v)/2,0):parseInt(j,10)/100*o.height();if(r=="center")r=Math.max((o.width()-u)/2,0);h[0].call(c,{top:j,left:r},function(){if(m){e.type="onLoad";i.trigger(e)}});g&&b.closeOnClick&&a.mask.getMask().one("click",
c.close);b.closeOnClick&&a(document).bind("click."+n,function(l){a(l.target).parents(f).length||c.close(l)});b.closeOnEsc&&a(document).bind("keydown."+n,function(l){l.keyCode==27&&c.close(l)});return c},close:function(e){if(!c.isOpened())return c;e=e||a.Event();e.type="onBeforeClose";i.trigger(e);if(!e.isDefaultPrevented()){m=false;q[b.effect][1].call(c,function(){e.type="onClose";i.trigger(e)});a(document).unbind("click."+n).unbind("keydown."+n);g&&a.mask.close();return c}},getOverlay:function(){return f},
getTrigger:function(){return d},getClosers:function(){return k},isOpened:function(){return m},getConf:function(){return b}});a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","),function(e,h){a.isFunction(b[h])&&a(c).bind(h,b[h]);c[h]=function(j){a(c).bind(h,j);return c}});k=f.find(b.close||".close");if(!k.length&&!b.close){k=a('<a class="close"></a>');f.prepend(k)}k.click(function(e){c.close(e)});b.load&&c.load()}a.tools=a.tools||{version:"1.2.4"};a.tools.overlay={addEffect:function(d,
b,c){q[d]=[b,c]},conf:{close:null,closeOnClick:true,closeOnEsc:true,closeSpeed:"fast",effect:"default",fixed:!a.browser.msie||a.browser.version>6,left:"center",load:false,mask:null,oneInstance:true,speed:"normal",target:null,top:"10%"}};var s=[],q={};a.tools.overlay.addEffect("default",function(d,b){var c=this.getConf(),i=a(window);if(!c.fixed){d.top+=i.scrollTop();d.left+=i.scrollLeft()}d.position=c.fixed?"fixed":"absolute";this.getOverlay().css(d).fadeIn(c.speed,b)},function(d){this.getOverlay().fadeOut(this.getConf().closeSpeed,
d)});a.fn.overlay=function(d){var b=this.data("overlay");if(b)return b;if(a.isFunction(d))d={onBeforeLoad:d};d=a.extend(true,{},a.tools.overlay.conf,d);this.each(function(){b=new t(a(this),d);s.push(b);a(this).data("overlay",b)});return d.api?b:this}})(jQuery);
(function(i){function j(b){var d=b.offset();return{top:d.top+b.height()/2,left:d.left+b.width()/2}}var k=i.tools.overlay,f=i(window);i.extend(k.conf,{start:{top:null,left:null},fadeInSpeed:"fast",zIndex:9999});function n(b,d){var a=this.getOverlay(),c=this.getConf(),g=this.getTrigger(),o=this,l=a.outerWidth({margin:true}),h=a.data("img");if(!h){var e=a.css("backgroundImage");if(!e)throw"background-image CSS property not set for overlay";e=e.slice(e.indexOf("(")+1,e.indexOf(")")).replace(/\"/g,"");
a.css("backgroundImage","none");h=i('<img src="'+e+'"/>');h.css({border:0,display:"none"}).width(l);i("body").append(h);a.data("img",h)}e=c.start.top||Math.round(f.height()/2);var m=c.start.left||Math.round(f.width()/2);if(g){g=j(g);e=g.top;m=g.left}h.css({position:"absolute",top:e,left:m,width:0,zIndex:c.zIndex}).show();b.top+=f.scrollTop();b.left+=f.scrollLeft();b.position="absolute";a.css(b);h.animate({top:a.css("top"),left:a.css("left"),width:l},c.speed,function(){if(c.fixed){b.top-=f.scrollTop();
b.left-=f.scrollLeft();b.position="fixed";h.add(a).css(b)}a.css("zIndex",c.zIndex+1).fadeIn(c.fadeInSpeed,function(){o.isOpened()&&!i(this).index(a)?d.call():a.hide()})})}function p(b){var d=this.getOverlay().hide(),a=this.getConf(),c=this.getTrigger();d=d.data("img");var g={top:a.start.top,left:a.start.left,width:0};c&&i.extend(g,j(c));a.fixed&&d.css({position:"absolute"}).animate({top:"+="+f.scrollTop(),left:"+="+f.scrollLeft()},0);d.animate(g,a.closeSpeed,b)}k.addEffect("apple",n,p)})(jQuery);
(function(d){function R(b,c){return 32-(new Date(b,c,32)).getDate()}function S(b,c){b=""+b;for(c=c||2;b.length<c;)b="0"+b;return b}function T(b,c,i){var p=b.getDate(),h=b.getDay(),q=b.getMonth();b=b.getFullYear();var f={d:p,dd:S(p),ddd:B[i].shortDays[h],dddd:B[i].days[h],m:q+1,mm:S(q+1),mmm:B[i].shortMonths[q],mmmm:B[i].months[q],yy:String(b).slice(2),yyyy:b};c=c.replace(X,function(r){return r in f?f[r]:r.slice(1,r.length-1)});return Y.html(c).html()}function y(b){return parseInt(b,10)}function U(b,
c){return b.getFullYear()===c.getFullYear()&&b.getMonth()==c.getMonth()&&b.getDate()==c.getDate()}function C(b){if(b){if(b.constructor==Date)return b;if(typeof b=="string"){var c=b.split("-");if(c.length==3)return new Date(y(c[0]),y(c[1])-1,y(c[2]));if(!/^-?\d+$/.test(b))return;b=y(b)}c=new Date;c.setDate(c.getDate()+b);return c}}function Z(b,c){function i(a,e,g){m=a;D=a.getFullYear();E=a.getMonth();G=a.getDate();g=g||d.Event("api");g.type="change";H.trigger(g,[a]);if(!g.isDefaultPrevented()){b.val(T(a,
e.format,e.lang));b.data("date",a);h.hide(g)}}function p(a){a.type="onShow";H.trigger(a);d(document).bind("keydown.d",function(e){if(e.ctrlKey)return true;var g=e.keyCode;if(g==8){b.val("");return h.hide(e)}if(g==27)return h.hide(e);if(d(V).index(g)>=0){if(!v){h.show(e);return e.preventDefault()}var j=d("#"+f.weeks+" a"),s=d("."+f.focus),n=j.index(s);s.removeClass(f.focus);if(g==74||g==40)n+=7;else if(g==75||g==38)n-=7;else if(g==76||g==39)n+=1;else if(g==72||g==37)n-=1;if(n>41){h.addMonth();s=d("#"+
f.weeks+" a:eq("+(n-42)+")")}else if(n<0){h.addMonth(-1);s=d("#"+f.weeks+" a:eq("+(n+42)+")")}else s=j.eq(n);s.addClass(f.focus);return e.preventDefault()}if(g==34)return h.addMonth();if(g==33)return h.addMonth(-1);if(g==36)return h.today();if(g==13)d(e.target).is("select")||d("."+f.focus).click();return d([16,17,18,9]).index(g)>=0});d(document).bind("click.d",function(e){var g=e.target;if(!d(g).parents("#"+f.root).length&&g!=b[0]&&(!L||g!=L[0]))h.hide(e)})}var h=this,q=new Date,f=c.css,r=B[c.lang],
k=d("#"+f.root),M=k.find("#"+f.title),L,I,J,D,E,G,m=b.attr("data-value")||c.value||b.val(),o=b.attr("min")||c.min,t=b.attr("max")||c.max,v;if(o===0)o="0";m=C(m)||q;o=C(o||c.yearRange[0]*365);t=C(t||c.yearRange[1]*365);if(!r)throw"Dateinput: invalid language: "+c.lang;if(b.attr("type")=="date"){var N=d("<input/>");d.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","),function(a,e){N.attr(e,b.attr(e))});b.replaceWith(N);b=N}b.addClass(f.input);var H=
b.add(h);if(!k.length){k=d("<div><div><a/><div/><a/></div><div><div/><div/></div></div>").hide().css({position:"absolute"}).attr("id",f.root);k.children().eq(0).attr("id",f.head).end().eq(1).attr("id",f.body).children().eq(0).attr("id",f.days).end().eq(1).attr("id",f.weeks).end().end().end().find("a").eq(0).attr("id",f.prev).end().eq(1).attr("id",f.next);M=k.find("#"+f.head).find("div").attr("id",f.title);if(c.selectors){var z=d("<select/>").attr("id",f.month),A=d("<select/>").attr("id",f.year);M.append(z.add(A))}for(var $=
k.find("#"+f.days),O=0;O<7;O++)$.append(d("<span/>").text(r.shortDays[(O+c.firstDay)%7]));d("body").append(k)}if(c.trigger)L=d("<a/>").attr("href","#").addClass(f.trigger).click(function(a){h.show();return a.preventDefault()}).insertAfter(b);var K=k.find("#"+f.weeks);A=k.find("#"+f.year);z=k.find("#"+f.month);d.extend(h,{show:function(a){if(!(b.is("[readonly]")||v)){a=a||d.Event();a.type="onBeforeShow";H.trigger(a);if(!a.isDefaultPrevented()){d.each(W,function(){this.hide()});v=true;z.unbind("change").change(function(){h.setValue(A.val(),
d(this).val())});A.unbind("change").change(function(){h.setValue(d(this).val(),z.val())});I=k.find("#"+f.prev).unbind("click").click(function(){I.hasClass(f.disabled)||h.addMonth(-1);return false});J=k.find("#"+f.next).unbind("click").click(function(){J.hasClass(f.disabled)||h.addMonth();return false});h.setValue(m);var e=b.position();k.css({top:e.top+b.outerHeight({margins:true})+c.offset[0],left:e.left+c.offset[1]});if(c.speed)k.show(c.speed,function(){p(a)});else{k.show();p(a)}return h}}},setValue:function(a,
e,g){var j;if(parseInt(e,10)>=-1){a=y(a);e=y(e);g=y(g);j=new Date(a,e,g)}else{j=a||m;a=j.getFullYear();e=j.getMonth();g=j.getDate()}if(e==-1){e=11;a--}else if(e==12){e=0;a++}if(!v){i(j,c);return h}E=e;D=a;g=new Date(a,e,1-c.firstDay);g=g.getDay();var s=R(a,e),n=R(a,e-1),P;if(c.selectors){z.empty();d.each(r.months,function(w,F){o<new Date(a,w+1,-1)&&t>new Date(a,w,0)&&z.append(d("<option/>").html(F).attr("value",w))});A.empty();j=q.getFullYear();for(var l=j+c.yearRange[0];l<j+c.yearRange[1];l++)o<
new Date(l+1,-1,0)&&t>new Date(l,0,0)&&A.append(d("<option/>").text(l));z.val(e);A.val(a)}else M.html(r.months[e]+" "+a);K.empty();I.add(J).removeClass(f.disabled);l=!g?-7:0;for(var u,x;l<(!g?35:42);l++){u=d("<a/>");if(l%7===0){P=d("<div/>").addClass(f.week);K.append(P)}if(l<g){u.addClass(f.off);x=n-g+l+1;j=new Date(a,e-1,x)}else if(l>=g+s){u.addClass(f.off);x=l-s-g+1;j=new Date(a,e+1,x)}else{x=l-g+1;j=new Date(a,e,x);if(U(m,j))u.attr("id",f.current).addClass(f.focus);else U(q,j)&&u.attr("id",f.today)}o&&
j<o&&u.add(I).addClass(f.disabled);t&&j>t&&u.add(J).addClass(f.disabled);u.attr("href","#"+x).text(x).data("date",j);P.append(u)}K.find("a").click(function(w){var F=d(this);if(!F.hasClass(f.disabled)){d("#"+f.current).removeAttr("id");F.attr("id",f.current);i(F.data("date"),c,w)}return false});f.sunday&&K.find(f.week).each(function(){var w=c.firstDay?7-c.firstDay:0;d(this).children().slice(w,w+1).addClass(f.sunday)});return h},setMin:function(a,e){o=C(a);e&&m<o&&h.setValue(o);return h},setMax:function(a,
e){t=C(a);e&&m>t&&h.setValue(t);return h},today:function(){return h.setValue(q)},addDay:function(a){return this.setValue(D,E,G+(a||1))},addMonth:function(a){return this.setValue(D,E+(a||1),G)},addYear:function(a){return this.setValue(D+(a||1),E,G)},hide:function(a){if(v){a=d.Event();a.type="onHide";H.trigger(a);d(document).unbind("click.d").unbind("keydown.d");if(a.isDefaultPrevented())return;k.hide();v=false}return h},getConf:function(){return c},getInput:function(){return b},getCalendar:function(){return k},
getValue:function(a){return a?T(m,a,c.lang):m},isOpen:function(){return v}});d.each(["onBeforeShow","onShow","change","onHide"],function(a,e){d.isFunction(c[e])&&d(h).bind(e,c[e]);h[e]=function(g){d(h).bind(e,g);return h}});b.bind("focus click",h.show).keydown(function(a){var e=a.keyCode;if(!v&&d(V).index(e)>=0){h.show(a);return a.preventDefault()}return a.shiftKey||a.ctrlKey||a.altKey||e==9?true:a.preventDefault()});C(b.val())&&i(m,c)}d.tools=d.tools||{version:"1.2.4"};var W=[],Q,V=[75,76,38,39,
74,72,40,37],B={};Q=d.tools.dateinput={conf:{format:"mm/dd/yy",selectors:false,yearRange:[-5,5],lang:"en",offset:[0,0],speed:0,firstDay:0,min:undefined,max:undefined,trigger:false,css:{prefix:"cal",input:"date",root:0,head:0,title:0,prev:0,next:0,month:0,year:0,days:0,body:0,weeks:0,today:0,current:0,week:0,off:0,sunday:0,focus:0,disabled:0,trigger:0}},localize:function(b,c){d.each(c,function(i,p){c[i]=p.split(",")});B[b]=c}};Q.localize("en",{months:"January,February,March,April,May,June,July,August,September,October,November,December",
shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec",days:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",shortDays:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"});var X=/d{1,4}|m{1,4}|yy(?:yy)?|"[^"]*"|'[^']*'/g,Y=d("<a/>");d.expr[":"].date=function(b){var c=b.getAttribute("type");return c&&c=="date"||!!d(b).data("dateinput")};d.fn.dateinput=function(b){if(this.data("dateinput"))return this;b=d.extend(true,{},Q.conf,b);d.each(b.css,function(i,p){if(!p&&i!="prefix")b.css[i]=(b.css.prefix||"")+
(p||i)});var c;this.each(function(){var i=new Z(d(this),b);W.push(i);i=i.getInput().data("dateinput",i);c=c?c.add(i):i});return c?c:this}})(jQuery);
(function(e){function F(d,a){a=Math.pow(10,a);return Math.round(d*a)/a}function p(d,a){if(a=parseInt(d.css(a),10))return a;return(d=d[0].currentStyle)&&d.width&&parseInt(d.width,10)}function C(d){return(d=d.data("events"))&&d.onSlide}function G(d,a){function h(c,b,f,j){if(f===undefined)f=b/k*z;else if(j)f-=a.min;if(r)f=Math.round(f/r)*r;if(b===undefined||r)b=f*k/z;if(isNaN(f))return g;b=Math.max(0,Math.min(b,k));f=b/k*z;if(j||!n)f+=a.min;if(n)if(j)b=k-b;else f=a.max-f;f=F(f,t);var q=c.type=="click";
if(D&&l!==undefined&&!q){c.type="onSlide";A.trigger(c,[f,b]);if(c.isDefaultPrevented())return g}j=q?a.speed:0;q=q?function(){c.type="change";A.trigger(c,[f])}:null;if(n){m.animate({top:b},j,q);a.progress&&B.animate({height:k-b+m.width()/2},j)}else{m.animate({left:b},j,q);a.progress&&B.animate({width:b+m.width()/2},j)}l=f;H=b;d.val(f);return g}function s(){if(n=a.vertical||p(i,"height")>p(i,"width")){k=p(i,"height")-p(m,"height");u=i.offset().top+k}else{k=p(i,"width")-p(m,"width");u=i.offset().left}}
function v(){s();g.setValue(a.value||a.min)}var g=this,o=a.css,i=e("<div><div/><a href='#'/></div>").data("rangeinput",g),n,l,u,k,H;d.before(i);var m=i.addClass(o.slider).find("a").addClass(o.handle),B=i.find("div").addClass(o.progress);e.each("min,max,step,value".split(","),function(c,b){c=d.attr(b);if(parseFloat(c))a[b]=parseFloat(c,10)});var z=a.max-a.min,r=a.step=="any"?0:a.step,t=a.precision;if(t===undefined)try{t=r.toString().split(".")[1].length}catch(I){t=0}if(d.attr("type")=="range"){var w=
e("<input/>");e.each("class,disabled,id,maxlength,name,readonly,required,size,style,tabindex,title,value".split(","),function(c,b){w.attr(b,d.attr(b))});w.val(a.value);d.replaceWith(w);d=w}d.addClass(o.input);var A=e(g).add(d),D=true;e.extend(g,{getValue:function(){return l},setValue:function(c,b){return h(b||e.Event("api"),undefined,c,true)},getConf:function(){return a},getProgress:function(){return B},getHandle:function(){return m},getInput:function(){return d},step:function(c,b){b=b||e.Event();
var f=a.step=="any"?1:a.step;g.setValue(l+f*(c||1),b)},stepUp:function(c){return g.step(c||1)},stepDown:function(c){return g.step(-c||-1)}});e.each("onSlide,change".split(","),function(c,b){e.isFunction(a[b])&&e(g).bind(b,a[b]);g[b]=function(f){e(g).bind(b,f);return g}});m.drag({drag:false}).bind("dragStart",function(){D=C(e(g))||C(d)}).bind("drag",function(c,b,f){if(d.is(":disabled"))return false;h(c,n?b:f)}).bind("dragEnd",function(c){if(!c.isDefaultPrevented()){c.type="change";A.trigger(c,[l])}}).click(function(c){return c.preventDefault()});
i.click(function(c){if(d.is(":disabled")||c.target==m[0])return c.preventDefault();s();var b=m.width()/2;h(c,n?k-u-b+c.pageY:c.pageX-u-b)});a.keyboard&&d.keydown(function(c){if(!d.attr("readonly")){var b=c.keyCode,f=e([75,76,38,33,39]).index(b)!=-1,j=e([74,72,40,34,37]).index(b)!=-1;if((f||j)&&!(c.shiftKey||c.altKey||c.ctrlKey)){if(f)g.step(b==33?10:1,c);else if(j)g.step(b==34?-10:-1,c);return c.preventDefault()}}});d.blur(function(c){var b=e(this).val();b!==l&&g.setValue(b,c)});e.extend(d[0],{stepUp:g.stepUp,
stepDown:g.stepDown});v();k||e(window).load(v)}e.tools=e.tools||{version:"1.2.4"};var E;E=e.tools.rangeinput={conf:{min:0,max:100,step:"any",steps:0,value:0,precision:undefined,vertical:0,keyboard:true,progress:false,speed:100,css:{input:"range",slider:"slider",progress:"progress",handle:"handle"}}};var x,y;e.fn.drag=function(d){document.ondragstart=function(){return false};d=e.extend({x:true,y:true,drag:true},d);x=x||e(document).bind("mousedown mouseup",function(a){var h=e(a.target);if(a.type=="mousedown"&&
h.data("drag")){var s=h.position(),v=a.pageX-s.left,g=a.pageY-s.top,o=true;x.bind("mousemove.drag",function(i){var n=i.pageX-v;i=i.pageY-g;var l={};if(d.x)l.left=n;if(d.y)l.top=i;if(o){h.trigger("dragStart");o=false}d.drag&&h.css(l);h.trigger("drag",[i,n]);y=h});a.preventDefault()}else try{y&&y.trigger("dragEnd")}finally{x.unbind("mousemove.drag");y=null}});return this.data("drag",true)};e.expr[":"].range=function(d){var a=d.getAttribute("type");return a&&a=="range"||!!e(d).filter("input").data("rangeinput")};
e.fn.rangeinput=function(d){if(this.data("rangeinput"))return this;d=e.extend(true,{},E.conf,d);var a;this.each(function(){var h=new G(e(this),e.extend(true,{},d));h=h.getInput().data("rangeinput",h);a=a?a.add(h):h});return a?a:this}})(jQuery);
(function(e){function t(a,b,c){var k=a.offset().top,f=a.offset().left,l=c.position.split(/,?\s+/),p=l[0];l=l[1];k-=b.outerHeight()-c.offset[0];f+=a.outerWidth()+c.offset[1];c=b.outerHeight()+a.outerHeight();if(p=="center")k+=c/2;if(p=="bottom")k+=c;a=a.outerWidth();if(l=="center")f-=(a+b.outerWidth())/2;if(l=="left")f-=a;return{top:k,left:f}}function x(a){function b(){return this.getAttribute("type")==a}b.key="[type="+a+"]";return b}function u(a,b,c){function k(g,d,j){if(!(!c.grouped&&g.length)){var h;
if(j===false||e.isArray(j)){h=i.messages[d.key||d]||i.messages["*"];h=h[c.lang]||i.messages["*"].en;(d=h.match(/\$\d/g))&&e.isArray(j)&&e.each(d,function(n){h=h.replace(this,j[n])})}else h=j[c.lang]||j;g.push(h)}}var f=this,l=b.add(f);a=a.not(":button, :image, :reset, :submit");e.extend(f,{getConf:function(){return c},getForm:function(){return b},getInputs:function(){return a},reflow:function(){a.each(function(){var g=e(this),d=g.data("msg.el");if(d){g=t(g,d,c);d.css({top:g.top,left:g.left})}});return f},
invalidate:function(g,d){if(!d){var j=[];e.each(g,function(h,n){h=a.filter("[name='"+h+"']");if(h.length){h.trigger("OI",[n]);j.push({input:h,messages:[n]})}});g=j;d=e.Event()}d.type="onFail";l.trigger(d,[g]);d.isDefaultPrevented()||r[c.effect][0].call(f,g,d);return f},reset:function(g){g=g||a;g.removeClass(c.errorClass).each(function(){var d=e(this).data("msg.el");if(d){d.remove();e(this).data("msg.el",null)}}).unbind(c.errorInputEvent||"");return f},destroy:function(){b.unbind(c.formEvent).unbind("reset.V");
a.unbind(c.inputEvent||"").unbind("change.V");return f.reset()},checkValidity:function(g,d){g=g||a;g=g.not(":disabled");if(!g.length)return true;d=d||e.Event();d.type="onBeforeValidate";l.trigger(d,[g]);if(d.isDefaultPrevented())return d.result;var j=[],h=c.errorInputEvent+".v";g.not(":radio:not(:checked)").each(function(){var q=[],m=e(this).unbind(h).data("messages",q);e.each(v,function(){var o=this,s=o[0];if(m.filter(s).length){o=o[1].call(f,m,m.val());if(o!==true){d.type="onBeforeFail";l.trigger(d,
[m,s]);if(d.isDefaultPrevented())return false;var w=m.attr(c.messageAttr);if(w){q=[w];return false}else k(q,s,o)}}});if(q.length){j.push({input:m,messages:q});m.trigger("OI",[q]);c.errorInputEvent&&m.bind(h,function(o){f.checkValidity(m,o)})}if(c.singleError&&j.length)return false});var n=r[c.effect];if(!n)throw'Validator: cannot find effect "'+c.effect+'"';if(j.length){f.invalidate(j,d);return false}else{n[1].call(f,g,d);d.type="onSuccess";l.trigger(d,[g]);g.unbind(h)}return true}});e.each("onBeforeValidate,onBeforeFail,onFail,onSuccess".split(","),
function(g,d){e.isFunction(c[d])&&e(f).bind(d,c[d]);f[d]=function(j){e(f).bind(d,j);return f}});c.formEvent&&b.bind(c.formEvent,function(g){if(!f.checkValidity(null,g))return g.preventDefault()});b.bind("reset.V",function(){f.reset()});a[0]&&a[0].validity&&a.each(function(){this.oninvalid=function(){return false}});if(b[0])b[0].checkValidity=f.checkValidity;c.inputEvent&&a.bind(c.inputEvent,function(g){f.checkValidity(e(this),g)});a.filter(":checkbox, select").filter("[required]").bind("change.V",
function(g){var d=e(this);if(this.checked||d.is("select")&&e(this).val())r[c.effect][1].call(f,d,g)});var p=a.filter(":radio").change(function(g){f.checkValidity(p,g)});e(window).resize(function(){f.reflow()})}e.tools=e.tools||{version:"1.2.4"};var y=/\[type=([a-z]+)\]/,z=/^-?[0-9]*(\.[0-9]+)?$/,A=/^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i,B=/^(https?:\/\/)?[\da-z\.\-]+\.[a-z\.]{2,6}[#\?\/\w \.\-=]*$/i,i;i=e.tools.validator={conf:{grouped:false,effect:"default",errorClass:"invalid",inputEvent:null,
errorInputEvent:"keyup",formEvent:"submit",lang:"en",message:"<div/>",messageAttr:"data-message",messageClass:"error",offset:[0,0],position:"center right",singleError:false,speed:"normal"},messages:{"*":{en:"Please correct this value"}},localize:function(a,b){e.each(b,function(c,k){i.messages[c]=i.messages[c]||{};i.messages[c][a]=k})},localizeFn:function(a,b){i.messages[a]=i.messages[a]||{};e.extend(i.messages[a],b)},fn:function(a,b,c){if(e.isFunction(b))c=b;else{if(typeof b=="string")b={en:b};this.messages[a.key||
a]=b}if(b=y.exec(a))a=x(b[1]);v.push([a,c])},addEffect:function(a,b,c){r[a]=[b,c]}};var v=[],r={"default":[function(a){var b=this.getConf();e.each(a,function(c,k){c=k.input;c.addClass(b.errorClass);var f=c.data("msg.el");if(!f){f=e(b.message).addClass(b.messageClass).appendTo(document.body);c.data("msg.el",f)}f.css({visibility:"hidden",display:"none"}).find("span").remove();e.each(k.messages,function(l,p){e("<span/>").html(p).appendTo(f)});f.outerWidth()==f.parent().width()&&f.add(f.find("p")).css({display:"inline"});
k=t(c,f,b);f.css({visibility:"visible",position:"absolute",top:k.top,left:k.left}).fadeIn(b.speed)})},function(a){var b=this.getConf();a.removeClass(b.errorClass).each(function(){var c=e(this).data("msg.el");c&&c.css({visibility:"hidden"})})}]};e.each("email,url,number".split(","),function(a,b){e.expr[":"][b]=function(c){return c.getAttribute("type")===b}});e.fn.oninvalid=function(a){return this[a?"bind":"trigger"]("OI",a)};i.fn(":email","Please enter a valid email address",function(a,b){return!b||
A.test(b)});i.fn(":url","Please enter a valid URL",function(a,b){return!b||B.test(b)});i.fn(":number","Please enter a numeric value.",function(a,b){return z.test(b)});i.fn("[max]","Please enter a value smaller than $1",function(a,b){if(b===""||e.tools.dateinput&&a.is(":date"))return true;a=a.attr("max");return parseFloat(b)<=parseFloat(a)?true:[a]});i.fn("[min]","Please enter a value larger than $1",function(a,b){if(b===""||e.tools.dateinput&&a.is(":date"))return true;a=a.attr("min");return parseFloat(b)>=
parseFloat(a)?true:[a]});i.fn("[required]","Please complete this mandatory field.",function(a,b){if(a.is(":checkbox"))return a.is(":checked");return!!b});i.fn("[pattern]",function(a){var b=new RegExp("^"+a.attr("pattern")+"$");return b.test(a.val())});e.fn.validator=function(a){var b=this.data("validator");if(b){b.destroy();this.removeData("validator")}a=e.extend(true,{},i.conf,a);if(this.is("form"))return this.each(function(){var c=e(this);b=new u(c.find(":input"),c,a);c.data("validator",b)});else{b=
new u(this,this.eq(0).closest("form"),a);return this.data("validator",b)}}})(jQuery);





/* CONSTANTS */

var MSPD = 86400000; // MilliSeconds Per Day
var Today = new Date();
var Yesterday = new Date();
Yesterday.setDate(Today.getDate() - 1);
var Recent = new Date();
Recent.setDate(Today.getDate() - 7);

var TODAY_STRING = Today.getFullYear() + '/' + ((10 > (Today.getMonth() + 1)) ? '0' : '') + (Today.getMonth() + 1) + '/' + ((10 > Today.getDate()) ? '0' : '') + Today.getDate();
var YESTERDAY_STRING = Yesterday.getFullYear() + '/' + ((10 > (Yesterday.getMonth() + 1)) ? '0' : '') + (Yesterday.getMonth() + 1) + '/' + ((10 > Yesterday.getDate()) ? '0' : '') + Yesterday.getDate();
var RECENT_STRING = Yesterday.getFullYear() + '/' + ((10 > (Yesterday.getMonth() + 1)) ? '0' : '') + (Yesterday.getMonth() + 1) + '/' + ((10 < Yesterday.getDate()) ? '0' : '') + Yesterday.getDate();

var dates_array = [];
var i=0;
do
{
  var blah = new Date();
  blah.setDate(new Date().getDate() - i);
  dates_array[9-i] = blah.getFullYear() + '/' + padZeros(blah.getMonth()+1, 2) + '/' + padZeros(blah.getDate(), 2);
  i++;

}while(90 > i);




var friendlyNameLookup = {
  'ch_cliques': 'personalClicks',
  'ch_cr': 'rentedClicks',
  'ch_cd': 'directClicks',
  'ch_recycle': 'recycleCost',
  'ch_extensions': 'renewalCost',
  'ch_autopay': 'autopayCost',
  'ch_trrb': 'transferAmounts',
  'ch_ext_schedule': 'extensions',
  'ch_earnings': 'referralEarinings',
  'ch_profit': 'referralProfit'
};


// //COMPATIBILITY ////

// Logging //
// If GM_log() not available, attempt to use other logging methods
if ('undefined' == typeof GM_log) 
{
  // Firebug & Opera
  if ('undefined' !== typeof console.info) {
    console.info('typeof console.info = ' + (typeof console.info));
    function GM_log(_message) { console.info(_message); }
  }
}

// GM_registerMenuCommand() //
if ('undefined' == typeof GM_registerMenuCommand) 
{
  // Alternative not yet created
  function GM_registerMenuCommand(){
    // TODO: Elements placed into the page
  }
}

// GM_addStyle() //
// The same function as used within the Greasemonkey source
if ('undefined' == typeof GM_addStyle) 
{
  function GM_addStyle(_css) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
      var style = document.createElement("style");
      style.textContent = _css;
      style.type = "text/css";
      head.appendChild(style);
    }
    return style;
  }
}


// Persistent Storage //
// Dilemma -- what to use when Greasemonkey's GM_[get|set]Value() not available

// Cookie storage::
// Decision: Cannot use cookies as cookies are sent to the server on *EVERY*
// page request
// Problem1: Will potentially(?) make the site seem sluggish
// Problem2: Potential privacy concern: will enable Neobux to track your usage
// of scripts

// HTML5 localStorage::
// Problem1: localStorage databases are scoped to an HTML5 origin, thus values
// stored when viewing http:// pages are not accessible via https:// pages (and
// vice versa)
// Problem2: Still a potential privacy problem as data stored by localStorage is
// also accessible by the page itself, but as the data does not get sent to the
// server every time a page is loaded there is less overhead and the fact that
// you are using a script is not "broadcasted"


// Will try using HTML5 localStorage to implement similar functionality as
// GM_get/setValue (lesser of the evils?)
if ('undefined' == typeof GM_setValue)
{
  function GM_set_value(_key, _value) {
    try {
      window.localStorage[_key] = _value;
    } catch(e) {
      GM_log("Error inside GM_set_value");
      GM_log(e);
    }
    // GM_log("Return from GM_set_value.\n" + _key + ":" + _value);
  }
}

if ('undefined' == typeof GM_get_value)
{
  function GM_get_value(_key, _value) {
    // GM_log('Get Item:' + _key);
    // Store item in local storage:
    if ('undefined' !== typeof window.localStorage[_key] && 'undefined' !== window.localStorage[_key]) {
      // if ("false" === window.localStorage[_key]) {
      // return false;
      // } else if ("true" === window.localStorage[_key]) {
      // return true;
      // } else {
      return window.localStorage[_key];
      // }
    } else {
      GM_log("GM_get_value: Could not find _key:" + _key);
      if ('undefined' !== typeof _value) {
        GM_log("GM_get_value: setting default _value");
        GM_set_value(_key, _value);
        GM_log("GM_get_value: returning default _value");
        return _value;
      } else {
        GM_log("GM_get_value: no default _value set");
        return undefined;
      }
    }
  }
}



// /////////////////////////
// //UTILITY FUNCTIONS ////
// /////////////////////////
function utils() { }

function t_bold(_text){
  return "<b>"+_text+"</b>";
}
function t_italic(_text){
  return "<i>"+_text+"</i>";
}
function t_underline(_text){
  return "<u>"+_text+"</u>";
}
function t_small(_text){
  return "<small>"+_text+"</small>";
}


function logger()
{
  var loggingEnabled = true;
//  if(!loggingEnabled){
//    var console={};
//    console.info = function() {};
//  }

  if(0 < arguments.__count__){
    console.info(arguments);
  }
  else
  {
    console.info(arguments[0]);
  }
}

function docEvaluate(_xpath)
{
  return document.evaluate(_xpath,
      document,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null);
}

/* Set a default base to prevent issues arising to the default octal base*/
___parseInt = parseInt;
parseInt = function (str, base) { if(!base){ console.info('parseInt() Warning!: Base not set'); } return ___parseInt(str, base || 10) };


Object.merge = function Object_merge(_newObj)
{
  if('object' !== typeof _newObj) {
    logger("ERROR!\nObject.merge = function Object_merge(_newObj)\n\n_newObj is not an Object!");
  }

  for (newVar in _newObj)
  {
    switch(typeof _newObj[newVar]){
      case "boolean":
      //Fall-through
      case "string":
      //Fall-through
      case "number":
        this[newVar] = _newObj[newVar];
        break;

      case "object":
        this[newVar] = this[newVar] || {};
        this[newVar].append(_newObj[newVar]);
        break;

      case "function":
        if('append' !== newVar){
          this[newVar] = _newObj[newVar];
        }
        break;

      default:
        logger('Error!\nObject.merge = function Object_merge(_newObj)');
    }
  }

  return this;

};

function padZeros(_input,_desiredStringLength)
{
  var currentLength = _input.toString().length;
  var output = _input;
  for(var i=0; i < (_desiredStringLength - currentLength); i++) {
    output = '0' + output;
  }
  return output;
}

function sanitiseDate(_dateString)
{
  _dateString = _dateString.replace(/Today/,TODAY_STRING);
  _dateString = _dateString.replace(/Yesterday/,YESTERDAY_STRING);

  return _dateString;
}

function toBool(_str)
{
  switch(_str){
    case "false":
      return false;
      break;
    case "true":
      return true;
      break;
    default:
      return _str;
      break;
  }
}


function manipulatePrefs() {}

/**
 * Sets a stored variable using whatever storage methods are available
 * NOTE: Currently only supports GM_setValue()
 *
 * @param    _pref    The name of the stored variable being set
 * @param    _value   The value of the stored variable being set
 *
 * @return
 *
 */
manipulatePrefs.setPref = function manipulatePrefs_setPref(_pref, _value)
{
  //    _pref = _pref || 'replacement_pref';
  //    _value = _value || 'replacement_value';
  //    logger('manipulatePrefs.setPref:::\n');
  //    logger(_pref,_value);

  try
  {
    return GM_setValue(_pref, _value);
  } catch(e)
  {
    logger('setPref::\nERROR! When trying to set '+_pref+' to '+_value+' ('+(typeof _value)+')');

    if('number' == typeof _value)
    {
      logger('setPref::\nTesting whether is a float / int');
      if(_value === parseInt(_value))
      {
        logger('setPref::\nTest:\n(_value === parseInt(_value))\nResult: True\n\nCan be stored');
        return GM_setValue(_pref, _value.toString());
      }
      else if(_value === parseFloat(_value))
      {
        logger('setPref::\nTest:\n(_value === parseFloat(_value))\nResult: True\n\nCannot be stored as a float, will convert to string');
        return GM_setValue(_pref, _value.toString());
      }
    }
    else if('object' == typeof _value)
    {
      logger("setPref::\nTest:\n('object' == typeof _value)\nResult: True\n\nCannot be stored as a object, will JSON.stringify");
      return GM_setValue(_pref, JSON.stringify(_value));
    }
  }
};

/**
 * Gets a stored variable using whatever storage methods are available [currently only supports GM_getValue() ]
 * Will create the stored variable with the default value if it does not already exist
 *
 * @param    _pref           The name of the preference being retrieved
 * @param    _defaultValue   The default value of the preference being stored to fall back upon
 *
 * @return  Returns either the preset value, or the default value if the stored variable did not previously exist
 *
 */
manipulatePrefs.getPref = function manipulatePrefs_setPref(_pref, _defaultValue)
{
  //    logger('manipulatePrefs.getPref:::\n');
  //    logger(_pref,_defaultValue);

  // Check if the _preference exists
  // NOTE:: Must check against typeof GM_getValue(_pref) *NOT* typeof GM_getValue(_pref, _defaultValue)
  if ('undefined' !== typeof GM_getValue(_pref))
  {
    // logger('manipulate_prefs.getPref():\n' + _pref + ' was found. Returning the value of  GM_getValue(_pref, _defaultValue)');
    return GM_getValue(_pref, _defaultValue);
  }
  else
  {
    logger('manipulate_prefs.getPref():\n' + _pref + ' was not found. Set as default value before fetching. Default value = ' + _defaultValue);
    manipulatePrefs.setPref(_pref, _defaultValue);

    return GM_getValue(_pref, _defaultValue);
  }
};






/**
 * Captures and analyses data about the current page
 *
 * @return  currentPage.URL   document.location.href minus any hash values
 * @return  currentPage.pageName  A verbose human-readable short name for the current page
 * @return  currentPage.languageCode  A shortcode description of the Neobux display language (PT | EN)
 *
 */
function PAGE()
{
  // Do not consider the URL hash (was causing problems: the hash was being
  // included in the final variable value)
  this.URL = document.location.href.split('#')[0];

  this.pageName = function PAGE_pageName()
  {
    var message = '';
    var _currentPage;

    try
    {
      var urlVariables = this.URL.split('?')[1].split('&');
    } catch(err)
    {
      message += '\n\n' +('Error = ' + err);
      message += '\n\n' +('No URL variables available');
    }

    if (0 <= urlVariables.indexOf('s=rs'))
    {
      message += '\n\n' +('s=rs, therefore referral statistics');
      _currentPage = 'refStats';

    }
    if (0 <= urlVariables.indexOf('RentedRefListings'))
    {
      message += '\n\n' +("indexOf('RentedRefListings'), therefore rented referral listings");
      _currentPage = 'rentedRefListing';

    }
    if (0 <= urlVariables.indexOf('u=c') && 0 <= urlVariables.indexOf('s=r'))
    {
      message += '\n\n' +('u=c and s=r, therefore referral listings');

      if (0 <= urlVariables.indexOf('ss3=1'))
      {
        message += '\n\n' + ('ss3=1, therefore direct referral listings');
        _currentPage = 'directRefListing';
      } else if (0 <= urlVariables.indexOf('ss3=2'))
      {
        message += '\n\n' + ('ss3=2, therefore rented referral listings');
        _currentPage = 'rentedRefListing';
      }

    }
    if (0 <= urlVariables.indexOf('u=v'))
    {
      message += '\n\n' +('u=v, therefore view advertisements page');
      _currentPage = 'advertisements';

    }
    if (0 <= this.URL.indexOf('/v/'))
    {
      message += '\n\n' +('/v/, therefore in the forums');
      _currentPage = 'viewing an advertisement';

    }
    if (0 <= this.URL.search(/[\?u=c]$/))
    {
      message += '\n\n' +('?u=c, therefore account summary (from top bar)');
      _currentPage = 'accSummary';

    }
    if (0 <= this.URL.search(/[\?u=c&s=i]$/))
    {
      message += '\n\n' +('?u=c&s=i, therefore account summary (from sidebar)');
      _currentPage = 'accSummary';

    }
    if (0 <= this.URL.indexOf('/rel/bl/'))
    {
      message += '\n\n' +('/rel/bl/, therefore account export data');
      _currentPage = 'accExport';

    }
    if (0 <= this.URL.indexOf('/forum/'))
    {
      message += '\n\n' +('/forum/, therefore in the forums');
      _currentPage = 'forums';

    }
    if (0 <= this.URL.indexOf('/refstat/'))
    {
      message += '\n\n' +('/refstat/, therefore referral graph');
      _currentPage = 'referralGraph';

    }
    if (0 <= this.URL.indexOf('#Neobux2Config'))
    {
      message += '\n\n' +('#Neobux2Config, therefore referral graph');
      _currentPage = 'scriptConfig';

    }
    if(null === _currentPage)
    {
      message += '\n\n' +('unknown page');
      _currentPage = 'unknown';
    }

    //GM_log(message);
    return _currentPage;
  };


  this.languageCode = function PAGE_languageCode()
  {
    var message = '';
    if (0 < document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band1.png"'))
    {
      message += '\n\n' +('currentPage.languageCode() = "PT"');
      return 'PT';
    }
    else if (0 < document.body.innerHTML.indexOf(' src="http://neobux.cachefly.net/imagens/band2.png"'))
    {
      message += '\n\n' +('currentPage.languageCode() = "EN"');
      return 'EN';
    }
    else
    {
      message += '\n\n' +('Error: Defaulting languageCode to EN');
      return 'EN';
    }
  };
}

var currentPage = new PAGE();


GM_log('Neobux 2+ (v'+fileMETA.version+' Dev)');


if(manipulatePrefs.getPref('firstRun',true))
{
  alert('Thank you for installing the Neobux 2+ script. Before the script can function correctly it needs to gather some information about your account.\n\nPlease view:\n * Your account summary\n * Your rented referral listings\n * Your direct referral listings\n * Your referral statistics page\n * Your view advertisements page\n\nYou will be alerted when enough information has been collected and the script will function correctly.');
  manipulatePrefs.setPref('firstRun',false);
}

if(false === manipulatePrefs.getPref('setupComplete', false))
{
  logger("(manipulatePrefs.getPref('setupComplete',false) === false)");

  switch(currentPage.pageName())
  {
    case 'accSummary':
      manipulatePrefs.setPref('viewed_accSummary',true);
      break;
    case 'directRefListing':
      manipulatePrefs.setPref('viewed_directRefListings',true);
      break;
    case 'rentedRefListing':
      manipulatePrefs.setPref('viewed_rentedRefListings',true);
      break;
    case 'refStats':
      manipulatePrefs.setPref('viewed_referralStatistics',true);
      break;
    case 'advertisements':
      manipulatePrefs.setPref('viewed_advertisements',true);
      break;
  }

  var setupLevel = 0;
  setupLevel += manipulatePrefs.getPref('viewed_accSummary',false) ? 1 : 0;
  setupLevel += manipulatePrefs.getPref('viewed_directRefListings',false) ? 1 : 0;
  setupLevel += manipulatePrefs.getPref('viewed_rentedRefListings',false) ? 1 : 0;
  setupLevel += manipulatePrefs.getPref('viewed_referralStatistics',false) ? 1 : 0;
  setupLevel += manipulatePrefs.getPref('viewed_advertisements',false) ? 1 : 0;

  logger('setupLevel = '+setupLevel);
  manipulatePrefs.setPref('setupLevel',setupLevel);

  if(5 === manipulatePrefs.getPref('setupLevel', 0))
  {
    alert('Thanks. The script should now work okay. If you have any problems, contact kwah in the Neobux forums, kwah.org or at userscripts.org,');
    manipulatePrefs.setPref('setupComplete',true);
  }

}


var Neobux = {};

Neobux.possibleAccTypes =[
  'Standard',
  'Golden',
  'Emerald',
  'Sapphire',
  'Platinum',
  'Diamond',
  'Ultimate',
  'Pioneer'
];

Neobux.accountDefaults =
{
  'autopayLimit': {
    'Standard': 20,
    'Golden':   20,
    'Emerald':  20,
    'Sapphire': 18,
    'Platinum': 20,
    'Diamond':  14,
    'Ultimate': 10,
    'Pioneer':  20
  },

  'recycleCost': {
    'Standard': 0.07,
    'Golden':   0.07,
    'Emerald':  0.06,
    'Sapphire': 0.07,
    'Platinum': 0.06,
    'Diamond':  0.07,
    'Ultimate': 0.04,
    'Pioneer':  0.07
  },

  'goldenPackCost': {
    'Standard': 0,
    'Golden':   0,
    'Emerald':  290,
    'Sapphire': 290,
    'Platinum': 490,
    'Diamond':  490,
    'Ultimate': 890,
    'Pioneer':  0
  },

  // CORRECT @ 27/Feb/2010
  // Referrals, Standard, Golden, Emerald, Sapphire, Platinum, Diamond, Ultimate
  // 0 -> 250, $0.25, $0.20, $0.20, $0.20, $0.20, $0.20, $0.20
  // 251 -> 500, $0.26, $0.21, $0.21, $0.20, $0.21, $0.20, $0.20
  // 501 -> 750, $0.27, $0.22, $0.22, $0.21, $0.22, $0.20, $0.20
  // 751 -> 1000, $0.28, $0.23, $0.23, $0.22, $0.23, $0.21, $0.20
  // 1001 -> 1250, $0.29, $0.24, $0.24, $0.23, $0.24, $0.22, $0.21
  // 1251 -> 1500, $0.30, $0.25, $0.25, $0.24, $0.25, $0.23, $0.22
  // 1501 -> 1750, $0.31, $0.26, $0.26, $0.25, $0.26, $0.24, $0.23
  // over 1750, $0.32, $0.27, $0.27, $0.26, $0.27, $0.25, $0.24

  // NOTE:: Mathematically, daily cost for $0.31 30day fee with 10% discount then
  // rounded to nearest $0.0005 should be $0.0095 but an extra "discount" is
  // applied to make it increment in pairs and look pretty
  // See: http://www.neobux.com/forum/?frmid=9&tpcid=109427

  // Monthly Cost, AutoPay
  // $0.20, $0.0060
  // $0.21, $0.0060
  // $0.22, $0.0065
  // $0.23, $0.0070
  // $0.24, $0.0070
  // $0.25, $0.0075
  // $0.26, $0.0080
  // $0.27, $0.0080
  // $0.28, $0.0085
  // $0.29, $0.0085
  // $0.30, $0.0090
  // $0.31, $0.0090
  // $0.32, $0.0095

  // Values taken from the help files (quoted above)
  'autopayValues': {
    'Standard': [
      {'minRefs': 0, 'cost': 0.0075},
      {'minRefs': 251, 'cost': 0.0080},
      {'minRefs': 1001, 'cost': 0.0085},
      {'minRefs': 1251, 'cost': 0.0090},
      {'minRefs': 1751, 'cost': 0.0095}
    ],
    'Golden': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1001, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Emerald': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1251, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Sapphire': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 751, 'cost': 0.0065},
      {'minRefs': 1001, 'cost': 0.0070},
      {'minRefs': 1501, 'cost': 0.0075},
      {'minRefs': 1751, 'cost': 0.0080}
    ],
    'Platinum': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 501, 'cost': 0.0065},
      {'minRefs': 751, 'cost': 0.0070},
      {'minRefs': 1251, 'cost': 0.0075},
      {'minRefs': 1501, 'cost': 0.0080}
    ],
    'Diamond': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 1001, 'cost': 0.0065},
      {'minRefs': 1251, 'cost': 0.0070},
      {'minRefs': 1751, 'cost': 0.0075}
    ],
    'Pioneer': [
      {'minRefs': 0, 'cost': 0.0060},
      {'minRefs': 1251, 'cost': 0.0065},
      {'minRefs': 1501, 'cost': 0.0070}
    ]
  },

  'renewalFees': {
    15: 0,
    30: 0,
    60: 0,
    90: 0,
    150: 0,
    240: 0
  }
};

var defaultSettings =
{

  columnPrefixes: {
    flag: " | ",
    referralName: "",
    referralSince: "",
    nextPayment: "",
    lastClick: "",
    totalClicks: "",
    average: "",
    clickText: "",
    average1: "",
    average2: "",
    RSA: "",
    SD: "",
    profit: "$"
  },

  shrinkColumnContents: {
    flag: true,
    referralName: true,
    referralSince: true,
    nextPayment: true,
    lastClick: true,
    totalClicks: false,
    average: false,
    clickText: true,
    average1: true,
    average2: true,
    RSA: true,
    SD: true,
    profit: false
  },

  numeriseDates: {
    flag: null,
    referralName: null,
    referralSince: true,
    nextPayment: null,
    lastClick: true,
    totalClicks: null,
    average: null,
    clickText: null,
    average1: null,
    average2: null,
    RSA: null,
    SD: null,
    profit: null
  },

  shortFormatTimer: {
    flag: null,
    referralName: null,
    referralSince: true,
    nextPayment: null,
    lastClick: true,
    totalClicks: null,
    average: null,
    clickText: null,
    average1: null,
    average2: null,
    RSA: null,
    SD: null,
    profit: null
  },

  showColumn: {
    flag: true,
    referralName: true,
    referralSince: true,
    nextPayment: true,
    lastClick: true,
    totalClicks: true,
    average: true,
    clickText: true,
    average1: true,
    average2: true,
    RSA: true,
    SD: true,
    profit: true
  },

  numberOfRefs: {"Rented":-1,"Direct":-1},

  timePeriods: {
    smallGraph: [5,7,10],// Time Periods for 'smaller' 10day graphs
    largeGraph: [5,10,15],// Time Periods for larger 15day graphs
    recent: 7,// Time Period for 'recent' section of the Referral statistics sidebar
    minigraphs: 5,// Time Period for footer row clicks average
    averageCols: [10,7],// Time Period for the 'average1' & 'average2' column (previously defined as the A10&A7 column)
    extensionsGraph: [7,15,30,60,90]
  }
};


var testing = false;


/**
 * Extra functions needed to deal with closures
 */

function setValue_InStoredObject(_referralName, _varName, _newValue)
{
  var tmp_original = JSON.parse(manipulatePrefs.getPref(_referralName, JSON.stringify( {} )));
  tmp_original[_varName] = _newValue;

  manipulatePrefs.setPref(_referralName,JSON.stringify(tmp_original));
};

function getValue_FromStoredObject(_referralName, _varName, _defaultValue)
{
  return function () {
    return JSON.parse(manipulatePrefs.getPref(_referralName, JSON.stringify(_defaultValue)))[_varName];
  };
};

function setFunction(_referralName,_loop_columnName)
{
  return function(_newValue) {
    setValue_InStoredObject(_referralName,_loop_columnName, _newValue)
  }
};

function addSettersGetters(_obj, _referralName, _defaults)
{
  logger(arguments);
  for(var loop_columnName in _defaults)
  {
    var getFunc = getValue_FromStoredObject(_referralName,loop_columnName, _defaults);
    _obj.__defineGetter__(loop_columnName, getFunc);

    var setfunc = setFunction(_referralName,loop_columnName);
    _obj.__defineSetter__(loop_columnName, setfunc);
  }
}


var ACCOUNT_FUNCTIONS =
{

  /**
   * Function that returns the autopay limit (minimum days left for autopay to apply) for each account type
   */
  'getAutopayLimit': function getAutopayLimit(_accType)
  {
    var defaultAutopayLimit = Neobux.accountDefaults.autopayLimit[_accType.verbose];
    return manipulatePrefs.getPref('autopayLimit', defaultAutopayLimit);
  },


  /**
   * Function that returns the cost of recycling one referral for each account type
   */
  'getRecycleCost': function getRecycleCost(_accType)
  {
    var defaultRecycleCost = Neobux.accountDefaults.recycleCost[_accType.verbose];

    // If the current page is the rented referral listings, store the *actual* recycle cost
    if ('rentedRefListing' == currentPage.pageName())
    {
      var tmp = document.body.innerHTML.match(/var p=\[([\d,\.]+)\];/)[1].split(',');
      var _recycleCost = tmp[1];

      manipulatePrefs.setPref('recycleCost', _recycleCost);
    }

    return manipulatePrefs.getPref('recycleCost', defaultRecycleCost);
  },


  /**
   * Function that returns the total cost purchasing each ultimate pack **from golden**
   */
  'getGoldenPackCost': function getGoldenPackCost(_accType)
  {
    var defaultGoldenPackCost = Neobux.accountDefaults.goldenPackCost[_accType.verbose];
    return manipulatePrefs.getPref('goldenPackCost', defaultGoldenPackCost);
  },


  /**
   * Function that returns the cost of paying via Autopay for one renewal
   */
  'getAutopayCost': function getAutopayCost(_accType,_numberOfRentedRefs)
  {
    var defaultAutopayValues = Neobux.accountDefaults.autopayValues[_accType.verbose];

    var totalRentedRefs = (0 <= _numberOfRentedRefs) ? _numberOfRentedRefs : myAccountDetails.numberOfRefs.Rented;
    var perAutoPayCost = 0;

    var j = defaultAutopayValues[_accType.numerical].length - 1;
    var currentTest;
    do
    {
      logger('j = '+j);
      currentTest = defaultAutopayValues[_accType.verbose][j];

      if(parseInt(currentTest.minRefs, 10) < parseInt(totalRentedRefs, 10))
      {
        logger('currentTest.minRefs = '+currentTest.minRefs+'\n'+
            'totalRentedRefs = '+totalRentedRefs+'\n'+
            'currentTest.cost = '+currentTest.cost);

        perAutoPayCost = currentTest.cost;
      }

    } while((parseInt(defaultAutopayValues[_accType.numerical][j--].minRefs, 10) > parseInt(totalRentedRefs, 10)));


    manipulatePrefs.setPref('autopayValues', perAutoPayCost);
    return manipulatePrefs.getPref('autopayValues', defaultAutopayValues);
  },


  /**
   * Function that returns the cost of one referral for each allowed period of time
   */
  'getRenewalFees': function getRenewalFees(_accType)
  {
    //    console.group();
    var defaultRenewalFees = Neobux.accountDefaults.renewalFees[_accType.verbose];
    //    logger('defaultRenewalFees');
    //    logger(defaultRenewalFees);


    var _renewCost = {};
    // If the current page is the rented referral listings, store the *actual* renewal fees
    if ('rentedRefListing' == currentPage.pageName())
    {
      // returns array of values used in the drop-down box on the ref listings page
      // var p=[0,0.07,0.25,0.45,0.60,0];
      var tmp = document.body.innerHTML.match(/var p=\[([\d,\.]+)\];/)[1].split(',');

      //var tmp = document.body.innerHTML.match(/var p=\[([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*),([0-9]+[\.]?[0-9]*)\]/);
      _renewCost[15] = tmp[2];
      _renewCost[30] = tmp[3];
      _renewCost[60] = tmp[4];
      _renewCost[90] = tmp[5];
      _renewCost[150] = tmp[6];
      _renewCost[240] = tmp[7];

      //      logger('JSON.stringify(_renewCost)');
      //      logger(JSON.stringify(_renewCost));
      //      logger("manipulatePrefs.setPref('renewalFees', JSON.stringify(_renewCost))");
      manipulatePrefs.setPref('renewalFees', JSON.stringify(_renewCost));
    }


    //    logger("manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees))");
    //    logger(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)));

    //  logger(arguments);
    if(2 == arguments.length)
    {
      //        logger('arguments[1]');
      //        logger(arguments[1]);
      //        logger("JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)))[arguments[1]]");
      //        logger(JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)))[arguments[1]]);
      //      console.groupEnd();


      return JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)))[arguments[1]];
    }
    else
    {
      //        logger('arguments[0]');
      //        logger(arguments[0]);
      //        logger("JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)))");
      //        logger(JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees))));
      //      console.groupEnd();

      return JSON.parse(manipulatePrefs.getPref('renewalFees',JSON.stringify(defaultRenewalFees)));
    }
  }
};

var getAccountType = new function ()
{
  var accDiv = docEvaluate('//div[@class="tag"][last()]').snapshotItem(0);

  for(var i = 0; i < Neobux.possibleAccTypes.length; i++) {
    if(accDiv.textContent.match(Neobux.possibleAccTypes[i])) {
      var _acctype = {
        "numerical": i,
        'verbose': Neobux.possibleAccTypes[i]
      };
    }
  }

  this.numerical =  _acctype.numerical;
  this.verbose =  _acctype.verbose;

  this.showUltimateFeatures =  ((6 == _acctype.numerical) || testing) ? true : false;
  this.isUltimate =  (6 == _acctype.numerical) ? true : false;
  this.isStandard =  (0 === _acctype.numerical) ? true : false;

  return this;
};

function extractNumberOfRefs()
{
  // If currently viewing the rented/direct ref listings, update the stored values accordingly
  if (('rentedRefListing' == currentPage.pageName()) || ('directRefListing' == currentPage.pageName()))
  {
    // Deduce which page is being viewed
    var _pageRefType = null;
    switch (currentPage.pageName())
    {
      case 'rentedRefListing':
        _pageRefType = 'Rented';
        break;
      case 'directRefListing':
        _pageRefType = 'Direct';
        break;
    }

    logger('_pageRefType');
    logger(_pageRefType);

    var tmp_numberOfRefs = null;
    var noOfRefsString = docEvaluate('//td[@class="f_r"]/descendant::span[@class="f_b"]');

    // Only expecting one result if the user has referrals
    if(1 == noOfRefsString.snapshotLength)
    {
      noOfRefsString = noOfRefsString.snapshotItem(0);

      if (noOfRefsString.textContent.match(/\d+/)) {
        tmp_numberOfRefs = parseInt(noOfRefsString.textContent.match(/\d+/), 10);
      } else {
        GM_log('An Error has occured.\n\r 1 == (noOfRefsString.snapshotLength) \n\r !(noOfRefsString.textContent.match(/\d+/))')
      }
    }
    else
    {
      /**
       *
       * Most likely reason for incorrect snapshotLength is an error in page load or
       * zero refs.
       *
       * Will now check for zero refs.
       *
       */
      var zeroRefsXpath = {
        'EN': '//span[contains(text(),"You don\'t have")]',
        'PT': '//span[contains(text(),"Não tem referidos")]'
      };
      var zeroRefsString = docEvaluate(zeroRefsXpath[currentPage.languageCode()]);

      // If evidence of zero refs is found, set the number of refs to zero (0)
      tmp_numberOfRefs = (1 == zeroRefsString.snapshotLength) ? 0 : false;
    }

    // Now store the number of detected referrals if numberOfRefs is not false
    // manipulatePrefs.setPref('numberOf' + _pageRefType + 'Refs', tmp_numberOfRefs);
    myAccountDetails.numberOfRefs[_pageRefType] = tmp_numberOfRefs;
  }
  else if('accSummary' == currentPage.pageName())
  {
    // TODO: Extract number of refs from main page
  }

}

var myAccountDetails =
{
  username: document.getElementById('t_conta').textContent,
  accountType: getAccountType,

  ownClickValue: (getAccountType.isUltimate) ? 0.02 : 0.01,
  referralClickValue: (getAccountType.isStandard) ? 0.005 : 0.01

};

myAccountDetails.autopayLimit = ACCOUNT_FUNCTIONS.getAutopayLimit(getAccountType);
myAccountDetails.recycleCost = ACCOUNT_FUNCTIONS.getRecycleCost(getAccountType);
myAccountDetails.goldenPackCost = ACCOUNT_FUNCTIONS.getGoldenPackCost(getAccountType);
myAccountDetails.renewalFees = ACCOUNT_FUNCTIONS.getRenewalFees(getAccountType);

myAccountDetails.numberOfRefs = {};
addSettersGetters(myAccountDetails.numberOfRefs,'numberOfRefs',defaultSettings.numberOfRefs);

myAccountDetails.__defineGetter__('autopayCost', function autoPayCost_Getter() {
  return manipulatePrefs.getPref('autopayCost', ACCOUNT_FUNCTIONS.getAutopayCost(getAccountType,null));
});
myAccountDetails.__defineSetter__('autopayCost', function autoPayCost_Setter(_value) {
  return manipulatePrefs.setPref('autopayCost', _value);
});

logger('myAccountDetails');
logger(myAccountDetails);


function setterGetter_GM_Storage(_storageVar, _defaultPreferences)
{
  function bindGettersSetters(_objToAddPrefsTo, _defaultPrefs, _property)
  {
    if ('object' !== typeof _objToAddPrefsTo)
    {
      _objToAddPrefsTo.__defineGetter__(_property, function _objToAddPrefsTo_Getter()
      {
        var valueToReturn = JSON.parse(manipulatePrefs.getPref(_storageVar, JSON.stringify(_defaultPrefs)))[_property];
        return valueToReturn;
      });

      _objToAddPrefsTo.__defineSetter__(_property, function _objToAddPrefsTo_Setter(val)
      {
        var originalValues = JSON.parse(manipulatePrefs.getPref(_storageVar, JSON.stringify(_defaultPrefs)));
        originalValues[_property] = val;

        manipulatePrefs.setPref(_storageVar, JSON.stringify(originalValues));

        // Return this so that methods can be strung foo.setA(10).setB(20).setC(30);
        return this;
      });
    }
    else
    {
      for (_property in _objToAddPrefsTo)
      {
        //bindGettersSetters(_objToAddPrefsTo, _defaultPrefs, _property);
      }
    }
  }

  /* setterGetter_GM_Storage(_storageVar, _defaultPreferences) */
  for (var property in _defaultPreferences)
  {
    if (false === _defaultPreferences[property]) {
      this[property] = false;
    } else {
      this[property] = JSON.parse(manipulatePrefs.getPref(_storageVar, JSON.stringify(_defaultPreferences)))[property] || {};
    }

    bindGettersSetters(this, _defaultPreferences, property);
  }

  return this;
}


// Information about the users account
// Get user preferences
function script() { }
script.preferences =
{
  // Script Settings
  scriptLanguage: manipulatePrefs.getPref('scriptLanguage','EN'),
  updateFrequency: manipulatePrefs.getPref('updateFrequency',120),
  alphaTester: manipulatePrefs.getPref('updateFrequency',false),

  // Referral Counts
  overrideRentedReferralCount: manipulatePrefs.getPref('overrideRentedReferralCount',false),
  manualRentedReferralCount: manipulatePrefs.getPref('manualRentedReferralCount',0),
  overrideDirectReferralCount: manipulatePrefs.getPref('overrideDirectReferralCount',false),
  manualDirectReferralCount: manipulatePrefs.getPref('manualDirectReferralCount',0),

  // Account Settings
  // 15|30|60 (equiv. of autopay)|90|150|240 days
  renewalPeriod: manipulatePrefs.getPref('renewalPeriod',90),

  // Flags
  flag_textify: manipulatePrefs.getPref('flag_textify',true),

  // Owned Since column:
  referralSince_fullerTimers: manipulatePrefs.getPref('referralSince_fullerTimers',true),
  referralSince_replace: manipulatePrefs.getPref('referralSince_replace',false),

  // Last Click column:
  lastClick_fullerTimers: manipulatePrefs.getPref('lastClick_fullerTimers',true),
  lastClick_replace: manipulatePrefs.getPref('lastClick_replace',false),
  lastClick_replaceNilClicks: manipulatePrefs.getPref('lastClick_replaceNilClicks',false),

  // Average column;
  exactAverageShow: manipulatePrefs.getPref('exactAverageShow',true),
  exactAverageReplace: manipulatePrefs.getPref('exactAverageReplace',false),
  exactAverageSeperator: manipulatePrefs.getPref('exactAverageSeperator',' | '),

  // Profit Column
  profit_includeRecycleCost: manipulatePrefs.getPref('profit_includeRecycleCost',false),


  // Referral listings. Column preferences
  columnPrefix: JSON.parse(manipulatePrefs.getPref('columnPrefix',JSON.stringify(defaultSettings.columnPrefixes))),
  shrinkContents: JSON.parse(manipulatePrefs.getPref('shrinkContents',JSON.stringify(defaultSettings.shrinkColumnContents))),
  showColumn: JSON.parse(manipulatePrefs.getPref('showColumn',JSON.stringify(defaultSettings.showColumn))),
  numeriseDates: JSON.parse(manipulatePrefs.getPref('numeriseDates',JSON.stringify(defaultSettings.numeriseDates))),
  shortFormatTimer: JSON.parse(manipulatePrefs.getPref('shortFormatTimer',JSON.stringify(defaultSettings.shortFormatTimer))),


  /** Time Periods **/
  timePeriods: JSON.parse(manipulatePrefs.getPref('timePeriods',JSON.stringify(defaultSettings.timePeriods))),

  /* Local = Server Time clock */
  localServerTimeClock_show: manipulatePrefs.getPref('localServerTimeClock_show',true)
};


logger('script.preferences');
logger(script.preferences);


function pageFunctions() {}

/* REFSTATS AND ACCSUMMARY FUNCTIONS */
function extractGraphData()
{
  function updateGraphData()
  {
    // Grab the data from storage
    _graphs = JSON.parse(manipulatePrefs.getPref('_graphs','{}')) || {} ;

    // Update the stored data with the new data obtained from the current page
    for(_i in GRAPHS_onCurrentPage)
    {
      var _currentGraph = GRAPHS_onCurrentPage[_i];

      var tmp_currentGraph = {};
      tmp_currentGraph.containerID = _currentGraph[0];
      tmp_currentGraph.name = _currentGraph[5][0]['name'];

      tmp_currentGraph.rawData = ('ch_ext_schedule' !== tmp_currentGraph.containerID) ? _currentGraph[5][0]['data'].reverse() : _currentGraph[5][0]['data'];

      tmp_currentGraph.data = {};
      for(var i = 0, length = _currentGraph[2].length; i < length; i++) {
        tmp_currentGraph.data[sanitiseDate(_currentGraph[2][i])] = _currentGraph[5][0]['data'][length - i - 1];
      }

      var sqsum = 0;
      tmp_currentGraph.mean = new Array();
      tmp_currentGraph.sum = new Array();
      tmp_currentGraph.variance = new Array();
      tmp_currentGraph.sdev = new Array();

      tmp_currentGraph.mean[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.sum[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.variance[0] = tmp_currentGraph.rawData[0];
      tmp_currentGraph.sdev[0] = tmp_currentGraph.rawData[0];

      for (var i = 1; i < tmp_currentGraph.rawData.length; ++i)
      {
        var x = tmp_currentGraph.rawData[i];
        var delta = x - tmp_currentGraph.mean[i-1];
        var sweep = i + 1.0;
        tmp_currentGraph.mean[i] = tmp_currentGraph.mean[i-1] + (delta / sweep);
        sqsum += delta * delta * (i / sweep);

        tmp_currentGraph.sum[i] = tmp_currentGraph.sum[i-1] + x;
        tmp_currentGraph.variance[i] = sqsum / (i + 1);
        tmp_currentGraph.sdev[i] = Math.sqrt(tmp_currentGraph.variance[i]);
      }

      tmp_currentGraph.mean.splice(0,0,undefined);
      tmp_currentGraph.sum.splice(0,0,undefined);
      tmp_currentGraph.variance.splice(0,0,undefined);
      tmp_currentGraph.sdev.splice(0,0,undefined);

      // Generate equivalents of the data in various 'exported' formats
      var text = new Array();
      var CSV = new Array();
      var TSV = new Array();

      for (var i = 0; i < _currentGraph[5][0]['data'].length; i++)
      {
        var date = new Date();
        date.setDate(Today.getDate() - i);

        var currentDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();

        text[i] = _currentGraph[5][0]['data'][i];
        CSV[i] = currentDate + ',' + _currentGraph[5][0]['data'][i];
        TSV[i] = currentDate + '\t' + _currentGraph[5][0]['data'][i];
      }

      tmp_currentGraph.export = {
        'text': text.join('\n'),
        'csv': CSV.join(',\n'),
        'tsv': TSV.join('\t\n'),
        'reverse': {
          'text': text.reverse().join('\n'),
          'csv': CSV.reverse().join(',\n'),
          'tsv': TSV.reverse().join('\t\n')
        }
      };


      tmp_currentGraph['today'] = tmp_currentGraph.data[TODAY_STRING];
      tmp_currentGraph['yesterday'] = tmp_currentGraph.data[YESTERDAY_STRING];
      tmp_currentGraph['recent'] = tmp_currentGraph.sum[script.preferences.timePeriods['recent']];
      tmp_currentGraph.sum = tmp_currentGraph.sum;

      tmp_currentGraph.rawData = new Array();

      var k = tmp_currentGraph.data.__count__;
      for(var j in tmp_currentGraph.data)
      {
        k--;
        tmp_currentGraph.rawData[k] = tmp_currentGraph.data[j];
      }


      var xpathResults_averages = docEvaluate("//td[@class='f_r']/span[@class='f_b']");

      if ('directClicks' == _i)
      {
        tmp_currentGraph.currentAverage = parseFloat(xpathResults_averages.snapshotItem(1).textContent);
        tmp_currentGraph.projectedAverage = parseFloat(xpathResults_averages.snapshotItem(2).textContent);
        tmp_currentGraph.today_projected = tmp_currentGraph.projectedAverage * myAccountDetails.numberOfRefs.Direct;
      }
      else if ('rentedClicks' == _i)
      {
        tmp_currentGraph.currentAverage = parseFloat(xpathResults_averages.snapshotItem(3).textContent);
        tmp_currentGraph.projectedAverage = parseFloat(xpathResults_averages.snapshotItem(4).textContent);
        tmp_currentGraph.today_projected = tmp_currentGraph.projectedAverage * myAccountDetails.numberOfRefs.Rented;
      }


      _graphs[friendlyNameLookup[_currentGraph[0]]] = tmp_currentGraph;
    }

  }

  var xpathResults_graphData = docEvaluate('//script[contains(text(),"eval")]');

  // If testing in Firebug, xpathResults_graphData.snapshotLength == 2
  if (1 == xpathResults_graphData.snapshotLength || 2 == xpathResults_graphData.snapshotLength)
  {
    /**
     *  If only one matching <script> ... </script> tag found, it is the correct one
     * NOTE :: If testing in Firebug, xpathResults_graphData.snapshotLength == 2
     * Now extract data::
     */

    /**
     * First, remove instances of the word 'eval' and then split it up based on
     * these rules ::
     * eval(w('
     * ')); eval(w('
     */

    var evals = xpathResults_graphData.snapshotItem(0).text.replace(/[ ]?eval\(w\('/g, '').split("'));");
  }

  var graphData = new Array();

  // Cycle through each individual eval (ie, graph / graphNumber)
  for (var graphNumber = 0, length = evals.length - 1; graphNumber < length; graphNumber++)
  {
    // logger('graphNumber = '+graphNumber);
    var evalString = evals[graphNumber];

    // Decode evalString using the w(i) function from the Neobux page
    var decodedEvalString = NeobuxDecodeEvalString(evalString);

    // logger(decodedEvalString.replace(');',']').replace('mk_ch(','graphData['+graphNumber+']
    // = ['));
    eval(decodedEvalString.replace(');', ']').replace('mk_ch(', 'graphData[' + graphNumber + '] = ['));
  }


  // Grab the 'script' tags
  // .. that also contain an eval()
  // If it contains an 'eval' it is probably the <script> ... </script> that we
  // want


  // .. something like the following:
  /**
   <script>
   eval(w('DQkJCQkJCW1rX2NoKA0JCQkJCQkJICAnY2hfY2QnLA0JCQkJCQkJICAnJywNCQkJCQkJCSAgWycyMDEwLzA2LzE3JywnMjAxMC8wNi8xOCcsJzIwMTAvMDYvMTknLCcyMDEwLzA2LzIwJywnMjAxMC8wNi8yMScsJzIwMTAvMDYvMjInLCcyMDEwLzA2LzIzJywnMjAxMC8wNi8yNCcsJ1llc3RlcmRheScsJ1RvZGF5J10sDQkJCQkJCQkgICc8Yj4nLA0JCQkJCQkJICAnPC9iPiBjbGlja3MnLA0JCQkJCQkJICBbDQkJCQkJCQkJICAgew0JCQkJCQkJCQkJbmFtZTonQ3JlZGl0ZWQgY2xpY2tzJywNCQkJCQkJCQkJCWRhdGE6WzAsMCwwLDAsMCwwLDAsMCwwLDBdDQkJCQkJCQkJICB9DQkJCQkJCQkJXSwNCQkJCQkJCSAwLA0JCQkJCQkJIFswLDAsMF0sDQkJCQkJCQkgMCwNCQkJCQkJCSAwDQkJCQkJCQkgKTsNCQkJCQk='));
   eval(w('DQkJCQkJbWtfY2goDQkJCQkJCSAgJ2NoX2NyJywNCQkJCQkJICAnJywNCQkJCQkJICBbJzIwMTAvMDYvMTcnLCcyMDEwLzA2LzE4JywnMjAxMC8wNi8xOScsJzIwMTAvMDYvMjAnLCcyMDEwLzA2LzIxJywnMjAxMC8wNi8yMicsJzIwMTAvMDYvMjMnLCcyMDEwLzA2LzI0JywnWWVzdGVyZGF5JywnVG9kYXknXSwNCQkJCQkJICAnPGI+JywNCQkJCQkJICAnPC9iPiBjbGlja3MnLA0JCQkJCQkgIFsNCQkJCQkJCSAgIHsNCQkJCQkJCQkJbmFtZTonQ3JlZGl0ZWQgY2xpY2tzJywNCQkJCQkJCQkJZGF0YTpbMCwwLDAsMCwwLDAsMCwwLDAsMF0NCQkJCQkJCSAgfQ0JCQkJCQkJXSwNCQkJCQkJIDAsDQkJCQkJCSBbMCwwLDBdLA0JCQkJCQkgMCwNCQkJCQkJIDANCQkJCQkJICk7DQkJCQkJ'));
   eval(w('DQkJCQkJCW1rX2NoKA0JCQkJCQkJICAnY2hfcmVjeWNsZScsDQkJCQkJCQkgICcnLA0JCQkJCQkJICBbJzIwMTAvMDYvMTInLCcyMDEwLzA2LzEzJywnMjAxMC8wNi8xNCcsJzIwMTAvMDYvMTUnLCcyMDEwLzA2LzE2JywnMjAxMC8wNi8xNycsJzIwMTAvMDYvMTgnLCcyMDEwLzA2LzE5JywnMjAxMC8wNi8yMCcsJzIwMTAvMDYvMjEnLCcyMDEwLzA2LzIyJywnMjAxMC8wNi8yMycsJzIwMTAvMDYvMjQnLCdZZXN0ZXJkYXknLCdUb2RheSddLA0JCQkJCQkJICAnPGI+JCcsDQkJCQkJCQkgICc8L2I+JywNCQkJCQkJCSAgWw0JCQkJCQkJCSAgIHsNCQkJCQkJCQkJCW5hbWU6J1JlY3ljbGUgdmFsdWUnLA0JCQkJCQkJCQkJZGF0YTpbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdDQkJCQkJCQkJICB9DQkJCQkJCQkJXSwNCQkJCQkJCSAwLA0JCQkJCQkJIDAsDQkJCQkJCQkgJ3gnLA0JCQkJCQkJIDANCQkJCQkJCSApOw0JCQkJCQ=='));
   eval(w('DQkJCQkJCW1rX2NoKA0JCQkJCQkJICAnY2hfYXV0b3BheScsDQkJCQkJCQkgICcnLA0JCQkJCQkJICBbJzIwMTAvMDYvMTInLCcyMDEwLzA2LzEzJywnMjAxMC8wNi8xNCcsJzIwMTAvMDYvMTUnLCcyMDEwLzA2LzE2JywnMjAxMC8wNi8xNycsJzIwMTAvMDYvMTgnLCcyMDEwLzA2LzE5JywnMjAxMC8wNi8yMCcsJzIwMTAvMDYvMjEnLCcyMDEwLzA2LzIyJywnMjAxMC8wNi8yMycsJzIwMTAvMDYvMjQnLCdZZXN0ZXJkYXknLCdUb2RheSddLA0JCQkJCQkJICAnPGI+JCcsDQkJCQkJCQkgICc8L2I+JywNCQkJCQkJCSAgWw0JCQkJCQkJCSAgIHsNCQkJCQkJCQkJCW5hbWU6J0F1dG9QYXkgdmFsdWUnLA0JCQkJCQkJCQkJZGF0YTpbMC4wMDgwLDAuMDk2MCwwLjA0ODAsMC4wNDgwLDAuMDU2MCwwLjA0ODAsMC4wMzIwLDAsMCwwLDAsMCwwLDAsMF0NCQkJCQkJCQkgIH0NCQkJCQkJCQldLA0JCQkJCQkJIDAsDQkJCQkJCQkgMCwNCQkJCQkJCSAtMC4wMDk2LA0JCQkJCQkJIDANCQkJCQkJCSApOw0JCQkJCQ=='));
   eval(w('DQkJCQkJCW1rX2NoKA0JCQkJCQkJICAnY2hfZXh0ZW5zaW9ucycsDQkJCQkJCQkgICcnLA0JCQkJCQkJICBbJzIwMTAvMDYvMTInLCcyMDEwLzA2LzEzJywnMjAxMC8wNi8xNCcsJzIwMTAvMDYvMTUnLCcyMDEwLzA2LzE2JywnMjAxMC8wNi8xNycsJzIwMTAvMDYvMTgnLCcyMDEwLzA2LzE5JywnMjAxMC8wNi8yMCcsJzIwMTAvMDYvMjEnLCcyMDEwLzA2LzIyJywnMjAxMC8wNi8yMycsJzIwMTAvMDYvMjQnLCdZZXN0ZXJkYXknLCdUb2RheSddLA0JCQkJCQkJICAnPGI+JCcsDQkJCQkJCQkgICc8L2I+JywNCQkJCQkJCSAgWw0JCQkJCQkJCSAgIHsNCQkJCQkJCQkJCW5hbWU6J0V4dGVuc2lvbiB2YWx1ZScsDQkJCQkJCQkJCQlkYXRhOlswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0NCQkJCQkJCQkgIH0NCQkJCQkJCQldLA0JCQkJCQkJIDAsDQkJCQkJCQkgMCwNCQkJCQkJCSAneCcsDQkJCQkJCQkgMA0JCQkJCQkJICk7DQkJCQkJ'));
   eval(w('DQkJCQkJCW1rX2NoKA0JCQkJCQkJICAnY2hfdHJyYicsDQkJCQkJCQkgICcnLA0JCQkJCQkJICBbJzIwMTAvMDYvMTInLCcyMDEwLzA2LzEzJywnMjAxMC8wNi8xNCcsJzIwMTAvMDYvMTUnLCcyMDEwLzA2LzE2JywnMjAxMC8wNi8xNycsJzIwMTAvMDYvMTgnLCcyMDEwLzA2LzE5JywnMjAxMC8wNi8yMCcsJzIwMTAvMDYvMjEnLCcyMDEwLzA2LzIyJywnMjAxMC8wNi8yMycsJzIwMTAvMDYvMjQnLCdZZXN0ZXJkYXknLCdUb2RheSddLA0JCQkJCQkJICAnPGI+JCcsDQkJCQkJCQkgICc8L2I+JywNCQkJCQkJCSAgWw0JCQkJCQkJCSAgIHsNCQkJCQkJCQkJCW5hbWU6J1RyYW5zZmVyIHZhbHVlJywNCQkJCQkJCQkJCWRhdGE6WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXQ0JCQkJCQkJCSAgfQ0JCQkJCQkJCV0sDQkJCQkJCQkgMCwNCQkJCQkJCSAwLA0JCQkJCQkJICd4JywNCQkJCQkJCSAwDQkJCQkJCQkgKTsNCQkJCQk='));
   </script>
   */


  // Which is then 'decoded' by the following function w() ::
  /**
   * http://neobux.cachefly.net/js/principal10.js
   * -- note, can be unencoded using jsbeautifier.org
   */

  /**
   function U(a) {
   return a * 10
   }

   function u0(a) {
   return String.fromCharCode(U(a))
   }

   function w(i) {
   var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   var o = "";
   var c1, c2, c3, e1, e2, e3, e4;
   var j = 0;
   i = i.replace(/[^A-Za-z0-9\+\/\=]/g, "");
   do {
   e1 = k.indexOf(i.charAt(j++));
   e2 = k.indexOf(i.charAt(j++));
   e3 = k.indexOf(i.charAt(j++));
   e4 = k.indexOf(i.charAt(j++));
   c1 = e1 << 2 | e2 >> 4;
   c2 = (e2 & 15) << 4 | e3 >> 2;
   c3 = (e3 & 3) << 6 | e4;
   o = o + u0(c1 / 10);
   if (e3 != 64)
   {
   o = o + u0(c2 / 10);
   }
   if (e4 != 64)
   {
   o = o + u0(c3 / 10);
   }
   } while (j < i.length);
   return o;
   }
   **/

  // Producing the following text ::
  /**
   mk_ch( 'ch_cd', '',
   ['2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>', '</b> clicks', [ { name:'Credited clicks', data:[0,0,0,0,0,0,0,0,0,0]
   } ], 0, [0,0,0], 0, 0 );
   mk_ch( 'ch_cr', '',
   ['2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>', '</b> clicks', [ { name:'Credited clicks', data:[0,0,0,0,0,0,0,0,0,0]
   } ], 0, [0,0,0], 0, 0 );
   mk_ch( 'ch_recycle', '',
   ['2010/06/12','2010/06/13','2010/06/14','2010/06/15','2010/06/16','2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>$', '</b>', [ { name:'Recycle value',
   data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] } ], 0, 0, 'x', 0 );
   mk_ch( 'ch_autopay', '',
   ['2010/06/12','2010/06/13','2010/06/14','2010/06/15','2010/06/16','2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>$', '</b>', [ { name:'AutoPay value',
   data:[0.0080,0.0960,0.0480,0.0480,0.0560,0.0480,0.0320,0,0,0,0,0,0,0,0] } ],
   0, 0, -0.0096, 0 );
   mk_ch( 'ch_extensions', '',
   ['2010/06/12','2010/06/13','2010/06/14','2010/06/15','2010/06/16','2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>$', '</b>', [ { name:'Extension value',
   data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] } ], 0, 0, 'x', 0 );
   mk_ch( 'ch_trrb', '',
   ['2010/06/12','2010/06/13','2010/06/14','2010/06/15','2010/06/16','2010/06/17','2010/06/18','2010/06/19','2010/06/20','2010/06/21','2010/06/22','2010/06/23','2010/06/24','Yesterday','Today'],
   '<b>$', '</b>', [ { name:'Transfer value',
   data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] } ], 0, 0, 'x', 0 );
   */

  // function mk_ch(x, y, o, w0, w, O, L, m, mn, p) ::
  /**
   x = id of the container where the graph is to be inserted
   y = title displayed on the graph
   o = x axis categories
   w0 = prefix to x axis value in tooltip
   w = suffix to x axis value in tooltip
   O = array containing x series values and title above the graph
   L = legend enabled [true|false]
   m = y axis plot bands (3-value array or 0)
   mn = y-axis minimum
   p = x-axis plot bands (3-value array or 0)
   */

  // Decode evalString using the w(i) function from the Neobux page
  function U(_a)
  {
    return _a * 10
  }

  function u0(_a)
  {
    return String.fromCharCode(U(_a))
  }

  // function w(_i) {
  function NeobuxDecodeEvalString(_i)
  {
    var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o = "";
    var c1, c2, c3, e1, e2, e3, e4;
    var j = 0;
    _i = _i.replace(/[^A-Za-z0-9\+\/=]/g, "");
    do {
      e1 = k.indexOf(_i.charAt(j++));
      e2 = k.indexOf(_i.charAt(j++));
      e3 = k.indexOf(_i.charAt(j++));
      e4 = k.indexOf(_i.charAt(j++));
      c1 = e1 << 2 | e2 >> 4;
      c2 = (e2 & 15) << 4 | e3 >> 2;
      c3 = (e3 & 3) << 6 | e4;
      o = o + u0(c1 / 10);
      if (64 != e3)
      {
        o = o + u0(c2 / 10);
      }
      if (64 != e4)
      {
        o = o + u0(c3 / 10);
      }
    } while (j < _i.length);

    return o;
  }



  for(var _i in graphData)
  {
    GRAPHS_onCurrentPage[friendlyNameLookup[graphData[_i][0]]] = graphData[_i];
  }

  logger('GRAPHS_onCurrentPage');
  logger(GRAPHS_onCurrentPage);

  updateGraphData();

  // Save the updated data
  manipulatePrefs.setPref('_graphs',JSON.stringify(_graphs));

  logger('_graphs');
  logger(_graphs);

  logger('GRAPHS_onCurrentPage');
  logger(GRAPHS_onCurrentPage);

}

function insertProfitGraph()
{

  // Add a new row (and spacer to keep aestetics constant) to accomodate the profit graph
  var newSpacerRow = document.createElement('tr');
  var newSpacerCol = document.createElement('td');

  newSpacerCol.setAttribute('style','height: 6px; font-size: 6px; padding: 0px;');
  newSpacerCol.setAttribute('colspan',3);
  newSpacerCol.innerHTML = '&nbsp;';

  newSpacerRow.appendChild(newSpacerCol);


  var newRow = document.createElement('tr');
  var newCol = document.createElement('td');

  newCol.innerHTML = '<div align="center" style="color: rgb(112, 112, 112);" class="f_b" >Beneficio</div>'+
      '<img width="100%" height="2" style="margin-top: 5px;" src="http://www.neobux.com/imagens/n/gr/250.jpg">'+
      '<div style="height: 220px;" id="ch_scriptProfit"></div>';
  newCol.setAttribute('style','border: 1px solid rgb(170, 170, 170); background-color: rgb(255, 255, 255);');
  newCol.setAttribute('colspan', 3);
  newRow.appendChild(newCol);

  // Insert them after the row that contains the recycle graph
  document.getElementById('ch_recycle').parentNode.parentNode.parentNode.appendChild(newSpacerRow);
  document.getElementById('ch_recycle').parentNode.parentNode.parentNode.appendChild(newRow);



  // Transfer script variables to the window
  location.href = "javascript:void(window.profit = new Array())";
  for(var i = 0; 10 > i; i++) {
    location.href = "javascript:void(window.profit["+i+"] = '"+parseFloat(sidebarDATA[i].netIncome.toFixed(3))+"')";
  }
  location.href = "javascript:void(window.referralIncome = new Array())";
  for(var i = 0; 10 > i; i++) {
    location.href = "javascript:void(window.referralIncome["+i+"] = '"+parseFloat(sidebarDATA[i].referralIncome.toFixed(3))+"')";
  }

  // Multiplying expenses values by -1 to indicate that they have a negative impact upon profit
  // (for the benefit of the profit graph)
  location.href = "javascript:void(window.expenses = new Array())";
  for(var i = 0; 10 > i; i++) {
    location.href = "javascript:void(window.expenses["+i+"] = '"+(parseFloat(sidebarDATA[i].expenses.toFixed(3)) * -1)+"')";
  }



  // Redefine the Neobux functions that are already there to ensure that this script is able to use it
  // (IIRC, I had problems calling mk_ch() from this script like this)

  location.href = "javascript:(" + function () {

    // x = id of the container where the graph is to be inserted
    // y = title displayed on the graph
    // o = x axis categories
    // w0 = prefix to x axis value in tooltip
    // w = suffix to x axis value in tooltip
    // O = array containing x series values and title above the graph
    // L = legend enabled [true|false]
    // m = y axis plot bands (3-value array or 0)
    // mn = y-axis minimum
    // p = x-axis plot bands (3-value array or 0)

    function mk_ch2(_containerID, _graphTitle, _x_axisCategories, _tooltipPrefix, _tooltipSuffix, _x_ValuesAndTitle, _legendEnabled, _y_axisPlotBands, _y_axisMin, _x_axisPlotBands) {
      var pn;

      if (0 === _y_axisPlotBands) {
        n = [0, 0, 0];
      } else {
        n = _y_axisPlotBands;
      }
      if (0 === _x_axisPlotBands) {
        pn = [0, 0, 0, 0];
      } else {
        pn = _x_axisPlotBands;
      }
      var s1 = 30,
          s2 = 20,
          s3 = 20,
          s4 = 50;
      if (1 == _legendEnabled) {
        s1 = 20, s3 = 30;
      }
      if ("" == _graphTitle) {
        s1 = 10;
      }
      if ("x" == _y_axisMin) {
        _y_axisMin = -0.2;
        maxout = 4;
      } else {
        maxout = null;
      }
      var g = [s1, s2, s3, s4];


      var chart = new(Highcharts.Chart)({
        chart: {
          renderTo: _containerID,
          defaultSeriesType: "line",
          margin: g,
          showAxes: 1,
          borderColor: "#4572A7",
          backgroundColor: "#fff",
          borderWidth: 0,
          shadow: 0
        },
        title: {
          text: _graphTitle,
          style: {
            margin: "10px 0 0 10px",
            textAlign: "center",
            font: "normal 12px Verdana,sans-serif"
          }
        },
        xAxis: {
          categories: _x_axisCategories,
          labels: {
            enabled: 0
          },
          tickmarkPlacement: "on",
          gridLineWidth: 1,
          lineColor: "#fff",
          tickColor: "#fff",
          gridLineColor: 0 === _x_axisPlotBands ? "#eee" : "",
          plotBands: [{
            from: 0,
            to: pn[0],
            color: "rgba(170,170,170,.3)"
          },
            {
              from: pn[0],
              to: pn[1],
              color: "rgba(255,101,79,.3)"
            },
            {
              from: pn[1],
              to: pn[2],
              color: "rgba(246,189,15,.3)"
            },
            {
              from: pn[2],
              to: pn[3],
              color: "rgba(139,186,0,.3)"
            }]
        },
        yAxis: {
          title: {
            enabled: 0,
            text: null
          },
          min: _y_axisMin,
          max: maxout,
          endOnTick: 0,
          startOnTick: 0,
          tickPixelInterval: 20,
          plotLines: [{
            value: 0,
            width: 1,
            color: "#888"
          }],
          plotBands: [{
            from: 0,
            to: n[0],
            color: "rgba(255,101,79,.3)"
          },
            {
              from: n[0],
              to: n[1],
              color: "rgba(246,189,15,.3)"
            },
            {
              from: n[1],
              to: n[2],
              color: "rgba(139,186,0,.3)"
            }]
        },
        tooltip: {
          formatter: function () {
            return "<b>" + this.series.name + "</b><br/>" + this.x + ": " + _tooltipPrefix + this.y + " " + _tooltipSuffix;
          }
        },
        legend: {
          enabled: _legendEnabled,
          layout: "horizontal",
          symbolWidth: 5,
          style: {
            left: "auto",
            bottom: "5px",
            right: "5px",
            top: "auto",
            font: "normal 12px Verdana,sans-serif"
          }
        },
        plotOptions: {
          line: {
            lineWidth: 2,
            marker: {
              enabled: 1,
              symbol: "circle",
              radius: 3,
              states: {
                hover: {
                  enabled: 1,
                  radius: 5
                }
              }
            }
          }
        },
        series: _x_ValuesAndTitle,
        credits: {
          enabled: 0
        }
      });
    }



    //// DEFAULTS::
    // GrayBlue = #6D869F
    // Red = #AA4643
    // Blue = #4572A7
    // Green = #89A54E


    var dates_array = [];
    var i=0;
    do
    {
      var blah = new Date();
      blah.setDate(new Date().getDate() - i);

      var tmp_DateString = blah.getFullYear() + '/' + ((10 > (blah.getMonth() + 1)) ? '0' + (blah.getMonth()+1) : (blah.getMonth()+1)) + '/' + ((10 > (blah.getDate())) ? '0' + (blah.getDate()) : (blah.getDate()));
      dates_array[9-i] = tmp_DateString;
      i++;

    }while(10 > i);

    mk_ch2('ch_scriptProfit', '',
        dates_array,
        '<b>$', '</b>',
        [
          {
            name:'Expenses',
            data:[parseFloat(window.expenses[9]),parseFloat(window.expenses[8]),parseFloat(window.expenses[7]),parseFloat(window.expenses[6]),
              parseFloat(window.expenses[5]),parseFloat(window.expenses[4]),parseFloat(window.expenses[3]),
              parseFloat(window.expenses[2]),parseFloat(window.expenses[1]),parseFloat(window.expenses[0])
            ],
            type:'area',
            color: '#bA5653',
            fillOpacity: 0.5
          },
          {
            name:'Income',
            data:[parseFloat(window.referralIncome[9]),parseFloat(window.referralIncome[8]),parseFloat(window.referralIncome[7]),parseFloat(window.referralIncome[6]),
              parseFloat(window.referralIncome[5]),parseFloat(window.referralIncome[4]),parseFloat(window.referralIncome[3]),
              parseFloat(window.referralIncome[2]),parseFloat(window.referralIncome[1]),parseFloat(window.referralIncome[0])
            ],
            type:'area',
            color: '#99b55E',
            fillOpacity: 0.5
          },
          {
            name:'Profit',
            data:[parseFloat(window.profit[9]),parseFloat(window.profit[8]),parseFloat(window.profit[7]),parseFloat(window.profit[6]),
              parseFloat(window.profit[5]),parseFloat(window.profit[4]),parseFloat(window.profit[3]),
              parseFloat(window.profit[2]),parseFloat(window.profit[1]),parseFloat(window.profit[0])
            ],
            type:'line',
            color: '#4572A7',
            lineWidth:'2'
          }
        ],
        0,
        [0,0,0,0],
        null,
        [0,0,0,0]);

  } + ")()";

}

function generateSidebarData()
{

  logger('_graphs');
  logger(_graphs);

  /**
   * This function returns an object
   *
   * @param   _timescale  The time period that you want data for.
   * Permitted values: 'today' | 'yesterday' | 'recent' | {positive integer <= 10}
   * Larger values may cause problems with data for the smaller click graphs not being available.
   *
   */
  function SIDEBAR_STATS(_timescale)
  {
    var _days = _timescale;
    var dividerDays = null;

    if('string' == typeof _timescale) {
      _days = parseInt(_days.replace(/today/,0).replace(/yesterday/,1).replace(/recent/,(script.preferences.timePeriods['recent']-1)), 10);
    }

    //    .sum starts numbering at today=1, yesterday=2
    //    .data starts numbering at today=0, yesterday=1
    switch(_timescale)
    {
      case 'today':
        dividerDays = 1;
        this.personalClicks = _graphs.personalClicks.data[TODAY_STRING];
        this.rentedClicks = _graphs.rentedClicks.data[TODAY_STRING];
        this.directClicks = _graphs.directClicks.data[TODAY_STRING];

        this.referralIncome = ((this.rentedClicks + this.directClicks) * myAccountDetails.referralClickValue);
        this.expenses = _graphs.recycleCost.rawData[_days] + _graphs.autopayCost.rawData[_days] + _graphs.renewalCost.rawData[_days];

        break;
      case 'yesterday':
        dividerDays = 1;
        this.personalClicks = _graphs.personalClicks.data[YESTERDAY_STRING];
        this.rentedClicks = _graphs.rentedClicks.data[YESTERDAY_STRING];
        this.directClicks = _graphs.directClicks.data[YESTERDAY_STRING];

        this.referralIncome = ((this.rentedClicks + this.directClicks) * myAccountDetails.referralClickValue);
        this.expenses = _graphs.recycleCost.rawData[_days] + _graphs.autopayCost.rawData[_days] + _graphs.renewalCost.rawData[_days];

        break;
      case 'recent':
        dividerDays = _days+1;
        this.personalClicks = _graphs.personalClicks.sum[_days+1];
        this.rentedClicks = _graphs.rentedClicks.sum[_days+1];
        this.directClicks = _graphs.directClicks.sum[_days+1];

        this.referralIncome = ((this.rentedClicks + this.directClicks) * myAccountDetails.referralClickValue);
        this.expenses = _graphs.recycleCost.sum[_days+1] + _graphs.autopayCost.sum[_days+1] + _graphs.renewalCost.sum[_days+1];

        break;
      default:
        dividerDays = _days;
        this.personalClicks = _graphs.personalClicks.rawData[_days];
        this.rentedClicks = _graphs.rentedClicks.rawData[_days];
        this.directClicks = _graphs.directClicks.rawData[_days];

        this.referralIncome = ((this.rentedClicks + this.directClicks) * myAccountDetails.referralClickValue);
        this.expenses = _graphs.recycleCost.rawData[_days] + _graphs.autopayCost.rawData[_days] + _graphs.renewalCost.rawData[_days];

        break;
    }

    this.directAverage = (0 < myAccountDetails.numberOfRefs.Direct) ? ((this.directClicks / myAccountDetails.numberOfRefs.Direct) / (dividerDays)).toFixed(3) : 0;
    this.rentedAverage = (0 < myAccountDetails.numberOfRefs.Rented) ? ((this.rentedClicks / myAccountDetails.numberOfRefs.Rented) / (dividerDays)).toFixed(3) : 0;

    this.personalClicksIncome = myAccountDetails.ownClickValue * this.personalClicks;
    this.rentedIncome = myAccountDetails.referralClickValue * this.rentedClicks;
    this.directIncome = myAccountDetails.referralClickValue * this.directClicks;

    this.rentedRAverage = (0 < myAccountDetails.numberOfRefs.Rented) ? ((((this.rentedIncome - this.expenses) / myAccountDetails.numberOfRefs.Rented) / (dividerDays)) / myAccountDetails.referralClickValue).toFixed(3) : 0;
    this.totalRAverage = (0 < (myAccountDetails.numberOfRefs.Rented + myAccountDetails.numberOfRefs.Direct)) ? ((((this.rentedIncome + this.directIncome + this.personalClicksIncome - this.expenses) / (myAccountDetails.numberOfRefs.Rented + myAccountDetails.numberOfRefs.Direct)) / myAccountDetails.referralClickValue) / (dividerDays)).toFixed(3) : 0;

    /*
    logger(''+
        'this.rentedRAverage = '+this.rentedRAverage+'\n'+
        'this.totalRAverage = '+this.totalRAverage+'\n'+
        _timescale +': (('+this.rentedClicks+' - ('+this.expenses+' / '+myAccountDetails.referralClickValue+')) / '+myAccountDetails.numberOfRefs.Rented+') / ('+dividerDays+'))\n'+
        _timescale +': (('+this.rentedClicks+' - ('+this.expenses / myAccountDetails.referralClickValue+')) / '+myAccountDetails.numberOfRefs.Rented+') / ('+dividerDays+'))\n'+
        _timescale +': ('+(this.rentedClicks - (this.expenses / myAccountDetails.referralClickValue))+' / '+myAccountDetails.numberOfRefs.Rented+') / ('+dividerDays+'))\n'+
        _timescale +': '+((this.rentedClicks - (this.expenses / myAccountDetails.referralClickValue)) / myAccountDetails.numberOfRefs.Rented)+' / ('+dividerDays+')\n'+
        _timescale +': '+((this.rentedClicks - (this.expenses / myAccountDetails.referralClickValue)) / myAccountDetails.numberOfRefs.Rented) / (dividerDays));
*/

    this.totalIncome = (this.referralIncome + this.personalClicksIncome);
    this.netIncome = (this.referralIncome - this.expenses);
    this.totalNetIncome = (parseFloat(this.netIncome) + parseFloat(this.personalClicksIncome));

    return this;
  }




  // Datastore used by the sidebar
  // Default with generic data used accross all graphs
  sidebarDATA = {
    'today':  new SIDEBAR_STATS('today'),
    'yesterday': new SIDEBAR_STATS('yesterday'),
    'recent': new SIDEBAR_STATS('recent')
  };


  for(var i=0; 10 > i; i++)
  {
    sidebarDATA[i] = new SIDEBAR_STATS(i);
  }


  // Stats specific only to 'today' (eg, "Projected" stats) ::
  sidebarDATA['today'].projectedRentedClicks = _graphs.rentedClicks.today_projected;
  sidebarDATA['today'].projectedDirectClicks = _graphs.directClicks.today_projected;
  sidebarDATA['today'].projectedIncome = myAccountDetails.referralClickValue * (sidebarDATA['today'].projectedRentedClicks + sidebarDATA['today'].projectedDirectClicks);

  sidebarDATA['today'].projectedRentedIncome = myAccountDetails.referralClickValue * sidebarDATA['today'].projectedRentedClicks;
  sidebarDATA['today'].projectedDirectIncome = myAccountDetails.referralClickValue * sidebarDATA['today'].projectedDirectClicks;

  sidebarDATA['today'].projectedReferralIncome = sidebarDATA['today'].projectedRentedIncome + sidebarDATA['today'].projectedDirectIncome;
  sidebarDATA['today'].projectedTotalIncome = (sidebarDATA['today'].projectedReferralIncome + sidebarDATA['today'].personalClicksIncome);
  sidebarDATA['today'].projectedNetIncome = (sidebarDATA['today'].projectedReferralIncome - sidebarDATA['today'].expenses);
  sidebarDATA['today'].projectedTotalNetIncome = (parseFloat(sidebarDATA['today'].projectedNetIncome) + parseFloat(sidebarDATA['today'].personalClicksIncome));

  // RE: Stats sidebar in Stats Summary page
  // If the user has no direct referrals, these stats do not apply
  if (!myAccountDetails.numberOfRefs.Direct)
  {
    sidebarDATA['today'].directAverage = '<i>N/A</i>';
    sidebarDATA['yesterday'].directAverage = '<i>N/A</i>';
    sidebarDATA['recent'].directAverage = '<i>N/A</i>';
  }


  // If the user has no rented referrals, these stats do not apply
  if (0 < !myAccountDetails.numberOfRefs.Rented)
  {
    sidebarDATA['today'].rentedAverage = '<i>N/A</i>';
    sidebarDATA['today'].rentedRAverage = '<i>N/A</i>';
    sidebarDATA['yesterday'].rentedAverage = '<i>N/A</i>';
    sidebarDATA['yesterday'].rentedRAverage = '<i>N/A</i>';
    sidebarDATA['recent'].rentedAverage = '<i>N/A</i>';
    sidebarDATA['recent'].rentedRAverage = '<i>N/A</i>';
  }

  // If the user has no referrals *AT ALL*, these stats do not apply either
  if (0 === myAccountDetails.numberOfRefs.Direct && 0 === myAccountDetails.numberOfRefs.Rented)
  {
    sidebarDATA['today'].totalRAverage = '<i>N/A <small>(zero refs)</small></i>';
    sidebarDATA['yesterday'].totalRAverage = '<i>N/A <small>(zero refs)</small></i>';
    sidebarDATA['recent'].totalRAverage = '<i>N/A <small>(zero refs)</small></i>';
  }

  logger('sidebarDATA');
  logger(sidebarDATA);
}

function insertChartDataBars()
{
  var maxDatabarWidth = 0;

  function addDataBarUnderGraph(_title, _containerID, _prefix, _data, _suffix, _cssStyle)
  {
    var bar = document.createElement("DIV");
    bar.setAttribute("class", "graphBar");
    bar.setAttribute("style", _cssStyle);

    bar.innerHTML = _title;

    for (var z=0; z< _data.length; z++)
    {
      bar.innerHTML += _prefix + _data[z][0] + _suffix + _data[z][1];
    }

    var chartContainer = document.getElementById(_containerID);
    chartContainer.parentNode.appendChild(bar);
//    chartContainer.style.height = parseInt(chartContainer.parentNode.style.height, 10) + 15 + "px";

    var currentDatabarWidth = bar.textContent.split('').length
    maxDatabarWidth = (maxDatabarWidth < currentDatabarWidth) ? currentDatabarWidth : maxDatabarWidth;
    console.info(currentDatabarWidth+'\n'+maxDatabarWidth);
  }

  var availableGraphs = {
    standardGraphs: ['ch_cd','ch_cr','ch_recycle','ch_autopay','ch_extensions','ch_trrb'],
    goldenGraphs: ['ch_ext_schedule'],
    accSummary: ['ch_cliques']
  };

  var graphsOnCurrentPage = [];

  if ('refStats' == currentPage.pageName()) {
    for (var j = 0; j < availableGraphs.standardGraphs.length; j++) {
      graphsOnCurrentPage.push(availableGraphs.standardGraphs[j]);
    }
    if (0 < myAccountDetails.accountType.numerical) {
      for (var j = 0; j < availableGraphs.goldenGraphs.length; j++) {
        graphsOnCurrentPage.push(availableGraphs.goldenGraphs[j]);
      }
    }
  }
  else {
    if ('accSummary' == currentPage.pageName()) {
      for (var j = 0; j < availableGraphs.accSummary.length; j++) {
        graphsOnCurrentPage.push(availableGraphs.accSummary[j]);
      }
    }
  }

  logger('graphsOnCurrentPage');
  logger(graphsOnCurrentPage);
  logger('graphsOnCurrentPage.length = ' +graphsOnCurrentPage.length);

  for (var i = 0; i < graphsOnCurrentPage.length; i++)
  {
    logger('i = '+i);

//    logger('graphsOnCurrentPage[i]');
//    logger(graphsOnCurrentPage[i]);
    var _currentGraph = _graphs[friendlyNameLookup[graphsOnCurrentPage[i]]];

//    logger('_currentGraph');
//    logger(_currentGraph);

    // Get the time periods appropriate for each graph size
    var graph_timePeriod = [];

    switch (_currentGraph.data.__count__)
    {
      case 15:
        graph_timePeriod = script.preferences.timePeriods.largeGraph;
        break;
      case 10:
        graph_timePeriod = script.preferences.timePeriods.smallGraph;
        break;
      case 90:
        graph_timePeriod = script.preferences.timePeriods.extensionsGraph;
        break;
    }

    var sum_Array = new Array();
    var avg_Array = new Array();

    for (var j = 0; j < graph_timePeriod.length; j++)
    {
      sum_Array.push([graph_timePeriod[j], _currentGraph.sum[graph_timePeriod[j]].toFixed(3)]);
      avg_Array.push([graph_timePeriod[j], _currentGraph.mean[graph_timePeriod[j]].toFixed(3)]);
    }

    logger('sum_Array,avg_Array,graph_timePeriod');
    logger(sum_Array,avg_Array,graph_timePeriod);

    // Extra processing needed for the extensions graph so process separately..
    if ('ch_ext_schedule' == _currentGraph.containerID)
    {
      var extensionsArray = [];
      logger('graph_timePeriod.length = '+graph_timePeriod.length);
      for (var k = 0; k < graph_timePeriod.length; k++)
      {
        if(0 === k){
          extensionsArray.push(['0-' + graph_timePeriod[k], _currentGraph.sum[graph_timePeriod[k]]]);
        }
        else{
          extensionsArray.push([(graph_timePeriod[k-1]+1) + '-' + graph_timePeriod[k], (_currentGraph.sum[graph_timePeriod[k]] - _currentGraph.sum[graph_timePeriod[k-1]])]);
        }
      }

      extensionsArray.push([
        (parseInt(graph_timePeriod[graph_timePeriod.length-1], 10)+1) + '+',
        (parseInt(myAccountDetails.numberOfRefs.Rented, 10) - parseInt(_currentGraph.sum[graph_timePeriod[graph_timePeriod.length-1]], 10))
      ]);

      addDataBarUnderGraph('Extensions due: :', _currentGraph.containerID, ' (', extensionsArray, ') ', 'margin-top:10px;');

    } else
    {

      /**
       * Insert data bars below graphs
       */


      document.getElementById(_currentGraph.containerID).parentNode.style.height = '150px';

      // Averages bar goes under all graphs
      addDataBarUnderGraph('Averages :', _currentGraph.containerID, ' (', avg_Array, ') ', 'margin-top:10px;');

      // Sums bar goes under all graphs
      addDataBarUnderGraph('Sums :', _currentGraph.containerID, ' (', sum_Array, ') ',null);

      switch (_currentGraph.containerID)
      {
        case 'ch_cliques':
          // Personal clicks in 'Account Summary'

          var personalClicks_Array = new Array();
          for (var j = 0; j < graph_timePeriod.length; j++)
          {
            var tmp = [graph_timePeriod[j], (_currentGraph.sum[graph_timePeriod[j]] * myAccountDetails.ownClickValue).toFixed(3)];
            personalClicks_Array.push(tmp);
          }

          addDataBarUnderGraph('Avg. Income :', _currentGraph.containerID, ' (', personalClicks_Array, ') $',null);

          // Need to increase the height of the container to fix issue with the 'Congratulations: You've been active everyday.' message not wrapping correctly
          document.getElementById(_currentGraph.containerID).parentNode.style.height = "206px";

          break;

        case 'ch_cd':
        // cd = "Clicks Direct" / Direct clicks graph in 'Referral Statistics' page
        case 'ch_cr':
          // cr = "Clicks Rented" / Rented clicks graph in 'Referral Statistics' page

          var rentedClicks_Array = new Array();
          for (var j = 0; j < graph_timePeriod.length; j++)
          {
            var tmp = [graph_timePeriod[j], (_currentGraph.sum[graph_timePeriod[j]] * myAccountDetails.referralClickValue).toFixed(3)];
            rentedClicks_Array.push(tmp);
          }

          addDataBarUnderGraph('Avg. Income :', _currentGraph.containerID, ' (', rentedClicks_Array, ') $',null);

          break;

        case 'ch_recycle':
        // Recycling Expenses graph in 'Referral Statistics' page
        case 'ch_autopay':
        // Autopay Expenses graph in 'Referral Statistics' page
        case 'ch_extensions':
          // Extensions Expenses graph in 'Referral Statistics' page

          addDataBarUnderGraph('Avg. Expenses :', _currentGraph.containerID, ' (', sum_Array, ') $',null);

          break;

        case 'ch_trrb':
          // trrb = "Transfers to Rented Balance " / Transfers to Rental Balance graph in 'Referral Statistics' page

          addDataBarUnderGraph('Avg. Transfers :', _currentGraph.containerID, ' (', sum_Array, ') $',null);

          break;

        case 'ch_profit':
          // Profit graph for Ultimates

          // Need to increase the height of the container to fix issue with the 'Congratulations: You've been active everyday.' message not wrapping correctly
          //document.getElementById(_currentGraph.containerID).parentNode.style.height = "180px";

          break;
      }
    }
  }

  var graphBarCSS = ".graphBar { border:1px solid #AAAAAA; color:#444444; clear:both; font-family:verdana; font-size:9px; font-weight:bold; height:14px; margin: -11px auto 10px; min-width:75%; padding:1px 2%; text-align:left; vertical-align:middle; white-space:nowrap; width:"+(maxDatabarWidth/1.75)+"em; }";
  GM_addStyle(graphBarCSS);
}


var newDialog_Style = "" +
    "#modalContainer {"+
    "background-color: transparent;"+
    "position: absolute;"+
    "width: 100%;"+
    "height: 100%;"+
    "top: 0px;"+
    "left: 0px;"+
    "z-index: 10000;"+
    "background-image: url(tp.png); /* required by MSIE to prevent actions on lower z-index elements */"+
    " }"+

    "#alertBox {"+
    "position: relative;"+
    "width: 300px;"+
    "min-height: 100px;"+
    "margin-top: 50px;"+
    "border: 2px solid #000;"+
    "background-color: #F2F5F6;"+
    "background-image: url(alert.png);"+
    "background-repeat: no-repeat;"+
    "background-position: 20px 30px;"+
    " }"+

    "#modalContainer > #alertBox {"+
    "position: fixed;"+
    " }"+

    "#alertBox h1 {"+
    "margin: 0;"+
    "font: bold 0.9em verdana,arial;"+
    "background-color: #78919B;"+
    "color: #FFF;"+
    "border-bottom: 1px solid #000;"+
    "padding: 2px 0 2px 5px;"+
    " }"+

    "#alertBox p {"+
    "font-family: verdana,arial;"+
    "padding: 10px;"+
    "margin: 10px;"+
    "height: auto;"+
    " }"+

    "#alertBox textarea {"+
    "font-family: monospace,courier new,verdana,arial;"+
    "font-size: x-small;"+
    "margin: 15px;"+
    "margin-top: 0px;"+
    "height: auto;"+
    "width: 85%;"+
    " }"+

    "#alertBox #closeBtn {"+
    "display: block;"+
    "position: relative;"+
    "margin: 15px auto;"+
    "padding: 3px;"+
    "border: 2px solid #000;"+
    "width: 70px;"+
    "font: 0.7em verdana,arial;"+
    "text-transform: uppercase;"+
    "text-align: center;"+
    "color: #FFF;"+
    "background-color: #78919B;"+
    "text-decoration: none;"+
    "}";



// over-ride the alert method only if this a newer browser.
// Older browser will see standard alerts
// if(document.getElementById) {
// window.alert = function (txt) {
// createExportDialog(txt);
// }
// }

function createExportDialog(_txt, _exportText, _alertTitle, _alertButtonText, _exportText_reversed, _event)
{
  var textareaContents = _exportText;
  if (_event.ctrlKey && _exportText_reversed)
  {
    textareaContents = _exportText_reversed;
  }
  createCustomAlert(_txt, textareaContents, _alertTitle, _alertButtonText);
}

function createCustomAlert(_txt, _textareaContents, _alertTitle, _alertButtonText)
{
  // constants to define the title of the alert and button text.
  _txt = _txt || '';
  _textareaContents = _textareaContents || '';
  _alertTitle = _alertTitle || 'Oops!';
  _alertButtonText = _alertButtonText || 'Ok';


  // shortcut reference to the document object
  var d = document;

  // if the modalContainer object already exists in the DOM, bail out.
  if (d.getElementById("modalContainer"))
  {
    return;
  }

  // create the modalContainer div as a child of the BODY element
  // make sure its as tall as it needs to be to overlay all the content on the page
  var mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
  mObj.id = "modalContainer";
  mObj.style.height = document.documentElement.scrollHeight + "px";

  // create the DIV that will be the alert
  var alertObj = mObj.appendChild(d.createElement("div"));
  alertObj.id = "alertBox";


  var newDialogStyle = alertObj.appendChild(d.createElement('style'));
  newDialogStyle.setAttribute('type', 'text/css');
  newDialogStyle.innerHTML = newDialog_Style;


  // MSIE doesnt treat position:fixed correctly, so this compensates for positioning the alert
  if (d.all && !window.opera)
  {
    alertObj.style.top = document.documentElement.scrollTop + "px";
  }

  // center the alert box
  alertObj.style.left = (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";

  // create an H1 element as the title bar
  var h1 = alertObj.appendChild(d.createElement("h1"));
  h1.appendChild(d.createTextNode(_alertTitle));

  if ('' !== _txt)
  {
    // create a paragraph element to contain the _txt argument
    var msg = alertObj.appendChild(d.createElement("p"));
    msg.innerHTML = _txt;
  }

  if ('' !== _textareaContents)
  {
    // create a textarea
    var textarea = alertObj.appendChild(d.createElement("center")).appendChild(d.createElement("textarea"));
    textarea.value = _textareaContents;

    var maxHeight = 300;

    var adjustedHeight = textarea.clientHeight;
    if (!maxHeight || maxHeight > adjustedHeight)
    {
      adjustedHeight = Math.max(textarea.scrollHeight, adjustedHeight);
      if (maxHeight)
      {
        adjustedHeight = Math.min(maxHeight, adjustedHeight);
      }
      if (adjustedHeight > textarea.clientHeight)
      {
        textarea.style.height = adjustedHeight + "px";
      }
    }

  }

  // create an anchor element to use as the confirmation button.
  var btn = alertObj.appendChild(d.createElement("a"));
  btn.id = "closeBtn";
  btn.appendChild(d.createTextNode(_alertButtonText));

  // set up the onclick event to remove the alert when the anchor is clicked
  btn.addEventListener('click', function () {
    removeCustomAlert();
  }, false);

}

// removes the custom alert from the DOM
function removeCustomAlert()
{
  document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function insertExportTabs()
{
  var tabStyles = '';
  tabStyles += '.exportTab { -moz-border-radius: 0.6em 0.6em 0px 0px; display: inline-block; font-size: xx-small; padding: 0px 7px; margin-right: 7px; text-align: center; cursor: pointer; }';
  tabStyles += '.csvExportTab{ background-color:#ecd; }';
  tabStyles += '.tsvExportTab{ background-color:#edc; }';
  tabStyles += '.xmlExportTab{ background-color:#cde; }';
  tabStyles += '.textExportTab{ background-color:#dce; }';

  GM_addStyle(tabStyles);

  function EXPORT_TAB(_exportType,_tabText)
  {
    var exportTab = document.createElement('div');
    // exportTab.style.cssFloat = 'left';
    // exportTab.style.width = '20px';
    exportTab.className = _exportType+'ExportTab exportTab';
    exportTab.id = _exportType+'ExportTab_'+graphReference;

    exportTab.innerHTML = _tabText;

    var textareaContents = _currentGraph.export[_exportType];
    var textareaContentsReverse = _currentGraph.export.reverse[_exportType];
    var messageHeader = 'Exporting the "'+_currentGraph.name+'" graph as '+_tabText+':';

    exportTab.addEventListener('click', function exportTabs_onClick(event)
    {
      // (event.ctrlKey && event.altKey && event.shiftKey)

      createExportDialog(messageHeader,textareaContents,'Exporting to '+_tabText+'..','Close',textareaContentsReverse,event);

    }, false);


    return exportTab;
  }


  for(var _NameOfCurrentGraph in GRAPHS_onCurrentPage)
  {

    var _currentGraph = _graphs[_NameOfCurrentGraph];
    var graphReference = _currentGraph.containerID;
    var referenceNode = document.getElementById(graphReference);

    logger([_currentGraph,graphReference,referenceNode]);

    // Add Export Links

    // Create and insert wrapper for export 'tabs'
    var exportTabsWrapper = document.createElement('div');
    exportTabsWrapper.setAttribute('style','bottom:-1px; margin-left:17px; margin-top:4px; position:relative; text-align:left;');
    exportTabsWrapper.id = 'exportTabsWrapper_'+graphReference;
    exportTabsWrapper.innerHTML = ' ';

    referenceNode.parentNode.insertBefore(exportTabsWrapper,referenceNode);

    // Define the export 'tabs'
    var csvExportTab = document.createElement('div');
    var tsvExportTab = document.createElement('div');
    var xmlExportTab = document.createElement('div');
    var textExportTab = document.createElement('div');

    // Insert 'Export as CSV' Tab
    document.getElementById('exportTabsWrapper_'+graphReference).appendChild(EXPORT_TAB('csv','CSV'));

    // Insert 'Export as TSV' Tab and attach click event
    document.getElementById('exportTabsWrapper_'+graphReference).appendChild(EXPORT_TAB('tsv','TSV'));

    // Insert 'Export as XML' Tab and attach click event
    // document.getElementById('exportTabsWrapper_'+graphReference).appendChild(EXPORT_TAB('xml','XML'));

    // Insert 'Export as Text' Tab and attach click event
    document.getElementById('exportTabsWrapper_'+graphReference).appendChild(EXPORT_TAB('text','Text'));
  }
}

function insertSidebar()
{
  // Function which inserts the 'Statistics Sidebar' to the side of the page

  // Location to insert the sidebar (right hand side)
  var locationToInsertSidebar = docEvaluate("//td[@width='729']").snapshotItem(0).parentNode;

  logger('sidebar');
  // logger('graphData');
  // logger(graphData);


  // // NOW CREATE THE ACTUAL SIDEBAR ////

  var infoLabel = document.createElement("div");
  infoLabel.setAttribute('style', 'background-color:#FFFFFF; background-repeat:no-repeat; border:1px solid #AAAAAA; margin-left:5px; padding:0 10px 15px 8px; vertical-align:top; width:182px;');


  GM_addStyle("span.sidebarContent { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: x-small !important; }" +
      "span.sidebarHeader { display:block; text-align:center; } " +
      "div.sidebarDetails { font-size: 95%; margin-left: 5px; } " +
      "h4 { color: #444; margin-top: 10px; margin-bottom:2px } " +
      "h5 { margin-top: 7px; margin-bottom:2px; margin-left:2px; } " +
      "h6 { font-size: xx-small !important; margin-top: 2px; margin-bottom:2px } " +
      ".h5_subHead { margin-top:2px; font-size:xx-small; } " +
      ".bold { font-weight: bold; } " +
      ".grey { color: #aaa; }");


  // // I DO NOT LIKE THIS BEING IN ONE *HUGE* STRING.. WANT TO SPLIT THIS UP
  // BUT NOT SURE HOW YET ////

  function showInfo(_toDisplay, _refType) {
    return (0 < myAccountDetails.numberOfRefs[_refType]) ? _toDisplay : '';
  }
  function showThisIfUserHasRentedReferrals(_toDisplay) {
    return (0 < myAccountDetails.numberOfRefs.Rented) ? _toDisplay : '';
  }
  function showThisIfUserHasDirectReferrals(_toDisplay) {
    return (0 < myAccountDetails.numberOfRefs.Direct) ? _toDisplay : '';
  }
  function showThisIfUserHasReferrals(_toDisplay) {
    return (0 < myAccountDetails.numberOfRefs.Direct || 0 < myAccountDetails.numberOfRefs.Rented) ? _toDisplay : '';
  }

  
  tmp = "";
  tmp += "<span class='sidebarContent'>";
  tmp += "<span class='sidebarHeader'>";
  tmp += "<h4 class='bold'>Resumen Estadístico</h4>";
  tmp += "<i>Rentedos: " + myAccountDetails.numberOfRefs.Rented + " / Directos: " + myAccountDetails.numberOfRefs.Direct + "</i><br>";
  tmp += "<i>Total: " + (myAccountDetails.numberOfRefs.Rented + myAccountDetails.numberOfRefs.Direct) + "</i>";
  tmp += " </span>";


  var tmpTpArary = ['today', 'yesterday','recent'];
    for(var x in tmpTpArary)
    {
      var _timePeriod = tmpTpArary[x];
      var header = '';
      switch(_timePeriod) {
        case 'today':
          header = 'Hoy';
          break;
        case 'yesterday':
          header = 'Ayer';
          break;
        case 'recent':
          header = 'El ultimo ' + script.preferences.timePeriods.recent + ' Dias';
          break;
      }
      tmp += "<h5 class='bold grey'>[ "+header+" ]</h5>";
      tmp += "<span class='bold h5_subHead'>&nbsp; - Neto : $" + sidebarDATA[_timePeriod].netIncome.toFixed(3) + " / $" + sidebarDATA[_timePeriod].totalNetIncome.toFixed(3)+"</span>";
      tmp += "<hr width= '155px' height='1px' color='#cccccc'/>";

      tmp += "<h6 title='Los detalles sobre sus fuentes de ingresos para "+header.toLowerCase()+"'> + Ingresos</h6>";
      tmp += "<div class='sidebarDetails'>";
      tmp += "<span title ='El número de clicks de usted durante "+header.toLowerCase()+" / $ los ingresos que ha recibido de estos clicks'>" + "- personal : " + sidebarDATA[_timePeriod].personalClicks + " / $" + (sidebarDATA[_timePeriod].personalClicksIncome).toFixed(2) + "</span><br>";
      tmp += showThisIfUserHasRentedReferrals("<span title='El número de clicks de sus referidos alquilados durante "+header.toLowerCase()+" / $ los ingresos que ha recibido de estos clicks'>" + "- rentedos : " + _graphs.rentedClicks[_timePeriod] + " / $" + (sidebarDATA[_timePeriod].rentedIncome).toFixed(3) + "</span><br>");
      tmp += showThisIfUserHasDirectReferrals("<span title='El número de clicks de tus referidos directos durante "+header.toLowerCase()+" / $ los ingresos que ha recibido de estos clicks'>" + "- directos : " + _graphs.directClicks[_timePeriod] + " / $" + (sidebarDATA[_timePeriod].directIncome).toFixed(3) + "</span><br>");
      if('hoy' == _timePeriod) {
        tmp += showThisIfUserHasReferrals("<i>Proyección de Ingresos:</i><br>");
        tmp += showThisIfUserHasRentedReferrals("<span title='Este es el número de clicks que los \"projected average\" (rented = " + sidebarDATA[_timePeriod].projectedRentedClicks + ") demostrado por Neobux equivale a / $ los ingresos que usted recibe de estos clicks'>" + "- rentados : " + ((0 < myAccountDetails.numberOfRefs.Rented) ? sidebarDATA[_timePeriod].projectedRentedClicks.toFixed(1) + " / $" + (sidebarDATA[_timePeriod].projectedRentedIncome).toFixed(3) : "N/A") + "</span><br>");
        tmp += showThisIfUserHasDirectReferrals("<span title='This is the number of clicks that the \"projected average\" (direct = " + sidebarDATA[_timePeriod].projectedDirectClicks + ") shown by Neobux equates to / $ the income that you would recieve from these clicks'>" + "- directos : " + ((0 < myAccountDetails.numberOfRefs.Direct) ? sidebarDATA[_timePeriod].projectedDirectClicks.toFixed(1) + " / $" + (sidebarDATA[_timePeriod].projectedDirectIncome).toFixed(3) : "N/A") + "</span><br>");
      }
      tmp += "</div>";

      tmp += "<h6 title='Los detalles sobre sus gastos de "+header.toLowerCase()+"'> + Gastos</h6>";
      tmp += "<div class='sidebarDetails'>";
      tmp += "<span title='Su reciclaje honorarios por "+header.toLowerCase()+"'>" + "- reciclaje : $" + _graphs.recycleCost[_timePeriod].toFixed(2) + "</span><br>";
      tmp += "<span title='Sus costos de Autopay son de "+header.toLowerCase()+"'>" + "- autopay : $" + _graphs.autopayCost[_timePeriod].toFixed(4) + "</span><br>";
      tmp += "<span title='La cantidad que ha gastado en la renovación de sus referencias de alquiler ("+header.toLowerCase()+")'>" + "- renovaciones : $" + _graphs.renewalCost[_timePeriod].toFixed(2) + "</span><br>";
      tmp += "</div>";

      tmp += "<h6 title='Algunas estadísticas acerca de sus ingresos de referencia & clicks de "+header.toLowerCase()+"'> + Stadisticas</h6>";
      tmp += "<div class='sidebarDetails'>";
      tmp += showThisIfUserHasRentedReferrals("<span title='El número promedio de clicks por cada referido alquilan para "+header.toLowerCase()+"'>" + "- rentados avg : " + sidebarDATA[_timePeriod].rentedAverage + "</span><br>");
      tmp += showThisIfUserHasDirectReferrals("<span title='El número promedio de clicks por cada referido directo para "+header.toLowerCase()+"'>" + "- directos avg : " + sidebarDATA[_timePeriod].directAverage + "</span><br>");
      tmp += showThisIfUserHasRentedReferrals("<span title='El número medio de clics necesarios de sus referencias (después de sus gastos se deducen) para cumplir con sus actuales ingresos de los clicks de alquiler para "+header.toLowerCase()+" ($"+(sidebarDATA[_timePeriod].rentedIncome).toFixed(3)+"). Nota: si el Real Media es negativa, sus gastos de "+header.toLowerCase()+" ($"+(sidebarDATA[_timePeriod].expenses).toFixed(3)+") son superiores a sus ingresos de alquiler y esta referencia es el promedio adicional que sería necesario para alcanzar el equilibrio.'>" + "- rented r.average : " + sidebarDATA[_timePeriod].rentedRAverage + "</span><br>");
      tmp += "<span title='Al igual que la media de alquiler real (raverage), pero tiene en cuenta los clics personales y haga clic directamente en la parte superior de sus ingresos de alquiler para "+header.toLowerCase()+". (Income: $"+(sidebarDATA[_timePeriod].rentedIncome + sidebarDATA[_timePeriod].directIncome + sidebarDATA[_timePeriod].personalClicksIncome)+", Gastos: $"+(sidebarDATA[_timePeriod].expenses).toFixed(3)+"). Nota: Para los miembros estándar, un clic personal se considera como equivalente a dos clics de referencia;'>" + " - total r.average : " + sidebarDATA[_timePeriod].totalRAverage + "</span><br>";
      tmp += "</div>";

      tmp += "<h6 title='Resumen de los ingresos / gastos / beneficios para "+header.toLowerCase()+"'> + Totals</h6>";
      tmp += "<div class='sidebarDetails'>";
      tmp += "<span title='$ Referidos de ingresos para "+header.toLowerCase()+" =  Ingresos rentados clicks ($"+(sidebarDATA[_timePeriod].rentedIncome).toFixed(3)+") + Direct click income ($"+(sidebarDATA[_timePeriod].directIncome).toFixed(3)+"); // $ ingresos incl. clicks propios para "+header.toLowerCase()+" = ingresos referidos ($"+ sidebarDATA[_timePeriod].referralIncome.toFixed(3) + ") + Ingresos personal clicks ($" + sidebarDATA[_timePeriod].personalClicksIncome.toFixed(3) + ");'>" + "- ingresos : $" + sidebarDATA[_timePeriod].referralIncome.toFixed(3) + " / $" + sidebarDATA[_timePeriod].totalIncome.toFixed(3) + "</span><br>";
      tmp += "<span title='$ Los gastos de "+header.toLowerCase()+" = Coste reciclaje ($"+_graphs.recycleCost[_timePeriod].toFixed(2)+") + Coste autopay ($"+_graphs.autopayCost[_timePeriod].toFixed(2)+") + Renovaciones ($"+_graphs.renewalCost[_timePeriod].toFixed(2)+");'>" + "- gastos : $" + (sidebarDATA[_timePeriod].expenses).toFixed(3) + "</span><br>";
      tmp += "<span title='$ Los ingresos netos "+header.toLowerCase()+" = ingresos de referidos ($" + (sidebarDATA[_timePeriod].referralIncome).toFixed(3) + ") - Gastos ($" + (sidebarDATA[_timePeriod].expenses).toFixed(3) + "); // $incluyendo los ingresos netos personal clicks para "+header.toLowerCase()+" = ingresos neto($" + (sidebarDATA[_timePeriod].netIncome).toFixed(3) + ") + ingresos personal clicks ($" + (sidebarDATA[_timePeriod].personalClicksIncome).toFixed(3) + ")'>" + "- neto : $" + (sidebarDATA[_timePeriod].referralIncome - sidebarDATA[_timePeriod].expenses).toFixed(3) + " / $" + (sidebarDATA[_timePeriod].totalNetIncome).toFixed(3) + "</span><br>";
      if('today' == _timePeriod) {
        tmp += "" + showThisIfUserHasReferrals("<span title='$ La previsión de ingresos netos por "+header.toLowerCase()+" = los ingresos previstos procedentes de las referencias de alquiler ($" + (sidebarDATA[_timePeriod].projectedRentedIncome).toFixed(3) + ") + los ingresos previstos procedentes de las referencias directas ($" + (sidebarDATA[_timePeriod].projectedDirectIncome).toFixed(3) + ") - gastos ($" + sidebarDATA[_timePeriod].expenses.toFixed(3) + "); // $ Proyectado incluyendo los ingresos netos personal clicks para "+header.toLowerCase()+" = proyecciones de ingresos netos ($"+sidebarDATA['today'].projectedNetIncome.toFixed(3)+") - + ingresos personal clicks ($" + sidebarDATA[_timePeriod].personalClicksIncome.toFixed(3) + ")'>" + "- proyecto: $" + (sidebarDATA['today'].projectedNetIncome).toFixed(3) + " / $"+ (sidebarDATA['today'].projectedTotalNetIncome).toFixed(3) + "</span><br>");
      }
      tmp += "</div>";
    }

      /*Donate button remove as per Admin's request 25/08/2010*/
      //    <center><form action='https://www.paypal.com/cgi-bin/webscr' method='post'>\
      //      <input type='hidden' name='cmd' value='_s-xclick'>\
      //      <input type='hidden' name='hosted_button_id' value='K6ZRJKEQYKE2Q'>\
      //      <input type='image' src='https://www.paypal.com/en_GB/i/btn/btn_donate_LG.gif' border='0' name='submit' alt='PayPal - The safer, easier way to pay online.'>\
      //      <img alt='' border='0' src='https://www.paypal.com/en_GB/i/scr/pixel.gif' width='1' height='1'>\
      //    </form></center>\

    tmp += "</span>";

infoLabel.innerHTML = tmp;

  // // *** INSERT STATISTICS SUMMARY INTO PAGE *** ////
  var wrapperTD = document.createElement('td');
  wrapperTD.setAttribute('valign','top');
  wrapperTD.appendChild(infoLabel);
  locationToInsertSidebar.appendChild(wrapperTD);


}



/* NON PAGE-SPECIFIC FUNCTIONS */
extractNumberOfRefs();

if('refStats' == currentPage.pageName() || 'accSummary' == currentPage.pageName())
{
  // _graphs == container for all the graph data
  var _graphs = {};
  var GRAPHS_onCurrentPage = new Array();

  extractGraphData();


  // Show the sidebar if the current page is the ref stats page
  if ('refStats' == currentPage.pageName())
  {
    var sidebarDATA = {};
    generateSidebarData();
  }

  // Insert the profit graph if the current page is the ref stats page and the user isn't ultimate
  // (Ultimate members have their own profit graphs
  if ('refStats' == currentPage.pageName() && !myAccountDetails.accountType.isUltimate) 
  {
    insertProfitGraph();
  }

  //  insertNewGraphs();

  insertChartDataBars();
  insertExportTabs();
  
  if ('refStats' == currentPage.pageName())
  {
    insertSidebar();

    // enlarge the width of the page to accomodate the extra column
    document.body.children[1].style.width = '1050px';
  }
}


/* REF LISTINGS PAGE FUNCTIONS */

/**
 * Calculate the number of days since the date 'tmp'
 * Will work with the words 'today' & 'yesterday' too
 */
function NumDaysSince(_inputDateTimeString, _levelOfDetail, _fullerSinceTimer, _shortFormat, _column)
{

//  logger(arguments.callee.caller);
//  logger(arguments);
  // Clean the input string and split it to [0] = date, [1] = time
  _inputDateTimeString = _inputDateTimeString.replace(/Today/,Today.getFullYear()+'/'+(Today.getMonth()+1)+'/'+Today.getDate());
  _inputDateTimeString = _inputDateTimeString.replace(/Yesterday/,Yesterday.getFullYear()+'/'+(Yesterday.getMonth()+1)+'/'+Yesterday.getDate());

  _inputDateTimeString = _inputDateTimeString.replace('&nbsp;', '').split(' ');


  var timeArray = new Array(2);
  timeArray[0] = (_inputDateTimeString[1]) ? (_inputDateTimeString[1].split(":")[0]) : "00";
  timeArray[1] = (_inputDateTimeString[1]) ? (_inputDateTimeString[1].split(":")[1]) : "00";


  //var _Since = new Date(year, month, day, hours, minutes);
  var _Since = new Date(_inputDateTimeString[0] + ' ' + timeArray[0] + ':' + timeArray[1]);


  var timeElapsed = '';
  var dateDiff = (Today - _Since) / MSPD;
  var wholeDaysOwned = Math.floor(dateDiff);
  var wholeHoursOwned = Math.floor((dateDiff - wholeDaysOwned) * 24);
  var wholeMinsOwned = Math.floor((((dateDiff - wholeDaysOwned) * 24) - wholeHoursOwned) * 60);

  var day_text = (_shortFormat) ? ' day' : 'd';
  var days_text = (_shortFormat) ? ' days' : 'd';
  var hr_text = (_shortFormat) ? ' hr' : 'h';
  var hrs_text = (_shortFormat) ? ' hrs' : 'h';
  var min_text = (_shortFormat) ? ' min' : 'm';
  var mins_text = (_shortFormat) ? ' mins' : 'm';

  var spacer = ', ';


  if (_fullerSinceTimer || 'decimal' == _levelOfDetail)
  {
    if ('decimal' == _levelOfDetail)
    {
      timeElapsed = dateDiff;
    }
    else
    {
      if ('days' == _levelOfDetail || 'hrs' == _levelOfDetail || 'mins' == _levelOfDetail)
      {
        timeElapsed += wholeDaysOwned;
        timeElapsed += (1 == wholeDaysOwned) ? day_text : days_text;
      }
      if ('hrs' == _levelOfDetail || 'mins' == _levelOfDetail)
      {
        timeElapsed += spacer;
        timeElapsed += wholeHoursOwned;
        timeElapsed += (1 == wholeHoursOwned) ? hr_text : hrs_text;
      }
      if ('mins' == _levelOfDetail)
      {
        timeElapsed += spacer;
        timeElapsed += wholeMinsOwned;
        timeElapsed += (1 == wholeMinsOwned) ? min_text : mins_text;
      }
    }
  }

  if ((!_fullerSinceTimer || 'wholeDays' == _levelOfDetail) && 'decimal' != _levelOfDetail)
  {
    timeElapsed = Math.floor(dateDiff);
  }

  return timeElapsed;
}

function extractRefData()
{
  var mtx = new Array();

  // Extract out the referral data for use later when iterating through the delayed referrals
  // Grab info from inside the <script> tag
  var xpathResults_mtx = docEvaluate("//script[contains(.,'mtx=')]").snapshotItem(0);

  // Fetch the useful part of the script and replace the ';' that got removed by
  // split()
  var mtxCode = xpathResults_mtx.innerHTML.split(';')[0] + ';';
  mtxCode = mtxCode.replace(/([0-9]+\.*[0-9]*)([,|\]])/g, "'$1'$2").replace(/var /,'');

  // Run the code in mtxCode (mtx=[...];)
  eval(mtxCode);

  logger('mtx');
  logger(mtx);


  /**
   * m = mtx[a]
   *
   * m[0] = Row # as shown in the first column
   * m[1] = Real name for referral / else 0
   * m[2] = Came From (direct) / Referral Since (rented) { (currentRefMTX[2] == '9') ? referrals[z - 1].referralSince : currentRefMTX[2] }
   * m[3] = Next Payment (rented) / Referral Since (direct) { (currentRefMTX[2] == '9') ? referrals[z - 1].referralSince : currentRefMTX[2] }
   * m[4] = Last Click Date { (currentRefMTX[4] == '9') ? referrals[z - 1].lastClick : (currentRefMTX[4] == 'N') ? 'No clicks yet' : (currentRefMTX[4] == 'O') ? 'Yesterday' : (currentRefMTX[4] == 'H') ? 'Today' : currentRefMTX[4] }
   * m[5] = Total Clicks
   * m[6] = Overall Average { (currentRefMTX[6] == '-.---' || currentRefMTX[6] == 999) ? '-.---' : currentRefMTX[6] }
   * m[7] = Some kind of long ID # / hash / something
   * m[8] = Unknown exact purpose 0/1 value used within much of the HTML attributes / function parameters
   * m[9] = Value of the checkbox
   * m[10] = When colouring by average is disabled, should background be gray (1) or white (0)
   * m[11] = *unused
   * m[12] = *unused
   * m[13] = Can golden graph button be displayed
   * m[14] = Minigraph click data (Ultimates only)
   * m[15] = Flag id (rented refs only)
   * m[16] = Can referral be recycled
   * m[17] = Is referral locked (rented refs only)
   * m[18] = Can referral be sold (direct refs only)
   * m[19] = Anonymous referral ID (is numerical - prefix of R or D is added on for display only)
   *
   *
   */


  // Iterate through mtx data and assign into the referrals object for easier
  // access later
  for (var z = 0; z < mtx.length; z++)
  {
    // NOTE: mtx.length = # of referrals shown on current page
    // (not necessarily the same as the [max] number of refs per page)

    var currentRefMTX = mtx[z];

    // referralSince and lastClick :: //
    // if date/time in one row is the same as the row before, mtx contains a '9'
    // instead of the duplicated date
    // lastClick :: //
    // 'Today' is coded as 'N' (unknown reason for this code); 'Yesterday' is
    // coded as 'O' (in Portuguese, Yesterday == Ontem)
    // overallAverage :: //
    // when referral is younger than 24hours old and has not yet clicked,
    // average is dispayed as '-.---'

    if ('rentedRefListing' == currentPage.pageName())
    {
      referrals[z] = {
        ID: ('0' == currentRefMTX[1]) ? 'R' + currentRefMTX[19] : currentRefMTX[1],
        flagType: currentRefMTX[15],
        referralSince: ('9' == currentRefMTX[2]) ? referrals[z - 1].referralSince : currentRefMTX[2],
        nextPayment: currentRefMTX[3],
        lastClick: ('9' == currentRefMTX[4]) ? referrals[z - 1].lastClick : ('N' == currentRefMTX[4]) ? 'No clicks yet' : ('O' == currentRefMTX[4]) ? 'Yesterday' : ('H' == currentRefMTX[4]) ? 'Today' : currentRefMTX[4],
        totalClicks: currentRefMTX[5],
        overallAverage: ('-.---' == currentRefMTX[6] || 999 == currentRefMTX[6]) ? '-.---' : currentRefMTX[6]
      };
    }
    else if ('directRefListing' == currentPage.pageName())
    {
      referrals[z] = {
        ID: ('0' == currentRefMTX[1]) ? 'D' + currentRefMTX[19] : currentRefMTX[1],
        cameFrom: currentRefMTX[2],
        referralSince: ('9' == currentRefMTX[3]) ? referrals[z - 1].referralSince : currentRefMTX[3],
        lastClick: ('9' == currentRefMTX[4]) ? referrals[z - 1].lastClick : ('N' == currentRefMTX[4]) ? 'No clicks yet' : ('O' == currentRefMTX[4]) ? 'Yestarday' : ('H' == currentRefMTX[4]) ? 'Today' : currentRefMTX[4],
        totalClicks: currentRefMTX[5],
        overallAverage: ('-.---' == currentRefMTX[6] || 999 == currentRefMTX[6]) ? '-.---' : currentRefMTX[6]
      };
    }

    /*If the referral has not clicked yet, the referral has been inactive for as long as it has been owned
     Else the referral has been inactive since the date of its last click*/

    if (referrals[z].lastClick.match(/No clicks yet/))
    {
      referrals[z].inactiveDays = NumDaysSince(referrals[z].referralSince, 'days', script.preferences.lastClick_fullerTimers, script.preferences.shortFormatTimer.lastClick, 'lastClick');
      referrals[z].accurateLastClick = NumDaysSince(referrals[z].referralSince, 'decimal', script.preferences.lastClick_fullerTimers, false, 'lastClick');
    }
    else
    {
      referrals[z].inactiveDays = NumDaysSince(referrals[z].lastClick, 'days', script.preferences.lastClick_fullerTimers, script.preferences.shortFormatTimer.lastClick, 'lastClick');
      referrals[z].accurateLastClick = NumDaysSince(referrals[z].lastClick, 'decimal', script.preferences.lastClick_fullerTimers, false, 'lastClick');
    }

    referrals[z].ownedSince_summarised = NumDaysSince(referrals[z].referralSince, 'mins', script.preferences.referralSince_fullerTimers, script.preferences.shortFormatTimer.referralSince, 'daysOwned');


    /* Ultimate only stuff, based on the ultimate minigraphs */
    if(100 >= refsPerPage && myAccountDetails.accountType.showUltimateFeatures)
    {
      referrals[z].minigraph = {
        'rawClickData': ('0' == currentRefMTX[14]) ? '0000000000'.split('') : currentRefMTX[14].split(''),
        'clicks': new Array()
      };

      // Now reverse the order of the array so that the most recent days are
      // first ([0] == today, [1] == yesterday)
      // referrals[z].minigraph.clicks.reverse();
      // referrals[z].minigraph.rawClickData = testing ?
      // [0,1,2,3,4,5,6,7,8,9].reverse() :
      // referrals[z].minigraph.rawClickData.reverse();
      referrals[z].minigraph.rawClickData = myAccountDetails.isUltimate ? referrals[z].minigraph.rawClickData.reverse() : [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1].reverse();


      // Make the minigraph data more useable by splitting it into an array
      for (var i = 0; i < referrals[z].minigraph.rawClickData.length; i++)
      {
        referrals[z].minigraph.clicks[i] = parseInt(referrals[z].minigraph.rawClickData[i], 10);
      }


      /**
       * Compute the mean and variance using a "numerically stable algorithm".
       * Based on http://maiaco.com/articles/computingStatsInJS.php
       */

      //    console.group();
      //    logger('x, referrals[z].minigraph.mean[i-1],delta,sweep');

      var sqsum = 0;
      referrals[z].minigraph.mean = new Array();
      referrals[z].minigraph.sum = new Array();
      referrals[z].minigraph.variance = new Array();
      referrals[z].minigraph.sdev = new Array();

      referrals[z].minigraph.mean[0] = referrals[z].minigraph.clicks[0];
      referrals[z].minigraph.sum[0] = referrals[z].minigraph.clicks[0];
      referrals[z].minigraph.variance[0] = referrals[z].minigraph.clicks[0];
      referrals[z].minigraph.sdev[0] = referrals[z].minigraph.clicks[0];


      for (var i = 1; i < referrals[z].minigraph.clicks.length; ++i)
      {
        var x = referrals[z].minigraph.clicks[i];
        var delta = x - referrals[z].minigraph.mean[i-1];
        var sweep = i + 1.0;
        referrals[z].minigraph.mean[i] = referrals[z].minigraph.mean[i-1] + (delta / sweep);
        sqsum += delta * delta * (i / sweep);

        referrals[z].minigraph.sum[i] = referrals[z].minigraph.mean[i] * (i + 1);
        referrals[z].minigraph.variance[i] = sqsum / (i + 1);
        referrals[z].minigraph.sdev[i] = Math.sqrt(referrals[z].minigraph.variance[i]);
      }

    } /* END calculating stats for minigraph clicks */


  }
}

function addSortingArrows(_column)
{
  /**
   * Adds sort ascending and descending arrows to all columns
   *
   * TODO: Check which column contains the gold arrow before removing them
   * Currently uses the URL to determine which ordering method is in use
   */

  /**
   * Name           &ss1=2 &ss2= (1Asc/2Desc)??
   * Ref Since      ch_ext_schedule&ss1=1 &ss2= (1Asc/2Desc)
   * Next Payment   &ss1=5 &ss2= (2Asc/1Desc)
   * Last Click     &ss1=4 &ss2= (2Asc/1Desc)
   * Clicks         &ss1=3 &ss2= (2Asc/1Desc)
   * Average        &ss1=7 &ss2= (2Asc/1Desc)
   *
   * &ss1 = column to be sorted by
   * &ss2 = asc / desc
   * &ss3 = direct / rented refs
   *
   */

  var vars = new Array();
  //  vars[n] = [ss1, ss2, ss3]
  //  vars[n] = [colIndex, up, down]
  vars[1] = [2,2,1,'Sort by Referral ID#'];
  vars[2] = [1,1,2,'Sort by the total time that the referral has been Owned']; // Does not match existing arrow directions
  vars[3] = [5,2,1,'Sort by time until Next Payment is Due'];
  vars[4] = [4,1,2,"Sort by time since the referral's Last Click"];
  vars[5] = [3,2,1,'Sort by Total Number of Clicks'];
  vars[6] = [7,2,1,'Sort by Average number of clicks'];


  var blah = new Array();

  for(var i = 1; 7 > i; i++)
  {
    blah [i] = {
      colUrlIndex: vars[i][0],
      up: vars[i][1],
      down: vars[i][2],
      upTitle: vars[i][3] + ', Ascending',
      downTitle: vars[i][3] + ', Descending'
    }
  }

  //  Removes existing arrows
  headerRow.innerHTML = headerRow.innerHTML.replace('<img src=\"/forum/images/up_gold.gif\" height=\"6\" width=\"10\">', '');
  headerRow.innerHTML = headerRow.innerHTML.replace('<img src=\"/forum/images/down_gold.gif\" height=\"6\" width=\"10\">', '');

  //  Loop through column headers and add custom arrows & links
  for (var x in blah)
  {
    var currentColumn = headerRow.childNodes[x];
    var href = 'http://www.neobux.com/?u=c&s=r&sp=1';
    var imgSrc = '/forum/images/';



    //  If the current sorting method is acting upon the current column AND the current sort direction is up,
    //  this status should be indicated by the gold arrow in this column header
    //  Else, the script should default to the gray arrow
    if (document.location.href.match('&ss1=' + blah[x].colUrlIndex) && document.location.href.match('&ss2=' + blah[x].up))
    {
      href += "&ss1=" + blah[x].colUrlIndex + "&ss2=" + blah[x].up + "&ss3=2";
      imgSrc += 'up_gold.gif';
    }
    else
    {
      href += "&ss1=" + blah[x].colUrlIndex + "&ss2=" + blah[x].up + "&ss3=2";
      imgSrc += 'up.gif';
    }

    currentColumn.innerHTML += " <a href='" + href + "'><img width='10' height='6' style='border:none; margin-left:2px;' title=\""+blah[x].upTitle+"\" src='" + imgSrc + "'></a>";

    /*Reset variables for down arrow*/
    href = 'http://www.neobux.com/?u=c&s=r&sp=1';
    imgSrc = '/forum/images/';

    if (document.location.href.match('&ss1=' + blah[x].colUrlIndex) && document.location.href.match('&ss2=' + blah[x].down))
    {
      href += "&ss1=" + blah[x].colUrlIndex + "&ss2=" + blah[x].down + "&ss3=2";
      imgSrc += 'down_gold.gif';
    } else
    {
      href += "&ss1=" + blah[x].colUrlIndex + "&ss2=" + blah[x].down + "&ss3=2";
      imgSrc += 'down.gif';
    }

    currentColumn.innerHTML += " <a href='" + href + "'><img width='10' height='6' style='border:none; margin-left:-2px;' title=\""+blah[x].downTitle+"\" src='" + imgSrc + "'></a>";

  }
}

function addColumnHeader(_currentHeaderRow, _newHeaderText)
{
  var newHeaderColumn = document.createElement('td');
  newHeaderColumn.setAttribute('class', 'bgt');
  newHeaderColumn.setAttribute('nowrap', '');
  newHeaderColumn.setAttribute('align', 'center');
  newHeaderColumn.innerHTML = '<font class="branco">' + _newHeaderText + '</font>';

  _currentHeaderRow.appendChild(newHeaderColumn);
}

function addNewColumn(_currentRow, _newColumnText, _shrinkContents)
{
  console.info('addNewColumn arguments');
  console.info(arguments);

  var newColumn = document.createElement('td');
  newColumn.setAttribute('class', 'l');
  newColumn.setAttribute('nowrap', '');
  newColumn.setAttribute('style', 'border-right: 1px solid #AAAAAA;');
  newColumn.style.backgroundColor = window.getComputedStyle(columns.name, null).backgroundColor;
  newColumn.innerHTML = _newColumnText;

  if (_shrinkContents)
  {
    shrinkContents(newColumn);
  }

  _currentRow.appendChild(newColumn);
}

function shrinkContents(_column)
{
  _column.style.letterSpacing = '-0.05em';
  _column.style.wordSpacing = '-0.1em';
}

function shrinkColumns(_currentReferralRow, _currentReferralInfo)
{
  if ('rentedRefListing' == currentPage.pageName()) {
    if (script.preferences.shrinkContents['flag']) {
      shrinkContents(columns.flag);
    }
  }
  if (script.preferences.shrinkContents['referralName']) {
    shrinkContents(columns.name);
  }
  if (script.preferences.shrinkContents['referralSince']) {
    shrinkContents(columns.ownedSince);
  }
  if ('rentedRefListing' == currentPage.pageName()) {
    if (script.preferences.shrinkContents['nextPayment']) {
      shrinkContents(columns.nextPayment);
    }
  }
  if (script.preferences.shrinkContents['lastClick']) {
    shrinkContents(columns.lastClick);
  }
  if (script.preferences.shrinkContents['totalClicks']) {
    shrinkContents(columns.totalClicks);
  }
  if (script.preferences.shrinkContents['average']) {
    shrinkContents(columns.overallAvg);
  }
}




if (('rentedRefListing' == currentPage.pageName() || 'directRefListing' == currentPage.pageName()))
{
  /*
   Check how many referrals are being shown per page
   If the user is ultimate and has more than 100 referrals showing, minigraphs
   will not be displayed
   If the user has fewer than 10 referrals, the option to select the # of
   referrals is not present, thus refsPerPage must be set manually
   */
  var refsPerPageSelector = document.getElementById('rlpp');
  var refsPerPage = (null !== refsPerPageSelector) ? parseInt(refsPerPageSelector.options[refsPerPageSelector.selectedIndex].value, 10) : 10;

  logger(refsPerPage);


  var referrals = {};
  extractRefData();

  logger('referrals');
  logger(referrals);


  function editHeaderRow()
  {
    // Exact Average column
    if (script.preferences.exactAverageShow)
    {
      if (script.preferences.exactAverageReplace)
      {
        headerRow.childNodes[columns.headerIndexes.AVG].innerHTML += '<small><br>(Exact)</small>';
      } else
      {
        headerRow.childNodes[columns.headerIndexes.AVG].innerHTML += '<small><br>' + script.preferences.exactAverageSeperator + 'Exact Avg.</small>';
      }
    }

    /**
     * Ultimate-only columns::
     * Ultimate's minigraphs will not be shown if there are more than 100 referrals per page
     */

    if (100 >= refsPerPage && myAccountDetails.accountType.showUltimateFeatures)
    {
      logger('script.preferences.showColumn');
      logger(script.preferences.showColumn);

      // clickText column == A textual representation of the data in the mini click graphs
      logger(script.preferences.showColumn['clickText']);
      if (script.preferences.showColumn['clickText'])
      {
        addColumnHeader(headerRow, 'Clicks<small>/day</small>');
      }

      // 'average1' column == Average for the last 10 days
      logger(script.preferences.showColumn['average1']);
      if (script.preferences.showColumn['average1'])
      {
        addColumnHeader(headerRow, 'A' + script.preferences.timePeriods.averageCols[0]);
      }

      // 'average2' column == Average for the last 7 days
      logger(script.preferences.showColumn['average2']);
      if (script.preferences.showColumn['average2'])
      {
        addColumnHeader(headerRow, 'A' + script.preferences.timePeriods.averageCols[1]);
      }

      // 'SDEV' column == Average for the last 7 days
      logger(script.preferences.showColumn['SD']);
      if (script.preferences.showColumn['SD'])
      {
        addColumnHeader(headerRow, 'SD');
      }

      // 'RSA' column == Ratio of standard deviation / average (mean)
      logger(script.preferences.showColumn['RSA']);
      if (script.preferences.showColumn['RSA'])
      {
        addColumnHeader(headerRow, 'RSA');
      }
    }

    // 'Profit' column can be viewed by all members
    if (script.preferences.showColumn['profit'])
    {
      addColumnHeader(headerRow, 'Profit');
    }


  } // editHeaderRow()


  function flag_textify(_currentReferral)
  {

    // The flag column
    if ('rentedRefListing' == currentPage.pageName() && script.preferences.flag_textify)
    {
      // Get the flag colour of the referral
      // Expecting only 0-5 for the 6 colorus / 'types' of flag
      switch (parseInt(referrals[refIndex].flagType, 10))
      {
        case 0:
          // flag0.gif == White (W) flag
          referrals[refIndex].flagColour = ('W');
          break;
        case 1:
          // flag1.gif == Red (R) flag
          referrals[refIndex].flagColour = ('R');
          break;
        case 2:
          // flag2.gif == Orange (O) flag
          referrals[refIndex].flagColour = ('O');
          break;
        case 3:
          // flag3.gif == Yellow (Y) flag
          referrals[refIndex].flagColour = ('Y');
          break;
        case 4:
          // flag4.gif == Green (G) flag
          referrals[refIndex].flagColour = ('G');
          break;
        case 5:
          // flag5.gif == Blue (B) flag
          referrals[refIndex].flagColour = ('B');
          break;
        default:
          // Unknown (U) flag
          // Will appear if different numbering scheme is used or if extra flags
          // are added
          referrals[refIndex].flagColour = ('U');
          break;
      }


      // Append the appropriate flag letter after the flag
      columns.flag.innerHTML += script.preferences.columnPrefix['flag'] + referrals[refIndex].flagColour;

      // Stop the extra letter causing the cell to wrap around and increase
      // the height of the rows
      columns.flag.style.whiteSpace = "nowrap";
    }

  }


  function addNumerisedTimers(_currentReferral)
  {
    /**
     * Calculate the number of days referral has been owned and convert this
     * to a 'fuller' version [x days, y hours, z mins]
     * If {column}_shortFormat == true, it will return [x d, y h, z m] instead
     * If 'fullerSinceTimers' is set to false, NumDaysSince () will return
     * only the whole number of days that have passed
     */


    // Insert the summarised date / 'time elapsed' to the cell
    // If user preference is to not replace the whole cell, append to end of
    // existing cell contents, else replace the cell contents

    /*
     'Owned Since' column
     */
    if (script.preferences.numeriseDates.referralSince)
    {
      columns.ownedSince.innerHTML = (script.preferences.referralSince_replace) ? '' : columns.ownedSince.innerHTML;
      columns.ownedSince.innerHTML += "<font style='font-size:9px; color:#777'> (" + referrals[refIndex].ownedSince_summarised + ")</font>";
    }

    /*
     'Last Click' column
     */
    if (script.preferences.numeriseDates.lastClick)
    {
      if (script.preferences.lastClick_replace || (script.preferences.lastClick_replaceNilClicks && 0 === parseInt(referrals[refIndex].totalClicks, 10)))
      {
        columns.lastClick.innerHTML = "<font style='font-size: 9px; color:#777'>" + referrals[refIndex].inactiveDays + "</font>";
      }
      else
      {
        columns.lastClick.innerHTML = referrals[refIndex].lastClick + "<font style='font-size: 9px; color:#777'> [" + referrals[refIndex].inactiveDays + "]</font>";
      }
    }
  }


  function insertExactAverage(_currentReferral)
  {
    var accurateOwnedSince = NumDaysSince(referrals[refIndex].referralSince, 'decimal', script.preferences.referralSince_fullerTimers, false, 'ownedSince');
    var accurateAverage = parseInt(referrals[refIndex].totalClicks, 10) / accurateOwnedSince;


    if (script.preferences.exactAverageShow)
    {
      // Replace the displayed average (accurate to a 24hour period) with one
      // that that is more accurate
      // (takes hours and minutes into account)

      if (script.preferences.exactAverageReplace)
      {
        columns.overallAvg.innerHTML = (accurateAverage).toFixed(3);
      }
      else
      {
        columns.overallAvg.innerHTML = columns.overallAvg.innerHTML + '<small>' + script.preferences.exactAverageSeperator + (accurateAverage).toFixed(3) + '</small>';
      }
    }

    columns.overallAvg.innerHTML = script.preferences.columnPrefix['average'] + '' + columns.overallAvg.innerHTML;
    // + '' + is necessary to ensure that the vars are concatenated (as opposed to mathematical addition)

  }


  var columns = {};

  /* Define the column indexes */
  if ('rentedRefListing' == currentPage.pageName())
  {
    columns.indexes = {
      FLAG: 1,
      NAME: 3,
      SINCE: 4,
      NEXT_PAYMENT: 5,
      LAST: 6,
      CLICKS: 7,
      AVG: 8
    };

    columns.headerIndexes = {
      NAME: 1,
      SINCE: 2,
      NEXT_PAYMENT: 3,
      LAST: 4,
      CLICKS: 5,
      AVG: 6
    };
  } else if ('directRefListing' == currentPage.pageName())
  {
    columns.indexes = {
      NAME: 1,
      CAME_FROM:2,
      SINCE: 3,
      LAST: 4,
      CLICKS: 5,
      AVG: 6
    };

    columns.headerIndexes = {
      NAME: 1,
      CAME_FROM:2,
      SINCE: 3,
      LAST: 4,
      CLICKS: 5,
      AVG: 6
    };
  }

  // mainTable = the table within which the referrals are contained
  // Specifically the tbody element so that {tbody}.rows can be used

  var mainTable = docEvaluate('//td[@class="bgt"]/ancestor::tbody[1]').snapshotItem(0);

  var headerRow = mainTable.rows[0];
  var footerRow = mainTable.rows[mainTable.rows.length - 1];

  var refRows = docEvaluate('//tr[@onmouseover]');

  var rows_referrals = new Array();
  for (var i = 0; i < refRows.snapshotLength; i++)
  {
    rows_referrals[i] = refRows.snapshotItem(i);
  }

  addSortingArrows();
  editHeaderRow();

  function processReferralRows()
  {
    var sumOfAverages = 0;
    var clickSum = 0;
    var activeRefCount = 0;
    var refCount = -1;

    var todayClickers = 0;
    var ydayClickers = 0;
    var zeroClickers = 0;
    var otherClickers = 0;


    function insertClicksChange(_currentReferralRow, _currentReferralInfo)
    {
      // Get value currently stored
      // Get current value

      // If stored value (for *YESTERDAY*) doesn't exist
      // column.avg.innerHTML += '<small>[?]</small>';

      // If stored value is equal to the current value
      // column.avg.innerHTML += '<small>[==]</small>';

      // If stored value is smaller than the current value
      // column.avg.innerHTML += '<small>[+'+(storedValue - currentValue+']</small>';

    }
    function insertClicksDayColumn(_currentReferralRow, _currentReferralInfo)
    {
      if (true === script.preferences.showColumn['clickText'])
      {
        // clickText column == A textual representation of the data in the mini
        if (true === script.preferences.showColumn['clickText'])
        {
          var columnText_clickText = '';
          columnText_clickText += _currentReferralInfo.minigraph.clicks[_currentReferralInfo.minigraph.clicks.length - 1].toFixed(0);

          for (var x = _currentReferralInfo.minigraph.clicks.length - 2; 0 <= x; x--)
          {
            columnText_clickText += '|' + _currentReferralInfo.minigraph.clicks[x].toFixed(0);
          }

          addNewColumn(_currentReferralRow, "<font style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['clickText'] + columnText_clickText + "</font>", script.preferences.shrinkContents['clickText']);
        }
      }
    }

    function insertMinigraphAveragesColumns(_currentReferralRow, _currentReferralInfo)
    {
      // 'average1' column == Average for the last timePeriod_average1 days
      if (true === script.preferences.showColumn['average1'])
      {
        var columnText_average1 = _currentReferralInfo.minigraph.mean[script.preferences.timePeriods.averageCols[0] - 1].toFixed(2);
        addNewColumn(_currentReferralRow, "<font style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['average1'] + columnText_average1 + "</font>", script.preferences.shrinkContents['average1']);
      }

      // 'average2' column == Average for the last 7 days
      if (true === script.preferences.showColumn['average2'])
      {
        var columnText_average2 = _currentReferralInfo.minigraph.mean[script.preferences.timePeriods.averageCols[1] - 1].toFixed(2);
        addNewColumn(_currentReferralRow, "<font style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['average2'] + columnText_average2 + "</font>", script.preferences.shrinkContents['average2']);
      }
    }

    function insertSDColumn(_currentReferralRow, _currentReferralInfo)
    {
      // 'SDEV' column == Standard DEViation for the last 10 days
      if (true === script.preferences.showColumn['SD'])
      {
        var columnText_SD = _currentReferralInfo.minigraph.sdev[9].toFixed(2);
        addNewColumn(_currentReferralRow, "<font style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['SD'] + columnText_SD + "</font>", script.preferences.shrinkContents['SD']);
      }
    }

    function insertRSAColumn(_currentReferralRow, _currentReferralInfo)
    {
      // 'RSA' column == Ratio of standard deviation / average (mean)
      if (true === script.preferences.showColumn['RSA'])
      {
        var columnText_RSA = (_currentReferralInfo.minigraph.sdev[9] / _currentReferralInfo.minigraph.mean[9]).toFixed(2);
        addNewColumn(_currentReferralRow, "<font style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['RSA'] + columnText_RSA + "</font>", script.preferences.shrinkContents['SD']);
      }
    }


    /* insertProfitColumn */
    function insertProfitColumn(_currentReferralRow, _currentReferralInfo)
    {
      if (script.preferences.showColumn['profit'])
      {
        //            console.group();
        //            logger('Adding Profit column.');


        // CALCULATE REFERRAL EXPENSES PER DAY AND MIN BREAK EVEN AVERAGE
        var renewalPeriod = script.preferences.renewalPeriod;
        var renewalCost = myAccountDetails.renewalFees[renewalPeriod]; // Cost of renewing
        // for the renewing period

        // Cost of renewing, per ref per day::
        var renewalCostPerRefPerDay = renewalCost / renewalPeriod;


        // Cost of golden & golden packs per ref, per day
        if (0 < myAccountDetails.accountType.numerical)
        {
          var goldenFeePerRefPerDay = ((90 / 365) / myAccountDetails.numberOfRefs.Rented);
          var goldenPackFeePerRefPerDay = ((myAccountDetails.goldenPackCost / 365) / myAccountDetails.numberOfRefs.Rented);
        } else
        {
          var goldenFeePerRefPerDay = 0;
          var goldenPackFeePerRefPerDay = 0;
        }

        // Calculate how much referrals cost per day
        var expensesPerRefPerDay = renewalCostPerRefPerDay + goldenFeePerRefPerDay + goldenPackFeePerRefPerDay;

        // Calculate the minimum average needed to pay for the expenses of each ref
        // each day
        minBreakEvenAvgExcludingRecycles = expensesPerRefPerDay / myAccountDetails.referralClickValue;


        // Retrieve numerical version of numDaysOwned and other details about
        // the current individual referral
        var numDaysOwned_decimal = NumDaysSince(_currentReferralInfo.referralSince, 'wholeDays', script.preferences.lastClick_fullerTimers, false, 'lastClick');

        var refClicks = parseInt(_currentReferralInfo.totalClicks, 10);
        var refID = _currentReferralInfo.ID.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");

        //
        var accurateOwnedSince = NumDaysSince(_currentReferralInfo.referralSince, 'decimal', script.preferences.referralSince_fullerTimers, false, 'ownedSince');
        var accurateAverage = parseInt(_currentReferralInfo.totalClicks, 10) / accurateOwnedSince;

        var indivAvg = accurateAverage;


        // Calculate the gross income and expenses for the referral (accurate to
        // the minute)
        var grossIn = (refClicks * myAccountDetails.referralClickValue);

        if ('rentedRefListing' == currentPage.pageName())
        {
          var grossOut = numDaysOwned_decimal * expensesPerRefPerDay;
        } else if ('directRefListing' == currentPage.pageName())
        {
          grossOut = 0;
        } else
        {
          grossOut = 1000;
        }

        var netProfit_exclRecycles = (grossIn - grossOut);
        var netProfit_inclRecycles = (grossIn - grossOut) - (myAccountDetails.recycleCost);

        var profitPerDay = (indivAvg * myAccountDetails.referralClickValue) - expensesPerRefPerDay;

        /*
         logger('currentPage.pageName() = ' + currentPage.pageName() + '\n' +
         'numDaysOwned_decimal = ' + numDaysOwned_decimal + '\n' +
         'expensesPerRefPerDay = ' + expensesPerRefPerDay + '\n' +
         'grossOut = ' + grossOut + '\n' +
         'grossIn = ' + grossIn + '\n' +
         'myAccountDetails.recycleCost = ' + myAccountDetails.recycleCost + '\n' +
         'netProfit_exclRecycles = ' + netProfit_exclRecycles + '\n' +
         'netProfit_inclRecycles = ' + netProfit_inclRecycles, 7);
         */

        // Calculate the net income of the individual referral slot

        // If the user wishes to include the cost of recycling in the profit
        // column, include the recycle fee
        // in the gross expenses for the referral

        var PROFIT;
        if (!script.preferences.profit_includeRecycleCost || ('directRefListing' == currentPage.pageName()))
        {
          PROFIT = netProfit_exclRecycles;
        }
        else
        {
          PROFIT = netProfit_inclRecycles;
        }

        // Functions used by script::
        function getDaysTilPaidOwnRecycle(_individualAvg, _currentProfit, _expensesPerRefPerDay)
        {
          var incomePerRefPerDay = _individualAvg * myAccountDetails.referralClickValue;
          var dayCounter = 0;
          var indivProfit = new Array();
          var dayLimit = 30;
          var profitNeeded = myAccountDetails.recycleCost - _currentProfit;

          // Pre-Calculate the amount of profit that will be made after
          // dayCounter days at _individualAvg clicks per day
          do
          {
            dayCounter++;
            indivProfit[dayCounter] = dayCounter * (incomePerRefPerDay - _expensesPerRefPerDay);
          } while (dayCounter < dayLimit);


          // If _currentProfit is less than the cost of recycling, return number
          // of days until _currentProfit > recycleCost
          // Else return 'N/A' to signify that the referral has already
          // generated enough profit to pay for its own recycle
          if (myAccountDetails.recycleCost > _currentProfit)
          {
            // Find the point where projected individual profit will be equal to
            // or greater than
            // the amount of profit needed to pay for its own recycle
            var numberOfDays = 1;
            while (indivProfit[numberOfDays] < profitNeeded)
            {
              numberOfDays++;
            }

            // Check whether the numberOfDays is unreasonably large
            // If it is unreasonably large (default max: 30 days), then return a
            // message saying this
            if (numberOfDays > dayLimit)
            {
              numberOfDays = 'More than ' + dayLimit + ' days';
            }

            return numberOfDays;
          }
          else
          {
            return 'N/A';
          }
        }


        // Calculate how many days it will take for the referral to pay for its
        // own recycle
        // --> Assumes that the referral has clicked consistently at the current
        // average
        // --> Odd results from this will be shown if the referral has vastly
        // changing click patterns
        // --> Will return 'More than '+dayLimit+' days' if it will take >
        // dayLimit days to pay for own recycle (dayLimit: default = 30)

        var daysTilPaidOwnRecycle = getDaysTilPaidOwnRecycle(indivAvg, netProfit_exclRecycles, expensesPerRefPerDay);
        var daysLeftToRepay;

        if (!isNaN(daysTilPaidOwnRecycle))
        {
          daysLeftToRepay = daysTilPaidOwnRecycle - numDaysOwned_decimal;
        } else
        {
          if (parseFloat(indivAvg) < parseFloat(minBreakEvenAvgExcludingRecycles))
          {
            daysTilPaidOwnRecycle = 'Never';
          }
          daysLeftToRepay = 'N/A';
        }


        // Create the new 'profit' column
        var newColumn_PROFIT = document.createElement('td');
        newColumn_PROFIT.setAttribute('class', 'l');
        newColumn_PROFIT.setAttribute('nowrap', '');
        newColumn_PROFIT.setAttribute('style', 'border-right: 1px solid rgb(170, 170, 170);');
        newColumn_PROFIT.style.backgroundColor = window.getComputedStyle(columns.name, null).backgroundColor;

        newColumn_PROFIT.id = 'PROFIT_' + refID;
        // This ID is used by 'prototip' as an anchor to attach the tooltip to


        // If the net profit is negative, format it differently
        if (0 < PROFIT)
        {
          addNewColumn(_currentReferralRow, "<span id='PROFIT_" + refID + "' style='font-size:9px; color:#000;'>" + script.preferences.columnPrefix['profit'] + PROFIT.toFixed(3) + "</span>", script.preferences.shrinkContents['profit']);
        } else
        {
          addNewColumn(_currentReferralRow, "<span id='PROFIT_" + refID + "' style='font-size:9px; color:#800; font-style:italic;'>" + script.preferences.columnPrefix['profit'] + PROFIT.toFixed(3) + "</span>", script.preferences.shrinkContents['profit']);
        }


        // If the current page is the rented referral listing page, create and
        // insert the tooltips
        if ('rentedRefListing' == currentPage.pageName())
        {
          var tipContent = '<p>Referral: <b>' + refID + '</b></p>' +
              '<hr>' +
              '<i><small>Expenses</small></i><br>' +
              'Renewals <i><small>(' + renewalPeriod + ' day renewal)</small></i> = <b>$' + renewalCostPerRefPerDay.toFixed(5) + '</b><br>';

          // Add Golden / Golden Pack-specific lines to the tooltip
          if (1 == myAccountDetails.accountType.numerical)
          {
            tipContent = tipContent + 'Golden fee <i><small>(per ref per day)</small></i> = <b>$' + goldenFeePerRefPerDay.toFixed(5) + '</b><br>';
          }
          if (1 < myAccountDetails.accountType.numerical)
          {
            tipContent = tipContent + 'Golden-Pack fee <i><small>(per ref per day)</small></i> = <b>$' + goldenPackFeePerRefPerDay.toFixed(5) + '</b><br>';
          }

          tipContent = tipContent +
              'Total Expenses <i><small>(per ref per day)</small></i> = <b>$' + expensesPerRefPerDay.toFixed(5) + '</b><br>' +
              '<br>' +

              'Minimum average <i><small>(to break even)</small></i> = <b>' + minBreakEvenAvgExcludingRecycles.toFixed(3) + '</b><br>' +
              'Gross In = <b>$' + grossIn.toFixed(5) + '</b><br>' +
              'Gross Out = <b>$' + grossOut.toFixed(5) + '</b><br>' +
              'Current profit = <b>$' + netProfit_exclRecycles.toFixed(5) + '</b><br>' +
              'Current profit <i><small>(incl ' + myAccountDetails.recycleCost + ' recycle)</small></i> = <b>$' + netProfit_inclRecycles.toFixed(5) + '</b><br>' +
              '<br>' +

              '<i><small>@ Average = <b>' + indivAvg.toFixed(3) + '</b></small></i>:<br>' +
              'Net Profit <i><small>(per day)</small></i> = <b>$' + profitPerDay.toFixed(5) + '</b><br>' +
              'Days to pay for own recycle = <b>' + daysTilPaidOwnRecycle + '</b>';

          if (!isNaN(daysTilPaidOwnRecycle))
          {
            tipContent += ' <small>(<i>day # <b>' + (daysTilPaidOwnRecycle + numDaysOwned_decimal) + '</b></i>)</small><br>';
          }

          tipContent += '<br>';

          /*

           // Create and insert a new script node for the prototip tooltip
           // javascript code to be run from
           var tooltipScript = document.createElement('script');
           // var text = document.createTextNode("new mk_tt('Profit_"+refID+"',
           // 'bm', '"+tipContent+"')");
           var text = document.createTextNode("mk_tt('PROFIT_" + refID + "', 'tm', '<div style=\"text-align:left !important; font-size:x-small;\">" + tipContent + "</div>')");
           tooltipScript.type = 'text/javascript';
           tooltipScript.appendChild(text);

           document.body.appendChild(tooltipScript);

           */

          var p1 = "topMiddle";
          var p2 = "bottomRight";
          var tooltipConfig = {
            content: '<div style=\"text-align:left !important; font-size:x-small;\">' + tipContent + '</div>',
            show: {
              when: {
                event: "mouseover"
              },
              delay: 700,
              solo: true
            },
            hide: {
              fixed: true
            },
            position: {
              corner: {
                target: p1,
                tooltip: p2
              },
              adjust: {
                screen: true
              }
            },
            style: {
              width: "auto",
              padding: 0,
              background: "#444",
              color: "#fff",
              textAlign: "center",
              fontSize: "11px",
              border: {
                width: 1,
                radius: 8,
                color: "#444"
              },
              tip: p2
            }
          };

          location.href = "javascript:void(jQuery('#PROFIT_" + refID + "').qtip(" + JSON.stringify(tooltipConfig) + "))";


        }
      } //if(showColumn['profit'])
    }
    function insertExtraColumns(_currentReferralRow, _currentReferralInfo)
    {

      //        logger('if ((100 >= refsPerPage) && myAccountDetails.accountType.showUltimateFeatures)');
      //        logger([refsPerPage, (100 >= refsPerPage), myAccountDetails.accountType.showUltimateFeatures]);
      if ((100 >= refsPerPage) && myAccountDetails.accountType.showUltimateFeatures)
      {

        try
        {
          insertClicksDayColumn(_currentReferralRow, _currentReferralInfo);
        } catch(e)
        {
          GM_log('Error displaying Clicks/day column\n\n' + e);
        }

        try
        {
          insertMinigraphAveragesColumns(_currentReferralRow, _currentReferralInfo);
        } catch(e)
        {
          GM_log('Error displaying Minigraph Averages columns (A10/A7)\n\n' + e);
        }

        try
        {
          insertSDColumn(_currentReferralRow, _currentReferralInfo);
        } catch(e)
        {
          GM_log('Error displaying SD column\n\n' + e);
        }

        try
        {
          insertRSAColumn(_currentReferralRow, _currentReferralInfo);
        }
        catch(e)
        {
          GM_log('Error displaying RSA column\n\n' + e);
        }
      }

      try
      {
        insertProfitColumn(_currentReferralRow, _currentReferralInfo);
      } catch(e)
      {
        GM_log('Error displaying profit column\n\n' + e);
      }

    }

    for (refIndex in rows_referrals)
    {
      var currentReferralRow = rows_referrals[refIndex];
      var currentReferralInfo = referrals[refIndex];

      columns.flag = currentReferralRow.childNodes[columns.indexes.FLAG];
      columns.name = currentReferralRow.childNodes[columns.indexes.NAME];
      columns.ownedSince = currentReferralRow.childNodes[columns.indexes.SINCE];
      if ('rentedRefListing' == currentPage.pageName())
      {
        columns.nextPayment = currentReferralRow.childNodes[columns.indexes.NEXT_PAYMENT];
      }
      columns.lastClick = currentReferralRow.childNodes[columns.indexes.LAST];
      columns.totalClicks = currentReferralRow.childNodes[columns.indexes.CLICKS];
      columns.overallAvg = currentReferralRow.childNodes[columns.indexes.AVG];

      // Columns specific to the direct referrals page
      if ('directRefListing' == currentPage.pageName())
      {
        columns.cameFrom = currentReferralRow.childNodes[columns.indexes.CAME_FROM];
        columns.nextPayment = currentReferralRow.childNodes[columns.indexes.NEXT_PAYMENT];
      }

      //    logger(currentReferralRow);


      /**
       Update the overall statistics for the single page of referrals (data
       used for bar at bottom of the referral listing page)
       */
      // TODO:: Find out why currentReferralInfo.overallAverage is set to 999 for new refs <24hours old here but not earlier in the script
      //      logger(currentReferralInfo.overallAverage);

      if (0 < parseFloat(currentReferralInfo.overallAverage) < 100)
      {
        sumOfAverages += parseFloat(currentReferralInfo.overallAverage);
        clickSum += parseInt(currentReferralInfo.totalClicks, 10);
        activeRefCount++;

        //        logger([parseFloat(currentReferralInfo.overallAverage),sumOfAverages,,parseInt(currentReferralInfo.totalClicks),clickSum,activeRefCount]);
      }

      /* Keep a tally of how many referrals clicked today / yesterday / never / other */
      if (0 === parseInt(currentReferralInfo.totalClicks, 10))
      {
        zeroClickers++;
      } else if (0 === Math.floor(currentReferralInfo.accurateLastClick))
      {
        todayClickers++;
      } else if (1 === Math.floor(currentReferralInfo.accurateLastClick))
      {
        ydayClickers++;
      } else
      {
        otherClickers++;
      }


      // insertColumnPrefixes(currentReferralRow, curentReferralInfo);
      shrinkColumns(currentReferralRow, currentReferralInfo);
      flag_textify(currentReferralRow, currentReferralInfo);
      addNumerisedTimers(currentReferralRow, currentReferralInfo);
      insertExactAverage(currentReferralRow, currentReferralInfo);

      insertClicksChange(currentReferralRow, currentReferralInfo);

      // processMinigraphs(currentReferralRow, currentReferralInfo);

      insertExtraColumns(currentReferralRow, currentReferralInfo);


    }


    // Widen remaining rows
    function widenRemainingRows()
    {
      var requiredColspan = rows_referrals[0].children.length;
      for (var i = 0; i < mainTable.rows.length; i++)
      {
        if (10 == mainTable.rows[i].children[0].getAttribute('colspan'))
        {
          mainTable.rows[i].children[0].setAttribute('colspan', requiredColspan);
        }
      }
    }


    function insertFooterData(_footerRow)
    {
      // SUMMARY ROW @ bottom of the referral listing table //
      // Set the size of the bottom row to match the size of the **first referral
      // row** to accomodate for extra columns that have been added
      _footerRow.childNodes[0].colSpan = rows_referrals[0].childNodes.length;


      var totalClickAvg = sumOfAverages / activeRefCount;
      logger('totalClickAvg\n' + totalClickAvg + '\n' + sumOfAverages + '\n' + activeRefCount);

      totalClickAvg = (isNaN(totalClickAvg)) ? 0 : totalClickAvg;

      var footerRow_text = "<font style='font-size:9px;color:#FFFFFF;font-weight:bold;'>" +
          " | " + ('Total Clicks') + " : " + clickSum +
          " | " + ('Total Click Avg') + " : " + (totalClickAvg).toFixed(3);

      //      if(refsPerPage <= 100 && myAccountDetails.accountType.showUltimateFeatures)
      // {
      // footerRow_text = footerRow_text + " | "+('lastdaysClickAvg')+"
      // ("+myAccount.ultimatePreferences.minigraphAvgInterval+") :
      // "+(referrals[z].minigraph.avgs[myAccount.ultimatePreferences.minigraphAvgInterval]).toFixed(3);
      // }

      footerRow_text = footerRow_text +
          " | " + ('Clicked Today') + " : " + todayClickers +
          " | " + ('Clicked Yesterday') + ": " + ydayClickers +
          " | " + ('Zero-Clickers') + " : " + zeroClickers +
          " | " + ('Others') + " : " + otherClickers +
          "</font>";


      var img_grayBackground = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFDxQUDrtfiZ8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAUElEQVQI10WMIQ6AQBADJ/0yFslfCY5wAsS2i7mAqZmZsqxba9wPAubEQeWgqkJxI8eoKig2cjLBn+3HgfqT20HdQS6jTmZGg5Ka8n8wrpMX+VxBlx4CdKwAAAAASUVORK5CYII=';


      _footerRow.childNodes[0].style.backgroundImage = "url('" + img_grayBackground + "')";
      _footerRow.childNodes[0].style.height = "25px";

      _footerRow.childNodes[0].innerHTML = footerRow_text;
    }



    widenRemainingRows();
    insertFooterData(footerRow);


  }

  processReferralRows();


  /**
   * Various functions in the page add/remove columns to the referral listings page and the script
   * must alter the width of the content div to keep it in the center of the page (It grows to the right otherwise)
   *
   * NOTE: Figures used for the widths of the columns are taken from a 1208x800px screen and are approximate
   */
  function widenPage()
  {
    var current_width = parseInt(document.body.children[1].style.width, 10);

    current_width += (false === script.preferences.showColumn['flag']) ? -20 : 0;
    current_width += (false === script.preferences.showColumn['referralName']) ? -100 : 0;
    current_width += (false === script.preferences.showColumn['referralSince']) ? -110 : 0;
    current_width += (false === script.preferences.showColumn['nextPayment']) ? -120 : 0;
    current_width += (false === script.preferences.showColumn['lastClick']) ? -80 : 0;
    current_width += (false === script.preferences.showColumn['totalClicks']) ? -60 : 0;
    current_width += (false === script.preferences.showColumn['average']) ? -60 : 0;

    current_width += (script.preferences.numeriseDates.referralSince && !script.preferences.referralSince_replace) ? 80 : 0;
    current_width += (script.preferences.numeriseDates.lastClick && !script.preferences.lastClick_replace) ? 5 : 0;
    current_width += (script.preferences.flag_textify) ? 15 : 0;
    current_width += (script.preferences.exactAverageShow && !script.preferences.exactAverageReplace) ? 20 : 0;

    if (100 >= refsPerPage && myAccountDetails.accountType.showUltimateFeatures)
    {
      current_width += (true === script.preferences.showColumn['clickText']) ? 88 : 0;
      current_width += (true === script.preferences.showColumn['average1']) ? 23 : 0;
      current_width += (true === script.preferences.showColumn['average2']) ? 23 : 0;
      current_width += (true === script.preferences.showColumn['SD']) ? 30 : 0;
      current_width += (true === script.preferences.showColumn['RSA']) ? 30 : 0;
    }

    current_width += (true === script.preferences.showColumn['profit']) ? 30 : 0;
    current_width = (902 > current_width) ? 902 : current_width;

    document.body.children[1].style.width = current_width + 'px';
  }

  widenPage();

}





// BEGIN Script Content::




/* Functions that are generic to every page and are not essential */

function insertAccountBalanceTransferHandlers()
{
  var accountBalanceNode = docEvaluate('//span[@id="t_saldo"]');

  if(0 < accountBalanceNode.snapshotLength)
  {
    accountBalanceNode = accountBalanceNode.snapshotItem(1);

    var accountBalance = parseFloat(accountBalanceNode.textContent.replace('$',''));
    var accountBalanceRounded = Math.floor(accountBalance*10)/10;

    //    GM_log('accountBalanceRounded = '+accountBalanceRounded);

    accountBalanceNode.addEventListener("click", function accountBalanceNode_onClick(){ transfer(); }, false);
    accountBalanceNode.style.cursor = 'pointer';


    function transfer()
    {
      var minTransfer = 0.10;

      var errorMessage = 'Error: Transfer Stopped!';
      var errorMessagePresent = false;


      var transferAmount = prompt('How much would you like to transfer? \n[NOTE: Multiples of $' + minTransfer.toFixed(2) + ' only]', accountBalanceRounded.toFixed(2));
      if (parseFloat(transferAmount) == transferAmount)
      {
        transferAmount = Math.floor(transferAmount * 10) / 10;
        // transferAmount = 0.1;

        if (!isNaN(transferAmount))
        {
          GM_log('(transferAmount != null) && !isNaN(transferAmount)');

          if (transferAmount >= minTransfer)
          {
            GM_xmlhttpRequest({
              method: 'GET',
              url: 'https://www.neobux.com/?u=c&s=rba&s1=1&s2=' + transferAmount,
              onload: function(responseDetails) { transferCallback(responseDetails, transferAmount, false); },
              onerror: function(responseDetails) { transferCallback(responseDetails, transferAmount, true); }
            });
            GM_log('Transfer in progress, Please wait..');
            alert('Transfer in progress, Please wait..');
          }
          else
          {
            errorMessagePresent = true;
            errorMessage += '\n * Minimum Transfer: $' + minTransfer.toFixed(2);
          }
        }
        else
        {
          if (isNaN(transferAmount))
          {
            errorMessagePresent = true;
            errorMessage += '\n * You must enter only a number';
          }
          else
          {
            errorMessagePresent = true;
            errorMessage += '\n * Unknown Error';
          }
        }
      } else
      {
        errorMessagePresent = true;
        errorMessage += '\n * Transfer cancelled';
      }

      if (errorMessagePresent)
      {
        GM_log(errorMessage);
        alert(errorMessage);
      }
    }

    function transferCallback(_responseDetails,_transferAmount,_internalError)
    {
      if(_internalError)
      {
        GM_log('transferCallback: Error during transfer - Transfer Stopped');
        alert('transferCallback: Error during transfer - Transfer Stopped');
      }
      else
      {
        GM_log('_responseDetails.status = ' + _responseDetails.status + '\n' +
            '_responseDetails.statusText = ' + _responseDetails.statusText + '\n' +
            '_responseDetails.responseHeaders = ' + _responseDetails.responseHeaders + '\n' +
            '_responseDetails.responseText = ' + _responseDetails.responseText);

        var successfulTransferText = "The transfer has been successfully completed.";
        var successfulTransferText_PT = "A transferência foi feita com sucesso.";
        var unsuccessfulTransferText = "You don't have sufficient funds to complete the transfer or an error occurred.";
        var unsuccessfulTransferText_PT = "Não tem fundos suficientes para completar a transacção ou ocorreu um erro.";

        var transferError = 'Neobux: The transfer was rejected by Neobux!';
        var transferRejected = false;

        if(0 < _responseDetails.responseText.indexOf(successfulTransferText))
        {
          GM_log('Transfer completed successfully');
          alert('Transfer completed successfully');
          //updateBalances(_transferAmount);
        }
        else if(0 < _responseDetails.responseText.indexOf(successfulTransferText_PT))
        {
          GM_log('Transfer completed successfully');
          alert('Transfer completed successfully');
          //updateBalances(_transferAmount);
        }
        else if(0 < _responseDetails.responseText.indexOf(unsuccessfulTransferText))
        {
          transferRejected = true;
          transferError += "\n * You don't have sufficient funds to complete the transfer or an error occurred.";
        }
        else if(0 < _responseDetails.responseText.indexOf(unsuccessfulTransferText_PT))
        {
          transferRejected = true;
          transferError += "\n * Não tem fundos suficientes para completar a transacção ou ocorreu um erro.";
        }
        else
        {
          GM_log('transferCallback: There was an unknown error during transfer.');
          alert('transferCallback: There was an unknown error during transfer.');
        }

        if(transferRejected)
        {
          GM_log(transferError);
          alert(transferError);
        }
      }
    }
  }
  else
  {
    GM_log('Error - cannot find your current account balance thus the script cannot run. Please report this immediately.');
    return;
  }

}

function insertLogoActions()
{

  var varSeperator = '__';

  function createInput(_inputType, _inputDefaultValue, _preferenceName, _inputTitle)
  {
    var inputSize = (_inputType=='text') ? 5 : '';
    var valueString = ('checkbox' == _inputType && _inputDefaultValue) ? 'checked' : 'value="' + _inputDefaultValue+'"';
    var disabledString = (null == _inputDefaultValue) ? 'disabled' : '';
    if ("object" !== typeof(_inputDefaultValue))
    {
      var newInputField = '<input type="' + _inputType + '" '+valueString+' '+disabledString+' size="' + inputSize + '" name="' + _preferenceName + '" id="' + _preferenceName + '" title="' + _inputTitle + '" />';
      return newInputField;
    }
    else
    {
      var newInputField = new Array();
      for (var tmp in _inputDefaultValue)
      {
        newInputField.push( '<input type="' + _inputType + '" value="' + _inputDefaultValue[tmp] + '" '+disabledString+' size="' + inputSize + '" name="' + _preferenceName + '__' + tmp + '" id="' + _preferenceName + '__' + tmp + '" title="' + _inputTitle + '" />');
      }

      return newInputField.join('\n');
    }
  }

  function addCheckbox(_inputType, _referralName, _prefVar, _defaultValue, _inputTitle)
  {
    var tmp = _referralName + varSeperator + _prefVar;
    var inputIsChecked = (true === _defaultValue ? "checked" : "");
    var inputIsDisabled = (null === _defaultValue ? "disabled" : "");

    var varToReturn = '';
    varToReturn += '<td>';
    varToReturn += '<input type="' + _inputType + '" id="' + tmp + '"  name="' + tmp + '" ' +
        inputIsChecked + ' ' + inputIsDisabled +
        ' title="' + _inputTitle + '" />';
    varToReturn += '</td>';

    return varToReturn;
  }
  
  var scriptPreferencesDiv = document.createElement('div');
  scriptPreferencesDiv.id = "scriptPreferences";
  scriptPreferencesDiv.setAttribute('class',"overlay");

  var scriptPrefs_innerHTML = '';

  scriptPrefs_innerHTML += '<!-- tabs -->' +
      '<ul class="css-tabs">' +
      '<li><a class="current" href="#settingsTab_myAccount">Mi Cuenta</a></li>' +
      '<li><a href="#settingsTab_refListings">Lista de Referidos</a></li>' +
      '<li><a href="#settingsTab_otherMisc">Otras Categorias</a></li>' +
      '<li><a href="#settingsTab_about">Sobre</a></li>' +
      '</ul>';

  scriptPrefs_innerHTML += ''+
      '<!-- panes -->' +
      '<div class="css-panes">';


  /* My Account */
  /* Referral Statistics */

  scriptPrefs_innerHTML += ''+
      '<div style="display: block;" id="settingsTab_myAccount" class="tabPane">' +
      '<div id="myAccountAccordion" class="accordion">' +
      '<h2 class="current">Informacion Cuenta</h2>' +
      '<div class="accordionPane">' +
      '<p>Esta ficha muestra lo que el Script ha detectado sobre su cuenta de Neobux.</p>' +
      [ 'Usuario: '+myAccountDetails.username,
        'Tipo de Cuenta: '+myAccountDetails.accountType.verbose,
        'Cantidad que se gasta en la membria Golden: '+((myAccountDetails.accountType>0) ? '$'+ 90 : 'N/A'),
        'El costo de la actualización directamente de Golden a su paquete actual de Golden: '+((myAccountDetails.accountType>1) ? '$'+myAccountDetails.goldenPackCost : 'N/A'),
        ' ',
        'Numero de referidos Rentados: '+myAccountDetails.numberOfRefs.Rented,
        'Numero de referidos Directos: '+myAccountDetails.numberOfRefs.Direct,
        ' ',
        'Autopay limite: '+myAccountDetails.autopayLimit+'days',
        'Autopay Activado: '+'<i>Unknown</i>',
        //'El costo de cada pago autopay: '+myAccountDetails.autopayCost,
        ' ',
        'El costo del reciclaje de 1 referido: $'+myAccountDetails.recycleCost,
        ' ',
        'El costo de la renovación de 1 referido: ',
        '- 15days: $'+myAccountDetails.renewalFees[15] + ' <small>= $' + (myAccountDetails.renewalFees[15] / 15).toFixed(5) + ' per day</small>',
        '- 30days: $'+myAccountDetails.renewalFees[30] + ' <small>= $' + (myAccountDetails.renewalFees[30] / 30).toFixed(5) + ' per day</small>',
        '- 60days: $'+myAccountDetails.renewalFees[60] + ' <small>= $' + (myAccountDetails.renewalFees[60] / 60).toFixed(5) + ' per day</small>',
        '- 90days: $'+myAccountDetails.renewalFees[90] + ' <small>= $' + (myAccountDetails.renewalFees[90] / 90).toFixed(5) + ' per day</small>',
        '- 150days: $'+myAccountDetails.renewalFees[150] + ' <small>= $' + (myAccountDetails.renewalFees[150] / 150).toFixed(5) + ' per day</small>',
        '- 240days: $'+myAccountDetails.renewalFees[240] + ' <small>= $' + (myAccountDetails.renewalFees[240] / 240).toFixed(5) + ' per day</small>',
        ' ',
        ''].join('<br>') +

      '</div>' +
      '<h2 class="current">Ajuste de Cuenta</h2>' +
      '<div class="accordionPane">' +
      '<p>Estos ajustes están relacionados con cómo usted elige para administrar su cuenta.</p>' +
       [ ' ' ,
           'Por cuanto tiempo renuevas tus referidos: '+createInput('text',script.preferences.renewalPeriod,'renewalPeriod','Cuántos días por lo general, renuevas sus referidos de - [15|30|60 (same as autopay)|90|150|240] days]')+' dias',
           ' ',
        ''].join('<br>') +
      '</div>' +
      '</div>' +
      '</div>' +
      '';

  /* Referral Listings tab */
  scriptPrefs_innerHTML += '' +
      '<div style="display: none;" id="settingsTab_refListings" class="tabPane">' +
      '<div id="refListingAccordion" class="accordion">' +


      '<h2 class="current">Configuración de columnas</h2>' +
      '<div class="accordionPane">' +


      '<span class="refListingsSettingsGrid">' +

      '<table>' +
      '<thead>' +
      '<tr>' +
      '<td class="leftmost" style="!important; width:100px;">Columna</td>' +
      '<td>Prefijo</td>' +
      '<td>Encoger</td>' +
      '<td>Mostrar</td>' +
      '<td>Numerico</td>' +
      '<td>Tiempo</td>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';

  for(var _columnPrefixes in defaultSettings.columnPrefixes)
  {
    scriptPrefs_innerHTML += ''+
        '<tr>' +
        '<td class="leftmost">'+_columnPrefixes+'</td>' +
        '<td>'+createInput('text',script.preferences.columnPrefix[_columnPrefixes],_columnPrefixes+varSeperator+'columnPrefix','Prefijo para el nombre de la columna')+'</td>' +
        '<td>'+createInput('checkbox',script.preferences.shrinkContents[_columnPrefixes],_columnPrefixes+varSeperator+'shrinkContents','Reducir el contenido de los referidos de la columna?')+'</td>' +
        '<td>'+createInput('checkbox',script.preferences.showColumn[_columnPrefixes],_columnPrefixes+varSeperator+'showColumn','Mostrar el contenido de los referidos de la columna?')+'</td>' +
        '';

    var idName = '';
    var title = '';
    switch(_columnPrefixes)
    {
      case 'referralSince':
        idName = 'referralSince';
        title = 'Numerar la fecha?';
        break;
      case 'lastClick':
        idName = 'lastClick';
        title = 'Numerar el ultimo click?';
        break;
      default:
        idName = null;
        title = null;
        break;
    }

    scriptPrefs_innerHTML += addCheckbox('checkbox',
        _columnPrefixes,
        'numeriseDates',
        script.preferences['numeriseDates'][_columnPrefixes],
        title);

    scriptPrefs_innerHTML += addCheckbox('checkbox',
        _columnPrefixes,
        'shortFormatTimer',
        script.preferences['shortFormatTimer'][_columnPrefixes],
        title);

    scriptPrefs_innerHTML += ''+
        '</tr>';
  }



  scriptPrefs_innerHTML += ''+
      '<tbody>' +
      '</table>'+

      '</span>' +
      '</div>' +




      '<h2>Otros/Varios</h2>' +
      '<div class="accordionPane">' +
      '<p>Estos valores son otros entornos diversos que no se aplican a todas las columnas.</p>' +
      [ ' ',
          t_bold('Bandera: ') ,
          'En caso de Obtener la bandera "textified"? : '+createInput('text',script.preferences.renewalPeriod,'renewalPeriod','Deberia haber un text-version de las banderas de la bandera se inserta junto a la bandera? '+t_small('[W=Blanco; R=Rojo; O=Naranja; Y=Amarillo; G=Verde; B=Azul]')),
          ' ',
          t_bold('Ultimo click Columna: ') ,
          'Replace nil clicks: '+createInput('checkbox',script.preferences.lastClick_replaceNilClicks,'lastClick_replaceNilClicks','caso de que el "No Click Yet" mensaje se sustituye por el número 0?'),
          ' ',
          t_bold('Ganancia Columna: ') ,
          'Incluya tasa de reciclaje en rentabilidad: '+createInput('checkbox',script.preferences.profit_includeRecycleCost,'profit_includeRecycleCost','Si el valor de los beneficios incluyen a -$0.07 tasa por el reciclaje, de lo contrario debe ignorarlo.'),
          ' ',
      ''].join('<br>') +

      '</div>' +

      '</div>' +
      '</div>';

  /* Other / misc */
  scriptPrefs_innerHTML += ''+
      '<div style="display: block;" id="settingsTab_otherMisc" class="tabPane">' +
      '<div id="otherMiscAccordion" class="accordion">' +
      '<h2 class="current">Ajuste General</h2>' +
      '<div class="accordionPane">' +
      '<p>Esta pestaña muestra la configuración general, no específica a ninguna otra categoría.</p>' +
      [ ' ',
        t_bold('Local / Server time:'),
        'Show the local/server time clock & guide? :' + createInput('checkbox',script.preferences.localServerTimeClock_show,'localServerTimeClock_show','Should the local/server time guide show, and should the clicking guihe show when you click on the local / server time message?'),
        ' ',
        ''].join('<br>') +

      '</div>' +
      '<h2 class="current">Configuracion Scipts</h2>' +
      '<div class="accordionPane">' +
      '<p>Esta ficha muestra los ajustes para el script.</p>' +
      [ ' ',
        t_bold('Actualización del control:'),
//        'Should the script check for updates? :' + createInput('checkbox',script.preferences.localServerTimeClock_show,'localServerTimeClock_show','Should the local/server time guide show, and should the clicking guihe show when you click on the local / server time message?'),
        'Con qué frecuencia debería revisar la secuencia de comandos para las actualizaciones: ' + createInput('text',script.preferences.updateFrequency,'updateFrequency','Defecto: 120 minutos') + ' minutos',
        ' ',
        t_bold('Prueba Alpha:'),
        'Probar Alpha?: ' + createInput('checkbox',script.preferences.alphaTester,'alphaTester','No Activarlo o sera ingles!!'),
        ' ',
        t_bold('Lenguaje Scripts:'),
        'Lenguaje Scripts: ' + createInput('text',script.preferences.scriptLanguage,'scriptLanguage','Cuando las traducciones están disponibles, ingrese el código de idioma para el idioma que prefiera. Por defecto: EN'),
        ' ',
        ''].join('<br>') +

      '</div>' +
      '</div>' +
      '</div>' +
      '';

  /* About tab */
  scriptPrefs_innerHTML += ''+
      '<div style="display: none;" id="settingsTab_about" class="tabPane">' +
'<p><strong>Sobre el Scripts:</strong></p>' +
      '<p>Este script está diseñado para poner un montón de información disponible a su alcance para ayudar a que la gestión de su cuenta en Neobux una tarea mucho más simple =].<br>' +
      '<br>' +
      'El guión está pasando por un refactorizar / reescribir lo que no todas las características han sido re-implementado completamente todavía. Revise de nuevo si - los cambios se están produciendo con bastante regularidad y la secuencia de comandos de actualización no siempre las capturas. <br>' +
      '<br>' +
      '</p>' +

      '<p><strong>Quiero decir gracias?</strong></p>' +
      '<p>Siempre es bueno saber de gente que le gusta el trabajo que hago - sólo hacia <a href="http://www.neobux.com/forum/?frmid=7&amp;tpcid=78359">the Neobux forums</a> y un simple "quiero tener a sus bebés!" o "tú eres mi super estrella!" debería ser suficiente, pero un puesto generosa simplemente decir "gracias" siempre serán bienvenidos también =]<br>' +
      '<br>' +
      'Por cierto, si está seguro de que algo no está bien y ya ha comprobado que no es el Monstruo de Espagueti Volador jugando una mala pasada que, <a href="http://www.neobux.com/forum/?frmid=7&amp;tpcid=78359">the Neobux forums</a> debe ser su primer punto de contacto para las solicitudes de características y quejas. </p>' +
      '<br>' +

      '<p><strong>Otro scrips por Aldione</strong></p>'+
      '<p>Si te gusta este script, eche un vistazo a mis otros scripts en <a href="http://userscripts.org/users/211885/scripts">userscripts.org</a><br>No todos ellos son tan útiles como el guión y por lo general la descripción es lo suficientemente bueno para averiguar lo que hace, pero cualquier pregunta se puede enviar al mismo lugar que el anterior.</p>'+
      'No todos ellos son tan útiles como el guión y por lo general la descripción es lo suficientemente bueno para averiguar lo que hace, pero las preguntas se pueden enviar al mismo lugar que el anterior.' +
      '</p>' +
      '</div>';

  /* END div.css-panes */
  scriptPrefs_innerHTML += ''+
      '</div>';


  scriptPreferencesDiv.innerHTML = scriptPrefs_innerHTML;

  // perform JavaScript after the document is scriptable.
  $(function () {
    // setup ul.tabs to work as tabs for each div directly under div.tabPane's
    $("ul.css-tabs").tabs("div.css-panes > div.tabPane");

    $("div.accordion").tabs("div.accordionPane", {tabs: 'h2', effect: 'slide'});
  });





  var cssStyle_scriptPreferences = ''+
      '#scriptPreferences {' +
      '  background-image:url("http://static.flowplayer.org/tools/img/overlay/white.png");' +
      '  display:none;' +
      '  font-size:11px;' +
      '  margin:0 auto;' +
      '  padding:35px;' +
      '  width:640px;' +
      '}' +

      '#scriptPreferences .close {' +
      '  background-image:url("http://static.flowplayer.org/tools/img/overlay/close.png");' +
      '  cursor:pointer;' +
      '  height:35px;' +
      '  position:absolute;' +
      '  right:5px;' +
      '  top:5px;' +
      '  width:35px;' +
      '}'+

      '  /* root element for tabs  */' +
      '  ul.css-tabs {' +
      '    margin:0 !important;' +
      '    padding:0;' +
      '    height:30px;' +
      '    border-bottom:1px solid #666;' +
      '  }' +

      '  /* single tab */' +
      '  ul.css-tabs li {' +
      '    float:left;' +
      '    padding:0;' +
      '    margin:0;' +
      '    list-style-type:none;' +
      '  }' +

      '  /* link inside the tab. uses a background image */' +
      '  ul.css-tabs a {' +
      '    float:left;' +
      '    font-size:13px;' +
      '    display:block;' +
      '    padding:5px 30px;' +
      '    text-decoration:none;' +
      '    border:1px solid #666;' +
      '    border-bottom:0px;' +
      '    height:18px;' +
      '    background-color:#efefef;' +
      '    color:#777;' +
      '    margin-right:2px;' +
      '    position:relative;' +
      '    top:1px;' +
      '    outline:0;' +
      '    -moz-border-radius:4px 4px 0 0;' +
      '  }' +

      '  ul.css-tabs a:hover {' +
      '    background-color:#F7F7F7;' +
      '    color:#333;' +
      '  }' +

      '  /* selected tab */' +
      '  ul.css-tabs a.current {' +
      '    background-color:#ddd;' +
      '    border-bottom:1px solid #ddd;' +
      '    color:#000;' +
      '    cursor:default;' +
      '  }' +


      '  /* tab pane */' +
      '  .css-panes div.tabPane {' +
      '    display:none;' +
      '    border:1px solid #666;' +
      '    border-width:0 1px 1px 1px;' +
      '    min-height:150px;' +
      '    padding:15px 20px;' +
      '    background-color:#ddd;' +
      '    max-height:440px;' +
      '    overflow:auto;' +
      '  }' +

      '  /* root element for accordion. decorated with rounded borders and gradient background image */' +
      '  .accordion {' +
    //'    background:#333 url("http://flowplayer.org/img/global/gradient/h300.png") 0 0;' +
      '    width: 100%;' +
      '    border:1px solid #333;' +
      '    background-color:#666;' +
      '  }' +
      '  ' +
      '  /* accordion header */' +
      '  .accordion h2 {' +
      '    background:#ccc url("http://flowplayer.org/img/global/gradient/h30.png");' +
      '    margin:0;' +
      '    padding:5px 15px;' +
      '    font-size:14px;' +
      '    font-weight:normal;' +
      '    border:1px solid #fff;' +
      '    border-bottom:1px solid #ddd;' +
      '    cursor:pointer;' +
      '  }' +
      '  ' +
      '  /* currently active header */' +
      '  .accordion h2.current {' +
      '    cursor:default;' +
      '    background-color:#fff;' +
      '  }' +
      '  ' +
      '  /* accordion pane */' +
      '  .accordion .accordionPane {' +
      '    border:1px solid #fff;' +
      '    border-width:0 2px;' +
      '    display:none;' +
      '    padding:15px;' +
      '    color:#fff;' +
      '    font-size:12px;' +
      '    height:350px;' +
      '    overflow:auto;' +
      '  }' +
      '  ' +
      '  /* a title inside pane */' +
      '  .accordion .accordionPane h3 {' +
      '    font-weight:normal;' +
      '    margin:0 0 -5px 0;' +
      '    font-size:16px;' +
      '    color:#999;' +
      '  }' +


      '  span.refListingsSettingsGrid table {' +
      '    border: 1px solid black;' +
      '    border-collapse:collapse;' +
      '    white-space:nowrap;' +
      '  }'+

      '  span.refListingsSettingsGrid table thead {' +
      '    font-variant: small-caps;' +
      '    font-weight: bold;' +
      '  }'+

      '  span.refListingsSettingsGrid table, span.refListingsSettingsGrid td {' +
      '    border: 1px solid black;' +
      '    margin:2px;' +
      '    padding:3px 7px;' +
      '    text-align:center;' +
      '  }'+

      '  span.refListingsSettingsGrid td.leftmost {' +
      '    text-align:left;' +
      '  }' +


      '';


  GM_addStyle(cssStyle_scriptPreferences);
  try{
  document.body.appendChild(scriptPreferencesDiv);
  }catch(e){console.info(e);}

      function saveValue(_referralName,_varName, _value)
      {
        console.group();
        logger(arguments);
        logger([_varName,_referralName]);
        logger(typeof _referralName);
        logger(GM_getValue(_referralName));
        logger(script.preferences[_referralName][_varName]);

        script.preferences[_referralName][_varName] = _value;

        manipulatePrefs.setPref(_referralName,JSON.stringify(script.preferences[_referralName]));

        logger(script.preferences[_referralName][_varName]);
        logger(GM_getValue(_referralName));

        //      logger(GM_getValue([_varName,_referralName].join('_')));
        console.groupEnd();
      }

  function saveValue2(_pref,_value){
    console.info('saveValue2() ::');
    console.info(arguments);
    manipulatePrefs.setPref(_pref,_value);
  }
  $('#scriptPreferences input').change(function scriptPreferences_inputFields_onChange(event)
  {
    console.info("$('#scriptPreferences input').change()");
    console.info(event);
    console.info("event.target.id.split('__').length");
    console.info(event.target.id.split('__').length);
    if(event.target.id.split('__').length>1)
    {
      var _varName = event.target.id.split('__')[0];
      var _referralName = event.target.id.split('__')[1];

      var value;

      switch (event.target.type)
      {
        case 'checkbox':
          value = event.target.checked;
          break;

        default:
          value = event.target.value;
          break;
      }

      saveValue(_referralName,_varName, value);
    }
    else {
      var pref = event.target.id;

      var value;

      switch (event.target.type)
      {
        case 'checkbox':
          value = event.target.checked;
          break;

        default:
          value = event.target.value;
          break;
      }
      saveValue2(pref,value);
    }
  });
}

function insertLogo()
{
  // Inserts the logo for the script into the page
  // Clicking on logo will open the options to modify the script's options

  // the language icon in upper right of page
  var xpathResults_logoLocation = docEvaluate("//td[@id='bandidioma']");

  if (1 == xpathResults_logoLocation.snapshotLength)
  {

    var logoImage = document.createElement('img');
    logoImage.id = 'neobux2Logo';
    logoImage.setAttribute('rel', '#scriptPreferences');

    logoImage.style.cursor = 'pointer';
    logoImage.border = "0";
    logoImage.width = '16';
    logoImage.alt = 'Neobux SP 1+ (Aldione)';
    logoImage.title = 'Neobux SP 1+ (Aldione)';
    logoImage.src = 'http://img262.imageshack.us/img262/3654/neobuxv3logolargered2.png';
    // img.src = 'http://img262.imageshack.us/img262/4965/neobuxv3logolargered3.png';


    $(function () {
      try {
        $("#neobux2Logo").overlay({mask: '#000', effect: 'apple', closeOnClick: false, fixed: false});
      } catch(e)
      {
        logger('Error:\n\n'+e);
      }
    });

    // Container for logo image to allow it to look correct in the page
    var td = document.createElement('td');
    td.style.paddingLeft = '8px';
    td.style.paddingRight = '8px';
    td.innerHTML = ' &nbsp;|&nbsp; &nbsp;';
    td.appendChild(logoImage);

    xpathResults_logoLocation.snapshotItem(0).parentNode.appendChild(td);

  }
}

function insertLocalServerTime()
{

  function formatTime(_time)
  {
    logger(_time);
    var _Hours = _time.getHours();
    var _Minutes = _time.getMinutes();
    var _Seconds = _time.getSeconds();

    return padZeros(_Hours,2) + ':' + padZeros(_Minutes,2); //+ ":" + padZeros(_Seconds,2);
  }

  var localMidnight;
  var currentLocalTime;
  var currentServerTime;
  var neoMidnight;
  var adResetTime;
  var adResetTime;

  // Calculate and return the server time formatted correctly
  function GetServerTime(_serverTimeOffset)
  {
    var offsetMS = _serverTimeOffset * 1000 * 60 * 60;

    currentLocalTime = new Date(Today);
    currentServerTime = new Date(new Date(Today).getTime() + offsetMS);


    localMidnight = new Date(Today);
    localMidnight.setHours(0);
    localMidnight.setMinutes(0);
    localMidnight.setSeconds(0);

    manipulatePrefs.setPref('localMidnight', localMidnight.toString());
    //    logger('Local Midnight = '+padZeros(localMidnight.getHours(),2)+':'+padZeros(localMidnight.getMinutes(),2));

    neoMidnight = new Date(new Date(localMidnight).getTime() - offsetMS);
    neoMidnight = new Date(neoMidnight.setDate(localMidnight.getDate()));
    
    manipulatePrefs.setPref('neoMidnight', neoMidnight.toString());
    //    logger('Server Midnight = '+padZeros(neoMidnight.getHours(),2)+':'+padZeros(neoMidnight.getMinutes(),2));

    var AdResetTime_hours = manipulatePrefs.getPref('AdResetTime_hours',0) * 1000 * 60 * 60;
    adResetTime = new Date(new Date(localMidnight).getTime() + AdResetTime_hours);

    adResetTime = new Date(adResetTime.setDate(localMidnight.getDate()));

    manipulatePrefs.setPref('adResetTime', adResetTime.toString());
    //    logger('Ad Reset Time = '+padZeros(adResetTime.getHours(),2)+':'+padZeros(adResetTime.getMinutes(),2));

//    logger(localMidnight);
//    logger(neoMidnight);
//    logger(adResetTime);


    var timeDiff_text = '';
    if (0 < _serverTimeOffset)
    {
      timeDiff_text = '+' + parseFloat(_serverTimeOffset.toFixed(2));
    }
    else if (0 > _serverTimeOffset)
    {
      timeDiff_text = parseFloat(_serverTimeOffset.toFixed(2));
    }
    else
    {
      timeDiff_text = '+-' + _serverTimeOffset;
    }

    // Return the time in the format HH:MM(:SS optional)

    return formatTime(currentServerTime) + ' (' + timeDiff_text + 'hrs)';

  }


  // Calculate and return the size of the time difference/offset
  function FetchAndSetTimeOffset()
  {
    // Hunt for the current server time string
    var locationOfTimeString = docEvaluate('//td[@class="f_r"]/span');

    if(2 == locationOfTimeString.snapshotLength)
    {
      // var dateTimeString = '2009/06/07 20:46';
      var dateTimeString = locationOfTimeString.snapshotItem(1).textContent;

      // Grab only the necessary info (assuming format yyyy/mm/dd hh:dd )
      dateTimeString = dateTimeString.match(/([\d]{4})\/([\d]{2})\/([\d]{2})\ ([\d]{2})\:([\d]{2})/);


      //    Really want integer, but parseInt("08") == 0 so using parseFloat instead
      //    UPDATE: now taking advantage of the implicit type conversion caused by * 1 and using parseInt()
      var ST = {
        year: parseInt(dateTimeString[1] * 1, 10),
        month: parseInt(dateTimeString[2] * 1, 10),
        day: parseInt(dateTimeString[3] * 1, 10),

        hour: parseInt(dateTimeString[4] * 1, 10),
        minute: parseInt(dateTimeString[5] * 1, 10)
      };

      //      logger(ST);

      var ServerDateTime = new Date(Today);
      ServerDateTime.setFullYear(ST.year, (ST.month - 1), ST.day);
      ServerDateTime.setHours(ST.hour, ST.minute);

      var ServerTime = ServerDateTime.getTime();
      var LocalTime = Today.getTime();
      var one_hour = 1000 * 60 * 60;

      var serverTimeDifference = (ServerTime - LocalTime) / (one_hour);
      serverTimeDifference = Math.floor(serverTimeDifference * 1000) / 1000;

      manipulatePrefs.setPref('serverTimeOffset', serverTimeDifference);




      var adResetTimeString = locationOfTimeString.snapshotItem(0).textContent;
      adResetTimeString = adResetTimeString.match(/([\d]{2})\:([\d]{2})/);

      var ART = {
        hour: parseInt(adResetTimeString[1] * 1, 10),
        minute: parseInt(adResetTimeString[2] * 1, 10)
      };

      //      logger(ART);

      var AdResetTimeDifference = (ART.hour + (ART.minute / 60));
      manipulatePrefs.setPref('AdResetTime_hours', AdResetTimeDifference);



    }
  }


  // Check whether the page being loaded is the 'View Advertisements' page
  // If it is, call GetServerTimeOffset() to calculate & store the offset amount [if autodetecting the offset is enabled]
  function GetServerTimeOffset()
  {
    // Check whether current page is the "View Advertisements" page
    var CurrentUrl = document.location.href;
    var RegExp_AdPage = /^http[s]?:\/\/www\.neobux\.com\/\?u\=v/;
    var IsMatch = RegExp_AdPage.test(CurrentUrl);

    // If it is the ads page AND the script should automatically detect the offset,
    if (IsMatch && manipulatePrefs.getPref("AutoDetectTimeOffset", true)) {
      FetchAndSetTimeOffset();
    }

    var serverTimeOffset = parseFloat(manipulatePrefs.getPref('serverTimeOffset',0));

    //    GM_log('serverTimeOffset = ' + serverTimeOffset);
    manipulatePrefs.setPref('serverTimeOffset', String(serverTimeOffset));


    return serverTimeOffset;

  }




  // TODO: simplify *VERY* ugly xpath, whilst maintaining robustness..
  // Cannot search for td that only has &nbsp; as it's contents
  // Cannot search for td@align=left because returns multiple results
  // NOTE:: Avoiding any search term / method that returns multiple results or that depends on a value that is likely to change

  var xpath = "//div[@style='width: 902px; margin: 0pt auto;']/descendant::td[contains(.,'$')]/ancestor::tr/child::td[@align='left']";
  var xpathResults_timeLocation = docEvaluate(xpath);

  var localTime = formatTime(Today);
  var serverTime = (!!GetServerTimeOffset()) ? GetServerTime(GetServerTimeOffset()) : 'You must "View Advertisements" for this to show correctly.';

  GM_log('Local: ' + localTime + ' Server: ' + serverTime);


  xpathResults_timeLocation.snapshotItem(0).innerHTML = '<div style="font-family:mono,monospace; font-size:x-small; margin-bottom:-15px; padding-top:0.7em;">&nbsp; Hora Local: ' + localTime + '  --  Hora Servidor: ' + serverTime + '</div>' + xpathResults_timeLocation.snapshotItem(0).innerHTML;

  xpathResults_timeLocation.snapshotItem(0).setAttribute('valign', '');



  function addClock(_timeOffset,_adResetOffset)
  {
    var containerDiv_timer = document.createElement('div');

    containerDiv_timer.innerHTML = '<div style="width: 750px; height: 450px; display:none; position:absolute; top:100px; left:100px;" id="containerDiv_timer"></div>';

    if(document.getElementById('containerDiv_timer')) {
      document.getElementById('containerDiv_timer').innerHTML = containerDiv_timer.innerHTML;
    } else {
      document.body.appendChild(containerDiv_timer);
    }




    //    logger('Local Midnight = '+padZeros(localMidnight.getHours(),2)+':'+padZeros(localMidnight.getMinutes(),2));
    //    logger('Server Midnight = '+padZeros(neoMidnight.getHours(),2)+':'+padZeros(neoMidnight.getMinutes(),2));
    //    logger('Ad Reset Time = '+padZeros(adResetTime.getHours(),2)+':'+padZeros(adResetTime.getMinutes(),2));
    //
    //    logger((localMidnight));
    //    logger((neoMidnight));
    //    logger((adResetTime));


    var localMidnightToAdResetTime = (adResetTime - localMidnight) / (1000 * 60 * 60);
    var localMidnightToNeobuxMidnight = (neoMidnight - localMidnight) / (1000 * 60 * 60);


    //    logger(localMidnightToAdResetTime);
    //    logger(localMidnightToNeobuxMidnight);


    var _timePeriods = [];

    if(localMidnightToAdResetTime < localMidnightToNeobuxMidnight)
    {
      //      logger('localMidnightToAdResetTime < localMidnightToNeobuxMidnight');
      var localMidnightToFirst = localMidnightToAdResetTime;
      var FirstToSecond = localMidnightToNeobuxMidnight - localMidnightToAdResetTime;
      var SecondToLocalMidnight = 24 - (localMidnightToFirst + FirstToSecond);

      var FirstTP = 'Local Midnight to Ad Reset Time';
      var SecondTP = 'Ad Reset Time to Neobux Midnight';
      var ThirdTP = 'Neobux Midnight to Local Midnight';

      _timePeriods.push({
        name: FirstTP,
        y: localMidnightToFirst,
        color: '#AA4643'
      });
      _timePeriods.push({
        name: SecondTP,
        y: FirstToSecond,
        color: '#4572A7'
      });
      _timePeriods.push({
        name: ThirdTP,
        y: SecondToLocalMidnight,
        color: '#AA4643'
      });
    }
    else if(localMidnightToAdResetTime > localMidnightToNeobuxMidnight)
    {
      logger('localMidnightToAdResetTime > localMidnightToNeobuxMidnight');
      var localMidnightToFirst = localMidnightToNeobuxMidnight;
      var FirstToSecond = localMidnightToAdResetTime - localMidnightToNeobuxMidnight;
      var SecondToLocalMidnight = 24 - (localMidnightToFirst + FirstToSecond);

      var FirstTP = 'Local Midnight to Neobux Midnight';
      var SecondTP = 'Neobux Midnight to Ad Reset Time';
      var ThirdTP = 'Ad Reset Time to Local Midnight';

      _timePeriods.push({
        name: FirstTP,
        y: localMidnightToFirst,
        color: '#AA4643'
      });
      _timePeriods.push({
        name: SecondTP,
        y: FirstToSecond,
        color: '#4572A7'
      });
      _timePeriods.push({
        name: ThirdTP,
        y: SecondToLocalMidnight,
        color: '#AA4643'
      });
    }
    else if(localMidnightToAdResetTime == localMidnightToNeobuxMidnight)
    {
//      logger('localMidnightToAdResetTime == localMidnightToNeobuxMidnight');
      var localMidnightToFirst = localMidnightToAdResetTime;
      var FirstToSecond = 24 - (localMidnightToFirst);

      var FirstTP = 'Local Midnight to Neobux Midnight And Ad Reset Time';
      var SecondTP = 'Neobux Midnight And Ad Reset Time to Local Midnight';

      _timePeriods.push({
        name: FirstTP,
        y: localMidnightToFirst,
        color: '#AA4643'
      });
      _timePeriods.push({
        name: SecondTP,
        y: FirstToSecond,
        color: '#4572A7'
      });
    }

    // Transfer script variables to the window
    location.href = "javascript:void(window._timePeriods = new Array())";
    for(var i = 0; i < _timePeriods.length; i++) {
      location.href = "javascript:void(window._timePeriods["+i+"] = JSON.parse('"+JSON.stringify(_timePeriods[i])+"'))";
    }
    location.href = "javascript:void(window.adResetTime = new Date('"+adResetTime.toString()+"'))";
    location.href = "javascript:void(window.neoMidnight = new Date('"+neoMidnight.toString()+"'))";
    location.href = "javascript:void(window.localMidnight = new Date('"+localMidnight.toString()+"'))";

    //    logger(_timePeriods);

    location.href = "javascript:(" + function () {

      if('undefined' !== typeof Highcharts){
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'containerDiv_timer',
            margin: [20,20,80,20],
            backgroundColor: '#eeeeee'
          },
          title: {
            text: ''
          },
          plotArea: {
            shadow: null,
            borderWidth: null,
            backgroundColor: null
          },
          tooltip: {
            formatter: function () {
              function padZeros(_input,_desiredStringLength)
              {
                var currentLength = _input.toString().length;
                var output = _input;
                for(var i=0; i < (_desiredStringLength - currentLength); i++) {
                  output = '0' + output;
                }
                return output;
              }
              var _from = padZeros(localMidnight.getHours(),2)+':'+padZeros(localMidnight.getMinutes(),2);
              localMidnight = new Date(localMidnight.setHours(localMidnight.getHours() + Math.floor(this.y),localMidnight.getMinutes() + ((this.y - Math.floor(this.y))*60) ));
              var _to = padZeros(localMidnight.getHours(),2) + ':' + padZeros(localMidnight.getMinutes(),2);

              return '<b>'+ this.point.name +'</b>: ' + (Math.floor(this.y*100) / 100) + 'hours == From: '+_from+' To: '+_to;
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  function padZeros(_input,_desiredStringLength)
                  {
                    var currentLength = _input.toString().length;
                    var output = _input;
                    for(var i=0; i < (_desiredStringLength - currentLength); i++) {
                      output = '0' + output;
                    }
                    return output;
                  }
                  if(0 === this.x){localMidnight.setHours(0,0,0);}
                  var _from = padZeros(localMidnight.getHours(),2)+':'+padZeros(localMidnight.getMinutes(),2);
                  localMidnight = new Date(localMidnight.setHours(localMidnight.getHours() + Math.floor(this.y),localMidnight.getMinutes() + ((this.y - Math.floor(this.y))*60) ));
                  var _to = padZeros(localMidnight.getHours(),2) + ':' + padZeros(localMidnight.getMinutes(),2);

                  return _from+'-'+_to;
                }
              }
            }
          },
          legend: {
            layout: 'vertical'
          },
          series: [{
            type: 'pie',
            name: 'Time periods',
            data: _timePeriods
          }]
        });

      }
      else
      {
        logger("Cannot show the clicking guide graph because graphs are unavailable on this page. Try the account summary page or referral statistics page.");
      }



    } + ")()";

  }

  addClock(GetServerTimeOffset(),manipulatePrefs.getPref('AdResetTime_hours',0));


  xpathResults_timeLocation.snapshotItem(0).lastChild.addEventListener('click',function localServerTime_onClick(){
    document.getElementById('containerDiv_timer').style.display = ('none' == document.getElementById('containerDiv_timer').style.display) ? '' : 'none' ;
  },false)
}

insertAccountBalanceTransferHandlers();
insertLogo();
try{
insertLogoActions();
}catch(e){
  console.info('insertLogoActions() Error! \n\n'+e);
}


if(script.preferences.localServerTimeClock_show) {
  insertLocalServerTime();
}




var currentTimeMs = new Date().getTime().toString();
var timeSinceLastCheck = currentTimeMs - GM_getValue('lastUpdateCheck',0);

var UPDATER = {};

UPDATER.newVersionActions = function UPDATER_newVersionActions(_newHeaders)
{
  /*Alert the user to the result of the update check*/

  if(manipulatePrefs.getPref('updateAvailable',false) || true)
  {
    var updateMsg ='New version available for your '+_newHeaders.name+'!\n' +
        '\n'+
        'Script name: '+_newHeaders.name+'\n'+
        'Version available: '+_newHeaders.version+'\n'+
        '\n'+
        'Update Note:\n'+
        _newHeaders.updateNote+'\n'+
        _newHeaders.updateNoteMin+'\n'+
        '\n'+
        'Do you want to install this update?';

    var msToWait = UPDATER.updateFrequency;
    msToWait = (0 > msToWait) ? 0 : msToWait;
    var secsToWait = Math.floor(msToWait / 1000) % 60;
    var minsToWait = Math.floor((msToWait / 1000) / 60) % 60;
    var hoursToWait = Math.floor(((msToWait / 1000) / 60) / 60);


    var denyUpdateMessage = 'Script not updated. \nYou will be reminded again in' +
        hoursToWait + 'hours, ' +
        minsToWait + 'mins, ' +
        secsToWait + 'seconds';



    var container = document.createElement('div');
    container.id = "updateMessage_container";
    container.setAttribute('style','bottom:0; position:fixed; width:100%;');
    var innerContainer = document.createElement('div');
    innerContainer.id = "updateMessage_innerContainer";

    var stickyFooter = document.createElement('div');
    stickyFooter.setAttribute('style','background-color:#FFDD00; border-top:1px solid #AA0000; bottom:0; margin:0 auto; min-height:30px; width:650px;');

    stickyFooter.innerHTML = "<table width='100%'><tr>" +
        "<td>"+
        "<p style='margin: 2px 10px;'>" +
        "New version available for <strong>"+_newHeaders.name+"</strong>! " +
        "</p><p style='margin: 2px 10px; font-size:x-small; font-style:italic;'>" +
        "Installed Version: "+fileMETA.version+"</i>" +
        " | New Version: <i>"+_newHeaders.version+"</i>"+
        "</p> " +
        "</td>" +
        "<td align='right'>" +
        "<table width='100%'><tr>" +
        "<td align='center'>"+
        "<p style='margin: 2px 10px; font-size:x-small; font-style:italic;'>What would you like to do?</p>"+
        "</td>" +
        "</tr><tr>" +
        "<td align='center'>" +
      //          "<input id='UpdateMessage_Upgrade' type='button' value=''/>" +
        "<select id='UpdateMessage_Options'>" +
        "<option id=''>------ Options ------</option>" +
        "<option id='UpdateMessage_Upgrade'>Upgrade</option>" +
        "<option id='UpdateMessage_showUpdateNotes'>Show Update Notes</option>" +
        "<option id='UpdateMessage_Postpone'>Remind Me Later</option>" +
        "<option id='UpdateMessage_Hide24Hours'>Hide for 24hours</option>" +
        "</select>" +
        "</td>" +
        "</tr></table>";
    "</td>" +
    "</tr></table>";

    container.appendChild(stickyFooter);

    if(document.getElementById("updateMessageContainer")) {
      document.getElementById("updateMessageContainer").innerHTML = container.innerHTML;
    } else {
      document.body.appendChild(container);
    }



    function onChange_UpdateMessage_Options(_event){
      var selector = _event.currentTarget;
      var selectedID = selector.options[selector.options.selectedIndex].id;

      switch(selectedID)
      {
        case 'UpdateMessage_showUpdateNotes':
          var upgradeScript = confirm(updateMsg);
          if(upgradeScript){
            document.location.href = UPDATER.scriptUrl;
          } else {
            alert(denyUpdateMessage);
          }
          break;
        case 'UpdateMessage_Upgrade':
          document.location.href = UPDATER.scriptUrl;
          break;
        case 'UpdateMessage_Hide24Hours':
          document.getElementById('updateMessage_container').style.display = 'none';
          break;
        case 'UpdateMessage_Postpone':
          document.getElementById('updateMessage_container').style.display = 'none';


          logger(denyUpdateMessage);
          alert(denyUpdateMessage);
          break;
      }

    }


    var foo = document.getElementById('UpdateMessage_Options');
    logger(foo);

    foo.addEventListener('change',function UpdateMessage_Options_onChange(event){ onChange_UpdateMessage_Options(event); },false);

  }

};

UPDATER.isOtherVersionNewer = function UPDATER_isOtherVersionNewer(currentVer_input,otherVer_input)
{

  var currentVer = currentVer_input.toString().split('.');
  var otherVer = otherVer_input.toString().split('.');

  logger([currentVer_input,otherVer_input]);

  var numberOfPieces = (currentVer.length < otherVer.length) ? otherVer.length : currentVer.length;
  var otherVerIsNewer = false;

  for(var i=0; i<numberOfPieces; i++) {
    currentVer[i] = parseInt(currentVer[i], 10) || 0;
    otherVer[i] = parseInt(otherVer[i], 10) || 0;

    if(otherVer[i] > currentVer[i]) {
      // If we have already determined that the other version number is larger, we do not need to continue testing the remaining components
      otherVerIsNewer = true;
      logger("The version at "+UPDATER.metaUrl+" has a newer version number than the currently install version.");
      manipulatePrefs.setPref('updateAvailable',true);
      break;
    }
    else if(otherVer[i] < currentVer[i]) {
      //Other version has a lower version number than the current version so the rest of the version string should be ignored
      otherVerIsNewer = false;
      logger("The version at "+UPDATER.metaUrl+"  has an older version number than the currently install version.");
      manipulatePrefs.setPref('updateAvailable',false);
      break;
    }

  }

  return otherVerIsNewer;
};

UPDATER.updateCallback = function UPDATER_updateCallback(_responseText)
{
  var _newHeaders = parseHeaders(_responseText);
  logger(_newHeaders);
  var isNewVersionAvailable = UPDATER.isOtherVersionNewer(fileMETA.version,_newHeaders.version);

  if(isNewVersionAvailable) {
    UPDATER.newVersionActions(_newHeaders);
  }
};

UPDATER.getRemoteMeta = function UPDATER_getRemoteMeta(_useDummyResponseText)
{
  if(!_useDummyResponseText)
  {
    GM_xmlhttpRequest({
      method: 'GET',
      url: UPDATER.metaUrl,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onload: function(r) { UPDATER.updateCallback(r.responseText); },
      onerror: function(e) { logger(e); }
    });
  }
  else
  {
    var dummyMETA = <><![CDATA[
      // ==UserScript==
      // @name           Neobux 2+ (kwah) - reWrite
      // @namespace      http://userscripts.org/users/158890
      // @homepage       http://kwah.org/

      // @description    This script provides detailed statistics for your Neobux account and referrals (eg: ages of referrals, recent income/outcome averages, plus more!)

      // @include        http://www.neobux.com/*
      // @include        https://www.neobux.com/*
      // @exclude        http://www.neobux.com/v/*
      // @exclude        https://www.neobux.com/v/*
      // @exclude        http://www.neobux.com/?u=c&s=rba
      // @exclude        https://www.neobux.com/?u=c&s=rba

      // @resource       remoteMeta_USO http://userscripts.org/scripts/source/61349.meta.js

      // // version = major.minor.date.time // date.time = yymmdd.hhmm (GMT)
      // @version        4.1.100908.0230;
      // @updateNoteMin  100909.0230 = Fixed problems with the server time w/ the server hour not being checked if it is <0 or >=24;

      // @versionStatus  Developmental (Dev)
      // @updateNote     4.1 = Started over to reorganise & structure the script properly;

      // // Changelog ::
      // @history        4.0.100615.1500 = Start of second refactoring of code to modularise code; Re-licenced to GPL;
      // @history        4.0.100626.2110 = Started to create a kind of structure for the script, will start on referral statistics page first;
      // @history        4.0.100627.1900 = Started extraction of the data from the graph data into the graphData[graphNumber] variable -- will start using the extracted data next;
      // @history        4.0.100702.0816 = Added yellow bar under graphs - averages deisplayed in this bar not yet working properly;
      // @history        4.0.100703.2035 = Reduced the amount of redundant code though not yet done completely (duplicate code across stats page and account summary to analyse graph data and show bars under graphs); Calculation of averages and sums now working; Toying with styling of the bars - applies only to stats page currently;
      // @history        4.0.100708.1315 = ;
      // @history        4.0.100710.0830 = Heavily reduced the amount of code by modularising the code into more specific functions; Statistics sidebar now pretty much working though multi-lingual support (temporarily) removed and a few NaN errors to fix.. needs more thorough testing;
      // @history        4.0.100711.1115 = Split up the actions in the ref stats page some more and made the graph data available to all functions in run on that page by defining the variables outside of where they are defined; Ref stats page now mostly finished - TODO: add export tabs, clean up sidebar data labels, clean up how the sidebar is generated;
      // @history        4.0.100711.1230 = As standard member, rented referral listings page working pretty much perfectly (i think) though zero code simplifications have been made and I am pretty much certain that script does not yet work for ultimates (not yet sorted out the function to read the minigraph data);
      // @history        4.0.100713.0845 = w00t all nighter... A lot of code changes / refactoring etc.. Rented referral listings page now extracts the data from mtx not the table and is somewhat testing okay for all member types though not sure if the ultimate clicks/day, a10, 17 and rsa columns are working properly though -- needs more testing; not sure if the script will read the minigraphs properly; Added sort asc/desc buttons for all columns (working okay when you select a sorting direction though doesn't indicate what sorting is being applied if you load the ref listing via the menu/top bar);
      // @history        4.0.100813.0300 = Fixed a couple bugs in sidebar calculations; Massively improved code re-use in processGraphs(); Moved some functions around that were out of structure somewhat; Moved statically set 'recent' timeframe to a preference; TODO: cleanup the preferences, figure out why manipulatePrefs() doesn't seem to be cacheing the vars to about:config;
      // @history        4.0.100819.1615 = In middle of *MAJOR* edits - HUGE number of changes big & small (using "JetBrains WebStorm" code editor -- awesome!); Settings editor (probably) working; Fixed a number of aesthetic issues (jaunted columns/'congratulations message overflowing to right etc); Fixed issue with manipulatePrefs() (was checking for existance of pref using the default value); Added donate button to stats sidebar; Fixed & improved aspects of detcecting # of refs (will now correctly identify zero refs); Fixed positioning of bigred arrow; Added placeholder for the local/server time (TODO: make it show actual times);
      // @history        4.0.100820.0230 = Added profit graph to Stats page;
      // @history        4.0.100822.2250 = The code is a bit of a hack-together after quick mashups of code; Added storage of the graph data from the personal clicks graph and ref stats page and added info to stats sidebar; Uploaded code to userscript.org;
      // @history        4.0.100822.2330 = Added ads page to @includes; Uploaded code to userscript.org;
      // @history        4.0.100823.0020 = Fixed a few 'first run' issues; Uploaded code to userscript.org;
      // @history        4.0.100823.0100 = Attempt at fixing the account type detection code. Need samples of pages however to understand how it is displayed on other account types; Uploaded code to userscript.org;
      // @history        4.0.100823.0155 = Fixed mismatch in code relating to variable names and showing columns etc - LARGE problem with settings editor not being able to handle many settings stored as a stringified object; Uploaded code to userscript.org;
      // @history        4.0.100823.0215 = Fixed clicks/day column to show the clicks in the correct order now; Edited @include and @exclude rules to allow the local/server time to show in forums pages; Uploaded code to userscript.org;
      // @history        4.0.100823.1400 = Fixed Error: today.projectedDirectIncome is undefined - Line: 2627;
      // @history        4.0.100823.1500 = Fixed tooltip over profit column to 'working' but TODO: needs updating; Uploaded code to userscript.org;
      // @history        4.0.100825.0300 = Started over to reorganise & structure the script properly;
      // @history        4.0.100826.0235 = **AWESOME** progress - accSummary and refStats pages functioning pretty much perfectly, rentedRefListing is somewhat sorted out;
      // @history        4.0.100826.1625 = accSummary, rentedRefListings and refStats pages working great; Not done yet: 'income' / 'net' values do not yet take the personal clicks into account, the export tabs won't show, local/server time and settings editor not added yet;
      // @history        4.1.100827.0840 = whole bunch of stuff, don't remember.. ; Added instructions that load up on the first run / checks on following runs that inform the user that they need to run the script on a few pages to collect info before the script will function correctly;
      // @history        4.1.100829.2330 = Fixed widenPage() to take into account the added items within existing columns - the rented referral listings page should now work correctly;
      // @history        4.1.100829.2345 = Fixed error in grabbing cost to renew for 15 days instead of the recycle cost;
      // @history        4.1.100830.2045 = Gotten the new settings editor to handle storing the values as objects - need to 'fill it out' now for it to edit other prefs too;
      // @history        4.1.100830.2355 = Settings editor can now handle non-object variables too now; Setup the option for accordion-style menus to save space;
      // @history        4.1.100831.1325 = Temporary fix for totalClickAverage counting new refs (<24hrs old) as having an average of 999 but earlier in the script it doesn't;
      // @history        4.1.100901.1445 = Added the personal click income into the 'income' section of the stats sidebar; Fixed a few issues with the ordering of data causing the stats sidebar to show it in reverse; Fixed a few typos in variable names; Fixed a few issues with the raverage; Uploaded to userscripts.org;
      // @history        4.1.100903.0245 = Redesigned definition of myAccountDetails and script.preferences; Made the column indexes not specific to the rented ref page (should now run okay on the direct refs page though likely to be NaN errors or similar); Changed the stats code to not calculate the sum based on the mean * time period (errors with lack of accuracy in the mean causing the sum to be wrong by (1 - 0.999...) ; Fixed the dates in the generated profit graph to not be hard-coded as July 2010 (now generated dynamically);
      // @history        4.1.100903.0525 = Fixed many of the direct referral page issues - the direct refs page should now function well;
      // @history        4.1.100903.1150 = Fixed the balance transfer to correctly identify and alert when a successful transfer occurs when the Portuguese language is being used;
      // @history        4.1.100903.1900 = Major overhaul of the data structure to bring all the graph info into the _graphs object; Added the 'sum's to the graph databars; Redesigned code to allow easy switching of the order of the timeperiods;
      // @history        4.1.100903.2100 = Added local/server time code (copy paste from previous versions);
      // @history        4.1.100904.0145 = Many changes / fixes as outlined here < http://www.neobux.com/forum/?frmid=7&tpcid=141956&msgid=1583085#m1583085 >; Uploaded to userscripts.org;
      // @history        4.1.100904.1650 = Updated the preference editing code to be more resilient against storing objects; Updated some of the server time code;
      // @history        4.1.100905.0150 = Added auto-update code; Uploaded to userscripts.org;
      // @history        4.1.100907.1915 = Added Object.prototype.append();
      // @history        4.1.100908.0230 = Gotten setterGetter_GM_Storage() to a workable state, where the script will save the default prefs recursively okay, but setters/getters do not allow setting/getting non-top-level variables in the object: columnPrefix and shownColumn are set as String || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.columnPrefix && Boolean || greasemonkey.scriptvals.http:// userscripts.org/users/158890/Neobux 2+ (kwah) - reWrite.showColumn;
      // @history        4.1.100908.1254 = Problems with myAccountDetails && ACCOUNT_FUNCTIONS  --  not functioning correctly when used with setterGetter_GM_Storage, so defining myAccountDetails.renewalFees outside of the main myAccountDetails declaration.;
      // @history        4.1.100908.1500 = Fixed tooltips to stay on the page and allow the mouse to move over the tooltip; Uploaded to userscripts.org;
      // @history        4.1.100908.2000 = Added handling for the golden extension scheduling graph for - needs testing by > golden members;
      // @history        4.1.100909.0230 = Fixed problems with the server time w/ the server hour not being checked if it is <0 or >=24;



      // ==/UserScript==
      ]]></>.toString();

    UPDATER.updateCallback(dummyMETA);
  }

};

UPDATER.check = function UPDATER_check(_forceUpdate)
{

  if(timeSinceLastCheck > UPDATER.updateFrequency || _forceUpdate)
  {
    logger('Checking for updates..');
    UPDATER.getRemoteMeta();
    GM_setValue('lastUpdateCheck',currentTimeMs);

  }
  else
  {
    var msToWait = UPDATER.updateFrequency - timeSinceLastCheck;
    msToWait = (0 > msToWait) ? 0 : msToWait;
    var secsToWait = Math.floor(msToWait / 1000) % 60;
    var minsToWait = Math.floor((msToWait / 1000) / 60) % 60;
    var hoursToWait = Math.floor(((msToWait / 1000) / 60) / 60);


    var denyUpdateMessage = 'Not checking for updates - next check in ' +
        hoursToWait + 'hours, ' +
        minsToWait + 'mins, ' +
        secsToWait + 'seconds';

    logger(denyUpdateMessage);

  }
};


var remoteMeta_USO = '';
if(true === script.preferences.alphaTester)
{  
  UPDATER.scriptUrl = 'http://kwah.org/scripts/neobux_2_kwah_-_rewrite/neobux_2_kwah_-_rewrite.user.js';
  UPDATER.metaUrl = 'http://kwah.org/scripts/neobux_2_kwah_-_rewrite/versionInfo.php';
}
else
{
  if (remoteMeta_USO = parseHeaders(GM_getResourceText('remoteMeta_USO')))
  {
    UPDATER.scriptUrl = 'http://userscripts.org/scripts/source/' + parseInt(remoteMeta_USO.uso.script, 10) + '.user.js';
    UPDATER.metaUrl = 'http://userscripts.org/scripts/source/' + parseInt(remoteMeta_USO.uso.script, 10) + '.meta.js';
  } else
  {
    UPDATER.scriptUrl = 'http://userscripts.org/scripts/source/61349.user.js';
    UPDATER.metaUrl = 'http://userscripts.org/scripts/source/61349.meta.js';
  }
}

UPDATER.updateFrequency = 1000 * 60 * script.preferences.updateFrequency; // { updateFrequency } mins

//UPDATER.updateFrequency = 0;

UPDATER.check(false);