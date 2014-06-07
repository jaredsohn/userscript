// ==UserScript==
// @name        dA_quick_img_pop
// @namespace   dA_quick_img_pop
// @description Displays buttons beneath each deviationon its submission site, so you can easily see how much resonance a picture got!
// @include     http://*.deviantart.com/*
// @include     http://fav.me/*
// @version     1.31
// @grant     	GM_getValue
// @grant     	GM_setValue
// ==/UserScript==

(function(){
	var $=unsafeWindow.jQuery,holder,query,offset,fPage,pPage,lPage;
	var imgblF="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEIFwwoGsn2DQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAFj0lEQVRIx7WXy28b1xWHv3vnzoMcDilSpC0pstM4id2GaRdJ4QRI0X%2BgQIEsuyq66bbZ%2BB%2FI1osEBdouuzS86gtoFgW6yaIOkBZtYsULw6lhW5JLmZT4nPe9WWjIjAhastGEwAGJ4dz5zjlz7jm%2FK3i%2Bjzjjf%2FOsD1LPCRNPccA8rxPqGaBzkyUTJbgpTJfMnAVXZ0QpAKu4zy5MFddkcY8GciAD0sKy4tpToxenQOdAB%2FCASmFe4YBV3JcXsAgIC4uAZMkBc1rEZahdQGpA%2Fdg614VIuzAMhBALsDH1sTH2DhxcA0aFTQoH5s6JMlycAq0CDaCJ2Pq1oPeWlMaybRvXdVFKIYQgz3OSJCFJEvKcXJvOLczer4BDYAjMioyciHwZLAtoBWgCbdSlP0h9f8txHBqNBu12m06nQxAESCmJoojBYMDBwQH9fp8wDMnFxT2Tfvku8KRwICzgehksSoVUKSI9h%2Fvan0Vyd8vzKmxsbHD58mVeffUVLlzYptFoLMC9Xo97977kzp07PHjwkNFoSGZd2iP%2B4qdAr4g8LKI2gLFWROsDLVHp%2FkbE%2Fa7jrNPpvMTrr%2F%2BQN964ypUrr7G5uU2jsU6ttkat1qReXycI2kgZMJtJJhNDFh0FeC92yQ7%2BViq0RcTl4iqnuW6ovC3FeSqVOpubr%2FDid7q0Wi%2Fw5ps%2FRkpxolSMMXz3ezlHQ%2BgdaJ70JWG4T4Z6uyjMeaHN4SeawRxctRtXr2OkJWubuK1L1Ddexq6tM80cZrnHJHWZJC6T1GVcfEe6irHr1NrbVNsXUfUthJGW3bh6vShUu8xbjlgBrvI2utoSSGcNVTmHcZpMEhczEswyH6MNQgr%2B%2BtFHxRvTIARJqshkHVU9j%2BWnSGyUbbrpELd4tlzex%2BXisqWqBY6qodwWltcmzuoMpx5RpohzGyGOEzYYKkBgipxnmWQa%2B2hrHaeSobVCMglKDWfOMWrFdrKEVbFcbwPldsBpMYl9BtM6XqbIra8XHM7qi986T8m1YBTZ5AKUZ%2BGiyKJdq9RiFz1%2BZa92vSaW10R5baTTIjY1RqFDnCtyBcIcL%2F%2FFL3%2B0WPPBh%2F8hSzOmqQtKYnsgSLGYMTljSMwnTG47QW67Dcv2WlhOG2nVyKhgtIWwQZbnkgCtIcw6aJ2DCLFsF68iSYlI9Sgv79%2Fl7TS%2FkANpRQ3Hnv%2FSmu07VHwfoWo4jo8UimYLtAEl4f33I4w5fr%2BB30CbjDy1yVJDOB2RCosoGY5LE8us2se6%2BDOOprs77c0r79QaGZVajrQlXtVCa0VnHWzneMG5cy5gMMZgTI7ODdEMdJoTqoyJDjna3d0B4vIenoNNCZwCs%2F27N6%2B9fPkHHwfOmhX4PtWai%2BtZKAe2fRdVVMh2J8dgyHKNMClZEhK6U%2BLpiFEyIJVP8v27N6%2BVBsW8c5nliNOip472H9y%2BtXG%2B%2Fk7V9vA9iyAA19OsUVss6Kwnx6nWKVkaE0cTXNFnlPSYiR77D2%2FfKkZkeUisLK6saG2je5%2FfeG%2B9vfantYbacgBHaioq5rc3I5TtILBo%2BmDISeOEREwhHRHlPUy6x6P7X%2Bzd%2B%2BzGewU4Kr3jxex9qlrcvf%2FpXxz%2F4k%2F8qhNonaF1RpYmZGlCmkYk8YxwNmY6OWQ86nN0%2BJij%2Fh47t2%2FvffL3370L9AtwvFTZJ8BiSaRpQD%2F676d%2FzFjr2sp6wehEJnG4AM6mQ6bjQ8bDJxwNHvO%2F%2FUf5Z%2F%2F%2B5z%2F%2B9fHvfw4MSuPwRGGt0lynSp%2Fvv%2FWz6xubF7rNVivwPNcCiKI4PxwMxo%2F3H%2B58%2FsmNVdInXaW7xCmSVq4Qe9WS2JNLRRkV1bss9nQ5xWedDERpYskV8lYt6epshbzVpfSa5z2S%2FD%2BC3pwm6MU3fIQxz3qEeRbwt3Jo%2BwrXsX%2FHvp9%2FQgAAAABJRU5ErkJggg%3D%3D";
	var imggrC="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QEIFwskXD4s4QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAFHElEQVRIx7WXy29bRRTGfzP3%2Bu1rB9dpbRfUR5oWlFSILqACuqsEEhIofwEr1mxg331YIfEHwI4VFNQN7CgSlSKqIBEQQq0gFW6TOM7L7rV978xh4XF0YzmPSmDrbOaO73e%2B42%2FO%2BUbxbB91zHM56Yv8ZwRThyQgz5qEfwLQUehEqAS4uLCJkOPA%2FWNYKsBz%2B1IufLem3R4LGCAGIhexWzuUvToCdASYBrJAzkXWJeC5fcaB9YDQRQ8YjCUgRzFOgqYcSBEoASVVU4vAHHsEKlRD4DxGirIHrMgT%2BRjYddFxCYySU0lwdQRoHigDz6mG%2BpQ%2Br%2Bld7aVSKTLZDL7vo5TCGMOgP2AwGGACYyQt96QpHwJbwA7w1FXkAPNxYO1Ac8BzQFVdVF%2Bplmqks2nK5TLVapXp6jRBEKC1phf2aG%2B12djYYLO9SdgNsRXbtA%2FtAtByCYQO3I4Dq4SQco7paXVFfcM2jWwxS61W4%2FLMZWYvzPJC4wXKQRmtNL1%2Bj%2FXNdR789YDf%2F%2Fyd1Uer7G7tYgLTlD%2FkXWDdMQ8dawHEm8C2AFTUrP6MAXPpqTTTz08zf3Weay9f48rsFeq1OuWpMsVSkWKpSKlcIpgK0DnNU%2FuUTtQh6kaBmmZO2nyfENo%2B46S4kmUuSdFe12hylRz1mTrnLp2jcqaCyipqtRqXGpeoBBU87dENu6xurLIdb7PeW6c1aBHqkNjG150wR0IbgR9oBiPgvJ7Xi3h4%2BpQmU8tQqpdIlVPYjOXtV9%2FmxvwN6pU6mVQG3%2FMpF8tcvXAVyQnF00XytTx%2B1Ud5ytPzetEJNZXEG2fsAxmpyByZ4T%2BtygpTMHR0h7feeItCpUCb9sSu05Y2g%2BwANaVQHQUWpC9zQMa9W4%2Bf46S4UlKQgCLIlBAFETvpHc6%2FeB5VUTRpYqzhh19%2FYPnhMt1%2Bl2pQ5c25N1mza7S9NmEuxE5ZMCAdCRINZ4Qj%2FoTj5JHGozQEDoOQlm5RvVilSRON5s79Oyz9ubT%2Fw0c7j7h%2F9z6xxGzrbTr5DnEQI5HAAC%2FRYvd7%2FORenRtq2xYsg8KArewWUTniMY%2FRaL77%2Bzv6Xv%2FgKNJCFEd0%2FS5hPsT2LfSB7vFDQvYbfgZDFo8CmIIhzIVsq20iIhSKVq5FP%2B4Pd2sQI4gSjG%2BIiYltjMQy1HEGkzy%2F48dptGCASPXVnmRkigxIUTB5Q7Pb5Gz5LAAzMzMsPV460PrFyDDSgmgHmgLVV3uCjCbWPrBOMLbuYV9v6BWsk0QaJCcsby5j3Pfm5Zu8fvl18qfySFmonq6y8MoCtmiRjAznWWr4Rr2hVxgWff8Mj7dMP9GjG3zEXc7h0QBOgQ40H7z0AfVc%2FVDXcOvnW8O5tA38A%2FyN4RNuAM1Ez44BGWccuYe73op3j9DlGoHVli%2BaX7DaWz3cr3iukL3hTPJ%2B8%2B65EZkcEhw3JM5473u3zXXToAFMu%2BZXdNYg6T%2F6bvjtAmvAY%2FDueU3zuXnPrRw6JCYaNflFvvWmvXekIMG%2BNgcuHCv2XGk3gScOdMlrms%2FNglvddakllY031kBk7GhZWZav%2FbQ%2FJ2k5S4QmTADuuH%2BuNQRVq8r4P%2Fo%2FmS%2FN%2B0A7wfSAsCZ5riOtj%2F%2Bev2jP2zk5I4Fkh9VSPWXUmtrTf%2BmV%2BHY8yfpEk3yXOsLS6glmL58we3pMlKPij5s9myzxcTcDlZhYeoK99cd8dTzB3tpEeU9kb%2F8rQy9HGfrjgJ%2F1CiMnvcKcBPh%2FubT9C62NQ5zrbHjyAAAAAElFTkSuQmCC";
	var imgtuT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QENEiw0qlm8OQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAE%2FElEQVRIx7WXy28bVRSHv3vnzsNJxnacxH23SNAKVSqCBQhY0B2CPwBRFpWQugKxK%2F8GW1iyYEEFa0CqxCKbtoI9RUKlpQqkdfO2nRnP3AcLXycTY%2BJEAktn4Zm59ztn5jx%2BV3C8n5hy3x11I3VMmPgXB9xxnVBHgI5MVkxU4M6brZibBldTohRA4J8LvSl%2FTfpnLGAADZTetL%2F2r9GLQ6AjYAQkQM1b4h0I%2FHPGw3Ig85YDxZgD7rCIq9DQQ%2BaAOlDn5LVlsX0%2BJFcIofa4Li5xjcclT25dBXa89bwDI%2BdEFS4Ogc4ADWCeU%2B%2FfFU%2BfC6VoEIYN4ngGpSKEAGMKiiKjKLYxdhvbflSyeusNYBPYBnb9GzkQ%2BThYemgNmAcWady8J7upiKI2jcYSi4tNlpbmSNMYKSHPSzY2%2Bjx7tsX6eocse4qZ3XFu%2B7PXgTXvQObhdhwsKolU85G2ad38WWzOiyQ5xcmTp7l0qc3Fiw3OnZuh0QiQUpDnhk5nwIMHO9y%2F3%2BHx4z%2FZ2VlB1zccG5%2B9CnR85JmP2gFOjUWs%2FHetq4vX75o%2FUxG1TrLYPsPlK6d5%2BaV5Lpyt0WyGRKFACNDa0WzH1JciomaIrQke%2FmHpb5dCXrx%2BV%2F%2F21SvAYDziKrj6muuaM6F8boFaq82pS0t89OkVWrMQK5DiYKo44EUDW99ZOvESa%2BmA7K8%2BepCHPjFHiaY9%2FEAzGIFnkss3lmmmyBPzxOfr1M%2FOEjShqMFuDL0IeiH0FHSj4f88AZcq5k7XmDmXok7PI5opyeUbyz5RwypvPGIFxEVjIaSZQmMWsZRgmopvflxlNlZIKXnn3YWh3xJ%2B%2BH59r48UwlHMKcRigshnIUgp1EIIxH5vOV7H1eQKbapgIcHNR5StkO0YOoElERaBpTuz7%2B2qNOAcONCBZSN0ZPUAuxSDSLBDxKjh7H0kNaGcApoBtBSupciasDZrcaEhCQVSCnqVRavhsDyddWhj2EosvQZoLXFWQRFQabF7PX5yr06HBWUXoGhYNucsZWyI1T%2FBT2oe7BylMfQDTYbFOp9K%2FelDwu01%2FMRAXUNTY1qWLNLoOEDFIKRgt7Jobd7gnMMVDmMMumbQGJzWkGvYMFTrd7ycRhcMUKqsROsc9ADnCkyYYGNDIQQISVEB97EgwIUWJw2u1DhVDEtX56isRO9PrD2wrOxh%2Fc1ButIrGXTB9MFmODnASo2JDCa2B1zXiUPHFhMZrNI4BmCz4dpBl3SlV%2FoGslfDo4hdBVwCu5u3v7jKlU%2FuDDvsAGwXRAoqBBEBz%2B%2B7G3XAahAaBgMo%2BzDYhKwD%2FVU2b39xtTIo7KSWOQJnwE7z191yK%2F0jJO6DbAwzziYQx8Cb%2B6vKh6ANDCxkfdjpw%2BY6rK%2FR%2FMWWW8MRWR0STBsSJ9SH7%2F2kXwgE7RYspjAXQS2CSIFUw32sgEJDlkEvh7UudHZQD0qnv%2Fz2NeDppCExdSyKj1%2B%2F59qrggUFTQWzAcRyPy01w2j7BrY0rGtE55Rzn9870lg8VAjUrr19N7twJ6RuhjWeCFDBMAAN5A66QDeg9ujNMrt1%2B1hCYKr0ST54azk%2F%2B3tIuAGB%2F1xGQtkiWXm%2BzL9eniR9ykm6SxwiaeUEsTdTEXtyLClzH9242LPV%2Bp12MhCViSUnyFs1pqv1BHlrK1l8JHn7Xwl6d5ignwY%2B7hHGHfUIcxTw%2F3Jo%2BxsOyUVlSd1g6wAAAABJRU5ErkJggg%3D%3D";
	var imgroT="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA%2FwAAAAAzJ3zzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QENEi0yWiEoTQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAE3ElEQVRIx7WXy24URxSGv6rp7rl4bh7mYkATggUEEYWwgETEwUSskLLIc7AKizxGpLwHuywixIYEK7ZEnGTBBgnFIHDA0IxnfJlxj3u6qrJw9dCeDB5bSlo6m%2B6q89d%2F%2BpzznxIc7RETvpvDOnKOCCbecwBz1EM4hwCNTSZMJMCNNZ0wMwncmcBSACm7zrXm2HfSrtGAAiJgYC2y797LXhwAGgN6QAbIWsvYA6TsOmXB%2BkBgrQ%2BEIwcwhwmtY0GmgSbwMXDVzc%2FrlHCMEMJIKYeWEo5x8%2FMauGrXNu3erPUlRkmK9zB1gRxQAqYz09eWxcavwpMS13VJp9O4jgNCoJRiEIb0w5BQKXTpS9PvLFwBOsAmsGMjso%2F5KLC0oDHbask9%2BTCr1sh5HuVSiUq1SrVWI18oIKWk3%2B%2FTabdZf%2FuW1vo63SCgJxpsDl5%2BDrTsAQILrkeBRSKRspZpve6e%2FL0YvaKYyTAzM8Ppc%2Bf48OxZGs0m%2BVIJISVhv0%2Fb91ldWeGvx49ZffGC9tYWHdHAH7y8DPiWeWBZG8A4I4wdmzzFRvP68szfC5Q8j0a1yvkLFzhz6RKNU6fIl8s4ngdCoKOIWrlMtVhk2vMoaM2zZ8%2FI9tageX3ZX33wCbA7yjgJnAxz8YPVB6IsJbVsltPHj%2FPtrVt4lQoynUZIub9OjEGfP8%2B9jQ2072NaLZwgwF19IHwoAl2b6ZEF39cMYuDc7OyNxRpQl5IT6TQni0UKqRS5MCSzs0Om2x1adnubTLdLrt8nbwz1fJ4TuRzHHYeaEMzO3li0ieom8UYZO0C6%2BXxBVIEa0BCColL8fOcO3tQUQkq%2BunlzuOmXu3eHBeqEIYUwpCYEoRAYoPl8QTyFtPUtRztXMrncGRVRBarGMD0YkN%2FcxPV9ZCaDEAK2t4fAqbW1YchFFJFptykFAbtao4BdFZFoODHOv5JLAqlpoAIcM4ZyEDDVapE2BieT2fu%2F3e5wU3ptDQFoYzBRhN7YoNjtMogiQmPovesN%2B3r82F6dZy8jKlpTCUNynQ6ZwQAnTqwEcP716z3GxhANBoheDxEEaK0JrK9JIhErjHJsNhSAklLkg4B0FCEch5QQsLMz3FRutTDGYIxBKcVuFOFatvl3ACqhYvvKKX6hgMFmysFTEVmgYAwlpUhrjROGe9kRhkPgY73enhYaQ2QMgT3EtnW%2BlXJARbFiDYFlgrG2H3efXpo3QaLqjTGktMZVCk8pMGZobhThRRGuUqS0RhgzlKsAWPl03lhXwxqOgZNCPgB27v1xf64DtG2v61onsc4ln1iIQ7umC2zZvR3g3p%2F35xJCEXcuM8o4PujW0uVrxgfeAuvWWc9%2BTD4xYM%2BuWbfN2QeWLl8z9nVSJJgkEo3b9cryR36bE0DdZvqUnQySU0CYAPaBV8CTeoUf%2FPYV4M04kZgoi981Cg9Pvdmmbms7n1B3bJjjELct8PNGge%2FfbB9KFg8cBL6Zu7h8dfGRmLasc2OAN4ENYGnuovlx8dGRBoFx4JlEPyl%2BPX928bOlFTEV6X2h7jmS3744Y35aeDJnI76VUKTBuLlLHDB3yTHDXi4x7MmRpOxbdqPDnk7W76SbgUiUmxwz3jojc3U0ZrzViSw%2B1Hj7Xw305qCRdhLwUa8w5rBXmMMA%2Fy%2BXtn8A3686NU%2B4g2oAAAAASUVORK5CYII%3D";
	
	var gfavcount=100; //>100favourites
	var gcomcount=20;//>20 comments
	var gtimetick1=1;//< 1 day
	var gtimetick2=60;//>60 days
	var mulsticom=true;//two input fields, even with few/no comments
	
	function start(){
		
		var titlel=document.getElementsByClassName("dev-view-about-content");
		if(typeof titlel[0]=="undefined" || titlel[0].getElementsByTagName("h3").length==0)
			titlel=document.getElementsByClassName("dev-view-about-content")[0];
		else
			titlel=titlel[0].getElementsByTagName("h3")[0];		
		// if(typeof titlel == "undefined"){return;}
		// if(!document.getElementsByClassName("dev-view-about-content")[0].getElementsByTagName("h3")[0]){return;}
		if(mulsticom)multicomm();
		var styl=document.createElement("style");
		styl.innerHTML=".dA_quick_img_pop_but{margin: 0 -3px;}";
		document.body.appendChild(styl);
		highcomm();
		// var titlel=document.getElementsByTagName("h1");
		// var setz=false;
		// for(var i=0;i<titlel.length;i++){
			// if(titlel[i].getAttribute("dA_quick_img_pop")!="1"&&titlel[i].innerHTML.match(/<small><span class="by">by<\/span>.*?class="u"/i)){
				// titlel=titlel[i];
				// setz=true;
				// break;
			// }
		// }
		// if(!setz)return;
		if(typeof titlel=="undefined")titlel=document.getElementsByClassName("dev-title-container")[0];
		if(titlel.getAttribute("dA_quick_img_pop")=="1")return;

		// var counts=document.getElementsByClassName("resview7-meta");
		var counts=document.getElementsByClassName("dev-page-details");
		console.log(counts);
		if(counts.length==0){
			counts=document.getElementsByClassName("dev-view-meta-content");
			console.log("s",counts);
		}
		counts=counts[counts.length-1];
		var favcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<dt>Favourites<\/dt><dd>\D*?(\d+)/)[1]);
		var comcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<dt>Comments<\/dt><dd>\D*?(\d+)/)[1]);
		var timemat=counts.innerHTML.replace(/\.|,/g,"").match(/ts="(\d+)"[^>]*?>([^<]*?)</);
		var timetick=parseInt(new Date().getTime()/1000 - parseInt(timemat[1]));
			
		// if(!counts.innerHTML.replace(/\.|,/g,"").match(/<span class="favourites">\D*?(\d+)/))return;
		// var favcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<span class="favourites">\D*?(\d+)/)[1]);
		// var comcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<span class="comments">\D*?(\d+)/)[1]);
		// var favcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<dt>Favourites<\/dt><dd>\D*?(\d+)/)[1]);
		// var comcount=parseInt(counts.innerHTML.replace(/\.|,/g,"").match(/<dt>Comments<\/dt><dd>\D*?(\d+)/)[1]);
		// var timemat=counts.innerHTML.replace(/\.|,/g,"").match(/ts="(\d+)"[^>]*?>([^<]*?)</);
		// var timetick=parseInt(new Date().getTime()/1000 - parseInt(timemat[1]));
		
		titlel.setAttribute("dA_quick_img_pop","1");
		// var ins="<div id='dA_quick_img_pop_cont' style='float: right;'>";
		var ins="<div id='dA_quick_img_pop_cont' style='position: absolute;right: 0;top: 0;'>";
		if(favcount>gfavcount)
			ins+="<img class='dA_quick_img_pop_but' src='"+imgblF+"' alt='over "+gfavcount+" favourites: "+favcount+"' title='over "+gfavcount+" favourites: "+favcount+"' style='float: right;'/>";
		if(comcount>gcomcount)
			ins+="<img class='dA_quick_img_pop_but' src='"+imggrC+"' alt='over "+gcomcount+" comments: "+comcount+"' title='over "+gcomcount+" comments: "+comcount+"' style='float: right;'/>";
		if(timetick<(60*60*24*gtimetick1))//1 day
			ins+="<img class='dA_quick_img_pop_but' src='"+imgtuT+"' alt='younger than "+gtimetick1+" days: "+timemat[2]+"' title='younger than "+gtimetick1+" days: "+timemat[2]+"' style='float: right;'/>";
		if(timetick>(60*60*24*gtimetick2))//60 day
			ins+="<img class='dA_quick_img_pop_but' src='"+imgroT+"' alt='older than "+gtimetick2+" days: "+timemat[2]+"' title='older than "+gtimetick2+" days: "+timemat[2]+"' style='float: right;'/>";
		titlel.innerHTML+=ins+"</div>";
			
		var buts=document.getElementsByClassName("dA_quick_img_pop_but");
		for(var i=0;i<buts.length;i++)
			buts[i].addEventListener("click", confmenu, true); 
	}
	function multicomm(){
		
		var tower=document.getElementsByClassName("talk-tower");
		for(var i=0;i<tower.length;i++){
			if(!tower||tower.length<=i){continue;}
			if(!tower[i].getElementsByTagName("form")||tower[i].getElementsByTagName("form").length==0){continue;}
			if(tower[i].getElementsByTagName("textarea").length>1){continue;}
			if(tower[i].getElementsByTagName("textarea").length==0){continue;}
			if(tower[i].parentNode.getAttribute("dA_quick_img_pop")=="on"){continue;}
			
			tower=tower[i];
			if(!tower.firstChild.getElementsByTagName("textarea")){continue;}
			if(tower.firstChild.getElementsByTagName("textarea").length>0){continue;}
			var forms=tower.getElementsByTagName("form");
			tower.insertBefore(forms[forms.length-1].cloneNode(true),tower.firstChild);
		}
	}
	function highcomm(){
		var coms =document.getElementsByClassName("mcb-commentcount");
		for(var i=0;i<coms.length;i++){
			if(parseInt(coms[i].innerHTML.match(/span>(\d+) Comment/i)[1])<gcomcount){
				coms[i].getElementsByTagName("A")[0].style.color="#ff0000";
			}
		}
	}
	function confmenu(){
		if(!document.getElementById("deviantART-v7")){setTimeout(confmenu,1000);return;}
		if(!document.getElementById("dA_quick_img_pop_conf")){
			var conf =document.createElement("div");
			conf.className="loading modal modal-rounded";
			conf.id="dA_quick_img_pop_conf";
			var checked="";
			if(mulsticom)checked=" checked='checked'";
			conf.innerHTML="<img src='"+imgblF+"' alt='over how many favourites' title='over how many favourites' style='vertical-align: middle;display: inline-block;'/><div style='display: inline-block;width:150px;'>How many Favourites:</div><input type='text' value="+gfavcount+" style='display: inline-block;width:30px;'/>"+
			"<img src='"+imggrC+"' alt='over how many comments' title='over how many comments' style='vertical-align: middle;display: inline-block;'/><div style='display: inline-block;width:150px;'>How many comments:</div><input type='text' value="+gcomcount+" style='display: inline-block;width:30px;'/>"+
			"<img src='"+imgtuT+"' alt='before which time' title='before which time' style='vertical-align: middle;display: inline-block;'/><div style='display: inline-block;width:150px;'>Younger than (days):</div><input type='text' value="+gtimetick1+" style='display: inline-block;width:30px;'/>"+
			"<img src='"+imgroT+"' alt='after which time' title='after which time' style='vertical-align: middle;display: inline-block;'/><div style='display: inline-block;width:150px;'>Older than (days):</div><input type='text' value="+gtimetick2+" style='display: inline-block;width:30px;'/>"+
			"<input type='checkbox'"+checked+" id='dA_quick_img_pop_conf_che'/><label style='display:inline-block;vertical-align:middle;width:195px;' for='dA_quick_img_pop_conf_che'>Should two commenting inputs be displayed, even at submissions with low comment count?</label>"+
			"<a href='#' id='dA_quick_img_pop_conf_acc' style='width:80px;display:inline-block; margin: 10px auto;' onclick='return false;' class='gmbutton2 gmbutton2c'>Save<b></b></a><a style='width:80px;display:inline-block; margin: 10px 10px auto;' href='#' id='dA_quick_img_pop_conf_can' onclick='return false;' class='gmbutton2 gmbutton2c'>Cancel<b></b></a>";
			conf.setAttribute("style","width:220px;height:220px;position:absolute;top:50%;left:50%;margin-left:-130px;margin-top:-130px;padding:20px;z-index:999;F");
			document.getElementById("deviantART-v7").appendChild(conf);
			// document.getElementById("deviantART-v7").appendChild(conf);
			document.getElementById("dA_quick_img_pop_conf_acc").addEventListener("click", function(){
				var wind=document.getElementById("dA_quick_img_pop_conf");
				wind.style.display="none";
				gfavcount= parseFloat(wind.getElementsByTagName("INPUT")[0].value);
				gcomcount= parseFloat(wind.getElementsByTagName("INPUT")[1].value);
				gtimetick1= parseFloat(wind.getElementsByTagName("INPUT")[2].value);
				gtimetick2= parseFloat(wind.getElementsByTagName("INPUT")[3].value);
				mulsticom= wind.getElementsByTagName("INPUT")[4].checked;
				saver();
				setTimeout(function(){window.location.reload();},0);
			}, true); 
			document.getElementById("dA_quick_img_pop_conf_can").addEventListener("click", function(){
				document.getElementById("dA_quick_img_pop_conf").style.display="none";
			}, true); 
		}else{
			document.getElementById("dA_quick_img_pop_conf").style.display="block";
		}
	}
	function saver(){
		if(GM_setValue){
			GM_setValue("gfavcount",gfavcount);
			GM_setValue("gcomcount",gcomcount);
			GM_setValue("gtimetick1",gtimetick1);
			GM_setValue("gtimetick2",gtimetick2);
			GM_setValue("mulsticom",mulsticom);
		}else{
			console.log("cookie!");
			document.cookie = "gfavcount="+gfavcount+";gcomcount="+gcomcount+";gtimetick1="+gtimetick1+";gtimetick2="+gtimetick2+";mulsticom="+mulsticom+";";
		}
	}
	function load(){
		if(typeof GM_getValue !="undefined"){
			if(GM_getValue("mulsticom")==""||typeof GM_getValue("mulsticom")=="undefined")return;
			
			gfavcount= parseFloat(GM_getValue("gfavcount"));
			gcomcount= parseFloat(GM_getValue("gcomcount"));
			gtimetick1= parseFloat(GM_getValue("gtimetick1"));
			gtimetick2= parseFloat(GM_getValue("gtimetick2"));
			mulsticom= GM_getValue("mulsticom");
			
		}else{
			console.log("cookie!");
			a=document.cookie;
			if(a.search('gfavcount=')==-1)return;
			
			gfavcount = parseFloat(a.substr(a.search('gfavcount=')+1,a.search(';')));
			gcomcount = parseFloat(a.substr(a.search('gcomcount=')+1,a.search(';')));
			gtimetick1 = parseFloat(a.substr(a.search('gtimetick1=')+1,a.search(';')));
			gtimetick2 = parseFloat(a.substr(a.search('gtimetick2=')+1,a.search(';')));
			mulsticom = (a.substr(a.search('mulsticom=')+1,a.search(';'))=="true");
			
		}
	}
	load();
	confmenu();
	setInterval(start,1000);
})();