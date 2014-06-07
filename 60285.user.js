// ==UserScript==
// @name           Avancement des recherches
// @namespace      ikariam
// @include        http://*.ikariam.*/index.php?view=researchAdvisor*
// @include        http://*.ikariam.*/index.php?view=Advisor*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

if(GM_getValue('bienvenu', true))
{
alert("Merci d'avoir téléchargé le script.");
alert("Si vous avez des suggestions, n'hésitez pas à les poster.");
alert("Vous pouvez modifier le nombre de scientifiques/points de recherche par heure à gauche.");
alert("Veuillez notez que cela calculera une >>>approximation<<< du nombre de scientifiques nécésairent pour obtenir ce rendement par heure, et inversement.");
GM_setValue('bienvenu',false);
}

    var nom=new Array();
    var valeur=new Array();
    var get=new Array();

    // On enlève le ?
    param = window.location.search.slice(1,window.location.search.length);

    // On sépare le paramètres....
    // first[0] est de la forme param=valeur

    first = param.split("&");

    for(i=0;i<first.length;i++){
        second = first[i].split("=");
        nom[i] = second[0];
        valeur[i] = second[1];
		get[nom[i]]=valeur[i];
    } //Le tableau nom contient le nom des paramètres et le tableau valeur contient les valeurs de ces paramètres.


mparheure=false;
mscient=false;
/*if(location.toString().search("parheure") != -1)
{
sloc = location.toString();
sparheure = sloc.search("parheure");
parheure = sloc.substr(sparheure+9);
$(".time").text($(".time").text().substr(0,$(".time").text().search(':')+2)+parheure);
$(".time").css("color", "blue");
mparheure=true;
}*/
if(get['parheure'])
{
$(".time").text($(".time").text().substr(0,$(".time").text().search(':')+2)+get['parheure']);
$(".time").css("color", "blue");
mparheure=true;
}
if(get['scient'])
{
$(".scientists").text($(".scientists").text().substr(0,$(".scientists").text().search(':')+2)+get['scient']);
$(".scientists").css("color", "blue");
mscient=true;
}

info1 = $(".scientists").text().substr($(".scientists").text().search(':')+2);
info2 = $(".points").text().substr($(".points").text().search(':')+2);
info3 = $(".time").text().substr($(".time").text().search(':')+2);

if(mparheure || mscient)
{
tparheure = 0;
tscient = 0;
if(get['parheure']){tparheure = get['parheure'].length+1;}
if(get['scient']){tscient = get['scient'].length+1;}
$('.researchLeftMenu').append("<li style='cursor:pointer;position:absolute;' onclick='location.replace(location.toString().substr(0,location.toString().length-9-"+tparheure+"-"+tscient+"));'><b style='position:relative;bottom:26px;left:120px;'>Annuler</b></li><li style='cursor:pointer;position:absolute;' onclick='location.replace(location.toString().substr(0,location.toString().length-9-"+tparheure+"-"+tscient+"));'><b style='position:relative;bottom:77px;left:120px;'>Annuler</b></li>");}
else{$('.researchLeftMenu').append("<li style='cursor:pointer;position:absolute;' onclick='p=prompt(\"Nombre de point de recherche par heure ?\",\""+info3+"\");if(p){s1="+info1+";s2="+info3+";s= Math.round(s1*p/s2);location.replace(location+\"&parheure=\"+p+\"&scient=\"+s);}'><b style='position:relative;bottom:26px;left:120px;'>Modifier</b></li><li style='cursor:pointer;position:absolute;' onclick='p=prompt(\"Nombre de scientifiques ?\",\""+info1+"\");if(p){s1="+info1+";s2="+info3+";s= Math.round(s2*p/s1);location.replace(location+\"&parheure=\"+s+\"&scient=\"+p);}'><b style='position:relative;bottom:77px;left:120px;'>Modifier</b></li>");}

cout=new Array();
if($(".researchPoints:eq(0)")){cout[1] = $(".researchPoints:eq(0)").text();}
if($(".researchPoints:eq(1)")){cout[2] = $(".researchPoints:eq(1)").text();}
if($(".researchPoints:eq(2)")){cout[3] = $(".researchPoints:eq(2)").text();}
if($(".researchPoints:eq(3)")){cout[4] = $(".researchPoints:eq(3)").text();}
info1=info1.replace(",","");
info2=info2.replace(",","")
info3=info3.replace(",","");
if($(".researchPoints:eq(0)")){cout[1]=cout[1].replace(",","");}
if($(".researchPoints:eq(1)")){cout[2]=cout[2].replace(",","");}
if($(".researchPoints:eq(2)")){cout[3]=cout[3].replace(",","");}
if($(".researchPoints:eq(3)")){cout[4]=cout[4].replace(",","");}
//alert(info1);
//alert(info2);
//alert(info3);
//alert(cout1);
//alert(cout2);
//alert(cout3);
//alert(cout4);
for(i=1;i<=4;i++)
{
if($(".researchPoints:eq("+(i-1)+")"))
{
if(cout[i]-info2>0)
{
heure = parseInt((cout[i]-info2)/info3);
minute = parseInt(((cout[i]-info2)/info3-heure)*60);
if(heure>24){jour=parseInt(heure/24)+"j&nbsp;";heure=heure-parseInt(heure/24)*24}else{jour="";}
$(".resources:eq("+(i-1)+")").append("<li>"+jour+heure+"h&nbsp;"+minute+"m</li>");
p1=parseInt(info2/cout[i]*100);
p2=100-p1;
//document.querySelectorAll(".resources")[0].innerHTML+="<li><div style='background-color:#CB9B6A;height:10px;width:"+p12+"px;border-left:"+p11+"px solid #73443E;margin-left:10px;' title='"+p11+"%'><div></li>";
$(".resources:eq("+(i-1)+")").append("<li><div style='background-color:#73443E;height:10px;width:"+p1+"px;float:left;'></div><div style='background-color:#CB9B6A;height:10px;width:"+p2+"px;margin-left:"+p1+"px;'></div><div style='position:relative;bottom:20px;left:102px;'>"+p1+"%</div></li>");
}
}
}