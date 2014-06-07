// ==UserScript==
// @name           SJ JDownloader C'n'L
// @description    Click'n Load Buttons ersetzen die Links für einzelne Folgen
// @include        http://serienjunkies.org/*
// @exclude        http://serienjunkies.org/
// ==/UserScript==

function startcnl (e) {
trckO = document.getElementsByClassName('seasonTitle')[0];
if (trckO){
margin1 = 'margin-left:-11px; margin-top:-18px;';
margin2 = 'margin-left:-20px;';
}else{
margin1 = 'margin-left:31px; margin-top:-18px;';
margin2 = 'margin-left:160px; margin-top:-18px;';
}


jdimg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAACXBIWXMAAG66AABuugHW3rEXAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAATbSURBVHjaXJRbbFMFAIa/c217tq5dt7Vj3U03x4bDuERDEJCIiqKIt2CCqEGNqFHniyKJqNGgPpio0QejxktAwagBAcGMiDJBDSBT2dgFcOwSGNvabm1P23N6bj4YMfF7+p/+py+f0Dt4GoDqqgpUVSWdzTB8Zlg+1vP7wt7B04tnzvc3v/WUf7qpUf3tzFjrT6eF66baGkup1UaRtRB4XET+d0iShE/xcbD78G3vb/nsuVMjo4s8XFxg3etFtj5fJOT9OjZ4PPVevGrNO1KZkud/CH/0DyHLMvFopfzc5pc+/fzbA2v9WikV5QqC6NJy5RSmk0UcruKb10T6jvzBu93zet/c+Pi9kdq5fdjFi2fSq5s3EwoGhSc2vrg9GdyyZvHNKnOaFfCp+DQJT/AIltl0H1Io9dVy16owo/1/xrKTQ7fPbb70W6RwEtsA10aMhENs/WJX58HBnffcd6dE5+pJKqt9BCpUSiIiY6MN9By6FJ8/zNauFMlcG7cvCVETmoknR7o+Ppuql84XWjmXb0Fa/1hn+Nm3n/ny0afHSxa0wMiFKhQXli4cR/c0hgZqwLYRnCJjkzqN8SjXdRSJaBlGpjP1+4/F+qrrWvtnM0XEr3bvu7WlYyh6fYeNKogMn4swrzXHd0cWcKB7EWpAQZAEEAREQeDH41lcrRHbLuA4Arv37Xh4aKifs8OnEY/3HbulrMJiMqHhygVKyuCFbes5OnANkqrgCeB6/xigqBJ/Dk6QyGqoqszESIHxqYl5VtEsUX0qct/gicWKG6H74OU0dcBoYgGqT0QoTOPkdWyjgGNbOLaFAJyfSvLXSDmLLglypHeGdN6LfLN7Z4WqqDnZLgiuOaEgSzrDfVUEK0fRZ0vw7CJ2QcfSM9iGgW3ZmKZFW7WCJrug+CgLebiC5HrgeYDcPrfll68PXGhsaDdQwpOY6Sy5ZBg8AYo6dl7HLpq4joNrGDy5ppzSUg9H0GiOe4RCkdmblq9I+fx+xPltrXtF2yI1XmTZkgHW3/cTK285REAeJpdIY2YKOIUC6Zkcq5f6ufsGjfyMiWn7mRMxqa+MnDQsLyc5OuKqW1fsra2qnDDzGfSkRTbh0FA1xfLl/TReNkaoPI1ZLHBFHbywPoKSK/BD1xTnEwpzYiKPrOz4sKl0kvlKD9KmTZtMx7GK+78/vCI9W4IWsnAMAa8A8Zoc0ViGiAqb19XQ3ljkq51JHn8ny21Ly2irT1ApBd5ndiIVkJyoUMgbWLbFuief/mzH3u/XRuMq86+aobbaQM9BwPDx0JI6Lm9w6e/Jsf2wTiAs8uAd1bTEzpEZK0y7KVvU/dd+JHV2diJJEosWXL3n5MneulOnpq6cnFQIyBbNio/V84LUluQ5+HOOjVscblpWxssb/ERCBkbaQ8rrJbYhu17DA/dLGzZsAMAwTTdeU7MrLCR62rWzjcvmFOML456Qz5l83OXy5n4fSVMb7x8OvtJee8UnsdDMjZKd8lspHTt859uhS27YcbFnruti2TZNddE9WjCyR3bFtg+60k0/nxFiOmUZLSCPl+KcrI+FsnkzyokTrSdivtltAcNsuSBWv6EMHfkvjv9i2Q6m5eEI6sDINAMzukd5hYAsguuC63lIooPlKAM/HI3dGK1qu9YUxhN4Nn8PABmZPIb+VDZ1AAAAAElFTkSuQmCC";

var chk = "";
    chk += "<iframe name='jd' src='' height='1px' width='1px' scrolling='no' style='background-color:transparent;'></frame>";
var ceck = document.createElement('div');
    ceck.id = 'bchk';
    ceck.style.display = "block";
    ceck.innerHTML = chk;
    document.body.appendChild(ceck);

function Jdown(){
    var text = "";
    GM_xmlhttpRequest({
    method: "GET",
    url: "http://127.0.0.1:9666/flash/",
    onload: function(response) {
    if(response.responseText != null){


GM_addStyle("#speck {  z-Index:20;border:none; text-align:left;background-color:transparent;color:#000;font-family:Georgia, Times, Times New Roman, sans-serif; !important;display:block;position:absolute; width='200px'; "+margin1+"}");
GM_addStyle("#dpeck {  z-Index:15;border:none; text-align:left;background-color:transparent;color:#000;font-family:Georgia, Times, Times New Roman, sans-serif; !important;display:block;position:absolute; width='10px'; "+margin2+"}");
GM_addStyle("#bpeck {  z-Index:14;border:none; text-align:left;background-color:transparent;color:#000;font-family:Georgia, Times, Times New Roman, sans-serif; !important;display:block;position:absolute; width='10px'; margin-top:-17px;}");
GM_addStyle(".jdbtn {  z-index:3;background-image: url("+jdimg+"); width:15px; height:19px; background-color:transparent; color:1f3937; background-repeat:no-repeat; border:none;}");
GM_addStyle(".jdbck {  z-index:2;width:40px; height:17px; background-color:#a7c0de; background-repeat:no-repeat; border:none;}");
GM_addStyle(".jdbrd {  z-index:4;width:40px; height:17px; background-color:transparent; background-repeat:no-repeat; border:2px #cbe3ff solid; cursor:pointer; font-size:9px;}");

 if(location.href.match(/\bstaffel\b|\bseason\b/g)){

     fap  = document.getElementById('content');
     tabs = fap.getElementsByTagName('a');
     
     for (var i=tabs.length - 1; i>=0; i--){

                var Ergebnis = tabs[i].href.match(/\bdownload\b|\bf-\b/g);
              


                if (Ergebnis){


                            var foam = '';
                                foam += "<input type='submit' style='min-width:20px' class='jdbtn' name='submit' value=''></form>";
                            var div1 = document.createElement('div');
				div1.id = 'speck';
				div1.style.display = "block";
				div1.innerHTML = foam;
                    
                            var soam = '';
                                soam += "<input type='submit' style='min-width:20px' class='jdbck' name='submit' value=''></form>";
                            var beck = document.createElement('div');
				beck.id = 'dpeck';
				beck.style.display = "block";
				beck.innerHTML = soam;

                            var boam = '';
                                boam += "<form action='http://127.0.0.1:9666/flash/add' target='jd' method='post'><input type='hidden' name='source' value='http://jdownloader.org/spielwiese'><input type='hidden' name='urls' value='"+tabs[i]+"'><input type='submit' style='min-width:20px' class='jdbrd' name='submit' value='JD'></form>";
                            var bord = document.createElement('div');
				bord.id = 'bpeck';
				bord.style.display = "block";
				bord.innerHTML = boam;


                                beck.appendChild(bord);
                                beck.appendChild(div1);

                              tabs[i].parentNode.insertBefore(beck, tabs[i]);

                             }
  }
 }
window.clearInterval(check);
}
}
});
}

check = setInterval(Jdown, 1000);

}


document.addEventListener("DOMContentLoaded", startcnl, false);