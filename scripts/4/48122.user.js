// ==UserScript==
          // @name GmailSignatureFormatter
          // @namespace http://www.subbob.us
          // @description Format Links in Gmail Signature Block
          // @version 1.00
          // @include http://mail.google.com/mail/*
          // @include https://mail.google.com/mail/*
          // ==/UserScript==
          
          //
          //	Written by Bob King
          //    Version 1.0 (3 May 2009)
          // 	subbob@gmail.com
          // 	http://thoughtspray.wordpress.com
          //
          // 	** Description **
          //
          // Using a pre-formatted signatured structure, this script allows you to embed hyperlinks in your signature block,
          // a feature currently not supported directly within the Gmail settings.
          // 
          // REMINDER: This will only work when accessing Gmail via Firefox with Greaemonkey running. If you set your signature block
          // to use this, you'll need to either turn if off  when accessing elsewhere (i.e. from public terminal or mobile device) or delete
          // the unformatted signature block each time.
          //
          //	** Known Issues **
          //
          // Currently the script runs on ALL Gmail pages. Tried restricting it to just the "compose" page by using:
          // 
          //		 @include http://mail.google.com/mail/*compose
          //
          // but that did not work.  I'm interested in any recommended solutions that would restrict the script to just
          // the compose new message page.
          //
          //	** Future Goals **
          //
          // 1. Determine a way to embed an image (such as a logo) within the signature block also.  Attempted to do so with followign example:
          // <a href="http://www.navy.mil/navydata/cno/n87/n77.html"><img src="http://www.subbob.us/dolphins.jpg" /></a>
          // but it did not work as intended, only showed up as a link.
          //
          // 2. Add more formatting options, such as centering text.
          //
          // 3. Write a PHP or JavaScript driven page to assist end-users in encoding their signature blocks. The output would be a block
          // of text that could be copied & pasted into the Gmail signature settings.
          // 
          // This script is Public Domain. You are welcome to use it in any way you like.
          //
          
          function show_alert(ScriptLocation)
          {
          alert(ScriptLocation);
          }
          
          var DebugMode; // Used for debugging purposes, set to 1 to receive pop-up alerts
          
          DebugMode = 0;
          
          if (DebugMode) {
          	show_alert("Script is Running");
          }
          
          var FlagString; // Primary flag used to indicate a raw (unformatted) signature is present.
          
          var SignatureFound, allElements, thisElement, SignatureBlock;
          
          var LinkFound;
          
          var LinkString;
          
          var LinkURL, LinkTitle;
          
          var LeftPointer, RightPointer;
          
          var LinkFlagStart, LinkFlagEnd;
          var URL_FlagStart, URL_FlagEnd;
          var TitleFlagStart, TitleFlagEnd;
          
          var BoldFlagStart, BoldFlagEnd, HorizontalRuleFlag;
          var UnderlineFlagStart, UnderlineFlagEnd;
          var ItalicsFlagStart, ItalicsFlagEnd;
          
          BoldFlagStart = "#BOLD-ON#";
          BoldFlagEnd = "#BOLD-OFF#";
          HorizontalRuleFlag = "#HORIZONTAL-RULE#";
          
          UnderlineFlagStart = "#UNDERLINE-ON#";
          UnderlineFlagEnd= "#UNDERLINE-OFF#";
          
          ItalicsFlagStart = "#ITALICS-ON#";
          ItalicsFlagEnd = "#ITALICS-OFF#";
          
          var MaxLinks, LinkCounter;
          
          //  MaxLinks: User configurable variable. Initially used for testing but also helps to ensure
          //                   script does not loop indefinitely when encountering poorly formatted signature block.
          
          MaxLinks = 4; 
          
          // LinkCounter: Counter used in conjunction with MaxLinks
          
          LinkCounter = 0;
          
          // Link, URL & Title flags defined here so that users may customize the if desired
          
          LinkFlagStart = "#BEGIN-LINK#";
          LinkFlagEnd = "#END-LINK#";
          
          URL_FlagStart = "#BEGIN-URL#";
          URL_FlagEnd = "#END-URL#";
          
          TitleFlagStart = "#BEGIN-TITLE#";
          TitleFlagEnd = "#END-TITLE#";
          
          // FlagString: Primary flag used to indicate a raw (unformatted) signature is present
          
          FlagString = "#GmailSignaturePreFormatted#";
          
          SignatureFound = 0;
          
          allElements = document.getElementsByClassName('editable tr-field');
          for (var i=0; i < allElements.length; i++) {
          	if (!SignatureFound) {
          		thisElement = allElements[i];
          	}
          	if (thisElement.innerHTML.match(FlagString) && !SignatureFound)  {
          		SignatureBlock = thisElement.innerHTML;
          		SignatureFound = 1;
          
          		// Remove the FlagString from the SignatureBlock
          
          		SignatureBlock = SignatureBlock.replace(FlagString + "<br>","");
          	}
          }
          
          // Perform global changes prior to encoding the embedded links
          
          if (SignatureFound) {
          
          // Replace the "--" Gmail inserts at top of Signature area
          
          SignatureBlock = SignatureBlock.replace("<br clear=\"all\"><br>-- <br>","<br clear=\"all\"><br>");
          
          // Globally replace all Bold, Underline, Italics and HorizonalRule tags
          
          SignatureBlock = SignatureBlock.replace(BoldFlagStart,"<b>");
          SignatureBlock = SignatureBlock.replace(BoldFlagEnd,"</b>");
          SignatureBlock = SignatureBlock.replace(UnderlineFlagStart,"<u>");
          SignatureBlock = SignatureBlock.replace(UnderlineFlagEnd,"</u>");
          SignatureBlock = SignatureBlock.replace(ItalicsFlagStart,"<i>");
          SignatureBlock = SignatureBlock.replace(ItalicsFlagEnd,"</i>");
          SignatureBlock = SignatureBlock.replace(HorizontalRuleFlag,"<hr>");
          }
          
          
          
          // Determine if an encoded link is present within the signature block
          
          LinkFound = SignatureBlock.indexOf(LinkFlagStart);
          
          while ((LinkFound > 0) && (LinkCounter < MaxLinks))  // Loop while LinkFound and MaxLinks not exceeded
          {
          
          LinkCounter++;  // increment the LinkCounter
          
          LeftPointer = LinkFound;
          
          RightPointer = SignatureBlock.indexOf(LinkFlagEnd) + LinkFlagEnd.length;
          
          LinkString = SignatureBlock.substring(LeftPointer,RightPointer);
          
          if (DebugMode) {show_alert("LinkString is " + LinkString + " (" + LeftPointer + "," + RightPointer + ")");}
          
          LinkURL = LinkString.substring(LinkString.indexOf(URL_FlagStart)+URL_FlagStart.length,LinkString.indexOf(URL_FlagEnd));
          
          if (DebugMode) {show_alert("LinkURL # " + LinkCounter +" : " + LinkURL);}
          
          LinkTitle = LinkString.substring(LinkString.indexOf(TitleFlagStart)+TitleFlagStart.length,LinkString.indexOf(TitleFlagEnd));
          
          if (DebugMode) {show_alert("LinkTitle # " + LinkCounter +" : " + LinkTitle);}
          
          if (DebugMode) {show_alert(LinkTitle.link(LinkURL));}
          
          SignatureBlock = SignatureBlock.replace(LinkString,LinkTitle.link(LinkURL));
          
          if (DebugMode) {show_alert("SignatureBlock is " + SignatureBlock);}
          
          thisElement.innerHTML = SignatureBlock;
          
          LinkFound = SignatureBlock.indexOf(LinkFlagStart);
          }