const products = [
  { id: "p100", name: "Pantech Speaker X1" },
  { id: "p200", name: "Pantech Headphones Pro" },
  { id: "p300", name: "Pantech Smart Display" },
  { id: "p400", name: "Pantech Soundbar Max" }
];

const select = document.querySelector("#product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  select.appendChild(option);
});
