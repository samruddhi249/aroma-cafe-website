
// Dishes by category
const DISHES = {
    fastfood: [
        { name: 'Pizza', price: 250, img: 'images/pizza.png' },
        { name: 'Pasta', price: 200, img: 'images/pasta.png' },
        { name: 'Burger', price: 150, img: 'images/burger.png' },
        { name: 'French Fries', price: 100, img: 'images/frenchfries.png' },
        { name: 'Momos', price: 120, img: 'images/momos.png' },
        { name: 'Garlic Bread', price: 90, img: 'images/garlicbread2.png'},
        { name: 'Veg Frankie', price: 120, img: 'images/frankie.png'},
        { name: 'Nuggets', price:120, img: 'images/nuggets2.png'}
    ],
    dessert: [
        { name: 'Ice Cream', price: 80, img: 'images/icecream.png' },
        { name: 'Brownie', price: 90, img: 'images/brownie.png' },
        { name: 'Pastry', price: 70, img: 'images/pastry.png' },
        { name: 'Donut', price: 50, img: 'images/donuts.png' },
        { name: 'Cheesecake', price: 50, img: 'images/cheesecake.png'},
        { name: 'Croissants', price: 50, img: 'images/croissants.png'},
        {name: 'Waffles', price:70, img: 'images/waffle.png'}
    ],
    beverages: [
        { name: 'Coffee', price: 50, img: 'images/coffee.png' },
        { name: 'Cold Coffee', price: 80, img: 'images/coldcoffee.png' },
        { name: 'Hot Chocolate', price: 100, img: 'images/hotchoco.png' },
        { name: 'Matcha Latte', price: 90, img: 'images/matcha.png' },
        { name: 'Mango Milkshake', price: 40, img: 'images/mangomilkshake.png' },
        { name: 'Chocolate Milkshake', price: 100, img: 'images/chocolatemilkshake.png' },
        { name: 'Strawberry Milkshake', price: 100, img: 'images/strawberrymilkshake.png' },
        { name: 'Mojito', price: 70, img: 'images/mojito.png' },
        { name: 'Juice', price: 70, img: 'images/juice.png' },

    ]
};

let cart = [];
let currentCategory = null;

// DOM Elements
const categorySelect = document.getElementById('category-select');
const orderForm = document.getElementById('orderForm');
const dishesList = document.getElementById('dishes-list');
const categoryTitle = document.getElementById('category-title');
const grandTotalDiv = document.getElementById('grand-total');
const backToCategoryBtn = document.getElementById('back-to-category');


if(categorySelect && orderForm){
    // Show dishes when category clicked
    categorySelect.querySelectorAll('.menu-category-card').forEach(card => {
        card.addEventListener('click', function() {
            currentCategory = this.getAttribute('data-category');
            showDishes(currentCategory);
        });
    });

    function showDishes(category){
        categorySelect.style.display = 'none';
        orderForm.style.display = 'block';
        categoryTitle.textContent = {
            fastfood: 'Fast Food',
            dessert: 'Dessert',
            beverages: 'Beverages'
        }[category] + ' Menu';

        dishesList.innerHTML = DISHES[category].map(dish => `
            <div class="order-dish-card">
                <img src="${dish.img}" alt="${dish.name}">
                <h3>${dish.name}</h3>
                <p>${dish.price}rs.</p>
                <label>Qty: <input type="number" min="1" value="1" class="qty-input"></label>
                <button type="button" class="add-to-cart-btn" data-dish="${dish.name}" data-price="${dish.price}">Add to Cart</button>
            </div>
        `).join('');

        // Add cart listeners
        dishesList.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const dish = this.getAttribute('data-dish');
                const price = parseInt(this.getAttribute('data-price'));
                const qty = parseInt(this.parentElement.querySelector('.qty-input').value);
                const existing = cart.find(item => item.dish === dish);
                if(existing){
                    existing.qty += qty;
                } else {
                    cart.push({ dish, price, qty });
                }
                renderCart();
            });
        });

        renderCart();
    }

    // Back to categories
    backToCategoryBtn.addEventListener('click', function(){
        orderForm.style.display = 'none';
        categorySelect.style.display = 'grid';
        dishesList.innerHTML = '';
        categoryTitle.textContent = '';
        renderCart(); 
    });

    // Render Cart
    function renderCart(){
        const cartDiv = document.getElementById('cart');
        if(cart.length === 0){
            cartDiv.innerHTML = '<em>No items in cart.</em>';
            grandTotalDiv.textContent = '';
            return;
        }

        let total = 0;
        cartDiv.innerHTML = '<ul>' + cart.map(item => {
            total += item.price * item.qty;
            return `<li>${item.dish} x ${item.qty} = <b>${item.price * item.qty}rs.</b> 
                    <button type="button" onclick="removeFromCart('${item.dish}')">Remove</button></li>`;
        }).join('') + '</ul>';

        grandTotalDiv.textContent = 'Grand Total: ' + total + 'rs.';
    }

    window.removeFromCart = function(dish){
        cart = cart.filter(item => item.dish !== dish);
        renderCart();
    }

    // Order form submit
    orderForm.addEventListener('submit', function(e){
        e.preventDefault();
        if(cart.length === 0){
            alert("Please add at least one dish to your cart.");
            return;
        }
        alert("Order placed successfully!");
        cart = [];
        renderCart();
    });
}

// TABLE BOOKING 

const tableForm = document.querySelector("#tableBookingForm form"); 
if(tableForm){
    tableForm.addEventListener("submit", function(e){
        e.preventDefault(); 
        alert("Table booked successfully!");
    });
}

//  SCROLL ANIMATION 
window.addEventListener('scroll', () => {
    document.querySelectorAll("section").forEach(section => {
        let top = window.scrollY;
        let offset = section.offsetTop - 150;
        let height = section.offsetHeight;
        if(top >= offset && top < offset + height){
            section.classList.add("active");
        }
    });
});
