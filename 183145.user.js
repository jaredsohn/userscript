// ==UserScript==
// @name			Desura Collection Key Scraper
// @version			1.3
// @namespace		http://indie-elitist.blogspot.ca/
// @description		Gets, stores, and displays the keys of your games. FF version
// @match			http://www.desura.com/collection*
// @include			http://www.desura.com/collection*
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_deleteValue
// @grant			GM_listValues
// @grant			GM_addStyle
// @downloadURL		http://userscripts.org/scripts/source/183145.user.js
// @updateURL		http://userscripts.org/scripts/source/183145.meta.js
// ==/UserScript==

//Add the images to the css
GM_addStyle(
'.keysearch{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAAsSAAALEgHS3X78AAAAz0lEQVQokY3RsUpDMRQG4O9WKAiunZwKTsIFwQfwDQqCT+Lq6gP4AILgKhQEJ6e+gZs4OYjSohRcBeG4nAuhCdRACOTkC/9JRISIgBM84hMvuMZkqJdzAOcIvOfhOX7ygr5C6PGLe+wWhSN846mFLvPWKkqR4LDcH+EAq4j4Uo/nXKfl5ghv2O+6btJAx7l+bBb6jDDH3kZP62ZPeeAi4RI3eMjHiex3VqHinxb5Yq+4TTzA0wo1P5Fxxh7g2VZUwLsy6lbUgFf/Qgl3MMP4D7gTDyqkNgiQAAAAAElFTkSuQmCC);\
background-repeat: no-repeat;\
display: inline-block;\
}\
a.keysearch{\
background-size: 8px Auto;\
width: 8px;\
height: 8px;\
vertical-align:text-top;\
}\
.greyout{\
opacity: 0.6;\
filter: alpha(opacity=60);\
}\
.hide{\
visibility:hidden;\
}\
.remove{\
display:none !important;\
}\
#searchall{\
width: 12px;\
height: 12px;\
background-size: 12px Auto;\
position: relative;\
top: 1px;\
}\
.keyslist{\
background-repeat: no-repeat;\
background-size: Auto 13px;\
display: inline-block;\
width: 13px;\
height: 13px;\
}\
.steampicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAARCQAAEQkBwOWiGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAARoSURBVFiFxZdfiFRlGMZ/77czWlu7G5GhYhCVUnuRer5zZsW2cqMbTSQyilaKsLIs6A+E/QEtb4SiyLIywi4ityIkQTMo0LEs2W3OdwZruqu9CXYRNNxVYlznnLeLObOOtqP7D3tuBp7vfd/nmfOe837fJ6oKgIiI53mPi8gqwAJzmF4MAk5V90RRtENTYVFVPM+ba4zpAZZNs2gjHEySZE0URQNGROQSiwMsM8b0SPrYnxCRj6ex+CmgCAxxkVaq6rpM2vPpwHequiGKopKqJjUybe964GUgU58gIqvEWjtwIZfjwD/Ac2EY7qgRvu9nM5nM5b29vcM1zlprRWQncHNd7qBYa3UK4gBPh2G4HSAIguVJkmwWkVuBGcCfwGctLS1b8vl8xVp7k4gcAZpryWYqyiKy3zn3USr+uqp+KyKzReRTEXkLOA5sPnny5KGurq7LnHN/AK/U15iSgTiON6qq5nK5O1V1E7C7XC63FwqFJwuFwoYwDJeo6gvAkuHh4S0AzrltwNHpMFBpa2srpkZeAv6O43htqVQ6VR/knNsK7BaRZ33fb9YqoukwUMrn82UAEfFF5IdisXhirEAR2Q00GWMWpdTUDajq52lxAWao6ulGsUmSnE5/Z6Y5o7GTMiAi+6Moejs1olT/Uef8+fNnNoi/G6jFAXhTMXBMVR+uHzbpJL2ura3tjfSJjCIIghXAYyLyVRiGQym9eDR3EnNgZRiG+84nfd/vAbpV9bAxZhcwpKp3AI8AfzU1NXl9fX3HgyBYraq7JmMgBraGYfjiWIsiIr7vP6OqrwHXpPRp4Ms4jp8vFosnPM+bZYz5HZhVb+ADYAVw/Rh1K6q6Dfg+m80erh+tF4Lv+zeq6lUi8msYhmdSbg7QA3SdY7x2ILHW3iIiK4B7gE5gWFUfcM4dSAtky+WylEqlkfGYGBWo7rjdIvIecPV/1msG6tHZ2dlSqVSae3t7j3Z0dCyI43h7agogUtUNzrlDjURzudwNqvqUqvpUt+TWhgbHMjBGwUVJkiwHVgFLqH599zvnvj4/1vf9bmD7hUQnbKAeQRA8pKo7gePlcnlerSULFy68IpvNvg88OpF6JgiCtblcbvZ4EwqFwheqegCY1dzc3J6aWpzNZqOJigNkVPUTVVXf9yNgX5Ike6MoCi+SdwygUqm0Aqjqu8CCiYrD2UkoVF+WTcaYXzzPmwsQBMFtS5cuPefN9TxvrojcB8TGmCMiYqibbBNFZgxOjDH3Ah8CjIyMDFhrnYj8qKrXGmMepLr5vOmcG/I8zweunKyBRpOwP45jWywWT1hr14nIRmBeupYA75TL5Vfb29vj/v7+n6h+GZM2MOahVFX3tLa2rs7n85V0mHSIyGygLwzDQRERa+0WqqfdyWJQrLV7gZUNAn4TkfWFQuHnejIdTjuA26cgDvDNeC8mA1QvG2cAn7PtmBJUdZ1QbcMBLu3VDOCgc+4uo6qaJMka4OClFE+SZI2q6ugo/r+u5/8C4FUFsbigklwAAAAASUVORK5CYII=);\
width: 14px !important;\
}\
.desuraicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAASCAYAAACw50UTAAAACXBIWXMAAAsSAAALEgHS3X78AAAEjUlEQVQ4jYVUS2hcZRQ+/+O+73+ncydkRqdhMqQ3N5kMI1HIpLmRuGhVEIqv+sAXLrrqouBSfBVx4UqotIKgIBVRjC4shApdFARFK92kaUPCNDakxpqbSZnJzNw/9/G76KSMpdUPDgcOh+8//3l8AP8DhBAFAFBVdch13W81TXN64/8FsssBABghhBFCpOsxQogIISLTNCcdx/nBsqwpy7IOtdvtXznnqwghqScXI4RQl+tf5AAAomtJr2UymWeHh4fPUEozm5ub3zHG9vf19b3COV9qt9vzd+TvctyuGGRZzhWLxS+iKLoZhuFfYRiucc5XVVUdGRgYeC9JkrhWq71Qr9dnbdt+emho6BuMMV1bWzseBMGiLMsDkiTlJUm6j1Jqr6ysvLazs/MnAgDIZDIvua775c7ODiCEgFIKt34I0Ol0NpaXl5/gnP/hOM5Xy8vLL8qyXBgeHp7Tdb1fCAFCCIjjGJIkAVmWYWlp6VXf909TAIBUKvW4ECJZXV096vv+Z5Ik9VNK7zcMY6zRaPwcx3GjVCr9pmnaYKlU+n1xcXHqypUr05Zlea1WayGKovUwDP/u6+t7fWho6JRlWY/5vn+aUkoZY+xgGIbJ1tbWbCaTeZlSanPOa5ubm9/HcdwYHR39RVGUQc55oChKYd++fWcWFhYeiqLItyxrxrKsmSiK6ltbW7NhGH7MGDtAKWXUNM0pTdOy9Xr9XBRF/sDAwClZllVCCFy9evXN9fX1DwkhthAiQQjRrmcAgPv7+48Wi8X3oyiCMAy57/ufNxqN87ZtHzRNcwqn0+nDCKF4Y2PjpGma05IkqUEQNMMwjAghDACSJEnaAIC7m4CTJGkBQIIxVsMwjDjnTVmWFdM0pzc2Nk4ihOI9e/Y8gw3DmAAAIoTgQRAsBUFQkySJCSGQqqolAEBxHPvdAQuEEMRxvAkASFXVMSEEkiSJtdvtpU6nczlJkgAAiGma+3GtVjvcbDYvjoyMzDHGZubn58vNZvM8IYTouj4OAKLdbs8jhES3JaLT6cwDgNB1/UFCCNne3j5/6dKlSiqVOjA6Onq20WhcrNVqzwEAAKU05brunOd5Ip/Pvw0AMDg4+InneULX9Qpj7OFqtSrGx8d5tVoVjLFpwzAe8DxPFIvFTwEA9u7d+47necJ13TlCSGpXO0jXQ6FQOOF5nnAcZxYhhPP5/Fuu654FAKhUKivValVUKpUVAADXdX/M5/PvIoSw4ziznueJQqFwokeTbl8/7hrkcrljk5OTolwuX6CU2rZtP6lpmsMYm5mYmLhpWdYjmqY5tm0/RSlNl8vlC5OTkyKXyx27k6sXaDeoKEohnU4fNAyjDAAgSZKFMca6ro9gjIkkSQwAwDCMcjqdflRRlEIP8W3h6pVN0d0Gyjm/RilN5/P544yxA3Ec8yRJAiFEgBBSMcYqIURpNpvnrl+//gHn/Fr3BqI7q70bMAAkhBDTtu3ns9nsG4ZhlIQQgBCCVqt1+caNGx/V6/Wv4zje3s2/B9c9H7hVAUIkm80eGRsb+ymbzR7pHRbcpb+7+AcRzOEBa7Dd+wAAAABJRU5ErkJggg==);\
width: 17px !important;\
}\
.gogicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACLElEQVQ4jZ2SO2hUURRF1znvzceMwiikcEQRVGwkOGCwEk1SCAFFG2MQVLCxESQghGAjNmI6BUGQBC3U3iqFdiK2gSGJweCH4HfGmXzI+95j8cwQB22yu3vZ+1zOXleq1epLVe1nE3LOvdLNhgFUtd83M+4+DdhzIA/Ap/mIG8MFxp+F7bufXxOunfa5PRGy/1ABgIWZiLGLRdQ5R7nicf5oyFBvSLnikaYp5YrHUG/IuSMh5MEvxGzrVi73BVw6sUZph2Bm+GZGvZkgIkSRUm8mOOdRb6aAIAKNZkKaCo2WYSbEkdBopTjnUIDadMD1RzFbthrffyWYGbXpgJHJmJHJmI+fI8I15d1cyJXxGBHlRysBwBcRJkZLAOSLRr2VoFpkYrSEmWFmqBZQVR7fzHyl7SmNjQOGxpfazX6YcagqItmOACICwJlbTXLFzLe44BARpFqtWpIkOOfa5lwuh6p2MudfPl9E8DyvHVh/vVP/8/kAzx9GHNyXMR+8EPPgjrF3dw6AufcRw1cLvHgSsWtnDsiGr6ymHD/ro2ZGWaGnL6KnL2Xxi9JdEKoDEdWBiEqXkKYplZJy7FTA6reEw/0htpRh9M0MXXUU8h5J6uGcw1tx5HOgarBsOCfQMqLISFspcSKw7LKPBDA7H/H2fhGIGByD2mzIm3sFQHhdC4AubM2ybgJD1cOCDONfFNaLcc79hVBV2+eNWFUVH5jyff+kc3+4dgQ6cXZo6jd1wxLPH4vlBAAAAABJRU5ErkJggg==);\
}\
.ingameicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA5klEQVRIieXVQUoDQRCF4S/ZqGcQXIgGPIMuFARXuha8hgdwmVu58xLRIBLPoOJiXEw6RhmTeSMDgg8KuodH/dNVM1201wgTVC3jBeMgv+sgeYnXBDDCYwoZJIRAVVkMewIs9KcAV9juE7CPO+z2BYAd3CaQLj2IIAMc4BIba7xHOFza3+MYzw3eankzlf+hJSaaG7/wDOen6KpNbK0ylBKdtwCdzqNohhN1qb6rani2Vjc+j/6gbvZP+lKiVFP1mz+1MaeAKHkKmOEsSc7vvqBV+qfXdTL0OwEusBf44S0xp0P/HeMPWXZrqsn3BSEAAAAASUVORK5CYII=);\
}\
.miscicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVRIibXVMWtUQRQF4G/jQgptlAgGVBQjoo2VthY2msaYtCIWWigBxcZ/IIK1FqawEBtBQrDRVixTipFgQgyCSrBIFJLC3VjM2zC8zOwbgx64MMw958ybeXfutPTHMC7jEg5hfzW/gmXMYBrfGny2YQQv0MFmQ3Qq7kip+QR+FRjX4yfGmszvorsD83g3d2LDVjQew0sMJBaewyy+YxCHcQrHE9xu5fUqnjyItcQXvceZPjs+i3cJ3apQIFt4miAtY6iPeQ9tvE3op3qEI9LVcjMyGcQz4Ueu4zl2RflzCf1vobTdTiQ3cTQyuJ7Ij0b53RmPyTYuZrb+UPhhcDqR34jGezMeozCfWT0XXdyvGd3LcOdIV08uVnChZn6t2k2Kv0r5rf2BY5HxHjxq0Kz9zRFN1cw/FGg+DmBRGT5F4/M4WaBZJF+m9fgstItZLBVqJlvCRVuQ7kExpoXjhH240cDviO7Sk4KvGY/EJwr4j+PVcs1upwtsNbt2JfiCq/LtGq4I3ZNwRDl0K+7XVPKfPzgp/Ncns4chPBBac5PxesUteTu2YRi38EYo5Y0qFvBaeDMO9DP4A+C1MWXpJ5scAAAAAElFTkSuQmCC);\
}\
.newicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACS0lEQVQ4jZWSTUhUURzFf+/D0ZkxrcbxTSM5DKGEKSImpYsQaqMN4aKVkIsisGiTG0HQnUtxkyAUFX1sWuVOMlAwamELP5Ig08n8wiZnZBgdZ95797bwFRZj1B/O5tx7zj3c84fDR40On7uz+uD8EKD95d6h49l5d8tOvbkpgcL/FWvzg7UD5sqINFdG5Pxg7cBhKdRc5O2WE75Sw+jSjSC6EaTUMLqAgn810O9eDgx5qtoQ8TFEfAxPVRsL9+oe50qhA9raw6anirRqNOxqhA15XlyBAGJ3DgBX4DRFhd6rm/frLFQNG+2DVLS5sutvr+mAW1flleKmG978cD3StkD1ITaeISyxHzMzg7/9EYgtFDLsLY5XJ6dehQG3AhQBp5aHz7721YSOu0qKkUKAVEFxEksbFIGiqWRjSeJzy/HyzqlLwKIKpIHNUOf7yMzE5/FsLInqrkRKGymsfUgb1VNJZiPBzMTCeHnnVATYBNIqYAIxYKm5b7ZbmDpoRUhb/A7Fi0hrNPfNdgNLjsb82YIJJEZ7zzTmlVZgJT8ihQ0IQCCFQKQ+ofsrGO2tbgQSjgb9QCNKwOeuVz0F2NsxxE6Wva8JAArKj4HXRDtSglGcVw8oufbA5Q+dbBGpL2RWE6xNr0eDHZOtwY7J1rXp9WhmNYG0tvGXBVoAV66l8sVfRuS3J02ivz3cAzQAIQcN/e3hntjzC2LrxUUJ+H7FPmBwFAgDbuC780kp56wQ8AMlTmtRYPtPAxfgdbhdIAPIAw/lAx6H2wGyAD8AKT3q7OJ/X3kAAAAASUVORK5CYII=);\
width: 14px !important;\
}\
.notscanedicon{\
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABYklEQVR4Xn3TP0vDQBgG8PckqCj+qYIKKhQLgouDi0OXfpP2lvYztUvTzW/gJN3SqYtLQVSColCRSBUx2mh8rn0IR0nvgZcbkueX8MIpsZKK1HC0xR0fJS1MBsQse82ms500GhNkKU21UmoKjFhe6XYlDUP50nousIwPxEQ2RLQasryJ8mKlIiax78u7A1kD8kFEPYikBag/QSBbKDLyCSRyIKbzBsT7BvOHiTodGePcJbJaq8kvzpc8hB3T9WIACSY2Q+SAyDqRpxyEHf4BNZMhEAMWiRSAmOehjVidBQOM+n0DZPMM5BZFRraBHLbb9jvsEEio2fMIZGAhO0COLCSxdzDmDmYTcien3Mked3KtddbxLC0399zJGZF9IlGvN+moC5EqTr9Ur8tdqyXzUqxW5ZzIaxDIVbnMe4F0iBwDuXEgJSDmnUuWUdJKmCaREyCuDKYf8Ov2ZZpFxB2/YV3nf9DqsZVlYlPZAAAAAElFTkSuQmCC);\
}\
.keydetails table{\
width: 898px;\
border: 1px dotted #ccc;\
}\
.keydetails th{\
border-left: 1px dotted #ccc;\
border-right: 1px dotted #ccc;\
border-bottom: 1px dotted #000;\
font-size: 15px;\
line-height: 20px;\
font-weight: bold;\
color: #1480cd;\
padding-left: 6px;\
width: 179.6px;\
}\
.keydetails td{\
border-left: 1px dotted #ccc;\
border-right: 1px dotted #ccc;\
text-align: center;\
width: 179.6px;\
}\
.closekeydetail{\
float: right;\
padding-right: 2px;\
font-weight: bolder;\
font-size: large;\
cursor: pointer;\
}');

//Make the icon list
var icons = 
$('<a title="Scrape Keys" class="keysearch"></a><br><a title="Steam Keys" class="keyslist steampicon hide"></a> <a title="Desura Keys" class="keyslist desuraicon hide"></a> <a title="GOG Keys" class="keyslist gogicon hide"></a> <a title="In-Game Keys" class="keyslist ingameicon hide"></a> <a title="Misc Keys" class="keyslist miscicon hide"></a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <a title="New Keys" class="keyslist newicon remove"></a><a title="Not Scanned" class="keyslist notscanedicon"></a>') //Create icons list
icons.eq(0).bind('click', function(ev){ev.preventDefault(); getKeys(null, $(this).closest('.subheading')); }) //Make it search that particular game's Keys page
icons.slice(1).bind('click', function(ev){ev.preventDefault(); $(this).closest('.row').next().toggle(); }); //Open keys dialogue

var col = $('.row >.content>span:nth-last-child(3)'); //The Options row
col //Every row
.css('margin', '-9px 0px') //Reduce top/bottom margins on this particular row, to allow two lines of content
.find('a[title="Get keys"]') //Select the last element in the Options list 
.after(icons); //Insert custom icons

$('.buttons').eq(0) //The button bar above the games list, with the "Activate Gift" button
.prepend($('<button style="float:left;font-size:100%;font-weight:bold;padding: 4px 30px;" id="scanall" title="Scrape all selected game\'s Keys pages">Scan All <div id="searchall" class="keysearch"></div></button>') //Add the button to the left
.bind('click', function(ev){ev.preventDefault(); col.each(getKeys);})); //Make button search all selected games Key pages

var categories = ['_STEAM', '_DESURA', '_GOG', '_INGAME', '_MISC'];

var newcount = 0;
col.each(setIcons);

$('.heading').last().append(' (<span id="gamecount">'+col.length+'</span> Games + <span id="newcount">'+newcount+'</span> New Keys)'); //Insert the heading with some basic statistics
$('.rowsortheading .subheading').eq(3).html($('<a id="options" href="javascript:void(0);">Options</a>').bind('click', function(ev){ev.preventDefault(); col.each(togglenew); newmode =! newmode;}));
var newmode = false;
function togglenew(index, element){
	element = $(element).closest('.row');
	if(newmode){
		element.show();
	}else{
		if(element.find('[title="New Keys"]').hasClass('remove') && element.find('[title="Not Scanned"]').hasClass('remove')){
			element.hide();
		}
	}
}

var keyrow = $('<div><table><thead><th>Steam</th><th>Desura</th><th>GOG</th><th>In-Game</th><th>Misc.</th></thead>	<tbody><tr><td class="steamcol"></td><td class="desuracol"></td><td class="gogcol"></td><td class="ingamecol"></td><td class="misccol"></td></tr></tbody></table><div class="closekeydetail">\u2A2F</div></div>').addClass('keydetails row clear').hide(); //The key details row
keyrow.find('.closekeydetail').bind('click', function(){ $(this).closest('.row').toggle(); }); //The close button
var keydetail = $('<label></label><br><input type="text" readonly><br>');
function insertKeys(index, element){ //Insert the key details row
	element = $(element);
	var gameid = element.find('a[title="Get keys"]').attr('href').split('/')[2];
	element = element.closest('.row');
	var content = keyrow.clone(true, true);
	var data, node, insert, keytitle;
	for(var index=0; index<categories.length; index++){
		data = GM_getValue(gameid + categories[index], '');
		data = data.split('","').filter(function(cur){return(cur !== '');});
		node = content.find('td').eq(index);
		for(var index2=0; index2<data.length; index2++){
			insert = keydetail.clone(true);
			keytitle = data[index2].split('":"');
			insert.eq(0).append(keytitle[0]);
			insert.eq(2).val(keytitle[1]);
			node.append(insert);
		}
	}
	element.after(content);
} col.each(insertKeys);

function setIcons(index, element){ //Set the icons based on stored data
	var content = $(element);
	var gameid = content.find('.playtoggle').attr('href').split('/')[2];
	var status = GM_getValue(gameid, null);
	if((status >= 1) || (status === null)){newcount++;}
	
	if(status !== null){ //Never scanned, don't need to change anything
		content.find('.notscanedicon').addClass('remove'); //remove the Not Scanned icon
		
		switch(status){ //Set the new star
			case(0): //Nothing new this scan, or nothing found. Do nothing
			break;
			case(1): //Newly scanned content(greyed out star)
				content.find('.newicon').removeClass('remove').addClass('greyout');
				content.bind('mouseenter', function(){GM_setValue(gameid, 0); $(this).unbind('mouseenter').find('.newicon').addClass('remove');})
			break;
			case(2): //New content(never before retrieved keys)
				content.find('.newicon').removeClass('remove');
				content.bind('mouseenter', function(){GM_setValue(gameid, 0); $(this).unbind('mouseenter').find('.newicon').addClass('remove');})
			break;
		}
		
		var data, node;
		for(var index=0;index<categories.length;index++){ //Set the category icons
			data = GM_getValue(gameid + categories[index], '');
			node = content.find('a').eq(4 + index);
			
			if(data !== ''){
				node.removeClass('hide');
			}
			if(data.indexOf('Not Yet Reclaimed') === -1){
				node.addClass('greyout');
			}
		}
	}
}

var process_count = 0;
//Send a get request to the game key URL
function getKeys(index, element){
	processing(1);
	
	element = $(element);
	var url = element.find('>a[title="Get keys"]').attr('href');
	element.attr('id', url.split('/')[2]);
	$.get(url, process_html, 'html').fail(function(){alert("Getting (" + url + ") failed.");}).always(function(){processing(-1);});
}


function repeat(count){var pattern = ''; while(count-->0){pattern+='.';} return(pattern);}
function processing(incr){
	process_count += incr;
	
	if(process_count === 0){
		$('#scanall').html('Scan All <div id="searchall" class="keysearch"></div>').prop('disabled', false);
	}else{
		$('#scanall').html('Working' + repeat(process_count%5)).prop('disabled', true);
	}
}

//Process the key page data
function process_html(data){
	var content = $(data).find('.content');
	var gameid = content.find('a').eq(0).attr('href').split('/')[2]; //Use the necessarily unique game URL as a unique identifier
	
	content = content.find('>span, >a');
	var categoriedata = [[], [], [], [], []];
	var newkey = false, changekey = false;
	content.each(function(index, element){ //List of already reclaimed keys, and the list of not yet reclaimed keys
		var keycontent = $(element);
		var type = keycontent.find('.action').text();
		var title = keycontent.find('.heading>span').text();
		var value = keycontent.find('input[name=key]').val();
		if(value === ''){ //If the key is not available
			value = 'Not Yet Reclaimed';
			newkey = true;
		}
		
		switch(type){ //Sort all the keys into the categories
			case('Steam Key'):
				categoriedata[0].push(title + '":"' + value);
			break;
			case('Desura Key'):
				categoriedata[1].push(title + '":"' + value);
			break;
			case('GOG Key'):
				categoriedata[2].push(title + '":"' + value);
			break;
			case('In-Game Key'):
				categoriedata[3].push(title + '":"' + value);
			break;
			default:
				categoriedata[4].push(type + ' - ' + title + '":"' + value);
			break;
		}
	});
	
	categoriedata[0] = categoriedata[0].join('","'); //Convert the arrays into strings
	categoriedata[1] = categoriedata[1].join('","');
	categoriedata[2] = categoriedata[2].join('","');
	categoriedata[3] = categoriedata[3].join('","');
	categoriedata[4] = categoriedata[4].join('","');
	
	for(var index=0;index<categories.length;index++){ //Check current data against old stored data, replace and note if different
		if(GM_getValue(gameid + categories[index], '') !== categoriedata[index]){
			GM_setValue(gameid + categories[index], categoriedata[index]);
			changekey = true;
		}
	}
	
	if(changekey){ //Calculate the new game id status
		changekey = 1;
		if(newkey){
			changekey = 2;
		}
	}else{	changekey = 0;	}
	
	var oldstatus = GM_getValue(gameid, null)
	if(oldstatus !== changekey){ //Set the game status (star)
		if((changekey > 0) || (oldstatus === null)){
			GM_setValue(gameid, changekey);
		}
	}
	
	setIcons(null, col.has('a[href*="'+gameid+'"]')); // Set the icons
}

/*
Game Id: {null=never scanned, 2=new content(never before retrieved keys), 1=newly scanned content(greyed out star), 0=Nothing new this scan, or nothing found}
gameid_STEAM: title":"key","title:key
gameid_DESURA: title:key","title:Not Reclaimed
gameid_GOG: title:key","title:key
gameid_INGAME: title:key","title:key
gameid_MISC: type - title:key","title:key

Show Star if new content, if the key is already retrieved, grey out star
Show Not Scanned if never scanned
Show game category icon if scanned keys exist, grey out if they are retrieved.
*/