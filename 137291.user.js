// ==UserScript==
// @name        Don't install it !!!! It is not working, it is for testing!!!
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description  Don't install it !!!! It is not working, it is for testing!!!
// @include   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1.01
// ==/UserScript==

function getWindow(){
    var isGreaseMonkey = (typeof unsafeWindow)!="undefined";
    if(isGreaseMonkey){
        return unsafeWindow;
    }else{
        return window;
    }
}

function getClib(){
    var clib;
    try{
        clib=getWindow().ClientLib;
        if(!clib ){

            clib = window.ClientLib;
        }

    }catch(e)
    {
        alert("can't get clientLib");
        return null;
    }

    if((typeof (getWindow().ClientLib))=="undefined")
    {
        var unsafing = document.getElementById("unsafing");
        if((typeof unsafing.clib)!="undefined"){
            return unsafing.clib;
        }
        alert("clib is undefined");
    }
    return clib;
}
function getMyCities(){
    var cities =getData().get_Cities().get_AllCities();
    return cities.d;
}

function getWorld(){
    var world = getData().get_World();
    return world;
}
function getData(){
    return getClib().Data.MainData.GetInstance();
}

function getNearestTargets(city){
    var world = getWorld();
    var x = city.get_X();
    var y = city.get_Y();
    var offset = 7;
    var msg = ""+city.get_Name()+"("+x+","+y+")\n";
    var types=["0","1","N","E","@"];
    for(var cy = y - offset; cy < y+ offset;cy++){
        for(var cx = x-offset; cx < x+offset;cx++){

            var kind = types[world.GetTerritoryTypeByCoordinates(cx,cy)];
            var attack;
            try{
                attack = world.CheckAttackBase (cx , cy);
            }catch(e){
                //alert('err!');
            }

            if(attack && (attack == attack.OK)){
                msg+="["+(x-cx)+","+(y-cy)+"]\n";
            }
          //  var water = world.IsWater(cx,cy) ? 'W':'_';
          //  var blocked = world.IsBlocked(cx,cy) ? '#':'_';
            //msg+=""+kind;//+water+blocked;
        }
        msg+="\n";
    }
    alert(msg);
}
function test(e){
    var clib=getClib();
    var citiesData = getMyCities();
    var counter = 0;
    var msg = "";
    for (var cityFname in citiesData){
        var city = citiesData[cityFname];
        var level = city.get_BaseLevel();
        var name = city.get_Name();
        counter++;
        msg+="'"+name+"':"+level+"\n";
        try{
            city.setResourcesToMax();
        }catch(e)
        {
            alert('cannot exec that func');
        }
    }
    msg = "CITIES:"+counter+"\n"+msg;
    alert(msg);
}

function rangeTest(){
    var world = getWorld();
    world.SetRange(true,true,0,0,10,10);
    alert('finished');
}


function createButton(name, handler, par){
    var button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("id", "myButton"+Math.random().toString().substr(2));
    button.innerHTML=name;
    button.addEventListener("click", handler);
    button.style.height="100%";
    button.style.margin = "2px";
    par.appendChild(button);
}
function tryBase(){
    var cities = getMyCities();
    for(var cityFname in cities){
        var city = cities[cityFname];
        getNearestTargets(city);
    }
}

function navigate(){
    createDialog(["x","y"], processNavigateDialog);
}
function processNavigateDialog(){

}
function createDialog(fields, handler){
    var dialog = document.createElement("div");
    dialog.style.position="absolute";
    dialog.style.top="30px";
    dialog.style.left="127px";
    dialog.style.zIndex="100";
    dialog.style.display="block";
    dialog.style.borderColor="#DCDCDC"
    dialog.style.borderStyle="solid";
    dialog.style.borderWidth="5px";
    dialog.style.backgroundColor="#881515";
    document.body.appendChild(dialog);
    getWindow().lastDialog=dialog;
    for(var i=0; i < fields.length;i++){
        var inputName = fields[i];
        //var element = document.createElement("div");
        var element = document.createElement("input");
        element.style.margin="2px";
        //var br = document.createElement("br");
        dialog.appendChild(element);
        //dialog.appendChild(br);
    }
    var commit = document.createElement("button");
    commit.innerHTML="Navigate!";
    commit.style.margin="2px";
    commit.addEventListener("click", doNavigate);
    dialog.appendChild(commit);
}
function getVis(){
    var clib = getClib();
    return clib.Vis.VisMain.GetInstance();
}
function doNavigate(){
    var dia = getWindow().lastDialog;

    var x = Number(dia.childNodes[0].value);
    var y = Number(dia.childNodes[1].value);
    var vis = getVis();
    vis.CenterGridPosition(x,y);
    document.body.removeChild(getWindow().lastDialog);
    getWindow().lastDialog = null;
}

function createPanel(){
    var panel = document.createElement("div");
    panel.style.position="absolute";
    panel.style.top="0px";
    panel.style.left="127px";
    panel.style.zIndex="100";
    panel.style.display="block";
    panel.style.borderColor="#DCDCDC";
    panel.style.borderStyle="solid";
    panel.style.backgroundColor="#881515";
    document.body.appendChild(panel);
    createButton('Navigate', navigate,panel);
}
if(getWindow().ClientLib){
    createPanel();
}
else
{
    var mycode = document.createElement("script");
    mycode.src = "http://userscripts.org/scripts/show/137291.user.js";
    document.body.appendChild(mycode);
}


