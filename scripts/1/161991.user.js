// ==UserScript==
// @name           Test
// @namespace       
// @description    Creates a strip of thumbnailed pictures from http://www.freeporndumpster.com/latest.php, and enables you to load them in full size. navigate the strip of pictures with keys 'n' and 'p', 'up arrow' and 'down arrow' moves the image strip, 'left arrow' and 'right arrow' loads next and previous image, 'v' key opens the current image in a new tab
// @include        http://*.freeporndumpster.com/latest.php
// @include        http://freeporndumpster.com/latest.php

// ==/UserScript==
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Javascript Fusker</title>
 
    <SCRIPT LANGUAGE=javascript>
    <!--
 
    // ---------------------------------------------------------------------------
    // -- Scriptname   : Javascript Fusker                                      --
    // -- Author       : Bas de Reuver                                          --
    // -- Date         : 8-may-2004                                             --
    // -- Description  : Sometimes someone put up lots of pictures (Pic001.jpg, --
    // --                Pic002.jpg etc.) without a proper overview or index    --
    // --                page. This script takes an URL and dumps all pictures  --
    // --                in the HTML document so you can view them more easily. --
    // --                Idea sort of taken from http://fusker.lewww.com        --
    // --                fusker: [Danish], n. cheater, hacker                   --
    // -- 14-jul-2004 Johann Zacharee sent in some updates and ideas            --
    // -- added nested number ranges and removed hardcoded "fusker.html" name.  --
    // ---------------------------------------------------------------------------
 
    function GenerateContent()
    {
      var strParameter = window.location.search;
//    if (strParameter.charAt (0) != '?')
//      return(1);
 
      strParameter = strParameter.substring(1, strParameter.length);
 
      //next link has info on 'command-line' arguments
      //http://sharkysoft.com/tutorials/jsa/content/043.html
 
      if (strParameter == '')
      {
        document.writeln('This script can be used to display a range of numbered images.<br>');
        document.writeln('Please enter a valid URL with a number part.<br>');
        document.writeln('<a href="fusker.html?www.google.nl/images/hp%5B0-3%5D.gif">Click here for an example</a><br><br>');
        document.writeln('The idea was taken from <a href="http://fusker.lewww.com">http://fusker.lewww.com</a><br>');
        document.writeln('Fusker means cheater or hacker in Danish.<br>');
      }
      else
      {
        // must contain 'http://' or 'ftp://' or something
        if (strParameter.indexOf('://') < 0)
          {strParameter = 'http://' + strParameter}
 
        strParameter = strParameter.replace(/%5B/g, '[');  // g=global, replace all
        strParameter = strParameter.replace(/%5D/g, ']');
 
        document.form1.URL.value = strParameter;
        ProcessURL('', strParameter); // start recursion
      }
    }
 
    function RemoveLeadingZeros(strInput)
    {
      // remove zero's because else parseInt('0123') interprets as octal number and returns 83
      i = 0
      while (strInput.substr(i, 1) == '0') {i++}
 
      // incase all zero's then the string is empty now
      if (strInput.length == i)
        // put one '0' character in string
        {strInput = '0'}
      else
        // removeonly keep valid digits '00123' -> '123'
        {strInput = strInput.substr(i)}
      return strInput;
    }
 
    function WriteURLtoDocument(strURL)
    {  
      document.writeln('<p><img src="' + strURL + '"><br>');
      document.writeln('<a href="' + strURL + '">' + strURL + '</a></p>');
    }
 
    // ExamineURL(strFirst, strLast) takes an URL and determines where the number-part is located.
    // example: strFirst='http://www.bla.com/user/test[01-10].jpg'
    // will show pictures test01.jpg through test10.jpg
    function ProcessURL(strFirstPart, strLastPart)
    {
      var strBegin = '';
      var strEnd = '';
      var iStartNr = -1;
      var iEndNr = -1;
      var iDigits = 0  // number of digits, example 3 digits, then 1 becomes '001'
      var strTemp;
 
      var strNumberPart = '';
      var i;
 
      //force typecast to string
      strFirstPart = strFirstPart + '';
      strLastPart = strLastPart + '';
 
      // check for '[01-10]' part
      var iBegin = strLastPart.indexOf('[');
      var iEnd   = strLastPart.indexOf(']');
      if (iBegin < 0 || iEnd < 0)
      {
        // no more number parts, print to HTML document
        WriteURLtoDocument(strFirstPart + strLastPart);
        return -1;
      };
 
      // there are more number parts, process it
      strBegin = strFirstPart + strLastPart.substr(0, iBegin);
      strEnd   = strLastPart.substr(iEnd+1, strLastPart.length-iEnd);
 
      var strTemp = strLastPart.substr(iBegin+1, (iEnd-iBegin-1));
      var iDash  = strTemp.indexOf('-');
 
      if (iDash < 0)
      {
        WriteURLtoDocument(strFirstPart + strLastPart);
        return -1;
      };
 
      var strStartNr = strTemp.substr(0, iDash);
      iDigits  = strStartNr.length;
      strStartNr = RemoveLeadingZeros(strStartNr);
 
      var strEndNr = strTemp.substr(iDash+1, strTemp.length-iDash-1);
      strEndNr = RemoveLeadingZeros(strEndNr);
 
      if (isNaN(strStartNr) == true || isNaN(strEndNr) == true)
      {
        WriteURLtoDocument(strFirstPart + strLastPart);
        return -1;
      }
 
      iStartNr = parseInt(strStartNr, 16);
      iEndNr = parseInt(strEndNr, 16);
 
      // call ProcessURL recursively
      for (i = iStartNr; i <= iEndNr; i++)
      {
        strNr = i + '';  // typecast to string
        while (strNr.length < iDigits)
          {strNr = '0' + strNr}
        // recursive call
        strTemp = strBegin + strNr;
        ProcessURL(strTemp, strEnd);
      }
    }
 
    function DisplayHelp()
    {
      document.form1.URL.value = '';
      HandleSubmit();
    }
 
    function HandleSubmit()
    {
      // when user types in textbox and presses enter, this function is called
      var strParameter = document.form1.URL.value;
      // replace again, easier to copy into UBB codes ([url=..]) because that also uses '[' and ']'
      strParameter = strParameter.replace(/\[/g, '%5B'); // g=global, replace all
      strParameter = strParameter.replace(/\]/g, '%5D');
      top.location = window.location.pathname + '?' + strParameter;
      // next lines causes form not to reload (like pressing F5)
      return false;
    }
 
    //-->
    </SCRIPT>
  </head>
 
  <body bgcolor=#FFFFEE>
 
    <FORM id=form1 name=form1 onSubmit="return HandleSubmit()">
Javascript Fusker - BdR&copy;2004<br>
      <b>URL</b>:
      <INPUT SIZE=60 NAME="URL">
      <INPUT TYPE="button" NAME="RefreshButton" VALUE="Refresh" onClick="HandleSubmit()">
      <INPUT TYPE="button" NAME="HelpButton" VALUE="Help" onClick="DisplayHelp()">
    </FORM>
 
    <!-- insert pictures here -->
 
    <SCRIPT LANGUAGE="JavaScript">
      GenerateContent();
    </SCRIPT>
 
  </body>
</html>
 