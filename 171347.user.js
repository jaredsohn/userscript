// ==UserScript==
// @name       Facebook Mobile Enhancements
// @version    0.3
// @description Makes using the Facebook Mobile website a better experience for people on underpowered computers/netbooks.
// @include      *m.facebook.com*
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

$(window).load(function() {
    //Get page URL
    var url = location.href;  
    
    //Make photos bigger!    
    
    //Check if photo page
    if(url.indexOf("photo.php") == -1) {    
        $('img').each(function(index, value){
            //Check if image is NOT a video
            var src = $(this).attr('src');
            if(src.indexOf("fbcdn-photos") > -1) {                
                //Remove the sWxH part
				var firstindex = src.indexOf('/s');
                var secondindex = src.indexOf('/', firstindex + 2);
                var sizepart = src.slice(firstindex, secondindex);
                src = src.replace(sizepart, "");
                
                //Do the same for if page picture (For some reason these are seperate)
				var firstindex = src.indexOf('/p');
                var secondindex = src.indexOf('/', firstindex + 2);
                var sizepart = src.slice(firstindex, secondindex);
                src = src.replace(sizepart, "");                
                
                //Replace a.format with n.format
                src = src.replace("a.jpg", "n.jpg");
                src = src.replace("a.png", "n.png");
                src = src.replace("a.gif", "n.gif");
                
                //Change Src to fullsize
                $(this).attr('src', src);
                
                //Change hardcoded width and heights
                $(this).attr('width', "80%");
                $(this).attr('height', "80%");
            }
        });	
    	} else {
        //Photo page
            var fullurl = "";
            
            //Get full image URL from 'view full size' link
            fullurl = $('a:contains("View full size")').attr('href');
           
            //Change image
	        $('img').each(function(index, value){
                if($(this).attr('src').indexOf("fbcdn-photos") > -1) {
                //Change Src to fullsize
			    $(this).attr('src', fullurl);           
                //Change hardcoded width and heights
                $(this).attr('width', "100%");
                $(this).attr('height', "100%");                
                }
            });        
    	}
    
    //Remove video posts (They don't work!)
    $('.story').each(function(index, value) {
        //Check if contain video image
        var html = $(this).html();
        if(html.indexOf("fbcdn-vthumb") > -1) {
            console.log(html);
            $(this).remove();
        }
    });
});