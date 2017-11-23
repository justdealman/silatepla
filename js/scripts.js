function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this);
		t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	$('input[type="checkbox"]').uniform();
	$('.range').each(function() {
		var t = $(this);
		var range = t.find('.range--ui');
		var inputFrom = t.find('.range-input-from');
		var inputTo = t.find('.range-input-to');
		var min = parseInt(t.attr('data-min'));
		var max  = parseInt(t.attr('data-max'));
		t.find('.range__line--from').text(min.toLocaleString());
		t.find('.range__line--to').text(max.toLocaleString());
		if ( t.attr('data-start') ) {
			var start = parseInt(t.attr('data-start'));
		} else {
			var start = min;
		}
		if ( t.attr('data-end') ) {
			var end = parseInt(t.attr('data-end'));
		} else {
			var end = max;
		}
		range.slider({
			range: true,
			min: min,
			max: max,
			values: [start, end],
			slide: function(event, ui) {
				inputFrom.val(ui.values[0]);
				inputTo.val(ui.values[1]);
			}
		});
		inputFrom.val(start);
		inputTo.val(end);
		inputFrom.change(function() {
			var val = $(this).val();
			if ( val < min ) {
				val = min;
			} else if ( val > range.slider('values',1) ) {
				val = range.slider('values',1);
			}
			range.slider('values',0,val);
			$(this).val(val);
		});
		inputTo.change(function() {
			var val = $(this).val();
			if ( val > max ) {
				val = max;
			} else if ( val < range.slider('values',0) ) {
				val = range.slider('values',0);
			}
			range.slider('values',1,val);
			$(this).val(val);
		});
	});
	function dataGrid() {
		$('[data-grid]').each(function() {
			var t = $(this);
			var size = t.find('.catalog__item').size();
			var inline = parseInt($(this).attr('data-grid'));
			var lines = Math.ceil(size/inline);
			t.find('.item-card__content').css({
				'height': 'auto'
			});
			if ( Modernizr.mq('(min-width:780px)') ) {
				for ( var i=0; i<lines; i++ ) {
					var max = 0;
					for ( var j=1; j<=inline; j++ ) {
						var n = i*inline+j;
						var h = t.find('.catalog__item:nth-child('+n+') .item-card__content').outerHeight();
						max = h > max ? h : max;
					}
					for ( var j=1; j<=inline; j++ ) {
						var n = i*inline+j;
						t.find('.catalog__item:nth-child('+n+') .item-card__content').css({
							'height': max
						});
					}
				}
			}
		});
	}
	function startApp() {
		setRatio();
		dataGrid();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	function filterShow() {
		$('.filter--header').addClass('is-opened');
	}
	function filterHide() {
		$('.filter--header').removeClass('is-opened');
	}
	$('.filter--header').on('click', function() {
		if ( !$(this).hasClass('is-opened') ) {
			filterShow();	
		} else {
			filterHide();	
		}
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.filter--header').length && !$(e.target).closest('.filter').length ) {
			filterHide();
		}
	});
});