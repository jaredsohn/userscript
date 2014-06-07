/*
*/

// ==UserScript==
// @name          genstates.perl
// @namespace     http://dbooth.org
// @include       file://never-run
// @description   DO NOT INSTALL THIS SCRIPT! It is a helper program that is used to generate a regex pattern used by http://userscripts.org/scripts/show/25619 to match US state names and state abbreviations.
// @version       0.1
// @date          2008-05-02
// @creator       David Booth <david_AT_dbooth_DOT_org>
// ==/UserScript==
//
// License: GPL http://creativecommons.org/licenses/GPL/2.0/
//
// ------------------------ cut here ------------------------
#! /usr/bin/perl -w

# Generate a pattern to match US states or state abbreviations.
#
# Each input line returned by &GetData() contains a |-separated 
# list of state name and abbreviations for that state, such as:
#	Alabama|AL 
#	Alaska|AK 
#	Alabama |Ala. |Ala. |
#	Alaska |Alaska |Alaska |Alas.
#	Arkansas |Ark. |Ark. |A.R.
#	Canal Zone |C.Z. ||
#	District of Columbia |D.C. |D.C. |
#	Louisiana |La. |La. |
#
# The result is a regex for matching them.

my $data = &GetData();
my @lines = split(/\n/, $data);
my %states = ();
my %testData = (); # Used for integrity checks
foreach my $line (@lines)
	{
	chomp $line;
	$line =~ s/\#.*//;	# Delete comments
	$line =~ tr/A-Z/a-z/;
	my @fields = split(/\|/, $line);
	foreach my $f (@fields)
		{
		$f =~ s/\s\s+//;	# Collapse multiple spaces to one
		$f =~ s/\A\s+//;	# Leading spaces
		$f =~ s/[\s]+\Z//;	# Trailing spaces 
		next if !$f;
		# The next line is used only to generate test data for the
		# generated pattern:
		$testData{$f} = 1;
		# Now make the pattern for this state.
		$f =~ s/[\s\.]+\Z//;	# Trailing spaces or period
		next if !$f;
		# State "A.R" will become pattern "A[ .]*R", to
		# match "AR", "A.R" or "A. R"
		$f =~ s/[ \.]+/\[ .\]*/g;
		next if exists($states{$f});
		$states{$f} = 1;
		# warn "Pattern: $f\n";
		}
	}

# Permit final period also:
my $pattern = "(((" . join(")|(", sort keys %states) . "))[.]*)";
print "$pattern\n";

# Check against testdata:
my $nPassed = 0;
my $nFailed = 0;
foreach my $f (sort keys %testData)
	{
	if ($f =~ m/\A($pattern)\Z/i) { $nPassed++; }
	else	{
		warn "State integrity test failed on: $f\n";
		$nFailed++;
		}
	}

# These should not match:
my @nonStates = ( 
	"Cambridge",
	"Foo Bar",
	".",
	". .",
	);

foreach my $f (@nonStates)
	{
	if ($f !~ m/\A($pattern)\Z/i) { $nPassed++; }
	else	{
		warn "Non-state integrity test failed on: $f\n";
		$nFailed++;
		}
	}

warn "Integrity tests passed: $nPassed failed: $nFailed\n";
exit ($nFailed>0);

################### GetData ####################
sub GetData
{
my $data = <<END_OF_DATA;
# US states and state abbreviations, for use by genstates.perl.
# These are |-separated fields.
# This file actually contains two lists concatenated.
# If you scroll down, you'll see the second list.
#
# The first list contains traditional abbreviations:
Alabama |Ala. |Ala. |
Alaska |Alaska |Alaska |Alas.
American Samoa |A.S. ||
Arizona |Ariz. |Ariz. |
Arkansas |Ark. |Ark. |A.R.
Canal Zone |C.Z. ||
California |Calif. |Calif. |Cal.
Colorado |Colo. |Colo. |Col.
Connecticut |Conn. |Conn. |
Delaware |Del. |Del. |
District of Columbia |D.C. |D.C. |
Florida |Fla. |Fla. |Flor.
Georgia |Ga. |Ga. |
Guam |Guam ||
Hawaii |Hawaii |Hawaii |H.I.
Idaho |Idaho |Idaho |Id. |Ida.
Illinois |Ill. |Ill. |Ills.
Indiana |Ind. |Ind. |
Iowa |Iowa |Iowa |Ia.
Kansas |Kans. |Kan. |
Kentucky |Ky. |Ky. |Ken.|Kent.
Louisiana |La. |La. |
Maine |Maine |Maine |Me.
Maryland |Md. |Md. |
Massachusetts |Mass. |Mass. |
Michigan |Mich. |Mich. |
Minnesota |Minn. |Minn. |
Mississippi |Miss. |Miss. |
Missouri |Mo. |Mo. |
Montana |Mont. |Mont. |
Nebraska |Nebr. |Neb. |
Nevada |Nev. |Nev. |
New Hampshire |N.H. |N.H. |
New Jersey |N.J. |N.J. |
New Mexico |N. Mex. |N.M. |New M.
New York |N.Y. |N.Y. |N. York
North Carolina |N.C. |N.C. |N. Car.
North Dakota |N. Dak. |N.D. |
Northern Mariana Islands |M.P. ||
Ohio |Ohio |Ohio |O.
Oklahoma |Okla. |Okla. |
Oregon |Oreg. |Ore. |
Pennsylvania |Pa. |Pa. |Penn. |Penna.
Puerto Rico |P.R. ||
Rhode Island |R.I. |R.I. |
South Carolina |S.C. |S.C. |S. Car.
South Dakota |S. Dak. |S.D. |
Tennessee |Tenn. |Tenn. |
Texas |Tex. |Texas |
Utah |Utah |Utah |
Vermont |Vt. |Vt. |
Virginia |Va. |Va. |
Virgin Islands |V.I. ||U.S.V.I.
Washington |Wash. |Wash. |
West Virginia |W. Va. |W.Va. |W.V.
Wisconsin |Wis. |Wis. |Wisc.
Wyoming |Wyo. |Wyo. |

# The second list contains standard US postal codes:
Alabama|AL 
Alaska|AK 
Arizona|AZ 
Arkansas|AR 
California|CA 
Colorado|CO 
Connecticut|CT 
Delaware|DE 
Florida|FL 
Georgia|GA 
Hawaii|HI 
Idaho|ID 
Illinois|IL 
Indiana|IN 
Iowa|IA 
Kansas|KS 
Kentucky|KY 
Louisiana|LA 
Maine|ME 
Maryland|MD 
Massachusetts|MA 
Michigan|MI 
Minnesota|MN 
Mississippi|MS 
Missouri|MO 
Montana|MT 
Nebraska|NE 
Nevada|NV 
New Hampshire|NH 
New Jersey|NJ 
New Mexico|NM 
New York|NY 
North Carolina|NC 
North Dakota|ND 
Ohio|OH 
Oklahoma|OK 
Oregon|OR 
Pennsylvania|PA 
Rhode Island|RI 
South Carolina|SC 
South Dakota|SD 
Tennessee|TN 
Texas|TX 
Utah|UT 
Vermont|VT 
Virginia|VA 
Washington|WA 
West Virginia|WV 
Wisconsin|WI 
Wyoming|WY 
END_OF_DATA
return($data);
}

