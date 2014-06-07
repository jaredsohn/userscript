// ==UserScript==
// @name        nzz
// @namespace   nzz
// @description nzz paywall remover
// @include     http://www.nzz.ch*
// @version     1
// @run-at         document-start
// ==/UserScript==

//alert('nooosio');
function append(s) {	 
      document.head.appendChild(document.createElement('script'))
             .innerHTML = s.toString().replace(/^function.*{|}$/g, '');
}

window.addEventListener('beforescriptexecute', function(e) {

  //e.target.innerHtml = e.target.innerHTML.replace(/articleBodyText\.text\(articleBodyText\.text\(\)\.substr\(0\,\ 300\)\+\'\.\.\.\'\)\;/g, "");
  
  if(e.target.innerHTML.search(/articleBodyText\.text\(articleBodyText\.text\(\)\.substr\(0\,\ 300\)\+\'\.\.\.\'\)\;/g) > -1)
  {
    e.preventDefault();
    e.stopPropagation();
    
    e.target.innerHTML = e.target.innerHTML.replace(/articleBodyText\.text\(articleBodyText\.text\(\)\.substr\(0\,\ 300\)\+\'\.\.\.\'\)\;/g, "");

    append(e.target.innerHTML);
  }
  
  //if(e.target.innerHTML.search(/articleBodyText\.text\(articleBodyText\.text\(\)\.substr\(0\,\ 300\)\+\'\.\.\.\'\)\;/g)> -1)
  //{
    //alert("moto");
  //}
  
  //articleBodyText.text(articleBodyText.text().substr(0, 300)+'...');
  
    ///for inline script:
    /*    if(e.target===document.getElementsByTagName("script")[0]){
            changed++;
            e.stopPropagation();
            e.preventDefault();
            //todo
        }*/
        //tips: you could also run a regex search for the e.target.innerHTML
        //if the position of the inline script is not fixed.


    ///when done, remove the listener:
	//if(changed == 2) window.removeEventListener(e.type, arguments.callee, true);

}, true);


var bidClickTimer       = 0;
var numBidClicks        = 0;

function clickbidBtn1 ()
{
    var interval        = 1500;
    bidClickTimer       = setInterval (function() {BidClick (); }, interval);
}

function BidClick ()
{
    var el = document.getElementById("fancybox-wrap");
    if(el)
    {
      el.parentNode.removeChild(el);
    }

    var el = document.getElementById("fancybox-overlay");

    if(el)
    {
      el.parentNode.removeChild(el);
    }
    //document.getElementById("fancybox-overlay").style.opacity = "0";

    el = document.getElementById("articleBodyText");
    
    if(el)
    {
      el.style.color= "#000000";
    }
}

clickbidBtn1 ();


