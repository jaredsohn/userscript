// ==UserScript==
// @name          Pick your Flickr Favs
// @namespace     http://mm.smile-to-me.de
// @description   Users can pick any of the pics on their favourites page, a html table or list with the pics and corresponding links is then generated
// @include       http://flickr.com/photos/*/favorites/*
// @include       http://www.flickr.com/photos/*/favorites/*
// ==/UserScript==

//TODO: Momentan funktioniert das Script nicht, wenn die better Flickr-Extension im Firefox installiert ist

var divTagsWithClass, taggingDiv, bigContainer;
GM_log('Running pickyourflickrfavs script');
GM_log('Preparing the layer');
//prepare the layer
var layer = document.createElement("div");
    layer.style.position = "absolute";
    layer.style.width = "700";
    layer.style.height = "500";
    layer.style.zIndex = "5001";
    layer.style.marginLeft ="-350px";
    layer.style.left ="50%";
    layer.style.backgroundColor = "#FFFFFF";
    layer.style.border = "2px";
    layer.style.borderStyle = "solid";
    layer.style.visibility = "hidden";
    layer.setAttribute("id","favslayer");
//close button
    var div_right = document.createElement("div");
    div_right.style.marginRight = "0";
    div_right.style.marginLeft= "auto";
    div_right.style.width="50px";
    var close = document.createElement("a");
    close.setAttribute("href","#");
    close.setAttribute("onClick","document.getElementById('favslayer').style.visibility='hidden'");
    close.style.fontSize = "0.8em";
    close.style.textDecoration ="none";
    close.appendChild(document.createTextNode("Close"));
    div_right.appendChild(close);
    layer.appendChild(div_right);
    //header text
    var header = document.createElement("h1");
    header.style.color="#666";
    header.appendChild(document.createTextNode("Here we go ..."));
    layer.appendChild(header);
    var textbox = document.createElement("textarea");
    textbox.setAttribute("cols","80");
    textbox.setAttribute("rows","20");
    textbox.setAttribute("id","textbox");
    textbox.setAttribute("onClick","this.focus();this.select()");
   
    layer.appendChild(textbox);
    
    var optionsParagraph = document.createElement("form");
    optionsParagraph.setAttribute("action","javascript:changeOutput()");
    var tableParagraph = document.createElement("p");
    //tableParagraph.appendChild(document.createTextNode("Create table with "));
    //tableParagraph.appendChild(document.create)
    var radioEnclose = document.createElement("input");
    radioEnclose.setAttribute("type","radio");
    radioEnclose.setAttribute("name","outputType");
    radioEnclose.setAttribute("value","enclose");
    radioEnclose.appendChild(document.createTextNode("Enclose each thumbnail with "));
    var encloseElement = document.createElement("input");
    encloseElement.setAttribute("type","text");
    encloseElement.setAttribute("size","5");
    radioEnclose.appendChild(encloseElement);
    var updateButton = document.createElement("input");
    updateButton.setAttribute("type","submit");
    updateButton.setAttribute("value","update");
    optionsParagraph.appendChild(radioEnclose);
    // optionsParagraph.appendChild(tableParagraph);
    var submitParagraph = document.createElement("p");
    submitParagraph.appendChild(updateButton);
    optionsParagraph.appendChild(submitParagraph);
    
    layer.appendChild(optionsParagraph);
    
    //show the stuff
    var main;
    main = document.getElementById('Main');
    if (main) {
        main.parentNode.insertBefore(layer, main);
    } 
    
//insert link for generation of table with favs
var pfocus = document.evaluate("//div[@id='favoriteThumbs']",
         document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var x = 0; x <= pfocus.snapshotLength; x++){
        var pfocus_found = pfocus.snapshotItem(x);
        if (pfocus_found){
                GM_log("==1==");
                //link hinzufügen
                var link = document.createElement('a');
                link.setAttribute("href","#");
                link.style.textDecoration="none";
                var b = document.createElement ('b');
                var myText = document.createTextNode(" Pick favs");
                b.appendChild(myText);
                link.appendChild(myText);
                link.style.color="#FFFFFF";
                link.style.backgroundColor="#1057AE";
                link.style.padding="2px";
                link.style.marginLeft=("10px");
                link.addEventListener("click", showLayer, true);
                pfocus_found.childNodes[1].appendChild(link);
        }
}



//find the divs with the fav thumbnails
divTagsWithClass = document.evaluate(
    "//span[@class='photo_container pc_s']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var x = 0; x <= divTagsWithClass.snapshotLength; x++){
    
       taggingDiv = divTagsWithClass.snapshotItem(x);
       if (taggingDiv){
           //add an ID to the container
           taggingDiv.setAttribute("id","_"+(x+1));
       	   // find the link
       	   linkTag = taggingDiv.getElementsByTagName('a')[0];
       	   if (linkTag){   
       	    GM_log(' Found the link tag: '+linkTag);

            
                var check = document.createElement("input");
       		    // build the HTML for the checkbox	
       		    check.setAttribute("type","checkbox");
       		    check.setAttribute("name","pick");
       		    check.setAttribute("value","_"+(x+1));
       	
                linkTag.parentNode.insertBefore(check, linkTag.nextSibling);
            
       	    }
       
       }
       
};

 


function createTable(imageNodes){
   //build a nice table
    var noOfRows = Math.floor(Math.sqrt(imageNodes.length));
    var noOfCols = Math.ceil(Math.sqrt(imageNodes.length));
    GM_log(imageNodes.length+' images have been selected');
    GM_log('Table will have '+noOfRows+' rows');
    var table = document.createElement("table");
    var counter=0;
    for (var i = 1; i<=noOfRows; i++)
    {
        var tr = document.createElement("tr");
        for (var j = 1; j<=noOfCols; j++)
        {
            var td = document.createElement("td");
            if(counter <= (imageNodes.length-1)){
                td.appendChild(imageNodes[counter]);
            }
            counter++;
            tr.appendChild(td);
        };
        table.appendChild(tr);
    };
    GM_log('Built table');
    var escapedTable = table.innerHTML;
    GM_log(table.innerHTML);
    //@TODO table hack 
    var tableTextNode = document.createTextNode("<table>"+escapedTable+"</table>");
    return tableTextNode;
};

function showLayer(){
    //first find out, which thumbnails are checked
    checkedFavs = document.evaluate(
        "//input[@name='pick']",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    var noOfCheckedBoxes = 0;  
    var imageNodes = new Array(); 
    GM_log('checkedFavs.snapshotLength: '+checkedFavs.snapshotLength);//OK
    for (var x = 0; x < checkedFavs.snapshotLength; x++){
        singleFav = checkedFavs.snapshotItem(x);
        singleFavID = singleFav.getAttribute("value");
        
        
        if(singleFav.checked){
            //great we found a checked checkbox :-)
            //lets put img src and href into an array
            
            checkedImages = document.evaluate(
                   "//span[@id='"+singleFavID+"']",
                   document,
                   null,
                   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                   null);
            pickedFav = checkedImages.snapshotItem(0).childNodes[0];
            
            //TODO generate URI from URL (e.g. add string "http://flickr.com"
            pickedFav.setAttribute("href","http://flickr.com"+pickedFav.getAttribute("href"));
            imageNodes.push(pickedFav.cloneNode(true));
            //noOfCheckedBoxes++;
        }
        else{
           // GM_log('image has not been checked'); //OK
        }
       
    };
    
   
    //default: return table with nodes
    var contentNode = createTable(imageNodes);
    
    //allright, we have the table, now let's make the layer and show the stuff
    
    var textbox = document.getElementById("textbox");
    if(textbox.firstChild)
            textbox.removeChild(textbox.firstChild);
    textbox.appendChild(contentNode);
    
    var layer = document.getElementById("favslayer");
    layer.style.visibility = "visible";
}

function changeOutput(){
    
}

