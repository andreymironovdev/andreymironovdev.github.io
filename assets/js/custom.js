(function($) {
  "use strict";

  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    pagination: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      }
    }
  });

  // Mobile menu dropdown
  $(".submenu").on("click", function() {
    var width = $(window).width();
    if (width < 992) {
      $(".submenu ul").toggleClass("active");
    }
  });

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function() {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }

  // Menu elevator animation
  $("a[href*=\\#]:not([href=\\#])").on("click", function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $(".menu-trigger").removeClass("active");
          $(".header-area .nav").slideUp(200);
        }
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 80
          },
          700
        );
        return false;
      }
    }
  });

  $(document).ready(function() {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('a[href^="#"]').on("click", function(e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function() {
        console.log($(this));
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 79
          },
          500,
          "swing",
          function() {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $(".nav a:not(.download)").each(function() {
      var currLink = $(this);

      try {
        var refElement = $(`#${currLink.attr("href").split('#')[1]}`);
        var headerHeight = $("header").height();
        var magicNumber = 10;
        if (
          refElement.position().top <= scrollPos + headerHeight + magicNumber &&
          refElement.position().top + refElement.height() - headerHeight - magicNumber > scrollPos + headerHeight + magicNumber
        ) {
          $(".nav ul li a").removeClass("active");
          currLink.addClass("active");
        } else {
          currLink.removeClass("active");
        }
      } catch (e) {
        console.log(e);
        // Ignore href='javascript:;'
      }
    });
  }

  // Home seperator
  if ($(".home-seperator").length) {
    $(".home-seperator .left-item, .home-seperator .right-item").imgfix();
  }

  // Home number counterup
  if ($(".count-item").length) {
    $(".count-item strong").counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Page loading animation
  $(window).on("load", function() {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1"
      });
    }

    $("#preloader").animate(
      {
        opacity: "0"
      },
      600,
      function() {
        setTimeout(function() {
          $("#preloader")
            .css("visibility", "hidden")
            .fadeOut();
        }, 300);
      }
    );
  });
})(window.jQuery);
