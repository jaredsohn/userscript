// ==UserScript==
// @name        OGame: highscore tune
// @namespace   Monster
// @description Rows' tuner
// @include     http://*.ogame.*/game/index.php?page=highscore
// @grant       none
// @version     0.005
// ==/UserScript==

const msrDEBUG = true;

function Planets(){
	var t = this;
    var w; // window ref

	if((typeof unsafeWindow) != "undefined") {
		w = unsafeWindow;
	}
	else {
		w = window;
	}

    t.MinDistance = function (coords) {
        var res=Number.MAX_VALUE;

		coords = coords.split(':');
		galaxy = parseInt(coords[0],10);
		system = parseInt(coords[1],10);
		planet = parseInt(coords[2],10);
        return 0;
        for(i=0;i<t.List.length;i++)
            {
            if (t.List[i].galaxy=galaxy)
                {
                d=Math.abs(t.List[i].system-system);
                if (d<res)
                    {
                    res=d;
                    }
                }
            }
        if (res==Number.MAX_VALUE)
            {
                res=" ";
            }
        return res;
    };

    t.Init = function(){
        t.List=[];
        var nodes = document.getElementById("planetList").getElementsByTagName("DIV");
        for (i=0;i<nodes.length;i++)
            {
            var tmp = nodes[i].getElementsByTagName("SPAN");
        	var name = tmp[0].innerHTML;
            var coords = tmp[1].innerHTML;

			var type = 1;
			coords = coords.substring(1,coords.length-1).split(':');
			var res = {
				galaxy: parseInt(coords[0],10),
				system: parseInt(coords[1],10),
				planet: parseInt(coords[2],10),
				type: type,
				name: name
				};
            t.List[i]=res;            
            };
    };
}

function HSTune (){
	var t = this;
    var w; // window ref

	if((typeof unsafeWindow) != "undefined") {
		w = unsafeWindow;
	}
	else {
		w = window;
	}

   t.TuneRow = function (Row){
        c = Row.insertCell(2);
        name_refs = Row.cells[3].getElementsByTagName("A");
        if (name_refs.length>0)
            {
            name_ref = name_refs[name_refs.length-1];
            
            txt = String.split(name_ref.href,"?")[1];
            parts = String.split(txt,"&");
            pos = "";
            sep = "";
            for (j=1;j<4;j++)
                {
                str = String.split(parts[j],"=")[1];
                pos=pos+sep+str;
                sep=":";
                }
            
            c.innerHTML = "<span>" + t.Planets.MinDistance(pos) + "  </span><a href=" + name_ref + ">[" + pos + "]</a>";
            }
   };

   t.TuneRows = function (){
    
        table = document.getElementById('ranks');
        for (i=0;i<table.rows.length;i++)
            {
                t.TuneRow(table.rows[i]);
            }
    };

    t.Init = function (){
        t.Planets = new Planets();
        t.Planets.Init();
    };

} // HSTune

// run us
var MHS = new HSTune();
MHS.Init();
MHS.TuneRows();

// for debug time only
if (msrDEBUG) {
    unsafeWindow.MHS = MHS;
}

