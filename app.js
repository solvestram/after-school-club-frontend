var app = new Vue({
    el: '#app',
    data: {
        sitename: 'After School Club',
        apiUrl: 'https://cst3145-after-school-club.herokuapp.com',

        // sorting properties
        sortOptions: ["subject", "location", "price", "space"],
        orderOptions: ["ascending", "descending"],
        sortBy: 'subject',
        sortOrder: 'ascending',

        // search
        searchInput: "",

        // shopping cart properties
        cartItems: [],
        showCart: false,
        checkoutName: "",
        checkoutPhone: "",

        // true when checkout button is used
        orderConfirmed: false,

        lessons: [],
    },
    methods: {
        // loads all lessons
        loadAllLessons(){
            fetch(this.apiUrl + "/collections/lessons").then(response => response.json()).then(
                data => {
                    this.lessons = data;
                });
        },

        // switches to the cart page
        switchToCart() {
            this.showCart = true;
        },

        // switches to the main page
        switchToMain() {
            this.showCart = false;

            if (this.orderConfirmed) {
                this.cartItems = [];
                this.orderConfirmed = false;
            }
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
            if (this.cartItems.length <= 0) {
                this.showCart = false;
            }
        },

        // check out order
        checkout() {
            // sending order to API (separate request for each lesson in the cart)
            // a lot of things here could be done better
            let postRequestSuccess, putRequestSuccess;
            this.cartItems.forEach(lesson => {
                let order = {
                    "name": this.checkoutName,
                    "phone_number": this.checkoutPhone,
                    "lesson_id": lesson._id,
                    "space": 1,
                }

                // POST new order
                fetch(this.apiUrl + "/collections/orders", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order)
                }).then(response => response.json()).then(response => {
                    console.log('Success: ', response.json);
                });

                // Update space
                let updatedSpace = {
                    space: lesson.space
                }
                fetch(this.apiUrl + "/collections/lessons/" + lesson._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSpace)
                }).then(response => response.json()).then(response => {
                    console.log('Success: ', response.json);
                });
            });

            // Reset checkout input fields
            this.checkoutName = "";
            this.checkoutPhone = "";

            // Show confirmation message
            this.orderConfirmed = true;
        },

        // Resets database to default
        resetDatabase() {
            fetch(this.apiUrl + "/collections", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"reset": true})
            }).then(response => {
                console.log("The database was reset");

                // Reload lessons data
                this.loadAllLessons();

                // Reset cart
                this.cartItems = [];
            });
        }
    },
    computed: {
        // for sorting items on the main page
        sortedLessons() {
            let sorted;

            // sorting
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

            // reversing for descending order
            if (this.sortOrder === 'descending') {
                sorted = sorted.reverse();
            }

            if (this.searchInput === "") {
                return sorted;
            } else {
                // search
                let sortedWithSearch = sorted.filter(
                    (lesson) => {
                        let includesSubject = lesson.subject.toLowerCase().includes(this.searchInput.toLowerCase())
                        let includesLocation = lesson.location.toLowerCase().includes(this.searchInput.toLowerCase())
                        return includesSubject || includesLocation;
                    });

                return sortedWithSearch;
            }
        },

        isCartDisabled() {
            return this.cartItems.length <= 0;
        },

        cartItemsCount() {
            return this.cartItems.length;
        },

        // checks whether the checkout button should be enabled
        checkoutEnabled() {
            // check if any of the fields is empty
            if (this.checkoutName === "" || this.checkoutPhone === "") {
                return false;
            }

            // check if checkoutName is only letters
            if (/[^a-z]/i.test(this.checkoutName)) {
                return false;
            }

            // check if checkoutPhone is only number
            if (!/^\d+$/.test(this.checkoutPhone)) {
                return false;
            }

            return true
        }
    },

    created() {
        // Called when Vue instance is created
        this.loadAllLessons();
    },
})