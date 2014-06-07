// ==UserScript==
// @name       eg24_fixer
// @namespace  junkus
// @version    0.1
// @description  remove subpar game authors from eg24
// @match      http://www.escapegames24.com/*
// @copyright  2012+, You
// ==/UserScript==

if (document.addEventListener){
  document.addEventListener("DOMContentLoaded", durf(), false);
}

function durf() {
    if(typeof unsafeWindow.jQuery == 'undefined'){
      var jq = document.createElement('script');
      jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js";
      document.getElementsByTagName("head")[0].appendChild(jq);
    }
}

function eg24fix(){
    if(!$.ready){
        setTimeout(eg24fix,100);
        return;
    }
    $('.post-body').each(
        function(){
            var $this=$(this);
            if($this.text().toLowerCase().match(/(mousecity|defygames|games2attack|infoweb|games4king|evillemon|gazzyboy|ena games|gillygames|selfdefiant|pencilkids|yotreat|abroy|games2world|gamesnovel|yoopygames|yeahgame|mixgames1|games2rule|ainars|myhiddengame|123bee|mougle|inkagames|esklavos|d(r|octor)\.?\sfou|wowescape)/g)){
                $this.closest('.post').remove();
            }
        }
    );
    $('.post-title').each(
        function(){
            var $this=$(this);
            if($this.text().toLowerCase().match(/(random game|goodgame|ourworld)/g)){
                $this.closest('.post').remove();
            }
        }
    );
}

eg24fix();