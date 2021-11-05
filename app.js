var app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        lessons: lessons,
    },
    methods: {
        addToCart(lesson) {
            if (lesson.quantity > 0) {
                lesson.quantity -= 1;
            }
        }
    },
})