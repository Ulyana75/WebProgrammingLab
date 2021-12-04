new Swiper('.swiper', {

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	loop: true,

	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	slidesPerView: 'auto',

	spaceBetween: 85
});