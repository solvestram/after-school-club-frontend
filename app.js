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
            if (lesson.space > 0) {
                lesson.space -= 1;
            }
        }
    },
    computed: {
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
        }
    }
})