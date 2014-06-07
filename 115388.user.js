// ==UserScript==
// @name           Wrzuta Low Bitrate Warning / Ostrzeżenie o niskiej jakości audio
// @description    Displays bitrate info for audio files, and if bitrate is low, an eye-catching warning.
// @namespace      qbk_wrzuta_bitrate
// @include        http://*.wrzuta.pl/audio/*
// @author         qbk
// @version        0.2
// @date           2011.10.13
// @url            http://userscripts.org/scripts/show/115388
// ==/UserScript==

// requires Firefox 3.5+ (because of 'firstElementChild')

// config

   // en:
   // Bitrate in kbps below 'threshold' will force warning message to appear.
   // Beware of precision of calculation errors (files of 128 kbps may have bitrate calculated e.g. as "125").
   // Recommended settings: 120, for audiophiles: 185 or higher
   
   // pl:
   // Bitrate w kilobitach na sekundę poniżej 'threshold' spowoduje wyświetlenie ostrzeżenia.
   // Obliczona wartość może być nieprecyzyjna (np. pliki o 128 kbps mogą mieć obliczony bitrate 125).
   // Sugerowana wartość: 120, dla audiofili: 185 lub więcej
   var threshold = 120; 

   // Display colors / Kolory informacji i ostrzeżenia.
   // Example values / przykładowe wartości: "#e00", "#000", "red", "black".
   var infoColor = "#e00";
   var warningColor = "#e00";
   
   // Warning message / wiadomość ostrzeżenia
   var warningMessage = "LOW BITRATE";
   
// do not edit below
(function()
{
   String.prototype.trim = function() {
       return this.replace(/^\s+|\s+$/g, "");
   };
   String.prototype.removeLeadingZero = function() {
      return (this.charAt(0) === '0') ? this.substr(1) : this;
   }
   String.prototype.endsWith = function(suffix) {
       return this.indexOf(suffix, this.length - suffix.length) !== -1;
   }
   
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

   function calculateBitrate()
   {
      var sFileSizeOrig = document.getElementById("file_info_size").firstElementChild.innerHTML.trim(); // '1,40 MB'
      var sFileLengthOrig = document.getElementById("file_info_data_size").innerHTML.trim();            // '03:03'

      return WrzutaUtilShared.bitrateFromOrigValues(sFileSizeOrig, sFileLengthOrig);
   }
   
   function appendBitrateInfoContainer(iBitrate)
   {
      var bitrateContainer = document.createElement("span");
      bitrateContainer.style.color = infoColor;
      bitrateContainer.innerHTML = "(" + iBitrate + " kbps)";
      
      document.getElementById("file_details_info").appendChild(bitrateContainer);
   }
   
   function appendBitrateWarningContainer(iBitrate)
   {
      document.getElementById("file-header").firstElementChild.innerHTML +=
         "<br /><small style='color:" + warningColor + ";'>"+ warningMessage +": " + iBitrate + " kbps</small>";
   }
   
   // essence
   var iBitrate = calculateBitrate();
   appendBitrateInfoContainer(iBitrate);
   if(iBitrate < threshold){
      appendBitrateWarningContainer(iBitrate);
   }
   
}());
