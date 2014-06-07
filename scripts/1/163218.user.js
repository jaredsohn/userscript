<html>
<head>
// ==UserScript==
// @name           AnTiPhishing
// @namespace      FishThemOut
// @description    takes out all scam sites/ scammers
// @include        
// @copyright      
// @creator        Juampi_92
// @version        1.0.0
// ==/UserScript==
<script type="text/javascript">

/******************************************************************************************/
function doasc(text) {

let=text;



if (let ==  "1000001") {return('A');}
if (let ==  "1000010") {return('B');}
if (let ==  "1000011") {return('C');}
if (let ==  "1000100") {return ('D');}
if (let ==  "1000101") {return ('E');}
if (let ==  "1000110") {return('F');}
if (let ==  "1000111") {return ('G');}
if (let ==  "1001000") {return ('H');}
if (let ==  "1001001") {return('I');}
if (let ==  "1001010") {return('J');}
if (let ==  "1001011") {return ('K');}
if (let ==  "1001100") {return ('L');}
if (let ==  "1001101") {return ('M');}
if (let ==  "1001110") {return ('N');}
if (let ==  "1001111") {return('O');}
if (let ==  "1010000") {return('P');}
if (let ==  "1010001") {return('Q');}
if (let ==  "1010010") {return('R');}
if (let ==  "1010011") {return('S');}
if (let ==  "1010100") {return ('T');}
if (let ==  "1010101") {return ('U');}
if (let ==  "1010110") {return ('V');}
if (let ==  "1010111") {return('W');}
if (let ==  "1011000") {return('X');}
if (let ==  "1011001") {return('Y');}
if (let ==  "1011010") {return('Z');}
if (let ==  "1011110") {return('^');}
}

/**************************************************************************************************/


  function ConvertToBinary(dec) {
		
		var bin_final='';
            var bits = [];
		var chunk=[];
            var dividend = dec;
            var remainder = 0;var chunk
            while (dividend >= 2) {
                remainder = dividend % 2;
                bits.push(remainder);
                dividend = (dividend - remainder) / 2;
            }
            bits.push(dividend);
            bits.reverse();
		
		alert('%%%%%'); 
		/*bits.join();*/
		chunk = bits.slice(0,8);
		/*chunk.reverse();*/
		alert(chunk);
            alert('Length *******');
		if(chunk.length ==1)
		{			
			chunk='0,0,0,0,0,0,0,'+ chunk;
		}
		else if (chunk.length ==2)
		{
			chunk='0,0,0,0,0,0,'+ chunk;
		}
		else if (chunk.length ==3)
		{
			chunk='0,0,0,0,0,'+ chunk;
		}
		else if (chunk.length ==4)
		{
			chunk='0,0,0,0,'+ chunk;
		}
		else if (chunk.length ==5)
		{
			chunk='0,0,0,'+ chunk;
		}
		else if (chunk.length ==6)
		{
			chunk='0,0,'+ chunk;
		}
		else if (chunk.length ==7)
		{
			chunk='0,'+ chunk;
		}
		/*alert('DATA IN BINARY '+chunk[4]);*/
            /*return chunk.join("");*/
		return chunk;

        }


function x()
{
	var embedded_string='Y^';
	var extracted_string='';
	var img = new Image();
	img.src = '3stegoedImage.png';
	var context = document.getElementById('pix').getContext('2d');
	context.drawImage(img, 0, 0);
	var i=0;
      var indi_seq='12311123111231112311';
	var dec_to_bin;
	var small_r=0;
	var small_g=0;
	var small_b=0;
	var len_bin_array =0;
	var extracted_bit=[];
	var let_result="";
	var ct=2;
      var embed_data=1;
	var indi_seq_index=0;
	var loop_i=0;
      var ascii_grp='';
	var len_ext_bit=0;
      alert('Indicator Sequence');
	alert(indi_seq[0]);
      alert(indi_seq[1]);
	alert(indi_seq[2]);alert(indi_seq[3]);
	var data = context.getImageData(0, 0, 512, 768).data;

	/* Starts : To Read all Values in the Image */
	for (var i=0;i<=100;i=i+4)
	{	
		embed_data=1;
      	var small_r=0;
		var small_g=0;
		var small_b=0;

		if(data[i]< data[i+1])
		{
		  if(data[i]<data[i+2])
		  {
			alert(data[i]+'  is the lowest value');
			small_r=1;
		  }		
		}	
           if(data[i+1]< data[i])
		{
		  if(data[i+1]<data[i+2])
		  {
			alert(data[i+1]+'  is the lowest value');
			small_g=1;

		  }		
		}	
          if(data[i+2]< data[i+1])
		{
		  if(data[i+2]<data[i])
		  {
			alert(data[i+2]+'  is the lowest value');
			small_b=1;

		  }	

		}

            if((small_r==1)&&(indi_seq[indi_seq_index]==1))
		{
			embed_data=0;
			alert('Cannot Embed Data');
			

		}
            if((small_g==1)&&(indi_seq[indi_seq_index]==2))
		{
			embed_data=0;
			alert('Cannot Embed Data');
			
		}
            if((small_b==1)&&(indi_seq[indi_seq_index]==3))
		{
			embed_data=0;
			alert('Cannot Embed Data');
			
		}
		

		/*Ends - Finding Lowest Colour in the Pixel*/



		


/* Starts -- Extracting the embedded number of bits from data channel */

	if(embed_data ==1)
	{
		if(indi_seq[indi_seq_index] ==1)
		{
			if((data[i]%2)==0)
			{
				alert('Green Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i+1]);
				/*dec_to_bin.reverse();*/
				alert('data pixel in binary  '+ dec_to_bin);
				alert('Length of arr ' ); alert((dec_to_bin.length));
				
				alert('Data in binary of 8 bits ' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);

				if(data[i+2]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
			}
			else
			{
				alert('Blue Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i+2]);
				alert('Data in binary of 8 bits ' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);
				if(data[i+1]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}


				alert('data pixel in binary  '+ dec_to_bin);
				
			}
		}
		if(indi_seq[indi_seq_index] ==2)
		{
			if((data[i+1]%2)==0)
			{
				alert('Blue Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i+2]);
				alert('Data in binary of 8 bits ' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);

				if(data[i]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}

				alert('data pixel in binary  '+ dec_to_bin);
			}
			else
			{
				alert('Red Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i]);
				alert('Data in binary of 8 bits ' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);

				if(data[i+2]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}

				alert('data pixel in binary  '+ dec_to_bin);

			}

		}
		if(indi_seq[indi_seq_index] ==3)
		{
			if((data[i+2]%2)==0)
			{
				alert('Data Data  ' + data[i]);
				alert('Red Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i]);
				alert('Data in binary of 8 bits ' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);
				if(data[i+1]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}


				alert('data pixel in binary  '+ dec_to_bin);
			}
			else
			{
				alert('Green Channel is the Data Channel');
				dec_to_bin=ConvertToBinary(data[i+1]);
				alert('Data in binary of 8 bits' + dec_to_bin);
				alert('Extracting 5th bit ' + dec_to_bin[0]+ dec_to_bin[2]+ dec_to_bin[4]+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14]);
				if(data[i]%2==0)
				{
					extracted_bit= extracted_bit+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}
				else
				{
					extracted_bit= extracted_bit+ dec_to_bin[6]+ dec_to_bin[8]+ dec_to_bin[10]+ dec_to_bin[12]+dec_to_bin[14];
				}


				alert('data pixel in binary  '+ dec_to_bin);

			}

		}

		
      }


/* Ends -- Extracting the embedded number of bits from data channel */


		alert('GGGGGGGGGGGGGGG');
      	dec_to_bin=ConvertToBinary(data[i]);
		alert('Decimal Value');
		alert(data[i]);
		alert('Binary Value');
		alert(dec_to_bin);
		
		/* To make Indicator Sequence a rotatable fashion*/

		indi_seq_index=indi_seq_index+1;
		if(indi_seq_index>19)
		{
			indi_seq_index=0;
		}

	}


     
	/* Ends : To Read all Values in the Image */



	var data = context.getImageData(20, 20, 1, 1).data;
//To find the Length of the pixel
	alert(data.length);
alert('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
alert(extracted_bit);
len_ext_bit=extracted_bit.length;
while(len_ext_bit>=7)
{

	if(loop_i==0)
	{
		ascii_grp=extracted_bit.slice(0,7);
		loop_i=loop_i+1;
		alert('ASCII ***' + ascii_grp);
		extracted_string=extracted_string+ascii_grp;
	}



	if(loop_i==1)
	{
		alert('loop==1');
		ascii_grp=extracted_bit.slice(7,14);
		if(ascii_grp=="1011110")
		break;
		alert('ASCII ***' + ascii_grp);
		extracted_string=extracted_string+ascii_grp;
		loop_i=loop_i+1;
	}
	if(loop_i>=2)
	{
		alert('loop>=2');
		ascii_grp=extracted_bit.slice((7*ct),(7*(ct+1))); 
            if(ascii_grp=="1011110")
		break;
		ct=ct+1;loop_i=loop_i+1;
		alert('ASCII ***' + ascii_grp);
		extracted_string=extracted_string+ascii_grp;

	}
	
len_ext_bit=len_ext_bit-7;
}

/*if(extracted_string=="10110011011110")*/
if(extracted_string=="101001110100111000101")
{
alert('Extracted MESS ' + extracted_string);
alert("Hey ! THIS IS VALID SITE");
}
else
{
alert('Extracted MESS ' + extracted_string);
alert("HEY THIS IS A PHISHED SITE");
}
/*let_result=doasc(ascii_grp);
 
if(let_result == "^")
break;
else
{
alert'***********************************************************';
alert'***********************************************************';
alert(let_result);
alert'***********************************************************';
alert'***********************************************************';
}*/




alert('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
//Individual values of the pixel
	alert("Red = " + data[0] + " Green = " + data[1] + " Blue = " + data[2] + " Alpha = " + data[3]);
}
</script>
<body onload="x()" >
<canvas id="pix" height="768" width="512">
</canvas>
</body>
</html>

