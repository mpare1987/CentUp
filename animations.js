(function($) {
//home page sections
var qualityPos = { attr: "#quality", pos: $("#quality").offset().top };
var missionPos = { attr: "#mission", pos: $("#mission").offset().top };
var purposePos = { attr: "#purpose", pos: $("#purpose").offset().top };
var productPos = { attr: "#product", pos: $("#product").offset().top };
var einsteinPos = { attr: ".einstein", pos: $(".einstein").offset().top };
var homeSections = [missionPos, qualityPos, purposePos, productPos, einsteinPos];

var fader = function(sections) {
			//if initial scroll position is 0 run animations on scroll
			if ($(document).ready().scrollTop() === 0) {
			$(window).scroll(function(e) {
						var i = 0;
						var scrollPos = $(document).scrollTop();

						for (i; i < sections.length; i++ ) {
							var sectionContent = sections[i].attr + " .fullwidth-box .avada-row ";
							if ( scrollPos > (sections[i].pos+20) ) {
								$(sectionContent).addClass("scrollFade");
								console.log(sections[i].pos + ' -> ' + scrollPos );
								}
							}
			}); //end scroll event
			}// end if
			else {
				//if initial scroll position !=0 run animations on load
				$(document).ready(function() {
						var i = 0;
						var sectionsLength = sections.length;
						for (i; i < sectionsLength; i++ ) {
							var sectionContent = sections[i].attr + " .fullwidth-box .avada-row ";
								$(sectionContent).addClass("scrollFade");
							}
					});//end doc ready event
			}//end else
};//end fader
fader(homeSections);

$(document).ready(function(){
	$('.loadFade').css("opacity", 1);
});

})( jQuery );