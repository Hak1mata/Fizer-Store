
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dots span");

function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    document.querySelector(".slides").style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
}
function changeSlide(n) {
    showSlide(currentIndex + n);
}
function currentSlide(n) {
    showSlide(n);
}
setInterval(() => {
    changeSlide(1);
}, 5000);
showSlide(currentIndex);

function changeProductImage(btn, direction) {
    const slider = btn.parentElement;
    const images = slider.querySelectorAll("img");
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains("active"));

    images[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + direction + images.length) % images.length;
    images[activeIndex].classList.add("active");
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(btn, name, price) {
    const size = btn.parentElement.querySelector(".size").value;

    const product = { name, price, size };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Đã thêm vào giỏ!");
}

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}
function toggleCart() {
    const cartPopup = document.getElementById("cart-popup");
    if (cartPopup.style.display === "block") {
        cartPopup.style.display = "none";
    } else {
        showCart();
        cartPopup.style.display = "block";
    }
}
function showCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - Size ${item.size} - ${item.price.toLocaleString()}₫ 
        <button onclick="removeFromCart(${index})">Xóa</button>`;
        cartItems.appendChild(li);
        total += item.price;
    });

    cartTotal.innerText = total.toLocaleString();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
}
function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

updateCartCount();


