// ==UserScript==
// @name           GLB Replay Graphics testttttttt
// @namespace      sants + mw54finest + SNAITF
// @description    Replaces the stock GLB Replay graphics with improved animated .gifs.
// @include        http://goallineblitz.com/game/replay.pl?* 
// ==/UserScript==

window.setTimeout( function()
{



var allDivs, thisDiv, id;
var fronto = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIGAN7/AN64l94AAN7//0cA/wAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAGACwA' +
   'AAAAGAAYAAADXGi6bAKiyanEszTXGzUVQdh5DGGGgUmQinq6qzfANDnctDnYQ0rfLBQtxDKgfKeiohe4MZXOKLEYNTiVVmBWy7ouubzdV1zELM3FQmEzwrLdDDTc0YYX5G71ep' +
   'IAACH5BAUUAAYALAAAAAAYABgAAANdaLpsAqLJqcSzNNcbNRVB2HkMYYaBSZCKerorCc8DOczmoNv3HOyekC/EMqRUqEDR+NOFasunbgotTg3UZRYLZF0VX283TLJUMUsHulBI' +
   'q0fuTZyBnlvacwMbr0kAADs">';
var frontd = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIFAN64l94A3t7/AN4AAAAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAFACwA' +
   'AAAAGAAYAAADXVi6XEGhyanCszTXGzUNQNh5zGCGgDmQinq6KwnPAinMpqDb9wzsnpAvxCqkVChA0fjThWrLp24KLU4L1GUWC2RdFV9vN0yyVDFLB5pASKtH7k2cgZ5b2vMCG6' +
   '9JAAAh+QQFFAAFACwAAAAAGAAYAAADXFi6XEGhyanCszTXGzUNQNh5zGCGgDmQinq6qyfANCnctCnYQkrfLBQtxCqgfKeioge4MZXOKLEYLTiVVmBWy7ouubzdV1zELM1FAmEz' +
   'wrLdDDTc0YZD6lj1epIAADs=">';
var backo = '<img src="data:image/gif;base64,R0lGODlhEAAeALsAAP///wAAAWBgYKCgoP8AAODg4JMGBoBAAOCggKioqAAAAAAAAAAAAAAAAAAAAAAAACH5BAUZAAoAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAeAAAEjhDImUiaOI9CysigMASDAGZkegJE674EBs/tNBgGbXgSctwzw+Bw6B0COZghcEAYAYEg0wkgFqJKYlHCFBS+34DptAF7SKHyYL1GY0RrgTweyIjkEkFgP54IcBh7dRlCH354dhuGAGsGJ3qDEiUrexiTJ5UTBXqPkZB9K1CZoZBiK6V8p4KmoQCfrbCxJxEAIfkEBRkACgAsAQALAAwAEwAABFQQgKFqHdQKW4sAl0AVJCkpQxAoK/mBqdUO51ColweiglgJBcUOIMCxNjsUp1hI/p6fZUb0spwUBoLhylH0tt2KpOeUmDNWswTTHXuNGpWquJRvOBEAIfkEBRkACgAsAgALAAsAEwAABE9QBUVpETWMSqcCgYBVwgRQYpF9UhAOm+m5AlwChqF9tasYAgMFpBgBRMOSp5gY5ggZDwAAiw5BS98HS+KARjTjSaIUd0KCqbqTVq+v70oEACH5BAkZAAoALAAAAAAQAB4AAARnUMlJq7046827n4IgAV/ZHRKyhdKBDhZ8CYUnDLU0BOI8/D8eJgQL9S4DAQAQ4AVIldsA2lRAKVJK1ZJVwAxHioFg0DWvlF9Zckay2EqkbLK8FLaiuqX2fF/qImEWAAJNARskWyYXEQA7">';

var backd = '<img src="data:image/gif;base64,R0lGODlhEAAeALsAAP///wAAAWBgYKCgoP8AAODg4JMGBoBAAOCggKioqAAAAAAAAAAAAAAAAAAAAAAAACH5BAUZAAoAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAeAAAEjhDImUiaOI9CysigMASDAGZkegJE674EBs/tNBgGbXgSctwzw+Bw6B0COZghcEAYAYEg0wkgFqJKYlHCFBS+34DptAF7SKHyYL1GY0RrgTweyIjkEkFgP54IcBh7dRlCH354dhuGAGsGJ3qDEiUrexiTJ5UTBXqPkZB9K1CZoZBiK6V8p4KmoQCfrbCxJxEAIfkEBRkACgAsAQALAAwAEwAABFQQgKFqHdQKW4sAl0AVJCkpQxAoK/mBqdUO51ColweiglgJBcUOIMCxNjsUp1hI/p6fZUb0spwUBoLhylH0tt2KpOeUmDNWswTTHXuNGpWquJRvOBEAIfkEBRkACgAsAgALAAsAEwAABE9QBUVpETWMSqcCgYBVwgRQYpF9UhAOm+m5AlwChqF9tasYAgMFpBgBRMOSp5gY5ggZDwAAiw5BS98HS+KARjTjSaIUd0KCqbqTVq+v70oEACH5BAkZAAoALAAAAAAQAB4AAARnUMlJq7046827n4IgAV/ZHRKyhdKBDhZ8CYUnDLU0BOI8/D8eJgQL9S4DAQAQ4AVIldsA2lRAKVJK1ZJVwAxHioFg0DWvlF9Zckay2EqkbLK8FLaiuqX2fF/qImEWAAJNARskWyYXEQA7">';
var fatfronto = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIHAN7/AP3//94AAN64l97//0cA/wAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAHA' +
   'CwAAAAAGAAYAAADX3i6fAKiyanEszTXGzUVQ9h5TGGGg1mQinq6axYQBGzHE13fLkHRIV5Bl0EJUUVUyhbyKHU6JCkEJShJVShLoT10sURvmBX+sjBc9NZg2Iy2DMsbvqFL1Ha' +
   'FAW9ntycJACH5BAUyAAcALAAAAAAYABgAAANfeLp8AqLJqcSzNNcbNRVD2HlMYYaDWZCKerqrB88FQQQUQcM2kdu7QshGQQVRmhANFUoOezamhwklNFmKKhS7PXRJ3a8nTMRaf' +
   'BvswtIxGNSbEXwtnzvqcMvbrnDvNQkAOw==">';
var fatfrontd = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIGAP3//94A3t64l97/AN4AAAAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAGA' +
   'CwAAAAAGAAYAAADX2i6bFGhyanCszTXGzUNQth5DGGGgkmQinq6awYMA2zHE13f7kDRIR5Bl0EJUUVUyhbyKHU6JCkEHShJVShLoTV0sURvmBX+sjBc9LZQ2Iy2DMsbvqFL1HY' +
   'FZE5ntycJACH5BAUyAAYALAAAAAAYABgAAANfaLpsUaHJqcKzNNcbNQ1C2HkMYYaCSZCKerqrB8/EMADUQMP2kNs7QshGQQVRmhANFUoOezamhwkdNFmKKhS7NXRJ3a8nTMRaf' +
   'BvswtIpFNSbEXwtnzvqcMvbrnDvNQkAOw==">';
var fatbacko =  '<img src="data:image/gif;base64,R0lGODlhEAAeALsAAP///1BwgNDQ0JMGBv8AAL4HBzBQUABAAAAAAWAgICAwMKBAAHAwAIAAAHAAAAAAACH5BAUZAA8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAeAAAEjBDISasFgYRbgyjCxnlGMAQGZxCa4GZsVbBsYNPEVMz03heigQ/XGwwmQh6uYKSYlEWLkMg8VpK7bPPqcb2sV68YPDGJvWTJ6WVrn8prm0HhppzkKYChZELinSE5EjxpCAgiEh42FQkJCIAhFo0UbJIJFZEcmIiaAAiZnZ4BCgelpRwICqSmrJqtoaERACH5BAUZAA8ALAAAAwAQABsAAASPkK2pnr34CUJeyUB4EUWXYUv1md5jftMzrKc3MMIi01gxPADHZcay+AAZYu+HxMxOzKRAUINSMwHoI4uFZgPcjGEYMBgU4/BjfDErRGzDgA0cRC0GqqEJNNO3UyA1AQIBfEBbWGCHTYcICIZdGQmPfwgPl5OUGY81CQkYAJ1AIjUhByClJ6gXrFUWB7GuFxEAIfkEBRkADwAsAAACABAAHAAABJnwyUkFfSCDcDnNEnEpjLBIAVFcVMGc3BpehLUAwyOzRcAwmNxushokJobBcJKjJIeqR3MSmBIfHuogS+Fird2PlIX65AQWSRqrDbg5Cm3XbTBgUFXPlmNHGtxNBQQEVhkDgzIcaxIgaB6KF40CXlyNXIuMG5MTAGyRCJ5qXhSgEggBCp0HBxMICUemCnEUrA+vLJ20ZB8aLBEAIfkEBRkADwAsAAACAA8AHAAABHLwyUkBrddmoGfhFniND7AIHkVQTEA+65QEwxi7UvHqtWT1OdKPBCw9UBQBDTNSFl/OlwQlQEpdVanEEMBpJ97HwEC+GC4FAuH51WJfAask7Iu3AfajFC9ATF0iPgoBfg+AIBwSCgoIBwiLB20SB5SUIxEAIfkEBRkADwAsAAADABAAGwAABJTwyUnVuoy1LRqVRCgkzkJIQfCEYEGkTzGd8lQU6jN8XzEAD8WOJ/EBJcfP6ZGk1FaEJ7E3zVEEVR72A7RSAsNvLkUONyUGhcHAHawnAICafQQYBFuk7lcP4L0Pa3FIAH5eOYNMhQ+HhIQBCAhaTQaRCR8qTQgJlx8IApJInESRCHWJEwcHkYlxR6qwB66Ks1M8ZzwRACH5BAUZAA8ALAAAAwAQABsAAASR8MlJgb0Y0EeksAxQbFRBBFo3jeozokNhku4zaLbbSuNgULGdaxAIAHUlonEyqG0GAgFtKQlApbRnNPt8YDffLZFJVTyKxbFEOQkYDGgKYeDDPX7piRRltxEIIx5GFlMTCAgXYGcSCAkJiW0bjoiEYD8PjpAUVBOVGwFfJAejDwAKAQgbowcbCgqpJH19sZoUEQAh+QQJGQAPACwAAAAAEAAeAAAEkPDJSau9OOuNBfgS8BASQQZByYgLQJZPMRHC8jCpbJ3Mk6QD3UxSSBAfQUthMKCImhPdQDR5KqeVAHQiEASo2YoXTEFRBA/yw/BISVJdMGBgMCgk7K6nylQoPlRxVQFsFEwEWCEXbExyaBePZwgcAAiWkG0hIpNhaZobageiohVqF5dqgIA+D5wXqj4JrhwTEQA7">';

var fatbackd = '<img src="data:image/gif;base64,R0lGODlhEAAeALsAAP///1BwgNDQ0JMGBv8AAL4HBzBQUABAAAAAAWAgICAwMKBAAHAwAIAAAHAAAAAAACH5BAUZAA8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAeAAAEjBDISasFgYRbgyjCxnlGMAQGZxCa4GZsVbBsYNPEVMz03heigQ/XGwwmQh6uYKSYlEWLkMg8VpK7bPPqcb2sV68YPDGJvWTJ6WVrn8prm0HhppzkKYChZELinSE5EjxpCAgiEh42FQkJCIAhFo0UbJIJFZEcmIiaAAiZnZ4BCgelpRwICqSmrJqtoaERACH5BAUZAA8ALAAAAwAQABsAAASPkK2pnr34CUJeyUB4EUWXYUv1md5jftMzrKc3MMIi01gxPADHZcay+AAZYu+HxMxOzKRAUINSMwHoI4uFZgPcjGEYMBgU4/BjfDErRGzDgA0cRC0GqqEJNNO3UyA1AQIBfEBbWGCHTYcICIZdGQmPfwgPl5OUGY81CQkYAJ1AIjUhByClJ6gXrFUWB7GuFxEAIfkEBRkADwAsAAACABAAHAAABJnwyUkFfSCDcDnNEnEpjLBIAVFcVMGc3BpehLUAwyOzRcAwmNxushokJobBcJKjJIeqR3MSmBIfHuogS+Fird2PlIX65AQWSRqrDbg5Cm3XbTBgUFXPlmNHGtxNBQQEVhkDgzIcaxIgaB6KF40CXlyNXIuMG5MTAGyRCJ5qXhSgEggBCp0HBxMICUemCnEUrA+vLJ20ZB8aLBEAIfkEBRkADwAsAAACAA8AHAAABHLwyUkBrddmoGfhFniND7AIHkVQTEA+65QEwxi7UvHqtWT1OdKPBCw9UBQBDTNSFl/OlwQlQEpdVanEEMBpJ97HwEC+GC4FAuH51WJfAask7Iu3AfajFC9ATF0iPgoBfg+AIBwSCgoIBwiLB20SB5SUIxEAIfkEBRkADwAsAAADABAAGwAABJTwyUnVuoy1LRqVRCgkzkJIQfCEYEGkTzGd8lQU6jN8XzEAD8WOJ/EBJcfP6ZGk1FaEJ7E3zVEEVR72A7RSAsNvLkUONyUGhcHAHawnAICafQQYBFuk7lcP4L0Pa3FIAH5eOYNMhQ+HhIQBCAhaTQaRCR8qTQgJlx8IApJInESRCHWJEwcHkYlxR6qwB66Ks1M8ZzwRACH5BAUZAA8ALAAAAwAQABsAAASR8MlJgb0Y0EeksAxQbFRBBFo3jeozokNhku4zaLbbSuNgULGdaxAIAHUlonEyqG0GAgFtKQlApbRnNPt8YDffLZFJVTyKxbFEOQkYDGgKYeDDPX7piRRltxEIIx5GFlMTCAgXYGcSCAkJiW0bjoiEYD8PjpAUVBOVGwFfJAejDwAKAQgbowcbCgqpJH19sZoUEQAh+QQJGQAPACwAAAAAEAAeAAAEkPDJSau9OOuNBfgS8BASQQZByYgLQJZPMRHC8jCpbJ3Mk6QD3UxSSBAfQUthMKCImhPdQDR5KqeVAHQiEASo2YoXTEFRBA/yw/BISVJdMGBgMCgk7K6nylQoPlRxVQFsFEwEWCEXbExyaBePZwgcAAiWkG0hIpNhaZobageiohVqF5dqgIA+D5wXqj4JrhwTEQA7">';

allDivs = document.evaluate(
    "//*[@class='player_icon']", //FIND THOSE PLAYERS
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

//offense is facing down
if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
{
 var pic1 = fronto;
 var pic2 = backd;
 var fat1 = fatfronto;
 var fat2 = fatbackd;
}
//offense is facing up
else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) < 6.5)
{
 var pic1 = backo;
 var pic2 = frontd;
 var fat1 = fatbacko;
 var fat2 = fatfrontd;
}

//d is kicking down i hope
else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) > parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
{
 var pic1 = backo;
 var pic2 = frontd;
 var fat1 = fatbacko;
 var fat2 = fatfrontd;
}
//d is kicking up
else if(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) < parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y) && Math.abs(parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][1].y) - parseFloat(unsafeWindow.play_data[unsafeWindow.currentFrame][0].y)) > 6.5)
{
 var pic1 = fronto;
 var pic2 = backd;
 var fat1 = fatfronto;
 var fat2 = fatbackd;
}



for (var i = 0; i < allDivs.snapshotLength; i++) 
{
    

    
    thisDiv = allDivs.snapshotItem(i);
    id = thisDiv.id; //WHERE DA ID AT
    



    
if (id=='ball') //could fill this later if you wanted a diff. ball graphic
{}

else if (id == 'ds') //fixes conflict with first down marker script, will prolly fill this in with a first down marker thingy of my own later
{}

//oline te ls
else if (thisDiv.innerHTML == '<img src="/images/LOT.png">' || thisDiv.innerHTML == '<img src="/images/ROT.png">' || thisDiv.innerHTML == '<img src="/images/C.png">' || thisDiv.innerHTML == '<img src="/images/LG.png">' || thisDiv.innerHTML == '<img src="/images/RG.png">' || thisDiv.innerHTML == '<img src="/images/TE.png">')
	{
	thisDiv.innerHTML = fat1;
	}

//wr hb fb
else if (thisDiv.innerHTML == '<img src="/images/WR.png">' || thisDiv.innerHTML == '<img src="/images/WR1.png">' || thisDiv.innerHTML == '<img src="/images/WR2.png">' || thisDiv.innerHTML == '<img src="/images/WR3.png">' || thisDiv.innerHTML == '<img src="/images/WR4.png">' || thisDiv.innerHTML == '<img src="/images/WR5.png">' || thisDiv.innerHTML == '<img src="/images/HB.png">' || thisDiv.innerHTML == '<img src="/images/FB.png">')
	{
	thisDiv.innerHTML = pic1;
	}

//qb
else if (thisDiv.innerHTML == '<img src="/images/QB.png">')
	{
	thisDiv.innerHTML = pic1;
	}

//re le dt nt ls
else if (thisDiv.innerHTML == '<img src="/images/RDE.png">' || thisDiv.innerHTML == '<img src="/images/LDE.png">' || thisDiv.innerHTML == '<img src="/images/DT.png">' || thisDiv.innerHTML == '<img src="/images/NT.png">' || thisDiv.innerHTML == '<img src="/images/LS.png">')
	{
	thisDiv.innerHTML = fat2;
	}

//lb
else if (thisDiv.innerHTML == '<img src="/images/LOLB.png">' || thisDiv.innerHTML == '<img src="/images/ROLB.png">' || thisDiv.innerHTML == '<img src="/images/MLB.png">' || thisDiv.innerHTML == '<img src="/images/LILB.png">' || thisDiv.innerHTML == '<img src="/images/RILB.png">')
	{
	thisDiv.innerHTML = pic2;
	}

//cb ss fs
else if (thisDiv.innerHTML == '<img src="/images/CB.png">' || thisDiv.innerHTML == '<img src="/images/CB1.png">' || thisDiv.innerHTML == '<img src="/images/CB2.png">' || thisDiv.innerHTML == '<img src="/images/CB3.png">' || thisDiv.innerHTML == '<img src="/images/CB4.png">' || thisDiv.innerHTML == '<img src="/images/CB5.png">' || thisDiv.innerHTML == '<img src="/images/FS.png">' || thisDiv.innerHTML == '<img src="/images/SS.png">')
	{
	thisDiv.innerHTML = pic2;
	}

//krs kr pr
else if (thisDiv.innerHTML == '<img src="/images/KRS.png">' || thisDiv.innerHTML == '<img src="/images/KR.png">' || thisDiv.innerHTML == '<img src="/images/PR.png">')
	{
	thisDiv.innerHTML = pic1;
	}

//kos k p
else if (thisDiv.innerHTML == '<img src="/images/KOS.png">' || thisDiv.innerHTML == '<img src="/images/K.png">' || thisDiv.innerHTML == '<img src="/images/P.png">')
	{
	thisDiv.innerHTML = pic2;
	}


}
}

)
