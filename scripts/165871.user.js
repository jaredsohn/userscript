// ==UserScript==
// @name            CPAN to METACPAN
// @namespace       http://chizography.net/
// @version         0.0.6
// @description     Spot CPAN pages and automagically redirect to METACPAN equivalent
// @match           http://search.cpan.org/*
// @match           http://cpansearch.perl.org/src/*
// @run-at          document-start
// @copyright       2013, Chisel Wright / Will Sheppard
// ==/UserScript==

// Massively simplified after reading:
//   http://perlhacks.com/2013/01/give-me-metacpan/

(function() {
    var cpan_url_base='http://search.cpan.org';
    var cpansrc_url_base='http://cpansearch.perl.org';
    var metacpan_url_base='http://sco.metacpan.org';
    
    var current_uri=window.location.href
        .replace(cpan_url_base, '')
        .replace(cpansrc_url_base, '');

    // Fix anchors: Replace underscores with hyphens
    if (current_uri.match(/#.+/)) {
        var url_parts = current_uri.split('#');
        var url_without_anchor = url_parts[0];
        var anchor = url_parts[1];
        var underscore_regex = new RegExp("_", "g");
        anchor = anchor.replace(underscore_regex, "-");
        current_uri = url_without_anchor+'#'+anchor; 
    }

    // Modules
    var dist_module_regex = new RegExp("/dist/[^/]+/lib/", "g");
    if (current_uri.match(dist_module_regex)) {
        var url_parts = current_uri.split(dist_module_regex);
        var second_part = url_parts[1];
        second_part = second_part.replace('.pod', '');
        second_part = second_part.replace('.pm', '');
        var slashes_regex = new RegExp('/', 'g');
        second_part = second_part.replace(slashes_regex, '::');
        current_uri = '/module/'+second_part; 
    }

    window.location.href = metacpan_url_base + current_uri;
})();

// If you're source diving and want some URLS to test with, try these:
// These are expected to work:
// - http://search.cpan.org/~chisel/
// - http://search.cpan.org/~chisel/Catalyst-Plugin-ErrorCatcher-0.0.8.13/
// - http://search.cpan.org/src/CHISEL/Catalyst-Plugin-ErrorCatcher-0.0.8.13/lib/Catalyst/Plugin/ErrorCatcher/Email.pm
// - http://cpansearch.perl.org/src/CHISEL/Catalyst-Plugin-ErrorCatcher-0.0.8.13/lib/Catalyst/Plugin/ErrorCatcher/Email.pm
// - http://search.cpan.org/perldoc?Catalyst::Plugin::ErrorCatcher
// - http://search.cpan.org/~doy/Moose-2.0603/lib/Moose/Manual/Types.pod#THE_TYPES
// - http://search.cpan.org/dist/Moose/lib/Moose/Manual/Attributes.pod#Predicate_and_clearer_methods -> https://metacpan.org/module/ETHER/Moose-2.0801/lib/Moose/Manual/Attributes.pod#Predicate-and-clearer-methods
// - http://search.cpan.org/dist/Moose/lib/Moose/Meta/Attribute.pm#Value_management -> https://metacpan.org/module/Moose::Meta::Attribute#Value-management
// - http://search.cpan.org/dist/DBIx-Class/lib/DBIx/Class/ResultSet.pm -> https://metacpan.org/module/DBIx::Class::ResultSet
// The following are known not to work, perhaps some could be achieved with the metacpan API and/or https://github.com/yanick/metacpan.js :
// - http://search.cpan.org/~chisel/Catalyst-Plugin-ErrorCatcher/ -> https://metacpan.org/module/Catalyst::Plugin::ErrorCatcher
// - http://search.cpan.org/~chisel/Catalyst-Plugin-ErrorCatcher/lib/Catalyst/Plugin/ErrorCatcher/Email.pm -> https://metacpan.org/module/Catalyst::Plugin::ErrorCatcher::Email

