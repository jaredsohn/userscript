// ==UserScript==
// @name            Experts Exchange style changes
// @namespace       http://cookingwithgas/annoyance/ee
// @description     Changes styles on the Experts exchange page to show cleartext answers and remove ads.
// @include         http://www.experts-exchange.com/*
// ==/UserScript=

function hideEncoded(){
  var $obj;
  var $divs;
  $obj=document.getElementsByTagName('div');
  for (var i=0;i<$obj.length;i++){
    if ($obj[i].className.match('bcQuestion')){
      $divs = $obj[i].getElementsByTagName('div');
      for(var j=0;j<$divs.length;j++){
        if($divs[j].className.match(/(qTitle)|(qBody)|(clear)/)==null){
          $divs[j].style.display='none';
        }
      }
    }else if($obj[i].className.match('testimonials')){
     $obj[i].style.display='none';
    }else if($obj[i].className.match('sectionFour')){
      var $div;
      $div=null;
      for (var j=0;j<$obj[i].childNodes.length;j++){
        if($obj[i].childNodes[j].tagName){
          if($obj[i].childNodes[j].tagName.match(/div/i)){
            $obj[i].childNodes[j].style.display='none';
            $div=$obj[i].childNodes[j];
            $div.id="hidingID"
          }
        }
      }
      if ($div!=null){
        if($obj[i].childNodes[0].tagName.match(/table/i)){
          $obj[i].childNodes[0].setAttribute("onClick", "showHide()")
        }
      }
    }
  }
}

function addFunction(){
  var $script;
  $script = document.createElement("script");
  $script.type="text/javascript";
$script.text="function showHide(){var $div;$div=document.getElementById('hidingID');if($div.style.display=='none'){$div.style.display='block';}else{$div.style.display='none';}}"
document.body.appendChild($script)

}
addFunction();
hideEncoded();