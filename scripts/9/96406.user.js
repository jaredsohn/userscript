// ==UserScript==
// @name           SortShelf
// @author         ΞViPΞ Team
// @namespace      bw
// @description    Tri les étagères en fonction des sets bijoux / vêtements.
// @include        http://r*.bloodwars.net/?a=equip*
// ==/UserScript==


function getChildAttr(element, tagName, attributeNames, attributeValues){
	if (element == null || attributeNames.length != attributeValues.length){
		return null;
	}
	for (var i = 0; i < element.childNodes.length; ++i){
		if (tagName == null || element.childNodes[i].nodeName == tagName){
			//alert("found " + tagName);
			var j;
			for (j = 0; j < attributeNames.length; ++j){
				if (element.childNodes[i].getAttribute(attributeNames[j]) != attributeValues[j]){
					break;
				}
			}
			if (j == attributeNames.length){
				return element.childNodes[i];
			}
		}
	}
	return null;
}

function getChild(element, tagName){
	return getChildAttr(element, tagName, Array(), Array());
}

function regroupeSet(){
	var tablette,div ,table ,tbody,tr,td,itemDiv,code,ind,ind2,i,j,img,img2,k,nbElTrans,tmpz;

	for(k=0;k<10;k++){
		tablette = document.getElementById('hc_c'+k);
		div = getChild(tablette, "DIV");
		table = getChild(div, "TABLE");
		tbody = getChild(table, "TBODY");
		tr = getChild(tbody, "TR");
		td = getChild(tr, "TD");
		itemDiv = getChild(td, "DIV");
		img="";
		img2="";
		z=0;
		nbElTrans=0;//nombre de comparaison entre element
		i=0;
		if (itemDiv != null){
			var	tableItem=tablette.getElementsByClassName('item');
			scriptItem=tablette.getElementsByTagName('SCRIPT');
			if(tableItem.length>1){
				while(i<tableItem.length-1){
					code=tableItem[i].getElementsByTagName('DIV')[0].innerHTML;
					ind=code.indexOf("<img src=",0);
					ind2=code.indexOf(".jpg",ind);
					img=code.substring(ind,ind2-3);
					ind=img.lastIndexOf("/");
					img=img.substring(ind+1,img.length);

					j=i+1;
					code=tableItem[j].getElementsByTagName('DIV')[0].innerHTML;
					ind=code.indexOf("<img src=",0);
					ind2=code.indexOf(".jpg",ind);
					img2=code.substring(ind,ind2-3);
					ind2=img2.lastIndexOf("/");
					img2=img2.substring(ind2+1,img2.length);

					while(j<tableItem.length&&img!=img2){
						if(j+1<tableItem.length){
							code=tableItem[j+1].getElementsByTagName('DIV')[0].innerHTML;
							ind=code.indexOf("<img src=",0);
							ind2=code.indexOf(".jpg",ind);
							img2=code.substring(ind,ind2-3);
							ind2=img2.lastIndexOf("/");
							img2=img2.substring(ind2+1,img2.length);
						}
						j++;
					}
				  
					if(j<tableItem.length){
						if(img!="prefEm"){
							nbElTrans++;
						}
						if(j!=i+1){
							tmp=tableItem[i+1].innerHTML;
							tableItem[i+1].innerHTML=tableItem[j].innerHTML;
							tableItem[j].innerHTML=tmp;
						//	tmp=scriptItem[i+1].innerHTML;
						//	scriptItem[i+1].innerHTML=scriptItem[j].innerHTML;
						//	scriptItem[j].innerHTML=tmp;
						}
					}else	{
						if(nbElTrans>1){
							for(l=nbElTrans;l>=0;l--){
								code=tableItem[i-l].getElementsByTagName('DIV')[0].innerHTML;
								ind=code.indexOf("<img src=",0);
								ind2=code.indexOf(".jpg",ind);
								img=code.substring(ind,ind2);
								ind=img.lastIndexOf("/");
								img=img.substring(ind+1,img.length);
								ind=code.indexOf("<img src=",ind2);
								ind2=code.indexOf(".jpg",ind);
								img2=code.substring(ind,ind2);
								ind=img2.lastIndexOf("/");
								img2=img2.substring(ind+1,img2.length);
								if(img2!="sufEmpty"){
									tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
									tmp=tmp.substring(0,tmp.length);
									ind=tmp.indexOf(" De La ",0);

									if(ind==-1){
										ind=tmp.indexOf(" Des ",0);
										if(ind==-1){
											ind=tmp.indexOf(" Du ",0);
										}
										if(ind==-1){
											ind=tmp.indexOf(" De ",0);
										}
									}
									
									tmp2=tmp.substring(0,ind);
									ind2=tmp2.lastIndexOf(" ");
									var res=tmp2.substring(0,ind2)+"<span style='color: rgb(221, 51, 51);'>"+tmp2.substring(ind2,tmp2.length)+"</span>"+tmp.substring(ind,tmp.length);
									tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=res;
								}
								else	{
									tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
									tmp=tmp.substring(0,tmp.length-1);
									ind=tmp.lastIndexOf(" ");
									tmp2=tmp.substring(0,ind);
									tmp2+="<span style='color: rgb(221, 51, 51);'>"+tmp.substring(ind,tmp.length);+"</span>";
									tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=tmp2;
								}
							}
						}
						nbElTrans=0;
					}
					i++;
				}


				if(nbElTrans>1){
					for(l=nbElTrans;l>=0;l--){
						code=tableItem[i-l].getElementsByTagName('DIV')[0].innerHTML;
						ind=code.indexOf("<img src=",0);
						ind2=code.indexOf(".jpg",ind);
						img=code.substring(ind,ind2);
						ind=img.lastIndexOf("/");
						img=img.substring(ind+1,img.length);
						ind=code.indexOf("<img src=",ind2);
						ind2=code.indexOf(".jpg",ind);
						img2=code.substring(ind,ind2);
						ind=img2.lastIndexOf("/");
						img2=img2.substring(ind+1,img2.length);
						if(img2!="sufEmpty"){
							tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
							tmp=tmp.substring(0,tmp.length);
							ind=tmp.indexOf(" De La ",0);
							if(ind==-1){
								ind=tmp.indexOf(" Des ",0);
								if(ind==-1){
									ind=tmp.indexOf(" Du ",0);
								}
								if(ind==-1){
									ind=tmp.indexOf(" De ",0);
								}
							}
							tmp2=tmp.substring(0,ind);
							ind2=tmp2.lastIndexOf(" ");
							var res=tmp2.substring(0,ind2)+"<span style='color: rgb(221, 51, 51);'>"+tmp2.substring(ind2,tmp2.length)+"</span>"+tmp.substring(ind,tmp.length);
							tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=res;
						}
						else{
							tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
							tmp=tmp.substring(0,tmp.length-1);
							ind=tmp.lastIndexOf(" ");
							tmp2=tmp.substring(0,ind);
							tmp2+="<span style='color: rgb(221, 51, 51);'>"+tmp.substring(ind,tmp.length);+"</span>";
							tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=tmp2;
						}
					}
				}
				j=0;
				i=0;
				nbElTrans=0;
				while(j<tableItem.length){//remonte les set en haut d'etageres
					code=tableItem[j].getElementsByTagName('SPAN')[0].innerHTML;
					ind=code.indexOf("rgb(221, 51, 51)",0);	
					if(ind!=-1){
						tmp=tableItem[i].innerHTML;
						tableItem[i].innerHTML=tableItem[j].innerHTML;
						tableItem[j].innerHTML=tmp;
						i++;
					}
					j++;
				}
				z=i;

				while(i<tableItem.length-1){
					code=tableItem[i].getElementsByTagName('DIV')[0].innerHTML;
					ind=code.indexOf("<img src=",0);
					ind=code.indexOf("<img src=",ind+9);
					ind2=code.indexOf(".jpg",ind);
					img=code.substring(ind,ind2-3);
					ind=img.lastIndexOf("/");
					img=img.substring(ind+1,img.length);
					j=i+1;
					code=tableItem[j].getElementsByTagName('DIV')[0].innerHTML;
					ind=code.indexOf("<img src=",0);
					ind=code.indexOf("<img src=",ind+9);
					ind2=code.indexOf(".jpg",ind);
					img2=code.substring(ind,ind2-3);
					ind2=img2.lastIndexOf("/");
					img2=img2.substring(ind2+1,img2.length);

					while(j<tableItem.length&&img!=img2){
						if(j+1<tableItem.length){
							code=tableItem[j+1].getElementsByTagName('DIV')[0].innerHTML;
							ind=code.indexOf("<img src=",0);
							ind=code.indexOf("<img src=",ind+9);
							ind2=code.indexOf(".jpg",ind);
							img2=code.substring(ind,ind2-3);
							ind2=img2.lastIndexOf("/");
							img2=img2.substring(ind2+1,img2.length);
						}
						j++;
					}
  
					if(j<tableItem.length){
						if(img!="prefEm"){
							nbElTrans++;
						}
						if(j!=i+1){
							tmp=tableItem[i+1].innerHTML;
							tableItem[i+1].innerHTML=tableItem[j].innerHTML;
							tableItem[j].innerHTML=tmp;
						}
					}
					else{
						if(nbElTrans>1){
							for(l=nbElTrans;l>=0;l--){
								code=tableItem[i-l].getElementsByTagName('DIV')[0].innerHTML;
								ind=code.indexOf("<img src=",0);
								ind2=code.indexOf(".jpg",ind);
								img=code.substring(ind,ind2);
								ind=img.lastIndexOf("/");
								img=img.substring(ind+1,img.length);
								ind=code.indexOf("<img src=",ind2);
								ind2=code.indexOf(".jpg",ind);
								img2=code.substring(ind,ind2);
								ind=img2.lastIndexOf("/");
								img2=img2.substring(ind+1,img2.length);
								if(img2!="sufEmpty"){
									tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
									tmp=tmp.substring(0,tmp.length);
									ind=tmp.indexOf(" De La ",0);
									if(ind==-1){
										ind=tmp.indexOf(" Des ",0);
										if(ind==-1){
											ind=tmp.indexOf(" Du ",0);
										}
										if(ind==-1){
											ind=tmp.indexOf(" De ",0);
										}
									}
									tmp2=tmp.substring(0,ind);
									var res=tmp2+"<span style='color: rgb(51, 221, 51);'>"+tmp.substring(ind,tmp.length)+"</span>";
									tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=res;
								}
							}
						}
						nbElTrans=0;
					}
					i++;
				}

				if(nbElTrans>1){
					for(l=nbElTrans;l>=0;l--){
						code=tableItem[i-l].getElementsByTagName('DIV')[0].innerHTML;
						ind=code.indexOf("<img src=",0);
						ind2=code.indexOf(".jpg",ind);
						img=code.substring(ind,ind2);
						ind=img.lastIndexOf("/");
						img=img.substring(ind+1,img.length);
						ind=code.indexOf("<img src=",ind2);
						ind2=code.indexOf(".jpg",ind);
						img2=code.substring(ind,ind2);
						ind=img2.lastIndexOf("/");
						img2=img2.substring(ind+1,img2.length);
						if(img2!="sufEmpty"){
							tmp=tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML;
							tmp=tmp.substring(0,tmp.length);
							ind=tmp.indexOf(" De La ",0);
							if(ind==-1){
								ind=tmp.indexOf(" Des ",0);
								if(ind==-1){
									ind=tmp.indexOf(" Du ",0);
								}
								if(ind==-1){
									ind=tmp.indexOf(" De ",0);
								}
							}
							tmp2=tmp.substring(0,ind);
							var res=tmp2+"<span style='color: rgb(51, 221, 51);'>"+tmp.substring(ind,tmp.length)+"</span>";
							tableItem[i-l].getElementsByTagName('SPAN')[0].innerHTML=res;
						}
					}
				}
				j=z;
				i=z;
				while(j<tableItem.length){//remonte les set en haut d'etageres
					code=tableItem[j].getElementsByTagName('SPAN')[0].innerHTML;
					ind=code.indexOf("rgb(51, 221, 51)",0);	
					if(ind!=-1){
						tmp=tableItem[i].innerHTML;
						tableItem[i].innerHTML=tableItem[j].innerHTML;
						tableItem[j].innerHTML=tmp;
						i++;
					}
					j++;
				}
			}
		}
	}
}

function inverser(tableItem){
	var k=0;
	while(k<tableItem.length){	
		tableItem[k].getElementsByClassName('checkbox')[0].click();
		k++;
	}
}


function addListernerInverserM(){
	for(j=0;j<10;j++){
		inverserM('hc_c'+j);
	}
}

function inverserM(etagere){
	var i;
	var divShelf=document.getElementById(etagere);
	if(divShelf!=null){
		nb_Button=divShelf.getElementsByClassName('button').length;
		for(i=0;i<nb_Button;i++){
			if(divShelf.getElementsByClassName('button')[i].value=="INVERSER LE MARQUAGE"){
				divShelf.getElementsByClassName('button')[i].addEventListener("click",function(){
				divShelf=document.getElementById(etagere);
				var tableItem=divShelf.getElementsByClassName('item');
				inverser(tableItem);
						
				}, false);
			}
		}
	}
}

function detruireInput(){
	for(j=0;j<10;j++){
		var divShelf=document.getElementById('hc_c'+j);
		if(divShelf!=null){
			code=document.getElementById('hc_c'+j).innerHTML;
			if(code!=null){
				ind=code.indexOf("onclick=",0);	
				ind2=code.indexOf("value=",ind);
				document.getElementById('hc_c'+j).innerHTML=code.substring(0,ind)+code.substring(ind2,code.length);
			}
		}
	}

}

function main(){
	detruireInput();
	regroupeSet();
	addListernerInverserM();
}

main();