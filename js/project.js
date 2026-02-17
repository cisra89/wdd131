const store = {
    taxRate: 0.06
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".addBtn");
const totalEl = document.getElementById("total");
const searchBox = document.getElementById("searchBox");


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function updateTotal() {
    const subtotal = cart.reduce((sum, item) =>
        sum + item.price * item.qty, 0);

    const total = subtotal * (1 + store.taxRate);

    totalEl.textContent = `${total.toFixed(2)}`;
}


function addItem(id, price, qty) {

    // merge if already exists (better behavior)
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id, price, qty });
    }

    saveCart();
    updateTotal();
}


// BUTTON CLICK EVENTS
buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");
        const id = card.dataset.id;
        const price = Number(card.dataset.price);
        const qty = Number(card.querySelector(".qty").value);

        if (qty > 0) {
            addItem(id, price, qty);

            // reset box after adding
            card.querySelector(".qty").value = 0;
        }
    });
});


// SEARCH FILTER
if (searchBox) {
    searchBox.addEventListener("input", () => {
        const term = searchBox.value.toLowerCase();

        document.querySelectorAll(".card").forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(term) ? "block" : "none";
        });
    });
}


// INITIAL LOAD
updateTotal();
