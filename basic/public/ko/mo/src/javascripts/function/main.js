function main() {
    var $sec07 = $('#section07'),
        $storyWrap = $sec07.find('#story'),
        $storyMarqueeWrap = $storyWrap.find('.marquee_wrap'),
        $storyMarqueeUnit = $storyMarqueeWrap.find('ul'),
        $storyMarqueeItem = $storyMarqueeUnit.find('li');

    // story rotate
    var $rotateValueArr = [
        4, -5, 2, -3, 4, 1, 3, -5, 5, 5,
        4, -5, 2, -3, 4, 1, 3, -5, 5, 5
    ];
    $storyMarqueeItem.each(function (idx){
        gsap.to($(this), {
            rotate: -$rotateValueArr[idx],
            repeat: -1,
            yoyo: true,
            duration: 15,
            ease: "linear"
        })
    });

    // principles text effect
    var $principles = $('#principles'),
        $principlesSloganWrap = $principles.find('.text_effect_wrap'),
        $principlesSlogan = $principlesSloganWrap.find('.dimmed_text'),
        $principlesLine = $principles.find('.dimmed_line'),
        $principlesTextWrap = $principles.find('.text_wrap'),
        $principlesText01 = $principlesTextWrap.find('div:nth-of-type(1) .dimmed_text'),
        $principlesText02 = $principlesTextWrap.find('div:nth-of-type(2) .dimmed_text'),
        $principlesText03 = $principlesTextWrap.find('div:nth-of-type(3) .dimmed_text'),
        $principlesText04 = $principlesTextWrap.find('div:nth-of-type(4) .dimmed_text'),
        $principlesText05 = $principlesTextWrap.find('div:nth-of-type(5) .dimmed_text');

    ScrollTrigger.normalizeScroll(true);
    var principlesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: $principles,
            start: 'top 65%',
            end: 'bottom center',
            // markers: true,
            scrub: .4,
            anticipatePin: true
        }
    });

    function principlesEvents(){
        var principlesTimelineAdd = gsap.timeline();
        principlesTimelineAdd
            .to($principlesSlogan, .2, { width:'100%' })
            .to($principlesLine, .2, { width:'100%' }, '-=.15')
            .to($principlesText01, .2, { width:'100%' }, '-=.12')
            .to($principlesText02, .2, { width:'100%' }, '-=.11')
            .to($principlesText03, .2, { width:'100%' }, '-=.11')
            .to($principlesText04, .2, { width:'100%' }, '-=.11')
            .to($principlesText05, .2, { width:'100%' }, '-=.11')
        return principlesTimelineAdd;
    }
    principlesTimeline.add(principlesEvents());

    // effect text effect
    var $effect = $('#effect'),
        $effectList = $effect.find('.effect_list'),
        $effectText01 = $effect.find('dl:nth-of-type(1) .dimmed_text'),
        $effectText02 = $effect.find('dl:nth-of-type(2) .dimmed_text'),
        $effectText03 = $effect.find('dl:nth-of-type(3) .dimmed_text'),
        $effectText04 = $effect.find('dl:nth-of-type(4) .dimmed_text'),
        $effectText05 = $effect.find('dl:nth-of-type(5) .dimmed_text'),
        $effectText06 = $effect.find('dl:nth-of-type(6) .dimmed_text');

    var effectTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: $effectList,
            start: 'top 70%',
            end: 'bottom 75%',
            // markers: true,
            scrub: .4
        }
    });
    function effectEvents(){
        var effectTimelineAdd = gsap.timeline();
        effectTimelineAdd
            .to($effectText01, .2, { width:'100%' })
            .to($effectText02, .2, { width:'100%' }, '-=.15')
            .to($effectText03, .2, { width:'100%' }, '-=.11')
            .to($effectText04, .2, { width:'100%' }, '-=.15')
            .to($effectText05, .2, { width:'100%' }, '-=.11')
            .to($effectText06, .2, { width:'100%' }, '-=.15')
        return effectTimelineAdd;
    }
    effectTimeline.add(effectEvents());

    // warehouse list
    var $warehouseListSlide = new Swiper('.warehouse_list', {
        slidesPerView: 'auto',
        spaceBetween: vw(30),
        scrollbar: {
            el: '.warehouse_list_scroll',
            dragSize: vw(200)
        }
    });

    // activist list
    var $activistListSlide = new Swiper('.activist_list_wrap', {
        slidesPerView: 'auto',
        spaceBetween: vw(40)
    });

    // campaign list
    var $campaignListSlide = new Swiper('.campaign_wrap', {
        slidesPerView: 'auto',
        spaceBetween: vw(20),
        scrollbar: {
            el: '.campaign_wrap_scroll',
            dragSize: vw(200)
        }
    });

    // px to vw
    function vw(size){
        return size / (750 * .01) * (winW / 100);
    }

    // resize
    $window.on('resize', function (){
        // warehouse list
        $warehouseListSlide = new Swiper('.warehouse_list', {
            slidesPerView: 'auto',
            spaceBetween: vw(30),
            scrollbar: {
                el: '.warehouse_list_scroll',
                dragSize: vw(200)
            }
        });

        // activist list
        $activistListSlide = new Swiper('.activist_list_wrap', {
            slidesPerView: 'auto',
            spaceBetween: vw(40)
        });

        // campaign list
        $campaignListSlide = new Swiper('.campaign_wrap', {
            slidesPerView: 'auto',
            spaceBetween: vw(20),
            scrollbar: {
                el: '.campaign_wrap_scroll',
                dragSize: vw(200)
            }
        });
    });
}