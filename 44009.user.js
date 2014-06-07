// ==UserScript==
// @name           Travian - Place du marché et bonnes affaires
// @namespace      zm
// @include        http://*.travian.fr/build.php?id=*&t=1
// ==/UserScript==


(function () {

        function updateLinksURL(){
            var ElementXpath = "//a[text()='«' or text()='»']";
	    var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	    for (i=0; i<alltags.snapshotLength; i++){
                 var tag = alltags.snapshotItem(i);
                 var href = tag.getAttribute('href');
                 var pos = href.indexOf('&want=');
                 var pos2 = href.indexOf('#');
                 if( pos2<0 )pos2 = href.length;
                 var stem = pos<0 ? href.substring(0,pos2) : href.substring(0,pos);
                 var params = "&want="+getWantFromForm()+"&offer="+getOfferFromForm();
                 var tail = href.substring(pos2,href.length);
                 tag.setAttribute('href',stem+params+tail);
            }

        };

        function setFormFromURL(){


            args = window.location.href;

            anchor_ = args.indexOf('#');
            if( anchor_>-1 ){
                args = args.substring(0, anchor_);
            }



            /**
            *
            * 1: wood
            * 2: clay
            * 3: iron
            * 4: crop
            */
            w1 = args.indexOf('&want=');
            if( w1>-1 ){
                w1+=6;
                w2 = args.indexOf('&', w1);
                want = w2 > -1 ? args.substring(w1,w2) : args.substring(w1);
            }else{
                want = '1234';
            }
            w1 = args.indexOf('&offer=');
            if( w1>-1 ){
                w1+=7;
                w2 = args.indexOf('&', w1+1);
                offer = w2 > -1 ? args.substring(w1,w2) : args.substring(w1);
            }else{
                offer = '1234';
            }


            w1 = args.indexOf('?id=');
            if( w1>-1 ){
                w1+=4;
                w2 = args.indexOf('&', w1);
                b_id = w2 > -1 ? args.substring(w1,w2) : args.substring(w1);
            }else{
                b_id = '';
            }

            document.getElementById('zm.gooddeal.wantWood').checked = want.indexOf('1')> -1;
            document.getElementById('zm.gooddeal.wantClay').checked = want.indexOf('2')> -1;
            document.getElementById('zm.gooddeal.wantIron').checked = want.indexOf('3')> -1;
            document.getElementById('zm.gooddeal.wantCrop').checked = want.indexOf('4')> -1;

            document.getElementById('zm.gooddeal.offerWood').checked = offer.indexOf('1')> -1;
            document.getElementById('zm.gooddeal.offerClay').checked = offer.indexOf('2')> -1;
            document.getElementById('zm.gooddeal.offerIron').checked = offer.indexOf('3')> -1;
            document.getElementById('zm.gooddeal.offerCrop').checked = offer.indexOf('4')> -1;

}




function createForm(){



            var ElementXpath = "//table/tbody/tr[1][contains(.,'Offres sur la')]/../..";
	    var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            if( alltags.snapshotLength<1 ){
               return false;
            }


            var form_, option_, select_, input_;
            form_ = document.createElement('form');
            form_.setAttribute('id', 'zm.gooddeal.form' );

            form_.appendChild( document.createTextNode('Je veux : ') );


            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'wantWood' );
            box_.setAttribute('id', 'zm.gooddeal.wantWood' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.wantWood');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Bois'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'wantClay' );
            box_.setAttribute('id', 'zm.gooddeal.wantClay' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.wantClay');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Terre'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'wantIron' );
            box_.setAttribute('id', 'zm.gooddeal.wantIron' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.wantIron');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Fer'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'wantCrop' );
            box_.setAttribute('id', 'zm.gooddeal.wantCrop' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.wantCrop');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Céréales'));

            form_.appendChild(box_);
            form_.appendChild(label_);


            form_.appendChild( document.createElement('br') );

            form_.appendChild( document.createTextNode('Je donne : ') );


            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'offerWood' );
            box_.setAttribute('id', 'zm.gooddeal.offerWood' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.offerWood');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Bois'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'offerClay' );
            box_.setAttribute('id', 'zm.gooddeal.offerClay' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.offerClay');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Terre'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'offerIron' );
            box_.setAttribute('id', 'zm.gooddeal.offerIron' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.offerIron');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Fer'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            box_ = document.createElement('input');
            box_.setAttribute('type', 'checkbox' );
            box_.setAttribute('name', 'wantCrop' );
            box_.setAttribute('id', 'zm.gooddeal.offerCrop' );
            box_.setAttribute('value', '1' );

            label_ = document.createElement('label');
            label_.setAttribute('for','zm.gooddeal.offerCrop');
            label_.setAttribute('style','float:none;display:inline;padding-left:1px;padding-right:6px;');
            label_.appendChild(document.createTextNode('Céréales'));

            form_.appendChild(box_);
            form_.appendChild(label_);

            /*
            form_.appendChild( document.createElement('br') );

            input_ = document.createElement('input');
            input_.setAttribute('value','Filtrer');
            input_.setAttribute('type','button');

            form_.appendChild( input_ );
            */

            table_ = alltags.snapshotItem(0);
            table_.parentNode.insertBefore(form_, table_);


            document.getElementById('zm.gooddeal.wantWood').addEventListener("click", updateFilter, false);
            document.getElementById('zm.gooddeal.wantClay').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.wantIron').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.wantCrop').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.offerWood').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.offerClay').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.offerIron').addEventListener("click", updateFilter, true);
            document.getElementById('zm.gooddeal.offerCrop').addEventListener("click", updateFilter, true);

            return true;

        }

        function getWantFromForm(){
            want = '';
            if( document.getElementById('zm.gooddeal.wantWood').checked ){
              want+='1'
            }
            if( document.getElementById('zm.gooddeal.wantClay').checked ){
              want+='2'
            }
            if( document.getElementById('zm.gooddeal.wantIron').checked ){
              want+='3'
            }
            if( document.getElementById('zm.gooddeal.wantCrop').checked ){
              want+='4'
            }
            if( want.length<1 )want = '1234';

            return want;
        }

        function getOfferFromForm(){
            offer = '';
            if( document.getElementById('zm.gooddeal.offerWood').checked ){
              offer+='1'
            }
            if( document.getElementById('zm.gooddeal.offerClay').checked ){
              offer+='2'
            }
            if( document.getElementById('zm.gooddeal.offerIron').checked ){
              offer+='3'
            }
            if( document.getElementById('zm.gooddeal.offerCrop').checked ){
              offer+='4'
            }
            if( offer.length<1 )offer = '1234';
            return offer;
        }

	function filter(want, offer){

            var ElementXpath = "//tr[contains(td,'Offres sur la')]/following-sibling::tr[1]//td[1][.='Offres']/../following-sibling::tr[td/img]";
	    var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

            if( alltags.snapshotLength<1 )return;

            nbHidden = 0;
            //offre = alltags.snapshotItem(0).childdNodes[0].textContent;
	    for (i=0; i<alltags.snapshotLength; i++){

		    var tag = alltags.snapshotItem(i);

		    src1 = tag.getElementsByTagName('td')[0].firstChild.getAttribute('src');
		    r1 = src1.substring( src1.indexOf('.gif')-1, src1.indexOf('.gif') );

		    src2 = tag.getElementsByTagName('td')[2].firstChild.getAttribute('src');
		    r2 = src2.substring( src2.indexOf('.gif')-1, src2.indexOf('.gif') );

                    if( want.length>0 && want.indexOf(r1)<0  || offer.length>0 && offer.indexOf(r2)<0 ){
                        //tag.parentNode.removeChild( tag );
                        tag.setAttribute('style','display:none');
                        nbHidden++;
                    }else {
                        tag.setAttribute('style','');

                        var offre = parseInt(tag.childNodes[2].textContent);
                        var demande = parseInt(tag.childNodes[6].textContent);

                        if( offre == demande ){
                              color_ = '#707070';
                        }else {
                            color_ = offre > demande ? '#00F900' : '#FF0000';
                        }

                        var divNode;

                        td = tag.childNodes[2];
                        divNode = document.createElement('div');
                        divNode.setAttribute('style', 'color:'+color_+';');
                        divNode.appendChild(
                            document.createTextNode(offre)
                        );
                        td.removeChild( td.firstChild );
                        td.appendChild( divNode );

                        td = tag.childNodes[6];
                        divNode = document.createElement('div');
                        divNode.setAttribute('style', 'color:'+color_+';');
                        divNode.appendChild(
                             document.createTextNode(demande)
                        );
                        td.removeChild( td.firstChild );
                        td.appendChild( divNode );

                    }
           }
           
           var title_ = alltags.snapshotItem(0).parentNode.firstChild.childNodes[1];
           var pos = title_.textContent.indexOf( ' (');
           title_.textContent = (pos<0 ? title_.textContent : title_.textContent.substring(0,pos) ) + ' ('+(alltags.snapshotLength-nbHidden)+'/'+alltags.snapshotLength+')';

	}

        function updateFilter(){
          filter( getWantFromForm(), getOfferFromForm() );
          updateLinksURL()
        }

	if( ! createForm() ) return;
	setFormFromURL();
	updateFilter();


})();
