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

let shoppingCart = (function () {
  cart = [];

  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(localStorage.getItem("shoppingCart"));
  }
  if (localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  let obj = {};

  // Add to cart
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
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
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

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function () {
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
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

let AllList = document.querySelector("#all-list");
let ManList = document.querySelector("#man-products");
let WomanList = document.querySelector("#woman-products");
let WatchList = document.querySelector("#watch-products");

let maleProduct = products.filter(
  (product) => product.category === "man-products"
);
let femaleProduct = products.filter(
  (product) => product.category === "woman-products"
);
let watchProduct = products.filter(
  (product) => product.category === "watch-products"
);

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

generateProductCard(products, AllList);
generateProductCard(maleProduct, ManList);
generateProductCard(femaleProduct, WomanList);
generateProductCard(watchProduct, WatchList);

// Add item
$(".default-btn").click(function (event) {
  //   alert("working");
  event.preventDefault();
  let name = $(this).data("name");
  let price = Number($(this).data("price"));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$("#clearCartButton").click(function () {
  shoppingCart.clearCart();
  displayCart();
});

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

// Delete item button

$(".show-cart").on("click", ".delete-item", function (event) {
  let name = $(this).data("name");
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

// Item count input
$(".show-cart").on("change", ".item-count", function (event) {
  let name = $(this).data("name");
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});
displayCart();

//////// ui script start /////////
// Tabs Single Page
$(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current");
$(".tab ul.tabs li a").on("click", function (g) {
  let tab = $(this).closest(".tab"),
    index = $(this).closest("li").index();
  tab.find("ul.tabs > li").removeClass("current");
  $(this).closest("li").addClass("current");
  tab
    .find(".tab_content")
    .find("div.tabs_item")
    .not("div.tabs_item:eq(" + index + ")")
    .slideUp();
  tab
    .find(".tab_content")
    .find("div.tabs_item:eq(" + index + ")")
    .slideDown();
  g.preventDefault();
});

// search function
$("#search_field").on("keyup", function () {
  let value = $(this).val();
  let patt = new RegExp(value, "i");

  $(".tab_content")
    .find(".col-lg-3")
    .each(function () {
      let $table = $(this);

      if (!($table.find(".featured-item").text().search(patt) >= 0)) {
        $table.not(".featured-item").hide();
      }
      if ($table.find(".col-lg-3").text().search(patt) >= 0) {
        $(this).show();
        document.getElementById("not_found").style.display = "none";
      } else {
        document.getElementById("not_found").innerHTML = " Product not found..";
        document.getElementById("not_found").style.display = "block";
      }
    });
});
