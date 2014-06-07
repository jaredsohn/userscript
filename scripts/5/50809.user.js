// ==UserScript==
// @name               AE
// @namespace          AE.net
// @description        ...
// @include            http://*.astroempires.com/*
// ==/UserScript==

var server;
exe();


//=== Execution =============================================================::
function exe(){
  server=document.location.href.match(/([a-z]+?).astroempires/)[1];
  if (window.location.pathname == "/empire.aspx")
  {
      if(document.location.href.match(/empire.aspx$/))
      {
        //bases_events
      }
      else
      {
          if (document.location.href.match(/view=(.+?)$/)[1] == "bases_capacities") {
            _bases_capacities();
          }
      }
  }
}
//===========================================================================::

//=== Module:Capacities =====================================================::
function _bases_capacities(){
    var strFromOpen="→<font color='white'><b>";
    var strFromClose="</b></font>";  

    var element = document.getElementsByTagName('TR')

    var consCap=parseInt(element[element.length-2].childNodes[4].childNodes[0].innerHTML);
    var prodCap=parseInt(element[element.length-2].childNodes[5].childNodes[0].innerHTML);
    var consAdj=0;
    var prodAdj=0;

    //console.log(consCap);
    //console.log(element[element.length-2].childNodes[5].childNodes[0].innerHTML);

    for(i = 0;i < element.length-1;i++)
    {
        if(element[i+1].firstChild.className=="help comment")
        {
            var search_com=element[i+1].innerHTML.match(/Base Commander: (.+?)\x28(.+?) (.+?)\x29/);

            var ConsNode=element[i].childNodes[4].innerHTML;
            var ProdNode=element[i].childNodes[5].innerHTML.match(/(.+?) \x28(.+?)\x29/);

            if(search_com!=null)
            {
                var name=search_com[1];
                var type=search_com[2];
                var level=search_com[3];

                if (type == "Production")
                {
                    var m=(ProdNode[1]*(1+level/100));
                    var builder="";
                    //console.log(m);
                    
                    builder+=ProdNode[1];
                    builder+=strFromOpen;
                    builder+=m.toFixed(0);
                    builder+=strFromClose;
                    builder+=" ("+ProdNode[2]+")";

                    element[i].childNodes[5].innerHTML=builder;
                    prodAdj+=m-ProdNode[1];
                    console.log(prodAdj);
                } // end production
            } // end if search_com
        } // end if help
    } // end for

    element[element.length-2].childNodes[5].innerHTML+=strFromOpen+(prodCap+prodAdj).toFixed(0)+strFromClose;
}
//===========================================================================::
