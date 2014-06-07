// ==UserScript==
// @name          Sitelines
// @namespace     http://www.new-links.info/userscripts
// @description	  Adds inline linking to archaeological records mentioned in the body
// @include       http://sine7.ncl.ac.uk/sl/Histories/*
// @include       http://sine7.ncl.ac.uk/sl/Themes/*
// ==/UserScript==

(function() {
	var xpath = "//text()[normalize-space(parent::font) and contains(.,'HER')]";
	var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var source = null;
	var i1, i2, l
	var span;
	for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) 
	{	
	    var FinishedParsingText = false;
	    var FixedText = "";
		source = cand.nodeValue;
	    //alert(source);

	    span = document.createElement("span");
	    cand.parentNode.replaceChild(span, cand);
	    
	    i1=0;
	    i2=0;
	    l = source.length;
	    while(!FinishedParsingText)
	    {
	     
	     i2 = source.indexOf("HER ",i1);
	     while(i2>=0)
	     {
	      // store unprocessed text up to and including HER in fixed text
	      FixedText = source.substring(i1,i2) + "HER ";
	      // move pointer past HER
	      i1 = i2 + 4; // 'HER '
	      
	      span.appendChild(document.createTextNode(FixedText));
	      
	      var FinishedParsingREFNumbers = false;	      
	      var FinishedParsingThisREFNumber = false;	      
	      var FixedLinks = "";
	      var thisRef = "";
	      // do the linkage magic here

  		 //set index to beginning of first number 
  		 // had to put this here to skip past \n after some HERs
  		 
  		 var thisChar = source.substr(i1,1);
		 while(!(thisChar>='0'&&thisChar<='9'))
		 {
		 	i1+=1;
		 	thisChar = source.substr(i1,1);
		 }
          var Refs = new Array();
	      while(!FinishedParsingREFNumbers)
	      {
	        var series = false;
	        FinishedParsingThisREFNumber = false;
	        thisRef = "";
			while(!FinishedParsingThisREFNumber)
			{
				
				// iterate through string char by char
				// switch the results (see notes)
				thisChar = source.substr(i1,1);
				if((thisChar>='0'&&thisChar<='9')||thisChar=='-')
				{
				 thisRef+=thisChar;
  				 i1+=1;
  				 if(thisChar=='-') series = true;
				}
				else if(thisChar==','||thisChar==' ')
				{
				 //set index to beginning of next number
				 //var throwaway = ""; 
				 while(!(thisChar>='0'&&thisChar<='9')&&thisChar!=')')
				 {
				 	i1+=1;
				 	thisChar = source.substr(i1,1);
				 	//throwaway+=thisChar;
				 }
				 	//GM_log(throwaway);
				 
				 FinishedParsingThisREFNumber = true;
				 if(thisChar==")")
				 {
				  FinishedParsingREFNumbers = true;
				 }
				 
				}
				else
				{
				 FinishedParsingThisREFNumber = true;
	             FinishedParsingREFNumbers = true;
				}

	
			}
			if(series)
			{
			 var x = thisRef.indexOf('-');
			 var s = thisRef.substring(0,x);
			 var e = thisRef.substring(x+1);
			 //alert(thisRef+" [x] =["+s+"-"+e+"]");
			 e = s.substr(0,s.length-e.length)+e
			 //alert(thisRef+" = ["+s+"-"+e+"]");
			 
			 for (var refscount = s;refscount<=e;refscount++)
			 {
			  //alert(refscount);
			  //alert(Refs.push(refscount));
			  Refs.push(refscount);
			 }	
			}
			else
			{
				Refs.push(thisRef);
			}
			
	      }
	      
		for(var arrindex = 0; arrindex < Refs.length; arrindex++)
		{
		    if(arrindex!=0)
		     span.appendChild(document.createTextNode(", "));
			thisRef = Refs[arrindex];
			var target = "http://sine7.ncl.ac.uk/sl/FMPro?-db=smr%20converted.fp3&-format=record%5fdetail.htm&-lay=web&-op=eq&SMRNUMBER=HER%20";
			target += thisRef;
			target += "&-op=gte&-find";
	        var a = document.createElement("a");
            a.setAttribute("href", target);
            a.appendChild(document.createTextNode(thisRef));
            span.appendChild(a);
        }
	      
	      
	      
	      //FixedText += FixedLinks;
	      
	      i2 = source.indexOf("HER",i1);
	      
	     }
	     // add any remaining text to fixed text
	     if(i1<l)
	      span.appendChild(document.createTextNode(source.substring(i1,l)));
	      
	     
	     FinishedParsingText = true;
	    }    
	    
	    
	    
	    
	    
        span.normalize();
	}
})();