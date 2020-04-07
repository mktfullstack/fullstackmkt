"use strict";
/**
<!-- Página desarrollada  por fullstack marketing cireña webs, subida y alojada en github para que los desarrolladores puedan ver el codigo y usarlo para test. En FSM ayudamos los jóvenes que van empezando. Siguenos en Facebook: https://www.facebook.com/fullstackmkt/ y github como:https://github.com/mktfullstack-->
 */


if($(".alt-clock .clock-place").attr('data-logosrc') 
   && $(".alt-clock .clock-place").attr('data-logosrc') != ""){
	var imgUrlSrc = $(".alt-clock .clock-place").attr('data-logosrc');
	$(".alt-clock .clock-place .logo").attr("src",imgUrlSrc) ;
//	$(".alt-clock .clock-place .logo").attr("src") = $(".alt-clock .clock-place").attr('data-logosrc');
}

(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Throw error if date is not set
        if (!settings.date) {
            $.error('Date is not defined.');
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2017 12:00:00.');
        }

        // Save container
        var container = this;

        /**
         * Change client's local date to match offset timezone
         * @return {Object} Fixed Date object.
         */
        
        var secCount = -1;
        var minCount = -1;
            
        var timeZone = +0;  
        if($('.site-config').attr('data-date-timezone') && ($('.site-config').attr('data-date-timezone') != '')){
            timeZone = $('.site-config').attr('data-date-timezone');
        }
        
        var currentDate = function () {
            // get client's current date
            var date = new Date();
            
            // turn date to utc
//            var utc = date.getTime() + (date.getTimezoneOffset() * 60000) - (360000*100);
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000) - (360000*100) +(360000*10)*timeZone;
           
//            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))
            
            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
//            var _second = 1000,
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;
			var _centi = _second / 100;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second),
                centis = Math.floor((difference % _minute) / _centi );

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';
            if(centis == 0){
                centis = 6000;
            }
			if(seconds == 0){
                seconds = 60;
            }
            if(seconds%60 == 0){                
                secCount--;
            }
            
            if(minutes == 0){
                minutes = 60;
            }
            if((minutes%60 == 0) && (seconds == 59)){                
                minCount--;
            }

            // set to DOM class or css according to position
            container.find('.days').text(days);
            container.find('.hours').text(hours);            
            container.find('.minutes').text(minutes);            
            container.find('.seconds').text(seconds);            
			
		};
        
        // start
       var interval = setInterval(countdown, 333.333);
    };

})(jQuery);