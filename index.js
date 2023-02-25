"use strict";

let wow = new WOW({
    boxClass:     'wow',
    animateClass: 'animate__animated',
    offset:       200,
    mobile:       true,
    live:         true
})
wow.init();

//Маска телефонного номера
$(function () {
    $('[data-phone-pattern]').on('input blur focus', (e) => {
        let el = e.target,
            clearVal = $(el).data('phoneClear'),
            pattern = $(el).data('phonePattern'),
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = $(el).val().replace(/\D/g, "");
        if (clearVal !== 'false' && e.type === 'blur') {
            if (val.length < matrix.match(/([\_\d])/g).length) {
                $(el).val('');
                return;
            }
        }
        if (def.length >= val.length) val = def;
        $(el).val(matrix.replace(/./g, function (a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        }));
    });
});

// Карусель блока меню
$(document).ready(function(){
    const owl=$(".owl-carousel-menu-0");
    owl.owlCarousel({
        items: 4,
        margin: 10,
        dotsContainer: '#carousel-custom-dots',
        itemsDesktop : true,
        itemsDesktopSmall : true,
        itemsTablet: true,
        itemsMobile : true
        // nav:false,
        // dots: false
    });
    $('.owl-dot').click(function () {
        owl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });
    $(".next").click(function(){
        owl.trigger("next.owl.carousel");
    });
    $(".prev").click(function(){
        owl.trigger("prev.owl.carousel");
    });


});

$(document).ready(function(){
    const cowl=$(".owl-carousel-menu-1");
    cowl.owlCarousel({
        items: 2,
        margin: 5,
        dotsContainer: '#carousel-custom-dots-1',
        itemsDesktop : true,
        itemsDesktopSmall : true,
        itemsTablet: true,
        itemsMobile : true
        // nav:false,
        // dots: false
    });
    $('.owl-dot').click(function () {
        cowl.trigger('to.owl.carousel', [$(this).index(), 300]);
    });
    $(".next").click(function(){
        cowl.trigger("next.owl.carousel");
    });
    $(".prev").click(function(){
        cowl.trigger("prev.owl.carousel");
    });
});

// Карусель блока отзывов
$(document).ready(function(){
    const owl=$(".owl-carousel-reviews-0");
    owl.owlCarousel({
        items:3,
        margin: 10,
        itemsDesktop : true,
        itemsDesktopSmall : true,
        itemsTablet: true,
        itemsMobile : true,
        // nav:false,
        // dots: false
    });
    $(".right").click(function(){
        owl.trigger("next.owl.carousel");
    });
    $(".left").click(function(){
        owl.trigger("prev.owl.carousel");
    });
});

$(document).ready(function(){
    const owl=$(".owl-carousel-reviews-1");
    owl.owlCarousel({
        items: 2,
        margin: 10,
        itemsDesktop : true,
        itemsDesktopSmall : true,
        itemsTablet: true,
        itemsMobile : true
        // nav:false,
        // dots: false
    });
    $(".right").click(function(){
        owl.trigger("next.owl.carousel");
    });
    $(".left").click(function(){
        owl.trigger("prev.owl.carousel");
    });
});
$(document).ready(function(){
    const owl=$(".owl-carousel-reviews-2");
    owl.owlCarousel({
        items: 1,
        margin: 10,
        itemsDesktop : true,
        itemsDesktopSmall : true,
        itemsTablet: true,
        itemsMobile : true,
        // nav:false,
        // dots: false
    });
    $(".right").click(function(){
        owl.trigger("next.owl.carousel");
    });
    $(".left").click(function(){
        owl.trigger("prev.owl.carousel");
    });
});


// Меню бургер - адаптив
document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}
document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
});


// Таймер блок заказа
const ft = new FancyTimer(
    document.getElementById('timer'),
    {
        value: 1800,
        warn: {
            secondsLeft: 60
        }
    }
);

ft.start(-1);


// Валидация формы
$('#submit').click(function () {
    let name = $('#name');
    let phone = $('#phone');
    let hasError = false;

    $('.error-input').hide();
    $('.lab_input').css('border-color', 'rgb(253, 177, 91)')

    if (!name.val()) {
        name.next().show();
        name.css('border-color', 'red')
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('border-color', 'red')
        hasError = true;
    }

    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: { name: name.val(), phone: phone.val() }
        })
            .done(function( msg ) {
                console.log(msg)
                if (msg.success === 1) {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    name.val('');
                    phone.val('');
                } else {
                    $('.order__success').show()
                    name.val('');
                    phone.val('');
                }
            });
    }
})

//Скрытие модального окна
$('.order__success-close').click(function () {
    $('.order__success').hide()
});

// Плавная прокрутка якоря
$(".menu__list-item-href").on("click", function(e){
    e.preventDefault();
    let anchor = $(this).attr('href');
    $('html, body').stop().animate({
        scrollTop: $(anchor).offset().top - 60
    }, 800);
});
