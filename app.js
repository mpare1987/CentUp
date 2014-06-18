
function _l(s){ console.log("::"+s+"::"); }

$(document).ready(function($) {

  $.extend({
	//extension for playing audio files
    playSound: function(){
      return $("<embed src='"+arguments[0]+".mp3' hidden='true' autostart='false' loop='false' class='playSound'>" + "<audio autoplay='false' style='display:none;' controls='controls'><source src='"+arguments[0]+".mp3' /><source src='"+arguments[0]+".mp3' /></audio>").appendTo('body');
    }
  });

	var centUp = {
		donation: 0,
		baseDonation: 10,
		maxDonation: 150,
		overdriveValue: parseInt($('.overdriveCount').html(), 10),
		centsAvailable: 550,
		coinDiameter: $('.centButton').outerWidth(),
		charged:false,
		translation: 0,
		withinSwipeBoundry: function(btnPos) {
			if ( btnPos < -2 && btnPos > -300 ) {
				return true;
			}
			else {
				return false;
			}
		},

		init: function() {

			var prepButton = function() {
				$('.centButton').animate({
					marginTop:0
				}, 200).effect("bounce", { direction: 'up', duration: 150,  distance: 20, times: 3 });
				var playDropEffect = function() {
				$.playSound('assets/sound/coin_drop');
				};
				setTimeout(playDropEffect, 150);
			};

			var prepContent = function() {
				$('#content').addClass('faded');
				$('.logo').addClass('faded');
			};

			var makeScrollable = function() {
				$('#content').addClass('ready');
			};
			prepButton();
			setTimeout(prepContent, 300);
			setTimeout(makeScrollable, 1500);
		},

		meterHeight: function() {
			var meterHeight = parseInt($('.centsAvailable').html(), 10);
				console.log(meterHeight);
				$('.fundsMeter').css('height', meterHeight + "px");
				console.log($('.fundsMeter').css('height'));
		},
		countDonations: function(baseDonation, overdriveValue, maxDonation, centsAvailable){
			var base = this.baseDonation;
			var donation = 0;
			var count = this.overdriveValue;
			var max = this.maxDonation;
			var funds = this.centsAvailable;
			var t = this.tInt;
			var d = this.coinDiameter;

				var centCounter = function () {

					var translation = 0;

					var growTrack = function() {
							if (count == max) {
								translation = 36;
							}
							$('.overdriveCountbg').css({
								"padding-top": translation,
								"-webkit-transform": "translateY(-" + translation + "px)"
							});
							$('.swipeIndicator').css({
								"-webkit-transform": "translateY(-" + translation + "px)"
							});
					}; //end growTrack

						funds = parseInt($('.centsAvailable').html(), 10);
						centUp.meterHeight = funds;

					if (count < max && funds >= base+1 ) {

						translation = (count/max) * 36;

						count++;
						funds--;

						growTrack();

						//increment overdriveValue
						$('.overdriveCount').html(count);

						//decrement cents available
						$('.centsAvailable').html(funds);
					} else {
						clearInterval(centUp.donationInterv);
					}

						funds = parseInt($('.centsAvailable').html(), 10);

				var btnPos = parseInt($('.centButton').css('top'), 10);
						console.log('withinSwipeBoundry ' + centUp.withinSwipeBoundry(btnPos));

				var swipable = centUp.withinSwipeBoundry(btnPos);

					if( !swipable && centUp.charged === true ) {
						_l('not swipable plus charged');
						clearInterval(centUp.donationInterv);
						count = 0;
						centUp.die();

					}

				}; //end centCounter

				var donater = function () {

					var shrinkFundsSimple = function() {
						$('.fundsMeter').css('height', funds + "px");
					};
					var shrinkFundsCharged = function() {
						$('.fundsMeter').css('height', centUp.meterHeight + "px");
					};

					var simpleDonation = function () {

						_l('simple donation seen');
						//swipeup without holding to add base donation.
								funds = parseInt($('.centsAvailable').html(), 0);

							if ( funds > 0 ) {

								donation = parseInt($('.totalDonation').html(), 0);

								donation+=base;
								funds-=base;

								$('.totalDonation').html(donation);
								$('.centsAvailable').html(funds);

								donation = parseInt($('.totalDonation').html(), 0);
								funds = parseInt($('.centsAvailable').html(), 0);

								shrinkFundsSimple();
						} //end simpleDonation
					};
					var chargedDonation = function() {

							//function to add counted donations to total donation
							donation = parseInt($('.totalDonation').html(), 10);
							funds = parseInt($('.centsAvailable'), 10);
									donation+=count;
									//add donation plus charged donation
									$('.totalDonation').html(donation);
									//reset count
									count = 0;
									//reset overdrive count to 0
									$('.overdriveCount').html(count);

							funds = parseInt($('.centsAvailable'), 0);
							donation = parseInt($('.totalDonation').html(), 0);

							shrinkFundsCharged();
					}; //end charged donation

					$('.centButton').taphold(function() {
						_l('taphold seen');

						var btnPos = parseInt($('.centButton').css('top'), 10);

						var swipable = centUp.withinSwipeBoundry(btnPos);

						$(this).addClass('tapped');
						// $('.offScreen').addClass('onScreen');

							if (swipable) {
								centUp.charged = true;
								$('.overdriveCountbg').show();
							}

							var donationInterv;
							donationInterv = setInterval(centCounter, 30);
							centUp.donationInterv = donationInterv;

							//stop counting on mouseup
							$('.centButton').mouseup(function(){

							clearInterval(donationInterv);

							if (!swipable) {
								$(this).removeClass('tapped');
							}
							if (swipable && $('.centButton').hasClass('tapped'))
							$('.swipeIndicator').addClass('swipeReady');

							});

					}); //end taphold function

						$('.centButton').on('swipeup', function(){
								var noteHere = $('.thanks-box > p');
								var simpleMessages = [
								centUp.baseDonation + '&cent;' + " for us? you shouldn't have!",
								"You're swell, thanks for donating " + centUp.baseDonation + '&cent;' + '!',
								centUp.baseDonation + '&cent;' + ' donated. Thank you sir may I have another!?',
								'you just donated ' + centUp.baseDonation + '&cent;' + ' the internet is pleased.' ,
								];

								var randomnumber = Math.round(Math.random() * (3));

								var thanksNote = function() {
									var removeNote = function() {
										$('.thanks-box').fadeOut();
									};
										$('.thanks-box').fadeIn();

									var notification = function () {

										var chargedMessages = [
											centUp.overdriveValue + '&cent;!' + " That was fun, let's do it again!",
											'thanks for donating ' + centUp.overdriveValue + '&cent;' + " don't ever change.",
											centUp.overdriveValue + '&cent;' + ' donated. Are you buttering us up for something?',
											centUp.overdriveValue + '&cent;' + ' donated. your momma would be proud.'
										];
										if (centUp.charged === false) {
											noteHere.append(simpleMessages[randomnumber]);
											console.log(randomnumber);
										} else {
											console.log('charged thanks note seen');
											noteHere.append(chargedMessages[randomnumber]);
										}
										setTimeout(removeNote, 2000);
									};

								if (noteHere.html() === '') {
									notification();
								}
								else {
									noteHere.html('');
									notification();
								}

							}; //end thanksnote

							//get y position of button to test against swipe boundries.

							var btnPos = parseInt($('.centButton').css('top'), 10);


							var swipable = centUp.withinSwipeBoundry(btnPos);

								if (swipable && centUp.charged === false)
								{
									simpleDonation();
									thanksNote();
									centUp.flick();
								}
								else if (swipable && centUp.charged === true){

								value = count;
								centUp.overdriveValue = value;
								chargedDonation();
								thanksNote(value);
								centUp.flick();
								setTimeout(centUp.die(), 300);
							}
						});

					};//end donater

				donater();

		}, //end countDonations

		drag: function() {
			//make draggable
			$('.centButton').draggable({
				revert:true,
				cursor: "move", cursorAt: { top: 35, left: 25 }
			});
		},

		//flick should have add charge
		flick: function() {

			$.playSound('assets/sound/CoinFlip');


			var isActiveButton = $('.centButton').attr('data-state') == 'active';
					$('.centButton').attr('data-state', 'active' );

						$('.centButton').addClass('flipCoin');

						$('.centButton').addClass('flicked');

						centUp.clone();

						centUp.charged = false;
			},

			clone: function() {

				var activeButton = $('.centButton').attr('data-state', 'active');
				var removeButton = function() {
					activeButton.remove();
				};

				var makeClone = function() {
					//generate new button from template once original has been removed from DOM
					$('.centBase').clone().appendTo('.button-holder').addClass('clone');
				};
				var activateClone = function() {
					//activate button
					$('.clone').addClass('centButton').removeClass('centBase clone').attr('data-state', 'idle').css('margin-top', 0);
					centUp.resetButton();

				};

				setTimeout(makeClone, 400);
				setTimeout(removeButton, 450);
				setTimeout(activateClone, 460);

			},

			die: function() {
				_l('die seen');
				//get initial value of funds and overdrive count
				funds = parseInt($('.centsAvailable').html(), 10);
				count = parseInt($('.overdriveCount').html(), 0);
					console.log('funds = ' + funds + 'and count = ' + count);
					console.log('funds + count = ' + funds+count);
					// return charged funds to account
					funds = funds + count;
					console.log(funds);
				clearInterval(centUp.buttonPosInterv);

				//push returned funds data to page
				$('.centsAvailable').html(funds);
				$('.overdriveCount').html(count);

				//reset variables
				this.centsAvailable = parseInt($('.centsAvailable').html(), 10);
				this.overdriveValue = parseInt($('.overdriveCount').html(), 0);


				$('.swipeIndicator').removeClass('swipeReady');
				centUp.charged = false;

				$('.overdriveCountbg').addClass('bounceOutDown');

				var resetOverdrive = function() {
					$('.overdriveCountbg').removeClass('bounceOutDown').hide();
				};
				setTimeout(resetOverdrive, 500);
				$('.centButton').removeClass('tapped');
			},

		resetButton: function() {
			centUp.drag();
			centUp.countDonations();
		}
	}; //end centup object

	var initCentUp = function () {
		centUp.init();
		centUp.drag();
		centUp.meterHeight();
	};

	console.log('-10 is ' + centUp.withinSwipeBoundry(-10));
	console.log('-300 is ' + centUp.withinSwipeBoundry(-300));

	centUp.countDonations();
	setTimeout(initCentUp, 200);

var checkSwipable = function () {

	var btnPos = parseInt($('.centButton').css('top'), 10);

	var swipable = centUp.withinSwipeBoundry(btnPos);

		if (!swipable) {
			centUp.die();
			console.log('count - ' + count);
			count=0;

			$('.overdriveCount').html(count);
		}
	};

var toggleFunds = function() {

	var $funds = $('#funds');

	var revealFunds = function() {

		$funds.show().addClass('bounceInLeft');

	};
	var hideFunds = function() {
		$funds.addClass('bounceOutLeft').hide();
	};
	var toggleRevealButton = function( amount) {
					$('.revealFunds').animate({
				left: amount + 'px'
				}, 200);
				console.log('seen');

				if ($funds.hasClass('bounceOutLeft')) {
					$funds.removeClass('bounceOutLeft');
				}

	};

	$('.revealFunds').click(function() {
			toggleRevealButton(-75);
			revealFunds();
			$('.revealFunds').addClass('offScreen');

		});

	$funds.click(function() {
		$('.revealFunds').removeClass('offScreen');
		hideFunds();
		toggleRevealButton(-15);

	});
};


toggleFunds();

$('.centButton').click(function( ) {
	_l('tracking started');
 //track location of button

 var buttonPosInterv = centUp.buttonPosInterv;
 centUp.buttonPosInterv = setInterval(checkSwipable, 100);
});

});