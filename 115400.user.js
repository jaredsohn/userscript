// ==UserScript==
// @name           Wrzuta Power Audio Search
// @description    Display bitrate, mark LQ/HQ/VHQ tracks, sort by length/kbps, depreciate poor search term hits.
// @namespace      qbk_wrzuta_search_bitrate
// @include        http://www.wrzuta.pl/szukaj/*
// @author         qbk
// @version        1.0
// @date           2011.12.04
// @url            http://userscripts.org/scripts/show/115400
// ==/UserScript==

   /* **************************************************************************************************** */
   //                                             CONFIG
   /* **************************************************************************************************** */

   /**
      @true: Size in MBs will be converted to kbps based on track length. See also settings below ('1: SizeToBitrate').
             Rozmiar w MB zostanie przeliczony na kbps na podstawie długości utworu. Zobacz też ustawienia poniżej('1: SizeToBitrate').
   */
   var enable_SizeToBitrate            = true;
   
   /**
      @true: Partial search matches will be depreciated (semi-transparent and indented).
             Wyszukania które tylko częściowo pasują do zapytania, zostaną zdeprecjonowane (wcięte i półprzezroczyste).
   */
   var enable_DepreciatePartialMatches = true;
   
   /**
      @true: Insert buttons to sort the entries by length and bitrate (if enable_SizeToBitrate==true).
             Wstawia przyciski sortowania wg długości i bitrate (jeśli enable_SizeToBitrate==true).
   */
   var enable_InsertSortButtons        = true;

   // 1: SizeToBitrate
      
      // en:
      // Bitrate in kbps below 'thresholdLow' will make entry half-transparent.
      // Bitrate in kbps over 'thresholdHigh' will make entry have background color set.
      
      // pl:
      // Jeśli bitrate jest niższy niż 'thresholdLow', element będzie półprzezroczysty.
      // Jeśli bitrate jest wyższy niż 'thresholdHigh', element będzie miał ustawiony kolor tła.
         
      var thresholdLow = 120;
      var thresholdHigh = 180;
      var thresholdUltraHigh = 230;
      
      var lowKbpsOpacity = 0.3; // from 0.0 = transparent/przezroczysty to 1.0 = opaque/nieprzezroczysty
      var lowKbpsBgColor = "#ecc";      // green / zielony
      var highKbpsBgColor = "#cec";      // green / zielony
      var ultrahighKbpsBgColor = "#bbd"; // blue  / niebieski
      
   // 2: DepreciatePartialMatches

      var nonMatchingIndentation = 5;
      var nonMatchingOpacity = 0.3;
   
// do not edit below
(function()
{
   /* **************************************************************************************************** */
   //                                              UTILS
   /* **************************************************************************************************** */
   
   String.prototype.trim = function() {
       return this.replace(/^\s+|\s+$/g, "");
   };
   String.prototype.removeLeadingZero = function() {
      return (this.charAt(0) === '0') ? this.substr(1) : this;
   }
   String.prototype.endsWith = function(suffix) {
       return this.indexOf(suffix, this.length - suffix.length) !== -1;
   }      
   String.prototype.startsWith = function(prefix) {
      return this.indexOf(prefix) === 0;
   }
   
   // Array Remove - By John Resig (MIT Licensed)
   Array.prototype.remove = function(from, to) {
     var rest = this.slice((to || from) + 1 || this.length);
     this.length = from < 0 ? this.length + from : from;
     return this.push.apply(this, rest);
   };
   
   var WrzutaUtilShared = 
   {
      bitrateFromOrigValues : function(sFileSizeOrig, sFileLengthOrig)
      {
         var fFileSizeMB;
         if( sFileSizeOrig.endsWith("KB") ){
            fFileSizeMB = parseFloat( sFileSizeOrig.replace(" KB","") ) / 1024;
         }else if( sFileSizeOrig.endsWith("MB") ){
            fFileSizeMB = parseFloat( sFileSizeOrig.replace(" MB","").replace(',','.') );
         }else{
            return;
         }
         
         var asFileLength = sFileLengthOrig.split(':');

         var iTotalSec = this.totalSecondsFromArrayFileLength(asFileLength);
         var fTotalKiloBits = 8 * 1024 * fFileSizeMB;
         
         var fBitrate = fTotalKiloBits / iTotalSec;
         return Math.round(fBitrate);
      },
      
      totalSecondsFromArrayFileLength : function(asFileLength)
      {
         var h,m,s,totalSec;
         if(asFileLength.length === 3) // over 1hr long
         {
            h = asFileLength[0].removeLeadingZero();
            m = asFileLength[1].removeLeadingZero();
            s = asFileLength[2].removeLeadingZero();
         }
         else if(asFileLength.length === 2)
         {
            h = 0;
            m = asFileLength[0].removeLeadingZero();
            s = asFileLength[1].removeLeadingZero();
         }
         totalSec = 3600*h + 60*m + 1*s; // 1* because we need a cast to number...
         
         return totalSec;
      }
   };
   
   var XPathTools = 
   {
      getElementByXpath : function(xpath, referenceNode)
      {
         var xPathResult = document.evaluate (xpath, referenceNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
         return xPathResult.singleNodeValue;
      }
   };
   
   var QTools = 
   {
      inArray: function(needle, haystack)
      {
         var length = haystack.length;
         for(var i = 0; i < length; i++) {
           if(haystack[i] == needle) return true;
         }
         return false;
      },
      
      // http://stackoverflow.com/q/990922/245966
      removeAccents : function(s)
      {
         var r=s.toLowerCase();
         //r = r.replace(new RegExp("\\s", 'g'),"");
         r = r.replace(new RegExp("[àáâãäåą]", 'g'),"a");
         r = r.replace(new RegExp("æ",         'g'),"ae");
         r = r.replace(new RegExp("[çć]",      'g'),"c");
         r = r.replace(new RegExp("[èéêëę]",   'g'),"e");
         r = r.replace(new RegExp("[ìíîï]",    'g'),"i");
         r = r.replace(new RegExp("ł",         'g'),"l");
         r = r.replace(new RegExp("[ñń]",      'g'),"n");                            
         r = r.replace(new RegExp("[òóôõö]",   'g'),"o");
         r = r.replace(new RegExp("œ",         'g'),"oe");
         r = r.replace(new RegExp("ś",         'g'),"s");
         r = r.replace(new RegExp("[ùúûü]",    'g'),"u");
         r = r.replace(new RegExp("[ýÿ]",      'g'),"y");
         r = r.replace(new RegExp("[żź]",      'g'),"z");
         //r = r.replace(new RegExp("\\W", 'g'),"");
         return r;
      }
   };


   /* **************************************************************************************************** */
   //                                              CODE AS FUNCTIONS
   /* **************************************************************************************************** */

   var url = document.location.href;
   var bIsWrzutaSearchMainPage = ( url.startsWith('http://www.wrzuta.pl/szukaj/') && ! url.startsWith('http://www.wrzuta.pl/szukaj/audio/') );
   
   function wrzutaAudioListControl_SizeToBitrate()
   {
      var cItems = document.getElementsByClassName("file audio"); // HTMLCollection
      for(var i=0; i<cItems.length; i++)
      {
         var currItem = cItems.item(i);
         
         var oFileSize = XPathTools.getElementByXpath('.//span[@class="size"]',currItem);
         var oFileLength = XPathTools.getElementByXpath('.//span[@class="duration"]',currItem);
         
         var sFileSizeOrig = oFileSize.innerHTML.trim();         // '1,40 MB'
         var sFileLengthOrig = oFileLength.innerHTML.trim();   // '03:03'

         var bitrate = WrzutaUtilShared.bitrateFromOrigValues(sFileSizeOrig, sFileLengthOrig);
         oFileSize.innerHTML = bitrate + " kbps";
         
         if(bitrate < thresholdLow){
            currItem.style.opacity = lowKbpsOpacity;
            currItem.style.backgroundColor = lowKbpsBgColor;
         }else if(bitrate > thresholdUltraHigh){
            currItem.style.backgroundColor = ultrahighKbpsBgColor;
         }else if(bitrate > thresholdHigh){
            currItem.style.backgroundColor = highKbpsBgColor;
         }
      }
   }
   
   function wrzutaAudioListControl_DepreciatePartialMatches()
   {
      String.prototype.decodeHTML = function () {
         return this.replace(/&quot;/g, '"')
                  .replace(/&gt;/g, '>')
                  .replace(/&lt;/g, '<')
                  .replace(/&amp;/g, '&');
      };

      String.prototype.tokenize = function(){
         // treat -.,:&()[]^!?<> etc. as separators: replace them
         // to whitespace and then reduce whitespace
         // \W = ^[a-zA-Z0-9_]
   
         return this.replace(/[\W_]/g, ' ').replace(/ {2,}/g," ").split(" ");
      };
   
      // get keywords from users
      var oSearchKeywords = document.getElementById("search_phrase").firstElementChild;
      var asSearchKeywords = QTools.removeAccents(oSearchKeywords.innerHTML.decodeHTML().toLowerCase()) . tokenize();
      
      // get rid of rubbish, i.e. one-sign search entries
      for(var k=asSearchKeywords.length-1; k>=0; --k){
         if( asSearchKeywords[k].length < 2){
            asSearchKeywords.remove(k);
         }
      }
      // now we have user keywords filtered.
      //alert(asSearchKeywords);
      
      // get entries found
      var cItems = document.getElementsByClassName("file audio"); // HTMLCollection
      for(var i=0; i<cItems.length; i++)
      {
         // get current entry
         var currItem = cItems.item(i);
         
         // extract title as a string
         var oEntryText = XPathTools.getElementByXpath('.//a[@class="title"]',currItem);
         var sEntryText = oEntryText.innerHTML.trim();
         var asEntryText = QTools.removeAccents(sEntryText.toLowerCase()) . tokenize();
         
         // if any of user keywords is not present, hide the entry
         for(var j=0, len = asSearchKeywords.length; j<len; ++j) // iterate over user keywords
         {
            var sUserKeyword = asSearchKeywords[j];
            if(! QTools.inArray(sUserKeyword, asEntryText)){
               // hide currently iterated element
               currItem.style.opacity = nonMatchingOpacity;
               oEntryText.innerHTML =
                     ( new Array( nonMatchingIndentation ).join("&nbsp;") + "» " ) + oEntryText.innerHTML;
               break;
            }
         }
         
      }
   }
   
   /**
      @param 'bAscending' boolean: Defines whether to sort by ascending or desceding order.
         @false: ascending [default]
         @true:  descending
      @param 'bByKbps' boolean
         @false: sort by length [default]
         @true:  sort by kbps
   */
   function wrzutaAudioListControl_Sort(bAscending, bByKbps)
   {
      var map = [];
      
      // get entries found
      var cItems = document.getElementsByClassName("file audio"); // live HTMLCollection
      var anItemsFrozen = Array.prototype.slice.call(cItems);     // we have to freeze it to an array
      for(var i=0; i<cItems.length; ++i)
      {
         // get current entry
         var nCurrItem = cItems.item(i);
         
         // extract duration
         if(bByKbps){
            var oVal = XPathTools.getElementByXpath('.//span[@class="size"]',nCurrItem);
            var sVal = oVal.innerHTML.trim();
            var iKbps = sVal.replace("kbps","").trim() - 0; // - 0 to convert from string to numeric
            map.push( [i, iKbps] );
         }else{ // by length
            var oVal = XPathTools.getElementByXpath('.//span[@class="duration"]',nCurrItem);
            var sVal = oVal.innerHTML.trim();
            var iDurationSec = WrzutaUtilShared.totalSecondsFromArrayFileLength(sVal.split(":"));
            map.push( [i, iDurationSec] );
         }
      }
      
      if(bAscending){
         var sortAscending = function (a,b){ return a[1] < b[1]; };
         map.sort( sortAscending );
      }else{
         var sortDescending = function (a,b){ return a[1] > b[1]; };
         map.sort( sortDescending );
      }
      
      var idx = bIsWrzutaSearchMainPage ? 1 : 0;
      var nParentOfFiles = document.getElementsByClassName("files")[idx]; // files' container <DIV>

      for(var i=map.length-1; i>=0; --i)
      {
         // get current entry
         var nCurrItem = anItemsFrozen[ map[i][0] ];
         nParentOfFiles.insertBefore(nCurrItem, nParentOfFiles.firstChild);
      }
   }
   
   function wrzutaAudioListControl_InsertSortButtons()
   {
      // create buttons "sort asc" / "sort desc" and bind them to the function
      // note the reverse order of insertion -- because of: insertBefore(.firstChild)
      var nOuterParent, nSortButton, nSeparator;
      
      var idx = bIsWrzutaSearchMainPage ? 1 : 0;
      var nOuterParent = document.getElementsByClassName("file_list")[idx];
      
      if(enable_SizeToBitrate) // these two are added conditionally
      {
         nSortButton = document.createElement("a");
         nSortButton.style.cursor = "crosshair";
         nSortButton.innerHTML = "kbps--";
         nSortButton.addEventListener('click', function() { wrzutaAudioListControl_Sort(false,true) });
         nOuterParent.insertBefore(nSortButton, nOuterParent.firstChild);
         
         nSeparator = document.createTextNode(" | ");
         nOuterParent.insertBefore(nSeparator, nOuterParent.firstChild);
         
         nSortButton = document.createElement("a");
         nSortButton.style.cursor = "crosshair";
         nSortButton.innerHTML = "kbps++";
         nSortButton.addEventListener('click', function() { wrzutaAudioListControl_Sort(true,true) });
         nOuterParent.insertBefore(nSortButton, nOuterParent.firstChild);
         
         nSeparator = document.createTextNode(" | ");
         nOuterParent.insertBefore(nSeparator, nOuterParent.firstChild);
      }
      
      nSortButton = document.createElement("a");
      nSortButton.style.cursor = "crosshair";
      nSortButton.innerHTML = "od najkrótszego";
      nSortButton.addEventListener('click', function() { wrzutaAudioListControl_Sort(false,false) });
      nOuterParent.insertBefore(nSortButton, nOuterParent.firstChild);
      
      nSeparator = document.createTextNode(" | ");
      nOuterParent.insertBefore(nSeparator, nOuterParent.firstChild);
      
      nSortButton = document.createElement("a");
      nSortButton.style.cursor = "crosshair";
      nSortButton.innerHTML = "od najdłuższego";
      nSortButton.addEventListener('click', function() { wrzutaAudioListControl_Sort(true,false) });
      nOuterParent.insertBefore(nSortButton, nOuterParent.firstChild);
      
      nSeparator = document.createTextNode("Sortuj ");
      nOuterParent.insertBefore(nSeparator, nOuterParent.firstChild);
   }
   
   /* **************************************************************************************************** */
   //                                              EXECUTE
   /* **************************************************************************************************** */
   
   if(enable_SizeToBitrate)
      wrzutaAudioListControl_SizeToBitrate();
   
   if(enable_DepreciatePartialMatches)
      wrzutaAudioListControl_DepreciatePartialMatches();
      
   if(enable_InsertSortButtons)
      wrzutaAudioListControl_InsertSortButtons();
   
}());
