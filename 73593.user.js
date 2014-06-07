// ==UserScript==

// @name           Open_Bags

// @namespace      *www.tmgame.ru*

// @include        http://*tmgame.ru/game.php*

// ==/UserScript==

var divPr;

var actions;

var tpActions;





(function(){



   setInterval(refresh,10000);

}

)();



function refresh(){







   GM_xmlhttpRequest({

      method: 'GET',

      //  url: 'http://www.tmgame.ru/xml/persxml.php',

      url: 'http://www.tmgame.ru/xml/bpxml.php?'+rand(1000,9999),

      headers: {

         'User-agent': 'Mozilla/4.0 (compatible)',

         'Accept': 'application/atom+xml,application/xml,text/xml',

      }

      ,

      onload: function(responseDetails) {

         var parser = new DOMParser();

         var resp=responseDetails.responseText;

         var bstop=false;

         var ind=0;

         var lastInd=20;

         var debug=0;

 

         //      resp=resp.replace(/(link\=[\"\'][\s\S]*)\=([\'\"])/,"$1!$2");

        

         while(bstop==false)

         {

            ind= resp.indexOf('link=',lastInd);

            debug+=1;

            if (debug>300){

               bstop=true;

            }

            if (ind==-1){

               bstop=true;

               break;

            }

            ind+=6;

            lastInd=resp.indexOf('"',ind+1);

            if (lastInd==-1){

               bstop=true;

               break;

            }

            for (var q=ind;q<=lastInd;q++){

               if (resp.charAt(q)=='='){

                  resp=resp.slice(0,q)+'!'+resp.slice(q+1);

               }

               if (resp.charAt(q)=='&'){

                  resp=resp.slice(0,q)+'@'+resp.slice(q+1);

               }

            }

         }

         /**/

        

         var dom = parser.parseFromString(resp,"application/xml");

         var items = dom.getElementsByTagName('item');

         actions = dom.getElementsByTagName('action');

         tpActions = new Array();

         var art_id = new Array();

         var str='';

		



         openBags();

		}

	})

}





function openBags(){

   var link;

   for (var q=0;q<actions.length;q++){

      link=normalize(actions[q].getAttribute("link"));

      if(link.indexOf('aid=1962')>0){

         GM_xmlhttpRequest({

            method: "GET",

            url: 'http://www.tmgame.ru/'+link,

            onload: function(responseDetails)

            {

            }

         }

         );

      }

      //ЛЮКШИ РПНККЭ

      if(link.indexOf('aid=1496')>0){

         GM_xmlhttpRequest({

            method: "GET",

            url: 'http://www.tmgame.ru/'+link,

            onload: function(responseDetails)

            {

            }

         }

         );

      }

      //АНКЭЬНИ РПНККЭ

      if(link.indexOf('aid=4902')>0){

         GM_xmlhttpRequest({

            method: "GET",

            url: 'http://www.tmgame.ru/'+link,

            onload: function(responseDetails)

            {

            }

         }

         );

      }

      //ДПЕБМХИ РПНККЭ 4902

      if(link.indexOf('aid=4921')>0){

         GM_xmlhttpRequest({

            method: "GET",

            url: 'http://www.tmgame.ru/'+link,

            onload: function(responseDetails)

            {

            }

         }

         );

      }

   }

}



function rand(Min,Max){

   var iMin=parseInt(Min);

   var iMax=parseInt(Max);



   return (Math.floor(((Math.random()*(iMax-iMin+1))+iMin)));

}



function normalize(link){

   var lnk=link;

   for (var q=0;q<=lnk.length;q++){

      if (lnk.charAt(q)=='!'){

         lnk=lnk.slice(0,q)+'='+lnk.slice(q+1);

      }

      if (lnk.charAt(q)=='@'){

         lnk=lnk.slice(0,q)+'&'+lnk.slice(q+1);

      }

   }

   return(lnk);

}
