// ==UserScript==
// @name        CleanOfferExtension
// @namespace   https://www.cleanoffer.com
// @description Organize Clean Offer to Show Images / Open Houses / All tabs
// @include     http://re.cleanoffer.com/search/savedSearch?execution=*
// @include     http://re.cleanoffer.com/search/search?execution=*
// @include     http://re.cleanoffer.com/search/*?execution=*
// @include     http://re.cleanoffer.com/listing.htm?mlsName=SFAR&mlsNumber=*
// @include     http://re.cleanoffer.com/mybriefcase/viewnewmatch.htm?mlsName=SFAR&mlsNumber=*
// @include     http://re.cleanoffer.com/mybriefcase/newmatches.htm
// @grant       none
// @version     2.1
// ==/UserScript==
// /// include     http://re.cleanoffer.com/mybriefcase/newmatches.htm

var Globals = 
"var req = new XMLHttpRequest();\n" +
"main();\n" +
"\n";

function transferComplete(evt) {
    console.log("The transfer is complete.");
    var pics = req.responseText;
    // console.log(req.responseText);
    document.getElementById('photos').innerHTML  = pics.substring(pics.indexOf('<body>') + 6, pics.indexOf('</body>') - 1);
}



function main()
{

try {
    console.log(document.URL);
//    if(((document.title == "Search Results") && (document.body.id == "default")) || 
//       ((document.title == "CleanOffer") && (document.body.id == "cleanoffer")) ) { 


   if(((document.title == "Search Results") && (document.body.id == "default")) || 
        (document.URL == "http://re.cleanoffer.com/mybriefcase/newmatches.htm") ) { 

        document.title = "Clean Offer Results";    
    
        var imgs = document.body.querySelectorAll('tr.propDescription>td a>img[id^="tooltip"]');
        console.log("images len = " + imgs.length);
        for(var j = 0; j < imgs.length; j++) {
 //           console.log("A("+j +") = " + imgs[j].src);
            if((imgs[j].hasAttribute('title')) && (imgs[j].src = '/images/open_house.gif')) {
                var openhouse = imgs[j].title;
                openhouse = openhouse.replace('<p><em>OPEN HOUSE</em></p><br/><p>Date: ', 'Open House:<br/>', 'g');
                openhouse = openhouse.replace('<br/>Time: ', '<br/>', 'g');
                openhouse = openhouse.replace('</p><br/><p>Date: ', '<br/>', 'g');
                openhouse = openhouse.replace(', 2013','', 'g');
                openhouse = openhouse.replace(', 2014','', 'g');
                openhouse = openhouse.replace(', 2015','', 'g');
                openhouse = openhouse.replace(', 2016','', 'g');
                openhouse = openhouse.replace(' PM</p>', ' PM', 'g');
                openhouse = openhouse.replace(' AM</p>', ' AM', 'g');
//                    console.log("oh = " + openhouse);
                imgs[j].parentNode.outerHTML = '<div style="font-size : 8px; line-height: 1.0em;">' + openhouse + '</div>';
                // var elems = imgs[j].parentNode.getElementsByTagName("div");
                // imgs[j].parentNode.style.fontSize='7px';
            }
            else {
//                    console.log("NOP");
            }
        }
        
 
        var imgs = document.body.querySelectorAll('tr.propDescription>td.openLeading>a[id^="SFAR-"].thumbnail>img');
        for(var j = 0; j < imgs.length; j++) {
    //               console.log("B(" + i + "," + j +") = " + imgs[j].outerHTML);
            if(imgs[j].hasAttribute('alt')) {
                // console.log("full = " + imgs[j].parentNode.id);
                var MLSid = imgs[j].parentNode.id.substr(-6);
    //                    console.log(MLSid);
                imgs[j].outerHTML = '<img src="/photos/SFAR/' + MLSid + '/0/medium_thumbnail.jpg" border="0">';
                var elem = document.getElementById('tooltip-' + MLSid);
                elem.parentNode.removeChild(elem);
            }
            else {
    //                   console.log("NOP");
            }
        }

    }
 
    if((document.title == "CleanOffer") && (document.body.id == "cleanoffer")) { 
        try{
            var addr = document.getElementsByClassName("yui-u first");
   //     console.log(": " + addr[0].innerHTML);
            if(addr.length > 0) {
                document.title = addr[0].getElementsByTagName("h1")[0].textContent.trim();         
            }
        }
        catch(err)
        {
            console.log(err);
        }
        //document.getElementById('listing').setAttribute('style', 'display: block;');
        //var tabs = 
        // console.log(document.getElementById('tabs').outerHTML);
        //console.log(document.getElementById('listing-details').outerHTML);
        document.getElementById('tabs').innerHTML = document.getElementById('listing-info').outerHTML;
        try {
            if(document.getElementById('view-full-size-photos') != null)  {
                var href = document.getElementById('view-full-size-photos').getElementsByTagName('a')[0].href;
//            console.log(href);
                req.addEventListener("load", transferComplete, false);
                req.open('GET', href, true);
                req.send();  
                var delElement = document.getElementById('listing-details-wrapper');
                delElement.parentNode.removeChild(delElement);
            }
        }
        catch(err)
        {
            console.log(err);
        }
        try {
            var vanOut = document.getElementById('listing').innerHTML;
            console.log(vanOut);
            vanOut = vanOut.replace(
                    '<li>Vanguard Properties</li>', '<li style="color : #FF3F94;">Vanguard Properties</li>');
            document.getElementById("listing").innerHTML = vanOut;
        }
        catch(err) {
            console.log(err);
        }
        
    }    
}
catch(err) {
    console.log("Error = " + err);
}
} // main


// alert("Start:");


try {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.setAttribute("id", "XXXXXXXXXXXXXX--sw-test--XXXXXXXXXXXXXX");
	script.textContent =
 						//"\n<!--" + 
 						"\n" + transferComplete.toString() + 
 						"\n" + main.toString() + 
						"\n" + Globals + 
						//"\n-->\n" +
						"\n";
	document.body.appendChild(script);
}
catch(err) {
   alert(err);
}
