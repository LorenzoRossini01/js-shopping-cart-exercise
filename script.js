// definizione array dei prodotti
const products = [
  {
    img: "https://add-to-cart-javascript.vercel.app/img/men-1.jpg",
    title: "Oxford Shirts",
    price: "12.00",
    rating: "4.9",
    category: "man-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/women-1.jpg",
    title: "Tunic",
    price: "45.9",
    rating: "4.4",
    category: "woman-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/watch-1.jpg",
    title: "Huawei Watch Buds",
    price: "40.59",
    rating: "4.4",
    category: "watch-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/men-2.jpg",
    title: "Short-Sleeve Shirt",
    price: "80.0",
    rating: "4.9",
    category: "man-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/women-2.jpg",
    title: "Culotte dress",
    price: "24.59",
    rating: "4.4",
    category: "woman-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/watch-2.jpg",
    title: "Fire Boltt Dazzle",
    price: "19.99",
    rating: "4.4",
    category: "watch-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/men-3.jpg",
    title: "Cuban Collar Shirt",
    price: "49.9",
    rating: "4.9",
    category: "man-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/women-3.jpg",
    title: "Babydoll",
    price: "11.59",
    rating: "4.0",
    category: "woman-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/watch-3.jpg",
    title: "Google Pixel",
    price: "20.59",
    rating: "4.4",
    category: "watch-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/men-4.jpg",
    title: "T-shirt",
    price: "70.0",
    rating: "3.9",
    category: "man-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/women-4.jpg",
    title: "Wrap around",
    price: "40.59",
    rating: "4.4",
    category: "woman-products",
  },
  {
    img: "https://add-to-cart-javascript.vercel.app/img/watch-4.jpg",
    title: "titan Power",
    price: "45.9",
    rating: "4.4",
    category: "watch-products",
  },
];

// modulo per la gestione del carrello degli acquisti
let shoppingCart = (function () {
  // variabile per memorizzare gli elementi del carrello
  cart = [];

  //   costruttore per rappresentare un elemento del carrello
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Funzione per salvare il carrello nell'archiviazione locale
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Funzione per caricare il carrello dall'archiviazione locale
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }

  // Controllo se il carrello è già stato salvato nell'archiviazione locale
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  let obj = {};

  // Funzione per aggiungere un elemento al carrello
  obj.addItemToCart = function (name, price, count) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Funzione per impostare la quantità di un elemento nel carrello
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Funzione per rimuovere un elemento dal carrello
  obj.removeItemFromCart = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  };

  // Funzione per rimuovere tutti gli elementi di un tipo dal carrello
  obj.removeItemFromCartAll = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Funzione per svuotare completamente il carrello

  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Funzione per calcolare il numero totale di elementi nel carrello
  obj.totalCount = function () {
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Funzione per calcolare il totale del carrello
  obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // Funzione per ottenere una copia del carrello
  obj.listCart = function () {
    let cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy);
    }
    return cartCopy;
  };
  return obj;
})();

// Selezione degli elementi HTML
let AllList = document.querySelector("#all-list");
let ManList = document.querySelector("#man-products");
let WomanList = document.querySelector("#woman-products");
let WatchList = document.querySelector("#watch-products");

// Filtraggio dei prodotti per categoria
let maleProduct = products.filter(
  (product) => product.category === "man-products"
);
let femaleProduct = products.filter(
  (product) => product.category === "woman-products"
);
let watchProduct = products.filter(
  (product) => product.category === "watch-products"
);

// Funzione per generare le card dei prodotti
function generateProductCard(array, where) {
  array.forEach((product) => {
    where.innerHTML += `
                            <div class="col-lg-3 col-md-6">
                          <div class="featured-item">
                            <div class="featured-item-img">
                              <a href="#">
                                <img
                                  src="${product.img}"
                                  alt="Images"
                                />
                              </a>
                            </div>
                            <div class="content">
                              <h3><a href="#">${product.title}</a></h3>
                              <hr />
                              <div class="content-in">
                                <h4>€ ${product.price}</h4>
                                <span>(${product.rating})<i class="fa fa-star"></i></span>
                              </div>
                              <hr />
                              <div class="featured-content-list">
                                <button
                                  type="button"
                                  data-name="${product.title}"
                                  data-price="${product.price}"
                                  class="default-btn border-radius-5"
                                >
                                  Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
        `;
  });
}

// Generazione delle card dei prodotti
generateProductCard(products, AllList);
generateProductCard(maleProduct, ManList);
generateProductCard(femaleProduct, WomanList);
generateProductCard(watchProduct, WatchList);

// Gestione dell'evento click per aggiungere un elemento al carrello
$(".default-btn").click(function (event) {
  //   alert("working");
  event.preventDefault();
  let name = $(this).data("name");
  let price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Gestione dell'evento click per svuotare il carrello
$("#clearCartButton").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

// Funzione per visualizzare il contenuto del carrello
function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  for (let i in cartArray) {
    output +=
      "<tr>" +
      "<td>" +
      cartArray[i].name +
      "</td>" +
      "<td>(" +
      cartArray[i].price +
      ")</td>" +
      "<td><div class='input-group'>" +
      "<input type='number' class='item-count form-control' data-name='" +
      cartArray[i].name +
      "' value='" +
      cartArray[i].count +
      "'>" +
      "</div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" +
      cartArray[i].name +
      ">X</button></td>" +
      " = " +
      "<td>" +
      cartArray[i].total +
      "</td>" +
      "</tr>";
  }
  $(".show-cart").html(output);
  $(".total-cart").html(shoppingCart.totalCart());
  $(".total-count").html(shoppingCart.totalCount());
}

// Gestione dell'evento click per rimuovere un elemento dal carrello
$(".show-cart").on("click", ".delete-item", function (event) {
  let name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// Gestione dell'evento change per modificare la quantità di un elemento nel carrello
$(".show-cart").on("change", ".item-count", function (event) {
  let name = $(this).data("name");
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

// Visualizzazione iniziale del carrello
displayCart();

// Aggiunge la classe 'active' al primo elemento della lista delle tab e la classe 'current' al suo primo elemento figlio
$(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current");

// Gestisce l'evento click sui link delle tab
$(".tab ul.tabs li a").on("click", function (g) {
  // Ricerca l'elemento .tab più vicino al link cliccato e ottiene l'indice della tab attiva
  let tab = $(this).closest(".tab"),
    index = $(this).closest("li").index();

  // Rimuove la classe 'current' da tutte le tab e la aggiunge solo a quella cliccata
  tab.find("ul.tabs > li").removeClass("current");
  $(this).closest("li").addClass("current");

  // Nasconde tutti i contenuti delle tab tranne quello corrispondente alla tab cliccata
  tab
    .find(".tab_content")
    .find("div.tabs_item")
    .not("div.tabs_item:eq(" + index + ")")
    .slideUp();

  // Evita l'azione predefinita del click sul link
  tab
    .find(".tab_content")
    .find("div.tabs_item:eq(" + index + ")")
    .slideDown();
  g.preventDefault();
});

// Funzione di ricerca
$("#search_field").on("keyup", function () {
  // Ottiene il valore inserito nell'input di ricerca
  let value = $(this).val();

  // Crea un'espressione regolare per effettuare la ricerca ignorando la distinzione tra maiuscole e minuscole
  let patt = new RegExp(value, "i");

  // Variabile per tenere traccia se sono stati trovati corrispondenze
  let found = false;

  // Itera su tutti gli elementi con la classe .col-lg-3 all'interno delle tab_content
  $(".tab_content")
    .find(".col-lg-3")
    .each(function () {
      let $table = $(this);

      // Verifica se il testo del prodotto corrente corrisponde alla ricerca
      if ($table.find(".featured-item").text().search(patt) >= 0) {
        // Se c'è una corrispondenza, mostra l'elemento e imposta la variabile found a true
        $table.show();
        found = true;
      } else {
        // Altrimenti, nasconde l'elemento
        $table.hide();
      }
    });

  // Se sono state trovate corrispondenze, nasconde il messaggio "Product not found", altrimenti lo mostra
  if (found) {
    document.getElementById("not_found").style.display = "none";
  } else {
    document.getElementById("not_found").style.display = "block";
    document.getElementById("not_found").innerHTML = " Product not found..";
  }
});
