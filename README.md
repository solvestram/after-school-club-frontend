# CST3145 Coursework 1 (Individual part): Web App with Vue.js 

## Task
For this coursework, you need to create the front-end of a fictitious web app that
allows students and their parents to look for after school classes and activities

Requirements
- The coursework does not require any backend storage such as a (MongoDB) database.
It is optional to store data locally using local storage.
- You can use external CSS library such as Bootstrap. Make sure the library file or online
link is included in the submission.
- Any JavaScript library is not allowed if it duplicates or replaces features provided Vue.js.

## Marking criteria
Available marks - 25%

Display lessons (4%)
- [x] There should be at least 10 lessons and each lesson has 5 spaces;
- [x] Each lesson should have at least: subject, location, price, space (how many spaces are left), a Font Awesome icon, and an image.
- [x] The list of lessons must be stored as an array of JSON objects, one object for each lesson, in a separate JavaScript file, such as lessons.js;
- [x] v-for has to be used for the display of the lesson list.

Sort (4%)
- [x] User can choose to sort the lessons by one of the following attributes: subject, location, price, or availability;
- [x] There must be an option to sort in ascending or descending order, regardless of the attribute selected;

Add to cart (4%)
- [x] Each lesson must have a ’Add to Cart’ button;
- [x] The button is only enabled when space is larger than 0;
- [x] Clicking the button once will add one space to the shopping cart, reducing the remaining space by one;
- [x] Once there is no more space, i.e., space = 0, the ’Add to cart’ button should be disabled but still visible, i.e., clicking it will not further reduce ‘space’ or add a lesson to the cart.

Shopping cart (4%)
- [x] The shopping cart button should only be visible after at least one lesson is added to cart;
- [x] Clicking the shopping cart button should show the cart, and clicking the button again goes back to the lesson page;
- [x] The shopping cart should show all the lessons added;
- [x] User should be able to remove lessons from the shopping cart; the removed lesson is added back to the lesson list.

Checkout (4%)
- [x] The checkout is part of the shopping cart page;
- [x] A user must provide ‘Name’ and ‘Phone number’ before he/she can check out;
- [x] The ’Name’ must be letters only and the ’Phone’ must be numbers only; only; the check must be done using JavaScript (hint: regular expressions);
- [x] The ’checkout’ button is only visible after both valid ’name’ and ’phone’ are provided;
- [x] Clicking the ’checkout’ button should display a message confirming the order has been submitted.

Search (5%)
- [x] This is the challenge component of this coursework, and it is not expected that everyone can complete it. The solution is not covered in the lecture or lab, so you need to research it.
- [x] The goal is to add a full-text search feature, so user can search for a lesson without specifying which attribute to search on. For example, searching for ‘a’ should return all the lessons with ‘a’ in its title or location (‘price’ and ‘availability’ only have numbers so don’t apply here).
- [ ] Using existing library (2%): you can implement this feature using an existing JavaScript library (does not have to be a Vue.js library), in which case you receive maximum 2 marks.
- [x] Writing your own search function (4%): you will receive maximum 4 marks if you write your own search function, which again does not have to use Vue.js.
- [x] Search as you type (1%): in either case, you will get an additional 1 mark if the search supports ‘search as you type’, i.e., the search starts when user types the first letter (displaying all the lessons containing that letter) and the result list is filtered as more search letters are entered (similar to Google search).
