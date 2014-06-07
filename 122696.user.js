// ==UserScript==
// @name           SJ Release Anker
// @namespace      mellow
// @description    Serienjunkies.org - Alle Releases auf einen Blick
// @include        http://serienjunkies.org/*
// @exclude        http://serienjunkies.org/
// ==/UserScript==


GM_addStyle("#boxS { opacity:0.01;font-size:0.8em;align:center !important;left:28%;top:30px;border:1px solid #000 !important;text-align:left !important;background-color:#fff !important;color:#000 !important;font-family:Arial, Times, Times New Roman, sans-serif !important;z-Index:10;position:absolute;width:40%;height:130px;margin-left:auto;margin-right:auto;visibility:visible;overflow: scroll;}");
GM_addStyle(".son_table { margin-bottom:10px !important;border:0px !important;border-collapse:collapse !important;margin-left:auto;margin-right:auto; }");

function show(){
document.getElementById("boxS").style.opacity = "1";
}
function hide(){
document.getElementById("boxS").style.opacity = "0.01";
}



     var theHTML = '';
     theHTML += "<table class='son_table' align='center'><tr><td colspan='3'></td></tr>";
     theHTML += "</table>";
     div1 = document.createElement('div');
     div1.id = 'boxS';
     div1.style.display = "none";
     div1.innerHTML = theHTML;
     document.body.appendChild(div1);


     div2 = document.createElement('div');
     div2.id = 'smm_bgdiv';
     div2.style.display = "none";
     document.body.appendChild(div2);

     document.getElementById('boxS').style.display='block';

     document.getElementById('boxS').addEventListener('mouseover', show,false);
     document.getElementById('boxS').addEventListener('mouseout', hide,false);

     fap = document.getElementById("content");
     rap = fap.getElementsByTagName('p');
     

     for (i=0; i<rap.length;i++){
      if (rap[i].innerHTML.match(/<strong>Format/i)) {
        
        frink = document.createElement('a');
        frink.name = 'wtf'+[i];
        rap[i].appendChild(frink);

        faid = fap.getElementsByTagName('p')[i];
        lef = faid.innerHTML.split("|");
        lef1 = lef[3]+lef[1]+lef[0]+lef[2];

        luenk = document.createElement('a');
        luenk.href = '#wtf'+[i];
        luenk.id = 'linak';
        luenk.class = 'linak';
        tn = document.createTextNode(lef1);
        luenk.appendChild(tn);
        luenk.innerHTML = lef1+'<br>';

        document.getElementById('boxS').appendChild(luenk);
    }
}

