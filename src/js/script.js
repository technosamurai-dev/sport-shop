$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/left-slide.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/right-slide.png"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut()
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    /* Validation */
    function validateForms(form) {
        $( form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: {
                    required: true,
                    minlength: 10
                  },
                email: {
                    required: true,
                    email: true
                    }
                },
                messages: {
                    name: {
                        required: "* Пожалуйста введите своё имя",
                        minlength: jQuery.validator.format("Минимум {0} символа!")
                      },
                    phone: {
                        required: "* Пожалуйста введите номер телефона",
                        minlength: jQuery.validator.format("Минимум {0} символов!")
                      },
                    email: {
                      required: "* Пожалуйста, введите свою почту",
                      email: "* Неправильный формат почты"
                    }
                }
            
        });
    };

    validateForms('#consultation-form');
    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('.feed-form');

    /* phone mask */
    $('input[name=phone]').mask("+38 (999) 999-9999");

    /* Mailer front part */
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scrool and pageup
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
  });