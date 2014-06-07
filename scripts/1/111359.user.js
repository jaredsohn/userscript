scr_meta=<><![CDATA[
// ==UserScript==
// @name	Bofu Emoticons -GLiTCH-
// @version	1.00
// @author	-GLiTCH-
// @namespace	a
// @description	Emoticons
// @include        http://*.orkut.*/*

// ==/UserScript==
]]></>;

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	

smileyarr["smiley_001"]="http://lh5.ggpht.com/-nJTyZjOG4U0/TlO4PY-EYKI/AAAAAAAABUs/dUxfcv6YrAU/1.gif"
smileyarr["smiley_002"]="http://lh4.ggpht.com/-7T7es1kX19o/TlO4PKMUpJI/AAAAAAAABUk/-sijm3UCy9Y/2.gif"
smileyarr["smiley_003"]="http://lh6.ggpht.com/-Jy-2VrDB_QA/TlO4PE8m6YI/AAAAAAAABUo/6hpI03IT84k/3.gif"
smileyarr["smiley_004"]="http://lh6.ggpht.com/-vfFW29_c7LM/TlO4UOS2X2I/AAAAAAAABU0/VFQwnEcMxZA/4.gif"
smileyarr["smiley_005"]="http://lh4.ggpht.com/-SvgiN4DtnWc/TlO4T2nBTAI/AAAAAAAABUw/3WssLcjFwIE/5.gif"
smileyarr["smiley_006"]="http://lh3.ggpht.com/-GrGYBfP8Ktc/TlO4UB8HbNI/AAAAAAAABU4/vFqiLrxAeqE/6.gif"
smileyarr["smiley_007"]="http://lh6.ggpht.com/-KBt3VNoHSfI/TlO4ZDZaN7I/AAAAAAAABVA/Kue2OLDj3hM/7.gif"
smileyarr["smiley_008"]="http://lh5.ggpht.com/-tujgPRoUGDg/TlO4ZKv5pyI/AAAAAAAABU8/i_fvIKUYCPs/8.gif"
smileyarr["smiley_009"]="http://lh3.ggpht.com/-IRk-kxWcFbw/TlO4Y0wYDBI/AAAAAAAABVE/FwVvVTnI1Sc/9.gif"
smileyarr["smiley_010"]="http://lh4.ggpht.com/-j0A8qpnow7g/TlO4dlYy1EI/AAAAAAAABVM/77Fb64U7sUw/10.gif"
smileyarr["smiley_011"]="http://lh4.ggpht.com/-gPc-vN0CGNE/TlO4c-B5CwI/AAAAAAAABVI/R9CljB3LUg0/11.gif"
smileyarr["smiley_012"]="http://lh3.ggpht.com/-JpXNs9TSE3w/TlO4f5e8HgI/AAAAAAAABVU/KKoxnHGyvgQ/12.gif"
smileyarr["smiley_013"]="http://lh6.ggpht.com/-x_cGRKlIySY/TlO4fdidE9I/AAAAAAAABVQ/wWSaBXdL4J4/13.gif"
smileyarr["smiley_014"]="http://lh4.ggpht.com/-MzoA4bLCMZk/TlO4jfuf5XI/AAAAAAAABVY/1V8BLAWfyWQ/14.gif"
smileyarr["smiley_015"]="http://lh4.ggpht.com/-psGUQNzMIT4/TlO4kj8WxiI/AAAAAAAABVc/r4M6ENgN2-s/15.gif"
smileyarr["smiley_016"]="http://lh3.ggpht.com/-Li77m1P7T1c/TlO4nJ2HF9I/AAAAAAAABVk/sncawSQjRoo/16.gif"
smileyarr["smiley_017"]="http://lh5.ggpht.com/-dec-DDqacFo/TlO4mxzCqjI/AAAAAAAABVg/qT41TokoCYc/17.gif"
smileyarr["smiley_018"]="http://lh5.ggpht.com/-g2SQ8lBkiYU/TlO4sf7EvlI/AAAAAAAABVs/NPthNyarS9w/18.gif"
smileyarr["smiley_019"]="http://lh4.ggpht.com/-x-tmIHFtD60/TlO4sFKQiZI/AAAAAAAABVo/-xf2REThyk4/19.gif"
smileyarr["smiley_020"]="http://lh3.ggpht.com/-KPOnvIs7b-Y/TlO4uFgz5HI/AAAAAAAABVw/P-bK1epF1TI/20.gif"
smileyarr["smiley_021"]="http://lh4.ggpht.com/-h3wqcgL1pYk/TlO4u2-FZBI/AAAAAAAABV0/NsiZpcv-dVI/21.gif"
smileyarr["smiley_022"]="http://lh3.ggpht.com/-Cl5KED5wbrU/TlO4vkPZXaI/AAAAAAAABV4/1H02nK5Uxrc/22.gif"
smileyarr["smiley_023"]="http://lh5.ggpht.com/-MxNutT-ioY4/TlO4ytdj_wI/AAAAAAAABWA/hiXIRPvoPFY/23.gif"
smileyarr["smiley_024"]="http://lh6.ggpht.com/-gIZEAJ6pr_0/TlO4xtw8JbI/AAAAAAAABV8/kJhIn83K8XM/24.gif"
smileyarr["smiley_025"]="http://lh5.ggpht.com/-M-8lcadGZPE/TlO41pjTVeI/AAAAAAAABWE/4Bv8tCwC_T8/25.gif"
smileyarr["smiley_026"]="http://lh6.ggpht.com/-NScNMKz9n7c/TlO4283beEI/AAAAAAAABWI/UOVBgoh3hLg/26.gif"
smileyarr["smiley_027"]="http://lh3.ggpht.com/-dGhIi-0vLPc/TlO43QKe2LI/AAAAAAAABWM/WGsbh6oWBAY/27.gif"
smileyarr["smiley_028"]="http://lh4.ggpht.com/-k3r-gzt6ySg/TlO4-QlbdfI/AAAAAAAABWY/8PkVEUt5iXM/28.gif"
smileyarr["smiley_029"]="http://lh3.ggpht.com/-NHqdr8EQHjU/TlO49fhawlI/AAAAAAAABWU/Z-Oln6CLoqQ/29.gif"
smileyarr["smiley_030"]="http://lh4.ggpht.com/-Ct4QQrIT56Y/TlO49e9nwKI/AAAAAAAABWQ/VesJvlHRPto/30.gif"
smileyarr["smiley_031"]="http://lh5.ggpht.com/-sHmkqIid0Mw/TlO5ARC4F7I/AAAAAAAABWc/HkePlCbkQ8s/31.gif"
smileyarr["smiley_032"]="http://lh4.ggpht.com/-v6aaGcquMwg/TlO5Co_Cr0I/AAAAAAAABWg/t2wniih5aAg/32.gif"
smileyarr["smiley_033"]="http://lh4.ggpht.com/-ZgLc4g5RBJk/TlO5FpJO3yI/AAAAAAAABWo/LSGn_vLlOu4/33.gif"
smileyarr["smiley_034"]="http://lh6.ggpht.com/-cLu9eTN6--A/TlO5EsBUFMI/AAAAAAAABWk/-UHZLBOC-0c/34.gif"
smileyarr["smiley_035"]="http://lh3.ggpht.com/-k884eumdwjQ/TlO5Ggmt02I/AAAAAAAABWs/urDQslIfUBE/35.gif"
smileyarr["smiley_036"]="http://lh5.ggpht.com/-a1G97_FEQeA/TlO5HIc169I/AAAAAAAABWw/H23kIAjpYFk/36.gif"
smileyarr["smiley_037"]="http://lh5.ggpht.com/-zwD4HLRporw/TlO5LRuYwAI/AAAAAAAABW4/EQJdQEFnrEo/37.gif"
smileyarr["smiley_038"]="http://lh5.ggpht.com/-JbBEi6OvGQM/TlO5Jxvy9XI/AAAAAAAABW0/5XhUeIuHF4o/38.gif"
smileyarr["smiley_039"]="http://lh6.ggpht.com/-2hcfNTeWASg/TlO5L3sHTVI/AAAAAAAABW8/MXEBMAhj2fk/39.gif"
smileyarr["smiley_040"]="http://lh3.ggpht.com/-FsE6pF-dNRA/TlO5NgjJ75I/AAAAAAAABXA/haEgHHhAI0Q/40.gif"
smileyarr["smiley_041"]="http://lh4.ggpht.com/-kegwYGtBVuw/TlO5OTBbtQI/AAAAAAAABXE/pepBnt7at7g/41.gif"
smileyarr["smiley_043"]="http://lh5.ggpht.com/-ho-zr5AXqhQ/TlO5UaJEIuI/AAAAAAAABXM/n8rR0zWiE8w/43.gif"
smileyarr["smiley_044"]="http://lh3.ggpht.com/-IbVBl3RzBjI/TlO5UFanr2I/AAAAAAAABXI/TL8wcBHL1To/44.gif"
smileyarr["smiley_045"]="http://lh4.ggpht.com/-cSCixAcEGzA/TlO5UxuJIjI/AAAAAAAABXQ/mXhJSaBvu84/45.gif"
smileyarr["smiley_046"]="http://lh6.ggpht.com/-4ZZDrOdIVGM/TlO5WKRyG7I/AAAAAAAABXU/PDZ9BlhvCcU/46.gif"
smileyarr["smiley_047"]="http://lh6.ggpht.com/-WrMTLnP7wCQ/TlO5XIMu2vI/AAAAAAAABXY/dlSw6NAXes8/47.gif"
smileyarr["smiley_048"]="http://lh6.ggpht.com/-2QpA6ne0alc/TlO5Xsuw39I/AAAAAAAABXc/CDS86R4MmNc/48.gif"
smileyarr["smiley_049"]="http://lh3.ggpht.com/-LKsZ_EE9tdw/TlO5bW9ub4I/AAAAAAAABXg/fjy-GTMhfi4/49.gif"
smileyarr["smiley_050"]="http://lh5.ggpht.com/-iRDQH83vBCs/TlO5bvBvMjI/AAAAAAAABXk/em7YcZI76k0/50.gif"
smileyarr["smiley_051"]="http://lh6.ggpht.com/-kr1OFQwKa5k/TlO5b9HDy_I/AAAAAAAABXo/v-Gi_izl4ss/51.gif"
smileyarr["smiley_052"]="http://lh6.ggpht.com/-S8WIbbFOqH4/TlO5hUiZXnI/AAAAAAAABXw/62DDTmMKA4Y/52.gif"
smileyarr["smiley_053"]="http://lh6.ggpht.com/-DNE_Yqzl_Oo/TlO5hY7p8RI/AAAAAAAABX0/bmZvnpq_dCQ/53.gif"
smileyarr["smiley_054"]="http://lh6.ggpht.com/-PEedS-nyJdk/TlO5hEwSWxI/AAAAAAAABXs/47U-FlMR62g/54.gif"
smileyarr["smiley_055"]="http://lh6.ggpht.com/-1cw_0u-e6uE/TlO5o_XvK7I/AAAAAAAABX4/E3cdgn0QUZ0/55.gif"
smileyarr["smiley_056"]="http://lh4.ggpht.com/-r4Om0RU1WDw/TlO5u39dliI/AAAAAAAABYE/PXuYs4I16GY/56.gif"
smileyarr["smiley_057"]="http://lh5.ggpht.com/-YRRiRjbDyWg/TlO5qQUoZfI/AAAAAAAABX8/XDFJxqq4ejc/57.gif"
smileyarr["smiley_058"]="http://lh5.ggpht.com/-IVSlqYuAR2c/TlO5uQRIvxI/AAAAAAAABYA/cSqKsI37rqM/58.gif"
smileyarr["smiley_059"]="http://lh3.ggpht.com/-AsALNs7dgyk/TlO54RjGcGI/AAAAAAAABYM/qGYGcS9Aaic/59.gif"
smileyarr["smiley_060"]="http://lh5.ggpht.com/-MUcxQhTs35U/TlO52kzHqGI/AAAAAAAABYI/lCsBav8dtXM/60.gif"
smileyarr["smiley_061"]="http://lh6.ggpht.com/-ZfKDXzucvxg/TlO543HrmhI/AAAAAAAABYQ/MSSugfzzBuo/61.gif"
smileyarr["smiley_062"]="http://lh5.ggpht.com/-dVR02omNs0o/TlO57NHxzqI/AAAAAAAABYU/X9hkh0mqFi0/62.gif"
smileyarr["smiley_063"]="http://lh4.ggpht.com/-nObiB1Skqtc/TlO58xTNsrI/AAAAAAAABYY/KZ96SSlKRuE/63.gif"
smileyarr["smiley_064"]="http://lh6.ggpht.com/-rg_BjlckBis/TlO59ocINDI/AAAAAAAABYc/uT0dm4TNJIE/64.gif"
smileyarr["smiley_065"]="http://lh3.ggpht.com/-isp87USRcOc/TlO5-0Kg8kI/AAAAAAAABYg/OTVpTCgd7XI/65.gif"
smileyarr["smiley_066"]="http://lh4.ggpht.com/-7BmdxQAWI4M/TlO6AyxRUqI/AAAAAAAABYk/NuepmB9QO9E/66.gif"
smileyarr["smiley_067"]="http://lh6.ggpht.com/-LDoQCPJSKd8/TlO6DwuvGAI/AAAAAAAABYo/AspQj6CoUk8/67.gif"
smileyarr["smiley_068"]="http://lh4.ggpht.com/-9PYrAxOpdDk/TlO6EW17TfI/AAAAAAAABYs/An99FAgVW90/68.gif"
smileyarr["smiley_069"]="http://lh3.ggpht.com/-6xrGOnitimw/TlO6K-qgFFI/AAAAAAAABY0/OtPQoSOiT_4/69.gif"
smileyarr["smiley_070"]="http://lh3.ggpht.com/-Kb0Jb0W4g3k/TlO6KAb_SZI/AAAAAAAABYw/dvapohEOSw8/70.gif"
smileyarr["smiley_071"]="http://lh5.ggpht.com/-yb8gTM9NtwE/TlO6LtRXYKI/AAAAAAAABY4/U4VEZ4dyv_4/71.gif"
smileyarr["smiley_072"]="http://lh6.ggpht.com/-YzpKhV6CpqU/TlO6Oo2stTI/AAAAAAAABZA/5giF74cqwNw/72.gif"
smileyarr["smiley_073"]="http://lh5.ggpht.com/-4213QwwMWHQ/TlO6NbwAcdI/AAAAAAAABY8/go7GIDWxWys/73.gif"
smileyarr["smiley_074"]="http://lh6.ggpht.com/-Rk3U6A0fkwU/TlO6QP9CyTI/AAAAAAAABZE/rusmeQZ9nro/74.gif"
smileyarr["smiley_075"]="http://lh3.ggpht.com/-JuFozGBNMN0/TlO6RmuBz1I/AAAAAAAABZI/rj_78FCLXnI/75.gif"
smileyarr["smiley_076"]="http://lh4.ggpht.com/-lLcCiAySd1E/TlO6WxQppKI/AAAAAAAABZU/-_bx0rVhfHo/76.gif"
smileyarr["smiley_077"]="http://lh6.ggpht.com/-Eq8OJGHaUDk/TlO6V6J_dVI/AAAAAAAABZM/rERfowJfCJ4/77.gif"
smileyarr["smiley_078"]="http://lh3.ggpht.com/-fSipacG5AJE/TlO6WoMRkDI/AAAAAAAABZQ/7p8bpChvYr0/78.gif"
smileyarr["smiley_079"]="http://lh6.ggpht.com/-6-SaNSZwaAo/TlO6YcxJ5BI/AAAAAAAABZY/cWB7ZqgnKS8/79.gif"
smileyarr["smiley_080"]="http://lh6.ggpht.com/-fHw449qrfqY/TlO6c1abh5I/AAAAAAAABZc/1Oo8Oqge5WY/80.gif"
smileyarr["smiley_081"]="http://lh3.ggpht.com/-LS4l1HvJP6c/TlO6loVdI0I/AAAAAAAABZk/YZvRryFcUzc/81.gif"
smileyarr["smiley_082"]="http://lh5.ggpht.com/-BdgIzfpO-Ys/TlO6qch8kYI/AAAAAAAABZs/fcNEUR5RF5Q/82.gif"
smileyarr["smiley_083"]="http://lh4.ggpht.com/-OCm-AUSDJo0/TlO6ldh7POI/AAAAAAAABZg/am5FHG1GKAY/83.gif"
smileyarr["smiley_084"]="http://lh5.ggpht.com/-e2rKbVyMq8U/TlO6pUMErGI/AAAAAAAABZo/ykm-wXMdCGw/84.gif"
smileyarr["smiley_085"]="http://lh6.ggpht.com/-bc30cltWqCI/TlO6q5P7zqI/AAAAAAAABZw/fQvuVQuFmKc/85.gif"
smileyarr["smiley_086"]="http://lh3.ggpht.com/-NiUd6NX8XRo/TlO6wjV9WrI/AAAAAAAABZ0/eV3Lo0y-b0E/86.gif"
smileyarr["smiley_087"]="http://lh5.ggpht.com/-4MCwRtTaDqA/TlO6xYAcikI/AAAAAAAABZ4/B98bykZOjT4/87.gif"
smileyarr["smiley_088"]="http://lh5.ggpht.com/-T86aE7TcfSg/TlO6zr0HdWI/AAAAAAAABZ8/n_ZmrEgHFFY/88.gif"
smileyarr["smiley_089"]="http://lh4.ggpht.com/-hLvl8KyXFaU/TlO64EbYr6I/AAAAAAAABaA/bJgdgqQaVZc/89.gif"
smileyarr["smiley_090"]="http://lh3.ggpht.com/-Wdwi2RC_9oc/TlO68vd9XPI/AAAAAAAABaM/98GdU6JctDE/90.gif"
smileyarr["smiley_091"]="http://lh5.ggpht.com/-JRcdfdX2Ns4/TlO65F_NFPI/AAAAAAAABaE/lgmyHOl2xWU/91.gif"
smileyarr["smiley_092"]="http://lh3.ggpht.com/-PtcSKSx_-AY/TlO67vtBcwI/AAAAAAAABaI/5NnkAQNqMFA/92.gif"
smileyarr["smiley_093"]="http://lh3.ggpht.com/-I2-evWVR6dg/TlO6-kyRHoI/AAAAAAAABaQ/O-05c6j3U5Q/93.gif"
smileyarr["smiley_094"]="http://lh3.ggpht.com/-lxPbGRq5MMQ/TlO7ETz-BnI/AAAAAAAABaU/5Zp91KG5eik/94.gif"
smileyarr["smiley_095"]="http://lh5.ggpht.com/-NkqDu8x7FBM/TlO7GMCNC_I/AAAAAAAABaY/6YlUIY0Ynh8/95.gif"
smileyarr["smiley_096"]="http://lh4.ggpht.com/-MaeyCtm_vls/TlO7Pax3lYI/AAAAAAAABac/oxHOg5zpadg/96.gif"




	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		count = 1;
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			if(count%9 == 0)
                        { 
                        mm.innerHTML=mm.innerHTML + "<br />";
			}
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
			count = count + 1;
		}
	}	
}
dip();
}, false);