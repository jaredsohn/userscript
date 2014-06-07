// ==UserScript==
// @name            Press Information Bureau Main
// @description     PIB Open links in new tab, Color change on click, make scrollable
// @include         http://pib.nic.in*
// @include         http://www.pib.nic.in*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant           GM_addStyle
// @version         3
// ==/UserScript==
/*- The @grant directive is needed to work around a design change
    introduced in GM 1.0.   It restores the sandbox.
*/




if( window.location.toString() =='http://www.pib.nic.in/'  ) {
  //do nothing
}
else if( window.location.toString() =='http://www.pib.nic.in/newsite/mainpage.aspx'  ) {
  //do nothing
}

else if($.trim(window.location.toString())=='http://www.pib.nic.in/newsite/erelease.aspx?relid=0' ) {

    
    contentreplace();
    makescroll();
    lichangecolor();
}
else {

deletenodes();
}



//------------ function contentreplace()---------------------------//

//Function to replace the Getrelease to the url

function contentreplace(){

//-- Use jQuery selector to get just the <li>s that have an onclick.
var articleLinks    = $("#lreleaseID li[onclick]");

//-- jQuery .each()
articleLinks.each ( function () {
    var jThis           = $(this);  // "this" is a special var inside .each()
    var onClickVal      = jThis.attr ("onclick");
    var articleMatch    = onClickVal.match (/Getrelease\s*\((\d+)\)/i);

    if (articleMatch  &&  articleMatch.length == 2) {
        var articleId   = articleMatch[1];
        var articleUrl  = "http://www.pib.nic.in/newsite/erelease.aspx?relid="
                        + articleId
                        ;

        jThis.attr ("onclick", "window.open('" + articleUrl + "')");
		
    }
} );
}

//---------------- function makescroll()--------------------------//

//Function to change the left side scorllable
function makescroll(){
$('.leftrightdiv').css('height','300px');
$('.leftrightdiv').css('overflow','scroll');
}


//---------------- function lichangecolor() -----------------------//


//li item change color on click
function lichangecolor(){
$("li").click(function(){

$(this).css("color","red");
});
}


//---------------- function deletenodes() ------------------------//
//Function to remove nodes
function deletenodes(){

//delete this for ministry delete
ministry=document.getElementById('minID').parentNode;
ministry.parentNode.removeChild(ministry);

//delete this for newslinks delete
newslins=document.getElementById('relhead').parentNode;
newslins.parentNode.removeChild(newslins);

//delete this for newslinks near by delete
newslinksadj=document.getElementById('relhead').parentNode.parentNode.getElementsByTagName('td')[9];
newslinksadj.parentNode.removeChild(newslinksadj);

}




//----------------------- function $() -----------------------------//

//Function for detecting drop down change
(function($) {
    $.fn.selected = function(fn) {
        return this.each(function() {
            var clicknum = 0;
            $(this).click(function() {
                clicknum++;
                if (clicknum == 2) {
                    clicknum = 0;
                    fn(this);
                }
            });
        });
    }
})(jQuery);


//------------------- Anonymous functions () ----------------------//


//On change of Ministry

$('#minID').selected(function() {

setTimeout(
  function() 
  {
    contentreplace();
    lichangecolor();
  }, 900);
	
});

//On change of Date Drop down
$('#rdateID').selected(function() {
setTimeout(
  function() 
  {
    contentreplace();
    lichangecolor();
  }, 900);
	
});

//On change of Month Drop down
$('#rmonthID').selected(function() {
setTimeout(
  function() 
  {
    contentreplace();
    lichangecolor();
  }, 900);
	
});

//On change of year Drop down
$('#ryearID').selected(function() {
setTimeout(
  function() 
  {
    contentreplace();
    lichangecolor();
  }, 900);
	
});



