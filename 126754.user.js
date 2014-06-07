// ==UserScript==
// @name           blast-nucleotide-numbering
// @namespace      bnn
// @description    Blast Nucleotide Numbering
// @include        http://blast.ncbi.nlm.nih.gov/Blast.cgi
// ==/UserScript==

// What Blast is used?
var blast;

// Give aminoacid back by given one letter code
function aminoacid (one_letter_code)
{
	switch (one_letter_code)
	{
		case 'A': aa =  'Alanine'; break;
		case 'C': aa =  'Cysteine'; break;
		case 'D': aa =  'Asparate'; break;
		case 'E': aa =  'Glutamate'; break;
		case 'F': aa =  'Phenylalanine'; break;
		case 'G': aa =  'Glycine'; break;
		case 'H': aa =  'Histidine'; break;
		case 'I': aa =  'Isoleucine'; break;
		case 'K': aa =  'Lysine'; break;
		case 'L': aa =  'Leucine'; break;
		case 'M': aa =  'Methionine'; break;
		case 'N': aa =  'Asparagine'; break;
		case 'P': aa =  'Proline'; break;
		case 'Q': aa =  'Glutamine'; break;
		case 'R': aa =  'Arginine'; break;
		case 'S': aa =  'Serine'; break;
		case 'T': aa =  'Threonine'; break;
		case 'V': aa =  'Valine'; break;
		case 'W': aa =  'Tryptophan'; break;
		case 'Y': aa =  'Tyrosine'; break;
		default: aa = one_letter_code;  break;
	}
	
	return aa;
}

// Do the numbering
function numbering (str, p1, p2, p3, p4, p5, p6, p7, offset, s)
{
	start  = parseInt(p3);	// Start count
	end    = parseInt(p7);	// End count
	bases  = p5.split('');	// Single bases
	numb   = new Array;		// Return numbering
	y	   = 0; 			// Base Counter
	
	// Add numb_class
	numb_class = p1 == 'Query' ? 'numb_top' : 'numb_bottom';
	
	// Go through all bases
	for (x=0;x<bases.length;x++)
	{
		// no base given
		if (bases[x] == '-')
		{
			numb[x] = "-";
		}
		
		// base given
		else
		{	
			// plus / minus strand
			act_numb = start < end ? start+y : start-y;
			// Get amino acid if its a protein search
			base_name = blast == 'BLASTP' ? aminoacid(bases[x]) : bases[x];
		
			// Modify the base surrounding
			numb[x] = '<span class="numb '+numb_class+'"><div>'+base_name+' (#'+act_numb+')</div>'+bases[x]+'</span>';
		
			y++;
		}
	}
	
	// Return whole stuff
	return p1+p2+p3+p4+numb.join('')+p6+p7;
}

// Do stuff if page is fully loaded
window.addEventListener("load", function(e) {
	
	// Add some style
	GM_addStyle('.numb { color:black; } .numb div { display:none; position:absolute; padding:2px; border:1px solid red; font-size:12pt; width:auto; height:15px; background-color:white; } .numb:hover { color:red; cursor:pointer; } .numb:hover div { display:inline; } .numb_top div {  margin-top:-24px; } .numb_bottom div {  margin:15px 0 0 20px; }');
	
	// Check program
	blast_variant = document.getElementById('dbsummary').innerHTML;
	blast = blast_variant.match(/BLAST([NP])/gim);

	// Load results
	dat = document.getElementById('alignments').innerHTML;
	
	// Add numbering to results
	new_dat = dat.replace(/([a-z]+)([\s]+)([0-9]+)([\s]+)([-a-z]+)([\s]+)([0-9]+)/gim,numbering);
	
	// Save to results
	document.getElementById('alignments').innerHTML = new_dat;

}, false);
