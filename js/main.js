(function () {
  "use strict";

  if (typeof jQuery !== "undefined" && jQuery.fn.fancybox) {
    jQuery("[data-fancybox]").fancybox({
      animationEffect: "zoom-in-out",
      transitionEffect: "fade",
      clickOutside: "close",
      btnTpl: {
        smallBtn:
          '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
          "</button>"
      }
    });
  }

  var form = document.getElementById("lead-form");
  var phoneInput = document.getElementById("lead-phone");

  function digitsOnly(v) {
    return String(v || "").replace(/\D/g, "");
  }

  function formatRuPhone(d) {
    if (!d) return "";
    if (d[0] === "8") d = "7" + d.slice(1);
    if (d[0] !== "7") d = "7" + d;
    d = d.slice(0, 11);
    var rest = d.slice(1);
    var out = "+7";
    if (rest.length >= 1) out += " (" + rest.slice(0, 3);
    if (rest.length >= 3) out += ")";
    if (rest.length >= 4) out += " " + rest.slice(3, 6);
    if (rest.length >= 7) out += "-" + rest.slice(6, 8);
    if (rest.length >= 9) out += "-" + rest.slice(8, 10);
    return out;
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      var d = digitsOnly(phoneInput.value);
      if (d.length && d[0] === "8") d = "7" + d.slice(1);
      phoneInput.value = formatRuPhone(d);
    });

    phoneInput.addEventListener("focus", function () {
      if (!phoneInput.value) phoneInput.value = "+7 (";
    });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = digitsOnly(phoneInput && phoneInput.value);
      if (d.length < 11) {
        if (phoneInput) {
          phoneInput.focus();
          phoneInput.style.borderColor = "#ef4444";
          setTimeout(function () {
            phoneInput.style.borderColor = "";
          }, 1200);
        }
        return;
      }
      if (typeof jQuery !== "undefined" && jQuery.fancybox) {
        jQuery.fancybox.close();
      }
      
      var successPopup = document.getElementById("success-popup");
      var successPhoneSpan = document.getElementById("success-phone");
      var successCloseBtn = document.getElementById("success-close");
      
      if (successPhoneSpan && phoneInput) {
        successPhoneSpan.textContent = phoneInput.value;
      }
      
      if (typeof jQuery !== "undefined" && jQuery.fancybox && successPopup) {
        jQuery.fancybox.open({
          src: successPopup,
          type: 'inline',
          opts: {
            animationEffect: "zoom-in-out",
            transitionEffect: "fade",
            clickOutside: "close",
            btnTpl: {
              smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
                "</button>"
            }
          }
        });
      }
      
      if (successCloseBtn) {
        var closeHandler = function() {
          if (typeof jQuery !== "undefined" && jQuery.fancybox) {
            jQuery.fancybox.close();
          }
        };
        successCloseBtn.addEventListener("click", closeHandler);
      }
      
      form.reset();
    });
  }

  if (typeof Swiper !== "undefined") {
    document.querySelectorAll(".car-card").forEach(function (card) {
      var swiperEl = card.querySelector(".car-swiper");
      var colorDots = card.querySelectorAll(".car-card__colors .dot");
      if (!swiperEl || !colorDots.length) return;

      function updateActiveDot(index) {
        colorDots.forEach(function (dot, i) {
          dot.classList.toggle("active", i === index);
        });
      }

      var carSwiper = new Swiper(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,
        grabCursor: true,
        observer: true,
        observeParents: true,
        on: {
          init: function () {
            updateActiveDot(this.activeIndex);
            this.update();
          },
          slideChange: function () {
            updateActiveDot(this.activeIndex);
          },
        },
      });

      colorDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
          carSwiper.slideTo(index);
        });
      });
    });
  }

  document.querySelectorAll('a[href="#"][data-fancybox]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    });
  });

  // Бургер-меню
  const burgerButton = document.querySelector('.burger-button');
  const burgerMenu = document.querySelector('.burger-menu');
  const burgerClose = document.querySelector('.burger-close');

  if (burgerButton && burgerMenu) {
    burgerButton.addEventListener('click', function() {
      burgerMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });

    burgerClose.addEventListener('click', function() {
      burgerMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    // Закрытие меню при клике вне контента
    burgerMenu.addEventListener('click', function(e) {
      if (e.target === burgerMenu) {
        burgerMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && burgerMenu.classList.contains('is-open')) {
        burgerMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }
})();
