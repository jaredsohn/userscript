// ==UserScript==
// @name           Online Video Stripper 5
// @namespace      http://theaceoffire.8k.com/Version5
// @description    Allows you to ask multiple sites for flv using simple button interface.
// @include        *youtube.com/watch?*
// @include        *veoh.com/videos/*
// @include        *megavideo.com/?v=*
// @include        *video.google.com/videoplay?* 
// @include        *zippyvideos.com/*
// @include        *vids.myspace.com/*videoid=*
// @include        *break.com/index/*
// @include        *dailymotion.com/video/*
// @include        *lulu.tv/?p=*
// @include        *metacafe.com/watch/*
// @include        *collegehumor.com/video/*
// @include        *funnyordie.com/videos/*
// @include        *5min.com/Video/*
// @exclude        *zippyvideos.com/
// @exclude        *zippyvideos.com/video_search_form.z
// @exclude        *zippyvideos.com/browse.z
// ==/UserScript==


/////////Outer Layer Variables////////////
var menuX;
var saveX;
var autoX;
var reloadX;

/////////Safety Checks//////////
if (!GM_xmlhttpRequest) {
	alert('Please upgrade to the latest version of Greasemonkey. A vital component \(GM_xmlhttpRequest\) is not available. OnlineVideoStripper will not operate without it.');
	return;
}
if(GM_getValue("autoXX")==null)autoX=0;else autoX=GM_getValue("autoXX");
if(GM_getValue("reloadXX")==null)reloadX=1;else autoX=GM_getValue("reloadXX");
var setXAuto=function(x){
	GM_setValue("autoXX",(autoX)?0:1);
	window.location.href = window.location.href;
}

GM_registerMenuCommand("Toggle Auto Click Download", setXAuto);


//////Start Main Code//////
var init=function(y){
	/////Variables./////
	var containerNum=0;//Number of open containers.
	var containerHeight=0;//Height of containers, where to open next one.
	var ids=new Array();//List of all container ID's.

	/////Functions//////
	function createContainer(x,xheight){
		if(xheight==null)xheight=2.5;
		ids[ids.length]=new Array(x,xheight);
		++containerNum;//Increase the number of containers by one
		sizeOfOneContainer=xheight;//Its unit:em;
		containerWidth="27.45em";//Its unit:em;
		var shellShim=document.createElement("iframe");//Create shim.
		shellShim.setAttribute("name","shim"+x);
		shellShim.setAttribute("id","shim"+x);
		shellShim.setAttribute("style","left:0;top:"+containerHeight+"em;width:"+containerWidth+";height:"+sizeOfOneContainer+"em;position:absolute;background-color:transparent;");
		shellShim.setAttribute("src","javascript:;"); 
		shellShim.setAttribute("frameBorder","0");
		shellShim.setAttribute("scrolling","no");
		window.document.body.appendChild(shellShim);
		
		var shell=document.createElement("p");
		shell.setAttribute("id",x);
		shell.setAttribute("style","left:.2em;top:"+(0.2+containerHeight)+"em;z-index:100!important;margin:0.2em;padding:.2em .3em;background-color:#aaa;color:#ccf;position:absolute;border:1px #000 solid;text-align:center;");
		window.document.body.appendChild(shell);

		containerHeight+=sizeOfOneContainer;//The height is 2.5 * the num of containers.
		return true;
	}
	function destroyContainer(){
		if(ids.length>0){
			var lastID=ids[ids.length-1][0];
			containerHeight=containerHeight-ids[ids.length-1][1];
			var nodeShim=get("shim"+lastID);
			var node=get(lastID);
			nodeShim.parentNode.removeChild(nodeShim);
			node.parentNode.removeChild(node);
			ids.splice(ids.length-1,1);
			return true;
		}
	}
	function destroyContainerAll(){
		while(destroyContainer());
		return true;
	}
	function destroyContainerMost(){
		while(ids.length>1&&destroyContainer());
	}
	function keepVid(url){
		try{
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://keepvid.com/megaupload/keepvid.php",
				headers:{
			       	"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
		        	"Accept": "application/xml,text/xml",
				"Content-type":"application/x-www-form-urlencoded"
				},
				data: "url="+url+"&site=aa",
				onload: function(stuff){
					createContainer("keepVid");
					var target=get("keepVid");
					target.innerHTML=stuff.responseText;//data[0];
					var links=target.getElementsByTagName("a");
					target.innerHTML="KeepVid: <a id=\"keepVidLink\" href=\""+links[1]+"\">"+title+"</a>";
					if(get("keepVidLink").href==""||get("keepVidLink").href.indexOf(url)!=-1)destroyContainer();
				}
			});
		}catch(x){alert("Error with GM_xmlhttpRequest for keepvid.com");}
		return true;
	}
	function leechVideo(url){
		try{
			var url2="http://download.leechvideo.com/php/getVideoUrl.php?url="+encodeURIComponent(url)+"&attachment=123&nocache="+Math.random();
			GM_xmlhttpRequest({
				method: "GET",
				url: url2,
				onload: function(stuff){
					createContainer("leechVideo");
					var target=get("leechVideo");
					target.innerHTML="Leechvideo: <a id=\"leechVideoLink\" href=\""+stuff.responseText.split("\n")[0]+"\">"+title+"</a>";//data[1];
					if(get("leechVideoLink").href==""||get("leechVideoLink").href.indexOf(url)!=-1)destroyContainer();
				}
			});
		}catch(x){alert("Error with GM_xmlhttpRequest for leechvideo.com");}
		return true;
	}
	function clipNabber(url){
		try{
			GM_xmlhttpRequest({	
				method: "POST",
				url: "http://clipnabber.com/gethint.php",
				headers:{
			       	"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
        			"Accept": "application/xml,text/xml",
				"Content-type":"application/x-www-form-urlencoded"
				},
				data: "mode=1&url="+url.split("#")[0].replace(/&/g,"?")+"&sid="+Math.random(),
				onload: function(stuff){
					createContainer("clipNabber");
					var target=get("clipNabber");
					target.innerHTML=stuff.responseText;//data[2];
					var links=target.getElementsByTagName("a");
					target.innerHTML="ClipNabber: <a id=\"clipNabberLink\" href=\""+links[1]+"\">"+title+"</a>";
					if(get("clipNabberLink").href==""||get("clipNabberLink").href.indexOf(url)!=-1)destroyContainer();
				}
			});
		}catch(x){alert("Error with GM_xmlhttpRequest for clipnabber.com");}
		return true;
	}
	function load(url){//Load each of the items.
		keepVid(url);
		leechVideo(url);
		clipNabber(url);
		return true;
	}
	function get(x){return document.getElementById(x);}
	//////End of Functions//////

	//////Start of Code//////
	var url=location.href.split("#")[0];//String to be used.
	data="";//Container for other sites responce.
	var title=document.title;//Get the title. 
	if(title.length>=30){title=title.slice(0,29);}//Trim it down. 
		
	//This creates the download button, allows the rest of the script to work.
	createContainer("Download",3.5);
	var target=get("Download");
	if(!autoX)target.innerHTML="<img alt=\"AutoClick\" id=\"autoDownload\" style=\"border:solid 1px #000;border-width:1px 0px 1px 1px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAIAAABL1vtsAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEgAACxIB0t1%2B%2FAAAAAd0SU1FB9gFDw8CBes6evQAAANfSURBVDjLXZRLbx1FEIVPPbp7xjaSHeEES0Q8FohNJMBEkYDfDkJix4YtLBIRrAQn2HncuXemX1Us5toJ1Gakkb6q0%2BdUNz1%2B%2FBi3VSFBmDmEICIQwODuvXUz67331t0dCjhAe0j3XwMRhRRiikMaRIWIYPDu2TMTl16UVKHVa%2B8dDZA9rQDQwMQxxXEc4xCJyZqVXGqtrTc4zI1A5OTu5raf3wAGeG0hCCGMh%2BMwDO6e5zxv5yUvvfTmDQQlZWERcXYvnmsWFmGhTmAoKmKKBwcHKSVz22622802z7n3DgcAMAoX6pQkkRAI1q3WqqqRIoOVlWOKcYgAtpvtdD3Ned7Da62y1z8dAERl2S45ZzgGHVRUhjQQU57z9u32%2F%2FxNKSutzRgBQVWnzQRAVTloEBVrNk9znvPK55Yv57%2FN7FYFE688AihSDBGEeZ5zybzmV0tdytKtrzOXOv8Sfv4p%2F%2FhidwlASJh45UEAQ4My8zIvJRcFwbvXWltt7x3Bq%2FQ%2Fx6eX9dmnm88fjo9ijNB360RKItJ6W%2FKicHTrzVr3DsJ%2FjHAs2n4%2F%2FuNp%2BevB6wdfHX89hEEgAAoVEDZtc9SP2N2rV%2FcbVPYLsx8ocO9v89Vv178%2Bf%2FNcoQQiEAgwePbWm%2FbWmdjNlbRI2fvHAMHZ2rQcXh1%2BN%2F7wzWfnKaZ3Ag255tYagdTMSi8EEhXu7O5MHDjVXQ0Tvo3fP%2Fzk0eF4uF659aTuXlvd7rYNTYNq711ZyYmZAweHC8kg6Tyff%2FHxlyfjid5exZsuZjZN0%2Bs3ryPHIQ3qzd3d4c7OzKudh%2BPR%2BfFDAKt5%2B71cbWrIS766vpp2090P78YUtXt3uLt78X0cAoTbTHy%2FlGtYhrnNly8uL55dxBDvnNwZ4qBoMDJ05JrNTEUVSkyQ9yQA7m5m8zK%2FfPnyydMnZnb%2F7P7xB8dBgq7a4BCWWmvJhZVjixrU2ExsFVNrnabp6p%2Bri8sL63Z2dnZ6eppSAqCIQAM6hEVVc8l1qpNPIsLCq%2F6Vf%2FX21W67CyGcfXR2enp6MB4IC%2BT26WJQp4SEETvsdrvdbt7VWnPL2XLbtYYWJd47vXdycnJ0dDSmUUjWt%2B8mMAYYRJSQRCSlVHIptbTWeu98zKQ0pCHGOMRBRYkIAWAA%2BBdv%2Bv4y6HsnxwAAAABJRU5ErkJggg%3D%3D\" />"
	target.innerHTML+=(autoX)?"<img alt=\"Download Manually\" id=\"downloadMe\" style=\"border:solid 1px #000;border-width:1px 0px 1px 1px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAWCAYAAABNLPtSAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFDw8JO8mvvpQAAAy5SURBVFjD7ZlZcxxHcsd%2FWUcfmBkcM7gGEEASpEMP2pUidpfSfk%2BH%2FW28Tw492LF%2BdFgkxQOQRAwAAjPAnN1dlX7oxgCgpF2tYh82wu4OTKC6%2FpX5z6yq7MpsefHif%2FRPf%2Fo33r49IYSAiPD%2F19%2F%2FCiHw%2BPFj3MXFBUmS8cknn4DeAaJGjJhlW7XuvD8hfxWjoOiDMb8K0zz7a5iPr7%2BHDT%2FH5ZdgBIHmUVmVeO9x%2F%2FXnP%2FPo8RFHz44w1tTGI1ixBA1oMwtWLCgEQi38ZzFKIAJgMBgxS4wgtXH35PwkhtoBf0mXE0fUSGx0SXPfb%2F8aGz6We8uv0urBmL8VUxYl3%2Fz3N7jxZEZ%2Ft4%2FddFzYc1DITc7j9DFvF2%2BZxRmC8ElygBL5vvweVSWVlGf5M97M3zCNUxTlKDuiihXHxTEAq3aVg%2BSAV%2FNXFFogIhylR8zijLPiDEFYc2vs%2BX1ezl9QaYURw6PkEdM45aK8QFE6tsN%2Bss%2Fr%2BWsKLYhEPs0%2B5SbccFqeAtDRDp6ES3MJCm3b5sAf8KZ4wzzOEQyP0kcsdM5FeUFUpWVaPE4f8XrxmnmcA%2FAse8YkTPih%2FAGADbtB3%2Fd5uXhJpRVWLEfpEaMw4rw8RxA23AabfosX8xdEDVixPEmfMAxDrsorFKVNm62LLVxZlmRZxiyd8WLxEgG60uXAHXAy%2F46reIXBsG7XiURezb8lEFi1qzxzzzjREz7ESwB2bZ%2B5zHkZXoFA3%2Byy5%2Fd5O3vHOI5x4ujbPkOGfBNfYLHss8%2Bu3%2BX19A0LXeDFse22uSyveBW%2FRYnsmB123S7v9B3jOCFo4Il7wlCHvIyvUJRDd0jHdHhRvEQQts0We36Pt%2FN33MQbLJZtt811uOZleEUk0jM9Dv0B72bvGMVrBOHAHjBkyMvFS0A4dIds%2B21ez96w0DlOPPtunw%2FxAy%2FiSwyGR%2FKITbfFt%2FFbKq1IxLPn9rgIF7yK3wLKntujnbZxqooxhrGOeVccYxAWvqCk5H11yll5hsXwaf4pUQPH5TFBI127UWPKU06rUxT4fZwwDhPeFcfU4ctQaMH35Q%2BMwgiHY7IyZRhGvFscY8XixVNqyXfl98ziFC%2Bez%2BMXDMMV74pjFEVFKLiTU2rFLM4ZhhHHxQmRSEvaqCjHxQmCoCgLFvxQvucyXOLF8Xn8LaMw4rg4JqJUWlFoyQ%2Flez6EetHMdMawGvGuOEEUcslZZCUnxXfMdEYqCbM45zJcLW1o2RaFLjgpvqPUglRS5nHOh3DJcXGMAl4SOtLB3Qb5SZwwKAZ1%2FMFSxJKL8pzT4hQrlkmYEAicFgOCBoIPVFpxUX3gfXGKoszCjEmc8L54j4jQMR2qWHJennNZXeLEMY9zxuGG98V7nDh6tkupJWflGZMwwRvPLM64DjcMylOiKm3TpmzkfKguKbRgrvM6pBSnBAJ7do9EPKflKaLCisnrMdU55%2BU5XjzTMGMcxpyWA6JGEhIqreWeVecAzOOCmziubUDY9tuUWtT84oTUpMx1zqga8b58j8PR930KLRgUAxa6IDcZswZzWgxQlK7tcsSTew4P05oshsyklJRcVJecVqdYLNM4JWjFoBwsXzplrPhQfWBQDogoszhnEqYMqgEAm65H2Rh0Hi7w4pjrnHGYcFoN8OLoh37t8OqMcRiTSFI7PN4wKM%2BIGum6elLOqwvOq3MWsaCIBeM4XvIZJkNykzMoahvW7BqFllxUFwyqAR7PPM4Yh5t6jAZapkWpJRfVh%2BW7YKELxuGG03KAAIfh8I5fHJNJRhEX3MT6%2FeHxjMKQQksGYcAiLlgxKyziglG8ZlANUFX6SR9F7xw%2BjRMG5QARoW1blLHkQ3XBoBzgcEzjlEorTssBgQqDIVA1ZAdEIjOtV3g9cULf7zVkzzmrBnjxzOKcmziuyYrnqrqijCWD8oybcE0m2QPHRCI7YYeicfigHDCPCxa64CbUDq%2BoGIYhHdOuHSWGzbBJGUsuynqMp945N3HSrPDAul2j0orz6pxBOUCB%2BT1%2BBmFYXdUrvDrjOlyTm5y5FowaflYcV9Ww2aXnzOOMlllhEedch1EtV5VhdVWfgm6PMYu44CoMMRhu3JigFTfhhmE1xIpjERdUVE0MLWmbDkED43DDMAyJGim1YKELrqohgmEcx1QEbsI1w2pUx%2BtYsIhzhtUQL55JrEPVdbhmVI3IzIIiFk2MruWOQ%2F2ivK5qObM4o9SSeZxxFYZUWjENU%2Ba2juuCMA5jAhWjcM1VNSSRhIWWzBu5QQM3cVzLDTcMwwhFqSiX%2FARhEqdUGhhV14zCiIUpKGNR625smMYJlVaMqhHTOKU0JYWWTMOslqvKOE7uHF7nH1qfR0WJBBSIRAIR0YiiRI0EDcSmpz4r3z3TGlWPQeszqN7KCVhsjVFdtqPGWpcGAqE5u1LLac6xNR9tpNS3Nne4HdfoDxowYpr2nQ11O9a6tdFzq5uwtF0VIjU%2FQQhan6NvbViy07ptMI0mltxu29r45pZrfWa%2Fd90mDzS%2Ff%2Bm6RchHT1lKgF9UJJDljP%2Fo0c%2BB77MTkYdsHwzWB1x%2B3qq7jPDhv%2FKjMUv%2FyI%2F70J%2FWcf%2BZ%2BYcpNvwfKeGYv58X5B9wNuRv6hek2Wnyq3T%2Bkrqfe6BOzINNJE2dYBk%2BRJbtu9BjmtpH%2FNEYwTQo86Nx99sfY%2B5WgzS%2Fd6Hkx%2Fpv9QjIx3po%2Buq%2FW6cY7mpGt3qMGlT0gW55EB7lJ2TLQ%2F98ZMNt%2F31dblkxU0MuOUaEzGQYsaSSkZsc12SEqJDbHK%2BeTHIEITUpuc1RVRwOjyc3dV8mKUbqc31ucrx4nHF445btVFIMhtxkFFqQSYYTh5eE3KwQiWSSYjFkJmtkGww1pxWzQqUVngQbDbnJMZil3ExSVkxOIglOHE5qfkEDuclqrMnIbb4scN3KvbXPiCU3OYUW5CZ%2FgHHiHtgAkJuswSTkJkdREhKixrsVnkvGpu9hMGzYDZxYNtw6vdDDiSU3GU4req5H0EDXbWDFsm7X2XSbRJTUpGQmZ9NtNsWrNaw4NmyXUisSSUhIWDEtNt0mXjyrdhUnjq7r4SUhNSmpSWmZFj3fI2pkza3hxLPhNii1ZBEXJI3BPdcjEOjYdtPexCCsuXWcODZcl5nOSZrJbZmcTd8jaGTNrWPFsmE3mLopICSS1HJ8D1G5x6%2BLF09mMrx42qZNz%2FXw4unYDl48XddjHue0zAqpJLRtjVGUVbsKyJ3DO67Dnt9DEDb9Jl4SttwWi1hgxbBiWgSt6Ps%2BQSu2%2FFZTaNpkGicodZWxtCV930dE6DUkd%2Fx2s7ocucno2DZ7fq9O7RvMrt%2BmbdokJmHF5KzZVfq%2Bj2qgZ7sk4tlx23XZQQsyk7JqO%2Bz5PhWBruuy5lbZ8%2F3aBtcjMQnbfgtF8eJYsSt0Yoe%2B7xM1suV6JMaz47fQJiRmJmvk7iFNtdDj2fU7tE2bzKRkJmXNrjY2WNbdOonx9P0u87ggNzmZyVi367UNKF3XxSA4kfqIs%2BHWeZYdgdb1g8ykHKYH9ZbCsO7WCBp4mh4RCHTtBolJOEgPcMbXZVTTwWJ4lj0FYD%2FZJ5WUx%2Bkj1t06Dkfbtulql3%2FKnmLE0vd9UpPyOH3CLM6WK2bT93iaHhGJ7Cf7ZDZbyim1pNWs7qfpU4IEdpMdurZb61bY9%2FtkkvEoOaRjOzgsHdsmaMmz9CmByJ7fJZWUw%2BSQlm0jSr2z7snZ9btkJuNJ8phpU7xqmRZbfpNn2VOsWHbdDplkHKVHFE3xqmVa7PgtnmZHqCp7SR8xgvPeEzWy7bb5sv0lRKFjO7RMi9%2Fkn%2FEoeYyosON2USLP28%2BJMbJiV8hNzmf5Zxz4Q5C6dlJoh6%2FaXwHQtRu0bIsvVr5gHucYLF3XI5WUP7b%2FCBi2XI8V0%2BL3rd9RxBKLWW5VbQmqyoZfp2VqObM4J2hgza7zSQJftp8TUbbMFi3J%2Bar9HI3Culujbdt80fqcSZhhEDbtFi1p8bz9JTFG1twqK6bF560vmFSTurZt1zGJ8FWrtmHbbdO2DT8tsTjW7Hrtl7ZB1LDT7M4%2FtH5HpRGLY91u8CR9QiIpqtBzXQIV8q%2F%2F8s%2F6h%2Bdf8dlvf4O4u2TC4ai0evAlpM7kYpNQCM40GL3DAMsvH0YMFruUc%2Fsl5DYj%2FMUYDFYsFXe6vPg6%2B2swTQII9tYGg7sn96ENd7qdOMpYLjFe6t36sQ2llg%2B%2B5vyUDfcxTtwDfsWi4D%2B%2F%2Fg%2Fk66%2F%2FXU9OTghBIQoiLNN4I3dHnKgRmiPVbSngpzDSZGG3GFXFyN25Nmp8kKXdYcwyXYvN98uPMfeffawral1GMOYhPyvmge5fb4P5WS6%2FBGOs0Om0%2BV9lZc7YW4RExQAAAABJRU5ErkJggg%3D%3D\" />"
		:"<img alt=\"Download\" id=\"downloadMe\" style=\"border:solid 1px #000;border-width:1px 0px;\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAWCAIAAADywn0kAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAB3RJTUUH1ggOBAkzsQcb4wAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVYdFNvZnR3YXJlAF1w%2FzoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG%2BaHAAAAB3RFWHRTb3VyY2UA9f%2BD6wAAAAh0RVh0Q29tbWVudAD2zJa%2FAAAABnRFWHRUaXRsZQCo7tInAAABAElEQVR4nO2Yb2gbZRzHv603TImp%2BuLQzSQ17TPNi%2BEsg9ESCueLx7e%2BKR6MGoicV4qTMfvGETjlICJhE4adsnIsW20jR0WoON88WE5LF1l21GEQdcfMtcEyg17A1FVbiS%2FOpX92S6XWtht%2B391z932e7%2Bd5fvx4uKZarYZ7SxwA0zR3OsbWyDRNWZY596G9vX1n02yJ3LNp3ukYW6%2F%2Fke4GeSD59nCT5898dekLT4PjOJPnzziO8x8H27w8kL78fNJ%2F%2BeLvo28VL3227pXjODMTWf%2FlizMT2W2Jtxl5IJHKdd4u8Hbhxuip1VQuD%2F%2FpWd6aecq5tt6WS9NbSuc2maakD9AB3ShTuAAAAQBJREFUvfTvvvVAevRZke%2Ft53y%2B1VR1Hn%2Bl7O%2Fs2ie%2B7LUMVRnLSIQpdapc%2Bh8B5vT14dYac%2Bk16Uu6fudJuduHqlxL6JU3OX9g%2FsJJ3i58M%2FZuBXt%2B%2Bf5rlydwWIi8ca7KtdxpxqCYlIyENqL3zBqKBkkVRigdkVTBULSIynqmqMKIlEkilTAEVTAUzXKNBjJJAMCcPpBYMWaSSCXsuIoEpUTKvBebHkhoFqABIIJHAO%2F28NFQ%2Brvg03xvP4BoMf%2Fj2On6%2BTSLxz8ePdewPQTDEQD2lGGBxsVuMU5h2RDjFGxKn%2F2BEGLZ09OGRYRYCACRMoypFJY9B9xunAvGBMIUhQGw7AtZ6zEAAAEASURBVLnStGHdqgbv5Ru1h5%2Bf7OJ7%2B7G0FC3mH%2Fxz0Rc9yPWduGrmN2gPJX2EgQhHeiJrx0NtBEzTICTjlGmaRYRY0Mvf1rbGOKunNIuqjKl0Zb8ayaPwSOX6T3YBwI3RU%2Bgb9HdeWSiYzYHW%2B19Sr5p597g69j%2FhNRtTKAMAqjIxiJJEEu4AkTLdCIYEollWJBwMgQBWJOxJBMSOSMaKUQxntZWJge4eCuXvR8%2FCa6rVaqZprr7jPbB8c%2F79t51PLiwvLpbbDjzSN9gyMdR66Jncb%2FfVyy90LP3Hvv0bbNe2a3x8XJZlj8Jz2wMvHgXgtof5547XeQKHhY5Udhfy1OVReADP5dyRAAAAgUlEQVQq1YW9L55YXvi1%2FOHZaDH%2F7djpUPmaez7hwZMN2t1ukDcSgEp1gZdfB1D%2BYChazHM%2BHxc9GDqWvvnwY9sYbzNqdG1dXFre%2B8Kr%2Fs4uAM2B1sdfe2c311tdG9zEq1xLRyrrP3DooeeP3hU8cDve8PDwTsfYMsmy3HTv%2FU75C6rIoBIj8tsTAAAAAElFTkSuQmCC\"/>";
	target.innerHTML+="<img alt=\"Close Controller\" id=\"deleteAll\" style=\"border:solid 1px #000;border-width:1px 1px 1px 0px;\" src=\"data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD%2F2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2F2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2FwAARCAAWABYDAREAAhEBAxEB%2F8QAFwABAQEBAAAAAAAAAAAAAAAACgkHCP%2FEACQQAAICAwEAAgICAwAAAAAAAAMEBQYBAgcICRQSEwoRFiEj%2F8QAFAEBAAAAAAAAAAAAAAAAAAAAAP%2FEABQRAQAAAAAAAAAAAAAAAAAAAAD%2F2gAMAwEAAhEDEQA%2FAEn%2FACNfI10Ti3RKj5O8nVGB6P6s6PAythiIiwyqKEDW4FBKVa%2B459qVhcydjk8wsgGt1sMgrs9stllnY4Dppugd7z98q%2Fy8X7vuaHVXVujW2Mblj2TmdspFfrULBRtdwbaezZZYA63IVVWI1AVVl%2BTnVMrs%2FrWxsR0oFygs748Pc1N918PD0iER%2FwAetMHJsVfoNRK6u8StWuNEru8mF1fOASMWwNtZ6Glg410kI9oWSaCcA4AIEx%2BVfz932%2FfLw7VaHluMtvRlqRbOZ2Q8tiuxsFC1qvjBLWXM9sYGsQrVZCtzsnIMql%2ByvlTbCwyukXAUN26916gesqB13y%2F5f67A7%2BtN4Grh6v1cNXhKIt7wWokIYVrrdbtYjLsKFUYXy%2Bkk%2FlNe9Lp%2Fhp%2B2PK67qHQv8Z6h3dGmenrY%2Bi8pU5W1VOtROpg%2F8TWKspyRrHqDBM6423SBNQ67O%2BumPxJtqHOfzEQQgun7n%2BPDh%2FuumownSAycHaa990tR6DV2BRtrrRHl8ruhTe3VbGxFyIMYDLQzyzUfIaa6EyIDggOBCFlD%2FjPUxG7ov2z09apWpqPBNrE1upp1mxGD%2FsmAa2M8lNAS32xrpruyvD7E1%2FrOQ6i3%2FUQQJm4FwLmXmzmVc5NyauKVin1hTVNFFPXONi7Yznc7jh987HdkHT7kaffaIVt1spTnLtttjGof%2F9k%3D\"";
	if(!autoX)get("autoDownload").addEventListener('click', function(event) {
		setXAuto();
		event.stopPropagation();
		event.preventDefault();
	}, true);
	get("downloadMe").addEventListener('click', function(event) {
		if(autoX){
			setXAuto();
		}else{
			destroyContainerMost();
			load(url);
		}
		event.stopPropagation();
		event.preventDefault();
	}, true);
	if(autoX==true){
		destroyContainerMost();
		load(url);
	}

	get("deleteAll").addEventListener('click', function(event) {
		destroyContainerAll();
		event.stopPropagation();
		event.preventDefault();
	}, true);
	document.body.appendChild(document.createElement("OnlineVideoStripper5Loaded"));
}
init(document.title);//If not done, do it.
