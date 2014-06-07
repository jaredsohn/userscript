// ==UserScript==
// @name AntyTroll-DP
// @author RR ak A_ ak A2 ak ?
// @include http://www.dobreprogramy.pl/*,Aktualnosc,*
// @encoding UTF-8
// @version 0.4
// ==/UserScript==

(function () {

        var AllComments_ = document.getElementsByClassName('item');
          //Teraz można dodawać również niezalogowanych
          //przykład "opera zonk" ak "czullo"
          //Lista ----------------------V
        var troll=new Array('czullo','SSEE','GalusAnonimus','opera zonk')

        var trollcount=troll.length;
        var trollText = '';
        function enteeButton(){
            var trollButton = document.createElement('span');
            trollButton.innerHTML='Poka\u017c komentarz trolla';
            trollButton.style.cursor='pointer';
            trollButton.onclick = function () {
                if (this.parentNode.getElementsByClassName('commentContent')[0].style.display=='none'){
                    this.parentNode.getElementsByClassName('commentContent')[0].style.display='block';
                    this.innerHTML='Ukryj komentarz trolla';
                }else{
                    this.parentNode.getElementsByClassName('commentContent')[0].style.display='none';
                    this.innerHTML='Poka\u017c komentarz trolla';
                }
            };
            return trollButton;
        }


        for (i=0;i<AllComments_.length;i++)
        {
            nickclass = AllComments_[i].getElementsByClassName('nick')[0];
            if (nickclass.getElementsByTagName('a').length!=0){
                for (ii=0;ii<trollcount;ii++)
                {
                    if (nickclass.getElementsByTagName('a')[0].innerHTML==troll[ii])
                    {
                        nickclass.innerHTML='Uwaga Troll! ('+nickclass.getElementsByTagName('a')[0].innerHTML+');';
                        trollText = AllComments_[i].getElementsByClassName('commentContent')[0];
                        trollText.style.display='none';

                        AllComments_[i].appendChild(enteeButton());
                        break;
                    }
                }
            } else {

                for (ii=0;ii<trollcount;ii++)
                {
                    if (nickclass.innerHTML==troll[ii]+' (niezalogowany)')
                    {
                        nickclass.innerHTML='Uwaga potencjalny Troll ;) ('+nickclass.innerHTML+');';
                        trollText = AllComments_[i].getElementsByClassName('commentContent')[0];
                        trollText.style.display='none';

                        AllComments_[i].appendChild(enteeButton());
                        break;
                    }
                }

            }
        }


})();

