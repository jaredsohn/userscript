// ==UserScript==
// @name          automatically kill rails when files change
// @namespace     http://myfavoritepal.com
// @description   Allows rails when running in production mode to kill itself when files change. -- delete the topmost stuff.
// @author        Roger Pack
// ==/UserScript==

watcher_thread = Thread.new{
 def get_rss
   mem_info = IO.popen("ps -o rss,vsz -p #{Process.pid}")
   mem_read = mem_info.read
   mem_info.close
   empty, rss, vsz = mem_read.split("\n")[1].split(/\s+/) 
   rss.to_i
 end

print 'starting watcher'
latest_inserted = Time.now
dirs = ['app/controllers', 'app/schools', '/app/models']
old_rss = nil
loop do
 has_new = false
 for dir in dirs
	for file in Dir.glob dir + '/*'
		time = File.ctime file
		if time > latest_inserted
			has_new = true
			print 'got new' , file
			break
		end
	end
	break if has_new
  end
 should_die = false
 if has_new
  should_die = true
 end

 rss = get_rss 
 print 'got rss', rss unless rss == old_rss
 old_rss = rss
 if rss > 200_000 # it's in KB
   GC.start
   if get_rss > 200_000
     print "TOO BIG--killing! #{rss}"
     should_die = true
   end
 end


 if should_die
  system_command = "kill -9 #{Process.pid}"
  p 'running', system_command
  system(system_command) # we are done
  latest_inserted = Time.now
  Process.kill!
  Process.kill
  Process::exit
 end
 sleep 0.2
 end
} if ENV['RAILS_ENV'] == 'staging' and Socket.gethostname == "Rogers-little-PowerBook.local" # ruby does it itself otherwise, I think.  There may be a rails way to do this.


CL = CampusLocation
S = School
P = Program

class ActiveRecord::Base
 def save_unless_missing *args
  self.errors.clear
  passed = true
  for arg in args
   val = self[arg]
   unless val and val != ''
     self.errors.add arg, " cannot be blank"
    passed = false
  end
 end
 # could add a call to validate in here
 return nil unless passed
 return save
end
end		
  
# some rails optimizations, from http://blog.pluron.com/2008/01/ruby-on-rails-i.html
module Benchmark
    def realtime
        r0 = Time.now
        yield
        r1 = Time.now
        r1.to_f - r0.to_f
    end
    module_function :realtime
end

class BigDecimal
    alias_method :eq_without_boolean_comparison, :==
    def eq_with_boolean_comparison(other)
        return false if [FalseClass, TrueClass].include? other.class
        eq_without_boolean_comparison(other)
    end
    alias_method :==, :eq_with_boolean_comparison
end



module ActiveRecord
    class Base
    private
        def attributes_with_quotes(include_primary_key = true)
            result = {}
            @attributes.each_key do |name|
                if column = column_for_attribute(name)
                    result[name] = quote_value(read_attribute(name), column) unless !include_primary_key && column.primary
                end
            end
            result
        end
    end
end


module ActiveRecord
    module ConnectionAdapters
        class AbstractAdapter
        protected
            def log_info_with_level_check(sql, name, runtime)
                return unless @logger and @logger.level == Logger::DEBUG
                log_info_without_level_check(sql, name, runtime)
            end
            alias_method_chain :log_info, :level_check
        end
    end
end


