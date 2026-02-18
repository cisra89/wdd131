const store = {
    taxRate: 0.06
};

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".addBtn");
    const subtotalEl = document.getElementById("subtotal");
    const taxEl = document.getElementById("tax");
    const totalEl = document.getElementById("total");
    const cartListEl = document.getElementById("cartList");
    const searchBox = document.getElementById("searchBox");


    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }


    function renderCart() {

        if (!cartListEl) return;

        if (cartArray.length === 0) {
            cartListEl.innerHTML = "<p>No items added yet.</p>";
            return;
        }

        cartListEl.innerHTML = cartArray.map((item, index) => {

            const lineTotal = item.qty * item.price;

            return `
            <div class="cartRow">
                <span>${item.id}</span>
                <span>${item.qty} × $${item.price.toFixed(2)}</span>
                <span>$${lineTotal.toFixed(2)}</span>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
            `;
        }).join("");
    }


    function updateTotal() {

        const subtotal = cartArray.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );

        const tax = subtotal * store.taxRate;
        const total = subtotal + tax;

        const taxEl = document.getElementById("tax");
        const cartTotalEl = document.getElementById("cartTotal");
        const quoteTotalEl = document.getElementById("quoteTotal");

        if (taxEl) taxEl.textContent = tax.toFixed(2);
        if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
        if (quoteTotalEl) quoteTotalEl.textContent = total.toFixed(2);

        renderCart();
    }



    function addItem(id, price, qty) {

        const existing = cartArray.find(i => i.id === id);

        if (existing) {
            existing.qty += qty;
        } else {
            cartArray.push({ id, price, qty });
        }

        saveCart();   // required line inside
        updateTotal();
    }


    window.removeItem = function(index) {
        cartArray.splice(index, 1);
        saveCart();
        updateTotal();
    }


    buttons.forEach(btn => {
        btn.addEventListener("click", () => {

            const card = btn.closest(".card");
            const id = card.dataset.id;
            const price = Number(card.dataset.price);
            const qtyInput = card.querySelector(".qty");
            const qty = Number(qtyInput.value);

            if (qty > 0) {
                addItem(id, price, qty);
                qtyInput.value = 0;
            }
        });
    });


    if (searchBox) {
        searchBox.addEventListener("input", () => {

            const term = searchBox.value.toLowerCase();

            document.querySelectorAll(".card").forEach(card => {
                const name = card.querySelector("h3").textContent.toLowerCase();
                card.style.display =
                    name.includes(term) ? "block" : "none";
            });
        });
    }


    updateTotal();

});
