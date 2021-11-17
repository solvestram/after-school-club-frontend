var app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',

        // shopping cart properties
        cartItems: [],
        showCart: false,

        // sorting properties
        sortOptions: ["subject", "location", "price", "space"],
        orderOptions: ["ascending", "descending"],
        sortBy: 'subject',
        sortOrder: 'ascending',


        lessons: lessons,
    },
    methods: {
        // switches to the cart page
        switchToCart() {
            this.showCart = true;
        },

        // switches to the main page
        switchToMain() {
            this.showCart = false;
        },

        addToCart(lesson) {
            this.cartItems.push(lesson);

            if (lesson.space > 0) {
                lesson.space -= 1;
            }
        },

        removeFromCart(lesson) {
            let index = this.cartItems.indexOf(lesson);

            if (index > -1) {
                this.cartItems.splice(index, 1);
            }

            lesson.space += 1;

            // Disable shopping cart if it is empty
            if (this.cartItems.length <= 0){
                this.showCart = false;
            }
        },
    },
    computed: {
        // for sorting items on the main page
        sortedLessons() {
            let sorted;

            if (this.sortBy === 'subject') {
                sorted = this.lessons.sort(
                    (a, b) => {
                        if (a.subject > b.subject) return 1;
                        if (a.subject < b.subject) return -1;
                        return 0;
                    }
                );
            } else if (this.sortBy === 'location') {
                sorted = this.lessons.sort(
                    (a, b) => {
                        if (a.location > b.location) return 1;
                        if (a.location < b.location) return -1;
                        return 0;
                    }
                );
            } else if (this.sortBy === 'price') {
                sorted = this.lessons.sort(
                    (a, b) => {
                        if (a.price > b.price) return 1;
                        if (a.price < b.price) return -1;
                        return 0;
                    }
                );
            } else if (this.sortBy === 'space') {
                sorted = this.lessons.sort(
                    (a, b) => {
                        if (a.space > b.space) return 1;
                        if (a.space < b.space) return -1;
                        return 0;
                    }
                );
            }

            if (this.sortOrder === 'descending') {
                sorted = sorted.reverse();
            }

            return sorted;
        },

        isCartDisabled() {
            return this.cartItems.length <= 0;
        },

        cartItemsCount() {
            return this.cartItems.length;
        }
    }
})