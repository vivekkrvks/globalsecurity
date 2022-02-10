! function(e) {
    "use strict";
    var a = e(".rt-date");
    a.length && a.datetimepicker({
        format: "Y-m-d",
        timepicker: !1
    });
    var t = e(".rt-time");

    function n() {
        e("[data-bg-image]").each(function() {
            var a = e(this).data("bg-image");
            e(this).css({
                backgroundImage: "url(" + a + ")"
            })
        })
    }

    function o() {
        var a = e(".header-height-wrap"),
            t = e(window).width(),
            n = a.parents("#wrapper").find("#header-area-space"),
            o = a.outerHeight();
        t < 992 && (o = e("body > .mean-bar").outerHeight()), n.css("margin-top", o + "px")
    }
    t.length && t.datetimepicker({
        format: "H:i",
        datepicker: !1
    }), e('[data-type="section-switch"]').on("click", function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = e(this.hash);
            if (a.length > 0) return a = a.length ? a : e("[name=" + this.hash.slice(1) + "]"), e("html,body").animate({
                scrollTop: a.offset().top
            }, 1e3), !1
        }
    }), e(window).on("scroll", function() {
        n(), e(window).scrollTop() > 150 ? e("#header_1").addClass("menu-sticky") : e("#header_1").removeClass("menu-sticky"), e(window).scrollTop() > 175 ? e("#header_2").addClass("menu-sticky") : e("#header_2").removeClass("menu-sticky"), e(window).scrollTop() > 95 ? e("#header_3").addClass("menu-sticky") : e("#header_3").removeClass("menu-sticky"), e(window).scrollTop() > 700 ? e(".scrollUp").addClass("back-top") : e(".scrollUp").removeClass("back-top")
    }), e(".loadmore").on("click", "a", function(a) {
        a.preventDefault();
        var t = e(this),
            n = parseInt(t.parent(".loadmore").data("count"), 10) || 1,
            o = t.parents(".menu-list-wrapper").find(".menu-list").find(".menu-item.hidden").slice(0, n);
        return o.length ? (o.animate({
            opacity: 0
        }), o.promise().done(function() {
            o.removeClass("hidden"), o.show().animate({
                opacity: 1
            }, 1e3)
        })) : t.text("No more item to display"), !1
    }), n(), e(window).on("scroll", function() {
        n()
    }), o();
    var i = document.getElementById("price-range-filter");
    if (i) {
        noUiSlider.create(i, {
            start: [1e4, 35e3],
            connect: !0,
            range: {
                min: 0,
                max: 1e5
            },
            format: wNumb({
                decimals: 0
            })
        });
        var s = document.getElementById("price-range-min"),
            r = document.getElementById("price-range-max");
        i.noUiSlider.on("update", function(e, a) {
            a ? r.innerHTML = "$" + e[a] : s.innerHTML = "$" + e[a]
        })
    }
    e(".multi-side-hover").each(function() {
        e(this).hoverdir({
            hoverDelay: 5
        })
    }), e("#quantity-holder, #quantity-holder2").on("click", ".quantity-plus", function() {
        var a = e(this).parents(".quantity-holder").find("input.quantity-input"),
            t = parseInt(a.val(), 10);
        e.isNumeric(t) && t > 0 ? (t += 1, a.val(t)) : a.val(t)
    }).on("click", ".quantity-minus", function() {
        var a = e(this).parents(".quantity-holder").find("input.quantity-input"),
            t = parseInt(a.val(), 10);
        e.isNumeric(t) && t >= 2 ? (t -= 1, a.val(t)) : a.val(1)
    }), e("nav#dropdown").meanmenu({
        siteLogo: "<div class='mobile-menu-nav-back'><a class='logo-mobile' href='index.html'><img src='img/logo-mobile.png' alt='logo' class='img-fluid'/></a></div>"
    }), e(".ex1").length && e(".ex1").zoom(), void 0 !== e.fn.knob && e(".knob.knob-nopercent").each(function() {
        var a = e(this),
            t = a.attr("data-rel");
        a.knob({
            draw: function() {}
        }), a.appear(function() {
            e({
                value: 0
            }).animate({
                value: t
            }, {
                duration: 2e3,
                easing: "swing",
                step: function() {
                    a.val(Math.ceil(this.value)).trigger("change")
                }
            })
        }, {
            accX: 0,
            accY: -150
        })
    });
    var l = e(".counter");
    l.length && l.counterUp({
        delay: 50,
        time: 5e3
    });
    var d = e("#accordion");
    d.on("show.bs.collapse", function(a) {
        e(a.target).prev(".panel-heading").addClass("active")
    }).on("hide.bs.collapse", function(a) {
        e(a.target).prev(".panel-heading").removeClass("active")
    }), e(".panel-heading a", d).on("click", function(a) {
        e(this).parents(".panel").children(".panel-collapse").hasClass("show") && (a.preventDefault(), a.stopPropagation())
    });
    var c = e("#contact-form");
    if (c.length && c.validator().on("submit", function(a) {
            var t = e(this),
                n = c.find(".form-response");
            if (!a.isDefaultPrevented()) return e.ajax({
                url: "vendor/php/form-process.php",
                type: "POST",
                data: c.serialize(),
                beforeSend: function() {
                    n.html("<div class='alert alert-info'><p>Loading ...</p></div>")
                },
                success: function(e) {
                    var a = JSON.parse(e);
                    if (console.log(a), a.success) t[0].reset(), n.html("<div class='alert alert-success'><p>Message has been sent successfully.</p></div>");
                    else if (a.message.length) {
                        var o = null;
                        a.message.forEach(function(e) {
                            o += "<p>" + e + "</p>"
                        }), n.html("<div class='alert alert-success'><p>" + o + "</p></div>")
                    }
                },
                error: function() {
                    n.html("<div class='alert alert-success'><p>Error !!!</p></div>")
                }
            }), !1;
            n.html("<div class='alert alert-danger'><p>Please select all required field.</p></div>")
        }), e("select.select2").length && e("select.select2").select2({
            theme: "classic",
            dropdownAutoWidth: !0,
            width: "100%"
        }), e(".parallaxie").length && e(".parallaxie").parallaxie({
            speed: .5,
            offset: 0
        }), e("#googleMap").length) {
        google.maps.event.addDomListener(window, "load", function() {
            var e = {
                    zoom: 15,
                    scrollwheel: !1,
                    center: new google.maps.LatLng(-37.81618, 144.95692),
                    styles: [{
                        stylers: [{
                            saturation: -100
                        }]
                    }]
                },
                a = new google.maps.Map(document.getElementById("googleMap"), e);
            new google.maps.Marker({
                position: a.getCenter(),
                animation: google.maps.Animation.BOUNCE,
                icon: "img/map-marker.png",
                map: a
            })
        })
    }
    e(".rc-carousel").each(function() {
        var a = e(this),
            t = a.data("loop"),
            n = a.data("items"),
            o = a.data("margin"),
            i = (a.data("stage-padding"), a.data("autoplay")),
            s = a.data("autoplay-timeout"),
            r = a.data("smart-speed"),
            l = a.data("dots"),
            d = a.data("nav"),
            c = a.data("nav-speed"),
            p = a.data("r-x-small"),
            u = a.data("r-x-small-nav"),
            h = a.data("r-x-small-dots"),
            m = a.data("r-x-medium"),
            g = a.data("r-x-medium-nav"),
            v = a.data("r-x-medium-dots"),
            f = a.data("r-small"),
            w = a.data("r-small-nav"),
            y = a.data("r-small-dots"),
            k = a.data("r-medium"),
            b = a.data("r-medium-nav"),
            x = a.data("r-medium-dots"),
            S = a.data("r-large"),
            T = a.data("r-large-nav"),
            C = a.data("r-large-dots"),
            q = a.data("r-extra-large"),
            H = a.data("r-extra-large-nav"),
            P = a.data("r-extra-large-dots"),
            D = a.data("center"),
            M = a.data("custom-nav") || "";
        a.owlCarousel({
            loop: !!t,
            items: n || 4,
            lazyLoad: !0,
            margin: o || 0,
            autoplay: !!i,
            autoplayTimeout: s || 1e3,
            smartSpeed: r || 250,
            dots: !!l,
            nav: !!d,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            navSpeed: !!c,
            center: !!D,
            responsiveClass: !0,
            responsive: {
                0: {
                    items: p || 1,
                    nav: !!u,
                    dots: !!h
                },
                576: {
                    items: m || 2,
                    nav: !!g,
                    dots: !!v
                },
                768: {
                    items: f || 3,
                    nav: !!w,
                    dots: !!y
                },
                992: {
                    items: k || 4,
                    nav: !!b,
                    dots: !!x
                },
                1200: {
                    items: S || 5,
                    nav: !!T,
                    dots: !!C
                },
                1400: {
                    items: q || 6,
                    nav: !!H,
                    dots: !!P
                }
            }
        });
        var N = a.data("owlCarousel");
        if (M) {
            d = e(M);
            var O = e(".rt-next", d),
                z = e(".rt-prev", d);
            O.on("click", function(e) {
                return e.preventDefault(), N.next(), !1
            }), z.on("click", function(e) {
                return e.preventDefault(), N.prev(), !1
            })
        }
    }), e(window).on("load", function() {
        var a;
        (a = e("#slick-carousel-wrap")).length && (a.find(".carousel-content").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            autoplay: !1,
            asNavFor: ".carousel-nav",
            prevArrow: '<span class="slick-prev slick-navigation"><i class="fa fa-angle-left" aria-hidden="true"></i></span>',
            nextArrow: '<span class="slick-next slick-navigation"><i class="fa fa-angle-right" aria-hidden="true"></i></span>'
        }), a.find(".carousel-nav").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: ".carousel-content",
            dots: !1,
            arrows: !0,
            prevArrow: !0,
            nextArrow: !0,
            centerMode: !0,
            centerPadding: "0px",
            focusOnSelect: !0,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        })), (a = e("#slick-carousel-wrap2")).length && (a.find(".carousel-content").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: !0,
            autoplay: !1,
            asNavFor: ".carousel-nav",
            prevArrow: '<span class="slick-custom-prev slick-navigation"><i class="fas fa-chevron-left"></i></span>',
            nextArrow: '<span class="slick-custom-next slick-navigation"><i class="fas fa-chevron-right"></i></span>'
        }), a.find(".carousel-nav").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: ".carousel-content",
            dots: !1,
            arrows: !0,
            prevArrow: !0,
            nextArrow: !0,
            centerMode: !0,
            centerPadding: "0px",
            focusOnSelect: !0,
            responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        })), e("#navOnePage").length && e("#navOnePage").onePageNav({
            scrollOffset: 80,
            end: function() {
                e(".meanclose").trigger("click")
            }
        });
        var t = e("#countdown");
        t.length && t.countdown("2019/08/21", function(a) {
            e(this).html(a.strftime("<div class='countdown-section'><h2>%D</h2> <h3>day%!D</h3> </div><div class='countdown-section'><h2>%H</h2> <h3>Hour%!H</h3> </div><div class='countdown-section'><h2>%M</h2> <h3>Minutes</h3> </div><div class='countdown-section'><h2>%S</h2> <h3>Second</h3> </div>"))
        });
        var n = e(".popup-youtube");
        n.length && n.magnificPopup({
            disableOn: 700,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1
        }), e(".popup-zoom-single").length && e(".popup-zoom-single").magnificPopup({
            type: "image"
        }), e(".zoom-gallery").length && e(".zoom-gallery").each(function() {
            e(this).magnificPopup({
                delegate: "a.popup-zoom",
                type: "image",
                gallery: {
                    enabled: !0
                }
            })
        });
        var o = e("#no-equal-gallery");
        if (o.length) var i = o.imagesLoaded(function() {
            i.isotope({
                itemSelector: ".no-equal-item",
                masonry: {
                    columnWidth: ".no-equal-item"
                }
            })
        });
        e("#preloader").fadeOut("slow", function() {
            e(this).remove()
        });
        var s = e(".isotope-wrap");
        if (s.length > 0 && s.find(".isotope-classes-tab").on("click", "a", function() {
                var a = e(this);
                a.parent(".isotope-classes-tab").find("a").removeClass("current"), a.addClass("current");
                var t = a.attr("data-filter");
                return e(".featuredContainer", s).isotope({
                    filter: t,
                    transitionDuration: "1s",
                    hiddenStyle: {
                        opacity: 0,
                        transform: "scale(0.001)"
                    },
                    visibleStyle: {
                        transform: "scale(1)",
                        opacity: 1
                    }
                }), !1
            }), "undefined" != typeof Chart) {
            ["bar-chart-1", "bar-chart-2"].map(function(a) {
                var t = e("#" + a);
                t.length && new Chart(document.getElementById(a), {
                    type: "bar",
                    data: {
                        labels: t.data("labels").split(","),
                        datasets: [{
                            label: "Total value",
                            backgroundColor: t.data("colors").split(","),
                            data: t.data("data").split(",")
                        }]
                    },
                    options: {
                        legend: {
                            display: !1
                        },
                        title: {
                            display: !0
                        }
                    }
                })
            })
        }
    }), e(document).on("click", "#top-search-form .search-button", function(a) {
        return a.preventDefault(), e(this).prev("input.search-input").animate({
            width: ["toggle", "swing"],
            height: ["toggle", "swing"],
            opacity: "toggle"
        }, 500, "linear"), !1
    }), (new WOW).init(), e(window).on("load resize", function() {
        var a, t, n, i, s = e(window).height();
        e("a.logo-mobile-menu").outerHeight();
        s -= 50, e(".mean-nav > ul").css("height", s + "px"), o(), t = 0, n = 0, i = e(window).width(), e(".equal-height-wrap .item-img,.equal-height-wrap .item-content").height("auto"), i > 991 && (e(".equal-height-wrap").each(function() {
            var a = e(this),
                o = a.find(".item-img").height();
            t = o > t ? o : t;
            var i = a.find(".item-content").outerHeight();
            n = i > n ? i : n
        }), a = t, a = n > t ? n : t, e(".equal-height-wrap .item-img,.equal-height-wrap .item-content").height(a + "px"))
    }), e(window).on("scroll", function() {
        var a = e("#sticker"),
            t = e("body"),
            n = a.outerHeight(),
            o = e(window).scrollTop(),
            i = e(window).width(),
            s = a.parent("#header-two"),
            r = a.parent("#header-one"),
            l = (r.find(".header-top-bar").outerHeight(), a.prev(".header-top-bar"));
        if (i > 991) {
            t.css("padding-top", "");
            var d;
            s.length ? (d = n = 1, 0) : r.length && o <= (d = l.outerHeight()) && r.hasClass("header-fixed") && r.css("top", "-" + o + "px"), o >= d ? ((r.length || s.length) && a.addClass("stick"), r.length && (r.hasClass("header-fixed") ? r.css("top", "-" + d + "px") : t.css("padding-top", n + "px"))) : (a.removeClass("stick"), r.length && t.css("padding-top", 0))
        }
    })
}(jQuery);