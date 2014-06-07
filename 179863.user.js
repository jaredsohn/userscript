// ==UserScript==
// @name           Dvixcenter Arama
// @namespace      http://userscripts.org/users/JesWhite
// @description    Dvixcenter
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://*.imdb.com/title/*/?ref_=sr_1
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/?ref_=sr_1

// ==/UserScript==


function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	if(imdbCode.indexOf('/')>0)
	imdbCode=imdbCode.replace('/','');	
	return imdbCode;
}


function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}


var title = getTitle();

var imdbID = getImdbCode();


//Dvixcenter
unsafeWindow.$('<a>')
	.attr('href', 'http://www.dvixcenter.com/search.php?do=process&q=' + imdbID)
	.attr('target','_blank')
	.css({ marginRight: '.25em', position: 'relative', top: 3 })
	.append('<img src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAEVElEQVQ4T73TfVCURRwH8JXj3kAPEIQG0uBe4BA54kWQxEKgFyFiak4PDYWaMTwaUMQ0kMDSEdGGt4NECAnCAeFA3sQcYIBJjjAyMiRQC0JeT4QDkZK3b89zDM6UqdM/7czOzjzPzme/u/tbQv7Hxkki+j5FYq/4Ku/A/OrXdxaWugUozuqJg6MIsfpPOdKJ6faaLbt+6Eg4DXVlPSZV1zB19TrG6lToO6vElQ8+VhdYuiUHEmL2VPgVQnRzLZwz2qNPQtN4Ffco6G5TK9T1KqjrmqFuaMHolTZoWtoxlH8Bld6yrgOEuD8RzTGxO919JA3DlxrRd64Cd/JKMZhXhqFzlRguqtb2wcJq9BdVYaCiFiPna1DuuW0okhCHx9AUYhzU4PseenOVuJ2UgwEKmvzxBu63/YzRvAtQp+ZjJL0Ag1S/o/gaPYo8/JpdhNvHv0CGqaTVmRC9R2gqIbwsjrDrWmgMOuNT0Jv2FeYePMDc8CimLzZiWnkZEyeyMRangDo+Hf3xCvwWl4quuBR0Hs9AjaMfDhCe/BGYTlYHFBrYQ7VjL67vicVU5y0sjE3gXtRJTIbE4mH4CcxGnsIfoUehCTuG4bCj6JEfQac8Du0Rn6LeJQAJxLyVAllaNJMpSCnWE6PBYyu6Io9hYX4e93PLMO4rx3zgIUAWDWyjxuBP8KfsIEZlUejdug83pOFok0XgIv9lJDPWPNhCDO21YBZHUF3CskaNqStuRX8Ouo3JP8P0hp2Atxzw3AMExQGqnzAfkQjNxl34fXMIOryC0ewuRRnPHmfYAgQxjP0XE3IEtaUcW5QRS3SGxmrBUel+TFsHAI7vAnaBVMoY4O44Fj5MgEbkjx6Ht9Eu8UftKjco2TbI4VpjB9NEpgXPsIXFSj1bKMkafO8ZtAiGHIbGaBPA9wes3gKs3wGkH2HGMRDqF15D92ovtKx0RQ17LZRcW2RwBHiTYbiYMJ0liCnmilHCEKFulSsejlC3W9WA/mXrMKW3AbMrPLDwnA9meB4YN9iIXqOX0L7CCY0cCaq4diilwAS25ZQVYUq0YJIu3+VLjmiORsuplDcPJWpTjlMlMix8A5Ov7oZG7I8R7nr0LF+PDn1nqPRfxGWuvRajE+5jWqgoirtUOjppbEElve1i+nJYNug9lY0Z9SimGloxEBKNbn0X/EJB7cudtFgdV4IK7lqUUFgmRwh3HV7Y315LPNNCkskWTZRQaAnTGlWEj28F3mgV+kCla4fv9By0UBM10snKKYzeUTEFhjDNmiiM99jzO8x8fnsWWzijTcoRo2yZEFUMa1zirsM3FEKPS2dGQ/Tie5nmN/UJWTy7f2vhDAtpMos/cJ5anT4butPbWupL37I4IrzPNGtmEuL0RGzphzcx4B9kWqQlsiz7FFQ55FE1VsC1QTZXhES25Wwky7xjkw4vmpq/8pnYPyaY+zIM/aS6xmFSXZP9fjpGuwWEvflp0F/iAIoitkxC6QAAAABJRU5ErkJggg==">')
	.appendTo('h1.header');

//Dvixcenter
unsafeWindow.$('<a>')
	.attr('href', 'http://www.divxplanet.com/cse.php?cof=FORID%3A9&sa=+Ara+&cx=009015947334585847211%3A6djglhionb4&q=' + imdbID)
	.attr('target','_blank')
	.css({ marginRight: '.25em', position: 'relative', top: 3 })
	.append('<img src="data:image/vnd.microsoft.icon;base64,AAABAAIAICAAAAEAIACoEAAAJgAAABAQAAABACAAaAQAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+fgD7vbuDur26hPs9ewP9vf2B/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+vz6A97u3h+uxZlnk5lhm3Z4LtSBax/4hmIV+IFmFvhzdyfilZlim6/Akm7c7dwh+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOHu4ByntoZ5jHMw0pVYEvamUA/9qFcm/bVxPf21YCH9tF0e/bFZGv2qVBX9mFUQ+I1uK9eftIJ94OvbI/z8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APz8/ADP38g1gYU9xptQD/yyWBr9uWYm/bduK/2tZzr9vYlT/cB6OP2+cjH9vm4v/btpKv25YyX9slga/ZxRD/2KezvKvN28P/r8+gP///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+voBt8qqVI5oJ+KtVRf9uWQm/b1tLv3BeTf9tmwp/adXMf2nVyz9t3Iw/cOBPf3CeDf9wnY1/cByM/29bC39uWIj/a9VFv2EZBfqr8maZPj7+AX///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz8AM3dxjiOaCfir1ga/btoKf2/cjL9wnY3/cN7Ov29fjj9qlsq/ahaPP2iPRT9vYA7/cN+PP3DfD79woBG/cKDT/3AgU/9u3ZE/bBiLP2LcSvjtdGnVvz8/AD///8A////AP///wD///8A////AP///wD///8A////AP///wDi7t4fhIA5zq5XGv2/aCf9xnQw/ch6Nv3JfDf9yXw4/ciJPv2wYCL9r2hH/aEtDv2sSxj9xpdf/cWdeP3Jnnr9yZt1/cmWbP3HjmH9wYBP/apZI/1/bCzZ4O7gHP///wD///8A////AP///wD///8A////AP///wCY3r9kPMDI7kGno+6hWiH8wH9T/WiOpP1dp9P9Z6nS/WWo0v08ls79UqDI/WRodP1iaX39TJLI/TyPzf1gnb/9iZeS/Vybwf1Lmsv9RpzT/WWq1f1nqdP9VI67/V5QVf1Cl4PpSsbA4rjn2UX///8A////AP///wD///8A////AGjN3pR81tz9VbDp/WGDmP1slbD9PqHj/b/i9/10w/f9Z771/SWg7/2Dwer9ksnu/ZjM7/1+xvf9ZcD7/Wiu3P1Xp9b9q9Do/Vi4/P1ov/v9sNbu/WrC+/1Lqu79TFh6/Tp9p/2X0/T9jtLtb/b79gb///8A////AP///wD///8AaM7elIfX3f2j2v39gc3//a/V7P1GrPH9tdjt/Viawf2QmJH9mKOd/V+r3v2bzO39p83p/Uak5v1kvPj9ttbs/Xm96P2Gwuf9YLv9/XDD/P3F3ef9aq/X/SuHz/04bab9RY/H/azZ7/0ouL3qiNbEdfb69gb///8A////AP///wBpz9yUdMXc/YfB5v1ptOX9sNLo/Uqs7P1ssdr9gpiZ/cChe/3GtJL9e4yN/VSOwv1gl8b9aISa/Vij0P1tsdf9XJvA/Vio2/1EoOH9R5PT/XWexf1cjb39Q4fF/SmEzP1ikbz9bLPL/TnEx/1Ow8eu8vnyCv///wD///8A////AJ3jvGJAiaP8VpC0/ViXvv1gncD9cJen/Y6ckP21p4f9vp59/bZ7S/2qbzj9flpR/YyGfv20mnr9mpmB/ZmQef22jWD9mZuL/YOChP10R0v9ZUJZ/WRCWv1oPE79ajpH/WVMW/1Wa2Pwac2hm8br4jX8/PwA////AP///wD///8A1vDWJoZdJPqmckj9rohi/bWUa/3BnGf9wZ1t/bmBXf2vVij9sFoo/byTU/24f0L9w6yK/cSkfP3ElWD9xJBb/cSNVf3EkVT9tX1O/alZOf2YGwb9lA8B/ZIQAf2SDwH9lxgB/YVGFOjA3cA8////AP///wD///8A////AP///wDU7dQpl1YX+rlzPf3BjVr9w6Br/cKrhf28ln/9rkke/bqLSP25i0v9tXc7/b2fdf3DsJb9w6B2/cSYaf3ElWT9xJFd/cOSV/24fDz9rGZA/aRMLv2TEQH9kxUC/Zw0C/2fOAr9h1AL/LnTq2D///8A////AP///wD///8Avtq1SpLGhn+YYBf8r3Iu/bSEQP21kEz9tZ97/bulk/2xUCv9rUsT/adTE/2qZSP9vKl+/cOwj/3Do3n9wJpr/baKSf21hkP9vYtO/cKTVP2yfDz9p3A4/Zg1DP2dQRD9tX8y/a9jIP2NUwz9j7dvobPTqlrv9e0P////AP///wC0uGzC4tK1/dvNrP3dy6z93s6v/c6wgv3EpXP9r4VG/bR6Uv2uZjX9topJ/dTAmP2yjk79v6h5/cGoff2yjEv9xKZv/dC5jf2vgzf9wJRZ/a56Lv2rfzL93M2q/cCeX/2eURH9mDoC/aZ4M/3QyJz9t7Nr/ezs2i////8A////ALXNhL3////9tJ1d/bqTWf29nGP9wqVv/ejcyf3gzLH9rGsn/a92Q/3DqHb96t7M/a1vKv21f0n9tJZY/cGkbf3m28X93s+x/dG6kP2vhT39updi/a6MVf29omv94dG5/celd/27kln93dS6/bzGif2Kq1S56PDjGv///wD///8AtM2EvP////2NdhX9o2Qg/bKIWf2niEv9zbSI/fr28/2yhUL9sH9P/cSqev3q4M39sYJE/bCES/24llb95dnD/cGlb/2wi0b939G2/cSodP2ykl/9uZ2F/auKUf26l1n97+Xa/fLs4/27snr9epY40ujy6BX///8A////AP///wC1zYS8/////Z2dRf2pfjT9s4VF/bmaY/3l2sX95NS8/a57Ov2tdTz9v6Bp/eHStv2vfj/9qXsz/dnHpf3Nt4v9sZVg/bafdf20lFP93s+x/a2FPP2mczD9t5dY/eHSuP3awqP9yq+C/c/Sqf2VqVjlydWwTfj5+AX///8A////AKa4Y8bCyo/9vMSE/cO9iP3NsIb90bmR/cqugP2ufTn9tHZI/a58Qf2wjUb9v6Bn/al3Lf2pgjz9rY9L/bGSWv28nX79wrKW/bWZZv2shD/9o3gl/aR6Jv3Ms4f9xaJw/Z5gEv2Hex/rprNh97TCeP2Ahg3y6ObSK////wD///8AxNGoVY+5apOMsmWYgKZQs4djDfakZCL9r3lI/biAXf29hmz9uoxs/ayERP3Ru5T9vqBn/a+RWP3CuqH9vZ6G/bqJcP3Br5X9wbCX/bmOc/21j2X9rYlM/ah8PP2hUhb9iEsR9bPRp1q+zJ5elrpwjZ+7d4bw8egV////AP///wD///8A////AP///wD4+/gFq72ScZdXH/q0dlT9uYdt/b6Zg/2+mIT9u5R6/bCUZf2uilT9tZFs/cGyn/29nIn9vZWD/byZhf29oIz9vqWS/b+jjv29nIj9t4Fi/ZJYG/aTrnmF+vr6A////wD///8A////AP///wD///8A////AP///wD///8A////APz8/AD09/QJnah3jZhmLPOxbEj9uYxz/b2Zhf3ArZ39wbKn/cGzqP3Ct6n9wrWn/b+klv2/o5T9vqCR/b2cjP29oo79u5V9/bR7Wv2XZS33kqdlmun06BX///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDs8uwPpK6Bg4lWFfisZDv9toJp/bubiP2+pJX9wbGn/cCvpP3AqZ39v6aa/b6ilf28m4v9uZF9/baFaf2ub0X9kl4h9o2scI7n8+YV////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+/gDt9q2R4d7PsKPSRH4qFou/bNxT/23g2n9uZF9/bmSf/25jHb9toBn/bFsS/2nUy79kk4U/YaCPca70K1V+Pr4A////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD8/PwA5fDiGbjKplaGk1GzkGQp2o1VHO6WThf9m2Mt/ZhhKP2MTxrzj1sq2YqHRb20x6Fc5O7iGvr8+gH///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz8APT59Ana7dojvdW1SbbDmW20wJRwtsacbbnTr1Xa7Noj8PjwDP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/////////////////wH///wAf//wAB//4AAP/8AAB/+AAAP+AAAA/AAAAPwAAAB8AAAAPgAAAH4AAAD+AAAA/gAAAHgAAAA4AAAAOAAAAHgAAAB4AAAAPAAAAz/AAAP/wAAH/+AAD//4AD///gD///////////////////////KAAAABAAAAAgAAAAAQAgAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/P38AOLr3CHAwqFduK6Dhbayh3zP1LtC9Pj0Cf///wD///8A////AP///wD///8A////AP///wD///8A8PXuDqmebJajYSDwrF8n/bp1Ov24Zib9rV0c/J5yNdTHz7JM/P38AP///wD///8A////AP///wD///8A8PTuD6J9RsW4ZSb9wXY1/bFnL/2qWCv9wX47/cJ5O/2+dTv9p2Mn+LnCmWn8/PwA////AP///wD///8As+bgVJKcdrWlc079lY+D/Y2NhP2MfGf9gGRm/YSDgf2dm5H9iZqg/ZWYlv12Z1fzmdLIeez49BH///8A////AHXS3cl3tt/9aK7c/ZDG5/1tpsX9hMDp/YHB7f16wO/9gL3j/WS9/P2Syer9Pn63/XCu1f2N19l1/P38AP///wBuv8W8Z6fP/XKtz/2Mo6L9v5x1/X15dv2Cj5b9fp+o/YGbof1gf6H9ZmyN/U9giv1ifpD6btDEn/r8+gP///8AsqR6kbR+UP2/n3H9uX9a/bRyOf25ilH9w6iE/cSVYv3EkFf9sG5B/ZkiDf2VGgT9jzkJ+N3r2Sb///8A2+PHQ7qxf97HpHL9v6Fv/bR9Vf2uZCn9u5di/cKpf/27llz9vJNV/biHRv2xfEj9rGws/Z9aGP2zwYi99fbvD9jlwF7PxJz9s4dN/civg/3OrYT9uZJg/cysgv20jFH907+Z/c+5j/24lVz9tJVm/dS9mf3RwZz9qr9/p/f69gbV4LhgxsqW/bucYv3Ot479vZBe/bKIS/2+mmL9tpVY/bufcf24n3H9tpRU/bOOTf3Ipnf9saxq+KSyY8n29vAM7/LoFcXZskqqsHmIqGo3/buJbv24j2v9u55t/bqjgf28loD9v6aP/buZfv2yiV39lGkv29rlzy/L3LhF+vr4Bf///wD///8A+vv6AbKshIWobEL8u5mF/cCuo/3BsaT9v6SW/byaif23im79mnpF3tjjzDH///8A////AP///wD///8A////AP///wD8/fwAyNC1SZ1/TcChaz/wqXVQ/aRvR/qcZznjrKF1jurx5xf///8A////AP///wD///8A////AP///wD///8A////AP///wD6/PoB5O/iGtngyjfa5NEw8vjyCv///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//wAA/v8AAPAfAADgDwAAwAcAAIADAACAAQAAgAMAAIABAACAAQAAgAEAAMAHAADgDwAA+B8AAP//AAD//wAA">')
	.appendTo('h1.header');

//Dvixcenter
unsafeWindow.$('<a>')
	.attr('href', 'http://www.turkcealtyazi.org/find.php?cat=sub&find=' + title)
	.attr('target','_blank')
	.css({ marginRight: '.25em', position: 'relative', top: 3 })
	.append('<img src="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADo7PAUbqPajmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmKg3ppioN6aYqDemmyj2pDk6e4Ygq3aewB8+v0Affv9AH37/QB7+P0AefX9AHn1/QB59f0AefX9AHn1/QB59f0Ae/n9AH37/QB9+/0AfPr9eKnahmih3JQAffv9AH37/QB8+f2VueP91d/u/dXf7v3V3+791d/u/dXf7v3U3+79gLDl/QB8+v0Affv9AH37/WKg35pioN+aAH37/QB9+/0AfPr9C3rt/anG6P3////9/////f////3////9lLrm/Ql67/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AH37/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0Affv9AH37/WKg35pioN+aAH37/QB9+/0Affv9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0Affv9AH37/QB9+/1ioN+aYqDfmgB9+/0Affv9AH37/QB9+/2Gtej9/////f////3////9/////Wem6f0Affv9AH37/QB9+/0Affv9YqDfmmKg35oAffv9AHz6/QB9+/0Affv9hrXo/f////3////9/////f////1npun9AH37/QB9+/0AfPr9AH37/WKg35pioN+aF4Hu/Y+66v0Pfe/9AH37/Ya16P3////9/////f////3////9Z6bp/QB9+/0zjOr9gLHn/QB69v1ioN+aYqDfmkST5/3////9XJ/n/QB8+v2Gtej9/////f////3////9/////Wem6f0AfPn9qMbp/e7x9/0Cdu79YqDfmmKg35pFk+f9/////cna7/0Hee/9hrXo/f////3////9/////f////1npen9LIXk/ff5+/3u8fb9Anbt/WKg35pioN+aRZPn/f////3////9nMDp/Ya16f3////9/////f////3////9baDc/env9v3////97vH3/QJ27v1ioN+aZqHdlhSB8f1Llub9S5bm/TOL6f0niOz9S5bm/UuW5v1Llub9S5bm/SGD6v1Jlef9S5bm/UaU5/0Ae/f9YqDfmn6r2n4AfPr9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AH37/QB9+/0Affv9AHz6/XKl2org5uwcWJjYpUKP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu0KP3rtCj967Qo/eu1SV2Kjc5OwhgAEAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAEAAA%3D%3D">')
	.appendTo('h1.header');