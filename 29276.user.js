// ==UserScript==
// @name           GLB Replay Graphics v. 1.2.1
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
var backo = '<img src="data:image/gif;base64,R0lGODlhFAAUAKIGAN7/AN64l94AAN7//0cA/wAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAGACwAA' +
   'AAAFAAUAAADTGi6KyAsSiNcnXGQzfnAWicSXxaOnhSs6LZOa4DGmCGTQ1gzeZ/vC58POBzujDnI8aeoKGu9ReFZc0oLBSCFqm1euo0vmIIdG7DlWgIAIfkEBRQABgAsAAAAABQ' +
   'AFAAAA01ouisgLEojXJ1xkM35wFonEp8Ujl7JBAG6sYEEozCmbEP+2kvu5zzF7xc0EIk8AdDoC1YgwmWy0JNiCtjGpcjYchXPrxYqxpK/2CwjAQA7">';
var backd = '<img src="data:image/gif;base64,R0lGODlhFAAUAKIGAABHAN64l94A3t7/AN4AAAAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAGACwAA' +
   'AAAFAAUAAADTGi6KyAsSiNcnXGQzfnAWicSXxaOnhSs6LZOa4DGmCGTQ1gzeZ/vC58POBzujDnI8aeoKGu9ReFZc0oLBSCFqm1euo0vmIIdG7DlWgIAIfkEBRQABgAsAAAAABQ' +
   'AFAAAA01ouisgLEojXJ1xkM35wFonEp8Ujl7JBAG6sYEEozCmbEP+2kvu5zzF7xc0EIk8AdDoC1YgwmWy0JNiCtjGpcjYchXPrxYqxpK/2CwjAQA7">';
var fatfronto = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIHAN7/AP3//94AAN64l97//0cA/wAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAHA' +
   'CwAAAAAGAAYAAADX3i6fAKiyanEszTXGzUVQ9h5TGGGg1mQinq6axYQBGzHE13fLkHRIV5Bl0EJUUVUyhbyKHU6JCkEJShJVShLoT10sURvmBX+sjBc9NZg2Iy2DMsbvqFL1Ha' +
   'FAW9ntycJACH5BAUyAAcALAAAAAAYABgAAANfeLp8AqLJqcSzNNcbNRVD2HlMYYaDWZCKerqrB88FQQQUQcM2kdu7QshGQQVRmhANFUoOezamhwklNFmKKhS7PXRJ3a8nTMRaf' +
   'BvswtIxGNSbEXwtnzvqcMvbrnDvNQkAOw==">';
var fatfrontd = '<img src="data:image/gif;base64,R0lGODlhGAAYAKIGAP3//94A3t64l97/AN4AAAAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAGA' +
   'CwAAAAAGAAYAAADX2i6bFGhyanCszTXGzUNQth5DGGGgkmQinq6awYMA2zHE13f7kDRIR5Bl0EJUUVUyhbyKHU6JCkEHShJVShLoTV0sURvmBX+sjBc9LZQ2Iy2DMsbvqFL1HY' +
   'FZE5ntycJACH5BAUyAAYALAAAAAAYABgAAANfaLpsUaHJqcKzNNcbNQ1C2HkMYYaCSZCKerqrB8/EMADUQMP2kNs7QshGQQVRmhANFUoOezamhwkdNFmKKhS7NXRJ3a8nTMRaf' +
   'BvswtIpFNSbEXwtnzvqcMvbrnDvNQkAOw==">';
var fatbacko = '<img src="data:image/gif;base64,R0lGODlhFAAUAKIGAN7/AN64l94AAN7//0cA/wAAAP///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAGAC' +
   'wAAAAAFAAUAAADUGi6KyAsSiNcnWsMwrsnGqN9JBcqY/lpgxK8ave+yxzPwXTnmGGmvQxr2OoRicEKy4DEVC6oZa9SEJ4mhWxV8YQEI8+vJCxukMuGLBStzTISACH5BAUyAAYA' +
   'LAAAAAAUABQAAANRaLorICxKI1ydawzCuycao30kFxraVn5n4AZr9y4vvM6RG2OMORK8TGo4CKKIQx7xOLhgkoqKcwI1FKYTKURR6BaCUqMkLGZoyw1BF231fnkJADs=">';
var fatbackd = '<img src="data:image/gif;base64,R0lGODlhFAAUAKIFAN64l94A3t7/AN4AAAAAAP///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJMgAFAC' +
   'wAAAAAFAAUAAADUFi6GxQsyhJcnUuIwbsfGqN9JBcqY/lpggK8ave+yxzPwHTnWGGmvQxr2OoRicEKq4DEVC6oZa9CEJ4mhGxV8YQEI8+vJCxukMuFLBStzTISACH5BAUyAAUA' +
   'LAAAAAAUABQAAANQWLobFCzKElydS4jBux8ao30kFxbaVn4n4AJr9y4vvM6RG2OMOQ68TGooCKKIQx7xKLhgkoqKcwItPCA8KdZK6AalRgk4zNCSGw7CmdtV8xIAOw==">';

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

