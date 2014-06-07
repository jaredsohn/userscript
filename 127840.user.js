// ==UserScript==
// @name           Twitter -  Move dashboard to right.
// @namespace      com.codebycoffee.greasemonkey
// @description    Moves the twitter dashboard to the right, so the timeline is on the left.
// @include        https://twitter.com
// @include        http://twitter.com
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// ==/UserScript==

#!/usr/bin/env ruby 
require 'open-uri'

size_hash = {"720p" => "6540", "720i" => "4540", "540p" => "2540", "540i" => "1840", "360p" => "1240", "360i" => "0640", "360is" => "0440", "224p" => "0240"}

if ["--help", "help", "-h"].include?(ARGV[0]) || ARGV.size < 1
  puts "Usage: #{File.basename __FILE__} ( #{size_hash.keys.join(' | ')} )"
  exit 0
end

video_size = size_hash[ARGV[0]]
outfilename = "apple_special_event_2012.ts"
File.unlink outfilename if File.exists? outfilename
if video_size
  baseurl = "http://qthttp.apple.com.edgesuite.net/123pibhargjknawdconwecown/"
  outfile = open outfilename, 'w+'
  puts baseurl + video_size + "_vod.m3u8"
  listfile = open baseurl + video_size + "_vod.m3u8"
  listfile.each_line do |line|
    next if line =~ /^#/
    file = line.strip.split("/").last
    print "Downloading fragment file: #{file}..."
    begin
      infile = open baseurl + "/" + line.strip
    rescue StandardError => ex
      puts "retry..."
      retry
      raise
    end
    outfile.write infile.read
    infile.close
    puts "Done"
  end
  outfile.close
else
  puts "Wrong option."
  exit 1
end