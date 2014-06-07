// ==UserScript==
// @name        test
// @namespace   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @description just test
// @include   https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version     1
// ==/UserScript==

function getClib(){
    var clib;
    try{
        clib=unsafeWindow.ClientLib;
    }catch(e)
    {
        alert("can't get clientLib");
        return null;
    }

    if(!clib)
    {
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
    try{
//        button.value=name;
//        button.setAttribute("value",name);
//        button.setAttribute("innerHTML",name);
//        button.setAttribute("label",name);
//        button.setAttribute("name",name);
//        button.setAttribute("text",name);
        button.innerHTML=name;
    }catch(e)
    {
        //do nothing, result is visible
    }
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
    unsafeWindow.lastDialog=dialog;
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
    var dia = unsafeWindow.lastDialog;

    var x = Number(dia.childNodes[0].value);
    var y = Number(dia.childNodes[1].value);
    var vis = getVis();
    vis.CenterGridPosition(x,y);
    document.body.removeChild(unsafeWindow.lastDialog);
    unsafeWindow.lastDialog = null;
}

function createPanel(){
    var panel = document.createElement("div");
    panel.style.position="absolute";
    panel.style.top="0px";
    panel.style.left="127px";
    //panel.style.height="20px";
    panel.style.zIndex="100";
    panel.style.display="block";
    panel.style.borderColor="#DCDCDC";
    panel.style.borderStyle="solid";
    panel.style.borderWidth="5px";
    panel.style.backgroundColor="#881515";
    document.body.appendChild(panel);
//    createButton('Test', test,panel);
//    createButton('Targets',tryBase,panel);
//    createButton('Range',rangeTest, panel);
    createButton('Navigate', navigate,panel);
}

createPanel();