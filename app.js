var app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        sortOptions: ["subject", "location", "price", "space"],
        orderOptions: ["ascending", "descending"],
        sortBy: 'subject',
        sortOrder: 'ascending',
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