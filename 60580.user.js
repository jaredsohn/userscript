// ==UserScript==
// @name          ResizeImg
// ==/UserScript==


window.onresize=resize;

function resize()
{
    var myWidth = 0; 
    var myHeight = 0;
    var Width = 2048, Height= 1536;
    var AspectRatioImg = Width / Height; 
    
    var img = document.getElementById("the_image");

    
    if( typeof( window.innerWidth ) == 'number' ) 
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } 
    else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
    {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } 
    else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
    {
        //IE  compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

  var AspectRatioWindow = myWidth / myHeight;
  
  if (AspectRatioImg < AspectRatioWindow) {
  	 img.width = myWidth;
     img.height = myWidth / AspectRatioImg; 
  }
  else{
     img.width = myHeight * AspectRatioImg;
     img.height = myHeight;
  }
  
  
}
