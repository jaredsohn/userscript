// ==UserScript==
// @name       Kaltura mobile compatible iframe code generator
// @version    1.0
// @description  Exposes iframe embed code that is mobile compatible, for integration with blackboard connect at UBC
// @include      https://connect.ubc.ca/webapps/osv-kaltura*
// @copyright  2013+, Bill Pickard
// ==/UserScript==

//Target the containerdiv so as not to grab links from the entire page
var pageDiv = document.getElementById('containerdiv');

//Get all <a> elements from the div
var pageLinks = pageDiv.getElementsByTagName('a');


//loop through the <a> elements
for(var i=0;i<pageLinks.length;i++){
    
    //get the href from the link and cast it to a string
    var linkhref = String(pageLinks[i].getAttribute('href'));
    
    //skip duplicate entries (useful for switching between list and thumbnail view)
    if(linkhref == String(pageLinks[i+1].getAttribute('href'))){
        i++;
    } 
      
    //if the link href param contains the word 'refresh' it is the one we want as it contains the entry ID...
    if(linkhref.indexOf('refresh') != -1){
       
        //placeholder for easier reference/readability
     	var targetLink = pageLinks[i];
        
        //get the index of the first apostrophe
        var linkIndex = linkhref.indexOf('\'');
       	
        //extract the kaltura entry ID
        var targetEntry = linkhref.substr(linkIndex+1,10);  
        
        //create a new textarea element
        var newTextArea = document.createElement('textarea')
        
        //plug kaltura's entry id into the mobile friendly embed code
        var embedString = '<iframe id="theIframe" frameborder="0" width="620" height="420" src="/webapps/osv-kaltura-bb_bb60/jsp/viewContent1.jsp?entry_id='+targetEntry+'&amp;iframe=true"></iframe>';
        
        //populate the textarea with the embed code
    	newTextArea.value = embedString;
        
        //set some style options on the textarea
        newTextArea.setAttribute('style','height:75px;width:250px;margin-top:10px;');
   		
        //append the new text area to the node where the link resides
        targetLink.parentNode.appendChild(newTextArea);
    }
}
