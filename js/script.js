new Swiper('.swiper', {

	// Стрелки для навигации между слайдами
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	// Включаем цикличность пролистывания
	loop: true,

	// Точечки для определения страницы
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},

	// Количество слайдов на экране будет определяться автоматически
	slidesPerView: 'auto',

	// Расстояние между слайдами
	spaceBetween: 85
});