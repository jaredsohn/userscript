// ==UserScript==
// @name        blogscout
// @namespace   *
// @description blogscout searches for blogs on the current site and displays a tooltip with links to blogs on the upper right side of your browserwindow
// @version     1
// ==/UserScript==

//////////////////////////////
/  blogscout client version  /
//////////////////////////////


if (window.top != window.self){
    return;
}

//get name of host
var host = document.domain;
host = host.substring(0,host.lastIndexOf('.'));
host = host.substring(host.lastIndexOf('.')+1);

//get all links
var links = document.getElementsByTagName("a");

//get the urls
var urls = new Array();
for(var i=0;i<links.length;i++){
    urls.push(links[i].href);   
}


//
//parse urls
//

var url = "",urlHost="", segments = new Array();
var excludeDomains = "flickr,wikipedia,google,amazon,vimeo,facebook,youtube,blogger,feedburner,twitter,blogs,stackexchange,wordpress";

//cutoff protocol,dirs(second and higher),params and filter out urls which point to the current host
for(var i=0;i<urls.length;i++){
    
    url ="";

    //segment url
    segments = urls[i].split('/');
    url += segments[2];
    if( !(segments[3] === undefined) && segments[3].indexOf('blog') != -1 ) {
        url += '/' + segments[3];
    }
    
     //skip if url is invalid
    if(segments[0] != 'http:'){
        urls[i] ="";
        continue;
    }
    
    //host of current url
    urlHost = segments[2].substring(0,segments[2].lastIndexOf('.'));
    urlHost = urlHost.substring(urlHost.lastIndexOf('.')+1);
    
    //exclude common domains
    if( excludeDomains.indexOf(urlHost) != -1){
        urls[i] ="";
        continue;
    }
    
    //cutoff 'www.'
    if(url.indexOf('www.') != -1){
        url = url.replace('www.','');
    }
    
    //cutoff params
    if(url.indexOf('?') != -1){
        url = url.substring(0,url.indexOf('?'));
    }
    
    if(url.indexOf('#') != -1){
        url = url.substring(0,url.indexOf('#'));
    }
    
    //filter out urls that point to the current host
    if( segments[2].indexOf(host) != -1 ){
        url ="";
    }
    
    urls[i] = url;    
}



//
// get the blogurls and add 10 other urls to outtakes
//

var blogs = new Array(),outtakes = new Array();
var counter = 0;

for(var i=0;i<urls.length;i++){
    if(urls[i] != ''  ){
        if(urls[i].indexOf('blog') != -1 && blogs.indexOf(urls[i]) == -1){
            blogs.push(urls[i]);
        }else if(outtakes.indexOf(urls[i]) == -1 && blogs.indexOf(urls[i]) == -1){
            outtakes.push(urls[i]);
        }
    }
}


//
//exit if no valid blogs had been found
//

if(blogs.length == 0){
    return;
}


//
//generate the html for the blogurls and outtakesurls
//
var htmlBlogs="",htmlOuttakes="";

htmlBlogs += "<div class='blogscoutCategorie'>BLOGS:</div>";
for(var i=0;i<blogs.length;i++){
    htmlBlogs += "<a href='http://" + blogs[i] + "'>" + blogs[i] + "</a><br />";
}

//10 random outtakes
htmlOuttakes += "<div class='blogscoutCategorie'>OUTTAKES:</div>";
var counter = 0,randomIndex, usedIndexes = new Array();
while(counter < 10 && counter != outtakes.length)
{
   randomIndex=Math.floor(Math.random() * outtakes.length +1)
   
   if(usedIndexes.indexOf(randomIndex) == -1){
        usedIndexes.push(randomIndex);
        counter++;
        htmlOuttakes += "<a href='http://" + outtakes[randomIndex] + "'>" + outtakes[randomIndex] + "</a><br />"; 
   }
}




//
//create GUI
//


//create the GUIcontainer
var blogscoutContainer = document.createElement('div');
blogscoutContainer.id = "blogscout";
blogscoutContainer.className = "blogscouthidden";


//create blogsContainer and outtakesContainer
var blogscoutBlogsContainer = document.createElement('div');
var blogscoutOuttakesContainer = document.createElement('div');

//set html of the blogurlsContainer and outtakesContainer and append it to the blogscoutContainer
blogscoutBlogsContainer.innerHTML = htmlBlogs;
blogscoutOuttakesContainer.innerHTML = htmlOuttakes;
blogscoutContainer.appendChild(blogscoutBlogsContainer);

if(outtakes.length > 0){
    blogscoutContainer.appendChild(blogscoutOuttakesContainer);
}

//show GUIcontainer
document.body.appendChild(blogscoutContainer);
setTimeout(function(){
    blogscoutContainer.className = 'blogscoutfadein';
}, 1500); //CSS3 fade in effect   

     
//add a close Button
var cButtonContainer = document.createElement('div');
cButtonContainer.id = 'blogscoutButtonContainer';
var cButton = document.createElement('div');
cButton.id = 'blogscoutButton';
cButton.innerHTML = 'close';
        
cButtonContainer.appendChild(cButton);        
blogscoutContainer.appendChild(cButtonContainer);
        
cButton.onclick = function(){
   document.getElementById("blogscoutButton").className = 'blogscoutButtonClick';
   setTimeout(function(){
       document.getElementById("blogscoutButton").className = 'blogscoutButtonRelease';
   }, 200);
   setTimeout(function(){
       blogscoutContainer.className='blogscouthidden';//CSS3 fade out effect
   }, 500);        
}  



//------- CSS --------------------------------------//

GM_addStyle( '#blogscout' 
        + '{'
        + 'border: 1px solid black;'
        + 'padding:20px;'
        + 'padding-bottom:20px;'
        + 'padding-top:30px;'
        + 'z-index:10000;'
        + 'font-size:15px;' 
        + 'background-color:grey;'
        + 'position:absolute;'
        + 'top:25px;'
        + 'right:25px;'
        + 'text-align:left !important;'
        + '}'
);

GM_addStyle( '.blogscoutCategorie' 
        + '{'
        + 'margin-top:15px!important;'
        + 'margin-left:-5px!important;'
        + 'border:none!important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:white !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:none !'
        + '}'
);

GM_addStyle( '#blogscout'
        + '{'
        + '-moz-box-shadow: 3px 3px 4px grey;'
        + '-webkit-box-shadow: 3px 3px 4px grey;'
        + 'box-shadow: 3px 3px 4px grey;'
        + '-moz-border-radius: 8px;'
        + '-webkit-border-radius: 8px;'
        + ' border-radius: 8px;'
        + '}'
);

GM_addStyle( '.blogscoutButtonClick'
        + '{'
        + 'position:relative;'
        + 'top:1px;'
        + '}'
);

GM_addStyle( '.blogscoutButtonRelease'
        + '{'
        + 'position:relative;'
        + 'top:0px;'
        + '}'
);

GM_addStyle( '#blogscoutButtonContainer'
        + '{'
        + 'font:normal normal normal 15px arial;'
        + 'color:white;'
        + 'background-color:grey;'
        + 'text-decoration:none;'
        + 'position:absolute;'
        + 'top:7px;'
        + 'right:10px;'
        + 'cursor:pointer;'     
        + '}'
);

GM_addStyle( '#blogscoutButton:hover'
        + '{'
        + 'color:lightgrey;'
        + '}'
);


GM_addStyle('#blogscout a'
        + '{'
        + 'border:none!important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:white !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:none !important;'
        + '}'
);

GM_addStyle('#blogscout a:visited'
        + '{'
        + 'border:none!important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:white !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:line-through !important;'
        + '}'
);

GM_addStyle('#blogscout a:hover'
        + '{'
        + 'border:none !important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:lightgrey !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:none !important;'
        + '}'
);

GM_addStyle('#blogscout a:focus'
        + '{'
        + 'border:none !important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:white !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:none !important;'
        + 'outline: 0;'
        + '}'
);

GM_addStyle('#blogscout a:active'
        + '{'
        + 'border:none !important;'
        + 'position: relative !important;'
        + 'top: 1px !important;'
        + 'font:normal normal normal 14px/20px arial !important;'
        + 'color:white !important;'
        + 'background-color:grey !important;'
        + 'text-decoration:none !important;'
        + 'outline: 0 !important;'
        + '}'
);

GM_addStyle( '.blogscouthidden'
        + '{'
        + 'opacity:0;'
        + 'transition: opacity 0.5s ease-in-out;'
        + '-moz-transition: opacity 0.5s ease-in-out;'
        + '-webkit-transition: opacity 0.5s ease-in-out;'
        + '}'
);

GM_addStyle('.blogscoutfadein'
        + '{'
        + 'opacity: 1;'
        + 'transition: opacity 0.5s ease-in-out;'
        + '-moz-transition: opacity 0.5s ease-in-out;'
        + '-webkit-transition: opacity 0.5s ease-in-out;'
        + '}'
);

//-----------------------------------------------------------------------------//

return;
