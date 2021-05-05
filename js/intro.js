const tl = gsap.timeline({defaults: {ease: "power1.out"}});

tl.to('.text', { y: "0%", duration: 2, stagger: 0.7 });
tl.to('.slider', { y: "-100%", duration: 1.5, delay: 1 });
tl.to('.intro', { y:"-100%", duration: 1}, "-=1");
tl.fromTo('.nav-intro', {opacity: 0}, {opacity: 1, duration: 0.5});
tl.fromTo('.entrar', {opacity: 0}, {opacity: 1, duration: 0.5}, "-=0.5");

$(".entrar").click(function() {
    const tl = gsap.timeline({defaults: {ease: "power1.out"}});
    tl.to('.hide-app', { y: "-0%", duration: 1 });
    tl.fromTo('.nav-intro', {opacity: 1}, {opacity: 0, duration: 0.1},  "-=0.8");
    tl.fromTo('.entrar', {opacity: 1}, {opacity: 0, duration: 0.1}, "-=1");
});